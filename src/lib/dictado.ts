import { supabase } from "@/integrations/supabase/client"

/**
 * Dictado del TEA: consentimiento y guardado.
 *
 * El consentimiento se guarda POR DISPOSITIVO, y es lo correcto: lo que se
 * consiente es que el micrófono de ESTE equipo mande audio a los servidores del
 * navegador que se está usando. Aceptarlo en el portátil no debería dar por
 * aceptado el del celular, que puede ser otro navegador y otro proveedor.
 */

const CLAVE_CONSENTIMIENTO = "aviatory.dictado.consentimiento"

export function tieneConsentimiento(): boolean {
  try {
    return localStorage.getItem(CLAVE_CONSENTIMIENTO) === "si"
  } catch {
    return false
  }
}

export function darConsentimiento(): void {
  try {
    localStorage.setItem(CLAVE_CONSENTIMIENTO, "si")
  } catch {
    /* localStorage bloqueado: se vuelve a preguntar, que es lo seguro */
  }
}

export function revocarConsentimiento(): void {
  try {
    localStorage.removeItem(CLAVE_CONSENTIMIENTO)
  } catch {
    /* nada que hacer */
  }
}

/** Qué proveedor procesa el audio, según el navegador. Para decirlo sin mentir. */
export function proveedorDeReconocimiento(): string {
  if (typeof navigator === "undefined") return "el navegador"
  const ua = navigator.userAgent
  const esSafari = /^((?!chrome|android|crios|fxios).)*safari/i.test(ua)
  return esSafari ? "Apple" : "Google"
}

export interface RespuestaHabladaGuardada {
  question_id: string
  transcript: string
  palabras: number
  segundos: number
  confianza: number | null
}

/**
 * Guarda una respuesta hablada.
 *
 * SOLO EL TEXTO. El audio no se sube a ninguna parte, que es exactamente lo que
 * se le promete al piloto en el consentimiento.
 *
 * Se guarda también en el respaldo local para que la respuesta siga ahí al
 * volver a la pantalla aunque la tabla todavía no esté aplicada.
 */
export async function guardarRespuestaHablada(r: RespuestaHabladaGuardada): Promise<void> {
  guardarLocal(r)
  try {
    const { data } = await supabase.auth.getUser()
    const userId = data.user?.id
    if (!userId) return
    const { error } = await supabase.from("user_icao_speaking").insert({
      user_id: userId,
      parte: 1,
      question_id: r.question_id,
      transcript: r.transcript,
      palabras: r.palabras,
      segundos: r.segundos,
      confianza: r.confianza,
      motor: "webspeech",
    })
    if (error) console.warn("icao speaking", error.message)
  } catch (err) {
    console.warn("icao speaking", err)
  }
}

/** Borra lo dicho en una pregunta. El piloto tiene que poder retirarlo. */
export async function borrarRespuestaHablada(questionId: string): Promise<void> {
  borrarLocal(questionId)
  try {
    const { data } = await supabase.auth.getUser()
    const userId = data.user?.id
    if (!userId) return
    await supabase
      .from("user_icao_speaking")
      .delete()
      .eq("user_id", userId)
      .eq("question_id", questionId)
  } catch (err) {
    console.warn("icao speaking borrar", err)
  }
}

/**
 * Lo dicho en cada pregunta, de la base y del respaldo local.
 * Se queda con lo más reciente de cada pregunta.
 */
export async function cargarRespuestasHabladas(
  userId: string | null
): Promise<Record<string, RespuestaHabladaGuardada>> {
  const local = leerLocal()
  if (!userId) return local

  try {
    const { data, error } = await supabase
      .from("user_icao_speaking")
      .select("question_id, transcript, palabras, segundos, confianza, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
    if (error || !data) return local

    const remoto: Record<string, RespuestaHabladaGuardada> = {}
    for (const fila of data) {
      // Vienen de más nueva a más vieja: la primera de cada pregunta es la buena.
      if (remoto[fila.question_id]) continue
      remoto[fila.question_id] = {
        question_id: fila.question_id,
        transcript: fila.transcript,
        palabras: fila.palabras,
        segundos: fila.segundos,
        confianza: fila.confianza,
      }
    }
    return { ...local, ...remoto }
  } catch {
    return local
  }
}

// ─── Respaldo local ─────────────────────────────────────────────────────────
const CLAVE_RESPUESTAS = "aviatory.dictado.respuestas"

function leerLocal(): Record<string, RespuestaHabladaGuardada> {
  try {
    const raw = localStorage.getItem(CLAVE_RESPUESTAS)
    return raw ? (JSON.parse(raw) as Record<string, RespuestaHabladaGuardada>) : {}
  } catch {
    return {}
  }
}

function guardarLocal(r: RespuestaHabladaGuardada): void {
  try {
    localStorage.setItem(CLAVE_RESPUESTAS, JSON.stringify({ ...leerLocal(), [r.question_id]: r }))
  } catch {
    /* localStorage bloqueado */
  }
}

function borrarLocal(questionId: string): void {
  try {
    const todo = leerLocal()
    delete todo[questionId]
    localStorage.setItem(CLAVE_RESPUESTAS, JSON.stringify(todo))
  } catch {
    /* localStorage bloqueado */
  }
}

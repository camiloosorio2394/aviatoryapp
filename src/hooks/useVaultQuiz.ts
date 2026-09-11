import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export interface VaultQuestion {
  position: number
  question: string
  options: Record<string, string>
  /**
   * Materia de la pregunta. Hoy el payload del servidor no la trae por pregunta
   * (solo la sesión sabe la materia), así que en los quices de una sola materia
   * se resuelve con `VaultSession.subjectSlug`. Queda opcional para cuando la
   * RPC empiece a devolverla en el simulacro mezclado.
   */
  subject_slug?: string | null
}

export interface VaultSession {
  token: string
  questionCount: number
  expiresAt: string
  questions: VaultQuestion[]
  /** Materia de la sesión. `null` en el simulacro (preguntas de todas las materias). */
  subjectSlug: string | null
}

export interface AnswerResult {
  is_correct: boolean
  correct_answer: string
  explanation: string
  pedagogical_note: string | null
  questions_remaining: number
}

export interface ListedSubject {
  subject_slug: string
  question_count: number
}

/** Estados de error que la UI sabe explicar con una salida concreta. */
export type VaultErrorKind = "no_questions" | "rate_limit" | "unknown"

export interface VaultError {
  kind: VaultErrorKind
  message: string
}

function classifyError(raw: unknown): VaultError {
  const msg = raw instanceof Error ? raw.message : String(raw)
  if (msg.includes("rate_limit_exceeded")) {
    return {
      kind: "rate_limit",
      message: "Llegaste al límite de 100 preguntas por hora.",
    }
  }
  if (msg.includes("no_questions_available")) {
    return {
      kind: "no_questions",
      message: "Todavía no hay preguntas cargadas para esta materia.",
    }
  }
  return { kind: "unknown", message: msg }
}

/**
 * Quiz session contra `vault_questions` vía las RPCs server-side.
 *
 * - `startQuiz(subjectSlug?, module?, count?)` crea una sesión y devuelve N preguntas
 *   sin las respuestas correctas (esas se entregan recién en `submitAnswer`).
 * - `submitAnswer(position, answer)` valida server-side, devuelve si fue correcta,
 *   la respuesta correcta y la explicación.
 * - `error` expone por qué no hay sesión, para que la pantalla no quede en un
 *   spinner infinito ni en blanco.
 *
 * El token expira a los 20 minutos (server-side). Rate limit: 100 preguntas/hora/user.
 */
export function useVaultQuiz() {
  const [session, setSession] = useState<VaultSession | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<VaultError | null>(null)

  async function startQuiz(opts: {
    subjectSlug?: string
    module?: string
    count?: number
  } = {}) {
    setLoading(true)
    setError(null)
    try {
      const { data, error: rpcError } = await supabase.rpc("vault_start_quiz", {
        p_subject_slug: opts.subjectSlug ?? null,
        p_module: opts.module ?? "pca",
        p_count: opts.count ?? 10,
      })
      if (rpcError) throw rpcError
      const row = Array.isArray(data) ? data[0] : data
      if (!row) {
        setError({
          kind: "no_questions",
          message: "Todavía no hay preguntas cargadas para esta materia.",
        })
        return null
      }
      const s: VaultSession = {
        token: row.token,
        questionCount: row.question_count,
        expiresAt: row.expires_at,
        questions: (row.questions ?? []) as unknown as VaultQuestion[],
        subjectSlug: opts.subjectSlug ?? null,
      }
      setSession(s)
      return s
    } catch (e) {
      setError(classifyError(e))
      return null
    } finally {
      setLoading(false)
    }
  }

  async function submitAnswer(position: number, answer: string): Promise<AnswerResult | null> {
    if (!session) return null
    try {
      const { data, error: rpcError } = await supabase.rpc("vault_submit_answer", {
        p_token: session.token,
        p_position: position,
        p_answer: answer,
      })
      if (rpcError) throw rpcError
      const row = (Array.isArray(data) ? data[0] : data) as AnswerResult
      return row
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "No se pudo enviar la respuesta")
      return null
    }
  }

  function resetSession() {
    setSession(null)
    setError(null)
  }

  return { session, loading, error, startQuiz, submitAnswer, resetSession }
}

/**
 * Lista las materias disponibles para un módulo (subject_slug + count).
 * No expone contenido — solo metadata para la pantalla de selección.
 */
export function useVaultSubjects(module: string = "pca") {
  /**
   * Lo que hay en mano, con la etiqueta de a qué corresponde.
   *
   * El estado de carga no se guarda: se deduce de si lo que se tiene es de este
   * módulo y de este intento. Antes lo ponía `load` nada más entrar, que es un
   * setState en el cuerpo del efecto, y además obligaba a acordarse de bajarlo
   * en cada rama.
   */
  const [enMano, setEnMano] = useState<{
    modulo: string
    intento: number
    subjects: ListedSubject[]
    error: string | null
  } | null>(null)
  const [intento, setIntento] = useState(0)

  const alDia = enMano?.modulo === module && enMano.intento === intento
  const subjects = alDia ? enMano.subjects : []
  const loading = !alDia
  const error = alDia ? enMano.error : null

  const traer = useCallback(async () => {
    const { data, error: rpcError } = await supabase.rpc("vault_list_subjects", {
      p_module: module,
    })
    return {
      modulo: module,
      intento,
      subjects: rpcError ? [] : ((data ?? []) as ListedSubject[]),
      error: rpcError ? rpcError.message : null,
    }
  }, [module, intento])

  useEffect(() => {
    let vivo = true
    void traer().then((r) => {
      if (vivo) setEnMano(r)
    })
    return () => {
      vivo = false
    }
  }, [traer])

  // Volver a pedir es subir el número de intento: lo que hay en mano deja de
  // estar al día y el efecto se encarga.
  const reload = useCallback(() => {
    setIntento((n) => n + 1)
  }, [])

  return { subjects, loading, error, reload }
}

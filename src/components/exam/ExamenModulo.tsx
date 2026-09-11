import { useCallback, useEffect, useState } from "react"
import { useSession } from "@/hooks/useSession"
import type { ExamenConfig } from "@/components/exam/tipos"
import { Intento } from "@/components/exam/Intento"
import { Cargando, Bloqueado } from "@/components/exam/PuertaCerrada"

// Las pantallas de cada módulo (NotamExam, MercanciasExam) toman los tipos de aquí.
export type { ExamenConfig, FilaHistorial } from "@/components/exam/tipos"

/**
 * Evaluación de un módulo.
 *
 * Nació como la evaluación de NOTAM y se generalizó para Mercancías peligrosas
 * sin cambiar nada de lo que Camilo aprobó. Las reglas, que mandan sobre
 * cualquier detalle de esta pantalla:
 *
 *   1. No hay pantalla de bienvenida. Se entra y se está presentando.
 *   2. Solo se abre con TODAS las lecciones terminadas.
 *   3. Cada intento son N preguntas al azar del banco, con las opciones
 *      también barajadas.
 *   4. Durante el intento NO se dice nada: ni si acertó, ni la explicación, ni
 *      la referencia. Solo queda marcada la opción elegida.
 *   5. Al terminar se muestra el porcentaje y, debajo, todas las respuestas
 *      con su explicación.
 *
 * El sorteo, la calificación y el guardado los hace el servidor
 * (services/evaluaciones.ts): la pantalla no tiene las respuestas correctas
 * hasta que el intento termina. El módulo trae sus rutas, su progreso y su
 * historial; la pantalla no sabe de tablas ni de bancos.
 */

// ─── Página ──────────────────────────────────────────────────────────────────

export function ExamenModulo({ config }: { config: ExamenConfig }) {
  const { user, isLoading: sessionLoading } = useSession()

  // Descarta lecciones que ya no existen: el módulo se recortó y queda progreso viejo.
  const soloExistentes = useCallback(
    (ns: number[]) => ns.filter((n) => n >= 1 && n <= config.totalLecciones),
    [config.totalLecciones],
  )

  // La llave de entrada. Quien abre la evaluación es el servidor, y solo con la
  // lección completa en la base. Con sesión, antes de decidir se sube lo leído
  // en este equipo (pudo leerse sin conexión) y se une con lo que la base tiene,
  // que pudo leerse en otro dispositivo. Sin sesión, lo local es lo disponible.
  const [leidas, setLeidas] = useState<number[]>(() => soloExistentes(config.leerLeidas()))
  const [sincronizado, setSincronizado] = useState(false)
  const completa = leidas.length >= config.totalLecciones
  const esperando = sessionLoading || (!!user?.id && !sincronizado)
  const bloqueado = !completa && !esperando

  useEffect(() => {
    if (sessionLoading) return
    const uid = user?.id
    if (!uid) return
    let cancelled = false
    void (async () => {
      const confirmadas = await config.sincronizarLeidas(uid)
      if (cancelled) return
      if (confirmadas) {
        const merged = soloExistentes(Array.from(new Set([...config.leerLeidas(), ...confirmadas]))).sort(
          (a, b) => a - b,
        )
        config.escribirLeidas(merged)
        setLeidas(merged)
      }
      setSincronizado(true)
    })()
    return () => {
      cancelled = true
    }
  }, [user?.id, sessionLoading, config, soloExistentes])

  if (esperando) return <Cargando texto="Abriendo la evaluación..." />

  if (bloqueado) return <Bloqueado config={config} leidas={leidas} />

  // El intento se monta solo con la puerta abierta: pedir preguntas antes sería
  // gastar un intento de la hora en alguien que todavía no puede presentarla.
  return <Intento config={config} userId={user?.id ?? null} sessionLoading={sessionLoading} />
}

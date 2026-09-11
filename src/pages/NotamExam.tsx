import { ExamenModulo, type ExamenConfig } from "@/components/exam/ExamenModulo"
import { supabase } from "@/integrations/supabase/client"
import {
  EXAM_PASS_SCORE,
  readLocalProgress,
  writeLocalProgress,
  AVISO_EVALUACION,
  EXAM_PER_ATTEMPT,
  NOTAM_TOTALES,
} from "@/lib/notamComun"
import { fetchNotamProgress, pushPendingLocalProgress } from "@/lib/notamProgress"

/**
 * Evaluación de la sección NOTAM.
 *
 * La pantalla es la genérica (ExamenModulo); aquí solo se dice qué evaluación
 * del servidor, qué rutas, qué progreso y qué historial. Las reglas de Camilo (sin bienvenida,
 * puerta cerrada hasta leer todo, 25 al azar de 100, sin retroalimentación
 * durante, resultado con porcentaje y revisión) viven en el componente.
 *
 * Ruta: /app/aerolinea/notam/evaluacion
 */
const CONFIG: ExamenConfig = {
  nombre: "NOTAM",
  eyebrow: "NOTAM · Evaluación",
  volverTexto: "Volver a la sección NOTAM",
  hub: "/app/aerolinea/notam",
  leccion: "/app/aerolinea/notam/aprende",
  practica: "/app/aerolinea/notam/practica",
  totalLecciones: NOTAM_TOTALES.lessonScreens,
  unidadLeccion: "secciones",
  porIntento: EXAM_PER_ATTEMPT,
  aprobacion: EXAM_PASS_SCORE,
  aviso: AVISO_EVALUACION,
  acento: "var(--av-blue-500)",
  evaluacion: "notam_evaluacion",
  leerLeidas: () => readLocalProgress().lessonScreens,
  escribirLeidas: (ns) => {
    writeLocalProgress({ lessonScreens: ns })
  },
  sincronizarLeidas: async (uid) => {
    const remoto = await fetchNotamProgress(uid)
    if (!remoto) return null
    return (await pushPendingLocalProgress(remoto)).lessonScreens
  },
  leerMejorLocal: () => readLocalProgress().bestExamScore,
  escribirMejorLocal: (score) => {
    writeLocalProgress({ bestExamScore: score })
  },
  cargarHistorial: async (uid) => {
    const [listRes, bestRes] = await Promise.all([
      supabase
        .from("user_notam_exam_attempts")
        .select("id,score,correct_count,total_questions,passed,duration_seconds,created_at", { count: "exact" })
        .eq("user_id", uid)
        .order("created_at", { ascending: false })
        .limit(10),
      supabase.from("user_notam_exam_attempts").select("score").eq("user_id", uid).order("score", { ascending: false }).limit(1),
    ])
    if (listRes.error) {
      console.error("notam exam history", listRes.error)
      return null
    }
    const rows = (listRes.data ?? []) as {
      id: string
      score: number
      correct_count: number
      total_questions: number
      passed: boolean
      duration_seconds: number | null
      created_at: string
    }[]
    const top = (bestRes.data ?? []) as { score: number }[]
    return {
      rows: rows.map((r) => ({
        id: r.id,
        score: r.score,
        correct: r.correct_count,
        total: r.total_questions,
        passed: r.passed,
        duration: r.duration_seconds,
        at: r.created_at,
      })),
      count: listRes.count ?? rows.length,
      best: top.length ? top[0].score : null,
    }
  },
  pasos: {
    leccion: `Las ${NOTAM_TOTALES.lessonScreens} secciones: formato OACI, casillas y códigos Q explicados paso a paso.`,
    practica: "NOTAM reales de Colombia y del mundo, y ejercicios escritos para entrenar la lectura.",
  },
}

export function NotamExam() {
  return <ExamenModulo config={CONFIG} />
}

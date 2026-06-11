import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export interface VaultQuestion {
  position: number
  question: string
  options: Record<string, string>
}

export interface VaultSession {
  token: string
  questionCount: number
  expiresAt: string
  questions: VaultQuestion[]
}

export interface AnswerResult {
  is_correct: boolean
  correct_answer: string
  explanation: string
  pedagogical_note: string | null
  questions_remaining: number
}

interface ListedSubject {
  subject_slug: string
  question_count: number
}

/**
 * Quiz session contra `vault_questions` vía las RPCs server-side.
 *
 * - `startQuiz(subjectSlug?, module?, count?)` crea una sesión y devuelve N preguntas
 *   sin las respuestas correctas (esas se entregan recién en `submitAnswer`).
 * - `submitAnswer(position, answer)` valida server-side, devuelve si fue correcta,
 *   la respuesta correcta y la explicación.
 *
 * El token expira a los 20 minutos (server-side). Rate limit: 100 preguntas/hora/user.
 */
export function useVaultQuiz() {
  const [session, setSession] = useState<VaultSession | null>(null)
  const [loading, setLoading] = useState(false)

  async function startQuiz(opts: {
    subjectSlug?: string
    module?: string
    count?: number
  } = {}) {
    setLoading(true)
    try {
      const { data, error } = await supabase.rpc("vault_start_quiz", {
        p_subject_slug: opts.subjectSlug ?? null,
        p_module: opts.module ?? "pca",
        p_count: opts.count ?? 10,
      })
      if (error) throw error
      const row = Array.isArray(data) ? data[0] : data
      if (!row) {
        toast.error("No hay preguntas disponibles para esta materia todavía.")
        return null
      }
      const s: VaultSession = {
        token: row.token,
        questionCount: row.question_count,
        expiresAt: row.expires_at,
        questions: row.questions,
      }
      setSession(s)
      return s
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      if (msg.includes("rate_limit_exceeded")) {
        toast.error("Llegaste al límite de 100 preguntas por hora. Esperá un rato.")
      } else if (msg.includes("no_questions_available")) {
        toast.error("Todavía no hay preguntas cargadas para esta materia.")
      } else {
        toast.error(msg)
      }
      return null
    } finally {
      setLoading(false)
    }
  }

  async function submitAnswer(position: number, answer: string): Promise<AnswerResult | null> {
    if (!session) return null
    try {
      const { data, error } = await supabase.rpc("vault_submit_answer", {
        p_token: session.token,
        p_position: position,
        p_answer: answer,
      })
      if (error) throw error
      const row = (Array.isArray(data) ? data[0] : data) as AnswerResult
      return row
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "No se pudo enviar respuesta")
      return null
    }
  }

  function resetSession() {
    setSession(null)
  }

  return { session, loading, startQuiz, submitAnswer, resetSession }
}

/**
 * Lista las materias disponibles para un módulo (subject_slug + count).
 * No expone contenido — solo metadata para la pantalla de selección.
 */
export function useVaultSubjects(module: string = "pca") {
  const [subjects, setSubjects] = useState<ListedSubject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    supabase
      .rpc("vault_list_subjects", { p_module: module })
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) {
          toast.error(error.message)
          setSubjects([])
        } else {
          setSubjects(((data ?? []) as ListedSubject[]))
        }
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [module])

  return { subjects, loading }
}

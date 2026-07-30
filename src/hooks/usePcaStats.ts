import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"

export interface PcaSubjectStat {
  slug: string
  total: number
  answered: number
}

export interface PcaStats {
  bank_total: number
  answered: number
  pending: number
  /** null cuando todavía no hay con qué calcularlo. Nunca 0 por defecto: un
   *  cero se lee como resultado y un null como "sin medir". */
  mastery_pct: number | null
  sessions: number
  avg_minutes: number | null
  streak_days: number
  /** Fecha del examen del piloto. null si todavía no la ha fijado. */
  target_date: string | null
  /** Días que faltan. Negativo si la fecha ya pasó. */
  days_to_exam: number | null
  /** Última materia trabajada, para ofrecer retomarla. */
  resume_slug: string | null
  by_subject: PcaSubjectStat[]
}

/** Estadísticas del módulo PCA, agregadas en el servidor por `pca_stats()`. */
export function usePcaStats() {
  const [stats, setStats] = useState<PcaStats | null>(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    const { data, error } = await supabase.rpc("pca_stats")
    setStats(error ? null : (data as unknown as PcaStats))
    setLoading(false)
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  /** Guarda la fecha del examen. Se hace aquí y no en el perfil porque es donde
   *  el piloto la tiene en la cabeza: al entrar a estudiar. */
  const setExamDate = useCallback(
    async (date: string | null) => {
      const { data: session } = await supabase.auth.getUser()
      const uid = session.user?.id
      if (!uid) return false
      const { error } = await supabase
        .from("pilot_state")
        .upsert({ user_id: uid, target_date: date }, { onConflict: "user_id" })
      if (error) return false
      await load()
      return true
    },
    [load],
  )

  return { stats, loading, reload: load, setExamDate }
}

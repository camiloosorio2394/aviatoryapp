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

  return { stats, loading, reload: load }
}

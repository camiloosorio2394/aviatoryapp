import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from "@/hooks/useSession"

export interface ProfileLite {
  id: string
  full_name: string | null
  username: string | null
  photo_url: string | null
}

export function useProfile() {
  const { user } = useSession()
  const [profile, setProfile] = useState<ProfileLite | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    if (!user) {
      setProfile(null)
      setLoading(false)
      return
    }
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, username, photo_url")
      .eq("id", user.id)
      .maybeSingle()
    if (!error) setProfile((data ?? null) as ProfileLite | null)
    setLoading(false)
  }, [user])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { profile, loading, refresh }
}

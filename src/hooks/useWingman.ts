import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"

export type WingmanMessage = {
  id: string             // local UUID for React keys
  serverId?: number      // ai_interactions.id for feedback
  role: "user" | "assistant"
  content: string
  feedback?: "thumbs_up" | "thumbs_down"
  pending?: boolean
  error?: boolean
}

export type WingmanContext = {
  kind: "quiz_explain" | "study_help" | "general"
  question_id?: number
  attempt_id?: number
}

export type WingmanState = {
  isOpen: boolean
  context: WingmanContext | null
  conversationId: string | null
  messages: WingmanMessage[]
  sending: boolean
  bannerError: string | null         // hard errors (limit reached, not configured)
}

const initialState: WingmanState = {
  isOpen: false,
  context: null,
  conversationId: null,
  messages: [],
  sending: false,
  bannerError: null,
}

function uid() {
  return Math.random().toString(36).slice(2)
}

export function useWingman() {
  const [state, setState] = useState<WingmanState>(initialState)
  const [usage, setUsage] = useState<number | null>(null)
  const [isPro, setIsPro] = useState<boolean>(false)

  // Fetch usage + plan once on mount and when panel opens
  const refreshUsage = useCallback(async () => {
    const [{ data: usageData }, { data: subData }] = await Promise.all([
      supabase.rpc("ai_usage_this_month"),
      supabase
        .from("subscriptions")
        .select("plan, status")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ])
    setUsage((usageData as number) ?? 0)
    const sub = subData as { plan?: string; status?: string } | null
    setIsPro(
      !!sub &&
        ["pro_monthly", "pro_annual", "founder_lifetime"].includes(sub.plan ?? "") &&
        ["trialing", "active"].includes(sub.status ?? "")
    )
  }, [])

  useEffect(() => {
    refreshUsage()
  }, [refreshUsage])

  const openWith = useCallback(
    (ctx: WingmanContext) => {
      setState({
        isOpen: true,
        context: ctx,
        conversationId: null,
        messages: [],
        sending: false,
        bannerError: null,
      })
      refreshUsage()
    },
    [refreshUsage]
  )

  const close = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }))
  }, [])

  const send = useCallback(
    async (text?: string) => {
      setState((prev) => {
        if (prev.sending) return prev
        const userMsg: WingmanMessage | null = text
          ? { id: uid(), role: "user", content: text }
          : null
        const placeholder: WingmanMessage = {
          id: uid(),
          role: "assistant",
          content: "",
          pending: true,
        }
        return {
          ...prev,
          sending: true,
          bannerError: null,
          messages: [
            ...prev.messages,
            ...(userMsg ? [userMsg] : []),
            placeholder,
          ],
        }
      })

      try {
        const { data: sessionData } = await supabase.auth.getSession()
        const token = sessionData.session?.access_token
        if (!token) throw new Error("Sesión expirada. Iniciá sesión de nuevo.")

        // Pull current state for fields we need
        let pendingId = ""
        setState((prev) => {
          pendingId = prev.messages[prev.messages.length - 1]?.id ?? ""
          return prev
        })

        const ctx = state.context
        const conversation_id = state.conversationId
        const conversation_history = state.messages
          .filter((m) => !m.pending && !m.error)
          .map((m) => ({ role: m.role, content: m.content }))

        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
        const res = await fetch(`${supabaseUrl}/functions/v1/wingman`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            kind: ctx?.kind ?? "general",
            question_id: ctx?.question_id,
            attempt_id: ctx?.attempt_id,
            message: text,
            conversation_id,
            conversation_history: conversation_history.length > 0 ? conversation_history : undefined,
          }),
        })

        const json = (await res.json().catch(() => ({}))) as Record<string, unknown>

        if (!res.ok) {
          const errCode = (json.error as string) || "error"
          const errMsg =
            (json.message as string) ||
            "Algo salió mal. Probá de nuevo."
          // Treat 503/402 as banner errors (show big message, no retry)
          if (res.status === 503 || res.status === 402) {
            setState((prev) => ({
              ...prev,
              sending: false,
              bannerError: errMsg,
              messages: prev.messages.filter((m) => !m.pending),
            }))
            return
          }
          setState((prev) => ({
            ...prev,
            sending: false,
            messages: prev.messages.map((m) =>
              m.id === pendingId
                ? { ...m, content: errMsg, pending: false, error: true }
                : m
            ),
          }))
          // Telemetry only
          console.warn("wingman error", errCode, errMsg)
          return
        }

        const responseText = (json.text as string) ?? "(sin respuesta)"
        const serverId = json.message_id as number | undefined
        const newConvId = (json.conversation_id as string) ?? conversation_id

        setState((prev) => ({
          ...prev,
          sending: false,
          conversationId: newConvId,
          messages: prev.messages.map((m) =>
            m.id === pendingId
              ? { ...m, content: responseText, pending: false, serverId }
              : m
          ),
        }))
        refreshUsage()
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Error de red"
        setState((prev) => ({
          ...prev,
          sending: false,
          messages: prev.messages.map((m) =>
            m.pending ? { ...m, content: msg, pending: false, error: true } : m
          ),
        }))
      }
    },
    [state, refreshUsage]
  )

  const giveFeedback = useCallback(
    async (msg: WingmanMessage, value: "thumbs_up" | "thumbs_down") => {
      if (!msg.serverId) return
      // Optimistic
      setState((prev) => ({
        ...prev,
        messages: prev.messages.map((m) =>
          m.id === msg.id ? { ...m, feedback: value } : m
        ),
      }))
      await supabase
        .from("ai_interactions")
        .update({ feedback: value, feedback_at: new Date().toISOString() })
        .eq("id", msg.serverId)
    },
    []
  )

  return {
    state,
    usage,
    isPro,
    freeLimit: 5,
    openWith,
    close,
    send,
    giveFeedback,
  }
}

import posthog from "posthog-js"

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined
const POSTHOG_HOST = (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ??
  "https://us.i.posthog.com"

let initialized = false

/**
 * Inicializa PostHog solo si:
 *  - VITE_POSTHOG_KEY está configurada (no rompe si falta)
 *  - No es localhost (evita gastar events de dev)
 */
export function initAnalytics() {
  if (initialized) return
  if (!POSTHOG_KEY) return
  if (typeof window === "undefined") return

  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"

  if (isLocal) return

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: "identified_only",
    autocapture: true,
    capture_pageview: false, // lo manejamos nosotros para tener path normalizado
    capture_pageleave: true,
    disable_session_recording: false,
    loaded: () => {
      initialized = true
    },
  })
  initialized = true
}

export function isAnalyticsEnabled() {
  return initialized
}

/**
 * Identifica al user logueado. Email puede ser opcional.
 * Llamar después del login/signup exitoso.
 */
export function identifyUser(userId: string, traits: Record<string, unknown> = {}) {
  if (!initialized) return
  posthog.identify(userId, traits)
}

export function resetIdentity() {
  if (!initialized) return
  posthog.reset()
}

export type TrackProps = Record<string, string | number | boolean | null | undefined>

export function track(event: string, props: TrackProps = {}) {
  if (!initialized) return
  posthog.capture(event, props)
}

export function trackPageView(path: string) {
  if (!initialized) return
  posthog.capture("$pageview", { $current_url: window.location.href, path })
}

/** Common events centralized para evitar typos */
export const Events = {
  SIGNUP_STARTED: "signup_started",
  SIGNUP_COMPLETED: "signup_completed",
  LOGIN_COMPLETED: "login_completed",
  ONBOARDING_STEP: "onboarding_step_completed",
  ONBOARDING_COMPLETED: "onboarding_completed",
  QUIZ_STARTED: "quiz_started",
  QUIZ_COMPLETED: "quiz_completed",
  PAYWALL_VIEWED: "paywall_viewed",
  PLAN_CLICKED: "plan_clicked",
  WINGMAN_OPENED: "wingman_opened",
  WINGMAN_MESSAGE_SENT: "wingman_message_sent",
  COMMUNITY_MESSAGE_SENT: "community_message_sent",
  ACHIEVEMENT_UNLOCKED: "achievement_unlocked",
  CHECKLIST_ITEM_TOGGLED: "checklist_item_toggled",
} as const

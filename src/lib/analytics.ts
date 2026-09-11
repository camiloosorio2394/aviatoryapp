import type { PostHog } from "posthog-js"

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined
const POSTHOG_HOST = (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ??
  "https://us.i.posthog.com"

/**
 * PostHog se descarga solo si hay clave y no es localhost.
 *
 * Importado de forma estática eran 273 KB dentro del trozo inicial (el 37 %):
 * lo descargaba y evaluaba cada visita, también la landing, aunque sin clave no
 * se usara. Ahora es un import() que solo corre al inicializar con clave.
 *
 * Lo que se registra mientras llega (la primera vista de página, el identify)
 * se aplica al llegar, en el mismo orden. Sin clave, todo es un no-op.
 */
let cargando: Promise<PostHog | null> | null = null

export function initAnalytics() {
  if (cargando || !POSTHOG_KEY || typeof window === "undefined") return

  const host = window.location.hostname
  // Localhost no gasta eventos de desarrollo.
  if (host === "localhost" || host === "127.0.0.1") return

  const clave = POSTHOG_KEY
  cargando = import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(clave, {
        api_host: POSTHOG_HOST,
        person_profiles: "identified_only",
        autocapture: true,
        capture_pageview: false, // lo manejamos nosotros para tener path normalizado
        capture_pageleave: true,
        disable_session_recording: false,
      })
      return posthog
    })
    .catch((error: unknown) => {
      console.warn("analytics: no se pudo cargar PostHog", error)
      return null
    })
}

function conPosthog(uso: (posthog: PostHog) => void) {
  if (!cargando) return
  void cargando.then((posthog) => {
    if (posthog) uso(posthog)
  })
}

/**
 * Identifica al user logueado. Email puede ser opcional.
 * Llamar después del login/signup exitoso.
 */
export function identifyUser(userId: string, traits: Record<string, unknown> = {}) {
  conPosthog((posthog) => posthog.identify(userId, traits))
}

export function resetIdentity() {
  conPosthog((posthog) => posthog.reset())
}

export type TrackProps = Record<string, string | number | boolean | null | undefined>

export function track(event: string, props: TrackProps = {}) {
  conPosthog((posthog) => posthog.capture(event, props))
}

export function trackPageView(path: string) {
  // La URL de cuando se vio la página, no la de cuando termine de cargar PostHog.
  const url = window.location.href
  conPosthog((posthog) => posthog.capture("$pageview", { $current_url: url, path }))
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

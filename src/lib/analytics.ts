import type { CaptureResult, PostHog } from "posthog-js"

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined
const POSTHOG_HOST = (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ??
  "https://us.i.posthog.com"

/**
 * PostHog se descarga solo si hay clave, no es localhost **y el piloto aceptó**.
 *
 * Importado de forma estática eran 273 KB dentro del trozo inicial (el 37 %):
 * lo descargaba y evaluaba cada visita, también la landing, aunque sin clave no
 * se usara. Ahora es un import() que solo corre al inicializar con clave.
 *
 * Lo que se registra mientras llega (la primera vista de página, el identify)
 * se aplica al llegar, en el mismo orden. Sin clave o sin consentimiento, todo
 * es un no-op.
 *
 * El consentimiento va antes que la carga (auditoría del 26-sep-2026): PostHog
 * es analítica de terceros, fuera de Colombia, y la política de privacidad
 * promete que no corre nada así sin avisar. Mientras no haya clave, nada de
 * esto se ve: el aviso solo aparece si la analítica existe.
 */
let cargando: Promise<PostHog | null> | null = null

/** La elección del piloto, en este equipo. Se borra al cambiar de cuenta. */
export const CLAVE_CONSENTIMIENTO_ANALITICA = "aviatory.consentimiento.analitica"
/** El aviso y el pie escuchan este evento para enterarse de un cambio. */
export const EVENTO_CONSENTIMIENTO = "aviatory:consentimiento-analitica"

export type Consentimiento = "si" | "no" | null

/** ¿Hay analítica que consentir? Sin clave no hay nada que preguntar. */
export function analiticaDisponible(): boolean {
  if (!POSTHOG_KEY || typeof window === "undefined") return false
  const host = window.location.hostname
  // Localhost no gasta eventos de desarrollo.
  return host !== "localhost" && host !== "127.0.0.1"
}

export function leerConsentimiento(): Consentimiento {
  try {
    const v = localStorage.getItem(CLAVE_CONSENTIMIENTO_ANALITICA)
    return v === "si" || v === "no" ? v : null
  } catch {
    // Almacenamiento bloqueado: sin constancia de un sí, no se carga nada.
    return null
  }
}

function guardarConsentimiento(valor: Consentimiento) {
  try {
    if (valor === null) localStorage.removeItem(CLAVE_CONSENTIMIENTO_ANALITICA)
    else localStorage.setItem(CLAVE_CONSENTIMIENTO_ANALITICA, valor)
  } catch {
    /* sin almacenamiento, la elección dura lo que dure la página */
  }
  window.dispatchEvent(new Event(EVENTO_CONSENTIMIENTO))
}

/** Las propiedades que llevan una URL: salen sin query ni `#`. */
const PROPIEDADES_CON_URL = ["$current_url", "$referrer", "$initial_current_url", "$initial_referrer"] as const

/**
 * Una URL sin su query ni su `#`. Ahí llegan el `access_token` y el
 * `refresh_token` de Supabase al volver de Google o de un correo de
 * recuperación, y el cliente los limpia después de la primera vista de página.
 */
export function sinQueryNiHash(valor: unknown): unknown {
  if (typeof valor !== "string") return valor
  try {
    const url = new URL(valor)
    return url.origin + url.pathname
  } catch {
    return valor.split(/[?#]/)[0]
  }
}

/** El filtro que PostHog corre antes de mandar cada evento. */
export function limpiarEvento(evento: CaptureResult | null): CaptureResult | null {
  if (!evento) return evento
  for (const bolsa of [evento.properties, evento.$set, evento.$set_once]) {
    if (!bolsa) continue
    for (const clave of PROPIEDADES_CON_URL) {
      if (clave in bolsa) bolsa[clave] = sinQueryNiHash(bolsa[clave])
    }
  }
  return evento
}

export function initAnalytics() {
  if (cargando || !analiticaDisponible() || leerConsentimiento() !== "si") return

  const clave = POSTHOG_KEY as string
  cargando = import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(clave, {
        api_host: POSTHOG_HOST,
        person_profiles: "identified_only",
        autocapture: true,
        // Lo que captura el autocapture no lleva el texto ni los atributos de
        // lo que se toca: ahí puede ir una respuesta, un mensaje o un nombre.
        mask_all_text: true,
        mask_all_element_attributes: true,
        capture_pageview: false, // lo manejamos nosotros para tener path normalizado
        capture_pageleave: true,
        // Grabar la pantalla del piloto (chats, perfil, bitácora) necesitaría
        // un consentimiento aparte y decirlo en la política. Apagado.
        disable_session_recording: true,
        before_send: limpiarEvento,
      })
      return posthog
    })
    .catch((error: unknown) => {
      console.warn("analytics: no se pudo cargar PostHog", error)
      return null
    })
}

/** El piloto dijo que sí: se guarda y se carga. */
export function aceptarAnalitica() {
  guardarConsentimiento("si")
  initAnalytics()
}

/** El piloto dijo que no: se guarda y, si ya estaba cargado, deja de capturar. */
export function rechazarAnalitica() {
  guardarConsentimiento("no")
  conPosthog((posthog) => {
    posthog.opt_out_capturing()
    posthog.reset()
  })
}

/** Vuelve a preguntar: el pie de página lo ofrece mientras haya analítica. */
export function olvidarConsentimiento() {
  guardarConsentimiento(null)
}

function conPosthog(uso: (posthog: PostHog) => void) {
  if (!cargando) return
  void cargando.then((posthog) => {
    if (posthog) uso(posthog)
  })
}

/**
 * Identifica al user logueado por su id. Sin correo ni otros datos de contacto:
 * el id basta para unir sus eventos, y el correo no tiene por qué salir a un
 * tercero.
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
  // La URL de cuando se vio la página, no la de cuando termine de cargar PostHog,
  // y sin query ni `#`, que es donde viajan los tokens.
  const url = sinQueryNiHash(window.location.href) as string
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

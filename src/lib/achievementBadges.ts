/**
 * Insignia que le toca a cada logro.
 *
 * Vive aparte de `components/icons/badges.tsx` porque ese archivo solo exporta
 * componentes: mezclar un mapa y una función ahí rompe el refresco en caliente
 * de Vite (regla react-refresh/only-export-components).
 */

import {
  CounterBadge,
  HandshakeBadge,
  KneeboardBadge,
  RadioCallBadge,
  Stripe1Badge,
  Stripe2Badge,
  Stripe3Badge,
  Stripe4Badge,
  TakeoffBadge,
  WingsBadge,
} from "@/components/icons/badges"

type BadgeComponent = (props: { size?: number; className?: string }) => React.JSX.Element

/** Los códigos vienen de la tabla `achievements`. */
const BY_CODE: Record<string, BadgeComponent> = {
  first_step: TakeoffBadge,
  first_quiz: KneeboardBadge,
  streak_3: Stripe1Badge,
  streak_7: Stripe2Badge,
  streak_30: Stripe3Badge,
  subject_master: WingsBadge,
  icao_climb: RadioCallBadge,
  first_100: CounterBadge,
  community_hello: HandshakeBadge,
  founder_badge: Stripe4Badge,
}

/** Un logro nuevo sin insignia cae a un galón en vez de romper la card. */
export function badgeForCode(code: string): BadgeComponent {
  return BY_CODE[code] ?? Stripe1Badge
}

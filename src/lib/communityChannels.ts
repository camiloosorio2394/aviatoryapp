/**
 * Vocabulario visual de los canales de comunidad, compartido entre la portada
 * (Community) y el interior del canal (CommunityChannel): mismo icono, mismo
 * color y mismas etiquetas en las dos pantallas.
 *
 * El emoji que viene en la base no se usa: lo dibuja el sistema operativo y
 * rompe el lenguaje visual (misma razón por la que los logros pasaron a
 * insignias). Los símbolos de carta van donde significan algo: el circuito de
 * espera para hour building, el aeródromo como destino para candidatos.
 */

import type { ComponentType } from "react"
import {
  Briefcase,
  CloudSun,
  Gavel,
  Globe2,
  HelpCircle,
  MessagesSquare,
  Trophy,
} from "lucide-react"
import { AerodromeIcon, HoldingIcon, LocalizerIcon, WaypointIcon } from "@/components/icons/aero"
import type { TileColorKey } from "@/lib/tileColors"

export type ChannelType = "general" | "stage" | "subject" | "airline"

export type ChannelIcon = ComponentType<{ className?: string }>

export const CHANNEL_ICON: Record<string, ChannelIcon> = {
  general: MessagesSquare,
  logros: Trophy,
  preguntas: HelpCircle,
  empleos: Briefcase,
  "etapa-ppl": WaypointIcon,
  "etapa-cpl": LocalizerIcon,
  "etapa-horas": HoldingIcon,
  "etapa-candidatos": AerodromeIcon,
  "mat-meteorologia": CloudSun,
  "mat-reglamento": Gavel,
  "mat-icao-english": Globe2,
}

export const GROUP_META: Record<
  ChannelType,
  { title: string; description: string; color: TileColorKey; icon: ChannelIcon }
> = {
  general: {
    title: "General",
    description: "Conversación abierta, logros, dudas y oportunidades",
    color: "blue",
    icon: MessagesSquare,
  },
  stage: {
    title: "Por etapa",
    description: "Pilotos en tu mismo momento de carrera",
    color: "cyan",
    icon: WaypointIcon,
  },
  subject: {
    title: "Por materia",
    description: "Dudas técnicas con foco",
    color: "violet",
    icon: Gavel,
  },
  airline: {
    title: "Por aerolínea",
    description: "Preparación para postular",
    color: "amber",
    icon: AerodromeIcon,
  },
}

/** Canal de etapa que corresponde a cada etapa del piloto. */
export const STAGE_TO_CHANNEL: Record<string, string> = {
  student_ppl: "etapa-ppl",
  ppl: "etapa-ppl",
  cpl_in_progress: "etapa-cpl",
  cpl_ready: "etapa-cpl",
  hour_building: "etapa-horas",
  instructor: "etapa-horas",
  airline_candidate: "etapa-candidatos",
}

const AIRLINE_TILE_KEYS: TileColorKey[] = ["blue", "cyan", "violet", "amber", "green", "red"]

/** Color estable por canal (sin azar en render): depende solo del slug. */
export function airlineTileKey(slug: string): TileColorKey {
  let sum = 0
  for (let i = 0; i < slug.length; i += 1) sum += slug.charCodeAt(i)
  return AIRLINE_TILE_KEYS[sum % AIRLINE_TILE_KEYS.length]
}

/** Iniciales de la aerolínea para el tile. */
export function airlineInitials(name: string): string {
  const words = name
    .trim()
    .split(/\s+/)
    .filter((w) => /^[A-Za-zÁÉÍÓÚÑáéíóúñ]/.test(w))
  if (words.length === 0) return "AV"
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase()
}

export function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diff / 60_000)
  if (minutes < 1) return "hace un momento"
  if (minutes < 60) return `hace ${minutes} min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `hace ${hours} h`
  const days = Math.floor(hours / 24)
  if (days === 1) return "ayer"
  if (days < 30) return `hace ${days} días`
  const months = Math.floor(days / 30)
  return months <= 1 ? "hace un mes" : `hace ${months} meses`
}

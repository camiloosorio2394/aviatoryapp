/**
 * Los íconos de la portada del panel: la serie «premium» de Camilo (26-sep-2026),
 * generada con `node scripts/marca/iconos-panel.mjs <carpeta>`. No se edita a mano.
 * Los pinta `IconoPanel` en src/components/marca/Icono.tsx.
 */
import horas from "@/assets/iconos/panel/horas.webp"
import inglesIcao from "@/assets/iconos/panel/ingles-icao.webp"
import documentacion from "@/assets/iconos/panel/documentacion.webp"
import progreso from "@/assets/iconos/panel/progreso.webp"
import cursos from "@/assets/iconos/panel/cursos.webp"
import aerolineas from "@/assets/iconos/panel/aerolineas.webp"

export const ICONOS_PANEL = {
  "horas": horas,
  "ingles-icao": inglesIcao,
  "documentacion": documentacion,
  "progreso": progreso,
  "cursos": cursos,
  "aerolineas": aerolineas,
} as const

export type NombreIconoPanel = keyof typeof ICONOS_PANEL

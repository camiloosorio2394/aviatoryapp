// ─── Imagen del recorte ──────────────────────────────────────────────────────

export type ZoomLevel = "ancho" | "natural" | "doble"

export const ZOOM_LEVELS: { key: ZoomLevel; label: string }[] = [
  { key: "ancho", label: "Ajustar al ancho" },
  { key: "natural", label: "Tamaño real" },
  { key: "doble", label: "El doble" },
]

/** Los recortes son de 1875 x 260 px: "tamaño real" es su ancho natural. */
export const ZOOM_WIDTH: Record<ZoomLevel, string> = {
  ancho: "100%",
  natural: "1875px",
  doble: "3750px",
}

/**
 * Racha compartible: genera una imagen cuadrada con la marca para presumir la
 * racha en WhatsApp o Instagram, y la comparte con la hoja nativa del sistema
 * si existe (celular); si no, la descarga.
 *
 * Los colores van en hex literal a propósito: un canvas exportado no puede
 * leer variables de CSS, igual que pasa con los OG y los favicons. Son los
 * mismos valores del logo circular y del ámbar de racha del sistema.
 */

import logoUrl from "@/assets/logos/aviatory-isotype-app-icon.svg"

const NAVY_TOP = "#0B1F3A"
const NAVY_BOTTOM = "#07121E"
const AMBER = "#FCB52C"
const WHITE = "#FFFFFF"
const MUTED = "rgba(255, 255, 255, 0.62)"

const SIZE = 1080

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/** Galones del hito de racha: 1 desde 3 días, 2 desde 7, 3 desde 30. */
function stripesFor(days: number): number {
  if (days >= 30) return 3
  if (days >= 7) return 2
  if (days >= 3) return 1
  return 0
}

async function renderStreakCard(days: number, username: string | null): Promise<Blob> {
  const canvas = document.createElement("canvas")
  canvas.width = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("canvas no disponible")

  // Espera las fuentes para que Inter pinte en el canvas y no el fallback.
  await document.fonts.ready

  // Fondo navy con el gradiente de la marca
  const bg = ctx.createLinearGradient(0, 0, 0, SIZE)
  bg.addColorStop(0, NAVY_TOP)
  bg.addColorStop(1, NAVY_BOTTOM)
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, SIZE, SIZE)

  // Logo circular arriba
  try {
    const logo = await loadImage(logoUrl)
    ctx.drawImage(logo, SIZE / 2 - 70, 96, 140, 140)
  } catch {
    /* sin logo la tarjeta sigue sirviendo */
  }
  ctx.fillStyle = WHITE
  ctx.textAlign = "center"
  ctx.font = "600 44px Inter, system-ui, sans-serif"
  ctx.fillText("Aviatory", SIZE / 2, 296)

  // Galones del hito, centrados sobre la cifra
  const stripes = stripesFor(days)
  if (stripes > 0) {
    ctx.fillStyle = AMBER
    const barW = 220
    const barH = 16
    const gap = 14
    const blockH = stripes * barH + (stripes - 1) * gap
    const top = 420 - blockH / 2
    for (let i = 0; i < stripes; i += 1) {
      ctx.beginPath()
      ctx.roundRect(SIZE / 2 - barW / 2, top + i * (barH + gap), barW, barH, 8)
      ctx.fill()
    }
  }

  // La cifra
  ctx.fillStyle = WHITE
  ctx.font = "600 300px Inter, system-ui, sans-serif"
  ctx.fillText(String(days), SIZE / 2, 750)
  ctx.fillStyle = AMBER
  ctx.font = "600 56px Inter, system-ui, sans-serif"
  ctx.fillText(days === 1 ? "día de racha de estudio" : "días de racha de estudio", SIZE / 2, 830)

  // Pie
  ctx.fillStyle = MUTED
  ctx.font = "500 36px Inter, system-ui, sans-serif"
  if (username) ctx.fillText(`@${username}`, SIZE / 2, 930)
  ctx.font = "500 32px Inter, system-ui, sans-serif"
  ctx.fillText("La escuela de los pilotos de LATAM · aviatoryapp.com", SIZE / 2, username ? 986 : 950)

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("no se pudo exportar"))), "image/png")
  })
}

/**
 * Comparte la racha: hoja nativa si el navegador comparte archivos (celular),
 * descarga si no. Devuelve el medio usado para que la pantalla avise.
 */
export async function shareStreak(days: number, username: string | null): Promise<"share" | "download"> {
  const blob = await renderStreakCard(days, username)
  const file = new File([blob], `racha-aviatory-${days}-dias.png`, { type: "image/png" })

  if (typeof navigator.canShare === "function" && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: "Mi racha en Aviatory",
        text: `${days} ${days === 1 ? "día" : "días"} de racha de estudio en Aviatory`,
      })
      return "share"
    } catch {
      // El usuario canceló la hoja de compartir: no descargamos a la fuerza.
      return "share"
    }
  }

  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = file.name
  a.click()
  URL.revokeObjectURL(url)
  return "download"
}

// @vitest-environment node
import { describe, expect, it } from "vitest"
import vercel from "../vercel.json"
import indexHtml from "../index.html?raw"

type Cabecera = { key: string; value: string }

function cabecerasDe(source: string): Cabecera[] {
  return vercel.headers.find((h) => h.source === source)?.headers ?? []
}

function valor(key: string): string {
  const cabecera = cabecerasDe("/(.*)").find((h) => h.key === key)
  if (!cabecera) throw new Error(`vercel.json no define ${key}`)
  return cabecera.value
}

function directiva(politica: string, nombre: string): string[] {
  const d = politica
    .split(";")
    .map((p) => p.trim().split(/\s+/))
    .find(([n]) => n === nombre)
  return d ? d.slice(1) : []
}

async function sha256(texto: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(texto))
  return `'sha256-${btoa(String.fromCharCode(...new Uint8Array(digest)))}'`
}

describe("cabeceras HTTP de vercel.json", () => {
  it("nadie puede meter la app en un iframe ni cargar plugins", () => {
    const csp = valor("Content-Security-Policy")
    expect(directiva(csp, "frame-ancestors")).toEqual(["'none'"])
    expect(directiva(csp, "object-src")).toEqual(["'none'"])
    expect(valor("X-Frame-Options")).toBe("DENY")
    expect(valor("X-Content-Type-Options")).toBe("nosniff")
  })

  it("el micrófono sigue permitido para el Simulacro TEA", () => {
    expect(valor("Permissions-Policy")).toContain("microphone=(self)")
  })

  it("la CSP autoriza, por hash, cada script en línea de index.html", async () => {
    // Vercel construye desde git (LF): el hash se calcula sobre ese contenido.
    const html = indexHtml.replace(/\r\n/g, "\n")
    const enLinea = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1])
    expect(enLinea.length).toBeGreaterThan(0)

    const scriptSrc = directiva(valor("Content-Security-Policy"), "script-src")
    for (const script of enLinea) {
      // Si cambias el script del tema en index.html, actualiza su hash en vercel.json.
      expect(scriptSrc).toContain(await sha256(script))
    }
    expect(scriptSrc).not.toContain("'unsafe-inline'")
  })

  it("los archivos con hash de /assets se cachean para siempre", () => {
    expect(cabecerasDe("/assets/(.*)")).toContainEqual({
      key: "Cache-Control",
      value: "public, max-age=31536000, immutable",
    })
  })
})

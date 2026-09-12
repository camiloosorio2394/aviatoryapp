import { describe, expect, it } from "vitest"

/**
 * Ningún archivo de `src/` puede leer la respuesta de Supabase ignorando su
 * `error`.
 *
 * Por qué existe esta prueba: `IcaoInterview` pedía `country` a `pilot_state`,
 * que no tiene esa columna, y PostgREST rechazaba la consulta entera. Como el
 * código hacía `.then(({ data }) => …)` sin mirar `error`, el fallo no dejaba
 * rastro: las respuestas de la entrevista salían genéricas para todo el mundo y
 * la pantalla pedía «completa tu perfil» a quien ya lo tenía completo. Nadie se
 * enteró hasta que alguien comparó las consultas con el esquema real.
 *
 * La misma forma escondía otros tres: el desplegable vacío del Exam Tracker, el
 * «cero referidos» que en realidad era una consulta caída, y la foto de la barra.
 *
 * Qué hacer si esta prueba falla: no la cambies, mira el `error`. Si el fallo
 * rompe algo que el piloto esperaba, va por `reportarError`; si es degradado y
 * esperable, por `console.warn`. Está en CLAUDE.md.
 */

// Vite lee los archivos en la prueba; nada de esto entra al bundle de la app.
const fuentes = import.meta.glob<string>("/src/**/*.{ts,tsx}", {
  query: "?raw",
  import: "default",
  eager: true,
})

/** Formas de sacar `data` de una respuesta de Supabase sin sacar `error`. */
const SOSPECHOSAS: { patron: RegExp; comoSeVe: string }[] = [
  { patron: /\.then\(\s*\(\s*\{\s*data\s*\}\s*\)/g, comoSeVe: ".then(({ data }) =>" },
  { patron: /(?:const|let)\s+\{\s*data\s*\}\s*=\s*await\s+supabase/g, comoSeVe: "const { data } = await supabase" },
  {
    patron: /(?:const|let)\s+\{\s*data\s*:\s*[a-zA-Z0-9_]+\s*\}\s*=\s*await\s+supabase/g,
    comoSeVe: "const { data: x } = await supabase",
  },
]

/**
 * La API de Auth es la excepción legítima: `getSession()` y `getUser()`
 * devuelven `session: null` o `user: null` cuando algo va mal, y todo el repo
 * comprueba ese null. `onAuthStateChange` ni siquiera trae `error`. Ahí no hay
 * nada que se esté tragando.
 */
const API_DE_AUTH = /auth\.getSession|auth\.getUser|onAuthStateChange/

describe("los errores de Supabase no se tragan", () => {
  it("ningún archivo de src/ lee `data` sin mirar `error`", () => {
    const culpables: string[] = []

    for (const [ruta, texto] of Object.entries(fuentes)) {
      if (/\.test\.tsx?$/.test(ruta)) continue

      for (const { patron, comoSeVe } of SOSPECHOSAS) {
        for (const m of texto.matchAll(patron)) {
          // Se mira alrededor de la coincidencia para saber a qué API llama.
          const alrededor = texto.slice(Math.max(0, m.index - 120), m.index + 160)
          if (API_DE_AUTH.test(alrededor)) continue
          const linea = texto.slice(0, m.index).split("\n").length
          culpables.push(`${ruta}:${linea}  →  ${comoSeVe}`)
        }
      }
    }

    expect(culpables).toEqual([])
  })

  it("la prueba de verdad busca algo: reconoce la forma que escondió el bug", () => {
    const ejemplo = `supabase.from("pilot_state").select("country").then(({ data }) => setPilot(data))`
    expect(SOSPECHOSAS.some(({ patron }) => new RegExp(patron.source).test(ejemplo))).toBe(true)
  })
})

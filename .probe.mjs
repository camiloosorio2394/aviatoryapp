import fs from "node:fs"
import { createServer } from "vite"
const S = process.argv[2], ID = process.argv[3]
const s = await createServer({ server: { middlewareMode: true }, appType: "custom", logLevel: "silent" })
const d = await s.ssrLoadModule("/src/lib/psicotecnicasFiguras.ts")
const { FIGURAS_A1 } = await s.ssrLoadModule("/src/data/psicotecnicas/figurasA1.ts")
const f = FIGURAS_A1[ID]
const pintar = (svg) => svg.replace("color:inherit", "color:#101828;background:#fff;--muted-foreground:#667")
fs.writeFileSync(`${S}/dib.svg`, pintar(d.svgEnunciado(f)))
const ops = f.opciones.map((_, i) => d.svgOpcion(f, i))
const w = Number(ops[0].match(/width="([\d.]+)"/)[1]), h = Number(ops[0].match(/height="([\d.]+)"/)[1])
const juntas = ops.map((o, i) => `<g transform="translate(${i * (w + 14)} 0)">${o.replace(/^<svg[^>]*>/, "").replace("</svg>", "")}</g>`).join("")
fs.writeFileSync(`${S}/dibops.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="${(w + 14) * 5}" height="${h}" viewBox="0 0 ${(w + 14) * 5} ${h}" style="color:#101828;background:#fff">${juntas}</svg>`)
await s.close()

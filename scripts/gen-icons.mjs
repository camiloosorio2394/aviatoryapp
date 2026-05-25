// One-shot icon generator: rasterizes the brand SVG into PNG favicons.
// Run with: node scripts/gen-icons.mjs
// Requires `sharp` installed (use `npm install --no-save sharp` to install ad-hoc).

import sharp from "sharp"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, "..")
const srcSvg = resolve(root, "src/assets/logos/aviatory-isotype-app-icon.svg")
const out = resolve(root, "public")
const svgBuffer = readFileSync(srcSvg)

const targets = [
  { file: "favicon-16x16.png", size: 16 },
  { file: "favicon-32x32.png", size: 32 },
  { file: "favicon-48x48.png", size: 48 },
  { file: "apple-touch-icon.png", size: 180 },
  { file: "android-chrome-192x192.png", size: 192 },
  { file: "android-chrome-512x512.png", size: 512 },
]

for (const { file, size } of targets) {
  const outPath = resolve(out, file)
  await sharp(svgBuffer, { density: 384 })
    .resize(size, size, { fit: "contain" })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outPath)
  console.log(`  ✓ ${file} (${size}x${size})`)
}
console.log("Done.")

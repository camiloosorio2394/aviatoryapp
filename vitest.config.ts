import { fileURLToPath } from "node:url"
import { defineConfig } from "vitest/config"

// Aparte de vite.config.ts para que las pruebas no carguen el plugin de la PWA.
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
  },
})

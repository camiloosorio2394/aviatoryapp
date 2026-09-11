import { fileURLToPath } from "node:url"
import { defineConfig } from "vitest/config"

// Aparte de vite.config.ts para que las pruebas no carguen el plugin de la PWA.
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "jsdom",
    // Un cliente de Supabase que nunca sale a la red: las pruebas simulan sus respuestas.
    env: {
      VITE_SUPABASE_URL: "http://127.0.0.1:54321",
      VITE_SUPABASE_ANON_KEY: "clave-anon-de-pruebas",
    },
    include: ["src/**/*.test.{ts,tsx}", "scripts/**/*.test.ts"],
  },
})

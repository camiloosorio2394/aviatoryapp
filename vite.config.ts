import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // 'prompt' (no 'autoUpdate'): cuando hay una versión nueva NO recargamos
      // sola — mostramos un aviso ("Actualizar") vía ReloadPrompt para que el
      // usuario no pierda lo que esté haciendo. Ver src/components/ReloadPrompt.tsx
      registerType: 'prompt',
      injectRegister: 'auto',
      includeAssets: [
        'favicon-16x16.png',
        'favicon-32x32.png',
        'favicon-48x48.png',
        'apple-touch-icon.png',
        'og-default.png',
        'robots.txt',
        'sitemap.xml',
      ],
      manifest: {
        name: 'Aviatory',
        short_name: 'Aviatory',
        description: 'De estudiante piloto a candidato de aerolínea — la plataforma para pilotos LATAM',
        start_url: '/app',
        scope: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#2563eb',
        lang: 'es-CO',
        orientation: 'portrait',
        categories: ['education', 'productivity'],
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        // Pre-cache app shell (HTML/CSS/JS) + fotos bundleadas.
        // Los .jpg DEBEN precachearse: un cliente con SW viejo pide los
        // hashes de imagen del deploy anterior, que ya no existen en el
        // deploy nuevo (404 = imagen rota). Precacheadas viajan con su
        // version de la app.
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,woff2}'],
        // Los recortes de NOTAM son la excepcion: son material de estudio de
        // una seccion concreta, crecen con cada lote nuevo y la mayoria de los
        // usuarios no los abre. Precachearlos encarece la instalacion para
        // todos, incluidos los que nunca entran al modulo. Van bajo demanda y
        // se quedan en cache la primera vez que se ven (runtimeCaching, abajo).
        // Estos archivos NO llevan hash en el nombre, asi que tampoco sufren el
        // problema de 404 entre deploys que obliga a precachear los .jpg.
        // Las infografias del curso son el mismo caso: 400 KB de ilustraciones
        // de una seccion concreta. Van bajo demanda por el mismo motivo.
        // Las ilustraciones de los modulos (public/modulos/<modulo>/) son el
        // mismo caso que las infografias: material de una seccion concreta.
        globIgnores: ['notams/**', 'infografias/**', 'modulos/**'],
        // Don't pre-cache API responses or auth-required pages
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [
          /^\/_/,
          /\/[^/?]+\.[^/]+$/,  // assets with extensions
        ],
        runtimeCaching: [
          {
            // Supabase API calls: network-first (always fresh, fallback to cache)
            urlPattern: /^https:\/\/gvwqmfxphsbmbrhyjcmk\.supabase\.co\/.*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-cache',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24,  // 1 day
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Recortes de NOTAM: fuera del precache, pero se guardan la primera
            // vez que se abren. Quien estudia la seccion los tiene offline en la
            // segunda visita; quien no entra nunca no los descarga jamas.
            urlPattern: /\/notams\/.*\.(webp|png)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'notam-images',
              expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 180 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Ilustraciones de las infografias: mismo trato que los recortes.
            // Quien abre la seccion las tiene offline en la segunda visita.
            urlPattern: /\/infografias\/.*\.(webp|png)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'infografia-images',
              expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 180 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Ilustraciones de las lecciones de modulo: mismo trato.
            urlPattern: /\/modulos\/.*\.(webp|png|jpg)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'modulo-images',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 180 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Fonts: cache-first (rarely change)
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts-cache',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
        cleanupOutdatedCaches: true,
      },
      devOptions: {
        enabled: false,  // disable SW in dev for hot reload sanity
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

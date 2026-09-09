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
          // Las tres reglas de imagenes bajo demanda comparten dos reglas de
          // oro, aprendidas a golpes:
          //
          // 1) Solo se guarda lo que ES una imagen. Una peticion a un archivo
          //    que todavia no existe no devuelve 404: el rewrite del SPA la
          //    contesta con index.html y un 200. Con statuses [0,200] eso se
          //    guardaba como si fuera la imagen, y CacheFirst no vuelve a
          //    preguntar NUNCA: la portada quedaba rota para siempre en ese
          //    dispositivo, aunque despues subieramos el archivo bueno. Filtrar
          //    por Content-Type corta eso de raiz.
          //
          //    El rewrite tambien se arreglo: el "source" de vercel.json excluye
          //    modulos/, notams/, infografias/ y assets/, asi que ahi un archivo
          //    que falta vuelve a dar 404. Ese archivo NO admite comentarios: el
          //    esquema de Vercel rechaza cualquier propiedad de mas y tumba el
          //    despliegue entero, asi que el porque vive aqui. Este filtro
          //    protege igual aunque alguien deshaga aquel cambio.
          //
          // 2) El nombre del cache lleva version. Al subirla, los caches
          //    envenenados de antes quedan huerfanos y se dejan de consultar,
          //    que es la unica forma de recuperar a quien ya los tiene.
          //
          // Solo .webp a proposito: es lo que produce scripts/optimizar-imagenes.mjs
          // y lo que manda public/modulos/LEEME.md. Un .png suelto no se cachea,
          // que es un fallo inofensivo comparado con guardar HTML.
          {
            // Recortes de NOTAM: fuera del precache, pero se guardan la primera
            // vez que se abren. Quien estudia la seccion los tiene offline en la
            // segunda visita; quien no entra nunca no los descarga jamas.
            urlPattern: /\/notams\/.*\.webp$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'notam-images-v2',
              expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 180 },
              cacheableResponse: { statuses: [200], headers: { 'Content-Type': 'image/webp' } },
            },
          },
          {
            // Ilustraciones de las infografias: mismo trato que los recortes.
            // Quien abre la seccion las tiene offline en la segunda visita.
            urlPattern: /\/infografias\/.*\.webp$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'infografia-images-v2',
              expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 180 },
              cacheableResponse: { statuses: [200], headers: { 'Content-Type': 'image/webp' } },
            },
          },
          {
            // Ilustraciones de las lecciones de modulo: mismo trato.
            urlPattern: /\/modulos\/.*\.webp$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'modulo-images-v2',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 180 },
              cacheableResponse: { statuses: [200], headers: { 'Content-Type': 'image/webp' } },
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

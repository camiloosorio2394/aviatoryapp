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
        // Pre-cache app shell (HTML/CSS/JS)
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
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

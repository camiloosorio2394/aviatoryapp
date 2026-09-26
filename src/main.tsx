import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
// Las fuentes, desde el propio dominio (antes Google Fonts). Solo se descarga
// el alfabeto que la página usa: cada archivo lleva su unicode-range.
import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/manrope/wght.css'
import '@fontsource-variable/playfair-display/wght.css'
import '@fontsource-variable/playfair-display/wght-italic.css'
import '@fontsource-variable/archivo/wght.css'
import '@fontsource-variable/jetbrains-mono/wght.css'
import './index.css'
import App from './App.tsx'
import { initAnalytics } from './lib/analytics'
import { escucharErroresGlobales } from './lib/errores'
import { limpiarCachesJubilados } from './lib/limpiezaCaches'
import { protegerDatosDeEsteEquipo } from './lib/sesionEnEsteEquipo'
import { watchSystemTheme } from './lib/theme'

// Lo que ninguna pantalla atrapa también se reporta (src/lib/errores.ts).
escucharErroresGlobales()
initAnalytics()
// Día/noche automático: si la preferencia es "system", sigue al SO en vivo.
watchSystemTheme()
// Saca la basura de cachés que ya no usa el service worker. Sin await: no
// tiene que retrasar el primer pintado, y si falla no pasa nada.
void limpiarCachesJubilados()
// Antes de pintar: ninguna pantalla debe alcanzar a leer ni subir datos
// locales de otro piloto que usó este navegador.
protegerDatosDeEsteEquipo()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Analytics />
    </BrowserRouter>
  </StrictMode>,
)

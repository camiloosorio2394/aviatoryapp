import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.tsx'
import { initAnalytics } from './lib/analytics'
import { limpiarCachesJubilados } from './lib/limpiezaCaches'
import { protegerDatosDeEsteEquipo } from './lib/sesionEnEsteEquipo'
import { watchSystemTheme } from './lib/theme'

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

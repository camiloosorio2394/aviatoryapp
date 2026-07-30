import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.tsx'
import { initAnalytics } from './lib/analytics'
import { watchSystemTheme } from './lib/theme'

initAnalytics()
// Día/noche automático: si la preferencia es "system", sigue al SO en vivo.
watchSystemTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Analytics />
    </BrowserRouter>
  </StrictMode>,
)

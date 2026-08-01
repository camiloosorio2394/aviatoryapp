# Créditos de fotografía

Todas las fotos de `src/assets/photos/` vienen de Unsplash bajo la
[Unsplash License](https://unsplash.com/license): uso comercial permitido,
sin atribución obligatoria. Se listan igual los créditos por cortesía y
para poder rastrear el original si hay que re-descargar en otra resolución.

| Archivo | Uso | Fuente |
|---|---|---|
| `icao-night-cockpit.jpg` | Card Inglés ICAO (landing + hero) | https://unsplash.com/photos/vIXXmgGp4gU (Rodrigo Soares) |
| `pca-flightdeck.jpg` | Card Examen PCA | https://unsplash.com/photos/Ff5dTEd_uxQ (Benjamin Chambon) |
| `psicotecnicas-mano-panel.jpg` | Card Psicotécnicas | https://unsplash.com/photos/4UgUpo3YdKk |
| `entrevistas-interview.jpg` | Card Simulador de entrevistas | https://unsplash.com/photos/eF7HN40WbAQ |
| `aerolinea-piloto.jpg` | Card Ingreso a aerolínea | https://unsplash.com/photos/1FDKmozNMac (Oliver Streit) |
| `wingman-cockpit-dusk.jpg` | Card Wingman | https://unsplash.com/photos/eUCmDtS9x3w (Shot By Joe) |
| `cta-cockpit-dawn.jpg` | Banda CTA final de la landing | https://unsplash.com/photos/ypsFFH-XRv0 |
| `notam-aprende-planeacion.jpg` | Card NOTAM · Aprende | https://unsplash.com/photos/OPVCcRg5NXU (Michal Mokrzycki) |
| `notam-decodificador-tablero.jpg` | Card NOTAM · Decodificador | https://unsplash.com/photos/EmqjMxS7IsY (Joseph Bobadilla) |
| `notam-practica-cabina.jpg` | Card NOTAM · Práctica | https://unsplash.com/photos/7ofz-Ps2E8w (Pasqualino Capobianco) |
| `notam-evaluacion-examen.jpg` | Card NOTAM · Evaluación | https://unsplash.com/photos/oXV3bzR7jxI (Ben Mullins) |
| `metar-leccion-nubes.jpg` | Card METAR · Aprende | https://unsplash.com/photos/ap3LXI0fPJY (Jason Mavrommatis) |
| `metar-decodificador-manga.jpg` | Card METAR · Decodificador | https://unsplash.com/photos/gDULrt23rXM (Ben Soyka) |
| `metar-practica-cabina-nubes.jpg` | Card METAR · Práctica | https://unsplash.com/photos/_4PsqBPe7RU (Walter Mmari) |
| `metar-evaluacion-escritorio.jpg` | Card METAR · Evaluación | https://unsplash.com/photos/h6pUcouJ9BA (sara sanchez sabogal) |

Reglas al agregar fotos nuevas:

- Descargar con `?w=800&q=70&fm=jpg` para las tarjetas de curso (miden 144 px
  de alto: no necesitan 2000 px de ancho) o `?w=1600` para heros full-width.
- **Ninguna foto pasa de 260 KB.** Es el techo del repositorio, medido contra
  las que ya estaban.
- Evitar fotos con branding visible de aerolíneas reales (Ryanair, United,
  etc. desentonan con la marca).
- **Verificar que la foto NO sea Unsplash+.** El buscador mezcla resultados de
  Unsplash+ (licencia de pago, casi siempre acreditados a "Getty Images") con
  los de Unsplash License. `https://unsplash.com/napi/photos/<id>` devuelve
  `plus` y `premium`: si alguno es `true`, la foto no se puede usar.
- Importarlas como módulo (`import x from "@/assets/photos/y.jpg"`), nunca por
  ruta pública: así entran al bundle con hash y al precache del service worker
  (`globPatterns` de `vite.config.ts` ya incluye `jpg`).

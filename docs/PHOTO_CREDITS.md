# Créditos de fotografía

Todas las fotos de `src/assets/photos/` vienen de Unsplash bajo la
[Unsplash License](https://unsplash.com/license): uso comercial permitido,
sin atribución obligatoria. Se listan igual los créditos por cortesía y
para poder rastrear el original si hay que re-descargar en otra resolución.

| Archivo | Uso | Fuente |
|---|---|---|
| `icao-night-cockpit.webp` | Card Inglés ICAO (landing + hero) | https://unsplash.com/photos/vIXXmgGp4gU (Rodrigo Soares) |
| `pca-flightdeck.webp` | Card Examen PCA | https://unsplash.com/photos/Ff5dTEd_uxQ (Benjamin Chambon) |
| `psicotecnicas-mano-panel.webp` | Card Psicotécnicas | https://unsplash.com/photos/4UgUpo3YdKk |
| `entrevistas-interview.webp` | Card Simulador de entrevistas | https://unsplash.com/photos/eF7HN40WbAQ |
| `aerolinea-piloto.webp` | Card Ingreso a aerolínea | https://unsplash.com/photos/1FDKmozNMac (Oliver Streit) |
| `wingman-cockpit-dusk.webp` | Card Wingman | https://unsplash.com/photos/eUCmDtS9x3w (Shot By Joe) |
| `cta-cockpit-dawn.jpg` | Banda CTA final de la landing | https://unsplash.com/photos/ypsFFH-XRv0 |
| `notam-aprende-planeacion.webp` | Card NOTAM · Aprende | https://unsplash.com/photos/OPVCcRg5NXU (Michal Mokrzycki) |
| `notam-decodificador-tablero.webp` | Card NOTAM · Decodificador | https://unsplash.com/photos/EmqjMxS7IsY (Joseph Bobadilla) |
| `notam-practica-cabina.webp` | Card NOTAM · Práctica | https://unsplash.com/photos/7ofz-Ps2E8w (Pasqualino Capobianco) |
| `notam-evaluacion-examen.webp` | Card NOTAM · Evaluación | https://unsplash.com/photos/oXV3bzR7jxI (Ben Mullins) |
| `metar-leccion-nubes.webp` | Card METAR · Aprende | https://unsplash.com/photos/ap3LXI0fPJY (Jason Mavrommatis) |
| `metar-decodificador-manga.webp` | Card METAR · Decodificador | https://unsplash.com/photos/gDULrt23rXM (Ben Soyka) |
| `metar-practica-cabina-nubes.webp` | Card METAR · Práctica | https://unsplash.com/photos/_4PsqBPe7RU (Walter Mmari) |
| `metar-evaluacion-escritorio.webp` | Card METAR · Evaluación | https://unsplash.com/photos/h6pUcouJ9BA (sara sanchez sabogal) |
| `tema-notam-pista-luces.webp` | Card del tema NOTAM en Ingreso a aerolínea | https://unsplash.com/photos/SgWHP0mZ6-w (Fabio Sasso) |
| `meteorologia-hero.webp` | Hero del módulo Meteorología (foto + capa de rótulos) | https://unsplash.com/photos/er7TM4GPqWg (Nikola Ancevski) |
| `tema-meteorologia-nubes-altura.webp` | Card del tema Meteorología en Ingreso a aerolínea | https://unsplash.com/photos/10lbZPBl3Zw (Vilmantas Bekesius) |

## Imágenes de módulo (`public/modulos/`)

Estas NO van en `src/assets/photos/` ni se importan como módulo: son material
de una sección concreta y tienen que quedar fuera del precache (ver
`public/modulos/LEEME.md` y el `globIgnores` de `vite.config.ts`). Se
referencian por ruta pública. La licencia es la misma y se registra igual.

| Archivo | Uso | Fuente |
|---|---|---|
| `mt-t08-02-cumulonimbus-yunque.webp` | Lección 08 · bloque «reconoce»: cumulonimbus maduro | https://unsplash.com/photos/aDLdo_VpYfA (swiftsight) |
| `mt-t08-03-estratos-base-uniforme.webp` | Lección 08 · bloque «reconoce»: capa de estratos | https://unsplash.com/photos/y5deIvLooMM (Beckan McCarthy) |
| `mt-t08-04-cumulos-en-torre.webp` | Lección 08 · bloque «reconoce»: cúmulos en torre | https://unsplash.com/photos/sBaRguXeVGU (Richard) |
| `mt-por-01-preparacion-vuelo.webp` | Lección 13 · de dónde sale el dato y dónde se usa | https://unsplash.com/photos/o4ExeQbdhyg (Kajetan Sumila) |
| `mt-img-01-cumulonimbo-desde-el-aire.webp` | Lección 18 · el cumulonimbo desde crucero | https://unsplash.com/photos/igFGgdjlBF4 (Nimbus Vulpis) |
| `mt-img-02-pista-baja-visibilidad.webp` | Lección 16 · el RVR hecho imagen | https://unsplash.com/photos/WpKZL_8CtRU (Amsterdam City Archives) |

Las seis se comprobaron una a una contra la regla de Unsplash+: en la ficha de
resultado, una foto de pago enlaza a `/plus` y **no** ofrece enlace de descarga.
Las seis tienen enlace de descarga directo, así que son Unsplash License.
El endpoint `napi/photos/<id>` que cita la regla de abajo hoy responde
`307 Authorization required`, así que esa comprobación ya no sirve sin clave.

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

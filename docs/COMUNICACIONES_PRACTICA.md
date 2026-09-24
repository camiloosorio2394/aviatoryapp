# Comunicaciones: motor de práctica con audio

Motor de los diez ejercicios con radio del módulo «Comunicaciones aeronáuticas y gestión ATC
(OACI)». Está hecho, probado y **enchufado** (24-sep-2026) en `src/pages/ComunicacionesPractice.tsx`
a través de `src/lib/comunicacionesPracticaGrupos.ts`; lo que se hizo está en
`docs/COMUNICACIONES_ESTADO.md`, «Qué se hizo (pasos 4 y 5)». «Cómo se enchufa», al final, queda
como registro.

## Arquitectura

```
contenido/audio/comunicaciones.json          manifiesto: id, texto, voz, perfil de cada transmisión
public/modulos/comunicaciones/audio/<id>.mp3 los audios (voz limpia, mono, 24 kHz)
scripts/audio/comunicaciones.mjs             valida el manifiesto y lista los mp3 que faltan
scripts/audio/README.md                      formato de salida y cómo generarlos con Higgsfield

src/lib/radio/                               reproductor de radio VHF (sin React)
  tipos.ts        Transmision, VozRadio, PerfilRadio, FuenteAudio
  perfiles.ts     limpia / normal / sucia: banda, ruido, saturación, interferencia, cortes
  senales.ts      ruido rosa, squelch, curva de saturación y cortes, generados por código
  reproductor.ts  crearReproductorRadio(): mp3 → cadena Web Audio; si no hay mp3, voz del navegador
src/hooks/useRadio.ts                        el reproductor para una pantalla: repeticiones y velocidad

src/lib/comunicacionesNormalizar.ts          números hablados, alfabeto y formato de campos
src/lib/comunicacionesPractica.ts            tipos de los diez ejercicios y su calificación (puras)
src/lib/comunicacionesPracticaEjemplos.ts    2 o 3 ítems de ejemplo por tipo (Doc 9432)

src/components/comunicaciones/practica/      los diez componentes, más piezas comunes
  CopiaAutorizacion, ReadbackVoz, EsParaMi, Hearback, QueRespondes,
  Desarmala, PanelCabina, RafagaNumeros, EstandarOPlain, VueloCompleto
  EjercicioCm     pinta cualquier ejercicio simple según su `tipo`
  piezas.tsx      tarjeta, control de radio, transcripción, anuncio (aria-live), veredicto
  tokens.ts       acento, verde/rojo/ámbar semánticos, foco visible
  index.ts        exporta todo
```

### El reproductor

`crearReproductorRadio().reproducir(transmision, { perfil, velocidad })`:

1. Pide `/modulos/comunicaciones/audio/<id>.mp3` con `fetch` (propio dominio: `connect-src 'self'`).
   Si la respuesta no es 2xx **o no trae `Content-Type` de audio** (un index.html con 200 del
   rewrite del SPA), no hay audio. Los ids sin audio se recuerdan en la sesión y no se vuelven a pedir.
2. Con audio: `decodeAudioData` y la cadena
   `pasa altos → pasa bajos → realce de presencia → saturación → compresor → voz`, más ruido rosa en
   bucle por un pasa banda, clic y ráfaga de squelch al abrir y la «cola» al cerrar. En `sucia`,
   además, un silbido de batido que sube y baja y cortes breves de señal (nunca en el primer
   medio segundo, para que el distintivo se oiga). La velocidad cambia `playbackRate`.
3. Sin audio (404, sin red o no decodificable): habla `speechSynthesis` en inglés, con voz y tono
   según el papel (ATC, piloto, PM). Esa voz no pasa por Web Audio, así que no lleva filtro, pero
   el ruido de fondo y el squelch suenan alrededor. Tope de tiempo por si Chrome no dispara `onend`.
4. Sin Web Audio ni voz del navegador: devuelve `fuente: "texto"` y los componentes muestran la
   transmisión escrita desde el principio.

Nada viene de otro dominio y el ruido es código: **no hay que tocar la CSP de `vercel.json`**.
El `AudioContext` nace en el primer toque del piloto, así que no choca con el bloqueo de autoplay.

### `useRadio`

```ts
const radio = useRadio({ limiteRepeticiones: 2, modoExamen: false, perfil: "sucia" })
await radio.escuchar(tx)            // o una secuencia: radio.escuchar([atc, pm])
```

- La primera vez que suena una transmisión (o una secuencia) es gratis; cada vez que vuelve a sonar
  cuenta como repetición. El botón se llama «Say again». Con el límite agotado, no suena más.
- `modoExamen`: velocidad fija en 1 y sin selector. Los componentes, además, quitan «Volver a intentarlo».
- `sonandoIndice` dice qué transmisión de la secuencia suena (lo usa «¿Es para mí?»).
- `fuente` dice si sonó el mp3, la voz sintética o nada.

## Formato de datos de cada tipo

Todo ítem lleva `id` (único en su tipo), `fuente` (párrafo de origen, p. ej. «Doc 9432 2.8.3.7»),
`explicacion` y, opcional, `repeticiones` (por defecto 2; 0 en «¿Es para mí?» y la ráfaga).
Toda transmisión es una `Transmision` `{ id, texto, voz, perfil }` que tiene que estar en el
manifiesto. Los tipos exactos están en `src/lib/comunicacionesPractica.ts`.

| # | Tipo (`tipo`) | Campos propios | Calificación |
|---|---|---|---|
| 1 | Copia la autorización (`copia`) | `transmision`, `campos[]`: `{ id, etiqueta, tipo, esperado, alternativas?, ayuda? }` | por campo, normalizando (FL240 = flight level 240 = 240; 118,7 = 118.700; 050 = 50) |
| 2 | Readback con voz (`readback`) | `transmision`, `elementos[]`: `{ id, etiqueta, tipo, valor, alternativas? }`, `modelo` | presencia de cada elemento crítico; números dichos en palabras («two four zero», «tree», «niner», «fife») |
| 3 | ¿Es para mí? (`esParaMi`) | `distintivo`, `transmisiones[]`: `{ transmision, paraMi }` | aciertos, omisiones y falsas alarmas |
| 4 | Hearback (`hearback`) | `instruccion`, `colacion` (voz `piloto_pm`), `elementos[]`: `{ id, etiqueta }`, `error`: id o null | «correcto» si `error` es null; si no, el elemento equivocado |
| 5 | ¿Qué respondes? (`queRespondes`) | `situacion`, `transmision`, `opciones[4]`, `correcta` | la opción correcta |
| 6 | Desármala (`desarmala`) | `transmision`, `fichas[]`: `{ id, texto, categoria }` con categoría `distintivo`, `accion`, `valor`, `condicion` o `siguiente` | ficha por ficha |
| 7 | Panel de cabina (`panel`) | `transmision`, `inicial`: `{ hdg, alt, spd, vs }`, `objetivo` (solo lo que se revisa), `conVs?`, `altEnNivel?` | control por control; altitud en pies (FL240 = 24000) |
| 8 | Ráfaga de números (`rafaga`) | `dictados[]`: `{ id, tipo, transmision, esperado }`, `segundos` | bien y dentro del tiempo, contado desde que termina de sonar |
| 9 | ¿Estándar o plain? (`estandarOPlain`) | `situacion`, `transmision?`, `clasificacion` (`fraseologia` o `plain`), `frase?`, `bloques?` por `problema`, `capacidad`, `necesidad`, `intencion`: `{ opciones, correcta }` | clasificación + cada bloque |
| 10 | Vuelo completo (`vueloCompleto`) | `titulo`, `pasos[]`: `{ fase, perfil, ejercicio }` con cualquiera de los nueve tipos | suma de aciertos y totales de todos los pasos; cuenta el primer intento de cada paso |

Tipos de campo que sabe comparar la normalización (`TipoCampo`): `limite`, `ruta`, `salida`,
`nivel`, `altitud`, `rumbo`, `frecuencia`, `squawk`, `qnh`, `pista`, `distintivo`, `velocidad`,
`texto`. En los de texto se quitan espacios, signos y las palabras de relleno («via», «departure»,
«VOR», «runway»), y el alfabeto de deletreo pasa a letras («Alfa one» = A1).

Cada componente recibe `{ item, perfil?, modoExamen?, onResultado?, reproductor? }`
(`PropsEjercicio`). `onResultado({ aciertos, total })` se llama cada vez que el ejercicio queda
resuelto; la página decide qué guarda.

## Cómo agregar ítems

1. Escribe la fraseología **solo de fuentes cargadas** y cita el párrafo en `fuente`. Lo que no sea
   fraseología OACI va rotulado PLAIN LANGUAGE; lo no verificado, con «verificar» y el documento.
   Distintivo `AVIATORY 452` (parecidos: 425 y 542). Nada de raya larga ni media.
2. El `texto` de la transmisión va como se dice: números en palabras dígito a dígito
   (Doc 9432 2.4.2), «thousand» y «hundred» en altitudes (2.4.3), «decimal» en frecuencias (2.4.4),
   «niner» para el 9.
3. Agrega la transmisión al manifiesto `contenido/audio/comunicaciones.json` con el mismo
   `id`, `texto`, `voz` y `perfil`. Si no, `scripts/audio/comunicaciones.test.ts` falla.
4. `node scripts/audio/comunicaciones.mjs` para validar y ver qué mp3 faltan.
5. `npx vitest run src/lib/comunicacionesPractica.test.ts scripts/audio`.

El guion definitivo debería ir en un archivo propio de contenido (p. ej.
`src/lib/comunicacionesPracticaDatos.ts`) con la misma forma que el de ejemplos, que entonces se
puede borrar o dejar solo para las pruebas.

## Cómo generar y subir los audios

Detalle en `scripts/audio/README.md`. En corto: Higgsfield `seed_audio` (0,7 créditos por línea),
**voz limpia y seca**, inglés, mp3 mono 24 kHz, nombre `<id>.mp3`, en
`public/modulos/comunicaciones/audio/`. El efecto de radio lo pone la app en vivo, por eso un mismo
audio sirve para los tres perfiles. Mientras falte un mp3 habla la voz del navegador, así que se
puede probar todo antes de generar nada. Los mp3 salen con el despliegue; no van a `assets`.

## Cómo se enchufa en la página de práctica

Lo que falta lo hace quien integre (este trabajo no tocó `App.tsx`, `index.css`, `eslint.config.js`,
`vite.config.ts`, migraciones ni el catálogo):

1. **Página** `src/pages/ComunicacionesPractice.tsx`, como ruta hija del layout en `App.tsx`
   (p. ej. `/app/aerolinea/comunicaciones/practica`, con `CM_HUB` de `@/lib/comunicaciones`). Misma
   casa que `AeropuertosPractice.tsx`: cabecera, pestañas por tipo, tira de saltos, ejercicio activo.
   Para pintar el ejercicio:

   ```tsx
   import { EjercicioCm, VueloCompleto } from "@/components/comunicaciones/practica"
   import { CM_ACENTO } from "@/lib/comunicaciones"

   <div style={{ "--av-blue-500": CM_ACENTO } as React.CSSProperties}>
     {item.tipo === "vueloCompleto"
       ? <VueloCompleto key={clave} item={item} onResultado={() => marcar(clave)} />
       : <EjercicioCm key={clave} item={item} onResultado={() => marcar(clave)} />}
   </div>
   ```

   El `key` por ítem es importante: remonta el ejercicio y su contador de repeticiones.
   Los componentes toman el acento de `--av-blue-500`; re-anclarlo en la raíz (o envolver en
   `.lector-notam.lector-cm`) les da la ciruela del módulo sin tocarlos. El verde queda para
   «correcto» y ámbar/rojo para alerta y error.
2. **Claves de progreso** con `claveEjercicioCm(item)` (`cm-<tipo>-<id>`), nunca a mano. Cuando
   haya tabla de progreso, van a `contenido/catalogo/modulos.json` por el flujo de `scripts/catalogo`.
3. **ESLint**: el archivo de datos es contenido pesado. Agregar a `CONTENIDO` en `eslint.config.js`
   `@/lib/comunicacionesPracticaEjemplos` (o el de datos definitivo) permitido solo en
   `src/pages/ComunicacionesPractice.tsx`, como `@/lib/aeropuertosPractica`.
4. **Service worker** (opcional): una regla de `runtimeCaching` en `vite.config.ts` para
   `/modulos/comunicaciones/audio/*.mp3` con `CacheFirst` o `StaleWhileRevalidate` y
   `cacheableResponse: { statuses: [200], headers: { "Content-Type": "audio/mpeg" } }`, igual que
   las imágenes: así el piloto que ya escuchó un ejercicio lo tiene sin red. Sin la regla funciona
   igual, solo que sin red cae a la voz del navegador.
5. **Consentimiento del micrófono**: `ReadbackVoz` usa el mismo de dictado del TEA
   (`lib/dictado.ts`, por dispositivo). No hay que hacer nada más.

## Accesibilidad

- Todo se opera con teclado: botones nativos, `aria-pressed` en las elecciones, perillas del panel
  como `spinbutton` (flechas, RePág/AvPág, Inicio/Fin), «Desármala» se juega tocando pieza y casilla
  (arrastrar es solo un atajo de ratón).
- Foco visible del color del acento (`FOCO` en `tokens.ts`).
- Resultados en regiones `role="status"` / `aria-live`; el reloj de la ráfaga avisa en los últimos 3 s.
- El veredicto nunca es solo color: lleva icono y texto.
- La transmisión escrita aparece al responder, y desde el principio si el navegador no puede
  reproducir nada; en «¿Es para mí?» sin audio se marca sobre la lista escrita.

## Pruebas

- `src/lib/comunicacionesNormalizar.test.ts`: números hablados y formato de campos.
- `src/lib/comunicacionesPractica.test.ts`: calificación de los diez tipos y sanidad de los ejemplos.
- `src/lib/radio/reproductor.test.ts`: caída a voz sintética cuando falta el mp3 o no decodifica
  (Web Audio y `speechSynthesis` simulados), `texto` sin nada, detener, señales generadas.
- `src/components/comunicaciones/practica/practica.test.tsx`: render de los diez y las interacciones
  principales (repeticiones, modo examen, teclado del panel, hearback).
- `scripts/audio/comunicaciones.test.ts`: manifiesto válido y al día con los ejercicios.

## Pendiente

- Los 34 mp3 de ejemplo (23,8 créditos). Ninguno existe todavía.
- El guion completo (otro lo escribe). Los ejemplos solo usan Doc 9432 caps. 2, 3, 4, 6 y 7.1 a 7.3.
  En el material cargado no hay instrucciones de velocidad, así que ningún ejemplo revisa SPD.
- La página, la ruta, el progreso y la regla de ESLint (arriba).
- Probar en Safari iOS el `AudioContext` tras volver de segundo plano y en Chrome Android la voz
  sintética en inglés (depende de las voces instaladas).

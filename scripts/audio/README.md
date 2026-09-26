# Audios de la práctica de Comunicaciones

El manifiesto es `contenido/audio/comunicaciones.json`. Cada transmisión:

```json
{ "id": "cm-ej-squawk-6402", "texto": "Avianca four five two, squawk six four zero two.", "voz": "atc_latam", "perfil": "limpia" }
```

- `id`: minúsculas, cifras y guiones. **Es el nombre del archivo.**
- `texto`: lo que se dice, en inglés, con los números en palabras como se transmiten
  (Doc 9432 2.4). Sin raya larga ni media.
- `voz`: `atc_latam`, `atc_uk`, `atc_us`, `piloto` o `piloto_pm` (el compañero que colaciona).
- `perfil`: `limpia`, `normal` o `sucia`. **No se graba en el audio**: el efecto de radio se
  aplica en vivo en la app. El perfil del manifiesto es solo el de por defecto.

## Validar y ver qué falta

```bash
node scripts/audio/comunicaciones.mjs            # valida y lista los mp3 que faltan (con el costo)
node scripts/audio/comunicaciones.mjs --json     # lo mismo en JSON, para armar el lote
node scripts/audio/comunicaciones.mjs --estricto # falla si falta alguno (para CI, cuando estén todos)
```

`scripts/audio/comunicaciones.test.ts` corre la misma validación en `npx vitest run` y además
comprueba que cada transmisión de los ejercicios esté en el manifiesto con el mismo texto, voz y perfil.

## Formato de salida de cada audio

| | |
|---|---|
| Nombre | `<id>.mp3`, exactamente el id del manifiesto |
| Carpeta | `public/modulos/comunicaciones/audio/` |
| Contenedor | mp3 |
| Frecuencia de muestreo | 24 kHz |
| Canales | mono |
| Tasa | 48 a 64 kbps bastan: la app recorta a 300 a 3400 Hz |
| Contenido | **voz limpia, seca, sin efecto de radio, sin ruido, sin música** |
| Silencio | máximo 150 ms al principio y al final (el squelch lo pone la app) |
| Volumen | normalizado a unos -16 LUFS, sin picos por encima de -1 dBFS |

La voz va limpia a propósito: el filtro de banda, la saturación, el ruido, el squelch y la
interferencia se aplican en vivo según el perfil. Un audio ya ensuciado quedaría doblemente sucio
en «sucia» y no se podría usar en «limpia».

## Generarlos con Higgsfield

Modelo `seed_audio`, 0,7 créditos por línea. Por cada transmisión que falte:

1. Voz según `voz` (una voz fija por papel en toda la serie: el piloto reconoce al PM por su voz).
2. **Idioma inglés.** Revisar que la petición lleve el idioma: la trampa del idioma de la voz de
   los videos (CLAUDE.md) aplica igual aquí, al revés.
3. Texto: el `texto` del manifiesto tal cual. Ritmo de frecuencia ATC, sin exagerar la
   pronunciación OACI (TRI, FA-IF, NAI-na): «niner» ya va escrito.
4. Descargar, convertir a mp3 mono 24 kHz si hace falta
   (`ffmpeg -i entrada -ac 1 -ar 24000 -b:a 64k <id>.mp3`) y dejarlo en la carpeta.
5. `node scripts/audio/comunicaciones.mjs` hasta que no falte ninguno.

Mientras un mp3 falte, la app no se rompe: habla la voz del navegador con el ruido y el squelch
alrededor. Así se puede probar todo el motor antes de gastar créditos.

## Subirlos

Los mp3 viven en `public/` y salen con el despliegue de Vercel. No van a `src/assets` (entrarían al
precache del service worker). No hace falta tocar la CSP: se piden al propio dominio con `fetch`
(`connect-src 'self'`) y se decodifican en memoria.

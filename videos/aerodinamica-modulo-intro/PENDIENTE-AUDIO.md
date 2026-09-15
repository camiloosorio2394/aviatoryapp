# Lo que falta: la línea 7 de la locución

El video está terminado. Los ocho planos existen, los subtítulos están hechos y el mp4
está renderizado. Falta **una sola cosa**: la línea 7, la del giro.

## El bloqueo

La cuenta de HeyGen (`camiloosorio2394@gmail.com`, plan **free**) se quedó sin minutos de
TTS a mitad de la generación. Siete de las ocho líneas salieron; la octava llamada
contestó:

```
HeyGen POST /voices/speech → HTTP 402
{"error":{"code":"insufficient_credit",
          "message":"Insufficient free TTS minutes. Please upgrade your plan or purchase additional credits."}}
```

No hay sustituto aceptable. El brief manda una voz concreta y es la misma de los tres
videos anteriores:

> Voz: William Shanks (HeyGen · Starfish), `001248bb63f847888d37b766ee8b3a47`, velocidad 0.92.

El motor local (Kokoro) no es esa voz. Si la frase más importante del video suena con otra
voz, el video se rompe por la mitad. Así que se espera.

## Cómo se destraba

1. Recargar la cuenta en <https://www.heygen.com/pricing>, o desde
   `app.heygen.com` → **Settings** → **Subscriptions**. Hacen falta menos de **quince
   segundos** de TTS: la línea 7 son 26 palabras.

2. Generar **solo esa línea** (no relanzar el pipeline entero: regenerar las otras siete
   gastaría minutos otra vez y no haría falta):

   ```bash
   cd videos/aerodinamica-modulo-intro
   node ~/.claude/skills/media-use/audio/scripts/heygen-tts.mjs \
     "Al terminar, vas a ver una nariz quince grados arriba y un avión cayendo. Y por qué la actitud, por sí sola, no dice si el ala está volando." \
     -o assets/voice/07.wav --words assets/voice/07.words.json \
     --voice 001248bb63f847888d37b766ee8b3a47 --speed 0.92 --lang es
   ```

3. Meter esa línea en `audio_meta.json` y en `audio_engine_meta.json` (entrada `id: "07"`,
   con su `path`, su `duration_s` y sus `words`), en el orden que le toca: entre la 06 y
   la 08.

4. Volver a sincronizar, rehacer los subtítulos y re-ensamblar:

   ```bash
   node ~/.claude/skills/faceless-explainer/scripts/audio.mjs sync-durations \
     --audio-meta ./audio_meta.json --storyboard ./STORYBOARD.md
   node ~/.claude/skills/faceless-explainer/scripts/captions.mjs build \
     --storyboard ./STORYBOARD.md --audio-meta ./audio_meta.json --hyperframes . \
     --out ./caption_groups.json
   node ~/.claude/skills/faceless-explainer/scripts/assemble-index.mjs \
     --storyboard ./STORYBOARD.md --hyperframes .
   node ~/.claude/skills/faceless-explainer/scripts/transitions.mjs inject \
     --storyboard ./STORYBOARD.md --hyperframes .
   npx hyperframes check
   ```

   **Vigilar el tope de duración.** Con el frame 7 estimado en 10,5 s el video mide
   58,4 s. La línea 7 real irá por los 10,3 s, así que el total debería quedarse igual o
   por debajo. El tope duro es **60 s**: NOTAM son 58,9 y Mercancías 58,8.

5. Re-renderizar y volver a colgarlo de la app:

   ```bash
   npm run render
   ffmpeg -y -i renders/video.mp4 -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p \
     -c:a aac -b:a 128k -ar 48000 -movflags +faststart \
     ../../public/modulos/aerodinamica/intro.mp4
   ffmpeg -y -i renders/video.mp4 -ss 00:00:03.6 -frames:v 1 -vf scale=1280:-2 \
     ../../public/modulos/aerodinamica/intro-poster.webp
   ```

   El cartel sale del segundo 3,6, que es el frame 1 ya asentado con AERODINÁMICA y su
   línea de acento — igual que en los otros tres módulos.

6. Ajustar el rótulo de duración del `VideoIntro` en `src/pages/Aerodinamica.tsx` si el
   total cambia de segundo.

## Lo que ya está verificado

- Las nueve líneas de la tabla de la Sección 4 salen byte a byte del documento del módulo,
  con su pie de «valores ilustrativos» en los dos planos que la muestran.
- El panel del frame 7 calca el del frame 2: mismo contrato de geometría congelada
  (left 160 · top 176 · 1600×584, mono 32/54, origen 213/225).
- Ninguna cifra inventada: cada número en pantalla está citado en `STORYBOARD.md` con su
  sección de procedencia.

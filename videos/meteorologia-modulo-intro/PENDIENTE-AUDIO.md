# Lo que falta: audio, subtítulos y render

El video está terminado **en imagen**. Los ocho planos existen, pasan `npm run check`
sin errores ni avisos, y se pueden ver con `npm run dev`. Lo que falta es todo lo que
cuelga de la locución, y está bloqueado por una sola cosa.

## El bloqueo

El brief manda una voz concreta y no admite sustituto:

> Voz: William Shanks (HeyGen · Starfish), `voice_id: 001248bb63f847888d37b766ee8b3a47`,
> velocidad 0.92. LA MISMA que el video de NOTAM.

Y la CLI contesta:

```
$ npx hyperframes auth status
Not signed in to HeyGen — voice & music will use local engines (free, offline).
  voice → Kokoro    ⚠ deps missing
  music → MusicGen  ⚠ deps missing
```

No hay sesión de HeyGen en esta máquina (`~/.heygen` no existe) y los motores locales
tampoco están instalados. Aunque lo estuvieran, no servirían: Kokoro no es esa voz, y si
los dos módulos suenan distintos dejan de leerse como el mismo curso.

Iniciar sesión es una operación de credenciales (OAuth en el navegador o pegar una clave
de API), así que la tiene que hacer una persona:

```bash
npx hyperframes auth login
```

o, con una clave de app.heygen.com/settings/api:

```bash
npx hyperframes auth login --api-key
```

## Lo que se destraba al iniciar sesión

En este orden:

1. **Locución.** Ocho archivos `assets/voice/01..08.wav` desde `SCRIPT.md`, con la voz y
   la velocidad 0.92. Al generarlos, **escuchar las tres siglas**: `METAR` tiene que
   sonar como palabra (en el video de NOTAM «NOTAM» salió bien), y `taf` va en minúsculas
   en el guion justamente para que no salga «te a efe». La nota de producción de
   `SCRIPT.md` lo explica.
2. **La puerta de duración.** Sumar las ocho duraciones de `audio_engine_meta.json`:

       suma(voz) + 10,0 s de silencio  ≤  58,5 s

   El guion está medido a 12,0 caracteres por segundo y da **57,3 s estimados**, con 2,7 s
   de margen contra el tope de un minuto. Si la locución real sale más lenta, se recorta
   el guion y se vuelve a generar. No se recorta el silencio de cola ni se sube la
   velocidad por encima de 0,92.
3. **Re-temporizar los ocho planos.** Las duraciones de `index.html`, de `STORYBOARD.md` y
   de cada composición son las estimadas. Hay que sustituirlas por
   `duración de voz + 1,2 s` (y `+ 1,6 s` en el frame 7, que es el giro), y re-cuear los
   tweens con los tiempos de palabra. Cada composición lleva un comentario diciendo qué
   cues son estimados. Los frames 1 y 6 conservan sus **0,5 s extra**: son los dos de los
   que sale un fundido cruzado, y ese solapamiento es el fundido.
4. **Subtítulos.** `compositions/captions.html` y `caption_groups.json` salen del pipeline
   a partir de los tiempos de palabra. La banda reservada ya está respetada en los ocho
   planos: no hay contenido por debajo de y=900.
5. **Música y efectos.** `audio_request.json` ya pide los ocho efectos del catálogo, los
   mismos que el video de NOTAM. La música va con la consulta del `STORYBOARD.md`
   («documental sobrio, cuerdas graves contenidas, tensión baja que resuelve en calma»)
   a volumen 0.12, igual que el otro.
6. **Render y compresión**, y de ahí a la app:

   ```bash
   npm run render
   ffmpeg -i renders/main.mp4 -c:v libx264 -crf 26 -preset slow -vf scale=1280:-2 \
     -c:a aac -b:a 96k -movflags +faststart ../../public/modulos/meteorologia/intro.mp4
   ffmpeg -i renders/main.mp4 -ss 00:00:04 -frames:v 1 -q:v 4 \
     ../../public/modulos/meteorologia/intro-poster.jpg
   ```

   El póster se saca del segundo 4, que es el frame 1 ya asentado con METEOROLOGÍA y su
   línea de acento.
7. **Colgarlo del hero.** El hueco ya está reservado en `src/pages/Metar.tsx`, donde ahora
   hay un `EspacioReservado`. Se sustituye por el `VideoIntro` con
   `src="/modulos/meteorologia/intro.mp4"` y `poster="/modulos/meteorologia/intro-poster.jpg"`.

## Lo que ya está verificado

- `npm run check`: 0 errores, 0 avisos, 5 informativos (los cinco son el solape de texto
  de los 0,5 s del fundido cruzado entre los frames 6 y 7, que es el fundido en sí).
- Contraste: 54 de 54 comprobaciones pasan WCAG AA.
- Las capturas de los ocho planos, revisadas una a una con `npm run snapshot`.
- Ninguna cifra, aeródromo ni fenómeno inventado: la tabla de procedencia de
  `STORYBOARD.md` dice de qué lección del módulo sale cada palabra que aparece en pantalla.

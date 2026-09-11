# Tarea: la voz del video de Meteorología

Pégale esto completo a tu Claude Code, parado en la raíz del repo, con `main`
actualizado (`6472871` o posterior).

El video de apertura de Meteorología (`videos/meteorologia-modulo-intro/`) está
terminado en imagen y entró a `main` con el PR #122. Le falta todo lo que cuelga de la
voz: locución, subtítulos, render y ponerlo en la portada del módulo. Este encargo es
terminarlo.

---

## 0 · Por qué se quedó sin voz

La sesión que hizo el video se detuvo al pedir la locución:

```
$ npx hyperframes auth status
Not signed in to HeyGen — voice & music will use local engines (free, offline).
```

La voz de la serie es de HeyGen y no admite sustituto, así que sin sesión no había
forma de seguir. **Iniciar sesión es un paso de credenciales y tu Claude no lo puede
hacer por ti: lo tienes que hacer tú.** Es lo único que faltó.

La explicación completa de lo que sigue está en
`videos/meteorologia-modulo-intro/PENDIENTE-AUDIO.md`. Este brief añade dos trampas que
esa nota no conoce, y que en tu máquina te van a pasar seguro.

---

## 1 · Inicia sesión en HeyGen (esto lo haces tú, no tu Claude)

En una terminal, dentro de `videos/meteorologia-modulo-intro/`:

```bash
npx hyperframes auth login
```

Abre el navegador para autorizar. Si prefieres una clave de
app.heygen.com/settings/api:

```bash
npx hyperframes auth login --api-key
```

Comprueba que quedó:

```bash
npx hyperframes auth status
```

Tiene que decir `(valid)` y tu cuenta. Con eso ya le puedes pasar el resto a tu Claude.

**La voz es William Shanks**, `voice_id: 001248bb63f847888d37b766ee8b3a47`, a velocidad
**0.92**. Es la misma de NOTAM y Mercancías. Si tu cuenta no la tiene disponible, **para y
avisa a Camilo**: no se cambia por otra, porque si cada módulo suena distinto dejan de
leerse como el mismo curso.

---

## 2 · TRAMPA 1: el idioma de la voz. Compruébalo ANTES de generar

Esto obligó a rehacer los dos primeros videos, y en tu máquina te va a pasar seguro.

El flujo `faceless-explainer` **no le pasa el idioma al motor de audio**, que cae en
inglés. Con eso HeyGen pronuncia el español con fonética inglesa («pintiura»,
«contenedour») y los tiempos de los subtítulos salen de un modelo solo-inglés.

En la máquina de Camilo la skill está parcheada para leer `language: es` del `BRIEF.md`.
**Pero las skills no se versionan, así que en la tuya ese parche no existe.** La prueba
está en el propio video: el `BRIEF.md` dice `language: es`, y aun así el
`audio_request.json` que se generó aquí salió sin idioma.

Antes de generar, `videos/meteorologia-modulo-intro/audio_request.json` tiene que llevar
`"lang": "es"` arriba del todo, igual que el de NOTAM, que salió bien:

```json
{
  "provider": "auto",
  "lang": "es",
  "speed": 0.92,
  "lines": [
```

Si no lo lleva, añádelo. Y **genera primero una sola línea y escúchala** antes de lanzar
las ocho: si «nubes» o «frente» suenan con acento inglés, el idioma no entró.

Al escucharlas, fíjate en las siglas: `METAR` tiene que sonar como palabra, y `taf` va en
minúsculas en el guion precisamente para que no salga «te a efe». La nota de producción
de `SCRIPT.md` lo explica.

---

## 3 · TRAMPA 2: la imagen tiene el turquesa que no quedó

El video se calculó con los colores del módulo que traía el PR #119. Pero al mergear
#119, mandaron los de `main`, que son los que documenta `CLAUDE.md`. La diferencia es
pequeña y se nota: el video no casaría con la portada en la que se va a ver.

| Uso en el video | Lo que tiene ahora (#119) | Lo que quedó en la app |
|---|---|---|
| acento sobre papel | `#0D4B52` | `--ln-primary` → `#1A4A52` |
| acento sobre navy | `#49939C` | `--ln-focus` → `#3D97A6` |
| superficie de medio paso | `#E5F3F5` | `--ln-tint` → `#E4EFF1` |

No copies estos valores de aquí a ciegas: **sácalos otra vez de `src/index.css` de
`main`, de la misma forma en que se sacaron la primera vez**, y regenera la imagen con
ellos. La columna de la derecha está para que puedas comprobar que te salieron bien.

Aprovecha que hay que re-temporizar los planos de todos modos (paso 4.3): regenerar la
imagen en ese momento no cuesta un render de más.

---

## 4 · El resto, en este orden

Todo esto está detallado en `PENDIENTE-AUDIO.md`. Aquí va el resumen y lo que hay que
comprobar en cada paso.

1. **Locución.** Ocho archivos `assets/voice/01..08.wav` desde `SCRIPT.md`, con la voz y la
   velocidad de arriba.
2. **La puerta de duración.** Suma las ocho duraciones de `audio_engine_meta.json`:
   `suma(voz) + 10,0 s de silencio ≤ 58,5 s`. Si no cabe, **se recorta el guion y se
   vuelve a generar**. No se recorta el silencio de cola ni se sube la velocidad.
3. **Re-temporizar los ocho planos** a la duración real de su voz (más 1,2 s, y 1,6 s en
   el frame 7, que es el giro), y regenerar la imagen con los colores del paso 3.
4. **Subtítulos y render.**
5. **Comprimir** el MP4 a `public/modulos/meteorologia/intro.mp4`, con su póster al lado
   (`intro-poster.webp`), igual que están los de `public/modulos/notam/` y
   `public/modulos/mercancias/`.
6. **Ponerlo en la portada.** En `src/pages/Metar.tsx` hay un `EspacioReservado` guardando
   el sitio del video. Se cambia por `VideoIntro`, copiando cómo lo usan
   `src/pages/Notam.tsx` y `src/pages/Mercancias.tsx`.

Las reglas de la serie, de `CLAUDE.md`: 8 escenas, tope de 60 s, un remanso de silencio
al final de cada escena, y **todos los clips de una escena cubren su duración entera**
(el cierre de NOTAM se quedó 1,6 s en blanco porque sus capas terminaban antes que la
escena).

---

## 5 · Antes de abrir el PR

- [ ] `npx hyperframes auth status` dice `(valid)`.
- [ ] `audio_request.json` lleva `"lang": "es"`, y la primera línea se escuchó en español.
- [ ] La suma de voz + silencio cabe en 58,5 s.
- [ ] La imagen usa `#1A4A52`, `#3D97A6` y `#E4EFF1`, sacados de `src/index.css`.
- [ ] Ningún plano tiene segundos en blanco al final.
- [ ] `public/modulos/meteorologia/intro.mp4` e `intro-poster.webp` existen.
- [ ] En `Metar.tsx` ya no queda `EspacioReservado` en el sitio del video.
- [ ] `npx tsc -b`, `npm run lint` (tiene que seguir en cero) y `npm run build`.
- [ ] Rama nueva desde `main`, **no** apilada sobre otra rama.

Y una regla que salió de lo que pasó ayer: en esta carpeta trabajan varias sesiones a la
vez. **Commitea en cuanto algo compile**, no al final: ayer se perdieron cuatro tandas de
cambios sin commitear cuando otra sesión mergeó un PR.

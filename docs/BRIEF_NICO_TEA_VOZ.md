# Tarea: el piloto habla y la app le escribe lo que dijo (TEA Parte 1)

Pégale esto completo a tu Claude Code, parado en la raíz del repo.

**Cami no va a estar disponible para resolver dudas.** Este brief trae todo lo
que hace falta, y donde hay una decisión abierta, viene decidida. Si aun así te
topas con algo que no está aquí, elige lo más simple, déjalo anotado en el PR y
sigue.

---

## 1 · Qué estamos probando y por qué

El TEA es un examen **oral**. Hoy la app le dice al piloto "grábate con el
celular y escúchate después", y ahí se acaba: la app no se entera de nada.

La pregunta que hay que responder con esto es una sola:

> **¿El reconocimiento de voz del navegador entiende a un piloto colombiano
> hablando inglés, lo bastante bien como para que le sirva?**

Si la respuesta es sí, no cuesta un peso y se extiende al resto del módulo. Si
es no, ya sabremos que hay que pagar transcripción de verdad (Whisper, unos 7
centavos de dólar por simulacro), y lo sabremos **por haberlo medido**.

**Esto es un prototipo que se sube a producción.** No es un experimento de
laboratorio: tiene que quedar usable, pero acotado a una pantalla.

---

## 2 · Lo que ya existe: no lo construyas otra vez

Verificado en el repo y en producción:

| Pieza | Estado |
|---|---|
| `src/hooks/useRecorder.ts` | Graba con `MediaRecorder`, pide micrófono, por pasos. **Ya funciona** |
| `src/pages/IcaoMockExam.tsx` | Ya usa el grabador en el simulacro TEA |
| `src/pages/IcaoInterview.tsx` | La Parte 1. Ya lee sesión, ya persiste, ya llama a `registrarEstudioDiario` |
| `src/lib/icaoInterview.ts` | `TEA_PART1_SETS`, con `question` y respuesta modelo por pregunta |
| `src/lib/personalizeInterview.ts` | Personaliza la respuesta modelo con los datos del piloto |
| Edge function `wingman` | Desplegada y ACTIVE, llama a Claude Sonnet 4.5 |
| `ai_interactions` + `ai_usage_this_month()` | Medición de uso mensual, lista para cuota |

**Ojo con `useRecorder`**: graba audio a `objectURL` en memoria y no lo sube a
ningún lado. Para esta tarea **no lo necesitas**: la transcripción no pasa por
él. Déjalo como está.

---

## 3 · El alcance: solo la Parte 1

**Solo `src/pages/IcaoInterview.tsx`.** No toques el simulacro, ni la
comprensión, ni la descripción de imágenes.

Razón: la Parte 1 son respuestas de 30 a 60 segundos a preguntas sueltas. Es el
caso más fácil para el reconocedor y el más frecuente en el examen. Si no
funciona ahí, no va a funcionar en ningún lado.

**Lo que hay que añadir a esa pantalla**, por pregunta:

1. Un botón para responder hablando
2. Mientras habla, la transcripción va apareciendo en vivo
3. Al terminar, la transcripción queda **al lado de la respuesta modelo**, para
   que el piloto compare lo que dijo con lo que se esperaba
4. Se guarda, para que al volver siga ahí

---

## 4 · La API: `SpeechRecognition`

Es del navegador. **Sin clave, sin cuenta, sin costo.**

```ts
const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition
const rec = new SR()
rec.lang = "en-US"
rec.continuous = true
rec.interimResults = true
```

Sácalo a `src/hooks/useSpeechToText.ts`, con una interfaz parecida a la de
`useRecorder`: `soportado`, `escuchando`, `texto`, `parcial`, `empezar()`,
`parar()`, `error`.

### Las cuatro trampas, y son reales

**1. Se corta solo.** Chrome lo detiene tras unos segundos de silencio y a veces
sin motivo. Si no lo reenganchas en `onend`, el piloto pierde media respuesta.

El patrón: lleva una bandera de "el usuario quiere seguir grabando" y en `onend`
vuelve a arrancar si esa bandera sigue puesta. Y para de verdad solo cuando el
usuario le da a parar.

**2. Los resultados llegan en dos sabores.** Cada evento trae resultados
`isFinal: true` y `false`. Los finales se acumulan; el parcial es solo el último
y se reemplaza. Si acumulas los parciales, sale el texto repetido tres veces.

```ts
let finales = ""
rec.onresult = (e) => {
  let parcial = ""
  for (let i = e.resultIndex; i < e.results.length; i++) {
    const r = e.results[i]
    if (r.isFinal) finales += r[0].transcript + " "
    else parcial += r[0].transcript
  }
  // `finales` se acumula, `parcial` se reemplaza en cada evento
}
```

**3. Firefox no lo soporta.** Chrome, Edge y Safari sí. Detecta con
`window.SpeechRecognition ?? window.webkitSpeechRecognition` y si no está,
**no muestres un botón muerto**: dile al piloto que su navegador no permite
dictado y ofrécele lo de siempre, escribir la respuesta a mano.

**4. Los tipos.** Según la versión de TypeScript puede que `SpeechRecognition`
no esté en `lib.dom`. Si `tsc` se queja, declara los tipos mínimos en
`src/types/speech.d.ts`. **No pongas `any`** para salir del paso.

### Un detalle que importa para el TEA

`rec.lang = "en-US"`. El examen es de inglés: si lo dejas en el idioma del
navegador va a intentar transcribir español y el resultado no va a servir para
nada.

Y `resultado[0].confidence` viene con cada resultado final. **Guárdalo**: es
parte de lo que hay que reportar (punto 8).

---

## 5 · El consentimiento, obligatorio

**Esto no es opcional y va antes de la primera grabación.**

`SpeechRecognition` es gratis pero **no es local**: Chrome manda el audio a los
servidores de Google y Safari a los de Apple para reconocerlo. Que no cueste
dinero no significa que no salga del dispositivo.

Antes de pedir el micrófono la primera vez, una pantalla o diálogo que diga, en
palabras del piloto y sin jerga:

- Que se va a usar el micrófono para escribir lo que diga
- Que **el audio se procesa en los servidores del navegador** (Google o Apple
  según el que use) y no lo guarda Aviatory
- Que **solo se guarda el texto**, no el audio
- Un botón de aceptar y uno de no, con la salida de escribir a mano

Guarda el consentimiento para no volver a preguntarlo, pero que se pueda
revocar desde el perfil.

**Y actualiza `src/pages/Privacy.tsx`**: hoy no menciona nada de esto y a partir
de este PR es falso. Un párrafo corto y honesto.

---

## 6 · La honestidad: no inventes una nota

Donde el reconocedor del navegador es más flojo es justo con **inglés con
acento**, que es el caso de todos los usuarios de Aviatory.

Es tentador convertir eso en una métrica ("el sistema entendió el 60%, tu
pronunciación es regular"). **No lo hagas.** Esa señal la contaminan el
micrófono, el ruido de fondo y el propio reconocedor, y una nota de
pronunciación inventada es exactamente lo que la regla de "cero mentiras en
pantalla" prohíbe.

**Lo que sí puedes mostrar**, porque es un hecho y no un juicio:

- La transcripción, tal cual salió
- Cuánto habló, en segundos
- Cuántas palabras dijo

Y una línea de encuadre honesta, del estilo: *esto es lo que el sistema entendió
de lo que dijiste. Si hay partes que no reconoció, puede ser tu pronunciación,
el micrófono o el ruido.*

**Nada de puntuar los 6 descriptores en este PR.** Eso es el paso dos y va con
Claude, no con el reconocedor.

---

## 7 · Dónde se guarda

Hace falta una tabla. **No uses `interview_sim_recordings`**: esa es del módulo
de entrevistas (`/app/entrevistas`), que es otro producto y hoy es un
placeholder. No la secuestres.

Escribe la migración, **no la apliques**: Cami la aplica por MCP cuando vuelva.

```sql
create table if not exists public.user_icao_speaking (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  parte       smallint not null default 1,        -- parte del TEA, hoy siempre 1
  question_id text not null,                      -- el id de TEA_PART1_SETS
  transcript  text not null,
  palabras    int  not null default 0,
  segundos    int  not null default 0,
  confianza   numeric,                            -- media de confidence, 0 a 1
  motor       text not null default 'webspeech',  -- para comparar si un dia entra Whisper
  created_at  timestamptz not null default now()
);

create index if not exists idx_icao_speaking_user
  on public.user_icao_speaking (user_id, created_at desc);

alter table public.user_icao_speaking enable row level security;

drop policy if exists "icao_speaking_select_own" on public.user_icao_speaking;
create policy "icao_speaking_select_own" on public.user_icao_speaking
  for select using (auth.uid() = user_id);

drop policy if exists "icao_speaking_insert_own" on public.user_icao_speaking;
create policy "icao_speaking_insert_own" on public.user_icao_speaking
  for insert with check (auth.uid() = user_id);

drop policy if exists "icao_speaking_delete_own" on public.user_icao_speaking;
create policy "icao_speaking_delete_own" on public.user_icao_speaking
  for delete using (auth.uid() = user_id);
```

El `delete` propio es a propósito: si el piloto quiere borrar lo que dijo, tiene
que poder.

El campo **`motor`** es lo que va a permitir comparar Web Speech contra Whisper
el día que se pruebe, sin migrar nada.

**No metas el audio en ninguna parte.** Solo el texto. Es lo que le prometes al
piloto en el consentimiento y es lo que hay que cumplir.

**Y la actividad**: al guardar una respuesta hablada,
`registrarEstudioDiario("icao-interview")`. `IcaoInterview.tsx` ya importa esa
función.

---

## 8 · Qué tiene que reportar en el PR

**Esto es lo más importante del encargo**, porque es lo que decide si la idea
sigue o se cambia por Whisper. Cami va a leer el PR sin poder probarlo en el
momento.

Graba **al menos 6 respuestas reales, hablando tú en inglés**, y pega en el PR:

1. **La transcripción completa de cada una, sin corregir**, junto a lo que
   dijiste de verdad
2. La `confidence` media de cada una
3. Cuántas veces se cortó solo y hubo que reengancharlo
4. Si probaste en celular, en cuál y cómo se portó
5. **Tu veredicto en una línea**: ¿esto le sirve a un piloto o no?

Sin eso, el PR no se puede evaluar.

---

## 9 · La pantalla

En `IcaoInterview.tsx`, por pregunta:

- Un botón secundario con `appButtonClass({ variant: "secondary" })`. Mientras
  graba, cambia a un estado claro de que está escuchando, con el texto parcial
  apareciendo en vivo
- La transcripción va **en su propio bloque, al lado o debajo de la respuesta
  modelo**, nunca reemplazándola: la gracia es comparar
- Bajo la transcripción, los dos datos: segundos y palabras
- Un botón para borrarla y volver a intentar
- Si el navegador no soporta, en vez del botón, la línea de aviso y la opción de
  escribir a mano

**No rediseñes la pantalla.** Es una función nueva dentro de lo que ya existe,
no una reforma. Respeta la maqueta actual.

**Móvil**: pruébalo a 375 px. En Android Chrome funciona bien; en iOS Safari es
más caprichoso y puede cortarse al bloquear la pantalla. Si en iOS no va, dilo
en el PR y deja el aviso puesto, no lo escondas.

---

## 10 · Lo que NO hay que hacer en este PR

- **Nada de Whisper ni de ninguna API de pago.** El punto es probar lo gratis
- **Nada de puntuar descriptores.** Eso es el paso dos
- **Nada de subir audio.** Solo texto
- **No toques** el simulacro TEA, la comprensión ni la descripción de imágenes
- **No metas esto en el bundle principal sin mirar**: está en 2.028 KB de un
  límite de 2.048 y si lo pasas **el build falla**, no avisa. El hook es chico,
  pero comprueba después de compilar:

```bash
npm run build
node -e "const fs=require('fs');fs.readdirSync('dist/assets').filter(f=>f.endsWith('.js')).map(f=>({f,kb:Math.round(fs.statSync('dist/assets/'+f).size/1024)})).sort((a,b)=>b.kb-a.kb).slice(0,3).forEach(o=>console.log(o.kb+' KB '+o.f))"
```

---

## 11 · Convenciones

- Tipografía **12 / 13 / 15 / 17 / 20 / 24 / 32**, pesos **400 / 500 / 600**
- Radios 8px controles, 12px superficies
- **No toques el contenedor**: `IcaoInterview.tsx` usa `max-w-[940px]`, más
  estrecho que el resto de la app a propósito, porque son preguntas y respuestas
  que se leen. Déjalo como está
- `.surface` y `.surface-lift`, nunca `border border-border bg-card`
- Botones con `appButtonClass()`, solo tamaños `md` y `lg`
- Español neutro LATAM con **tuteo**. Prohibido el voseo
- **Prohibido el guion largo en texto visible**
- Sin emojis, sin lenguaje de desarrollador al usuario. El piloto no sabe qué es
  una API de reconocimiento: se le dice "dictado" o "responder hablando"
- **Cero mentiras en pantalla**

---

## 12 · Antes de abrir el PR

```bash
npx tsc -p tsconfig.app.json --noEmit
npm run build
npx eslint src --ext .ts,.tsx        # no subir de 20 problemas
```

```bash
grep -rn "—" src/pages src/components --include="*.tsx" | grep -v '"—"'
grep -rnE "tenés|podés|practicá|acá\b" src/

# no se subio audio a ningun lado
grep -rn "storage\.from" src/hooks/useSpeechToText.ts src/pages/IcaoInterview.tsx

# no quedaron any para salir del paso con los tipos
grep -rn ": any" src/hooks/useSpeechToText.ts src/types/speech.d.ts
```

Los dos últimos deberían salir vacíos.

Verifica el deploy antes de dar nada por hecho:

```bash
gh api repos/camiloosorio2394/aviatoryapp/deployments --jq '.[0] | "\(.sha[0:7]) \(.environment)"'
```

Y recuerda que el service worker es `registerType: 'prompt'`: después de
desplegar, recarga con **Ctrl+Shift+R** antes de decir que algo no funciona.

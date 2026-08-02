# Tarea: módulo Mercancías Peligrosas

Pégale esto completo a tu Claude Code, parado en la raíz del repo.

Es un tema nuevo dentro de **Ingreso a aerolínea**, igual que NOTAM y METAR.
Cami te pasa el contenido en `Modulo_Mercancias_Peligrosas_Pilotos.docx`:
16 secciones, 3.741 palabras.

---

## 1 · LO MÁS IMPORTANTE: cómo tiene que verse

**No es un documento de texto. Es una infografía interactiva.**

En el repo hay dos infografías y hacen cosas opuestas. Una es el modelo y la
otra es lo que NO hay que hacer:

### ✅ El modelo: `src/components/lesson/infografias/NotamLineaQ.tsx`

Ábrelo antes de escribir una línea. Eso es lo que hay que replicar:

- **Todo es código, cero imágenes.** Los colores, las fichas, los badges
  numerados, los conectores: todo son divs y SVG
- **Reflowea.** En escritorio va en tres columnas, en celular cae a una. El
  piloto nunca tiene que hacer zoom para leer
- **Se toca.** Tocas un elemento y su ficha se resalta, y al revés
- **El color es la llave, no el adorno.** Cada campo tiene su color y ese mismo
  color aparece en su ficha: es lo que ata una cosa con la otra
- **Poco texto.** Etiquetas y frases cortas dentro de las fichas, no párrafos

Míralo en producción para entender el objetivo, sección 5:
`/app/aerolinea/notam/aprende`

### ❌ Lo que NO hay que hacer: `NotamQueEs.tsx`

Esa es una infografía de imagen: un lienzo fijo de 1687x1125 con maquetación
absoluta y 24 PNG. Se ve bien en escritorio y en celular hay que hacer zoom
para leerla. **No repitas ese patrón en este módulo.** Existe porque venía
diseñada de fuera; lo nuestro se construye nativo.

### El lenguaje visual, en concreto

- Fondo claro, **banda de título azul marino** arriba de cada bloque grande
- **Tarjetas blancas con borde de color de 3px arriba**
- **Badges numerados** en círculo con el color de su elemento
- Monoespaciada para todo lo que sea un código (`UN 3480`, `PI 965`, `RWY`)
- Chips de color para los valores de un conjunto cerrado
- Nada de mayúsculas con letterspacing en titulares. Sentence case
- La hoja no se invierte en modo oscuro: usa las variables `--doc-*`

---

## 2 · Arquitectura: calca NOTAM

NOTAM ya resolvió este problema entero y está probado. Cópialo.

**Rutas** (en `src/App.tsx`, dentro del bloque de `/app/aerolinea`):

```
/app/aerolinea/mercancias            hub del tema
/app/aerolinea/mercancias/aprende    la lección
/app/aerolinea/mercancias/practica   práctica
/app/aerolinea/mercancias/evaluacion evaluación
```

**Archivos modelo, en este orden:**

| Qué | Modelo |
|---|---|
| Hub del tema | `src/pages/Notam.tsx` |
| Lección | `src/pages/NotamLesson.tsx` |
| Contenido | `src/lib/notamLesson.ts` |
| Progreso | `src/lib/notamProgress.ts` |
| Práctica | `src/pages/NotamPractice.tsx` |
| Evaluación | `src/pages/NotamExam.tsx` + `src/components/QuizEngine.tsx` |
| Tarjeta en el hub padre | `src/pages/AirlinePrep.tsx` |

**Base de datos** (escribe la migración, NO la apliques: Cami la aplica por MCP):

- `user_mercancias_progress`, espejo de `user_notam_progress`
  (`user_id`, `lesson_screens[]`, `practice_done[]`, `updated_at`)
- RPC `mercancias_mark_progress`, espejo de `notam_mark_progress`
- `user_mercancias_exam_attempts`, espejo de `user_metar_exam_attempts`
- Filas en `module_thresholds` para lección y práctica
- Logros: `mercancias_lesson`, `mercancias_practice`, `mercancias_exam`,
  `mercancias_master`
- **Su condición dentro de `check_and_unlock_achievements`** y **su disparador**.
  Sin las dos cosas el logro existe y no se otorga nunca: ya pasó con
  `metar_master`
- Y el `revoke`, que Postgres devuelve `EXECUTE` a `PUBLIC` en cada
  `create or replace function`:
  ```sql
  revoke all on function public.check_and_unlock_achievements(uuid) from public, anon;
  grant execute on function public.check_and_unlock_achievements(uuid) to authenticated;
  ```

**Actividad**: `registrarEstudioDiario("mercancias-leccion")` al marcar una
sección como leída y `("mercancias-practica")` al resolver un ejercicio.
`registrarActividadDeEstudio` al terminar la evaluación. Nunca al montar la
página, solo al completar algo.

**El hub padre**: saca "Mercancías peligrosas" de donde esté en `PROXIMOS` de
`AirlinePrep.tsx` y añádele su `CourseCard` con cifras reales.

**El simulacro**: añade el banco de la evaluación a `BANCOS` en
`src/pages/AirlineMockExam.tsx`. Es una línea y hace que el simulacro crezca solo.

---

## 3 · Qué forma visual toma cada sección

Esto es lo que convierte 3.741 palabras en pantallas. Sección por sección:

| # | Sección | Forma |
|---|---|---|
| 0 | Antes de empezar: alcance y vigencia | **Aviso destacado, arriba y siempre visible.** Ver punto 4 |
| 1 | ¿Qué son las mercancías peligrosas? | Definición + fichas de "cómo se identifica" |
| 2 | ¿Por qué importan en aviación? | Casos reales como tarjetas: qué pasó, qué lo causó, qué cambió después |
| 3 | Marco normativo | **Tabla de 4 documentos**: Anexo 18, Doc 9284, IATA DGR, RAC 175. Quién lo emite, para qué sirve, cada cuánto se reedita |
| 4 | Responsabilidades del piloto al mando | Fichas numeradas |
| 5 | **Las 9 clases** | **La pieza central del módulo.** Ver punto 5 |
| 6 | Permitidas, restringidas y prohibidas | Tres columnas enfrentadas, con color semántico |
| 7 | Equipaje de pasajeros | Sí y no, muy visual. Es lo que más se pregunta |
| 8 | Baterías de litio | Los dos tipos como fichas comparadas, más las reglas prácticas |
| 9 | Procedimientos cuando se transportan MP | Secuencia numerada |
| 10 | Documentación y NOTOC | **Desglose interactivo del NOTOC por columnas.** Ver punto 6 |
| 11 | Leer una fila de la IATA DGR (UN 3480) | **El segundo desglose interactivo.** Ver punto 6 |
| 12 | Incidente en vuelo | Secuencia de pasos, con lo crítico destacado |
| 13-15 | Preguntas de entrevista, cómo responder, errores comunes | Bloques `check` de verdad, que el piloto responde |
| 16 | Resumen final | Bloque `summary` |

---

## 4 · El aviso de vigencia se queda en pantalla

El documento abre con una advertencia y **no es opcional**:

- RAC 175: la fuente es la Edición Original de marzo 2016 (Resolución 00478) y
  ha tenido enmiendas posteriores
- El Doc 9284 se reedita cada 2 años y la IATA DGR cada año
- Cada aerolínea define condiciones propias en su Manual de Operaciones

Va visible en el hub y al abrir la lección, con el mismo tratamiento que el
aviso de vigencia de los NOTAM reales. **Un piloto no puede salir de aquí
creyendo que un límite que leyó es el vigente.**

Fuentes al pie de la lección, en `LESSON_SOURCES`: OACI Anexo 18, OACI Doc 9284
(Instrucciones Técnicas), IATA DGR, RAC 175 de la Aerocivil.

---

## 5 · Las 9 clases: la pieza central

Es lo más reconocible del tema y donde el módulo se gana su cara.

Rejilla de 9 tarjetas. Cada una lleva:

- **El rombo de la clase, dibujado en SVG**, con su color y su símbolo
  normalizados. No uses imágenes: son formas geométricas simples y en SVG
  quedan nítidas a cualquier tamaño y pesan nada
- El número de clase y su nombre
- Riesgo principal, en una frase
- Ejemplos concretos
- Las divisiones cuando las hay (`1.1` a `1.6`, `2.1` inflamable, `2.2` no
  inflamable, `2.3` tóxico)

Los rombos son el sistema de color del tema entero: el mismo color de la clase
2 aparece cuando se hable de gases en cualquier otra sección. **Ese es el uso
correcto del color: informa, no decora.**

---

## 6 · Los dos desgloses interactivos

Son los dos momentos "línea Q" del módulo. Calca `NotamLineaQ.tsx`:

**El NOTOC por columnas** (sección 10). El formato tiene columnas fijas: tocas
una y se explica qué va ahí y por qué le importa al piloto.

**La fila de la IATA DGR, con el ejemplo UN 3480** (sección 11). Una fila de la
lista tiene campos fijos: número UN, nombre propio de expedición, clase,
grupo de embalaje, instrucción de embalaje, cantidad máxima. Cada uno se toca y
se explica.

El documento ya trae el ejemplo trabajado de UN 3480 (baterías de ión litio).
**Úsalo tal cual, no inventes otro.**

---

## 7 · AVISO CRÍTICO: el bundle está al borde

`dist/assets/index-*.js` está hoy en **2.028 KB y el límite de Workbox son
2.048 KB**. Si lo pasas, el build **falla**, no avisa.

Un módulo entero lo va a reventar. Dos cosas obligatorias:

1. **Todas las infografías van con `lazy`.** El registro `INFOGRAFIAS` de
   `src/components/DocLessonBlocks.tsx` ya lo hace: sigue ese patrón
2. **Hay que partir las rutas.** `src/App.tsx` importa las 40 páginas de
   golpe. Pásalas a `lazy` + `Suspense`. Es lo que de verdad arregla el
   problema y hace falta antes de meter un módulo nuevo

Comprueba después de cada tanda:

```bash
npm run build
node -e "const fs=require('fs');fs.readdirSync('dist/assets').filter(f=>f.endsWith('.js')).map(f=>({f,kb:Math.round(fs.statSync('dist/assets/'+f).size/1024)})).sort((a,b)=>b.kb-a.kb).slice(0,5).forEach(o=>console.log(o.kb+' KB '+o.f))"
```

---

## 8 · Hazlo por fases

Un PR de 6.000 líneas no lo revisa nadie.

- **Fase 0**: partir las rutas de `App.tsx` con `lazy`. Sin esto lo demás no
  compila cuando crezca
- **Fase 1**: el contenido en `src/lib/mercanciasLesson.ts`, desde el .docx.
  Sin UI. Es el 90% del valor y lo que hay que revisar con calma
- **Fase 2**: las 9 clases y los dos desgloses interactivos
- **Fase 3**: hub, práctica y evaluación, calcando NOTAM
- **Fase 4**: migración, logros y actividad. Avisa a Cami para aplicarla

---

## 9 · Convenciones (obligatorias)

- Tipografía **12 / 13 / 15 / 17 / 20 / 24 / 32 px**. Nada fuera de ahí
- Espaciado **4 / 8 / 12 / 16 / 24 / 32 / 48**
- Pesos **400 / 500 / 600**. Nada de `font-bold`
- Radios: 8px controles, 12px superficies. Contenedor `max-w-[1280px]`
- `.surface` y `.surface-lift`, nunca `border border-border bg-card`
- Botones con `appButtonClass()` de `@/lib/buttonStyles` (solo `md` y `lg`)
- Español neutro LATAM con **tuteo**. Prohibido el voseo
- **Prohibido el guion largo en texto visible.** Excepción: el marcador de
  celda sin dato
- Sin emojis en la UI, sin lenguaje de desarrollador al usuario
- **Cero mentiras en pantalla.** Donde no hay dato va un guion. Y si un ejemplo
  lo construiste para enseñar, el texto tiene que decirlo

---

## 10 · Antes de abrir el PR

```bash
npx tsc -p tsconfig.app.json --noEmit
npm run build
npx eslint src --ext .ts,.tsx        # no subir de 20 problemas
```

```bash
grep -rn "—" src/pages src/components --include="*.tsx" | grep -v '"—"'
grep -rnE "tenés|podés|practicá|acá\b" src/
grep -rnE '#[0-9A-Fa-f]{6}' src/pages src/components --include="*.tsx"
```

Específico de esto:

```bash
# el modulo no puede llevar imagenes de contenido: todo en codigo
grep -rn "\.png\|\.webp\|\.jpg" src/components/lesson/infografias/Mercancias*.tsx

# la leccion no puede ser un muro de parrafos
grep -c 'kind: "p"' src/lib/mercanciasLesson.ts
```

Ese último es la prueba de fuego. En NOTAM hay 49 bloques `p` en 13 secciones y
por eso se lee como documento. **En este módulo no deberían pasar de 15 en 16
secciones.** Si te salen 40, es que escribiste un documento, no una infografía.

Y verifica el deploy antes de dar nada por hecho:

```bash
gh api repos/camiloosorio2394/aviatoryapp/deployments --jq '.[0] | "\(.sha[0:7]) \(.environment)"'
```

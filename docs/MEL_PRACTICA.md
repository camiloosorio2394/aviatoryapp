# MEL: motor de práctica

Seis ejercicios para que el piloto **lea una entrada, calcule su plazo, cruce ítems y decida si
sale**. Están hechos y probados; **falta enchufarlos** en la página de práctica del módulo (lo
hace quien integre, ver «Cómo se enchufa»). Este trabajo no tocó `App.tsx`, `index.css`,
`eslint.config.js`, `src/lib/mel.ts`, `src/lib/melLeccion/`, migraciones ni el catálogo.

## Archivos

```
src/lib/melPractica.ts            tipos de los seis ejercicios y su calificación (puras)
src/lib/melPracticaDatos.ts       los ítems: entradas reales e inventadas y los ejercicios
src/lib/melPractica.test.ts       calificación, plazos (con el ejemplo de PL-25) y sanidad de los datos

src/components/mel/practica/
  EntradaMel        la tabla de una entrada, como una página de MEL (reutilizable)
  LeeLaEntrada      a) tocar partes y responder campos
  PodemosSalir      b) sí cumpliendo / no / falta información, y razones
  CalculaElPlazo    c) fecha límite (días calendario, flight-days) o último tramo (vuelos u horas)
  Combinados        d) dos o tres ítems abiertos: decisión y dependencia
  BuscaElItem       e) capítulo ATA y luego el ítem, como en el EFB
  ImpactoOperacional f) capacidades afectadas
  EjercicioMel      pinta cualquiera según su `tipo`
  Decision          las tres respuestas de despacho (la usan b y d)
  piezas.tsx        tarjeta, ficha del caso, opción, veredicto, anuncio, comprobar, reintentar
  opciones.ts       estado de una opción antes y después de corregir
  tokens.ts         acento, verde/rojo/ámbar semánticos, foco visible
  tipos.ts          PropsEjercicio
  practica.test.tsx render e interacción de cada componente
```

## Conteos

| Tipo (`tipo`) | Ejercicios | Puntos por ejercicio |
|---|---|---|
| Lee la entrada (`leeLaEntrada`) | 13 | uno por paso (4 a 6) |
| ¿Podemos salir? (`podemosSalir`) | 13 (7 no, 4 sí, 2 falta información) | 2: decisión y razones completas |
| Calcula el plazo (`calculaElPlazo`) | 11 (6 calendario, 2 flight-days, 3 vuelos/horas) | 1 |
| Combinados (`combinados`) | 9 (6 no, 3 sí) | 2: decisión y dependencia |
| Busca el ítem (`buscaElItem`) | 11 | 2: capítulo e ítem |
| Impacto operacional (`impactoOperacional`) | 11 | aciertos sobre la unión de lo esperado y lo marcado |

Entradas: 27 reales (24 de la MMEL FAA A318-A321 Rev 32 y 3 de la B-737 Rev 63a) y 15
inventadas.

## Reglas del contenido

- **Entrada real** (`fuente` presente): texto **literal** de la MMEL, con la cita completa:
  `MMEL FAA A318-A321, Rev 32, 34-42-04, p. 34-20 (rev. 32, 07/30/2025)`. Si se usan solo
  algunas filas, la cita termina en `; extracto: …`. Es la MMEL del tipo, no la MEL de un
  operador. El texto se verificó contra los .txt de las MMEL (Remarks, NOTE y las columnas
  1 a 3 con su (M)/(O)), pero esa verificación no vive en el repo porque las MMEL no están en
  él: **si se agrega una entrada real, se compara a mano con el PDF**.
- **Entrada inventada** (sin `fuente`): la tabla la rotula «Aeronave de ejemplo», sin más
  aviso. Número `XX-85-01` a `XX-89-01` en un capítulo ATA real (esas secciones no existen en
  las MMEL cargadas) y que **no se repita** con los de `docs/mel/*.md` (la prueba lo revisa).
  Sin cifras de performance y sin el contenido de un procedimiento (M) u (O): solo que existe.
- Plazos: **sistema FAA** (PL-25 Rev 24). La pantalla de «Calcula el plazo» lo dice en cada
  situación («En Colombia rige el plazo de la MEL aprobada del operador»).
- Ningún ejercicio copia los de `docs/mel/nivel-5.md` (caps. 31, 32 y 40). Algunas entradas
  reales se repiten con la lección (22-10-01, por ejemplo), pero el caso es otro.
- **Nada de raya larga ni media** (`deepPlain` las cambia por «: »). La prueba lo revisa en
  todo el texto de los datos.
- Lo que se afirma sin fuente cargada va con `VERIFICAR` en `fuente` (p. ej. qué mínimos de
  aproximación exigen un sistema).

## Formato de datos

Tipos exactos en `src/lib/melPractica.ts`. Todo ejercicio lleva `id` (único en su tipo),
`fuente` (lo que sostiene la respuesta) y `explicacion`.

### `EntradaMel`

```ts
{
  codigo: "34-42-04",                       // Airbus 6 dígitos; Boeing capítulo y secuencia ("26-16")
  ata: { numero: "34", titulo: "Navigation" },
  titulo: "Altitude Alerting System",
  tripleAsterisco?: true,                  // *** (solo MMEL)
  fuente?: "MMEL FAA A318-A321, Rev 32, …", // sin fuente = inventada
  filas: [{
    secuencia?: "16-01",                    // Boeing
    subitem?: "1) Aural Alert",             // sub-ítem o configuración; sin categoria = solo rótulo
    categoria?: "A" | "B" | "C" | "D",
    instalados?: "-", requeridos?: "0",
    procedimientos?: ["M", "O"],            // lo que va entre paréntesis al inicio de Remarks
    observaciones?: "May be inoperative provided: a) …, b) …",  // sin el (M)(O)
    notas?: ["…"],                          // cada NOTE, sin «NOTE:»
  }],
}
```

`EntradaMel` (componente) parte los provisos «a) … b) …» en renglones, resalta la fila de
`resaltar` y, con `toca`, vuelve botones las partes de esa fila (`ParteEntrada`: `codigo`,
`item`, `categoria`, `instalados`, `requeridos`, `procedimientos`, `observaciones`, `nota`).
En el celular las columnas 1 a 3 van junto al ítem y Remarks baja a lo ancho; desde `sm`, las
cinco columnas como en papel.

### Por tipo

| Tipo | Campos propios | Calificación |
|---|---|---|
| `leeLaEntrada` | `contexto`, `entrada`, `fila`, `pasos[]`: `{ tipo: "toca", parte }` o `{ tipo: "elige", campo, opciones, correctas[] }` (varias correctas = casillas) | `calificarLectura`: un resultado por paso |
| `podemosSalir` | `titulo`, `defecto`, `entrada`, `fila`, `estado[]`, `vuelo[]`, `decision` (`si`, `no`, `falta`), `cumpliendo?`, `razones[]: { texto, correcta }` | `calificarPodemosSalir`: decisión + juego de razones exacto |
| `calculaElPlazo` | `situacion`, `entrada?`, `fila?`, `categoria`, `plazo`, `registro?: { fecha, hora, huso }`, `cuenta` (`UTC`/`local`), `opciones[]` | `respuestaPlazo` calcula la buena; `calificarPlazo` compara |
| `combinados` | `titulo`, `items[]: { entrada, fila, estado }` (2 o 3), `vuelo[]`, `decision`, `cumpliendo?`, `dependencia: { opciones, correcta }` | `calificarCombinados` |
| `buscaElItem` | `sintoma`, `capitulos[]`, `capitulo`, `items[]` (del capítulo bueno), `item` | `calificarBusqueda`: capítulo e ítem |
| `impactoOperacional` | `contexto`, `entrada`, `fila`, `afecta[]` (`rvsm`, `catIIIII`, `edto`, `pbn`, `performance`, `combustible`, `meteorologia`, `ninguna`), `porQue?` | `calificarImpacto`: aciertos sobre la unión |

### Plazos (`plazo`)

- `{ unidad: "calendario", dias? }`: B = 3, C = 10, D = 120 días (PL-25); A necesita `dias`.
  Se excluye el day of discovery y vence a las 2359 del último día: registrado el 26 de enero
  a las 10:00, B vence el 29 y C el 5 de febrero (el ejemplo de PL-25, probado).
- `{ unidad: "diasDeVuelo", dias, fechasConVuelo[] }`: categoría A en flight-days. Solo
  cuentan los días, después del de descubrimiento, en que el avión inicia al menos un vuelo.
- `{ unidad: "vuelosHoras", vuelos?, horas?, tramos[] }`: categoría A en vuelos, tramos u horas
  («whichever occurs first»). Corre desde que se difiere, sin day of discovery (PL-25,
  Repair Category A). `tramos` en orden, con `hecho: true` los ya volados; la respuesta es el
  último tramo pendiente que no pasa ningún límite, o `"ninguno"`. `opciones` va vacío: las
  opciones son los tramos pendientes (`opcionesPlazo`).
- `registro.huso` es el de la hora dada (−5 para Colombia, 0 si ya es UTC). Con `cuenta: "UTC"`
  se convierte antes de fijar el day of discovery (21:30 en Bogotá es el día siguiente en UTC).
  Con `cuenta: "local"` se toma la fecha tal cual.
- En días, `opciones` son `"AAAA-MM-DDTHH:MM"` con la buena entre ellas y trampas pensadas
  (contar el día del registro, 72 h desde la hora, «cuatro meses», la fecha local en vez de
  UTC). La prueba verifica que la buena esté y que no se repitan.

## Cómo se enchufa en la página de práctica

1. **Página** (p. ej. `src/pages/MelPractice.tsx`), ruta hija del layout en `App.tsx`
   (`${MEL_HUB}/practica`), con la misma casa que `ComunicacionesPractice.tsx`: cabecera,
   pestañas por tipo (`NOMBRE_TIPO_MEL`), tira de saltos y ejercicio activo:

   ```tsx
   import { EjercicioMel } from "@/components/mel/practica"
   import { MEL_ACENTO } from "@/lib/mel"
   import { claveEjercicioMel } from "@/lib/melPractica"
   import { MEL_PRACTICA_DATOS } from "@/lib/melPracticaDatos"

   <div style={{ "--av-blue-500": MEL_ACENTO } as React.CSSProperties}>
     <EjercicioMel key={clave} item={item} onResultado={(r) => r.aciertos === r.total && marcar(clave)} />
   </div>
   ```

   El `key` por ítem es importante: remonta el ejercicio y borra lo respondido. Los
   componentes toman el acento de `--av-blue-500`; re-anclarlo en la raíz (o envolver en
   `.lector-notam.lector-mel`) les da el grafito del módulo. El verde queda para «correcto» y
   ámbar/rojo para error. `onResultado` se llama cada vez que el ejercicio queda resuelto
   (también tras «Volver a intentarlo»); la página decide qué cuenta como practicado.
   `modoExamen` quita «Volver a intentarlo».
2. **Claves de progreso** con `claveEjercicioMel(item)` (`mel-<tipo>-<id>`), nunca a mano.
   Cuando haya progreso de práctica en la base, van a `contenido/catalogo/modulos.json` por
   el flujo de `scripts/catalogo` (`ACTUALIZAR_CATALOGO=1 npx vitest run scripts/catalogo` y
   `node scripts/catalogo/sembrar.mjs`).
3. **ESLint**: `melPracticaDatos.ts` es contenido pesado. Agregar a `CONTENIDO` en
   `eslint.config.js` `@/lib/melPracticaDatos`, permitido solo en la página de práctica, como
   `@/lib/aeropuertosPractica`.
4. **Evaluación**: si se arma un banco `contenido/bancos/mel_evaluacion.json`, sus preguntas no
   pueden copiar estos ejercicios (ni al revés): `evaluacionesContenido.test.ts` lo revisa.

## Accesibilidad

- Todo son botones nativos con `aria-pressed`; las casillas múltiples se ven como casillas y se
  anuncian como botones conmutables. Foco visible del color del acento (`FOCO`).
- La tabla es una rejilla con `role="table"`, `row`, `cell` y `columnheader` (los números 1, 2
  y 3 llevan su nombre para lector de pantalla); la fila que se lee lleva `aria-current`.
- En «toca», cada parte es un botón con etiqueta propia («Categoría (columna 1): A») y borde
  punteado; tras un error se marca dónde estaba.
- Resultados en `role="status"`; el veredicto siempre lleva icono y texto, nunca solo color.
- Remarks va con `lang="en"`.

## Pruebas

- `src/lib/melPractica.test.ts`: plazos (PL-25 26 de enero, D, UTC, bisiesto, fin de año,
  flight-days, vuelos u horas), calificación de los seis tipos, y sanidad de los datos
  (conteos, claves únicas, sin rayas, partes tocables que existen, respuesta de plazo entre las
  opciones, citas de reales, numeración de inventadas).
- `src/components/mel/practica/practica.test.tsx`: la tabla, cada componente con sus
  interacciones, cada «Lee la entrada» respondido entero, y todos los datos pintados por
  `EjercicioMel`.

## Pendiente

- ~~La página, la ruta, el progreso y la regla de ESLint~~: hechos el 25-sep-2026
  (`src/pages/MelPractice.tsx`, `src/lib/melPracticaGrupos.ts`; ver `docs/MEL_ESTADO.md`).
- Probarlo a 360 px en un teléfono real: la tabla está pensada para eso, pero solo se probó en
  jsdom.

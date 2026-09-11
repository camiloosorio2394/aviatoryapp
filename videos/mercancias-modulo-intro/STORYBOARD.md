---
format: 1920x1080
duration: 59s
message: "El papel que firmas antes de salir es el último punto donde la cadena se puede parar"
arc: "Bienvenida → El papel ilegible → Lo que vas a aprender (4 promesas) → El mismo papel, entendido → Empecemos"
audience: "Pilotos que preparan el ingreso a una aerolínea en Latinoamérica"
mode: automation
music: documental sobrio, cuerdas graves contenidas, tensión baja que resuelve en calma
---

# Módulo Mercancías peligrosas · video de apertura

**El NOTOC que sostiene el video es real** y es el mismo que enseña la lección 14 del
módulo (nivel 4). Se usa completo y sin alterar. Aparece ilegible en el Frame 2 y
entendido en el Frame 7: es la misma pieza de pantalla, y esa permanencia es lo que hace
legible la transformación.

Los identificadores vienen anonimizados de la fuente (`AV0000`, `00MMM`, `HK-XXXX`) porque
es material de enseñanza. Se dejan tal cual. **No se completan, no se cambian, no se
inventan.**

```
NOTIFICATION TO CAPTAIN          FLT AV0000 / 00MMM / HK-XXXX
STA: SKBO   DEST: SBGR   CPT: ______________________

POS  UN     PROPER SHIPPING NAME        CL  GE  PKG  ULD
---  -----  --------------------------  --  --  ---  ------------
1FL  1263   PAINT                       3   II   2   AKE 12345 AV
1FL  1830   SULPHURIC ACID              8   II   1   AKE 12345 AV
5AR  3480   LITHIUM ION BATTERIES       9   --   4   PMC 67890 AV
                                             CAO

DRILL CODE: 3L / 8L / 9FZ        EMERGENCY RESPONSE: DOC 9481
```

Son **once líneas** contando la vacía. Cualquier escena que muestre el NOTOC lo muestra
entero.

---

## Frame 1 — Apertura

- status: animated
- src: compositions/frames/01-apertura.html
- duration: 5.667s
- transition_in: cut
- blueprint: titlecard-reveal (Adapt)
- scene: Rótulo del módulo sobre navy; el título entra y se asienta.
- voiceover: Bienvenido al módulo de Mercancías peligrosas de Aviatory.
- focal: las palabras MERCANCÍAS PELIGROSAS
- roles: MERCANCÍAS PELIGROSAS = foreground subject · rótulo mono = supporting · campo navy con retícula hairline al 6% = background
- sfx: impacto-suave

Adapt: mismo revelado de tarjeta de título que en NOTAM, pero el título son dos palabras y
no una, así que se apilan en dos líneas y el acento subraya solo la segunda.

Scene 1 (0.0–1.0s): navy `#14202E` a sangre con una retícula hairline apenas visible (background, 3 capas de profundidad). El rótulo mono `INGRESO A AEROLÍNEA · MÓDULO` entra en el tercio superior con revelado por palabra. Framing centrado.
Scene 2 (1.0–2.4s): **MERCANCÍAS** y **PELIGROSAS** entran desde abajo en Archivo 800 sobre papel, en dos líneas, resolviéndose desde desenfoque, ~62% del ancho. Escalonado por línea, curva larga.
Scene 3 (2.4–3.6s): una hairline en acento `#7A5C12` se dibuja bajo **PELIGROSAS** de izquierda a derecha y queda. Todo se detiene: lectura sostenida, sin deriva de cámara.

## Frame 2 — El papel que pasa por tus manos

- status: animated
- src: compositions/frames/02-el-papel.html
- duration: 9.011s
- transition_in: cut
- blueprint: zoom-out-workspace-reveal (Adapt)
- scene: El NOTOC completo sobre superficie de código navy. Ilegible: se lee como una rejilla de datos, no como información.
- voiceover: Esto sube a tu avión. Y el papel que lo dice pasa por tus manos antes de cerrar la puerta.
- focal: el bloque del NOTOC, once líneas, mono
- roles: NOTOC = foreground subject · encabezados de columna = supporting · panel navy sobre papel = background
- sfx: papel-suave

Adapt: es el gemelo del Frame 2 de NOTAM. **La geometría del panel es la que el Frame 7
tiene que calcar**, así que se fija aquí y no se toca: panel centrado, mono a interlineado
generoso, sin ningún resalte de color. El NOTOC entra entero de una vez, no línea a línea:
la sensación buscada es «me acaban de pasar un papel», no «se está escribiendo».

**EL NOTOC, COMPLETO Y LITERAL. Las once líneas van en pantalla tal cual, sin
recortar, sin resumir y sin completar los identificadores anonimizados:**

```
NOTIFICATION TO CAPTAIN          FLT AV0000 / 00MMM / HK-XXXX
STA: SKBO   DEST: SBGR   CPT: ______________________

POS  UN     PROPER SHIPPING NAME        CL  GE  PKG  ULD
---  -----  --------------------------  --  --  ---  ------------
1FL  1263   PAINT                       3   II   2   AKE 12345 AV
1FL  1830   SULPHURIC ACID              8   II   1   AKE 12345 AV
5AR  3480   LITHIUM ION BATTERIES       9   --   4   PMC 67890 AV
                                             CAO

DRILL CODE: 3L / 8L / 9FZ        EMERGENCY RESPONSE: DOC 9481
```


Scene 1 (0.0–1.2s): papel `#FBFAF8` a sangre. El panel navy `#151618` entra con un fundido corto y una hairline `cream@14%`. Framing centrado, sin movimiento.
Scene 2 (1.2–3.0s): el NOTOC aparece completo dentro del panel, en JetBrains Mono crema, con un revelado de opacidad de arriba abajo muy corto. Ninguna palabra destacada: todo pesa lo mismo, que es el punto.
Scene 3 (3.0–7.8s): quietud declarada. Un acercamiento imperceptible (2%) sobre el panel, nada más. El espectador tiene tiempo de intentar leerlo y de no conseguirlo.

## Frame 3 — Por qué existe la norma

- status: animated
- src: compositions/frames/03-por-que-existe.html
- duration: 6.686s
- transition_in: cut
- blueprint: kinetic-type-beats (Adapt)
- scene: La cadena de la norma, de lo mundial a lo nacional, con el caso que la fundó al pie.
- voiceover: Aquí vas a aprender por qué existe la norma, y qué accidente la escribió.
- focal: la cadena Anexo 18 → Doc 9284 → LAR 175 → RAC 175
- roles: los cuatro eslabones = foreground subject · «ValuJet 592 · NTSB/AAR-97/06» = supporting · papel = background
- sfx: ninguno

Adapt: la evidencia no es una cifra sino un número de informe. Va pequeño y al pie, como
una referencia de documento, no como un titular de tragedia.

Scene 1 (0.0–1.4s): sobre papel, los cuatro eslabones entran de izquierda a derecha, uno cada 0.3s, unidos por una hairline en tinta. Cada uno es una etiqueta mono en caja con borde hairline.
Scene 2 (1.4–2.8s): el cuarto eslabón, el reglamento nacional, recibe el único acento mostaza: borde `#7A5C12`. Es donde aterriza la norma para el alumno.
Scene 3 (2.8–4.2s): al pie entra `ValuJet 592 · NTSB/AAR-97/06` en mono pequeño, con un fundido. Quietud.

## Frame 4 — Identificar

- status: animated
- src: compositions/frames/04-identificar.html
- duration: 7.234s
- transition_in: cut
- blueprint: grid-card-assemble (Reproduce)
- scene: Las nueve clases como rejilla de nueve celdas numeradas; debajo, etiquetas y grupos de embalaje.
- voiceover: Vas a reconocer las nueve clases, sus etiquetas y sus grupos de embalaje.
- focal: la rejilla de nueve celdas
- roles: las nueve celdas = foreground subject · los rótulos «etiquetas» y «grupos de embalaje» = supporting · papel = background
- sfx: ninguno

Adapt: las celdas llevan solo el número de clase, no un rombo dibujado. Los rombos de
riesgo son símbolos normalizados y **no se inventan aquí**: eso lo enseña la lección con
las láminas reales.

Scene 1 (0.0–1.6s): nueve celdas cuadradas en rejilla 3×3 se ensamblan en orden, una cada 0.15s, cada una con su cifra de 1 a 9 en Archivo sobre papel y borde hairline.
Scene 2 (1.6–3.0s): las nueve quedan. Debajo entran dos rótulos mono, `ETIQUETAS` y `GRUPOS DE EMBALAJE`, separados por un punto medio.
Scene 3 (3.0–4.5s): una hairline mostaza subraya la fila de rótulos. Quietud declarada.

## Frame 5 — Qué vuela y qué no

- status: animated
- src: compositions/frames/05-que-vuela.html
- duration: 6.163s
- transition_in: cut
- blueprint: spatial-pan-stations (Adapt)
- scene: Tres columnas: permitido, permitido con condiciones, prohibido. La tercera se cierra.
- voiceover: Vas a saber qué puede volar, qué no, y en qué aeronave.
- focal: las tres columnas
- roles: las tres columnas = foreground subject · el rótulo `CAO · SOLO AERONAVE DE CARGA` = supporting · papel = background
- sfx: ninguno

Adapt: la tercera decisión (en qué aeronave) no es una columna más sino una condición que
cruza las tres, y por eso aparece como banda al pie y no como cuarta columna.

Scene 1 (0.0–1.3s): tres columnas de igual ancho entran desde abajo, escalonadas 0.2s, cada una con su rótulo mono en la cabecera.
Scene 2 (1.3–2.5s): la tercera columna se atenúa al 35% y le cruza una hairline: es lo que no vuela. Las otras dos quedan a plena tinta.
Scene 3 (2.5–3.8s): al pie entra la banda `CAO · SOLO AERONAVE DE CARGA` en mono sobre acento mostaza al 12%. Quietud.

## Frame 6 — El papel y la emergencia

- status: animated
- src: compositions/frames/06-el-notoc.html
- duration: 7.391s
- transition_in: cut
- blueprint: kinetic-type-beats (Adapt)
- scene: Los ocho encabezados de columna del NOTOC, en fila, revelándose uno a uno.
- voiceover: Y vas a leer ese papel columna por columna, y saber qué hacer si algo pasa en vuelo.
- focal: la fila de encabezados POS · UN · PROPER SHIPPING NAME · CL · GE · PKG · ULD
- roles: los encabezados = foreground subject · `DRILL CODE` = supporting · panel navy = background
- sfx: ninguno

Adapt: aquí sí se revela elemento a elemento, al revés que en el Frame 2. Ahí el papel
llegaba de golpe; aquí se desarma. Es la diferencia entre recibir y leer.

Scene 1 (0.0–2.6s): sobre panel navy, los encabezados entran de izquierda a derecha, uno cada 0.3s, en mono crema con su ancho de columna real.
Scene 2 (2.6–4.4s): bajo cada encabezado aparece su glosa de una palabra en crema al 55% (`dónde`, `qué`, `nombre`, `clase`, `grupo`, `bultos`, `unidad`), escalonada igual.
Scene 3 (4.4–6.0s): entra `DRILL CODE` al pie, en acento mostaza, separado por una hairline. Quietud declarada: es el enlace con la emergencia.

## Frame 7 — El mismo papel, entendido

- status: animated
- src: compositions/frames/07-papel-entendido.html
- duration: 9.907s
- transition_in: cut
- blueprint: grid-card-assemble (Adapt)
- scene: El NOTOC vuelve idéntico al Frame 2. Dos líneas se encienden y una banda nombra lo que comparten.
- voiceover: Al terminar, vas a ver que la pintura y el ácido viajan en el mismo contenedor. Y vas a saber por qué eso se pregunta antes de firmar.
- focal: las dos líneas de `AKE 12345 AV`
- roles: las líneas de PAINT y SULPHURIC ACID = foreground subject · banda de pago = supporting · panel navy = background
- sfx: impacto-suave

Adapt: **calca la geometría del Frame 2 exactamente**: mismo panel, mismo tamaño, misma
posición, mismo interlineado, mismo NOTOC completo. Si el encuadre no coincide, el video
pierde su único argumento. Lo único que se añade es el acento y la banda.

**EL NOTOC, COMPLETO Y LITERAL. Las once líneas van en pantalla tal cual, sin
recortar, sin resumir y sin completar los identificadores anonimizados:**

```
NOTIFICATION TO CAPTAIN          FLT AV0000 / 00MMM / HK-XXXX
STA: SKBO   DEST: SBGR   CPT: ______________________

POS  UN     PROPER SHIPPING NAME        CL  GE  PKG  ULD
---  -----  --------------------------  --  --  ---  ------------
1FL  1263   PAINT                       3   II   2   AKE 12345 AV
1FL  1830   SULPHURIC ACID              8   II   1   AKE 12345 AV
5AR  3480   LITHIUM ION BATTERIES       9   --   4   PMC 67890 AV
                                             CAO

DRILL CODE: 3L / 8L / 9FZ        EMERGENCY RESPONSE: DOC 9481
```

Las dos filas que se encienden son la primera y la segunda de datos: `1FL 1263 PAINT` y
`1FL 1830 SULPHURIC ACID`. Lo que comparten es el `AKE 12345 AV` del final de cada una.

Scene 1 (0.0–1.4s): el panel y el NOTOC entran ya idénticos al Frame 2, con un corte seco. Nada destacado todavía: durante un segundo y medio es la misma imagen de antes.
Scene 2 (1.4–4.0s): las dos filas de `1FL` (PAINT y SULPHURIC ACID) suben a plena tinta mientras el resto baja al 45%. Sus dos `AKE 12345 AV` reciben el acento mostaza. Nada se mueve de sitio: solo cambia el peso.
Scene 3 (4.0–8.2s): una banda entra bajo el panel, en mostaza al 12% con borde hairline: `CLASE 3 Y CLASE 8 EN EL MISMO ULD`. Quietud sostenida, la más larga del video.

## Frame 8 — Empecemos

- status: animated
- src: compositions/frames/08-empecemos.html
- duration: 6.686s
- transition_in: cut
- blueprint: logo-assemble-lockup (Adapt)
- scene: El cierre: qué trae el módulo y la palabra final.
- voiceover: Dieciocho lecciones, práctica y evaluación. Empecemos.
- focal: la palabra AVIATORY
- roles: `18 LECCIONES · PRÁCTICA · EVALUACIÓN` = supporting · AVIATORY = foreground subject · navy = background
- sfx: impacto-suave

Adapt: mismo cierre que NOTAM, con la cifra del módulo cambiada. Es deliberado que los dos
videos terminen igual: son la misma casa.

Scene 1 (0.0–1.4s): navy a sangre. El rótulo mono `18 LECCIONES · PRÁCTICA · EVALUACIÓN` entra con revelado por palabra, centrado.
Scene 2 (1.4–2.6s): **AVIATORY** entra en Archivo 800 sobre papel, ~45% del ancho, desde desenfoque.
Scene 3 (2.6–4.0s): una hairline mostaza se dibuja bajo la palabra y queda. Quietud.

---

## Video direction

**Tono.** Documental, no promocional. El video imita el mismo documento que el alumno va a
leer dentro del lector: papel `#FBFAF8`, tinta `#16191D`, superficie de código navy
`#14202E`, y el mostaza `#7A5C12` reservado como voltaje escaso, nunca como relleno.
Titulares en Archivo; todo el código en monoespaciada.

**El mostaza no es ámbar.** Es el color del módulo, no una alerta. Apagado, corporativo.
Si en una escena parece un aviso de precaución, está mal aplicado. Nunca dos mostazas en
una misma escena.

**La regla que gobierna el montaje.** El NOTOC real es el único objeto que persiste. Entra
en el Frame 2, se va durante las promesas y vuelve idéntico en el Frame 7. El espectador
tiene que reconocerlo: si el encuadre del 7 no calca al del 2, el video pierde su único
argumento. El Frame 2 fija la geometría; el Frame 7 la copia.

**Y va completo.** Las once líneas, en las dos escenas. No se recorta, no se resume, no se
completan los identificadores anonimizados. En el video de NOTAM dos escenas se inventaron
el aviso porque su paquete llevaba solo fragmentos, y hubo que rehacerlas enteras.

**Movimiento.** Un solo gesto por escena. Nada de movimiento ocioso ni de elementos que
respiran: si algo se mueve, es porque está diciendo algo. Los planos 1, 4, 5, 6 y 7
terminan en quietud declarada; la quietud del 7 es la más larga del video a propósito,
porque cae justo después de la única frase que importa.

**Lo que no se dibuja.** Los rombos de las nueve clases son símbolos normalizados y aquí
no se inventan: el Frame 4 usa cifras en celdas, no pictogramas. Las láminas reales las
enseña la lección.

**Subtítulos.** Español, incrustados, misma plantilla que NOTAM. Banda inferior reservada:
ninguna escena coloca contenido en los últimos 180px.

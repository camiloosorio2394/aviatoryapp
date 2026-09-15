---
format: 1920x1080
duration: 55s
message: "La actitud por sí sola no indica si el ala está volando"
arc: "Bienvenida → Los tres ángulos, inertes → Lo que vas a aprender (4 promesas) → Los mismos tres ángulos, entendidos → Empecemos"
audience: "Pilotos que preparan el ingreso a una aerolínea en Latinoamérica"
mode: automation
music: documental sobrio, cuerdas graves contenidas, tensión baja que resuelve en calma
---

# Módulo Aerodinámica · video de apertura

**La tabla que sostiene el video es real** y es la misma que enseña la Sección 4 del módulo
(`docs/contenido/aerodinamica.md`, «Ángulo de ataque y actitud de cabeceo»). Se usa completa
y sin alterar. Aparece inerte en el Frame 2 y entendida en el Frame 7: es la misma pieza de
pantalla, y esa permanencia es lo que hace legible la transformación.

Los valores son ilustrativos y **el documento lo dice**. Por eso el pie va en pantalla las
dos veces. Sin ese pie, el video estaría atribuyendo esos ángulos a un tipo de avión, que es
justo lo que el módulo evita. **No se completa, no se cambia, no se inventa.**

```
PITCH  ≈  AOA  +  ÁNGULO DE TRAYECTORIA

Situación                          Pitch   Trayectoria   AOA aproximado
---------------------------------  ------  ------------  ------------------
Ascenso normal                     +10°    +7°           3°
Aproximación estabilizada          +3°     –3°           6°
Nariz arriba, descendiendo fuerte  +15°    –25°          40° (en pérdida)

Valores ilustrativos para mostrar la relación, no de un tipo de avión específico.
```

Son **nueve líneas** contando las dos vacías. Cualquier escena que muestre la tabla la
muestra entera, con la relación arriba y el pie abajo.

Los signos son los del documento: `+` para los positivos y **guion medio** (`–`, en dash)
para los negativos, no un guion corto. `40° (en pérdida)` lleva su paréntesis.

---

## Frame 1 — Apertura

- status: animated
- src: compositions/frames/01-apertura.html
- duration: 4.336s
- transition_in: cut
- blueprint: titlecard-reveal (Adapt)
- scene: Rótulo del módulo sobre navy; el título entra y se asienta.
- voiceover: Bienvenido al módulo de Aerodinámica de Aviatory.
- focal: la palabra AERODINÁMICA
- roles: AERODINÁMICA = foreground subject · rótulo mono = supporting · campo navy con retícula hairline al 6% = background

Adapt: mismo revelado de tarjeta de título que en NOTAM y Mercancías, pero el título es una
sola palabra larga, así que va en una línea y el acento la subraya entera.

Scene 1 (0.0–1.0s): navy `#14202E` a sangre con una retícula hairline apenas visible (background, 3 capas de profundidad). El rótulo mono `INGRESO A AEROLÍNEA · MÓDULO` entra en el tercio superior con revelado por palabra. Framing centrado.
Scene 2 (1.0–2.4s): **AERODINÁMICA** entra desde abajo en Archivo sobre papel, en una línea, resolviéndose desde desenfoque, ~68% del ancho. Curva larga.
Scene 3 (2.4–3.6s): una hairline en acento `#5D84AC` se dibuja bajo la palabra de izquierda a derecha y queda. Todo se detiene: lectura sostenida, sin deriva de cámara.

## Frame 2 — Los tres ángulos

- status: animated
- src: compositions/frames/02-tres-angulos.html
- duration: 9.561s
- transition_in: cut
- blueprint: zoom-out-workspace-reveal (Adapt)
- scene: La tabla completa sobre superficie de código navy. Inerte: se lee como una rejilla de datos, no como información.
- voiceover: Tu avión vuela con tres ángulos a la vez, y no son el mismo. El que decide si el ala está volando es uno solo.
- focal: el bloque de la tabla, nueve líneas, mono
- roles: la tabla = foreground subject · la relación PITCH ≈ AOA + ÁNGULO DE TRAYECTORIA = supporting · panel navy sobre papel = background

Adapt: es el gemelo del Frame 2 de Mercancías. **La geometría del panel es la que el Frame 7
tiene que calcar**, así que se fija aquí y no se toca: panel centrado, mono a interlineado
generoso, sin ningún resalte de color. La tabla entra entera de una vez, no línea a línea:
la sensación buscada es «esto es lo que hay», no «se está escribiendo».

**LA TABLA, COMPLETA Y LITERAL. Las nueve líneas van en pantalla tal cual, con la relación
arriba y el pie de valores ilustrativos abajo:**

```
PITCH  ≈  AOA  +  ÁNGULO DE TRAYECTORIA

Situación                          Pitch   Trayectoria   AOA aproximado
---------------------------------  ------  ------------  ------------------
Ascenso normal                     +10°    +7°           3°
Aproximación estabilizada          +3°     –3°           6°
Nariz arriba, descendiendo fuerte  +15°    –25°          40° (en pérdida)

Valores ilustrativos para mostrar la relación, no de un tipo de avión específico.
```

**GEOMETRÍA DEL PANEL — CONTRATO CONGELADO.** El Frame 7 calca este panel píxel a píxel.
Estos son los valores exactos; cópialos tal cual en los dos frames:

```
panel        left 160px · top 176px · width 1600px · height 584px
             padding 48px 52px · box-sizing border-box
             background #151618 · border 1px solid rgba(251,250,248,0.14) · radius 8px
código       JetBrains Mono 400 · 32px · line-height 54px · letter-spacing 0
             color #FBFAF8 · ligaduras desactivadas ('liga' 0, 'calt' 0)
pie          JetBrains Mono 400 · 26px · line-height 40px · color rgba(251,250,248,0.50)
origen x     160 + 1 (borde) + 52 (padding) = 213px
origen y     176 + 1 (borde) + 48 (padding) = 225px
avance       32 × 0.6 = 19.2px por carácter
columna N    x = 213 + N × 19.2
línea R      top = 225 + R × 54      (R = 0..7; el pie es la línea 8, a top 657)
```

Anchos comprobados: la línea más ancha de la tabla son **75 caracteres** (la de guiones)
= 1440px, y el ancho interior del panel es 1494px. El **pie son 81 caracteres**, que a 32px
no cabrían: por eso va a 26px (1264px). Extremo inferior del panel = 760px; con el drift del
2% queda muy por encima del keep-out de subtítulos (y = 900px).

Columnas para el Frame 7 (0-based, sobre la línea R=6): `+15°` empieza en la **columna 35**
(x = 885px, 4 caracteres = 76.8px) y `40° (en pérdida)` en la **columna 57**
(x = 1307.4px, 16 caracteres = 307.2px).

Scene 1 (0.0–1.2s): papel `#FBFAF8` a sangre. El panel navy `#151618` entra con un fundido corto y una hairline `cream@14%`. Framing centrado, sin movimiento.
Scene 2 (1.2–3.0s): la tabla aparece completa dentro del panel, en JetBrains Mono crema, con un revelado de opacidad de arriba abajo muy corto. Ninguna celda destacada: todo pesa lo mismo, que es el punto. El pie entra en crema al 50%, un escalón por debajo del resto.
Scene 3 (3.0–9.5s): quietud declarada. Un acercamiento imperceptible (2%) sobre el panel, repartido a lo largo de toda la escena, y nada más. El espectador tiene tiempo de recorrer la tercera fila y de no entender todavía por qué importa.

## Frame 3 — De dónde sale la sustentación

- status: animated
- src: compositions/frames/03-sustentacion.html
- duration: 9.561s
- transition_in: cut
- blueprint: kinetic-type-beats (Adapt)
- scene: Las cuatro fuerzas en cruz y, debajo, la ecuación de sustentación en su caja de código.
- voiceover: Aquí vas a aprender de dónde sale la sustentación, y cómo se equilibran las cuatro fuerzas en cada fase del vuelo.
- focal: la ecuación `L = ½ ρ V² S CL`
- roles: los cuatro rótulos SUSTENTACIÓN · PESO · EMPUJE · RESISTENCIA = foreground subject · la ecuación = supporting que se vuelve focal · papel = background

Adapt: los beats no son palabras sueltas sino los cuatro nombres de las fuerzas, colocados
en cruz —arriba, abajo, izquierda, derecha— porque esa disposición ya dice lo que son. No se
dibuja ninguna silueta de avión: el centro de la cruz queda vacío a propósito.

**Literal del módulo (Sección 2 y Sección 3). No se abrevia ni se traduce de otra manera:**

```
SUSTENTACIÓN (Lift)      PESO (Weight)
EMPUJE (Thrust)          RESISTENCIA (Drag)

L = ½ ρ V² S CL
```

Scene 1 (0.0–3.0s): sobre papel, los cuatro rótulos mono entran en cruz, uno cada 0.5s, en el orden sustentación (arriba), peso (abajo), empuje (izquierda), resistencia (derecha). Cada uno con una hairline corta que apunta al centro vacío.
Scene 2 (3.0–6.2s): los cuatro se atenúan al 45% y sube desde abajo el panel navy con la ecuación `L = ½ ρ V² S CL` en mono crema, ~46% del ancho. Es el único elemento a plena tinta.
Scene 3 (6.2–9.4s): `CL` recibe el acento `#5D84AC` —es la única variable que el piloto mueve con el ángulo de ataque, y es el puente al frame siguiente. Quietud declarada.

## Frame 4 — La pérdida

- status: animated
- src: compositions/frames/04-la-perdida.html
- duration: 7.262s
- transition_in: cut
- blueprint: dataviz-countup (Adapt)
- scene: La curva de sustentación contra ángulo de ataque: sube, llega a CLmax y cae.
- voiceover: Vas a entender por qué un ala entra en pérdida, y por qué eso puede pasar a cualquier velocidad.
- focal: la curva y el punto de CLmax
- roles: la curva = foreground subject · los rótulos CLmax y ÁNGULO DE ATAQUE CRÍTICO = supporting · papel = background

Adapt: no hay cifras que contar, así que no hay count-up: lo que se anima es el trazo. **Los
ejes van sin escala numérica**, porque el documento tampoco la da (la lámina real, `IMG-04`,
la enseña la lección). Rótulos de eje en mono: `CL` en la vertical, `ÁNGULO DE ATAQUE` en la
horizontal.

Scene 1 (0.0–2.8s): sobre papel, los dos ejes se dibujan en hairline tinta al 20%. La curva se traza de izquierda a derecha en tinta plena: sube casi recta, se curva y cae después del máximo.
Scene 2 (2.8–4.8s): en el máximo aparece un punto y su rótulo mono `CLmax`; bajo el mismo punto, sobre el eje horizontal, una marca vertical hairline en acento `#5D84AC` y el rótulo `ÁNGULO DE ATAQUE CRÍTICO`. Es el único acento del frame.
Scene 3 (4.8–7.1s): entra al pie, en mono pequeño sobre papel, la frase del módulo: `LA PÉRDIDA NO OCURRE PORQUE EL AVIÓN LLEGUE A UNA VELOCIDAD DETERMINADA`. Quietud declarada.

## Frame 5 — Mandos, peso y viraje

- status: animated
- src: compositions/frames/05-mandos-peso-viraje.html
- duration: 6.139s
- transition_in: cut
- blueprint: spatial-pan-stations (Adapt)
- scene: Tres columnas —superficies, centro de gravedad, factor de carga— y al pie la cifra del viraje.
- voiceover: Vas a saber qué mueve cada mando, dónde va el peso y qué cambia cuando viras.
- focal: las tres columnas
- roles: las tres columnas = foreground subject · la banda `60° DE ALABEO = 2 G = +41 % EN LA VELOCIDAD DE PÉRDIDA` = supporting · papel = background

Adapt: no hay paneo de cámara —el módulo no es un recorrido—, así que las tres estaciones
entran en su sitio y se quedan. La tercera es la que importa y por eso es la que recibe la
banda al pie.

**La cifra es literal de la Sección 6 y va entera, con sus tres términos:**

```
60° de alabeo = 2 G = +41 % en la velocidad de pérdida
```

Scene 1 (0.0–1.4s): tres columnas de igual ancho entran desde abajo, escalonadas 0.2s, cada una con su rótulo mono en la cabecera: `SUPERFICIES DE CONTROL`, `CENTRO DE GRAVEDAD`, `FACTOR DE CARGA`. Bajo cada rótulo, una glosa de dos palabras en tinta al 60%: `qué mueve cada mando`, `dónde va el peso`, `qué cambia al virar`.
Scene 2 (1.4–3.2s): la tercera columna sube a plena tinta y las otras dos bajan al 40%. Nada se mueve de sitio: solo cambia el peso.
Scene 3 (3.2–6.0s): al pie entra la banda `60° DE ALABEO = 2 G = +41 % EN LA VELOCIDAD DE PÉRDIDA` en mono sobre acento `#5D84AC` al 12%, con borde hairline y texto en tinta. Quietud.

## Frame 6 — Gran altitud

- status: animated
- src: compositions/frames/06-gran-altitud.html
- duration: 6.217s
- transition_in: cut
- blueprint: comparison-split (Adapt)
- scene: Dos barras apiladas: el margen a altitud media y el margen cerca del techo. La segunda es visiblemente más corta.
- voiceover: Y vas a ver cómo se estrecha el margen a gran altitud, hasta el Coffin Corner.
- focal: las dos barras
- roles: las dos barras = foreground subject · los extremos LOW-SPEED BUFFET y MACH BUFFET = supporting · papel = background

Adapt: es el esquema literal de la Sección 11, y el documento pide expresamente **sin
animación** para él. Se respeta: las barras entran una vez, con un fundido corto, y se
quedan. No pulsan, no crecen, no vibran.

**El esquema, literal de la Sección 11:**

```
ALTITUD MEDIA
LOW-SPEED BUFFET ──────── MARGEN OPERACIONAL AMPLIO ──────── MACH BUFFET

GRAN ALTITUD · CERCA DEL TECHO
LOW-SPEED BUFFET ──── MARGEN MÍNIMO ──── MACH BUFFET
```

Scene 1 (0.0–1.8s): sobre papel, la barra de arriba entra con un fundido corto: ancho completo (~72% del ancho de pantalla), extremos rotulados en mono, y el rótulo `ALTITUD MEDIA` encima en mono pequeño.
Scene 2 (1.8–3.8s): entra la barra de abajo, alineada al mismo centro y visiblemente más corta (~34% de la de arriba). Rótulo `GRAN ALTITUD · CERCA DEL TECHO`. Los dos extremos de esta barra en acento `#5D84AC`: es el único voltaje del frame.
Scene 3 (3.8–6.1s): entra al pie, en mono pequeño, `COFFIN CORNER`. Quietud declarada, sin ningún movimiento residual.

## Frame 7 — Los mismos tres ángulos, entendidos

- status: animated
- src: compositions/frames/07-angulos-entendidos.html
- duration: 6.8s
- transition_in: cut
- blueprint: grid-card-assemble (Adapt)
- scene: La tabla vuelve idéntica al Frame 2. La tercera fila se enciende y una banda nombra lo que significa. Sin locución.
- focal: la tercera fila, `Nariz arriba, descendiendo fuerte`
- roles: la tercera fila = foreground subject · banda de pago = supporting · panel navy = background

Adapt: **calca la geometría del Frame 2 exactamente**: mismo panel, mismo tamaño, misma
posición, mismo interlineado, misma tabla completa, mismo pie. Si el encuadre no coincide, el
video pierde su único argumento. Lo único que se añade es el acento y la banda.

**LA TABLA, COMPLETA Y LITERAL. Las nueve líneas van en pantalla tal cual:**

```
PITCH  ≈  AOA  +  ÁNGULO DE TRAYECTORIA

Situación                          Pitch   Trayectoria   AOA aproximado
---------------------------------  ------  ------------  ------------------
Ascenso normal                     +10°    +7°           3°
Aproximación estabilizada          +3°     –3°           6°
Nariz arriba, descendiendo fuerte  +15°    –25°          40° (en pérdida)

Valores ilustrativos para mostrar la relación, no de un tipo de avión específico.
```

La fila que se enciende es la tercera de datos: `Nariz arriba, descendiendo fuerte`. Dentro
de ella reciben el acento **dos celdas y solo dos**: `+15°` y `40° (en pérdida)`. La de
`–25°` se queda a plena tinta pero sin acento: es el dato que explica, no el que sorprende.

**GEOMETRÍA — LA MISMA DEL FRAME 2, SIN UNA VARIACIÓN.** Repetida aquí para no tener que ir
a buscarla:

```
panel        left 160px · top 176px · width 1600px · height 584px
             padding 48px 52px · box-sizing border-box
             background #151618 · border 1px solid rgba(251,250,248,0.14) · radius 8px
código       JetBrains Mono 400 · 32px · line-height 54px · letter-spacing 0
             color #FBFAF8 · ligaduras desactivadas ('liga' 0, 'calt' 0)
pie          JetBrains Mono 400 · 26px · line-height 40px · color rgba(251,250,248,0.50)
origen x     213px · origen y 225px · avance 19.2px por carácter
columna N    x = 213 + N × 19.2      línea R    top = 225 + R × 54
```

Las dos celdas que reciben el acento, sobre la línea **R = 6**:

```
+15°               columna 35 → x = 885.0px    ancho  4 car. =  76.8px
40° (en pérdida)   columna 57 → x = 1307.4px   ancho 16 car. = 307.2px
```

El acento es color de texto, no un recuadro de fondo: la rejilla mono no se toca.

**ESTE PLANO VA SIN LOCUCIÓN, Y ES UNA DECISIÓN.** El guion tenía aquí la línea
7 —«Al terminar, vas a ver una nariz quince grados arriba y un avión cayendo. Y
por qué la actitud, por sí sola, no dice si el ala está volando»— y sigue en
`SCRIPT.md` por si un día se graba. Pero lo que decía **ya está escrito en la
banda**: la voz solo lo iba a repetir. Callar al narrador justo cuando aparece lo
que hay que entender es el recurso del plano, no una avería.

Sin voz que marcar, los tiempos los pone la lectura. La banda son 55 caracteres
y necesita sus casi tres segundos de quietud. Por eso el plano dura 6.8s y no
los 10.5 de la versión narrada: un silencio de diez segundos no se lee como un
silencio, se lee como que se rompió el audio.

Scene 1 (0.0–1.1s): el panel y la tabla entran ya idénticos al Frame 2, con un corte seco. Nada destacado todavía: durante un segundo es la misma imagen de antes.
Scene 2 (1.1–3.3s): la tercera fila de datos sube a plena tinta mientras el resto baja al 45%. `+15°` y `40° (en pérdida)` reciben el acento `#5D84AC`. Nada se mueve de sitio: solo cambia el peso.
Scene 3 (3.3–6.8s): una banda entra bajo el panel, en acento `#5D84AC` al 12% con borde hairline y texto en tinta: `LA ACTITUD POR SÍ SOLA NO INDICA SI EL ALA ESTÁ VOLANDO`. Aterriza en 3.92 y se queda: 2.9 segundos de quietud, la más larga del video, para leerla sin prisa.

## Frame 8 — Empecemos

- status: animated
- src: compositions/frames/08-empecemos.html
- duration: 4.833s
- transition_in: cut
- blueprint: logo-assemble-lockup (Adapt)
- scene: El cierre: qué trae el módulo y la palabra final.
- voiceover: Doce secciones, práctica y evaluación. Empecemos.
- focal: la palabra AVIATORY
- roles: `12 SECCIONES · PRÁCTICA · EVALUACIÓN` = supporting · AVIATORY = foreground subject · navy = background

Adapt: mismo cierre que NOTAM, Meteorología y Mercancías, con la cifra del módulo cambiada.
Es deliberado que los cuatro videos terminen igual: son la misma casa.

Scene 1 (0.0–1.4s): navy `#14202E` a sangre. El rótulo mono `12 SECCIONES · PRÁCTICA · EVALUACIÓN` entra con revelado por palabra, centrado.
Scene 2 (1.4–2.6s): **AVIATORY** entra en Archivo sobre papel, ~45% del ancho, desde desenfoque.
Scene 3 (2.6–4.0s): una hairline en acento `#5D84AC` se dibuja bajo la palabra y queda. Quietud.

---

## Video direction

**Tono.** Documental, no promocional. El video imita el mismo documento que el alumno va a
leer dentro del lector: papel `#FBFAF8`, tinta `#16191D`, superficie de código navy
`#151618` (y `#14202E` a sangre en la apertura y el cierre), y el azul acero `#5D84AC`
reservado como voltaje escaso, nunca como relleno. Titulares en Archivo; todo lo técnico en
monoespaciada.

**El azul acero no es un azul de marca, es el color del módulo.** Es el mismo
`--av-ae-500` / `--ln-bright` que la app usa en el hub de Aerodinámica. Apagado, frío,
corporativo. Si en una escena parece un enlace o un botón, está mal aplicado. Nunca dos
acentos en una misma escena.

**Este azul no es el de NOTAM.** El de NOTAM es un azul carta profundo y saturado; este es
más claro y más gris. En los frames sobre navy el acento tiene que leerse sin esfuerzo: si
hay que buscarlo, subir al `#6996C5` del módulo antes que oscurecerlo.

**La regla que gobierna el montaje.** La tabla real es el único objeto que persiste. Entra en
el Frame 2, se va durante las promesas y vuelve idéntica en el Frame 7. El espectador tiene
que reconocerla: si el encuadre del 7 no calca al del 2, el video pierde su único argumento.
El Frame 2 fija la geometría; el Frame 7 la copia.

**Y va completa.** Las nueve líneas, en las dos escenas, con la relación arriba y el pie de
«valores ilustrativos» abajo. No se recorta, no se resume, no se quita el pie. En el video de
NOTAM dos escenas se inventaron el aviso porque su paquete llevaba solo fragmentos, y hubo
que rehacerlas enteras.

**Movimiento.** Un solo gesto por escena. Nada de movimiento ocioso ni de elementos que
respiran: si algo se mueve, es porque está diciendo algo. Los planos 1, 4, 5, 6 y 7 terminan
en quietud declarada; la quietud del 7 es la más larga del video a propósito, porque cae
justo después de la única frase que importa. El Frame 6 no anima nada más allá de su entrada:
el documento lo pide así para ese esquema.

**Lo que no se dibuja.** Ninguna silueta de avión, ningún instrumento de cabina, ninguna
escala numérica en los ejes de la curva y ninguna cifra que no esté en este storyboard. Los
ángulos de la tabla son ilustrativos y así van rotulados. Las láminas reales las enseña la
lección.

**Sonido.** Locución y una cama musical al 12%, nada más. **Sin efectos de sonido**, igual que
NOTAM, Meteorología y Mercancías: en un video de cincuenta y siete segundos que imita un
documento, un golpe de sonido suena a presentación corporativa. Por eso los frames no
declaran cues de sfx y `audio_meta.json` los lleva vacíos; si alguien vuelve a correr
`audio.mjs fetch-sfx`, hay que dejarlos vacíos otra vez.

**Subtítulos.** Español, incrustados, misma plantilla que los tres anteriores. Banda inferior
reservada: ninguna escena coloca contenido en los últimos 180px.

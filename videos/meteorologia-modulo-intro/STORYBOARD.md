---
format: 1920x1080
duration: 57s
message: "Al terminar el módulo, un pronóstico no se lee entero: se busca tu ventana"
arc: "Bienvenida → El pronóstico ilegible → Lo que vas a aprender (4 promesas) → El mismo pronóstico, con tu ventana marcada → Empecemos"
audience: "Pilotos que preparan el ingreso a una aerolínea en Latinoamérica"
mode: collaborative
music: documental sobrio, cuerdas graves contenidas, tensión baja que resuelve en calma
---

# Módulo Meteorología · video de apertura

**El pronóstico que sostiene el video sale del módulo**, completo y sin alterar: es el TAF
de la lección 29 (`src/lib/metarLesson.ts`, bloque `code` de «Leer un TAF completo»).
Aparece ilegible en el Frame 2 y con la ventana de llegada marcada en el Frame 7: es la
misma pieza de pantalla, y esa permanencia es lo que hace legible la transformación.

```
TAF SKXX 151700Z 1518/1624 20008KT 9999 SCT025
     BECMG 1520/1522 15012G22KT 6000 -RA BKN015
     TEMPO 1522/1602 3000 TSRA BKN010CB
     FM160300 09006KT 1200 BR OVC006
     PROB30 1604/1608 0500 FG
     BECMG 1612/1614 9999 NSW SCT030
```

**No es un informe real y el video lo dice.** La lección lo rotula con un callout
(«está construido para este curso … no es un informe real de ningún aeródromo») y el
indicativo `SKXX` es deliberadamente falso. En el video, el bloque lleva el rótulo
`ESCENARIO DE PRÁCTICA · LECCIÓN 29` en mono, presente **en los dos planos** donde
aparece, el 2 y el 7. No hay ningún otro METAR, TAF ni SIGMET en pantalla, y ninguna cifra
del bloque se retoca.

**De dónde sale cada palabra que se lee en pantalla.** Ninguna etiqueta, traducción ni
rótulo de este storyboard está redactado para el video: todos son texto del módulo.

| Frame | En pantalla | Fuente en el módulo |
|---|---|---|
| 2, 7 | el bloque TAF | lección 29, bloque `code` |
| 4 | «cuándo el aire sube solo» | título de la lección 6 |
| 4 | «a qué altura está la base» | kicker de la lección 7 |
| 4 | «lo que tienes delante» | título de la lección 8 |
| 4 | «los tres números que deciden si entras» | kicker de la lección 9 |
| 3 | «mueve el aire» · «mueve tu altímetro» | títulos de las lecciones 3 y 2 |
| 3 | los títulos `01` a `05` | lecciones 1 a 5, literales |
| 5 | antes de que pase · durante el paso · después | lección 11, «la firma de un frente cálido, en tres tiempos» |
| 5 | las tres lecturas del barómetro | lección 11, últimas viñetas de cada uno de los tres tiempos |
| 5 | los cuatro tipos y su `ref` | lección 10, bloque `fichas` |
| 6 | las cinco sustituciones de la línea `FM160300` | lección 29, bloque `kv`, fila «FM160300» |
| 7 | `TU LLEGADA · 0600Z` | lección 29, `piensaComoPiloto`, vuelo **C** |
| 7 | «cae dentro del PROB30» | lección 29, clave del vuelo **C** |
| 8 | `30 LECCIONES · PRÁCTICA · EVALUACIÓN` | recuento real: 30 lecciones, 191 minutos |

**Duraciones.** Las de abajo son **estimadas**, medidas a 12,0 caracteres de guion por
segundo (el ritmo del video de NOTAM con esta misma voz a 0,92) más el silencio de cola:
1,2 s por plano y 1,6 s en el giro. Suman 57,333 s. Cuando exista la locución real hay que
re-temporizar los ocho planos con las duraciones de `audio_engine_meta.json` y volver a
comprobar el tope de 1 minuto, que es la puerta documentada en `SCRIPT.md`.

## Frame 1 — Apertura

- status: outline
- src: compositions/frames/01-apertura.html
- duration: 5.283s
- transition_in: cut
- blueprint: titlecard-reveal (Adapt)
- scene: Rótulo del módulo sobre navy; el título entra y se asienta.
- voiceover: Bienvenido al módulo de Meteorología de Aviatory.
- focal: la palabra METEOROLOGÍA
- roles: METEOROLOGÍA = foreground subject · rótulo mono = supporting · campo navy con retícula hairline al 6% = background
- sfx: impacto-suave

Adapt: conservo el revelado de tarjeta de título y su asentamiento, pero el pago no es un
logo sino la palabra que da nombre al módulo. Es el mismo plano que abre el video de
NOTAM, con dos diferencias: el rótulo dice `MÓDULO 3` y la palabra es cuatro veces más
larga, así que baja de la rampa `display-cover` a una que quepa sin romper la medida.

Scene 1 (0.0–1.0s): navy `#14202E` a sangre con una retícula hairline apenas visible (background, 3 capas de profundidad). El rótulo mono `INGRESO A AEROLÍNEA · MÓDULO 3` entra en el tercio superior con revelado por palabra. Framing centrado.
Scene 2 (1.0–2.4s): **METEOROLOGÍA** entra desde abajo en Archivo sobre papel, resolviéndose desde desenfoque, ~72% del ancho. Escalonado por letra, curva larga.
Scene 3 (2.4–3.8s): una hairline en acento `#49939C` se dibuja bajo la palabra de izquierda a derecha y queda. Todo se detiene: lectura sostenida, sin deriva de cámara.

## Frame 2 — El pronóstico que ya lo dice todo

- status: outline
- src: compositions/frames/02-pronostico-ilegible.html
- duration: 10.700s
- transition_in: crossfade
- blueprint: zoom-out-workspace-reveal (Reproduce)
- scene: Abre pegado a un fragmento ilegible del TAF; la cámara retrocede y aparece el pronóstico entero, denso.
- voiceover: Este pronóstico ya dice lo que te vas a encontrar al aterrizar. Y descifrarlo no sirve si no sabes qué lo produce.
- focal: el bloque completo del TAF del módulo
- roles: bloque TAF = foreground subject · superficie de código navy = background · los tres grupos de cambio a plena tinta = supporting
- sfx: zumbido-grave-descendente

Scene 1 (0.0–1.8s): abre a sangre sobre `TSRA BKN010CB` de la tercera línea, tan cerca que los caracteres se cortan por los bordes del cuadro. Mono, papel sobre navy. Nada legible, y esa es la intención. Framing layered-depth, encuadre macro.
Scene 2 (1.8–5.0s): un único zoom-out desacelerado descubre primero la línea `TEMPO` entera y después el bloque de seis líneas. La cámara no se detiene mientras la voz dice «lo que te vas a encontrar al aterrizar». El zoom-out ES el motor de la escena: no hay ningún acercamiento en todo el plano.
Scene 3 (5.0–6.8s): el bloque queda centrado, ~64% del cuadro, con margen de papel alrededor, y debajo aparece el rótulo `ESCENARIO DE PRÁCTICA · LECCIÓN 29`. Se asienta y la cámara se para.
Scene 4 (6.8–9.5s): en «si no sabes qué lo produce», el bloque baja a media opacidad **excepto los grupos de cambio, que quedan a plena tinta**: las dos apariciones de `BECMG`, el `TEMPO`, el `FM160300` y el `PROB30`. Son exactamente los que ordenan el pronóstico en el tiempo, y son los que el alumno no sabe leer. Quietud absoluta.

## Frame 3 — La atmósfera

- status: outline
- src: compositions/frames/03-atmosfera.html
- duration: 8.200s
- transition_in: cut
- blueprint: kinetic-type-beats (Reproduce)
- scene: La palabra PRESIÓN se despliega a sus dos consecuencias.
- voiceover: Aquí vas a entender por qué se mueve el aire, y qué le hace la presión al altímetro.
- focal: la palabra PRESIÓN desplegándose a lo que hace
- roles: PRESIÓN → dos consecuencias = foreground subject · los títulos reales de las lecciones 1 a 5 en mono = supporting · papel con hairline superior = background
- sfx: tic-seco

Scene 1 (0.0–1.4s): corte a papel `#FBFAF8`. **Presión** sola en el centro, Archivo, tinta. Framing centrado, la palabra ocupa ~38% del ancho.
Scene 2 (1.4–3.4s): la palabra se desplaza a la izquierda y a su derecha entran sus dos consecuencias, una sobre otra y separadas por una hairline en acento: *mueve el aire* y *mueve tu altímetro*. Revelado por palabra, cueado a la voz. El framing pasa a asimétrico 60/40.
Scene 3 (3.4–7.0s): abajo a la izquierda entra, en mono pequeño y en una sola columna, la lista real de las cinco primeras lecciones (`01` a `05`), escalonada. Abajo a la derecha aparece la marca de progreso `1/4` en acento. Quietud.

## Frame 4 — El agua en el aire

- status: outline
- src: compositions/frames/04-agua.html
- duration: 6.117s
- transition_in: cut
- blueprint: grid-card-assemble (Reproduce)
- scene: Cuatro fichas entran en cascada, cada una con lo que decide.
- voiceover: Vas a leer el agua que lleva dentro: rocío, nubes y niebla.
- focal: las cuatro fichas
- roles: fichas = foreground subject · la frase que decide cada una = supporting · papel con hairline superior = background
- sfx: tic-escalonado

La locución nombra tres y en pantalla hay cuatro: la estabilidad es la que gobierna a las
otras tres y por eso abre la fila, aunque no se diga. Es el mismo reparto que en el video
de NOTAM, donde la voz nombraba las tres siglas y las fichas añadían el verbo.

Scene 1 (0.0–1.0s): papel. Entra **solo** la primera ficha, desde abajo: `ESTABILIDAD` en mono y bajo ella **cuándo el aire sube solo** en Archivo. Framing de cuatro columnas, primera posición ocupada, las otras tres vacías.
Scene 2 (1.0–1.9s): entra la segunda cuando la voz dice «rocío»: `PUNTO DE ROCÍO` · **a qué altura está la base**.
Scene 3 (1.9–2.8s): entra la tercera en «nubes»: `NUBES` · **lo que tienes delante**.
Scene 4 (2.8–3.7s): entra la cuarta en «niebla»: `NIEBLA` · **los tres números que deciden si entras**. El rótulo de esta última va en acento, y es el único acento del plano: es la que decide si el vuelo entra o no.
Scene 5 (3.7–4.9s): las cuatro fichas asentadas, del mismo tamaño y con el mismo peso tipográfico. Progreso `2/4`. Quietud.

## Frame 5 — Frentes y tormentas

- status: outline
- src: compositions/frames/05-frentes.html
- duration: 8.450s
- transition_in: cut
- blueprint: spatial-pan-stations (Adapt)
- scene: La cámara recorre el paso de un frente en tres tiempos; después baja a los cuatro tipos.
- voiceover: Vas a cruzar un frente sabiendo qué hay al otro lado. Y a leer una tormenta por dentro.
- focal: la línea de tiempo del paso del frente, ocupando el ancho del cuadro
- roles: los tres tiempos = foreground subject · los cuatro tipos = supporting · superficie navy = background
- sfx: whoosh-corto

Adapt: conservo el paneo lateral por estaciones y el aterrizaje en la última, pero las
estaciones no son hitos inventados: son los tres tiempos con los que la lección 11 enseña
la firma de un frente, y las cuatro fichas de abajo son los cuatro tipos de la lección 10
con su propia frase de referencia.

Las tres estaciones son **la firma de un frente cálido**, que es como la lección 11 las
titula, y lo que se lee bajo cada una es el barómetro: *sigue cayendo* → *se nivela* →
*ligero aumento y después un descenso*. Es el hilo que cierra el Frame 3: la presión vuelve
en el plano siguiente convertida en una lectura que el piloto puede usar.

Scene 1 (0.0–1.0s): vuelve la superficie navy. Una tira horizontal de ancho completo con tres estaciones en mono, papel sobre navy: `ANTES DE QUE PASE` · `DURANTE EL PASO` · `DESPUÉS`, y encima el rótulo `LA FIRMA DE UN FRENTE CÁLIDO`. Framing tira de ancho completo.
Scene 2 (1.0–3.6s): la cámara recorre la tira de izquierda a derecha. Al centrarse cada estación, esa estación pasa a acento y bajo ella aparece en Archivo pequeño lo que hace el barómetro en ese tramo: *la presión sigue cayendo* · *la presión se nivela* · *ligero aumento y después un descenso*. Una estación por cue, sin detenerse. **El acento viaja con la cámara**: al cruzar la siguiente, la anterior vuelve a ser chrome, y solo la última se queda marcada. Así el plano conserva un solo momento de acento y no acaba con tres títulos encendidos.
Scene 3 (3.6–5.2s): paneo corto hacia abajo. Los cuatro tipos aparecen como lista escalonada en mono, cada uno con su frase de referencia: `CÁLIDO` el aire cálido avanza y sustituye al frío · `FRÍO` el aire frío avanza y sustituye al cálido · `ESTACIONARIO` las dos masas se empujan con fuerzas parecidas · `OCLUIDO` un frente frío rápido alcanza a uno cálido lento. Sin detenerse en ninguno: solo se enumeran.
Scene 4 (5.2–7.2s): la cámara se aleja lo justo para que la tira y los cuatro tipos queden juntos en cuadro. Progreso `3/4`. Quietud.

## Frame 6 — El código

- status: outline
- src: compositions/frames/06-codigo.html
- duration: 6.367s
- transition_in: cut
- blueprint: kinetic-type-beats (Reproduce)
- scene: Una línea del TAF se traduce en el sitio, token por token.
- voiceover: Y vas a descifrar el código: METAR, taf y los avisos en vuelo.
- focal: la línea FM160300 traduciéndose token por token
- roles: la línea = foreground subject · el código original atenuado = supporting · papel = background
- sfx: tic-por-sustitución

La línea es la cuarta del mismo bloque que sostiene el video, y las cinco traducciones son
literalmente las de la lección 29: «A partir de las 03Z, línea nueva: viento flojo del
este, 1.200 metros con bruma y cielo cubierto a 600 pies».

Scene 1 (0.0–1.2s): papel. `FM160300 09006KT 1200 BR OVC006` centrado en mono grande, ~66% del ancho. Framing centrado.
Scene 2 (1.2–3.6s): **sustitución en el sitio, token por token y por corte duro**, nunca por fundido. `FM160300` pasa a *desde las 03Z*, `09006KT` a *este, 6 nudos*, `1200` a *1.200 m*, `BR` a *bruma* y `OVC006` a *cubierto a 600 ft*. El cambio en sí es el movimiento; la línea no se desplaza. Cada sustitución cae en su cue de voz.
Scene 3 (3.6–5.2s): queda leyéndose en Archivo, y encima, pequeño y atenuado, el código original como recordatorio de dónde salió. Progreso `4/4`. Quietud.

## Frame 7 — El mismo pronóstico, con tu ventana

- status: outline
- src: compositions/frames/07-tu-ventana.html
- duration: 6.683s
- transition_in: crossfade
- blueprint: grid-card-assemble (Adapt)
- scene: El pronóstico del Frame 2 reaparece y la banda de acento aterriza sobre la hora de llegada.
- voiceover: Al terminar, no lees el pronóstico entero: buscas tu ventana.
- focal: el bloque TAF completo, en el encuadre exacto del Frame 2
- roles: bloque = foreground subject · la banda de la ventana y su etiqueta = supporting · superficie navy = background
- sfx: cascada-tics-suaves, impacto-final

Adapt: el video de NOTAM ensamblaba una etiqueta sobre cada línea, porque ahí la promesa
era leerlo entero. Aquí la promesa es la contraria, así que lo que se ensambla es **una
sola marca**: la ventana. Las seis líneas siguen ahí, y justamente por eso se entiende que
solo dos te afectan.

Scene 1 (0.0–0.7s): fundido cruzado desde el Frame 6. Aparece **el encuadre exacto del Frame 2** (mismo tamaño, misma posición, mismo margen, mismo rótulo de escenario de práctica), esta vez entero a plena tinta. El reconocimiento tiene que ser inmediato.
Scene 2 (0.7–2.0s): entra por la derecha la etiqueta `TU LLEGADA · 0600Z` en mono, a la altura del bloque. El bloque no se mueve ni un píxel.
Scene 3 (2.0–3.2s): la banda de acento baja por el bloque y **se detiene sobre la línea `PROB30 1604/1608 0500 FG`**, que es la ventana en la que cae esa llegada. A la vez, la línea `FM160300` gana una hairline de acento a su izquierda: lo que ya está vigente cuando llegas. Las otras cuatro líneas caen a media tinta. Es el mismo gesto, no dos acentos.
Scene 4 (3.2–5.1s): bajo la banda entra en una línea lo que eso significa: *ya vigente cubierto a 600 ft, y un 30% de probabilidad de 500 m con niebla*. Todo se detiene de golpe. Es el pago del video, y su quietud es la más larga.

## Frame 8 — Empecemos

- status: outline
- src: compositions/frames/08-empecemos.html
- duration: 5.533s
- transition_in: cut
- blueprint: logo-assemble-lockup (Adapt)
- scene: Cierre de marca con la promesa concreta del módulo.
- voiceover: Treinta lecciones, práctica y evaluación. Empecemos.
- focal: la marca Aviatory
- roles: marca = foreground subject · línea de promesa en mono = supporting · navy = background
- sfx: impacto-grave-cierre

Adapt: la marca no se construye por partes ni orbita nada. Se asienta desde el desenfoque,
que es lo único que va con el tono documental del resto. Plano calcado del Frame 8 del
video de NOTAM, con el recuento de este módulo y el acento turquesa.

Scene 1 (0.0–1.2s): corte a navy. **AVIATORY** entra resolviéndose desde desenfoque y se asienta en el centro. Framing centrado, 3 capas.
Scene 2 (1.2–2.8s): debajo entra `30 LECCIONES · PRÁCTICA · EVALUACIÓN` en mono con tracking ancho, revelado por palabra cueado a la voz.
Scene 3 (2.8–4.3s): una hairline en acento se dibuja bajo la línea, se sostiene, y el cuadro cae a negro suave. Es el único plano del video con salida propia.

## Video direction

**Tono.** Documental, no promocional. El video imita el mismo documento que el alumno va a
leer dentro del lector: papel `#FBFAF8`, tinta `#16191D`, superficie de código navy
`#14202E`, y el turquesa petróleo del módulo reservado como voltaje escaso, nunca como
relleno. Sobre papel el acento es `#0D4B52`; sobre navy, `#49939C`, que es el mismo matiz
a más luminosidad porque el otro no se ve ahí. Titulares en Archivo; todo el código en
monoespaciada.

**La regla que gobierna el montaje.** El TAF del módulo es el único objeto que persiste.
Entra en el Frame 2, se va durante las promesas y vuelve idéntico en el Frame 7. El
espectador tiene que reconocerlo: si el encuadre del 7 no calca al del 2, el video pierde
su único argumento.

**El giro es al revés que en el NOTAM, a propósito.** Aquel prometía «esto lo lees de
corrido». Un TAF no se lee de corrido: el Frame 7 deja las seis líneas en pantalla y marca
una. Si el plano acabara con las seis explicadas, el video estaría prometiendo lo
contrario de lo que enseña la lección 29.

**Movimiento.** Un solo gesto por escena. Nada de movimiento ocioso ni de elementos que
respiran: si algo se mueve, es porque está diciendo algo. Los planos 1, 4, 6 y 7 terminan
en quietud declarada; la quietud del 7 es la más larga del video a propósito, porque cae
justo después de la única frase que importa.

**Ritmo de las promesas.** Los frames 3 a 6 comparten estructura, marca de progreso
(`1/4` a `4/4`) y peso tipográfico para que se lean como una serie y no como cuatro cosas
sueltas. Entre ellos van cortes secos; los únicos fundidos cruzados del video son los que
entran y salen del pronóstico (frames 2 y 7).

**Framings usados**, para que ninguno se repita seguido: centrado (1, 6, 8) · layered-depth
macro (2) · asimétrico 60/40 (3) · cuatro columnas (4) · tira de ancho completo (5) · el
bloque del pronóstico (2, 7).

**Lo que NO va.** Degradados, sombras pesadas, emojis, tipografías redondeadas, iconos
decorativos, bokeh, gradientes violeta-azul de «IA», ni una sola foto de nubes de banco de
imágenes. Ni un solo METAR, TAF o SIGMET que no sea el del módulo.

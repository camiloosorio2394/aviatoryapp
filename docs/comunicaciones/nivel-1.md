# Comunicaciones aeronáuticas y gestión ATC (OACI) · Nivel 1: Fundamentos

Documento base del Nivel 1 (capítulos 1 a 7). Se convertirá en lecciones de la app.

**Convenciones de este documento**

- Fuentes cargadas: Doc 9432 *Manual de radiotelefonía* (4.ª ed., 2007, edición en español),
  Doc 4444 PANS-ATM (15.ª ed., Enm. 4, 2012, edición en español, parcial) y Doc 9835 (2.ª ed., 2010).
  La 15.ª edición del Doc 4444 no es la vigente; cada capítulo marca con VERIFICAR lo que hay que
  confirmar en la edición en vigor.
- Los ejemplos del Doc 9432 usan distintivos y lugares ficticios (FASTAIR 345, STEPHENVILLE,
  GEORGETOWN). Aquí se adaptan a `AVIATORY 452` y a estaciones colombianas de ejemplo
  («Bogota Ground», «Bogota Approach»). **Son ejemplos educativos**: frecuencias, puestos,
  waypoints (GIKOS y similares) y SID son ficticios. Lo real está en el AIP de cada Estado.
- La fraseología va en inglés, como la usa el piloto. Lo que no es fraseología normalizada va
  rotulado **PLAIN LANGUAGE**. Los números en las transmisiones se escriben en cifras para leerlos
  rápido; el capítulo 5 explica cómo se pronuncian.

---

## 1. INTRODUCCIÓN A LAS COMUNICACIONES AERONÁUTICAS

### ¿Qué es?

La radiotelefonía es el medio con el que pilotos y personal de tierra se comunican. Lo que se
transmite (información e instrucciones) es de importancia fundamental para la seguridad operacional
y para que el tránsito se mueva con agilidad (Doc 9432, 2.1). El mismo párrafo lo dice sin rodeos:
se han producido incidentes y accidentes en los que el uso de procedimientos y fraseología no
normalizados fue factor contribuyente.

El servicio de control de tránsito aéreo existe para prevenir colisiones entre aeronaves y, en el
área de maniobras, entre aeronaves y obstáculos, y para acelerar y mantener ordenado el movimiento
del tránsito (Doc 4444, cap. 1, definición de «Servicio de control de tránsito aéreo»). La radio es
la herramienta con la que eso ocurre.

### Lo que debe saber un piloto

**La relación piloto-ATC es de responsabilidad compartida.** El controlador emite, el piloto
colaciona (readback), el controlador escucha esa colación y corrige de inmediato cualquier
discrepancia (Doc 9432, 2.8.3.8; Doc 4444, 4.5.7.5.2). Si una de las dos partes no cumple su
paso, el sistema pierde su red de seguridad.

**El ATC no le cuida el terreno.** Entre los objetivos del control de tránsito aéreo no está
prevenir colisiones con el terreno. El piloto sigue siendo responsable de verificar que la
autorización que recibe es segura en ese aspecto (Doc 4444, 4.10.3.2, Nota 3, y Prólogo,
«Alcance y finalidad del documento», 2.1, Nota 2).

**Las cinco cualidades que busca la OACI.** La fraseología se concibió para que las comunicaciones
sean **eficientes, claras, concisas e inequívocas** (Doc 9432, Preámbulo; 3.2.2). A eso se suma:

| Cualidad | Qué significa en la cabina |
|---|---|
| Claridad | Se entiende a la primera, con ruido de fondo y por alguien cuyo primer idioma no es el suyo. |
| Brevedad | Solo lo necesario. La frecuencia es compartida. |
| Precisión | Números, pistas, niveles y puntos exactos, con sus unidades. |
| Estandarización | La misma palabra significa lo mismo para todos (Doc 9432, 2.6). |
| Disciplina de radio | Escuchar antes de hablar, no bloquear la frecuencia, colacionar lo que corresponde. |

**Una transmisión puede ser técnicamente correcta y operacionalmente deficiente.** Contener el dato
correcto no basta. Una transmisión falla si:

- **es ambigua**: el mismo sonido admite dos lecturas (un número que se confunde con una preposición);
- **es larga**: el controlador tiene que buscar el dato entre palabras de relleno, y la frecuencia
  queda ocupada;
- **está incompleta**: falta la unidad (pies o nivel de vuelo), el distintivo o la pista;
- **va muy rápida**: el Doc 9432, 2.2.1 d), pide no pasar de 100 palabras por minuto y hablar
  más lento cuando el otro tiene que anotar;
- **no es estándar**: usa palabras que el otro no espera, o expresiones coloquiales.

El Preámbulo del Doc 9432 añade un punto que un piloto latinoamericano vive todos los días: a menudo
ni quien transmite ni quien recibe habla en su primer idioma. Por eso las transmisiones deben ser
lentas y claras, y las frases directas, sin modismos, se entienden mejor que las indirectas o
coloquiales.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-01-01 · Diagrama · 16:9 · 1600×900 px
IMAGEN SUGERIDA:
Vista lateral esquemática de un vuelo de línea (despegue, ascenso, crucero, descenso, aproximación).
Sobre la trayectoria, la aeronave en tres posiciones unidas por líneas de radio punteadas a tres
dependencias en tierra: torre de control (junto a la pista de salida), dependencia de aproximación
(radar terminal) y centro de control de área (edificio con pantallas, en ruta). En cada línea, un
rótulo corto en mono mayúsculas: TOWER, APPROACH, CONTROL. Al pie, franja con las palabras CLARO ·
BREVE · PRECISO · ESTÁNDAR.
OBJETIVO:
Que el piloto vea que durante un vuelo habla con varias dependencias, cada una responsable de una
parte, y que todas usan el mismo idioma normalizado.

### Fraseología OACI

**Ejemplo 1. Colación con corrección del controlador (hearback).**

ATC: "AVIATORY 452, QNH 1003."

PILOT: "QNH 1013, AVIATORY 452."

ATC: "AVIATORY 452, NEGATIVE I SAY AGAIN, QNH 1003."

PILOT: "QNH 1003, AVIATORY 452."

Significado: el piloto colacionó mal el reglaje. El controlador escuchó la colación, detectó el
error y lo corrigió con «NEGATIVE I SAY AGAIN» seguido del valor correcto (Doc 9432, 2.8.3.9). Así
funciona la red: nadie actúa sobre un dato que no se confirmó.

**Ejemplo 2. Un número ambiguo y su forma correcta.**

ATC (forma deficiente citada por el Doc 9835, 3.3.7): "Descend two four zero zero feet."

Significado: el Doc 9835 cita este mensaje como ejemplo de malentendido. «Two» y «to» suenan igual:
el piloto entendió «descienda a cuatrocientos pies» en vez de 2 400 pies, y la aeronave se estrelló
contra el suelo. El Doc 9835 no identifica el accidente.

ATC (forma normalizada): "AVIATORY 452, DESCEND TO 2 400 FEET, QNH 1012."

PILOT: "DESCENDING TO 2 400 FEET, QNH 1012, AVIATORY 452."

Significado: las altitudes en miles y centenas enteras se dicen con THOUSAND y HUNDRED
(«two thousand four hundred»), no dígito por dígito (Doc 9432, 2.4.3), y la cifra va con su unidad
(Doc 4444, 4.5.7.5.1, Nota). La colación da al controlador la oportunidad de oír el error.

**Ejemplo 3. La palabra TAKE-OFF solo cuando corresponde.**

PILOT (forma deficiente citada por el Doc 9835, 3.3.7): "We are at take-off."

Significado: el controlador entendió que la aeronave esperaba en posición; en realidad ya había
iniciado la carrera de despegue. Con niebla, chocó con otra aeronave (Doc 9835, 3.3.7 b).

ATC: "AVIATORY 452, REPORT WHEN READY FOR DEPARTURE."

PILOT: "WILCO, AVIATORY 452."

PILOT: "AVIATORY 452, READY."

ATC: "AVIATORY 452, LINE UP AND WAIT."

PILOT: "LINING UP, AVIATORY 452."

Significado: la palabra TAKE-OFF solo se usa cuando se autoriza el despegue o cuando se anula esa
autorización; en los demás casos se dice DEPARTURE o AIRBORNE (Doc 9432, 2.8.3.3; secuencia de
4.5.3).

**Ejemplo 4. Cuando no se puede cumplir.**

ATC: "AVIATORY 452, CLEARED TO CALI FL 290, CROSS GIKOS FL 150 OR ABOVE, IF UNABLE, MAINTAIN FL 130."

PILOT: "UNABLE TO CROSS GIKOS FL 150 DUE WEIGHT, MAINTAINING FL 130, AVIATORY 452."

Significado: el controlador previó que quizá el avión no podía y dio una alternativa. El piloto
dijo UNABLE con el motivo y confirmó lo que sí hará (Doc 9432, 2.8.3.10, adaptado). Aceptar algo
que no se puede cumplir es peor que decir UNABLE.

**Ejemplo 5. Corta, clara y sin cortesías.**

PILOT (forma deficiente, PLAIN LANGUAGE): "Good morning Bogota Approach, how are you today, this is
Aviatory four five two, we are now at flight level eight zero and we are estimating GIKOS at around
four six, and we have information Delta, thank you very much."

PILOT (forma recomendada): "BOGOTA APPROACH, AVIATORY 452, FL 80, ESTIMATING GIKOS 46, INFORMATION DELTA."

ATC: "AVIATORY 452, DESCEND TO 4 000 FEET, QNH 1005, TRANSITION LEVEL 50, EXPECT ILS APPROACH RUNWAY 13R."

PILOT: "DESCENDING TO 4 000 FEET, QNH 1005, TRANSITION LEVEL 50, EXPECTING ILS APPROACH RUNWAY 13R, AVIATORY 452."

Significado: el mismo contenido en la mitad del tiempo. Debería evitarse el uso de expresiones de
cortesía (Doc 9432, 3.1.4). El contacto inicial y la respuesta siguen el modelo del Doc 9432, 7.3.1
(pista y QNH de ejemplo).

### Aplicación en aerolínea

En un vuelo de línea la tripulación cambia de frecuencia muchas veces y cada autorización toca algo
crítico: pista, nivel, rumbo, velocidad, código SSR. La radio compite con listas de chequeo, con el
manejo del automatismo y con la coordinación entre pilotos. Una transmisión corta y estándar
libera tiempo para lo demás y reduce la probabilidad de que el otro piloto, el controlador u otra
tripulación la entienda mal.

En la entrevista de aerolínea suelen evaluar exactamente esto: si usted habla como un piloto
disciplinado en la frecuencia (breve, estándar, con readback correcto) y si sabe decir UNABLE o
pedir confirmación sin dudar.

### Error frecuente

- **Creer que «se entendió» porque el controlador no dijo nada.** El silencio no es confirmación;
  la colación y el hearback sí.
- **Rellenar**: saludos, «please», «we would like to», «this is». Alargan la frecuencia y esconden
  el dato.
- **Números sin unidad** («descend four thousand» sin decir pies ni QNH, o «three five zero» sin
  decir nivel de vuelo).
- **Usar TAKE-OFF fuera de su contexto** («ready for take-off» dicho de forma que suene a
  autorización). Ver capítulo 18.
- **Hablar rápido para «no ocupar la frecuencia»**: si el otro pide repetición, se ocupó el doble.

### En pocas palabras

- La radiotelefonía es una herramienta de seguridad operacional, no un trámite.
- Claro, breve, preciso, estándar y con disciplina.
- Correcto no es suficiente: tiene que ser inequívoco para alguien que quizá no habla su idioma.
- Readback y hearback son una red compartida entre piloto y controlador.
- El ATC no lo protege del terreno: una autorización se verifica antes de ejecutarla.
- Si no puede cumplir, UNABLE y el motivo.

FUENTES
- Verificado: Doc 9432 (4.ª ed.) Preámbulo, 2.1, 2.2.1 d), 2.4.3, 2.8.3.3, 2.8.3.8, 2.8.3.9, 2.8.3.10, 3.1.4, 3.2.2, 4.5.3, 7.3.1; Doc 4444 (15.ª ed., Enm. 4) cap. 1 definición de «Servicio de control de tránsito aéreo», 4.10.3.2 Nota 3 y Prólogo 2.1 Nota 2 (colisiones con el terreno), 4.5.7.5.1 (Nota) y 4.5.7.5.2; Doc 9835 (2.ª ed.) 1.2.2, 3.3.7.
- VERIFICAR: que la Nota sobre prevención de colisiones con el terreno y el texto de colación se mantengan en la edición vigente del Doc 4444 (16.ª ed. y enmiendas), cap. 4 (4.5.7.5) (no cargada).
- VERIFICAR: si el Doc 4444 vigente mantiene «DESCEND TO (nivel)» con la palabra TO para altitudes, contra Doc 4444 vigente cap. 12 (instrucciones de nivel) (no cargado).

---

## 2. SERVICIOS Y DEPENDENCIAS ATC

### ¿Qué es?

El ATS (servicio de tránsito aéreo) es la expresión genérica que abarca información de vuelo,
alerta, asesoramiento de tránsito aéreo y control de tránsito aéreo, este último dividido en
control de área, de aproximación y de aeródromo (Doc 4444, cap. 1; Doc 9432, 1.1). Cada servicio lo
presta una dependencia, y cada dependencia tiene su distintivo de llamada en la radio.

### Lo que debe saber un piloto

**Quién presta cada servicio** (Doc 4444, 4.1 y 4.2):

- **Control de aeródromo**: la torre de control de aeródromo.
- **Control de aproximación**: una dependencia de aproximación, o la torre o el ACC cuando conviene
  combinar funciones. Puede estar en el mismo lugar que el ACC o ser un sector de él.
- **Control de área**: el centro de control de área (ACC); si no hay ACC, la dependencia de
  aproximación en espacios de extensión limitada.
- **Información de vuelo y alerta**: dentro de una FIR, un centro de información de vuelo (FIC),
  salvo que se asigne a una dependencia ATC; en espacio aéreo controlado, la dependencia ATC que
  corresponda.

**Cómo se llama cada dependencia en la radio.** Nombre del lugar más un sufijo que dice el tipo de
servicio (Doc 9432, 2.7.1.1):

| Dependencia o servicio | Sufijo en inglés | Qué hace por usted |
|---|---|---|
| Entrega de la autorización | DELIVERY | Le entrega la autorización de ruta antes de salir. |
| Control de la plataforma | APRON | Movimientos en plataforma, según el aeropuerto. |
| Control del movimiento en la superficie | GROUND | Puesta en marcha (en muchos aeropuertos), rodaje. |
| Control de aeródromo | TOWER | Pista: entrar, cruzar, despegar, aterrizar; tránsito del circuito. |
| Salidas con radar de control de aproximación | DEPARTURE | Ascenso inicial y salida del área terminal. |
| Control de aproximación | APPROACH | Llegadas y salidas en el área terminal. |
| Llegadas con radar de control de aproximación | ARRIVAL | Llegadas, donde está separado de APPROACH. |
| Centro de control de área | CONTROL | En ruta. |
| Servicio de información de vuelo | INFORMATION | Información y alerta, sin control. |
| Estación aeronáutica | RADIO | Estación aeronáutica (por ejemplo, HF en ruta). |
| Despacho de la compañía | DISPATCH | Comunicación con su operador. |
| Radar de aproximación de precisión | PRECISION | Aproximación PAR. |
| Radar (en general) | RADAR | Servicio radar genérico. |
| Estación radiogoniométrica | HOMER | Radiogoniometría. |

En la carta usted puede ver otros nombres (por ejemplo, «Center» en algunos Estados). El sufijo
OACI para el centro de control de área es CONTROL; el nombre real de cada estación sale del AIP.

**Una vez establecida la comunicación**, puede omitirse el nombre del lugar o el sufijo si no
genera confusión (Doc 9432, 2.7.1.2): «Tower» en vez de «Bogota Tower».

**Cómo se transfiere la aeronave.** Transferir el control y transferir la comunicación son cosas
relacionadas pero distintas:

- La estación le dice cuándo cambiar de frecuencia. Si no se lo dice, usted informa antes de
  cambiar (Doc 9432, 2.8.2.1).
- La transferencia puede ser inmediata o condicionada («when passing FL 80») (Doc 9432, 2.8.2.1).
- En la llegada, el control pasa de aproximación a torre según cartas de acuerdo (por ejemplo, en un
  punto o nivel prescritos), y la transferencia de comunicaciones a torre debe darse a tiempo para
  la autorización de aterrizaje y la información de tránsito esencial (Doc 4444, 4.3.2.1.1 y
  4.3.2.1.2).
- En la salida, torre transfiere a aproximación antes de salir de las proximidades del aeródromo,
  antes de entrar en IMC o en un punto o nivel prescritos (Doc 4444, 4.3.2.1.3).
- En aeródromos con tierra y torre separados, lo normal es pasar a torre al acercarse al punto de
  espera (Doc 9432, 4.5.1).
- Después de aterrizar, salvo instrucción en contrario, siga en la frecuencia de torre hasta dejar
  libre la pista (Doc 9432, 4.9).

**Tres verbos que no son iguales** (Doc 9432, 2.6 y 2.8.2.2):

- **CONTACT**: establezca comunicación con esa estación. Usted cambia y llama.
- **MONITOR**: escuche esa frecuencia. Usted cambia y **no** llama (por ejemplo, el ATIS).
- **STAND BY FOR (estación)**: quede en escucha; la dependencia lo llamará pronto.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-02-01 · Diagrama · 21:9 · 2100×900 px
IMAGEN SUGERIDA:
Línea de tiempo horizontal de un vuelo completo entre dos aeropuertos, dividida en ocho tramos de
color neutro con el acento del módulo. De izquierda a derecha: DELIVERY (aeronave en el puesto,
autorización de ruta) → GROUND (rodaje) → TOWER (pista, despegue) → DEPARTURE (ascenso inicial) →
CONTROL (en ruta, crucero) → APPROACH (descenso y aproximación) → TOWER (aterrizaje) → GROUND
(rodaje a puesto). En cada cambio de tramo, un marcador con la palabra CONTACT y una frecuencia
ficticia. Encima de todo, una franja fina con la FIR y el rótulo INFORMATION para vuelos fuera de
espacio controlado.
OBJETIVO:
Que el piloto memorice la secuencia típica de dependencias y entienda que cada cambio es una
transferencia ordenada, no un salto.

### Fraseología OACI

**Ejemplo 1. Delivery entrega la autorización de ruta.**

PILOT: "BOGOTA DELIVERY, AVIATORY 452, STAND 12, INFORMATION ALFA, REQUEST CLEARANCE TO CALI."

ATC: "AVIATORY 452, CLEARED TO CALI VIA GIKOS 1A DEPARTURE, FL 280, SQUAWK 5501."

PILOT: "CLEARED TO CALI VIA GIKOS 1A DEPARTURE, FL 280, SQUAWK 5501, AVIATORY 452."

Significado: autorización hasta Cali por la salida GIKOS 1A (ficticia), nivel de vuelo 280, código
5501. Las autorizaciones de ruta se colacionan siempre y la colación termina con el distintivo
(Doc 9432, 2.8.3.5 a), 2.8.3.6, 2.8.3.7). El contenido real de una autorización de salida cambia
según el aeropuerto.

**Ejemplo 2. Ground a torre.**

ATC: "AVIATORY 452, CONTACT TOWER 118.1."

PILOT: "118.1, AVIATORY 452."

Significado: cambie a torre en 118.1 y llame. La respuesta mínima es la frecuencia y el distintivo
(modelo del Doc 9432, 2.8.3.7 y 2.8.2.1).

**Ejemplo 3. Torre a Departure después del despegue.**

ATC: "AVIATORY 452, RUNWAY 13L, CLEARED FOR TAKE-OFF, REPORT AIRBORNE."

PILOT: "RUNWAY 13L, CLEARED FOR TAKE-OFF, WILCO, AVIATORY 452."

PILOT: "AVIATORY 452, AIRBORNE 57."

ATC: "AVIATORY 452, CONTACT DEPARTURE 121.75."

PILOT: "121.75, AVIATORY 452."

Significado: en visibilidad reducida, torre puede pedir que notifique cuando despegó. Luego lo
pasa a Departure (Doc 9432, 4.5.6).

**Ejemplo 4. Departure a Control, con condición.**

ATC: "AVIATORY 452, WHEN PASSING FL 80 CONTACT BOGOTA CONTROL 129.1."

PILOT: "WHEN PASSING FL 80, 129.1, AVIATORY 452."

Significado: no cambie todavía. Cambie cuando pase el nivel 80. La condición se colaciona
(Doc 9432, 2.8.2.1).

**Ejemplo 5. Primer contacto con Approach.**

PILOT: "BOGOTA APPROACH, AVIATORY 452, FL 80, ESTIMATING GIKOS 46, INFORMATION DELTA."

ATC: "AVIATORY 452, EXPECT ILS APPROACH RUNWAY 13R, QNH 1014."

PILOT: "RUNWAY 13R, QNH 1014, AVIATORY 452."

Significado: en el contacto inicial, aproximación normalmente informa el tipo de aproximación
prevista (Doc 9432, 7.3.1). Pista y QNH se colacionan (Doc 9432, 2.8.3.5 c).

**Ejemplo 6. Approach a torre y torre a tierra.**

ATC: "AVIATORY 452, CONTACT TOWER 118.1."

PILOT: "118.1, AVIATORY 452."

ATC (torre, después del aterrizaje): "AVIATORY 452, TAKE FIRST RIGHT, WHEN VACATED CONTACT GROUND 121.9."

PILOT: "FIRST RIGHT, WILCO, 121.9, AVIATORY 452."

Significado: la instrucción de contactar tierra aplica solo cuando haya dejado libre la pista
(Doc 9432, 4.9).

**Ejemplo 7. MONITOR y STAND BY FOR.**

ATC: "AVIATORY 452, MONITOR ATIS 127.25."

PILOT: "MONITORING 127.25, AVIATORY 452."

ATC: "AVIATORY 452, STAND BY FOR TOWER 118.1."

PILOT: "118.1, AVIATORY 452."

Significado: con MONITOR escucha sin llamar; con STAND BY FOR pasa a la frecuencia y espera a que
torre lo llame (Doc 9432, 2.8.2.2).

**Ejemplo 8. De control a información de vuelo.**

ATC: "AVIATORY 452, CONTACT BOGOTA INFORMATION 125.75."

PILOT: "125.75, AVIATORY 452."

Significado: pasa a una dependencia que da información y alerta, no control (Doc 9432, 7.2.1,
adaptado; Doc 4444, 4.2).

### Aplicación en aerolínea

En un aeropuerto grande de la región usted puede hablar con Delivery, Ground, Tower, Departure,
varios sectores de Control, Approach, Tower y Ground en un mismo vuelo. Cada cambio de frecuencia
es un punto débil: frecuencia mal seleccionada, cambio olvidado, llamada al sector equivocado. Por
eso la tripulación confirma la frecuencia en voz alta al colacionar y verifica en el panel de radio
antes de llamar.

Qué dependencias existen y cómo se llaman varía según el aeropuerto y el Estado: hay aeropuertos
sin Delivery (la autorización la da Ground o Tower) y otros donde la puesta en marcha se pide a
Apron. La lista de frecuencias y distintivos está en el AIP (en Colombia, AIP Colombia, secciones
AD 2 de cada aeródromo y GEN 3.4).

### Error frecuente

- **Confundir CONTACT con MONITOR**: llamar en la frecuencia del ATIS, o quedarse callado en una
  frecuencia donde había que llamar.
- **Cambiar de frecuencia sin que se lo digan** y sin informar (Doc 9432, 2.8.2.1).
- **Llamar a la estación equivocada** por costumbre («Bogota Approach» cuando ya lo pasaron a
  Departure).
- **Irse de la frecuencia de torre antes de dejar libre la pista.**
- **Colacionar la frecuencia sin mirarla**: se dice «118.1» y se selecciona 118.7.

### En pocas palabras

- ATS agrupa información de vuelo, alerta, asesoramiento y control (área, aproximación, aeródromo).
- El distintivo de una estación es lugar más sufijo: DELIVERY, GROUND, TOWER, DEPARTURE, APPROACH,
  CONTROL, INFORMATION.
- CONTACT: cambie y llame. MONITOR: cambie y escuche. STAND BY FOR: cambie y espere.
- Nadie cambia de frecuencia por su cuenta sin informar.
- Después del aterrizaje, en torre hasta dejar la pista libre.
- Nombres y frecuencias reales: AIP del Estado.

FUENTES
- Verificado: Doc 9432 (4.ª ed.) 1.1, 2.7.1.1, 2.7.1.2, 2.8.2.1, 2.8.2.2, 2.8.3.5 a 2.8.3.7, 4.5.1, 4.5.6, 4.9, 7.2.1, 7.3.1; Doc 4444 (15.ª ed., Enm. 4) cap. 1 definiciones de ATS y de cada dependencia, 4.1, 4.2, 4.3.2.1.1 a 4.3.2.1.3.
- VERIFICAR: la forma de solicitar la autorización a Delivery («REQUEST CLEARANCE TO…») contra Doc 4444 vigente cap. 12 y el AIP del aeródromo (AD 2.18 / AD 2.22) (no cargados); algunos aeropuertos piden datos adicionales o usan DCL.
- VERIFICAR: la frase «TAKE FIRST RIGHT, WHEN VACATED CONTACT GROUND» usa el orden del ejemplo del Doc 9432 4.9; confirmar el orden vigente contra Doc 4444 vigente cap. 12 (no cargado).
- VERIFICAR: pronunciación de pistas paralelas («RUNWAY 13L» como «runway one three left») contra Doc 4444 vigente cap. 12 y Anexo 10 Vol. II cap. 5 (no cargados); en este nivel las pistas con L/R son de ejemplo.
- VERIFICAR: estructura de dependencias y frecuencias reales de Colombia contra AIP Colombia GEN 3.4 y AD 2 (no cargado).

---

## 3. PRINCIPIOS DE RADIOTELEFONÍA

### ¿Qué es?

Son las técnicas de transmisión y los hábitos que hacen que un mensaje llegue completo y se entienda
a la primera. El Doc 9432, 2.2, las enumera como «técnicas de transmisión».

### Lo que debe saber un piloto

**Antes de transmitir** (Doc 9432, 2.2.1):

- **Escuche antes de hablar.** Haga escucha en la frecuencia para no pisar otra transmisión.
- **Piense antes de oprimir el PTT.** Tenga armado el mensaje (a quién, quién es, qué quiere) antes de
  hablar. Evite «humm», «este…» (2.2.1 g).
- **Oprima a fondo el PTT antes de empezar a hablar** y no lo suelte hasta terminar (2.2.1 j). Si
  habla antes o suelta antes, se corta la primera o la última palabra, que suele ser el distintivo.

**Mientras transmite** (Doc 9432, 2.2.1):

- Tono normal de conversación, claro e inteligible (c).
- **Velocidad constante, no más de 100 palabras por minuto**; más lento si el otro tiene que anotar (d).
- Volumen constante (e).
- **Una ligera pausa antes y después de los números** los hace más fáciles de entender (f).
- Micrófono a distancia constante; si tiene que girar la cabeza, deje de hablar (h, i).
- En mensajes largos, pause de vez en cuando para que el otro pueda pedir lo que no recibió (k).

**Micrófono trabado** (Doc 9432, 2.2.2): un PTT que se queda oprimido bloquea la frecuencia para
todos. Después de cada transmisión, verifique que quedó libre y que el micrófono no está donde
pueda activarse solo.

**Brevedad y palabras innecesarias.**

- Evite expresiones de cortesía (Doc 9432, 3.1.4).
- Puede omitir, si no causa confusión: «SURFACE» en el viento de superficie, «DEGREES» en rumbos
  radar, «VISIBILITY», «CLOUD» y «HEIGHT» en informes meteorológicos, «HECTOPASCALS» en reglajes de
  presión (Doc 9432, 3.1.3).
- **IMMEDIATELY** solo cuando la seguridad exige una acción inmediata (Doc 9432, 3.1.5). Si lo oye,
  es en serio.
- El lenguaje claro, cuando no hay fraseología, **no es permiso para charlar ni bromear** (Doc 9432, 3.2.4).

**Escucha activa y confirmar lo dudoso.**

- Si hay duda de que un mensaje se recibió bien, se pide repetición total o parcial (Doc 9432, 2.8.1.4).
- Si comete un error, dígalo con CORRECTION, repita el último grupo correcto y dé la versión corregida
  (Doc 9432, 2.8.1.6).
- Si espera mala recepción, repita los elementos importantes con I SAY AGAIN (Doc 9432, 2.8.1.8).
- STANDBY significa «espere y le llamaré»; **no es aprobación ni denegación** (Doc 9432, 2.6).

**Escala de inteligibilidad** (Doc 9432, 2.8.4.3): 1 ininteligible · 2 inteligible por momentos ·
3 inteligible pero con dificultad · 4 inteligible · 5 perfectamente inteligible.

**AVIATE, NAVIGATE, COMMUNICATE.** Es un principio de instrucción muy difundido en la formación de
pilotos (no aparece en los documentos OACI cargados): primero controlar la aeronave, luego saber
dónde está y hacia dónde va, luego comunicar. La comunicación es fundamental, pero **no desplaza el
control de la aeronave**. Los propios documentos OACI reconocen la carga de trabajo: los
controladores deberían evitar transmitir durante el despegue, el ascenso inicial, la última etapa de
la aproximación final o el recorrido de aterrizaje, salvo por seguridad (Doc 9432, 4.1.2), y no
deben dar autorizaciones a un piloto que está alineándose o despegando (Doc 9432, 2.8.3.2). Del
lado del piloto, un «STANDBY» a tiempo es mejor que una colación hecha a medias mientras se pilota.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-03-01 · Esquema · 4:5 · 1080×1350 px
IMAGEN SUGERIDA:
Pirámide de tres niveles, de abajo hacia arriba: AVIATE (base ancha, «controle la aeronave»),
NAVIGATE («sepa dónde está y hacia dónde va»), COMMUNICATE (vértice, «informe y coordine»). A la
derecha de la pirámide, una columna de cuatro íconos con rótulo corto: ESCUCHE ANTES, PIENSE ANTES DEL
PTT, PTT A FONDO, SUELTE Y VERIFIQUE. Colores del módulo, sin rojo ni ámbar.
OBJETIVO:
Que el piloto fije el orden de prioridades y los cuatro hábitos de transmisión que evitan cortes y
bloqueos.

### Fraseología OACI

**Ejemplo 1. Pedir repetición de una parte.**

ATC: "AVIATORY 452, DESCEND TO FL 240, [ininteligible] GIKOS."

PILOT: "AVIATORY 452, SAY AGAIN ALL AFTER FL 240."

ATC: "AVIATORY 452, DESCEND TO FL 240, BE LEVEL BY GIKOS."

Significado: el piloto recibió bien hasta FL 240 y pide solo lo que siguió (Doc 9432, 2.8.1.4:
SAY AGAIN, SAY AGAIN (item), SAY AGAIN ALL BEFORE, SAY AGAIN ALL AFTER, SAY AGAIN ALL BETWEEN …
AND …).

**Ejemplo 2. Corrección durante la propia transmisión.**

PILOT: "AVIATORY 452, GIKOS 47, FL 330, RUTAM 07 CORRECTION RUTAM 57."

ATC: "AVIATORY 452, ROGER."

Significado: el piloto dijo mal el estimado del siguiente punto (RUTAM, ficticio), dijo CORRECTION,
repitió el último grupo correcto y dio el valor bueno (Doc 9432, 2.8.1.6).

**Ejemplo 3. Verificación de radio.**

PILOT: "BOGOTA TOWER, AVIATORY 452, RADIO CHECK 118.1."

ATC: "AVIATORY 452, TOWER, READING YOU FIVE."

o bien:

ATC: "AVIATORY 452, TOWER, READING YOU THREE, LOUD BACKGROUND WHISTLE."

Significado: una prueba de radio dice a quién llama, quién es, «RADIO CHECK» y la frecuencia
(Doc 9432, 2.8.4.1). La respuesta usa la escala 1 a 5 (2.8.4.3).

**Ejemplo 4. STANDBY cuando está volando la aeronave.**

ATC: "AVIATORY 452, REPORT HEADING."

PILOT: "AVIATORY 452, STANDBY."

PILOT (segundos después, ya estabilizado): "AVIATORY 452, HEADING 050."

ATC: "AVIATORY 452, ROGER, CONTINUE HEADING 050."

Significado: STANDBY significa «espere y le llamaré»; no aprueba ni niega nada (Doc 9432, 2.6).
Se usa cuando la cabina está ocupada volando; hay que volver a llamar (secuencia de reporte de
rumbo del Doc 9432, 6.3.2, adaptada).

**Ejemplo 5. Repetir lo importante con mala recepción.**

PILOT: "BOGOTA APPROACH, AVIATORY 452, GIKOS 2 500 FEET, I SAY AGAIN 2 500 FEET, ENGINE LOSING POWER, ENGINE LOSING POWER."

Significado: el piloto prevé mala recepción y repite los elementos críticos (Doc 9432, 2.8.1.8,
adaptado). Lo que corresponde a una situación de urgencia o socorro se ve en el Nivel 5.

**Ejemplo 6. La estación no sabe quién llamó.**

PILOT: "BOGOTA GROUND, 452." (llamada recortada)

ATC: "STATION CALLING BOGOTA GROUND, SAY AGAIN YOUR CALL SIGN."

PILOT: "BOGOTA GROUND, AVIATORY 452."

Significado: si la estación no tiene certeza de quién llamó, pide el distintivo hasta establecerlo
(Doc 9432, 2.8.1.5). El error de origen fue omitir el designador telefónico.

### Aplicación en aerolínea

En un vuelo de línea normalmente un piloto se ocupa de la trayectoria y el otro de gran parte de
las comunicaciones, según los SOP del operador (se desarrolla en el capítulo 59). Aun así, ambos
escuchan. Cuando una llamada llega en un momento crítico (rotación, falla en el despegue, flare), lo
profesional es volar primero y responder después. La frecuencia puede esperar unos segundos; la
aeronave no.

En frecuencias congestionadas (áreas terminales grandes) la disciplina de escuchar antes de
transmitir evita las transmisiones bloqueadas, que se ven en el capítulo 57.

### Error frecuente

- **Transmitir sin escuchar** y pisar la colación de otra aeronave o la instrucción del controlador.
- **Hablar antes de oprimir del todo el PTT** o soltarlo antes de terminar: se pierde el distintivo.
- **Pensar en voz alta en la frecuencia** («eh… Bogota… eh… Aviatory…»).
- **Tomar STANDBY como aprobación** y seguir con lo que se había pedido.
- **Responder a una llamada mientras se pierde el control de la trayectoria.**
- **No pedir repetición por vergüenza** y completar el mensaje con lo que «debió haber dicho».

### En pocas palabras

- Escuche, piense, oprima a fondo, hable, suelte y verifique.
- Menos de 100 palabras por minuto, pausa antes y después de los números.
- Sin cortesías, sin relleno, sin «humm».
- Si duda: SAY AGAIN (todo o la parte que falta). Si se equivoca: CORRECTION.
- STANDBY no es aprobación.
- Primero volar, luego navegar, luego comunicar.

FUENTES
- Verificado: Doc 9432 (4.ª ed.) 2.2.1 a) a k), 2.2.2, 2.6 (STANDBY), 2.8.1.4 a 2.8.1.8, 2.8.3.2, 2.8.4.1 a 2.8.4.3, 3.1.3, 3.1.4, 3.1.5, 3.2.4, 4.1.2, 6.3.2 (REPORT HEADING / HEADING 050 / ROGER CONTINUE HEADING 050).
- VERIFICAR: «AVIATE, NAVIGATE, COMMUNICATE» no está en los documentos cargados; citar su fuente en el manual de operaciones o FCTM del operador, o en material de instrucción de la autoridad (no cargado). No presentarlo como norma OACI.
- VERIFICAR: que el piloto responda «STANDBY» a una solicitud del ATC como uso aceptado, contra Anexo 10 Vol. II cap. 5 (no cargado); el Doc 9432 2.6 define la palabra sin limitar quién la usa.

---

## 4. ALFABETO FONÉTICO OACI

### ¿Qué es?

Es el conjunto de 26 palabras con las que se deletrea por radio, una por letra, para que una letra
no se confunda con otra de sonido parecido (B, D, E, G, P, T, V suenan casi igual en una radio con
ruido).

### Lo que debe saber un piloto

**Cuándo se usa:**

- **Cada letra del distintivo de llamada** de la aeronave se dice por separado con el alfabeto,
  **excepto el designador telefónico y el tipo de aeronave** (Doc 9432, 2.3.2). Es decir: «AVIATORY»
  se dice como palabra; la matrícula G-ABCD se dice «Golf Alfa Bravo Charlie Delta».
- **Cuando hay riesgo de que el mensaje no se reciba bien.** Para agilizar las comunicaciones no hay
  que deletrear palabras salvo ese riesgo (Doc 9432, 2.3.1). Ejemplos: un nombre de punto de
  notificación poco conocido, el nombre de un pasajero o de un hotel en plain language.
- Designadores de calles de rodaje, letras de ATIS, rutas y puntos: «taxiway Charlie», «information
  Bravo», «route Echo» (Doc 9432, 4.4.2, 4.4.3, 2.8.3.6).

**Cuándo no:**

- **Abreviaturas que se dicen letra por letra, sin alfabeto**: ILS, QNH, RVR, VOR, ATC (Doc 9432,
  1.2, nota; 3.1.2). No se dice «India Lima Sierra».
- **Abreviaturas que se dicen como palabra** (marcadas con asterisco en el Doc 9432, 1.2): ATIS,
  NOTAM, SID, STAR, SIGMET, CAVOK, VOLMET, SELCAL, TAF, PAPI, RNAV, entre otras.

**La tabla (Doc 9432, 2.3.3, edición en español).** La columna «Pronunciación» es la que publica la
edición en español: está escrita para que un hispanohablante la lea en voz alta. En el original, la
sílaba que lleva el énfasis va **subrayada**; ese subrayado **se perdió en el texto extraído** que se
usó aquí, así que la tabla no marca el énfasis. Hay que tomarlo del PDF original.

| Letra | Palabra (como la escribe la edición en español) | Pronunciación (Doc 9432, 2.3.3) |
|---|---|---|
| A | Alfa | AL FA |
| B | Bravo | BRA VO |
| C | Charlie | CHAR LI o SHAR LI |
| D | Delta | DEL TA |
| E | Echo | E CO |
| F | Foxtrot | FOX TROT |
| G | Golf | GOLF |
| H | Hotel | O TEL |
| I | India | IN DI A |
| J | Julieta | TSHU LI ET |
| K | Kilo | KI LO |
| L | Lima | LI MA |
| M | Mike | MÁIK |
| N | November | NO VEM BER |
| O | Oscar | OS CAR |
| P | Papá | PA PA |
| Q | Québec | QUE BEC |
| R | Romeo | RO ME O |
| S | Sierra | SI E RRA |
| T | Tango | TAN GO |
| U | Uniform | IU NI FORM o U NI FORM |
| V | Víctor | VIC TOR |
| W | Whiskey | UIS QUI |
| X | X-ray | EX REY |
| Y | Yankee | IAN QUI |
| Z | Zulu | TSU LU |

Tres detalles que la tabla deja ver y que un hispanohablante suele pasar por alto:

- **H es «O TEL»**: la H no suena.
- **J es «TSHU LI ET»**: no «Julieta» a la española con jota.
- **Z es «TSU LU»** y **W es «UIS QUI»**.

La edición en español escribe algunas palabras con grafía española (Julieta, Papá, Québec, Víctor).
La grafía de la palabra en la edición inglesa y en el Anexo 10 es la que se usa en inglés; va en la
línea VERIFICAR.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-04-01 · Esquema · 3:4 · 1200×1600 px
IMAGEN SUGERIDA:
Tabla limpia de 26 filas en dos columnas de 13 (A a M, N a Z), fondo papel del lector. Cada celda:
letra grande en Archivo, palabra en inglés debajo y pronunciación en mono pequeña, con la sílaba de
énfasis resaltada en el acento del módulo (tomada del PDF original del Doc 9432, no de este texto).
Sin ilustraciones decorativas.
OBJETIVO:
Que el piloto tenga una referencia de consulta rápida y vea de un vistazo qué sílaba se acentúa.

### Fraseología OACI

**Ejemplo 1. Matrícula completa en el primer contacto.**

PILOT: "BOGOTA TOWER, GOLF ALFA BRAVO CHARLIE DELTA." (G-ABCD)

ATC: "GOLF ALFA BRAVO CHARLIE DELTA, BOGOTA TOWER."

Significado: primer contacto con distintivos completos, la estación llamada primero (Doc 9432,
2.8.1.1). Cada letra de la matrícula va con el alfabeto (2.3.2).

**Ejemplo 2. Designador telefónico más letras.**

PILOT: "BOGOTA GROUND, AVIATORY DELTA CHARLIE ALFA BRAVO." (AVIATORY DCAB)

Significado: distintivo tipo b): designador telefónico seguido de los cuatro últimos caracteres de la
matrícula (Doc 9432, 2.7.2.1 b). «AVIATORY» no se deletrea; las letras sí.

**Ejemplo 3. Calle de rodaje e información ATIS.**

PILOT: "BOGOTA GROUND, AVIATORY 452 HEAVY, REQUEST TAXI, INFORMATION CHARLIE."

ATC: "AVIATORY 452, TAXI TO HOLDING POINT RUNWAY 13L VIA TAXIWAY ALFA, QNH 1019."

PILOT: "HOLDING POINT RUNWAY 13L VIA ALFA, QNH 1019, AVIATORY 452."

Significado: la letra del ATIS y de la calle de rodaje van con el alfabeto (modelo del Doc 9432,
4.4.3 y 4.4.2).

**Ejemplo 4. Deletrear un punto poco conocido.**

ATC: "AVIATORY 452, CLEARED DIRECT GIKOS."

PILOT: "AVIATORY 452, SAY AGAIN WAYPOINT, SPELL IT."

ATC: "GIKOS, I SAY AGAIN, GOLF INDIA KILO OSCAR SIERRA."

PILOT: "DIRECT GIKOS, AVIATORY 452."

Significado: el piloto no está seguro del nombre y pide que se lo deletreen. **PLAIN LANGUAGE**: «SAY
AGAIN» e «I SAY AGAIN» son normalizadas (Doc 9432, 2.6); «spell it» no está en la lista normalizada
cargada y es lenguaje claro. El deletreo se justifica por riesgo de mala recepción (2.3.1).

### Aplicación en aerolínea

En la línea usted deletrea poco pero escucha mucho: letras de ATIS, calles de rodaje, puntos de
espera, nombres de puntos y de SID/STAR, matrículas en frecuencias con aviación general. Lo que más
cuesta en la práctica es la **velocidad de reconocimiento**: oír «Sierra Papa Tango» y ver SPT sin
traducir mentalmente. Eso se entrena.

Al introducir un punto en el FMS a partir de lo que dijo el controlador, el deletreo evita cargar un
punto con nombre parecido.

### Error frecuente

- **Inventar palabras** («Beta», «Pedro», «Dog») o usar la de otro alfabeto.
- **Pronunciar a la española**: «Hotel» con H aspirada, «Julieta» con jota, «Whiskey» como «güisqui».
- **Deletrear lo que se dice como palabra o letra**: «India Lima Sierra» por ILS, «November Oscar
  Tango…» por NOTAM.
- **Deletrear el designador telefónico** («Alfa Victor India…» en vez de «AVIATORY»).
- **Confundir letras al oído** cuando no se usa el alfabeto: B/D/E/G/P/T/V, M/N.

### En pocas palabras

- 26 palabras, una por letra, pronunciación de la tabla del Doc 9432 2.3.3.
- Siempre para las letras del distintivo (menos el designador telefónico y el tipo de aeronave).
- Para el resto, solo si hay riesgo de que no se entienda.
- ILS, QNH, RVR: letras sueltas. ATIS, NOTAM, SID, STAR: palabra.
- H muda, J con «tsh», W como «uis».

### Ejercicios

**A. Diga en voz alta.**

1. Matrícula G-ABCD.
2. Matrícula ficticia HK-5241 (los dígitos se dicen como números; ver capítulo 5).
3. Waypoint GIKOS.
4. Waypoint ficticio RUTAM.
5. Distintivo AVIATORY DCAB.
6. «Information Q» (letra del ATIS).
7. Calle de rodaje «B2».
8. Matrícula ficticia XA-UJK.

**B. Escriba lo que oyó.**

9. «Papa Uniform Mike Alfa Sierra».
10. «Kilo Oscar Lima Oscar X-ray».
11. «Whiskey Yankee Zulu».
12. «Juliett Echo Tango».

**C. ¿Alfabeto, letras sueltas o palabra?**

13. ILS · 14. NOTAM · 15. QNH · 16. SID · 17. VOR · 18. ATIS

**Soluciones**

1. Golf Alfa Bravo Charlie Delta.
2. Hotel Kilo, five two four one (con la pronunciación de números del Doc 9432 2.4.1).
3. Golf India Kilo Oscar Sierra.
4. Romeo Uniform Tango Alfa Mike.
5. AVIATORY Delta Charlie Alfa Bravo (el designador se dice como palabra).
6. «Information Quebec».
7. «Taxiway Bravo two».
8. X-ray Alfa Uniform Juliett Kilo.
9. PUMAS.
10. KOLOX.
11. WYZ.
12. JET.
13. Letras sueltas: I-L-S (sin alfabeto).
14. Palabra: «NOTAM».
15. Letras sueltas: Q-N-H.
16. Palabra: «SID».
17. Letras sueltas: V-O-R.
18. Palabra: «ATIS».

(Casos 13 a 18: Doc 9432, 1.2, nota, y 3.1.2.)

FUENTES
- Verificado: Doc 9432 (4.ª ed.) 1.2 (nota y asteriscos), 2.3.1, 2.3.2, 2.3.3, 2.7.2.1 b), 2.8.1.1, 3.1.2, 4.4.2, 4.4.3, 2.6 (SAY AGAIN, I SAY AGAIN).
- VERIFICAR: la sílaba de énfasis de cada palabra (subrayada en el original; perdida en la extracción) contra el PDF del Doc 9432 (4.ª ed.) 2.3.3.
- VERIFICAR: la grafía inglesa de las palabras que la edición en español escribe a la española (Alfa, Juliett, Papa, Quebec, Victor, Whiskey, X-ray) contra Anexo 10 Vol. II cap. 5 (alfabeto de deletreo) y Doc 9432 edición inglesa 2.3.3 (no cargados). En este documento se usa «Juliett» en los ejercicios en inglés a la espera de esa verificación.
- VERIFICAR: formato real de matrículas colombianas (HK-) y mexicanas (XA-) contra la autoridad de cada Estado; en los ejercicios son ficticias.

---

## 5. NÚMEROS

### ¿Qué es?

Es la forma normalizada de pronunciar y agrupar números en radiotelefonía: niveles, rumbos, pistas,
frecuencias, códigos SSR, viento, QNH, hora, altitudes. Casi todo lo que se colaciona tiene un número.

### Lo que debe saber un piloto

**La pronunciación (Doc 9432, 2.4.1, edición en español).** Cuando se usa inglés, los números se
pronuncian así. Se acentúan las sílabas en MAYÚSCULAS: en SI-RO las dos por igual; en FO-ar, más la
primera.

| Número | Pronunciación (Doc 9432, 2.4.1) |
|---|---|
| 0 | SI-RO |
| 1 | UAN |
| 2 | TU |
| 3 | TRI |
| 4 | FO-ar |
| 5 | FA-IF |
| 6 | SIKS |
| 7 | SEV'N |
| 8 | EIT |
| 9 | NAI-na |
| Decimal | DE-si-mal |
| Cien | JAN-dred |
| Mil | ZAU-SAND |

**Lo que muestra la transcripción, sin inventar reglas:**

- **3 es TRI**: sin el sonido «th».
- **5 es FA-IF**: termina en «f», no en «v».
- **9 es NAI-na**: dos sílabas, con una vocal al final.
- **4 es FO-ar**: dos sílabas, énfasis en la primera.

El Doc 9432 cargado no explica el porqué de cada forma; solo da la tabla.

Esas tres formas corresponden a lo que en la edición inglesa se escribe con grafías especiales
(TREE, FIFE, NINER). La edición en español cargada no trae esas grafías; se confirman en la línea
VERIFICAR. Ningún documento cargado dice que se deban usar solo en ciertas fases, ni que sean
opcionales: la tabla se aplica «cuando se use el idioma inglés». En la práctica se oyen pilotos y
controladores que dicen «three», «five», «nine»; su tarea es entenderlos y, al hablar usted, seguir
la tabla.

**Regla general: dígito por dígito** (Doc 9432, 2.4.2). Todos los números se dicen separando cada
dígito, salvo la excepción siguiente. El Doc 9432 da estos ejemplos:

| Qué | Escrito | Se transmite |
|---|---|---|
| Distintivo | CCA 238 | AIR CHINA two three eight |
| Nivel de vuelo | FL 180 / FL 200 | flight level one eight zero / flight level two zero zero |
| Rumbo | 100° / 080° | heading one zero zero / heading zero eight zero |
| Viento | 200° 25 kt | wind two zero zero degrees two five knots |
| Viento con ráfagas | 160° 18 kt ráf. 30 | wind one six zero degrees one eight knots, gusting three zero knots |
| Código SSR | 2400 / 4203 | squawk two four zero zero / squawk four two zero three |
| Pista | 27 / 30 | runway two seven / runway three zero |
| QNH | 1010 / 1000 | QNH one zero one zero / QNH one zero zero zero |

(Las palabras en inglés de la tercera columna son la traducción de los ejemplos en español del
Doc 9432 2.4.2; la palabra «gusting» va en VERIFICAR.)

**Excepción: centenas y millares enteros** (Doc 9432, 2.4.3). En **altitud, altura de nubes,
visibilidad y RVR**, si el número está hecho de centenas o millares enteros, se dicen los dígitos
seguidos de HUNDRED o THOUSAND. Si combina millares y centenas enteros, primero los millares con
THOUSAND y luego la centena con HUNDRED.

| Qué | Escrito | Se transmite |
|---|---|---|
| Altitud | 800 ft | eight hundred |
| Altitud | 3 400 ft | three thousand four hundred |
| Altitud | 12 000 ft | one two thousand |
| Altura de nubes | 2 200 ft | two thousand two hundred |
| Visibilidad | 1 000 / 700 | visibility one thousand / visibility seven hundred |
| RVR | 600 / 1 700 | RVR six hundred / RVR one thousand seven hundred |

Fíjese en **12 000: «one two thousand»**, no «twelve thousand».

**Niveles de vuelo y altitudes no se mezclan.** Si la posición vertical se refiere a 1013,2 hPa, las
cifras van precedidas de FLIGHT LEVEL; si se refiere a QNH o QFE, van seguidas de FEET o METRES
(Doc 4444, 4.5.7.5.1, Nota).

**Frecuencias** (Doc 9432, 2.4.4 y 2.4.5):

- Se dicen dígito por dígito, con DECIMAL en la coma.
- **Seis dígitos** donde hay canales de 8,33 kHz, **excepto** si el quinto y el sexto son ambos cero:
  entonces solo cuatro. 118.000 → «one one eight decimal zero»; 118.005 → «one one eight decimal
  zero zero five»; 118.025 → «one one eight decimal zero two five»; 118.100 → «one one eight decimal one».
- **Cinco dígitos** donde todos los canales están separados 25 kHz o más y la autoridad no exige
  seis, con la misma excepción: 118.025 → «one one eight decimal zero two»; 118.075 → «one one
  eight decimal zero seven»; 118.050 → «one one eight decimal zero five».
- Precaución: con radios de 25 kHz solo se pueden seleccionar cinco dígitos; con radios de
  8,33 kHz, al recibir cinco dígitos, el quinto y sexto seleccionados deben ser los del canal de
  25 kHz (notas de 2.4.4 y 2.4.5).

**Hora** (Doc 9432, 2.5.1). Normalmente bastan los minutos, dígito por dígito; si hay riesgo de
confusión, se incluye la hora. 0920 → «two zero» o «zero nine two zero»; 1643 → «four three» o «one
six four three». La dependencia ATS da la verificación de hora redondeada al medio minuto más
próximo (2.5.2).

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-05-01 · Esquema · 9:16 · 1080×1920 px
IMAGEN SUGERIDA:
Tarjeta vertical en dos bloques. Arriba: los diez dígitos 0 a 9 grandes, cada uno con su
transcripción del Doc 9432 2.4.1 debajo (SI-RO, UAN, TU, TRI, FO-ar, FA-IF, SIKS, SEV'N, EIT,
NAI-na), resaltando 3, 5 y 9 con un borde del acento del módulo. Abajo: dos columnas «DÍGITO POR
DÍGITO» (FL, rumbo, pista, SSR, QNH, frecuencia) y «HUNDRED / THOUSAND» (altitud, nubes,
visibilidad, RVR), cada una con un ejemplo.
OBJETIVO:
Que el piloto sepa de un vistazo cómo suena cada dígito y cuándo se agrupa en centenas y millares.

### Fraseología OACI

**Ejemplo 1. Nivel de vuelo.**

ATC: "AVIATORY 452, CLIMB TO FL 350."

PILOT: "CLIMBING TO FL 350, AVIATORY 452."

Se dice: «flight level three five zero» (TRI FA-IF SI-RO).

**Ejemplo 2. Altitud con QNH.**

ATC: "AVIATORY 452, DESCEND TO 4 000 FEET, QNH 1005."

PILOT: "DESCENDING TO 4 000 FEET, QNH 1005, AVIATORY 452."

Se dice: «four thousand feet, QNH one zero zero five». Altitud en millares enteros (2.4.3); QNH
dígito por dígito (2.4.2). Modelo del Doc 9432, 7.3.1.

**Ejemplo 3. Rumbo.**

ATC: "AVIATORY 452, TURN LEFT HEADING 050."

PILOT: "LEFT HEADING 050, AVIATORY 452."

Se dice: «heading zero five zero» (SI-RO FA-IF SI-RO). Modelo del Doc 9432, 6.3.1.

**Ejemplo 4. Código SSR.**

ATC: "AVIATORY 452, SQUAWK 6402."

PILOT: "6402, AVIATORY 452."

Se dice: «six four zero two». Modelo del Doc 9432, 2.8.3.7. Los códigos SSR se colacionan siempre
(2.8.3.5 c).

**Ejemplo 5. Frecuencia de 8,33 kHz.**

ATC: "AVIATORY 452, CONTACT BOGOTA CONTROL 128.905."

PILOT: "128.905, AVIATORY 452."

Se dice: «one two eight decimal nine zero five» (seis dígitos: el quinto y el sexto no son ambos
cero). Frecuencia ficticia.

**Ejemplo 6. Frecuencia con cinco dígitos (espacio de 25 kHz).**

ATC: "AVIATORY 452, CONTACT DEPARTURE 121.75."

PILOT: "121.75, AVIATORY 452."

Se dice: «one two one decimal seven five». El canal es 121.750; en espacio de 25 kHz se dicen cinco
dígitos (2.4.5).

**Ejemplo 7. Pista, viento y QNH en el rodaje.**

ATC: "AVIATORY 452, RUNWAY 06, WIND 080 DEGREES 10 KNOTS, QNH 1012, TAXI TO HOLDING POINT RUNWAY 06 VIA TAXIWAY ALFA."

PILOT: "RUNWAY 06, QNH 1012, HOLDING POINT RUNWAY 06 VIA ALFA, AVIATORY 452."

Se dice: «runway zero six, wind zero eight zero degrees one zero knots, QNH one zero one two».
Modelo del Doc 9432, 4.4.2. El piloto colaciona pista y QNH (2.8.3.5 c); el viento no está en la
lista de lo que siempre se colaciona.

**Ejemplo 8. Hora.**

PILOT: "AVIATORY 452, REQUEST TIME CHECK."

ATC: "AVIATORY 452, TIME 0611."

Se dice: «time zero six one one» (o «one one» si no hay riesgo de confusión). Doc 9432, 2.5.2.

**Ejemplo 9. Visibilidad y RVR.**

ATC: "AVIATORY 452, RVR 600 METRES."

Se dice: «RVR six hundred metres» (2.4.3). Si el valor no es de centenas enteras, se aplica la regla
general dígito por dígito: RVR 550 → «five five zero» (2.4.2; el Doc 9432 4.2.1 trae el ejemplo
«RVR 550 METRES» escrito en cifras).

**Ejemplo 10. Ascenso con condición y velocidad vertical.**

ATC: "AVIATORY 452, CLIMB TO FL 240, EXPEDITE UNTIL PASSING FL 180."

PILOT: "CLIMBING TO FL 240, EXPEDITING UNTIL PASSING FL 180, AVIATORY 452."

Se dice: «flight level two four zero … flight level one eight zero». Dos niveles en la misma
instrucción: el riesgo es poner el segundo en el selector de altitud. Doc 9432, 3.3.3.3.

### Aplicación en aerolínea

Los números son el corazón de la colación: nivel, rumbo, velocidad, pista, QNH, código SSR y
frecuencia. En la cabina, el piloto que colaciona habla el número y el otro lo verifica contra lo que
quedó seleccionado (selector de altitud, rumbo, radio, transponder). Un número bien dicho y mal
seleccionado sigue siendo un error.

Tres trampas típicas en la región:

- **QNH 1013 frente a 1003** (Doc 9432, 2.8.3.9 usa ese mismo ejemplo).
- **FL 100 y 10 000 pies** cerca del nivel de transición: uno va con FLIGHT LEVEL y dígitos, el otro
  con THOUSAND y FEET.
- **Frecuencias de cinco y seis dígitos** entre espacios con y sin canales de 8,33 kHz.

### Error frecuente

- **Decir los números en español** o mezclar idiomas en la misma transmisión.
- **«Twelve thousand», «one hundred eighty»**: agrupar donde la regla pide dígitos (niveles, rumbos,
  QNH) o decir mal los millares («one two thousand»).
- **Omitir FLIGHT LEVEL o FEET**: «descend one zero zero» no dice si es nivel o altitud.
- **No hacer pausa antes y después del número** (Doc 9432, 2.2.1 f).
- **Colacionar la frecuencia sin el sexto dígito** en espacio de 8,33 kHz.
- **Confundir «to» y «two»** en instrucciones de nivel (Doc 9835, 3.3.7 a).

### En pocas palabras

- Pronunciación del Doc 9432 2.4.1: TRI, FA-IF, NAI-na, FO-ar, SI-RO.
- Regla general: dígito por dígito (FL, rumbo, pista, SSR, QNH, viento, frecuencia, hora).
- Excepción: HUNDRED y THOUSAND solo en altitud, nubes, visibilidad y RVR con centenas o millares enteros.
- FLIGHT LEVEL antes de la cifra; FEET o METRES después.
- Frecuencias: seis dígitos en 8,33 kHz, cinco en 25 kHz, cuatro si terminan en dos ceros.
- La hora: minutos; hora completa si hay riesgo de confusión.

### Ejercicios

**A. ¿Cómo se transmite?** (en inglés, con las palabras de la regla)

1. FL 350.
2. FL 100.
3. 10 000 ft.
4. 5 500 ft.
5. 11 000 ft.
6. Rumbo 095.
7. Pista 13.
8. Código SSR 4271.
9. QNH 1003.
10. Viento 240° 15 kt con ráfagas de 28 kt.
11. Frecuencia 118.075 en espacio con canales de 8,33 kHz.
12. La misma frecuencia en espacio de 25 kHz.
13. Frecuencia 125.750 en espacio con canales de 8,33 kHz.
14. Frecuencia 119.000.
15. Hora 1407 (sin riesgo de confusión y con riesgo).
16. Visibilidad 800 m.
17. RVR 550 m.
18. Altura de nubes 1 500 ft.

**B. Detecte el error en la colación.**

19. ATC: "AVIATORY 452, DESCEND TO FL 120." PILOT: "DESCENDING TO 12 000 FEET, AVIATORY 452."
20. ATC: "AVIATORY 452, CONTACT BOGOTA CONTROL 128.905." PILOT: "128.9, AVIATORY 452."
21. ATC: "AVIATORY 452, SQUAWK 5501." PILOT: "ROGER, AVIATORY 452."

**Soluciones**

1. Flight level three five zero.
2. Flight level one zero zero.
3. One zero thousand feet (millares enteros: dígitos de los millares y THOUSAND).
4. Five thousand five hundred feet.
5. One one thousand feet.
6. Heading zero nine five.
7. Runway one three.
8. Squawk four two seven one.
9. QNH one zero zero three.
10. Wind two four zero degrees one five knots, gusting two eight knots («gusting»: ver VERIFICAR).
11. One one eight decimal zero seven five.
12. One one eight decimal zero seven.
13. One two five decimal seven five zero (el quinto y el sexto no son ambos cero).
14. One one nine decimal zero (quinto y sexto son cero: solo cuatro dígitos).
15. «Zero seven»; con riesgo de confusión, «one four zero seven».
16. Visibility eight hundred metres.
17. RVR five five zero metres (no es centena entera: dígito por dígito).
18. One thousand five hundred feet.
19. Nivel de vuelo colacionado como altitud: son referencias de presión distintas. Correcto:
    "DESCENDING TO FL 120, AVIATORY 452."
20. Faltan dígitos: en espacio de 8,33 kHz se dicen seis. Correcto: "128.905, AVIATORY 452."
21. ROGER no es colación. El código SSR se colaciona siempre (Doc 9432, 2.8.3.5 c) y ROGER no
    sirve donde se exige colación (nota de ROGER en 2.6). Correcto: "5501, AVIATORY 452."

FUENTES
- Verificado: Doc 9432 (4.ª ed.) 2.2.1 f), 2.4.1 (tabla y nota de énfasis), 2.4.2, 2.4.3, 2.4.4 y 2.4.5 (con sus notas), 2.5.1, 2.5.2, 2.6 (ROGER), 2.8.3.5 c), 2.8.3.7, 2.8.3.9, 3.3.3.3, 4.2.1, 4.4.2, 6.3.1, 7.3.1; Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1, Nota; Doc 9835 (2.ª ed.) 3.3.7 a).
- VERIFICAR: grafías inglesas TREE, FIFE, NINER (y ZE-RO, WUN, TOO, FOW-er, SIX, SEV-en, AIT, DAY-SEE-MAL, HUN-dred, TOU-SAND) contra Anexo 10 Vol. II cap. 5 (transmisión de números) y Doc 9432 edición inglesa 2.4.1 (no cargados).
- VERIFICAR: la palabra inglesa para ráfagas en el viento («GUSTING») contra Doc 9432 edición inglesa 2.4.2 y Doc 4444 vigente cap. 12 (no cargados); la edición en español solo dice «ráfagas».
- VERIFICAR: la palabra inglesa «DECIMAL» en frecuencias (la edición en español da «COMA» en los ejemplos de 2.4.4 y «Decimal DE-si-mal» en la tabla de 2.4.1) contra Anexo 10 Vol. II cap. 5 (no cargado).
- VERIFICAR: si la 5.ª edición o una enmienda del Doc 9432 o el Anexo 10 vigente cambiaron alguna de estas reglas de agrupación (no cargado).

---

## 6. DISTINTIVOS DE LLAMADA (CALL SIGNS)

### ¿Qué es?

El distintivo de llamada es el nombre de la aeronave en la radio. De él depende que la instrucción la
ejecute el avión correcto y ningún otro.

### Lo que debe saber un piloto

**Tres tipos de distintivo de aeronave** (Doc 9432, 2.7.2.1):

| Tipo | Qué es | Ejemplo | Abreviado (2.7.2.2) |
|---|---|---|---|
| a) | Los caracteres de la matrícula (puede ir precedido del fabricante o modelo) | G-ABCD o CESSNA G-ABCD | El primero y al menos los dos últimos: G-CD o CESSNA CD |
| b) | Designador telefónico del explotador + los cuatro últimos caracteres de la matrícula | AVIATORY DCAB | Designador + al menos los dos últimos: AVIATORY AB |
| c) | Designador telefónico del explotador + identificación del vuelo | AVIATORY 452 | **No se abrevia** |

Los vuelos de aerolínea casi siempre usan el **tipo c)**. Por eso, en la línea, su distintivo **no se
abrevia nunca**.

**Términos que conviene distinguir:**

- **Designador telefónico** (radiotelefónico): la palabra con la que se nombra al explotador en la
  radio. En los ejemplos, AVIATORY (ficticio); en el Doc 9432, FASTAIR o AIR CHINA (2.4.2: «CCA 238»
  se transmite «AIR CHINA two three eight»).
- **Designador de la empresa**: el código de tres letras que va en el plan de vuelo (en el ejemplo del
  Doc 9432, «CCA»). No se dice en la radio.
- **Número de vuelo**: la identificación del vuelo que sigue al designador. Se transmite dígito por
  dígito (Doc 9432, 2.4.2).
- **Matrícula**: las marcas de nacionalidad y matrícula de la aeronave.

**Reglas de uso:**

- **Primer contacto: distintivos completos**, el de la estación y el propio (Doc 9432, 2.8.1.1).
- **Abreviar solo después de que la estación lo haga primero** (2.7.2.2.1), y solo si no hay riesgo
  de confusión (2.7.2.2). El tipo c) no se abrevia.
- **No cambiar el tipo de distintivo en vuelo**, salvo que el ATC lo indique por riesgo de confusión
  con distintivos similares (2.7.2.3).
- **HEAVY en el primer contacto**: las aeronaves de estela turbulenta pesada dicen HEAVY justo
  después del distintivo en el primer contacto con cada dependencia ATS (Doc 9432, 2.7.2.4;
  Doc 4444, 4.9.2). En el Doc 4444 cargado, la categoría pesada es de 136 000 kg o más de masa máxima
  certificada de despegue (4.9.1.1).
- **La colación termina con el distintivo** (Doc 9432, 2.8.3.7). Así el controlador sabe quién
  colacionó.

**Distintivos similares (SIMILAR CALL SIGNS).** Dos vuelos en la misma frecuencia con AVIATORY 452 y
AVIATORY 542, o AVIATORY 452 y AVIATORY 425. Con ruido, prisa o expectativa, un piloto acepta la
instrucción del otro. La defensa es triple: escuchar el distintivo completo antes de la instrucción,
colacionar siempre con el distintivo completo (para que el controlador detecte quién respondió) y
confirmar cuando hay duda. El ATC puede ordenar un cambio temporal del tipo de distintivo (2.7.2.3).
El tema se amplía en el capítulo 56.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-06-01 · Diagrama · 16:9 · 1600×900 px
IMAGEN SUGERIDA:
Arriba, la anatomía de un distintivo tipo c): «AVIATORY» con la etiqueta DESIGNADOR TELEFÓNICO y
«452» con la etiqueta IDENTIFICACIÓN DEL VUELO (se dice four five two, dígito por dígito); debajo,
en gris, «AVY452» con la etiqueta PLAN DE VUELO (no se dice por radio) y la aclaración «designador
ficticio». Abajo, dos siluetas de aeronaves en la misma frecuencia con los rótulos AVIATORY 452 y
AVIATORY 542 y un signo de alerta neutro entre ellas (no rojo), con el texto DISTINTIVOS SIMILARES.
OBJETIVO:
Que el piloto separe el designador telefónico, el número de vuelo y el designador del plan de vuelo,
y reconozca de vista el riesgo de dos distintivos parecidos.

### Fraseología OACI

**Ejemplo 1. Primer contacto con HEAVY.**

PILOT: "BOGOTA GROUND, AVIATORY 452 HEAVY, REQUEST TAXI, INFORMATION CHARLIE."

ATC: "AVIATORY 452, TAXI TO HOLDING POINT RUNWAY 13L, GIVE WAY TO B787 PASSING LEFT TO RIGHT, QNH 1019."

PILOT: "HOLDING POINT RUNWAY 13L, QNH 1019, GIVING WAY TO B787, AVIATORY 452."

Significado: HEAVY solo en el primer contacto; el controlador ya no lo repite. Modelo del Doc 9432,
4.4.3.

**Ejemplo 2. Distintivo tipo a) abreviado por la estación.**

PILOT: "BOGOTA TOWER, GOLF ALFA BRAVO CHARLIE DELTA."

ATC: "GOLF CHARLIE DELTA, BOGOTA TOWER."

PILOT: "GOLF CHARLIE DELTA, …"

Significado: la estación abrevió primero; desde entonces la aeronave puede abreviar (Doc 9432,
2.7.2.2 a) y 2.7.2.2.1). Con un distintivo tipo c) esto no aplica.

**Ejemplo 3. Llamada con el distintivo incompleto.**

PILOT: "BOGOTA GROUND, 452, REQUEST PUSH-BACK."

ATC: "STATION CALLING BOGOTA GROUND, SAY AGAIN YOUR CALL SIGN."

PILOT: "BOGOTA GROUND, AVIATORY 452, STAND 12, REQUEST PUSH-BACK."

Significado: «452» solo no identifica a nadie. Doc 9432, 2.8.1.5.

**Ejemplo 4. Distintivo similar: la colación lo delata.**

ATC: "AVIATORY 542, CLIMB TO FL 350."

PILOT (de AVIATORY 452, por error): "CLIMBING TO FL 350, AVIATORY 452."

ATC: "AVIATORY 452, NEGATIVE, MAINTAIN FL 310. INSTRUCTION WAS FOR AVIATORY 542."

PILOT: "MAINTAINING FL 310, AVIATORY 452."

Significado: la colación con el distintivo completo permitió que el controlador viera quién respondió
y lo corrigiera (Doc 9432, 2.8.3.4, 2.8.3.7, 2.8.3.8). **PLAIN LANGUAGE**: «INSTRUCTION WAS FOR…» es
lenguaje claro. Escenario de práctica.

**Ejemplo 5. Duda sobre a quién iba la instrucción.**

ATC: "AVIATORY … 2, TURN RIGHT HEADING 270."

PILOT: "BOGOTA APPROACH, AVIATORY 452, CONFIRM INSTRUCTION WAS FOR AVIATORY 452?"

ATC: "AVIATORY 452, NEGATIVE. AVIATORY 542, TURN RIGHT HEADING 270."

Significado: con un distintivo cortado y otro parecido en la frecuencia, no se ejecuta: se confirma.
CONFIRM es normalizada (Doc 9432, 2.6); la construcción completa es **PLAIN LANGUAGE**. Escenario de
práctica.

**Ejemplo 6. El ATC ordena cambiar el distintivo.**

ATC: "AVIATORY 452, CHANGE YOUR CALL SIGN TO AVIATORY DCAB UNTIL FURTHER ADVISED."

PILOT: "CHANGING CALL SIGN TO AVIATORY DCAB, AVIATORY 452."

Significado: cambio temporal del tipo de distintivo por riesgo de confusión (Doc 9432, 2.7.2.3). La
frase exacta está en la línea VERIFICAR.

### Aplicación en aerolínea

Las aerolíneas de la región suelen tener números de vuelo parecidos en la misma franja (idas y
regresos, vuelos con numeración consecutiva). En la cabina, la práctica de muchas tripulaciones es
que ambos pilotos escuchen el distintivo y, ante la mínima duda, confirmen antes de mover un selector.
En la entrevista puede aparecer la pregunta «¿qué hace si cree que la instrucción era para otro
avión?»: la respuesta es no ejecutar y confirmar con el distintivo completo.

La forma de decir el número de vuelo puede variar según el Estado y el operador (en algunos lugares
se oyen agrupaciones como «four fifty-two»). El Doc 9432 cargado lo muestra dígito por dígito; siga
lo que publique su AIP y su operador.

### Error frecuente

- **Recortar el distintivo** («452», «Aviatory») en una frecuencia con varios vuelos de la misma empresa.
- **Abreviar un distintivo tipo c)** o abreviar antes de que lo haga la estación.
- **Colacionar sin distintivo** o poniéndolo al principio y omitiéndolo al final: el controlador no
  sabe quién respondió.
- **Aceptar una autorización pensada para el otro** porque «era la que esperaba» (expectation bias,
  capítulo 55).
- **Olvidar HEAVY** en el primer contacto, o repetirlo en cada transmisión.

### En pocas palabras

- Tres tipos: matrícula; designador + cuatro últimas de la matrícula; designador + número de vuelo.
- El de aerolínea (designador + número de vuelo) no se abrevia.
- Primer contacto con distintivos completos; abreviar solo si la estación abrevió primero.
- HEAVY solo en el primer contacto con cada dependencia.
- Toda colación termina con el distintivo completo.
- Si duda de a quién iba la instrucción: no ejecute, confirme.

FUENTES
- Verificado: Doc 9432 (4.ª ed.) 2.3.2, 2.4.2, 2.6 (CONFIRM), 2.7.2.1, 2.7.2.2, 2.7.2.2.1, 2.7.2.3, 2.7.2.4, 2.8.1.1, 2.8.1.5, 2.8.3.4, 2.8.3.7, 2.8.3.8, 4.4.3; Doc 4444 (15.ª ed., Enm. 4) 4.9.1.1, 4.9.2.
- VERIFICAR: «CHANGE YOUR CALL SIGN TO … [UNTIL FURTHER ADVISED]» y «REVERT TO FLIGHT PLAN CALL SIGN» contra Doc 4444 vigente cap. 12 (cambio de distintivo de llamada) (no cargado).
- VERIFICAR: categorías de estela turbulenta vigentes (la 16.ª ed. del Doc 4444 añadió la categoría SUPER y su palabra en radio) contra Doc 4444 vigente 4.9 (no cargado).
- VERIFICAR: designadores de tres letras y designadores telefónicos de explotadores contra Doc 8585 (no cargado).
- VERIFICAR: forma en que cada Estado pide pronunciar el número de vuelo (dígito por dígito o agrupado) contra Anexo 10 Vol. II cap. 5 y el AIP del Estado (en Colombia, AIP Colombia GEN 3.4) (no cargados).

---

## 7. ESTRUCTURA DE UNA TRANSMISIÓN

### ¿Qué es?

Es el orden en que se arma un mensaje para que el receptor sepa en el primer segundo si es para él,
de quién viene y qué se le pide. Una forma práctica de recordarla son tres preguntas:

1. **WHO ARE YOU CALLING?** ¿A quién llama? (la estación)
2. **WHO ARE YOU?** ¿Quién es? (su distintivo)
3. **WHAT DO YOU WANT or REPORT?** ¿Qué quiere o qué informa? (dónde está, lo que tiene y lo que pide)

Las tres preguntas son una ayuda didáctica, no un texto OACI. Lo que sí es OACI es el orden: al
iniciar la comunicación, la aeronave usa los distintivos completos de la estación y el propio
(Doc 9432, 2.8.1.1), y en el ejemplo del manual la estación llamada va primero.

### Lo que debe saber un piloto

**Quién va primero depende de quién llama:**

- **Piloto que llama**: estación, distintivo propio, mensaje. «BOGOTA GROUND, AVIATORY 452, …»
- **ATC que llama o instruye**: distintivo de la aeronave, (estación, si hace falta), mensaje.
  «AVIATORY 452, CLIMB TO FL 240.»
- **Colación**: el contenido primero y **el distintivo al final** (Doc 9432, 2.8.3.7).

**Llamada en uno o dos pasos.**

- En dos pasos: el piloto llama con los distintivos y espera. Que la estación conteste con los
  distintivos ya es la invitación a seguir: el Doc 9432 omitió «GO AHEAD» por esa razón (nota al
  final de 2.6). Se usa cuando la estación puede no estar lista para anotar o en un primer contacto
  con una dependencia que necesita prepararse (por ejemplo, para presentar un plan de vuelo: Doc 9432,
  3.5.1, «READY TO COPY»).
- En un paso: estación, distintivo y mensaje de corrido. Es lo normal en frecuencias VHF ocupadas y
  en mensajes cortos y esperados.

**Qué va en el mensaje, según la situación** (ejemplos del Doc 9432):

- **Puesta en marcha**: ubicación (puesto) y acuse del ATIS junto con la solicitud (Doc 9432, 4.2.2).
- **Rodaje**: con el acuse del ATIS, el controlador no necesita repetir la información de salida
  (Doc 9432, 4.4.3).
- **Contacto inicial con aproximación**: nivel, estimado a un punto e información ATIS (Doc 9432, 7.3.1).
- **Notificación de posición**: identificación, posición, hora, nivel, próxima posición y hora, punto
  significativo siguiente (Doc 9432, 3.4.1).

Algunos Estados fijan en su AIP qué debe incluir el primer contacto al entrar o salir de su espacio
aéreo (Doc 9432, Preámbulo). **La estructura de este capítulo es educativa; lo que manda en cada
aeropuerto es el procedimiento local publicado.**

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-07-01 · Diagrama · 16:9 · 1600×900 px
IMAGEN SUGERIDA:
Una transmisión escrita en una sola línea y dividida en bloques de colores del módulo:
[BOGOTA GROUND] [AVIATORY 452] [STAND 12] [INFORMATION ALFA] [REQUEST START-UP AND PUSH-BACK].
Encima de cada bloque, la pregunta que responde: WHO ARE YOU CALLING? · WHO ARE YOU? · WHERE ARE
YOU? · WHAT DO YOU HAVE? · WHAT DO YOU WANT? Debajo, en una segunda línea, la respuesta del ATC y la
colación, con el distintivo resaltado al principio (ATC) y al final (colación). Rótulo al pie:
«Ejemplo educativo, se ajusta al procedimiento local».
OBJETIVO:
Que el piloto vea el orden de los bloques y dónde va el distintivo en cada tipo de transmisión.

### Fraseología OACI

**Ejemplo 1. Puesta en marcha y retroceso.**

PILOT: "BOGOTA GROUND, AVIATORY 452, STAND 12, INFORMATION ALFA, REQUEST START-UP AND PUSH-BACK."

ATC: "AVIATORY 452, START-UP AND PUSH-BACK APPROVED, QNH 1019."

PILOT: "START-UP AND PUSH-BACK APPROVED, QNH 1019, AVIATORY 452."

Significado: a quién (Bogota Ground), quién (Aviatory 452), dónde (puesto 12), qué tiene (ATIS
Alfa), qué quiere (puesta en marcha y retroceso). El Doc 9432 muestra la puesta en marcha
(«STAND 24 REQUEST START UP, INFORMATION BRAVO» / «START UP APPROVED QNH 1009», 4.2.2) y el retroceso
(«STAND 27 REQUEST PUSH-BACK» / «PUSH-BACK APPROVED», 4.3.1) como solicitudes separadas; en muchos
aeropuertos se piden juntas y en otros el retroceso se pide a APRON. **Ejemplo educativo**: siga el
procedimiento local.

**Ejemplo 2. Puesta en marcha con demora.**

PILOT: "BOGOTA GROUND, AVIATORY 452, STAND 12, REQUEST START-UP, INFORMATION ALFA."

ATC: "AVIATORY 452, EXPECT START-UP AT 35, QNH 1019."

PILOT: "EXPECT START-UP AT 35, QNH 1019, AVIATORY 452."

Significado: todavía no está aprobada; prevea encender a los 35 (minutos de la hora). Doc 9432,
4.2.2. «EXPECT» no es una aprobación.

**Ejemplo 3. Llamada en dos pasos.**

PILOT: "BOGOTA INFORMATION, AVIATORY 452."

ATC: "AVIATORY 452, BOGOTA INFORMATION."

PILOT: "AVIATORY 452, …" (mensaje)

Significado: el piloto llamó y esperó; la estación contestó con los distintivos, que es la invitación
a seguir (Doc 9432, 2.6, nota sobre GO AHEAD; 2.8.1.1).

**Ejemplo 4. Primer contacto con aproximación.**

PILOT: "BOGOTA APPROACH, AVIATORY 452 HEAVY, FL 80, ESTIMATING GIKOS 46, INFORMATION DELTA."

ATC: "AVIATORY 452, DESCEND TO 4 000 FEET, QNH 1005, TRANSITION LEVEL 50, EXPECT ILS APPROACH RUNWAY 13R."

PILOT: "DESCENDING TO 4 000 FEET, QNH 1005, TRANSITION LEVEL 50, EXPECTING ILS APPROACH RUNWAY 13R, AVIATORY 452."

Significado: quién, a quién, nivel, estimado e información ATIS. Modelo del Doc 9432, 7.3.1.

**Ejemplo 5. Notificación de posición.**

PILOT: "BOGOTA CONTROL, AVIATORY 452, GIKOS 47, FL 330, RUTAM 57, KOLOX NEXT."

ATC: "AVIATORY 452, ROGER."

Significado: identificación, posición (GIKOS), hora (47), nivel (FL 330), próxima posición y hora
(RUTAM a los 57), punto siguiente (KOLOX). Puntos ficticios. Doc 9432, 3.4.1.

**Ejemplo 6. Listo en el punto de espera.**

ATC: "AVIATORY 452, REPORT WHEN READY FOR DEPARTURE."

PILOT: "WILCO, AVIATORY 452."

PILOT: "AVIATORY 452, READY."

Significado: con torre ya en contacto, basta el distintivo y «READY». No se dice «ready for
take-off» de forma que suene a autorización (Doc 9432, 4.5.3 y 2.8.3.3).

**Ejemplo 7. Colación que termina con el distintivo.**

ATC: "AVIATORY 452, CROSS GIKOS FL 70."

PILOT: "CROSS GIKOS FL 70, AVIATORY 452."

Significado: contenido primero, distintivo al final (Doc 9432, 2.8.3.7, adaptado).

### Aplicación en aerolínea

Antes de oprimir el PTT, el piloto que comunica arma el mensaje en la cabeza (o lo lee de lo que ya
tiene anotado: puesto, ATIS, lo que va a pedir). En la preparación de salida muchas tripulaciones
anotan el puesto, la letra del ATIS y el QNH antes de llamar a Delivery o a Ground, para que la
primera llamada salga completa y sin pausas. Qué se anota y quién llama lo define el SOP del
operador.

Llamar con toda la información de una vez evita que el controlador tenga que preguntar «say
position» o «confirm information». Cada pregunta evitada es tiempo de frecuencia para otros.

### Error frecuente

- **Empezar por el mensaje** y decir la estación y el distintivo al final: el controlador ya no sabe
  a quién estaba escuchando.
- **Omitir la letra del ATIS** o decir una que ya cambió.
- **Colacionar sin distintivo al final.**
- **Pedir cosas que no van con esa dependencia** (pedir rodaje a Delivery, pedir nivel a Ground).
- **Meter todo en una sola transmisión larga** cuando la estación no está lista para anotar: mejor en
  dos pasos.

### En pocas palabras

- Piloto que llama: estación, distintivo, mensaje.
- ATC: distintivo de la aeronave primero.
- Colación: contenido primero, distintivo al final.
- En el mensaje: dónde está, qué tiene (ATIS), qué quiere o qué informa.
- La respuesta de la estación con los distintivos es la invitación a hablar.
- El ejemplo es educativo: manda el procedimiento local publicado en el AIP.

FUENTES
- Verificado: Doc 9432 (4.ª ed.) Preámbulo, 2.6 (nota sobre GO AHEAD), 2.8.1.1, 2.8.3.3, 2.8.3.7, 3.4.1, 3.5.1, 4.2.2, 4.3.1, 4.4.3, 4.5.3, 7.3.1.
- VERIFICAR: la forma combinada «REQUEST START-UP AND PUSH-BACK» / «START-UP AND PUSH-BACK APPROVED» contra Doc 4444 vigente cap. 12 (puesta en marcha y retroceso) y el AIP del aeródromo (AD 2.20, reglamentos locales de tránsito) (no cargados); el Doc 9432 cargado las muestra por separado.
- VERIFICAR: la vigencia de «GO AHEAD» (el Doc 9432 4.ª ed., nota en 2.6, dice que se omitió) contra Anexo 10 Vol. II cap. 5 y Doc 4444 vigente cap. 12 (no cargados).
- VERIFICAR: requisitos de primer contacto en Colombia contra AIP Colombia (ENR 1.1 / GEN 3.4) (no cargado).

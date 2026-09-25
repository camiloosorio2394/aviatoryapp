# AVIATORY · INGRESO A AEROLÍNEA → PBN

## Contenido completo del módulo (fuente para implementación)

**Versión:** 1.0 · 25 de septiembre de 2026 · borrador para revisión técnica
**Nivel:** avanzado. Piloto comercial o de aerolínea que prepara selección, entrevista técnica y entrenamiento inicial. Se asume IFR, VOR, DME, GNSS básico, FMS básico, SID, STAR, aproximaciones por instrumentos, plan de vuelo, ATC y piloto automático.
**Enfoque:** qué exige cada especificación, qué verifica la tripulación, qué ve en la carta y en el FMS, qué pasa cuando se pierde la capacidad y qué se le dice al ATC. No es un módulo de aviónica, de diseño de procedimientos ni de mantenimiento.
**Idioma:** español. Los términos en inglés se conservan porque así aparecen en la carta, en la fraseología, en el QRH y en la MEL.

---

## 0. FICHA DEL MÓDULO

| Campo | Valor |
|---|---|
| Ruta en la app | Ingreso a aerolínea → PBN |
| Clave de módulo sugerida | `pbn` |
| Capítulos | 52 (P01 a P52), con doce escenarios en el capítulo 52 |
| Imágenes | 28 huecos, listados en el Anexo A |
| Quiz por capítulo | 3 preguntas al final de cada capítulo (156 en total, `p01-q1` a `p52-q3`), corrección inmediata |
| Quiz final | Banco de 50 preguntas (`ev-01` a `ev-50`) en `contenido/bancos/pbn_evaluacion.json`, 20 al azar por intento, aprobación 80 %, corrección al final |
| Tiempo estimado | 5 a 9 min por capítulo, unas 6 h en total |

### El marco normativo que usa este módulo

Las cifras, las definiciones y la fraseología salen de documentos públicos y verificables, descargados y leídos para escribir este módulo. Cuando dos autoridades difieren, se dice cuál es cuál; nunca se presenta un criterio de una autoridad como si fuera universal.

| Fuente | Edición leída | Qué aporta aquí |
|---|---|---|
| RAC 91 (Colombia) | Enmienda 12, julio de 2026 | Numeral 91.1015, equipo de navegación para operaciones PBN, y las definiciones de especificación para la navegación, RNP y RNAV en español |
| RAC 121 (Colombia) | Agosto de 2025 | Numeral 121.995, la aprobación del explotador, la capacidad que debe figurar en la MEL y la gestión de los datos de navegación |
| RAC 211 (Colombia) | Enmienda 6, noviembre de 2025 | Gestión del tránsito aéreo: designación de especificaciones para la navegación y designadores de ruta ATS |
| RAC 119 (Colombia) | Enmienda 4 | PBN como aprobación específica dentro de las especificaciones de operación |
| FAA AC 90-105A | 7 de marzo de 2016 | Aplicación de cada especificación RNP por fase de vuelo (Tabla 5-1), Baro-VNAV, base de datos, contingencias y los requisitos de conocimiento del piloto |
| FAA AC 90-100A | Operaciones RNAV 1 y RNAV 2 | Uso en terminal y en ruta, verificación de posición en la salida y el ejemplo de comunicación con el ATC al perder la capacidad |
| FAA AC 90-101A, cambio 1 | 9 de febrero de 2016 | RNP AR: valores, tramos RF, frustradas por debajo de RNP 1.0 y la autorización específica |
| FAA AIM | Secciones 1-1, 1-2, 5-1, 5-2 y 5-4 | El catálogo de especificaciones tal como se le explica al piloto, fly-by y fly-over, tramos RF, el recuadro PBN de la carta, las líneas de mínimos y la suplantación de señal |
| OACI PANS-ATM (Doc 4444), Apéndice 2 | Reproducida en el AIP de Nueva Zelanda, ENR 1.10 | La letra del equipo en la casilla 10 y la tabla completa de códigos `PBN/` de la casilla 18 |

**Lo que este módulo no usa:** EASA, por decisión editorial.

**Lo que no se pudo cargar y queda marcado:** la circular GCEP-1.0-22-032 de la Aerocivil («Procedimiento para la aprobación de operaciones RNAV/RNP bajo el concepto PBN») no está disponible en el servidor de documentos de la entidad: las tres rutas conocidas devuelven error 404 al 25 de septiembre de 2026. Todo lo que dependía de ella va con un aviso de **verificar** que dice qué documento hay que consultar. Los documentos OACI 9613, 8168 y 9997 no son de acceso público; cuando este módulo cita una definición de OACI, la cita **por el RAC que la reproduce literalmente en español**, que para un piloto colombiano es además la norma que le aplica.

### Cómo leer las cifras

Cada cifra viene con su fuente al lado, y hay cuatro clases. Distinguirlas es la mitad del módulo, porque casi todos los errores de entrevista en PBN salen de tratar una cifra de una clase como si fuera de otra:

- **Cifras del concepto.** Valen en todas partes porque definen la especificación. Ejemplo: el número de una especificación es la precisión lateral en millas náuticas que se espera conseguir al menos el 95 % del tiempo de vuelo.
- **Cifras de la autoridad.** Valen en su espacio aéreo. Ejemplo: la tabla de la FAA que dice qué valor RNP aplica a cada fase de vuelo.
- **Cifras del procedimiento.** Están en la carta y solo valen para esa carta. Ejemplo: el límite de temperatura de una línea LNAV/VNAV, o el valor RNP de una línea de mínimos RNP AR.
- **Cifras del avión y del operador.** Están en el AFM, el FCOM, el QRH, la MEL y las especificaciones de operación. Cambian de flota en flota y de operador en operador. Cuando una cifra es de esta clase, el módulo lo dice y no inventa un número.

### Formato de las preguntas

```
**id** · Enunciado
- A) …
- B) …
- C) …
- D) …
**Correcta:** X · **Tema:** Pnn · **Referencia:** …
**Explicación:** …
```

---

# BLOQUE 1 · EL CONCEPTO

---

## 1. QUÉ ES PBN

**ID:** P01 · **Tiempo:** 7 min

### Concepto

Performance-Based Navigation: navegación basada en la performance. El RAC 91 la define como «navegación de área basada en los requisitos de performance que se aplican a las aeronaves que vuelan en una ruta ATS, en un procedimiento de aproximación por instrumentos o en un espacio aéreo designado».

La frase que hay que leer despacio es **«basada en los requisitos de performance»**. Antes, para volar una ruta, se exigía un equipo: un VOR, un ADF, dos DME. PBN invierte la pregunta. Ya no dice «lleve este equipo», dice «demuestre esta performance», y deja abierto con qué sensores se consigue.

### Lo que debe saber el piloto

PBN se aplica a cuatro cosas, y conviene tenerlas en la cabeza porque son cuatro momentos distintos de un mismo vuelo:

- Rutas ATS.
- Espacio aéreo designado.
- Salidas normalizadas por instrumentos (SID).
- Llegadas normalizadas (STAR) y aproximaciones por instrumentos.

En cada una de ellas la autoridad puede prescribir una **especificación para la navegación**, y esa especificación es la que fija qué tiene que cumplir el avión y qué tiene que saber hacer la tripulación.

#### Por qué esto cambia la manera de preparar un vuelo

Con navegación convencional, la pregunta de cabina era: «¿está el VOR operativo?». Con PBN la pregunta es doble y más incómoda: «¿es mi avión elegible para esta especificación?» y «¿puede cumplirla hoy, con el equipo que tengo despachado y la infraestructura que hay disponible?».

Son dos preguntas distintas. La primera se contesta en el AFM y en las especificaciones de operación. La segunda se contesta el día del vuelo, con la MEL, los NOTAM y lo que el avión indique.

### En operación de aerolínea

En un vuelo normal, PBN es invisible por la misma razón que RVSM: todo funciona. Aparece en cinco momentos concretos:

- En el despacho, cuando un ítem de la MEL toca una fuente de navegación.
- En la preparación, cuando se comprueba el ciclo de la base de datos.
- Al cargar la SID o la aproximación, cuando la carta exige una especificación y hay que saber si se tiene.
- Cuando el ATC cambia la autorización y hay que reprogramar sin romper la trayectoria.
- Cuando algo se degrada y hay que decidir si todavía se puede cumplir lo que la carta pide.

El resto del tiempo, PBN es la razón por la que la SID no pasa por encima del cerro y la aproximación existe en una pista que no tiene ILS.

### ¿Qué debe verificar?

En este capítulo, la idea con la que se leen los demás: la tripulación no verifica que el avión «tenga GPS». Verifica que el avión y la operación cumplan **la especificación que pide el procedimiento**, hoy.

### ¿Qué ocurre si no se cumple?

Si la especificación prescrita no se cumple, el procedimiento no se puede volar tal como está publicado. No es una cuestión de criterio del piloto: la separación, el margen sobre obstáculos y el diseño de la trayectoria se calcularon suponiendo esa performance.

### Error frecuente

«PBN es lo nuevo que reemplazó al VOR.» Ni lo uno ni lo otro. PBN es un concepto de navegación, no una tecnología, y la navegación convencional sigue existiendo y sigue publicándose. Lo que cambió es que ahora hay procedimientos cuyo requisito de acceso es una performance, no un equipo concreto.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Dos mapas en planta, uno al lado del otro, con el mismo terreno de fondo (una cordillera esquemática y un aeropuerto). Izquierda, rotulado «NAVEGACIÓN CONVENCIONAL»: la trayectoria va en tramos rectos de un VOR al siguiente, con los tres VOR dibujados como símbolos de radioayuda y la derrota quebrándose sobre cada uno; una de las patas pasa muy cerca del relieve. Derecha, rotulado «PBN»: la misma llegada definida por seis waypoints con nombre de cinco letras, la trayectoria libre del relieve y una anotación al margen que diga «la trayectoria se define donde hace falta, no donde hay antena».

OBJETIVO:
Que el piloto vea de un golpe que PBN permite definir la trayectoria por donde conviene operacionalmente, sin depender de volar directamente hacia o desde una antena en tierra.

### En pocas palabras

- PBN es navegación de área basada en requisitos de performance, aplicada a rutas ATS, espacio aéreo designado, SID, STAR y aproximaciones.
- Exige performance, no un equipo concreto: por eso la pregunta de cabina cambia de «¿está el VOR?» a «¿cumplo la especificación?».
- La especificación para la navegación es la que fija los requisitos de la aeronave y de la tripulación.
- No es una tecnología ni el reemplazo del VOR: es un concepto.

### Quiz · Capítulo 1

**p01-q1** · En una entrevista te piden definir PBN. ¿Cuál respuesta es correcta y completa?
- A) El uso del GPS como fuente primaria de navegación en ruta y aproximación.
- B) Navegación de área basada en requisitos de performance que se aplican en rutas ATS, procedimientos de aproximación por instrumentos y espacio aéreo designado.
- C) El conjunto de procedimientos RNAV que reemplazaron a los procedimientos basados en radioayudas terrestres.
- D) La capacidad del FMS de calcular una trayectoria entre dos puntos cualesquiera.
**Correcta:** B · **Tema:** P01 · **Referencia:** RAC 91, definición de navegación basada en la performance (PBN)
**Explicación:** Es la definición de la norma: navegación de área basada en los requisitos de performance aplicables a la aeronave que vuela en una ruta ATS, en un procedimiento de aproximación por instrumentos o en un espacio aéreo designado. El GPS es una fuente posible, no la definición, y PBN no reemplazó la navegación convencional.

**p01-q2** · ¿Cuál es el cambio de fondo que introduce PBN frente a la navegación convencional?
- A) Que la trayectoria se vuela con piloto automático en lugar de a mano.
- B) Que se exige una performance de navegación en lugar de un equipo determinado a bordo.
- C) Que las radioayudas terrestres dejan de usarse como fuente de posición.
- D) Que el ATC deja de asignar rutas y la tripulación elige la trayectoria.
**Correcta:** B · **Tema:** P01 · **Referencia:** RAC 91, definición de navegación basada en la performance (PBN); FAA AIM 1-2-1
**Explicación:** El requisito pasa de ser un equipo a ser una performance, y con eso se abre qué sensores pueden usarse para conseguirla. Las radioayudas terrestres siguen siendo fuente válida en varias especificaciones, y las rutas las sigue autorizando el ATC.

**p01-q3** · ¿A qué se aplica una especificación para la navegación PBN?
- A) Solo a las aproximaciones por instrumentos.
- B) Solo a las rutas oceánicas y remotas.
- C) A rutas ATS, espacio aéreo designado, SID, STAR y aproximaciones por instrumentos.
- D) A cualquier fase de vuelo, pero únicamente por encima de FL 290.
**Correcta:** C · **Tema:** P01 · **Referencia:** RAC 91, definición de navegación basada en la performance (PBN); FAA AC 90-105A, Tabla 5-1
**Explicación:** PBN acompaña el vuelo entero: ruta, terminal y aproximación. Reducirlo a las aproximaciones es el error más común, y la tabla de aplicaciones de la FAA lo deja claro al listar valores para salida, llegada, aproximación inicial, intermedia, final y frustrada.

---

## 2. DE LA RADIOAYUDA A LA TRAYECTORIA

**ID:** P02 · **Tiempo:** 6 min

### Concepto

Tres etapas, y el piloto de aerolínea convive con las tres en la misma jornada.

#### Navegación convencional

VOR a VOR. La trayectoria es consecuencia de dónde están las antenas: se vuela hacia una o desde una, y la ruta se quiebra sobre cada instalación.

#### Navegación de área (RNAV)

Waypoint a waypoint. El sistema de a bordo calcula la posición y permite volar cualquier trayectoria deseada dentro de la cobertura de la infraestructura y de la capacidad del equipo. La antena deja de ser el destino y pasa a ser, si acaso, una fuente de posición.

#### PBN

La aeronave debe **demostrar** una performance determinada para realizar una aplicación concreta. Ya no es «puedo volar a ese punto», es «puedo volar a ese punto con esta precisión, y si dejo de poder, lo sé».

### Lo que debe saber el piloto

Una precisión de vocabulario que se pregunta en entrevista: **navegación de área no es sinónimo de PBN**. La nota del RAC 91 lo dice sin rodeos: la navegación de área incluye la navegación basada en la performance y además otras operaciones que no entran en la definición de PBN.

Dicho al revés: toda operación PBN es navegación de área, pero hay navegación de área que no es PBN. El AIM lo expresa desde el otro lado, y también hay que saberlo: PBN existe bajo el paraguas de la navegación de área, y el término RNAV en el título de un procedimiento significa «navegación de área», sin decir nada del equipo del avión.

### En operación de aerolínea

En un mismo vuelo pueden convivir una SID RNAV 1, una ruta con designador que exige una especificación, vectores del ATC que sacan el avión de la trayectoria publicada y una aproximación RNP APCH. Y si la aproximación no está disponible, el alterno puede ser un VOR/DME convencional.

Esa es la razón por la que el módulo no trata la navegación convencional como algo superado: sigue siendo el plan B, y el plan B hay que saber volarlo.

### ¿Qué debe verificar?

Que la trayectoria que el FMS va a volar es la que la carta publica, no la que el avión «puede» volar. Con navegación de área la libertad es grande, y esa libertad es justamente lo que hay que acotar con la carta.

### Error frecuente

Confundir la evolución con una sustitución. «Ya no se usan radioayudas» es falso: varias especificaciones RNAV admiten posicionamiento por DME/DME o por VOR/DME, el ILS sigue siendo el patrón de la aproximación de precisión, y la reversión a navegación convencional es la contingencia más común.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Tres mapas pequeños en fila, con la misma pareja de aeropuertos y el mismo relieve de fondo. (1) «CONVENCIONAL»: derrota quebrada sobre tres VOR. (2) «NAVEGACIÓN DE ÁREA»: derrota por cinco waypoints, más recta, con los VOR dibujados en gris para indicar que ya no son el destino. (3) «PBN»: la misma derrota que en 2, pero con un rótulo sobre cada segmento que indique la especificación requerida, del tipo «RNAV 1», «RNP 2», «RNP APCH», y una franja lateral estrecha alrededor de la derrota que insinúe la precisión exigida.

OBJETIVO:
Mostrar la evolución conceptual y, sobre todo, que lo que añade PBN al mapa de la navegación de área es el requisito de performance escrito sobre cada segmento.

### En pocas palabras

- Convencional: VOR a VOR, la trayectoria la deciden las antenas.
- Navegación de área: waypoint a waypoint, la trayectoria se define donde conviene.
- PBN: la aeronave demuestra una performance para una aplicación concreta.
- Toda operación PBN es navegación de área, pero no toda navegación de área es PBN.

### Quiz · Capítulo 2

**p02-q1** · ¿Cuál es la relación correcta entre navegación de área y PBN?
- A) Son sinónimos: RNAV es el nombre técnico de PBN.
- B) PBN es navegación de área, pero existe navegación de área que no entra en la definición de PBN.
- C) La navegación de área es una aplicación de PBN restringida a la terminal.
- D) PBN reemplazó a la navegación de área cuando se generalizó el GNSS.
**Correcta:** B · **Tema:** P02 · **Referencia:** RAC 91, nota a la definición de navegación de área
**Explicación:** La nota de la norma es explícita: la navegación de área incluye la navegación basada en la performance y además otras operaciones no incluidas en su definición. Es una relación de contenido, no de equivalencia ni de reemplazo.

**p02-q2** · En el título de un procedimiento, ¿qué indica la palabra RNAV?
- A) Que el avión debe estar equipado con GNSS.
- B) Que es navegación de área, sin decir nada sobre la capacidad del equipo del avión.
- C) Que el procedimiento incluye control y alerta de la performance a bordo.
- D) Que el procedimiento solo puede volarse con piloto automático acoplado.
**Correcta:** B · **Tema:** P02 · **Referencia:** FAA AIM 1-2-1
**Explicación:** El AIM lo aclara expresamente: en ese contexto, como en los títulos de procedimiento, RNAV significa simplemente navegación de área, con independencia de la capacidad del equipo de la aeronave. Los requisitos concretos están en las notas y en el recuadro PBN de la carta.

**p02-q3** · Por qué sigue importando la navegación convencional en un módulo de PBN?
- A) Porque las especificaciones PBN exigen volar siempre con referencia a un VOR.
- B) Porque es lo que se usa por debajo de la altitud de transición.
- C) Porque varias especificaciones admiten posicionamiento por radioayudas y porque la reversión a navegación convencional es una contingencia habitual.
- D) Porque el ATC solo autoriza rutas convencionales cuando hay tráfico.
**Correcta:** C · **Tema:** P02 · **Referencia:** FAA AC 90-100A, numeral 8; FAA AC 90-105A, capítulo 6
**Explicación:** Hay especificaciones que admiten DME/DME o VOR/DME como fuente de posición, y cuando se pierde la capacidad PBN lo que queda suele ser navegación convencional. Saber volarla no es nostalgia: es el plan B.

---

## 3. LOS TRES ELEMENTOS DEL CONCEPTO PBN

**ID:** P03 · **Tiempo:** 6 min

### Concepto

El concepto PBN se sostiene sobre tres piezas que encajan. Para el piloto no es teoría de diseño de espacio aéreo: es la explicación de por qué un procedimiento existe, por qué exige lo que exige y por qué a veces no se puede volar.

#### La aplicación de navegación

Es el uso concreto: esta SID, esta STAR, esta ruta, esta aproximación a esta pista. Es lo que aparece publicado y lo que el ATC autoriza.

#### La especificación para la navegación

Es el conjunto de requisitos relativos a la aeronave y a la tripulación necesarios para dar apoyo a la operación dentro de un espacio aéreo definido. Es lo que el piloto tiene que cumplir. RNAV 1, RNP 1, RNP APCH son especificaciones.

#### La infraestructura de radioayudas

Es lo que hay disponible para posicionarse: satélites, DME, VOR, sistemas inerciales a bordo. Sin la infraestructura adecuada, la especificación no se puede cumplir aunque el avión sea elegible.

### Lo que debe saber el piloto

La consecuencia práctica de las tres piezas es una frase que conviene memorizar: **un avión puede ser elegible para una especificación y no ser capaz de cumplirla hoy**.

El AIM lo ejemplifica exactamente así: una aeronave puede ser elegible para RNP 1 y no ser capaz de una operación RNP 1 por cobertura limitada de radioayudas o por una falla de aviónica. Elegibilidad la da el AFM; capacidad la da el día.

### En operación de aerolínea

Las tres piezas se revisan en tres momentos distintos y por caminos distintos, y eso es lo que hace que se olviden:

- La aplicación está en la carta y en la autorización del ATC.
- La especificación está en la carta (qué pide) y en el AFM o las especificaciones de operación (qué tengo).
- La infraestructura está en los NOTAM y, en vuelo, en lo que indique el avión.

### ¿Qué debe verificar?

- Qué especificación pide el procedimiento que se va a volar.
- Si la aeronave es elegible para ella.
- Si la infraestructura necesaria está disponible para el periodo del vuelo.

### ¿Qué ocurre si no se cumple?

Falta cualquiera de las tres y el procedimiento no se puede volar como está publicado. La que más se pasa por alto es la tercera, porque no se ve en cabina hasta que el avión avisa.

### Error frecuente

Creer que la especificación es una etiqueta del procedimiento. No lo es: es un contrato de dos partes. Dice lo que debe cumplir la aeronave **y** lo que debe saber hacer la tripulación. El RAC 91 lo dice en la propia definición: requisitos relativos a la aeronave y a la tripulación de vuelo.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Tres engranajes encajados, cada uno rotulado y con un pie de dos líneas: «APLICACIÓN DE NAVEGACIÓN · la SID, la STAR, la ruta, la aproximación», «ESPECIFICACIÓN PARA LA NAVEGACIÓN · qué debe cumplir el avión y la tripulación», «INFRAESTRUCTURA · GNSS, DME, VOR, IRS». Debajo, una banda con la frase «si falta una, el procedimiento no se vuela como está publicado».

OBJETIVO:
Fijar que las tres piezas son condiciones simultáneas, y que la tercera es la que se olvida porque no está en la carta.

### En pocas palabras

- Tres piezas: aplicación de navegación, especificación para la navegación e infraestructura.
- La especificación es un contrato de dos partes: aeronave y tripulación.
- Ser elegible no es ser capaz hoy: la infraestructura y el equipo despachado deciden.
- Falta una pieza y el procedimiento no se vuela como está publicado.

### Quiz · Capítulo 3

**p03-q1** · ¿Cuáles son los tres elementos del concepto PBN?
- A) GNSS, FMS y base de datos de navegación.
- B) Precisión, integridad y continuidad.
- C) Aplicación de navegación, especificación para la navegación e infraestructura de radioayudas.
- D) Aeronave elegible, operador autorizado y tripulación entrenada.
**Correcta:** C · **Tema:** P03 · **Referencia:** RAC 91, definiciones de navegación basada en la performance y de especificación para la navegación
**Explicación:** Son esos tres. La opción D enumera condiciones para operar, que salen de la especificación; la B enumera atributos de la performance; y la A, equipo de a bordo.

**p03-q2** · Tu avión es elegible para RNP 1 según el AFM, pero hoy no puede cumplir una SID RNP 1. ¿Es posible?
- A) No: si el AFM lo declara elegible, la capacidad está garantizada.
- B) Sí: la elegibilidad la da la documentación del avión y la capacidad depende de la infraestructura disponible y del estado de la aviónica.
- C) Solo si el piloto automático está inoperativo.
- D) Solo en espacio aéreo oceánico o remoto.
**Correcta:** B · **Tema:** P03 · **Referencia:** FAA AIM 1-2-1, apartado de especificaciones RNP
**Explicación:** El AIM usa este mismo ejemplo: una aeronave puede ser elegible para RNP 1 y no ser capaz de la operación por cobertura limitada de radioayudas o por una falla de aviónica. Son dos preguntas distintas y las dos hay que contestarlas.

**p03-q3** · ¿Qué define exactamente una especificación para la navegación?
- A) El equipo mínimo que debe llevar la aeronave.
- B) La precisión lateral que debe mantener el piloto automático.
- C) El conjunto de requisitos relativos a la aeronave y a la tripulación de vuelo necesarios para dar apoyo a la operación en un espacio aéreo definido.
- D) La trayectoria publicada y sus restricciones de altitud y velocidad.
**Correcta:** C · **Tema:** P03 · **Referencia:** RAC 91, definición de especificación para la navegación
**Explicación:** Es la definición literal de la norma, y lo importante es que incluye a la tripulación. Una especificación no se cumple solo con equipo: exige calificación, competencia y procedimientos.

---

## 4. LO QUE PBN NO ES

**ID:** P04 · **Tiempo:** 6 min

### Concepto

Tres confusiones que aparecen una y otra vez en entrevistas, y que conviene desarmar antes de entrar en las especificaciones.

#### PBN no es GPS

PBN es un concepto de navegación basada en performance. El GNSS es una tecnología, y para muchas aplicaciones PBN es la fuente fundamental de posición, a veces la única admitida. Pero la especificación no dice «lleve GPS», dice «consiga esta performance». Hay especificaciones que admiten DME/DME, DME/DME/IRU o VOR/DME.

#### RNAV no es GPS

RNAV describe la capacidad de navegar de área. El GPS es una de las fuentes con que se consigue. En el título de un procedimiento, RNAV no dice nada del equipo del avión.

#### PBN no es TAWS ni GPWS

PBN permite seguir una trayectoria con una performance especificada. El TAWS es un sistema de alerta que avisa de una situación peligrosa respecto del terreno. Uno define por dónde se vuela; el otro avisa cuando el resultado se acerca al suelo. Son sistemas distintos, con propósitos distintos, y ninguno reemplaza al otro.

### Lo que debe saber el piloto

La razón por la que estas confusiones importan no es terminológica, es operacional.

Quien cree que PBN es GPS concluye que perder GNSS es perder toda capacidad PBN, y eso lleva a declarar una incapacidad que a lo mejor no existe, o a lo contrario: a suponer que con GPS operativo ya se puede volar cualquier RNP.

Quien cree que PBN protege del terreno deja de vigilar el perfil vertical y las restricciones de altitud, que es precisamente lo que sí protege.

### En operación de aerolínea

En una degradación de GNSS en ruta, la pregunta correcta no es «¿perdí PBN?». Es «¿qué especificación necesito para el segmento que estoy volando y qué me queda para cumplirla?». En algunos casos la respuesta es que se sigue igual con otra fuente de posición. En otros, que hay que pedir otra autorización.

### Error frecuente

«Si el procedimiento aparece en el FMS, estoy autorizado.» No. Que un procedimiento esté en la base de datos dice que el proveedor lo codificó, no que el avión, el operador y la tripulación estén autorizados a volarlo. En el caso de la FAA hay incluso una salvaguarda en sentido contrario que conviene conocer: se exige que la base de datos de la aeronave contenga solo los procedimientos para los que la aeronave mantiene elegibilidad, así que si un procedimiento no aparece, lo más probable es que contenga elementos PBN para los que el avión no es elegible. Esa salvaguarda es un criterio de la FAA; no se puede dar por universal.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Diagrama radial. En el centro, un círculo grande rotulado «PBN · concepto de navegación basada en performance». Alrededor, cuatro círculos menores conectados con líneas, rotulados «GNSS», «DME/DME», «DME/DME/IRU», «VOR/DME», cada uno con el pie «fuente de posición». Fuera del radio, separado por una línea de puntos y claramente aparte, un recuadro rotulado «TAWS · alerta de terreno» con el pie «sistema distinto, propósito distinto».

OBJETIVO:
Romper de un vistazo la asociación «PBN = GPS» y dejar el TAWS fuera del diagrama, para que se vea que no forma parte del concepto.

### En pocas palabras

- PBN es un concepto; el GNSS es una tecnología, con frecuencia la fuente principal, y no siempre la única admitida.
- RNAV describe navegación de área; en el título de un procedimiento no dice nada del equipo del avión.
- PBN no protege del terreno: eso es el TAWS, que es otro sistema.
- Que el procedimiento esté en el FMS no significa que se esté autorizado a volarlo.

### Quiz · Capítulo 4

**p04-q1** · «Si tengo GPS puedo volar cualquier RNP.» ¿Por qué es incorrecto?
- A) Porque el GPS no se admite como fuente de posición en operaciones RNP.
- B) Porque cada especificación exige elegibilidad propia de la aeronave, además de autorización del operador y competencia de la tripulación.
- C) Porque las operaciones RNP exigen posicionamiento por DME/DME.
- D) Porque el GPS solo sirve en ruta, no en terminal ni en aproximación.
**Correcta:** B · **Tema:** P04 · **Referencia:** FAA AIM 1-2-1; RAC 121, numeral 121.995
**Explicación:** El AIM subraya que la elegibilidad se lista por separado para cada especificación y que ser elegible para una no implica serlo para otra. Y el RAC 121 exige además que el explotador esté autorizado. El GPS es fuente, no permiso.

**p04-q2** · ¿Qué diferencia hay entre PBN y TAWS?
- A) Ninguna operacionalmente: el TAWS es la función de PBN que protege del terreno.
- B) PBN define y vigila la performance de navegación; el TAWS alerta de una situación peligrosa respecto del terreno.
- C) El TAWS es la fuente de datos de terreno que usa el FMS para calcular la trayectoria PBN.
- D) PBN sustituye al TAWS en procedimientos RNP AR.
**Correcta:** B · **Tema:** P04 · **Referencia:** FAA AC 90-105A, capítulo 6; FAA AIM 1-2-1
**Explicación:** Son sistemas distintos con propósitos distintos. Seguir con precisión una trayectoria publicada da margen sobre obstáculos porque el procedimiento se diseñó así, no porque PBN vigile el terreno. Confundirlos hace que se deje de vigilar el perfil vertical.

**p04-q3** · Encuentras una aproximación RNP en la carta pero no aparece en la base de datos del avión. En el marco de la FAA, ¿qué es lo más probable?
- A) Que la base de datos esté vencida.
- B) Que el procedimiento contenga elementos PBN para los que el avión no es elegible.
- C) Que el procedimiento esté cancelado por NOTAM.
- D) Que haya que introducirlo a mano con las coordenadas de la carta.
**Correcta:** B · **Tema:** P04 · **Referencia:** FAA AIM 1-2-1, apartado de especificaciones RNP
**Explicación:** La FAA exige que la base de datos contenga solo los procedimientos para los que la aeronave mantiene elegibilidad: si no está, lo probable es que el avión no pueda computarlo o volarlo. Lo que nunca corresponde es teclearlo a mano desde la carta.

---

## 5. PRECISIÓN, INTEGRIDAD, CONTINUIDAD, DISPONIBILIDAD Y FUNCIONALIDAD

**ID:** P05 · **Tiempo:** 6 min

### Concepto

Cuando se dice que una especificación fija «requisitos de performance», eso se descompone en cinco atributos. No hace falta saber cómo se calculan; hace falta saber qué significa cada uno cuando se está sentado en la cabina.

#### Precisión (*accuracy*)

Cuánto se parece la posición que el sistema usa a la posición real. Es el atributo que el número de la especificación cuantifica.

#### Integridad (*integrity*)

La confianza en que lo que el sistema dice es cierto, y la capacidad de avisar cuando deja de serlo. Para el piloto, integridad es la diferencia entre «estoy desviado y lo sé» y «estoy desviado y nadie me lo dijo».

#### Continuidad (*continuity*)

Que la función siga estando durante toda la operación. Por eso ciertas operaciones exigen equipo redundante: no porque un sistema sea impreciso, sino porque una sola falla no puede dejar al avión sin navegación a mitad del procedimiento.

#### Disponibilidad (*availability*)

Que el servicio esté ahí cuando se lo va a usar. Es lo que se comprueba con NOTAM y, cuando corresponde, con una predicción de disponibilidad.

#### Funcionalidad (*functionality*)

Qué tiene que **saber hacer** el sistema, más allá de posicionarse bien: seguir un tramo de radio constante, escalar el valor RNP, generar una trayectoria paralela desplazada, presentar la desviación lateral.

### Lo que debe saber el piloto

De los cinco, el que cambia la vida en cabina es la integridad, porque es el que convierte un error en una alerta. Y el que más sorprende en entrevista es la funcionalidad: dos aviones con el mismo GNSS y la misma precisión pueden diferir en si pueden volar un tramo RF, y por eso uno vuela el procedimiento y el otro no.

### En operación de aerolínea

Cada atributo se comprueba por una vía distinta:

| Atributo | Dónde se comprueba |
|---|---|
| Precisión | La especificación que pide la carta y la elegibilidad del avión |
| Integridad | Lo que el avión indica y alerta durante la operación |
| Continuidad | La MEL y los requisitos de redundancia de la operación |
| Disponibilidad | NOTAM y, cuando aplique, predicción de disponibilidad |
| Funcionalidad | El AFM o la documentación de aviónica, y las notas de la carta |

### ¿Qué debe verificar?

Que la funcionalidad que exige el procedimiento esté listada como capacidad del avión, no solo la precisión. Es el hueco por donde se cuelan las sorpresas.

### Error frecuente

Tratar los cinco atributos como sinónimos de «el equipo es bueno». No lo son: son cinco preguntas distintas, y una operación puede fallar por cualquiera de ellas con el resto en orden.

### En pocas palabras

- Precisión: cuánto se parece la posición usada a la real. Es lo que cuantifica el número.
- Integridad: la capacidad de avisar cuando la posición deja de ser confiable.
- Continuidad: que la función siga estando durante toda la operación; de ahí la redundancia.
- Disponibilidad: que el servicio esté cuando se lo va a usar; de ahí los NOTAM y la predicción.
- Funcionalidad: qué debe saber hacer el sistema, como un tramo RF o escalar el RNP.

### Quiz · Capítulo 5

**p05-q1** · Dos aviones tienen el mismo receptor GNSS y la misma precisión declarada, pero uno no puede volar una aproximación con un tramo RF. ¿Qué atributo explica la diferencia?
- A) La precisión.
- B) La integridad.
- C) La disponibilidad.
- D) La funcionalidad.
**Correcta:** D · **Tema:** P05 · **Referencia:** FAA AIM 1-2-1, apartados de RNP APCH y RNP 1; FAA AC 90-101A, numeral 4
**Explicación:** La capacidad de volar un tramo RF es funcionalidad, y en varias especificaciones es opcional: hay que buscarla listada como característica del equipo. Un avión puede ser elegible para RNP APCH o RNP 1 y no poder volar un RF.

**p05-q2** · ¿Qué significa integridad para el piloto?
- A) Que la posición calculada es precisa.
- B) Que el sistema puede avisar cuando la información deja de ser confiable.
- C) Que el equipo es redundante y sobrevive a una falla.
- D) Que el servicio está disponible en el periodo del vuelo.
**Correcta:** B · **Tema:** P05 · **Referencia:** FAA AC 90-101A, numeral 3, definición de RAIM; FAA AIM 1-2-1
**Explicación:** Precisión es parecido a la verdad; integridad es la confianza en esa información y el aviso cuando se pierde. La redundancia es continuidad y el servicio en el periodo del vuelo es disponibilidad: cuatro preguntas distintas.

**p05-q3** · ¿Por qué ciertas operaciones exigen equipo redundante?
- A) Por precisión: dos sistemas promedian mejor la posición.
- B) Por continuidad: una sola falla no puede dejar al avión sin navegación en mitad del procedimiento.
- C) Por funcionalidad: la redundancia habilita los tramos RF.
- D) Por disponibilidad: dos receptores ven más satélites.
**Correcta:** B · **Tema:** P05 · **Referencia:** FAA AC 90-105A, capítulo 6; FAA AC 90-101A, numeral 2, apartado c
**Explicación:** La redundancia responde a continuidad. La circular de RNP AR lo ejemplifica al exigir equipo redundante donde la frustrada necesita RNP por debajo de 1.0: el punto no es medir mejor, es que la función no se caiga a mitad de la maniobra.

---

# BLOQUE 2 · RNAV, RNP Y EL NÚMERO

---

## 6. RNAV: NAVEGACIÓN DE ÁREA

**ID:** P06 · **Tiempo:** 6 min

### Concepto

Area Navigation. Es el método de navegación que permite operar sobre **cualquier trayectoria deseada** dentro de la cobertura de las radioayudas de referencia, de los límites de un sistema autónomo a bordo, o de una combinación de ambos.

Esa libertad tiene dos frenos, y los dos importan: la capacidad del sistema del avión y la infraestructura disponible. RNAV no significa «puedo ir a donde quiera»; significa «puedo definir la trayectoria sin tener que pasar por encima de una antena, siempre que el equipo y la infraestructura lo permitan».

### Lo que debe saber el piloto

Una **especificación RNAV** es, según el RAC 91, una especificación para la navegación basada en la navegación de área **que no incluye el requisito de control y alerta de la performance**, y se designa con el prefijo RNAV: RNAV 5, RNAV 1.

La frase entera se aprende de memoria, porque la mitad final es lo único que separa RNAV de RNP. Sin control y alerta, el sistema navega con la precisión que se le exige, pero no se pronuncia sobre si la está consiguiendo.

#### Las especificaciones RNAV que existen

RNAV 10, RNAV 5, RNAV 2 y RNAV 1. Conviene saber que RNAV 10 arrastra una peculiaridad de nombre que se ve en el capítulo correspondiente: conserva la designación RNP 10 en la casilla del plan de vuelo y en mucha documentación.

### En operación de aerolínea

Las especificaciones RNAV aparecen sobre todo en SID y STAR (RNAV 1), en rutas (RNAV 2, RNAV 5) y en espacio oceánico y remoto (RNAV 10). En una jornada normal, el piloto de aerolínea vuela RNAV sin nombrarlo: lo nombra cuando la carta lo exige y cuando algo falla.

### ¿Qué debe verificar?

- Qué especificación RNAV pide el procedimiento, en las notas o en el recuadro PBN de la carta.
- Si la aeronave es elegible para esa especificación concreta, no para «RNAV» en general.
- Qué fuentes de posición admite y cuáles están disponibles hoy.

### ¿Qué ocurre si no se cumple?

Sin la especificación exigida no se puede volar la trayectoria publicada, y hay que pedir una autorización alternativa. Como la especificación RNAV no incluye control y alerta a bordo, la detección de un problema depende más del piloto y de la vigilancia del ATC que del propio sistema. Esa es la razón de fondo por la que RNAV y RNP no son intercambiables.

### Comunicación ATC

Cuando se pierde la capacidad, el ejemplo que da la circular de la FAA para operaciones RNAV en terminal y en ruta es directo: «*…N1234, failure of GPS/GNSS system, unable RNAV, request amended clearance*». Tres piezas: qué falló, qué no se puede cumplir y qué se pide.

### Error frecuente

Decir «estoy RNAV» como si fuera un estado del avión. No lo es: cada especificación se declara y se autoriza por separado. Ser elegible para RNAV 2 no implica serlo para RNAV 1.

### En pocas palabras

- RNAV es navegación de área: permite operar sobre cualquier trayectoria deseada dentro de la capacidad del sistema y de la infraestructura.
- Una especificación RNAV **no** incluye el requisito de control y alerta de la performance.
- Se designa con el prefijo RNAV: RNAV 10, RNAV 5, RNAV 2, RNAV 1.
- La elegibilidad es por especificación, no por familia.

### Quiz · Capítulo 6

**p06-q1** · ¿Qué caracteriza a una especificación RNAV frente a una RNP?
- A) Que admite menos fuentes de posición.
- B) Que no incluye el requisito de control y alerta de la performance a bordo.
- C) Que su número es siempre mayor.
- D) Que solo se aplica en ruta.
**Correcta:** B · **Tema:** P06 · **Referencia:** RAC 91, definición de especificación para navegación de área (RNAV)
**Explicación:** Es la definición literal: especificación basada en la navegación de área que no incluye el requisito de control y alerta de la performance, designada con el prefijo RNAV. El número no distingue las familias y las especificaciones RNAV existen en ruta, en terminal y en espacio oceánico.

**p06-q2** · ¿Cuál es el límite real de la libertad de trayectoria que da RNAV?
- A) La autorización del ATC, únicamente.
- B) La capacidad del sistema del avión y la infraestructura de radioayudas disponible.
- C) El alcance del piloto automático.
- D) La altitud de transición.
**Correcta:** B · **Tema:** P06 · **Referencia:** RAC 91, definición de navegación de área; FAA AIM 1-2-1
**Explicación:** La navegación de área permite operar sobre cualquier trayectoria deseada dentro de la cobertura de las radioayudas de referencia, de los límites de un sistema autónomo a bordo o de una combinación de ambos. La autorización del ATC define qué se vuela, no qué se puede.

**p06-q3** · Pierdes el GNSS volando una SID RNAV 1 y no puedes cumplir la especificación. ¿Cómo lo comunicas?
- A) Declaras emergencia y desciendes.
- B) Informas la falla, declaras que no puedes cumplir RNAV y solicitas autorización enmendada.
- C) No comunicas nada mientras el FMS siga mostrando la trayectoria.
- D) Solicitas vectores sin mencionar la falla.
**Correcta:** B · **Tema:** P06 · **Referencia:** FAA AC 90-100A, numeral 10, apartado d
**Explicación:** La circular da el ejemplo con esas tres piezas: falla del sistema GPS/GNSS, *unable RNAV* y solicitud de autorización enmendada. El piloto debe notificar al ATC cualquier pérdida de la capacidad RNAV junto con el curso de acción propuesto.

---

## 7. RNP: EL CONTROL Y LA ALERTA A BORDO

**ID:** P07 · **Tiempo:** 8 min

### Concepto

Required Navigation Performance. Este capítulo es el corazón del módulo, y se resume en una ecuación que hay que poder escribir en una pizarra en una entrevista:

```
RNAV  =  navegación de área
RNP   =  navegación de área
       +  control de la performance a bordo
       +  alerta a la tripulación
```

El RAC 91 lo define así: especificación para la navegación basada en la navegación de área **que incluye el requisito de control y alerta de la performance**, designada con el prefijo RNP; por ejemplo, RNP 4, RNP APCH.

En inglés el término es *on-board performance monitoring and alerting* (OBPMA), y así aparece en la documentación de la FAA y del fabricante.

### Lo que debe saber el piloto

Lo que añade RNP no es precisión: es **autoconciencia**. El sistema no solo calcula dónde está; también determina si puede satisfacer la performance necesaria y avisa a la tripulación cuando ya no puede garantizarla.

La consecuencia operacional es enorme y el AIM la explica bien: esa capacidad permite depender menos de la intervención del ATC y de la separación procedimental para conseguir la seguridad de la operación. Si el avión avisa cuando se sale del margen, el margen puede ser más estrecho.

#### Lo que no significa

No significa que el avión avise de todo. Un sistema de control y alerta responde a los criterios para los que fue diseñado. Hay degradaciones que no disparan una alerta de performance, y el caso más incómodo, que tiene su propio capítulo, es la suplantación de señal: la FAA advierte que el RAIM es solo parcialmente efectivo frente a ella y que el piloto puede no darse cuenta de que las indicaciones son erróneas.

### En operación de aerolínea

En crucero y en aproximación, el control y alerta se manifiesta de dos maneras: un valor que se puede comparar (la performance requerida frente a la estimada, que se ve en el capítulo correspondiente) y un mensaje o una bandera cuando el sistema concluye que no llega.

Lo que la tripulación hace con ese mensaje es lo que separa una operación profesional de un susto: reconocerlo, contrastar la posición, aplicar el QRH y el SOP, determinar qué capacidad queda e informar al ATC.

### ¿Qué debe verificar?

- Que la especificación que pide el procedimiento es RNP y no RNAV, porque las exigencias no son las mismas.
- Que el avión es elegible para esa especificación RNP concreta.
- Que se sabe dónde se presenta el aviso en esta flota y qué dice el QRH al respecto.

### ¿Qué ocurre si no se cumple?

Si el control y alerta no está disponible, no se cumple la especificación RNP, aunque la precisión sea buena. La precisión sin alerta es RNAV, no RNP.

### Comunicación ATC

La pérdida de capacidad RNP se comunica al ATC junto con el curso de acción propuesto. La circular de la FAA es explícita para todas las especificaciones RNP que cubre: el piloto debe notificar al ATC cualquier pérdida de la capacidad RNP y, si no puede cumplir los requisitos del procedimiento, debe avisar al servicio de tránsito aéreo lo antes posible.

### Error frecuente

«RNP es más preciso que RNAV.» No es la diferencia. La diferencia es el control y la alerta. Puede haber una especificación RNAV con un número menor que una RNP y seguir sin ser RNP, porque le falta el requisito que define la familia.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Dos columnas de la misma altura, con la misma trayectoria dibujada arriba en las dos. Columna izquierda, cabecera «RNAV», con una sola caja debajo: «Navigation capability». Columna derecha, cabecera «RNP», con tres cajas apiladas: «Navigation capability», «On-board performance monitoring» y «Alerting», la tercera resaltada en el color del módulo y con un icono de aviso. Al pie, centrado entre las dos, el texto «la diferencia no es el número: es el aviso».

OBJETIVO:
Que el estudiante recuerde inmediatamente que lo que añade RNP es el control de la performance a bordo y la alerta a la tripulación, no una precisión mayor.

### En pocas palabras

- RNP es navegación de área más control de la performance a bordo más alerta a la tripulación.
- El RAC 91 lo define con esas palabras: incluye el requisito de control y alerta de la performance.
- La consecuencia operacional es depender menos de la intervención del ATC y de la separación procedimental.
- Precisión sin alerta no es RNP.

### Quiz · Capítulo 7

**p07-q1** · ¿Qué añade RNP sobre RNAV?
- A) Una precisión lateral menor.
- B) El requisito de control de la performance a bordo y de alerta a la tripulación.
- C) La obligación de usar GNSS como única fuente.
- D) La obligación de volar con piloto automático acoplado.
**Correcta:** B · **Tema:** P07 · **Referencia:** RAC 91, definición de especificación para la performance de navegación requerida (RNP)
**Explicación:** Es lo único que separa las dos familias en la definición de la norma. El resto (fuentes admitidas, uso del piloto automático, valores) depende de cada especificación concreta y de la carta, no de la familia.

**p07-q2** · ¿Cuál es la consecuencia operacional del control y alerta a bordo?
- A) Que el piloto puede desviarse de la trayectoria sin autorización.
- B) Que permite depender menos de la intervención del ATC y de la separación procedimental.
- C) Que el avión corrige automáticamente cualquier error de posición.
- D) Que deja de ser necesario vigilar la desviación lateral.
**Correcta:** B · **Tema:** P07 · **Referencia:** FAA AIM 1-2-1, apartado general de RNP
**Explicación:** Si el avión sabe cuándo deja de cumplir y lo dice, se puede reducir la dependencia de que el controlador lo detecte y del margen procedimental. Nada de eso releva al piloto de vigilar la desviación ni convierte el sistema en autocorrector.

**p07-q3** · Un compañero afirma que con el control y alerta a bordo el avión avisará de cualquier error de posición. ¿Qué le falta?
- A) Nada: el sistema detecta todo error de posición.
- B) Que el control y alerta responde a los criterios para los que fue diseñado, y hay degradaciones que no disparan alerta, como la suplantación de señal.
- C) Que el aviso solo funciona con el piloto automático acoplado.
- D) Que el aviso solo se presenta en la fase de aproximación.
**Correcta:** B · **Tema:** P07 · **Referencia:** FAA AIM 1-1-19, apartado sobre disrupciones de GPS y suplantación
**Explicación:** La FAA advierte que frente a una disrupción que actúa como suplantación de señal el RAIM es solo parcialmente efectivo y el piloto puede no advertir indicaciones erróneas de navegación. Por eso el contraste de posición sigue siendo trabajo de la tripulación.

---

## 8. RNAV FRENTE A RNP

**ID:** P08 · **Tiempo:** 7 min

### Concepto

La comparación, en la terminología de la norma:

| | RNAV | RNP |
|---|---|---|
| Base | Navegación de área | Navegación de área |
| Requisito de performance | Sí | Sí |
| Control y alerta de la performance a bordo | **No** | **Sí** |
| Prefijo del designador | RNAV | RNP |
| Ejemplos | RNAV 5, RNAV 1 | RNP 4, RNP APCH |

### Lo que debe saber el piloto

Hay una idea que el AIM insiste en corregir y que en entrevista vale mucho: las especificaciones deben considerarse **distintas entre sí, no mejores ni peores** por la precisión lateral que describen.

De ahí sale la consecuencia que más se falla: **RNP 1 no es lo mismo que RNAV 1**, y ser elegible para RNP 1 **no** implica automáticamente ser elegible para RNP 2 ni para RNAV 1. Por eso la elegibilidad de cada especificación se lista por separado en la documentación de aviónica o en el AFM.

#### El cambio de significado del término RNP

Una nota del RAC 91 que conviene conocer porque explica documentación antigua: el término RNP, definido antes como «declaración de la performance de navegación necesaria para operar dentro de un espacio aéreo definido», fue **reemplazado por el concepto de PBN**. Hoy RNP se usa solo en el contexto de especificaciones de navegación que requieren control y alerta de la performance.

Es decir: si en un manual viejo se lee «RNP» como si fuera el concepto general, es lenguaje anterior. El concepto general hoy se llama PBN.

### En operación de aerolínea

La diferencia se vuelve tangible en dos sitios:

- **En la carta.** Un procedimiento que exige RNP y otro que exige RNAV piden capacidades distintas, y hay que buscar cuál es en las notas o en el recuadro PBN.
- **En la MEL.** Una falla puede dejar intacta la capacidad RNAV y quitar la RNP, porque lo que se pierde es el control y la alerta.

### ¿Qué debe verificar?

Que se lee el prefijo, no solo el número. «1» no dice nada por sí solo: RNAV 1 y RNP 1 son especificaciones distintas con elegibilidades distintas.

### Error frecuente

«RNAV 1 es más preciso que RNP 1 porque ambos tienen 1.» La frase se contradice sola y aparece en entrevistas. El número es el mismo porque describen la misma precisión lateral; lo que las separa es que RNP 1 exige control y alerta a bordo.

### En pocas palabras

- La única diferencia de familia es el control y alerta de la performance a bordo.
- Las especificaciones son distintas entre sí, no mejores ni peores por su número.
- Ser elegible para RNP 1 no implica ser elegible para RNP 2 ni para RNAV 1.
- El término RNP dejó de ser el concepto general: hoy el concepto general es PBN.

### Quiz · Capítulo 8

**p08-q1** · ¿Es correcto decir que RNAV 1 y RNP 1 son equivalentes?
- A) Sí: el número indica la misma precisión, así que son intercambiables.
- B) No: son especificaciones distintas y la elegibilidad para una no implica la elegibilidad para la otra.
- C) Sí, siempre que el avión tenga GNSS.
- D) No, porque RNAV 1 solo se aplica en ruta y RNP 1 solo en terminal.
**Correcta:** B · **Tema:** P08 · **Referencia:** FAA AIM 1-2-1, apartado general de RNP
**Explicación:** El AIM lo dice expresamente: RNP 1 es distinto de RNAV 1, y una elegibilidad RNP 1 no significa elegibilidad automática para RNP 2 ni para RNAV 1. Por eso cada especificación se lista por separado en la documentación del avión.

**p08-q2** · Según la norma, ¿qué le pasó al término RNP como concepto general?
- A) Sigue siendo el concepto general que engloba RNAV.
- B) Fue reemplazado por el concepto de PBN, y hoy RNP solo se usa para especificaciones con control y alerta de la performance.
- C) Se reservó para operaciones oceánicas.
- D) Se eliminó y ahora todo se llama RNAV.
**Correcta:** B · **Tema:** P08 · **Referencia:** RAC 91, nota 2 a la definición de especificación para la navegación
**Explicación:** La nota es literal: el término RNP, antes definido como declaración de la performance de navegación necesaria para operar en un espacio aéreo definido, fue reemplazado por el concepto de PBN, y ahora se usa solo en el contexto de especificaciones que requieren control y alerta.

**p08-q3** · ¿Cómo hay que comparar dos especificaciones de navegación?
- A) Por su número: a menor número, mejor especificación.
- B) Como especificaciones distintas entre sí, no mejores ni peores por la precisión lateral que describen.
- C) Por la cantidad de sensores que admiten.
- D) Por la fase de vuelo en que se aplican, únicamente.
**Correcta:** B · **Tema:** P08 · **Referencia:** FAA AIM 1-2-1, apartado general de RNP
**Explicación:** El AIM pide tratarlas como diferentes, no como mejores o peores, y de ese principio se deriva que cada elegibilidad tenga que constar por separado. Ordenarlas por número lleva directamente al error de suponer capacidades que el avión no tiene.

---

## 9. QUÉ SIGNIFICA EL NÚMERO

**ID:** P09 · **Tiempo:** 8 min

### Concepto

Este capítulo se lee dos veces. Es el que más se pregunta y el que peor se contesta.

Para las especificaciones RNP y RNAV, **la designación numérica se refiere a la precisión de navegación lateral en millas náuticas que se espera conseguir al menos el 95 % del tiempo de vuelo** por la población de aeronaves que operan en ese espacio aéreo, ruta o procedimiento.

Tres piezas, y las tres hacen falta para que la respuesta sea correcta:

- **Precisión lateral**, en millas náuticas.
- **Al menos el 95 % del tiempo de vuelo.**
- **Por la población de aeronaves** que opera ahí, no por un avión concreto en un instante concreto.

### Lo que debe saber el piloto

La FAA lo expresa además en términos de error total del sistema, y así es más fácil de decir en una entrevista: en RNAV 1, la aeronave debe mantener un error total del sistema no mayor de 1 NM el 95 % del tiempo total de vuelo; en RNAV 2, no mayor de 2 NM.

#### La formulación incorrecta que hay que evitar

«RNP 1 significa que puedo desviarme una milla.» Está mal por tres razones, y conviene tenerlas separadas:

1. No es un permiso de desviación. Es un requisito de performance del sistema, no una tolerancia de pilotaje.
2. No es un límite duro. Es un valor que se espera conseguir al menos el 95 % del tiempo.
3. No habla de un avión individual autorizándose a sí mismo, sino de la performance de la población de aeronaves que opera ahí.

Y una cuarta, operacional: de todas formas la expectativa es **mantener el eje**. La FAA lo dice para todas las operaciones RNP que cubre: se espera que todos los pilotos mantengan la línea central, según la indican los indicadores de desviación lateral o la guía de vuelo, salvo autorización del ATC para desviarse o condiciones de emergencia.

### En operación de aerolínea

El número tiene un efecto directo sobre lo que el piloto ve: en sistemas con escalado, la sensibilidad de la indicación de desviación lateral cambia con el valor aplicable. Una desviación que en ruta es pequeña en la pantalla, en final puede ocupar media escala.

### ¿Qué debe verificar?

Qué valor aplica al **segmento** que se está volando, no al procedimiento en general. En una misma aproximación el valor cambia entre la aproximación inicial, la final y la frustrada.

### Error frecuente

Dos, y los dos son de entrevista:

- Dar el número sin el 95 %. La respuesta queda incompleta y se nota.
- Traducir el número a una tolerancia de pilotaje. La tolerancia de pilotaje es mantener el eje; el número es un requisito de performance del sistema.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Vista en planta de un tramo de ruta. En el centro, la derrota publicada como línea magenta continua rotulada «CENTERLINE». A cada lado, una franja simétrica delimitada con línea de puntos y acotada con una flecha doble rotulada «1 NM» sobre el lado derecho y «1 NM» sobre el izquierdo, con el rótulo general «RNP 1» arriba. Una silueta de avión ligeramente descentrada dentro de la franja, con una flecha corta que la une a la derrota rotulada «posición real». Al pie, en un recuadro, la frase «el valor es un requisito de performance del sistema, conseguido al menos el 95 % del tiempo; la expectativa operacional sigue siendo mantener el eje».

OBJETIVO:
Visualizar qué representa el número dentro de una especificación, y dejar por escrito en la misma figura que no es una autorización para desviarse.

### En pocas palabras

- El número es la precisión de navegación lateral en millas náuticas.
- Se espera conseguirla al menos el 95 % del tiempo de vuelo.
- Se refiere a la población de aeronaves que opera en ese espacio aéreo, ruta o procedimiento.
- No es un permiso de desviación: la expectativa operacional es mantener el eje.

### Quiz · Capítulo 9

**p09-q1** · ¿Qué significa el número en RNP 1?
- A) Que la aeronave puede desviarse hasta 1 NM del eje.
- B) Que el error lateral nunca excede 1 NM.
- C) La precisión de navegación lateral en millas náuticas que se espera conseguir al menos el 95 % del tiempo de vuelo.
- D) Que la anchura del espacio aéreo protegido es de 1 NM.
**Correcta:** C · **Tema:** P09 · **Referencia:** FAA AIM 1-2-1; FAA AC 90-101A, numeral 3, definición de RNP
**Explicación:** Es la definición completa, y las tres piezas cuentan: precisión lateral, en millas náuticas, conseguida al menos el 95 % del tiempo de vuelo. No es un permiso de desviación ni un límite que nunca se excede.

**p09-q2** · Según la FAA, ¿qué error debe mantener una aeronave en RNAV 2?
- A) Un error total del sistema no mayor de 2 NM el 95 % del tiempo total de vuelo.
- B) Un error lateral no mayor de 2 NM en ningún momento.
- C) Un error de 2 NM respecto de la posición GNSS.
- D) Un error técnico de vuelo no mayor de 2 NM.
**Correcta:** A · **Tema:** P09 · **Referencia:** FAA AIM 1-2-1, apartado de especificaciones RNAV
**Explicación:** El AIM lo formula así para RNAV 1 y RNAV 2: error total del sistema no mayor de 1 y de 2 NM respectivamente, el 95 % del tiempo total de vuelo. El error total del sistema no es lo mismo que el error técnico de vuelo, que es solo una de sus componentes.

**p09-q3** · Aunque el valor de la especificación sea 1 NM, ¿qué se espera del piloto?
- A) Mantenerse dentro de 1 NM del eje, sin más exigencia.
- B) Mantener el eje según los indicadores de desviación lateral o la guía de vuelo, salvo autorización del ATC o emergencia.
- C) Volar el 95 % del tiempo dentro de 1 NM y el resto libremente.
- D) Corregir solo cuando el sistema alerte.
**Correcta:** B · **Tema:** P09 · **Referencia:** FAA AC 90-105A, numeral 6.2
**Explicación:** La expectativa operacional es mantener la línea central, según la indican los indicadores de desviación lateral o la guía de vuelo, en todas las operaciones RNP que cubre la circular, salvo autorización del ATC para desviarse o condiciones de emergencia. El valor de la especificación no es una banda de trabajo.

---

## 10. EL CATÁLOGO DE ESPECIFICACIONES

**ID:** P10 · **Tiempo:** 8 min

### Concepto

Las especificaciones que un piloto de aerolínea necesita reconocer, agrupadas por familia.

#### Especificaciones RNAV

| Especificación | Uso principal |
|---|---|
| RNAV 10 | Oceánico y remoto continental |
| RNAV 5 | En ruta |
| RNAV 2 | En ruta |
| RNAV 1 | Terminal: SID y STAR, y en ruta cuando corresponda |

#### Especificaciones RNP

| Especificación | Uso principal |
|---|---|
| RNP 4 | Oceánico y remoto continental |
| RNP 2 | En ruta, doméstico y oceánico o remoto continental |
| RNP 1 | Terminal: llegada y salida, e inicial e intermedia de aproximación |
| A-RNP | Especificación avanzada, con funciones obligatorias y valores escalables |
| RNP APCH | Aproximación |
| RNP AR APCH | Aproximación con autorización requerida |

Existe además RNP 0.3, que en el marco de la FAA se aplica inicialmente a operaciones de helicóptero y no está autorizado para espacio oceánico, remoto ni para el segmento de aproximación final. Para un piloto de avión de transporte es un dato de contexto, no una especificación que vaya a volar.

### Lo que debe saber el piloto

La tabla de aplicaciones de la FAA (AC 90-105A, Tabla 5-1) da el valor RNP por fase de vuelo, y vale la pena conocer tres lecturas suyas:

- **RNP 1** aplica valor 1 en llegada, aproximación inicial, intermedia, frustrada y salida. En la aproximación final no aplica.
- **RNP APCH** aplica valor 1 en la aproximación inicial e intermedia, **0.3 en la final** y vuelve a 1 en la frustrada.
- **A-RNP** admite escalado: valor 2 en oceánico y remoto, 2 o 1 en ruta doméstica, y un rango de 1 a 0.3 en llegada, inicial, intermedia, salida y frustrada.

La forma de recordarlo es geométrica: los márgenes se estrechan a medida que el avión se acerca a la pista y se vuelven a abrir en la frustrada.

### En operación de aerolínea

Nadie memoriza la tabla para volar: se lee la carta. Se memoriza para la entrevista y para tener el criterio de si lo que la carta pide es razonable y qué se necesita para cumplirlo.

Lo que sí hay que tener claro en cabina es que **el valor cambia dentro del mismo procedimiento**. Un avión que cumple con holgura en la inicial puede quedarse corto en la final, donde el margen es 0.3.

### ¿Qué debe verificar?

- Qué especificación pide el procedimiento.
- Qué valor aplica al segmento en curso.
- Si la elegibilidad del avión cubre esa especificación, con las funciones que el procedimiento exija.

### Error frecuente

«RNP solo se usa en aproximaciones.» La tabla lo desmiente: hay RNP en ruta doméstica, en oceánico, en llegada y en salida. Y la inversa también se oye: «en aproximación todo es RNP APCH», ignorando que una aproximación convencional puede llevar segmentos PBN, como una frustrada RNAV, y que en ese caso la capacidad exigida aparece en el recuadro PBN de la carta.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Tabla gráfica de doble entrada. Filas: RNAV 10, RNAV 5, RNAV 2, RNAV 1, RNP 4, RNP 2, RNP 1, A-RNP, RNP APCH. Columnas: Oceánico y remoto · En ruta doméstico · Llegada · Inicial · Intermedia · Final · Frustrada · Salida. Las celdas aplicables llevan el valor (10, 5, 4, 2, 1, «1 a 0.3», 0.3) sobre fondo en el color del módulo; las no aplicables van en gris claro con un guion. Debajo, una franja con el perfil de una aproximación en la que se vea cómo la anchura de la franja protegida se estrecha de la inicial a la final y se vuelve a abrir en la frustrada.

OBJETIVO:
Que el piloto vea el catálogo completo y, sobre todo, que entienda que el valor no es del procedimiento sino del segmento.

### En pocas palabras

- RNAV: 10, 5, 2, 1. RNP: 4, 2, 1, A-RNP, RNP APCH y RNP AR APCH.
- El valor RNP cambia por fase de vuelo dentro del mismo procedimiento.
- En RNP APCH: 1 en inicial e intermedia, 0.3 en final, 1 en la frustrada.
- A-RNP escala entre 1 y 0.3 en terminal, y usa 2 en oceánico y remoto.

### Quiz · Capítulo 10

**p10-q1** · En RNP APCH, ¿qué valor aplica al segmento de aproximación final?
- A) 1
- B) 0.5
- C) 0.3
- D) 0.1
**Correcta:** C · **Tema:** P10 · **Referencia:** FAA AC 90-105A, numeral 5.1 y Tabla 5-1
**Explicación:** RNP APCH tiene valor 1 hasta el segmento final, donde los márgenes se estrechan a 0.3, y vuelve a 1 en la frustrada. Es el ejemplo más claro de que el valor pertenece al segmento y no al procedimiento.

**p10-q2** · ¿Cuál de estas afirmaciones sobre A-RNP es correcta?
- A) Es una especificación exclusiva de aproximación.
- B) Admite valor 2 en oceánico y remoto, 2 o 1 en ruta doméstica y un rango de 1 a 0.3 en los segmentos de terminal.
- C) Tiene un valor fijo de 1 en todas las fases.
- D) Solo se aplica en espacio aéreo oceánico.
**Correcta:** B · **Tema:** P10 · **Referencia:** FAA AC 90-105A, numeral 5.1 y Tabla 5-1
**Explicación:** Lo distintivo de A-RNP es el escalado: los límites se van abriendo desde 0.3 hacia valores mayores en salidas y frustradas, y se estrechan en llegadas y aproximaciones. Es una especificación de varias fases, no solo de aproximación.

**p10-q3** · «RNP solo se usa en aproximaciones.» ¿Por qué es falso?
- A) Porque RNP también se usa en rodaje.
- B) Porque hay especificaciones RNP para ruta doméstica, oceánico y remoto, llegada y salida.
- C) Porque RNP es un concepto general que engloba RNAV.
- D) Porque en aproximación se usa exclusivamente RNAV.
**Correcta:** B · **Tema:** P10 · **Referencia:** FAA AC 90-105A, Tabla 5-1
**Explicación:** RNP 2 se aplica en ruta doméstica y oceánica, RNP 4 en oceánico y remoto, y RNP 1 en llegada, salida y los segmentos inicial e intermedio de aproximación. Reducir RNP a la aproximación es uno de los errores de entrevista más frecuentes.

---

## 11. CÓMO SÉ SI MI AVIÓN PUEDE

**ID:** P11 · **Tiempo:** 7 min

### Concepto

La pregunta práctica de todo el módulo. Se contesta en tres capas, y hay que recorrerlas en orden porque cada una puede negar lo que la anterior concedió.

#### Capa 1: elegibilidad de la aeronave

La documentación del avión. El RAC 91 exige que la aeronave cuente con información relativa a las capacidades de especificación de navegación **enumeradas en el manual de vuelo o en otra documentación de la aeronave** aprobada por el Estado de diseño o por la UAEAC. El AIM dice lo mismo desde el lado del piloto: el AFM o los documentos de aviónica deben declarar específicamente las elegibilidades RNP del avión, y si esa información falta o está incompleta, hay que contactar al fabricante.

#### Capa 2: autorización del operador

El RAC 121 es directo: el explotador **deberá estar autorizado por la UAEAC** para realizar las operaciones en cuestión. Y para las especificaciones con autorización obligatoria (AR), la autoridad emite una aprobación específica.

#### Capa 3: estado de hoy

La MEL y la infraestructura. El RAC 91 y el RAC 121 exigen que la información sobre las capacidades de especificación de navegación del avión **esté incluida en la MEL**. Y la disponibilidad de la infraestructura necesaria debe confirmarse para el periodo de la operación con toda la información disponible.

### Lo que debe saber el piloto

Las tres capas responden a tres preguntas distintas que se confunden todo el tiempo:

| Pregunta | Dónde se contesta |
|---|---|
| ¿Este avión es elegible? | AFM o documentación de aviónica |
| ¿Mi operador está autorizado? | Especificaciones de operación |
| ¿Hoy se puede? | MEL, NOTAM y lo que indique el avión |

Y hay una cuarta, la que más se olvida: **¿tengo la funcionalidad?** Un avión elegible para RNP APCH puede no poder volar un tramo RF, porque en esa especificación la capacidad RF es opcional.

### En operación de aerolínea

La tripulación no lee el AFM en la puerta de embarque. Lo que hace es apoyarse en lo que el operador ya resolvió: las especificaciones de operación dicen qué está autorizado, la MEL dice qué queda con el equipo despachado, y el SOP dice cómo verificarlo. El criterio del piloto entra cuando algo no encaja.

### ¿Qué debe verificar?

- Qué pide la carta, incluidas las funciones (tramo RF, escalado, guía vertical).
- Qué dice la MEL sobre la capacidad con el equipo que se lleva.
- Qué dicen los NOTAM sobre la infraestructura necesaria.

### ¿Qué ocurre si no se cumple?

Si cualquiera de las capas falla, el procedimiento no se puede volar. Y hay que decirlo antes, no durante.

### Error frecuente

«Si el avión es despachable por MEL mantiene todas sus capacidades PBN.» Falso, y es justamente el motivo por el que la norma exige que la MEL lleve la información de capacidad de navegación: un avión puede quedar aeronavegable y despachable, y perder una capacidad PBN concreta.

### En pocas palabras

- Tres capas: elegibilidad de la aeronave, autorización del operador y estado de hoy.
- La elegibilidad está en el AFM o en la documentación de aviónica, por especificación.
- El explotador debe estar autorizado; las especificaciones AR llevan aprobación específica.
- La MEL debe incluir la información de capacidad de especificación de navegación.

### Quiz · Capítulo 11

**p11-q1** · ¿Dónde consta si la aeronave es elegible para una especificación de navegación?
- A) En la base de datos del FMS.
- B) En el manual de vuelo o en otra documentación de la aeronave aprobada por el Estado de diseño o la autoridad.
- C) En el plan operacional de vuelo.
- D) En la carta del procedimiento.
**Correcta:** B · **Tema:** P11 · **Referencia:** RAC 91, numeral 91.1015, apartado (a)(2); FAA AIM 1-2-1
**Explicación:** La norma exige que la aeronave cuente con esa información enumerada en el manual de vuelo o en otra documentación aprobada, y el AIM añade que si falta o está incompleta hay que contactar al fabricante de la aviónica o de la aeronave. La carta dice qué se exige, no qué tiene el avión.

**p11-q2** · Según el RAC 121, ¿qué hace falta además de que el avión esté equipado?
- A) Nada más: el equipo determina la capacidad.
- B) Que el explotador esté autorizado por la autoridad para realizar esas operaciones.
- C) Que el ATC confirme la capacidad en el primer contacto.
- D) Que el procedimiento aparezca en la base de datos.
**Correcta:** B · **Tema:** P11 · **Referencia:** RAC 121, numeral 121.995, apartado (b)(3) y (b)(4)
**Explicación:** El explotador debe estar autorizado por la UAEAC, y para las especificaciones con autorización obligatoria (AR) la autoridad emite una aprobación específica. Tener el equipo y estar autorizado son dos cosas distintas.

**p11-q3** · ¿Qué información sobre PBN debe contener la MEL según la norma?
- A) El valor RNP de cada procedimiento del destino.
- B) La información relativa a las capacidades de especificación de navegación de la aeronave.
- C) La lista de satélites disponibles.
- D) El ciclo AIRAC vigente.
**Correcta:** B · **Tema:** P11 · **Referencia:** RAC 91, numeral 91.1015, apartado (a)(3); RAC 121, numeral 121.995, apartado (b)(1)(iii)
**Explicación:** Las dos normas exigen que, cuando la aeronave se opere de acuerdo con la MEL, se cuente con la información relativa a las capacidades de especificación de navegación incluidas en ella. Es la prueba normativa de que un avión despachable puede haber perdido una capacidad PBN.

---

# BLOQUE 3 · LAS ESPECIFICACIONES, UNA POR UNA

---

## 12. RNAV 5

**ID:** P12 · **Tiempo:** 5 min

### Concepto

Especificación RNAV de **ruta**, con precisión lateral de 5 NM. Es la más holgada de las que un piloto de aerolínea se encuentra en espacio continental, y por eso es también la que admite más fuentes de posición.

### Lo que debe saber el piloto

Los códigos de la casilla 18 del plan de vuelo OACI dicen, mejor que ningún texto, qué se admite en RNAV 5:

| Código | Significado |
|---|---|
| B1 | RNAV 5 con todos los sensores permitidos |
| B2 | RNAV 5 con GNSS |
| B3 | RNAV 5 con DME/DME |
| B4 | RNAV 5 con VOR/DME |
| B5 | RNAV 5 con INS o IRS |
| B6 | RNAV 5 con LORAN C |

Esa lista es lo que hace a RNAV 5 distinta del resto: es la única de la familia donde VOR/DME y los sistemas inerciales aparecen como fuentes declarables por sí solas. Operacionalmente significa que una pérdida de GNSS no necesariamente quita la capacidad RNAV 5, mientras haya otra fuente admitida y declarada.

**Verificar:** dónde se aplica RNAV 5 dentro de una FIR concreta se publica en el AIP de ese Estado, en la parte de ruta. Las circulares de la FAA que sirven de base a este módulo no cubren RNAV 5, porque en el espacio aéreo estadounidense la especificación de ruta que se aplica es RNAV 2. No hay que dar por hecho que lo que aplica en un espacio aplica en otro.

### En operación de aerolínea

Aparece en planificación: la ruta exige la especificación y el despacho declara la capacidad en el plan de vuelo. En cabina no suele pedir nada especial más allá de vigilar la trayectoria, precisamente porque el margen es amplio.

### ¿Qué debe verificar?

- Que la capacidad declarada en el plan corresponde a lo que el avión tiene hoy.
- Qué fuente de posición está usando el sistema si se perdió alguna.

### ¿Qué ocurre si no se cumple?

Se notifica al ATC y se solicita una autorización alternativa, como en cualquier pérdida de capacidad RNAV.

### Error frecuente

Suponer que RNAV 5 es «RNAV pero peor». No es peor: es una especificación distinta, para una fase distinta, con una infraestructura distinta. El principio del capítulo 8 se aplica también aquí.

### En pocas palabras

- RNAV 5 es especificación de ruta, con precisión lateral de 5 NM.
- Es la que admite más fuentes: GNSS, DME/DME, VOR/DME, INS o IRS, y LORAN C.
- Perder GNSS no necesariamente quita la capacidad, si hay otra fuente admitida.
- Dónde aplica se publica en el AIP del Estado, no se deduce.

### Quiz · Capítulo 12

**p12-q1** · ¿Qué distingue a RNAV 5 del resto de la familia RNAV en cuanto a fuentes de posición?
- A) Que solo admite GNSS.
- B) Que admite VOR/DME e inerciales como fuentes declarables por sí solas, además de GNSS y DME/DME.
- C) Que no admite DME/DME.
- D) Que exige dos sistemas independientes.
**Correcta:** B · **Tema:** P12 · **Referencia:** OACI PANS-ATM, Apéndice 2, códigos `PBN/` B1 a B6
**Explicación:** Los códigos del plan de vuelo listan para RNAV 5 todos los sensores permitidos, GNSS, DME/DME, VOR/DME, INS o IRS, y LORAN C. Esa amplitud es lo característico de la especificación, y tiene consecuencia operacional ante una pérdida de GNSS.

**p12-q2** · ¿Dónde se comprueba si RNAV 5 aplica en una FIR concreta?
- A) En el AFM del avión.
- B) En las circulares de la FAA.
- C) En el AIP del Estado correspondiente.
- D) En la base de datos del FMS.
**Correcta:** C · **Tema:** P12 · **Referencia:** RAC 211, apéndice de designadores de rutas ATS; práctica estándar de publicación AIP
**Explicación:** Qué especificación se prescribe en un espacio aéreo lo publica el Estado en su AIP. Las circulares de la FAA no cubren RNAV 5 porque en su espacio aéreo la especificación de ruta aplicable es RNAV 2: es un buen recordatorio de que los criterios de una autoridad no son universales.

**p12-q3** · Pierdes GNSS en ruta volando con capacidad RNAV 5 declarada y el sistema sigue posicionando por DME/DME. ¿Qué corresponde?
- A) Declarar *unable RNAV* de inmediato.
- B) Determinar si la fuente que queda es admitida y declarada para la especificación, y actuar en consecuencia.
- C) Descender por debajo del nivel de vuelo más bajo de la ruta.
- D) Nada: RNAV 5 no exige fuente determinada.
**Correcta:** B · **Tema:** P12 · **Referencia:** OACI PANS-ATM, Apéndice 2, códigos `PBN/` B1 a B6; FAA AC 90-100A, numeral 10, apartado d
**Explicación:** La pregunta correcta es si queda una fuente admitida para esa especificación y declarada como capacidad. Si la hay, puede que la capacidad se conserve; si no, se notifica al ATC. Declarar una incapacidad que no existe también es un error.

---

## 13. RNAV 1 Y RNAV 2

**ID:** P13 · **Tiempo:** 7 min

### Concepto

Las dos especificaciones RNAV que más se vuelan en operación regular.

- **RNAV 1**: típicamente en salidas y llegadas normalizadas, y así aparece en las cartas. La aeronave debe mantener un error total del sistema no mayor de **1 NM el 95 % del tiempo total de vuelo**.
- **RNAV 2**: típicamente en ruta, salvo que se especifique otra cosa. Error total del sistema no mayor de **2 NM el 95 % del tiempo total de vuelo**.

### Lo que debe saber el piloto

#### Cómo se reconoce que un procedimiento exige RNAV 1

Por la carta. En el espacio aéreo estadounidense, los requisitos PBN de un procedimiento se presentan en un **recuadro de notas normalizado**, el «recuadro PBN», que contiene la especificación del procedimiento y, cuando hace falta, los sensores o la infraestructura necesarios, los requisitos funcionales adicionales, el valor RNP mínimo y las observaciones. Lo que está en ese recuadro es **obligatorio** para volar los elementos PBN del procedimiento. Los requisitos de equipo en tierra o específicos del aeropuerto van en un recuadro aparte, de requisitos de equipo, y cuando hay los dos, el recuadro PBN va primero.

Ese formato de dos recuadros es de la FAA. En otras cartas la información puede presentarse en el bloque de notas del procedimiento, y hay que buscarla ahí.

#### Una exigencia de la salida que se pasa por alto

Para operaciones RNAV en salida hay un requisito de verificación de posición antes de rodar: la posición del avión debe quedar confirmada, y la circular de la FAA fija una tolerancia de 1.000 ft al comenzar la carrera de despegue, con la actualización de pista automática o manual como medio aceptable de cumplimiento. Y en aviones que usan GNSS, la señal debe estar adquirida **antes** de iniciar la carrera.

### En operación de aerolínea

RNAV 1 es el pan de cada día de la terminal: se carga la SID, se verifica, se despega y se sigue la trayectoria. RNAV 2 es la ruta.

Lo que cambia respecto de una SID convencional es que aquí la trayectoria la construye el FMS a partir de datos codificados, y eso obliga a la verificación que se ve en el capítulo 35.

### ¿Qué debe verificar?

- El recuadro PBN o las notas de la carta: qué especificación y qué funciones exige.
- La posición del avión antes de rodar, dentro de la tolerancia que fije el procedimiento del operador.
- Que la señal GNSS esté adquirida antes de iniciar la carrera, si se opera con GNSS.

### ¿Qué ocurre si no se cumple?

Sin la capacidad exigida no se vuela el procedimiento: hay que pedir otra autorización antes de salir, no después.

### Comunicación ATC

Si la capacidad se pierde en vuelo: notificar la pérdida junto con el curso de acción propuesto, con el formato del capítulo 6.

### Error frecuente

Creer que «RNAV 1» en la carta describe el avión. Describe **el procedimiento**: es lo que el procedimiento exige. Lo que el avión tiene está en otro documento.

[ESPACIO PARA IMAGEN ANOTADA]

IMAGEN BASE:
Recreación educativa de una carta de SID PBN, en planta, con una pista, cuatro waypoints con nombre de cinco letras, la derrota con sus rumbos, dos restricciones de altitud y una de velocidad, y en la esquina superior derecha dos recuadros apilados: el primero rotulado «PBN» y el segundo «EQUIPO REQUERIDO».

ANOTACIONES:
→ FLECHA 1: al recuadro PBN.
EXPLICACIÓN: aquí está la especificación que exige el procedimiento, y las funciones o sensores que hagan falta. Lo que está en este recuadro es obligatorio para volar los elementos PBN.
→ FLECHA 2: al segundo recuadro.
EXPLICACIÓN: los requisitos de equipo en tierra o específicos del aeropuerto van aparte. Cuando hay los dos, el recuadro PBN va primero.
→ FLECHA 3: a un waypoint con el símbolo de fly-by.
EXPLICACIÓN: el símbolo dice si el punto se sobrevuela o si el giro se anticipa. Cambia la trayectoria real del avión.
→ FLECHA 4: a la restricción de altitud.
EXPLICACIÓN: la restricción es parte del procedimiento y hay que verificarla cargada en el FMS, no solo leída en la carta.
→ FLECHA 5: a la derrota entre dos waypoints.
EXPLICACIÓN: la derrota publicada es la referencia contra la que se compara lo que muestra el FMS.

OBJETIVO PEDAGÓGICO:
Que el piloto sepa exactamente dónde mirar en una carta de SID PBN para encontrar la especificación exigida, y que no la confunda con los requisitos de equipo en tierra.

### En pocas palabras

- RNAV 1: terminal, error total del sistema no mayor de 1 NM el 95 % del tiempo. RNAV 2: ruta, 2 NM.
- En cartas de la FAA, los requisitos PBN van en un recuadro normalizado y son obligatorios.
- En salida hay que confirmar la posición del avión antes de rodar, y con GNSS la señal debe estar adquirida antes de la carrera.
- La especificación de la carta describe el procedimiento, no el avión.

### Quiz · Capítulo 13

**p13-q1** · ¿Qué contiene el recuadro PBN de una carta en el marco de la FAA?
- A) El equipo en tierra necesario en el aeropuerto.
- B) La especificación del procedimiento y, si hace falta, sensores, requisitos funcionales adicionales, valor RNP mínimo y observaciones.
- C) La lista de aeronaves autorizadas.
- D) Las frecuencias de los servicios de tránsito aéreo.
**Correcta:** B · **Tema:** P13 · **Referencia:** FAA AIM 1-2-3, representación de los requisitos PBN
**Explicación:** Es exactamente lo que el AIM enumera para ese recuadro, y añade que lo que figura ahí es obligatorio para volar los elementos PBN del procedimiento. El equipo en tierra va en un recuadro distinto, de requisitos de equipo.

**p13-q2** · Antes de iniciar la carrera de despegue en una salida RNAV con GNSS, ¿qué se exige?
- A) Nada especial: basta con tener el FMS inicializado.
- B) Que la señal GNSS esté adquirida antes de que comience la carrera, y que la posición del avión esté confirmada.
- C) Que se haya verificado el RAIM en el destino.
- D) Que el piloto automático esté acoplado.
**Correcta:** B · **Tema:** P13 · **Referencia:** FAA AC 90-100A, numeral 10, apartados c(3) y c(4)
**Explicación:** La circular exige confirmar la posición de la aeronave, con una tolerancia de 1.000 ft al comenzar la carrera y la actualización de pista como medio aceptable, y en aviones que usan GNSS, que la señal esté adquirida antes de iniciar la carrera.

**p13-q3** · La carta de una STAR dice «RNAV 1». ¿Qué está describiendo?
- A) La capacidad del avión que la va a volar.
- B) La precisión con que el piloto debe volar a mano.
- C) La especificación que el procedimiento exige.
- D) El valor de desviación lateral que el ATC tolera.
**Correcta:** C · **Tema:** P13 · **Referencia:** FAA AIM 1-2-1 y 1-2-3
**Explicación:** La carta dice qué exige el procedimiento. Lo que el avión tiene consta en el AFM o en la documentación de aviónica, y lo que el operador está autorizado a hacer, en las especificaciones de operación. Son tres documentos distintos.

---

## 14. RNP 1

**ID:** P14 · **Tiempo:** 7 min

### Concepto

Especificación RNP de terminal. Requiere un valor de precisión lateral de **1** en llegada y salida, y en las fases inicial e intermedia de aproximación cuando se usa en procedimientos convencionales con segmentos PBN: por ejemplo, un ILS con un tramo de alimentación, un punto de aproximación inicial o una frustrada de tipo PBN.

### Lo que debe saber el piloto

#### La diferencia con RNAV 1, otra vez

Mismo número, misma precisión lateral, distinta familia: RNP 1 incluye control y alerta de la performance a bordo y RNAV 1 no. Y la elegibilidad no se hereda: ser elegible para RNP 1 no da RNAV 1 ni RNP 2.

#### La trampa del tramo RF

La capacidad de volar un tramo RF es **opcional** en la elegibilidad RNP 1. Esto significa, con las palabras del AIM, que el avión puede ser elegible para operaciones RNP 1 y no poder volar un tramo RF salvo que los tramos RF estén específicamente listados como una característica del equipo de aviónica.

Es la razón por la que dos aviones de la misma flota, con la misma elegibilidad en el papel, pueden no poder volar el mismo procedimiento.

### En operación de aerolínea

RNP 1 aparece en SID y STAR de terminales exigentes y en segmentos PBN colgados de procedimientos convencionales. La consecuencia de cabina es que en esos procedimientos el avión vigila su propia performance, y por tanto **hay un aviso posible** que en una SID RNAV 1 no existiría.

Saber dónde se presenta ese aviso en la flota que se vuela es parte del trabajo, y está en el FCOM y en el QRH, no en la norma.

### ¿Qué debe verificar?

- Si el procedimiento pide RNP 1 o RNAV 1: no es lo mismo.
- Si el procedimiento incluye un tramo RF y si el avión lo tiene listado como capacidad.
- Qué indica el sistema sobre la performance durante el procedimiento.

### ¿Qué ocurre si no se cumple?

Si el avión no es elegible, o le falta la funcionalidad que el procedimiento exige, el procedimiento no se vuela. Si la capacidad se pierde en vuelo, se notifica al ATC con el curso de acción propuesto.

### Error frecuente

«Si soy RNP 1, soy RNAV 1 con holgura.» No: son elegibilidades separadas y se listan por separado. Y el error gemelo: suponer que un avión RNP 1 puede volar cualquier tramo RF.

### En pocas palabras

- RNP 1 exige precisión lateral de 1 en llegada, salida e inicial e intermedia de aproximación en procedimientos con segmentos PBN.
- Incluye control y alerta a bordo; RNAV 1 no.
- La capacidad de tramo RF es opcional: hay que verla listada como característica del equipo.
- Las elegibilidades no se heredan entre especificaciones.

### Quiz · Capítulo 14

**p14-q1** · En RNP 1, ¿qué ocurre con la capacidad de volar un tramo RF?
- A) Es obligatoria: todo avión RNP 1 puede volar un RF.
- B) Es opcional: hay que verificar que los tramos RF estén listados como característica del equipo.
- C) No existe: los tramos RF son exclusivos de RNP AR.
- D) Depende de la autorización del ATC en el momento.
**Correcta:** B · **Tema:** P14 · **Referencia:** FAA AIM 1-2-1, apartado RNP 1
**Explicación:** El AIM lo dice con esas palabras: el avión puede ser elegible para RNP 1 y no volar un tramo RF salvo que los RF estén específicamente listados como una característica del equipo de aviónica. En RNP AR, en cambio, la capacidad RF es obligatoria.

**p14-q2** · ¿En qué fases se aplica RNP 1?
- A) Solo en aproximación final.
- B) Solo en ruta.
- C) Llegada y salida en terminal, e inicial e intermedia de aproximación cuando se usa en procedimientos convencionales con segmentos PBN.
- D) En todas las fases, incluida la aproximación final.
**Correcta:** C · **Tema:** P14 · **Referencia:** FAA AIM 1-2-1, apartado RNP 1; FAA AC 90-105A, Tabla 5-1
**Explicación:** La tabla de aplicaciones marca RNP 1 en llegada, inicial, intermedia, frustrada y salida, y deja la final sin aplicar. El AIM añade el caso típico: un ILS con alimentador, IAF o frustrada de tipo PBN.

**p14-q3** · Dos aviones de la misma flota tienen elegibilidad RNP 1 y uno no puede volar una STAR con un tramo RF. ¿Qué explica la diferencia?
- A) Un error de la base de datos.
- B) Que la capacidad de tramo RF es una funcionalidad opcional que debe constar por separado.
- C) Que uno tiene el piloto automático inoperativo.
- D) Que uno declaró otra especificación en el plan de vuelo.
**Correcta:** B · **Tema:** P14 · **Referencia:** FAA AIM 1-2-1, apartados RNP 1 y RNP APCH
**Explicación:** La elegibilidad de la especificación y las funcionalidades opcionales se documentan por separado. El caso es exactamente el que el AIM previene, y es también un buen recordatorio de que en la base de datos puede no aparecer un procedimiento para el que el avión no es elegible.

---

## 15. RNP 2 Y RNP 4

**ID:** P15 · **Tiempo:** 6 min

### Concepto

Las dos especificaciones RNP de ruta.

- **RNP 2**: se aplica a operaciones **domésticas y oceánicas o remotas**, con valor de precisión lateral 2.
- **RNP 4**: se aplica **solo** a operaciones oceánicas y remotas, con valor 4.

### Lo que debe saber el piloto

Un detalle de elegibilidad que se pregunta y que ahorra confusión: **la elegibilidad RNP 4 confiere automáticamente la elegibilidad RNP 10.** Es una de las pocas herencias que existen, y precisamente por ser excepción hay que saberla, para no generalizarla: entre RNP 1, RNP 2, RNAV 1 y RNAV 2 no hay herencia alguna.

#### Qué cambia en oceánico y remoto

Lo que cambia no es el concepto, es el contexto: sin vigilancia radar continua y con comunicaciones que pueden no ser directas, el avión y la tripulación son la primera línea de detección. Por eso estas especificaciones suelen venir acompañadas de requisitos de continuidad, es decir, de redundancia de equipo.

Este módulo no es un módulo oceánico. Lo que el piloto necesita llevarse es esto: el valor es 2 o 4, la aplicación es de ruta, y la exigencia práctica se concentra en continuidad y en procedimientos de contingencia.

### En operación de aerolínea

En la planificación, la especificación de la ruta determina qué se declara en el plan de vuelo: `L1` para RNP 4. En vuelo, se vigila la trayectoria y se atiende cualquier aviso de performance.

### ¿Qué debe verificar?

- Qué especificación exige la ruta, según el AIP o la documentación de ruta del operador.
- Que la capacidad declarada corresponde al equipo de hoy.
- Los procedimientos de contingencia del operador para esa área.

### Comunicación ATC

Las tripulaciones deben avisar al ATC de cualquier deterioro o falla del equipo de navegación, y de cualquier desviación requerida por un procedimiento de contingencia. Esa obligación aparece expresamente en los apéndices de RNP 2 y RNP 4 de la circular de la FAA.

### Error frecuente

Tratar RNP 2 como «solo oceánico». Se aplica también a ruta doméstica. Y tratar RNP 4 como «RNP 2 con más margen»: son especificaciones distintas, con aplicaciones distintas.

### En pocas palabras

- RNP 2: ruta doméstica y oceánica o remota, valor 2.
- RNP 4: solo oceánica y remota, valor 4.
- La elegibilidad RNP 4 confiere automáticamente RNP 10. Es la excepción, no la regla.
- Hay que avisar al ATC de cualquier deterioro o falla del equipo de navegación.

### Quiz · Capítulo 15

**p15-q1** · ¿Dónde se aplica RNP 2?
- A) Solo en espacio oceánico y remoto.
- B) Solo en ruta doméstica.
- C) En ruta doméstica y en oceánico o remoto.
- D) En terminal y en aproximación inicial.
**Correcta:** C · **Tema:** P15 · **Referencia:** FAA AIM 1-2-1, apartado RNP 2; FAA AC 90-105A, Tabla 5-1
**Explicación:** RNP 2 se aplica tanto a operaciones domésticas como oceánicas o remotas, con valor 2. RNP 4 es la que queda restringida a oceánico y remoto.

**p15-q2** · ¿Qué elegibilidad confiere automáticamente la elegibilidad RNP 4?
- A) RNP 2.
- B) RNP 1.
- C) RNP 10.
- D) Ninguna.
**Correcta:** C · **Tema:** P15 · **Referencia:** FAA AIM 1-2-1, apartados RNP 4 y RNP 10
**Explicación:** El AIM lo dice expresamente: la elegibilidad RNP 4 confiere automáticamente la RNP 10, y toda aeronave elegible para RNP 10 se considera elegible para RNAV 10. Es la excepción a la regla general de que las elegibilidades no se heredan.

**p15-q3** · ¿Qué obligación de comunicación fija la circular de la FAA para las operaciones RNP 2 y RNP 4?
- A) Reportar la posición cada 30 minutos.
- B) Avisar al ATC de cualquier deterioro o falla del equipo de navegación y de las desviaciones que exija una contingencia.
- C) Confirmar la especificación en el contacto inicial de cada frecuencia.
- D) Ninguna: se comunica solo al aterrizar.
**Correcta:** B · **Tema:** P15 · **Referencia:** FAA AC 90-105A, apéndices de RNP 2 y RNP 4
**Explicación:** La obligación es doble y está en los apéndices de las dos especificaciones: se avisa el deterioro o la falla del equipo, y se avisa cualquier desviación que imponga una contingencia. Lo que no se hace es guardarlo para el reporte de aterrizaje.

---

## 16. RNAV 10 Y A-RNP

**ID:** P16 · **Tiempo:** 7 min

### Concepto

Las dos especificaciones que más confunden, cada una por su motivo: una por su nombre y la otra por su alcance.

#### RNAV 10, que se sigue llamando RNP 10

Se aplica a ciertas operaciones oceánicas y remotas, con precisión lateral de 10. En ese espacio aéreo la especificación que se aplica es RNAV 10, así que toda aeronave elegible para RNP 10 se considera elegible para operaciones RNAV 10. El nombre antiguo sobrevive en el plan de vuelo: el código de la casilla 18 es `A1`, y su texto literal es «RNAV 10 (RNP 10)».

El motivo de fondo es el del capítulo 8: RNP quedó reservado a especificaciones con control y alerta de la performance, y esta no lo tiene. Por eso se renombró a RNAV 10 sin que el nombre viejo desapareciera de la documentación.

#### A-RNP, Advanced RNP

Es una especificación con un conjunto mínimo de funciones **obligatorias** habilitadas en la aviónica. En el marco de la FAA, esas funciones mínimas incluyen:

- Calcular y volar tramos RF.
- RNP escalable.
- Generación de trayectoria paralela desplazada (*parallel offset*).

Puede exigirse mayor continuidad, por ejemplo sistemas duales, para cierto espacio oceánico y remoto.

### Lo que debe saber el piloto

Lo interesante de A-RNP para un piloto de aerolínea es que agrupa: normalmente, una aeronave elegible para A-RNP también será elegible para RNP APCH, RNP y RNAV 1, RNP y RNAV 2, RNP 4, y RNP y RNAV 10.

Y lo que hay que tener muy claro es el límite de ese agrupamiento: **una aeronave elegible para A-RNP no es automáticamente elegible para RNP AR APCH ni para RNP AR DP**, porque la elegibilidad RNP AR exige un proceso de determinación separado y una autorización especial.

Sobre los valores: A-RNP permite valores laterales escalables en terminal, 1.0 o 0.3, y el uso de esas precisiones reducidas normalmente exige el piloto automático, el director de vuelo, o ambos.

### En operación de aerolínea

A-RNP es una especificación de flota moderna y su ventaja es administrativa y operacional a la vez: una elegibilidad que cubre varias especificaciones simplifica el papeleo y amplía lo que se puede volar. Lo que no simplifica es RNP AR, que sigue siendo una puerta aparte.

### ¿Qué debe verificar?

- Si la elegibilidad de la flota es A-RNP y qué especificaciones cubre en la práctica.
- Si el procedimiento requiere una precisión reducida y, con ella, el uso del piloto automático o del director de vuelo.
- Que no se asume RNP AR por tener A-RNP.

### Error frecuente

Dos:

- «RNP 10 es una especificación RNP.» El nombre lo sugiere y la norma dice lo contrario: no tiene control y alerta, y por eso hoy es RNAV 10.
- «Con A-RNP puedo volar RNP AR.» No: exige determinación separada y autorización especial.

### En pocas palabras

- RNAV 10 conserva el nombre RNP 10 en el plan de vuelo, con el código `A1`.
- Toda aeronave elegible para RNP 10 se considera elegible para RNAV 10.
- A-RNP exige funciones obligatorias: tramos RF, RNP escalable y trayectoria paralela desplazada.
- A-RNP no confiere elegibilidad RNP AR: eso va por determinación separada y autorización especial.

### Quiz · Capítulo 16

**p16-q1** · ¿Por qué RNP 10 pasó a llamarse RNAV 10?
- A) Porque su precisión lateral cambió de 10 a otro valor.
- B) Porque no incluye control y alerta de la performance a bordo, y el prefijo RNP quedó reservado a las que sí lo incluyen.
- C) Porque dejó de aplicarse en espacio oceánico.
- D) Porque la FAA y OACI usan nombres distintos para la misma especificación.
**Correcta:** B · **Tema:** P16 · **Referencia:** RAC 91, nota 2 a la definición de especificación para la navegación; FAA AIM 1-2-1, apartado RNP 10
**Explicación:** El prefijo RNP quedó reservado a especificaciones con control y alerta de la performance. Esta no lo tiene, así que se renombró, aunque el nombre antiguo sobrevive en el código `A1` del plan de vuelo, cuyo texto literal es «RNAV 10 (RNP 10)».

**p16-q2** · ¿Cuáles son las funciones mínimas obligatorias de A-RNP en el marco de la FAA?
- A) Guía vertical barométrica y compensación de temperatura.
- B) Tramos RF, RNP escalable y generación de trayectoria paralela desplazada.
- C) Doble GNSS y doble FMS.
- D) Control de hora de llegada y transiciones de radio fijo.
**Correcta:** B · **Tema:** P16 · **Referencia:** FAA AIM 1-2-1, apartado A-RNP
**Explicación:** Son las tres que el AIM enumera como mínimas en el marco estadounidense. Otras funciones avanzadas de ruta, como las transiciones de radio fijo y el control de hora de llegada, quedan opcionales allí, y la mayor continuidad con sistemas duales puede exigirse para cierto espacio oceánico y remoto.

**p16-q3** · Tu flota es elegible para A-RNP. ¿Puedes volar una RNP AR APCH?
- A) Sí: A-RNP incluye RNP AR.
- B) Sí, si el procedimiento tiene tramos RF, que A-RNP exige.
- C) No automáticamente: RNP AR exige un proceso de determinación separado y autorización especial.
- D) No, porque A-RNP es solo de ruta.
**Correcta:** C · **Tema:** P16 · **Referencia:** FAA AIM 1-2-1, nota al apartado A-RNP
**Explicación:** La nota del AIM es tajante: las aeronaves elegibles para A-RNP no son automáticamente elegibles para operaciones RNP AR APCH ni RNP AR DP, porque esa elegibilidad requiere un proceso de determinación separado y autorización especial de la autoridad.

---

# BLOQUE 4 · LAS APROXIMACIONES PBN

---

## 17. RNP APCH

**ID:** P17 · **Tiempo:** 9 min

### Concepto

RNP Approach. La especificación RNP de aproximación, y la que un piloto de aerolínea vuela más veces en su carrera. Su valor de precisión lateral es **1** en los segmentos de terminal y en la frustrada, y escala a **0.3** en la aproximación final.

### Lo que debe saber el piloto

#### Qué se junta en una RNP APCH

Cinco piezas que trabajan a la vez, y cada una puede caerse por separado:

- **GNSS**, como fuente de posición lateral, con o sin aumentación satelital.
- **FMS**, que construye la trayectoria y vigila la performance.
- **Base de datos de navegación**, de donde sale el procedimiento codificado.
- **Guía lateral** siempre, y **guía vertical** cuando la línea de mínimos la tenga.
- **Líneas de mínimos**, que son varias en una misma carta y no todas utilizables por todos los aviones.

#### El título de la carta: aquí las autoridades no coinciden

Esto se pregunta y hay que decirlo con precisión, sin mezclar:

| Marco | Cómo se titula |
|---|---|
| FAA | Los procedimientos RNP APCH se titulan **RNAV (GPS) RWY XX** |
| FAA, RNP AR | Se titulan **RNAV (RNP) RWY XX** |
| Internacional | Los RNP AR pueden encontrarse titulados **RNP RWY XX (AR)** |

De ahí sale una advertencia práctica: el título no basta para saber qué exige el procedimiento. **Lo que exige está en las notas y en el recuadro PBN**, y en el caso de RNP AR, además, la carta dice expresamente «Authorization Required».

**Verificar:** cómo se titulan los procedimientos PBN en Colombia hay que leerlo en la carta publicada en el AIP Colombia del aeropuerto de que se trate. No se debe suponer la convención de la FAA ni la internacional sin mirar.

#### La capacidad de tramo RF, otra vez opcional

En RNP APCH la capacidad de volar un tramo RF es **opcional**. Elegible para RNP APCH no significa poder volar un RF: los tramos RF tienen que estar listados como característica del equipo.

### En operación de aerolínea

La preparación de una RNP APCH tiene una secuencia que conviene tener automatizada:

1. Confirmar la disponibilidad de la infraestructura de navegación para el periodo previsto, incluida la integridad del GNSS, con toda la información disponible.
2. Comprobar el ciclo de la base de datos.
3. Cargar el procedimiento desde la base de datos, nunca a mano.
4. Verificar procedimiento, pista, transición, secuencia de puntos, derrotas y restricciones contra la carta.
5. Decidir a qué línea de mínimos se va y confirmar que el avión y el operador la pueden usar.
6. Confirmar el ajuste altimétrico local.

#### Durante el procedimiento

Dos exigencias concretas de la circular de la FAA que valen como conocimiento de entrevista:

- Confirmar que el sistema ha iniciado la transición de modo terminal a modo aproximación **2 NM antes del punto de aproximación final**.
- Tener seleccionadas las presentaciones que permitan vigilar la derrota calculada y la posición del avión respecto de la trayectoria, es decir, la desviación lateral (XTK), para vigilar el error técnico de vuelo.

Y la expectativa de fondo: mantener el eje del procedimiento según lo indican los indicadores de desviación lateral o la guía de vuelo, salvo autorización del ATC o emergencia.

### ¿Qué debe verificar?

- Disponibilidad de infraestructura e integridad GNSS para el periodo de la operación, incluidas las contingencias no RNP.
- Vigencia de la base de datos.
- Procedimiento, pista, transición, puntos, derrotas, restricciones.
- La transición a modo aproximación antes del FAF.
- El ajuste altimétrico local.
- La línea de mínimos que el avión y el operador pueden usar.

### ¿Qué ocurre si no se cumple?

Se pierde la capacidad RNP APCH. La circular de la FAA define esa pérdida de forma amplia y útil: **cualquier falla o suceso que haga que la aeronave deje de satisfacer los requisitos RNP APCH del procedimiento**. Y pide que el operador desarrolle procedimientos de contingencia para reaccionar con seguridad si la capacidad se pierde durante la aproximación.

### Comunicación ATC

El piloto debe notificar al ATC cualquier pérdida de la capacidad RNP APCH, junto con el curso de acción propuesto, y si no puede cumplir los requisitos del procedimiento, debe avisar al servicio de tránsito aéreo lo antes posible.

### Error frecuente

«RNAV approach y RNP approach son siempre exactamente lo mismo.» No. El título de la carta responde a la convención de cada autoridad, y lo que el procedimiento exige está en las notas. Hay procedimientos titulados RNAV que exigen RNP APCH, y en el marco de la FAA es lo normal.

[ESPACIO PARA IMAGEN ANOTADA]

IMAGEN BASE:
Recreación educativa de una carta de aproximación PBN, con vista en planta arriba, perfil vertical en el medio y caja de mínimos abajo. En planta: IAF, dos puntos intermedios, FAF, pista y la trayectoria de frustrada con un tramo de espera. En el perfil: la senda descendente con la altitud del FAF y la DA. En la caja de mínimos: tres líneas. Arriba a la derecha, el recuadro PBN.

ANOTACIONES:
→ FLECHA 1: al título del procedimiento.
EXPLICACIÓN: el título sigue la convención de la autoridad que publica. No dice por sí solo qué exige el procedimiento.
→ FLECHA 2: al recuadro PBN.
EXPLICACIÓN: aquí está la especificación exigida, los sensores o funciones necesarios y el valor RNP mínimo cuando aplique. Es obligatorio.
→ FLECHA 3: al FAF.
EXPLICACIÓN: 2 NM antes de este punto hay que haber confirmado que el sistema pasó a modo aproximación.
→ FLECHA 4: a la trayectoria de frustrada.
EXPLICACIÓN: la frustrada también tiene requisito de navegación, y puede exigir una capacidad que el avión no tenga aunque tenga la de la aproximación.
→ FLECHA 5: a la caja de mínimos.
EXPLICACIÓN: hay varias líneas y no todas son utilizables por todos los aviones. La que se usa depende de la capacidad del avión, el equipo operativo y la autorización del operador.
→ FLECHA 6: a las notas del procedimiento.
EXPLICACIÓN: aquí aparecen las limitaciones, incluida la de temperatura cuando la línea de mínimos es de guía vertical barométrica.

OBJETIVO PEDAGÓGICO:
Enseñar al piloto dónde está la información PBN crítica de una carta de aproximación y en qué orden mirarla.

### En pocas palabras

- RNP APCH: valor 1 en terminal y frustrada, 0.3 en la aproximación final.
- La FAA titula los RNP APCH como RNAV (GPS) RWY XX y los RNP AR como RNAV (RNP) RWY XX; internacionalmente los RNP AR pueden aparecer como RNP RWY XX (AR).
- El título no dice qué exige el procedimiento: eso está en las notas y en el recuadro PBN.
- La transición a modo aproximación se confirma 2 NM antes del FAF.
- La capacidad de tramo RF es opcional en RNP APCH.

### Quiz · Capítulo 17

**p17-q1** · ¿Cuándo hay que confirmar que el sistema pasó de modo terminal a modo aproximación?
- A) Al recibir la autorización de aproximación.
- B) 2 NM antes del punto de aproximación final.
- C) Al cruzar el punto de aproximación inicial.
- D) Al pasar el FAF.
**Correcta:** B · **Tema:** P17 · **Referencia:** FAA AC 90-105A, Apéndice A, numeral A.7.2.1
**Explicación:** La circular lo fija así: los pilotos deben confirmar que el sistema ha iniciado la transición de modo terminal a modo aproximación 2 NM antes del FAF. Confirmarlo después del FAF llega tarde para hacer algo al respecto.

**p17-q2** · ¿Cómo define la FAA la pérdida de capacidad RNP APCH?
- A) La pérdida total del GNSS.
- B) Cualquier falla o suceso que haga que la aeronave deje de satisfacer los requisitos RNP APCH del procedimiento.
- C) La superación del valor RNP en el segmento final.
- D) La desconexión del piloto automático.
**Correcta:** B · **Tema:** P17 · **Referencia:** FAA AC 90-105A, Apéndice A, numeral A.7.1.8
**Explicación:** La definición es deliberadamente amplia: cualquier falla o suceso que impida satisfacer los requisitos del procedimiento. No hay que esperar la pérdida total de una fuente para concluir que la capacidad se perdió.

**p17-q3** · Una carta se titula «RNAV (GPS) RWY 13». ¿Qué especificación se está volando en el marco de la FAA?
- A) RNAV 1.
- B) RNP APCH.
- C) RNP AR APCH.
- D) No se puede saber por el título: siempre hay que leer las notas, y en el marco de la FAA ese título corresponde a RNP APCH.
**Correcta:** D · **Tema:** P17 · **Referencia:** FAA AIM 1-2-1, apartado RNP APCH; FAA AIM 1-2-3
**Explicación:** En el marco de la FAA los procedimientos RNP APCH se titulan RNAV (GPS), así que la respuesta práctica es RNP APCH. Pero la respuesta profesional incluye el hábito: lo que el procedimiento exige está en las notas y en el recuadro PBN, no en el título.

---

## 18. LAS LÍNEAS DE MÍNIMOS

**ID:** P18 · **Tiempo:** 8 min

### Concepto

Una misma carta de aproximación PBN puede publicar **varias líneas de mínimos**, y no todas son utilizables por todos los aviones. Esta es una de las decisiones de cabina más concretas del módulo: a qué línea se va.

### Lo que debe saber el piloto

En el marco de la FAA, una carta RNAV (GPS) puede traer hasta cuatro líneas, más la de circling:

| Línea | Qué es | A qué se vuela |
|---|---|---|
| LNAV | Solo navegación lateral | MDA |
| LNAV/VNAV | Lateral más guía vertical, normalmente Baro-VNAV aprobado para aproximación, o vertical satelital | DA |
| LPV | *Localizer performance with vertical guidance*, aprovecha la precisión de la aumentación satelital | DA |
| LP | *Localizer performance*, lateral con sensibilidad angular, sin guía vertical | MDA |

Y una precisión que conviene saber porque ordena el mapa mental: LNAV/VNAV y LPV son **aproximaciones con guía vertical (APV)**, es decir, aproximaciones basadas en un sistema que no tiene por qué cumplir los patrones de aproximación de precisión pero que sí da información de desviación de rumbo y de senda.

#### Tres reglas que se preguntan

- Para volar a mínimos LPV o LP hace falta aumentación satelital: son líneas que exigen SBAS.
- **LP no es un modo degradado de LPV.** LP solo se publica cuando el terreno, los obstáculos u otra razón impiden publicar un procedimiento con guía vertical, y nunca aparece junto a una línea con guía vertical aprobada.
- Los mínimos de circling pueden ser más bajos que la línea LNAV/VNAV, pero **nunca** más bajos que la línea LNAV recta.

#### Qué decide a qué línea se va

Cinco cosas, y hay que revisarlas todas:

- La capacidad de la aeronave, declarada en el AFM.
- El estado del equipo hoy.
- La autorización del operador.
- Las restricciones de temperatura, cuando la línea es de guía vertical barométrica.
- El ajuste altimétrico disponible.

### En operación de aerolínea

El briefing de aproximación incluye decir en voz alta a qué línea se va y por qué, y qué línea es la alternativa si algo se cae. No es un formalismo: si a mitad de la aproximación se pierde la guía vertical, la pregunta «¿a qué mínimos voy ahora?» ya tiene que estar contestada.

### ¿Qué debe verificar?

- Qué líneas publica la carta.
- Cuál puede usar este avión, con este equipo, hoy.
- Qué limitaciones acompañan a esa línea.
- Qué línea queda como alternativa.

### ¿Qué ocurre si no se cumple?

Volar a una línea de mínimos que el avión o el operador no pueden usar es descender por debajo de un mínimo que no aplica. En el marco de la FAA, una autorización del ATC para el procedimiento autoriza a un piloto debidamente certificado a usar los mínimos para los que la aeronave está certificada: la autorización no habilita una línea que el avión no puede usar.

### Error frecuente

«Si la carta publica LPV, puedo volar LPV.» No: la línea existe en la carta, la capacidad está en el avión. Y el gemelo: suponer que LNAV/VNAV, LPV y Baro-VNAV son lo mismo. LNAV/VNAV es una línea de mínimos; Baro-VNAV es una forma de generar la guía vertical; LPV es otra línea, que exige aumentación satelital.

[ESPACIO PARA IMAGEN ANOTADA]

IMAGEN BASE:
Recreación de una caja de mínimos de carta de aproximación PBN, con cuatro renglones (LPV, LNAV/VNAV, LNAV, CIRCLING), cada uno con su altitud y visibilidad, y a la derecha las columnas por categoría de aeronave.

ANOTACIONES:
→ FLECHA 1: al renglón LPV.
EXPLICACIÓN: exige aumentación satelital. Se vuela a DA. Si el avión no la tiene aprobada, esta línea no es utilizable aunque esté publicada.
→ FLECHA 2: al renglón LNAV/VNAV.
EXPLICACIÓN: guía vertical, normalmente Baro-VNAV aprobado para aproximación. Se vuela a DA y está sujeta a la limitación de temperatura publicada.
→ FLECHA 3: al renglón LNAV.
EXPLICACIÓN: solo lateral. Se vuela a MDA. Es la línea a la que se degrada la operación cuando la guía vertical no está disponible o la temperatura está fuera de límites.
→ FLECHA 4: al renglón CIRCLING.
EXPLICACIÓN: puede ser más bajo que LNAV/VNAV, pero nunca más bajo que la LNAV recta.

OBJETIVO PEDAGÓGICO:
Enseñar que la caja de mínimos no es una lista de opciones libres, y que a cada línea se llega por una capacidad concreta del avión y del operador.

### En pocas palabras

- Una carta PBN puede publicar LNAV, LNAV/VNAV, LPV y LP, más circling.
- LNAV/VNAV y LPV son aproximaciones con guía vertical (APV) y se vuelan a DA; LNAV y LP, a MDA.
- LPV y LP exigen aumentación satelital. LP no es un modo degradado de LPV.
- La línea utilizable la deciden la capacidad del avión, el equipo de hoy, la autorización del operador, la temperatura y el ajuste altimétrico.

### Quiz · Capítulo 18

**p18-q1** · ¿Qué línea de mínimos exige aumentación satelital?
- A) LNAV.
- B) LNAV/VNAV, siempre.
- C) LPV y LP.
- D) Circling.
**Correcta:** C · **Tema:** P18 · **Referencia:** FAA AIM 1-2-1, apartado RNP APCH; FAA AIM 5-4-5
**Explicación:** Para volar a mínimos LPV o LP se requiere aumentación satelital. LNAV/VNAV puede volarse con guía vertical barométrica aprobada para aproximación o con vertical satelital, así que no exige SBAS necesariamente.

**p18-q2** · ¿Es LP un modo degradado de LPV?
- A) Sí: cuando LPV no está disponible, el sistema revierte a LP.
- B) No: LP solo se publica cuando el terreno u otra razón impiden publicar un procedimiento con guía vertical, y no aparece junto a una línea con guía vertical aprobada.
- C) Sí, pero solo en aeropuertos sin ILS.
- D) No: LP es la línea vertical y LPV la lateral.
**Correcta:** B · **Tema:** P18 · **Referencia:** FAA AIM 5-4-5, apartado LP
**Explicación:** El AIM lo dice expresamente: LP no es un modo de reversión de LPV. Se publica solo donde no se puede publicar un procedimiento con guía vertical, y nunca junto a LNAV/VNAV o LPV.

**p18-q3** · La carta publica LPV, pero el AFM de tu avión no menciona esa capacidad. Estás autorizado al procedimiento por el ATC. ¿A qué línea puedes volar?
- A) A LPV: la autorización del ATC habilita cualquier línea publicada.
- B) A la línea para la que el avión esté certificado, que no es LPV.
- C) A ninguna: sin LPV el procedimiento no puede volarse.
- D) A LPV, aumentando la visibilidad mínima.
**Correcta:** B · **Tema:** P18 · **Referencia:** FAA AIM 5-4-5, apartado sobre cartas de aproximación RNAV
**Explicación:** La autorización del ATC para el procedimiento habilita al piloto a usar los mínimos para los que la aeronave está certificada, no todos los publicados. Sin capacidad LPV se vuela a otra línea, típicamente LNAV/VNAV o LNAV según lo que el avión tenga.

---

## 19. BARO-VNAV

**ID:** P19 · **Tiempo:** 7 min

### Concepto

Barometric Vertical Navigation. Es la forma de generar guía vertical a partir de información barométrica de altitud, y es la que normalmente sostiene la línea de mínimos LNAV/VNAV.

Lo importante para el piloto no es cómo se calcula la senda, sino de qué depende: de la **presión**. Y todo lo que afecte a la presión medida afecta a la trayectoria vertical.

### Lo que debe saber el piloto

Tres reglas de la circular de la FAA que definen la operación con Baro-VNAV, y las tres se preguntan:

#### El ajuste altimétrico tiene que ser local

**El uso de Baro-VNAV hasta una DA no está autorizado con un ajuste altimétrico remoto.** Se requiere un ajuste altimétrico actual del aeropuerto de aterrizaje. Donde se publican mínimos con altímetro remoto, la función VNAV puede usarse, pero **solo hasta la MDA de LNAV** publicada.

Y una consecuencia del mismo principio: cuando el ajuste altimétrico en que se basa la aproximación no está disponible, la aproximación no está autorizada.

#### Hay que verificar el ajuste antes del FAF

Los pilotos deben verificar que el altímetro local actual del aeropuerto de aterrizaje previsto está puesto **no más tarde del punto de aproximación final**.

#### El modo vertical importa

Hay que conocer la selección del modo vertical adecuado, el que manda la trayectoria vertical publicada. Otros modos verticales, como velocidad vertical, **no** son aplicables a una aproximación Baro-VNAV.

### En operación de aerolínea

En la práctica, la operación LNAV/VNAV con Baro-VNAV tiene tres puntos de fallo que la tripulación controla: el ajuste altimétrico, la temperatura y el modo vertical. Los tres se verifican en el briefing y se vuelven a mirar antes del FAF.

Y la acción en el mínimo es la de siempre: volar la trayectoria vertical publicada y ejecutar la frustrada al llegar a la DA, salvo que estén presentes las referencias visuales exigidas para continuar.

### ¿Qué debe verificar?

- Que el ajuste altimétrico es local y actual, puesto no más tarde del FAF.
- Que la temperatura está dentro de los límites publicados (capítulo 20).
- Que el modo vertical seleccionado es el que sigue la trayectoria publicada.

### ¿Qué ocurre si no se cumple?

Con ajuste remoto no se puede ir a la DA de LNAV/VNAV: se vuela a la MDA de LNAV. Sin el ajuste en que se basa la aproximación, la aproximación no está autorizada.

### Error frecuente

Usar velocidad vertical para «seguir» la senda. No es un modo aplicable a una aproximación Baro-VNAV, y lo que se consigue es volar una trayectoria parecida a la publicada, que no es lo mismo que volar la publicada.

### En pocas palabras

- Baro-VNAV genera guía vertical a partir de información barométrica: depende de la presión.
- Hasta una DA exige ajuste altimétrico local y actual; con ajuste remoto solo se puede usar hasta la MDA de LNAV.
- El altímetro local se verifica puesto no más tarde del FAF.
- El modo vertical tiene que ser el que sigue la trayectoria publicada, no velocidad vertical.

### Quiz · Capítulo 19

**p19-q1** · ¿Se puede volar a la DA de LNAV/VNAV con un ajuste altimétrico remoto?
- A) Sí, aumentando los mínimos.
- B) No: se requiere ajuste altimétrico local y actual del aeropuerto de aterrizaje; con ajuste remoto la función VNAV solo puede usarse hasta la MDA de LNAV.
- C) Sí, si la temperatura está dentro de límites.
- D) Sí, si el ATC lo autoriza.
**Correcta:** B · **Tema:** P19 · **Referencia:** FAA AC 90-105A, Apéndice B, numeral B.4.4
**Explicación:** La circular es explícita: el uso de Baro-VNAV hasta una DA no está autorizado con ajuste altimétrico remoto, y donde se publican mínimos con altímetro remoto la función VNAV puede usarse solo hasta la MDA de LNAV publicada.

**p19-q2** · ¿Cuándo debe estar puesto el altímetro local del aeropuerto de aterrizaje?
- A) Antes de iniciar el descenso.
- B) No más tarde del punto de aproximación final.
- C) Al pasar la altitud de transición.
- D) Al alcanzar la DA.
**Correcta:** B · **Tema:** P19 · **Referencia:** FAA AC 90-105A, Apéndice B, numeral B.4.5.1
**Explicación:** La circular fija ese límite: los pilotos deben verificar que el altímetro local actual del aeropuerto de aterrizaje previsto está puesto no más tarde del FAF. Después del FAF ya se está descendiendo sobre una senda que depende de ese ajuste.

**p19-q3** · ¿Es aceptable usar el modo de velocidad vertical para seguir la senda en una aproximación Baro-VNAV?
- A) Sí, si se ajusta la velocidad vertical al gradiente publicado.
- B) No: los modos como velocidad vertical no son aplicables a operaciones de aproximación Baro-VNAV.
- C) Sí, cuando el piloto automático está desacoplado.
- D) Sí, por debajo del FAF.
**Correcta:** B · **Tema:** P19 · **Referencia:** FAA AC 90-105A, Apéndice B, numeral B.4.3
**Explicación:** La circular pide conocer la selección del modo vertical que manda la trayectoria vertical publicada y aclara que otros modos, como velocidad vertical, no son aplicables a operaciones de aproximación Baro-VNAV.

---

## 20. TEMPERATURA Y LA TRAYECTORIA BAROMÉTRICA

**ID:** P20 · **Tiempo:** 7 min

### Concepto

La temperatura no estándar tiene un efecto pronunciado sobre los sistemas Baro-VNAV. Por eso las aproximaciones con línea de mínimos LNAV/VNAV llevan **una limitación de temperatura baja y alta**, y esa limitación aparece como una **nota en el procedimiento**.

### Lo que debe saber el piloto

#### La regla

Los sistemas Baro-VNAV **sin compensación** no pueden operar hasta la DA de LNAV/VNAV cuando la temperatura real está por debajo o por encima de las limitaciones de temperatura publicadas.

Dicho en términos de cabina, y así lo formula el AIM: la línea LNAV/VNAV no puede usarse sin una función automática aprobada de compensación de temperatura si la temperatura está fuera del rango de la limitación Baro-VNAV. **La línea LNAV sí puede usarse.**

#### Las dos excepciones

- Si la aeronave tiene capacidad de compensación de temperatura, hay que seguir las instrucciones del fabricante para el uso de la función Baro-VNAV.
- La limitación de temperatura publicada **no aplica** a los pilotos que operan una aeronave con aprobación de aeronavegabilidad para volar la aproximación a mínimos LNAV/VNAV **usando guía vertical satelital**. La razón es la que ordena todo el capítulo: el problema es de la presión, y esa aproximación no depende de la presión para la senda.

### En operación de aerolínea

El briefing de una LNAV/VNAV en un aeropuerto frío incluye leer la nota de temperatura y compararla con la temperatura real. La decisión que sale de ahí es binaria: o se va a la DA de LNAV/VNAV, o se va a la MDA de LNAV.

Lo que nunca corresponde es volar a la DA suponiendo que el margen de la nota es conservador. La nota es parte del procedimiento, como una altitud mínima.

**No inventes límites.** El valor concreto está en la carta de ese procedimiento y solo ahí. No hay un número general para memorizar.

### ¿Qué debe verificar?

- La nota de limitación de temperatura del procedimiento.
- La temperatura real en el aeropuerto.
- Si la aeronave tiene compensación automática aprobada, y qué dice el fabricante sobre su uso.
- Si la aproximación se va a volar con guía vertical satelital, caso en que la limitación no aplica.

### ¿Qué ocurre si no se cumple?

Con temperatura fuera de límites y sin compensación, la DA de LNAV/VNAV no está disponible. Volar a ella es descender por debajo de un mínimo que en esas condiciones no protege lo que debía proteger.

### Error frecuente

Creer que la limitación es una advertencia de confort del equipo. No lo es: es una limitación del procedimiento, y la alternativa (la MDA de LNAV) es la respuesta correcta y está publicada en la misma carta.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Perfil vertical de una aproximación final, con la pista a la derecha y el FAF a la izquierda. Dos sendas dibujadas desde el mismo FAF: una continua rotulada «TRAYECTORIA EN CONDICIÓN ESTÁNDAR», y otra de puntos, ligeramente por debajo de la primera, rotulada «EFECTO CONCEPTUAL DE AIRE MÁS FRÍO QUE EL ESTÁNDAR». Entre las dos, una acotación vertical sin cifra, con el rótulo «la magnitud depende de la temperatura y del procedimiento: está en la nota de la carta, no en una regla general». A la izquierda, un recuadro con «LIMITACIÓN DE TEMPERATURA: ver nota del procedimiento».

OBJETIVO:
Visualizar por qué una limitación de temperatura es operacional y no una formalidad, sin publicar ninguna cifra que no venga de la carta de un procedimiento concreto.

### En pocas palabras

- La temperatura no estándar afecta de forma pronunciada la guía vertical barométrica.
- Las líneas LNAV/VNAV llevan limitación de temperatura baja y alta, publicada como nota del procedimiento.
- Sin compensación aprobada y con temperatura fuera de rango, la DA de LNAV/VNAV no se usa; la MDA de LNAV sí.
- La limitación no aplica si la aproximación a LNAV/VNAV se vuela con guía vertical satelital y el avión tiene esa aprobación.

### Quiz · Capítulo 20

**p20-q1** · La temperatura está por debajo del límite publicado para la línea LNAV/VNAV y tu avión no tiene compensación automática. ¿Qué haces?
- A) Vuelas a la DA de LNAV/VNAV: la limitación es orientativa.
- B) Vuelas a la MDA de LNAV.
- C) No puedes volar la aproximación.
- D) Sumas un margen a la DA y continúas.
**Correcta:** B · **Tema:** P20 · **Referencia:** FAA AC 90-105A, Apéndice B, numeral B.4.2; FAA AIM 5-4-5
**Explicación:** Sin una función automática aprobada de compensación no se puede usar la línea LNAV/VNAV fuera del rango de temperatura, pero la línea LNAV sí puede usarse. La respuesta no es abandonar la aproximación: es cambiar de línea de mínimos.

**p20-q2** · ¿A quién no aplica la limitación de temperatura publicada para Baro-VNAV?
- A) A ninguna aeronave: aplica siempre.
- B) A quien vuela la aproximación a mínimos LNAV/VNAV con guía vertical satelital y tiene la aprobación de aeronavegabilidad correspondiente.
- C) A quien vuela con piloto automático acoplado.
- D) A quien tiene autorización del ATC para continuar.
**Correcta:** B · **Tema:** P20 · **Referencia:** FAA AIM 5-4-5, nota sobre la limitación de temperatura Baro-VNAV
**Explicación:** La limitación existe porque la senda se construye con información barométrica. Si la guía vertical viene de aumentación satelital y el avión tiene esa aprobación, la limitación de temperatura publicada no le aplica.

**p20-q3** · ¿Dónde está el valor concreto de la limitación de temperatura de una aproximación?
- A) En el AFM del avión.
- B) En una tabla general de la autoridad.
- C) En una nota del propio procedimiento, en la carta.
- D) En el manual de operaciones del explotador.
**Correcta:** C · **Tema:** P20 · **Referencia:** FAA AC 90-105A, Apéndice B, numeral B.4.2
**Explicación:** La circular dice que la limitación se muestra como una nota en el procedimiento. Es una cifra del procedimiento, no del avión ni general: se lee en la carta de esa aproximación y no se memoriza.

---

## 21. EL QNH EN UNA APROXIMACIÓN PBN

**ID:** P21 · **Tiempo:** 6 min

### Concepto

En una aproximación con guía vertical barométrica, el ajuste altimétrico no es un detalle de altimetría: es **la referencia de la que cuelga la trayectoria vertical**. Un QNH equivocado desplaza la senda entera.

### Lo que debe saber el piloto

Tres consecuencias concretas, todas ya vistas y que aquí se juntan porque en cabina se juntan:

- El ajuste tiene que ser **local y actual** del aeropuerto de aterrizaje para ir a la DA de LNAV/VNAV.
- Tiene que estar **puesto no más tarde del FAF**.
- Si el ajuste en que se basa la aproximación **no está disponible**, la aproximación no está autorizada.

Y una cuarta que ordena la práctica: los mínimos de una aproximación se basan en el ajuste altimétrico local de ese aeropuerto salvo que la carta anote otra cosa. Cuando se autoriza más de una fuente y los mínimos difieren, la carta lo indica con renglones separados en la caja de mínimos o con una nota, y los mínimos pueden ser más altos con una fuente no local.

### En operación de aerolínea

El QNH llega por ATIS o por el ATC, y el riesgo real es de gestión: ponerlo tarde, poner el del aeropuerto equivocado en una zona con varios aeródromos cercanos, o quedarse con un valor viejo en una situación de presión cambiando rápido.

El contraste entre ambos pilotos es la defensa, y el momento es antes del FAF.

### ¿Qué debe verificar?

- Que el QNH es del aeropuerto de aterrizaje y es actual.
- Que está puesto en los dos altímetros antes del FAF.
- Qué dice la carta si se está usando una fuente de ajuste no local.

### ¿Qué ocurre si no se cumple?

La senda barométrica queda desplazada respecto de la publicada, en el sentido y la magnitud que corresponda al error de ajuste. Y si el ajuste base no está disponible, la aproximación no está autorizada.

### Comunicación ATC

Si hay duda sobre el valor, se pide confirmación. Es una petición de rutina que no cuesta nada y que resuelve el problema antes de que sea una desviación.

### Error frecuente

Tratar el QNH como un dato de altímetro nada más. En una LNAV/VNAV es también un dato de trayectoria: es lo que hace que la senda del FMS coincida con la del procedimiento.

### En pocas palabras

- En Baro-VNAV, el ajuste altimétrico es la referencia de la trayectoria vertical.
- Local, actual y puesto no más tarde del FAF.
- Si el ajuste en que se basa la aproximación no está disponible, la aproximación no está autorizada.
- Los mínimos pueden ser más altos con una fuente de ajuste no local, y la carta lo dice.

### Quiz · Capítulo 21

**p21-q1** · ¿Qué ocurre si el ajuste altimétrico en que se basa la aproximación no está disponible?
- A) Se usa el del aeródromo más cercano y se aumentan los mínimos 100 ft.
- B) La aproximación no está autorizada.
- C) Se vuela a la MDA de LNAV.
- D) Se solicita al ATC una autorización especial.
**Correcta:** B · **Tema:** P21 · **Referencia:** FAA AIM 5-4-5, apartado de fuentes de ajuste altimétrico
**Explicación:** Cuando el ajuste altimétrico en que se basa la aproximación no está disponible, la aproximación no está autorizada. Las alternativas con fuente no local existen solo si la carta las publica, y entonces los mínimos pueden ser más altos.

**p21-q2** · Por qué el QNH es un dato de trayectoria en una aproximación LNAV/VNAV con Baro-VNAV?
- A) Porque el FMS lo usa para calcular la distancia al FAF.
- B) Porque la senda vertical se construye con información barométrica y el ajuste es su referencia.
- C) Porque determina la sensibilidad de la desviación lateral.
- D) Porque fija el valor RNP del segmento final.
**Correcta:** B · **Tema:** P21 · **Referencia:** FAA AC 90-105A, Apéndice B, numerales B.4.4 y B.4.5.1
**Explicación:** La guía vertical barométrica depende de la presión medida, así que el ajuste altimétrico desplaza la senda entera. Por eso la circular exige ajuste local y actual y fija el FAF como límite para tenerlo puesto.

**p21-q3** · La carta publica mínimos con una fuente de ajuste altimétrico distinta de la local. ¿Qué implica?
- A) Que los mínimos son los mismos con cualquiera de las dos fuentes.
- B) Que los mínimos pueden ser más altos con la fuente no local, y la carta lo indica con renglones separados o con una nota.
- C) Que la aproximación solo puede volarse a circling.
- D) Que Baro-VNAV puede usarse hasta la DA con cualquiera de las dos.
**Correcta:** B · **Tema:** P21 · **Referencia:** FAA AIM 5-4-5, apartado de fuentes de ajuste altimétrico; FAA AC 90-105A, Apéndice B, numeral B.4.4
**Explicación:** Los mínimos pueden ser más altos con una fuente no local y la carta lo publica. Y hay un límite adicional: con ajuste remoto, Baro-VNAV no puede usarse hasta la DA, solo hasta la MDA de LNAV.

---

## 22. RNP AR APCH

**ID:** P22 · **Tiempo:** 9 min

### Concepto

RNP Authorization Required Approach. Es la especificación de aproximación más exigente que vuela una aerolínea, y la característica que la define está en su nombre: **requiere autorización**.

El AIM lo compara con algo conocido para entender el nivel: la autorización que exige RNP AR es análoga a la autorización especial que exigen los procedimientos ILS de Categoría II o III. Todos los operadores necesitan autorización específica de la autoridad para volar cualquier aproximación o salida RNP AR. **No hay excepciones.**

### Lo que debe saber el piloto

#### El valor RNP y el área de evaluación de obstáculos

Aquí hay un dato que explica por qué RNP AR es distinta de todo lo demás: los procedimientos RNP AR se caracterizan por usar un área lateral de evaluación de obstáculos igual a **dos veces el valor RNP**, sin área lateral secundaria ni márgenes adicionales.

Dicho en claro: en RNP AR no hay colchón. En otros procedimientos, el área protegida incluye una zona secundaria; aquí el margen es el que da el propio valor RNP, y nada más.

Los valores: RNP AR exige un valor mínimo de precisión lateral de **RNP 0.30**, y las aproximaciones RNP AR tendrán un valor de RNP 0.3 o menor. Cada línea de mínimos publicada tiene su valor RNP asociado, que define el requisito de performance lateral en el segmento final.

#### La autorización del operador fija un valor mínimo

La autorización de cada operador **identifica un valor RNP mínimo autorizado**, y ese valor puede variar según la configuración de la aeronave o los procedimientos operacionales, por ejemplo según se use director de vuelo con o sin piloto automático.

Consecuencia de cabina: el valor al que un operador puede volar no es el más bajo que publique la carta, es el más bajo que su autorización permita con la configuración de ese día.

#### Tramos RF

Muchos procedimientos RNP AR contienen tramos RF, y aquí **la elegibilidad para tramos RF es obligatoria** en cualquier autorización RNP AR. Los requisitos de tramo RF se indican en la sección de notas de la carta o en el punto de aproximación inicial aplicable.

#### Frustradas por debajo de RNP 1.00

Algunos procedimientos RNP AR requieren un valor de precisión lateral **menor de 1.00 NM en el segmento de frustrada**. En ciertos lugares el entorno de espacio aéreo o de obstáculos lo obliga, y la operación en esas aproximaciones típicamente requiere **equipo redundante**. La autorización del operador especifica si puede volar una frustrada que exija menos de 1.00 NM.

#### Velocidades y gradientes no estándar

Las aproximaciones RNP AR pueden requerir velocidades de aproximación o gradientes de ascenso en frustrada **no estándar**. La carta refleja esos requisitos y los pilotos deben confirmar que pueden cumplirlos **antes de iniciar la aproximación**.

### En operación de aerolínea

RNP AR existe para resolver problemas concretos en lugares concretos: terreno, obstáculos, espacio aéreo restringido. El AIM lo dice sin adornos: está pensada para dar beneficios específicos en lugares específicos, y **no** está pensada para todo operador ni para todo avión.

La preparación es distinta de una RNP APCH normal en tres cosas: hay que confirmar el valor RNP al que se está autorizado hoy, hay que confirmar la capacidad de los tramos RF y de la frustrada, y hay que confirmar las velocidades y gradientes antes de empezar.

### ¿Qué debe verificar?

- Que el operador tiene autorización RNP AR y cuál es su valor mínimo autorizado con la configuración prevista.
- Que la aeronave es elegible, incluidos los tramos RF.
- Qué valor RNP exige la línea de mínimos elegida y qué exige la frustrada.
- Las velocidades y gradientes no estándar, antes de comenzar.

### ¿Qué ocurre si no se cumple?

No se vuela. Sin la autorización, sin la elegibilidad o sin poder cumplir los gradientes, el procedimiento no es una opción, y el área de evaluación de obstáculos al doble del valor RNP explica por qué no hay margen para improvisar.

### Error frecuente

«RNP AR y RNP APCH son lo mismo con otro nombre.» No. Y el error de pilotaje asociado: suponer que se puede volar al valor más bajo publicado en la carta. El valor lo fija la autorización del operador, no la carta.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Dos vistas en planta lado a lado, con el mismo relieve de fondo: un valle estrecho entre dos cerros y una pista al fondo. Izquierda, rotulada «RNP APCH»: tramo final recto y largo, alineado con la pista, con la franja protegida dibujada ancha y con una zona secundaria más clara a cada lado. Derecha, rotulada «RNP AR APCH»: trayectoria curva que rodea uno de los cerros con un arco de radio constante y entra al valle, con la franja protegida notablemente más estrecha, sin zona secundaria, y una acotación que diga «área lateral de evaluación de obstáculos = 2 × valor RNP, sin zona secundaria». Un rótulo en la esquina de la derecha: «AUTHORIZATION REQUIRED».

OBJETIVO:
Mostrar por qué RNP AR permite trayectorias que RNP APCH no permite, y que el precio de esa precisión es que desaparece el colchón lateral.

### En pocas palabras

- RNP AR requiere autorización específica del operador, sin excepciones, análoga a la de CAT II o III.
- El área lateral de evaluación de obstáculos es dos veces el valor RNP, sin zona secundaria ni márgenes adicionales.
- Exige un valor mínimo de RNP 0.30, y cada línea de mínimos tiene su valor asociado.
- La elegibilidad para tramos RF es obligatoria; la frustrada puede exigir menos de 1.00 NM y equipo redundante.
- Puede haber velocidades y gradientes no estándar, que se confirman antes de iniciar.

### Quiz · Capítulo 22

**p22-q1** · ¿Qué área lateral de evaluación de obstáculos usan los procedimientos RNP AR?
- A) El valor RNP más una zona secundaria estándar.
- B) Dos veces el valor RNP, sin zona secundaria ni márgenes adicionales.
- C) Cuatro veces el valor RNP.
- D) La misma que RNP APCH.
**Correcta:** B · **Tema:** P22 · **Referencia:** FAA AIM 5-4-18, apartado de valor RNP
**Explicación:** Es lo que caracteriza a RNP AR: área lateral igual a dos veces el valor RNP, sin área lateral secundaria ni márgenes adicionales. Esa ausencia de colchón es la razón de las exigencias de autorización, equipo y entrenamiento.

**p22-q2** · La carta de una RNP AR publica una línea de mínimos con RNP 0.15. ¿Puedes volarla?
- A) Sí, si el avión es elegible para RNP AR.
- B) Sí, si el ATC te autoriza el procedimiento.
- C) Solo si la autorización de tu operador permite ese valor con la configuración prevista.
- D) No: RNP AR exige siempre RNP 0.30.
**Correcta:** C · **Tema:** P22 · **Referencia:** FAA AIM 5-4-18; FAA AC 90-101A, Apéndice, numeral 2, apartado a
**Explicación:** Cada autorización identifica un valor RNP mínimo autorizado, y ese valor puede variar según la configuración de la aeronave o los procedimientos operacionales, por ejemplo con director de vuelo con o sin piloto automático. La carta publica la línea; la autorización dice a qué valor se puede volar.

**p22-q3** · ¿Qué hay que confirmar antes de iniciar una aproximación RNP AR con gradiente de frustrada no estándar?
- A) Nada especial: el gradiente lo calcula el FMS.
- B) Que se puede cumplir ese requisito, porque la carta refleja los valores no estándar y el piloto debe confirmarlo antes de comenzar.
- C) Que el ATC acepta una frustrada con gradiente reducido.
- D) Que la temperatura está dentro de límites.
**Correcta:** B · **Tema:** P22 · **Referencia:** FAA AIM 5-4-18, apartado de velocidades y gradientes no estándar
**Explicación:** Una RNP AR puede pedir velocidades de aproximación o gradientes de frustrada que no son los estándar. Están publicados en la carta, y confirmar que el avión los cumple es un paso previo a iniciar: descubrirlo en la frustrada es tarde.

---

## 23. RNP APCH FRENTE A RNP AR APCH

**ID:** P23 · **Tiempo:** 7 min

### Concepto

La comparación, con las diferencias que importan en cabina:

| | RNP APCH | RNP AR APCH |
|---|---|---|
| Autorización | Aprobación del operador para la especificación | **Autorización específica**, sin excepciones, análoga a CAT II o III |
| Entrenamiento | Según la especificación y el operador | Requisitos específicos identificados por la autoridad |
| Elegibilidad de tramo RF | **Opcional** | **Obligatoria** en cualquier autorización RNP AR |
| Escalado del valor RNP | No es un requisito de la especificación | Obligatorio en la elegibilidad |
| Valor en final | 0.3 | **0.30 o menor**, y cada línea de mínimos lleva el suyo |
| Área lateral de obstáculos | Con zona secundaria | **2 × RNP, sin zona secundaria** |
| Frustrada | Valor 1 | Puede exigir **menos de 1.00 NM** y equipo redundante |
| Velocidades y gradientes | Estándar | Pueden ser **no estándar**, y hay que confirmarlos antes |
| Título de la carta (FAA) | RNAV (GPS) RWY XX | RNAV (RNP) RWY XX, con «Authorization Required» |

### Lo que debe saber el piloto

La diferencia de fondo no es el número: es **quién garantiza el margen**.

En RNP APCH, parte del margen lo pone el diseño del procedimiento, con su zona secundaria. En RNP AR, el margen es el que da la performance del avión y la precisión del pilotaje, porque el área protegida es dos veces el valor RNP y nada más. Por eso se exige autorización, equipo, entrenamiento y, en algunos casos, redundancia.

#### Y una diferencia de guía vertical

La performance de navegación vertical de RNP AR APCH se basa en guía vertical barométrica o en aumentación satelital. No es un detalle menor: si la guía vertical es barométrica, todo el capítulo 20 se aplica con más razón, porque el margen lateral tampoco perdona.

### En operación de aerolínea

Un piloto puede pasar años volando RNP APCH y no volar nunca una RNP AR, porque RNP AR existe para lugares concretos. Lo que no puede es confundirlas en una entrevista, ni suponer que su autorización de una le sirve para la otra.

### ¿Qué debe verificar?

Lo mismo de siempre, pero con una pregunta añadida: **¿esta aproximación dice «Authorization Required»?** Si lo dice, el juego es otro y hay que confirmar autorización, valor mínimo autorizado, elegibilidad RF, capacidad de la frustrada y gradientes.

### Error frecuente

Además del clásico de tratarlas como equivalentes, hay uno más fino: suponer que una RNP AR es «una RNP APCH con RNP más bajo». El valor es una consecuencia, no la definición. La definición es la autorización y el diseño sin colchón.

### En pocas palabras

- RNP AR exige autorización específica sin excepciones; RNP APCH, no.
- En RNP AR la elegibilidad de tramo RF y el escalado son obligatorios; en RNP APCH el RF es opcional.
- En RNP AR el área lateral es 2 × RNP, sin zona secundaria: no hay colchón.
- La frustrada de una RNP AR puede exigir menos de 1.00 NM y equipo redundante.
- La carta de una RNP AR dice «Authorization Required».

### Quiz · Capítulo 23

**p23-q1** · ¿Cuál es la diferencia de fondo entre RNP APCH y RNP AR APCH?
- A) Que RNP AR usa un valor RNP más bajo.
- B) Que RNP AR exige autorización específica y su área de obstáculos no tiene zona secundaria: el margen lo pone la performance del avión y el pilotaje.
- C) Que RNP APCH no admite guía vertical.
- D) Que RNP AR solo se vuela con aumentación satelital.
**Correcta:** B · **Tema:** P23 · **Referencia:** FAA AIM 5-4-18; FAA AC 90-101A, numeral 1
**Explicación:** El valor más bajo es una consecuencia del diseño, no la definición. Lo que define RNP AR es la autorización específica, sin excepciones, y un área lateral de evaluación de obstáculos de dos veces el valor RNP sin zona secundaria.

**p23-q2** · ¿Cómo se trata la elegibilidad de tramo RF en cada especificación?
- A) Obligatoria en las dos.
- B) Opcional en las dos.
- C) Opcional en RNP APCH y obligatoria en cualquier autorización RNP AR.
- D) Obligatoria en RNP APCH y opcional en RNP AR.
**Correcta:** C · **Tema:** P23 · **Referencia:** FAA AIM 1-2-1, apartado RNP APCH; FAA AIM 5-4-18, apartado de tramos RF
**Explicación:** En RNP APCH la capacidad RF es opcional y hay que verla listada como característica del equipo. En RNP AR, la elegibilidad para tramos RF es requerida en cualquier autorización, porque muchos de esos procedimientos los contienen.

**p23-q3** · ¿En qué se basa la performance de navegación vertical de una RNP AR APCH?
- A) Solo en guía vertical satelital.
- B) Solo en guía vertical barométrica.
- C) En guía vertical barométrica o en aumentación satelital.
- D) En el radioaltímetro.
**Correcta:** C · **Tema:** P23 · **Referencia:** FAA AIM 1-2-1, apartado RNP AR APCH
**Explicación:** Puede basarse en Baro-VNAV o en aumentación satelital. Si es barométrica, las limitaciones de ajuste altimétrico y de temperatura se aplican igual, y con menos margen lateral disponible para absorber cualquier otro problema.

---

# BLOQUE 5 · LA TRAYECTORIA

---

## 24. EL TRAMO RF

**ID:** P24 · **Tiempo:** 7 min

### Concepto

Radius to Fix. Un tramo RF es una **trayectoria circular de radio constante alrededor de un centro de giro definido, que empieza y termina en un punto**. Puede publicarse como parte de un procedimiento.

Lo que lo distingue de un giro normal entre dos waypoints es que aquí la curva **es** la trayectoria publicada, no el resultado de que el avión anticipe un giro. El radio, el centro y los dos extremos están definidos, y la trayectoria protegida es ese arco.

### Lo que debe saber el piloto

#### Cómo aparece en el procedimiento

Los requisitos de tramo RF se indican en la sección de notas de la carta o en el punto de aproximación inicial aplicable. Y la capacidad de volarlos:

- En RNP APCH y en RNP 1, es **opcional**: tiene que estar listada como característica del equipo.
- En RNP AR y en A-RNP, es **obligatoria**.

#### Qué se espera del piloto en un RF

Dos cosas, y las dos vienen de los requisitos de conocimiento de la circular de la FAA:

- **Mantener la trayectoria publicada.** El arco es la trayectoria; salirse de él no es un atajo, es salirse del área protegida.
- **Mantener las velocidades máximas publicadas.** La circular lo enumera expresamente como conocimiento requerido: la importancia de mantener la trayectoria publicada y las velocidades máximas mientras se ejecutan operaciones RNP con tramos RF.

La razón es geométrica y se entiende sin matemáticas: un arco de radio fijo volado más rápido exige más inclinación. Si la velocidad sube por encima de lo previsto, el avión no consigue quedarse en el arco.

#### Por qué no se modifica

Un tramo RF codificado no se retoca. Cambiar un punto, insertar un directo o eliminar una discontinuidad en medio de un RF puede destruir la geometría del arco y convertir la trayectoria en algo que no está protegido.

### En operación de aerolínea

Un RF típico aparece en llegadas de terminales con terreno, y en salidas RNP AR puede empezar **tan pronto como el extremo de salida de la pista**. Eso significa que el giro puede comenzar muy cerca del suelo, con el avión limpio a medias y la carga de trabajo alta.

### ¿Qué debe verificar?

- Si el procedimiento tiene un tramo RF, en las notas o en el IAF.
- Si el avión tiene la capacidad RF listada.
- La velocidad máxima publicada para el tramo.
- Qué dice el SOP del operador sobre automatización en tramos RF.

### ¿Qué ocurre si no se cumple?

Sin la capacidad, el procedimiento no se vuela. Con la capacidad pero por encima de la velocidad prevista, el avión se sale del arco, y en RNP AR el área lateral protegida es dos veces el valor RNP, sin zona secundaria.

### Comunicación ATC

Si el ATC pide algo incompatible con el tramo (una velocidad que no se puede mantener, un directo que rompe el arco), se dice. Es más fácil renegociar una instrucción que recuperar una trayectoria.

### Error frecuente

«RF significa simplemente un giro cerrado.» No: significa un arco de radio constante, definido, que es la trayectoria publicada. Un giro cerrado es lo que hace el avión; un RF es lo que está dibujado en la carta.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Vista en planta. A la izquierda, el waypoint A con la derrota de entrada. A la derecha, el waypoint B con la derrota de salida. Entre los dos, un arco de radio constante dibujado en magenta gruesa, con el centro del arco marcado con una cruz y una línea de puntos que va del centro a cada extremo del arco, ambas acotadas con el mismo rótulo «R». Sobre el arco, la silueta de un avión inclinada, siguiendo la curva. Al pie, un recuadro: «la trayectoria publicada es el arco. La velocidad máxima del tramo está en la carta». Para contraste, en gris claro y con línea de puntos, el giro que haría el avión si simplemente anticipara el paso por un waypoint, claramente fuera del arco.

OBJETIVO:
Mostrar qué diferencia un tramo RF de un giro convencional entre waypoints, y dejar visible que la velocidad es lo que permite quedarse dentro del arco.

### En pocas palabras

- Un tramo RF es una trayectoria circular de radio constante alrededor de un centro definido, entre dos puntos.
- Capacidad opcional en RNP APCH y RNP 1; obligatoria en RNP AR y A-RNP.
- Hay que mantener la trayectoria publicada y las velocidades máximas publicadas.
- Un RF codificado no se modifica: cambiarlo destruye la geometría del arco.

### Quiz · Capítulo 24

**p24-q1** · ¿Qué es un tramo RF?
- A) Un giro cerrado que el FMS ejecuta al anticipar un waypoint.
- B) Una trayectoria circular de radio constante alrededor de un centro de giro definido, que empieza y termina en un punto.
- C) Un tramo que se vuela con rumbo constante hasta interceptar una derrota.
- D) Un procedimiento de espera de radio reducido.
**Correcta:** B · **Tema:** P24 · **Referencia:** FAA AC 90-101A, numeral 3, apartado g; FAA AIM 1-2-1
**Explicación:** Es la definición literal. La clave operacional es que el arco es la trayectoria publicada y protegida, no una consecuencia de cómo el avión toma el giro.

**p24-q2** · ¿Por qué importa la velocidad en un tramo RF?
- A) Porque afecta el consumo de combustible.
- B) Porque un arco de radio fijo volado por encima de la velocidad prevista exige más inclinación y el avión no consigue quedarse en el arco.
- C) Porque el ATC calcula la separación con la velocidad publicada.
- D) No importa: el FMS ajusta el radio a la velocidad real.
**Correcta:** B · **Tema:** P24 · **Referencia:** FAA AC 90-105A, numeral 8.4.3, apartado 14
**Explicación:** El radio está definido, así que la única variable es la inclinación necesaria para seguirlo. La circular enumera entre los conocimientos requeridos la importancia de mantener la trayectoria publicada y las velocidades máximas en operaciones RNP con tramos RF.

**p24-q3** · Tu avión es elegible para RNP APCH. ¿Puedes volar una aproximación RNP APCH con un tramo RF?
- A) Sí: la elegibilidad RNP APCH incluye los tramos RF.
- B) Solo si los tramos RF figuran listados como característica del equipo de aviónica.
- C) No: los tramos RF son exclusivos de RNP AR.
- D) Sí, si el piloto automático está acoplado.
**Correcta:** B · **Tema:** P24 · **Referencia:** FAA AIM 1-2-1, apartado RNP APCH
**Explicación:** En RNP APCH la capacidad RF es opcional, así que la elegibilidad de la especificación no la incluye. Hay que verla listada aparte. En RNP AR, en cambio, es obligatoria en cualquier autorización.

---

## 25. FLY-BY Y FLY-OVER

**ID:** P25 · **Tiempo:** 6 min

### Concepto

Dos maneras de pasar por un waypoint, y la diferencia se ve en la trayectoria.

- **Fly-by.** El avión empieza el giro hacia la siguiente derrota **antes** de llegar al punto que separa los dos tramos. Eso se llama anticipación del giro.
- **Fly-over.** El avión **tiene que sobrevolar** el punto antes de empezar el giro.

### Lo que debe saber el piloto

La codificación está en la base de datos: en la mayoría de receptores, la base incluye la codificación que informa al sistema de navegación de qué puntos son fly-over y cuáles fly-by, y el sistema puede dar la guía correspondiente, anticipando el giro antes de un fly-by o haciendo sobrevolar un fly-over.

Y aquí viene lo que hay que saber de verdad: **donde el sistema no proporciona esa guía, el piloto debe ejecutar la anticipación del giro o el sobrevuelo del punto manualmente.** La simbología de la carta para el punto fly-by le da al piloto conciencia de lo que se espera.

#### Lo que cambia la anticipación

La anticipación del giro depende de la velocidad y de la altitud, y eso también está en la lista de conocimientos requeridos de la circular. A más velocidad, el giro empieza antes y el radio es mayor. Por eso en una llegada rápida los puntos se «cortan» más que en una lenta.

### En operación de aerolínea

En la práctica, la diferencia se nota en dos sitios:

- **En las restricciones de altitud.** Si la restricción está en un punto fly-by, el avión empieza a girar antes de llegar, pero la restricción sigue siendo del punto.
- **En la conciencia de la trayectoria.** Un punto fly-over que el avión trata como fly-by, o al revés, produce una trayectoria distinta de la publicada.

### ¿Qué debe verificar?

- La simbología de los puntos en la carta.
- Que la trayectoria que dibuja el FMS coincide con lo que la carta espera.
- Si el sistema no da la guía correspondiente, quién ejecuta la anticipación o el sobrevuelo y cómo.

### ¿Qué ocurre si no se cumple?

La trayectoria real se aparta de la publicada, y en un procedimiento diseñado con márgenes estrechos eso importa.

### Error frecuente

Suponer que el avión «siempre» hace lo correcto porque el punto está en la base de datos. En la mayoría de los casos sí, pero la norma contempla expresamente el caso en que no, y entonces es trabajo del piloto.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Dos paneles iguales, uno al lado del otro, cada uno con dos derrotas que se cruzan en un waypoint dibujado como triángulo. Panel izquierdo, rotulado «FLY-BY»: el waypoint sin círculo alrededor, y la trayectoria del avión dibujada en magenta empezando a curvar **antes** del punto, pasando por dentro de la esquina, con una llave que acote la distancia de anticipación y el rótulo «depende de velocidad y altitud». Panel derecho, rotulado «FLY-OVER»: el waypoint con el círculo que lo marca como tal, y la trayectoria pasando exactamente por encima del punto y curvando después, con un pequeño lazo de recuperación hacia la derrota siguiente.

OBJETIVO:
Que el estudiante identifique de inmediato la diferencia de trayectoria y entienda que la anticipación no es un valor fijo.

### En pocas palabras

- Fly-by: el giro empieza antes del punto, con anticipación. Fly-over: hay que sobrevolar el punto antes de girar.
- La codificación está en la base de datos y la simbología, en la carta.
- Donde el sistema no da esa guía, la anticipación o el sobrevuelo los hace el piloto.
- La anticipación del giro depende de la velocidad y de la altitud.

### Quiz · Capítulo 25

**p25-q1** · ¿Qué diferencia hay entre un waypoint fly-by y uno fly-over?
- A) El fly-by se sobrevuela y el fly-over se anticipa.
- B) En el fly-by el giro empieza antes del punto; en el fly-over hay que sobrevolar el punto antes de empezar el giro.
- C) El fly-over solo existe en procedimientos convencionales.
- D) El fly-by exige piloto automático y el fly-over no.
**Correcta:** B · **Tema:** P25 · **Referencia:** FAA AIM 1-2-2, apartados de waypoints
**Explicación:** Es la definición: el fly-by se usa cuando el avión debe empezar el giro hacia la derrota siguiente antes de llegar al punto que separa los tramos, lo que se llama anticipación del giro; el fly-over, cuando debe volar sobre el punto antes de iniciar el giro.

**p25-q2** · El sistema de navegación no proporciona guía de anticipación de giro para un punto fly-by. ¿Qué corresponde?
- A) Tratar el punto como fly-over.
- B) Ejecutar la anticipación del giro manualmente.
- C) Solicitar vectores al ATC.
- D) Insertar un directo al punto siguiente.
**Correcta:** B · **Tema:** P25 · **Referencia:** FAA AIM 5-4-5, apartado de waypoints
**Explicación:** El AIM lo dice expresamente: donde el sistema de navegación no proporciona esa guía, el piloto debe ejecutar la anticipación del giro o el sobrevuelo del punto manualmente. La simbología de la carta existe justamente para dar esa conciencia.

**p25-q3** · ¿De qué depende la anticipación del giro en un punto fly-by?
- A) Solo del ángulo entre las dos derrotas.
- B) De la velocidad y la altitud, entre otros factores.
- C) Del valor RNP del segmento.
- D) Del tipo de piloto automático instalado.
**Correcta:** B · **Tema:** P25 · **Referencia:** FAA AC 90-105A, numeral 8.4.3, apartado 11
**Explicación:** La circular enumera entre los conocimientos requeridos la anticipación del giro considerando los efectos de velocidad y altitud. El ángulo entre derrotas también influye, pero no es lo único, y por eso la anticipación no es un valor fijo del procedimiento.

---

## 26. LOS TERMINADORES DE TRAMO

**ID:** P26 · **Tiempo:** 6 min

### Concepto

El FMS no vuela la carta: vuela una secuencia de **tramos codificados**. Cada tramo lleva una instrucción que dice cómo se define y dónde termina, y esas instrucciones son los terminadores de tramo, definidos en la especificación ARINC 424.

Este capítulo no es de codificación. Es de por qué el avión hace a veces algo que la carta no parecía decir.

### Lo que debe saber el piloto

Los que conviene reconocer conceptualmente, porque son los que la circular de la FAA exige que el sistema pueda ejecutar y mantener:

| Terminador | Qué define |
|---|---|
| IF · *Initial Fix* | El punto donde empieza la secuencia |
| TF · *Track to Fix* | Una derrota recta entre dos puntos definidos |
| CF · *Course to Fix* | Un rumbo o curso determinado hasta un punto |
| DF · *Direct to Fix* | Desde la posición actual, directo a un punto |
| RF · *Radius to Fix* | El arco de radio constante del capítulo 24 |

La circular exige, para RNP APCH y para otras especificaciones, la capacidad de ejecutar automáticamente las transiciones entre tramos y mantener derrotas consistentes con IF, TF y DF, o sus equivalentes. Para los tramos RF, la capacidad se trata por separado y por eso es opcional en unas especificaciones y obligatoria en otras.

#### Lo que no hay que hacer

No hay que memorizar el catálogo completo de ARINC 424. Lo que hay que entender es la idea: **el comportamiento del avión en una transición depende de cómo está codificado el tramo**, y si el avión hace algo inesperado, ahí está una de las explicaciones posibles.

#### Una salvaguarda que protege la trayectoria

El proveedor de la base de datos **no debe sustituir terminadores de tramo** por otros distintos de los especificados en los datos originales del AIP del Estado. Es la razón por la que un procedimiento codificado se parece a la carta, y también la razón por la que una discrepancia entre los dos es un asunto serio y no una curiosidad.

### En operación de aerolínea

La utilidad de conocer esto es concreta: cuando la trayectoria dibujada no coincide con la expectativa, la pregunta no es «¿está roto el FMS?», es «¿cómo está definido este tramo?». Y la respuesta se busca en la página de tramos, comparando con la carta.

### ¿Qué debe verificar?

Que la secuencia y las derrotas que muestra el FMS coinciden con las de la carta. No hay que verificar los códigos: hay que verificar el resultado.

### Error frecuente

Dos extremos igual de malos: creer que hay que memorizar ARINC 424, y creer que no hace falta saber nada de esto. Lo segundo lleva a aceptar como normal cualquier cosa que dibuje el FMS.

### En pocas palabras

- El FMS vuela tramos codificados, no la carta.
- Los que conviene reconocer: IF, TF, CF, DF y RF.
- El sistema debe poder ejecutar las transiciones y mantener derrotas consistentes con IF, TF y DF.
- El proveedor de la base no debe sustituir terminadores por otros distintos de los del AIP original.

### Quiz · Capítulo 26

**p26-q1** · ¿Qué define un terminador de tramo TF?
- A) Un rumbo determinado hasta un punto.
- B) Una derrota recta entre dos puntos definidos.
- C) Un arco de radio constante.
- D) Un directo desde la posición actual a un punto.
**Correcta:** B · **Tema:** P26 · **Referencia:** FAA AC 90-105A, Apéndice A, numeral A.3.8, apartado 10; especificación ARINC 424
**Explicación:** *Track to Fix* define una derrota recta entre dos puntos. CF es un rumbo o curso hasta un punto, DF un directo desde la posición actual, y RF el arco de radio constante.

**p26-q2** · ¿Por qué le interesa a un piloto saber que existen los terminadores de tramo?
- A) Para poder codificar procedimientos en el FMS.
- B) Porque el comportamiento del avión en una transición depende de cómo está codificado el tramo, y eso explica trayectorias inesperadas.
- C) Porque el ATC los nombra en las autorizaciones.
- D) Porque determinan el valor RNP del segmento.
**Correcta:** B · **Tema:** P26 · **Referencia:** FAA AC 90-105A, numeral 8.4.3, apartado 15
**Explicación:** La circular incluye entre los conocimientos requeridos la representación de los terminadores de tramo y las trayectorias asociadas. No se trata de codificar nada: se trata de tener una explicación cuando la trayectoria no es la esperada.

**p26-q3** · ¿Qué dice la norma sobre la sustitución de terminadores de tramo por parte del proveedor de la base de datos?
- A) Que puede sustituirlos si mejora la codificación.
- B) Que no debe sustituirlos por otros distintos de los especificados en los datos originales del AIP del Estado.
- C) Que debe sustituirlos siempre por TF, que es el más simple.
- D) Que la sustitución la autoriza el operador.
**Correcta:** B · **Tema:** P26 · **Referencia:** FAA AC 90-105A, Apéndice A, numeral A.4.2
**Explicación:** El proveedor no debe sustituir terminadores en lugar de los especificados en los datos originales del AIP del Estado. Es la garantía de que el procedimiento codificado corresponde al publicado, y por eso una discrepancia hay que tomarla en serio.

---

## 27. LA DESVIACIÓN LATERAL

**ID:** P27 · **Tiempo:** 6 min

### Concepto

Cross-track error, XTK. Es la distancia entre la posición del avión y la trayectoria deseada, medida perpendicularmente a esa trayectoria. Es lo que el piloto ve y lo que el piloto corrige.

### Lo que debe saber el piloto

Tres piezas que se relacionan:

- **La trayectoria deseada** (*desired path*): la que el procedimiento define.
- **La posición del avión**: donde está.
- **La desviación lateral**: la diferencia entre las dos, presentada en la pantalla.

La circular de la FAA lo pide explícitamente para RNP APCH: hay que tener seleccionadas las presentaciones que permitan vigilar la derrota calculada por el sistema **y** la posición del avión respecto de la trayectoria, es decir la desviación lateral, para vigilar el error técnico de vuelo.

#### El escalado de la indicación

Un punto que se pregunta: la sensibilidad de la presentación de desviación lateral no es fija. La circular incluye entre los conocimientos requeridos la selección apropiada del escalado del indicador de desviación de curso. En la práctica esto significa que la misma desviación en millas se ve distinta en ruta que en final, y que hay que saber qué escala se está mirando.

#### Minimizar el XTK es parte del oficio

La circular lo dice entre los conocimientos requeridos: el uso recomendado por el operador de la automatización según fase de vuelo y carga de trabajo, **incluidos los métodos para minimizar el error de desviación lateral y mantener el eje de la ruta**.

### En operación de aerolínea

La desviación lateral es el instrumento de vigilancia del piloto. El sistema vigila su propia estimación de posición; el piloto vigila si el avión está sobre la línea. Son dos vigilancias distintas y complementarias, y es el tema del capítulo siguiente.

### ¿Qué debe verificar?

- Que la presentación de desviación lateral está seleccionada y visible.
- Qué escala está activa.
- Que la derrota calculada por el sistema es la que la carta publica.

### ¿Qué ocurre si no se cumple?

Sin la presentación de desviación lateral no hay manera de vigilar el error técnico de vuelo, y la operación pierde una de sus dos defensas.

### Error frecuente

Confundir «estoy en la línea magenta» con «el sistema sabe dónde estoy». La línea magenta se dibuja respecto de la posición que el sistema **estima**. Si esa estimación está corrida, el avión puede estar perfectamente centrado en la pantalla y desplazado en el mundo real.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Vista en planta de un tramo. La trayectoria deseada en magenta continua, con el rótulo «DESIRED PATH». La silueta del avión desplazada a la derecha de la línea. Una flecha corta y perpendicular que une el avión con la línea, acotada y rotulada «XTK». Al lado, una miniatura de la presentación de desviación lateral en cabina con la aguja desplazada la misma proporción, unida a la vista en planta por una línea de puntos, para que se vea que una cosa es la otra.

OBJETIVO:
Visualizar qué es la desviación lateral y unir la vista en planta con lo que el piloto ve en la pantalla.

### En pocas palabras

- La desviación lateral (XTK) es la distancia perpendicular entre la posición del avión y la trayectoria deseada.
- Hay que tenerla presentada para vigilar el error técnico de vuelo.
- La sensibilidad de la presentación cambia con la fase: hay que saber qué escala se está mirando.
- Minimizar el XTK para mantener el eje es parte del uso recomendado de la automatización.

### Quiz · Capítulo 27

**p27-q1** · ¿Para qué exige la norma tener presentada la desviación lateral en una RNP APCH?
- A) Para calcular el tiempo al punto siguiente.
- B) Para vigilar el error técnico de vuelo.
- C) Para determinar el valor RNP del segmento.
- D) Para verificar el ajuste altimétrico.
**Correcta:** B · **Tema:** P27 · **Referencia:** FAA AC 90-105A, Apéndice A, numeral A.7.2.2
**Explicación:** La circular pide seleccionar las presentaciones que permitan vigilar la derrota calculada y la posición del avión respecto de la trayectoria, la desviación lateral, para vigilar el error técnico de vuelo. Es la vigilancia que hace el piloto, no el sistema.

**p27-q2** · Estás perfectamente centrado en la presentación de desviación lateral. ¿Qué garantiza eso?
- A) Que el avión está sobre la trayectoria publicada, en el mundo real.
- B) Que el avión está sobre la trayectoria calculada respecto de la posición que el sistema estima.
- C) Que el error total del sistema es cero.
- D) Que la performance requerida se está cumpliendo.
**Correcta:** B · **Tema:** P27 · **Referencia:** FAA AC 90-105A, numerales 4.3.1 a 4.3.4
**Explicación:** La indicación se construye sobre la posición estimada. Si esa estimación tiene error, el avión puede estar centrado en pantalla y desplazado respecto de la posición verdadera: es la diferencia entre error técnico de vuelo y error del sistema de navegación.

**p27-q3** · ¿Qué ocurre con la sensibilidad de la presentación de desviación lateral?
- A) Es fija para todas las fases de vuelo.
- B) Cambia con la fase, y el piloto debe saber qué escalado está activo.
- C) La fija el ATC según la densidad de tráfico.
- D) Solo cambia en procedimientos RNP AR.
**Correcta:** B · **Tema:** P27 · **Referencia:** FAA AC 90-105A, numeral 8.4.3, apartado 13
**Explicación:** La circular incluye entre los conocimientos requeridos comprender las condiciones operacionales de las operaciones RNP, con la selección apropiada del escalado del indicador de desviación de curso. Una misma desviación en millas se ve distinta según la escala activa.

---

## 28. PDE, NSE Y TSE

**ID:** P28 · **Tiempo:** 7 min

### Concepto

De dónde sale el error total. Son tres componentes y una suma, y con las definiciones de la circular de la FAA se explican en una frase cada una:

- **PDE**, *Path Definition Error*: la diferencia entre la trayectoria **definida** y la trayectoria **deseada** en un punto determinado.
- **NSE**, *Navigation System Error*: la diferencia entre la posición **verdadera** y la posición **estimada**.
- **FTE**, *Flight Technical Error*: la precisión con que se controla el avión, medida por la posición **indicada** respecto de la posición **mandada o deseada** indicada. No incluye errores de bulto (*blunder errors*).
- **TSE**, *Total System Error*: la diferencia entre la posición verdadera y la posición deseada, y es igual a la **suma vectorial** de FTE, PDE y NSE.

```
PDE  (trayectoria definida vs deseada)
NSE  (posición verdadera vs estimada)
FTE  (control del avión respecto de lo mandado)
                      ↓
TSE  (posición verdadera vs deseada) = suma vectorial de los tres
```

### Lo que debe saber el piloto

Aquí está la parte que de verdad cambia la manera de trabajar, y es una nota de la circular que conviene leer dos veces:

**Cumplir con el requisito de control y alerta de la performance no implica un control automático del error técnico de vuelo.** La función de control y alerta a bordo debe consistir, como mínimo, en un algoritmo de control y alerta del error del sistema de navegación **y** en una presentación de desviación lateral que permita a la tripulación vigilar el error técnico de vuelo.

Traducido a reparto de tareas:

| Componente | Quién lo vigila |
|---|---|
| NSE | El sistema, con su algoritmo de control y alerta |
| FTE | **La tripulación**, con la presentación de desviación lateral |
| PDE | Se considera **despreciable**, por el proceso de integridad de la base de datos y los procedimientos de tripulación |

Que PDE se considere despreciable no es un regalo: es una consecuencia de que la base de datos esté controlada y de que la tripulación verifique. Si esas dos cosas se relajan, el supuesto deja de ser válido.

### En operación de aerolínea

La consecuencia práctica es la del capítulo anterior, ahora con nombre: cuando el avión no alerta, no significa que todo esté bien; significa que el **NSE** está dentro de límites. El FTE lo está mirando el piloto, y si nadie lo mira, nadie lo está vigilando.

### ¿Qué debe verificar?

Que se está vigilando lo que le corresponde al piloto: la desviación lateral. Y que el reparto está claro entre los dos tripulantes.

### Error frecuente

«Si el avión no alerta, la performance está bien.» Incompleto: el avión alerta sobre su propia estimación de posición. El error de pilotaje no lo vigila él.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Diagrama de convergencia. Tres flechas entrando por la izquierda, cada una con su caja rotulada: «PDE · trayectoria definida frente a deseada · se considera despreciable», «NSE · posición verdadera frente a estimada · lo vigila el sistema», «FTE · control del avión frente a lo mandado · lo vigila la tripulación». Las tres convergen en una caja mayor a la derecha rotulada «TSE · posición verdadera frente a deseada», con el pie «suma vectorial de los tres». Debajo, una banda con el reparto de tareas en dos columnas: «el sistema alerta del NSE» y «la tripulación vigila el FTE en la desviación lateral».

OBJETIVO:
Dar una comprensión conceptual de las tres fuentes de error sin entrar en ingeniería, y dejar visible el reparto de vigilancia entre el sistema y la tripulación.

### En pocas palabras

- PDE: trayectoria definida frente a deseada. NSE: posición verdadera frente a estimada. FTE: control del avión frente a lo mandado.
- TSE es la suma vectorial de los tres: posición verdadera frente a posición deseada.
- El control y alerta a bordo vigila el NSE, no el FTE.
- El FTE lo vigila la tripulación con la presentación de desviación lateral. PDE se considera despreciable por la integridad de la base de datos y los procedimientos.

### Quiz · Capítulo 28

**p28-q1** · ¿Qué es el error total del sistema (TSE)?
- A) El mayor de los tres errores componentes.
- B) La diferencia entre la posición verdadera y la posición deseada, igual a la suma vectorial de FTE, PDE y NSE.
- C) La diferencia entre la posición estimada y la posición deseada.
- D) El error de pilotaje más el error de la base de datos.
**Correcta:** B · **Tema:** P28 · **Referencia:** FAA AC 90-105A, numeral 4.3.4
**Explicación:** Es la definición literal: diferencia entre la posición verdadera y la deseada, igual a la suma vectorial de los tres componentes. No es el mayor de ellos ni una suma de dos.

**p28-q2** · ¿Qué vigila la función de control y alerta a bordo?
- A) El error técnico de vuelo.
- B) El error del sistema de navegación, con un algoritmo de control y alerta; el error técnico de vuelo lo vigila la tripulación con la presentación de desviación lateral.
- C) Los tres componentes del error total.
- D) El error de definición de la trayectoria.
**Correcta:** B · **Tema:** P28 · **Referencia:** FAA AC 90-105A, nota al numeral 4.2
**Explicación:** La circular lo aclara expresamente: cumplir el requisito de control y alerta no implica un control automático del error técnico de vuelo. La función debe consistir al menos en un algoritmo de control y alerta del NSE y en una presentación de desviación lateral que permita a la tripulación vigilar el FTE.

**p28-q3** · ¿Por qué se considera despreciable el error de definición de la trayectoria (PDE)?
- A) Porque es imposible de medir.
- B) Por el proceso de integridad de la base de datos y los procedimientos de tripulación.
- C) Porque el FMS lo compensa automáticamente.
- D) Porque solo aparece en procedimientos convencionales.
**Correcta:** B · **Tema:** P28 · **Referencia:** FAA AC 90-105A, nota al numeral 4.2
**Explicación:** Se asume cero por el proceso de integridad de la base de datos y los procedimientos de tripulación. Es un supuesto que se sostiene sobre dos cosas concretas, y si alguna se relaja, deja de valer.

---

## 29. LA FRUSTRADA EN PBN

**ID:** P29 · **Tiempo:** 6 min

### Concepto

La aproximación frustrada también tiene requisitos de navegación, y se olvidan con facilidad porque la atención está puesta en llegar.

### Lo que debe saber el piloto

#### La frustrada tiene su propio valor

En RNP APCH, el valor vuelve a **1** en el segmento de frustrada, después de haber estado en 0.3 en la final. En RNP 1, la frustrada aplica valor 1. Y en RNP AR, algunos procedimientos exigen **menos de 1.00 NM** en la frustrada, con equipo redundante y con la autorización del operador diciendo expresamente si puede volarla.

#### La frustrada puede apoyarse en radioayuda convencional

Un dato de la circular de la FAA que sorprende y que conviene tener: para RNP APCH, el GPS es el sistema de navegación primario, los sistemas basados en DME/DME **no** son aceptables, y **el segmento de frustrada puede basarse en una radioayuda convencional**, por ejemplo VOR, DME o NDB.

Esto tiene una consecuencia de preparación: la frustrada de una aproximación PBN puede exigir tener sintonizada y verificada una radioayuda convencional. Lo dice la carta.

#### Y puede exigir gradientes no estándar

En RNP AR, la frustrada puede requerir gradientes de ascenso no estándar, la carta los refleja y hay que confirmar que se pueden cumplir antes de iniciar la aproximación.

### En operación de aerolínea

El briefing de aproximación tiene que incluir la frustrada con el mismo detalle que la aproximación: qué capacidad exige, qué puntos, qué derrota inicial, qué altitudes, qué espera, y qué pasa si se pierde una capacidad justo cuando se necesita.

Porque el momento en que se vuela la frustrada es, por definición, un momento en que algo no salió como se esperaba.

### ¿Qué debe verificar?

- El requisito de navegación de la frustrada, que puede no ser el de la aproximación.
- Si se apoya en una radioayuda convencional, y si está sintonizada y verificada.
- Los puntos, la derrota inicial, las altitudes y la espera.
- El gradiente, si es no estándar.
- Si la capacidad se conserva después de la falla que motivó la frustrada.

### ¿Qué ocurre si no se cumple?

Se ejecuta una frustrada por una trayectoria que no está protegida, en el momento de menos margen del vuelo.

### Error frecuente

Revisar la aproximación y no la frustrada. Y el error asociado: suponer que la capacidad que vale para la final vale para la frustrada. En RNP AR puede ser justo lo contrario, porque la frustrada puede pedir un valor más exigente.

### En pocas palabras

- La frustrada tiene su propio requisito de navegación, que puede no ser el de la aproximación.
- En RNP APCH el valor vuelve a 1; en RNP AR puede exigir menos de 1.00 NM, con equipo redundante y autorización específica.
- En RNP APCH el segmento de frustrada puede basarse en una radioayuda convencional: VOR, DME o NDB.
- Los gradientes no estándar se confirman antes de iniciar la aproximación.

### Quiz · Capítulo 29

**p29-q1** · En RNP APCH, ¿en qué puede basarse el segmento de frustrada?
- A) Solo en GNSS.
- B) En una radioayuda convencional, por ejemplo VOR, DME o NDB.
- C) En sistemas DME/DME.
- D) Solo en aumentación satelital.
**Correcta:** B · **Tema:** P29 · **Referencia:** FAA AC 90-105A, Apéndice A, numeral A.5.1
**Explicación:** La circular dice que el GPS es el sistema primario para RNP APCH, que los sistemas basados en DME/DME no son aceptables, y que el segmento de frustrada puede basarse en una radioayuda convencional como VOR, DME o NDB. De ahí la necesidad de tenerla sintonizada y verificada.

**p29-q2** · ¿Qué valor RNP aplica al segmento de frustrada en RNP APCH?
- A) 0.3
- B) 0.5
- C) 1
- D) 2
**Correcta:** C · **Tema:** P29 · **Referencia:** FAA AC 90-105A, numeral 5.1 y Tabla 5-1
**Explicación:** El valor se estrecha a 0.3 en la final y **vuelve a 1** en la frustrada. Es la mejor prueba de que el valor pertenece al segmento y no al procedimiento.

**p29-q3** · Una RNP AR exige una frustrada con valor menor de 1.00 NM. ¿Qué implica?
- A) Nada especial: cualquier avión RNP AR puede volarla.
- B) Que típicamente requiere equipo redundante y que la autorización del operador debe especificar si puede volarla.
- C) Que la frustrada se vuela con vectores del ATC.
- D) Que el valor de la final también debe ser menor de 1.00.
**Correcta:** B · **Tema:** P29 · **Referencia:** FAA AIM 5-4-18, apartado de frustradas con valor menor de 1.00 NM; FAA AC 90-101A, Apéndice, numeral 2, apartado c
**Explicación:** En ciertos lugares el entorno obliga a un valor menor de 1.00 en la frustrada, la operación típicamente requiere equipo redundante y la autorización emitida al operador especifica si puede volar una frustrada con ese requisito.

---

# BLOQUE 6 · EL FMS Y LOS DATOS

---

## 30. EL FMS EN PBN

**ID:** P30 · **Tiempo:** 7 min

### Concepto

La circular de la FAA define el FMS como un **sistema integrado** formado por sensores de a bordo, receptor y computador, con bases de datos de navegación y de performance de la aeronave, que proporciona guía de performance y de navegación de área a una presentación y al sistema automático de control de vuelo.

De esa definición, lo que le interesa al piloto es que el FMS **junta** cosas: sensores, datos y guía. Y que si cualquiera de las tres se degrada, la guía que sale al otro lado se degrada con ella.

### Lo que debe saber el piloto

Las funciones del FMS que sostienen una operación PBN, en el orden en que se usan:

| Función | Qué hace |
|---|---|
| Plan de vuelo | Guarda la ruta: puntos, tramos, restricciones |
| Base de datos de navegación | Aporta los procedimientos codificados y los puntos |
| Integración de sensores | Combina lo que dicen GNSS, DME, VOR e inerciales |
| Cálculo de posición | Estima dónde está el avión |
| Guía lateral | Manda la derrota a la presentación y al automático |
| Control de la performance | En especificaciones RNP, compara lo requerido con lo estimado y alerta |

### En operación de aerolínea

El punto que conviene tener claro es que el FMS es una herramienta de **gestión**, no un oráculo. Hace exactamente lo que se le programó, con los datos que tiene y con los sensores que le funcionan.

De ahí sale el principio que ordena todo este bloque y el siguiente: lo que el FMS muestra **se verifica**, no se acepta.

### ¿Qué debe verificar?

- Que el plan de vuelo cargado corresponde a la autorización.
- Que el procedimiento salió de la base de datos y no se escribió a mano.
- Qué fuente de posición está usando el sistema.
- Que la página de progreso o de tramos se está vigilando en la fase que corresponde.

### ¿Qué ocurre si no se cumple?

Se vuela una trayectoria distinta de la autorizada o de la publicada, con toda la automatización funcionando perfectamente.

### Error frecuente

«El FMS reemplaza la carta.» No la reemplaza: la ejecuta. La carta es la referencia contra la que se verifica lo que el FMS va a hacer, y eso es el tema del capítulo 36.

### En pocas palabras

- El FMS es un sistema integrado: sensores, receptor, computador y bases de datos de navegación y performance.
- Proporciona guía de performance y de navegación de área a la presentación y al automático.
- En especificaciones RNP añade el control de la performance y la alerta.
- Hace lo que se le programó: lo que muestra se verifica, no se acepta.

### Quiz · Capítulo 30

**p30-q1** · ¿Qué es un FMS según la definición de la circular de la FAA?
- A) Un receptor GNSS con pantalla.
- B) Un sistema integrado con sensores, receptor y computador, con bases de datos de navegación y de performance, que proporciona guía de performance y de navegación de área.
- C) La base de datos de navegación del avión.
- D) El computador que calcula la posición GNSS.
**Correcta:** B · **Tema:** P30 · **Referencia:** FAA AC 90-101A, numeral 3, apartado c
**Explicación:** Es la definición literal, y lo relevante es la palabra integrado: el FMS junta sensores, datos y guía, así que una degradación en cualquiera de esas entradas se traslada a la guía que entrega.

**p30-q2** · ¿Qué añade el FMS en una operación con especificación RNP que no necesita en una RNAV?
- A) El cálculo de la posición.
- B) La guía lateral.
- C) El control de la performance y la alerta a la tripulación.
- D) La base de datos de navegación.
**Correcta:** C · **Tema:** P30 · **Referencia:** RAC 91, definición de especificación RNP; FAA AC 90-105A, numeral 4.2
**Explicación:** El cálculo de posición, la guía lateral y la base de datos hacen falta en las dos familias. Lo que caracteriza RNP es el control de la performance conseguida y la identificación para el piloto de si el requisito operacional se está cumpliendo.

**p30-q3** · «El FMS reemplaza la carta.» ¿Por qué es falso?
- A) Porque la carta tiene información que el FMS no puede mostrar.
- B) Porque el FMS ejecuta lo que se le programó y la carta es la referencia contra la que se verifica lo que va a hacer.
- C) Porque el FMS no incluye las restricciones de altitud.
- D) Porque la carta es obligatoria por norma y el FMS no.
**Correcta:** B · **Tema:** P30 · **Referencia:** FAA AC 90-105A, numeral 8.4.4; FAA AIM 1-2-1
**Explicación:** El FMS es una herramienta de gestión que hace lo que se le programó con los datos que tiene. La carta es la referencia de verificación, y el AIM pide expresamente usar las capacidades de la aviónica para verificar los datos de puntos y derrotas después de cargar el procedimiento.

---

## 31. RNP FRENTE A ANP Y EPU

**ID:** P31 · **Tiempo:** 8 min

### Concepto

Dos magnitudes que se comparan, y no son lo mismo:

- **RNP**: la performance **requerida**. La pide el procedimiento o el espacio aéreo.
- **EPU**, *Estimate of Position Uncertainty*: una medida en millas náuticas, sobre una escala definida, que expresa la **performance de estimación de posición actual**. En ciertos aviones se conoce como **ANP** (*Actual Navigation Performance*) o **EPE** (*Estimate of Position Error*).

```
RNP        lo que el procedimiento exige
EPU / ANP  lo que el sistema estima que está consiguiendo
```

### Lo que debe saber el piloto

#### Lo que EPU no es

La circular lo dice de forma explícita y es la frase que hay que llevarse: **el EPU no es una estimación del error real, sino una indicación estadística definida** del error potencial.

Eso tiene una consecuencia mental importante. Ver «ANP 0.08» no significa que el avión esté a 0,08 NM de donde cree estar. Significa que, con la información que el sistema tiene, su indicación estadística de incertidumbre de posición vale eso.

#### El nombre cambia con el fabricante

ANP, EPU y EPE son el mismo concepto con nombre distinto según el avión. No hay un término universal, y por eso este módulo no pone mensajes concretos de FMS en la boca de ningún fabricante: **lo que dice la pantalla y cómo se llama está en el FCOM de la flota que se vuela.**

#### Y no todos los aviones lo muestran

Un punto que sorprende y que la circular deja claro: **no es necesario que las presentaciones de navegación, en particular el PFD, incluyan un valor de ANP o de EPE.** Las presentaciones solo necesitan proporcionar una **alerta** si la RNP de la operación no puede cumplirse.

O sea: el requisito es la alerta, no el número. Hay aviones donde se puede comparar el número, y hay aviones donde lo que llega es el aviso.

### En operación de aerolínea

Cuando el avión muestra los dos valores, la comparación es inmediata y es una buena herramienta de conciencia: si el valor estimado se acerca al requerido, hay margen para anticipar en vez de reaccionar.

Cuando el avión no muestra el número, la herramienta es la alerta, y entonces la conciencia la da el resto: qué fuentes están en uso, qué dicen los NOTAM, qué tan razonable es la posición que se está presentando.

### ¿Qué debe verificar?

- Qué valor RNP está aplicando el sistema al segmento en curso, y si se fija de forma automática o manual.
- Si el avión presenta el valor estimado y dónde.
- Qué dice el FCOM de la flota sobre cómo se presenta la alerta.

### Error frecuente

«ANP y RNP son lo mismo.» Son lo contrario de lo mismo: uno es el requisito y el otro es la estimación de lo que se está consiguiendo. Y el error fino: leer el valor estimado como si fuera el error real.

[ESPACIO PARA IMAGEN ANOTADA]

IMAGEN BASE:
Recreación educativa y genérica de una página de FMS, sin imitar la interfaz de ningún fabricante, con dos renglones de datos claramente separados: uno rotulado «RNP» con el valor 1.0 y otro rotulado «ANP» con el valor 0.08, más una zona inferior reservada para mensajes, vacía.

ANOTACIONES:
→ FLECHA 1: al renglón RNP.
EXPLICACIÓN: la performance requerida por el procedimiento o el espacio aéreo. Puede fijarse de forma automática o manual, según el sistema.
→ FLECHA 2: al renglón ANP.
EXPLICACIÓN: la indicación estadística de incertidumbre de posición del sistema. No es el error real. En otros aviones se llama EPU o EPE, y en algunos no se presenta.
→ FLECHA 3: a la zona de mensajes vacía.
EXPLICACIÓN: aquí aparecería la alerta si la performance requerida no pudiera cumplirse. La norma exige la alerta; no exige el número.

OBJETIVO PEDAGÓGICO:
Mostrar la comparación que hace el sistema y, al mismo tiempo, dejar claro que el número es opcional y la alerta no, y que el nombre depende del fabricante.

### En pocas palabras

- RNP es la performance requerida; EPU, ANP o EPE es la estimación de la performance de posición actual.
- El EPU no es una estimación del error real: es una indicación estadística definida del error potencial.
- El nombre depende del fabricante y está en el FCOM.
- No es obligatorio que la pantalla muestre el valor: lo obligatorio es la alerta si la RNP no puede cumplirse.

### Quiz · Capítulo 31

**p31-q1** · ¿Qué expresa el EPU?
- A) El error real de posición del avión.
- B) La performance de estimación de posición actual, como indicación estadística definida del error potencial, en millas náuticas.
- C) El valor RNP requerido por el procedimiento.
- D) La desviación lateral respecto de la trayectoria.
**Correcta:** B · **Tema:** P31 · **Referencia:** FAA AC 90-105A, Apéndice J, definición de EPU; FAA AC 90-101A, numeral 3, apartado b
**Explicación:** La definición es explícita: una medida sobre una escala definida, en millas náuticas, que expresa la performance de estimación de posición actual, y **no** es una estimación del error real sino una indicación estadística definida.

**p31-q2** · ¿Es obligatorio que el PFD muestre un valor de ANP o EPE?
- A) Sí, en todas las operaciones RNP.
- B) Sí, en operaciones RNP AR.
- C) No: lo que las presentaciones deben proporcionar es una alerta si la RNP de la operación no puede cumplirse.
- D) No, salvo que el operador lo solicite.
**Correcta:** C · **Tema:** P31 · **Referencia:** FAA AC 90-105A, Apéndice A, numeral A.3.8, apartado 6
**Explicación:** La circular dice que no es necesario que las presentaciones de navegación, en particular los PFD, incluyan un valor de ANP o EPE: solo necesitan proporcionar una alerta si la RNP de la operación no puede cumplirse. El requisito es el aviso, no el número.

**p31-q3** · Tu FMS muestra «RNP 1.0» y «ANP 0.08». ¿Qué está diciendo?
- A) Que el avión está a 0,08 NM de su posición verdadera.
- B) Que la performance requerida es 1.0 y la indicación estadística de incertidumbre de posición del sistema vale 0.08.
- C) Que la desviación lateral es de 0,08 NM.
- D) Que el valor RNP se puede reducir a 0.08.
**Correcta:** B · **Tema:** P31 · **Referencia:** FAA AC 90-105A, Apéndice J, definición de EPU
**Explicación:** Es la comparación entre requerido y estimado. El valor estimado no es el error real, y no habilita a volar a un valor menor: el valor aplicable lo fija el procedimiento y, en RNP AR, la autorización del operador.

---

## 32. CUANDO LA PERFORMANCE ESTIMADA YA NO ALCANZA

**ID:** P32 · **Tiempo:** 7 min

### Concepto

El momento en que el sistema concluye que no puede satisfacer la performance requerida, y lo dice. Es la razón de ser del control y alerta a bordo, y el capítulo que más se parece a lo que va a pasar de verdad.

### Lo que debe saber el piloto

La secuencia de actuación, en orden y sin adornos:

1. **Reconocer la alerta.** Saber qué es y qué no es. Un aviso de performance no es lo mismo que una falla de sensor, aunque puedan ir juntos.
2. **Mantener el control del avión.** Aviar antes que nada.
3. **Contrastar la posición.** Con lo que haya: datos crudos si están disponibles, otra fuente de navegación, distancia y marcación a una radioayuda, la pista si está a la vista, la posición que reporta el ATC.
4. **Aplicar el QRH y el SOP.** Lo que haya que hacer está ahí, no en la norma.
5. **Determinar qué capacidad de navegación queda.**
6. **Preguntarse si la especificación exigida todavía se puede cumplir.**
7. **Informar al ATC** y coordinar una autorización alternativa si la respuesta es no.

#### Lo que no se puede hacer aquí

**No inventar mensajes.** Lo que aparece en pantalla, cómo se llama y qué acción inmediata pide depende del fabricante: Airbus, Boeing, Embraer y los demás lo presentan de forma distinta. Este módulo no pone palabras concretas en la pantalla de nadie. Lo que el módulo enseña es la secuencia, y la secuencia es común.

**Verificar:** el mensaje exacto, su significado y la acción asociada están en el FCOM y el QRH de la flota. Es material de entrenamiento de tipo, y hay que buscarlo ahí.

### En operación de aerolínea

La diferencia entre una tripulación entrenada y una que improvisa está en el paso 6. Reconocer la alerta y aplicar el QRH lo hace casi cualquiera; **concluir si todavía se cumple lo que el procedimiento exige** requiere saber qué exige el procedimiento, y eso se preparó antes.

Por eso el briefing importa: si en el briefing se dijo «esta aproximación exige RNP APCH con el valor 0.3 en la final y la frustrada se apoya en el VOR», el paso 6 ya está medio contestado.

### ¿Qué debe verificar?

- Qué especificación y qué valor exige el segmento en curso.
- Qué fuentes de posición quedan y qué admite la especificación.
- Qué dice el QRH.
- Si conviene continuar, cambiar de línea de mínimos, frustrar o pedir otra autorización.

### Comunicación ATC

Se informa al ATC la pérdida de capacidad junto con el curso de acción propuesto, tan pronto como la situación lo permita. La fraseología se ve en el capítulo 50.

### Error frecuente

Actuar sobre el mensaje antes de volar el avión, y el opuesto: seguir volando el procedimiento sin contestar la pregunta de si todavía se puede cumplir. La alerta es información, y la decisión sigue siendo de la tripulación.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Dos escenarios en un mismo gráfico, uno encima del otro, compartiendo la trayectoria central. Escenario A, arriba, rotulado «PERFORMANCE ESTIMADA DENTRO DEL LÍMITE REQUERIDO»: la trayectoria en magenta, una franja de contención dibujada con línea continua, el avión dentro y un indicador en verde con el rótulo «NORMAL». Escenario B, abajo, rotulado «LA PERFORMANCE ESTIMADA YA NO SATISFACE LA REQUERIDA»: la misma trayectoria, la franja de contención ahora dibujada en línea de puntos y más ancha, el avión dentro de la trayectoria pero con un indicador de aviso, y el rótulo «ALERTA». Al pie, la secuencia en una tira horizontal de siete cajas pequeñas: reconocer · volar · contrastar · QRH y SOP · qué capacidad queda · ¿se cumple lo exigido? · informar al ATC.

OBJETIVO:
Visualizar qué significa control y alerta, y dejar la secuencia de actuación a la vista en la misma figura.

### En pocas palabras

- La alerta dice que el sistema ya no puede garantizar la performance requerida.
- Secuencia: reconocer, volar, contrastar la posición, QRH y SOP, determinar qué queda, preguntarse si se cumple lo exigido, informar al ATC.
- El mensaje concreto y su acción asociada están en el FCOM y el QRH de la flota, no en la norma.
- La alerta es información: la decisión es de la tripulación.

### Quiz · Capítulo 32

**p32-q1** · Recibes una alerta de performance de navegación durante una aproximación PBN. ¿Cuál es el orden correcto?
- A) Informar al ATC, identificar la falla, volar el avión y consultar el QRH.
- B) Volar el avión, reconocer la alerta, contrastar la posición, aplicar QRH y SOP, determinar la capacidad que queda, concluir si todavía se cumple lo exigido e informar al ATC.
- C) Frustrar de inmediato y comunicar al aterrizar.
- D) Reducir el valor RNP en el FMS y continuar.
**Correcta:** B · **Tema:** P32 · **Referencia:** FAA AC 90-105A, Apéndice A, numeral A.7.1.8 y numeral 8.4.3, apartado 23
**Explicación:** Aviar, navegar, comunicar, con la pregunta decisiva en el penúltimo lugar: si la especificación exigida todavía se puede cumplir. Reducir el valor RNP en el FMS no es una opción: el valor lo fija el procedimiento.

**p32-q2** · ¿Dónde se busca el significado exacto del mensaje que muestra el avión y la acción asociada?
- A) En la circular de la autoridad.
- B) En la carta del procedimiento.
- C) En el FCOM y el QRH de la flota.
- D) En el AIP del Estado.
**Correcta:** C · **Tema:** P32 · **Referencia:** FAA AC 90-105A, nota al numeral 8.4.3; práctica estándar de documentación de fabricante
**Explicación:** La presentación depende del fabricante y del modelo, y la propia circular anima a usar el entrenamiento y los procedimientos operacionales recomendados por el fabricante. La norma da el marco; el mensaje concreto está en la documentación del avión.

**p32-q3** · ¿Qué es lo que distingue a una tripulación preparada en este escenario?
- A) Reconocer el mensaje más rápido.
- B) Poder concluir si la especificación que exige el segmento todavía se puede cumplir, porque sabe qué exige.
- C) Aplicar el QRH de memoria.
- D) Informar al ATC antes de actuar.
**Correcta:** B · **Tema:** P32 · **Referencia:** FAA AC 90-105A, Apéndice A, numeral A.7.1.8
**Explicación:** La pérdida de capacidad se define como cualquier falla o suceso que haga que la aeronave deje de satisfacer los requisitos del procedimiento, así que la pregunta solo se puede contestar si se sabe qué requisitos son. Eso se prepara en el briefing.

---

## 33. LA BASE DE DATOS DE NAVEGACIÓN

**ID:** P33 · **Tiempo:** 8 min

### Concepto

PBN depende de datos correctamente cargados. La trayectoria que vuela el avión sale de un procedimiento **codificado** en la base de datos, no de la carta que el piloto lee. Si los dos no coinciden, hay un problema, y es un problema serio.

### Lo que debe saber el piloto

#### Qué exige la norma

- Los datos de navegación de a bordo deben ser **actuales y apropiados** para la región de la operación, e incluir radioayudas, puntos y los procedimientos codificados de terminal pertinentes para la salida, la llegada y los aeródromos de alternativa.
- Antes de usar un procedimiento o un punto recuperado de la base de datos, el piloto debe **verificar la validez** de la base.
- Se espera además que los datos sigan siendo actuales **durante todo el vuelo**.

#### La regla que hay que saber decir de memoria

Si se publica una **carta enmendada** cuya enmienda no está en la base de datos, **la base no debe usarse para conducir la operación**.

Es la regla que convierte la comparación carta-base en algo obligatorio y no en una buena costumbre.

#### Y la que aplica a una aerolínea

Para operadores de transporte, la norma no se conforma con que el piloto mire la fecha. Exige que el operador establezca un **programa de base de datos** con cuatro piezas: un responsable identificado del proceso de actualización, un proceso documentado de aceptación y verificación de aplicabilidad, ese proceso bajo control de configuración, y **la confirmación por parte del piloto, en la inicialización del sistema, de que la base de datos es actual**.

Y una quinta que es la que cierra el círculo: las discrepancias que invalidan un procedimiento, por ejemplo errores de base de datos, **deben reportarse al proveedor**, y el uso de los procedimientos afectados debe prohibirse mediante un aviso del operador a sus tripulaciones. El procedimiento solo vuelve a estar disponible cuando el operador lo restablece.

#### El RAC lo dice en una línea

La nota del RAC 121 sobre PBN es breve y contundente: **la gestión de datos electrónicos de navegación es parte integral de los procedimientos normales y anormales**.

### En operación de aerolínea

En la práctica del día, la tripulación hace tres cosas: confirma la vigencia en la inicialización, carga los procedimientos desde la base, y compara con la carta. Lo demás lo sostiene el programa del operador.

Lo que la tripulación **no** hace es arreglar un procedimiento que no cuadra. Lo reporta.

### ¿Qué debe verificar?

- La vigencia de la base en la inicialización del sistema.
- Que el procedimiento se cargó desde la base y no se escribió.
- Que lo cargado coincide con la carta, incluida cualquier enmienda.

### ¿Qué ocurre si no se cumple?

Se vuela una trayectoria que no es la publicada, con la automatización siguiéndola con total precisión. Es el fallo más silencioso de todo el módulo.

### Error frecuente

«La base de datos del FMS siempre es correcta.» La propia norma contempla el caso contrario y monta un proceso entero para gestionarlo: reporte al proveedor, prohibición de uso y restablecimiento. Si la norma lo prevé, el piloto también tiene que preverlo.

### En pocas palabras

- Los datos deben ser actuales y apropiados para la región, y seguir siéndolo durante el vuelo.
- Si hay una carta enmendada cuya enmienda no está en la base, la base no se usa para esa operación.
- Un operador de transporte necesita un programa documentado, y el piloto confirma la vigencia en la inicialización.
- Las discrepancias se reportan al proveedor y el uso del procedimiento afectado se prohíbe hasta que el operador lo restablezca.

### Quiz · Capítulo 33

**p33-q1** · Se publica una carta enmendada y la enmienda no está en la base de datos. ¿Qué corresponde?
- A) Volar el procedimiento de la base, que es lo que el avión puede seguir.
- B) No usar la base de datos para conducir esa operación.
- C) Introducir la enmienda a mano en el FMS.
- D) Volar el procedimiento y reportar la diferencia al aterrizar.
**Correcta:** B · **Tema:** P33 · **Referencia:** FAA AC 90-105A, nota al numeral 10.4
**Explicación:** La norma es explícita: si se publica una carta enmendada cuya enmienda no está en la base de datos, la base no debe usarse para conducir la operación. Introducir la enmienda a mano no es una solución aceptable.

**p33-q2** · ¿Qué debe confirmar el piloto de un operador de transporte en la inicialización del sistema?
- A) Que el procedimiento de destino está cargado.
- B) Que la base de datos de navegación es actual.
- C) Que el valor RNP está fijado.
- D) Que los sensores están todos operativos.
**Correcta:** B · **Tema:** P33 · **Referencia:** FAA AC 90-105A, numeral 10.7, apartado 4
**Explicación:** El programa de base de datos del operador exige que los pilotos confirmen, en la inicialización del sistema, que la base es actual. Las otras verificaciones existen, pero esta es la que la norma sitúa en la inicialización.

**p33-q3** · Encuentras un error en la codificación de un procedimiento. ¿Qué exige la norma?
- A) Corregirlo en el FMS y continuar.
- B) Reportarlo al proveedor de la base de datos y prohibir el uso del procedimiento afectado mediante un aviso a las tripulaciones, hasta que el operador lo restablezca.
- C) Reportarlo al ATC.
- D) Anotarlo en el libro de mantenimiento al final del vuelo.
**Correcta:** B · **Tema:** P33 · **Referencia:** FAA AC 90-105A, numeral 10.7, apartado 5
**Explicación:** Las discrepancias que invalidan un procedimiento deben reportarse al proveedor y el uso de los procedimientos afectados debe prohibirse mediante un aviso del operador a su tripulación, y solo se restablecen cuando el operador lo resuelve. No es un asunto de cabina.

---

## 34. EL CICLO AIRAC

**ID:** P34 · **Tiempo:** 6 min

### Concepto

Aeronautical Information Regulation and Control. Es el sistema de fechas comunes en que la información aeronáutica entra en vigor, y lo que le importa al piloto son tres datos de la base de datos de su avión: **desde cuándo es válida, hasta cuándo, y cuál está activa.**

### Lo que debe saber el piloto

#### El caso que hay que saber resolver

Se espera que los datos de navegación sean actuales **durante todo el vuelo**. Y la norma contempla expresamente el caso incómodo: **si el ciclo AIRAC va a cambiar durante el vuelo**, operadores y pilotos deben establecer procedimientos para asegurar la exactitud de los datos de navegación, incluida la idoneidad de las instalaciones de navegación usadas para definir las rutas y los procedimientos del vuelo.

La norma incluso dice cómo se ha hecho tradicionalmente: verificando los datos electrónicos contra productos en papel o de tableta electrónica, y un medio aceptable es comparar las cartas nueva y antigua para verificar los puntos de navegación antes de salir.

#### Lo que el piloto verifica

En la inicialización, que la base es actual. Y si el vuelo cruza un cambio de ciclo, que existe y se aplica el procedimiento del operador para ese caso.

### En operación de aerolínea

Los vuelos largos y los que salen al final de un ciclo son los que ponen esto a prueba. Un vuelo transoceánico que despega el último día de un ciclo aterriza en el siguiente, y eso no es un problema si el operador tiene resuelto el procedimiento; es un problema si nadie lo miró.

### ¿Qué debe verificar?

- Qué base está activa y entre qué fechas es válida.
- Si el vuelo cruza un cambio de ciclo.
- Qué dice el procedimiento del operador para ese caso.

### ¿Qué ocurre si no se cumple?

Se puede acabar volando un procedimiento que cambió, con datos que ya no corresponden a lo publicado.

### Error frecuente

Ante una base fuera de ciclo, responder «no go» de forma automática. La respuesta correcta es analizar: hay que consultar la MEL, el SOP, la autorización del operador, el tipo de operación y la regulación aplicable. La norma no da una respuesta universal, y precisamente por eso la pregunta aparece en entrevistas: lo que se evalúa es si el candidato razona o recita.

[ESPACIO PARA IMAGEN ANOTADA]

IMAGEN BASE:
Recreación educativa y genérica de una página de estado de base de datos de navegación, sin imitar ninguna interfaz concreta, con tres renglones: «NAV DATA BASE», «ACTIVE» con un identificador de ciclo, «EFFECTIVE FROM» con una fecha y «EFFECTIVE TO» con otra.

ANOTACIONES:
→ FLECHA 1: al renglón ACTIVE.
EXPLICACIÓN: qué base está en uso. Es el dato que se confirma en la inicialización del sistema.
→ FLECHA 2: a la fecha EFFECTIVE FROM.
EXPLICACIÓN: desde cuándo es válida. Una base que todavía no entró en vigor no es la base actual.
→ FLECHA 3: a la fecha EFFECTIVE TO.
EXPLICACIÓN: hasta cuándo. Si el vuelo pasa de esta fecha, hay que aplicar el procedimiento del operador para el cambio de ciclo en vuelo.

OBJETIVO PEDAGÓGICO:
Mostrar exactamente qué tres datos verifica la tripulación en la base de datos y por qué el tercero puede obligar a un procedimiento adicional.

### En pocas palabras

- AIRAC es el sistema de fechas comunes de entrada en vigor de la información aeronáutica.
- El piloto verifica qué base está activa y entre qué fechas es válida.
- Los datos deben seguir siendo actuales durante todo el vuelo; si el ciclo cambia en vuelo, hay que aplicar un procedimiento para asegurar la exactitud.
- Una base fuera de ciclo no se resuelve con un «no go» automático: se consulta MEL, SOP, autorización del operador, tipo de operación y regulación aplicable.

### Quiz · Capítulo 34

**p34-q1** · El ciclo AIRAC va a cambiar durante el vuelo. ¿Qué exige la norma?
- A) Cancelar el vuelo.
- B) Que operadores y pilotos establezcan procedimientos para asegurar la exactitud de los datos, incluida la idoneidad de las instalaciones usadas para definir rutas y procedimientos.
- C) Cargar las dos bases de datos simultáneamente.
- D) Nada: la base activa vale hasta el aterrizaje.
**Correcta:** B · **Tema:** P34 · **Referencia:** FAA AC 90-105A, nota al numeral 10.4
**Explicación:** Se espera que los datos sean actuales durante todo el vuelo, y si el ciclo cambia en vuelo hay que establecer procedimientos para asegurar la exactitud. La norma menciona como medio aceptable comparar las cartas nueva y antigua para verificar los puntos antes de salir.

**p34-q2** · La base de datos no está dentro del ciclo esperado. ¿Cuál es la respuesta profesional?
- A) «No go», siempre.
- B) Volar y verificar cada punto contra la carta.
- C) Consultar MEL, SOP, autorización del operador, tipo de operación y regulación aplicable antes de decidir.
- D) Cargar el procedimiento a mano.
**Correcta:** C · **Tema:** P34 · **Referencia:** FAA AC 90-105A, numerales 10.4, 10.6 y 10.7
**Explicación:** La norma no da una respuesta universal: monta un proceso que depende del tipo de operador y de su programa de datos. Lo que se evalúa en la pregunta es si el piloto analiza o recita, y la respuesta correcta empieza por consultar.

**p34-q3** · ¿Qué tres datos de la base verifica la tripulación?
- A) El proveedor, el número de serie y la fecha de carga.
- B) Cuál está activa, desde cuándo es válida y hasta cuándo.
- C) El número de procedimientos, los aeropuertos incluidos y la versión del software.
- D) El ciclo, el operador y el responsable del proceso de actualización.
**Correcta:** B · **Tema:** P34 · **Referencia:** FAA AC 90-105A, numerales 10.4 y 10.7, apartado 4
**Explicación:** Lo que el piloto confirma es la vigencia: qué base está activa y su periodo de validez, porque de ahí sale si hace falta un procedimiento adicional por cambio de ciclo en vuelo. El resto es responsabilidad del programa del operador.

---

## 35. VALIDAR EL PROCEDIMIENTO EN CABINA

**ID:** P35 · **Tiempo:** 8 min

### Concepto

Cargar no es validar. Este capítulo es la lista de lo que se compara entre la carta y el FMS después de cargar una SID, una STAR o una aproximación.

El AIM lo pide con una frase que vale como principio: hay que **usar las capacidades de la aviónica para verificar los datos de puntos y de derrota después de cargar el procedimiento desde la base de datos**.

### Lo que debe saber el piloto

La lista, en el orden en que conviene recorrerla:

| Qué | Por qué |
|---|---|
| Nombre del procedimiento | Es el error más común y el más fácil de detectar |
| Pista | Un procedimiento con la pista equivocada es otro procedimiento |
| Transición | Una transición distinta cambia la trayectoria entera |
| Secuencia de puntos | El orden es la trayectoria |
| Derrotas | Se comparan con las publicadas: un número distinto delata un tramo mal codificado |
| Restricciones de altitud | Cargadas, no solo leídas |
| Restricciones de velocidad | Ídem, y en tramos RF son parte del diseño |
| Discontinuidades | Hay que verlas y decidir qué se hace con ellas |
| Aproximación final | El FAF, la senda, la DA o MDA |
| Frustrada | Puntos, derrota inicial, altitudes y espera |

#### Lo que este módulo no puede hacer

**No inventar un SOP universal.** Quién carga, quién verifica, quién ejecuta y con qué palabras se hace es del operador. Lo que es común es **qué** se verifica, y esa es la lista de arriba.

### En operación de aerolínea

La validación tiene dos momentos, y confundirlos es el origen de la mayoría de los errores:

- **Antes de ejecutar.** Se compara y se corrige. Aquí no hay prisa que valga.
- **Después de ejecutar.** Se vigila que lo que el avión hace sea lo que se verificó. Aquí ya se está volando.

### ¿Qué debe verificar?

La lista completa, y con la carta a la vista. Verificar de memoria no es verificar.

### ¿Qué ocurre si no se cumple?

Se ejecuta una trayectoria que nadie comparó con nada. Y como el FMS la vuela con precisión, no hay ninguna señal de que algo esté mal.

### Error frecuente

Verificar el nombre del procedimiento y dar por bueno el resto. El nombre correcto con la transición equivocada es una trayectoria equivocada, y el nombre se lee en un segundo mientras la secuencia de puntos exige mirar.

[ESPACIO PARA IMAGEN ANOTADA]

IMAGEN BASE:
Recreación educativa y genérica de una página de plan de vuelo de FMS con una SID cargada, sin imitar ninguna interfaz concreta: un encabezado con el nombre del procedimiento y la pista, y debajo cinco renglones de puntos con su derrota, su distancia y, en dos de ellos, una restricción de altitud y una de velocidad.

ANOTACIONES:
→ FLECHA 1: al encabezado, donde va la pista.
EXPLICACIÓN: la pista cargada tiene que ser la autorizada. Con otra pista, es otro procedimiento.
→ FLECHA 2: al nombre del procedimiento.
EXPLICACIÓN: se compara con la autorización del ATC, no con lo que se esperaba recibir.
→ FLECHA 3: al renglón de la transición.
EXPLICACIÓN: la transición equivocada con el procedimiento correcto produce una trayectoria distinta. Es el error que más se escapa.
→ FLECHA 4: a la columna de puntos y derrotas.
EXPLICACIÓN: se compara la secuencia y las derrotas con la carta. Un número distinto delata un tramo que no es el que se cree.
→ FLECHA 5: a una restricción de altitud.
EXPLICACIÓN: leída en la carta no basta: hay que verla cargada aquí.

OBJETIVO PEDAGÓGICO:
Enseñar el contraste carta-FMS como una lista concreta y ordenada, y señalar la transición como el punto que más se escapa.

### En pocas palabras

- Cargar no es validar: se compara con la carta a la vista.
- Nombre, pista, transición, secuencia, derrotas, altitudes, velocidades, discontinuidades, final y frustrada.
- La validación se hace antes de ejecutar; después solo queda vigilar.
- Quién hace qué lo dice el SOP del operador; qué se verifica es común.

### Quiz · Capítulo 35

**p35-q1** · ¿Qué pide el AIM después de cargar un procedimiento desde la base de datos?
- A) Ejecutarlo de inmediato para que el sistema lo secuencie.
- B) Usar las capacidades de la aviónica para verificar los datos de puntos y de derrota.
- C) Compararlo con el plan operacional de vuelo.
- D) Confirmar el ciclo AIRAC.
**Correcta:** B · **Tema:** P35 · **Referencia:** FAA AIM 1-2-1, apartado general de RNP
**Explicación:** El AIM lo pide expresamente: usar las capacidades de la aviónica para verificar los datos apropiados de puntos y derrota después de cargar el procedimiento desde la base de datos. Cargar y verificar son dos pasos distintos.

**p35-q2** · ¿Cuál es el elemento de la validación que más se escapa?
- A) El nombre del procedimiento.
- B) La transición.
- C) La DA o MDA.
- D) La frecuencia de la torre.
**Correcta:** B · **Tema:** P35 · **Referencia:** FAA AC 90-105A, numeral 8.4.4; FAA AIM 1-2-1
**Explicación:** El nombre correcto con la transición equivocada produce una trayectoria distinta, y el nombre se lee de un vistazo mientras la transición exige mirar el detalle. Por eso aparece como escenario propio en el capítulo 52.

**p35-q3** · ¿Por qué no hay una lista universal de quién carga y quién verifica?
- A) Porque la norma no lo contempla.
- B) Porque depende del SOP del operador, y lo común es qué se verifica, no quién.
- C) Porque depende del fabricante del FMS.
- D) Porque lo decide el comandante en cada vuelo.
**Correcta:** B · **Tema:** P35 · **Referencia:** RAC 121, numeral 121.995, apartado (b)(2)(i); FAA AC 90-105A, capítulo 8
**Explicación:** La norma exige que el explotador establezca y documente procedimientos normales y anormales, así que el reparto de tareas es del operador. Lo que la norma fija es el contenido de la verificación y la competencia exigida a la tripulación.

---

## 36. CARTA, FMS Y AUTORIZACIÓN

**ID:** P36 · **Tiempo:** 7 min

### Concepto

Tres fuentes que tienen que decir lo mismo:

```
        AUTORIZACIÓN DEL ATC
               ▲
               │
    CARTA ◄────┼────► FMS
               │
          CONTRASTE
```

- **La autorización del ATC** dice qué se ha autorizado a volar.
- **La carta** dice cómo es ese procedimiento y qué exige.
- **El FMS** dice qué va a volar el avión.

Si las tres no coinciden, alguna está mal, y hay que resolverlo **antes de ejecutar**.

### Lo que debe saber el piloto

El hábito mental que este capítulo instala es una pregunta: **¿estas tres cosas dicen lo mismo?**

Y los tres pares de comparación tienen cada uno su error típico:

| Par | Error típico |
|---|---|
| Autorización frente a carta | Se vuela el procedimiento que se esperaba, no el que se autorizó |
| Carta frente a FMS | El procedimiento cargado no es el publicado, por transición, pista o codificación |
| Autorización frente a FMS | Se ejecuta antes de comparar, y el avión empieza a volar lo que nadie verificó |

#### El principio de fondo

El FMS no valida nada. Muestra lo que tiene. Que una ruta aparezca dibujada en la pantalla no dice que sea correcta, ni que esté autorizada, ni que el avión pueda volarla. Lo único que dice es que el sistema pudo construirla con los datos que tenía.

### En operación de aerolínea

El contraste se hace en tres momentos naturales: al recibir la autorización, al cargar el procedimiento y antes de ejecutar. Y se repite cada vez que el ATC cambia algo, que es el asunto del capítulo 44.

### ¿Qué debe verificar?

Los tres pares, en los tres momentos. Y en particular: al recibir una autorización, colacionar lo que se oyó, y comparar lo colacionado con lo que se va a programar.

### ¿Qué ocurre si no se cumple?

Se vuela con precisión una trayectoria que no está autorizada, o que no es la publicada. Con el agravante de que todo parece normal.

### Comunicación ATC

Si la autorización y la carta no encajan, se pregunta. Una petición de confirmación es más barata que una desviación.

### Error frecuente

Tomar el FMS como árbitro. Si la carta y el FMS discrepan, el FMS no gana por estar en una pantalla; se resuelve como dice el capítulo siguiente.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Un triángulo equilátero con un vértice arriba. En el vértice superior, un recuadro rotulado «AUTORIZACIÓN DEL ATC». En el inferior izquierdo, «CARTA». En el inferior derecho, «FMS». En el centro del triángulo, un círculo rotulado «CONTRASTE». Sobre cada lado del triángulo, en letra pequeña, el error típico de ese par: entre autorización y carta, «se vuela lo que se esperaba, no lo autorizado»; entre carta y FMS, «lo cargado no es lo publicado»; entre autorización y FMS, «se ejecuta antes de comparar».

OBJETIVO:
Crear el hábito mental de verificar las tres fuentes, con el error típico de cada par a la vista.

### En pocas palabras

- Autorización, carta y FMS tienen que decir lo mismo.
- El contraste se hace al recibir la autorización, al cargar y antes de ejecutar.
- El FMS no valida: muestra lo que tiene.
- Si algo no encaja, se resuelve antes de ejecutar, y si hace falta se pregunta al ATC.

### Quiz · Capítulo 36

**p36-q1** · ¿Qué significa que el FMS muestre una ruta completa y sin discontinuidades?
- A) Que la ruta está autorizada.
- B) Que la ruta es la publicada.
- C) Que el sistema pudo construirla con los datos que tenía.
- D) Que el avión es elegible para volarla.
**Correcta:** C · **Tema:** P36 · **Referencia:** FAA AIM 1-2-1; FAA AC 90-105A, numeral 8.4.4
**Explicación:** El FMS no valida: construye con lo que tiene. Que esté autorizada lo dice el ATC, que sea la publicada lo dice la carta y que el avión pueda volarla lo dice su documentación.

**p36-q2** · ¿En qué tres momentos se hace el contraste entre autorización, carta y FMS?
- A) Al despegar, en crucero y al aterrizar.
- B) Al recibir la autorización, al cargar el procedimiento y antes de ejecutar.
- C) En el briefing, al alcanzar la altitud de transición y en el FAF.
- D) Solo antes de ejecutar.
**Correcta:** B · **Tema:** P36 · **Referencia:** FAA AC 90-105A, numeral 8.4.4; FAA AIM 1-2-1
**Explicación:** Son los tres momentos en que la información llega o cambia, y se repiten cada vez que el ATC modifica algo. Dejarlo todo para el último instante convierte la verificación en una formalidad.

**p36-q3** · La autorización del ATC no coincide con lo que esperabas según el plan. ¿Qué haces?
- A) Vuelas lo que dice el plan, que es lo coordinado.
- B) Vuelas lo autorizado y, si no encaja con la carta o con lo previsto, lo confirmas con el ATC antes de ejecutar.
- C) Programas las dos opciones y decides en el aire.
- D) Pides vectores.
**Correcta:** B · **Tema:** P36 · **Referencia:** FAA AC 90-105A, numeral 8.4.3, apartado 22; práctica estándar de colación
**Explicación:** Lo que se vuela es lo autorizado, y si no encaja con la carta o con lo previsto hay que resolverlo antes de ejecutar. Preguntar es barato; descubrir la discrepancia volando la trayectoria, no.

---

# BLOQUE 7 · LOS SENSORES

---

## 37. LOS SENSORES DE NAVEGACIÓN

**ID:** P37 · **Tiempo:** 7 min

### Concepto

De dónde saca el sistema la posición. No interesa la electrónica: interesan dos preguntas de cabina.

```
¿QUÉ CAPACIDAD TENGO?
¿QUÉ PASA SI PIERDO UNA FUENTE?
```

### Lo que debe saber el piloto

Las fuentes que aparecen en las especificaciones PBN:

| Fuente | Qué aporta |
|---|---|
| GNSS | Posición por satélite, con o sin aumentación |
| DME/DME | Posición por distancias a dos o más instalaciones DME |
| DME/DME/IRU | Lo anterior, con sistemas inerciales que cubren huecos limitados de cobertura DME |
| IRS o IRU | Posición inercial autónoma, sin referencia exterior |
| VOR/DME | Posición por marcación y distancia |

La circular de la FAA describe el caso DME/DME/IRU exactamente así: uso de instalaciones DME para determinar la posición junto con sistemas inerciales, que proporcionan información de posición suficiente durante **huecos limitados** de cobertura DME. La palabra clave es «limitados»: el inercial cubre un tramo sin DME, no un vuelo entero.

#### Cada especificación admite lo suyo

Y aquí está el dato que ordena todo el capítulo: **las fuentes admitidas no son las mismas en todas las especificaciones.** El caso más importante para una aerolínea:

- En **RNAV 5** se admiten GNSS, DME/DME, VOR/DME, inerciales y LORAN C, cada uno declarable por separado.
- En **RNP APCH**, el GPS es el sistema de navegación primario y **los sistemas basados en DME/DME no son aceptables**. El segmento de frustrada sí puede basarse en una radioayuda convencional.

O sea: la misma pérdida de GNSS tiene consecuencias completamente distintas según lo que se esté volando.

### En operación de aerolínea

La pregunta operativa no es «¿qué sensores tiene el avión?», es «¿qué está usando ahora y qué admite lo que estoy volando?». Esa pregunta tiene respuesta en la página de progreso o de posición del FMS, y su interpretación está en el FCOM.

### ¿Qué debe verificar?

- Qué fuentes admite la especificación del segmento en curso.
- Qué fuente está usando el sistema.
- Qué queda si se pierde la que está usando.

### ¿Qué ocurre si no se cumple?

Si la fuente que queda no es admitida por la especificación, la capacidad se perdió, aunque el avión siga navegando perfectamente con ella.

### Error frecuente

«Si pierdo GNSS pierdo automáticamente toda capacidad RNAV.» Depende de la especificación: en RNAV 5 puede quedar capacidad con otra fuente; en RNP APCH, donde el GPS es primario y DME/DME no es aceptable, la conclusión es otra. La respuesta correcta empieza siempre por «depende de la especificación».

### En pocas palabras

- Las fuentes posibles son GNSS, DME/DME, DME/DME/IRU, IRS o IRU, y VOR/DME.
- Lo admitido cambia con la especificación: en RNP APCH el GPS es primario y DME/DME no es aceptable.
- El inercial cubre huecos limitados de cobertura DME, no un vuelo entero.
- Perder GNSS no significa lo mismo en cada especificación.

### Quiz · Capítulo 37

**p37-q1** · En RNP APCH, ¿se aceptan sistemas basados en DME/DME como fuente de posición?
- A) Sí, si hay dos instalaciones DME en cobertura.
- B) No: el GPS es el sistema primario y los sistemas basados en DME/DME no son aceptables.
- C) Sí, para el segmento final únicamente.
- D) Sí, si se combinan con inercial.
**Correcta:** B · **Tema:** P37 · **Referencia:** FAA AC 90-105A, Apéndice A, numeral A.5.1
**Explicación:** La circular es explícita: el GPS es el sistema de navegación primario para RNP APCH y los sistemas basados en DME/DME no son aceptables. Lo que sí puede apoyarse en radioayuda convencional es el segmento de frustrada.

**p37-q2** · ¿Qué papel cumple el inercial en una solución DME/DME/IRU?
- A) Sustituir al DME durante todo el vuelo.
- B) Proporcionar información de posición suficiente durante huecos limitados de cobertura DME.
- C) Corregir el error del GNSS.
- D) Generar la guía vertical.
**Correcta:** B · **Tema:** P37 · **Referencia:** FAA AC 90-105A, Apéndice J, definición de DME/DME/IRU
**Explicación:** La definición habla de huecos limitados de cobertura DME. El inercial cubre un tramo sin instalaciones, no reemplaza la infraestructura, y esa limitación es lo que hay que tener presente al perder DME.

**p37-q3** · «Si pierdo GNSS pierdo automáticamente toda capacidad RNAV.» ¿Por qué es incorrecto?
- A) Porque el GNSS nunca se pierde por completo.
- B) Porque las fuentes admitidas dependen de la especificación, y algunas admiten DME/DME, VOR/DME o inercial.
- C) Porque el inercial sustituye al GNSS indefinidamente.
- D) Porque el ATC puede autorizar la continuación.
**Correcta:** B · **Tema:** P37 · **Referencia:** OACI PANS-ATM, Apéndice 2, códigos `PBN/`; FAA AC 90-105A, Apéndice A, numeral A.5.1
**Explicación:** Los códigos del plan de vuelo muestran que RNAV 5 y RNAV 1 o 2 admiten fuentes distintas del GNSS. En RNP APCH la conclusión es la contraria, porque el GPS es primario. La respuesta profesional empieza por preguntar qué especificación se está volando.

---

## 38. GNSS EN PBN

**ID:** P38 · **Tiempo:** 7 min

### Concepto

Global Navigation Satellite System. La circular de la FAA lo define como sistema global de posición y hora que incluye una o más constelaciones de satélites, receptores de a bordo y control de integridad del sistema, aumentado según sea necesario para apoyar la performance de navegación requerida para la operación prevista.

Bajo ese nombre entran el GPS, los sistemas de aumentación basados en satélites (SBAS, como WAAS), los basados en tierra (GBAS, como LAAS), GLONASS, Galileo y cualquier otro sistema de navegación por satélite aprobado para uso civil. Y la frase que importa: **el GNSS puede aumentarse según sea necesario para apoyar la RNP de la fase de operación real.**

### Lo que debe saber el piloto

Cinco cosas, y ninguna exige física satelital:

#### Es fuente de posición, y para muchas cosas la única admitida

En RNP APCH es el sistema primario. Para las líneas de mínimos LPV y LP hace falta aumentación satelital.

#### La integridad no es la precisión

La precisión dice cuánto se parece la posición a la verdad; la integridad, si se puede confiar en ella y si el sistema avisa cuando no. En GNSS la integridad se consigue con algoritmos a bordo o con aumentación, y es el tema del capítulo 39.

#### La disponibilidad se comprueba antes

Con NOTAM y, cuando aplique, con una predicción. La circular exige confirmar la disponibilidad de la infraestructura necesaria para las rutas, procedimientos o aproximaciones previstas, **incluidas las contingencias no RNP**, para el periodo de la operación previsto y usando toda la información disponible.

#### La geometría de los satélites importa

No hace falta saber calcularla. Hace falta saber que el número y la disposición de los satélites visibles afecta a la disponibilidad de la función, y que por eso una predicción se hace para un lugar y una hora concretos, no «en general».

#### Y hay más cosas colgadas del GNSS de las que parece

Una degradación de GNSS no afecta solo a la navegación lateral. La lista oficial de efectos posibles, que se ve entera en el capítulo 41, incluye el disparo poco fiable del TAWS, salidas de ADS-B erróneas o perdidas, efectos del FMS dependientes de la posición como una indicación errónea de combustible insuficiente, relojes del avión erróneos e indicaciones erróneas de viento y velocidad respecto al suelo.

Por eso la circular pide evaluar los riesgos y limitaciones operacionales asociados a la pérdida de capacidad GPS, **incluidos los sistemas de a bordo que requieren entradas de señal GPS**.

### En operación de aerolínea

Antes de salir: NOTAM, predicción si aplica, y un plan alternativo con radioayudas convencionales en el destino. En vuelo: vigilancia y contraste.

### ¿Qué debe verificar?

- NOTAM de GNSS y de aumentación.
- La disponibilidad para el periodo previsto, incluidas las contingencias no RNP.
- Qué otros sistemas del avión dependen del GNSS.

### Error frecuente

Pensar el GNSS como un interruptor: está o no está. Las degradaciones parciales son lo habitual, y sus efectos se reparten por todo el avión.

### En pocas palabras

- GNSS incluye GPS, SBAS, GBAS, GLONASS, Galileo y otros sistemas aprobados para uso civil.
- Puede aumentarse según haga falta para apoyar la RNP de la operación real.
- La disponibilidad se confirma para el periodo previsto, incluidas las contingencias no RNP.
- Una degradación de GNSS afecta también al TAWS, al ADS-B, al reloj, al viento y a predicciones del FMS.

### Quiz · Capítulo 38

**p38-q1** · ¿Qué entra bajo el nombre GNSS?
- A) Solo el GPS.
- B) GPS, aumentación satelital, aumentación basada en tierra, GLONASS, Galileo y otros sistemas aprobados para uso civil.
- C) GPS y sistemas inerciales.
- D) GPS y DME/DME.
**Correcta:** B · **Tema:** P38 · **Referencia:** FAA AC 90-101A, numeral 3, apartado e
**Explicación:** La circular enumera GPS, SBAS como WAAS, GBAS como LAAS, GLONASS, Galileo y cualquier otro sistema de navegación por satélite aprobado para uso civil, y añade que el GNSS puede aumentarse según sea necesario para apoyar la RNP de la fase de operación.

**p38-q2** · ¿Qué hay que confirmar sobre la infraestructura antes de una operación RNP?
- A) Que el GNSS está operativo en el momento del despegue.
- B) La disponibilidad de la infraestructura necesaria para las rutas, procedimientos o aproximaciones previstas, incluidas las contingencias no RNP, para el periodo de la operación.
- C) Que hay al menos cuatro satélites visibles.
- D) Que el ATC tiene cobertura radar.
**Correcta:** B · **Tema:** P38 · **Referencia:** FAA AC 90-105A, Apéndice A, numeral A.7.1.7
**Explicación:** La circular pide confirmar la disponibilidad para el periodo de las operaciones previstas usando toda la información disponible, y menciona expresamente las contingencias no RNP. El plan B también necesita infraestructura.

**p38-q3** · ¿Por qué una degradación de GNSS puede producir una indicación errónea de combustible insuficiente?
- A) Porque el GNSS mide el consumo.
- B) Porque hay funciones del FMS dependientes de la posición, y una posición errónea produce predicciones erróneas.
- C) Porque el FMS desconecta el cálculo de combustible al perder GNSS.
- D) No puede: son sistemas independientes.
**Correcta:** B · **Tema:** P38 · **Referencia:** FAA AIM 1-2-4, lista de efectos de interferencia y suplantación de GPS
**Explicación:** La FAA lista entre los efectos posibles los efectos del FMS dependientes de la posición, con la indicación errónea de combustible insuficiente como ejemplo. De ahí la exigencia de evaluar qué sistemas de a bordo requieren entradas de GPS.

---

## 39. RAIM Y LA PREDICCIÓN DE DISPONIBILIDAD

**ID:** P39 · **Tiempo:** 7 min

### Concepto

Receiver Autonomous Integrity Monitoring. La circular lo define de forma breve y suficiente: **un algoritmo que verifica la integridad de la salida de posición usando mediciones GPS, o mediciones GPS más ayuda barométrica.**

Y su hermano mayor, FDE (*Fault Detection and Exclusion*): un algoritmo RAIM que puede **detectar y excluir automáticamente un satélite defectuoso** de la solución de posición cuando hay suficientes mediciones satelitales redundantes disponibles.

### Lo que debe saber el piloto

#### Qué función cumple

Comprobar que la posición que el receptor entrega es confiable, y avisar cuando no puede garantizarlo. Es integridad, no precisión.

#### Por qué a veces hay que comprobar la disponibilidad antes

Porque la función RAIM depende de cuántos satélites se vean y cómo estén dispuestos, y eso cambia con el lugar y la hora. De ahí la exigencia condicional de la circular: el piloto debe, **cuando corresponda**, obtener una predicción RAIM para la operación RNP prevista.

La palabra «cuando corresponda» es la que hay que retener, y es exactamente lo que este módulo no puede convertir en regla universal.

#### Cuándo corresponde

Depende de cuatro cosas: la **especificación** de navegación, el **equipo** del avión, el **operador** y la **región**. Un ejemplo concreto del AIM ilustra lo específico que puede llegar a ser: para cierto equipo antiguo, la predicción de RAIM de aproximación de no precisión del propio receptor debe comprobarse en aeropuertos espaciados a intervalos no mayores de 60 NM a lo largo de la derrota del procedimiento RNAV 1, y debe haber RAIM de terminal o de aproximación disponible a la hora estimada sobre cada aeropuerto comprobado.

No hay que memorizar eso. Hay que sacar la conclusión: **la exigencia de predicción está atada al equipo y al tipo de operación, y se consulta, no se supone.**

#### Y no es la única arquitectura

Las aeronaves modernas pueden usar otras arquitecturas y sistemas de aumentación para conseguir integridad. El RAIM es una forma de resolverlo, no la única. Por eso este capítulo se queda en el nivel del piloto y no se convierte en un curso de GPS.

### En operación de aerolínea

En la mayoría de flotas de transporte, la predicción, si hace falta, la resuelve el despacho o el sistema del operador. Lo que la tripulación tiene que saber es si en su operación hace falta y dónde se mira.

### ¿Qué debe verificar?

- Si la operación prevista exige predicción, según la especificación, el equipo, el operador y la región.
- Si la exige, que esté hecha y qué dice.
- Los NOTAM de GNSS y de aumentación.

### Error frecuente

Presentar la predicción RAIM como requisito universal de todas las aeronaves modernas. No lo es, y afirmarlo en una entrevista delata que se memorizó una frase suelta.

### En pocas palabras

- RAIM es un algoritmo que verifica la integridad de la posición con mediciones GPS, o GPS más ayuda barométrica.
- FDE es un RAIM que además excluye automáticamente un satélite defectuoso cuando hay mediciones redundantes suficientes.
- La predicción se obtiene «cuando corresponda»: depende de la especificación, el equipo, el operador y la región.
- Las aeronaves modernas pueden usar otras arquitecturas y aumentación para la integridad.

### Quiz · Capítulo 39

**p39-q1** · ¿Qué es RAIM?
- A) Un sistema de aumentación satelital.
- B) Un algoritmo que verifica la integridad de la salida de posición usando mediciones GPS, o mediciones GPS más ayuda barométrica.
- C) La precisión del receptor GPS.
- D) El control de la performance a bordo exigido por las especificaciones RNP.
**Correcta:** B · **Tema:** P39 · **Referencia:** FAA AC 90-101A, numeral 3, apartado h
**Explicación:** Es la definición literal, y lo importante es que es integridad: comprobar si la posición es confiable, no mejorar su precisión. La aumentación satelital es otra cosa y el control de la performance a bordo es un requisito de especificación, más amplio.

**p39-q2** · ¿Es obligatoria la predicción RAIM en toda operación RNP?
- A) Sí, en todas.
- B) Sí, en todas las que usen GNSS.
- C) No: se obtiene cuando corresponda, y eso depende de la especificación, el equipo, el operador y la región.
- D) No: nunca se exige en aviones de transporte.
**Correcta:** C · **Tema:** P39 · **Referencia:** FAA AC 90-105A, numeral 8.4.4, apartado 2; FAA AIM 5-1-16
**Explicación:** La circular lo formula como exigencia condicional: obtener una predicción RAIM para la operación RNP prevista si corresponde. Presentarla como requisito universal es incorrecto, y negar que exista también.

**p39-q3** · ¿Qué añade FDE sobre RAIM?
- A) Mejora la precisión de la posición.
- B) Puede detectar y excluir automáticamente un satélite defectuoso de la solución de posición cuando hay mediciones redundantes suficientes.
- C) Proporciona guía vertical.
- D) Sustituye la necesidad de aumentación satelital.
**Correcta:** B · **Tema:** P39 · **Referencia:** FAA AC 90-105A, Apéndice J, definición de FDE
**Explicación:** FDE es un algoritmo RAIM que además excluye el satélite defectuoso, siempre que haya suficientes mediciones satelitales redundantes disponibles. No mejora la precisión: protege la integridad de la solución.

---

## 40. INTERRUPCIÓN E INTERFERENCIA DE GNSS

**ID:** P40 · **Tiempo:** 8 min

### Concepto

Dos cosas distintas que conviene no mezclar:

- **Interrupción** (*outage*): el servicio no está disponible. Puede ser planificada y publicada por NOTAM, o no planificada.
- **Interferencia**: hay señales que impiden usar el GNSS, o lo degradan. Puede ser accidental o intencional.

### Lo que debe saber el piloto

#### La interrupción planificada se planifica

Ante una interrupción planificada, por ejemplo una publicada por NOTAM, se puede planificar volar a través de ella usando la red de radioayudas convencionales según corresponda y según lo autorice el ATC.

Eso convierte la interrupción planificada en un problema de planificación, no de emergencia: se sabe dónde, se sabe cuándo y se lleva plan B.

#### Cómo se manifiesta una interferencia

La propia FAA lo describe: los problemas de GNSS se caracterizan a menudo por indicaciones de degradación de la navegación o de pérdida de servicio. En zonas con interferencia GNSS, la aeronave puede quedar sin poder usar el GPS para navegar y el ADS-B puede quedar no disponible para vigilancia. La interferencia por radiofrecuencia puede afectar a la vez a la navegación del piloto y a la vigilancia del controlador. Según el equipo y su integración, al piloto le puede llegar una luz de aviso o un mensaje.

Y desde el lado del controlador: quien vigila reportes ADS-B puede dejar de recibir mensajes de posición y las trazas asociadas.

#### Qué hacer

La recomendación oficial, en orden:

1. Estar atento a cualquier indicación de que el GPS del avión está perturbado, revisando la guía del fabricante para ese tipo y equipamiento.
2. **Verificar la posición del avión por medio de radioayudas convencionales, cuando estén disponibles.**
3. Evaluar los riesgos y limitaciones operacionales de la pérdida de capacidad GPS, incluidos los sistemas de a bordo que requieren entradas de GPS.
4. Asegurar que las radioayudas críticas para la ruta o la aproximación previstas están disponibles.
5. Estar preparado para revertir a procedimientos de vuelo por instrumentos convencionales.
6. Notificar al ATC con prontitud si se experimentan anomalías de GPS.

Y una excepción de sentido común: **no hay que informar al ATC de interferencia o suplantación cuando se vuela por zonas de pruebas conocidas y publicadas por NOTAM, salvo que se necesite asistencia del ATC.** Es para no saturar la frecuencia con lo que ya se sabe.

#### Antes de salir

Cinco recomendaciones: conocer las zonas de riesgo potencial, revisar los NOTAM pertinentes, **planificar contingencias de combustible**, planificar el uso de radioayudas convencionales y de los procedimientos de llegada y aproximación apropiados en el destino, y seguir la guía detallada del fabricante.

La de combustible es la que más se olvida y la que más cuesta: revertir a un procedimiento convencional puede significar más millas, más tiempo y otro alterno.

### En operación de aerolínea

Una degradación de GNSS en ruta no es una emergencia, es una reorganización: qué capacidad queda, qué se puede volar en el destino, cuánto combustible cuesta y qué hay que decirle al ATC.

### ¿Qué debe verificar?

- NOTAM de GNSS y zonas de riesgo conocidas.
- Qué radioayudas críticas hacen falta y si están disponibles.
- Que hay contingencia de combustible.
- Qué sistemas del avión dependen del GNSS.

### Comunicación ATC

Se notifica con prontitud, salvo en zonas de pruebas publicadas donde no se necesite asistencia. Y después del vuelo: documentar el suceso en el libro de mantenimiento para que se cierren las fallas, y presentar el reporte detallado en el sitio de la autoridad.

### Error frecuente

Tratar interrupción e interferencia como lo mismo. La primera se planifica; la segunda se detecta y se contrasta. Y el error grave: no notificar, con lo que el sistema pierde información que sirve a los que vienen detrás.

### En pocas palabras

- Interrupción es que el servicio no esté; interferencia es que haya señales que lo impidan o degraden.
- Una interrupción publicada se planifica: se vuela con radioayudas convencionales según lo autorice el ATC.
- Ante interferencia: verificar la posición con radioayudas, evaluar qué depende del GPS, asegurar las radioayudas críticas, estar listo para revertir y notificar al ATC.
- Antes de salir: zonas de riesgo, NOTAM, contingencia de combustible, plan con radioayudas convencionales y guía del fabricante.

### Quiz · Capítulo 40

**p40-q1** · ¿Cuál es la primera acción recomendada al sospechar una perturbación del GPS en vuelo?
- A) Declarar emergencia.
- B) Desconectar el piloto automático.
- C) Verificar la posición del avión por medio de radioayudas convencionales, cuando estén disponibles.
- D) Solicitar al ATC la posición radar.
**Correcta:** C · **Tema:** P40 · **Referencia:** FAA AIM 1-2-4, recomendaciones durante el vuelo
**Explicación:** La recomendación es estar atento a las indicaciones según la guía del fabricante y verificar la posición con radioayudas convencionales cuando estén disponibles. El contraste es lo primero, porque de él sale todo lo demás, incluida la decisión de qué informar.

**p40-q2** · ¿Cuándo no hay que informar al ATC de interferencia o suplantación de GPS?
- A) Nunca hay que informar.
- B) Cuando se vuela por zonas de pruebas conocidas y publicadas por NOTAM, salvo que se necesite asistencia del ATC.
- C) Cuando la interferencia dura menos de un minuto.
- D) Cuando el ADS-B sigue funcionando.
**Correcta:** B · **Tema:** P40 · **Referencia:** FAA AIM 1-2-4, recomendaciones durante el vuelo
**Explicación:** La excepción es para no saturar la frecuencia con lo que ya está publicado. Fuera de esas zonas, o si se necesita asistencia, la recomendación es notificar con prontitud.

**p40-q3** · ¿Qué recomendación de planificación previa al vuelo se relaciona con el combustible?
- A) Ninguna: el combustible no se ve afectado.
- B) Planificar contingencias de combustible, porque revertir a procedimientos convencionales puede costar millas, tiempo y otro alterno.
- C) Cargar combustible mínimo para reducir peso.
- D) Solicitar al ATC ruta directa.
**Correcta:** B · **Tema:** P40 · **Referencia:** FAA AIM 1-2-4, recomendaciones previas a la salida
**Explicación:** Entre las recomendaciones previas a la salida está planificar contingencias de combustible, junto con conocer las zonas de riesgo, revisar los NOTAM y planificar el uso de radioayudas y procedimientos convencionales en el destino.

---

## 41. SUPLANTACIÓN, CORRIMIENTO DEL MAPA Y LA PREGUNTA QUE SALVA

**ID:** P41 · **Tiempo:** 8 min

### Concepto

La suplantación (*spoofing*) es el caso más incómodo de todo el módulo: una señal falsa puede inducir información de posición incorrecta, y el avión puede no decir nada.

La FAA lo advierte para un caso concreto y la advertencia vale como principio: ciertos sistemas mal instalados o defectuosos han producido disrupciones que se comportan efectivamente como una suplantación de señal, con salida de información de posición errónea y **sin bandera**, hacia las presentaciones primarias de vuelo y hacia otros sistemas del avión y del control de tránsito aéreo. Y añade lo que hay que llevarse: **como el RAIM es solo parcialmente efectivo frente a este tipo de disrupción, el piloto puede no advertir ninguna indicación de navegación errónea, y el ATC puede ser el único medio disponible para identificarlas.**

Este capítulo enseña a desconfiar de datos inconsistentes. No enseña, ni va a enseñar, nada sobre cómo se generan o se interfieren señales GNSS.

### Lo que debe saber el piloto

#### Los indicios, según la lista oficial

| Indicio | Cómo se nota |
|---|---|
| Cambios en la performance de navegación real | El valor estimado se mueve sin motivo |
| Cambios en el reloj del avión | Hora incorrecta, o imposibilidad de conectarse a enlace de datos |
| Posición del FMS incorrecta | La posición no cuadra con lo demás |
| Corrimiento grande de la posición GPS presentada | El salto en el mapa |
| Avisos del PFD o del ND sobre error de posición | La bandera, cuando la hay |
| Otras aeronaves reportando problemas de hora, errores de posición o pidiendo vectores | La frecuencia como sensor |
| Disparo poco fiable del TAWS | Alertas de terreno sin sentido |
| Posición inexacta en la presentación de navegación, incluidos mapa móvil y tableta electrónica | El mapa no encaja |
| Salidas de ADS-B perdidas o erróneas | Lo nota el ATC antes que el piloto |
| Efectos inesperados al navegar con radioayudas convencionales | Si el avión está desplazado de la trayectoria prevista, la sintonización automática no selecciona la radioayuda cercana |
| Efectos del FMS dependientes de la posición | Una indicación errónea de combustible insuficiente, por ejemplo |
| Indicaciones erróneas de viento y de velocidad respecto al suelo | Números que no cuadran con el vuelo |

El indicio de la sintonización automática es especialmente bueno para una entrevista, porque muestra comprensión: si el avión cree estar en otro sitio, las radioayudas que sintoniza solo no son las que debería.

#### El corrimiento del mapa

Un corrimiento del mapa es que los waypoints, la pista o la traza aparezcan desplazados respecto de donde deberían estar. Puede notarse porque la pista no coincide con su representación, porque los datos crudos no cuadran, o porque el ATC reporta otra posición.

**No hay que atribuir automáticamente todo corrimiento del mapa al GNSS.** Puede venir de otras causas, y la actuación correcta no depende de identificar la causa: depende de contrastar y de no confiar en una sola fuente.

#### La pregunta que salva

```
¿TIENE SENTIDO LA POSICIÓN QUE ME ESTÁ MOSTRANDO EL SISTEMA?
```

Y las herramientas para contestarla, con lo que esté disponible: datos crudos, distancia y marcación a una radioayuda, terreno, la pista, la posición que reporta el ATC, otras fuentes de navegación.

La recomendación de la FAA lo dice como práctica y no como opción: volando IFR, conviene tener equipo de navegación adicional para la ruta prevista con el que contrastar la posición, y **comprobaciones rutinarias de la posición contra información de VOR o DME podrían ayudar a detectar una señal GPS comprometida**.

### En operación de aerolínea

El contraste rutinario es lo que convierte esto de un tema de conferencia en un hábito. No es una maniobra: es mirar de vez en cuando si lo que dice el mapa cuadra con lo que dice el resto del avión.

### ¿Qué debe verificar?

- La posición contra al menos otra fuente, de forma rutinaria.
- La coherencia entre mapa, datos crudos, terreno, pista y lo que dice el ATC.
- El reloj y las indicaciones de viento y velocidad respecto al suelo, cuando algo huele raro.

### Comunicación ATC

Notificar con prontitud, salvo en zonas de pruebas publicadas donde no se requiera asistencia. Y después del vuelo, documentarlo en el libro de mantenimiento para que las fallas se cierren, y presentar el reporte detallado.

### Error frecuente

Dos:

- Confiar en la fuente que está comprometida para verificar la fuente comprometida. Si el mapa se construye con la posición GNSS, el mapa no puede validar la posición GNSS.
- Suponer que el avión avisará. En este escenario concreto, la propia autoridad advierte que puede no avisar.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Recreación de una presentación de navegación en modo mapa. La derrota publicada en magenta con tres waypoints. La silueta del avión dibujada sobre la derrota, centrada, con el rótulo «POSICIÓN PRESENTADA». Desplazada claramente a un lado, una segunda silueta en línea de puntos con el rótulo «POSICIÓN SEGÚN DATOS CRUDOS Y REPORTE DEL ATC», unida a la primera con una flecha doble rotulada «discrepancia». Al margen, una lista corta de tres indicios en recuadros pequeños: «reloj del avión», «viento y velocidad respecto al suelo», «la sintonización automática no selecciona la radioayuda cercana». Al pie, en grande, la pregunta: «¿tiene sentido la posición que me está mostrando el sistema?».

OBJETIVO:
Enseñar al piloto a desconfiar de datos inconsistentes y a usar contrastes independientes, mostrando que la presentación puede verse perfectamente normal.

### En pocas palabras

- Una señal falsa puede inducir posición incorrecta, y el RAIM es solo parcialmente efectivo frente a ella: el piloto puede no advertirlo.
- Los indicios incluyen reloj, posición del FMS, corrimiento del mapa, TAWS, ADS-B, viento y velocidad respecto al suelo, y lo que reportan otros aviones.
- No todo corrimiento del mapa es GNSS: lo que corresponde es contrastar, no diagnosticar.
- Comprobaciones rutinarias de posición contra VOR o DME pueden detectar una señal comprometida.

### Quiz · Capítulo 41

**p41-q1** · ¿Por qué el piloto puede no advertir una suplantación de señal?
- A) Porque el sistema desconecta las alertas.
- B) Porque el RAIM es solo parcialmente efectivo frente a ese tipo de disrupción, de modo que puede no haber indicación de navegación errónea.
- C) Porque el corrimiento de posición es siempre pequeño.
- D) Porque el ATC no informa.
**Correcta:** B · **Tema:** P41 · **Referencia:** FAA AIM 1-1-19, apartado sobre disrupciones de GPS
**Explicación:** La FAA advierte que el RAIM es solo parcialmente efectivo frente a una disrupción que actúa como suplantación, que el piloto puede no advertir ninguna indicación errónea y que el ATC puede ser el único medio disponible para identificarla.

**p41-q2** · ¿Cuál de estos es un indicio reconocido de interferencia o suplantación de GPS?
- A) Que el piloto automático se desacople.
- B) Que la sintonización automática no seleccione la radioayuda cercana, porque el avión cree estar en otro sitio.
- C) Que aumente el consumo de combustible.
- D) Que el ATC asigne un nivel distinto.
**Correcta:** B · **Tema:** P41 · **Referencia:** FAA AIM 1-2-4, lista de indicios de interferencia y suplantación
**Explicación:** Es uno de los efectos que la FAA enumera: efectos inesperados al navegar con radioayudas convencionales, con el ejemplo de que si la aeronave es desplazada de la trayectoria prevista, la sintonización automática no seleccionará la radioayuda cercana.

**p41-q3** · Sospechas que la posición presentada no es correcta. ¿Con qué la contrastas?
- A) Con el mapa móvil, que se construye con la misma posición.
- B) Con datos crudos, distancia y marcación a una radioayuda, el terreno, la pista o la posición que reporta el ATC.
- C) Con la predicción RAIM hecha antes del vuelo.
- D) Con el plan operacional de vuelo.
**Correcta:** B · **Tema:** P41 · **Referencia:** FAA AIM 1-2-4, recomendaciones durante el vuelo; FAA AIM 1-1-19
**Explicación:** Hay que contrastar con una fuente independiente. El mapa móvil se construye con la posición sospechosa, así que no la valida. La FAA recomienda comprobaciones rutinarias de posición contra VOR o DME precisamente por eso.

---

# BLOQUE 8 · LA OPERACIÓN DE AEROLÍNEA

---

## 42. LA SID PBN

**ID:** P42 · **Tiempo:** 7 min

### Concepto

Una salida normalizada PBN es una trayectoria definida por puntos, con restricciones, que el avión va a volar a partir de datos codificados. La diferencia con una SID convencional no está en el dibujo: está en que aquí hay una especificación que cumplir y una trayectoria que verificar.

### Lo que debe saber el piloto

Lo que se prepara, en orden:

| Qué | Dónde está |
|---|---|
| Especificación requerida | Notas de la carta o recuadro PBN |
| Ruta y puntos | La carta |
| Restricciones de altitud | La carta, y verificadas en el FMS |
| Restricciones de velocidad | Ídem |
| Tramos RF | Notas de la carta o el punto correspondiente |
| Notas de equipo | Recuadro de requisitos de equipo |
| Autorización del ATC | Lo que se recibió y se coló |

#### La autorización abreviada, que es de la FAA

En el marco de la FAA, una autorización para una SID con restricciones de altitud publicadas puede darse con la fraseología **«climb via»**, que es una autorización abreviada que exige cumplir la trayectoria lateral del procedimiento y las restricciones de velocidad y altitud asociadas a lo largo de la ruta o el procedimiento autorizados.

Y cuando la SID no trae restricciones publicadas, o es una SID con segmento de vectores radar, la autorización se da con «maintain (altitud)».

**Verificar:** esa fraseología es de la FAA. En Colombia hay que leer lo que publique el AIP y lo que use el ATC local, y no dar por hecho el uso estadounidense. Mezclar fraseologías de dos autoridades es uno de los errores que peor sientan en una entrevista.

#### Y una exigencia que ya se vio

Antes de rodar hay que confirmar la posición del avión, y con GNSS la señal debe estar adquirida antes de iniciar la carrera.

### En operación de aerolínea

El error más caro de una SID PBN no es de pilotaje: es de programación. Pista equivocada, transición equivocada, o una restricción leída en la carta y no cargada.

### ¿Qué debe verificar?

La lista del capítulo 35, con la carta a la vista, antes de ejecutar.

### ¿Qué ocurre si no se cumple?

Se vuela una trayectoria que no es la publicada, en la fase con menos altura disponible del vuelo.

### Comunicación ATC

Colacionar, y comparar lo colacionado con lo que se va a programar. Si la autorización y la carta no encajan, preguntar antes de rodar.

### Error frecuente

Cargar la SID por su nombre y no mirar la transición. Y usar fraseología de otra autoridad porque suena profesional.

### En pocas palabras

- Una SID PBN exige una especificación, y está en las notas o en el recuadro PBN.
- Se verifican ruta, puntos, altitudes, velocidades, tramos RF y notas de equipo.
- «Climb via» es una autorización abreviada de la FAA: exige cumplir trayectoria lateral y restricciones.
- Antes de rodar, posición confirmada; con GNSS, señal adquirida antes de la carrera.

### Quiz · Capítulo 42

**p42-q1** · En el marco de la FAA, ¿qué exige una autorización «climb via SID»?
- A) Solo seguir la trayectoria lateral publicada.
- B) Cumplir la trayectoria lateral del procedimiento y las restricciones de velocidad y altitud asociadas a lo largo de la ruta autorizada.
- C) Mantener la altitud asignada e ignorar las restricciones publicadas.
- D) Ascender a la altitud de crucero final sin restricciones.
**Correcta:** B · **Tema:** P42 · **Referencia:** FAA AIM 5-2-9, apartado de autorización «climb via»
**Explicación:** Es una autorización abreviada que exige cumplir la trayectoria lateral y las restricciones de velocidad y altitud. Y es fraseología de la FAA: en otro Estado hay que usar lo que publique su AIP.

**p42-q2** · ¿Qué se verifica en una SID PBN que no se verificaría en una SID convencional?
- A) La frecuencia de la torre.
- B) La especificación de navegación requerida y las funciones que exija, como los tramos RF.
- C) El gradiente de ascenso.
- D) La longitud de pista.
**Correcta:** B · **Tema:** P42 · **Referencia:** FAA AIM 1-2-3; FAA AC 90-100A, numeral 10
**Explicación:** Lo que añade el procedimiento PBN es el requisito de performance y las funciones necesarias, que están en las notas o en el recuadro PBN. El resto de las verificaciones de una salida siguen aplicando igual.

**p42-q3** · ¿Cuál es el error más frecuente en la preparación de una SID PBN?
- A) Calcular mal el gradiente.
- B) Cargar el procedimiento correcto con la transición o la pista equivocadas.
- C) No sintonizar el VOR de salida.
- D) Seleccionar el modo vertical inadecuado.
**Correcta:** B · **Tema:** P42 · **Referencia:** FAA AC 90-105A, numeral 8.4.4; FAA AIM 1-2-1
**Explicación:** El nombre correcto con la transición o la pista equivocadas produce una trayectoria distinta, y es el error que más se escapa porque el nombre se lee de un vistazo. Por eso la validación es una lista y se hace con la carta a la vista.

---

## 43. LA STAR PBN

**ID:** P43 · **Tiempo:** 7 min

### Concepto

Misma lógica que la SID, con dos añadidos propios: la transición de llegada y el perfil vertical, que en una llegada suele ser lo que más carga de trabajo genera.

### Lo que debe saber el piloto

Lo que se verifica: transición, secuencia de puntos, altitudes, velocidades, el enganche con la aproximación prevista y la especificación requerida.

#### La autorización de descenso, que también es de la FAA

En el marco de la FAA, cuando una ruta IFR autorizada incluye una STAR, el piloto debe mantener la última altitud asignada **hasta recibir autorización para descender** cumpliendo todas las restricciones de altitud publicadas o emitidas. Esa autorización puede contener la fraseología **«descend via»**.

**Verificar:** de nuevo, es fraseología de la FAA. Lo que se usa en Colombia se lee en el AIP y se oye en la frecuencia, y no se supone.

#### Lo que pasa cuando el ATC saca el avión de la STAR

Y aquí está el dato operacional más importante del capítulo, del que casi nadie se acuerda a tiempo:

Si se vectorea al avión o se lo autoriza a desviarse de una STAR, **el piloto debe considerar la STAR cancelada**. Si la STAR tenía restricciones de altitud, de velocidad o una nota de carta para la transición de Mach a velocidad indicada, **esas restricciones también quedan canceladas**, y el piloto recibirá una altitud que mantener y, si hace falta, una velocidad.

Si el ATC piensa volver a meter al avión en la STAR, el controlador avisará dónde esperar reanudar el procedimiento, y el piloto debe estar preparado para reincorporarse en el punto o tramo siguiente.

La misma regla existe para la SID: una vez establecido en la SID, si se vectorea al avión o se lo autoriza a desviarse de la SID o de su transición, la SID se considera cancelada, salvo que el controlador añada que se espere reanudarla. Y las restricciones publicadas quedan canceladas.

### En operación de aerolínea

La consecuencia práctica es enorme y se olvida bajo carga de trabajo: después de unos vectores, **las restricciones de la STAR ya no están**, y el avión vuela con la altitud que el ATC asignó. Seguir «cumpliendo» la STAR cancelada es tan problemático como ignorar una restricción vigente.

### ¿Qué debe verificar?

- La transición correcta y su enganche con la aproximación.
- Que las restricciones están cargadas.
- Después de unos vectores: si la STAR sigue viva o no, y si el ATC dijo dónde esperar reanudarla.

### ¿Qué ocurre si no se cumple?

O se incumple una restricción vigente, o se cumple una que ya no existe y se sorprende al ATC con un perfil que no pidió.

### Comunicación ATC

Si no está claro si la STAR sigue vigente, se pregunta. Es una pregunta corta y ahorra un desvío.

### Error frecuente

Suponer que después de unos vectores la STAR sigue vigente con sus restricciones. En el marco descrito, no lo está.

### En pocas palabras

- Se verifican transición, puntos, altitudes, velocidades y el enganche con la aproximación.
- «Descend via» es fraseología de la FAA, y hay que mantener la última altitud asignada hasta recibir autorización para descender.
- Si se vectorea o se autoriza desviarse de la STAR, la STAR se considera cancelada, y con ella sus restricciones.
- El ATC avisa dónde esperar reanudar el procedimiento; hay que estar listo para reincorporarse.

### Quiz · Capítulo 43

**p43-q1** · El ATC te vectorea fuera de una STAR con restricciones de altitud publicadas. ¿Qué ocurre con esas restricciones?
- A) Siguen vigentes: la STAR no se cancela con unos vectores.
- B) Quedan canceladas junto con la STAR, y se recibirá una altitud que mantener y, si hace falta, una velocidad.
- C) Siguen vigentes solo las de velocidad.
- D) Quedan a criterio del piloto.
**Correcta:** B · **Tema:** P43 · **Referencia:** FAA AIM 5-4-1, apartado de rutas con STAR
**Explicación:** Si se vectorea o se autoriza a desviarse de una STAR, el piloto debe considerarla cancelada, y las restricciones de altitud, de velocidad y la nota de transición de Mach a velocidad indicada quedan canceladas también.

**p43-q2** · ¿Cómo se sabe que el ATC pretende volver a meter al avión en la STAR?
- A) Se asume siempre.
- B) Porque el controlador avisa dónde esperar reanudar el procedimiento.
- C) Porque el FMS conserva la secuencia.
- D) Porque la altitud asignada coincide con una restricción publicada.
**Correcta:** B · **Tema:** P43 · **Referencia:** FAA AIM 5-4-1, apartado de rutas con STAR
**Explicación:** Si el ATC piensa autorizar de nuevo el procedimiento, avisará dónde esperar reanudarlo, y el piloto debe prepararse para reincorporarse en el punto o tramo siguiente. Que el FMS conserve la secuencia no significa que la autorización siga vigente.

**p43-q3** · En el marco de la FAA, ¿qué altitud se mantiene cuando la ruta autorizada incluye una STAR?
- A) La primera altitud publicada en la STAR.
- B) La última altitud asignada, hasta recibir autorización para descender cumpliendo las restricciones publicadas o emitidas.
- C) La altitud de crucero del plan de vuelo.
- D) La altitud mínima de sector.
**Correcta:** B · **Tema:** P43 · **Referencia:** FAA AIM 5-4-1, apartado de rutas con STAR
**Explicación:** Hay que mantener la última altitud asignada hasta recibir la autorización para descender, que puede llegar con la fraseología «descend via». Es fraseología de la FAA: en otro Estado se aplica lo que publique su AIP.

---

## 44. VECTORES Y DIRECTOS

**ID:** P44 · **Tiempo:** 7 min

### Concepto

Las dos maneras en que el ATC modifica una trayectoria PBN en vuelo, y las dos exigen gestión de cabina.

### Lo que debe saber el piloto

#### Vectores

Sacan al avión de la trayectoria publicada. Lo que hay que tener presente:

- El procedimiento se considera cancelado, con sus restricciones, salvo que el controlador diga que se espere reanudarlo.
- Cambia el modo de navegación: el avión deja de seguir la trayectoria lateral del FMS.
- Hay que saber **dónde y cómo** se va a reincorporar, y qué secuencia quedará activa al hacerlo.

#### Directos

Un directo a un punto cambia más cosas de las que parece:

| Qué cambia | Por qué importa |
|---|---|
| Geometría | La trayectoria deja de ser la publicada entre esos puntos |
| Secuenciamiento | Los puntos intermedios pueden salir del plan activo |
| Perfil vertical | Las restricciones asociadas a puntos que se saltan desaparecen del cálculo |
| Predicción de combustible | Cambian distancia y tiempo |
| Preparación de la aproximación | El enganche con el procedimiento puede romperse |

Y el punto que hay que verificar siempre: **a qué punto exactamente se está autorizado.** Los nombres de cinco letras se parecen entre sí y se oyen mal en una frecuencia cargada. Se colaciona y se compara con la carta antes de ejecutar.

#### Un detalle de selección que conviene conocer

En el marco de la FAA hay una advertencia práctica sobre la aproximación: seleccionar la opción de «vectores a final» o «vectores» para una aproximación por instrumentos **puede impedir que se carguen en el sistema los puntos situados fuera del FAF**, y por eso se desaconseja su uso, por el aumento de carga de trabajo que supone volver a programar el sistema.

Es un buen ejemplo de una decisión de cabina aparentemente cómoda que se paga después.

#### Y los desplazamientos laterales

Entre los conocimientos requeridos está saber cómo se aplican los desplazamientos laterales (*offsets*), cuál es la funcionalidad del sistema propio y **la necesidad de avisar al ATC si esa funcionalidad no está disponible**. Es decir: si el ATC pide un desplazamiento paralelo y el avión no lo sabe hacer, se dice.

### En operación de aerolínea

Cada cambio del ATC reinicia el triángulo del capítulo 36: autorización nueva, comparar con la carta, programar, verificar, ejecutar. La tentación bajo carga de trabajo es programar y ejecutar sin el paso del medio.

### ¿Qué debe verificar?

- A qué punto se está autorizado, colacionado y comparado.
- Qué restricciones sobreviven y cuáles no.
- Qué secuencia queda activa y si la aproximación sigue enganchada.
- Si la funcionalidad que pide el ATC está disponible.

### Comunicación ATC

Confirmar el punto si hay cualquier duda, y avisar si una funcionalidad solicitada no está disponible.

### Error frecuente

Ejecutar un directo y descubrir después que se saltó un punto con restricción, o que la aproximación quedó desenganchada. El paso que falta es verificar antes de ejecutar.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Diagrama de flujo vertical con siete cajas conectadas por flechas, en el color del módulo: «AUTORIZACIÓN DEL ATC», «ENTENDER», «COLACIONAR», «SELECCIONAR O MODIFICAR EL FMS», «CONTRASTAR», «EJECUTAR», «VIGILAR». A la derecha de la caja «CONTRASTAR», una llamada con tres viñetas: «¿a qué punto exactamente?», «¿qué restricciones sobreviven?», «¿sigue enganchada la aproximación?». Al pie, una nota: «cada cambio del ATC reinicia el flujo».

OBJETIVO:
Mostrar que una autorización que modifica un procedimiento PBN no se programa y se ejecuta: pasa por un flujo con un contraste en el medio.

### En pocas palabras

- Unos vectores cancelan el procedimiento y sus restricciones, salvo que el controlador diga que se espere reanudarlo.
- Un directo cambia geometría, secuenciamiento, perfil vertical, predicción de combustible y preparación de la aproximación.
- Hay que verificar a qué punto exactamente se está autorizado.
- Si la funcionalidad que pide el ATC no está disponible, hay que avisarlo.

### Quiz · Capítulo 44

**p44-q1** · ¿Qué hay que verificar siempre ante una autorización de directo a un punto?
- A) La distancia al punto.
- B) A qué punto exactamente se está autorizado, colacionado y comparado con la carta.
- C) El viento en ruta.
- D) La altitud mínima de sector.
**Correcta:** B · **Tema:** P44 · **Referencia:** FAA AC 90-105A, numeral 8.4.3, apartado 22; práctica estándar de colación
**Explicación:** Los nombres de cinco letras se parecen y se oyen mal en frecuencia cargada. Un directo al punto equivocado cambia la trayectoria, el perfil y la preparación de la aproximación, y todo eso con el FMS funcionando perfectamente.

**p44-q2** · ¿Qué efecto puede tener seleccionar la opción de «vectores a final» en una aproximación?
- A) Ninguno: solo cambia la presentación.
- B) Puede impedir que se carguen los puntos situados fuera del FAF, con el aumento de carga de trabajo de volver a programar.
- C) Cancela la aproximación en el FMS.
- D) Fija automáticamente el valor RNP del segmento final.
**Correcta:** B · **Tema:** P44 · **Referencia:** FAA AIM 5-4-6, nota sobre la selección de vectores a final
**Explicación:** El AIM lo desaconseja precisamente por eso: la selección puede impedir que los puntos fuera del FAF se carguen en el sistema RNAV, y eso obliga a reprogramar con más carga de trabajo.

**p44-q3** · El ATC te pide un desplazamiento lateral paralelo y tu sistema no tiene esa funcionalidad. ¿Qué haces?
- A) Vuelas un rumbo aproximado para conseguir el desplazamiento.
- B) Avisas al ATC de que la funcionalidad no está disponible.
- C) Aceptas y lo resuelves con el piloto automático en modo rumbo.
- D) Solicitas vectores.
**Correcta:** B · **Tema:** P44 · **Referencia:** FAA AC 90-105A, numeral 8.4.3, apartado 20
**Explicación:** La norma pide conocer tres cosas sobre los desplazamientos: cómo se aplican, qué sabe hacer el sistema propio y que hay que decírselo al ATC cuando no está disponible. Un desplazamiento improvisado a rumbo produce una trayectoria que el controlador no está separando.

---

## 45. LA CAPACIDAD EN EL PLAN DE VUELO

**ID:** P45 · **Tiempo:** 7 min

### Concepto

La capacidad PBN se declara en el plan de vuelo OACI en dos sitios, y los dos hacen falta:

- **Casilla 10**, equipo y capacidades: la letra **R**, que significa **PBN aprobado**, con los detalles en la casilla 18.
- **Casilla 18**, otra información: el indicador **`PBN/`** seguido de los descriptores que apliquen, hasta un máximo de **8 entradas**, es decir un total de no más de **16 caracteres**.

### Lo que debe saber el piloto

La tabla completa de descriptores:

#### Especificaciones RNAV

| Código | Significado |
|---|---|
| A1 | RNAV 10 (RNP 10) |
| B1 | RNAV 5 con todos los sensores permitidos |
| B2 | RNAV 5 con GNSS |
| B3 | RNAV 5 con DME/DME |
| B4 | RNAV 5 con VOR/DME |
| B5 | RNAV 5 con INS o IRS |
| B6 | RNAV 5 con LORAN C |
| C1 | RNAV 2 con todos los sensores permitidos |
| C2 | RNAV 2 con GNSS |
| C3 | RNAV 2 con DME/DME |
| C4 | RNAV 2 con DME/DME/IRU |
| D1 | RNAV 1 con todos los sensores permitidos |
| D2 | RNAV 1 con GNSS |
| D3 | RNAV 1 con DME/DME |
| D4 | RNAV 1 con DME/DME/IRU |

#### Especificaciones RNP

| Código | Significado |
|---|---|
| L1 | RNP 4 |
| O1 | RNP 1 básica con todos los sensores permitidos |
| O2 | RNP 1 básica con GNSS |
| O3 | RNP 1 básica con DME/DME |
| O4 | RNP 1 básica con DME/DME/IRU |
| S1 | RNP APCH |
| S2 | RNP APCH con Baro-VNAV |
| T1 | RNP AR APCH con RF (requiere autorización especial) |
| T2 | RNP AR APCH sin RF (requiere autorización especial) |

#### Lo que la tabla enseña, más allá de los códigos

Tres lecturas que valen en una entrevista:

- **El sensor se declara.** No basta decir «RNAV 1»: se declara con qué. Y eso importa cuando se pierde una fuente.
- **`S2` existe porque Baro-VNAV es una capacidad aparte.** RNP APCH con guía vertical barométrica no es lo mismo que RNP APCH.
- **`T1` y `T2` llevan escrita la autorización especial** en su propio texto, y se distinguen por la capacidad de tramo RF. Es la confirmación, en el plan de vuelo, de todo lo dicho en el capítulo 22.

#### Una regla de fondo

El ATC emite autorizaciones **basándose en las capacidades declaradas** en las casillas 10 y 18. Los operadores deben declarar todas las capacidades para las que la aeronave y la tripulación están certificados, capacitados y autorizados. Y la contrapartida, que la FAA dice sin rodeos: **cuando se declara una capacidad, el ATC espera que se use.**

### En operación de aerolínea

El plan lo presenta el despacho, pero el que responde en frecuencia es el piloto. Si el plan declara una capacidad que hoy no se tiene, por MEL o por falla, hay una contradicción que se resuelve antes de salir, no explicándola por radio después.

### ¿Qué debe verificar?

- Que los códigos declarados corresponden a lo que el avión tiene hoy.
- Que la R está en la casilla 10 si hay capacidad PBN declarada.
- Que si hay un ítem de MEL que quita una capacidad, el plan lo refleja.

### ¿Qué ocurre si no se cumple?

El ATC autoriza suponiendo una capacidad que no existe, y el problema aparece cuando ya se está volando la trayectoria.

### Error frecuente

Declarar de más «por si acaso». Si se declara, se espera que se use. Y el error contrario: no declarar una capacidad que se tiene, con lo que se pierden procedimientos y eficiencia.

[ESPACIO PARA IMAGEN ANOTADA]

IMAGEN BASE:
Recreación educativa de un fragmento de plan de vuelo OACI con dos zonas visibles: la casilla 10, con una cadena de letras de equipo entre las que se distingue una R, y la casilla 18, con el texto `PBN/A1D2O2S2` y algún otro indicador.

ANOTACIONES:
→ FLECHA 1: a la letra R de la casilla 10.
EXPLICACIÓN: significa PBN aprobado. Es la declaración general; los detalles van en la casilla 18.
→ FLECHA 2: al indicador `PBN/` de la casilla 18.
EXPLICACIÓN: aquí van los descriptores concretos, hasta 8 entradas y no más de 16 caracteres en total.
→ FLECHA 3: al descriptor `S2` dentro de la cadena.
EXPLICACIÓN: RNP APCH con Baro-VNAV. La guía vertical barométrica es una capacidad declarable aparte, distinta de `S1`.

OBJETIVO PEDAGÓGICO:
Que el piloto identifique dónde se declara la capacidad PBN y entienda que el nivel de detalle llega hasta el sensor y la guía vertical.

### En pocas palabras

- Casilla 10: la letra R, PBN aprobado. Casilla 18: `PBN/` con hasta 8 descriptores y no más de 16 caracteres.
- Los descriptores declaran especificación **y** sensor: por eso hay B2, B3, B4, C3, C4, D2, D3, D4, O2, O3, O4.
- `S1` es RNP APCH y `S2` es RNP APCH con Baro-VNAV. `T1` y `T2` son RNP AR, con y sin RF, y requieren autorización especial.
- El ATC autoriza según lo declarado, y espera que la capacidad declarada se use.

### Quiz · Capítulo 45

**p45-q1** · ¿Qué significa la letra R en la casilla 10 del plan de vuelo OACI?
- A) Radar de meteorología a bordo.
- B) PBN aprobado, con los detalles en la casilla 18.
- C) RNAV aprobado únicamente.
- D) RVSM aprobado.
**Correcta:** B · **Tema:** P45 · **Referencia:** OACI PANS-ATM, Apéndice 2, casilla 10, código R
**Explicación:** La R declara PBN aprobado y remite a la casilla 18 para el detalle. RVSM se declara con la W, que es otra letra, y confundirlas es un error que se oye con frecuencia.

**p45-q2** · ¿Qué diferencia hay entre los códigos `S1` y `S2`?
- A) `S1` es RNP APCH y `S2` es RNP AR APCH.
- B) `S1` es RNP APCH y `S2` es RNP APCH con Baro-VNAV.
- C) `S1` es con GNSS y `S2` con DME/DME.
- D) `S1` es para aproximación y `S2` para frustrada.
**Correcta:** B · **Tema:** P45 · **Referencia:** OACI PANS-ATM, Apéndice 2, códigos `PBN/` S1 y S2
**Explicación:** La guía vertical barométrica es una capacidad declarable aparte. RNP AR se declara con `T1` o `T2`, según se tenga o no capacidad de tramo RF, y esos códigos llevan escrito que requieren autorización especial.

**p45-q3** · ¿Cuántos descriptores admite el indicador `PBN/`?
- A) Los que hagan falta.
- B) Hasta 4 entradas.
- C) Hasta 8 entradas, con un total de no más de 16 caracteres.
- D) Hasta 16 entradas.
**Correcta:** C · **Tema:** P45 · **Referencia:** OACI PANS-ATM, Apéndice 2, casilla 18, indicador `PBN/`
**Explicación:** El límite es de 8 entradas y 16 caracteres en total. Por eso los operadores declaran las capacidades que van a usar y no todas las que podrían encajar: no cabe todo.

---

## 46. LA MEL Y LA CAPACIDAD PBN

**ID:** P46 · **Tiempo:** 8 min

### Concepto

Un avión puede quedar **aeronavegable y despachable** y haber perdido una capacidad PBN. Esa frase resume el capítulo, y la norma la respalda de la forma más directa posible: exige que la información sobre las capacidades de especificación de navegación de la aeronave **esté incluida en la MEL**.

Si la norma obliga a que esa información esté en la MEL, es porque la MEL puede quitarla.

### Lo que debe saber el piloto

#### Lo que se puede perder sin perder el despacho

| Capacidad | Consecuencia si se pierde |
|---|---|
| RNAV | No se vuelan procedimientos que exijan esa especificación RNAV |
| RNP | No se vuelan procedimientos RNP: se pierde el control y alerta |
| RNP AR | No se vuelan procedimientos con autorización requerida |
| Aproximación | Puede caerse una línea de mínimos, o la aproximación entera |
| Funciones | Un tramo RF, el escalado, el desplazamiento paralelo |

#### Sistemas que la MEL puede tocar y que afectan a PBN

GNSS, FMC o FMS, sistemas inerciales, DME, presentaciones de navegación, director de vuelo, piloto automático y sistemas de radionavegación.

Y una advertencia que hay que decir siempre: **no hay una regla automática.** Que falle uno de esos sistemas no elimina por sí mismo la capacidad PBN. Depende de cuatro cosas:

```
la ESPECIFICACIÓN de navegación
la CONFIGURACIÓN de la aeronave
la MEL
la OPERACIÓN prevista
```

#### El caso del piloto automático, que es el que más sorprende

Para RNP APCH se recomienda que el director de vuelo esté acoplado o el piloto automático permanezca acoplado. Y aquí está el giro: **si el error total del sistema lateral no puede demostrarse sin esos sistemas, el acoplamiento pasa a ser obligatorio**, y entonces la guía operacional debe indicar que el acoplamiento del director de vuelo o del piloto automático es obligatorio para esas aproximaciones.

Dicho de otro modo: en ciertas aeronaves, un piloto automático inoperativo no es solo una molestia, es la pérdida de una capacidad de aproximación.

Lo mismo aparece en A-RNP: el uso de las precisiones laterales reducidas normalmente exige el piloto automático, el director de vuelo, o ambos. Y en RNP AR, el valor mínimo autorizado puede variar según se use director de vuelo con o sin piloto automático.

#### Y la redundancia

Cuando la operación exige continuidad, por ejemplo una frustrada RNP AR que pide menos de 1.00 NM, la operación típicamente requiere equipo redundante. Un ítem de MEL que quita la redundancia quita la operación, aunque el sistema que queda funcione perfectamente.

### En operación de aerolínea

La secuencia de despacho es: leer la entrada de MEL completa, ver qué capacidad afecta, comprobar si el vuelo previsto necesita esa capacidad, y si la necesita, resolverlo antes de salir. Lo que incluye revisar si el plan de vuelo declara una capacidad que ya no se tiene.

Y una precisión sobre combinaciones: dos ítems aceptables por separado pueden no serlo juntos. La lista puede prohibir expresamente una combinación, y el efecto conjunto sobre la capacidad PBN puede no coincidir con el de ninguno de los dos aislados. Eso lo resuelve la MEL, no la suma mental de restricciones.

### ¿Qué debe verificar?

- Qué dice la entrada de MEL completa, incluidas las observaciones.
- Qué capacidad de especificación de navegación queda, según la información que la MEL debe incluir.
- Si el vuelo previsto necesita esa capacidad, en salida, ruta y aproximación, incluidos los alternos.
- Si el plan de vuelo hay que corregirlo.

### ¿Qué ocurre si no se cumple?

Se sale con un plan que declara una capacidad inexistente, y se descubre al recibir una autorización que no se puede cumplir.

### Error frecuente

«Si el avión es despachable por MEL mantiene automáticamente todas sus capacidades PBN.» Es exactamente lo contrario de lo que la norma previene al exigir que la MEL lleve esa información.

[ESPACIO PARA IMAGEN ANOTADA]

IMAGEN BASE:
Recreación educativa de una entrada de MEL genérica relacionada con un sistema de navegación, con cinco columnas visibles: sistema y número de ítem, número instalado, número requerido para el despacho, la letra de la categoría de reparación con un paréntesis del tipo «(O)», y una columna de observaciones con dos renglones de texto.

ANOTACIONES:
→ FLECHA 1: a la columna de sistema.
EXPLICACIÓN: qué sistema es y su número de ítem. Es lo que se busca, pero no es lo que decide.
→ FLECHA 2: a la columna de número requerido.
EXPLICACIÓN: cuántos hacen falta para despachar. Despachar no es conservar todas las capacidades.
→ FLECHA 3: al paréntesis «(O)».
EXPLICACIÓN: indica que hay un procedimiento operacional asociado. Hay que buscarlo y leerlo: ahí suele estar la restricción real.
→ FLECHA 4: a la columna de observaciones.
EXPLICACIÓN: aquí aparece qué queda limitado. Es la parte que se salta quien solo mira si el avión es despachable.
→ FLECHA 5: al renglón de observaciones que menciona una restricción de navegación.
EXPLICACIÓN: esta es la línea que puede quitar una capacidad PBN concreta con el avión perfectamente despachable.

OBJETIVO PEDAGÓGICO:
Mostrar que la decisión no está en la columna de despacho sino en las observaciones y el procedimiento operacional asociado, y que ahí es donde se pierde o se conserva una capacidad PBN.

### En pocas palabras

- La norma exige que la MEL incluya la información de capacidades de especificación de navegación: la MEL puede quitarlas.
- Despachable no es «con todas las capacidades»: depende de la especificación, la configuración, la MEL y la operación.
- En ciertas aeronaves el acoplamiento del piloto automático o del director de vuelo es obligatorio para RNP APCH, y sin él se pierde la capacidad.
- Dos ítems aceptables por separado pueden no serlo juntos: lo resuelve la MEL, no la suma de restricciones.

### Quiz · Capítulo 46

**p46-q1** · ¿Por qué exige la norma que la MEL incluya información sobre las capacidades de especificación de navegación?
- A) Para facilitar el trabajo de mantenimiento.
- B) Porque un avión puede quedar despachable y haber perdido una capacidad PBN concreta.
- C) Para declarar la capacidad en el plan de vuelo.
- D) Porque la MEL sustituye al AFM.
**Correcta:** B · **Tema:** P46 · **Referencia:** RAC 91, numeral 91.1015, apartado (a)(3); RAC 121, numeral 121.995, apartado (b)(1)(iii)
**Explicación:** Las dos normas exigen contar con esa información cuando la aeronave se opera de acuerdo con la MEL. Es el reconocimiento normativo de que el despacho y la capacidad PBN son cosas distintas.

**p46-q2** · ¿Cuándo pasa a ser obligatorio el acoplamiento del piloto automático o del director de vuelo en RNP APCH?
- A) Siempre.
- B) Nunca: es una recomendación.
- C) Cuando el error total del sistema lateral no puede demostrarse sin esos sistemas.
- D) Solo en aproximaciones con tramo RF.
**Correcta:** C · **Tema:** P46 · **Referencia:** FAA AC 90-105A, Apéndice A, numeral A.3.9
**Explicación:** Se recomienda el acoplamiento, y si el error total del sistema lateral no puede demostrarse sin esos sistemas, el acoplamiento se vuelve obligatorio y la guía operacional debe indicarlo. En esas aeronaves, un piloto automático inoperativo quita la capacidad.

**p46-q3** · Hay dos ítems de MEL abiertos, cada uno aceptable por separado. ¿Cómo se evalúa el efecto conjunto sobre PBN?
- A) Sumando las restricciones de cada uno.
- B) Tomando la más restrictiva.
- C) Revisando si la lista prohíbe la combinación o cambia el efecto, porque las restricciones no son aditivas.
- D) Consultando al ATC antes del despacho.
**Correcta:** C · **Tema:** P46 · **Referencia:** RAC 121, numeral 121.995, apartado (b)(1)(iii); práctica estándar de listas de equipo mínimo
**Explicación:** Las restricciones no se suman. La lista puede prohibir expresamente una combinación que admite por separado, y el efecto conjunto puede no coincidir con el de ninguno de los dos aislados. La respuesta está en la MEL, no en la aritmética.

---

## 47. AUTOMATIZACIÓN, PF Y PM

**ID:** P47 · **Tiempo:** 7 min

### Concepto

La mayoría de los errores de una operación PBN no son de pilotaje: son de gestión de la automatización y de reparto de tareas.

### Lo que debe saber el piloto

#### La lista de lo que puede salir mal

| Error | Cómo se produce |
|---|---|
| Procedimiento equivocado | Se carga otro con nombre parecido |
| Transición equivocada | El nombre coincide y la transición no |
| Pista equivocada | Cambio de pista de última hora sin recargar |
| Directo a un punto equivocado | Nombres de cinco letras parecidos |
| Secuenciamiento prematuro | El sistema pasa al punto siguiente antes de lo esperado |
| Discontinuidad eliminada mal | Se une lo que no había que unir |
| Restricción de altitud mal cargada | Se leyó en la carta y no se verificó en el FMS |
| Suponer que la base es correcta | No se compara con la carta |

Todos tienen el mismo antídoto: verificar antes de ejecutar, y vigilar después.

#### El reparto de tareas

En términos generales, el piloto a los mandos vuela y gestiona la trayectoria, y el piloto que vigila monitoriza, verifica y apoya las comunicaciones y la programación. Y los dos hacen el contraste.

**No inventar un reparto universal.** Quién programa, quién verifica, quién ejecuta y con qué llamadas es del SOP del operador, y la norma se lo exige a él: el explotador debe establecer y documentar procedimientos normales y anormales y los requisitos de calificación y competencia de la tripulación de acuerdo con las especificaciones de navegación apropiadas.

Lo que sí es común es el principio: **el que programa no es el que verifica.** Si una sola persona hace las dos cosas, no hay verificación, hay repetición.

#### Lo que la norma pide sobre automatización

Entre los conocimientos requeridos están: el uso recomendado por el operador de la automatización según la fase de vuelo y la carga de trabajo, incluidos los métodos para minimizar el error de desviación lateral y mantener el eje de la ruta; los procedimientos de vigilancia para cada fase de vuelo; el ajuste automático o manual del valor RNP requerido; y la conciencia de posibles capturas laterales y verticales falsas durante una transición a la captura de un ILS.

Ese último punto es de los que se preguntan poco y valen mucho: pasar de una trayectoria PBN a un ILS tiene su propio riesgo, y la norma pide conocerlo.

### En operación de aerolínea

La carga de trabajo es el enemigo. Cuando sube, lo primero que desaparece es la verificación, porque es lo único que no produce un efecto visible cuando se hace bien. Por eso el SOP la vuelve obligatoria y con palabras concretas.

### ¿Qué debe verificar?

- Que la verificación la hace alguien distinto de quien programó.
- El valor RNP aplicado y si se fija solo o a mano.
- La transición de una trayectoria PBN a un ILS, con atención a capturas falsas.

### Error frecuente

Programar y ejecutar en un mismo movimiento. Y bajo carga de trabajo, verificar en voz alta lo que se espera ver en vez de lo que está en la pantalla.

### En pocas palabras

- Los errores típicos son de programación y gestión, no de pilotaje.
- El que programa no verifica: si lo hace la misma persona, no hay verificación.
- El reparto concreto de tareas es del SOP del operador, y la norma se lo exige.
- Hay que conocer la vigilancia por fase, el ajuste del valor RNP y el riesgo de capturas falsas al pasar de PBN a un ILS.

### Quiz · Capítulo 47

**p47-q1** · ¿Por qué el que programa el FMS no debería ser el que verifica?
- A) Porque el SOP lo prohíbe en todas las aerolíneas.
- B) Porque si una sola persona hace las dos cosas no hay verificación, hay repetición.
- C) Porque el piloto a los mandos no puede tocar el FMS.
- D) Porque el sistema registra quién programó.
**Correcta:** B · **Tema:** P47 · **Referencia:** RAC 121, numeral 121.995, apartado (b)(2); FAA AC 90-105A, capítulo 8
**Explicación:** La verificación tiene valor porque la hace otro par de ojos. El reparto concreto lo fija el SOP del operador, que la norma le exige documentar, pero el principio es el mismo en todos.

**p47-q2** · ¿Qué riesgo señala la norma al pasar de una trayectoria PBN a la captura de un ILS?
- A) La pérdida de la capacidad RNP.
- B) Posibles capturas laterales y verticales falsas durante la transición.
- C) El secuenciamiento prematuro de la frustrada.
- D) La desconexión del piloto automático.
**Correcta:** B · **Tema:** P47 · **Referencia:** FAA AC 90-105A, numeral 8.4.3, apartado 19
**Explicación:** Entre los conocimientos requeridos está la conciencia de posibles capturas laterales y verticales falsas durante una transición en la captura de un ILS. Es un riesgo específico de ese enganche y por eso aparece en la lista.

**p47-q3** · ¿Qué desaparece primero cuando sube la carga de trabajo?
- A) La comunicación con el ATC.
- B) La verificación, porque es lo único que no produce un efecto visible cuando se hace bien.
- C) El uso del piloto automático.
- D) El briefing de aproximación.
**Correcta:** B · **Tema:** P47 · **Referencia:** FAA AC 90-105A, numeral 8.4.3, apartados 16 y 21
**Explicación:** La norma responde a ese riesgo pidiendo procedimientos de vigilancia por fase de vuelo y un uso de la automatización adecuado a la carga de trabajo. La verificación no da retroalimentación inmediata, y por eso es lo primero que se omite si no es obligatoria.

---

## 48. SELECCIONAR, VERIFICAR, EJECUTAR, VIGILAR

**ID:** P48 · **Tiempo:** 6 min

### Concepto

El principio que Aviatory propone para gestionar el FMS en una operación PBN, en cuatro pasos y en ese orden:

```
SELECCIONAR   →   VERIFICAR   →   EJECUTAR   →   VIGILAR
```

No es una norma: es una regla mental construida sobre lo que las normas exigen en cada paso.

### Lo que debe saber el piloto

#### Seleccionar

Cargar el procedimiento **desde la base de datos**, con el nombre, la pista y la transición de la autorización recibida. Nunca escribir un procedimiento a mano.

#### Verificar

Comparar con la carta: nombre, pista, transición, secuencia, derrotas, altitudes, velocidades, discontinuidades, final y frustrada. Lo hace alguien distinto de quien cargó. Aquí es donde la norma pide usar las capacidades de la aviónica para verificar los datos de puntos y de derrota después de cargar.

#### Ejecutar

Solo después de verificar. Este es el punto sin retorno: a partir de aquí, el avión va a volar lo que está cargado.

#### Vigilar

Durante todo el procedimiento: la desviación lateral, el progreso, el valor RNP aplicable, las restricciones que van llegando y cualquier aviso. La norma pide procedimientos de vigilancia para cada fase de vuelo.

### En operación de aerolínea

El orden es lo que hace el trabajo. Invertir dos pasos cualesquiera rompe la defensa:

- Ejecutar antes de verificar: el avión empieza a volar algo que nadie comparó.
- Verificar después de ejecutar: se descubre el error mientras se corrige la trayectoria.
- No vigilar: se ejecutó bien y nadie se dio cuenta de que algo cambió.

### ¿Qué debe verificar?

Que los cuatro pasos se dieron, en orden, cada vez que la trayectoria cambia. Y cambia más veces de las que uno espera: en el briefing, con la autorización inicial, con cada vector, con cada directo, con cada cambio de pista.

### Error frecuente

Saltarse la verificación cuando el cambio parece pequeño. Un directo a un punto es un cambio pequeño de teclado y grande de trayectoria.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Cuatro bloques grandes en fila horizontal, unidos por flechas gruesas, cada uno en un tono progresivamente más saturado del color del módulo: «SELECCIONAR», «VERIFICAR», «EJECUTAR», «VIGILAR». Debajo de cada bloque, una línea de texto pequeño: «desde la base de datos, nunca a mano», «contra la carta, y lo hace otro», «el punto sin retorno», «desviación lateral, progreso, valor RNP, avisos». Entre «VERIFICAR» y «EJECUTAR», una barra vertical marcada para enfatizar que ahí está el límite.

OBJETIVO:
Crear una regla mental de cuatro pasos para la gestión segura del FMS, con la frontera entre verificar y ejecutar marcada visualmente.

### En pocas palabras

- Seleccionar desde la base de datos, nunca a mano.
- Verificar contra la carta, y que lo haga alguien distinto de quien cargó.
- Ejecutar solo después de verificar: es el punto sin retorno.
- Vigilar durante todo el procedimiento, y repetir los cuatro pasos cada vez que la trayectoria cambia.

### Quiz · Capítulo 48

**p48-q1** · ¿Cuál es el orden correcto para gestionar un cambio de trayectoria en el FMS?
- A) Ejecutar, verificar, vigilar, seleccionar.
- B) Seleccionar, ejecutar, verificar, vigilar.
- C) Seleccionar, verificar, ejecutar, vigilar.
- D) Verificar, seleccionar, ejecutar, vigilar.
**Correcta:** C · **Tema:** P48 · **Referencia:** FAA AIM 1-2-1; FAA AC 90-105A, numeral 8.4.3, apartado 16
**Explicación:** La verificación va antes de ejecutar, porque ejecutar es el punto sin retorno. La norma pide verificar los datos de puntos y derrota después de cargar y antes de usar el procedimiento, y establecer vigilancia para cada fase.

**p48-q2** · ¿Cuándo hay que repetir los cuatro pasos?
- A) Una vez por vuelo, en el briefing.
- B) Cada vez que la trayectoria cambia: autorización inicial, vectores, directos, cambio de pista.
- C) Solo al cargar la aproximación.
- D) Solo si el ATC lo pide.
**Correcta:** B · **Tema:** P48 · **Referencia:** FAA AC 90-105A, numeral 8.4.4; FAA AIM 5-4-1
**Explicación:** Cada cambio de autorización reinicia el ciclo, y son más de los que se espera. Un cambio de pista de última hora es el caso que más veces produce un procedimiento cargado que no corresponde.

**p48-q3** · ¿Por qué se marca la frontera entre verificar y ejecutar?
- A) Porque ejecutar requiere autorización del ATC.
- B) Porque a partir de ejecutar el avión va a volar lo que está cargado, verificado o no.
- C) Porque después de ejecutar no se puede modificar el plan.
- D) Porque el sistema bloquea la edición.
**Correcta:** B · **Tema:** P48 · **Referencia:** FAA AC 90-105A, numeral 8.4.4; FAA AIM 1-2-1
**Explicación:** Ejecutar es el punto sin retorno operacional: el avión empieza a seguir lo cargado. Se puede seguir modificando después, pero ya con el avión volando la trayectoria, que es exactamente lo que se quería evitar.

---

# BLOQUE 9 · PERDER LA CAPACIDAD, COLOMBIA Y LA CARTA

---

## 49. PERDER LA CAPACIDAD PBN

**ID:** P49 · **Tiempo:** 8 min

### Concepto

Uno de los dos capítulos más importantes del módulo. Lo que hay que construir aquí no es una lista de memoria: es un **flujo mental** que sirva en cualquier fase y con cualquier especificación.

```
LA CAPACIDAD PBN SE DEGRADA
            ↓
CONTROLAR EL AVIÓN
            ↓
IDENTIFICAR EL MENSAJE O LA FALLA
            ↓
CONTRASTAR LA POSICIÓN
            ↓
APLICAR QRH Y SOP
            ↓
DETERMINAR QUÉ CAPACIDAD DE NAVEGACIÓN QUEDA
            ↓
¿SE PUEDE SEGUIR CUMPLIENDO LA ESPECIFICACIÓN EXIGIDA?
            ↓
      SÍ  ──────────→  continuar y seguir vigilando
            ↓
      NO
            ↓
INFORMAR AL ATC
SOLICITAR AUTORIZACIÓN ALTERNATIVA
USAR LA CAPACIDAD DE NAVEGACIÓN DISPONIBLE
```

### Lo que debe saber el piloto

#### Qué cuenta como pérdida de capacidad

La definición que da la circular de la FAA es amplia y hay que usarla así: **cualquier falla o suceso que haga que la aeronave deje de satisfacer los requisitos de la especificación para el procedimiento.** Y da ejemplos que sorprenden: entre las fallas que cuentan está la pérdida del piloto automático o del director de vuelo **si eran requeridos**, y la reversión a una fuente de navegación distinta de las admitidas, aunque no se exija al piloto vigilar la fuente de actualización.

O sea: no hace falta perder el GNSS para perder la capacidad.

#### La obligación de informar

El piloto **debe** notificar al ATC cualquier pérdida de la capacidad, **junto con el curso de acción propuesto**. Las dos partes cuentan: el aviso y la propuesta. Y si no se puede cumplir con los requisitos del procedimiento, hay que avisar al servicio de tránsito aéreo **lo antes posible**.

Para RNP 2 y RNP 4 la exigencia se extiende: hay que avisar de cualquier **deterioro o falla** del equipo de navegación, y de las desviaciones que exija un procedimiento de contingencia.

#### Y el operador tiene que tener procedimientos

La norma no deja la contingencia al criterio del momento. El RAC 91 y el RAC 121 exigen que el explotador establezca y documente **procedimientos normales y anormales, incluidos los procedimientos de contingencia**, y la circular de la FAA pide que el operador desarrolle procedimientos de contingencia para reaccionar con seguridad tras la pérdida de la capacidad durante la aproximación.

Lo que la tripulación hace es aplicar esos procedimientos, no inventarlos.

### En operación de aerolínea

El paso que decide es el penúltimo: **¿se puede seguir cumpliendo lo que el procedimiento exige?** Y solo se puede contestar si se sabe qué exige, lo que remite al briefing.

Si la respuesta es sí, se continúa vigilando. Si es no, se informa y se coordina. Lo que no se hace es continuar sin contestar la pregunta.

### ¿Qué debe verificar?

- Qué especificación y qué valor exige el segmento en curso.
- Qué queda operativo y si es admitido por la especificación.
- Qué dice el QRH y el SOP.
- Si hay que cambiar de línea de mínimos, de procedimiento, de destino o de nivel.
- El combustible, si la alternativa cuesta millas.

### Comunicación ATC

Aviso más propuesta, lo antes posible. La fraseología, en el capítulo siguiente.

### Error frecuente

Dos, opuestos:

- Declarar una incapacidad que no existe, porque se asumió que perder GNSS es perder todo.
- Seguir volando el procedimiento sin haber contestado si todavía se cumple lo que exige.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Diagrama de flujo vertical, grande, ocupando el ancho de la pantalla, con las cajas del flujo del concepto en el color del módulo y una bifurcación clara en la caja de decisión «¿SE PUEDE SEGUIR CUMPLIENDO LA ESPECIFICACIÓN EXIGIDA?». La rama «SÍ» sale a la derecha hacia una caja verde sobria rotulada «continuar y seguir vigilando». La rama «NO» sigue hacia abajo hacia tres cajas apiladas: «informar al ATC», «solicitar autorización alternativa», «usar la capacidad de navegación disponible». A la izquierda, una columna estrecha con tres notas ancladas a las cajas correspondientes: junto a «identificar el mensaje o la falla», la nota «el mensaje concreto está en el FCOM y el QRH»; junto a «determinar qué capacidad queda», la nota «depende de la especificación: las fuentes admitidas no son las mismas»; junto a la caja de decisión, la nota «esto se contestó en el briefing».

OBJETIVO:
Dar al piloto una estructura mental aplicable ante cualquier pérdida de capacidad PBN, con la pregunta decisiva destacada y las tres notas que evitan los errores más comunes.

### En pocas palabras

- Pérdida de capacidad es cualquier falla o suceso que impida satisfacer los requisitos de la especificación para el procedimiento.
- Cuenta también perder el piloto automático o el director de vuelo si eran requeridos, y revertir a una fuente no admitida.
- Se informa al ATC la pérdida **junto con el curso de acción propuesto**, lo antes posible.
- La pregunta que decide es si todavía se cumple lo exigido, y se contesta con lo que se preparó en el briefing.

### Quiz · Capítulo 49

**p49-q1** · ¿Cuenta como pérdida de capacidad RNP la falla del piloto automático?
- A) Nunca: el piloto automático no forma parte de la capacidad de navegación.
- B) Sí, si era requerido para la operación.
- C) Solo en procedimientos RNP AR.
- D) Solo si además se pierde el director de vuelo.
**Correcta:** B · **Tema:** P49 · **Referencia:** FAA AC 90-100A, numeral 10, apartado d; FAA AC 90-105A, Apéndice A, numeral A.3.9
**Explicación:** La definición de pérdida de capacidad es amplia y la circular cita expresamente la pérdida del piloto automático o del director de vuelo si eran requeridos. En ciertas aeronaves el acoplamiento es obligatorio para RNP APCH, y sin él la capacidad se pierde.

**p49-q2** · ¿Qué debe contener el aviso al ATC por pérdida de capacidad?
- A) Solo la falla.
- B) La pérdida de la capacidad junto con el curso de acción propuesto.
- C) Una declaración de emergencia.
- D) La posición y el combustible remanente.
**Correcta:** B · **Tema:** P49 · **Referencia:** FAA AC 90-105A, Apéndice A, numeral A.7.1.8 y Apéndice H, numeral H.8.5
**Explicación:** La circular exige las dos cosas: notificar la pérdida y el curso de acción propuesto. El controlador necesita saber qué se va a hacer para poder acomodarlo, no solo qué se rompió.

**p49-q3** · ¿Cuál es el paso que decide en el flujo de pérdida de capacidad?
- A) Identificar el mensaje.
- B) Aplicar el QRH.
- C) Determinar si todavía se puede cumplir la especificación que exige el segmento.
- D) Informar al ATC.
**Correcta:** C · **Tema:** P49 · **Referencia:** FAA AC 90-105A, Apéndice A, numeral A.7.1.8
**Explicación:** Todo lo anterior es preparación para esa pregunta y todo lo posterior es consecuencia. Y solo se puede contestar si se sabe qué exige el segmento, que es lo que se fija en el briefing.

---

## 50. «UNABLE RNAV», «UNABLE RNP» Y LAS CONTINGENCIAS

**ID:** P50 · **Tiempo:** 8 min

### Concepto

Cómo se dice. Y aquí este módulo va a ser explícito sobre lo que puede verificar y lo que no.

### Lo que debe saber el piloto

#### La formulación que este módulo puede respaldar con fuente

La circular de la FAA para operaciones RNAV en terminal y en ruta da un ejemplo literal de comunicación ante pérdida de capacidad:

> «…N1234, failure of GPS/GNSS system, unable RNAV, request amended clearance.»

Tres piezas, y en ese orden:

| Pieza | Qué aporta |
|---|---|
| Identificación y falla | Quién es y qué se rompió |
| *Unable RNAV* | Qué no se puede cumplir |
| *Request amended clearance* | Qué se pide |

La misma estructura sirve cambiando la especificación: lo que no se puede cumplir se nombra, y se pide una autorización que sí se pueda cumplir.

#### Lo que este módulo no va a inventar

**Verificar:** la fraseología normalizada de OACI para estas situaciones está en los Procedimientos para los servicios de navegación aérea de Gestión del tránsito aéreo (Doc 4444). Ese documento no es de acceso público y no se pudo cargar para escribir este módulo, así que **aquí no se publica ninguna formulación OACI literal**. La fraseología aplicable en Colombia hay que leerla en el AIP Colombia y en los documentos de la Aerocivil que la reproduzcan, y es lo que se usa en frecuencia.

Lo que sí se puede afirmar con la fuente cargada es la **obligación**: notificar al ATC la pérdida de la capacidad junto con el curso de acción propuesto, y avisar al servicio de tránsito aéreo lo antes posible si no se pueden cumplir los requisitos del procedimiento.

Esa distinción entre «lo que hay que comunicar» y «con qué palabras exactas» es la que hay que sostener en una entrevista: el contenido se sabe, y las palabras exactas se leen en el documento del Estado donde se opera.

#### Cuándo se usa

En cuanto se concluye que no se puede cumplir la especificación exigida, y lo antes posible. No al aterrizar, no en la frecuencia siguiente.

### En operación de aerolínea

Lo que el controlador hace con el aviso depende de la situación de tránsito: puede dar vectores, cambiar el nivel, autorizar otro procedimiento o autorizar otra aproximación. Cuanto antes llegue el aviso y más clara sea la propuesta, más opciones hay.

### ¿Qué debe verificar?

- Qué especificación no se puede cumplir, con nombre.
- Qué se va a proponer.
- Qué fraseología aplica en el espacio aéreo en que se está volando.

### Error frecuente

Decir «tengo un problema con el GPS» y esperar que el controlador deduzca las consecuencias. El controlador no sabe qué especificación necesita ese procedimiento con ese avión: eso lo sabe la tripulación.

### En pocas palabras

- La estructura es: identificación y falla, qué no se puede cumplir, qué se pide.
- La circular de la FAA da el ejemplo literal con *unable RNAV* y *request amended clearance*.
- La fraseología OACI literal no se publica aquí porque su documento no se pudo cargar: se lee en el AIP del Estado.
- La obligación sí está verificada: notificar la pérdida con el curso de acción propuesto, lo antes posible.

### Quiz · Capítulo 50

**p50-q1** · ¿Cuáles son las tres piezas de una comunicación de pérdida de capacidad?
- A) Posición, combustible y personas a bordo.
- B) Identificación y falla, qué no se puede cumplir, y qué se solicita.
- C) Declaración de emergencia, intenciones y nivel deseado.
- D) Especificación declarada, especificación perdida y hora estimada.
**Correcta:** B · **Tema:** P50 · **Referencia:** FAA AC 90-100A, numeral 10, apartado d
**Explicación:** El ejemplo de la circular las contiene: matrícula y falla del sistema, *unable RNAV*, y solicitud de autorización enmendada. Nombrar lo que no se puede cumplir es lo que permite al controlador decidir.

**p50-q2** · ¿Cuándo se comunica la pérdida de capacidad?
- A) Al aterrizar, en el reporte de vuelo.
- B) En el contacto inicial de la frecuencia siguiente.
- C) Lo antes posible, junto con el curso de acción propuesto.
- D) Solo si el ATC pregunta.
**Correcta:** C · **Tema:** P50 · **Referencia:** FAA AC 90-105A, Apéndice A, numeral A.7.1.8
**Explicación:** La circular pide notificar la pérdida junto con el curso de acción propuesto y, si no se pueden cumplir los requisitos del procedimiento, avisar al servicio de tránsito aéreo lo antes posible. El aviso tardío reduce las opciones del controlador.

**p50-q3** · Dices al ATC «tengo un problema con el GPS» y nada más. ¿Qué falta?
- A) Nada: el controlador deducirá las consecuencias.
- B) Nombrar qué especificación no se puede cumplir y qué se solicita, porque el controlador no sabe qué exige ese procedimiento con ese avión.
- C) Declarar emergencia.
- D) Dar la posición exacta.
**Correcta:** B · **Tema:** P50 · **Referencia:** FAA AC 90-100A, numeral 10, apartado d; FAA AC 90-105A, Apéndice A, numeral A.7.1.8
**Explicación:** El controlador separa y autoriza; la capacidad la conoce la tripulación. Un aviso sin la consecuencia operacional obliga al controlador a preguntar y retrasa la solución.

---

## 51. PBN EN COLOMBIA

**ID:** P51 · **Tiempo:** 7 min

### Concepto

Qué dice la norma colombiana sobre PBN, y qué hay que leer en cada caso.

### Lo que debe saber el piloto

#### Las definiciones son las de OACI, en español

El RAC 91 reproduce las definiciones del concepto: especificación para la navegación como conjunto de requisitos relativos a la aeronave **y a la tripulación de vuelo**, con sus dos clases, RNP (con control y alerta de la performance) y RNAV (sin ese requisito). Y la nota que explica el cambio histórico del término RNP.

Para un piloto colombiano, esas definiciones no son «lo que dice OACI»: son su norma.

#### El artículo del equipo: RAC 91, numeral 91.1015

En operaciones con especificación PBN prescrita, la aeronave debe:

- Estar provista del equipo de navegación que le permita funcionar conforme a las especificaciones prescritas.
- Contar con la información de sus capacidades de especificación de navegación **enumeradas en el manual de vuelo o en otra documentación aprobada** por el Estado de diseño o por la UAEAC.
- Cuando se opere de acuerdo con la MEL, contar con la información de esas capacidades **incluida en la MEL**.

Y la UAEAC establece los criterios para las operaciones en que se prescribe una especificación PBN.

Además, como parte de sus especificaciones de navegación PBN, el explotador debe demostrar a la UAEAC que estableció:

- Procedimientos normales y anormales, **incluidos los de contingencia**.
- Requisitos de calificación y competencia de la tripulación de vuelo, de acuerdo con las especificaciones apropiadas.
- Instrucción para el personal pertinente, congruente con las operaciones previstas.
- Procedimientos de mantenimiento apropiados.

Y el Estado de matrícula expide una **aprobación específica** para operaciones con especificaciones de navegación con autorización requerida (AR).

#### El artículo del explotador: RAC 121, numeral 121.995

Dice lo mismo para el avión, y añade tres cosas que valen oro en una entrevista:

- La UAEAC se asegura de que el explotador **estableció y documentó** procedimientos, calificaciones, instrucción y mantenimiento.
- **El explotador deberá estar autorizado por la UAEAC** para realizar las operaciones en cuestión.
- La UAEAC emite una aprobación específica para las operaciones con especificación PBN **con autorización obligatoria (AR)**.

Y una nota breve que resume media asignatura: **la gestión de datos electrónicos de navegación es parte integral de los procedimientos normales y anormales.**

#### Dónde está PBN como aprobación específica

En las especificaciones de operación. El RAC 91 lista PBN entre las operaciones que requieren requisitos especiales de mantenimiento, junto a CAT II y III y RVSM, y el RAC 121 la lista entre los tipos de operación aprobados y entre las que exigen capacitación especial de navegación. En la estructura de las especificaciones de operación, las especificaciones de navegación con autorización requerida (AR) para PBN se anotan **una línea por aprobación**, con sus limitaciones.

### En operación de aerolínea

Lo que el piloto colombiano tiene que saber ubicar:

| Pregunta | Dónde se contesta |
|---|---|
| ¿Qué exige la norma para operar PBN? | RAC 91 numeral 91.1015 y RAC 121 numeral 121.995 |
| ¿Está mi operador autorizado y para qué? | Especificaciones de operación |
| ¿Qué procedimientos PBN hay publicados y qué exigen? | AIP Colombia y la carta del aeropuerto |
| ¿Qué capacidad tengo hoy? | AFM, MEL y NOTAM |

**Verificar:** la circular GCEP-1.0-22-032 de la Aerocivil, «Procedimiento para la aprobación de operaciones RNAV/RNP bajo el concepto PBN», es el documento de guía del proceso de aprobación. Al 25 de septiembre de 2026 no está disponible en el servidor de documentos de la entidad: las rutas conocidas devuelven error 404. Quien necesite el detalle del proceso de aprobación tiene que pedirla a la Aerocivil o buscarla en la biblioteca técnica cuando vuelva a estar publicada. Este módulo no reproduce su contenido porque no se pudo leer.

**Verificar también:** qué procedimientos PBN concretos hay publicados en cada aeropuerto colombiano, cómo se titulan y qué exigen en sus notas se lee en el AIP Colombia vigente. No se debe suponer la convención de títulos de la FAA ni la internacional sin mirar la carta.

### ¿Qué debe verificar?

- Las especificaciones de operación del explotador: qué está autorizado.
- La carta del procedimiento en el AIP Colombia: qué exige.
- El AFM y la MEL: qué se tiene hoy.

### Error frecuente

Citar la circular de la FAA como si fuera la norma aplicable en Colombia. La norma aplicable es el RAC. La circular de la FAA es una fuente de criterio operacional excelente, y así se usa en este módulo, pero no es la norma del Estado donde se vuela.

### En pocas palabras

- El RAC 91 numeral 91.1015 y el RAC 121 numeral 121.995 son los artículos de PBN en Colombia.
- El explotador debe estar autorizado por la UAEAC, y las especificaciones AR llevan aprobación específica.
- La MEL debe incluir la información de capacidades de especificación de navegación.
- La gestión de datos electrónicos de navegación es parte integral de los procedimientos normales y anormales.
- Lo publicado en cada aeropuerto se lee en el AIP Colombia, no se supone.

### Quiz · Capítulo 51

**p51-q1** · ¿Cuál es el numeral del RAC 91 que trata el equipo de navegación para operaciones PBN?
- A) 91.305
- B) 91.1010
- C) 91.1015
- D) 91.1020
**Correcta:** C · **Tema:** P51 · **Referencia:** RAC 91, numeral 91.1015
**Explicación:** El numeral 91.1015 es «Equipo de navegación para operaciones PBN». El 91.1020 trata el equipo para operaciones MNPS, y el 91.1010 los requisitos generales a los que el 91.1015 añade los suyos.

**p51-q2** · Según el RAC 121, además de tener el avión equipado, ¿qué debe ocurrir?
- A) Que el ATC confirme la capacidad en frecuencia.
- B) Que el explotador esté autorizado por la UAEAC para realizar esas operaciones.
- C) Que el procedimiento esté en la base de datos.
- D) Que la tripulación tenga habilitación de tipo vigente, y nada más.
**Correcta:** B · **Tema:** P51 · **Referencia:** RAC 121, numeral 121.995, apartado (b)(3)
**Explicación:** El texto es directo: el explotador deberá estar autorizado por la UAEAC para realizar las operaciones en cuestión. Y para las especificaciones con autorización obligatoria (AR), la autoridad emite además una aprobación específica.

**p51-q3** · ¿Qué dice la nota del RAC 121 sobre los datos de navegación?
- A) Que son responsabilidad exclusiva del proveedor.
- B) Que la gestión de datos electrónicos de navegación es parte integral de los procedimientos normales y anormales.
- C) Que deben verificarse solo antes del primer vuelo del día.
- D) Que la autoridad los audita anualmente.
**Correcta:** B · **Tema:** P51 · **Referencia:** RAC 121, numeral 121.995, apartado (b)(2), nota 2
**Explicación:** Es la nota literal, y es una frase con consecuencias: convierte la gestión de los datos en parte de los procedimientos que el explotador debe establecer y documentar, no en un trámite administrativo aparte.

---

## 52. CÓMO SE LEE UNA CARTA PBN Y UN VUELO COMPLETO

**ID:** P52 · **Tiempo:** 9 min

### Concepto

El capítulo de cierre tiene dos partes. Primero, dónde mirar en una carta PBN. Después, el vuelo entero, fase por fase, con doce escenarios de decisión.

### Lo que debe saber el piloto

#### El orden en que se mira una carta PBN

1. **Título del procedimiento.** Dice qué clase de procedimiento es, según la convención de la autoridad que publica.
2. **Notas y recuadro PBN.** Qué especificación exige, qué sensores o funciones, qué valor RNP mínimo, qué observaciones. Es lo obligatorio.
3. **Requisitos de equipo.** El recuadro aparte, con el equipo en tierra o específico del aeropuerto.
4. **Pista y transiciones.** Qué se está cargando exactamente.
5. **Puntos y su simbología.** Fly-by o fly-over, y si hay tramo RF.
6. **Derrotas y distancias.** Para comparar con el FMS.
7. **Restricciones de altitud y de velocidad.** Incluidas las de un tramo RF.
8. **Perfil vertical.** El FAF, la senda, el mínimo.
9. **Líneas de mínimos.** Cuáles hay y cuál se puede usar.
10. **Limitaciones.** Temperatura, fuentes de ajuste altimétrico, lo que diga la nota.
11. **Frustrada.** Requisito de navegación, puntos, derrota inicial, altitudes y espera.

#### El vuelo completo

| Fase | Qué se verifica | Qué puede fallar | Qué se comunica |
|---|---|---|---|
| Preparación | Capacidad PBN del avión, especificaciones de operación | Una capacidad que se creía tener | Nada todavía |
| MEL | Qué capacidad queda con el equipo despachado | Que la MEL quite una capacidad y el plan la declare | Corrección del plan, antes de salir |
| Base de datos | Vigencia, y el cambio de ciclo si aplica | Base fuera de ciclo, carta enmendada no incluida | Nada; se resuelve en tierra |
| Plan de vuelo | Casilla 10 con la R y casilla 18 con `PBN/` | Declarar de más o de menos | Con el despacho |
| SID | Especificación, ruta, puntos, restricciones, RF | Transición o pista equivocadas | Colación y confirmación |
| En ruta | Especificación de la ruta, fuentes en uso | Degradación de GNSS, interferencia | Aviso con propuesta |
| STAR | Transición, restricciones, enganche con la aproximación | Vectores que cancelan la STAR | Confirmar si sigue vigente |
| RNP APCH | Infraestructura, modo aproximación antes del FAF, línea de mínimos, QNH | Temperatura fuera de límites, pérdida de capacidad | Aviso con propuesta |
| Aterrizaje | Nada nuevo | | Reporte posterior si hubo anomalía |

### En pocas palabras

- El orden de lectura de una carta PBN empieza por el título y sigue por las notas y el recuadro PBN, que es lo obligatorio.
- PBN acompaña el vuelo entero: preparación, MEL, datos, plan, SID, ruta, STAR y aproximación.
- En cada fase hay algo que verificar, algo que puede fallar y algo que se comunica.
- Lo que no está en la carta está en el AFM, la MEL, el QRH y el SOP.

[ESPACIO PARA IMAGEN ANOTADA]

IMAGEN BASE:
Recreación educativa grande de una carta PBN completa, ocupando el ancho de la pantalla: vista en planta con pista, IAF, puntos intermedios, FAF, tramo RF marcado y trayectoria de frustrada con espera; perfil vertical debajo; caja de mínimos con tres líneas; recuadro PBN y recuadro de requisitos de equipo arriba a la derecha; bloque de notas abajo a la izquierda.

ANOTACIONES:
→ FLECHA 1: al título del procedimiento.
EXPLICACIÓN: la clase de procedimiento, según la convención de quien publica. No dice por sí solo qué exige.
→ FLECHA 2: al recuadro PBN.
EXPLICACIÓN: la especificación exigida, los sensores o funciones y el valor RNP mínimo. Obligatorio.
→ FLECHA 3: al recuadro de requisitos de equipo.
EXPLICACIÓN: equipo en tierra o específico del aeropuerto. Va aparte del recuadro PBN.
→ FLECHA 4: a la pista y la designación de la aproximación.
EXPLICACIÓN: lo que se carga tiene que ser exactamente esto.
→ FLECHA 5: a un waypoint con simbología de fly-by.
EXPLICACIÓN: dice si el punto se sobrevuela o si el giro se anticipa.
→ FLECHA 6: al tramo RF.
EXPLICACIÓN: arco de radio constante. Exige capacidad listada y respetar la velocidad máxima publicada.
→ FLECHA 7: a una restricción de altitud.
EXPLICACIÓN: se verifica cargada en el FMS, no solo leída.
→ FLECHA 8: a una restricción de velocidad.
EXPLICACIÓN: en un tramo RF es parte del diseño, no una sugerencia.
→ FLECHA 9: a la derrota entre dos puntos.
EXPLICACIÓN: la referencia contra la que se compara lo que muestra el FMS.
→ FLECHA 10: al valor RNP publicado, cuando aparezca.
EXPLICACIÓN: un valor con dos decimales indica 0.30 o menos y remite a una operación con autorización requerida.
→ FLECHA 11: al bloque de notas.
EXPLICACIÓN: limitaciones de temperatura, fuentes de ajuste altimétrico y cualquier condición del procedimiento.
→ FLECHA 12: a la trayectoria de frustrada.
EXPLICACIÓN: tiene su propio requisito de navegación, que puede no ser el de la aproximación.

OBJETIVO PEDAGÓGICO:
Que el piloto pueda mirar una carta PBN y encontrar inmediatamente la información necesaria, en un orden que no dependa de la suerte.

### Escenario 1 · La SID cargada no es la autorizada

**Situación:** el ATC autoriza una SID con una transición determinada. Al verificar, el FMS contiene el mismo procedimiento con otra transición.

**Pregunta:** ¿qué hace la tripulación y en qué momento?

**Razonamiento correcto:** se corrige **antes de ejecutar**. El nombre del procedimiento coincide, así que la trampa está en la transición, que es el elemento que más se escapa porque no se ve en el encabezado. Se recarga el procedimiento completo desde la base de datos con la transición autorizada, se vuelve a verificar la secuencia de puntos y las derrotas contra la carta, y se comprueba que las restricciones quedaron cargadas. Lo que no corresponde es editar la secuencia a mano para «arreglarla»: se carga desde la base. Y si hay cualquier duda sobre qué transición se autorizó, se pregunta.

**Referencia:** FAA AIM 1-2-1, verificación de datos tras cargar el procedimiento; FAA AC 90-105A, numeral 8.4.4.

### Escenario 2 · La base de datos no está en el ciclo esperado

**Situación:** en la inicialización se encuentra que la base de datos no corresponde al ciclo que se esperaba.

**Pregunta:** ¿es un «no go»?

**Razonamiento correcto:** no de forma automática, y responder «no go» sin más es el error que la pregunta busca. Hay que consultar la MEL, el SOP, la autorización del operador, el tipo de operación y la regulación aplicable. La norma exige que los datos sean actuales y apropiados para la región y que sigan siéndolo durante el vuelo, y para operadores de transporte monta un programa de base de datos con responsable, proceso documentado y confirmación del piloto en la inicialización. Hay un caso en que la respuesta sí es tajante: si se publicó una carta enmendada cuya enmienda no está en la base, la base **no debe usarse** para conducir esa operación.

**Referencia:** FAA AC 90-105A, numerales 10.2, 10.4, 10.6 y 10.7.

### Escenario 3 · Falla de GNSS durante una SID RNAV

**Situación:** en ascenso, volando una SID RNAV, se pierde el GNSS.

**Pregunta:** ¿qué secuencia se sigue?

**Razonamiento correcto:** controlar el avión, identificar la falla, contrastar la posición con lo que quede disponible, determinar qué capacidad de navegación permanece y si la especificación exigida todavía se puede cumplir, aplicar QRH y SOP, e informar al ATC con el curso de acción propuesto. La pregunta que decide es si queda una fuente **admitida por esa especificación**: en RNAV 5 puede quedar capacidad con DME/DME, VOR/DME o inercial; en una especificación que solo admite GNSS, no. Si no se puede cumplir, la comunicación sigue la estructura de identificación y falla, lo que no se puede cumplir, y lo que se solicita.

**Referencia:** FAA AC 90-100A, numeral 10, apartado d; FAA AC 90-105A, Apéndice A, numeral A.7.1.8.

### Escenario 4 · La performance estimada ya no satisface la requerida

**Situación:** en una llegada con especificación RNP, el sistema indica que ya no puede satisfacer la performance requerida.

**Pregunta:** ¿qué significa y qué se hace?

**Razonamiento correcto:** significa que el control y alerta a bordo concluyó que el requisito operacional no se está cumpliendo, y eso es precisamente para lo que existe la función. Se vuela el avión, se reconoce el aviso, se contrasta la posición, se aplican QRH y SOP de la flota, se determina qué capacidad queda y se concluye si la especificación del segmento todavía se cumple. Si no, se informa al ATC con la propuesta. Dos cosas que no se hacen: modificar el valor RNP en el sistema para que «quepa», porque el valor lo fija el procedimiento, y esperar a ver si el aviso se va.

**Referencia:** FAA AC 90-105A, numeral 4.2 y Apéndice A, numeral A.7.1.8; FAA AC 90-105A, Apéndice J, definición de EPU.

### Escenario 5 · Restricción de MEL antes del vuelo

**Situación:** hay un ítem de MEL abierto en una fuente de navegación. El avión es despachable.

**Pregunta:** ¿qué hay que determinar antes de salir?

**Razonamiento correcto:** qué capacidad de especificación de navegación queda, que es información que la norma exige que esté **en la MEL**. Y con eso, si el vuelo previsto la necesita: la salida, la ruta, la llegada, la aproximación al destino y la de los alternos. Hay que revisar la entrada completa, incluidas las observaciones y el procedimiento operacional asociado, que es donde suele estar la restricción real. Si la capacidad se perdió y el plan de vuelo la declara, el plan hay que corregirlo antes de salir. Y si hay un segundo ítem abierto, el efecto conjunto no se calcula sumando: lo resuelve la lista.

**Referencia:** RAC 91, numeral 91.1015, apartado (a)(3); RAC 121, numeral 121.995, apartado (b)(1)(iii).

### Escenario 6 · Temperatura por debajo del límite publicado

**Situación:** aproximación con línea de mínimos LNAV/VNAV. La temperatura está por debajo del límite publicado en la nota del procedimiento y el avión no tiene compensación automática aprobada.

**Pregunta:** ¿se puede volar la aproximación?

**Razonamiento correcto:** sí, pero no a esa línea. Los sistemas Baro-VNAV sin compensación no pueden operar a la DA de LNAV/VNAV con la temperatura fuera de las limitaciones publicadas, y la respuesta correcta es volar a la **MDA de LNAV**, que está publicada en la misma carta. La limitación no aplicaría si la aproximación se volara a mínimos LNAV/VNAV con guía vertical satelital y el avión tuviera esa aprobación de aeronavegabilidad. Lo que no corresponde es volar a la DA suponiendo que el margen de la nota es conservador: la nota es parte del procedimiento.

**Referencia:** FAA AC 90-105A, Apéndice B, numeral B.4.2; FAA AIM 5-4-5.

### Escenario 7 · Aviso de performance antes del FAF

**Situación:** preparado para una RNP APCH. Antes del FAF aparece un aviso relacionado con la performance de navegación.

**Pregunta:** ¿se puede continuar?

**Razonamiento correcto:** depende de si se puede seguir satisfaciendo los requisitos RNP APCH del procedimiento, y la definición de pérdida de capacidad es amplia: cualquier falla o suceso que impida satisfacerlos. Hay que contrastar, aplicar el procedimiento de contingencia que el operador desarrolló para este caso, y decidir entre continuar a otra línea de mínimos si eso es válido con lo que queda, frustrar, o pedir otra aproximación. Antes del FAF hay más opciones que después, y ese es justamente el motivo de que la norma pida confirmar la transición a modo aproximación **2 NM antes del FAF**. También hay que mirar el combustible: otra aproximación o un alterno cuestan.

**Referencia:** FAA AC 90-105A, Apéndice A, numerales A.7.1.8 y A.7.2.1.

### Escenario 8 · Degradación durante una RNP AR

**Situación:** ejecutando una aproximación RNP AR, con terreno alrededor, aparece una degradación de la navegación.

**Pregunta:** ¿por qué es más crítico que en una aproximación PBN menos exigente?

**Razonamiento correcto:** porque el área lateral de evaluación de obstáculos de un procedimiento RNP AR es **dos veces el valor RNP, sin zona secundaria ni márgenes adicionales**. No hay colchón: el margen lo estaba dando la performance del avión y la precisión del seguimiento de la trayectoria. A eso se suman los tramos RF, que no admiten desviación arbitraria, y una frustrada que puede exigir un valor menor de 1.00 NM con equipo redundante. La actuación concreta está en el procedimiento autorizado del operador y en el entrenamiento específico de RNP AR: aquí no hay una respuesta universal, y suponer una es el error.

**Referencia:** FAA AIM 5-4-18; FAA AC 90-101A, Apéndice, numeral 2.

### Escenario 9 · Discrepancia entre la carta y el FMS

**Situación:** la carta publica un punto que no coincide con la secuencia que muestra el FMS.

**Pregunta:** ¿qué hace la tripulación?

**Razonamiento correcto:** no improvisar. Se confirma qué se autorizó, se revisa la selección (procedimiento, pista y transición son las causas más probables), se verifica la vigencia de la base de datos y se consulta el SOP. Una trayectoria dudosa no se vuela solo porque esté cargada. Si se concluye que es un error de codificación, la norma tiene un camino: se reporta al proveedor de la base de datos y el uso del procedimiento afectado se prohíbe mediante un aviso del operador a sus tripulaciones, hasta que el operador lo resuelva. Y si existe una carta enmendada cuya enmienda no está en la base, la base no se usa para esa operación.

**Referencia:** FAA AC 90-105A, numerales 10.4 y 10.7, apartado 5; Apéndice A, numeral A.4.2.

### Escenario 10 · Interferencia de GNSS en crucero

**Situación:** en crucero aparecen varias discrepancias: la hora del avión es incorrecta, el viento y la velocidad respecto al suelo no cuadran, y otro avión en la frecuencia reporta errores de posición.

**Pregunta:** ¿qué está pasando y qué se hace?

**Razonamiento correcto:** esos tres son indicios reconocidos de interferencia o suplantación de GNSS, junto con el corrimiento del mapa, la posición incorrecta del FMS, los avisos de error de posición, el disparo poco fiable del TAWS y las salidas de ADS-B erróneas. Se verifica la posición con radioayudas convencionales cuando estén disponibles, se evalúa qué sistemas de a bordo dependen de entradas de GPS, se comprueba que las radioayudas críticas de la ruta y de la aproximación previstas están disponibles, se está preparado para revertir a procedimientos convencionales y se notifica al ATC con prontitud, salvo que se esté en una zona de pruebas publicada por NOTAM y no se requiera asistencia. Después del vuelo: documentar en el libro de mantenimiento y presentar el reporte.

**Referencia:** FAA AIM 1-2-4, indicios y recomendaciones; FAA AIM 1-1-19.

### Escenario 11 · Vectores en mitad de una STAR

**Situación:** volando una STAR con restricciones de altitud y velocidad publicadas, el ATC da vectores para espaciamiento.

**Pregunta:** ¿siguen vigentes las restricciones?

**Razonamiento correcto:** no. Si se vectorea al avión o se lo autoriza a desviarse de la STAR, la STAR se considera **cancelada**, y con ella sus restricciones de altitud, de velocidad y la nota de transición de Mach a velocidad indicada; el ATC dará una altitud que mantener y, si hace falta, una velocidad. Si el controlador pretende reincorporar el avión, avisará dónde esperar reanudar el procedimiento. Lo que la tripulación no debe hacer es seguir «cumpliendo» un perfil que ya no está autorizado, ni suponer que el FMS, que conserva la secuencia, refleja la autorización vigente. Si hay duda, se pregunta.

**Referencia:** FAA AIM 5-4-1, apartado de rutas con STAR; FAA AIM 5-2-9.

### Escenario 12 · Directo a un punto con la aproximación cargada

**Situación:** con la aproximación cargada y verificada, el ATC autoriza directo a un punto intermedio.

**Pregunta:** ¿qué hay que comprobar antes de ejecutar?

**Razonamiento correcto:** primero, a qué punto exactamente se está autorizado: se colaciona y se compara con la carta, porque los nombres de cinco letras se confunden en frecuencia. Después, qué cambia el directo: la geometría, el secuenciamiento, las restricciones asociadas a los puntos que se saltan, el perfil vertical, la predicción de combustible y el enganche con la aproximación. Se verifica que la aproximación sigue enganchada y que la frustrada sigue completa. Solo entonces se ejecuta, y después se vigila. Si el directo rompe un tramo RF o hace incompatible una restricción, se le dice al ATC antes de ejecutar, no después.

**Referencia:** FAA AC 90-105A, numeral 8.4.3, apartados 20 y 22; FAA AIM 5-4-6.

### Quiz · Capítulo 52

**p52-q1** · ¿Cuál es el primer sitio de la carta donde se busca lo que el procedimiento exige?
- A) El título del procedimiento.
- B) Las notas y el recuadro PBN.
- C) La caja de mínimos.
- D) El perfil vertical.
**Correcta:** B · **Tema:** P52 · **Referencia:** FAA AIM 1-2-3, representación de los requisitos PBN
**Explicación:** El título dice la clase de procedimiento según la convención de quien publica, pero lo que el procedimiento exige está en las notas y en el recuadro PBN, y lo que está ahí es obligatorio para volar sus elementos PBN.

**p52-q2** · En el vuelo completo, ¿en qué fase se resuelve una contradicción entre la MEL y la capacidad declarada en el plan de vuelo?
- A) En vuelo, explicándola al ATC.
- B) Antes de salir, corrigiendo el plan.
- C) Al llegar al destino, en el reporte.
- D) No hay contradicción posible.
**Correcta:** B · **Tema:** P52 · **Referencia:** RAC 121, numeral 121.995, apartado (b)(1)(iii); OACI PANS-ATM, Apéndice 2
**Explicación:** El ATC autoriza según las capacidades declaradas y espera que se usen, así que una capacidad declarada que la MEL quitó es una contradicción que se resuelve en tierra. Explicarla por radio llega cuando ya se recibió una autorización que no se puede cumplir.

**p52-q3** · ¿Qué indica un valor RNP publicado con dos decimales, del tipo 0.15?
- A) Que se trata de la especificación RNP 0.3 para helicópteros.
- B) Que es un valor de 0.30 o menor, propio de una operación con autorización requerida.
- C) Que la precisión es orientativa.
- D) Que el procedimiento admite cualquier aeronave RNP APCH.
**Correcta:** B · **Tema:** P52 · **Referencia:** FAA AIM 1-2-1, nota sobre valores RNP en carta; FAA AIM 5-4-18
**Explicación:** El AIM pide no confundir un valor RNP en carta de 0.30 o menor con el nombre de la especificación «RNP 0.3»: los valores en carta de 0.30 o menos se escriben con dos decimales. Y las aproximaciones RNP AR tienen valores de RNP 0.30 o menores, cada línea de mínimos con el suyo.

---

# CIERRE DEL MÓDULO

---

## Errores frecuentes en entrevistas

Dieciséis afirmaciones que se oyen y por qué fallan.

- **«PBN es GPS.»** PBN es un concepto de navegación basada en performance; el GNSS es una tecnología, con frecuencia la fuente principal y no siempre la única admitida. Hay especificaciones que aceptan DME/DME, DME/DME/IRU o VOR/DME.
- **«RNAV y RNP son lo mismo.»** La única diferencia de familia es que la especificación RNP incluye el requisito de control y alerta de la performance a bordo, y la RNAV no.
- **«RNP 1 significa que puedo desviarme una milla.»** El número es la precisión de navegación lateral que se espera conseguir al menos el 95 % del tiempo de vuelo por la población de aeronaves. No es una tolerancia de pilotaje: la expectativa operacional es mantener el eje.
- **«RNAV 1 es más preciso que RNP 1 porque ambos tienen 1.»** La frase se contradice sola. El número describe la misma precisión lateral; lo que separa a las dos es el control y la alerta a bordo.
- **«RNP solo se utiliza en aproximaciones.»** Hay RNP 2 en ruta doméstica y oceánica, RNP 4 en oceánico y remoto, y RNP 1 en llegada, salida e inicial e intermedia de aproximación.
- **«RNP AR y RNP APCH son lo mismo.»** RNP AR exige autorización específica sin excepciones y su área lateral de evaluación de obstáculos es dos veces el valor RNP, sin zona secundaria.
- **«Si tengo GPS puedo volar cualquier RNP.»** Cada especificación exige elegibilidad propia de la aeronave, autorización del operador y competencia de la tripulación. La elegibilidad no se hereda, salvo el caso de RNP 4 que confiere RNP 10.
- **«Si el procedimiento aparece en el FMS significa que estoy autorizado.»** Que esté codificado no dice nada de la autorización. En el marco de la FAA ocurre lo contrario: si no aparece, lo probable es que el avión no sea elegible para sus elementos PBN.
- **«La base de datos del FMS siempre es correcta.»** La norma prevé el caso contrario y monta un proceso: reporte al proveedor, prohibición de uso del procedimiento afectado y restablecimiento por el operador.
- **«El FMS reemplaza la carta.»** El FMS ejecuta; la carta es la referencia de verificación. Después de cargar hay que verificar los datos de puntos y derrotas.
- **«PBN elimina la necesidad de monitorear la posición.»** El control y alerta a bordo vigila el error del sistema de navegación. El error técnico de vuelo lo vigila la tripulación con la presentación de desviación lateral.
- **«ANP y RNP son lo mismo.»** Uno es el requisito y el otro la estimación de la performance de posición actual. Y esa estimación no es el error real: es una indicación estadística definida.
- **«RF significa simplemente un giro cerrado.»** Es una trayectoria circular de radio constante alrededor de un centro definido, entre dos puntos, y es la trayectoria publicada y protegida.
- **«Si pierdo GNSS pierdo automáticamente toda capacidad RNAV.»** Depende de la especificación: algunas admiten otras fuentes. En RNP APCH, donde el GPS es primario y DME/DME no es aceptable, la conclusión es la contraria.
- **«Si el avión es despachable por MEL mantiene automáticamente todas sus capacidades PBN.»** Es justo lo que la norma previene al exigir que la MEL incluya la información de capacidades de especificación de navegación.
- **«RNAV approach y RNP approach son siempre exactamente lo mismo.»** El título de la carta sigue la convención de cada autoridad: en el marco de la FAA los RNP APCH se titulan RNAV (GPS). Lo que exige el procedimiento está en las notas.

## Lo que hay que memorizar

Treinta puntos. Lo demás se consulta.

1. PBN es navegación de área basada en requisitos de performance, aplicada a rutas ATS, espacio aéreo designado, SID, STAR y aproximaciones.
2. Toda operación PBN es navegación de área; no toda navegación de área es PBN.
3. Los tres elementos: aplicación de navegación, especificación para la navegación e infraestructura de radioayudas.
4. Una especificación para la navegación es un conjunto de requisitos relativos a la aeronave **y a la tripulación de vuelo**.
5. Especificación RNAV: sin requisito de control y alerta de la performance. Prefijo RNAV.
6. Especificación RNP: con control y alerta de la performance a bordo. Prefijo RNP.
7. El número es la precisión de navegación lateral en millas náuticas, conseguida al menos el 95 % del tiempo de vuelo.
8. RNAV 1: error total del sistema no mayor de 1 NM el 95 % del tiempo. RNAV 2: 2 NM.
9. Especificaciones RNAV: 10, 5, 2 y 1. RNP: 4, 2, 1, A-RNP, RNP APCH y RNP AR APCH.
10. RNP APCH: valor 1 en terminal y frustrada, 0.3 en la aproximación final.
11. RNP 1: llegada, salida e inicial e intermedia de aproximación en procedimientos con segmentos PBN.
12. RNP 2: ruta doméstica y oceánica. RNP 4: solo oceánica y remota.
13. RNP 4 confiere automáticamente RNP 10; RNP 10 se considera RNAV 10. Es la excepción a la falta de herencia.
14. A-RNP exige tramos RF, RNP escalable y trayectoria paralela desplazada, y **no** confiere RNP AR.
15. RNP AR exige autorización específica sin excepciones, valor mínimo de RNP 0.30 y área lateral de dos veces el valor RNP sin zona secundaria.
16. En RNP AR la elegibilidad de tramo RF es obligatoria; en RNP APCH y RNP 1 es opcional.
17. Tramo RF: trayectoria circular de radio constante entre dos puntos; hay que mantener la trayectoria y las velocidades máximas publicadas.
18. Fly-by: el giro empieza antes del punto. Fly-over: hay que sobrevolar el punto antes de girar.
19. RNP es la performance requerida; EPU, ANP o EPE es la estimación de la performance de posición actual, y no es el error real.
20. No es obligatorio presentar el valor estimado: lo obligatorio es la alerta si la RNP no puede cumplirse.
21. TSE es la suma vectorial de PDE, NSE y FTE. El sistema vigila el NSE; la tripulación, el FTE.
22. La base de datos debe ser actual y apropiada, y seguir siéndolo durante el vuelo.
23. Si hay una carta enmendada cuya enmienda no está en la base, la base no se usa para esa operación.
24. Autorización del ATC, carta y FMS tienen que decir lo mismo, y se contrasta antes de ejecutar.
25. En RNP APCH el GPS es primario, DME/DME no es aceptable, y la frustrada puede basarse en radioayuda convencional.
26. Baro-VNAV hasta una DA exige ajuste altimétrico local y actual, puesto no más tarde del FAF.
27. Con temperatura fuera del límite publicado y sin compensación aprobada, no se usa la DA de LNAV/VNAV; sí la MDA de LNAV.
28. La capacidad PBN se declara con la letra R en la casilla 10 y con `PBN/` en la casilla 18, hasta 8 descriptores y 16 caracteres.
29. La MEL debe incluir la información de capacidades de especificación de navegación: despachable no es «con todas las capacidades».
30. Ante pérdida de capacidad: volar, identificar, contrastar, QRH y SOP, determinar qué queda, concluir si se cumple lo exigido, informar al ATC con la propuesta.

### Lo que hay que comprender, no memorizar

- Por qué el control y alerta permite depender menos de la intervención del ATC y de la separación procedimental.
- Por qué el valor pertenece al segmento y no al procedimiento.
- Por qué un avión elegible puede no ser capaz hoy.
- Por qué el área sin zona secundaria de RNP AR explica todas sus exigencias.
- Por qué la temperatura afecta a una trayectoria vertical barométrica.

### Lo que hay que consultar, nunca recitar

- El valor RNP de una línea de mínimos y el límite de temperatura: en la carta.
- La elegibilidad de la aeronave y sus funciones: en el AFM o la documentación de aviónica.
- Lo que el operador está autorizado a volar: en las especificaciones de operación.
- Qué capacidad queda hoy: en la MEL.
- El mensaje que muestra el avión y la acción asociada: en el FCOM y el QRH.
- La fraseología aplicable: en el AIP del Estado donde se opera.

## Preguntas típicas de entrevista

Veintiocho, con respuesta corta, explicación y una nota de cómo decirla.

**1. What does PBN mean?**
**Respuesta corta:** Performance-Based Navigation: navegación de área basada en requisitos de performance aplicados en rutas ATS, procedimientos de aproximación por instrumentos y espacio aéreo designado.
**Explicación:** el cambio de fondo es que el requisito pasa de ser un equipo a ser una performance.
**Nota:** menciona las cuatro aplicaciones. Quien solo dice «navegación por satélite» se queda corto.

**2. What is the difference between RNAV and RNP?**
**Respuesta corta:** RNP es navegación de área más control de la performance a bordo más alerta a la tripulación. RNAV no incluye ese requisito.
**Explicación:** es la única diferencia de familia en la definición de la norma.
**Nota:** dilo como una ecuación. Es la pregunta más frecuente del tema.

**3. What does the number in RNP 1 mean?**
**Respuesta corta:** la precisión de navegación lateral en millas náuticas que se espera conseguir al menos el 95 % del tiempo de vuelo.
**Explicación:** se refiere a la población de aeronaves que opera en ese espacio, ruta o procedimiento.
**Nota:** no olvides el 95 %. Sin él la respuesta está incompleta.

**4. Is RNP 1 the same as RNAV 1?**
**Respuesta corta:** no. Misma precisión lateral, familia distinta, y la elegibilidad no se hereda.
**Explicación:** ser elegible para RNP 1 no da RNP 2 ni RNAV 1.
**Nota:** añade que las especificaciones se consideran distintas, no mejores o peores.

**5. What is onboard performance monitoring and alerting?**
**Respuesta corta:** la capacidad del sistema de vigilar la performance conseguida e identificar para el piloto si el requisito operacional se está cumpliendo.
**Explicación:** permite depender menos de la intervención del ATC y de la separación procedimental.
**Nota:** aclara que vigila el error del sistema de navegación, no el error técnico de vuelo.

**6. What is RNP APCH?**
**Respuesta corta:** la especificación RNP de aproximación: valor 1 en terminal y frustrada, 0.3 en la final.
**Explicación:** en el marco de la FAA se titula RNAV (GPS) y puede publicar varias líneas de mínimos.
**Nota:** menciona que el título depende de la convención de la autoridad.

**7. What is RNP AR?**
**Respuesta corta:** RNP Authorization Required: exige autorización específica, sin excepciones, y su área lateral de obstáculos es dos veces el valor RNP sin zona secundaria.
**Explicación:** valor mínimo de RNP 0.30, tramos RF obligatorios y posibles frustradas por debajo de 1.00 NM.
**Nota:** compárala con la autorización de CAT II o III para dar la medida.

**8. What is the difference between RNP APCH and RNP AR APCH?**
**Respuesta corta:** la autorización específica y la ausencia de zona secundaria en el área de obstáculos.
**Explicación:** en RNP AR los tramos RF y el escalado son obligatorios, y la frustrada puede exigir menos de 1.00 NM con equipo redundante.
**Nota:** el valor más bajo es una consecuencia del diseño, no la definición.

**9. What is an RF leg?**
**Respuesta corta:** una trayectoria circular de radio constante alrededor de un centro definido, que empieza y termina en un punto.
**Explicación:** el arco es la trayectoria publicada, y hay que respetar las velocidades máximas.
**Nota:** añade que la capacidad es opcional en RNP APCH y RNP 1, y obligatoria en RNP AR.

**10. What is the difference between a fly-by and a fly-over waypoint?**
**Respuesta corta:** en el fly-by el giro empieza antes del punto; en el fly-over hay que sobrevolar el punto antes de girar.
**Explicación:** la anticipación depende de la velocidad y la altitud.
**Nota:** menciona que si el sistema no da esa guía, la ejecuta el piloto.

**11. What is ANP?**
**Respuesta corta:** la estimación de la performance de navegación actual, en millas náuticas. En otros aviones se llama EPU o EPE.
**Explicación:** no es el error real, es una indicación estadística definida del error potencial.
**Nota:** aclara que el nombre depende del fabricante.

**12. What happens if ANP exceeds RNP?**
**Respuesta corta:** el sistema concluye que no puede satisfacer la performance requerida y alerta.
**Explicación:** se vuela el avión, se contrasta la posición, se aplica QRH y SOP, se determina qué queda y se concluye si se cumple lo exigido.
**Nota:** no digas el mensaje de un fabricante concreto si no te preguntan por esa flota.

**13. What is an AIRAC cycle?**
**Respuesta corta:** el sistema de fechas comunes de entrada en vigor de la información aeronáutica.
**Explicación:** el piloto verifica qué base está activa y su periodo de validez.
**Nota:** menciona el caso del ciclo que cambia en vuelo.

**14. Why must the navigation database be checked?**
**Respuesta corta:** porque la trayectoria que vuela el avión sale de datos codificados, y deben ser actuales y apropiados.
**Explicación:** si hay una carta enmendada cuya enmienda no está en la base, la base no se usa.
**Nota:** añade que el operador necesita un programa documentado y el piloto confirma la vigencia en la inicialización.

**15. Can you fly an RNP procedure simply because it appears in the FMS?**
**Respuesta corta:** no. Que esté codificado no dice nada de la elegibilidad del avión ni de la autorización del operador.
**Explicación:** hacen falta aeronave elegible, operador autorizado y tripulación competente.
**Nota:** si conoces el marco de la FAA, menciona que si **no** aparece, lo probable es que el avión no sea elegible.

**16. What would you do if GNSS capability is lost during a PBN procedure?**
**Respuesta corta:** volar el avión, identificar la falla, contrastar la posición, determinar qué capacidad queda, concluir si se cumple la especificación e informar al ATC con la propuesta.
**Explicación:** las fuentes admitidas dependen de la especificación.
**Nota:** empieza por «depende de la especificación». Es la señal de que entendiste el tema.

**17. Can an MEL affect PBN capability?**
**Respuesta corta:** sí. Un avión puede quedar despachable y haber perdido una capacidad PBN.
**Explicación:** por eso la norma exige que la MEL incluya la información de capacidades de especificación de navegación.
**Nota:** añade que dos ítems aceptables por separado pueden no serlo juntos.

**18. What is Baro-VNAV?**
**Respuesta corta:** guía vertical generada a partir de información barométrica de altitud, que normalmente sostiene la línea LNAV/VNAV.
**Explicación:** depende de la presión, así que el ajuste altimétrico y la temperatura la afectan.
**Nota:** menciona que hasta una DA exige ajuste local y actual.

**19. Why can temperature affect Baro-VNAV?**
**Respuesta corta:** porque la temperatura no estándar tiene un efecto pronunciado sobre una trayectoria construida con información barométrica.
**Explicación:** por eso la línea LNAV/VNAV lleva limitación de temperatura publicada como nota del procedimiento.
**Nota:** no cites un número: el valor está en la carta de ese procedimiento.

**20. What should you verify before flying an RNAV SID?**
**Respuesta corta:** la especificación exigida, la ruta, los puntos, las restricciones, los tramos RF, las notas de equipo y la autorización, y la posición del avión antes de rodar.
**Explicación:** con GNSS, la señal debe estar adquirida antes de iniciar la carrera.
**Nota:** menciona la transición: es el elemento que más se escapa.

**21. What would you do if the chart and FMS disagree?**
**Respuesta corta:** no improvisar: confirmar qué se autorizó, revisar la selección, verificar la vigencia de la base y consultar el SOP.
**Explicación:** si es un error de codificación, se reporta al proveedor y se prohíbe el uso del procedimiento hasta que el operador lo resuelva.
**Nota:** la frase que cierra la respuesta es «una trayectoria dudosa no se vuela solo porque esté cargada».

**22. What is the difference between PBN and GPS?**
**Respuesta corta:** PBN es un concepto de navegación basada en performance; el GPS es una tecnología y una fuente de posición.
**Explicación:** hay especificaciones que admiten DME/DME, DME/DME/IRU o VOR/DME.
**Nota:** una frase de cierre útil: «el GPS es fuente, no permiso».

**23. Can an aircraft remain dispatchable but lose RNP capability?**
**Respuesta corta:** sí, y la norma lo asume al exigir que la MEL lleve la información de capacidades de navegación.
**Explicación:** en ciertas aeronaves, un piloto automático inoperativo quita la capacidad RNP APCH si el error total del sistema no puede demostrarse sin él.
**Nota:** ese ejemplo del piloto automático es el que mejor demuestra que entendiste.

**24. What is the difference between an outage and interference?**
**Respuesta corta:** la interrupción es que el servicio no esté; la interferencia es que haya señales que lo impidan o degraden.
**Explicación:** una interrupción publicada se planifica con radioayudas convencionales; una interferencia se detecta y se contrasta.
**Nota:** menciona la contingencia de combustible: revertir a convencional cuesta millas.

**25. How would you detect GNSS spoofing?**
**Respuesta corta:** por inconsistencias: reloj del avión, posición del FMS, corrimiento del mapa, avisos de error de posición, TAWS disparando sin sentido, ADS-B, viento y velocidad respecto al suelo, y lo que reporten otros aviones.
**Explicación:** el RAIM es solo parcialmente efectivo frente a ello, así que el piloto puede no advertirlo.
**Nota:** añade el contraste rutinario contra VOR o DME. Es lo que la autoridad recomienda.

**26. What is RAIM?**
**Respuesta corta:** un algoritmo que verifica la integridad de la salida de posición usando mediciones GPS, o GPS más ayuda barométrica.
**Explicación:** FDE es un RAIM que además excluye automáticamente un satélite defectuoso cuando hay mediciones redundantes suficientes.
**Nota:** no digas que la predicción RAIM es obligatoria siempre: se obtiene cuando corresponda.

**27. How is PBN capability filed in the ICAO flight plan?**
**Respuesta corta:** la letra R en la casilla 10, y el indicador `PBN/` con sus descriptores en la casilla 18, hasta 8 entradas y 16 caracteres.
**Explicación:** los descriptores declaran especificación y sensor, y `S2` añade Baro-VNAV.
**Nota:** el ATC autoriza según lo declarado y espera que se use.

**28. What does TSE consist of?**
**Respuesta corta:** la suma vectorial del error de definición de la trayectoria, el error del sistema de navegación y el error técnico de vuelo.
**Explicación:** el PDE se considera despreciable por la integridad de la base de datos y los procedimientos; el NSE lo vigila el sistema y el FTE, la tripulación.
**Nota:** el reparto de vigilancia es la parte que distingue una buena respuesta.

---

# QUIZ FINAL DE PBN

Cincuenta preguntas. El servidor sortea veinte por intento y la corrección se ve al final. Ninguna repite una pregunta de los quiz de capítulo.

**ev-01** · Preparas un vuelo con una aproximación RNP APCH en el destino. El avión sale con un ítem de MEL en el piloto automático y la guía operacional dice que su acoplamiento es obligatorio para esas aproximaciones. ¿Qué concluyes?
- A) Que se puede volar la aproximación a mano, con más atención a la desviación lateral.
- B) Que la capacidad RNP APCH se perdió y hay que replanificar el destino o la aproximación.
- C) Que basta con volar a la línea LNAV en vez de LNAV/VNAV.
- D) Que el ATC puede autorizar la aproximación si hay vigilancia radar.
**Correcta:** B · **Tema:** P46 · **Referencia:** FAA AC 90-105A, Apéndice A, numeral A.3.9
**Explicación:** Cuando el error total del sistema lateral no puede demostrarse sin el piloto automático o el director de vuelo, su acoplamiento pasa a ser obligatorio y la guía operacional lo indica. Sin él no hay capacidad, y la habilidad de pilotaje no sustituye un requisito de la especificación.

**ev-02** · El ATC te autoriza directo a un punto que está antes del FAF. Al ejecutarlo, un punto con restricción de altitud queda fuera del plan activo. ¿Qué implica?
- A) Nada: la restricción sigue vigente por estar publicada.
- B) Que el perfil vertical calculado cambió y hay que verificar qué restricciones siguen aplicando antes de continuar.
- C) Que el procedimiento queda cancelado en su totalidad.
- D) Que hay que reintroducir el punto a mano con sus coordenadas.
**Correcta:** B · **Tema:** P44 · **Referencia:** FAA AC 90-105A, numeral 8.4.3, apartado 22; FAA AIM 5-4-1
**Explicación:** Un directo cambia geometría, secuenciamiento y perfil vertical, y las restricciones asociadas a los puntos que se saltan salen del cálculo. Hay que verificar qué sobrevive antes de ejecutar, y reintroducir puntos a mano no es la solución.

**ev-03** · ¿Qué tienen en común RNAV 10 y RNP 10?
- A) Nada: son especificaciones distintas con valores distintos.
- B) Son la misma especificación con dos nombres, y toda aeronave elegible para RNP 10 se considera elegible para RNAV 10.
- C) Las dos incluyen control y alerta de la performance.
- D) Las dos se aplican en terminal.
**Correcta:** B · **Tema:** P16 · **Referencia:** FAA AIM 1-2-1, apartados RNP 10 y RNAV 10; OACI PANS-ATM, Apéndice 2, código A1
**Explicación:** En el espacio aéreo donde se aplica, la especificación es RNAV 10 y toda aeronave elegible para RNP 10 se considera elegible para RNAV 10. El nombre antiguo sobrevive en el código `A1`, cuyo texto es «RNAV 10 (RNP 10)». Ninguna de las dos tiene control y alerta: por eso se renombró.

**ev-04** · En una carta de aproximación en el marco de la FAA, ¿qué distingue el recuadro PBN del recuadro de requisitos de equipo?
- A) El recuadro PBN es informativo y el de equipo es obligatorio.
- B) El recuadro PBN trae la especificación, los sensores o funciones y el valor RNP mínimo; el de equipo trae el equipo en tierra o específico del aeropuerto.
- C) El recuadro PBN solo aparece en aproximaciones y el de equipo solo en salidas.
- D) Son dos nombres del mismo recuadro.
**Correcta:** B · **Tema:** P13 · **Referencia:** FAA AIM 1-2-3
**Explicación:** Lo que está en el recuadro PBN es obligatorio para volar los elementos PBN del procedimiento, y el equipo en tierra o del aeropuerto va en un recuadro aparte. Cuando hay los dos, el recuadro PBN se lista primero.

**ev-05** · Durante una STAR con «descend via» en el marco de la FAA, el ATC te da vectores para espaciamiento y después te autoriza a reincorporarte. ¿Qué pasó con las restricciones publicadas durante los vectores?
- A) Siguieron vigentes.
- B) Quedaron canceladas junto con la STAR, y el ATC dio una altitud que mantener.
- C) Solo quedaron canceladas las de velocidad.
- D) Quedaron suspendidas y se reactivaron al reincorporarse, sin aviso.
**Correcta:** B · **Tema:** P43 · **Referencia:** FAA AIM 5-4-1, apartado de rutas con STAR
**Explicación:** Si se vectorea o se autoriza a desviarse de una STAR, el piloto debe considerarla cancelada y las restricciones de altitud, de velocidad y la nota de transición de Mach a velocidad indicada quedan canceladas. El ATC avisa dónde esperar reanudar el procedimiento.

**ev-06** · Tu avión declara en el plan `PBN/D2O2S1`. ¿Qué capacidad **no** está declarada?
- A) RNAV 1 con GNSS.
- B) RNP 1 básica con GNSS.
- C) RNP APCH.
- D) RNP APCH con Baro-VNAV.
**Correcta:** D · **Tema:** P45 · **Referencia:** OACI PANS-ATM, Apéndice 2, códigos `PBN/` D2, O2, S1 y S2
**Explicación:** `S1` es RNP APCH y `S2` es RNP APCH con Baro-VNAV, que es una capacidad declarable aparte. Con `S1` solo, la guía vertical barométrica no está declarada, y eso tiene consecuencias para la línea de mínimos a la que se puede volar.

**ev-07** · ¿Por qué el área lateral de evaluación de obstáculos de una RNP AR no lleva zona secundaria?
- A) Porque el terreno alrededor lo impide.
- B) Porque el margen lo aporta la performance del avión y la precisión del seguimiento, y el área es dos veces el valor RNP.
- C) Porque la frustrada compensa la falta de margen.
- D) Porque el ATC proporciona vigilancia adicional.
**Correcta:** B · **Tema:** P22 · **Referencia:** FAA AIM 5-4-18, apartado de valor RNP
**Explicación:** Los procedimientos RNP AR usan un área lateral igual a dos veces el valor RNP, sin área secundaria ni márgenes adicionales. Esa ausencia de colchón es la que explica las exigencias de autorización, equipo, entrenamiento y, en algunos casos, redundancia.

**ev-08** · Estás en crucero y notas que la hora del avión es incorrecta y que la velocidad respecto al suelo no cuadra con el viento previsto. ¿Qué sospechas y qué haces primero?
- A) Una falla del sistema de datos aéreos; se aplica el QRH de datos aéreos.
- B) Interferencia o suplantación de GNSS; se verifica la posición con radioayudas convencionales cuando estén disponibles.
- C) Un error de introducción del viento; se recalcula el plan.
- D) Una falla del inercial; se selecciona la otra fuente.
**Correcta:** B · **Tema:** P41 · **Referencia:** FAA AIM 1-2-4, indicios y recomendaciones
**Explicación:** El reloj del avión erróneo y las indicaciones erróneas de viento y velocidad respecto al suelo están entre los indicios que la autoridad enumera. La primera acción recomendada es verificar la posición por medio de radioayudas convencionales cuando estén disponibles.

**ev-09** · ¿Qué le exige la norma colombiana al explotador, además de tener el avión equipado, para operar con una especificación PBN prescrita?
- A) Solo declarar la capacidad en el plan de vuelo.
- B) Estar autorizado por la UAEAC, y haber establecido y documentado procedimientos, calificaciones, instrucción y mantenimiento.
- C) Contar con vigilancia radar en toda la ruta.
- D) Tener el procedimiento cargado en la base de datos del avión.
**Correcta:** B · **Tema:** P51 · **Referencia:** RAC 121, numeral 121.995, apartado (b)(2) y (b)(3)
**Explicación:** La norma exige que la autoridad se asegure de que el explotador estableció y documentó procedimientos normales y anormales incluidos los de contingencia, calificaciones y competencias de la tripulación, instrucción y mantenimiento, y que además el explotador esté autorizado para esas operaciones.

**ev-10** · Vuelas una aproximación con un tramo RF y el ATC te pide mantener una velocidad superior a la máxima publicada para el tramo. ¿Qué haces?
- A) Aceptas: la velocidad del ATC prevalece.
- B) Informas que no puedes mantener esa velocidad en el tramo y coordinas.
- C) Aceptas y aumentas la inclinación para seguir el arco.
- D) Abandonas la aproximación sin informar.
**Correcta:** B · **Tema:** P24 · **Referencia:** FAA AC 90-105A, numeral 8.4.3, apartado 14
**Explicación:** La norma enumera entre los conocimientos requeridos la importancia de mantener la trayectoria publicada y las velocidades máximas en operaciones RNP con tramos RF. Un arco de radio fijo volado más rápido exige más inclinación, y el avión se sale del arco.

**ev-11** · ¿Qué vigila la tripulación que el sistema de control y alerta a bordo no vigila?
- A) El error del sistema de navegación.
- B) El error de definición de la trayectoria.
- C) El error técnico de vuelo, con la presentación de desviación lateral.
- D) El error total del sistema.
**Correcta:** C · **Tema:** P28 · **Referencia:** FAA AC 90-105A, nota al numeral 4.2
**Explicación:** Cumplir el requisito de control y alerta no implica un control automático del error técnico de vuelo. La función debe consistir al menos en un algoritmo de control y alerta del error del sistema de navegación y en una presentación de desviación lateral que permita a la tripulación vigilar el error técnico de vuelo.

**ev-12** · La carta de una aproximación publica LNAV, LNAV/VNAV y circling. La MDA de circling es más baja que la DA de LNAV/VNAV. ¿Es posible?
- A) No: los mínimos de circling son siempre los más altos.
- B) Sí: pueden ser más bajos que la línea LNAV/VNAV, pero nunca más bajos que la línea LNAV recta.
- C) Sí, sin restricciones.
- D) No, salvo con autorización del operador.
**Correcta:** B · **Tema:** P18 · **Referencia:** FAA AIM 5-4-5, apartado de circling
**Explicación:** Los mínimos de circling de una carta RNAV pueden ser más bajos que la línea LNAV/VNAV, pero nunca más bajos que la línea LNAV de aproximación recta. Ocurre cuando los obstáculos determinantes son distintos o cuando otros factores elevan la MDA de LNAV.

**ev-13** · ¿Qué significa que la elegibilidad para una especificación no se herede?
- A) Que hay que renovarla cada año.
- B) Que ser elegible para una especificación no da elegibilidad automática para otra, y cada una se lista por separado.
- C) Que la elegibilidad se pierde al cambiar de operador.
- D) Que solo el fabricante puede declararla.
**Correcta:** B · **Tema:** P08 · **Referencia:** FAA AIM 1-2-1, apartado general de RNP
**Explicación:** El AIM exige que cada elegibilidad conste por separado en la documentación de aviónica o el AFM, y advierte que RNP 1 no da RNP 2 ni RNAV 1. La única herencia que menciona es que RNP 4 confiere RNP 10, y que RNP 10 se considera RNAV 10.

**ev-14** · Antes de una aproximación RNP APCH, ¿qué hay que confirmar sobre la infraestructura?
- A) Que el GNSS está operativo en ese momento.
- B) Su disponibilidad para el periodo de las operaciones previstas, incluidas las contingencias no RNP, usando toda la información disponible.
- C) Que hay al menos un DME en cobertura.
- D) Que el aeropuerto tiene vigilancia radar.
**Correcta:** B · **Tema:** P38 · **Referencia:** FAA AC 90-105A, Apéndice A, numeral A.7.1.7
**Explicación:** La circular pide confirmar la disponibilidad de la infraestructura requerida para las rutas, procedimientos o aproximaciones previstas, incluidas las contingencias no RNP, para el periodo de la operación prevista. El plan alternativo también necesita infraestructura disponible.

**ev-15** · ¿Cuál de estas es una función mínima obligatoria de A-RNP en el marco de la FAA que **no** es obligatoria en RNP 1?
- A) La presentación de desviación lateral.
- B) La capacidad de calcular y volar tramos RF.
- C) La alerta cuando la RNP no puede cumplirse.
- D) El posicionamiento por GNSS.
**Correcta:** B · **Tema:** P16 · **Referencia:** FAA AIM 1-2-1, apartados A-RNP y RNP 1
**Explicación:** En A-RNP los tramos RF son función mínima obligatoria, junto con la RNP escalable y la trayectoria paralela desplazada. En RNP 1 la capacidad RF es opcional y hay que verla listada como característica del equipo.

**ev-16** · Un piloto afirma que como su avión tiene A-RNP puede volar cualquier aproximación RNP AR publicada. ¿Qué le falta?
- A) Nada: A-RNP incluye RNP AR.
- B) Que RNP AR exige un proceso de determinación separado y autorización especial, y que el valor lo fija la autorización del operador.
- C) Que RNP AR solo se vuela con aumentación satelital.
- D) Que hace falta vigilancia radar.
**Correcta:** B · **Tema:** P23 · **Referencia:** FAA AIM 1-2-1, nota al apartado A-RNP; FAA AIM 5-4-18
**Explicación:** Las aeronaves elegibles para A-RNP no son automáticamente elegibles para RNP AR APCH ni RNP AR DP: esa elegibilidad exige determinación separada y autorización especial. Y el valor mínimo al que se puede volar lo fija la autorización del operador, no la carta.

**ev-17** · ¿Qué papel cumple la simbología de un punto fly-by en la carta?
- A) Indica que el punto es opcional.
- B) Da al piloto conciencia de la acción esperada, porque el giro se anticipa.
- C) Indica que el punto lleva restricción de velocidad.
- D) Señala el inicio de un tramo RF.
**Correcta:** B · **Tema:** P25 · **Referencia:** FAA AIM 5-4-5, apartado de waypoints
**Explicación:** La simbología del punto fly-by proporciona al piloto conciencia de las acciones esperadas. Importa porque si el sistema no da la guía de anticipación, el piloto debe ejecutarla manualmente.

**ev-18** · En RNP APCH, ¿cuál es la fuente primaria de navegación y qué fuente no es aceptable?
- A) Primaria GNSS; no aceptable el inercial.
- B) Primario el GPS; no aceptables los sistemas basados en DME/DME.
- C) Primario DME/DME; no aceptable el VOR/DME.
- D) Primaria la aumentación satelital; no aceptable el GPS sin aumentar.
**Correcta:** B · **Tema:** P37 · **Referencia:** FAA AC 90-105A, Apéndice A, numeral A.5.1
**Explicación:** El GPS es el sistema de navegación primario para RNP APCH y los sistemas basados en DME/DME no son aceptables. El segmento de frustrada, en cambio, puede basarse en una radioayuda convencional como VOR, DME o NDB.

**ev-19** · ¿Qué diferencia hay entre la precisión y la integridad de una solución de posición?
- A) Ninguna: son dos nombres del mismo atributo.
- B) La precisión es cuánto se parece la posición a la verdadera; la integridad es la confianza en esa información y el aviso cuando se pierde.
- C) La precisión se mide en millas y la integridad en porcentaje.
- D) La integridad solo aplica a la guía vertical.
**Correcta:** B · **Tema:** P05 · **Referencia:** FAA AC 90-101A, numeral 3, apartado h; FAA AIM 1-2-1
**Explicación:** La precisión es parecido a la verdad; la integridad es la capacidad de confiar en la información y de avisar cuando deja de ser confiable, que es la función que cumple el RAIM. Son atributos distintos y una operación puede fallar por cualquiera de los dos.

**ev-20** · Vas a una LNAV/VNAV y solo hay disponible un ajuste altimétrico remoto. ¿Qué puedes hacer?
- A) Volar a la DA de LNAV/VNAV aumentando los mínimos.
- B) Usar la función VNAV pero solo hasta la MDA de LNAV publicada.
- C) Volar a la DA de LNAV/VNAV si la temperatura está dentro de límites.
- D) Nada: la aproximación no está disponible.
**Correcta:** B · **Tema:** P19 · **Referencia:** FAA AC 90-105A, Apéndice B, numeral B.4.4
**Explicación:** El uso de Baro-VNAV hasta una DA no está autorizado con ajuste altimétrico remoto: se requiere ajuste local actual del aeropuerto de aterrizaje. Donde se publican mínimos con altímetro remoto, la función VNAV puede usarse solo hasta la MDA de LNAV publicada.

**ev-21** · ¿Por qué el título de un procedimiento no basta para saber qué exige?
- A) Porque los títulos cambian con cada enmienda.
- B) Porque el título sigue la convención de la autoridad que publica, y lo exigido está en las notas y en el recuadro PBN.
- C) Porque el título solo indica la pista.
- D) Porque el título lo asigna el proveedor de la base de datos.
**Correcta:** B · **Tema:** P17 · **Referencia:** FAA AIM 1-2-1 y 1-2-3; FAA AIM 5-4-18
**Explicación:** En el marco de la FAA los RNP APCH se titulan RNAV (GPS) y los RNP AR, RNAV (RNP); internacionalmente los RNP AR pueden aparecer como RNP RWY XX (AR). Lo que el procedimiento exige está en las notas y en el recuadro PBN.

**ev-22** · ¿Cuál es el efecto de una degradación de GNSS sobre el TAWS, según la autoridad?
- A) Ninguno: el TAWS es independiente del GNSS.
- B) Puede producir un disparo poco fiable del sistema de alerta de terreno.
- C) Inhibe el TAWS por completo.
- D) Aumenta la sensibilidad del TAWS.
**Correcta:** B · **Tema:** P38 · **Referencia:** FAA AIM 1-2-4, lista de efectos de interferencia y suplantación
**Explicación:** Entre los efectos posibles, la autoridad enumera el disparo poco fiable del TAWS. Es un buen recordatorio de que hay más sistemas colgados del GNSS de los que parece, y de que hay que evaluar qué sistemas de a bordo requieren entradas de GPS.

**ev-23** · ¿Qué hace que el error de definición de la trayectoria se considere despreciable?
- A) Que el FMS lo compensa.
- B) El proceso de integridad de la base de datos y los procedimientos de tripulación.
- C) Que es imposible de medir en vuelo.
- D) Que solo existe en procedimientos convencionales.
**Correcta:** B · **Tema:** P28 · **Referencia:** FAA AC 90-105A, nota al numeral 4.2
**Explicación:** Se asume cero por el proceso de integridad de la base de datos y los procedimientos de tripulación. No es un regalo: es un supuesto que se sostiene sobre esas dos cosas, y si alguna se relaja, deja de valer.

**ev-24** · ¿Qué diferencia práctica introduce que una SID exija RNP 1 en vez de RNAV 1?
- A) Que la trayectoria es más estrecha.
- B) Que el avión vigila su propia performance y puede alertar, por lo que existe un aviso posible que en RNAV 1 no existiría.
- C) Que hay que volar con piloto automático acoplado.
- D) Que se exige aumentación satelital.
**Correcta:** B · **Tema:** P14 · **Referencia:** RAC 91, definiciones de especificaciones RNP y RNAV; FAA AIM 1-2-1
**Explicación:** El valor de precisión lateral es el mismo. Lo que añade RNP 1 es el control y alerta de la performance, así que en ese procedimiento hay una indicación posible que en una SID RNAV 1 no habría. Dónde se presenta está en el FCOM de la flota.

**ev-25** · Un ítem de MEL deja el avión con un solo sistema donde la operación prevista exige redundancia. ¿Qué capacidad se pierde?
- A) Ninguna, mientras el sistema que queda funcione.
- B) La de la operación que exigía continuidad, por ejemplo una frustrada RNP AR con valor menor de 1.00 NM.
- C) Solo la capacidad de aproximación.
- D) Toda la capacidad PBN.
**Correcta:** B · **Tema:** P46 · **Referencia:** FAA AIM 5-4-18, apartado de frustradas con valor menor de 1.00 NM; FAA AC 90-101A, Apéndice, numeral 2, apartado c
**Explicación:** La redundancia responde a continuidad. Cuando la operación típicamente requiere equipo redundante, quitarlo quita la operación aunque el sistema restante funcione perfectamente. No se pierde «toda» la capacidad PBN: se pierde la que exigía esa continuidad.

**ev-26** · ¿Qué se declara con la letra R en la casilla 10 y qué queda en la casilla 18?
- A) R declara RVSM y la casilla 18 el detalle de navegación.
- B) R declara PBN aprobado y la casilla 18 lleva el indicador `PBN/` con los descriptores.
- C) R declara RNAV y la casilla 18 declara RNP.
- D) R declara capacidad de enlace de datos y la casilla 18 la de navegación.
**Correcta:** B · **Tema:** P45 · **Referencia:** OACI PANS-ATM, Apéndice 2, casilla 10 código R y casilla 18 indicador `PBN/`
**Explicación:** La R de la casilla 10 significa PBN aprobado y remite a la casilla 18, donde el indicador `PBN/` lleva los descriptores concretos, hasta 8 entradas y 16 caracteres. RVSM se declara con la W, que es otra letra.

**ev-27** · ¿Qué debe ocurrir 2 NM antes del FAF en una RNP APCH?
- A) Estar configurado para el aterrizaje.
- B) Haber confirmado que el sistema inició la transición de modo terminal a modo aproximación.
- C) Haber recibido la autorización de aproximación.
- D) Haber seleccionado la línea de mínimos en el FMS.
**Correcta:** B · **Tema:** P17 · **Referencia:** FAA AC 90-105A, Apéndice A, numeral A.7.2.1
**Explicación:** La circular fija ese punto: los pilotos deben confirmar que el sistema ha iniciado la transición de modo terminal a modo aproximación 2 NM antes del punto de aproximación final. Confirmarlo después deja sin margen para reaccionar.

**ev-28** · ¿Qué ocurre con una SID cuando el ATC vectorea al avión fuera de ella, en el marco descrito?
- A) La SID sigue vigente con sus restricciones.
- B) La SID se considera cancelada, salvo que el controlador añada que se espere reanudarla, y sus restricciones publicadas quedan canceladas.
- C) Solo se cancelan las restricciones de velocidad.
- D) La SID se cancela y se asume el gradiente mínimo publicado.
**Correcta:** B · **Tema:** P42 · **Referencia:** FAA AIM 5-2-9, apartado de vectores después de establecido en una SID
**Explicación:** Una vez establecido en la SID, si se vectorea al avión o se lo autoriza a desviarse, la SID se considera cancelada salvo que el controlador añada que se espere reanudarla, y las restricciones de altitud y velocidad quedan canceladas: el piloto recibirá una altitud que mantener y, si hace falta, una velocidad.

**ev-29** · ¿Cuál es la relación entre EPU, ANP y EPE?
- A) Son tres magnitudes distintas que se comparan entre sí.
- B) Son el mismo concepto con nombres distintos según el avión.
- C) EPU es el requisito y ANP la estimación.
- D) EPE es el error real y las otras dos son estimaciones.
**Correcta:** B · **Tema:** P31 · **Referencia:** FAA AC 90-105A, Apéndice J, definición de EPU; FAA AC 90-101A, numeral 3, apartado b
**Explicación:** La definición lo dice: la medida que expresa la performance de estimación de posición actual se conoce también como ANP o EPE en ciertas aeronaves. Ninguna de las tres es el error real: son una indicación estadística definida del error potencial.

**ev-30** · ¿Cuándo hay que avisar al ATC de que una funcionalidad de navegación no está disponible?
- A) Solo si el ATC pregunta.
- B) Cuando el ATC solicita una funcionalidad, por ejemplo un desplazamiento lateral, que el sistema no tiene.
- C) Al aterrizar, en el reporte.
- D) Nunca: es información interna del operador.
**Correcta:** B · **Tema:** P44 · **Referencia:** FAA AC 90-105A, numeral 8.4.3, apartado 20
**Explicación:** Entre los conocimientos requeridos está saber cómo se aplican los desplazamientos, cuál es la funcionalidad del sistema propio y la necesidad de avisar al ATC si esa funcionalidad no está disponible. Improvisar el desplazamiento a rumbo no es lo que el controlador está separando.

**ev-31** · ¿Qué distingue una interrupción planificada de GNSS de una interferencia?
- A) La duración.
- B) Que la interrupción planificada se publica y se puede planificar volar a través de ella con radioayudas convencionales según autorice el ATC.
- C) Que la interferencia no afecta a la navegación.
- D) Que la interrupción solo ocurre en espacio oceánico.
**Correcta:** B · **Tema:** P40 · **Referencia:** FAA AIM 1-1-17, apartado de interrupciones planificadas de GPS; FAA AIM 1-2-4
**Explicación:** Ante una interrupción planificada, por ejemplo publicada por NOTAM, se puede planificar volar a través de ella usando la red de radioayudas convencionales según corresponda y según lo autorice el ATC. La interferencia, en cambio, se detecta en vuelo y obliga a contrastar.

**ev-32** · Vuelas una ruta con especificación RNP 2 y el sistema alerta de que no puede satisfacer la performance requerida. ¿Qué obligación de comunicación tienes?
- A) Ninguna hasta llegar al límite de la FIR.
- B) Avisar al ATC del deterioro o falla del equipo de navegación, y de las desviaciones que exija un procedimiento de contingencia.
- C) Solicitar descenso inmediato.
- D) Informar solo si se abandona la ruta.
**Correcta:** B · **Tema:** P15 · **Referencia:** FAA AC 90-105A, apéndices de RNP 2 y RNP 4
**Explicación:** Los apéndices correspondientes exigen que las tripulaciones avisen al ATC de cualquier deterioro o falla del equipo de navegación y de las desviaciones requeridas por un procedimiento de contingencia. No hace falta abandonar la ruta para que exista la obligación.

**ev-33** · ¿Qué dice la norma sobre introducir a mano un procedimiento que no está en la base de datos?
- A) Se permite si se verifican las coordenadas con la carta.
- B) No es una solución aceptable: el procedimiento se carga desde la base, y si hay una carta enmendada no incluida, la base no se usa para esa operación.
- C) Se permite en salidas pero no en aproximaciones.
- D) Se permite con autorización del ATC.
**Correcta:** B · **Tema:** P33 · **Referencia:** FAA AC 90-105A, nota al numeral 10.4; FAA AIM 1-2-1
**Explicación:** El procedimiento se recupera de la base de datos y se verifica contra la carta. Si se publicó una enmienda que no está en la base, la base no debe usarse para conducir esa operación, y teclear la diferencia a mano no resuelve el problema.

**ev-34** · ¿Qué tres capas hay que recorrer para saber si se puede volar un procedimiento PBN?
- A) Carta, FMS y autorización del ATC.
- B) Elegibilidad de la aeronave, autorización del operador y estado de hoy según MEL e infraestructura.
- C) Precisión, integridad y continuidad.
- D) Plan de vuelo, base de datos y briefing.
**Correcta:** B · **Tema:** P11 · **Referencia:** RAC 91, numeral 91.1015; RAC 121, numeral 121.995; FAA AC 90-105A, Apéndice A, numeral A.7.1.7
**Explicación:** Son tres preguntas distintas que se contestan en documentos distintos, y cada capa puede negar lo que la anterior concedió. El triángulo carta-FMS-autorización es otra cosa: es la verificación de lo que se va a volar.

**ev-35** · ¿Qué significa que un valor RNP aparezca en una carta como 0.15?
- A) Que es el nombre de la especificación RNP 0.3.
- B) Que es un valor de 0.30 o menor, propio de una operación con autorización requerida, y los valores en carta de 0.30 o menos se escriben con dos decimales.
- C) Que la aproximación admite cualquier aeronave RNP APCH.
- D) Que el valor es aproximado.
**Correcta:** B · **Tema:** P52 · **Referencia:** FAA AIM 1-2-1, nota sobre valores RNP en carta; FAA AIM 5-4-18
**Explicación:** La nota del AIM pide no confundir un valor en carta de 0.30 o inferior con el nombre de la especificación «RNP 0.3»: los valores en carta de 0.30 o menores llevan dos decimales. Y las RNP AR tienen valores de 0.30 o menores, cada línea de mínimos con el suyo.

**ev-36** · ¿Qué obligación tiene el operador cuando se detecta un error de base de datos que invalida un procedimiento?
- A) Corregirlo en la base de datos de cada avión.
- B) Reportarlo al proveedor y prohibir el uso del procedimiento afectado mediante un aviso a sus tripulaciones, hasta restablecerlo.
- C) Informar al ATC en cada vuelo.
- D) Suspender todas las operaciones PBN.
**Correcta:** B · **Tema:** P33 · **Referencia:** FAA AC 90-105A, numeral 10.7, apartado 5
**Explicación:** Las discrepancias que invalidan un procedimiento deben reportarse al proveedor de la base de datos, y el uso de los procedimientos afectados debe prohibirse mediante un aviso del operador a su tripulación. El procedimiento vuelve a estar disponible solo cuando el operador lo restablece.

**ev-37** · ¿Cuál es la consecuencia de que el control y alerta a bordo permita depender menos de la intervención del ATC?
- A) Que el piloto puede desviarse sin autorización.
- B) Que se puede reducir la dependencia de la separación procedimental para conseguir la seguridad de la operación.
- C) Que el ATC deja de vigilar la trayectoria.
- D) Que no hace falta colacionar las autorizaciones.
**Correcta:** B · **Tema:** P07 · **Referencia:** FAA AIM 1-2-1, apartado general de RNP
**Explicación:** Si el avión sabe cuándo deja de cumplir y lo dice, se reduce la dependencia de que lo detecte el controlador y del margen procedimental. Eso es lo que permite diseñar trayectorias más ajustadas, y no cambia nada de las obligaciones del piloto.

**ev-38** · ¿Qué hay que confirmar antes de iniciar una aproximación RNP AR con velocidades de aproximación no estándar?
- A) Que el ATC acepta la velocidad.
- B) Que se pueden cumplir esos requisitos, que la carta refleja.
- C) Que la temperatura está dentro de límites.
- D) Que el avión tiene capacidad de tramo RF.
**Correcta:** B · **Tema:** P22 · **Referencia:** FAA AIM 5-4-18, apartado de velocidades y gradientes no estándar
**Explicación:** Las RNP AR pueden requerir velocidades de aproximación o gradientes de ascenso en frustrada no estándar, la carta los refleja y los pilotos deben confirmar que pueden cumplirlos antes de comenzar la aproximación.

**ev-39** · ¿Por qué el mapa móvil no sirve para validar una posición GNSS sospechosa?
- A) Porque su escala es demasiado grande.
- B) Porque se construye con la misma posición que se está poniendo en duda.
- C) Porque no muestra radioayudas.
- D) Porque se actualiza con retardo.
**Correcta:** B · **Tema:** P41 · **Referencia:** FAA AIM 1-2-4, recomendaciones durante el vuelo
**Explicación:** Hay que contrastar con una fuente independiente. La propia autoridad recomienda comprobaciones rutinarias de posición contra información de VOR o DME, y lista la posición inexacta en la presentación de navegación, incluidos mapa móvil y tableta electrónica, entre los efectos posibles.

**ev-40** · ¿Qué añade la exigencia de «actual y apropiada» a los datos de navegación de a bordo?
- A) Que basta con que la fecha esté vigente.
- B) Que además de vigentes deben ser apropiados para la región de la operación e incluir radioayudas, puntos y procedimientos codificados de salida, llegada y alternos.
- C) Que deben cargarse el mismo día del vuelo.
- D) Que deben venir de dos proveedores distintos.
**Correcta:** B · **Tema:** P33 · **Referencia:** FAA AC 90-105A, numeral 10.2
**Explicación:** La norma exige que los datos sean actuales y apropiados para la región de la operación prevista y que incluyan radioayudas, puntos y los procedimientos codificados de terminal pertinentes para la salida, la llegada y los aeródromos de alternativa.

**ev-41** · Pierdes una fuente de posición y el sistema revierte a otra que no está entre las admitidas por la especificación del segmento. ¿Qué ocurre?
- A) Nada, si el avión sigue navegando con precisión.
- B) La capacidad se perdió, porque la reversión a una fuente no admitida cuenta como pérdida de capacidad.
- C) Se mantiene la capacidad hasta que el sistema alerte.
- D) Se pierde solo la capacidad vertical.
**Correcta:** B · **Tema:** P49 · **Referencia:** FAA AC 90-100A, numeral 10, apartado d
**Explicación:** La circular incluye entre las fallas que cuentan la reversión a una navegación distinta de las admitidas, aunque no se exija al piloto vigilar la fuente de actualización. La precisión de la navegación resultante no es el criterio: el criterio es la especificación.

**ev-42** · ¿Cuál es la lectura correcta de la expresión «espacio aéreo designado» en la definición de PBN?
- A) Que PBN solo aplica por encima de una altitud determinada.
- B) Que PBN aplica donde la autoridad prescribe una especificación, además de rutas ATS y procedimientos de aproximación.
- C) Que PBN aplica solo en espacio aéreo controlado.
- D) Que PBN aplica únicamente en espacio oceánico.
**Correcta:** B · **Tema:** P01 · **Referencia:** RAC 91, definición de navegación basada en la performance (PBN)
**Explicación:** La definición enumera la ruta ATS, el procedimiento de aproximación por instrumentos y el espacio aéreo designado. La designación no depende de la altitud ni de la clase de espacio aéreo: depende de que la autoridad prescriba una especificación.

**ev-43** · ¿Qué tres pasos del flujo de pérdida de capacidad van antes de informar al ATC?
- A) Informar al despacho, consultar la MEL y recalcular el combustible.
- B) Controlar el avión, identificar la falla y contrastar la posición, con la aplicación de QRH y SOP y la determinación de la capacidad restante.
- C) Declarar emergencia, descender y solicitar vectores.
- D) Cambiar de línea de mínimos, frustrar y coordinar el alterno.
**Correcta:** B · **Tema:** P49 · **Referencia:** FAA AC 90-105A, Apéndice A, numeral A.7.1.8; numeral 8.4.3, apartado 23
**Explicación:** Aviar, navegar, comunicar. Primero se vuela el avión, se identifica y se contrasta, se aplican QRH y SOP, se determina qué capacidad queda y se concluye si todavía se cumple lo exigido; el aviso al ATC llega con la propuesta.

**ev-44** · ¿Qué es lo que hace que una aproximación no esté autorizada por razones de ajuste altimétrico?
- A) Que el ajuste sea de una fuente no local.
- B) Que el ajuste en el que se basa la aproximación no esté disponible.
- C) Que el ajuste se ponga después de la altitud de transición.
- D) Que el ajuste difiera del de la ATIS.
**Correcta:** B · **Tema:** P21 · **Referencia:** FAA AIM 5-4-5, apartado de fuentes de ajuste altimétrico
**Explicación:** Cuando el ajuste altimétrico en el que se basa la aproximación no está disponible, la aproximación no está autorizada. Que la fuente sea no local es otra cosa: si la carta la publica, se puede usar, con mínimos posiblemente más altos y sin Baro-VNAV hasta la DA.

**ev-45** · ¿Qué papel cumple la carta en el triángulo de verificación?
- A) Es la autorización.
- B) Es la referencia contra la que se compara lo que el FMS va a volar y lo que el ATC autorizó.
- C) Es un respaldo en caso de falla del FMS.
- D) Es el documento que fija la elegibilidad del avión.
**Correcta:** B · **Tema:** P36 · **Referencia:** FAA AIM 1-2-1; FAA AC 90-105A, numeral 8.4.4
**Explicación:** La autorización la da el ATC, la elegibilidad está en el AFM, y la carta es la referencia de verificación: dice cómo es el procedimiento y qué exige. El FMS no valida nada: muestra lo que pudo construir con los datos que tenía.

**ev-46** · ¿Qué se pierde cuando un procedimiento exige una funcionalidad que el avión no tiene listada, aunque sea elegible para la especificación?
- A) Nada: la elegibilidad de la especificación es suficiente.
- B) La posibilidad de volar ese procedimiento, porque la funcionalidad es un requisito aparte.
- C) Solo la guía vertical.
- D) La capacidad de declarar la especificación en el plan de vuelo.
**Correcta:** B · **Tema:** P05 · **Referencia:** FAA AIM 1-2-1, apartados RNP APCH, RNP 1 y A-RNP
**Explicación:** La funcionalidad, como el tramo RF o el escalado, se documenta aparte de la elegibilidad de la especificación. Un avión elegible para RNP APCH puede no poder volar un procedimiento con tramo RF, y por eso hay que buscarla listada como característica del equipo.

**ev-47** · ¿Cómo se comparan dos ítems de MEL abiertos que afectan a la navegación?
- A) Sumando las restricciones.
- B) Tomando la más restrictiva.
- C) Revisando si la lista prohíbe la combinación o cambia el efecto, porque las restricciones no son aditivas.
- D) Consultando al ATC.
**Correcta:** C · **Tema:** P46 · **Referencia:** RAC 121, numeral 121.995, apartado (b)(1)(iii); práctica estándar de listas de equipo mínimo
**Explicación:** La lista puede prohibir expresamente una combinación que admite por separado, y el efecto conjunto sobre la capacidad PBN puede no coincidir con el de ninguno de los dos aislados. La respuesta está en la MEL, no en la aritmética.

**ev-48** · ¿Qué se verifica en una SID PBN que un solo piloto no debería verificar solo?
- A) La frecuencia de salida.
- B) La programación del procedimiento: el que carga no verifica, porque entonces no hay verificación.
- C) El gradiente de ascenso.
- D) El ajuste altimétrico.
**Correcta:** B · **Tema:** P47 · **Referencia:** RAC 121, numeral 121.995, apartado (b)(2); FAA AC 90-105A, capítulo 8
**Explicación:** La verificación vale porque la hace otro par de ojos. El reparto concreto es del SOP del operador, que la norma le exige documentar junto con los requisitos de calificación y competencia de la tripulación.

**ev-49** · ¿Por qué la frustrada de una aproximación PBN puede exigir tener sintonizada una radioayuda convencional?
- A) Porque el GNSS se inhibe en la frustrada.
- B) Porque el segmento de frustrada puede basarse en una radioayuda convencional, como VOR, DME o NDB.
- C) Porque el ATC lo exige por radio.
- D) Porque la frustrada se vuela siempre con navegación convencional.
**Correcta:** B · **Tema:** P29 · **Referencia:** FAA AC 90-105A, Apéndice A, numeral A.5.1
**Explicación:** En RNP APCH el segmento de frustrada puede basarse en una radioayuda convencional. Lo dice la carta del procedimiento, y de ahí sale la necesidad de sintonizarla y verificarla antes, no durante la frustrada.

**ev-50** · En una entrevista te piden explicar cómo sabrías si puedes volar una SID RNP 1 que el ATC acaba de autorizar. ¿Cuál es el razonamiento completo?
- A) Comprobar que el procedimiento está en la base de datos y cargarlo.
- B) Identificar la especificación exigida, confirmar la elegibilidad del avión y las funciones que el procedimiento pida, comprobar la autorización del operador, revisar la MEL y la vigencia de la base, cargar y verificar contra la carta, y vigilar la performance durante el procedimiento.
- C) Confirmar que el GNSS está operativo y que el piloto automático funciona.
- D) Preguntar al ATC si el procedimiento requiere RNP 1 o RNAV 1.
**Correcta:** B · **Tema:** P11 · **Referencia:** RAC 91, numeral 91.1015; RAC 121, numeral 121.995; FAA AC 90-105A, numeral 8.4.4 y Apéndice A, numeral A.7.1.7
**Explicación:** El razonamiento recorre las tres capas (aeronave elegible, operador autorizado, estado de hoy), añade las funciones que el procedimiento exija, pasa por la verificación contra la carta y termina en la vigilancia. Que el procedimiento esté en la base de datos no contesta ninguna de esas preguntas.

---

# ANEXO A · HUECOS DE IMAGEN

Veintiocho huecos. Cada uno lleva en el documento su descripción completa y su objetivo. Medida de figura: 16:9, 1600 × 900.

| # | Capítulo | Qué imagen hace falta |
|---|---|---|
| 1 | P01 | Navegación convencional frente a PBN sobre el mismo terreno |
| 2 | P02 | La evolución en tres mapas: convencional, navegación de área, PBN con la especificación sobre cada segmento |
| 3 | P03 | Los tres engranajes del concepto PBN |
| 4 | P04 | PBN en el centro, las fuentes alrededor y el TAWS fuera del diagrama |
| 5 | P07 | RNAV frente a RNP en dos columnas, con el aviso resaltado |
| 6 | P09 | Qué representa el número: eje, franja acotada y la nota de que no es permiso de desviación |
| 7 | P10 | Tabla gráfica de especificaciones por fase, con el estrechamiento de la franja en la final |
| 8 | P13 | **Anotada.** Carta de SID PBN con el recuadro PBN y el de equipo |
| 9 | P17 | **Anotada.** Carta de aproximación PBN completa, con el orden de lectura |
| 10 | P18 | **Anotada.** Caja de mínimos con cuatro renglones |
| 11 | P20 | Perfil vertical con el efecto conceptual del aire frío, sin cifras |
| 12 | P22 | RNP APCH frente a RNP AR sobre el mismo relieve, con el área sin zona secundaria |
| 13 | P24 | El tramo RF: arco, centro, radio y el giro que no es un RF |
| 14 | P25 | Fly-by y fly-over en dos paneles |
| 15 | P27 | La desviación lateral, con la vista en planta unida a la presentación de cabina |
| 16 | P28 | Convergencia de PDE, NSE y FTE en el TSE, con el reparto de vigilancia |
| 17 | P31 | **Anotada.** Página de FMS genérica con RNP y ANP, y la zona de mensajes |
| 18 | P32 | Dos escenarios de control y alerta, con la secuencia de actuación al pie |
| 19 | P34 | **Anotada.** Estado de la base de datos con las fechas de validez |
| 20 | P35 | **Anotada.** Página de plan de vuelo del FMS con una SID cargada |
| 21 | P36 | El triángulo de autorización, carta y FMS, con el error típico de cada par |
| 22 | P41 | Presentación de navegación con la discrepancia de posición y la pregunta al pie |
| 23 | P44 | Diagrama de flujo de una autorización que modifica un procedimiento PBN |
| 24 | P45 | **Anotada.** Fragmento de plan de vuelo OACI con la casilla 10 y la 18 |
| 25 | P46 | **Anotada.** Entrada de MEL genérica con la columna de observaciones |
| 26 | P48 | Los cuatro bloques: seleccionar, verificar, ejecutar, vigilar |
| 27 | P49 | Diagrama de flujo de pérdida de capacidad, con la bifurcación destacada |
| 28 | P52 | **Anotada.** Carta PBN completa con doce llamadas |

**Regla de las recreaciones:** las imágenes de FMS, ND, cartas, MEL y plan de vuelo son **recreaciones educativas genéricas** hechas para Aviatory. No se copian interfaces propietarias ni se reproducen cartas con derechos sin autorización.

---

# ANEXO B · FUENTES

| Fuente | Edición leída | Qué aporta |
|---|---|---|
| RAC 91 | Enmienda 12, julio de 2026 | Numeral 91.1015 y las definiciones del concepto en español |
| RAC 121 | Agosto de 2025 | Numeral 121.995: autorización del explotador, MEL y datos de navegación |
| RAC 211 | Enmienda 6, noviembre de 2025 | Definiciones y designación de especificaciones en el ATS |
| RAC 119 | Enmienda 4 | PBN como aprobación específica en las especificaciones de operación |
| FAA AC 90-105A | 7 de marzo de 2016 | Tabla 5-1, componentes del error, Baro-VNAV, base de datos, contingencias y conocimientos del piloto |
| FAA AC 90-100A | Vigente al 25-sep-2026 | RNAV 1 y RNAV 2, verificación de posición en salida y la comunicación de pérdida de capacidad |
| FAA AC 90-101A, cambio 1 | 9 de febrero de 2016 | RNP AR: definiciones, valores, tramos RF y frustradas exigentes |
| FAA AIM | Secciones 1-1, 1-2, 5-1, 5-2 y 5-4, consultadas el 25-sep-2026 | Catálogo de especificaciones, recuadro PBN, waypoints, líneas de mínimos, RNP AR y la guía de interferencia y suplantación de GPS |
| OACI PANS-ATM (Doc 4444), Apéndice 2 | Reproducido en el AIP de Nueva Zelanda, ENR 1.10 | Casilla 10 código R y la tabla completa de códigos `PBN/` |

---

# ANEXO C · NOTAS DE VERIFICACIÓN (no van a la app)

Lo que quedó marcado como **verificar** dentro del módulo, con lo que hay que hacer para cerrarlo:

1. **Circular GCEP-1.0-22-032 de la Aerocivil** (capítulos P01 y P51). «Procedimiento para la aprobación de operaciones RNAV/RNP bajo el concepto PBN». Al 25 de septiembre de 2026 las tres rutas conocidas del servidor de documentos devuelven error 404, incluida la de la biblioteca técnica que aparece en buscadores. Hay que pedirla a la Aerocivil o esperar a que vuelva a publicarse. **Ninguna afirmación del módulo depende de ella**: lo que habría salido de ahí se sustituyó por RAC 91 numeral 91.1015 y RAC 121 numeral 121.995, que son norma y no guía.

2. **Fraseología OACI literal** (capítulo P50). El Doc 4444 no es de acceso público y no se pudo cargar. El módulo publica el ejemplo literal de la circular de la FAA y deja dicho que la fraseología aplicable se lee en el AIP del Estado. **No se inventó ninguna formulación OACI.**

3. **Convención de títulos de procedimientos PBN en Colombia** (capítulos P17 y P51). El módulo documenta la convención de la FAA (RNAV (GPS) y RNAV (RNP)) y la internacional que menciona el AIM para RNP AR (RNP RWY XX (AR)), y pide leer la carta del AIP Colombia. Falta comprobar contra cartas colombianas concretas y, si conviene, añadir un ejemplo real con la autorización correspondiente.

4. **Ediciones de los documentos OACI** (ficha y Anexo B). El módulo no afirma número de edición de los Doc 9613, 8168, 4444 ni 9997, porque no se pudieron cargar. Cuando se verifique la edición vigente, conviene anotarla en la ficha.

5. **Ejemplos colombianos de procedimientos** (capítulo P51). El módulo no nombra ninguna SID, STAR ni aproximación colombiana concreta, para no citar un procedimiento que pueda estar desactualizado. Cuando se revise el AIP Colombia vigente, añadir uno o dos ejemplos públicos con su fecha de consulta.

6. **RNP 0.3** (capítulo P10). Se menciona como contexto y se dice que en el marco de la FAA se aplica inicialmente a operaciones de helicóptero. Si alguna vez se extiende a aviones lentos de ala fija, el capítulo hay que revisarlo.

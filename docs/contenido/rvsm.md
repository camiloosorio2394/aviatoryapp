# AVIATORY · INGRESO A AEROLÍNEA → RVSM

## Contenido completo del módulo (fuente para implementación)

**Versión:** 1.0 · 25 de septiembre de 2026 · borrador para revisión técnica
**Nivel:** avanzado. Piloto comercial o de aerolínea que prepara selección, entrevista técnica y entrenamiento inicial.
**Enfoque:** qué es, qué equipo exige, qué verifica la tripulación, qué se monitoriza, qué se hace cuando falla y qué se le dice al ATC. No es un módulo de aviónica ni de mantenimiento.
**Idioma:** español. Los términos en inglés se conservan porque así aparecen en la fraseología, en el QRH y en la MEL.

---

## 0. FICHA DEL MÓDULO

| Campo | Valor |
|---|---|
| Ruta en la app | Ingreso a aerolínea → RVSM |
| Clave de módulo sugerida | `rvsm` |
| Capítulos | 32 (R01 a R32), con diez escenarios en el capítulo 32 |
| Imágenes | 20 huecos `[ESPACIO PARA IMAGEN]`, listados en el Anexo A |
| Quiz por capítulo | 3 preguntas al final de cada capítulo (96 en total, `r01-q1` a `r32-q3`), corrección inmediata |
| Quiz final | Banco de 40 preguntas (`ev-01` a `ev-40`) en `contenido/bancos/rvsm_evaluacion.json`, 20 al azar por intento, aprobación 80 %, corrección al final |
| Tiempo estimado | 5 a 9 min por capítulo, unas 3 h en total |

### El marco normativo que usa este módulo

Las cifras y la fraseología de este módulo salen de documentos públicos y verificables. Cuando dos autoridades difieren, se dice cuál es cuál; nunca se presenta un procedimiento regional como si fuera universal.

| Fuente | Qué aporta aquí |
|---|---|
| FAA AC 91-85B (29 de enero de 2019) | Equipo requerido, chequeos altimétricos con sus cifras, fraseología piloto-controlador, tabla de contingencias, definiciones de ASE, AAD y TVE |
| RAC 211 (Colombia) | RVSM entre FL 290 y FL 410 con 1.000 ft, y el monitoreo regional de CARSAMMA |
| RAC 91 (Colombia) | Techo del VFR y prohibición de VFR sobre FL 290 en espacio RVSM |
| RAC 119 (Colombia) | RVSM como aprobación específica dentro de las especificaciones de operación |
| OACI Doc 9574 | El manual del mínimo de separación vertical de 300 m (1.000 ft) entre FL 290 y FL 410, que es la base de todo lo demás |

**Lo que este módulo no usa:** EASA, por decisión editorial. Cuando un procedimiento dependa del avión o del operador, se dice, y la referencia es el AFM, el FCOM, el QRH y el manual de operaciones.

### Cómo leer las cifras

Cada cifra de este módulo viene con su fuente al lado. Hay tres clases y conviene distinguirlas desde el principio, porque en una entrevista se nota quién lo tiene claro:

- **Cifras de la norma.** Valen siempre, salvo que el Estado publique otra cosa. Ejemplo: 1.000 ft de separación vertical entre FL 290 y FL 410.
- **Cifras del procedimiento operacional.** Vienen de la autoridad y valen en su espacio aéreo. Ejemplo: los 75 ft del chequeo altimétrico antes del despegue, que trae la FAA.
- **Cifras del avión.** Las fija el AFM o el FCOM y cambian de flota en flota. Cuando una cifra es de esta clase, el módulo lo dice y no inventa un número.

### Formato de las preguntas

```
**id** · Enunciado
- A) …
- B) …
- C) …
- D) …
**Correcta:** X · **Tema:** Rnn · **Referencia:** …
**Explicación:** …
```

---

# BLOQUE 1 · QUÉ ES Y DÓNDE SE APLICA

---

## 1. QUÉ ES RVSM

**ID:** R01 · **Tiempo:** 6 min

### ¿Qué es?

Reduced Vertical Separation Minimum: la separación vertical mínima reducida. Es el espacio aéreo designado donde a las aeronaves debidamente aprobadas se las separa **1.000 ft** en vertical, en vez de los 2.000 ft que se aplicaban antes en niveles superiores.

La FAA lo define como «espacio aéreo de calificación especial» (*special qualification airspace*). Esa etiqueta es la idea central del módulo: no es un espacio aéreo al que se entra por estar volando alto, sino uno al que se entra por cumplir requisitos.

### Lo que debe saber el piloto

Reducir la separación de 2.000 a 1.000 ft no se consigue volando con más cuidado. Se consigue porque el sistema entero (avión, operador, tripulación y vigilancia) garantiza que el error vertical se mantiene dentro de márgenes muy estrechos. Sobre esas cuatro patas se sostiene:

#### Precisión altimétrica

La altitud que el piloto ve y la que el avión transmite tienen que parecerse mucho a la altitud real. El error del sistema altimétrico (ASE) es una de las magnitudes que se vigilan en todo el programa, y tiene su propio capítulo más adelante.

#### Mantenimiento del nivel (*height keeping*)

No basta con medir bien: hay que quedarse en el nivel. Por eso RVSM exige un sistema automático de mantenimiento de altitud operativo y **acoplado** en crucero nivelado, y no solo «disponible».

#### Equipamiento y aprobación

El avión debe cumplir unos requisitos de equipo, y el operador debe estar autorizado. Una cosa no implica la otra.

#### Procedimientos, entrenamiento y monitorización

La tripulación tiene procedimientos propios (chequeos altimétricos, fraseología, contingencias) y la performance altimétrica de las flotas se monitoriza de forma continua.

### En operación de aerolínea

En una operación normal, RVSM es invisible: se despega, se sube, se nivela en FL 350 y nadie lo menciona. Aparece en tres momentos: cuando un ítem de la MEL toca un sistema relacionado, cuando el ATC pregunta el estado RVSM, y cuando algo falla en crucero y hay que decir *unable RVSM*.

El resto del tiempo, RVSM es la razón por la que el nivel que se pidió estaba libre.

### ¿Qué verifica la tripulación?

En este capítulo, nada todavía: es el marco. Pero conviene fijar la idea con la que se leen los siguientes: la tripulación no verifica que el avión «pueda» llegar al nivel, sino que **siga siendo capaz de cumplir RVSM**.

### Error frecuente

«RVSM significa volar más cerca.» Describe el resultado, no el concepto, y en una entrevista se nota. RVSM es el conjunto de requisitos que hace que volar más cerca sea seguro.

Y el error de siglas, que se oye más de lo que parece: no es *Reduced Vertical Separation Mode*. Es *Minimum*.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Perfil vertical partido en dos mitades, con la misma escala de altura a la izquierda. Mitad izquierda, rotulada «ANTES · 2.000 ft»: solo cuatro niveles utilizables entre FL 290 y FL 350, marcados FL 290, FL 310, FL 330 y FL 350, con la separación de 2.000 ft acotada entre dos de ellos. Mitad derecha, rotulada «RVSM · 1.000 ft»: siete niveles entre los mismos extremos, FL 290, FL 300, FL 310, FL 320, FL 330, FL 340 y FL 350, con la separación de 1.000 ft acotada. Una silueta de avión en cada nivel para que la densidad se vea de un golpe.

OBJETIVO:
Que el piloto entienda de un vistazo que RVSM no acerca los aviones por acercarlos: casi duplica los niveles utilizables en la misma franja de altura.

### En pocas palabras

- RVSM es separación vertical de 1.000 ft entre aeronaves aprobadas, en espacio aéreo designado.
- La FAA lo llama espacio aéreo de calificación especial: se entra por cumplir requisitos, no por altura.
- Se apoya en precisión altimétrica, mantenimiento del nivel, equipo, aprobación, procedimientos y monitorización.
- No es *Mode*: es *Minimum*.

### Quiz · Capítulo 1

**r01-q1** · En una entrevista te preguntan qué significa RVSM y por qué existe. ¿Cuál respuesta es la correcta y completa?
- A) Reduced Vertical Separation Mode: un modo del piloto automático que mantiene el nivel con más precisión.
- B) Reduced Vertical Separation Minimum: separación vertical de 1.000 ft entre aeronaves aprobadas, en espacio aéreo designado.
- C) Reduced Vertical Separation Minimum: la autorización que da el ATC para volar entre dos aeronaves con menos margen.
- D) Reduced Visual Separation Minimum: la separación que se aplica cuando hay contacto visual con el tráfico adyacente.
**Correcta:** B · **Tema:** R01 · **Referencia:** FAA AC 91-85B, Apéndice A, definición 15
**Explicación:** RVSM es *Reduced Vertical Separation Minimum* y designa un espacio aéreo, no un modo del avión ni una autorización puntual del ATC. La FAA lo define como espacio aéreo de calificación especial, normalmente entre FL 290 y FL 410, donde se aplican 1.000 ft de separación vertical.

**r01-q2** · Tu compañero dice que, como el avión es moderno y llega sin problema a FL 370, puede operar RVSM. ¿Qué le falta a ese razonamiento?
- A) Nada: si el avión alcanza el nivel con margen de performance, cumple los requisitos.
- B) Solo falta que el ATC lo autorice en el momento de pedir el nivel.
- C) Que RVSM exige equipo, aprobación, procedimientos y entrenamiento, no solo capacidad de subir.
- D) Que primero hay que comprobar que el TCAS esté operativo, que es lo que sustituye la separación.
**Correcta:** C · **Tema:** R01 · **Referencia:** FAA AC 91-85B, Apéndice A, definición 15; Apéndice B, numeral B.3.3
**Explicación:** Alcanzar el nivel es performance, no autorización. RVSM se sostiene sobre precisión altimétrica, mantenimiento del nivel, equipamiento, aprobación, procedimientos, entrenamiento y monitorización. El TCAS no sustituye ninguno de esos requisitos.

**r01-q3** · ¿Qué gana el sistema al pasar de 2.000 a 1.000 ft de separación vertical en la misma franja de niveles?
- A) Prácticamente el doble de niveles utilizables, y con ello más capacidad y perfiles más eficientes.
- B) Menos consumo, porque la separación reducida obliga a volar a velocidades menores.
- C) Que el ATC deja de necesitar separación horizontal entre aeronaves en esos niveles.
- D) Que desaparece la necesidad de vigilar la altitud, porque el sistema la garantiza.
**Correcta:** A · **Tema:** R01 · **Referencia:** FAA AC 91-85B, Apéndice A, definición 15
**Explicación:** La ganancia es de capacidad: en la misma franja caben casi el doble de niveles, lo que da más flexibilidad al ATC y deja a cada avión más cerca de su nivel óptimo. La separación horizontal y la vigilancia de la altitud siguen existiendo igual.

---

## 2. DÓNDE SE APLICA

**ID:** R02 · **Tiempo:** 5 min

### ¿Qué es?

El rango vertical donde se aplica RVSM. En la definición de la FAA y en el RAC colombiano coinciden: **desde FL 290 hasta FL 410, inclusive**. Por debajo de FL 290 y por encima de FL 410 rigen otros mínimos de separación.

### Lo que debe saber el piloto

«FL 290 a FL 410 inclusive» es la respuesta de entrevista, y es correcta. Pero la respuesta completa lleva una segunda frase: **los detalles los publica cada Estado**.

Lo que puede cambiar de una región a otra:

- La asignación de niveles por dirección de vuelo, que no es universal.
- Los procedimientos para aeronaves sin capacidad RVSM.
- Los requisitos de transpondedor y de TCAS. La propia FAA advierte que el operador o el piloto deben averiguar qué exige cada área RVSM donde vayan a operar.
- Las contingencias en espacio aéreo oceánico o remoto.

Dónde se mira: el AIP del Estado, los procedimientos suplementarios regionales y los NOTAM.

### En operación de aerolínea

En un vuelo doméstico colombiano esto casi nunca se piensa: se sube a FL 330 y ya. En un vuelo internacional, en cambio, el briefing de ruta incluye qué espacio se cruza y qué exige. Un avión aprobado en una región no lo está automáticamente en todas las áreas, y eso se revisa antes, no en el aire.

### ¿Qué verifica la tripulación?

- Que la ruta planificada cruza espacio RVSM y en qué tramos.
- Que el avión y el operador están autorizados para ese espacio.
- Qué exige esa región en cuanto a transpondedor y vigilancia.
- Los NOTAM que afecten al espacio RVSM del día.

### Comunicación ATC

Nada específico en este capítulo. El estado RVSM se comunica cuando el ATC lo pregunta o cuando la aeronave no es RVSM, y eso tiene su propio capítulo.

### Error frecuente

«FL 290 siempre es un nivel RVSM que puedo pedir.» FL 290 es el límite inferior del espacio, pero que un nivel exista no quiere decir que esté disponible para tu dirección de vuelo, tu ruta o tu autorización. Y en Colombia hay una consecuencia extra que conviene recordar: sin autorización no hay VFR sobre FL 200, y nunca sobre FL 290 en espacio RVSM (RAC 91, numerales 91.305 y 91.310).

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Perfil vertical de una sola columna con tres franjas de altura claramente diferenciadas por color. Franja inferior, gris: «POR DEBAJO DEL ESPACIO RVSM», con su borde superior rotulado FL 290. Franja central, destacada: «ESPACIO RVSM · separación 1.000 ft», con los bordes rotulados FL 290 abajo y FL 410 arriba. Franja superior, gris: «POR ENCIMA DEL ESPACIO RVSM», desde FL 410. A la derecha de la franja central, una nota: «Los detalles los publica cada Estado: AIP, procedimientos regionales y NOTAM».

OBJETIVO:
Fijar los dos límites verticales y, al mismo tiempo, dejar claro que dentro de esos límites las condiciones las pone cada región.

### En pocas palabras

- RVSM se aplica entre FL 290 y FL 410, inclusive.
- Los límites son comunes; los detalles los publica cada Estado.
- El AIP, los procedimientos regionales y los NOTAM son la fuente.
- En Colombia, sin autorización no hay VFR sobre FL 200 y nunca sobre FL 290 en RVSM.

### Quiz · Capítulo 2

**r02-q1** · ¿Entre qué niveles se aplica normalmente RVSM, tanto en la definición de la FAA como en el RAC colombiano?
- A) Entre FL 250 y FL 450, inclusive.
- B) Entre FL 290 y FL 410, inclusive.
- C) Desde FL 290 hacia arriba, sin límite superior definido.
- D) Entre FL 200 y FL 290, que es donde se concentra el tráfico de aerolínea.
**Correcta:** B · **Tema:** R02 · **Referencia:** FAA AC 91-85B, Apéndice A, definición 15; RAC 211, numeral 211.530
**Explicación:** Las dos fuentes coinciden: de FL 290 a FL 410, ambos inclusive. Por encima de FL 410 y por debajo de FL 290 rigen otros mínimos de separación vertical.

**r02-q2** · Vas a operar por primera vez en un área RVSM de otra región. ¿Qué debes verificar además del rango de niveles?
- A) Nada: RVSM está normalizado y funciona igual en todo el mundo.
- B) Solo la meteorología en ruta, porque el resto lo resuelve el despacho.
- C) Lo que publique esa región: AIP, procedimientos suplementarios y NOTAM, incluidos los requisitos de transpondedor.
- D) Únicamente que el avión alcance los niveles previstos con el peso del día.
**Correcta:** C · **Tema:** R02 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.3, Nota
**Explicación:** El rango vertical es común, pero cada Estado publica sus condiciones. La propia FAA advierte que el operador o el piloto deben averiguar qué requisito de transpondedor y de TCAS aplica en cada área RVSM donde se pretenda operar.

**r02-q3** · Según el RAC 91, ¿qué ocurre con el vuelo VFR en el espacio RVSM colombiano?
- A) Se permite hasta FL 350 si la visibilidad supera los 8 km.
- B) Se permite con autorización del ATC en cualquier nivel RVSM.
- C) Se permite solo de día y con plan de vuelo presentado.
- D) Nunca se permite sobre FL 290 en espacio de separación vertical reducida.
**Correcta:** D · **Tema:** R02 · **Referencia:** RAC 91, numerales 91.305 y 91.310
**Explicación:** Sin autorización no hay VFR sobre FL 200, y sobre FL 290 en espacio RVSM no se permite en ningún caso. El espacio RVSM es de operación IFR.

---
## 3. POR QUÉ EXISTE

**ID:** R03 · **Tiempo:** 5 min

### ¿Qué es?

La razón de ser de RVSM: en la franja de crucero de los reactores de transporte, la altura es un recurso escaso. Separar 2.000 ft desperdiciaba la mitad de los niveles disponibles justo donde más tráfico hay.

### Lo que debe saber el piloto

#### Lo que se gana

- **Capacidad.** Casi el doble de niveles utilizables entre FL 290 y FL 410.
- **Disponibilidad.** Más probabilidad de conseguir el nivel que se pide, y antes.
- **Perfiles más eficientes.** Un avión pesado que necesita FL 310 y luego FL 330 puede escalonar en pasos de 1.000 ft en vez de 2.000.
- **Combustible.** Consecuencia de lo anterior: volar más cerca del nivel óptimo consume menos. El ahorro no lo produce RVSM por sí mismo, sino el poder estar donde conviene.
- **Flexibilidad para el ATC.** Más niveles significa más soluciones para resolver un conflicto sin desviar lateralmente.

#### Lo que se exige a cambio

El precio de reducir el margen es que el error vertical tiene que ser mucho menor. De ahí salen las tres exigencias que recorren todo el módulo:

- **Precisión altimétrica.** La altitud mostrada y transmitida debe parecerse a la real dentro de márgenes estrechos.
- **Mantenimiento del nivel.** El avión debe quedarse en el nivel asignado, con el sistema automático acoplado.
- **Fiabilidad del sistema.** Dos fuentes altimétricas independientes, alerta de altitud y reporte de altitud, para que un fallo no pase inadvertido.

### En operación de aerolínea

Cuando el despacho propone FL 330 en vez de FL 310 y eso vale trescientos kilos de combustible, la razón de que FL 330 exista como nivel utilizable en esa dirección es RVSM.

### Error frecuente

«RVSM se hizo para ahorrar combustible.» Se hizo para ganar capacidad. El ahorro es una consecuencia, y depende de que el nivel eficiente esté disponible ese día.

### En pocas palabras

- RVSM existe para ganar capacidad en la franja de crucero más congestionada.
- Más niveles significa más disponibilidad, perfiles mejores y más margen de maniobra para el ATC.
- El ahorro de combustible es consecuencia, no objetivo.
- El precio es exigencia de precisión, de mantenimiento del nivel y de fiabilidad.

### Quiz · Capítulo 3

**r03-q1** · ¿Cuál es el objetivo principal de RVSM?
- A) Reducir el consumo de combustible de cada vuelo en un porcentaje fijo.
- B) Permitir que el ATC deje de aplicar separación horizontal en crucero.
- C) Aumentar la capacidad del espacio aéreo disponiendo de más niveles utilizables.
- D) Facilitar que los aviones vuelen con el piloto automático desacoplado.
**Correcta:** C · **Tema:** R03 · **Referencia:** OACI Doc 9574; FAA AC 91-85B, Apéndice A, definición 15
**Explicación:** El objetivo es la capacidad: casi el doble de niveles en la misma franja. El ahorro de combustible es una consecuencia de poder volar más cerca del nivel óptimo, y la separación horizontal sigue aplicándose igual.

**r03-q2** · ¿Qué exige a cambio la reducción de 2.000 a 1.000 ft?
- A) Velocidades de crucero menores, para dar más tiempo de reacción.
- B) Precisión altimétrica, mantenimiento del nivel y fiabilidad del equipo.
- C) Vigilancia radar permanente en todo el espacio RVSM.
- D) Que todas las aeronaves lleven TCAS II con resoluciones coordinadas.
**Correcta:** B · **Tema:** R03 · **Referencia:** FAA AC 91-85B, Apéndice B, numerales B.3.3 y B.3.4
**Explicación:** Al reducir el margen a la mitad, el error vertical admisible se reduce en la misma proporción. Por eso se exigen dos fuentes altimétricas independientes, mantenimiento automático del nivel y alerta de altitud operativa.

**r03-q3** · En el briefing, el despacho propone FL 350 en vez de FL 330 y estima menos consumo. ¿Cómo se relaciona eso con RVSM?
- A) No se relaciona: el consumo depende solo del peso y del viento.
- B) RVSM obliga a volar en el nivel más alto disponible para ahorrar.
- C) RVSM hace que ese nivel exista y esté disponible en esa dirección de vuelo.
- D) RVSM reduce el consumo directamente al disminuir la separación.
**Correcta:** C · **Tema:** R03 · **Referencia:** OACI Doc 9574
**Explicación:** RVSM no ahorra combustible por sí mismo: lo que hace es que haya el doble de niveles, y con ello más probabilidad de que el nivel eficiente esté libre. El ahorro viene de volar donde conviene.

---

## 4. LA APROBACIÓN: TRES COSAS, NO UNA

**ID:** R04 · **Tiempo:** 6 min

### ¿Qué es?

Operar RVSM no depende solo del avión. Depende de tres cosas que tienen que darse a la vez.

### Lo que debe saber el piloto

#### El avión

Debe cumplir los requisitos de equipo y de performance altimétrica, y tener la aprobación de aeronavegabilidad correspondiente. Aquí es donde entran los dos sistemas altimétricos, el control automático de altitud, la alerta de altitud y el transpondedor con reporte de altitud, que se ven en los capítulos siguientes.

#### El operador

Debe estar autorizado para operaciones RVSM. En Colombia, esa autorización aparece como una aprobación específica dentro de las especificaciones de operación (OpSpecs) que la Aerocivil le expide al explotador, junto a otras como mercancías peligrosas, baja visibilidad, EDTO o PBN AR (RAC 119, numeral 119.270(a)). La empresa no puede operar donde sus OpSpecs no la autoricen.

#### La tripulación

Debe estar entrenada en los procedimientos RVSM: chequeos altimétricos, procedimientos antes de la entrada, operación dentro del espacio, contingencias y fraseología. Ese entrenamiento es parte de la aprobación, no un extra.

### En operación de aerolínea

Al piloto de línea esto le llega resuelto: vuela un avión aprobado, de un operador autorizado, y su entrenamiento periódico incluye RVSM. Lo que sí le toca es saber que la capacidad puede perderse (por un ítem de MEL o por una falla en vuelo) y reconocer cuándo ha ocurrido.

### ¿Qué verifica la tripulación?

- Que el avión del día figura como RVSM capable en la documentación de la empresa.
- Que ningún ítem diferido haya retirado esa capacidad.
- Que la ruta cruza espacio donde el operador está autorizado.

### Error frecuente

«Si el avión es RVSM capable, ya está.» Falta el operador y falta la tripulación. Y al revés: que el operador esté autorizado no salva a un avión con un sistema requerido inoperativo.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Diagrama de convergencia. Tres bloques en la parte superior, separados y del mismo tamaño: «AERONAVE · equipo y performance altimétrica aprobados», «OPERADOR · autorización en las especificaciones de operación» y «TRIPULACIÓN · entrenada en procedimientos RVSM». De cada bloque baja una flecha gruesa hacia un único bloque inferior, más ancho y destacado: «OPERACIÓN RVSM». Al lado del bloque inferior, en tipografía menor y en rojo apagado, la nota: «Si falta una, no hay RVSM».

OBJETIVO:
Dejar grabado que RVSM no es una propiedad del avión, sino la intersección de tres condiciones.

### En pocas palabras

- RVSM exige avión aprobado, operador autorizado y tripulación entrenada.
- En Colombia la autorización del operador va en las especificaciones de operación (RAC 119, numeral 119.270(a)).
- Si falta cualquiera de las tres, no hay operación RVSM.
- La capacidad puede perderse después: por MEL o por una falla en vuelo.

### Quiz · Capítulo 4

**r04-q1** · ¿De qué depende que un vuelo pueda operar en espacio RVSM?
- A) Solo de que la aeronave tenga la aprobación de aeronavegabilidad correspondiente.
- B) De la aeronave, de la autorización del operador y del entrenamiento de la tripulación.
- C) De que el ATC confirme la separación disponible antes de la entrada.
- D) De que el avión alcance los niveles previstos con el peso y la temperatura del día.
**Correcta:** B · **Tema:** R04 · **Referencia:** FAA AC 91-85B, numeral 1.1; RAC 119, numeral 119.270(a)
**Explicación:** Las tres condiciones deben darse a la vez. La aprobación del avión no basta, y la del operador tampoco salva a un avión con un sistema requerido inoperativo.

**r04-q2** · En Colombia, ¿dónde aparece la autorización RVSM del explotador?
- A) En el certificado de aeronavegabilidad de cada aeronave.
- B) En el plan de vuelo, casilla 10.
- C) En las especificaciones de operación que expide la Aerocivil.
- D) En la licencia de cada piloto, como una habilitación.
**Correcta:** C · **Tema:** R04 · **Referencia:** RAC 119, numeral 119.270(a)
**Explicación:** Las OpSpecs recogen las aprobaciones específicas del explotador, y RVSM es una de ellas, junto a mercancías peligrosas, baja visibilidad, EDTO o PBN AR. El plan de vuelo declara la capacidad, pero no la otorga.

**r04-q3** · La aeronave está aprobada y el operador autorizado, pero un sistema requerido para RVSM está inoperativo. ¿Qué ocurre?
- A) Nada: la aprobación del operador cubre esa situación.
- B) Se mantiene la capacidad si el ATC lo autoriza expresamente.
- C) La capacidad RVSM puede perderse; hay que consultar la MEL y los requisitos aplicables.
- D) Se mantiene la capacidad mientras el otro sistema equivalente siga operativo.
**Correcta:** C · **Tema:** R04 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.3
**Explicación:** Las aprobaciones no compensan un equipo requerido inoperativo. Hay que ir a la MEL del avión y a los requisitos aplicables antes de decidir si la aeronave sigue siendo RVSM capable.

---

# BLOQUE 2 · EL EQUIPO QUE EXIGE

---

## 5. EL EQUIPO REQUERIDO, DE UN VISTAZO

**ID:** R05 · **Tiempo:** 7 min

### ¿Qué es?

Los sistemas que deben estar operativos para que una aeronave opere en espacio RVSM. El piloto no necesita saber cómo están construidos; necesita saber cuáles son, para qué le sirven y qué pasa si uno falla.

### Lo que debe saber el piloto

La FAA los enumera en el Apéndice A de la AC 91-85B. Son cuatro:

| Sistema | Para qué le sirve al piloto | Si falla |
|---|---|---|
| Dos sistemas independientes de medición de altitud | Le dan dos altitudes que puede comparar entre sí | Con una sola fuente fiable, la capacidad RVSM queda comprometida |
| Un transpondedor con reporte de altitud (SSR) | Transmite al ATC la altitud que el avión cree tener | El ATC deja de ver la altitud; hay que coordinar |
| Un sistema de alerta de altitud | Avisa cuando la altitud mostrada se aparta de la seleccionada | Se pierde la red de seguridad contra el level bust |
| Un sistema automático de control de altitud | Mantiene el nivel sin depender de la mano del piloto | Sin él, en crucero nivelado, no hay capacidad RVSM |

#### Lo que garantizan esas cifras

El equipo aprobado trae unos márgenes que conviene conocer porque explican por qué las cosas avisan cuando avisan:

- **La alerta de altitud** debe sonar cuando la altitud mostrada se aparta de la seleccionada más de un valor nominal: **±300 ft** en aviones cuyo certificado de tipo se solicitó el 9 de abril de 1997 o antes, y **±200 ft** en los posteriores, con una tolerancia de equipo que no debe exceder ±50 ft.
- **El control automático de altitud** debe mantener el avión dentro de **±65 ft** de la altitud adquirida en vuelo recto y nivelado, sin turbulencia ni ráfagas. Algunos aviones antiguos con entradas del FMS admiten hasta ±130 ft y no requieren modificación.
- **El selector de altitud** no debe introducir un error mayor de **±25 ft** entre lo que el piloto selecciona y lo que recibe el sistema de control.

Esas cifras son de diseño, no chequeos que el piloto haga. Se citan aquí porque en una entrevista explican por qué 200 o 300 ft son las magnitudes que aparecen una y otra vez en RVSM.

### ¿Qué verifica la tripulación?

Que los cuatro estén operativos antes de entrar, y que lo sigan estando mientras se está dentro. La verificación concreta la trae cada capítulo.

### ¿Qué pasa si falla?

Depende de cuál. La regla general (y la respuesta correcta en entrevista) es que **no se asume**: se consulta la MEL y el QRH. Pero hay un núcleo que la FAA deja escrito: para entrar a espacio RVSM deben estar operando normalmente los dos sistemas primarios de medición de altitud, un sistema automático de control de altitud y un dispositivo de alerta de altitud.

### Error frecuente

Contar el TCAS entre el equipo requerido para RVSM. No lo es. El requisito de transpondedor y de TCAS depende del área RVSM, y la propia FAA dice que hay que averiguarlo para cada región donde se pretenda operar.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Rejilla de cuatro tarjetas iguales, dispuestas en dos filas de dos, cada una con un icono sencillo arriba, el nombre del sistema en el centro y una línea de consecuencia abajo. Tarjeta 1: dos altímetros lado a lado: «DOS SISTEMAS INDEPENDIENTES DE ALTITUD»: «permiten comparar». Tarjeta 2: antena emitiendo: «TRANSPONDEDOR CON REPORTE DE ALTITUD»: «el ATC ve tu nivel». Tarjeta 3: campana: «ALERTA DE ALTITUD»: «avisa si te apartas». Tarjeta 4: mando de piloto automático: «CONTROL AUTOMÁTICO DE ALTITUD»: «mantiene el nivel». Bajo la rejilla, una banda rotulada: «Los cuatro, operativos, antes de entrar».

OBJETIVO:
Que el piloto pueda enumerar de memoria los cuatro sistemas y decir en una línea para qué sirve cada uno.

### En pocas palabras

- Cuatro sistemas: dos fuentes de altitud, transpondedor con reporte, alerta de altitud y control automático de altitud.
- Para entrar deben estar operando normalmente los dos primarios, un control automático y una alerta.
- El requisito de transpondedor y de TCAS depende del área: hay que averiguarlo.
- Las cifras de diseño (±200 o ±300 ft de alerta, ±65 ft de mantenimiento) explican las magnitudes que maneja RVSM.

### Quiz · Capítulo 5

**r05-q1** · Según la FAA, ¿qué equipo debe estar operando normalmente al entrar en espacio RVSM?
- A) Dos sistemas primarios de altitud, un control automático de altitud y una alerta de altitud.
- B) Un sistema primario de altitud, un TCAS II y dos transpondedores.
- C) Tres sistemas independientes de altitud y dos pilotos automáticos.
- D) Un piloto automático, un altímetro de reserva y el radar meteorológico.
**Correcta:** A · **Tema:** R05 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.3
**Explicación:** La AC lo enumera así: dos sistemas primarios de medición de altitud, un sistema automático de control de altitud y un dispositivo de alerta de altitud. El requisito de transpondedor y TCAS depende del área RVSM.

**r05-q2** · ¿Por qué la alerta de altitud es parte del equipo requerido y no un extra?
- A) Porque sustituye al control automático de altitud cuando este se desacopla.
- B) Porque avisa cuando la altitud mostrada se aparta de la seleccionada, antes de que sea una desviación.
- C) Porque transmite la desviación al ATC de forma automática.
- D) Porque calcula el error del sistema altimétrico en tiempo real.
**Correcta:** B · **Tema:** R05 · **Referencia:** FAA AC 91-85B, Apéndice A, numeral A.4.1.3
**Explicación:** Es la red de seguridad contra el level bust: señala una alerta cuando la altitud mostrada se aparta de la seleccionada más del valor nominal, ±300 ft en aviones anteriores a abril de 1997 y ±200 ft en los posteriores. No transmite nada ni sustituye al piloto automático.

**r05-q3** · Un compañero incluye el TCAS en la lista de equipo requerido para RVSM. ¿Qué le respondes?
- A) Que tiene razón: sin TCAS no hay RVSM en ninguna región.
- B) Que el TCAS solo se exige en espacio oceánico.
- C) Que el requisito de transpondedor y TCAS depende del área RVSM y hay que verificarlo.
- D) Que el TCAS sustituye a la alerta de altitud si esta falla.
**Correcta:** C · **Tema:** R05 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.3, Nota
**Explicación:** La AC deja la puerta abierta a propósito: el operador o el piloto deben averiguar el requisito de transpondedor y de TCAS en cada área RVSM donde vayan a operar. El TCAS no sustituye ningún requisito RVSM.

---

## 6. LOS DOS SISTEMAS ALTIMÉTRICOS

**ID:** R06 · **Tiempo:** 6 min

### ¿Qué es?

Las dos fuentes de altitud independientes que exige RVSM. Independientes quiere decir que un problema en una no arrastra a la otra, y esa es toda la razón de que sean dos.

### Lo que debe saber el piloto

Con una sola fuente, un error no se detecta: lo que el instrumento dice es lo único que hay. Con dos, un error se manifiesta como una **discrepancia**, y una discrepancia sí se puede ver.

De ahí salen las cuatro cosas que el piloto hace con ellas:

#### Comparar

Mirar las dos y ver si dicen lo mismo. Es el gesto básico y se hace varias veces en el vuelo.

#### Contrastar contra una referencia conocida

En tierra, la elevación del aeródromo. En el aire, el altímetro de reserva, que es una tercera opinión independiente de las dos primarias.

#### Detectar la discrepancia

No basta con que las dos cifras «se parezcan»: hay un límite, y tiene número. Se ve en el capítulo siguiente.

#### Identificar cuál es la sospechosa

Si una de las dos se aparta y la de reserva coincide con la otra, la que se aparta es la candidata. Esa comparación de tres es la razón por la que la FAA pide anotar la diferencia entre las primarias y la de reserva: sirve justamente para cuando haya que decidir cuál creer.

### En operación de aerolínea

En un avión moderno, las dos primarias son la del comandante y la del primer oficial, y el avión suele traer comparadores automáticos que vigilan la diferencia y avisan. La FAA advierte de algo con cara de detalle y que no lo es: aunque el avión tenga comparadores, **en espacio oceánico o remoto la tripulación debe ir anotando los chequeos altimétricos**, porque el comparador registra fallas pero no deja a mano la diferencia que hará falta en una contingencia.

### ¿Qué verifica la tripulación?

- Que las dos primarias coinciden dentro del límite.
- Cuál es la diferencia entre las primarias y la de reserva, y anotarla.
- Que el sistema altimétrico que gobierna el avión es el que alimenta el reporte de altitud al ATC.

### ¿Qué pasa si falla?

Si queda **una sola primaria operativa**, la FAA marca un camino concreto: contrastar con el altímetro de reserva y avisar al ATC de que se está operando con una sola primaria. Y una condición que conviene memorizar: **si no se puede confirmar la precisión de esa primaria que queda, se actúa como si hubieran fallado todas**.

### Comunicación ATC

Con una sola primaria operativa, se notifica al ATC. Si no se puede confirmar su precisión, se pasa a *unable RVSM due equipment*, que se ve en su capítulo.

### Error frecuente

«Si los altímetros difieren un poco no importa, porque el ATC tiene radar.» El radar muestra lo que el transpondedor transmite, y el transpondedor transmite lo que dice el sistema altimétrico. Si ese sistema está equivocado, el ATC ve el mismo error, no la verdad.

[ESPACIO PARA IMAGEN ANOTADA]

IMAGEN BASE:
Cabina genérica de reactor de transporte, vista frontal, con el PFD del comandante a la izquierda, el PFD del primer oficial a la derecha y el altímetro de reserva en el panel central. Los tres mostrando altitud en crucero.

ANOTACIONES:
→ FLECHA 1: a la cinta de altitud del PFD izquierdo. EXPLICACIÓN: primaria del comandante.
→ FLECHA 2: a la cinta de altitud del PFD derecho. EXPLICACIÓN: primaria del primer oficial. Estas dos son las que deben coincidir dentro del límite en crucero.
→ FLECHA 3: al altímetro de reserva del panel central. EXPLICACIÓN: la tercera opinión, independiente. Es contra ella que se contrastan las primarias cada hora, y la diferencia se anota para una eventual contingencia.

OBJETIVO PEDAGÓGICO:
Que el piloto vea que en RVSM no hay «el altímetro»: hay tres indicaciones y una relación entre ellas que hay que vigilar.

### En pocas palabras

- Dos fuentes independientes existen para que un error se vea como discrepancia.
- El altímetro de reserva es la tercera opinión que permite decidir cuál de las dos primarias es la sospechosa.
- Con una sola primaria operativa: contrastar con la de reserva y avisar al ATC.
- Si no se puede confirmar su precisión, se trata como falla de todas las primarias.
- El radar del ATC no corrige un error altimétrico: lo repite.

### Quiz · Capítulo 6

**r06-q1** · ¿Por qué RVSM exige dos sistemas de medición de altitud independientes?
- A) Para que el piloto elija el que prefiera durante el crucero.
- B) Para que un error aparezca como discrepancia y pueda detectarse.
- C) Para poder transmitir dos altitudes distintas al ATC y que él decida.
- D) Para repartir la carga de trabajo entre el comandante y el primer oficial.
**Correcta:** B · **Tema:** R06 · **Referencia:** FAA AC 91-85B, Apéndice A, numeral A.4.1.1; Apéndice B, numeral B.3.4
**Explicación:** Con una sola fuente un error es invisible. Con dos, se manifiesta como diferencia entre ellas, y una diferencia sí se puede ver, medir y contrastar con el altímetro de reserva.

**r06-q2** · En crucero RVSM queda operativa una sola primaria y no puedes confirmar su precisión. ¿Qué corresponde?
- A) Continuar normalmente, porque una primaria operativa cumple el requisito.
- B) Cambiar al altímetro de reserva como fuente principal y seguir.
- C) Actuar como si hubieran fallado todas las primarias.
- D) Desacoplar el piloto automático y volar manual vigilando la altitud.
**Correcta:** C · **Tema:** R06 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2, «One Primary Altimeter Remains Operational»
**Explicación:** La tabla de contingencias lo dice expresamente: si no se puede confirmar la precisión de la primaria que queda, se siguen las acciones previstas para la falla de todas las primarias, es decir, *unable RVSM due equipment*.

**r06-q3** · Vas a entrar en espacio oceánico y el avión tiene comparadores automáticos de altímetros. ¿Debes anotar los chequeos altimétricos?
- A) No: el comparador registra las fallas automáticamente.
- B) Sí: en espacio oceánico o remoto la tripulación debe anotarlos para una eventual contingencia.
- C) Solo si el comparador señala una falla durante el cruce.
- D) Solo si el operador lo exige en su manual de operaciones.
**Correcta:** B · **Tema:** R06 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 8, Nota
**Explicación:** La AC lo advierte de forma explícita: aunque el avión tenga comparadores, en espacio oceánico y remoto la tripulación debe ir registrando los chequeos, porque el comparador no deja fácilmente a mano la diferencia entre las primarias, que es justo lo que hace falta en una contingencia.

---
## 7. EL CHEQUEO ALTIMÉTRICO

**ID:** R07 · **Tiempo:** 8 min

### ¿Qué es?

La comparación periódica de las indicaciones de altitud. Es el procedimiento más característico de RVSM y el que más se pregunta en entrevista, porque tiene momentos definidos y cifras concretas.

### Lo que debe saber el piloto

Hay cuatro momentos, y cada uno tiene su referencia.

#### Antes del despegue

Con los altímetros en QNH, deben mostrar una elevación conocida (típicamente la del aeródromo) dentro de los límites del manual del avión. La FAA fija un tope: **la diferencia entre la elevación conocida y la mostrada no debe exceder 75 ft**.

Además, las dos primarias deben coincidir entre sí dentro de los límites del manual de operación o del AFM. Ese segundo límite **depende del avión**: la FAA no da un número único y remite al manual.

#### Al subir por la altitud de transición

Poner 29,92 inHg / **1013,25 hPa** en todos los altímetros, primarios y de reserva, sin demora, y volver a comprobar el ajuste al llegar al primer nivel autorizado.

#### En crucero, ya en RVSM

**Las dos primarias deben coincidir dentro de 200 ft** (60 m), o menos si el manual del avión lo especifica. La AC añade la consecuencia en la misma frase: si no se cumple, **el sistema altimétrico debe reportarse como defectuoso y notificarse al ATC**.

Y una tarea que se olvida: anotar la diferencia entre las primarias y la de reserva, para tenerla si hace falta.

#### Cada hora, aproximadamente

Contrastar las primarias con el altímetro de reserva. La FAA matiza cómo se hace según el espacio:

- El barrido normal de instrumentos suele bastar en la mayoría de los vuelos.
- En espacio con vigilancia (radar o ADS-B), el primer chequeo se hace **después de nivelar**.
- En espacio oceánico o remoto, se hace y **se registra** en las proximidades del punto donde empieza la navegación oceánica (por ejemplo, al salir a la costa), anotando las lecturas de las primarias y de la de reserva.

### En operación de aerolínea

En un vuelo doméstico corto, el chequeo de crucero puede ser el único que se haga, y cabe en el barrido normal. En un Bogotá–Madrid, el chequeo al coast out se anota en el registro de vuelo, y ese papel es el que sirve si más tarde hay que decidir qué altímetro creer.

### ¿Qué verifica la tripulación?

| Momento | Qué se compara | Contra qué |
|---|---|---|
| Antes del despegue | Altímetros en QNH | Elevación conocida, dentro de 75 ft |
| Antes del despegue | Primaria contra primaria | Límite del manual del avión |
| Por la altitud de transición | Ajuste de subescala | 1013,25 hPa / 29,92 inHg, y recomprobar al nivelar |
| En crucero RVSM | Primaria contra primaria | 200 ft, o menos si lo dice el manual |
| Cada hora aproximadamente | Primarias contra la de reserva | Anotar la diferencia |

### ¿Qué pasa si falla?

Si en crucero las primarias no coinciden dentro del límite, la respuesta no es «vigilarlo»: se reporta el sistema altimétrico como defectuoso y se notifica al ATC. A partir de ahí se entra en el terreno de la pérdida de capacidad RVSM.

### Error frecuente

Dar el número de 200 ft como si fuera universal para cualquier momento del vuelo. Los 200 ft son el límite **entre primarias, en crucero**. El chequeo contra la elevación conocida antes de despegar tiene otro número, 75 ft, y el límite entre primarias en tierra lo pone el manual del avión.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Línea de tiempo horizontal de un vuelo, de izquierda a derecha, con la silueta del perfil de vuelo por detrás en gris claro: rodaje, ascenso, crucero largo y descenso. Sobre la línea, cuatro marcadores numerados con su rótulo y su cifra. Marcador 1, en rodaje: «ANTES DEL DESPEGUE · elevación conocida ±75 ft · primarias entre sí: límite del AFM». Marcador 2, en el ascenso: «ALTITUD DE TRANSICIÓN · 1013,25 hPa en todos · recomprobar al nivelar». Marcador 3, al principio del crucero: «EN CRUCERO · primarias dentro de 200 ft». Marcador 4, repetido tres veces a lo largo del crucero con una flecha circular: «CADA ~1 HORA · primarias contra la de reserva · anotar».

OBJETIVO:
Que el piloto asocie cada chequeo con su momento y su cifra, y no mezcle los números de un momento con los de otro.

### En pocas palabras

- Antes de despegar: elevación conocida dentro de 75 ft, y primarias entre sí según el manual del avión.
- Por la transición: 1013,25 hPa en todos los altímetros, y recomprobar al nivelar.
- En crucero: primarias dentro de 200 ft, o menos si lo dice el manual.
- Cada hora aproximadamente: contrastar con la de reserva; en oceánico, anotarlo.
- Si no coinciden en crucero: se reporta el sistema como defectuoso y se avisa al ATC.

### Quiz · Capítulo 7

**r07-q1** · En crucero RVSM, ¿dentro de qué diferencia deben coincidir los dos altímetros primarios, según la FAA?
- A) 75 ft.
- B) 200 ft, o menos si lo especifica el manual del avión.
- C) 300 ft, que es el umbral de desviación reportable.
- D) 65 ft, que es la tolerancia del control automático de altitud.
**Correcta:** B · **Tema:** R07 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 7
**Explicación:** En nivel de crucero las dos primarias deben coincidir dentro de 200 ft (60 m), o un valor menor si el manual del avión lo especifica. Los 75 ft son el chequeo contra la elevación conocida antes del despegue, y los 65 ft, una tolerancia de diseño del control automático.

**r07-q2** · Antes del despegue, con QNH puesto, el altímetro muestra la elevación del aeródromo con 90 ft de diferencia. ¿Qué indica eso?
- A) Está dentro de lo aceptable: el límite son 200 ft.
- B) Excede el tope de 75 ft que fija la FAA para ese chequeo.
- C) Es irrelevante en tierra: el chequeo solo cuenta en crucero.
- D) Obliga a declarar *unable RVSM* antes de solicitar la salida.
**Correcta:** B · **Tema:** R07 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.2, apartado 3
**Explicación:** La diferencia entre la elevación conocida y la mostrada no debe exceder 75 ft. Excederlo es un hallazgo que hay que resolver antes de salir; no se traslada al aire para verlo después. *Unable RVSM* es una comunicación posterior a la entrada en el espacio, no un trámite de salida.

**r07-q3** · Vas a cruzar espacio oceánico. ¿Qué exige la FAA respecto al chequeo altimétrico?
- A) Repetirlo cada 30 minutos y comunicarlo al control oceánico.
- B) Nada distinto: el barrido normal de instrumentos basta en todos los espacios.
- C) Hacerlo y registrarlo cerca del punto donde empieza la navegación oceánica.
- D) Hacerlo solo si el comparador automático señala una diferencia.
**Correcta:** C · **Tema:** R07 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 8, letra c
**Explicación:** En espacio oceánico y remoto el chequeo se hace y se registra en las proximidades del punto donde empieza la navegación oceánica, por ejemplo al salir a la costa, anotando las lecturas de las primarias y de la de reserva para tenerlas disponibles en una contingencia.

---

## 8. EL CONTROL AUTOMÁTICO DE ALTITUD

**ID:** R08 · **Tiempo:** 6 min

### ¿Qué es?

El sistema que mantiene el avión en el nivel sin depender de la mano del piloto: en la práctica, el piloto automático con su modo de mantenimiento de altitud.

### Lo que debe saber el piloto

RVSM no pide que el sistema esté **disponible**: pide que esté **operativo y acoplado** durante el crucero nivelado. La FAA admite dos excepciones, y conviene decirlas con sus palabras: circunstancias como la necesidad de **retrimar** el avión o la **turbulencia** pueden requerir desacoplarlo.

Y añade una condición que se olvida: en cualquier caso, la adherencia a la altitud de crucero debe hacerse **por referencia a uno de los dos altímetros primarios**. Desacoplar no significa dejar de vigilar; significa vigilar más.

#### Qué garantiza el equipo

El sistema aprobado mantiene el avión dentro de **±65 ft** de la altitud adquirida en vuelo recto y nivelado, sin turbulencia ni ráfagas. Es una cifra de diseño y explica por qué, en condiciones normales, la altitud simplemente no se mueve.

#### El sobrepaso en los cambios de nivel

Durante una transición autorizada entre niveles, la FAA pide no sobrepasar ni quedarse corto del nivel autorizado **en más de 150 ft** (45 m). Y recomienda hacer la nivelación con la función de captura de altitud del sistema automático, si está instalada.

Esa cifra de 150 ft es la que distingue una nivelación normal de una que ya es un hallazgo.

### En operación de aerolínea

El gesto real es pequeño: se selecciona el nivel, se comprueba, se deja capturar al automático y se verifica que se quedó. Lo que cambia en RVSM es que desacoplar el piloto automático en crucero deja de ser una opción de estilo y pasa a ser una decisión con consecuencias.

### ¿Qué verifica la tripulación?

- Que el sistema está operativo antes de entrar.
- Que está acoplado en crucero nivelado.
- Que la captura del nivel no sobrepasó ni quedó corta más de 150 ft.
- Que la altitud se sigue por uno de los primarios, aunque el automático esté acoplado.

### ¿Qué pasa si falla?

La falla del sistema automático de control de altitud es uno de los tres casos que la FAA agrupa bajo *unable RVSM due equipment*, junto con la falla de la alerta de altitud y la de todos los altímetros primarios.

Y aquí está el error de entrevista más común del módulo: **volar manual no sustituye al sistema**. Que un piloto sea capaz de mantener el nivel a mano no devuelve la capacidad RVSM.

### Comunicación ATC

Si el sistema falla estando dentro: *«Unable RVSM due equipment»*, y solicitar salir del espacio RVSM salvo que la situación operacional indique otra cosa.

### Error frecuente

«Si falla el piloto automático sigo igual, porque puedo volar manual.» Falso en RVSM. El requisito es del sistema, no de la habilidad.

[ESPACIO PARA IMAGEN ANOTADA]

IMAGEN BASE:
PFD genérico en crucero, con la cinta de altitud a la derecha, la altitud seleccionada en la ventana superior, y la fila de anunciadores del modo de vuelo (FMA) en la parte alta.

ANOTACIONES:
→ FLECHA 1: a la altitud seleccionada en la ventana superior. EXPLICACIÓN: el nivel autorizado, tal como quedó tras la colación. Es la cifra que el otro piloto verifica.
→ FLECHA 2: a la altitud actual en la cinta. EXPLICACIÓN: lo que el avión hace. En crucero estable y sin turbulencia, el sistema aprobado la mantiene dentro de ±65 ft.
→ FLECHA 3: al anunciador de modo vertical y al de piloto automático acoplado en el FMA. EXPLICACIÓN: RVSM exige que el sistema automático esté operativo y acoplado en crucero nivelado, no solo disponible.

OBJETIVO PEDAGÓGICO:
Relacionar tres cosas que el piloto mira por separado (nivel autorizado, altitud real y estado del automático) como la única verificación que sostiene la separación de 1.000 ft.

### En pocas palabras

- El control automático debe estar operativo y acoplado en crucero nivelado.
- Se admite desacoplar para retrimar o por turbulencia; la altitud se sigue por un primario.
- En transiciones de nivel, no sobrepasar ni quedarse corto más de 150 ft.
- Su falla es *unable RVSM due equipment*: volar manual no la sustituye.

### Quiz · Capítulo 8

**r08-q1** · En crucero RVSM, ¿qué exige la FAA respecto del sistema automático de control de altitud?
- A) Que esté instalado y disponible, aunque se vuele manual.
- B) Que esté operativo y acoplado, salvo circunstancias como retrimar o turbulencia.
- C) Que se desacople cada hora para comprobar el trimado.
- D) Que se use solo por encima de FL 350.
**Correcta:** B · **Tema:** R08 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 5
**Explicación:** Debe estar operativo y acoplado durante el crucero nivelado, y la AC admite el desacople por circunstancias como la necesidad de retrimar o la turbulencia. En cualquier caso, la adherencia a la altitud se hace por referencia a uno de los dos altímetros primarios.

**r08-q2** · Durante una transición autorizada entre niveles, ¿cuál es el sobrepaso máximo que admite la FAA?
- A) 65 ft.
- B) 150 ft.
- C) 200 ft.
- D) 300 ft.
**Correcta:** B · **Tema:** R08 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 4
**Explicación:** El avión no debe sobrepasar ni quedarse corto del nivel autorizado en más de 150 ft (45 m), y se recomienda nivelar con la función de captura de altitud del sistema automático. Los 65 ft son la tolerancia de diseño en crucero estable, no el límite de la nivelación.

**r08-q3** · Falla el sistema automático de control de altitud en crucero RVSM. Tu compañero propone continuar volando manual. ¿Qué respondes?
- A) Que es válido si se mantiene el nivel dentro de 200 ft.
- B) Que es válido mientras la turbulencia sea ligera.
- C) Que no: su falla es *unable RVSM due equipment* y hay que avisar al ATC.
- D) Que es válido si el otro piloto vigila la altitud de forma continua.
**Correcta:** C · **Tema:** R08 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2, «Unable RVSM Due Equipment»
**Explicación:** La tabla de contingencias agrupa la falla del sistema automático de control de altitud, la de la alerta de altitud y la de todos los altímetros primarios bajo la misma acción: comunicar *unable RVSM due equipment* y solicitar salir del espacio RVSM salvo que la situación operacional indique otra cosa. La habilidad manual no sustituye el requisito.

---

## 9. LA ALERTA DE ALTITUD

**ID:** R09 · **Tiempo:** 5 min

### ¿Qué es?

El sistema que avisa cuando la altitud mostrada se aparta de la seleccionada. Es la red de seguridad contra el error humano: el nivel mal puesto, el que se olvida, el que se pasa.

### Lo que debe saber el piloto

Opera desde cualquiera de las dos fuentes de altitud requeridas, y avisa cuando la desviación supera un valor nominal:

- **±300 ft** en aviones cuyo certificado de tipo o cambio mayor se solicitó el 9 de abril de 1997 o antes.
- **±200 ft** en los posteriores, con una tolerancia de equipo que no debe exceder ±50 ft.

Lo que el piloto saca de esas cifras no es la fecha: es que **la alerta suena tarde para RVSM**. Con 1.000 ft de separación, para cuando el avisador canta ya se ha consumido una quinta o una tercera parte del margen. La alerta es la última defensa, no la primera.

### En operación de aerolínea

Se nota en la aproximación al nivel y en el momento de nivelar. En crucero estable no debería sonar nunca; si suena, ha pasado algo que merece atención inmediata.

### ¿Qué verifica la tripulación?

Que el sistema esté operativo. La FAA lo pone entre los tres que deben estar operando normalmente al entrar en espacio RVSM, y lo repite en los procedimientos en vuelo: la alerta de altitud **debe estar operativa**.

### ¿Qué pasa si falla?

Es uno de los tres casos de *unable RVSM due equipment*. Y conviene entender por qué un aviso que «solo avisa» tiene ese peso: sin él, una desviación lenta puede crecer sin que nadie la note hasta que el ATC la vea en el radar, y para entonces el margen puede haberse consumido.

### Comunicación ATC

*«Unable RVSM due equipment»*, y solicitar salir del espacio salvo que la situación operacional indique otra cosa.

### Error frecuente

Tratarla como un lujo: «es solo una campana». En RVSM es equipo requerido, y su falla tiene la misma consecuencia que perder el piloto automático o los altímetros primarios.

### En pocas palabras

- Avisa cuando la altitud mostrada se aparta de la seleccionada: ±300 ft o ±200 ft según la antigüedad del tipo.
- Con 1.000 ft de separación, cuando suena ya se consumió buena parte del margen: es la última defensa.
- Debe estar operativa para entrar y mientras se está dentro.
- Su falla es *unable RVSM due equipment*.

### Quiz · Capítulo 9

**r09-q1** · ¿Cuándo señala una alerta el sistema de alerta de altitud?
- A) Cuando el ATC detecta una desviación y la transmite al avión.
- B) Cuando la altitud mostrada se aparta de la seleccionada más de un valor nominal.
- C) Cuando la diferencia entre los dos altímetros primarios excede 200 ft.
- D) Cuando el piloto automático se desacopla en crucero.
**Correcta:** B · **Tema:** R09 · **Referencia:** FAA AC 91-85B, Apéndice A, numeral A.4.1.3
**Explicación:** El sistema compara la altitud mostrada con la seleccionada y alerta cuando la desviación supera el valor nominal: ±300 ft en tipos anteriores a abril de 1997 y ±200 ft en los posteriores. La comparación entre primarias es otra cosa, y la detecta el comparador o el propio piloto.

**r09-q2** · ¿Por qué se dice que la alerta de altitud es la última defensa y no la primera?
- A) Porque solo funciona por encima de FL 290.
- B) Porque depende del transpondedor para operar.
- C) Porque cuando suena ya se consumió buena parte del margen de 1.000 ft.
- D) Porque el ATC la recibe antes que la tripulación.
**Correcta:** C · **Tema:** R09 · **Referencia:** FAA AC 91-85B, Apéndice A, numeral A.4.1.3
**Explicación:** Con umbrales de 200 o 300 ft y una separación de 1.000 ft, para cuando la alerta canta ya se ha gastado entre una quinta y una tercera parte del margen. Las defensas anteriores son la colación, la verificación cruzada del nivel seleccionado y la vigilancia de la altitud.

**r09-q3** · La alerta de altitud queda inoperativa en crucero RVSM. ¿Qué corresponde?
- A) Continuar, porque es un sistema de aviso y no de control.
- B) Continuar si el piloto automático funciona correctamente.
- C) Comunicar *unable RVSM due equipment* y solicitar salir del espacio RVSM.
- D) Reducir la velocidad y aumentar la frecuencia de los chequeos altimétricos.
**Correcta:** C · **Tema:** R09 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2, «Unable RVSM Due Equipment»
**Explicación:** La FAA la agrupa con la falla del control automático de altitud y la de todos los primarios: las tres se comunican como *unable RVSM due equipment* y se solicita salir del espacio, salvo que la situación operacional indique otra cosa.

---
## 10. EL REPORTE DE ALTITUD Y EL TRANSPONDEDOR

**ID:** R10 · **Tiempo:** 5 min

### ¿Qué es?

El transpondedor con reporte de altitud es lo que hace que el ATC vea tu nivel. Sin él, el controlador tiene tu posición pero no tu altitud, y en un espacio donde la separación es de 1.000 ft eso cambia el problema entero.

### Lo que debe saber el piloto

Hay una regla operacional, corta y muy citable en entrevista:

> Normalmente, el sistema altimétrico que se está usando para controlar la aeronave debe ser el que alimenta el transpondedor que reporta la altitud al ATC.

Dicho de otro modo: **lo que el avión sigue y lo que el avión transmite deben venir de la misma fuente**. Si el piloto automático se guía por el sistema 1 y el transpondedor transmite el sistema 2, y los dos discrepan, el avión está volando un nivel y enseñando otro. El ATC separa con lo que ve.

De ahí también que la diferencia asignada (la AAD) se defina contra lo transmitido: es la diferencia entre la altitud que transmite el transpondedor en modo C y la altitud o nivel asignado.

### En operación de aerolínea

En la mayoría de los aviones esto está resuelto por diseño y por SOP: se selecciona un transpondedor y la fuente correspondiente. Aparece cuando hay que cambiar de transpondedor o de fuente de datos aéreos, y ahí la pregunta es siempre la misma: ¿lo que transmito viene de donde vuelo?

### ¿Qué verifica la tripulación?

- Que el transpondedor está operativo y reportando altitud.
- Que la fuente que alimenta el reporte es la que gobierna el avión.
- Si se cambia de transpondedor o de fuente, que la relación se mantiene, y anotarlo si hubo diferencia.

### ¿Qué pasa si falla?

La falla de transpondedor tiene un tratamiento **distinto** del de los otros tres sistemas, y esa distinción es fina y se pregunta. Según la tabla de contingencias de la FAA:

- El piloto contacta al ATC y **solicita autorización para continuar operando en el nivel autorizado**.
- Cumple la autorización revisada si el ATC la emite.
- El controlador considera la solicitud y emite nueva autorización si hace falta.

No es el *unable RVSM due equipment* automático de los otros tres. Y la AC recuerda que la operación con transpondedor inoperativo está regulada aparte. En espacio aéreo no controlado por Estados Unidos, los Estados proveedores determinan qué acciones corresponden ante falla de transpondedor o de TCAS.

### Comunicación ATC

Solicitud de continuar en el nivel autorizado, y cumplimiento de lo que el ATC responda.

### Error frecuente

Meter la falla de transpondedor en el mismo saco que la del piloto automático. No van juntas: los altímetros, el control automático y la alerta son *unable RVSM due equipment*; el transpondedor se coordina.

### En pocas palabras

- El transpondedor es lo que hace visible tu nivel para el ATC.
- La fuente que gobierna el avión debe ser la que alimenta el reporte de altitud.
- La AAD se mide contra lo transmitido, no contra lo que ves.
- Su falla se coordina con el ATC: no es el *unable RVSM due equipment* de los otros tres.

### Quiz · Capítulo 10

**r10-q1** · ¿Qué regla operacional establece la FAA sobre la fuente del reporte de altitud?
- A) Que debe alimentarse siempre del altímetro de reserva.
- B) Que debe alimentarse del sistema altimétrico que se está usando para controlar la aeronave.
- C) Que debe alternarse entre las dos primarias cada hora.
- D) Que debe alimentarse del sistema del primer oficial, para independizarlo del piloto que vuela.
**Correcta:** B · **Tema:** R10 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 9
**Explicación:** Lo que el avión sigue y lo que transmite deben venir de la misma fuente. Si no, el avión vuela un nivel y enseña otro, y el ATC separa con lo que ve.

**r10-q2** · Falla el transpondedor en crucero RVSM. ¿Qué corresponde según la tabla de contingencias de la FAA?
- A) Comunicar *unable RVSM due equipment* y salir del espacio RVSM.
- B) Contactar al ATC y solicitar autorización para continuar en el nivel autorizado.
- C) Declarar emergencia y descender por debajo de FL 290.
- D) Continuar sin comunicar nada mientras el nivel se mantenga estable.
**Correcta:** B · **Tema:** R10 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2, «Transponder Failure»
**Explicación:** La falla de transpondedor se coordina: se solicita autorización para seguir en el nivel autorizado y se cumple la autorización revisada si la hay. No entra en el grupo de *unable RVSM due equipment*, que son los altímetros primarios, el control automático de altitud y la alerta de altitud.

**r10-q3** · ¿Contra qué se define la desviación de altitud asignada (AAD)?
- A) Contra la altitud que muestra el altímetro del comandante.
- B) Contra la altitud media de los dos altímetros primarios.
- C) Contra la altitud que transmite el transpondedor en modo C.
- D) Contra la altitud que el FMS predice para el punto siguiente.
**Correcta:** C · **Tema:** R10 · **Referencia:** FAA AC 91-85B, Apéndice A, definición 7
**Explicación:** La AAD es la diferencia entre la altitud transmitida por el modo de reporte de altitud del radar secundario y la altitud o nivel asignado. Por eso importa tanto que la fuente del reporte sea la que gobierna el avión.

---

## 11. RVSM Y LA MEL

**ID:** R11 · **Tiempo:** 7 min

### ¿Qué es?

El punto donde RVSM se cruza con la lista de equipo mínimo. Es el capítulo que más se pregunta en entrevistas de aerolínea, porque separa al que memorizó de una lista al que sabe razonar.

### Lo que debe saber el piloto

La idea central cabe en una frase: **despachable y RVSM capable no son lo mismo**.

Un ítem diferido puede dejar el avión perfectamente despachable y, al mismo tiempo, retirarle la capacidad RVSM. Y al revés: no toda falla la retira automáticamente. La única forma de saberlo es mirar la MEL de ese avión.

#### Qué mira el piloto en la entrada de MEL

- **El ítem y su número requerido.** Cuántos hacen falta para despachar.
- **Las observaciones o excepciones.** Aquí es donde suele aparecer la restricción RVSM, escrita con todas las letras.
- **La (M)**, que indica un procedimiento de mantenimiento asociado.
- **La (O)**, que indica un procedimiento operacional que le toca a la tripulación.
- **La restricción explícita de RVSM**, si la hay.

#### Sistemas que suelen tocar RVSM

Los que ya conocemos: altimetría, control automático de altitud, alerta de altitud, y reporte de altitud o transpondedor. Que un ítem toque uno de esos sistemas es motivo para ir a mirar, no para concluir.

### En operación de aerolínea

El avión llega con un ítem diferido. El despacho ya hizo su parte y el vuelo está planificado. Lo que le toca al piloto es comprobar si esa restricción afecta la ruta del día: si el plan cruza espacio RVSM y el avión ya no es capaz, hay que replanificar, y eso toca nivel, combustible y a veces ruta.

### ¿Qué verifica la tripulación?

1. La entrada de MEL completa, no solo el título.
2. Si hay restricción RVSM.
3. Si el plan de vuelo declara capacidad que el avión ya no tiene.
4. Qué nivel queda disponible, y si el avión llega con el peso del día.
5. Qué consecuencia tiene sobre el combustible.
6. Si el procedimiento operacional (O) le corresponde a la tripulación cumplirlo.

### ¿Qué pasa si falla?

Aquí «falla» significa no leer la entrada completa. Los dos errores clásicos:

- Suponer que porque el avión está despachado sigue siendo RVSM capable.
- Suponer que porque un sistema está inoperativo ya no lo es.

Ninguna de las dos suposiciones se sostiene sin la MEL delante.

#### Dos ítems abiertos a la vez

Caso que aparece en entrevista: dos entradas de MEL abiertas simultáneamente, cada una aceptable por separado. La respuesta correcta es que **hay que mirar la interacción**: la MEL puede prohibir la combinación aunque admita cada una por su lado, y el efecto conjunto sobre RVSM puede no ser el de ninguna de las dos.

### Error frecuente

«Si el avión es despachable por MEL, automáticamente sigue siendo RVSM.» Es exactamente la confusión que este capítulo existe para deshacer.

[ESPACIO PARA IMAGEN ANOTADA]

IMAGEN BASE:
Entrada ficticia de una lista de equipo mínimo, con su formato habitual en columnas: número de ítem y sistema, número instalado, número requerido para el despacho, y una columna ancha de observaciones y excepciones. El ítem se refiere a un sistema relacionado con el mantenimiento automático de altitud.

ANOTACIONES:
→ FLECHA 1: a la columna de número requerido. EXPLICACIÓN: cuántos hacen falta para despachar. Responde «¿sale el avión?», no «¿es RVSM?».
→ FLECHA 2: a la línea de observaciones donde aparece la restricción. EXPLICACIÓN: aquí es donde la MEL retira la capacidad RVSM, con todas las letras. Es la línea que hay que leer.
→ FLECHA 3: a las marcas (M) y (O) al lado del ítem. EXPLICACIÓN: (M) es un procedimiento de mantenimiento; (O) es uno operacional, y ese le toca cumplirlo a la tripulación.

OBJETIVO PEDAGÓGICO:
Mostrar en un solo golpe de vista que «despachable» y «RVSM capable» se leen en columnas distintas de la misma entrada.

### En pocas palabras

- Despachable y RVSM capable no son lo mismo.
- La restricción RVSM se lee en las observaciones de la entrada de MEL, no se deduce.
- Nunca se asume en ninguna de las dos direcciones.
- Con dos ítems abiertos, hay que mirar la interacción entre ellos.
- Perder RVSM en tierra cambia nivel, combustible y a veces ruta.

### Quiz · Capítulo 11

**r11-q1** · El avión tiene un ítem de MEL abierto y está despachado. ¿Qué se puede concluir sobre su capacidad RVSM?
- A) Que la conserva: si estuviera afectada, el avión no habría sido despachado.
- B) Que la ha perdido: cualquier ítem abierto retira la capacidad.
- C) Nada: hay que leer la entrada de MEL y sus observaciones.
- D) Que la conserva si el ítem no es de altimetría.
**Correcta:** C · **Tema:** R11 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.3
**Explicación:** Despachable y RVSM capable son dos cosas distintas que se leen en columnas distintas de la misma entrada. Ni la presencia de un ítem retira automáticamente la capacidad ni el hecho de estar despachado la garantiza.

**r11-q2** · En la entrada de MEL, ¿qué indica la marca (O)?
- A) Que el ítem es opcional y puede ignorarse.
- B) Que hay un procedimiento operacional que le corresponde cumplir a la tripulación.
- C) Que el ítem solo aplica en operación oceánica.
- D) Que el despacho queda a criterio del comandante.
**Correcta:** B · **Tema:** R11 · **Referencia:** Práctica estándar de listas de equipo mínimo; conectar con el módulo MEL de Aviatory
**Explicación:** La (O) señala un procedimiento operacional asociado al ítem, y ese lo ejecuta la tripulación. La (M) señala uno de mantenimiento. Ignorar la (O) es una de las formas más comunes de operar fuera de las condiciones de la MEL.

**r11-q3** · Hay dos ítems de MEL abiertos, cada uno aceptable por separado. ¿Cómo se evalúa el efecto sobre RVSM?
- A) Se suman: si ninguno retira la capacidad por separado, juntos tampoco.
- B) Se toma el más restrictivo de los dos y se ignora el otro.
- C) Se revisa la interacción: la MEL puede prohibir la combinación o cambiar el efecto.
- D) Se consulta al ATC antes del despegue.
**Correcta:** C · **Tema:** R11 · **Referencia:** Práctica estándar de listas de equipo mínimo; conectar con el módulo MEL de Aviatory
**Explicación:** Las restricciones de la MEL no son aditivas. La lista puede prohibir expresamente una combinación que admite por separado, y el efecto conjunto sobre la capacidad RVSM puede no coincidir con el de ninguno de los dos ítems aislados.

---

# BLOQUE 3 · ANTES DE VOLAR

---

## 12. LA PLANIFICACIÓN

**ID:** R12 · **Tiempo:** 5 min

### ¿Qué es?

Lo que la tripulación revisa en la preparación del vuelo con relación a RVSM. No es el trabajo del despachador: es la parte que el piloto comprueba y firma.

### Lo que debe saber el piloto

La lista corta, en el orden en que se mira:

- **Estado RVSM del avión del día.** Si es capaz, y si sigue siéndolo con lo que traiga diferido.
- **MEL y CDL.** Si hay ítems que toquen altimetría, control automático de altitud, alerta o reporte de altitud.
- **La ruta.** Qué tramos cruzan espacio RVSM y de qué regiones.
- **El plan de vuelo.** Que declare la capacidad que el avión de verdad tiene.
- **Meteorología en ruta.** Con dos cosas que este módulo mira con lupa: turbulencia y onda de montaña.
- **NOTAM.** Los que afecten al espacio RVSM del día.

### En operación de aerolínea

El briefing dura poco y casi siempre se resume en una frase: «avión limpio, ruta normal, sin novedad». RVSM se vuelve una conversación cuando algo de esa lista no está limpio, y entonces el efecto se propaga: nivel distinto, más combustible, a veces otra ruta.

### ¿Qué verifica la tripulación?

Los seis puntos de arriba. Y una comprobación de coherencia que se olvida: **que lo declarado en el plan de vuelo coincide con lo que el avión puede hacer hoy**. Si el avión perdió capacidad RVSM por MEL, el plan no debe declararla.

### Error frecuente

«RVSM solo afecta la planificación del vuelo.» Es al revés: la planificación es donde empieza, pero RVSM se verifica antes de entrar, se vigila dentro y se reporta después.

### En pocas palabras

- Se revisa: estado del avión, MEL y CDL, ruta, plan de vuelo, meteorología y NOTAM.
- La meteorología importa por turbulencia y onda de montaña, que afectan el mantenimiento del nivel.
- Lo declarado en el plan debe coincidir con lo que el avión puede hacer hoy.
- La planificación es el principio, no el final.

### Quiz · Capítulo 12

**r12-q1** · Durante la preparación del vuelo, ¿qué debe comprobar la tripulación respecto a RVSM?
- A) Solo que el avión figure como RVSM capable en la documentación.
- B) Estado del avión, MEL y CDL, ruta, plan de vuelo, meteorología y NOTAM.
- C) Únicamente los NOTAM del aeródromo de salida y de destino.
- D) Nada: la capacidad RVSM la verifica el despacho antes de entregar el plan.
**Correcta:** B · **Tema:** R12 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.2
**Explicación:** La comprobación es más amplia que el estado del avión: incluye lo diferido, la ruta que cruza espacio RVSM, la coherencia del plan de vuelo, la meteorología en ruta (turbulencia y onda de montaña) y los NOTAM.

**r12-q2** · El avión perdió capacidad RVSM por un ítem de MEL. ¿Qué pasa con el plan de vuelo?
- A) No cambia: el plan declara la capacidad de diseño de la aeronave.
- B) No debe declarar una capacidad que el avión no tiene hoy.
- C) Se mantiene y se avisa al ATC en el primer contacto.
- D) Lo corrige el ATC automáticamente al recibir el plan.
**Correcta:** B · **Tema:** R12 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.4
**Explicación:** La FAA es explícita: el operador o el despachador no deben declarar el código de equipo RVSM en el plan de vuelo cuando la aeronave u operador no están en condiciones RVSM. Y el piloto de una aeronave no RVSM debe informar al controlador de esa condición.

**r12-q3** · ¿Por qué la meteorología en ruta es parte de la planificación RVSM?
- A) Porque la temperatura cambia el rango de niveles RVSM disponibles.
- B) Porque turbulencia y onda de montaña pueden comprometer el mantenimiento del nivel.
- C) Porque el espacio RVSM se suspende con meteorología adversa.
- D) Porque el altímetro pierde precisión con humedad alta.
**Correcta:** B · **Tema:** R12 · **Referencia:** FAA AC 91-85B, Apéndice D
**Explicación:** La turbulencia severa y la actividad de onda de montaña pueden producir desviaciones de altitud que impiden mantener el nivel autorizado, y por eso tienen tratamiento propio en la tabla de contingencias. El rango de niveles no depende de la temperatura ni el espacio se suspende por meteorología.

---
## 13. RVSM EN EL PLAN DE VUELO OACI

**ID:** R13 · **Tiempo:** 5 min

### ¿Qué es?

Cómo se declara la capacidad RVSM en el plan de vuelo. Es una sola letra, y el piloto debe saber cuál es y qué significa.

### Lo que debe saber el piloto

En el plan de vuelo OACI, la **casilla 10 (Equipo)** se anota con la letra **W** para operar en espacio RVSM. Esa letra es la que usa el proveedor de servicios de tránsito aéreo para decidir cuándo asignar separación de 1.000 ft.

Tres consecuencias que conviene tener claras:

- **La letra declara, no otorga.** La capacidad viene del avión, del operador y de la tripulación; la W solo se lo comunica al sistema.
- **Si el avión o la tripulación no cumplen los requisitos, la W no se pone.** La FAA lo dice expresamente: el operador o el despachador **no** declaran el código de equipo RVSM, y se siguen los procedimientos de aeronave no RVSM, incluida la fraseología correspondiente.
- **Declarar capacidad que no se tiene es un problema serio.** El ATC separará 1.000 ft creyendo que puede.

### En operación de aerolínea

El plan llega hecho. Lo que el piloto hace es comprobar coherencia: si el avión trae una restricción RVSM por MEL y el plan lleva la W, hay una contradicción que se resuelve antes de salir, no en el aire.

### ¿Qué verifica la tripulación?

- Que la casilla 10 lleva la W si el vuelo va a operar RVSM.
- Que **no** la lleva si el avión perdió la capacidad.
- Que la matrícula del avión aparece donde corresponde cuando difiere de la identificación de la aeronave.

### ¿Qué pasa si falla?

Si el plan declara capacidad que no existe, el sistema aplicará separación reducida a un avión que no puede garantizarla. Corregirlo es responsabilidad del operador y del despacho, y el piloto es la última verificación antes de que el avión se mueva.

### Comunicación ATC

Si el avión no es RVSM, además de no declarar la W, el piloto debe informarlo al controlador, con la fraseología del capítulo 27.

### Error frecuente

Creer que la W «habilita» el vuelo RVSM. Declara una capacidad que ya debe existir. Ponerla no hace capaz a un avión que no lo es.

[ESPACIO PARA IMAGEN ANOTADA]

IMAGEN BASE:
Fragmento ficticio de un plan de vuelo OACI, mostrando la fila de casillas 7 a 10 con contenido de ejemplo, y la casilla 10 (Equipo) claramente legible con una cadena de letras de equipo entre las que aparece la W.

ANOTACIONES:
→ FLECHA 1: a la letra W dentro de la casilla 10. EXPLICACIÓN: declara capacidad RVSM. Es lo que el proveedor de servicios ATS usa para decidir si te aplica separación de 1.000 ft.
→ FLECHA 2: al resto de la cadena de equipo de la casilla 10. EXPLICACIÓN: las demás capacidades declaradas. La W convive con ellas; no las sustituye.
→ FLECHA 3: a la casilla 7, identificación de la aeronave. EXPLICACIÓN: cuando la matrícula difiere de la identificación, se anota donde corresponda en la información complementaria.

OBJETIVO PEDAGÓGICO:
Que el piloto reconozca a simple vista dónde vive RVSM dentro del plan de vuelo y entienda que esa letra es una declaración, no una autorización.

### En pocas palabras

- La capacidad RVSM se declara con la letra W en la casilla 10 del plan de vuelo OACI.
- Si el avión o la tripulación no cumplen, la W no se declara.
- La W declara; no otorga capacidad.
- El piloto comprueba que el plan dice lo que el avión de verdad puede hacer.

### Quiz · Capítulo 13

**r13-q1** · ¿Cómo se declara la capacidad RVSM en el plan de vuelo OACI?
- A) Con la letra R en la casilla 18.
- B) Con la letra W en la casilla 10, de equipo.
- C) Con la sigla RVSM en la casilla 15, de ruta.
- D) No se declara: la conoce el ATC por la matrícula.
**Correcta:** B · **Tema:** R13 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.1, apartado 2
**Explicación:** La casilla 10 (Equipo) se anota con la letra W para operar en espacio RVSM. El proveedor de servicios ATS usa esos códigos de plan de vuelo para determinar cuándo asignar separación de 1.000 ft.

**r13-q2** · La aeronave no cumple los requisitos RVSM. ¿Qué debe ocurrir con el plan de vuelo?
- A) Se declara la W igualmente y se avisa por radio al entrar.
- B) No se declara el código de equipo RVSM y se siguen los procedimientos de aeronave no RVSM.
- C) Se declara la W y se añade una observación en la casilla 18.
- D) Se presenta el plan como VFR para evitar el espacio RVSM.
**Correcta:** B · **Tema:** R13 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.1, Nota
**Explicación:** Si la tripulación o la aeronave no cumplen los requisitos, el operador o el despachador no declaran el código de equipo RVSM y se aplican los procedimientos de estado no RVSM, incluida la fraseología correspondiente con el ATC.

**r13-q3** · Tu compañero dice que poner la W en el plan «habilita» al vuelo para RVSM. ¿Qué le respondes?
- A) Que tiene razón: la W es la autorización operativa del vuelo.
- B) Que solo habilita si el ATC la confirma en el primer contacto.
- C) Que la W declara una capacidad que ya debe existir; no la otorga.
- D) Que la W habilita únicamente por encima de FL 310.
**Correcta:** C · **Tema:** R13 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.1
**Explicación:** La capacidad nace del avión aprobado, del operador autorizado y de la tripulación entrenada. La letra W comunica esa capacidad al sistema; escribirla en un avión que no la tiene no lo hace capaz, y sí hace que el ATC le aplique separación de 1.000 ft.

---

## 14. EL PREFLIGHT

**ID:** R14 · **Tiempo:** 6 min

### ¿Qué es?

Lo que la tripulación hace antes de salir, con relación a RVSM. La FAA lo enumera en cuatro puntos y todos son de piloto, no de mantenimiento.

### Lo que debe saber el piloto

#### 1. Revisar los registros de mantenimiento

Mirar el libro técnico y las formas para conocer el estado del equipo requerido para vuelo en espacio RVSM, y asegurarse de que se han tomado las acciones para corregir los defectos de ese equipo.

#### 2. En la inspección exterior, mirar las tomas estáticas

Prestar atención particular al estado de las **tomas estáticas**, al estado del revestimiento del fuselaje **cerca de cada toma estática**, y a cualquier otro componente que afecte la precisión del sistema altimétrico.

Este punto merece detenerse. Es el único momento del vuelo en que el piloto puede ver con sus ojos algo que afecta directamente la precisión altimétrica: una abolladura, una reparación mal acabada o una cinta cerca de una toma estática cambia el flujo de aire y con él la presión que el sistema mide. La FAA admite que lo haga otra persona calificada y autorizada (un mecánico, un ingeniero de vuelo), pero alguien tiene que mirarlo.

#### 3. Antes del despegue, los dos chequeos altimétricos

Los del capítulo 7: elevación conocida dentro de 75 ft con QNH puesto, y las dos primarias coincidiendo dentro del límite del manual del avión. La AC añade una nota que dice mucho: **ambos chequeos deben ser un punto de énfasis en el material de entrenamiento**.

#### 4. El equipo requerido, operativo

El equipo requerido para vuelo en espacio RVSM debe estar operativo, y cualquier indicación de mal funcionamiento debe resolverse.

### En operación de aerolínea

Los cuatro puntos caben en la rutina normal: el libro técnico se lee, la vuelta al avión se da, los altímetros se ajustan y se comparan. Lo que RVSM añade es intención: mirar las tomas estáticas **sabiendo por qué**, y comparar los altímetros **sabiendo contra qué**.

### ¿Qué verifica la tripulación?

| # | Verificación | Referencia |
|---|---|---|
| 1 | Libro técnico y formas: estado del equipo RVSM | AC 91-85B, B.3.2(1) |
| 2 | Tomas estáticas y fuselaje cercano | AC 91-85B, B.3.2(2) |
| 3 | Elevación conocida dentro de 75 ft, y primarias entre sí | AC 91-85B, B.3.2(3) |
| 4 | Equipo requerido operativo, sin indicaciones de falla | AC 91-85B, B.3.2(4) |

### ¿Qué pasa si falla?

Un hallazgo en el preflight se resuelve en tierra. Si el equipo requerido no está operativo o el chequeo altimétrico se sale de límites, el camino es la MEL y mantenimiento, no despegar a ver qué pasa.

### Error frecuente

Dar la vuelta al avión sin mirar las tomas estáticas, o mirarlas sin saber que en RVSM son el punto crítico de la inspección exterior.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Detalle del fuselaje delantero de un reactor de transporte, vista lateral próxima, con una toma estática claramente visible y el revestimiento alrededor. Un círculo de atención marcando la toma y una zona sombreada del revestimiento en su entorno inmediato. A un lado, tres viñetas cortas de lo que se busca: «superficie limpia y sin obstrucción», «revestimiento sin abolladuras ni reparaciones que alteren el flujo», «sin cinta, sellante ni pintura sobre la toma o su entorno».

OBJETIVO:
Convertir un punto del preflight que suele pasar desapercibido en algo concreto y mirable, explicando por qué en RVSM esa zona del avión importa más que en otras operaciones.

### En pocas palabras

- Revisar el libro técnico para conocer el estado del equipo RVSM.
- En la vuelta al avión, mirar las tomas estáticas y el fuselaje a su alrededor.
- Antes de despegar: elevación conocida dentro de 75 ft y primarias entre sí según el manual.
- El equipo requerido debe estar operativo; las indicaciones de falla se resuelven en tierra.

### Quiz · Capítulo 14

**r14-q1** · En la inspección exterior de un vuelo RVSM, ¿a qué debe prestar atención particular la tripulación?
- A) Al estado de los neumáticos y de los frenos.
- B) A las tomas estáticas y al revestimiento del fuselaje cercano a ellas.
- C) A las antenas del transpondedor en el vientre del avión.
- D) A las luces exteriores, que se usan para alertar a otros aviones.
**Correcta:** B · **Tema:** R14 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.2, apartado 2
**Explicación:** La AC pide atención particular al estado de las tomas estáticas, al revestimiento del fuselaje cerca de cada toma y a cualquier componente que afecte la precisión del sistema altimétrico. Es el único punto del preflight donde el piloto ve algo que incide directamente en la precisión de la altitud.

**r14-q2** · ¿Quién puede realizar la comprobación de las tomas estáticas en el preflight?
- A) Solo el comandante, y no es delegable.
- B) Solo personal de mantenimiento certificado.
- C) El piloto, u otra persona calificada y autorizada, como un ingeniero de vuelo o mantenimiento.
- D) Nadie: se comprueba en el mantenimiento programado, no en el preflight.
**Correcta:** C · **Tema:** R14 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.2, apartado 2
**Explicación:** La AC admite expresamente que la realice una persona calificada y autorizada distinta del piloto, por ejemplo un ingeniero de vuelo o personal de mantenimiento. Lo que no admite es que no se haga.

**r14-q3** · En el preflight encuentras que un equipo requerido para RVSM muestra indicación de mal funcionamiento. ¿Qué corresponde?
- A) Anotarlo y verificarlo de nuevo en crucero.
- B) Resolverlo antes del vuelo: el equipo requerido debe estar operativo.
- C) Continuar y declarar *unable RVSM* al entrar en el espacio.
- D) Continuar si el sistema redundante funciona correctamente.
**Correcta:** B · **Tema:** R14 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.2, apartado 4
**Explicación:** El equipo requerido para vuelo en espacio RVSM debe estar operativo y las indicaciones de mal funcionamiento deben resolverse. El camino es la MEL y mantenimiento, en tierra. *Unable RVSM* es una comunicación para lo que ocurre después de haber entrado al espacio.

---

## 15. ANTES DE ENTRAR AL ESPACIO RVSM

**ID:** R15 · **Tiempo:** 6 min

### ¿Qué es?

La verificación que se hace en el ascenso, antes de cruzar FL 290. Es el momento en que se confirma que lo que se comprobó en tierra sigue siendo cierto.

### Lo que debe saber el piloto

La FAA lo resume en una regla y una lista.

**La regla:** si cualquiera del equipo requerido falla **antes** de entrar en espacio RVSM, el piloto debe **solicitar una nueva autorización para evitar el vuelo en ese espacio**. No se entra a ver si se resuelve.

**La lista** de lo que debe estar operando normalmente al entrar:

1. Dos sistemas primarios de medición de altitud.
2. Un sistema automático de control de altitud.
3. Un dispositivo de alerta de altitud.

Y la nota que la acompaña: el requisito de transpondedor operativo y de TCAS hay que averiguarlo para cada área RVSM donde se vaya a operar.

### En operación de aerolínea

El ascenso a crucero es un momento cargado: cambio de frecuencia, ajuste de altímetros en la transición, aceleración, retracción. La verificación RVSM se engancha ahí y por eso conviene tenerla como una secuencia corta y siempre igual.

#### Resumen educativo: seguir siempre el SOP, el FCOM y el QRH del operador

Esta secuencia no sustituye ninguna lista de chequeo certificada. Es un orden mental para estudiar:

1. **Capacidad**: el avión sigue siendo RVSM capable, con lo que traiga diferido.
2. **Sistemas**: los tres requeridos, operando normalmente.
3. **Altímetros**: 1013,25 hPa puesto, y las primarias coincidiendo.
4. **Mantenimiento del nivel**: el sistema automático operativo y listo para acoplarse.
5. **Reporte de altitud**: transpondedor reportando, alimentado por la fuente que gobierna el avión.
6. **Meteorología**: turbulencia u onda de montaña previstas en el tramo.
7. **Autorización**: el nivel autorizado, colacionado y verificado por los dos pilotos.

### ¿Qué verifica la tripulación?

Los siete puntos anteriores, con especial cuidado en los tres primeros, que son los que la norma exige de forma explícita.

### ¿Qué pasa si falla?

Antes de entrar, la respuesta es sencilla y no admite matices: se pide una autorización que evite el espacio RVSM. La diferencia con lo que ocurre dentro es importante y se pregunta en entrevista: **antes se evita entrar; dentro se comunica y se coordina la salida**.

### Comunicación ATC

Si algo falla antes de entrar, se solicita nueva autorización para no entrar. No se usa *unable RVSM due equipment*, que es la fraseología para después de la entrada.

### Error frecuente

Entrar igual «porque ya casi estamos en nivel» y resolverlo arriba. La norma pide lo contrario: si falla antes, no se entra.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Perfil de ascenso de izquierda a derecha, con una aeronave subiendo hacia el crucero. Una línea horizontal de trazo grueso cruzando el perfil, rotulada «FL 290 · PUERTA DE ENTRADA RVSM». Justo antes de esa línea, un recuadro vertical con la secuencia de verificación numerada del 1 al 7, en texto corto. Al pie del recuadro, en tipografía menor y en cursiva: «Resumen educativo: seguir siempre el SOP, el FCOM y el QRH del operador». A la derecha de la línea, en el espacio RVSM, la aeronave ya nivelada.

OBJETIVO:
Fijar que la capacidad se confirma ANTES de cruzar la puerta, y que lo que ocurre después ya se gestiona con otras reglas.

### En pocas palabras

- Si el equipo requerido falla antes de entrar, se solicita autorización para evitar el espacio RVSM.
- Deben operar normalmente: dos primarios de altitud, un control automático y una alerta de altitud.
- El requisito de transpondedor y TCAS depende del área.
- Antes se evita entrar; dentro se comunica y se coordina la salida.

### Quiz · Capítulo 15

**r15-q1** · Durante el ascenso, antes de FL 290, falla un equipo requerido para RVSM. ¿Qué corresponde?
- A) Entrar y comunicar *unable RVSM due equipment* en el primer contacto.
- B) Solicitar una nueva autorización para evitar el vuelo en espacio RVSM.
- C) Entrar y aumentar la frecuencia de los chequeos altimétricos.
- D) Continuar el ascenso hasta FL 410 para salir del espacio por arriba.
**Correcta:** B · **Tema:** R15 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.3
**Explicación:** Si el equipo requerido falla antes de entrar, el piloto debe solicitar una nueva autorización para evitar el vuelo en ese espacio. *Unable RVSM due equipment* es la comunicación para las fallas que ocurren después de haber entrado.

**r15-q2** · ¿Qué equipo debe estar operando normalmente al entrar en espacio RVSM?
- A) Dos primarios de altitud, un control automático de altitud y una alerta de altitud.
- B) Dos primarios de altitud, dos transpondedores y un TCAS II.
- C) Un primario, un altímetro de reserva y el control automático.
- D) Los cuatro sistemas RVSM más el radar meteorológico.
**Correcta:** A · **Tema:** R15 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.3
**Explicación:** La AC enumera exactamente esos tres. El requisito de transpondedor operativo y de TCAS hay que averiguarlo por separado para cada área RVSM donde se pretenda operar.

**r15-q3** · ¿Qué diferencia hay entre una falla antes de entrar y una falla ya dentro del espacio RVSM?
- A) Ninguna: en ambos casos se comunica *unable RVSM due equipment*.
- B) Antes se evita entrar; dentro se comunica al ATC y se coordina la salida.
- C) Antes se comunica al ATC; dentro se resuelve con el QRH sin comunicar.
- D) Antes se declara emergencia; dentro basta con vigilar la altitud.
**Correcta:** B · **Tema:** R15 · **Referencia:** FAA AC 91-85B, Apéndice B, numerales B.3.3 y B.3.6
**Explicación:** Antes de la entrada, la norma pide solicitar una autorización que evite el espacio. Ya dentro, la tripulación debe solicitar una nueva autorización tan pronto la situación lo permita y, si no hay autorización disponible o la urgencia lo exige, notificar al ATC su acción y el procedimiento de contingencia aplicado.

---
# BLOQUE 4 · DENTRO DEL ESPACIO RVSM

---

## 16. OPERAR DENTRO DE RVSM

**ID:** R16 · **Tiempo:** 6 min

### ¿Qué es?

Lo que la tripulación hace mientras está establecida en el espacio. La FAA lo recoge en diez puntos que conviene conocer completos, porque juntos desmontan la idea de que RVSM es «acoplar y olvidarse».

### Lo que debe saber el piloto

#### Volar el nivel autorizado

En crucero nivelado es esencial que la aeronave vuele el nivel autorizado. Eso exige particular cuidado en que las autorizaciones del ATC se entiendan por completo y se cumplan. **Salvo en contingencia o emergencia, la aeronave no debe apartarse intencionalmente del nivel autorizado sin autorización positiva del ATC.**

#### Poner 1013,25 sin demora

Énfasis en ajustar la subescala de todos los altímetros, primarios y de reserva, a 29,92 inHg / 1013,25 hPa al subir por la altitud de transición, y volver a comprobar el ajuste al llegar al primer nivel autorizado.

#### Nivelar sin pasarse

En transiciones autorizadas entre niveles, no sobrepasar ni quedarse corto más de 150 ft, y usar la función de captura de altitud del sistema automático si está instalada.

#### El automático, acoplado

Operativo y acoplado en crucero nivelado, salvo retrimado o turbulencia. La altitud se sigue por uno de los dos primarios.

#### La alerta, operativa

Debe estarlo.

#### Los altímetros, comparados

Primarias dentro de 200 ft en crucero, chequeo con la de reserva cada hora aproximadamente, y anotar la diferencia.

#### El reporte, de la fuente correcta

El sistema que gobierna el avión alimenta el transpondedor.

#### Si el ATC avisa de una desviación

Si el ATC notifica una desviación de altitud asignada (AAD) **igual o superior a 300 ft (90 m)**, el piloto debe actuar para **regresar al nivel autorizado tan rápido como sea posible**.

### En operación de aerolínea

En crucero estable esto es casi todo pasivo: el avión se queda donde está y el barrido de instrumentos basta. Se vuelve activo en tres momentos: al nivelar, al cambiar de nivel y cuando el ATC llama por la altitud.

### ¿Qué verifica la tripulación?

De forma continua: nivel autorizado contra altitud real, estado del automático, coincidencia de los altímetros. Y periódicamente, el chequeo con el altímetro de reserva.

### Error frecuente

«RVSM es acoplar el automático y olvidarse de la altitud.» La propia norma pide lo contrario: aun con el automático acoplado, la adherencia al nivel se hace por referencia a uno de los primarios.

### En pocas palabras

- No apartarse del nivel autorizado sin autorización positiva del ATC, salvo contingencia o emergencia.
- 1013,25 hPa sin demora en la transición, y recomprobar al nivelar.
- Nivelaciones dentro de 150 ft; automático acoplado; alerta operativa.
- Si el ATC reporta AAD de 300 ft o más: volver al nivel autorizado lo antes posible.

### Quiz · Capítulo 16

**r16-q1** · En crucero RVSM, ¿bajo qué condición puede la aeronave apartarse del nivel autorizado?
- A) Cuando el piloto lo considere conveniente para el confort de los pasajeros.
- B) Cuando el TCAS muestre tráfico en el nivel adyacente.
- C) Solo con autorización positiva del ATC, salvo contingencia o emergencia.
- D) Cuando la turbulencia sea ligera y no afecte la separación.
**Correcta:** C · **Tema:** R16 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 3
**Explicación:** Salvo en situaciones de contingencia o emergencia, la aeronave no debe apartarse intencionalmente del nivel autorizado sin autorización positiva del ATC. Una resolución del TCAS es precisamente uno de esos casos excepcionales, y tiene su propio capítulo.

**r16-q2** · El ATC te informa de una desviación de altitud asignada de 350 ft. ¿Qué debes hacer?
- A) Anotarlo y corregir en el siguiente cambio de nivel.
- B) Regresar al nivel autorizado tan rápido como sea posible.
- C) Declarar *unable RVSM due equipment* y salir del espacio.
- D) Solicitar un nivel 1.000 ft por encima para recuperar margen.
**Correcta:** B · **Tema:** R16 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 10
**Explicación:** Si el ATC notifica una AAD igual o superior a 300 ft, el piloto debe tomar acción para volver al nivel autorizado lo más rápido posible. Después vendrá comprobar indicaciones e identificar la causa, pero lo primero es recuperar el nivel.

**r16-q3** · Con el piloto automático acoplado en crucero RVSM, ¿cómo se sigue la altitud?
- A) Basta con el automático: por eso es requisito.
- B) Por referencia a uno de los dos altímetros primarios.
- C) Por el altímetro de reserva, que es independiente.
- D) Por la predicción de altitud del FMS.
**Correcta:** B · **Tema:** R16 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 5
**Explicación:** La AC lo dice en la misma frase en que exige el automático acoplado: en cualquier caso, la adherencia a la altitud de crucero debe hacerse por referencia a uno de los dos altímetros primarios. El automático mantiene; el piloto vigila.

---

## 17. DESVIACIÓN DE NIVEL Y AAD

**ID:** R17 · **Tiempo:** 6 min

### ¿Qué es?

Una desviación de nivel es apartarse del nivel autorizado. En RVSM se mide con una magnitud concreta: la **desviación de altitud asignada (AAD)**, que es la diferencia entre la altitud que transmite el transpondedor en modo C y la altitud o nivel asignado.

### Lo que debe saber el piloto

Conviene separar tres magnitudes que se confunden y que en entrevista se preguntan juntas:

| Magnitud | Qué compara | Quién la ve |
|---|---|---|
| **AAD** · desviación de altitud asignada | Lo que el transpondedor transmite contra el nivel asignado | El ATC, en su pantalla |
| **ASE** · error del sistema altimétrico | La altitud mostrada a la tripulación (con 1013,25) contra la presión real | Nadie a bordo, en tiempo real |
| **TVE** · error vertical total | La altitud de presión que el avión vuela de verdad contra la asignada | El sistema de monitorización |

La relación es sencilla de decir: el TVE es lo que de verdad separa al avión de su nivel. La AAD es lo que se ve desde tierra. El ASE es la parte del error que ningún instrumento de la cabina delata, porque está en la medición misma.

#### Los umbrales que se reportan e investigan

La FAA fija los errores de mantenimiento de altitud que deben reportarse e investigarse:

- **TVE igual o mayor que ±300 ft** (±90 m).
- **ASE igual o mayor que ±245 ft** (±75 m).
- **AAD igual o mayor que ±300 ft** (±90 m).

Y el plazo: el operador debe reportar el evento a la autoridad **dentro de las 72 horas**, con un análisis inicial de los factores causales y las medidas para evitar que se repita.

### En operación de aerolínea

Para la tripulación esto se traduce en dos cosas. La primera, que 300 ft es la cifra que hay que tener en la cabeza: es cuando el ATC llama y es cuando el evento se reporta. La segunda, que la incidencia de estos errores es muy pequeña y que cada uno se investiga; no son rutina.

### ¿Qué verifica la tripulación?

Que la altitud real coincide con la autorizada, de forma continua. Y si hay desviación: corregir primero, entender después.

### ¿Qué pasa si falla?

Una desviación de 300 ft o más entra en el terreno de lo reportable. La FAA advierte además de algo que conviene saber para una entrevista: un operador que comete errores de mantenimiento de altitud puede llegar a perder la autoridad para operaciones RVSM.

### Comunicación ATC

Si el ATC llama, se corrige y se responde. Si la tripulación detecta la desviación antes, se corrige y se informa.

### Error frecuente

Usar «altitude deviation», «level bust» y «large height deviation» como sinónimos. Se parecen y no son lo mismo: lo aclara el capítulo 19.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Esquema de una sola aeronave en crucero con tres líneas horizontales de referencia, separadas verticalmente y rotuladas con claridad. Línea 1, continua y gruesa: «NIVEL ASIGNADO · FL 350». Línea 2, punteada: «ALTITUD QUE EL AVIÓN VUELA DE VERDAD». Línea 3, de trazo y punto: «ALTITUD QUE EL TRANSPONDEDOR TRANSMITE». Tres acotaciones verticales entre las líneas, cada una con su sigla y su significado en una palabra: entre 1 y 3, «AAD · lo que ve el ATC»; entre 1 y 2, «TVE · la separación real que se pierde»; entre 2 y 3, «ASE · el error de medición, invisible en cabina».

OBJETIVO:
Que el piloto pueda dibujar de memoria la diferencia entre AAD, TVE y ASE, que es una de las preguntas de entrevista que más separa a los candidatos.

### En pocas palabras

- AAD: lo transmitido contra lo asignado. Es lo que ve el ATC.
- TVE: lo volado de verdad contra lo asignado. Es la separación que realmente se pierde.
- ASE: el error de la medición. No se ve en cabina.
- Se reportan e investigan: TVE o AAD de ±300 ft o más, y ASE de ±245 ft o más, dentro de 72 horas.

### Quiz · Capítulo 17

**r17-q1** · ¿Qué es exactamente la desviación de altitud asignada (AAD)?
- A) La diferencia entre los dos altímetros primarios.
- B) La diferencia entre la altitud transmitida por el transpondedor y la asignada.
- C) La diferencia entre la altitud real y la que muestra el altímetro.
- D) La diferencia entre el nivel autorizado y el nivel óptimo de crucero.
**Correcta:** B · **Tema:** R17 · **Referencia:** FAA AC 91-85B, Apéndice A, definición 7
**Explicación:** La AAD compara lo que el transpondedor transmite en modo C con la altitud o nivel asignado. Es la magnitud que el ATC observa. La diferencia entre altitud real y mostrada es el ASE, y el error vertical total contra el nivel asignado es el TVE.

**r17-q2** · ¿A partir de qué valores se reportan e investigan los errores de mantenimiento de altitud, según la FAA?
- A) TVE o AAD de ±150 ft y ASE de ±100 ft.
- B) TVE o AAD de ±300 ft y ASE de ±245 ft.
- C) TVE, AAD y ASE, todos de ±200 ft.
- D) Solo el TVE, a partir de ±500 ft.
**Correcta:** B · **Tema:** R17 · **Referencia:** FAA AC 91-85B, numeral 5.10.1
**Explicación:** Los errores que deben reportarse e investigarse son TVE igual o mayor que ±300 ft, ASE igual o mayor que ±245 ft y AAD igual o mayor que ±300 ft. El operador reporta el evento dentro de las 72 horas con un análisis inicial de causas.

**r17-q3** · ¿Cuál de estas magnitudes no puede detectarse desde la cabina en tiempo real?
- A) La AAD, porque solo la ve el ATC.
- B) El TVE, porque exige medición externa.
- C) El ASE, porque está en la medición misma de la altitud.
- D) Ninguna: las tres se leen en el PFD.
**Correcta:** C · **Tema:** R17 · **Referencia:** FAA AC 91-85B, Apéndice A, definición 4; numeral 4.3.1
**Explicación:** El ASE es la diferencia entre la altitud de presión mostrada a la tripulación con 1013,25 hPa y la altitud de presión real. Como el error está en la propia medición, no aparece en la indicación: el instrumento muestra con confianza un valor equivocado. Por eso el sistema se apoya en la comparación entre fuentes y en la monitorización externa.

---

## 18. LARGE HEIGHT DEVIATION

**ID:** R18 · **Tiempo:** 5 min

### ¿Qué es?

Una desviación vertical grande respecto del nivel autorizado, de las que el sistema de vigilancia de RVSM registra y estudia. Es conocimiento avanzado y aparece en entrevistas de aerolínea.

### Lo que debe saber el piloto

#### Por qué se vigilan

RVSM funciona porque el riesgo de colisión vertical se mantiene por debajo de un objetivo de seguridad. Ese objetivo no se comprueba una vez: se vigila de forma continua, contando y analizando las desviaciones grandes que ocurren de verdad en el espacio aéreo.

#### De dónde salen

Las causas que se repiten, y ninguna es exótica:

- **Error de coordinación entre dependencias ATC.**
- **Desviación del piloto**: nivel mal entendido, mal seleccionado o no vigilado.
- **Turbulencia**, que impide mantener el nivel.
- **Problema de equipo**, incluida una falla altimétrica.
- **Interpretación incorrecta de la autorización**, que es la causa con más historia detrás.

#### Quién las sigue

Cada región tiene su agencia de monitorización. En Sudamérica y el Caribe es **CARSAMMA**, y el RAC colombiano la nombra expresamente al tratar RVSM (RAC 211, numeral 211.530).

> **Verificar antes de dar cifras regionales.** El umbral numérico exacto que cada agencia regional usa para clasificar una desviación como *large height deviation*, y el procedimiento de reporte asociado, hay que tomarlos del documento regional vigente y del AIP del Estado. Este módulo no los inventa. Lo que sí está verificado, y es de la FAA, son los umbrales de reporte e investigación del capítulo 17: TVE o AAD de ±300 ft y ASE de ±245 ft.

### En operación de aerolínea

Al piloto no le toca el trámite entre agencias. Le toca entender que **lo que pasa en su cabina se cuenta**: una desviación grande no se queda en el avión, entra en una estadística que sostiene (o retira) la aprobación RVSM de su operador.

### ¿Qué verifica la tripulación?

Nada específico aquí. La contribución de la tripulación a este capítulo es no generar desviaciones y reportar las que ocurran.

### Error frecuente

Pensar que una desviación grande sin consecuencias (sin tráfico cerca, sin llamada del ATC) es un no-evento. Se cuenta igual, y precisamente por eso el sistema puede seguir siendo seguro.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Dos aeronaves en crucero, vista lateral, en niveles RVSM adyacentes. La superior, estable, rotulada «FL 360 · nivel autorizado y mantenido». La inferior, rotulada «FL 350 · nivel autorizado», dibujada por encima de su línea de nivel y ascendiendo. Tres elementos acotados con claridad: una línea punteada horizontal en FL 350 rotulada «NIVEL AUTORIZADO»; la posición real del avión rotulada «NIVEL REAL»; y una acotación vertical entre ambas rotulada «DESVIACIÓN VERTICAL». A la derecha, la separación que queda entre los dos aviones, acotada y rotulada «margen real restante», visiblemente menor que los 1.000 ft nominales.

OBJETIVO:
Mostrar que una desviación vertical no es un error abstracto: se come el margen que separa a dos aviones reales.

### En pocas palabras

- Una desviación grande de altitud es la que el sistema de vigilancia RVSM registra y estudia.
- Causas típicas: coordinación ATC, desviación del piloto, turbulencia, equipo o mala interpretación de la autorización.
- En Sudamérica y el Caribe, la agencia de monitorización es CARSAMMA, nombrada en el RAC 211.
- Los umbrales regionales exactos se consultan en la documentación vigente; los de la FAA son ±300 ft de TVE o AAD.

### Quiz · Capítulo 18

**r18-q1** · ¿Por qué se vigilan las desviaciones verticales grandes en espacio RVSM?
- A) Para sancionar a las tripulaciones que las cometen.
- B) Porque la seguridad del sistema se comprueba de forma continua con lo que ocurre de verdad.
- C) Porque el ATC necesita justificar los cambios de nivel que emite.
- D) Porque sirven para recalcular el rango de niveles RVSM de cada región.
**Correcta:** B · **Tema:** R18 · **Referencia:** OACI Doc 9574; RAC 211, numeral 211.530
**Explicación:** RVSM se sostiene sobre un objetivo de seguridad que no se comprueba una sola vez: se vigila contando y analizando las desviaciones reales. Por eso existen agencias regionales de monitorización, como CARSAMMA en Sudamérica y el Caribe.

**r18-q2** · ¿Cuál de estas no es una causa típica de desviación vertical grande?
- A) Error de coordinación entre dependencias ATC.
- B) Interpretación incorrecta de la autorización.
- C) Turbulencia que impide mantener el nivel.
- D) Uso del piloto automático en modo de mantenimiento de altitud.
**Correcta:** D · **Tema:** R18 · **Referencia:** FAA AC 91-85B, numeral 5.10.2
**Explicación:** Las causas se agrupan en fallas de equipo y errores operacionales: coordinación ATC, desviación del piloto, turbulencia, problema de equipo o mala interpretación de la autorización. Usar el mantenimiento automático de altitud es justamente lo que la norma exige para evitarlas.

**r18-q3** · ¿Qué agencia de monitorización nombra el RAC colombiano al tratar RVSM?
- A) EUROCONTROL.
- B) CARSAMMA.
- C) La NTSB.
- D) La propia Aerocivil, sin agencia regional.
**Correcta:** B · **Tema:** R18 · **Referencia:** RAC 211, numeral 211.530
**Explicación:** El RAC 211 establece la separación de 1.000 ft entre FL 290 y FL 410 con monitoreo de la agencia regional CARSAMMA, que cubre Sudamérica y el Caribe.

---
## 19. LEVEL BUST: TRES TÉRMINOS QUE NO SON SINÓNIMOS

**ID:** R19 · **Tiempo:** 5 min

### ¿Qué es?

Tres términos que se usan como si fueran lo mismo y no lo son. Distinguirlos es una pregunta de entrevista frecuente.

### Lo que debe saber el piloto

| Término | Qué es | Dónde vive |
|---|---|---|
| **Altitude deviation** | Apartarse del nivel autorizado, en cualquier magnitud | Descripción general de lo que ocurre |
| **Level bust** | Pasarse del nivel autorizado, normalmente por error humano en la cadena de la autorización | Lenguaje operacional y de seguridad |
| **Large height deviation** | Una desviación vertical grande, que el sistema de vigilancia RVSM registra y estudia | Monitorización del sistema |

Dicho corto: toda desviación es una desviación; un level bust es una desviación **causada por un error en la cadena autorización–selección–ejecución**; una desviación grande es la que además **entra en la estadística** que sostiene el sistema.

#### Dónde se rompe la cadena

Un level bust casi nunca nace en el aire: nace en la comunicación.

- La autorización se oye mal.
- La colación se hace de memoria y no de lo que se oyó.
- El nivel se selecciona mal en el panel.
- Nadie verifica lo seleccionado contra lo autorizado.
- Se pone el nivel correcto y luego se cambia sin que el otro piloto lo sepa.

#### Las defensas

- **Colación completa** de la autorización de nivel.
- **Verificación cruzada** del nivel seleccionado en el panel contra lo autorizado.
- **Llamadas de altitud** al aproximarse al nivel.
- **Vigilancia** de la captura y del nivel una vez establecido.
- **CRM**: que el otro piloto pueda decirlo y lo diga.

### En operación de aerolínea

El momento de más riesgo no es el crucero: es el cambio de nivel, y sobre todo cuando llega en una frecuencia cargada, durante otra tarea, o justo cuando se está hablando con la cabina de pasajeros.

### Error frecuente

Decir en una entrevista que un level bust es «lo mismo que una desviación de altitud, pero más grande». La diferencia no es de tamaño: es de causa.

### En pocas palabras

- Altitude deviation: apartarse del nivel autorizado, en general.
- Level bust: desviación por error en la cadena autorización–selección–ejecución.
- Large height deviation: desviación grande que el sistema registra y estudia.
- Las defensas son de comunicación, no de pilotaje.

### Quiz · Capítulo 19

**r19-q1** · ¿Cuál es la diferencia esencial entre una desviación de altitud y un level bust?
- A) El tamaño: un level bust supera siempre los 300 ft.
- B) La causa: el level bust nace de un error en la cadena de la autorización.
- C) El espacio: el level bust solo ocurre dentro de RVSM.
- D) Quién lo detecta: el level bust lo detecta siempre el ATC.
**Correcta:** B · **Tema:** R19 · **Referencia:** FAA AC 91-85B, numeral 5.10.2
**Explicación:** La FAA agrupa los errores de mantenimiento de altitud en fallas de equipo y errores operacionales. El level bust pertenece a los segundos: la desviación se origina en oír, colacionar, seleccionar o verificar mal el nivel, no en la magnitud del apartamiento.

**r19-q2** · ¿Cuál de estas defensas actúa antes de que el avión se mueva?
- A) La alerta de altitud.
- B) La llamada del ATC informando la desviación.
- C) La verificación cruzada del nivel seleccionado contra el autorizado.
- D) La resolución del TCAS.
**Correcta:** C · **Tema:** R19 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 3
**Explicación:** Verificar que lo seleccionado coincide con lo autorizado ocurre antes de que el avión inicie nada. La alerta de altitud, la llamada del ATC y la resolución del TCAS actúan cuando la desviación ya existe.

**r19-q3** · ¿En qué momento del vuelo es mayor el riesgo de level bust?
- A) En el crucero estable, por la monotonía.
- B) En los cambios de nivel, sobre todo con frecuencia cargada o durante otra tarea.
- C) En el ascenso inicial, antes de la altitud de transición.
- D) En la aproximación final, por la carga de trabajo.
**Correcta:** B · **Tema:** R19 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 4
**Explicación:** El cambio de nivel es donde se concentra la cadena completa: oír, colacionar, seleccionar, verificar, ejecutar y vigilar la captura. Por eso la norma pone un límite explícito al sobrepaso (150 ft) y recomienda nivelar con la función de captura del sistema automático.

---

## 20. CRM: LA CADENA QUE EVITA EL LEVEL BUST

**ID:** R20 · **Tiempo:** 5 min

### ¿Qué es?

Cómo se reparten el piloto que vuela (PF) y el que monitoriza (PM) las tareas que sostienen el nivel. Es el capítulo que convierte RVSM en algo que se hace entre dos.

### Lo que debe saber el piloto

La cadena, en orden, y con un responsable en cada eslabón:

1. **El ATC emite la autorización.** Los dos escuchan.
2. **El PM colaciona**, y colaciona lo que oyó, no lo que esperaba oír.
3. **Se selecciona la altitud** en el panel de control de modos.
4. **Se verifica de forma cruzada**: el otro piloto mira el panel y confirma contra la autorización.
5. **Se ejecuta** el ascenso o descenso.
6. **Se nivela**, preferiblemente con la captura automática, dentro de 150 ft.
7. **Se vigila** que el nivel se mantiene.

El eslabón que más se salta es el cuarto. Es el único que no produce ningún efecto visible si se hace bien, y por eso es el primero que desaparece cuando hay prisa.

#### Lo que cada uno aporta

- **PF**: vuela, ejecuta y confirma lo seleccionado.
- **PM**: escucha, colacione, selecciona, verifica y vigila, y es quien tiene libertad para decir «eso no es lo que nos dieron».

### En operación de aerolínea

La diferencia entre una tripulación que evita el level bust y una que lo comete casi nunca está en la habilidad: está en si la verificación cruzada se hizo o se dio por hecha.

### Error frecuente

Creer que colacionar equivale a verificar. Colacionar es repetir al ATC; verificar es comprobar que el panel dice lo mismo que la autorización. Son dos actos distintos y se pueden hacer mal por separado.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Diagrama de flujo vertical, de arriba hacia abajo, con siete bloques conectados por flechas y una etiqueta de responsable a la derecha de cada uno. Bloque 1: «AUTORIZACIÓN ATC»: los dos escuchan. Bloque 2: «COLACIÓN»: PM. Bloque 3: «SELECCIÓN DE ALTITUD»: PM. Bloque 4, destacado con borde más grueso y color: «VERIFICACIÓN CRUZADA»: PF y PM, con una nota al lado: «el eslabón que más se salta». Bloque 5: «EJECUCIÓN»: PF. Bloque 6: «NIVELACIÓN · dentro de 150 ft»: PF. Bloque 7: «VIGILANCIA DEL NIVEL»: los dos.

OBJETIVO:
Mostrar que evitar un level bust es una secuencia con responsables, no una cuestión de atención individual, y señalar visualmente cuál es el eslabón débil.

### En pocas palabras

- La cadena es: autorización, colación, selección, verificación cruzada, ejecución, nivelación y vigilancia.
- El eslabón que más se salta es la verificación cruzada.
- Colacionar y verificar son dos actos distintos.
- El PM es quien tiene que poder decir «eso no es lo que nos dieron».

### Quiz · Capítulo 20

**r20-q1** · ¿Cuál es la diferencia entre colacionar y verificar?
- A) Ninguna: colacionar ya incluye la verificación.
- B) Colacionar es repetir al ATC; verificar es comprobar el panel contra la autorización.
- C) Colacionar lo hace el PF y verificar el PM, pero es el mismo acto.
- D) Verificar solo aplica en cambios de nivel dentro de RVSM.
**Correcta:** B · **Tema:** R20 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 3
**Explicación:** Son dos actos separados que pueden fallar por separado: se puede colacionar correctamente y seleccionar mal, o seleccionar bien y colacionar mal. La norma exige que las autorizaciones se entiendan por completo y se cumplan, y eso requiere las dos cosas.

**r20-q2** · ¿Cuál es el eslabón que con más frecuencia se omite en la cadena?
- A) La colación de la autorización.
- B) La ejecución del cambio de nivel.
- C) La verificación cruzada del nivel seleccionado.
- D) La vigilancia del nivel una vez establecido.
**Correcta:** C · **Tema:** R20 · **Referencia:** FAA AC 91-85B, numeral 5.10.2
**Explicación:** Es el único eslabón que no produce ningún efecto visible cuando se hace bien, y por eso es el primero que se sacrifica con carga de trabajo. Los errores operacionales de mantenimiento de altitud se concentran justamente ahí.

**r20-q3** · Durante un cambio de nivel, el PM detecta que el panel no coincide con la autorización. ¿Qué corresponde?
- A) Esperar a que el avión nivele y corregir entonces.
- B) Decirlo de inmediato y corregir antes de continuar.
- C) Colacionar de nuevo al ATC para confirmar.
- D) Anotarlo para el reporte de postvuelo.
**Correcta:** B · **Tema:** R20 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 3
**Explicación:** La discrepancia se corrige antes de que el avión siga moviéndose hacia un nivel equivocado. Si además hay duda sobre lo autorizado, se confirma con el ATC, pero lo primero es detener la ejecución de algo que no coincide con la autorización.

---

## 21. MIL PIES NO ES MUCHO

**ID:** R21 · **Tiempo:** 4 min

### ¿Qué es?

Un capítulo corto con un solo objetivo: que el piloto tenga conciencia física de lo que significan 1.000 ft cuando el otro avión está justo ahí.

### Lo que debe saber el piloto

Con 2.000 ft de separación, una desviación de 300 ft se come el 15 % del margen. Con 1.000 ft, se come el 30 %. Y si los dos aviones se desvían el uno hacia el otro, el margen restante es de 400 ft.

Cuatrocientos pies, entre dos reactores que se cruzan a velocidades de crucero, es muy poco.

#### Por eso las cifras del módulo son las que son

Ahora se entiende de dónde salen los números que han ido apareciendo:

- **±65 ft**: lo que el sistema automático mantiene en condiciones normales. Menos del 7 % del margen.
- **150 ft**: el sobrepaso máximo admitido al nivelar. El 15 %.
- **200 ft**: el límite de discrepancia entre primarias en crucero. El 20 %.
- **300 ft**: cuando el ATC llama y cuando el evento se reporta. El 30 %.

La escala no es arbitraria. Cada cifra es una fracción del único margen que hay.

### En operación de aerolínea

Esto es lo que explica por qué una llamada del ATC por 300 ft no es una formalidad, y por qué la norma pide volver al nivel «tan rápido como sea posible» y no «cuando convenga».

### Error frecuente

Razonar en porcentajes de altitud en vez de en fracciones del margen. Trescientos pies sobre FL 350 es menos del 1 % de la altitud, y suena a nada. Pero es el 30 % de lo que te separa del tráfico de arriba.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Dos aeronaves enfrentadas verticalmente, en vista lateral y a escala. Aeronave A en FL 350, aeronave B en FL 360, con la separación nominal acotada entre ambas: «1.000 ft». A la derecha, la misma escena repetida con la aeronave A desplazada 300 ft hacia arriba: la acotación entre las dos ahora marca «700 ft», y la porción consumida aparece sombreada en rojo apagado con la etiqueta «30 % del margen». Debajo, una tercera escena con las dos desviándose una hacia la otra 300 ft cada una y la acotación marcando «400 ft».

OBJETIVO:
Dar conciencia visual e inmediata de que una desviación que parece pequeña respecto a la altitud es enorme respecto al margen.

### En pocas palabras

- Una desviación de 300 ft consume el 30 % del margen de 1.000 ft.
- Si los dos aviones se desvían uno hacia el otro, quedan 400 ft.
- Las cifras del módulo (65, 150, 200, 300 ft) son fracciones de ese único margen.
- No se razona en porcentaje de altitud: se razona en porcentaje de separación.

### Quiz · Capítulo 21

**r21-q1** · Una aeronave en FL 350 se desvía 300 ft hacia arriba y otra en FL 360 mantiene su nivel. ¿Qué margen vertical queda?
- A) 1.000 ft: la separación asignada no cambia.
- B) 700 ft.
- C) 400 ft.
- D) 300 ft.
**Correcta:** B · **Tema:** R21 · **Referencia:** FAA AC 91-85B, Apéndice A, definición 15
**Explicación:** Con una sola aeronave desviada 300 ft, el margen real baja de 1.000 a 700 ft: se consume el 30 %. Los 400 ft corresponderían al caso en que ambas se desvían 300 ft una hacia la otra.

**r21-q2** · ¿Por qué 300 ft es una cifra importante en RVSM?
- A) Porque es el límite de discrepancia entre los altímetros primarios.
- B) Porque es el sobrepaso máximo admitido al nivelar.
- C) Porque es cuando el ATC llama y cuando el evento se reporta e investiga.
- D) Porque es la tolerancia del sistema automático de control de altitud.
**Correcta:** C · **Tema:** R21 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 10; numeral 5.10.1
**Explicación:** Si el ATC notifica una AAD igual o superior a 300 ft, el piloto debe volver al nivel autorizado lo antes posible, y ese mismo valor es el umbral de reporte e investigación para TVE y AAD. Los 200 ft son la discrepancia entre primarias, los 150 ft el sobrepaso al nivelar y los 65 ft la tolerancia de diseño del automático.

**r21-q3** · Tu compañero dice que 300 ft sobre FL 350 «es menos del 1 %, no es nada». ¿Qué le respondes?
- A) Que tiene razón si el avión está estable.
- B) Que la referencia correcta no es la altitud, sino el margen de separación.
- C) Que solo importa si hay tráfico en el nivel adyacente.
- D) Que la cifra relevante es el 1 % del nivel de vuelo.
**Correcta:** B · **Tema:** R21 · **Referencia:** FAA AC 91-85B, Apéndice A, definición 15
**Explicación:** Respecto a la altitud, 300 ft es despreciable. Respecto a los 1.000 ft que lo separan del tráfico de arriba, es el 30 % del margen. En RVSM la referencia siempre es la separación, no la altitud.

---
## 22. TURBULENCIA Y ONDA DE MONTAÑA

**ID:** R22 · **Tiempo:** 7 min

### ¿Qué es?

Las dos condiciones meteorológicas que pueden impedir mantener el nivel. En RVSM tienen tratamiento propio porque afectan directamente lo único que el sistema no puede ceder: el *height keeping*.

### Lo que debe saber el piloto

#### La cifra que activa el procedimiento

La FAA fija un disparador concreto: turbulencia severa o actividad de onda de montaña que induzca **desviaciones de altitud de aproximadamente 200 ft o más**. A partir de ahí, la secuencia es:

- Contactar al ATC y declarar **«Unable RVSM due [causa]»**, por ejemplo turbulencia u onda de montaña.
- Si el controlador no lo ofrece, **solicitar vector libre de tráfico en los niveles adyacentes**.
- Si se desea, solicitar cambio de nivel o desvío de ruta.
- **Reportar la localización y la magnitud** de la turbulencia o la onda al ATC.

Por su parte, el controlador vectoriza para evitar que el eco se funda con tráfico de niveles adyacentes cuando el tráfico lo permite, avisa del tráfico en conflicto, emite cambio de nivel o desvío si puede, y difunde el reporte a otras aeronaves.

#### Onda de montaña, sin llegar a esa cifra

La FAA aclara que un encuentro con onda de montaña **no necesariamente produce desviaciones del orden de 200 ft**. Para los encuentros menos significativos, la acción es más simple: contactar al ATC y reportar que se está experimentando onda de montaña, solicitar cambio de nivel o desvío si se desea, y reportar localización y magnitud.

#### Por qué la onda de montaña merece capítulo

Es un flujo ondulatorio que se forma cuando el viento cruza una cordillera con determinada estabilidad y perfil. Para el piloto importan tres cosas y solo tres:

- **Reconocerla**: variaciones verticales persistentes, cambios de viento, a veces turbulencia asociada, en zonas de relieve y con viento perpendicular a la cordillera.
- **Su efecto**: puede producir variaciones verticales importantes que comprometen el mantenimiento del nivel aunque el avión esté sano y el automático acoplado.
- **Qué hacer**: comunicar, pedir lo que haga falta y reportar.

En Colombia esto no es teórico: la ruta entre la costa y el interior y los cruces de las tres cordilleras son terreno propicio, y el nivel de crucero de un vuelo doméstico está justo en la franja donde la onda se nota.

### En operación de aerolínea

La diferencia entre un piloto entrenado y uno que no lo está se ve aquí. El no entrenado pelea con el nivel en silencio. El entrenado dice *unable RVSM due turbulence*, pide vector y deja de ser una sorpresa para el ATC y para los aviones de arriba y abajo.

### ¿Qué verifica la tripulación?

La magnitud de las desviaciones. Los 200 ft son la referencia para decidir si esto es «turbulencia» o es una situación que hay que comunicar como incapacidad temporal.

### ¿Qué pasa si falla?

Si no se comunica, el ATC sigue separando 1.000 ft a un avión que no puede garantizarlos.

### Comunicación ATC

**PILOTO:** «Unable RVSM due turbulence» (o *due mountain wave*).
**SIGNIFICADO:** la aeronave no puede garantizar el mantenimiento del nivel por causa meteorológica.
**CUÁNDO:** cuando la turbulencia severa o la onda de montaña induzcan desviaciones de aproximadamente 200 ft o más.

### Error frecuente

Pensar que *unable RVSM* solo se usa por falla de equipo. La propia fraseología tiene la variante meteorológica, y la tabla de contingencias la trata aparte.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Perfil de una cordillera vista de costado, con el viento entrando desde la izquierda representado por líneas de corriente que se ondulan al superar la cresta y siguen ondulando corriente abajo, con amplitud decreciente. Una aeronave en crucero dentro de la zona ondulada, con dos siluetas fantasma por encima y por debajo de su posición nominal unidas por una acotación vertical rotulada «desplazamiento vertical inducido». Una línea horizontal punteada marcando el nivel autorizado. Etiquetas cortas: «viento perpendicular a la cordillera», «flujo ondulatorio corriente abajo», «el nivel se mantiene con dificultad aunque el avión esté sano».

OBJETIVO:
Que el piloto vea que la onda de montaña puede mover el avión verticalmente sin que nada haya fallado a bordo, y entienda por qué eso obliga a comunicar.

### En pocas palabras

- El disparador son desviaciones de aproximadamente 200 ft o más por turbulencia severa u onda de montaña.
- Se declara «Unable RVSM due [causa]» y se solicita vector libre de tráfico adyacente si no lo ofrecen.
- Se reporta localización y magnitud al ATC.
- Un encuentro con onda de montaña puede no llegar a 200 ft: igual se reporta.
- En Colombia, las cordilleras hacen esto muy real.

### Quiz · Capítulo 22

**r22-q1** · ¿A partir de qué magnitud de desviación inducida por turbulencia severa u onda de montaña corresponde declarar *unable RVSM*?
- A) Aproximadamente 100 ft o más.
- B) Aproximadamente 200 ft o más.
- C) Aproximadamente 300 ft o más.
- D) Cualquier desviación, sin umbral.
**Correcta:** B · **Tema:** R22 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2
**Explicación:** La tabla de contingencias fija el disparador en desviaciones de aproximadamente 200 ft o más inducidas por turbulencia severa o actividad de onda de montaña. A partir de ahí se contacta al ATC con «Unable RVSM due [causa]».

**r22-q2** · Además de declarar *unable RVSM due turbulence*, ¿qué debe solicitar el piloto si el controlador no lo ofrece?
- A) Prioridad de aterrizaje en el destino.
- B) Un vector libre de tráfico en los niveles adyacentes.
- C) Autorización para descender por debajo de FL 290 sin coordinación.
- D) Cambio de código de transpondedor.
**Correcta:** B · **Tema:** R22 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2
**Explicación:** Si el controlador no lo emite, el piloto solicita vector para quedar libre de tráfico en los niveles adyacentes. Además puede pedir cambio de nivel o desvío, y debe reportar la localización y magnitud del fenómeno.

**r22-q3** · Encuentras onda de montaña, pero las desviaciones no llegan a 200 ft. ¿Qué corresponde?
- A) Nada: por debajo del umbral no hay acción.
- B) Declarar *unable RVSM* igualmente, por precaución.
- C) Contactar al ATC, reportar que se experimenta onda de montaña y su localización y magnitud.
- D) Descender de inmediato fuera del espacio RVSM.
**Correcta:** C · **Tema:** R22 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2, «MWA Encounters – General»
**Explicación:** La AC advierte que los encuentros con onda de montaña no necesariamente producen desviaciones del orden de 200 ft, y prevé una acción propia para los menos significativos: contactar al ATC, reportar el fenómeno con su localización y magnitud, y solicitar cambio de nivel o desvío si se desea.

---

## 23. ESTELA TURBULENTA EN RVSM

**ID:** R23 · **Tiempo:** 4 min

### ¿Qué es?

El encuentro con la estela de otro avión dentro del espacio RVSM. Tiene tratamiento propio porque con 1.000 ft de separación vertical el tráfico pesado queda más cerca que antes.

### Lo que debe saber el piloto

La separación reglamentaria no garantiza ausencia de estela. Un avión pesado 1.000 ft por encima y ligeramente adelante puede dejar una estela que descienda hasta el nivel de abajo.

Qué mira el piloto:

- **Tráfico pesado próximo**, sobre todo por encima y por delante.
- **La dirección del viento**, que desplaza la estela lateralmente.
- **La posición relativa** respecto a ese tráfico.

Y qué hace, según la tabla de contingencias de la FAA:

- Contactar al ATC y **solicitar vector, cambio de nivel o, si la aeronave es capaz, un desplazamiento lateral** (*lateral offset*).

Por su parte, el controlador proporciona **2.000 ft de separación vertical** o la separación horizontal apropiada, y saca a la aeronave del espacio RVSM salvo que la situación operacional indique otra cosa.

Esa respuesta (volver a 2.000 ft) es reveladora: cuando el sistema no puede garantizar las condiciones de RVSM, lo que hace es devolver el margen que RVSM había reducido.

### En operación de aerolínea

Se resuelve casi siempre con un desplazamiento lateral corto o con un cambio de nivel. Lo importante es pedirlo, en vez de aguantarlo.

### Comunicación ATC

Solicitud de vector, cambio de nivel o desplazamiento lateral, indicando el motivo.

### Error frecuente

Aguantar la estela sin comunicar, porque «la separación es la reglamentaria». Lo es, y aun así el ATC tiene previstas respuestas para este caso.

### En pocas palabras

- La separación reglamentaria no impide encontrar estela.
- Se mira: tráfico pesado próximo, viento y posición relativa.
- Se solicita vector, cambio de nivel o desplazamiento lateral si la aeronave es capaz.
- El controlador puede dar 2.000 ft o separación horizontal, y sacar la aeronave del espacio RVSM.

### Quiz · Capítulo 23

**r23-q1** · Encuentras estela turbulenta en crucero RVSM. Según la FAA, ¿qué puede solicitar el piloto?
- A) Solo un cambio de nivel.
- B) Vector, cambio de nivel o, si la aeronave es capaz, un desplazamiento lateral.
- C) Autorización para desconectar el piloto automático hasta salir de la estela.
- D) Prioridad de ruta directa al destino.
**Correcta:** B · **Tema:** R23 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2, «Wake Turbulence Encounters»
**Explicación:** La tabla prevé las tres opciones: vector, cambio de nivel o desplazamiento lateral cuando la aeronave tiene esa capacidad. La respuesta del controlador puede incluir 2.000 ft de separación vertical o separación horizontal apropiada.

**r23-q2** · ¿Qué separación vertical puede proporcionar el controlador ante un encuentro con estela en RVSM?
- A) Los mismos 1.000 ft, reforzados con vigilancia.
- B) 500 ft, suficientes para salir del eje de la estela.
- C) 2.000 ft, o la separación horizontal apropiada.
- D) 3.000 ft, que es el mínimo fuera de RVSM.
**Correcta:** C · **Tema:** R23 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2
**Explicación:** El controlador proporciona 2.000 ft de separación vertical o la separación horizontal apropiada, y saca a la aeronave del espacio RVSM salvo que la situación operacional indique otra cosa. Es el mismo criterio que se aplica ante *unable RVSM due equipment*.

**r23-q3** · ¿Por qué la estela merece tratamiento propio dentro de RVSM?
- A) Porque la estela es más intensa por encima de FL 290.
- B) Porque con 1.000 ft de separación el tráfico pesado queda más cerca que antes.
- C) Porque el TCAS no detecta estela.
- D) Porque el piloto automático no puede compensarla.
**Correcta:** B · **Tema:** R23 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2; Apéndice D
**Explicación:** Al reducir la separación vertical a la mitad, un avión pesado en el nivel adyacente queda a 1.000 ft en vez de 2.000. La separación sigue siendo reglamentaria, pero el encuentro con estela se vuelve más probable, y por eso la norma prevé acciones específicas.

---

# BLOQUE 5 · CUANDO ALGO FALLA

---

## 24. PERDER LA CAPACIDAD RVSM

**ID:** R24 · **Tiempo:** 6 min

### ¿Qué es?

El momento en que la aeronave deja de cumplir los requisitos para operar con separación de 1.000 ft. Es el capítulo más importante del módulo.

### Lo que debe saber el piloto

#### Qué la produce

La FAA agrupa bajo la misma acción tres fallas:

- **Todos los altímetros primarios.**
- **El sistema automático de control de altitud.**
- **La alerta de altitud.**

Cualquiera de las tres se comunica como **«Unable RVSM due equipment»**.

Dos casos tienen tratamiento distinto y por eso se separan:

- **Una sola primaria operativa**: se contrasta con la de reserva y se notifica al ATC la operación con una sola primaria. Si no se puede confirmar su precisión, se pasa al grupo anterior.
- **Falla de transpondedor**: se solicita al ATC autorización para continuar en el nivel autorizado.

Y la causa meteorológica, del capítulo 22: turbulencia severa u onda de montaña que induzcan desviaciones de aproximadamente 200 ft o más, que se declara como *unable RVSM due* la causa correspondiente.

#### Lo que hay que resistir

La tentación de deducir. «Falló X, luego no soy RVSM» es tan incorrecto como «falló X pero sigo siendo RVSM». La regla es consultar: **QRH, MEL y los requisitos aplicables**. Lo que sí está escrito, y es de memoria, son los tres casos del grupo *unable RVSM due equipment*.

### En operación de aerolínea

Lo que cambia inmediatamente es que el ATC dejará de separarte 1.000 ft, y eso suele significar otro nivel. Lo que cambia después es todo lo demás: consumo, predicción al destino, a veces ruta. El capítulo 30 lo desarrolla.

### ¿Qué verifica la tripulación?

Qué falló exactamente, qué dice el QRH, si la aeronave conserva o no la capacidad, y qué nivel queda disponible.

### Comunicación ATC

«Unable RVSM due equipment», y solicitar salir del espacio RVSM salvo que la situación operacional indique otra cosa. El controlador proporciona 2.000 ft de separación vertical o separación horizontal apropiada.

### Error frecuente

«Si pierdo RVSM debo declarar MAYDAY.» No. Perder la capacidad RVSM no es, por sí misma, una emergencia: es una incapacidad de cumplir unos requisitos, que se comunica y se coordina. Puede haber una emergencia detrás (depende de qué falló), pero la pérdida de RVSM no la declara.

### En pocas palabras

- Tres fallas se comunican como *unable RVSM due equipment*: todos los primarios, el control automático de altitud y la alerta de altitud.
- Una sola primaria operativa y la falla de transpondedor tienen tratamiento propio.
- La turbulencia y la onda de montaña producen *unable RVSM due* la causa meteorológica.
- No se deduce en ninguna dirección: QRH, MEL y requisitos aplicables.
- Perder RVSM no es declarar emergencia.

### Quiz · Capítulo 24

**r24-q1** · ¿Cuáles son las tres fallas que la FAA agrupa como *unable RVSM due equipment*?
- A) Transpondedor, TCAS y altímetro de reserva.
- B) Todos los altímetros primarios, el control automático de altitud y la alerta de altitud.
- C) Piloto automático, FMS y radar meteorológico.
- D) Una primaria, el transpondedor y el sistema de alerta.
**Correcta:** B · **Tema:** R24 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2
**Explicación:** Esas tres comparten la misma acción: comunicar *unable RVSM due equipment* y solicitar salir del espacio RVSM salvo que la situación operacional indique otra cosa. El transpondedor y el caso de una sola primaria operativa tienen tratamientos distintos.

**r24-q2** · Pierdes la capacidad RVSM en crucero. ¿Debes declarar emergencia?
- A) Sí: la pérdida de capacidad RVSM es siempre una emergencia.
- B) No necesariamente: es una incapacidad de cumplir requisitos, que se comunica y se coordina.
- C) Sí, si ocurre por encima de FL 350.
- D) Solo si el ATC no responde a la primera llamada.
**Correcta:** B · **Tema:** R24 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.6
**Explicación:** La pérdida de capacidad RVSM se comunica y se coordina: se solicita nueva autorización tan pronto la situación lo permita. Puede haber una emergencia detrás según qué haya fallado, pero perder RVSM no la constituye por sí misma.

**r24-q3** · Queda una sola primaria operativa y puedes confirmar su precisión contra la de reserva. ¿Qué corresponde?
- A) Comunicar *unable RVSM due equipment* de inmediato.
- B) Contrastar con la de reserva y notificar al ATC la operación con una sola primaria.
- C) No comunicar nada mientras la indicación sea estable.
- D) Declarar emergencia y solicitar descenso inmediato.
**Correcta:** B · **Tema:** R24 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2, «One Primary Altimeter Remains Operational»
**Explicación:** El procedimiento es contrastar con el altímetro de reserva y notificar al ATC que se opera con una sola primaria; el controlador lo acusa. Solo si no se puede confirmar la precisión de esa primaria se siguen las acciones previstas para la falla de todas.

---
## 25. QUÉ HACE EL PILOTO SI LA PIERDE EN VUELO

**ID:** R25 · **Tiempo:** 7 min

### ¿Qué es?

El flujo operacional completo, desde que algo falla hasta que la situación queda coordinada. Es la respuesta a la pregunta de entrevista más típica del módulo: *«You are cruising at FL370 in RVSM airspace and one of the required systems fails. What would you do?»*

### Lo que debe saber el piloto

El orden es el de siempre: **aviar, navegar, comunicar**. Dentro de ese marco, la secuencia:

#### 1. Controlar la aeronave

Mantener el nivel autorizado **en la medida de lo posible** mientras se evalúa la situación. Es la primera acción que la FAA enumera para cualquier contingencia en la que no se pueda mantener el nivel o haya duda sobre la capacidad de mantenerlo.

#### 2. Vigilar el tráfico

Buscar tráfico en conflicto **visualmente y con el TCAS**, si está instalado. Y encender las luces exteriores, en lo que las limitaciones del avión permitan, para hacerse ver.

#### 3. Identificar la falla

Qué falló exactamente. No «algo del piloto automático»: qué.

#### 4. Aplicar el QRH y el SOP

El procedimiento del avión manda. Aquí es donde se sabe si la falla tiene acciones de memoria, si hay reconfiguración posible y qué queda operativo.

#### 5. Determinar la capacidad RVSM

Con el QRH y la MEL en la mano: ¿la aeronave sigue cumpliendo los requisitos? Esto es una conclusión, no una intuición.

#### 6. Si no la conserva, informar al ATC

Notificar y **solicitar una nueva autorización tan pronto como la situación lo permita**. Si no hay autorización disponible o la naturaleza de la emergencia exige acción rápida, el piloto notifica al ATC su acción y el procedimiento de contingencia que está aplicando.

#### 7. Cumplir la autorización o el procedimiento de contingencia

Y seguir vigilando la altitud.

#### 8. Avisar cuando deje de hacer falta

Es responsabilidad de la tripulación **notificar al ATC cuando el procedimiento de contingencia ya no sea necesario**.

### En operación de aerolínea

Los pasos 1 a 4 ocurren en la cabina y pueden tardar minutos. El 6 es el que cambia lo que hace el sistema: hasta que no se comunica, el ATC sigue separando 1.000 ft. Por eso la norma insiste en «tan pronto como la situación lo permita»: no inmediatamente a costa de volar el avión, pero tampoco cuando ya esté todo resuelto.

### Comunicación ATC

**PILOTO:** «Unable RVSM due equipment».
Y la solicitud de salir del espacio RVSM, salvo que la situación operacional indique otra cosa.

### Error frecuente

Comunicar primero y volar después. El orden es aviar, navegar, comunicar, y la propia tabla de contingencias empieza por mantener el nivel mientras se evalúa.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Diagrama de flujo vertical de ocho bloques conectados por flechas descendentes, con la etiqueta AVIAR abarcando los dos primeros bloques, NAVEGAR el tercero y cuarto, y COMUNICAR del quinto en adelante, marcadas con llaves laterales. Bloque 1: «FALLA DE SISTEMA RVSM». Bloque 2: «CONTROLAR LA AERONAVE · mantener el nivel en lo posible · vigilar tráfico y encender luces». Bloque 3: «IDENTIFICAR LA FALLA». Bloque 4: «QRH Y SOP». Bloque 5, en forma de rombo de decisión: «¿CONSERVA CAPACIDAD RVSM?» con dos salidas. Salida «SÍ» a un bloque: «CONTINUAR · vigilar altitud». Salida «NO» a: «INFORMAR AL ATC · unable RVSM due equipment». De ahí: «SOLICITAR O ACEPTAR NUEVA AUTORIZACIÓN». Y por último: «AVISAR CUANDO YA NO HAGA FALTA».

OBJETIVO:
Dar una estructura mental completa y memorizable que no sustituye al QRH ni al SOP, pero que ordena la respuesta ante la pregunta clásica de entrevista.

### En pocas palabras

- Aviar, navegar, comunicar, en ese orden.
- Mantener el nivel en lo posible, vigilar tráfico visualmente y con TCAS, encender luces exteriores.
- Identificar la falla, aplicar QRH y SOP, y concluir si se conserva la capacidad.
- Informar al ATC tan pronto la situación lo permita y coordinar la nueva autorización.
- Avisar también cuando el procedimiento de contingencia deje de ser necesario.

### Quiz · Capítulo 25

**r25-q1** · ¿Cuál es la primera acción cuando no se puede mantener el nivel o hay duda sobre la capacidad de mantenerlo?
- A) Declarar *unable RVSM* de inmediato.
- B) Notificar al ATC y mantener el nivel en la medida de lo posible mientras se evalúa.
- C) Descender por debajo de FL 290 sin esperar autorización.
- D) Desconectar el piloto automático para volar manual.
**Correcta:** B · **Tema:** R25 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2, «Initial Pilot Actions»
**Explicación:** Las acciones iniciales son notificar al ATC y solicitar asistencia, mantener el nivel autorizado en lo posible mientras se evalúa la situación, vigilar tráfico en conflicto visualmente y con el TCAS, y alertar a las aeronaves cercanas encendiendo las luces exteriores dentro de las limitaciones del avión.

**r25-q2** · Has aplicado el QRH y la aeronave ya no conserva capacidad RVSM. ¿Cuándo informas al ATC?
- A) Al llegar al destino, en el reporte de postvuelo.
- B) Tan pronto como la situación lo permita, solicitando nueva autorización.
- C) Solo si el ATC pregunta por el estado RVSM.
- D) Al salir del espacio RVSM por descenso normal.
**Correcta:** B · **Tema:** R25 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.6
**Explicación:** La tripulación debe solicitar una nueva autorización al controlador tan pronto como la situación lo permita. Si no hay autorización disponible o la urgencia lo exige, notifica su acción y el procedimiento de contingencia aplicado. Hasta que no se comunica, el ATC sigue separando 1.000 ft.

**r25-q3** · Se resolvió la condición que motivó el procedimiento de contingencia. ¿Qué corresponde?
- A) Nada: el ATC lo deduce al ver que el avión mantiene el nivel.
- B) Notificar al ATC que el procedimiento de contingencia ya no es necesario.
- C) Esperar a que el ATC pregunte si se puede reanudar RVSM.
- D) Anotarlo en el libro técnico al aterrizar.
**Correcta:** B · **Tema:** R25 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.6
**Explicación:** La AC lo pone como responsabilidad expresa de la tripulación: notificar al ATC cuando la aplicación de los procedimientos de contingencia ya no sea necesaria. Para eso existe también la fraseología «Ready to resume RVSM».

---

## 26. LA FRASEOLOGÍA

**ID:** R26 · **Tiempo:** 7 min

### ¿Qué es?

Las frases normalizadas que se intercambian entre piloto y controlador sobre el estado RVSM. Hay que saberlas en inglés, tal cual, porque así se usan.

### Lo que debe saber el piloto

#### El controlador pregunta el estado

**ATC:** *«(call sign) Confirm RVSM approved.»*
**SIGNIFICADO:** el controlador quiere saber si la aeronave está aprobada para RVSM.
**CUÁNDO:** cuando necesita confirmarlo para aplicar separación.

#### El piloto confirma

**PILOTO:** *«Affirm RVSM.»*
**SIGNIFICADO:** el vuelo está aprobado para RVSM.

#### El piloto declara que no lo está

**PILOTO:** *«Negative RVSM»*, seguido de información complementaria cuando corresponda, por ejemplo *«Certification flight»*.
**CUÁNDO:** el piloto de una aeronave no RVSM lo reporta en cuatro momentos:

- En la llamada inicial en **cualquier** frecuencia dentro del espacio RVSM.
- En **todas** las solicitudes de cambio de nivel a niveles dentro del espacio RVSM.
- En **todas** las colaciones de autorizaciones de nivel dentro del espacio RVSM.
- En la colación de autorizaciones de nivel que impliquen ascender o descender **a través** del espacio RVSM (FL 290–410).

#### El piloto pierde la capacidad por equipo

**PILOTO:** *«Unable RVSM due equipment.»*
**CUÁNDO:** tras entrar al espacio RVSM, cuando fallan todos los altímetros primarios, el sistema automático de control de altitud o la alerta de altitud.
**NOTA IMPORTANTE:** la frase se usa tanto para la indicación inicial de la falla **como en el contacto inicial en todas las frecuencias** del espacio RVSM, hasta que el problema deje de existir o la aeronave salga del espacio.

#### El piloto no puede mantener el nivel por meteorología

**PILOTO:** *«Unable RVSM due (causa)»*, por ejemplo *turbulence* o *mountain wave*.

#### El ATC niega la entrada

**ATC:** *«Unable issue clearance into RVSM airspace, maintain FL (nivel).»*

#### El ATC pregunta si se puede reanudar

**ATC:** *«Confirm able to resume RVSM.»*
**CUÁNDO:** cuando quiere confirmar que la aeronave recuperó el estado aprobado o que el piloto está listo para reanudar.

#### El piloto avisa que puede reanudar

**PILOTO:** *«Ready to resume RVSM.»*
**CUÁNDO:** tras una contingencia de sistema o meteorológica, cuando la aeronave puede volver a cumplir.

### En operación de aerolínea

La que más se usa en la práctica es *negative RVSM*, en aviones que no están aprobados, y hay que recordar que se repite en cuatro situaciones, no una sola vez. La segunda más usada es *unable RVSM due equipment*, y también se repite en cada frecuencia nueva.

### Error frecuente

Decir *unable RVSM* una vez y darlo por comunicado. La nota de la FAA es explícita: se repite en el contacto inicial de **todas** las frecuencias mientras dure el problema.

### En pocas palabras

- *Confirm RVSM approved* / *Affirm RVSM*: el ATC pregunta, el piloto confirma.
- *Negative RVSM*: aeronave no aprobada. Se repite en cuatro situaciones.
- *Unable RVSM due equipment*: falla de primarios, control automático o alerta. Se repite en cada frecuencia.
- *Unable RVSM due turbulence / mountain wave*: causa meteorológica.
- *Confirm able to resume RVSM* / *Ready to resume RVSM*: la vuelta a la normalidad.

### Quiz · Capítulo 26

**r26-q1** · ¿Cuál es la respuesta normalizada del piloto cuando el ATC transmite «Confirm RVSM approved»?
- A) «RVSM operational».
- B) «Affirm RVSM».
- C) «RVSM capable».
- D) «Roger RVSM».
**Correcta:** B · **Tema:** R26 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-1
**Explicación:** La fraseología normalizada es «Affirm RVSM» para indicar que el vuelo está aprobado. Las otras tres no son fraseología establecida y en una entrevista técnica se notan.

**r26-q2** · Una aeronave no aprobada para RVSM, ¿en cuántas situaciones debe reportar su condición?
- A) Una sola vez, en el primer contacto tras el despegue.
- B) En cuatro: llamada inicial en cualquier frecuencia, solicitudes de nivel, colaciones de nivel y colaciones de ascenso o descenso a través del espacio RVSM.
- C) Solo cuando el ATC se lo pregunte expresamente.
- D) Solo al entrar y al salir del espacio RVSM.
**Correcta:** B · **Tema:** R26 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-1
**Explicación:** La tabla las enumera: llamada inicial en cualquier frecuencia dentro del espacio RVSM, todas las solicitudes de cambio a niveles RVSM, todas las colaciones de autorizaciones de nivel en RVSM, y las colaciones de autorizaciones que impliquen ascenso o descenso a través de FL 290–410.

**r26-q3** · Declaraste «Unable RVSM due equipment» y te transfieren a otra frecuencia. ¿Debes repetirlo?
- A) No: el controlador anterior lo coordina con el siguiente.
- B) Solo si el nuevo controlador pregunta por tu estado RVSM.
- C) Sí: la frase se usa también en el contacto inicial de todas las frecuencias hasta que el problema cese o salgas del espacio.
- D) Solo si cambias de nivel durante la transferencia.
**Correcta:** C · **Tema:** R26 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-1, Nota
**Explicación:** La nota de la tabla lo dice expresamente: la frase se usa para transmitir tanto la indicación inicial de la falla como en el contacto inicial en todas las frecuencias del espacio RVSM, hasta que el problema deje de existir o la aeronave haya salido del espacio.

---

## 27. «UNABLE RVSM» Y LAS AERONAVES SIN CAPACIDAD

**ID:** R27 · **Tiempo:** 5 min

### ¿Qué es?

Qué comunica realmente *unable RVSM*, qué puede hacer el ATC después, y qué ocurre con las aeronaves que sencillamente no tienen capacidad.

### Lo que debe saber el piloto

#### Qué dice y qué no dice

*Unable RVSM* dice: **esta aeronave no puede cumplir los requisitos RVSM aplicables**. No dice que haya una emergencia. Puede haberla, según qué falló, pero la frase no la declara.

#### Qué puede hacer el ATC

No hay una respuesta universal, y eso es parte de la respuesta correcta en entrevista. Según las circunstancias y el tráfico, el controlador puede:

- Proporcionar **2.000 ft de separación vertical** o la separación horizontal apropiada.
- **Sacar la aeronave del espacio RVSM**, que es lo que hará salvo que la situación operacional indique otra cosa.
- **Asignar otro nivel.**
- **Emitir una autorización revisada** con otro procedimiento.

Presentar una sola de estas como «lo que hace el ATC» es un error: depende del tráfico y de la situación.

#### Las aeronaves no RVSM

Una aeronave u operador que no cumple los requisitos (incluida una aeronave sin equipo RVSM operativo) se denomina **no RVSM**. Para ellas:

- El operador o el despachador **no declaran** el código de equipo RVSM en el plan de vuelo.
- El piloto **debe informar al controlador** de la falta de aprobación, con la fraseología del capítulo 26.
- Existen procedimientos de acomodación y **categorías específicas** de aeronaves no RVSM que pueden acomodarse, sujetas a autorización.

La regla de conducta para el piloto es directa: **no se solicita ni se acepta RVSM solo porque el avión llegue a esos niveles**, salvo que los procedimientos aplicables lo permitan.

### En operación de aerolínea

Para una aerolínea, volar no RVSM es excepcional y suele significar niveles por debajo de FL 290, con el coste de combustible que eso implica. Por eso la pérdida de capacidad tiene consecuencias operacionales reales, que se ven en el capítulo 30.

### Error frecuente

«Si digo *unable RVSM* el ATC me va a sacar del espacio, siempre.» Es lo más probable, pero no es automático: la propia norma dice «salvo que la situación operacional indique otra cosa».

### En pocas palabras

- *Unable RVSM* comunica incapacidad de cumplir requisitos, no una emergencia.
- El ATC puede dar 2.000 ft, separación horizontal, otro nivel, sacarte del espacio o revisar la autorización.
- No RVSM: no se declara el código en el plan y se informa al controlador.
- No se pide ni se acepta RVSM solo porque el avión alcance el nivel.

### Quiz · Capítulo 27

**r27-q1** · ¿Qué comunica exactamente la frase *unable RVSM*?
- A) Que la aeronave está en emergencia y requiere prioridad.
- B) Que la aeronave no puede cumplir los requisitos RVSM aplicables.
- C) Que la aeronave solicita abandonar el espacio aéreo controlado.
- D) Que la aeronave ha sufrido una desviación de altitud superior a 300 ft.
**Correcta:** B · **Tema:** R27 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-1 y Tabla B-2
**Explicación:** Comunica incapacidad de cumplir los requisitos RVSM, por equipo o por meteorología. No es una declaración de emergencia, aunque pueda haber una detrás según lo que haya fallado.

**r27-q2** · Tras un *unable RVSM due equipment*, ¿qué hará el controlador?
- A) Siempre sacará a la aeronave del espacio RVSM de inmediato.
- B) Siempre asignará 2.000 ft de separación vertical.
- C) Depende de las circunstancias: 2.000 ft, separación horizontal, otro nivel o sacarla del espacio.
- D) Declarará emergencia en su nombre y coordinará prioridad.
**Correcta:** C · **Tema:** R27 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2
**Explicación:** La tabla prevé que el controlador proporcione 2.000 ft de separación vertical o la separación horizontal apropiada y saque a la aeronave del espacio RVSM «salvo que la situación operacional indique otra cosa». No hay una respuesta única: depende del tráfico y de la situación.

**r27-q3** · El avión no está aprobado para RVSM pero alcanza FL 350 sin problema. ¿Puedes pedir ese nivel?
- A) Sí: si el avión llega, el nivel es utilizable.
- B) Sí, informando al ATC en la colación.
- C) No, salvo que los procedimientos aplicables de acomodación lo permitan.
- D) Sí, si el TCAS está operativo.
**Correcta:** C · **Tema:** R27 · **Referencia:** FAA AC 91-85B, Apéndice B, numerales B.4 y B.4.2
**Explicación:** Los operadores deben estar autorizados y las aeronaves ser conformes para volar en espacio RVSM designado, con excepciones limitadas. Existen procedimientos de acomodación y categorías específicas que pueden acomodarse sujetas a autorización, pero la capacidad de alcanzar el nivel no es uno de los criterios.

---
## 28. TCAS Y RVSM

**ID:** R28 · **Tiempo:** 5 min

### ¿Qué es?

La relación entre el sistema anticolisión y la separación reducida. No es un capítulo de TCAS: es el punto exacto donde TCAS y RVSM se tocan.

### Lo que debe saber el piloto

#### Por qué se tocan

Con 1.000 ft de separación, el tráfico de los niveles adyacentes está el doble de cerca en vertical. Eso significa más contactos en pantalla y avisos de tráfico (TA) más frecuentes. Es normal y no indica que nada vaya mal.

#### La regla que no admite matices

Una autorización del ATC **no tiene prioridad** sobre una resolución (RA) que exija maniobra conforme a los procedimientos ACAS aplicables. Si el TCAS manda una maniobra, se ejecuta.

Esta es exactamente la excepción a la regla del capítulo 16: la aeronave no se aparta del nivel autorizado sin autorización positiva del ATC **salvo en contingencia o emergencia**. Una RA es una de esas situaciones.

#### Después de la RA

Se informa al ATC conforme a los procedimientos aplicables, y se vuelve al nivel autorizado cuando corresponda.

#### Lo que el TCAS no es

No es equipo requerido para RVSM por sí mismo. La FAA separa las dos cosas: los requisitos de dotación de TCAS vienen de la normativa de operaciones aplicable a cada tipo de explotador, y en el caso del Part 91 se exige que las aeronaves con TCAS II que vuelen en espacio RVSM incorporen la versión 7.0 o posterior. El requisito de TCAS en cada área RVSM hay que averiguarlo.

Y sobre todo: **el TCAS no sustituye la separación**. Es la última red, no el método.

### En operación de aerolínea

Se traduce en no sorprenderse: más tráfico visible en el ND y más TA que en espacio no RVSM. Y en tener clarísimo que si llega una RA, se vuela la RA.

### ¿Qué verifica la tripulación?

Que el TCAS está operativo según lo exija la normativa aplicable al operador y al área.

### Comunicación ATC

Tras una RA, la que corresponda según los procedimientos ACAS aplicables.

### Error frecuente

«El TCAS reemplaza los requisitos RVSM» o «con TCAS operativo puedo entrar aunque me falte otro sistema». Ninguna de las dos. Son sistemas con funciones distintas: RVSM garantiza la separación; el TCAS actúa cuando esa garantía falló.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Dos aeronaves en niveles RVSM adyacentes, vista lateral, separadas 1.000 ft y acotadas. A la derecha de la escena, un recuadro que representa la porción de un ND genérico con el símbolo del tráfico próximo y su etiqueta de altitud relativa, y debajo un PFD genérico con la banda de resolución del TCAS representada en la cinta de altitud. Dos rótulos cortos: junto a la acotación de 1.000 ft, «lo que RVSM garantiza»; junto a la banda de resolución, «lo que actúa cuando esa garantía falló». Una nota al pie, destacada: «Una RA se vuela, aunque contradiga la autorización del ATC».

OBJETIVO:
Separar visualmente las dos funciones y dejar grabado que la resolución del TCAS prevalece sobre la autorización.

### En pocas palabras

- Con 1.000 ft, el tráfico adyacente está más cerca: más contactos y más avisos, y eso es normal.
- Una RA se vuela: la autorización del ATC no tiene prioridad sobre ella.
- Es la excepción a «no apartarse del nivel sin autorización positiva».
- El TCAS no es la separación: es lo que actúa cuando la separación falló.

### Quiz · Capítulo 28

**r28-q1** · Recibes una resolución del TCAS que contradice tu autorización de nivel en espacio RVSM. ¿Qué haces?
- A) Mantienes el nivel autorizado y consultas al ATC.
- B) Ejecutas la maniobra de la resolución conforme a los procedimientos ACAS aplicables.
- C) Solicitas al ATC que confirme la separación antes de maniobrar.
- D) Desconectas el TCAS para evitar una desviación de nivel.
**Correcta:** B · **Tema:** R28 · **Referencia:** Procedimientos ACAS aplicables; FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 3
**Explicación:** La resolución manda sobre la autorización. Volar el nivel autorizado es la regla, y la norma solo la levanta en contingencia, en emergencia y cuando el sistema anticolisión pide maniobrar: ahí se maniobra primero y se le cuenta al ATC después.

**r28-q2** · ¿Por qué en espacio RVSM se reciben más avisos de tráfico que fuera de él?
- A) Porque el TCAS aumenta su sensibilidad por encima de FL 290.
- B) Porque el tráfico de los niveles adyacentes está a 1.000 ft en vez de 2.000.
- C) Porque el ATC transfiere los contactos al TCAS de cada aeronave.
- D) Porque en RVSM hay menos separación horizontal.
**Correcta:** B · **Tema:** R28 · **Referencia:** FAA AC 91-85B, Apéndice A, definición 15
**Explicación:** Al reducirse la separación vertical a la mitad, el tráfico de los niveles contiguos entra con más frecuencia en los umbrales de aviso. Es un efecto esperado de la geometría, no un indicio de problema.

**r28-q3** · ¿Qué relación tiene el TCAS con los requisitos de equipo RVSM?
- A) Los sustituye: con TCAS operativo se puede entrar aunque falte otro sistema.
- B) Es el quinto sistema requerido en todas las regiones.
- C) Es independiente: su exigencia viene de la normativa aplicable y del área, y no sustituye ningún requisito RVSM.
- D) Solo se exige en espacio oceánico.
**Correcta:** C · **Tema:** R28 · **Referencia:** FAA AC 91-85B, Apéndice B, numerales B.3.1 apartado 5 y B.3.3 Nota
**Explicación:** Los requisitos de dotación de TCAS vienen de la normativa de operaciones de cada tipo de explotador, y el requisito de transpondedor y TCAS en cada área RVSM hay que averiguarlo. El TCAS no sustituye ningún requisito RVSM: cumple otra función.

---

# BLOQUE 6 · LO QUE SE VIGILA Y LO QUE CUESTA

---

## 29. ASE, MONITORIZACIÓN Y POSTVUELO

**ID:** R29 · **Tiempo:** 6 min

### ¿Qué es?

Tres cosas que van juntas: el error que no se ve, el sistema que lo vigila, y lo que la tripulación deja escrito al aterrizar.

### Lo que debe saber el piloto

#### El error del sistema altimétrico (ASE)

Es la diferencia entre la altitud de presión que se muestra a la tripulación con 1013,25 hPa puesto y la altitud de presión real de la corriente libre.

Lo característico del ASE, y lo que hay que saber decir en entrevista: **no se ve en la indicación**. El instrumento muestra un valor con toda normalidad y ese valor está corrido. Es una componente del error vertical total, y el piloto no dispone de ningún indicador que se la señale en vuelo.

De ahí que el sistema se apoye en dos cosas: la **comparación entre fuentes** dentro del avión, y la **monitorización externa** de la flota.

#### La monitorización de la performance altimétrica

Existe un programa de vigilancia de la performance de mantenimiento de altitud, y los operadores deben participar en el que corresponda a su tipo de operación. Es un control de calidad que permite a la autoridad evaluar cómo se comportan de verdad las aeronaves y los operadores en servicio.

Al piloto le basta con saber cuatro cosas: **que existe, para qué sirve, que una aeronave puede requerir monitorización, y que forma parte del mantenimiento de la aprobación RVSM**. El trámite no es suyo.

#### El postvuelo

Aquí sí hay tarea concreta. Al anotar en el libro de mantenimiento una falla de sistemas de mantenimiento de altitud, el piloto debe dar **detalle suficiente** para que mantenimiento pueda diagnosticar y reparar: el defecto real y lo que la tripulación hizo para aislarlo. La FAA enumera qué anotar cuando corresponda:

1. Lectura del altímetro primario y del de reserva.
2. Ajuste del selector de altitud.
3. Ajuste de subescala del altímetro.
4. Qué piloto automático gobernaba el avión, y las diferencias al seleccionar el sistema alterno.
5. Diferencias en las lecturas de altímetro si se seleccionaron tomas estáticas alternas.
6. Uso del selector de computador de datos aéreos en el procedimiento de diagnóstico.
7. Qué transpondedor estaba dando la altitud al ATC, y las diferencias si se seleccionó manualmente otro transpondedor u otra fuente.

### En operación de aerolínea

Ese nivel de detalle es lo que distingue una anotación útil de una inútil. «Altímetro con problemas» no permite reparar nada; las siete líneas de arriba, sí.

Y hay un segundo camino, además del libro técnico: el reporte operacional y el de seguridad, según el SOP del operador, cuando hubo desviación significativa, discrepancia altimétrica, desviación inducida por turbulencia o un error de altitud reportado por el ATC.

### ¿Qué verifica la tripulación?

Que lo ocurrido queda escrito con datos, no con adjetivos.

### Error frecuente

Salir del avión sin anotar una discrepancia porque «se resolvió sola». Si hubo discrepancia altimétrica en vuelo, mantenimiento necesita los números.

### En pocas palabras

- El ASE es la diferencia entre la altitud mostrada con 1013,25 y la real, y no se ve en cabina.
- Por eso el sistema se apoya en comparar fuentes a bordo y monitorizar las flotas desde fuera.
- El piloto solo necesita saber que la monitorización existe y para qué sirve.
- Al aterrizar: anotar con detalle, incluidas las lecturas, los ajustes y qué sistema gobernaba.

### Quiz · Capítulo 29

**r29-q1** · ¿Qué es el error del sistema altimétrico (ASE)?
- A) La diferencia entre los dos altímetros primarios.
- B) La diferencia entre la altitud mostrada con 1013,25 hPa y la altitud de presión real.
- C) La diferencia entre la altitud transmitida y la asignada.
- D) La desviación máxima admitida al nivelar.
**Correcta:** B · **Tema:** R29 · **Referencia:** FAA AC 91-85B, Apéndice A, definición 4
**Explicación:** El ASE compara lo mostrado a la tripulación con la referencia estándar puesta y la altitud de presión real de la corriente libre. La diferencia entre lo transmitido y lo asignado es la AAD, y la desviación máxima al nivelar son los 150 ft.

**r29-q2** · ¿Por qué el ASE no puede detectarse mirando el altímetro?
- A) Porque el altímetro solo muestra altitud indicada, no de presión.
- B) Porque el error está en la propia medición: el instrumento muestra con normalidad un valor corrido.
- C) Porque el ASE solo existe por encima de FL 410.
- D) Porque requiere que el transpondedor esté inoperativo.
**Correcta:** B · **Tema:** R29 · **Referencia:** FAA AC 91-85B, numeral 4.3.1
**Explicación:** El ASE no se ve en la indicación mostrada: el sistema presenta un valor que parece normal y está desplazado. Por eso el control se hace comparando fuentes independientes a bordo y monitorizando la performance de las flotas desde fuera.

**r29-q3** · Hubo una discrepancia altimétrica en crucero. ¿Qué debe quedar en el libro de mantenimiento?
- A) Una nota breve indicando que se observó una discrepancia.
- B) Nada, si la discrepancia desapareció antes de aterrizar.
- C) Detalle suficiente: lecturas de primario y reserva, ajustes, qué automático gobernaba y qué transpondedor daba la altitud.
- D) Solo el nivel de vuelo y la hora del suceso.
**Correcta:** C · **Tema:** R29 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.7
**Explicación:** La AC pide detalle suficiente para que mantenimiento pueda diagnosticar y reparar, y enumera qué anotar: lecturas de primario y reserva, ajuste del selector de altitud, subescala, qué piloto automático gobernaba y las diferencias con el alterno, diferencias con tomas estáticas alternas, uso del selector de computador de datos aéreos y qué transpondedor daba la altitud.

---

## 30. LO QUE CUESTA PERDER RVSM

**ID:** R30 · **Tiempo:** 6 min

### ¿Qué es?

Las consecuencias operacionales de quedarse sin capacidad RVSM. Es el capítulo que conecta este módulo con Performance y con Gestión del combustible.

### Lo que debe saber el piloto

Perder RVSM casi siempre significa **salir del espacio**, y salir del espacio significa volar por debajo de FL 290 o por encima de FL 410. Para un reactor de transporte en ruta, en la práctica significa bajar.

La cadena de consecuencias:

#### 1. Un nivel menos eficiente

Por debajo de FL 290 el consumo específico empeora. No es un matiz: es la diferencia entre llegar con margen y llegar sin él.

#### 2. Más combustible por hora

Y por tanto una predicción al destino peor que la del plan operacional.

#### 3. Revisar la predicción

Aquí se engancha con el módulo de combustible. Lo que había que comprobar allí sigue valiendo aquí: si la predicción al destino conserva el alterno más la reserva final. Si no, hay decisiones que tomar, y cuanto antes mejor.

#### 4. Posible cambio de ruta o de destino

Si el nivel disponible no permite llegar con lo requerido, entra el alterno o una escala técnica.

#### 5. Coordinación

Con el ATC, para el nivel; y con el despacho, para lo demás.

### En operación de aerolínea

El escenario típico: FL 370, falla el sistema automático de control de altitud, se declara *unable RVSM due equipment*, el ATC ofrece FL 280. El avión vuela, pero el vuelo ya no es el que se planificó, y la pregunta deja de ser técnica y pasa a ser de combustible.

### ¿Qué verifica la tripulación?

- Qué nivel queda disponible y si el avión llega con el peso actual.
- Cuánto cambia el consumo.
- Qué queda al llegar al destino, comparado con alterno más reserva final.
- Si hace falta replanificar, y con qué opciones.

### Comunicación ATC

Primero la del capítulo 26. Después, la solicitud del nivel que convenga, y la coordinación con el despacho por el canal que use el operador.

### Error frecuente

Tratar la pérdida de RVSM como un asunto cerrado en cuanto el ATC asigna un nivel. Ahí empieza la segunda mitad del problema.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Cadena horizontal de cinco eslabones conectados por flechas, cada uno con un icono y un rótulo corto. Eslabón 1: falla de sistema: «PÉRDIDA DE CAPACIDAD RVSM». Eslabón 2: perfil de vuelo bajando: «SALIDA DEL ESPACIO · normalmente por debajo de FL 290». Eslabón 3: indicador de consumo: «MAYOR CONSUMO POR HORA». Eslabón 4: cifra de combustible con flecha descendente: «PREDICCIÓN AL DESTINO REVISADA». Eslabón 5, en forma de rombo: «¿CONSERVA ALTERNO + RESERVA FINAL?» con dos salidas: «SÍ · continuar vigilando» y «NO · replanificar con el despacho».

OBJETIVO:
Mostrar que una falla técnica en crucero termina siendo una decisión de combustible, y enlazar este módulo con el de Gestión del combustible.

### En pocas palabras

- Perder RVSM normalmente obliga a salir del espacio, y para un reactor en ruta eso es bajar.
- Un nivel inferior consume más: la predicción al destino empeora.
- Hay que comprobar si se conserva alterno más reserva final.
- Puede haber cambio de ruta, alterno o escala técnica.
- La falla técnica termina siendo una decisión de combustible.

### Quiz · Capítulo 30

**r30-q1** · Pierdes RVSM en FL 370 y el ATC te asigna FL 280. ¿Cuál es la consecuencia operacional inmediata que debes evaluar?
- A) Ninguna mientras el avión mantenga el nuevo nivel.
- B) El aumento de consumo y el efecto sobre la predicción de combustible al destino.
- C) La necesidad de declarar emergencia por cambio de nivel.
- D) La pérdida de la aprobación RVSM del operador.
**Correcta:** B · **Tema:** R30 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.6; conectar con el módulo Gestión del combustible
**Explicación:** Volar más bajo empeora el consumo específico, y eso cambia la predicción al destino. La evaluación siguiente es si se conserva el combustible para el alterno más la reserva final; si no, hay que replanificar con el despacho.

**r30-q2** · ¿Con qué módulo de Aviatory conecta directamente la pérdida de capacidad RVSM en crucero?
- A) Con Mercancías peligrosas.
- B) Con Gestión del combustible.
- C) Con Comunicaciones ATC únicamente.
- D) Con Meteorología.
**Correcta:** B · **Tema:** R30 · **Referencia:** Módulo Gestión del combustible, capítulos de predicción y decisión
**Explicación:** La consecuencia práctica de bajar de nivel es un consumo mayor y una predicción al destino peor, que es exactamente el razonamiento del módulo de combustible: comprobar si se conserva el alterno más la reserva final y decidir mientras todavía hay opciones.

**r30-q3** · Tras coordinar el nuevo nivel con el ATC, ¿el asunto queda cerrado?
- A) Sí: con el nivel asignado, la contingencia terminó.
- B) No: queda revisar consumo, predicción al destino y posibles alternativas.
- C) Sí, siempre que se haya anotado en el libro técnico.
- D) No: hay que declarar emergencia para asegurar prioridad.
**Correcta:** B · **Tema:** R30 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.6
**Explicación:** La asignación de nivel resuelve la separación, no el vuelo. A partir de ahí hay que revisar el consumo al nuevo nivel, actualizar la predicción al destino y evaluar si hace falta replanificar. Y al aterrizar, dejar la anotación con detalle.

---
## 31. RVSM EN COLOMBIA

**ID:** R31 · **Tiempo:** 6 min

### ¿Qué es?

Lo que un piloto que vuela en Colombia debe saber de RVSM según la reglamentación colombiana, y en qué se diferencia de lo que ha leído hasta aquí.

### Lo que debe saber el piloto

#### Lo que dice el RAC

El **RAC 211**, que es el de gestión del tránsito aéreo, establece la separación de **1.000 ft (300 m) entre FL 290 y FL 410 inclusive**, con monitoreo de la agencia regional **CARSAMMA** (numeral 211.530).

Dos cosas de ahí merecen subrayarse. La primera: el rango coincide con el estándar internacional, así que la respuesta de entrevista es la misma. La segunda: el RAC **nombra la agencia de monitorización**, lo que confirma que el seguimiento de la performance altimétrica no es una idea abstracta sino parte del sistema colombiano.

#### El VFR y el espacio RVSM

El **RAC 91** cierra la puerta al VFR: sin autorización no hay VFR sobre FL 200 (numeral 91.305), y **nunca sobre FL 290 en espacio de separación vertical reducida** (numeral 91.310). El espacio RVSM colombiano es IFR.

#### La autorización del explotador

El **RAC 119** incluye RVSM entre las aprobaciones específicas que aparecen en las especificaciones de operación del explotador, junto a mercancías peligrosas, baja visibilidad, EDTO, PBN AR y EFB (numeral 119.270(a)). Y añade la regla que cierra el círculo: la empresa no puede volar en un área que sus OpSpecs no autoricen (numeral 119.020(d)).

#### Dónde mirar lo demás

> **Verificar antes de citar.** Los procedimientos particulares de las FIR Bogotá y Barranquilla, los niveles por dirección de vuelo y los requisitos de aprobación detallados se publican en el **AIP Colombia vigente** y en las circulares de la Aerocivil, entre ellas la **circular GCEP-1.0-22-033** sobre requisitos y procedimientos para la aprobación de operaciones RVSM. Este módulo no reproduce sus cifras: se consultan en la versión vigente, porque cambian.

### En operación de aerolínea

Para un piloto que vuela doméstico colombiano, RVSM es el pan de cada día: el crucero de casi cualquier etapa está dentro de FL 290–FL 410. Lo específicamente colombiano que hay que tener a mano es el numeral del RAC 211 y la existencia de CARSAMMA, porque son las dos cosas que una entrevista en una aerolínea local puede preguntar y que no vienen en la documentación de la FAA.

Y el relieve: tres cordilleras significan que el capítulo de onda de montaña no es teoría importada.

### ¿Qué verifica la tripulación?

Que las OpSpecs del operador cubren el área, y el AIP y los NOTAM para lo que sea particular del día.

### Error frecuente

Responder una pregunta sobre Colombia con la referencia de la FAA. Los números coinciden, pero en una entrevista en una aerolínea colombiana citar el RAC 211, numeral 211.530, vale mucho más que citar una AC estadounidense.

### En pocas palabras

- RAC 211, numeral 211.530: 1.000 ft entre FL 290 y FL 410, con monitoreo de CARSAMMA.
- RAC 91, numerales 91.305 y 91.310: nada de VFR sobre FL 290 en espacio RVSM.
- RAC 119, numeral 119.270(a): RVSM es una aprobación específica de las OpSpecs.
- Lo particular de las FIR y los niveles por dirección: AIP Colombia y circulares de la Aerocivil vigentes.
- Las tres cordilleras hacen la onda de montaña un asunto real, no importado.

### Quiz · Capítulo 31

**r31-q1** · ¿Qué numeral del RAC establece la separación RVSM en Colombia y qué agencia de monitorización nombra?
- A) RAC 91, numeral 91.310, y la OACI.
- B) RAC 211, numeral 211.530, y CARSAMMA.
- C) RAC 119, numeral 119.270, y la Aerocivil.
- D) RAC 121, numeral 121.2553, y CARSAMMA.
**Correcta:** B · **Tema:** R31 · **Referencia:** RAC 211, numeral 211.530
**Explicación:** El RAC 211 establece la separación de 1.000 ft entre FL 290 y FL 410 inclusive con monitoreo de la agencia regional CARSAMMA. El RAC 91 trata el VFR y el RAC 119 las especificaciones de operación.

**r31-q2** · Según el RAC 119, ¿qué relación tiene RVSM con las especificaciones de operación?
- A) Ninguna: las OpSpecs no tratan capacidades de navegación ni de separación.
- B) RVSM figura entre las aprobaciones específicas del explotador en sus OpSpecs.
- C) Las OpSpecs solo recogen RVSM para operaciones internacionales.
- D) RVSM se aprueba por aeronave, no por explotador.
**Correcta:** B · **Tema:** R31 · **Referencia:** RAC 119, numerales 119.270(a) y 119.020(d)
**Explicación:** Las OpSpecs recogen aprobaciones específicas como mercancías peligrosas, baja visibilidad, RVSM, EDTO, PBN AR y EFB. Y la empresa no puede volar en un área que sus OpSpecs no autoricen.

**r31-q3** · Te preguntan por los procedimientos particulares de las FIR Bogotá y Barranquilla en RVSM. ¿Cuál es la respuesta correcta?
- A) Son idénticos a los de la FAA, porque RVSM está normalizado.
- B) No existen procedimientos particulares: se aplica solo el RAC 211.
- C) Se consultan en el AIP Colombia vigente y en las circulares de la Aerocivil.
- D) Los publica CARSAMMA en su informe anual de monitorización.
**Correcta:** C · **Tema:** R31 · **Referencia:** AIP Colombia vigente; circulares de la Aerocivil
**Explicación:** El rango vertical y la separación son comunes, pero lo particular de cada FIR, los niveles por dirección de vuelo y los requisitos detallados de aprobación se publican en el AIP del Estado y en las circulares vigentes de la autoridad. Se consultan; no se deducen.

---

## 32. ESCENARIOS

**ID:** R32 · **Tiempo:** 9 min

### ¿Qué es?

Diez situaciones para razonar, no para memorizar. Cada una plantea un caso y explica el razonamiento correcto con su referencia. Son el puente entre lo que se ha leído y lo que se responde en una entrevista.

### Lo que debe saber el piloto

En todos los escenarios el orden es el mismo: **controlar, identificar, consultar, concluir, comunicar, coordinar**. Lo que cambia es la conclusión.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Perfil completo de un vuelo de izquierda a derecha, desde el despegue en Bogotá hasta el aterrizaje en un destino internacional, con la silueta del terreno por debajo. Sobre el perfil, once marcadores numerados en el punto donde ocurre cada uno: 1 PREFLIGHT (libro técnico, tomas estáticas, altímetros), 2 PLAN DE VUELO (letra W en la casilla 10), 3 ASCENSO, 4 ALTITUD DE TRANSICIÓN (1013,25 hPa), 5 PUERTA RVSM en FL 290 con las verificaciones de entrada, 6 NIVELADO EN FL 370, 7 CHEQUEO ALTIMÉTRICO cada hora, 8 TURBULENCIA con la llamada «unable RVSM due turbulence», 9 POSIBLE FALLA y su flujo de contingencia, 10 SALIDA DEL ESPACIO RVSM al descender por FL 290, 11 POSTVUELO con la anotación en el libro. La franja entre FL 290 y FL 410 va sombreada y rotulada «ESPACIO RVSM».

OBJETIVO:
Integrar todo el módulo en una sola operación realista, de modo que el piloto vea dónde aparece cada procedimiento dentro de un vuelo completo.

### Escenario 1 · Los altímetros no coinciden

**Situación:** crucero FL 350 en espacio RVSM. El altímetro del comandante indica FL 350; el del primer oficial, una diferencia apreciable respecto de ese valor.

**Pregunta:** ¿qué hace la tripulación y qué referencia usa?

**Razonamiento correcto:** lo primero es cuantificar, no estimar: en crucero las dos primarias deben coincidir dentro de **200 ft**, o menos si lo especifica el manual del avión. Si la diferencia excede ese límite, la norma es explícita: el sistema altimétrico **debe reportarse como defectuoso y notificarse al ATC**. El altímetro de reserva es la tercera opinión que permite decidir cuál de las dos primarias es la sospechosa, y por eso se anota su diferencia con las primarias. Si no se puede confirmar la precisión de la que queda, se actúa como en la falla de todas las primarias.

**Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.4 apartado 7 y Tabla B-2.

### Escenario 2 · Falla el sistema automático de control de altitud

**Situación:** establecido en FL 370. Se pierde el sistema automático de mantenimiento de altitud requerido.

**Pregunta:** ¿sigue siendo RVSM capable? ¿Qué comunica? ¿Qué puede pedir?

**Razonamiento correcto:** no. La falla del sistema automático de control de altitud es uno de los tres casos de *unable RVSM due equipment*. Se comunica esa frase al ATC y se solicita salir del espacio RVSM salvo que la situación operacional indique otra cosa; el controlador proporcionará 2.000 ft de separación vertical o la separación horizontal apropiada. Volar manual **no** devuelve la capacidad. Y queda la segunda mitad: el nivel inferior consume más, así que hay que revisar la predicción al destino contra alterno más reserva final.

**Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2.

### Escenario 3 · Falla la alerta de altitud

**Situación:** crucero RVSM. La alerta de altitud queda inoperativa. Todo lo demás funciona.

**Pregunta:** ¿se puede continuar?

**Razonamiento correcto:** no en espacio RVSM. La alerta de altitud es equipo requerido y su falla entra en el mismo grupo que la del control automático y la de todos los primarios: *unable RVSM due equipment*. Que sea «solo un aviso» no cambia su condición de requisito: sin ella, una desviación lenta puede crecer sin que nadie la note.

**Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.3 y Tabla B-2.

### Escenario 4 · Problema en el reporte de altitud

**Situación:** el transpondedor deja de reportar altitud en crucero RVSM.

**Pregunta:** ¿es *unable RVSM due equipment*?

**Razonamiento correcto:** no, y esta distinción es fina. La falla de transpondedor tiene tratamiento propio: el piloto contacta al ATC y **solicita autorización para continuar operando en el nivel autorizado**, y cumple la autorización revisada si el controlador la emite. El controlador considera la solicitud. Además, en espacio no controlado por Estados Unidos, los Estados proveedores determinan las acciones ante falla de transpondedor o de TCAS.

**Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2, «Transponder Failure».

### Escenario 5 · Turbulencia severa

**Situación:** FL 370, turbulencia severa, dificultad para mantener el nivel, con desviaciones que rondan los 200 ft.

**Pregunta:** ¿qué se hace y en qué orden?

**Razonamiento correcto:** aviar primero: volar el avión y mantener el nivel en lo posible. Después comunicar: **«Unable RVSM due turbulence»**. Si el controlador no lo ofrece, **solicitar vector libre de tráfico en los niveles adyacentes**. Se puede pedir cambio de nivel o desvío. Y hay que **reportar localización y magnitud** de la turbulencia. Mientras tanto, vigilar tráfico visualmente y con el TCAS y encender las luces exteriores.

**Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2.

### Escenario 6 · Onda de montaña

**Situación:** cruce de cordillera con viento perpendicular. Variaciones verticales persistentes que no llegan a 200 ft.

**Pregunta:** ¿hay que declarar algo?

**Razonamiento correcto:** *unable RVSM* no, porque no se alcanza el disparador. Pero sí hay acción: contactar al ATC y **reportar que se está experimentando onda de montaña**, con su localización y magnitud, y solicitar cambio de nivel o desvío si se desea. La FAA aclara expresamente que los encuentros con onda de montaña no necesariamente producen desviaciones del orden de 200 ft, y prevé esta acción para los menos significativos.

**Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2, «MWA Encounters – General».

### Escenario 7 · Restricción de MEL antes del vuelo

**Situación:** el avión trae un ítem diferido relacionado con altimetría. El vuelo está despachado y el plan declara la W.

**Pregunta:** ¿qué analiza el piloto?

**Razonamiento correcto:** leer la entrada de MEL completa: número requerido, observaciones, (M), (O) y si hay restricción RVSM expresa. Despachable y RVSM capable no son lo mismo. Si la restricción retira la capacidad, hay una contradicción con la W del plan que **se resuelve antes de salir**: el código de equipo RVSM no debe declararse cuando la aeronave no cumple. Y después, el efecto en cadena: nivel disponible, consumo, predicción y ruta.

**Referencia:** FAA AC 91-85B, Apéndice B, numerales B.3.1 Nota y B.4.

### Escenario 8 · Resolución del TCAS

**Situación:** crucero RVSM, tráfico 1.000 ft por encima. Llega una resolución que exige maniobra vertical contraria a la autorización.

**Pregunta:** ¿qué prevalece?

**Razonamiento correcto:** la resolución. Una autorización del ATC no tiene prioridad sobre una RA que exija maniobra conforme a los procedimientos ACAS aplicables. Es la excepción expresa a la regla de no apartarse del nivel autorizado sin autorización positiva, que la norma reserva para contingencia o emergencia. Después se informa al ATC según los procedimientos aplicables y se vuelve al nivel cuando corresponda.

**Referencia:** procedimientos ACAS aplicables; FAA AC 91-85B, Apéndice B, numeral B.3.4 apartado 3.

### Escenario 9 · El ATC reporta una desviación

**Situación:** el ATC informa que la aeronave está fuera del nivel asignado, con una desviación de unos 350 ft.

**Pregunta:** ¿qué se hace primero?

**Razonamiento correcto:** volver al nivel autorizado **tan rápido como sea posible**; la norma lo exige a partir de una AAD de 300 ft o más. Después, y solo después, confirmar indicaciones, contrastar con el altímetro de reserva, identificar la fuente del problema y evaluar si se conserva la capacidad RVSM. Y tener presente que un evento de esa magnitud es de los que se reportan e investigan, con plazo de 72 horas para el operador.

**Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.4 apartado 10; numeral 5.10.1.

### Escenario 10 · La consecuencia de combustible

**Situación:** FL 370. Se pierde la capacidad RVSM y el ATC asigna FL 280 para el resto de la ruta.

**Pregunta:** ¿qué más hay que resolver?

**Razonamiento correcto:** la separación ya está resuelta; el vuelo no. A FL 280 el consumo por hora es mayor y la predicción al destino empeora respecto del plan. Hay que recalcularla y compararla con alterno más reserva final. Si no se conserva, se replanifica con el despacho: otro alterno, una escala técnica o un cambio de ruta. Y al aterrizar, la anotación con detalle en el libro de mantenimiento.

**Referencia:** FAA AC 91-85B, Apéndice B, numerales B.3.6 y B.3.7; módulo Gestión del combustible.

### Quiz · Capítulo 32

**r32-q1** · En todos los escenarios de contingencia RVSM, ¿cuál es el orden correcto?
- A) Comunicar, controlar, identificar, consultar.
- B) Controlar, identificar, consultar, concluir, comunicar, coordinar.
- C) Consultar el QRH, comunicar y después controlar la aeronave.
- D) Identificar, comunicar y esperar instrucciones del ATC.
**Correcta:** B · **Tema:** R32 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2 y numeral B.3.6
**Explicación:** Aviar, navegar, comunicar. Las acciones iniciales son mantener el nivel en lo posible mientras se evalúa y vigilar tráfico; luego se identifica la falla, se consulta el QRH, se concluye si se conserva la capacidad y se comunica y coordina con el ATC.

**r32-q2** · ¿Cuál de estas situaciones **no** se comunica como *unable RVSM due equipment*?
- A) Falla de todos los altímetros primarios.
- B) Falla del sistema automático de control de altitud.
- C) Falla del transpondedor.
- D) Falla de la alerta de altitud.
**Correcta:** C · **Tema:** R32 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2
**Explicación:** La falla de transpondedor tiene tratamiento propio: se solicita al ATC autorización para continuar en el nivel autorizado y se cumple la autorización revisada si la hay. Las otras tres comparten la acción *unable RVSM due equipment*.

**r32-q3** · Tras resolver la separación con el ATC en un nivel inferior, ¿qué queda pendiente?
- A) Nada operacionalmente relevante.
- B) Revisar consumo y predicción al destino, y anotar la falla con detalle al aterrizar.
- C) Declarar emergencia para asegurar prioridad en destino.
- D) Solicitar de nuevo el nivel original cada treinta minutos.
**Correcta:** B · **Tema:** R32 · **Referencia:** FAA AC 91-85B, Apéndice B, numerales B.3.6 y B.3.7
**Explicación:** El nivel resuelve la separación, no el vuelo. Queda recalcular el consumo y la predicción al destino frente a alterno más reserva final, replanificar con el despacho si hace falta, y dejar en el libro de mantenimiento la anotación con el detalle que la norma enumera.

---

# CIERRE DEL MÓDULO

---

## Errores frecuentes en entrevistas

Once afirmaciones que se oyen y por qué fallan.

- **«RVSM significa Reduced Vertical Separation Mode.»** Es *Minimum*, no *Mode*. No es un modo del avión: es un espacio aéreo con requisitos.
- **«RVSM es simplemente separación de 1.000 pies.»** Describe el resultado. RVSM es el conjunto de equipo, aprobación, procedimientos, entrenamiento y monitorización que hace que esos 1.000 ft sean seguros.
- **«Cualquier avión con piloto automático puede volar RVSM.»** Hacen falta dos fuentes de altitud independientes, control automático de altitud, alerta de altitud y reporte de altitud, más la aprobación del avión, la autorización del operador y el entrenamiento de la tripulación.
- **«RVSM solo depende del ATC.»** El ATC aplica la separación; la capacidad la pone la aeronave, el operador y la tripulación.
- **«Si falla el piloto automático puedo continuar porque vuelo manual.»** La habilidad no sustituye un requisito de equipo. Es *unable RVSM due equipment*.
- **«Si el avión es despachable por MEL, sigue siendo RVSM.»** Despachable y RVSM capable se leen en columnas distintas de la misma entrada.
- **«El TCAS reemplaza los requisitos RVSM.»** Cumplen funciones distintas: RVSM garantiza la separación, el TCAS actúa cuando esa garantía falló.
- **«Si pierdo RVSM debo declarar MAYDAY.»** Se comunica y se coordina. Puede haber emergencia detrás, pero perder RVSM no la constituye.
- **«RVSM solo afecta la planificación del vuelo.»** Empieza ahí, se verifica antes de entrar, se vigila dentro y se reporta después.
- **«FL 290 siempre es un nivel RVSM utilizable.»** Es el límite inferior del espacio, no una garantía de disponibilidad para tu dirección, tu ruta o tu autorización.
- **«Si los altímetros difieren un poco no importa, el ATC tiene radar.»** El radar muestra lo que transmite el transpondedor, y el transpondedor transmite lo que dice el sistema altimétrico. Si ese sistema está corrido, el ATC ve el mismo error.

## Lo que hay que memorizar

Veinticuatro puntos. Lo demás se consulta.

1. RVSM es *Reduced Vertical Separation Minimum*.
2. Es espacio aéreo de calificación especial: se entra por cumplir requisitos.
3. Separación: 1.000 ft.
4. Rango: FL 290 a FL 410, inclusive.
5. En Colombia: RAC 211, numeral 211.530, con monitoreo de CARSAMMA.
6. Depende de tres cosas: avión aprobado, operador autorizado, tripulación entrenada.
7. Equipo: dos sistemas independientes de altitud, transpondedor con reporte, alerta de altitud y control automático de altitud.
8. Para entrar deben operar normalmente: dos primarios, un control automático y una alerta.
9. Antes del despegue: elevación conocida dentro de 75 ft.
10. Por la altitud de transición: 1013,25 hPa en todos, y recomprobar al nivelar.
11. En crucero: primarias dentro de 200 ft, o menos si lo dice el manual.
12. Chequeo con la de reserva cada hora aproximadamente; en oceánico, anotarlo.
13. Nivelaciones: no sobrepasar ni quedarse corto más de 150 ft.
14. Control automático: operativo y acoplado en crucero, salvo retrimado o turbulencia.
15. La altitud se sigue por uno de los primarios, aun con el automático acoplado.
16. El sistema que gobierna el avión alimenta el reporte de altitud.
17. AAD de 300 ft o más notificada por el ATC: volver al nivel lo antes posible.
18. Se reportan e investigan: TVE o AAD de ±300 ft, ASE de ±245 ft. Plazo: 72 horas.
19. Fraseología: *Affirm RVSM*, *Negative RVSM*, *Unable RVSM due equipment*, *Unable RVSM due (causa)*, *Ready to resume RVSM*.
20. *Unable RVSM* se repite en el contacto inicial de todas las frecuencias mientras dure.
21. *Negative RVSM* se reporta en cuatro situaciones, no una.
22. Turbulencia u onda de montaña con desviaciones de unos 200 ft o más: *unable RVSM due (causa)* y pedir vector.
23. Una RA del TCAS prevalece sobre la autorización del ATC.
24. En el plan de vuelo OACI: letra W en la casilla 10.

**Lo que se consulta, no se memoriza:** los límites de discrepancia propios del avión, las restricciones concretas de la MEL, los procedimientos del QRH, los niveles por dirección de vuelo de cada región y los requisitos particulares de cada área RVSM.

## Preguntas típicas de entrevista

| Pregunta | Respuesta corta |
|---|---|
| What does RVSM mean? | Reduced Vertical Separation Minimum. |
| What is the purpose of RVSM? | Increase airspace capacity: nearly twice the usable flight levels. |
| Between which flight levels is RVSM applied? | FL 290 to FL 410, inclusive. |
| What is the vertical separation in RVSM airspace? | 1.000 ft. |
| What equipment is required? | Two independent altitude measurement systems, one altitude reporting transponder, one altitude alerting system, one automatic altitude control system. |
| What must be operating at entry? | Two primary altitude measurement systems, one automatic altitude control system, one altitude alerting device. |
| Why two independent altitude systems? | So an error shows up as a discrepancy that can be detected. |
| What is an altimeter crosscheck? | Comparing the primaries with each other and with the standby, at defined moments. |
| Altimeters disagree in cruise: limit? | 200 ft, or less if the aircraft manual specifies. Beyond that, report the system defective and notify ATC. |
| Preflight altimeter check against field elevation? | Within 75 ft. |
| Maximum overshoot when levelling off? | 150 ft. |
| Autopilot fails in RVSM: still capable? | No. «Unable RVSM due equipment». Flying manually does not restore capability. |
| What does «Unable RVSM due equipment» mean? | The aircraft cannot meet applicable RVSM requirements. It is not an emergency declaration. |
| Can an aircraft be dispatchable but not RVSM capable? | Yes. They are different things, read in different columns of the same MEL entry. |
| What is a Large Height Deviation? | A large vertical deviation that the RVSM monitoring system records and investigates. |
| What is ASE? | Altimetry System Error: difference between displayed pressure altitude at 1013,25 and actual. Not visible in the cockpit. |
| What is AAD? | Assigned Altitude Deviation: difference between transponded altitude and assigned level. |
| Severe turbulence in RVSM? | «Unable RVSM due turbulence», request vector clear of adjacent levels, report location and magnitude. |
| TCAS RA against ATC clearance? | Fly the RA. The clearance does not take priority. |
| ATC reports an altitude deviation? | Return to cleared level as soon as possible, then confirm indications and identify the source. |
| How is RVSM filed in the ICAO flight plan? | Letter W, Item 10. |
| Transponder fails in RVSM? | Request clearance to continue at cleared level; comply with revised clearance. |

---

# QUIZ FINAL DE RVSM

Banco de 40 preguntas. Cada intento toma 20 al azar. Ninguna repite una pregunta de los quiz de capítulo.

**ev-01** · Preparas un vuelo Bogotá–Lima con crucero en FL 350. El avión trae un ítem de MEL en un sistema de altimetría y el plan de vuelo llegó con la letra W en la casilla 10. ¿Qué haces?
- A) Sales: el despacho ya validó el plan y la W corresponde al tipo de aeronave.
- B) Lees la entrada de MEL completa y, si retira la capacidad, resuelves la contradicción antes de salir.
- C) Sales y declaras *negative RVSM* en el primer contacto dentro del espacio.
- D) Sales y pides nivel por debajo de FL 290 sin cambiar el plan.
**Correcta:** B · **Tema:** R11 · **Referencia:** FAA AC 91-85B, Apéndice B, numerales B.3.1 Nota y B.4
**Explicación:** El código de equipo RVSM no debe declararse cuando la aeronave no cumple los requisitos. Si la entrada de MEL retira la capacidad, el plan miente y eso se corrige en tierra, no comunicándolo por radio después.

**ev-02** · En crucero FL 330 observas que las dos primarias difieren 240 ft entre sí. El manual del avión no especifica un límite menor. ¿Qué corresponde?
- A) Continuar y aumentar la frecuencia del barrido de instrumentos.
- B) Seleccionar la primaria que coincida con el altímetro de reserva y seguir.
- C) Reportar el sistema altimétrico como defectuoso y notificarlo al ATC.
- D) Solicitar descenso por debajo de FL 290 sin comunicar el motivo.
**Correcta:** C · **Tema:** R07 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 7
**Explicación:** En crucero las primarias deben coincidir dentro de 200 ft. Si no se cumple, la norma exige reportar el sistema altimétrico como defectuoso y notificarlo al ATC; el contraste con la de reserva sirve para identificar la sospechosa, no para continuar como si nada.

**ev-03** · Durante el ascenso, a FL 270, se pierde la alerta de altitud. ¿Qué corresponde?
- A) Continuar hasta FL 350 y declarar *unable RVSM due equipment* al entrar.
- B) Solicitar una nueva autorización para evitar el vuelo en espacio RVSM.
- C) Nivelar en FL 280 sin comunicar nada.
- D) Continuar: la alerta solo se exige por encima de FL 310.
**Correcta:** B · **Tema:** R15 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.3
**Explicación:** Si el equipo requerido falla antes de entrar, el piloto solicita nueva autorización para evitar el espacio RVSM. *Unable RVSM due equipment* es la comunicación para lo que ocurre después de haber entrado.

**ev-04** · El ATC transmite «Confirm RVSM approved» y tu aeronave sí lo está. ¿Qué respondes?
- A) «Roger, RVSM».
- B) «Affirm RVSM».
- C) «RVSM capable and approved».
- D) «Wilco RVSM».
**Correcta:** B · **Tema:** R26 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-1
**Explicación:** La fraseología normalizada para indicar que el vuelo está aprobado es «Affirm RVSM». Las otras formulaciones no son fraseología establecida.

**ev-05** · Vuelas una aeronave no aprobada para RVSM y solicitas ascender de FL 270 a FL 310. ¿Qué debes incluir?
- A) Nada especial: el ATC ya conoce tu estado por el plan de vuelo.
- B) La mención de tu condición no RVSM en la solicitud de cambio de nivel.
- C) Una declaración de urgencia, porque el nivel está dentro de RVSM.
- D) El código de transpondedor asignado para operaciones no RVSM.
**Correcta:** B · **Tema:** R26 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-1
**Explicación:** El piloto de una aeronave no RVSM reporta su condición en cuatro situaciones, y una de ellas es en todas las solicitudes de cambio de nivel a niveles dentro del espacio RVSM.

**ev-06** · Nivelas en FL 350 y el avión se pasa 180 ft antes de estabilizarse. ¿Qué indica eso?
- A) Está dentro de lo normal: el límite es 200 ft.
- B) Excede el sobrepaso máximo de 150 ft que fija la norma.
- C) Es irrelevante si el automático recupera el nivel.
- D) Obliga a declarar *unable RVSM due equipment*.
**Correcta:** B · **Tema:** R08 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 4
**Explicación:** En transiciones autorizadas entre niveles no se debe sobrepasar ni quedarse corto más de 150 ft. Los 200 ft son el límite de discrepancia entre primarias en crucero, que es otra cosa.

**ev-07** · ¿Cuál de estas magnitudes mide la diferencia entre la altitud de presión que el avión vuela de verdad y la asignada?
- A) ASE.
- B) AAD.
- C) TVE.
- D) SSE.
**Correcta:** C · **Tema:** R17 · **Referencia:** FAA AC 91-85B, Apéndice A, definición 19
**Explicación:** El error vertical total (TVE) es la diferencia geométrica vertical entre la altitud de presión que la aeronave vuela realmente y su altitud de presión asignada. El ASE compara lo mostrado con lo real, y la AAD compara lo transmitido con lo asignado.

**ev-08** · Operas en espacio con vigilancia radar. ¿Cuándo se hace el primer chequeo altimétrico con el altímetro de reserva?
- A) Antes del despegue.
- B) Al cruzar la altitud de transición.
- C) Después de nivelar.
- D) Al entrar en el espacio RVSM, con independencia del nivel.
**Correcta:** C · **Tema:** R07 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 8, letra b
**Explicación:** En espacio con vigilancia, sea radar o ADS-B, el chequeo altimétrico inicial se realiza después de nivelar. En espacio oceánico y remoto se hace y se registra cerca del punto donde empieza la navegación oceánica.

**ev-09** · El ATC te informa una desviación de altitud asignada de 320 ft. ¿Qué haces primero?
- A) Contrastas las tres indicaciones de altitud antes de mover nada.
- B) Regresas al nivel autorizado tan rápido como sea posible.
- C) Declaras *unable RVSM due equipment*.
- D) Solicitas cambio de nivel para evitar tráfico adyacente.
**Correcta:** B · **Tema:** R16 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 10
**Explicación:** Con una AAD notificada de 300 ft o más, la norma pide volver al nivel autorizado lo más rápido posible. Contrastar indicaciones e identificar la causa viene después: primero se recupera el margen.

**ev-10** · ¿Qué diferencia hay entre un level bust y una large height deviation?
- A) El level bust ocurre en ascenso y la large height deviation en descenso.
- B) El level bust nace de un error en la cadena de la autorización; la large height deviation es una desviación grande que el sistema de vigilancia registra.
- C) Son sinónimos, y se usan indistintamente según la región.
- D) El level bust es de más de 300 ft y la large height deviation de más de 500 ft.
**Correcta:** B · **Tema:** R19 · **Referencia:** FAA AC 91-85B, numeral 5.10.2; RAC 211, numeral 211.530
**Explicación:** Se distinguen por origen y por uso. El level bust remite a la causa: oír, colacionar, seleccionar o verificar mal el nivel. La large height deviation remite al sistema de monitorización que la registra y estudia.

**ev-11** · En la vuelta al avión antes de un vuelo RVSM, ¿qué se revisa con atención particular?
- A) El desgaste de los neumáticos y el estado de los frenos.
- B) Las tomas estáticas y el revestimiento del fuselaje cercano a ellas.
- C) El estado de las antenas de comunicaciones VHF.
- D) La presión de los acumuladores hidráulicos.
**Correcta:** B · **Tema:** R14 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.2, apartado 2
**Explicación:** La norma pide atención particular al estado de las tomas estáticas, al revestimiento cercano a cada una y a cualquier componente que afecte la precisión del sistema altimétrico. Es el punto del preflight donde el piloto ve algo que incide directamente en la altitud.

**ev-12** · Tu aeronave pierde todos los altímetros primarios en FL 390. ¿Qué hará el controlador según la norma?
- A) Autorizar el mismo nivel con vigilancia reforzada.
- B) Proporcionar 2.000 ft de separación vertical o separación horizontal apropiada.
- C) Declarar emergencia en tu nombre.
- D) Asignar un código de transpondedor específico de contingencia.
**Correcta:** B · **Tema:** R24 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2
**Explicación:** Ante *unable RVSM due equipment*, el controlador proporciona 2.000 ft de separación vertical o la separación horizontal apropiada, y saca a la aeronave del espacio RVSM salvo que la situación operacional indique otra cosa.

**ev-13** · ¿Qué significa que RVSM sea «espacio aéreo de calificación especial»?
- A) Que solo pueden operar aeronaves de transporte comercial.
- B) Que se accede por cumplir requisitos de equipo, aprobación y entrenamiento, no por altura.
- C) Que exige autorización individual del ATC para cada vuelo.
- D) Que está reservado a operaciones internacionales.
**Correcta:** B · **Tema:** R01 · **Referencia:** FAA AC 91-85B, Apéndice A, definición 15
**Explicación:** La calificación especial se refiere a que el acceso depende de cumplir requisitos: aeronave aprobada, operador autorizado y tripulación entrenada. Alcanzar el nivel no es uno de ellos.

**ev-14** · Con el piloto automático acoplado y turbulencia moderada, decides desacoplarlo para retrimar. ¿Es admisible en RVSM?
- A) No: el automático debe permanecer acoplado sin excepción.
- B) Sí: la norma admite el desacople por retrimado o turbulencia, siguiendo la altitud por un primario.
- C) Sí, pero solo por debajo de FL 350.
- D) No, salvo que se declare *unable RVSM due turbulence* antes.
**Correcta:** B · **Tema:** R08 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 5
**Explicación:** El sistema debe estar operativo y acoplado en crucero nivelado, y la norma admite el desacople por circunstancias como retrimar o turbulencia. En cualquier caso la adherencia a la altitud se hace por referencia a uno de los dos primarios.

**ev-15** · Vuelas a FL 310 y aparece tráfico pesado 1.000 ft por encima y ligeramente adelante. Encuentras estela. ¿Qué puedes solicitar?
- A) Únicamente descenso inmediato.
- B) Vector, cambio de nivel o, si el avión es capaz, un desplazamiento lateral.
- C) Autorización para desconectar el TCAS.
- D) Prioridad de ruta directa.
**Correcta:** B · **Tema:** R23 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2, «Wake Turbulence Encounters»
**Explicación:** La norma prevé esas tres opciones. El controlador, por su parte, puede proporcionar 2.000 ft de separación vertical o separación horizontal apropiada y sacar a la aeronave del espacio RVSM.

**ev-16** · Al aterrizar, anotas en el libro de mantenimiento una discrepancia altimétrica. ¿Qué debe incluir la anotación?
- A) La hora del suceso y el nivel de vuelo.
- B) Lecturas de primario y reserva, ajustes de selector y subescala, y qué automático y qué transpondedor estaban en uso.
- C) Solo la descripción cualitativa del síntoma.
- D) El nombre del controlador que reportó la desviación.
**Correcta:** B · **Tema:** R29 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.7
**Explicación:** La norma enumera lo que hay que anotar cuando corresponda: lecturas de primario y reserva, ajuste del selector de altitud, subescala, qué piloto automático gobernaba y las diferencias con el alterno, diferencias con tomas estáticas alternas, uso del selector de computador de datos aéreos y qué transpondedor daba la altitud al ATC.

**ev-17** · ¿Qué ocurre si el sistema altimétrico que gobierna el avión no es el que alimenta el reporte de altitud?
- A) Nada: son funciones independientes por diseño.
- B) El avión puede volar un nivel y transmitir otro si las fuentes discrepan.
- C) El transpondedor deja de emitir hasta que se corrija.
- D) La alerta de altitud se inhibe automáticamente.
**Correcta:** B · **Tema:** R10 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 9
**Explicación:** Por eso la norma pide que normalmente el sistema que se usa para controlar la aeronave sea el que alimenta el transpondedor. Si no coinciden y las fuentes discrepan, el ATC separa con una altitud que el avión no está volando.

**ev-18** · Turbulencia severa en FL 370 con desviaciones de unos 250 ft. Además de declarar *unable RVSM due turbulence*, ¿qué debes reportar al ATC?
- A) El combustible remanente y las personas a bordo.
- B) La localización y la magnitud de la turbulencia.
- C) El código de transpondedor y la hora estimada de llegada.
- D) El nivel óptimo de crucero para tu peso actual.
**Correcta:** B · **Tema:** R22 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2
**Explicación:** Entre las acciones del piloto está reportar la localización y magnitud de la turbulencia o de la onda de montaña al ATC, que a su vez lo difunde como información meteorológica a otras aeronaves.

**ev-19** · ¿Cuál es el plazo para que el operador reporte a la autoridad un error de mantenimiento de altitud que supere los umbrales establecidos?
- A) 24 horas.
- B) 48 horas.
- C) 72 horas.
- D) 7 días.
**Correcta:** C · **Tema:** R17 · **Referencia:** FAA AC 91-85B, numeral 5.10.1
**Explicación:** El operador debe reportar el evento dentro de las 72 horas, con un análisis inicial de los factores causales y las medidas para prevenir que se repita. La autoridad determina si hacen falta reportes de seguimiento.

**ev-20** · Un avión llega a FL 390 sin dificultad pero no está aprobado para RVSM. ¿Puede operar ahí?
- A) Sí, si el ATC lo autoriza en el momento.
- B) Sí, si el TCAS está operativo.
- C) No, salvo mediante los procedimientos de acomodación aplicables.
- D) Sí, informando su condición en el primer contacto.
**Correcta:** C · **Tema:** R27 · **Referencia:** FAA AC 91-85B, Apéndice B, numerales B.4 y B.4.2
**Explicación:** Los operadores deben estar autorizados y las aeronaves ser conformes, con excepciones limitadas. Existen procedimientos de acomodación para categorías específicas, sujetos a autorización; la capacidad de alcanzar el nivel no habilita nada.

**ev-21** · ¿Por qué el ASE no aparece en ningún indicador de la cabina?
- A) Porque solo se manifiesta por encima de FL 410.
- B) Porque el error está en la propia medición de la altitud.
- C) Porque el sistema lo corrige automáticamente en tiempo real.
- D) Porque se calcula únicamente en tierra tras el vuelo.
**Correcta:** B · **Tema:** R29 · **Referencia:** FAA AC 91-85B, numeral 4.3.1; Apéndice A, definición 4
**Explicación:** El ASE es la diferencia entre la altitud de presión mostrada con la referencia estándar y la real. Como el error está en la medición, el instrumento presenta un valor de aspecto normal que está corrido, y no hay indicación que lo delate.

**ev-22** · Estás en FL 350 y recibes una resolución del TCAS que exige ascender, contra tu autorización. ¿Qué haces?
- A) Mantienes el nivel y solicitas confirmación al ATC.
- B) Ejecutas la maniobra de la resolución.
- C) Desconectas el TCAS y mantienes el nivel autorizado.
- D) Desciendes, porque el tráfico está por encima.
**Correcta:** B · **Tema:** R28 · **Referencia:** Procedimientos ACAS aplicables; FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 3
**Explicación:** Una autorización del ATC no tiene prioridad sobre una resolución que exija maniobra. Es la excepción expresa a la regla de no apartarse del nivel autorizado sin autorización positiva, reservada a contingencia o emergencia.

**ev-23** · ¿Qué debe hacer la tripulación cuando el procedimiento de contingencia RVSM deja de ser necesario?
- A) Nada: el ATC lo deduce al observar el nivel estable.
- B) Notificarlo al ATC.
- C) Esperar a la siguiente transferencia de frecuencia.
- D) Anotarlo únicamente en el libro técnico.
**Correcta:** B · **Tema:** R25 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.6
**Explicación:** Es responsabilidad expresa de la tripulación notificar al ATC cuando la aplicación de los procedimientos de contingencia ya no es necesaria. La fraseología prevista para ello es «Ready to resume RVSM».

**ev-24** · Antes del despegue, con QNH puesto, el altímetro del comandante marca la elevación del aeródromo con 40 ft de diferencia y el del primer oficial con 55 ft. ¿Qué concluyes?
- A) Ambos están fuera de límite y hay que reportarlo.
- B) Ambos están dentro del tope de 75 ft frente a la elevación conocida.
- C) La diferencia entre ellos, 15 ft, excede el límite de crucero.
- D) Solo el del primer oficial requiere verificación adicional.
**Correcta:** B · **Tema:** R07 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.2, apartado 3
**Explicación:** El tope frente a la elevación conocida es de 75 ft y ambos lo cumplen. Además, las dos primarias deben coincidir entre sí dentro del límite del manual del avión; los 200 ft son el límite en crucero, no en tierra.

**ev-25** · ¿Qué caracteriza a la onda de montaña desde el punto de vista del piloto en RVSM?
- A) Que siempre produce desviaciones superiores a 300 ft.
- B) Que puede producir variaciones verticales importantes aunque el avión esté sano.
- C) Que inhibe el funcionamiento del sistema de alerta de altitud.
- D) Que solo aparece por debajo de FL 290.
**Correcta:** B · **Tema:** R22 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2 y Apéndice D
**Explicación:** La onda puede desplazar verticalmente al avión sin que nada haya fallado a bordo, y eso compromete el mantenimiento del nivel. La propia norma aclara que no necesariamente produce desviaciones del orden de 200 ft.

**ev-26** · Se pierde una de las dos primarias y puedes confirmar la precisión de la que queda contra la de reserva. ¿Qué comunicas?
- A) *Unable RVSM due equipment*.
- B) La operación con una sola primaria, notificándola al ATC.
- C) Nada, mientras la indicación restante sea estable.
- D) *Negative RVSM* en todas las frecuencias.
**Correcta:** B · **Tema:** R24 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2, «One Primary Altimeter Remains Operational»
**Explicación:** Se contrasta con la de reserva y se notifica al ATC la operación con una sola primaria; el controlador lo acusa. *Unable RVSM due equipment* corresponde solo si no se puede confirmar la precisión de la primaria restante.

**ev-27** · ¿Qué tres condiciones deben darse simultáneamente para operar RVSM?
- A) Aeronave aprobada, plan de vuelo con la W y autorización del ATC.
- B) Aeronave aprobada, operador autorizado y tripulación entrenada.
- C) TCAS operativo, transpondedor operativo y dos altímetros.
- D) Aprobación de aeronavegabilidad, licencia del piloto y nivel disponible.
**Correcta:** B · **Tema:** R04 · **Referencia:** FAA AC 91-85B, numeral 1.1; RAC 119, numeral 119.270(a)
**Explicación:** Las tres tienen que darse a la vez. La letra W declara la capacidad, no la otorga, y la autorización del ATC asigna el nivel, no habilita la operación RVSM.

**ev-28** · Según el RAC colombiano, ¿qué ocurre con el VFR sobre FL 290 en espacio de separación vertical reducida?
- A) Se permite con autorización del ATC.
- B) Se permite solo de día.
- C) No se permite en ningún caso.
- D) Se permite si la visibilidad supera los 10 km.
**Correcta:** C · **Tema:** R31 · **Referencia:** RAC 91, numerales 91.305 y 91.310
**Explicación:** Sin autorización no hay VFR sobre FL 200, y sobre FL 290 en espacio RVSM no se permite en ningún caso. El espacio RVSM colombiano es de operación IFR.

**ev-29** · Te transfieren a una nueva frecuencia mientras operas con *unable RVSM due equipment*. ¿Qué haces en el contacto inicial?
- A) No mencionas nada: ya lo comunicaste en la frecuencia anterior.
- B) Repites *unable RVSM due equipment*.
- C) Solicitas confirmación de que el controlador anterior coordinó tu situación.
- D) Declaras *negative RVSM*.
**Correcta:** B · **Tema:** R26 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-1, Nota
**Explicación:** La frase se usa tanto para la indicación inicial de la falla como en el contacto inicial en todas las frecuencias del espacio RVSM, hasta que el problema deje de existir o la aeronave salga del espacio.

**ev-30** · Pierdes capacidad RVSM en FL 370 y el ATC te asigna FL 270 para el resto del vuelo. ¿Qué cálculo se vuelve prioritario?
- A) El nivel óptimo para el peso actual.
- B) La predicción de combustible al destino frente a alterno más reserva final.
- C) El tiempo estimado de llegada revisado.
- D) La velocidad de crucero de máximo alcance.
**Correcta:** B · **Tema:** R30 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.6; módulo Gestión del combustible
**Explicación:** Un nivel inferior consume más por hora, así que la predicción al destino empeora. La comprobación que manda es si se conserva el combustible para el alterno más la reserva final; si no, se replanifica con el despacho.

**ev-31** · ¿Cuál es el valor nominal de la alerta de altitud en un avión cuyo certificado de tipo se solicitó después del 9 de abril de 1997?
- A) ±100 ft.
- B) ±200 ft.
- C) ±300 ft.
- D) ±500 ft.
**Correcta:** B · **Tema:** R05 · **Referencia:** FAA AC 91-85B, Apéndice A, numeral A.4.1.3, apartado 2
**Explicación:** En aviones cuya solicitud de certificado de tipo o cambio mayor es posterior al 9 de abril de 1997, el valor nominal no debe superar ±200 ft, con una tolerancia de equipo que no exceda ±50 ft. En los anteriores, el valor es ±300 ft.

**ev-32** · Dos aeronaves en niveles RVSM adyacentes se desvían 300 ft cada una, una hacia la otra. ¿Qué margen vertical queda?
- A) 1.000 ft.
- B) 700 ft.
- C) 400 ft.
- D) 300 ft.
**Correcta:** C · **Tema:** R21 · **Referencia:** FAA AC 91-85B, Apéndice A, definición 15
**Explicación:** De los 1.000 ft nominales se consumen 300 por cada aeronave: quedan 400 ft. Es el ejemplo que explica por qué en RVSM la referencia no es el porcentaje de altitud sino la fracción del margen.

**ev-33** · ¿Qué información debe llevar el plan de vuelo OACI de una aeronave RVSM?
- A) La sigla RVSM en la casilla 18.
- B) La letra W en la casilla 10.
- C) La letra R en la casilla 10.
- D) El número de aprobación del operador en la casilla 19.
**Correcta:** B · **Tema:** R13 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.1, apartado 2
**Explicación:** La casilla 10, de equipo, se anota con la letra W para operar en espacio RVSM. Los proveedores de servicios de tránsito aéreo usan esos códigos para decidir cuándo aplicar separación de 1.000 ft.

**ev-34** · En el ascenso, ¿en qué momento se ajusta la subescala a 1013,25 hPa en un vuelo RVSM?
- A) Al entrar en FL 290.
- B) Al cruzar la altitud de transición, sin demora, y se recomprueba al nivelar.
- C) Al recibir la autorización de crucero.
- D) Al alcanzar el primer nivel por encima de FL 100.
**Correcta:** B · **Tema:** R16 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 2
**Explicación:** La norma pone énfasis en ajustar sin demora todos los altímetros, primarios y de reserva, al subir por la altitud de transición, y en volver a comprobar el ajuste al llegar al primer nivel autorizado.

**ev-35** · ¿Cuál de estos eslabones de la cadena de la autorización se omite con más frecuencia y produce level bust?
- A) La colación al ATC.
- B) La verificación cruzada del nivel seleccionado.
- C) La ejecución del cambio de nivel.
- D) La captura automática de altitud.
**Correcta:** B · **Tema:** R20 · **Referencia:** FAA AC 91-85B, numeral 5.10.2
**Explicación:** Es el único eslabón que no produce efecto visible cuando se hace bien, y por eso es el primero que desaparece bajo carga de trabajo. Los errores operacionales de mantenimiento de altitud se concentran ahí.

**ev-36** · ¿Qué hace que una aeronave se denomine «no RVSM»?
- A) Volar por debajo de FL 290 de forma habitual.
- B) No cumplir los requisitos, incluido no tener operativo el equipo RVSM.
- C) No llevar TCAS instalado.
- D) Operar con un solo piloto.
**Correcta:** B · **Tema:** R27 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.4
**Explicación:** Se denomina no RVSM al operador o aeronave que no cumple los requisitos, incluida la aeronave sin equipo RVSM operativo. En ese caso no se declara el código de equipo en el plan y el piloto informa al controlador de la falta de aprobación.

**ev-37** · Durante el crucero en espacio oceánico, ¿qué se hace con el chequeo altimétrico?
- A) Se omite: no hay vigilancia radar que lo requiera.
- B) Se hace y se registra cerca del punto donde empieza la navegación oceánica.
- C) Se hace solo si el comparador automático señala una diferencia.
- D) Se hace cada 30 minutos y se transmite al control oceánico.
**Correcta:** B · **Tema:** R07 · **Referencia:** FAA AC 91-85B, Apéndice B, numeral B.3.4, apartado 8, letra c
**Explicación:** En espacio oceánico y remoto se hace y se registra en las proximidades del punto donde comienza la navegación oceánica, anotando las lecturas de primarias y de reserva para tenerlas disponibles en una contingencia.

**ev-38** · ¿Cuál es el propósito del programa de monitorización de la performance de mantenimiento de altitud?
- A) Sancionar a las tripulaciones que cometen desviaciones.
- B) Permitir a la autoridad evaluar cómo se comportan de verdad aeronaves y operadores en servicio.
- C) Calcular el nivel óptimo de crucero de cada flota.
- D) Certificar los altímetros antes de su instalación.
**Correcta:** B · **Tema:** R29 · **Referencia:** FAA AC 91-85B, numeral 4.2 y referencias al programa de monitorización
**Explicación:** Es un control de calidad que permite a la autoridad evaluar la performance de mantenimiento de altitud de aeronaves y operadores en servicio. Los operadores deben participar en el programa que corresponda a su tipo de operación.

**ev-39** · Un avión con dos ítems de MEL abiertos, cada uno aceptable por separado. ¿Cómo se evalúa el efecto conjunto sobre RVSM?
- A) Sumando las restricciones de cada uno.
- B) Tomando la más restrictiva de las dos.
- C) Revisando si la MEL prohíbe la combinación o cambia el efecto.
- D) Consultando al ATC antes del despegue.
**Correcta:** C · **Tema:** R11 · **Referencia:** Práctica estándar de listas de equipo mínimo; módulo MEL de Aviatory
**Explicación:** Las restricciones no son aditivas. La lista puede prohibir expresamente una combinación que admite por separado, y el efecto conjunto sobre la capacidad RVSM puede no coincidir con el de ninguno de los dos aislados.

**ev-40** · En una entrevista te preguntan qué harías si un sistema requerido falla en crucero RVSM. ¿Cuál es el orden correcto de tu respuesta?
- A) Comunicar al ATC, identificar la falla, controlar la aeronave y consultar el QRH.
- B) Controlar la aeronave, identificar la falla, aplicar QRH y SOP, determinar la capacidad, informar al ATC y coordinar.
- C) Declarar emergencia, descender y comunicar al aterrizar.
- D) Consultar la MEL en vuelo y continuar hasta el destino.
**Correcta:** B · **Tema:** R25 · **Referencia:** FAA AC 91-85B, Apéndice B, Tabla B-2 y numeral B.3.6
**Explicación:** Aviar, navegar, comunicar. Se mantiene el nivel en lo posible mientras se evalúa, se vigila el tráfico, se identifica la falla, se aplican QRH y SOP, se concluye si se conserva la capacidad, se informa al ATC tan pronto la situación lo permita y se coordina la nueva autorización.

---

# ANEXO A · HUECOS DE IMAGEN

Los veinte huecos del módulo, en orden de aparición, con el capítulo al que pertenecen.

| # | Capítulo | Qué muestra |
|---|---|---|
| 1 | R01 | Perfil vertical comparado: 2.000 ft frente a 1.000 ft |
| 2 | R02 | Los tres estratos: por debajo, espacio RVSM, por encima |
| 3 | R04 | Convergencia: aeronave, operador y tripulación |
| 4 | R05 | Los cuatro sistemas requeridos, en rejilla |
| 5 | R06 | Cabina anotada: dos primarias y el altímetro de reserva |
| 6 | R07 | Línea de tiempo de los cuatro chequeos, con sus cifras |
| 7 | R08 | PFD anotado: altitud seleccionada, actual y estado del automático |
| 8 | R11 | Entrada de MEL anotada: despachable frente a RVSM capable |
| 9 | R13 | Plan de vuelo OACI anotado: la letra W en la casilla 10 |
| 10 | R14 | Detalle de toma estática y revestimiento en el preflight |
| 11 | R15 | Puerta de entrada RVSM en FL 290 con la secuencia de verificación |
| 12 | R17 | Las tres magnitudes: AAD, TVE y ASE, acotadas |
| 13 | R18 | Dos aeronaves y una desviación vertical que consume el margen |
| 14 | R20 | Cadena CRM de siete eslabones con el eslabón débil marcado |
| 15 | R21 | Mil pies, y lo que queda tras una desviación de 300 ft |
| 16 | R22 | Onda de montaña y desplazamiento vertical inducido |
| 17 | R25 | Flujo de contingencia: aviar, navegar, comunicar |
| 18 | R28 | TCAS y RVSM: lo que garantiza cada uno |
| 19 | R30 | Cadena de consecuencias hasta la decisión de combustible |
| 20 | R32 | Perfil completo de un vuelo con sus puntos de control RVSM |

# ANEXO B · FUENTES

- **FAA AC 91-85B**, *Authorization of Aircraft and Operators for Flight in Reduced Vertical Separation Minimum (RVSM) Airspace*, 29 de enero de 2019. Apéndices A, B y D, y numeral 5.10.
- **RAC 211** (Colombia), numeral 211.530.
- **RAC 91** (Colombia), numerales 91.305 y 91.310.
- **RAC 119** (Colombia), numerales 119.020(d) y 119.270(a).
- **OACI Doc 9574**, *Manual on Implementation of a 300 m (1 000 ft) Vertical Separation Minimum Between FL 290 and FL 410 Inclusive*.
- **AIP Colombia** y circulares de la Aerocivil vigentes, para los procedimientos particulares de las FIR y los requisitos de aprobación detallados.

# ANEXO C · NOTAS DE VERIFICACIÓN (no van a la app)

- Las cifras de diseño del equipo (±200 y ±300 ft de alerta, ±65 y ±130 ft de mantenimiento, ±25 ft del selector) salen del Apéndice A de la AC 91-85B y se usan solo como contexto explicativo, no como chequeos de tripulación.
- El umbral numérico regional para clasificar una *large height deviation* y el procedimiento de reporte entre agencias **no se publican en este módulo**: se marcan como «verificar» en el capítulo 18. Lo verificado y citado son los umbrales de reporte de la FAA.
- La circular GCEP-1.0-22-033 de la Aerocivil se cita como fuente a consultar; su contenido no se reproduce porque el documento no estaba accesible en el sitio de la autoridad al redactar esta versión.
- Todos los límites que dependen del avión se dejan explícitamente remitidos al AFM, el FCOM y el QRH.

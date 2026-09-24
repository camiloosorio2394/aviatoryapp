# Comunicaciones aeronáuticas y gestión ATC (OACI) · Nivel 3: Autorizaciones y superficie

Capítulos 12 a 18. Este nivel lleva al piloto desde la autorización IFR en el puesto de
estacionamiento hasta el despegue: qué escucha, qué significa, qué colaciona y qué no puede
dar por supuesto.

**Sobre los ejemplos.** Son educativos. El distintivo es `AVIATORY 452` (y `AVIATORY 425` o
`AVIATORY 542` cuando hace falta un distintivo parecido). Las estaciones se llaman «Bogota
Delivery», «Bogota Ground», «Bogota Tower» y «Bogota Departure» solo como ambientación: las
pistas, calles de rodaje, puestos, frecuencias, rutas y puntos (GIKOS y los demás) son
**ficticios** y no describen el aeropuerto real. Cuando un ejemplo en inglés se adapta de uno del
Doc 9432, se indica el párrafo; el original usa el distintivo FASTAIR 345 y otros nombres de
lugar. Los números se escriben en cifras para leer más rápido; se pronuncian como enseña el
capítulo 5 (Nivel 1).

Fuentes cargadas para este nivel: Doc 4444 PANS-ATM (15.ª ed., Enm. 4, 2012) cap. 1 y 4;
Doc 9432 Manual de radiotelefonía (4.ª ed., 2007) cap. 1 a 5 y 7.1. El Doc 4444 cargado **no es
la edición vigente** (existe la 16.ª ed. de 2016 con enmiendas) y su capítulo 12 de fraseología no
está cargado: por eso varias frases llevan VERIFICAR.

---

## 12. READBACK Y HEARBACK

### ¿Qué es?

**Readback (colación)**: la tripulación repite al controlador las partes de una autorización o
instrucción que tienen que ver con la seguridad (Doc 4444, 4.5.7.5.1). La palabra normalizada
READ BACK significa «repítame todo este mensaje, o la parte especificada del mismo, exactamente
como la haya recibido» (Doc 9432, 2.6).

**Hearback**: el controlador escucha esa colación para comprobar que la tripulación recibió bien
la autorización y corrige de inmediato cualquier discrepancia (Doc 4444, 4.5.7.5.2; Doc 9432,
2.8.3.8). «Hearback» es un término de uso común en la industria; en los textos cargados de la
OACI la función aparece descrita, no con ese nombre.

Los dos forman un circuito cerrado: ATC transmite, el piloto colaciona, ATC verifica y, si hay
error, corrige. Si falta un eslabón, el error pasa sin que nadie lo vea.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-12-01 · Diagrama · 16:9 · 1600 × 900 px
IMAGEN SUGERIDA:
Circuito cerrado en cuatro pasos, dibujado como un anillo con flechas en sentido horario.
1) Torre (icono de torre) emite: «AVIATORY 452, hold short of runway 18». 2) Cabina (icono de
auriculares) colaciona: «Hold short of runway 18, AVIATORY 452». 3) Torre con un oído
resaltado: «hearback: ¿coincide?». 4) Dos salidas desde el paso 3: verde «coincide: autorización
confirmada» y ámbar «no coincide: NEGATIVE, I SAY AGAIN + versión correcta», que vuelve al paso
2. Rótulos en mono, mayúsculas.
OBJETIVO:
Que el piloto vea que la colación no es un trámite: es la mitad de un circuito de verificación
que solo funciona si ambos lados escuchan.

### Lo que debe saber un piloto

**Qué se colaciona siempre.** Lista textual del Doc 4444, 4.5.7.5.1:

> a) autorizaciones de ruta ATC;
> b) autorizaciones e instrucciones para entrar, aterrizar, despegar, mantenerse fuera de, cruzar,
> rodar y retroceder en cualquier pista; y
> c) pista en uso, reglajes de altímetro, códigos SSR, instrucciones de nivel, instrucciones de
> rumbo y de velocidad y niveles de transición, ya sea que sean expedidos por el controlador ya
> sea que estén incluidos en las radiodifusiones del servicio automático de información terminal
> (ATIS).

Traducido a cabina:

| Grupo | Lo que escuchó | Ejemplo de lo que repite |
|---|---|---|
| Autorización de ruta | Límite, ruta, salida, nivel, código | «Cleared to Cali, GIKOS 1A departure, FL 240, squawk 4521» |
| Todo lo que toca una pista | Entrar, alinearse, despegar, aterrizar, esperar fuera, cruzar, rodar o retroceder sobre ella | «Hold short of runway 18», «Runway 13 cleared for take-off» |
| Valores | Pista en uso, QNH, código SSR, nivel, rumbo, velocidad, nivel de transición | «QNH 1022», «Squawk 4521», «Heading 040» |

Tres detalles:

- El Doc 9432 (2.8.3.5 b) trae la misma lista pero sin «rodar» sobre la pista. El Doc 4444 con la
  Enmienda 4 sí lo incluye. Manda el más reciente: si le dicen que ruede por una pista (por
  ejemplo, un retroceso o *backtrack*), lo colaciona.
- **Lo demás también se responde.** Otras autorizaciones o instrucciones, incluidas las
  condicionales, «se colacionarán o se acusará recibo de las mismas indicándose claramente que
  han sido comprendidas y que se cumplirán» (Doc 4444, 4.5.7.5.1.1).
- **CPDLC**: salvo que la autoridad ATS lo prescriba, no se requiere colación oral de mensajes
  CPDLC (Doc 4444, 4.5.7.5.2.1). Se ve en el Nivel 6.

**Cómo se colaciona.**

- Termine la colación con su distintivo de llamada (Doc 9432, 2.8.3.7). Así el controlador sabe
  quién colacionó, y eso protege contra distintivos parecidos.
- Repita los valores y las palabras que condicionan la acción: el número de pista, «hold short»,
  «behind», «until», «after passing». Sin la condición, la colación está incompleta.
- ROGER no sirve como colación. ROGER significa «he recibido toda su transmisión anterior» y la
  OACI aclara que no se usa para responder cuando se exige colacionar o dar una respuesta directa
  AFFIRM o NEGATIVE (Doc 9432, 2.6).
- Si el controlador detecta un error, responde «NEGATIVE, I SAY AGAIN» y la versión correcta
  (Doc 9432, 2.8.3.9). Usted vuelve a colacionar la versión correcta.

**Por qué existe.** El grado de necesidad de colacionar está ligado a la posibilidad real de un
malentendido, y la colación sirve además para comprobar que solo la aeronave a la que iba dirigida
actúe según la autorización (Doc 9432, 2.8.3.4).

**Hearback desde cabina.** El hearback es función del controlador, pero la tripulación también
escucha la respuesta: si ATC corrige, esa corrección es una nueva instrucción que hay que
colacionar. Que el controlador no diga nada después de su colación no prueba que la haya
escuchado bien (pudo haber una transmisión bloqueada o el controlador estar atendiendo a otro).
Esto último es buena práctica de cabina, no texto OACI.

### Fraseología OACI

**Ejemplo 1. Autorización de ruta completa** (estructura de Doc 9432, 2.8.3.6)

ATC: "AVIATORY 452, cleared to Cali, via A1, FL 240, GIKOS 1A departure, squawk 4521."
PILOT: "Cleared to Cali, via A1, FL 240, GIKOS 1A departure, squawk 4521, AVIATORY 452."
Autorización de ruta: se repite completa (grupo a) y el código SSR (grupo c). El distintivo va al
final.

**Ejemplo 2. Código SSR** (Doc 9432, 2.8.3.7)

ATC: "AVIATORY 452, squawk 6402."
PILOT: "6402, AVIATORY 452."
Un código SSR siempre se colaciona, aunque la instrucción sea de una sola palabra.

**Ejemplo 3. Colación errada y corrección** (Doc 9432, 2.8.3.9)

ATC: "AVIATORY 452, QNH 1003."
PILOT: "QNH 1013, AVIATORY 452."
ATC: "AVIATORY 452, negative, I say again, QNH 1003."
PILOT: "QNH 1003, AVIATORY 452."
El piloto repitió lo que esperaba oír (1013 es la presión normalizada redondeada). El hearback lo
detectó. Un QNH mal ajustado es un error de altitud.

**Ejemplo 4. Instrucción de pista con condición** (estructura de Doc 9432, 4.4.2)

ATC: "AVIATORY 452, taxi to holding point runway 13 via B, hold short of runway 18."
PILOT: "Taxi to holding point runway 13 via B, hold short of runway 18, AVIATORY 452."
«Hold short of runway 18» es una instrucción de mantenerse fuera de una pista: grupo b, siempre
se colaciona.

**Ejemplo 5. Colación incompleta** (escenario de práctica, corrección según Doc 9432, 2.8.3.9)

ATC: "AVIATORY 452, taxi to holding point runway 13 via B, hold short of runway 18."
PILOT: "Holding point runway 13 via B, AVIATORY 452."
ATC: "AVIATORY 452, negative, I say again, hold short of runway 18."
PILOT: "Hold short of runway 18, AVIATORY 452."
El piloto se quedó con la parte que esperaba y omitió la que protege una pista. El controlador lo
detectó; en una frecuencia saturada podría no haberlo hecho.

**Ejemplo 6. Instrucción con condición de nivel** (Doc 9432, 3.3.3.1)

ATC: "AVIATORY 452, after passing GIKOS descend to FL 80."
PILOT: "After GIKOS descend to FL 80, AVIATORY 452."
Si colaciona solo «descend FL 80», el controlador no sabe si usted entendió que debe esperar a
pasar GIKOS.

**Ejemplo 7. Rumbo con condición** (estructura de Doc 9432, 7.1.2)

ATC: "AVIATORY 452, turn right heading 040 until passing FL 70, then direct GIKOS."
PILOT: "Right heading 040 until passing FL 70, then direct GIKOS, AVIATORY 452."
Rumbo (grupo c), sentido del viraje y la condición «until passing».

**Ejemplo 8. Acuse de recibo que muestra que cumplirá** (Doc 9432, 2.8.3.7)

ATC: "AVIATORY 452, hold position."
PILOT: "Holding, AVIATORY 452."
Instrucción corta: el acuse deja claro que la entendió y la cumple (Doc 4444, 4.5.7.5.1.1).

### Aplicación en aerolínea

En la mayoría de operadores el piloto que no vuela (PM) colaciona y el que vuela (PF) escucha y
verifica; los dos confirman lo que se selecciona en el panel (altitud, rumbo, código). Cómo se
reparte exactamente depende del SOP de cada operador. Lo común a todos: se anota o se selecciona
lo que se escuchó **antes** de colacionar, y se colaciona lo que se seleccionó, no lo que se
recuerda.

### Error frecuente

- Colacionar con ROGER o WILCO una instrucción que exige colación («Roger, AVIATORY 452» a un
  «hold short»).
- Colacionar lo esperado en vez de lo escuchado (QNH, pista, nivel).
- Omitir la condición («until», «after passing», «behind»).
- Omitir el distintivo al final, que es lo que permite descubrir que la colación la hizo otro.
- No escuchar la corrección del controlador porque la tripulación ya pasó a otra tarea.

### En pocas palabras

- Readback: la tripulación repite lo crítico. Hearback: el controlador verifica esa repetición.
- Siempre: autorización de ruta, todo lo que toca una pista, pista en uso, QNH, código SSR, nivel,
  rumbo, velocidad y nivel de transición (Doc 4444, 4.5.7.5.1).
- Lo demás se colaciona o se acusa de forma que se vea que se entendió y se cumplirá.
- ROGER no es colación.
- Si ATC dice NEGATIVE, I SAY AGAIN: colacione de nuevo la versión correcta.

FUENTES
- Verificado: Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1, 4.5.7.5.1.1, 4.5.7.5.2, 4.5.7.5.2.1; Doc 9432 (4.ª ed.) 2.6 (READ BACK, ROGER, WILCO), 2.8.3.4 a 2.8.3.9, 3.3.3.1, 4.4.2, 7.1.2.
- VERIFICAR: que la lista de 4.5.7.5.1 siga igual en la edición vigente del Doc 4444 (16.ª ed. con enmiendas), cap. 4 (no cargada).
- VERIFICAR: cómo aplica cada Estado la colación de elementos recibidos por ATIS (por ejemplo, confirmar el QNH en el primer contacto): AIP del Estado, GEN 3.4 (en Colombia, AIP Colombia y RAC).
- VERIFICAR: estructura de colación de SID «GIKOS 1A departure» contra Doc 4444 cap. 12 (fraseología de autorizaciones de salida), no cargado.

---

## 13. CLEARANCES ATC

### ¿Qué es?

Una **autorización del control de tránsito aéreo** (clearance) es la «autorización para que una
aeronave proceda en condiciones especificadas por una dependencia de control de tránsito aéreo»
(Doc 4444, cap. 1; Doc 9432, 1.1). Puede ir seguida de «de rodaje», «de despegue», «de salida»,
«en ruta», «de aproximación» o «de aterrizaje» según la fase del vuelo (misma definición, Nota 2).

Por la frecuencia pasan cuatro tipos de mensaje que el piloto debe distinguir al oírlos:

| Tipo | Qué es | Cómo suena | Qué responde el piloto |
|---|---|---|---|
| **Clearance** (autorización) | Permiso para proceder en condiciones especificadas | CLEARED…, APPROVED… | Colación |
| **Instruction** (instrucción) | «Directrices impartidas por el control de tránsito aéreo con la finalidad de exigir que un piloto tome determinada medida» (Doc 4444, cap. 1) | HOLD SHORT, CLIMB, TURN, SQUAWK, CONTACT, GIVE WAY | Colación, o acuse que muestre que cumplirá |
| **Information** (información) | Datos para su conciencia situacional: tránsito, viento, trabajos en la pista | CAUTION…, TRAFFIC…, WIND… | ROGER, o la acción que corresponda |
| **Request** (solicitud) | Lo que el piloto pide | REQUEST… | Espera APPROVED, una autorización, STANDBY o UNABLE |

Palabras clave (Doc 9432, 2.6):

- **CLEARED**: «autorización para seguir en las condiciones determinadas».
- **APPROVED**: «autorización concedida para la medida propuesta» (usted propuso algo y se lo
  aprueban: «push-back approved»).
- **RECLEARED**: «se efectúa una modificación en su última autorización y esta nueva autorización
  invalida la anterior o parte de ella».
- **STANDBY**: «espere y le llamaré». **No es ni una aprobación ni una denegación.**
- **UNABLE**: «no puedo cumplir su solicitud, instrucciones o autorización», normalmente seguido
  del motivo.

### Lo que debe saber un piloto

**Qué autoriza y qué no.** Una autorización significa que puede continuar «solamente en lo que
respecta al tránsito aéreo conocido». No da derecho a violar ninguna regla ni exime al piloto al
mando de su responsabilidad (Doc 4444, 4.5.1.3). Si la autorización lo lleva hacia terreno,
meteorología o una limitación del avión, la responsabilidad de decir UNABLE es suya.

**Si no le conviene, puede pedir otra.** La tripulación puede solicitar una autorización enmendada
si la recibida no es conveniente (Doc 4444, 4.5.1.2). Si ATC no puede, usará la palabra UNABLE y,
cuando las circunstancias lo justifiquen, ofrecerá una alternativa (Doc 4444, 4.5.7.4.2).

**Entender antes de ejecutar.** La regla práctica tiene cuatro salidas:

1. **Entendí y puedo** → colaciono y ejecuto.
2. **No escuché todo** → SAY AGAIN (o SAY AGAIN ALL AFTER…, ALL BEFORE…, ALL BETWEEN…)
   (Doc 9432, 2.8.1.4).
3. **Escuché pero dudo de un dato** → CONFIRM (item) («solicito verificación de…», Doc 9432, 2.6).
4. **Entendí pero no puedo** → UNABLE y el motivo (Doc 9432, 2.8.3.10).

Nunca: asumir, completar con lo que «debía» decir, ni ejecutar a medias mientras aclara.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-13-01 · Diagrama · 4:5 · 1200 × 1500 px
IMAGEN SUGERIDA:
Diagrama de flujo vertical. Arriba: «Mensaje ATC con su distintivo». Primer rombo: «¿Lo escuché
completo?». No → caja «SAY AGAIN (item)» que vuelve arriba. Sí → segundo rombo: «¿Estoy seguro
de cada dato?». No → caja «CONFIRM (item)». Sí → tercer rombo: «¿Puedo cumplirlo con seguridad?».
No → caja ámbar «UNABLE + motivo». Sí → caja «Colacionar → seleccionar → verificar → ejecutar».
Nota al pie: «STANDBY de ATC no es aprobación».
OBJETIVO:
Que el piloto tenga una ruta de decisión automática y nunca ejecute lo que no entendió.

### Fraseología OACI

**Ejemplo 1. Información: se acusa recibo** (Doc 9432, 4.10)

ATC: "AVIATORY 452, caution construction work adjacent to gate 37."
PILOT: "Roger, AVIATORY 452."
Es información, no una instrucción: ROGER basta. Pero la información cambia lo que usted hace
(rodar con más cuidado cerca del puesto 37).

**Ejemplo 2. Solicitud y STANDBY** (Doc 9432, 4.3.1)

PILOT: "Apron, AVIATORY 452, stand 27, request push-back."
ATC: "AVIATORY 452, stand by. Expect one minute delay due B747 taxiing behind."
PILOT: "AVIATORY 452."
STANDBY no aprueba el retroceso. El avión no se mueve hasta oír «push-back approved».

**Ejemplo 3. Instrucción con tránsito** (Doc 9432, 4.4.3)

ATC: "AVIATORY 452, taxi to holding point runway 27, give way to B747 passing left to right, QNH 1019."
PILOT: "Holding point runway 27, QNH 1019, giving way to B747, AVIATORY 452."
Instrucción con condición de tránsito: la colación incluye el límite, el QNH y la cesión de paso.

**Ejemplo 4. UNABLE con motivo** (Doc 9432, 2.8.3.10)

ATC: "AVIATORY 452, Bogota Departure, cleared to Cali FL 240, cross GIKOS FL 150 or above, if unable, maintain FL 130."
PILOT: "Bogota Departure, unable to cross GIKOS FL 150 due weight, maintaining FL 130, AVIATORY 452."
El controlador anticipó la posibilidad («if unable») y el piloto la usa dando el motivo. UNABLE no
es una falta: es información que el controlador necesita para separar.

**Ejemplo 5. Repetición parcial** (Doc 9432, 2.8.1.4)

ATC: "AVIATORY 452, taxi to holding point runway 13 via B, [ruido] runway 18."
PILOT: "AVIATORY 452, say again all after via B."
El piloto no sabe si oyó «cross» o «hold short». No elige una: pide la parte que le falta.

**Ejemplo 6. CONFIRM ante una duda** (construido con la palabra CONFIRM de Doc 9432, 2.6)

PILOT: "Bogota Ground, AVIATORY 452, confirm hold short of runway 18."
ATC: "AVIATORY 452, affirm, hold short of runway 18."
PILOT: "Hold short of runway 18, AVIATORY 452."
Ante la duda sobre una pista, se pregunta antes de acercarse a ella.

**Ejemplo 7. Nueva autorización que reemplaza la anterior** (Doc 9432, 4.4, ejemplo tras 4.4.2)

ATC: "AVIATORY 452, recleared holding point runway 14, taxi behind Seneca coming from your left."
PILOT: "Holding point runway 14, traffic in sight, AVIATORY 452."
RECLEARED anula el límite anterior. Si usted sigue rodando hacia el punto viejo, ya no tiene
autorización para ir ahí.

**Ejemplo 8. ATC no puede aprobar** (Doc 9432, 4.7.5)

PILOT: "AVIATORY 452, request touch and go."
ATC: "AVIATORY 452, unable to approve due traffic congestion, make full stop, runway 09 cleared to land."
PILOT: "Runway 09 cleared to land for full stop, AVIATORY 452."
UNABLE también lo usa el controlador. Lo que cuenta es la autorización que sí le dieron.

### Aplicación en aerolínea

En cabina, antes de colacionar una autorización que no es la esperada, la tripulación la mira
junta: ¿es lo que pedimos? ¿cambia lo que teníamos programado? Si la frecuencia está congestionada,
se colaciona lo que se entendió y se pide confirmación de lo dudoso en la misma transmisión, en
vez de colacionar todo «a ver si pasa». El SOP del operador define quién decide un UNABLE; la regla
OACI solo dice que se informe con el motivo.

### Error frecuente

- Tomar STANDBY como «sí» y empezar a moverse.
- Tomar una información (tránsito, viento) como autorización.
- Colacionar algo que no se entendió para no «quedar mal» en frecuencia.
- Aceptar lo que el avión no puede cumplir y descubrirlo después.
- Seguir con la autorización vieja después de un RECLEARED.

### En pocas palabras

- Clearance autoriza; instruction ordena; information informa; request pide.
- APPROVED responde a lo que usted propuso; STANDBY no aprueba ni niega.
- Una autorización cubre solo el tránsito conocido; no lo exime de las reglas.
- No entendió: SAY AGAIN. Duda de un dato: CONFIRM. No puede: UNABLE y el motivo.
- Nunca asumir.

FUENTES
- Verificado: Doc 4444 (15.ª ed., Enm. 4) cap. 1 (Autorización del control de tránsito aéreo, Instrucción del control de tránsito aéreo), 4.5.1.2, 4.5.1.3, 4.5.7.4.2; Doc 9432 (4.ª ed.) 1.1, 2.6, 2.8.1.4, 2.8.3.10, 4.3.1, 4.4, 4.4.3, 4.7.5, 4.10.
- VERIFICAR: la respuesta «AVIATORY 452» sola como acuse de un STANDBY con demora; práctica común, contra Doc 4444 cap. 12 (no cargado).

---

## 14. IFR CLEARANCE

### ¿Qué es?

La autorización de ruta que recibe un vuelo IFR antes de salir. Dice hasta dónde está autorizado,
por dónde, a qué nivel y con qué código y frecuencia arranca. Puede ir desde una descripción
detallada de ruta y niveles hasta algo muy corto (Doc 9432, 2.8.3.1).

### Lo que debe saber un piloto

**Qué contiene.** El Doc 4444 remite a su capítulo 11 (11.4.2.6.2.1) para la lista de conceptos
de una autorización (Doc 4444, 4.5.4.2), y ese capítulo no está cargado. Lo que sí está cargado:

- **Límite de la autorización**: se nombra con el punto significativo, el aeródromo o el límite
  del espacio aéreo controlado (Doc 4444, 4.5.7.1.1). Normalmente es el aeródromo de destino; si
  no se pudo coordinar, un punto intermedio, y luego ATC debe darle la autorización hasta destino lo
  antes posible (4.5.7.1.2 y 4.5.7.1.3). En vuelos con escalas, la autorización inicial llega solo
  hasta el primer destino (4.5.3.1).
- **Ruta**: se detalla cuando es necesario. «Autorizado ruta plan de vuelo» se puede usar si la
  ruta es idéntica a la del plan; «autorizado salida vía (designación)» cuando hay una salida
  normalizada publicada en la AIP (4.5.7.2.1). «Ruta plan de vuelo» **no** se usa cuando se da una
  nueva autorización (4.5.7.2.2).
- **Niveles**: los conceptos van en el capítulo 11 (4.5.7.3, no cargado).
- **Cambios pedidos por usted**: si le autorizan un cambio de ruta o nivel que pidió, la
  autorización incluye el carácter exacto del cambio (4.5.7.4.1).

**Cuándo llega.** Siempre que sea posible, antes de la puesta en marcha; el controlador debe
dictarla despacio y con claridad porque el piloto la anota; debe evitar darla durante un rodaje
complicado y **nunca** durante la alineación o el despegue (Doc 9432, 2.8.3.2).

**Qué NO es.** Una autorización de ruta no es una instrucción de despegue ni para entrar en una
pista en servicio (Doc 9432, 2.8.3.3). «Cleared to Cali» no lo autoriza a rodar ni a entrar a la
pista.

**CRAFT: herramienta didáctica, no norma OACI.** Muchas escuelas enseñan a copiar la autorización
en cinco casillas:

| Letra | Casilla | Qué anota |
|---|---|---|
| **C** | Clearance limit | Destino o punto límite |
| **R** | Route | SID, aerovía, «flight planned route» |
| **A** | Altitude | Nivel o altitud inicial y, si lo dan, el esperado |
| **F** | Frequency | Frecuencia de salida |
| **T** | Transponder | Código SSR |

Sirve para anotar en orden y detectar lo que faltó. No es una lista oficial: la OACI no la
define, y una autorización real puede traer más (hora de expiración, restricción de ascenso,
instrucciones de salida) o menos. Si una casilla queda vacía, **pregunte**: no la llene con lo
del plan de vuelo.

**Cómo se copia y verifica.**

1. Tenga la hoja lista con las casillas antes de llamar.
2. Anote mientras escucha, en abreviado; no intente memorizar.
3. Colacione leyendo lo anotado, en el orden en que llegó.
4. Contraste con lo que está cargado en el FMS y en el panel: SID, nivel inicial, código.
5. Si algo no cuadra con lo planeado, se aclara en tierra, no en el ascenso.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-14-01 · Esquema · 3:4 · 1200 × 1600 px
IMAGEN SUGERIDA:
Hoja de copiado de autorización como la que se lleva en un portapapeles de cabina, papel claro,
cinco renglones rotulados C / R / A / F / T con la autorización del Ejemplo 2 escrita a mano en
abreviado («CLO», «GIKOS 1A», «FL240», «119.1», «4521»). Al lado, una columna tachada con un error
corregido (código 4251 tachado, 4521 encima). Rótulo arriba: «CRAFT: ayuda de memoria, no norma
OACI».
OBJETIVO:
Que el piloto aprenda a copiar en orden, a ver de inmediato qué casilla quedó vacía y a entender
que CRAFT es una técnica, no un requisito.

### Fraseología OACI

**Ejemplo 1. Solicitud de autorización** (escenario de práctica)

PILOT: "Bogota Delivery, AVIATORY 452, stand 12, information Alpha, IFR to Cali, request clearance."
ATC: "AVIATORY 452, Bogota Delivery, ready to copy?"
PILOT: "Ready to copy, AVIATORY 452."
Quién llama, quién es, dónde está, qué ATIS tiene y qué pide. La forma exacta de pedir la
autorización y si Delivery pregunta «ready to copy» varían; ver VERIFICAR.

**Ejemplo 2. Autorización con SID** (estructura de Doc 9432, 2.8.3.6)

ATC: "AVIATORY 452, cleared to Cali via A1, FL 240, GIKOS 1A departure, squawk 4521."
PILOT: "Cleared to Cali via A1, FL 240, GIKOS 1A departure, squawk 4521, AVIATORY 452."
Límite (Cali), ruta (A1), nivel (FL 240), salida (GIKOS 1A), código (4521). Todo se colaciona:
es una autorización de ruta.

**Ejemplo 3. Autorización con frecuencia de salida** (escenario de práctica)

ATC: "AVIATORY 452, cleared to Cali, GIKOS 1A departure, flight planned route, climb initially FL 150, departure frequency 119.1, squawk 4521."
PILOT: "Cleared to Cali, GIKOS 1A departure, flight planned route, initially FL 150, 119.1, squawk 4521, AVIATORY 452."
El nivel inicial (FL 150) no es el de crucero. Confundirlos es uno de los errores clásicos de
nivel en la salida. Las frases «flight planned route», «climb initially» y «departure frequency»
son de uso común; ver VERIFICAR.

**Ejemplo 4. Código mal colacionado** (corrección según Doc 9432, 2.8.3.9)

ATC: "AVIATORY 452, cleared to Cali via A1, FL 240, GIKOS 1A departure, squawk 4521."
PILOT: "Cleared to Cali via A1, FL 240, GIKOS 1A departure, squawk 4251, AVIATORY 452."
ATC: "AVIATORY 452, negative, I say again, squawk 4521."
PILOT: "Squawk 4521, AVIATORY 452."
Una inversión de dígitos es un error típico al copiar rápido. La colación la hizo visible.

**Ejemplo 5. Parte que no se escuchó** (Doc 9432, 2.8.1.4)

ATC: "AVIATORY 452, cleared to Cali via A1, FL 240, [bloqueado] departure, squawk 4521."
PILOT: "AVIATORY 452, say again departure."
ATC: "AVIATORY 452, GIKOS 1A departure."
PILOT: "GIKOS 1A departure, AVIATORY 452."
Pide solo el elemento que falta (SAY AGAIN (item)). No completa la casilla con la SID que esperaba.

**Ejemplo 6. Autorización con restricción y alternativa** (Doc 9432, 2.8.3.10)

ATC: "AVIATORY 452, cleared to Cali FL 240, cross GIKOS FL 150 or above, if unable, maintain FL 130."
PILOT: "Cleared to Cali FL 240, cross GIKOS FL 150 or above, AVIATORY 452."
Si el piloto acepta la restricción, la colaciona. Si por peso o performance no puede, lo dice en
ese momento, no al llegar a GIKOS.

**Ejemplo 7. Límite antes del destino** (concepto de Doc 4444, 4.5.7.1.2; frase: escenario de práctica)

ATC: "AVIATORY 452, cleared to GIKOS via A1, FL 240, GIKOS 1A departure, squawk 4521, expect further clearance at 1520."
PILOT: "Cleared to GIKOS via A1, FL 240, GIKOS 1A departure, squawk 4521, expect further clearance at 1520, AVIATORY 452."
El límite es GIKOS, no Cali. Si no recibe una nueva autorización, no está autorizado más allá de
GIKOS. Qué hacer si pierde comunicaciones con un límite así se ve en el Nivel 5.

### Aplicación en aerolínea

En muchos aeropuertos la autorización llega por data link (DCL o PDC, Nivel 6). Por voz, la
tripulación típicamente la copia uno, la verifica el otro contra el FMS y el panel, y ambos
confirman SID, nivel inicial y código antes de pedir puesta en marcha. Los detalles (quién copia,
en qué momento del flujo) son del SOP de cada operador.

### Error frecuente

- Confundir nivel inicial con nivel de crucero.
- Cargar la SID del briefing en vez de la que dio ATC (la pista cambió y la SID también).
- Colacionar de memoria y no desde lo anotado.
- Creer que la autorización de ruta autoriza a rodar o a entrar a la pista.
- Llenar una casilla vacía con el plan de vuelo en vez de preguntar.

### En pocas palabras

- La autorización IFR dice hasta dónde, por dónde, a qué nivel, con qué código y frecuencia.
- Se colaciona completa (es autorización de ruta).
- CRAFT es una técnica de copiado, no una norma OACI.
- Límite de autorización: el punto más allá del cual no está autorizado.
- La autorización de ruta no autoriza despegue ni entrada a pista.

FUENTES
- Verificado: Doc 4444 (15.ª ed., Enm. 4) 4.5.3.1, 4.5.4.1, 4.5.4.2, 4.5.7.1.1 a 4.5.7.1.3, 4.5.7.2.1, 4.5.7.2.2, 4.5.7.3, 4.5.7.4.1, 4.5.7.5.1 a); Doc 9432 (4.ª ed.) 2.8.1.4, 2.8.3.1 a 2.8.3.3, 2.8.3.6, 2.8.3.9, 2.8.3.10.
- VERIFICAR: lista de conceptos de una autorización (identificación, límite, ruta, niveles, otras instrucciones como maniobras de salida, comunicaciones y hora de expiración) contra Doc 4444 11.4.2.6.2.1 y 11.4.2.6.2.2 (cap. 11 no cargado).
- VERIFICAR: «request clearance», «ready to copy», «flight planned route», «climb initially», «departure frequency» y «expect further clearance at (time)» contra Doc 4444 cap. 12 (fraseología de autorizaciones), no cargado.
- VERIFICAR: CRAFT no aparece en ningún documento OACI cargado; es mnemotecnia de instrucción.

---

## 15. START-UP Y PUSHBACK

### ¿Qué es?

- **Start-up (puesta en marcha)**: autorización para encender motores. Se pide para que ATC
  planifique y para evitar que las aeronaves demoradas en tierra consuman combustible de más
  (Doc 9432, 4.2.2).
- **Pushback (maniobra de empuje)**: retroceso con tractor desde un puesto donde el avión quedó
  con la proa hacia el terminal (Doc 9432, 4.3.1). Se pide al ATC o al servicio de dirección en la
  plataforma, **según el procedimiento local**.
- **Remolque (tow)**: traslado del avión con tractor, normalmente sin tripulación de vuelo al
  mando; lo coordina el conductor del tractor (Doc 9432, 5.4).

### Lo que debe saber un piloto

- **A quién se llama**: Ground, Apron o Delivery, según el aeropuerto. Está en la AIP (AD 2) y en
  las cartas de aeródromo. El Doc 9432 muestra la solicitud de empuje a «APRON» y la de puesta en
  marcha a «GROUND»; en otros aeropuertos es al revés o es una sola frecuencia.
- **Qué incluye la solicitud de puesta en marcha**: el puesto y el acuse del ATIS (Doc 9432,
  4.2.2). Si no hay ATIS, puede pedir antes la información de salida (4.2.1).
- **Cuatro respuestas distintas que suenan parecido** (Doc 9432, 4.2.2):

| Lo que oye | Qué significa |
|---|---|
| START UP APPROVED | Puede encender ahora |
| START UP AT 35 | Encienda a los 35 (minuto): es una hora asignada |
| EXPECT START UP AT 35 | Prevea encender a los 35: **todavía no está aprobado** |
| EXPECT DEPARTURE 49, START UP AT OWN DISCRETION | Salida prevista a los 49; la hora de encender la decide usted |

- **Pushback**: no se mueve con STANDBY. El empuje necesita «approved». Si hay un avión rodando
  detrás, la demora protege a ambos.
- **Dirección del empuje**: muchos aeropuertos indican hacia dónde debe quedar la nariz o la
  cola. Esa fraseología es local (AIP del aeropuerto); no hay una frase OACI en las fuentes
  cargadas. Si la indicación no es clara, pregunte antes de soltar frenos.
- **Coordinación con el personal de tierra**: por interfono, con una secuencia propia (frenos
  sueltos, empuje, frenos puestos, desconexión) (Doc 9432, 4.3.2). Si quiere interrumpir la
  maniobra, lo dice (4.3.3).

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-15-01 · Esquema · 16:9 · 1600 × 900 px
IMAGEN SUGERIDA:
Vista en planta de una plataforma: fila de puestos (22 a 28) con aviones de proa al terminal. El
avión del puesto 27 aparece en dos posiciones: en el puesto (línea continua) y al final del
empuje (línea punteada), con el tractor dibujado y una flecha curva que muestra el giro de la cola.
Detrás, por la calle de rodaje de plataforma, un B747 rodando de izquierda a derecha con una
flecha roja de conflicto. Globos de texto: «REQUEST PUSH-BACK» (piloto), «STAND BY, EXPECT ONE
MINUTE DELAY DUE B747 TAXIING BEHIND» (plataforma). Leyenda: «La dirección del empuje la fija el
procedimiento local».
OBJETIVO:
Que el piloto entienda por qué el empuje se autoriza y se demora: el avión retrocede a ciegas
hacia una calle por la que circula otro tránsito.

### Fraseología OACI

**Ejemplo 1. Información de salida sin ATIS** (Doc 9432, 4.2.1)

PILOT: "Bogota Ground, AVIATORY 452, IFR to Cali, request departure information."
ATC: "AVIATORY 452, departure runway 13, wind 150 degrees 6 knots, QNH 1022, temperature 12, dewpoint 8, time 27."
PILOT: "Runway 13, QNH 1022, will call for start up, AVIATORY 452."
Colaciona pista en uso y QNH (grupo c de la colación). El resto es información.

**Ejemplo 2. Puesta en marcha aprobada** (Doc 9432, 4.2.2)

PILOT: "Bogota Ground, AVIATORY 452, stand 24, request start up, information Bravo."
ATC: "AVIATORY 452, start up approved, QNH 1009."
PILOT: "Start up approved, QNH 1009, AVIATORY 452."
Puesto y ATIS en la solicitud. El QNH se colaciona.

**Ejemplo 3. Hora asignada vs hora prevista** (Doc 9432, 4.2.2)

ATC: "AVIATORY 452, expect start up at 35, QNH 1009."
PILOT: "Expect start up at 35, QNH 1009, AVIATORY 452."
«Expect» es planificación: a los 35 no enciende por su cuenta si no le han dicho «start up at 35»
o «start up approved». Si no lo llaman, pregunte.

**Ejemplo 4. Puesta en marcha a discreción** (Doc 9432, 4.2.2)

ATC: "AVIATORY 452, expect departure 49, start up at own discretion, QNH 1009."
PILOT: "Expect departure 49, start up at own discretion, QNH 1009, AVIATORY 452."
La hora la decide la tripulación a partir de la salida prevista.

**Ejemplo 5. Empuje aprobado** (Doc 9432, 4.3.1)

PILOT: "Apron, AVIATORY 452, stand 27, request push-back."
ATC: "AVIATORY 452, push-back approved."
PILOT: "Push-back approved, AVIATORY 452."

**Ejemplo 6. Empuje demorado** (Doc 9432, 4.3.1)

PILOT: "Apron, AVIATORY 452, stand 27, request push-back."
ATC: "AVIATORY 452, stand by. Expect one minute delay due B747 taxiing behind."
PILOT: "AVIATORY 452."
El avión no se mueve. Cuando pase el B747, ATC llamará.

**Ejemplo 7. Coordinación cabina y personal de tierra por interfono** (Doc 9432, 4.3.2)

PILOT: "Ready for push-back."
TIERRA: "Confirm brakes released."
PILOT: "Brakes released."
TIERRA: "Commencing push-back."
TIERRA: "Push-back completed, confirm brakes set."
PILOT: "Brakes set, disconnect."
TIERRA: "Disconnecting, stand by for visual at your left."
PILOT: "Roger."
Aquí no habla ATC: es la conversación con el personal de tierra. La señal visual final indica que
puede iniciar el rodaje (Doc 9432, 4.3.3).

**Ejemplo 8. Puesta en marcha de motores con el personal de tierra** (Doc 9432, 4.2.3)

TIERRA: "Ready to start up."
PILOT: "Start number one."
TIERRA: "Starting number one."
En el Doc 9432 el orden de los interlocutores no se rotula; se presenta aquí como coordinación
entre cabina y personal de tierra. El reparto exacto depende del procedimiento del operador.

**Ejemplo 9. Remolque (conductor del tractor)** (Doc 9432, 5.4)

TRACTOR: "Ground, Tug 9, request tow AVIATORY B737 from maintenance hangar 3 to gate 25."
ATC: "Tug 9, tow approved from maintenance hangar 3 to gate 25, proceed via F, hold short of runway 32."
TRACTOR: "Tow approved via F, hold short of runway 32, Tug 9."
Si el remolque cruza una pista, rigen las mismas reglas que para el rodaje: autorización explícita.

### Aplicación en aerolínea

Es común que la solicitud combine puesta en marcha y empuje («request start up and push-back»),
que se dé la dirección del empuje y que la puesta en marcha dependa de una hora de despegue
asignada por gestión de afluencia. Todo eso es **local**: está en la AIP del aeropuerto y en las
instrucciones del operador. La secuencia con el personal de tierra y quién la hace (capitán,
primer oficial) también es SOP del operador.

### Error frecuente

- Encender motores con «expect start up at…».
- Empezar a retroceder con STANDBY.
- Soltar frenos antes de que el personal de tierra lo pida.
- Aceptar una dirección de empuje que no entendió.
- Llamar a la dependencia equivocada (Ground cuando el aeropuerto usa Apron) y perder turno.

### En pocas palabras

- Solicitud de puesta en marcha: puesto e información ATIS.
- APPROVED autoriza; EXPECT planifica.
- STANDBY no autoriza el empuje.
- La dirección del empuje y la dependencia que lo autoriza son locales.
- Con el personal de tierra: frenos sueltos, empuje, frenos puestos, desconexión, señal visual.

FUENTES
- Verificado: Doc 9432 (4.ª ed.) 2.6 (STANDBY), 4.2.1, 4.2.2, 4.2.3, 4.3.1, 4.3.2, 4.3.3, 5.4; Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1 c).
- VERIFICAR: la frase en inglés para interrumpir el empuje («stop push-back»; el Doc 9432 4.3.3 solo trae el español «pare maniobra de empuje») contra Doc 9432 versión en inglés, 4.3.3.
- VERIFICAR: fraseología de dirección de empuje y solicitud combinada de puesta en marcha y empuje contra la AIP del aeropuerto (AD 2.20, reglamentos locales de tránsito) y Doc 4444 cap. 12 (no cargado).
- VERIFICAR: acuse «AVIATORY 452» a un STANDBY con demora, contra Doc 4444 cap. 12 (no cargado).

---

## 16. TAXI

### ¿Qué es?

El **rodaje** es el movimiento autopropulsado de una aeronave sobre la superficie del aeródromo,
excluidos el despegue y el aterrizaje (Doc 4444, cap. 1). La **autorización de rodaje** le dice por
dónde ir y **hasta dónde**. Ese «hasta dónde» es lo que evita las incursiones en pista.

### Lo que debe saber un piloto

**Cuatro reglas del Doc 9432 que no se negocian:**

1. **Toda instrucción de rodaje tiene un límite de autorización**: el punto donde debe detenerse
   hasta recibir otra autorización. Para la salida suele ser el punto de espera de la pista en uso,
   pero puede ser otro (4.4.1).
2. **Si el límite queda más allá de una pista, la autorización debe contener una autorización
   explícita para cruzarla o una instrucción de esperar fuera de ella** (4.4.2). Si no escuchó ni
   una ni otra, no la cruce: pregunte.
3. La fraseología del rodaje **no debe poder interpretarse** como autorización para entrar a la
   pista o despegar (4.5.2). Si a usted le parece que sí, pida confirmación.
4. **La pista queda libre** cuando toda la aeronave ha sobrepasado el punto de espera
   correspondiente (4.4, Nota).

**Una autorización de rodaje no autoriza por sí sola a entrar ni a cruzar una pista cuando se
requiere autorización específica.** Por eso existen:

- **Punto de espera de la pista (holding point)**: «punto designado destinado a proteger una
  pista, una superficie limitadora de obstáculos o un área crítica o sensible para los sistemas
  ILS/MLS, en el que las aeronaves en rodaje y los vehículos se detendrán y se mantendrán a la
  espera, a menos que la torre de control de aeródromo autorice otra cosa» (Doc 4444, cap. 1). En
  radiotelefonía se dice «holding point».
- **Punto crítico (hot spot)**: sitio del área de movimiento con antecedentes o riesgo potencial de
  colisión o de incursión en la pista, donde pilotos y conductores deben prestar más atención (Doc
  4444, cap. 1). Están en la carta de aeródromo: repáselos en el briefing de rodaje.
- **Incursión en la pista**: «todo suceso en un aeródromo que suponga la presencia incorrecta de
  una aeronave, vehículo o persona en la zona protegida de una superficie designada para el
  aterrizaje o despegue de una aeronave» (Doc 4444, cap. 1).

**Palabras del rodaje** (todas en el Doc 9432 salvo FOLLOW):

| Palabra | Qué le piden | Cómo responde |
|---|---|---|
| TAXI TO (límite) VIA (calles) | Rodar hasta el límite por esas calles | Colación de límite, calles, pista y QNH |
| HOLD SHORT OF RUNWAY (nn) | Detenerse antes del punto de espera de esa pista | Colación; al llegar, «holding short» |
| CROSS RUNWAY (nn) | Cruzar esa pista (solo esa) | Colación; «runway vacated» si se lo piden |
| HOLD POSITION | Detenerse donde está | «Holding» |
| GIVE WAY TO (tránsito) | Ceder el paso | «Giving way to…» |
| EXPEDITE TAXI | Rodar más rápido, con seguridad | «Expediting» |
| BACKTRACK | Rodar sobre la pista en sentido contrario | Colación (es rodar sobre una pista) |
| FOLLOW (tránsito) | Seguir a otra aeronave o vehículo | Colación (ver VERIFICAR) |

**Stand / gate**: el puesto de estacionamiento. Al llegar, la autorización de rodaje suele terminar
en «stand 27» (Doc 9432, 4.9).

**Antes de mover el avión:** carta de aeródromo a la vista, ruta marcada, pistas que se cruzan y
puntos críticos identificados, y los dos pilotos de acuerdo sobre dónde está el límite.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-16-01 · Diagrama · 16:9 · 1600 × 900 px
IMAGEN SUGERIDA:
Aeródromo esquemático en planta, fondo claro. Pista principal 13/31 horizontal abajo y pista 18/36
que la corta en diagonal en el lado izquierdo. Plataforma arriba con puestos 22 a 28. Calles de
rodaje A (paralela a la pista 13/31), B (de la plataforma hacia el umbral 13, cruzando la pista
18/36) y C (conector corto). Marcas de punto de espera como barras amarillas en: B antes de la
pista 18 («HOLDING POINT RWY 18») y B antes del umbral 13 («HOLDING POINT RWY 13»). Un círculo
magenta rotulado «HS 1» (hot spot) en el cruce B con la pista 18. Ruta de AVIATORY 452 dibujada en
línea gruesa desde el puesto 24 por B, con un icono de «alto» en la barra de la pista 18 y el
rótulo «hold short of runway 18», y el tramo siguiente punteado con «solo con CROSS RUNWAY 18».
Todo ficticio.
OBJETIVO:
Que el piloto vea que una misma ruta de rodaje tiene varios límites, que cada pista en el camino
exige su propia autorización y dónde está el riesgo de incursión.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-16-02 · Fotografía · 4:3 · 1200 × 900 px
IMAGEN SUGERIDA:
Fotografía desde la cabina de un avión de línea detenido en una calle de rodaje, frente a la
señal de punto de espera de la pista (líneas amarillas transversales) con el letrero rojo de
designación de pista al costado y, si es posible, la barra de parada encendida. Sin logotipos de
aerolínea ni nombres de aeropuerto visibles.
OBJETIVO:
Que el piloto reconozca de vista el punto donde termina su autorización de rodaje y empieza la
pista. El detalle de marcas, letreros y barras de parada debe verificarse (ver FUENTES).

### Fraseología OACI

**Ejemplo 1. Rodaje con ATIS y cesión de paso** (Doc 9432, 4.4.3)

PILOT: "Bogota Ground, AVIATORY 452, request taxi, information Charlie."
ATC: "AVIATORY 452, taxi to holding point runway 13, give way to B747 passing left to right, QNH 1019."
PILOT: "Holding point runway 13, QNH 1019, giving way to B747, AVIATORY 452."
Con el ATIS acusado, el controlador no necesita repetir la información de salida (4.4.3). El
límite es el punto de espera: no la pista.

**Ejemplo 2. Ruta que atraviesa otra pista** (Doc 9432, 4.4.2; estructura del ejemplo tras 4.4.2)

ATC: "AVIATORY 452, taxi to holding point runway 13 via B, hold short of runway 18."
PILOT: "Holding point runway 13 via B, hold short of runway 18, AVIATORY 452."
El límite final es el punto de espera 13, pero en el camino hay un límite intermedio: la pista 18.

**Ejemplo 3. Llegar a la pista intermedia y cruzarla** (Doc 9432, 4.4, ejemplo tras 4.4.2)

PILOT: "AVIATORY 452, holding short of runway 18."
ATC: "AVIATORY 452, cross runway 18, report vacated."
PILOT: "Crossing runway 18, wilco, AVIATORY 452."
PILOT: "AVIATORY 452, runway vacated."
ATC: "AVIATORY 452, roger."
«Runway vacated» se notifica cuando todo el avión pasó el punto de espera del otro lado.

**Ejemplo 4. Hold short omitido en la colación** (escenario de práctica; corrección según Doc 9432, 2.8.3.9)

ATC: "AVIATORY 452, taxi to holding point runway 13 via B, hold short of runway 18."
PILOT: "Holding point runway 13 via B, AVIATORY 452."
ATC: "AVIATORY 452, negative, I say again, hold short of runway 18."
PILOT: "Hold short of runway 18, AVIATORY 452."
Sin la corrección, el avión habría llegado a la pista 18 con la idea de que «tenía rodaje hasta
la 13».

**Ejemplo 5. Detener el rodaje** (Doc 9432, 2.8.3.7)

ATC: "AVIATORY 452, hold position."
PILOT: "Holding, AVIATORY 452."
Se detiene donde está, aunque no haya llegado al límite.

**Ejemplo 6. Rodaje sobre la pista (backtrack) con límite** (Doc 9432, 4.4, ejemplo tras 4.4.2)

PILOT: "AVIATORY 452, runway 06, QNH 1012, request taxiway B and backtrack."
ATC: "AVIATORY 452, approved, taxi via B, backtrack and line up runway 06, hold short of runway 14."
PILOT: "B, backtrack and line up runway 06, hold short of runway 14, AVIATORY 452."
PILOT: "AVIATORY 452, holding short of runway 14."
Rodar sobre una pista se colaciona siempre (Doc 4444, 4.5.7.5.1 b). En el original es una
aeronave ligera en un aeródromo pequeño; la estructura sirve igual.

**Ejemplo 7. Apresurar el rodaje por tránsito en final** (Doc 9432, 4.4, ejemplo tras 4.4.2)

ATC: "AVIATORY 452, expedite taxi, traffic on final runway 24, report runway 24 vacated."
PILOT: "AVIATORY 452, expediting."
PILOT: "AVIATORY 452, runway vacated."
EXPEDITE es rapidez con seguridad, no correr. Si no puede, dígalo.

**Ejemplo 8. Nuevo límite y rodar detrás de otro** (Doc 9432, 4.4, ejemplo tras 4.4.2)

ATC: "AVIATORY 452, recleared holding point runway 14, taxi behind Seneca coming from your left."
PILOT: "Holding point runway 14, traffic in sight, AVIATORY 452."
Nuevo límite. Si no ve el tránsito, no diga «in sight»: diga que lo está buscando o pida
aclaración.

**Ejemplo 9. Seguir a otro avión** (escenario de práctica; ver VERIFICAR)

ATC: "AVIATORY 452, follow the A320 ahead, taxi to holding point runway 13 via A."
PILOT: "Following the A320, holding point runway 13 via A, AVIATORY 452."
FOLLOW no cambia el límite: seguir al A320 no lo autoriza a entrar a la pista si el A320 entra.

**Ejemplo 10. Piloto con dudas sobre la ruta** (Doc 9432, 2.8.1.4 y 2.8.3.7; PLAIN LANGUAGE en la segunda transmisión)

PILOT: "Bogota Ground, AVIATORY 452, holding position, say again taxi instructions."
ATC: "AVIATORY 452, taxi to holding point runway 13 via A and B, hold short of runway 18."
PILOT: "Holding point runway 13 via A and B, hold short of runway 18, AVIATORY 452."
Detenerse y preguntar es correcto. Rodar «mientras aclaro» cerca de una pista, no.

**Ejemplo 11. Después del aterrizaje hasta el puesto** (Doc 9432, 4.9)

PILOT: "Bogota Ground, AVIATORY 452, runway vacated."
ATC: "AVIATORY 452, taxi to stand 27 via A."
PILOT: "Stand 27 via A, AVIATORY 452."

### Aplicación en aerolínea

El briefing de rodaje se hace antes de mover el avión: ruta probable, pistas a cruzar, puntos
críticos y dónde puede estar el límite. Durante el rodaje, muchos operadores piden que ambos
pilotos confirmen en voz alta antes de cruzar o entrar a una pista y que las tareas de cabina que
distraen (listas, programación del FMS) se hagan detenidos o en tramos sin pistas cerca. Los
detalles son del SOP del operador; el principio es general: **nadie cruza una línea de punto de
espera sin una autorización explícita que los dos pilotos escucharon**.

### Error frecuente

- Creer que «taxi to holding point runway 13» autoriza a cruzar la 18 que está en el camino.
- Colacionar el límite final y omitir el «hold short» intermedio.
- Seguir a otro avión hasta la pista porque «iba adelante».
- Cruzar sin que el copiloto haya oído la autorización (uno estaba en otra frecuencia o en una
  lista).
- Notificar «runway vacated» con la cola todavía dentro del área protegida.
- Rodar con dudas en vez de detenerse y preguntar.

### En pocas palabras

- Toda autorización de rodaje tiene un límite: allí se detiene.
- Si la ruta cruza una pista, le deben decir CROSS o HOLD SHORT; si no oyó ninguna, no cruza.
- Hold short y cross runway se colacionan siempre, con el número de pista.
- La pista está libre cuando todo el avión pasó el punto de espera.
- Ante la duda, HOLD POSITION propio y SAY AGAIN.

FUENTES
- Verificado: Doc 4444 (15.ª ed., Enm. 4) cap. 1 (Rodaje, Punto de espera de la pista, Punto crítico, Incursión en la pista), 4.5.7.5.1 b); Doc 9432 (4.ª ed.) 2.8.1.4, 2.8.3.7, 2.8.3.9, 4.4.1, 4.4.2 y ejemplos, 4.4 Nota, 4.4.3, 4.5.1, 4.5.2, 4.9.
- VERIFICAR: «FOLLOW (description of other aircraft or vehicle)» y «REQUEST DETAILED TAXI INSTRUCTIONS» contra Doc 4444 cap. 12 (fraseología de rodaje), no cargado.
- VERIFICAR: descripción de la señal de punto de espera, letreros de designación de pista y barras de parada (y la regla de no cruzar una barra de parada encendida) contra Anexo 14 Vol. I cap. 5 y Doc 4444 cap. 7 (no cargados).
- VERIFICAR: puntos críticos (hot spots) y rutas normalizadas de rodaje de cada aeropuerto en su AIP (AD 2.24, cartas de aeródromo).

---

## 17. RUNWAY SAFETY

### ¿Qué es?

El conjunto de autorizaciones y hábitos que protegen la pista. Una pista es el único lugar del
aeródromo donde un avión a 140 nudos y uno detenido pueden estar en el mismo punto. Las
autorizaciones que la tocan son pocas y todas se colacionan (Doc 4444, 4.5.7.5.1 b):

| Autorización | Qué permite | Qué NO permite |
|---|---|---|
| HOLD SHORT OF RUNWAY | Nada: detenerse antes del punto de espera | Entrar |
| LINE UP AND WAIT | Entrar, alinearse y **esperar** | Despegar |
| LINE UP (be ready for immediate departure) | Entrar y alinearse, listo para salir ya | Despegar sin la autorización |
| CROSS RUNWAY | Cruzar esa pista y salir de ella | Detenerse en ella, cruzar otra |
| CLEARED FOR TAKE-OFF | Despegar | |
| CONTINUE APPROACH | Seguir la aproximación | Aterrizar |
| CLEARED TO LAND | Aterrizar | |
| VACATE / TAKE FIRST RIGHT | Salir de la pista por donde indican | |

### Lo que debe saber un piloto

**LINE UP AND WAIT no es CLEARED FOR TAKE-OFF.** Es la confusión más peligrosa de este nivel: en
la pista, con motores listos y la lista de antes del despegue hecha, la mente espera oír «take-off».
Por eso la OACI reserva la palabra TAKE-OFF solo para cuando se autoriza el despegue o se cancela
(Doc 9432, 2.8.3.3); en los demás casos se usa DEPARTURE o AIRBORNE. **Si no oyó «take-off», no
despega.**

**Varias pistas en uso.** Cuando el piloto podría confundirse de pista, la autorización de despegue
debe incluir el número de pista (Doc 9432, 4.5.8). Colacione siempre el número y verifique que la
pista donde está alineado es esa (rumbo de pista, letreros, pantalla de navegación).

**Autorizaciones condicionales** (Doc 9432, 4.5.7):

- **No se usan** para movimientos en pistas en actividad salvo que el controlador **y** el piloto
  vean la aeronave o vehículo en cuestión.
- Si la condición es un avión que aterriza, el que sale debe identificarlo bien: a veces no basta
  con el tipo, hace falta el color o la compañía.
- Orden: 1) distintivo, 2) condición, 3) autorización, 4) breve repetición de la condición.
- Se colacionan o se acusan de modo que quede claro que se entendieron y se cumplirán (Doc 4444,
  4.5.7.5.1.1). En la práctica, la colación repite la condición: «behind the landing Airbus, line
  up and wait behind».

**CONTINUE APPROACH no es CLEARED TO LAND** (Doc 9432, 4.7.1). Si en final corta no tiene
autorización de aterrizaje, pídala; si no la obtiene, se hace motor y al aire según el
procedimiento (Nivel 4).

**Salir de la pista.** Salvo instrucción en contrario, se sigue en frecuencia de torre hasta dejar
libre la pista (Doc 9432, 4.9). Libre significa: todo el avión pasó el punto de espera.

**Qué hace el controlador cuando algo sale mal** (Doc 9432, 4.5.10 y 4.5.11): «take off
immediately or hold short of runway», «take off immediately or vacate runway», «hold position,
cancel take-off», y si ya inició la carrera, «stop immediately» repetido con el distintivo.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-17-01 · Diagrama · 16:9 · 1600 × 900 px
IMAGEN SUGERIDA:
Dos paneles lado a lado con el mismo avión sobre el eje de la pista 13, vista en planta. Panel
izquierdo, rótulo «LINE UP AND WAIT»: avión alineado, frenos (icono de freno), flecha de avance
tachada, texto «Entrar y esperar. No despegar». Panel derecho, rótulo «RUNWAY 13 CLEARED FOR
TAKE-OFF»: el mismo avión con flecha de avance larga, texto «Solo con la palabra TAKE-OFF y el
número de pista». Entre los dos, una franja ámbar: «Si no oyó TAKE-OFF, no despega».
OBJETIVO:
Fijar de vista la diferencia entre entrar a la pista y estar autorizado a despegar.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-17-02 · Esquema · 16:9 · 1600 × 900 px
IMAGEN SUGERIDA:
Vista oblicua desde atrás y arriba de un avión en el punto de espera de la pista 13. En la final
de la misma pista, un Airbus con tren abajo, marcado con un recuadro «¿es ESTE?». Un segundo avión
más lejos, en final larga, marcado «no confundir». Globo de torre: «AVIATORY 452, behind the landing
Airbus, line up and wait behind». Numeración 1 a 4 en el globo sobre las partes: distintivo,
condición, autorización, repetición de la condición.
OBJETIVO:
Que el piloto entienda la estructura de la autorización condicional y que la condición depende de
identificar al avión correcto.

### Fraseología OACI

**Ejemplo 1. Line up and wait** (Doc 9432, 4.5.3)

ATC: "AVIATORY 452, report when ready for departure."
PILOT: "Wilco, AVIATORY 452."
PILOT: "AVIATORY 452, ready."
ATC: "AVIATORY 452, line up and wait."
PILOT: "Lining up, AVIATORY 452."
En el Doc 9432 (4.ª ed.) la colación es «lining up». Como entrar a la pista siempre se colaciona
(Doc 4444, 4.5.7.5.1 b), muchos Estados piden repetir la instrucción completa con el número de
pista: «Line up and wait runway 13, AVIATORY 452». Ver VERIFICAR.

**Ejemplo 2. Autorización condicional** (Doc 9432, 4.5.7)

ATC: "AVIATORY 452, report the Airbus on final in sight."
PILOT: "AVIATORY 452, Airbus in sight."
ATC: "AVIATORY 452, behind the landing Airbus, line up and wait behind."
PILOT: "Behind the Airbus, line up and wait behind, AVIATORY 452."
Primero se asegura que el piloto ve el tránsito; luego viene la condición. Si usted no está seguro
de cuál es el Airbus, **no diga «in sight»**.

**Ejemplo 3. Cruce de pista** (Doc 9432, 4.4, ejemplo tras 4.4.2)

PILOT: "AVIATORY 452, approaching holding point, request cross runway 18."
ATC: "AVIATORY 452, hold short runway 18."
PILOT: "AVIATORY 452, holding short."
ATC: "AVIATORY 452, cross runway 18, report vacated."
PILOT: "Crossing, wilco, AVIATORY 452."
PILOT: "AVIATORY 452, runway vacated."
Pedir el cruce no es tener el cruce. La autorización llega sola y con número de pista.

**Ejemplo 4. Despegue inmediato o esperar fuera** (Doc 9432, 4.5.10)

ATC: "AVIATORY 452, take off immediately or hold short of runway."
PILOT: "Holding short, AVIATORY 452."
Si la tripulación no puede despegar ya (lista incompleta, carga de trabajo), la respuesta correcta
es quedarse fuera. La otra opción del Doc 9432 es «take off immediately or vacate runway».

**Ejemplo 5. Cancelación del despegue** (Doc 9432, 4.5.10)

ATC: "AVIATORY 452, hold position, cancel take-off, I say again, cancel take-off, vehicle on runway."
PILOT: "Holding, AVIATORY 452."

**Ejemplo 6. Detenerse en plena carrera** (Doc 9432, 4.5.11 y 4.5.12)

ATC: "AVIATORY 452, stop immediately, AVIATORY 452, stop immediately."
PILOT: "Stopping, AVIATORY 452."
El controlador repite la instrucción y el distintivo. La decisión de abortar a alta velocidad
sigue siendo de la tripulación según sus procedimientos de performance; la frase le avisa del
peligro.

**Ejemplo 7. Distintivo parecido en la pista** (escenario de práctica; palabras de Doc 9432, 2.6 y 2.8.3.7)

ATC: "AVIATORY 452, line up and wait runway 13."
PILOT (AVIATORY 425): "Line up and wait runway 13, AVIATORY 425."
ATC: "AVIATORY 425, negative, hold position. AVIATORY 452, line up and wait runway 13."
PILOT (AVIATORY 452): "Line up and wait runway 13, AVIATORY 452."
El distintivo al final de la colación permitió detectar que respondió el avión equivocado. Si el
425 hubiera colacionado sin distintivo, dos aviones habrían podido entrar a la misma pista.

**Ejemplo 8. Continue approach vs cleared to land** (Doc 9432, 4.7.1)

PILOT: "AVIATORY 452, long final."
ATC: "AVIATORY 452, continue approach, wind 260 degrees 18 knots."
PILOT: "AVIATORY 452."
PILOT: "AVIATORY 452, final."
ATC: "AVIATORY 452, runway 27, cleared to land, wind 270 degrees 20 knots."
PILOT: "Runway 27, cleared to land, AVIATORY 452."
Solo la segunda transmisión autoriza el aterrizaje. En el Doc 9432 el acuse de «continue
approach» es solo el distintivo.

**Ejemplo 9. Salida de pista y cambio a Ground** (Doc 9432, 4.9)

ATC: "AVIATORY 452, take first right, when vacated contact Ground 118.350."
PILOT: "First right, wilco, 118.350, AVIATORY 452."
No cambia de frecuencia hasta dejar libre la pista. Si cambia antes y la torre necesita
detenerlo, no lo escuchará.

**Ejemplo 10. Duda en la pista** (construido con CONFIRM, Doc 9432, 2.6)

PILOT: "AVIATORY 452, confirm cleared for take-off runway 13."
ATC: "AVIATORY 452, negative, line up and wait runway 13."
PILOT: "Line up and wait runway 13, AVIATORY 452."
Preguntar cuesta segundos. Despegar con una duda puede costar la pista.

### Aplicación en aerolínea

Los operadores suelen fijar en su SOP: confirmación cruzada entre pilotos antes de cruzar o
entrar a una pista; luces exteriores que indican la fase (por ejemplo, encender ciertas luces al
recibir la autorización de despegue) y verificación de pista correcta antes de aplicar potencia.
Los detalles varían por operador y por Estado; el principio común es que **ambos pilotos oyen y
entienden cada autorización que toca una pista**.

### Error frecuente

- Despegar con LINE UP AND WAIT (expectation bias: «ya nos tocaba»).
- Aceptar una condicional sin ver el avión de la condición, o viendo otro.
- Colacionar una autorización para otra pista o para otro distintivo.
- Cruzar porque «el de adelante cruzó».
- Cambiar a Ground antes de dejar libre la pista.
- Aterrizar con «continue approach».

### En pocas palabras

- Todo lo que toca una pista se colaciona, con número de pista y distintivo.
- LINE UP AND WAIT: entra y espera. Solo TAKE-OFF autoriza a despegar.
- Condicional: solo si ambos ven el tránsito; se repite la condición.
- CONTINUE APPROACH no es CLEARED TO LAND.
- La pista está libre cuando todo el avión pasó el punto de espera.

FUENTES
- Verificado: Doc 4444 (15.ª ed., Enm. 4) cap. 1 (Incursión en la pista, Punto de espera de la pista), 4.5.7.5.1 b), 4.5.7.5.1.1; Doc 9432 (4.ª ed.) 2.6, 2.8.3.3, 2.8.3.7, 2.8.3.9, 4.4 y Nota, 4.5.3, 4.5.5, 4.5.7, 4.5.8, 4.5.10, 4.5.11, 4.5.12, 4.7.1, 4.9.
- VERIFICAR: colación completa de «line up and wait runway (number)» y la variante «line up and wait runway (number) intersection (name)» contra Doc 4444 cap. 12 (fraseología de despegue), no cargado.
- VERIFICAR: formato vigente de la autorización condicional (por ejemplo «behind (aircraft) on short final, line up and wait behind») y si se admite condicional de cruce de pista, contra Doc 4444 cap. 12 y cap. 7, no cargados.
- VERIFICAR: uso de luces exteriores como indicación de autorización y verificación de pista correcta: SOP del operador y reglamentación del Estado (en Colombia, RAC).

---

## 18. TAKEOFF

### ¿Qué es?

La secuencia desde el punto de espera hasta el cambio a Salida: informar listo, alinearse, recibir
la autorización de despegue (con viento e instrucciones de salida cuando las hay), despegar y
cambiar de frecuencia.

### Lo que debe saber un piloto

**La palabra TAKE-OFF tiene dueño.** Solo se usa cuando la aeronave está autorizada a despegar o
cuando se cancela esa autorización; en los demás casos se dice DEPARTURE o AIRBORNE (Doc 9432,
2.8.3.3). Consecuencia práctica para el piloto: al informar que está listo se dice «ready» o
«ready for departure», no «ready for take-off». Así, la única vez que se oye TAKE-OFF en la
frecuencia es cuando hay una autorización (o su cancelación), y nadie puede tomar una frase del
piloto como si fuera la autorización.

**Paso a paso** (Doc 9432, 4.5):

1. **En el punto de espera.** En aeropuertos con Ground y Tower separados, lo transfieren a torre
   al acercarse al punto de espera (4.5.1). Algunas aeronaves necesitan verificaciones y no están
   listas al llegar: por eso ATC puede pedir «report when ready for departure» (4.5.3).
2. **Listo.** Informe cuando de verdad lo esté (listas completas, cabina preparada).
3. **Alineación.** «Line up and wait» (entra y espera) o, si el tránsito lo exige, «line up, be
   ready for immediate departure» (4.5.5).
4. **Autorización de despegue.** Con número de pista, siempre que pueda haber confusión (4.5.8), y
   eventualmente con instrucciones de salida para separación (4.5.9).
5. **Despegue.** Los controladores deben evitar transmitirle durante el despegue y el ascenso
   inicial salvo emergencia (4.1.2 y 4.5.4). Si le hablan en ese momento, es importante.
6. **Airborne y cambio a Salida.** Con visibilidad reducida pueden pedir «report airborne»
   (4.5.6); luego lo transfieren a Salida.

**Si no está listo, dígalo.** «¿Listo para salida inmediata?» exige una respuesta honesta: AFFIRM
solo si puede rodar a la pista y despegar sin demora.

**Si abandona el despegue**, informe a la torre lo antes posible que lo suspende y pida ayuda o
instrucciones de rodaje (4.5.12).

**Ascenso inicial**: las instrucciones de salida (rumbo, altitud antes de virar, SID) se colacionan
junto con la autorización de despegue. El detalle de SID y ascenso es del Nivel 4.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-18-01 · Diagrama · 21:9 · 2100 × 900 px
IMAGEN SUGERIDA:
Línea de tiempo horizontal sobre un perfil lateral de pista: 1) avión en el punto de espera,
globo «READY»; 2) avión entrando, globo «LINE UP AND WAIT»; 3) avión alineado, globo «RUNWAY 13
CLEARED FOR TAKE-OFF» con la palabra TAKE-OFF resaltada; 4) avión rotando, franja gris «ATC evita
transmitir» sobre el despegue y el ascenso inicial; 5) avión en ascenso, globo «CONTACT DEPARTURE
119.1». Debajo de cada paso, en mono, qué se colaciona.
OBJETIVO:
Que el piloto tenga el mapa completo del despegue y vea en qué punto aparece por primera vez la
palabra TAKE-OFF.

### Fraseología OACI

**Ejemplo 1. Listo, alineación y despegue** (Doc 9432, 4.5.3 y 4.5.4)

ATC: "AVIATORY 452, report when ready for departure."
PILOT: "Wilco, AVIATORY 452."
PILOT: "AVIATORY 452, ready."
ATC: "AVIATORY 452, line up and wait."
PILOT: "Lining up, AVIATORY 452."
ATC: "AVIATORY 452, runway 13, cleared for take-off."
PILOT: "Runway 13, cleared for take-off, AVIATORY 452."
Dos autorizaciones distintas. La palabra TAKE-OFF aparece solo en la segunda.

**Ejemplo 2. Salida inmediata** (Doc 9432, 4.5.5)

ATC: "AVIATORY 452, are you ready for immediate departure?"
PILOT: "AVIATORY 452, affirm."
ATC: "AVIATORY 452, line up, be ready for immediate departure."
PILOT: "Lining up, AVIATORY 452."
ATC: "AVIATORY 452, runway 13, cleared for take-off."
PILOT: "Runway 13, cleared for take-off, AVIATORY 452."
«Line up, be ready for immediate departure» sigue sin ser autorización de despegue. Se espera el
«cleared for take-off».

**Ejemplo 3. No está listo para salida inmediata** (escenario de práctica; NEGATIVE de Doc 9432, 2.6)

ATC: "AVIATORY 452, are you ready for immediate departure?"
PILOT: "AVIATORY 452, negative, ready in two minutes."
ATC: "AVIATORY 452, hold short runway 13."
PILOT: "Holding short runway 13, AVIATORY 452."
«Ready in two minutes» es lenguaje claro y útil: le permite al controlador planear. Mejor un
NEGATIVE que una salida apresurada con la cabina a medio preparar.

**Ejemplo 4. Instrucción de salida con la autorización** (Doc 9432, 4.5.9)

ATC: "AVIATORY 452, climb straight ahead until 2500 feet before turning right, runway 24, cleared for take-off."
PILOT: "Straight ahead 2500 feet, right turn, cleared for take-off runway 24, AVIATORY 452."
La instrucción de salida y la autorización se colacionan juntas. Virar antes de 2500 ft rompe la
separación que el controlador planeó.

**Ejemplo 5. Solicitud de viraje después del despegue** (Doc 9432, 4.5.9)

PILOT: "AVIATORY 452, request right turn when airborne."
ATC: "AVIATORY 452, right turn approved, runway 06, cleared for take-off."
PILOT: "Runway 06, cleared for take-off, right turn, AVIATORY 452."

**Ejemplo 6. Notificar en el aire y pasar a Salida** (Doc 9432, 4.5.6)

ATC: "AVIATORY 452, runway 24, cleared for take-off, report airborne."
PILOT: "Runway 24, cleared for take-off, wilco, AVIATORY 452."
PILOT: "AVIATORY 452, airborne 57."
ATC: "AVIATORY 452, contact Departure 121.750."
PILOT: "121.750, AVIATORY 452."
«Airborne 57» es «en el aire a los 57». Note que en la notificación se dice AIRBORNE, no TAKE-OFF.

**Ejemplo 7. Autorización con viento** (escenario de práctica; ver VERIFICAR)

ATC: "AVIATORY 452, wind 150 degrees 8 knots, runway 13, cleared for take-off."
PILOT: "Runway 13, cleared for take-off, AVIATORY 452."
El viento es información: no se colaciona, pero se compara con los límites del avión. Si excede un
límite, la respuesta es UNABLE, no un despegue «a ver si baja».

**Ejemplo 8. Despegue abandonado** (Doc 9432, 4.5.12)

PILOT: "AVIATORY 452, stopping."
ATC: "AVIATORY 452, roger."
PILOT: "AVIATORY 452, request return to ramp."
ATC: "AVIATORY 452, take next right, return to ramp, contact Ground 118.350."
PILOT: "Next right, return to ramp, 118.350, AVIATORY 452."
Primero se vuela (se detiene) el avión; la llamada viene «tan pronto como sea posible». Si hay
emergencia, la comunicación cambia (Nivel 5).

**Ejemplo 9. Error: «ready for take-off»** (escenario de práctica, contraste con Doc 9432, 2.8.3.3)

PILOT (incorrecto): "AVIATORY 452, ready for take-off."
PILOT (correcto): "AVIATORY 452, ready." o "AVIATORY 452, ready for departure."
Si en una frecuencia congestionada se bloquea parte de la transmisión, «…for take-off» puede
sonar a autorización para otro avión. Reservar la palabra elimina ese riesgo.

### Aplicación en aerolínea

Antes del despegue, la tripulación confirma que la pista en la que está alineada es la autorizada
y que la autorización fue de despegue, no de alineación. Muchos operadores exigen que ambos pilotos
verbalicen «cleared for take-off» y verifiquen la pista antes de aplicar potencia. La frecuencia
de Salida y la altitud inicial se tienen preseleccionadas desde el briefing. Los detalles son del
SOP de cada operador.

### Error frecuente

- Despegar con «line up and wait» o con «line up, be ready for immediate departure».
- Decir «ready for take-off».
- Aceptar una salida inmediata sin estar listo.
- Colacionar la autorización de despegue sin la instrucción de salida que venía con ella.
- Cambiar a Salida antes de que la torre lo transfiera (salvo que el procedimiento local lo
  indique).

### En pocas palabras

- TAKE-OFF solo lo dice la torre, para autorizar o cancelar.
- El piloto informa «ready» o «ready for departure».
- Line up and wait y line up (be ready for immediate departure) no autorizan a despegar.
- Autorización de despegue: se colaciona con el número de pista y con las instrucciones de salida.
- Si no está listo, NEGATIVE. Si no puede cumplir, UNABLE.

FUENTES
- Verificado: Doc 9432 (4.ª ed.) 2.6 (AFFIRM, NEGATIVE, WILCO), 2.8.3.3, 4.1.2, 4.5.1, 4.5.3, 4.5.4, 4.5.5, 4.5.6, 4.5.8, 4.5.9, 4.5.12; Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1 b).
- VERIFICAR: inclusión y orden del viento en la autorización de despegue («wind (direction/speed), runway (number), cleared for take-off») contra Doc 4444 cap. 7 y cap. 12, no cargados.
- VERIFICAR: «ready for departure» como notificación del piloto (el Doc 9432 muestra «ready» tras «report when ready for departure») contra Doc 4444 cap. 12, no cargado.
- VERIFICAR: momento del cambio a Salida (transferencia por torre o automática) en la AIP del aeropuerto (AD 2.22, procedimientos de vuelo).

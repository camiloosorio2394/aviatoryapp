# Comunicaciones aeronáuticas y gestión ATC (OACI) · Nivel 6: Data link y operación oceánica

> **VERIFICAR ANTES DE PUBLICAR.** Los mensajes CPDLC dependen del Doc 4444 cap. 14 y del Doc 10037 (GOLD), no cargados. No se publica hasta verificar cada línea VERIFICAR.

Notas para producción:

- Fuentes cargadas para este nivel: Doc 4444 PANS-ATM (15.ª ed., Enm. 4, 2012; **no es la edición vigente**, existe la 16.ª de 2016 con enmiendas), cap. 1 a 5; Doc 9432 Manual de radiotelefonía (4.ª ed., 2007), cap. 1 a 7.3; Doc 9835 (2.ª ed., 2010), cap. 1 a 6; presentación de la FAA (Dakar, 2017) sobre el GOLD. Toda numeración de párrafo citada es la de esas ediciones y hay que confirmarla en la vigente.
- No están cargados: Doc 4444 cap. 12 (fraseología), 13 (ADS-C), 14 (CPDLC), 15 (contingencias) ni el apéndice 5 (mensajes CPDLC); Doc 10037 (GOLD); Doc 9432 cap. 8 a 11 (control de área, control oceánico, meteorología, SELCAL); Anexo 3; Anexo 10 Vol. II; Anexo 11; NAT Doc 007; documentos regionales del Pacífico.
- Por eso este nivel no trae identificadores de mensaje CPDLC (UM/DM) y todo texto de pantalla CPDLC va marcado VERIFICAR.
- Distintivo de los ejemplos: `AVIATORY 452`. Las estaciones «Las Guindas» y «Santa Cleta» son las ficticias de la versión en español del Doc 9432. «Oceanic Control» y «Oceanic Radio» son estaciones **ficticias** para este curso. Los puntos GIKOS, ODRAK, PUVEL, TIMSA y BERUX son **ficticios**. Las frecuencias HF de los ejemplos son **ficticias**.
- Los formatos oceánicos (informe de posición, autorización oceánica, SELCAL, uso de HF y de CPDLC) **varían por región** (Atlántico Norte, Pacífico, Atlántico Sur, Caribe). Lo que aquí se muestra es la estructura OACI general; el formato de cada región está en su documentación (NAT Doc 007 para el Atlántico Norte, AIP de cada Estado, Doc 7030 procedimientos suplementarios regionales).

---

## 41. ATIS

### ¿Qué es?

El **servicio automático de información terminal (ATIS)** es el «suministro automático de información regular, actualizada, a las aeronaves que llegan y a las que salen, durante las 24 horas o determinada parte de las mismas» (Doc 4444, cap. 1; Doc 9432, cap. 1).

Tiene dos formas, definidas en los mismos documentos:

- **ATIS-voz**: radiodifusión vocal continua y repetitiva en una frecuencia.
- **ATIS-D (D-ATIS)**: el mismo ATIS entregado por enlace de datos, como texto en la cabina.

Cada emisión se identifica con una letra del alfabeto fonético («information Bravo», «information Charlie»). Cuando cambia algo importante, cambia la letra.

### Lo que debe saber un piloto

- **Se escucha antes del primer contacto.** Al llamar al aeródromo por primera vez se acusa recibo del ATIS (Doc 9432, 4.6.2). En la salida, el piloto lo hace junto con la solicitud de puesta en marcha (Doc 9432, 4.2.2); en la llegada, en la llamada inicial a aproximación (Doc 9432, 7.3.1).
- **Acusar recibo ahorra frecuencia.** Si la aeronave acusó recibo del ATIS, el controlador no necesita darle la información de salida al autorizar el rodaje (Doc 9432, 4.4.3).
- **Si no hay ATIS**, el piloto pide la información de aeródromo antes de solicitar puesta en marcha (Doc 9432, 4.2.1).
- **El ATIS puede traer el nivel de transición.** El Doc 4444 (4.10.4.3) dice que el nivel de transición se da a la tripulación a tiempo, por voz, por radiodifusión ATIS o por enlace de datos.
- **Colación.** El Doc 4444 (4.5.7.5.1 c) lista como elementos que siempre se colacionan la pista en uso, los reglajes de altímetro, los códigos SSR, las instrucciones de nivel, rumbo y velocidad y los niveles de transición, «ya sea que sean expedidos por el controlador ya sea que estén incluidos en las radiodifusiones ATIS». La grabación no se le colaciona a nadie: en la práctica, confirmas la letra en el primer contacto y colacionas esos valores cada vez que el controlador te los transmite, aunque ya estuvieran en el ATIS. Cómo lo aplica cada Estado: ver su AIP.
- **«Information Bravo on board»**, «with Bravo» o «have Bravo» son de uso común, pero los ejemplos del Doc 9432 cargado dicen solamente **«information Bravo»**. Usa esa forma: es la que aparece en el manual.
- **D-ATIS.** En muchos aviones de aerolínea se pide por data link (ACARS u otro sistema) y llega impreso o en pantalla. Es el mismo contenido; sigue valiendo la regla de confirmar la letra vigente con el controlador.

### Fraseología OACI

Salida, solicitud de puesta en marcha con acuse del ATIS (Doc 9432, 4.2.2):

PILOT: "Las Guindas Ground, Aviatory 452, stand 24, request start up, information Bravo."
ATC: "Aviatory 452, start up approved, QNH 1009."
PILOT: "Start up approved, QNH 1009, Aviatory 452."
Significado: el piloto informa dónde está, qué pide y que ya tiene el ATIS Bravo. El controlador aprueba y da el QNH, que se colaciona (Doc 4444, 4.5.7.5.1 c).

Rodaje con acuse del ATIS (Doc 9432, 4.4.3):

PILOT: "Las Guindas Ground, Aviatory 452, request taxi, information Charlie."
ATC: "Aviatory 452, taxi to holding point runway 27, QNH 1019."
PILOT: "Taxi to holding point runway 27, QNH 1019, Aviatory 452."
Significado: como el piloto confirmó el ATIS Charlie, el controlador no repite viento, temperatura ni visibilidad. Pista y QNH sí se colacionan.

Llegada, llamada inicial a aproximación (Doc 9432, 7.3.1):

PILOT: "Las Guindas Approach, Aviatory 452, flight level 80, estimating GIKOS 46, information Delta."
ATC: "Aviatory 452, descend to 4000 feet, QNH 1005, transition level 50, expect ILS approach runway 24."
PILOT: "Descend to 4000 feet, QNH 1005, transition level 50, Aviatory 452."
Significado: nivel actual, estimada al siguiente punto y ATIS confirmado. El controlador puede omitir el nivel de transición cuando está publicado en la AIP (Doc 9432, 7.3.1).

Sin ATIS disponible (Doc 9432, 4.2.1):

PILOT: "Las Guindas Ground, Aviatory 452, IFR to Santa Cleta, request departure information."
ATC: "Aviatory 452, departure runway 32, wind 290 degrees 4 knots, QNH 1022, temperature minus 2, dewpoint minus 3, RVR 550 metres, time 27."
PILOT: "Runway 32, QNH 1022, will call for start up, Aviatory 452."
Significado: el controlador da por voz lo que el ATIS habría dado. El piloto colaciona pista y QNH.

Instrucción de escuchar el ATIS (Doc 9432, 2.8.2.2):

ATC: "Aviatory 452, monitor ATIS 123.250."
PILOT: "Monitoring 123.250, Aviatory 452."
Significado: «monitor» es escuchar una frecuencia donde se radiodifunde información; no se llama en ella.

No se puede recibir el ATIS (**PLAIN LANGUAGE**):

PILOT: "Las Guindas Approach, Aviatory 452, unable to receive ATIS, request current weather and runway in use."
Significado: frase directa que dice el problema y lo que se necesita.

### Aplicación en aerolínea

- El ATIS se copia antes de la llamada de puesta en marcha y antes del descenso, porque con él se prepara la salida o la aproximación (pista, QNH, nivel de transición, avisos). Qué piloto lo copia y cómo se cruza lo fija el SOP del operador.
- En aeropuertos con D-ATIS se pide por data link y se compara con lo que se tiene preparado en el FMS. Si la letra cambia durante el rodaje o la aproximación, se revisa qué cambió (pista, QNH) antes de seguir.
- Si la letra del D-ATIS y la que menciona el controlador no coinciden, se confirma por voz. La letra vigente es la del ATC.

### Error frecuente

- **Letra vieja**: llamar con «information Bravo» cuando ya salió Charlie, con otro QNH o con otra pista. El controlador puede no notarlo en una frecuencia saturada.
- **Tomar la pista del ATIS como autorización**: el ATIS dice la pista en uso; la pista asignada la da el controlador, y puede ser otra.
- **QNH copiado mal** y no colacionado cuando el controlador lo repite.
- **No confirmar el ATIS**: el controlador tiene que dar la información completa por voz y la frecuencia se carga.
- **Confundir hPa y pulgadas** cuando el ATIS de otro Estado usa otra unidad.

### En pocas palabras

- ATIS = información de aeródromo automática para llegadas y salidas; por voz o por data link (ATIS-D).
- Se acusa recibo con la letra en el primer contacto: «information Bravo».
- Pista, QNH y nivel de transición se colacionan cuando el ATC los transmite.
- La pista del ATIS no autoriza nada: la asigna el controlador.
- Letra nueva = revisar qué cambió.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-41-01 · Captura genérica · 4:5 · 1080 × 1350 px
IMAGEN SUGERIDA:
Impresión genérica de un D-ATIS de un aeródromo ficticio (Las Guindas) con la letra de identificación, hora, pista en uso, viento, visibilidad, nubes, temperatura y punto de rocío, QNH, nivel de transición y un aviso operacional. Resaltar con recuadros numerados: 1 la letra, 2 la pista, 3 el QNH, 4 el nivel de transición. Sin logotipos de operador ni de fabricante.
OBJETIVO:
Que el piloto ubique de un vistazo los cuatro datos que usará en la primera llamada y en la colación.

FUENTES
- Verificado: Doc 4444 (15.ª ed., Enm. 4) cap. 1 (definiciones ATIS, ATIS-D, ATIS-voz), 4.5.7.5.1 c), 4.10.4.3; Doc 9432 (4.ª ed.) cap. 1, 2.8.2.2, 4.2.1, 4.2.2, 4.4.3, 4.6.2, 7.3.1.
- VERIFICAR: contenido obligatorio del ATIS y regla de cambio de letra (orden alfabético consecutivo) contra Anexo 11, cap. 4 (no cargado).
- VERIFICAR: si la 16.ª ed. del Doc 4444 conserva la redacción de 4.5.7.5.1 c) sobre elementos incluidos en el ATIS (Doc 4444 16.ª ed., 4.5.7.5).
- VERIFICAR: si existe fraseología OACI para que el ATC anuncie una nueva letra de ATIS vigente, contra Doc 4444 cap. 12 (no cargado). No se incluyó ningún ejemplo por eso.
- VERIFICAR: unidad del QNH y práctica local de acuse del ATIS en Colombia contra AIP Colombia (GEN y AD 2) y RAC.

---

## 42. VOLMET

### ¿Qué es?

**VOLMET** es «información meteorológica para aeronaves en vuelo» (Doc 9432, cap. 1, abreviaturas). Es una radiodifusión: reportes y pronósticos de un grupo de aeródromos, repetidos en un horario fijo. No se habla con nadie; se escucha.

### Lo que debe saber un piloto

- Su contenido típico son METAR, TAF y SIGMET de los aeródromos de una zona. La lista de aeródromos, el horario y las frecuencias están publicados (VERIFICAR abajo).
- Importa sobre todo **en ruta larga y oceánica**, lejos de cualquier ATIS: sirve para actualizar el tiempo del destino y de las alternativas sin ocupar una frecuencia de control.
- Hay VOLMET en **HF** (larga distancia), en **VHF** en algunas regiones y en forma de data link (D-VOLMET) (VERIFICAR).
- En aviones con ACARS, muchas veces el mismo dato se pide como texto al sistema de la compañía. El VOLMET por voz sigue siendo el respaldo cuando el data link no está.

### Fraseología OACI

VOLMET no tiene intercambio ATC/PILOT: es una emisión que solo se escucha. Por eso este capítulo no trae cuatro intercambios; trae cómo pedir el dato cuando el VOLMET no alcanza.

Pedir el tiempo a una estación aeronáutica (**PLAIN LANGUAGE**):

PILOT: "Oceanic Radio, Aviatory 452, request latest weather for Santa Cleta."
Significado: solicitud directa con «request» (palabra normalizada, Doc 9432, 2.6) del dato que falta.

Pedir la frecuencia VOLMET (**PLAIN LANGUAGE**):

PILOT: "Oceanic Radio, Aviatory 452, request VOLMET frequency."
Significado: pregunta breve; la estación da la frecuencia.

Confirmar que el tiempo del destino cambió (**PLAIN LANGUAGE**):

PILOT: "Oceanic Radio, Aviatory 452, Santa Cleta weather received, will advise intentions."
Significado: recibido y aviso de que la tripulación está evaluando.

### Aplicación en aerolínea

En un cruce oceánico la tripulación actualiza el tiempo del destino y de las alternativas en ruta. Lo hace por data link de la compañía o, si no hay, escuchando el VOLMET HF a la hora de emisión del aeródromo que le interesa. Qué fuentes usa y cada cuánto lo fija el operador.

### Error frecuente

- Escuchar el VOLMET en la frecuencia de control y perder una llamada: se escucha con el segundo receptor, con SELCAL o con el otro piloto atento a la frecuencia de control.
- Anotar el aeródromo equivocado porque la emisión trae varios seguidos.
- Tomar el VOLMET como autorización o como información ATC: es solo meteorología.

### En pocas palabras

- VOLMET = meteorología para aeronaves en vuelo, radiodifundida.
- Se escucha, no se contesta.
- Útil en ruta y en oceánico, lejos de un ATIS.
- Lista, horario y frecuencias: en la documentación publicada.

FUENTES
- Verificado: Doc 9432 (4.ª ed.) cap. 1 (abreviatura VOLMET), 2.6 (REQUEST).
- VERIFICAR: contenido del VOLMET (METAR, TAF, SIGMET), horarios y existencia de VOLMET HF, VHF y D-VOLMET contra Anexo 3, cap. 11 y Anexo 11 (no cargados), y contra Doc 9432 cap. 10 (no cargado).
- VERIFICAR: estaciones y frecuencias VOLMET de cada región contra AIP y documentación regional (ENR / GEN 3.5).

---

## 43. CPDLC

### ¿Qué es?

**CPDLC** (comunicaciones por enlace de datos controlador-piloto) es la «comunicación entre el controlador y el piloto por medio de enlace de datos para las comunicaciones ATC» (Doc 4444, cap. 1). En vez de hablar, controlador y piloto intercambian **mensajes de texto preformateados** que aparecen en una pantalla de la cabina y en la consola del controlador.

Su guía operacional es el **GOLD** (Global Operational Data Link). Según la presentación de la FAA (2017), el GOLD reunió tres guías regionales: el manual de operaciones FANS 1/A de Asia-Pacífico, la guía de data link del Atlántico Norte y la guía LINK2000+ (ATN B1) de Europa. La 1.ª edición interregional la adoptaron Atlántico Norte y Asia-Pacífico en junio de 2010; Europa adoptó la 2.ª en abril de 2013. Después la OACI la publicó como **Doc 10037** (1.ª ed., 2017). Cubre DLIC, ADS-C y CPDLC sobre las tecnologías **FANS 1/A** y **ATN B1**.

### Lo que debe saber un piloto

**1. Logon (iniciación).** Antes de entrar en un espacio aéreo que exige data link, la aeronave y la dependencia ATS inician la comunicación por enlace de datos (Doc 4444, 4.15.1.1). Lo hace la aeronave (automático o por acción del piloto) o la dependencia ATS. La dirección de logon de cada dependencia se publica en la AIP (Doc 4444, 4.15.1.2). La función que intercambia direcciones y versiones se llama **DLIC** (Doc 4444, cap. 1). Si el logon falla, el sistema avisa a quien lo inició (Doc 4444, 4.15.4).

**2. Quién te controla por data link.** El Doc 4444 (cap. 1) define:
- **Autoridad de datos vigente**: la dependencia con la que tienes el diálogo CPDLC ahora.
- **Autoridad de datos siguiente**: la que la vigente designó para la transferencia.
- **Autoridad de datos ruta abajo**: otra dependencia con la que puedes comunicarte para recibir la autorización siguiente.

Esto importa porque solo la autoridad vigente te controla. Tener logon con la siguiente no te pone bajo su control.

**3. Uplink y downlink.**
- **Uplink**: mensaje de tierra a la aeronave (autorización, instrucción, pregunta, información).
- **Downlink**: mensaje de la aeronave a tierra (solicitud, respuesta, informe).

**4. Respuestas.** Cada uplink pide un tipo de respuesta. Las palabras son las mismas de la radiotelefonía y significan lo mismo (Doc 9432, 2.6):

| Respuesta | Significado (Doc 9432, 2.6) | Cuándo se usa en CPDLC |
|---|---|---|
| WILCO | «He comprendido su mensaje y procederé de acuerdo» | Autorización o instrucción que vas a cumplir |
| UNABLE | «No puedo cumplir su solicitud, instrucciones o autorización» | Autorización o instrucción que no puedes cumplir |
| STANDBY | «Espere y le llamaré»; no es aprobación ni denegación | Necesitas tiempo; el mensaje sigue abierto |
| ROGER | «He recibido toda su transmisión anterior» | Mensaje informativo que solo pide acuse |
| AFFIRM | «Sí» | Pregunta de sí o no |
| NEGATIVE | «No» o «es incorrecto» | Pregunta de sí o no |

Qué respuesta admite cada mensaje lo fija el conjunto de mensajes (VERIFICAR abajo). La idea que sí es segura: **ROGER no es WILCO**. ROGER dice que lo recibiste; WILCO dice que lo vas a cumplir.

**5. STANDBY no cierra nada.** Después de STANDBY todavía debes la respuesta final (WILCO o UNABLE).

**6. Transferencia.** Al salir de un espacio aéreo, la autoridad vigente transfiere la conexión a la siguiente. La tripulación comprueba en la pantalla quién es ahora la autoridad vigente.

**7. Performance.** El Doc 4444 (cap. 1) define la **RCP** (performance de comunicación requerida) y da como ejemplo el tipo **RCP 240**: valores de tiempo de transacción, continuidad, disponibilidad e integridad. Algunas separaciones reducidas exigen una RCP determinada. El marco completo (PBCS) está en el Doc 9869.

### Fraseología OACI

**Mensajes CPDLC.** Los textos de pantalla que siguen son **ilustrativos**. El texto exacto de cada mensaje está en el Doc 4444, apéndice 5, y en el Doc 10037, apéndice A, y **cambia entre FANS 1/A y ATN B1**. Ninguno se publica sin verificarlo.

Uplink con autorización de nivel (VERIFICAR texto):

UPLINK: "CLIMB TO FL350"
PILOT (downlink): "WILCO"
Significado: el controlador autoriza ascenso a FL350. Ambos pilotos lo leen y cruzan, se selecciona el nivel y se envía WILCO. No hay colación oral (Doc 4444, 4.5.7.5.2.1).

Uplink que no se puede cumplir (VERIFICAR texto):

UPLINK: "CLIMB TO FL390"
PILOT (downlink): "UNABLE"
PILOT (downlink, texto libre o mensaje con motivo, VERIFICAR): "DUE TO AIRCRAFT PERFORMANCE"
Significado: no se acepta lo que no se puede volar. Igual que por voz, UNABLE va con el motivo cuando es posible (Doc 9432, 2.6, nota a IMPOSIBLE).

Solicitud del piloto (VERIFICAR texto):

PILOT (downlink): "REQUEST CLIMB TO FL370"
UPLINK: "STANDBY"
UPLINK (después): "CLIMB TO FL370"
PILOT (downlink): "WILCO"
Significado: el STANDBY de tierra no autoriza nada. Solo el uplink con la autorización cuenta.

Pregunta de sí o no (VERIFICAR texto y tipo de respuesta):

UPLINK: "CAN YOU ACCEPT FL370 AT TIMSA"
PILOT (downlink): "AFFIRM"
Significado: el controlador pregunta si puedes; **todavía no te autoriza**. Hay que esperar la autorización.

Mensaje informativo (VERIFICAR texto):

UPLINK: "EXPECT CLIMB AT 1230"
PILOT (downlink): "ROGER"
Significado: información para planificar. No es autorización para ascender a las 12:30.

**Voz alrededor del CPDLC.** Cuando algo no está claro, se pasa a voz.

Confirmar un mensaje dudoso (construido con palabras normalizadas del Doc 9432, 2.6; no es frase publicada):

PILOT: "Oceanic Control, Aviatory 452, confirm CPDLC clearance flight level three five zero."
ATC: "Aviatory 452, affirm, climb to flight level three five zero."
PILOT: "Climb to flight level three five zero, Aviatory 452."
Significado: una duda sobre un uplink se resuelve por voz antes de ejecutar. Aquí la instrucción llegó por voz, así que sí se colaciona.

Anulación de un mensaje CPDLC por voz (VERIFICAR):

ATC: "Aviatory 452, disregard CPDLC climb message, break, maintain flight level three three zero."
PILOT: "Maintain flight level three three zero, Aviatory 452."
Significado: el controlador anula lo que envió por data link y da la instrucción válida por voz. Vale la de voz.

Falla general de CPDLC anunciada por el ATC (VERIFICAR):

ATC: "All stations, CPDLC failure, continue on voice."
Significado: todas las comunicaciones pasan a voz. No se esperan más uplinks.

### Aplicación en aerolínea

- Antes del espacio aéreo que lo exige, la tripulación hace el logon con la dirección publicada en la AIP o en la carta de ruta, y comprueba que la conexión quedó activa.
- Un uplink se lee en voz alta dentro de la cabina, lo cruzan ambos pilotos, se introduce en el FCU/MCP o en el FMS y solo después se envía WILCO. Quién pulsa y en qué orden lo dice el SOP del operador.
- Algunos aviones permiten cargar la autorización del uplink directo al FMS. Aun así se revisa la ruta modificada antes de ejecutarla.

### Error frecuente

- **Enviar WILCO sin leer bien** o sin cruzar con el otro piloto: es aceptar una autorización que no se comprobó.
- **Tratar STANDBY o AFFIRM como autorización.** Una pregunta («can you accept») no es una autorización.
- **Responder ROGER a una autorización**: el controlador queda sin saber si la vas a cumplir.
- **Contestar tarde o no contestar**: el mensaje queda abierto y el controlador puede terminar llamando por voz.
- **Ejecutar un uplink que contradice una instrucción de voz reciente** sin aclararlo.
- **Perder la transferencia**: seguir enviando solicitudes a la dependencia anterior.

### En pocas palabras

- CPDLC es control ATC por texto: autorizaciones, instrucciones, solicitudes y respuestas.
- Primero logon; solo la autoridad de datos vigente te controla.
- WILCO cumple, UNABLE no cumple, STANDBY aplaza, ROGER acusa, AFFIRM/NEGATIVE contestan preguntas.
- Una pregunta o un STANDBY no autorizan nada.
- Duda sobre un mensaje = voz.
- Los textos exactos salen del Doc 4444 apéndice 5 y del Doc 10037.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-43-01 · Esquema · 9:16 · 1080 × 1920 px
IMAGEN SUGERIDA:
Tres pantallas genéricas de CPDLC en secuencia vertical, sin marca de fabricante. 1 «UPLINK»: aparece un mensaje nuevo con la hora, la dependencia (ficticia) y el texto «CLIMB TO FL350» (texto a verificar antes de producir). 2 «REVIEW»: el mismo mensaje con una nota lateral «leer, cruzar con el otro piloto, seleccionar el nivel». 3 «RESPONSE»: botones WILCO, UNABLE y STANDBY, con WILCO resaltado y el estado «enviado». Flechas entre pantallas.
OBJETIVO:
Que el piloto vea que la respuesta va al final, después de leer, cruzar y seleccionar, y que las tres opciones significan cosas distintas.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-43-02 · Diagrama · 16:9 · 1600 × 900 px
IMAGEN SUGERIDA:
Aeronave volando de izquierda a derecha entre dos FIR ficticias. Sobre la primera, rótulo «Autoridad de datos vigente» con línea sólida hacia el avión. Sobre la segunda, «Autoridad de datos siguiente» con línea punteada. En el límite de FIR, una flecha «transferencia» que convierte la punteada en sólida.
OBJETIVO:
Que el piloto entienda que solo la autoridad vigente lo controla y que la transferencia ocurre en el límite.

FUENTES
- Verificado: Doc 4444 (15.ª ed., Enm. 4) cap. 1 (CPDLC, DLIC, autoridad de datos vigente, siguiente y ruta abajo, RCP, tipo de RCP), 4.5.7.5.2.1, 4.15.1.1, 4.15.1.2, 4.15.2, 4.15.4; Doc 9432 (4.ª ed.) 2.6 (WILCO, UNABLE, STANDBY, ROGER, AFFIRM, NEGATIVE, CONFIRM); presentación FAA 2017 sobre el GOLD (historia, ediciones 2010 y 2013, alcance FANS 1/A y ATN B1, Doc 10037 1.ª ed. 2017, PBCS en Doc 9869).
- VERIFICAR: texto de todos los mensajes de pantalla de este capítulo («CLIMB TO FL350», «REQUEST CLIMB TO FL370», «CAN YOU ACCEPT FL370 AT TIMSA», «EXPECT CLIMB AT 1230», motivo «DUE TO AIRCRAFT PERFORMANCE») y el tipo de respuesta que admite cada uno contra Doc 4444 16.ª ed., apéndice 5, y Doc 10037, apéndice A (no cargados). Revisar diferencias FANS 1/A y ATN B1.
- VERIFICAR: reglas de cierre de mensajes, tiempos de espera, uso de texto libre y respuesta final después de STANDBY contra Doc 4444 cap. 14 y Doc 10037 cap. 4 (no cargados).
- VERIFICAR: «DISREGARD CPDLC (tipo de mensaje) MESSAGE, BREAK (instrucción)» y «ALL STATIONS CPDLC FAILURE (instrucciones)» contra Doc 4444 16.ª ed., cap. 12 y cap. 14 (no cargados). Si no calzan palabra por palabra, se corrigen o se quitan.
- VERIFICAR: procedimiento de transferencia de conexión y comprobación de la autoridad vigente por la tripulación contra Doc 10037 cap. 4 (no cargado).

---

## 44. VOZ VS CPDLC

### ¿Qué es?

Dos medios para la misma relación piloto-controlador. La voz es inmediata y todos en la frecuencia la escuchan. El CPDLC deja texto escrito, no se bloquea con otras transmisiones y no depende de la pronunciación. Ninguno reemplaza del todo al otro: el CPDLC complementa la voz y, si el data link falla, todo vuelve a la voz.

### Lo que debe saber un piloto

| | Voz (VHF / HF) | CPDLC |
|---|---|---|
| Rapidez | Inmediata en VHF; en HF puede ir por un operador de radio | Depende del tiempo de transacción (RCP) |
| Lo tácticamente urgente | Es el medio para lo inmediato | No es el medio para lo inmediato (VERIFICAR) |
| Colación | Obligatoria en lo del Doc 4444, 4.5.7.5.1 | **No se requiere colación oral**, salvo que la autoridad ATS lo prescriba (Doc 4444, 4.5.7.5.2.1). La respuesta es WILCO/UNABLE en pantalla |
| Errores de oído | Números mal escuchados, distintivos parecidos, transmisiones bloqueadas | Se eliminan casi todos, pero aparecen los de **lectura**: leer rápido, aceptar sin cruzar |
| Registro | Queda solo en la memoria y en lo anotado | Queda escrito en pantalla |
| Conciencia de tráfico | Escuchas lo que se les dice a los demás | Se pierde: no ves las autorizaciones de otros |
| Idioma | Pronunciación y comprensión oral | Comprensión escrita; mensajes preformateados |
| Situación no normal | Plain language, matices, intenciones | Limitado a mensajes y texto libre |

Tres ideas que se deducen de las fuentes:

- **La colación oral no aplica a CPDLC** (Doc 4444, 4.5.7.5.2.1). Pero la instrucción que llega por voz se colaciona siempre, aunque estés conectado por CPDLC.
- **El data link no elimina la necesidad del idioma.** El Doc 9835 (1.4.5) lo explica: la tecnología no se usa en todas partes, exige comprensión escrita y, si falla el equipo, piloto y controlador vuelven al lenguaje natural.
- **Depende del entorno.** En oceánico, donde la voz es HF y a veces por operador de radio, el CPDLC suele ser el medio principal. En terminal y aproximación la voz VHF manda.

### Fraseología OACI

La misma instrucción, por voz y por CPDLC:

ATC (voz): "Aviatory 452, climb to flight level three five zero."
PILOT (voz): "Climb to flight level three five zero, Aviatory 452."
Significado: por voz se colaciona el nivel (Doc 4444, 4.5.7.5.1 c).

UPLINK: "CLIMB TO FL350" (VERIFICAR texto)
PILOT (downlink): "WILCO"
Significado: por CPDLC no hay colación oral; WILCO es el compromiso de cumplir (Doc 4444, 4.5.7.5.2.1; Doc 9432, 2.6).

Voz con UNABLE y motivo (Doc 9432, 2.8.3.10, adaptado):

ATC: "Aviatory 452, climb to flight level three nine zero."
PILOT: "Unable flight level three nine zero due weight, Aviatory 452."
Significado: igual que el ejemplo del manual («UNABLE TO CROSS WICKEN FL 150 DUE WEIGHT»), la negativa va con motivo.

Pasar de CPDLC a voz ante un mensaje ambiguo (**PLAIN LANGUAGE** con palabras normalizadas):

PILOT: "Oceanic Control, Aviatory 452, CPDLC route clearance not clear, request voice clearance."
ATC: "Aviatory 452, standby."
Significado: la tripulación no ejecuta una ruta que no entiende; la pide por voz. STANDBY no es autorización (Doc 9432, 2.6).

Situación no normal: la voz es mejor (**PLAIN LANGUAGE**):

PILOT: "Oceanic Control, Aviatory 452, we have a pressurization problem, request descent to flight level two five zero."
Significado: una situación que exige matices, intenciones o acción inmediata va por voz. Declarar urgencia o socorro sigue las reglas de los capítulos 34 a 36.

### Aplicación en aerolínea

- En cabina se define quién gestiona la pantalla CPDLC y quién la frecuencia de voz, para que ninguna de las dos quede sin atención. Lo fija el SOP.
- Con CPDLC en crucero se sigue escuchando la frecuencia de voz asignada (o SELCAL en HF) porque el controlador puede llamar.
- Si un uplink y una instrucción de voz se contradicen, no se ejecuta ninguno hasta aclararlo por voz.

### Error frecuente

- Pensar que con CPDLC ya no hace falta escuchar la frecuencia.
- Colacionar por voz lo que llegó por CPDLC sin que la autoridad lo pida: ocupa la frecuencia sin necesidad.
- No colacionar por voz lo que llegó por voz porque «estamos en CPDLC».
- Usar texto libre largo para una situación no normal en vez de llamar.
- Perder la conciencia de tráfico: sin voz, no escuchas que otro avión fue autorizado a tu nivel.

### En pocas palabras

- Voz: inmediata y compartida. CPDLC: escrita, sin errores de oído, sin colación oral.
- CPDLC no se colaciona por voz salvo que la autoridad ATS lo exija (Doc 4444, 4.5.7.5.2.1).
- Lo urgente y lo no normal van por voz.
- El data link no reemplaza el idioma (Doc 9835, 1.4.5).
- Aunque haya CPDLC, se escucha la voz.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-44-01 · Esquema · 1:1 · 1080 × 1080 px
IMAGEN SUGERIDA:
Dos columnas. Izquierda «VOZ»: micrófono, ondas, textos cortos «inmediata», «todos la escuchan», «se colaciona». Derecha «CPDLC»: pantalla con mensaje, textos «escrita», «sin colación oral», «se lee y se cruza». Abajo, a lo ancho, una franja: «Si hay duda o urgencia: voz».
OBJETIVO:
Que el piloto elija el medio según la situación y recuerde que la voz es el respaldo.

FUENTES
- Verificado: Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1, 4.5.7.5.2.1, cap. 1 (RCP); Doc 9432 (4.ª ed.) 2.6, 2.8.3.10; Doc 9835 (2.ª ed.) 1.4.5.
- VERIFICAR: que el CPDLC no debe usarse para instrucciones que exigen acción inmediata y las reglas de paso a voz, contra Doc 4444 cap. 14 y Doc 10037 cap. 3 y 4 (no cargados).
- VERIFICAR: obligación de mantener escucha de voz (o SELCAL) con CPDLC activo, contra Doc 10037 cap. 4 y documentación regional (no cargados).
- VERIFICAR: texto «CLIMB TO FL350» contra Doc 4444 apéndice 5 / Doc 10037 apéndice A.
- VERIFICAR: si la autoridad ATS de cada región exige colación oral de algún mensaje CPDLC, contra AIP y Doc 7030.

---

## 45. DCL / DEPARTURE CLEARANCE POR DATA LINK

### ¿Qué es?

La autorización de salida (ruta, SID, nivel inicial, código SSR, frecuencia de salida) entregada por data link en vez de por voz en la frecuencia de entrega de autorizaciones. Existen dos familias:

- **DCL** (departure clearance): servicio ATS de data link. La segunda edición del GOLD tenía en su alcance el **CPDLC-DCL**, la autorización de salida por CPDLC (presentación FAA 2017).
- **PDC** (pre-departure clearance): en algunos Estados la autorización se entrega a través de la red de datos de la compañía (ACARS) o de una impresora, no como diálogo CPDLC (VERIFICAR).

Cuál se usa, cómo se pide y cómo se confirma depende de cada aeropuerto.

### Lo que debe saber un piloto

- **Es una autorización ATC completa.** Se lee con la misma atención que una por voz: límite, ruta, SID, nivel, código SSR, frecuencia.
- **La confirmación varía.** En unos sistemas se acepta en pantalla; en otros hay que llamar por voz a entrega o a superficie para confirmar que se recibió. Lo dice la AIP del aeródromo (VERIFICAR).
- **Si no llega o no coincide con lo planificado**, se pide por voz. No se sale con una autorización dudosa.
- Una PDC que llega por el canal de la compañía **es una autorización ATC**, aunque llegue por la misma impresora que el mensaje de la compañía.

### Fraseología OACI

Autorización por voz como respaldo cuando la DCL no llega (**PLAIN LANGUAGE** en la primera línea):

PILOT: "Bogota Delivery, Aviatory 452, departure clearance by data link not received, request clearance by voice."
ATC: "Aviatory 452, cleared to Santa Cleta, (SID), flight level (nivel), squawk (código)."
PILOT: (colación completa de la autorización), "Aviatory 452."
Significado: la ruta y el código se colacionan siempre (Doc 4444, 4.5.7.5.1 a y c). El formato de la autorización se ve en el capítulo 14.

Confirmar por voz la recepción de una DCL (**PLAIN LANGUAGE**; la forma exacta depende del aeródromo):

PILOT: "Bogota Ground, Aviatory 452, stand 24, departure clearance received by data link, squawk (código), information Bravo, request start up."
Significado: dice qué recibió, el código asignado y el ATIS, y pide lo siguiente.

La DCL no coincide con el plan (**PLAIN LANGUAGE**):

PILOT: "Bogota Delivery, Aviatory 452, data link clearance shows different SID from flight plan, confirm SID."
Significado: una discrepancia se aclara por voz antes de cargarla en el FMS. «Confirm» es palabra normalizada (Doc 9432, 2.6).

### Aplicación en aerolínea

La autorización llega a la cabina, un piloto la carga o la revisa contra el FMS y el otro la cruza. Si el sistema es DCL por CPDLC, se responde en pantalla; si es PDC, se sigue el procedimiento de confirmación del aeropuerto.

### Error frecuente

- Leer solo la SID y no ver que cambió el nivel inicial o el código.
- Suponer que la PDC impresa es igual al plan de vuelo presentado.
- Olvidar la confirmación por voz que exige el aeropuerto.

### En pocas palabras

- DCL/PDC = autorización de salida por data link.
- DCL (servicio ATS, CPDLC-DCL) no es lo mismo que PDC (por red de la compañía en algunos Estados).
- Se lee y se cruza completa.
- La confirmación la fija cada aeropuerto.
- Si falta o no cuadra: voz.

FUENTES
- Verificado: presentación FAA 2017 sobre el GOLD (CPDLC-DCL en el alcance de la 2.ª ed. del Doc 10037); Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1; Doc 9432 (4.ª ed.) 2.6.
- VERIFICAR: definición de DCL y de PDC, y dónde se usa cada una, contra Doc 10037 (2.ª ed.), Doc 4444 16.ª ed. cap. 14 y AIP de los Estados de operación (no cargados).
- VERIFICAR: procedimiento de confirmación por voz de DCL/PDC en cada aeródromo, contra la AIP (AD 2.20 o equivalente). En Colombia, AIP Colombia.

---

## 46. ACARS

### ¿Qué es?

**ACARS** es un sistema de enlace de datos entre la aeronave y tierra que las aerolíneas usan para su comunicación operacional. No es un término definido en los documentos OACI cargados; sus normas son de la industria (VERIFICAR).

### Lo que debe saber un piloto

- **Por ACARS pasan**, según el operador: mensajes con despacho y mantenimiento, horas de salida y llegada, meteorología, D-ATIS, datos de carga y, en ciertos sistemas, autorizaciones de salida (PDC) (VERIFICAR).
- **ACARS y CPDLC no son sinónimos.** CPDLC es un servicio ATC (control). ACARS es un medio de datos, sobre todo de la compañía. En FANS 1/A, los mensajes CPDLC pueden viajar por la red ACARS, pero siguen siendo mensajes ATC con sus propias reglas (VERIFICAR).
- **La prueba práctica**: si el mensaje es del controlador y te autoriza o te instruye, es ATC. Si es de tu compañía, no autoriza nada ante el ATC.
- Para hablar por voz con la compañía existe el sufijo **DISPATCH** (despacho de la compañía, Doc 9432, 2.7.1.1).

### Fraseología OACI

ACARS no tiene fraseología ATC. Los ejemplos muestran dónde se cruza con la voz.

Llamada de voz a la compañía (sufijo del Doc 9432, 2.7.1.1; resto **PLAIN LANGUAGE**):

PILOT: "Aviatory Dispatch, Aviatory 452, ACARS inoperative, request updated weather for Santa Cleta."
Significado: si el ACARS falla, la compañía se contacta por voz.

Un mensaje de la compañía no reemplaza al ATC (**PLAIN LANGUAGE**):

PILOT: "Oceanic Control, Aviatory 452, company requests flight level three seven zero, request climb flight level three seven zero."
Significado: la compañía sugiere; el ATC autoriza. Solo cuenta la autorización del ATC.

Pedir la frecuencia de voz porque no llega el D-ATIS (**PLAIN LANGUAGE**):

PILOT: "Las Guindas Approach, Aviatory 452, data link ATIS not available, request ATIS frequency."
Significado: sin data link, el ATIS se escucha por voz.

### Aplicación en aerolínea

En una cabina de aerolínea ACARS es rutina: se reciben el plan, la carga, el tiempo y los mensajes del despacho. La tripulación separa siempre lo que es de la compañía de lo que es del ATC, aunque salga por la misma impresora o la misma pantalla.

### Error frecuente

- Llamar «ACARS» a la pantalla de CPDLC y tratar un uplink ATC como mensaje de la compañía, o al revés.
- Ejecutar un cambio de nivel o de ruta que pidió la compañía sin autorización del ATC.
- Confiar en un D-ATIS por ACARS con la letra vieja.

### En pocas palabras

- ACARS = data link de la aerolínea: despacho, tiempo, D-ATIS, datos operacionales.
- CPDLC = control ATC por data link.
- Pueden compartir medio, no función.
- La compañía sugiere; el ATC autoriza.

FUENTES
- Verificado: Doc 9432 (4.ª ed.) 2.7.1.1 (sufijo DISPATCH / DESPACHO).
- VERIFICAR: definición y alcance de ACARS (normas ARINC de la industria) y los mensajes que maneja, contra la documentación del operador (FCOM / manual de operaciones) (no cargados).
- VERIFICAR: que los mensajes CPDLC FANS 1/A viajan sobre la red ACARS, contra Doc 10037 cap. 1 (no cargado).
- VERIFICAR: uso de ACARS para PDC y D-ATIS en los aeropuertos de operación, contra la AIP respectiva.

---

## 47. ADS-C

### ¿Qué es?

La **vigilancia dependiente automática, contrato (ADS-C)** es el medio que permite al sistema de tierra y a la aeronave establecer, por enlace de datos, las condiciones de un **acuerdo ADS-C**: cuándo se envían los informes y qué datos llevan (Doc 4444, cap. 1). La aeronave calcula su posición y la reporta sola, sin que la tripulación hable.

### Lo que debe saber un piloto

- **Contratos.** El acuerdo se establece con uno o varios contratos (Doc 4444, cap. 1, nota a «Acuerdo ADS-C»). El Doc 4444 menciona los tipos: **periódico**, **relacionado con un suceso**, **de solicitud** y **modo de emergencia** (cap. 1, nota a ADS-C).
- **Qué se reporta.** Bloques de datos (Doc 4444, 4.11.5.1): identificación, ADS-C básica (latitud, longitud, altitud, hora, factor de calidad), vector terrestre, vector aéreo, perfil proyectado (punto siguiente y siguiente+1 con altitud y hora), información meteorológica, intención prevista y perfil ampliado. El bloque básico es obligatorio; en un informe de emergencia o urgencia va la situación (4.11.5.2).
- **Quién lo fija.** La dependencia ATC define qué y cada cuánto se reporta y lo comunica por el acuerdo ADS-C (Doc 4444, 4.11.4).
- **Reemplaza informes de voz.** Con datos de otras fuentes, como ADS-C, la autoridad puede eximir de los informes de posición obligatorios (Doc 4444, 4.11.1.3 y nota).
- **Separación.** Las aplicaciones de la separación lateral de 30 NM requieren comunicación oral directa controlador-piloto o CPDLC, más ADS-C con contrato periódico y contratos de suceso de cambio de punto de recorrido y de desviación lateral (Doc 4444, 5.4.1.2.1.6, nota 3).
- **Relación con CPDLC.** Los dos arrancan con el mismo logon (DLIC) y el GOLD los trata juntos (presentación FAA 2017). Son servicios distintos: ADS-C vigila, CPDLC comunica. Puede haber uno sin el otro.
- **Meteorología.** La dependencia ATS reenvía a los centros mundiales de pronósticos de área los informes ADS-C con bloque meteorológico (Doc 4444, 4.12.6.1).

### Fraseología OACI

ADS-C casi no genera voz: su objetivo es evitarla. Los intercambios aparecen cuando cambia la necesidad de informes de voz.

Eximir de informes de voz (Doc 9432, 3.4.2):

ATC: "Aviatory 452, omit position reports until FIR boundary, next report GIKOS."
PILOT: "Wilco, Aviatory 452."
Significado: el controlador tiene la posición por otra fuente y libera la frecuencia. WILCO: entendido y se cumplirá.

Reanudar informes de voz (Doc 9432, 3.4.2):

ATC: "Aviatory 452, resume position reporting."
PILOT: "Wilco, Aviatory 452."
Significado: por ejemplo, el ATC perdió los datos ADS-C; la tripulación vuelve a dar informes por voz en cada punto.

Próximo informe (Doc 9432, 3.4.2):

ATC: "Aviatory 452, next report ODRAK."
PILOT: "Wilco, Aviatory 452."
Significado: el siguiente informe de voz es en ODRAK.

ADS-C fuera de servicio (VERIFICAR):

ATC: "Aviatory 452, ADS-C out of service, resume position reporting."
PILOT: "Wilco, Aviatory 452."
Significado: sin ADS-C, los informes vuelven a la voz o al CPDLC.

### Aplicación en aerolínea

En un cruce oceánico con FANS la tripulación hace el logon y, desde ahí, el avión reporta solo. El trabajo de la tripulación es mantener el plan del FMS correcto: si la ruta del FMS no coincide con la autorizada, el perfil que ve el controlador también está mal.

### Error frecuente

- Suponer que con ADS-C no hay que dar ningún informe de voz. Depende de la región y de lo que diga el controlador.
- Dejar en el FMS un punto que no está en la autorización: el perfil proyectado sale errado.
- Confundir ADS-C (contrato con una dependencia, por data link) con ADS-B (radiodifusión, Doc 4444, cap. 1).

### En pocas palabras

- ADS-C = la aeronave reporta sola según un contrato con la dependencia ATC.
- Contratos: periódico, de suceso, de solicitud, emergencia.
- Puede eximir de informes de posición por voz.
- Mismo logon que CPDLC; servicios distintos.
- Si se cae, vuelven los informes de voz.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-47-01 · Diagrama · 16:9 · 1600 × 900 px
IMAGEN SUGERIDA:
Aeronave sobre el océano con tres flechas hacia un centro de control ficticio: «periódico: cada X minutos» (reloj), «suceso: cambio de punto de recorrido» (bandera en un punto), «suceso: desviación lateral» (desplazamiento de la derrota). Un cuarto recuadro «solicitud: el controlador pide un informe ya». Rótulo inferior: «ADS-C vigila. CPDLC comunica.»
OBJETIVO:
Que el piloto entienda qué dispara un informe ADS-C y que no lo tiene que enviar a mano.

FUENTES
- Verificado: Doc 4444 (15.ª ed., Enm. 4) cap. 1 (ADS-C, acuerdo ADS-C, ADS-B), 4.11.1.3, 4.11.4, 4.11.5.1, 4.11.5.2, 4.12.6.1, 5.4.1.2.1.6 nota 3; Doc 9432 (4.ª ed.) 3.4.2; presentación FAA 2017 (DLIC, ADS-C y CPDLC en el GOLD).
- VERIFICAR: «ADS-C OUT OF SERVICE» y demás fraseología ADS-C contra Doc 4444 16.ª ed., 12.5 (no cargado).
- VERIFICAR: procedimientos ADS-C para la tripulación (activación, cancelación, informe de emergencia) contra Doc 4444 cap. 13 y Doc 10037 cap. 4 (no cargados).
- VERIFICAR: en qué regiones ADS-C exime de informes de voz, contra NAT Doc 007, documentación del Pacífico y AIP.

---

## 48. HF

### ¿Qué es?

**HF** es alta frecuencia: 3 a 30 MHz (Doc 9432, cap. 1). **VHF** es muy alta frecuencia: 30 a 300 MHz (misma fuente). La VHF es la radio de todos los días, cercana y clara. La HF llega mucho más lejos y por eso es la voz de las rutas oceánicas y remotas, pero con peor calidad.

### Lo que debe saber un piloto

- **Alcance.** La VHF es de línea de vista: su alcance depende de la altura y se acaba lejos de la costa. La HF se propaga reflejándose en la ionosfera y cubre miles de kilómetros; su calidad cambia con la hora, la estación del año y la actividad solar, y la mejor frecuencia de día no es la de la noche (VERIFICAR).
- **Ruido.** En HF son normales el ruido de fondo, el desvanecimiento y los cortes. La escala de inteligibilidad (Doc 9432, 2.8.4.3) es de 1 (ininteligible) a 5 (perfectamente inteligible).
- **Mismos procedimientos.** El Doc 9432 (preámbulo) dice que sus procedimientos, pensados para VHF, se aplican igual donde se usa HF.
- **Palabras que en HF sí se usan.** OVER y OUT «no se utilizan normalmente en comunicaciones VHF» (Doc 9432, 2.6). En HF, con retardo y ruido, marcan el fin de la transmisión y del intercambio. WORDS TWICE sirve cuando la comunicación es difícil (Doc 9432, 2.6). Si se prevé mala recepción, los elementos importantes se repiten (Doc 9432, 2.8.1.8).
- **Operadores de radio.** En muchas zonas oceánicas el piloto habla con una **estación aeronáutica** (sufijo RADIO, Doc 9432, 2.7.1.1), cuyo operador pasa los mensajes al controlador y devuelve las autorizaciones. No es comunicación directa controlador-piloto; el Doc 4444 las distingue (5.4.1.2.1.6, nota 3). Eso agrega tiempo: una solicitud puede tardar minutos.
- **Frecuencias primaria y secundaria.** Se asignan en pares o familias; si la primaria es mala, se prueba la secundaria (VERIFICAR).
- **SATCOM voz.** En aviones equipados existe voz por satélite; la OACI trabaja en su uso operacional (presentación FAA 2017, grupo OPDLWG). Cuándo reemplaza a la HF lo fija cada región (VERIFICAR).

### Fraseología OACI

Contacto inicial en HF con una estación aeronáutica (estructura del Doc 9432 2.7 y 3.4.1; frecuencias ficticias):

PILOT: "Oceanic Radio, Aviatory 452, on eight eight two five."
ATC (radio): "Aviatory 452, Oceanic Radio."
Significado: llamada inicial indicando la frecuencia. La estación contesta con los dos distintivos, que ya es la invitación a transmitir: el Doc 9432 (nota a 2.6) dice que se omitió «GO AHEAD» y que el distintivo de la estación que llama seguido del de la que contesta basta. En HF se sigue oyendo «go ahead» (VERIFICAR su estado en la fraseología vigente).

Informe de inteligibilidad (Doc 9432, 2.8.4.3):

PILOT: "Oceanic Radio, Aviatory 452, radio check eight eight two five."
ATC (radio): "Aviatory 452, Oceanic Radio, reading you three, loud background noise."
Significado: se entiende con dificultad. Con 3 conviene hablar más lento y repetir números.

Comunicación difícil (Doc 9432, 2.6 y 2.8.1.8):

ATC (radio): "Aviatory 452, words twice."
PILOT: "Flight level three five zero, flight level three five zero, GIKOS one two three five, GIKOS one two three five, Aviatory 452."
Significado: «words twice» pide repetir cada grupo dos veces. Se hace con lo esencial.

Autorización por operador de radio (formato de relevo VERIFICAR):

ATC (radio): "Aviatory 452, Oceanic Control clears Aviatory 452 climb to flight level three seven zero, report reaching."
PILOT: "Oceanic Control clears Aviatory 452 climb to flight level three seven zero, report reaching, Aviatory 452."
Significado: el operador de radio transmite la autorización del controlador. Se colaciona igual que una del ATC (Doc 4444, 4.5.7.5.1 c).

Cambio de frecuencia HF (**frecuencias ficticias**, formato VERIFICAR):

ATC (radio): "Aviatory 452, contact Oceanic Radio, primary eight eight two five, secondary one three three one zero."
PILOT: "Primary eight eight two five, secondary one three three one zero, Aviatory 452."
Significado: se anotan ambas; si la primaria no sirve, se llama en la secundaria.

### Aplicación en aerolínea

Antes de perder la cobertura VHF, la tripulación sintoniza la HF asignada, hace el contacto inicial y la prueba de SELCAL (capítulo 49). En crucero, con SELCAL, no se escucha la HF todo el tiempo. Las solicitudes se piden con tiempo porque la respuesta tarda. Muchos operadores usan CPDLC como medio principal y HF como respaldo.

### Error frecuente

- Hablar rápido y largo en HF: se pierde la mitad.
- No anotar la frecuencia secundaria y quedarse sin contacto si la primaria se degrada.
- Pedir un cambio de nivel en el último minuto, sin tener en cuenta la demora del relevo por operador de radio.
- Colacionar a medias porque «la HF está mala»: con mala calidad, la colación importa más.
- Dejar el volumen de HF alto sin SELCAL y cansar a la tripulación con el ruido, o bajarlo del todo sin SELCAL y perder llamadas.

### En pocas palabras

- HF 3 a 30 MHz, largo alcance, calidad variable. VHF 30 a 300 MHz, corto alcance, clara.
- Mismos procedimientos que en VHF; OVER, OUT y WORDS TWICE tienen sentido en HF.
- Muchas veces hablas con un operador de radio, no con el controlador.
- Siempre primaria y secundaria.
- Hablar lento, repetir lo importante, colacionar completo.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-48-01 · Diagrama · 16:9 · 1600 × 900 px
IMAGEN SUGERIDA:
Corte lateral de la Tierra con la costa a la izquierda. Una antena VHF con un haz recto que toca al avión cercano y pasa por encima del lejano (rótulo «VHF: línea de vista»). Una antena HF con un haz que sube, rebota en una capa rotulada «ionosfera» y baja hasta el avión sobre el océano (rótulo «HF: reflejo ionosférico, calidad variable»). Sin cifras de alcance.
OBJETIVO:
Que el piloto entienda por qué en oceánico la voz es HF y por qué su calidad cambia.

FUENTES
- Verificado: Doc 9432 (4.ª ed.) preámbulo (procedimientos aplicables en HF), cap. 1 (HF, VHF), 2.6 (OVER, OUT, WORDS TWICE, nota sobre GO AHEAD), 2.7.1.1 (sufijo RADIO), 2.8.1.8, 2.8.4.3, 3.4.1; Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1, 5.4.1.2.1.6 nota 3; presentación FAA 2017 (OPDLWG, voz por satélite).
- VERIFICAR: propagación HF y alcance VHF (línea de vista, variación día/noche) contra Anexo 10 Vol. III y el manual de la aeronave (no cargados).
- VERIFICAR: uso de frecuencias primaria y secundaria y formato de la transferencia HF contra Anexo 10 Vol. II cap. 5, Doc 9432 cap. 8 (8.10 control oceánico) y NAT Doc 007 (no cargados).
- VERIFICAR: formato de relevo de autorizaciones por operador de radio («(unidad) clears (distintivo)…») contra Doc 9432 cap. 8 y NAT Doc 007 (no cargados).
- VERIFICAR: pronunciación de frecuencias HF en kHz contra Anexo 10 Vol. II, 5.2.1.4 (no cargado).
- VERIFICAR: estado de «GO AHEAD» en la fraseología vigente (Doc 9432 4.ª ed., nota a 2.6, lo da por omitido) contra Anexo 10 Vol. II vigente.
- VERIFICAR: uso de SATCOM voz por región contra Doc 10037 y documentación regional (no cargados).

---

## 49. SELCAL

### ¿Qué es?

**SELCAL** es un «sistema que permite la llamada selectiva de aeronaves por separado en canales radiotelefónicos que enlazan una estación terrestre con la aeronave» (Doc 9432, cap. 1). La estación transmite un código de tonos asignado al avión; solo ese avión lo decodifica y en la cabina suena un aviso (campanilla y luz).

### Lo que debe saber un piloto

- **Para qué sirve.** Permite no escuchar la HF todo el tiempo. Con SELCAL comprobado, la tripulación puede bajar el volumen de HF y la estación la llama con el código cuando la necesita. Que esa escucha reducida esté permitida depende del procedimiento de cada región (VERIFICAR).
- **El código.** Cada avión tiene un código de cuatro letras, que se declara en el plan de vuelo (VERIFICAR).
- **SELCAL check.** Al hacer el primer contacto con una estación HF se pide una prueba: la estación envía el código y la tripulación confirma que sonó. Sin prueba correcta, no se confía en SELCAL.
- **Si no funciona**, se vuelve a la escucha continua de la frecuencia HF (VERIFICAR).
- **Al responder a una llamada SELCAL** se llama a la estación con el distintivo; ella da el mensaje.

### Fraseología OACI

Todos los ejemplos de este capítulo van con VERIFICAR: el Doc 9432 cap. 11.1 (SELCAL) no está cargado.

Pedir la prueba de SELCAL (VERIFICAR):

PILOT: "Oceanic Radio, Aviatory 452, request SELCAL check, Alfa Bravo Charlie Delta."
ATC (radio): "Aviatory 452, Oceanic Radio, SELCAL check."
PILOT: "SELCAL okay, Aviatory 452."
Significado: la estación transmite el código; el piloto confirma que el aviso sonó.

Prueba fallida (VERIFICAR / **PLAIN LANGUAGE**):

PILOT: "Oceanic Radio, Aviatory 452, negative SELCAL, request check again."
Significado: no sonó. Se pide repetir; si vuelve a fallar, se informa y se mantiene escucha continua.

Respuesta a una llamada SELCAL (VERIFICAR):

PILOT: "Oceanic Radio, Aviatory 452."
ATC (radio): "Aviatory 452, (mensaje)."
Significado: el avión responde a la llamada selectiva con los dos distintivos (ver la nota sobre GO AHEAD en el capítulo 48) y queda a la escucha del mensaje.

Informar que el SELCAL no funciona (**PLAIN LANGUAGE**):

PILOT: "Oceanic Radio, Aviatory 452, SELCAL inoperative, maintaining listening watch on eight eight two five."
Significado: la estación sabe que no puede llamar con código y que la tripulación escucha la frecuencia (ficticia).

### Aplicación en aerolínea

En la entrada oceánica: contacto inicial HF, SELCAL check, y luego volumen de HF bajo con el SELCAL armado. Cuando suena, un piloto contesta y anota. En la transferencia a la siguiente estación, nuevo contacto y nueva prueba.

### Error frecuente

- Dar un código SELCAL equivocado (el de otro avión de la flota).
- Bajar el volumen de HF sin haber hecho la prueba.
- No informar un SELCAL que falló y quedar ilocalizable.
- Silenciar la campanilla y no llamar a la estación.

### En pocas palabras

- SELCAL = llamada selectiva: la estación llama solo a tu avión.
- Permite no escuchar la HF todo el tiempo, según la región.
- Código de cuatro letras.
- Prueba en cada contacto inicial.
- Si falla: informar y escucha continua.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-49-01 · Fotografía · 4:3 · 1200 × 900 px
IMAGEN SUGERIDA:
Panel de audio genérico de un avión de transporte con el indicador luminoso de SELCAL encendido y la perilla de volumen HF baja. Si no hay foto con licencia, esquema limpio del panel. Rótulo con recuadro numerado: 1 luz SELCAL, 2 volumen HF.
OBJETIVO:
Que el piloto reconozca el aviso SELCAL y relacione el volumen bajo de HF con el SELCAL probado.

FUENTES
- Verificado: Doc 9432 (4.ª ed.) cap. 1 (definición SELCAL).
- VERIFICAR: toda la fraseología de este capítulo («request SELCAL check», «SELCAL okay», respuesta a una llamada SELCAL) contra Doc 9432 cap. 11.1 y Anexo 10 Vol. II cap. 5 (no cargados).
- VERIFICAR: código de cuatro letras y su declaración en el plan de vuelo (casilla 18, «SEL/») contra Doc 4444 apéndice 2 (no cargado).
- VERIFICAR: cuándo SELCAL permite reducir la escucha continua de HF y qué hacer si falla, contra Anexo 10 Vol. II, NAT Doc 007 y documentación del Pacífico (no cargados).

---

## 50. OCEANIC COMMUNICATIONS

### ¿Qué es?

La suma de todo este nivel, aplicada al vuelo fuera de la cobertura VHF y radar: **HF** (con SELCAL) para la voz, **CPDLC** para las autorizaciones, **ADS-C** para la posición, **informes de posición** cuando no hay ADS-C, y **contingencias** cuando algo falla.

### Lo que debe saber un piloto

- **Antes de entrar**: logon (Doc 4444, 4.15.1.1), contacto HF, SELCAL check, y la autorización oceánica si la región la exige (VERIFICAR).
- **Informes de posición.** En rutas con puntos designados se dan al pasar cada punto de notificación obligatoria (Doc 4444, 4.11.1.1). En rutas sin puntos designados, tan pronto como sea posible después de la primera media hora de vuelo y luego cada hora (4.11.1.2). Con ADS-C u otra fuente puede haber exención (4.11.1.3).
- **Contenido del informe** (Doc 4444, 4.11.2.1; Doc 9432, 3.4.1): identificación, posición, hora, nivel, posición siguiente y hora, y punto significativo siguiente. Los tres últimos pueden omitirse por acuerdo regional; el nivel se incluye en la llamada inicial en una frecuencia nueva. Si te asignaron velocidad, va en el informe (4.11.2.2).
- **Cambio de FIR.** Cuando la AIP lo prescribe o la dependencia lo pide, el último informe antes del límite se da también a la dependencia siguiente (Doc 4444, 4.11.1.4).
- **Informe que no llega.** Si el ATC no recibe un informe a la hora prevista, no supone que la estimada era exacta y busca obtenerlo (Doc 4444, 4.11.1.5). Una estimada que cambia se corrige.
- **Aeronotificaciones especiales.** Turbulencia o engelamiento moderado o fuerte, ondas orográficas fuertes, tormentas oscurecidas o en línea, tempestad fuerte de polvo o arena, cenizas volcánicas y actividad volcánica se notifican (Doc 4444, 4.12.3.1). Por voz llevan posición, hora, nivel y la condición (4.12.3.3).
- **Contingencias.** Si falla CPDLC: voz (HF o SATCOM). Si falla la HF: CPDLC, SATCOM, relevo por otra aeronave o por la frecuencia aire-aire designada en la región (VERIFICAR). Los procedimientos de contingencia oceánica (desvío, descenso de emergencia, desviación por tiempo sin autorización) están en el Doc 4444, 15.2, no cargado: van con VERIFICAR y se tratan en su capítulo.

### Fraseología OACI

Informe de posición en el formato del Doc 9432 (3.4.1), con puntos ficticios:

PILOT: "Oceanic Radio, Aviatory 452, GIKOS 47, flight level 330, ODRAK 57, PUVEL next."
ATC (radio): "Aviatory 452, roger."
Significado: sobre GIKOS a los 47, FL330, estima ODRAK a los 57, siguiente PUVEL. Es el mismo orden del ejemplo «FASTAIR 345 WICKEN 47 FL 330 MARLO 57 COLIN NEXT». ROGER aquí basta: es un informe, no una autorización.

Informe con corrección (Doc 9432, 2.8.1.6):

PILOT: "Aviatory 452, GIKOS 47, flight level 330, ODRAK 07, correction ODRAK 57."
Significado: «correction» y se repite el grupo correcto.

Informe con velocidad asignada (Doc 4444, 4.11.2.2; forma de decir el Mach VERIFICAR):

PILOT: "Oceanic Radio, Aviatory 452, GIKOS 1235, flight level 350, Mach decimal eight two, ODRAK 1318, PUVEL next."
Significado: con número de Mach asignado, se incluye en cada informe.

Informe con coordenadas (formato VERIFICAR por región: NAT, Pacífico):

PILOT: "Oceanic Radio, Aviatory 452, position five five north two zero west at 1235, flight level 350, estimating five five north three zero west at 1318, next five four north four zero west."
Significado: en rutas definidas por latitud y longitud, la posición se dice en coordenadas. Cómo se abrevian y en qué orden se dicen cambia entre regiones.

Aeronotificación especial por voz (contenido Doc 4444, 4.12.3.3; forma de las palabras VERIFICAR):

PILOT: "Oceanic Radio, Aviatory 452, special air-report, TIMSA 1402, flight level 350, severe turbulence."
Significado: tipo de mensaje, posición, hora, nivel y la condición. Se transmite tan pronto como sea posible (4.12.1.1).

Instrucciones de informe (Doc 9432, 3.4.2):

ATC (radio): "Aviatory 452, next report BERUX."
PILOT: "Wilco, Aviatory 452."
Significado: se sabe dónde es el próximo informe.

Autorización oceánica (formato VERIFICAR; el del Atlántico Norte está en NAT Doc 007):

ATC: "Aviatory 452, cleared to Santa Cleta via GIKOS, (ruta), flight level 350, Mach decimal eight two."
PILOT: (colación completa), "Aviatory 452."
Significado: ruta, nivel y velocidad de la parte oceánica. Es una autorización de ruta: se colaciona completa (Doc 4444, 4.5.7.5.1 a).

### Aplicación en aerolínea

Secuencia típica de un cruce, sujeta al procedimiento de cada región y del operador:

1. Antes de la costa: autorización oceánica (voz o data link), logon CPDLC/ADS-C, frecuencia HF y SELCAL check.
2. En la entrada: comprobar que la ruta del FMS es la autorizada, punto por punto.
3. En crucero: CPDLC para solicitudes y autorizaciones; ADS-C reporta; informes por voz solo si no hay ADS-C o si se piden.
4. En cada punto: comprobar la estimada al siguiente y corregirla si cambia.
5. En la salida del espacio oceánico: transferencia de conexión y regreso a VHF.

### Error frecuente

- Entrar al espacio oceánico sin autorización oceánica donde se exige.
- Ruta del FMS distinta de la autorizada (un punto mal copiado): el ADS-C reporta la ruta equivocada y el avión la vuela.
- Informe de posición con estimada vieja.
- No saber qué hacer si falla la HF y el CPDLC al mismo tiempo: la contingencia se estudia antes del vuelo.
- Aceptar por HF una autorización a medio escuchar porque el relevo tarda.

### En pocas palabras

- En oceánico: HF + SELCAL para voz, CPDLC para control, ADS-C para posición.
- Informe: quién, dónde, cuándo, nivel, próximo y hora, siguiente.
- Estimada que cambia, estimada que se corrige.
- Cada región tiene su formato: se estudia antes de volarla.
- Si algo falla, hay otro medio; la contingencia se prepara en tierra.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-50-01 · Diagrama · 16:9 · 1600 × 900 px
IMAGEN SUGERIDA:
Ruta sobre el océano de una costa a otra (costas genéricas, sin nombres reales). En la costa de salida: «VHF / radar». En el tramo oceánico, sobre el avión, tres capas rotuladas: «HF + SELCAL (voz)», «CPDLC (autorizaciones)», «ADS-C (posición automática)». Puntos ficticios GIKOS, ODRAK, PUVEL con un globo «informe de posición» en cada uno. En la costa de llegada: «VHF / radar». Un recuadro lateral: «Si falla: CPDLC ↔ HF ↔ SATCOM».
OBJETIVO:
Que el piloto vea cómo se reparten los medios en un cruce oceánico y qué respaldo tiene cada uno.

FUENTES
- Verificado: Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5.1, 4.11.1.1 a 4.11.1.5, 4.11.2.1, 4.11.2.2, 4.12.1.1, 4.12.3.1, 4.12.3.3, 4.15.1.1; Doc 9432 (4.ª ed.) 2.8.1.6, 3.4.1, 3.4.2.
- VERIFICAR: formato del informe de posición con coordenadas y con Mach («Mach decimal eight two», «five five north two zero west») contra NAT Doc 007, documentación del Pacífico y Doc 9432 cap. 8 (no cargados).
- VERIFICAR: palabras exactas de la aeronotificación especial por voz («special air-report») contra Doc 4444 apéndice 1 (no cargado).
- VERIFICAR: formato y exigencia de la autorización oceánica contra NAT Doc 007 y AIP de cada Estado (no cargados).
- VERIFICAR: procedimientos de contingencia oceánica y frecuencia aire-aire regional contra Doc 4444 15.2 y Doc 7030 (no cargados).

# Comunicaciones aeronáuticas y gestión ATC (OACI) · Nivel 5: Vigilancia, contingencias y emergencias

> **VERIFICAR (bloqueo de publicación).** Este nivel depende de capítulos no cargados (Doc 4444 cap. 12 y 15, Doc 9432 cap. 9, Anexo 10 Vol. II cap. 5). No se publica hasta verificar cada línea VERIFICAR.

Notas para producción:

- Distintivo ficticio en todos los ejemplos: `AVIATORY 452` (y AVIATORY 425 o 542 cuando se necesitan distintivos parecidos).
- «Bogota Control», «Bogota Approach» y «Bogota Tower» son estaciones de ejemplo educativo. Frecuencias, códigos SSR, niveles y waypoints (GIKOS, TOLMA, ficticios) son didácticos, no datos del AIP.
- Fuentes cargadas: Doc 9432 (4.ª ed., 2007, ES), Doc 4444 (15.ª ed., Enm. 4, 2012, ES) cap. 1 a 5, Doc 9835 (2.ª ed., 2010, ES). La 15.ª edición del Doc 4444 no es la vigente: toda cita suya se revisa contra la edición en vigor antes de publicar.
- Cuando una línea en inglés no es fraseología normalizada, va rotulada **PLAIN LANGUAGE**.

---

## 31. TRANSPONDER Y SSR

### ¿Qué es?
El radar secundario de vigilancia (SSR) interroga al transpondedor de la aeronave y este responde con datos: un código de cuatro dígitos (identidad), la altitud de presión y, en Modo S, más información. El Doc 4444 lo define como «sistema radar de vigilancia que usa transmisores/receptores (interrogadores) y transpondedores». El ATC usa esa respuesta para identificarlo, separarlo y darle servicio de vigilancia.

### Lo que debe saber un piloto
- **Modos.** El Doc 4444 cap. 1 menciona cuatro modos definidos en el Anexo 10: A, C, S e intermodo. Para la cabina basta esto:
  - **Modo A**: el código de cuatro dígitos que asigna el ATC.
  - **Modo C**: agrega la altitud de presión. «TRANSPONDER CHARLIE» es la instrucción de activarla.
  - **Modo S**: interrogación selectiva; entre otros datos transmite la identificación de la aeronave, que debe coincidir con el distintivo del plan de vuelo. Por eso existe la instrucción de «reactivar la identificación Modo S».
- **El código SSR se colaciona siempre.** Está en la lista de elementos que se colacionan (Doc 4444 4.5.7.5.1 c; Doc 9432 2.8.3.5 c).
- **Los dígitos se dicen uno por uno**: 2400 se transmite «dos cuatro cero cero» (Doc 9432 2.4).
- **IDENT** es un botón: no se dice «ident» por radio en lugar de oprimirlo. Si el ATC pide IDENT, se oprime y se acusa recibo.
- **Tres códigos especiales:**

| Código | Significado | Fuente |
|---|---|---|
| 7700 | Emergencia | VERIFICAR |
| 7600 | Falla de radiocomunicaciones | Doc 9432 6.6, nota (cargado) |
| 7500 | Interferencia ilícita (apoderamiento) | VERIFICAR |

- **Precauciones con los códigos especiales:**
  - En una emergencia se selecciona 7700 salvo que el ATC ya le haya asignado otro código y esté en contacto con usted: en ese caso, lo normal es conservar el código asignado. VERIFICAR.
  - Al cambiar de código en un panel de perillas, evite pasar por 7500, 7600 o 7700 aunque sea un instante. VERIFICAR.
  - El 7500 activa procedimientos de seguridad en tierra. No se usa «para probar» ni se comenta en frecuencia. Qué hace la tripulación en ese caso lo fijan el Anexo 2, el Doc 4444 cap. 15 y los procedimientos de seguridad del explotador; no es tema de este capítulo.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-31-01 · Esquema · 16:9 · 1600×900
IMAGEN SUGERIDA:
Panel de transpondedor genérico (sin marca) con el código 4321 en pantalla, selector STBY / ALT / ON y botón IDENT resaltado. A la derecha, la pantalla del controlador con la etiqueta de la aeronave: distintivo AVIATORY 452, nivel de vuelo del Modo C y la marca de IDENT parpadeando. Debajo, tres fichas de color neutro con 7700 / 7600 / 7500 y su significado en una línea.
OBJETIVO:
Que el piloto relacione cada control del panel con lo que ve el controlador y reconozca los tres códigos especiales de un vistazo.

### Fraseología OACI

ATC: "AVIATORY 452, SQUAWK 4321."
PILOT: "4321, AVIATORY 452."
Seleccione el código 4321. Se colaciona el código (es elemento de colación obligatoria).

ATC: "AVIATORY 452, CONFIRM SQUAWK."
PILOT: "AVIATORY 452, SQUAWKING 4321."
El ATC pide confirmar el código seleccionado; usted dice el que tiene en el panel, no el que cree que le dieron.

ATC: "AVIATORY 452, RESET SQUAWK 4321."
PILOT: "RESETTING 4321, AVIATORY 452."
Vuelva a seleccionar el código asignado (el ATC no lo está recibiendo bien).

ATC: "AVIATORY 452, SQUAWK IDENT."
PILOT: "AVIATORY 452." (y oprime IDENT)
Active el dispositivo de identificación. Es la instrucción que el Doc 9432 muestra para confirmar que una aeronave recibe aunque no transmita (6.6).

ATC: "AVIATORY 452, CHECK ALTIMETER SETTING AND CONFIRM LEVEL."
PILOT: "AVIATORY 452, ALTIMETER 1013, FLIGHT LEVEL 80."
El nivel del Modo C no coincide con lo esperado: revise el reglaje y diga su nivel actual.

ATC: "AVIATORY 452, CONFIRM TRANSPONDER OPERATING."
PILOT: "AVIATORY 452, NEGATIVE, TRANSPONDER UNSERVICEABLE."
El ATC no ve su respuesta. Si el equipo falló, se dice sin rodeos: afecta su servicio de vigilancia y el acceso a ciertos espacios aéreos.

ATC: "AVIATORY 452, ADVISE TYPE OF TRANSPONDER CAPABILITY."
PILOT: "AVIATORY 452, TRANSPONDER CHARLIE."
El ATC pregunta qué capacidad tiene su transpondedor.

Instrucciones de la lista del Doc 9432 6.5.1 cuya forma inglesa no está en el texto cargado (solo la española):

| Inglés (VERIFICAR) | Español cargado (Doc 9432 6.5.1) | Qué hace el piloto |
|---|---|---|
| SQUAWK STANDBY | TRANSPONDEDOR A ESPERA | Selecciona STBY |
| SQUAWK CHARLIE | TRANSPONDEDOR CHARLIE | Activa el reporte de altitud |
| STOP SQUAWK CHARLIE WRONG INDICATION | INTERRUMPA TRANSPONDEDOR CHARLIE INDICACIÓN ERRÓNEA | Apaga el reporte de altitud defectuoso |
| SQUAWK MAYDAY | TRANSPONDEDOR MAYDAY | Selecciona el código de emergencia |
| RESET MODE S IDENTIFICATION | REACTIVE IDENTIFICACIÓN CON MODO S | Vuelve a cargar la identificación Modo S |
| CONFIRM (level) | VERIFIQUE NIVEL | Confirma su nivel (el ATC comprueba el Modo C) |

### Aplicación en aerolínea
El código llega casi siempre en la autorización de ruta («… SQUAWK 5501», Doc 9432 2.8.3.5) y se coloca antes del rodaje. En la transferencia a otra dependencia el ATC puede asignar un código nuevo: se colaciona y se cambia en el momento. En cabina, quien selecciona el código lo dice en voz alta y el otro piloto lo verifica en el panel; el reparto de tareas lo fija el SOP del explotador. Si el Modo S identifica la aeronave con un distintivo distinto al del plan de vuelo, el ATC lo ve y puede pedirle reactivar la identificación.

### Error frecuente
- Colacionar un código y seleccionar otro (por ejemplo 4321 colacionado y 4231 en el panel). El readback correcto no sirve si nadie verifica el panel.
- Decir «ident» por radio sin oprimir el botón.
- Pasar por 7700 o 7500 al girar perillas.
- Dejar el transpondedor en STBY después del pushback: el ATC y el ACAS de otros aviones pierden la altitud de presión.
- Contestar «CONFIRM SQUAWK» con el código que le dieron en lugar del que tiene seleccionado.

### En pocas palabras
- El código SSR siempre se colaciona, dígito por dígito.
- IDENT se oprime; no se dice.
- 7700 emergencia, 7600 falla de comunicaciones, 7500 interferencia ilícita.
- Si ya tiene código asignado y contacto con el ATC, en emergencia normalmente lo conserva (VERIFICAR).
- Quien colaciona y quien verifica el panel pueden ser personas distintas: las dos cosas se hacen.

FUENTES
- Verificado: Doc 4444 (15.ª ed., Enm. 4) cap. 1, definiciones «Radar secundario de vigilancia (SSR)» y «Modo (SSR)»; 4.5.7.5.1 c). Doc 9432 (4.ª ed.) 2.4 (códigos del transpondedor), 2.8.3.5 c), 6.5.1 (lista de instrucciones SSR, en español), 6.5.2 (ejemplos SQUAWK, CONFIRM SQUAWK, SQUAWKING, RESET SQUAWK, CHECK ALTIMETER SETTING AND CONFIRM LEVEL, CONFIRM TRANSPONDER OPERATING, TRANSPONDER UNSERVICEABLE, ADVISE TYPE OF TRANSPONDER CAPABILITY), 6.6 (SQUAWK IDENT; nota: código 7600).
- VERIFICAR: forma inglesa de SQUAWK STANDBY, SQUAWK CHARLIE, STOP SQUAWK CHARLIE WRONG INDICATION, SQUAWK MAYDAY, RESET MODE S IDENTIFICATION y CONFIRM (level) contra Doc 4444 cap. 12 (fraseología SSR/ADS-B) y la versión inglesa del Doc 9432 6.5.1 (no cargados).
- VERIFICAR: 7700 = emergencia y 7500 = interferencia ilícita contra Anexo 10 Vol. IV y Doc 4444 cap. 15 / Doc 8168 Vol. I (no cargados).
- VERIFICAR: regla de conservar el código asignado en emergencia cuando hay contacto con el ATC, contra Doc 8168 Vol. I (procedimientos de utilización del transpondedor) y Doc 4444 cap. 15 (no cargados).
- VERIFICAR: precaución de no pasar por códigos especiales al cambiar de código, contra Doc 8168 Vol. I (no cargado).

---

## 32. RADIO COMMUNICATION FAILURE

### ¿Qué es?
Pérdida de la comunicación oral en ambos sentidos con el ATC. Puede ser:
- **Falla de recepción**: usted transmite, pero no escucha.
- **Falla de transmisión**: usted escucha, pero el ATC no lo recibe.
- **Falla total**: ni transmite ni recibe.

La mayoría de las «fallas» en línea aérea no son del equipo: son una frecuencia mal seleccionada, un volumen abajo, un panel de audio mal configurado o una transferencia que no se completó. Por eso el primer paso es revisar la cabina, no aplicar el procedimiento.

### Lo que debe saber un piloto
**Primero, lo que usted controla (lista de revisión, no norma):**
1. Aviate: el avión sigue volando con la última autorización. La falla de comunicaciones no justifica dejar de volar el avión.
2. Frecuencia: ¿está la que le dieron? ¿La colacionó bien? ¿Cambió la radio activa y no la de reserva?
3. Panel de audio: selector de transmisión en la radio correcta, recepción abierta, volumen, squelch.
4. Audífonos, micrófono, PTT. Pruebe el otro puesto o la otra radio.
5. **Vuelva a la frecuencia anterior** y pida la correcta.
6. Pruebe otra dependencia ATS de la ruta o una frecuencia apropiada para la ruta.
7. Pida a otra aeronave que retransmita (relay).
8. 121,5 MHz (ver cap. 33).
9. Si la aeronave tiene CPDLC y está conectado, el enlace de datos puede seguir funcionando: úselo según los procedimientos de ese espacio aéreo.
10. Transpondedor 7600 cuando la falla se confirma (Doc 9432 6.6, nota).

**Lo que el ATC hace desde tierra (esto sí está cargado).** Si el controlador sospecha que usted recibe pero no transmite, le pide una acción visible en el radar: un viraje o un IDENT (Doc 9432 6.6). Si usted escucha «REPLY NOT RECEIVED IF YOU READ…», su transmisor falló o no llega: haga exactamente lo que pide.

**Si usted sospecha que su receptor falló.** Siga transmitiendo sus notificaciones a la hora prevista, en la frecuencia en uso, anunciando que transmite a ciegas por falla de receptor y repitiendo el mensaje completo (VERIFICAR). El Doc 9432 define «transmisión a ciegas»: la que se hace cuando no puede establecerse comunicación en ambos sentidos, pero se cree que la estación llamada puede recibir.

**ICAO PROCEDURE: qué hace una aeronave IFR que sigue sin comunicaciones.**
Lo que sigue es la estructura del procedimiento OACI (Anexo 2, 3.6.5.2). Se presenta de forma conceptual y **todo el bloque va con VERIFICAR**: tiempos y condiciones exactos se toman del Anexo 2 vigente, no de este texto.

- En condiciones meteorológicas de vuelo visual: continuar en VMC, aterrizar en el aeródromo adecuado más próximo y notificar la llegada por el medio más rápido.
- En IMC, o si no puede seguir en VMC:
  - Mantener la última velocidad y el último nivel asignados (o la altitud mínima de vuelo si es mayor) durante un tiempo fijado. El Anexo 2 distingue dos casos: con sistema de vigilancia ATS (7 minutos, contados desde el último de estos momentos: alcanzar el nivel asignado, poner 7600 o no notificar un punto de notificación obligatoria) y sin él (20 minutos desde que no notifica un punto de notificación obligatoria). Después, ajustar nivel y velocidad al plan de vuelo presentado.
  - Si estaba bajo guía vectorial o con desplazamiento lateral sin límite especificado: regresar a la ruta del plan de vuelo a más tardar en el siguiente punto significativo, respetando la altitud mínima.
  - Continuar según la ruta del plan de vuelo hasta la ayuda o fijo que sirve al aeródromo de destino y, si hace falta, esperar allí.
  - Iniciar el descenso a la hora prevista de aproximación (EAT) recibida y acusada, o, si no tiene EAT, a la hora prevista de llegada del plan de vuelo.
  - Completar un procedimiento de aproximación por instrumentos normal y aterrizar, si es posible, dentro de los 30 minutos siguientes a esa hora.

**PROCEDIMIENTO NACIONAL: no es lo mismo.**
Los Estados publican sus propios procedimientos o diferencias con la OACI, a veces por aeropuerto (en SID, STAR o cartas de aproximación) y a veces para todo el territorio. Estados Unidos, por ejemplo, tiene su propia regla de falla de comunicaciones IFR (14 CFR 91.185), que no coincide con el texto OACI (VERIFICAR). **En Colombia: consultar el AIP (ENR y GEN 1.7, diferencias con la OACI) y el RAC 91.** Lo que manda en vuelo es la regla del Estado cuyo espacio aéreo usted ocupa, más lo que publique la carta del procedimiento que está volando.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-32-01 · Diagrama · 4:5 · 1080×1350
IMAGEN SUGERIDA:
Diagrama de flujo vertical, pensado para el celular. Inicio: «Sin respuesta del ATC». Bloque 1: «Aviate: mantener la última autorización». Bloque 2 (revisión de cabina): frecuencia activa / panel de audio y volumen / otra radio y otro puesto / frecuencia anterior. Decisión: «¿Recuperó contacto?» Sí: «Pedir frecuencia correcta y seguir». No: bloque 3: «Otra dependencia ATS / relay de otra aeronave / 121,5 / CPDLC si está conectado». Decisión: «¿Recuperó contacto?» No: bloque 4: «7600» y bloque 5 dividido en dos columnas con rótulo visible: «ICAO PROCEDURE (Anexo 2)» y «PROCEDIMIENTO NACIONAL (AIP del Estado)», con una flecha que dice «manda el del espacio aéreo en que vuela». Un recuadro aparte: «Si escucha "IF YOU READ…": haga lo que piden (viraje o IDENT)».
OBJETIVO:
Que el piloto vea que la mayoría de las fallas se resuelven en la cabina antes de llegar al procedimiento, y que el procedimiento final depende del Estado.

### Fraseología OACI

ATC: "AVIATORY 452, REPLY NOT RECEIVED. IF YOU READ BOGOTA CONTROL, TURN LEFT HEADING 040."
PILOT: (vira a la izquierda rumbo 040, sin poder responder)
ATC: "AVIATORY 452, TURN OBSERVED. POSITION 5 MILES SOUTH OF TOLMA. WILL CONTINUE RADAR CONTROL."
El ATC sospecha que usted recibe pero no transmite. Usa el viraje como respuesta. Usted sigue escuchando y cumpliendo.

ATC: "AVIATORY 452, REPLY NOT RECEIVED. IF YOU READ BOGOTA CONTROL, SQUAWK IDENT."
PILOT: (oprime IDENT)
ATC: "AVIATORY 452, SQUAWK OBSERVED. WILL CONTINUE RADAR CONTROL."
Igual que el anterior, con IDENT en lugar de viraje.

PILOT: "BOGOTA CONTROL, AVIATORY 452, RADIO CHECK 128.7."
ATC: "AVIATORY 452, BOGOTA CONTROL, READING YOU THREE."
Prueba de radio con la escala de inteligibilidad del Doc 9432 (1 ininteligible a 5 perfectamente inteligible). «Tres» es inteligible con dificultad: vale la pena cambiar de radio.

PILOT: "BOGOTA CONTROL, AVIATORY 452, HOW DO YOU READ?"
ATC: "AVIATORY 452, READING YOU FIVE."
Usted duda de su transmisor después de un silencio largo. Una sola llamada corta, no tres seguidas.

PILOT: "AVIATORY 542, AVIATORY 452 ON 128.7, REQUEST RELAY TO BOGOTA CONTROL."
PILOT (otra aeronave): "AVIATORY 452, AVIATORY 542, READING YOU FIVE."
**PLAIN LANGUAGE** para la solicitud de retransmisión (no hay frase estándar cargada). La otra aeronave responde con la escala de inteligibilidad y luego lleva su mensaje al ATC.

PILOT: "TRANSMITTING BLIND DUE TO RECEIVER FAILURE, AVIATORY 452, POSITION GIKOS 1532, FLIGHT LEVEL 330, ESTIMATING TOLMA 1551. I SAY AGAIN, AVIATORY 452, POSITION GIKOS 1532, FLIGHT LEVEL 330, ESTIMATING TOLMA 1551."
Su receptor falló; se transmite a ciegas en la frecuencia en uso y se repite el mensaje completo. VERIFICAR la forma exacta.

### Aplicación en aerolínea
Lo común en línea aérea es la **pérdida de contacto por frecuencia** (prolonged loss of communication): un cambio mal colacionado, una frecuencia de reserva activada por error, un panel de audio mal puesto. Se detecta por el silencio: si la frecuencia está callada más de lo normal para esa zona, alguien en cabina lo dice y se revisa. En operación con CPDLC, el enlace puede seguir funcionando aunque la voz falle, y el ATC también puede buscarlo por ahí. El procedimiento completo de falla (7600, perfil del Anexo 2 o del Estado) se reserva para cuando la revisión de cabina y los otros medios no funcionaron. Cada explotador publica en su manual cómo aplica los procedimientos del Estado.

### Error frecuente
- Aplicar el procedimiento de falla (7600, cambio de nivel según plan de vuelo) cuando el problema era la frecuencia o el volumen.
- Llamar tres o cuatro veces seguidas en la misma frecuencia sin revisar nada: bloquea a otros y no resuelve.
- No volver a la frecuencia anterior, que es la forma más rápida de recuperar contacto.
- Mezclar reglas: aplicar lo que se estudió para un Estado en el espacio aéreo de otro.
- Dejar de escuchar: con falla de transmisor, el ATC sigue dando instrucciones que usted puede cumplir.

### En pocas palabras
- Primero se vuela el avión; luego se revisa la cabina; al final, el procedimiento.
- Frecuencia anterior, otra dependencia, relay, 121,5, CPDLC: en ese orden de sentido común.
- «REPLY NOT RECEIVED IF YOU READ…» significa que el ATC lo escucha a usted mal o nada; haga lo que pide.
- 7600 con la falla confirmada.
- ICAO PROCEDURE (Anexo 2) y PROCEDIMIENTO NACIONAL no son lo mismo; en Colombia, AIP y RAC 91.

FUENTES
- Verificado: Doc 9432 (4.ª ed.) cap. 1 (glosario, «Transmisión a ciegas»); 2.8.4 (prueba de radio y escala de inteligibilidad); 6.6 (REPLY NOT RECEIVED IF YOU READ… TURN / SQUAWK IDENT; TURN OBSERVED; SQUAWK OBSERVED … WILL CONTINUE RADAR CONTROL; nota: código 7600). Doc 4444 (15.ª ed., Enm. 4) cap. 1, definición «Transmisión a ciegas».
- VERIFICAR: procedimiento de falla de comunicaciones IFR (VMC, 7 y 20 minutos, regreso a la ruta, EAT o ETA, 30 minutos) contra Anexo 2, 3.6.5.2 (no cargado), y su aplicación ATC en Doc 4444 cap. 15 (no cargado).
- VERIFICAR: «TRANSMITTING BLIND DUE TO RECEIVER FAILURE» y la repetición completa del mensaje contra Anexo 10 Vol. II cap. 5 y Doc 9432 9.5 (no cargados).
- VERIFICAR: intentos en frecuencia anterior, otra estación de la ruta y otras aeronaves contra Anexo 10 Vol. II cap. 5 (no cargado).
- VERIFICAR: 14 CFR 91.185 como ejemplo de regla nacional distinta; en Colombia, AIP (GEN 1.7 y ENR) y RAC 91.

---

## 33. FRECUENCIA DE EMERGENCIA 121.5 MHz

### ¿Qué es?
121,5 MHz es el canal VHF de emergencia aeronáutico. Existe para que haya una frecuencia común, escuchada por dependencias ATS designadas y por muchas aeronaves, cuando los canales normales no sirven o no están disponibles. El Doc 9432 menciona que dentro del servicio móvil aeronáutico entran las radiobalizas de localización de siniestros que operan en las frecuencias de socorro y de urgencia designadas.

### Lo que debe saber un piloto
**Para qué sirve (según el Anexo 10, VERIFICAR la lista exacta):**
- Dar un canal libre entre una aeronave en socorro o urgencia y una estación en tierra cuando los canales normales están ocupados.
- Comunicación con aeródromos que normalmente no usan los servicios internacionales, en caso de emergencia.
- Canal común entre aeronaves civiles y militares, y con buques, en búsqueda y salvamento.
- Comunicación con una aeronave cuando una falla de equipo le impide usar los canales normales.
- Interceptación: el interceptor intenta comunicarse en 121,5 (Anexo 2, Apéndice 2; VERIFICAR).
- Radiobalizas de emergencia (ELT): las modernas transmiten en 406 MHz y usan 121,5 como señal de localización (VERIFICAR).

**Lo que 121,5 NO es:**
- No es «la frecuencia para cualquier cosa». No se usa para charla, para preguntar la frecuencia del siguiente sector por comodidad ni como canal aire-aire.
- **No es el primer lugar donde se declara una emergencia.** El mensaje de socorro o urgencia va, en principio, en la frecuencia aire-tierra en uso, donde el controlador que ya lo tiene identificado puede actuar (VERIFICAR, Anexo 10 Vol. II cap. 5). 121,5 es la opción cuando esa frecuencia no funciona o usted no tiene contacto.
- No reemplaza la revisión de cabina en una pérdida de comunicaciones (cap. 32).

**Escucha de 121,5.** El Anexo 10 y el Anexo 6 piden que ciertas aeronaves mantengan escucha continua de 121,5 en determinadas zonas o vuelos (por ejemplo, largos trayectos sobre el agua o áreas designadas), en la medida de lo posible (VERIFICAR alcance exacto). Muchas aerolíneas la dejan en la segunda radio durante el crucero; es práctica del explotador, no regla universal. En pilotos de habla inglesa se escucha llamar a esta frecuencia «guard»; es jerga, no fraseología.

**Por qué importa escucharla:** por ahí puede llegarle un llamado del ATC que lo perdió en su frecuencia, una aeronave en problemas que necesita retransmisión o un interceptor.

### Fraseología OACI

ATC (en 121,5): "AVIATORY 452, BOGOTA CONTROL ON 121.5, CONTACT BOGOTA CONTROL 128.7."
PILOT (en 121,5): "128.7, AVIATORY 452."
La instrucción CONTACT es normalizada (Doc 9432 2.8.2.1); la forma de la llamada en 121,5 es **PLAIN LANGUAGE**. El ATC lo perdió en la frecuencia asignada y lo busca por 121,5. Usted responde corto y cambia. No se discute en 121,5 por qué se perdió el contacto.

PILOT (en 121,5): "BOGOTA CONTROL, AVIATORY 452 ON 121.5, UNABLE CONTACT ON 128.7, REQUEST FREQUENCY."
ATC: "AVIATORY 452, CONTACT BOGOTA CONTROL 126.3."
PILOT: "126.3, AVIATORY 452."
**PLAIN LANGUAGE**. Pérdida de contacto que no es emergencia: se usa 121,5 como último recurso, se resuelve en una o dos transmisiones y se sale.

PILOT (en 121,5): "MAYDAY, MAYDAY, MAYDAY, BOGOTA CONTROL, AVIATORY 452, ..."
Solo cuando la frecuencia en uso no le sirve. La estructura del mensaje está en el cap. 34.

PILOT (en 121,5): "AVIATORY 425, AVIATORY 452 ON 121.5, CONFIRM YOU ARE ON THIS FREQUENCY."
**PLAIN LANGUAGE**. Evite usar 121,5 para coordinar entre aeronaves de la misma empresa: cada transmisión que no es necesaria tapa una que sí podría serlo. Este ejemplo está aquí como lo que **no** se hace.

### Aplicación en aerolínea
En crucero, la segunda radio suele quedar en 121,5 (según SOP). Cuando se escucha un llamado ahí, primero se comprueba si es para usted. Si otra aeronave pide ayuda y no tiene contacto con el ATC, usted puede servirle de relay en la frecuencia del ATC. Se escuchan portadoras de ELT activados sin intención: si lo nota, puede informarlo al ATC con el lugar y la hora aproximados (procedimiento local; VERIFICAR).

### Error frecuente
- Declarar primero en 121,5 cuando tenía contacto con el controlador en su frecuencia.
- Usar 121,5 como canal de charla o de coordinación entre compañeros.
- Olvidar que el volumen de la radio en 121,5 está abajo y perder un llamado de interceptación o del ATC.
- Confundir «estar en 121,5» con «haber avisado al ATC»: si nadie responde, nadie lo escuchó.

### En pocas palabras
- 121,5 es el canal VHF de emergencia, con usos definidos por el Anexo 10.
- El mensaje de socorro o urgencia va primero en la frecuencia en uso.
- Sirve también para recuperar contacto, interceptación, búsqueda y salvamento y ELT.
- No es canal aire-aire ni de charla.
- Escúchela cuando la norma o el SOP lo pidan: por ahí pueden estar buscándolo.

FUENTES
- Verificado: Doc 9432 (4.ª ed.) cap. 1, definición «Servicio móvil aeronáutico» (radiobalizas en frecuencias de socorro y urgencia); 2.8.2.1 (CONTACT). Doc 9835 (2.ª ed.) 4.3.4 (el lenguaje común en emergencias, claro y conciso).
- VERIFICAR: usos del canal de emergencia 121,5 MHz contra Anexo 10 Vol. V (asignación de frecuencias; canal de emergencia) y Vol. II cap. 5 (no cargados).
- VERIFICAR: que el mensaje de socorro o urgencia se transmita en principio en la frecuencia en uso, contra Anexo 10 Vol. II cap. 5 (no cargado).
- VERIFICAR: requisitos de escucha de 121,5 contra Anexo 10 Vol. II cap. 5 y Anexo 6 Parte I (no cargados).
- VERIFICAR: comunicación con interceptores en 121,5 contra Anexo 2, Apéndice 2 (no cargado); ELT 406 / 121,5 contra Anexo 10 Vol. III y Anexo 6 (no cargados).
- VERIFICAR: cómo notificar una señal de ELT escuchada, según AIP de cada Estado.

---

## 34. DISTRESS / MAYDAY

### ¿Qué es?
**Socorro** (distress) es la condición de estar amenazado por un peligro grave o inminente y necesitar ayuda inmediata (VERIFICAR la redacción exacta, Anexo 10 Vol. II cap. 5). La señal radiotelefónica es **MAYDAY**, dicha preferiblemente tres veces al comienzo del primer mensaje. Una llamada de socorro tiene prioridad absoluta sobre cualquier otra comunicación.

No confundir con las **fases de emergencia** del Doc 4444 (incertidumbre, alerta, peligro). Esas fases las declara el ATS para activar el servicio de alerta y búsqueda y salvamento. La «fase de peligro» se define como la situación en que hay motivos justificados para creer que la aeronave y sus ocupantes están amenazados por un peligro grave e inminente y necesitan auxilio inmediato. Se parece a la definición de socorro, pero no es lo que el piloto dice por radio: es la clasificación que hace el sistema.

### Lo que debe saber un piloto
**Contenido del mensaje de socorro** (orden según Anexo 10 Vol. II y Doc 9432 cap. 9; VERIFICAR):
1. MAYDAY, MAYDAY, MAYDAY.
2. Estación a la que se dirige (cuando el tiempo y las circunstancias lo permitan).
3. Identificación de la aeronave.
4. Naturaleza de la condición de socorro.
5. Intenciones del piloto al mando.
6. Posición actual, nivel y rumbo.
7. Cualquier otra información útil.

Reglas que acompañan esa secuencia (VERIFICAR):
- Se transmite en la frecuencia en uso, con el controlador que ya lo tiene.
- Es una guía, no un formulario: si no tiene tiempo, diga lo esencial (MAYDAY, quién es, qué pasa) y complete después.
- El transpondedor puede ir a 7700 (cap. 31, con su precaución).
- El ATC puede imponer silencio a las demás estaciones y, al terminar, anunciar que el tráfico de socorro ha terminado.

**Aviate, navigate, communicate.** El mensaje de socorro no va antes de controlar el avión. En una despresurización, primero máscaras y descenso; la llamada viene cuando la cabina lo permite.

**MAYDAY no es un castigo ni un trámite.** Declarar socorro da prioridad y moviliza ayuda. Si la situación mejora, se puede cancelar. Pero tampoco se usa para cualquier falla (ver cap. 35 y 36).

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-34-01 · Esquema · 4:5 · 1080×1350
IMAGEN SUGERIDA:
Tarjeta vertical tipo «ficha de bolsillo» con los siete elementos del mensaje de socorro, numerados, cada uno con un ícono simple (radio, avión, advertencia, flecha, mapa con nivel y rumbo, signo más). Debajo, el ejemplo de la despresurización de este capítulo con cada parte subrayada en el color del elemento que le corresponde. Rótulo en la esquina: «VERIFICAR contra Anexo 10 Vol. II cap. 5 antes de publicar».
OBJETIVO:
Que el piloto memorice el orden del mensaje y lo reconozca en un ejemplo real de cabina.

### Fraseología OACI

PILOT: "MAYDAY, MAYDAY, MAYDAY, BOGOTA CONTROL, AVIATORY 452, RAPID DECOMPRESSION, EMERGENCY DESCENT TO FLIGHT LEVEL 100, POSITION 20 MILES NORTH OF GIKOS, PASSING FLIGHT LEVEL 330, HEADING 180."
ATC: "AVIATORY 452, ROGER MAYDAY."
Socorro por despresurización. Naturaleza, intención (descenso de emergencia a FL 100), posición, nivel y rumbo. El ATC acusa recibo y luego despeja el espacio debajo.

PILOT: "MAYDAY, MAYDAY, MAYDAY, BOGOTA APPROACH, AVIATORY 452, ENGINE FIRE LEFT ENGINE, REQUEST IMMEDIATE RETURN RUNWAY 13, 15 MILES SOUTH, CLIMBING THROUGH 9000 FEET, HEADING 160."
ATC: "AVIATORY 452, ROGER MAYDAY, TURN LEFT HEADING 340, DESCEND TO 8000 FEET, QNH 1026."
PILOT: "LEFT HEADING 340, DESCENDING 8000 FEET, QNH 1026, AVIATORY 452."
Fuego de motor después del despegue. Aun en socorro, las instrucciones de rumbo, nivel y reglaje se colacionan.

ATC: "AVIATORY 452, SQUAWK MAYDAY."
PILOT: "SQUAWKING 7700, AVIATORY 452."
El ATC pide el código de emergencia (instrucción de Doc 9432 6.5.1; forma inglesa VERIFICAR). Normalmente el ATC ya sabe de la emergencia si usted está en contacto.

ATC: "ALL STATIONS, BOGOTA CONTROL, STOP TRANSMITTING, MAYDAY."
Imposición de silencio: nadie transmite en esa frecuencia salvo la aeronave en socorro y el ATC, hasta que se anuncie el fin. VERIFICAR la forma exacta.

PILOT: "BOGOTA CONTROL, AVIATORY 452, FLIGHT LEVEL 100, CABIN ALTITUDE UNDER CONTROL, NO INJURIES REPORTED, REQUEST DIVERSION TO BOGOTA, 1 HOUR 10 MINUTES FUEL."
**PLAIN LANGUAGE**. Después del primer mensaje se completa «cualquier otra información útil»: estado, personas, combustible en tiempo, lo que necesita.

ATC: "AVIATORY 452, REPORT PERSONS ON BOARD AND FUEL ENDURANCE."
PILOT: "AVIATORY 452, 146 PERSONS ON BOARD, ENDURANCE 1 HOUR 10 MINUTES."
**PLAIN LANGUAGE** (la forma de esta pregunta varía por Estado y controlador). Número de personas y autonomía en tiempo, no en kilos.

ATC: "ALL STATIONS, BOGOTA CONTROL, DISTRESS TRAFFIC ENDED."
Fin del tráfico de socorro y del silencio. VERIFICAR la forma exacta.

### Aplicación en aerolínea
En línea aérea, la llamada la hace normalmente el piloto que no vuela (PM) cuando el PF tiene el avión y la lista de verificación está en marcha; el reparto exacto lo fija el SOP. Se declara MAYDAY en situaciones como fuego que no se extingue, humo que no se controla, despresurización, pérdida de varios sistemas críticos o combustible por debajo de la reserva final (cap. 37). La información se da en capas: primero lo esencial, después lo demás cuando la cabina está estable. El explotador suele definir qué situaciones son MAYDAY en sus listas; esas decisiones se entrenan en simulador.

### Error frecuente
- Hacer la llamada antes de estabilizar el avión.
- Mensaje de socorro largo y desordenado: el controlador tiene que buscar la naturaleza del problema entre frases (Doc 9835 3.4.14 muestra ese problema con un mensaje de «poco combustible»).
- Omitir la intención: el ATC no sabe si regresa, desvía o sigue.
- Decir «emergency» sin MAYDAY ni PAN PAN: el controlador puede no saber el grado de prioridad (VERIFICAR la aceptación de «declare emergency» sin señal en cada Estado).
- Dejar de colacionar rumbos y niveles por estar en emergencia.

### En pocas palabras
- MAYDAY = peligro grave o inminente y necesidad de ayuda inmediata.
- Tres veces MAYDAY, estación, distintivo, naturaleza, intención, posición/nivel/rumbo, lo demás.
- Primero se vuela el avión; la llamada viene después.
- Frecuencia en uso primero; 121,5 si no hay contacto.
- En socorro también se colaciona lo crítico.

FUENTES
- Verificado: Doc 4444 (15.ª ed., Enm. 4) cap. 1, definiciones «Fase de emergencia», «Fase de incertidumbre», «Fase de alerta», «Fase de peligro», «Servicio de alerta». Doc 9432 (4.ª ed.) 6.5.1 («TRANSPONDEDOR MAYDAY: seleccione código de emergencia», en español); 2.8.1.8 (repetir elementos importantes cuando la recepción es difícil). Doc 9835 (2.ª ed.) 3.3.13, 3.4.14, 4.3.4.
- VERIFICAR: definición de socorro y de urgencia, señal MAYDAY dicha tres veces y orden del mensaje (estación, identificación, naturaleza, intenciones, posición/nivel/rumbo, otra información) contra Anexo 10 Vol. II cap. 5 y Doc 9432 9.2.1 (no cargados).
- VERIFICAR: «ROGER MAYDAY», «STOP TRANSMITTING, MAYDAY» y «DISTRESS TRAFFIC ENDED» contra Doc 9432 9.2.2 y 9.2.3 y Anexo 10 Vol. II cap. 5 (no cargados).
- VERIFICAR: «SQUAWK MAYDAY» en inglés contra Doc 4444 cap. 12 (no cargado).
- VERIFICAR: fraseología de descenso de emergencia contra Doc 9432 9.4 y Doc 4444 cap. 15 (no cargados).

---

## 35. URGENCY / PAN PAN

### ¿Qué es?
**Urgencia** es una condición que afecta la seguridad de la aeronave o de alguien a bordo o a la vista, pero que **no requiere ayuda inmediata** (VERIFICAR la redacción exacta, Anexo 10 Vol. II cap. 5). La señal es **PAN PAN**, dicha preferiblemente tres veces. Tiene prioridad sobre todo el tráfico, excepto el de socorro.

### Lo que debe saber un piloto
**Contenido del mensaje de urgencia** (VERIFICAR): igual al de socorro, cambiando la señal y la naturaleza:
1. PAN PAN, PAN PAN, PAN PAN.
2. Estación a la que se dirige.
3. Identificación de la aeronave.
4. Naturaleza de la condición de urgencia.
5. Intenciones del piloto al mando.
6. Posición actual, nivel y rumbo.
7. Cualquier otra información útil.

**Cuándo suele encajar PAN PAN (escenarios de práctica, no lista oficial):**
- Pasajero con una emergencia médica que obliga a desviar, sin amenaza para el vuelo.
- Falla técnica que degrada el avión y pide prioridad, pero el avión sigue controlable y con margen (por ejemplo, una falla hidráulica con sistemas de respaldo funcionando).
- Tripulante incapacitado, cuando el vuelo sigue controlado.
- Una situación que puede empeorar y en la que usted quiere que el ATC esté prevenido.

**Cuándo NO hace falta ninguna de las dos señales:**
Muchas fallas no requieren declarar nada: una falla de un sistema redundante, un generador perdido con los demás funcionando, una indicación que la lista resuelve. Se informa en lenguaje claro si afecta la operación (Doc 4444 5.2.2 pide notificar sin demora cuando una falla degrada la performance por debajo de lo requerido en ese espacio aéreo) y se pide lo que haga falta. **No se convierte automáticamente cada falla en PAN PAN o MAYDAY.**

**PAN PAN MEDICAL no es «pasajero enfermo».** Esa variante se reserva para transportes sanitarios protegidos por los Convenios de Ginebra (VERIFICAR). Para un pasajero enfermo se usa PAN PAN, o ni siquiera eso si no necesita prioridad.

### Fraseología OACI

PILOT: "PAN PAN, PAN PAN, PAN PAN, BOGOTA CONTROL, AVIATORY 452, MEDICAL EMERGENCY ON BOARD, PASSENGER WITH SUSPECTED HEART ATTACK, REQUEST DIVERSION TO BOGOTA, POSITION TOLMA, FLIGHT LEVEL 350, HEADING 020."
ATC: "AVIATORY 452, ROGER PAN PAN. CLEARED DIRECT BOGOTA, DESCEND TO FLIGHT LEVEL 200."
PILOT: "DIRECT BOGOTA, DESCENDING FLIGHT LEVEL 200, AVIATORY 452."
Urgencia médica. El avión no está en peligro; un pasajero sí, y necesita prioridad. VERIFICAR «ROGER PAN PAN».

PILOT: "PAN PAN, PAN PAN, PAN PAN, BOGOTA APPROACH, AVIATORY 452, HYDRAULIC SYSTEM FAILURE, REQUEST HOLDING TO COMPLETE CHECKLIST, THEN ILS RUNWAY 13, POSITION 25 MILES EAST, 12000 FEET, HEADING 270."
ATC: "AVIATORY 452, ROGER. HOLD AT GIKOS AS PUBLISHED, MAINTAIN 12000 FEET, ADVISE WHEN READY FOR APPROACH."
Falla técnica con avión controlable: se pide espacio y tiempo, no una aproximación inmediata. La parte del ATC tiene elementos **PLAIN LANGUAGE** («advise when ready»).

PILOT: "BOGOTA CONTROL, AVIATORY 452, WE HAVE LOST ONE GENERATOR, NO IMPACT ON OUR OPERATION, FOR YOUR INFORMATION."
ATC: "AVIATORY 452, ROGER."
**PLAIN LANGUAGE**. Falla sin urgencia: se informa porque puede ser útil, sin declarar nada.

ATC: "AVIATORY 452, DO YOU REQUIRE ANY ASSISTANCE?"
PILOT: "NEGATIVE, AVIATORY 452. WE WILL ADVISE."
**PLAIN LANGUAGE**. El ATC pregunta si necesita ayuda; usted contesta con verdad y deja abierta la puerta.

PILOT: "BOGOTA APPROACH, AVIATORY 452, SITUATION DETERIORATING, MAYDAY, MAYDAY, MAYDAY, AVIATORY 452, SMOKE IN THE CABIN NOT CONTROLLED, REQUEST IMMEDIATE LANDING RUNWAY 13."
Una urgencia que empeora se eleva a socorro con la señal completa. No hace falta «cancelar» la urgencia antes.

PILOT: "BOGOTA APPROACH, AVIATORY 452, PASSENGER CONDITION STABLE, NO LONGER REQUIRE PRIORITY."
**PLAIN LANGUAGE**. Si la situación se resuelve, se informa para que el ATC libere la prioridad. VERIFICAR si existe forma estándar de cancelar la urgencia.

### Aplicación en aerolínea
PAN PAN es la llamada más común en línea aérea para emergencias médicas que llevan a desviar. También se usa cuando una falla técnica da un avión controlable pero con limitaciones que el ATC debe conocer (distancia de aterrizaje mayor, menos maniobrabilidad, pista específica). En ambos casos lo que el ATC necesita es: qué pasa, qué quiere hacer y qué necesita de él. Si la situación no pide prioridad, se informa en lenguaje claro. Cada explotador fija en su manual cuándo se declara y quién lo hace.

### Error frecuente
- Declarar MAYDAY por un pasajero enfermo con el avión sin problemas: moviliza recursos que no hacen falta y no mejora su atención.
- No declarar nada cuando sí necesitaba prioridad, y quedar en secuencia normal con un pasajero grave.
- Usar «PAN PAN MEDICAL» para un pasajero enfermo.
- Anunciar «pan pan» una sola vez y en medio de la frase: el controlador puede no escucharlo.
- Mezclar el problema con la historia: el controlador necesita naturaleza, intención y necesidad, no el relato completo.

### En pocas palabras
- PAN PAN = urgencia: la seguridad está afectada, pero no se necesita ayuda inmediata.
- Mismo orden de mensaje que el socorro.
- Emergencia médica que obliga a desviar: el caso más común.
- No toda falla es PAN PAN; muchas se informan en lenguaje claro.
- Si empeora, se eleva a MAYDAY.

FUENTES
- Verificado: Doc 4444 (15.ª ed., Enm. 4) 5.2.2 (deterioro de la performance: la tripulación notifica sin demora). Doc 9835 (2.ª ed.) 3.3.13 (problema técnico, pasajero indispuesto como casos de lenguaje común), 4.3.4.
- VERIFICAR: definición de urgencia, señal PAN PAN dicha tres veces, prioridad y orden del mensaje contra Anexo 10 Vol. II cap. 5 y Doc 9432 9.3 (no cargados).
- VERIFICAR: «ROGER PAN PAN» y forma de cancelar la urgencia contra Doc 9432 9.3 (no cargado).
- VERIFICAR: uso de «PAN PAN MEDICAL» reservado a transportes sanitarios, contra Anexo 10 Vol. II cap. 5 (no cargado).
- VERIFICAR: «HOLD AT (fix) AS PUBLISHED» contra Doc 4444 cap. 12 (espera) (no cargado; ver Nivel 4, cap. 28).

---

## 36. MAYDAY VS PAN PAN

### ¿Qué es?
Una comparación para decidir rápido. La diferencia no está en qué sistema falló, sino en **si usted necesita ayuda inmediata**.

### Lo que debe saber un piloto

| | MAYDAY (socorro) | PAN PAN (urgencia) |
|---|---|---|
| Condición | Peligro grave o inminente; necesita ayuda inmediata | Seguridad afectada; no necesita ayuda inmediata |
| Prioridad | Sobre todo el tráfico | Sobre todo, excepto socorro |
| Señal | MAYDAY, tres veces | PAN PAN, tres veces |
| Mensaje | Estación, distintivo, naturaleza, intenciones, posición/nivel/rumbo, otra información | El mismo orden |
| Transpondedor | 7700 posible (con la precaución del cap. 31) | 7700 posible según el caso y lo que pida el ATC |
| Silencio de frecuencia | El ATC puede imponerlo | No es lo habitual |
| Ejemplos de práctica | Fuego no extinguido, humo no controlado, despresurización, combustible bajo la reserva final | Emergencia médica, falla técnica con avión controlable, situación que puede empeorar |

(Todas las filas: VERIFICAR contra Anexo 10 Vol. II cap. 5.)

**Tres preguntas para decidir:**
1. ¿Hay peligro grave o inminente para el avión o sus ocupantes y necesito ayuda ya? MAYDAY.
2. ¿La seguridad está afectada y necesito prioridad, pero no ayuda inmediata? PAN PAN.
3. ¿El avión sigue normal y solo debo informar? Lenguaje claro, sin señal.

**La escala se puede subir y bajar.** Una urgencia puede volverse socorro; un socorro controlado se puede reducir. Lo importante es que el ATC sepa en qué nivel está usted en cada momento.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-36-01 · Diagrama · 16:9 · 1600×900
IMAGEN SUGERIDA:
Escala horizontal de tres escalones: NORMAL (informar en lenguaje claro) → URGENCIA (PAN PAN) → SOCORRO (MAYDAY). Colores neutros del módulo: el ámbar y el rojo solo como semántica en los dos últimos escalones, con poca saturación. Bajo cada escalón, una pregunta corta («¿Solo informar?», «¿Necesito prioridad?», «¿Necesito ayuda inmediata?») y dos ejemplos de práctica. Flechas en ambos sentidos entre escalones con el rótulo «la situación puede subir o bajar».
OBJETIVO:
Que el piloto ubique una situación en la escala por la necesidad de ayuda, no por el nombre del sistema que falló.

### Fraseología OACI

Escenario de práctica 1: pasajero inconsciente, avión normal.
PILOT: "PAN PAN, PAN PAN, PAN PAN, BOGOTA CONTROL, AVIATORY 452, MEDICAL EMERGENCY, UNCONSCIOUS PASSENGER, REQUEST DIVERSION TO CALI, POSITION GIKOS, FLIGHT LEVEL 360, HEADING 210."
Urgencia: no hay peligro para el avión.

Escenario de práctica 2: humo en cabina que no se controla.
PILOT: "MAYDAY, MAYDAY, MAYDAY, BOGOTA CONTROL, AVIATORY 452, SMOKE IN THE CABIN, UNABLE TO CONTROL, REQUEST IMMEDIATE DESCENT AND LANDING NEAREST SUITABLE AIRPORT, POSITION 30 MILES SOUTH OF TOLMA, FLIGHT LEVEL 340, HEADING 190."
Socorro: amenaza inmediata al avión.

Escenario de práctica 3: un piloto automático inoperativo, otro funcionando.
PILOT: "BOGOTA CONTROL, AVIATORY 452, AUTOPILOT 1 INOPERATIVE, AUTOPILOT 2 AVAILABLE, NO ASSISTANCE REQUIRED."
**PLAIN LANGUAGE**. Ninguna señal: se informa porque puede afectar ciertas operaciones (por ejemplo, RVSM; ver cap. 39).

Escenario de práctica 4: falla de motor en crucero en un bimotor.
PILOT: "MAYDAY, MAYDAY, MAYDAY, BOGOTA CONTROL, AVIATORY 452, ENGINE FAILURE, UNABLE TO MAINTAIN FLIGHT LEVEL 370, DESCENDING TO FLIGHT LEVEL 250, REQUEST DIVERSION TO BOGOTA, POSITION GIKOS, HEADING 040."
Varios explotadores clasifican la falla de motor en bimotor como socorro; otros usan urgencia según el caso. Lo decide el SOP y el comandante. Lo que no cambia es que el ATC debe saber que usted no puede mantener el nivel y qué va a hacer.

ATC: "AVIATORY 452, CONFIRM YOU ARE DECLARING AN EMERGENCY?"
PILOT: "AFFIRM, MAYDAY, AVIATORY 452."
**PLAIN LANGUAGE** del ATC. Si su mensaje no dejó claro el nivel, el controlador preguntará. Conteste con la señal.

### Aplicación en aerolínea
La decisión la toma el comandante con apoyo de las listas y del SOP. En entrevista de aerolínea suele preguntarse con casos: «pasajero enfermo», «humo», «falla de motor», «falla hidráulica». La respuesta que se espera no es solo «MAYDAY» o «PAN PAN», sino el criterio: necesidad de ayuda inmediata, prioridad o solo información.

### Error frecuente
- Elegir la señal por el nombre del problema («motor = MAYDAY siempre») sin pensar en la necesidad.
- Subestimar: decir «minor problem» cuando la situación pide prioridad.
- Sobrestimar sin necesidad y saturar la frecuencia.
- No actualizar al ATC cuando la situación cambia de nivel.

### En pocas palabras
- La diferencia es la necesidad de ayuda inmediata.
- Mismo orden de mensaje para ambas.
- Informar sin señal es válido cuando no hay urgencia.
- La situación puede subir o bajar de nivel; el ATC debe saberlo.
- El criterio final es del comandante, según SOP.

FUENTES
- Verificado: Doc 4444 (15.ª ed., Enm. 4) cap. 1, definición «Fase de peligro» (como contraste de la clasificación ATS); 5.2.2. Doc 9432 (4.ª ed.) 2.6 (AFFIRM, UNABLE).
- VERIFICAR: todas las filas de la tabla comparativa (definiciones, prioridades, señal, mensaje, silencio) contra Anexo 10 Vol. II cap. 5 y Doc 9432 cap. 9 (no cargados).
- VERIFICAR: que la clasificación de la falla de motor dependa del explotador, contra el manual de operaciones del explotador (no es norma OACI).

---

## 37. MINIMUM FUEL Y EMERGENCIA DE COMBUSTIBLE

### ¿Qué es?
Dos comunicaciones distintas sobre combustible. Este capítulo trata solo cómo se comunican; el cálculo y la gestión del combustible están en otro módulo.

- **MINIMUM FUEL.** El Doc 4444 (15.ª ed., Enm. 4) lo define como «situación en que el combustible restante de la aeronave es tal que el vuelo debe aterrizar en un aeródromo específico y no puede aceptarse ninguna demora adicional».
- **MAYDAY FUEL.** Declaración de socorro por combustible.

La Enmienda 4 de la 15.ª edición del Doc 4444 (aplicable desde el 15 de noviembre de 2012) armonizó la fraseología y los procedimientos ATC de combustible con el Anexo 6 (Tabla A del preámbulo). Por eso lo que aprendió antes de 2012 puede estar desactualizado.

### Lo que debe saber un piloto
**Qué comunica MINIMUM FUEL:**
- Que usted está comprometido a aterrizar en un aeródromo específico.
- Que cualquier demora adicional puede llevarlo a aterrizar con menos de la reserva final.
- Según el Anexo 6, se informa cuando un cambio en la autorización vigente puede hacer que aterrice con menos que la reserva final de combustible prevista (VERIFICAR).

**Qué NO significa MINIMUM FUEL:**
- **No es una emergencia** ni da prioridad automática. Es un aviso de que una emergencia es posible si hay más demora (VERIFICAR la nota a la definición en la edición vigente del Doc 4444).
- No se usa para «combustible más bajo de lo que me gustaría».

**Cuándo evoluciona a emergencia:**
Según el Anexo 6, el piloto al mando declara emergencia de combustible cuando el combustible utilizable que calcula tener al aterrizar en el aeródromo más cercano donde puede aterrizar con seguridad es menor que la reserva final prevista (VERIFICAR). Se dice **MAYDAY, MAYDAY, MAYDAY, FUEL**.

**Lo que hace el ATC con MINIMUM FUEL (VERIFICAR):** acusa recibo e informa la demora prevista, o que no hay demora. Usted usa esa información para decidir.

### Fraseología OACI

PILOT: "BOGOTA APPROACH, AVIATORY 452, MINIMUM FUEL."
ATC: "AVIATORY 452, ROGER, NO DELAY EXPECTED."
Usted avisa que ya no acepta más demora. El ATC confirma que no se espera ninguna.

PILOT: "BOGOTA APPROACH, AVIATORY 452, MINIMUM FUEL."
ATC: "AVIATORY 452, ROGER, EXPECT 10 MINUTES DELAY."
El ATC informa demora. Usted calcula: si con 10 minutos aterriza por encima de la reserva final, continúa; si no, declara.

ATC: "AVIATORY 452, HOLD AT GIKOS AS PUBLISHED, EXPECT APPROACH CLEARANCE AT 1545."
PILOT: "AVIATORY 452, UNABLE TO ACCEPT DELAY, MINIMUM FUEL."
Usted ya no puede aceptar la espera. UNABLE es palabra normalizada; la combinación con la razón es **PLAIN LANGUAGE**.

PILOT: "MAYDAY, MAYDAY, MAYDAY, FUEL, BOGOTA APPROACH, AVIATORY 452, CALCULATED FUEL AT LANDING BELOW FINAL RESERVE, REQUEST PRIORITY APPROACH RUNWAY 13, POSITION GIKOS, 9000 FEET, HEADING 310."
ATC: "AVIATORY 452, ROGER MAYDAY, CLEARED DIRECT TO ILS RUNWAY 13, DESCEND TO 7000 FEET, QNH 1026."
Emergencia de combustible: señal de socorro con la palabra FUEL, y el mismo orden de mensaje del cap. 34.

ATC: "AVIATORY 452, REPORT FUEL ENDURANCE."
PILOT: "AVIATORY 452, ENDURANCE 35 MINUTES."
**PLAIN LANGUAGE** en la forma. El combustible se da en tiempo: el controlador piensa en minutos, no en kilos ni libras.

### Aplicación en aerolínea
En línea aérea, MINIMUM FUEL aparece con esperas largas, cambios de pista o cierres de aeródromo cerca del destino y alterno. La tripulación ya lleva cálculos de combustible al aterrizaje (en el FMS y a mano); la comunicación con el ATC sale de esos números. Informar con tiempo ayuda al controlador a planificar; no hacerlo lo deja sin información. Varios Estados tienen procedimientos propios (por ejemplo, los Estados Unidos no usan la definición OACI de la misma forma; VERIFICAR). En Colombia: AIP y RAC.

### Error frecuente
- Decir MINIMUM FUEL creyendo que da prioridad y quedarse esperando.
- Declarar MINIMUM FUEL cuando lo que corresponde es MAYDAY FUEL.
- Decir «low fuel», «fuel critical» o «short of fuel»: no son la fraseología; el controlador puede no entender el grado (Doc 9835 3.4.14 muestra un mensaje de «poco combustible» mezclado con otra información).
- Dar combustible en kilos o libras cuando el ATC lo necesita en tiempo.
- Esperar a estar por debajo de la reserva final para decir algo.

### En pocas palabras
- MINIMUM FUEL: comprometido a un aeródromo, sin aceptar más demora. No es emergencia.
- El ATC responde con la demora prevista o «no delay expected».
- MAYDAY, MAYDAY, MAYDAY, FUEL: combustible al aterrizar por debajo de la reserva final.
- Combustible en tiempo, no en masa.
- Desde 2012 la fraseología está armonizada con el Anexo 6.

FUENTES
- Verificado: Doc 4444 (15.ª ed., Enm. 4) cap. 1, definición «Combustible mínimo»; preámbulo, Tabla A, Enmienda 4 de la 15.ª edición (fraseología y procedimientos ATC de combustible armonizados con el Anexo 6; aprobada el 16 de marzo de 2012, aplicable el 15 de noviembre de 2012). Doc 9432 (4.ª ed.) 2.6 (UNABLE). Doc 9835 (2.ª ed.) 3.4.14.
- VERIFICAR: criterios de MINIMUM FUEL y de emergencia de combustible contra Anexo 6 Parte I, sección de gestión del combustible en vuelo (no cargado).
- VERIFICAR: «MAYDAY, MAYDAY, MAYDAY, FUEL» contra Anexo 6 Parte I y Doc 4444 cap. 15 (no cargados).
- VERIFICAR: respuestas ATC «ROGER, NO DELAY EXPECTED» / «EXPECT (delay information)» contra Doc 4444 cap. 12 (no cargado).
- VERIFICAR: nota de la definición («no es una situación de emergencia…») en la edición vigente del Doc 4444 cap. 1.
- VERIFICAR: diferencias de Estados Unidos (FAA) sobre minimum fuel, contra AIM/FAA Order JO 7110.65.
- VERIFICAR: «HOLD AT (fix) AS PUBLISHED, EXPECT APPROACH CLEARANCE AT (time)» contra Doc 4444 cap. 12 (espera) (no cargado; ver Nivel 4, cap. 28).

---

## 38. TCAS/ACAS RA

### ¿Qué es?
El ACAS es un «sistema de aeronave basado en señales de transpondedor del SSR que funciona independientemente del equipo instalado en tierra para proporcionar aviso al piloto sobre posibles conflictos entre aeronaves dotadas de transpondedores SSR» (Doc 4444 cap. 1). TCAS es el nombre del equipo que lo implementa en la mayoría de los aviones de transporte.

Da dos tipos de aviso (VERIFICAR definiciones, Doc 4444 cap. 1 edición vigente y Doc 8168 Vol. I):
- **TA (traffic advisory):** aviso de tránsito. Alerta; no pide maniobra.
- **RA (resolution advisory):** aviso de resolución. Pide una maniobra vertical (o limitarla) para aumentar la separación.

### Lo que debe saber un piloto
- **Con un RA se sigue el RA**, incluso si contradice una instrucción del ATC, y se maniobra con prontitud (VERIFICAR, Doc 8168 Vol. I).
- **No se maniobra con un TA solo.** El TA sirve para buscar el tránsito y prepararse.
- **Se avisa al ATC en cuanto se pueda**, con la fraseología prevista. Primero el avión, luego la radio.
- Mientras usted responde a un RA, el ATC no intenta cambiarle la trayectoria (VERIFICAR, Doc 4444 cap. 15).
- **Al terminar** («clear of conflict»), se regresa con prontitud a la autorización y se le dice al ATC.
- El ACAS depende del transpondedor de los dos aviones: un transpondedor en STBY o sin Modo C deja al otro sin RA (cap. 31).
- La Tabla A del Doc 4444 registra que la 15.ª edición incorporó «procedimientos y fraseología relativos al ACAS». La fraseología exacta está en el cap. 12, que no está cargado.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-38-01 · Diagrama · 16:9 · 1600×900
IMAGEN SUGERIDA:
Vista lateral de dos aeronaves en niveles cercanos con trayectorias convergentes. La de arriba recibe «DESCEND» y la de abajo «CLIMB» (flechas verticales con el texto del RA en mono). Una línea de tiempo abajo con cuatro momentos numerados: 1) TA: buscar tránsito; 2) RA: maniobra; 3) llamada «TCAS RA»; 4) «CLEAR OF CONFLICT, RETURNING TO…» y 5) «CLEAR OF CONFLICT, … RESUMED». Globos de diálogo cortos con el texto de cada llamada.
OBJETIVO:
Que el piloto vea el orden: maniobrar primero, informar después, y los dos avisos distintos al terminar.

### Fraseología OACI

PILOT: "BOGOTA CONTROL, AVIATORY 452, TCAS RA."
ATC: "AVIATORY 452, ROGER."
Usted inició la maniobra por un RA y se aparta de la autorización. El ATC acusa recibo; no le da instrucciones de trayectoria mientras dura el RA.

PILOT: "BOGOTA CONTROL, AVIATORY 452, CLEAR OF CONFLICT, RETURNING TO FLIGHT LEVEL 350."
ATC: "AVIATORY 452, ROGER."
Terminó el RA y está volviendo al nivel autorizado. (El ATC puede, en lugar de ROGER, dar otra instrucción.)

PILOT: "BOGOTA CONTROL, AVIATORY 452, CLEAR OF CONFLICT, FLIGHT LEVEL 350 RESUMED."
ATC: "AVIATORY 452, ROGER."
Ya está de nuevo en la autorización.

ATC: "AVIATORY 452, CLIMB TO FLIGHT LEVEL 360."
PILOT: "AVIATORY 452, UNABLE, TCAS RA."
ATC: "AVIATORY 452, ROGER."
Recibió una instrucción que el RA no le deja cumplir. Se dice UNABLE, TCAS RA, y se sigue el RA.

ATC: "AVIATORY 452, TRAFFIC 12 O'CLOCK 5 MILES OPPOSITE DIRECTION, 1000 FEET BELOW."
PILOT: "AVIATORY 452, LOOKING OUT."
Información de tránsito (Doc 9432 6.4). Si usted tiene un TA de ese tránsito, no maniobra por el TA: lo busca y espera.

ATC: "AVIATORY 452, TURN RIGHT IMMEDIATELY HEADING 110 TO AVOID TRAFFIC 12 O'CLOCK 4 MILES."
PILOT: "RIGHT HEADING 110, AVIATORY 452."
Maniobra de evitación ordenada por el ATC (Doc 9432 6.7.2). Si durante esa maniobra aparece un RA, manda el RA.

### Aplicación en aerolínea
En cabina, el PF sigue el RA con las guías del PFD y el PM hace la llamada cuando la maniobra está en curso y el avión controlado; el reparto exacto lo fija el SOP del explotador. El piloto automático y el director de vuelo se manejan según el procedimiento del fabricante (en algunos aviones el piloto automático puede volar el RA; VERIFICAR según tipo). Después de un RA hay reporte obligatorio según el sistema de notificación del explotador y del Estado.

### Error frecuente
- Seguir la instrucción del ATC en contra del RA.
- Maniobrar con un TA.
- Llamar al ATC antes de iniciar la maniobra.
- Olvidar la segunda llamada (CLEAR OF CONFLICT): el ATC no sabe cuándo recupera la responsabilidad de separación.
- Usar frases no estándar («we had a TCAS», «traffic alert, climbing»).
- Invertir el sentido del RA (subir cuando pide bajar) por una mala lectura bajo estrés.

### En pocas palabras
- TA: buscar y prepararse. RA: maniobrar.
- El RA manda sobre la instrucción del ATC.
- Primero se maniobra; después «TCAS RA».
- Al terminar: «CLEAR OF CONFLICT, RETURNING TO…» y luego «… RESUMED».
- Si no puede cumplir una instrucción por un RA: «UNABLE, TCAS RA».

FUENTES
- Verificado: Doc 4444 (15.ª ed., Enm. 4) cap. 1, definición «Sistema anticolisión de a bordo (ACAS)»; preámbulo, Tabla A (15.ª edición: procedimientos y fraseología relativos al ACAS; 12.ª ed., Enm. 4: prestación de servicios ATS independientemente de la utilización del ACAS). Doc 9432 (4.ª ed.) 6.4 (información de tránsito, LOOKING OUT); 6.7.2 (maniobra de evitación ordenada por el ATC).
- VERIFICAR: «TCAS RA», «CLEAR OF CONFLICT, RETURNING TO (assigned clearance)», «CLEAR OF CONFLICT (assigned clearance) RESUMED», «UNABLE, TCAS RA» y la respuesta ATC «ROGER» contra Doc 4444 cap. 12 (maniobras ACAS) y Doc 9432 11.6 (no cargados).
- VERIFICAR: seguir el RA aunque contradiga al ATC, no maniobrar por un TA y regresar pronto a la autorización, contra Doc 8168 (PANS-OPS) Vol. I, procedimientos ACAS (no cargado).
- VERIFICAR: el ATC no modifica la trayectoria de una aeronave que responde a un RA, contra Doc 4444 cap. 15 (no cargado).
- VERIFICAR: definiciones de TA y RA contra Doc 4444 cap. 1 de la edición vigente.
- VERIFICAR: modo de piloto automático con RA según tipo de aeronave (manual del fabricante).

---

## 39. RVSM

### ¿Qué es?
RVSM (separación vertical mínima reducida) es la aplicación de 1000 ft de separación vertical entre el FL 290 y el FL 410 inclusive, cuando fuera de ese espacio designado se aplican nominalmente 2000 ft desde el FL 290 (Doc 4444 2.6.1.1 nota 1 y 5.3.2). Solo pueden operar ahí aeronaves con aprobación RVSM.

### Lo que debe saber un piloto
- **Aprobación.** El explotador se asegura antes de la salida de que la aeronave tiene la aprobación RVSM requerida cuando va a operar en ese espacio aéreo (Doc 4444 4.4.1.4 b). En el plan de vuelo se indica esa capacidad (VERIFICAR la casilla y la letra en el Apéndice 2 vigente).
- **Pérdida de capacidad.** Cuando una falla de altimetría, del piloto automático u otro sistema degrada la performance por debajo de lo requerido para ese espacio aéreo, la tripulación lo notifica **sin demora** al ATC (Doc 4444 5.2.2). El ATC entonces aplica otra separación.
- **Turbulencia.** Turbulencia que no deja mantener el nivel con la precisión requerida también es motivo para informar que no puede seguir en RVSM (VERIFICAR).
- **Aeronave sin aprobación.** Si una aeronave no aprobada es autorizada a entrar o cruzar el espacio RVSM (por ejemplo, en vuelos especiales), lo informa en la comunicación, con la frase NEGATIVE RVSM (VERIFICAR).
- **Frases cortas.** El ATC necesita saber tres cosas: que usted no puede operar en RVSM, por qué y qué va a hacer o pedir.

[ESPACIO PARA IMAGEN]
CÓDIGO: CM-39-01 · Esquema · 4:5 · 1080×1350
IMAGEN SUGERIDA:
Columna vertical de niveles de vuelo del FL 280 al FL 420. Entre FL 290 y FL 410, banda sombreada con el rótulo «RVSM: 1000 ft» y niveles cada 1000 ft. Fuera de la banda, rótulos de separación nominal según Doc 4444 5.3.2. A un lado, tres fichas de fallas: «altímetro», «piloto automático / mantenimiento de nivel», «turbulencia fuerte», cada una con una flecha hacia «Notificar al ATC sin demora (Doc 4444 5.2.2)».
OBJETIVO:
Que el piloto entienda dónde aplica RVSM y qué fallas le quitan la capacidad y obligan a avisar.

### Fraseología OACI

ATC: "AVIATORY 452, CONFIRM RVSM APPROVED."
PILOT: "AFFIRM RVSM, AVIATORY 452."
El ATC pregunta si la aeronave tiene aprobación RVSM.

PILOT: "BOGOTA CONTROL, AVIATORY 452, UNABLE RVSM DUE EQUIPMENT."
ATC: "AVIATORY 452, ROGER, DESCEND TO FLIGHT LEVEL 280."
PILOT: "DESCENDING FLIGHT LEVEL 280, AVIATORY 452."
Perdió la capacidad RVSM por una falla (por ejemplo, un altímetro principal). El ATC lo saca del espacio RVSM o aplica otra separación. La respuesta del ATC es un ejemplo: puede ser otra.

PILOT: "BOGOTA CONTROL, AVIATORY 452, UNABLE RVSM DUE TURBULENCE."
ATC: "AVIATORY 452, ROGER."
Turbulencia que no deja mantener el nivel dentro de la precisión requerida.

PILOT: "BOGOTA CONTROL, AVIATORY 452, READY TO RESUME RVSM."
ATC: "AVIATORY 452, ROGER."
Terminó la turbulencia o se recuperó el sistema; el ATC decide cuándo lo vuelve a tratar como RVSM.

PILOT: "BOGOTA CONTROL, AVIATORY 452, FLIGHT LEVEL 370, NEGATIVE RVSM."
ATC: "AVIATORY 452, ROGER."
Primer contacto de una aeronave sin aprobación RVSM (o que la perdió) dentro de ese espacio aéreo. VERIFICAR en qué transmisiones se exige incluir NEGATIVE RVSM.

ATC: "AVIATORY 452, UNABLE ISSUE CLEARANCE INTO RVSM AIRSPACE, MAINTAIN FLIGHT LEVEL 280."
PILOT: "MAINTAINING FLIGHT LEVEL 280, AVIATORY 452."
El ATC no puede autorizar a una aeronave no aprobada a subir al espacio RVSM.

PILOT: "BOGOTA CONTROL, AVIATORY 452, ALTIMETER DISAGREE, UNABLE RVSM DUE EQUIPMENT, REQUEST FLIGHT LEVEL 280."
**PLAIN LANGUAGE** para la descripción («altimeter disagree») y la solicitud, junto con la frase RVSM. Así el ATC sabe qué pasó, qué significa y qué pide usted.

### Aplicación en aerolínea
Casi toda la operación de jet de línea en crucero ocurre en espacio RVSM. La MEL del explotador dice qué equipos se necesitan para operar en RVSM; si uno falla en vuelo, la lista anormal del avión y el manual del explotador indican cuándo se pierde la capacidad. En ese momento se avisa al ATC con la frase corta y se espera su instrucción; no se cambia de nivel por cuenta propia salvo contingencia. Algunas regiones tienen procedimientos de contingencia particulares (por ejemplo, oceánicas; ver Nivel 6).

### Error frecuente
- Seguir en RVSM con un altímetro en desacuerdo sin decir nada.
- Explicar la falla con un relato largo y no decir la frase clave («UNABLE RVSM DUE EQUIPMENT»).
- Cambiar de nivel sin autorización por una falla que no lo exige.
- Olvidar informar cuando la capacidad se recupera y seguir con restricciones que ya no aplican.

### En pocas palabras
- RVSM: 1000 ft entre FL 290 y FL 410 inclusive, solo con aprobación.
- La pérdida de capacidad se notifica sin demora (Doc 4444 5.2.2).
- «UNABLE RVSM DUE EQUIPMENT» / «DUE TURBULENCE»; «READY TO RESUME RVSM».
- Aeronave no aprobada: «NEGATIVE RVSM».
- El ATC decide el nivel; usted informa y pide.

FUENTES
- Verificado: Doc 4444 (15.ª ed., Enm. 4) 2.6.1.1 nota 1 (RVSM, 300 m / 1000 ft entre FL 290 y FL 410 inclusive); 4.4.1.4 b) (aprobación RVSM antes de la salida); 5.2.2 (deterioro de la performance: notificar sin demora); 5.3.2 (separación vertical mínima; nota sobre Doc 9574); preámbulo, Tabla A (14.ª ed., Enm. 3: fraseología relativa a RVSM). Doc 9432 (4.ª ed.) 2.6 (AFFIRM, UNABLE).
- VERIFICAR: «CONFIRM RVSM APPROVED», «AFFIRM RVSM», «NEGATIVE RVSM», «UNABLE RVSM DUE EQUIPMENT», «UNABLE RVSM DUE TURBULENCE», «READY TO RESUME RVSM», «UNABLE ISSUE CLEARANCE INTO RVSM AIRSPACE, MAINTAIN (level)» y en qué transmisiones se incluye NEGATIVE RVSM, contra Doc 4444 cap. 12 (fraseología RVSM) (no cargado).
- VERIFICAR: indicación de la aprobación RVSM en el plan de vuelo contra Doc 4444 Apéndice 2 vigente (no cargado).
- VERIFICAR: turbulencia como causa de pérdida de capacidad y procedimientos de contingencia contra Doc 9574 y Doc 4444 cap. 15 (no cargados).

---

## 40. PBN/RNAV/RNP

### ¿Qué es?
PBN (navegación basada en la performance) agrupa las especificaciones RNAV y RNP. El Doc 4444 define **RNAV** como el método de navegación que permite operar en cualquier trayectoria deseada dentro de la cobertura de las ayudas o de los límites de las ayudas autónomas, y **RNP** como la declaración de la performance de navegación necesaria para operar en un espacio aéreo definido. Este capítulo no enseña PBN: enseña **qué decir cuando no puede cumplir** un procedimiento o ruta PBN.

### Lo que debe saber un piloto
- **Aprobación antes de salir.** El explotador se asegura de que la aeronave tenga la aprobación para el tipo de RNP que exige la ruta o el área (Doc 4444 4.4.1.4 a). La orientación sobre especificaciones está en el Doc 9613 (Manual PBN), citado en el Doc 4444.
- **Degradación en vuelo.** Si una falla de navegación (por ejemplo, pérdida de GNSS o una alerta de integridad) deja la performance por debajo de lo que exige el espacio aéreo o el procedimiento, se notifica **sin demora** al ATC (Doc 4444 5.2.2).
- **Lo que el ATC necesita saber:** qué no puede cumplir (la ruta, la SID, la STAR, la aproximación RNP), por qué (en pocas palabras) y qué necesita (vectores, una aproximación convencional, otra ruta).
- **Frases:** UNABLE (Doc 9432 2.6) más el procedimiento y la razón. El Doc 4444 cap. 12 vigente tiene fraseología PBN y de estado GNSS; no está cargada, así que aquí va solo lo que se puede decir con certeza y el resto en PLAIN LANGUAGE.
- **Si el ATC pregunta capacidad**, conteste con verdad y con precisión: no todas las aeronaves ni todas las tripulaciones están aprobadas para todas las especificaciones.

### Fraseología OACI

ATC: "AVIATORY 452, CLEARED RNP APPROACH RUNWAY 13."
PILOT: "AVIATORY 452, UNABLE RNP APPROACH DUE GPS FAILURE, REQUEST ILS RUNWAY 13."
UNABLE es palabra normalizada; la combinación con el procedimiento y la razón sigue el modelo «UNABLE TO CROSS … DUE WEIGHT» del Doc 9432 2.8.3. La forma específica PBN: VERIFICAR.

PILOT: "BOGOTA CONTROL, AVIATORY 452, LOSS OF GPS, NAVIGATION DEGRADED, UNABLE RNAV ROUTE, REQUEST VECTORS TO TOLMA VOR."
ATC: "AVIATORY 452, TURN RIGHT HEADING 090, VECTORS TO TOLMA."
PILOT: "RIGHT HEADING 090, AVIATORY 452."
**PLAIN LANGUAGE** para la descripción. El rumbo se colaciona como siempre.

ATC: "AVIATORY 452, CONFIRM ABLE RNP APPROACH RUNWAY 31."
PILOT: "NEGATIVE, AVIATORY 452. REQUEST VOR APPROACH RUNWAY 31."
**PLAIN LANGUAGE** del ATC (la forma estándar de esta pregunta: VERIFICAR). Usted no tiene la aprobación o el equipo para esa aproximación: NEGATIVE y lo que sí puede hacer.

ATC: "AVIATORY 452, CLEARED DIRECT GIKOS, DESCEND VIA STAR."
PILOT: "AVIATORY 452, UNABLE DIRECT GIKOS, GIKOS NOT IN OUR DATABASE, REQUEST HEADING."
**PLAIN LANGUAGE**. Un punto que no está en la base de datos no se construye a mano en un procedimiento PBN sin que el manual lo permita; se dice y se pide alternativa. VERIFICAR «DESCEND VIA STAR» (Nivel 4, cap. 26).

PILOT: "BOGOTA APPROACH, AVIATORY 452, GPS RESTORED, ABLE RNP APPROACH RUNWAY 13."
ATC: "AVIATORY 452, ROGER, EXPECT RNP APPROACH RUNWAY 13."
**PLAIN LANGUAGE**. Recuperó la capacidad: se informa para que el ATC la tenga en cuenta.

### Aplicación en aerolínea
Cada vez más SID, STAR y aproximaciones en la región son RNAV o RNP. En la práctica, las situaciones de comunicación son tres: una falla o degradación en vuelo (GNSS, FMS), un procedimiento para el que la aeronave o la tripulación no está aprobada y un cambio del ATC que la base de datos no permite volar. En los tres casos se usa UNABLE con la razón y una alternativa concreta. Lo que la aeronave necesita para cada especificación lo dicen el AFM, la MEL y el manual del explotador; en Colombia, las aprobaciones PBN y los procedimientos publicados están en el AIP y el RAC.

### Error frecuente
- Aceptar un procedimiento RNP sin tener la aprobación o el equipo, por no decir UNABLE.
- Decir «we have a problem with the navigation» sin decir qué no puede hacer ni qué necesita.
- Seguir un procedimiento RNP con una alerta de integridad activa sin informar.
- Construir a mano un punto que no está en la base de datos para cumplir una autorización.
- No informar cuando se recupera la capacidad.

### En pocas palabras
- La aprobación PBN es de la aeronave, del explotador y de la tripulación; se revisa antes de salir.
- La degradación se notifica sin demora (Doc 4444 5.2.2).
- UNABLE + procedimiento + razón + alternativa.
- Conteste con precisión cuando el ATC pregunte capacidad.
- Si recupera la capacidad, avise.

FUENTES
- Verificado: Doc 4444 (15.ª ed., Enm. 4) cap. 1, definiciones «Navegación de área (RNAV)» y «Performance de navegación requerida (RNP)»; 4.4.1.4 a) (aprobación RNP antes de la salida); 5.2.2 (deterioro de la performance); cap. 5, nota 4 tras 5.4.1.2 (orientación sobre especificaciones de navegación en el Doc 9613, Manual PBN). Doc 9432 (4.ª ed.) 2.6 (UNABLE, NEGATIVE); 2.8.3 (ejemplo «UNABLE TO CROSS WICKEN FL 150 DUE WEIGHT»).
- VERIFICAR: fraseología PBN y de estado GNSS (incapacidad para una especificación RNP o RNAV, pregunta de capacidad del ATC) contra Doc 4444 cap. 12 de la edición vigente (no cargado).
- VERIFICAR: «DESCEND VIA STAR» contra Doc 4444 cap. 12 de la edición vigente (no cargado).
- VERIFICAR: regla sobre puntos creados manualmente en procedimientos PBN contra Doc 9613 y Doc 8168 (no cargados) y el manual del explotador.

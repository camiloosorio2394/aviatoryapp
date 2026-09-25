# Minimum Equipment List (MEL) · Nivel 5: Práctica y entrevista

Aquí se usa todo lo anterior. Primero una entrada real leída flecha por flecha; luego casos
para decidir si se sale o no, seis casos operacionales con entradas reales de las MMEL de la
FAA, los errores que más se oyen en entrevista, lo que hay que llevar memorizado, las
preguntas típicas en inglés y un simulador de diez ejercicios.

Dos reglas para todo el nivel:

- Las entradas **reales** son de las MMEL de la FAA (MMEL FAA A318-A321 Rev 32 y MMEL FAA
  B-737 Rev 63a). Son la lista maestra del tipo, **no la MEL de un operador**. La MEL de tu
  aerolínea puede ser más restrictiva, nunca menos (FAA Order 8900.1 Vol 4 Cap 4 Secc 3,
  4-682; SRVSOP MIA PIV-VI-C7 3.17).
- Las entradas **inventadas** van sobre una «Aeronave de ejemplo» (bimotor turbofán de
  transporte). No corresponden a ningún avión ni operador.
- Los plazos de las categorías A, B, C y D son del sistema FAA (PL-25 Rev 24). El RAC no los
  define: en Colombia aplican los que establezca la MEL del operador aprobada por la UAEAC.

---

## 30. EJEMPLO VISUAL COMPLETO: UNA ENTRADA REAL, FLECHA POR FLECHA

[ESPACIO PARA IMAGEN ANOTADA]
CÓDIGO: MEL-30-01 · Imagen anotada · 4:5 · 1080 × 1350 px
IMAGEN BASE:
Recreación fiel (misma tipografía de tabla, mismas columnas) de la página 32-1 de la MMEL FAA
B-737, Rev 63a, capítulo 32 Landing Gear, filas 01 (Gear Seal Warning System) y 02 Antiskid
System con sus sub-ítems 02-01 y 02-02. Encabezado completo de la página: «U.S. DEPARTMENT OF
TRANSPORTATION / FEDERAL AVIATION ADMINISTRATION MASTER MINIMUM EQUIPMENT LIST / REVISION NO.
63 / DATE: 04/03/2026 / PAGE NO. 32-1 / AIRCRAFT: Boeing B-737 / TABLE KEY 1. REPAIR CATEGORY
2. NO. INSTALLED 3. NO. REQUIRED FOR DISPATCH 4. REMARKS OR EXCEPTIONS / 32. Landing Gear».
La fila 02-02 resaltada con un fondo suave del acento del módulo; el resto en gris.
ANOTACIONES:
→ FLECHA 1: «REVISION NO. 63 / DATE: 04/03/2026»
EXPLICACIÓN: revisión y fecha de esta página, que no es la del documento (Rev 63a, 05/27/2026).
→ FLECHA 2: «PAGE NO. 32-1» y «32. Landing Gear»
EXPLICACIÓN: capítulo ATA 32, tren de aterrizaje. Es la puerta de entrada al sistema.
→ FLECHA 3: «02 Antiskid System»
EXPLICACIÓN: número de secuencia y nombre del ítem.
→ FLECHA 4: «02-02 (-600/-700/-800/-900/-900ER)»
EXPLICACIÓN: sub-ítem por configuración. Solo aplica a esos modelos.
→ FLECHA 5: «C» (columna 1)
EXPLICACIÓN: categoría de reparación.
→ FLECHA 6: «1» (columna 2)
EXPLICACIÓN: número instalado.
→ FLECHA 7: «0» (columna 3)
EXPLICACIÓN: número requerido para despacho.
→ FLECHA 8: «(M)(O)»
EXPLICACIÓN: hay procedimiento de mantenimiento y procedimiento operacional.
→ FLECHA 9: «May be inoperative provided:»
EXPLICACIÓN: la autorización existe solo si se cumplen los provisos que siguen.
→ FLECHA 10: «a) Associated Antiskid channel(s) is deactivated»
EXPLICACIÓN: condición física que cumple mantenimiento.
→ FLECHA 11: «b) Operations are conducted in compliance with AFM»
EXPLICACIÓN: condición de operación que cumple la tripulación.
→ FLECHA 12: «***» junto a la fila 01
EXPLICACIÓN: ítem que no está instalado en todos los aviones cubiertos por la MMEL.
OBJETIVO PEDAGÓGICO:
Que el piloto vea que una fila que parece «1 / 0, se puede» es en realidad un paquete de
condiciones, y que aprenda a recorrerla siempre en el mismo orden.

### ¿Qué es?

Una entrada completa y corta de una MMEL oficial: el sistema antiskid del B737. Se eligió
porque tiene todo lo que trae una entrada de verdad (capítulo, ítem, configuración,
categoría, números, (M), (O) y provisos) sin ocupar varias páginas.

Es una **MMEL de la FAA para el tipo B737**, no la MEL de una aerolínea. Sirve para aprender
a leer; en la línea se lee la MEL aprobada del operador.

### Cómo se ve en la MMEL

MMEL FAA B-737, Rev 63a, página 32-1 (encabezado de la página: REVISION NO. 63, DATE
04/03/2026), textual:

| Sequence No. | Item | 1 | 2 | 3 | 4. Remarks or Exceptions |
|---|---|---|---|---|---|
| 01 \*\*\* | Gear Seal Warning System (-100/-200) | C | 1 | 0 | (M) May be inoperative provided gear seal function is checked once each flight-day. |
| 02 | Antiskid System | | | | |
| 02-01 | (-100/-200/-300/-400/-500) | C | 1 | 0 | (O) May be inoperative provided operations are conducted in compliance with AFM. |
| 02-02 | (-600/-700/-800/-900/-900ER) | C | 1 | 0 | (M)(O) May be inoperative provided: a) Associated Antiskid channel(s) is deactivated, and b) Operations are conducted in compliance with AFM. |

### Qué dice cada flecha

1. **Revisión de la página (REVISION NO. 63, 04/03/2026).** Cada página de una MMEL lleva su
   propia revisión. La MMEL completa está en la Rev 63a, pero la tabla de contenido lista el
   capítulo 32 como «63 04/03/2026». Qué mira el piloto: que su MEL esté en la revisión
   vigente del operador. Por qué importa: una entrada vieja puede tener condiciones distintas.
2. **ATA 32, Landing Gear.** El antiskid es parte del sistema de frenos, que en ATA está en el
   capítulo del tren. Qué mira el piloto: el capítulo para llegar rápido al ítem. Por qué
   importa: buscar por el nombre del mensaje de falla a veces no lleva al ítem correcto.
3. **02 Antiskid System.** Es el ítem: el sistema completo. Qué mira el piloto: que el defecto
   del tech log sea exactamente este ítem y no otro parecido (p. ej. la válvula del freno de
   parqueo, ítem 03, que tiene sus propias condiciones).
4. **02-02 y su configuración.** El mismo sistema tiene dos alivios según el modelo. Qué mira
   el piloto: su modelo. Por qué importa: un -800 no puede usar la fila 02-01, que no pide
   (M). Usar la fila equivocada es usar un alivio que no existe para ese avión.
5. **Categoría C.** Según FAA (PL-25 Rev 24): reparar dentro de 10 días calendario
   consecutivos (240 h), excluyendo el día del descubrimiento. En Colombia, el plazo que diga
   la MEL aprobada del operador. Qué mira el piloto: la fecha límite en el tech log.
6. **Instalado 1.** El avión tiene un sistema antiskid (con sus canales).
7. **Requerido 0.** Se puede salir sin él, **siempre que se cumplan los Remarks**. El «0» no es
   la autorización: la autorización está en la columna 4 (PL-25, Number Required for
   Dispatch: «providing the conditions specified in the Remarks or Exceptions column are
   met»).
8. **(M)(O).** Hay dos requisitos antes de usar el alivio: uno de mantenimiento y uno
   operacional (PL-25). Qué mira el piloto: que el (M) esté cumplido y firmado, y qué le toca
   a él por el (O).
9. **«May be inoperative provided:».** Todo lo que sigue es obligatorio. Si una letra no se
   cumple, no hay alivio.
10. **a) canal desactivado.** Es la parte (M): mantenimiento desactiva el canal según su
    procedimiento. El piloto no lo hace ni lo improvisa; lo verifica en el tech log.
11. **b) operación conforme al AFM.** Es la parte (O): el AFM trae limitaciones y performance
    para operar con antiskid inoperativo. Qué mira el piloto: que el despacho y los cálculos
    de despegue y aterrizaje los hayan aplicado. Por qué importa: frenar sin antiskid cambia
    la distancia de parada y el riesgo en pista mojada o contaminada.
12. **\*\*\*.** Ítem instalado en algunos aviones del tipo y no en todos. El símbolo no pasa a
    la MEL del operador (PL-25, Triple Asterisk).

### ¿Cómo debe leerla un piloto?

1. **Documento correcto.** MEL del operador, revisión vigente, para esta matrícula. (La MMEL
   solo se usa para aprender: «La MMEL no puede ser utilizada como una MEL para realizar
   despachos», SRVSOP MIA PIV-VI-C7 3.5.)
2. **Sistema y ATA.** Antiskid: capítulo 32.
3. **Configuración.** B737-800: sub-ítem 02-02, no 02-01.
4. **Categoría y fecha límite.** C. Si se registró el 3 de octubre a las 07:15, con el
   sistema FAA el plazo corre del 4 al 13 de octubre y vence a las 2359 del 13. En Colombia,
   el que fije la MEL aprobada.
5. **Instalados y requeridos.** 1 y 0: puede faltar el sistema completo, con condiciones.
6. **Remarks completos.** Provisos a) y b). Ninguno se salta.
7. **(M) y placard.** En el tech log: canal desactivado, firma de mantenimiento, referencia
   MEL, placard instalado.
8. **(O) e impacto, y decisión.** Cumplir el (O); performance de despegue y aterrizaje con
   antiskid inoperativo según AFM; estado de la pista y meteorología; otros ítems abiertos del
   sistema de frenado o de los reversores; briefing. Solo entonces se acepta el avión.

### Aplicación en la operación

Llegas al avión y el tech log trae «Antiskid inop, MEL 32-02-02, cat C». Lo que cambia tu
día no es el diferido: es el (O). El despacho debe reflejar la limitación («The operational
flight plan must account for any operational limitations», 8900.1 4-691C) y tú confirmas que
los números de despegue y aterrizaje salieron con esa condición. Si la pista de destino está
mojada o corta, esa es la conversación con despacho.

### Error frecuente

Leer «C 1 0» y concluir «se puede». O usar la fila de otro modelo porque «es el mismo
sistema». La fila correcta depende de la configuración, y el alivio depende de los provisos.

### En pocas palabras

- La revisión se mira por página, no solo en la portada.
- Primero la configuración, después los números.
- Required 0 no autoriza nada por sí solo: autorizan los Remarks cumplidos.
- (M) lo hace mantenimiento; el piloto lo verifica. (O) lo cumple la tripulación.
- La decisión incluye el impacto: aquí, performance de frenado.

FUENTES
- Verificado: MMEL FAA B-737, Rev 63a (05/27/2026), página 32-1 (Rev 63, 04/03/2026), ítems 32-01, 32-02-01 y 32-02-02; tabla de contenido p. I.
- Verificado: PL-25 Rev 24: Number Required for Dispatch, Repair Category C, (M), (O), Triple Asterisk.
- Verificado: FAA Order 8900.1 Vol 4 Cap 4 Secc 3 (CHG 933), 4-682 y 4-691C.
- Verificado: SRVSOP MIA Enm. 13, PIV-VI-C7 3.5.
- VERIFICAR: limitaciones y performance con antiskid inoperativo contra el AFM del modelo y el (O) de la MEL del operador.

---

## 31. EJERCICIO «¿PODEMOS SALIR?»

[ESPACIO PARA IMAGEN]
CÓDIGO: MEL-31-01 · Esquema · 4:5 · 1080 × 1350 px
IMAGEN SUGERIDA:
Tarjeta de caso en papel (fondo `--ln-paper`) con nueve renglones rotulados en mono y
mayúsculas: DEFECT, MEL ENTRY, CATEGORY, INSTALLED, REQUIRED, CONDITIONS, (M), (O), FLIGHT
CONDITIONS. Abajo, tres sellos posibles: «GO CON CONDICIONES», «NO GO», «FALTA
INFORMACIÓN». Ninguno marcado.
OBJETIVO:
Que el piloto vea que hay tres respuestas posibles y no dos, y que la respuesta sale de
cruzar la entrada con el vuelo concreto.

### Cómo se usa

Siete casos inventados sobre una Aeronave de ejemplo. Lee la tarjeta, decide y después mira
el análisis. No basta con «sí» o «no»: la respuesta es el razonamiento. Los plazos siguen el
sistema FAA (PL-25); en Colombia rigen los de la MEL aprobada del operador.

### Caso 1: pack de aire acondicionado

| Campo | Dato |
|---|---|
| DEFECT | «PACK 2 FAULT» en el prevuelo. Registrado en el tech log hoy a las 08:20. |
| MEL ENTRY | 21-85-01 Air Conditioning Pack |
| CATEGORY | C |
| INSTALLED | 2 |
| REQUIRED | 1 |
| CONDITIONS | «(M)(O) One may be inoperative provided: a) Inoperative pack is secured closed, and b) Flight altitude is limited as specified in the (O) procedure.» |
| (M) | Válvula asegurada cerrada. Firmado en el tech log a las 09:05, placard instalado. |
| (O) | Limitación de altitud según el procedimiento del operador. |
| FLIGHT CONDITIONS | Vuelo doméstico diurno, 1 h 10 min, plan original en un nivel por encima del límite de la (O). |

**¿Podemos salir?**

1. El ítem existe y la configuración coincide.
2. C: el día de hoy no cuenta; vence en 10 días calendario (FAA).
3. 2 instalados, 1 requerido, y queda uno.
4. a) cumplido y firmado. b) no se cumple **con el plan actual**.
5. Impacto: hay que rehacer el plan en un nivel permitido. Volar más bajo cambia el consumo;
   despacho recalcula el combustible y el nivel se coordina con ATC.
6. Redundancia: con un solo pack, una segunda falla en vuelo deja al avión sin ese respaldo.
   Se habla en el briefing (AC 120-125 6.4: considerar fallas adicionales en ruta).

**Respuesta:** sí, **con el plan de vuelo rehecho** en un nivel permitido y el combustible
recalculado. Con el plan original, no.

### Caso 2: antihielo de ala con hielo pronosticado

| Campo | Dato |
|---|---|
| DEFECT | Válvula de antihielo de ala izquierda no abre en la prueba. |
| MEL ENTRY | 30-85-01 Wing Anti-Ice Valve |
| CATEGORY | C |
| INSTALLED | 2 |
| REQUIRED | 0 |
| CONDITIONS | «(M) May be inoperative provided: a) Valve is secured closed, and b) Airplane is not operated in known or forecast icing conditions.» |
| (M) | Cumplido y firmado. |
| (O) | No tiene. |
| FLIGHT CONDITIONS | Salida nocturna. El pronóstico de área trae engelamiento moderado entre el nivel de salida y el de crucero. |

**¿Podemos salir?**

1. Ítem, configuración, categoría y (M): en orden.
2. b) dice «known **or forecast**». Hay pronóstico de engelamiento en la trayectoria.
3. No hace falta que haya hielo real: el pronóstico basta para que el proviso no se cumpla.
4. Que «seguramente no vamos a encontrar hielo» no es un argumento: el proviso no pide
   opinión, pide que no haya pronóstico.

**Respuesta:** no. Opciones: reparar, cambiar de avión o esperar a que el pronóstico ya no
incluya esa condición en la trayectoria (decisión de la aerolínea con despacho, no del
piloto solo).

### Caso 3: «WX RADAR INOP», y nada más

| Campo | Dato |
|---|---|
| DEFECT | Tech log: «WX RADAR INOP». Sin más detalle. |
| MEL ENTRY | 34-85-01 Weather Radar System, con sub-ítems |
| CATEGORY | Sistema completo: C. Sub-ítem «1) Transceiver (dual transceivers installed)»: D |
| INSTALLED | Sistema: 1. Transceptor: 2 |
| REQUIRED | Sistema: 0. Transceptor: 1 |
| CONDITIONS | Sistema: «May be inoperative provided weather radar is not required by the operating rules.» Transceptor: «One may be inoperative provided remaining transceiver operates normally.» |
| (M) | No tiene. |
| (O) | No tiene. |
| FLIGHT CONDITIONS | Salida a las 19:30. Pronóstico de tormentas en la ruta. |

**¿Podemos salir?**

1. No sabemos **qué** falló: el sistema completo o un transceptor de dos.
2. Tampoco sabemos si este avión tiene dos transceptores; el sub-ítem 1) solo aplica si los
   tiene.
3. Si es un transceptor y el otro funciona: alivio D, sin impacto en el vuelo.
4. Si es el sistema: el alivio pide que el radar no sea requerido por la norma. En Colombia,
   RAC 121.860 exige a los aviones presurizados un radar que funcione de noche o en IMC en
   áreas donde se esperan tormentas. Esta noche, con tormentas pronosticadas, sí es requerido.

**Respuesta:** falta información. Hay que pedir a mantenimiento la anotación exacta (qué
componente, qué ítem de la MEL) y confirmar la configuración del avión. Según la respuesta,
es «sí» o es «no».

### Caso 4: dos ítems que se necesitan entre sí

| Campo | Dato |
|---|---|
| DEFECT | Nuevo: «GEN 1 FAULT» (generador del motor 1). Ya abierto desde ayer: generador de la APU inoperativo. |
| MEL ENTRY | Nuevo: 24-85-01 Engine Driven Generator. Abierto: 24-86-01 APU Generator |
| CATEGORY | 24-85-01: C. 24-86-01: C |
| INSTALLED | 24-85-01: 2. 24-86-01: 1 |
| REQUIRED | 24-85-01: 1. 24-86-01: 0 |
| CONDITIONS | 24-85-01: «(M)(O) One may be inoperative provided: a) Generator is disconnected, and b) APU generator operates normally.» 24-86-01: «May be inoperative provided both engine driven generators operate normally.» |
| (M) | 24-85-01: pendiente. |
| (O) | 24-85-01: procedimiento de carga eléctrica del operador. |
| FLIGHT CONDITIONS | Vuelo doméstico diurno. |

**¿Podemos salir?**

1. Cada ítem, solo, tiene alivio.
2. El nuevo pide «APU generator operates normally». El abierto está justamente inoperativo.
3. Y el abierto pide «both engine driven generators operate normally». Ya no es así.
4. Los dos provisos se anulan entre sí. MEL + MEL no suma: se cruza.

**Respuesta:** no. Hay que reparar uno de los dos. Es el caso que describen PL-34 («the
interrelationships between those items [...] will be considered») y el RAC 91 Apéndice 2 (f).

### Caso 5: categoría B que ya venció

| Campo | Dato |
|---|---|
| DEFECT | Diferido abierto: luz de aviso de un sistema de la cabina de pilotos. |
| MEL ENTRY | 31-xx (ítem de indicación) |
| CATEGORY | B |
| INSTALLED | 1 |
| REQUIRED | 0 |
| CONDITIONS | «May be inoperative provided alternate procedures are established and used.» (con (O)) |
| (M) | No tiene. |
| (O) | Procedimiento alterno del operador. |
| FLIGHT CONDITIONS | Registrado el 14 de marzo a las 18:40 UTC (el operador cuenta en UTC). Salida hoy, 18 de marzo, 06:30 UTC. |

**¿Podemos salir?**

1. Sistema FAA: B son 3 días calendario consecutivos excluyendo el día del descubrimiento.
2. El 14 no cuenta. Cuentan 15, 16 y 17. Vence a las 2359 UTC del 17 de marzo.
3. Hoy es 18: el intervalo terminó.
4. Extensión: en la FAA, el operador con esa autorización (OpSpec D095) puede dar una sola
   extensión a ítems B y C, y avisar a la FAA en 24 h (8900.1 4-689). El SRVSOP describe el
   mismo esquema (MIA PIV-VI-C7). No la da el piloto, y tiene que estar documentada.

**Respuesta:** no, salvo que el tech log muestre una extensión aprobada según el
procedimiento del operador. Sin eso, el avión no sale hasta que se repare.

### Caso 6: diferido anotado, (M) sin hacer

| Campo | Dato |
|---|---|
| DEFECT | Bomba de combustible delantera del tanque izquierdo, baja presión. |
| MEL ENTRY | 28-85-01 Fuel Boost Pump |
| CATEGORY | C |
| INSTALLED | 4 |
| REQUIRED | 3 |
| CONDITIONS | «(M)(O) One may be inoperative provided: a) Inoperative pump is deactivated, and b) Fuel management procedures in the (O) procedure are used.» |
| (M) | Tech log: «Diferido MEL 28-85-01». Sin firma del (M). Sin placard. |
| (O) | Procedimiento de manejo de combustible del operador. |
| FLIGHT CONDITIONS | Vuelo doméstico, sin restricciones meteorológicas. |

**¿Podemos salir?**

1. El ítem tiene alivio y los números cuadran: 4, 3, queda 3.
2. Pero el (M) es un requisito **previo**: «must be accomplished prior to operation with the
   listed item inoperative» (PL-25). No hay constancia de que se haya hecho.
3. Falta el placard (PL-25, Placarding; en Colombia, leyenda «NO OPERATIVO», RAC 91.1105(a)(9)).
4. «Mantenimiento ya lo difirió» no significa que lo cumplió.

**Respuesta:** todavía no. Se llama a mantenimiento para que cumpla y firme el (M) y ponga el
placard. Después, briefing del (O) y se sale. «If the MEL procedures for a specific item
require a mechanic's inspection, takeoff would be prohibited until the required inspection
is completed» (AC 120-125, 6.1.3).

### Caso 7: el caso fácil, que igual se lee completo

| Campo | Dato |
|---|---|
| DEFECT | Luz de logotipo derecha fundida. |
| MEL ENTRY | 33-85-01 Logo Lights |
| CATEGORY | D |
| INSTALLED | 2 |
| REQUIRED | 0 |
| CONDITIONS | «May be inoperative.» |
| (M) | No tiene. |
| (O) | No tiene. |
| FLIGHT CONDITIONS | Vuelo nocturno. |

**¿Podemos salir?**

1. Sin provisos, sin (M) ni (O).
2. D: 120 días calendario excluyendo el día del descubrimiento (FAA).
3. Aun así: anotación en el tech log, placard y seguimiento del plazo. Sin impacto en el vuelo.

**Respuesta:** sí. Lo que se enseña aquí es que hasta el ítem más simple se anota, se
rotula y tiene fecha.

### En pocas palabras

- Hay tres respuestas: sí con condiciones, no, y falta información.
- Un proviso con «forecast» no se cumple si hay pronóstico, aunque el cielo esté limpio.
- Dos alivios válidos pueden anularse entre sí.
- Un intervalo vencido cierra el alivio; la extensión no la da el piloto.
- Diferido anotado no es (M) cumplido.

FUENTES
- Verificado: PL-25 Rev 24: Repair Category B, C y D; Day of Discovery; (M); (O); Placarding.
- Verificado: PL-34 Rev 5, p. 4 (ítems múltiples).
- Verificado: FAA Order 8900.1 Vol 4 Cap 4 Secc 3, 4-689 (extensión única B y C).
- Verificado: AC 120-125, 6.1.3 y 6.4.
- Verificado: RAC 121 Enm. 10, 121.860 (radar meteorológico); RAC 91 Enm. 12, Apéndice 2 (f) y 91.1105(a)(9).
- Verificado: SRVSOP MIA Enm. 13, PIV-VI-C7 (nota sobre extensión B y C).
- VERIFICAR: procedimiento de extensión de intervalos en Colombia contra la MEL y el manual del operador aprobados por la UAEAC.

---

## 32. CASOS OPERACIONALES

Seis casos con entradas **reales** de las MMEL de la FAA. Recuerda: son MMEL del tipo; la MEL
de tu aerolínea puede tener menos alivio o más condiciones. En cada caso: alivio,
condiciones, (M), (O), meteorología, performance, ruta, aeropuertos, capacidades e impacto.

### Caso 1: weather radar

**Entrada real.** MMEL FAA B-737, Rev 63a, página 34-7 (Rev 63, 04/03/2026), ítem 34-15-01
«Weather Radar with Windshear Detection and Avoidance System (Predictive) Installed»:

| Seq. | Cat. | Inst. | Req. | Remarks or Exceptions |
|---|---|---|---|---|
| 15-01A | B | - | 0 | (O) May be inoperative provided: a) Weather radar is not required by 14 CFR, and b) Alternate procedures are established and used. NOTE: Operator's alternate procedures should include reviewing windshear avoidance and windshear recovery procedures. |
| 15-01B | C | - | 0 | (O) May be inoperative provided: a) Weather radar is not required by 14 CFR, b) Alternate procedures are established and used, and c) Windshear Warning and Guidance System (Reactive) operates normally. |
| 15-01C | D | - | 1 | May be inoperative provided one remaining weather radar operates normally. |

En el A320 (MMEL FAA A318-A321, Rev 32, página 34-17, ítem 34-41-01) el ítem principal dice
«D | - | - | Any in excess of those required by 14 CFR may be inoperative» y luego alivia
funciones por separado (modo mapa, AUTO TILT, detección de turbulencia, windshear
predictivo).

- **Alivio:** tres alternativas en el B737. La B y la C sirven cuando se pierde el radar; la D,
  cuando hay dos y queda uno.
- **Condiciones:** que el radar **no sea requerido por la norma**. PL-25 aclara que «"14 CFR"
  also implies the regulations within the State the aircraft is operated». En Colombia, RAC
  121.860: «Todos los aviones presurizados deben tener instalado un radar meteorológico que
  funcione, tanto de noche como en IMC, en áreas donde se espera que existan tormentas u
  otras condiciones meteorológicas peligrosas.»
- **(M):** no tiene.
- **(O):** procedimientos alternos; la NOTE sugiere repasar evitar y recuperar de windshear.
  La 15-01B pide además que el windshear reactivo funcione.
- **Meteorología:** es lo que decide. De día y sin tormentas esperadas, puede no ser
  requerido. De noche o en IMC con tormentas esperadas, lo es, y el alivio no aplica.
- **Performance:** sin efecto directo.
- **Ruta y aeropuertos:** una ruta con convección de tarde puede quedar fuera para ese avión.
  El alterno también cuenta: si el plan B está bajo tormentas, el problema sigue.
- **Capacidades:** se pierde la detección de tormentas y, en esta configuración, el windshear
  predictivo.
- **Impacto:** el mismo avión puede salir a las 07:00 y no a las 18:00.

### Caso 2: autopilot

**Entrada real.** MMEL FAA A318-A321, Rev 32, página 22-1 (Rev 32, 07/30/2025), ítem
22-10-01 Autopilot Systems:

| Cat. | Inst. | Req. | Remarks or Exceptions |
|---|---|---|---|
| C | 2 | 1 | (O) One may be inoperative provided approach minimums do not require its use. |
| B | 2 | 0 | (O) May be inoperative provided: a) Approach minimums do not require their use, b) Enroute operations do not require their use, and c) Number of flight segments and segment duration is acceptable to flightcrew. NOTE: Any Mode which operates normally may be used. |

MMEL FAA B-737, Rev 63a, página 22-1 (Rev 63, 04/03/2026), ítem 22-01 Autopilot Systems:
**01A | C | - | 1** «May be inoperative provided approach minimums do not require its use.»
y **01B | B | - | 0** «Except for ETOPS, may be inoperative provided: a) Approach minimums do
not require their use, b) Enroute operations do not require autopilot use, and c) Number of
flight segments and segment duration is acceptable to flightcrew.» Con NOTE 1 (reparar
pronto, considerando «weather, traffic density, and effect of other inoperative systems»)
y NOTE 2 («If CWS is inoperative, do not use other modes (pitch or roll)»).

- **Alivio:** uno de dos (C) o los dos (B).
- **Condiciones:** mínimos de aproximación que no lo requieran; con los dos inoperativos,
  además, que la operación en ruta no los requiera y que la tripulación acepte los tramos y su
  duración. En el B737, la B excluye ETOPS.
- **(M):** no tiene.
- **(O):** en el A320 sí; en el B737 esta entrada no lleva (O).
- **Meteorología:** si el destino o el alterno están por debajo de lo que se puede volar sin
  ese autopiloto, el plan no sirve.
- **Performance:** sin efecto directo.
- **Ruta:** «Enroute operations do not require their use»: hay espacios y procedimientos en
  ruta que pueden exigir autopiloto.
- **Capacidades:** se pueden perder aproximaciones de categoría superior o autoland.
- **Impacto:** carga de trabajo. El proviso c) le da a la tripulación la palabra: si los
  tramos son largos o muchos, puede decir que no.

### Caso 3: thrust reverser

**Entrada real.** MMEL FAA B-737, Rev 63a, página 78-1, ítem 78-01-03 (-600/-700/-800/-900/-900ER):

| Cat. | Inst. | Req. | Remarks or Exceptions |
|---|---|---|---|
| C | 2 | 1 | (M)(O) One may be inoperative provided: a) Thrust reverser is locked in forward thrust position, and b) Appropriate performance adjustments are applied. |

En el A320ceo (MMEL FAA A318-A321, Rev 32, páginas 78-2 y 78-3, Rev 31, 08/13/2024, ítem
78-30-01 1)) la entrada es **C | 2 | 1 | (M)(O)** con diez provisos, entre ellos: «a)
Inoperative reverser is deactivated and secured in the stowed position and no operations or
procedures require its use», «g) Wheel brake tachometers operate normally», «h) Main wheel
braking system operates normally», «i) Flightcrew is provided with the following statement
[...]: "For a landing conducted with one deactivated thrust reverser, ensure that both engine
thrust levers are retarded to the IDLE detent for the flare and the touchdown. Select both
thrust levers to reverse when applying reverse thrust,"» y «j) Appropriate performance
adjustments are applied».

- **Alivio:** uno de dos.
- **Condiciones:** reversor bloqueado o desactivado; performance ajustada; en el A320, además,
  frenos y tacómetros normales.
- **(M):** bloquear o desactivar el reversor (lo hace mantenimiento).
- **(O):** en el A320 incluye una instrucción textual para el aterrizaje, que tiene que llegar
  a la tripulación.
- **Meteorología:** pista mojada o contaminada pesa más en la distancia de aterrizaje.
- **Performance:** «appropriate performance adjustments»: los ajustes salen del AFM y del
  sistema del operador, no de una regla de memoria.
- **Aeropuertos:** pistas cortas o contaminadas pueden quedar fuera, en destino o alterno.
- **Capacidades:** menos margen de frenado; ojo con otros ítems del sistema de frenos (caso 6).
- **Impacto:** técnica de aterrizaje (el A320 lo dice textual) y peso máximo de aterrizaje
  que puede bajar según la pista.

### Caso 4: APU

**Entrada real.** MMEL FAA A318-A321, Rev 32, página 49-1 (Rev 30, 03/03/2023), ítem 49-10-01
APU System, sub-ítem 1) A318/A319/A320/A321 without Mod. 163213/MP J4530:

| Cat. | Inst. | Req. | Remarks or Exceptions |
|---|---|---|---|
| C | 1 | 0 | (O) Except for ETOPS, may be inoperative. |
| A | 1 | 0 | (O) Except for ETOPS beyond 120 minutes, may be inoperative provided repairs are made within 4 flights. |

B737 (MMEL FAA B-737, Rev 63a, página 49-1, ítem 49-01-02 Airplane with APU APS2000):
**01-02A | C | 1 | 0** «(M) Except for ETOPS, may be inoperative provided: a) Procedures do
not require its use, and b) Perform a visual inspection of tail cone area and adjacent
control surfaces to confirm there is no evidence of heat damage or delamination.»

- **Alivio:** en el A320, dos alternativas. La C excluye todo ETOPS. La A permite ETOPS de
  hasta 120 minutos, pero solo por 4 vuelos (el intervalo en vuelos empieza cuando se
  difiere el ítem, PL-25 Repair Category A).
- **Condiciones:** la configuración importa: el A321 con otras modificaciones pide además que
  el tanque adicional esté vacío o no instalado.
- **(M):** en el B737 APS2000, inspección de la zona de cola.
- **(O):** en el A320, sí.
- **Meteorología:** sin APU, el acondicionamiento en tierra depende de equipos externos; en
  calor o frío extremo eso pesa en la cabina.
- **Performance:** según el avión, la APU puede usarse en ciertos despegues; si el operador lo
  hace, el (O) lo dirá.
- **Aeropuertos:** hacen falta planta de energía y aire externos en cada escala, incluido un
  posible desvío. Un aeropuerto sin ellos es un problema para el arranque.
- **Capacidades:** se pierde una fuente de respaldo eléctrico y neumático.
- **Impacto:** ETOPS (C) o ETOPS largo (A) fuera; planificación de escalas.

### Caso 5: TCAS / ACAS

**Entrada real.** MMEL FAA A318-A321, Rev 32, página 34-21 (Rev 32, 07/30/2025), ítem 34-43-01
Traffic Alert and Collision Avoidance System (TCAS II):

| Cat. | Inst. | Req. | Remarks or Exceptions |
|---|---|---|---|
| B | 1 | 0 | (M) May be inoperative provided: a) System is deactivated and secured, and b) Enroute or approach procedures do not require its use. NOTE 1: For aircraft equipped with Mod. 34637/MP P8454 (T2CAS), GPWS Modes 1-5 and GPWS Terrain System are also inoperative. NOTE 2: For aircraft equipped with Mod. 150896/MP P11422, ADS-B In function (ATSAW) is considered inoperative. |
| C | 1 | 0 | (M) May be inoperative provided: a) Not required by 14 CFR, b) System is deactivated and secured, and c) Enroute or approach procedures do not require its use. (mismas NOTE 1 y 2) |

En el B737 (MMEL FAA B-737, Rev 63a, página 34-25, ítem 34-40) es igual con «-» en instalados:
**40A | B | - | 0** y **40B | C | - | 0**.

- **Alivio:** B (sin exigir que no sea requerido por la norma) o C (solo si la norma no lo
  exige).
- **Condiciones:** desactivado y asegurado; que ni la ruta ni la aproximación lo exijan.
- **(M):** desactivar y asegurar.
- **(O):** no tiene.
- **Norma en Colombia:** RAC 121.855(a) exige ACAS II / TCAS II a los aviones de turbina
  (excepto turbohélices) de más de 5.700 kg o de más de 19 pasajeros, y 121.855(d) lo exige
  en versión 7.1 a todo avión que «pretenda volar en espacio aéreo con separación vertical
  mínima reducida (RVSM) o que realice operaciones internacionales».
- **Meteorología:** sin efecto directo; en IMC se pierde una capa de conciencia de tránsito.
- **Ruta:** vuelos internacionales o en RVSM pueden quedar fuera según la norma del Estado.
- **Capacidades:** NOTE 1: en aviones con T2CAS, también quedan inoperativos los modos 1-5
  del GPWS y el terreno. Un diferido se lleva otro sistema.
- **Impacto:** la decisión la marcan la ruta y el espacio aéreo, no el avión.

### Caso 6: múltiples MEL (frenos y reversor)

[ESPACIO PARA IMAGEN ANOTADA]
CÓDIGO: MEL-32-01 · Imagen anotada · 4:5 · 1080 × 1350 px
IMAGEN BASE:
Dos recortes reales, uno sobre otro: MMEL FAA A318-A321, Rev 32, página 32-10, ítem 32-42-01
Main Wheel Braking Systems (C | 4 | 3), y página 78-2, ítem 78-30-01 1) Thrust Reverser
Systems (C | 2 | 1). Una línea une los dos provisos que se cruzan.
ANOTACIONES:
→ FLECHA 1: «e) Both reversers operate normally,» (32-42-01)
EXPLICACIÓN: el alivio del freno pide los dos reversores.
→ FLECHA 2: «h) Main wheel braking system operates normally,» (78-30-01)
EXPLICACIÓN: el alivio del reversor pide el frenado normal.
→ FLECHA 3: «i) The AUTO/BRK Function is considered inoperative.» (32-42-01)
EXPLICACIÓN: diferir un freno arrastra el autofreno y sus propias condiciones.
OBJETIVO PEDAGÓGICO:
Que el piloto vea que dos entradas con check verde, juntas, no dejan salir.

**Qué dice cada flecha**

1. **«Both reversers operate normally».** Si ya hay un reversor diferido, el freno no se
   puede diferir. El piloto lo busca siempre que haya un diferido del mismo sistema de
   frenado o desaceleración.
2. **«Main wheel braking system operates normally».** Es el espejo: con un freno diferido, el
   reversor no se puede diferir.
3. **«Considered inoperative».** El autofreno se trata como inoperativo aunque funcione, y hay
   que cumplir su propia entrada (32-42-04: «a) Approach minimums do not require its use, and
   b) Normal braking is not affected»). PL-25: el ítem se trata como inoperativo para despacho
   y vuelo, con placard y cumpliendo sus Remarks.

**Entradas reales.**

| Ítem | Cat. | Inst. | Req. | Extracto de Remarks |
|---|---|---|---|---|
| 32-42-01 Main Wheel Braking Systems (p. 32-10) | C | 4 | 3 | «(M)(O) One brake may be inoperative provided: a) Minimum runway width is 148 ft. (45 meters), b) Antiskid system operates normally, c) Nose wheel steering operates normally, d) Affected brake is removed or deactivated, e) Both reversers operate normally, f) Green and yellow systems on operative brakes operate normally, g) AFM performance penalties are applied, h) Approach minimums do not require its use, and i) The AUTO/BRK Function is considered inoperative.» |
| 78-30-01 1) Thrust Reverser Systems, ceo (p. 78-2) | C | 2 | 1 | «(M)(O) One may be inoperative provided: [...] g) Wheel brake tachometers operate normally, h) Main wheel braking system operates normally, [...]» |

- **Alivio:** cada uno por separado; juntos, ninguno.
- **Condiciones:** se excluyen entre sí.
- **(M) y (O):** los dos ítems los tienen.
- **Meteorología y aeropuertos:** con un freno diferido, ancho mínimo de pista 45 m y
  penalizaciones de performance del AFM. Eso deja fuera pistas angostas en destino y alterno.
- **Capacidades:** sin autofreno; aproximaciones que lo exijan, fuera.
- **Impacto:** es el ejemplo exacto de la FAA: «inoperative components of a wheel braking
  system limiting the inoperability of the thrust reverser system» (8900.1 4-692).

### En pocas palabras

- Radar: la meteorología y la hora deciden si el alivio aplica.
- Autopiloto: se pierden aproximaciones y se suma carga de trabajo.
- Reversor: performance y técnica de aterrizaje.
- APU: ETOPS y equipos de tierra en cada escala, incluido el desvío.
- TCAS: ruta, RVSM y vuelos internacionales; en T2CAS se lleva el GPWS.
- Varias MEL: se cruzan los provisos, no se suman los checks.

FUENTES
- Verificado: MMEL FAA B-737, Rev 63a: páginas 22-1 (22-01A/B), 34-7 (34-15-01A/B/C), 34-25 (34-40A/B), 49-1 (49-01-02A), 78-1 (78-01-03).
- Verificado: MMEL FAA A318-A321, Rev 32: páginas 22-1 (22-10-01), 32-10 (32-42-01), 32-17 (32-42-04), 34-17 (34-41-01), 34-21 (34-43-01), 49-1 (49-10-01), 78-2 y 78-3 (78-30-01 1)).
- Verificado: PL-25 Rev 24: Required by 14 CFR, Considered Inoperative, Repair Category A; Apéndice A (Weather Radar §§ 121.357, 121.358; TCAS § 121.356).
- Verificado: FAA Order 8900.1 Vol 4 Cap 4 Secc 3, 4-692.
- Verificado: RAC 121 Enm. 10, 121.855 y 121.860.
- VERIFICAR: la página 78-1 de la MMEL B-737 dice «REVISION NO. 63 / DATE: 11/28/2022» y la tabla de contenido lista el capítulo 78 como «63 04/03/2026»: se cita la página tal cual.
- VERIFICAR: qué aproximaciones y operaciones en ruta exigen uno o dos autopilotos (incluido RVSM) contra el AFM, el FCOM y las autorizaciones del operador.
- VERIFICAR: cómo se aplica el alivio de TCAS con RAC 121.855(d) (RVSM e internacional) contra la MEL del operador aprobada por la UAEAC.
- VERIFICAR: ajustes de performance con reversor o freno inoperativo contra el AFM y el sistema de performance del operador.

---

## 37. ERRORES FRECUENTES EN ENTREVISTAS

Doce frases que se oyen en entrevistas y en la línea. Cada una con su corrección y de dónde
sale.

**1. «La MEL es la lista de cosas que pueden estar dañadas.»**
Corrección: es la lista de ítems que pueden estar inoperativos **bajo condiciones**, y todo
lo que no aparece en ella tiene que funcionar.
Fuente: PL-34 Rev 5, p. 3 («all equipment [...] not listed on the MEL must be operative»);
RAC 121.001 («a reserva de determinadas condiciones»).

**2. «MMEL y MEL son lo mismo.»**
Corrección: la MMEL es del tipo de avión; la MEL es del operador, para su configuración, y
aprobada por su autoridad. La MMEL no se usa para despachar.
Fuente: 8900.1 Vol 4 Cap 4 Secc 3, 4-681 y 4-682; SRVSOP MIA PIV-VI-C7 3.5 («La MMEL no puede
ser utilizada como una MEL para realizar despachos»).

**3. «Installed 2, Required 1: siempre puedo volar con uno.»**
Corrección: el número requerido vale solo si se cumplen los Remarks.
Fuente: PL-25 Rev 24, Number Required for Dispatch («providing the conditions specified in
the Remarks or Exceptions column are met»).

**4. «Category A significa reparar de inmediato.»**
Corrección: A significa que el plazo está escrito en los Remarks del ítem. Puede ser en
vuelos, días de vuelo u horas. Ejemplo real: A320, APU, «repairs are made within 4 flights».
Fuente: PL-25, Repair Category A; MMEL FAA A318-A321 Rev 32, ítem 49-10-01.

**5. «(O) significa optional.»**
Corrección: (O) es un procedimiento de operaciones **requerido** para planificar u operar con
el ítem inoperativo; normalmente lo cumple la tripulación.
Fuente: PL-25, (O).

**6. «(M) significa MEL.»**
Corrección: (M) es un procedimiento de mantenimiento que debe cumplirse **antes** de operar
con el ítem inoperativo.
Fuente: PL-25, (M).

**7. «Si está en la MEL, no importa la meteorología.»**
Corrección: muchos provisos dependen del tiempo. El radar solo se alivia si la norma no lo
exige, y en Colombia la norma lo exige de noche o en IMC con tormentas esperadas.
Fuente: MMEL FAA B-737 Rev 63a, 34-15-01A/B; RAC 121.860; 8900.1 4-691C (el plan de vuelo
debe tener en cuenta las limitaciones, incluida la meteorología).

**8. «Si hay MEL abierta, mantenimiento ya hizo todo.»**
Corrección: mantenimiento hace el (M); el (O) es de la tripulación, y el comandante verifica
el estado de cada anotación antes del vuelo. Si el (M) no está hecho, no se despega.
Fuente: PL-25, (M) y (O); 14 CFR 121.563; AC 120-125, 6.1.3.

**9. «Dos MEL siempre pueden coexistir.»**
Corrección: la interrelación se evalúa. Hay provisos que se excluyen: en el A320, un freno
diferido pide los dos reversores y un reversor diferido pide el frenado normal.
Fuente: PL-34 p. 4; 8900.1 4-692; RAC 91 Apéndice 2 (f); MMEL FAA A318-A321 Rev 32, 32-42-01
e) y 78-30-01 h).

**10. «La MEL es solo de mantenimiento.»**
Corrección: existe para que el piloto al mando decida si inicia el vuelo, y la tripulación
debe tener acceso directo a ella antes de cada vuelo.
Fuente: RAC 121.2615(a) y (c); 14 CFR 121.628(a)(2).

**11. «Un avión con MEL abierta no es aeronavegable.»**
Corrección: la MEL aprobada es un cambio aprobado al diseño de tipo; operando dentro de sus
condiciones, el avión mantiene la aeronavegabilidad y un nivel aceptable de seguridad.
Fuente: 14 CFR 121.628(a)(2); RAC 121.2615(c); 8900.1 4-681 («while maintaining the
airworthiness of the aircraft»).

**12. «La MEL permite ignorar el defecto hasta que expire.»**
Corrección: la MEL da un plazo máximo, no un permiso para olvidarse. Se repara en la primera
oportunidad, dentro de un programa de reparación controlado.
Fuente: PL-34 p. 4 («repairs be accomplished at the earliest opportunity»; «controlled and
sound repair program»); RAC 91 Apéndice 2 (e) («no se tiene la intención de permitir la
operación [...] durante un período indefinido»).

### En pocas palabras

- Condiciones siempre; lo no listado, operativo.
- MMEL del tipo, MEL del operador.
- (M) mantenimiento antes; (O) operaciones, requerido.
- A: plazo en los Remarks.
- Varias MEL se cruzan; plazo máximo no es plazo recomendado.

FUENTES
- Verificado: PL-34 Rev 5, pp. 3-4.
- Verificado: PL-25 Rev 24: Number Required for Dispatch, Repair Category A, (M), (O).
- Verificado: FAA Order 8900.1 Vol 4 Cap 4 Secc 3, 4-681, 4-682, 4-691C, 4-692.
- Verificado: AC 120-125, 6.1.3; 14 CFR 121.563 y 121.628.
- Verificado: RAC 121 Enm. 10, 121.2615 y 121.860; RAC 91 Enm. 12, Apéndice 2 (e) y (f).
- Verificado: SRVSOP MIA Enm. 13, PIV-VI-C7 3.5.
- Verificado: MMEL FAA A318-A321 Rev 32 (32-42-01, 49-10-01, 78-30-01); MMEL FAA B-737 Rev 63a (34-15-01).

---

## 38. LO QUE UN PILOTO DEBE MEMORIZAR

[ESPACIO PARA IMAGEN]
CÓDIGO: MEL-38-01 · Esquema · 9:16 · 1080 × 1920 px
IMAGEN SUGERIDA:
Tarjeta vertical tipo «kneeboard» en papel, con los 22 puntos numerados en dos bloques:
«QUÉ ES» (1 a 8) y «CÓMO SE USA» (9 a 22). Rótulos en mono y mayúsculas, acento del módulo
en los números.
OBJETIVO:
Una sola imagen para repasar antes de la entrevista o antes de aceptar un avión.

### Qué es

1. **MEL no es MMEL.** La MMEL es del tipo; la MEL es del operador.
2. **La MMEL es la base de la MEL.** La MEL se hace a partir de ella.
3. **La MEL es específica** del operador, de su configuración y de su operación, y la aprueba
   su autoridad (en Colombia, la UAEAC).
4. **Más restrictiva sí, menos nunca.** Ni que la MMEL, ni que la norma, ni que el AFM.
5. **No es un permiso general.** Es un alivio temporal con condiciones.
6. **Lo que no está en la MEL, funciona.** Si no está listado, no hay alivio.
7. **La MEL rige hasta el despegue.** Lo que falla después se maneja con el AFM y los
   procedimientos del operador, y se resuelve antes de la siguiente salida.
8. **La MMEL no se usa para despachar.**

### Cómo se usa

9. **Leer la entrada completa**, desde el capítulo hasta el último proviso.
10. **Primero la configuración.** Un sub-ítem de otro modelo o modificación no aplica.
11. **Installed no es Required.** Required vale solo si se cumplen los Remarks.
12. **Los Remarks son lo crítico.** «Provided» significa: solo si.
13. **(O):** procedimiento operacional requerido, normalmente de la tripulación.
14. **(M):** procedimiento de mantenimiento, antes del vuelo. El piloto verifica que esté
    firmado; no lo improvisa.
15. **Categorías A, B, C, D (sistema FAA, PL-25):** B 3 días, C 10 días, D 120 días
    calendario, excluyendo el día del descubrimiento. En Colombia, lo que fije la MEL aprobada.
16. **A depende del intervalo escrito en el ítem** (vuelos, días de vuelo, horas).
17. **Day of discovery:** el día en que se registró en el tech log; no cuenta en plazos de días.
18. **Un diferido requiere seguimiento:** fecha límite, condiciones y reparación.
19. **Placard:** avisa a tripulación y mantenimiento. En Colombia, leyenda «NO OPERATIVO».
20. **Mirar el impacto:** performance, combustible, meteorología, aproximaciones, RVSM, PBN,
    ETOPS/EDTO.
21. **Varias MEL = análisis conjunto.** Se cruzan provisos y carga de trabajo; se piensa en la
    siguiente falla en ruta.
22. **Entender las implicaciones antes de aceptar el avión.** Legal no siempre es apropiado
    para ese vuelo; la decisión del comandante va dentro de las políticas del operador.

FUENTES
- Verificado: PL-34 Rev 5, pp. 3-4; PL-25 Rev 24 (Day of Discovery, Repair Category A-D, (M), (O), Placarding, Number Required for Dispatch).
- Verificado: FAA Order 8900.1 Vol 4 Cap 4 Secc 3, 4-682, 4-685B1)c), 4-690A y 4-690C, 4-692.
- Verificado: RAC 121 Enm. 10, 121.001 y 121.2615; RAC 91 Enm. 12, 91.1105(a)(9) y Apéndice 2.
- Verificado: SRVSOP MIA Enm. 13, PIV-VI-C7 3.5 y 3.17.

---

## 39. PREGUNTAS TÍPICAS DE ENTREVISTA

Veinte preguntas en inglés, como las hacen en entrevista, con respuesta corta en inglés y una
línea en español. Las de intervalos usan el sistema FAA (PL-25); dilo así en la entrevista y
agrega que en Colombia rige la MEL aprobada del operador.

**1. What is an MEL?**
An operator-specific, approved document that lists the items that may be inoperative for
dispatch, and the conditions, limitations and procedures that must be met.
*En español: el documento del operador que dice qué puede estar inoperativo y bajo qué condiciones.*

**2. What is the difference between an MMEL and an MEL?**
The MMEL is the master list for the aircraft type. The MEL is built from it by the operator,
for its configuration and operation, and approved by its authority.
*En español: la MMEL es del tipo; la MEL, del operador.*

**3. Can an MEL be less restrictive than the MMEL?**
No. It can be more restrictive, never less.
*En español: más restrictiva sí, menos nunca.*

**4. What does (M) mean?**
A specific maintenance procedure that must be accomplished before operating with the item
inoperative, normally by maintenance.
*En español: procedimiento de mantenimiento, antes del vuelo.*

**5. What does (O) mean?**
A specific operations procedure required for planning or operating with the item
inoperative, normally done by the flight crew.
*En español: procedimiento de operaciones; no es opcional.*

**6. What are the repair categories?**
Under the FAA system: A, interval stated in the remarks; B, 3 consecutive calendar days; C,
10; D, 120, all excluding the day of discovery. In Colombia, the intervals in the operator's
approved MEL apply.
*En español: A según el ítem; B 3, C 10, D 120 días (FAA).*

**7. What is the day of discovery?**
The calendar day the malfunction was recorded in the logbook. It is excluded from the
interval.
*En español: el día en que se anotó; no cuenta.*

**8. A Category C item was logged at 10:00 on January 26. When does it expire?**
Under the FAA system, at 23:59 on February 5.
*En español: el conteo empieza a las 0000 del 27 y termina a las 2359 del 5 de febrero.*

**9. How is a Category A interval counted in flights?**
From the moment the item is deferred. If it is in calendar days or flight days, the day of
discovery is excluded.
*En español: en vuelos, desde el diferimiento; en días, sin el día del descubrimiento.*

**10. What does a dash in the "number installed" column mean?**
A variable number of items. The operator's MEL shows the actual number.
*En español: cantidad variable; la MEL pone el número real.*

**11. Two installed, one required. Can you always go with one inoperative?**
No. Only if every condition in the remarks is met.
*En español: el número no autoriza; los Remarks sí.*

**12. What is the most important column?**
Remarks or Exceptions. That is where the relief and its provisos are.
*En español: Remarks, porque ahí están las condiciones.*

**13. What is the difference between a proviso and a note?**
A proviso is a condition you must comply with. A note gives information and is not part of
the proviso.
*En español: el proviso obliga; la nota informa.*

**14. The item is not in the MEL. What do you do?**
There is no relief. It must be repaired before takeoff, or another approved means must be
used.
*En español: sin ítem en la MEL, no hay alivio.*

**15. Does the MEL apply to a failure after takeoff?**
No. In flight you follow the AFM and the operator's procedures. It must be addressed before
the next departure.
*En español: la MEL rige hasta el despegue.*

**16. How do you deal with multiple MEL items?**
You check how they interact, the provisos that cross, the crew workload and what happens if
something else fails en route.
*En español: se analizan juntas, no una por una.*

**17. Why is an inoperative item placarded?**
To inform and remind the crew and maintenance of the item's condition, as close as practical
to the control or indicator.
*En español: para que nadie lo use por error; en Colombia, «NO OPERATIVO».*

**18. What is the difference between the MEL and the CDL?**
The MEL covers inoperative equipment. The CDL covers external parts that may be missing,
with their performance penalties.
*En español: MEL, equipo inoperativo; CDL, partes externas faltantes.*

**19. Who is responsible for accepting the aircraft?**
The pilot in command decides whether the flight can start, together with dispatch and the
operator's operational control.
*En español: el comandante decide, dentro del control operacional del operador.*

**20. Can an aircraft with an inoperative item still be dispatched legally?**
Yes, if the item is in the approved MEL, all its conditions and procedures are met, it is
within its repair interval, it is recorded and placarded, and the flight's limitations are
accounted for.
*En español: sí, con todas las condiciones cumplidas y documentadas.*

FUENTES
- Verificado: PL-25 Rev 24: Dash, Day of Discovery, Repair Category A-D (ejemplo del 26 de enero), (M), (O), Placarding, Proviso y NOTE, Number Required for Dispatch.
- Verificado: PL-34 Rev 5, pp. 3-4.
- Verificado: FAA Order 8900.1 Vol 4 Cap 4 Secc 1, 4-623B (CDL); Secc 3, 4-682, 4-685B1)c), 4-690C, 4-691A, 4-692.
- Verificado: 14 CFR 91.7(b), 121.533(b), 121.628; RAC 121.2615(a); RAC 91.1105(a)(9).

---

## 40. MINI SIMULADOR DE MEL

[ESPACIO PARA IMAGEN]
CÓDIGO: MEL-40-01 · Esquema · 9:16 · 1080 × 1920 px
IMAGEN SUGERIDA:
Pantalla de simulador: arriba la entrada de la MEL en su tabla de cuatro columnas; en medio,
la situación del día (tech log, hora, meteorología); abajo, diez casillas numeradas para las
respuestas y un botón «Ver solución». Estilo EFB, fondo papel, acento del módulo.
OBJETIVO:
Que el piloto practique el mismo orden de lectura diez veces, con entradas distintas y
trampas distintas.

### Cómo se usa

Diez ejercicios sobre una Aeronave de ejemplo. Las entradas son inventadas. En cada uno
responde estas diez preguntas antes de mirar la solución:

1. ¿Qué sistema es?
2. ¿Qué categoría tiene y hasta cuándo va el plazo?
3. ¿Cuántos hay instalados?
4. ¿Cuántos se requieren para despacho?
5. ¿Hay (M)? ¿Está cumplido?
6. ¿Hay (O)? ¿Qué le toca a la tripulación?
7. ¿Qué condiciones hay y se cumplen hoy?
8. ¿Qué impacto tiene en el vuelo?
9. ¿Qué más hay que consultar?
10. ¿Hay elementos suficientes para decidir? ¿Cuál es la decisión?

Los plazos siguen el sistema FAA (PL-25); en Colombia rigen los de la MEL aprobada del
operador. No todas las respuestas son obvias, y a veces la respuesta correcta es «falta
información».

### Ejercicio 1: luces de aterrizaje

| Seq. | Item | Cat. | Inst. | Req. | Remarks or Exceptions |
|---|---|---|---|---|---|
| 33-86-01 | Landing Lights | C | 4 | - | One or more may be inoperative provided for night operations at least one landing light on each side operates normally. |

Situación: exterior izquierda inoperativa; interior izquierda y las dos derechas funcionan.
Salida 17:20 local, llegada 18:55 local, después de la puesta del sol. Tech log con anotación
y placard, registrado hoy.

| # | Solución |
|---|---|
| 1 | Luces de aterrizaje, ATA 33 Lights. |
| 2 | C: 10 días calendario sin contar hoy (FAA). |
| 3 | 4. |
| 4 | «-»: variable. Depende de si hay operación nocturna. La MEL del operador debería mostrar el número real. |
| 5 | No hay (M). |
| 6 | No hay (O). |
| 7 | De noche, al menos una por lado. Queda la interior izquierda y las dos derechas: se cumple. |
| 8 | Aterrizaje nocturno con menos iluminación de un lado. Sin impacto en performance. |
| 9 | Que la interior izquierda se haya probado en el prevuelo. |
| 10 | Sí, hay elementos. Se sale. La trampa es pensar que, como la llegada es de noche, no se puede. |

### Ejercicio 2: una prohibición escondida en los Remarks

| Seq. | Item | Cat. | Inst. | Req. | Remarks or Exceptions |
|---|---|---|---|---|---|
| 30-86-01 | Wing Illumination Lights | C | 2 | 0 | May be inoperative provided airplane is not operated at night in known or forecast icing conditions. |

Situación: luz izquierda inoperativa. Salida 21:40 local. El pronóstico trae engelamiento
ligero en el ascenso. Tech log y placard en orden.

| # | Solución |
|---|---|
| 1 | Luces de inspección de ala (ver hielo de noche), ATA 30 Ice and Rain Protection en esta MEL. |
| 2 | C: 10 días (FAA). |
| 3 | 2. |
| 4 | 0. |
| 5 | No hay (M). |
| 6 | No hay (O). |
| 7 | Prohibido de noche con hielo conocido o pronosticado. Hoy hay las dos cosas: no se cumple. |
| 8 | Sin la luz no se puede ver la acumulación en el ala de noche. |
| 9 | Si hay otra forma aprobada de cumplir, solo la dará la MEL del operador; aquí no la hay. |
| 10 | Sí, hay elementos: no se sale con esta condición. El número «0» no vale porque el proviso no se cumple. |

### Ejercicio 3: (M) sin completar

| Seq. | Item | Cat. | Inst. | Req. | Remarks or Exceptions |
|---|---|---|---|---|---|
| 36-85-01 | Engine Bleed Air System | C | 2 | 1 | (M)(O) One may be inoperative provided: a) Associated bleed valve is secured closed, and b) Flight altitude is limited as specified in the (O) procedure. |

Situación: tech log con «BLEED 2 INOP, diferido MEL 36-85-01». Casilla del (M) sin firma.
Plan en un nivel dentro del límite de la (O).

| # | Solución |
|---|---|
| 1 | Sangrado de aire del motor 2, ATA 36 Pneumatic. |
| 2 | C: 10 días (FAA). |
| 3 | 2. |
| 4 | 1. |
| 5 | Sí. **No está cumplido**: no hay firma. |
| 6 | Sí: limitación de altitud; el plan ya la respeta. |
| 7 | a) sin constancia; b) se cumple. |
| 8 | Nivel limitado, más consumo; una sola fuente de sangrado en vuelo. |
| 9 | Mantenimiento: que cumpla y firme el (M) y ponga el placard. |
| 10 | Sí, hay elementos: todavía no se sale. Se sale cuando el (M) esté firmado. |

### Ejercicio 4: plazo vencido

| Seq. | Item | Cat. | Inst. | Req. | Remarks or Exceptions |
|---|---|---|---|---|---|
| 21-86-01 | Cabin Zone Temperature Sensor | C | 3 | 2 | (O) One may be inoperative provided associated zone temperature is controlled manually. |

Situación: registrado el 20 de junio a las 22:10 UTC. El operador cuenta en UTC. Hoy es 1 de
julio, salida 06:00 UTC. El tech log no muestra extensión.

| # | Solución |
|---|---|
| 1 | Sensor de temperatura de zona de cabina, ATA 21 Air Conditioning. |
| 2 | C. El 20 no cuenta; cuentan del 21 al 30 de junio. Venció a las 2359 UTC del 30 de junio. |
| 3 | 3. |
| 4 | 2. |
| 5 | No hay (M). |
| 6 | Sí: control manual de la temperatura de esa zona. |
| 7 | Técnicamente se cumplirían, pero el plazo ya pasó. |
| 8 | Ninguno, porque el alivio ya no existe. |
| 9 | Si hay una extensión aprobada según el procedimiento del operador (FAA: única, solo B y C, 8900.1 4-689). |
| 10 | Sí, hay elementos: no se sale sin reparación o extensión documentada. La trampa es contar el 20 como día 1. |

### Ejercicio 5: la fila de otra configuración

| Seq. | Item | Cat. | Inst. | Req. | Remarks or Exceptions |
|---|---|---|---|---|---|
| 32-85-01 | Brake Temperature Monitoring System | | | | |
| 1) | Aircraft with Mod. 1234 | C | 1 | 0 | (O) May be inoperative provided brake temperatures are checked as specified in the (O) procedure. |
| 2) | Aircraft without Mod. 1234 | C | 1 | 0 | (M)(O) May be inoperative provided: a) Brake temperatures are checked by maintenance before each departure, and b) (O) procedure is used. |

Situación: el tech log difiere por 32-85-01 1). Según los registros, este avión **no** tiene
la Mod. 1234. No hay (M) firmado.

| # | Solución |
|---|---|
| 1 | Monitoreo de temperatura de frenos, ATA 32 Landing Gear. |
| 2 | C: 10 días (FAA). |
| 3 | 1. |
| 4 | 0. |
| 5 | En la fila correcta, 2), sí hay (M), y no está hecho. |
| 6 | Sí, en ambas filas. |
| 7 | La fila 1) no aplica a este avión. La 2) pide la verificación por mantenimiento antes de cada salida: no hay constancia. |
| 8 | Sin monitoreo de temperatura de frenos: atención a tiempos de escala cortos y frenadas fuertes. |
| 9 | Mantenimiento: corregir la referencia MEL y cumplir el (M) de la fila 2). |
| 10 | Sí, hay elementos: así como está, no se sale. El diferido cita un alivio que no existe para este avión. |

### Ejercicio 6: dos ítems que se suman en la aproximación

| Seq. | Item | Cat. | Inst. | Req. | Remarks or Exceptions |
|---|---|---|---|---|---|
| 34-86-01 | Radio Altimeter | A | 2 | 1 | (O) One may be inoperative provided: a) Approach minimums do not require its use, and b) Repairs are made within 3 flight-days. |
| 22-85-01 | Autopilot | C | 2 | 1 | (O) One may be inoperative provided approach minimums do not require its use. |

Situación: radioaltímetro 1 diferido ayer a las 16:00. Hoy se difiere el autopiloto 2.
Destino con pronóstico de niebla por debajo de los mínimos CAT I a la hora de llegada; el
alterno está en CAT I holgado.

| # | Solución |
|---|---|
| 1 | Radioaltímetro (ATA 34) y autopiloto (ATA 22). |
| 2 | RA: A, 3 días de vuelo sin contar el día del descubrimiento (ayer); hoy es el primero. Autopiloto: C, 10 días (FAA). |
| 3 | 2 y 2. |
| 4 | 1 y 1. |
| 5 | Ninguno tiene (M). |
| 6 | Ambos: planificación con los mínimos disponibles. |
| 7 | Cada uno se cumple si la aproximación no los requiere. Juntos, pueden dejar al avión sin capacidad por debajo de CAT I. |
| 8 | Si solo queda CAT I, el destino no es aterrizable a la hora prevista: hay que planear con el alterno y el combustible para llegar a él. |
| 9 | AFM y manual del operador: qué exige cada categoría de aproximación; despacho: alterno y combustible. |
| 10 | Falta información para cerrar: qué aproximaciones quedan autorizadas con esta combinación. Con eso, la salida es posible solo si el plan no depende de una aproximación por debajo de CAT I. |

### Ejercicio 7: categoría A contada en vuelos

| Seq. | Item | Cat. | Inst. | Req. | Remarks or Exceptions |
|---|---|---|---|---|---|
| 26-85-01 | Lavatory Smoke Detector | A | 2 | 1 | (M)(O) One may be inoperative provided: a) Associated lavatory is locked closed and not used, and b) Repairs are made within 3 flights. |

Situación: diferido esta mañana antes del primer vuelo, (M) firmado y placard puesto. Vuelos
hechos: BOG-MDE, MDE-BOG, BOG-CTG. Te toca CTG-BOG.

| # | Solución |
|---|---|
| 1 | Detector de humo del baño, ATA 26 Fire Protection. |
| 2 | A: 3 vuelos, contados desde que se difirió (PL-25, Category A en vuelos). |
| 3 | 2. |
| 4 | 1. |
| 5 | Sí, cumplido y firmado. |
| 6 | Sí: baño cerrado y fuera de servicio; aviso a la tripulación de cabina. |
| 7 | a) se cumple; b) ya se hicieron los 3 vuelos. |
| 8 | El tuyo sería el cuarto. |
| 9 | Si el diferido se hizo antes del primer vuelo (sí) y si hay extensión: una categoría A no se extiende (8900.1 4-689F). |
| 10 | Sí, hay elementos: no se sale. La trampa es contar días en vez de vuelos. |

### Ejercicio 8: sin la meteorología no se decide

| Seq. | Item | Cat. | Inst. | Req. | Remarks or Exceptions |
|---|---|---|---|---|---|
| 34-85-01 | Weather Radar System | C | 1 | 0 | May be inoperative provided weather radar is not required by the operating rules. |

Situación: radar inoperativo, anotado y con placard. Salida 18:10 local. El paquete de
despacho todavía no trae el pronóstico de ruta.

| # | Solución |
|---|---|
| 1 | Radar meteorológico, ATA 34 Navigation. |
| 2 | C: 10 días (FAA). |
| 3 | 1. |
| 4 | 0. |
| 5 | No hay (M). |
| 6 | No hay (O). |
| 7 | Depende de si la norma lo exige: en Colombia, RAC 121.860 (noche o IMC con tormentas esperadas). |
| 8 | Si se sale: sin detección de tormentas. |
| 9 | Pronóstico de ruta, destino y alterno; hora real de llegada; condiciones IMC. |
| 10 | **Falta información.** Con tormentas esperadas de noche o en IMC, no; sin ellas, sí. |

### Ejercicio 9: la NOTE no es un proviso

| Seq. | Item | Cat. | Inst. | Req. | Remarks or Exceptions |
|---|---|---|---|---|---|
| 34-87-01 | Predictive Windshear System | B | 1 | 0 | (O) May be inoperative provided alternate procedures are established and used. NOTE: Reactive windshear warning remains available if operative. |

Situación: el primer oficial dice que no se puede salir porque el sistema reactivo tiene una
falla intermitente anotada hace un mes y cerrada. Hoy funciona y no hay otro diferido.

| # | Solución |
|---|---|
| 1 | Windshear predictivo, ATA 34. |
| 2 | B: 3 días calendario sin contar el de hoy (FAA). |
| 3 | 1. |
| 4 | 0. |
| 5 | No hay (M). |
| 6 | Sí: procedimientos alternos (repaso de evitar y recuperar de windshear). |
| 7 | Un solo proviso: procedimientos alternos. Se cumple con el (O). |
| 8 | Sin aviso predictivo; más atención a reportes de windshear y convección en despegue y aproximación. |
| 9 | Que el reactivo no tenga un diferido abierto: está cerrado y operativo. |
| 10 | Sí, hay elementos: se sale con el (O). La NOTE informa, no condiciona (PL-25: «A note is not a part of the proviso»). |

### Ejercicio 10: «considered inoperative» que cambia el nivel

| Seq. | Item | Cat. | Inst. | Req. | Remarks or Exceptions |
|---|---|---|---|---|---|
| 34-88-01 | Air Data Computer | C | 3 | 2 | (M) One may be inoperative provided: a) Associated ADC is deactivated, and b) Altitude Alerting System is considered inoperative. |
| 34-89-01 | Altitude Alerting System | C | 1 | 0 | (O) May be inoperative provided airplane is not operated in RVSM airspace. |

Situación: ADC 2 falla. (M) firmado. El plan de vuelo es en un nivel RVSM.

| # | Solución |
|---|---|
| 1 | Computador de datos de aire, y por arrastre alerta de altitud, ATA 34. |
| 2 | Ambos C: 10 días (FAA). |
| 3 | 3 y 1. |
| 4 | 2 y 0. |
| 5 | Sí, en el ADC: cumplido. |
| 6 | Sí, en la alerta de altitud: no operar en RVSM. |
| 7 | La alerta funciona, pero se trata como inoperativa (PL-25, Considered Inoperative), así que se aplica su entrada: fuera de RVSM. El plan actual no la cumple. |
| 8 | Nivel por debajo de RVSM: más consumo, otra ruta posible, coordinación con ATC. |
| 9 | Despacho: nuevo plan y combustible; alterno con el nuevo consumo. |
| 10 | Sí, hay elementos: con el plan actual, no. Con plan fuera de RVSM y combustible recalculado, sí. |

### En pocas palabras

- El mismo orden de lectura, siempre: sistema, configuración, categoría, números, provisos,
  (M), (O), impacto.
- Las trampas están en los Remarks, en las fechas y en las filas de configuración.
- «Considered inoperative» trae la otra entrada completa.
- Una NOTE informa; un proviso obliga.
- «Falta información» es una respuesta válida: se pide el dato antes de decidir.

FUENTES
- Verificado: PL-25 Rev 24: Repair Category A-D, Day of Discovery, Flight-Day, Considered Inoperative, NOTE, Proviso, Dash, (M), (O).
- Verificado: FAA Order 8900.1 Vol 4 Cap 4 Secc 3, 4-685B4)b) y 4-689 (incluido 4-689F: no se extiende la categoría A).
- Verificado: RAC 121 Enm. 10, 121.860.
- VERIFICAR: qué aproximaciones exigen radioaltímetro y autopiloto en cada categoría, contra el AFM y el manual de operaciones del operador.

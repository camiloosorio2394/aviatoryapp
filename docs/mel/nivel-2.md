# Minimum Equipment List (MEL) · Nivel 2: Leer una entrada

Este nivel enseña a leer una entrada de MEL de izquierda a derecha, columna por columna, sin
saltarse nada. Todos los ejemplos reales salen de dos MMEL públicas de la FAA: la del Airbus
A318/A319/A320/A321 (Rev 32) y la del Boeing 737 (Rev 63a). Son MMEL del tipo, no la MEL de
ningún operador: la MEL con la que se despacha es la aprobada para el operador y su
configuración, y puede ser más restrictiva.

Cómo se cita una entrada real en este nivel: documento, revisión general, página, revisión de esa
página e ítem. Cada página de una MMEL lleva su propia revisión (se ve en el capítulo 4).

---

## 4. ESTRUCTURA DE UNA MEL

### ¿Qué es?

La MEL se organiza en páginas de sistema. PL-25 Rev 24 las describe así: «The MMEL system page
is divided into columns that include sequence number, item, repair category, number installed,
number required for dispatch, and remarks or exceptions, as well as provision for a vertical
change bar.» Cada fila es una entrada: un equipo y las condiciones con las que puede estar
inoperativo al despacho.

### Lo que debe saber un piloto

- Una entrada se lee completa: número, ítem, categoría, instalados, requeridos y, sobre todo,
  Remarks or Exceptions.
- Un mismo ítem puede tener **dos o más filas**: son alivios distintos, cada uno con su
  categoría y sus condiciones. Se usa la fila cuyas condiciones se cumplen.
- La cabecera de la página dice a qué avión aplica, qué capítulo es y qué revisión tiene esa
  página.

### Cómo se ve en la MEL

```
[ESPACIO PARA IMAGEN ANOTADA]
CÓDIGO: MEL-04-01 · Imagen anotada · 4:5 vertical · 1200×1500 px
IMAGEN BASE:
Recreación fiel (misma tipografía de tabla, mismas columnas, texto copiado letra por letra) de
la página 22-1 de la MMEL FAA A318-A321, Rev 32 (revisión de la página: 32, fecha 07/30/2025),
ítem 22-10-01 Autopilot Systems. Debajo, un recuadro pequeño (inserto) con la fila 02-02 de la
página 32-1 de la MMEL FAA B-737, Rev 63a (revisión de la página: 63, 04/03/2026), ítem
32-02 Antiskid System, para mostrar el símbolo (M) que la entrada del autopiloto no tiene.

Texto de la página principal, tal cual:
  REVISION NO. 32 · DATE: 07/30/2025 · PAGE NO. 22-1 · AIRCRAFT: Airbus A320
  TABLE KEY 1. REPAIR CATEGORY 2. NO. INSTALLED 3. NO. REQUIRED FOR DISPATCH
  4. REMARKS OR EXCEPTIONS
  22. Autoflight
  Sequence No. | Item | 1 | 2 | 3 | 4 | Change Bar
  22-10-01 | Autopilot Systems | C | 2 | 1 | (O) One may be inoperative provided approach
      minimums do not require its use.
           |                   | B | 2 | 0 | (O) May be inoperative provided:
      a) Approach minimums do not require their use,
      b) Enroute operations do not require their use, and
      c) Number of flight segments and segment duration is acceptable to flightcrew.
      NOTE: Any Mode which operates normally may be used.

Texto del inserto, tal cual:
  02 Antiskid System
  02-02 (-600/-700/-800/-900/-900ER) | C | 1 | 0 | (M)(O) May be inoperative provided:
      a) Associated Antiskid channel(s) is deactivated, and
      b) Operations are conducted in compliance with AFM.

ANOTACIONES:
→ FLECHA 1: «22. Autoflight»
EXPLICACIÓN: capítulo ATA. Dice en qué sistema del avión estás.
→ FLECHA 2: «22-10-01 Autopilot Systems»
EXPLICACIÓN: número de secuencia e ítem. Identifica exactamente qué equipo cubre la entrada.
→ FLECHA 3: «C» (primera fila) y «B» (segunda fila)
EXPLICACIÓN: categoría de reparación. Fija el plazo para reparar.
→ FLECHA 4: «2»
EXPLICACIÓN: número instalado. El avión considerado tiene dos autopilotos.
→ FLECHA 5: «1» (primera fila) y «0» (segunda fila)
EXPLICACIÓN: número requerido para despacho, siempre sujeto a lo que diga la columna 4.
→ FLECHA 6: toda la columna «4. REMARKS OR EXCEPTIONS»
EXPLICACIÓN: las condiciones del alivio. Aquí está la autorización de verdad.
→ FLECHA 7: «(O)»
EXPLICACIÓN: hay un procedimiento de operaciones que cumplir.
→ FLECHA 8 (en el inserto B737): «(M)(O)»
EXPLICACIÓN: (M) exige un procedimiento de mantenimiento antes de operar. La entrada del
autopiloto del A320 no lo trae; la del antiskid del B737 trae los dos.
→ FLECHA 9: «provided: a) … b) … c) …»
EXPLICACIÓN: provisos. Condiciones que se deben cumplir todas.
→ FLECHA 10: «NOTE: Any Mode which operates normally may be used.»
EXPLICACIÓN: nota. Información adicional; no forma parte del proviso.
→ FLECHA 11: «REVISION NO. 32 · DATE: 07/30/2025 · PAGE NO. 22-1»
EXPLICACIÓN: revisión de esa página, no necesariamente la de todo el documento.

OBJETIVO PEDAGÓGICO:
Que el piloto reconozca de un vistazo las seis columnas y los símbolos, y entienda que la
decisión se toma en la columna 4, no en los números.
```

**Qué significa cada flecha, qué mira el piloto y por qué importa**

1. **Capítulo ATA («22. Autoflight»).** Es el sistema. El piloto lo usa para llegar rápido al
   ítem: el defecto del autopiloto está en el 22, no en el 34 (navegación). Importa porque buscar
   en el capítulo equivocado es la forma más común de no encontrar un ítem que sí existe.
2. **Sequence No. e Item («22-10-01 Autopilot Systems»).** PL-25 define Item como «An
   instrument, equipment, system, component, message, or function that is installed on or
   exhibited by the aircraft.» El piloto confirma que el ítem de la MEL es exactamente lo que
   está anotado en el tech log. Importa porque el alivio cubre ese ítem y no uno parecido.
3. **Repair Category («C» / «B»).** Con una unidad inoperativa el plazo es de categoría C; con
   las dos, de categoría B, que es más corto. El piloto mira la fecha límite en el registro del
   diferido. Importa porque un ítem vencido deja de tener alivio (capítulos 7 y 8).
4. **Number Installed («2»).** Cuántos hay en el avión considerado por la MMEL. El piloto lo
   compara con lo que tiene su avión. Importa porque todo el cálculo parte de aquí.
5. **Number Required for Dispatch («1» / «0»).** El mínimo para salir, pero PL-25 lo condiciona:
   «providing the conditions specified in the Remarks or Exceptions column are met». El piloto
   no se queda en el número. Importa porque «0» no significa «da igual»: la fila B con «0» es la
   que más condiciones trae.
6. **Remarks or Exceptions.** Contiene el permiso y sus condiciones. El piloto lo lee entero,
   palabra por palabra. Importa porque ahí está lo que cambia el vuelo (mínimos de
   aproximación, ruta, número de tramos).
7. **(O).** PL-25: «a requirement for a specific operations procedure that must be accomplished
   in planning for or operating with the listed item inoperative». El piloto busca ese
   procedimiento en la MEL de su operador. Importa porque normalmente lo cumple la tripulación.
8. **(M).** PL-25: «a requirement for a specific maintenance procedure that must be accomplished
   prior to operation with the listed item inoperative». El piloto verifica en el tech log que
   mantenimiento lo registró como cumplido. Importa porque sin él no se opera con el alivio.
9. **Provisos (a, b, c).** PL-25: «A proviso is used to stipulate conditions or limitations that
   must be complied with for operation with the listed item inoperative.» El piloto los revisa
   uno por uno contra su vuelo: ¿los mínimos del destino exigen autopiloto? ¿la ruta? ¿cuántos
   tramos hay hoy? Importa porque se cumplen todos o no hay alivio.
10. **NOTE.** PL-25: «Notes provide additional information for crewmember or maintenance
    consideration. [...] A note is not a part of the proviso.» El piloto la lee como ayuda
    (aquí: los modos que funcionen se pueden usar). Importa porque una nota no reemplaza ni
    relaja un proviso.
11. **Cabecera de la página.** La página 22-1 está en revisión 32, pero en la misma MMEL la
    página 49-1 sigue en revisión 30 (03/03/2023). El piloto confirma que consulta la revisión
    vigente de su MEL. Importa porque una página vieja puede tener otro alivio.

Además, PL-25 describe la **barra vertical** («Change Bar») de la última columna: «A vertical
bar indicates a change, addition, or deletion of content in the adjacent row of text for the
current revision of that page only.» Si aparece junto a una fila, esa fila cambió en esta
revisión.

### Aplicación en la operación

En la línea, el tech log dice, por ejemplo, «AP 2 inoperativo, diferido MEL 22-10-01». El piloto
abre esa entrada, identifica que aplica la fila de una unidad (C, 2, 1) y se pregunta lo que pide
el proviso: ¿la aproximación prevista en destino o alterno exige autopiloto? Si la respuesta es
sí, el alivio no sirve para ese vuelo aunque el número diga «1».

### Error frecuente

Leer solo las columnas numéricas («2 instalados, 1 requerido, listo») y no la columna 4. El
permiso está en la columna 4.

### En pocas palabras

- Seis columnas: secuencia, ítem, categoría, instalados, requeridos, Remarks or Exceptions.
- Un ítem puede tener varias filas: son alivios distintos con condiciones distintas.
- (M) es mantenimiento, (O) es operaciones; pueden ir juntos.
- Los provisos se cumplen todos; las notas informan pero no son proviso.
- Cada página tiene su revisión.

FUENTES
- Verificado: MMEL FAA A318-A321, Rev 32, página 22-1 (rev. 32, 07/30/2025), ítem 22-10-01;
  página 49-1 (rev. 30, 03/03/2023).
- Verificado: MMEL FAA B-737, Rev 63a, página 32-1 (rev. 63, 04/03/2026), ítem 32-02-02.
- Verificado: PL-25 Rev 24 (04/13/2026), definiciones Item, System Page, Number Required for
  Dispatch, Proviso, NOTE, Vertical Bar, (M), (O).

---

## 5. ATA CHAPTER

### ¿Qué es?

Las MMEL ordenan los ítems por capítulos de sistema con numeración de estilo ATA. La 8900.1
Vol 4 Cap 4 Secc 3, 4-685A, lo dice así: «An MMEL contains ATA or JASC system pages». El número
del capítulo aparece arriba en cada página («22. Autoflight») y en el número de página
(«PAGE NO. 22-1»: capítulo 22, página 1).

### Lo que debe saber un piloto

No hay que memorizar el catálogo. Basta con reconocer los capítulos que más aparecen en un
diferido y saber que **el mismo número es el mismo sistema en Airbus y en Boeing**.

### Cómo se ve en la MEL

Así se titulan en las dos MMEL de referencia (texto tal cual):

| Capítulo | Título en la MMEL | Ejemplo de ítem |
|---|---|---|
| 21 | Air Conditioning | presurización (A320 21-31-01) |
| 22 | Autoflight | autopiloto (A320 22-10-01; B737 22-01) |
| 23 | Communications | ELT (B737 23-12) |
| 24 | Electrical Power | generadores, baterías |
| 27 | Flight Controls | spoilers |
| 28 | Fuel | bombas, indicación |
| 30 | Ice and Rain Protection | válvulas de antihielo de motor (A320 30-21-01) |
| 31 | Indicating/Recording Systems | pantallas, registradores |
| 32 | Landing Gear | antiskid, autobrake (B737 32-02; A320 32-42-04) |
| 34 | Navigation | radar meteorológico, TCAS (A320 34-41-01, 34-43-01) |
| 36 | Pneumatic | sangrado |
| 49 | Airborne Auxiliary Power | APU (A320 49-10-01; B737 49-01) |
| 78 | Engine Exhaust | reversores (A320 78-30-01; B737 78-01) |

Dos detalles que confunden: el A320 escribe «31. Indicating/Recording Systems» y el B737 usa
las dos formas («Indicating/Recording» y «Indicating/Recording Systems»); y los reversores no
están en un capítulo de «motor» genérico sino en el **78, Engine Exhaust**, en las dos MMEL.

```
[ESPACIO PARA IMAGEN]
CÓDIGO: MEL-05-01 · Esquema · 16:9 · 1600×900 px
IMAGEN SUGERIDA:
Silueta genérica de un birreactor de pasillo único (sin marca ni librea) en vista lateral y
cabina. Etiquetas numeradas sobre cada zona: 21 (packs), 22 (panel de autopiloto), 23 (antenas),
24 (generadores), 27 (superficies de mando), 28 (tanques), 30 (borde de ataque y parabrisas),
31 (pantallas), 32 (tren), 34 (radomo y antenas de navegación), 36 (conductos de sangrado),
49 (cono de cola, APU), 78 (reversores).
OBJETIVO:
Asociar el número de capítulo con la zona física del avión para encontrar un ítem sin adivinar.
```

### Aplicación en la operación

El tech log o el mensaje del avión dicen qué falló; el piloto traduce eso a sistema y a
capítulo. En una MEL impresa se va al capítulo; en una MEL digital, el capítulo sirve para
filtrar la búsqueda.

### Error frecuente

Buscar por intuición («el reversor es motor, capítulo 71») y concluir que el ítem no existe. Si
no aparece donde lo esperabas, busca por el nombre del equipo en el índice.

### En pocas palabras

- El capítulo ATA es la puerta de entrada al ítem.
- «PAGE NO. 22-1» es capítulo 22, página 1.
- Mismo número, mismo sistema en Airbus y Boeing.
- Reversores: capítulo 78, Engine Exhaust. APU: capítulo 49.

FUENTES
- Verificado: títulos de capítulo tal como aparecen en las cabeceras de la MMEL FAA A318-A321
  Rev 32 y de la MMEL FAA B-737 Rev 63a.
- Verificado: 8900.1 Vol 4 Cap 4 Secc 3 (CHG 933), 4-685A.

---

## 6. ITEM

### ¿Qué es?

La columna Item dice qué está cubierto. PL-25: «An instrument, equipment, system, component,
message, or function that is installed on or exhibited by the aircraft.» Es decir, un ítem puede
ser un sistema entero (TCAS), un componente (un transceptor), una función (AUTO TILT) o un
mensaje.

### Lo que debe saber un piloto

- Muchos ítems tienen **niveles**: el sistema, luego subítems, luego variantes por
  configuración. El alivio correcto es el del nivel exacto que falló.
- Si el operador no puso un ítem de la MMEL en su MEL, ese ítem no tiene alivio: 8900.1 4-685B1)c)
  «If an operator does not list a particular MMEL item in its MEL, that item is not subject to
  MEL relief and must be operative at takeoff.»
- El operador puede desglosar más. Ejemplo de la 8900.1 4-685B1)d)2.a.: si la MMEL lista
  «autopilot», el operador puede listar los modos (HDG, VOR/LOC, ALT) por separado; si no lo
  hizo y falla un modo, «the operator would have to defer the autopilot system».

### Cómo se ve en la MEL

**Airbus y Boeing numeran distinto.**

| | Airbus (MMEL FAA A318-A321 Rev 32) | Boeing (MMEL FAA B-737 Rev 63a) |
|---|---|---|
| Ítem | seis dígitos: «22-10-01» | corto, dentro del capítulo: «01» |
| Subítem | «1)», «2)» | «01-01», «01-02» |
| Alternativas de alivio | filas sin letra, una debajo de otra | con letra: «01A», «01B», «01-01A» |
| Variante de configuración | en el texto del ítem: «A321 with Mod. 163213/MP J4530» | en el texto del ítem: «(-600/-700/-800/-900/-900ER)» |
| Cómo se cita dentro de la MMEL | «22-10-01» | «MMEL Item 21-01» (capítulo más secuencia) |

Tres niveles reales en el B737 (MMEL FAA B-737, Rev 63a, página 49-1, rev. 63, 04/03/2026):

| Seq. | Item | Cat. | Inst. | Req. | Remarks or Exceptions |
|---|---|---|---|---|---|
| 01 | Auxiliary Power Unit (APU) | | | | |
| 01-01 | Airplane without APU APS2000 | | | | |
| 01-01A | | C | 1 | 0 | Except for ETOPS, may be inoperative provided procedures do not require its use. |
| 01-01B | | C | 1 | 0 | (M)(O) Except for ETOPS, may be removed provided: a) Procedures do not require its use, b) APU system is deactivated, c) APU compartment is inspected after first flight and then every 100 flight hours, and d) Removed APU is accounted for in the airplane weight and balance. |
| 01-02 | Airplane with APU APS2000 | | | | |
| 01-02A | | C | 1 | 0 | (M) Except for ETOPS, may be inoperative provided: a) Procedures do not require its use, and b) Perform a visual inspection of tail cone area and adjacent control surfaces to confirm there is no evidence of heat damage or delamination. |

Lectura: 01 es el sistema, 01-01 y 01-02 son dos configuraciones del APU, y la letra A o B es la
alternativa de alivio. Con el mismo APU inoperativo, un avión con APS2000 exige (M) y otro sin
APS2000 no. **La configuración decide qué fila aplica.**

En el Airbus (MMEL FAA A318-A321, Rev 32, página 49-1, rev. 30, 03/03/2023), el mismo sistema se
ve así: «49-10-01 APU System», subítem «1) A318/A319/A320/A321 without Mod. 163213/MP J4530»,
subítem «2) A321 with Mod. 163213/MP J4530 and without Mod. 162739/MP J4335», y dentro de cada
uno dos filas (C y A) sin letra.

**El triple asterisco («\*\*\*»).** Aparece en la columna Item, por ejemplo en «1) \*\*\*
Transceiver (Aircraft with Dual Transceivers)» (MMEL FAA A318-A321, Rev 32, página 34-17, rev.
32, ítem 34-41-01). PL-25: «The triple asterisk (***) in the Item column indicates an item that
may have been installed on some but not all aircraft covered by this MMEL. This symbol, however,
must not be carried forward into the aircraft operator's MEL.» Es decir: lo verás en la MMEL,
no en la MEL de tu aerolínea. Y PL-25 agrega que el símbolo no autoriza a instalar ni a quitar
nada.

```
[ESPACIO PARA IMAGEN ANOTADA]
CÓDIGO: MEL-06-01 · Imagen anotada · 4:5 vertical · 1200×1500 px
IMAGEN BASE:
Zoom a las dos primeras columnas (Sequence No. e Item) de la página 49-1 de la MMEL FAA B-737,
Rev 63a (rev. de página 63, 04/03/2026), ítem 49-01, con el texto de la tabla de arriba. A la
derecha, en gris, las demás columnas recortadas.
ANOTACIONES:
→ FLECHA 1: «01 Auxiliary Power Unit (APU)»
EXPLICACIÓN: nivel 1, el sistema.
→ FLECHA 2: «01-01 Airplane without APU APS2000» y «01-02 Airplane with APU APS2000»
EXPLICACIÓN: nivel 2, la configuración instalada.
→ FLECHA 3: «01-01A» y «01-01B»
EXPLICACIÓN: nivel 3, alternativas de alivio para esa configuración.
OBJETIVO PEDAGÓGICO:
Bajar por los niveles hasta la fila que corresponde al avión real, en vez de quedarse en el
título del sistema.
```

- **Flecha 1.** El sistema. El piloto lo usa para ubicarse, pero todavía no tiene alivio.
- **Flecha 2.** La configuración. El piloto tiene que saber cuál tiene su avión (la MEL del
  operador normalmente ya trae solo las configuraciones de su flota). Importa porque cambia las
  condiciones: aquí, con APS2000 aparece un (M) de inspección.
- **Flecha 3.** Las alternativas. «A» y «B» no son mejor y peor: son permisos distintos (dejar
  el APU inoperativo o quitarlo del avión) con condiciones distintas.

### Aplicación en la operación

El tech log dice «APU inop». Antes de decir «hay MEL», el piloto baja hasta la fila de su
configuración y confirma cuál alternativa usó mantenimiento para diferir, porque de eso dependen
el (M), el (O) y las restricciones.

### Error frecuente

Quedarse en el título del sistema y aplicar la primera fila que aparece, sin revisar si
corresponde a la configuración del avión.

### En pocas palabras

- Ítem = equipo, sistema, componente, mensaje o función (PL-25).
- Airbus: «22-10-01» y subítems «1)». Boeing: «01», «01-01» y alternativas con letra «01A».
- La configuración decide la fila.
- Si el ítem no está en la MEL del operador, no tiene alivio.
- «\*\*\*» es de la MMEL y no pasa a la MEL.

FUENTES
- Verificado: PL-25 Rev 24, definiciones Item y Triple Asterisk (***).
- Verificado: 8900.1 Vol 4 Cap 4 Secc 3 (CHG 933), 4-685B1)c) y 4-685B1)d)2.a.
- Verificado: MMEL FAA B-737, Rev 63a, página 49-1 (rev. 63, 04/03/2026), ítem 49-01.
- Verificado: MMEL FAA A318-A321, Rev 32, página 49-1 (rev. 30, 03/03/2023), ítem 49-10-01;
  página 34-17 (rev. 32, 07/30/2025), ítem 34-41-01.

---

## 7. REPAIR CATEGORY A B C D

### ¿Qué es?

Es la letra de la columna 1: el plazo máximo para reparar un ítem diferido. **Es el sistema de la
FAA**, definido en PL-25 Rev 24 para MEL aprobadas bajo 14 CFR partes 91K, 121, 125, 129 y 135.

### Lo que debe saber un piloto

Texto de PL-25 Rev 24 (p. 7):

| Cat. | Plazo según PL-25 | En horas (PL-25) |
|---|---|---|
| A | «within the interval specified in the Remarks or Exceptions column of the aircraft operator's MEL» | depende del ítem |
| B | «within 3 consecutive calendar-days (72 hours) excluding the day of discovery» | 72 h |
| C | «within 10 consecutive calendar-days (240 hours) excluding the day of discovery» | 240 h |
| D | «within 120 consecutive calendar-days (2,880 hours) excluding the day of discovery» | 2.880 h |

- **Categoría A no quiere decir «reparar ya».** Quiere decir «el plazo está escrito en Remarks».
  Puede ser corto o largo. Para intervalos en días calendario o flight-days se excluye el day of
  discovery; para vuelos, tramos, ciclos u horas, el plazo empieza al diferir el ítem (PL-25).
- Un operador puede poner una categoría **más** restrictiva que la MMEL, nunca menos (8900.1
  4-685B2): «an operator could make an MMEL category C item an MEL category B item»).
- La 8900.1 (4-689) permite, con OpSpec D095, una única extensión para B y C; **nunca para A ni
  D** por esa vía.

**Colombia.** El RAC 121 (Enm. 10) y el RAC 91 (Enm. 12) **no definen** las categorías A a D ni
sus plazos. En Colombia aplican los plazos que establezca la **MEL aprobada del operador**. El
Manual del Inspector de Aeronavegabilidad del SRVSOP (Parte IV, Cap. 7) remite las definiciones a
la PL-25.

### Cómo se ve en la MEL

Tres categorías A reales con plazos muy distintos:

| Entrada (cita) | Texto del plazo | Cómo se cuenta |
|---|---|---|
| MMEL FAA A318-A321, Rev 32, pág. 49-1 (rev. 30), ítem 49-10-01, subítem 1), fila A | «(O) Except for ETOPS beyond 120 minutes, may be inoperative provided repairs are made within 4 flights.» | en vuelos: desde que se difiere |
| MMEL FAA A318-A321, Rev 32, pág. 47-1 (rev. 30, 03/03/2023), ítem 47-10-01 Fuel Tank Inerting System | «May be inoperative provided repairs are made within 20 flight-days.» | en flight-days: sin el day of discovery |
| MMEL FAA B-737, Rev 63a, pág. 23-16 (rev. 63, 04/03/2026), ítem 23-12-02A Fixed ELTs | «(M) May be inoperative provided: a) System is deactivated, and b) Repairs are made within 90 consecutive calendar-days.» | en días calendario: sin el day of discovery |

El ELT en categoría A tiene 90 días; un ítem en categoría B tiene 3. La letra A no dice «más
urgente»: dice «mira el Remarks».

Fíjate también en el APU del A320 (49-10-01, subítem 1): la misma falla tiene una fila **C** (sin
ETOPS) y una fila **A** (ETOPS hasta 120 minutos, 4 vuelos). La categoría depende de la
alternativa de alivio que se use.

PL-25 define flight-day: «a 24-hour period (from midnight to midnight) either in Coordinated
Universal Time (UTC) or local time, as established by the aircraft operator, during which at least
one flight is initiated for the affected aircraft.» Un día en que el avión no vuela no cuenta.

```
[ESPACIO PARA IMAGEN]
CÓDIGO: MEL-07-01 · Diagrama · 16:9 · 1600×900 px
IMAGEN SUGERIDA:
Línea de tiempo horizontal que empieza en «Registro en el logbook: 26 ENE 10:00». El resto del 26
sombreado en gris con el rótulo «day of discovery (no cuenta)». Desde «27 ENE 0000» salen tres
barras: B hasta «29 ENE 2359» (72 h), C hasta «5 FEB 2359» (240 h), D con la barra cortada por
un zigzag y el rótulo «120 días (2.880 h)». Encima, una barra A punteada con el rótulo «plazo en
Remarks: 4 flights, 20 flight-days, 90 calendar-days…». Pie: «Sistema FAA (PL-25 Rev 24). En
Colombia: lo que diga la MEL aprobada del operador.»
OBJETIVO:
Ver que B, C y D son plazos fijos contados desde la medianoche siguiente, y que A no tiene un
plazo propio.
```

### Aplicación en la operación

Al aceptar el avión, el piloto mira en el registro del diferido la categoría y la fecha de
vencimiento. Si el vuelo termina después del vencimiento, o si la rotación lo deja lejos de la
base de mantenimiento cuando vence, eso se habla con mantenimiento y despacho antes de salir.

### Error frecuente

«Categoría A significa reparar inmediatamente.» No: significa que el plazo está en Remarks, y
puede ser de 4 vuelos o de 90 días.

### En pocas palabras

- B: 3 días (72 h). C: 10 días (240 h). D: 120 días (2.880 h). Siempre sin el day of discovery.
- A: el plazo está en Remarks; en vuelos o ciclos cuenta desde el diferimiento.
- Es el sistema FAA (PL-25). El RAC no define A a D: manda la MEL aprobada del operador.
- La MEL puede ser más restrictiva que la MMEL, nunca menos.

FUENTES
- Verificado: PL-25 Rev 24, Repair Category, Repair Category A, B, C y D, Flight-Day, p. 5 y 7.
- Verificado: 8900.1 Vol 4 Cap 4 Secc 3 (CHG 933), 4-685B2) y 4-689.
- Verificado: MMEL FAA A318-A321, Rev 32, ítems 49-10-01 y 47-10-01; MMEL FAA B-737, Rev 63a,
  ítem 23-12-02A.
- Verificado: RAC 121 Enm. 10 y RAC 91 Enm. 12, sin definición de categorías (según INFORME).
  SRVSOP MIA Enm. 13, Parte IV Cap. 7, 4.D (remite a PL-025).
- VERIFICAR: categorías, plazos y extensiones que use una aerolínea colombiana contra su MEL
  aprobada por la UAEAC y su manual de control de mantenimiento.

---

## 8. DAY OF DISCOVERY

### ¿Qué es?

Es el día en que se anotó la falla. PL-25 Rev 24: «This is the calendar-day an item malfunction
was recorded in the aircraft maintenance record/logbook and is excluded from the interval
established by the assigned repair category.»

### Lo que debe saber un piloto

- El día cuenta desde que **se anotó en el logbook**, no desde que alguien «notó» la falla.
- Ese día no cuenta. El plazo empieza a las 0000 del día siguiente.
- Aplica a los plazos en días calendario y flight-days. Para categoría A en vuelos, tramos,
  ciclos u horas, el plazo empieza al diferir el ítem (PL-25, Repair Category A).
- El día va en UTC o en hora local, según lo que haya establecido el operador (8900.1 4-685B2)b):
  «recorded in either universal coordinated time (UTC) or local time»).

### Cómo se ve en la MEL

El ejemplo es el de la propia PL-25 Rev 24:

| | Categoría B | Categoría C |
|---|---|---|
| Registro en el logbook | 26 de enero, 10:00 | 26 de enero, 10:00 |
| Day of discovery (no cuenta) | 26 de enero | 26 de enero |
| Empieza | 0000 del 27 de enero | 0000 del 27 de enero |
| Termina | **2359 del 29 de enero** | **2359 del 5 de febrero** |
| Texto PL-25 | «the 3-day interval would begin at 0000 on January 27 and end at 2359 on January 29» | «the 10-day interval would begin at 0000 on January 27 and end at 2359 on February 5» |

Consecuencia práctica: una categoría B anotada a las 10:00 del 26 vence a las 2359 del 29, es
decir, unas 86 horas de reloj después del registro (14 del resto del 26 más las 72 de los tres
días). Las «72 hours» de PL-25 son los tres días completos, no un cronómetro que arranca a las
10:00. PL-25 no trae ejemplo para la categoría D; se cuenta igual, 120 días desde la 0000 del
día siguiente.

```
[ESPACIO PARA IMAGEN]
CÓDIGO: MEL-08-01 · Recreación · 4:3 · 1200×900 px
IMAGEN SUGERIDA:
Calendario de enero y febrero (sin año). El 26 de enero marcado con un reloj «10:00» y el
rótulo «anotado en el logbook: day of discovery, no cuenta». Días 27, 28 y 29 de enero en un
color con «B: 1, 2, 3» y el 29 cerrado con «vence 2359». Días 27 de enero a 5 de febrero con
un segundo color numerados 1 a 10 y el 5 de febrero con «C vence 2359». Pie: «Ejemplo de FAA
PL-25 Rev 24. UTC u hora local, según el operador.»
OBJETIVO:
Que el piloto cuente bien el vencimiento y no confunda «72 h» con «72 h desde la hora de la
falla».
```

### Aplicación en la operación

Un piloto que recibe el avión el 29 de enero en la tarde con un ítem categoría B anotado el 26
sabe que vence a las 2359 del 29 (en la referencia horaria del operador). Si su último tramo
aterriza después de esa hora, el ítem ya no tiene alivio para el siguiente despacho, y eso se
aclara con mantenimiento y despacho antes de salir. Qué pasa exactamente con un vuelo en curso al
vencer lo define la MEL y el manual del operador.

### Error frecuente

Contar 72 horas desde la hora de la falla, o contar el mismo día del registro como día 1.

### En pocas palabras

- Day of discovery = día calendario en que se anotó en el logbook.
- No cuenta: el plazo empieza a la 0000 del día siguiente.
- Ejemplo PL-25: 26 ENE 10:00 → B vence 2359 del 29; C vence 2359 del 5 FEB.
- UTC o local, según el operador.
- Es el sistema FAA; en Colombia manda la MEL aprobada.

FUENTES
- Verificado: PL-25 Rev 24, Day of Discovery (p. 5), Repair Category A, B y C (p. 7).
- Verificado: 8900.1 Vol 4 Cap 4 Secc 3 (CHG 933), 4-685B2)a) y b).
- Verificado: SRVSOP MIA Enm. 13, PIV-VI-C7, 3.13 (día del descubrimiento; excluido en A, B, C
  y D; el operador define la hora de referencia).
- VERIFICAR: el MIO SRVSOP Parte II Vol II Cap 16 (primera edición, 2013) redacta distinto el
  ejemplo («empezará a la medianoche del 26») y el inicio de la categoría A en ciclos («empieza con
  el siguiente vuelo»). Para un operador colombiano, contrastar con su MEL aprobada.
- VERIFICAR: tratamiento de un plazo que vence con el avión en vuelo, contra la MEL y el manual
  del operador (no está en las fuentes cargadas).

---

## 9. NUMBER INSTALLED

### ¿Qué es?

Columna 2. PL-25 Rev 24: «This column indicates the number (quantity) of items normally installed
in the aircraft. This number represents the aircraft configuration(s) considered in developing an
MMEL.»

### Lo que debe saber un piloto

- Es cuántos hay, no cuántos funcionan.
- **El guion «-»**: PL-25, Dash (-): «Indicates a variable number (quantity) of items may be
  installed or required for dispatch.» Y en Number Installed: si el número es variable o difícil
  de fijar (equipo opcional, diferencias de flota, luces de cabina, parámetros del FDR), «a number
  is not required and the dash "-" symbol is used instead».
- En la MEL del operador, el guion normalmente se reemplaza por el número real: la 8900.1
  (4-685B4)b)) dice que, cuando la MMEL trae «-» en requeridos, «the MEL would reflect the actual
  number required for dispatch»; y el MIO SRVSOP (4.1.36 a)) pide que la MEL refleje «el número
  actual de ítems instalados o un medio alterno de control de configuración aprobado».

### Cómo se ve en la MEL

| Entrada (cita) | Inst. | Qué dice |
|---|---|---|
| MMEL FAA A318-A321, Rev 32, pág. 22-1 (rev. 32), 22-10-01 Autopilot Systems | 2 | dos autopilotos |
| MMEL FAA A318-A321, Rev 32, pág. 34-21 (rev. 32), 34-43-01 TCAS II | 1 | un sistema |
| MMEL FAA B-737, Rev 63a, pág. 34-25 (rev. 63, 04/03/2026), 34-40A TCAS | - | variable |
| MMEL FAA A318-A321, Rev 32, pág. 34-17 (rev. 32), 34-41-01 Weather Radar Systems | - | variable (y «-» también en requeridos) |

El mismo TCAS: el Airbus pone «1» y el Boeing pone «-». No significa que uno tenga más TCAS; la
MMEL del B737 cubre modelos de -100 a -900ER y usa el guion porque la cantidad no es la misma en
todos.

### Aplicación en la operación

El piloto confirma que el número de su MEL coincide con su avión. Si la MEL tiene «2» y el
tech log dice «1 inop», queda 1 funcionando; con eso va a la columna 3 y a Remarks.

### Error frecuente

Leer el guion como «no importa cuántos haya». El guion dice que la cantidad varía, no que el
equipo sea opcional para el vuelo.

### En pocas palabras

- Columna 2 = cuántos hay instalados en la configuración considerada.
- «-» = cantidad variable (PL-25).
- La MEL del operador lleva el número real o un medio aprobado de control.
- Es el punto de partida, no la autorización.

FUENTES
- Verificado: PL-25 Rev 24, Dash (-) (p. 5) y System Page - Number Installed (p. 8).
- Verificado: 8900.1 Vol 4 Cap 4 Secc 3 (CHG 933), 4-685B3)a) y 4-685B4)b).
- Verificado: SRVSOP MIO Parte II Vol II Cap 16 (2013), 4.1.36 a).
- Verificado: MMEL FAA A318-A321, Rev 32, ítems 22-10-01, 34-43-01, 34-41-01; MMEL FAA B-737,
  Rev 63a, ítem 34-40A.

---

## 10. NUMBER REQUIRED FOR DISPATCH

### ¿Qué es?

Columna 3. PL-25 Rev 24: «This column indicates the minimum number (quantity) of items required
for operation, **providing the conditions specified in the Remarks or Exceptions column are
met**.»

### Lo que debe saber un piloto

- «Instalados 2, requeridos 1» **no** significa «uno puede estar dañado». Significa «puedes salir
  con uno, **si** se cumple lo que dice Remarks».
- «Requeridos 0» no significa «no hace falta». Casi siempre es la fila con más condiciones.
- A veces el número depende de una norma de operación: PL-25 (Required by 14 CFR) dice que «The
  number of items required by applicable 14 CFR operating rules must be operative» y que «"14 CFR"
  also implies the regulations within the State the aircraft is operated».

### Cómo se ve en la MEL

| Entrada (cita) | Inst. | Req. | Remarks (tal cual) |
|---|---|---|---|
| A320 22-10-01 Autopilot Systems (MMEL FAA A318-A321, Rev 32, pág. 22-1) | 2 | 1 | «(O) One may be inoperative provided approach minimums do not require its use.» |
| misma entrada, segunda fila | 2 | 0 | «(O) May be inoperative provided: a) Approach minimums do not require their use, b) Enroute operations do not require their use, and c) Number of flight segments and segment duration is acceptable to flightcrew.» |
| A320 34-43-01 TCAS II, 1) Combined TA and RA Dual Display System(s) (MMEL FAA A318-A321, Rev 32, pág. 34-22) | 2 | 1 | «May be inoperative on the non-flying pilot side provided: a) TA and RA visual display is operative on the flying pilot side, and b) TA and RA audio function is operative on flying pilot side.» |
| B737 34-15-01C Weather Radar (MMEL FAA B-737, Rev 63a, pág. 34-7) | - | 1 | «May be inoperative provided one remaining weather radar operates normally.» |

Mira el TCAS: 2 instalados, 1 requerido, pero **no cualquiera de los dos**. Solo puede faltar el
del lado del piloto que no vuela, y el del piloto que vuela tiene que tener imagen y audio. El
número no dice eso; lo dice Remarks.

```
[ESPACIO PARA IMAGEN]
CÓDIGO: MEL-10-01 · Diagrama · 9:16 vertical · 1080×1920 px
IMAGEN SUGERIDA:
Tres bloques apilados unidos por flechas hacia abajo. Arriba: «2 INSTALLED» con dos iconos de
equipo, uno tachado. En medio: «1 REQUIRED». Abajo, más grande y con borde del color de acento
del módulo: «READ CONDITIONS FIRST» y debajo, en pequeño, «Remarks or Exceptions: provided…».
A un lado, una X sobre la frase «2 - 1 = puedo volar».
OBJETIVO:
Fijar que el número requerido no autoriza nada por sí solo.
```

### Aplicación en la operación

AP 2 inoperativo, fila «2 / 1». El piloto no se detiene en «me queda uno»: revisa si en destino o
alterno la aproximación exige autopiloto (por ejemplo, porque los mínimos que necesitará solo se
pueden volar con él). Si los dos están inoperativos, la fila «2 / 0» pide además que la ruta no
lo exija y que la tripulación acepte el número y la duración de los tramos.

### Error frecuente

«Installed 2, Required 1, entonces siempre puedo volar con uno.» Hay alivio solo si se cumplen
todas las condiciones de Remarks.

### En pocas palabras

- Columna 3 = mínimo para operar, **si** se cumple Remarks (PL-25).
- «0» no es «no importa»: suele traer más condiciones.
- A veces importa cuál unidad falla, no solo cuántas.
- Si el número depende de una norma, esa norma manda.

FUENTES
- Verificado: PL-25 Rev 24, System Page - Number Required for Dispatch (p. 8) y Required by
  14 CFR (p. 8).
- Verificado: MMEL FAA A318-A321, Rev 32, página 22-1 (rev. 32), ítem 22-10-01; página 34-22
  (rev. 32), ítem 34-43-01 1).
- Verificado: MMEL FAA B-737, Rev 63a, página 34-7 (rev. 63, 04/03/2026), ítem 34-15-01C.

---

## 11. REMARKS OR EXCEPTIONS

### ¿Qué es?

La columna 4, la más importante. PL-25 Rev 24: «This column may be blank, or it may include a
statement permitting operation with a specific number of items inoperative. The statement may
include a proviso for such operation and appropriate notes.»

### Lo que debe saber un piloto

- Aquí está la autorización: **no en el número, sino en el conjunto de condiciones**.
- Puede traer: condiciones (provisos), limitaciones de vuelo, configuraciones, restricciones de
  tipo de operación, condiciones meteorológicas, procedimientos (M) u (O), y referencias a otros
  ítems o a normas.
- En la MEL del operador, Remarks no puede quedar genérico: 8900.1 4-686B, «In an MEL, "Remarks
  or Exceptions" may not be general». Por eso una frase de la MMEL como «Not required by 14 CFR»
  suele aparecer en la MEL convertida en reglas concretas de la operación.
- NOTE no es proviso: informa, pero no reemplaza una condición (PL-25).

### Cómo se ve en la MEL

Palabras que hay que ver primero, con su entrada real:

| Palabra clave | Texto real | Cita |
|---|---|---|
| **provided** | «May be inoperative provided manual tilt function operates normally.» | A320 34-41-01 6) AUTO TILT Control, MMEL FAA A318-A321 Rev 32, pág. 34-17 |
| **One may be inoperative** | «(O) One may be inoperative provided approach minimums do not require its use.» | A320 22-10-01, pág. 22-1 |
| **Not required by 14 CFR** | «(M) May be inoperative provided: a) Not required by 14 CFR, …» | A320 34-43-01, fila C, pág. 34-21 |
| **prohibited** | «b) Extended overwater flight is prohibited.» | A320 21-31-01 Automatic Cabin Pressure Control Systems, pág. 21-10 (rev. 30, 03/03/2023) |
| **Except for ETOPS** | «(O) Except for ETOPS, may be inoperative.» | A320 49-10-01 1), pág. 49-1 (rev. 30) |
| **condiciones de vuelo** | «…provided airplane is not operated in known or forecast icing conditions.» | A320 30-21-01 Engine Anti-Ice Valves, pág. 30-5 (rev. 32) |
| **Enroute or approach procedures** | «b) Enroute or approach procedures do not require its use.» | A320 34-43-01, pág. 34-21 |

La entrada de presurización (21-31-01) muestra lo lejos que puede llegar un Remarks: el alivio
existe, pero exige volar **sin presurizar** («Flight is conducted in an unpressurized
configuration») y prohíbe el vuelo extendido sobre agua. El avión puede salir legalmente; el
vuelo que puede hacer es otro.

```
[ESPACIO PARA IMAGEN ANOTADA]
CÓDIGO: MEL-11-01 · Imagen anotada · 4:5 vertical · 1200×1500 px
IMAGEN BASE:
Collage de cuatro recortes de la columna Remarks, cada uno con su cita debajo en letra pequeña,
texto copiado tal cual de la MMEL FAA A318-A321, Rev 32:
(1) pág. 22-1, 22-10-01: «(O) One may be inoperative provided approach minimums do not require
its use.»
(2) pág. 34-21, 34-43-01 fila C: «(M) May be inoperative provided: a) Not required by 14 CFR,
b) System is deactivated and secured, and c) Enroute or approach procedures do not require its
use.»
(3) pág. 21-10, 21-31-01: «(O) May be inoperative provided: a) Flight is conducted in an
unpressurized configuration, and b) Extended overwater flight is prohibited.»
(4) pág. 30-5, 30-21-01 primera fila: «(M) Except for ETOPS beyond 120 minutes, one may be
inoperative secured closed provided airplane is not operated in known or forecast icing
conditions.»
Las palabras clave subrayadas en el color de acento del módulo.
ANOTACIONES:
→ FLECHA 1: «One may be inoperative» y «provided»
EXPLICACIÓN: cuántos pueden faltar y la palabra que abre las condiciones.
→ FLECHA 2: «Not required by 14 CFR»
EXPLICACIÓN: el alivio depende de que la norma de operación no exija el equipo.
→ FLECHA 3: «prohibited»
EXPLICACIÓN: una operación que queda prohibida con el ítem inoperativo.
→ FLECHA 4: «not operated in known or forecast icing conditions»
EXPLICACIÓN: una condición meteorológica del vuelo.
→ FLECHA 5: «Except for ETOPS beyond 120 minutes»
EXPLICACIÓN: el alivio no vale para cierto tipo de operación.
OBJETIVO PEDAGÓGICO:
Aprender a escanear Remarks buscando primero las palabras que cambian el vuelo.
```

- **Flecha 1.** «One may be inoperative» fija cuántos pueden faltar; «provided» abre la lista de
  condiciones. El piloto lee todo lo que viene después de «provided».
- **Flecha 2.** «Not required by 14 CFR» obliga a saber qué exige la norma para ese vuelo. PL-25
  aclara que «14 CFR» también implica la norma del Estado donde se opera. El piloto mira cómo lo
  concretó su MEL.
- **Flecha 3.** «prohibited» es una operación que no se puede hacer. El piloto confirma que su
  ruta no la incluye.
- **Flecha 4.** Una condición meteorológica («known or forecast icing conditions») convierte el
  pronóstico en parte del despacho.
- **Flecha 5.** «Except for ETOPS» deja fuera un tipo de operación completa.

### Aplicación en la operación

Con una válvula de antihielo de motor diferida por la primera fila de 30-21-01, el despacho puede
ser legal, pero si el pronóstico de la ruta trae engelamiento, esa fila no autoriza el vuelo. La
decisión depende de la meteorología del día, no de la MEL sola.

### Error frecuente

Tratar Remarks como «texto de mantenimiento». Remarks es donde está el impacto sobre el vuelo.

### En pocas palabras

- La autorización está en Remarks, no en el número.
- Se buscan primero: provided, one may be inoperative, not required, prohibited, except for,
  condiciones de vuelo.
- Los provisos se cumplen todos.
- NOTE informa, no es proviso.
- En la MEL, Remarks no puede ser genérico.

FUENTES
- Verificado: PL-25 Rev 24, System Page - Remarks or Exceptions, Proviso, NOTE, Required by
  14 CFR (p. 8).
- Verificado: 8900.1 Vol 4 Cap 4 Secc 3 (CHG 933), 4-686B.
- Verificado: MMEL FAA A318-A321, Rev 32: 22-10-01 (pág. 22-1), 34-43-01 (pág. 34-21),
  34-41-01 6) (pág. 34-17), 21-31-01 (pág. 21-10, rev. 30), 30-21-01 (pág. 30-5), 49-10-01
  (pág. 49-1, rev. 30).

---

## 12. (O): PROCEDIMIENTO DE OPERACIONES

### ¿Qué es?

PL-25 Rev 24: «(O) This symbol indicates a requirement for a specific operations procedure that
must be accomplished in planning for or operating with the listed item inoperative. Normally,
these procedures are accomplished by the flightcrew. However, other personnel may be qualified
and authorized to perform certain functions.»

### Lo que debe saber un piloto

- (O) **no** significa «opcional». Significa que hay un procedimiento de operaciones obligatorio.
- Sirve «in planning for or operating»: puede tocar la planificación (despacho, combustible,
  ruta) o la ejecución del vuelo (cabina).
- La MMEL solo pone el símbolo. **El procedimiento lo escribe el operador.** La MMEL del B737 lo
  dice (p. XIII, «Guidelines for (M) and (O) Procedures»): «These procedures must be established
  by the operator and may be based on the aircraft manufacturer's recommended procedures [...]» y
  «(M) and (O) Procedures are based on the Maintenance and Operational Procedures published in the
  Boeing 737 Dispatch Deviations Guide (DDG).»
- En Colombia, el RAC 91, Apéndice 2 (i): «deberá ser necesario preparar un procedimiento de
  operación apropiado para la tripulación de vuelo».

Qué tipo de cosas puede pedir un (O), en forma conceptual (el texto real está en la MEL de cada
operador): cambiar la planificación, usar otra fuente de información, seguir un procedimiento
alterno, respetar una restricción, hacer una comprobación antes del vuelo o incluir un punto en el
briefing.

### Cómo se ve en la MEL

| Entrada (cita) | Remarks (tal cual) |
|---|---|
| A320 22-10-01 Autopilot Systems (MMEL FAA A318-A321, Rev 32, pág. 22-1) | «(O) One may be inoperative provided approach minimums do not require its use.» |
| A320 32-42-04 AUTO/BRK Function (pág. 32-17, rev. 32) | «(O) May be inoperative provided: a) Approach minimums do not require its use, and b) Normal braking is not affected.» |
| A320 34-41-01 7) \*\*\* Predictive Windshear Detection and Avoidance System (pág. 34-17), fila B | «(O) May be inoperative provided alternate procedures are established and used. NOTE: Operator's alternate procedures should include reviewing windshear avoidance and windshear recovery procedures.» |

Comparación útil. El **mismo** alivio de autopiloto:
- A320 22-10-01 (MMEL FAA A318-A321, Rev 32, pág. 22-1): «**(O)** One may be inoperative
  provided approach minimums do not require its use.»
- B737 22-01A (MMEL FAA B-737, Rev 63a, pág. 22-1, rev. 63, 04/03/2026): «May be inoperative
  provided approach minimums do not require its use.» **Sin (O).**

Que no haya (O) no quita el proviso: en el B737 la tripulación igual tiene que confirmar que los
mínimos no exigen autopiloto. Y cada MMEL es de su tipo: lo que trae una no se traslada a la otra.

```
[ESPACIO PARA IMAGEN]
CÓDIGO: MEL-12-01 · Diagrama · 16:9 · 1600×900 px
IMAGEN SUGERIDA:
A la izquierda, el símbolo «(O)» grande en el color de acento del módulo. Una flecha a la
derecha hacia «Operational procedure required». Debajo, dos ramas: «in planning» (icono de plan
de vuelo y despacho) y «operating» (icono de cabina). Una tercera etiqueta tachada:
«(O) = optional».
OBJETIVO:
Que el piloto asocie (O) con una tarea suya o de despacho, obligatoria.
```

### Aplicación en la operación

Con un ítem (O) abierto, el piloto busca el procedimiento en la MEL de su operador, confirma que
la parte de planificación ya está hecha (por ejemplo, reflejada en el despacho) y lleva a la cabina
la parte que le toca ejecutar. La 8900.1 (4-691C) dice que la información de MEL debe llegar a la
tripulación por placard (cuando aplique) y que «should be included on the dispatch or flight
release».

### Error frecuente

«(O) significa optional.» Es obligatorio. Y el error inverso: pensar que sin (O) el piloto no
tiene nada que revisar.

### En pocas palabras

- (O) = procedimiento de operaciones obligatorio (PL-25).
- Puede ser de planificación o de ejecución del vuelo.
- La MMEL pone el símbolo; el operador escribe el procedimiento.
- Sin (O) los provisos siguen aplicando.
- No trasladar (O) entre tipos de avión.

FUENTES
- Verificado: PL-25 Rev 24, (O) (p. 9).
- Verificado: MMEL FAA B-737, Rev 63a, p. XIII «Guidelines for (M) and (O) Procedures»; página
  22-1 (rev. 63, 04/03/2026), ítem 22-01A.
- Verificado: MMEL FAA A318-A321, Rev 32, ítems 22-10-01 (pág. 22-1), 32-42-04 (pág. 32-17),
  34-41-01 7) (pág. 34-17).
- Verificado: 8900.1 Vol 4 Cap 4 Secc 3 (CHG 933), 4-691C. RAC 91 Enm. 12, Apéndice 2 (i).
- VERIFICAR: el MIO SRVSOP Parte II Vol II Cap 16 (2013), 4.1.36 e), pide dejar constancia del
  cumplimiento del (O) en la bitácora de a bordo. Confirmar cómo lo registra la MEL y el manual
  del operador.

---

## 13. (M): PROCEDIMIENTO DE MANTENIMIENTO

### ¿Qué es?

PL-25 Rev 24: «(M) This symbol indicates a requirement for a specific maintenance procedure that
must be accomplished prior to operation with the listed item inoperative. Normally, these
procedures are accomplished by maintenance personnel. However, other personnel may be qualified
and authorized to perform certain functions. Procedures requiring specialized knowledge or skill,
or requiring the use of tools or test equipment, should be accomplished by maintenance
personnel.»

### Lo que debe saber un piloto

- (M) **no** significa «MEL». Significa mantenimiento, y **antes** de operar.
- Lo típico: desactivar, asegurar, aislar, inspeccionar, verificar que otra cosa funcione. PL-25
  define «deactivated» y «secured»: el ítem «must be put into an acceptable condition for safe
  flight».
- El piloto **no improvisa** acciones técnicas. Verifica que el (M) esté registrado como cumplido.
- Si el procedimiento exige una inspección de un técnico, no se despega sin ella: AC 120-125
  6.1.3, «If the MEL procedures for a specific item require a mechanic's inspection, takeoff would
  be prohibited until the required inspection is completed.»
- Un (M) cumplido no cierra el análisis: 8900.1 4-687, las condiciones de MEL no eximen al
  operador de determinar que el avión está en condición de operación segura, «regardless of
  whether an (M) procedure applies to the item».

### Cómo se ve en la MEL

| Entrada (cita) | Remarks (tal cual) |
|---|---|
| A320 34-43-01 TCAS II, fila B (MMEL FAA A318-A321, Rev 32, pág. 34-21) | «(M) May be inoperative provided: a) System is deactivated and secured, and b) Enroute or approach procedures do not require its use.» |
| B737 32-01 \*\*\* Gear Seal Warning System (-100/-200) (MMEL FAA B-737, Rev 63a, pág. 32-1, rev. 63) | «(M) May be inoperative provided gear seal function is checked once each flight-day.» |
| B737 49-01-02A APU (con APS2000) (MMEL FAA B-737, Rev 63a, pág. 49-1, rev. 63) | «(M) Except for ETOPS, may be inoperative provided: a) Procedures do not require its use, and b) Perform a visual inspection of tail cone area and adjacent control surfaces to confirm there is no evidence of heat damage or delamination.» |

Fíjate en el TCAS: lleva (M) y no (O), pero el proviso b) es operacional («Enroute or approach
procedures do not require its use»). El piloto igual tiene que comprobar que su ruta y sus
procedimientos no exigen TCAS. Y el gear seal pide una verificación **cada flight-day**: el (M) no
es solo el día que se difiere.

```
[ESPACIO PARA IMAGEN]
CÓDIGO: MEL-13-01 · Diagrama · 16:9 · 1600×900 px
IMAGEN SUGERIDA:
El símbolo «(M)» grande. Flecha a «Maintenance action required». Debajo, iconos genéricos
rotulados: «deactivate», «secure», «inspect», «verify». A la derecha, un piloto con una lupa
sobre una página de tech log con el rótulo «¿(M) registrado como cumplido?». Tachada:
«(M) = MEL».
OBJETIVO:
Que el piloto vea que su papel frente al (M) es verificar, no ejecutar.
```

### Aplicación en la operación

Al aceptar el avión, el piloto busca en el tech log la anotación del diferido con el (M)
completado y firmado. Si falta, el alivio no está completo y el avión no está listo para ese
alivio. Si el (M) es periódico (cada flight-day, cada cierto número de horas), confirma que la
verificación de hoy también está hecha.

### Error frecuente

«(M) significa MEL.» O suponer que «si hay MEL abierta, mantenimiento ya hizo todo» sin mirarlo
en el registro.

### En pocas palabras

- (M) = procedimiento de mantenimiento, antes de operar (PL-25).
- Desactivar, asegurar, inspeccionar, verificar.
- El piloto verifica que esté registrado; no improvisa.
- Un (M) puede repetirse (cada flight-day, cada X horas).
- Un (M) sin (O) puede traer provisos operacionales.

FUENTES
- Verificado: PL-25 Rev 24, (M) (p. 9) y Deactivated or Secured (p. 5).
- Verificado: AC 120-125 (11/1/23), 6.1.3; 8900.1 Vol 4 Cap 4 Secc 3 (CHG 933), 4-687.
- Verificado: MMEL FAA A318-A321, Rev 32, página 34-21 (rev. 32), ítem 34-43-01; MMEL FAA B-737,
  Rev 63a, página 32-1 (rev. 63), ítem 32-01; página 49-1 (rev. 63), ítem 49-01-02A.
- Verificado: RAC 91 Enm. 12, Apéndice 2 (i) (procedimiento de mantenimiento «antes del vuelo,
  con el fin de desactivar o de aislar»).
- VERIFICAR: el símbolo «(M#)» («a cumplir específicamente por personal de mantenimiento») solo
  aparece en el MIO SRVSOP Parte II Vol II Cap 16 (2013), 4.1.36 d); PL-25 Rev 24 no lo define.
  Confirmar si la MEL del operador lo usa.

---

## 14. (M)(O): LOS DOS REQUISITOS

### ¿Qué es?

Una entrada con «(M)(O)» exige **las dos cosas**: el procedimiento de mantenimiento antes de
operar y el procedimiento de operaciones para planificar u operar. No son alternativas.

### Lo que debe saber un piloto

- Orden lógico: primero mantenimiento deja el ítem en condición (M); luego la tripulación y
  despacho aplican el (O).
- El alivio existe solo cuando están los dos y todos los provisos.

### Cómo se ve en la MEL

| Entrada (cita) | Cat. | Inst. | Req. | Remarks (tal cual) |
|---|---|---|---|---|
| B737 78-01-03 Thrust Reverser Systems (-600/-700/-800/-900/-900ER) (MMEL FAA B-737, Rev 63a, pág. 78-1, cabecera «REVISION NO. 63 / DATE: 11/28/2022») | C | 2 | 1 | «(M)(O) One may be inoperative provided: a) Thrust reverser is locked in forward thrust position, and b) Appropriate performance adjustments are applied.» |
| B737 32-02-02 Antiskid System (-600/-700/-800/-900/-900ER) (MMEL FAA B-737, Rev 63a, pág. 32-1, rev. 63) | C | 1 | 0 | «(M)(O) May be inoperative provided: a) Associated Antiskid channel(s) is deactivated, and b) Operations are conducted in compliance with AFM.» |
| A320 78-30-01 1) Thrust Reverser Systems (A318/A319ceo/A320ceo/A321ceo) (MMEL FAA A318-A321, Rev 32, pág. 78-2, rev. 31, 08/13/2024) | C | 2 | 1 | «(M)(O) One may be inoperative provided: a) Inoperative reverser is deactivated and secured in the stowed position and no operations or procedures require its use, [...] i) Flightcrew is provided with the following statement via appropriate means [...] and j) Appropriate performance adjustments are applied.» (diez provisos, de a) a j)) |

En el reversor del B737 se ve el reparto: «locked in forward thrust position» es trabajo de
mantenimiento; «Appropriate performance adjustments are applied» toca la planificación del
despegue y el aterrizaje. En el A320, el proviso i) incluso exige que a la tripulación le llegue
un texto concreto sobre cómo manejar las palancas en el aterrizaje.

```
[ESPACIO PARA IMAGEN ANOTADA]
CÓDIGO: MEL-14-01 · Imagen anotada · 16:9 · 1600×900 px
IMAGEN BASE:
Recreación fiel de la fila 01-03 de la página 78-1 de la MMEL FAA B-737, Rev 63a (cabecera de la
página: REVISION NO. 63, DATE: 11/28/2022), capítulo «78. Engine Exhaust», ítem «01 Thrust
Reverser Systems», texto tal cual como en la tabla de arriba.
ANOTACIONES:
→ FLECHA 1: «(M)»
EXPLICACIÓN: mantenimiento, antes de operar.
→ FLECHA 2: «(O)»
EXPLICACIÓN: operaciones, al planificar u operar.
→ FLECHA 3: «a) Thrust reverser is locked in forward thrust position»
EXPLICACIÓN: la condición que deja el (M).
→ FLECHA 4: «b) Appropriate performance adjustments are applied»
EXPLICACIÓN: la condición que se cumple en la planificación.
OBJETIVO PEDAGÓGICO:
Ver en una sola fila qué parte hace mantenimiento y qué parte hace operaciones.
```

- **Flecha 1.** (M): el piloto confirma en el tech log que el reversor quedó bloqueado. No lo
  comprueba él con herramientas.
- **Flecha 2.** (O): el piloto busca el procedimiento de su MEL para este ítem.
- **Flecha 3.** Es el resultado del (M). Si no está registrado, no hay alivio.
- **Flecha 4.** Es donde el ítem cambia el vuelo: la performance tiene que calcularse con el
  reversor inoperativo. Qué ajuste y cuánto sale del AFM y de los datos del operador, no de la MEL.

### Aplicación en la operación

Reversor 2 diferido. Antes de salir: tech log con el (M) cumplido, despacho con la performance
ajustada, briefing con lo que dice el (O) para el aterrizaje. Si falta cualquiera de las tres
cosas, el alivio está incompleto.

### Error frecuente

Creer que con el (M) firmado ya se puede salir, o que el (O) es un trámite de despacho que no toca
a la cabina.

### En pocas palabras

- (M)(O) = los dos, no uno u otro.
- Primero (M), después (O).
- La performance es un proviso, no una sugerencia.
- Una entrada (M)(O) puede traer muchos provisos: se leen todos.

FUENTES
- Verificado: PL-25 Rev 24, (M) y (O) (p. 9).
- Verificado: MMEL FAA B-737, Rev 63a, página 78-1 (cabecera rev. 63, 11/28/2022), ítem 78-01-03;
  página 32-1 (rev. 63, 04/03/2026), ítem 32-02-02.
- Verificado: MMEL FAA A318-A321, Rev 32, página 78-2 (rev. 31, 08/13/2024), ítem 78-30-01 1).
- VERIFICAR: la cabecera de la página 78-1 de la MMEL B-737 dice «DATE: 11/28/2022» y la tabla de
  contenido lista el capítulo 78 como «63 04/03/2026». Se cita tal cual; confirmar en DRS o en la
  página de Boeing si hace falta la fecha exacta.

---

## 15. PLACARDING

### ¿Qué es?

Poner un rótulo en el ítem inoperativo. PL-25 Rev 24: «Each inoperative item must be placarded to
inform and remind the crewmembers and maintenance personnel of the item's condition. To the extent
practical, placards should be located adjacent to the control or indicator for the item affected.
Unless otherwise specified (i.e., MMEL proviso), placard wording and location will be determined
by the aircraft operator.»

### Lo que debe saber un piloto

- El placard advierte, evita que alguien use el equipo por costumbre y mantiene la conciencia
  situacional durante todo el vuelo.
- Es parte del control del defecto: se ve el placard, se lee el tech log, se lee la MEL.
- Si el Remarks dice que otro ítem «is not used», PL-25 pide además «an additional placard [...]
  as close as practical to the control or indicator for the item that is not to be used».

**FAA y Colombia no piden lo mismo sobre el texto:**

| | FAA (PL-25 Rev 24) | Colombia (RAC 91 Enm. 12) |
|---|---|---|
| Obligación | «Each inoperative item must be placarded» | 91.1105(a)(9): cuando la lista de discrepancias según el MEL incluya equipos inoperativos, «se coloque en ellos la leyenda "NO OPERATIVO"» (remite a RAC 43.405 (d)(2)) |
| Texto del placard | lo fija el operador, salvo que un proviso de la MMEL diga otra cosa | **«NO OPERATIVO»** |
| Ubicación | junto al control o indicador, en lo posible | «en ellos» (en los instrumentos o equipos) |
| Registro | aparte, en el logbook | Apéndice 2 (h): anuncio fijado en el equipo y anotación en el libro técnico de a bordo |

### Cómo se ve en la MEL

Casi siempre la MMEL no dice el texto del placard. Cuando sí lo dice, está en el proviso:

| Entrada (cita) | Proviso con el placard (tal cual) |
|---|---|
| B737 23-12-02B \*\*\* Fixed ELTs (MMEL FAA B-737, Rev 63a, pág. 23-16, rev. 63), cat. A | «(M) May be missing provided: a) Placard stating "ELT not installed" is placed in view of the pilot, and b) Repairs are made within 90 consecutive calendar-days.» |
| A320 25-28-01 Storage Bin(s)/Cabin, Galley, and Lavatory Storage Compartment/Closets (MMEL FAA A318-A321, Rev 32, pág. 25-11, rev. 32), extracto | «b) Associated bin, compartment, or closet is prominently placarded "DO NOT USE",» |

```
[ESPACIO PARA IMAGEN]
CÓDIGO: MEL-15-01 · Recreación · 16:9 · 1600×900 px
IMAGEN SUGERIDA:
Panel de cabina genérico (sin marca, sin tipo de avión identificable) con una fila de
pulsadores. Junto a uno de ellos, una etiqueta adhesiva que dice «INOP». En un recuadro al lado,
la misma etiqueta con el texto «NO OPERATIVO» y el rótulo «RAC 91.1105(a)(9)». Debajo, una
página de tech log difuminada con una flecha: «el placard remite al registro».
OBJETIVO:
Reconocer el placard, entender que está junto al control afectado y que el texto depende de la
norma y del operador.
```

### Aplicación en la operación

En la inspección de cabina, cada placard tiene que tener su anotación en el tech log y su
entrada de MEL, y viceversa. Un placard sin diferido registrado, o un diferido sin placard, es
algo que se aclara con mantenimiento antes de salir. La 8900.1 (4-691C) dice que la información
de MEL llega a la tripulación «through placarding (as applicable)» y en el despacho.

### Error frecuente

Tomar el placard como un adorno o como la única información. El placard avisa; lo que se puede y
no se puede hacer está en la MEL y en el registro.

### En pocas palabras

- Todo ítem inoperativo va con placard (PL-25).
- Junto al control o indicador afectado.
- FAA: texto y lugar los decide el operador, salvo que un proviso diga otra cosa.
- RAC 91.1105(a)(9): leyenda «NO OPERATIVO».
- Placard, tech log y MEL tienen que coincidir.

FUENTES
- Verificado: PL-25 Rev 24, Placarding (p. 7) e Is Not Used (p. 6).
- Verificado: RAC 91 Enm. 12, 91.1105(a)(9) (p. 166) y Apéndice 2 (h).
- Verificado: 8900.1 Vol 4 Cap 4 Secc 3 (CHG 933), 4-691C.
- Verificado: MMEL FAA B-737, Rev 63a, página 23-16 (rev. 63, 04/03/2026), ítem 23-12-02B; MMEL
  FAA A318-A321, Rev 32, página 25-11 (rev. 32, 07/30/2025), ítem 25-28-01.
- VERIFICAR: el texto de RAC 43.405 (d)(2), al que remite el RAC 91.1105(a)(9); no está en las
  fuentes cargadas.
- VERIFICAR: formato, idioma y ubicación de los placards que usa el operador, contra su MEL y su
  manual de control de mantenimiento.

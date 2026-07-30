# Sección NOTAM — Lección: "Qué es un NOTAM y cómo leerlo"

> **Fuentes:** (1) OACI Doc 8400 — *Abreviaturas y códigos de la OACI* (PANS-ABC), 6ª ed., 2004; (2) *NOTAMS: Definición, Estructura y Ejemplos* (guía de interpretación, 66106526-interpretacion-notam.pdf); (3) *METARs, TAFs y NOTAMs* (presentación de curso, 685689151-METARs-TAFs-NOTAMs.pdf); (4) Resúmenes mensuales de NOTAM vigentes — Aerocivil Colombia, DRT, corte 29 JUL 2026 (series Alfa y Charlie/Delta).
> **Jerarquía:** el Doc 8400 y el Anexo 15 son la norma; las guías (2) y (3) son material didáctico de curso y se citan como tales. **Nota de vigencia:** el Doc 8400 cargado es la 6ª edición (2004); existen ediciones posteriores.

Cada bloque `##` es una pantalla de la lección en la app.

---

## Pantalla 1 — ¿Qué es un NOTAM?

**Definición oficial (Doc 8400, pág. 3-3):**

> Aviso distribuido por medios de telecomunicaciones que contiene información relativa al establecimiento, condición o modificación de cualquier instalación aeronáutica, servicio, procedimiento o peligro, cuyo conocimiento oportuno es esencial para el personal encargado de las operaciones de vuelo.

**En la práctica:** pistas cerradas, radioayudas fuera de servicio, obras en el área de movimiento, drones (UAS), fauna en pista, obstáculos nuevos, cambios de horario o de procedimientos. Si algo cambia y afecta tu vuelo antes de que lo publique el AIP, se difunde por NOTAM.

**Por qué te lo preguntan en entrevistas y en el PCA:** leer NOTAMs es parte del planeamiento de vuelo. Un piloto que no decodifica la línea Q depende de que otro le explique lo que va a encontrar en ruta o en destino.

---

## Pantalla 2 — De dónde sale y dónde vive

- El contenido y formato de los NOTAM los fija el **Anexo 15 de la OACI** (§5.2.1, 5.3.2 y Apéndice 6); su transmisión por el servicio fijo aeronáutico (AFS), el **Anexo 10, Vol. II** (Doc 8400, pág. 7-1, §2).
- Los criterios de selección y las tablas de calificativos están en el **Doc 8126 — Manual para los servicios de información aeronáutica** (Doc 8400, pág. 7-3, nota).
- El **código NOTAM** de cinco letras está normalizado en el **Doc 8400, sección 7** — consultable completo en esta sección de la app.
- En Colombia, la **Aeronáutica Civil** publica los NOTAM vigentes; su Dirección de Informática (DRT) emite el **resumen mensual de NOTAM vigentes** por series (pantalla 8).

**Series especiales:**
- **SNOWTAM** (Doc 8400, pág. 1-24): condiciones peligrosas por nieve, nieve fundente, hielo o agua en el área de movimiento.
- **ASHTAM** (bibliografía de curso, METARs-TAFs-NOTAMs pág. 20; definido normativamente en el Anexo 15): actividad volcánica / ceniza volcánica.

---

## Pantalla 3 — Anatomía del formato NOTAM

**El encabezado** (guía de interpretación, pág. 2; curso, pág. 21): cada NOTAM se identifica con **serie + número/año + tipo**. Ejemplo: `A0682/06 NOTAMN` = NOTAM de la serie A, número 0682 del año 2006, tipo "nuevo".

**Tipos de NOTAM** (curso, pág. 20; guía, pág. 2):

- **NOTAMN** (new) — nuevo.
- **NOTAMR** (replacing) — reemplaza a uno vigente (se indica cuál: `A0143/22 NOTAMR A2385/21`).
- **NOTAMC** (cancelation) — cancela uno vigente.
- *(La guía de interpretación menciona además "NOTAME (event)" para eventos; ese tipo no figura en el esquema OACI estándar N/R/C — tratarlo como particularidad de la fuente y verificar contra el Anexo 15.)*

**Las casillas Q) a G)** (Doc 8400, pág. 7-3; curso, págs. 21–31):

| Casilla | Contenido | Detalle |
|---|---|---|
| **Q)** | Calificativos: FIR / código NOTAM / tránsito / objetivo / alcance / límites / coordenadas+radio | Pantalla 4 |
| **A)** | Indicador OACI del aeródromo o FIR afectado | `A)SKBO`, `A)SKED` |
| **B)** | Inicio de validez, 10 dígitos AAMMDDHHMM en **UTC** | En NOTAMR y NOTAMC es la fecha/hora de creación (curso, pág. 27). Inicio del día = `0000`. |
| **C)** | Fin de validez (mismo formato) | `PERM` = permanente. Si es incierto, se estima y se marca `EST`. Fin del día = `2359`. NOTAMC no lleva C). (curso, pág. 28) |
| **D)** | Horario de actividad dentro del período B)–C), si la condición no es continua | Ej.: pista cerrada solo de `0500-1000` cada día (curso, pág. 29) |
| **E)** | Texto en lenguaje claro con abreviaturas OACI | Pantalla 6 |
| **F) G)** | Límites vertical inferior y superior (restricciones/avisos de espacio aéreo) | `GND`/`SFC` = tierra/superficie; `UNL` = ilimitado (curso, pág. 31) |

---

## Pantalla 4 — La línea Q, pieza por pieza

Ejemplo del curso (pág. 22): `Q)SEFG/QRALW/IV/NBO/AW/000/001/0202S07956W001`

1. **FIR** (`SEFG`): región de información de vuelo donde aplica.
2. **Código NOTAM** (`QRALW`): 5 letras, pantalla siguiente.
3. **Tránsito** (curso, pág. 24): `I` = IFR, `V` = VFR, `IV` = ambos, `K` = checklist.
4. **Objetivo** (curso, pág. 24): `N` = atención inmediata de la tripulación; `B` = entra al boletín previo al vuelo (PIB); `O` = concierne a operaciones de vuelo; `M` = misceláneo, no va a briefing, disponible a solicitud; `K` = checklist.
5. **Alcance** (curso, pág. 25): `A` = aeródromo, `E` = en ruta, `W` = advertencia de navegación (combinables: `AE`, `AW`).
6. **Límites** (curso, pág. 25): inferior/superior en niveles de vuelo. `000/999` = valores por defecto (toda altura).
7. **Coordenadas + radio**: centro del área y radio en NM (`0202S07956W001` = radio 1 NM).

El propio Doc 8400 decodifica estos calificativos en sus ejemplos (pág. 7-3): `IV/BO/AE` = IFR+VFR, boletín + significativo IFR, ayuda terminal y en ruta. **Las tablas normativas completas están en el Doc 8126.**

---

## Pantalla 5 — El código NOTAM de 5 letras

Reglas (Doc 8400, §3, pág. 7-1): cinco letras, siempre empieza por **Q**; **2ª/3ª = asunto**, **4ª/5ª = estado**.

**Asuntos (2ª/3ª letras):** AGA — `L` iluminación, `M` área de movimiento, `F` instalaciones y servicios · COM — `C` comunicaciones/radar, `I` ILS/MLS, `N` navegación, `G` GNSS · RAC — `A` espacio aéreo, `S` servicios ATS/VOLMET, `P` procedimientos · Avisos — `R` restricciones, `W` warnings · `O` otras informaciones.

**Estados (4ª/5ª letras):** `A` disponibilidad, `C` cambios, `H` peligro, `L` limitaciones, `XX` otro.

**Casos especiales (§3.3–3.8):** asunto o condición no listados → `XX` · `QKKKK` = checklist de NOTAM válidos · `TT` en 4ª/5ª = NOTAM iniciador de enmienda/suplemento AIP AIRAC · Cancelan un NOTAM: `AK` (operación normal reanudada), `AL` (opera con limitaciones ya publicadas), `AO` (operacional), `CC` (completado), `XX`.

**Ejemplos rápidos** (tablas del Doc 8400, sección 7):
`QMRLC` pista cerrada · `QMXLC` calle de rodaje cerrada · `QNVAS` VOR fuera de servicio · `QLPAS` PAPI inoperativo · `QPDAW` SID retirada definitivamente · `QWMLW` ejercicios de tiro se realizarán · `QOBCE` obstáculo montado.

---

## Pantalla 6 — La casilla E) y la fraseología abreviada

La casilla E) usa **abreviaturas OACI** y la **fraseología abreviada uniforme** del código, ampliada con pista, frecuencia, coordenadas o cifras (Doc 8400, §4–6, pág. 7-2). La ampliación del **asunto** va **antes** del significado; la del **estado**, **después**.

**Ejemplos oficiales de casilla E) (Doc 8400, pág. 7-2):**

| Situación | Casilla E) |
|---|---|
| Luces de zona de toma de contacto RWY 27 no disponibles por corte de energía | `RWY 27 RTZL NOT AVBL POR INTERRUPCIÓN DE PWR` |
| Luces de borde de TWY B disimuladas por nieve | `TWY B EDGE LGT OBSCURED BY SN` |
| Bancos de nieve de 15 ft en la franja de RWY 09/27 | `RWY 09/27 STRIP SN BANKS HGT 15 FT` |
| MSA de 90° a 180° hacia el VOR DOM cambiada a 3 600 ft MSL | `90 A 180 DEG INBD VOR DOM MSA CHANGED 3600 FT MSL` |

**Glosario mínimo para leer E)** (verificado en el Doc 8400, sección 1):

`AD` aeródromo · `ACFT` aeronave · `ACT` activo · `APCH` aproximación · `APN` plataforma · `AVBL` disponible · `BTN` entre · `CAT` categoría · `CLSD` cerrado · `CTN` precaución · `DLY` diariamente · `EQPT` equipo · `EST` estimado · `EXC` excepto · `EXER` ejercicios/ejercer · `FM` desde · `HGT` altura · `INSTL` instalado · `LGT` luz · `MAINT` mantenimiento · `NGT` noche · `NXT` siguiente · `OBST` obstáculo · `OPS` operaciones · `PERM` permanente · `PRKG` estacionamiento · `PSN` posición · `PWR` potencia · `RWY` pista · `SKED` horario · `SN` nieve · `SR`/`SS` salida/puesta del sol · `SFC` superficie · `THR` umbral · `TIL` hasta · `TKOF` despegue · `TWY` calle de rodaje · `U/S` inutilizable · `UFN` hasta nuevo aviso · `VCY` inmediaciones · `WEF` con efecto a partir de · `WI` dentro de · `WIP` obras en progreso · Distancias declaradas: `TORA` recorrido de despegue disponible · `TODA` distancia de despegue disponible · `ASDA` distancia aceleración-parada disponible · `LDA` distancia de aterrizaje disponible.

---

## Pantalla 7 — Decodificación completa, paso a paso

**Ejemplo oficial (Doc 8400, pág. 7-3 — decodificado casilla por casilla en el propio documento):**

```
Q) LFFF/QNDAU/IV/BO/AE/...
A) LFPO  B) 9203312359  C) 9204010600
E) DME NOT AVBL
```

1. `LFFF` → FIR París. 2. `QNDAU` → ND = DME; AU = no disponible. 3. `IV` → afecta IFR y VFR. 4. `BO` → va al boletín previo al vuelo; significativo para IFR. 5. `AE` → ayuda terminal y en ruta. 6. `A) LFPO` → París/Orly. 7. `B)` 31 mar 1992 23:59 UTC → `C)` 1 abr 1992 06:00 UTC. 8. `E)` DME no disponible.

**Ejemplo internacional decodificado (guía de interpretación, pág. 14):**

```
A0682/06 NOTAMN
Q)SCEZ/QMXLC/IV/M/A/000/999/3323S07047W005
A)SCEL B)0606091958 C)0606242359
E)TWY TANGO CLSD BTN TWY KILO AND ZULU PRKG ACFT
```

Serie A, nº 0682 de 2006, NOTAM nuevo. FIR Santiago; QMXLC = calle de rodaje (MX) cerrada (LC); afecta IFR y VFR; objetivo M (misceláneo); alcance A (aeródromo); 000/999 = niveles por defecto; círculo de 5 NM centrado en 33°23'S 70°47'W. En Arturo Merino Benítez (SCEL), del 9 jun 19:58 UTC al 24 jun 23:59 UTC de 2006: calle de rodaje TANGO cerrada entre KILO y ZULU por estacionamiento de aeronaves.

**Traducción operacional:** rodajes alternos en superficie; el cierre no afecta la pista.

---

## Pantalla 8 — NOTAMs en Colombia: el resumen mensual de la Aerocivil

La Dirección de Informática (DRT) de la Aerocivil publica el **resumen mensual de NOTAM vigentes** por series (los archivos reales de esta app: series **Alfa** y **Charlie/Delta**, corte 29 JUL 2026). El encabezado del resumen Charlie/Delta lo dice: *"Los siguientes NOTAM serie CHARLIE/DELTA continúan vigentes… Los no incluidos han sido cancelados, reemplazados, han expirado o fueron publicados en el Manual AIP/COLOMBIA"* — y **todas las horas son UTC**.

**Cómo se lee cada fila del resumen:**

```
C 2222/26   MAICAO/JORGE ISAACS (ANTES LA MINA) (SKLM)
            2606031100 / 2608302359 ,
            DIST DECLARADAS RWY 10/28 MODIFICADAS: ...
```

- `C 2222/26` = serie C, NOTAM 2222 del año 2026.
- Nombre del aeródromo o FIR + indicador OACI (casilla A).
- Las dos fechas = casillas B) y C); si aparece un bloque tipo `1100-2300`, es el **horario diario** (casilla D); `EST` y `PERM` funcionan igual que en el formato estándar.
- El texto = casilla E). En los NOTAM de espacio aéreo, las columnas Desde/Hasta equivalen a F) y G).
- `RPLC NOTAM C 0756/26` = reemplaza al NOTAM indicado (tipo NOTAMR).

**En el modo práctica de esta sección verás imágenes reales de este resumen** (SKPB, SKLM, SKBO, SKRG, FIR Bogotá y más) para entrenar con material colombiano auténtico.

---

## Pantalla 9 — Método de lectura en 6 pasos (resumen)

1. **Encabezado y A):** ¿qué NOTAM es (serie/número/tipo) y dónde aplica?
2. **Código Q:** 2ª/3ª = qué cosa; 4ª/5ª = qué le pasa.
3. **Tránsito y alcance:** ¿me aplica? (I/V, A/E/W).
4. **B) – C) – D):** ¿cuándo? Siempre UTC (Colombia = UTC−5). Ojo con `PERM`, `EST` y horarios diarios.
5. **E):** leer expandiendo abreviaturas; debe ser coherente con el código Q.
6. **F) y G)** si hay espacio aéreo: ¿entre qué niveles?

**Errores comunes** (los evalúa la sección de práctica):
- Confundir `LC` (cerrado) con `LI`/`LN`/`LV` (cerrado solo IFR / noche / VFR).
- Leer B)/C)/D) en hora local: **son UTC**.
- Ignorar `EST`: el fin es estimado; el NOTAM sigue vigente hasta reemplazo o cancelación.
- Pasar por alto el horario diario (casilla D o bloque `HHMM-HHMM` del resumen): "cerrado" puede ser solo unas horas al día.
- No revisar `RPLC`: si reemplaza a otro, el anterior ya no vale.

---

## Notas para el desarrollador (no mostrar al usuario)

- Niveles: pantallas 1–3 para principiante/estudiante; 4–9 desde piloto privado; para nivel aerolínea habilitar directo el modo práctica.
- Las tablas de las pantallas 5 y 6 se renderizan desde `notam_codes.json` (no duplicar a mano).
- Modo práctica: `ejercicios_interpretacion.json` (texto) + `notams_nacionales.json` (imágenes reales de los resúmenes Aerocivil en `assets/notams_nacionales/`).
- Pendiente normativo: cargar el **Anexo 15** (Apéndice 6) para eliminar las notas "verificar" en tipos de NOTAM y casilla D, y el **Doc 8126** para las tablas completas de calificativos. Las guías de curso cubren esos temas didácticamente, pero no son norma.
- Los resúmenes DRT vencen: rotar las imágenes de práctica cuando Camilo cargue resúmenes nuevos; el aviso "NOTAM real vencido, solo estudio" es obligatorio en la UI.

# Fuentes del curso METAR (Meteorología operacional)

Bibliografía entregada por Camilo el 30 jul 2026. Todo el contenido del curso
sale de estos dos manuales; lo que no está cubierto por ellos va **marcado en
el propio texto** como pendiente de validación con instructor, nunca rellenado
de memoria.

## Manuales

**M1. Leyenda para lectura de METAR y TAFOR** (Volar3.com, material de curso, PDF de 4 páginas)
- Tabla de fenómenos meteorológicos (BR, DS, DU, DZ, FC, +FC, FG, FU, GR, GS, HZ, IC, PE, PO, PY, RA, SA, SG, SN, SQ, SS, UP)
- Grupo calificación (-, ( ) moderado, +, ++, D, G, KT, M, N, P, RE, U, VC)
- Grupo descriptor (BC, BL, DR, FZ, MI, PR, SH, TX, TN, WS)
- Grupo nubosidad con octavos (SKC, FEW, SCT, BKN, OVC) y nubes (CB, TCU)
- Grupo estado (BECMG, CAVOK, FM, NOSIG, NSW, PROB, TEMPO, VRB)
- Otros (AMD, AO1, AO2, COR, LDG, NO, R/RVR, RWY, RMK, SLP, SM, SPECI, TKOF, VV)

**M2. Briefing para pilotos: METAR** (Erick De Paz, Meteorólogo Clase III OMM, presentación de curso)
- Definición de METAR y de dónde salen los datos
- Plantilla completa del informe (METAR CCCC YYGGggZ ...)
- Grupo de viento: dirección/velocidad, calma, VRB, ráfagas G, variación 160V240, cizalladura WS y su peligro en despegue y aterrizaje
- Visibilidad en metros y en millas terrestres, RVR con pistas L/C/R, tendencias U/D/N, pies en EE. UU.
- Condición del cielo: SKC, CAVOK (definido como cielo despejado y visibilidad mayor de 10 000 m), FEW/SCT/BKN/OVC con alturas en centenares de pies, TCU y CB, techo y mínimo VFR de 1000 ft en EE. UU.
- Tiempo presente: precipitaciones (DZ, RA, SN, IC, GR, UP) y oscurecedores (BR, DU, DS, FC, FG, FU, HZ, SA, SS, VA), calificación ligera/fuerte
- Temperatura y punto de rocío (20/12), definición de punto de rocío y su relación con niebla y nubes
- Altímetro: Q en hectopascales (Europa) y A en pulgadas (EE. UU.), QNH
- Notas: NOSIG, NSW, BECMG 1216, TEMPO 0306, PROB40 2022, FM 08, RMK, AO

## Qué manual cubre cada sección de la lección

| Sección | Fuente |
|---|---|
| 1. Qué es un METAR | M2 |
| 2. La plantilla completa | M2 (plantilla), ejemplo armado por Aviatory con formato de M2 |
| 3. El viento | M2 |
| 4. Visibilidad y RVR | M2 |
| 5. Tiempo presente | M1 (tablas) + M2 (precipitaciones y oscurecedores) |
| 6. Nubes y CAVOK | M1 (octavos) + M2 (alturas, techo, CAVOK) |
| 7. Temperatura, rocío y QNH | M2 |
| 8. Tendencias y comentarios | M1 (grupo estado, otros) + M2 (notas con ejemplos) |
| 9. Método de lectura | Síntesis de M1 y M2 (la rutina es editorial de Aviatory) |

## Puntos NO cubiertos por la bibliografía (marcados en el texto)

1. **TS (tormenta eléctrica) como descriptor.** Ninguno de los dos manuales lo
   trae en sus tablas, pero sin TS no se puede leer un +TSRA real. Se incluyó
   desde la clave estándar del Anexo 3 de la OACI, marcado para validar con
   instructor.
2. **Umbral FG/BR (1000 m).** La leyenda solo da los nombres. El umbral citado
   es el de la clave OACI, marcado en el texto.
3. **Definición completa de CAVOK** (sin nubes bajo 5000 ft ni CB/TCU). M2 lo
   define solo como despejado y visibilidad mayor de 10 000 m; la condición
   completa se marcó como pendiente de validación.
4. **PL (hielo granulado).** La clave vigente usa PL donde el manual M1 trae
   PE (bolas de hielo). El curso enseña PE como el manual; el decodificador
   marca PL como grupo no reconocido hasta validar la actualización.
5. **Frecuencia de publicación.** M2 cita observación cada 45 minutos; en la
   práctica varía por aeródromo. La lección dice "a intervalos regulares" sin
   comprometer una cifra.

## Decisión pendiente con Camilo

El tema en Ingreso a aerolínea promete "METAR, TAF y la meteorología de la
entrevista". Este curso v1 cubre METAR (lección + decodificador). El resumen
del tema se ajustó para prometer solo lo que existe; cuando haya curso TAF, se
restaura la promesa completa. M1 aplica también a TAF (la leyenda es
compartida), así que la base ya queda.

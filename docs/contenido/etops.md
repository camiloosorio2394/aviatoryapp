# AVIATORY · INGRESO A AEROLÍNEA → ETOPS / EDTO

## Contenido completo del módulo (fuente para implementación)

**Versión:** 1.0 · 25 de septiembre de 2026 · borrador para revisión técnica
**Nivel:** avanzado. Piloto comercial o de aerolínea que prepara selección, entrevista técnica y entrenamiento inicial. Se asume que ya domina IFR, planificación de vuelo, alternos, combustible básico, MEL, meteorología, performance, drift down, despresurización, ATC y FMS.
**Enfoque:** qué es, cuándo aplica, qué verifica la tripulación antes de entrar, qué vigila dentro, qué hace cuando algo falla y cómo decide una desviación. No es un módulo de certificación, confiabilidad de motores, mantenimiento ni ingeniería.
**Idioma:** español. Los términos en inglés se conservan porque así aparecen en el plan operacional de vuelo, en la MEL, en el QRH y en la entrevista.

---

## 0. FICHA DEL MÓDULO

| Campo | Valor |
|---|---|
| Ruta en la app | Ingreso a aerolínea → ETOPS / EDTO |
| Clave de módulo sugerida | `etops` |
| Capítulos | 75 (E01 a E75), en trece bloques |
| Imágenes | 25 huecos `[ESPACIO PARA IMAGEN]` y `[ESPACIO PARA IMAGEN ANOTADA]`, listados en el Anexo A |
| Práctica | Preguntas de entrevista (30, `p-01` a `p-30`, capítulo 74) · Mini simulador EDTO (15 escenarios, `sim-01` a `sim-15`, capítulo 75) · Errores frecuentes (15 fichas, capítulo 72) |
| Evaluación | Pendiente: banco aparte en `contenido/bancos/etops_evaluacion.json`, con el mismo formato de los demás módulos |
| Tiempo estimado | 3 a 8 min por capítulo, unas 6 h en total |

### Agrupación en bloques

| Bloque | Título | Capítulos |
|---|---|---|
| 1 | Qué es y por qué existe | 1 y 2 |
| 2 | Los tiempos | 3 a 8 |
| 3 | Los aeródromos | 9 a 16 |
| 4 | Los puntos de la ruta | 17 a 21 |
| 5 | El combustible | 22 a 25 |
| 6 | Las fallas | 26 a 31 |
| 7 | MEL y sistemas | 32 a 35 |
| 8 | Comunicaciones, navegación y meteorología en ruta | 36 a 38 |
| 9 | Decidir | 39 a 49 |
| 10 | El plan de vuelo y la operación | 50 a 56 |
| 11 | Conexiones y aclaraciones | 57 a 64 |
| 12 | Ejemplos | 65 a 71 |
| 13 | Cierre | 72 a 75 |

### El marco normativo que usa este módulo

Las cifras y las definiciones salen de documentos públicos y verificables. Cuando la OACI, la FAA y la Aerocivil difieren, se dice cuál es cuál; nunca se presenta el criterio de una autoridad como si fuera universal.

| Fuente | Qué aporta aquí |
|---|---|
| OACI Anexo 6, Parte I, 12.ª edición (julio de 2022), con la Enmienda 49 (28 de noviembre de 2024) | Las definiciones (tiempo umbral, tiempo máximo de desviación, combustible crítico para EDTO, sistema significativo para EDTO, aeródromo alterno en ruta) y las normas del numeral 4.7: cuándo una operación es EDTO, qué exige el Estado y qué debe reevaluarse antes de pasar el umbral |
| OACI Doc 10085, *Extended Diversion Time Operations (EDTO) Manual*, 1.ª edición (2017) | Por qué se pasó de ETOPS a EDTO, que el concepto cubre aviones con dos **o más** motores, y que a los de más de dos se les añaden sistemas con límite de tiempo y política de alternos, no certificación ni mantenimiento adicionales |
| FAA 14 CFR Parte 121: numerales 121.7, 121.106, 121.161, 121.374, 121.565, 121.624, 121.625, 121.631, 121.633 y 121.646, y Apéndice P | Definiciones de *adequate airport*, *ETOPS entry point* y *maximum diversion time*; los 60 y 180 minutos; la escala de combustible crítico con sus porcentajes; los sistemas con límite de tiempo menos 15 minutos; RFFS; qué debe cumplirse para seguir más allá del punto de entrada; el aterrizaje en el aeropuerto adecuado más cercano |
| FAA AC 120-42B, *Extended Operations (ETOPS and Polar Operations)*, 13 de junio de 2008 | La tabla de mínimos de planificación para alternos ETOPS, los escalones de aprobación (75, 90, 120, 138, 180, 207, 240 y más de 240 minutos), la filosofía *preclude and protect*, la lista de factores para decidir si un aeropuerto es *suitable* y las definiciones de sistemas significativos de los grupos 1 y 2 |
| Aerocivil, RAC 121 (versión vigente desde el 5 de agosto de 2025, con las resoluciones 1910 de 2022, 954 de 2024 y 1983 de 2025) | Las definiciones colombianas, el numeral 121.2581 completo (umbral de 60 y 180 minutos, sistemas con límite de tiempo, combustible crítico, comunicaciones), el 121.2625 (qué exige la Aerocivil para pasar el punto de entrada EDTO) y el 121.2645 (combustible) |
| AIP Colombia y circulares de la Aerocivil vigentes | Para los procedimientos particulares de las FIR y los requisitos detallados de aprobación |

**Lo que este módulo no usa:** EASA, por decisión editorial. Cuando algo dependa del avión o del operador, se dice, y la referencia es el AFM, el FCOM, el QRH, la MEL y el manual de operaciones.

**Sobre la circular GCEP-1.0-22-040 de la Aerocivil** («Procedimiento para la aprobación de operaciones con tiempo de desviación extendido — EDTO»): el encargo la cita como fuente. Al redactar esta versión no aparece en la biblioteca de circulares informativas del sitio de la autoridad, así que su contenido no se reproduce; el capítulo 64 la señala como documento a consultar. Lo que sí está en el RAC 121 se cita con su numeral.

### Cómo leer las cifras

Hay tres clases y conviene tenerlas separadas desde el principio, porque en una entrevista se nota quién lo tiene claro:

- **Cifras de la norma.** Valen mientras el Estado no publique otra cosa. Ejemplo: los 60 minutos que fijan el umbral para un bimotor en Colombia y en Estados Unidos.
- **Cifras del operador y de su aprobación.** Vienen en las especificaciones de operación de cada aerolínea y cambian de una a otra. Ejemplo: el tiempo máximo de desviación aprobado para una flota, o los mínimos de planificación de alterno que la autoridad le aceptó al operador.
- **Cifras del avión.** Las fija el AFM, el FCOM o el documento de configuración del fabricante, y cambian de flota en flota. Ejemplo: el tiempo de un sistema de supresión de incendio de carga. Cuando una cifra es de esta clase, el módulo lo dice y no inventa un número.

### Convenciones de bloques (para la implementación)

Cada capítulo sigue la misma plantilla. No todos los apartados aparecen en todos los capítulos.

| Marca en este documento | Bloque en la interfaz | Uso |
|---|---|---|
| `### Concepto` | Texto principal | La definición, corta o media |
| `### Lo que debe saber el piloto` | Texto principal | El desarrollo operacional |
| `### En una operación de aerolínea` | Bloque con borde lateral | Cómo aparece en un vuelo real |
| `### ¿Qué debe verificar?` | Lista de verificación | Lo que la tripulación mira |
| `### ¿Qué puede cambiar la decisión?` | Lista | Meteorología, combustible, MEL, performance, alternos |
| `### ¿Qué ocurre si algo falla?` | Texto con acento | La consecuencia operacional |
| `### En pocas palabras` | Tarjeta de cierre | 3 a 6 ideas para repasar |
| `[ESPACIO PARA IMAGEN]` | Marco de figura | Placeholder con descripción y objetivo |
| `[ESPACIO PARA IMAGEN ANOTADA]` | Marco de figura con flechas | Placeholder con imagen base, anotaciones y objetivo pedagógico |
| Tablas | Tabla responsive | Datos comparativos |

> **Aviso para el alumno, visible en la app:** este módulo es material de estudio de elaboración propia, no documentación oficial de ninguna autoridad, fabricante ni operador. Para volar, mandan el AFM, el FCOM, el QRH, la MEL y el manual de operaciones de tu aerolínea. Las listas de este módulo son resúmenes educativos, no listas de verificación aprobadas.

---

# TERMINOLOGÍA · ETOPS Y EDTO NO SON EXACTAMENTE LO MISMO

Antes del primer capítulo hay que deshacer una confusión que aparece en la mitad de las entrevistas.

**ETOPS** nació en los años ochenta. La OACI introdujo en 1985 las primeras disposiciones para las operaciones de largo alcance con bimotores, con la idea de que un avión de dos motores operara con un nivel de seguridad comparable al de los trimotores y cuatrimotores de la época. El acrónimo original significaba *Extended Range Twin-engine Operations*: operaciones de alcance extendido con bimotores. La palabra clave era **twin**: eran reglas para aviones de dos motores.

**EDTO** es el término actual de la OACI: *Extended Diversion Time Operations*, operaciones con tiempo de desviación extendido. Entró en el Anexo 6 con la Enmienda 36, en 2012. El Doc 10085 explica la razón del cambio de nombre con todas las letras: reflejar mejor el alcance de las nuevas normas, que ya no son solo para bimotores. En la definición vigente del Anexo 6 y del RAC 121, una EDTO es una operación de un avión **con dos o más motores de turbina** en la que el tiempo de desviación hasta un aeródromo alterno en ruta supera el umbral que fija el Estado.

Lo que cambió con EDTO, según el propio Doc 10085: para los bimotores, permitir desviaciones más largas sobre la base de la confiabilidad ya demostrada por los ETOPS existentes; para los aviones de más de dos motores, añadirles unas pocas exigencias operacionales —la consideración de los sistemas con límite de tiempo y una política de selección y vigilancia de alternos— **sin** añadirles requisitos de certificación ni de mantenimiento.

**¿Y por qué se sigue diciendo ETOPS?** Porque el Anexo 6 lo permite expresamente: la nota 1 del numeral 4.7.2.3 dice que «EDTO puede denominarse ETOPS en algunos documentos», y el RAC 121 repite la nota en el 121.2581. La FAA mantiene el acrónimo ETOPS, pero desde su regla de 2007 lo lee como *Extended Operations* y lo aplica también a aviones de pasajeros con más de dos motores más allá de 180 minutos. Los fabricantes, las aerolíneas, los manuales y los entrevistadores dicen ETOPS. Por eso este módulo se llama ETOPS / EDTO.

**La regla para la entrevista:** los dos términos se refieren al mismo concepto —tiempo de desviación a un aeródromo—, pero no son idénticos en todos los marcos. EDTO es el término OACI y colombiano y cubre aviones de dos o más motores. ETOPS es el término histórico, el de la FAA y el de la industria. Si te preguntan la diferencia, esa es la respuesta; si dices que «son exactamente lo mismo», estás dando por buena una simplificación que el Doc 10085 se toma una página en desmontar.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Línea de tiempo horizontal con tres hitos: 1985, «primeras disposiciones OACI para bimotores: ETOPS, Extended Range Twin-engine Operations»; 2007, «regla ETOPS de la FAA: Extended Operations, también aviones de más de dos motores»; 2012, «Enmienda 36 al Anexo 6: EDTO, Extended Diversion Time Operations, dos o más motores». Debajo, una banda que diga «Mismo concepto: tiempo de desviación a un aeródromo». A la derecha, dos etiquetas enfrentadas: «ETOPS: FAA, industria, manuales» y «EDTO: OACI, RAC 121». Código: ED-01.

OBJETIVO:
Que el piloto pueda decir en treinta segundos de dónde viene cada término, por qué cambió y por qué ambos siguen vivos.

---

# BLOQUE 1 · QUÉ ES Y POR QUÉ EXISTE

---

## 1. ¿QUÉ ES ETOPS / EDTO?

**ID:** E01 · **Tiempo:** 6 min

### Concepto

Una operación con tiempo de desviación extendido es un vuelo de un avión con dos o más motores de turbina en el que, en algún punto de la ruta, el tiempo necesario para llegar a un aeródromo alterno en ruta supera el **tiempo umbral** que fija el Estado del explotador. Así lo definen el Anexo 6 (numeral 4.7.2.1, nota 1) y el RAC 121 (numeral 121.001, «Operación con tiempo de desviación extendido»).

La palabra que manda es **tiempo**, no océano.

### Lo que debe saber el piloto

ETOPS/EDTO no es «volar sobre el agua». Es estar, durante una parte del vuelo, más lejos de un aeródromo adecuado de lo que la autoridad considera el límite normal. Eso puede ocurrir:

- sobre un océano, que es el caso más conocido;
- sobre regiones remotas, como la Amazonía, el Sahara o el norte de Canadá, donde puede haber tierra debajo y ningún aeródromo utilizable en cientos de millas;
- sobre grandes áreas continentales con pocos aeropuertos capaces de recibir un avión de transporte;
- sobre zonas polares, cuando corresponda, con requisitos adicionales que este módulo no desarrolla.

Y al revés: una operación oceánica no es automáticamente EDTO. Un cruce corto con aeródromos adecuados a menos del umbral en todo momento —por ejemplo, un vuelo del Caribe que nunca se aleja más de 60 minutos de un aeródromo adecuado— es oceánico y no es EDTO. El capítulo 62 vuelve sobre esta distinción.

El tiempo de desviación se calcula, según el Anexo 6 y el RAC 121, **en condiciones ISA y de aire en calma**, a la velocidad de crucero con un motor inoperativo para bimotores y a la velocidad de crucero con todos los motores operativos para aviones con más de dos. Es decir: es un tiempo de planificación, calculado con una regla fija, no el tiempo que tardarás ese día con el viento que haya.

### En una operación de aerolínea

En el plan operacional de vuelo, la tripulación ve una porción de la ruta marcada como segmento EDTO, con sus aeródromos alternos en ruta, sus puntos de igual tiempo y su combustible crítico. Antes de esa porción, el vuelo es un vuelo normal. Dentro, hay que haber comprobado que los alternos siguen sirviendo y que el avión sigue siendo capaz. Un vuelo Bogotá–Madrid tiene segmento EDTO sobre el Atlántico; un vuelo Bogotá–Leticia, según la flota y la aprobación del operador, puede tenerlo sobre la selva.

### ¿Qué debe verificar?

- Que el plan de vuelo identifica el segmento EDTO y sus puntos de entrada y salida.
- Que el avión y la tripulación están aprobados para EDTO y para el tiempo de desviación que exige esa ruta.
- Que entiendes de dónde sale ese tiempo: ISA, aire en calma, velocidad de referencia aprobada.

### En pocas palabras

- EDTO es tiempo de desviación a un aeródromo, no geografía.
- Puede ser sobre océano, selva, desierto o hielo; y un vuelo oceánico corto puede no serlo.
- Aplica a aviones de dos o más motores de turbina.
- El tiempo se calcula en ISA y aire en calma, a la velocidad que la norma fija según el número de motores.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Mapa esquemático con dos rutas. Arriba, una ruta continental sobre una zona remota sombreada (selva o desierto), con un solo aeródromo adecuado muy lejos de la ruta y la porción central marcada «SEGMENTO EDTO». Abajo, una ruta oceánica corta entre dos costas con tres aeródromos adecuados cercanos y círculos de 60 minutos que se solapan, rotulada «OCEÁNICA, NO EDTO». Una leyenda: «Lo que cuenta es el tiempo al aeródromo, no lo que hay debajo». Código: ED-02.

OBJETIVO:
Eliminar la idea «ETOPS = cruzar el océano» en una sola mirada.

---

## 2. ¿POR QUÉ EXISTE?

**ID:** E02 · **Tiempo:** 5 min

### Concepto

Existe porque, cuanto más tiempo necesita un avión para llegar a un aeródromo después de una falla, más cosas tienen que salir bien durante ese tiempo. EDTO es el conjunto de medidas que hacen que salgan bien.

### Lo que debe saber el piloto

El AC 120-42B resume la filosofía en dos palabras: **preclude and protect**. Primero, hacer todo lo posible para que la desviación no ocurra: motores y sistemas confiables, mantenimiento reforzado, verificación antes de salir. Segundo, si ocurre, que esté protegida: un aeródromo al que llegar, combustible para llegar, sistemas que aguanten el tiempo necesario y procedimientos para gestionarla.

Desde el asiento del piloto, lo que cambia cuando el aeródromo más cercano está lejos:

| Factor | Por qué pesa más lejos de un aeródromo |
|---|---|
| Confiabilidad | Una segunda falla durante una desviación larga tiene menos margen de recuperación |
| Combustible | Una falla de motor o una despresurización obliga a volar más bajo y gastar más, durante más tiempo |
| Alternos | Puede haber uno solo dentro del alcance; si deja de servir, no hay «siguiente» |
| Meteorología | Un pronóstico que se deteriora en el alterno cambia el plan entero, no un detalle |
| Capacidad de los sistemas | Hay sistemas que funcionan un tiempo limitado, y ese tiempo tiene que cubrir la desviación |
| Extinción de incendio en bodega | Es el ejemplo típico de sistema con límite de tiempo |
| Oxígeno | Tras una despresurización, condiciona a qué altitud puedes volar y por cuánto tiempo |
| MEL | Un ítem diferido que en un vuelo corto no importa puede quitar la capacidad EDTO |
| Planificación de la desviación | Puntos de igual tiempo, escenarios de falla y combustible crítico calculados antes de salir |
| Procedimientos de tripulación | Verificación antes de entrar, vigilancia dentro, decisión estructurada si algo pasa |

El Anexo 6 recoge lo mismo en su numeral 4.7.2.6 para los bimotores: al fijar el tiempo máximo de desviación, el Estado tiene que considerar la confiabilidad del sistema de propulsión, la certificación de aeronavegabilidad para EDTO y el programa de mantenimiento EDTO. Eso es lo que hay detrás; el piloto no lo administra, pero lo hereda.

### En una operación de aerolínea

La aerolínea no decide un día que va a hacer EDTO. Tiene que obtener una aprobación específica de su autoridad para cada combinación de avión y motor, con un tiempo máximo de desviación. Ese proceso —confiabilidad, mantenimiento, entrenamiento, procedimientos— es el «preclude». Lo que el piloto ve en cabina es el «protect»: el plan de vuelo, los alternos y las verificaciones.

### En pocas palabras

- Cuanto más lejos del aeródromo adecuado, más importa haber planificado qué hacer si algo falla.
- *Preclude and protect*: evitar la desviación y, si ocurre, protegerla.
- Confiabilidad, combustible, alternos, meteorología, sistemas con límite de tiempo, MEL y procedimientos: los diez factores que pesan más lejos de tierra.
- La aprobación la tiene el operador; el piloto opera dentro de ella.

---

# BLOQUE 2 · LOS TIEMPOS

---

## 3. THRESHOLD TIME · EL TIEMPO UMBRAL

**ID:** E03 · **Tiempo:** 7 min

### Concepto

El Anexo 6 lo define así: «alcance, expresado en tiempo, establecido por el Estado del explotador, hasta un aeródromo alterno en ruta, más allá del cual se requiere una aprobación específica para EDTO de ese Estado». Es la línea que separa un vuelo normal de una operación EDTO.

### Lo que debe saber el piloto

Tres cosas, en este orden.

**Primera: lo fija el Estado, no la OACI.** El numeral 4.7.2.1 del Anexo 6 dice que, salvo aprobación específica, ningún avión con dos o más motores de turbina operará en una ruta en la que el tiempo de desviación exceda «un umbral establecido para tales operaciones por ese Estado». El Anexo no pone el número; remite al Doc 10085 para orientar al Estado sobre cómo establecerlo.

**Segunda: en Colombia y en Estados Unidos el número es el mismo, pero hay que saber de dónde sale.** El RAC 121, numeral 121.2581 (b)(1), fija el umbral en **60 minutos para aviones con dos motores de turbina** y **180 minutos para aviones con tres o más**. La FAA, en el 14 CFR 121.161 y en las definiciones del 121.7, usa los mismos 60 minutos para bimotores y 180 minutos para aviones de pasajeros con más de dos motores. Coinciden; pero coinciden porque cada Estado lo escribió así, no porque sea una constante física.

**Tercera: se calcula con una regla fija.** ISA, aire en calma, velocidad de crucero con un motor inoperativo para bimotores, velocidad con todos los motores operativos para aviones de más de dos. El RAC 121 y el Anexo 6 lo dicen con las mismas palabras. No es «cuánto tardaría hoy con este viento»: es una distancia disfrazada de tiempo.

Y una nota que vale oro en entrevista: el Anexo 6 (4.7.2.1, nota 3) y el RAC 121 (121.2581, nota 3) permiten que los aeródromos de despegue y de destino cuenten como aeródromos alternos en ruta a efectos de EDTO. El círculo de 60 minutos no empieza en el primer alterno «de verdad»: empieza en el origen.

### En una operación de aerolínea

El despacho traza círculos de 60 minutos alrededor de cada aeródromo adecuado y mira si la ruta sale de todos ellos en algún punto. Si sale, ese vuelo es EDTO desde el punto donde sale hasta el punto donde vuelve a entrar. Si nunca sale, es un vuelo de más de 60 minutos con requisitos propios —el 4.7.1 del Anexo 6 y el 121.2581 (a) del RAC— pero no es EDTO.

### ¿Qué debe verificar?

- Cuál es el umbral aplicable a tu operador y tu flota, escrito en la aprobación específica; el RAC 121 (121.2581 (b)(2)) exige que la aprobación lo indique por cada combinación de avión y motor.
- Con qué velocidad de referencia lo calcula tu operador, porque esa velocidad es la que define dónde empieza el segmento.
- Que no memorizas «60 minutos» como una ley de la naturaleza: es lo que hoy dicen el RAC 121 y el 14 CFR 121 para bimotores.

### ¿Qué puede cambiar la decisión?

- Un cambio de flota: el umbral es por combinación avión-motor.
- Un cambio de Estado del explotador.
- Una operación con tres o más motores: el umbral pasa a 180 minutos en Colombia y en Estados Unidos.

### En pocas palabras

- El umbral lo fija el Estado; la OACI da la orientación, no la cifra.
- Colombia (RAC 121) y Estados Unidos (14 CFR 121): 60 minutos para bimotores, 180 para tres o más motores.
- Se calcula en ISA, aire en calma, a la velocidad de referencia que fija la norma.
- El aeródromo de salida y el de destino cuentan como alternos en ruta.
- Más allá del umbral, hace falta aprobación específica.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Mapa esquemático con un aeródromo A y, alrededor, un círculo rotulado «60 MIN · ISA · AIRE EN CALMA · VELOCIDAD CON UN MOTOR INOPERATIVO». Una ruta que cruza el mapa: la parte dentro del círculo rotulada «NON-EDTO AREA», el punto donde cruza la circunferencia rotulado «THRESHOLD» y la parte fuera rotulada «EDTO SEGMENT». Debajo, una nota: «El umbral lo fija el Estado. En Colombia y EE. UU.: 60 min para bimotores». Código: ED-03.

OBJETIVO:
Visualizar dónde empieza conceptualmente una operación EDTO y que el círculo es una regla de planificación, no el alcance real de ese día.

---

## 4. MAXIMUM DIVERSION TIME · EL TIEMPO MÁXIMO DE DESVIACIÓN

**ID:** E04 · **Tiempo:** 6 min

### Concepto

El Anexo 6 lo define como el «alcance máximo admisible, expresado en tiempo, desde un punto en una ruta hasta un aeródromo alterno en ruta». El RAC 121 lo llama «tiempo de desviación máximo» con la misma definición. La FAA, en el 121.7, lo define como el tiempo de desviación más largo autorizado para un vuelo bajo la autoridad ETOPS del operador.

### Lo que debe saber el piloto

Umbral y tiempo máximo son dos líneas distintas y hay que saber cuál es cuál:

| | Threshold time · tiempo umbral | Maximum diversion time · tiempo máximo de desviación |
|---|---|---|
| Qué es | Dónde **empiezan** a aplicar los requisitos EDTO | Hasta dónde **puede llegar** la desviación con la aprobación que tiene el operador |
| Quién lo fija | El Estado, para la operación en general | El Estado, en la aprobación específica de cada operador y cada combinación avión-motor (Anexo 6, 4.7.2.2; RAC 121, 121.2581 (b)(3)) |
| Ejemplo | 60 minutos para un bimotor en Colombia | 120, 180 o más minutos, según lo que ese operador tenga aprobado para esa flota |
| Para qué le sirve al piloto | Para saber dónde entra al segmento EDTO | Para saber qué rutas puede volar y qué aeródromos pueden ser alternos EDTO |

Una ruta es viable en EDTO si, en todo punto del segmento, hay un aeródromo alterno en ruta a no más del tiempo máximo de desviación aprobado. Ese tiempo se aprueba **por combinación de avión y motor**: la misma aerolínea puede tener 180 minutos en una flota y 120 en otra.

Hay un tercer tiempo que aparece más adelante y que conviene distinguir ya: el **tiempo de desviación real** de un día concreto, con viento y temperatura. El AC 120-42B, en el numeral 205, dice que el tiempo real puede exceder al autorizado siempre que el vuelo se conduzca dentro del área de operación ETOPS aprobada y cumpla los límites de los sistemas con tiempo limitado. Es decir: el tiempo máximo define el área; el viento del día define cuánto se tarda de verdad.

### En una operación de aerolínea

En las especificaciones de operación de la aerolínea figura, por flota, el tiempo máximo de desviación aprobado. El despacho construye el área de operación con ese tiempo y no con otro. Si la ruta del día no cabe dentro del área, no hay vuelo EDTO por esa ruta: hay otra ruta, otro avión o no hay vuelo.

### ¿Qué debe verificar?

- El tiempo máximo de desviación aprobado para el avión que vas a volar, no para «la aerolínea».
- Que todos los alternos EDTO del plan quedan dentro de ese tiempo.
- Que no confundes el máximo aprobado con el tiempo real hasta el alterno ese día.

### En pocas palabras

- El umbral dice dónde empieza EDTO; el máximo dice hasta dónde se puede estar lejos.
- El máximo lo aprueba el Estado por combinación avión-motor.
- El tiempo real del día, con viento, es un tercer número.
- No son lo mismo, y en entrevista lo preguntan por separado.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Un aeródromo en el centro y dos círculos concéntricos. El interior, más pequeño, rotulado «THRESHOLD TIME · dónde empiezan los requisitos EDTO». El exterior, mucho mayor, rotulado «MAXIMUM DIVERSION TIME · hasta dónde puede estar la ruta con la aprobación de este operador». Una ruta que pasa entre los dos círculos, con la zona entre ambos sombreada y rotulada «SEGMENTO EDTO POSIBLE». Código: ED-04.

OBJETIVO:
Mostrar visualmente que son dos radios distintos con dos funciones distintas.

---

## 5. ¿QUÉ SIGNIFICA ETOPS 120, 180, 207?

**ID:** E05 · **Tiempo:** 6 min

### Concepto

El número es el tiempo máximo de desviación aprobado, en minutos, calculado a la velocidad de crucero con un motor inoperativo en ISA y aire en calma. «ETOPS 180» significa que ese operador, con esa flota, puede planificar rutas en las que ningún punto queda a más de 180 minutos de un aeródromo alterno en ruta con esa regla de cálculo.

### Lo que debe saber el piloto

No existe una lista universal de números. Cada autoridad tiene su escalera, y cada operador sube hasta el peldaño que solicita y le aprueban. La de la FAA, tal como la describe el AC 120-42B en su numeral 402 y el Apéndice P de la Parte 121, para bimotores:

| Aprobación | Dónde aparece, según el AC 120-42B |
|---|---|
| 75 minutos | Caribe y Atlántico occidental, y otras áreas |
| 90 minutos | Micronesia |
| 120 minutos | Escalón general |
| 138 minutos | Un escalón intermedio histórico |
| 180 minutos | Escalón general |
| 207 minutos | Área del Pacífico Norte (NOPAC) |
| 240 minutos | Área polar norte, área al norte del NOPAC y Pacífico al norte del ecuador, con criterios de excepción propios |
| Más de 240 minutos | Solo para bimotores entre pares de ciudades concretos, y solo para operadores con 24 meses consecutivos en 180 o más, de los cuales 12 en 240 |

Para aviones de pasajeros con más de dos motores, la FAA no limita la autoridad a áreas geográficas, pero exige designar el alterno ETOPS disponible más cercano a lo largo de la ruta y permanecer, si es posible, dentro de 240 minutos.

Lo que el piloto debe retener no es la tabla, sino lo que significa: **el número depende de la autoridad, del avión, del operador, de la ruta y del área**. Un 180 en una flota no da 180 en otra, y un 240 aprobado para el Pacífico Norte no sirve para el Atlántico Sur. Y el número es un tiempo de planificación con reglas fijas: no dice que el avión «puede volar 180 minutos con un motor» como si fuera una autonomía.

### En una operación de aerolínea

La aprobación aparece en las especificaciones de operación. En cabina, se traduce en qué alternos EDTO puede listar el despacho y en qué rutas se pueden planificar. Un operador colombiano tiene la escalera que le apruebe la Aerocivil bajo el 121.2581 (b)(3); no tiene por qué coincidir con la lista de la FAA.

### ¿Qué debe verificar?

- Qué aprobación tiene tu operador para el avión que vuelas.
- Si esa aprobación está limitada a un área.
- Que la ruta del día está planificada dentro de ella.

### En pocas palabras

- El número es el tiempo máximo de desviación aprobado, en minutos, con la regla ISA y aire en calma.
- La escalera de aprobaciones es de cada autoridad; la de la FAA va de 75 a más de 240.
- Depende de autoridad, avión, operador, ruta y área.
- No es una autonomía con un motor: es una regla de planificación.

---

## 6. ÁREA DE OPERACIÓN

**ID:** E06 · **Tiempo:** 6 min

### Concepto

El área de operación EDTO es la región del mapa dentro de la cual el operador puede planificar rutas EDTO con su aprobación. Se construye dibujando, alrededor de cada aeródromo adecuado disponible, un círculo cuyo radio es la distancia que el avión recorre en el tiempo máximo de desviación aprobado, con la regla de cálculo de siempre.

### Lo que debe saber el piloto

El AC 120-42B, en el numeral 205, lo describe así para ETOPS hasta 180 minutos: el área está limitada por círculos de distancia que representan la velocidad aprobada con un motor inoperativo en condiciones estándar y aire en calma. Para más de 180 minutos, el cálculo del área sí debe tener en cuenta viento y temperatura.

La consecuencia práctica: **los alternos construyen el área**. Con tres aeródromos adecuados bien repartidos y una aprobación de 180 minutos, la unión de los tres círculos cubre una franja ancha del océano y la ruta cabe dentro. Si uno de esos aeródromos deja de ser adecuado —una pista cerrada por obras durante meses, por ejemplo—, el círculo desaparece y puede abrirse un hueco por el que la ruta ya no pasa. Ese es el vínculo entre un NOTAM aparentemente lejano y la viabilidad de un vuelo entero.

El Anexo 6 (4.7.2.2, nota) y el RAC 121 (121.2581 (b)(3), nota 1) remiten al Doc 10085 para las condiciones con que se convierte el tiempo máximo de desviación en distancia. El piloto no hace esa conversión; le llega hecha en el plan.

### En una operación de aerolínea

El área se define una vez, cuando se aprueba la operación, pero se comprueba cada día: el despacho verifica que los aeródromos que sostienen el área siguen siendo adecuados y que el avión del día sigue cabiendo. Si el vuelo se planifica con un tiempo máximo mayor del que la ruta necesita, hay más alternos posibles y más margen; el AC 120-42B recomienda planificar «al tiempo de desviación más corto que ofrezca la gama más amplia de opciones».

### ¿Qué debe verificar?

- Que la ruta del plan está dentro de la cobertura de los alternos EDTO listados.
- Qué aeródromo sostiene cada tramo del segmento EDTO: si ese aeródromo cae, ¿qué tramo se queda sin cobertura?
- Que no hay NOTAM que retire un aeródromo del área.

### En pocas palabras

- El área EDTO es la unión de los círculos de tiempo máximo de desviación alrededor de los aeródromos adecuados.
- Los alternos construyen el área; si uno cae, el área se rompe.
- Hasta 180 minutos, aire en calma; más allá, con viento y temperatura.
- Se aprueba una vez y se comprueba cada día.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Mapa oceánico ficticio con tres aeródromos alternos: uno en la costa de salida, uno en una isla a mitad de camino y uno en la costa de llegada. Desde cada uno, un círculo rotulado con el mismo tiempo, «180 MIN». La unión de los tres círculos sombreada y rotulada «ÁREA DE OPERACIÓN EDTO». La ruta cruzando el mapa por dentro de la sombra. En una esquina, el mismo mapa en miniatura con el círculo de la isla borrado y un hueco en la sombra por donde la ruta ya no cabe, rotulado «SI EL ALTERNO CENTRAL DEJA DE SER ADECUADO». Código: ED-05.

OBJETIVO:
Mostrar cómo los alternos permiten construir el área EDTO disponible y qué pasa cuando uno desaparece.

---

## 7. EDTO ENTRY POINT · EL PUNTO DE ENTRADA

**ID:** E07 · **Tiempo:** 5 min

### Concepto

El RAC 121 lo define en el numeral 121.001: «primer punto en ruta de un vuelo EDTO que esté a un tiempo de desviación de un aeródromo alterno en ruta superior al umbral de tiempo establecido en la sección 121.2581 (b)(1)». La FAA lo define en el 121.7 con el mismo sentido: el primer punto de la ruta, calculado con la velocidad con un motor inoperativo en condiciones estándar y aire en calma, que está a más de 60 minutos de un aeródromo adecuado para bimotores y a más de 180 para aviones de pasajeros con más de dos motores.

### Lo que debe saber el piloto

Es el punto donde el vuelo deja de ser normal y pasa a ser EDTO. Todo lo que la norma exige comprobar antes de entrar —alternos reevaluados, meteorología vigente, capacidad del avión— tiene que estar hecho **antes** de este punto, no en él.

Dos cosas que conviene tener claras:

- El punto de entrada se calcula con la regla fija (ISA, aire en calma, velocidad de referencia). No se mueve con el viento del día. Lo que sí cambia con el viento es cuánto tardarías de verdad en llegar al alterno desde ahí.
- Es un punto de planificación con nombre normativo en el RAC 121 y en el 14 CFR 121. La terminología del operador puede añadirle etiquetas propias en el plan de vuelo; este módulo usa el nombre de la norma.

### En una operación de aerolínea

En el plan operacional de vuelo aparece como un punto o un waypoint marcado. Antes de llegar, la tripulación completa la verificación de entrada que su operador tenga establecida, con la confirmación de que los alternos siguen sirviendo y de que ninguna falla ocurrida desde el despegue ha quitado la capacidad EDTO. El capítulo 53 la desarrolla; el RAC 121 (121.2625 (e) y (g)) y la FAA (121.631 (c)) fijan lo mínimo que hay que cumplir para pasarlo.

### ¿Qué debe verificar?

- Dónde está el punto de entrada en el plan de vuelo del día.
- Que la verificación previa a la entrada está hecha antes de llegar, con margen.
- Que el estado del avión desde el despegue no ha cambiado nada de lo que se asumió en el despacho.

### En pocas palabras

- Es el primer punto de la ruta a más del umbral de un aeródromo alterno en ruta.
- Se calcula con la regla fija; no se mueve con el viento.
- Todo lo que hay que comprobar, se comprueba antes de llegar a él.

---

## 8. EDTO EXIT POINT · EL PUNTO DE SALIDA

**ID:** E08 · **Tiempo:** 4 min

### Concepto

Es el punto de la ruta a partir del cual el avión vuelve a estar a menos del tiempo umbral de un aeródromo alterno en ruta. Desde ahí, el vuelo deja de ser EDTO y los requisitos específicos dejan de aplicar.

### Lo que debe saber el piloto

El concepto es el espejo del punto de entrada, con un matiz: no hay ningún alivio operacional que celebrar. Salir del segmento significa que hay más aeródromos cerca, no que el avión haya dejado de necesitar combustible, meteorología o sistemas. Muchos vuelos tienen más de un segmento EDTO —entrada, salida, otra entrada, otra salida— cuando la ruta pasa cerca de una isla con aeródromo adecuado y luego vuelve a alejarse.

La idea que hay que llevarse: **EDTO puede ser solo una parte del vuelo**. Un vuelo de once horas puede tener tres horas de EDTO y ocho de vuelo ordinario. El piloto tiene que saber en qué parte está en cada momento.

### En una operación de aerolínea

El plan de vuelo marca la salida igual que la entrada. Después de la salida, la tripulación sigue con la vigilancia normal de combustible y meteorología, y el alterno de destino recupera su protagonismo.

### En pocas palabras

- La salida es el punto donde la ruta vuelve a estar a menos del umbral de un aeródromo.
- Un vuelo puede entrar y salir de EDTO varias veces.
- EDTO es una parte del vuelo, no el vuelo entero.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Ruta recta de izquierda a derecha con seis marcas: ORIGIN, EDTO ENTRY, EDTO SEGMENT (un tramo sombreado), EDTO EXIT, DESTINATION. A ambos lados del segmento, aeródromos alternos con sus círculos de umbral: la entrada coincide con la salida del último círculo del lado del origen y la salida con la entrada al primer círculo del lado del destino. Debajo, una regla de tiempo total del vuelo con la porción EDTO resaltada, rotulada «EDTO ES UNA PARTE DEL VUELO». Código: ED-06.

OBJETIVO:
Visualizar que ETOPS/EDTO puede ser solamente una parte del vuelo, con un principio y un fin definidos por los aeródromos.

---
# BLOQUE 3 · LOS AERÓDROMOS

---

## 9. ADEQUATE AIRPORT · EL AERÓDROMO ADECUADO

**ID:** E09 · **Tiempo:** 7 min

### Concepto

Un aeródromo adecuado es uno que, por sus características físicas y sus servicios, puede recibir al avión. Es un juicio sobre el aeródromo, no sobre el día. La pregunta que responde es: **¿puede este aeropuerto entrar en la planificación de la desviación?**

### Lo que debe saber el piloto

La palabra tiene definición propia en cada marco, y no son idénticas:

| Marco | Qué exige para que un aeródromo sea adecuado |
|---|---|
| RAC 121, numeral 121.001 (modificado por la Resolución 1983 de 2025) | Que el explotador pueda listarlo en su manual de operaciones y que cumpla los numerales 121.680 y 121.685 (limitaciones de performance de aterrizaje), los requisitos operacionales del RAC 14 excluyendo los de RFFS/SSEI, y que cuente con un procedimiento de aproximación disponible |
| FAA, 14 CFR 121.7 y AC 120-42B | Que el operador pueda listarlo con aprobación de la FAA porque cumple las limitaciones de aterrizaje del 121.197 y, además, cumple la subparte D de la Parte 139 (excluyendo lo relativo a RFFS) o es un aeropuerto militar activo; los aeródromos fuera de la jurisdicción FAA pueden considerarse adecuados si cumplen el equivalente |
| OACI, Anexo 6 | No define «aeródromo adecuado» en el capítulo 1. Define «aeródromo alterno» como aquel «donde se dispone de los servicios e instalaciones necesarios, donde pueden cumplirse los requisitos de performance de la aeronave y que está operativo a la hora prevista de utilización», y desarrolla la adecuación en el Doc 10085 |

Lo común a los tres: pista y performance (el avión tiene que poder aterrizar ahí con su peso), instalaciones y servicios, y un procedimiento de aproximación. Lo que queda **fuera** de la definición de adecuado, a propósito, es el RFFS: en el RAC 121 y en la FAA, el servicio de extinción de incendios se exige aparte y con categorías propias cuando el aeródromo va a ser alterno EDTO (capítulo 12).

Lo que la definición **no** mira: el METAR de hoy. Un aeródromo adecuado con niebla cerrada sigue siendo adecuado. Lo que no es, ese día, es utilizable: eso es el capítulo siguiente.

### En una operación de aerolínea

El operador mantiene, en su manual, la lista de aeródromos adecuados por tipo de avión. Es una lista viva: cambia cuando una pista se alarga, cuando un aeropuerto pierde un servicio o cuando entra una flota nueva con otra performance de aterrizaje. El despacho solo puede elegir alternos EDTO de esa lista.

### ¿Qué debe verificar?

- Que cada alterno EDTO del plan es un aeródromo adecuado para tu tipo de avión según el manual de operaciones, no según tu intuición.
- Que la performance de aterrizaje del avión, con el peso previsto en la desviación, cabe en esa pista.
- Que hay un procedimiento de aproximación que tu avión y tu tripulación pueden volar.

### En pocas palabras

- Adecuado es un juicio sobre el aeródromo: pista, performance, servicios, aproximación.
- RAC 121 y FAA lo definen con sus propios requisitos; la OACI lo desarrolla en el Doc 10085.
- El RFFS se exige aparte, con categorías propias.
- Adecuado no mira el tiempo de hoy.

---

## 10. SUITABLE AIRPORT · EL AERÓDROMO UTILIZABLE

**ID:** E10 · **Tiempo:** 7 min

### Concepto

Un aeródromo es utilizable (*suitable*) cuando, además de ser adecuado, las condiciones de ese día y esa hora permiten aterrizar en él con seguridad: meteorología, estado de la pista, disponibilidad del procedimiento de aproximación, servicios en ese momento. Adecuado es una propiedad del aeródromo; utilizable es una propiedad del aeródromo **en un momento dado**.

### Lo que debe saber el piloto

Este es un punto clásico de entrevista y la respuesta corta es: **todo aeródromo utilizable es adecuado, pero no todo aeródromo adecuado es utilizable**.

El RAC 121 y el Anexo 6 no usan la palabra *suitable* como término definido; construyen la idea con la exigencia de que las condiciones en el alterno, a la hora prevista de utilización, sean iguales o superiores a los mínimos de utilización del explotador (Anexo 6, 4.7.1.1 b) y 4.7.2.5; RAC 121, 121.2581 (a)(1)(ii) y 121.2625 (e)). La FAA sí usa *suitable* en el 14 CFR 121.565: tras una falla de motor, el piloto de un bimotor debe aterrizar en el aeropuerto **utilizable más cercano en tiempo** en el que pueda hacerse un aterrizaje seguro. El AC 120-42B, en su numeral 303, enumera factores para juzgar si un aeropuerto es utilizable, y el capítulo 42 los trae completos.

Lo que convierte un aeródromo adecuado en no utilizable un día concreto:

- Techo o visibilidad por debajo de los mínimos de planificación exigidos durante la ventana de uso.
- Viento, con ráfagas, fuera de los límites del avión o por encima del viento cruzado máximo demostrado.
- Pista contaminada más allá de lo que la performance con un motor inoperativo admite.
- Un NOTAM que cierra la pista, la aproximación o las luces en la ventana de uso.
- Horario del aeropuerto cerrado a la hora prevista de llegada.

### En una operación de aerolínea

En el despacho, un aeródromo adecuado con el pronóstico por debajo de los mínimos de planificación no se lista como alterno EDTO. Si era el único que sostenía un tramo del área, la ruta cambia o el vuelo no sale. En vuelo, un alterno que deja de ser utilizable obliga a la reevaluación del capítulo 39 o del 40, según dónde esté el avión.

### ¿Qué debe verificar?

- Para cada alterno EDTO: el pronóstico en la **ventana** de uso, no solo el METAR actual.
- Viento y ráfagas contra los límites del avión y de la aproximación.
- NOTAM de pista, aproximación, luces y horario.
- Estado de la pista contra la performance de aterrizaje con un motor inoperativo.

### ¿Qué puede cambiar la decisión?

- Un TEMPO o un PROB40 por debajo de los mínimos en la ventana de uso: el AC 120-42B dice expresamente que hay que tenerlo en cuenta.
- Un cambio de viento que saque la única pista disponible de límites.
- Un cierre temporal de la aproximación.

### En pocas palabras

- Adecuado es el aeródromo; utilizable es el aeródromo hoy, a esa hora.
- Todo utilizable es adecuado; no todo adecuado es utilizable.
- Lo que lo quita: meteorología, viento, pista, NOTAM, horario.
- La FAA usa *suitable* en el 121.565: el más cercano en tiempo donde se pueda aterrizar con seguridad.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Dos tarjetas de aeropuerto, lado a lado. AIRPORT A: pista larga, aproximación de precisión, RFFS, y un cielo despejado en el recuadro de pronóstico; marcado con dos sellos verdes: «ADEQUATE» y «SUITABLE». AIRPORT B: la misma pista, la misma aproximación, el mismo RFFS, pero en el recuadro de pronóstico niebla y «BELOW PLANNING MINIMA 03–07Z»; marcado con un sello verde «ADEQUATE» y uno rojo «NOT SUITABLE FOR PLANNED USE». Debajo, una línea: «El aeródromo no cambió. El día sí». Código: ED-07.

OBJETIVO:
Visualizar que adequate y suitable no son sinónimos y que la diferencia está en el momento, no en el aeropuerto.

---

## 11. EN-ROUTE ALTERNATE · EL ALTERNO EN RUTA

**ID:** E11 · **Tiempo:** 6 min

### Concepto

El Anexo 6 y el RAC 121 lo definen igual: «aeródromo alterno en el que podría aterrizar una aeronave en el caso de que fuera necesario desviarse mientras se encuentra en ruta». Es el aeródromo que protege la parte central del vuelo, la que queda lejos del origen y del destino.

### Lo que debe saber el piloto

Hay cuatro alternos con funciones distintas, y en la entrevista conviene separarlos con precisión:

| Alterno | Para qué sirve | Definición |
|---|---|---|
| De despegue (*take-off alternate*) | Aterrizar poco después del despegue si no se puede volver al aeródromo de salida | Anexo 6, cap. 1; RAC 121, 121.001 |
| En ruta (*en-route alternate*) | Aterrizar si hay que desviarse mientras se está en ruta | Anexo 6, cap. 1; RAC 121, 121.001 |
| En ruta para EDTO (*EDTO en-route alternate*, *ETOPS Alternate Airport*) | Un alterno en ruta que además es adecuado, está listado en el manual del explotador y se designa en el plan operacional de vuelo para una desviación durante el segmento EDTO | RAC 121, 121.001 («Aeródromo alterno para EDTO»); FAA, 121.7 |
| De destino (*destination alternate*) | Aterrizar si es imposible o no aconsejable aterrizar en el destino | Anexo 6, cap. 1; RAC 121, 121.001 |

El alterno EDTO es, por tanto, un alterno en ruta con requisitos añadidos: tiene que ser adecuado, tiene que estar dentro del tiempo máximo de desviación, tiene que cumplir mínimos de planificación más exigentes (capítulo 14) y tiene que tener el RFFS que la norma pide (capítulo 12). El RAC 121 añade una frase que vale la pena leer dos veces: la definición «es aplicable a la planificación del vuelo y de ninguna manera limita la autoridad del piloto al mando durante el vuelo». Es decir: el alterno EDTO es a dónde se planificó ir; a dónde se va, si pasa algo, lo decide el comandante con lo que tenga delante.

Una nota práctica del Anexo 6 (4.7.2.1, nota 3) y del RAC 121 (121.2581, nota 3): para EDTO, el aeródromo de despegue y el de destino **pueden ser** alternos en ruta. En un cruce corto, los dos extremos del vuelo son los que sostienen el área.

### En una operación de aerolínea

El plan operacional de vuelo lista los alternos EDTO con su tiempo de desviación desde los puntos críticos, y a veces con sus mínimos de planificación. El comandante los repasa antes del despegue y antes del punto de entrada. Si en vuelo hay que desviarse, esos son los candidatos con los que se empieza a razonar; no los únicos.

### ¿Qué debe verificar?

- Cuáles son los alternos EDTO del plan y qué tramo cubre cada uno.
- Que cada uno es adecuado, está dentro del tiempo máximo y cumple mínimos y RFFS.
- Que entiendes que son alternos de planificación: en vuelo, mandan las condiciones reales y el juicio del comandante.

### En pocas palabras

- Cuatro alternos: de despegue, en ruta, en ruta para EDTO y de destino.
- El alterno EDTO es un alterno en ruta con más requisitos: adecuado, dentro del tiempo máximo, mínimos más altos, RFFS.
- Origen y destino pueden ser alternos en ruta para EDTO.
- La definición no limita la autoridad del comandante en vuelo: lo dice el RAC 121.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Ruta de origen a destino con cuatro aeródromos señalados con símbolos distintos: junto al origen, «TAKE-OFF ALTERNATE»; a mitad de camino, dos aeródromos rotulados «EN-ROUTE ALTERNATE» y, sobre uno de ellos, un segundo rótulo con marco resaltado «EDTO EN-ROUTE ALTERNATE · adecuado + dentro del tiempo máximo + mínimos EDTO + RFFS»; junto al destino, «DESTINATION ALTERNATE». Debajo de cada uno, una línea con su función en una frase. Código: ED-08.

OBJETIVO:
Que el piloto distinga de un vistazo los cuatro alternos y vea que el EDTO es un alterno en ruta con condiciones añadidas.

---

## 12. SELECCIÓN DE ALTERNOS EDTO

**ID:** E12 · **Tiempo:** 8 min

### Concepto

Elegir los alternos EDTO es tarea del despacho, con las reglas del manual de operaciones. Aceptar el despacho es tarea del comandante. Para aceptarlo con criterio hay que entender qué se miró al elegirlos y poder detectar lo que no cuadra.

### Lo que debe saber el piloto

Lo que el despacho tiene que haber comprobado, y lo que el piloto debe poder reconocer en el paquete de vuelo:

| Elemento | Qué se mira | Referencia |
|---|---|---|
| Pista | Longitud, ancho, resistencia y orientación contra la performance de aterrizaje con un motor inoperativo y con el peso previsto en la desviación | RAC 121, 121.001 (aeródromo adecuado); FAA, 121.7 |
| Capacidad de aproximación | Qué procedimientos hay, si el avión y la tripulación pueden volarlos, y cuántas pistas distintas cubren | AC 120-42B, numeral 303 (tabla de mínimos) |
| Meteorología y pronóstico | Techo, visibilidad, viento y ráfagas durante la ventana de uso, contra los mínimos de planificación de alterno EDTO | FAA, 121.624 (b); RAC 121, 121.2625 (c) y (e) |
| NOTAM | Pista, aproximación, radioayudas, luces, RFFS, horario, combustible | Capítulo 16 |
| Radioayudas y navegación | Que la aproximación que se cuenta esté realmente disponible | AC 120-42B, numeral 303 |
| RFFS | Categoría OACI 4 como mínimo para EDTO hasta 180 minutos; más allá, además, un aeródromo de categoría 7 dentro del tiempo autorizado | FAA, 121.106; AC 120-42B, numeral 303 |
| Performance | Terreno en la ruta de desviación, altitud de crucero con un motor inoperativo, aterrizaje | Módulo Performance |
| MEL | Ítems diferidos que afecten mínimos de aproximación o capacidad de navegación | AC 120-42B, numeral 303, nota 3 de la tabla |
| Estado de la pista | Contaminación, frenado, condición reportada | Módulo Aeropuertos |
| Terreno | MEA y obstáculos en la ruta de desviación con drift down | Módulo Performance |
| Restricciones operacionales | Horario, restricciones de ruido, requisitos de permiso, disponibilidad de servicios de escala | Manual de operaciones |

El piloto no repite el trabajo del despacho. Lo que hace es **leer el paquete con estas once cosas en la cabeza** y preguntar cuando algo no aparece o no cuadra: un alterno con una sola aproximación y un pronóstico justo, un NOTAM de RFFS reducido, un alterno cuya pista no admite el peso de aterrizaje que tendrá el avión tras una desviación temprana.

### En una operación de aerolínea

El comandante recibe el plan operacional de vuelo con los alternos EDTO listados. Los repasa uno por uno con el pronóstico y los NOTAM delante. Si acepta el despacho, acepta esos alternos como base de planificación. Lo que no acepta con eso es la obligación de ir a ellos si algo pasa: esa sigue siendo su decisión.

### ¿Qué debe verificar?

- Que cada alterno EDTO aparece con su tiempo de desviación y que ese tiempo cabe en el máximo aprobado.
- Que la meteorología pronosticada en la ventana de uso cumple los mínimos de planificación.
- Que ningún NOTAM retira la pista, la aproximación o el RFFS en la ventana.
- Que la performance de aterrizaje con un motor inoperativo cabe en la pista.
- Que los ítems MEL del día no cambian nada de lo anterior.

### ¿Qué puede cambiar la decisión?

- Un pronóstico que empeora entre la emisión del plan y el despegue.
- Un NOTAM nuevo.
- Un ítem MEL abierto en el último momento.
- Un cambio de carga que sube el peso de aterrizaje previsto.

### En pocas palabras

- El despacho elige; el comandante acepta con criterio.
- Once elementos: pista, aproximación, meteorología, NOTAM, radioayudas, RFFS, performance, MEL, estado de pista, terreno, restricciones.
- No se trata de convertir al piloto en despachador, sino de que sepa leer lo que le entregan.
- Aceptar el despacho no obliga a ir a esos alternos si algo pasa.

---

## 13. METEOROLOGÍA EN LOS ALTERNOS EDTO

**ID:** E13 · **Tiempo:** 7 min

### Concepto

La meteorología del alterno EDTO es crítica en la planificación porque es lo primero que convierte un aeródromo adecuado en no utilizable, y porque una desviación puede llegar a ese aeródromo horas después de haber salido, con el pronóstico ya cambiado.

### Lo que debe saber el piloto

Hay dos conjuntos de mínimos y no se pueden mezclar:

| | Mínimos de planificación (*planning minima*) | Mínimos de utilización o de aterrizaje (*operating / landing minima*) |
|---|---|---|
| Cuándo aplican | Al despachar y hasta el punto de entrada EDTO | Para decidir si de verdad se puede aterrizar; y, según la FAA y el RAC 121, para poder seguir más allá del punto de entrada |
| Cuánto exigen | Más que los de aterrizaje: se añaden incrementos de techo y visibilidad | Los de la aproximación, sin incrementos |
| Por qué son distintos | Porque el pronóstico tiene incertidumbre y la llegada al alterno puede ser horas después | Porque en el momento de aterrizar ya no hay pronóstico: hay realidad |
| Referencia | FAA, 121.624 (b) y AC 120-42B, numeral 303; RAC 121, 121.2625 (c) | FAA, 121.631 (c); RAC 121, 121.2625 (e); Anexo 6, 4.7.2.5 |

Lo que se mira en un alterno EDTO, según el AC 120-42B y el RAC 121:

- **Periodo del pronóstico**: la ventana de uso (capítulo 15), no la hora de emisión del plan.
- **Viento**: el AC exige que viento más ráfaga esté dentro de límites, incluidos los límites de visibilidad reducida, y dentro del viento cruzado máximo demostrado por el fabricante.
- **Visibilidad y techo**, contra los incrementos de planificación.
- **Disponibilidad de pista**: la pista que se cuenta tiene que ser la que estará abierta y con la aproximación disponible.
- **Deterioro**: un pronóstico que empeora dentro de la ventana es lo que hay que buscar, no el METAR de la hora de salida.
- **Fenómenos significativos**: engelamiento, tormentas, cizalladura.
- **Condicionales**: el AC 120-42B dice que los elementos condicionales no necesitan considerarse, **excepto** un PROB40 o un TEMPO por debajo de los mínimos de utilización aplicables, que sí hay que tener en cuenta.

Los valores concretos de los incrementos los fija cada marco (capítulo 14). Lo que no cambia es la lógica: para planificar se exige más; para aterrizar, lo que la aproximación permite.

### En una operación de aerolínea

En el despacho se compara el pronóstico de cada alterno EDTO, en su ventana, con los mínimos de planificación del manual. Antes del punto de entrada, la FAA y la Aerocivil piden que el pronóstico esté a o por encima de los mínimos de **utilización** en la ventana de uso, y que no haya condiciones que impidan una aproximación y aterrizaje seguros (121.631 (c); 121.2625 (e)). Desde ahí, el criterio que manda es si se puede aterrizar.

### ¿Qué debe verificar?

- Qué mínimos está usando el plan para cada alterno: de planificación o de utilización, y por qué.
- Que el pronóstico se lee en la ventana de uso.
- Que el viento con ráfaga entra en límites.
- Que los TEMPO y PROB40 por debajo de mínimos están contados.

### En pocas palabras

- Mínimos de planificación para despachar y hasta la entrada; de utilización desde la entrada.
- Los de planificación llevan incrementos porque el pronóstico tiene incertidumbre.
- Viento con ráfaga, visibilidad, techo, pista disponible, deterioro, fenómenos significativos.
- PROB40 y TEMPO por debajo de mínimos cuentan; lo dice el AC 120-42B.

---

## 14. EDTO ALTERNATE PLANNING MINIMA · LOS MÍNIMOS DE PLANIFICACIÓN

**ID:** E14 · **Tiempo:** 8 min

### Concepto

Son los incrementos que se suman a los mínimos de aproximación de un aeródromo para decidir, en el despacho, si puede listarse como alterno EDTO. Cada marco los fija a su manera; el piloto tiene que saber **leer** la tabla que use su operador, no memorizar una.

### Lo que debe saber el piloto

**Colombia.** El RAC 121, numeral 121.2625 (c), no da una tabla: dice que el explotador «especificará los valores apropiados para incrementar los mínimos de la altura de la base de las nubes y la visibilidad que se añadirán a los mínimos de utilización de aeródromo establecidos por ese explotador, que sean aceptables para la UAEAC», y remite al Doc 9976 de la OACI para orientar la elección de esos incrementos. Es decir: en Colombia los incrementos están en el manual de operaciones de cada aerolínea, aprobados por la Aerocivil.

**Estados Unidos.** La FAA, en el 14 CFR 121.624 (b), exige que el pronóstico esté a o por encima de los mínimos de alterno ETOPS **especificados en las especificaciones de operación del operador**. El AC 120-42B, en su numeral 303, recomienda la siguiente tabla para unas especificaciones típicas, con la advertencia de que las de cada operador deben reflejar los requisitos vigentes:

| Instalaciones de aproximación en el aeródromo | Techo | Visibilidad |
|---|---|---|
| Al menos una radioayuda operativa que provea una aproximación directa de no precisión, o de precisión de categoría I, o, cuando aplique, una maniobra de circuito desde un procedimiento por instrumentos | Se añaden **400 ft** a la MDA(H) o DA(H) aplicable | Se añade **1 milla terrestre (1.600 m)** al mínimo de aterrizaje |
| Al menos dos radioayudas operativas, cada una con una aproximación directa a **pistas distintas** utilizables | Se añaden **200 ft** a la mayor DA(H) o MDA(H) de las dos aproximaciones usadas | Se añade **½ milla terrestre (800 m)** al mayor mínimo de aterrizaje autorizado de las dos aproximaciones |
| Una aproximación ILS de categoría II autorizada y utilizable | **300 ft** | **¾ de milla terrestre (1.200 m)** o RVR 4.000 ft (1.200 m) |
| Una aproximación ILS de categoría III autorizada y utilizable | **200 ft** | **½ milla terrestre (800 m)** o RVR 1.800 ft (550 m) |

Las notas de la tabla, que son las que enseñan a leerla:

1. Para que una aproximación cuente como utilizable, el viento más ráfaga pronosticado tiene que estar dentro de los límites operativos, incluidos los de visibilidad reducida, y dentro del viento cruzado máximo demostrado por el fabricante.
2. Los elementos condicionales del pronóstico no se consideran, salvo un PROB40 o un TEMPO por debajo de los mínimos de utilización aplicables, que sí.
3. Cuando se despacha bajo la MEL, las limitaciones MEL que afecten mínimos de aproximación se consideran al determinar los mínimos del alterno ETOPS.
4. Fuera de Estados Unidos, por las diferencias en los estándares métricos de pronóstico, pueden usarse 700 m en lugar de 800 m.

Lo que la tabla enseña, más allá de las cifras: **cuantas más aproximaciones independientes a pistas distintas tenga el alterno, menos margen hace falta**, porque hay más maneras de entrar. Un aeródromo con una sola aproximación es frágil; con dos a pistas diferentes es robusto. Y una CAT II o CAT III cambia la escala entera.

### En una operación de aerolínea

En el despacho, cada alterno EDTO se compara con la tabla del manual de operaciones. Si el pronóstico en la ventana de uso no llega, el aeródromo no se lista, por muy adecuado que sea. Después del punto de entrada, la FAA y la Aerocivil dejan de exigir los incrementos: piden mínimos de utilización (capítulo 13).

### ¿Qué debe verificar?

- Qué tabla usa tu operador y dónde está en el manual.
- Cuántas aproximaciones independientes a pistas distintas tiene cada alterno, porque cambia la fila de la tabla.
- Que el pronóstico se compara en la ventana de uso con la fila correcta.
- Que los ítems MEL que afecten aproximación se han contado.

### En pocas palabras

- Los incrementos son del manual del operador, aprobados por su autoridad: RAC 121 lo dice así y la FAA remite a las especificaciones de operación.
- La tabla recomendada por el AC 120-42B: una aproximación, +400 ft y +1 milla; dos aproximaciones a pistas distintas, +200 ft y +½ milla; CAT II, 300 ft y ¾ de milla; CAT III, 200 ft y ½ milla.
- Más aproximaciones independientes, menos margen necesario.
- La tabla se lee, no se recita: viento con ráfaga, condicionales, MEL.

[ESPACIO PARA IMAGEN ANOTADA]

IMAGEN BASE:
La tabla de mínimos de planificación para alternos ETOPS del AC 120-42B, reproducida como tabla educativa de cuatro filas y tres columnas, con el título «MÍNIMOS DE PLANIFICACIÓN PARA ALTERNO EDTO · según AC 120-42B, numeral 303 · los valores de cada operador están en su manual». Código: ED-09.

ANOTACIONES:
→ FLECHA 1: a la primera columna, «Instalaciones de aproximación». EXPLICACIÓN: aquí se decide la fila. Cuenta cuántas aproximaciones directas independientes a pistas distintas tiene el aeródromo, y si alguna es CAT II o CAT III.
→ FLECHA 2: a la columna «Techo». EXPLICACIÓN: el incremento se suma a la DA(H) o MDA(H) de la aproximación; con dos aproximaciones, a la mayor de las dos.
→ FLECHA 3: a la columna «Visibilidad». EXPLICACIÓN: el incremento se suma al mínimo de aterrizaje; fuera de Estados Unidos, 700 m pueden sustituir a 800 m.
→ FLECHA 4: a una nota al pie, «PROB40 / TEMPO por debajo de mínimos». EXPLICACIÓN: los condicionales no cuentan, salvo estos dos por debajo de los mínimos de utilización, que sí.
→ FLECHA 5: a una nota al pie, «viento + ráfaga». EXPLICACIÓN: la aproximación solo es utilizable si el viento pronosticado con ráfaga cabe en los límites, incluido el viento cruzado demostrado.

OBJETIVO PEDAGÓGICO:
Enseñar a leer la tabla —qué fila, qué incremento, qué notas— en lugar de memorizar cuatro cifras que además pueden ser distintas en el manual del operador.

---

## 15. LA VENTANA DE VALIDEZ DEL ALTERNO

**ID:** E15 · **Tiempo:** 6 min

### Concepto

No basta con mirar el METAR de ahora. Un alterno EDTO se usa, si se usa, cuando se produce la desviación; y eso puede ser desde poco después del punto de entrada hasta poco antes de la salida, más el tiempo de la propia desviación. El periodo que hay que cubrir con el pronóstico es la **ventana de uso**.

### Lo que debe saber el piloto

Los tres marcos definen la ventana con palabras parecidas, y conviene citarlas:

- **OACI, Anexo 6, 4.7.2.5**: antes de pasar el umbral, los alternos en ruta identificados «han sido reevaluados en cuanto a disponibilidad» y la información más reciente indica que, «durante la hora prevista de utilización», las condiciones estarán a o por encima de los mínimos de utilización del explotador. El 4.3.5.3, para alternos en general, pide un margen adecuado en la hora prevista de utilización.
- **FAA, 14 CFR 121.631 (c)**: para continuar más allá del punto de entrada ETOPS, el pronóstico en cada alterno debe estar a o por encima de los mínimos de utilización «cuando pueda usarse», y lo define entre paréntesis: «desde la hora más temprana hasta la hora más tardía posible de aterrizaje». El AC 120-42B usa la misma frase para los mínimos de planificación: desde la hora más temprana de aterrizaje hasta la más tardía en ese aeródromo.
- **Aerocivil, RAC 121, 121.2625 (d)**: «la UAEAC aprobará un margen de tiempo establecido por el explotador para la hora prevista de utilización de un aeródromo», con remisión al Doc 9976 para fijar ese margen. En Colombia, el margen concreto está en el manual del operador.

La idea es la misma en los tres: **la ventana va desde la hora más temprana a la que podrías llegar a ese alterno hasta la más tardía**. La más temprana es una desviación justo después de la entrada; la más tardía, una desviación justo antes de la salida, más el tiempo de desviación. Para un segmento EDTO de tres horas con desviaciones de hasta dos, la ventana puede abarcar cinco horas o más. Un TAF que empieza bien y se cierra a las dos horas no sirve.

### En una operación de aerolínea

El despacho calcula la ventana de cada alterno y la compara con el TAF. El comandante la comprueba en el paquete: para cada alterno EDTO, ¿de qué hora a qué hora tengo que cubrir? Y antes del punto de entrada, la reevaluación del 121.2625 (e) y del 121.631 (c) se hace contra esa misma ventana con el pronóstico más reciente.

### ¿Qué debe verificar?

- La ventana de uso de cada alterno EDTO en el plan.
- Que el TAF cubre la ventana completa, no solo su inicio.
- Que los cambios del TAF dentro de la ventana —FM, BECMG, TEMPO, PROB— están leídos.
- El margen que tu operador tiene aprobado para la hora prevista de utilización, si el RAC 121 aplica.

### En pocas palabras

- La ventana va de la hora más temprana a la más tardía posible de aterrizaje en el alterno.
- FAA y Aerocivil lo escriben así; la OACI habla de la hora prevista de utilización reevaluada antes del umbral.
- Un METAR actual no cubre una ventana de cinco horas.
- El margen concreto, en Colombia, es del manual del operador aprobado por la Aerocivil.

---

## 16. NOTAM Y EDTO

**ID:** E16 · **Tiempo:** 6 min

### Concepto

Un NOTAM puede convertir un alterno EDTO planificado en un aeródromo que ya no sirve, sin que cambie ni el aeródromo ni el tiempo. Por eso, en EDTO, los NOTAM de los alternos se leen con la misma atención que los del destino.

### Lo que debe saber el piloto

Lo que un NOTAM puede quitar, y por qué importa en EDTO:

| NOTAM de | Qué le hace al alterno EDTO |
|---|---|
| Cierre de pista | Si es la única pista adecuada, deja de ser aeródromo adecuado durante el cierre |
| Aproximación no disponible | Cambia la fila de la tabla de mínimos (de dos aproximaciones a una) o deja el aeródromo sin aproximación utilizable |
| Iluminación | De noche, puede dejar la pista sin uso o subir los mínimos |
| Radioayuda fuera de servicio | Igual que la aproximación: puede quitar la única entrada o reducir a una |
| RFFS reducido | Por debajo de la categoría exigida (capítulo 12), el aeródromo no puede listarse como alterno EDTO |
| Horario del aeropuerto | Si la ventana de uso cae fuera del horario, no es utilizable en esa ventana |
| Combustible o servicios | No afecta a la desviación en sí, pero sí a lo que pasa después y a la decisión entre dos alternos parecidos |

La regla del AC 120-42B para la tripulación es de sentido común pero hay que decirla: **evaluar el impacto real**. Un NOTAM de una calle de rodaje cerrada no quita un alterno. Un NOTAM de PAPI fuera de servicio, de día, tampoco. Un NOTAM de la única ILS fuera de servicio en un aeródromo con pronóstico justo, sí puede quitarlo.

En Colombia, el 121.2625 (e)(2) del RAC 121 obliga a que, antes del punto de entrada, todos los alternos EDTO dentro del tiempo máximo de desviación hayan sido revisados y la tripulación informada «de cualquier cambio que haya ocurrido desde el despacho del vuelo». Los NOTAM nuevos son la mitad de esos cambios.

### En una operación de aerolínea

Los NOTAM de los alternos EDTO se leen en el despacho y se vuelven a leer antes del punto de entrada, porque un NOTAM publicado con el avión ya en el aire puede cerrar una pista en la ventana de uso. Si un alterno cae, el despacho puede enmendar el despacho para añadir otro dentro del tiempo máximo (RAC 121, 121.2625 (f)); si no hay otro, la ruta cambia.

### ¿Qué debe verificar?

- Los NOTAM de cada alterno EDTO en la ventana de uso: pista, aproximación, luces, radioayudas, RFFS, horario.
- Que un NOTAM publicado después del despacho ha llegado a la tripulación antes del punto de entrada.
- El impacto real: qué quita el NOTAM y qué no.

### ¿Qué puede cambiar la decisión?

- Un cierre de pista en la ventana de uso.
- Una aproximación fuera de servicio que cambie la fila de mínimos con un pronóstico justo.
- Un RFFS reducido por debajo de la categoría exigida.

### En pocas palabras

- Un NOTAM puede quitar un alterno EDTO sin que cambie el aeródromo.
- Pista, aproximación, luces, radioayudas, RFFS, horario, servicios: lo que hay que leer.
- Siempre el impacto real, no la longitud de la lista.
- Antes del punto de entrada, la tripulación tiene que estar informada de todo cambio desde el despacho (RAC 121, 121.2625 (e)(2)).

---
# BLOQUE 4 · LOS PUNTOS DE LA RUTA

---

## 17. EQUAL TIME POINT · EL PUNTO DE IGUAL TIEMPO

**ID:** E17 · **Tiempo:** 8 min

### Concepto

El punto de igual tiempo (ETP) es un punto de la ruta desde el cual el tiempo estimado de vuelo hasta dos aeródromos de referencia es el mismo, bajo las condiciones que se hayan usado para calcularlo: velocidad, altitud, viento y configuración del escenario. Es una herramienta de planificación y de conciencia situacional: le dice a la tripulación, en cada momento, cuál de los dos aeródromos está más cerca **en tiempo**.

### Lo que debe saber el piloto

Lo primero que hay que decir en una entrevista es lo que **no** es: el ETP no es el punto medio geográfico entre dos aeródromos. Solo coincide con él en un caso que casi nunca ocurre: sin viento, con la misma velocidad y la misma altitud hacia los dos lados.

De qué depende:

- **De la distancia** a cada aeródromo, evidentemente.
- **Del viento**: con viento de cola hacia un aeródromo y de frente hacia el otro, el ETP se desplaza hacia el aeródromo con viento de frente, porque hace falta estar más cerca de él para tardar lo mismo.
- **De la velocidad**: la que corresponda al escenario (con todos los motores, con un motor inoperativo, en crucero bajo tras despresurización).
- **De la condición de vuelo**: cada escenario tiene su altitud, su velocidad y su consumo, y por tanto su propio ETP (capítulo 19).

La forma sencilla de pensarlo: el ETP es el punto donde, si tuvieras que desviarte ahora mismo, dar la vuelta o seguir te costaría el mismo tiempo. Antes del ETP, el aeródromo de atrás está más cerca en tiempo; después, el de adelante. Eso es todo lo que el ETP afirma. **No afirma a dónde hay que ir**: eso lo deciden la falla, el tiempo, el combustible y el comandante (capítulos 69 a 71).

Un vuelo EDTO largo tiene varios ETP consecutivos —entre el origen y el primer alterno, entre alternos sucesivos, entre el último alterno y el destino— y cada uno se calcula para cada escenario de falla. El plan operacional de vuelo los lista con su posición, la hora estimada y el combustible previsto al pasar por ellos.

### En una operación de aerolínea

La tripulación sabe en todo momento entre qué dos aeródromos está y cuál es el ETP siguiente. Al pasar cada ETP, compara el combustible real con el previsto en el plan para ese punto (capítulo 25). Si ocurre una falla, el ETP le dice cuál de los dos aeródromos está más cerca en tiempo bajo las condiciones del cálculo; a partir de ahí empieza el razonamiento, no termina.

### ¿Qué debe verificar?

- Dónde están los ETP del segmento EDTO y entre qué aeródromos.
- Con qué escenario y qué viento se calculó cada uno.
- El combustible previsto al pasar por cada ETP, para compararlo con el real.

### En pocas palabras

- ETP: tiempo igual a dos aeródromos, bajo las condiciones del cálculo.
- No es el punto medio: el viento, la velocidad y la altitud lo mueven.
- Antes del ETP está más cerca en tiempo el de atrás; después, el de adelante.
- Informa. No decide.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Ruta horizontal entre dos aeródromos, A a la izquierda y B a la derecha. Una marca en el centro geométrico, en gris y tachada, rotulada «PUNTO MEDIO · no es el ETP». Otra marca, desplazada claramente hacia A, en color, rotulada «ETP». Una flecha de viento apuntando de B hacia A, rotulada «VIENTO DE FRENTE HACIA B». Desde el ETP, dos flechas curvas, una a cada aeródromo, ambas con la misma etiqueta: «TIME TO A = TIME TO B». Código: ED-10.

OBJETIVO:
Mostrar por qué el ETP no equivale a la mitad de la distancia: el viento lo desplaza hacia el lado donde hay que luchar contra él.

---

## 18. EL EFECTO DEL VIENTO SOBRE EL ETP

**ID:** E18 · **Tiempo:** 6 min

### Concepto

El viento es la variable que más mueve el ETP en la práctica. Con un viento fuerte en ruta, el ETP puede desplazarse muchas millas respecto del punto medio; y como cada escenario de falla vuela a una altitud distinta con un viento distinto, cada uno tiene su propio desplazamiento.

### Lo que debe saber el piloto

Tres situaciones, con los dos aeródromos A (atrás) y B (adelante):

| Situación | Dónde queda el ETP | Por qué |
|---|---|---|
| Sin viento | En el punto medio, si la velocidad es la misma hacia ambos | No hay nada que desequilibre los dos tiempos |
| Viento de cola hacia B, de frente hacia A | Desplazado hacia **A** | Volver contra el viento es más lento: para tardar lo mismo hay que estar más cerca de A |
| Viento de cola hacia A, de frente hacia B | Desplazado hacia **B** | Seguir contra el viento es más lento: hay que estar más cerca de B |

Regla mnemotécnica correcta: **el ETP se desplaza hacia el aeródromo al que se llega con viento de frente**. La regla equivocada que se oye a veces —«se desplaza en la dirección del viento»— es exactamente lo contrario.

Dos consecuencias operacionales:

- El viento que importa es el **del escenario**, no el de crucero. Tras una despresurización se vuela mucho más bajo, donde el viento puede ser distinto en fuerza y hasta en dirección. Por eso el ETP de despresurización no coincide con el de falla de motor.
- Si el viento real difiere del pronosticado, el ETP real se ha movido aunque el del plan diga lo mismo. Un cambio significativo de viento en ruta es motivo para pedir al despacho un recálculo (capítulo 25 y escenario 8 del capítulo 75).

### En una operación de aerolínea

El plan operacional de vuelo calcula los ETP con el viento pronosticado por niveles. En vuelo, si el FMS o el despacho detectan un viento muy diferente del previsto, los ETP se recalculan y la tripulación actualiza su modelo mental: «ahora el aeródromo de atrás me queda más lejos en tiempo de lo que decía el plan».

### ¿Qué debe verificar?

- El viento pronosticado en el nivel de crucero y en los niveles de cada escenario de desviación.
- Que el viento real en ruta se parece al del plan; si no, cuánto y hacia dónde se han movido los ETP.

### En pocas palabras

- El ETP se desplaza hacia el aeródromo al que se llega con viento de frente.
- Cada escenario tiene su altitud, su viento y su ETP.
- Viento real muy distinto del previsto: ETP distinto del previsto; se recalcula.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Tres bandas horizontales, una debajo de otra, cada una con la misma ruta entre A (izquierda) y B (derecha). Banda 1, «NO WIND»: el ETP en el centro. Banda 2, «STRONG WIND EASTBOUND (de cola hacia B)»: una flecha de viento apuntando a la derecha y el ETP desplazado hacia A, con una cota que marque el desplazamiento. Banda 3, «STRONG WIND WESTBOUND (de cola hacia A)»: flecha a la izquierda y el ETP desplazado hacia B. En las tres, la etiqueta «TIME TO A = TIME TO B» sobre el ETP. Código: ED-11.

OBJETIVO:
Comprender visualmente que el ETP se basa en tiempo, no solamente en distancia, y hacia dónde lo mueve el viento.

---

## 19. TIPOS DE ETP

**ID:** E19 · **Tiempo:** 6 min

### Concepto

No hay un ETP: hay uno por cada escenario de desviación que el operador calcula. Cada escenario vuela a una velocidad distinta, a una altitud distinta, con un viento distinto y con un consumo distinto; por tanto, el punto donde los tiempos se igualan es distinto.

### Lo que debe saber el piloto

Los escenarios que aparecen con más frecuencia en un plan operacional de vuelo EDTO, porque son los que la norma exige considerar para el combustible crítico (RAC 121, 121.2581 (b)(5); FAA, 121.646 (b)):

| Escenario | Qué se asume | Velocidad y altitud típicas |
|---|---|---|
| Falla de motor (*engine failure*) | Un motor inoperativo; descenso a la altitud de crucero con un motor inoperativo | Velocidad aprobada de crucero con un motor inoperativo, al nivel que el drift down permita |
| Despresurización (*depressurization*) | Pérdida rápida de presurización; descenso a una altitud segura compatible con los requisitos de oxígeno | Todos los motores, pero a un nivel bajo, con consumo alto |
| Combinado o crítico (*combined*) | Despresurización y falla de motor simultáneas | Un motor inoperativo, a nivel bajo: el peor de los casos en tiempo y combustible |

La nomenclatura exacta la pone cada operador y su software de despacho: unos los llaman ETP 1, 2 y 3; otros, ETP-ENG, ETP-DEP y ETP-ALL; otros, «critical ETP» al más limitante. No hay un nombre universal, y el piloto debe conocer el de su operador.

Por qué producen ETP distintos: el escenario de despresurización vuela más bajo y más lento respecto del suelo en muchos casos, con un viento distinto al de crucero; el de falla de motor vuela más lento pero más alto que el de despresurización; el combinado, lo peor de ambos. Tres velocidades, tres altitudes, tres vientos: tres puntos donde los tiempos se igualan.

### En una operación de aerolínea

El plan lista los ETP por escenario, con el combustible requerido desde cada uno hasta el alterno. En una falla real, la tripulación mira el ETP del escenario que le ha tocado —no el de crucero— para saber qué aeródromo está más cerca en tiempo bajo esas condiciones.

### ¿Qué debe verificar?

- Qué escenarios calcula tu operador y cómo los nombra en el plan.
- Cuál es el más limitante en combustible para el vuelo del día.
- Que sabes, para cada falla posible, qué ETP mirar.

### En pocas palabras

- Un ETP por escenario: falla de motor, despresurización, combinado.
- Velocidades, altitudes y vientos distintos producen ETP distintos.
- La nomenclatura es del operador; el concepto es el mismo.
- En una falla, se mira el ETP del escenario que corresponde.

---

## 20. ETP NO ES PNR

**ID:** E20 · **Tiempo:** 7 min

### Concepto

Tres puntos con nombres parecidos y funciones distintas: el punto de igual tiempo, el punto crítico y el punto de no retorno. Confundirlos es uno de los errores más frecuentes en entrevista, y de los más fáciles de evitar.

### Lo que debe saber el piloto

| Punto | Qué es | Qué pregunta responde |
|---|---|---|
| **ETP** · *Equal Time Point* · punto de igual tiempo | El punto desde el cual se tarda lo mismo en llegar a dos aeródromos de referencia, bajo las condiciones del cálculo | «¿Cuál de los dos aeródromos me queda más cerca en tiempo?» |
| **Critical Point** · punto crítico | En planificación EDTO, el punto de la ruta donde se evalúa el escenario de combustible crítico: el punto más desfavorable desde el que hay que poder llegar al alterno con la falla más limitante (Anexo 6, definición de combustible crítico para EDTO: «en el punto más crítico de la ruta»). En muchas metodologías coincide con un ETP; no por definición | «¿Desde qué punto es más exigente llegar al alterno con combustible?» |
| **PNR** · *Point of No Return* · punto de no retorno | El RAC 121 lo define: «último punto geográfico posible en el que la aeronave puede proceder tanto al aeródromo de destino como a un aeródromo alterno en ruta disponible para un vuelo determinado». Es una cuestión de **combustible y alcance**, no de tiempo igual | «¿Hasta dónde puedo llegar y todavía tener combustible para volver o desviarme?» |

Lo que los separa, en una frase cada uno:

- El ETP compara **tiempos** a dos aeródromos; no dice nada de si te alcanza el combustible.
- El punto crítico es donde el **combustible** para la desviación es más exigente; se evalúa con la falla más limitante.
- El PNR es el último punto desde el que **todavía puedes** ir a otro sitio; más allá, solo queda seguir.

Un vuelo EDTO normal pasa por sus ETP sin que eso signifique nada dramático: son referencias. Pasa por su punto crítico con el combustible verificado. Y no debería acercarse nunca a un PNR real en el sentido de «ya no puedo desviarme», porque toda la planificación EDTO está hecha para que siempre haya un alterno alcanzable.

### En una operación de aerolínea

En el plan operacional de vuelo verás ETP con su escenario, y un punto marcado como crítico para el combustible. El PNR, tal como lo define el RAC 121, es un concepto de planificación de combustible que aparece en operaciones a aeródromos aislados o en vuelos sin alterno de destino; en un plan EDTO bien hecho, la existencia de alternos en ruta a lo largo del segmento es justamente lo que evita quedar más allá de un punto de no retorno.

### En pocas palabras

- ETP: tiempo igual a dos aeródromos.
- Punto crítico: el punto donde el combustible de la desviación es más exigente con la falla más limitante.
- PNR: el último punto desde el que todavía se puede ir a otro sitio; es combustible y alcance, no tiempo igual.
- No son sinónimos, y el plan los marca por separado.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Una ruta de origen a destino con tres marcas de forma distinta: un círculo rotulado «ETP · tiempo igual a A y a B», un rombo rotulado «CRITICAL POINT · aquí el combustible de la desviación es más exigente» y un triángulo rotulado «PNR · último punto desde el que aún puedo volver o desviarme». Debajo de cada marca, una definición de una línea y la palabra clave en mayúsculas: TIEMPO, COMBUSTIBLE, ALCANCE. Código: ED-12.

OBJETIVO:
Eliminar una confusión frecuente en entrevistas: tres puntos, tres preguntas distintas.

---

## 21. CRITICAL POINT · EL PUNTO CRÍTICO

**ID:** E21 · **Tiempo:** 5 min

### Concepto

Dentro de la planificación EDTO, el punto crítico es el punto de la ruta donde se evalúa el escenario de combustible crítico: desde dónde, con la falla más limitante, es más exigente llegar al alterno EDTO con el combustible que la norma exige. La definición de combustible crítico del Anexo 6 y del RAC 121 lo nombra sin definirlo aparte: «en el punto más crítico de la ruta».

### Lo que debe saber el piloto

Dos aclaraciones, porque sobre este punto hay más confusión que norma:

- **No es automáticamente un ETP.** Con frecuencia el punto más exigente en combustible es el ETP del escenario más limitante, porque es donde el aeródromo más cercano está más lejos. Pero la metodología del operador puede evaluar el escenario crítico en más puntos o en puntos definidos de otra manera. El AC 120-42B, en su numeral 303, dice que los requisitos de sistemas con límite de tiempo deben cumplirse «en los puntos de igual tiempo entre alternos ETOPS determinados por los requisitos de combustible en ruta más limitantes»: relaciona los dos conceptos sin fundirlos.
- **Está ligado al escenario de combustible crítico** (capítulo 22). Sin escenario no hay punto crítico: el punto es crítico *para* una falla concreta y un alterno concreto.

Lo que el piloto hace con él: comprobar, al pasar, que el combustible real es igual o mayor que el que el plan exige en ese punto para el escenario crítico. Si es menor, la protección que la norma quiso dar ya no existe y hay que actuar antes de que haga falta (capítulo 25).

### En una operación de aerolínea

El plan marca el punto crítico con el combustible requerido. La tripulación lo trata como un punto de control de combustible obligatorio dentro del segmento EDTO.

### En pocas palabras

- El punto crítico es donde el combustible de la desviación con la falla más limitante es más exigente.
- Suele coincidir con un ETP; no por definición.
- Existe porque existe un escenario de combustible crítico.
- Al pasarlo, combustible real contra combustible requerido.

---

# BLOQUE 5 · EL COMBUSTIBLE

---

## 22. EDTO CRITICAL FUEL · EL COMBUSTIBLE CRÍTICO

**ID:** E22 · **Tiempo:** 9 min

### Concepto

El Anexo 6 lo define como «la cantidad de combustible necesaria para volar hasta un aeródromo alterno en ruta considerando, en el punto más crítico de la ruta, la falla del sistema que sea más limitante». El RAC 121 lo traduce palabra por palabra. Es la garantía de que, si lo peor ocurre en el peor sitio, el avión llega.

### Lo que debe saber el piloto

La norma no deja el escenario a la imaginación. El RAC 121, en el numeral 121.2581 (b)(5), y la FAA, en el 14 CFR 121.646 (b), lo escriben con la misma estructura. Lo que el avión tiene que llevar es **el mayor** de estos tres:

| Escenario | Qué se asume |
|---|---|
| **A. Despresurización** | Pérdida rápida de presurización en el punto más crítico, descenso a una altitud segura compatible con los requisitos de oxígeno, y vuelo hasta el alterno EDTO |
| **B. Despresurización y falla de motor simultáneas** | Ambas cosas en el punto más crítico; en bimotores, a la velocidad aprobada de crucero con un motor inoperativo; descenso a altitud segura con los requisitos de oxígeno |
| **C. Falla de motor** | Falla de motor seguida de descenso a la altitud de crucero con un motor inoperativo, a la velocidad aprobada (solo bimotores) |

Y sobre ese mayor valor, se añaden las correcciones. Aquí sí hay cifras, y son de la norma:

| Corrección | RAC 121, 121.2581 (b)(5) | FAA, 121.646 (b) |
|---|---|---|
| Viento | Aumentar la velocidad del viento pronosticado un 5 % (más viento de frente o menos de cola), o un 5 % de combustible si el explotador no usa vientos pronosticados | Igual: 5 % sobre el viento, o 5 % de combustible si no se usan modelos de viento aceptados |
| Engelamiento | El mayor de: combustible por hielo acumulado en superficies no calentadas durante el 10 % del tiempo pronosticado de engelamiento (incluido el antihielo de motores y alas en ese periodo), o combustible por antihielo de motores y, si aplica, alas, durante todo el tiempo pronosticado | Igual estructura: 10 % del tiempo de engelamiento con hielo en célula, o antihielo de motor y ala durante todo el tiempo previsto |
| Deterioro de motores | 5 %, salvo que el explotador mantenga un programa de monitoreo del consumo en crucero | 5 % por deterioro del consumo en crucero |
| Espera, aproximación y aterrizaje | 15 minutos a velocidad de espera a 450 m (1.500 ft) sobre la elevación del alterno EDTO, más aproximación y aterrizaje | 15 minutos a 1.500 ft, aproximación por instrumentos y aterrizaje |
| APU | Su consumo en las fases en que se considere fuente de energía | Igual |

En la OACI, el escenario no viene detallado en el Anexo 6: el numeral 4.7.2.4 dice que el combustible adicional del 4.3.6.3 f) 2) «incluirá el combustible necesario para cumplir el escenario de combustible crítico para EDTO establecido por el Estado del explotador», y remite al Doc 10085. Es decir: la OACI fija que exista el escenario y que lo defina el Estado; la FAA y la Aerocivil lo han definido, y con los mismos porcentajes.

Lo que el piloto retiene: **tres fallas, la peor de las tres, y cinco correcciones encima**. Ninguna de las cinco es opcional, y ninguna la elige la tripulación: vienen en el plan.

### En una operación de aerolínea

El despacho calcula el combustible crítico para cada alterno EDTO desde el punto crítico, con las correcciones. Si ese combustible supera el que el vuelo necesitaría de otro modo, el escenario EDTO se convierte en el limitante y el avión sale con más combustible del que pediría el viaje normal. En el plan aparece identificado, y la tripulación puede ver cuánto es y desde dónde.

### ¿Qué debe verificar?

- Qué escenario es el más limitante para el vuelo del día y desde qué punto.
- Cuánto combustible exige y que el avión lo lleva, con las correcciones.
- Que las condiciones que se asumieron —viento, engelamiento— se parecen a las del día.

### En pocas palabras

- Combustible crítico: el necesario para llegar al alterno desde el punto más crítico con la falla más limitante.
- Tres escenarios: despresurización, despresurización más falla de motor, falla de motor; se lleva el mayor.
- Cinco correcciones, con cifras de la norma: 5 % de viento, engelamiento, 5 % de deterioro, 15 minutos de espera más aproximación y aterrizaje, APU.
- OACI exige que exista y lo remite al Estado; RAC 121 y FAA lo detallan igual.

---

## 23. EL ESCENARIO DE COMBUSTIBLE CRÍTICO, EN UNA IMAGEN

**ID:** E23 · **Tiempo:** 5 min

### Concepto

Este capítulo existe para que el escenario del capítulo anterior se vea. Lo que el cálculo de combustible crítico protege es una secuencia completa: desde el punto crítico hasta el aterrizaje en el alterno, pasando por la falla, el descenso, la desviación, la espera, la aproximación y el aterrizaje.

### Lo que debe saber el piloto

La secuencia que el cálculo cubre, en orden:

1. **Falla** en el punto crítico: despresurización, falla de motor o ambas.
2. **Descenso**: a altitud segura compatible con el oxígeno (despresurización) o drift down a la altitud de crucero con un motor inoperativo (falla de motor). Es donde más combustible se pierde respecto del crucero.
3. **Desviación** hasta el alterno EDTO, a la velocidad del escenario, con el viento del escenario corregido un 5 %, y con antihielo si el pronóstico lo pide.
4. **Espera**: 15 minutos a 1.500 ft sobre el alterno.
5. **Aproximación y aterrizaje**.
6. Encima de todo, el 5 % de deterioro y el consumo de la APU si se cuenta con ella.

La suma de esos bloques, para el peor de los tres escenarios, es el combustible crítico. Si se compara con el combustible de un vuelo normal desde el mismo punto, la diferencia es enorme, y esa diferencia es lo que hace que EDTO pueda ser el limitante de combustible del vuelo.

### En pocas palabras

- Falla, descenso, desviación, espera, aproximación, aterrizaje: eso protege el cálculo.
- Cada bloque tiene su combustible y sus correcciones.
- Verlo en una imagen es la mejor forma de no olvidar ninguno.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Composición en dos mitades. Izquierda: mapa con la ruta, el punto EDTO ENTRY, un rombo CRITICAL POINT y un aeródromo EDTO ALTERNATE, con una flecha desde el punto crítico hasta el alterno. Derecha: una columna vertical de bloques apilados, de arriba abajo: «FAILURE · en el punto crítico», «DESCENT / DRIFT DOWN», «DIVERSION · velocidad del escenario · viento +5 % · antihielo», «HOLDING · 15 min a 1.500 ft», «APPROACH», «LANDING», y a un lado dos bandas finas que abarcan toda la columna: «+5 % deterioro» y «APU». Junto a la columna, otra mucho más corta, en gris, rotulada «combustible de un vuelo normal desde el mismo punto», para que se vea la diferencia. Código: ED-13.

OBJETIVO:
Visualizar qué intenta proteger el cálculo de combustible crítico y por qué puede ser el limitante del vuelo.

---

## 24. EDTO FUEL Y TRIP FUEL NO SON LO MISMO

**ID:** E24 · **Tiempo:** 7 min

### Concepto

El combustible EDTO no es «un poco más de contingencia». Es un requisito distinto, que se compara con la suma normal y que, cuando gana, manda. Hay que saber dónde encaja en la estructura de combustible que el módulo Gestión del combustible ya enseñó.

### Lo que debe saber el piloto

La estructura del Anexo 6, numeral 4.3.6.3, que el RAC 121 sigue en el 121.2645:

| Bloque | Qué es | Dónde entra EDTO |
|---|---|---|
| Taxi fuel | Lo que se consume antes del despegue, APU incluida | No |
| Trip fuel | Del despegue al aterrizaje en destino | No |
| Contingency fuel | Un 5 % del trip, y nunca menos de 5 minutos de espera a 1.500 ft sobre el destino, para imprevistos | No: la contingencia protege el viaje al destino, no la desviación |
| Destination alternate fuel | Frustrada, subida, ruta, descenso, aproximación y aterrizaje en el alterno de destino | No |
| Final reserve fuel | La reserva final, que nunca se planifica gastar | No |
| **Additional fuel** | Lo que haga falta para que, con una falla en el punto más crítico, se pueda llegar a un alterno; **aquí está el combustible crítico EDTO** (Anexo 6, 4.7.2.4: el combustible adicional del 4.3.6.3 f) 2) incluirá el del escenario crítico EDTO; RAC 121, 121.2581 (b)(5): el combustible adicional del 121.2645 (c)(6)(ii)) | **Sí** |
| Discretionary fuel | Lo que el comandante añade | No |

La relación entre ellos no es una suma ciega. El plan tiene que demostrar dos cosas a la vez: que el vuelo normal está cubierto (taxi, trip, contingencia, alterno, reserva) y que el escenario EDTO está cubierto (desde el punto crítico hasta el alterno con las correcciones). Cuando el segundo exige más combustible a bordo en el punto crítico del que el primero dejaría ahí, el escenario EDTO se convierte en **limitante**: el avión sale con más combustible, o con menos carga, o por otra ruta.

Por eso «ETOPS fuel es simplemente más contingency fuel» es falso en dos sentidos: no es contingencia, es combustible adicional; y no es «un poco más»: puede ser el número que decide el vuelo.

### En una operación de aerolínea

En el plan operacional de vuelo hay una línea de combustible adicional identificada como EDTO o como crítico, con el punto y el alterno que lo generan. Cuando el despacho dice que un vuelo «va limitado por EDTO», significa que ese es el requisito que fijó el combustible de salida. Conviene entender por qué, porque en vuelo el margen sobre ese requisito es el que hay que vigilar.

### ¿Qué debe verificar?

- Dónde está el combustible EDTO en el desglose del plan y cuánto es.
- Si el vuelo del día está limitado por EDTO o por el viaje normal.
- Que el margen sobre el requisito crítico se mantiene en vuelo (capítulo 25).

### En pocas palabras

- El combustible crítico EDTO va en el combustible adicional, no en la contingencia.
- El plan tiene que cumplir el viaje normal y el escenario EDTO; el que exige más, manda.
- Cuando EDTO es el limitante, decide el combustible de salida, la carga o la ruta.
- Conecta con el módulo Gestión del combustible: misma estructura, un bloque más.

---

## 25. FUEL CHECK DURANTE EDTO

**ID:** E25 · **Tiempo:** 7 min

### Concepto

Dentro del segmento EDTO, el combustible se vigila contra dos referencias a la vez: la del viaje normal, como en cualquier vuelo, y la del escenario crítico en cada punto de control. La segunda es la que este módulo añade.

### Lo que debe saber el piloto

Lo que la tripulación compara, en cada punto de control y en especial al pasar cada ETP y el punto crítico:

| Qué | Con qué se compara | Qué significa una diferencia |
|---|---|---|
| Combustible real a bordo | Combustible previsto en el plan para ese punto | Un déficit sostenido indica más consumo o más viento de frente del previsto |
| Combustible real a bordo | Combustible **requerido** para el escenario crítico desde ese punto | Si el real cae por debajo del requerido, la protección EDTO ya no existe en ese punto |
| Predicción de combustible al destino (FMS) | Destino, alterno de destino y reserva final | Como en cualquier vuelo |
| Viento real | Viento del plan | Un cambio significativo mueve los ETP y el combustible de desviación |
| Meteorología de los alternos EDTO | Pronóstico en la ventana de uso | Un alterno que empeora puede cambiar el escenario limitante |
| Combustible de desviación desde la posición actual | Alterno EDTO más cercano en tiempo | Es la cifra que hay que tener siempre en la cabeza dentro del segmento |

La norma no fija tolerancias para estas comparaciones: no hay un porcentaje de la OACI, de la FAA ni del RAC 121 que diga «si vas un 3 % por debajo, actúa». Los umbrales de actuación, si existen, están en el manual de operaciones del operador y en sus procedimientos de gestión de combustible en vuelo; este módulo no los inventa.

Lo que sí es de norma es la consecuencia: si el combustible real deja de cubrir el escenario crítico, el vuelo ya no cumple la condición con la que se despachó. Las opciones habituales son cambiar de nivel o velocidad para recuperar margen, redespachar hacia un alterno EDTO distinto que exija menos, o desviarse antes de que la falta de combustible decida por la tripulación. Cuál de ellas, lo dicen las circunstancias y el manual.

### En una operación de aerolínea

En cada ETP y en el punto crítico, un piloto anota el combustible real y lo compara con el del plan y con el requerido. Si hay déficit, se habla con el despacho antes de que el problema crezca: en EDTO, el momento de resolver un déficit de combustible es cuando todavía hay dos alternos alcanzables, no cuando queda uno.

### ¿Qué debe verificar?

- Real contra previsto y real contra requerido, en cada punto de control.
- La predicción al destino con alterno y reserva.
- Viento real contra viento del plan.
- Meteorología de los alternos EDTO en la ventana.
- Combustible de desviación al alterno más cercano en tiempo, siempre.

### ¿Qué puede cambiar la decisión?

- Un déficit que crece.
- Un viento de frente sostenido mayor que el previsto.
- Un alterno que deja de servir y obliga a contar con otro más lejano.

### En pocas palabras

- Dentro de EDTO se vigila el combustible contra el plan y contra el escenario crítico.
- Tolerancias: las del manual del operador; la norma no las fija.
- Si el real deja de cubrir el escenario, el vuelo ya no cumple la condición del despacho: se actúa antes.
- El combustible de desviación al alterno más cercano es la cifra que nunca se pierde de vista.

---
# BLOQUE 6 · LAS FALLAS

---

## 26. EDTO Y DESPRESURIZACIÓN

**ID:** E26 · **Tiempo:** 7 min

### Concepto

Una despresurización dentro del segmento EDTO obliga a bajar, y bajar cambia todo lo que el plan asumía: velocidad, consumo, viento y tiempo hasta el alterno. Por eso es uno de los escenarios que la norma obliga a considerar en el combustible crítico, y muchas veces el más limitante.

### Lo que debe saber el piloto

Este módulo no repite el procedimiento QRH de despresurización; asume que se conoce. Lo que añade es la lectura EDTO de sus consecuencias:

| Consecuencia | Por qué importa en EDTO |
|---|---|
| Descenso de emergencia | Se pierde altitud y se cae a un nivel donde el consumo por milla es mucho mayor |
| Operación a nivel inferior | El nivel lo condiciona el oxígeno: el RAC 121 exige que el descenso sea a una altitud segura «en cumplimiento con los requisitos de oxígeno de las secciones 121.925 y 121.930»; cuánto oxígeno de pasajeros hay a bordo es una cifra del avión y del operador |
| Mayor consumo | La misma distancia al alterno cuesta mucho más combustible |
| Nueva velocidad | La velocidad del escenario ya no es la de crucero |
| Viento distinto | A nivel bajo el viento puede ser otro, y el ETP de despresurización está donde está por eso |
| Desviación | Salvo que el alterno de destino quede a menos tiempo, el vuelo se va al alterno EDTO más adecuado a la situación |

Lo que distingue este escenario del de falla de motor: **el avión conserva todos los motores**, así que la performance no es el problema; el problema es el oxígeno, que fija la altitud, y la altitud, que fija el consumo. Por eso la despresurización, con todos los motores, puede exigir más combustible que la falla de un motor a una altitud de drift down más alta.

### En una operación de aerolínea

Tras el descenso y con el avión estabilizado, la tripulación mira el ETP de despresurización y el combustible requerido desde su posición hasta el alterno más cercano en tiempo a ese nivel, comprueba la predicción y coordina con ATC y con el despacho. Si el plan se hizo bien, el combustible alcanza: eso es lo que el escenario A del combustible crítico garantizaba.

### ¿Qué debe verificar?

- A qué altitud puede quedarse el avión, según el oxígeno de pasajeros que lleva; es una cifra del avión y del operador, no de este módulo.
- El combustible requerido hasta el alterno a ese nivel, con el viento de ese nivel.
- Cuál es el alterno más cercano en tiempo bajo estas condiciones: el ETP de despresurización lo dice.

### ¿Qué ocurre si algo falla?

Si además falla un motor, se entra en el escenario combinado, el más severo: nivel bajo por el oxígeno y velocidad con un motor inoperativo. Es el escenario B del capítulo 22 y existe exactamente para este caso.

### En pocas palabras

- Despresurización: se baja, se gasta mucho más y se vuela con otro viento.
- La altitud la fija el oxígeno; el consumo lo fija la altitud.
- Puede ser el escenario más limitante aunque no haya fallado ningún motor.
- No es el procedimiento QRH: es lo que ese procedimiento le hace al plan de combustible.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Perfil vertical de izquierda a derecha. Crucero en FL390 en una línea alta y estable. Un punto marcado «DEPRESSURIZATION». Desde ahí, una bajada pronunciada rotulada «EMERGENCY DESCENT». Luego un tramo horizontal mucho más bajo rotulado «LOWER CRUISE ALTITUDE · la fija el oxígeno», con una etiqueta de consumo por milla claramente mayor que la del crucero. Al final, un aeródromo rotulado «EDTO ALTERNATE». Bajo el perfil, una regla de combustible que compare, para la misma distancia, el consumo en crucero y el consumo a nivel bajo. Código: ED-14.

OBJETIVO:
Mostrar por qué una despresurización cambia drásticamente combustible y tiempo aunque el avión conserve todos sus motores.

---

## 27. ENGINE FAILURE DURANTE EDTO

**ID:** E27 · **Tiempo:** 7 min

### Concepto

Una falla de motor en el segmento EDTO es el escenario que dio origen a todo esto. Lo que cambia respecto de una falla de motor cerca de un aeródromo es que la desviación es larga, y por tanto la performance con un motor inoperativo, el combustible y la elección del alterno pesan más que nunca.

### Lo que debe saber el piloto

Solo lo operacional; la mecánica del motor no es de este módulo.

| Consecuencia | Lectura EDTO |
|---|---|
| Parada del motor | Se ejecuta el QRH; en EDTO, además, se reporta en cuanto sea posible (FAA, 121.565 (c)) y se avisa al despacho |
| Drift down | Se pierde altitud hasta la de crucero con un motor inoperativo; el capítulo 28 lo conecta con el terreno |
| Velocidad reducida | La velocidad del escenario es la aprobada de crucero con un motor inoperativo |
| Altitud distinta | Más baja que el crucero, pero normalmente más alta que la del escenario de despresurización |
| Mayor consumo | El motor restante trabaja más y el avión vuela más bajo |
| Desviación | La FAA lo escribe como obligación en el 121.565 (a): en un bimotor con un motor inoperativo, aterrizar en el aeropuerto utilizable más cercano en tiempo en el que pueda hacerse un aterrizaje seguro |
| Reevaluación de alternos | El alterno que servía con dos motores puede no servir con uno, por la pista, por la aproximación disponible o por el tiempo |

El escenario C del combustible crítico —falla de motor y descenso a la altitud de crucero con un motor inoperativo— es el que garantiza que, desde el punto más crítico, el combustible alcanza hasta el alterno. Si la falla ocurre en otro punto, el margen es mayor.

### En una operación de aerolínea

La secuencia real, que el capítulo 44 desarrolla como escenario: volar el avión, QRH, evaluar el estado del motor y del resto de sistemas, drift down, mirar el ETP de falla de motor y el combustible al alterno más cercano en tiempo, revisar la meteorología de los candidatos, hablar con ATC, hablar con el despacho, decidir, ejecutar.

### ¿Qué debe verificar?

- Estado del motor restante y de los sistemas que dependían del que falló.
- Altitud de crucero con un motor inoperativo alcanzable, contra el terreno de la ruta de desviación.
- Combustible requerido hasta el alterno más cercano en tiempo a esa altitud y con ese viento.
- Que ese alterno sigue siendo utilizable con un motor inoperativo: pista, aproximación, viento.

### ¿Qué ocurre si algo falla?

Una segunda falla durante la desviación es lo que la filosofía *preclude and protect* quiere evitar con la confiabilidad y el mantenimiento. Si ocurre, la prioridad sigue siendo la misma: el aeródromo utilizable más cercano en tiempo.

### En pocas palabras

- Falla de motor: QRH, drift down, velocidad con un motor inoperativo, más consumo, desviación.
- En un bimotor, la FAA obliga a aterrizar en el aeropuerto utilizable más cercano en tiempo (121.565).
- Los alternos se reevalúan con un motor menos: pista, aproximación, tiempo.
- El escenario C del combustible crítico existe para este caso.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Perfil vertical de izquierda a derecha. Avión en crucero alto, un punto marcado «ENGINE FAILURE». Desde ahí, un descenso suave y prolongado rotulado «DRIFT DOWN», que se estabiliza en un nivel intermedio rotulado «OEI CRUISE · velocidad aprobada con un motor inoperativo». Bajo el perfil, la silueta de un terreno con una cota rotulada «MEA / obstáculos de la ruta de desviación» que el nivel estabilizado debe superar. Al final, un aeródromo rotulado «EDTO ALTERNATE». Código: ED-15.

OBJETIVO:
Integrar performance y EDTO: la falla de motor no solo cuesta combustible, cuesta altitud, y la altitud tiene que caber sobre el terreno.

---

## 28. DRIFT DOWN Y EDTO

**ID:** E28 · **Tiempo:** 6 min

### Concepto

El drift down es el descenso gradual desde el crucero hasta la altitud que el avión puede mantener con un motor inoperativo. El módulo Performance enseñó cómo se calcula; aquí solo importa una pregunta: **¿puedo llegar al alterno seleccionado en las condiciones resultantes?**

### Lo que debe saber el piloto

Lo que cruza el drift down con EDTO:

| Elemento | Qué mirar |
|---|---|
| Techo con un motor inoperativo | La altitud que el avión mantiene con el peso que tiene en ese momento; es una cifra del AFM y del FMS, no de este módulo |
| Terreno | Que esa altitud supera la MEA o los obstáculos de la ruta de desviación con el margen que exige el operador; sobre el océano no suele ser problema, sobre la cordillera o la selva alta, sí |
| Ruta de desviación | La ruta real hasta el alterno, no la línea recta, si el terreno o el espacio aéreo la obligan a desviarse |
| Alternos | Un alterno alcanzable con dos motores puede no serlo con uno si la ruta de desviación pasa por terreno alto que el techo con un motor inoperativo no supera |
| Combustible | El consumo a la altitud de drift down, con el viento de esa altitud, hasta el alterno |
| Meteorología | A la altitud de drift down el engelamiento y la turbulencia pueden ser otros |

La pregunta se responde con el ETP de falla de motor y el combustible requerido desde la posición actual, pero con un filtro previo: **por dónde** se llega. En una desviación oceánica la respuesta suele ser directa; en una desviación sobre los Andes, la ruta de drift down y el terreno pueden hacer que el alterno más cercano en distancia no sea alcanzable, y que el alterno correcto sea otro.

### En una operación de aerolínea

El plan operacional de vuelo, cuando la ruta cruza terreno alto, incluye rutas de escape con un motor inoperativo con sus altitudes. En EDTO sobre el océano, el drift down aparece sobre todo como altitud de crucero del escenario de falla de motor, con su consumo y su viento.

### ¿Qué debe verificar?

- La altitud de crucero con un motor inoperativo para el peso actual.
- Que la ruta de desviación al alterno cabe sobre el terreno a esa altitud.
- El combustible hasta el alterno a esa altitud y con ese viento.

### En pocas palabras

- Drift down: bajar hasta la altitud que un motor sostiene.
- La pregunta EDTO: ¿llego al alterno por la ruta real, sobre el terreno real, con el combustible real?
- Sobre el océano, casi siempre sí; sobre terreno alto, hay que mirar por dónde.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Vista en planta y perfil combinadas. Arriba, mapa con la posición del avión, dos alternos —uno más cercano en distancia detrás de una cordillera, otro algo más lejano sobre terreno llano— y dos rutas de desviación. Abajo, el perfil de cada ruta: la primera muestra el nivel de drift down cortando una montaña, rotulada «NO ALCANZABLE CON UN MOTOR»; la segunda muestra el nivel de drift down cómodamente por encima del terreno, rotulada «ALCANZABLE». Una frase al pie: «El más cercano en distancia no siempre es alcanzable». Código: ED-16.

OBJETIVO:
Conectar el techo con un motor inoperativo con la elección del alterno: la altitud tiene que caber sobre el terreno de la ruta de desviación.

---

## 29. TIME-LIMITED SYSTEMS · LOS SISTEMAS CON LÍMITE DE TIEMPO

**ID:** E29 · **Tiempo:** 8 min

### Concepto

Un sistema con límite de tiempo es un sistema del avión cuya capacidad se agota tras un tiempo determinado. Si ese tiempo es menor que el que hace falta para llegar al alterno, la operación queda limitada por ese sistema, no por el combustible ni por la aprobación. El Anexo 6 lo llama «limitación de tiempo de un sistema significativo para EDTO»; la FAA y el RAC 121 lo escriben en forma de regla con cifras.

### Lo que debe saber el piloto

La regla, tal como la escriben el RAC 121 (121.2581 (b)(3)) y la FAA (14 CFR 121.633):

| Operación | Qué no se puede hacer |
|---|---|
| EDTO hasta 180 minutos inclusive | Listar un aeródromo como alterno EDTO si el tiempo para volar hasta él, a la velocidad aprobada con un motor inoperativo en ISA y aire en calma, excede el tiempo aprobado del sistema significativo más limitante —incluido el sistema de supresión de incendio de carga— **menos 15 minutos** |
| EDTO de más de 180 minutos | Listarlo si el tiempo para volar hasta él, con todos los motores y corregido por viento y temperatura, excede el tiempo del sistema de supresión de incendio de carga más limitante menos 15 minutos; o si, con un motor inoperativo y corregido por viento y temperatura (bimotores), excede el tiempo del sistema significativo más limitante distinto del de incendio, menos 15 minutos |

Tres cosas para retener:

- **Los 15 minutos** son un margen de la norma. No es una cifra del avión: es lo que la Aerocivil y la FAA restan al tiempo del sistema para no planificar al límite.
- **El tiempo del sistema es una cifra del avión.** Está en el AFM, en el documento de configuración del fabricante o en otro documento aprobado; cambia de tipo a tipo y de configuración a configuración. Este módulo no da un número porque no hay un número universal.
- **La comparación se hace en los puntos de igual tiempo**, según el AC 120-42B, numeral 303: donde el alterno más cercano está más lejos es donde el sistema tiene que aguantar más.

El Anexo 6, en el 4.7.2.3 a), lo pide de forma más general: el operador debe tener procedimientos que impidan despachar el avión en una ruta con tiempos de desviación que superen la capacidad de los sistemas significativos con límite de tiempo indicada en el AFM. Y el 4.7.2.3.1 —recogido por el RAC 121 en el 121.2581 (b)(4)— permite al Estado, sobre la base de una evaluación de riesgos específica del operador, aprobar vuelos que superen esos límites. El piloto no gestiona esa excepción; debe saber que existe y que, si su operador la tiene, está escrita.

Para aviones de más de dos motores, el Doc 10085 lo dice en su prólogo: la consideración de los sistemas con límite de tiempo es precisamente una de las pocas exigencias que EDTO les añade.

### En una operación de aerolínea

El despacho compara, para cada alterno EDTO, el tiempo de desviación con el tiempo del sistema más limitante menos 15 minutos. Si no cabe, ese aeródromo no puede ser alterno EDTO por muy bien que esté su meteorología. La tripulación no repite el cálculo; sí debe saber qué sistema limita a su flota y cuánto, para entender por qué su tiempo máximo real es el que es.

### ¿Qué debe verificar?

- Qué sistema con límite de tiempo es el más limitante en tu avión y cuánto tiempo tiene; es una cifra del AFM o del documento del fabricante.
- Que ningún alterno EDTO del plan queda más allá de ese tiempo menos 15 minutos.
- Si tu operador tiene alguna excepción aprobada bajo evaluación de riesgos, y en qué condiciones.

### ¿Qué ocurre si algo falla?

Si un sistema con límite de tiempo entra en uso —un incendio en bodega que activa la supresión, por ejemplo—, el reloj de ese sistema empieza a contar y el tiempo hasta el alterno más cercano deja de ser una cifra de planificación para convertirse en la cifra que manda. El capítulo 47 lo desarrolla.

### En pocas palabras

- Un sistema con límite de tiempo puede limitar la desviación antes que el combustible o la aprobación.
- Regla RAC 121 y FAA: tiempo al alterno no mayor que el tiempo del sistema más limitante menos 15 minutos; con viento y temperatura por encima de 180 minutos.
- El tiempo del sistema es del avión; los 15 minutos son de la norma.
- Se comprueba en los puntos de igual tiempo.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Dos barras horizontales alineadas a la izquierda, con escala de tiempo en minutos. La superior, «MAX DIVERSION TIME · aprobado al operador», más larga. La inferior, «SYSTEM ENDURANCE · tiempo del sistema más limitante, del AFM», más corta, con un tramo final sombreado y rotulado «− 15 MIN · margen de la norma». Una línea vertical que baja desde el final de la barra inferior menos el margen, rotulada «HASTA AQUÍ PUEDE ESTAR EL ALTERNO EDTO», cortando la barra superior antes de su fin. Al pie: «Manda la barra más corta». Código: ED-17.

OBJETIVO:
Visualizar el concepto de sistema con límite de tiempo: el valor limitante determina la condición operacional aplicable, aunque la aprobación sea mayor.

---

## 30. CARGO FIRE SUPPRESSION Y EDTO

**ID:** E30 · **Tiempo:** 5 min

### Concepto

El sistema de supresión de incendio en bodega es el ejemplo típico de sistema con límite de tiempo, y por eso la norma lo nombra expresamente: el RAC 121 y la FAA lo incluyen en la regla del capítulo anterior «incluyendo el tiempo del sistema de supresión de incendios de carga o equipaje más limitante». Nada de diseño, presión ni instalación: lo que importa es **tiempo disponible frente a tiempo de desviación**.

### Lo que debe saber el piloto

Un sistema de supresión de incendio en bodega no apaga el fuego para siempre: lo suprime durante un tiempo, y ese tiempo está certificado y escrito en la documentación del avión. Si se activa dentro del segmento EDTO, la pregunta es una sola: ¿el alterno más cercano en tiempo está a menos del tiempo de supresión que queda?

La planificación ya respondió que sí, con margen de 15 minutos, para todos los alternos listados. Lo que la tripulación hace en el momento es confirmar que la respuesta sigue siendo sí con las condiciones reales —viento, altitud, velocidad— y actuar sin demora.

Por qué es el caso más exigente: en un incendio, el tiempo hasta aterrizar es el factor dominante; no hay margen para elegir el aeropuerto más cómodo. El capítulo 47 lo trata como escenario completo.

### En una operación de aerolínea

En el despacho, el tiempo del sistema de supresión de incendio de carga es, con frecuencia, el sistema con límite de tiempo más restrictivo de la flota, y por eso el que acaba definiendo qué alternos caben. En cabina, lo que hay que saber es cuánto tiempo tiene el sistema de tu avión y que ese tiempo está en el AFM o en el FCOM, no en este módulo.

### ¿Qué debe verificar?

- El tiempo de supresión de incendio de carga de tu avión, según su documentación.
- Que todos los alternos EDTO del plan están dentro de ese tiempo menos 15 minutos.

### En pocas palabras

- La supresión de incendio de carga es tiempo disponible frente a tiempo de desviación.
- Es el ejemplo típico de sistema con límite de tiempo y la norma lo nombra expresamente.
- Si se activa, el tiempo hasta aterrizar manda sobre todo lo demás.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Una línea de tiempo horizontal que empieza en «FIRE WARNING · se activa la supresión». Sobre ella, una barra rotulada «TIEMPO DE SUPRESIÓN DISPONIBLE · del AFM» que termina en un punto marcado. Debajo, otra barra rotulada «TIEMPO HASTA EL ALTERNO MÁS CERCANO · con el viento de hoy» que termina antes que la primera, con un espacio entre ambos finales rotulado «MARGEN». Al pie: «La planificación garantizó este margen con 15 minutos; en vuelo, se confirma con las condiciones reales». Código: ED-18.

OBJETIVO:
Que el piloto vea el incendio de bodega como una carrera entre dos tiempos y entienda qué garantizó la planificación.

---

## 31. OXYGEN Y EDTO

**ID:** E31 · **Tiempo:** 5 min

### Concepto

El oxígeno entra en EDTO por la despresurización: la cantidad de oxígeno de pasajeros a bordo determina a qué altitud puede quedarse el avión después de un descenso de emergencia y durante cuánto tiempo, y esa altitud determina el consumo y el tiempo de la desviación.

### Lo que debe saber el piloto

Este no es un capítulo de sistemas de oxígeno. Lo que hay que relacionar:

- **Despresurización → altitud.** El RAC 121 exige que el descenso del escenario de combustible crítico sea a una altitud segura «en cumplimiento con los requisitos de oxígeno de las secciones 121.925 y 121.930». Cuánto oxígeno hay y cuánto dura es una cifra del avión y de la configuración del operador.
- **Altitud → perfil de desviación.** Un avión con oxígeno para poco tiempo tiene que bajar a una altitud donde no lo necesite, y esa es una altitud de consumo alto. Un avión con más oxígeno puede mantenerse algo más alto durante más tiempo y gastar menos.
- **Perfil → combustible y tiempo.** El escenario A y el B del combustible crítico se calculan con el perfil que el oxígeno del avión permite.
- **Límite de tiempo.** En ese sentido, el oxígeno de pasajeros puede funcionar como un sistema con límite de tiempo: si la desviación a altitud alta requiriera más oxígeno del que hay, el perfil tiene que bajar antes.

### En una operación de aerolínea

El despacho usa el perfil de despresurización aprobado para la flota, que ya tiene en cuenta el oxígeno instalado. La tripulación debe conocer ese perfil —a qué altitud y por cuánto tiempo— porque es el que tendrá que volar si ocurre, y porque es el que explica por qué el escenario de despresurización pide el combustible que pide.

### En pocas palabras

- El oxígeno fija la altitud tras una despresurización; la altitud fija el consumo.
- Cuánto oxígeno hay y cuánto dura es una cifra del avión y del operador.
- El perfil de despresurización aprobado es el que la tripulación tiene que conocer y volar.

---

# BLOQUE 7 · MEL Y SISTEMAS

---

## 32. MEL Y EDTO

**ID:** E32 · **Tiempo:** 9 min

### Concepto

Un avión puede ser despachable con un ítem diferido y, a la vez, **no** ser capaz de EDTO, o serlo con restricciones. La MEL lo dice en la propia entrada. Es uno de los capítulos más importantes del módulo y el que más conecta con el módulo MEL.

### Lo que debe saber el piloto

Tres estados posibles, y hay que leer cuál aplica:

| Estado | Qué significa |
|---|---|
| **Dispatchable** | El avión puede salir con el ítem diferido, cumpliendo lo que la entrada MEL exige |
| **Not EDTO capable** | Puede salir, pero no puede hacer EDTO: la ruta tiene que quedarse dentro del umbral en todo momento |
| **EDTO restricted** | Puede hacer EDTO, pero con un tiempo máximo de desviación menor del aprobado, o con condiciones adicionales |

Los sistemas cuya falla suele tener consecuencia EDTO en la MEL, como ejemplos conceptuales y no como lista cerrada: APU, generación eléctrica, sistema de combustible, detección de incendio, supresión de incendio, comunicaciones, navegación, sistemas relacionados con los motores, redundancia hidráulica. Son los que aparecen en la definición de sistema significativo para EDTO del capítulo 35: los que dan redundancia cuando falta un motor o los que hacen falta para una desviación larga.

La regla que no admite excepción: **no se afirma que una falla elimina EDTO, ni que no lo elimina, sin consultar la MEL específica del avión.** La misma falla en dos tipos distintos, o en el mismo tipo con dos MEL de operadores distintos, puede tener consecuencias EDTO distintas. El AC 120-42B lo recoge en la nota 3 de su tabla de mínimos: al despachar bajo la MEL, las limitaciones que afecten mínimos de aproximación se consideran al determinar los mínimos del alterno.

Y una consecuencia que a veces se olvida: un ítem que quita EDTO no solo cambia el estado del avión; puede cambiar **la ruta**, el combustible, la carga o el vuelo entero. Perder EDTO en tierra es un problema de despacho, no solo de mantenimiento.

### En una operación de aerolínea

Con un ítem diferido, el comandante abre la MEL, busca la entrada y lee la columna de observaciones y excepciones, que es donde vive la restricción EDTO. Si la entrada dice que el avión no es capaz de EDTO, el despacho tiene que rehacer el vuelo: otra ruta dentro del umbral, otro avión o cancelación. Si dice que queda restringido a un tiempo menor, los alternos EDTO se reevalúan contra ese tiempo.

### ¿Qué debe verificar?

- Cada ítem MEL abierto: qué dice su entrada sobre EDTO, en la columna de observaciones.
- Si el estado resultante es despachable, no capaz de EDTO o EDTO restringido.
- Los procedimientos (O) que la tripulación tiene que cumplir por ese ítem.
- Con dos o más ítems abiertos, la interacción entre ellos (capítulo 57).

### ¿Qué puede cambiar la decisión?

- Un ítem MEL nuevo entre el despacho y el despegue.
- Un ítem que no quita EDTO pero sí sube los mínimos de aproximación en un alterno justo.
- Una restricción de tiempo máximo que saca a un alterno EDTO del alcance.

### ¿Qué ocurre si algo falla?

Si el ítem se abre en vuelo antes del punto de entrada, la capacidad EDTO se reevalúa con la MEL antes de entrar; el RAC 121 (121.2625 (g)) pide expresamente que, antes del punto de entrada, el comandante o el despachador actualicen el plan si una reevaluación de las capacidades de los sistemas lo requiere. Si se abre dentro del segmento, se aplica el QRH y se gestiona como una falla en vuelo: la MEL es un documento de despacho.

### En pocas palabras

- Despachable, no capaz de EDTO o EDTO restringido: la MEL lo dice en la entrada.
- APU, eléctrico, combustible, detección y supresión de incendio, comunicaciones, navegación, motores, hidráulico: los sistemas que suelen tener consecuencia EDTO.
- Nunca se asume: se consulta la MEL específica del avión.
- Perder EDTO puede cambiar la ruta, el combustible, la carga o el vuelo.

[ESPACIO PARA IMAGEN ANOTADA]

IMAGEN BASE:
Entrada ficticia de una lista de equipo mínimo, con el formato habitual en columnas: número de ítem y sistema, número instalado, número requerido para el despacho, y una columna ancha de observaciones y excepciones. El ítem se refiere a un sistema relacionado con la generación eléctrica auxiliar. En la columna de observaciones, tres líneas: la condición de despacho, una frase que restrinja la operación EDTO a un tiempo menor, y la marca de un procedimiento operacional. Código: ED-19.

ANOTACIONES:
→ FLECHA 1: a la columna de sistema. EXPLICACIÓN: qué sistema es y a qué grupo de sistemas significativos podría pertenecer; aquí es donde el piloto reconoce que puede haber consecuencia EDTO.
→ FLECHA 2: a la columna de número requerido. EXPLICACIÓN: responde «¿sale el avión?». No responde «¿es capaz de EDTO?».
→ FLECHA 3: a la línea de observaciones con la restricción EDTO. EXPLICACIÓN: aquí vive la respuesta. «Not EDTO capable» o «EDTO limited to … minutes» se leen aquí, con todas las letras, y cambian la ruta.
→ FLECHA 4: a la marca (O) al lado del ítem. EXPLICACIÓN: procedimiento operacional que la tripulación tiene que cumplir. Si además hay (M), es de mantenimiento.

OBJETIVO PEDAGÓGICO:
Mostrar que la MEL puede cambiar completamente la autorización de la ruta, y que la respuesta está en una columna concreta de la entrada, no en la intuición.

---

## 33. APU Y EDTO

**ID:** E33 · **Tiempo:** 6 min

### Concepto

La unidad de potencia auxiliar es el caso operacional más frecuente para entender cómo la MEL interactúa con EDTO: en muchos aviones y muchas operaciones, la APU aporta una fuente eléctrica y neumática de reserva que cuenta en la redundancia de una desviación larga; en otras, no. La respuesta no es universal.

### Lo que debe saber el piloto

Las preguntas que hay que hacerse con una APU inoperativa antes de un vuelo EDTO:

- ¿Es la APU **requerida** para esta operación EDTO según la MEL de este avión y las especificaciones de este operador?
- ¿Puede **diferirse** y, si se difiere, con qué condiciones?
- ¿Impone la MEL una **restricción EDTO**: no capaz, o tiempo máximo reducido?
- ¿Debe estar disponible para **arranque en vuelo** como fuente de reserva en el escenario de falla de motor o de generador?
- ¿Hay una **restricción de tiempo** ligada a ella?
- ¿Afecta la **redundancia** eléctrica o neumática que el escenario de desviación asume?
- ¿Cambia la **ruta**, porque el tiempo máximo reducido saca un alterno del alcance?

Ninguna de esas preguntas tiene respuesta en este módulo. La tienen, para cada avión y cada operador, la MEL, la configuración del avión, la aprobación EDTO y el manual de operaciones. Lo que sí es de este módulo: **la respuesta correcta en entrevista a «¿podemos hacer EDTO con la APU diferida?» es «no lo asumo; lo verifico»**, y saber enumerar qué se verifica (capítulo 68).

Una razón por la que la APU aparece tanto: el combustible crítico, según el RAC 121 (121.2581 (b)(5) vi) y la FAA (121.646 (b)), incluye el consumo de la APU «durante aquellas fases del vuelo en las cuales se considera una fuente de energía». Si el plan cuenta con la APU como fuente en la desviación y la APU no está, el plan ya no describe el avión que va a volar.

### En una operación de aerolínea

Con la APU diferida, el comandante lee la entrada MEL de la APU, busca la restricción EDTO y, si existe, avisa al despacho antes de aceptar el vuelo. El despacho rehace el plan con la restricción o decide otra cosa. Nadie sale a ver qué pasa.

### ¿Qué debe verificar?

- La entrada MEL de la APU, en particular las observaciones sobre EDTO.
- Si el escenario de desviación del plan cuenta con la APU como fuente de energía.
- Si la restricción cambia el tiempo máximo y con él los alternos.

### En pocas palabras

- La APU es el caso típico de «depende»: avión, MEL, aprobación EDTO y operador.
- Siete preguntas: requerida, diferible, restricción, arranque en vuelo, tiempo, redundancia, ruta.
- Si el plan cuenta con ella y no está, el plan ya no vale.
- En entrevista: «no lo asumo; lo verifico», y sé qué verifico.

---

## 34. PRE-DEPARTURE SERVICE CHECK

**ID:** E34 · **Tiempo:** 4 min

### Concepto

Antes de un vuelo EDTO, determinadas operaciones exigen una verificación específica del avión hecha por personal técnico cualificado. El piloto no la ejecuta; debe saber que existe, qué garantiza y cómo se le comunica que está hecha.

### Lo que debe saber el piloto

La FAA lo regula en el 14 CFR 121.374: el operador «debe completar una verificación de servicio previa a la salida inmediatamente antes de cada vuelo ETOPS». Como mínimo verifica la condición de todos los sistemas significativos ETOPS, el estado general del avión mediante la revisión de los registros de mantenimiento aplicables, y una inspección interior y exterior que incluye niveles y consumos de aceite de motores y APU. La hace una persona de mantenimiento con cualificación ETOPS, y antes de la salida un firmante autorizado certifica con su firma que se ha completado.

Lo que el piloto retiene:

- Que hay operaciones EDTO en las que el avión sale con una verificación específica, controlada y firmada.
- Que la firma es la señal de que el avión está en condición EDTO en ese momento; después de la firma, lo que pase es de la tripulación.
- Que no es tarea del piloto ni sustituye su inspección prevuelo.

El Anexo 6 no describe esta verificación en el 4.7; la remite a la certificación y al programa de mantenimiento EDTO que el Estado exige a los bimotores (4.7.2.6). El Doc 10085, en su prólogo, dice que para EDTO con más de dos motores no hay requisitos de mantenimiento adicionales; es una diferencia entre bimotores y el resto que conviene conocer.

### En una operación de aerolínea

El comandante ve, en el libro técnico o en el documento de salida que use su operador, la certificación de que la verificación previa a la salida está hecha. Si no está y la operación la exige, el avión no sale a EDTO.

### En pocas palabras

- Antes de un vuelo EDTO puede exigirse una verificación técnica específica, firmada.
- FAA 121.374: sistemas significativos, registros, inspección con aceites de motores y APU.
- La ejecuta mantenimiento cualificado; el piloto comprueba que está certificada.
- Para bimotores hay programa de mantenimiento EDTO; para más de dos motores, el Doc 10085 no añade requisitos de mantenimiento.

---

## 35. ETOPS SIGNIFICANT SYSTEMS · LOS SISTEMAS SIGNIFICATIVOS

**ID:** E35 · **Tiempo:** 5 min

### Concepto

El Anexo 6 define el sistema significativo para EDTO como «un sistema del avión cuya falla o degradación podría afectar negativamente la seguridad operacional particular de un vuelo EDTO, o cuyo funcionamiento continuo es específicamente importante para el vuelo y aterrizaje seguros durante una desviación EDTO». El RAC 121 lo define con las mismas palabras.

### Lo que debe saber el piloto

Solo lo necesario, y no más. La FAA, en el 121.7 y en el apéndice 1 del AC 120-42B, separa los sistemas significativos en dos grupos:

| Grupo | Qué lo caracteriza | Qué significa para la tripulación |
|---|---|---|
| Grupo 1 | Sistemas con características de seguridad ligadas al número de motores; cuya falla puede producir una parada de motor en vuelo, pérdida de control de empuje o de potencia; que dan redundancia a una fuente de energía perdida por un motor inoperativo; o que son esenciales para operar de forma prolongada a altitudes con un motor inoperativo | Su falla afecta a la performance o al ambiente de cabina: es lo que hace que una desviación sea segura o no |
| Grupo 2 | Los demás sistemas significativos | Su falla no compromete la performance ni el ambiente de cabina, pero puede obligar a desviarse o a regresar |

Lo que el piloto no necesita: la clasificación de ingeniería sistema por sistema. Lo que sí: que cuando la MEL restringe EDTO, o cuando la verificación previa a la salida se centra en ciertos sistemas, o cuando el escenario de desviación cuenta con una redundancia concreta, lo hace porque esos sistemas son **significativos para EDTO**. Es el criterio que da sentido a los capítulos 32, 33 y 34.

### En una operación de aerolínea

En cabina, la palabra aparece en la MEL, en el libro técnico y en los procedimientos de contingencia del operador. Si una falla en vuelo afecta a un sistema significativo, la reevaluación de la capacidad EDTO es obligada, y el capítulo 39 explica qué se hace con ella según dónde esté el avión.

### En pocas palabras

- Sistema significativo: su falla afecta a la seguridad de un vuelo EDTO o a una desviación.
- FAA: grupo 1, ligado a performance y ambiente de cabina; grupo 2, el resto, que puede forzar desviación.
- Es el criterio detrás de las restricciones de la MEL y de la verificación previa a la salida.
- Falla en vuelo de un sistema significativo: reevaluar la capacidad EDTO.

---
# BLOQUE 8 · COMUNICACIONES, NAVEGACIÓN Y METEOROLOGÍA EN RUTA

---

## 36. COMUNICACIONES EN EDTO

**ID:** E36 · **Tiempo:** 6 min

### Concepto

En una desviación lejos de tierra, la tripulación necesita hablar con el ATC y con su operador. La pregunta que hay que poder responder antes de entrar al segmento es: **¿qué medios tengo disponibles si necesito desviarme, por la ruta y a la altitud a la que me desviaría?**

### Lo que debe saber el piloto

Lo que exige la norma colombiana, que en esto es más explícita que el Anexo 6:

- **RAC 121, 121.2581 (b)(7)**: salvo operaciones no regulares de carga exclusiva con aviones de más de dos motores, el explotador «debe proporcionar comunicaciones de voz para EDTO donde las instalaciones de comunicación de voz estén disponibles». Y una frase que es la clave de este capítulo: al determinar si están disponibles, «el explotador debe considerar las posibles rutas y altitudes necesarias para el desvío a los aeródromos alternos para EDTO». Donde no haya voz o sea de mala calidad, se sustituye por otro sistema.
- **RAC 121, 121.2581 (b)(8)**: para EDTO de más de 180 minutos, con la misma excepción, «un segundo sistema de comunicación», capaz de «proporcionar comunicaciones de voz satelitales inmediatas con fidelidad de teléfono fijo», entre la tripulación y los servicios de tránsito aéreo y entre la tripulación y el explotador. Mismo criterio: rutas y altitudes de desvío.

La FAA, en el AC 120-42B, explica por qué el satélite: «salvo el área al norte de 82 grados de latitud, las comunicaciones por satélite proporcionan el mejor medio porque no están limitadas por la distancia»; por encima de esa latitud hay que usar HF de voz o enlace de datos.

Los cuatro medios y para qué sirve cada uno en una desviación, que el módulo Comunicaciones desarrolla:

| Medio | Qué da en una desviación EDTO | Su límite |
|---|---|---|
| VHF | Voz directa con ATC cuando hay cobertura | Alcance a la vista: en medio del océano, nada |
| HF | Voz de largo alcance con las estaciones oceánicas | Calidad variable, propagación, congestión |
| SATCOM | Voz y datos sin límite de distancia con ATC y con el operador | Cobertura reducida en latitudes muy altas; depende del equipo instalado |
| CPDLC | Mensajes de texto con el ATC, autorizaciones y reportes | No sustituye la voz en una emergencia; depende del espacio aéreo y del equipo |

Lo que importa no es la lista, sino la pregunta: a la altitud de drift down o de despresurización, con la ruta de desviación real, ¿qué medio funciona? Un VHF que cubre la ruta a FL370 puede no cubrir nada a FL100 cien millas más al sur.

### En una operación de aerolínea

Antes del punto de entrada, la tripulación confirma que los medios que el plan asume están operativos: SATCOM en servicio, HF probado, CPDLC conectado donde corresponda. Un equipo de comunicaciones inoperativo puede ser un ítem MEL con consecuencia EDTO (capítulo 32).

### ¿Qué debe verificar?

- Qué medios exige tu operación EDTO según el tiempo máximo: voz donde esté disponible; más de 180 minutos, segundo sistema satelital.
- Que están operativos antes de la entrada.
- Qué medio funcionaría en la ruta y altitud de desviación, no solo en crucero.

### En pocas palabras

- RAC 121: voz donde esté disponible, y para más de 180 minutos un segundo sistema satelital con fidelidad de teléfono fijo.
- Se evalúa para las rutas y altitudes de desvío, no para el crucero.
- SATCOM es el mejor medio salvo en latitudes muy altas, según la FAA.
- La pregunta: ¿con qué hablo si tengo que bajar y desviarme?

---

## 37. NAVEGACIÓN Y EDTO

**ID:** E37 · **Tiempo:** 5 min

### Concepto

La capacidad de navegación condiciona qué ruta puede volar el avión, en qué espacio aéreo y con qué aproximaciones puede contar en los alternos. Una degradación de esa capacidad en un segmento EDTO puede cambiar la ruta de desviación y hasta qué alternos son utilizables.

### Lo que debe saber el piloto

Solo lo que cruza con EDTO; el módulo PBN enseña el resto:

- **Capacidad de navegación requerida.** La ruta oceánica o remota tiene una especificación de navegación; el plan asume que el avión la cumple. Si un sistema falla y ya no la cumple, puede haber que cambiar de ruta o de nivel, con efecto en combustible y en los ETP.
- **PBN en los alternos.** Un alterno cuya única aproximación es RNP no es utilizable para un avión que ha perdido esa capacidad. La fila de la tabla de mínimos puede cambiar, o el alterno puede desaparecer.
- **Procedimientos oceánicos.** Donde apliquen, la navegación de largo alcance y sus verificaciones son parte de la operación; una desviación fuera de la ruta organizada se coordina con el ATC.
- **GNSS.** Una pérdida o degradación de GNSS afecta a la vez a la navegación en ruta y a las aproximaciones que dependen de él.
- **Restricciones MEL.** Un ítem de navegación diferido puede tener consecuencia EDTO por sí mismo, o por el efecto en las aproximaciones de los alternos.

### En una operación de aerolínea

Antes de la entrada, la tripulación confirma que la capacidad de navegación que el plan asume está intacta, y que las aproximaciones que cuentan en los alternos son volables con lo que el avión tiene ese día.

### En pocas palabras

- La navegación decide ruta, espacio aéreo y aproximaciones en los alternos.
- Una degradación PBN puede quitar un alterno o cambiar la ruta de desviación.
- GNSS afecta a la vez a la ruta y a las aproximaciones.
- Se conecta con la MEL: un ítem de navegación puede tener consecuencia EDTO.

---

## 38. EDTO Y METEOROLOGÍA EN RUTA

**ID:** E38 · **Tiempo:** 6 min

### Concepto

La meteorología en ruta importa en EDTO por lo que puede cambiar: **la ruta, el alterno, el tiempo y el combustible**. Este capítulo no enseña meteorología; enseña dónde se cruza con las decisiones EDTO.

### Lo que debe saber el piloto

| Fenómeno | Qué le hace a la operación EDTO |
|---|---|
| Convección | Desvíos laterales que alargan la ruta y consumen el margen; a la altitud de una desviación, una línea de tormentas puede estar entre el avión y el alterno |
| Engelamiento | El combustible crítico ya lo incluye por norma (capítulo 22); en vuelo, a la altitud de drift down o de despresurización, el engelamiento puede ser peor que en crucero |
| Corriente en chorro | Mueve los ETP: el viento del día contra el del plan es una de las comparaciones fijas dentro del segmento |
| Turbulencia | Cambios de nivel que cambian consumo y viento; en una desviación, puede limitar velocidad |
| Ceniza volcánica | Puede cerrar una ruta o un alterno entero, y obliga a replanificar antes de la entrada o a desviarse dentro del segmento |
| Sistemas tropicales | Pueden dejar un alterno por debajo de mínimos durante toda la ventana de uso, o cerrar una zona del área de operación |

El hilo común: cualquiera de estos fenómenos puede convertir un plan válido al despegar en un plan que ya no cubre el escenario crítico. Por eso la meteorología en ruta se mira con la misma pregunta de siempre: ¿sigue siendo alcanzable el alterno, por la ruta real, con el combustible real?

### En una operación de aerolínea

El despacho sigue el vuelo y avisa de cambios significativos; la tripulación mira el radar, los reportes y los mensajes de la compañía con la vista puesta en los alternos y en los ETP, no solo en el destino.

### En pocas palabras

- Convección, engelamiento, corriente en chorro, turbulencia, ceniza y sistemas tropicales: seis cosas que cambian ruta, alterno, tiempo y combustible.
- El plan era válido al despegar; la meteorología en ruta decide si lo sigue siendo.
- La pregunta no cambia: ¿el alterno sigue siendo alcanzable con lo que hay?

---

# BLOQUE 9 · DECIDIR

---

## 39. UN ALTERNO DEJA DE SERVIR ANTES DE LA ENTRADA

**ID:** E39 · **Tiempo:** 8 min

### Concepto

El avión todavía no ha entrado al segmento EDTO y llega la información de que uno de los alternos ya no cumple: la pista se cierra, el pronóstico cae por debajo de mínimos, el RFFS se reduce. La pregunta es una sola: **¿se puede continuar?** Y la respuesta no es universal: hay que evaluar.

### Lo que debe saber el piloto

Lo que dice la norma, en los tres marcos:

- **OACI, Anexo 6, 4.7.2.5**: el vuelo no proseguirá más allá del umbral salvo que los alternos identificados hayan sido reevaluados y la información más reciente indique que, durante la hora prevista de utilización, las condiciones estarán a o por encima de los mínimos de utilización. «Si se identifican condiciones que impedirían una aproximación y aterrizaje seguros en ese aeródromo durante la hora prevista de utilización, se determinará un curso de acción alternativo».
- **FAA, 14 CFR 121.631 (c)**: nadie puede permitir que el vuelo continúe más allá del punto de entrada ETOPS salvo que el pronóstico de cada alterno esté a o por encima de los mínimos de utilización en la ventana de uso, y que todos los alternos dentro del tiempo máximo hayan sido revisados y la tripulación informada de los cambios desde el despacho.
- **Aerocivil, RAC 121, 121.2625 (e), (f) y (g)**: lo mismo que la FAA, y además: si un alterno no cumple, el despacho «puede ser enmendado para adicionar un aeródromo alterno EDTO que se encuentre dentro del tiempo máximo de desviación», siempre que su meteorología esté a o sobre mínimos; y antes del punto de entrada, el comandante o el despachador «debe utilizar los medios de comunicación de la compañía para actualizar el plan de vuelo si es necesario».

Lo que la tripulación evalúa, con el despacho:

| Pregunta | Qué se mira |
|---|---|
| ¿Qué alternos quedan? | Los demás alternos EDTO del plan, y cualquier otro aeródromo adecuado dentro del tiempo máximo que pueda añadirse |
| ¿Sigue cubierto el segmento? | Con el alterno caído fuera, ¿queda algún tramo del segmento a más del tiempo máximo de cualquier alterno? Es el mapa del capítulo 6 con un círculo menos |
| ¿Meteorología? | La de los alternos que quedan, en su ventana de uso |
| ¿Combustible? | Si el alterno que sustituye está más lejos, el escenario crítico exige más; hay que comprobar que el combustible a bordo lo cubre |
| ¿Aprobación? | Que el nuevo alterno cabe en el tiempo máximo aprobado y en los sistemas con límite de tiempo menos 15 minutos |
| ¿Coordinación? | Con el despacho, por los medios de la compañía, y con tiempo: la reevaluación se hace antes de la entrada, no en ella |
| ¿Ruta? | Si no hay sustituto, la ruta se modifica para quedarse dentro del umbral, o se desvía |

Las salidas posibles, sin orden de preferencia porque depende del caso: continuar con un alterno sustituto que cumple; modificar la ruta para no entrar en el segmento sin cobertura; retrasar la entrada si el problema es temporal y hay combustible para esperar a que se resuelva; o desviarse a un aeródromo adecuado antes de la entrada.

### En una operación de aerolínea

El despacho es el que suele ver primero el cambio, porque sigue los NOTAM y los TAF de los alternos. Llama a la tripulación, propone el sustituto o el cambio de ruta, y el comandante decide con el plan enmendado delante. Si la comunicación llega tarde y el avión está a diez minutos de la entrada, la decisión conservadora es no entrar hasta tener el plan resuelto.

### ¿Qué debe verificar?

- Qué alterno cayó y qué tramo del segmento sostenía.
- Qué queda y si cubre el segmento entero.
- Combustible a bordo contra el escenario crítico con el alterno sustituto.
- Que la enmienda del despacho está hecha y registrada antes de la entrada.

### En pocas palabras

- Antes de la entrada, la norma exige reevaluar: OACI, FAA y Aerocivil coinciden.
- Se evalúa: alternos restantes, cobertura, meteorología, combustible, aprobación, coordinación, ruta.
- Se puede añadir un alterno sustituto, cambiar la ruta, retrasar la entrada o desviarse.
- No hay respuesta universal; hay una evaluación que se hace antes, no en el punto de entrada.

---

## 40. UN ALTERNO SE DETERIORA DESPUÉS DE LA ENTRADA

**ID:** E40 · **Tiempo:** 8 min

### Concepto

El avión ya está dentro del segmento EDTO y un alterno reporta un deterioro significativo. Aquí no hay una regla de despacho que aplicar: hay una evaluación operacional, con la regulación y los procedimientos del operador en la mano.

### Lo que debe saber el piloto

Primero, lo que **no** hay que hacer: aplicar la regla simplista de «si un alterno baja de mínimos hay que desviarse inmediatamente». No la escribe ninguna de las tres autoridades. Los mínimos de planificación son requisitos para despachar y para entrar; dentro del segmento, lo que importa es si, en caso de necesitar el alterno, se podría aterrizar en él, y si no, qué otro hay.

Lo que se evalúa:

| Elemento | Pregunta |
|---|---|
| Posición actual | ¿Dónde estoy respecto de los ETP? ¿Cuál es el alterno más cercano en tiempo ahora, y es el que se deterioró u otro? |
| Otros alternos | ¿Hay otro alterno EDTO utilizable desde aquí, dentro del tiempo máximo y del sistema con límite de tiempo? |
| Combustible | ¿Cubre el escenario crítico hasta el otro alterno, que puede estar más lejos? |
| Meteorología | ¿Cuánto se deterioró, hasta cuándo, y sigue por encima de los mínimos de utilización en la ventana en que yo llegaría? Un deterioro por debajo de mínimos de planificación pero por encima de los de utilización es una situación distinta a un cierre |
| Estado del avión | ¿Todo funciona? Con un avión sano, la probabilidad de necesitar ese alterno en la próxima hora es la misma que era; con un sistema significativo degradado, cambia el cálculo |
| Tiempo a los alternos | ¿Cuánto falta para que el alterno deteriorado deje de ser mi más cercano y pase a serlo el siguiente? A veces la salida del tramo que ese alterno cubría está a veinte minutos |
| Continuar o desviarse | Con todo lo anterior: ¿sigo con la cobertura que me queda, o me desvío ahora mientras el alterno deteriorado todavía es utilizable, o mientras el otro lo es? |
| Procedimientos del operador | Lo que el manual de operaciones diga para este caso, que puede ser más restrictivo que la norma |

La lógica que hay detrás: EDTO protege la desviación *si ocurre*. Un alterno que empeora reduce las opciones para el caso de que ocurra; no crea la emergencia. La decisión razonable pesa cuánta protección queda, cuánto tiempo falta para recuperarla y qué dice el manual. Y la coordinación con el despacho no es opcional: son quienes ven el pronóstico completo y pueden proponer alternos que la tripulación no tiene en su lista.

### En una operación de aerolínea

El despacho avisa del deterioro con el TAF actualizado. La tripulación mira dónde está, cuál es su ETP siguiente, qué otro alterno tiene y cuánto combustible. Con un avión sano, dos alternos más y veinte minutos hasta salir del tramo afectado, lo habitual es continuar vigilando. Con un solo alterno restante, un sistema degradado y dos horas de segmento por delante, la conversación es otra.

### ¿Qué debe verificar?

- Posición respecto de los ETP y alterno más cercano en tiempo ahora.
- Otros alternos utilizables, con su tiempo y su combustible.
- Cuánto y hasta cuándo se deterioró el alterno afectado.
- El estado del avión.
- Lo que dice el manual de operaciones para este caso.

### En pocas palabras

- Dentro del segmento no hay regla automática de desviación por un alterno bajo mínimos.
- Se evalúa: posición, otros alternos, combustible, meteorología, avión, tiempo, continuar o desviarse, procedimientos.
- EDTO protege la desviación si ocurre; un alterno peor reduce opciones, no crea la emergencia.
- Con el despacho, y con el manual en la mano.

---

## 41. DIVERSION DECISION · LA DECISIÓN DE DESVIARSE

**ID:** E41 · **Tiempo:** 9 min

### Concepto

Este es el corazón operacional del módulo. Una desviación no es «girar hacia el aeropuerto más cercano»: es elegir, con una falla concreta y unas condiciones concretas, el aeródromo utilizable en el que un aterrizaje seguro es más probable, y llegar a él con el avión que se tiene.

### Lo que debe saber el piloto

Los factores. El AC 120-42B, al desarrollar el 14 CFR 121.565, da una lista que dice ser «de algunos, pero no todos» los factores relevantes para decidir si un aeropuerto es utilizable, «coherentes con el principio ETOPS de proteger la desviación una vez que ocurre»:

| Factor | Qué se pregunta |
|---|---|
| Naturaleza de la falla | ¿Qué falló, qué más puede fallar, y cuánto tiempo tengo? Un incendio y una falla de generador no se deciden con el mismo reloj |
| Configuración, peso, estado de sistemas y combustible restante | ¿Con qué avión voy a aterrizar? |
| Viento y meteorología en ruta a la altitud de desviación | Lo que hay entre el avión y cada aeródromo, a la altitud a la que iré |
| Altitudes mínimas en ruta al aeródromo | ¿Cabe mi altitud con un motor inoperativo sobre lo que hay debajo? |
| Consumo hasta el aeródromo | ¿Llego, y con qué margen? |
| Terreno, meteorología y viento cerca del aeródromo | La aproximación y el aterrizaje, no solo el trayecto |
| Disponibilidad y estado de la pista | ¿Está abierta, y en qué estado? |
| Ayudas de aproximación y luces disponibles | ¿Con qué entro? |
| RFFS en el aeródromo | Lo que me espera si el aterrizaje no es limpio |
| Instalaciones para desembarcar pasajeros y tripulación, y alojamiento | Después del aterrizaje |
| Familiaridad del comandante con el aeródromo | Un factor legítimo, no decisivo |
| Información sobre el aeródromo proporcionada por el operador | Lo que el despacho sabe y yo no |

Y el mismo AC dice con la misma claridad qué **no** justifica volar más allá del aeropuerto utilizable más cercano cuando un bimotor tiene un motor inoperativo: que el combustible alcance para ir más lejos; la comodidad de los pasajeros distinta de su seguridad; y la disponibilidad de mantenimiento o reparación. El mantenimiento y el apoyo pueden pesar entre dos aeródromos equivalentes en seguridad; nunca por encima de la seguridad.

El orden que ordena todo lo demás: **primero la naturaleza de la falla**, porque es la que dice si el tiempo es el factor dominante o si hay margen para comparar. Con un incendio, el tiempo manda y el aeródromo es el más cercano en el que se pueda aterrizar. Con una falla de generador y todo lo demás sano, hay margen para elegir el mejor.

### En una operación de aerolínea

La tripulación no decide sola ni decide en el vacío: tiene el plan con sus alternos, el despacho al otro lado del SATCOM y el ATC. Pero la decisión es del comandante, y el RAC 121 lo dice al definir el alterno EDTO: la designación en el plan «de ninguna manera limita la autoridad del piloto al mando durante el vuelo».

### ¿Qué debe verificar?

- Qué falló y cuánto tiempo tengo.
- Con qué avión voy a aterrizar: sistemas, peso, combustible.
- Cada candidato: trayecto, terreno, meteorología, pista, aproximación, RFFS.
- Lo que el despacho sabe de cada uno.

### En pocas palabras

- Desviarse no es «al más cercano»: es al utilizable más cercano en tiempo en el que se pueda aterrizar con seguridad.
- La naturaleza de la falla decide si el tiempo manda o si hay margen para comparar.
- Doce factores del AC 120-42B; tres que nunca justifican ir más lejos: combustible de sobra, comodidad, mantenimiento.
- La decisión es del comandante, con el despacho y el ATC, no en lugar de ellos.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Avión en el centro de un mapa esquemático con tres aeródromos alrededor. A, el más cercano, con un recuadro de meteorología rojo: «CEILING BELOW MINIMA · CROSSWIND 35 KT». B, algo más lejano, con recuadro verde: «CAVOK · ILS · RFFS 8 · RUNWAY 3.200 M». C, mucho más lejano, recuadro neutro. Alrededor del avión, en órbita, las variables como etiquetas: FAILURE, TIME, FUEL, WEATHER, TERRAIN, RUNWAY, APPROACH, RFFS, SYSTEMS. Una flecha de decisión que no apunta automáticamente a A, con la pregunta «¿NEAREST o MOST SUITABLE? Depende de la falla». Código: ED-20.

OBJETIVO:
Explicar que «nearest» y «most suitable» pueden requerir análisis operacional, y que la naturaleza de la falla es lo que fija cuánto análisis cabe.

---

## 42. NEAREST VS SUITABLE

**ID:** E42 · **Tiempo:** 7 min

### Concepto

«El más cercano» y «el más adecuado» son criterios que a veces coinciden y a veces no. La norma los combina en una frase que hay que leer entera: **el aeropuerto utilizable más cercano en tiempo en el que pueda hacerse un aterrizaje seguro**.

### Lo que debe saber el piloto

La regla de la FAA, 14 CFR 121.565, que el AC 120-42B aplica a ETOPS:

- **(a) Bimotor con un motor inoperativo**: el comandante debe aterrizar «en el aeropuerto utilizable más cercano, en tiempo, en el que pueda hacerse un aterrizaje seguro». No hay elección de conveniencia: el más cercano en tiempo de entre los que son utilizables.
- **(b) Tres o más motores con un solo motor inoperativo**: el comandante puede seguir más allá del utilizable más cercano si determina que es igual de seguro, considerando la naturaleza de la falla y las posibles dificultades mecánicas, la altitud, el peso y el combustible al parar el motor, la meteorología en ruta y en los posibles puntos de aterrizaje, la congestión del tránsito aéreo, el tipo de terreno y su familiaridad con el aeródromo.
- **(c)** Cada parada de motor en vuelo se reporta a la instalación de comunicaciones apropiada tan pronto como sea practicable.
- **(d)** Si se aterriza en un aeropuerto distinto del utilizable más cercano, informe escrito al director de operaciones, que lo remite a la autoridad en diez días.

Lo que esto **no** dice: que haya que ir al aeropuerto geográficamente más cercano. Dice «utilizable», y utilizable incluye que se pueda aterrizar con seguridad. Un aeródromo a 40 minutos con viento cruzado fuera de límites y sin RFFS no es el «más cercano utilizable»; el siguiente, a 55 minutos con ILS y CAVOK, sí.

Lo que esto **tampoco** dice: que la tripulación pueda elegir el más cómodo. Con un bimotor y un motor parado, entre dos aeródromos utilizables, se va al más cercano en tiempo. Y entre un aeródromo utilizable a 55 minutos y otro «mejor» a 90, se va al de 55. Las excepciones del apartado (b) son para aviones con tres o más motores, y aun ahí con una lista de factores que hay que poder justificar por escrito.

Y el matiz que este módulo pide desarrollar con cuidado: **la naturaleza de la emergencia puede hacer que el tiempo sea dominante**. En un incendio no se compara: se aterriza donde se pueda, cuanto antes. En una falla que no amenaza el vuelo inmediato, hay margen para que «utilizable» pese tanto como «cercano». La regla de la norma no contradice los procedimientos de emergencia; los presupone.

### En una operación de aerolínea

Con un motor parado en un bimotor, la tripulación identifica los aeródromos utilizables desde su posición —el ETP de falla de motor y el plan dan los candidatos— y va al más cercano en tiempo. Si hay dudas sobre si uno es utilizable, el despacho tiene la información para resolverlas. Si se decide por otro que no es el más cercano, se documenta.

### En pocas palabras

- FAA 121.565: bimotor con un motor inoperativo, al utilizable más cercano en tiempo donde se pueda aterrizar con seguridad.
- Utilizable no es geográficamente más cercano; tampoco es el más cómodo.
- Con tres o más motores hay margen para ir más allá, con factores que justificar.
- La naturaleza de la emergencia decide si el tiempo lo es todo.

---

## 43. CONTINUAR O DESVIARSE · UNA MATRIZ PARA RAZONAR

**ID:** E43 · **Tiempo:** 7 min

### Concepto

Esta matriz no da respuestas; ordena las preguntas. Su valor está en que la tripulación recorra las mismas filas cada vez, para que la decisión salga del análisis y no de la primera impresión.

### Lo que debe saber el piloto

| Factor | Lo que empuja a **continuar** | Lo que empuja a **desviarse** |
|---|---|---|
| Falla | Un sistema del grupo 2 sin efecto en performance ni cabina; redundancia intacta; ningún reloj corriendo | Un sistema del grupo 1; una falla que puede progresar; un sistema con límite de tiempo activado; cualquier cosa con humo o fuego |
| Combustible | Real igual o mayor que el requerido para el escenario crítico desde aquí, con margen | Déficit sobre el requerido, viento peor que el previsto, o el escenario crítico ya no cubierto |
| Meteorología | Alternos por encima de mínimos de utilización en la ventana; ruta hasta el destino sin fenómenos que alarguen | Alternos deteriorándose, ceniza o convección entre el avión y los alternos, engelamiento a la altitud de desviación |
| Alternos | Varios utilizables dentro del tiempo máximo y del sistema con límite de tiempo | Uno solo, o ninguno más allá del siguiente ETP |
| Estado del avión | Todos los sistemas significativos operativos | Uno degradado, y la MEL o el QRH dicen que con eso no hay capacidad EDTO |
| Tiempo | Poco tiempo de segmento por delante; salida del tramo afectado cercana | Horas de segmento por delante con menos protección de la que se despachó |
| Terreno | Ruta de desviación sobre el mar o terreno bajo | Ruta de desviación que exige altitud que un motor no sostiene |
| Estado de los pasajeros, cuando corresponda | Sin condiciones que cambien la ecuación | Una emergencia médica en la que el tiempo hasta atención cuenta |

Dos reglas de uso:

- Ninguna fila decide sola. Un déficit de combustible pequeño con tres alternos sanos y veinte minutos de segmento no es lo mismo que el mismo déficit con un alterno y dos horas.
- **La fila de la falla se lee primero.** Si la falla pone un reloj —incendio, supresión activada, oxígeno—, el resto de la matriz se comprime a una pregunta: ¿cuál es el utilizable más cercano en tiempo?

### En una operación de aerolínea

En la práctica, la matriz vive en la cabeza de la tripulación y en el procedimiento del operador. Lo que este capítulo pide es que, al entrenar y al entrevistar, se recorra entera y en voz alta, porque saltarse una fila es exactamente el error que los escenarios del capítulo 75 ponen a prueba.

### En pocas palabras

- Ocho filas: falla, combustible, meteorología, alternos, avión, tiempo, terreno, pasajeros.
- Ninguna decide sola; la de la falla se lee primero.
- Con un reloj corriendo, la matriz se reduce al utilizable más cercano en tiempo.
- No es una respuesta automática: es una forma de no olvidar nada.

---

## 44. ESCENARIO · FALLA DE MOTOR

**ID:** E44 · **Tiempo:** 7 min

### Concepto

Crucero, dentro del segmento EDTO, y falla un motor. La secuencia que sigue es la que la entrevista quiere oír completa y en orden. No es la lista de memoria de ningún fabricante; es el razonamiento operacional que cualquier lista de memoria presupone.

### Lo que debe saber el piloto

1. **Volar el avión.** Control, empuje, trayectoria. Lo primero y lo único durante los primeros segundos.
2. **QRH.** El procedimiento del fabricante para la falla o parada del motor, completo, con la disciplina de lectura y confirmación del operador.
3. **Estado del motor.** ¿Parada limpia, daño, incendio, vibración? Cambia todo lo que sigue: una parada por precaución y un motor con daño estructural no llevan al mismo aeródromo ni con el mismo reloj.
4. **Drift down.** Descenso a la altitud de crucero con un motor inoperativo, con la velocidad y el perfil del fabricante. Confirmar que esa altitud cabe sobre el terreno de la ruta de desviación.
5. **Combustible.** Real a bordo contra el requerido para el escenario de falla de motor desde la posición actual hasta el alterno más cercano en tiempo, a la altitud de drift down y con el viento de ese nivel.
6. **Alternos.** ¿Cuál es el utilizable más cercano en tiempo desde aquí, con un motor inoperativo? El ETP de falla de motor lo indica; la meteorología y el estado de cada candidato lo confirman.
7. **Meteorología.** En ruta a la altitud de desviación y en el aeródromo elegido, en la ventana de llegada.
8. **ATC.** Declarar la situación según corresponda, solicitar el descenso y la desviación, y mantener informado.
9. **Decisión de desviación.** El comandante, con lo anterior: al utilizable más cercano en tiempo en el que se pueda aterrizar con seguridad (FAA 121.565, para bimotores).
10. **Compañía y despacho.** Reportar la parada tan pronto sea practicable, coordinar el aeródromo, pedir la información que falte y lo que espera en tierra.

Lo que hay que tener claro sobre este orden: los pasos 1 a 3 son inmediatos y secuenciales; los pasos 4 a 9 se solapan y se reparten entre los dos pilotos; el 10 corre en paralelo desde que hay un momento para hacerlo. El orden que no cambia es el de la prioridad: primero el avión, luego la falla, luego a dónde.

### En pocas palabras

- Volar, QRH, estado del motor, drift down, combustible, alternos, meteorología, ATC, decisión, compañía.
- La naturaleza de la falla, en el paso 3, fija el ritmo de todo lo demás.
- Bimotor con un motor inoperativo: al utilizable más cercano en tiempo.
- No es la lista de memoria de un fabricante: es el razonamiento que va debajo.

---

## 45. ESCENARIO · DESPRESURIZACIÓN

**ID:** E45 · **Tiempo:** 6 min

### Concepto

FL390, dentro del segmento EDTO, aviso de altitud de cabina y despresurización confirmada. La secuencia, en el mismo formato que la anterior.

### Lo que debe saber el piloto

1. **Control inmediato del avión.** Máscaras, comunicación entre pilotos, control.
2. **Oxígeno y procedimientos.** El QRH de despresurización, con la disciplina de siempre.
3. **Descenso de emergencia.** Al nivel que el QRH y la altitud mínima de seguridad permitan; con la vista en el terreno y en el tránsito.
4. **Consumo a nivel bajo.** Estabilizados, el avión gasta mucho más por milla. Es el dato que reordena el resto.
5. **ETP y alternos.** El ETP de despresurización, no el de crucero: ¿cuál es el alterno más cercano en tiempo a este nivel y con este viento?
6. **Predicción de combustible.** Real a bordo contra el requerido para el escenario de despresurización desde aquí hasta ese alterno. El escenario A del combustible crítico lo garantizó desde el punto más crítico; ahora se confirma con las cifras reales.
7. **ATC.** Declarar, pedir el descenso si no se ha podido antes, coordinar la desviación y el nivel.
8. **Desviación.** Al alterno elegido, con la tripulación de cabina informada y los pasajeros atendidos.

Lo que este escenario enseña que el de falla de motor no: el avión tiene toda su performance, pero el oxígeno le quita la altitud, y la altitud le quita el alcance. La decisión no la manda el motor; la manda el combustible a nivel bajo.

### En pocas palabras

- Control, oxígeno y procedimientos, descenso de emergencia, consumo bajo, ETP de despresurización, predicción, ATC, desviación.
- Todos los motores, pero a nivel bajo: el combustible manda.
- El ETP que se mira es el de despresurización.

---

## 46. ESCENARIO · FALLA DE MOTOR MÁS DESPRESURIZACIÓN

**ID:** E46 · **Tiempo:** 5 min

### Concepto

La combinación de despresurización y falla de motor simultáneas es un escenario que la norma obliga a considerar: es el escenario B del combustible crítico en el RAC 121 (121.2581 (b)(5) i (B)) y en el 14 CFR 121.646 (b). Este capítulo lo incluye porque está en la regulación, no porque sea probable.

### Lo que debe saber el piloto

Por qué es el peor caso:

- **Altitud**: la fija el oxígeno, como en la despresurización sola: baja.
- **Velocidad**: la de crucero con un motor inoperativo, como en la falla de motor sola: menor.
- **Combustible**: a nivel bajo y con un motor, el consumo por milla es el mayor de los tres escenarios.
- **Tiempo de desviación**: menor velocidad y, posiblemente, peor viento a nivel bajo: el mayor de los tres.

La secuencia operacional es la suma de las dos anteriores, con una prioridad clara: primero lo que amenaza la vida ahora —la altitud de cabina—, después el motor, después la desviación. La metodología concreta —qué altitud, qué velocidad— la fijan el QRH del avión y el perfil aprobado del operador. Este módulo no la inventa.

### En pocas palabras

- Es el escenario B del combustible crítico: está en la norma.
- Altitud baja por el oxígeno, velocidad con un motor inoperativo: lo peor de ambos.
- Primero la altitud de cabina, luego el motor, luego a dónde.
- La metodología es del QRH y del operador.

---

## 47. ESCENARIO · INCENDIO EN BODEGA

**ID:** E47 · **Tiempo:** 6 min

### Concepto

Un incendio en bodega dentro del segmento EDTO convierte **el tiempo hasta aterrizar** en el factor dominante, por encima de todo lo demás. Es el escenario que da sentido a los sistemas con límite de tiempo.

### Lo que debe saber el piloto

Sin entrar en procedimientos de un tipo concreto:

- **Supresión.** El QRH activa el sistema de supresión de incendio de bodega. Desde ese momento corre un reloj: el tiempo de supresión disponible del avión, que está en su documentación.
- **Aeródromo.** El utilizable más cercano en tiempo. No el mejor, no el de la compañía, no el que tiene mantenimiento: el más cercano donde se pueda aterrizar.
- **Desviación.** Inmediata, a la velocidad y el perfil que el QRH y la situación permitan, con el ATC informado de la emergencia.
- **Tiempo máximo de desviación.** La planificación garantizó que todos los alternos EDTO estaban dentro del tiempo del sistema menos 15 minutos (RAC 121, 121.2581 (b)(3); FAA, 121.633). Ese margen existe para este momento. En vuelo, lo que se hace es confirmar que el alterno elegido está dentro con las condiciones reales y no perder un minuto.

Lo que distingue este escenario de todos los demás: la matriz del capítulo 43 se reduce a una pregunta y no admite comparaciones de comodidad. Es el caso en que «más cercano» y «utilizable» se leen como una sola palabra.

### En pocas palabras

- Incendio en bodega: el tiempo hasta aterrizar manda.
- Supresión activada, reloj corriendo, al utilizable más cercano en tiempo.
- La planificación garantizó el margen de 15 minutos para esto.
- Es el escenario que explica por qué existen los sistemas con límite de tiempo.

---

## 48. ESCENARIO · DESVIACIÓN MÉDICA EN EDTO

**ID:** E48 · **Tiempo:** 5 min

### Concepto

Una emergencia médica a bordo no es una falla del avión ni un escenario EDTO en sentido técnico, pero en una zona remota exige el mismo razonamiento: aeródromos, tiempo, meteorología, combustible, pista. Es un buen escenario para enseñar toma de decisiones lejos de tierra.

### Lo que debe saber el piloto

Lo que cambia respecto de una desviación por falla:

- **El avión está sano.** Toda la performance, todos los sistemas, todo el combustible del plan. Los alternos que valen son los del escenario normal, no los de falla; el tiempo a cada uno es el de crucero.
- **El criterio es el tiempo hasta atención médica**, no el tiempo hasta aterrizar sin más. Un aeródromo utilizable a 50 minutos sin capacidad médica puede ser peor que otro a 70 con hospital. Ese juicio se hace con la información del despacho, del servicio médico en tierra y de la tripulación de cabina.
- **Lo que no cambia**: el aeródromo tiene que ser utilizable —meteorología, pista, aproximación— y el combustible tiene que cubrir la desviación con reserva. Una desviación médica a un aeródromo bajo mínimos no ayuda a nadie.

Lo que se evalúa: utilizable más cercano; capacidad médica del aeródromo; meteorología en ruta y en el aeródromo; combustible; pista; tiempo. Y la coordinación con la compañía y con los servicios médicos en tierra, que en esto suelen tener más información que la tripulación.

### En pocas palabras

- Avión sano, alternos del escenario normal, tiempo de crucero.
- El criterio es el tiempo hasta atención médica, con el aeródromo utilizable como condición.
- Despacho y servicio médico en tierra son parte de la decisión.
- Enseña a decidir en zonas remotas sin que haya fallado nada.

---

## 49. EDTO Y DISPATCH

**ID:** E49 · **Tiempo:** 6 min

### Concepto

En EDTO, la tripulación de vuelo, el despacho o seguimiento de vuelo y el control de operaciones trabajan sobre el mismo problema desde sitios distintos. Cómo se reparten las responsabilidades depende del sistema regulatorio; lo que no depende de nada es que, en una contingencia, el apoyo desde tierra existe y hay que usarlo, sin que sustituya la autoridad del comandante.

### Lo que debe saber el piloto

Lo que la norma colombiana y la estadounidense fijan como mínimo:

- **RAC 121, 121.2581 (a)(2)**: para vuelos de más de 60 minutos, el explotador se asegura de que se tengan en cuenta «el control operacional y los procedimientos de despacho», los procedimientos operacionales y los programas de instrucción.
- **RAC 121, 121.2625 (e)(2)**: antes del punto de entrada, todos los alternos EDTO dentro del tiempo máximo son revisados «y la tripulación de vuelo está informada de cualquier cambio que haya ocurrido desde el despacho». Es una obligación de quien sigue el vuelo hacia quien lo vuela.
- **RAC 121, 121.2625 (g)**: antes del punto de entrada, «el piloto al mando o el DV debe utilizar los medios de comunicación de la compañía para actualizar el plan de vuelo si es necesario». Los dos, con los medios de la compañía.
- **FAA, 14 CFR 121.631 (c)**: lo mismo: revisión de todos los alternos y aviso a la tripulación de los cambios desde el despacho.

Lo que el despacho aporta en una contingencia, y que la tripulación no tiene o no tiene tan rápido: pronósticos completos de todos los alternos, NOTAM recientes, información de servicios en tierra, capacidad médica, recálculo de combustible con vientos actualizados, y la opción de proponer un aeródromo que no estaba en la lista. Lo que el despacho no hace es decidir por el comandante: el RAC 121 lo deja escrito en la definición de alterno EDTO.

Las responsabilidades concretas —qué firma quién, quién puede enmendar el despacho, qué se considera control operacional compartido— varían entre sistemas regulatorios y entre operadores. Este módulo no las define; señala que están en el manual de operaciones y que la tripulación debe conocerlas.

### En una operación de aerolínea

Antes de la entrada, un contacto con el despacho para confirmar alternos y cambios es lo habitual en muchas aerolíneas; lo exija o no el manual, es la forma más barata de cumplir el 121.2625 (e)(2). En una contingencia, el SATCOM con el despacho es el canal por el que llegan las opciones; el comandante las evalúa y decide.

### En pocas palabras

- RAC 121 y FAA: antes de la entrada, alternos revisados y tripulación informada de cambios; el plan se actualiza por los medios de la compañía.
- El despacho aporta información y opciones; la decisión es del comandante.
- Las responsabilidades exactas dependen del sistema regulatorio y del manual del operador.
- Un contacto antes de la entrada es la forma más sencilla de cumplir la norma.

---
# BLOQUE 10 · EL PLAN DE VUELO Y LA OPERACIÓN

---

## 50. EL PLAN DE VUELO EDTO

**ID:** E50 · **Tiempo:** 8 min

### Concepto

Un plan operacional de vuelo EDTO tiene elementos que un plan normal no tiene. El piloto tiene que reconocerlos a primera vista, porque en una contingencia no hay tiempo para buscar.

### Lo que debe saber el piloto

Lo que debería encontrar, y qué le dice cada cosa:

| Elemento | Qué es | Para qué lo usa la tripulación |
|---|---|---|
| Punto de entrada y de salida EDTO | Los límites del segmento | Saber cuándo hay que tener hecha la verificación de entrada y cuándo termina la vigilancia EDTO |
| Alternos en ruta EDTO | Los aeródromos designados para la desviación, con su tiempo desde los puntos relevantes | Los candidatos de partida en cualquier contingencia |
| ETP | Los puntos de igual tiempo, por escenario | Saber en cada momento cuál de los dos aeródromos está más cerca en tiempo bajo cada falla |
| Punto crítico | Dónde el combustible de la desviación es más exigente | Control obligatorio de combustible |
| Combustible EDTO | El combustible crítico y el total requerido en cada ETP y en el punto crítico | Real contra requerido, en cada punto |
| Meteorología de los alternos | TAF en la ventana de uso, a veces con los mínimos aplicados | Confirmar antes de la entrada que siguen sirviendo |
| Tiempos de desviación | Desde los ETP a cada alterno, por escenario, con viento | Saber cuánto se tardaría de verdad |
| Datos de igual tiempo | Posición, hora estimada, combustible previsto y requerido en cada ETP | Lo que se anota al pasar |
| Tiempo máximo de desviación aplicable | La aprobación con la que se hizo el plan, y a veces el sistema con límite de tiempo que la restringe | Entender por qué los alternos son los que son |

El formato es del operador y de su proveedor de planificación. Lo que es común a todos es la información; lo que cambia es dónde está y cómo se llama. Por eso el capítulo siguiente es un tutorial de lectura y no una plantilla.

### En una operación de aerolínea

En el briefing prevuelo, el comandante recorre el plan EDTO con el primer oficial: entrada, alternos, ETP, punto crítico, combustible. Es una conversación de cinco minutos que evita veinte de búsqueda en el peor momento.

### En pocas palabras

- Entrada y salida, alternos, ETP, punto crítico, combustible EDTO, meteorología de alternos, tiempos de desviación, datos de igual tiempo, tiempo máximo.
- El formato es del operador; la información es la misma.
- Se lee en el briefing, no en la contingencia.

[ESPACIO PARA IMAGEN ANOTADA]

IMAGEN BASE:
Página ficticia de un plan operacional de vuelo EDTO, con el formato en columnas habitual de un proveedor de planificación: cabecera con origen, destino, avión y tiempo máximo de desviación; la lista de waypoints con hora estimada, combustible previsto y combustible mínimo requerido; entre los waypoints, líneas resaltadas para el punto de entrada EDTO, dos ETP con su escenario, un punto crítico y el punto de salida EDTO; y un bloque aparte con los alternos EDTO, su tiempo de desviación desde cada ETP y su meteorología resumida. Código: ED-21.

ANOTACIONES:
→ FLECHA 1: a la línea del punto de entrada EDTO. EXPLICACIÓN: aquí empieza el segmento. Todo lo que hay que verificar tiene que estar hecho antes de esta línea.
→ FLECHA 2: a la línea del punto de salida EDTO. EXPLICACIÓN: aquí termina. Entre las dos, la vigilancia es la del capítulo 54.
→ FLECHA 3: a una línea de ETP con su escenario indicado. EXPLICACIÓN: el punto de igual tiempo entre dos alternos para ese escenario. Al pasarlo, se anota el combustible real y se compara.
→ FLECHA 4: al bloque de alternos EDTO. EXPLICACIÓN: los aeródromos designados, con su tiempo de desviación y su meteorología. Son el punto de partida de cualquier decisión, no su final.
→ FLECHA 5: a las columnas de combustible previsto y mínimo requerido. EXPLICACIÓN: dos números en cada punto. El segundo es el que protege el escenario crítico; el real no puede bajar de él.
→ FLECHA 6: al tiempo de desviación desde un ETP a un alterno. EXPLICACIÓN: con viento, para ese escenario. Es cuánto se tardaría de verdad, no el tiempo de planificación en aire en calma.

OBJETIVO PEDAGÓGICO:
Enseñar al piloto dónde encontrar cada dato crítico en el plan, para que en una contingencia vaya directo a la línea correcta.

---

## 51. CÓMO LEER UN PLAN DE VUELO EDTO

**ID:** E51 · **Tiempo:** 7 min

### Concepto

Un tutorial de diez pasos, en el orden en que conviene hacerlos en el briefing. Con práctica, toma cinco minutos.

### Lo que debe saber el piloto

1. **Identificar el segmento EDTO.** ¿Dónde está la entrada y dónde la salida? ¿Hay más de un segmento? ¿Cuánto dura cada uno?
2. **Identificar los alternos.** ¿Cuáles son, qué tramo cubre cada uno, cuánto se tarda a cada uno desde los puntos relevantes? ¿Alguno está justo en el límite del tiempo máximo?
3. **Verificar la meteorología.** Cada alterno, en su ventana de uso, contra los mínimos de planificación. Viento con ráfaga. TEMPO y PROB40 por debajo de mínimos.
4. **Identificar los ETP.** ¿Cuántos, entre qué aeródromos, para qué escenarios? ¿Con qué viento se calcularon?
5. **Identificar el punto crítico.** ¿Dónde está y cuánto combustible exige desde ahí?
6. **Comprobar el combustible.** El desglose: ¿el vuelo va limitado por EDTO o por el viaje normal? ¿Cuánto margen hay sobre el requerido en el punto crítico?
7. **Revisar los datos de desviación.** Tiempos con viento a cada alterno desde cada ETP, por escenario. ¿Algún tiempo con viento se acerca al del sistema con límite de tiempo?
8. **Comprobar el impacto de la MEL.** Cada ítem abierto contra el capítulo 32: ¿capacidad EDTO intacta, restringida, perdida? ¿Mínimos de aproximación afectados en algún alterno?
9. **Revisar los NOTAM.** De cada alterno EDTO, en la ventana de uso: pista, aproximación, luces, radioayudas, RFFS, horario.
10. **Entender la estrategia de contingencia.** Con todo lo anterior: si falla algo en el primer tramo, ¿a dónde voy? ¿Y en el segundo? ¿Cuál es el escenario que más me preocupa hoy y por qué?

El paso 10 es el que separa leer el plan de entenderlo. Si al terminar el briefing la tripulación puede decir «hoy el limitante es la despresurización entre el ETP 2 y la salida, porque el alterno del sur está justo y el viento es de frente», ha leído el plan.

### En pocas palabras

- Segmento, alternos, meteorología, ETP, punto crítico, combustible, datos de desviación, MEL, NOTAM, estrategia.
- En ese orden, en el briefing, en cinco minutos.
- El último paso es el que importa: saber qué preocupa hoy y por qué.

---

## 52. EL ETP EN EL FMS

**ID:** E52 · **Tiempo:** 5 min

### Concepto

Dónde aparece el ETP en cabina depende del operador, del avión y de su sistema de gestión de vuelo. No hay una interfaz universal. Lo que sí es universal es que la tripulación tiene que saber dónde está el suyo y cómo relacionarlo con la posición del avión.

### Lo que debe saber el piloto

Las formas habituales, sin que ninguna sea «la correcta»:

| Forma | Qué implica |
|---|---|
| Como waypoints en el plan de vuelo activo | El ETP se ve en la pantalla de navegación como un punto más; se pasa por él y se puede leer la hora estimada y el combustible previsto |
| En el plan de vuelo secundario | Algunos operadores cargan la ruta de desviación desde el ETP en un plan secundario, listo para activar |
| Solo en el plan operacional de vuelo en papel o en el EFB | El FMS no los tiene; la tripulación los sigue por posición y hora |
| Mediante el software de despacho | El despacho recalcula y envía los ETP actualizados con el viento real, por enlace de datos o por voz |

Lo que importa de verdad: que en todo momento la tripulación sepa **entre qué dos aeródromos está y cuál es el ETP siguiente**, y que al pasar cada ETP haga la comparación de combustible. Si el FMS lo muestra, mejor; si no, se lleva en el plan y en la cabeza.

### En una operación de aerolínea

Con los ETP como waypoints, un vistazo a la pantalla de navegación basta para situarse. Con la ruta de desviación en el plan secundario, activar la desviación es cuestión de segundos. Cada operador elige; la tripulación debe entrenar con lo que su operador tiene.

### En pocas palabras

- Waypoints, plan secundario, plan en papel o software de despacho: cuatro formas, ninguna universal.
- Lo que no cambia: saber entre qué aeródromos estás y cuál es el ETP siguiente.
- Se entrena con la interfaz del operador.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Pantalla de navegación genérica de un reactor de transporte, en modo mapa, con la ruta activa como línea magenta, la posición del avión, un waypoint sobre la ruta rotulado «ETP1» con su hora y combustible previstos en un recuadro, y dos aeródromos fuera de la ruta, uno a cada lado, rotulados «ALTN A» y «ALTN B», con una línea discontinua desde el ETP a cada uno. En una esquina, un recuadro que diga «FORMATO DEL OPERADOR: puede variar». Código: ED-22.

OBJETIVO:
Relacionar el plan de vuelo con la conciencia situacional de la tripulación: el ETP es un punto que se ve pasar, entre dos aeródromos que se ven a los lados.

---

## 53. EDTO ENTRY CHECK · ANTES DE ENTRAR AL SEGMENTO

**ID:** E53 · **Tiempo:** 8 min

### Concepto

Antes del punto de entrada, la tripulación confirma que todo lo que el despacho asumió sigue siendo cierto. Es el momento en que la norma exige la reevaluación (Anexo 6, 4.7.2.5; FAA, 121.631 (c); RAC 121, 121.2625 (e) y (g)), y el momento en que un problema todavía se resuelve sin desviarse.

> **RESUMEN EDUCATIVO — SEGUIR SIEMPRE SOP/FCOM/QRH DEL OPERADOR.** Lo que sigue no es una lista de verificación aprobada. Es un modelo mental de lo que una verificación de entrada debe cubrir; la lista real es la del manual de tu aerolínea.

### Lo que debe saber el piloto

| Elemento | Qué se confirma |
|---|---|
| Estado del avión | Ninguna falla desde el despegue que afecte a un sistema significativo; nada nuevo en el libro técnico |
| Estado MEL | Los ítems abiertos siguen siendo los del despacho, y ninguno ha cambiado la capacidad EDTO |
| Combustible | Real a bordo contra el previsto en el plan para la entrada, y contra el requerido para el escenario crítico desde el primer tramo |
| Alternos | Los del plan siguen siendo utilizables; ninguno ha caído por NOTAM o meteorología |
| Meteorología | Pronóstico de cada alterno, en la ventana de uso, a o por encima de los mínimos de utilización, sin condiciones que impidan una aproximación y aterrizaje seguros (RAC 121, 121.2625 (e)(1); FAA, 121.631 (c)) |
| NOTAM | Nada nuevo en los alternos desde el despacho |
| Sistemas críticos | Los sistemas con límite de tiempo y los significativos operativos; nada en el QRH pendiente |
| Comunicaciones | Los medios que el plan asume —SATCOM, HF, CPDLC— operativos y probados |
| Navegación | La capacidad que la ruta exige, intacta; las aproximaciones de los alternos, volables |
| Capacidad de desviación | Con todo lo anterior: si algo falla en el primer tramo, ¿a dónde voy y con qué? La respuesta tiene que estar clara antes de entrar |

Y la conversación con el despacho, que la Aerocivil exige cuando algo ha cambiado (121.2625 (g)) y que muchos operadores hacen siempre: alternos confirmados, cambios desde el despacho, plan actualizado si hace falta.

Lo que se hace si algo no cuadra está en el capítulo 39. Lo que no se hace es entrar «a ver qué pasa».

### En una operación de aerolínea

Con un margen razonable antes del punto de entrada —cada operador fija el suyo—, un piloto recorre la lista del manual mientras el otro vuela, se contacta con el despacho por SATCOM o CPDLC, y se confirma la entrada. Si el margen se ha consumido y algo sigue abierto, se resuelve antes de entrar aunque suponga un retraso.

### En pocas palabras

- Antes de la entrada se reevalúa: avión, MEL, combustible, alternos, meteorología, NOTAM, sistemas críticos, comunicaciones, navegación, capacidad de desviación.
- La norma lo exige en los tres marcos; el manual del operador dice cómo.
- Con el despacho, con margen, y con la respuesta a «si falla algo, a dónde voy» clara.
- No es una lista aprobada: es un modelo mental.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Vista en planta: el avión sobre la ruta, acercándose a un punto marcado «EDTO ENTRY» con la porción de ruta posterior sombreada. Alrededor del avión, dispuestos en arco, diez iconos con su etiqueta: AIRCRAFT STATUS, MEL, FUEL, ALTERNATES, WEATHER, NOTAM, CRITICAL SYSTEMS, COMMS, NAV, DIVERSION CAPABILITY. Bajo el conjunto, una banda: «Resumen educativo · la lista real es la del manual de tu operador». Código: ED-23.

OBJETIVO:
Crear un modelo mental de entrada EDTO: diez cosas que tienen que estar en verde antes de la línea.

---

## 54. MONITORIZACIÓN DURANTE EDTO

**ID:** E54 · **Tiempo:** 6 min

### Concepto

EDTO no significa «una vez dentro, seguimos». Es un proceso dinámico: la protección con la que se entró puede reducirse durante el segmento, y la tripulación es quien lo detecta.

### Lo que debe saber el piloto

Lo que se sigue vigilando, y con qué frecuencia:

| Qué | Cómo |
|---|---|
| Sistemas del avión | Cualquier aviso, cualquier parámetro fuera de lo normal, con la pregunta EDTO detrás: ¿afecta a un sistema significativo? |
| Combustible | En cada ETP y en el punto crítico, real contra previsto y contra requerido (capítulo 25) |
| Meteorología | De los alternos, con los mensajes del despacho y los reportes disponibles; en ruta, con el radar y los reportes de otros aviones |
| Alternos | ¿Siguen siendo utilizables? ¿Ha llegado algún NOTAM? |
| Comunicaciones | Que los medios siguen operativos; un SATCOM que se cae en mitad del segmento es una degradación que hay que conocer |
| Navegación | Que la capacidad se mantiene; cualquier degradación se evalúa contra la ruta y los alternos |
| Mensajes operacionales | Los del despacho, con actualizaciones de viento, alternos o combustible |
| Opciones de desviación | En cada momento: cuál es el alterno más cercano en tiempo, por qué escenario, con cuánto combustible. Es la pregunta que se mantiene viva todo el segmento |

La vigilancia se reparte entre los dos pilotos y se ancla en los ETP: pasar un ETP es el recordatorio natural de recorrer la lista.

### En una operación de aerolínea

En un segmento largo, los ETP dan la cadencia: al pasar cada uno, combustible, meteorología de los alternos del tramo siguiente, estado del avión, opción de desviación. Entre ETP, la vigilancia normal de cualquier vuelo, con la antena puesta en lo que pueda cambiar la protección.

### En pocas palabras

- Dentro de EDTO se sigue vigilando: sistemas, combustible, meteorología, alternos, comunicaciones, navegación, mensajes, opciones de desviación.
- Los ETP marcan la cadencia.
- La pregunta viva todo el segmento: si algo falla ahora, ¿a dónde voy?

---

## 55. EDTO Y CRM

**ID:** E55 · **Tiempo:** 6 min

### Concepto

Una contingencia EDTO es larga, tiene muchas piezas y se resuelve con dos pilotos que se reparten el trabajo sin perderse. La cadena que sigue es el esqueleto de esa gestión; quién hace cada eslabón lo fija el operador.

### Lo que debe saber el piloto

La cadena, como secuencia de responsabilidades que hay que cubrir:

**FAILURE → AVIATE → QRH / ECAM / EICAS → ASSESS → ALTERNATES → FUEL → DECISION → ATC → DISPATCH → DIVERSION MANAGEMENT**

Lo que cada eslabón exige del CRM, sin atribuir tareas fijas a PF o PM, porque eso es del manual del operador:

- **Aviate**: uno vuela, el otro confirma; nadie hace dos cosas.
- **QRH / ECAM / EICAS**: lectura y ejecución con la disciplina del operador; el que vuela no lee.
- **Assess**: qué falló, qué significa para EDTO, qué reloj corre. Aquí es donde se decide el ritmo de todo lo demás, y donde el CRM importa más: los dos tienen que compartir el mismo diagnóstico antes de seguir.
- **Alternates**: quién mira el plan, quién mira el ETP, quién pregunta al despacho.
- **Fuel**: real, requerido, predicción; una voz lo lee, la otra lo confirma.
- **Decision**: la toma el comandante, después de oír al otro. El primer oficial tiene la obligación de decir lo que ve.
- **ATC**: declarar, pedir, informar; una sola voz hacia fuera.
- **Dispatch**: coordinar por SATCOM o CPDLC; la información que llega se comparte en cabina.
- **Diversion management**: la ejecución, con la tripulación de cabina informada, los pasajeros atendidos y la aproximación preparada con tiempo.

El error típico del CRM en EDTO no es de conocimiento: es que los dos pilotos se metan en la misma tarea y nadie vigile el avión o el combustible. La cadena existe para que eso no pase.

### En pocas palabras

- Falla, aviar, QRH, evaluar, alternos, combustible, decisión, ATC, despacho, gestión de la desviación.
- El eslabón crítico es «evaluar»: un diagnóstico compartido antes de seguir.
- La decisión es del comandante después de oír al otro.
- Quién hace qué, lo dice el manual del operador; que todo se haga, lo dice el CRM.

---

## 56. EDTO Y TEM

**ID:** E56 · **Tiempo:** 6 min

### Concepto

La gestión de amenazas y errores aplicada al segmento EDTO: qué amenazas trae el entorno, qué errores puede cometer la tripulación y a qué estado no deseado llevan si no se atajan.

### Lo que debe saber el piloto

| Amenazas | Errores | Estados no deseados |
|---|---|---|
| Espacio aéreo remoto: sin radar, con comunicaciones limitadas | Evaluación pobre de los alternos: leerlos sin mirar la ventana de uso ni los NOTAM | Margen de combustible insuficiente para el escenario crítico |
| Alternos limitados: uno solo en tramos largos | Interpretación incorrecta del ETP: leerlo como «punto de retorno» o como decisión automática | Pérdida de redundancia sin haberla reconocido |
| Meteorología: deterioro en los alternos, fenómenos en ruta | Error en la vigilancia del combustible: no comparar con el requerido en cada ETP | Opciones de desviación reducidas sin haberlo detectado |
| Comunicaciones: cobertura, calidad, latencia | Decisión de desviación retrasada: esperar a que la situación «se aclare» mientras se consume el margen | |
| Desviación larga: tiempo, fatiga, gestión de cabina | | |
| Degradación de sistemas: un significativo que empieza a fallar | | |
| Combustible: viento peor, consumo mayor | | |

Cómo se usa: en el briefing, nombrar las amenazas del día —«hoy el alterno del sur está justo y el viento es de frente»—; en vuelo, reconocer el error antes de que se convierta en estado no deseado —«no hemos comparado el combustible en el ETP 2, hagámoslo ahora»—; y si el estado no deseado aparece, gestionarlo —«tenemos menos margen del que pensábamos; hablemos con el despacho de un alterno más cercano».

### En pocas palabras

- Amenazas: remoto, alternos limitados, meteorología, comunicaciones, desviación larga, degradación, combustible.
- Errores: alternos mal evaluados, ETP mal interpretado, combustible mal vigilado, desviación retrasada.
- Estados no deseados: sin margen, sin redundancia, sin opciones.
- Se nombran en el briefing y se atajan antes de que crezcan.

---

# BLOQUE 11 · CONEXIONES Y ACLARACIONES

---

## 57. MEL · VARIOS ÍTEMS A LA VEZ

**ID:** E57 · **Tiempo:** 5 min

### Concepto

Dos ítems diferidos que, cada uno por su lado, no quitan la capacidad EDTO pueden, juntos, reducir la redundancia hasta el punto de quitarla, o de obligar a un tiempo máximo menor o a otra ruta.

### Lo que debe saber el piloto

Lo que varios ítems simultáneos pueden hacer:

- **Ser aceptables individualmente** y, sin embargo, **modificar la redundancia** que el escenario de desviación asume: un generador diferido y una APU diferida son dos ítems distintos y una sola pérdida de redundancia eléctrica.
- **Limitar EDTO** aunque ninguna entrada lo diga por separado: algunas MEL incluyen restricciones por combinación, y el manual del operador puede añadir las suyas.
- **Reducir el tiempo máximo de desviación**, si la combinación deja un sistema con límite de tiempo sin su respaldo.
- **Obligar a una ruta diferente**, porque el tiempo reducido saca alternos del alcance.

La regla es la del capítulo 32, elevada: no se asume nada; se consulta la MEL para cada ítem, se buscan las restricciones por combinación, y si hay duda, se pregunta a mantenimiento y al despacho antes de aceptar el vuelo. Conecta con el módulo MEL.

### En pocas palabras

- Varios ítems: aceptables por separado, problema en conjunto.
- Redundancia, capacidad EDTO, tiempo máximo, ruta: las cuatro cosas que pueden cambiar.
- La MEL y el manual pueden tener restricciones por combinación; se buscan.

---

## 58. EDTO Y PERFORMANCE

**ID:** E58 · **Tiempo:** 5 min

### Concepto

El módulo Performance enseñó los cálculos; aquí solo se marca dónde entran en EDTO.

### Lo que debe saber el piloto

| Elemento de performance | Dónde aparece en EDTO |
|---|---|
| Performance con un motor inoperativo | La velocidad de referencia con la que se calculan el umbral, el tiempo máximo, los ETP de falla de motor y el combustible crítico |
| Drift down | La altitud del escenario de falla de motor y su consumo; la ruta de escape sobre terreno alto |
| Terreno | Si la altitud de drift down cabe sobre la ruta de desviación al alterno |
| Peso de aterrizaje | El que tendrá el avión al llegar al alterno tras una desviación temprana, con mucho combustible a bordo; puede exigir sobrepeso o quemar combustible, y ambas cosas se deciden con el QRH y el manual |
| Pista | Que el alterno admite ese peso con un motor inoperativo y con la pista en el estado que tenga |
| Pista contaminada | Un alterno adecuado con pista seca puede no serlo con la pista contaminada y un motor inoperativo |

Ninguna cifra de este capítulo es de este módulo: son del AFM y del FMS de cada avión.

### En pocas palabras

- Un motor inoperativo, drift down, terreno, peso de aterrizaje, pista, contaminación: seis puntos de contacto.
- Las cifras son del avión; el módulo Performance enseña de dónde salen.

---

## 59. EDTO Y PBN

**ID:** E59 · **Tiempo:** 4 min

### Concepto

Una degradación de la capacidad de navegación basada en performance afecta a la vez a la ruta, al espacio aéreo, a las aproximaciones en los alternos y, por todo eso, a la planificación de la desviación.

### Lo que debe saber el piloto

- **Ruta**: si la ruta exige una especificación que el avión ya no cumple, hay que cambiar de ruta o de nivel, y eso mueve combustible y ETP.
- **Espacio aéreo**: algunos espacios aéreos oceánicos o remotos exigen una capacidad concreta; sin ella, la ruta de desviación puede tener que evitarlos.
- **Aproximaciones en los alternos**: un alterno cuya entrada útil es RNP deja de tener esa entrada; cambia la fila de la tabla de mínimos o desaparece.
- **Planificación de la desviación**: con menos aproximaciones y otras rutas, los tiempos y el combustible cambian.

Conecta con el módulo PBN para el detalle de cada especificación.

### En pocas palabras

- PBN degradado: ruta, espacio aéreo, aproximaciones en alternos, planificación de la desviación.
- Un alterno puede perderse por perder la aproximación que lo hacía utilizable.

---

## 60. EDTO Y RVSM

**ID:** E60 · **Tiempo:** 4 min

### Concepto

Una falla puede quitar a la vez la capacidad RVSM y parte de la protección EDTO, y las dos cosas se gestionan juntas.

### Lo que debe saber el piloto

Una falla de un sistema requerido para RVSM —control automático de altitud, alerta de altitud, sistema altimétrico— obliga a salir del espacio RVSM, normalmente descendiendo. Lo que eso le hace a EDTO:

- **Descenso**: nivel inferior, más consumo.
- **Combustible**: la predicción al destino cambia, y también el margen sobre el escenario crítico.
- **Planificación de la desviación**: los ETP calculados a nivel de crucero ya no describen el vuelo; el viento a nivel inferior es otro.
- **Capacidad EDTO**: según qué falló, puede ser además un sistema significativo, con lo que la reevaluación del capítulo 39 o 40 se hace a la vez.

Conecta con el módulo RVSM para la parte de contingencia y fraseología.

### En pocas palabras

- Perder RVSM en EDTO: descenso, más consumo, ETP que ya no valen, y quizá una reevaluación de capacidad.
- Dos contingencias, una gestión.

---

## 61. EDTO Y COMUNICACIONES AERONÁUTICAS

**ID:** E61 · **Tiempo:** 5 min

### Concepto

En una desviación, la tripulación necesita del ATC una autorización, del operador información, y a veces declarar una emergencia. Qué medio usa para cada cosa depende de dónde esté. Este capítulo no es radiotelefonía; el módulo Comunicaciones la enseña.

### Lo que debe saber el piloto

Lo que una desviación puede necesitar:

- **Autorización del ATC** para descender y cambiar de ruta. En espacio oceánico sin radar, por HF o CPDLC, con la latencia que eso tiene; en una emergencia, se actúa y se informa cuanto antes.
- **MAYDAY o PAN PAN**, cuando corresponda según la gravedad, con la fraseología estándar de la OACI. Declarar no es opcional cuando la situación lo exige: es lo que obtiene prioridad y atención.
- **HF** con la estación oceánica, como medio principal donde no hay VHF.
- **CPDLC** para autorizaciones y reportes, donde esté disponible y el equipo funcione.
- **SATCOM** con el ATC y con la compañía: el medio que la norma exige para más de 180 minutos (RAC 121, 121.2581 (b)(8)) y el que la FAA considera mejor salvo en latitudes muy altas.
- **Comunicación con la compañía**: el canal por el que llegan alternos, meteorología, combustible recalculado y lo que espera en tierra.

Lo que hay que haber comprobado antes de la entrada: qué medio funciona a la altitud y por la ruta de desviación, no solo en crucero (capítulo 36).

### En pocas palabras

- Autorización ATC, MAYDAY o PAN PAN cuando corresponda, HF, CPDLC, SATCOM, compañía.
- El medio depende de dónde estés; se comprueba antes de entrar.
- Fraseología: la estándar OACI, en el módulo Comunicaciones.

---

## 62. OCEÁNICO NO ES ETOPS

**ID:** E62 · **Tiempo:** 4 min

### Concepto

Operación oceánica y EDTO son conceptos que coinciden en muchos vuelos y que no son equivalentes.

### Lo que debe saber el piloto

- **Oceánica** describe **dónde** se vuela: espacio aéreo oceánico, con sus procedimientos de navegación, comunicaciones y separación.
- **EDTO** describe **cuán lejos de un aeródromo** se está: tiempo de desviación por encima del umbral.

Las combinaciones posibles:

| Combinación | Ejemplo |
|---|---|
| Oceánica y EDTO | Un cruce del Atlántico Sur con un bimotor: procedimientos oceánicos y segmento EDTO |
| Oceánica y no EDTO | Un vuelo por el Caribe con aeródromos adecuados a menos de 60 minutos en todo momento: procedimientos oceánicos, sin EDTO, en las condiciones de la aprobación del operador |
| EDTO sobre tierra | Una ruta sobre una región continental remota sin aeródromos adecuados en cientos de millas |

Confundirlos lleva a dos errores simétricos: creer que un vuelo oceánico corto exige EDTO, y creer que un vuelo continental largo no lo exige.

### En pocas palabras

- Oceánico es dónde; EDTO es cuán lejos de un aeródromo.
- Oceánico y EDTO, oceánico sin EDTO, EDTO sobre tierra: las tres existen.

---

## 63. POLAR NO ES ETOPS

**ID:** E63 · **Tiempo:** 4 min

### Concepto

Las operaciones polares son otra cosa: tienen requisitos adicionales propios, y un vuelo polar puede ser EDTO o no serlo. Este módulo no es de operaciones polares.

### Lo que debe saber el piloto

La FAA define las áreas polares en el 121.7: el área polar norte es todo lo que queda al norte de 78° N, y el área polar sur, al sur de 60° S. El Apéndice P de la Parte 121 exige, para operar en ellas, requisitos que no son los de ETOPS: designación de aeródromos para desviación en ruta, procedimientos para el punto de congelación del combustible, plan de comunicaciones, entrenamiento, medidas frente a la radiación y equipo de supervivencia, entre otros. El AC 120-42B las trata en el mismo documento que ETOPS, y de ahí la confusión.

Lo que hay que retener: un vuelo polar puede tener segmento EDTO —lo normal, por la escasez de aeródromos— y además cumplir los requisitos polares. Los dos conjuntos se suman; ninguno sustituye al otro.

### En pocas palabras

- Polar es una zona con requisitos propios; EDTO es tiempo de desviación.
- Un vuelo polar suele ser también EDTO, y cumple los dos conjuntos.
- Este módulo no es de operaciones polares.

---

## 64. EDTO EN COLOMBIA

**ID:** E64 · **Tiempo:** 8 min

### Concepto

Lo que un piloto que opere bajo la Aerocivil debe conocer del RAC 121 sobre EDTO. Solo lo que le concierne; los procedimientos de aprobación dirigidos a inspectores y a los departamentos técnicos del operador quedan fuera.

### Lo que debe saber el piloto

**Las definiciones** (RAC 121, numeral 121.001): aeródromo adecuado; aeródromo alterno en ruta; aeródromo alterno para EDTO; operación con tiempo de desviación extendido; punto de entrada EDTO; punto de no retorno; sistema significativo para EDTO; tiempo de desviación máximo; combustible crítico para EDTO. Son las que este módulo ha ido citando, alineadas con el Anexo 6.

**El numeral 121.2581**, que es el corazón:

| Apartado | Qué dice |
|---|---|
| (a) | Para vuelos de más de 60 minutos a un aeródromo alterno en ruta: identificar los alternos, dar a la tripulación la información más reciente sobre ellos, y para bimotores que las condiciones estarán a o sobre los mínimos de utilización a la hora prevista; además, tener en cuenta el control operacional y los procedimientos de despacho, los procedimientos operacionales y los programas de instrucción |
| (b)(1) | Salvo aprobación específica de la UAEAC, ningún avión con dos o más motores de turbina operará en una ruta en la que el tiempo de desviación, en ISA y aire en calma, a la velocidad con un motor inoperativo (bimotores) o con todos (más de dos), exceda **60 minutos** para bimotores y **180 minutos** para tres o más motores |
| (b)(2) | La aprobación indica el umbral aplicable por cada combinación avión-motor |
| (b)(3) | La UAEAC especifica el tiempo máximo de desviación por combinación, y no se lista un alterno EDTO más allá del tiempo del sistema significativo más limitante —incluida la supresión de incendio de carga— menos 15 minutos, con reglas distintas hasta 180 minutos y más allá |
| (b)(4) | La UAEAC puede aprobar superar esos límites con una evaluación de riesgos específica del explotador |
| (b)(5) | El combustible adicional del 121.2645 (c)(6)(ii) incluye el escenario de combustible crítico: los tres casos, el 5 % de viento, el engelamiento, el 5 % de deterioro, 15 minutos de espera a 1.500 ft más aproximación y aterrizaje, y la APU |
| (b)(6) | No se prosigue más allá del punto de entrada EDTO salvo que se cumpla el 121.2625 (e); para más de 180 minutos, segundo sistema de comunicaciones |
| (b)(7) y (b)(8) | Comunicaciones de voz donde estén disponibles, consideradas para las rutas y altitudes de desvío; más de 180 minutos, segundo sistema con voz satelital inmediata con fidelidad de teléfono fijo |

**El numeral 121.2625**: (c) los incrementos de techo y visibilidad para alternos son los que el explotador fije y la UAEAC acepte, con orientación del Doc 9976; (d) el margen de tiempo para la hora prevista de utilización lo establece el explotador y lo aprueba la UAEAC; (e) para pasar el punto de entrada, pronósticos de cada alterno EDTO a o sobre los mínimos de operación, sin condiciones que impidan una aproximación segura, y todos los alternos dentro del tiempo máximo revisados con la tripulación informada de los cambios; (f) se puede enmendar el despacho para añadir un alterno EDTO dentro del tiempo máximo; (g) antes del punto de entrada, el comandante o el despachador actualizan el plan por los medios de la compañía si hay que reevaluar capacidades.

**Lo que no está**: el Apéndice 15 del RAC 121 figura como **reservado** desde la Resolución 954 de 2024, artículo 27. Y la circular GCEP-1.0-22-040 no aparece en la biblioteca de circulares del sitio de la Aerocivil al redactar esta versión; si tu operador la maneja, es el documento que describe el procedimiento de aprobación, y hay que consultarla ahí. El RAC 135, para los operadores a los que aplique, tiene sus propias disposiciones, que este módulo no ha verificado.

### En una operación de aerolínea

Para un piloto colombiano, la traducción práctica: el umbral es 60 minutos en bimotores; la aprobación de su operador dice el tiempo máximo por flota; el combustible crítico del plan sigue el 121.2581 (b)(5); antes del punto de entrada se cumple el 121.2625 (e); y para más de 180 minutos hay SATCOM de voz obligatorio.

### En pocas palabras

- RAC 121, 121.001: las definiciones, alineadas con el Anexo 6.
- 121.2581: 60 y 180 minutos, tiempo máximo por combinación, sistemas con límite de tiempo menos 15 minutos, combustible crítico con sus porcentajes, comunicaciones.
- 121.2625 (e), (f), (g): qué hace falta para pasar el punto de entrada y cómo se enmienda el plan.
- Apéndice 15 reservado; circular GCEP-1.0-22-040 a consultar en el operador.

---
# BLOQUE 12 · EJEMPLOS

---

## 65. UN VUELO EDTO COMPLETO

**ID:** E65 · **Tiempo:** 9 min

### Concepto

Una ruta ficticia que integra todo el módulo en una sola operación. Los aeródromos y las distancias son inventados a propósito; las reglas son las reales.

### Lo que debe saber el piloto

**La ruta.** ALFA, en una costa, a DELTA, en otra, cruzando un océano. En medio, dos aeródromos adecuados: BRAVO, en una isla a un tercio del camino, y CHARLIE, en otra isla a dos tercios. Bimotor, operador con aprobación EDTO de 180 minutos para esa flota, umbral de 60 minutos.

**El área.** Círculos de 180 minutos alrededor de ALFA, BRAVO, CHARLIE y DELTA. La ruta cabe dentro de la unión. Círculos de 60 minutos alrededor de los mismos: la ruta sale del de ALFA, no entra en el de BRAVO ni en el de CHARLIE porque pasa lejos de las islas, y entra en el de DELTA cerca del final.

**Los puntos.**

| Punto | Qué es |
|---|---|
| ALFA | Origen; a efectos EDTO, también alterno en ruta (Anexo 6, 4.7.2.1, nota 3) |
| EDTO ENTRY | Donde la ruta sale del círculo de 60 minutos de ALFA |
| ALTERNATE 1 · BRAVO | Primer alterno EDTO, con pronóstico por encima de mínimos de planificación en su ventana de uso |
| ETP 1 | Punto de igual tiempo entre ALFA y BRAVO, desplazado hacia ALFA porque el viento del día es de cola hacia el este |
| ETP 2 | Punto de igual tiempo entre BRAVO y CHARLIE |
| CRITICAL POINT | Coincide con el ETP 2 en el escenario de despresurización, que hoy es el limitante: es donde el alterno más cercano en tiempo a nivel bajo está más lejos |
| ALTERNATE 2 · CHARLIE | Segundo alterno EDTO, con una sola aproximación: fila de +400 ft y +1 milla en la tabla del operador |
| ETP 3 | Punto de igual tiempo entre CHARLIE y DELTA |
| EDTO EXIT | Donde la ruta entra en el círculo de 60 minutos de DELTA |
| DELTA | Destino; también alterno en ruta a efectos EDTO |

**El combustible.** El plan muestra, en cada ETP y en el punto crítico, dos cifras: el combustible previsto y el requerido para el escenario crítico desde ahí. Hoy el vuelo va limitado por EDTO: el escenario de despresurización desde el punto crítico hasta CHARLIE, con el 5 % de viento, el engelamiento previsto a nivel bajo, el 5 % de deterioro, 15 minutos de espera y la APU, exige más combustible en ese punto del que el viaje normal dejaría. El avión sale con la diferencia.

**La meteorología.** BRAVO, CAVOK en toda la ventana. CHARLIE, techo 800 ft en la mayor parte de la ventana con un TEMPO a 500 ft en las dos últimas horas: por encima de los mínimos de planificación del operador para su única aproximación, pero justo. DELTA, sin novedad.

**El viento.** De cola hacia el este en crucero, unos nudos menos a nivel bajo. Los ETP están desplazados hacia el oeste respecto del punto medio de cada par; el de despresurización, algo menos que el de falla de motor porque el viento a nivel bajo es menor.

**El tiempo máximo de desviación.** 180 minutos aprobados; el sistema con límite de tiempo más restrictivo de la flota, según su documentación, deja el límite práctico por debajo de eso menos 15 minutos, y todos los alternos caben.

**Lo que preocupa hoy.** Que CHARLIE aguante en su ventana con una sola aproximación y un TEMPO al final. La tripulación lo nombra en el briefing y lo vigila en cada ETP.

### En pocas palabras

- Cuatro aeródromos, dos círculos por aeródromo, una entrada, tres ETP, un punto crítico, una salida.
- El limitante de hoy es la despresurización desde el punto crítico hasta CHARLIE.
- La preocupación de hoy es CHARLIE, con una aproximación y un TEMPO.
- Todo el módulo, en un mapa.

[ESPACIO PARA IMAGEN ANOTADA]

IMAGEN BASE:
Mapa ficticio del cruce ALFA–DELTA. Las dos costas a izquierda y derecha, las dos islas BRAVO y CHARLIE en el océano, a un tercio y dos tercios del camino, algo apartadas de la ruta. Alrededor de los cuatro aeródromos, círculos de 180 minutos con la unión sombreada como área de operación, y círculos de 60 minutos más pequeños. La ruta cruzando de izquierda a derecha con todos los puntos marcados: EDTO ENTRY, ETP 1, ETP 2 con el rombo de CRITICAL POINT superpuesto, ETP 3, EDTO EXIT. Una flecha de viento hacia el este sobre el mapa. Un recuadro pequeño por alterno con su meteorología resumida. Código: ED-24.

ANOTACIONES:
→ FLECHA 1: a EDTO ENTRY. EXPLICACIÓN: donde la ruta sale del círculo de 60 minutos de ALFA. Antes de aquí, la verificación de entrada.
→ FLECHA 2: a ETP 1, desplazado hacia ALFA. EXPLICACIÓN: igual tiempo a ALFA y a BRAVO; el viento de cola hacia el este lo empuja hacia el oeste.
→ FLECHA 3: a BRAVO. EXPLICACIÓN: primer alterno EDTO, CAVOK en su ventana. Sostiene el primer tercio.
→ FLECHA 4: a ETP 2 con el rombo de CRITICAL POINT. EXPLICACIÓN: igual tiempo entre BRAVO y CHARLIE, y hoy el punto donde el combustible de la desviación por despresurización es más exigente. Control obligatorio.
→ FLECHA 5: a CHARLIE, con su recuadro de meteorología. EXPLICACIÓN: segundo alterno, una sola aproximación, TEMPO al final de la ventana. Lo que se vigila hoy.
→ FLECHA 6: a la unión sombreada de los círculos de 180 minutos. EXPLICACIÓN: el área de operación. Si CHARLIE cayera, el círculo desaparece y el tramo central queda sin cobertura.
→ FLECHA 7: a EDTO EXIT. EXPLICACIÓN: donde la ruta entra en el círculo de 60 minutos de DELTA. Fin del segmento.

OBJETIVO PEDAGÓGICO:
Integrar todo el módulo en una sola representación: tiempos, aeródromos, puntos, combustible, meteorología y viento, sobre un mismo mapa.

---

## 66. EJEMPLO · EL VIENTO CAMBIA EL ETP

**ID:** E66 · **Tiempo:** 6 min

### Concepto

Números sencillos y educativos, para ver el desplazamiento del ETP sin matemáticas de más. Son cifras de ejercicio, no de ningún avión.

### Lo que debe saber el piloto

Dos aeródromos, A y B, separados 1.200 NM. Velocidad verdadera de 400 kt hacia cualquiera de los dos, para simplificar.

**Sin viento.** El ETP está en el punto medio: a 600 NM de cada uno. Tiempo a cada uno desde ahí: 600 ÷ 400 = 1,5 h.

**Viento de 50 kt de cola hacia B, es decir, de frente hacia A.** Hacia B la velocidad respecto al suelo es 450 kt; hacia A, 350 kt. El ETP es el punto donde la distancia a A dividida por 350 iguala la distancia a B dividida por 450. Como la suma de las dos distancias es 1.200 NM, el ETP queda a **525 NM de A** y a **675 NM de B**: 525 ÷ 350 = 1,5 h y 675 ÷ 450 = 1,5 h. El ETP se ha movido **75 NM hacia A**, el aeródromo al que se llega con viento de frente.

**El mismo viento pero de cola hacia A.** Por simetría, el ETP queda a 675 NM de A y a 525 NM de B: 75 NM hacia B.

Con 50 kt sobre 400 kt, el ETP se mueve 75 millas: más de la distancia que un avión recorre en diez minutos. Con vientos de corriente en chorro mayores, el desplazamiento es mayor. Y como el viento del escenario de despresurización, a nivel bajo, es distinto del de crucero, el ETP de ese escenario queda en otro sitio que el de falla de motor.

Lo que hay que llevarse no es el cálculo, sino la dirección y el orden de magnitud: el ETP se va hacia donde el viento estorba, y se va mucho.

### En pocas palabras

- 1.200 NM, 400 kt, 50 kt de viento: el ETP se mueve 75 NM hacia el aeródromo con viento de frente.
- La dirección: hacia donde el viento estorba.
- El orden de magnitud: decenas de millas, más con corriente en chorro.

---

## 67. EJEMPLO · UN ALTERNO SE DETERIORA

**ID:** E67 · **Tiempo:** 6 min

### Concepto

En vuelo, dentro del segmento, entre BRAVO y CHARLIE del ejemplo del capítulo 65. El despacho envía el TAF actualizado de CHARLIE: el TEMPO a 500 ft que estaba al final de la ventana ahora ocupa toda la ventana, y hay un PROB40 de 300 ft. BRAVO sigue CAVOK.

### Lo que debe saber el piloto

Lo que la tripulación evalúa, en el orden de la matriz del capítulo 43:

- **Falla**: ninguna. Avión sano, todos los sistemas significativos operativos, ningún reloj corriendo.
- **Combustible**: real por encima del requerido en el último ETP, con margen.
- **Meteorología**: CHARLIE, por debajo de los mínimos de planificación de su única aproximación en toda la ventana; ¿por debajo de los de utilización? Depende de la aproximación y de los mínimos del operador; el PROB40 de 300 ft sugiere que puede estarlo parte del tiempo. BRAVO, CAVOK.
- **Alternos**: dos. BRAVO, detrás, utilizable. CHARLIE, delante, dudoso. DELTA, más adelante, fuera del alcance en este tramo.
- **Estado del avión**: sano.
- **Tiempo**: el avión está antes del ETP 2. BRAVO es todavía el más cercano en tiempo. Al pasar el ETP 2, el más cercano pasará a ser CHARLIE, el dudoso.
- **Terreno**: océano; sin problema.
- **Pasajeros**: sin novedad.

Las opciones, con lo anterior:

1. **Continuar vigilando**: el avión está sano y la probabilidad de necesitar CHARLIE en las próximas horas es baja; pero si la necesita después del ETP 2, la entrada es dudosa. Aceptable si el operador lo permite, con la vigilancia reforzada y el despacho buscando información.
2. **Pedir al despacho un alterno sustituto**: ¿hay algún otro aeródromo adecuado dentro del tiempo máximo que cubra el tramo entre el ETP 2 y la salida? Si lo hay, se enmienda el plan (RAC 121, 121.2625 (f)) y se sigue con cobertura.
3. **Retrasar la decisión hasta el ETP 2**: mientras BRAVO sea el más cercano, la protección está intacta; el ETP 2 es el punto donde deja de estarlo. Es el último momento razonable para decidir con BRAVO todavía como opción.
4. **Desviarse a BRAVO** antes del ETP 2: la opción conservadora si no hay sustituto y el manual del operador no admite seguir con un alterno por debajo de mínimos de utilización.

Lo que este ejemplo enseña: la regla «alterno bajo mínimos, desviación inmediata» no aparece por ningún lado; lo que aparece es una evaluación con el ETP 2 como plazo natural y el despacho como fuente de la opción 2.

### En pocas palabras

- Alterno delante dudoso, alterno detrás bueno, avión sano, antes del ETP.
- Cuatro opciones: vigilar, sustituto, decidir en el ETP, desviarse antes.
- El ETP es el plazo; el despacho es la fuente del sustituto.
- No hay regla automática; hay evaluación y manual.

---

## 68. EJEMPLO · APU DIFERIDA

**ID:** E68 · **Tiempo:** 5 min

### Concepto

Antes de la salida del vuelo ALFA–DELTA, la APU queda inoperativa y se difiere por MEL. Pregunta: ¿podemos hacer EDTO?

### Lo que debe saber el piloto

La respuesta correcta es **no asumir**. Ni que sí ni que no. Lo que se verifica:

| Qué | Dónde |
|---|---|
| La entrada MEL de la APU, columna de observaciones: ¿restricción EDTO? ¿«Not EDTO capable»? ¿«EDTO limited to … minutes»? | MEL del avión |
| La configuración del avión: ¿con qué fuentes eléctricas y neumáticas cuenta el escenario de desviación sin la APU? | FCOM y manual de operaciones |
| La aprobación EDTO del operador: ¿condiciona la APU operativa para esta flota o para este tiempo máximo? | Especificaciones de operación |
| La ruta: si la MEL reduce el tiempo máximo, ¿siguen cabiendo BRAVO y CHARLIE? Si no, ¿hay otra ruta dentro del umbral? | Plan de vuelo, despacho |
| Los sistemas requeridos: ¿la APU es fuente de reserva para algún sistema con límite de tiempo o significativo en el escenario de falla de motor o de generador? | MEL, FCOM |
| El combustible: el plan contaba con el consumo de la APU como fuente de energía en la desviación (RAC 121, 121.2581 (b)(5) vi); sin APU, el escenario cambia y el plan se recalcula | Despacho |
| Las restricciones específicas: cualquier procedimiento (O) o (M) asociado, y cualquier restricción por combinación con otros ítems abiertos | MEL |

Las salidas posibles: EDTO sin cambios, si la MEL y la aprobación lo permiten; EDTO con tiempo máximo reducido y ruta o alternos revisados; o no EDTO, con otra ruta dentro del umbral, otro avión o cancelación. Cuál, lo dice la MEL de ese avión y ese operador. Nadie sale a comprobarlo en vuelo.

### En pocas palabras

- «¿Podemos hacer EDTO con la APU diferida?»: no lo asumo; lo verifico.
- Siete cosas: MEL, configuración, aprobación, ruta, sistemas requeridos, combustible, restricciones.
- Tres salidas: sin cambios, restringido, no EDTO.

---

## 69. EJEMPLO · FALLA DE MOTOR ANTES DEL ETP

**ID:** E69 · **Tiempo:** 6 min

### Concepto

Vuelo ALFA–DELTA, entre BRAVO y CHARLIE, antes del ETP 2. Falla un motor. La regla simplista que hay que descartar: «antes del ETP regreso, después del ETP continúo».

### Lo que debe saber el piloto

El ETP 2 de falla de motor dice que, desde la posición actual, BRAVO está más cerca en tiempo que CHARLIE. Eso es todo lo que dice. Lo que decide a dónde ir:

- **La falla.** Parada limpia con el otro motor sano y sin daño: hay margen para comparar. Con daño, vibración o incendio: el reloj manda y se va al utilizable más cercano, que el ETP indica que es BRAVO.
- **Los aeródromos.** BRAVO, CAVOK, dos aproximaciones. CHARLIE, dudoso. Hoy, BRAVO gana también en utilizable, no solo en cercano.
- **La meteorología en ruta.** A la altitud de drift down, hacia BRAVO: sin fenómenos. Hacia CHARLIE: engelamiento pronosticado.
- **El combustible.** Sobra hacia BRAVO; hacia CHARLIE, justo con el engelamiento.
- **El tiempo.** BRAVO, más cercano en tiempo por definición de ETP.
- **Las circunstancias.** Con un bimotor y un motor inoperativo, la FAA obliga a aterrizar en el utilizable más cercano en tiempo (121.565 (a)); en este caso, BRAVO cumple todo.

Conclusión de hoy: BRAVO. Pero la conclusión sale de los seis factores, no de estar «antes del ETP». Si BRAVO estuviera cerrado por NOTAM y CHARLIE CAVOK, estar antes del ETP no obligaría a nadie a ir a un aeródromo cerrado.

### En pocas palabras

- El ETP dice cuál está más cerca en tiempo; no dice a dónde ir.
- Falla, aeródromos, meteorología, combustible, tiempo, circunstancias: eso decide.
- Hoy, BRAVO, por los seis factores; otro día, con BRAVO cerrado, no.

---

## 70. EJEMPLO · FALLA DE MOTOR DESPUÉS DEL ETP

**ID:** E70 · **Tiempo:** 5 min

### Concepto

El mismo vuelo, pero la falla ocurre después del ETP 2. La regla simplista simétrica: «después del ETP hay que continuar a CHARLIE». Tampoco.

### Lo que debe saber el piloto

El ETP 2 dice ahora que CHARLIE está más cerca en tiempo que BRAVO. Y CHARLIE es el alterno dudoso del ejemplo. Lo que decide:

- **La falla.** Si es un incendio, CHARLIE, el más cercano, con lo que tenga: el tiempo manda. Si es una parada limpia, hay margen para pensar.
- **Los aeródromos.** CHARLIE, con una aproximación y un TEMPO por debajo de los mínimos de planificación; ¿por debajo de los de utilización en la hora de llegada? Si sí, no es utilizable y el «más cercano utilizable» es otro. BRAVO, más lejos en tiempo pero CAVOK.
- **El combustible.** ¿Alcanza a BRAVO con el escenario de falla de motor desde aquí, con viento de frente ahora? El plan garantizó el combustible hasta el alterno más cercano desde el punto crítico; volver al de atrás con viento de frente puede no estar cubierto. Es la comprobación decisiva.
- **La meteorología en ruta**, a la altitud de drift down, en las dos direcciones.
- **El tiempo**, y con él el sistema con límite de tiempo, si alguno está en juego.

Las salidas: CHARLIE, si es utilizable en la hora de llegada, que es lo que la FAA exige para un bimotor; BRAVO, si CHARLIE no es utilizable y el combustible alcanza; o seguir hacia DELTA solo si está dentro de las mismas condiciones que cualquier otro candidato, lo que en este tramo no ocurre. Lo que no existe es una regla que diga «después del ETP, adelante».

### En pocas palabras

- Después del ETP, CHARLIE está más cerca en tiempo; si no es utilizable, no es el destino.
- El combustible hacia atrás con viento de frente es la comprobación decisiva.
- El ETP es herramienta de planificación y conciencia situacional; no sustituye el juicio operacional.

---

## 71. EL ETP NO DECIDE POR EL PILOTO

**ID:** E71 · **Tiempo:** 4 min

### Concepto

Un principio explícito de Aviatory, después de los dos ejemplos anteriores: **el ETP informa; no decide**. La tripulación considera la situación completa.

### Lo que debe saber el piloto

Lo que el ETP aporta: cuál de dos aeródromos está más cerca en tiempo bajo las condiciones del cálculo. Es información valiosa y hay que tenerla siempre presente.

Lo que el ETP no aporta: si ese aeródromo es utilizable ahora, si el combustible alcanza al otro, qué falló, cuánto tiempo hay, qué hay entre el avión y cada aeródromo, qué dice el manual del operador. Todo eso está alrededor del ETP y pesa tanto o más.

La decisión es del comandante, con la situación completa, con el despacho y con el ATC. El RAC 121 lo deja escrito en la definición de alterno EDTO; el 14 CFR 121.565 lo escribe como «utilizable más cercano en tiempo en el que pueda hacerse un aterrizaje seguro»; ninguno dice «el que indique el ETP».

### En pocas palabras

- El ETP informa cuál está más cerca en tiempo.
- No decide: la meteorología, el combustible, la falla, el aeródromo, el tiempo, el terreno y el estado de los sistemas rodean la decisión.
- La decisión es del comandante.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Composición radial. En el centro, un círculo rotulado «ETP · informa cuál está más cerca en tiempo». Alrededor, en órbita, siete etiquetas: WEATHER, FUEL, FAILURE, AIRPORT, TIME, TERRAIN, SYSTEM STATUS. Todas con una flecha que apunta hacia abajo, a un recuadro en la base rotulado «COMMAND DECISION». El ETP también apunta ahí, con una flecha del mismo grosor que las demás, no mayor. Código: ED-25.

OBJETIVO:
Evitar el error conceptual de utilizar el ETP como regla automática de desviación: es una entrada más de la decisión, no la decisión.

---

# BLOQUE 13 · CIERRE

---

## 72. ERRORES FRECUENTES EN ENTREVISTAS

**ID:** E72 · **Tiempo:** 9 min

### Concepto

Quince afirmaciones que se oyen en entrevistas y que están mal. Cada una, corregida con precisión y con su referencia.

### Lo que debe saber el piloto

**1. «ETOPS significa que un avión bimotor puede volar sobre el océano.»**
No. ETOPS/EDTO es tiempo de desviación a un aeródromo alterno en ruta por encima del umbral, en cualquier geografía (Anexo 6, 4.7.2.1; RAC 121, 121.001). Un cruce oceánico corto con aeródromos a menos del umbral no es EDTO; una ruta continental remota puede serlo.

**2. «ETOPS solo aplica a aviones de dos motores.»**
Históricamente sí; hoy no. EDTO aplica a aviones «con dos o más motores de turbina» (Anexo 6; RAC 121, 121.2581 (b)(1), con umbral de 180 minutos para tres o más). La FAA aplica ETOPS a aviones de pasajeros con más de dos motores más allá de 180 minutos (121.161).

**3. «ETOPS 180 significa que el avión puede estar 180 minutos sin un motor.»**
No. Es el tiempo máximo de desviación aprobado al operador, calculado en ISA y aire en calma a la velocidad de crucero con un motor inoperativo (Anexo 6, 4.7.2.2; FAA, 121.7). Es una regla de planificación, no una autonomía.

**4. «ETP es el punto medio entre dos aeropuertos.»**
No. Es el punto de igual **tiempo**; con viento, se desplaza hacia el aeródromo al que se llega con viento de frente. Con 50 kt sobre 400 kt, 75 NM de desplazamiento (capítulo 66).

**5. «Antes del ETP regreso y después del ETP continúo.»**
No. El ETP dice cuál está más cerca en tiempo; la decisión depende de la falla, los aeródromos, la meteorología, el combustible, el tiempo y las circunstancias (capítulos 69 a 71). Para un bimotor con un motor inoperativo, la FAA exige el utilizable más cercano en tiempo (121.565), que no siempre coincide con el lado del ETP.

**6. «ETP y critical point son lo mismo.»**
No por definición. El punto crítico es donde el combustible de la desviación con la falla más limitante es más exigente (Anexo 6, definición de combustible crítico); a menudo coincide con un ETP, pero es otro concepto (capítulos 20 y 21).

**7. «ETP y PNR son lo mismo.»**
No. El PNR es el último punto desde el que la aeronave puede ir tanto al destino como a un alterno en ruta disponible (RAC 121, 121.001): combustible y alcance. El ETP es tiempo igual a dos aeródromos.

**8. «Un aeropuerto adequate siempre es suitable.»**
No. Adecuado es el aeródromo (pista, performance, servicios, aproximación); utilizable es el aeródromo en un momento dado (meteorología, pista, NOTAM, horario). Todo utilizable es adecuado; no al revés (capítulos 9 y 10).

**9. «Si el alterno está por debajo de planning minima hay que desviarse inmediatamente.»**
No. Los mínimos de planificación son para despachar y para entrar (FAA, 121.624; RAC 121, 121.2625 (c)); dentro del segmento se evalúa la situación completa con el manual del operador (capítulo 40). Ninguna autoridad escribe esa regla.

**10. «Si la aeronave es dispatchable, automáticamente es ETOPS capable.»**
No. La MEL puede dejar el avión despachable y no capaz de EDTO, o restringido a un tiempo menor; se lee en la entrada (capítulo 32).

**11. «Un MEL no afecta ETOPS.»**
Falso en dos sentidos: puede quitar la capacidad o reducir el tiempo máximo, y puede subir los mínimos de aproximación en los alternos, que el AC 120-42B obliga a considerar (nota 3 de su tabla).

**12. «ETOPS fuel es simplemente más contingency fuel.»**
No. Es combustible **adicional** para el escenario crítico (Anexo 6, 4.7.2.4 y 4.3.6.3 f); RAC 121, 121.2581 (b)(5)), con tres fallas y cinco correcciones, y puede ser el limitante del vuelo (capítulo 24).

**13. «Si falla un motor siempre voy al aeropuerto geográficamente más cercano.»**
No. Al **utilizable** más cercano **en tiempo** en el que pueda hacerse un aterrizaje seguro (FAA, 121.565 (a)). Geográficamente más cercano y utilizable en tiempo no son lo mismo (capítulo 42).

**14. «ETOPS significa únicamente 120 o 180 minutos.»**
No. La escalera de la FAA va de 75 a más de 240 minutos, según área, avión y operador (AC 120-42B, numeral 402); cada autoridad tiene la suya (capítulo 5).

**15. «EDTO es simplemente el nuevo nombre de ETOPS sin ninguna diferencia.»**
No. EDTO es el término OACI desde la Enmienda 36 y cubre aviones de dos o más motores, con exigencias distintas para los de más de dos (Doc 10085, prólogo). ETOPS es el término histórico y el de la FAA, que hoy lo lee como *Extended Operations*. Mismo concepto, marcos distintos (sección de terminología).

### En pocas palabras

- Quince errores; ninguno sobrevive a la definición correcta con su referencia.
- Los más peligrosos son los que convierten el ETP en regla automática y los que confunden adecuado con utilizable.
- En entrevista, corregir el error con precisión vale más que evitarlo.

---

## 73. LO QUE UN PILOTO DE AEROLÍNEA DEBE MEMORIZAR, COMPRENDER Y CONSULTAR

**ID:** E73 · **Tiempo:** 8 min

### Concepto

Treinta y dos conceptos, divididos en tres cajones: lo que hay que saber de memoria, lo que hay que entender y lo que hay que ir a buscar al documento correcto. Confundir los cajones es un error en sí mismo: memorizar un tiempo de sistema que es del avión, o «consultar» qué es un ETP.

### DEBE MEMORIZAR

1. **ETOPS**: término histórico y de la FAA; originalmente *Extended Range Twin-engine Operations*, hoy *Extended Operations* para la FAA.
2. **EDTO**: *Extended Diversion Time Operations*, término OACI y del RAC 121, para aviones con dos o más motores de turbina.
3. **Tiempo umbral**: fijado por el Estado; 60 minutos para bimotores y 180 para tres o más motores en Colombia (RAC 121, 121.2581 (b)(1)) y en Estados Unidos (121.161).
4. **Cómo se calcula el tiempo de desviación**: ISA, aire en calma, velocidad con un motor inoperativo (bimotores) o con todos (más de dos).
5. **Tiempo máximo de desviación**: el aprobado al operador por combinación avión-motor.
6. **Punto de entrada EDTO**: primer punto de la ruta a más del umbral de un alterno en ruta.
7. **Punto de salida EDTO**: el punto donde la ruta vuelve a estar a menos del umbral.
8. **Aeródromo adecuado**: pista, performance, servicios y aproximación; un juicio sobre el aeródromo.
9. **Aeródromo utilizable**: adecuado más las condiciones del momento; todo utilizable es adecuado, no al revés.
10. **Los cuatro alternos**: de despegue, en ruta, en ruta para EDTO, de destino.
11. **Mínimos de planificación frente a mínimos de utilización**: los primeros para despachar y entrar, con incrementos; los segundos para aterrizar y para seguir más allá de la entrada.
12. **ETP**: punto de igual tiempo a dos aeródromos bajo las condiciones del cálculo; se desplaza hacia el aeródromo con viento de frente.
13. **Punto crítico**: donde el combustible de la desviación con la falla más limitante es más exigente.
14. **PNR**: último punto desde el que se puede ir tanto al destino como a un alterno; combustible y alcance.
15. **Los tres escenarios de combustible crítico**: despresurización; despresurización y falla de motor; falla de motor; se lleva el mayor.
16. **Las cinco correcciones**: 5 % de viento, engelamiento, 5 % de deterioro, 15 minutos de espera a 1.500 ft más aproximación y aterrizaje, APU.
17. **Sistema con límite de tiempo**: el alterno no puede estar más allá del tiempo del sistema más limitante menos 15 minutos.
18. **Regla del bimotor con un motor inoperativo**: aterrizar en el utilizable más cercano en tiempo en el que pueda hacerse un aterrizaje seguro (FAA, 121.565).
19. **Lo que no justifica ir más lejos**: combustible de sobra, comodidad de los pasajeros, mantenimiento (AC 120-42B).

### DEBE COMPRENDER

20. **Por qué existe EDTO**: *preclude and protect*; cuanto más lejos del aeródromo, más importa planificar qué hacer si algo falla.
21. **Por qué el umbral y el tiempo máximo son dos líneas distintas** y qué función tiene cada una.
22. **Cómo los alternos construyen el área de operación** y qué pasa cuando uno cae.
23. **Por qué la despresurización puede ser más limitante que la falla de motor**: el oxígeno fija la altitud, la altitud fija el consumo.
24. **Por qué cada escenario tiene su propio ETP**: velocidad, altitud y viento distintos.
25. **Por qué el ETP informa y no decide**: falla, aeródromos, meteorología, combustible, tiempo y circunstancias rodean la decisión.
26. **Cómo la MEL puede dejar un avión despachable y no capaz de EDTO**, y por qué se lee en la entrada y no se deduce.
27. **Por qué la APU es el caso típico de «depende»** y qué se verifica.
28. **Cómo se vigila el combustible dentro del segmento**: real contra previsto y contra requerido, en cada ETP y en el punto crítico.
29. **Cómo se reevalúa un alterno que cae, antes y después de la entrada**, y por qué no hay regla automática.
30. **Cómo se decide una desviación**: la naturaleza de la falla primero, después los doce factores.

### DEBE CONSULTAR EN OFP / MEL / QRH / SOP

31. **Cifras del avión**: tiempo de los sistemas con límite de tiempo, perfil de despresurización y oxígeno, techo con un motor inoperativo, velocidad de crucero con un motor inoperativo aprobada; en el AFM, el FCOM y el documento de configuración.
32. **Cifras del operador**: tiempo máximo aprobado por flota, incrementos de mínimos de planificación, margen de la ventana de uso, medios de comunicación exigidos, lista de verificación de entrada, tolerancias de combustible; en las especificaciones de operación y el manual de operaciones. Y en cada vuelo: los alternos, los ETP, el punto crítico y el combustible requerido, en el plan operacional de vuelo.

### En pocas palabras

- Diecinueve cosas de memoria, once para comprender, dos cajones para consultar.
- Lo que es del avión y del operador nunca se memoriza como si fuera de la norma.
- En entrevista, decir de qué cajón sale cada cifra es la señal de que se ha entendido.

---
## 74. PREGUNTAS TÍPICAS DE ENTREVISTA DE AEROLÍNEA

**ID:** E74 · **Tiempo:** 25 min

### Concepto

Treinta preguntas como las que aparecen en una entrevista técnica, en inglés porque así se hacen en buena parte de los procesos. Cada una con una respuesta corta que se pueda decir en voz alta, la explicación completa y un consejo para la entrevista.

---

**p-01** · What does ETOPS mean?

SHORT ANSWER: Historically, Extended Range Twin-engine Operations; today the FAA reads it as Extended Operations. It refers to flights where part of the route is beyond a threshold diversion time from an adequate airport.

DETAILED EXPLANATION: El término nació en 1985 para bimotores. Desde la regla de la FAA de 2007 cubre también aviones de pasajeros con más de dos motores más allá de 180 minutos (14 CFR 121.161). Lo que define ETOPS no es la geografía sino el tiempo de desviación.

AIRLINE INTERVIEW TIP: Di las dos lecturas del acrónimo y remata con «it's about diversion time to an adequate airport, not about water». Eso demuestra que sabes qué es y de dónde viene.

---

**p-02** · What does EDTO mean?

SHORT ANSWER: Extended Diversion Time Operations: the ICAO term, since Annex 6 Amendment 36, for any operation by an aeroplane with two or more turbine engines where the diversion time to an en-route alternate exceeds the threshold time set by the State.

DETAILED EXPLANATION: Es la definición del Anexo 6 (4.7.2.1, nota 1) y del RAC 121 (121.001). El cambio de nombre buscó reflejar que las normas ya no son solo para bimotores (Doc 10085, prólogo).

AIRLINE INTERVIEW TIP: Cita «two or more turbine engines»: es la palabra que separa EDTO de la idea vieja de ETOPS.

---

**p-03** · What is the difference between ETOPS and EDTO?

SHORT ANSWER: Same concept, different frameworks. EDTO is the ICAO and Colombian term and covers aircraft with two or more engines; ETOPS is the historical and FAA term. Annex 6 explicitly allows the use of ETOPS as long as the EDTO concepts are embodied.

DETAILED EXPLANATION: Anexo 6, 4.7.2.3, nota 1: «EDTO puede denominarse ETOPS en algunos documentos». El Doc 10085 explica que el cambio no obliga a los Estados a renombrar sus normas. Para aviones de más de dos motores, EDTO añade sistemas con límite de tiempo y política de alternos, sin certificación ni mantenimiento adicionales.

AIRLINE INTERVIEW TIP: No digas «son exactamente lo mismo» ni «no tienen nada que ver». Di «mismo concepto, marcos distintos, y EDTO cubre más de dos motores».

---

**p-04** · What is threshold time?

SHORT ANSWER: The range, in time, set by the State of the Operator to an en-route alternate, beyond which an EDTO specific approval is required. In Colombia and the US it is 60 minutes for two-engine aeroplanes and 180 for three or more, calculated in ISA still air at the one-engine-inoperative cruise speed for twins.

DETAILED EXPLANATION: Definición del Anexo 6; cifras del RAC 121, 121.2581 (b)(1), y del 14 CFR 121.161. El Estado fija el número; la OACI orienta en el Doc 10085.

AIRLINE INTERVIEW TIP: Di siempre «set by the State» antes del número. Y añade la regla de cálculo: ISA, still air, OEI speed.

---

**p-05** · What is maximum diversion time?

SHORT ANSWER: The maximum allowable range, in time, from a point on the route to an en-route alternate, granted by the State to the operator for each aeroplane-engine combination. It defines the area of operation.

DETAILED EXPLANATION: Anexo 6, definición y 4.7.2.2; RAC 121, 121.2581 (b)(3); FAA, 121.7. Es distinto del umbral: el umbral dice dónde empieza EDTO; el máximo, hasta dónde puede estar la ruta.

AIRLINE INTERVIEW TIP: Contrástalo con el umbral sin que te lo pidan: «threshold is where EDTO starts; maximum diversion time is how far I'm allowed to be».

---

**p-06** · What is an EDTO en-route alternate?

SHORT ANSWER: An adequate aerodrome, listed in the operator's manual and designated in the operational flight plan, for use in the event of a diversion during the EDTO segment. It must be within the maximum diversion time and meet EDTO planning minima and RFFS requirements.

DETAILED EXPLANATION: Definición del RAC 121, 121.001, y del 14 CFR 121.7. El RAC añade que la definición «de ninguna manera limita la autoridad del piloto al mando durante el vuelo».

AIRLINE INTERVIEW TIP: Menciona esa frase del RAC: es a dónde se planificó ir, no a dónde hay que ir pase lo que pase.

---

**p-07** · What is the difference between an adequate and a suitable airport?

SHORT ANSWER: Adequate is a property of the airport: runway, performance, services, an approach. Suitable is the airport at a given time: weather, runway condition, NOTAM, hours. Every suitable airport is adequate; not every adequate airport is suitable.

DETAILED EXPLANATION: Adecuado según RAC 121, 121.001, y 14 CFR 121.7 / AC 120-42B. Utilizable según el uso del 121.565 y los factores del AC 120-42B, numeral 303.

AIRLINE INTERVIEW TIP: La frase «every suitable is adequate, not every adequate is suitable» es la que el entrevistador quiere oír. Dila entera.

---

**p-08** · What is an Equal Time Point?

SHORT ANSWER: A point on the route from which the flight time to two reference airports is the same, under the conditions used for the calculation: speed, altitude, wind and failure scenario.

DETAILED EXPLANATION: Es una herramienta de planificación y conciencia situacional. Hay uno por escenario, y el plan los lista con hora y combustible previstos.

AIRLINE INTERVIEW TIP: Termina con «under the conditions used for the calculation»: anticipa la siguiente pregunta sobre el viento.

---

**p-09** · Is the ETP always halfway between two airports?

SHORT ANSWER: No. Only with no wind and the same speed both ways. Wind shifts it towards the airport you would reach flying into a headwind.

DETAILED EXPLANATION: Con 1.200 NM, 400 kt y 50 kt de viento, el ETP se mueve 75 NM (capítulo 66). Con corriente en chorro, mucho más.

AIRLINE INTERVIEW TIP: Da la dirección del desplazamiento con confianza: «towards the headwind side». Es lo que separa saberlo de haberlo oído.

---

**p-10** · How does wind affect an ETP?

SHORT ANSWER: It moves the ETP towards the airport you would reach against the wind, because you need to be closer to it to take the same time. And since each failure scenario flies at a different altitude with a different wind, each has its own ETP.

DETAILED EXPLANATION: Capítulos 17 a 19. El viento del escenario de despresurización, a nivel bajo, puede ser distinto del de crucero.

AIRLINE INTERVIEW TIP: Añade lo de los escenarios: demuestra que sabes que no hay «un» ETP.

---

**p-11** · What is the difference between an ETP and a critical point?

SHORT ANSWER: The ETP is about time: equal time to two airports. The critical point is about fuel: the point on the route where reaching the alternate with the most limiting failure requires the most fuel. They often coincide, but not by definition.

DETAILED EXPLANATION: Definición de combustible crítico del Anexo 6 y del RAC 121: «en el punto más crítico de la ruta». El AC 120-42B relaciona ambos sin fundirlos.

AIRLINE INTERVIEW TIP: «Time versus fuel» es el resumen que se recuerda.

---

**p-12** · What is the difference between an ETP and a PNR?

SHORT ANSWER: The ETP compares times to two airports. The PNR is the last point from which the aircraft can still proceed either to the destination or to an available en-route alternate: it is about fuel and range, not equal time.

DETAILED EXPLANATION: Definición de punto de no retorno del RAC 121, 121.001. En un plan EDTO bien hecho, los alternos en ruta evitan quedar más allá de un PNR.

AIRLINE INTERVIEW TIP: Si el entrevistador insiste en que son lo mismo, mantente: «one is time, the other is range».

---

**p-13** · Does crossing the ETP determine which airport you must divert to?

SHORT ANSWER: No. The ETP tells me which airport is closer in time under the calculated conditions. Where I divert depends on the nature of the failure, airport suitability, weather, fuel, time and terrain. For a twin with an engine inoperative, the rule is the nearest suitable airport in point of time where a safe landing can be made.

DETAILED EXPLANATION: Capítulos 69 a 71; FAA, 121.565 (a). El ETP informa; no decide.

AIRLINE INTERVIEW TIP: Esta es la pregunta trampa del módulo. Responde «no» sin dudar y explica por qué.

---

**p-14** · What is EDTO critical fuel?

SHORT ANSWER: The fuel needed to fly to an en-route alternate considering, at the most critical point of the route, the most limiting system failure. The greatest of three scenarios —depressurization, depressurization plus engine failure, engine failure— plus corrections for wind, icing, engine deterioration, holding, approach and landing, and APU.

DETAILED EXPLANATION: Definición del Anexo 6 y del RAC 121; escenario detallado en RAC 121, 121.2581 (b)(5), y en 14 CFR 121.646 (b), con los mismos porcentajes.

AIRLINE INTERVIEW TIP: Enumera los tres escenarios y las cinco correcciones. Es lo que más impresiona en esta pregunta.

---

**p-15** · Why is depressurization important in EDTO planning?

SHORT ANSWER: Because it forces a descent to an altitude dictated by the oxygen available, where fuel burn per mile is much higher. With all engines running, it can still be the most fuel-limiting scenario.

DETAILED EXPLANATION: Capítulos 26 y 31. El RAC 121 exige que el descenso cumpla los requisitos de oxígeno de los numerales 121.925 y 121.930.

AIRLINE INTERVIEW TIP: La frase «oxygen sets the altitude, altitude sets the burn» resume el concepto.

---

**p-16** · Why is an engine failure important?

SHORT ANSWER: Because it means drift down to the one-engine-inoperative cruise altitude, lower speed, higher fuel burn, and a long diversion. For a twin, the regulation requires landing at the nearest suitable airport in point of time.

DETAILED EXPLANATION: Capítulos 27 y 28; FAA, 121.565 (a). El escenario C del combustible crítico existe para este caso.

AIRLINE INTERVIEW TIP: Menciona el terreno: «and the drift-down altitude has to clear the terrain on the diversion route».

---

**p-17** · What is a time-limited system?

SHORT ANSWER: A system whose capability runs out after a set time, such as cargo fire suppression. The regulation requires that no EDTO alternate be farther than the most limiting system time minus 15 minutes.

DETAILED EXPLANATION: RAC 121, 121.2581 (b)(3); FAA, 121.633. El tiempo del sistema es del avión; los 15 minutos son de la norma.

AIRLINE INTERVIEW TIP: Di «minus 15 minutes» y di que el tiempo del sistema está en el AFM: muestras que distingues norma de avión.

---

**p-18** · How can MEL affect EDTO capability?

SHORT ANSWER: An aircraft can be dispatchable and still be not EDTO capable, or EDTO restricted to a shorter diversion time. The MEL entry says so, and it can also raise approach minima at the alternates. You never assume; you read the entry.

DETAILED EXPLANATION: Capítulo 32; AC 120-42B, nota 3 de la tabla de mínimos.

AIRLINE INTERVIEW TIP: Los tres estados —dispatchable, not EDTO capable, EDTO restricted— son la respuesta estructurada.

---

**p-19** · Can an aircraft be dispatchable but not EDTO capable?

SHORT ANSWER: Yes. Dispatch and EDTO capability are read in different places of the same MEL entry. A deferred item may allow dispatch and remove or restrict EDTO.

DETAILED EXPLANATION: Capítulos 32 y 33. Perder EDTO en tierra puede cambiar la ruta, el combustible, la carga o el vuelo.

AIRLINE INTERVIEW TIP: Pon el ejemplo de la APU y di qué verificarías.

---

**p-20** · What factors should be considered when selecting an EDTO alternate?

SHORT ANSWER: Runway and performance, approach capability, weather in the window of use against planning minima, NOTAM, navigation aids, RFFS category, terrain, MEL impact, runway condition and operational restrictions.

DETAILED EXPLANATION: Capítulo 12; RFFS según 14 CFR 121.106: categoría 4 hasta 180 minutos, categoría 7 dentro del tiempo autorizado más allá.

AIRLINE INTERVIEW TIP: No te vendas como despachador: di «I'm not the dispatcher, but I need to recognise these in the package before I accept the release».

---

**p-21** · What would you do if an EDTO alternate deteriorates during flight?

SHORT ANSWER: Evaluate, not react. Where am I relative to the ETP; which alternates remain and are they suitable; does my fuel cover the critical scenario to them; how much and for how long has the weather deteriorated; is the aircraft healthy; how long until I leave the affected segment; and what does my operator's manual say. Then continue, add a substitute alternate through dispatch, or divert.

DETAILED EXPLANATION: Capítulos 39, 40 y 67. Antes de la entrada, la norma exige reevaluar (Anexo 6, 4.7.2.5; FAA, 121.631 (c); RAC 121, 121.2625 (e)); dentro, es evaluación operacional con el manual.

AIRLINE INTERVIEW TIP: Distingue «before entry» de «after entry»: es lo que separa una respuesta buena de una excelente.

---

**p-22** · What should you check before entering an EDTO segment?

SHORT ANSWER: Aircraft and MEL status, fuel against plan and against the critical scenario, alternates still suitable with weather at or above operating minima in the window of use, NOTAM, critical systems, communications, navigation, and a clear answer to «if something fails now, where do I go». And coordinate with dispatch.

DETAILED EXPLANATION: Capítulo 53; RAC 121, 121.2625 (e) y (g); FAA, 121.631 (c).

AIRLINE INTERVIEW TIP: Cierra con «and I follow my operator's checklist; this is the mental model».

---

**p-23** · How does drift down affect EDTO?

SHORT ANSWER: It sets the altitude for the engine-failure scenario, and therefore its fuel burn and wind. And the drift-down altitude must clear the terrain on the diversion route, which can rule out the geographically nearest alternate.

DETAILED EXPLANATION: Capítulo 28. Sobre el océano rara vez es problema; sobre terreno alto, decide el alterno.

AIRLINE INTERVIEW TIP: «Can I reach the selected alternate in the resulting conditions?» es la pregunta que el entrevistador quiere que formules.

---

**p-24** · Why can cargo fire suppression limit maximum diversion time?

SHORT ANSWER: Because it suppresses the fire for a certified time, and if the alternate is farther than that time minus 15 minutes, the aircraft may not make it. So no EDTO alternate may be listed beyond that limit.

DETAILED EXPLANATION: RAC 121, 121.2581 (b)(3), que lo nombra expresamente; FAA, 121.633. Capítulos 29, 30 y 47.

AIRLINE INTERVIEW TIP: «Time available versus time to divert» es todo lo que hace falta decir del sistema.

---

**p-25** · What would you consider following an engine failure in an EDTO sector?

SHORT ANSWER: Fly the aircraft and complete the QRH; assess the engine and remaining systems; drift down and check terrain; fuel to the nearest suitable alternate at that altitude and wind; suitability and weather of the candidates; ATC; the diversion decision, which for a twin is the nearest suitable airport in point of time; and dispatch.

DETAILED EXPLANATION: Capítulo 44; FAA, 121.565.

AIRLINE INTERVIEW TIP: Di los diez pasos en orden y sin prisa. Es la pregunta que más pesa.

---

**p-26** · What is the difference between planning minima and landing minima for an EDTO alternate?

SHORT ANSWER: Planning minima are the approach minima plus increments, used at dispatch and up to the entry point because the forecast is uncertain. Landing or operating minima are the approach minima themselves, used to decide whether a landing can be made and, under FAA and Colombian rules, to continue beyond the entry point.

DETAILED EXPLANATION: FAA, 121.624 y 121.631 (c); RAC 121, 121.2625 (c) y (e); AC 120-42B, numeral 303, con su tabla.

AIRLINE INTERVIEW TIP: Si te preguntan cifras, da las del AC 120-42B y di que las del operador están en su manual.

---

**p-27** · What are the RFFS requirements for an ETOPS alternate?

SHORT ANSWER: Under FAA rules, ICAO category 4 or higher for ETOPS up to 180 minutes; beyond 180, category 4 at the alternate and the aircraft must remain within the authorized diversion time of an adequate airport with category 7. A 30-minute augmentation from local assets is acceptable.

DETAILED EXPLANATION: 14 CFR 121.106; AC 120-42B, numeral 303. En Colombia, el RFFS queda fuera de la definición de aeródromo adecuado y se exige aparte.

AIRLINE INTERVIEW TIP: Etiqueta la fuente: «under the FAA rule». No la presentes como universal.

---

**p-28** · What communications does EDTO require?

SHORT ANSWER: Under RAC 121, voice communications wherever available, assessed for the diversion routes and altitudes; and for EDTO beyond 180 minutes, a second system with immediate satellite voice of landline quality between crew and ATS and crew and operator.

DETAILED EXPLANATION: RAC 121, 121.2581 (b)(7) y (b)(8). El AC 120-42B considera SATCOM el mejor medio salvo al norte de 82°.

AIRLINE INTERVIEW TIP: La frase «for the diversion routes and altitudes, not just cruise» muestra comprensión operacional.

---

**p-29** · Is an oceanic flight always ETOPS?

SHORT ANSWER: No. Oceanic describes where you fly; ETOPS describes how far in time you are from an adequate airport. A short oceanic crossing with adequate airports within the threshold at all times is not EDTO, and a remote continental route can be.

DETAILED EXPLANATION: Capítulos 1 y 62.

AIRLINE INTERVIEW TIP: Da los dos contraejemplos: el oceánico corto y el continental remoto.

---

**p-30** · What does EDTO mean for aircraft with more than two engines?

SHORT ANSWER: Under ICAO, EDTO applies to them too, with a threshold of 180 minutes in Colombia and the US, but with only a few additional operational requirements: time-limited systems and a policy for selecting and monitoring en-route alternates. No additional certification or maintenance requirements.

DETAILED EXPLANATION: Doc 10085, prólogo; RAC 121, 121.2581 (b)(1)(ii); FAA, 121.161 y Apéndice P, sección II.

AIRLINE INTERVIEW TIP: Es la pregunta que descubre a quien solo estudió «ETOPS de bimotores». Ten la respuesta lista.

---

### En pocas palabras

- Treinta preguntas; las que más pesan son la 13, la 14, la 21, la 25 y la 30.
- Respuesta corta primero, siempre; la explicación, si te la piden.
- Etiqueta la fuente cuando des una cifra: OACI, FAA, RAC 121 o «my operator's manual».

---

## 75. MINI SIMULADOR EDTO

**ID:** E75 · **Tiempo:** 30 min

### Concepto

Quince escenarios para razonar, con el formato fijo del módulo. No hay respuestas de una palabra: hay un razonamiento correcto y una referencia. Todos usan el vuelo ficticio ALFA–DELTA del capítulo 65 salvo que se diga otra cosa.

---

**sim-01 · Engine failure before ETP**

SITUATION: Crucero FL370, parada limpia de un motor, sin daño ni incendio.
CURRENT POSITION: Entre BRAVO y CHARLIE, 25 minutos antes del ETP 2.
EDTO STATUS: Dentro del segmento, aprobación de 180 minutos.
AIRCRAFT STATUS: Un motor inoperativo, resto de sistemas normales.
FUEL: Por encima del requerido en el último ETP.
ALTERNATES: BRAVO detrás, CAVOK, dos aproximaciones. CHARLIE delante, techo 800 ft con TEMPO 500 ft.
WEATHER: Engelamiento pronosticado a la altitud de drift down hacia CHARLIE; nada hacia BRAVO.
MEL: Sin ítems.
ATC: HF con la estación oceánica; CPDLC conectado.
QUESTION: ¿A dónde, y por qué?
WHAT SHOULD THE PILOT CONSIDER? Volar el avión y el QRH; el estado del motor; el drift down y el terreno (océano); combustible a BRAVO y a CHARLIE a esa altitud; utilizabilidad de cada uno; el ETP, que indica BRAVO más cercano en tiempo; la regla del bimotor.
CORRECT REASONING: BRAVO. No por estar «antes del ETP», sino porque es el utilizable más cercano en tiempo (lo dice el ETP), está CAVOK con dos aproximaciones, el combustible sobra y no hay engelamiento en esa ruta. La regla del 121.565 exige el utilizable más cercano en tiempo en un bimotor con un motor inoperativo, y BRAVO lo es por todos los criterios. Declarar, descender, desviarse, reportar la parada, coordinar con el despacho.
REFERENCE: FAA 14 CFR 121.565 (a) y (c); capítulos 44 y 69.

---

**sim-02 · Engine failure after ETP**

SITUATION: La misma parada limpia.
CURRENT POSITION: 20 minutos después del ETP 2.
EDTO STATUS: Dentro del segmento.
AIRCRAFT STATUS: Un motor inoperativo, resto normal.
FUEL: Por encima del requerido en el ETP 2; el plan cubre CHARLIE desde aquí con el escenario de falla de motor.
ALTERNATES: CHARLIE delante, ahora más cercano en tiempo; BRAVO detrás, con viento de frente para volver.
WEATHER: CHARLIE con TEMPO 500 ft; a la hora estimada de llegada, el TAF indica condiciones por encima de los mínimos de utilización de su aproximación la mayor parte del tiempo. BRAVO CAVOK.
MEL: Sin ítems.
ATC: HF y CPDLC.
QUESTION: ¿CHARLIE porque «ya pasé el ETP»?
WHAT SHOULD THE PILOT CONSIDER? Si CHARLIE es utilizable a la hora de llegada con un motor inoperativo; si el combustible alcanza a BRAVO con viento de frente y el escenario de falla de motor; qué dice el TEMPO en la ventana de llegada; el manual del operador.
CORRECT REASONING: CHARLIE si es utilizable a la hora de llegada, que es lo que exige la regla del utilizable más cercano en tiempo; y hay que comprobarlo contra los mínimos de utilización de su aproximación en esa ventana, no contra los de planificación. Si el TEMPO dejara la aproximación por debajo de mínimos de utilización a la llegada, CHARLIE no sería utilizable y la alternativa es BRAVO, siempre que el combustible con viento de frente lo cubra: esa es la comprobación decisiva, porque el plan garantizó el combustible al alterno más cercano, no al de atrás contra el viento. La posición respecto del ETP informa; no decide.
REFERENCE: FAA 14 CFR 121.565 (a); capítulo 70.

---

**sim-03 · Depressurization**

SITUATION: FL390, aviso de altitud de cabina, despresurización confirmada.
CURRENT POSITION: En el punto crítico, entre BRAVO y CHARLIE.
EDTO STATUS: Dentro del segmento.
AIRCRAFT STATUS: Todos los motores; presurización perdida.
FUEL: El del plan en el punto crítico, que hoy está calculado para este escenario.
ALTERNATES: BRAVO y CHARLIE, a tiempos parecidos a nivel bajo según el ETP de despresurización.
WEATHER: BRAVO CAVOK; CHARLIE 800 ft con TEMPO.
MEL: Sin ítems.
ATC: Sin contacto VHF; HF disponible.
QUESTION: ¿Qué hace la tripulación y qué mira?
WHAT SHOULD THE PILOT CONSIDER? Control y máscaras; QRH; descenso de emergencia; nivel de crucero según el oxígeno; consumo a ese nivel; ETP de despresurización, no el de crucero; predicción de combustible a cada alterno a ese nivel; utilizabilidad; ATC por el medio que funcione a esa altitud.
CORRECT REASONING: Primero el avión y el oxígeno; después el descenso al nivel que el QRH y el oxígeno permitan. Estabilizados, el ETP de despresurización indica cuál está más cerca en tiempo a nivel bajo; el combustible del plan en el punto crítico fue calculado para este escenario hacia el alterno más exigente, así que alcanza. Con dos alternos a tiempos parecidos, BRAVO por CAVOK y dos aproximaciones. Declarar la emergencia por HF, coordinar el nivel y la desviación, informar al despacho.
REFERENCE: RAC 121, 121.2581 (b)(5) i (A); capítulos 26 y 45.

---

**sim-04 · Cargo fire**

SITUATION: Aviso de incendio en bodega delantera; el QRH activa la supresión.
CURRENT POSITION: 40 minutos después del ETP 2.
EDTO STATUS: Dentro del segmento.
AIRCRAFT STATUS: Supresión activada; reloj corriendo.
FUEL: Sobra.
ALTERNATES: CHARLIE, el más cercano en tiempo. BRAVO más lejos.
WEATHER: CHARLIE 800 ft, por encima de los mínimos de utilización de su aproximación en este momento.
MEL: Sin ítems.
ATC: HF.
QUESTION: ¿CHARLIE con una sola aproximación y techo justo, o BRAVO con CAVOK?
WHAT SHOULD THE PILOT CONSIDER? El tiempo de supresión disponible del avión; el tiempo a CHARLIE con el viento real; que CHARLIE sea utilizable ahora; nada más.
CORRECT REASONING: CHARLIE, sin comparaciones de comodidad. Con un incendio, el tiempo hasta aterrizar manda; la planificación garantizó que todos los alternos estaban dentro del tiempo de supresión menos 15 minutos, y ese margen existe para este momento. CHARLIE es utilizable ahora, así que es el utilizable más cercano en tiempo. Declarar MAYDAY, descender y desviarse sin perder un minuto, preparar la aproximación en ruta.
REFERENCE: RAC 121, 121.2581 (b)(3); FAA 14 CFR 121.633; capítulos 30 y 47.

---

**sim-05 · APU MEL**

SITUATION: Antes de la salida en ALFA, la APU inoperativa se difiere.
CURRENT POSITION: En tierra.
EDTO STATUS: Vuelo planificado con segmento EDTO de 180 minutos.
AIRCRAFT STATUS: APU inoperativa, resto normal.
FUEL: El plan contaba con el consumo de la APU como fuente en la desviación.
ALTERNATES: BRAVO y CHARLIE.
WEATHER: Sin novedad.
MEL: APU diferida.
ATC: No aplica.
QUESTION: ¿Podemos hacer EDTO?
WHAT SHOULD THE PILOT CONSIDER? La entrada MEL de la APU y su restricción EDTO; la configuración eléctrica y neumática sin APU en el escenario de desviación; la aprobación del operador; si la ruta sigue cabiendo con un tiempo máximo reducido; los sistemas que la APU respalda; el combustible recalculado sin APU; los procedimientos (O) y las restricciones por combinación.
CORRECT REASONING: No se asume. Se lee la entrada MEL: si dice «not EDTO capable», el vuelo no sale por esta ruta; si dice «EDTO limited to X minutes», el despacho revisa si BRAVO y CHARLIE caben; si no dice nada, se comprueba la aprobación y la configuración. En todos los casos, el despacho recalcula el combustible porque el plan contaba con la APU. La respuesta correcta en entrevista es la lista de verificaciones, no un sí o un no.
REFERENCE: RAC 121, 121.2581 (b)(5) vi; capítulos 32, 33 y 68.

---

**sim-06 · Alternate weather deterioration**

SITUATION: El despacho envía el TAF actualizado de CHARLIE: techo por debajo de los mínimos de planificación en toda la ventana, PROB40 de 300 ft.
CURRENT POSITION: 30 minutos antes del ETP 2.
EDTO STATUS: Dentro del segmento.
AIRCRAFT STATUS: Normal.
FUEL: Por encima del requerido.
ALTERNATES: BRAVO detrás, CAVOK. CHARLIE delante, dudoso.
WEATHER: La descrita.
MEL: Sin ítems.
ATC: CPDLC.
QUESTION: ¿Desviarse ya a BRAVO?
WHAT SHOULD THE PILOT CONSIDER? La matriz completa: falla (ninguna), combustible (bien), meteorología (CHARLIE dudoso, BRAVO bueno), alternos (dos, uno dudoso), avión (sano), tiempo (ETP 2 en 30 minutos), terreno (océano), pasajeros (nada). Y el manual del operador.
CORRECT REASONING: No hay regla de desviación automática por un alterno bajo mínimos de planificación. Con el avión sano y BRAVO todavía más cercano en tiempo, la protección está intacta hasta el ETP 2. Se pide al despacho un alterno sustituto dentro del tiempo máximo para el tramo ETP 2–salida; si lo hay, se enmienda el plan y se sigue; si no lo hay y el manual no admite continuar con un alterno por debajo de mínimos de utilización, el ETP 2 es el plazo para decidir volver a BRAVO. Se decide antes del ETP 2, no después.
REFERENCE: RAC 121, 121.2625 (f); capítulos 40, 43 y 67.

---

**sim-07 · Alternate runway closure**

SITUATION: NOTAM nuevo: única pista de BRAVO cerrada por obras durante las próximas seis horas.
CURRENT POSITION: 40 minutos antes del punto de entrada EDTO.
EDTO STATUS: Todavía fuera del segmento.
AIRCRAFT STATUS: Normal.
FUEL: El del plan.
ALTERNATES: BRAVO (ahora cerrado), CHARLIE.
WEATHER: CHARLIE 800 ft con TEMPO al final de la ventana.
MEL: Sin ítems.
ATC: VHF todavía.
QUESTION: ¿Se puede entrar al segmento?
WHAT SHOULD THE PILOT CONSIDER? Qué tramo sostenía BRAVO; si ALFA (como alterno en ruta a efectos EDTO) y CHARLIE cubren el segmento entero dentro del tiempo máximo; el combustible con el escenario crítico hacia el alterno sustituto; la coordinación con el despacho antes de la entrada; la modificación de ruta si no hay cobertura.
CORRECT REASONING: No se entra sin resolverlo. La norma exige que, antes del punto de entrada, todos los alternos dentro del tiempo máximo estén revisados y la tripulación informada; y el RAC 121 permite enmendar el despacho para añadir un alterno dentro del tiempo máximo. Si con ALFA y CHARLIE el segmento queda cubierto y el combustible alcanza con el escenario crítico hacia el más lejano, se enmienda el plan y se entra. Si queda un tramo sin cobertura, se modifica la ruta para no entrar en él, se espera si el cierre es corto y hay combustible, o se desvía antes de la entrada. Nunca «a ver qué pasa».
REFERENCE: Anexo 6, 4.7.2.5; FAA 14 CFR 121.631 (c); RAC 121, 121.2625 (e), (f) y (g); capítulos 16 y 39.

---

**sim-08 · Significant headwind change**

SITUATION: El FMS muestra un viento de frente 60 kt mayor que el del plan, sostenido.
CURRENT POSITION: Entre el ETP 1 y el ETP 2.
EDTO STATUS: Dentro del segmento.
AIRCRAFT STATUS: Normal.
FUEL: Al pasar el ETP 1, ligeramente por debajo del previsto; todavía por encima del requerido.
ALTERNATES: BRAVO y CHARLIE, sin novedad.
WEATHER: Sin novedad salvo el viento.
MEL: Sin ítems.
ATC: HF y CPDLC.
QUESTION: ¿Qué cambia y qué hace la tripulación?
WHAT SHOULD THE PILOT CONSIDER? Que los ETP calculados con el viento del plan ya no describen el vuelo: con más viento de frente hacia el este, el ETP real se ha movido hacia el este; que el combustible de desviación hacia CHARLIE es mayor que el previsto; que el déficit sobre el previsto puede crecer; que el despacho puede recalcular.
CORRECT REASONING: Pedir al despacho un recálculo de ETP y de combustible crítico con el viento real; comparar en el ETP 2 el combustible real con el requerido recalculado; si el margen se estrecha, considerar un cambio de nivel o velocidad para recuperarlo, o un redespacho hacia un alterno que exija menos. Un cambio significativo de viento no es una emergencia; es una señal de que el plan hay que actualizarlo antes de que el margen desaparezca.
REFERENCE: Capítulos 18 y 25.

---

**sim-09 · Fuel lower than planned**

SITUATION: Al pasar el punto crítico, el combustible real está por debajo del requerido para el escenario crítico desde ese punto.
CURRENT POSITION: Punto crítico, entre BRAVO y CHARLIE.
EDTO STATUS: Dentro del segmento.
AIRCRAFT STATUS: Normal.
FUEL: Real por debajo del requerido para el escenario crítico; por encima de lo necesario para el destino con alterno y reserva.
ALTERNATES: BRAVO detrás, CHARLIE delante.
WEATHER: Sin novedad.
MEL: Sin ítems.
ATC: HF y CPDLC.
QUESTION: ¿Es una emergencia? ¿Qué se hace?
WHAT SHOULD THE PILOT CONSIDER? Que el vuelo ya no cumple la condición con la que se despachó: la protección del escenario crítico no existe en este punto; que el vuelo normal sigue cubierto; que las opciones son recuperar margen, redespachar hacia un alterno menos exigente, o desviarse; y el manual del operador.
CORRECT REASONING: No es una emergencia mientras no falle nada, pero es una situación que hay que resolver ya, porque si falla algo ahora el combustible no cubre el escenario que la norma quiso proteger. Se habla con el despacho: ¿un cambio de nivel o velocidad recupera el margen? ¿Hay un alterno EDTO más cercano que exija menos? Si ninguna de las dos, la opción conservadora es desviarse mientras hay dos alternos alcanzables. La norma no fija la tolerancia; el manual del operador sí puede.
REFERENCE: Capítulos 21, 24 y 25.

---

**sim-10 · Loss of RVSM**

SITUATION: Falla del sistema automático de control de altitud; no hay capacidad RVSM.
CURRENT POSITION: Dentro del segmento, entre el ETP 2 y el ETP 3.
EDTO STATUS: Dentro del segmento.
AIRCRAFT STATUS: Sin control automático de altitud; resto normal.
FUEL: El del plan.
ALTERNATES: CHARLIE y DELTA.
WEATHER: Sin novedad.
MEL: Sin ítems al despegar.
ATC: HF y CPDLC.
QUESTION: ¿Qué le hace a EDTO?
WHAT SHOULD THE PILOT CONSIDER? La contingencia RVSM: comunicar «unable RVSM due equipment» y salir del espacio RVSM, normalmente descendiendo; el consumo a nivel inferior; los ETP calculados a nivel de crucero ya no valen; si el sistema que falló es además significativo para EDTO según la MEL o el QRH.
CORRECT REASONING: Dos contingencias, una gestión. Primero la RVSM, con su fraseología y su descenso. Después, la lectura EDTO: a nivel inferior el consumo sube y la predicción cambia; se pide al despacho un recálculo de ETP y combustible crítico al nuevo nivel; y se comprueba en el QRH y la MEL si el sistema perdido afecta a la capacidad EDTO. Con combustible suficiente y sin afectación EDTO, se continúa a nivel inferior con la vigilancia reforzada; si afecta, se aplica el capítulo 40.
REFERENCE: Capítulo 60; módulo RVSM.

---

**sim-11 · PBN degradation**

SITUATION: Pérdida de la capacidad de navegación que la ruta oceánica exige.
CURRENT POSITION: 30 minutos antes del punto de entrada.
EDTO STATUS: Fuera del segmento todavía.
AIRCRAFT STATUS: Navegación degradada; resto normal.
FUEL: El del plan.
ALTERNATES: BRAVO y CHARLIE. La única aproximación de CHARLIE es RNP.
WEATHER: Sin novedad.
MEL: Sin ítems al despegar.
ATC: VHF todavía.
QUESTION: ¿Se puede entrar?
WHAT SHOULD THE PILOT CONSIDER? Si la ruta puede volarse con la capacidad que queda, o hay que cambiar de ruta o nivel; si CHARLIE sigue siendo utilizable sin su aproximación RNP; si sin CHARLIE el segmento queda cubierto; el combustible con el nuevo escenario; la coordinación con el despacho antes de la entrada.
CORRECT REASONING: Sin la aproximación RNP, CHARLIE deja de tener entrada utilizable para este avión hoy: no es alterno EDTO válido. Con ALFA y BRAVO solamente, hay que comprobar si el segmento queda cubierto dentro del tiempo máximo; si no, no se entra: se cambia la ruta para quedarse dentro del umbral, o se desvía. Y aparte, la propia ruta oceánica puede exigir una capacidad que ya no hay, lo que obliga a otra ruta de todos modos. Todo antes del punto de entrada, con el despacho.
REFERENCE: RAC 121, 121.2625 (e) y (g); capítulos 37 y 59.

---

**sim-12 · Communications degradation**

SITUATION: El SATCOM deja de funcionar.
CURRENT POSITION: Dentro del segmento, antes del ETP 2.
EDTO STATUS: Dentro; aprobación de 180 minutos.
AIRCRAFT STATUS: SATCOM inoperativo; HF operativo; CPDLC operativo.
FUEL: El del plan.
ALTERNATES: BRAVO y CHARLIE.
WEATHER: Sin novedad.
MEL: Sin ítems al despegar.
ATC: HF y CPDLC.
QUESTION: ¿Qué cambia?
WHAT SHOULD THE PILOT CONSIDER? Qué medios exige su aprobación EDTO: para 180 minutos, el RAC 121 exige voz donde esté disponible, y para más de 180, un segundo sistema satelital; qué medio tendría a la altitud y por la ruta de desviación; si el SATCOM inoperativo es un ítem con consecuencia EDTO según la MEL; que el despacho sigue alcanzable por CPDLC o HF.
CORRECT REASONING: Con 180 minutos de aprobación, HF de voz operativo y CPDLC, la exigencia de voz donde esté disponible se sigue cumpliendo por HF; el segundo sistema satelital es obligatorio solo por encima de 180 minutos. Lo que hay que comprobar es que el HF cubre las rutas y altitudes de desvío —a nivel bajo, más lejos de la estación— y que la MEL no asocia el SATCOM a una restricción EDTO en esta flota. Se informa al despacho por CPDLC y se continúa con la vigilancia reforzada de las comunicaciones. Si la aprobación fuera de más de 180 minutos, la pérdida del sistema satelital sería una degradación que la norma exige tener resuelta, y el capítulo 40 aplicaría.
REFERENCE: RAC 121, 121.2581 (b)(7) y (b)(8); capítulos 36 y 61.

---

**sim-13 · Multiple MEL items**

SITUATION: Antes de la salida: un generador diferido y un ítem de detección de incendio de bodega diferido, cada uno permitido por la MEL sin restricción EDTO individual.
CURRENT POSITION: En tierra.
EDTO STATUS: Vuelo planificado con segmento EDTO.
AIRCRAFT STATUS: Dos ítems abiertos.
FUEL: El del plan.
ALTERNATES: BRAVO y CHARLIE.
WEATHER: Sin novedad.
MEL: Los dos ítems.
ATC: No aplica.
QUESTION: ¿Se acepta el vuelo?
WHAT SHOULD THE PILOT CONSIDER? Que dos ítems aceptables por separado pueden modificar la redundancia que el escenario de desviación asume; si la MEL o el manual tienen restricciones por combinación; si alguno de los dos es un sistema significativo; si la combinación reduce el tiempo máximo o afecta a un sistema con límite de tiempo; y preguntar a mantenimiento y al despacho.
CORRECT REASONING: No se acepta sin comprobar la combinación. Se buscan en la MEL las restricciones por combinación y en el manual las del operador; se pregunta a mantenimiento si la combinación afecta a la redundancia eléctrica del escenario de falla de motor y a la protección de incendio de bodega que el sistema con límite de tiempo presupone. Si hay restricción, el despacho rehace el plan; si no la hay y las tres fuentes lo confirman, se acepta con los procedimientos (O) cumplidos. La respuesta «cada uno está permitido, luego el vuelo está permitido» es el error que este escenario busca.
REFERENCE: Capítulos 32, 35 y 57; módulo MEL.

---

**sim-14 · Medical diversion**

SITUATION: Un pasajero con síntomas de infarto; la tripulación de cabina y el servicio médico en tierra recomiendan aterrizar cuanto antes.
CURRENT POSITION: Entre el ETP 2 y el ETP 3.
EDTO STATUS: Dentro del segmento.
AIRCRAFT STATUS: Normal.
FUEL: El del plan, con margen.
ALTERNATES: CHARLIE, el más cercano en tiempo, isla sin hospital con capacidad cardiológica. DELTA, el destino, 70 minutos más lejos, con hospital.
WEATHER: CHARLIE 800 ft; DELTA CAVOK.
MEL: Sin ítems.
ATC: HF y CPDLC.
QUESTION: ¿CHARLIE o DELTA?
WHAT SHOULD THE PILOT CONSIDER? Que el avión está sano y los alternos son los del escenario normal; que el criterio es el tiempo hasta atención médica adecuada, no el tiempo hasta aterrizar; la capacidad médica de cada aeródromo, que la conocen el despacho y el servicio médico; que el aeródromo elegido tiene que ser utilizable y el combustible cubrir la desviación; el viento; la pista.
CORRECT REASONING: Se decide con el servicio médico y el despacho, no solo con el reloj: si CHARLIE puede estabilizar y evacuar al paciente, puede ser mejor aunque no tenga hospital; si no puede hacer nada, aterrizar allí no ayuda y DELTA, 70 minutos más lejos pero con hospital, es el destino correcto, siempre que el estado del paciente lo admita según el criterio médico. Ambos son utilizables; el combustible alcanza; lo que decide es dónde recibe atención antes. Es una decisión del comandante con información que otros tienen.
REFERENCE: Capítulo 48.

---

**sim-15 · Time-limited system consideration**

SITUATION: En el briefing, el plan muestra a CHARLIE a un tiempo de desviación desde el ETP 2 que, con el viento del día, queda a pocos minutos del tiempo del sistema de supresión de incendio de carga de la flota menos 15 minutos.
CURRENT POSITION: En tierra, briefing.
EDTO STATUS: Vuelo planificado con aprobación de 180 minutos.
AIRCRAFT STATUS: Normal.
FUEL: El del plan.
ALTERNATES: BRAVO y CHARLIE.
WEATHER: Viento de frente hacia CHARLIE más fuerte de lo habitual.
MEL: Sin ítems.
ATC: No aplica.
QUESTION: ¿Está bien el plan?
WHAT SHOULD THE PILOT CONSIDER? Cuál es la regla aplicable: hasta 180 minutos, la comparación con el sistema se hace a la velocidad con un motor inoperativo en ISA y aire en calma, no con el viento del día; que el AC 120-42B pide además que los requisitos de sistemas con límite de tiempo se cumplan en los puntos de igual tiempo; que el tiempo real con viento puede superar al de planificación mientras el vuelo esté dentro del área aprobada y cumpla el 121.633; y si el margen real es el que su operador considera aceptable.
CORRECT REASONING: Legalmente, para 180 minutos, el criterio es en aire en calma y CHARLIE cabe. Operacionalmente, la tripulación debe saber que, con el viento de hoy, el tiempo real a CHARLIE en un incendio estará cerca del límite del sistema: es exactamente el dato que hay que tener en la cabeza en el segmento entre el ETP 2 y la salida. La respuesta correcta es aceptar el plan si cumple la norma y el manual, nombrar la preocupación en el briefing, y vigilar el viento real; si el margen se estrecha en vuelo, hablar con el despacho de un alterno alternativo. Por encima de 180 minutos, la regla cambia y el viento sí entra en el cálculo.
REFERENCE: RAC 121, 121.2581 (b)(3); FAA 14 CFR 121.633; AC 120-42B, numerales 205 y 303; capítulos 29 y 30.

---

### En pocas palabras

- Quince escenarios; ninguno se resuelve con una regla automática.
- El orden de siempre: volar, identificar, consultar, concluir, comunicar, coordinar.
- La referencia de cada uno es la que hay que poder citar en la entrevista.

---

# ANEXO A · HUECOS DE IMAGEN

Los veinticinco huecos del módulo, en orden de aparición, con el capítulo al que pertenecen. Cuatro son imágenes anotadas.

| # | Código | Capítulo | Qué muestra | Anotada |
|---|---|---|---|---|
| 1 | ED-01 | Terminología | Línea de tiempo ETOPS → EDTO: 1985, 2007, 2012 | |
| 2 | ED-02 | E01 | Dos rutas: continental remota con EDTO y oceánica corta sin EDTO | |
| 3 | ED-03 | E03 | Círculo de umbral alrededor de un aeródromo: non-EDTO, threshold, EDTO segment | |
| 4 | ED-04 | E04 | Dos círculos concéntricos: tiempo umbral y tiempo máximo de desviación | |
| 5 | ED-05 | E06 | Área de operación con tres alternos, y el hueco cuando uno cae | |
| 6 | ED-06 | E08 | Ruta con entrada, segmento, salida y regla de tiempo del vuelo | |
| 7 | ED-07 | E10 | Dos aeropuertos iguales: adequate y suitable frente a adequate y not suitable | |
| 8 | ED-08 | E11 | Los cuatro alternos sobre la ruta, con el EDTO resaltado | |
| 9 | ED-09 | E14 | Tabla de mínimos de planificación del AC 120-42B, con flechas a filas, columnas y notas | Sí |
| 10 | ED-10 | E17 | ETP desplazado del punto medio por el viento | |
| 11 | ED-11 | E18 | Tres bandas: sin viento, viento al este, viento al oeste | |
| 12 | ED-12 | E20 | Ruta con ETP, punto crítico y PNR, con sus palabras clave | |
| 13 | ED-13 | E23 | Mapa con el punto crítico y columna de bloques del combustible crítico | |
| 14 | ED-14 | E26 | Perfil vertical de despresurización: descenso, nivel bajo, alterno | |
| 15 | ED-15 | E27 | Perfil vertical de falla de motor: drift down, crucero con un motor, terreno | |
| 16 | ED-16 | E28 | Planta y perfil: alterno cercano no alcanzable por terreno, alterno lejano alcanzable | |
| 17 | ED-17 | E29 | Dos barras: tiempo máximo de desviación y endurance del sistema menos 15 minutos | |
| 18 | ED-18 | E30 | Línea de tiempo del incendio: supresión disponible frente a tiempo al alterno | |
| 19 | ED-19 | E32 | Entrada de MEL anotada: sistema, requeridos, restricción EDTO, (O) | Sí |
| 20 | ED-20 | E41 | Avión con tres aeródromos y las variables de la decisión en órbita | |
| 21 | ED-21 | E50 | Plan operacional de vuelo EDTO anotado: entrada, salida, ETP, alternos, combustible, tiempo | Sí |
| 22 | ED-22 | E52 | Pantalla de navegación con un ETP sobre la ruta y dos alternos | |
| 23 | ED-23 | E53 | Avión acercándose a la entrada con los diez elementos de verificación en arco | |
| 24 | ED-24 | E65 | Mapa completo del vuelo ALFA–DELTA con todos los puntos y círculos | Sí |
| 25 | ED-25 | E71 | El ETP en el centro y las siete variables alrededor, hacia la decisión del comandante | |

# ANEXO B · FUENTES

- **OACI, Anexo 6 al Convenio sobre Aviación Civil Internacional, Parte I, Transporte aéreo comercial internacional — Aviones**, 12.ª edición (julio de 2022), con la Enmienda 49 (28 de noviembre de 2024). Capítulo 1 (definiciones de aeródromo alterno, tiempo umbral, tiempo máximo de desviación, combustible crítico para EDTO, sistema significativo para EDTO, aeródromo aislado); numerales 4.3.5.2, 4.3.5.3, 4.3.6.3, 4.7.1.1, 4.7.2.1 a 4.7.2.7.
- **OACI, Doc 10085, Extended Diversion Time Operations (EDTO) Manual**, 1.ª edición (2017). Prólogo, para la relación entre ETOPS y EDTO y la aplicación a aviones de más de dos motores. Citado además por remisión desde las notas del Anexo 6 y del RAC 121.
- **FAA, 14 CFR Parte 121**: numerales 121.7 (definiciones), 121.106 (RFFS en alternos ETOPS), 121.161 (limitaciones de ruta), 121.374 (programa de mantenimiento ETOPS y verificación previa a la salida), 121.565 (motor inoperativo: aterrizaje y reporte), 121.624 (alternos ETOPS), 121.625 (mínimos de alterno), 121.631 (c) (continuación más allá del punto de entrada), 121.633 (sistemas con límite de tiempo), 121.646 (b) (combustible en ruta para ETOPS) y Apéndice P (aprobaciones ETOPS y operaciones polares).
- **FAA, AC 120-42B, Extended Operations (ETOPS and Polar Operations)**, 13 de junio de 2008. Apéndice 1 (definiciones, incluidos los sistemas significativos de los grupos 1 y 2), numerales 203 (preclude and protect), 205 (áreas de operación), 206 (requisitos de alternos), 303 (requisitos de operaciones de vuelo, con la tabla de mínimos de planificación, el RFFS y los factores del 121.565) y 402 (autoridades ETOPS).
- **Aerocivil, Reglamentos Aeronáuticos de Colombia, RAC 121, Requisitos de operación: operaciones domésticas e internacionales, regulares y no regulares**, versión vigente desde el 5 de agosto de 2025, con las modificaciones de las resoluciones 1910 de 2022, 954 de 2024 y 1983 de 2025. Numeral 121.001 (definiciones), 121.2581, 121.2625 y 121.2645 (c)(6). Apéndice 15, reservado.
- **SKYbrary, Extended Range Operations**, para el contexto histórico (1985, 2007, 2012); fuente secundaria, usada solo para fechas.

# ANEXO C · NOTAS DE VERIFICACIÓN (no van a la app)

- Todas las cifras de este módulo son de la norma o del AC 120-42B y llevan su referencia al lado. Ninguna cifra que dependa del avión (tiempo de sistemas con límite de tiempo, perfil de despresurización, techo con un motor inoperativo, velocidad de referencia) se ha inventado: se remiten al AFM, al FCOM y al documento de configuración.
- La tabla de mínimos de planificación reproducida en el capítulo 14 es la que el AC 120-42B (2008) recomienda para unas especificaciones de operación típicas. El propio AC advierte que las especificaciones de cada operador deben reflejar los requisitos vigentes; las cifras reales de un operador pueden diferir. El RAC 121 no publica tabla: remite a los valores del explotador aceptados por la Aerocivil.
- El Doc 10085 se consultó directamente solo en su prólogo (edición de muestra accesible). Su contenido sobre escenarios de combustible crítico, conversión de tiempos a distancias y mínimos de alternos se ha citado por remisión, a través de las notas del Anexo 6 y del RAC 121 que lo referencian, y el detalle se ha tomado de las normas FAA y Aerocivil que lo desarrollan con cifras.
- El Doc 9976 (planificación de vuelo y gestión del combustible) no se ha reproducido: el RAC 121 lo cita como orientación para los incrementos de mínimos y el margen de tiempo del alterno; el módulo lo señala como fuente a consultar.
- El Doc 4444 no se ha citado con numeral: las implicaciones ATC del módulo se limitan a la coordinación de descenso y desviación y a la declaración de emergencia con la fraseología estándar, que el módulo Comunicaciones desarrolla.
- La circular GCEP-1.0-22-040 de la Aerocivil no aparece en la biblioteca de circulares informativas del sitio de la autoridad al redactar esta versión (misma situación que la GCEP-1.0-22-033 en el módulo RVSM). Se cita como documento a consultar; no se reproduce contenido. El Apéndice 15 del RAC 121 figura como reservado desde la Resolución 954 de 2024.
- El RAC 135 no se ha verificado en esta versión; el capítulo 64 lo dice.
- Los módulos MEL y PBN, a los que el encargo pide conectar, se citan como el encargo los nombra; al redactar esta versión existen en la app los módulos Performance, Gestión del combustible, RVSM, Comunicaciones, Aeropuertos, Meteorología y NOTAM, y no existen todavía MEL ni PBN.
- El ejemplo del capítulo 66 usa cifras de ejercicio (1.200 NM, 400 kt, 50 kt) para ilustrar el desplazamiento del ETP; no son datos de ningún avión.
- La ruta ALFA–DELTA de los capítulos 65 a 71 y del simulador es ficticia. No se ha usado ninguna ruta real ni datos de operador alguno.
- EASA no se ha usado como fuente, por decisión editorial del encargo.
- Nunca se usa el signo de sección; las referencias van como «numeral».

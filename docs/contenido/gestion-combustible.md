# AVIATORY · INGRESO A AEROLÍNEA → GESTIÓN DEL COMBUSTIBLE
## Contenido completo del módulo (fuente para implementación)

**Versión:** 1.0 · 24 de septiembre de 2026 · borrador para revisión técnica
**Nivel:** piloto comercial o aspirante a aerolínea que prepara selección, entrevista técnica y entrenamiento inicial.
**Enfoque:** planificar, vigilar, predecir y decidir. Lo que un piloto necesita entender y recordar; no es un manual de despacho.
**Idioma:** español. Los términos en inglés se conservan entre paréntesis porque así aparecen en el plan operacional de vuelo (OFP), en el FMS y en la cabina.

---

## 0. FICHA DEL MÓDULO

| Campo | Valor |
|---|---|
| Ruta en la app | Ingreso a aerolínea → Gestión del combustible |
| Clave de módulo sugerida | `combustible` |
| Capítulos | 23 (C01 a C23) y cierre: principios y errores comunes |
| Imágenes | 15 huecos `[ESPACIO PARA IMAGEN]`, listados en el Anexo A |
| Tiempo estimado | 5 a 8 min por capítulo, unas 2,5 a 3 h en total |

### El marco normativo que usa este módulo

Los valores de este módulo salen de la norma, no de la costumbre. En orden de importancia para un piloto que va a volar en Colombia:

1. **RAC 121** (operación de aerolíneas). Dos secciones hacen todo el trabajo: **121.2645** (cuánto combustible se planifica) y **121.2553** (cómo se gestiona en vuelo). Es la norma que aplica tu aerolínea.
2. **RAC 91** (reglas generales para toda aeronave): 91.610 y 91.637, y la Parte 2 (91.2012 y 91.2013) para aviones grandes y turborreactores de aviación general.
3. **OACI**: Anexo 6, Parte I, y el **Doc 9976**, Manual de planificación de vuelo y gestión del combustible (FPFM). El RAC 121 sigue su estructura y sus valores, y remite al Doc 9976 como orientación.
4. **Para comparar**: EASA (Reglamento (UE) 965/2012, CAT.OP.MPA.181 y 185) y FAA (14 CFR 121.639 y 121.645; AIM 5-5-15). Sirven para ver que los valores cambian de un Estado a otro. Si vas a volar para un operador extranjero, estudia su norma.

**Regla de oro.** En tu cabina manda el **Manual de Operaciones (MO)** de tu aerolínea, aprobado por la Aerocivil (121.2553 (a); RAC 121, Apéndice 10, A9.3.18). La norma fija mínimos. El MO puede ser más conservador y decide lo que el RAC deja abierto: cada cuánto se hace un fuel check, cómo se calcula el extra, cómo se hace un redespacho. **Cuando este módulo dice «según tu operador», es porque la norma no lo fija.**

### Vocabulario: el español del RAC y el inglés del OFP

| RAC 121 (121.2645 (c)) | En el OFP y los manuales |
|---|---|
| Combustible para el rodaje | Taxi fuel |
| Combustible para el trayecto | Trip fuel |
| Combustible para contingencias | Contingency fuel |
| Combustible para los alternos de destino | Alternate fuel |
| Combustible de reserva final | Final reserve fuel (FRF) |
| Combustible adicional | Additional fuel |
| Combustible discrecional o extra | Discretionary fuel / Extra fuel |

### Cómo leer las cifras de los ejemplos

Los ejemplos numéricos son **didácticos**: no corresponden a un avión ni a un operador real. Se usa siempre el mismo vuelo de referencia para que las cifras se puedan seguir de un capítulo a otro:

| Vuelo de referencia (cifras ilustrativas) | kg |
|---|---|
| Rodaje | 200 |
| Trayecto | 3.000 |
| Contingencias | 200 |
| Alterno | 1.100 |
| Reserva final (30 min de espera, con el peso de llegada al alterno) | 1.150 |
| Adicional | 0 |
| Discrecional | 300 |
| **Block fuel** | **5.950** |
| Consumo en espera a 1.500 ft sobre el destino | 40 kg/min (2.400 kg/h) |

---

## 1. INTRODUCCIÓN A LA GESTIÓN DEL COMBUSTIBLE
**ID:** C01 · **Tiempo:** 5 min

### ¿Qué es?

La gestión del combustible es el proceso continuo de decidir cuánto combustible cargar, vigilar cómo se consume y predecir con cuánto vas a aterrizar, para tomar decisiones a tiempo. Empieza en el despacho, sigue en cada punto de la ruta y termina cuando el avión se detiene con los motores apagados.

No es un número que se calcula una vez. Es una pregunta que la tripulación se hace durante todo el vuelo: **¿con cuánto voy a aterrizar, y dónde?**

### Lo que debe saber un piloto

#### Por qué es crítica

El combustible es el único recurso del vuelo que no se puede recuperar. Una falla de sistema tiene un procedimiento; un tanque vacío no. En la mayoría de los casos que se estudian en formación de pilotos (Anexo B), el problema no fue el cálculo del despacho: fueron decisiones tardías con el combustible que quedaba y comunicaciones que no dijeron con claridad lo que pasaba.

#### Planificar no es lo mismo que gestionar

| | Planificación | Gestión en vuelo |
|---|---|---|
| Cuándo | Antes del vuelo | De la puesta en marcha al aterrizaje |
| La pregunta | ¿Cuánto cargo? | ¿Con cuánto aterrizo, y dónde? |
| Norma en Colombia | 121.2645 | 121.2553 |
| Resultado | El combustible de despacho (block fuel) | Decisiones: seguir, pedir demoras, cambiar de alterno, desviarse, declarar |

#### Tus responsabilidades como piloto

- **Firmar el despacho** con el despachador de vuelo (DV) solo si ambos creen que el vuelo se puede hacer con seguridad (121.2705). El piloto al mando (PIC) y el DV responden juntos por planificar y ejecutar el vuelo (121.2215 (c)).
- **Decidir el combustible discrecional**: es el único componente que queda a tu juicio (121.2645 (c)(7)).
- **Vigilar de forma continua** que el combustible utilizable nunca baje de lo necesario para llegar a un aeródromo donde puedas aterrizar con la reserva final intacta (121.2553 (b); 91.637 (a)).
- **Avisar a tiempo**: pedir información de demoras, declarar «combustible mínimo» o «MAYDAY COMBUSTIBLE» cuando corresponda (121.2553 (b)(1) a (3)).

### Aplicación operacional

- **Planificación y despacho:** revisas el OFP completo: componentes, alternos, meteorología, NOTAM y cualquier ítem de la lista de equipo mínimo (MEL) que aumente el consumo (121.2645 (b)(2)).
- **Briefing:** la tripulación se pone de acuerdo en pocas cifras: combustible mínimo para despegar, combustible previsto al aterrizar en destino, combustible para ir al alterno y reserva final.
- **En vuelo:** comparas lo real con lo planificado en cada punto de control y actualizas la predicción.
- **Decisiones:** el objetivo es decidir mientras todavía tienes opciones.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Esquema general del proceso de gestión del combustible desde la planificación en tierra hasta el aterrizaje: despacho y OFP, briefing, carga y verificación, fuel checks en ruta, predicción al destino y al alterno, decisión antes del descenso y aterrizaje con la reserva final intacta. Flujo horizontal con una flecha de retorno que muestre que la predicción se actualiza durante todo el vuelo. Formato horizontal, 1600 × 900 px.

OBJETIVO:
Mostrar que la gestión de combustible es un proceso continuo y no solamente un cálculo previo al vuelo.

### Ejemplo

Dos tripulaciones despegan con el mismo combustible hacia un destino con tormentas. La primera revisa su predicción al destino en cada punto de control. Cuando ve que la espera anunciada se come la contingencia, pide información de demoras temprano y se desvía con margen. La segunda solo mira el combustible total, que «todavía se ve bien», acepta dos esperas y termina en una emergencia. El avión y el despacho eran iguales: la gestión fue distinta.

### En pocas palabras

- La gestión del combustible dura todo el vuelo, no solo el despacho.
- La pregunta clave es «¿con cuánto aterrizo, y dónde?», no «¿cuánto tengo?».
- En Colombia: 121.2645 para planificar, 121.2553 para gestionar en vuelo.
- El PIC firma el despacho, decide el discrecional y vigila de forma continua la reserva final.
- Manda el MO de tu aerolínea: la norma es el piso.

---

## 2. CONCEPTOS BÁSICOS DE COMBUSTIBLE
**ID:** C02 · **Tiempo:** 7 min

### ¿Qué es?

Antes de calcular hay que hablar el mismo idioma. Los términos de este capítulo son los que verás en el OFP, en la página de combustible del FMS y en el briefing. Algunos cambian ligeramente de nombre entre fabricantes y operadores: **la definición que vale es la de tu MO y la de tu avión**.

### Lo que debe saber un piloto

#### Utilizable y no utilizable

- **Combustible utilizable (usable fuel):** el que los motores pueden consumir. **La norma se escribe en combustible utilizable**: «Todo avión llevará una cantidad de combustible utilizable suficiente para completar el vuelo planificado de manera segura» (121.2645 (a)).
- **Combustible no utilizable (unusable fuel):** el que queda en tanques y tuberías y los motores no pueden consumir. Lo fija el fabricante en la certificación y aparece en el manual de vuelo del avión (AFM). No cuenta para ningún cálculo de combustible; su peso va incluido en el peso vacío de operación.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Corte esquemático de los tanques de un bimotor de fuselaje estrecho (ala izquierda, tanque central, ala derecha) con tres niveles coloreados: combustible total, combustible utilizable y una franja inferior de combustible no utilizable junto a los puntos de succión de las bombas. Rótulos en español con el término en inglés entre paréntesis. Formato horizontal, 1600 × 900 px.

OBJETIVO:
Facilitar la comprensión de usable fuel y unusable fuel.

#### Las cantidades del vuelo

| Término | Qué es | Cómo se obtiene |
|---|---|---|
| **Combustible a bordo (FOB, fuel on board)** | Lo que hay en tanques en este momento | Indicación del sistema de cantidad |
| **Combustible de rampa (ramp fuel) / de bloque (block fuel)** | El total a bordo antes de empezar el rodaje | Lo planifica el OFP; se verifica tras la carga |
| **Combustible de despegue (takeoff fuel, TOF)** | Lo que habrá al iniciar el despegue | Block fuel menos rodaje |
| **Combustible al aterrizaje (landing fuel)** | Lo que habrá al aterrizar en destino | Combustible de despegue menos trayecto |
| **Combustible remanente (fuel remaining)** | En vuelo, sinónimo práctico del FOB | Indicación del sistema de cantidad |
| **Combustible consumido (fuel used, FU)** | Lo quemado desde la puesta en marcha | Contador de cada motor en el sistema del avión |
| **Combustible requerido (fuel required)** | El mínimo que la norma y el OFP exigen en un momento dado | Al despegue: trayecto, contingencias, alterno, reserva final y adicional (121.2645 (d)) |

**Ramp y block.** En muchos OFP son sinónimos. Algunos operadores distinguen el cargado en plataforma (ramp) del que hay al quitar calzos (block), porque el APU consume en tierra. **Usa la definición de tu operador.**

**Planificado frente a real.** El OFP da valores **planificados**; el FMS da **predicciones** (EFOB, estimated fuel on board, en cada punto y en destino) y el sistema del avión da los **reales**. Saber cuál estás mirando evita muchos errores.

#### Masa, volumen y densidad

El combustible se planifica en **masa** (kg o lb) y se carga en **volumen** (litros o galones). La conversión depende de la densidad del combustible, que el MO debe traer para peso y balance (RAC 121, Apéndice 10, A9.1.9 (h)). Un error de unidades o de densidad deja el avión con otra cantidad de la que crees tener: es exactamente lo que le pasó al vuelo de Air Canada 143 en 1983 (Anexo B).

### Aplicación operacional

- **Despacho:** compruebas que el block fuel del OFP alcanza para el combustible requerido y que el discrecional está donde lo quieres.
- **Carga y briefing:** verificas que el FOB indicado coincide con el block fuel planificado y que la carga en volumen, convertida con la densidad, cuadra con el aumento de FOB, según el procedimiento de tu operador.
- **Antes del despegue:** el combustible de despegue es el que entra en la masa de despegue (masa sin combustible más combustible de despegue).
- **En vuelo:** vigilas FOB, FU y la predicción al destino. Ninguno de los tres, solo, te da la respuesta.

### Ejemplo

Con el vuelo de referencia: block fuel 5.950 kg, rodaje 200 kg, combustible de despegue 5.750 kg, trayecto 3.000 kg, combustible previsto al aterrizaje 2.750 kg. Ese aterrizaje previsto se compone de contingencias (200), alterno (1.100), reserva final (1.150) y discrecional (300).

### En pocas palabras

- La norma cuenta combustible **utilizable**; el no utilizable no existe para el cálculo de combustible.
- Block fuel menos rodaje es igual al combustible de despegue; combustible de despegue menos trayecto es igual al combustible al aterrizaje.
- El OFP planifica, el FMS predice y los indicadores miden: no los confundas.
- Se planifica en masa y se carga en volumen: la densidad importa.
- Si un término cambia entre fabricantes, manda la definición de tu MO.

---

## 3. COMPONENTES DE LA PLANIFICACIÓN DE COMBUSTIBLE
**ID:** C03 · **Tiempo:** 8 min

### ¿Qué es?

El combustible de un vuelo de aerolínea no es un solo número: es una suma de partes, y cada parte existe para cubrir un riesgo distinto. El RAC 121 lista siete (121.2645 (c)). Conocerlas por separado es lo que te permite saber **qué parte estás consumiendo** en cada momento del vuelo.

### Lo que debe saber un piloto

#### Taxi Fuel · combustible para el rodaje

- **Qué representa:** lo que se consumirá antes del despegue, con las condiciones locales del aeródromo y el consumo del APU (121.2645 (c)(1)).
- **Cuándo se consume:** en tierra, de la puesta en marcha al despegue.
- **Ojo:** si el rodaje real es más largo (cola de despegue, cambio de pista, deshielo), el exceso sale de lo que ibas a usar en vuelo. Antes del despegue debes tener todavía el combustible requerido (121.2645 (d)).

#### Trip Fuel · combustible para el trayecto

- **Qué representa:** lo necesario para volar desde el despegue (o desde el punto de nueva planificación en vuelo) hasta aterrizar en destino, con el peso previsto, los NOTAM, la meteorología y las demoras ATS previstas (121.2645 (c)(2) y (b)(2)).
- **Cuándo se consume:** es el combustible que **se planea consumir**. Lo desarrolla el capítulo 5.

#### Contingency Fuel · combustible para contingencias

- **Qué representa:** un margen para **lo imprevisto**: diferencias con el consumo previsto, meteorología distinta a la pronosticada, demoras prolongadas y cambios de ruta o de nivel (121.2645 (c)(3), Nota).
- **Cuánto:** el 5 % del trayecto, pero **nunca menos** que 5 minutos de espera a 1.500 ft sobre el destino (121.2645 (c)(3)).
- **Cuándo se consume:** en cualquier momento después del despegue. Usarla es normal; para eso existe. Capítulo 6.

#### Alternate Fuel · combustible para el alterno de destino

- **Qué representa:** lo necesario para hacer una aproximación frustrada en destino, ascender, volar al alterno, descender, aproximar y aterrizar allí. Con dos alternos, se calcula para el que exige más (121.2645 (c)(4)).
- **Cuándo se consume:** solo si te desvías. Mientras lo conservas, conservas la opción de ir al alterno. Capítulo 7.

#### Final Reserve Fuel · combustible de reserva final

- **Qué representa:** la cantidad mínima con la que se debe aterrizar en **cualquier** aeródromo (121.2553 (b)(3), Nota 1). En turbina, 30 minutos a velocidad de espera a 1.500 ft sobre el aeródromo (121.2645 (c)(5)).
- **Cuándo se consume:** **no se planifica para consumirse.** Tocarla es una emergencia. Capítulo 8.

#### Additional Fuel · combustible adicional

- **Qué representa:** lo que haga falta, **si los componentes anteriores no alcanzan**, para una falla de motor o una despresurización en el punto más crítico de la ruta, para el combustible crítico de EDTO o para otros requisitos (121.2645 (c)(6)).
- **Cuándo se consume:** solo si ocurre esa falla. Capítulo 9.

#### Extra Fuel · combustible discrecional o extra

- **Qué representa:** lo que el PIC decide añadir (121.2645 (c)(7)).
- **Cuándo se consume:** en lo que lo necesites: esperas, desvíos, una aproximación más. Capítulos 9 y 10.

#### Las diferencias en una tabla

| Componente | Cubre | ¿Se planea consumir? | ¿Quién lo decide? |
|---|---|---|---|
| Rodaje | El tiempo en tierra | Sí | Cálculo del OFP |
| Trayecto | El vuelo previsto | Sí | Cálculo del OFP |
| Contingencias | Lo imprevisto | Puede consumirse | La norma (5 %, mínimo 5 min) |
| Alterno | Ir al alterno | Solo si te desvías | La norma |
| Reserva final | Aterrizar en cualquier aeródromo | **No** | La norma, protegida |
| Adicional | Falla en el punto crítico, EDTO | Solo si ocurre la falla | La norma, si hace falta |
| Discrecional o extra | Lo que el PIC prevé | Según la necesidad | El PIC |

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Barra vertical acumulativa, de abajo hacia arriba: reserva final (color de alerta, rotulada «protegida»), adicional, alterno, contingencias, trayecto, discrecional y rodaje, con la suma total rotulada «Block fuel». A la derecha, una llave que agrupe trayecto, contingencias, alterno, reserva final y adicional con el rótulo «combustible requerido para despegar (121.2645 (d))». Formato vertical, 900 × 1400 px.

OBJETIVO:
Visualizar la composición completa del combustible de despacho.

### Aplicación operacional

- **Planificación y despacho:** lees el OFP componente por componente, no solo el total.
- **Briefing:** identificas cuáles son tus márgenes reales: contingencias y discrecional. Gastar el alterno esperando es renunciar a él, y la reserva final no es margen.
- **En vuelo:** cuando algo consume más de lo previsto, sabes de qué parte está saliendo.
- **Decisiones:** el orden importa. Primero se consume el margen (contingencia y discrecional; cómo se reparte entre ambos lo define tu MO); después, el alterno, y eso significa renunciar a ir al alterno. La reserva final no se toca.

### Ejemplo

En el vuelo de referencia, el trayecto es 3.000 kg. El 5 % serían 150 kg, pero 5 minutos de espera a 1.500 ft cuestan 200 kg (5 × 40). Como la norma dice «en ningún caso será inferior», la contingencia es **200 kg**. En vuelos cortos, el piso de 5 minutos suele mandar sobre el 5 %.

### En pocas palabras

- Son siete componentes y cada uno cubre un riesgo distinto (121.2645 (c)).
- Contingencias: 5 % del trayecto, nunca menos de 5 min de espera a 1.500 ft sobre el destino.
- Reserva final en turbina: 30 min de espera a 1.500 ft. No se planifica para consumirla.
- El adicional solo aparece si los demás no alcanzan para una falla en el punto crítico.
- El discrecional es el único que decide el PIC.

---

## 4. BLOCK FUEL
**ID:** C04 · **Tiempo:** 5 min

### ¿Qué es?

El block fuel es el combustible total con el que el avión empieza el vuelo, antes del rodaje: la suma de todos los componentes. Es el número que se pide al proveedor, el que el despachador pone en el OFP y el que la tripulación verifica en los indicadores antes de cerrar puertas.

### Lo que debe saber un piloto

#### La fórmula conceptual

```
BLOCK FUEL =
    Rodaje (taxi)
  + Trayecto (trip)
  + Contingencias (contingency)
  + Alterno (alternate)
  + Reserva final (final reserve)
  + Adicional (additional), si se requiere
  + Discrecional o extra (discretionary / extra)
```

Es la suma de los siete componentes de 121.2645 (c). **La composición exacta depende de la norma de cada Estado y de la política de cada operador**: EASA, por ejemplo, separa el extra del discrecional, y la FAA calcula la reserva de otra manera (capítulos 6 y 8).

#### Block fuel frente a combustible requerido

- **El combustible requerido para despegar** es trayecto, contingencias, alterno, reserva final y el adicional si hace falta: «Los aviones no despegarán ni continuarán desde un punto de nueva planificación en vuelo» sin él (121.2645 (d)).
- El rodaje no cuenta en ese mínimo porque ya se quemó. El discrecional tampoco, porque no es obligatorio.
- El despacho incluye el «combustible mínimo requerido» (121.2825 (a)(7)).

**Consecuencia práctica:** si te demoras en rodaje y consumes más de lo previsto, lo que importa en la cabecera no es cuánto te falta del block fuel, sino si todavía tienes el combustible requerido para despegar.

#### En qué se basa el cálculo

El RAC pide usar primero los **datos reales de consumo de ese avión**, si el explotador tiene un programa de seguimiento, y si no, los del fabricante (121.2645 (b)(1)). Encima van las condiciones del vuelo: peso previsto, NOTAM, meteorología, restricciones y demoras ATS previstas, y el efecto de los ítems diferidos de mantenimiento o de la lista de desviación de la configuración (CDL) (121.2645 (b)(2)).

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Infografía de bloques apilados tipo «suma»: siete bloques de colores con su nombre en español e inglés y el signo «+» entre ellos, que desembocan en un bloque mayor rotulado «BLOCK FUEL». Debajo, en gris, una segunda línea que muestre «Block fuel − rodaje = combustible de despegue» y «Combustible de despegue − trayecto = combustible previsto al aterrizaje». Formato horizontal, 1600 × 900 px.

OBJETIVO:
Facilitar la memorización de los componentes.

### Aplicación operacional

- **Despacho:** verificas cada componente, no solo el total, y decides el discrecional.
- **Briefing:** dejas dicho el combustible requerido para despegar, que es la cifra que controla una demora larga en rodaje.
- **Carga:** compruebas que el FOB indicado alcanza el block fuel.
- **Antes del despegue:** si el rodaje fue largo, compruebas que el FOB sigue por encima del requerido. Si no, se regresa a plataforma o se replanifica según el MO.

### Ejemplo

| Componente | kg |
|---|---|
| Rodaje | 200 |
| Trayecto | 3.000 |
| Contingencias (el mayor entre 5 % = 150 y 5 min = 200) | 200 |
| Alterno | 1.100 |
| Reserva final | 1.150 |
| Adicional | 0 |
| Discrecional (decidido por el PIC) | 300 |
| **Block fuel** | **5.950** |
| Combustible requerido para despegar (sin rodaje ni discrecional) | 5.450 |

Si en rodaje consumes 450 kg en lugar de 200, despegas con 5.500 kg. Todavía cumples el requerido (5.450), pero ya gastaste 250 del discrecional y te quedan solo 50 kg de margen propio.

### En pocas palabras

- El block fuel es la suma de todos los componentes, antes del rodaje.
- El requerido para despegar excluye el rodaje y el discrecional (121.2645 (d)).
- El cálculo usa los datos reales del avión si existen, y si no los del fabricante (121.2645 (b)).
- Una demora en rodaje se paga con tu margen: revísalo antes de despegar.

---

## 5. TRIP FUEL
**ID:** C05 · **Tiempo:** 6 min

### ¿Qué es?

El combustible para el trayecto es el que se necesita para volar desde el despegue, o desde el punto de nueva planificación en vuelo, hasta aterrizar en el aeródromo de destino (121.2645 (c)(2)). Con el rodaje, es el componente que se planea consumir completo.

### Lo que debe saber un piloto

#### Qué incluye

Todo el perfil hasta el destino: **despegue, ascenso, crucero** (con sus cambios de nivel), **descenso, aproximación y aterrizaje**. No incluye el rodaje, que es componente aparte, ni la aproximación frustrada en destino, que está dentro del combustible para el alterno.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Perfil vertical de un vuelo de origen a destino con las fases rotuladas (rodaje en gris, fuera del trip; despegue, ascenso, crucero con un escalón de nivel, descenso, aproximación y aterrizaje dentro de una llave «Trip fuel»). Después del aterrizaje, en línea punteada, una aproximación frustrada rotulada «no es trip: va en el combustible para el alterno». Formato horizontal, 1600 × 700 px.

OBJETIVO:
Delimitar con precisión qué fases cubre el Trip Fuel y cuáles no.

#### Qué lo cambia

| Factor | Efecto sobre el trayecto |
|---|---|
| **Viento** | El de cara baja la velocidad sobre el terreno: más tiempo de vuelo y más combustible. El de cola, al revés. |
| **Temperatura** | Cambia el empuje necesario y la performance; el OFP la toma del pronóstico. |
| **Nivel de vuelo** | Lejos del nivel óptimo para tu peso, el consumo sube. Un nivel más bajo impuesto por el tránsito se paga en combustible. |
| **Ruta** | Salidas (SID) y llegadas (STAR) largas, vectores o aerovías indirectas aumentan la distancia; un directo la reduce. |
| **Peso** | Más peso, más consumo y un nivel óptimo más bajo. |
| **Performance** | Motores con desgaste, un APU que sigue encendido o ítems de MEL o CDL que aumenten el consumo (121.2645 (b)(2)(v)). |
| **Desvíos ATC** | Vectores, esperas y niveles restringidos que no estaban en el plan. |
| **Meteorología** | Desvíos por tormentas y uso de antihielo, que aumenta el consumo. |

#### Por qué el OFP puede quedarse corto

El trayecto se calcula con pronósticos de viento y temperatura, con la ruta presentada y con el peso previsto. Si cambia el viento, te dan otra ruta o el avión sale más pesado, el trayecto real cambia. **Para eso existe la contingencia**: el trayecto es la mejor estimación, no una garantía.

#### Índice de costo

El **cost index (CI)** es la relación entre el costo del tiempo y el costo del combustible. Con CI 0 el FMS vuela a la velocidad de máximo alcance, y con valores altos, más rápido y gastando más combustible (Airbus, *Getting to Grips with Fuel Economy*, 2004; Boeing AERO, 2007). El operador define el CI de cada vuelo; el trayecto del OFP se calcula con él.

### Aplicación operacional

- **Planificación:** el OFP da el trayecto y el tiempo de vuelo; revisas vientos, nivel planificado y ruta.
- **Briefing:** comentas lo que puede alargar el trayecto: una STAR larga, pista en uso distinta, tormentas en ruta.
- **En vuelo:** cada fuel check compara el consumo real contra el del trayecto planificado.
- **Decisiones:** si te imponen un nivel más bajo o una ruta más larga, pregúntate cuánto trayecto extra significa y de dónde va a salir.

### Ejemplo

El OFP del vuelo de referencia planea FL 350 con 20 kt de viento de cara. Por tránsito te dejan en FL 290 durante media hora de crucero. Ese tramo quema más de lo planificado y el exceso sale de tu margen (contingencia y discrecional). Si luego te dan un directo, recuperas parte. El fuel check es el que te dice el balance.

### En pocas palabras

- El trayecto va del despegue al aterrizaje en destino: despegue, ascenso, crucero, descenso, aproximación y aterrizaje.
- Viento, temperatura, nivel, ruta, peso, performance, ATC y meteorología lo cambian.
- Es una estimación: la contingencia cubre la diferencia.
- La aproximación frustrada en destino no está en el trayecto: está en el alterno.

---

## 6. CONTINGENCY FUEL
**ID:** C06 · **Tiempo:** 6 min

### ¿Qué es?

El combustible para contingencias compensa **factores imprevistos**: los que pueden cambiar el consumo hasta el destino respecto a lo planificado (121.2645 (c)(3), Nota). Es el primer colchón del vuelo y está hecho para usarse.

### Lo que debe saber un piloto

#### Qué situaciones cubre

La norma los nombra (121.2645 (c)(3), Nota):
- diferencias entre el consumo real y los datos de consumo previstos;
- meteorología distinta a la pronosticada;
- demoras prolongadas;
- cambios respecto a las rutas o los niveles de crucero previstos.

#### Cuánto es en Colombia

- **El 5 % del trayecto**, o del combustible requerido desde el punto de nueva planificación en vuelo, con el mismo régimen de consumo del trayecto.
- **Nunca menos** que lo necesario para volar **5 minutos a velocidad de espera a 450 m (1.500 ft) sobre el destino** en condiciones normales (121.2645 (c)(3)).
- La Aerocivil puede aprobar variaciones al operador, con una evaluación de riesgos que demuestre un nivel de seguridad equivalente: por ejemplo, un método basado en datos de un programa de control del consumo (121.2645 (e)).

#### Cómo cambia en otras normas

| Norma | Contingencia |
|---|---|
| RAC 121 (Colombia) | 5 % del trayecto, mínimo 5 min de espera a 1.500 ft sobre el destino |
| EASA, esquema básico | 5 % del trayecto o 5 min de espera a 1.500 ft sobre el destino, el mayor. Con aprobación: 3 % con un alterno en ruta designado para combustible, 20 min de vuelo o un método estadístico, sin bajar de los 5 min (AMC1 y AMC6 CAT.OP.MPA.181) |
| FAA, doméstico (121.639) | No tiene línea de contingencia: pide 45 min a consumo normal de crucero después del alterno |
| FAA, internacional con reactores (121.645) | 10 % del tiempo total de vuelo, además del alterno y de 30 min de espera a 1.500 ft |

No memorices la tabla entera: memoriza la de tu Estado y la idea de que **el valor depende de la norma y de la aprobación del operador**.

#### Contingencia frente a extra

- **La contingencia es para lo imprevisto** y la fija la norma.
- **El discrecional o extra es para lo que sí se puede prever** (tormentas pronosticadas, congestión conocida) y lo decide el PIC (121.2645 (c)(7)).
- Si ya sabes que habrá demora, no cuentes con la contingencia para cubrirla: esa demora es previsible y va en el cálculo del plan (121.2645 (b)(2)(iv)) o como extra, según tu operador.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Gráfico de líneas «combustible a bordo contra distancia» con dos curvas: la planificada del OFP y la real, que se separa hacia abajo en tres eventos marcados con íconos (desvío de ruta por tormenta, viento de cara mayor al pronosticado y nivel de vuelo más bajo por tránsito). Una banda sombreada entre ambas curvas rotulada «consumo cubierto por la contingencia». Formato horizontal, 1600 × 900 px.

OBJETIVO:
Mostrar por qué existe el combustible de contingencia.

### Aplicación operacional

- **Despacho:** verificas que la contingencia sea la mayor entre el 5 % y los 5 minutos.
- **Briefing:** si esperas demoras conocidas, no las cargues a la contingencia: pide extra.
- **En vuelo:** en cada fuel check, la pregunta es cuánto te apartas del plan, comparado con la contingencia, y a qué ritmo.
- **Decisiones:** una desviación que iguala la contingencia a mitad de ruta es una señal temprana. Todavía no es un problema, pero ya es momento de revisar opciones.

### Ejemplo

Vuelo de referencia: trayecto 3.000 kg y contingencia de 200 kg. A mitad de ruta el fuel check muestra 120 kg menos que el plan: el equivalente al 60 % de la contingencia en la mitad del vuelo. Si la tendencia sigue, llegarás unos 240 kg por debajo del plan, más que toda la contingencia: de los 500 kg de margen (contingencia y discrecional) te quedarán unos 260. Es el momento de mirar el nivel de vuelo y la situación del destino.

### En pocas palabras

- La contingencia cubre lo imprevisto: consumo, meteorología, demoras, ruta y nivel.
- En Colombia: 5 % del trayecto, nunca menos de 5 min de espera a 1.500 ft sobre el destino.
- Otras normas usan otros valores; las variaciones las aprueba la autoridad.
- Lo previsible no se cubre con contingencia: va en el plan o como extra.
- Usarla es normal; lo que importa es el ritmo al que se consume.

---

## 7. ALTERNATE FUEL
**ID:** C07 · **Tiempo:** 6 min

### ¿Qué es?

El combustible para el alterno de destino es el que te permite **no depender del destino**: si no puedes aterrizar allí, te lleva a otro aeródromo y te deja aterrizar con la reserva final intacta.

### Lo que debe saber un piloto

#### Qué incluye

El combustible para (121.2645 (c)(4)(i)):
1. hacer una **aproximación frustrada** en el destino;
2. **ascender** a la altitud de crucero prevista;
3. **volar la ruta** prevista al alterno;
4. **descender** hasta el inicio de la aproximación;
5. hacer la **aproximación y el aterrizaje** en el alterno.

Con **dos alternos**, se calcula para el que exige más combustible (121.2645 (c)(4)(ii)).

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Vista de perfil y de planta, lado a lado, del tramo destino → alterno: aproximación en el destino, frustrada en la altura de decisión, ascenso, crucero al alterno, descenso, aproximación y aterrizaje en el alterno, con cada tramo numerado del 1 al 5 igual que en el texto. Al final, un bloque rojo sobre la pista del alterno rotulado «aterriza con la reserva final intacta». Formato horizontal, 1600 × 900 px.

OBJETIVO:
Mostrar las cinco partes que componen el Alternate Fuel y que la reserva final se conserva hasta el final.

#### Relación con el aeródromo alterno

- En vuelo IFR, el explotador selecciona **al menos un alterno de destino** y lo pone en el despacho y en el plan de vuelo (121.2585 (a)).
- Se exigen **dos** cuando en el destino habrá condiciones bajo mínimos a la hora prevista o no hay información meteorológica (121.2585 (b)).
- El alterno debe estar en o sobre sus **mínimos de planificación**, que el operador fija con incrementos sobre los mínimos normales (121.2625 (c)), durante un margen de tiempo aprobado alrededor de la hora prevista de uso (121.2625 (d)).
- **En Colombia todo vuelo tiene alterno.** El RAC 121 dice: «En Colombia no se considera el concepto de aeródromo aislado. Todos los vuelos en Colombia deben contar, por lo menos, con un aeródromo alterno» (121.001, definición de aeródromo aislado, Nota).

#### ¿Y cuando no se requiere alterno?

La OACI sí permite vuelos sin alterno de destino en condiciones estrictas, y entonces cambia el combustible (Anexo 6, Parte I, 4.3.4.3.1 y 4.3.6.3 d)):
- **Sin alterno de destino**, cuando hay certeza razonable de aproximación y aterrizaje en condiciones visuales y el destino tiene pistas separadas utilizables, al menos una con aproximación por instrumentos: en lugar del alterno se lleva combustible para **15 minutos a velocidad de espera a 450 m (1.500 ft)** sobre el destino.
- **Aeródromo aislado** (destino sin ningún alterno adecuado): en turbina, **2 horas** a consumo de crucero normal sobre el destino, incluida la reserva final, y en cada vuelo se determina un **punto de no retorno** (capítulo 20).

Otras normas lo aplican con sus propias condiciones: **EASA** pide también 15 minutos y limita el vuelo sin alterno a 6 h o menos, con dos pistas separadas y umbrales de techo y visibilidad (CAT.OP.MPA.181; AMC2 CAT.OP.MPA.182); la **FAA** internacional con reactores pide **2 horas** a consumo normal de crucero (121.645 (c)).

**En el RAC 121 esos casos no existen**: los apartados están reservados (121.2645 (c)(4)(iii) y (iv)) y la norma descarta el aeródromo aislado. Si vuelas para un operador colombiano, **siempre** hay combustible para el alterno.

### Aplicación operacional

- **Despacho:** revisas qué alterno eligió el despachador, su meteorología en la ventana de uso, sus NOTAM y la distancia.
- **Briefing:** acuerdas **cuánto combustible necesitas para abandonar el destino e ir al alterno**. Esa cifra es tu línea de decisión en la llegada.
- **En vuelo:** si el alterno se deteriora, el despacho se puede enmendar en ruta para incluir otro alterno dentro del alcance del avión (121.2625 (b)(2)). Quien lo enmienda lo registra (121.2625 (i)).
- **Decisiones:** mientras conserves combustible para el alterno más la reserva final, tienes dos opciones. Cuando lo gastas esperando en destino, te quedas con una.

### Ejemplo

Vuelo de referencia: alterno 1.100 kg y reserva final 1.150 kg, en total 2.250 kg. Si la predicción al aterrizar en destino es 2.750 kg, tienes 500 kg (contingencia y discrecional, unos 12 minutos de espera a 40 kg/min) antes de tocar el combustible para el alterno. Esa es tu verdadera capacidad de espera **conservando el alterno**.

### En pocas palabras

- El alterno incluye frustrada en destino, ascenso, ruta, descenso, aproximación y aterrizaje en el alterno.
- Con dos alternos, se planifica el que exige más combustible.
- En Colombia todo vuelo tiene al menos un alterno (121.001).
- La OACI admite vuelos sin alterno (15 min de espera sobre el destino) y a aeródromos aislados (2 h en turbina); el RAC 121 no.
- Conservar combustible para el alterno es conservar una opción.

---

## 8. FINAL RESERVE FUEL
**ID:** C08 · **Tiempo:** 8 min

### ¿Qué es?

La reserva final es **la cantidad mínima de combustible con la que se debe aterrizar en cualquier aeródromo** (121.2553 (b)(3), Nota 1). No es combustible para el vuelo: es la barrera que queda cuando todo lo demás ya se usó.

### Lo que debe saber un piloto

#### Cuánto es

- **Avión de turbina:** combustible para volar **30 minutos a velocidad de espera a 450 m (1.500 ft) sobre la elevación del aeródromo**, en condiciones normales (121.2645 (c)(5)(ii)).
- **Avión de motor recíproco:** 45 minutos en las condiciones de velocidad y altitud que especifique la Aerocivil (121.2645 (c)(5)(i)).
- Se calcula con el **peso estimado a la llegada al alterno de destino** (121.2645 (c)(5)). Por eso en el OFP aparece como una cantidad fija en kg: la **reserva final prevista**. Es ese número el que vigilas en vuelo, no «media hora» en abstracto.

#### Por qué está protegida

El RAC lo dice así: «La protección del combustible de reserva final tiene por objeto garantizar un aterrizaje seguro en cualquier aeródromo cuando sucesos imprevistos pueden no permitir la realización segura de una operación con arreglo a la planificación original» (121.2553 (b), Nota).

Tres reglas la protegen:
1. **Vigilancia continua.** El PIC se asegura continuamente de que el combustible utilizable no baje de lo necesario para llegar a un aeródromo y aterrizar con la reserva final prevista intacta (121.2553 (b)).
2. **No hay variaciones.** La Aerocivil puede aprobar variaciones a rodaje, trayecto, contingencias, alterno y adicional, pero **no a la reserva final** (121.2645 (e)).
3. **Tocarla es una emergencia.** Si el combustible calculado al aterrizar en el aeródromo más cercano donde puedes aterrizar con seguridad es inferior a la reserva final prevista, se declara «MAYDAY, MAYDAY, MAYDAY, COMBUSTIBLE» (121.2553 (b)(3)).

#### Reserva final no es combustible disponible

| | Combustible para operar | Reserva final |
|---|---|---|
| Qué es | Trayecto, contingencias, discrecional y, si te desvías, alterno | El mínimo al aterrizar |
| ¿Se planea usar? | Sí | **No** |
| Si lo consumes | Pierdes margen u opciones | Estás en emergencia |

Un error común es pensar en la reserva final como «30 minutos más que tengo». No lo son: son los 30 minutos que la norma te obliga a **tener todavía** cuando las ruedas tocan la pista.

#### Qué pasa al acercarte a ella

- Las opciones se reducen a un solo aeródromo: ya no puedes ir al alterno.
- Una aproximación frustrada o una demora más pueden hacer que aterrices por debajo.
- Por eso la norma pone dos avisos **antes** de llegar ahí: pedir información de demoras y declarar «combustible mínimo» (capítulos 16 y 17).

#### Cómo cambia en otras normas

- **RAC 91, Parte 1 (aviación general, IFR):** reserva final de **45 minutos a altitud normal de crucero** (91.610 (a)(2)). Otra base de cálculo.
- **EASA:** 30 min en espera a 1.500 ft para turbina, como el RAC 121 (CAT.OP.MPA.181).
- **FAA doméstico:** 45 min a consumo normal de crucero (121.639); **FAA internacional con reactores:** 30 min a velocidad de espera a 1.500 ft (121.645 (b)(4)).

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Indicador de combustible estilizado (arco o barra vertical) con zonas de color: por encima, el combustible para operar (trayecto, contingencias, discrecional) en azul; en el medio, el combustible para el alterno; abajo, una zona roja rotulada «RESERVA FINAL · no se planifica para consumirse», separada por una línea gruesa tipo barrera. A un lado, los rótulos de los avisos: «pedir demoras» a la altura de alterno más reserva final, «COMBUSTIBLE MÍNIMO» cerca de la barrera y «MAYDAY COMBUSTIBLE» dentro de la zona roja. Formato vertical, 900 × 1400 px.

OBJETIVO:
Mostrar visualmente que la reserva final constituye una barrera operacional crítica.

### Aplicación operacional

- **Planificación y despacho:** anotas la reserva final prevista del OFP en kg. Es la cifra más importante del briefing de llegada.
- **Briefing:** «Aterrizamos con no menos de 1.150 kg en cualquier aeródromo.»
- **En vuelo:** cada predicción se compara con dos líneas: alterno más reserva final (conservar opciones) y reserva final (no aterrizar por debajo).
- **Decisiones:** si una decisión te lleva a aterrizar con menos de la reserva final, ya no es una decisión normal. Decide antes.
- **Anormales:** una fuga o un consumo anormal se miden contra esta línea.

### Ejemplo

Vuelo de referencia: reserva final prevista de 1.150 kg. Estás en espera en el destino con 1.600 kg y el alterno ya no es alcanzable con la reserva intacta. Cada minuto de espera cuesta 40 kg: te quedan unos 11 minutos antes de que cualquier demora adicional te deje por debajo de 1.150 kg al aterrizar, y la aproximación todavía no está descontada. Esa situación ya exige «combustible mínimo» (capítulo 16).

### En pocas palabras

- La reserva final es el mínimo con el que se aterriza en **cualquier** aeródromo.
- En turbina: 30 min de espera a 1.500 ft sobre el aeródromo, con el peso de llegada al alterno.
- No se planifica para consumirla y no admite variaciones (121.2645 (e)).
- El PIC la vigila de forma continua (121.2553 (b)).
- Si calculas que vas a aterrizar por debajo de ella: MAYDAY COMBUSTIBLE.
- Piensa en ella como lo que debe quedar, no como tiempo que te sobra.

---

## 9. ADDITIONAL FUEL Y EXTRA FUEL
**ID:** C09 · **Tiempo:** 6 min

### ¿Qué es?

Son dos componentes que en inglés se parecen y en la cabina se confunden, pero cubren cosas distintas:
- **Additional fuel (combustible adicional):** lo **exige la norma** para un escenario de falla del avión.
- **Extra fuel (combustible extra o discrecional):** se carga **por decisión**, para lo que se puede prever.

### Lo que debe saber un piloto

#### Additional fuel: la norma y la falla en el peor punto

Se agrega **solo si** trayecto, contingencias, alterno y reserva final no alcanzan para esto (121.2645 (c)(6)):
1. Que, ante una **falla de motor o una pérdida de presurización** (la que exija más combustible), supuesta en el **punto más crítico de la ruta**, el avión pueda descender, llegar a un alterno, **esperar 15 minutos a 1.500 ft** sobre ese aeródromo y hacer la aproximación y el aterrizaje.
2. Que cumpla el **combustible crítico para EDTO** en operaciones con tiempo de desviación extendido (121.2581 (b)(5)).
3. Otros requisitos no cubiertos antes.

Cuando los demás componentes ya alcanzan, el adicional sale en **cero** en el OFP. Cuenta en rutas largas sobre agua, selva o montaña, o en EDTO. La propia norma advierte que ese escenario de falla en el punto crítico puede terminar en una emergencia de combustible (121.2645 (c)(6), Nota 1; Anexo 6, 4.3.6.3 f), Nota 1).

#### Extra fuel: el que se decide

- En el RAC 121 es un solo componente: **«combustible discrecional o extra»**, la cantidad que, **a juicio del PIC**, puede añadirse (121.2645 (c)(7)).
- En la práctica, el OFP puede traer extra propuesto por el despachador según la política de la empresa, y el PIC decide si lo acepta o añade más. **Cómo se reparte esa decisión depende de cada operador.**
- EASA los separa: el **extra** cubre demoras previstas o restricciones operacionales conocidas antes de salir (por ejemplo, las que publica un NOTAM), y el **discrecional** queda a la sola discreción del comandante (CAT.OP.MPA.181; GM1 CAT.OP.MPA.181).

#### Razones típicas para cargar extra

| Situación | Por qué pide extra |
|---|---|
| **Meteorología** | Tormentas, niebla o techos bajos pronosticados a la hora de llegada, o un alterno con tiempo marginal |
| **Congestión** | Horas pico con secuenciación y esperas habituales |
| **Esperas** | Esperas anunciadas por NOTAM o por la gestión de afluencia |
| **ATC** | Rerrutas conocidas, niveles restringidos, pistas en mantenimiento |
| **Aeropuerto complejo** | Terreno, una sola pista, procedimientos largos, mínimos altos |
| **Pista contaminada** | Posibles cierres o cambios de pista, o frenado degradado |
| **Experiencia operacional** | Patrones que la empresa y sus tripulaciones ya conocen para esa ruta o estación |
| **Incertidumbre** | Pronósticos con TEMPO o PROB, información incompleta, equipo de aproximación fuera de servicio |

**La política exacta depende del operador.** Muchos definen en el MO cuándo se carga extra y cómo se calcula (por ejemplo, minutos de espera según la estación y la hora).

### Aplicación operacional

- **Planificación y despacho:** revisas si el adicional es distinto de cero y por qué, y qué extra propone el OFP.
- **Briefing:** explicas a la tripulación por qué llevas extra y para qué se piensa usar.
- **En vuelo:** el extra se suma a la contingencia en tu margen para esperar o desviarte; cómo se contabiliza cada uno lo define tu MO.
- **Decisiones:** cuando ves que el margen (extra y contingencia) no cubre la espera prevista, la conversación sobre alternativas debe empezar ya.

### Ejemplo

El TAF del destino trae un TEMPO de tormentas justo a tu hora de llegada, y la empresa sabe que en esa franja hay esperas de 15 a 20 minutos. El despachador propone 400 kg de extra (unos 10 minutos de espera a 40 kg/min). Tú subes a 800 kg para cubrir 20 minutos. El adicional sigue en cero porque es una ruta doméstica corta con alternos cerca.

### En pocas palabras

- **Adicional:** lo exige la norma para una falla de motor o una despresurización en el punto más crítico, o para EDTO.
- **Extra o discrecional:** se decide para lo previsible; en el RAC 121 lo decide el PIC.
- EASA separa el extra (demoras previstas) del discrecional (el comandante).
- Meteorología, congestión, esperas, ATC, aeropuerto, pista, experiencia e incertidumbre justifican extra.
- La política exacta es la de tu operador.

---

## 10. COMBUSTIBLE DISCRECIONAL DEL COMANDANTE
**ID:** C10 · **Tiempo:** 6 min

### ¿Qué es?

Es el combustible que el piloto al mando decide añadir por encima del mínimo requerido, con base en su evaluación del vuelo: «Combustible discrecional o extra, que será la cantidad de combustible que a juicio del piloto al mando puede adicionarse» (121.2645 (c)(7)).

### Lo que debe saber un piloto

#### La autoridad del PIC

- En vuelo, el PIC tiene autoridad total sobre el avión y la tripulación (121.2215 (e)).
- El despacho lo firman el PIC y el despachador, **solo si ambos** creen que el vuelo es seguro (121.2705).
- EASA lo dice sin rodeos: el discrecional es de la «sola discreción» del comandante y nadie debe presionarlo ni para cargarlo ni para no cargarlo (GM1 CAT.OP.MPA.181).

#### Cómo se evalúa el riesgo

Antes de decidir, revisa:
- **Meteorología:** tendencia de los METAR, TAF con TEMPO o PROB, SIGMET en ruta, tormentas, viento cruzado, visibilidad.
- **NOTAM:** pistas cerradas, ayudas fuera de servicio (que suben los mínimos), obras, restricciones.
- **Tránsito:** horas pico, eventos especiales, gestión de afluencia.
- **Experiencia:** lo que sabes de esa ruta y de esa estación.
- **Demoras posibles:** en tierra, en ruta y en llegada.
- **Destino y alterno:** si el alterno está lejos o con tiempo marginal, tienes menos margen del que parece.

#### Más combustible también cuesta

Cargar combustible no es gratis y **no es siempre más seguro**. El peso extra:
- **aumenta el consumo:** hay que transportar combustible para transportar combustible;
- **alarga la carrera de despegue** y reduce la performance de ascenso;
- puede acercarte a los límites de **masa máxima de despegue o de aterrizaje**;
- **sube el costo** del vuelo.

**Transportar combustible para transportar combustible.** Airbus estima que, en promedio, un aumento de peso igual al 1 % de la masa máxima de despegue reduce cerca de un 1 % el alcance específico (lo que el avión recorre por cada kg de combustible). Para un A320, cada tonelada extra cuesta del orden de 82 kg de combustible cada 1.000 NM (Airbus, *Getting to Grips with Fuel Economy*, 2004). Boeing, por su parte, indica que reducir un 1 % el peso de aterrizaje reduce cerca de un 0,75 % el combustible del trayecto en motores de alta relación de derivación. Las cifras exactas dependen del avión y del vuelo, pero la idea es fija: **el extra se paga**.

La decisión correcta no es «lo máximo posible» ni «lo mínimo legal». Es **el que la situación justifica**, y poder explicar por qué.

### Aplicación operacional

- **Despacho:** decides el discrecional y lo comentas con el despachador.
- **Briefing:** dices cuánto llevas y para qué: «llevamos 800 kg extra por el TEMPO de tormentas en destino».
- **En vuelo:** es tu margen para esperar o desviarte con tranquilidad.
- **Decisiones:** si al llegar no lo usaste, no fue un desperdicio: fue un seguro que no hizo falta.

### Ejemplo

Con 800 kg extra en un avión de unos 70 t de masa máxima de despegue, el peso sube cerca de un 1,1 % de esa masa. Con la regla de Airbus, el trayecto de 3.000 kg costaría del orden de un 1,1 % más: unos 35 kg. El costo existe, pero comparado con 20 minutos de espera disponibles en un destino con tormentas, la decisión se justifica. *Cifras ilustrativas.*

### En pocas palabras

- El discrecional es decisión del PIC (121.2645 (c)(7)), y nadie debe presionarlo.
- Se decide con meteorología, NOTAM, tránsito, experiencia, demoras, destino y alterno.
- Más combustible significa más peso, más consumo, más distancia de despegue y más costo.
- Hay que transportar combustible para transportar combustible.
- Lo correcto es el que la situación justifica, y poder explicarlo.

---

## 11. FUEL TANKERING
**ID:** C11 · **Tiempo:** 5 min

### ¿Qué es?

El tankering es cargar en origen **más combustible del que el vuelo requiere**, para no tener que cargar (o cargar menos) en destino. Normalmente lo decide la empresa, por economía o por logística, no por seguridad.

### Lo que debe saber un piloto

#### Por qué se usa

- **Precio:** el combustible es más barato en origen que en destino.
- **Disponibilidad:** en destino hay poco combustible, es de calidad dudosa o no hay proveedor a esa hora.
- **Tiempo en tierra:** evitar cargar en destino acorta la escala.

#### El beneficio y la penalización

- **Beneficio económico:** si la diferencia de precio es grande, puede compensar el combustible extra quemado.
- **Penalización de peso:** el combustible transportado aumenta el peso y el consumo de todo el vuelo.
- **La cuenta:** Airbus define un coeficiente de transporte **K** (cuánto hay que cargar de más en origen para que llegue una cantidad en destino). En su ejemplo, con K = 1,3, cargar 1.300 kg de más deja 1.000 kg adicionales en destino. Si solo pesa el precio, el tankering conviene cuando el precio en destino dividido por el precio en origen es mayor que K (Airbus, *Getting to Grips with Fuel Economy*, 2004).
- **Impacto ambiental:** EUROCONTROL estimó en 2019 que el tankering en Europa quemaba unas 286.000 toneladas de combustible extra al año y emitía unas 901.000 toneladas de CO₂ adicionales. Desde 2025, la Unión Europea obliga a los operadores a cargar en cada aeropuerto de la UE sujeto al reglamento al menos el **90 %** del combustible que necesitan al año para salir de él, salvo cuando lo impidan las reglas de seguridad del combustible (Reglamento (UE) 2023/2405, art. 5). Es una norma europea, no colombiana, pero muestra hacia dónde va la industria.

#### Consideraciones operacionales

- **Masas máximas:** el combustible extra puede llevarte al límite de masa máxima de despegue o de aterrizaje.
- **Performance:** más peso al aterrizar pide más pista, y eso importa en pista corta, mojada o contaminada. *Este tema se complementa con el módulo de Performance (peso máximo de despegue y de aterrizaje, pistas contaminadas).*
- **El tankering no reemplaza el discrecional:** el combustible transportado para el siguiente tramo es combustible de más, pero la decisión de usarlo como margen en una espera tiene consecuencias para el vuelo siguiente. Confírmalo según la política de tu empresa.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Dos perfiles de vuelo paralelos del mismo trayecto. Arriba, vuelo normal: avión con el combustible requerido y una etiqueta de consumo del trayecto. Abajo, vuelo con tankering: el mismo avión con un bloque adicional de combustible, una flecha que muestre el peso mayor al despegue y una etiqueta de consumo mayor, y al llegar un bloque menor que el cargado de más (la diferencia rotulada «combustible quemado por transportar combustible»). Formato horizontal, 1600 × 900 px.

OBJETIVO:
Explicar visualmente que transportar combustible adicional también requiere consumir más combustible.

### Aplicación operacional

- **Planificación y despacho:** el OFP identifica el combustible de tankering. Verificas masas máximas y performance.
- **Briefing:** separas en voz alta el tankering del margen de seguridad.
- **En vuelo:** es combustible real a bordo; su uso como margen en una emergencia no se discute.
- **Decisiones:** en pista corta o contaminada, el peso extra puede pesar más que el ahorro.

### Ejemplo

El precio en destino es 1,5 veces el de origen y el coeficiente K del tramo es 1,3. Como 1,5 es mayor que 1,3, la empresa decide transportar combustible. Pero la pista de destino está reportada mojada y el aterrizaje con el peso extra queda muy cerca del límite de performance. El PIC lo consulta con el despacho y se reduce el tankering. *Cifras ilustrativas.*

### En pocas palabras

- Tankering es transportar más combustible del requerido para no cargar en destino.
- Se hace por precio, disponibilidad o tiempo en tierra.
- Transportar combustible cuesta combustible (coeficiente K).
- Revisa masas máximas y performance de aterrizaje.
- En la UE, desde 2025, el tankering está limitado por norma (90 % de carga anual).

---

## 12. MONITORIZACIÓN DEL COMBUSTIBLE EN VUELO
**ID:** C12 · **Tiempo:** 7 min

### ¿Qué es?

Es la vigilancia continua del combustible durante el vuelo, para saber en todo momento **si el plan se está cumpliendo** y **con cuánto vas a aterrizar**. El RAC 121 obliga al operador a tener criterios y procedimientos aprobados para las verificaciones del combustible en vuelo (121.2553 (a)), y al PIC a vigilar de forma continua la reserva final (121.2553 (b)).

### Lo que debe saber un piloto

#### Las cifras que se vigilan

| Término | Qué te dice |
|---|---|
| **Fuel check** | La verificación estructurada en un punto (capítulo 13) |
| **Fuel remaining / FOB** | Cuánto hay ahora |
| **Fuel used / FU** | Cuánto has quemado desde la puesta en marcha |
| **Predicted fuel / EFOB** | Cuánto habrá en cada punto y al llegar, según el FMS o el OFP |
| **Fuel at destination** | La predicción al aterrizar en destino: la cifra que decide |
| **Planificado contra real** | Diferencia entre el OFP y lo que marcan los indicadores en cada punto |
| **Desviación y tendencia** | Si la diferencia crece de un punto a otro |

#### Por qué no basta con mirar el combustible total

El FOB te dice cuánto hay, pero no te dice:
- si ese total es **más o menos que el plan** en este punto;
- **a qué ritmo** te estás apartando del plan;
- con cuánto vas a **aterrizar**;
- si **alcanza para el alterno** con la reserva final intacta;
- si hay una **fuga**. Un FOB «normal» puede esconder una fuga si no se compara con el combustible usado.

#### La prueba de la suma

**Combustible a bordo más combustible usado debe ser igual al combustible que había al poner en marcha** (FOB + FU = FOB inicial). Si la suma es claramente menor, o baja con el tiempo, puede haber una fuga (Airbus, *Safety First*, «Fuel Leak Management in Flight», 2025). Los procedimientos de Air Transat ya la pedían en cada punto; en el vuelo 236 (2001), no reconocer la fuga fue el factor clave del agotamiento del combustible (Anexo B).

#### Cada cuánto

El RAC 121 no fija un intervalo: lo fija el MO (121.2553 (a); Apéndice 10, A9.3.18). Como referencia:
- EASA pide verificaciones a intervalos regulares, **al menos una cada 60 minutos** (AMC1 CAT.OP.MPA.185(a)).
- Airbus recomienda en sus procedimientos revisar en crucero **al sobrevolar un punto de la ruta (waypoint) o al menos cada 30 minutos** (*Safety First*, 2025).

El Doc 9976 de la OACI describe lo que suele incluir la verificación: comparar el consumo real con el planificado y el combustible usado y remanente con el plan, conciliar el FMS con el flujo de combustible y los indicadores, investigar las diferencias y calcular el combustible al aterrizar frente al del alterno más la reserva final (Doc 9976, 6.6).

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Tabla de seguimiento de un vuelo en formato de OFP con columnas Waypoint, Hora, Planned Fuel (EFOB), Actual Fuel (FOB), Difference y Fuel Used, con cinco filas de puntos de la ruta. Las diferencias crecen de −40 a −200 kg y la columna Difference se colorea de verde a ámbar. Debajo, la línea «FOB + FU = FOB inicial» con su verificación marcada. Formato horizontal, 1600 × 900 px.

OBJETIVO:
Mostrar cómo puede realizarse un fuel check durante el vuelo.

### Aplicación operacional

- **Planificación:** el OFP trae el combustible planificado en cada punto; esa es tu referencia.
- **Briefing:** acuerdas quién hace el fuel check, en qué puntos y a partir de qué diferencia se comenta.
- **En vuelo:** anotas y comparas; el piloto que no vuela (PM) suele llevar el registro según el MO.
- **Decisiones:** una tendencia negativa temprana te da tiempo; la misma cifra descubierta tarde te quita opciones.
- **Anormales:** una suma FOB + FU que no cuadra, un desbalance entre tanques que crece o un flujo de combustible anormal se tratan con el procedimiento del QRH, no por intuición.

### Ejemplo

Vuelo de referencia, a mitad de crucero: el OFP dice 4.300 kg y el FOB marca 4.180 kg, así que vas 120 kg por debajo del plan. El FU acumulado desde la puesta en marcha es 1.770 kg. La prueba: 4.180 + 1.770 = 5.950 kg, igual al combustible a bordo al poner en marcha. **Cuadra: no hay fuga.** Los 120 kg son consumo mayor al previsto (viento, nivel o ruta).

Si la suma hubiera dado 5.700 kg, faltarían 250 kg que ningún motor quemó. Eso ya no es consumo: se trata con el procedimiento de fuga del QRH. Ojo: la suma se compara con el combustible **al poner en marcha**, no con el de despegue, porque el FU incluye el rodaje. *Cifras ilustrativas; revisa cómo cuenta el FU tu avión.*

### En pocas palabras

- El RAC 121 exige verificaciones del combustible en vuelo según el MO (121.2553 (a)).
- Vigila lo planificado, lo real, la diferencia y la tendencia, no solo el total.
- La cifra que decide es la predicción al aterrizar en destino y en el alterno.
- FOB + FU debe cuadrar con el combustible a bordo al poner en marcha; si no, piensa en fuga.
- Referencias: EASA, al menos cada 60 min; Airbus, en cada punto o cada 30 min.

---

## 13. FUEL CHECK
**ID:** C13 · **Tiempo:** 6 min

### ¿Qué es?

Un fuel check es una verificación estructurada del combustible en un punto de la ruta o a una hora determinada. Compara lo real con lo planificado, confirma que no hay pérdidas y actualiza la predicción al aterrizaje.

### Lo que debe saber un piloto

#### Cuándo hacerlo

- En los puntos o intervalos que fija el MO (121.2553 (a)).
- **Además**, después de todo lo que cambie el consumo: una rerruta, un cambio de nivel, una espera, un desvío por meteorología, un uso prolongado de antihielo o una falla que afecte a motores o combustible.
- **Antes de aceptar una espera** o una demora larga, y **antes de iniciar el descenso**.

#### Qué se compara

1. **FOB real contra combustible planificado** en ese punto: la diferencia.
2. **Hora real contra hora planificada**, porque el combustible y el tiempo van juntos.
3. **FOB + FU contra el FOB inicial:** la prueba de fuga.
4. **Predicción al aterrizaje en destino** contra la del OFP.
5. **Predicción al destino** contra **alterno más reserva final**, la línea de 121.2553 (b)(1).

#### Cómo se detecta una tendencia

Una diferencia aislada puede ser ruido. **Varias diferencias que crecen** son una tendencia. Divide el cambio de la diferencia entre el tiempo transcurrido y tendrás el ritmo de desvío (kg por hora). Proyecta ese ritmo al tiempo que queda y sabrás con cuánto vas a llegar si nada cambia.

#### Por qué actuar temprano

Temprano puedes elegir: pedir otro nivel, un directo, reducir la velocidad, cambiar de alterno o desviarte con margen. Tarde solo te queda aceptar lo que venga. **El fuel check sirve para decidir, no solo para anotar.**

### Aplicación operacional

- **Planificación:** marcas en el OFP los puntos de verificación.
- **Briefing:** acuerdas qué diferencia dispara una conversación (lo define el MO o el criterio de la tripulación).
- **En vuelo:** hacer, anotar, comparar y comentar.
- **Decisiones:** una tendencia negativa se discute en voz alta y se decide qué hacer y para cuándo.

### Ejemplo

Vuelo de referencia con 2.750 kg previstos al aterrizar en destino (alterno más reserva final: 2.250 kg).

| Punto | Hora | Planificado | Real | Diferencia |
|---|---|---|---|---|
| Punto 1 | 0:20 | 4.900 | 4.860 | −40 |
| Punto 2 | 0:35 | 4.300 | 4.180 | −120 |
| Punto 3 | 0:50 | 3.700 | 3.500 | −200 |

- La diferencia crece unos 80 kg cada 15 minutos, es decir, unos **320 kg por hora**.
- Quedan unos 25 minutos de vuelo: si la tendencia sigue, se sumarán unos 130 kg más, y la diferencia al llegar será de unos −330 kg.
- Predicción al aterrizar: 2.750 − 330 = **unos 2.420 kg**, todavía por encima de 2.250 kg, pero al llegar habrás consumido 330 de los 500 kg de margen (contingencia y discrecional).
- La prueba FOB + FU cuadra, así que no es una fuga: es consumo (viento mayor al pronosticado o nivel más bajo).
- **Qué haces ahora:** revisar la llegada (esperas, pista en uso), pedir el nivel óptimo o un directo si hay, y preparar la decisión de desvío con una cifra clara. *Cifras ilustrativas.*

### En pocas palabras

- El fuel check compara lo real con lo planificado, verifica la suma y actualiza la predicción.
- Hazlo en los puntos del MO y después de cada evento que cambie el consumo.
- Una diferencia que crece es una tendencia: calcula su ritmo y proyéctalo.
- La línea que importa: predicción al destino contra alterno más reserva final.
- Detectar temprano es tener opciones.

---

## 14. FUEL PREDICTION
**ID:** C14 · **Tiempo:** 5 min

### ¿Qué es?

La predicción de combustible es la estimación de **cuánto combustible tendrás al llegar a cada punto, al destino y al alterno**. La hace el FMS con los datos que tiene y la verifica la tripulación contra el OFP y el fuel check.

### Lo que debe saber un piloto

#### Al destino y al alterno

- **Al destino:** la cifra clave del vuelo. Se compara con alterno más reserva final para saber si conservas la opción del alterno.
- **Al alterno:** la cifra que te dice con cuánto aterrizarías si te desvías desde donde estás. Se compara con la reserva final.
- Cada avión la presenta distinto (páginas del FMS, OFP electrónico en el EFB, cálculos del manual). Conoce la tuya.

#### El FMS predice lo que le das

La predicción es tan buena como la información cargada:
- **Ruta:** si esperas vectores o una STAR distinta y el FMS tiene otra, la predicción es optimista o pesimista.
- **Vientos y temperaturas:** si no se actualizan, el FMS usa los del despacho.
- **Nivel de vuelo:** un nivel impuesto distinto al planificado cambia el consumo.
- **Restricciones ATC:** esperas, velocidades y niveles que el FMS no conoce hasta que se los cargas.
- **Aproximación:** la pista y el procedimiento de llegada cambian la distancia final.

#### Actualizar es parte del trabajo

Cuando algo cambia (te asignan una espera, cambian la pista, te dan un directo), **actualiza el FMS** para que la predicción refleje lo que va a pasar, no lo que estaba en el plan.

#### Predicción y decisiones

Las reglas de la norma se disparan con **predicciones**, no con el combustible actual:
- Se piden demoras cuando se **prevé** aterrizar en destino con menos del alterno más la reserva final (121.2553 (b)(1)).
- Se declara «combustible mínimo» cuando, obligado a aterrizar en un aeródromo, se **calcula** que cualquier cambio puede dejarte por debajo de la reserva final (121.2553 (b)(2)).
- Se declara «MAYDAY COMBUSTIBLE» cuando se **calcula** que aterrizarás por debajo de la reserva final en el aeródromo más cercano (121.2553 (b)(3)).

### Aplicación operacional

- **Planificación:** cargas ruta, vientos y datos de rendimiento; revisas que la predicción inicial del FMS coincida con el OFP.
- **Briefing de llegada:** actualizas la llegada esperada y lees la predicción al destino y al alterno.
- **En vuelo:** después de cada cambio, actualizas y vuelves a leer.
- **Decisiones:** decides sobre predicciones actualizadas, no sobre el FOB de este momento.

### Ejemplo

El FMS predice 2.750 kg al aterrizar. ATC te anuncia vectores que alargan la llegada unos 20 NM (unos 190 kg) y una espera de 8 minutos (320 kg). Con la ruta vieja en el FMS, la predicción sigue diciendo 2.750. Cuando cargas la espera y la llegada larga, baja a unos 2.250 kg: justo alterno más reserva final. Es el momento de pedir información de demoras. *Cifras ilustrativas.*

### En pocas palabras

- La predicción al destino y al alterno es la base de las decisiones.
- El FMS predice con lo que tiene cargado: ruta, vientos, nivel y restricciones.
- Actualízala después de cada cambio.
- Las reglas de 121.2553 (b) se aplican sobre predicciones, no sobre el FOB actual.

---

## 15. COMBUSTIBLE Y TOMA DE DECISIONES
**ID:** C15 · **Tiempo:** 6 min

### ¿Qué es?

El combustible es una variable de decisión durante todo el vuelo. Cada decisión (seguir, cambiar de nivel, esperar, desviarte) cambia el combustible con el que vas a aterrizar, y el combustible cambia las opciones que tienes. **La buena gestión decide antes de que el combustible se convierta en la emergencia.**

### Lo que debe saber un piloto

#### Las decisiones y su efecto

| Decisión | Efecto sobre el combustible | Cuándo tiene sentido |
|---|---|---|
| **Continuar** | Sigue el plan | La predicción mantiene alterno más reserva final |
| **Cambiar de nivel** | Un nivel más cercano al óptimo reduce el consumo | Cuando el tránsito y la meteorología lo permiten |
| **Pedir directos** | Menos distancia, menos combustible | Cuando no afecta la separación ni el terreno |
| **Reducir la velocidad** | Con poco combustible, un índice de costo bajo alarga el alcance; Boeing recomienda un CI muy bajo, con cero para el máximo alcance, y no la velocidad de largo alcance (LRC) | Cuando la prioridad pasa a ser el alcance |
| **Otro alterno** | Un alterno más cercano o con mejor tiempo baja el combustible necesario | Cuando el planificado se deteriora o queda lejos |
| **Esperar** | Consume a ritmo de espera | Si la espera tiene un final conocido y el combustible lo cubre |
| **Desviarte** | Consume el combustible para el alterno | Cuando esperar pone en riesgo el alterno más la reserva final |
| **Aterrizar en otro aeródromo** | El más cercano con aterrizaje seguro | Cuando la reserva final está en juego |

#### Decidir antes de la emergencia

- Una **emergencia de combustible casi nunca aparece de golpe**: se construye con varias decisiones pequeñas (aceptar una espera, luego otra, luego un vector).
- La norma pone **escalones** para que decidas antes (capítulos 16 y 17): pedir demoras, declarar «combustible mínimo» y, al final, «MAYDAY COMBUSTIBLE».
- Usa el modelo de decisión de tu aerolínea (por ejemplo FOR-DEC o T-DODAR) y **pon cifras**: «si a las 14:20 no tenemos hora prevista de aproximación, nos desviamos».

#### Coordinar con la empresa

El despachador es responsable de cancelar o redespachar el vuelo si, en su opinión o en la tuya, no puede seguir con seguridad según lo planificado (121.2215 (d)(7)). Cuando el tiempo lo permita, involúcralo: ve información que tú no ves.

### Aplicación operacional

- **Planificación:** identificas los puntos donde podrías tener que decidir (llegada, alterno).
- **Briefing:** acuerdas el **combustible de decisión** para abandonar el destino y el plan si se alcanza.
- **En vuelo:** cada fuel check termina con una pregunta: ¿cambia esto mi plan?
- **Decisiones:** decide con cifras, en voz alta y con tiempo.
- **Anormales:** una falla que aumente el consumo (tren abajo, flaps trabados, motor inoperativo) cambia todo el cálculo: recalcúlalo con las tablas o el procedimiento del fabricante.

### Ejemplo

Llegando al destino, la predicción es 2.400 kg (alterno más reserva final: 2.250). ATC anuncia 15 minutos de espera: 600 kg. Aceptar la espera completa te dejaría en 1.800 kg: sin alterno, a 650 kg de la reserva final. Opciones: aceptar solo lo que tu margen cubre (unos 3 minutos), pedir una hora prevista de aproximación, o desviarte ahora, mientras conservas alterno más reserva final, y llegar al alterno con margen. La decisión se toma **ahora**, no en la tercera vuelta de la espera. *Cifras ilustrativas.*

### En pocas palabras

- Cada decisión cambia el combustible, y el combustible cambia tus opciones.
- Nivel, directos, velocidad y alterno son herramientas para proteger el combustible.
- Con poco combustible, un índice de costo bajo (cero para máximo alcance) alarga el alcance.
- Decide con cifras y en voz alta, antes de la emergencia.
- Involucra al despachador cuando haya tiempo.

---

## 16. MINIMUM FUEL
**ID:** C16 · **Tiempo:** 7 min

### ¿Qué es?

«Combustible mínimo» (MINIMUM FUEL) es un **aviso al ATC**: el piloto le dice que ya no tiene opciones de aterrizaje distintas a un aeródromo específico y que cualquier cambio en su autorización puede hacerlo aterrizar con menos de la reserva final prevista.

### Lo que debe saber un piloto

#### Qué significa operacionalmente

Se declara cuando se cumplen **las dos condiciones** (121.2553 (b)(2); 91.637 (b); Anexo 6, 4.3.7.2.2):
1. Tienes **la obligación de aterrizar en un aeródromo específico** (committed to land): tus opciones se redujeron a ese aeródromo, porque ya no alcanzas otro con la reserva final intacta o porque los demás dejaron de ser opción.
2. **Calculas** que cualquier cambio en la autorización para ese aeródromo puede hacerte aterrizar con **menos de la reserva final prevista**.

La declaración le informa al ATC que tus opciones se redujeron a un solo aeródromo (121.2553 (b)(2), Nota).

#### Qué NO significa

- **No es una emergencia.** La norma lo dice textualmente: «Esta situación no es una situación de emergencia, sino una indicación de que podría producirse una situación de emergencia si hay más demora» (121.2553 (b)(2), Nota).
- **No es una petición de prioridad.** La orientación de EASA dice que el piloto no debe esperar ningún trato prioritario, y la FAA, que no implica necesidad de prioridad de tránsito (GM1 CAT.OP.MPA.185; AIM 5-5-15). El Doc 9976 aclara que no otorga prioridad (Doc 9976, 6.8.5, Nota 1).
- **No es la primera alarma.** Antes está el pedido de información de demoras (121.2553 (b)(1)).

#### La escalera de la norma

| Paso | Cuándo | Qué haces |
|---|---|---|
| 1. Pedir demoras | Circunstancias imprevistas pueden dejarte en destino con **menos del alterno más la reserva final** | Pides al ATC información sobre demoras (121.2553 (b)(1)) |
| 2. Combustible mínimo | Estás obligado a un aeródromo y cualquier cambio puede dejarte **bajo la reserva final** | Declaras «COMBUSTIBLE MÍNIMO» (121.2553 (b)(2)) |
| 3. MAYDAY COMBUSTIBLE | Calculas que aterrizarás **bajo la reserva final** en el aeródromo más cercano | Declaras «MAYDAY, MAYDAY, MAYDAY, COMBUSTIBLE» (121.2553 (b)(3)) |

Pedir información de demoras **no** es pedir asistencia ni declarar urgencia (Doc 9976, 6.7).

#### Cómo se dice y qué responde el ATC

Fraseología de la OACI (Doc 4444, 12.3.1.3):

| | En español | En inglés |
|---|---|---|
| Piloto | COMBUSTIBLE MÍNIMO | MINIMUM FUEL |
| ATC | RECIBIDO [NO SE PREVÉ DEMORA o PREVEA (información sobre la demora)] | ROGER [NO DELAY EXPECTED or EXPECT (delay information)] |

- El controlador debe informarte **lo antes posible** de las demoras previstas o de que no se prevén demoras (Doc 4444, 15.5.4.1).
- Cuando te transfiere a otra dependencia, le comunica que declaraste combustible mínimo (Doc 4444, 10.2.5).

#### Cuándo comunicarlo

- **Tan pronto se cumplen las dos condiciones.** Declararlo tarde le quita al ATC el tiempo para planear tu llegada.
- Si ya lo sabes antes de entrar en el área terminal, dilo al primer controlador que pueda organizar tu secuencia.
- Después de declararlo, sigue vigilando: si la predicción baja de la reserva final, el paso siguiente es MAYDAY.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Diagrama de decisión de izquierda a derecha con cuatro cajas conectadas por flechas y un color por estado: «Situación normal» (verde: la predicción mantiene alterno más reserva final); «Reducción de opciones» (amarillo: pedir información de demoras, 121.2553 (b)(1)); «COMBUSTIBLE MÍNIMO» (ámbar: obligado a un aeródromo, cualquier cambio deja bajo la reserva final); «MAYDAY COMBUSTIBLE» (rojo: aterrizaje calculado bajo la reserva final). Bajo cada caja, la condición que la dispara y el numeral. Formato horizontal, 1600 × 900 px.

OBJETIVO:
Mostrar la progresión de una situación de combustible.

### Aplicación operacional

- **Briefing de llegada:** acuerdas a partir de qué predicción pedirás demoras, cuándo declararás combustible mínimo y con qué palabras.
- **En vuelo:** vigilas la predicción después de cada instrucción del ATC.
- **Comunicación:** usas la fraseología normalizada. No inventes frases como «estamos cortos de combustible»: pueden no significar nada para el controlador.
- **Decisiones:** declarar combustible mínimo no reemplaza decidir. Si el combustible sigue bajando, prepara el MAYDAY.

### Ejemplo

Estás en espera en el destino y el alterno ya no es alcanzable con la reserva final intacta: estás obligado a aterrizar allí. Te quedan 1.600 kg y la reserva final prevista es 1.150 kg. La aproximación y el aterrizaje cuestan unos 250 kg, así que te quedan unos 200 kg de margen, 5 minutos de espera. Cualquier demora más te deja bajo la reserva final. Declaras: «Centro, Aviatory 123, **combustible mínimo**». El controlador responde: «Aviatory 123, **recibido, prevea** demora de 5 minutos». Ahora los dos saben el margen. *Cifras ilustrativas.*

### En pocas palabras

- Combustible mínimo significa: estoy obligado a un aeródromo y cualquier cambio puede dejarme bajo la reserva final.
- **No es emergencia** ni da prioridad: es un aviso de que podría serlo si hay más demora.
- Antes se piden demoras, cuando peligran el alterno más la reserva final.
- Fraseología: «COMBUSTIBLE MÍNIMO» / «MINIMUM FUEL»; el ATC responde con la demora prevista.
- Declararlo tarde le quita al ATC el tiempo para ayudarte.

---

## 17. MAYDAY FUEL
**ID:** C17 · **Tiempo:** 7 min

### ¿Qué es?

Es la **declaración de emergencia por combustible**. Se hace cuando calculas que vas a aterrizar con **menos de la reserva final prevista** incluso en el aeródromo más cercano donde puedes aterrizar con seguridad. Ya no es un aviso: es una situación de peligro.

### Lo que debe saber un piloto

#### Cuándo se pasa de combustible mínimo a emergencia

- **Combustible mínimo:** *cualquier cambio podría* dejarte bajo la reserva final.
- **MAYDAY COMBUSTIBLE:** *ya calculas* que aterrizarás bajo la reserva final, en el aeródromo más cercano con aterrizaje seguro (121.2553 (b)(3); 91.637 (c); Anexo 6, 4.3.7.2.3).

El criterio no es cuánto combustible tienes ahora, sino **con cuánto vas a aterrizar**. El Doc 9976 lo describe como el último paso, cuando ya se agotaron las demás opciones para proteger la reserva final (Doc 9976, 6.9).

#### Por qué la reserva final es la línea

La reserva final prevista es «la cantidad mínima de combustible que se requiere al aterrizar en cualquier aeródromo» (121.2553 (b)(3), Nota 1). Si la predicción cae por debajo, ya estás usando el último margen de todo el sistema. Por eso la norma exige declararlo: para que todos (ATC, aeropuerto, servicios de emergencia) actúen en consecuencia.

#### Cómo se declara

| Norma | Fraseología |
|---|---|
| RAC 121 (121.2553 (b)(3)) | «MAYDAY, MAYDAY, MAYDAY, COMBUSTIBLE» |
| RAC 91 (91.637 (c)) | «MAYDAY MAYDAY MAYDAY COMBUSTIBLE» |
| OACI, en inglés (Anexo 6, 4.3.7.2.3) | «MAYDAY MAYDAY MAYDAY FUEL» |

El término «MAYDAY, COMBUSTIBLE» describe la índole de la emergencia según el Anexo 10, Volumen II (121.2553 (b)(3), Nota 2). **Usa las palabras exactas.** Frases como «estamos bajos de combustible» o «necesitamos prioridad» pueden no significar lo que crees para el controlador.

#### Lo que te va a preguntar el ATC

Ante una emergencia, el controlador obtiene, entre otros datos, el **combustible remanente**, las personas a bordo y las mercancías peligrosas (Doc 4444, 15.1.1.2). En los mensajes OACI la autonomía se expresa en **horas y minutos** (Doc 4444), y la FAA pide informar el combustible remanente **en minutos** (AIM 5-5-15). Un controlador no convierte kilos a minutos: **dáselo en tiempo**.

#### Prioridad y autoridad

- La declaración de MAYDAY te da **prioridad**: las dependencias ATS dan la mayor atención, asistencia y prioridad a la aeronave en emergencia (RAC 211, 211.360 (a)). El Doc 9976 añade que te abre todas las opciones (pistas cerradas disponibles, aeródromos militares) y le da más flexibilidad al ATC (Doc 9976, 6.9.3).
- Del lado del ATS, que el combustible se considere agotado o insuficiente para llegar a un lugar seguro es un criterio de **fase de peligro (DETRESFA)**, y el centro de control de área debe notificarlo al centro coordinador de salvamento (211.720 (c)(2)).
- En emergencia, el PIC puede apartarse de procedimientos, mínimos y del propio reglamento en la medida necesaria. Después envía un reporte escrito dentro de los **10 días calendario** siguientes al regreso a su base (121.2300 (a) y (c)(2)).
- Una emergencia declarada por combustible puede calificarse como **incidente grave**, y la tripulación involucrada se comunica con la autoridad de investigación dentro de las **12 horas** (RAC 114, 114.335 (a); Adjunto C). *Este tema se complementa con el módulo RAC.*

#### La lección que dejó la terminología

En 1990, el Boeing 707 del vuelo Avianca 052 se quedó sin combustible cerca de Nueva York después de más de una hora de esperas. La NTSB concluyó que la tripulación no manejó adecuadamente el combustible y **no comunicó una situación de emergencia de combustible al ATC** antes de agotarlo. Señaló como factor contribuyente la falta de terminología normalizada y comprensible para pilotos y controladores sobre combustible mínimo y de emergencia, y recomendó crearla (NTSB AAR-91/04). Ese es el vacío que cubre la fraseología normalizada de este capítulo.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Escala horizontal de tres franjas: «NORMAL» (verde: la predicción conserva alterno más reserva final), «COMBUSTIBLE MÍNIMO / MINIMUM FUEL» (ámbar: obligado a un aeródromo; cualquier cambio deja bajo la reserva final; no es emergencia) y «MAYDAY COMBUSTIBLE / MAYDAY FUEL» (rojo: aterrizaje calculado bajo la reserva final; emergencia). Bajo cada franja, la frase exacta que se dice por radio y el numeral del RAC 121. Formato horizontal, 1600 × 600 px.

OBJETIVO:
Diferenciar claramente los tres estados operacionales.

### Aplicación operacional

- **Briefing de llegada:** acuerdas la cifra de reserva final prevista y quién declara, con qué palabras.
- **En vuelo:** si la predicción al aeródromo más cercano cae bajo la reserva final, se declara. No se espera a «ver si mejora».
- **Comunicación:** «MAYDAY, MAYDAY, MAYDAY, COMBUSTIBLE», identificación, intención y autonomía en minutos.
- **Después:** reporte escrito (121.2300) y comunicación con la autoridad de investigación si corresponde (RAC 114).

### Ejemplo

Estás comprometido con el destino y declaraste combustible mínimo con 1.600 kg (reserva final: 1.150 kg). Un avión se sale de la pista y la cierran por tiempo indefinido. El aeródromo más cercano está a 15 minutos: 600 kg más la aproximación. Aterrizarías con menos de 1.000 kg, así que declaras: «MAYDAY, MAYDAY, MAYDAY, COMBUSTIBLE».

Después das los datos que el controlador necesita (Doc 4444, 15.1.1.2): identificación, tipo de emergencia, intenciones (proceder a ese aeródromo), posición y nivel, y luego personas a bordo, combustible remanente en minutos y mercancías peligrosas. El formato completo del mensaje lo fija tu MO. *Cifras ilustrativas.*

### En pocas palabras

- MAYDAY COMBUSTIBLE: calculas que aterrizarás bajo la reserva final en el aeródromo más cercano con aterrizaje seguro.
- Es emergencia y da prioridad; el combustible mínimo no.
- Fraseología: «MAYDAY, MAYDAY, MAYDAY, COMBUSTIBLE» (RAC 121); «MAYDAY MAYDAY MAYDAY FUEL» (OACI).
- Informa la autonomía en tiempo, no en kilos.
- Después: reporte escrito en 10 días (121.2300) y, si aplica, reporte a la autoridad de investigación en 12 horas (RAC 114).

---

## 18. ESPERAS Y COMBUSTIBLE
**ID:** C18 · **Tiempo:** 6 min

### ¿Qué es?

Una espera (holding) consume combustible sin acercarte a ningún aeródromo. Cada minuto en espera reduce **el combustible con el que aterrizarás** y, más importante, **el tiempo que te queda para poder ir al alterno**.

### Lo que debe saber un piloto

#### Qué afecta una espera

| Cifra | Efecto de cada minuto en espera |
|---|---|
| **Fuel remaining** | Baja al ritmo de consumo en espera |
| **Combustible al destino** | Baja lo mismo |
| **Combustible al alterno** | Si sales de la espera hacia el alterno, llegas con menos |
| **Reserva final** | No cambia su valor, pero se acerca el momento en que la tocarías |
| **Decisión** | Cada minuto reduce el tiempo que tienes para decidir |

#### La cifra que manda en una espera

Antes de aceptar una espera, necesitas **cuánto combustible debes tener para abandonarla**:
- **Para ir al alterno:** el combustible desde la espera hasta el alterno más la reserva final.
- **Si decides quedarte comprometido con el destino:** la aproximación y el aterrizaje en destino, más la reserva final.

**Tiempo disponible en espera = (combustible a bordo − combustible para abandonar la espera) ÷ consumo en espera.**

Con esa cifra dices, antes de entrar a la espera, **a qué hora sales** si no hay aproximación.

#### Qué preguntar al ATC

- ¿Cuál es la **hora prevista de aproximación** (EAT) o cuánta demora se espera? Pedir información de demoras es exactamente lo que exige la norma cuando peligran el alterno más la reserva final (121.2553 (b)(1)), y no es declarar urgencia (Doc 9976, 6.7).
- ¿Cuál es la causa? Tormenta que pasa o pista cerrada sin hora de reapertura.
- ¿Qué pasa en el alterno? Si otros aviones se están desviando allí, también habrá demora.

#### Cómo ahorrar en espera

La velocidad de espera del manual y el nivel más alto aceptable reducen el consumo. Si el ATC anuncia la demora con tiempo, absorberla en ruta reduciendo la velocidad suele costar menos que esperar a baja altura (Airbus, *Getting to Grips with Fuel Economy*, 2004, 5.5.3). Según el avión y el MO.

### Aplicación operacional

- **Briefing de llegada:** calculas y dices en voz alta el combustible para abandonar la espera hacia el alterno.
- **Al recibir la espera:** calculas el tiempo disponible y fijas la hora de salida.
- **En la espera:** actualizas en cada vuelta; si la demora crece, decides antes de llegar al límite.
- **Decisiones:** si la demora anunciada es mayor que tu tiempo disponible, **no la aceptes a ciegas**: decide ahora entre desviarte o comprometerte con el destino, según el MO (capítulo 19).

### Ejemplo

Llegas a la espera con 2.950 kg. El combustible para abandonarla hacia el alterno es 2.250 kg (1.100 al alterno más 1.150 de reserva final). Consumo en espera: 40 kg/min.
- Tiempo disponible: (2.950 − 2.250) ÷ 40 = **unos 17 minutos**.
- El ATC anuncia 25 minutos de demora.
- **Conclusión:** no puedes esperar 25 minutos y conservar el alterno. Decides ahora: pides la causa y si la demora puede bajar, y fijas la salida hacia el alterno a los 17 minutos, o, si el destino tiene tiempo bueno y una hora de aproximación asignada, evalúas comprometerte según el MO. *Cifras ilustrativas.*

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Vista de planta de un circuito de espera junto a un reloj de arena con dos marcas: «combustible al entrar: 2.950 kg» arriba y «combustible para abandonar la espera hacia el alterno: 2.250 kg» abajo. Entre ambas, el tiempo disponible (17 min) y una flecha que sale de la espera hacia el alterno a la hora límite. Cifras rotuladas como ilustrativas. Formato horizontal, 1600 × 900 px.

OBJETIVO:
Enseñar a calcular el tiempo disponible en espera antes de aceptarla.

### En pocas palabras

- La espera consume sin acercarte: cada minuto es combustible y tiempo de decisión.
- Antes de entrar, calcula el combustible para abandonarla hacia el alterno.
- Tiempo disponible = (a bordo − para abandonar la espera) ÷ consumo en espera.
- Pide la hora prevista de aproximación y la causa de la demora.
- Si la demora supera tu tiempo disponible, decide ahora.

---

## 19. COMBUSTIBLE Y AEROPUERTO ALTERNO
**ID:** C19 · **Tiempo:** 6 min

### ¿Qué es?

Es la relación entre **destino, alterno, meteorología y combustible disponible**. El alterno solo es una opción mientras tengas combustible para llegar a él con la reserva final intacta y mientras su tiempo lo permita. Esa opción **se gasta**.

### Lo que debe saber un piloto

#### Todo vuelo llega con menos opciones de las que tenía al salir

El Doc 9976 lo dice así: todo vuelo, sin importar su duración, llega a las cercanías del destino con muchas menos opciones de las que tenía al salir. Lo que normalmente queda al llegar: el discrecional (si se cargó), la contingencia no usada, el previsto para factores conocidos (como demoras ATC), el combustible para la aproximación, el del alterno (si aplica) y la reserva final (Doc 9976, 6.4.24, Figura 6-4).

#### Las piezas de la decisión

- **Destino:** tiempo actual y tendencia, pista en uso, demoras.
- **Alterno:** su tiempo en la ventana de uso, su distancia y **si otros aviones también van hacia él**.
- **Combustible:** la predicción al destino contra alterno más reserva final.
- **Decisión:** desviarse, esperar o comprometerse con el destino.

#### Por qué esperar demasiado reduce tus opciones

1. Mientras esperas, gastas primero discrecional y contingencia.
2. Luego empiezas a gastar el combustible del alterno: **ya no llegarías a él con la reserva final**.
3. Desde ese momento estás obligado a aterrizar en el destino (committed), con todo lo que eso implica: combustible mínimo si cualquier cambio te deja bajo la reserva final.
4. Si además el alterno se llena de desvíos, su tiempo empeora o cierra, pierdes la opción aunque tengas combustible.

El Doc 9976 aconseja que, en muchos casos, lo mejor es **desviarse temprano**, antes de quemar el combustible de aproximación e incluso antes de consumir toda la contingencia, para no tener que elegir entre menos opciones más adelante (Doc 9976, 6.4.25 y 6.4.26).

#### «Desviarse o comprometerse» con el destino

Algunas autoridades y operadores permiten que el PIC **use el combustible del alterno para seguir hacia el destino o esperar en él**, cuando concluye que puede aterrizar allí con no menos de la reserva final. Las condiciones típicas son un aterrizaje asegurado en las condiciones actuales y previstas (incluida una falla probable de un equipo), o una hora prevista de aproximación asignada, o la demora máxima confirmada por el ATC (Doc 9976, 6.4.27 y 6.4.28).

**Depende de la norma y del MO de tu operador.** Y una vez comprometido, las reglas del capítulo 16 aplican de inmediato.

#### Cambiar de alterno en vuelo

Si el alterno planificado se deteriora, el despacho se puede enmendar en ruta para incluir otro alterno dentro del alcance del avión (121.2625 (b)(2)), y quien lo enmienda lo registra (121.2625 (i)). Coordínalo con el despachador.

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Línea de tiempo de la llegada a un destino con tres bandas de combustible que se van consumiendo de izquierda a derecha (discrecional y contingencia, luego alterno, al final reserva final). Sobre la línea, tres marcas: «desvío temprano: todas las opciones», «último momento para ir al alterno con reserva final» y, a partir de allí, «comprometido con el destino». Debajo, un aeropuerto alterno que se va llenando de íconos de aviones desviados. Formato horizontal, 1600 × 900 px.

OBJETIVO:
Mostrar por qué esperar demasiado en el destino reduce progresivamente las opciones del piloto.

### Aplicación operacional

- **Despacho:** evalúas el alterno como si lo fueras a usar: tiempo, distancia, capacidad y NOTAM.
- **Briefing de llegada:** cifra de abandono del destino y situación actualizada del alterno.
- **En vuelo:** pides el tiempo del alterno por VOLMET o ATC, y preguntas si otros aviones están desviándose allí.
- **Decisiones:** desviarte a tiempo no es un fracaso operacional: es gestión del combustible.

### Ejemplo

Tu destino tiene tormenta sobre el aeropuerto y el alterno planificado está a 25 minutos, con buen tiempo. En la frecuencia oyes que cuatro aviones ya pidieron desviarse a ese mismo alterno. Aunque tu combustible todavía cubre 10 minutos de espera, desviarte **ya** te pone delante de la fila; esperar 10 minutos puede dejarte detrás de ellos en un aeropuerto congestionado, con menos combustible. El 26 de julio de 2012, las tormentas de granizo en Madrid desviaron doce vuelos a Valencia, y cuatro de ellos declararon MAYDAY por combustible en unos 14 minutos (CIAIAC, informe IN-010/2010, que incorporó esos casos). *Ejemplo de práctica; el caso real se resume en el Anexo B.*

### En pocas palabras

- Todo vuelo llega con menos opciones de las que tenía al salir (Doc 9976).
- El alterno es una opción que se gasta: con combustible y con el tiempo.
- Desviarse temprano suele ser mejor que decidir tarde entre menos opciones.
- Comprometerse con el destino depende de la norma y del MO, y activa las reglas de combustible mínimo.
- Si el alterno se deteriora, enmienda el despacho y cámbialo (121.2625 (b)(2)).

---

## 20. PUNTO DE DECISIÓN
**ID:** C20 · **Tiempo:** 8 min

### ¿Qué es?

Son puntos de la ruta en los que el combustible define **qué opciones tienes a partir de allí**. Se confunden con frecuencia porque todos son «puntos». Aquí van separados, y solo los que usa un piloto de transporte aéreo.

### Lo que debe saber un piloto

#### Punto de decisión, nueva planificación en vuelo y redespacho

- **Qué es:** un punto en la ruta a partir del cual el vuelo continúa hacia su destino final solo si cumple los requisitos definidos, incluido el combustible. Si no los cumple, va a un destino intermedio o alterno designado. El Doc 9976 trata como sinónimos «punto de decisión», «punto de nueva planificación en vuelo», «re-release point» y «re-dispatch point» (Doc 9976, glosario).
- **En el RAC 121:** no se usa la palabra «punto de decisión». Se habla de **punto de nueva planificación en vuelo** (121.2645 (c)(2) y (c)(3)) y de **redespacho** o enmienda del despacho (121.2625). El procedimiento lo pone el MO (Apéndice 10, A9.3.9 (d)).
- **Por qué existe:** la contingencia se calcula sobre el combustible **desde ese punto** y no sobre todo el trayecto (121.2645 (c)(3)). Eso reduce el combustible que hay que cargar y permite llevar más carga en vuelos largos.
- **Qué se verifica en el punto:**
  1. Que el destino esté en o sobre sus mínimos a la hora prevista y cada alterno en o sobre sus mínimos de planificación (121.2625 (b)(1) y (b)(2)).
  2. Que el combustible a bordo cumpla trayecto desde ese punto, contingencias, alterno, reserva final y adicional si aplica (121.2645 (d)).
- **Si no se cumple:** el vuelo sigue al destino intermedio. El explotador puede fijar como destino del despacho un aeródromo de reabastecimiento autorizado (121.2625 (a)).
- **Registro:** quien enmienda el despacho en ruta lo registra (121.2625 (i)).

#### Nueva planificación en vuelo (replanning)

Más allá del procedimiento planificado, **todo uso del combustible para algo distinto de lo previsto exige un nuevo análisis** y, si corresponde, ajustar la operación (91.610 (b); Anexo 6, 4.3.6.7). Una rerruta larga, una espera no prevista o una falla que aumenta el consumo son motivos para replanificar desde donde estás.

#### Punto de no retorno (PNR)

- **Qué es:** el último punto geográfico desde el que el avión puede ir **tanto al destino como a un alterno en ruta disponible** (RAC 91, 91.001; Anexo 6, Capítulo 1).
- **Cuándo se usa:** en vuelos a **aeródromos aislados**, donde se determina en cada vuelo y no se sigue más allá sin información actualizada que indique un aterrizaje seguro (Anexo 6, 4.3.4.3.1 b)), y en helicópteros hacia plataformas en el mar (91.605). **El RAC 121 no usa el concepto de aeródromo aislado** (121.001), así que en la operación doméstica colombiana es sobre todo materia de examen teórico y de operaciones internacionales.
- **Cálculo de examen (ATPL):** con autonomía E (h), velocidad sobre el terreno de ida O y de regreso H, el tiempo hasta el PNR, cuando la opción de regreso es el aeródromo de salida, es **E × H ÷ (O + H)**, con E la autonomía disponible sin las reservas. El Doc 9976 advierte que el PNR real suele quedar más tarde que el del OFP, por lo que la tripulación necesita un medio práctico para recalcularlo en vuelo (Doc 9976, 4.10.4 y 4.10.5).

#### Punto crítico o punto de igual tiempo (CP o ETP)

- **Qué es:** el punto de la ruta desde el cual se tarda **lo mismo** en seguir hasta un aeródromo por delante que en volver a otro por detrás.
- **Para qué sirve:** planificar qué hacer ante una falla de motor, una despresurización o una emergencia médica en vuelos sobre agua, zonas remotas o EDTO. **No es un límite de combustible:** es un punto de tiempo.
- **Cálculo de examen (ATPL):** con distancia total D, la distancia al CP desde la salida es **D × H ÷ (O + H)**, con O y H como en el PNR.
- La OACI no lo define en el Anexo 6; es un concepto de planificación y de entrenamiento teórico.

#### Para no mezclarlos

| Concepto | Pregunta que responde | Depende de | En Colombia (RAC 121) |
|---|---|---|---|
| Punto de decisión / nueva planificación en vuelo | ¿Sigo al destino final o voy al intermedio? | Combustible, meteorología y mínimos | Sí, por redespacho según el MO |
| Nueva planificación en vuelo (replanning) | ¿El plan todavía se cumple? | Cualquier cambio del consumo | Siempre |
| PNR | ¿Hasta dónde puedo volver o ir al alterno en ruta? | Autonomía y viento | Aeródromos aislados: no se usan |
| CP / ETP | ¿Qué aeródromo está más cerca en tiempo si algo falla? | Tiempo y viento | Planificación de fallas en rutas remotas y EDTO |

[ESPACIO PARA IMAGEN]

IMAGEN SUGERIDA:
Ruta horizontal de origen a destino final con un destino intermedio (aeródromo de reabastecimiento) debajo de la línea. Sobre la ruta, un rombo rotulado «punto de decisión / nueva planificación en vuelo». Antes del rombo, una zona sombreada «opciones: seguir o desviarse al intermedio». Después, dos flechas: «combustible suficiente → destino final» y «combustible insuficiente → destino intermedio». En una segunda línea más pequeña, la misma ruta con los símbolos del PNR y del CP para compararlos. Formato horizontal, 1600 × 900 px.

OBJETIVO:
Facilitar la comprensión espacial de la toma de decisiones relacionada con combustible.

### Aplicación operacional

- **Planificación y despacho:** si el OFP tiene punto de decisión, identificas el destino intermedio y el combustible exigido en el punto.
- **Briefing:** «en el punto X necesitamos Y kg; si no, vamos a Z».
- **En vuelo:** llegando al punto, haces un fuel check completo, revisas la meteorología y coordinas con el despachador.
- **Decisiones:** la decisión en el punto es binaria y está preparada: no se improvisa.

### Ejemplo

Un vuelo largo se despacha con punto de decisión a 2 horas del destino final, con un destino intermedio a 20 minutos del punto. Al llegar al punto, el viento de cara fue mayor que el pronosticado. El fuel check muestra 300 kg menos de lo requerido para seguir al destino final con todos sus componentes. La decisión preparada es clara: se aterriza en el intermedio para cargar combustible, y el despachador reprograma. *Ejemplo de práctica, cifras ilustrativas.*

### En pocas palabras

- Punto de decisión, punto de nueva planificación en vuelo y redespacho son lo mismo en la práctica (Doc 9976); el RAC 121 usa los dos últimos.
- La contingencia se calcula desde el punto de nueva planificación: por eso se ahorra combustible.
- En el punto se verifican meteorología, mínimos y el combustible requerido (121.2625 (b)(1) y (b)(2); 121.2645 (d)).
- El PNR es para aeródromos aislados; en el RAC 121 no se usan.
- El CP o ETP es un punto de tiempo para planificar fallas, no un límite de combustible.

---

## 21. FACTORES QUE INCREMENTAN EL CONSUMO
**ID:** C21 · **Tiempo:** 5 min

### ¿Qué es?

Son las condiciones que hacen que el avión queme más combustible del que el plan preveía. El Doc 9976 menciona entre las causas típicas un peso sin combustible mayor, un rodaje más largo, rutas más largas, un nivel o una velocidad de crucero menos favorables y vientos peores que los pronosticados (Doc 9976, 6.4.5).

### Lo que debe saber un piloto

| Factor | Por qué aumenta el consumo | Qué hacer |
|---|---|---|
| **Mayor peso** | Más sustentación requerida, más resistencia y un nivel óptimo más bajo. Airbus estima cerca de 1 % menos alcance específico por cada 1 % de la masa máxima de despegue añadido | Verifica la masa real frente a la planificada |
| **Viento de frente** | Menos velocidad sobre el terreno: más tiempo para la misma distancia | Revisa los vientos reales y considera otro nivel |
| **Temperatura** | Una desviación respecto a la atmósfera estándar cambia el empuje necesario y la performance | El OFP la incluye; vigila los cambios |
| **Altitud** | Lejos del nivel óptimo, los motores y el avión son menos eficientes | Pide el nivel óptimo cuando se pueda |
| **Turbulencia** | Cambios de velocidad y de nivel, a veces un nivel más bajo | Plan de nivel alternativo |
| **Antihielo** | El antihielo de motores y alas aumenta el consumo; por eso entra en el cálculo del combustible crítico EDTO (121.2581 (b)(5)(iii)) | Considéralo en la predicción cuando lo uses por tiempo prolongado |
| **Configuración** | Flaps o tren extendidos antes de tiempo aumentan la resistencia; un ítem de MEL o CDL puede penalizar el consumo | Revisa la penalización en el OFP (121.2645 (b)(2)(v)) |
| **Desvíos** | Rutas más largas por meteorología o por tránsito | Actualiza el FMS |
| **Esperas** | Consumo sin avance | Capítulo 18 |
| **Aproximaciones frustradas** | Ascenso con mucho empuje y un nuevo circuito completo | Capítulo 22 |
| **ATC** | Niveles restringidos, vectores, restricciones de velocidad | Pide alternativas y actualiza la predicción |
| **Operación a baja altitud** | Los reactores son mucho menos eficientes cerca del suelo; un segmento largo a baja altura cuesta caro | Evita nivelar bajo cuando se pueda; pide descenso continuo |

No hace falta memorizar cifras de cada factor. Lo importante es **reconocerlos a tiempo** y **ver su efecto en el fuel check y en la predicción**.

### Aplicación operacional

- **Planificación:** identificas cuáles de estos factores ya están en el OFP y cuáles podrían aparecer.
- **Briefing:** comentas los que pueden cambiar el vuelo de hoy: hielo, tormentas, restricciones ATC conocidas.
- **En vuelo:** cuando aparece uno, haces un fuel check y actualizas la predicción.
- **Decisiones:** varios factores pequeños juntos pueden comerse la contingencia sin que ninguno parezca grave.

### Ejemplo

En un mismo vuelo: 15 minutos a un nivel más bajo por tránsito, 10 minutos de antihielo en descenso, vectores que alargan la llegada y una espera de 5 minutos. Ninguno parece grave, pero sumados pueden superar la contingencia completa: la espera sola ya equivale a su piso de 5 minutos. *Ejemplo de práctica.*

### En pocas palabras

- Peso, viento, temperatura, altitud, turbulencia, antihielo, configuración, desvíos, esperas, frustradas, ATC y baja altitud aumentan el consumo.
- Varios factores pequeños juntos se comen la contingencia.
- No memorices cifras: reconoce el factor y míralo en el fuel check.
- A baja altitud, los reactores gastan mucho más.

---

## 22. GO-AROUND Y COMBUSTIBLE
**ID:** C22 · **Tiempo:** 5 min

### ¿Qué es?

Una aproximación frustrada (go-around) consume combustible en el ascenso con mucho empuje, en el nuevo circuito y en la nueva aproximación. En un vuelo con poco margen, **un solo sobrepaso puede cambiar todas las opciones**.

### Lo que debe saber un piloto

#### Cómo está planificado

- El combustible para el alterno **incluye una aproximación frustrada en el destino** (121.2645 (c)(4)(i)(A)). Es decir, el plan prevé **un** sobrepaso seguido de desvío al alterno.
- **Un segundo intento en el destino no está planificado**: sale del margen (contingencia y discrecional) o, si ya no hay, del combustible del alterno.

#### Qué combustible necesitas después de un sobrepaso

- Para **otra aproximación en el destino:** el circuito o los vectores, la aproximación y el aterrizaje, más la reserva final. Y, si quieres conservar el alterno, además el combustible para ir allí.
- Para **ir al alterno:** el ascenso, la ruta, el descenso y la aproximación, más la reserva final.

#### Anticipar antes de empezar la aproximación

Antes de iniciar la aproximación, la tripulación debe saber:
1. **Con cuánto combustible quedará** si hace un sobrepaso.
2. Si con eso **alcanza para otra aproximación** o **solo para el alterno**.
3. **Cuál es la decisión** después de un sobrepaso: otro intento o desvío.

El Doc 9976 sugiere que a veces la mejor decisión de desvío se toma **antes** de quemar el combustible de aproximación (Doc 9976, 6.4.26).

### Aplicación operacional

- **Briefing de aproximación:** «si hacemos sobrepaso, quedamos con X kg; con eso vamos al alterno» (o «hacemos un segundo intento y luego alterno»).
- **Durante la aproximación:** no se cambia la decisión acordada sin una razón nueva.
- **Tras el sobrepaso:** fuel check inmediato, predicción al alterno y comunicación clara con el ATC. Si la predicción queda cerca de la reserva final, aplica el capítulo 16 o el 17.
- **Anormales:** un sobrepaso por cortante de viento o por pista ocupada no cambia la cuenta. El combustible es el mismo.

### Ejemplo

En 1990, la tripulación del vuelo Avianca 052 hizo una aproximación frustrada en Nueva York después de más de una hora de esperas, y los motores se apagaron por falta de combustible mientras maniobraba para el segundo intento. La NTSB señaló que la cortante de viento, la fatiga y el estrés contribuyeron a que el primer intento no se completara, y que la tripulación no usó el sistema de despacho de la aerolínea para ayudarse ni comunicó una emergencia de combustible a tiempo (NTSB AAR-91/04). La pregunta «¿con cuánto quedamos si hacemos sobrepaso?» debe estar respondida antes de empezar la aproximación.

### En pocas palabras

- El alterno incluye **un** sobrepaso en destino; el segundo intento no está planificado.
- Antes de aproximar: ¿con cuánto quedo tras un sobrepaso, y qué hago?
- Tras el sobrepaso: fuel check, predicción al alterno y decisión.
- A veces la mejor decisión de desvío es antes de la aproximación.

---

## 23. ESCENARIOS PRÁCTICOS
**ID:** C23 · **Tiempo:** 15 min

Los escenarios son **de práctica**: no describen vuelos reales ni operadores reales. Las cifras son ilustrativas. Lo que se entrena es el razonamiento.

### Escenario 1 · La espera que se come la reserva

**Situación.** Una aeronave se aproxima al destino y el ATC informa una demora estimada de 25 minutos. La predicción indica que, después de la espera, el combustible al aterrizaje se acercará a la reserva final.

**Pregunta.** ¿Qué elementos debería evaluar la tripulación antes de aceptar la espera?

**Razonamiento operacional.**
- **Cuánto tiempo puede esperar de verdad:** (combustible a bordo − combustible para abandonar la espera hacia el alterno) ÷ consumo en espera. Si es menor que 25 minutos, aceptar la espera completa significa renunciar al alterno.
- **La causa y la certeza de la demora:** ¿es una estimación o una hora prevista de aproximación asignada? ¿La causa se está resolviendo?
- **El alterno:** tiempo, distancia y si otros vuelos ya se desvían allí.
- **La norma:** si la predicción al destino queda bajo alterno más reserva final, se piden demoras (121.2553 (b)(1)). Si la tripulación se compromete con el destino y cualquier cambio la dejaría bajo la reserva final, declara combustible mínimo (121.2553 (b)(2)).
- **La decisión con hora:** «esperamos hasta las HH:MM; si no hay aproximación, salimos al alterno». Esperar sin hora de salida deja la decisión para cuando ya no hay opciones.

### Escenario 2 · Rodaje interminable

**Situación.** Hay una cola de 20 aviones para despegar. El rodaje planificado era 200 kg y ya llevas 450 kg.

**Pregunta.** ¿Puedes despegar?

**Razonamiento.** Lo que decide no es el block fuel, sino el **combustible requerido para despegar**: trayecto, contingencias, alterno, reserva final y adicional (121.2645 (d)). Si el FOB en cabecera está por debajo, no se despega: se regresa a cargar o se replanifica según el MO. Si está por encima, calcula cuánto margen propio te queda (con el vuelo de referencia, ya se fueron 250 de los 300 kg del discrecional). El Doc 9976 trata el uso de la contingencia en tierra como un evento que obliga a un nuevo análisis (Doc 9976, 6.4.10).

### Escenario 3 · La suma que no cuadra

**Situación.** En crucero, el fuel check muestra 200 kg menos que el plan. Treinta minutos después, 450 kg menos. La suma FOB + FU es 250 kg menor que el combustible al poner en marcha, y la diferencia crece.

**Pregunta.** ¿Es consumo o es otra cosa?

**Razonamiento.** El consumo alto hace que el FOB baje, pero **la suma FOB + FU sigue cuadrando**. Si la suma no cuadra y la diferencia crece, hay combustible que sale del avión sin pasar por los motores: **posible fuga**. Se aplica el procedimiento de fuga del QRH de tu avión, no la intuición. En 2001, la tripulación del Airbus A330 del vuelo Air Transat 236 aplicó de memoria un procedimiento de desbalance de combustible en lugar del de fuga, y así terminó alimentando la fuga; el avión planeó hasta Lajes, en las Azores (GPIAA, informe 22/ACCID/GPIAA/2001). Después, predicción al aeródromo adecuado más cercano y decisión temprana.

### Escenario 4 · El alterno se cae

**Situación.** A mitad de ruta, el TAF del alterno se enmienda con niebla a tu hora de llegada. El destino sigue con buen tiempo, pero con una sola pista.

**Pregunta.** ¿Qué haces?

**Razonamiento.** Un alterno pronosticado bajo mínimos a tu hora de llegada ya no te protege. Coordinas con el despachador para **enmendar el despacho en ruta** con otro alterno dentro del alcance del avión (121.2625 (b)(2)), lo registras (121.2625 (i)) y recalculas: el nuevo alterno puede estar más lejos y pedir más combustible. Si con el nuevo alterno la predicción al destino queda bajo alterno más reserva final, ya estás en la línea de pedir demoras (121.2553 (b)(1)).

### Escenario 5 · Sobrepaso con techo bajo

**Situación.** Haces una aproximación con techo en mínimos y no ves la pista: sobrepaso. El combustible queda algo por encima del necesario para ir al alterno con la reserva final.

**Pregunta.** ¿Segundo intento o alterno?

**Razonamiento.** El plan cubre **un** sobrepaso y el desvío. Un segundo intento solo tiene sentido si hay una razón concreta para que salga distinto (el tiempo está mejorando según el último reporte, otra pista con mínimos más bajos) **y** si después de ese segundo sobrepaso todavía llegarías al alterno con la reserva final intacta. Si no se cumplen las dos cosas, la decisión es el alterno, y cuanto antes, mejor.

### Escenario 6 · Todos al mismo alterno

**Situación.** Tormentas sobre el destino. En la frecuencia se escucha que varios aviones piden desviarse a tu mismo alterno. Todavía tienes 10 minutos de margen para esperar.

**Pregunta.** ¿Esperas o te desvías?

**Razonamiento.** El combustible para el alterno se calculó para un aeropuerto sin congestión. Si llegan varios desvíos, allí también habrá espera. Desviarte temprano te pone al comienzo de la fila; esperar 10 minutos puede ponerte al final, con menos combustible. Pregunta al ATC por la situación del alterno y considera un segundo alterno. Si al llegar al alterno tu predicción cae hacia la reserva final, aplican los pasos de la norma: combustible mínimo y, si hace falta, MAYDAY.

### Escenario 7 · El nivel que te ofrecen

**Situación.** El ATC te ofrece FL 250 en vez del FL 370 planificado para el resto del crucero, por tránsito. La contingencia está casi intacta.

**Pregunta.** ¿Aceptas?

**Razonamiento.** Un nivel más bajo aumenta el consumo. Antes de aceptar, calcula el impacto con el FMS o las tablas: ¿cuánto baja la predicción al destino? Si queda con margen sobre alterno más reserva final, se puede aceptar, y se puede pedir el nivel óptimo más adelante. Si el impacto se come la contingencia completa, pide un nivel intermedio, una ruta alternativa o explica tu restricción al ATC. **No es una decisión de comodidad: es de combustible.**

### Escenario 8 · La carga que no cuadra

**Situación.** Antes de la salida, el proveedor reporta la carga en litros. Al convertirla con la densidad del día, la cifra no coincide con el aumento del FOB en los indicadores.

**Pregunta.** ¿Qué haces?

**Razonamiento.** Se planifica en masa y se carga en volumen. Si la conversión no cuadra con los indicadores, puede haber un error de unidades, de densidad o de indicación. **No se sale hasta aclararlo** según el procedimiento de tu operador. En 1983, el Boeing 767 del vuelo Air Canada 143 salió con mucho menos combustible del necesario porque en el cálculo se usó un factor de conversión en libras como si fuera en kilos, y además con los indicadores de cantidad inoperativos. Terminó planeando hasta Gimli (Junta de Investigación presidida por el juez G. H. Lockwood, 1985).

### Escenario 9 · La pista que cierra

**Situación.** Estás comprometido con el destino y declaraste combustible mínimo. Justo antes de tu aproximación, un avión se sale de la pista y la cierran por tiempo indefinido.

**Pregunta.** ¿Qué haces y qué dices?

**Razonamiento.** Calcula el combustible con el que aterrizarías en el **aeródromo más cercano donde puedas aterrizar con seguridad**. Si es menor que la reserva final prevista, la norma exige declarar «MAYDAY, MAYDAY, MAYDAY, COMBUSTIBLE» (121.2553 (b)(3)). Informa tu intención y tu autonomía en minutos. La emergencia te da prioridad, te abre opciones y le da más flexibilidad al ATC (Doc 9976, 6.9.3). Después viene el reporte escrito de 121.2300 y, si corresponde, la comunicación con la autoridad de investigación (RAC 114).

### Escenario 10 · El vuelo que no cabía

**Situación.** Un vuelo no regular se planifica directo entre dos aeropuertos. El combustible requerido (trayecto, contingencias, alterno y reserva final) es mayor que la capacidad de los tanques del avión.

**Pregunta.** ¿Qué dice la norma y qué debe decir el PIC?

**Razonamiento.** No hay forma legal de hacer ese vuelo directo: el avión no despega sin el combustible requerido (121.2645 (d)). Se planifica con una parada intermedia de reabastecimiento. En 2016, el Avro RJ85 del vuelo LaMia 2933 salió de Santa Cruz hacia Rionegro con 9.073 kg de combustible, cuando el vuelo requería al menos 12.052 kg, más que la capacidad de sus tanques (9.362 kg). Los motores se apagaron en la espera. El informe de la Aerocivil señaló, entre otros factores, la pérdida de conciencia situacional y la fijación de la tripulación en continuar con combustible extremadamente limitado, y la solicitud tardía de prioridad y de emergencia (Aerocivil, informe final COL-16-37-GIA).

---

## LO QUE DEBES RECORDAR SOBRE GESTIÓN DEL COMBUSTIBLE

1. **La gestión del combustible dura todo el vuelo.** El despacho es el comienzo, no el final.
2. **La pregunta es «¿con cuánto aterrizo, y dónde?»**, no «¿cuánto tengo?».
3. **Conoce cada componente**: rodaje, trayecto, contingencias, alterno, reserva final, adicional y discrecional (121.2645 (c)).
4. **El requerido para despegar** es trayecto, contingencias, alterno, reserva final y adicional. Sin él, no se despega ni se sigue desde un punto de nueva planificación (121.2645 (d)).
5. **La contingencia es para lo imprevisto**: 5 % del trayecto, nunca menos de 5 minutos de espera a 1.500 ft sobre el destino (121.2645 (c)(3)).
6. **Lo previsible va en el plan o como extra**, no en la contingencia.
7. **El discrecional es decisión del PIC** (121.2645 (c)(7)), y más combustible también cuesta.
8. **El alterno es una opción que se gasta**: mientras lo conservas, tienes dos caminos.
9. **La reserva final es una barrera**: 30 minutos de espera a 1.500 ft en turbina, no se planifica para consumirla y no admite variaciones.
10. **Vigila de forma continua** que puedes llegar a un aeródromo con la reserva final intacta (121.2553 (b)).
11. **Haz el fuel check** en los puntos del MO y después de cada evento que cambie el consumo.
12. **FOB + FU debe cuadrar** con el combustible al poner en marcha; si no, piensa en fuga.
13. **Decide con predicciones actualizadas**, no con el FOB del momento.
14. **Escalera de la norma**: pedir demoras, «COMBUSTIBLE MÍNIMO», «MAYDAY, MAYDAY, MAYDAY, COMBUSTIBLE» (121.2553 (b)(1) a (3)).
15. **Combustible mínimo no es emergencia** ni da prioridad; MAYDAY sí.
16. **Usa las palabras exactas** e informa la autonomía en tiempo.
17. **Antes de aceptar una espera**, calcula cuánto puedes esperar y a qué hora sales.
18. **Antes de aproximar**, sabe con cuánto quedas si haces sobrepaso.
19. **Desviarse temprano** suele ser la mejor decisión: todo vuelo llega con menos opciones de las que tenía al salir.
20. **Manda el MO de tu aerolínea**: la norma es el piso.

---

## ERRORES COMUNES

- **Confundir block fuel con takeoff fuel.** El block fuel incluye el rodaje; el de despegue no. La masa de despegue se calcula con el de despegue.
- **Confundir contingency fuel con extra fuel.** La contingencia cubre lo imprevisto y la fija la norma; el extra cubre lo previsible y lo decide el PIC (o la política del operador).
- **Considerar la reserva final como combustible disponible.** No son «30 minutos que me sobran»: son los 30 minutos que deben quedar al aterrizar.
- **Declarar combustible mínimo demasiado tarde.** Si ya estás obligado a un aeródromo y cualquier cambio te deja bajo la reserva final, se declara en ese momento; tarde, el ATC ya no puede planear tu llegada.
- **No actualizar la predicción.** El FMS predice con la ruta, los vientos y las restricciones que tiene cargados; si no los actualizas, decides con cifras falsas.
- **Centrarse solo en el combustible total.** El FOB no te dice la tendencia, ni si alcanza para el alterno, ni si hay una fuga.
- **Aceptar demoras del ATC sin evaluar sus consecuencias.** Cada espera aceptada sin hora de salida consume margen y opciones.
- **Retrasar la decisión de desviarse.** Esperar a «ver si mejora» mientras se consume el combustible del alterno te deja con una sola opción.
- **Usar frases no normalizadas.** «Estamos cortos de combustible» no activa nada; «COMBUSTIBLE MÍNIMO» y «MAYDAY COMBUSTIBLE» sí.
- **Olvidar el rodaje en la prueba de la suma.** FOB + FU se compara con el combustible al poner en marcha, no con el de despegue.
- **Tratar la contingencia como intocable.** Está hecha para usarse; lo que importa es el ritmo al que se consume y qué decides cuando se acaba.
- **Confundir el PNR con el CP.** El PNR depende de la autonomía y marca hasta dónde puedes volver o ir al alterno en ruta; el CP es un punto de igual tiempo para planificar fallas.

---

# ANEXO A · FIGURAS (15)

Todas van a `public/modulos/combustible/` (no a `assets`), según las reglas del repo. Las cifras que aparezcan en una figura deben rotularse como ilustrativas.

| Id | Capítulo | Figura | Formato |
|---|---|---|---|
| IMG-C01 | C01 | Proceso continuo de gestión: despacho, briefing, carga, fuel checks, predicción, decisión y aterrizaje | 1600 × 900 |
| IMG-C02 | C02 | Tanques con combustible total, utilizable y no utilizable | 1600 × 900 |
| IMG-C03 | C03 | Barra acumulativa de los siete componentes, con el requerido para despegar | 900 × 1400 |
| IMG-C04 | C04 | Bloques «suma» hasta el block fuel, y las dos restas (despegue y aterrizaje) | 1600 × 900 |
| IMG-C05 | C05 | Perfil del vuelo: qué fases son trip fuel y cuáles no | 1600 × 700 |
| IMG-C06 | C06 | Consumo real frente al planificado por desvío, viento y nivel: la contingencia | 1600 × 900 |
| IMG-C07 | C07 | Las cinco partes del combustible para el alterno | 1600 × 900 |
| IMG-C08 | C08 | Indicador con la reserva final como barrera y los tres avisos | 900 × 1400 |
| IMG-C11 | C11 | Vuelo normal frente a vuelo con tankering | 1600 × 900 |
| IMG-C12 | C12 | Tabla de fuel check: waypoint, planificado, real y diferencia | 1600 × 900 |
| IMG-C16 | C16 | Progresión: normal, pedir demoras, combustible mínimo, MAYDAY | 1600 × 900 |
| IMG-C17 | C17 | Escala de tres estados con la fraseología exacta | 1600 × 600 |
| IMG-C18 | C18 | Tiempo disponible en espera antes de aceptarla | 1600 × 900 |
| IMG-C19 | C19 | Opciones que se pierden al esperar en destino; alterno que se congestiona | 1600 × 900 |
| IMG-C20 | C20 | Punto de decisión con destino intermedio, y comparación con PNR y CP | 1600 × 900 |

---

# ANEXO B · CASOS CON INFORME OFICIAL

Solo casos con informe oficial publicado. Se resume lo que el informe establece; no se agregan detalles.

| Caso | Qué pasó | Lo que enseña | Informe |
|---|---|---|---|
| **United 173**, DC-8, Portland, 28 de diciembre de 1978 | Cerca de una hora en espera resolviendo una falla del tren; extinción del combustible en todos los motores | La NTSB determinó que el comandante no vigiló el estado del combustible ni respondió a los avisos de la tripulación. La NTSB recomendó formar a las tripulaciones en gestión de recursos de cabina (CRM) | NTSB AAR-79-07 |
| **Air Canada 143**, Boeing 767, Gimli, 23 de julio de 1983 | Salió con los indicadores de cantidad inoperativos y con un cálculo de carga que usó un factor en libras como si fuera en kilos; se quedó sin combustible y planeó hasta Gimli | Masa, volumen y densidad; verificar la carga por dos caminos | Junta de Investigación (juez G. H. Lockwood), informe final de 1985 |
| **Avianca 052**, Boeing 707, Cove Neck (Nueva York), 25 de enero de 1990 | Más de una hora de esperas; aproximación frustrada; extinción del combustible maniobrando para el segundo intento | Causa probable: no manejar adecuadamente el combustible y no comunicar una emergencia de combustible al ATC a tiempo. Contribuyeron no usar el despacho de la aerolínea y la falta de terminología normalizada | NTSB AAR-91/04 |
| **Air Transat 236**, Airbus A330, Lajes (Azores), 24 de agosto de 2001 | Fuga de combustible tras un cambio de motor mal hecho; la tripulación aplicó de memoria el procedimiento de desbalance y alimentó la fuga; planeó hasta Lajes | FOB + FU; aplicar el procedimiento de fuga del QRH | GPIAA, 22/ACCID/GPIAA/2001 |
| **Desvíos a Valencia**, 26 de julio de 2012 | Tormentas de granizo en Madrid desviaron doce vuelos a Valencia; cuatro declararon MAYDAY por combustible entre las 21:00 y las 21:14 UTC | Alternos congestionados; decidir temprano | CIAIAC, informe IN-010/2010 (apartado 1.9, que incorpora estos casos) |
| **LaMia 2933**, Avro RJ85, La Unión (Antioquia), 28 de noviembre de 2016 (hora local) | Despegó con 9.073 kg cuando el vuelo requería al menos 12.052 kg, más que la capacidad de sus tanques (9.362 kg); los motores se apagaron en espera | Un vuelo que no cabe no se hace; la fijación en continuar y la declaración tardía de prioridad y de emergencia | Aerocivil, informe final COL-16-37-GIA |

---

# ANEXO C · FUENTES

**Colombia (Aerocivil)**, textos oficiales descargados de https://www.aerocivil.gov.co/autoridad_aeronautica/normatividad/13-reglamentos-aeronauticos-de-colombia-rac:
- RAC 121, Enmienda 10 (Resolución 01983 del 31 de julio de 2025): 121.001, 121.2215, 121.2300, 121.2553, 121.2581, 121.2585, 121.2625, 121.2645, 121.2705, 121.2825; Apéndice 10.
- RAC 91, Enmienda 12 (julio de 2026): 91.001, 91.600, 91.605, 91.610, 91.637, 91.2012, 91.2013.
- RAC 114, Enmienda 3 (abril de 2022): 114.335; Adjunto C, literal o).
- RAC 211, Enmienda 6 (noviembre de 2025): 211.360 (a) y 211.720 (c)(2). No trae reglas de combustible mínimo ni de MAYDAY por combustible.

**OACI**:
- Anexo 6, Parte I: 12.ª edición en inglés (2022) y 11.ª edición en español (2018); 4.3.4.3, 4.3.6 y 4.3.7.
- Doc 4444, PANS-ATM: 16.ª edición en inglés y 15.ª en español; 10.2.5, 12.3.1.3, 15.1.1.2 y 15.5.4.
- Doc 9976, Manual de planificación de vuelo y gestión del combustible (FPFM), 1.ª edición (2015): 4.10, 6.4, 6.6 a 6.10 y glosario.

**EASA**: Reglamento (UE) 965/2012, modificado por el Reglamento de Ejecución (UE) 2021/1296 (aplicable desde el 30 de octubre de 2022): CAT.OP.MPA.180, 181, 182 y 185, con sus AMC y GM (ED Decision 2022/005/R).

**FAA**: 14 CFR 121.631, 121.639, 121.641, 121.645, 121.647, 91.151 y 91.167; AIM 5-5-15; Pilot/Controller Glossary; InFO 08004 (2008).

**Industria**:
- Airbus, *Getting to Grips with Fuel Economy*, Issue 4 (octubre de 2004).
- Airbus, *Safety First*, «Fuel Leak Management in Flight» (septiembre de 2025).
- Boeing, AERO Q4 2007, «Fuel Conservation Strategies: Cruise Flight».
- Boeing Flight Operations Engineering (Anderson), taller OACI de combustible y emisiones, 2006.
- EUROCONTROL, *Think Paper #1: Fuel Tankering* (junio de 2019).
- Reglamento (UE) 2023/2405 (ReFuelEU Aviation), artículo 5.

**Informes de investigación**: NTSB AAR-79-07; Junta de Investigación del vuelo Air Canada 143 (1985); NTSB AAR-91/04; GPIAA 22/ACCID/GPIAA/2001; CIAIAC IN-010/2010; Aerocivil COL-16-37-GIA.

---

# ANEXO D · NOTAS DE VERIFICACIÓN (no van a la app)

- **Textos OACI.** Se leyeron copias alojadas por terceros; en la app se parafrasea. La 11.ª edición en español del Anexo 6 dice «sobre la elevación del aeródromo de destino» en la reserva final y en el adicional; el inglés dice solo «above aerodrome elevation». El módulo usa el RAC 121, que dice «sobre la elevación del aeródromo».
- **Fraseología en español.** Tomada del Doc 4444 en español (15.ª edición, Enmiendas 4 a 6) y del Anexo 6 en español. Confirmar contra la edición vigente antes de grabar audio.
- **Definición del RAC 91.** La definición de «Declaración de MAYDAY Combustible» en 91.001 (opciones reducidas a un lugar; parte de la reserva final podría consumirse), que repite la Nota 1 de 91.637 (c), describe lo que informa la declaración, no el criterio para hacerla (aterrizaje calculado bajo la reserva final en el aeródromo más cercano, 91.637 (c) y Anexo 6). El módulo usa 121.2553 (b)(3).
- **91.2013 (d)** omite «menos del» en la regla de combustible mínimo; su Nota y 91.637 (b) lo traen. Probable error de redacción del original.
- **91.2012 (c)(3)** (Parte 2 del RAC 91) fija la contingencia en «no inferior al 5 %» sin el piso de 5 minutos; el RAC 121 sí trae el piso. El módulo enseña el RAC 121.
- **RAC 1.** Sus definiciones de combustible (básico, contingencia del 10 %, sostenimiento, mínimo) son de 2004 y usan la terminología antigua; para aerolínea prevalecen las del RAC 121 (RAC 1, 1.2). No se usan en el módulo. El Apéndice 10, B6.3 del RAC 121 repite esos términos antiguos en la lista de contenido del MO.
- **Intervalo del fuel check.** El RAC 121 no lo fija; se dan como referencia EASA (60 min) y Airbus (cada punto o 30 min).
- **Cifras de fabricantes.** La de Airbus para el A320 (unos 82 kg cada 1.000 NM por tonelada extra) sale de una tabla de 2004; varía por versión de avión y de motor.
- **No usado por no verificado:** la regla de «3 a 4 % del extra por hora», un estudio propio de EASA sobre tankering, el texto vigente de la FAA 8900.1 sobre redespacho, el Doc 9432 y la definición OACI de punto crítico (no existe en el Anexo 6).
- **«Committed to land»** no tiene definición propia en el Anexo 6; su sentido sale de la Nota de 4.3.7.2.2, del Doc 4444 y del Doc 9976. «Desviarse o comprometerse» (capítulo 19) depende de la aprobación de la autoridad y del MO; el RAC 121 no lo describe.
- **Fórmulas del PNR y del CP.** Son las de la formación teórica (ATPL); la del CP es la igualdad de tiempos. Contrastar con el texto de la escuela o de la aerolínea que use Aviatory.
- **Tablas 6-3 y 6-4 del Doc 9976**: son «EXAMPLE ONLY»; no se usaron.
- **Ejemplos.** Todas las cifras del vuelo de referencia y de los escenarios son ilustrativas.
- **Pendiente para implementar** (no pedido en esta entrega): quiz por capítulo, banco de evaluación en `contenido/bancos/` y preguntas de entrevista. Por la regla del repo, las preguntas de evaluación no van en el bundle.

# AVIATORY · INGRESO A AEROLÍNEA → PERFORMANCE
## Contenido completo del módulo (fuente para implementación)

**Versión:** 1.0 · 24 de septiembre de 2026
**Autor del contenido:** Camilo Osorio Cárdenas (criterio técnico) · estructuración asistida
**Nivel:** piloto comercial / aspirante a aerolínea. Punto de referencia: por encima del CPL, por debajo de un curso de ingeniería de performance.
**Alcance:** aeronaves de categoría transporte (Airbus, Boeing, Embraer y similares). **No** es un módulo de aviación general.
**Enfoque:** comprensión → aplicación → entrevista técnica + examen de conocimientos.
**Idioma:** español. Los términos estándar en inglés se conservan, con su equivalente en español la primera vez.

---

## 0. FICHA DEL MÓDULO

| Campo | Valor |
|---|---|
| Ruta en la app | Ingreso a aerolínea → Performance |
| Clave de módulo | `performance` |
| Lecciones (teoría) | 38 temas agrupados en 6 niveles (ver más abajo) |
| Práctica | Escenarios operacionales (10 casos, `esc-01` a `esc-10`) · Errores de entrevista (14 fichas) |
| Imágenes | 20 figuras (`PERF-01` a `PERF-20`), ver Anexo A |
| Tiempo estimado | 38 temas × 3–5 min + práctica ≈ 3 a 4 h |

### Agrupación en niveles

| Nivel | Título | Temas |
|---|---|---|
| 1 | Qué es y qué la afecta | 1 a 3 |
| 2 | El despegue y sus velocidades | 4 a 9 |
| 3 | Después de soltar el suelo | 10 a 15 |
| 4 | El peso que de verdad puedes llevar | 16 a 24 |
| 5 | Ruta y aterrizaje | 25 a 34 |
| 6 | El cálculo en la vida real | 35 a 38 |

### Convenciones de bloques (para la implementación)

Cada tema usa la misma plantilla. No todos los bloques aparecen en todos los temas.

| Marca en este documento | Bloque en la interfaz | Uso |
|---|---|---|
| `¿QUÉ ES?` | Texto principal | Definición en dos o tres frases |
| `LO QUE DEBE SABER UN PILOTO` | Texto principal | El desarrollo, corto o medio |
| `APLICACIÓN EN AEROLÍNEA` | Bloque con borde lateral | Cómo aparece en una operación real |
| `EJEMPLO` | Bloque de caso | Un caso concreto, solo cuando aclara |
| `EN POCAS PALABRAS` | Tarjeta de cierre | 3 a 6 ideas para repasar |
| `[ESPACIO PARA IMAGEN]` | Marco de figura (título + pie) | Placeholder hasta tener la ilustración |
| Tablas | Tabla responsive | Datos comparativos |

### De dónde sale cada cifra

Este módulo distingue tres cosas que no son lo mismo:

- **Requisito de certificación.** Lo que el avión tuvo que demostrar para tener su certificado de tipo. En este documento se cita como **14 CFR 25.xxx** (Estados Unidos) o **CS-25.xxx** (Europa). Las dos normas están armonizadas en casi todo lo que aquí se usa; donde no lo estén, se dice.
- **Requisito de operación.** Lo que tu operador tiene que cumplir para despachar el vuelo. Se cita como **14 CFR 121.xxx** (Estados Unidos) o **Reglamento (UE) 965/2012, Parte CAT** (Europa). Aquí **sí hay diferencias reales** y se señalan.
- **Procedimiento del operador.** Lo que dice tu manual de operaciones. No está en ninguna norma internacional y cambia de aerolínea a aerolínea: el módulo dice cuándo una decisión cae en este grupo.

Y una regla que se respeta en todo el documento: **ninguna cifra que dependa del tipo de avión, de la configuración, del fabricante o del operador se inventa.** Cuando el valor sale del AFM (*Aircraft Flight Manual*, manual de vuelo) o del FCOM (*Flight Crew Operating Manual*), el texto lo dice y explica de qué depende, en vez de poner un número que sonaría creíble y sería falso.

> **Aviso para el alumno, visible en la app:** este módulo es material de estudio de elaboración propia, no documentación oficial de ningún fabricante, operador ni autoridad. Para volar, manda el AFM, el FCOM y el manual de operaciones de tu aerolínea.

---

# DEFINICIÓN INICIAL · ¿QUÉ ES AIRCRAFT PERFORMANCE?

**¿QUÉ ES?**
La performance estudia la capacidad de una aeronave para completar cada fase del vuelo dentro de sus limitaciones certificadas y operacionales, bajo unas condiciones concretas. No es una propiedad fija del avión: es el resultado de cruzar el avión con el día que tienes delante.

**LO QUE DEBE SABER UN PILOTO**
Performance no es «qué tan potente es el avión». Es esta relación:

**AVIÓN + PESO + CONFIGURACIÓN + ATMÓSFERA + PISTA + OBSTÁCULOS + LIMITACIONES OPERACIONALES**

El mismo avión, con el mismo peso, es legal en una pista y no lo es en otra. Es legal a las seis de la mañana y no a las dos de la tarde. Es legal con la pista seca y no con 5 mm de agua encima. Nada de eso cambia el avión: cambia el resultado.

En una operación de aerolínea, la performance responde preguntas muy concretas:

- ¿Puede despegar el avión con este peso?
- ¿Alcanza la pista?
- ¿Puede detenerse si rechazas el despegue?
- ¿Puede seguir despegando si falla un motor?
- ¿Libra los obstáculos con un motor menos?
- ¿Qué peso máximo permite esta pista, hoy?
- ¿Cuánto le quitan la temperatura y la altitud?
- ¿Cabe el aterrizaje en la pista disponible?
- ¿Y si la pista está mojada o contaminada?

**APLICACIÓN EN AEROLÍNEA**
Tú no calculas nada de esto a mano. Lo calcula un sistema —el EFB, una aplicación del operador, un mensaje ACARS— y te devuelve unos números. Tu trabajo es entender **qué significan**, **qué variable los movió** y **qué pasa si esa variable cambia entre el cálculo y el despegue**. Un piloto que copia cifras sin saber cuál es el factor limitante no puede detectar cuándo el cálculo dejó de ser válido.

**EN POCAS PALABRAS**
- La performance es del día, no del avión.
- Es el cruce de peso, atmósfera, pista, obstáculos y limitaciones.
- Responde preguntas de sí o no: puede o no puede.
- El piloto interpreta y verifica; el sistema calcula.
- Si cambia una variable, puede cambiar la respuesta.

**[ESPACIO PARA IMAGEN]** · `PERF-01`
**IMAGEN SUGERIDA:** una aeronave de transporte en el umbral de una pista, vista desde arriba en tres cuartos, rodeada por ocho etiquetas que apuntan hacia ella: *Weight*, *Temperature*, *Pressure Altitude*, *Wind*, *Runway*, *Slope*, *Obstacles* y *Aircraft Configuration*. Cada etiqueta con su traducción pequeña debajo.
**OBJETIVO:** que el alumno vea de entrada que la performance sale de muchas variables a la vez, y no de la potencia de los motores.

---

# NIVEL 1 · QUÉ ES Y QUÉ LA AFECTA

## TEMA 1 · FUNDAMENTOS DE PERFORMANCE

**¿QUÉ ES?**
Las cuatro fuerzas —sustentación (*lift*), peso (*weight*), empuje (*thrust*) y resistencia (*drag*)— explican por qué el avión acelera, sube, se mantiene o desciende. La performance es, en el fondo, contabilidad de esas cuatro.

**LO QUE DEBE SABER UN PILOTO**
Dos balances mandan en todo el módulo:

| Balance | Qué decide |
|---|---|
| **Empuje contra resistencia** | Si el avión **acelera** y si le sobra energía para **subir** |
| **Sustentación contra peso** | A qué **velocidad** puede volar y con qué **margen** |

De ahí salen las cuatro conclusiones que vas a usar una y otra vez:

- **Aceleración.** Lo que sobra de empuje después de vencer la resistencia y la fricción del tren es lo que acelera al avión. Menos empuje sobrante, más pista para llegar a la misma velocidad.
- **Despegue.** El ala necesita una velocidad mínima para sostener el peso. Más peso, más velocidad, más pista.
- **Ascenso.** El gradiente depende del **exceso de empuje** sobre la resistencia, no de la sustentación. Por eso perder un motor es un problema de ascenso antes que de sustentación.
- **Crucero, descenso y aterrizaje.** En crucero el empuje iguala la resistencia; en descenso, el peso aporta parte de la energía; en aterrizaje hay que disipar toda la energía cinética que el avión trae, y eso es trabajo de frenos, spoilers y reversas.

> Esto es solo la base. La aerodinámica completa está en su propio módulo: aquí se usa lo mínimo para entender los números.

**EN POCAS PALABRAS**
- Empuje menos resistencia es lo que acelera y lo que hace subir.
- Sustentación contra peso fija las velocidades.
- El ascenso es un problema de exceso de empuje.
- Aterrizar es disipar energía.

---

## TEMA 2 · FACTORES QUE AFECTAN LA PERFORMANCE

**¿QUÉ ES?**
Ocho variables mueven todos los números del cálculo. Reconocerlas de memoria es lo que te permite anticipar el resultado antes de mirarlo.

### Peso

**LO QUE DEBE SABER UN PILOTO**
Más peso es peor en las cuatro cosas que importan:

| Efecto | Por qué |
|---|---|
| **Más distancia de despegue** | El ala necesita más velocidad para sostener más peso, y acelerar más masa hasta una velocidad mayor toma más pista |
| **Velocidades más altas** | V₁, VR y V₂ suben con el peso |
| **Menos capacidad de ascenso** | El mismo exceso de empuje tiene que levantar más masa: el gradiente cae |
| **Más distancia de aterrizaje** | Se llega más rápido y hay más energía que disipar |

El peso es además la única de las ocho variables que **tú controlas**. Por eso cuando un cálculo no da, la respuesta operacional casi siempre es quitar peso.

### Temperatura

Aire caliente es aire menos denso. Menos densidad significa a la vez **menos sustentación** a la misma velocidad verdadera, **menos empuje** —el motor traga menos masa de aire— y, en motores planos (*flat-rated*), el empuje empieza a caer por encima de una temperatura de corte que fija el fabricante. El resultado se acumula: más pista, menos gradiente, menos peso permitido.

### Altitud del aeropuerto

La elevación baja la presión y con ella la densidad. Un aeropuerto alto produce el mismo efecto que un día caliente, y los dos se suman. Es el clásico **hot and high**.

### Pressure Altitude

**¿QUÉ ES?** La altitud que le corresponde a la presión que hay, medida en la atmósfera estándar. Es lo que marca el altímetro con 1013,2 hPa puesto.

Es la entrada que usan las tablas y los sistemas de performance, porque describe la presión sin depender del QNH del día. Si el QNH está bajo, la *pressure altitude* de la pista es mayor que su elevación, y el avión se comporta como si el aeropuerto estuviera más alto de lo que está.

### Density Altitude

**¿QUÉ ES?** La altitud a la que, en atmósfera estándar, encontrarías la densidad que hay hoy aquí. Es *pressure altitude* corregida por temperatura.

No es una cifra que introduzcas en el EFB: el sistema trabaja con presión y temperatura por separado. Es una **forma de pensar**: si la *density altitude* de una pista a 8 000 ft es de 12 000 ft, el avión va a actuar como si estuviera a 12 000 ft, y eso explica la penalización sin necesidad de abrir ninguna tabla.

### Viento

| Componente | Efecto |
|---|---|
| **Headwind** (viento de frente) | Acorta despegue y aterrizaje: llegas a la velocidad respecto al aire con menos velocidad respecto al suelo |
| **Tailwind** (viento de cola) | Alarga las dos, y **penaliza mucho más de lo que ayuda** el viento de frente equivalente |
| **Crosswind** (viento cruzado) | No cambia la distancia, pero tiene un límite demostrado y afecta el control direccional, sobre todo con pista resbaladiza |

Hay un detalle que se pregunta en entrevista: el cálculo **no usa el viento que reporta la torre**. Usa un porcentaje conservador de él —la norma de certificación de las distancias exige no acreditar más del 50 % del viento de frente y contar al menos el 150 % del de cola—, y por eso un viento de cola pequeño castiga el peso de forma desproporcionada.

### Pendiente de pista

- **Upslope** (pista que sube): frena la aceleración, así que alarga el despegue; ayuda a detener, así que acorta el aterrizaje y la distancia de parada.
- **Downslope** (pista que baja): al revés.

La pendiente publicada es un promedio de la pista; en pistas largas con perfil irregular el efecto real puede repartirse de forma distinta.

### Condición de pista

Tres familias, y la diferencia entre ellas no es de matiz:

| Condición | Qué significa | Qué toca |
|---|---|---|
| **Dry** (seca) | Sin humedad visible ni contaminante | Caso de referencia de la certificación |
| **Wet** (mojada) | Superficie con humedad o agua hasta 3 mm inclusive, sin llegar a agua estancada | Baja el frenado: crece la distancia de parada |
| **Contaminated** (contaminada) | Más de 3 mm de agua, nieve fundente, nieve o hielo cubriendo más del 25 % del área evaluada | Baja el frenado **y** añade resistencia: toca aceleración y parada a la vez |

**EN POCAS PALABRAS**
- Peso, temperatura y altitud empujan todos en la misma dirección: peor.
- *Pressure altitude* es la entrada; *density altitude* es la forma de pensarla.
- El viento de cola castiga mucho más de lo que ayuda el de frente.
- La pista contaminada afecta acelerar y frenar; la mojada, sobre todo frenar.

**[ESPACIO PARA IMAGEN]** · `PERF-02`
**IMAGEN SUGERIDA:** cuatro viñetas en fila con la misma aeronave despegando, y bajo cada una el punto donde levanta: (1) aeropuerto al nivel del mar, día frío, despegue corto; (2) aeropuerto alto y caliente, despegue claramente más largo; (3) con viento de frente, más corto; (4) con viento de cola, el más largo de los cuatro. Una regla horizontal común debajo para comparar las cuatro distancias.
**OBJETIVO:** que se vea de un golpe cuánto mueven las condiciones del día una misma operación.

---

## TEMA 3 · DISTANCIAS DECLARADAS DE PISTA

**¿QUÉ ES?**
Cuatro longitudes publicadas para cada dirección de cada pista. No miden lo mismo, no empiezan en el mismo sitio y no sirven para lo mismo.

**LO QUE DEBE SABER UN PILOTO**

| Sigla | Nombre | Qué es |
|---|---|---|
| **TORA** | *Take-Off Run Available* | La pista declarada disponible para la carrera de despegue |
| **TODA** | *Take-Off Distance Available* | TORA más la **clearway**, si la hay |
| **ASDA** | *Accelerate-Stop Distance Available* | TORA más la **stopway**, si la hay |
| **LDA** | *Landing Distance Available* | La pista disponible para aterrizar, a partir del umbral |

Y las dos superficies que las separan:

- **Clearway** (zona libre de obstáculos): un **volumen de aire despejado** más allá del extremo de la pista, bajo control del aeródromo, centrado en el eje prolongado. No es pavimento. Sirve para que el avión termine de subir los últimos pies hasta los 35 ft, así que suma a la **TODA** y a nada más.
- **Stopway** (zona de parada): **pavimento** más allá del extremo, del mismo ancho de la pista, preparado para soportar un avión que se detiene tras un despegue rechazado. No sirve para rodar, despegar ni aterrizar. Suma a la **ASDA** y a nada más.

De ahí sale la idea que se pregunta siempre: **clearway y stopway aumentan distancias declaradas sin que la pista mida un metro más.** Un aeródromo puede darte 200 m más de ASDA sin haber pavimentado un metro de pista nueva, y esos 200 m solo valen para detenerte.

**APLICACIÓN EN AEROLÍNEA**
Las cuatro cifras van publicadas en el AIP, en la casilla AD 2.13, **por cabecera**, y también por intersección cuando el aeródromo publica salidas intermedias. Si aceptas despegar desde una intersección, el cálculo se rehace con las distancias de esa intersección: lo que quedó atrás no se recupera.

**EJEMPLO**
Pista de 3 000 m con 300 m de stopway y 300 m de clearway, umbral en el extremo:
TORA 3 000 · TODA 3 300 · ASDA 3 300 · LDA 3 000.
Si además el umbral estuviera desplazado 200 m, la LDA bajaría a 2 800 y las otras tres no se moverían.

**EN POCAS PALABRAS**
- Cuatro cifras por cabecera, no una longitud de pista.
- Clearway es aire y suma a TODA.
- Stopway es pavimento y suma a ASDA.
- Un umbral desplazado recorta la LDA y deja las demás quietas.
- Desde intersección, se calcula con lo que queda.

**[ESPACIO PARA IMAGEN]** · `PERF-03`
**IMAGEN SUGERIDA:** vista lateral esquemática de una pista con su stopway a la derecha y su clearway sobre ella. Debajo, cuatro barras horizontales apiladas y acotadas, una por distancia (TORA, TODA, ASDA, LDA), cada una empezando y terminando exactamente donde le corresponde, con el umbral marcado.
**OBJETIVO:** que el alumno distinga de un vistazo dónde empieza y dónde acaba cada una de las cuatro distancias declaradas.

---

# NIVEL 2 · EL DESPEGUE Y SUS VELOCIDADES

## TEMA 4 · PERFORMANCE DE DESPEGUE

**¿QUÉ ES?**
El cálculo que decide si este avión, con este peso, puede despegar de esta pista, hoy, cumpliendo todo lo que la norma exige —incluida la falla del motor crítico en el peor momento—.

**LO QUE DEBE SABER UN PILOTO**
El cálculo mira, a la vez, estas entradas:

| Entrada | Por qué entra |
|---|---|
| Peso | Fija las velocidades y la aceleración |
| Longitud de pista e intersección | TORA, TODA y ASDA disponibles |
| *Pressure altitude* y temperatura | Densidad: empuje y sustentación |
| Viento y pendiente | Distancias de aceleración y de parada |
| Condición de pista | Aceleración y, sobre todo, frenado |
| Configuración de flaps | Compromiso entre distancia y ascenso |
| Obstáculos | Gradiente que hay que cumplir después del despegue |
| Empuje disponible | Rating del motor, reducciones, bleeds |
| Anti-ice y *packs* | Sangran aire del motor: quitan empuje |
| MEL / CDL | Un ítem diferido puede traer penalización de performance |

Y devuelve un paquete de salidas que **solo valen para ese despegue**: peso máximo permitido, V₁, VR, V₂, ajuste de empuje y el factor que limitó.

La idea que cuesta interiorizar: la norma de certificación de transporte **no pregunta si el avión despega bien**. Pregunta si despega bien **con el motor crítico inoperativo desde el peor instante posible**. Casi todo lo que sigue en este módulo es consecuencia de eso.

**APLICACIÓN EN AEROLÍNEA**
Anti-ice encendido y *packs* en una posición u otra cambian el resultado, y el cálculo se hace con la configuración que vas a usar de verdad. Si enciendes el anti-ice después de recibir los números, los números dejaron de ser válidos: se recalcula.

**EN POCAS PALABRAS**
- El cálculo es de ese despegue, no del avión.
- La certificación asume falla del motor crítico en el peor momento.
- Anti-ice, *packs* y MEL entran en el cálculo.
- Cambió una entrada, se recalcula.

---

## TEMA 5 · V-SPEEDS DE DESPEGUE

**¿QUÉ ES?**
Las velocidades que estructuran la carrera de despegue. Cada una responde a una pregunta distinta y ninguna sustituye a otra.

### VMCG · Minimum Control Speed on the Ground

**¿QUÉ ES?** La velocidad mínima a la que, si falla el motor crítico durante la carrera, todavía puedes mantener el control direccional **usando solo el timón de dirección**, sin dirección de rueda de nariz.

**LO QUE DEBE SABER UN PILOTO**
La demostración de certificación (14 CFR 25.149 / CS-25.149) exige que el avión pueda seguir recto sin apartarse del eje más de 30 ft. Por debajo de VMCG, el timón no tiene suficiente flujo para compensar el empuje asimétrico: si el motor falla ahí, el avión se va de la pista aunque tú hagas todo bien.

De ahí sale la consecuencia que importa: **V₁ nunca puede ser menor que VMCG.** Si el cálculo quisiera una V₁ más baja —por pista corta, por ejemplo—, no puede bajarla por debajo de esa barrera. Y VMCG depende del empuje, así que sube cuando usas empuje alto y baja con empuje reducido. Esta es la razón técnica de por qué un *derate* cambia las velocidades.

### V₁ · Takeoff Decision Speed

**¿QUÉ ES?** La velocidad que separa dos mundos: es la **máxima** a la que todavía puedes iniciar el rechazo y detenerte dentro de la distancia disponible, y a la vez la **mínima** a la que, tras fallar el motor, todavía puedes continuar el despegue y cumplir la trayectoria exigida.

**LO QUE DEBE SABER UN PILOTO**
La definición de 14 CFR 25.107 es precisa y vale la pena entenderla como es:

- **VEF** es la velocidad a la que se supone que falla el motor crítico. No puede ser menor que VMCG.
- **V₁** no puede ser menor que VEF más la velocidad que el avión gana durante el tiempo de reacción del piloto. Es decir: **entre VEF y V₁ hay tiempo de reconocimiento**. El motor no falla en V₁; falla antes, y V₁ es donde ya tienes que estar actuando.
- V₁ tampoco puede ser mayor que VR.

Por eso la frase «antes de V₁ paro, después de V₁ sigo» describe el resultado pero **esconde lo esencial**: V₁ es el punto donde la distancia que necesitas para detenerte y la que necesitas para continuar todavía caben en lo que tienes. Está amarrada a cinco cosas a la vez:

| V₁ depende de | Cómo |
|---|---|
| Accelerate-Stop | Subir V₁ alarga lo que necesitas para detenerte |
| Accelerate-Go | Bajar V₁ alarga lo que necesitas para continuar |
| Control de la aeronave | No puede bajar de VMCG |
| Reconocimiento de la falla | Incluye el tiempo entre VEF y V₁ |
| Energía de frenos | No puede superar VMBE (tema 33) |

**APLICACIÓN EN AEROLÍNEA**
Que V₁ sea el límite de performance **no significa** que la decisión operacional sea automática. Qué fallas justifican rechazar, y a partir de qué velocidad la política es continuar salvo casos muy concretos, lo fija el **manual de operaciones de tu aerolínea**, no la norma. Muchos operadores definen además una velocidad de referencia por debajo de V₁ a partir de la cual solo se rechaza por causas mayores. Eso es procedimiento del operador; conócelo del tuyo.

### VR · Rotation Speed

**¿QUÉ ES?** La velocidad a la que inicias la rotación.

**LO QUE DEBE SABER UN PILOTO**
VR no puede ser menor que V₁, ni menor que el 105 % de VMC, y tiene que ser tal que el avión alcance V₂ antes de los 35 ft (14 CFR 25.107). Es decir: VR está elegida para que **la trayectoria certificada se cumpla**.

Por eso la técnica importa tanto como el número. Rotar **antes** de VR no adelanta el despegue: sube la resistencia, puede dejar al avión sin la velocidad exigida en los 35 ft y, en el extremo, provocar un *tailstrike*. Rotar **después**, o con una cadencia más lenta que la usada en la certificación, consume pista que el cálculo no tenía. Los números suponen una rotación a la velocidad y al ritmo previstos.

### V₂ · Takeoff Safety Speed

**¿QUÉ ES?** La velocidad de seguridad de despegue: la que el avión debe tener a 35 ft con el motor crítico inoperativo, y la que sostiene el ascenso del segundo segmento.

**LO QUE DEBE SABER UN PILOTO**
V₂ no puede ser menor que V₂MIN, que la norma fija en múltiplos de VSR (velocidad de referencia de pérdida) y de VMC: **1,13 VSR** para bimotores y trimotores a reacción sin sistema de reducción de empuje ante pérdida, **1,08 VSR** para aviones de cuatro motores o con ese sistema, y en todo caso **no menos de 1,10 VMC** (14 CFR 25.107). Con un motor menos, V₂ es la velocidad a la que el avión rinde el mejor gradiente disponible en esa configuración: ni más rápido ni más lento sube mejor.

### Las otras que conviene nombrar

| Velocidad | Qué es | Por qué aparece |
|---|---|---|
| **VMC** | Mínima de control, término general | Base de VMCG y VMCA |
| **VMCA** | Mínima de control en el aire | Demostrada con no más de 5° de alabeo hacia el motor bueno |
| **VMU** | *Minimum Unstick*: mínima a la que el avión puede despegar y seguir volando | Acota VLOF por abajo |
| **VLOF** | *Lift-Off*: velocidad a la que el avión se despega del suelo de verdad | Es donde empieza la trayectoria; limitada también por la velocidad máxima del neumático |

**EN POCAS PALABRAS**
- VMCG es control, y es el piso de V₁.
- El motor falla en VEF; V₁ llega después, con el tiempo de reconocimiento dentro.
- V₁ equilibra parar y seguir; no es solo «paro o sigo».
- VR está elegida para llegar a V₂ en 35 ft: la técnica de rotación es parte del cálculo.
- V₂ es la velocidad del segundo segmento con un motor menos.
- Qué se rechaza y qué no lo fija tu operador.

**[ESPACIO PARA IMAGEN]** · `PERF-04`
**IMAGEN SUGERIDA:** línea de tiempo horizontal sobre el perfil de una pista, de izquierda a derecha, con cinco marcas acotadas en orden: VMCG, VEF, V₁, VR, VLOF, y a 35 ft de altura V₂. Entre VEF y V₁, una banda sombreada rotulada «tiempo de reconocimiento». Silueta del avión en cada punto: en el suelo, en rotación y ya en el aire.
**OBJETIVO:** que se vea el orden real de las velocidades y, sobre todo, que VEF y V₁ no son el mismo punto.

---

## TEMA 6 · ACCELERATE-STOP DISTANCE

**¿QUÉ ES?**
La distancia total que necesita el avión para acelerar hasta la velocidad de falla, reaccionar, y detenerse por completo. Tiene que caber dentro de la ASDA.

**LO QUE DEBE SABER UN PILOTO**
La norma de certificación (14 CFR 25.109 / CS-25.109) la construye sumando cuatro tramos:

1. Acelerar desde suelta de frenos hasta **VEF**.
2. Seguir acelerando desde VEF hasta la velocidad más alta que alcance el avión durante el rechazo.
3. Detenerse.
4. **Una distancia equivalente a 2 segundos rodando a V₁.**

Ese cuarto tramo es el que no se explica solo y se pregunta en entrevista: no es el tiempo de reacción del piloto —ese ya está entre VEF y V₁—, sino un **margen añadido por la norma** que cubre las demoras y la dispersión de una operación real frente a la maniobra de demostración.

Y el punto de las reversas, que es donde más gente se equivoca:

| Superficie | ¿Se acredita la reversa? | Fuente |
|---|---|---|
| **Pista seca** | **No.** Está expresamente excluida como medio adicional de desaceleración | 14 CFR 25.109 (f) |
| **Pista mojada** | **Sí puede acreditarse**, usando los procedimientos de reversa recomendados | 14 CFR 25.109 (f) |

Dicho de otra forma: en seco, la distancia de parada certificada **solo cuenta con frenos y spoilers**. La reversa es margen real que tienes pero que el número no te vendió. En mojado, en cambio, puede estar dentro del número, y entonces una reversa inoperativa sí afecta la distancia calculada. Para pista contaminada, el método aplicable depende de la certificación y de los datos del fabricante: no supongas.

**APLICACIÓN EN AEROLÍNEA**
Por eso un despegue rechazado por encima de V₁ en pista mojada, con una reversa desactivada por MEL, no es «casi lo mismo». Cambia exactamente el término del cálculo que la norma sí había contabilizado.

**EN POCAS PALABRAS**
- Acelerar, reconocer, detenerse, más 2 segundos a V₁.
- Los 2 segundos son margen de la norma, no tiempo de reacción.
- En seco la reversa no cuenta; en mojado sí puede contar.
- Todo eso tiene que caber en la ASDA.

**[ESPACIO PARA IMAGEN]** · `PERF-05`
**IMAGEN SUGERIDA:** secuencia lateral de cinco siluetas del mismo avión sobre una pista con su stopway al final: (1) suelta de frenos, (2) acelerando, (3) falla del motor marcada con un icono y rótulo VEF, (4) rechazo iniciado en V₁ con spoilers desplegados, (5) detenido. Debajo, una barra acotada «Accelerate-Stop Distance» y otra «ASDA», la primera cabiendo dentro de la segunda.
**OBJETIVO:** mostrar que la distancia de parada se compara contra la ASDA y que la falla ocurre antes del punto de decisión.

---

## TEMA 7 · ACCELERATE-GO DISTANCE

**¿QUÉ ES?**
La distancia que necesita el avión para, tras fallar el motor crítico, seguir acelerando, rotar, despegar y llegar a 35 ft sobre la superficie con V₂. Tiene que caber dentro de la TODA.

**LO QUE DEBE SABER UN PILOTO**
La secuencia es: falla en VEF → continúa la aceleración con un motor menos → VR → VLOF → subir hasta **35 ft** alcanzando V₂. Ese punto de 35 ft es donde la norma da por terminada la distancia de despegue y donde empieza la trayectoria (14 CFR 25.111 y 25.115).

Dos detalles que separan al que estudió del que memorizó:

- La aceleración después de la falla es **mucho más lenta**: falta la mitad del empuje en un bimotor y sobra la resistencia del motor parado y del timón aplicado. La distancia crece mucho más de lo que sugiere la intuición.
- La norma obliga además a comparar contra el caso **con todos los motores operativos**: la distancia de despegue exigida es la mayor entre la del motor inoperativo hasta 35 ft y el **115 % de la distancia con todos los motores** hasta 35 ft (14 CFR 25.113). En pistas largas y pesos bajos, a veces manda este segundo caso.

**EN POCAS PALABRAS**
- Continuar el despegue termina a 35 ft con V₂.
- Con un motor menos, la aceleración cae y la distancia se dispara.
- También se compara con el 115 % del caso con todos los motores.
- Tiene que caber en la TODA, donde la clearway sí ayuda.

**[ESPACIO PARA IMAGEN]** · `PERF-06`
**IMAGEN SUGERIDA:** el mismo encuadre lateral de la figura anterior, para que se puedan comparar: (1) suelta de frenos, (2) acelerando, (3) falla en VEF, (4) rotación en VR, (5) VLOF, (6) el avión a 35 ft sobre el final de la pista con el rótulo V₂. Debajo, barra «Accelerate-Go Distance» contra barra «TODA», con la clearway sombreada al final.
**OBJETIVO:** contrastar visualmente continuar contra detenerse, usando el mismo punto de falla.

---

## TEMA 8 · BALANCED FIELD LENGTH

**¿QUÉ ES?**
La situación en la que la distancia para detenerse y la distancia para continuar son **iguales**. La V₁ que produce esa igualdad se llama *balanced V₁*, y la distancia resultante es la *balanced field length*.

**LO QUE DEBE SABER UN PILOTO**
Piensa en V₁ como un cursor que puedes deslizar:

- **Subes V₁** → llegas más rápido al punto de decisión → necesitas **más** pista para detenerte y **menos** para continuar.
- **Bajas V₁** → al revés: **menos** para detenerte y **más** para continuar.

Dibujadas contra V₁, la curva de *accelerate-stop* sube y la de *accelerate-go* baja. Donde se cruzan, las dos distancias valen lo mismo, y esa es la **menor distancia de pista** con la que el despegue es posible. Por eso el campo equilibrado da el **peso máximo** en una pista sin clearway ni stopway.

**Unbalanced field.** Cuando la pista tiene stopway o clearway, ASDA y TODA dejan de ser iguales y el óptimo ya no está en el cruce: el cálculo elige otra V₁ que aproveche la asimetría. También se desequilibra a propósito cuando conviene, por ejemplo bajando V₁ en pista contaminada para tener más margen de parada, aceptando más distancia para continuar.

Y el error de entrevista clásico: *balanced field* **no** quiere decir «la pista alcanza de sobra». Quiere decir que las dos distancias se igualaron. Una pista puede ser equilibrada y estar justa.

**EN POCAS PALABRAS**
- V₁ es el cursor: sube una distancia y baja la otra.
- El cruce de las dos curvas da la menor pista necesaria.
- Clearway y stopway desequilibran el campo, y eso no es malo.
- «Balanced» no significa «sobra pista».

**[ESPACIO PARA IMAGEN]** · `PERF-07`
**IMAGEN SUGERIDA:** gráfico de ejes limpios: eje horizontal V₁, eje vertical distancia. Dos curvas: *Accelerate-Stop Distance* ascendente y *Accelerate-Go Distance* descendente, cruzándose. En el cruce, líneas punteadas hasta los dos ejes rotuladas «V₁ equilibrada» y «Balanced Field Length».
**OBJETIVO:** explicar por qué existe un punto en el que las dos distancias se equilibran y por qué ese punto da la pista mínima.

---

## TEMA 9 · REJECTED TAKEOFF Y PERFORMANCE

**¿QUÉ ES?**
El rechazo de despegue (*RTO*) es la maniobra que el cálculo de *accelerate-stop* supone. Entender su física explica por qué a alta velocidad es de las maniobras más críticas que hace un avión de transporte.

**LO QUE DEBE SABER UN PILOTO**
La energía cinética que hay que disipar crece **con el cuadrado de la velocidad**. Rechazar a 150 kt no es «un poco peor» que rechazar a 100 kt: es algo más del doble de energía. Y esa energía termina casi toda en los frenos, convertida en calor.

Los factores que deciden si el rechazo cabe:

| Factor | Efecto |
|---|---|
| **Velocidad** | Manda: la energía va con el cuadrado |
| **Peso** | Más masa, más energía a disipar |
| **Distancia disponible** | ASDA, y lo que ya consumiste acelerando |
| **Energía de frenos** | Hay un límite certificado de absorción (tema 33) |
| **Tiempo de reacción** | Cada segundo a 150 kt son unos 77 m |
| **Condición de pista** | Define cuánto frenado puedes sacar de verdad |

**APLICACIÓN EN AEROLÍNEA**
El cálculo supone una ejecución inmediata y completa: frenado máximo, spoilers y, si aplica, reversa, todo sin demora. Cualquier vacilación se come el margen. Por eso los operadores definen con tanto cuidado **quién** rechaza y **qué** justifica rechazar, y por eso un rechazo a alta velocidad suele terminar con frenos calientes, revisión de la aeronave y a veces con una espera antes del siguiente despegue.

Este módulo no entra en el procedimiento concreto: el reparto de tareas, las llamadas y la técnica los fija tu fabricante y tu operador.

**EN POCAS PALABRAS**
- La energía va con el cuadrado de la velocidad.
- El cálculo supone acción inmediata y frenado máximo.
- Los frenos tienen un límite de energía certificado.
- El procedimiento concreto es de tu operador, no de la norma.

---

# NIVEL 3 · DESPUÉS DE SOLTAR EL SUELO

## TEMA 10 · TAKEOFF FLIGHT PATH

**¿QUÉ ES?**
La trayectoria que se analiza desde los 35 ft en adelante, con el motor crítico inoperativo, para comprobar que el avión sube lo suficiente y libra lo que tiene delante.

**LO QUE DEBE SABER UN PILOTO**
La trayectoria empieza **a 35 ft sobre la superficie**, al final de la distancia de despegue, y se extiende hasta 1 500 ft o hasta que se completa la transición a configuración de ruta y se alcanza VFTO, lo que quede más alto (14 CFR 25.111 y 25.115).

Dentro de ese análisis conviven tres trayectorias, y confundirlas es un error caro:

| Trayectoria | Qué es |
|---|---|
| **Actual Flight Path** | La que vuela un avión concreto, un día concreto. No se usa para certificar nada |
| **Gross Flight Path** | La **demostrada** en certificación, con avión y piloto de ensayo, en condiciones controladas |
| **Net Flight Path** | La *gross* **degradada a propósito** por la norma. Es la que se usa para librar obstáculos |

La degradación no es un capricho: cubre la variabilidad entre aviones de la misma flota, entre pilotos, y entre el día del ensayo y el día de tu vuelo. La norma la fija restando al gradiente demostrado (14 CFR 25.115):

| Motores | Se resta al gradiente |
|---|---|
| Dos | **0,8 %** |
| Tres | **0,9 %** |
| Cuatro | **1,0 %** |

Dicho en corto: la trayectoria neta es siempre **más baja** que la que el avión de verdad va a volar. Ese es el margen, y por eso se libra el obstáculo con la neta y no con la real.

**EN POCAS PALABRAS**
- Empieza a 35 ft y termina arriba de 1 500 ft.
- *Gross* es lo demostrado; *net* es lo demostrado menos un margen fijo.
- 0,8 %, 0,9 % o 1,0 % según el número de motores.
- Los obstáculos se libran con la neta.

**[ESPACIO PARA IMAGEN]** · `PERF-08`
**IMAGEN SUGERIDA:** perfil lateral desde el final de la pista. Dos curvas de ascenso partiendo del mismo punto a 35 ft: la superior rotulada *Gross Flight Path*, la inferior *Net Flight Path*, con la separación creciente entre ambas sombreada y rotulada «margen de la norma». Un obstáculo dibujado abajo, librado por la curva neta.
**OBJETIVO:** que se entienda que el margen regulatorio se aplica bajando la trayectoria, no subiendo el obstáculo.

---

## TEMA 11 · SEGMENTOS DEL DESPEGUE

**¿QUÉ ES?**
La industria divide la trayectoria de despegue con un motor inoperativo en cuatro tramos, porque en cada uno el avión está en una configuración distinta y la norma le exige algo distinto.

**LO QUE DEBE SABER UN PILOTO**

| Segmento | Desde / hasta | Configuración | Gradiente exigido (14 CFR 25.121 / CS-25.121) |
|---|---|---|---|
| **Primero** | Desde 35 ft hasta que el tren está arriba | Tren bajando, flaps de despegue, empuje de despegue, a VLOF | **Positivo** en bimotores · 0,3 % en trimotores · 0,5 % en cuatrimotores |
| **Segundo** | Desde tren arriba hasta la altura de aceleración | Tren arriba, flaps de despegue, empuje de despegue, a V₂ | **2,4 %** bimotores · 2,7 % trimotores · 3,0 % cuatrimotores |
| **Aceleración** | Desde la altura de aceleración | Se acelera y se retraen flaps, normalmente nivelado o con gradiente muy bajo | No hay gradiente de ascenso exigido: aquí se cambia velocidad por configuración |
| **Final** | Desde configuración limpia | Limpio, empuje máximo continuo, a VFTO | **1,2 %** bimotores · 1,5 % trimotores · 1,7 % cuatrimotores |

Tres cosas que conviene fijar:

- **La altura de aceleración no la pone la norma de certificación**, sino el procedimiento del operador para cada pista, y nunca por debajo de lo que exija el análisis de obstáculos. La norma sí dice que la velocidad se mantiene lo más cerca posible de V₂ y no menor, y que no se cambia el empuje que requiera acción del piloto, hasta **400 ft** sobre la superficie (14 CFR 25.111).
- **Los gradientes de la tabla son del análisis de certificación**, con el motor crítico parado. No son los que vuelas con los dos motores buenos.
- **Los valores cambian con el número de motores.** Citar «2,4 %» sin decir «bimotor» es incompleto, y en entrevista se nota.

**EN POCAS PALABRAS**
- Cuatro tramos, cada uno con su configuración.
- El segundo es el más exigente: 2,4 % en bimotor.
- En el de aceleración no se pide gradiente: se cambia velocidad por configuración.
- Hasta 400 ft no se toca el empuje ni se baja de V₂.
- Los porcentajes dependen del número de motores.

**[ESPACIO PARA IMAGEN]** · `PERF-09`
**IMAGEN SUGERIDA:** perfil lateral del despegue con un motor apagado (marcado con un icono discreto), dividido en cuatro tramos de distinto sombreado y rotulados *First Segment*, *Second Segment*, *Acceleration Segment* y *Final Segment*. En cada tramo, una etiqueta pequeña con la configuración (tren, flaps, empuje) y la velocidad de referencia. Marcas de altura en 35 ft, altura de aceleración y 1 500 ft.
**OBJETIVO:** que el alumno ubique dónde empieza y termina cada segmento y qué cambia en cada uno.

---

## TEMA 12 · CLIMB GRADIENT

**¿QUÉ ES?**
El gradiente de ascenso es cuánta altura ganas por cada unidad de distancia recorrida sobre el suelo, en porcentaje. Es una **pendiente**, no una velocidad vertical.

**LO QUE DEBE SABER UN PILOTO**

> **Gradiente (%) ≈ (altura ganada ÷ distancia horizontal) × 100**

La confusión con el régimen de ascenso (*rate of climb*, pies por minuto) es uno de los errores más comunes en entrevista, y la diferencia es fácil de ver:

| | Gradiente | Régimen de ascenso |
|---|---|---|
| Mide | Altura por distancia | Altura por tiempo |
| Unidad | % | ft/min |
| Para qué sirve | **Librar obstáculos** | Planificar tiempos y perfiles |
| Depende de | Exceso de empuje y velocidad | Exceso de potencia |

Dos aviones pueden subir a los mismos 1 500 ft/min y tener gradientes muy distintos si uno va a 160 kt y el otro a 280 kt: el rápido recorre mucho más suelo mientras gana los mismos pies, así que su pendiente es menor. **Al obstáculo le importa la pendiente, no los pies por minuto.**

**EJEMPLO**
Un avión gana 300 ft mientras recorre 10 000 ft de suelo.
Gradiente = 300 ÷ 10 000 × 100 = **3 %**.
Si hay una antena de 200 ft a 5 000 ft del final de la pista, con ese 3 % el avión estaría a 150 ft ahí: **no la libra**. El problema no se arregla subiendo el régimen si para lograrlo hay que acelerar.

**EN POCAS PALABRAS**
- Gradiente es altura por distancia; régimen es altura por tiempo.
- El obstáculo entiende de gradiente.
- Más velocidad con el mismo régimen es menos gradiente.
- Se calcula con una división simple.

**[ESPACIO PARA IMAGEN]** · `PERF-10`
**IMAGEN SUGERIDA:** un triángulo rectángulo grande con la trayectoria de ascenso como hipotenusa, la distancia horizontal acotada en la base y la altura ganada acotada en el lado vertical, con la fórmula del gradiente al lado. Al costado, dos siluetas de avión con la misma flecha vertical de régimen pero distinta velocidad horizontal, mostrando dos pendientes distintas.
**OBJETIVO:** separar visualmente gradiente de régimen de ascenso.

---

## TEMA 13 · SECOND SEGMENT CLIMB

**¿QUÉ ES?**
El tramo que va desde que el tren queda arriba hasta la altura de aceleración, con el motor crítico inoperativo, flaps de despegue, empuje de despegue y velocidad V₂. Es, en la mayoría de las operaciones, el tramo **más exigente** de todo el despegue.

**LO QUE DEBE SABER UN PILOTO**
Por qué suele ser el crítico: el avión está en la peor combinación posible.

- Le falta el motor crítico: en un bimotor, la mitad del empuje.
- Lleva **flaps de despegue**, que dan sustentación pero también resistencia.
- Va a **V₂**, una velocidad baja, donde la resistencia inducida todavía es alta.
- Va con el **peso máximo** del despegue, porque aún no quemó nada.
- Y tiene que sostener **2,4 %** (bimotor), **2,7 %** (trimotor) o **3,0 %** (cuatrimotor) de gradiente, de forma estabilizada.

El tren ya está arriba, que es lo único que juega a favor frente al primer segmento.

Cuando peso, temperatura o altitud crecen, el empuje disponible baja y la resistencia sube: llega un punto en que **el gradiente exigido deja de cumplirse**. La única variable que el despacho puede mover es el peso. De ahí sale el concepto del tema 18: el despegue **climb limited**.

**APLICACIÓN EN AEROLÍNEA**
En un aeropuerto alto y caliente es habitual que el resultado del EFB diga `LIMIT: CLIMB` aunque la pista mida 4 000 m. Sobra pista y falta gradiente: el avión podría acelerar sin problema, pero no podría sostener el segundo segmento con un motor menos. Nada de lo que hagas con la pista arregla eso; solo quitar peso, y a veces cambiar la configuración de flaps.

**EN POCAS PALABRAS**
- Tren arriba, flaps de despegue, empuje de despegue, V₂, un motor menos.
- Es el tramo más exigente del despegue.
- 2,4 % en bimotor; sube con el número de motores.
- *Hot and high* lo pone en riesgo y obliga a quitar peso.
- Aquí nace el despegue limitado por ascenso.

**[ESPACIO PARA IMAGEN]** · `PERF-11`
**IMAGEN SUGERIDA:** acercamiento al segundo segmento: avión con un motor apagado, tren arriba y flaps de despegue visibles, subiendo por una pendiente acotada «2,4 % · bimotor». Alrededor, cuatro etiquetas de lo que juega en contra —peso máximo, V₂ baja, flaps extendidos, medio empuje— y una a favor, el tren retraído.
**OBJETIVO:** explicar por qué justo este tramo es el que limita el peso en tantos aeropuertos.

---

## TEMA 14 · OBSTACLE CLEARANCE

**¿QUÉ ES?**
El análisis que comprueba que la trayectoria neta de despegue pasa por encima de todo lo que hay en la trayectoria de salida, con el motor crítico inoperativo.

**LO QUE DEBE SABER UN PILOTO**
El análisis cruza tres cosas: la **trayectoria neta** (tema 10), la **posición de los obstáculos** levantados por el aeródromo y publicados, y el **margen** que exige la norma de operación.

En Estados Unidos, la regla de operación (14 CFR 121.189 (d)) pide que la trayectoria neta libre los obstáculos por **al menos 35 ft en vertical**, o por al menos **200 ft en horizontal dentro** del límite del aeródromo y **300 ft en horizontal fuera** de él. En Europa, la Parte CAT del Reglamento (UE) 965/2012 exige un margen vertical equivalente sobre la trayectoria neta y define además la anchura del corredor que hay que considerar, que se abre con la distancia recorrida.

Dos consecuencias prácticas:

- El obstáculo **no se libra con la trayectoria real**, sino con la neta, que ya viene degradada. El margen que de verdad tienes es mayor del que aparece en el papel. Ese es el diseño.
- Si el avión no puede subir lo suficiente para librar el obstáculo con la neta, la solución no es volar mejor: es **pesar menos** o **virar antes**, que es de lo que trata el tema siguiente.

**APLICACIÓN EN AEROLÍNEA**
El análisis lo hace el proveedor de performance del operador, pista por pista y a veces intersección por intersección, y llega a ti convertido en un peso máximo y, cuando aplica, en un procedimiento de salida con motor inoperativo. Lo que tienes que saber antes de soltar frenos es **cuál es el procedimiento para esa pista** y **hasta dónde te lleva**.

**EN POCAS PALABRAS**
- Se libra con la trayectoria neta, no con la real.
- FAA: 35 ft en vertical, o 200/300 ft en horizontal.
- El obstáculo puede limitar el peso aunque sobre pista.
- La salida hay que conocerla antes, no averiguarla en el aire.

**[ESPACIO PARA IMAGEN]** · `PERF-12`
**IMAGEN SUGERIDA:** perfil de salida con la pista a la izquierda, la trayectoria neta ascendiendo y un obstáculo crítico —una colina con una antena encima— a la derecha. Cota vertical de 35 ft entre la cima del obstáculo y la trayectoria neta. En gris claro y por encima, la trayectoria real, para que se vea el margen extra.
**OBJETIVO:** mostrar cómo un obstáculo se convierte en el factor que limita el peso de despegue.

---

## TEMA 15 · ENGINE-OUT PROCEDURES

**¿QUÉ ES?**
Una trayectoria de salida diseñada específicamente para el caso de falla de motor, que puede no parecerse en nada a la SID publicada.

**LO QUE DEBE SABER UN PILOTO**
Tres cosas distintas que se confunden:

| | Para qué existe | Quién lo diseña |
|---|---|---|
| **SID** | Ordenar el tránsito y separar el tráfico, **con todos los motores** | El Estado / proveedor de servicios de navegación aérea |
| **Engine-Out Procedure** (EOP) | Librar el terreno y los obstáculos **con un motor inoperativo** | El operador, con su proveedor de performance |
| **Procedimiento de evitación de obstáculos** | Puede formar parte del anterior o publicarse aparte para una pista concreta | Operador o Estado, según el caso |

La SID supone gradientes que un avión con un motor menos **puede no ser capaz de sostener**. Por eso muchos operadores tienen, para determinadas pistas, un EOP que manda virar antes, seguir un valle, o mantener un rumbo distinto al de la salida publicada. Puede llevarte por donde la SID nunca te llevaría.

**APLICACIÓN EN AEROLÍNEA**
El EOP se revisa en el *briefing* de despegue, junto con la pista, el peso y el factor limitante. Si hay falla después de V₁, no es momento de buscar qué procedimiento aplica. Y si vuelas el EOP, hay que decirlo a control: te estás separando de la autorización por una emergencia, y el controlador necesita saberlo.

Este módulo no publica ningún procedimiento concreto: dependen del aeropuerto, del tipo de avión y del operador.

**EN POCAS PALABRAS**
- La SID se diseñó con todos los motores.
- El EOP se diseñó para el caso de falla, y puede ir por otro lado.
- Se revisa antes de despegar, no después de la falla.
- Volarlo es separarse de la autorización: se informa.

---

# NIVEL 4 · EL PESO QUE DE VERDAD PUEDES LLEVAR

## TEMA 16 · PESO MÁXIMO DE DESPEGUE

**¿QUÉ ES?**
El peso máximo con el que puedes despegar hoy de esta pista. Casi nunca es el MTOW estructural.

**LO QUE DEBE SABER UN PILOTO**
Hay dos cosas distintas con nombres parecidos:

| | Qué es | De qué depende |
|---|---|---|
| **Structural MTOW** | El límite de diseño de la estructura, en el AFM | Solo del avión. No cambia nunca |
| **Performance Limited Takeoff Weight** | El máximo que la performance permite hoy | De la pista, la atmósfera, los obstáculos, la configuración |

El cálculo obtiene un peso máximo **por cada limitación** y después se queda con **el menor de todos**. Ese menor es el **limiting weight**, y la limitación que lo produjo es el **factor limitante**.

Los candidatos habituales:

- Longitud de pista disponible
- Obstáculos en la trayectoria de salida
- Capacidad de ascenso con un motor inoperativo
- Temperatura
- Altitud de presión
- **Tire speed**: velocidad máxima certificada del neumático
- **Brake energy**: energía máxima que los frenos pueden absorber
- Condición de pista
- Límites estructurales

La idea que hay que llevarse: **el peso permitido lo fija el más restrictivo, no el promedio ni el habitual.** Y cambiar una sola variable puede cambiar cuál de ellos manda.

**EN POCAS PALABRAS**
- MTOW estructural es del avión; el peso permitido es del día.
- Se calcula un peso por limitación y gana el menor.
- Ese menor es el *limiting weight*.
- Cambiar una variable puede cambiar el factor limitante.

**[ESPACIO PARA IMAGEN]** · `PERF-13`
**IMAGEN SUGERIDA:** seis cajas en columna a la izquierda —*Runway Limit*, *Climb Limit*, *Obstacle Limit*, *Brake Energy Limit*, *Tire Speed Limit*, *Structural Limit*— cada una con un peso ficticio distinto, y flechas convergiendo hacia una caja final a la derecha rotulada *Maximum Allowed Takeoff Weight*. La caja del valor más bajo, resaltada, es la única cuya flecha llega gruesa.
**OBJETIVO:** mostrar que el peso permitido lo decide el límite más restrictivo.

---

## TEMA 17 · RUNWAY LIMITED TAKEOFF

**¿QUÉ ES?**
Cuando lo que corta el peso es la pista: no cabe acelerar y detenerse, o no cabe acelerar y continuar.

**LO QUE DEBE SABER UN PILOTO**
Para que el despegue sea legal se tienen que cumplir a la vez:

- **Accelerate-Stop ≤ ASDA** (pista más stopway)
- **Accelerate-Go ≤ TODA** (pista más clearway, con el límite de que la clearway contabilizada no puede pasar de la mitad de la longitud de la pista, 14 CFR 121.189 (c))
- Y la distancia de despegue con todos los motores, afectada por el 115 %, también tiene que caber

Si al peso que querías alguna de esas no cabe, se baja el peso hasta que caiga. Ahí el resultado dice `RUNWAY`.

Las palancas que mueven este caso: la **intersección** —usar toda la pista en vez de una intersección da más TORA—, la **pista** que se elige, el **viento** que la favorece, y la **configuración de flaps**: más flaps acorta la carrera (tema 22).

**EJEMPLO**
Pista corta al nivel del mar, día fresco, sin obstáculos. Sobra empuje y sobra gradiente, pero la pista se acaba: el resultado dirá `RUNWAY`. La solución típica es más flaps, que acorta la carrera aunque penalice el ascenso, porque el ascenso aquí no es el problema.

**EN POCAS PALABRAS**
- Parar tiene que caber en ASDA y seguir en TODA.
- La clearway contabilizada tiene su tope.
- Pista, intersección, viento y flaps son las palancas.
- Más flaps ayuda cuando el problema es la pista.

---

## TEMA 18 · CLIMB LIMITED TAKEOFF

**¿QUÉ ES?**
Cuando lo que corta el peso es la capacidad de sostener el gradiente exigido con un motor inoperativo, casi siempre el del segundo segmento.

**LO QUE DEBE SABER UN PILOTO**
Aquí la pista es irrelevante: puede sobrar kilómetro y medio. Lo que falta es **empuje frente a resistencia**, y eso lo deciden el peso, la temperatura y la altitud de presión.

La cadena es directa: menos densidad → menos empuje → menos exceso sobre la resistencia → menos gradiente. Como el gradiente exigido es fijo —2,4 % en bimotor— y el disponible cae, la única salida es bajar el peso hasta que el disponible vuelva a alcanzar al exigido.

Por eso los aeropuertos **altos y calientes** producen penalizaciones de peso tan grandes, y por eso en esos destinos las aerolíneas programan salidas de madrugada: no buscan menos tráfico, buscan aire más denso.

Palanca secundaria: **menos flaps**. Una configuración más limpia mejora el gradiente aunque alargue la carrera. Si el problema es ascenso y sobra pista, ese cambio suele recuperar peso.

**EJEMPLO**
Aeropuerto a 8 500 ft, 30 °C, pista de 3 800 m, sin obstáculos relevantes. El EFB dice `LIMIT: CLIMB` y el peso queda varias toneladas por debajo del estructural. Añadir pista no serviría de nada; quitar peso o reducir flaps, sí.

**EN POCAS PALABRAS**
- Falta gradiente, no pista.
- Peso, temperatura y altitud son la causa.
- El gradiente exigido no se negocia: se baja el peso.
- Menos flaps puede recuperar peso si sobra pista.

**[ESPACIO PARA IMAGEN]** · `PERF-19`
**IMAGEN SUGERIDA:** gráfico sencillo de dos líneas. Eje horizontal, peso; eje vertical, gradiente de ascenso en el segundo segmento. Una línea horizontal fija rotulada «gradiente exigido · 2,4 %» y tres líneas descendentes de «gradiente disponible», una por cada condición: día fresco a nivel del mar, día caliente a nivel del mar y día caliente en altura. Marcado con un punto dónde cada una cruza la línea del exigido: ese cruce es el peso máximo.
**OBJETIVO:** mostrar por qué la temperatura y la altitud recortan el peso sin que la pista tenga nada que ver.

---

## TEMA 19 · OBSTACLE LIMITED TAKEOFF

**¿QUÉ ES?**
Cuando el peso lo corta algo que está **después** de la pista, no la pista.

**LO QUE DEBE SABER UN PILOTO**
Es el caso que más sorprende: pista larguísima, y el resultado dice `OBSTACLE`. La razón es que el avión tiene que librar el obstáculo **con la trayectoria neta y con un motor menos**, y esa trayectoria arranca a 35 ft al final de la distancia de despegue. Cuanto más pesa, más lenta sube y más lejos está cuando gana la altura que necesita.

Un obstáculo puede ser una antena, una colina, un edificio o el terreno mismo. Y un obstáculo **lejano y alto** puede castigar más que uno cercano y bajo, porque exige sostener el gradiente mucho más tiempo.

**EJEMPLO**
Pista de 4 000 m al nivel del mar, sin problemas de ascenso, pero con un cerro a 6 NM en el eje de salida. El cálculo dice `OBSTACLE` y recorta el peso. Aquí hay dos salidas reales: quitar peso, o usar el **procedimiento con motor inoperativo** que vira antes del cerro, si el operador lo tiene publicado para esa pista. La segunda suele devolver mucho más peso que la primera.

**EN POCAS PALABRAS**
- El obstáculo está después de la pista y aun así manda.
- Se analiza con la trayectoria neta y un motor menos.
- Uno lejano y alto puede castigar más que uno cercano.
- Un procedimiento de viraje puede recuperar el peso perdido.

---

## TEMA 20 · ASSUMED TEMPERATURE / FLEX TAKEOFF

**¿QUÉ ES?**
Un método para despegar con **menos empuje del máximo disponible**, cuando la performance del día deja margen de sobra. Se consigue introduciendo en el sistema una temperatura más alta que la real: el avión calcula el empuje que haría falta si hiciera ese calor, y lo usa.

**LO QUE DEBE SABER UN PILOTO**
La lógica es sencilla y elegante. Si con el peso de hoy el avión podría despegar de esta pista hasta a 55 °C, y hoy hace 25 °C, entonces el empuje que necesitarías a 55 °C **es suficiente** para lo que vas a hacer. Se usa ese, y el resto de empuje se queda sin gastar.

Por qué se hace:

- **Vida del motor.** La temperatura de los gases de escape es lo que más desgasta una turbina. Reducir el empuje de despegue alarga de forma muy significativa el tiempo entre remociones y baja el costo de mantenimiento. Es una de las medidas de ahorro más rentables de una aerolínea.
- Menos ruido y menos consumo en la fase, como efectos secundarios.

Y las condiciones que lo gobiernan:

- **Solo si hay margen.** Si el despegue va al límite de pista, de ascenso o de obstáculo, no hay nada que reducir.
- **Hay un tope.** La guía de la FAA (AC 25-13) admite una reducción de hasta el **25 %** del empuje de despegue con clasificación plena por este método.
- **Las velocidades se revisan contra las mínimas de control a la temperatura real**, no a la asumida. Es el punto fino: si por lo que sea llevas las palancas al tope, produces empuje pleno y la VMCG que aplica es la de verdad.
- **Puedes ir a empuje máximo en cualquier momento.** Con este método el límite certificado del motor no cambió; solo estás usando menos. Si algo pasa, empujar es legal y está previsto.
- **No se usa con pista contaminada.** Con agua estancada, nieve, nieve fundente o hielo, la guía de la FAA desaconseja el empuje reducido, y los fabricantes y operadores lo prohíben expresamente.

Airbus lo llama **FLEX** y la temperatura, *FLEX temp*; Boeing lo llama **Assumed Temperature Method** y la temperatura, *assumed temperature*. La idea es la misma; la implementación, las restricciones y la terminología las fija cada fabricante y cada operador.

**EN POCAS PALABRAS**
- Se asume más calor del que hace y se usa menos empuje.
- Solo cuando sobra performance.
- Hasta un 25 % de reducción, según la guía de la FAA.
- Las velocidades se comprueban contra las mínimas de control **reales**.
- Puedes ir a empuje pleno cuando quieras.
- Con pista contaminada, no.

**[ESPACIO PARA IMAGEN]** · `PERF-14`
**IMAGEN SUGERIDA:** dos barras verticales de empuje lado a lado. La izquierda, llena hasta arriba, *Maximum Takeoff Thrust*. La derecha, llena hasta unos tres cuartos, *Reduced Takeoff Thrust*, con la parte vacía sombreada y rotulada «margen que no se usa». Debajo de las dos, una pista con el punto de 35 ft alcanzado en ambos casos, más adelante en la derecha pero todavía dentro de la pista.
**OBJETIVO:** mostrar que se reduce el empuje porque sobra performance, no porque se acepte menos seguridad.

---

## TEMA 21 · DERATED TAKEOFF

**¿QUÉ ES?**
Otra forma de despegar con menos empuje, pero con una diferencia de fondo respecto al método anterior: aquí el motor pasa a tener **otra clasificación de empuje certificada**, más baja.

**LO QUE DEBE SABER UN PILOTO**
La diferencia entre los dos métodos es la pregunta de entrevista, y se responde con una tabla:

| | **Fixed Derate** | **Assumed Temperature Method / FLEX** |
|---|---|---|
| Qué cambia | El **rating certificado** del motor para ese despegue | Solo el empuje que se decide usar |
| Velocidades mínimas de control | Se recalculan **para el empuje derateado**: VMCG y VMCA bajan | Se comprueban a la **temperatura real**, con el empuje pleno |
| ¿Puedes subir el empuje? | **No** durante el despegue, salvo emergencia: las velocidades ya no valen para más empuje | **Sí**, en cualquier momento |
| Uso típico | Pista contaminada, pista corta y resbaladiza, control direccional | Sobra performance y se quiere cuidar el motor |

La consecuencia operacional del *derate* es la que cuesta: como la VMCG se calculó con menos empuje, **subir el empuje durante la carrera invalida la base del cálculo**. Por eso en muchos aviones el derate se selecciona antes y queda fijado.

Y precisamente porque baja la VMCG, el *derate* es la herramienta cuando el problema es **control direccional en pista resbaladiza**: con menos empuje asimétrico, el avión se controla a menor velocidad.

Los dos métodos **pueden combinarse**: primero se fija un *derate* y sobre él se aplica una temperatura asumida. Cómo y hasta dónde, lo dicen el AFM y el manual del operador. La lógica concreta cambia entre fabricantes y este módulo no la generaliza.

**EN POCAS PALABRAS**
- *Derate* cambia el rating; la temperatura asumida solo el empuje usado.
- Con *derate*, VMCG y VMCA bajan, y por eso no se sube el empuje.
- Con temperatura asumida, puedes ir a empuje pleno cuando quieras.
- Se pueden combinar, según el avión y el operador.

---

## TEMA 22 · EFECTO DE LOS FLAPS EN EL DESPEGUE

**¿QUÉ ES?**
Elegir la configuración de despegue es elegir un compromiso: cada posición de flaps mejora una cosa y empeora otra.

**LO QUE DEBE SABER UN PILOTO**

| | **Más flaps** | **Menos flaps** |
|---|---|---|
| Sustentación a baja velocidad | Más | Menos |
| Velocidades (V₁, VR, V₂) | Más bajas | Más altas |
| Carrera de despegue | **Más corta** | Más larga |
| Resistencia | Más | Menos |
| Gradiente de ascenso | **Peor** | **Mejor** |
| Sirve cuando limita | La **pista** | El **ascenso** o un **obstáculo** |

La regla que se deduce sola: **si el problema es la pista, más flaps; si el problema es subir, menos flaps.** Por eso el mismo avión, con el mismo peso, puede despegar con una configuración en una pista corta a nivel del mar y con otra distinta en una pista larguísima de un aeropuerto alto.

**APLICACIÓN EN AEROLÍNEA**
Algunos sistemas de performance calculan varias configuraciones y proponen la que da el mayor peso permitido o el mejor resultado según la política del operador. Otros dejan la elección a la tripulación dentro de las opciones permitidas. En los dos casos, saber **por qué** una configuración gana es lo que te permite detectar un resultado que no cuadra.

**EN POCAS PALABRAS**
- Más flaps: menos pista, peor gradiente.
- Menos flaps: mejor gradiente, más pista.
- La elección depende de qué esté limitando.
- El peso permitido puede cambiar bastante entre configuraciones.

---

## TEMA 23 · PISTAS MOJADAS Y CONTAMINADAS

**¿QUÉ ES?**
El estado de la superficie cambia dos cosas a la vez: cuánto puedes frenar y, cuando hay contaminante suelto, cuánto te cuesta acelerar.

**LO QUE DEBE SABER UN PILOTO**

| Estado | Definición operacional | Qué le hace a la performance |
|---|---|---|
| **Dry** | Sin humedad visible ni contaminante | Es el caso de referencia |
| **Wet** | Humedad o agua **hasta 3 mm inclusive**, sin agua estancada | Baja el coeficiente de frenado: crece la distancia de parada y baja el peso |
| **Contaminated** | Más de 3 mm de agua o nieve fundente, o nieve o hielo, cubriendo **más del 25 %** del área evaluada | Baja el frenado **y** añade resistencia e *impingement drag* |

Los contaminantes que se notifican y su efecto dominante:

- **Standing water** (agua estancada) y **slush** (nieve fundente): frenado degradado, resistencia añadida y riesgo de *hydroplaning*. Son los peores para una pista de despegue: cuestan al acelerar y cuestan al parar.
- **Snow** (nieve seca o mojada): menos resistencia que el agua, frenado variable según tipo y espesor.
- **Ice** (hielo): la resistencia no es el problema; el frenado y el control direccional, sí. El caso extremo es el hielo mojado.

Lo que cambia en el cálculo:

- **Aceleración** más lenta con contaminante suelto: se llega más tarde a V₁ y a VR.
- **Accelerate-Stop** mucho más larga.
- **Control direccional** degradado, que es donde entra el *derate* del tema 21.
- **V₁ más baja** en muchos casos, para preservar el margen de parada.
- **Peso máximo** menor, a veces mucho menor.

No hay factores numéricos universales: cada avión tiene los suyos, salen del AFM y de los datos del fabricante, y se aplican por tipo y espesor de contaminante. Cualquier número redondo que te den de memoria, desconfía.

**EN POCAS PALABRAS**
- Mojada es hasta 3 mm; por encima es contaminada.
- El contaminante suelto frena la aceleración además de degradar el frenado.
- V₁ y el peso bajan; la distancia de parada sube.
- Los factores son del AFM: no hay regla general.

---

## TEMA 24 · RUNWAY CONDITION CODE · RWYCC

**¿QUÉ ES?**
Una cifra de 0 a 6 que resume la capacidad de frenado que ofrece cada tercio de la pista. Es la pieza del formato global de notificación (*Global Reporting Format*, GRF) de la OACI que llega a la cabina.

**LO QUE DEBE SABER UN PILOTO**
El aeródromo evalúa la pista por **tercios** y publica un código para cada uno, siempre **en el sentido del designador más bajo**. Si aterrizas por la cabecera contraria, el orden se invierte: un 5/3/2 empieza para ti por el 2.

| Código | Estado de la superficie | Eficacia de frenado |
|---|---|---|
| 6 | Seca | — |
| 5 | Escarcha · mojada hasta 3 mm · nieve fundente o nieve hasta 3 mm | Buena |
| 4 | Nieve compactada a −15 °C o menos | Buena a media |
| 3 | Mojada resbaladiza · nieve de más de 3 mm · nieve compactada por encima de −15 °C | Media |
| 2 | Agua estancada o nieve fundente de más de 3 mm | Media a pobre |
| 1 | Hielo | Pobre |
| 0 | Hielo mojado · agua sobre nieve compactada · nieve sobre hielo | Peor que pobre |

Si el contaminante cubre el **25 % o menos** del tercio, se notifica 6 (OACI, Doc 9981).

Para qué te sirve: el RWYCC es la entrada que convierte «la pista está fea» en un número con el que el sistema de performance puede calcular una distancia de aterrizaje. Sin él, la evaluación en vuelo del tema 29 no se puede hacer.

Este módulo no desarrolla el GRF completo: el detalle del informe, el SNOWTAM y la notificación viven en el módulo de Aeropuertos.

**EN POCAS PALABRAS**
- De 6 a 0, por tercios, desde el designador más bajo.
- En sentido contrario, se invierte el orden.
- Con 25 % o menos cubierto, se notifica 6.
- Es la entrada que permite calcular la distancia de aterrizaje real.

---

# NIVEL 5 · RUTA Y ATERRIZAJE

## TEMA 25 · PERFORMANCE EN RUTA

**¿QUÉ ES?**
La performance no se acaba a 1 500 ft. En ruta decide a qué altitud puedes volar, cuánto consumes y qué pasa si pierdes un motor a mitad de océano o sobre una cordillera.

**LO QUE DEBE SABER UN PILOTO**
Cuatro conceptos que aparecen en entrevista:

- **Climb performance.** Con la altura, el aire pierde densidad y el empuje cae, mientras el peso apenas baja. El régimen de ascenso se reduce hasta hacerse muy pequeño cerca del techo.
- **Maximum altitude** (altitud máxima). La mayor a la que el avión puede volar hoy. La limita lo más restrictivo entre el techo certificado, el empuje disponible para mantener nivel y un margen mínimo de maniobra antes del *buffet*.
- **Optimum altitude** (altitud óptima). La que da el mejor rendimiento —normalmente el menor consumo por milla— para el peso actual. **Sube a medida que el avión quema combustible**, y por eso existen los ascensos escalonados (*step climbs*).
- **Engine-out performance.** Con un motor menos, la altitud sostenible baja mucho. Ese es el tema siguiente.

**APLICACIÓN EN AEROLÍNEA**
La diferencia entre máxima y óptima es la que explica por qué el plan de vuelo no te manda siempre a lo más alto posible: volar en la máxima deja sin margen de maniobra y sin capacidad de responder a una turbulencia. La óptima es donde el avión rinde; la máxima es donde todavía cabe.

**EN POCAS PALABRAS**
- El empuje cae con la altura; el peso casi no.
- La máxima es el techo de hoy; la óptima es donde rinde mejor.
- La óptima sube conforme se quema combustible.
- Con un motor menos, la altitud sostenible cae mucho.

---

## TEMA 26 · ENGINE-OUT EN ROUTE · DRIFT DOWN

**¿QUÉ ES?**
Lo que ocurre cuando falla un motor en crucero: el avión ya no puede sostener el nivel y desciende lentamente hasta una altitud que sí pueda mantener con el empuje que le queda.

**LO QUE DEBE SABER UN PILOTO**
A la altitud de crucero, el empuje de los motores restantes no alcanza para igualar la resistencia. El avión no cae: **deriva hacia abajo** (*drift down*), volando a una velocidad que optimiza el descenso, hasta llegar a la **altitud de nivelación** (*net level-off altitude*), donde el empuje restante vuelve a igualar la resistencia. Cuanto más pesa el avión, más baja esa altitud.

Y ahí está el problema real de una ruta con terreno alto: la altitud de nivelación puede quedar **por debajo de las montañas**. Por eso la ruta se planifica antes con este caso en la mano.

La norma de operación pone cifras. En Estados Unidos, 14 CFR 121.191 ofrece dos caminos para un avión de turbina con un motor inoperativo:

- Que la **trayectoria neta** tenga pendiente positiva a **1 000 ft sobre todo el terreno** dentro de **cinco millas terrestres** a cada lado de la ruta prevista, o
- Que el avión, en descenso, **libre el terreno y los obstáculos por al menos 2 000 ft en vertical** dentro de esas cinco millas terrestres, y llegue a un aeródromo adecuado con pendiente positiva a 1 000 ft sobre él.

Europa exige un análisis equivalente en la Parte CAT del Reglamento (UE) 965/2012, con sus propios márgenes.

**APLICACIÓN EN AEROLÍNEA**
De este análisis salen las **rutas de escape** (*escape routes*) de los cruces de cordillera y la selección de aeródromos adecuados. En una ruta sobre los Andes, el punto crítico no es dónde falla el motor: es si, fallando ahí, el perfil de *drift down* te deja por encima del terreno o no. Eso se decide en planificación, no en el aire.

**EN POCAS PALABRAS**
- El avión no cae: desciende hasta donde el empuje restante alcanza.
- Cuanto más pesa, más abajo nivela.
- La FAA da dos opciones: pendiente positiva a 1 000 ft, o librar 2 000 ft.
- De aquí salen las rutas de escape sobre terreno alto.

**[ESPACIO PARA IMAGEN]** · `PERF-15`
**IMAGEN SUGERIDA:** perfil vertical de una ruta sobre una cordillera. El avión en crucero a la izquierda, un icono de falla de motor, y a partir de ahí una trayectoria descendente suave rotulada *Drift Down* que se aplana en una altitud rotulada «nivelación». Cota vertical entre esa altitud y la cima más alta. Al fondo a la derecha, un aeródromo adecuado.
**OBJETIVO:** explicar visualmente el *drift down* y por qué el terreno decide la planificación de la ruta.

---

## TEMA 27 · PERFORMANCE DE ATERRIZAJE

**¿QUÉ ES?**
El cálculo que decide si el avión cabe en la pista al aterrizar, con las condiciones que va a encontrar.

**LO QUE DEBE SABER UN PILOTO**
Las entradas son primas hermanas de las del despegue, pero pesan distinto:

| Entrada | Efecto |
|---|---|
| **Peso de aterrizaje** | Más peso, más velocidad de aproximación y más energía que disipar |
| **Elevación y temperatura** | Menos densidad, más velocidad verdadera para la misma indicada: se toca más rápido respecto al suelo |
| **Viento** | El de cola es el que más castiga, y suele estar limitado por el operador |
| **Pendiente** | Bajando alarga la parada; subiendo la acorta |
| **Configuración** | Flaps de aterrizaje: más flaps, menor VREF y menor distancia |
| **Tipo de aproximación** | Una aproximación más rápida o menos estabilizada alarga todo (tema 30) |
| **Condición de pista** | Define el frenado disponible: es la variable que más mueve el resultado |
| **Braking action** | Lo que se reporta o se calcula a partir del RWYCC |
| **Spoilers** | Descargan el ala y pasan el peso a las ruedas: sin ellos, los frenos muerden mucho menos |
| **Reversas** | Ayudan de verdad, sobre todo a alta velocidad y con poco rozamiento |

El papel de los spoilers es el que más se subestima: no frenan por resistencia aerodinámica, **frenan porque matan la sustentación** y ponen el peso del avión sobre los neumáticos, que es lo que permite a los frenos trabajar.

**EN POCAS PALABRAS**
- Peso, densidad, viento, pendiente, configuración y pista.
- Los spoilers frenan cargando las ruedas, no por resistencia.
- La condición de pista es la que más mueve el número.
- El viento de cola castiga mucho.

---

## TEMA 28 · LANDING DISTANCE

**¿QUÉ ES?**
Cuatro cosas con nombres parecidos que **no significan lo mismo**, y confundirlas es un error típico de entrevista.

**LO QUE DEBE SABER UN PILOTO**

| Término | Qué es | De dónde sale |
|---|---|---|
| **Landing Distance** (certificada) | La demostrada en certificación: desde **50 ft sobre el umbral** hasta detención completa, pista seca, lisa y dura | 14 CFR 25.125 / CS-25.125 |
| **LDA** · *Landing Distance Available* | La pista físicamente disponible para aterrizar, desde el umbral | AIP del aeródromo |
| **Actual Landing Distance** | La que el avión va a necesitar de verdad con las condiciones de hoy, sin margen añadido | Datos del fabricante |
| **Landing Distance Required** | La actual **más el margen** que exija la regla que estés aplicando | Norma de operación |

Y ahí está la clave: **cuál es el margen depende de qué regla aplicas y en qué momento.**

**Al despachar el vuelo.** En Estados Unidos, 14 CFR 121.195 (b) exige poder detenerse dentro del **60 % de la longitud efectiva** de la pista en el destino. Si se prevé pista mojada o resbaladiza, el párrafo (d) exige que la longitud efectiva sea al menos el **115 %** de la requerida en seco. Para turbohélices en alternos, el párrafo (c) usa el **70 %**. En Europa, la Parte CAT del Reglamento (UE) 965/2012 aplica un 60 % equivalente para reactores y añade un 15 % adicional en mojado.

**Cerca del aterrizaje.** Es otra evaluación, con otro nombre y otra lógica: es el tema 29.

Un matiz importante sobre la distancia certificada: se demuestra **sin acreditar reversas** y con una técnica de piloto de ensayo. No es la distancia que vas a recorrer tú un martes cualquiera; es una referencia reproducible.

**EN POCAS PALABRAS**
- La certificada empieza a 50 ft sobre el umbral.
- LDA es lo que hay; *required* es lo que necesitas con margen.
- El margen depende de la regla y del momento.
- FAA en despacho: 60 %, y 115 % de eso si se prevé mojada.
- La certificada no acredita reversas.

**[ESPACIO PARA IMAGEN]** · `PERF-16`
**IMAGEN SUGERIDA:** perfil lateral de aproximación y aterrizaje. El avión cruzando el umbral a 50 ft con cota, el punto de toma de contacto, el recorrido hasta detenerse. Debajo, tres barras acotadas: *Actual Landing Distance*, *Landing Distance Required* (la anterior más un bloque sombreado de margen) y *LDA*, esta última la más larga.
**OBJETIVO:** que se vea físicamente qué mide cada distancia y dónde está el margen.

---

## TEMA 29 · LANDING DISTANCE ASSESSMENT

**¿QUÉ ES?**
La comprobación que hace la tripulación **en vuelo**, con las condiciones reales o previstas al momento de aterrizar, de que el avión cabe en la pista.

**LO QUE DEBE SABER UN PILOTO**
Es distinta de la del despacho, y la diferencia conceptual es la que se pregunta:

| | **Planning performance** (despacho) | **In-flight landing performance assessment** |
|---|---|---|
| Cuándo | Antes de salir, a veces con horas de antelación | Acercándose al destino |
| Con qué datos | Pronóstico y peso estimado | Condición de pista **reportada**, viento real, peso real |
| Para qué | Autorizar la salida del vuelo | Decidir si esta pista sirve **hoy** |

Lo que entra en la evaluación en vuelo: condición de pista y RWYCC vigentes, viento real, peso de aterrizaje real, frenado que se va a usar, configuración, pista y longitud disponibles, y la meteorología de la aproximación.

Y el margen que exige cada lado:

- **FAA.** La SAFO 19001, que recoge las recomendaciones del comité TALPA, promueve un margen del **15 %** entre la distancia de aterrizaje esperada al momento de llegar y la disponible. Es orientación y política de operador, no un requisito de la parte 121.
- **EASA.** El CAT.OP.MPA.303 lo hace **obligatorio**: no se continúa la aproximación salvo que la LDA sea al menos el **115 %** de la distancia de aterrizaje al momento de llegada (*LDTA*). Los factores publicados ya incluyen ese 15 % y una distancia en el aire representativa de la operación normal.

No los mezcles: son la misma cifra con distinto peso legal.

**APLICACIÓN EN AEROLÍNEA**
Por eso, cuando durante el descenso llega un RWYCC peor que el previsto, la evaluación **se rehace**. Puede terminar en cambiar de pista, esperar, aterrizar con menos combustible o irse al alterno. El dato que la dispara casi siempre viene del aeródromo.

**EN POCAS PALABRAS**
- Despacho mira el pronóstico; la evaluación en vuelo mira lo que hay.
- Entran RWYCC, viento, peso y configuración reales.
- FAA: 15 % recomendado. EASA: 115 % obligatorio.
- Si la condición empeora, se rehace la evaluación.

---

## TEMA 30 · EFECTO DE UNA APROXIMACIÓN NO ESTABILIZADA

**¿QUÉ ES?**
Cuánto se alarga la distancia real de aterrizaje cuando la aproximación no llega al umbral como suponía el cálculo.

**LO QUE DEBE SABER UN PILOTO**
El número de performance supone una aproximación concreta: en la senda, a la velocidad de referencia, cruzando el umbral a la altura prevista y con una toma dentro de la zona de contacto. Cada desviación se paga, y **se paga más de lo que parece**:

| Desviación | Qué produce |
|---|---|
| **Exceso de velocidad** | La energía va con el cuadrado de la velocidad: unos pocos nudos de más alargan bastante el recorrido, y además el avión tiende a flotar |
| **Exceso de altura sobre el umbral** | El avión recorre más suelo antes de tocar; cada pie de más se convierte en metros de pista consumida |
| **Tailwind** | Aumenta la velocidad respecto al suelo en todo el recorrido, en el aire y en tierra |
| **Touchdown largo** | Pista consumida antes de empezar a frenar: se resta directamente de lo disponible |
| **Flare prolongado** | Combina las dos anteriores: más flotación y toma más lejos |

Lo importante es que **se acumulan**. Cinco nudos de más, más veinte pies de más sobre el umbral, más un poco de viento de cola, más un flare largo: cada uno parece pequeño y juntos pueden consumir una parte grande del margen que el cálculo había reservado.

Por eso el criterio de aproximación estabilizada no es una formalidad: es la condición bajo la cual los números que calculaste siguen siendo válidos. Si no se cumple, **la maniobra correcta es la frustrada**, y eso también es performance.

**EN POCAS PALABRAS**
- El cálculo supone una aproximación concreta.
- Velocidad, altura, viento de cola y toma larga se suman.
- La energía va con el cuadrado de la velocidad.
- Si no está estabilizada, los números dejaron de valer: se frustra.

**[ESPACIO PARA IMAGEN]** · `PERF-17`
**IMAGEN SUGERIDA:** dos perfiles de aterrizaje superpuestos sobre la misma pista. Arriba, en verde menta, la aproximación en senda y a VREF, con la toma dentro de la zona de contacto y el avión detenido con pista de sobra. Abajo, en tono de aviso, la misma aproximación con exceso de velocidad y altura: flotación marcada, toma pasada la zona de contacto y el avión deteniéndose muy cerca del extremo. Ambas con la distancia recorrida acotada.
**OBJETIVO:** mostrar cuánta pista se pierde por técnica, con el mismo avión y el mismo peso.

---

## TEMA 31 · APPROACH CLIMB Y LANDING CLIMB

**¿QUÉ ES?**
Dos comprobaciones distintas de capacidad de ascenso asociadas al aterrizaje. No son lo mismo y se confunden constantemente.

**LO QUE DEBE SABER UN PILOTO**

| | **Approach Climb** | **Landing Climb** |
|---|---|---|
| Escenario | Frustrada **con el motor crítico inoperativo** | Frustrada **con todos los motores** |
| Configuración | De aproximación, **tren arriba** | De aterrizaje, tren abajo |
| Velocidad | La de aproximación asociada a esa configuración | VREF |
| Empuje | De motor y al aire con el motor bueno | El disponible **8 segundos** después de mover las palancas desde ralentí de vuelo |
| Gradiente exigido | **2,1 %** bimotor · 2,4 % trimotor · 2,7 % cuatrimotor | **3,2 %**, igual para todos |
| Norma | 14 CFR 25.121 (d) / CS-25.121 (d) | 14 CFR 25.119 / CS-25.119 |

Por qué son dos verificaciones separadas: cubren dos fallas distintas. La **approach climb** pregunta si, perdiendo un motor en aproximación, el avión puede irse al aire limpiándose de configuración. La **landing climb** pregunta si, ya configurado para aterrizar y con todo funcionando, puede irse al aire sin retraer nada, contando con que el motor tarda unos segundos en acelerar.

Ese detalle de los **8 segundos** es lo que la hace realista: al iniciar una frustrada desde ralentí, el empuje no está instantáneamente disponible.

En la práctica, la **approach climb suele ser la más restrictiva** y es la que muchas veces fija el peso máximo de aterrizaje en aeropuertos altos y calientes.

**EN POCAS PALABRAS**
- Approach climb: un motor menos, tren arriba, 2,1 % en bimotor.
- Landing climb: todos los motores, configuración de aterrizaje, 3,2 %.
- Los 8 segundos reconocen que el motor tarda en acelerar.
- La approach climb suele ser la que limita el peso.

---

## TEMA 32 · MAXIMUM LANDING WEIGHT

**¿QUÉ ES?**
Igual que en el despegue, hay un límite estructural y un límite de performance, y el que manda es el menor.

**LO QUE DEBE SABER UN PILOTO**

- **Structural Maximum Landing Weight.** Del AFM. Lo fija la resistencia del tren y de la estructura a la velocidad vertical de contacto de diseño. No cambia con el día.
- **Performance-limited landing weight.** El que permiten hoy la pista disponible, la condición de la superficie, el viento, la elevación, la temperatura y **la capacidad de irse al aire**.

Las tres cosas que lo recortan en la práctica:

1. **Distancia**: no cabe la parada en la LDA con el margen exigido.
2. **Approach climb**: no se sostiene el gradiente de frustrada con un motor menos. Muy frecuente en aeropuertos altos y calientes.
3. **Condición de pista**: un RWYCC bajo puede recortar el peso admisible de golpe.

**APLICACIÓN EN AEROLÍNEA**
Cuando el peso de aterrizaje previsto supera el permitido, las salidas son quitar carga de pago, salir con menos combustible —si el alcance lo permite— o, en vuelo, quemar o soltar combustible en los aviones que lo tienen. Y un caso que hay que saber nombrar: un **retorno inmediato** después del despegue puede dejarte por encima del peso máximo de aterrizaje, y eso es una decisión de aterrizaje con sobrepeso, con su propio procedimiento.

**EN POCAS PALABRAS**
- Estructural del AFM; el de performance es del día.
- Distancia, approach climb y condición de pista son los que recortan.
- En alto y caliente suele mandar la approach climb.
- Un retorno inmediato puede dejarte por encima del estructural.

---

## TEMA 33 · BRAKE ENERGY

**¿QUÉ ES?**
La energía que los frenos tienen que absorber y convertir en calor. Está certificada y tiene un tope.

**LO QUE DEBE SABER UN PILOTO**
Al frenar, la energía cinética del avión termina en los discos de freno. Esa energía va con el **peso** y con el **cuadrado de la velocidad**, así que crece muy deprisa: un rechazo a alta velocidad y peso alto es, de lejos, el caso que más exige a los frenos.

De ahí sale **VMBE**, la velocidad máxima de energía de frenos: la mayor a la que se puede iniciar un rechazo sin superar la capacidad certificada. Y la regla que se deduce: **V₁ no puede ser mayor que VMBE**. En aeropuertos altos, calientes y con pesos altos, VMBE puede bajar hasta convertirse en la limitación que fija el peso de despegue.

Consecuencias operacionales que conviene saber nombrar:

- Después de un rechazo a alta velocidad, los frenos quedan muy calientes y hay **tiempos mínimos de enfriamiento** antes de volver a despegar: es un límite del manual del avión, no una precaución opcional.
- Frenos calientes pueden **impedir la retracción del tren** o disparar sus avisos.
- Existen **tablas de energía de frenos** para decidir la espera, y el resultado puede ser desde minutos hasta la revisión de los conjuntos.

Este módulo no entra en el cálculo de ingeniería: lo que el piloto necesita es saber que el límite existe, que puede recortar el peso y que condiciona lo que pasa después de un rechazo.

**EN POCAS PALABRAS**
- La energía va con el peso y con el cuadrado de la velocidad.
- VMBE es la velocidad máxima para rechazar sin pasarse.
- V₁ no puede superar VMBE.
- Después de un rechazo fuerte, hay tiempos de enfriamiento obligatorios.

**[ESPACIO PARA IMAGEN]** · `PERF-20`
**IMAGEN SUGERIDA:** curva creciente de energía absorbida por los frenos contra velocidad de rechazo, claramente cuadrática, con dos puntos marcados y acotados —uno a velocidad baja y otro a velocidad alta— para que se vea que al doble de velocidad la energía es cuatro veces mayor. Una línea horizontal de trazos rotulada «capacidad certificada» cortando la curva, y el punto de corte rotulado VMBE.
**OBJETIVO:** explicar por qué un rechazo a alta velocidad es crítico y de dónde sale VMBE.

---

## TEMA 34 · TIRE SPEED LIMIT

**¿QUÉ ES?**
Cada neumático tiene una **velocidad máxima certificada respecto al suelo**, por encima de la cual su integridad no está garantizada.

**LO QUE DEBE SABER UN PILOTO**
Es un límite de **ground speed**, no de velocidad indicada, y ahí está toda la gracia. En condiciones de aire poco denso, la velocidad indicada de despegue se traduce en una velocidad respecto al suelo mucho mayor. Se juntan tres cosas:

- **Altitud elevada**: menos densidad, más TAS para la misma IAS.
- **Temperatura alta**: lo mismo, agravado.
- **Peso alto**: VR y VLOF más altas.
- Y encima, **viento de cola**, que suma directamente a la velocidad respecto al suelo.

En un aeropuerto alto y caliente, con peso alto y algo de viento de cola, VLOF respecto al suelo puede acercarse al límite del neumático. Cuando eso pasa, el cálculo recorta el peso y el resultado dice `TIRE SPEED`. Es poco frecuente, pero cuando aparece confunde, porque no tiene nada que ver con la longitud de la pista ni con el ascenso.

**EN POCAS PALABRAS**
- Es un límite de velocidad respecto al suelo.
- Alto, caliente, pesado y con viento de cola es la combinación que lo dispara.
- No tiene relación con la pista ni con el gradiente.
- Cuando limita, se quita peso.

---

# NIVEL 6 · EL CÁLCULO EN LA VIDA REAL

## TEMA 35 · PERFORMANCE Y EFB

**¿QUÉ ES?**
Hoy los números llegan a la cabina calculados: por una aplicación en el EFB (*Electronic Flight Bag*), por un sistema del operador o por un mensaje ACARS. El piloto introduce, verifica e interpreta.

**LO QUE DEBE SABER UN PILOTO**

**Lo que normalmente introduces o confirmas:**

| Entrada | Ojo con |
|---|---|
| Aeropuerto | Que sea el de salida, no el de destino del tramo anterior |
| Pista e **intersección** | Es la equivocación más frecuente y la que más peso regala o roba |
| Condición de pista | Seca, mojada o el RWYCC reportado |
| Viento | Dirección y velocidad, tal como los dio la torre o el ATIS |
| Temperatura | La real del momento |
| QNH | Fija la altitud de presión |
| Peso del avión | El del despacho, actualizado si cambió la carga |
| Configuración de flaps | La que vas a usar |
| Anti-ice | Encendido o apagado, como vaya a estar |
| *Packs* | Su posición real para el despegue |
| MEL / CDL | Cualquier ítem diferido con penalización |

**Lo que recibes:**

- Peso máximo permitido
- V₁, VR y V₂
- Ajuste de empuje, y la temperatura asumida o el *derate* si aplica
- **El factor limitante**

**Y lo que de verdad importa:** ese último renglón. El factor limitante te dice **qué cambiaría el resultado**. Si dice `CLIMB`, cambiar de pista no sirve. Si dice `RUNWAY`, más flaps probablemente sí. Si dice `OBSTACLE`, el procedimiento con motor inoperativo puede devolverte toneladas.

**APLICACIÓN EN AEROLÍNEA**
Los *crosschecks* existen porque las entradas se pueden teclear mal. Los tres que más valen:

1. **¿Tiene sentido la magnitud?** Un peso máximo muy por encima de lo habitual para esa pista suele significar intersección equivocada o viento con el signo cambiado.
2. **¿Coincide con lo que ves?** La pista, la intersección, el viento del ATIS, la temperatura.
3. **¿Siguen valiendo las entradas?** Si te cambian la pista, si enciendes el anti-ice, si la temperatura subió, si llegó carga: se recalcula. No se ajusta a ojo.

**EN POCAS PALABRAS**
- Tú introduces y verificas; el sistema calcula.
- La intersección es donde más se falla.
- El factor limitante es el renglón que más información da.
- Si cambia una entrada, se recalcula.

**[ESPACIO PARA IMAGEN]** · `PERF-18`
**IMAGEN SUGERIDA:** pantalla genérica de una aplicación de performance, sin parecerse a la de ningún fabricante ni aerolínea, en tres bloques de izquierda a derecha: *INPUTS* (lista de campos con valores ficticios), una flecha con *PERFORMANCE CALCULATION*, y *OUTPUTS* (peso máximo, V₁, VR, V₂, empuje y una línea destacada *LIMIT*).
**OBJETIVO:** mostrar el flujo entradas → cálculo → velocidades, empuje y factor limitante.

---

## TEMA 36 · LECTURA DE UN RESULTADO DE PERFORMANCE

**¿QUÉ ES?**
Saber leer, renglón por renglón, la hoja que te devuelve el sistema.

**EJEMPLO**
Resultado ficticio, con valores de ejemplo que no corresponden a ninguna aeronave real:

```
RUNWAY:  13L  INT A3
TOW:     XX XXX kg
FLAPS:   XX
V1:      XXX kt
VR:      XXX kt
V2:      XXX kt
THRUST:  ASSUMED TEMP XX °C
LIMIT:   CLIMB
```

| Campo | Qué significa | Qué comprobar |
|---|---|---|
| `RUNWAY` | Pista **y punto de entrada** | Que sean los autorizados. Una intersección distinta cambia todo |
| `TOW` | El peso con el que se calculó | Que sea el peso real de hoy |
| `FLAPS` | Configuración usada | Que sea la que vas a poner |
| `V1` | Máxima para rechazar, mínima para continuar | Que sea ≤ VR |
| `VR` | Cuándo rotar | Que sea ≥ V₁ |
| `V2` | Velocidad objetivo a 35 ft y del segundo segmento | Que sea ≥ VR |
| `THRUST` | Empuje que se va a usar y con qué método | Si hay temperatura asumida, que no haya restricción vigente |
| `LIMIT` | **Qué limitó** el peso | Es lo que te dice qué cambiar si necesitas más |

La comprobación de orden —**V₁ ≤ VR ≤ V₂**— es rápida y detecta buena parte de los errores de tecleo.

**EN POCAS PALABRAS**
- Pista **con intersección**, no solo pista.
- V₁ ≤ VR ≤ V₂, siempre.
- `LIMIT` es el renglón que dice qué mover.
- Los números valen para ese peso y esa configuración.

---

## TEMA 37 · LIMITING FACTOR

**¿QUÉ ES?**
El límite que resultó más restrictivo y, por tanto, el que fijó el peso máximo de hoy.

**LO QUE DEBE SABER UN PILOTO**

| Caso | Situación típica | Limitación | Qué la movería |
|---|---|---|---|
| **A** | Pista corta, nivel del mar, día fresco | `RUNWAY` | Más pista, más flaps, viento de frente |
| **B** | Aeropuerto alto y caliente, pista larga | `CLIMB` | Menos peso, menos flaps, más frío |
| **C** | Pista larga con un cerro en la salida | `OBSTACLE` | Menos peso o procedimiento con motor inoperativo |
| **D** | Todo holgado | `STRUCTURAL` | Nada: ya estás en el tope del avión |

Lo que hay que llevarse: **cambiar una variable puede cambiar cuál es el factor limitante.** Bajas el peso para resolver un `CLIMB` y de pronto aparece `RUNWAY` en otra pista. Pones más flaps para resolver un `RUNWAY` y aparece `CLIMB`. Por eso no existe una solución universal: existe la que ataca **el límite que está mandando hoy**.

Y cuando el resultado dice `STRUCTURAL`, es la mejor noticia posible: significa que la performance no te está quitando nada.

**EN POCAS PALABRAS**
- Gana el más restrictivo.
- Cada límite tiene su palanca propia.
- Resolver uno puede destapar otro.
- `STRUCTURAL` significa que no perdiste nada por performance.

---

## TEMA 38 · ESCENARIOS OPERACIONALES

Diez casos cortos. Cada uno con la pregunta y el razonamiento.

### `esc-01` · Alto y caliente con pista de sobra
Despegas de un aeropuerto a 8 500 ft de elevación, 32 °C, pista de 3 900 m sin obstáculos. El cálculo recorta bastante el peso máximo.
**¿Cuál es la limitación predominante?**
Ascenso. El aire poco denso reduce el empuje y el avión no sostiene el 2,4 % del segundo segmento con un motor menos al peso que querías. La pista es irrelevante aquí. Se quita peso, o se reduce la configuración de flaps para mejorar el gradiente.

### `esc-02` · Obstacle limited con pista larga
El resultado dice `OBSTACLE` aunque la pista mide 4 000 m.
**¿Por qué puede pasar?**
Porque lo que limita está **después** de la pista. La trayectoria neta, degradada y con un motor menos, tiene que pasar por encima del obstáculo con el margen exigido. Cuanto más pesa el avión, más despacio sube y más lejos está cuando gana la altura necesaria. Si el operador tiene un procedimiento con motor inoperativo que vira antes del obstáculo, suele recuperar más peso que cualquier otra medida.

### `esc-03` · La pista amaneció mojada
Habías calculado con pista seca. Al llegar al punto de espera, el ATIS reporta pista mojada.
**¿Qué esperas que cambie?**
La distancia de parada crece, así que el margen de *accelerate-stop* se reduce. Es normal que baje V₁ y que baje el peso máximo. En mojado, además, la reversa **sí** puede estar acreditada en el cálculo, así que una reversa inoperativa por MEL pasa a afectar el número. Se recalcula: no se ajusta a ojo.

### `esc-04` · Cambio de viento a último momento
Te dieron los números con 8 kt de frente. Antes de alinear, la torre reporta 5 kt de cola.
**¿Basta con tener cuidado?**
No. El viento de cola alarga el despegue y la parada, y el cálculo lo penaliza de forma desproporcionada: se acredita como mucho la mitad del viento de frente y se cuenta al menos el 150 % del de cola. Un cambio de frente a cola puede dejar el peso actual por encima del permitido. Se recalcula.

### `esc-05` · Te ofrecen una intersección
Estás rodando a la cabecera y la torre te ofrece salir por una intersección para ganar secuencia.
**¿Qué decides?**
Solo si tienes el cálculo **para esa intersección**. Lo que queda atrás no se recupera: TORA, TODA y ASDA son menores y las tres condiciones tienen que seguir cumpliéndose. Si los números que tienes son de cabecera, no sirven.

### `esc-06` · La temperatura subió
Recibiste los números a las 11:00 y despegas a las 13:20. La temperatura pasó de 28 °C a 35 °C.
**¿Importa?**
Sí. Menos densidad es menos empuje y menos gradiente: el peso máximo baja y las velocidades cambian. Si estabas cerca del límite, el peso actual puede haber dejado de ser legal. Y si usabas temperatura asumida, el margen del que salía la reducción se encogió.

### `esc-07` · Salida con terreno alto
La pista da a un valle rodeado de montañas y el operador publica un procedimiento con motor inoperativo distinto de la SID.
**¿Cuándo lo estudias?**
En el *briefing*, antes de soltar frenos. La SID se diseñó con todos los motores y supone gradientes que el avión con uno menos puede no sostener. Si falla después de V₁ no hay tiempo de averiguar qué aplica. Y si lo vuelas, se informa a control: te estás separando de la autorización.

### `esc-08` · FLEX en pista contaminada
Día frío, mucho margen de performance, pero la pista tiene 6 mm de nieve fundente.
**¿Usas temperatura asumida?**
No. Con la pista contaminada, la guía de la FAA desaconseja el empuje reducido y los fabricantes y operadores lo prohíben. La aceleración y el frenado están degradados y el cálculo no admite gastarse el margen. Lo que sí puede aplicar aquí es un **derate**, que baja la VMCG y ayuda al control direccional: es la herramienta contraria y se elige por otra razón.

### `esc-09` · El destino empeoró en el descenso
Despachaste con pista seca. En el descenso llega un RWYCC de 3/3/2 por lluvia fuerte.
**¿Qué haces?**
Rehacer la evaluación de distancia de aterrizaje con las condiciones del momento: RWYCC, viento y peso reales. Bajo EASA no se continúa salvo que la LDA sea al menos el 115 % de la distancia al momento de llegada; bajo la orientación de la FAA se busca un 15 % de margen. Si no sale, las salidas son otra pista, esperar, o el alterno.

### `esc-10` · Retorno inmediato
Despegaste al peso máximo y a los diez minutos tienes que volver.
**¿Qué problema de performance tienes?**
El peso. Vienes muy por encima del máximo estructural de aterrizaje, porque no quemaste casi nada. Toca decidir entre quemar o soltar combustible —si el avión puede— o hacer un aterrizaje con sobrepeso siguiendo el procedimiento correspondiente. Y con ese peso, la distancia de aterrizaje y la capacidad de frustrada también cambian: no es solo un número estructural.

---

# CIERRE · LO QUE UN PILOTO DE AEROLÍNEA DEBE RECORDAR

1. La performance es de **cada operación**, no del avión: cambia con el día, la pista y el peso.
2. Más peso penaliza despegue, ascenso y aterrizaje, y es la única variable que de verdad controlas.
3. **Hot and high** reduce la performance de forma importante, y los dos efectos se suman.
4. *Pressure altitude* es la entrada del cálculo; *density altitude* es la forma de entender el resultado.
5. El viento de cola castiga mucho más de lo que ayuda el de frente.
6. **V₁, VR y V₂ hacen tres cosas distintas** y ninguna sustituye a otra.
7. V₁ está amarrada a *accelerate-stop*, a *accelerate-go*, a VMCG y a VMBE. No es solo «paro o sigo».
8. El motor falla en **VEF**, no en V₁: entre las dos está el tiempo de reconocimiento.
9. La certificación de transporte supone **falla del motor crítico en el peor momento**. Casi todo el cálculo sale de ahí.
10. El **segundo segmento** es el tramo más exigente del despegue y el que más veces limita el peso.
11. **Gradiente no es régimen de ascenso.** Al obstáculo le importa la pendiente.
12. Los obstáculos se libran con la **trayectoria neta**, que ya viene degradada a propósito.
13. La longitud de pista **no es la única limitación**, y muchas veces no es la que manda.
14. Un obstáculo después de la pista puede recortar el peso aunque sobre asfalto.
15. **TORA, TODA, ASDA y LDA no significan lo mismo.** Clearway suma a TODA; stopway, a ASDA.
16. El **MTOW estructural no siempre** es el peso máximo que puedes usar hoy.
17. El peso permitido lo fija **la limitación más restrictiva**, y resolver una puede destapar otra.
18. Una pista contaminada afecta acelerar **y** frenar, no solo frenar.
19. En seco la reversa no está acreditada en el *accelerate-stop*; en mojado sí puede estarlo.
20. Reducir empuje con temperatura asumida solo se hace **cuando sobra performance**, y nunca con pista contaminada.
21. *Derate* y temperatura asumida **no son lo mismo**: con *derate* no se sube el empuje, porque las velocidades de control se calcularon más bajas.
22. La distancia de aterrizaje se evalúa **también en vuelo**, con lo que hay, no solo al despachar.
23. Una aproximación no estabilizada invalida el cálculo de aterrizaje: la respuesta es la frustrada.
24. **Approach climb** y **landing climb** son dos verificaciones distintas, y la primera suele ser la que limita.
25. El piloto no calcula: **entiende, verifica y sabe qué renglón dice qué cambiar**.

---

# ERRORES FRECUENTES EN ENTREVISTAS

| Error | Por qué está mal |
|---|---|
| Definir V₁ solo como «la velocidad de decisión» | Se pierde lo esencial: V₁ es el punto donde todavía caben tanto la distancia de parar como la de continuar. Sin nombrar *accelerate-stop* y *accelerate-go*, la respuesta está incompleta |
| Confundir VR con V₂ | VR es cuándo rotas; V₂ es la velocidad que tienes que tener a 35 ft y sostener en el segundo segmento. Ni se alcanzan en el mismo momento ni sirven para lo mismo |
| Creer que *balanced field* significa «la pista alcanza de sobra» | Significa que la distancia de parar y la de continuar son iguales. Un campo equilibrado puede estar justo |
| Mezclar TORA, TODA y ASDA | TODA añade clearway, ASDA añade stopway. Se publican por cabecera y no miden lo mismo |
| Confundir clearway con stopway | Clearway es **aire** despejado y suma a TODA. Stopway es **pavimento** y suma a ASDA |
| Dar por hecho que el MTOW es el peso máximo de hoy | El MTOW es estructural. El permitido lo fija el más restrictivo entre pista, ascenso, obstáculos, frenos, neumáticos y estructura |
| Confundir régimen de ascenso con gradiente | El obstáculo entiende de altura por distancia. Dos aviones con el mismo ft/min pueden tener gradientes muy distintos |
| No saber explicar el segundo segmento | Es tren arriba, flaps de despegue, empuje de despegue, V₂ y un motor menos, con 2,4 % en bimotor. Es el tramo que más veces limita el peso |
| Pensar que una pista larga elimina toda restricción | Con `CLIMB` u `OBSTACLE`, la pista no ayuda en nada |
| Olvidar los obstáculos | El análisis de obstáculos es parte del cálculo de despegue, no un extra |
| Explicar FLEX como «bajar potencia a ojo» | Es un método certificado que usa el margen sobrante, con tope de reducción, con las velocidades comprobadas contra las mínimas de control reales y prohibido con pista contaminada |
| Tratar *derate* y temperatura asumida como sinónimos | Con *derate* cambia el rating certificado y **no** se sube el empuje. Con temperatura asumida, sí puedes |
| Pensar que seca, mojada y contaminada dan performance parecida | Cambian el frenado y, con contaminante suelto, también la aceleración. Los factores salen del AFM |
| Confundir LDA con la distancia requerida | LDA es lo que hay; la requerida es lo que necesitas más el margen de la regla que apliques |
| Recitar los números sin saber qué está limitando | Un piloto que no sabe leer el renglón `LIMIT` no puede detectar cuándo el cálculo dejó de ser válido |

---

# ANEXO A · INVENTARIO DE IMÁGENES

| Código | Tema | Qué muestra |
|---|---|---|
| `PERF-01` | Definición inicial | El avión rodeado de las ocho variables de performance |
| `PERF-02` | Tema 2 | Cuatro despegues comparados: nivel del mar, alto y caliente, con frente y con cola |
| `PERF-03` | Tema 3 | Pista con clearway y stopway, y las cuatro distancias declaradas acotadas |
| `PERF-04` | Tema 5 | Línea de tiempo con VMCG, VEF, V₁, VR, VLOF y V₂, con la banda de reconocimiento |
| `PERF-05` | Tema 6 | Secuencia de *accelerate-stop* contra la ASDA |
| `PERF-06` | Tema 7 | Secuencia de *accelerate-go* hasta 35 ft, contra la TODA |
| `PERF-07` | Tema 8 | Gráfico de las dos curvas cruzándose en la V₁ equilibrada |
| `PERF-08` | Tema 10 | Trayectoria *gross* contra *net*, con el margen sombreado |
| `PERF-09` | Tema 11 | Perfil con los cuatro segmentos rotulados y su configuración |
| `PERF-10` | Tema 12 | Triángulo del gradiente y comparación con el régimen de ascenso |
| `PERF-11` | Tema 13 | Acercamiento al segundo segmento y lo que juega en contra |
| `PERF-12` | Tema 14 | Trayectoria neta librando un obstáculo, con los 35 ft acotados |
| `PERF-13` | Tema 16 | Las seis limitaciones convergiendo en el peso permitido |
| `PERF-14` | Tema 20 | Empuje máximo contra empuje reducido |
| `PERF-15` | Tema 26 | Perfil de *drift down* sobre cordillera |
| `PERF-16` | Tema 28 | Aterrizaje desde 50 ft, con las tres distancias acotadas |
| `PERF-17` | Tema 30 | Aterrizaje estabilizado contra uno rápido y alto |
| `PERF-18` | Tema 35 | Pantalla genérica de performance: entradas, cálculo y salidas |
| `PERF-19` | Tema 18 | Gradiente disponible contra exigido: dónde cruza cada condición |
| `PERF-20` | Tema 33 | Energía de frenos contra velocidad, con la capacidad certificada y VMBE |

**Medida de referencia:** 1600 × 900 px, WebP, como el resto de los módulos. Ver `public/modulos/LEEME.md`.

---

# ANEXO B · FUENTES

Todo el contenido de este módulo se apoya en normativa pública y verificable. Las referencias no se muestran al alumno dentro del texto; están aquí para quien mantenga el módulo.

| Tema | Fuente |
|---|---|
| Viento acreditado: 50 % del de frente, 150 % del de cola | 14 CFR 25.105 (d) · CS-25.105 (d) |
| Velocidades de despegue: V₁, VEF, VR, VLOF, V₂MIN, V₂ | 14 CFR 25.107 · CS-25.107 |
| Accelerate-stop, los 2 segundos y el crédito de reversa | 14 CFR 25.109 · CS-25.109 |
| Trayectoria de despegue, 35 ft, 400 ft, V₂ hasta 400 ft | 14 CFR 25.111 · CS-25.111 |
| Distancia de despegue y el 115 % con todos los motores | 14 CFR 25.113 · CS-25.113 |
| Trayectoria neta: 0,8 % / 0,9 % / 1,0 % | 14 CFR 25.115 · CS-25.115 |
| Landing climb 3,2 % y los 8 segundos | 14 CFR 25.119 · CS-25.119 |
| Gradientes de los segmentos y approach climb | 14 CFR 25.121 · CS-25.121 |
| Distancia de aterrizaje certificada desde 50 ft | 14 CFR 25.125 · CS-25.125 |
| Velocidades mínimas de control, VMCG y los 30 ft | 14 CFR 25.149 · CS-25.149 |
| Límites de despegue en operación y obstáculos 35/200/300 ft | 14 CFR 121.189 |
| En ruta con un motor inoperativo: 1 000 ft y 2 000 ft | 14 CFR 121.191 |
| Aterrizaje en despacho: 60 %, 70 % y 115 % | 14 CFR 121.195 |
| Empuje reducido y derateado, tope del 25 % | FAA AC 25-13 |
| Evaluación de aterrizaje al momento de llegada, 15 % | FAA SAFO 19001 (TALPA) |
| Evaluación de aterrizaje obligatoria, 115 % de la LDTA | Reglamento (UE) 965/2012, CAT.OP.MPA.303 |
| Límites de aterrizaje en despacho en Europa | Reglamento (UE) 965/2012, Parte CAT, Subparte POL |
| Código de estado de la pista y el 25 % de cobertura | OACI, Doc 9981 (PANS-Aeródromos) |
| Distancias declaradas y su publicación | OACI, Anexo 14 Volumen I · Anexo 15 |

**Lo que no lleva fuente y por qué:** cualquier cifra que dependa del tipo de avión, de la configuración, del fabricante o del operador —factores de pista contaminada, velocidades concretas, alturas de aceleración, límites de viento de cola, tiempos de enfriamiento de frenos— se explica conceptualmente y se remite al AFM, al FCOM o al manual de operaciones. Este documento no inventa ninguna.

# AVIATORY · INGRESO A AEROLÍNEA → AERODINÁMICA
## Contenido completo del módulo (fuente para implementación)

**Versión:** 1.0 · 15 de septiembre de 2026
**Autor del contenido:** Camilo Osorio Cárdenas (criterio técnico) · estructuración asistida
**Nivel:** Piloto comercial / aspirante a aerolínea. Punto de referencia: más allá del PPL, por debajo de un curso universitario.
**Enfoque:** comprensión → aplicación → entrevista técnica + examen de conocimientos.
**Idioma:** español. Los términos estándar en inglés se conservan entre paréntesis.

---

## 0. FICHA DEL MÓDULO

| Campo | Valor |
|---|---|
| Ruta en la app | Ingreso a aerolínea → Aerodinámica |
| Clave de módulo | `aerodinamica` |
| Lecciones (teoría) | 12 secciones (S01–S12) |
| Práctica | Sección 13 · Aplicación (13 escenarios, `esc-01` a `esc-13`) · Sección 14 · Entrevista (49 preguntas, `ent-01` a `ent-49`) |
| Quiz por sección | 3 a 5 preguntas al final de S01–S12 (45 en total) |
| Quiz final | Banco de 40 preguntas (`ev-01` a `ev-40`), 20 al azar por intento, aprobación 80 % |
| Imágenes | 24 figuras didácticas (`IMG-01` a `IMG-24`), dos por lección, ver Anexo A |
| Tiempo estimado | 12 secciones × 10–15 min + práctica ≈ 4 a 5 h |
| Tarjeta de progreso | **Aerodinámica** · Progreso: 0 % · 12 secciones |

### Convenciones de bloques (para la implementación)

Cada sección usa estos bloques. No es obligatorio que todos aparezcan en cada tema.

| Marca en este documento | Bloque en la interfaz | Uso |
|---|---|---|
| `CONCEPTO` | Texto principal | Explicación breve |
| `APLICACIÓN OPERACIONAL` | Bloque con borde lateral | Cómo se ve en vuelo |
| `DEBES RECORDAR` | Tarjeta destacada (uso moderado) | Idea clave en 1–2 frases |
| `PUNTO CLAVE` | Igual que DEBES RECORDAR | Cierre de sección |
| `PREGUNTA DE ENTREVISTA` | Bloque desplegable (pregunta visible, respuesta oculta) | Pregunta tipo entrevista |
| `[IMAGEN — …]` | Marco de figura integrado (título + pie) | Placeholder hasta tener la ilustración |
| `ESQUEMA` | Diagrama tipográfico (no imagen) | Relaciones simples |
| Tablas | Tabla responsive | Datos comparativos |

### Formato de las preguntas de opción múltiple

```
**id** · Enunciado
- A) …
- B) …
- C) …
- D) …
**Correcta:** letra · **Tema:** Sxx
**Explicación:** …
```

La explicación se muestra después de responder (quiz de sección: inmediata; quiz final: al terminar).

---
# SECCIÓN 1 · FUNDAMENTOS DE AERODINÁMICA
**ID:** S01 · **Tiempo:** 10 min
**Objetivo:** manejar el vocabulario físico que usa el resto del módulo.

### Qué es la aerodinámica
**CONCEPTO**
La aerodinámica estudia las fuerzas que aparecen cuando un cuerpo se mueve en el aire. Para un piloto de aerolínea no es una colección de fórmulas: explica por qué el avión necesita más empuje al configurar, por qué pierde margen al virar lento, por qué flota si llega rápido al flare y por qué una misma IAS representa una TAS mayor en altura. La pregunta útil siempre es la misma: qué cambió en la velocidad, el ángulo de ataque, la configuración o la atmósfera, y cómo cambia con ello la sustentación, la resistencia y el margen disponible.

### El aire como fluido
**CONCEPTO**
El aire es un gas: fluye, tiene masa y se comprime. A bajas velocidades (del orden de Mach 0,3 o menos) su densidad casi no cambia al rodear el avión y se analiza como incompresible. A velocidades de crucero de un jet la compresibilidad ya no se puede ignorar (Sección 10): por eso en aproximación se vigila principalmente la IAS, mientras que a FL350 también importa el Mach y el margen hasta MMO.

| Propiedad | Qué es | Por qué le importa al piloto |
|---|---|---|
| **Presión estática** | Presión que ejerce el aire en reposo sobre cualquier superficie | Base del altímetro; su distribución sobre el ala produce la sustentación |
| **Presión dinámica (q)** | Presión asociada al movimiento: q = ½ ρ V² | Es lo que "siente" el ala; la IAS sigue esa presión a través del sistema pitot-estático, con sus errores de instrumento y posición |
| **Densidad (ρ)** | Masa de aire por unidad de volumen | Menos densidad → menos sustentación, empuje y potencia a una misma TAS |
| **Temperatura** | Estado térmico del aire | Afecta la densidad y es la variable principal de la velocidad del sonido en el modelo de aire ideal usado en operación |
| **Viscosidad** | Resistencia interna del aire a fluir | Origina la capa límite y la resistencia por fricción |

**Dato de referencia (atmósfera estándar):** a nivel del mar, 15 °C, la velocidad del sonido es 661 kt; a unos –55 °C (≈ 40.000 ft) baja a 574 kt (FAA, PHAK).

### Flujo de aire, viento relativo y líneas de corriente
**CONCEPTO**
- **Viento relativo (Relative Wind):** dirección del flujo de aire respecto al ala. Es paralelo y opuesto a la **trayectoria de vuelo**, no a la actitud. Si el avión desciende, el viento relativo llega desde abajo, aunque la nariz esté arriba.
- **Líneas de corriente (Streamlines):** trayectorias del aire en un flujo estable. Donde se juntan, el aire se acelera y su presión estática baja; donde se separan, se frena y la presión sube.

En una aproximación estabilizada el avión puede llevar la nariz unos grados arriba mientras su trayectoria desciende hacia la pista. El viento relativo llega opuesto a esa trayectoria descendente; el ángulo entre ese flujo y la cuerda es el ángulo de ataque. Esta diferencia permite entender por qué «nariz arriba» no significa necesariamente «subiendo» y por qué un avión todavía puede entrar en pérdida mientras desciende.

[IMAGEN — FLUJO DE AIRE Y VIENTO RELATIVO] · `IMG-01`
*Pie:* El viento relativo es opuesto a la trayectoria de vuelo, no a la dirección hacia donde apunta la nariz.

[IMAGEN — ACTITUD, TRAYECTORIA Y VIENTO RELATIVO] · `IMG-13`
*Pie:* La actitud describe hacia dónde apunta el avión; la trayectoria indica hacia dónde se mueve. El viento relativo siempre llega en sentido opuesto a esa trayectoria.

### Capa límite
**CONCEPTO**
Por viscosidad, el aire justo en contacto con la superficie tiene velocidad relativa prácticamente nula. Desde allí, la velocidad aumenta dentro de una capa delgada hasta alcanzar la del flujo libre. Esa región es la **capa límite (Boundary Layer)**. Aunque no sea visible desde la cabina, su estado explica señales que sí reconoce el piloto: un ala contaminada necesita más ángulo de ataque para sostener el vuelo, produce más resistencia y puede separarse antes de que el aviso de pérdida calibrado para un ala limpia dé el margen esperado.
- **Flujo laminar:** capas ordenadas y poca fricción, pero con menos intercambio de cantidad de movimiento con el flujo exterior; se separa con mayor facilidad ante un gradiente de presión adverso.
- **Flujo turbulento:** mezcla y remolinos, más fricción, pero también más intercambio de cantidad de movimiento cerca de la superficie; resiste mejor la separación.
- **Separación:** cuando la capa límite ya no puede seguir la superficie, se desprende. La resistencia aumenta y la sustentación disminuye. Con más ángulo de ataque, el punto de separación avanza hacia el borde de ataque.

**APLICACIÓN OPERACIONAL**
Los generadores de vórtice (Vortex Generators) mezclan aire de alta energía con la capa límite para retrasar la separación. Hielo, escarcha o suciedad en el ala hacen lo contrario: alteran el flujo, adelantan la separación y reducen el CLmax. Por eso una capa de escarcha antes del despegue no se trata como un problema cosmético; puede aumentar la carrera, degradar el ascenso y hacer que el ala entre en pérdida a menor ángulo de ataque.

> **DEBES RECORDAR**
> El viento relativo lo define la trayectoria, no la actitud. Y la separación de la capa límite es el mecanismo físico de la pérdida.

### Quiz · Sección 1

**s01-q1** · ¿Qué define la dirección del viento relativo?
- A) La trayectoria de vuelo del avión respecto a la masa de aire
- B) La dirección del viento reportado en el METAR
- C) La dirección hacia donde apunta la nariz del avión
- D) La línea de cuerda del ala respecto al horizonte
**Correcta:** A · **Tema:** S01
**Explicación:** El viento relativo es paralelo y opuesto a la trayectoria de vuelo. La actitud y la cuerda no lo determinan; el viento meteorológico cambia la velocidad sobre el terreno, no el viento relativo.

**s01-q2** · En el modelo de aire ideal usado en operación, ¿qué variable determina principalmente la velocidad del sonido?
- A) La humedad
- B) La temperatura
- C) La presión
- D) La densidad
**Correcta:** B · **Tema:** S01
**Explicación:** Para una composición del aire prácticamente constante, la velocidad del sonido depende principalmente de la temperatura. Por eso disminuye al ascender hasta la tropopausa; la humedad introduce una corrección pequeña que no cambia esta regla operacional.

**s01-q3** · Frente a una capa límite laminar, la turbulenta:
- A) No produce fricción porque el aire se mezcla
- B) Solo aparece por encima del Mach crítico
- C) Produce más fricción, pero tiene más energía y resiste mejor la separación
- D) Produce menos fricción y se separa con más facilidad
**Correcta:** C · **Tema:** S01
**Explicación:** La turbulenta tiene más fricción, pero su mezcla lleva energía a la superficie y retrasa la separación. La laminar tiene menos fricción y es menos estable.

---

# SECCIÓN 2 · LAS CUATRO FUERZAS DEL VUELO
**ID:** S02 · **Tiempo:** 10 min
**Objetivo:** explicar cómo se equilibran las fuerzas en cada fase del vuelo.

### Las fuerzas
**CONCEPTO**
| Fuerza | Dirección | Qué la produce |
|---|---|---|
| **Sustentación (Lift)** | Perpendicular al viento relativo | El ala al desviar el flujo y crear diferencia de presión |
| **Peso (Weight)** | Hacia el centro de la Tierra, aplicado en el CG | La gravedad sobre la masa total |
| **Empuje (Thrust)** | Hacia adelante, a lo largo del eje de los motores | Motores y hélices |
| **Resistencia (Drag)** | Paralela y opuesta al viento relativo | Forma, fricción, interferencia y la propia sustentación |

[IMAGEN — LAS CUATRO FUERZAS DEL VUELO] · `IMG-02`
*Pie:* Vuelo nivelado y ascenso estabilizado. En ascenso, una componente del peso actúa hacia atrás a lo largo de la trayectoria.

### Comportamiento por fase de vuelo
| Fase | Relación de fuerzas | Lo que pasa realmente |
|---|---|---|
| **Recto y nivelado, velocidad constante** | L = W · T = D | Fuerzas en equilibrio; no hay aceleración |
| **Ascenso estabilizado** | T > D · L ligeramente **menor** que W | Parte del peso actúa hacia atrás en la trayectoria; el empuje sobrante la compensa. El ascenso lo sostiene el **exceso de empuje**, no un exceso de sustentación |
| **Descenso estabilizado** | T < D · L ligeramente menor que W | Una componente del peso actúa hacia adelante y reemplaza parte del empuje |
| **Aceleración en nivelado** | T > D | Al aumentar la velocidad hay que **reducir** el ángulo de ataque para no ganar altitud |
| **Desaceleración en nivelado** | T < D | Al bajar la velocidad hay que **aumentar** el ángulo de ataque para mantener L = W |

La tabla se reconoce en maniobras normales. Al nivelar después del ascenso, el piloto baja la nariz y mantiene o ajusta el empuje; el avión acelera y el ángulo de ataque disminuye para conservar la altitud. En una aproximación ocurre lo contrario: al reducir velocidad y extender configuración, se necesita más ángulo de ataque y más empuje para equilibrar la resistencia adicional. Si se intenta corregir una velocidad baja solo levantando la nariz, se intercambia velocidad por altura y se agrava la falta de energía.

**APLICACIÓN OPERACIONAL**
En un ascenso con empuje fijo, si subes la nariz aumentas inicialmente el ángulo de trayectoria, pero la velocidad cae porque el empuje disponible no cambió. Es lo que el piloto observa cuando intenta seguir una restricción de altitud demasiado exigente sin energía suficiente: el flight director puede pedir más pitch, pero la velocidad empieza a deteriorarse. El mando de profundidad redistribuye energía entre velocidad y altura; no crea energía.

[IMAGEN — PITCH, EMPUJE Y ENERGÍA] · `IMG-14`
*Pie:* Cambiar la actitud redistribuye velocidad y altura; el empuje disponible determina cuánta energía puede sostener o recuperar el avión.

> **PUNTO CLAVE**
> En vuelo estabilizado (ascenso, crucero o descenso) las fuerzas están en equilibrio. Lo que hace subir al avión es el exceso de empuje sobre la resistencia, no más sustentación que peso.

**PREGUNTA DE ENTREVISTA**
*¿En un ascenso estabilizado la sustentación es mayor que el peso?*
No. Es ligeramente menor. En la trayectoria inclinada, una componente del peso actúa hacia atrás y la compensa el empuje; la sustentación solo equilibra la componente del peso perpendicular a la trayectoria.

### Quiz · Sección 2

**s02-q1** · En vuelo recto y nivelado a velocidad constante:
- A) La resistencia es cero
- B) La sustentación es mayor que el peso
- C) El empuje es mayor que la resistencia
- D) Sustentación igual a peso y empuje igual a resistencia
**Correcta:** D · **Tema:** S02
**Explicación:** Sin aceleración, las fuerzas opuestas se equilibran.

**s02-q2** · ¿Qué permite a un avión mantener un ascenso estabilizado?
- A) Que el empuje supere a la resistencia
- B) Que el ángulo de ataque sea mayor que el crítico
- C) Que la sustentación supere al peso
- D) Que el peso actúe hacia adelante
**Correcta:** A · **Tema:** S02
**Explicación:** El exceso de empuje compensa la componente del peso que actúa hacia atrás en la trayectoria. La sustentación es incluso algo menor que el peso.

**s02-q3** · Un avión acelera en vuelo nivelado. Para mantener la altitud, el piloto debe:
- A) Mantener el mismo ángulo de ataque
- B) Reducir el ángulo de ataque
- C) Extender flaps
- D) Aumentar el ángulo de ataque
**Correcta:** B · **Tema:** S02
**Explicación:** La sustentación depende de V². Si la velocidad aumenta con el mismo ángulo de ataque, la sustentación crece y el avión sube; hay que reducir el ángulo de ataque.

---

# SECCIÓN 3 · SUSTENTACIÓN Y PERFILES AERODINÁMICOS
**ID:** S03 · **Tiempo:** 12 min
**Objetivo:** explicar la sustentación con precisión y usar la ecuación sin hacer derivaciones.

### El perfil aerodinámico (Airfoil)
| Término | Definición |
|---|---|
| **Borde de ataque (Leading Edge)** | Parte delantera del perfil, donde el flujo se divide |
| **Borde de salida (Trailing Edge)** | Parte trasera, donde el flujo se reúne |
| **Cuerda (Chord Line)** | Línea recta imaginaria entre borde de ataque y borde de salida |
| **Curvatura (Camber)** | Curvatura del perfil respecto a la cuerda; más curvatura, más sustentación a un mismo ángulo de ataque |
| **Espesor (Thickness)** | Distancia máxima entre extradós e intradós |
| **Viento relativo** | Dirección del flujo respecto al perfil (Sección 1) |
| **Ángulo de ataque (AOA)** | Ángulo entre la cuerda y el viento relativo |
| **Coeficiente de sustentación (CL)** | Número sin unidades que resume la capacidad del ala para producir sustentación en una condición dada |

Estos términos aparecen juntos cada vez que el avión cambia de fase. Al seleccionar flaps para la aproximación aumenta la curvatura del perfil y el CL disponible; el avión puede sostener el peso a menor velocidad, pero también aumenta la resistencia. Al retraer la configuración después del despegue, el ala vuelve progresivamente a una forma más eficiente para acelerar y ascender.

[IMAGEN — PERFIL AERODINÁMICO ETIQUETADO] · `IMG-03`
*Pie:* Borde de ataque, borde de salida, cuerda, curvatura, espesor, viento relativo y ángulo de ataque.

### Cómo se genera la sustentación
**CONCEPTO**
El ala está inclinada y curvada respecto al flujo. Al pasar, **desvía el aire hacia abajo** detrás del ala (downwash), con una corriente ascendente delante (upwash). Para desviar ese flujo, el ala crea una **distribución de presiones**: menor presión sobre el extradós y mayor presión en el intradós. La diferencia de presión, sumada sobre toda el ala, es la sustentación. En operación, cuando el avión reduce velocidad en la aproximación, el piloto aumenta el ángulo de ataque y configura el ala para mantener esa diferencia de presión; si sigue reduciendo velocidad sin añadir empuje, el ángulo requerido se acerca al crítico y el margen de pérdida disminuye.

Hay tres formas de describir el mismo fenómeno. No compiten entre sí:

| Enfoque | Qué explica |
|---|---|
| **Distribución de presión** | La fuerza actúa sobre el ala como diferencia de presión entre extradós e intradós |
| **Newton (cantidad de movimiento)** | El ala empuja aire hacia abajo; el aire empuja el ala hacia arriba (tercera ley) |
| **Bernoulli** | A lo largo de una línea de corriente, donde el aire se acelera la presión baja; relaciona la velocidad del flujo con esa distribución de presiones |

NASA lo resume así: tanto Bernoulli como Newton son correctos; integrar la presión o el cambio de velocidad del flujo da la misma fuerza aerodinámica.

**Error común que debes evitar en una entrevista:** la teoría del "tiempo de tránsito igual" (el aire de arriba recorre más distancia y debe llegar al mismo tiempo que el de abajo) es **falsa**. El aire del extradós llega antes al borde de salida, y un perfil simétrico, con extradós e intradós de igual longitud, produce sustentación con ángulo de ataque positivo.

### La ecuación de sustentación

[IMAGEN — VARIABLES DE LA SUSTENTACIÓN] · `IMG-15`
*Pie:* La sustentación depende de densidad, velocidad al cuadrado, superficie alar y coeficiente de sustentación. Ninguna variable actúa de forma aislada.
**ESQUEMA**
```
L = ½ ρ V² S CL
```
| Variable | Significado | ¿Quién la controla? |
|---|---|---|
| **L** | Sustentación | Resultado |
| **ρ** (rho) | Densidad del aire | La atmósfera (altitud, temperatura, humedad) |
| **V** | Velocidad verdadera respecto al aire (TAS) | El piloto, con empuje y actitud |
| **½ ρ V²** | Presión dinámica (q) | La IAS se obtiene de la diferencia entre presión total y estática; a bajo Mach esa presión de impacto aproxima q, por eso la IAS es la referencia aerodinámica |
| **S** | Superficie alar | Fija (los flaps tipo Fowler la aumentan) |
| **CL** | Coeficiente de sustentación | El piloto, con el ángulo de ataque y la configuración (flaps, slats). También lo afectan el Mach, la contaminación y el número de Reynolds |

**APLICACIÓN OPERACIONAL**
- La sustentación depende del **cuadrado** de la velocidad. Si la velocidad baja a la mitad, para sostener el mismo peso el CL tendría que ser cuatro veces mayor. En una final, una pequeña pérdida de velocidad no se compensa gratis: exige más ángulo de ataque y aumenta la resistencia inducida, de modo que el piloto necesita corregir con empuje antes de que la tendencia se amplifique.
- Para un peso dado, a baja velocidad el ala vuela con alto ángulo de ataque; a alta velocidad, con bajo ángulo de ataque. Por eso el mismo avión que en crucero lleva una actitud casi nivelada necesita una actitud de nariz arriba y dispositivos hipersustentadores al aproximarse.
- A igual IAS, la presión de impacto indicada es la misma; a bajo Mach aproxima la misma presión dinámica. Por eso las velocidades de pérdida, rotación y límites de flaps se publican en IAS/CAS.

> **DEBES RECORDAR**
> Newton, Bernoulli y la distribución de presión describen el mismo fenómeno. En vuelo, el piloto modifica la sustentación con la velocidad y el ángulo de ataque.

### Quiz · Sección 3

**s03-q1** · ¿Cuál es la afirmación correcta sobre la generación de sustentación?
- A) Solo Bernoulli la explica; Newton aplica únicamente a motores
- B) La sustentación se genera principalmente por el impacto del aire en el intradós
- C) El ala desvía el flujo hacia abajo creando una diferencia de presión; Newton y Bernoulli describen el mismo fenómeno
- D) El aire de arriba debe llegar al borde de salida al mismo tiempo que el de abajo
**Correcta:** C · **Tema:** S03
**Explicación:** La diferencia de presión y el desvío del flujo son dos caras del mismo proceso. El "tiempo de tránsito igual" es falso.

**s03-q2** · En L = ½ ρ V² S CL, ¿qué variables controla el piloto en vuelo?
- A) Solo S
- B) ρ y CL
- C) ρ y S
- D) V y CL (con ángulo de ataque y configuración)
**Correcta:** D · **Tema:** S03
**Explicación:** La densidad la impone la atmósfera y la superficie alar es fija. El piloto actúa sobre la velocidad y sobre el CL mediante el ángulo de ataque, flaps y slats.

**s03-q3** · Si la velocidad se reduce a la mitad y el peso no cambia, el CL necesario para mantener el vuelo nivelado:
- A) Se multiplica por cuatro
- B) No cambia
- C) Se reduce a la mitad
- D) Se duplica
**Correcta:** A · **Tema:** S03
**Explicación:** La sustentación es proporcional a V². La mitad de velocidad da una cuarta parte de presión dinámica; el CL debe cuadruplicarse.

**s03-q4** · Un perfil simétrico:
- A) Solo produce sustentación en vuelo invertido
- B) Produce sustentación cuando tiene ángulo de ataque positivo
- C) Produce sustentación porque su extradós es más largo
- D) No produce sustentación en ninguna condición
**Correcta:** B · **Tema:** S03
**Explicación:** Con ángulo de ataque positivo desvía el flujo hacia abajo y genera diferencia de presión, aunque sus dos superficies tengan igual longitud.

---
# SECCIÓN 4 · ÁNGULO DE ATAQUE Y PÉRDIDA
**ID:** S04 · **Tiempo:** 15 min · **Sección prioritaria**
**Objetivo:** explicar la pérdida por ángulo de ataque, no por velocidad, y aplicarlo a cualquier actitud y configuración.

### Ángulo de ataque y actitud de cabeceo
**CONCEPTO**
| Término | Definición | Referencia |
|---|---|---|
| **Ángulo de ataque (Angle of Attack – AOA)** | Ángulo entre la cuerda del ala y el viento relativo | La masa de aire |
| **Actitud de cabeceo (Pitch Attitude)** | Ángulo entre el eje longitudinal del avión y el horizonte | La Tierra |
| **Ángulo de trayectoria (Flight Path Angle)** | Ángulo entre la trayectoria de vuelo y el horizonte | La Tierra |

**ESQUEMA** (alas niveladas, simplificado)
```
PITCH  ≈  AOA  +  ÁNGULO DE TRAYECTORIA
```
| Situación | Pitch | Trayectoria | AOA aproximado |
|---|---|---|---|
| Ascenso normal | +10° | +7° | 3° |
| Aproximación estabilizada | +3° | –3° | 6° |
| Nariz arriba, descendiendo fuerte | +15° | –25° | 40° (en pérdida) |

*Valores ilustrativos para mostrar la relación, no de un tipo de avión específico.*

**APLICACIÓN OPERACIONAL**
La última fila no es teórica. En el accidente del AF447 (BEA, informe final), a unos 38.000 ft la actitud y el ángulo de ataque llegaron a 16°; después, con la nariz todavía arriba y una velocidad vertical de descenso cercana a 10.000 ft/min, el ángulo de ataque superó los 40°. La actitud por sí sola no indica si el ala está volando.

> **DEBES RECORDAR**
> Pitch y ángulo de ataque no son lo mismo. Una actitud de nariz arriba no garantiza que el avión esté subiendo ni que el ala esté fuera de pérdida.

### Ángulo de ataque crítico y pérdida
**CONCEPTO**
- Al aumentar el ángulo de ataque, el CL aumenta hasta un máximo: el **CLmax**. El ángulo al que ocurre es el **ángulo de ataque crítico (Critical Angle of Attack)**.
- Al superarlo, el flujo se separa del extradós, el CL cae y la resistencia aumenta bruscamente. Eso es la **pérdida aerodinámica (Stall)**.
- En pérdida el ala **no deja de producir sustentación por completo**; deja de producir la necesaria para sostener el vuelo.
- Para una configuración dada, un ala limpia y a bajo Mach, el ángulo de ataque crítico no depende de la velocidad, el peso, el factor de carga ni la altitud de densidad.
- **Sí lo cambian:** flaps de borde de salida (lo reducen, aunque aumentan el CLmax), slats y dispositivos de borde de ataque (lo aumentan), contaminación del ala (lo reduce) y el número de Mach alto (lo reduce, Sección 11).

[IMAGEN — CURVA DE SUSTENTACIÓN VS ÁNGULO DE ATAQUE] · `IMG-04`
*Pie:* CL aumenta con el ángulo de ataque hasta CLmax; después del ángulo crítico el CL cae. Curvas comparadas: ala limpia, con flaps y con slats.

> **DEBES RECORDAR**
> Un avión entra en pérdida cuando supera su ángulo de ataque crítico. La pérdida no ocurre simplemente porque el avión llegue a una velocidad determinada.

[IMAGEN — RECUPERACIÓN DE LA PÉRDIDA] · `IMG-16`
*Pie:* La prioridad es reducir el ángulo de ataque. Después se nivelan las alas, se gestiona el empuje y se ajusta la configuración según el procedimiento del fabricante.

### Velocidad de pérdida
**CONCEPTO**
La **velocidad de pérdida (Stall Speed)** es la velocidad a la que, **en unas condiciones concretas**, el ala alcanza su ángulo de ataque crítico. Es una consecuencia, no la causa. Una velocidad publicada solo es válida para el peso, la configuración y el factor de carga con que fue determinada; por eso un avión puede activar el stick shaker por encima de esa cifra durante un viraje, una ráfaga o una recuperación con G elevada.

| Factor | Efecto en la velocidad de pérdida | Por qué |
|---|---|---|
| Mayor peso | Aumenta (proporcional a √peso) | Se necesita más sustentación |
| Mayor factor de carga (viraje, tirón) | Aumenta (proporcional a √n) | Se necesita más sustentación |
| CG adelantado | Aumenta | Más carga hacia abajo en la cola → más sustentación requerida en el ala |
| Flaps y slats extendidos | Disminuye | Mayor CLmax |
| Hielo, escarcha, nieve en el ala | Aumenta | Separación a menor ángulo de ataque y menor CLmax |
| Mach alto (gran altitud) | Aumenta la IAS de pérdida | Menor ángulo de ataque de pérdida y menor CLmax |
| Turbulencia | Puede producir pérdida a una velocidad mayor | Ráfagas verticales cambian el ángulo de ataque de forma súbita |

La certificación de transporte (14 CFR 25.103) determina la velocidad de pérdida de referencia en 1 g y con la posición del CG que da la velocidad más alta, es decir, adelantado.

### Pérdida acelerada y pérdida en viraje
**CONCEPTO**
- **Pérdida acelerada (Accelerated Stall):** pérdida con factor de carga mayor a 1 g. Ocurre a una velocidad superior a la de pérdida en 1 g. Por ejemplo, si el piloto corrige con un tirón brusco una senda baja o la salida de un picado, el aumento de G exige más sustentación y puede llevar el ala al ángulo crítico aunque la velocidad parezca suficiente.
- **Pérdida en viraje:** en un viraje nivelado el ala debe producir más sustentación que el peso. Para lograrlo, el piloto aumenta el ángulo de ataque; con más alabeo, el ángulo crítico se alcanza a mayor velocidad (Sección 6).
- **Pérdida en diferentes configuraciones:** con flaps y slats la velocidad de pérdida baja. En alas en flecha la tendencia es entrar en pérdida primero en las puntas, lo que desplaza la sustentación hacia adelante y produce cabeceo hacia arriba. En aviones con cola en T, la cola puede quedar en la estela del ala en pérdida y perder efectividad; por eso muchos tienen empujador de bastón (Stick Pusher).

### Recuperación de la pérdida en avión de transporte
**APLICACIÓN OPERACIONAL**
Plantilla de recuperación de la FAA (AC 120-109A). Los fabricantes la adaptan en su QRH/FCTM; en el avión manda el procedimiento del tipo.

1. Piloto automático y autothrottle/autothrust — **Desconectar**
2. Mando de cabeceo nariz abajo — **Aplicar hasta eliminar las indicaciones de pérdida inminente** · Compensación nariz abajo — **Según necesidad**
3. Alabeo — **Alas niveladas**
4. Empuje — **Según necesidad**
5. Speed brakes / spoilers — **Retraer**
6. Regresar a la trayectoria deseada

- Reducir el ángulo de ataque es la acción más importante.
- La recuperación normalmente implica pérdida de altitud; la AC 120-109A pide aceptarla.
- El empuje máximo no siempre es lo correcto: en aviones con motores bajo el ala, a baja velocidad genera un momento de nariz arriba fuerte.

### Preguntas que debes poder responder
**PREGUNTA DE ENTREVISTA** · *¿Un avión puede entrar en pérdida a alta velocidad?*
Sí. Basta con superar el ángulo de ataque crítico, por ejemplo con un tirón brusco al salir de un picado. La FAA lo resume: la pérdida puede ocurrir a cualquier velocidad, en cualquier actitud y con cualquier potencia.

**PREGUNTA DE ENTREVISTA** · *¿Puede entrar en pérdida durante un descenso?*
Sí. En descenso el viento relativo viene desde abajo. Si el piloto sube la nariz sin energía suficiente, el ángulo de ataque aumenta aunque el avión siga bajando.

**PREGUNTA DE ENTREVISTA** · *¿Puede entrar en pérdida durante un viraje?*
Sí, y a una velocidad mayor que en vuelo recto. El viraje aumenta el factor de carga y la sustentación requerida; con 60° de alabeo nivelado, la velocidad de pérdida aumenta cerca de 41 %.

**PREGUNTA DE ENTREVISTA** · *¿La velocidad de pérdida siempre es la misma?*
No. Cambia con peso, factor de carga, configuración, posición del CG, contaminación y Mach. Lo que no cambia, para una configuración dada y ala limpia, es el ángulo de ataque crítico.

### Quiz · Sección 4

**s04-q1** · Un avión entra en pérdida cuando:
- A) Su actitud de cabeceo supera 20°
- B) El empuje es menor que la resistencia
- C) Supera su ángulo de ataque crítico
- D) Su velocidad cae por debajo de la velocidad de pérdida publicada
**Correcta:** C · **Tema:** S04
**Explicación:** La única condición necesaria es superar el ángulo de ataque crítico. La velocidad publicada corresponde a condiciones específicas (peso, configuración, 1 g).

**s04-q2** · Un avión tiene 12° de pitch y su trayectoria es de –8°. Su ángulo de ataque aproximado es:
- A) 4°
- B) 12°
- C) 20°
- D) –8°
**Correcta:** C · **Tema:** S04
**Explicación:** Con alas niveladas, AOA ≈ pitch – ángulo de trayectoria = 12° – (–8°) = 20°. Nariz arriba y descendiendo puede significar un ángulo de ataque muy alto.

**s04-q3** · ¿Qué efecto tiene extender flaps de borde de salida?
- A) Aumenta el ángulo de ataque crítico y el CLmax
- B) Reduce el CLmax y aumenta la velocidad de pérdida
- C) No modifica la curva de sustentación
- D) Aumenta el CLmax y reduce la velocidad de pérdida, aunque el ángulo de ataque crítico suele ser menor
**Correcta:** D · **Tema:** S04
**Explicación:** Los flaps de borde de salida aumentan la curvatura y el CLmax, lo que baja la velocidad de pérdida; el ala llega a su máximo con un ángulo de ataque menor. Los slats son los que aumentan el ángulo crítico.

**s04-q4** · ¿Cuál es la acción más importante en la recuperación de una pérdida según la AC 120-109A?
- A) Reducir el ángulo de ataque
- B) Nivelar las alas
- C) Minimizar la pérdida de altitud
- D) Aplicar empuje máximo
**Correcta:** A · **Tema:** S04
**Explicación:** Reducir el ángulo de ataque es la prioridad. El empuje se aplica según necesidad y se acepta la pérdida de altitud.

**s04-q5** · Hielo o escarcha en el ala antes del despegue:
- A) Aumenta el CLmax por mayor rugosidad
- B) Reduce el ángulo de ataque de pérdida y aumenta la velocidad de pérdida
- C) Solo afecta la resistencia parásita
- D) No afecta la pérdida si la velocidad de rotación es correcta
**Correcta:** B · **Tema:** S04
**Explicación:** La contaminación adelanta la separación: el ala entra en pérdida a menor ángulo de ataque y con menor CLmax, y el aviso de pérdida, calibrado para ala limpia, puede no anticiparla.

---

# SECCIÓN 5 · RESISTENCIA Y EFICIENCIA AERODINÁMICA
**ID:** S05 · **Tiempo:** 12 min
**Objetivo:** entender la curva de resistencia y su uso operacional.

### Tipos de resistencia
**CONCEPTO**
| Tipo | Qué es | Cómo varía con la velocidad |
|---|---|---|
| **Resistencia parásita (Parasite Drag)** | Resistencia que no depende de producir sustentación: forma (Form Drag), fricción superficial (Skin Friction) e interferencia entre componentes (Interference Drag) | Aumenta con el cuadrado de la velocidad |
| **Resistencia inducida (Induced Drag)** | Consecuencia de producir sustentación: la diferencia de presión genera vórtices de punta y el flujo desviado inclina hacia atrás la fuerza aerodinámica | En vuelo nivelado, disminuye con el cuadrado de la velocidad |
| **Resistencia total** | Parásita + inducida | Curva en forma de "U" con un mínimo |

La resistencia inducida es mayor cuando el ala está **pesada y lenta**: más peso o más factor de carga implican más sustentación, más CL y más ángulo de ataque. En una aproximación, si la velocidad cae por debajo de la prevista y el piloto levanta la nariz para sostener la senda, el ala aumenta el ángulo de ataque, los vórtices se intensifican y aparece más resistencia inducida; sin empuje adicional, la velocidad sigue deteriorándose. En crucero rápido ocurre lo contrario: el ángulo de ataque es bajo y dominan la resistencia de forma, fricción e interferencia, por lo que unos pocos nudos adicionales pueden exigir bastante más empuje. (La regla "pesado, limpio y lento" describe la estela turbulenta más intensa, no la resistencia inducida.) Alas de gran alargamiento (Aspect Ratio) y winglets la reducen; el efecto suelo también (Sección 9).

| Zona de la curva | Qué domina | Cómo lo reconoce el piloto |
|---|---|---|
| Baja velocidad | Resistencia inducida | Más pitch y más empuje para sostener una velocidad todavía menor |
| L/Dmax | Resistencia total mínima | Mejor relación de planeo y mínimo empuje requerido |
| Alta velocidad | Resistencia parásita | Cada aumento de velocidad requiere un incremento creciente de empuje |

[IMAGEN — CURVA DE RESISTENCIA (DRAG CURVE)] · `IMG-05`
*Pie:* Resistencia parásita (creciente), inducida (decreciente) y total (U). El mínimo de la total marca L/Dmax y la velocidad de mínima resistencia.

### Eficiencia aerodinámica: L/D
**CONCEPTO**
- **L/D** es la relación entre sustentación y resistencia. Indica cuánta sustentación obtiene el ala por cada unidad de resistencia; cuanto mayor sea, más distancia puede recorrer el avión por cada unidad de altura que pierde.
- **L/Dmax** ocurre a un ángulo de ataque y un CL específicos. Ahí la resistencia total es mínima; en la teoría clásica coincide con el punto donde la resistencia inducida iguala a la parásita. En una pérdida de empuje, volar cerca de esa condición permite maximizar las opciones de alcance, mientras que volar más lento o más rápido consume altura sin ganar distancia útil.
- La **velocidad de máxima eficiencia** (mínima resistencia) no es fija: aumenta con el peso, porque se necesita más presión dinámica para el mismo CL. Un avión pesado debe planear más rápido que uno liviano, aunque ambos conservan esencialmente el mismo ángulo y la misma relación de planeo en aire calmo.

### Planeo
**CONCEPTO**
- La relación de planeo máxima es numéricamente igual a L/Dmax. Volando al ángulo de ataque de L/Dmax se obtiene la máxima distancia recorrida en el aire. Si el avión pierde ambos motores, esta es la condición que permite comparar aeropuertos alcanzables; el viento después determina cuál ofrece realmente más distancia sobre el suelo.
- **Un avión más pesado no planea menos distancia:** a L/Dmax recorre la misma distancia, pero a una velocidad mayor y con mayor régimen de descenso.
- Volar más lento o más rápido que la velocidad de mejor planeo reduce la distancia.

[IMAGEN — PLANEO Y L/D] · `IMG-17`
*Pie:* A L/Dmax se obtiene el mejor ángulo de planeo. Más peso exige más velocidad para el mismo ángulo en aire calmo; el viento cambia la distancia recorrida sobre el suelo.

**APLICACIÓN OPERACIONAL**
- **Por debajo de la velocidad de mínima resistencia** (régimen de mando invertido, Back Side of the Drag Curve) volar más lento exige **más** empuje. Si en la aproximación la velocidad cae y el piloto solo sube la nariz, la resistencia aumenta y la velocidad sigue cayendo. La corrección requiere empuje.
- En un jet el consumo depende del empuje. Cerca de la velocidad de mínima resistencia el empuje requerido es mínimo, lo que minimiza el consumo por hora: es la lógica de las velocidades de espera (holding).

> **DEBES RECORDAR**
> A baja velocidad domina la resistencia inducida; a alta velocidad, la parásita. En L/Dmax la resistencia total es mínima y se obtiene el mejor planeo, sin importar el peso.

### Quiz · Sección 5

**s05-q1** · Si la velocidad se duplica en vuelo nivelado, la resistencia parásita:
- A) Se duplica
- B) No cambia
- C) Se multiplica aproximadamente por cuatro
- D) Se reduce a la mitad
**Correcta:** C · **Tema:** S05
**Explicación:** La resistencia parásita es proporcional al cuadrado de la velocidad.

**s05-q2** · La resistencia inducida es mayor cuando el avión está:
- A) En crucero a alta velocidad
- B) En efecto suelo
- C) Liviano y rápido
- D) Pesado y lento
**Correcta:** D · **Tema:** S05
**Explicación:** Mucho peso y poca velocidad exigen alto ángulo de ataque y fuerte diferencia de presión: vórtices intensos y más resistencia inducida.

**s05-q3** · Dos aviones iguales planean desde la misma altitud a su velocidad de L/Dmax; uno pesa 20 % más. El más pesado:
- A) Recorre la misma distancia a mayor velocidad
- B) Recorre menos distancia
- C) Recorre más distancia a menor velocidad
- D) Debe planear a la misma velocidad que el liviano
**Correcta:** A · **Tema:** S05
**Explicación:** La relación de planeo depende de L/D, no del peso. El peso cambia la velocidad a la que se obtiene L/Dmax.

**s05-q4** · En el régimen de mando invertido (Back Side of the Drag Curve):
- A) La resistencia parásita es dominante
- B) Reducir la velocidad requiere más empuje
- C) Reducir la velocidad requiere menos empuje
- D) El avión está siempre en pérdida
**Correcta:** B · **Tema:** S05
**Explicación:** Por debajo de la velocidad de mínima resistencia, la resistencia inducida crece al frenar; mantener una velocidad menor exige más empuje.

---

# SECCIÓN 6 · FACTOR DE CARGA, VIRAJES Y VELOCIDAD DE MANIOBRA
**ID:** S06 · **Tiempo:** 12 min · **Sección prioritaria**
**Objetivo:** calcular mentalmente el efecto del alabeo y explicar correctamente Va.

### Factor de carga
**CONCEPTO**
- **Factor de carga (Load Factor – n):** relación entre la sustentación y el peso (n = L/W). Se expresa en **G**. En vuelo recto y nivelado, n = 1.
- En un **viraje nivelado coordinado**, n = 1 / cos(ángulo de alabeo). El factor de carga no depende del tipo de avión ni de la velocidad; solo del alabeo.
- La velocidad de pérdida aumenta con la raíz cuadrada del factor de carga: **Vs viraje = Vs × √n**.

| Alabeo (Bank Angle) | Factor de carga | Aumento de la velocidad de pérdida | Ejemplo: Vs 1 g = 130 kt |
|---|---|---|---|
| 0° | 1,00 G | 0 % | 130 kt |
| 30° | 1,15 G | ≈ 7,5 % | ≈ 140 kt |
| 45° | 1,41 G | ≈ 19 % | ≈ 155 kt |
| 60° | 2,00 G | ≈ 41 % | ≈ 184 kt |

*El valor de 130 kt es ilustrativo.*

[IMAGEN — BANK ANGLE / LOAD FACTOR] · `IMG-06`
*Pie:* Vector de sustentación inclinado en viraje: componente vertical que equilibra el peso y componente horizontal que produce el viraje. Curva de factor de carga vs alabeo con 30°, 45° y 60° marcados.

### Por qué aumenta la velocidad de pérdida en un viraje
**CONCEPTO**
Al alabear, la sustentación se inclina. Solo su componente vertical sostiene el peso. Para no descender, la sustentación total debe aumentar, y a la misma velocidad eso solo se logra con más ángulo de ataque. Con más alabeo, el ala llega a su ángulo de ataque crítico a una velocidad mayor. Un ejemplo típico es el overshoot de final: si el piloto cierra el viraje aumentando mucho el alabeo y tira para no perder altura, eleva simultáneamente el factor de carga, la velocidad de pérdida y la resistencia inducida justo cuando dispone de poca altura para recuperar.

**APLICACIÓN OPERACIONAL**
- Mantener altitud en viraje exige más ángulo de ataque y más empuje, porque aumenta la resistencia inducida. En un viraje de espera, el autothrottle suele aumentar empuje para conservar la velocidad; si no lo hace, el avión desacelera aunque el pitch parezca estable.
- A gran altitud, el mismo viraje reduce el margen hasta el buffet de baja velocidad (Sección 11).
- Un viraje escarpado a baja altura y baja velocidad (circuito, aproximación en circuito, maniobra de escape) combina alto factor de carga con poco margen de altitud para recuperar.

> **DEBES RECORDAR**
> A mayor ángulo de alabeo, mayor factor de carga y, por tanto, mayor velocidad de pérdida. 60° de alabeo = 2 G = +41 % en la velocidad de pérdida.

### Pérdida acelerada
Es la pérdida que ocurre con n > 1. En viraje o en un tirón, el ala alcanza el ángulo crítico por encima de la velocidad de pérdida en 1 g (Sección 4).

### Velocidad de maniobra (Va)
**CONCEPTO**

[IMAGEN — VA, PESO Y TURBULENCIA] · `IMG-18`
*Pie:* Va disminuye con el peso. No protege frente a entradas múltiples o bruscas y no sustituye la velocidad de penetración en turbulencia publicada por el fabricante.
- **Va (Design Maneuvering Speed):** velocidad máxima a la que se puede aplicar la deflexión completa de **un** mando, en **un** eje, sin exceder la carga límite de diseño. Por debajo de Va, en una maniobra de cabeceo, el ala entra en pérdida antes de alcanzar el factor de carga límite. Eso no significa que el piloto pueda mover los mandos de un tope al otro: la protección se refiere a una sola aplicación y no cubre reversas rápidas ni combinaciones de alerón, elevador y timón.
- **Va disminuye cuando el peso disminuye.** Con menos peso, la misma sustentación produce un factor de carga mayor (n = L/W) y la velocidad de pérdida es menor. La velocidad por debajo de la cual el ala entra en pérdida antes de alcanzar la carga límite es, por tanto, más baja.

**Lo que Va NO protege:**
Por regulación (14 CFR 25.1583(a)(3)), el manual de vuelo debe advertir que las entradas de mando **rápidas, grandes y alternadas**, en especial combinadas con grandes cambios de cabeceo, alabeo o guiñada, y las entradas completas **en más de un eje al mismo tiempo**, pueden producir falla estructural **a cualquier velocidad, incluso por debajo de Va**.

**APLICACIÓN OPERACIONAL**
- Tras el accidente de American Airlines 587 (2001), la NTSB concluyó que existía un malentendido extendido entre pilotos sobre la protección estructural por debajo de Va. La causa probable fueron entradas de timón innecesarias y excesivas del primer oficial, alternadas, que produjeron cargas superiores a la carga última de diseño del estabilizador vertical; el diseño del sistema de timón y el programa de entrenamiento fueron factores contribuyentes.
- En turbulencia, en aviones de transporte, la referencia es la **velocidad y el Mach de penetración en turbulencia (VRA / MRA, Rough Air Speed / Mach)** del AFM/QRH, no Va. A gran altitud, donde el límite es el Mach, MRA puede elegirse para dar el mejor margen entre buffet de baja y alta velocidad (14 CFR 25.1517).

**Límites de factor de carga (referencia):**
| Categoría | Positivo | Negativo |
|---|---|---|
| Transporte (14 CFR 25.337), flaps arriba | +2,5 G como mínimo (según peso, hasta 3,8) | –1,0 G hasta VC |
| Transporte, flaps extendidos (25.345) | +2,0 G | — |
| Normal (valores históricos de 14 CFR 23.337) | +3,8 G | –1,52 G |

La estructura se diseña para soportar 1,5 veces la carga límite (carga última). Ese margen es para lo imprevisto, no para usarlo.

> **DEBES RECORDAR**
> Va protege contra la deflexión completa de un mando en un eje. No protege contra entradas alternadas ni simultáneas en varios ejes. Y baja con el peso.

### Quiz · Sección 6

**s06-q1** · En un viraje nivelado coordinado de 60° de alabeo, el factor de carga es:
- A) 1,15 G
- B) 1,41 G
- C) 2,00 G
- D) 3,00 G
**Correcta:** C · **Tema:** S06
**Explicación:** n = 1/cos 60° = 1/0,5 = 2 G, en cualquier avión y a cualquier velocidad.

**s06-q2** · Un avión tiene Vs = 120 kt en 1 g. En un viraje nivelado de 45°, su velocidad de pérdida es aproximadamente:
- A) 120 kt
- B) 128 kt
- C) 143 kt
- D) 170 kt
**Correcta:** C · **Tema:** S06
**Explicación:** n = 1,41; √1,41 ≈ 1,19; 120 × 1,19 ≈ 143 kt.

**s06-q3** · ¿Cuál afirmación sobre Va es correcta?
- A) Va es fija y no depende del peso
- B) Va es la velocidad recomendada de penetración de turbulencia en todos los aviones de transporte
- C) Por debajo de Va, la deflexión completa de un mando en un eje no debe exceder la carga límite; las entradas alternadas o en varios ejes pueden causar falla incluso por debajo de Va
- D) Por debajo de Va cualquier combinación de mandos es segura
**Correcta:** C · **Tema:** S06
**Explicación:** Resume lo que 14 CFR 25.1583(a)(3) exige en el manual: la aplicación completa de mandos se limita a velocidades por debajo de la velocidad de maniobra, y las entradas grandes y alternadas o en varios ejes pueden causar falla a cualquier velocidad. Va disminuye con el peso; en transporte la turbulencia se vuela con VRA/MRA.

**s06-q4** · Si el peso del avión disminuye, Va:
- A) Se vuelve igual a VNE
- B) Aumenta
- C) No cambia
- D) Disminuye
**Correcta:** D · **Tema:** S06
**Explicación:** Con menos peso, la misma sustentación produce más G (n = L/W) y la velocidad de pérdida es menor. La velocidad a la que el ala todavía entra en pérdida antes de alcanzar la carga límite baja con el peso.

---
# SECCIÓN 7 · SUPERFICIES DE CONTROL Y DISPOSITIVOS HIPERSUSTENTADORES
**ID:** S07 · **Tiempo:** 10 min
**Objetivo:** identificar cada superficie de un avión de transporte y su efecto aerodinámico.

[IMAGEN — SUPERFICIES DE CONTROL DE UN AVIÓN DE TRANSPORTE] · `IMG-07`
*Pie:* Vista en planta de un jet de transporte: alerones, elevador, timón de dirección, estabilizadores, flaps, slats, spoilers de vuelo y de tierra.

En un avión de transporte las superficies trabajan como un sistema. Al iniciar un viraje, los alerones y spoilers producen alabeo, el timón o el yaw damper controlan la guiñada y el elevador ajusta la sustentación necesaria para mantener la trayectoria. Durante la aproximación, flaps y slats permiten volar más lento; después del toque, los ground spoilers eliminan sustentación para que el peso pase a las ruedas y el frenado sea efectivo.

### Superficies primarias
**Alerones (Ailerons)**
- **QUÉ ES:** superficies móviles en el borde de salida, hacia las puntas del ala.
- **QUÉ HACE:** controla el alabeo alrededor del eje longitudinal. El alerón que baja aumenta la sustentación de esa ala; el que sube la reduce.
- **CUÁNDO SE UTILIZA:** en todo el vuelo para alabear e iniciar virajes. Algunos jets tienen alerones exteriores de baja velocidad e interiores de alta velocidad; los exteriores pueden quedar inactivos en crucero. Los spoilers de vuelo complementan el alabeo.

**Elevador (Elevator)**
- **QUÉ ES:** superficie móvil en el borde de salida del estabilizador horizontal.
- **QUÉ HACE:** controla el cabeceo alrededor del eje lateral y, con ello, el ángulo de ataque del ala.
- **CUÁNDO SE UTILIZA:** rotación, ascenso, nivelación, flare y cualquier cambio de actitud. En el flare, por ejemplo, una orden suave de elevador aumenta el ángulo de ataque y reduce el régimen de descenso; una orden excesiva puede consumir la velocidad, provocar flotación o acercar la cola a la pista.

**Timón de dirección (Rudder)**
- **QUÉ ES:** superficie móvil en el borde de salida del estabilizador vertical.
- **QUÉ HACE:** controla la guiñada alrededor del eje vertical.
- **CUÁNDO SE UTILIZA:** coordinación, viento cruzado en despegue y aterrizaje, y control con empuje asimétrico por falla de motor. En muchos aviones de transporte su recorrido se limita automáticamente al aumentar la velocidad. No se usa para alabear ni para "combatir" estela o turbulencia a velocidades medias y altas (Sección 6; AA587 ocurrió en el ascenso inicial, en estela turbulenta).

### Superficies de estabilización

[IMAGEN — CONFIGURACIÓN DEL ALA] · `IMG-19`
*Pie:* Slats, flaps y spoilers cambian sustentación y resistencia para cada fase. La configuración limpia, de despegue y de aterrizaje responde a compromisos distintos.
**Estabilizador horizontal (Horizontal Stabilizer)**
- **QUÉ ES:** superficie fija o ajustable en la cola.
- **QUÉ HACE:** da estabilidad longitudinal. En un avión convencional produce normalmente una fuerza hacia abajo que equilibra el momento de nariz abajo del ala.
- **CUÁNDO SE UTILIZA:** siempre. En aviones de transporte suele ser **compensable** (Trimmable Horizontal Stabilizer): se ajusta para el despegue según el CG y se mueve para compensar en vuelo.

**Estabilizador vertical (Vertical Stabilizer)**
- **QUÉ ES:** superficie fija vertical en la cola.
- **QUÉ HACE:** da estabilidad direccional; tiende a alinear la nariz con el viento relativo.
- **CUÁNDO SE UTILIZA:** siempre; es la base de la estabilidad en guiñada.

### Dispositivos hipersustentadores
**Flaps**
- **QUÉ ES:** superficies en el borde de salida del ala (sencillos, partidos, ranurados, Fowler).
- **QUÉ HACE:** aumentan la curvatura y, en los Fowler, también la superficie alar. Aumentan el CLmax y la resistencia, y reducen la velocidad de pérdida. Permiten volar a menor velocidad con una actitud de cabeceo más baja. Reducen el ángulo de ataque crítico.
- **CUÁNDO SE UTILIZA:** despegue con posiciones parciales (más sustentación sin tanta resistencia) y aproximación y aterrizaje con posiciones mayores (velocidad baja y ángulo de descenso más pronunciado). Por eso una retracción anticipada durante un go-around puede eliminar sustentación antes de que el avión haya acelerado; la configuración se retrae por etapas siguiendo el procedimiento y las velocidades del tipo.

**Slats y dispositivos de borde de ataque (Leading Edge Devices)**
- **QUÉ ES:** slats (móviles, abren una ranura), slots (ranuras fijas) y flaps Krueger en el borde de ataque.
- **QUÉ HACE:** retrasan la separación del flujo. Permiten volar a un ángulo de ataque mayor antes de la pérdida: **aumentan el ángulo de ataque crítico** y el CLmax.
- **CUÁNDO SE UTILIZA:** despegue, aproximación y aterrizaje, casi siempre combinados con flaps.

### Otros
**Spoilers**
- **QUÉ ES:** paneles en el extradós que se levantan.
- **QUÉ HACE:** reducen la sustentación del sector de ala donde se despliegan y aumentan la resistencia.
- **CUÁNDO SE UTILIZA:**
  - **Spoilers de vuelo:** asimétricos para ayudar al alabeo (sin guiñada adversa); simétricos como frenos aerodinámicos.
  - **Spoilers de tierra (Ground Spoilers / Lift Dumpers):** tras el toque, eliminan sustentación y transfieren peso a las ruedas para mejorar el frenado. Si no se despliegan, el avión conserva sustentación, carga menos los trenes y necesita más distancia para frenar aunque la reversa funcione.

**Frenos aerodinámicos (Speed Brakes)**
- **QUÉ ES:** dispositivos de resistencia; en la mayoría de los jets de transporte son los mismos spoilers usados de forma simétrica en vuelo.
- **QUÉ HACE:** aumentan la resistencia para descender más rápido sin ganar velocidad, o para reducir velocidad.
- **CUÁNDO SE UTILIZA:** descensos, cambios de velocidad ordenados por ATC, gestión de energía. Se retraen en la recuperación de pérdida (AC 120-109A).

> **DEBES RECORDAR**
> Flaps de borde de salida: más CLmax, menos ángulo crítico. Slats: más CLmax y más ángulo crítico. Spoilers: menos sustentación y más resistencia.

### Quiz · Sección 7

**s07-q1** · ¿Qué dispositivo aumenta el ángulo de ataque crítico del ala?
- A) Slats de borde de ataque
- B) Spoilers
- C) Flaps de borde de salida
- D) Compensador del elevador
**Correcta:** A · **Tema:** S07
**Explicación:** Los slats retrasan la separación y permiten un ángulo de ataque mayor antes de la pérdida. Los flaps de borde de salida aumentan el CLmax, pero el ángulo crítico suele disminuir.

**s07-q2** · Tras el toque, los spoilers de tierra mejoran el frenado porque:
- A) Aumentan el ángulo de ataque del ala
- B) Eliminan sustentación y transfieren peso a las ruedas
- C) Aumentan el empuje de reversa
- D) Reducen la resistencia parásita
**Correcta:** B · **Tema:** S07
**Explicación:** Con menos sustentación, el peso carga las ruedas y los frenos son más efectivos; además aportan resistencia.

**s07-q3** · En un avión de transporte, el estabilizador horizontal compensable se ajusta antes del despegue principalmente según:
- A) La longitud de pista
- B) La velocidad del viento
- C) La posición del CG (y el peso/configuración según el tipo)
- D) La temperatura exterior
**Correcta:** C · **Tema:** S07
**Explicación:** El ajuste de compensación de despegue depende sobre todo del CG; así las fuerzas de rotación quedan dentro del rango previsto.

---

# SECCIÓN 8 · ESTABILIDAD, CONTROL Y CENTRO DE GRAVEDAD
**ID:** S08 · **Tiempo:** 12 min
**Objetivo:** relacionar la posición del CG con estabilidad, control y performance.

### Estabilidad y control
**CONCEPTO**
- **Estabilidad:** tendencia del avión a volver a su condición de equilibrio después de una perturbación, sin intervención del piloto. Si una ráfaga levanta la nariz en crucero, la estabilidad estática positiva inicia una corrección hacia el trim original; la estabilidad dinámica determina si esa corrección se amortigua o continúa oscilando.
- **Control:** capacidad del piloto de cambiar esa condición con los mandos.
- Son opuestos en el diseño: más estabilidad implica más fuerza y menos respuesta; menos estabilidad, más maniobrabilidad y más carga de trabajo.

| Tipo | Pregunta que responde | Positiva | Neutra | Negativa |
|---|---|---|---|---|
| **Estabilidad estática** | ¿Cuál es la **tendencia inicial** después de la perturbación? | Tiende a volver | Se queda en la nueva posición | Se aleja más |
| **Estabilidad dinámica** | ¿Qué pasa **con el tiempo**? | Las oscilaciones se amortiguan | Oscilan sin cambiar amplitud | Las oscilaciones crecen |

Un avión puede tener estabilidad estática positiva y aun así oscilaciones que no se amortigüen: la estática es condición necesaria, no suficiente. Para el piloto, la diferencia se reconoce en el tiempo: que la nariz comience a regresar no garantiza que el movimiento termine sin varias oscilaciones o sin ayuda del sistema de amortiguación.

| Eje | Tipo de estabilidad | Qué la produce |
|---|---|---|
| Lateral (cabeceo) | **Longitudinal** | CG por delante del punto neutro (centro aerodinámico del avión completo) y estabilizador horizontal |
| Longitudinal (alabeo) | **Lateral** | Diedro, flecha, ala alta (interacción ala–fuselaje en el derrape) y distribución de peso |
| Vertical (guiñada) | **Direccional** | Estabilizador vertical, área lateral detrás del CG, flecha |

### CG, centro de presión y momento
**CONCEPTO**
- **Centro de gravedad (CG):** punto donde se considera aplicado el peso total. En aviones de transporte se expresa en % de la cuerda aerodinámica media (% MAC). No es un dato administrativo: determina el ajuste de trim de despegue y cambia cuánto mando se necesita para rotar y para recuperar una pérdida.
- **Centro de presión (CP):** punto donde se considera aplicada la resultante aerodinámica del ala. Su posición cambia con el ángulo de ataque y no debe confundirse con el centro aerodinámico ni con el punto neutro.
- **Momento:** fuerza × brazo. La estabilidad longitudinal exige que el CG permanezca delante del punto neutro. En un avión convencional, el momento del ala y el fuselaje se equilibra normalmente con una fuerza hacia abajo del estabilizador horizontal.

[IMAGEN — CG Y ESTABILIDAD LONGITUDINAL] · `IMG-08`
*Pie:* Peso en el CG, resultante aerodinámica del ala, fuerza hacia abajo en la cola y brazos de momento. La comparación muestra cómo un CG adelantado exige más carga de cola y uno atrasado reduce el margen de estabilidad.

[IMAGEN — ESTABILIDAD ESTÁTICA Y DINÁMICA] · `IMG-20`
*Pie:* La estabilidad estática describe la tendencia inicial tras una perturbación; la dinámica muestra cómo evoluciona la respuesta con el tiempo.

### Qué ocurre según la posición del CG
| Aspecto | CG demasiado **adelantado** | CG demasiado **atrasado** |
|---|---|---|
| **Estabilidad** | Más estable | Menos estable; puede volverse inestable |
| **Control** | Menos respuesta del elevador | Más sensible; riesgo de sobrecontrol |
| **Fuerzas de mando** | Mayores | Menores; es más fácil sobrecargar la estructura |
| **Velocidad de pérdida** | Mayor (más carga hacia abajo en la cola) | Menor |
| **Performance** | Más resistencia por compensación y más consumo; menor velocidad de crucero | Menos resistencia y consumo |
| **Despegue** | Mayor fuerza para rotar; si está fuera de límite puede no rotar a la velocidad prevista | Rotación ligera; riesgo de sobrerrotación y de golpe de cola (Tail Strike) |
| **Aterrizaje** | Flare más difícil; puede faltar autoridad de elevador | Flare sensible; menor estabilidad en la aproximación |
| **Pérdida y recuperación** | Recuperación más fácil | Recuperación más difícil; más allá del límite trasero puede faltar elevador para bajar la nariz |

**APLICACIÓN OPERACIONAL**
- La hoja de carga y balance no es un trámite. Con CG adelantado, el piloto percibe una rotación más pesada y puede necesitar más pista y más mando en el flare; con CG atrasado, la rotación es más sensible y una pequeña entrada puede producir una respuesta grande. El consumo de combustible y el movimiento de pasajeros o carga desplazan el CG en vuelo, por lo que el cálculo debe permanecer dentro de la envolvente durante todo el trayecto, no solo al salir.

> **DEBES RECORDAR**
> CG adelantado: más estable, más pesado de mandos, mayor velocidad de pérdida y más consumo. CG atrasado: menos estable, mandos livianos, peor recuperación de pérdida.

### Quiz · Sección 8

**s08-q1** · La estabilidad estática positiva describe:
- A) Oscilaciones que se amortiguan con el tiempo
- B) Oscilaciones de amplitud constante
- C) La capacidad del piloto de cambiar la actitud
- D) La tendencia inicial a volver a la condición de equilibrio
**Correcta:** D · **Tema:** S08
**Explicación:** La estática trata la tendencia inicial; la dinámica, el comportamiento en el tiempo.

**s08-q2** · Con el CG en el límite delantero, respecto a un CG atrasado, el avión tendrá:
- A) Mayor velocidad de pérdida, mayores fuerzas de mando y más consumo
- B) Menor velocidad de pérdida y menor consumo
- C) Mayor riesgo de golpe de cola en la rotación
- D) Menor estabilidad longitudinal
**Correcta:** A · **Tema:** S08
**Explicación:** Un CG adelantado exige más fuerza hacia abajo en la cola: el ala sostiene más carga, sube la velocidad de pérdida y la resistencia por compensación.

**s08-q3** · ¿Por qué un CG más atrás del límite trasero es especialmente peligroso?
- A) Porque aumenta la velocidad de pérdida
- B) Porque puede faltar autoridad del elevador para reducir el ángulo de ataque y recuperar una pérdida
- C) Porque aumenta la resistencia inducida
- D) Porque impide extender los flaps
**Correcta:** B · **Tema:** S08
**Explicación:** Con poco brazo de momento de la cola y baja estabilidad, bajar la nariz puede no ser posible.

**s08-q4** · En un perfil convencional, al aumentar el ángulo de ataque, el centro de presión:
- A) Se desplaza hacia atrás
- B) Coincide con el CG
- C) Se desplaza hacia adelante
- D) Permanece fijo
**Correcta:** C · **Tema:** S08
**Explicación:** Según el PHAK de la FAA, el centro de presión avanza al aumentar el ángulo de ataque y retrocede al reducirlo.

---

# SECCIÓN 9 · FENÓMENOS AERODINÁMICOS OPERACIONALES
**ID:** S09 · **Tiempo:** 10 min
**Objetivo:** reconocer cada fenómeno y explicar su efecto básico.

| Fenómeno | Qué es | Efecto en vuelo |
|---|---|---|
| **Efecto suelo (Ground Effect)** | Cerca del suelo (dentro de aproximadamente una envergadura) se restringen el upwash, el downwash y los vórtices de punta | Menos resistencia inducida: el ala necesita menos ángulo de ataque para el mismo CL |
| **Guiñada adversa (Adverse Yaw)** | Al alabear, el ala que sube genera más sustentación y más resistencia inducida | La nariz guiña hacia el lado contrario al viraje; se corrige con timón coordinado, alerones diferenciales o spoilers de alabeo |
| **Factor P (P-Factor)** | Con alto ángulo de ataque, la pala descendente de la hélice tiene mayor ángulo de ataque y más empuje que la ascendente | En hélices que giran a la derecha (vista desde la cabina), guiñada a la izquierda con alta potencia y alto ángulo de ataque |
| **Torque** | Reacción del par del motor y la hélice (tercera ley de Newton) | Tendencia a alabear en sentido opuesto al giro de la hélice |
| **Estela en espiral (Spiraling Slipstream)** | La hélice imprime rotación a la estela, que golpea un lado del estabilizador vertical | Guiñada con alta potencia y baja velocidad (despegue) |
| **Dutch Roll** | Oscilación acoplada de alabeo y guiñada, cuando el efecto diedro domina sobre la estabilidad direccional | La nariz oscila de lado a lado mientras las alas alabean de forma alternada; típica de alas en flecha; la amortigua el Yaw Damper |
| **Estabilidad espiral (Spiral Stability)** | Depende de la relación entre estabilidad direccional y efecto diedro; hay inestabilidad espiral cuando la direccional es muy fuerte frente al efecto diedro | Si es negativa, el alabeo aumenta lentamente y la nariz baja en espiral; se corrige con facilidad si se detecta a tiempo |
| **Efecto diedro (Dihedral Effect)** | Tendencia a nivelar alas cuando hay derrape; la producen el diedro, la flecha y el ala alta | Estabilidad lateral; demasiado efecto diedro favorece el Dutch Roll |

Estos fenómenos se distinguen por lo que hace el avión. Si flota después del flare, la causa puede ser el exceso de velocidad combinado con la reducción de resistencia inducida en efecto suelo. Si al iniciar un viraje la nariz se mueve primero hacia el lado contrario, es guiñada adversa. Si en crucero la nariz y las alas oscilan repetidamente a ambos lados, es Dutch Roll; si el alabeo aumenta despacio mientras la nariz cae y la velocidad crece, se trata de una tendencia espiral. Identificar el patrón evita aplicar una corrección apropiada para otro fenómeno.

### Efecto suelo, con números
**CONCEPTO**
Reducción de la resistencia inducida según el PHAK de la FAA:
| Altura del ala sobre el suelo | Reducción de resistencia inducida |
|---|---|
| Una envergadura | ≈ 1,4 % |
| Un cuarto de envergadura | ≈ 23,5 % |
| Un décimo de envergadura | ≈ 47,6 % |

**APLICACIÓN OPERACIONAL**
- **Aterrizaje:** con exceso de velocidad en el flare, el avión "flota" porque todavía tiene energía y, cerca de la pista, produce menos resistencia inducida. Forzarlo a tocar empujando la nariz no elimina esa energía y puede provocar un contacto duro; la solución empieza con una aproximación estabilizada y la velocidad correcta.
- **Despegue:** el avión puede levantarse por debajo de la velocidad recomendada y no sostenerse al salir del efecto suelo. Al ganar altura reaparecen plenamente el downwash y la resistencia inducida; por eso en transporte se respetan las V-speeds y la técnica de rotación calculadas. Una rotación anticipada o un pitch excesivo consume velocidad y degrada el ascenso justo cuando desaparece esa reducción temporal de resistencia.
- **Instrumentos:** cualquier error de indicación cerca del suelo depende de la ubicación de las tomas y del diseño del avión; se consulta el AFM, no se asume como un efecto universal.

[IMAGEN — EFECTO SUELO Y DUTCH ROLL] · `IMG-09`
*Pie:* El efecto suelo reduce el downwash y la resistencia inducida cerca de la pista. El Dutch Roll es otra cosa: una oscilación acoplada de alabeo y guiñada que el Yaw Damper amortigua.

### Dutch Roll y estabilidad espiral
**CONCEPTO**
Los diseñadores eligen un compromiso: una estabilidad direccional fuerte con efecto diedro débil favorece la inestabilidad espiral; un efecto diedro fuerte con estabilidad direccional débil favorece el Dutch Roll. La FAA indica que la mayoría de los aviones se diseñan con una leve inestabilidad espiral, porque es preferible al Dutch Roll. En un jet con ala en flecha, una perturbación puede iniciar una guiñada que cambia la sustentación entre ambas alas y produce alabeo alternado; el Yaw Damper detecta esa oscilación y ordena pequeños movimientos de timón para amortiguarla. Si está inoperativo, el avión no se «cae», pero pueden aplicarse límites de altitud, velocidad o despacho y debe seguirse el procedimiento del fabricante.

[IMAGEN — DUTCH ROLL E INESTABILIDAD ESPIRAL] · `IMG-21`
*Pie:* El Dutch Roll combina oscilaciones de guiñada y alabeo; la inestabilidad espiral es un alabeo progresivo que tiende a cerrar la trayectoria descendente.

> **DEBES RECORDAR**
> Efecto suelo = menos resistencia inducida, no un "colchón de aire". Dutch Roll = efecto diedro mayor que la estabilidad direccional.

### Quiz · Sección 9

**s09-q1** · El efecto suelo reduce principalmente:
- A) El peso aparente del avión
- B) La resistencia de onda
- C) La resistencia parásita
- D) La resistencia inducida
**Correcta:** D · **Tema:** S09
**Explicación:** La proximidad al suelo restringe el downwash y los vórtices de punta; la resistencia parásita no cambia.

**s09-q2** · La guiñada adversa se produce porque:
- A) El ala que sube genera más sustentación y más resistencia inducida
- B) El timón se deflecta en sentido contrario
- C) El ala que baja genera más resistencia inducida
- D) La hélice produce factor P
**Correcta:** A · **Tema:** S09
**Explicación:** El alerón que baja aumenta la sustentación y la resistencia inducida del ala que sube; la nariz guiña hacia ese lado, contrario al viraje.

**s09-q3** · El Dutch Roll aparece cuando:
- A) El avión vuela en efecto suelo
- B) El efecto diedro domina sobre la estabilidad direccional
- C) El CG está demasiado adelantado
- D) La estabilidad direccional es mucho mayor que el efecto diedro
**Correcta:** B · **Tema:** S09
**Explicación:** Con efecto diedro fuerte y estabilidad direccional relativamente débil, alabeo y guiñada se acoplan en una oscilación.

---
# SECCIÓN 10 · AERODINÁMICA DE ALTA VELOCIDAD Y MACH
**ID:** S10 · **Tiempo:** 15 min · **Sección prioritaria**
**Objetivo:** explicar qué ocurre cuando un jet se acerca a velocidades transónicas y por qué usa ala en flecha.

### Número de Mach
**CONCEPTO**
- **Número de Mach (Mach Number):** relación entre la velocidad verdadera (TAS) y la velocidad del sonido en el aire que rodea al avión. Mach 0,80 = 80 % de la velocidad del sonido local. No es otra forma de mostrar la IAS: un jet puede mantener una IAS constante durante el ascenso mientras la TAS y el Mach aumentan.
- En el modelo atmosférico operativo, la velocidad del sonido depende principalmente de la temperatura. Como esta baja con la altitud hasta la tropopausa, **a igual TAS el Mach aumenta al subir**. Por eso el ascenso normalmente cambia de una velocidad objetivo en nudos a una velocidad objetivo en Mach en la altitud de cruce; continuar persiguiendo la misma IAS terminaría acercando el avión a MMO.

| Régimen (referencia del PHAK) | Mach |
|---|---|
| Subsónico | Menor de 0,75 |
| Transónico | 0,75 a 1,20 |
| Supersónico | 1,20 a 5,00 |
| Hipersónico | Mayor de 5,00 |

Los aviones civiles de transporte cruzan normalmente entre Mach 0,70 y 0,90. En la zona transónica conviven, sobre el mismo avión, zonas de flujo subsónico y supersónico.

### Mach crítico y compresibilidad
**CONCEPTO**
- El ala acelera el aire sobre el extradós: la velocidad local es mayor que la del avión.
- **Mach crítico (Critical Mach Number – MCRIT):** Mach de vuelo al que el flujo, en algún punto del avión, alcanza por primera vez Mach 1,0. Marca el límite entre vuelo subsónico y transónico. Así, un avión que cruza a Mach 0,78 puede tener una pequeña zona supersónica sobre el ala aunque el avión completo siga volando por debajo de Mach 1.
- **Compresibilidad (Compressibility):** a medida que la velocidad aumenta, el aire deja de comportarse como incompresible: su densidad cambia de forma apreciable al rodear el avión. Por encima del Mach crítico sus efectos aparecen como ondas de choque, aumento de resistencia, buffet y cambios de compensación.
- **Mach de divergencia de resistencia (Drag Divergence Mach):** Mach al que la resistencia sube bruscamente. Según el PHAK, suele estar entre 5 % y 10 % por encima del Mach crítico.

### Ondas de choque, resistencia de onda y buffet
**CONCEPTO**
- Por encima del Mach crítico se forma una zona supersónica sobre el extradós. Donde el flujo vuelve a subsónico aparece una **onda de choque normal (Shock Wave)**: la presión y la densidad suben de golpe y el flujo pierde energía.
- Al aumentar la velocidad, la onda se hace más intensa y se desplaza hacia el borde de salida. También puede formarse en el intradós.
- Detrás de la onda, la capa límite puede separarse: **separación inducida por onda de choque**.
- **Resistencia de onda (Wave Drag):** resistencia producida por las ondas de choque y la separación asociada. Desde la cabina se reconoce porque cerca del límite transónico hace falta mucho más empuje para obtener muy poca aceleración; no es una resistencia constante que crezca suavemente como a baja velocidad.
- **Buffet:** vibración estructural causada por flujo separado que golpea el ala o la cola.
- **Mach Buffet (High-Speed Buffet):** buffet causado por la separación detrás de la onda de choque cuando el avión vuela demasiado rápido, o con demasiado ángulo de ataque cerca de MMO.

[IMAGEN — ONDA DE CHOQUE Y ALA EN FLECHA] · `IMG-10`
*Pie:* (1) Perfil con zona supersónica sobre el extradós, onda de choque normal y separación detrás. (2) Ala en flecha: descomposición de la velocidad en componente perpendicular al borde de ataque y componente a lo largo de la envergadura.

### Qué ocurre al acercarse a velocidades transónicas
**APLICACIÓN OPERACIONAL**
| Fenómeno | Qué siente o ve el piloto |
|---|---|
| Aumento brusco de resistencia | Se necesita mucho más empuje para ganar poca velocidad |
| Mach Buffet | Vibración |
| **Mach Tuck** | El centro de presión se desplaza hacia atrás con la onda de choque: tendencia de nariz abajo, que aumenta más la velocidad. El **Mach Trim** la compensa automáticamente; si está inoperativo, el fabricante impone un MMO reducido |
| Menor efectividad de mandos | Respuesta reducida; posibles vibraciones de superficies (Aileron Buzz) |
| Cambios de estabilidad y compensación | El avión requiere más atención en cabeceo |

**VMO / MMO:** velocidad máxima operativa. **VMO** en nudos (CAS) domina a baja altitud (cargas estructurales y presión dinámica); **MMO** en Mach domina a gran altitud (compresibilidad y buffet). Por ejemplo, en un descenso el avión puede iniciar cerca de MMO con una IAS relativamente baja; al entrar en aire más cálido y denso, la IAS aumenta y el límite relevante pasa a ser VMO. El piloto o el sistema de gestión cambia la referencia para no exceder ninguno de los dos límites. Como dato del PHAK, en los primeros jets civiles VMO de 306 KCAS equivalía a MMO 0,82 cerca de FL310; a FL380, Mach 0,82 equivale a unos 261 KCAS.

### Ala en flecha (Swept Wing)
**CONCEPTO**
Solo la componente del flujo **perpendicular al borde de ataque** determina la distribución de presión y la formación de ondas de choque. Al inclinar el ala hacia atrás, esa componente es menor que la velocidad del avión. En crucero esto permite volar rápido sin que el ala «vea» toda la velocidad de frente; en aproximación, la misma geometría es menos eficiente para producir sustentación y obliga a usar slats, flaps y velocidades mayores que las de un ala recta comparable.

[IMAGEN — ALA EN FLECHA Y MACH CRÍTICO] · `IMG-22`
*Pie:* La flecha reduce la componente normal del flujo y retrasa los efectos de compresibilidad, pero introduce compromisos de pérdida en punta, pitch-up y complejidad.

**Ventajas**
- Aumenta el Mach crítico y el Mach de divergencia.
- Retrasa y suaviza la aparición de los efectos de compresibilidad.
- Permite cruzar a Mach más alto con menos resistencia de onda.

**Desventajas**
- Tendencia a la pérdida en las puntas primero. Como las puntas están detrás, la sustentación se desplaza hacia adelante y la nariz sube (Pitch-Up).
- Menor efectividad para generar sustentación a baja velocidad: velocidades de aproximación más altas y necesidad de flaps y slats potentes.
- La flecha aumenta el efecto diedro: favorece el Dutch Roll (Yaw Damper).

**Por qué los aviones de transporte la usan:** porque cruzan cerca de Mach 0,8 y necesitan retrasar la divergencia de resistencia para cruzar rápido y con buen consumo. Las desventajas a baja velocidad se compensan con dispositivos hipersustentadores.

> **DEBES RECORDAR**
> Mach crítico: primer punto del avión con flujo local a Mach 1. Por encima aparecen ondas de choque, resistencia de onda y buffet. La flecha sube el Mach crítico porque el ala "ve" solo la componente del flujo perpendicular a su borde de ataque.

### Quiz · Sección 10

**s10-q1** · El Mach crítico es:
- A) El Mach al que el avión alcanza la velocidad del sonido
- B) El MMO certificado del avión
- C) El Mach de vuelo al que el flujo local, en algún punto del avión, alcanza Mach 1 por primera vez
- D) El Mach al que la resistencia sube bruscamente
**Correcta:** C · **Tema:** S10
**Explicación:** El flujo se acelera sobre el ala: localmente llega a Mach 1 aunque el avión vuele por debajo. La subida brusca de resistencia es el Mach de divergencia.

**s10-q2** · A TAS constante, si el avión asciende hacia la tropopausa, el número de Mach:
- A) Disminuye
- B) Aumenta, porque aumenta la densidad
- C) No cambia
- D) Aumenta, porque baja la temperatura y con ella la velocidad del sonido
**Correcta:** D · **Tema:** S10
**Explicación:** La velocidad del sonido depende de la temperatura; más frío, menor velocidad del sonido y mayor Mach para la misma TAS.

**s10-q3** · El Mach Tuck se produce porque:
- A) La onda de choque se desplaza hacia atrás y con ella el centro de presión, generando nariz abajo
- B) El timón pierde efectividad
- C) El CG se desplaza hacia atrás por consumo de combustible
- D) Los slats se extienden automáticamente
**Correcta:** A · **Tema:** S10
**Explicación:** Con la onda de choque y la separación, el centro de presión retrocede y aparece un momento de nariz abajo. Lo compensa el Mach Trim.

**s10-q4** · ¿Cuál es una desventaja del ala en flecha?
- A) Menor efecto diedro
- B) Tendencia a entrar en pérdida primero en las puntas, con cabeceo hacia arriba
- C) Mayor resistencia de onda en crucero
- D) Menor Mach crítico
**Correcta:** B · **Tema:** S10
**Explicación:** El flujo de la capa límite tiende hacia las puntas; la pérdida en punta desplaza la sustentación hacia adelante y la nariz sube.

---

# SECCIÓN 11 · AERODINÁMICA A GRAN ALTITUD Y COFFIN CORNER
**ID:** S11 · **Tiempo:** 15 min · **Sección prioritaria**
**Objetivo:** explicar Coffin Corner con sus causas físicas y sus consecuencias operacionales.

### Los dos límites aerodinámicos
**CONCEPTO**
| Límite | Qué es | Qué lo produce |
|---|---|---|
| **Low-Speed Buffet (buffet de baja velocidad)** | Vibración previa a la pérdida por alto ángulo de ataque. A gran altitud el PHAK lo llama "buffet de Mach de baja velocidad": el alto ángulo de ataque acelera el flujo sobre el extradós hasta formar ondas de choque | Volar demasiado lento para el peso y la altitud |
| **High-Speed Buffet / Mach Buffet** | Vibración por separación detrás de la onda de choque | Volar demasiado rápido, cerca o por encima de MMO |
| **Ángulo de ataque crítico** | Límite de la pérdida | A Mach alto el ángulo de ataque de pérdida y el CLmax **disminuyen** |

### Coffin Corner
**CONCEPTO**
**Coffin Corner** es la zona de gran altitud en la que el margen entre el límite de baja velocidad (low-speed buffet / pérdida) y el límite de alta velocidad (MMO / Mach buffet) se reduce al mínimo. La circular AC 61-107B de la FAA la describe como la operación a gran altitud donde velocidades indicadas bajas corresponden a TAS altas (Mach alto) con ángulos de ataque altos. Para el piloto esto significa que «un poco más lento» puede acercar el ala al buffet de baja velocidad y «un poco más rápido» puede acercarla al Mach buffet; una ráfaga o un viraje moderado puede consumir gran parte de ese margen sin que la velocidad seleccionada haya cambiado.

**ESQUEMA** · Margen de velocidad según la altitud (dos bloques apilados; en celular uno debajo del otro)
```
ALTITUD MEDIA

BAJA VELOCIDAD
↓
LOW-SPEED BUFFET / STALL MARGIN
─────────────── MARGEN OPERACIONAL AMPLIO ───────────────
ALTA VELOCIDAD
↓
MACH / HIGH-SPEED BUFFET
```
```
GRAN ALTITUD · CERCA DEL TECHO

BAJA VELOCIDAD
↓
LOW-SPEED BUFFET / STALL MARGIN
──── MARGEN MÍNIMO ────
ALTA VELOCIDAD
↓
MACH / HIGH-SPEED BUFFET
```
*Implementación sugerida:* dos barras horizontales con los extremos marcados como LOW-SPEED BUFFET y MACH BUFFET; la barra de gran altitud es visiblemente más corta. Sin animación.

[IMAGEN — COFFIN CORNER / HIGH ALTITUDE SPEED MARGIN] · `IMG-11`
*Pie:* Envolvente altitud vs velocidad (Mach). La línea de low-speed buffet sube hacia la derecha y la de high-speed buffet/MMO se mantiene o baja; ambas convergen en el techo aerodinámico. Una tercera curva punteada muestra el efecto de 1,3 G: estrecha aún más el margen.

### Por qué disminuye el margen a gran altitud
**CONCEPTO**
1. **El límite de baja velocidad sube en Mach.** A igual CAS, al subir aumenta la TAS y baja la velocidad del sonido. Ejemplo del PHAK: un transporte de 550.000 lb en configuración limpia entra en pérdida cerca de 152 KCAS; a nivel del mar eso es Mach 0,23 y a FL380 es Mach 0,50.
2. **Además, a Mach alto el ala entra en pérdida antes.** El ángulo de ataque de pérdida y el CLmax disminuyen con el Mach (AUPRTA, Airbus). Por eso la IAS del buffet de baja velocidad a gran altitud es mayor que la velocidad de pérdida a baja altitud.
3. **El límite de alta velocidad no crece.** MMO es un Mach fijo; a gran altitud equivale a una IAS cada vez menor. Y como el aire es menos denso, el ala vuela con más ángulo de ataque, lo que acelera el flujo sobre el extradós y adelanta el Mach buffet.
4. **Resultado:** las dos líneas convergen. En el límite, desacelerar produce buffet de baja velocidad y acelerar produce Mach buffet.

### Peso, factor de carga y temperatura
**CONCEPTO**
- **Más peso o más G (viraje, turbulencia, tirón)** aumentan la velocidad del buffet de baja velocidad y reducen la del Mach buffet (PHAK; AC 61-107A, cancelada). El margen se estrecha.
- **Margen de maniobra:** la EASA (AMC 25.251(e)) y los fabricantes usan como referencia poder alcanzar **1,3 G** (un incremento de 0,3 G) sin llegar al buffet. 1,3 G equivale a un viraje nivelado de unos 40° de alabeo.
- **Altitud máxima (AUPRTA):** es la menor entre la altitud máxima certificada, la limitada por empuje y la limitada por buffet (margen de maniobra). Cuando la temperatura aumenta, los motores entregan menos empuje y la altitud limitada por empuje baja de forma significativa; la limitada por buffet depende del Mach, el peso, el G y la altitud de presión, no de la temperatura.

Por eso una autorización de ATC para subir no significa que convenga aceptarla. Si el FMS muestra una altitud máxima cercana al nivel solicitado, el avión puede llegar con poco exceso de empuje, sin capacidad útil de acelerar y con escaso margen para virar o atravesar turbulencia. A veces la decisión más segura y eficiente es permanecer más bajo hasta consumir combustible y reducir peso.

### Q-Corner
**CONCEPTO**
La AC 61-107B de la FAA usa el término **"Q-Corner or Coffin Corner"**: son sinónimos. No lo confundas con la **altitud de cruce (Crossover Altitude)**, que es la altitud a la que una CAS dada y un Mach dado representan la misma velocidad; ahí el límite pasa de VMO a MMO (Sección 10). Algunas fuentes secundarias atribuyen la "Q" a la presión dinámica (q), pero no hay una fuente primaria que lo confirme: en una entrevista, basta con decir que es otro nombre del Coffin Corner.

[IMAGEN — RECUPERACIÓN A GRAN ALTITUD] · `IMG-23`
*Pie:* Ante buffet o pérdida de energía a gran altitud, primero se reduce el ángulo de ataque, luego se nivelan las alas y se recupera energía; mantener la altitud no es la prioridad inicial.

### Operar cerca del techo máximo
**APLICACIÓN OPERACIONAL**
- **Menos margen de alabeo:** en el techo de buffet los márgenes están en el mínimo; la capacidad de viraje es reducida.
- **Poco empuje sobrante:** acelerar o recuperar velocidad es lento; en ocasiones la única forma de recuperar energía es descender.
- **Turbulencia:** una ráfaga aumenta el ángulo de ataque y el factor de carga; puede llevar al buffet de baja o de alta velocidad.
- **Vuelo manual a gran altitud:** entradas pequeñas y suaves; el avión responde distinto que a baja altitud (Airbus, Safety First).
- **Pérdida a gran altitud:** reducir el ángulo de ataque es la prioridad y la recuperación puede requerir varios miles de pies (AC 120-109A, AFH). Intentar conservar el nivel tirando de la columna mantiene el ala cerca del ángulo crítico y retrasa la recuperación de energía; primero se recupera el vuelo controlado y después se vuelve a la altitud autorizada coordinando con ATC.
- **Planificación:** respetar la altitud máxima que calcula el FMS/AFM para el peso y la temperatura del día, y considerar turbulencia pronosticada antes de subir.

> **DEBES RECORDAR**
> Coffin Corner representa una reducción del margen entre los límites aerodinámicos de baja y alta velocidad a gran altitud. Más peso y más G lo reducen aún más.

### Preguntas que debes poder responder
**PREGUNTA DE ENTREVISTA** · *¿Qué es Coffin Corner?*
Es la región de gran altitud donde el buffet de baja velocidad y el límite de alta velocidad (MMO / Mach buffet) se acercan tanto que el margen de velocidad operacional es mínimo. La FAA también la llama Q-Corner.

**PREGUNTA DE ENTREVISTA** · *¿Por qué disminuye el margen de velocidad a gran altitud?*
Porque el límite de baja velocidad, expresado en Mach, sube con la altitud (misma CAS = más TAS y menor velocidad del sonido) y además el Mach alto reduce el ángulo de ataque de pérdida. Al mismo tiempo el límite de alta velocidad es un Mach fijo o incluso menor, porque el ala necesita más ángulo de ataque en aire menos denso. Las dos líneas convergen.

**PREGUNTA DE ENTREVISTA** · *¿Qué relación existe entre Mach y buffet?*
El buffet de alta velocidad aparece cuando la onda de choque sobre el extradós produce separación del flujo. A gran altitud, incluso a baja velocidad indicada, el alto ángulo de ataque acelera el flujo local y puede formar ondas de choque: por eso también existe un buffet de Mach de baja velocidad. Y el Mach alto reduce el ángulo de ataque al que el ala entra en pérdida.

### Quiz · Sección 11

**s11-q1** · Coffin Corner describe:
- A) La altitud máxima certificada
- B) El punto donde el avión alcanza su Mach crítico en el ascenso
- C) La reducción del margen entre el buffet de baja velocidad y el límite de alta velocidad a gran altitud
- D) La altitud donde VMO y MMO son iguales
**Correcta:** C · **Tema:** S11
**Explicación:** La igualdad VMO/MMO es la altitud de cruce. Coffin Corner es la convergencia de los límites de baja y alta velocidad.

**s11-q2** · Cerca del techo máximo, un viraje de 40° de alabeo:
- A) Aumenta el MMO
- B) Reduce la velocidad de pérdida
- C) No cambia los márgenes de buffet
- D) Aumenta el factor de carga a cerca de 1,3 G, sube el buffet de baja velocidad y baja el de alta
**Correcta:** D · **Tema:** S11
**Explicación:** n = 1/cos 40° ≈ 1,31. Más G tiene el mismo efecto que más peso: estrecha el margen desde ambos lados.

**s11-q3** · ¿Por qué la IAS del buffet de baja velocidad a gran altitud es mayor que la velocidad de pérdida a baja altitud?
- A) Porque a Mach alto disminuyen el ángulo de ataque de pérdida y el CLmax
- B) Porque el anemómetro no funciona en aire frío
- C) Porque la densidad aumenta
- D) Porque el CG se desplaza hacia adelante
**Correcta:** A · **Tema:** S11
**Explicación:** Los efectos de compresibilidad reducen el CLmax y el ángulo de pérdida; el ala necesita más presión dinámica para sostener el mismo peso.

**s11-q4** · "Q-Corner", según la AC 61-107B de la FAA, es:
- A) La velocidad de presión dinámica máxima
- B) Otro nombre de Coffin Corner
- C) La altitud de cruce entre VMO y MMO
- D) El límite de carga estructural en turbulencia
**Correcta:** B · **Tema:** S11
**Explicación:** La AC 61-107B lo define como "Q-Corner or Coffin Corner".

---

# SECCIÓN 12 · DENSIDAD, ALTITUD Y PERFORMANCE
**ID:** S12 · **Tiempo:** 12 min
**Objetivo:** relacionar la atmósfera real con el desempeño en despegue, ascenso y aterrizaje.

### Altitudes
**CONCEPTO**
- **Atmósfera estándar (ISA):** a nivel del mar 15 °C y 1013,25 hPa (29,92 inHg); la temperatura disminuye cerca de 2 °C por cada 1.000 ft hasta la tropopausa.
- **Altitud de presión (Pressure Altitude):** la que indica el altímetro con 1013,25 hPa / 29,92 inHg. Es la base de los niveles de vuelo y de las tablas de performance. Un aeropuerto puede estar físicamente a la misma elevación dos días distintos y tener diferente altitud de presión si cambia la presión atmosférica.
- **Altitud de densidad (Density Altitude):** altitud de presión corregida por la temperatura no estándar. Es la altitud de la atmósfera estándar que tiene la densidad real del aire. El avión "rinde" según la altitud de densidad: una pista a 5.000 ft en una tarde muy caliente puede hacer que motores y alas se comporten como si operaran varios miles de pies más arriba.
- La **humedad** también reduce la densidad: el aire húmedo es menos denso que el seco.

### HIGH + HOT + HEAVY
«High» y «hot» aumentan la altitud de densidad: hay menos masa de aire por unidad de volumen, el motor produce menos empuje y el avión necesita más TAS para obtener la misma presión dinámica indicada. «Heavy» no reduce la densidad; aumenta la sustentación requerida y, con ella, las velocidades de despegue y la energía que debe acelerarse o detenerse. Cuando coinciden las tres condiciones, el avión rota con mayor GS, consume más pista y asciende con menos margen.

Piénsalo en un despegue cercano al peso máximo desde un aeropuerto elevado al mediodía. La V-speeds siguen protegiendo la aerodinámica del ala, pero la TAS y la GS correspondientes son mayores, los motores disponen de menos empuje y queda menos exceso de energía para ascender o librar un obstáculo. La decisión operacional no sale de una regla mental: se confirma con el cálculo de performance del avión, que puede exigir reducir peso, cambiar la configuración, esperar una temperatura menor o usar otra pista.

[IMAGEN — HIGH, HOT Y HEAVY] · `IMG-12`
*Pie:* Alto y caliente reducen la densidad; pesado aumenta la sustentación requerida. Para la misma IAS, la TAS y la GS son mayores, aumenta la pista necesaria y disminuye el margen de ascenso.

| Efecto sobre | Alta altitud de densidad | Mayor peso |
|---|---|---|
| **Distancia de despegue** | Aumenta: la misma IAS de rotación es una TAS y GS mayores, y hay menos empuje | Aumenta. Según el PHAK, +10 % de peso produce ≈ +5 % en velocidad de despegue y al menos +21 % en distancia de despegue |
| **Ascenso (gradiente y Rate of Climb)** | Disminuyen: menos exceso de empuje/potencia | Disminuyen |
| **Performance del motor** | Menos masa de aire: menos empuje o potencia | — |
| **Aterrizaje (Landing Performance)** | Aumenta la distancia: mayor TAS y GS al tocar para la misma IAS | Aumenta: mayor velocidad de aproximación y más energía que disipar |
| **Velocidad de pérdida en IAS** | Prácticamente igual a bajo Mach | Aumenta |

**Viento:** el viento de frente reduce la GS necesaria para alcanzar la IAS de rotación y acorta la distancia sobre el terreno; el viento de cola hace lo contrario. Por eso dos despegues con la misma V1 y VR pueden usar distancias distintas según la componente de viento. Para certificación de transporte, los datos de despegue consideran no más del 50 % del viento de frente reportado y no menos del 150 % del viento de cola (14 CFR 25.105(d)).

**Configuración:** los flaps reducen la velocidad necesaria, pero también añaden resistencia. En despegue no se cumple que "más flap siempre es mejor": la posición óptima depende de pista, obstáculos, peso y condiciones, y se obtiene de los datos de performance del tipo.

### IAS, CAS, EAS, TAS y GS

[IMAGEN — IAS, CAS, EAS, TAS Y GS] · `IMG-24`
*Pie:* IAS parte de la indicación; CAS corrige errores; EAS añade compresibilidad; TAS describe el movimiento respecto a la masa de aire y GS incorpora el viento.

| Velocidad | Definición | Para qué importa |
|---|---|---|
| **IAS (Indicated Airspeed)** | La que muestra el anemómetro, sin corregir errores | Referencia aerodinámica: pérdida, rotación, límites de flaps |
| **CAS (Calibrated Airspeed)** | IAS corregida por error de instrumento y de posición | Base de VMO y de los datos de performance |
| **EAS (Equivalent Airspeed)** | CAS corregida por compresibilidad a esa altitud | Presión dinámica real; relevante a alta velocidad y gran altitud |
| **TAS (True Airspeed)** | Velocidad real respecto a la masa de aire | Navegación, Mach, planeación |
| **GS (Ground Speed)** | TAS corregida por viento | Tiempo en ruta, combustible, distancia de despegue y aterrizaje sobre la pista |

**Regla práctica (PHAK):** la TAS es aproximadamente la CAS + 2 % por cada 1.000 ft de altitud. Es una estimación.

**APLICACIÓN OPERACIONAL**
- A 250 KIAS en FL100 (atmósfera estándar) la TAS es de unos 290 kt; la regla del 2 % da ≈ 300 kt. Si además hay 40 kt de viento de cola, la GS será aproximadamente 330 kt: el ala continúa «sintiendo» 250 KIAS, pero el avión cubre más terreno por minuto. Esta diferencia afecta el tiempo de descenso, el combustible y la distancia disponible para desacelerar.
- En un aeródromo alto y caliente la IAS de rotación es prácticamente la misma que en uno a nivel del mar para el mismo peso y configuración (las tablas del tipo pueden aplicar pequeños ajustes por altitud de presión y temperatura), pero la TAS y la GS son mayores: más pista, más energía en un despegue abortado y más carga para los neumáticos y frenos.

> **DEBES RECORDAR**
> El ala vuela con IAS; el avión recorre terreno con GS. High, hot y heavy aumentan la TAS y la GS necesarias y reducen el empuje y el ascenso.

### Quiz · Sección 12

**s12-q1** · La altitud de densidad es:
- A) La altitud indicada con QNH
- B) La elevación del aeródromo
- C) La altitud de presión corregida por temperatura no estándar
- D) La altitud sobre el terreno
**Correcta:** C · **Tema:** S12
**Explicación:** Es la altitud en atmósfera estándar que corresponde a la densidad real.

**s12-q2** · Un avión despega a la misma IAS en un aeródromo alto y caliente que en uno a nivel del mar. En el alto y caliente:
- A) La TAS es menor y la carrera más corta
- B) La velocidad de pérdida en IAS es mucho mayor
- C) La GS es igual porque la IAS es igual
- D) La TAS y la GS de rotación son mayores y la carrera es más larga
**Correcta:** D · **Tema:** S12
**Explicación:** Con menos densidad, la misma presión dinámica exige más TAS; además hay menos empuje.

**s12-q3** · Según el PHAK, un aumento de 10 % en el peso de despegue produce:
- A) ≈ +5 % de velocidad de despegue y al menos +21 % de distancia
- B) +10 % de distancia de despegue
- C) Ningún cambio si la pista es larga
- D) Menor velocidad de rotación
**Correcta:** A · **Tema:** S12
**Explicación:** La velocidad de despegue aumenta con la raíz del peso y la distancia crece bastante más que proporcionalmente.

**s12-q4** · ¿Qué velocidad determina el tiempo en ruta y, para un consumo horario dado, el combustible del trayecto?
- A) IAS
- B) GS
- C) CAS
- D) TAS
**Correcta:** B · **Tema:** S12
**Explicación:** La GS es la velocidad sobre el terreno: define tiempo, combustible y distancia real recorrida.

---
# SECCIÓN 13 · APLICACIÓN DE LA AERODINÁMICA AL VUELO
**ID:** S13 (práctica) · **Tiempo:** 30–40 min
**Objetivo:** analizar situaciones operacionales con los conceptos del módulo.
**Interacción:** el piloto lee el escenario y las preguntas, piensa su respuesta y despliega el análisis. Al desplegarlo se marca la práctica `esc-xx` como hecha.

---

### esc-01 · Viraje de 60° de alabeo
**ESCENARIO**
Un avión realiza un viraje nivelado coordinado de 60° de alabeo. Su velocidad de pérdida en vuelo recto, para ese peso y configuración, es de 120 kt.

**Preguntas**
1. ¿Qué ocurre con el factor de carga?
2. ¿Qué ocurre con la velocidad de pérdida?
3. ¿Qué debe hacer el piloto para mantener la altitud?

**Análisis**
1. n = 1/cos 60° = **2 G**.
2. La velocidad de pérdida aumenta con √2 ≈ 1,41: pasa de 120 kt a **≈ 170 kt**.
3. Aumentar el ángulo de ataque para duplicar la sustentación y aumentar el empuje, porque la resistencia inducida crece. Si la velocidad está cerca de 170 kt, el viraje terminará en pérdida acelerada.

**Temas:** S06, S04

---

### esc-02 · Crucero cerca de MMO a gran altitud
**ESCENARIO**
En crucero a FL390 el avión vuela cerca de su MMO. Entra en una zona de cizalladura con aumento brusco del viento de frente y ligera turbulencia, y el Mach empieza a subir.

**Preguntas**
1. ¿Qué fenómeno aerodinámico comienza a ser relevante?
2. ¿Qué tendencia de cabeceo puede aparecer?
3. ¿Qué margen hay hacia la baja velocidad?

**Análisis**
1. Flujo local supersónico sobre el extradós, **ondas de choque**, aumento de **resistencia de onda** y **Mach Buffet** por separación detrás de la onda.
2. **Mach Tuck:** la onda de choque y el centro de presión se desplazan hacia atrás y aparece nariz abajo; el Mach Trim lo compensa.
3. A esa altitud el margen hacia el low-speed buffet puede ser pequeño (Coffin Corner). Reducir velocidad de forma brusca o maniobrar con mucho alabeo puede llevar al buffet del otro extremo. La corrección de velocidad debe ser gradual y según el procedimiento del tipo.

**Temas:** S10, S11

---

### esc-03 · Más pitch sin energía
**ESCENARIO**
En el ascenso inicial, con empuje reducido por atenuación de ruido, el piloto sube la nariz para cumplir una restricción de altitud. La velocidad baja de forma continua.

**Preguntas**
1. ¿Qué ocurre con el ángulo de ataque?
2. ¿Por qué el avión no sube como espera el piloto?
3. ¿Qué corrige la situación?

**Análisis**
1. Aumenta. Con menos velocidad, el ala necesita más ángulo de ataque para sostener el peso; y el pitch adicional, sin energía, aumenta el ángulo de ataque todavía más.
2. El ascenso lo sostiene el exceso de empuje. Si no hay empuje sobrante, subir la nariz solo cambia velocidad por altura por un momento, y después la velocidad sigue cayendo hacia el ángulo de ataque crítico.
3. Empuje y una actitud compatible con la energía disponible. Si aparece aviso de pérdida, reducir ángulo de ataque primero.

**Temas:** S02, S04, S05

---

### esc-04 · El avión flota en el aterrizaje
**ESCENARIO**
En una aproximación con viento en calma, el avión cruza el umbral 10 kt por encima de la velocidad de referencia. En el flare parece "flotar" y consume mucha pista antes del toque.

**Preguntas**
1. ¿Qué fenómeno aerodinámico está influyendo?
2. ¿Por qué el exceso de velocidad lo empeora?

**Análisis**
1. **Efecto suelo:** cerca de la pista se reducen el downwash y los vórtices de punta; baja la resistencia inducida y el ala necesita menos ángulo de ataque para el mismo CL.
2. Con menos resistencia, la energía sobrante tarda más en disiparse. Cada nudo de más se convierte en distancia de flotación. La prevención es una aproximación estabilizada a la velocidad correcta.

**Temas:** S09, S05

---

### esc-05 · Despegue alto, caliente y pesado
**ESCENARIO**
Despegue en un aeródromo a 8.000 ft de elevación, con 25 °C y el avión cerca de su peso máximo.

**Preguntas**
1. ¿Cómo está la temperatura respecto a la ISA a esa elevación?
2. ¿Qué pasa con la IAS de rotación, la TAS y la GS?
3. ¿Qué efectos hay en distancia y ascenso?

**Análisis**
1. La ISA a 8.000 ft es cerca de –1 °C (15 °C – 2 °C × 8). Con 25 °C, el aire está unos 26 °C por encima de la estándar: la altitud de densidad es bastante mayor que 8.000 ft.
2. La IAS de rotación, para el peso y la configuración, es prácticamente la misma (las tablas del tipo pueden aplicar pequeños ajustes); la TAS y la GS al rotar son mayores.
3. Más carrera de despegue, menor gradiente y régimen de ascenso, menos empuje disponible y mayor energía en un eventual despegue abortado. Los datos de performance del día definen si el peso es aceptable.

**Temas:** S12

---

### esc-06 · Stick shaker en viraje durante la aproximación
**ESCENARIO**
Avión pesado, aproximación con flaps intermedios. Por un cambio de pista, el piloto inicia un viraje de 30° de alabeo sin advertir que la velocidad ha caído por debajo de la velocidad mínima de maniobra de esa configuración. Se activa el Stick Shaker.

**Preguntas**
1. ¿Por qué se activa si la velocidad estaba "en rango"?
2. ¿Cuál es la corrección?

**Análisis**
1. Las velocidades de referencia ya consideran el peso y dejan margen para maniobrar. Ese margen se consumió por dos vías: la velocidad por debajo del mínimo y el viraje, que aumentó el factor de carga (≈ 1,15 G) y la velocidad de pérdida (≈ 7,5 %). El ala se acercó a su ángulo de ataque crítico: es una **pérdida acelerada inminente**.
2. Reducir el ángulo de ataque (aliviar presión atrás), reducir el alabeo, aplicar empuje según necesidad y seguir el procedimiento de recuperación del tipo.

**Temas:** S04, S06

---

### esc-07 · Turbulencia severa en crucero
**ESCENARIO**
En crucero a gran altitud el avión entra en turbulencia severa. El primer oficial propone reducir a Va "para proteger la estructura" y mantener la altitud con correcciones firmes.

**Preguntas**
1. ¿Qué velocidad es la referencia?
2. ¿Qué error hay en la idea de mantener la altitud con correcciones firmes?
3. ¿Qué riesgo aerodinámico adicional hay a gran altitud?

**Análisis**
1. En aviones de transporte, la **velocidad o el Mach de penetración de turbulencia (VRA/MRA)** y el procedimiento del AFM/QRH, no Va. A gran altitud la referencia es normalmente MRA, que puede elegirse para dar el mejor margen entre buffet de baja y alta velocidad (14 CFR 25.1517(c)).
2. Va no protege contra entradas alternadas ni simultáneas en varios ejes (14 CFR 25.1583(a)(3)). Perseguir la altitud con mandos grandes aumenta las cargas. Lo recomendable es mantener la actitud y aceptar variaciones de altitud según el procedimiento.
3. A gran altitud el margen entre low-speed buffet y Mach buffet puede ser pequeño; las ráfagas cambian el ángulo de ataque y el factor de carga. Reducir demasiado la velocidad acerca el buffet de baja velocidad.

**Temas:** S06, S11

---

### esc-08 · CG en límite delantero y en límite trasero
**ESCENARIO**
Dos vuelos con el mismo peso. En el vuelo A el CG está en el límite delantero; en el vuelo B, en el límite trasero.

**Preguntas**
1. ¿En cuál es mayor la fuerza para rotar?
2. ¿En cuál es mayor el consumo?
3. ¿En cuál hay más riesgo de golpe de cola?

**Análisis**
1. **Vuelo A.** El CG adelantado requiere más momento de nariz arriba de la cola.
2. **Vuelo A.** Más carga hacia abajo en la cola implica más sustentación en el ala, más ángulo de ataque y más resistencia.
3. **Vuelo B.** Con CG atrasado la rotación es ligera y es más fácil sobrerrotar. Además la estabilidad longitudinal es menor.

**Temas:** S08

---

### esc-09 · Aviso de pérdida a FL370
**ESCENARIO**
Con piloto automático en modo de altitud y empuje limitado, el avión pierde velocidad lentamente en crucero a FL370. Suena el aviso de pérdida y hay buffet.

**Preguntas**
1. ¿Por qué el ala entra en pérdida a una IAS mayor que a baja altitud?
2. ¿Qué acción es prioritaria y qué se debe aceptar?
3. ¿Por qué el empuje máximo no resuelve la situación por sí solo?

**Análisis**
1. A Mach alto disminuyen el ángulo de ataque de pérdida y el CLmax.
2. **Reducir el ángulo de ataque** (AC 120-109A): desconectar automatismos, nariz abajo hasta eliminar las indicaciones, alas niveladas, empuje según necesidad, retraer speed brakes y volver a la trayectoria. Se debe aceptar la pérdida de altitud; a gran altitud puede ser de varios miles de pies.
3. A gran altitud el empuje sobrante es pequeño y la aceleración es lenta; con motores bajo el ala, el empuje a baja velocidad genera nariz arriba. Sin reducir el ángulo de ataque no hay recuperación.

**Temas:** S04, S11

---

### esc-10 · Velocidad que cae en la aproximación final
**ESCENARIO**
En final, la velocidad está 8 kt por debajo de la referencia y sigue bajando. El piloto sube la nariz para no quedar bajo la senda, sin mover el empuje.

**Preguntas**
1. ¿En qué zona de la curva de resistencia está el avión?
2. ¿Qué pasa con la velocidad y el ángulo de ataque?

**Análisis**
1. Por debajo de la velocidad de mínima resistencia: **régimen de mando invertido (Back Side of the Drag Curve)**.
2. Al subir la nariz aumenta el ángulo de ataque y la resistencia inducida; la velocidad sigue cayendo y el avión se acerca a la pérdida. Hay que añadir empuje. Si la aproximación no es estable, se ejecuta motor y al aire.

**Temas:** S05, S04

---

### esc-11 · Ascenso por la altitud de cruce
**ESCENARIO**
El avión asciende a 290 KIAS y luego cambia a Mach 0,78 para continuar al nivel de crucero.

**Preguntas**
1. ¿Por qué el Mach aumenta durante el ascenso a IAS constante?
2. ¿Qué pasa con la IAS al subir a Mach constante?
3. ¿Qué limitación cambia en esa transición?

**Análisis**
1. A IAS constante la TAS aumenta con la altitud y la velocidad del sonido baja con la temperatura: el Mach sube.
2. La IAS disminuye progresivamente.
3. Es la altitud de cruce de ese perfil (cerca de FL310 para 290 KIAS / Mach 0,78 en atmósfera estándar): por encima, mantener la IAS haría subir el Mach por encima del objetivo y, más arriba, por encima de MMO; por eso se pasa a volar Mach. No la confundas con la altitud de cruce VMO/MMO del tipo, donde el límite máximo pasa de VMO a MMO: es otra altitud, porque se calcula con otros valores.

**Temas:** S10, S12

---

### esc-12 · Escarcha en el ala antes del despegue
**ESCENARIO**
Amanece con temperatura bajo cero. Hay una capa fina de escarcha en el extradós. Alguien comenta que "es muy delgada, no pesa nada".

**Preguntas**
1. ¿El problema es el peso?
2. ¿Qué ocurre con el ángulo de ataque de pérdida y el aviso de pérdida?

**Análisis**
1. No. El problema es aerodinámico: la rugosidad altera la capa límite y adelanta la separación.
2. El ala entra en pérdida a **menor ángulo de ataque** y con menor CLmax; la velocidad de pérdida aumenta. El aviso de pérdida, calibrado para ala limpia, puede no anticipar la pérdida. Por eso el ala debe estar limpia (concepto de ala limpia) antes del despegue.

**Temas:** S04, S01

---

### esc-13 · Oscilación de alabeo y guiñada con Yaw Damper inoperativo
**ESCENARIO**
En crucero, con el Yaw Damper inoperativo, el avión presenta una oscilación en la que la nariz se mueve de lado a lado mientras las alas alabean de forma alternada.

**Preguntas**
1. ¿Qué fenómeno es?
2. ¿Por qué es típico de un ala en flecha?
3. ¿Qué debe hacer la tripulación?

**Análisis**
1. **Dutch Roll.**
2. La flecha aumenta el efecto diedro; cuando domina sobre la estabilidad direccional, alabeo y guiñada se acoplan.
3. Aplicar el procedimiento del fabricante y las limitaciones de la MEL/AFM para Yaw Damper inoperativo. Evitar improvisar entradas de mando grandes.

**Temas:** S09, S10

---
# SECCIÓN 14 · ENTREVISTA DE AERODINÁMICA
**ID:** S14 (práctica) · **Tiempo:** 60–90 min
**Objetivo:** responder como en una entrevista técnica de aerolínea: definición precisa, relación con otros conceptos y consecuencia operacional.
**Interacción:** filtro por nivel (Básico · Intermedio · Avanzado). Si la pregunta tiene opciones, el piloto elige y luego ve la respuesta; si es abierta, piensa o dice su respuesta y despliega. Al ver la respuesta se marca `ent-xx` como hecha. Total: 49 preguntas (Básico 17 · Intermedio 16 · Avanzado 16).

**Cómo responder en la entrevista:** 1) definición en una frase, 2) la relación física clave, 3) un ejemplo operacional. Treinta a sesenta segundos.

---

## NIVEL BÁSICO · Conceptos fundamentales

### ent-01 · Ángulo de ataque
**Pregunta:** ¿Qué es el ángulo de ataque?
**Respuesta correcta:** Es el ángulo entre la cuerda del ala y el viento relativo.
**Explicación:** El viento relativo es opuesto a la trayectoria, por eso el ángulo de ataque depende de hacia dónde se mueve el avión, no solo de hacia dónde apunta la nariz. Es el parámetro que determina el CL y la pérdida.
**Punto que debes recordar:** Cuerda contra viento relativo; no contra el horizonte.
**Tema:** S04

### ent-02 · Cuatro fuerzas
**Pregunta:** ¿Cuáles son las cuatro fuerzas del vuelo y cómo actúan?
**Respuesta correcta:** Sustentación, perpendicular al viento relativo; peso, hacia el centro de la Tierra desde el CG; empuje, hacia adelante; resistencia, paralela y opuesta al viento relativo.
**Explicación:** En vuelo estabilizado están en equilibrio. Los cambios de velocidad o trayectoria aparecen cuando una fuerza supera a su opuesta.
**Punto que debes recordar:** Sustentación y resistencia se definen respecto al viento relativo, no respecto al horizonte.
**Tema:** S02

### ent-03 · Sustentación
**Pregunta:** ¿Qué es la sustentación y de qué depende?
**Respuesta correcta:** Es la componente de la fuerza aerodinámica perpendicular al viento relativo. Depende de la densidad, del cuadrado de la velocidad, de la superficie alar y del coeficiente de sustentación: L = ½ ρ V² S CL.
**Explicación:** El ala desvía el flujo hacia abajo y crea una diferencia de presión entre extradós e intradós. El piloto la controla con la velocidad y el ángulo de ataque (y con flaps y slats).
**Punto que debes recordar:** Newton y Bernoulli describen el mismo fenómeno; no son teorías rivales.
**Tema:** S03

### ent-04 · Pitch vs ángulo de ataque
**Pregunta:** ¿Cuál es la diferencia entre pitch y ángulo de ataque?
- A) El pitch se mide respecto al viento relativo; el ángulo de ataque, respecto al horizonte
- B) El ángulo de ataque siempre es mayor que el pitch
- C) El pitch se mide respecto al horizonte; el ángulo de ataque, respecto al viento relativo
- D) Son el mismo ángulo medido con instrumentos diferentes
**Respuesta correcta:** C
**Explicación:** Con alas niveladas, pitch ≈ ángulo de ataque + ángulo de trayectoria. En descenso con nariz arriba, el ángulo de ataque puede ser mucho mayor que el pitch.
**Punto que debes recordar:** Una nariz arriba no garantiza ni ascenso ni ala fuera de pérdida.
**Tema:** S04

### ent-05 · Stall
**Pregunta:** ¿Qué es una pérdida aerodinámica (Stall)?
- A) La detención de los motores por falta de aire
- B) La pérdida total de sustentación del ala
- C) La velocidad mínima publicada en el manual
- D) La situación en que el ala supera su ángulo de ataque crítico, el flujo se separa y el CL cae
**Respuesta correcta:** D
**Explicación:** Al superar el ángulo crítico, el flujo se separa del extradós, cae el CL y aumenta la resistencia. El ala no deja de producir sustentación por completo.
**Punto que debes recordar:** La pérdida es un problema de ángulo de ataque.
**Tema:** S04

### ent-06 · Ángulo de ataque crítico
**Pregunta:** ¿Qué es el ángulo de ataque crítico (Critical Angle of Attack)?
**Respuesta correcta:** Es el ángulo de ataque al que el ala alcanza su CLmax. Por encima de él, el ala entra en pérdida.
**Explicación:** Para una configuración dada, un ala limpia y a bajo Mach no depende de velocidad, peso ni altitud de densidad. Lo modifican los flaps, los slats, la contaminación y el Mach.
**Punto que debes recordar:** Fijo para una configuración y condición; no es universal.
**Tema:** S04

### ent-07 · Velocidad de pérdida
**Pregunta:** ¿La velocidad de pérdida es un valor fijo? ¿De qué depende?
**Respuesta correcta:** No. Es la velocidad a la que, en unas condiciones concretas, el ala alcanza su ángulo de ataque crítico. Aumenta con el peso, el factor de carga, el CG adelantado, la contaminación del ala y el Mach alto; disminuye con flaps y slats.
**Explicación:** Varía con la raíz cuadrada del peso y del factor de carga. Las velocidades publicadas corresponden a 1 G, un peso y una configuración determinados.
**Punto que debes recordar:** Lo fijo, para una configuración, es el ángulo de ataque crítico; no la velocidad.
**Tema:** S04

### ent-08 · Resistencia parásita
**Pregunta:** ¿Qué es la resistencia parásita (Parasite Drag)?
**Respuesta correcta:** La resistencia que no está relacionada con producir sustentación: de forma, de fricción superficial y de interferencia. Aumenta con el cuadrado de la velocidad.
**Explicación:** Domina a alta velocidad. Tren abajo o superficies extendidas la aumentan.
**Punto que debes recordar:** Más velocidad, mucha más resistencia parásita.
**Tema:** S05

### ent-09 · Resistencia inducida
**Pregunta:** ¿Qué es la resistencia inducida (Induced Drag)?
**Respuesta correcta:** La resistencia que resulta de producir sustentación. La diferencia de presión genera vórtices de punta y el flujo desviado inclina la fuerza aerodinámica hacia atrás. En vuelo nivelado disminuye con el cuadrado de la velocidad.
**Explicación:** Es máxima con el ala pesada y lenta (alto CL y alto ángulo de ataque). La reducen el alargamiento, los winglets y el efecto suelo.
**Punto que debes recordar:** Domina a baja velocidad y alto ángulo de ataque.
**Tema:** S05

### ent-10 · Factor de carga
**Pregunta:** ¿Qué es el factor de carga?
**Respuesta correcta:** La relación entre la sustentación y el peso (n = L/W), expresada en G.
**Explicación:** En vuelo recto y nivelado es 1 G. En un viraje nivelado es 1/cos del alabeo: 30° ≈ 1,15 G, 45° ≈ 1,41 G, 60° = 2 G.
**Punto que debes recordar:** Más factor de carga, más carga estructural y mayor velocidad de pérdida.
**Tema:** S06

### ent-11 · Flaps
**Pregunta:** ¿Qué hacen los flaps?
- A) Aumentan la curvatura (y en algunos tipos la superficie), el CLmax y la resistencia, y reducen la velocidad de pérdida
- B) Aumentan el ángulo de ataque crítico sin cambiar la resistencia
- C) Reducen la resistencia para despegar más rápido
- D) Solo sirven para frenar en tierra
**Respuesta correcta:** A
**Explicación:** Permiten volar más lento con una actitud de nariz más baja y un ángulo de descenso mayor. Los flaps de borde de salida reducen el ángulo de ataque crítico aunque suben el CLmax.
**Punto que debes recordar:** Flaps = más CLmax y más resistencia.
**Tema:** S07

### ent-12 · Slats
**Pregunta:** ¿Qué hacen los slats?
**Respuesta correcta:** Retrasan la separación del flujo en el borde de ataque y permiten alcanzar un ángulo de ataque mayor antes de la pérdida: aumentan el ángulo crítico y el CLmax.
**Explicación:** Abren una ranura que energiza la capa límite del extradós. Se usan con los flaps en despegue y aterrizaje.
**Punto que debes recordar:** Slats suben el ángulo de ataque crítico; los flaps de borde de salida no.
**Tema:** S07

### ent-13 · Spoilers
**Pregunta:** ¿Qué son los spoilers y para qué se usan en un avión de transporte?
**Respuesta correcta:** Paneles en el extradós que destruyen sustentación y aumentan resistencia. En vuelo, asimétricos ayudan al alabeo y simétricos actúan como speed brakes. En tierra, eliminan sustentación y cargan las ruedas para frenar mejor.
**Explicación:** Como ayuda de alabeo no producen guiñada adversa. Se retraen en la recuperación de pérdida.
**Punto que debes recordar:** Spoilers: menos sustentación, más resistencia, más peso en las ruedas tras el toque.
**Tema:** S07

### ent-14 · Centro de gravedad
**Pregunta:** ¿Qué es el CG y por qué es importante?
**Respuesta correcta:** Es el punto donde se considera aplicado el peso total. Su posición respecto al punto neutro y al centro de presión define la estabilidad longitudinal, las fuerzas de mando, la velocidad de pérdida y el consumo.
**Explicación:** Adelantado: más estable y más consumo. Atrasado: menos estable y peor recuperación de pérdida. Fuera de límites puede faltar autoridad de elevador.
**Punto que debes recordar:** El CG no es un dato administrativo: define cómo vuela el avión.
**Tema:** S08

### ent-15 · Número de Mach
**Pregunta:** ¿Qué es el número de Mach?
**Respuesta correcta:** La relación entre la velocidad verdadera del avión y la velocidad del sonido local.
**Explicación:** La velocidad del sonido depende solo de la temperatura; como la temperatura baja con la altitud, a igual TAS el Mach aumenta al subir.
**Punto que debes recordar:** Mach = TAS / velocidad del sonido local.
**Tema:** S10

### ent-16 · IAS, TAS y GS
**Pregunta:** ¿Cuál es la diferencia entre IAS, TAS y GS?
**Respuesta correcta:** IAS es la velocidad indicada por el anemómetro (presión dinámica); TAS es la velocidad real respecto a la masa de aire; GS es la TAS corregida por viento, la velocidad sobre el terreno.
**Explicación:** La IAS gobierna el comportamiento aerodinámico; la TAS, la navegación y el Mach; la GS, el tiempo, el combustible y la distancia sobre la pista.
**Punto que debes recordar:** El ala vuela con IAS; el avión recorre terreno con GS.
**Tema:** S12

### ent-17 · Altitud de densidad
**Pregunta:** ¿Qué es la altitud de densidad y por qué importa?
**Respuesta correcta:** Es la altitud de presión corregida por temperatura no estándar: la altitud de la atmósfera estándar que tiene la densidad real del aire.
**Explicación:** Mayor altitud de densidad significa menos sustentación, empuje y potencia a una misma TAS: más distancia de despegue y aterrizaje y peor ascenso.
**Punto que debes recordar:** El avión rinde según la altitud de densidad, no según la elevación.
**Tema:** S12

---
## NIVEL INTERMEDIO · Relaciones entre conceptos

### ent-18 · Fuerzas en ascenso
**Pregunta:** En un ascenso estabilizado, la sustentación es:
- A) Cero
- B) Ligeramente menor que el peso
- C) Igual al peso
- D) Mayor que el peso
**Respuesta correcta:** B
**Explicación:** Una componente del peso actúa hacia atrás a lo largo de la trayectoria y la compensa el empuje. La sustentación solo equilibra la componente del peso perpendicular a la trayectoria.
**Punto que debes recordar:** El avión sube por exceso de empuje, no por exceso de sustentación.
**Tema:** S02

### ent-19 · Velocidad de pérdida en viraje
**Pregunta:** ¿Por qué aumenta la velocidad de pérdida en un viraje y cuánto?
**Respuesta correcta:** Porque la sustentación debe ser mayor que el peso para mantener la altitud; a la misma velocidad eso exige más ángulo de ataque, y el ángulo crítico se alcanza a mayor velocidad. La velocidad de pérdida aumenta con √n: ≈ 7,5 % a 30°, ≈ 19 % a 45° y ≈ 41 % a 60°.
**Explicación:** n = 1/cos del alabeo. El resultado no depende del tipo de avión.
**Punto que debes recordar:** 60° de alabeo = 2 G = +41 %.
**Tema:** S06

### ent-20 · Pérdida acelerada
**Pregunta:** ¿Qué es una pérdida acelerada (Accelerated Stall)? Da un ejemplo.
**Respuesta correcta:** Una pérdida con factor de carga mayor a 1 G, que ocurre por encima de la velocidad de pérdida en vuelo recto. Ejemplo: un viraje escarpado en la aproximación con poca velocidad, o un tirón brusco al recuperar de un picado.
**Explicación:** El factor de carga exige más sustentación y más ángulo de ataque; el ala llega al ángulo crítico a una velocidad mayor. Suele ser más súbita.
**Punto que debes recordar:** Se puede entrar en pérdida con la velocidad "en verde" si hay G.
**Tema:** S04

### ent-21 · Velocidad de maniobra
**Pregunta:** ¿Cuál afirmación sobre la velocidad de maniobra (Va) es correcta?
- A) Por debajo de Va el avión está protegido contra cualquier entrada de mando
- B) Va es la velocidad de penetración de turbulencia en todo avión de transporte
- C) Por debajo de Va, la deflexión completa de un mando en un eje no debería exceder la carga límite; las entradas alternadas o en varios ejes pueden causar falla estructural incluso por debajo de Va
- D) Va aumenta cuando el peso disminuye
**Respuesta correcta:** C
**Explicación:** Es el contenido exigido por 14 CFR 25.1583(a)(3) en el manual de vuelo, reforzado tras el accidente de AA587. En turbulencia, en transporte, se usa VRA/MRA.
**Punto que debes recordar:** Va: un mando, un eje, sin alternar.
**Tema:** S06

### ent-22 · Va y peso
**Pregunta:** ¿Por qué Va disminuye cuando el avión pesa menos?
**Respuesta correcta:** Porque con menos peso la misma sustentación produce un factor de carga mayor (n = L/W) y la velocidad de pérdida es menor. La velocidad por debajo de la cual el ala entra en pérdida antes de alcanzar la carga límite baja.
**Explicación:** La regulación relaciona Va con la velocidad de pérdida y el factor de carga límite (Va no menor que Vs × √n, 14 CFR 25.335(c)).
**Punto que debes recordar:** Avión liviano, Va más baja.
**Tema:** S06

### ent-23 · Curva de resistencia y L/Dmax
**Pregunta:** Explica la curva de resistencia total y qué representa L/Dmax.
**Respuesta correcta:** La resistencia total es la suma de la parásita, que crece con V², y la inducida, que decrece con V². La curva tiene forma de U. Su mínimo es la velocidad de mínima resistencia, que corresponde a L/Dmax: máxima eficiencia aerodinámica.
**Explicación:** En la teoría clásica, en ese punto la inducida iguala a la parásita. L/Dmax ocurre a un ángulo de ataque específico; la velocidad correspondiente aumenta con el peso.
**Punto que debes recordar:** L/Dmax = mínima resistencia = mejor planeo.
**Tema:** S05

### ent-24 · Planeo y peso
**Pregunta:** Si un avión pesa más, ¿planea más o menos distancia?
- A) Menos distancia
- B) La misma distancia a la misma velocidad
- C) Más distancia
- D) La misma distancia a L/Dmax, pero a mayor velocidad y mayor régimen de descenso
**Respuesta correcta:** D
**Explicación:** La relación de planeo depende de L/D. El peso cambia la velocidad a la que se obtiene L/Dmax, no su valor.
**Punto que debes recordar:** El peso no cambia la distancia de planeo; cambia la velocidad.
**Tema:** S05

### ent-25 · Efecto suelo
**Pregunta:** ¿Qué es el efecto suelo y cómo afecta el despegue y el aterrizaje?
**Respuesta correcta:** Dentro de aproximadamente una envergadura del suelo se restringen el downwash y los vórtices de punta; se reduce la resistencia inducida y el ala necesita menos ángulo de ataque para el mismo CL. En el aterrizaje, con exceso de velocidad, el avión flota; en el despegue, puede despegar antes de la velocidad adecuada y no sostenerse al salir del efecto suelo.
**Explicación:** Según el PHAK, a un décimo de la envergadura la reducción de resistencia inducida es cercana a 48 %. Al salir del efecto suelo aumenta la resistencia inducida y se necesita más ángulo de ataque.
**Punto que debes recordar:** Efecto suelo = menos resistencia inducida.
**Tema:** S09

### ent-26 · Guiñada adversa
**Pregunta:** ¿Qué es la guiñada adversa (Adverse Yaw), por qué ocurre y cómo se corrige?
**Respuesta correcta:** Es la guiñada hacia el lado contrario al viraje al aplicar alerones. El ala que sube tiene más sustentación y más resistencia inducida. Se corrige con timón coordinado; el diseño la reduce con alerones diferenciales, tipo Frise o spoilers de alabeo.
**Explicación:** Es más notable a baja velocidad y con grandes deflexiones de alerón.
**Punto que debes recordar:** El ala que sube frena más.
**Tema:** S09

### ent-27 · Estabilidad estática y dinámica
**Pregunta:** ¿Cuál es la diferencia entre estabilidad estática y dinámica?
**Respuesta correcta:** La estática es la tendencia inicial después de una perturbación (volver, quedarse o alejarse). La dinámica es el comportamiento en el tiempo (oscilaciones que se amortiguan, se mantienen o crecen).
**Explicación:** Un avión puede ser estáticamente estable y dinámicamente inestable: vuelve hacia el equilibrio, pero lo sobrepasa con oscilaciones crecientes.
**Punto que debes recordar:** Estática = tendencia inicial; dinámica = evolución en el tiempo.
**Tema:** S08

### ent-28 · CG adelantado y atrasado
**Pregunta:** Con el CG en el límite delantero, respecto al límite trasero:
- A) Mayor velocidad de pérdida, mayores fuerzas de mando, más estabilidad y más consumo
- B) Menor velocidad de pérdida, menor consumo y mandos más livianos
- C) Menor estabilidad y mayor riesgo de golpe de cola
- D) Ningún cambio aerodinámico, solo estructural
**Respuesta correcta:** A
**Explicación:** El CG adelantado exige más fuerza hacia abajo en la cola: más sustentación en el ala, más ángulo de ataque y más resistencia. El atrasado reduce la estabilidad y dificulta la recuperación de pérdidas.
**Punto que debes recordar:** Adelantado: estable y costoso. Atrasado: eficiente y delicado.
**Tema:** S08

### ent-29 · Estabilidad lateral
**Pregunta:** ¿Qué aporta la estabilidad lateral en un avión de transporte?
**Respuesta correcta:** El efecto diedro: ante un derrape, la tendencia a nivelar las alas. La producen el ángulo de diedro, la flecha y el ala alta (por la interacción ala–fuselaje en el derrape).
**Explicación:** En ala en flecha, el ala que avanza hacia el viento relativo presenta más velocidad perpendicular a su borde de ataque, genera más sustentación y el avión alabea en sentido contrario al derrape.
**Punto que debes recordar:** Flecha = efecto diedro adicional.
**Tema:** S08

### ent-30 · Dutch Roll vs inestabilidad espiral
**Pregunta:** ¿Qué diferencia hay entre Dutch Roll e inestabilidad espiral?
**Respuesta correcta:** El Dutch Roll es una oscilación acoplada de alabeo y guiñada que aparece cuando el efecto diedro domina sobre la estabilidad direccional. La inestabilidad espiral aparece cuando la estabilidad direccional es muy fuerte frente al efecto diedro: el alabeo aumenta lentamente y el avión entra en espiral.
**Explicación:** La FAA indica que la mayoría de los aviones se diseñan con leve inestabilidad espiral, porque es más fácil de manejar que el Dutch Roll. En jets con ala en flecha el Yaw Damper amortigua el Dutch Roll.
**Punto que debes recordar:** Son las dos caras del mismo compromiso de diseño.
**Tema:** S09

### ent-31 · High, hot, heavy
**Pregunta:** ¿Qué efecto tiene la combinación alta elevación + alta temperatura + alto peso en el despegue?
- A) No tiene efecto si se usa la misma IAS
- B) Aumenta la TAS y la GS de rotación, reduce el empuje y aumenta la distancia de despegue; empeora el ascenso
- C) Mejora el ascenso por menor resistencia
- D) Reduce la IAS de rotación
**Respuesta correcta:** B
**Explicación:** Menos densidad exige más TAS para la misma presión dinámica; los motores producen menos empuje; el peso aumenta la velocidad de despegue. Según el PHAK, +10 % de peso ≈ +21 % o más de distancia de despegue.
**Punto que debes recordar:** High, hot, heavy: más pista, menos ascenso.
**Tema:** S12

### ent-32 · TAS e IAS en altura
**Pregunta:** ¿Por qué la TAS es mayor que la IAS a medida que se sube?
**Respuesta correcta:** Porque el anemómetro mide presión dinámica (½ ρ V²). Con menos densidad, se necesita más velocidad verdadera para producir la misma presión dinámica y la misma indicación.
**Explicación:** Como estimación, el PHAK indica sumar 2 % a la CAS por cada 1.000 ft. A gran altitud la diferencia es grande: a igual IAS la TAS y el Mach son mucho mayores.
**Punto que debes recordar:** Menos densidad, más TAS para la misma IAS.
**Tema:** S12

### ent-33 · Régimen de mando invertido
**Pregunta:** ¿Qué es volar en el "Back Side of the Drag Curve" y por qué es peligroso en la aproximación?
**Respuesta correcta:** Es volar por debajo de la velocidad de mínima resistencia, donde reducir la velocidad aumenta la resistencia y exige más empuje. Si la velocidad cae y solo se sube la nariz, la resistencia inducida crece y la velocidad sigue cayendo.
**Explicación:** La velocidad es inestable: sin corrección de empuje, la tendencia es a seguir perdiendo velocidad hacia la pérdida.
**Punto que debes recordar:** En esa zona la velocidad se corrige con empuje.
**Tema:** S05

---

## NIVEL AVANZADO · Preguntas de entrevistador técnico de aerolínea

### ent-34 · Mach crítico
**Pregunta:** Defina Mach crítico y explique su relación con el crucero de un jet.
**Respuesta correcta:** Es el Mach de vuelo al que el flujo, en algún punto del avión, alcanza Mach 1 por primera vez. Por encima aparecen zonas supersónicas, ondas de choque y aumento de resistencia. Los jets suelen cruzar cerca o ligeramente por encima del Mach crítico, pero por debajo o cerca del Mach de divergencia, donde la resistencia sube bruscamente y que según el PHAK suele estar entre 5 % y 10 % por encima.
**Explicación:** El ala acelera el aire sobre el extradós, por eso la velocidad local supera a la del avión. El diseño del ala (flecha, perfil) busca subir el Mach crítico y el de divergencia.
**Punto que debes recordar:** Mach crítico = primer Mach 1 local.
**Tema:** S10

### ent-35 · Compresibilidad
**Pregunta:** ¿Qué es la compresibilidad y cuándo empieza a importar?
**Respuesta correcta:** Es el cambio apreciable de densidad del aire cuando se acelera o se frena alrededor del avión. A baja velocidad (del orden de Mach 0,3 o menos) es despreciable; en velocidades de crucero de jet es significativa y, por encima del Mach crítico, se manifiesta como ondas de choque, resistencia de onda, buffet, Mach Tuck y pérdida de efectividad de mandos.
**Explicación:** También afecta la medición de velocidad a gran altitud (diferencia entre CAS y EAS) y reduce el ángulo de ataque de pérdida a Mach alto.
**Punto que debes recordar:** Compresibilidad: el aire deja de comportarse como incompresible.
**Tema:** S10

### ent-36 · Ondas de choque
**Pregunta:** ¿Cómo se forman las ondas de choque en el ala de un avión subsónico y qué consecuencias tienen?
**Respuesta correcta:** Por encima del Mach crítico se forma una zona de flujo supersónico sobre el extradós; donde ese flujo vuelve a subsónico aparece una onda de choque normal. La presión y la densidad suben de golpe, el flujo pierde energía y la capa límite puede separarse. Consecuencias: resistencia de onda, Mach Buffet, desplazamiento del centro de presión hacia atrás (Mach Tuck) y menor efectividad de mandos.
**Explicación:** Al aumentar la velocidad, la onda se intensifica y se desplaza hacia el borde de salida.
**Punto que debes recordar:** El problema no es solo la onda: es la separación que provoca.
**Tema:** S10

### ent-37 · Low-speed buffet vs Mach buffet
**Pregunta:** ¿Cuál es la diferencia entre el buffet de baja velocidad y el Mach Buffet?
- A) El buffet de baja velocidad solo ocurre con flaps extendidos
- B) No hay diferencia; ambos se deben al tren de aterrizaje
- C) El de baja velocidad se debe a alto ángulo de ataque cerca de la pérdida; el Mach Buffet, a la separación detrás de ondas de choque a alta velocidad
- D) El Mach Buffet ocurre solo por debajo de FL100
**Respuesta correcta:** C
**Explicación:** A gran altitud ambos pueden tener relación con la compresibilidad: con alto ángulo de ataque, el flujo sobre el extradós se acelera y puede formar ondas de choque incluso a baja IAS (el PHAK lo llama buffet de Mach de baja velocidad).
**Punto que debes recordar:** Uno por demasiado lento para el peso y la altitud; el otro por demasiado rápido.
**Tema:** S11

### ent-38 · Alas en flecha
**Pregunta:** ¿Por qué los aviones de transporte usan alas en flecha y qué desventajas tienen?
**Respuesta correcta:** Porque solo la componente del flujo perpendicular al borde de ataque determina la distribución de presiones y las ondas de choque; al reducirla, la flecha sube el Mach crítico y el de divergencia y suaviza la subida de resistencia. Desventajas: tendencia a la pérdida en punta con cabeceo hacia arriba, menor efectividad para generar sustentación a baja velocidad (más velocidad de aproximación y necesidad de flaps y slats) y mayor tendencia al Dutch Roll.
**Explicación:** El compromiso favorece el crucero rápido y eficiente; las desventajas a baja velocidad se resuelven con hipersustentadores y Yaw Damper.
**Punto que debes recordar:** Flecha: mejor a alta velocidad, más exigente a baja velocidad.
**Tema:** S10

### ent-39 · Mach Tuck
**Pregunta:** ¿Qué es Mach Tuck y qué sistema lo compensa?
**Respuesta correcta:** Es la tendencia de nariz abajo al aumentar el Mach: la onda de choque y el centro de presión se desplazan hacia atrás. Lo compensa el Mach Trim; si está inoperativo, el fabricante impone un Mach máximo reducido.
**Explicación:** Si no se corrige, la nariz abajo aumenta la velocidad y agrava el efecto.
**Punto que debes recordar:** Más Mach, centro de presión atrás, nariz abajo.
**Tema:** S10

### ent-40 · Coffin Corner
**Pregunta:** Explique qué es Coffin Corner y por qué el margen entre el buffet de baja velocidad y el buffet de alta velocidad disminuye a grandes altitudes.
**Respuesta correcta:** Coffin Corner (o Q-Corner, según la AC 61-107B de la FAA) es la región de gran altitud donde el límite de baja velocidad (low-speed buffet / pérdida) y el de alta velocidad (MMO / Mach buffet) convergen y el margen operacional es mínimo. El margen se reduce por tres razones: (1) a igual CAS, al subir aumenta la TAS y baja la velocidad del sonido, así que el límite de baja velocidad expresado en Mach sube; (2) a Mach alto el ángulo de ataque de pérdida y el CLmax disminuyen, lo que eleva todavía más la velocidad del buffet de baja velocidad; (3) el límite de alta velocidad es un Mach fijo o incluso menor, porque en aire menos denso el ala vuela con más ángulo de ataque y el flujo del extradós llega antes a formar ondas de choque. Más peso o más G estrechan aún más el margen; la temperatura alta reduce el empuje disponible y, con él, la altitud máxima y la capacidad de mantener la velocidad.
**Explicación:** Ejemplo del PHAK: una pérdida a 152 KCAS es Mach 0,23 a nivel del mar y Mach 0,50 a FL380. Operacionalmente implica menos capacidad de viraje, poca aceleración disponible y sensibilidad a la turbulencia.
**Punto que debes recordar:** Coffin Corner representa una reducción del margen entre los límites aerodinámicos de baja y alta velocidad a gran altitud.
**Tema:** S11

### ent-41 · Buffet de baja velocidad en altura
**Pregunta:** ¿Por qué la IAS del buffet de baja velocidad a FL390 es mayor que la velocidad de pérdida del mismo avión a FL100?
**Respuesta correcta:** Porque a Mach alto disminuyen el ángulo de ataque de pérdida y el CLmax. El ala necesita más presión dinámica (más IAS) para sostener el mismo peso sin llegar al buffet.
**Explicación:** A bajo Mach la velocidad de pérdida en IAS es prácticamente la misma con la altitud; a gran altitud deja de serlo por la compresibilidad (AUPRTA, Airbus).
**Punto que debes recordar:** A Mach alto el ala entra en pérdida antes.
**Tema:** S11

### ent-42 · Margen de maniobra de 1,3 G
**Pregunta:** ¿Qué significa volar con un margen de buffet de 1,3 G y qué implica en un viraje cerca del techo?
**Respuesta correcta:** Que el avión puede soportar un incremento de 0,3 G (maniobra o ráfaga) sin llegar al buffet. Es la referencia de la EASA (AMC 25.251(e)) y de los fabricantes para la altitud limitada por buffet. 1,3 G equivale a un viraje nivelado de unos 40°; más alabeo, o turbulencia sumada a un viraje, puede llevar al buffet.
**Explicación:** Más G sube el buffet de baja velocidad y baja el de alta. En el techo de buffet el margen está en el mínimo y la capacidad de alabeo es reducida.
**Punto que debes recordar:** Cerca del techo, alabeo moderado y cuidado con la turbulencia.
**Tema:** S11

### ent-43 · Altitud máxima
**Pregunta:** ¿Qué determina la altitud máxima de operación de un jet en un día dado?
**Respuesta correcta:** Es la menor de tres: la altitud máxima certificada, la altitud limitada por empuje (la que permite un régimen de ascenso mínimo) y la altitud limitada por buffet o maniobra (la que conserva el margen requerido antes del buffet).
**Explicación:** Depende del peso y la temperatura: con más temperatura la altitud máxima baja de forma significativa (AUPRTA). El FMS o el AFM la indican para las condiciones del día.
**Punto que debes recordar:** Techo del día = el menor de certificado, empuje y buffet.
**Tema:** S11

### ent-44 · Q-Corner y altitud de cruce
**Pregunta:** ¿Cuál afirmación es correcta?
- A) Q-Corner es el factor de carga máximo en turbulencia
- B) Q-Corner es la altitud donde VMO y MMO son iguales
- C) Coffin Corner y altitud de cruce son lo mismo
- D) Q-Corner es otro nombre de Coffin Corner; la altitud donde una CAS y un Mach dados coinciden es la altitud de cruce (Crossover Altitude)
**Respuesta correcta:** D
**Explicación:** La AC 61-107B usa "Q-Corner or Coffin Corner". La altitud de cruce es otro concepto: marca el paso del límite VMO al MMO.
**Punto que debes recordar:** Q-Corner = Coffin Corner. Crossover = cambio de IAS a Mach.
**Tema:** S11

### ent-45 · Altitud de cruce en el ascenso
**Pregunta:** Explica qué pasa con el Mach al ascender a IAS constante y con la IAS al ascender a Mach constante.
**Respuesta correcta:** A IAS constante, el Mach aumenta: la TAS sube con la altitud y la velocidad del sonido baja con la temperatura. A Mach constante, la IAS disminuye. Por eso se asciende primero con IAS y, al llegar a la altitud de cruce del perfil, con Mach; de lo contrario el Mach seguiría subiendo por encima del objetivo y, más arriba, de MMO.
**Explicación:** Ejemplo del PHAK: en los primeros jets, 306 KCAS y Mach 0,82 coincidían cerca de FL310; a FL380, Mach 0,82 equivale a unos 261 KCAS. Ascender demasiado a Mach constante acerca la IAS al límite de baja velocidad.
**Punto que debes recordar:** Abajo manda VMO; arriba manda MMO.
**Tema:** S10

### ent-46 · Recuperación de pérdida a gran altitud
**Pregunta:** Describa la recuperación de una pérdida a gran altitud y explique por qué no se debe priorizar mantener la altitud.
**Respuesta correcta:** Según la plantilla de la AC 120-109A: desconectar piloto automático y autothrottle; aplicar nariz abajo hasta eliminar las indicaciones de pérdida (y compensar si es necesario); nivelar alas; empuje según necesidad; retraer speed brakes/spoilers; regresar a la trayectoria deseada. Reducir el ángulo de ataque es lo prioritario; intentar mantener altitud mantiene el ala en pérdida.
**Explicación:** A gran altitud el empuje sobrante es pequeño y la aceleración es lenta; la recuperación puede requerir varios miles de pies. Con motores bajo el ala, el empuje alto a baja velocidad genera nariz arriba.
**Punto que debes recordar:** Primero ángulo de ataque; la altitud se recupera después.
**Tema:** S04

### ent-47 · Nariz arriba y en pérdida
**Pregunta:** ¿Puede un avión estar en pérdida con la nariz arriba y descendiendo a gran velocidad vertical? ¿Qué indica eso sobre pitch y ángulo de ataque?
**Respuesta correcta:** Sí. Si el avión desciende con fuerte ángulo de trayectoria negativo, el viento relativo llega desde abajo y el ángulo de ataque es aproximadamente el pitch más ese ángulo de descenso. Con 15° de nariz arriba y 25° de trayectoria descendente, el ángulo de ataque es del orden de 40°.
**Explicación:** En el AF447 (BEA) el avión llegó a unos 38.000 ft con 16° de actitud y de ángulo de ataque; luego descendió con la nariz arriba, a unos 10.000 ft/min, con ángulo de ataque por encima de 35° durante el descenso.
**Punto que debes recordar:** La actitud no dice si el ala vuela; el ángulo de ataque sí.
**Tema:** S04

### ent-48 · Contaminación del ala
**Pregunta:** ¿Por qué una capa delgada de escarcha en el ala es peligrosa si casi no agrega peso?
**Respuesta correcta:** Porque altera la capa límite y adelanta la separación: el ala entra en pérdida a menor ángulo de ataque y con menor CLmax, y la velocidad de pérdida aumenta. El aviso de pérdida, calibrado para ala limpia, puede no anticiparla.
**Explicación:** El problema es aerodinámico, no de peso. Por eso el despegue exige ala limpia.
**Punto que debes recordar:** Ala contaminada = pérdida a menor ángulo de ataque.
**Tema:** S04

### ent-49 · Turbulencia severa y velocidad
**Pregunta:** En crucero entras en turbulencia severa. ¿Qué velocidad usas, cómo manejas los mandos y qué riesgo aerodinámico consideras a gran altitud?
**Respuesta correcta:** La velocidad o el Mach de penetración de turbulencia (VRA/MRA) y el procedimiento del AFM/QRH, no Va. Mantener la actitud con entradas suaves y aceptar variaciones de altitud: las entradas grandes y alternadas pueden causar daño estructural incluso por debajo de Va (14 CFR 25.1583(a)(3)). A gran altitud, las ráfagas cambian el ángulo de ataque y el factor de carga y pueden llevar al buffet de baja o alta velocidad.
**Explicación:** La turbulencia combina cargas estructurales (Sección 6) con márgenes de buffet reducidos (Sección 11). La 14 CFR 25.1517 exige establecer VRA y MRA; en altitudes limitadas por Mach, MRA puede elegirse para dar el margen óptimo entre buffet de baja y alta velocidad.
**Punto que debes recordar:** VRA/MRA, actitud, entradas suaves y respeto por el margen de buffet.
**Tema:** S06, S11

---
# QUIZ FINAL DE AERODINÁMICA
**Clave de evaluación:** `aerodinamica_evaluacion` · **Banco:** 40 preguntas (`ev-01` a `ev-40`) · **Por intento:** 20 al azar · **Aprobación:** 80 % · **Retroalimentación:** al final
**Resultado que se muestra:** puntaje, porcentaje, número de correctas e incorrectas, revisión de cada incorrecta con su explicación y **temas que debe repasar** (secciones de las preguntas falladas, con enlace a cada sección).

**Selección sugerida por intento (20):** S04 ×3 · S06 ×2 · S10 ×2 · S11 ×3 · S12 ×2 · y 1 de cada una de S01, S02, S03, S05, S07, S08, S09, más 1 adicional al azar entre S03, S05 y S08. Si la plataforma no soporta cupos por etiqueta, 20 al azar.

---

**ev-01** · La presión dinámica es:
- A) ½ ρ V², la presión asociada al movimiento del aire
- B) La presión a nivel del mar en atmósfera estándar
- C) La presión del aire en reposo
- D) La presión medida por la toma estática
**Correcta:** A · **Tema:** S01
**Explicación:** Es la presión asociada al movimiento. El sistema pitot-estático mide presión de impacto; a bajo Mach coincide aproximadamente con la presión dinámica, mientras que a mayor Mach requiere corrección de compresibilidad.

**ev-02** · La separación de la capa límite en el extradós:
- A) Es producida por el tren de aterrizaje
- B) Aumenta la resistencia y reduce la sustentación; avanza hacia el borde de ataque al aumentar el ángulo de ataque
- C) Solo ocurre a velocidades supersónicas
- D) Reduce la resistencia y aumenta la sustentación
**Correcta:** B · **Tema:** S01
**Explicación:** La separación es el mecanismo de la pérdida. Con más ángulo de ataque el punto de separación se mueve hacia adelante.

**ev-03** · En un descenso estabilizado a velocidad constante:
- A) La sustentación es mucho mayor que el peso
- B) Las fuerzas no están en equilibrio
- C) Una componente del peso actúa hacia adelante en la trayectoria y el empuje es menor que la resistencia
- D) El empuje es mayor que la resistencia
**Correcta:** C · **Tema:** S02
**Explicación:** En descenso estabilizado hay equilibrio: la componente del peso a lo largo de la trayectoria reemplaza parte del empuje.

**ev-04** · Un piloto sube la nariz en ascenso sin cambiar el empuje. Lo esperable es:
- A) Aumento sostenido de la tasa de ascenso sin cambio de velocidad
- B) Reducción del ángulo de ataque
- C) Aumento de velocidad
- D) Mayor ángulo de trayectoria por un momento y disminución de velocidad
**Correcta:** D · **Tema:** S02
**Explicación:** Sin más empuje, la altura se gana a costa de la velocidad; el ángulo de ataque tiende a aumentar.

**ev-05** · La teoría del "tiempo de tránsito igual":
- A) Es falsa: el aire del extradós llega antes al borde de salida
- B) Es válida por encima del Mach crítico
- C) Es la explicación correcta de la sustentación
- D) Solo aplica a perfiles simétricos
**Correcta:** A · **Tema:** S03
**Explicación:** NASA la clasifica como teoría incorrecta. La sustentación se explica por el desvío del flujo y la distribución de presiones.

**ev-06** · En la ecuación L = ½ ρ V² S CL, el término ½ ρ V² corresponde a:
- A) El peso
- B) La presión dinámica
- C) El coeficiente de sustentación
- D) La superficie alar
**Correcta:** B · **Tema:** S03
**Explicación:** Es la presión dinámica (q). A bajo Mach, la presión de impacto obtenida por el sistema pitot-estático la aproxima; a mayor Mach se corrige la compresibilidad para obtener EAS.

**ev-07** · El coeficiente de sustentación (CL) de un ala depende principalmente de:
- A) Solo de la velocidad
- B) Del peso del avión
- C) Del ángulo de ataque y la configuración, y también del Mach y la contaminación
- D) Solo de la densidad
**Correcta:** C · **Tema:** S03
**Explicación:** El CL resume la capacidad del ala en una condición: ángulo de ataque, forma y configuración; a gran velocidad lo afecta el Mach.

**ev-08** · ¿Cuál afirmación es correcta?
- A) Con empuje máximo no puede haber pérdida
- B) Con la nariz abajo no puede haber pérdida
- C) Un avión solo entra en pérdida a baja velocidad
- D) Un avión puede entrar en pérdida a cualquier velocidad, actitud y potencia si supera su ángulo de ataque crítico
**Correcta:** D · **Tema:** S04
**Explicación:** La pérdida depende del ángulo de ataque. Es la afirmación de la FAA (AC 61-67C, AFH).

**ev-09** · Con alas niveladas, un avión tiene 5° de pitch y 3° de trayectoria descendente. El ángulo de ataque aproximado es:
- A) 2°
- B) 5°
- C) 8°
- D) –3°
**Correcta:** C · **Tema:** S04
**Explicación:** AOA ≈ pitch – trayectoria = 5° – (–3°) = 8°.

**ev-10** · ¿Qué condición **reduce** la velocidad de pérdida?
- A) Extender flaps y slats
- B) Mayor peso
- C) Viraje con 45° de alabeo
- D) CG adelantado
**Correcta:** A · **Tema:** S04
**Explicación:** Los hipersustentadores aumentan el CLmax. Las demás opciones aumentan la velocidad de pérdida.

**ev-11** · Según la AC 120-109A, durante la recuperación de una pérdida:
- A) Se aplica siempre empuje máximo antes de bajar la nariz
- B) Se reduce el ángulo de ataque como prioridad y se acepta la pérdida de altitud
- C) Se busca perder la menor altitud posible aun manteniendo el ángulo de ataque
- D) Se extienden speed brakes para controlar la velocidad
**Correcta:** B · **Tema:** S04
**Explicación:** Reducir el ángulo de ataque es lo prioritario. El empuje va según necesidad y los speed brakes se retraen.

**ev-12** · En un ala en flecha, la pérdida tiende a comenzar en:
- A) La raíz, con nariz abajo
- B) Toda el ala al mismo tiempo, sin efecto de cabeceo
- C) Las puntas, con tendencia de nariz arriba
- D) El estabilizador horizontal
**Correcta:** C · **Tema:** S04
**Explicación:** La capa límite fluye hacia las puntas; al perder sustentación atrás, la resultante se desplaza hacia adelante y la nariz sube.

**ev-13** · Por debajo de la velocidad de mínima resistencia:
- A) La resistencia total es cero
- B) El avión no puede mantener vuelo nivelado en ningún caso
- C) Domina la resistencia parásita
- D) Domina la resistencia inducida y volar más lento exige más empuje
**Correcta:** D · **Tema:** S05
**Explicación:** Es el régimen de mando invertido: al frenar, la resistencia inducida crece más de lo que baja la parásita.

**ev-14** · ¿Qué reduce la resistencia inducida?
- A) Winglets y mayor alargamiento del ala
- B) Menor velocidad
- C) Mayor factor de carga
- D) Mayor peso
**Correcta:** A · **Tema:** S05
**Explicación:** Winglets y alargamiento reducen la intensidad de los vórtices de punta. Las demás opciones la aumentan.

**ev-15** · La velocidad de L/Dmax de un avión:
- A) Disminuye con el peso
- B) Aumenta con el peso
- C) Coincide con VMO
- D) Es la misma para cualquier peso
**Correcta:** B · **Tema:** S05
**Explicación:** L/Dmax ocurre a un ángulo de ataque fijo; con más peso se necesita más presión dinámica para el mismo CL.

**ev-16** · Un viraje nivelado coordinado de 30° de alabeo produce un factor de carga aproximado de:
- A) 1,00 G
- B) 1,15 G
- C) 1,41 G
- D) 2,00 G
**Correcta:** B · **Tema:** S06
**Explicación:** n = 1/cos 30° ≈ 1,15 G.

**ev-17** · Si la velocidad de pérdida de un avión es 140 kt en 1 G, en un viraje nivelado de 60° será aproximadamente:
- A) 150 kt
- B) 167 kt
- C) 198 kt
- D) 280 kt
**Correcta:** C · **Tema:** S06
**Explicación:** n = 2; √2 ≈ 1,41; 140 × 1,41 ≈ 198 kt.

**ev-18** · El texto que 14 CFR 25.1583(a)(3) exige en el manual de vuelo advierte que:
- A) Va solo aplica con flaps extendidos
- B) Por debajo de Va se puede aplicar cualquier combinación de mandos
- C) Las entradas grandes y alternadas, o completas en más de un eje al mismo tiempo, pueden producir falla estructural a cualquier velocidad, incluso por debajo de Va
- D) Va es igual a VMO
**Correcta:** C · **Tema:** S06
**Explicación:** La advertencia se reforzó tras AA587: Va no protege contra entradas alternadas ni multieje.

**ev-19** · En un avión de transporte, el límite de factor de carga positivo con flaps extendidos (14 CFR 25.345) es:
- A) +6,0 G
- B) +3,8 G
- C) +1,0 G
- D) +2,0 G
**Correcta:** D · **Tema:** S06
**Explicación:** Con flaps extendidos el requisito de maniobra es +2,0 G; con flaps arriba, al menos +2,5 G.

**ev-20** · Los slats y dispositivos de borde de ataque:
- A) Retrasan la separación y aumentan el ángulo de ataque crítico y el CLmax
- B) Aumentan la resistencia parásita sin efecto en la pérdida
- C) Reducen el ángulo de ataque crítico
- D) Solo se usan en crucero
**Correcta:** A · **Tema:** S07
**Explicación:** Energizan o protegen el flujo del borde de ataque y permiten más ángulo de ataque antes de la pérdida.

**ev-21** · En vuelo, los spoilers usados de forma asimétrica:
- A) Aumentan la sustentación del ala que baja
- B) Ayudan al alabeo sin producir guiñada adversa
- C) Controlan el cabeceo
- D) Actúan como flaps
**Correcta:** B · **Tema:** S07
**Explicación:** El spoiler del ala que debe bajar reduce su sustentación; como no aumenta la resistencia inducida del ala que sube, no genera guiñada adversa.

**ev-22** · En un avión convencional, el estabilizador horizontal normalmente:
- A) No genera fuerza en vuelo nivelado
- B) Controla la guiñada
- C) Genera una fuerza hacia abajo que equilibra el momento de nariz abajo del ala y el CG
- D) Genera sustentación hacia arriba igual a la del ala
**Correcta:** C · **Tema:** S07
**Explicación:** En la configuración convencional descrita, la cola genera fuerza hacia abajo para equilibrar el momento del conjunto ala-fuselaje y mantener el equilibrio alrededor del CG.

**ev-23** · Un avión estáticamente estable pero dinámicamente inestable, ante una perturbación:
- A) Se aleja de inmediato del equilibrio
- B) Vuelve sin oscilar
- C) Se queda en la nueva posición
- D) Tiende a volver, pero oscila con amplitud creciente
**Correcta:** D · **Tema:** S08
**Explicación:** La tendencia inicial es volver (estática positiva), pero las oscilaciones crecen (dinámica negativa).

**ev-24** · Con el CG atrasado dentro de límites, respecto a uno adelantado:
- A) Menor estabilidad longitudinal y fuerzas de mando más livianas
- B) Mayor velocidad de pérdida
- C) Mayor consumo
- D) Mayor esfuerzo para rotar
**Correcta:** A · **Tema:** S08
**Explicación:** Con CG atrasado baja la carga en la cola: menos resistencia y velocidad de pérdida, pero menos estabilidad y mandos más livianos.

**ev-25** · ¿En qué condición es más probable que el piloto sobrecargue la estructura sin darse cuenta?
- A) CG exactamente en el centro del rango
- B) CG en el límite trasero, por fuerzas de mando livianas
- C) La posición del CG no influye
- D) CG en el límite delantero
**Correcta:** B · **Tema:** S08
**Explicación:** Con mandos livianos es más fácil aplicar G de más (PHAK).

**ev-26** · Al salir del efecto suelo en el despegue, el avión:
- A) Necesita menos ángulo de ataque para el mismo CL
- B) No sufre cambios
- C) Necesita más ángulo de ataque para el mismo CL y aumenta su resistencia inducida
- D) Pierde resistencia parásita
**Correcta:** C · **Tema:** S09
**Explicación:** Al alejarse del suelo se recuperan el downwash y los vórtices: sube la resistencia inducida y el ángulo de ataque requerido.

**ev-27** · En un avión de hélice que gira a la derecha (vista desde la cabina), con alta potencia y alto ángulo de ataque, el factor P produce:
- A) Guiñada a la derecha
- B) Ningún efecto
- C) Cabeceo nariz abajo
- D) Guiñada a la izquierda
**Correcta:** D · **Tema:** S09
**Explicación:** La pala descendente (lado derecho) tiene mayor ángulo de ataque y más empuje; la nariz guiña a la izquierda.

**ev-28** · La mayoría de los aviones se diseñan con:
- A) Leve inestabilidad espiral, preferible al Dutch Roll
- B) Efecto diedro negativo
- C) Fuerte tendencia al Dutch Roll
- D) Estabilidad direccional nula
**Correcta:** A · **Tema:** S09
**Explicación:** Según el PHAK, la inestabilidad espiral leve es más fácil de manejar que el Dutch Roll.

**ev-29** · Cuando la velocidad supera el Mach crítico:
- A) Desaparece la resistencia
- B) Aparecen zonas de flujo supersónico, ondas de choque y, poco después, aumento brusco de resistencia
- C) El ángulo de ataque crítico aumenta
- D) El avión alcanza Mach 1
**Correcta:** B · **Tema:** S10
**Explicación:** El Mach crítico es el primer Mach 1 local. La subida brusca de resistencia ocurre en el Mach de divergencia, 5–10 % por encima.

**ev-30** · La flecha del ala aumenta el Mach crítico porque:
- A) Aumenta la curvatura del perfil
- B) Reduce el peso del ala
- C) Solo la componente del flujo perpendicular al borde de ataque determina la distribución de presión y es menor que la velocidad del avión
- D) Aumenta la superficie alar
**Correcta:** C · **Tema:** S10
**Explicación:** Es la teoría de la flecha del PHAK y NASA: el ala "ve" una velocidad efectiva menor.

**ev-31** · A gran altitud el límite de velocidad máxima operativa se expresa normalmente como:
- A) Va
- B) VRA
- C) VMO en KCAS
- D) MMO en Mach
**Correcta:** D · **Tema:** S10
**Explicación:** Por encima de la altitud de cruce, el Mach máximo se alcanza antes que VMO; el límite es MMO.

**ev-32** · El Mach Buffet se debe a:
- A) La separación del flujo detrás de una onda de choque
- B) La reacción del torque de los motores
- C) La turbulencia de la estela de otro avión
- D) El tren de aterrizaje extendido
**Correcta:** A · **Tema:** S10
**Explicación:** La onda de choque puede provocar separación de la capa límite y ese flujo separado hace vibrar la estructura.

**ev-33** · ¿Qué efecto tiene un aumento de peso sobre los límites de buffet a gran altitud?
- A) Solo afecta el de alta velocidad
- B) Sube el buffet de baja velocidad y baja el de alta: reduce el margen
- C) No tiene efecto
- D) Baja el buffet de baja velocidad y sube el de alta
**Correcta:** B · **Tema:** S11
**Explicación:** Más peso exige más ángulo de ataque, igual que más G (PHAK; AC 61-107A, cancelada).

**ev-34** · La altitud máxima de operación de un jet en un día dado es:
- A) La mayor entre las tres
- B) Siempre la altitud máxima certificada
- C) La menor entre la certificada, la limitada por empuje y la limitada por buffet
- D) La altitud de cruce
**Correcta:** C · **Tema:** S11
**Explicación:** Es la definición de la AUPRTA; con más temperatura o peso, baja.

**ev-35** · Un margen de buffet de 1,3 G equivale aproximadamente a:
- A) Un viraje nivelado de 25°
- B) Un viraje nivelado de 60°
- C) Un viraje nivelado de 15°
- D) Un viraje nivelado de 40°
**Correcta:** D · **Tema:** S11
**Explicación:** 1/cos 40° ≈ 1,31 G.

**ev-36** · En Coffin Corner, el piloto:
- A) Tiene un margen mínimo: desacelerar lleva al buffet de baja velocidad y acelerar al Mach buffet
- B) Solo está limitado por VMO
- C) Puede reducir o aumentar la velocidad con amplios márgenes
- D) Está por debajo de la altitud de cruce
**Correcta:** A · **Tema:** S11
**Explicación:** Es la convergencia de los límites aerodinámicos de baja y alta velocidad.

**ev-37** · Al aumentar la temperatura en crucero respecto a la ISA, la altitud máxima:
- A) No cambia
- B) Disminuye
- C) Aumenta
- D) Solo cambia si hay turbulencia
**Correcta:** B · **Tema:** S11
**Explicación:** Con temperatura alta los motores entregan menos empuje: baja la altitud limitada por empuje y, con ella, la altitud máxima (AUPRTA). La altitud limitada por buffet no depende de la temperatura.

**ev-38** · A una misma IAS, al aumentar la altitud de densidad la TAS:
- A) Depende solo del viento
- B) Disminuye
- C) Aumenta
- D) Es igual
**Correcta:** C · **Tema:** S12
**Explicación:** Con menos densidad se necesita más velocidad verdadera para la misma presión dinámica.

**ev-39** · Para certificación de despegue en transporte, 14 CFR 25.105(d) considera:
- A) Solo el viento cruzado
- B) Ningún efecto del viento
- C) El 100 % del viento de frente y el 100 % del de cola
- D) No más del 50 % del viento de frente y no menos del 150 % del de cola
**Correcta:** D · **Tema:** S12
**Explicación:** Es un factor conservador: se da poco crédito al viento de frente y se penaliza más el de cola.

**ev-40** · ¿Qué efecto tiene la humedad alta sobre la performance?
- A) Empeora la performance porque el aire húmedo es menos denso
- B) Mejora la performance porque el aire húmedo es más denso
- C) No tiene efecto
- D) Solo afecta la visibilidad
**Correcta:** A · **Tema:** S12
**Explicación:** El vapor de agua es más liviano que el aire seco: sube la altitud de densidad.

---
# ANEXO A · FIGURAS DIDÁCTICAS (24)

Cada lección lleva una figura integrada de 1600 × 900, con título, señales visuales y un pie que explica qué debe mirar el alumno. Los diagramas usan fondo claro, jerarquía tipográfica y los colores semánticos del módulo; no son decoración ni espacios pendientes.

| ID | Sección | Título | Qué debe mostrar |
|---|---|---|---|
| IMG-01 | S01 | Flujo de aire y viento relativo | Perfil con líneas de corriente; flecha de trayectoria y flecha de viento relativo opuesta; un segundo caso en descenso con nariz arriba |
| IMG-02 | S02 | Las cuatro fuerzas del vuelo | Avión de transporte de perfil en nivelado y en ascenso; en ascenso, descomposición del peso a lo largo y perpendicular a la trayectoria |
| IMG-03 | S03 | Perfil aerodinámico etiquetado | Borde de ataque, borde de salida, cuerda, línea de curvatura media, espesor, viento relativo, ángulo de ataque, zonas de baja y alta presión, upwash y downwash |
| IMG-04 | S04 | Curva de sustentación vs ángulo de ataque | CL vs AOA: ala limpia, con flaps (CLmax mayor, ángulo crítico menor) y con slats (CLmax y ángulo crítico mayores); marcar CLmax y ángulo crítico |
| IMG-05 | S05 | Curva de resistencia | Resistencia parásita, inducida y total vs velocidad; mínimo de la total = L/Dmax; zona sombreada del régimen de mando invertido |
| IMG-06 | S06 | Bank angle / load factor | Vector de sustentación inclinado con componentes; gráfica de n vs alabeo con 30°, 45° y 60° marcados (1,15 · 1,41 · 2,0) |
| IMG-07 | S07 | Superficies de control de un avión de transporte | Planta de jet de ala en flecha: alerones interiores y exteriores, spoilers de vuelo y de tierra, flaps, slats, estabilizador horizontal compensable, elevador, estabilizador vertical, timón |
| IMG-08 | S08 | CG y estabilidad longitudinal | Peso en CG, sustentación en CP, fuerza de cola hacia abajo, brazos de momento; comparación CG adelantado vs atrasado |
| IMG-09 | S09 | Efecto suelo y Dutch Roll | Comparación visual: menor downwash y resistencia inducida cerca de la pista frente a la oscilación acoplada de alabeo y guiñada |
| IMG-10 | S10 | Onda de choque y ala en flecha | (1) Perfil transónico: zona supersónica, onda de choque normal, separación. (2) Ala en flecha con descomposición de la velocidad (normal al borde de ataque y a lo largo de la envergadura) |
| IMG-11 | S11 | Coffin Corner / margen de velocidad a gran altitud | Altitud vs Mach: línea de low-speed buffet, línea de MMO/high-speed buffet y curva punteada a 1,3 G; convergencia en el techo aerodinámico |
| IMG-12 | S12 | High, hot y heavy | Cadena causal: menor densidad y mayor sustentación requerida; misma IAS con mayor TAS y GS, más pista y menos ascenso |
| IMG-13 | S01 | Actitud, trayectoria y viento relativo | Dos actitudes distintas comparadas con su trayectoria y con el viento relativo siempre opuesto al movimiento |
| IMG-14 | S02 | Pitch, empuje y energía | Intercambio entre velocidad y altura, con el empuje como aporte externo de energía |
| IMG-15 | S03 | Variables de la sustentación | Ecuación de sustentación explicada mediante densidad, velocidad, superficie y coeficiente de sustentación |
| IMG-16 | S04 | Recuperación de la pérdida | Secuencia priorizada: reducir ángulo de ataque, nivelar alas, gestionar empuje y configuración según procedimiento |
| IMG-17 | S05 | Planeo y L/D | L/Dmax, efecto del peso sobre la velocidad de planeo y efecto del viento sobre la distancia en tierra |
| IMG-18 | S06 | Va, peso y turbulencia | Escalamiento de Va con el peso y diferencia entre Va y la velocidad de turbulencia publicada |
| IMG-19 | S07 | Configuración del ala | Comparación visual de ala limpia, despegue, aterrizaje y spoilers |
| IMG-20 | S08 | Estabilidad estática y dinámica | Tendencia inicial positiva, neutra o negativa y respuesta dinámica amortiguada, constante o divergente |
| IMG-21 | S09 | Dutch Roll e inestabilidad espiral | Oscilación acoplada frente a alabeo progresivo y descenso en espiral |
| IMG-22 | S10 | Ala en flecha y Mach crítico | Componente normal del flujo, retraso del Mach crítico y compromisos a baja velocidad |
| IMG-23 | S11 | Recuperación a gran altitud | Prioridades para recuperar energía sin perseguir inicialmente la altitud |
| IMG-24 | S12 | IAS, CAS, EAS, TAS y GS | Cadena de correcciones desde la indicación hasta la velocidad sobre el suelo |

---

# ANEXO B · FUENTES

**Documentos base**
- FAA-H-8083-25A, *Pilot's Handbook of Aeronautical Knowledge* (2008), versión en español del archivo de referencia. Capítulos 3 (Principios del vuelo) y 4 (Aerodinámica del vuelo, incluido Vuelo a alta velocidad).
- FAA-H-8083-25C, *Pilot's Handbook of Aeronautical Knowledge*, capítulos 4, 5, 6, 8, 10 y 11, y glosario. https://www.faa.gov/aviation/phak
- FAA-H-8083-3C, *Airplane Flying Handbook*, capítulos 5 (Maniobras de vuelo lento y pérdidas), 10 y 16 (Transición a aviones de reacción). https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/airplane_handbook

**Circulares y reglamentación**
- FAA AC 120-109A, *Stall Prevention and Recovery Training* (2015) y CHG 1 (2017). https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_120-109A.pdf
- FAA AC 61-107B CHG 1, *Aircraft Operations at Altitudes Above 25,000 Feet MSL and/or Mach Numbers (MMO) Greater Than .75* (definiciones, incluida "Q-Corner or Coffin Corner"). https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_61-107B_CHG_1_FAA.pdf
- FAA AC 61-107A (cancelada; referencia de los textos de Mach y buffet). https://www.govinfo.gov/content/pkg/GOVPUB-TD4-PURL-LPS107015/pdf/GOVPUB-TD4-PURL-LPS107015.pdf
- FAA AC 61-67C, *Stall and Spin Awareness Training*. https://www.faa.gov/documentlibrary/media/advisory_circular/ac_61-67c.pdf
- 14 CFR 1.1 (definiciones de IAS, CAS, EAS, TAS); 25.103; 25.105(d); 25.251; 25.335; 25.337; 25.345; 25.1517; 25.1583(a)(3); 25.1585. https://www.ecfr.gov/current/title-14
- EASA CS-25, AMC 25.251(e) (margen de 0,3 G antes del buffet). https://www.easa.europa.eu/en/document-library/easy-access-rules/easy-access-rules-large-aeroplanes-cs-25

**Seguridad operacional e investigación**
- *Airplane Upset Prevention and Recovery Training Aid* (AUPRTA), Rev. 3, secciones 6.4 y 6.5. https://www.icao.int/sites/default/files/safety/LOCI/AUPRTA/full.html
- BEA, *Final Report* AF447, 1 de junio de 2009. https://bea.aero/fileadmin/documents/docspa/2009/f-cp090601.en/pdf/f-cp090601.en.pdf
- NTSB AAR-04/04, American Airlines 587 (2001), y recomendaciones A-04-56 a A-04-62. https://www.ntsb.gov/investigations/AccidentReports/Reports/AAR0404.pdf
- Airbus, *Safety First*, "High Altitude Manual Flying" (2015). https://safetyfirst.airbus.com/high-altitude-manual-flying/
- Airbus, *Getting to Grips with Aircraft Performance* (altitud de cruce, altitud óptima). https://skybrary.aero/sites/default/files/bookshelf/2263.pdf
- SKYbrary: High Altitude Flight Operations; Wave Drag; Wing Sweep; Dutch Roll; Spoilers and Speedbrakes. https://skybrary.aero

**Aerodinámica general**
- NASA Glenn Research Center, *Beginner's Guide to Aeronautics*: What is Lift; Bernoulli and Newton; Lift Equation; Incorrect Lift Theory (Equal Transit). https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/
- NASA SP-468, *Quest for Performance* (flecha y Mach crítico). https://www.hq.nasa.gov/pao/History/SP-468/ch10-4.htm

---

# ANEXO C · REGISTRO DE REVISIÓN TÉCNICA

Revisión hecha desde cuatro perspectivas: instructor de vuelo, piloto de aerolínea, examinador de conocimientos y entrevistador técnico. Se contrastó cada punto crítico con las fuentes del Anexo B.

| Tema | Decisión aplicada en el contenido | Error común que se evitó |
|---|---|---|
| Sustentación | Distribución de presión + Newton + Bernoulli como descripciones del mismo fenómeno | "Tiempo de tránsito igual"; Bernoulli como explicación única |
| Stall | Definido por ángulo de ataque crítico; puede ocurrir a cualquier velocidad, actitud y potencia | "La pérdida es una velocidad" |
| Ángulo de ataque crítico | Constante para una configuración y ala limpia; lo cambian flaps, slats, contaminación y Mach | "El ángulo crítico es siempre el mismo" |
| Pitch vs AOA | Pitch ≈ AOA + trayectoria (alas niveladas) con ejemplos | "Nariz arriba = ascenso" |
| Fuerzas en ascenso | Sustentación ligeramente menor que el peso; sube el exceso de empuje | "En ascenso L > W" |
| Load factor | n = 1/cos φ; Vs × √n; 30° ≈ +7,5 % (no 7 %), 45° ≈ +19 %, 60° ≈ +41 % | Redondeos incorrectos |
| Va | Texto de 14 CFR 25.1583(a)(3); baja con el peso; VRA para turbulencia en transporte | "Por debajo de Va todo es seguro" (AA587) |
| Induced vs parasite | Inducida ∝ 1/V², parásita ∝ V² (capítulo del PHAK, no el glosario) | Relaciones lineales |
| Planeo | Peso no cambia la distancia a L/Dmax; cambia la velocidad | "Más pesado planea menos" |
| Flaps y slats | Flaps de borde de salida reducen el ángulo crítico; slats lo aumentan | "Los flaps aumentan el ángulo crítico" |
| CG | Tabla completa de efectos; certificación de pérdida con CG adelantado | — |
| Estabilidad | Estática vs dinámica; Dutch Roll vs espiral como compromiso de diseño | — |
| Mach crítico | Primer Mach 1 local (AFH/PHAK). Divergencia 5–10 % por encima | Definición de la AC 61-107B que mezcla umbral y efectos |
| Compresibilidad | Despreciable a bajo Mach; efectos visibles por encima del Mach crítico | — |
| Buffet | Low-speed buffet a gran altitud también es fenómeno de Mach; Mach alto reduce ángulo de pérdida y CLmax | "El buffet de baja velocidad es solo densidad" |
| Coffin Corner | Convergencia low-speed buffet ↔ MMO/Mach buffet (AFH, AC 61-107A/B) | Definirlo como pérdida ↔ Mach crítico |
| Q-Corner | Sinónimo de Coffin Corner (AC 61-107B); distinto de la altitud de cruce | "Q-Corner = intersección VMO/MMO"; etimología "q" sin fuente |
| Margen 1,3 G | Atribuido a EASA AMC 25.251(e) y fabricantes | Atribuirlo a 14 CFR 25 |
| Recuperación de pérdida | Plantilla AC 120-109A; se acepta pérdida de altitud; empuje según necesidad | "Empuje máximo primero, mínima pérdida de altitud" |
| Density altitude / IAS / TAS / GS | Definiciones de 14 CFR 1.1 y PHAK; regla de 2 % aplicada a CAS | Aplicar la regla a IAS como si fuera exacta |

**Revisión de UX aplicada al contenido**
- Extensión: 12 secciones de 10–15 minutos. Sin derivaciones matemáticas.
- Tarjetas DEBES RECORDAR / PUNTO CLAVE: una o dos por sección.
- Imágenes: una portada editorial fotográfica y dos figuras didácticas distintas en cada una de las 12 lecciones.
- Tablas diseñadas para apilarse en celular (dos o tres columnas; las de cuatro columnas deben permitir desplazamiento horizontal dentro de su propio contenedor).
- Esquemas tipográficos (Coffin Corner, curva de resistencia, High-Hot-Heavy) pensados para renderizarse como bloques visuales simples, no como imágenes.

**Verificado en la revisión independiente**
- AC 61-107B CHG 1, definición "Q-Corner or Coffin Corner" (¶1-4).
- EASA AMC 25.251(e): incremento de 0,3 G sin exceder el límite de buffet.
- Aritmética de factor de carga, velocidades de pérdida, ISA, altitudes de cruce (290 KIAS / M0,78 ≈ FL310; 306 KCAS / M0,82 ≈ FL310) y conversiones del PHAK.

**Correcciones aplicadas tras la revisión independiente**
- esc-02: el viento de cola constante no cambia el Mach; se reemplazó por cizalladura.
- Coffin Corner: la temperatura no mueve los límites de buffet; reduce empuje y altitud limitada por empuje.
- Resistencia inducida: "pesada y lenta" (la regla "pesado, limpio y lento" es de estela turbulenta).
- esc-06, esc-11 y ent-45: margen de maniobra y altitud de cruce del perfil vs VMO/MMO.
- Turbulencia: VRA y MRA (14 CFR 25.1517).
- Estabilidad longitudinal: punto neutro; ángulo crítico "a bajo Mach"; ala alta sin "efecto quilla".

**Pendiente de verificar por el autor antes de publicar**
- Revisar que las velocidades y márgenes usados como ejemplo no se confundan con valores de un tipo específico en entrevistas de una aerolínea concreta (A320, B737, E190, ATR).

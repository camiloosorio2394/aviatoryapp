---
workflow: faceless-explainer
flow: automation
storyboard: yes
message: "La actitud por sí sola no indica si el ala está volando"
destination: embed
aspect: 1920x1080
language: es
audience: "Pilotos que preparan el ingreso a una aerolínea en Latinoamérica"
length: 56s
angle: concept
style_preset: code-editorial
---

## Intent

El video de bienvenida que abre el módulo de Aerodinámica dentro de Aviatory. No es un
promo de la app ni un tutorial: es la puerta de entrada, y su único trabajo es que el
alumno sepa dónde se está metiendo y quiera empezar.

Es el cuarto de la serie, después de NOTAM, Meteorología y Mercancías peligrosas. No se
diseña de cero: se calca. Mismo preset, misma voz, mismo ritmo, mismos subtítulos, mismo
número de escenas, mismo cierre. Lo único que cambia es el acento (azul acero, el color
del módulo) y, claro, el contenido.

Tono **sobrio y documental**. Aviatory no es una app de gamificación: el lector de
lecciones imita un documento aeronáutico, y el video tiene que ser el mismo producto que
el alumno ve al cerrarlo. Nada de degradados llamativos, emojis ni tipografías redondeadas.

La espina narrativa: **abre con una tabla de tres ángulos que no dice nada y cierra con
la misma tabla diciéndolo todo.** Esa transformación es la promesa del módulo, y se
muestra en vez de decirse.

## El objeto que sostiene el video

La tabla de la Sección 4 que relaciona actitud de cabeceo, ángulo de trayectoria y ángulo
de ataque. Es el corazón del módulo —la Sección 4 es prioritaria— y es la idea que separa
a quien entiende la aerodinámica de quien la recita: **el ala responde al ángulo de
ataque, y ese ángulo no se lee en la actitud.**

**Es real y sale de la Sección 4 del módulo** (`docs/contenido/aerodinamica.md`, tabla de
«Ángulo de ataque y actitud de cabeceo»). Se usa completa y sin alterar, **incluido su pie**,
porque los valores son ilustrativos y el documento lo dice:

```
Situación                          Pitch   Trayectoria   AOA aproximado
---------------------------------  ------  ------------  ------------------
Ascenso normal                     +10°    +7°           3°
Aproximación estabilizada          +3°     –3°           6°
Nariz arriba, descendiendo fuerte  +15°    –25°          40° (en pérdida)

Valores ilustrativos para mostrar la relación, no de un tipo de avión específico.
```

Y la relación que la gobierna, también literal del documento:

```
PITCH  ≈  AOA  +  ÁNGULO DE TRAYECTORIA
```

**El giro del Frame 7**: la tercera fila. Nariz quince grados arriba, trayectoria veinticinco
grados abajo, ángulo de ataque de cuarenta grados. El avión está apuntando al cielo y
cayendo. La frase que lo cierra es literal de la Sección 4: *«La actitud por sí sola no
indica si el ala está volando.»*

## Customizations

- **Acento azul acero**, el color del módulo en la app: `#2C4764` (`--av-ae-700`, el mismo
  `--ln-primary` del lector) y `#E6F0FA` para la superficie clara. Apagado y corporativo.
  Voltaje escaso, nunca relleno.
- **8 escenas**, como NOTAM y Mercancías.
- **Tope duro de 60 segundos.** NOTAM son 58,9 y Mercancías 59.
- Voz **William Shanks** (HeyGen · Starfish), `001248bb63f847888d37b766ee8b3a47`, a 0.92.
  La misma de los tres anteriores: si cambia, los módulos dejan de sonar al mismo curso.
- Las siglas van escritas fonéticamente **solo en el guion de voz**: el motor no acepta
  idioma y las lee en inglés. El texto en pantalla no se toca. Este guion además evita las
  siglas deletreadas: en cincuenta segundos deletrear no enseña nada.

## Lo que el módulo enseña, y de ahí salen las promesas

12 secciones:

1. **Fundamentos, las cuatro fuerzas y la sustentación** (S1–S3): de dónde sale la
   sustentación y qué la equilibra en cada fase del vuelo.
2. **Ángulo de ataque, pérdida, resistencia y factor de carga** (S4–S6): por qué un ala
   entra en pérdida y por qué puede hacerlo a cualquier velocidad.
3. **Superficies de control, estabilidad y fenómenos operacionales** (S7–S9): qué mueve
   cada mando, dónde va el peso y qué se siente en vuelo.
4. **Alta velocidad, gran altitud y performance** (S10–S12): cómo se estrecha el margen
   hasta el Coffin Corner.

Práctica: 13 escenarios y 49 preguntas de entrevista. Evaluación: 40 preguntas, 20 por
intento, aprobación 80 %.

## Regla dura

**Nada inventado.** Ni cifras, ni ángulos, ni normas, ni accidentes. La tabla va completa
y con su pie de «valores ilustrativos»: presentarla sin ese pie sería atribuir esos
ángulos a un tipo de avión, que es justo lo que el documento evita. Cualquier cifra en
pantalla sale literal de `docs/contenido/aerodinamica.md`.

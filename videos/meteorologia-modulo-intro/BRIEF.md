---
workflow: faceless-explainer
flow: automation
storyboard: yes
message: "Al terminar el módulo, un pronóstico no se lee entero: se busca tu ventana"
destination: embed
aspect: 1920x1080
language: es
audience: "Pilotos que preparan el ingreso a una aerolínea en Latinoamérica"
length: 57s
angle: concept
---

## Intent

El video de bienvenida que abre el módulo de Meteorología dentro de Aviatory. Es el
gemelo de `videos/notam-modulo-intro`: mismo producto, mismo preset, misma voz, mismo
montaje, y solo cambia el módulo. No es un promo de la app ni un tutorial: es la puerta
de entrada, y su único trabajo es que el alumno sepa dónde se está metiendo y quiera
empezar.

Tono **sobrio y documental**. Aviatory no es una app de gamificación: el lector de
lecciones imita un documento aeronáutico, y el video tiene que ser el mismo producto
que el alumno ve al cerrarlo. Nada de degradados llamativos, emojis ni tipografías
redondeadas.

La espina narrativa: **abre con un pronóstico ilegible y cierra con el mismo pronóstico
situado en el tiempo.** Esa transformación es la promesa del módulo y se muestra en vez
de decirse.

Donde el módulo de NOTAM prometía «esto lo lees de corrido», este promete lo contrario,
y a propósito: un TAF **no** se lee de corrido. Se lee buscando la hora a la que te toca
aterrizar. Ese es el giro del video y es la frase de cierre de la lección 29 del módulo.

## Customizations

- **Guion de locución en `user_script.txt`.** VO_MODE: reestructurar por escena si hace
  falta para el ritmo, pero conservar las frases ancla, sobre todo el cierre
  «Al terminar, no lees el pronóstico entero: buscas tu ventana».
- **Voz en español latinoamericano**, tono de instructor, no de anuncio. La misma voz y
  la misma velocidad que el video de NOTAM: si cambia, los dos módulos dejan de sonar
  al mismo curso.
- **Subtítulos incrustados en español**: el alumno ve el curso en cualquier parte y
  muchas veces sin sonido.
- **Nada inventado.** El pronóstico que aparece en pantalla sale completo y sin alterar
  de la lección 29 del módulo (`src/lib/metarLesson.ts`), y va **rotulado en pantalla
  como escenario de práctica**, que es exactamente cómo lo rotula la lección. Ninguna
  cifra, ningún aeródromo y ningún fenómeno se añade ni se retoca.

  > Por qué rotulado y no real: el módulo entero se apoya en no presentar como real lo
  > que no lo es, y **no hay ningún METAR ni TAF real en el material**. Los ejemplos
  > están redactados para el curso, el indicativo `SKXX` es deliberadamente falso y la
  > propia lección lo dice con un callout. Poner un TAF real exigiría una fuente
  > verificable que el módulo no tiene, así que el video usa el del módulo y lo rotula.
  > El BRIEF del video de NOTAM admite las dos vías: «real **o estar rotulado como
  > ejemplo**».

## Notes

Marca de Aviatory, tomada de `src/index.css` de la app. El acento ya no es el azul
carta del NOTAM sino el **turquesa petróleo** del módulo de Meteorología, que en la app
son los tokens `--av-mt-*` (matiz 205) y su conversión a hex en `.lector-notam.lector-mt`:

| | |
|---|---|
| Navy (fondo, superficie de código) | `#14202E` |
| Turquesa petróleo (acento del módulo) | `#0D4B52` |
| Turquesa claro (acento sobre navy) | `#49939C` |
| Papel | `#FBFAF8` |
| Tinta | `#16191D` |
| Titulares | **Archivo** |
| Rótulos | Mono, mayúsculas, `letter-spacing 0.16em` |

El `#0D4B52` es el acento sobre papel. Sobre navy no llega a contraste, así que ahí se
usa el `#49939C`, que es el mismo matiz del token subido de luminosidad (es el
`--ln-focus` de la app, no un color nuevo).

Lo que el alumno va a aprender, agrupado en cuatro promesas desde las treinta lecciones
reales del módulo (`src/lib/meteorologiaLeccion/*.ts` + `src/lib/metarLesson.ts`):

1. La atmósfera y el aire en movimiento: presión, altímetro, viento, cizalladura (1 a 5)
2. El agua en el aire: estabilidad, punto de rocío, nubes, niebla (6 a 9)
3. Masas de aire, frentes y tormentas (10 a 12)
4. Los servicios y el código: de dónde sale el dato, los avisos, METAR y TAF (13 a 30)

Cierre con la promesa concreta del módulo: **treinta lecciones, práctica y evaluación.**

Salida final: copiar el MP4 comprimido a `public/modulos/meteorologia/intro.mp4` de la
app, y el póster a `public/modulos/meteorologia/intro-poster.jpg`. El hueco ya está
reservado en el hero de `src/pages/Metar.tsx`.

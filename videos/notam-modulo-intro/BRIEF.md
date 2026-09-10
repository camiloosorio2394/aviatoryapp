---
workflow: faceless-explainer
flow: automation
storyboard: yes
message: "Al terminar el módulo, ese NOTAM lo lees de corrido"
destination: embed
aspect: 1920x1080
language: es
audience: "Pilotos que preparan el ingreso a una aerolínea en Latinoamérica"
length: 45s
angle: concept
---

## Intent

El video de bienvenida que abre el módulo de NOTAM dentro de Aviatory. No es un
promo de la app ni un tutorial: es la puerta de entrada, y su único trabajo es que
el alumno sepa dónde se está metiendo y quiera empezar.

Tono **sobrio y documental**. Aviatory no es una app de gamificación: el lector de
lecciones imita un documento aeronáutico, y el video tiene que ser el mismo producto
que el alumno ve al cerrarlo. Nada de degradados llamativos, emojis ni tipografías
redondeadas.

La espina narrativa: **abre con un NOTAM ilegible y cierra con el mismo NOTAM
entendido.** Esa transformación es la promesa del módulo, y se muestra en vez de
decirse.

## Customizations

- **Guion de locución ya escrito y aprobado**, en `user_script.txt`. VO_MODE: reestructurar
  por escena si hace falta para el ritmo, pero conservar las frases ancla, sobre todo
  el cierre «Al terminar, esto lo lees de corrido».
- **Voz en español latinoamericano**, tono de instructor, no de anuncio.
- **Subtítulos incrustados en español**: el alumno ve el curso en cualquier parte y
  muchas veces sin sonido.
- **El NOTAM que aparezca en pantalla debe ser real o estar rotulado como ejemplo.**
  El módulo entero se apoya en no presentar como real lo que no lo es; el video no
  puede romper esa regla.

## Notes

Marca de Aviatory, tomada de `src/index.css` de la app:

| | |
|---|---|
| Navy (fondo, barra del índice) | `#14202E` |
| Azul carta (acento del módulo NOTAM) | `#123A6B` |
| Papel | `#FBFAF8` |
| Tinta | `#16191D` |
| Titulares | **Archivo** (700/800) |
| Rótulos | Mono, mayúsculas, `letter-spacing 0.16em` |

Lo que el alumno va a aprender, agrupado en cuatro promesas desde las nueve
lecciones reales del módulo (`src/lib/notamLesson.ts`):

1. Qué es un NOTAM y quién lo publica (lecciones 1 y 2)
2. Los tipos: NOTAMN, NOTAMR y NOTAMC (lección 3)
3. Cómo se lee entero: la línea Q y los ítems A) a G) (lecciones 4, 5 y 6)
4. La casilla E), la fraseología abreviada y la interpretación (lecciones 7 y 8)

Cierre con la promesa concreta del módulo: **nueve lecciones, práctica y evaluación.**

Salida final: copiar el MP4 a `public/modulos/notam/intro.mp4` de la app.

El brief largo, con la tabla de beats segundo a segundo, está en
`docs/VIDEO-NOTAM-INTRO.md` del repo de la app.

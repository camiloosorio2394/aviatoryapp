# Video de apertura · Módulo NOTAM

Brief listo para ejecutar. En una sesión nueva, pegar la instrucción de la sección final.

---

## Qué es

El video de bienvenida que abre el módulo de NOTAM. **Máximo 45 segundos.**
No es un promo de la app ni un tutorial: es la puerta de entrada al módulo, y su único
trabajo es que el alumno sepa dónde se está metiendo y quiera empezar.

## Marca

Lo que sale en pantalla tiene que ser el mismo Aviatory que el alumno verá al cerrar el video.

| | |
|---|---|
| Navy (fondo, barra del índice) | `#14202E` |
| Azul carta (acento del módulo NOTAM) | `#123A6B` |
| Papel | `#FBFAF8` |
| Tinta | `#16191D` |
| Titulares | **Archivo** (700/800), la que ya carga la app |
| Rótulos | Mono, mayúsculas, `letter-spacing 0.16em` |

Sobrio y documental. Aviatory no es una app de gamificación: el lector imita un documento
aeronáutico. Nada de degradados llamativos, emojis ni tipografías redondeadas.

## Lo que el alumno va a aprender

Las nueve lecciones reales del módulo (`src/lib/notamLesson.ts`), agrupadas en cuatro
promesas para el video:

1. **Qué es un NOTAM y quién lo publica** (lecciones 1 y 2)
2. **Los tipos: NOTAMN, NOTAMR y NOTAMC** (lección 3)
3. **Cómo se lee entero: la línea Q y los ítems A) a G)** (lecciones 4, 5 y 6)
4. **La casilla E), la fraseología abreviada y la interpretación** (lecciones 7 y 8)

## Estructura de los 45 segundos

| Tiempo | Beat | Contenido |
|---|---|---|
| 0:00 – 0:04 | Entrada | Logo Aviatory sobre navy. Rótulo: `INGRESO A AEROLÍNEA · MÓDULO`. |
| 0:04 – 0:11 | Bienvenida | «Bienvenido al módulo de NOTAM de Aviatory.» Un NOTAM real aparece en pantalla, ilegible a propósito: es el problema. |
| 0:11 – 0:34 | Qué aprenderás | Las cuatro promesas, una por beat de ~6 s. Cada una con su visual: el NOTAM se va descomponiendo y resaltando por partes. |
| 0:34 – 0:41 | El giro | El mismo NOTAM del principio, ahora legible y anotado. «Al terminar, esto lo lees de corrido.» |
| 0:41 – 0:45 | Cierre | Logo y `9 lecciones · práctica · evaluación`. |

La idea que sostiene el video: **abre con un NOTAM incomprensible y cierra con el mismo NOTAM
entendido.** Esa transformación es la promesa del módulo, y se puede mostrar sin decirla.

## Guion de locución

Cabe en 45 s a ritmo natural. Español neutro latinoamericano, tono de instructor, no de anuncio.

> Bienvenido al módulo de NOTAM de Aviatory.
>
> Esto que ves aquí decide si tu vuelo sale, por dónde entra y qué te vas a encontrar al
> aterrizar. Y está escrito en un código que nadie te enseñó a leer.
>
> Aquí vas a aprender qué es un NOTAM y quién lo publica. Vas a distinguir un NOTAMN de un
> NOTAMR y de un NOTAMC. Vas a leer la línea Q pieza por pieza, y los ítems A) a G), uno por uno.
> Y vas a descifrar la casilla E) con toda su fraseología abreviada.
>
> Al terminar, esto lo lees de corrido.
>
> Nueve lecciones, práctica y evaluación. Empecemos.

## Restricciones

- **Máximo 45 segundos.** Si el guion no cabe, se recorta el guion, no se acelera la locución.
- **El NOTAM que aparezca debe ser real o claramente de ejemplo.** Si es inventado, rotularlo
  como ejemplo: el módulo entero se apoya en no presentar como real lo que no lo es.
- Subtítulos incrustados: se ve en cualquier parte y muchas veces sin sonido.
- Formato 16:9, 1920×1080, MP4. Salida en `public/modulos/notam/intro.mp4`.

---

## Instrucción para pegar en una sesión nueva

```
Crea el video de apertura del módulo NOTAM de Aviatory.

Lee primero docs/VIDEO-NOTAM-INTRO.md: ahí está el brief completo con la marca,
la estructura de los 45 segundos y el guion de locución.

Usa la skill hyperframes como entrada (es el punto de entrada obligatorio); el
workflow que corresponde es faceless-explainer, porque no hay footage y los
visuales se inventan por escena.

Restricciones que no se negocian:
- Máximo 45 segundos.
- Navy #14202E, azul carta #123A6B, papel #FBFAF8, tinta #16191D, titulares en Archivo.
- Sobrio y documental, no promocional.
- Subtítulos incrustados en español.
- Salida 16:9 1920x1080 en public/modulos/notam/intro.mp4

La idea que sostiene el video: abre con un NOTAM ilegible y cierra con el mismo
NOTAM entendido.

Cuando esté, muéstrame el preview antes de renderizar.
```

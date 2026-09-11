---
workflow: faceless-explainer
flow: automation
storyboard: yes
message: "El papel que firmas antes de salir es el último punto donde la cadena se puede parar"
destination: embed
aspect: 1920x1080
language: es
audience: "Pilotos que preparan el ingreso a una aerolínea en Latinoamérica"
length: 55s
angle: concept
style_preset: code-editorial
---

## Intent

El video de bienvenida que abre el módulo de Mercancías peligrosas dentro de Aviatory.
No es un promo de la app ni un tutorial: es la puerta de entrada, y su único trabajo es
que el alumno sepa dónde se está metiendo y quiera empezar.

Es el segundo de la serie. El de NOTAM ya está hecho y desplegado, así que este no se
diseña de cero: se calca. Mismo preset, misma voz, mismo ritmo, mismos subtítulos, mismo
número de escenas. Lo único que cambia es el acento (mostaza en vez de azul carta) y,
claro, el contenido.

Tono **sobrio y documental**. Aviatory no es una app de gamificación: el lector de
lecciones imita un documento aeronáutico, y el video tiene que ser el mismo producto que
el alumno ve al cerrarlo. Nada de degradados llamativos, emojis ni tipografías redondeadas.

La espina narrativa: **abre con un NOTOC que no dice nada y cierra con el mismo NOTOC
diciéndolo todo.** Esa transformación es la promesa del módulo, y se muestra en vez de
decirse.

## El objeto que sostiene el video

El NOTOC es el papel que el comandante firma antes de cada salida con mercancías
peligrosas a bordo. Es el último eslabón de la cadena y el único que el piloto toca con
las manos. Por eso es el objeto persistente: entra ilegible en el Frame 2, se va durante
las promesas y vuelve idéntico en el Frame 7.

**Es real y sale de la lección 14 del módulo** (`src/lib/mercanciasLeccion/nivel4.ts`).
Se usa completo y sin alterar. Los identificadores están anonimizados en la fuente
(AV0000, 00MMM, HK-XXXX) porque es material de enseñanza, y así se dejan.

```
NOTIFICATION TO CAPTAIN          FLT AV0000 / 00MMM / HK-XXXX
STA: SKBO   DEST: SBGR   CPT: ______________________

POS  UN     PROPER SHIPPING NAME        CL  GE  PKG  ULD
---  -----  --------------------------  --  --  ---  ------------
1FL  1263   PAINT                       3   II   2   AKE 12345 AV
1FL  1830   SULPHURIC ACID              8   II   1   AKE 12345 AV
5AR  3480   LITHIUM ION BATTERIES       9   --   4   PMC 67890 AV
                                             CAO

DRILL CODE: 3L / 8L / 9FZ        EMERGENCY RESPONSE: DOC 9481
```

**El giro del Frame 7**: la pintura (clase 3, líquido inflamable) y el ácido sulfúrico
(clase 8, corrosivo) comparten el mismo ULD, `AKE 12345 AV`. Esa combinación la regula la
tabla de segregación, y preguntarlo antes de firmar es legítimo. Ese "algo te chirría"
sale literal de la lección 14, del bloque `piensaComoPiloto` que sigue al NOTOC.

## Customizations

- **Acento mostaza**, no el azul carta de NOTAM. `oklch(0.78 0.135 86)` para lo brillante
  sobre navy, `oklch(0.50 0.10 78)` para lo sólido. Apagado y corporativo: es el color del
  módulo, no un amarillo de alerta. Voltaje escaso, nunca relleno.
- **8 escenas**, como NOTAM.
- **Tope duro de 60 segundos.** El de NOTAM son 58,9.
- Voz **William Shanks** (HeyGen · Starfish), `001248bb63f847888d37b766ee8b3a47`, a 0.92.
- Las letras y siglas van escritas fonéticamente **solo en el guion de voz**: el motor no
  acepta idioma y las lee en inglés. El texto en pantalla no se toca.

## Lo que el módulo enseña, y de ahí salen las promesas

18 lecciones en 5 niveles:

1. **Introducción**: por qué existe la norma. La fundó el vuelo ValuJet 592.
2. **Identificación**: las nueve clases, las etiquetas y los grupos de embalaje.
3. **Transporte aéreo**: qué puede volar, qué no y en qué aeronave.
4. **Situaciones del piloto**: el NOTOC, la emergencia en vuelo y a quién se notifica.
5. **Casos reales y repaso.**

## Regla dura

**Nada inventado.** Ni identificadores, ni cifras, ni artículos, ni accidentes. En el video
de NOTAM dos escenas se inventaron el aviso porque su paquete solo llevaba fragmentos, y
hubo que rehacerlas enteras. El paquete de cada worker lleva el NOTOC **completo**, las
once líneas, no trozos.

/**
 * La geometría del isotipo de Aviatory, en un lienzo de 120 × 120.
 *
 * Es la fuente única: de aquí salen el componente `Isotipo`, el logotipo
 * horizontal y, con `node scripts/marca/generar.mjs`, los SVG de
 * `src/assets/logos` y los íconos PNG de `public` (favicon, instalación).
 *
 * La «A» es de contraste, como la Playfair Display del nombre: la pierna de la
 * izquierda fina, la de la derecha gruesa, el ápice plano y sin travesaño. El
 * travesaño es la estela, que cruza la letra de abajo a la izquierda hacia
 * arriba a la derecha, se afina en las puntas y termina en el avión. Donde la
 * estela pasa por encima de la letra, la letra se corta: sin ese hueco las
 * dos formas se funden en una mancha a tamaño de favicon.
 *
 * Sin fuentes ni texto: así se ve igual en un favicon de 16 px que en el
 * encabezado de la barra.
 */

/** La paleta de la marca. */
export const MARCA = {
  /** El navy principal: la letra, el nombre, el fondo del ícono. */
  navy: "#0B1E3A",
  /** El azul de acento: lo activo, lo que se señala. */
  acento: "#3A6EA5",
  /** La niebla: fondos suaves y filetes. */
  niebla: "#D9E1EA",
} as const

export const LIENZO = 120

/** Las dos piernas de la «A», que se juntan en el ápice. */
export const PIERNA_GRUESA = "M53 10 L68.5 10 L100 108 L80.5 108 Z"
export const PIERNA_FINA = "M53 10 L55.9 20.2 L24.5 108 L18 108 Z"

/** El eje de la estela: por aquí pasa el corte de la letra. */
export const ESTELA_EJE = "M4 103 C40 88 74 64 101 42"
/** La estela con grosor: más gruesa en el medio, afilada en las puntas. */
export const ESTELA = "M4 103 C40 86.2 74 61.8 101 42 C74 65.9 40 89.6 4 103 Z"
/** Ancho del corte que la estela abre en la letra. */
export const ESTELA_HUECO = 8.5

/** El avión de perfil cenital, con la nariz hacia +x y centrado en el origen. */
export const AVION =
  "M7 0 C7 -0.9 6 -1.3 4.6 -1.3 L-5.4 -1.1 C-6.9 -1.1 -7.5 -0.6 -7.5 0 C-7.5 0.6 -6.9 1.1 -5.4 1.1 L4.6 1.3 C6 1.3 7 0.9 7 0 Z " +
  "M2.4 -1.2 L-2.6 -8 L-4.6 -8 L-1.6 -1.2 Z M2.4 1.2 L-2.6 8 L-4.6 8 L-1.6 1.2 Z " +
  "M-4.9 -1 L-6.9 -3.9 L-8 -3.9 L-6.8 -1 Z M-4.9 1 L-6.9 3.9 L-8 3.9 L-6.8 1 Z"
/** Dónde va el avión: al final de la estela, en la dirección en que sube. */
export const AVION_EN = "translate(107.5 37.4) rotate(-37) scale(0.95)"

/**
 * El isotipo como marcado SVG (sin la etiqueta `<svg>`), para los archivos que
 * se generan. `id` distingue la máscara si hay varios en el mismo documento.
 */
export function isotipoSvg(color: string, id = "av-iso"): string {
  return (
    `<defs><mask id="${id}-corte" maskUnits="userSpaceOnUse" x="0" y="0" width="${LIENZO}" height="${LIENZO}">` +
    `<rect width="${LIENZO}" height="${LIENZO}" fill="#fff"/>` +
    `<path d="${ESTELA_EJE}" fill="none" stroke="#000" stroke-width="${ESTELA_HUECO}" stroke-linecap="round"/>` +
    `</mask></defs>` +
    `<g fill="${color}">` +
    `<g mask="url(#${id}-corte)"><path d="${PIERNA_GRUESA}"/><path d="${PIERNA_FINA}"/></g>` +
    `<path d="${ESTELA}"/>` +
    `<path d="${AVION}" transform="${AVION_EN}"/>` +
    `</g>`
  )
}

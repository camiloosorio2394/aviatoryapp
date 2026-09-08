/**
 * La paleta de la línea Q, una por componente.
 *
 * Vive aparte porque la usan dos piezas que no se importan entre sí: la
 * infografía de la sección 5 (que va con `lazy`, fuera del bundle principal)
 * y el mapa de la línea que la lección pinta después. Si cada una llevara su
 * copia, tarde o temprano un color cambiaría en una y no en la otra, y el
 * color es justamente lo que ata el token con su explicación.
 *
 * Navy, azul aeronáutico, violeta sobrio, ámbar, cyan, verde azulado y
 * pizarra. Ninguno al máximo de saturación y ningún rojo: en esta app el rojo
 * queda para lo que restringe o alerta, y ninguno de los siete campos lo hace
 * por sí mismo.
 */
export const LINEA_Q_COLOR = {
  fir: "#1E3A5F",
  codigo: "#2E6FB7",
  transito: "#6B5AA6",
  objetivo: "#A8762A",
  alcance: "#227D93",
  limites: "#3D7A63",
  area: "#5A6B80",
} as const

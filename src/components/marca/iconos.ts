/**
 * Los íconos de la app, recortados de la hoja que diseñó Camilo (25-sep-2026) con
 * `node scripts/marca/recortar-iconos.mjs <ICONOS.png>`. Navy y dorado, con volumen:
 * reemplazan a los de línea en la barra y en la portada. Los pinta `IconoMarca`.
 */
import biblioteca from "@/assets/iconos/biblioteca.webp"
import comunidad from "@/assets/iconos/comunidad.webp"
import documentacion from "@/assets/iconos/documentacion.webp"
import elegibilidad from "@/assets/iconos/elegibilidad.webp"
import examenPca from "@/assets/iconos/examen-pca.webp"
import horas from "@/assets/iconos/horas.webp"
import inglesIcao from "@/assets/iconos/ingles-icao.webp"
import ingresoAerolinea from "@/assets/iconos/ingreso-aerolinea.webp"
import logbook from "@/assets/iconos/logbook.webp"
import materias from "@/assets/iconos/materias.webp"
import miPerfil from "@/assets/iconos/mi-perfil.webp"
import miRuta from "@/assets/iconos/mi-ruta.webp"
import navegacion from "@/assets/iconos/navegacion.webp"
import perfilAerolineas from "@/assets/iconos/perfil-aerolineas.webp"
import preparacion from "@/assets/iconos/preparacion.webp"
import procedimientos from "@/assets/iconos/procedimientos.webp"
import requisitos from "@/assets/iconos/requisitos.webp"
import vencimientos from "@/assets/iconos/vencimientos.webp"

export const ICONOS = {
  "biblioteca": biblioteca,
  "comunidad": comunidad,
  "documentacion": documentacion,
  "elegibilidad": elegibilidad,
  "examen-pca": examenPca,
  "horas": horas,
  "ingles-icao": inglesIcao,
  "ingreso-aerolinea": ingresoAerolinea,
  "logbook": logbook,
  "materias": materias,
  "mi-perfil": miPerfil,
  "mi-ruta": miRuta,
  "navegacion": navegacion,
  "perfil-aerolineas": perfilAerolineas,
  "preparacion": preparacion,
  "procedimientos": procedimientos,
  "requisitos": requisitos,
  "vencimientos": vencimientos,
} as const

export type NombreIcono = keyof typeof ICONOS

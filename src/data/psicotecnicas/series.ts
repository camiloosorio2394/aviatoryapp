import type { EjercicioPsico } from "@/lib/psicotecnicas"

/**
 * Series numéricas — 162 ejercicios.
 *
 * ARCHIVO GENERADO. No se edita a mano: sale de
 * `node scripts/psicotecnicas/generar-series.mjs <carpeta-con-los-pdf>`.
 *
 * Fuente: «Psicotécnicos — Razonamiento numérico» (documento 336461140), que
 * trae los enunciados y su sección de soluciones. La respuesta y el desglose de
 * cada serie son los del documento; las cuatro alternativas se generan, porque
 * el original es de completar el número y no ofrece ninguna.
 */
export const SERIES: EjercicioPsico[] = [
  {
    "id": "NU-N2-01-01",
    "subcategoria": "Sucesiones aritméticas",
    "nivel": "basico",
    "enunciado": "Complete la serie: 50, 52, 54, 56, 58, 60, 62, …",
    "opciones": [
      "66",
      "64",
      "65",
      "60"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 64. El documento lo desglosa así: Se observa que es una serie creciente, se va sumando 2 a cada número. 50 (+2) 52 (+2) 54 (+2) 56 (+2) 58 (+2) 60 (+2) 62 (+2).",
    "tiempo": 45,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 1.1",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-01-02",
    "subcategoria": "Sucesiones aritméticas",
    "nivel": "basico",
    "enunciado": "Complete la serie: 1, 3, 5, 7, 9, 11, 13, 15, 17, …",
    "opciones": [
      "21",
      "15",
      "19",
      "20"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 19. El documento lo desglosa así: 1 (+2) 3 (+2) 5 (+2) 7 (+2) 9 (+2) 11 (+2) 13 (+2) 15 (+2) 17 (+2).",
    "tiempo": 45,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 1.2",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-01-03",
    "subcategoria": "Sucesiones aritméticas",
    "nivel": "basico",
    "enunciado": "Complete la serie: 1, 4, 7, 10, 13, 16, 19, 22, …",
    "opciones": [
      "28",
      "19",
      "26",
      "25"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 25. El documento lo desglosa así: 1 (+3) 4 (+3) 7 (+3) 10 (+3) 13 (+3) 16 (+3) 19 (+3) 22 (+3).",
    "tiempo": 45,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 1.3",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-01-04",
    "subcategoria": "Sucesiones aritméticas",
    "nivel": "basico",
    "enunciado": "Complete la serie: 6, 11, 16, 21, 26, 31, 36, …",
    "opciones": [
      "31",
      "41",
      "42",
      "46"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 41. El documento lo desglosa así: 6 (+5) 11 (+5) 16 (+5) 21 (+5) 26 (+5) 31 (+5) 36 (+5).",
    "tiempo": 45,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 1.4",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-01-05",
    "subcategoria": "Sucesiones aritméticas",
    "nivel": "basico",
    "enunciado": "Complete la serie: 5, 9, 13, 17, 21, 25, 29, …",
    "opciones": [
      "37",
      "34",
      "33",
      "25"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 33. El documento lo desglosa así: 5 (+4) 9 (+4) 13 (+4) 17 (+4) 21 (+4) 25 (+4) 29 (+4).",
    "tiempo": 45,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 1.5",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-01-06",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 32, 29, 26, 23, 21, 18, 15, 12, 10, …",
    "opciones": [
      "8",
      "4",
      "7",
      "13"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 7. El documento lo desglosa así: (-3) 29 (-3) 26 (-3) 23 (-2) 21 (-3) 18 (-3) 15 (-3) 12 (-2) 10 (-3).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 1.6",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-01-07",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 20, 24, 21, 25, 22, 26, 23, 27, 24, 28, 25, …",
    "opciones": [
      "33",
      "21",
      "22",
      "29"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 29. El documento lo desglosa así: (+4) 24 (-3) 21 (+4) 25 (-3) 22 (+4) 26 (-3) 23 (+4) 27 (-3) 24 (+4) 28 (-3) 25 (+4).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 1.7",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-01-08",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 100, 96, 102, 98, 104, 100, 106, …",
    "opciones": [
      "110",
      "98",
      "102",
      "112"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 102. El documento lo desglosa así: (-4) 96 (+6) 102 (-4) 98 (+6) 104 (-4) 100 (+6) 106 (-4).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 1.8",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-01-09",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 3, 6, 4, 8, 6, 12, 10, 20, …",
    "opciones": [
      "30",
      "18",
      "22",
      "16"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 18. El documento lo desglosa así: (x2) 6 (-2) 4 (x2) 8 (-2) 6 (x2) 12 (-2) 10 (x2) 20 (- 2).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 1.9",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-01-10",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 1, 12, 23, 18, 29, 40, 35, 46, …",
    "opciones": [
      "68",
      "35",
      "57",
      "58"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 57. El documento lo desglosa así: 1 (+11) 12 (+11) 23 (-5) 18 (+11) 29 (+11) 40 (-5) 35 (+11) 46 (+11).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 1.10",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-01-11",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 1, 3, 9, 27, 81, 243, …",
    "opciones": [
      "1215",
      "-243",
      "405",
      "729"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 729. El documento lo desglosa así: 1 (x3) 3 (x3) 9 (x3) 27 (x3) 81 (x3) 243 (x3).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 1.11",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-01-12",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 3, 3, 9, 4, 4, 16, 5, 5, 25, 6, 6, …",
    "opciones": [
      "66",
      "36",
      "-24",
      "6"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 36. El documento lo desglosa así: 3 (x) 3 (=) 9 // 4 (x) 4 (=) 16 // 5 (x) 5 (=) 25 // 6 (x) 6 (=).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 1.12",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-01-14",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 1, 2, 4, 8, 16, 32, …",
    "opciones": [
      "96",
      "48",
      "64",
      "0"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 64. El documento lo desglosa así: 1 (x2) 2 (x2) 4 (x2) 8 (x2) 16 (x2) 32 (x2).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 1.14",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-01-15",
    "subcategoria": "Sucesiones aritméticas",
    "nivel": "basico",
    "enunciado": "Complete la serie: 1, 1, 2, 3, 5, 8, 13, 21, …",
    "opciones": [
      "47",
      "8",
      "29",
      "34"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 34. El documento lo desglosa así: 1 (+) 1 (+) 2 (+) 3 (+) 5 (+) 8 (+) 13 (+) 21.",
    "tiempo": 45,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 1.15",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-01-16",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 3, 7, 15, 31, 63, …",
    "opciones": [
      "191",
      "127",
      "-1",
      "95"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 127. El documento lo desglosa así: 3 (x2 +1) 7 (x2 +1) 15 (x2 +1) 31 (x2 +1) 63 (x2 +1).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 1.16",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-01-17",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 2, 3, 5, 9, 17, 33, …",
    "opciones": [
      "1",
      "65",
      "49",
      "97"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 65. El documento lo desglosa así: 2 (x2 -1) 3 (x2 -1) 5 (x2 -1) 9 (x2 -1) 17 (x2 -1) 33 (x2 -1).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 1.17",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-01-18",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 1, 1, 2, 2, 2, 6, 6, 6, 18, 18, 18, …",
    "opciones": [
      "18",
      "54",
      "90",
      "-18"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 54. El documento lo desglosa así: 1 (+) 1 (=) 2 (+) 2 (+) 2 (=) 6 (+) 6 (+) 6 (=) 18 (+) 18 (+) 18 (=).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 1.18",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-01-19",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 100, 95, 89, 82, 74, 65, …",
    "opciones": [
      "45",
      "75",
      "56",
      "55"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 55. El documento lo desglosa así: 100 (-5) 95 (-6) 89 (-7) 82 (-8) 74 (-9) 65 (-10).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 1.19",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-01-20",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 2, 8, 3, 12, 7, 28, …",
    "opciones": [
      "33",
      "23",
      "18",
      "49"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 23. El documento lo desglosa así: 2 (x4) 8 (-5) 3 (x4) 12 (-5) 7 (x4) 28 (-5).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 1.20",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-02-01",
    "subcategoria": "Sucesiones aritméticas",
    "nivel": "basico",
    "enunciado": "Complete la serie: 52, 51, 50, 49, 48, 47, 46, 45, …",
    "opciones": [
      "45",
      "44",
      "43",
      "46"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 44. El documento lo desglosa así: 52 (-1) 51 (-1) 50 (-1) 49 (-1) 48 (-1) 47 (-1) 46 (-1) 45 (-1).",
    "tiempo": 45,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 2.1",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-02-02",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 30, 30, 29, 29, 30, 30, 29, 29, …",
    "opciones": [
      "31",
      "30",
      "29",
      "28"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 30. El documento lo desglosa así: 30 (=) 30 (-1) 29 (=) 29 (+1) 30 (=) 30 (-1) 29 (=) 29 (+1).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 2.2",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-02-03",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 2, 2, 4, 4, 6, 6, 8, 8, …",
    "opciones": [
      "8",
      "6",
      "12",
      "10"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 10. El documento lo desglosa así: 2 (=) 2 (+2) 4 (=) 4 (+2) 6 (=) 6 (+2) 8 (=) 8 (+2).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 2.3",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-02-04",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 12, 6, 11, 6, 10, 6, 9, 6, …",
    "opciones": [
      "4",
      "8",
      "10",
      "3"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 8. El documento lo desglosa así: 12 6 11 6 10 6 9 6.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 2.4",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-02-05",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 1, 2, 4, 8, 16, 32, 64, 128, …",
    "opciones": [
      "192",
      "0",
      "256",
      "384"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 256. El documento lo desglosa así: 1 (x2) 2 (x2) 4 (x2) 8 (x2) 16 (x2) 32 (x2) 64 (x2) 128 (x2).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 2.5",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-02-06",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 22, 25, 23, 26, 24, 27, 25, 28, …",
    "opciones": [
      "31",
      "24",
      "26",
      "30"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 26. El documento lo desglosa así: 22 (+3) 25 (-2) 23 (+3) 26 (-2) 24 (+3) 27 (-2) 25 (+3) 28 (-2).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 2.6",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-02-07",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 11, 8, 10, 7, 9, 6, 8, 5, …",
    "opciones": [
      "2",
      "3",
      "9",
      "7"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 7. El documento lo desglosa así: 11 (-3) 8 (+2) 10 (-3) 7 (+2) 9 (-3) 6 (+2) 8 (-3) 5 (+2).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 2.7",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-02-08",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 3, 4, 7, 12, 19, 28, 39, 52, …",
    "opciones": [
      "82",
      "67",
      "37",
      "65"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 67. El documento lo desglosa así: 3 (+1) 4 (+3) 7 (+5) 12 (+7) 19 (+9) 28 (+11) 39 (+13) 52 (+15).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 2.8",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-02-09",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 2, 9, 4, 18, 6, 36, 8, 72, …",
    "opciones": [
      "136",
      "134",
      "10",
      "-52"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 10. El documento lo desglosa así: 2 9 4 18 6 36 8 72.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 2.9",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-02-10",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 10, 22, 14, 26, 18, 30, 22, 34, …",
    "opciones": [
      "18",
      "26",
      "46",
      "42"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 26. El documento lo desglosa así: 10, 22, 14, 26, 18, 30, 22, 34.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 2.10",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-02-11",
    "subcategoria": "Sucesiones aritméticas",
    "nivel": "basico",
    "enunciado": "Complete la serie: 3, 5, 7, 9, 11, 13, 15, 17, …",
    "opciones": [
      "15",
      "20",
      "21",
      "19"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 19. El documento lo desglosa así: 3 (+2) 5 (+2) 7 (+2) 9 (+2) 11 (+2) 13 (+2) 15 (+2) 17 (+2).",
    "tiempo": 45,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 2.11",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-02-12",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 1, 8, 2, 8, 3, 8, 4, 8, …",
    "opciones": [
      "11",
      "2",
      "5",
      "12"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 5. El documento lo desglosa así: 1 8 2 8 3 8 4 8.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 2.12",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-02-14",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 34, 36, 18, 20, 10, 12, 6, 8, …",
    "opciones": [
      "0",
      "4",
      "10",
      "12"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 4. El documento lo desglosa así: 34 (+2) 36 (:2) 18 (+2) 20 (:2) 10 (+2) 12 (:2) 6 (+2) 8 (:2).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 2.14",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-02-15",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 56, 57, 59, 60, 62, 63, 65, 66, …",
    "opciones": [
      "70",
      "64",
      "67",
      "68"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 68. El documento lo desglosa así: 56 (+1) 57 (+2) 59 (+1) 60 (+2) 62 (+1) 63 (+2) 65 (+1) 66 (+2).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 2.15",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-02-16",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 5, 7, 8, 16, 18, 19, 38, 40, …",
    "opciones": [
      "39",
      "41",
      "40",
      "42"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 41. El documento lo desglosa así: 5 (+2) 7 (+1) 8 (x2) 16 (+2) 18 (+1) 19 (x2) 38 (+2) 40 (+1).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 2.16",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-02-17",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 13, 14, 16, 19, 23, 28, 34, 41, …",
    "opciones": [
      "48",
      "33",
      "49",
      "57"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 49. El documento lo desglosa así: 13 (+1) 14 (+2) 16 (+3) 19 (+4) 23 (+5) 28 (+6) 34 (+7) 41 (+8).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 2.17",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-02-18",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 36, 35, 33, 30, 26, 21, 15, 8, …",
    "opciones": [
      "1",
      "-8",
      "0",
      "16"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 0. El documento lo desglosa así: 36 (-1) 35 (-2) 33 (-3) 30 (-4) 26 (-5) 21 (-6) 15 (-7) 8 (-8).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 2.18",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-02-19",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 2, 5, 3, 7, 10, 8, 12, 15, …",
    "opciones": [
      "11",
      "17",
      "18",
      "13"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 13. El documento lo desglosa así: 2 (+3) 5 (-2) 3 (+4) 7 (+3) 10 (-2) 8 (+4) 12 (+3) 15 (-2).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 2.19",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-02-20",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 12, 13, 17, 16, 22, 19, 27, 22, …",
    "opciones": [
      "12",
      "42",
      "32",
      "17"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 32. El documento lo desglosa así: 12 13 17 16 22 19 27 22.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 2.20",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-03-02",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 7, 8, 10, 11, 13, 14, 16, 17, …",
    "opciones": [
      "21",
      "19",
      "18",
      "15"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 19. El documento lo desglosa así: 7 (+1) 8 (+2) 10 (+1) 11 (+2) 13 (+1) 14 (+2) 16 (+1) 17 (+2).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 3.2",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-03-03",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 3, 5, 13, 15, 23, 25, 33, 35, …",
    "opciones": [
      "37",
      "27",
      "51",
      "43"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 43. El documento lo desglosa así: 3 (+2) 5 (+8) 13 (+2) 15 (+8) 23 (+2) 25 (+8) 33 (+2) 35 (+8).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 3.3",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-03-04",
    "subcategoria": "Sucesiones aritméticas",
    "nivel": "basico",
    "enunciado": "Complete la serie: 20, 23, 26, 29, 32, 35, 38, 41, …",
    "opciones": [
      "38",
      "44",
      "45",
      "47"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 44. El documento lo desglosa así: 20 (+3) 23 (+3) 26 (+3) 29 (+3) 32 (+3) 35 (+3) 38 (+3) 41 (+3).",
    "tiempo": 45,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 3.4",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-03-06",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 56, 56, 53, 53, 48, 48, 41, 41, …",
    "opciones": [
      "23",
      "32",
      "41",
      "50"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 32. El documento lo desglosa así: 56 (=) 56 (-3) 53 (=) 53 (-5) 48 (=) 48 (-7) 41 (=) 41 (-9).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 3.6",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-03-07",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 45, 42, 40, 37, 35, 32, 30, 27, …",
    "opciones": [
      "24",
      "23",
      "29",
      "25"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 25. El documento lo desglosa así: 45 (-3) 42 (-2) 40 (-3) 37 (-2) 35 (-3) 32 (-2) 30 (-3) 27 (-2).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 3.7",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-03-08",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 10, 11, 13, 16, 20, 25, 31, 38, …",
    "opciones": [
      "30",
      "54",
      "46",
      "45"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 46. El documento lo desglosa así: 10 (+1) 11 (+2) 13 (+3) 16 (+4) 20 (+5) 25 (+6) 31 (+7) 38 (+8).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 3.8",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-03-09",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 46, 45, 43, 40, 36, 31, 25, 18, …",
    "opciones": [
      "26",
      "10",
      "11",
      "2"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 10. El documento lo desglosa así: 46 (-1) 45 (-2) 43 (-3) 40 (-4) 36 (-5) 31 (-6) 25 (-7) 18 (-8).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 3.9",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-03-10",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 4, 8, 10, 30, 33, 132, 136, 680, …",
    "opciones": [
      "1224",
      "685",
      "690",
      "675"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 685. El documento lo desglosa así: 4 (x2) 8 (+2) 10 (x3) 30 (+3) 33 (x4) 132 (+4) 136 (x5) 680 (+5).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 3.10",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-03-11",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 5, 12, 10, 12, 20, 12, 40, 12, …",
    "opciones": [
      "-16",
      "-56",
      "148",
      "80"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 80. El documento lo desglosa así: 5 12 10 12 20 12 40 12.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 3.11",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-03-12",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 13, 12, 10, 9, 7, 6, 4, 3, …",
    "opciones": [
      "-1",
      "1",
      "5",
      "2"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 1. El documento lo desglosa así: 13 (-1) 12 (-2) 10 (-1) 9 (-2) 7 (-1) 6 (-2) 4 (-1) 3 (-2).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 3.12",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-03-13",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 18, 18, 16, 16, 14, 14, 12, 12, …",
    "opciones": [
      "12",
      "14",
      "10",
      "8"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 10. El documento lo desglosa así: 18 (=) 18 (-2) 16 (=) 16 (-2) 14 (=) 14 (-2) 12 (=) 12 (-2).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 3.13",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-03-14",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 9, 5, 14, 5, 19, 5, 24, 5, …",
    "opciones": [
      "-14",
      "29",
      "53",
      "-19"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 29. El documento lo desglosa así: 9 (+) 5 (=) 14 (+) 5 (=) 19 (+) 5 (=) 24 (+) 5.",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 3.14",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-03-15",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 1, 2, 4, 7, 11, 16, 22, 29, …",
    "opciones": [
      "36",
      "45",
      "21",
      "37"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 37. El documento lo desglosa así: 1 (+1) 2 (+2) 4 (+3) 7 (+4) 11 (+5) 16 (+6) 22 (+7) 29 (+8).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 3.15",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-03-16",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 3, 6, 12, 24, 48, 96, 192, 384, …",
    "opciones": [
      "0",
      "1152",
      "768",
      "576"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 768. El documento lo desglosa así: 3 (x2) 6 (x2) 12 (x2) 24 (x2) 48 (x2) 96 (x2) 192 (x2) 384 (x2).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 3.16",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-03-17",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 98, 99, 97, 100, 96, 101, 95, 102, …",
    "opciones": [
      "110",
      "94",
      "109",
      "86"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 94. El documento lo desglosa así: 98 (+1) 99 (-2) 97 (+3) 100 (-4) 96 (+5) 101 (-6) 95 (+7) 102 (-8).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 3.17",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-04-01",
    "subcategoria": "Sucesiones aritméticas",
    "nivel": "basico",
    "enunciado": "Complete la serie: 10, 13, 16, 19, 22, 25, 28, …",
    "opciones": [
      "34",
      "31",
      "32",
      "25"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 31. El documento lo desglosa así: 10 (+3) 13 (+3) 16 (+3) 19 (+3) 22 (+3) 25 (+3) 28 (+3).",
    "tiempo": 45,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 4.1",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-04-02",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 8, 12, 8, 22, 8, 32, 8, …",
    "opciones": [
      "-16",
      "76",
      "42",
      "-26"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 42. El documento lo desglosa así: 8 12 8 22 8 32 8.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 4.2",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-04-03",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 2, 5, 10, 3, 6, 12, 4, …",
    "opciones": [
      "-4",
      "1",
      "10",
      "7"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 7. El documento lo desglosa así: 2 (+3) 5 (x2) 10 // 3 (+3) 6 (x2) 12 // 4 (+3).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 4.3",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-04-04",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 3, 6, 12, 3, 9, 27, 3, …",
    "opciones": [
      "21",
      "12",
      "-6",
      "-21"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 12. El documento lo desglosa así: 3 (x2) 6 (x2) 12 // 3 (x3) 9 (x3) 27 // 3 (x4).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 4.4",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-04-06",
    "subcategoria": "Sucesiones aritméticas",
    "nivel": "basico",
    "enunciado": "Complete la serie: 27, 24, 21, 18, 15, 12, 9, …",
    "opciones": [
      "3",
      "12",
      "6",
      "7"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 6. El documento lo desglosa así: 27 (-3) 24 (-3) 21 (-3) 18 (-3) 15 (-3) 12 (-3) 9 (-3).",
    "tiempo": 45,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 4.6",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-04-07",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 1, 2, 4, 2, 3, 9, 3, …",
    "opciones": [
      "-3",
      "5",
      "2",
      "4"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 4. El documento lo desglosa así: 1 (+1) 2 (x2) 4 (:2) 2 (+1) 3 (x3) 9 (:3) 3 (+1).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 4.7",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-04-08",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 96, 13, 48, 26, 24, 52, 12, …",
    "opciones": [
      "196",
      "104",
      "-80",
      "-28"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 104. El documento lo desglosa así: 96 13 48 26 24 52 12.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 4.8",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-04-09",
    "subcategoria": "Sucesiones aritméticas",
    "nivel": "basico",
    "enunciado": "Complete la serie: 5, 17, 29, 6, 18, 30, 7, …",
    "opciones": [
      "-16",
      "-5",
      "19",
      "31"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 19. El documento lo desglosa así: 5 (+12) 17 (+12) 29 6 (+12) 18 (+12) 30 7.",
    "tiempo": 45,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 4.9",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-04-10",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 18, 19, 17, 20, 16, 21, 15, …",
    "opciones": [
      "29",
      "22",
      "9",
      "8"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 22. El documento lo desglosa así: 18 (+1) 19 (-2) 17 (+3) 20 (-4) 16 (+5) 21 (-6) 15 (+7).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 4.10",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-04-11",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 1, 2, 4, 8, 16, 32, 64, …",
    "opciones": [
      "96",
      "192",
      "0",
      "128"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 128. El documento lo desglosa así: 1 (x2) 2 (x2) 4 (x2) 8 (x2) 16 (x2) 32 (x2) 64 (x2).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 4.11",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-04-12",
    "subcategoria": "Sucesiones aritméticas",
    "nivel": "basico",
    "enunciado": "Complete la serie: 3, 7, 11, 15, 19, 23, 27, …",
    "opciones": [
      "32",
      "31",
      "23",
      "35"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 31. El documento lo desglosa así: 3 (+4) 7 (+4) 11 (+4) 15 (+4) 19 (+4) 23 (+4) 27 (+4).",
    "tiempo": 45,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 4.12",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-04-13",
    "subcategoria": "Sucesiones aritméticas",
    "nivel": "basico",
    "enunciado": "Complete la serie: 19, 16, 13, 10, 7, 4, 1, …",
    "opciones": [
      "-1",
      "-2",
      "-5",
      "4"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es -2. El documento lo desglosa así: 19 (-3) 16 (-3) 13 (-3) 10 (-3) 7 (-3) 4 (-3) 1 (-3).",
    "tiempo": 45,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 4.13",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-04-14",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 3, 9, 18, 20, 60, 120, 122, …",
    "opciones": [
      "124",
      "610",
      "366",
      "-122"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 366. El documento lo desglosa así: 3 (x3) 9 (x2) 18 (+2) 20 (x3) 60 (x2) 120 (+2) 122 (x3).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 4.14",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-04-15",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 7, 8, 9, 12, 13, 14, 17, …",
    "opciones": [
      "20",
      "19",
      "16",
      "18"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 18. El documento lo desglosa así: 7 (+1) 8 (+1) 9 (+3) 12 (+1) 13 (+1) 14 (+3) 17 (+1).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 4.15",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-04-16",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 4, 5, 7, 10, 14, 19, 25, …",
    "opciones": [
      "39",
      "32",
      "18",
      "31"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 32. El documento lo desglosa así: 4 (+1) 5 (+2) 7 (+3) 10 (+4) 14 (+5) 19 (+6) 25 (+7).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 4.16",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-04-17",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 5, 7, 9, 10, 12, 14, 15, …",
    "opciones": [
      "13",
      "17",
      "16",
      "19"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 17. El documento lo desglosa así: 5 (+2) 7 (+2) 9 (+1) 10 (+2) 12 (+2) 14 (+1) 15 (+2).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 4.17",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-04-18",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 9, 10, 13, 12, 13, 16, 15, …",
    "opciones": [
      "14",
      "16",
      "17",
      "15"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 16. El documento lo desglosa así: 9 (+1) 10 (+3) 13 (-1) 12 (+1) 13 (+3) 16 (-1) 15 (+1).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 4.18",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-04-19",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 8, 7, 16, 14, 24, 48, 32, …",
    "opciones": [
      "16",
      "160",
      "-32",
      "96"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 96. El documento lo desglosa así: 8 7 16 14 24 48 32.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 4.19",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-04-20",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 11, 10, 7, 9, 8, 5, 7, …",
    "opciones": [
      "8",
      "5",
      "6",
      "9"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 6. El documento lo desglosa así: 11 (-1) 10 (-3) 7 (+2) 9 (-1) 8 (-3) 5 (+2) 7 (-1).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 4.20",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-05-01",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 80, 40, 44, 22, 26, 13, …",
    "opciones": [
      "0",
      "9",
      "17",
      "21"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 17. El documento lo desglosa así: 80 (:2) 40 (+4) 44 (:2) 22 (+4) 26 (:2) 13.",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 5.1",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-05-02",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 6, 4, 12, 6, 24, 8, 48, …",
    "opciones": [
      "-28",
      "10",
      "88",
      "86"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 10. El documento lo desglosa así: 6 4 12 6 24 8 48.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 5.2",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-05-03",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 25, 21, 29, 17, 33, 13, 37, …",
    "opciones": [
      "61",
      "65",
      "-19",
      "9"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 9. El documento lo desglosa así: 25 21 29 17 33 13 37.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 5.3",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-05-04",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 11, 14, 17, 20, 23, 26, …",
    "opciones": [
      "30",
      "29",
      "23",
      "32"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 29. El documento lo desglosa así: 11 14 17 20 23 26.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 5.4",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-05-05",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 2, 3, 5, 8, 13, 21, 34, …",
    "opciones": [
      "13",
      "55",
      "47",
      "76"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 55. El documento lo desglosa así: 2 (+) 3 (=) 5 (+3) (=) 8 (+5) (=) 13 (+5) (=) 21 (+13) (=) 34.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 5.5",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-05-06",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 2, 2, 4, 2, 6, 2, 8, …",
    "opciones": [
      "14",
      "-4",
      "2",
      "3"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 2. El documento lo desglosa así: 2 (+) 2 (=) 4 (+) 2 (=) 6 (+) 2 (=) 8.",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 5.6",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-05-08",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 6, 12, 11, 13, 26, 25, 27, …",
    "opciones": [
      "0",
      "81",
      "54",
      "29"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 54. El documento lo desglosa así: 6 (x2) 12 (-1) 11 (+2) 13 (x2) 26 (-1) 25 (+2) 27.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 5.8",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-05-09",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 4, 4, 8, 6, 16, 8, 32, 10, 64, …",
    "opciones": [
      "118",
      "116",
      "12",
      "-40"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 12. El documento lo desglosa así: 4 4 8 6 16 8 32 10 64.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 5.9",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-05-10",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 7, 11, 17, 29, 43, …",
    "opciones": [
      "57",
      "71",
      "99",
      "15"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 71. El documento lo desglosa así: 7 11 17 29 43.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 5.10",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-05-11",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 60, 55, 59, 56, 58, …",
    "opciones": [
      "56",
      "59",
      "60",
      "57"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 57. El documento lo desglosa así: 60 (-5) 55 (+4) 59 (-3) 56 (+2) 58 (-1).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 5.11",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-05-12",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 15, 5, 6, 2, 3, …",
    "opciones": [
      "5",
      "1",
      "-1",
      "4"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 1. El documento lo desglosa así: 15 (:3) 5 (+1) 6 (:3) 2 (+1) 3 (:3).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 5.12",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-05-13",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 3, 5, 9, 17, 33, …",
    "opciones": [
      "49",
      "65",
      "1",
      "97"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 65. El documento lo desglosa así: 3 (+2) 5 (+4) 9 (+8) 17 (+16) 33 (+32).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 5.13",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-05-14",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 11, 12, 12, 14, 13, 16, 14, …",
    "opciones": [
      "12",
      "18",
      "22",
      "10"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 18. El documento lo desglosa así: 11 12 12 14 13 16 14.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 5.14",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-05-15",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 2, 13, 5, 15, 8, 17, 11, …",
    "opciones": [
      "5",
      "27",
      "3",
      "19"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 19. El documento lo desglosa así: 2 13 5 15 8 17 11.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 5.15",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-05-16",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 10, 8, 16, 14, 28, 26, …",
    "opciones": [
      "0",
      "78",
      "52",
      "24"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 52. El documento lo desglosa así: 10 (-2) 8 (x2) 16 (-2) 14 (x2) 28 (-2) 26.",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 5.16",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-05-17",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 1, 3, 5, 8, 11, 15, 19, …",
    "opciones": [
      "23",
      "14",
      "24",
      "29"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 24. El documento lo desglosa así: 1 (+2) 3 (+2) 5 (+3) 8 (+3) 11 (+4) 15 (+4) 19 (+5).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 5.17",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-05-18",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 4, 6, 8, 7, 6, 9, 12, 11, …",
    "opciones": [
      "9",
      "12",
      "10",
      "11"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 10. El documento lo desglosa así: 4 (+2) 6 (+2) 8 (-1) 7 (-1) 6 (+3) 9 (+3) 12 (-1) 11 (-1).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 5.18",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-05-19",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 8, 3, 10, 6, 12, 9, 14, 12, …",
    "opciones": [
      "20",
      "8",
      "10",
      "16"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 16. El documento lo desglosa así: 8 3 10 6 12 9 14 12.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 5.19",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-05-20",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 2, 4, 16, 256, …",
    "opciones": [
      "-65024",
      "130816",
      "65536",
      "496"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 65536. El documento lo desglosa así: 2 (x2) 4 (x4) 16 (x16) 256 (x256).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 5.20",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-06-01",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 4, 7, 11, 13, 16, …",
    "opciones": [
      "12",
      "20",
      "19",
      "24"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 20. El documento lo desglosa así: 4 (+3) 7 (+4) 11 (+2) 13 (+3) 16 (+4).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 6.1",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-06-02",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 5, 9, 11, 15, 17, 21, …",
    "opciones": [
      "25",
      "19",
      "23",
      "24"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 23. El documento lo desglosa así: 5 (+4) 9 (+2) 11 (+4) 15 (+2) 17 (+4) 21 (+2).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 6.2",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-06-03",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 1, 4, 10, 22, 46, …",
    "opciones": [
      "70",
      "-2",
      "142",
      "94"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 94. El documento lo desglosa así: 1 (+3) 4 (+6) 10 (+12) 22 (+24) 46 (+48).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 6.3",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-06-04",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 55, 45, 40, 30, 25, 15, 10, …",
    "opciones": [
      "-10",
      "0",
      "20",
      "5"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 0. El documento lo desglosa así: 55 (-10) 45 (-5) 40 (-10) 30 (-5) 25 (-10) 15 (-5) 10 (-10).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 6.4",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-06-05",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 14, 15, 17, 20, 21, 23, 26, …",
    "opciones": [
      "29",
      "27",
      "25",
      "28"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 27. El documento lo desglosa así: 14 (+1) 15 (+2) 17 (+3) 20 (+1) 21 (+2) 23 (+3) 26 (+1).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 6.5",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-06-06",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 3, 15, 10, 9, 17, 10, 27, 19, …",
    "opciones": [
      "11",
      "10",
      "1",
      "28"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 10. El documento lo desglosa así: 3 15 10 9 17 10 27 19.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 6.6",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-06-07",
    "subcategoria": "Sucesiones aritméticas",
    "nivel": "basico",
    "enunciado": "Complete la serie: 65, 60, 55, 50, 45, 40, …",
    "opciones": [
      "30",
      "45",
      "36",
      "35"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 35. El documento lo desglosa así: 65 (-5) 60 (-5) 55 (-5) 50 (-5) 45 (-5) 40 (-5).",
    "tiempo": 45,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 6.7",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-06-08",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 8, 1, 10, 2, 13, 6, 17, 24, …",
    "opciones": [
      "20",
      "22",
      "26",
      "31"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 22. El documento lo desglosa así: 8 1 10 2 13 6 17 24.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 6.8",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-06-09",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 7, 2, 3, 14, 4, 6, 28, 8, 12, …",
    "opciones": [
      "-32",
      "56",
      "16",
      "100"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 56. El documento lo desglosa así: 7 2 3 // 14 4 6 // 28 8 12.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 6.9",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-06-10",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 22, 6, 8, 24, 9, 8, 26, 12, 8, 28, 15, 8, …",
    "opciones": [
      "1",
      "30",
      "52",
      "-14"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 30. El documento lo desglosa así: 22 6 8 24 9 8 26 12 8 28 15 8.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 6.10",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-06-11",
    "subcategoria": "Sucesiones aritméticas",
    "nivel": "basico",
    "enunciado": "Complete la serie: 78, 79, 80, 81, 82, 83, …",
    "opciones": [
      "85",
      "83",
      "82",
      "84"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 84. El documento lo desglosa así: 78 (+1) 79 (+1) 80 (+1) 81 (+1) 82 (+1) 83 (+1).",
    "tiempo": 45,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 6.11",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-06-12",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 6, 7, 10, 15, 22, 31, 42, …",
    "opciones": [
      "29",
      "68",
      "55",
      "53"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 55. El documento lo desglosa así: 6 (+1) 7 (+3) 10 (+5) 15 (+7) 22 (+9) 31 (+11) 42 (+13).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 6.12",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-06-13",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 19, 16, 14, 11, 9, 6, 4, …",
    "opciones": [
      "2",
      "7",
      "1",
      "-2"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 1. El documento lo desglosa así: 19 (-3) 16 (-2) 14 (-3) 11 (-2) 9 (-3) 6 (-2) 4 (-3).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 6.13",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-06-14",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 30, 28, 14, 12, 6, …",
    "opciones": [
      "0",
      "4",
      "2",
      "8"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 4. El documento lo desglosa así: 30 (-2) 28 (:2) 14 (-2) 12 (:2) 6 (-2).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 6.14",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-06-15",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 20, 60, 17, 30, 14, 15, …",
    "opciones": [
      "7",
      "19",
      "16",
      "11"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 11. El documento lo desglosa así: 20 60 17 30 14 15.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 6.15",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-06-16",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 16, 8, 24, 12, 36, …",
    "opciones": [
      "54",
      "0",
      "18",
      "60"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 18. El documento lo desglosa así: 16 (+) 8 (=) 24 (+) 12 (=) 36.",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 6.16",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-06-17",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 1, 2, 3, 6, 9, 12, 17, 22, …",
    "opciones": [
      "28",
      "27",
      "32",
      "17"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 27. El documento lo desglosa así: 1 (+1) 2 (+1) 3 // 6 (+3) 9 (+3) 12 // 17 (+5) 22 (+5).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 6.17",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-06-18",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 43, 34, 26, 19, 13, 8, …",
    "opciones": [
      "0",
      "4",
      "3",
      "12"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 4. El documento lo desglosa así: 43 (-9) 34 (-8) 26 (-7) 19 (-6) 13 (-5) 8 (-4).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 6.18",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-06-19",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 13, 55, 99, 145, …",
    "opciones": [
      "191",
      "97",
      "241",
      "193"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 193. El documento lo desglosa así: 13 (+42) 55 (+44) 99 (+46) 145 (+48).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 6.19",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-06-20",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 66, 68, 67, 79, 68, 80, …",
    "opciones": [
      "61",
      "99",
      "118",
      "92"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 99. El documento lo desglosa así: 66 68 67 79 68 80.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 6.20",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-07-01",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 2, 4, 6, 7, 8, 10, 12, …",
    "opciones": [
      "14",
      "7",
      "17",
      "2"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 7. El documento lo desglosa así: 2 4 6 7 8 10 12.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 7.1",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-07-02",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 24, 23, 22, 21, 20, 20, 19, 18, 17, 16, 15, …",
    "opciones": [
      "25",
      "20",
      "14",
      "10"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 20. El documento lo desglosa así: 24 23 22 21 20 20 19 18 17 16 15.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 7.2",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-07-03",
    "subcategoria": "Sucesiones aritméticas",
    "nivel": "basico",
    "enunciado": "Complete la serie: 18, 21, 24, 27, 30, …",
    "opciones": [
      "27",
      "34",
      "36",
      "33"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 33. El documento lo desglosa así: 18 (+3) 21 (+3) 24 (+3) 27 (+3) 30 (+3).",
    "tiempo": 45,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 7.3",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-07-04",
    "subcategoria": "Sucesiones aritméticas",
    "nivel": "basico",
    "enunciado": "Complete la serie: 12, 17, 22, 27, 32, 37, …",
    "opciones": [
      "43",
      "42",
      "32",
      "47"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 42. El documento lo desglosa así: 12 (+5) 17 (+5) 22 (+5) 27 (+5) 32 (+5) 37 (+5).",
    "tiempo": 45,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 7.4",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-07-05",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 24, 22, 20, 19, 18, 16, 14, …",
    "opciones": [
      "12",
      "13",
      "14",
      "15"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 13. El documento lo desglosa así: 24 (-2) 22 (-2) 20 (-1) 19 (-1) 18 (-2) 16 (-2) 14 (-1).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 7.5",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-07-06",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 1, 2, 6, 18, 54, 162, …",
    "opciones": [
      "270",
      "-160",
      "1",
      "323"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 1. El documento lo desglosa así: 1 2 6 18 54 162.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 7.6",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-07-07",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 1, 2, 4, 9, 3, 7, 4, 9, 10, 5, 4, …",
    "opciones": [
      "14",
      "-1",
      "3",
      "9"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 9. El documento lo desglosa así: 1 2 4 9 3 7 4 9 10 5 4.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 7.7",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-07-08",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 50, 47, 45, 42, 41, 40, 37, …",
    "opciones": [
      "33",
      "35",
      "39",
      "34"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 35. El documento lo desglosa así: 50 (-3) 47 (-2) 45 (-3) 42 (-1) 41 (-1) 40 (-3) 37 (-2).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 7.8",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-07-09",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 1, 2, 3, 6, 4, 5, 6, 6, 7, 8, 9, …",
    "opciones": [
      "10",
      "6",
      "12",
      "3"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 6. El documento lo desglosa así: 1 2 3 6 4 5 6 6 7 8 9.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 7.9",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-07-10",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 1, 11, 31, 61, 101, …",
    "opciones": [
      "201",
      "151",
      "141",
      "51"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 151. El documento lo desglosa así: 1 (+10) 11 (+20) 31 (+30) 61 (+40) 101 (+50).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 7.10",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-07-11",
    "subcategoria": "Sucesiones aritméticas",
    "nivel": "basico",
    "enunciado": "Complete la serie: 10, 11, 12, 15, 16, 17, 20, 21, …",
    "opciones": [
      "23",
      "20",
      "21",
      "22"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 22. El documento lo desglosa así: 10 11 12 (+3) 15 16 17 (+3) 20 21.",
    "tiempo": 45,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 7.11",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-07-12",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 3, 6, 10, 12, 24, 28, …",
    "opciones": [
      "31",
      "30",
      "26",
      "32"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 30. El documento lo desglosa así: 3 (x2) 6 (+4) 10 (+2) 12 (x2) 24 (+4) 28 (+2).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 7.12",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-07-13",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 2, 3, 5, 8, 11, 13, 14, 15, 17, 20, 23, …",
    "opciones": [
      "26",
      "25",
      "21",
      "27"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 25. El documento lo desglosa así: 2 (+1) 3 (+2) 5 (+3) 8 (+3) 11 (+2) 13 (+1) 14 (+1) 15 (+2) 17 (+3) 20 (+3) 23 (+2).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 7.13",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-07-14",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 3, 9, 27, 81, 27, 9, 3, …",
    "opciones": [
      "-3",
      "-1",
      "1",
      "5"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 1. El documento lo desglosa así: 3 (x3) 9 (x3) 27 (x3) 81 (:3) 27 (:3) 9 (:3) 3 (:3).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 7.14",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-07-15",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 4, 8, 5, 10, 6, 12, …",
    "opciones": [
      "18",
      "2",
      "17",
      "7"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 7. El documento lo desglosa así: 4 8 5 10 6 12.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 7.15",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-08-01",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 13, 15, 17, 19, 22, 21, 23, 25, 27, …",
    "opciones": [
      "29",
      "32",
      "22",
      "17"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 22. El documento lo desglosa así: 13 15 17 19 22 21 23 25 27.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 8.1",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-08-02",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 23, 21, 19, 17, 16, 15, 13, 11, 9, …",
    "opciones": [
      "23",
      "16",
      "7",
      "2"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 16. El documento lo desglosa así: 23 21 19 17 16 15 13 11 9.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 8.2",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-08-03",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 2, 4, 8, 9, 16, 32, 64, …",
    "opciones": [
      "-46",
      "119",
      "96",
      "9"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 9. El documento lo desglosa así: 2 4 8 9 16 32 64.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 8.3",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-08-04",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 58, 53, 49, 46, 44, 43, …",
    "opciones": [
      "44",
      "43",
      "45",
      "42"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 43. El documento lo desglosa así: 58 (-5) 53 (-4) 49 (-3) 46 (-2) 44 (-1) 43 (-0).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 8.4",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-08-05",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 6, 12, 18, 24, 54, 48, 16, …",
    "opciones": [
      "-64",
      "96",
      "-16",
      "176"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 96. El documento lo desglosa así: 6 12 18 24 54 48 162.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 8.5",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-08-06",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 3, 6, 9, 27, 81, 243, …",
    "opciones": [
      "249",
      "246",
      "405",
      "240"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 246. El documento lo desglosa así: 3 (+3) 6 (+3) 9 (x3) 27 (x3) 81 (x3) 243 (+3).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 8.6",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-08-07",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 15, 20, 23, 28, 31, 35, 37, 41, …",
    "opciones": [
      "45",
      "40",
      "43",
      "42"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 42. El documento lo desglosa así: 15 20 23 28 31 35 37 41.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 8.7",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-08-09",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 15, 17, 21, 27, 35, 45, …",
    "opciones": [
      "55",
      "33",
      "57",
      "69"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 57. El documento lo desglosa así: 15 (+2) 17 (+4) 21 (+6) 27 (+8) 35 (+10) 45 (+12).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 8.9",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-08-11",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 10, 11, 12, 15, 16, 17, 20, 21, …",
    "opciones": [
      "20",
      "21",
      "23",
      "22"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 22. El documento lo desglosa así: 10 (+1) 11 (+1) 12 (+3) 15 (+1) 16 (+1) 17 (+3) 20 (+1) 21 (+1).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 8.11",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-08-13",
    "subcategoria": "Sucesiones aritméticas",
    "nivel": "basico",
    "enunciado": "Complete la serie: 1, 5, 9, 13, 15, 17, 21, 25, …",
    "opciones": [
      "29",
      "15",
      "35",
      "5"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 15. El documento lo desglosa así: 1 (+4) 5 (+4) 9 (+4) 13 15 17 (+4) 21 (+4) 25.",
    "tiempo": 45,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 8.13",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-08-14",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 3, 3, 5, 5, 7, 7, 8, 9, 9, …",
    "opciones": [
      "7",
      "8",
      "9",
      "10"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 8. El documento lo desglosa así: 3 3 5 5 7 7 8 9 9.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 8.14",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-08-15",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 22, 25, 29, 34, 40, 47, …",
    "opciones": [
      "54",
      "63",
      "39",
      "55"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 55. El documento lo desglosa así: 22 (+3) 25 (+4) 29 (+5) 34 (+6) 40 (+7) 47 (+8).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 8.15",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-09-01",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 76, 72, 68, 71, 74, 72, 70, …",
    "opciones": [
      "69",
      "71",
      "68",
      "72"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 71. El documento lo desglosa así: 76 (-4) 72 (-4) 68 (+3) 71 (+3) 74 (-2) 72 (-2) 70 (+1).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 9.1",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-09-02",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 4, 7, 10, 14, 18, 23, 28, 34, …",
    "opciones": [
      "46",
      "28",
      "40",
      "41"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 40. El documento lo desglosa así: 4 (+3) 7 (+3) 10 (+4) 14 (+4) 18 (+5) 23 (+5) 28 (+6) 34 (+6).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 9.2",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-09-03",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 1, 3, 4, 7, 11, 18, 29, 47, …",
    "opciones": [
      "105",
      "18",
      "65",
      "76"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 76. El documento lo desglosa así: 1 (+) 3 (+) 4 (+) 7 (+) 11 (+) 18 (+) 29 (+) 47 (+).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 9.3",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-09-04",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 3, 4, 5, 6, 8, 5, 12, 16, 5, 24, …",
    "opciones": [
      "40",
      "32",
      "16",
      "43"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 32. El documento lo desglosa así: 3 4 5 6 8 5 12 16 5 24.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 9.4",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-09-05",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 2, 4, 8, 20, 8, 16, 32, 20, 32, 64, …",
    "opciones": [
      "0",
      "128",
      "96",
      "192"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 128. El documento lo desglosa así: 2 (x2) 4 (x2) 8 20 8 (x2) 16 (x2) 32 20 32 (x2) 64 (x2).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 9.5",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-09-06",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 5, 7, 10, 14, 19, 25, 32, 40, …",
    "opciones": [
      "48",
      "49",
      "58",
      "31"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 49. El documento lo desglosa así: 5 (+2) 7 (+3) 10 (+4) 14 (+5) 19 (+6) 25 (+7) 32 (+8) 40 (+9).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 9.6",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-09-07",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 4, 6, 6, 9, 8, 13, 10, 18, …",
    "opciones": [
      "26",
      "24",
      "6",
      "12"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 12. El documento lo desglosa así: 4 6 6 9 8 13 10 18.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 9.7",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-09-08",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 6, 7, 9, 13, 21, …",
    "opciones": [
      "5",
      "53",
      "37",
      "29"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 37. El documento lo desglosa así: 6 (+1) 7 (+2) 9 (+4) 13 (+8) 21 (+16).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 9.8",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-09-09",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 2, 6, 14, 30, 62, …",
    "opciones": [
      "-2",
      "126",
      "94",
      "190"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 126. El documento lo desglosa así: 2 (+4) 6 (+8) 14 (+16) 30 (+32) 62 (+64).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 9.9",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-09-10",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 1, 2, 4, 8, 16, …",
    "opciones": [
      "48",
      "32",
      "24",
      "0"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 32. El documento lo desglosa así: 1 (x2) 2 (x2) 4 (x2) 8 (x2) 16 (x2).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 9.10",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-10-01",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 78, 77, 81, 80, 84, 83, 87, …",
    "opciones": [
      "91",
      "86",
      "88",
      "85"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 86. El documento lo desglosa así: 78 (-1) 77 (+4) 81 (-1) 80 (+4) 84 (-1) 83 (+4) 87 (-1).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 10.1",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-10-02",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 20, 4, 40, 8, 80, 16, 160, …",
    "opciones": [
      "-96",
      "32",
      "304",
      "288"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 32. El documento lo desglosa así: 20 4 40 8 80 16 160.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 10.2",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-10-03",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 13, 14, 15, 12, 17, 10, 19, …",
    "opciones": [
      "-3",
      "30",
      "28",
      "8"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 8. El documento lo desglosa así: 13 14 15 12 17 10 19.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 10.3",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-10-04",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 2, 20, 3, 19, 5, 17, 8, …",
    "opciones": [
      "2",
      "14",
      "20",
      "-1"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 14. El documento lo desglosa así: 2 20 3 19 5 17 8.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 10.4",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-10-05",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 2, 4, 8, 8, 64, 14, 14, …",
    "opciones": [
      "14",
      "196",
      "-168",
      "378"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 196. El documento lo desglosa así: 2 (x) 2 (=) 4 // 8 (x) 8 (=) 64 // 14 (x) 14 (=).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 10.5",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-10-06",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 4, 7, 13, 25, 49, 97, …",
    "opciones": [
      "145",
      "289",
      "193",
      "1"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 193. El documento lo desglosa así: 4 (+3) 7 (+6) 13 (+12) 25 (+24) 49 (+48) 97 (+96).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 10.6",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-10-07",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 3, 6, 11, 14, 19, 22, 27, …",
    "opciones": [
      "32",
      "33",
      "24",
      "30"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 30. El documento lo desglosa así: 3 6 11 14 19 22 27.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 10.7",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-10-08",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 864, 432, 144, 72, 24, 12, 4, …",
    "opciones": [
      "0",
      "2",
      "6",
      "-4"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 2. El documento lo desglosa así: 864 (:2) 432 (:3) 144 (:2) 72 (:3) 24 (:2) 12 (:3) 4 (:2).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 10.8",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-10-09",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 7, 5, 11, 9, 15, 13, 19, …",
    "opciones": [
      "25",
      "17",
      "21",
      "15"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 17. El documento lo desglosa así: 7 5 11 9 15 13 19.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 10.9",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-10-10",
    "subcategoria": "Sucesiones de progresión variable",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 2, 3, 6, 15, 42, 123, …",
    "opciones": [
      "609",
      "366",
      "204",
      "-120"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 366. El documento lo desglosa así: 2 (+1) 3 (+3) 6 (+9) 15 (+27) 42 (+81) 123 (+243).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 10.10",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-10-11",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 2, 4, 12, 48, 240, 1440, …",
    "opciones": [
      "2640",
      "18720",
      "-7200",
      "10080"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 10080. El documento lo desglosa así: 2 (x2) 4 (x3) 12 (x4) 48 (x5) 240 (x6) 1440 (x7).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 10.11",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-10-12",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "intermedio",
    "enunciado": "Complete la serie: 1, 2, 6, 12, 36, 72, 216, …",
    "opciones": [
      "0",
      "648",
      "432",
      "360"
    ],
    "respuesta": 2,
    "explicacion": "El término que sigue es 432. El documento lo desglosa así: 1 (x2) 2 (x3) 6 (x2) 12 (x3) 36 (x2) 72 (x3) 216 (x2).",
    "tiempo": 60,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 10.12",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-10-13",
    "subcategoria": "Sucesiones multiplicativas",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 3, 6, 7, 14, 17, 102, …",
    "opciones": [
      "187",
      "107",
      "97",
      "112"
    ],
    "respuesta": 1,
    "explicacion": "El término que sigue es 107. El documento lo desglosa así: 3 (x2) 6 (+1) 7 (x2) 14 (+3) 17 (x6) 102 (+5).",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 10.13",
    "categoria": "numerico"
  },
  {
    "id": "NU-N2-10-15",
    "subcategoria": "Sucesiones alternantes",
    "nivel": "avanzado",
    "enunciado": "Complete la serie: 21, 3, 17, 7, 13, 11, …",
    "opciones": [
      "7",
      "13",
      "10",
      "9"
    ],
    "respuesta": 3,
    "explicacion": "El término que sigue es 9. El documento lo desglosa así: 21 3 17 7 13 11.",
    "tiempo": 75,
    "fuente": "Psicotécnicos — Razonamiento numérico (336461140), ejercicio 10.15",
    "categoria": "numerico"
  }
]

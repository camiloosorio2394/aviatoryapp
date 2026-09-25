// GENERADO por scripts/rac/convertir.mjs desde
// docs/contenido/rac.md. No se edita a mano: se edita el documento y
// se vuelve a correr el script.

/**
 * Las diecinueve unidades del módulo RAC, una por reglamento, en el formato
 * del lector de lecciones.
 *
 * El contenido está en docs/contenido/rac.md, con sus fuentes en el Anexo B
 * del documento. Versión convertida: 1.0, 24 de septiembre de 2026.
 *
 * El quiz de cada unidad no va aquí: está en racPractica.ts, porque en la
 * lectura no se pregunta nada.
 */

import type { DocScreen } from "@/lib/docBlocks"
import type { LectorNivel } from "@/components/lesson/LectorLeccion"

/**
 * Los cinco bloques, con la unidad en la que empieza cada uno. Se generan con
 * las lecciones para que no puedan desfasarse del documento.
 */
export const RAC_NIVELES: LectorNivel[] = [
  {
    "titulo": "Bloque 1 · Tu licencia y tu aptitud",
    "desde": 1
  },
  {
    "titulo": "Bloque 2 · Cómo se vuela",
    "desde": 5
  },
  {
    "titulo": "Bloque 3 · La aerolínea",
    "desde": 9
  },
  {
    "titulo": "Bloque 4 · Seguridad y consecuencias",
    "desde": 12
  },
  {
    "titulo": "Bloque 5 · Referencia",
    "desde": 17
  }
]

export const RAC_LECCIONES: DocScreen[] = [
  {
    "n": 1,
    "title": "RAC 2 · Personal aeronáutico",
    "kicker": "Tu licencia y tu aptitud",
    "minutes": 13,
    "blocks": [
      {
        "kind": "titulo",
        "text": "Antes de empezar: ¿RAC 2 o RAC 61?"
      },
      {
        "kind": "p",
        "text": "Es la pregunta que más confunde, y la respuesta cambió este año."
      },
      {
        "kind": "vinetas",
        "items": [
          "**Hoy, tu licencia de piloto se rige por el RAC 2, Capítulos I y II.** La Resolución 02543 del 6 de agosto de 2026 (Diario Oficial 53.586) amplió la transición: las licencias y habilitaciones que se expidan **antes del 31 de agosto de 2027** siguen sujetas al RAC 2, y las ya expedidas siguen válidas hasta esa fecha mientras mantengan sus requisitos.",
          "**El RAC 61 es la norma que viene.** Desde el 31/08/2027 las licencias se tramitan por el RAC 61, y a más tardar esa fecha la Aerocivil reemplaza de oficio las licencias vigentes, en formato digital y sin costo.",
          "Por eso el módulo trae **las dos unidades**: el RAC 2 para lo que se exige hoy y el RAC 61 para lo que se exigirá en pocos meses. Donde difieren (por ejemplo, las horas del piloto comercial), cada unidad lo dice.",
          "Otras normas dan por hecho el cambio: el RAC 91, el 121 y el 135 citan el RAC 61, pero aclaran que esas referencias se leen como RAC 2 mientras el RAC 61 no entre en vigor."
        ]
      },
      {
        "kind": "p",
        "text": "Enmienda 17, octubre de 2019 (Resolución 03044 del 30 de septiembre de 2019), con notas y normas transitorias posteriores incorporadas en el texto."
      },
      {
        "kind": "callout",
        "tone": "info",
        "text": "**Transición al RAC 61.** La Resolución 02543 del 6 de agosto de 2026 (Diario Oficial 53.586) amplió la transición: las licencias y habilitaciones de piloto que se expidan **antes del 31 de agosto de 2027** siguen sujetas al RAC 2, Capítulos I y II, y las ya expedidas siguen válidas hasta esa fecha mientras mantengas sus requisitos. A más tardar el 31/08/2027 la Aerocivil las reemplaza de oficio por las del RAC 61, en formato digital y sin costo. Si hoy sacas o tienes licencia, esta es tu norma."
      },
      {
        "kind": "titulo",
        "text": "¿De qué trata?"
      },
      {
        "kind": "p",
        "text": "Es el reglamento de licencias del personal aeronáutico. Para un piloto de avión lo que importa está en el Capítulo I (reglas comunes a todas las licencias: médico, idioma, bitácora, exámenes, convalidación, sanciones) y en el Capítulo II (alumno piloto, piloto privado, piloto comercial y piloto de transporte de línea, con sus habilitaciones, chequeos y recobro de autonomía). Otros capítulos ya pasaron a otros RAC: el médico al RAC 67 y los inspectores al RAC 65; los de instructores y centros de instrucción están en transición hacia los RAC 61, 63, 65, 141, 142 y 147."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber un piloto"
      },
      {
        "kind": "sub",
        "text": "Reglas que aplican a toda licencia (Capítulo I)"
      },
      {
        "kind": "list",
        "items": [
          "Nadie actúa como personal aeronáutico sin una **licencia válida** expedida o convalidada por la Aerocivil y que corresponda a la función (2.1.2).",
          "La licencia tiene **vigencia indefinida** mientras mantengas los requisitos y no esté suspendida o cancelada; si exige certificado médico, vale lo que vale ese certificado (2.1.4). No ejerces atribuciones si no mantienes la competencia y la experiencia reciente (2.1.4.1).",
          "Solo ejerces las atribuciones de tu licencia, cumples los entrenamientos periódicos y **debes portarla** mientras trabajas (2.1.10).",
          "La **licencia provisional** dura máximo **180 días**; la puede expedir el inspector o el examinador designado (ED) al terminar el chequeo final, si tu médico está vigente (2.1.13.2).",
          "La Aerocivil puede **suspender, cancelar o limitar** una licencia cuando dejas de reunir los requisitos o como sanción; y suspenderla provisionalmente en caso de infracción en flagrancia o riesgo inminente (2.1.16.1). Con sanciones pendientes no te renuevan ni te otorgan licencias (2.1.16.3). Las sanciones se imponen con el régimen sancionatorio; este tema se complementa con el RAC 13.",
          "Si trabajas para una empresa con programa de entrenamiento aprobado, tus habilitaciones se rigen por ese programa (2.1.16.7)."
        ]
      },
      {
        "kind": "sub",
        "text": "Aptitud psicofísica"
      },
      {
        "kind": "list",
        "items": [
          "Sin **certificado médico vigente** no ejerces las atribuciones (2.1.5.5). La validez puede ampliarse a discreción de medicina aeronáutica hasta **45 días** (2.1.5.4).",
          "Clase exigida: alumno piloto y piloto privado, **Clase 2** (2.2.2.3, 2.2.3.6); piloto comercial y de transporte de línea, **Clase 1** (2.2.5.6, 2.2.7.8). Para la habilitación de instrumentos del piloto privado, la vista y el oído deben cumplir los de Clase 1 (2.2.3.7.2.6).",
          "Dejas de volar apenas sepas de una **disminución de tu aptitud** que pueda afectar la seguridad (2.1.5.20.1). Debes informar a medicina aeronáutica cualquier disminución de **más de 20 días**, que exija medicamentos recetados de forma continua o que haya requerido hospitalización (2.1.5.20.4).",
          "**Sustancias psicoactivas**: no ejerces bajo sus efectos, te abstienes de todo abuso, y el uso problemático te retira de funciones críticas hasta rehabilitación y nueva valoración (2.1.5.21.1 a 2.1.5.21.3).",
          "Una declaración falsa ante el médico examinador se reporta a medicina aeronáutica (2.1.5.10.1).",
          "Los periodos de validez del médico se rigen hoy por el **RAC 67** (67.025); el RAC 2 conserva una tabla anterior, con valores distintos (2.1.5.19). Este tema se complementa con el RAC 67."
        ]
      },
      {
        "kind": "sub",
        "text": "Edad"
      },
      {
        "kind": "vinetas",
        "items": [
          "Mínimos: **17** años alumno piloto (con permiso de los padres si es menor de 18), **18** piloto privado y comercial, **21** piloto de transporte de línea (2.1.6, 2.2.1.11, 2.2.2.4(b)).",
          "Máximo: en servicios aéreos comerciales de transporte público nadie actúa como piloto al mando (PIC) ni como copiloto una vez cumplidos los **65 años**, y en tripulaciones de más de un piloto **solo uno puede tener más de 60** (2.2.1.11). Coincide con 121.1410(c) y (d).",
          "Excepción: el piloto comercial con habilitación de trabajos aéreos especiales o licencia de instructor puede seguir, limitado a esa actividad, hasta los **68 años**, si acredita 500 horas en esa actividad y mantiene médico Clase 1 (2.2.1.11.1)."
        ]
      },
      {
        "kind": "sub",
        "text": "Exámenes"
      },
      {
        "kind": "vinetas",
        "items": [
          "Los teóricos valen **1 año** y los prácticos **6 meses** para expedir la licencia (2.1.3.1.1). Nota mínima **70 %**, con reintentos a los 7, 15 y 30 días (2.1.3.1.4(e) y (f)).",
          "Un chequeo práctico fallado se repite cuando lo fije el inspector o ED, en máximo **6 meses**. Fraude: se anula y esperas **6 meses** (2.1.3.1.4(g) y (h)). Los chequeos para expedir una licencia o habilitación se presentan ante inspector de la Aerocivil o ED (2.1.16.2)."
        ]
      },
      {
        "kind": "sub",
        "text": "Bitácora de vuelo"
      },
      {
        "kind": "p",
        "text": "Cada piloto, copiloto e ingeniero de vuelo lleva su **bitácora personal**: fechas, aeronave y matrícula, trayectos, simulador, tiempo como alumno, copiloto y piloto autónomo (día, noche, instrumentos), totales y firmas. Mantenerla al día y veraz es tu responsabilidad, y se presenta a la Aerocivil cada vez que acreditas experiencia, con certificaciones del explotador (2.1.14). Las certificaciones de experiencia que emite la empresa deben estar respaldadas en sus archivos (2.2.1.1.7(c))."
      },
      {
        "kind": "sub",
        "text": "Cómo se cuenta tu tiempo de vuelo (2.2.1.4)"
      },
      {
        "kind": "vinetas",
        "items": [
          "Solo, doble comando y como PIC: se acredita completo para la licencia inicial o una superior (2.2.1.4.1).",
          "Copiloto en avión certificado para **un solo piloto**: se acredita el **50 %** (2.2.1.4.2).",
          "Copiloto en avión certificado **con copiloto** y PIC bajo supervisión: se acredita completo (2.2.1.4.3, 2.2.1.4.4).",
          "Tiempo en helicóptero cuenta al **50 %** para la licencia de transporte de línea de avión (2.2.1.4.5). Las horas en Fuerzas Militares o Policía son válidas (2.2.1.4.7)."
        ]
      },
      {
        "kind": "sub",
        "text": "Alumno piloto y piloto privado"
      },
      {
        "kind": "p",
        "text": "Son la base de la carrera, no las licencias con las que entras a una aerolínea. El alumno piloto necesita 17 años, matrícula en un centro de instrucción y médico Clase 2 (2.2.2.3, 2.2.2.4). El piloto privado avión (PPA) necesita mínimo **50 horas** de vuelo más 10 h de simulador (2.2.3.3) y vuela como PIC o copiloto **sin remuneración** (2.2.3.9)."
      },
      {
        "kind": "sub",
        "text": "Piloto comercial avión (PCA)"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Experiencia**: mínimo **200 horas** (2.2.5.3):"
        ]
      },
      {
        "kind": "table",
        "head": [
          "Fase",
          "Horas"
        ],
        "rows": [
          [
            "Presolo",
            "15"
          ],
          [
            "Doble comando en maniobras",
            "30"
          ],
          [
            "Solo en maniobras (incluye 30 min del primer solo)",
            "35"
          ],
          [
            "Instrumentos en avión (5 nocturnas locales con 5 despegues y aterrizajes; máx. 10 en dispositivo)",
            "40"
          ],
          [
            "Crucero doble comando (un crucero de 540 km / 300 NM y dos aterrizajes fuera de la base)",
            "40"
          ],
          [
            "Crucero solo (un crucero de 540 km / 300 NM con aterrizajes fuera de la base)",
            "40"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "Además, **30 horas** en dispositivo de instrucción o entrenador por instrumentos; hasta 10 h de las de doble comando pueden ser en planeador, si el programa lo aprueba (2.2.5.3)."
      },
      {
        "kind": "vinetas",
        "items": [
          "La instrucción incluye gestión de amenazas y errores (TEM) y vuelo con potencia asimétrica para multimotores (2.2.5.2.2). El PCA y el PTL llevan la habilitación **IFR incorporada** a la licencia (2.2.1.2.2.5).",
          "**Atribuciones** (2.2.5.9): las del privado; PIC de cualquier avión en vuelos que **no** sean de transporte aéreo comercial regular; PIC en transporte comercial **no regular** en un avión con habilitación de tipo vigente; y **copiloto** en transporte comercial regular y no regular en aviones que requieren copiloto. Todo condicionado a tus habilitaciones y al médico vigente.",
          "**Habilitaciones hasta 5.700 kg**: no hay habilitación de tipo; son por clase (monomotor, piloto multimotor, copiloto multimotor), pistón o turbohélice, con chequeo anual vigente (2.2.5.7.1). Entrenamiento mínimo: 3 h en monomotor y 6 h en multimotor; para **piloto** de multimotor, **300 horas** totales (2.2.5.7.1.1.1).",
          "**Copiloto de más de 5.700 kg**: habilitación **por tipo**, según el programa del operador, con chequeo ante inspector o ED (2.2.5.7.1.1.2, 2.2.5.7.2.4).",
          "**Piloto de relevo en crucero** (vuelos de **más de 6 horas** de cuña a cuña): entrenamiento en silla izquierda, mínimo 2 periodos de 2 h en simulador, chequeo y recurrente anual, anotado en la licencia (2.2.5.7.5)."
        ]
      },
      {
        "kind": "sub",
        "text": "Piloto de transporte de línea avión (PTL)"
      },
      {
        "kind": "vinetas",
        "items": [
          "Es la licencia para ser **comandante** en transporte aéreo comercial regular y no regular en aviones de **más de 5.700 kg** (2.2.7). Requiere ser PCA, **21 años** y médico Clase 1 (2.2.1.11, 2.2.7.8).",
          "**Experiencia**: **1.500 horas** totales en avión (PIC o copiloto), incluidas las de escuela. Hasta 100 horas pueden ser de dispositivo de instrucción, y de ellas no más de 25 en entrenador de vuelo (2.2.7.3). Dentro de las 1.500 (2.2.7(b), texto de 2019): 500 h como **copiloto** o 250 h como PIC; 200 h de crucero, de ellas al menos 100 como piloto o copiloto; 75 h de instrumentos, máximo 30 en simulador o dispositivo aprobado; 100 h de vuelo **nocturno** como PIC o copiloto."
        ]
      },
      {
        "kind": "p",
        "text": "**Ojo:** el RAC 2 trae dos redacciones. La de 2019 (2.2.7(b)) es la de arriba; la de 2008 (2.2.7.3) pide «500 horas como piloto al mando bajo supervisión» y 100 h de crucero bajo supervisión. Si te lo preguntan, cita la de 2019 y confirma con la Aerocivil cuál aplica a tu trámite."
      },
      {
        "kind": "list",
        "items": [
          "Pericia en multimotor con copiloto: procedimientos IFR con falla simulada de motor, anormales y emergencias, coordinación de tripulación e incapacitación, y comunicación eficaz con la tripulación, es decir, gestión de recursos de tripulación (CRM) (2.2.7.2, 2.2.7.4.1).",
          "**Entrenamiento orientado a la línea (LOFT)**: dos trayectos representativos del operador en tiempo real, uno normal y otro con anormalidad o emergencia, con tripulación completa (2.2.7.5).",
          "**Experiencia operacional y chequeos de ruta**: las primeras **5 horas**, con al menos **3 despegues y 3 aterrizajes**, bajo instructor; el resto con piloto chequeador; el último trayecto ante inspector o ED (2.2.7.6).",
          "**Habilitaciones por tipo**, con entrenamiento y chequeo **en simulador** salvo que no exista para el tipo (2.2.7.7, 2.2.7.7.1).",
          "**Atribuciones**: las del privado y el comercial, más PIC o copiloto en transporte aéreo comercial **regular** (2.2.7.10).",
          "Piloto de relevo en crucero: igual que el PCA, pero en **silla derecha** (2.2.7.7.3)."
        ]
      },
      {
        "kind": "sub",
        "text": "Habilitación de tipo"
      },
      {
        "kind": "vinetas",
        "items": [
          "Se exige tipo en aviones de **más de 5.700 kg**, en todo avión certificado para **dos pilotos** y cuando la Aerocivil lo decida (2.2.1.2.2.4).",
          "El entrenamiento cubre procedimientos normales, anormales y de emergencia, IFR, cortante de viento a baja altura, incapacitación y coordinación de la tripulación, y **prevención y recuperación de la pérdida de control** (2.2.1.3.2(a)).",
          "**Tipo sin experiencia operacional** en simulador nivel D o superior: escuela de tierra con examen, los periodos de simulador del fabricante, un chequeo LOFT y la prueba de pericia. La licencia queda anotada, por ejemplo «/A320 sin experiencia operacional/», y solo vuelas en línea mientras haces o después de hacer la experiencia operacional con el explotador (2.2.1.3.2(b), 2.2.5.11, 2.2.7.7.1.1).",
          "**Curso de cooperación de tripulación múltiple (MCC)**: obligatorio antes de empezar un tipo multipiloto; **25 h** de teoría y **20 h** prácticas (15 en curso integrado PTL; pueden bajar a no menos de 10 si se combina con el tipo en el mismo simulador), terminado en **6 meses** (Apéndice D del Capítulo II)."
        ]
      },
      {
        "kind": "sub",
        "text": "Chequeos y entrenamiento periódico"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Definiciones** (2.2.1.1.4(a)): el **chequeador (CHK)** es el instructor designado por el explotador y autorizado por la Aerocivil (equivale al inspector del explotador de los LAR); el **mes base** es el mes en que te toca el entrenamiento o chequeo; el **periodo de elegibilidad** son 3 meses (el anterior, el mes base y el siguiente) y lo hecho en él cuenta como hecho en el mes base.",
          "PTL, pilotos y copilotos PCA: **dos veces cada 12 meses calendario**, con intervalos de **5 a 7 meses**, repaso de tierra, entrenamiento de vuelo y **verificación de competencia** (chequeo de proeficiencia) ante inspector, ED o CHK (2.2.1.1.4(b), 2.2.5.10, 2.2.7.11).",
          "Formato en aviones (2.2.1.1.4.1): más de 19 sillas y más de 5.700 kg, con simulador: ambos entrenamientos en **simulador**, cada uno con **2 periodos de al menos 2 horas** (entrenamiento y chequeo); 19 sillas o menos o 5.700 kg o menos, con simulador: el primero en avión, simulador o dispositivo y el segundo en simulador, también 2 periodos de 2 horas; sin simulador: el segundo en el avión, con periodos de al menos **1:30** horas.",
          "Durante entrenamientos y chequeos **no se llevan pasajeros ni carga** y el plan de vuelo se presenta como vuelo local (2.2.1.1.4.3).",
          "**Entrenamientos especiales** del programa del operador (2.2.1.1.6): emergencia y evacuación en tierra, cada año; amaraje (ditching), cada 2 años si vuelas sobre el mar; CRM, cada 2 años como máximo; LOFT de al menos 2 horas, una vez cada 3 repasos y no más de cada 2 años; mercancías peligrosas y operaciones con tiempo de desviación extendido (ETOPS), cada 2 años como máximo."
        ]
      },
      {
        "kind": "sub",
        "text": "Experiencia reciente y recobro de autonomía"
      },
      {
        "kind": "vinetas",
        "items": [
          "Regla general: si interrumpes el vuelo **90 días o más**, haces el reentrenamiento del caso (2.2.1.10). Si pierdes la autonomía en un avión, quedas suspendido en él, incluso como copiloto, hasta recobrarla (2.2.1.5).",
          "**PCA** (2.2.5.8): para tener los mandos en despegue y aterrizaje, necesitas haberlo hecho en los **90 días** previos en el mismo tipo; PIC que vuelve tras un receso de 90 días: 3 despegues y 3 aterrizajes ante un CHK; receso de más de 90 y menos de 360 días: repaso de tierra y un periodo de 2 horas ante un CHK; 360 días o más: repaso de tierra, dos periodos de 2 horas con instructor y chequeo de proeficiencia.",
          "**PTL** (2.2.7.9): a los 3 meses: 3 despegues y aterrizajes ante inspector, ED o chequeador; de 3 a 6 meses: repaso de tierra y un periodo de 2 horas; de 6 a 12 meses: repaso de tierra, dos periodos de 2 horas y chequeo; de 12 a 60 meses: tierra de al menos 16 horas, 4 periodos de 2 horas (con LOFT si aplica) y chequeo; más de 60 meses: entrenamiento inicial completo."
        ]
      },
      {
        "kind": "sub",
        "text": "Competencia lingüística (inglés)"
      },
      {
        "kind": "vinetas",
        "items": [
          "Si usas radiotelefonía en **operaciones internacionales**, necesitas la habilitación de competencia lingüística (2.1.9.1); para PCA y PTL, **Nivel IV (Operacional)** desde el 30 de marzo de 2013 (2.2.5.7.4, 2.2.7.7.2).",
          "Reevaluación: Nivel IV cada **3 años**, Nivel V cada **6 años**, Nivel VI no se reevalúa (2.1.9.1.4; Apéndice C, 2.3.1 a 2.3.3). Si no alcanzas el Nivel IV, repites la prueba tras **2 meses** (Apéndice C, 2.3.4).",
          "Para obtener cualquier licencia debes hablar y entender español (2.1.9)."
        ]
      },
      {
        "kind": "sub",
        "text": "Convalidación y licencias extranjeras"
      },
      {
        "kind": "vinetas",
        "items": [
          "La Aerocivil convalida licencias de Estados de la Organización de Aviación Civil Internacional (OACI) mediante una autorización en licencia provisional, sin exceder la validez de la extranjera (2.1.7).",
          "Tres vías (2.1.7.1): personal extranjero transitorio que viene a instruir; quien se establece en Colombia (pilotos: examen teórico ante la Aerocivil y práctico ante inspector o ED); y tripulantes no residentes de empresas colombianas fuera del país (licencia provisional limitada a tipo, explotador y fecha).",
          "Los cursos hechos en el exterior solo sirven para habilitaciones de tipo; para una licencia se exige también la licencia extranjera y su convalidación (2.1.16.5)."
        ]
      },
      {
        "kind": "sub",
        "text": "Otras reglas de cabina"
      },
      {
        "kind": "vinetas",
        "items": [
          "El PIC no ocupa el asiento del copiloto ni al revés, salvo chequeador, instructor del equipo o piloto de relevo en crucero (2.2.1.6).",
          "Tu licencia de piloto te habilita como radiotelefonista, navegante y despachador de la aeronave en que estás habilitado (2.2.1.8)."
        ]
      },
      {
        "kind": "titulo",
        "text": "Datos importantes"
      },
      {
        "kind": "table",
        "head": [
          "Tema",
          "Valor",
          "Numeral"
        ],
        "rows": [
          [
            "Edad mínima",
            "17 alumno · 18 PPA y PCA · 21 PTL",
            "2.1.6, 2.2.1.11"
          ],
          [
            "Edad máxima en transporte público",
            "65 años; en tripulación múltiple solo uno mayor de 60",
            "2.2.1.11"
          ],
          [
            "Médico",
            "Clase 2: alumno y PPA · Clase 1: PCA y PTL",
            "2.2.2.3, 2.2.3.6, 2.2.5.6, 2.2.7.8"
          ],
          [
            "Ampliación del médico",
            "Hasta 45 días",
            "2.1.5.4"
          ],
          [
            "Reportar pérdida de aptitud",
            "Más de 20 días, medicación continua u hospitalización",
            "2.1.5.20.4"
          ],
          [
            "Experiencia PPA",
            "50 h + 10 h de simulador",
            "2.2.3.3"
          ],
          [
            "Experiencia PCA",
            "200 h + 30 h de dispositivo",
            "2.2.5.3"
          ],
          [
            "Experiencia PTL",
            "1.500 h; 500 copiloto o 250 PIC; 200 crucero; 75 instrumentos; 100 noche",
            "2.2.7, 2.2.7.3"
          ],
          [
            "Piloto multimotor hasta 5.700 kg",
            "300 h totales",
            "2.2.5.7.1.1.1"
          ],
          [
            "Chequeo de proeficiencia",
            "2 veces cada 12 meses, intervalos de 5 a 7 meses",
            "2.2.1.1.4(b)"
          ],
          [
            "Periodo de elegibilidad",
            "3 meses alrededor del mes base",
            "2.2.1.1.4(a)"
          ],
          [
            "CRM, DG, ETOPS",
            "Máximo cada 2 años",
            "2.2.1.1.6"
          ],
          [
            "Emergencias y evacuación",
            "Cada año",
            "2.2.1.1.6"
          ],
          [
            "Receso que obliga a reentrenar",
            "90 días o más",
            "2.2.1.10"
          ],
          [
            "MCC",
            "25 h teoría + 20 h práctica, en 6 meses",
            "Apéndice D"
          ],
          [
            "Relevo en crucero",
            "Vuelos de más de 6 h",
            "2.2.5.7.5.2, 2.2.7.7.3.1"
          ],
          [
            "Inglés",
            "Nivel IV cada 3 años · Nivel V cada 6 · Nivel VI sin reevaluar",
            "2.1.9.1.4"
          ],
          [
            "Validez de exámenes",
            "Teórico 1 año · práctico 6 meses",
            "2.1.3.1.1"
          ],
          [
            "Nota mínima",
            "70 %; reintentos a 7, 15 y 30 días",
            "2.1.3.1.4"
          ],
          [
            "Licencia provisional",
            "Máximo 180 días",
            "2.1.13.2"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Hasta el 31/08/2027 tu licencia de piloto se rige por el RAC 2, Capítulos I y II; luego se reemplaza de oficio por la del RAC 61.",
          "PCA: 200 horas, Clase 1, IFR incorporada; es copiloto de línea y PIC de no regulares.",
          "PTL: 1.500 horas, 21 años, LOFT y chequeos de ruta; es la licencia de comandante de aerolínea.",
          "Dos chequeos de proeficiencia al año, con 5 a 7 meses entre ellos; CRM, mercancías peligrosas y LOFT cada 2 años como máximo.",
          "Con 90 días sin volar pierdes la autonomía y necesitas reentrenamiento; el remedio crece con el tiempo parado.",
          "Portas la licencia, llevas la bitácora al día, dejas de volar si tu salud baja y nunca vuelas bajo sustancias psicoactivas.",
          "En transporte público, 65 años es el tope, y en tripulación múltiple solo uno puede pasar de 60."
        ]
      }
    ]
  },
  {
    "n": 2,
    "title": "RAC 61 · Licencias para pilotos y sus habilitaciones",
    "kicker": "Tu licencia y tu aptitud",
    "minutes": 9,
    "blocks": [
      {
        "kind": "p",
        "text": "Enmienda 8, septiembre de 2022 (Resolución 01884 del 30 de agosto de 2022; texto base: Resolución 02819 del 31 de diciembre de 2020). Transición ampliada al 31 de agosto de 2027 por la Resolución 02543 del 6 de agosto de 2026."
      },
      {
        "kind": "titulo",
        "text": "¿De qué trata?"
      },
      {
        "kind": "p",
        "text": "Define las licencias de piloto en Colombia, qué necesitas para obtener cada una (edad, médico, horas, exámenes), qué te permite hacer y qué debes cumplir para seguir ejerciéndola: habilitaciones, chequeos, experiencia reciente, inglés y límites de edad. También regula la bitácora y la convalidación de licencias extranjeras. De aquí salen las preguntas de entrevista del tipo «¿cuántas horas?», «¿cada cuánto?» y «¿hasta qué edad?»."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber un piloto"
      },
      {
        "kind": "sub",
        "text": "Cuándo empieza a aplicar"
      },
      {
        "kind": "p",
        "text": "**Todavía no es la norma de tu licencia.** La Resolución 02543 del 6 de agosto de 2026 (Diario Oficial 53.586) amplió la transición: las licencias y habilitaciones del RAC 61, y lo necesario para mantenerlas vigentes, se tramitan desde el **31 de agosto de 2027**. Hasta esa fecha rigen el RAC 2, Capítulos I y II (ver su unidad). A más tardar el 31/08/2027, la Aerocivil reemplaza de oficio las licencias vigentes por las del RAC 61, en formato digital y sin costo, y debe publicar las instrucciones de implementación a más tardar el 31/12/2026 (Normas de transición, lit. a, b, d y q, según la Res. 02543 de 2026). Vale la pena estudiarlo ya: es la norma armonizada con la OACI y el LAR, y será la de tu licencia en pocos meses."
      },
      {
        "kind": "sub",
        "text": "Lo básico para volar"
      },
      {
        "kind": "p",
        "text": "Debes portar licencia vigente con sus habilitaciones (61.305(a)) y el certificado médico del RAC 67 que le corresponde (61.015(b)). La licencia es permanente, pero solo la ejerces con médico y habilitaciones vigentes, experiencia reciente y el repaso o el programa de entrenamiento del explotador (61.060(a)(1)). Con **24 meses o más** sin volar pierdes las atribuciones: para recuperarlas, médico, exámenes teóricos, reentrenamiento certificado y prueba de pericia (61.060(a)(2)). Para volar IFR en avión necesitas habilitación de instrumentos o licencia PTL (61.015(d)(1))."
      },
      {
        "kind": "sub",
        "text": "Las licencias (y una trampa de siglas)"
      },
      {
        "kind": "p",
        "text": "Alumno piloto (APA), piloto privado (PPA), piloto comercial (PCA), piloto de transporte de línea aérea (PTL), planeador (PPL), globo libre (PGL), ultraliviano (PUL) y piloto a distancia (61.305(c)). Ojo: en el RAC 61 **«PPL» es planeador**, no privado. La licencia de tripulación múltiple (MPL) **no existe** en Colombia: su capítulo está reservado (61.700 a 61.795)."
      },
      {
        "kind": "p",
        "text": "**Privado (PPA)**: 18 años, médico Clase 2 (61.505). En avión, 40 h, con 20 de doble comando, 10 de solo, una travesía de 150 NM y 3 h nocturnas (61.520(a)). Vuela como piloto al mando (PIC) o copiloto **sin remuneración** (61.530(a)) y no tiene edad máxima (61.540)."
      },
      {
        "kind": "sub",
        "text": "Piloto comercial (PCA)"
      },
      {
        "kind": "vinetas",
        "items": [
          "18 años, PPA vigente, médico **Clase 1** e inglés demostrado (61.605).",
          "Avión: **150 h** en un centro de instrucción certificado, con mínimo 70 h de PIC, 20 h de travesía como PIC (incluido un vuelo de 300 NM con aterrizajes en dos aeródromos), 10 h de instrucción por instrumentos (máximo 5 en simulador) y, para volar de noche, 5 h nocturnas con 5 despegues y 5 aterrizajes como PIC (61.620(a)(1)). El dispositivo de simulación (FSTD) cuenta máximo 10 h del total (61.620(a)(3)).",
          "Te permite ser PIC fuera del transporte aéreo comercial, PIC en transporte comercial **solo en aeronaves de un piloto** y **copiloto** en aeronaves que lo requieran (61.630(a))."
        ]
      },
      {
        "kind": "p",
        "text": "«Travesía» es lo que el RAC también llama «vuelo de crucero»: de un punto a otro por una ruta preestablecida (61.001)."
      },
      {
        "kind": "sub",
        "text": "Piloto de transporte de línea aérea (PTL)"
      },
      {
        "kind": "vinetas",
        "items": [
          "21 años, PCA vigente **con habilitación multimotor**, médico Clase 1 e inglés (61.805).",
          "Avión: **1.500 h**, que incluyan 500 h como piloto al mando bajo supervisión o 250 h como PIC (o 70 h de PIC más lo que falte bajo supervisión), 200 h de travesía, 100 h nocturnas y 75 h de instrumentos, máximo 30 en FSTD (61.820(a)).",
          "Entrenamiento y prueba de pericia en simulador aprobado; en el avión solo si no hay simulador, y sin pasajeros ni carga (61.815(a)). La pericia se demuestra como PIC de un multimotor de dos pilotos, incluidos vuelo manual, manejo de la automatización e incapacitación de un tripulante (61.825).",
          "Te permite ser **PIC en transporte aéreo comercial de aeronaves de más de un piloto**, además de todo lo del PCA y de la habilitación de instrumentos (61.830(a))."
        ]
      },
      {
        "kind": "sub",
        "text": "Habilitaciones"
      },
      {
        "kind": "list",
        "items": [
          "**Clase** (aviones de un piloto): monomotor o multimotor, terrestre o hidroavión (61.305(d)(2)).",
          "**Tipo**: obligatoria en aeronaves certificadas para dos pilotos, aviones turbopropulsados, todos los helicópteros y las que la UAEAC determine. Puede quedar limitada a copiloto o a piloto de relevo en crucero (61.305(d)(3)).",
          "Sin la clase o el tipo requerido no eres ni PIC ni copiloto (61.305(e)).",
          "**Tipo en un avión de dos pilotos**: experiencia supervisada en el avión o simulador según el programa del explotador (incluida la prevención y recuperación de pérdida de control, UPRT), pericia como PIC o copiloto, conocimientos de nivel PTL y, antes, la clase multimotor (61.310(d)).",
          "**Tipo «limitado a la experiencia operacional»**: se puede sacar en simulador nivel D con escuela de tierra, los periodos del fabricante, un chequeo, un LOFT y prueba de pericia; solo la usas en línea mientras cumples o después de cumplir la experiencia operacional (61.305(d)(7)). Mientras tanto, la UAEAC puede darte licencia provisional de 180 días, prorrogable 90 (61.050).",
          "**Instrumentos (IR)**: mínimo PPA, 50 h de PIC en travesía y 40 h de instrumentos (máximo 20 en FSTD, al menos 10 de doble mando) (61.315(a), (c) y (d))."
        ]
      },
      {
        "kind": "sub",
        "text": "Copiloto de aerolínea"
      },
      {
        "kind": "p",
        "text": "Necesitas como mínimo PCA con el tipo, IR para vuelos IFR, experiencia supervisada en el tipo o simulador y conocimientos **de nivel PTL** (61.130(a)). En operaciones con certificado de operación (CDO) se cumplen los requisitos que fije el explotador (61.130(b))."
      },
      {
        "kind": "sub",
        "text": "Chequeos periódicos"
      },
      {
        "kind": "vinetas",
        "items": [
          "PTL, y piloto o copiloto PCA en operación comercial (RAC 121, 135, 137 o 138): **dos veces cada 12 meses calendario**, con intervalos de 5 a 7 meses, entrenamiento en simulador (FFS), avión o entrenador (FTD) y verificación de la competencia ante inspector, examinador designado (ED) o chequeador (CHK); más un curso de tierra al año (61.136(a)). En RAC 121 con simulador, cada vez son dos periodos de al menos 2 h: entrenamiento y chequeo (61.136(b)(1)).",
          "**Período de elegibilidad**: el mes anterior al mes base, el mes base y el siguiente; lo que hagas ahí cuenta como hecho en el mes base (61.001).",
          "En entrenamientos y chequeos nunca van pasajeros ni carga (61.136(e))."
        ]
      },
      {
        "kind": "sub",
        "text": "Experiencia reciente"
      },
      {
        "kind": "vinetas",
        "items": [
          "**PIC**: 3 despegues y 3 aterrizajes en 90 días como único a los mandos, en la misma categoría, clase y tipo; si no, te rehabilita un instructor (61.140(a)).",
          "**PIC de noche con personas a bordo**: 3 y 3 hasta la detención completa en 90 días (61.140(b)). El texto no dice expresamente que esos despegues y aterrizajes deban ser de noche.",
          "**PIC en IFR**: 6 h de instrumentos en 6 meses (3 en la categoría) con al menos 6 aproximaciones, o una verificación de competencia (61.140(c)).",
          "**Copiloto**: 3 y 3 hasta la detención completa en 90 días, y emergencias del manual dos veces al año, que en avión se pueden aprobar en simulador (61.130(a)(6))."
        ]
      },
      {
        "kind": "sub",
        "text": "Límites de edad en transporte aéreo comercial"
      },
      {
        "kind": "vinetas",
        "items": [
          "**PTL como PIC**: menos de 60 años, o menos de 65 en tripulación de más de un piloto si el copiloto tiene menos de 60 (61.835(a)).",
          "**PCA como PIC**: con un piloto, menos de 60 en vuelo internacional y menos de 65 en nacional; con más de un piloto, las mismas reglas del PTL (61.635(a)). **PCA como copiloto**: menos de 65, si el piloto tiene menos de 60 (61.635(b)).",
          "Al llegar al límite, la UAEAC suspende esas atribuciones (61.835(b))."
        ]
      },
      {
        "kind": "sub",
        "text": "Inglés"
      },
      {
        "kind": "vinetas",
        "items": [
          "Con **nivel 4** como mínimo puedes tripular vuelos cuyos destinos, alternos o rutas exijan inglés (61.165(a)(3)). El nivel se anota en la licencia (61.165(a)(4)).",
          "Reevaluación: nivel 4 cada **3 años**, nivel 5 cada **6 años**, nivel 6 nunca (61.165(c)).",
          "El nivel 4 se exige en los seis descriptores: pronunciación, estructura, vocabulario, fluidez, comprensión e interacciones (Apéndice 2, (b)). PCA y PTL deben demostrarlo (61.605(c); 61.805(c))."
        ]
      },
      {
        "kind": "sub",
        "text": "La bitácora"
      },
      {
        "kind": "p",
        "text": "Tu experiencia se prueba con la bitácora y las certificaciones del explotador o del centro de instrucción (61.120(a))."
      },
      {
        "kind": "vinetas",
        "items": [
          "**Tiempo de vuelo** en avión: desde que se mueve para despegar hasta que se detiene al final con motores apagados; no cuenta la APU (61.001).",
          "**PIC**: el PPA o PCA lo anota solo cuando es el único a los mandos o el único ocupante; el PTL, todo el tiempo en que actúa como PIC (61.120(c)(2)).",
          "**Copiloto**: todo el tiempo en aeronaves que requieran más de un piloto (61.120(c)(3)).",
          "**Para una licencia superior**: copiloto en aeronave certificada con copiloto y piloto al mando bajo supervisión cuentan al 100 %; copiloto en aeronave de un piloto a la que la UAEAC exige copiloto, máximo 50 % (61.120(c)(6)).",
          "Falsear la bitácora es causal de suspensión o cancelación de la licencia (61.150)."
        ]
      },
      {
        "kind": "sub",
        "text": "Exámenes"
      },
      {
        "kind": "p",
        "text": "El teórico se aprueba con **75 %** (85 % para instructor) y se repite a los 30 días (61.085). Debe estar aprobado dentro de los 12 meses anteriores a la prueba de pericia (61.095(a)). Una pericia reprobada no se repite antes de 30 días (61.115)."
      },
      {
        "kind": "sub",
        "text": "Licencias extranjeras"
      },
      {
        "kind": "p",
        "text": "La UAEAC puede convalidar una licencia de otro Estado OACI, limitada en tiempo y atribuciones, nunca por más tiempo que la extranjera (61.025(c) y (d)). Pide bitácora con experiencia reciente, examen de diferencias con los RAC, español e inglés, y prueba de pericia (61.025(f)). El médico extranjero solo sirve para convalidaciones de hasta 3 meses (61.025(i), Nota)."
      },
      {
        "kind": "sub",
        "text": "Médico, sustancias y suspensión"
      },
      {
        "kind": "vinetas",
        "items": [
          "Médico: Clase 2 para alumno y privado, Clase 1 para PCA y PTL. Su validez está en el RAC 67, sección 67.025 (61.065).",
          "Si sabes o sospechas que ya no cumples el RAC 67, no vuelas aunque el certificado esté vigente, y lo informas de inmediato a la UAEAC (61.125).",
          "Negarte a una prueba de sustancias psicoactivas: rechazo de solicitudes por al menos 1 año y suspensión inmediata (61.045(d)). Esto se complementa con el RAC 120 y las sanciones con el RAC 13.",
          "Sin médico vigente la licencia se inactiva (61.040(f)); también puede suspenderse o cancelarse como sanción (61.040(g))."
        ]
      },
      {
        "kind": "p",
        "text": "Los tiempos de vuelo, servicio y descanso de las tripulaciones de aerolínea no están en este RAC: viven en el RAC 121."
      },
      {
        "kind": "titulo",
        "text": "Datos importantes"
      },
      {
        "kind": "table",
        "head": [
          "Dato",
          "Valor",
          "Numeral"
        ],
        "rows": [
          [
            "Edad mínima",
            "Alumno 17 · PPA 18 · PCA 18 · PTL 21",
            "61.405, 61.505, 61.605, 61.805"
          ],
          [
            "Médico",
            "Alumno y PPA: Clase 2 · PCA y PTL: Clase 1",
            "61.405, 61.505, 61.605, 61.805"
          ],
          [
            "PPA avión",
            "40 h",
            "61.520(a)"
          ],
          [
            "PCA avión",
            "150 h: 70 PIC, 20 travesía, 10 instrumentos",
            "61.620(a)"
          ],
          [
            "PTL avión",
            "1.500 h: 250 PIC (o 500 bajo supervisión), 200 travesía, 100 noche, 75 instrumentos",
            "61.820(a)"
          ],
          [
            "IR",
            "50 h PIC travesía, 40 h instrumentos",
            "61.315(d)"
          ],
          [
            "Tope de simulador",
            "PPA 5 h · PCA 10 h · IR 20 h · PTL 30 h de instrumentos",
            "61.520, 61.620, 61.315, 61.820"
          ],
          [
            "Recencia PIC y copiloto",
            "3 despegues y 3 aterrizajes en 90 días",
            "61.140(a), 61.130(a)(6)"
          ],
          [
            "Recencia IFR",
            "6 h y 6 aproximaciones en 6 meses, o chequeo",
            "61.140(c)"
          ],
          [
            "Chequeos en operación comercial",
            "2 cada 12 meses (intervalo de 5 a 7) + curso de tierra anual",
            "61.136(a)"
          ],
          [
            "Inglés",
            "Nivel 4 mínimo · N4 cada 3 años · N5 cada 6 · N6 sin reevaluación",
            "61.165"
          ],
          [
            "Edad PIC comercial (PTL)",
            "Menos de 60; menos de 65 con copiloto menor de 60",
            "61.835"
          ],
          [
            "Edad copiloto (PCA)",
            "Menos de 65 con piloto menor de 60",
            "61.635(b)"
          ],
          [
            "Edad PPA",
            "Sin máximo",
            "61.540"
          ],
          [
            "Inactividad",
            "24 meses: pierdes las atribuciones",
            "61.060(a)(2)"
          ],
          [
            "Licencia provisional",
            "180 días + hasta 90",
            "61.050"
          ],
          [
            "Examen teórico",
            "75 %; repetir a los 30 días",
            "61.085"
          ],
          [
            "Sustancias: negarse a la prueba",
            "Rechazo 1 año o más + suspensión",
            "61.045(d)"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Aplica desde el 31/08/2027 (Res. 02543 de 2026); hasta entonces tu licencia se rige por el RAC 2.",
          "La licencia es permanente, pero sin médico, habilitaciones, chequeos y recencia no la puedes ejercer.",
          "PCA: 18 años, Clase 1, 150 h; copiloto de aerolínea y PIC comercial solo en aeronaves de un piloto.",
          "PTL: 21 años, 1.500 h y multimotor; PIC comercial en aeronaves de dos pilotos.",
          "Copiloto de aerolínea: PCA, tipo, IR y conocimientos de nivel PTL.",
          "Chequeo dos veces cada 12 meses; recencia de 3 despegues y 3 aterrizajes en 90 días.",
          "Inglés nivel 4 mínimo, reevaluado cada 3 años (nivel 5, cada 6).",
          "PTL como PIC en transporte comercial: menos de 60, o menos de 65 con copiloto menor de 60. En Colombia no existe la MPL."
        ]
      }
    ]
  },
  {
    "n": 3,
    "title": "RAC 67 · Certificado médico",
    "kicker": "Tu licencia y tu aptitud",
    "minutes": 9,
    "blocks": [
      {
        "kind": "p",
        "text": "Enmienda 4, mayo de 2025 (Resolución 00995 del 08 de mayo de 2025, publicada y en vigor desde el 09 de mayo de 2025)."
      },
      {
        "kind": "titulo",
        "text": "¿De qué trata?"
      },
      {
        "kind": "p",
        "text": "El RAC 67 define qué tan sano tienes que estar para volar, cómo se certifica y qué haces cuando tu salud cambia. Fija las clases de certificado médico, cuánto dura cada una según tu licencia y tu edad, los requisitos físicos, mentales, visuales y auditivos, y tus obligaciones como titular. Para un piloto que va a una aerolínea lo central es la Clase 1: sin ella vigente y sin restricciones, tu licencia comercial no te sirve para volar."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber un piloto"
      },
      {
        "kind": "sub",
        "text": "Qué clase de certificado necesitas"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Clase 1**: piloto comercial (PCA) de avión, dirigible, helicóptero y aeronave de despegue vertical, y piloto de transporte de línea aérea (PTL) de avión, helicóptero y aeronave de despegue vertical (67.020(a)).",
          "**Clase 2**: piloto privado (PPA), alumno piloto (APA), piloto de planeador, piloto de globo libre, piloto de ultraliviano, navegante, ingeniero de vuelo y tripulante de cabina de pasajeros (TCP) (67.020(b)).",
          "**Clase 3**: controlador de tránsito aéreo y alumno controlador, entre otros (67.020(c))."
        ]
      },
      {
        "kind": "p",
        "text": "La Clase 1 cubre la 2 y la 3, y la Clase 2 cubre la 3 (67.020, Nota). Dos detalles que suelen preguntar: el piloto privado que quiere la habilitación de vuelo por instrumentos (IFR) debe cumplir además los requisitos de **visión y audición de la Clase 1** (67.020(b)(3)), y los alumnos de pilotaje comercial deben cumplir la agudeza visual de Clase 1 (67.310(b)(2), Nota)."
      },
      {
        "kind": "p",
        "text": "Ojo con las siglas: en el RAC el privado de avión es PPA y el comercial PCA. En el RAC 67, «PPL» es la licencia de **piloto de planeador** (67.020(b)(4))."
      },
      {
        "kind": "sub",
        "text": "Cuánto dura tu certificado"
      },
      {
        "kind": "vinetas",
        "items": [
          "Clase 1: **12 meses** (67.025(a)(1)). Desde los **40 años**, el PCA y el PTL pasan a **6 meses** (67.025(b)).",
          "PCA en trabajos aéreos especiales o instrucción de vuelo que ya cumplió 65 años: sigue en 6 meses hasta los 68, pero cada examen incluye todo lo de una evaluación anual (67.025(c)).",
          "Clase 2: 12 meses en general; el piloto privado, el de planeador, el de globo y el TCP tienen **36 meses** (67.025(a)(2)). Desde los 40 años, el privado, el de globo y el de planeador bajan a 12 meses (67.025(d)).",
          "La vigencia se calcula con **tu edad el día del examen** (67.025(g)) y empieza a correr ese mismo día (67.025(h)).",
          "Puede acortarse si está clínicamente indicado (67.025(f)), o si el médico decide que necesitas controles más frecuentes; eso queda anotado en el certificado (67.030(c))."
        ]
      },
      {
        "kind": "sub",
        "text": "Renovar a tiempo y qué pasa si se vence"
      },
      {
        "kind": "list",
        "items": [
          "Si renuevas **dentro de los 45 días anteriores al vencimiento**, tu fecha de vencimiento se mantiene año tras año (67.025, Nota).",
          "Medicina Aeronáutica de la Aerocivil puede ampliar la vigencia a su discreción **hasta 45 días** (67.025(i)).",
          "Con el certificado vencido **no hay permisos provisionales**: tienes que volver a cumplir los requisitos (67.025(j)).",
          "Sin certificado vigente de la clase que corresponde a tu licencia no puedes ejercer sus atribuciones (67.015(c)).",
          "Para renovar se exige el mismo nivel de aptitud que para el certificado inicial (67.045(a)).",
          "Los exámenes de laboratorio valen **3 meses** desde que se hacen; las evaluaciones, pruebas psicotécnicas y conceptos de especialistas valen **1 año** (67.010(g)). Planea tu renovación con eso en mente."
        ]
      },
      {
        "kind": "sub",
        "text": "Cuándo dejas de estar apto aunque tu certificado esté vigente"
      },
      {
        "kind": "p",
        "text": "El RAC 67 enumera causas de **pérdida temporal** de la aptitud (67.030(b)):"
      },
      {
        "kind": "list",
        "items": [
          "accidente o enfermedad nueva, patología grave o cirugía mayor;",
          "reposo médico de **más de 20 días**;",
          "diagnóstico de embarazo;",
          "**los primeros 3 días** de todo tratamiento farmacológico nuevo, el uso de anestésicos y de sustancias con efectos secundarios de riesgo;",
          "causas fisiológicas como desorientación espacial, fatiga de vuelo, desincronosis (jet lag) o pérdida de conocimiento por fuerza G (G-LOC);",
          "trastornos de salud mental."
        ]
      },
      {
        "kind": "p",
        "text": "Si hay dudas sobre tu aptitud, Medicina Aeronáutica puede pedirte exámenes y suspender tus actividades de vuelo o de tierra (67.030(d)). Vuelves cuando demuestres que la condición fue tratada y cumples otra vez los requisitos (67.030(e))."
      },
      {
        "kind": "sub",
        "text": "Tu obligación de informar"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Tú eres el responsable principal** de reportar a Medicina Aeronáutica cualquier incumplimiento de requisitos o tratamiento, recetado o no, que pueda impedirte volar con seguridad. En cuanto sepas que tu aptitud disminuyó, **dejas de ejercer** las atribuciones de tu licencia (67.040(a)).",
          "Debes informar toda disminución de aptitud de **más de 20 días**, la que exija tratamiento continuo con medicamentos recetados o la que haya requerido hospitalización (67.040(d)).",
          "También reportan el médico examinador, la dependencia de licencias, el organismo de investigación de accidentes y las empresas del sector, incluido su servicio médico, aun en procesos de selección (67.040(b)).",
          "Si hay una **incapacitación súbita en vuelo**, la tripulación y la empresa la reportan de inmediato (67.040(c)).",
          "Si Medicina Aeronáutica te pide exámenes o presentarte y no respondes en **30 días calendario**, puede suspender tu certificado (67.010(f)). Negarte a entregar tu información médica puede llevar a suspenderlo, modificarlo o revocarlo (67.010(d))."
        ]
      },
      {
        "kind": "sub",
        "text": "Medicamentos, alcohol y sustancias"
      },
      {
        "kind": "vinetas",
        "items": [
          "Debes estar libre de efectos directos o secundarios de cualquier medicamento, recetado o no, que pueda interferir con la operación segura (67.090(a)(4)). La norma pide atención especial a anestésicos locales en procedimientos médicos u odontológicos, interacciones al iniciar o cambiar dosis o marca, y a la interacción con alcohol, cafeína o hierbas (67.090(a), Nota 2). Las hierbas medicinales y los tratamientos alternativos también cuentan (67.090(a), Nota 3).",
          "En Clase 1, un trastorno mental o del comportamiento por uso de sustancias psicoactivas, incluida la dependencia del alcohol, es descalificante (67.205(a)(1)(ii)).",
          "Debes estar dispuesto a demostrar **en cualquier momento**, con un examen de detección, que no consumes sustancias psicoactivas, y declarar si alguna vez las usaste indebidamente (67.205(a)(4)).",
          "Depresión con antidepresivos: en principio no apto; solo la Junta Médica puede dar una dispensa (67.205(a)(3)).",
          "Otros descalificantes de Clase 1 que conviene conocer: anticoagulantes orales (67.205(d)(12)) y diabetes tratada con insulina (67.205(h)(1))."
        ]
      },
      {
        "kind": "p",
        "text": "Este tema se complementa con el RAC 120 (exámenes toxicológicos y sus consecuencias)."
      },
      {
        "kind": "sub",
        "text": "Embarazo"
      },
      {
        "kind": "p",
        "text": "La piloto embarazada es **no apta temporal**. Con embarazo de bajo riesgo y controlado puede declararse apta desde el final de la **semana 12** hasta el final de la **semana 26**. Después del parto o del fin del embarazo no vuelve a volar hasta una nueva evaluación ginecológica y la decisión de Medicina Aeronáutica (67.205(n))."
      },
      {
        "kind": "sub",
        "text": "Visión, lentes y cirugía de ojos (Clase 1)"
      },
      {
        "kind": "list",
        "items": [
          "Agudeza lejana de **20/30 o mejor en cada ojo** y **20/20 binocular**, con o sin corrección; no hay límite sin corrección (67.210(b)(2)). En Clase 2 es 20/40 por ojo y 20/30 binocular (67.310(b)(2)).",
          "Si necesitas lentes, los usas siempre que vuelas y llevas **un par de repuesto** a mano (67.210(b)(2)). Un solo par de gafas debe servir para todas las distancias (67.210(d)).",
          "Lentes de contacto: **monofocales y sin color**, bien tolerados, y con repuesto a mano (67.210(e)). No se permite lente de contacto y gafas a la vez en el mismo ojo (67.210(f)).",
          "**Cirugía refractiva**: te declaran no apto salvo que no deje secuelas que interfieran con el vuelo (67.210(h)); toda cirugía oftálmica obliga al examinador a pedir informe del oftalmólogo (67.210(c)(5)).",
          "Visión de colores: si fallas las tablas pseudoisocromáticas y no distingues con rapidez los colores de la aviación, eres no apto. El que tiene una anomalía estudiada solo puede llegar a un certificado **Clase 2** con la restricción «Válido solo para operaciones diurnas» (67.090(b)(6) a (b)(8)).",
          "Las gafas de sol en vuelo deben ser **no polarizadas y de gris neutro** (67.090(b)(9))."
        ]
      },
      {
        "kind": "sub",
        "text": "Oído y exámenes periódicos (Clase 1)"
      },
      {
        "kind": "vinetas",
        "items": [
          "En audiometría de tono puro, sin audífonos, ningún oído puede perder más de **30 dB en 500, 1.000 o 2.000 Hz**, ni más de **50 dB en 3.000 Hz** (67.215(b)(1)).",
          "La audiometría se hace en el examen inicial y, si fue normal, al menos cada 2 años hasta los 40 y luego cada año (67.215(b)(1)). Si no alcanzas esos valores, aún puedes ser apto con una prueba de discriminación del lenguaje o una prueba en vuelo (67.215(b)(2) a (b)(4)).",
          "Electrocardiograma de reposo en el primer examen, cada 2 años entre los 30 y los 40 años y cada año después de los 40 (67.205(d)(4) a (d)(6)). Radiografía de tórax en el primer reconocimiento (67.205(e)(2))."
        ]
      },
      {
        "kind": "sub",
        "text": "El examen: lo que declaras"
      },
      {
        "kind": "vinetas",
        "items": [
          "Presentas una **declaración jurada** con tu historia médica, medicamentos, tratamientos alternativos y exámenes anteriores, y dices si alguna vez te negaron, revocaron o suspendieron un certificado (67.075(a) y (b)). **Toda declaración falsa u omisión se informa a la Aerocivil** (67.075(c)).",
          "Te examina un **médico examinador autorizado por la Aerocivil** (67.055(a)). Después de un incidente o accidente puede haber una certificación **extraordinaria** y una evaluación de tu aptitud psicológica (67.075(n); 67.100(a)(3)). Tu historial médico es confidencial (67.075(l))."
        ]
      },
      {
        "kind": "sub",
        "text": "Si te declaran no apto: dispensa y recursos"
      },
      {
        "kind": "vinetas",
        "items": [
          "Si no estás de acuerdo con el resultado del examinador, pides revisión a Medicina Aeronáutica (67.075(i)); también puedes pedir reconsideración de un «no apto» (67.200(e)).",
          "**Dispensa médica**: la decide una Junta Médica y fija limitaciones operacionales. Solo cubre requisitos físicos; en trastornos mentales exige primero normalizar el cuadro (67.035(b) y (c)). **No aplica para quien solicita un certificado por primera vez** (67.035, Nota 2). Puede incluir una prueba en vuelo o simulador (67.035(d)(3) y (f)) y se revoca si tu condición empeora, si no declaras tus limitaciones o si no entregas información verdadera (67.035(e)).",
          "Toda limitación de la que dependa tu seguridad se anota en la licencia y en el certificado (67.075(h)(3)).",
          "La decisión de no aptitud es un acto administrativo contra el que caben **reposición** (ante el Grupo Medicina Aeronáutica) y **apelación** (ante el Secretario de Autoridad Aeronáutica), según la Ley 1437 de 2011 (67.500 y 67.505)."
        ]
      },
      {
        "kind": "p",
        "text": "Límites de edad para volar en aerolínea: no están en el RAC 67. Este tema se complementa con el RAC 121 (121.1410(c) y (d)). Portar el certificado en vuelo: este tema se complementa con el RAC 91 (91.1310(a)(1)) y el RAC 13 (13.605(a))."
      },
      {
        "kind": "titulo",
        "text": "Datos importantes"
      },
      {
        "kind": "table",
        "head": [
          "Dato",
          "Valor",
          "Numeral"
        ],
        "rows": [
          [
            "Certificado para PCA y PTL",
            "Clase 1",
            "67.020(a)"
          ],
          [
            "Certificado para piloto privado y alumno piloto",
            "Clase 2",
            "67.020(b)"
          ],
          [
            "Piloto privado con IFR",
            "Visión y audición de Clase 1",
            "67.020(b)(3)"
          ],
          [
            "Vigencia Clase 1",
            "12 meses",
            "67.025(a)(1)"
          ],
          [
            "Vigencia Clase 1 (PCA/PTL con 40 años o más)",
            "6 meses",
            "67.025(b)"
          ],
          [
            "PCA en trabajos aéreos o instrucción, de 65 a 68 años",
            "6 meses, con contenido de examen anual",
            "67.025(c)"
          ],
          [
            "Vigencia Clase 2 (general)",
            "12 meses",
            "67.025(a)(2)"
          ],
          [
            "Vigencia Clase 2 (piloto privado, menor de 40)",
            "36 meses",
            "67.025(a)(2)(i)"
          ],
          [
            "Vigencia Clase 2 (piloto privado, 40 años o más)",
            "12 meses",
            "67.025(d)"
          ],
          [
            "Edad que cuenta para la vigencia",
            "La del día del examen",
            "67.025(g)"
          ],
          [
            "Renovación anticipada sin perder la fecha",
            "Hasta 45 días antes",
            "67.025, Nota"
          ],
          [
            "Ampliación discrecional de la vigencia",
            "Hasta 45 días",
            "67.025(i)"
          ],
          [
            "Permiso provisional con certificado vencido",
            "No existe",
            "67.025(j)"
          ],
          [
            "Validez de exámenes de laboratorio",
            "3 meses",
            "67.010(g)"
          ],
          [
            "Validez de evaluaciones, psicotécnicas y conceptos",
            "1 año",
            "67.010(g)"
          ],
          [
            "Plazo para responder a Medicina Aeronáutica",
            "30 días calendario",
            "67.010(f)"
          ],
          [
            "Reportar disminución de aptitud",
            "Más de 20 días, medicación continua u hospitalización",
            "67.040(d)"
          ],
          [
            "Inicio de un medicamento nuevo",
            "3 días sin aptitud",
            "67.030(b)(8)"
          ],
          [
            "Embarazo de bajo riesgo",
            "Apta de la semana 12 a la 26",
            "67.205(n)(2)"
          ],
          [
            "Agudeza visual Clase 1",
            "20/30 por ojo, 20/20 binocular",
            "67.210(b)(2)"
          ],
          [
            "Agudeza visual Clase 2",
            "20/40 por ojo, 20/30 binocular",
            "67.310(b)(2)"
          ],
          [
            "Lentes de contacto",
            "Monofocales, sin color, con repuesto",
            "67.210(e)"
          ],
          [
            "Gafas de sol",
            "No polarizadas, gris neutro",
            "67.090(b)(9)"
          ],
          [
            "Audición Clase 1",
            "≤30 dB en 500/1.000/2.000 Hz, ≤50 dB en 3.000 Hz",
            "67.215(b)(1)"
          ],
          [
            "Audiometría Clase 1",
            "Cada 2 años hasta los 40, luego anual",
            "67.215(b)(1)"
          ],
          [
            "Electrocardiograma",
            "Inicial; cada 2 años de 30 a 40; anual después de 40",
            "67.205(d)(4)-(6)"
          ],
          [
            "Dispensa para aspirante por primera vez",
            "No aplica",
            "67.035, Nota 2"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Para volar en aerolínea necesitas Clase 1 vigente: 12 meses, y 6 meses desde los 40 años (67.025).",
          "Con el certificado vencido no vuelas y no hay permiso provisional; renueva dentro de los 45 días previos para conservar tu fecha (67.025).",
          "Si tu salud cambia, **tú** dejas de volar y lo reportas: más de 20 días, medicación continua u hospitalización (67.040).",
          "Un medicamento nuevo te deja 3 días sin aptitud; cirugía mayor, embarazo y reposo de más de 20 días también (67.030(b)).",
          "Con lentes, vuelas siempre con ellos y con un par de repuesto; gafas de sol no polarizadas (67.210, 67.090(b)(9)).",
          "Mentir u omitir en la declaración jurada se reporta a la Aerocivil (67.075(c)).",
          "Si te declaran no apto, hay revisión, dispensa (no para aspirantes nuevos) y recursos de reposición y apelación (67.035, 67.505)."
        ]
      }
    ]
  },
  {
    "n": 4,
    "title": "RAC 120 · Sustancias psicoactivas",
    "kicker": "Tu licencia y tu aptitud",
    "minutes": 8,
    "blocks": [
      {
        "kind": "p",
        "text": "Enmienda 2, mayo de 2025 (Resolución 00996 del 08 de mayo de 2025, publicada y en vigor desde el 09 de mayo de 2025)."
      },
      {
        "kind": "titulo",
        "text": "¿De qué trata?"
      },
      {
        "kind": "p",
        "text": "El RAC 120 obliga a las empresas del sector aeronáutico y a los centros de instrucción a tener un programa para prevenir y controlar el consumo de alcohol y drogas, con capacitación, exámenes toxicológicos y rehabilitación. Casi todo lo ejecuta la empresa, pero las consecuencias caen sobre ti: un positivo o una negativa a hacerte la prueba te dejan sin licencia y sin certificado médico por un buen tiempo. En una entrevista de aerolínea te pueden preguntar qué pruebas existen, cuándo te las hacen y qué pasa si sales positivo."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber un piloto"
      },
      {
        "kind": "sub",
        "text": "A quién aplica y qué está prohibido"
      },
      {
        "kind": "vinetas",
        "items": [
          "Aplica al personal de las empresas del sector aeronáutico que cumple funciones sensibles para la seguridad operacional, a los centros de instrucción aeronáutica y a sus **alumnos** (120.005(a)). El «personal aeronáutico» incluye expresamente al piloto al mando (PIC) y al copiloto, y a los alumnos que ejerzan funciones aeronáuticas (120.001).",
          "Durante el ejercicio de tus funciones **no puedes usar sustancias psicoactivas ni estar bajo su efecto** (120.025(a)). La empresa debe suspender de sus funciones a quien incumpla (120.025, Parágrafo).",
          "«Sustancias psicoactivas» incluye el **alcohol**, los opiáceos, los cannabinoides, los sedantes e hipnóticos, la cocaína, los alucinógenos y los disolventes volátiles; se excluyen el tabaco y la cafeína (120.001).",
          "«Estar bajo el efecto» es cualquier cambio bioquímico, psicológico o fisiológico, **incluso inadvertido**, causado por la sustancia (120.001). No hace falta que te sientas afectado."
        ]
      },
      {
        "kind": "sub",
        "text": "El límite para el alcohol"
      },
      {
        "kind": "vinetas",
        "items": [
          "El nivel aceptado es un **resultado negativo** (120.001, «Nivel de aceptación»).",
          "El valor de corte para alcohol es **20 mg/dL**: por encima, el resultado es positivo (120.001, «Resultado positivo», Nota).",
          "El RAC 120 **no fija un número de horas** entre la última bebida y el servicio. La regla es no estar bajo el efecto al ejercer tus funciones (120.025). Tampoco hay un plazo en horas en el RAC 91 ni en el RAC 121 (ver «Relación con otros RAC»). Si tu aerolínea fija uno en su manual, ese es el que aplicas."
        ]
      },
      {
        "kind": "sub",
        "text": "Qué sustancias buscan y cómo se hace la prueba"
      },
      {
        "kind": "vinetas",
        "items": [
          "Como mínimo: **alcohol, opioides, cannabinoides, cocaína, anfetaminas y benzodiacepinas** (120.310(a)). La empresa puede buscar más (120.310, Nota).",
          "Pueden hacértela durante tu jornada, mientras estés a órdenes de la empresa, en horario académico o **en cualquier momento mientras ejerzas las atribuciones de tu licencia** (120.300(b)).",
          "Firmas un **consentimiento para cada toma de muestra** (120.315) y te deben informar de tu derecho a negarte y de sus consecuencias (120.300(g)).",
          "Todo tamizaje positivo debe pasar por una **prueba confirmatoria** con otra metodología (120.300(e); 120.001, «Prueba confirmatoria»). El alcoholímetro se usa según la legislación metrológica vigente (120.300(d)).",
          "Un evaluador designado por la empresa determina si un positivo se debe a un **tratamiento médico legítimo** (120.305(a)(3)). Guarda tus fórmulas médicas: la empresa conserva los documentos que presentes para refutar un positivo (120.325(a)(4))."
        ]
      },
      {
        "kind": "sub",
        "text": "Los tipos de examen toxicológico (120.320)"
      },
      {
        "kind": "list",
        "items": [
          "**Previo (preingreso)**: ninguna empresa te pone en funciones sensibles sin un resultado **negativo** previo. Se hace antes de tu primer día, también al pasar de un cargo no sensible a uno sensible. Si pasan **más de 180 días** entre la prueba y el inicio de funciones, repites la prueba. Te deben avisar antes de contratarte o matricularte (120.320(a)).",
          "**Aleatorio**: sin fecha anunciada ni secuencia regular (120.320(b)(3)), por un método en el que todos tienen la misma probabilidad (120.030(a) y (b)). Si te seleccionan, vas **de inmediato** a la toma de muestra; si estás en funciones críticas, tan pronto como sea posible (120.320(b)(4)). Se recomienda que cada persona sea examinada al menos una vez cada **24 meses** (120.030(c)).",
          "**Posaccidente o posincidente**: a todos los involucrados que hacían funciones sensibles. **No consumes ninguna sustancia hasta la prueba.** La prueba nunca puede demorar la atención médica. Alcohol: dentro de las **8 horas**; otras sustancias: dentro de las **32 horas** (120.320(c)). Si no estás vinculado a una empresa, **tú mismo** gestionas la prueba en esas condiciones (120.320(c), Nota).",
          "**Por sospecha justificada**: se basa en observaciones actuales, específicas y escritas de indicadores físicos, de comportamiento o de desempeño (120.001). La decide un supervisor del programa, que no puede ser quien te haga la prueba, y sin prueba no se toma ninguna medida basada solo en la sospecha (120.320(d)).",
          "**Para reasumir funciones**: después de un positivo necesitas un nuevo resultado negativo (120.320(e)).",
          "**De seguimiento**: tras la rehabilitación, al menos **6 pruebas en los primeros 12 meses** de regreso (120.320(f))."
        ]
      },
      {
        "kind": "sub",
        "text": "Si te niegas a la prueba"
      },
      {
        "kind": "p",
        "text": "La negativa acarrea las mismas tres consecuencias que el RAC fija para un positivo (120.100(a); 120.320(g)):"
      },
      {
        "kind": "vinetas",
        "items": [
          "rechazo de cualquier solicitud de licencia, habilitación o autorización (RAC 61, 63 y 65) por **al menos 1 año** desde la negativa;",
          "**suspensión o cancelación inmediata** de las atribuciones de tu licencia;",
          "suspensión de tu aptitud psicofísica por el tiempo que decida Medicina Aeronáutica."
        ]
      },
      {
        "kind": "p",
        "text": "La empresa no te deja cumplir funciones sensibles hasta que la Aerocivil decida (120.100(b)) y le notifica la negativa en máximo **48 horas** (120.105)."
      },
      {
        "kind": "sub",
        "text": "Si sales positivo"
      },
      {
        "kind": "list",
        "items": [
          "La empresa lo notifica al Grupo Medicina Aeronáutica en máximo **48 horas** (120.300(h)).",
          "Consecuencias (120.320(g)): rechazo de solicitudes de licencia por **al menos 1 año** desde la detección, **suspensión o cancelación inmediata** de las atribuciones de tu licencia y suspensión de la aptitud psicofísica.",
          "Antes de volver: evaluación por un especialista en psiquiatría o adicciones y, si hace falta, rehabilitación (120.400), que puede incluir psicoterapia, farmacoterapia o tratamiento ambulatorio o con internación (120.405(a)). Puede hacerse por el sistema de salud o de forma particular, **por tu cuenta** (120.400, Nota).",
          "Si tienes certificado médico, la prueba para reasumir exige **autorización previa de la Aerocivil** y que el especialista dé por concluida la rehabilitación (120.410).",
          "La prueba para reasumir no se hace antes de **2 años** desde el positivo, o **3 años si eres reincidente** (120.320(e)).",
          "Al volver: mínimo 6 pruebas de seguimiento en 12 meses; mientras dura el seguimiento sales del sorteo aleatorio (120.320(f))."
        ]
      },
      {
        "kind": "sub",
        "text": "Capacitación, confidencialidad y ayuda"
      },
      {
        "kind": "vinetas",
        "items": [
          "Recibes instrucción inicial antes de tu primer día y actualizaciones cada **36 meses** como máximo (120.205(a) y (d)). Incluye efectos, señales de consumo, los requisitos del RAC y cuándo te toca una prueba (120.205).",
          "El programa debe divulgar las fuentes de información y la **ayuda disponible** para el personal (120.210(a)(4)).",
          "Puedes pedir por escrito copia de todos tus registros de exámenes (120.325(b)). La empresa no puede divulgar esa información salvo lo que permita la ley (120.330).",
          "Las pruebas pueden hacerse también fuera de Colombia, según el programa de la empresa (120.335(b))."
        ]
      },
      {
        "kind": "p",
        "text": "**Autorreporte o programa de apoyo entre pares**: el RAC 120 no crea un programa de autorreporte voluntario ni de apoyo entre pares; la rehabilitación que regula es la posterior a un positivo (Capítulo E). La obligación de informar tus condiciones de salud y tratamientos está en el RAC 67 (67.040)."
      },
      {
        "kind": "sub",
        "text": "Relación con otros RAC"
      },
      {
        "kind": "vinetas",
        "items": [
          "**RAC 67**: un trastorno por uso de sustancias, incluida la dependencia del alcohol, es descalificante en Clase 1 (67.205(a)(1)(ii)), y debes estar dispuesto a demostrar en cualquier momento que no consumes (67.205(a)(4)).",
          "Este tema se complementa con el **RAC 91**: quien cumple funciones críticas se abstiene de desempeñarlas bajo la influencia de sustancias psicoactivas, prescritas o no, que perjudiquen la actuación humana, y de todo uso problemático (91.010); nadie opera una aeronave sabiendo que transporta sustancias psicoactivas no autorizadas (91.020); el PIC no inicia un vuelo si él o un tripulante está incapacitado por los efectos de cualquier sustancia psicoactiva (91.120(b)(1)).",
          "Este tema se complementa con el **RAC 121**: la misma prohibición para el personal de funciones críticas (121.025); el PIC garantiza que no se transporte a nadie que parezca estar bajo efectos del alcohol o de sustancias psicoactivas en grado peligroso (121.2250(e)(1)); y el manual de operaciones incluye precauciones de salud sobre alcohol, drogas, somníferos, medicamentos y prevención del uso indebido de sustancias (RAC 121, Apéndice 10, A7.1).",
          "Este tema se complementa con el **RAC 13** (sanciones): volar bajo el efecto de alcohol o drogas se sanciona con multa, que se duplica si eres comandante, y suspensión de la licencia hasta por 3 años (13.660(b) y 13.665(a)); negarte a cumplir el programa de prevención se sanciona con multa y suspensión de 60 a 90 días (13.625(v) y 13.630)."
        ]
      },
      {
        "kind": "titulo",
        "text": "Datos importantes"
      },
      {
        "kind": "table",
        "head": [
          "Dato",
          "Valor",
          "Numeral"
        ],
        "rows": [
          [
            "Nivel aceptado",
            "Resultado negativo",
            "120.001"
          ],
          [
            "Valor de corte para alcohol",
            "20 mg/dL",
            "120.001, Nota"
          ],
          [
            "Horas mínimas entre beber y volar",
            "No las fija el RAC 120",
            "120.025"
          ],
          [
            "Sustancias mínimas examinadas",
            "Alcohol, opioides, cannabinoides, cocaína, anfetaminas, benzodiacepinas",
            "120.310(a)"
          ],
          [
            "Prueba previa vencida",
            "Más de 180 días sin empezar funciones: se repite",
            "120.320(a)(4)"
          ],
          [
            "Aleatorio, empresa con hasta 500 personas críticas",
            "50 % al año",
            "120.320(b)(1)(i)"
          ],
          [
            "Aleatorio, de 501 a 2.000 personas",
            "25 % o 250 exámenes, lo mayor",
            "120.320(b)(1)(ii)"
          ],
          [
            "Aleatorio, más de 2.000 personas",
            "10 % o 560 exámenes, lo mayor",
            "120.320(b)(1)(iii)"
          ],
          [
            "Frecuencia recomendada por persona",
            "Al menos cada 24 meses",
            "120.030(c)"
          ],
          [
            "Posaccidente, alcohol",
            "Dentro de 8 horas",
            "120.320(c)(4)"
          ],
          [
            "Posaccidente, otras sustancias",
            "Dentro de 32 horas",
            "120.320(c)(5)"
          ],
          [
            "Notificación de negativa o positivo a la Aerocivil",
            "Máximo 48 horas",
            "120.105, 120.300(h)"
          ],
          [
            "Rechazo de solicitudes de licencia tras negativa o positivo",
            "Al menos 1 año",
            "120.100(a)(1), 120.320(g)(1)"
          ],
          [
            "Atribuciones de la licencia tras negativa o positivo",
            "Suspensión o cancelación inmediata",
            "120.100(a)(2), 120.320(g)(2)"
          ],
          [
            "Prueba para reasumir funciones",
            "No antes de 2 años (3 si reincide)",
            "120.320(e)"
          ],
          [
            "Seguimiento al volver",
            "Mínimo 6 pruebas en 12 meses",
            "120.320(f)(1)"
          ],
          [
            "Actualización de la capacitación",
            "Cada 36 meses como máximo",
            "120.205(d)"
          ],
          [
            "Consentimiento",
            "Uno firmado por cada toma",
            "120.315"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "En funciones no puedes usar sustancias psicoactivas ni estar bajo su efecto, aunque no lo notes (120.025, 120.001).",
          "Alcohol: por encima de 20 mg/dL es positivo; el RAC no da un plazo en horas, así que no llegues con alcohol en el cuerpo (120.001).",
          "Hay pruebas previas, aleatorias, posaccidente (alcohol en 8 h, lo demás en 32 h), por sospecha, para reasumir y de seguimiento (120.320).",
          "Negarte trae las mismas consecuencias inmediatas que un positivo: suspensión o cancelación inmediata de las atribuciones de tu licencia y al menos un año de solicitudes rechazadas (120.100, 120.320(g)).",
          "Volver después de un positivo exige rehabilitación, autorización de la Aerocivil y al menos 2 años (3 si reincides) (120.320(e), 120.410).",
          "Tras un accidente o incidente no consumes nada hasta la prueba, y si no tienes empresa, la gestionas tú (120.320(c))."
        ]
      }
    ]
  },
  {
    "n": 5,
    "title": "RAC 91 · Reglas generales de vuelo y de operación",
    "kicker": "Cómo se vuela",
    "minutes": 11,
    "blocks": [
      {
        "kind": "p",
        "text": "Enmienda 12, julio de 2026 (adoptado por la Resolución 01594 de 2018; última modificación: Resolución 2297 del 17 de julio de 2026)."
      },
      {
        "kind": "titulo",
        "text": "¿De qué trata?"
      },
      {
        "kind": "p",
        "text": "Es el reglamento del aire y de la operación general en Colombia: cómo se vuela bajo reglas de vuelo visual (VFR) y por instrumentos (IFR), derecho de paso, plan de vuelo, falla de comunicaciones e interceptación, y qué debe cumplir toda aeronave civil en preparación, combustible, alternos, oxígeno, equipos y documentos. Es la base de todo lo demás: una aerolínea opera bajo el RAC 121 o el RAC 135 **además** del RAC 91, no en lugar de él (91.005(a)(3)). La Parte 1 aplica a todas las aeronaves; la Parte 2 suma reglas para aviones grandes y turborreactores de aviación general."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber un piloto"
      },
      {
        "kind": "sub",
        "text": "Dónde encaja"
      },
      {
        "kind": "vinetas",
        "items": [
          "Los capítulos A a C (generalidades y reglas de vuelo) aplican a toda aeronave civil en Colombia; los capítulos D a M ceden ante el RAC 121, 135, 137 o 138 cuando esas normas traen su propia regla (91.005(a) y (b)).",
          "La Parte 2 cubre turborreactores, y multimotores con **más de 19 asientos** de pasajeros o **más de 5.700 kg** de peso máximo de despegue, cuando no operan bajo RAC 121 o 135 (91.1805)."
        ]
      },
      {
        "kind": "sub",
        "text": "Autoridad y responsabilidad del piloto al mando"
      },
      {
        "kind": "vinetas",
        "items": [
          "El piloto al mando (PIC) tiene **autoridad decisiva** sobre la aeronave desde que la recibe hasta que la entrega; tripulación y pasajeros están sujetos a ella (91.115).",
          "Responde por la operación y la seguridad «manipule o no los mandos», y solo puede apartarse del reglamento cuando sea absolutamente necesario por seguridad (91.120(a)). También tiene el control operacional (91.515).",
          "No inicia un vuelo con un tripulante de vuelo incapacitado por lesión, enfermedad, fatiga o sustancias psicoactivas, ni sigue más allá del **aeródromo adecuado más próximo** si la capacidad de la tripulación cae significativamente (91.120(b)).",
          "Si en una emergencia se aparta de reglamentos o procedimientos, avisa sin demora a los servicios de tránsito aéreo (ATS) y entrega informe a la Aerocivil (UAEAC) en **no más de 10 días calendario** (91.520)."
        ]
      },
      {
        "kind": "sub",
        "text": "Aptitud y sustancias psicoactivas"
      },
      {
        "kind": "vinetas",
        "items": [
          "Quien cumple funciones críticas para la seguridad no las ejerce bajo sustancias psicoactivas que perjudiquen su actuación, prescritas o no (91.010). En el RAC 91 el **alcohol** cuenta como sustancia psicoactiva (91.001). Tasas y pruebas no están aquí: este tema se complementa con el RAC 120.",
          "El PIC verifica que cada tripulante de vuelo **porte** licencia, habilitaciones y certificado médico válidos (91.1310(a)), y si tu médico lo exige, llevas **lentes de repuesto** (91.545(c)(7))."
        ]
      },
      {
        "kind": "sub",
        "text": "Antes del vuelo"
      },
      {
        "kind": "vinetas",
        "items": [
          "En vuelos IFR o que salgan de las inmediaciones del aeródromo estudias meteorología, combustible, plan alterno, pistas y performance (91.125), y compruebas aeronavegabilidad, certificados, equipos, peso y centro de gravedad (91.545(a)).",
          "**VFR**: sales solo si es vuelo local en condiciones meteorológicas de vuelo visual (VMC) o si informes y pronósticos permiten cumplir VFR en ruta, destino y alterno (91.575(a)).",
          "**IFR**: no despegas, ni sigues más allá del punto de nueva planificación en vuelo, si el destino y al menos un alterno no estarán en mínimos o por encima a la hora prevista de utilización (91.575(b)).",
          "Con hielo conocido o previsto, la aeronave debe estar certificada y equipada, y se despeja todo el hielo antes del despegue (91.575(e))."
        ]
      },
      {
        "kind": "sub",
        "text": "Reglas generales del aire"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Altímetro**: QNH a la altitud de transición o por debajo; 1013,2 hPa en el nivel de transición o por encima (91.140).",
          "**Velocidad**: máximo **250 kt** indicados bajo **10.000 ft** sobre el nivel medio del mar (MSL), salvo que el control de tránsito aéreo (ATC) diga otra cosa (91.165).",
          "Ninguna regla te exime de maniobrar para evitar una colisión, incluidas las maniobras por aviso de resolución (RA) del sistema anticolisión de a bordo (ACAS) (91.175).",
          "**Derecho de paso** (91.185): de frente, ambos a la derecha; en convergencia cede quien tiene al otro a su derecha; el que alcanza se aparta por la derecha; se cede a quien aterriza o está en final, y el más alto al más bajo. Los aerodinos propulsados ceden a dirigibles, planeadores y globos. En rodaje te detienes en todo punto de espera de pista, salvo que la torre autorice otra cosa, y en toda **barra de parada iluminada**, hasta que se apague.",
          "Circuito con virajes por la **izquierda** salvo instrucción contraria (91.200). Con pasajeros o carga a bordo no se simulan emergencias (91.525)."
        ]
      },
      {
        "kind": "sub",
        "text": "VFR"
      },
      {
        "kind": "vinetas",
        "items": [
          "Visibilidad y distancia de nubes: Apéndice 1, en la tabla de abajo (91.300(a)).",
          "En una zona de control, sin autorización ATC no despegas, no aterrizas ni entras al circuito con **techo inferior a 1.500 ft** o **visibilidad en tierra inferior a 5 km** (91.300(b)).",
          "Sin autorización, no hay VFR sobre **FL 200** (91.305), y nunca sobre **FL 290** en espacio de separación vertical reducida (RVSM) (91.310).",
          "Alturas mínimas: **1.000 ft** sobre el obstáculo más alto en 600 m sobre zonas pobladas; **500 ft** en el resto (91.315).",
          "**De noche** en las regiones de información de vuelo (FIR) Bogotá y Barranquilla se vuela IFR, salvo el VFR nocturno del Apéndice 19 (91.112). Ese VFR nocturno exige al PIC **habilitación IFR con chequeo de instrumentos vigente**, aeródromos iluminados y volar dentro de una de cinco áreas autorizadas, sin combinar destinos entre áreas (Apéndice 19(a)(4), (a)(7) y (c))."
        ]
      },
      {
        "kind": "sub",
        "text": "IFR"
      },
      {
        "kind": "vinetas",
        "items": [
          "Altitud mínima, si no hay una publicada: **2.000 ft** sobre el obstáculo más alto en 8 km en zona montañosa y **1.000 ft** en el resto (91.340).",
          "La altitud o altura de decisión (DA/DH) o altitud mínima de descenso (MDA) que aplica es **la más alta** entre la del procedimiento, la del PIC y la de la aeronave (91.370(b)). Bajas de ella solo en posición para un descenso normal, con la visibilidad del procedimiento y al menos una referencia visual de la pista; con solo las luces de aproximación no bajas de **100 ft** sobre la zona de toma de contacto sin ver las barras rojas (91.370(c)). Si no, frustrada inmediata (91.370(e)).",
          "**Prohibición de aproximación**: si la visibilidad o el alcance visual en la pista (RVR) están bajo mínimos, no pasas de **1.000 ft** sobre el aeródromo; si el reporte baja después de ese punto, puedes seguir hasta la DA/H o MDA/H (91.585(b) y (c)).",
          "Bajo 1.000 ft solo continúas si, con el estado de la pista, la performance te asegura un aterrizaje seguro (91.647)."
        ]
      },
      {
        "kind": "sub",
        "text": "Plan de vuelo y ATC"
      },
      {
        "kind": "vinetas",
        "items": [
          "En Colombia el plan de vuelo es **obligatorio para todo vuelo** (91.210(a)); con servicio de control o asesoramiento se presenta **al menos 60 min** antes de la salida (91.210(e)). Al aterrizar das aviso de llegada (91.230).",
          "Sin autorización ATC no hay vuelo controlado (91.245(a)), ni rodaje en aeródromo controlado sin permiso de torre (91.245(c)).",
          "Notificas al ATS una variación de **±Mach 0,02** o **±10 kt** de velocidad verdadera, o de más de **2 min** en la hora estimada (91.250(e))."
        ]
      },
      {
        "kind": "sub",
        "text": "Falla de comunicaciones"
      },
      {
        "kind": "vinetas",
        "items": [
          "En VMC: sigues VMC, aterrizas en el aeródromo adecuado más próximo y notificas la llegada (91.265(b)(1)).",
          "En condiciones de vuelo por instrumentos (IMC): mantienes el último nivel y velocidad asignados (o la altitud mínima, si es mayor) **20 min** sin radar o **7 min** con radar (contados desde lo último entre alcanzar el nivel, poner **7600** o no reportar un punto obligatorio), sigues el plan de vuelo hasta la ayuda del destino, empiezas el descenso a la hora prevista de aproximación y aterrizas, de ser posible, dentro de **30 min** (91.265(b)(2)). El Dorado tiene procedimiento propio (Apéndice 18)."
        ]
      },
      {
        "kind": "sub",
        "text": "Interferencia ilícita e interceptación"
      },
      {
        "kind": "vinetas",
        "items": [
          "Interferencia: notificas al ATS lo que puedas y tratas de aterrizar en el aeródromo apropiado más cercano o en el asignado (91.267); sin comunicación, el Apéndice 8 orienta a usar **7500**. Después informas a la autoridad local (91.1515).",
          "Interceptación: sigues las señales del interceptor, avisas al ATS, llamas en **121,5 MHz** y pones **7700**; si la radio contradice las señales visuales, obedeces las visuales y pides aclaración (91.270, Apéndice 9(g)). A bordo llevas los procedimientos y señales de interceptación (91.1420(a)(10) y (11))."
        ]
      },
      {
        "kind": "sub",
        "text": "Combustible y alternos"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Alterno de despegue** si el tiempo en la salida está bajo los mínimos de aterrizaje: a no más de **1 h** (bimotor) o **2 h** (tres o más motores) de vuelo a velocidad de crucero con un motor inoperativo (91.600(a)).",
          "**Alterno de destino**: al menos uno para todo vuelo, VFR o IFR, salvo certidumbre razonable de VMC y destino con pistas separadas y aproximación por instrumentos. **Dos** si en el destino habrá tiempo bajo mínimos o no hay información meteorológica (91.600, párrafo «Aeródromos alternos de destino»).",
          "**Para salir** (aviones): destino, luego el alterno más distante y una reserva final de **45 min** IFR, **30 min** VFR diurno o **45 min** VFR nocturno (91.610(a)).",
          "**En vuelo**: nunca por debajo del combustible para llegar a un aeródromo con la reserva final intacta. **COMBUSTIBLE MÍNIMO** avisa que cualquier cambio puede hacerte aterrizar con menos de la reserva final (no es emergencia); **MAYDAY MAYDAY MAYDAY COMBUSTIBLE** declara que aterrizarás con menos (91.637).",
          "En la Parte 2 el cálculo va por componentes: rodaje, trayecto, contingencias (**mínimo 5 %** del trayecto), alterno, reserva final (**30 min en espera a 1.500 ft** para turbina), adicional y discrecional (91.2012(c))."
        ]
      },
      {
        "kind": "sub",
        "text": "Oxígeno"
      },
      {
        "kind": "p",
        "text": "Sin presurización, entre **10.000 y 13.000 ft** de altitud de cabina se lleva oxígeno para toda la tripulación y al menos el 10 % de los pasajeros durante todo período que pase de **30 min**, y sobre **13.000 ft** para todos. Quien cumple funciones esenciales lo usa de forma continua (Apéndice 4(b)(1) y (c)(1), 91.595)."
      },
      {
        "kind": "sub",
        "text": "Equipos que te afectan"
      },
      {
        "kind": "vinetas",
        "items": [
          "Con equipo inoperativo despegas solo con una lista de equipo mínimo (MEL) aprobada y cumpliendo sus condiciones (91.817(a)); sin MEL, solo ciertas aeronaves pequeñas no turbina y con el equipo desactivado y rotulado (91.817(c)).",
          "Transpondedor modo C o S en todas las aeronaves, salvo excepciones que autorice la Aerocivil (91.845). El ADS-B Out (vigilancia dependiente automática, radiodifusión) es obligatorio desde el **1 de enero de 2025** donde haya cobertura y se opera siempre transmitiendo (91.847(a)(3) y (d)).",
          "Todo avión lleva transmisor de localización de emergencia (ELT) (91.830)."
        ]
      },
      {
        "kind": "sub",
        "text": "Documentos a bordo"
      },
      {
        "kind": "vinetas",
        "items": [
          "Entre otros: certificado de matrícula, certificado de aeronavegabilidad, licencias de cada tripulante, libro de a bordo, licencia de estación de radio, lista de pasajeros, manifiesto de carga, cartas de la ruta y desvíos, procedimientos de interceptación y aprobaciones específicas (91.1420(a)). Los siete primeros van **en original** (91.1420(b)).",
          "El libro de a bordo va al día y en tinta; el PIC responde por su veracidad y se conserva **3 años** (91.1410(c)). Toda falla o daño va al registro técnico de vuelo (91.1425)."
        ]
      },
      {
        "kind": "sub",
        "text": "Tiempos de vuelo y experiencia reciente"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Aviación general**: máximo **9 h** por día y **85 h** por mes (91.696(a)).",
          "**Aerolíneas**: el RAC 91 no fija sus límites. Este tema se complementa con el RAC 121 (121.1910 y Apéndice 18) y el RAC 135 (Apéndice 15).",
          "Parte 2: PIC y copiloto necesitan **3 despegues y 3 aterrizajes en 90 días** en el tipo o en simulador (91.2640, 91.2645), y el explotador lleva un programa de gestión de riesgos por fatiga (FRMS) (91.1985). La recencia general de tu licencia está en el RAC 61, pero hasta el 31/08/2027 rige la del RAC 2 (nota 3 de 91.005)."
        ]
      },
      {
        "kind": "sub",
        "text": "Lo que tienes que reportar"
      },
      {
        "kind": "table",
        "head": [
          "Qué",
          "A quién",
          "Numeral"
        ],
        "rows": [
          [
            "Accidente con muertos, lesiones graves o daños importantes",
            "Autoridad más próxima, por el medio más rápido",
            "91.120(c)"
          ],
          [
            "Haberte apartado de reglamentos en una emergencia",
            "ATS; informe a la UAEAC en 10 días",
            "91.520"
          ],
          [
            "Meteorología adversa o situación imprevista que afecte a otros",
            "ATC",
            "91.580(a)"
          ],
          [
            "Frenado peor que el notificado",
            "ATC",
            "91.580(b)"
          ],
          [
            "Falla de navegación o comunicaciones en IFR",
            "ATC",
            "91.375"
          ],
          [
            "RA del ACAS contrario a la autorización",
            "ATC",
            "Apéndice 20(e)"
          ],
          [
            "Deficiencias de instalaciones y servicios",
            "Autoridad a cargo",
            "91.505(b)"
          ],
          [
            "Fallas o daños de la aeronave",
            "Registro técnico de vuelo",
            "91.1425"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "Datos importantes"
      },
      {
        "kind": "p",
        "text": "**Mínimos VMC para VFR (Apéndice 1, Tabla 1-1)**"
      },
      {
        "kind": "table",
        "head": [
          "Banda de altitud",
          "Espacio",
          "Visibilidad",
          "Distancia de nubes"
        ],
        "rows": [
          [
            "10.000 ft sobre el nivel del mar o más",
            "B a G",
            "8 km",
            "1.500 m horizontal, 1.000 ft vertical"
          ],
          [
            "Bajo 10.000 ft y sobre 3.000 ft sobre el nivel del mar o 1.000 ft sobre el terreno (el mayor)",
            "B a G",
            "5 km",
            "1.500 m horizontal, 1.000 ft vertical"
          ],
          [
            "3.000 ft sobre el nivel del mar o menos, o 1.000 ft sobre el terreno (el mayor)",
            "B, C, D, E",
            "5 km",
            "1.500 m horizontal, 1.000 ft vertical"
          ],
          [
            "Misma banda",
            "F, G",
            "5 km",
            "Libre de nubes y con la superficie a la vista"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "En clase A los valores son solo orientación: no se aceptan vuelos VFR. En F y G la autoridad ATS puede reducir la visibilidad a no menos de 1.500 m en casos específicos (Apéndice 1, notas)."
      },
      {
        "kind": "table",
        "head": [
          "Tema",
          "Valor",
          "Numeral"
        ],
        "rows": [
          [
            "Plan de vuelo",
            "Obligatorio; al menos 60 min antes de la salida",
            "91.210"
          ],
          [
            "Velocidad",
            "250 kt bajo 10.000 ft MSL",
            "91.165"
          ],
          [
            "VFR en zona de control",
            "Techo 1.500 ft y visibilidad 5 km",
            "91.300(b)"
          ],
          [
            "Techo del VFR",
            "FL 200 (sin autorización); nunca sobre FL 290 en RVSM",
            "91.305, 91.310"
          ],
          [
            "Altura mínima VFR",
            "1.000 ft (poblado, radio 600 m) / 500 ft",
            "91.315"
          ],
          [
            "Altitud mínima IFR",
            "2.000 ft (montaña) / 1.000 ft, radio 8 km",
            "91.340"
          ],
          [
            "Niveles de crucero",
            "000° a 179°: IFR impares, VFR impares + 500 ft. 180° a 359°: IFR pares, VFR pares + 500 ft",
            "Apéndice 7, Tabla 7-1"
          ],
          [
            "VFR nocturno",
            "5 km bajo FL 100 y 8 km entre FL 100 y FL 175. Clase B: libre de nubes. Clases C a G: superficie a la vista, 1.500 m horizontal, libre de nubes por debajo y 1.000 ft por encima",
            "Apéndice 19(a)(3)"
          ],
          [
            "Verificación del VOR",
            "30 días; ±4° en tierra, ±6° en vuelo",
            "91.365"
          ],
          [
            "Categoría I (CAT I)",
            "DH 200 ft o más; visibilidad 800 m o RVR 550 m",
            "91.540(a)(2)(i)"
          ],
          [
            "Categoría II (CAT II)",
            "DH menor de 200 ft y no menor de 100 ft; RVR 300 m",
            "91.540(a)(2)(ii)"
          ],
          [
            "Prohibición de aproximación",
            "1.000 ft sobre la elevación del aeródromo",
            "91.585(b)"
          ],
          [
            "Falla de comunicaciones",
            "7600; 20 min (sin radar) o 7 min (con radar); aterrizar en 30 min",
            "91.265(b)(2)"
          ],
          [
            "Códigos",
            "7500 interferencia; 7600 falla de comunicaciones; 7700 interceptación",
            "Apéndice 8; 91.265; Apéndice 9(g)"
          ],
          [
            "Reserva final (Parte 1)",
            "IFR 45 min; VFR diurno 30 min; VFR nocturno 45 min",
            "91.610(a)"
          ],
          [
            "Reserva final (Parte 2)",
            "Recíproco 45 min; turbina 30 min a 1.500 ft; contingencias 5 %",
            "91.2012(c)"
          ],
          [
            "Alterno de despegue",
            "1 h (bimotor) / 2 h (tres o más motores)",
            "91.600(a)"
          ],
          [
            "Oxígeno presurizados",
            "Sobre 25.000 ft: 10 min para pasajeros y máscara rápida para la tripulación",
            "Apéndice 4(b)(2), (c)(2)"
          ],
          [
            "Libro de a bordo",
            "Se conserva 3 años",
            "91.1410(c)"
          ],
          [
            "Tiempo de vuelo (aviación general)",
            "9 h/día, 85 h/mes",
            "91.696(a)"
          ],
          [
            "Experiencia reciente (Parte 2)",
            "3 despegues y 3 aterrizajes en 90 días",
            "91.2640, 91.2645"
          ],
          [
            "ELT automático",
            "Aviones con primer certificado de aeronavegabilidad después del 1 jul 2008",
            "91.830(a)(2)"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "El RAC 91 es la base: el RAC 121 o el 135 se suman encima, no lo reemplazan (91.005).",
          "El PIC tiene autoridad decisiva, responde aunque no vuele los mandos y no sale ni continúa con una tripulación incapacitada (91.115, 91.120).",
          "Plan de vuelo obligatorio para todo vuelo; de noche en las FIR Bogotá y Barranquilla se vuela IFR salvo el VFR nocturno del Apéndice 19 (91.210, 91.112).",
          "Combustible: destino, alterno más distante y reserva final (45 min en IFR). «COMBUSTIBLE MÍNIMO» anticipa; «MAYDAY COMBUSTIBLE» es emergencia (91.610, 91.637).",
          "Bajo DA/MDA solo con referencias visuales; con visibilidad bajo mínimos no se pasa de 1.000 ft (91.370, 91.585).",
          "Los límites de tiempo de vuelo de aerolínea no están aquí: van en el RAC 121 y el RAC 135."
        ]
      }
    ]
  },
  {
    "n": 6,
    "title": "RAC 211 · Gestión del tránsito aéreo",
    "kicker": "Cómo se vuela",
    "minutes": 8,
    "blocks": [
      {
        "kind": "p",
        "text": "Enmienda 6, noviembre de 2025 (Resolución 03590 del 31 de octubre de 2025)."
      },
      {
        "kind": "titulo",
        "text": "¿De qué trata?"
      },
      {
        "kind": "p",
        "text": "Organiza el espacio aéreo colombiano y fija cómo se prestan los servicios de tránsito aéreo (ATS): control, información de vuelo y alerta. Aplica al ATSP, a los aeródromos y a los explotadores de aeronaves en lo que les toque (211.005(c))."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber un piloto"
      },
      {
        "kind": "sub",
        "text": "Los tres servicios ATS"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Control de tránsito aéreo (ATC)**: evita colisiones entre aeronaves y con obstáculos en el área de maniobras, y ordena el flujo. Se divide en control de **área**, de **aproximación** y de **aeródromo** (211.015, 211.020(a)).",
          "**Información de vuelo (FIS)**: asesoramiento e información útil (211.020(b)). No te quita ninguna responsabilidad: el piloto al mando (PIC) decide cualquier cambio al plan de vuelo (nota de 211.600).",
          "**Alerta**: avisa a búsqueda y salvamento (SAR) cuando una aeronave necesita ayuda (211.020(c)).",
          "El ATC se da a todos los IFR en clases A a E, a los VFR en clases B, C y D y a todo el tránsito de aeródromo en aeródromos controlados (211.500(a))."
        ]
      },
      {
        "kind": "sub",
        "text": "Clases de espacio aéreo (211.035 y Apéndice 1)"
      },
      {
        "kind": "table",
        "head": [
          "Clase",
          "Vuelos",
          "Separación",
          "Servicio",
          "250 kt IAS bajo 10.000 ft AMSL",
          "Radio continua en ambos sentidos",
          "Autorización ATC"
        ],
        "rows": [
          [
            "A",
            "Solo IFR",
            "Todos",
            "ATC",
            "No aplica",
            "Sí",
            "Sí"
          ],
          [
            "B",
            "IFR y VFR",
            "Todos",
            "ATC",
            "No aplica",
            "Sí",
            "Sí"
          ],
          [
            "C",
            "IFR",
            "IFR de IFR y de VFR",
            "ATC",
            "No aplica",
            "Sí",
            "Sí"
          ],
          [
            "C",
            "VFR",
            "VFR de IFR",
            "ATC para separarse de IFR; información de tránsito VFR/VFR",
            "Sí",
            "Sí",
            "Sí"
          ],
          [
            "D",
            "IFR",
            "IFR de IFR",
            "ATC e información sobre VFR",
            "Sí",
            "Sí",
            "Sí"
          ],
          [
            "D",
            "VFR",
            "Ninguna",
            "Información de tránsito IFR/VFR y VFR/VFR",
            "Sí",
            "Sí",
            "Sí"
          ],
          [
            "E",
            "IFR",
            "IFR de IFR",
            "ATC e información sobre VFR en lo posible",
            "Sí",
            "Sí",
            "Sí"
          ],
          [
            "E",
            "VFR",
            "Ninguna",
            "Información de tránsito en lo posible",
            "Sí",
            "Sí",
            "**No**"
          ],
          [
            "F",
            "IFR",
            "IFR de IFR si es posible",
            "Asesoramiento y FIS",
            "Sí",
            "Sí",
            "**No**"
          ],
          [
            "F y G",
            "VFR (y IFR en G)",
            "Ninguna",
            "FIS",
            "Sí",
            "Sí",
            "**No**"
          ]
        ]
      },
      {
        "kind": "list",
        "items": [
          "Controlados: A a E. No controlados: F y G. La clase E **no se usa para zonas de control** (211.035(a)(5)).",
          "En Colombia la tabla exige **comunicación continua en ambos sentidos en todas las clases**, incluso E VFR, F y G (Apéndice 1).",
          "Si la altitud de transición está por debajo de 10.000 ft, el límite de 250 kt se aplica por debajo del FL 100 (nota del Apéndice 1).",
          "Si dos espacios se superponen verticalmente, a un nivel común rigen los requisitos de la clase **menos restrictiva** (nota de 211.040).",
          "**Transpondedor**: toda aeronave en espacio aéreo colombiano lleva transpondedor con **Modo C** activado y 4096 códigos en Modo A (Apéndice 1; requisitos en 91.845, según 211.080).",
          "Qué clase tiene cada área en Colombia no está en el RAC: se publica en la **AIP Colombia** (211.215)."
        ]
      },
      {
        "kind": "sub",
        "text": "Estructura del espacio aéreo"
      },
      {
        "kind": "list",
        "items": [
          "**FIR**: ahí se da información de vuelo y alerta (211.030(b)(1)).",
          "**Área de control**: su límite inferior no baja de **200 m (700 ft)** sobre el terreno o el agua (211.060(e)).",
          "**Zona de control (CTR)**: se extiende al menos **9,3 km (5 NM)** desde el centro del aeródromo en las direcciones de aproximación (211.065(b)).",
          "**Zonas P, R y D**: prohibida (vedada a la aviación civil), restringida (activada o desactivada por NOTAM, previa coordinación con la Fuerza Aérea Colombiana, FAC) y peligrosa. Se identifican con las letras de nacionalidad, la letra P, R o D y un número (211.070).",
          "**ADIZ**: zona de identificación de defensa aérea con procedimientos especiales de identificación o notificación (211.075).",
          "**Altitudes mínimas** de ruta y de aproximación: se publican en la AIP Colombia (211.355)."
        ]
      },
      {
        "kind": "sub",
        "text": "Autorizaciones y colación"
      },
      {
        "kind": "list",
        "items": [
          "La autorización ATC contiene identificación, **límite de la autorización**, ruta, niveles, y otras instrucciones como salida o aproximación, comunicaciones y hora de expiración (211.555(b)).",
          "**Colación obligatoria** (211.555(d)(1)): autorizaciones de ruta; autorizaciones para entrar, aterrizar, despegar, esperar a distancia, cruzar y regresar en cualquier pista; pista en uso, reglaje de altímetro, códigos SSR, instrucciones de nivel, rumbo y velocidad y niveles de transición, del controlador o del ATIS.",
          "Lo demás, incluidas las autorizaciones condicionales, se colaciona o se acusa recibo de forma que quede claro que lo entendiste y lo vas a cumplir (211.555(d)(2)). El controlador escucha la colación y corrige (211.555(d)(3)). Por enlace de datos piloto-controlador (CPDLC) no se exige confirmación oral (211.555(d)(4)).",
          "Si no hay coordinación para toda la ruta, te autorizan hasta el punto donde sí la hay y te dan una nueva antes de llegar (211.560(b)(2)).",
          "Si la dependencia se satura, te informa las demoras o restricciones de gestión de afluencia (ATFM) (211.565(c)).",
          "Todo vuelo controlado está bajo **una sola dependencia** a la vez (211.540). Transferencia en la llegada: de aproximación a torre cuando puedes terminar la aproximación por referencia visual, estás en condiciones VMC ininterrumpidas, llegaste al punto o nivel acordado o aterrizaste (211.550(c)(1))."
        ]
      },
      {
        "kind": "sub",
        "text": "Separación y RVSM"
      },
      {
        "kind": "vinetas",
        "items": [
          "La separación puede ser vertical (niveles de crucero del Apéndice 7 del RAC 91), horizontal (longitudinal o lateral) o compuesta (211.525).",
          "Clases A y B separan a todos; C, D y E separan IFR de IFR; C además IFR de VFR (211.520(a)). En D y E, a tu pedido y con procedimiento aceptado, un tramo en condiciones meteorológicas visuales (VMC) puede autorizarse sin separación (211.520(b)).",
          "**RVSM**: separación de **1.000 ft (300 m)** entre **FL 290 y FL 410** inclusive, con monitoreo de la agencia regional CARSAMMA (211.530)."
        ]
      },
      {
        "kind": "sub",
        "text": "Emergencia, interferencia ilícita y contingencias"
      },
      {
        "kind": "vinetas",
        "items": [
          "La dependencia ATS da **atención, asistencia y prioridad** a la aeronave en emergencia, incluida la interferencia ilícita (211.360(a)). Para indicarla puedes usar el transpondedor en **7700**, en **7500** para interferencia ilícita, la emergencia de ADS-B o ADS-C, o un mensaje CPDLC (211.360(a)(1) a (4)).",
          "Ante interferencia ilícita, el ATS atiende con prontitud tus solicitudes y facilita el aterrizaje, avisa a la Aerocivil y a militares o policía (211.365), y **no menciona la naturaleza de la emergencia** en la frecuencia salvo que tú lo hayas hecho antes y no la agrave (211.755).",
          "Cuando una aeronave está en emergencia, ATS informa a las aeronaves cercanas (211.750).",
          "**Interceptación**: el ATS intenta contactarte por cualquier medio, incluida la frecuencia de emergencia **121,5 MHz**, te avisa que te están interceptando y retransmite mensajes con el interceptor (Apéndice 13, 3.1). Las señales y tu conducta como interceptado están en el **RAC 91** (91.270 y Apéndice 9).",
          "Aeronave **extraviada o no identificada**: el ATS evalúa si hay interferencia ilícita y avisa a la FAC (Apéndice 13, 1 y 2)."
        ]
      },
      {
        "kind": "sub",
        "text": "Fases de alerta (211.720)"
      },
      {
        "kind": "vinetas",
        "items": [
          "**INCERFA (incertidumbre)**: 30 minutos sin comunicación desde que debía recibirse o desde el primer intento fallido de contacto, o 30 minutos de retraso sobre la hora prevista de llegada.",
          "**ALERFA (alerta)**: sin noticias tras la INCERFA; autorizado para aterrizar, no lo hace en los **5 minutos** siguientes a la hora prevista de aterrizaje y no se restablece el contacto; condiciones de la aeronave anormales sin llegar a aterrizaje forzoso probable; o interferencia ilícita conocida o sospechada.",
          "**DETRESFA (peligro)**: búsqueda infructuosa tras la ALERFA; **combustible agotado o insuficiente** para llegar a lugar seguro; aterrizaje forzoso probable; o aterrizaje forzoso hecho o inminente.",
          "En INCERFA y ALERFA se avisa primero al explotador, antes que al centro coordinador de salvamento (RCC) (211.745)."
        ]
      },
      {
        "kind": "sub",
        "text": "Información de vuelo y comunicaciones"
      },
      {
        "kind": "vinetas",
        "items": [
          "El FIS incluye SIGMET y AIRMET, cenizas volcánicas, material radiactivo, cambios en radioayudas y aeródromos, globos libres y el tiempo en salida, destino y alterna (211.610).",
          "**ATIS-voz** en aeropuertos con operación internacional regular (211.635).",
          "Idioma entre dependencias: español en las FIR colombianas y con Panamá, Maiquetía, CENAMER, Guayaquil y Lima; **inglés con Kingston, Curazao y Amazónica** (211.405).",
          "**TIBA** (radiodifusión en vuelo de información sobre el tránsito), si el ATSP la activa: escucha en **123,45 MHz** 10 minutos antes de entrar a ese espacio; transmisiones 10 minutos antes de un punto de notificación, cada 20 minutos y entre 2 y 5 minutos antes de cambiar de nivel; en un conflicto inminente, descenso de 500 ft (por debajo de FL 290) o 1.000 ft (por encima, donde la separación vertical sea de 2.000 ft) con todas las luces encendidas (Apéndice 10, 2.2 a 2.6)."
        ]
      },
      {
        "kind": "sub",
        "text": "Lo que no está en el RAC 211"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Falla de comunicaciones** (incluido el código 7600): RAC 91 (91.265).",
          "**Declaraciones de combustible mínimo y MAYDAY combustible**: RAC 91 (91.637; 91.2013 para aviones grandes), RAC 121 (121.2553) y RAC 135 (135.687).",
          "**Límite de velocidad de 250 kt como regla de vuelo**: RAC 91 (91.165(a): por debajo de 10.000 ft MSL, salvo autorización o requerimiento del ATC). Aquí solo aparece en la tabla de clases.",
          "**Clases asignadas a cada espacio colombiano y procedimientos detallados**: AIP Colombia y el manual para servicios de tránsito aéreo (MATS)."
        ]
      },
      {
        "kind": "titulo",
        "text": "Datos importantes"
      },
      {
        "kind": "table",
        "head": [
          "Tema",
          "Valor",
          "Numeral"
        ],
        "rows": [
          [
            "Velocidad en clases C (VFR), D, E, F, G",
            "250 kt IAS bajo 10.000 ft AMSL",
            "Apéndice 1"
          ],
          [
            "Clases sin autorización ATC",
            "E VFR, F, G",
            "Apéndice 1"
          ],
          [
            "RVSM",
            "1.000 ft entre FL 290 y FL 410",
            "211.530"
          ],
          [
            "Límite inferior de área de control",
            "Mínimo 700 ft (200 m)",
            "211.060(e)"
          ],
          [
            "Zona de control",
            "Mínimo 5 NM (9,3 km)",
            "211.065(b)"
          ],
          [
            "Emergencia / interferencia",
            "7700 / 7500",
            "211.360(a)"
          ],
          [
            "INCERFA",
            "30 minutos",
            "211.720(a)"
          ],
          [
            "ALERFA por no aterrizar",
            "5 minutos tras la hora prevista",
            "211.720(b)(2)"
          ],
          [
            "DETRESFA por combustible",
            "Agotado o insuficiente",
            "211.720(c)(2)"
          ],
          [
            "Emergencia (interceptación)",
            "121,5 MHz",
            "Apéndice 13, 3.1"
          ],
          [
            "TIBA",
            "123,45 MHz",
            "Apéndice 10"
          ],
          [
            "Inglés entre dependencias ATC",
            "Kingston, Curazao y Amazónica",
            "211.405(c)"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "vinetas",
        "items": [
          "De la A a la E es espacio controlado; F y G no lo son. En Colombia todas piden radio en ambos sentidos.",
          "250 kt por debajo de 10.000 ft en C (VFR), D, E, F y G.",
          "Colacionas ruta, pista, altímetro, código, nivel, rumbo y velocidad; lo demás, con un acuse claro.",
          "7700 emergencia, 7500 interferencia ilícita; en interferencia, ATS no nombra la emergencia si tú no lo haces.",
          "INCERFA a los 30 minutos, ALERFA si, autorizado a aterrizar, no lo haces en los 5 minutos siguientes a la hora prevista, DETRESFA si te quedas sin combustible."
        ]
      }
    ]
  },
  {
    "n": 7,
    "title": "RAC 212 · Búsqueda y salvamento",
    "kicker": "Cómo se vuela",
    "minutes": 7,
    "blocks": [
      {
        "kind": "p",
        "text": "Enmienda 2, marzo de 2026 (Resolución 00685 del 2 de marzo de 2026). Antes era el RAC 98."
      },
      {
        "kind": "titulo",
        "text": "¿De qué trata?"
      },
      {
        "kind": "p",
        "text": "Organiza el servicio de búsqueda y salvamento (SAR) de Colombia según el Anexo 12 de la OACI. Casi todo el reglamento está dirigido al proveedor del servicio SAR (PSAR) (212.001), pero tiene una parte que es tuya como piloto al mando (PIC): qué hacer si ves a alguien en peligro, si escuchas una llamada de socorro o una baliza, qué haces si eres el primero en llegar al sitio y cómo leer y contestar las señales visuales entre tierra y aire."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber un piloto"
      },
      {
        "kind": "sub",
        "text": "Quién coordina y en qué fase"
      },
      {
        "kind": "vinetas",
        "items": [
          "El **centro coordinador de salvamento (RCC)** organiza y coordina las operaciones en su región; el **centro conjunto (JRCC)** lo forman la Aerocivil y la autoridad marítima (DIMAR) para lo aéreo y lo marítimo; los **subcentros (RSC)** lo complementan (212.010).",
          "La región SAR colombiana cubre el territorio nacional, las regiones de información de vuelo (FIR) Barranquilla (SKEC) y Bogotá (SKED), el área terminal de San Andrés y el sector norte de la FIR Panamá; los detalles están en la publicación de información aeronáutica (AIP), GEN 3.6 (212.105(a)).",
          "Las **fases de emergencia** (212.010): **Incertidumbre (INCERFA)**: hay duda sobre la seguridad de una aeronave y sus ocupantes; **Alerta (ALERFA)**: se teme por su seguridad; **Peligro (DETRESFA)**: hay motivos justificados para creer que están amenazados por un peligro grave e inminente y necesitan auxilio inmediato.",
          "En fase de peligro, el RCC puede pedir a aeronaves que no están en el plan que escuchen las transmisiones de la aeronave en peligro, de un radio de supervivencia o de un transmisor de localización de emergencia (ELT), que ayuden en lo posible y que le informen (212.405(c)(6))."
        ]
      },
      {
        "kind": "sub",
        "text": "Si ves una aeronave o embarcación en peligro"
      },
      {
        "kind": "p",
        "text": "Salvo que lo consideres ilógico o innecesario, debes (212.425(b)):"
      },
      {
        "kind": "list",
        "items": [
          "**No perderla de vista** hasta que sea ineludible irte o el RCC te diga que ya no hace falta.",
          "**Determinar su posición.**",
          "**Informar al RCC o a la dependencia de tránsito aéreo (ATS)** lo que puedas: tipo, identificación y condición; posición (coordenadas, o distancia y rumbo verdadero desde una referencia o radioayuda); hora de la observación en UTC; número de personas; si alguien la abandonó; señales o balizas de socorro recibidas; meteorología en el sitio; condición aparente de los supervivientes; mejor ruta de acceso por tierra; y otras aeronaves o embarcaciones cercanas que puedan ayudar.",
          "**Seguir las instrucciones** del RCC o del ATS."
        ],
        "ordered": true
      },
      {
        "kind": "sub",
        "text": "Si eres el primero en llegar"
      },
      {
        "kind": "vinetas",
        "items": [
          "Si la primera aeronave en la escena no es SAR, **se hace cargo de las demás que lleguen** hasta que llegue la primera aeronave SAR. Si no puede comunicarse con el RCC o el ATS, cede la dirección, de común acuerdo, a una aeronave que sí pueda (212.425(c)).",
          "Si necesitas pasar información a los supervivientes o a las brigadas en tierra y no hay comunicación en ambos sentidos, lanzas, si es posible, un equipo de comunicaciones o un mensaje impreso (212.425(d)).",
          "Si hay una señal en tierra, indicas si la entendiste o no (212.425(e)).",
          "Si tienes que guiar a una embarcación, das instrucciones precisas por cualquier medio o, sin radio, haces la señal visual (212.425(f))."
        ]
      },
      {
        "kind": "sub",
        "text": "Si captas una llamada de socorro"
      },
      {
        "kind": "p",
        "text": "De ser posible (212.426(a)):"
      },
      {
        "kind": "list",
        "items": [
          "Acusas recibo.",
          "Anotas la posición de quien está en peligro, si la dio.",
          "Tomas una marcación sobre la transmisión.",
          "Informas al RCC o al ATS con toda la información disponible.",
          "Mientras esperas instrucciones, y a tu criterio, te diriges hacia la posición.",
          "Intentas comunicarte con las personas en peligro."
        ],
        "ordered": true
      },
      {
        "kind": "sub",
        "text": "Si escuchas una baliza en 121,5 MHz"
      },
      {
        "kind": "p",
        "text": "Además de lo anterior (212.426(b)):"
      },
      {
        "kind": "vinetas",
        "items": [
          "Anotas y comunicas cuanto antes la **posición donde la escuchaste por primera vez**.",
          "**No tocas el silenciador (squelch)** del radio: mantener el ajuste original le da al RCC la ubicación más precisa.",
          "Si puedes, sigues escuchando hasta que la señal cese y lo informas al RCC o al ATS."
        ]
      },
      {
        "kind": "p",
        "text": "Estos procedimientos deben estar publicados en la AIP, GEN 3.6 (212.426(c))."
      },
      {
        "kind": "sub",
        "text": "Radiofrecuencias que debes conocer"
      },
      {
        "kind": "vinetas",
        "items": [
          "Los ELT transmiten en **121,5 MHz** y en **406,0 a 406,1 MHz** (212.405(c)(6)(i), nota). El sistema satelital COSPAS-SARSAT detecta balizas en 121,5 MHz o 406 MHz (212.010).",
          "Muchos barcos pueden comunicarse en 2.182 kHz, 4.125 kHz, 121,5 MHz y 123,1 MHz, pero **normalmente no escuchan 121,5 ni 123,1**: escuchan el **canal 16 (156,8 MHz)**, la frecuencia internacional marítima de socorro (212.135(b)(4), nota).",
          "Una prueba de ELT **no puede pasar de 20 segundos**, para no disparar falsas alertas; si se necesita más, el explotador avisa al RCC por correo con al menos 24 horas de anticipación (212.455)."
        ]
      },
      {
        "kind": "sub",
        "text": "Señales visuales"
      },
      {
        "kind": "p",
        "text": "Se usan solo con el significado del reglamento, no se usa ninguna otra que se pueda confundir con ellas, y el piloto actúa según la interpretación que da el apéndice (212.430(a) y (b))."
      },
      {
        "kind": "p",
        "text": "**De aire a tierra: «entendí tu señal»** (Apéndice 1, 3):"
      },
      {
        "kind": "vinetas",
        "items": [
          "De día: **alabear las alas**.",
          "De noche: **dos destellos con los faros de aterrizaje** o, si no los tienes, encender y apagar dos veces las luces de navegación.",
          "No hacer ninguna de estas señales indica que no se entendió.",
          "Las figuras del apéndice muestran además: describir un círculo (recibido pero no comprendido), cabecear el morro (afirmativo) y guiñar a izquierda y derecha (negativo)."
        ]
      },
      {
        "kind": "p",
        "text": "**De tierra a aire, hechas por supervivientes** (Apéndice 1, 2.1):"
      },
      {
        "kind": "table",
        "head": [
          "Símbolo",
          "Mensaje"
        ],
        "rows": [
          [
            "V",
            "Necesitamos ayuda"
          ],
          [
            "X",
            "Necesitamos ayuda médica"
          ],
          [
            "N",
            "No o negativo"
          ],
          [
            "Y",
            "Sí o afirmativo"
          ],
          [
            "↑",
            "Estamos avanzando en esta dirección"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "**De tierra a aire, hechas por brigadas** (Apéndice 1, 2.2): LLL, operación terminada; LL, hemos hallado a todas las personas; ++, solo a algunas; XX, imposible continuar, regresamos a la base; dos flechas opuestas, nos dividimos en dos grupos; → →, la aeronave está en esta dirección; NN, no hemos encontrado nada, seguimos buscando."
      },
      {
        "kind": "p",
        "text": "Los símbolos miden **al menos 2,5 m (8 ft)** (Apéndice 1, 2.3)."
      },
      {
        "kind": "p",
        "text": "**Para guiar una embarcación** (Apéndice 1, 1): la rodeas al menos una vez, cruzas bajo por delante de su rumbo alabeando (o abriendo y cerrando gases, o cambiando el paso de la hélice) y vuelas en la dirección a seguir. Para decirle que ya no hace falta, cruzas bajo su estela cerca de la popa alabeando."
      },
      {
        "kind": "p",
        "text": "**Señales de socorro** que puedes ver desde el aire (Apéndice 3): SOS en Morse; disparos a intervalos de un minuto; llamas (vistas de noche hasta 50 NM); bengalas rojas (de noche hasta 35 NM, promedio 10 NM; de día 1 a 2 NM); humo naranja (de día hasta 12 NM con viento menor de 10 kt, promedio 8 NM); destellos de espejo (5 NM, a veces hasta 45 NM); agua coloreada (hasta 10 NM, promedio 3 NM); subir y bajar los brazos extendidos; bandera invertida."
      },
      {
        "kind": "p",
        "text": "**Helicóptero** (Apéndice 2): 15 señales con el cuerpo, por ejemplo pulgar arriba (afirmativo, todo bien), pulgar abajo (negativo, incorrecto), brazos cruzados arriba y abajo (elévese, no aterrice) y brazos extendidos con las palmas arriba (manténgase en estacionario)."
      },
      {
        "kind": "p",
        "text": "**Paneles** (Apéndice 4): los supervivientes usan las velas de la balsa o una tela de dos colores; entre otros mensajes, indican «necesitamos asistencia médica», «puede aterrizar, la flecha indica la dirección» o «no trate de aterrizar»."
      },
      {
        "kind": "sub",
        "text": "Gastos y restos"
      },
      {
        "kind": "vinetas",
        "items": [
          "Quien participa en una operación SAR tiene derecho al reembolso de gastos y a indemnización por daños; los paga el explotador de la aeronave asistida dentro de los **90 días** siguientes. Si no lo hace, la Aerocivil suspende sus aeronaves y, si es empresa comercial, su permiso (212.432).",
          "Si se remueve una aeronave accidentada, el explotador informa de inmediato al RCC (212.320(d)). La preservación de restos para la investigación se complementa con el RAC 114."
        ]
      },
      {
        "kind": "titulo",
        "text": "Datos importantes"
      },
      {
        "kind": "table",
        "head": [
          "Tema",
          "Dato",
          "Numeral"
        ],
        "rows": [
          [
            "Fases de emergencia",
            "INCERFA (duda) · ALERFA (temor) · DETRESFA (peligro grave e inminente)",
            "212.010"
          ],
          [
            "Ves a alguien en peligro",
            "No perderlo de vista, posición, informar al RCC o ATS, seguir instrucciones",
            "212.425(b)"
          ],
          [
            "Hora del reporte",
            "En UTC",
            "212.425(b)(3)(iii)"
          ],
          [
            "Primera aeronave en escena",
            "Dirige a las demás hasta que llegue la primera aeronave SAR",
            "212.425(c)"
          ],
          [
            "Llamada de socorro",
            "Acusar, anotar, marcar, informar, dirigirse, comunicarse",
            "212.426(a)"
          ],
          [
            "Baliza en 121,5 MHz",
            "Posición de la primera escucha; no tocar el squelch",
            "212.426(b)"
          ],
          [
            "Frecuencias ELT",
            "121,5 MHz y 406,0 a 406,1 MHz",
            "212.405(c)(6)(i), nota"
          ],
          [
            "Frecuencia que escuchan los barcos",
            "Canal 16 (156,8 MHz)",
            "212.135(b)(4), nota"
          ],
          [
            "Prueba de ELT",
            "Máximo 20 s; más, aviso al RCC con 24 h",
            "212.455"
          ],
          [
            "«Entendido» de día",
            "Alabear",
            "Apéndice 1, 3.1(a)"
          ],
          [
            "«Entendido» de noche",
            "Dos destellos de faros de aterrizaje o luces de navegación",
            "Apéndice 1, 3.1(b)"
          ],
          [
            "V · X · N · Y · ↑",
            "Ayuda · ayuda médica · no · sí · avanzamos hacia aquí",
            "Apéndice 1, 2.1"
          ],
          [
            "Tamaño de los símbolos",
            "Al menos 2,5 m (8 ft)",
            "Apéndice 1, 2.3"
          ],
          [
            "Reembolso de gastos SAR",
            "90 días, lo paga el explotador asistido",
            "212.432(c)"
          ],
          [
            "Región SAR Colombia",
            "FIR SKEC y SKED, TMA San Andrés, sector norte FIR Panamá",
            "212.105(a)"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Si ves a alguien en peligro: no lo pierdas de vista, fija su posición, informa al RCC o al ATS (hora en UTC) y sigue sus instrucciones.",
          "Si llegas primero y no eres SAR, diriges a las demás aeronaves hasta que llegue la primera aeronave SAR.",
          "Llamada de socorro: acusas recibo, anotas, tomas marcación, informas y te acercas si lo juzgas prudente.",
          "Baliza en 121,5 MHz: anota dónde la oíste primero y no toques el squelch.",
          "«Entendí»: alabear de día, dos destellos de faros de noche. V ayuda, X médica, N no, Y sí.",
          "Los barcos escuchan el canal 16, no 121,5."
        ]
      }
    ]
  },
  {
    "n": 8,
    "title": "RAC 203 · Servicio meteorológico",
    "kicker": "Cómo se vuela",
    "minutes": 7,
    "blocks": [
      {
        "kind": "p",
        "text": "Enmienda 2, marzo de 2026 (Resolución 00686 del 02-mar-2026, Diario Oficial 53.422 del 09-mar-2026; modificó el RAC integralmente para adoptar la Enmienda 82 del Anexo 3 y los PANS-MET, Doc. 10157)."
      },
      {
        "kind": "titulo",
        "text": "¿De qué trata?"
      },
      {
        "kind": "p",
        "text": "El RAC 203 regula al **proveedor** del servicio meteorológico (METP): cómo observa, pronostica, emite avisos y entrega la información a tránsito aéreo, a los explotadores y a las tripulaciones. Casi todo va dirigido a ese proveedor, pero el RAC aplica también a los explotadores de aeronaves «según la materia que les corresponde» (203.005 (c)). Para el piloto hay dos cosas: **lo que tú le reportas al servicio** (observaciones de aeronave, AIREP) y **lo que el servicio te debe entregar** (exposición verbal, documentación de vuelo, información en vuelo). La lectura e interpretación de METAR y TAF está en el módulo de Meteorología de Aviatory y no se repite aquí."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber un piloto"
      },
      {
        "kind": "sub",
        "text": "Tú también eres una estación meteorológica: las observaciones de aeronave"
      },
      {
        "kind": "vinetas",
        "items": [
          "Se hacen dos tipos de observación a bordo (203.305): **Ordinarias**: en ruta y en el ascenso inicial; **Especiales y otras extraordinarias**: en cualquier fase del vuelo.",
          "**Ordinarias**: son **automáticas** por enlace de datos aire-tierra (ADS-C o SSR Modo S): cada **15 minutos** en ruta y cada **30 segundos** durante los **10 primeros minutos** del ascenso inicial (203.310 (a)). En rutas de alta densidad se designa una aeronave por nivel de vuelo, más o menos cada hora (203.310 (c)). **Si la aeronave no tiene enlace de datos aire-tierra, está exenta** de las ordinarias (203.315).",
          "**Especiales**: **todas las aeronaves** las hacen cuando encuentran u observan (203.320): turbulencia **moderada o fuerte**; engelamiento **moderado o fuerte**; onda orográfica **fuerte**; tormentas sin granizo, oscurecidas, inmersas, generalizadas o en líneas de turbonada; tormentas con granizo, en las mismas condiciones; tempestades de polvo o arena fuertes; nube de cenizas volcánicas; actividad volcánica precursora de erupción o erupción; **eficacia de frenado en la pista peor que la notificada.**",
          "**Extraordinarias**: cualquier otra condición, por ejemplo **cizalladura del viento**, que **el piloto al mando** estime que puede afectar la seguridad o la operación de otras aeronaves. Se la advierte a la dependencia ATS **tan pronto como sea posible** (203.325 (a)).",
          "¿Por qué importa tu reporte? Porque el engelamiento, la turbulencia y buena parte de la cizalladura **no se pueden observar bien desde tierra**: en la mayoría de los casos, lo que reporta una aeronave es la única evidencia disponible (203.325 (b))."
        ]
      },
      {
        "kind": "sub",
        "text": "Cómo se reporta"
      },
      {
        "kind": "vinetas",
        "items": [
          "Por **enlace de datos aire-tierra**. Si no hay enlace de datos, o no sirve, las especiales y extraordinarias se reportan **por voz** (203.330 (a)).",
          "**En el momento** de la observación o lo antes posible después (203.330 (b)).",
          "Van como **aeronotificaciones (AIREP)** ordinarias o especiales. Por enlace de datos llevan como mínimo: dirección del viento, velocidad del viento, temperatura del aire y, en las especiales, la condición que las motivó (203.330 (c)). El formulario AIREP está en los PANS-ATM, Doc. 4444 (203.001, «Aeronotificación», Nota).",
          "¿Qué pasa con tu AIREP especial por voz? El ATS lo retransmite sin demora a la oficina de vigilancia meteorológica (OVM) (203.330 (d)); si el fenómeno no justifica un SIGMET, la OVM lo difunde igual que un SIGMET (203.335 (c)); los de actividad volcánica van al centro de avisos de cenizas (VAAC) (203.335 (b)). Las aeronotificaciones especiales se transmiten a otras aeronaves por enlace ascendente durante **60 minutos** (203.330 (e)).",
          "**La obligación del piloto** está escrita en sus propios RAC: RAC 121.2315 (el explotador debe dar a la tripulación procedimientos para hacer estas observaciones y el PIC reporta la eficacia de frenado por AIREP) y RAC 91.580 (el PIC notifica al ATC lo antes posible condiciones adversas que puedan afectar a otras aeronaves)."
        ]
      },
      {
        "kind": "sub",
        "text": "Lo que el servicio te debe dar antes del vuelo"
      },
      {
        "kind": "list",
        "items": [
          "La información MET se da al explotador para planificar y replanificar, y a la **tripulación antes de la salida y en vuelo** (203.701 (a)).",
          "Debe cubrir la hora, la altitud y la extensión geográfica del vuelo, **hasta el aeródromo de aterrizaje previsto y entre este y los alternos** que designe el explotador (203.701 (c)). Debe estar actualizada e incluir información de observación y de pronóstico, de aeródromo y en ruta (203.701 (d)).",
          "Los pronósticos de **viento y temperatura en altitud** y los de **tiempo significativo (SIGWX)** por encima de **FL 100** se entregan apenas estén disponibles, y **por lo menos 3 horas antes de la salida** (203.701 (g)).",
          "**Exposición verbal (briefing) y consulta**: se dan **a petición** de la tripulación. Cubren ruta, destino, alternos y otros aeródromos pertinentes (203.705 (a)). Si el meteorólogo opina que el tiempo en un aeródromo va a diferir apreciablemente del pronóstico de la documentación, **debe hacértelo notar**, y esa parte del briefing queda registrada (203.705 (c)). Si no se puede en persona, se da por teléfono u otro medio (203.705 (e)).",
          "**Documentación de vuelo**: contiene la información de 203.701 (d) (203.710 (a)). Si la información cambia bastante respecto a la de planificación, se avisa al explotador (203.710 (b)); si hace falta una enmienda después de entregarla y antes del despegue, se expide al explotador o al ATS para que llegue a la aeronave (203.710 (c)). Lo que viene de otras oficinas se incluye **sin modificar** (203.710 (e)). El proveedor la guarda **al menos 30 días**, y más si hay una investigación (203.710 (g)).",
          "**Autoservicio**: si el briefing es por un sistema automatizado, debe permitirte consultar con una oficina meteorológica de aeródromo por teléfono, web u otro medio (203.715 (d))."
        ]
      },
      {
        "kind": "sub",
        "text": "Lo que recibes en vuelo"
      },
      {
        "kind": "vinetas",
        "items": [
          "La información para aeronaves en vuelo llega a través del **ATS** y por **VOLMET** o **D-VOLMET** (203.720 (a), (e)). Si la pides en vuelo, la oficina que reciba la solicitud debe conseguirla (203.720 (d)).",
          "**VOLMET por voz**: la continua en VHF trae METAR y SPECI actuales y tendencia si hay; la regular en HF, lo mismo y, si un acuerdo regional lo dice, TAF y SIGMET (203.920).",
          "**D-VOLMET** (enlace de datos): METAR, SPECI, tendencia, TAF, SIGMET, aeronotificaciones especiales no cubiertas por un SIGMET y, si hay, AIRMET (203.915)."
        ]
      },
      {
        "kind": "sub",
        "text": "Avisos que te afectan directamente"
      },
      {
        "kind": "vinetas",
        "items": [
          "**SIGMET**: fenómenos en ruta que afectan la seguridad: tormenta, ciclón tropical, turbulencia, engelamiento, ondas orográficas, tempestad de polvo o arena, cenizas volcánicas y nube radiactiva (203.515 (a)). Validez **máxima de 4 horas**; **6 horas** para cenizas volcánicas y ciclones tropicales (203.515 (c)).",
          "**AIRMET**: para vuelos a baja altura (por debajo de FL 100, o FL 150 en zonas montañosas). Validez máxima de **4 horas** (203.520). El propio RAC advierte que la norma está disponible **para cuando el proveedor decida implementarla** (203.520, Nota).",
          "**Avisos de cizalladura del viento**: cubren la trayectoria de aproximación o despegue, el circuito entre la pista y **500 m (1.600 ft)**, y el recorrido de aterrizaje o despegue. Se cancelan cuando los **reportes de aeronaves** indican que ya no hay cizalladura, o tras un tiempo acordado sin reportes (203.530 (a), (b)). Otra razón para reportar."
        ]
      },
      {
        "kind": "titulo",
        "text": "Datos importantes"
      },
      {
        "kind": "table",
        "head": [
          "Dato",
          "Valor",
          "Numeral"
        ],
        "rows": [
          [
            "Observaciones ordinarias automáticas en ruta",
            "cada 15 min (ADS-C o SSR Modo S)",
            "203.310 (a)"
          ],
          [
            "Observaciones ordinarias en ascenso inicial",
            "cada 30 s, primeros 10 min",
            "203.310 (a)"
          ],
          [
            "Sin enlace de datos aire-tierra",
            "exento de ordinarias; especiales por voz",
            "203.315; 203.330 (a)"
          ],
          [
            "AIREP especial: turbulencia / engelamiento",
            "moderado o fuerte",
            "203.320"
          ],
          [
            "AIREP especial: onda orográfica",
            "fuerte",
            "203.320"
          ],
          [
            "AIREP especial: frenado",
            "eficacia peor que la notificada",
            "203.320 (9)"
          ],
          [
            "Contenido mínimo AIREP por enlace de datos",
            "viento (dirección y velocidad), temperatura, condición que lo motiva",
            "203.330 (c)"
          ],
          [
            "Retransmisión de AIREP especial a otras aeronaves",
            "60 min",
            "203.330 (e)"
          ],
          [
            "Vientos, temperaturas y SIGWX sobre FL 100",
            "a más tardar 3 h antes de la salida",
            "203.701 (g)"
          ],
          [
            "Conservación de la documentación de vuelo",
            "mínimo 30 días",
            "203.710 (g)"
          ],
          [
            "Validez SIGMET",
            "máx. 4 h (6 h cenizas y ciclones)",
            "203.515 (c)"
          ],
          [
            "Validez AIRMET",
            "máx. 4 h",
            "203.520 (c)"
          ],
          [
            "Aviso de cizalladura",
            "hasta 500 m (1.600 ft) sobre la pista",
            "203.530 (a)"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "El RAC 203 es para el proveedor meteorológico; al piloto le toca reportar y le toca recibir.",
          "Reporta AIREP especial por turbulencia o engelamiento moderado o fuerte, onda orográfica fuerte, tormentas, polvo o arena, cenizas o volcán, y frenado peor que el notificado.",
          "Cizalladura y cualquier otra cosa que pueda afectar a otros: avísala al ATS lo antes posible.",
          "Sin enlace de datos, las especiales van por voz, en el momento o lo antes posible.",
          "El briefing es a petición; la documentación cubre ruta, destino y alternos; lo que cambie antes del despegue te debe llegar como enmienda.",
          "SIGMET dura máximo 4 h (6 h cenizas y ciclones). En vuelo: ATS, VOLMET y D-VOLMET."
        ]
      }
    ]
  },
  {
    "n": 9,
    "title": "RAC 119 · Certificación de explotadores",
    "kicker": "La aerolínea",
    "minutes": 4,
    "blocks": [
      {
        "kind": "p",
        "text": "Enmienda 4, febrero de 2026 (Resolución 00206 del 22 de enero de 2026)."
      },
      {
        "kind": "titulo",
        "text": "¿De qué trata?"
      },
      {
        "kind": "p",
        "text": "Fija cómo una empresa obtiene y conserva el permiso para hacer transporte aéreo comercial en Colombia, cuándo debe operar según el RAC 121 o el RAC 135 y qué directivos debe tener."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber un piloto"
      },
      {
        "kind": "sub",
        "text": "El certificado y las especificaciones de operación"
      },
      {
        "kind": "vinetas",
        "items": [
          "En Colombia el certificado de explotador de servicios aéreos (AOC en la OACI) se llama **certificado de operación (CDO)**. Sin CDO válido y sin sus especificaciones no se hace transporte aéreo comercial (119.010(a), 119.020(a)).",
          "Las **especificaciones relativas a las operaciones (OpSpecs)** son las autorizaciones, aprobaciones, condiciones y limitaciones de cada modelo de aeronave. Forman parte del CDO y están sujetas a las condiciones del manual de operaciones (119.025(a) y (b)).",
          "Qué traen las OpSpecs (119.270(a)): matrículas, tipos de operación, área autorizada, limitaciones especiales y aprobaciones específicas como mercancías peligrosas, baja visibilidad, separación vertical mínima reducida (RVSM), vuelos con tiempo de desviación extendido (EDTO), navegación basada en la performance con autorización obligatoria (PBN AR) y maletines electrónicos de vuelo (EFB). La empresa no puede volar en un área que sus OpSpecs no autoricen (119.020(d)).",
          "Lo que te toca: el explotador debe **llevar a bordo copia de las OpSpecs**, con traducción al inglés en vuelos internacionales, y mantenerte informado de lo que aplica a tus funciones; su cumplimiento es obligatorio (119.260(a)). Si hay arrendamiento, intercambio o fletamento, va a bordo una copia del contrato (Apéndice 1, nota 20).",
          "Un CDO 121 puede incluir operaciones 135 en sus OpSpecs; un CDO 135 no puede operar bajo 121 (119.015(c))."
        ]
      },
      {
        "kind": "sub",
        "text": "¿121 o 135?"
      },
      {
        "kind": "table",
        "head": [
          "Operación",
          "RAC 121",
          "RAC 135"
        ],
        "rows": [
          [
            "**Regular** con aviones",
            "Turborreactores (de cualquier tamaño), o turbohélices de más de 19 asientos o más de 5.700 kg (119.110(a)(1))",
            "Turbohélices y recíprocos de 19 asientos o menos **y** 5.700 kg o menos (119.115(a)(1))"
          ],
          [
            "**No regular** con aviones",
            "Más de 19 asientos, o más de 5.700 kg, o carga paga de más de 3.400 kg en carga exclusiva (119.110(a)(2))",
            "19 asientos o menos y 5.700 kg o menos, incluso turborreactores, o carga paga de 3.400 kg o menos (119.115(a)(2))"
          ],
          [
            "**Helicópteros**",
            "No aplica",
            "Todas, regulares y no regulares (119.120)"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "El RAC 119 no aplica a instrucción de alumnos, vuelos ferry o de entrenamiento ni trabajos aéreos especiales, entre otros (119.005(c))."
      },
      {
        "kind": "sub",
        "text": "Personal directivo obligatorio (RAC 121)"
      },
      {
        "kind": "p",
        "text": "La empresa designa un **directivo responsable** (financia las operaciones y promueve la política de seguridad operacional del RAC 219) y cubre estos puestos (119.330(b) y (d)):"
      },
      {
        "kind": "vinetas",
        "items": [
          "Director o responsable de operaciones.",
          "Director de gestión del mantenimiento de la aeronavegabilidad.",
          "Gerente del sistema de gestión de la seguridad operacional (SMS).",
          "**Jefe de pilotos**.",
          "Jefe de entrenamiento."
        ]
      },
      {
        "kind": "p",
        "text": "Cambios o vacantes se notifican a la Aerocivil en **10 días** (119.330(h)(3)). Requisitos para servir en 121:"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Director de operaciones**: licencia de piloto de transporte de línea (PTL) y 3 años como director o supervisor con control operacional en los últimos 6 años; si es su primera vez, 3 años en los últimos 6 como piloto al mando (PIC) de aviones de más de 5.700 kg (119.335(a)).",
          "**Jefe de pilotos**: PTL habilitado en al menos un avión de la flota; si es su primera vez, 3 años en los últimos 6 como PIC de aviones de más de 5.700 kg (119.335(b)).",
          "**Jefe de entrenamiento**: conocer los RAC, el manual, el programa de entrenamiento y las OpSpecs, y tener habilitación de instructor de vuelo en un equipo de la flota (119.335(e)).",
          "La Aerocivil puede aceptar experiencia equivalente y revocar esa desviación (119.335(f) y (g))."
        ]
      },
      {
        "kind": "p",
        "text": "En el RAC 135 no se exige jefe de entrenamiento. Si los PIC necesitan PTL, el director de operaciones y el jefe de pilotos también, con 3 años de PIC en operación comercial; si basta licencia comercial (PCA), se exige al menos PCA con instrumentos cuando aplique (119.340(d), 119.345)."
      },
      {
        "kind": "sub",
        "text": "El inspector a bordo"
      },
      {
        "kind": "p",
        "text": "Si un inspector acreditado de la Aerocivil se presenta ante el PIC para inspeccionar, el PIC debe **admitirlo a bordo** con acceso libre y darle los medios para su labor. Si se niega, el inspector puede inmovilizar la aeronave, sin perjuicio de sanciones. El explotador reserva el **asiento del observador** para los inspectores (119.315(b)(4) y (c))."
      },
      {
        "kind": "titulo",
        "text": "Datos importantes"
      },
      {
        "kind": "table",
        "head": [
          "Tema",
          "Valor",
          "Numeral"
        ],
        "rows": [
          [
            "Nombre del AOC en Colombia",
            "Certificado de operación (CDO)",
            "119.001, 119.010"
          ],
          [
            "Límite 121/135",
            "19 asientos · 5.700 kg · 3.400 kg de carga paga",
            "119.110, 119.115"
          ],
          [
            "Jet regular",
            "Siempre RAC 121",
            "119.110(a)(1)(i)"
          ],
          [
            "OpSpecs a bordo",
            "Copia; en inglés si es internacional",
            "119.260(a)(6)"
          ],
          [
            "Experiencia de director de operaciones y jefe de pilotos (121)",
            "PTL + 3 años en los últimos 6",
            "119.335(a), (b)"
          ],
          [
            "Cambio de directivos",
            "Notificar en 10 días",
            "119.330(h)(3)"
          ],
          [
            "Operación de emergencia autorizada por la Aerocivil sin tiempo para enmendar las OpSpecs: informe escrito del explotador",
            "48 horas después de completarla",
            "119.310(b)(2)(ii)"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "vinetas",
        "items": [
          "El AOC colombiano es el CDO; las OpSpecs dicen qué, dónde y con qué aprobaciones puede volar cada avión.",
          "Copia de las OpSpecs a bordo, en inglés si el vuelo es internacional.",
          "Jet regular o avión de más de 19 sillas o 5.700 kg: RAC 121. Lo pequeño y todos los helicópteros: RAC 135.",
          "El director de operaciones y el jefe de pilotos de una aerolínea 121 son PTL con 3 años de experiencia en los últimos 6.",
          "Al inspector de la Aerocivil se le da acceso a bordo; negarse puede inmovilizar el avión."
        ]
      }
    ]
  },
  {
    "n": 10,
    "title": "RAC 121 · Operación de aerolíneas",
    "kicker": "La aerolínea",
    "minutes": 12,
    "blocks": [
      {
        "kind": "p",
        "text": "Enmienda 10, julio de 2025 (Resolución 01983 del 31 de julio de 2025, surte efecto el 4 de agosto de 2025)."
      },
      {
        "kind": "titulo",
        "text": "¿De qué trata?"
      },
      {
        "kind": "p",
        "text": "Es el reglamento de la aerolínea. Aplica a quien tiene un certificado de operación (CDO) del RAC 119 y vuela transporte regular en turborreactores, o en turbohélices y recíprocos de más de 19 asientos o más de 5.700 kg; también a los no regulares con aviones de más de 19 asientos o más de 5.700 kg, o de carga con más de 3.400 kg de carga paga (121.005). Se suma al RAC 91 (121.2205) y define quién puede ser tripulante, cómo se entrena, cuánto vuela, cómo se despacha y qué responde el piloto al mando (PIC)."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber un piloto"
      },
      {
        "kind": "sub",
        "text": "Requisitos para volar en la aerolínea"
      },
      {
        "kind": "vinetas",
        "items": [
          "Licencia, habilitación y evaluación médica vigentes, y ser empleado del explotador (121.1410 (a)(g)).",
          "PIC: licencia de piloto de transporte de línea (PTL), habilitación de tipo y médico Clase I. Copiloto: como mínimo licencia comercial con habilitación de tipo, de instrumentos y médico Clase I (121.1730).",
          "Nadie vuela como PIC ni copiloto después de cumplir 65 años, y en una tripulación de más de un piloto solo uno puede tener más de 60 (121.1410 (c)(d)).",
          "La tripulación mínima es de dos pilotos, y el explotador debe evitar que vuelen juntos tripulantes sin la experiencia adecuada (121.1420 (a)(4)(5))."
        ]
      },
      {
        "kind": "sub",
        "text": "Tu instrucción en la aerolínea"
      },
      {
        "kind": "p",
        "text": "El RAC distingue instrucción inicial, de transición (otro avión del mismo grupo), de promoción (de copiloto a PIC), de diferencias, periódica y de recalificación (121.1515). Grupo I son los aviones de hélice y Grupo II los turborreactores (121.1510)."
      },
      {
        "kind": "vinetas",
        "items": [
          "Empiezas con una inducción básica (reglamentos, manual de operaciones o MO, mercancías peligrosas, sistema de gestión de la seguridad operacional o SMS, seguridad de la aviación o AVSEC, factores humanos) y sigues con tierra y vuelo iniciales (121.1595 (a)(1); 121.1610; 121.1630). Las horas están en la tabla.",
          "El vuelo inicial se hace con tripulación completa e incluye un entrenamiento orientado a la línea de vuelo (LOFT) de al menos 2 h en simulador: un trayecto normal y otro con una anormalidad (121.1630 (a)(3)).",
          "La instrucción en envolventes extendidas (prevención y recuperación de la pérdida de control, UPRT) va en simulador de vuelo (FFS) nivel C o D: vuelo lento, pérdida completa, salidas y llegadas manuales, actitudes anormales y aterrizaje con rebote (121.1627).",
          "Para servir, el periódico de tierra y vuelo y la verificación de la competencia deben estar hechos en los 6 meses calendario anteriores (121.1720 (c)). Si se hacen un mes antes o después del mes requerido, cuentan como hechos a tiempo (121.1520 (e)).",
          "Si ya volaste el mismo tipo en otra empresa, recibes la instrucción de procedimientos del nuevo explotador, más corta que la inicial (121.1720 (a))."
        ]
      },
      {
        "kind": "sub",
        "text": "Experiencia operacional y consolidación"
      },
      {
        "kind": "p",
        "text": "Después del curso vuelas en línea supervisado (en la industria, IOE). El PIC en formación vuela con un chequeador (CHK) o instructor que actúa como PIC desde la silla derecha, y el último trayecto lo evalúa un inspector de la Unidad Administrativa Especial de Aeronáutica Civil (UAEAC) o un examinador designado (ED) (121.1725 (c)(1)). El copiloto vuela bajo vigilancia de un CHK o instructor (121.1725 (c)(2)). Para consolidar, debes completar 100 horas en línea, incluidas las de experiencia operacional, dentro de los 120 días siguientes a la prueba de pericia de la licencia o de la habilitación de tipo (121.1725 (g))."
      },
      {
        "kind": "sub",
        "text": "Emparejamiento de tripulaciones nuevas"
      },
      {
        "kind": "vinetas",
        "items": [
          "Si el copiloto tiene menos de 100 h en el tipo y el PIC no es instructor ni CHK, el PIC hace todos los despegues y aterrizajes en aeródromos especiales y cuando: la visibilidad o el alcance visual en la pista (RVR) es de 1.200 m o menos; la pista tiene agua, nieve o nieve fangosa; el frenado es menor que «bueno»; el viento cruzado supera 15 nudos; hay cortante de viento; o el PIC lo cree prudente (121.1735 (a)).",
          "Uno de los dos debe tener al menos 75 h en línea en el tipo (121.1735 (b)).",
          "El PIC nuevo en el tipo sube sus mínimos de aterrizaje por instrumentos (IFR) hasta completar 100 h como PIC en él (121.2685)."
        ]
      },
      {
        "kind": "sub",
        "text": "Mantenerte vigente"
      },
      {
        "kind": "vinetas",
        "items": [
          "Si pasas de 90 días sin 3 despegues y 3 aterrizajes, el restablecimiento crece con la inactividad: con CHK hasta 180 días; periódico y verificación hasta 12 meses; repaso de 16 h, cuatro sesiones y verificación ante inspector o ED hasta 60 meses; y curso inicial más allá (121.1745 (a)).",
          "La verificación de la competencia es semestral; dos hechas en 4 meses consecutivos no bastan por sí solas. Una maniobra fallada se repite una sola vez, y si no apruebas no vuelas (121.1760 (a)(d)).",
          "Como PIC necesitas verificación en línea anual y calificación de ruta y aeródromo: terreno, altitudes mínimas, meteorología, servicios de tránsito aéreo (ATS), avisos a los aviadores (NOTAM), obstáculos y procedimientos (121.1755; 121.1765). Los aeródromos especiales y las rutas con navegación especial (como la navegación basada en la performance, PBN) exigen práctica en los 12 meses previos (121.1770).",
          "Quien opera desde ambos puestos recibe instrucción extra en falla de motor al despegue y en aproximación, sobrepaso y aterrizaje con un motor inoperativo (121.1785)."
        ]
      },
      {
        "kind": "sub",
        "text": "Autoridad y responsabilidad del PIC"
      },
      {
        "kind": "list",
        "items": [
          "El PIC y el director de operaciones responden juntos por iniciar, continuar, desviar y terminar el vuelo; el PIC y el despachador de vuelo (DV), por planificarlo y ejecutarlo (121.2215 (b)(c)).",
          "En vuelo el PIC tiene autoridad total sobre el avión y la tripulación (121.2215 (e)). Responde por las personas desde que se cierran las puertas hasta que abandona el avión, y por el avión desde que está listo para moverse hasta que se apagan los motores (121.2250 (b)).",
          "Verifica el avión contra la lista de equipo mínimo (MEL), la meteorología, los NOTAM y las licencias y médicos de su tripulación, y diligencia el libro de a bordo (121.2250 (b)(f)).",
          "No lleva a nadie que parezca bajo efectos del alcohol o de sustancias psicoactivas, no apaga registradores en vuelo y los preserva tras un accidente o incidente grave (121.2250 (e)). Puede desembarcar a cualquier persona o carga que sea un riesgo (121.2250 (d)).",
          "En emergencia puede desviarse de procedimientos, mínimos y del propio reglamento, y luego lo reporta por escrito (121.2300).",
          "Si un motor falla o se apaga, aterriza en el aeródromo apropiado más cercano; solo con tres o más motores y uno afectado puede elegir otro igual de seguro (121.2320 (a)(b))."
        ]
      },
      {
        "kind": "sub",
        "text": "En la cabina de mando"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Cabina estéril**: en rodaje, despegue, aterrizaje y todo lo que se vuele bajo 10.000 ft (salvo crucero) solo se hace lo necesario para operar: nada de llamadas de catering, anuncios promocionales, formularios, comer, conversar ni leer (121.2255 (a)-(c)).",
          "Arnés en despegue y aterrizaje; cinturón siempre en tu puesto; en ruta solo sales por funciones, necesidad fisiológica o relevo (121.2260). El piloto que no vuela actúa como piloto monitoreando (PM) (121.2262).",
          "La puerta de cabina se asegura desde que cierran las puertas exteriores hasta el desembarque, salvo para personas autorizadas (121.6110 (a)).",
          "Con pasajeros o carga a bordo no se simulan anormales, emergencias ni condiciones de vuelo por instrumentos (IMC) (121.2425)."
        ]
      },
      {
        "kind": "sub",
        "text": "Tiempos de vuelo, servicio y descanso (Apéndice 18)"
      },
      {
        "kind": "p",
        "text": "El explotador cumple el Apéndice 18 o usa un sistema de gestión de riesgos asociados a la fatiga (FRMS) aprobado (121.1910 (b)). El tiempo de vuelo se cuenta «cuña a cuña» y el servicio empieza 1:30 h antes de un vuelo internacional y 1 h antes de uno doméstico; la reserva y los traslados como tripulante adicional también son servicio (Ap. 18, 1.1 (c)(1), (d)(1)). Grupo A son los reactores de transporte y turbohélices cuatrimotores; Grupo B, los demás."
      },
      {
        "kind": "vinetas",
        "items": [
          "Máximo 5 asignaciones seguidas. Si la asignación empieza entre las 15:00 y las 03:00, el servicio máximo baja 1 h (Ap. 18, 1.1 (e)(2)(ix)(x)).",
          "Por fuerza mayor se puede terminar el vuelo excediendo el servicio hasta 2 h en internacional o 1 h en nacional; la empresa lo informa a la UAEAC en 48 h (Ap. 18, 1.1 (e)(2)(xi)).",
          "Nadie inicia servicio sin su descanso, y la empresa y el comandante responden por los límites (Ap. 18, 1.1 (e)(2)(xvi), (h)(3))."
        ]
      },
      {
        "kind": "sub",
        "text": "Fatiga y descanso controlado"
      },
      {
        "kind": "p",
        "text": "Con FRMS, tus reportes de fatiga son parte del proceso proactivo y reactivo (Ap. 16 (b)(1)). Si la empresa adopta el descanso controlado en el puesto (121.1916), se usa en vuelos de 3 h o más, un piloto a la vez, máximo 40 minutos más 20 para reasumir, solo en crucero y hasta 30 min antes del tope de descenso, con piloto automático operativo y un medio para despertar. El que queda a los mandos no deja el asiento, y al terminar informa posición, combustible y meteorología. No sustituye el sueño previo ni se usa durante la experiencia operacional inicial (Ap. 19)."
      },
      {
        "kind": "sub",
        "text": "Despacho: lo que firmas"
      },
      {
        "kind": "vinetas",
        "items": [
          "Ningún vuelo sale sin autorización de un DV, y el PIC y el DV firman el despacho solo si ambos creen que el vuelo es seguro (121.2510 (a); 121.2705). El despacho lleva tripulación, aeródromos, alternos, combustible mínimo requerido y la meteorología anexa (121.2825).",
          "El PIC prepara, aprueba y firma el plan operacional de vuelo, y prepara el plan de vuelo ATS (121.2555; 121.2715 (a)).",
          "Con equipo inoperativo solo se sale con MEL aprobada. No se despega con nieve, escarcha o hielo adherido a superficies críticas, y la verificación de contaminación se hace desde afuera en los 5 min previos al despegue (121.2615 (c); 121.2620 (d)-(f))."
        ]
      },
      {
        "kind": "sub",
        "text": "Alternos, mínimos y combustible"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Alterno de despegue** si la salida está bajo mínimos de aterrizaje o no se puede regresar: a 1 h con un motor inoperativo en bimotores o 2 h con todos los motores en tres o más (121.2575).",
          "**Alterno de destino**: al menos uno en IFR, y dos si el destino estará bajo mínimos o no hay meteorología (121.2585). Más de 60 min a un alterno en ruta en bimotor de turbina exige aprobación de tiempo de desviación extendido (EDTO) (121.2581 (b)(1)).",
          "**Prohibición de aproximación**: sin visibilidad o RVR en mínimos no se continúa por debajo de 1.000 ft sobre el aeródromo; si el informe malo llega después, puedes seguir hasta la altitud o altura de decisión (DA/H) o la mínima de descenso (MDA/H) y aterrizar solo con la referencia visual requerida (121.2680 (c)(d)). Bajo 1.000 ft continúas solo si el estado de la pista y la performance aseguran el aterrizaje (121.2327).",
          "**Combustible**: se planifica por componentes (rodaje, trayecto, contingencia, alterno, reserva final, adicional y discrecional) y en vuelo la reserva final se protege con «combustible mínimo» y «MAYDAY, MAYDAY, MAYDAY, COMBUSTIBLE» (121.2645; 121.2553). Se estudia a fondo en Gestión del combustible."
        ]
      },
      {
        "kind": "sub",
        "text": "Documentos a bordo"
      },
      {
        "kind": "p",
        "text": "Son 23, entre ellos matrícula, aeronavegabilidad, licencias y médicos de la tripulación, libro de vuelo, copia del CDO y las especificaciones de operación (OpSpecs), plan operacional, registro técnico, plan ATS, NOTAM, meteorología, peso y balance y la notificación de mercancías peligrosas (121.2810 (a)). El libro de a bordo se lleva al día, en tinta seca, y el PIC responde por su veracidad (121.2870 (b))."
      },
      {
        "kind": "sub",
        "text": "Mercancías peligrosas y sustancias psicoactivas"
      },
      {
        "kind": "vinetas",
        "items": [
          "Las mercancías peligrosas se estudian en la inducción y en cada periódico (121.1595 (a)(1)(v); 121.1645 (b)(3)). Si la empresa las lleva como carga, te debe entregar información escrita, exacta y legible sobre lo que va a bordo (121.5110 (a)(3)(v)). Lo demás vive en el RAC 175.",
          "Nadie con funciones críticas para la seguridad las ejerce bajo el efecto de sustancias psicoactivas (121.025). El programa de prevención y control está en el RAC 120."
        ]
      },
      {
        "kind": "titulo",
        "text": "Datos importantes"
      },
      {
        "kind": "p",
        "text": "**Requisitos, instrucción y vigencia**"
      },
      {
        "kind": "table",
        "head": [
          "Tema",
          "Valor",
          "Numeral"
        ],
        "rows": [
          [
            "Edad máxima de PIC o copiloto",
            "65 años; solo uno mayor de 60 por tripulación",
            "121.1410 (c)(d)"
          ],
          [
            "Inducción básica",
            "40 h",
            "121.1595 (a)(1)"
          ],
          [
            "Tierra inicial (recíproco / turbohélice / reactor)",
            "64 / 80 / 120 h",
            "121.1610 (b)"
          ],
          [
            "Vuelo inicial (mismo orden)",
            "10 / 15 / 20 h",
            "121.1630 (c)"
          ],
          [
            "Periódico en tierra (mismo orden)",
            "16 / 20 / 25 h",
            "121.1645 (c)(1)"
          ],
          [
            "Verificación de la competencia",
            "2 al año",
            "121.1760 (a)"
          ],
          [
            "Verificación en línea del PIC",
            "cada 12 meses calendario",
            "121.1755 (a)"
          ],
          [
            "UPRT",
            "cada 12 meses calendario",
            "121.1627 (d)"
          ],
          [
            "LOFT periódico",
            "1 de cada 3 repasos, máximo cada 2 años",
            "121.1645 (d)(1)(iii)"
          ],
          [
            "Gestión de recursos de la tripulación (CRM), periódico",
            "cada 2 años",
            "121.1535 (b)"
          ],
          [
            "Ejercicios de emergencia",
            "cada 24 meses calendario",
            "121.1600 (c)(2)"
          ],
          [
            "Experiencia operacional",
            "50 h sin experiencia en el grupo, 30 h con ella; 4 ciclos, 2 como piloto que vuela (PF)",
            "121.1725 (c)(3)"
          ],
          [
            "Consolidación",
            "100 h en línea en 120 días, ampliable a 150",
            "121.1725 (g)(h)"
          ],
          [
            "PIC con menos de 100 h como PIC en el tipo",
            "+100 ft y +900 m a los mínimos; nunca bajo 300 ft y 1,8 km",
            "121.2685 (a)"
          ],
          [
            "Experiencia reciente",
            "3 despegues y 3 aterrizajes en 90 días",
            "121.1745 (a)"
          ],
          [
            "Relevo en crucero de largo alcance",
            "1.500 h totales y 10 trayectos de largo alcance en el tipo; releva al PIC solo sobre FL 200",
            "121.1750 (c); 121.1795 (d)"
          ],
          [
            "Oxígeno de la tripulación",
            "cabina sobre 10.000 ft más de 30 min, y siempre sobre 13.000 ft",
            "121.2405"
          ],
          [
            "Piloto automático",
            "no bajo 500 ft en despegue ni en ruta (o el doble de la pérdida de altitud del AFM, si es mayor); en aproximación, no más de 50 ft bajo la DA(H) o MDA, salvo las excepciones de la norma (por ejemplo, aterrizaje automático aprobado)",
            "121.2375"
          ],
          [
            "Libro de a bordo",
            "se conserva 3 años",
            "121.2870 (b)"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "**Máximas horas de vuelo por día, pilotos** (Ap. 18, 1.1 (c)(2)(iv); Grupo A / Grupo B)"
      },
      {
        "kind": "table",
        "head": [
          "Sectores",
          "2 pilotos",
          "3 pilotos",
          "4 pilotos"
        ],
        "rows": [
          [
            "6 o menos",
            "9:00 / 9:00",
            "14:00 / 14:00",
            "18:00 / 18:00"
          ],
          [
            "7",
            "8:00 / 8:30",
            "13:00 / 13:00",
            "17:00 / 17:00"
          ],
          [
            "8",
            "no / 8:30",
            "12:00 / 12:00",
            "15:00 / 15:00"
          ],
          [
            "9",
            "no / 8:00",
            "10:00 / 11:00",
            "12:00 / 12:00"
          ],
          [
            "10",
            "no / 8:00",
            "no / 11:00",
            "no / 12:00"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "Más de 10 sectores: 7:00 en Grupo B."
      },
      {
        "kind": "p",
        "text": "**Máximas horas de servicio por día, pilotos** (Ap. 18, 1.1 (d)(2); Grupo A / Grupo B)"
      },
      {
        "kind": "table",
        "head": [
          "Sectores",
          "2 pilotos",
          "3 pilotos",
          "4 pilotos"
        ],
        "rows": [
          [
            "6 o menos",
            "12:30 / 12:30",
            "17:00 / 17:00",
            "20:00 / 20:00"
          ],
          [
            "7",
            "11:30 / 12:30",
            "15:00 / 15:00",
            "20:00 / 20:00"
          ],
          [
            "8",
            "no / 12:30",
            "14:00 / 14:00",
            "19:00 / 19:00"
          ],
          [
            "9",
            "no / 12:30",
            "12:00 / 12:00",
            "18:00 / 18:00"
          ],
          [
            "10",
            "no / 12:30",
            "",
            ""
          ]
        ]
      },
      {
        "kind": "p",
        "text": "**Acumulados y descansos** (Apéndice 18)"
      },
      {
        "kind": "table",
        "head": [
          "Límite",
          "Valor",
          "Numeral"
        ],
        "rows": [
          [
            "Vuelo",
            "50 h en la quincena, 90 en el mes, 270 en el trimestre, 1.000 en el año",
            "1.1 (c)(2)(iv)"
          ],
          [
            "Servicio en el mes",
            "190 h Grupo A, 200 h Grupo B",
            "1.1 (d)(2)"
          ],
          [
            "Descanso en la base",
            "vuelo de hasta 4 h: 10 h; hasta 8 h: 12 h; más de 8 h: el doble de lo volado, máximo 24 h",
            "1.1 (h)(2)(i)"
          ],
          [
            "Descanso fuera de la base",
            "vuelo de hasta 4 h: 10 h; hasta 9 h: 12 h; más de 9 h y hasta 12 h: 18 h",
            "1.1 (h)(2)(ii)"
          ],
          [
            "Días libres",
            "9 al mes en la base",
            "1.1 (i)(1)(i)"
          ],
          [
            "No regulares",
            "hasta 15 h de servicio con 4 h de vuelo y 4 trayectos o menos",
            "1.3 (a)"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "**Reportes que hace el piloto**"
      },
      {
        "kind": "table",
        "head": [
          "Qué",
          "A quién y cuándo",
          "Numeral"
        ],
        "rows": [
          [
            "Accidente con muertos, heridos graves o daños importantes",
            "autoridad más próxima, por el medio más rápido",
            "121.2250 (c)"
          ],
          [
            "Defectos del avión",
            "al explotador al terminar el vuelo, y en el registro técnico",
            "121.2250 (c); 121.2317"
          ],
          [
            "Uso de autoridad de emergencia",
            "por escrito a la UAEAC, vía gerente de operaciones, dentro de los 10 días calendario tras volver a la base",
            "121.2300 (c)(2)"
          ],
          [
            "Apagado de motor en vuelo",
            "a la estación en tierra, en cuanto se pueda",
            "121.2320 (c)"
          ],
          [
            "Turbulencia o hielo moderado o fuerte, onda orográfica fuerte, tormentas, ceniza volcánica",
            "aeronotificación (AIREP), al observarlo",
            "121.2315 (c)(g)"
          ],
          [
            "Frenado peor que el notificado",
            "AIREP",
            "121.2315 (i)"
          ],
          [
            "Interferencia ilícita",
            "a la UAEAC, sin demora",
            "121.6125"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "PIC de aerolínea: PTL, habilitación de tipo y médico Clase I. Copiloto: comercial con tipo e instrumentos. Nadie vuela como piloto después de los 65.",
          "Tras el curso vienen 30 a 50 horas supervisadas, que cuentan dentro de las 100 horas de consolidación en 120 días. Mientras seas nuevo, el emparejamiento y los mínimos más altos te protegen.",
          "Entrenas y te chequean cada seis meses, y la verificación en línea es anual.",
          "El PIC tiene autoridad total en vuelo y firma con el DV el despacho. En emergencia puede apartarse del reglamento, pero después lo reporta por escrito.",
          "Los límites del Apéndice 18 se miden «cuña a cuña»: 90 horas de vuelo al mes y 1.000 al año.",
          "Por debajo de 10.000 ft, cabina estéril."
        ]
      }
    ]
  },
  {
    "n": 11,
    "title": "RAC 135 · Operaciones de transporte menores",
    "kicker": "La aerolínea",
    "minutes": 5,
    "blocks": [
      {
        "kind": "p",
        "text": "Enmienda 8, febrero de 2026 (Resolución 00512 del 16 de febrero de 2026)."
      },
      {
        "kind": "titulo",
        "text": "¿De qué trata?"
      },
      {
        "kind": "p",
        "text": "Es el reglamento de las empresas de transporte aéreo comercial «pequeño»: aviones de hasta 19 asientos y 5.700 kg, carga liviana, helicópteros y ambulancia aérea. Si vienes de taxi aéreo o vas a volar en una empresa 135, aquí están los requisitos para ser piloto al mando o copiloto, tus chequeos, tu recencia y tus tiempos de vuelo. Las aerolíneas grandes van por el RAC 121."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber un piloto"
      },
      {
        "kind": "sub",
        "text": "Qué operaciones cubre"
      },
      {
        "kind": "p",
        "text": "Titulares de un certificado de operación (CDO) del RAC 119 que hagan (135.005(a)):"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Regulares** con aviones turbohélice o recíprocos de **19 asientos de pasajeros o menos** y **5.700 kg o menos** de peso (masa) máximo de despegue.",
          "**No regulares** con turborreactores, turbohélice o recíprocos dentro de esos límites, o solo de carga con **carga paga de 3.400 kg o menos**.",
          "**Helicópteros**, regulares y no regulares, y **ambulancia aérea** (135.017, Apéndice 20)."
        ]
      },
      {
        "kind": "p",
        "text": "Hasta que termine la transición del RAC 61 (31/08/2027), sus referencias se leen como RAC 2 o RAC 4 (nota de 135.005)."
      },
      {
        "kind": "sub",
        "text": "Quién puede ser piloto al mando (PIC)"
      },
      {
        "kind": "p",
        "text": "Con pasajeros (135.810(a)):"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Turborreactor, 10 o más asientos o multimotor**: licencia de piloto de transporte de línea (PTL) o comercial (PCA) con habilitación de clase o tipo, e instrumentos cuando aplique.",
          "**Helicóptero**: PTL o PCA con habilitación de tipo, e instrumentos cuando aplique.",
          "**Monomotor recíproco**: PCA con habilitación de instrumentos, según aplique."
        ]
      },
      {
        "kind": "p",
        "text": "Sin PTL necesitas (135.810(b) y (c)):"
      },
      {
        "kind": "vinetas",
        "items": [
          "**VFR**: 500 horas como piloto, con 100 de vuelo de crucero.",
          "**IFR**: 1.200 horas como piloto, con 500 de crucero, 75 de instrumentos (reales o en simulador) de las cuales al menos 50 reales, y al menos 10 de vuelo nocturno."
        ]
      },
      {
        "kind": "p",
        "text": "Antes de quedar designado, vuelas **experiencia operacional** como PIC bajo supervisión de instructor o chequeador (CHK): 10 h en monomotor, 15 h en multimotor recíproco, 20 h en multimotor de turbina y 25 h en turborreactor. Se puede reducir hasta la mitad cambiando cada hora por un despegue y aterrizaje adicional (135.815)."
      },
      {
        "kind": "sub",
        "text": "Copiloto y piloto único"
      },
      {
        "kind": "vinetas",
        "items": [
          "El copiloto necesita licencia comercial con la categoría y clase, e instrumentos si aplica (135.820(a)).",
          "Copiloto obligatorio con **10 o más asientos** (135.255(b)), con **pasajeros en IFR** (135.275) y en **Categoría II** (135.290).",
          "El copiloto IFR se puede reemplazar por un piloto automático aprobado en las especificaciones de operación (OpSpecs), salvo con 10 o más asientos o en Categoría II; el PIC necesita **100 horas en la misma marca y modelo** (135.280).",
          "**Piloto único en IFR o de noche**: solo con aprobación, avión de hélice y **9 asientos o menos** (135.375). El PIC necesita 50 h en la clase (10 como PIC), 25 h IFR y 15 h de noche, y recencia de 90 días: 5 vuelos IFR con 3 aproximaciones, y 3 despegues y aterrizajes de noche, o un chequeo equivalente (135.850)."
        ]
      },
      {
        "kind": "sub",
        "text": "Recencia"
      },
      {
        "kind": "vinetas",
        "items": [
          "Como PIC o copiloto de una aeronave certificada para más de un piloto: **3 despegues y 3 aterrizajes en 90 días** como único a los mandos, en la misma categoría, clase y tipo si aplica (135.835(a)).",
          "Si se vence: de 3 a 6 meses, 3 y 3 con instructor o CHK; de 6 a 12 meses, repaso de tierra, dos periodos de entrenamiento y chequeo; más de 12 meses, entrenamiento inicial y chequeo ante inspector o examinador designado (135.835(a)(1) a (3)).",
          "Para seguir de PIC en una ruta o zona, haberla volado en los últimos 12 meses (135.825(d))."
        ]
      },
      {
        "kind": "sub",
        "text": "Chequeos"
      },
      {
        "kind": "list",
        "items": [
          "**Conocimientos**, escrito u oral: cada 12 meses (135.1010(a)).",
          "**Competencia**: dos veces al año; dos hechos dentro de 4 meses consecutivos no cuentan como los dos (135.1010(b)).",
          "**Instrumentos**: cada 6 meses para volar IFR como PIC. Una aproximación 3D solo la usas si la demostraste en los últimos 6 meses; una 2D, si demostraste ese tipo u otros dos tipos 2D (135.1015(a) a (c)).",
          "**En línea**: cada 12 meses (135.1020(a)).",
          "Maniobra fallada: se repite una sola vez; si no la pasas, no vuelas hasta aprobar (135.1025).",
          "Tolerancia de un mes antes o después del mes base (135.1030)."
        ]
      },
      {
        "kind": "sub",
        "text": "Tiempos de vuelo, servicio y descanso"
      },
      {
        "kind": "p",
        "text": "La empresa aplica los límites del Apéndice 15 o un sistema de gestión de riesgos asociados a la fatiga (FRMS) aprobado (135.910(b)). En avión con dos o más pilotos, las tablas son las mismas del RAC 121. Lo propio del 135:"
      },
      {
        "kind": "list",
        "items": [
          "**Monomotor, 1 piloto**: 7 h de vuelo al día, 85 al mes, 900 al año; 10 h de servicio al día.",
          "**Monomotor, 2 pilotos**: 9 h al día, 90 al mes, 1.000 al año; 12 h de servicio.",
          "En monomotor, descanso mínimo de 12 horas entre servicios (Apéndice 15, normas especiales para monomotores).",
          "**No regular**: si la asignación tiene 4 horas de vuelo o menos y 4 trayectos o menos, el servicio puede llegar a 15 horas; tras 14 horas de servicio, el descanso no baja de 12 (Apéndice 15, 1.2).",
          "**Helicóptero, 1 piloto**: 7 h al día y 800 al año; servicio de 9 h al día (Apéndice 15, 2.1).",
          "Tú, como PIC, respondes con la empresa por no pasarte de los límites (Apéndice 15, 1.1(e)(2)(xvi))."
        ]
      },
      {
        "kind": "sub",
        "text": "Otras que te tocan"
      },
      {
        "kind": "vinetas",
        "items": [
          "Trabajas como tripulante para **un único explotador** (135.240(c)).",
          "Si te desvías del reglamento por una emergencia, informe en máximo **10 días hábiles** (135.030(c)).",
          "Accidente: notificas por el medio más rápido, y no apagas ni borras los registradores de vuelo (135.265(b) y (d))."
        ]
      },
      {
        "kind": "titulo",
        "text": "Datos importantes"
      },
      {
        "kind": "table",
        "head": [
          "Tema",
          "Valor",
          "Numeral"
        ],
        "rows": [
          [
            "Avión 135",
            "19 asientos o menos y 5.700 kg o menos",
            "135.005(a)"
          ],
          [
            "PIC VFR sin PTL",
            "500 h, 100 de crucero",
            "135.810(b)"
          ],
          [
            "PIC IFR sin PTL",
            "1.200 h, 500 crucero, 75 instrumentos (50 reales), 10 nocturnas",
            "135.810(c)"
          ],
          [
            "Experiencia operacional",
            "10 · 15 · 20 · 25 h según el avión",
            "135.815(a)"
          ],
          [
            "Copiloto obligatorio",
            "10 o más asientos · pasajeros en IFR · Cat II",
            "135.255, 135.275, 135.290"
          ],
          [
            "Piloto único IFR o noche",
            "Hélice, 9 asientos o menos",
            "135.375(b)"
          ],
          [
            "Recencia",
            "3 despegues y 3 aterrizajes en 90 días",
            "135.835(a)"
          ],
          [
            "Chequeos",
            "Competencia 2 al año · instrumentos cada 6 meses · línea y conocimientos cada 12",
            "135.1010, 135.1015, 135.1020"
          ],
          [
            "Avión multipiloto",
            "50 h quincena · 90 mes · 270 trimestre · 1.000 año",
            "Apéndice 15, 1.1(c)"
          ],
          [
            "Monomotor, 1 piloto",
            "7 h día · 85 mes · 900 año",
            "Apéndice 15, monomotores"
          ],
          [
            "Informe por desviación en emergencia",
            "10 días hábiles",
            "135.030(c)"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "vinetas",
        "items": [
          "El 135 es el mundo de 19 asientos o menos y 5.700 kg o menos, la carga liviana, los helicópteros y la ambulancia aérea.",
          "Sin PTL, para ser PIC necesitas 500 horas (VFR) o 1.200 horas (IFR).",
          "Con 10 o más sillas o en Categoría II siempre va copiloto; con pasajeros en IFR también, salvo piloto automático aprobado en las OpSpecs.",
          "Chequeo de instrumentos cada 6 meses, de competencia dos veces al año y en línea cada 12 meses.",
          "Los monomotores y los helicópteros tienen tiempos de vuelo propios; en avión multipiloto se usan los del 121."
        ]
      }
    ]
  },
  {
    "n": 12,
    "title": "RAC 175 · Mercancías peligrosas",
    "kicker": "Seguridad y consecuencias",
    "minutes": 6,
    "blocks": [
      {
        "kind": "p",
        "text": "Edición original, marzo de 2016 (Resolución 00478 del 29 de febrero de 2016). Derogó el RAC 10."
      },
      {
        "kind": "titulo",
        "text": "¿De qué trata?"
      },
      {
        "kind": "p",
        "text": "Es la norma colombiana que adopta el Anexo 18 de la OACI y obliga a cumplir las Instrucciones Técnicas (Doc 9284) en su última versión. Aplica a todo vuelo civil nacional o internacional hacia o desde Colombia, a los explotadores que vuelan bajo los RAC 91, 121 y 135 y a trabajos aéreos, y también a los miembros de la tripulación (175.005(a)). La clasificación, el embalaje y las etiquetas los viste en el módulo de Mercancías peligrosas; aquí está lo que el RAC te pone a ti, como piloto al mando (PIC), en la cabina."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber un piloto"
      },
      {
        "kind": "sub",
        "text": "¿Tu empresa puede llevar mercancías peligrosas?"
      },
      {
        "kind": "vinetas",
        "items": [
          "Solo si tiene la autorización en sus especificaciones de operación (OpSpecs) (175.020(a), 175.220(a)). La Aerocivil puede dar una autorización especial para artículos de riesgo menor, como sustancias biológicas de categoría B, baterías de litio de la sección II, material peligroso del propio explotador (COMAT) o lo permitido por correo (175.020(c)).",
          "En **aviación civil privada** se prohíbe todo tipo de mercancía peligrosa (175.115(a)).",
          "La **clase 3 (combustibles)** está prohibida en **monomotores** y en aviación privada, salvo las excepciones para pasajeros y tripulantes (175.115(b)). Otras clases en monomotor necesitan aprobación de la Aerocivil, que además puede excluir aeródromos (175.115(c)).",
          "Si tu empresa **no acepta** mercancías peligrosas, igual debe tener en el manual cómo evitar que se suban sin declarar (175.220(f)) y capacitarte (175.305(b))."
        ]
      },
      {
        "kind": "sub",
        "text": "La información escrita al PIC"
      },
      {
        "kind": "p",
        "text": "Cuando se llevan mercancías peligrosas, el explotador te las informa **por escrito y lo antes posible antes de la salida** (175.515(a)). En la industria se le conoce como NOTOC; el RAC la llama «información por escrito al piloto al mando». Reglas:"
      },
      {
        "kind": "vinetas",
        "items": [
          "La **firmas antes** de que se transporten (175.515(a)(1)).",
          "La tienes **a mano durante todo el vuelo** (175.515(a)(2)).",
          "Debe estar disponible en el aeródromo de la última salida y en el de la próxima llegada (175.515(a)(3)).",
          "El explotador guarda en tierra una copia firmada de cada vuelo (175.515(b)).",
          "En vuelos internacionales va en **inglés**, además del idioma del Estado de origen (175.515(c))."
        ]
      },
      {
        "kind": "p",
        "text": "Si se descubre que se transportaron mercancías peligrosas sin avisarle al PIC, o mal cargadas, segregadas o sujetas, es un suceso que el explotador debe notificar (175.625(d))."
      },
      {
        "kind": "sub",
        "text": "Dónde van a bordo"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Nunca en la cabina de pasajeros ni en el puesto de pilotaje**, salvo lo que permitan el RAC y las Instrucciones Técnicas (sección «Carga y estiba», (b)).",
          "Un bulto con etiqueta **«Exclusivamente en aeronaves de carga»** no va en una aeronave con pasajeros, y se carga de forma que un tripulante pueda verlo, manipularlo y, si el tamaño y el peso lo permiten, separarlo en vuelo (sección «Carga y estiba», (c) a (e)).",
          "Ningún bulto se estiba sin inspeccionarlo antes para ver si tiene pérdidas o averías (sección «Carga y estiba», (f) y (g)).",
          "En helicóptero, la carga externa con mercancías peligrosas sigue el manual de operaciones del helicóptero, el RAC 175 y las Instrucciones Técnicas (175.142). La Aerocivil puede aprobar condiciones especiales para ala rotatoria (175.140). Este tema se complementa con el RAC 135 (135.1920)."
        ]
      },
      {
        "kind": "sub",
        "text": "Emergencia en vuelo"
      },
      {
        "kind": "vinetas",
        "items": [
          "Tu empresa, si está autorizada, debe tener un **procedimiento de emergencia en vuelo** para mercancías peligrosas y ponerlo en el manual de operaciones (175.620(a) y (c)).",
          "Debes tener disponible la información de respuesta de emergencia de lo que llevas, que puede salir del **Doc 9481** de la OACI o de un documento equivalente (175.620(b)(1)). La tripulación debe conocer las medidas que se toman (175.620(b)(2)).",
          "A bordo va un **equipo de respuesta** con, como mínimo, bolsas grandes de polietileno, ligaduras y guantes largos de goma, y la empresa te entrena en su uso (175.620(d)).",
          "**Informas a los servicios de tránsito aéreo (ATS)** en cuanto la situación lo permita, para que avisen al aeropuerto que llevas mercancías peligrosas (175.620(e)).",
          "Tras un accidente o incidente grave, el explotador entrega sin demora a los servicios de emergencia la información de las mercancías a bordo, según la que se le dio al PIC; tras un incidente, si se la piden (175.620(f) y (g))."
        ]
      },
      {
        "kind": "sub",
        "text": "Equipaje de pasajeros y tripulación"
      },
      {
        "kind": "vinetas",
        "items": [
          "Ni pasajeros ni tripulantes llevan mercancías peligrosas en el equipaje facturado, en el de mano ni encima, salvo lo que autoriza la **Tabla 8-1** de las Instrucciones Técnicas y con todos sus requisitos (175.151, 175.715).",
          "Las **cantidades exceptuadas** no van ni en equipaje ni en correo (175.136).",
          "Lo que la aeronave necesita llevar por aeronavegabilidad u operación queda exceptuado; sus repuestos viajan según las Instrucciones Técnicas (175.145(a) y (b)).",
          "El manual de operaciones debe darle a la tripulación de vuelo la información para cumplir sus responsabilidades y las instrucciones de emergencia (sección «Información para los pasajeros y tripulantes», (h))."
        ]
      },
      {
        "kind": "sub",
        "text": "Tu capacitación"
      },
      {
        "kind": "vinetas",
        "items": [
          "Repaso **cada 24 meses como mínimo**, y la instrucción se imparte o se verifica al contratarte (175.310(a) y (b)).",
          "Intensidad de referencia para **tripulación de vuelo: 16 horas inicial y 8 recurrente**; tripulación de cabina, 8 y 4 (175.316, Tabla C.1). La Aerocivil aprueba la intensidad de cada programa (175.316(a)(3)).",
          "El curso incluye familiarización general, instrucción según tu función e instrucción de seguridad operacional (peligros, manipulación y respuesta de emergencia) (175.315(a)), además de seguridad de la aviación (175.025(c)).",
          "Lo recibes aunque tu empresa no transporte mercancías peligrosas, y el programa lo aprueba la Aerocivil (175.316(a)(1), 175.325(a))."
        ]
      },
      {
        "kind": "sub",
        "text": "Qué se reporta"
      },
      {
        "kind": "p",
        "text": "Conceptos (175.001(a)):"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Accidente imputable a mercancías peligrosas**: lesiones mortales o graves, o daños de consideración a bienes o al ambiente (numeral (1)).",
          "**Incidente imputable**: sin ser accidente y no necesariamente a bordo, causa lesiones, daños, incendio, ruptura, derrame, fuga, radiación o daño de un embalaje; también lo que pudo poner en peligro la aeronave o sus ocupantes (numeral (25)).",
          "**Suceso**: cualquier incumplimiento, incidente o accidente, incluido el hallazgo de una mercancía peligrosa oculta (numeral (41))."
        ]
      },
      {
        "kind": "p",
        "text": "El explotador notifica (175.625):"
      },
      {
        "kind": "vinetas",
        "items": [
          "Accidentes e incidentes con mercancías peligrosas, al Estado del explotador y al Estado donde ocurrieron; para aeronaves o explotadores colombianos, o si ocurre en Colombia, a la Aerocivil (175.625(a) y nota).",
          "Mercancías peligrosas **no declaradas o mal declaradas** en carga o correo (175.625(b)).",
          "Mercancías **no permitidas** halladas en el equipaje o encima de pasajeros o **tripulantes** (175.625(c)).",
          "Mercancías mal cargadas, segregadas o sujetas, o sin información al PIC (175.625(d))."
        ]
      },
      {
        "kind": "p",
        "text": "La Aerocivil las investiga según el RAC de investigación de accidentes (175.628); este tema se complementa con el RAC 114. Violar el RAC 175 se sanciona por el RAC 13 (175.636), sin perjuicio de la responsabilidad penal (175.205(b))."
      },
      {
        "kind": "titulo",
        "text": "Datos importantes"
      },
      {
        "kind": "table",
        "head": [
          "Tema",
          "Dato",
          "Numeral"
        ],
        "rows": [
          [
            "Autorización para transportar",
            "En las OpSpecs",
            "175.020(a)"
          ],
          [
            "Aviación civil privada",
            "Prohibida toda mercancía peligrosa",
            "175.115(a)"
          ],
          [
            "Clase 3 combustibles",
            "Prohibida en monomotores y privados",
            "175.115(b)"
          ],
          [
            "Otras clases en monomotor",
            "Con aprobación de la Aerocivil",
            "175.115(c)"
          ],
          [
            "Información al PIC",
            "Por escrito, antes de salir, firmada, a mano en vuelo",
            "175.515(a)"
          ],
          [
            "Idioma internacional",
            "Inglés, además del idioma del Estado de origen",
            "175.515(c)"
          ],
          [
            "Etiqueta solo carga",
            "No en aeronave con pasajeros; accesible en vuelo",
            "«Carga y estiba» (c) a (e)"
          ],
          [
            "Cabina y puesto de pilotaje",
            "Sin mercancías peligrosas, salvo lo permitido",
            "«Carga y estiba» (b)"
          ],
          [
            "Guía de respuesta",
            "Doc 9481 o equivalente, disponible al PIC",
            "175.620(b)(1)"
          ],
          [
            "Equipo de respuesta a bordo",
            "Bolsas de polietileno, ligaduras, guantes largos de goma",
            "175.620(d)(1)"
          ],
          [
            "Emergencia en vuelo",
            "PIC informa a ATS en cuanto pueda",
            "175.620(e)"
          ],
          [
            "Equipaje de pasajeros y tripulantes",
            "Solo lo de la Tabla 8-1",
            "175.715"
          ],
          [
            "Cantidades exceptuadas",
            "Nunca en equipaje ni correo",
            "175.136"
          ],
          [
            "Repaso de instrucción",
            "Cada 24 meses como mínimo",
            "175.310(a)"
          ],
          [
            "Tripulación de vuelo",
            "16 h inicial · 8 h recurrente",
            "175.316, Tabla C.1"
          ],
          [
            "Tripulación de cabina",
            "8 h inicial · 4 h recurrente",
            "175.316, Tabla C.1"
          ],
          [
            "Archivos del explotador",
            "Mínimo 18 meses",
            "«Obligaciones del explotador de servicios aéreos comerciales», (a)(4)"
          ],
          [
            "Sanciones",
            "RAC 13",
            "175.636"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Solo lleva mercancías peligrosas la empresa que lo tiene autorizado en sus OpSpecs; en aviación privada, ninguna.",
          "El PIC recibe la información por escrito antes de salir, la firma y la lleva a mano todo el vuelo.",
          "Nada peligroso en cabina de pasajeros ni en el puesto de pilotaje; lo de «solo carga», accesible en vuelo.",
          "En emergencia avisas a ATS para que el aeropuerto sepa qué llevas; la guía de respuesta sale del Doc 9481 o de un documento equivalente.",
          "Tripulantes y pasajeros solo llevan lo que permite la Tabla 8-1.",
          "Repaso cada 24 meses (16 h inicial y 8 h recurrente para tripulación de vuelo), aunque tu empresa no lleve carga peligrosa."
        ]
      }
    ]
  },
  {
    "n": 13,
    "title": "RAC 160 · Seguridad de la aviación (AVSEC)",
    "kicker": "Seguridad y consecuencias",
    "minutes": 7,
    "blocks": [
      {
        "kind": "p",
        "text": "Enmienda 8, julio de 2025 (Resolución 01761 del 15 de julio de 2025)."
      },
      {
        "kind": "titulo",
        "text": "¿De qué trata?"
      },
      {
        "kind": "p",
        "text": "Es la norma colombiana de seguridad de la aviación (AVSEC), basada en el Anexo 17 de la OACI: protección contra **actos de interferencia ilícita**. Reparte responsabilidades entre la Aerocivil, los aeropuertos, los explotadores y las demás autoridades."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber un piloto"
      },
      {
        "kind": "sub",
        "text": "Conceptos que te van a preguntar"
      },
      {
        "kind": "list",
        "items": [
          "**Acto de interferencia ilícita** (160.005): actos o tentativas contra la seguridad de la aviación civil. Incluye apoderamiento ilícito de la aeronave, destrucción de una aeronave en servicio, toma de rehenes, intrusión por la fuerza, introducción de armas o sustancias peligrosas con fines criminales y uso de la aeronave para causar muerte o daños graves.",
          "**Aeronave en vuelo**: desde que se cierran todas las puertas externas después del embarque hasta que se abre una para desembarcar (160.005).",
          "**Aeronave que no está en servicio**: estacionada por más de **12 horas** o sin vigilancia suficiente (160.005).",
          "**Inspección de seguridad de la aeronave**: interior y exterior completos. **Verificación de seguridad de la aeronave**: interior donde hubo pasajeros, más la bodega (160.005).",
          "**Persona perturbadora (disruptiva)**: no respeta las normas de conducta o las instrucciones de la tripulación y altera el orden en el aeropuerto o a bordo (160.005).",
          "**Persona insubordinada**: desde que se cierra la puerta antes del despegue hasta que se abre tras el aterrizaje, agrede, intimida o amenaza; interfiere con un tripulante; daña la aeronave; comunica información falsa que pone en peligro el vuelo; o desobedece órdenes legítimas dadas para operar con seguridad (160.005)."
        ]
      },
      {
        "kind": "sub",
        "text": "Autoridad del piloto al mando (PIC)"
      },
      {
        "kind": "vinetas",
        "items": [
          "Con base en el Convenio de Tokio de 1963, el PIC puede **negar el transporte** a todo pasajero que dé indicios de poner en peligro la seguridad operacional o la seguridad de la aviación (160.605(a)).",
          "Puede **negar el embarque o desembarcar** a quien sea un peligro para el vuelo, los pasajeros o la carga, y entregarlo a la policía en el aeropuerto de origen, escala o aterrizaje. A quien cometa un delito a bordo lo pone a disposición de la autoridad (artículo 1807 del Código de Comercio) (160.605(b)).",
          "La negación debe basarse en **conducta o comportamiento** que genere grave preocupación. Al embarcar puede negar el transporte a personas no admisibles, deportadas, en condiciones jurídicas especiales, desmovilizadas o perturbadoras (160.605(d)). Si la autoridad lo pide, el explotador explica por escrito los motivos (160.605(e))."
        ]
      },
      {
        "kind": "sub",
        "text": "Pasajeros de categorías especiales (custodiados, deportados, inadmisibles)"
      },
      {
        "kind": "vinetas",
        "items": [
          "Son categorías especiales: diplomáticos, jefes de Estado, personas con movilidad reducida, **perturbadores** y **personas sujetas a proceso judicial o administrativo** (en condiciones jurídicas especiales, deportadas, no admisibles, desmovilizadas o con diagnóstico de enfermedad mental) (160.600(b)).",
          "Para personas en proceso judicial o administrativo, la aerolínea hace análisis de riesgo y aplica medidas antes, durante y después del vuelo (160.600(c)).",
          "La Aerocivil se asegura de que **el explotador y el PIC sean informados** cuando viaja una persona sujeta a proceso judicial o administrativo (160.600(d)).",
          "**Persona no admisible**: aquella a quien un Estado le niega la entrada. Por lo general el mismo explotador la lleva de regreso (nota de la definición en 160.005)."
        ]
      },
      {
        "kind": "sub",
        "text": "Armas a bordo"
      },
      {
        "kind": "vinetas",
        "items": [
          "En Colombia **no se permite el transporte de armas ni la presencia de personal armado en la cabina principal** de aeronaves comerciales que operen en, desde o hacia el país (160.1415(a)).",
          "Armas y municiones se transportan solo si la autoridad verificó que **no están cargadas** y son legales, y únicamente **en bodega**, en un lugar inaccesible durante el vuelo (160.1400(b)).",
          "Las mercancías peligrosas detectadas se tratan según el RAC 175 (160.1405(c))."
        ]
      },
      {
        "kind": "sub",
        "text": "Tripulación en el aeropuerto"
      },
      {
        "kind": "vinetas",
        "items": [
          "Entras a las zonas de seguridad restringidas **solo para trabajar, uniformado y con el carné del explotador visible** a la altura del tórax o en brazalete (160.410(a)).",
          "En aeropuertos donde no eres de la base (taxi aéreo, trabajos especiales, aviación general), presentas plan de vuelo y manifiesto o declaración general, que se cotejan con tu documento (160.410(d)).",
          "Quien se niegue a la requisa, **incluidos los tripulantes**, no entra a la zona restringida ni embarca; si ya embarcó, se le desembarca, se inspecciona también a los demás pasajeros y la aeronave, y se deja informe (160.515(a)).",
          "El comité de seguridad del aeropuerto puede ordenar inspección extraordinaria también a tripulaciones cuando sube el nivel de riesgo (160.525(a))."
        ]
      },
      {
        "kind": "sub",
        "text": "Seguridad de la aeronave"
      },
      {
        "kind": "vinetas",
        "items": [
          "El explotador regular hace una **inspección de seguridad** a toda aeronave que origine vuelos en Colombia antes de su primera operación del día, después de mantenimiento o de pernocta; en los demás casos, **verificación de seguridad** (160.1105(b)). En tránsitos y transbordos, verificación; ante una amenaza específica, inspección (160.1105(c)).",
          "Todo lo que dejen los pasajeros que desembarcan en tránsito se retira antes de la salida (160.1105(d)).",
          "Durante el vuelo se impide que personas no autorizadas entren a la **cabina de mando** (160.1105(e)), y la aeronave se protege contra interferencias desde la inspección hasta la salida (160.1105(f)).",
          "No se transporta **equipaje de quien no está a bordo**, salvo que vaya como equipaje no acompañado e inspeccionado; el equipaje se coteja con el pasajero en el mostrador y antes del embarque (160.1120(d))."
        ]
      },
      {
        "kind": "sub",
        "text": "Amenaza e interferencia ilícita"
      },
      {
        "kind": "vinetas",
        "items": [
          "Con información fiable de una amenaza, el aeropuerto activa su plan de contingencia y la fuerza pública inspecciona la aeronave en busca de armas o explosivos, avisando antes al explotador (160.1700(b)). Si la aeronave ya salió, la Aerocivil avisa lo antes posible al aeropuerto y a los servicios de tránsito aéreo (ATS) (160.1700(a)).",
          "La aerolínea regular tiene su propio **plan de contingencia**, aprobado como anexo de su plan de seguridad (PSE) (160.1720(g)). El aeropuerto define un **punto de estacionamiento aislado** (punto zulú) (160.1725).",
          "A una aeronave objeto de apoderamiento ilícito, la Aerocivil le da asistencia (ayudas a la navegación, ATS, permiso para aterrizar) y, si aterriza en Colombia, procura retenerla en tierra, salvo que salir sea imprescindible para proteger vidas (160.1705(c) y (d)).",
          "Todo el que sepa de un acto de interferencia ilícita lo **informa por el medio más seguro y rápido** a la dependencia AVSEC de la Aerocivil (160.1745(d)). Las notificaciones a la OACI y a los medios le corresponden **solo al Director General** de la Aerocivil (160.1745(a))."
        ]
      },
      {
        "kind": "sub",
        "text": "Lo que vive en el RAC 121 (Capítulo V)"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Puerta de cabina**: en aviones con puerta, esta debe poder asegurarse y la tripulación de cabina debe poder avisar discretamente a los pilotos. Es **reforzada** (resistente a disparos y granadas) en aviones de pasajeros de más de 54.500 kg, de más de 45.500 kg con más de 19 asientos, o con más de 60 asientos, y se asegura y desasegura desde cualquier puesto de piloto (121.6105).",
          "Esa puerta va **asegurada** desde que se cierran las puertas exteriores hasta que se abre una para desembarcar, salvo para el paso de personas autorizadas; desde cualquier puesto de piloto se debe poder vigilar el área frente a ella (121.6110).",
          "A bordo va la **lista de verificación de búsqueda de bombas**, con orientación sobre qué hacer si aparece un objeto sospechoso y el **lugar de riesgo mínimo** de ese avión (121.6115).",
          "**Instrucción AVSEC de tripulantes**: evaluar la gravedad del incidente, comunicación y coordinación de la tripulación, respuestas de defensa, comportamiento de secuestradores, ejercicios reales, procedimientos de cabina de mando y búsqueda en el avión (121.6120).",
          "Tras un acto de interferencia ilícita, **el PIC presenta sin demora un informe** a la Aerocivil (121.6125)."
        ]
      },
      {
        "kind": "titulo",
        "text": "Datos importantes"
      },
      {
        "kind": "table",
        "head": [
          "Tema",
          "Valor",
          "Numeral"
        ],
        "rows": [
          [
            "Aeronave «en vuelo» (AVSEC)",
            "De puertas cerradas a puerta abierta",
            "160.005"
          ],
          [
            "Aeronave no en servicio",
            "Más de 12 horas estacionada o sin vigilancia",
            "160.005"
          ],
          [
            "Armas en cabina principal",
            "Prohibidas, también el personal armado",
            "160.1415"
          ],
          [
            "Armas en bodega",
            "Descargadas, legales e inaccesibles",
            "160.1400(b)"
          ],
          [
            "Inspección de la aeronave",
            "Primer vuelo del día, tras mantenimiento o pernocta",
            "160.1105(b)"
          ],
          [
            "Negarse a la requisa (también tripulantes)",
            "No entra ni embarca",
            "160.515"
          ],
          [
            "Autoridad del PIC",
            "Negar transporte, desembarcar, entregar a la policía",
            "160.605"
          ],
          [
            "Puerta reforzada",
            "Más de 54.500 kg; más de 45.500 kg y más de 19 asientos; más de 60 asientos",
            "121.6105(b)"
          ],
          [
            "Informe del PIC tras interferencia",
            "Sin demora, a la Aerocivil",
            "121.6125"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "vinetas",
        "items": [
          "Eres la autoridad a bordo: puedes negar el embarque o desembarcar a quien ponga en riesgo el vuelo, basándote en su conducta.",
          "Perturbador e insubordinado no son lo mismo; la insubordinación se mide con la puerta cerrada.",
          "En Colombia no viajan armas ni personal armado en la cabina principal.",
          "La puerta de cabina va asegurada durante todo el vuelo y la lista de búsqueda de bombas va a bordo.",
          "La interferencia ilícita se informa de inmediato a la Aerocivil; los medios y la OACI son asunto del Director General."
        ]
      }
    ]
  },
  {
    "n": 14,
    "title": "RAC 219 · Gestión de la seguridad operacional (SMS)",
    "kicker": "Seguridad y consecuencias",
    "minutes": 4,
    "blocks": [
      {
        "kind": "p",
        "text": "Enmienda 2, abril de 2024 (Resolución 00718 del 23 de abril de 2024)."
      },
      {
        "kind": "titulo",
        "text": "¿De qué trata?"
      },
      {
        "kind": "p",
        "text": "Traslada a un solo reglamento el Anexo 19 de la OACI: qué organizaciones deben tener un **sistema de gestión de la seguridad operacional (SMS)**, cómo se estructura y cómo se protege la información que le reportas."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber un piloto"
      },
      {
        "kind": "sub",
        "text": "Las palabras clave (219.001)"
      },
      {
        "kind": "list",
        "items": [
          "**Seguridad operacional**: estado en el que los riesgos de la operación se reducen y controlan a un **nivel aceptable**.",
          "**Peligro**: condición u objeto que puede causar un incidente o accidente o contribuir a él.",
          "**Riesgo de seguridad operacional**: la **probabilidad y la severidad** previstas de las consecuencias de un peligro.",
          "**Mitigación**: poner defensas o controles para bajar la probabilidad o la severidad.",
          "**Incidente**: suceso que no llega a accidente pero afecta o puede afectar la seguridad.",
          "**Lesión grave**, entre otras: hospitalización de más de **48 horas** dentro de los **7 días** siguientes, o quemaduras que afecten más del **5 %** del cuerpo.",
          "**Personal de operaciones**: quien puede reportar información de seguridad; incluye expresamente a las **tripulaciones de vuelo** y de cabina, controladores, técnicos y despachadores.",
          "**Ejecutivo responsable (accountable)**: la persona del más alto nivel que responde por el SMS."
        ]
      },
      {
        "kind": "sub",
        "text": "Quién debe tener SMS"
      },
      {
        "kind": "p",
        "text": "Entre otros: explotadores **RAC 121** y **RAC 135**, operadores de aviación general con aviones grandes o turborreactores (RAC 91, Parte 2), centros de instrucción (RAC 141), talleres (RAC 145), aeródromos con operación comercial regular y el proveedor de tránsito aéreo (RAC 211) (219.005(b)). Todo SMS debe identificar peligros, aplicar correcciones, supervisar el nivel de seguridad y mejorar continuamente (219.005(b)). En el RAC 121, el explotador lo establece «de conformidad con lo reglamentado en RAC 219» (121.110)."
      },
      {
        "kind": "sub",
        "text": "Estructura: 4 componentes y 12 elementos (219.105)"
      },
      {
        "kind": "list",
        "items": [
          "**Política y objetivos**: compromiso de la dirección; rendición de cuentas y responsabilidades; designación del gerente de seguridad operacional; coordinación del plan de respuesta ante emergencias; documentación (manual SMS).",
          "**Gestión de riesgos**: identificación de peligros (métodos reactivos, preventivos o proactivos); evaluación y mitigación de riesgos.",
          "**Aseguramiento**: medición del rendimiento con indicadores y metas; gestión del cambio; mejora continua.",
          "**Promoción**: instrucción y educación; comunicación de la seguridad operacional."
        ],
        "ordered": true
      },
      {
        "kind": "sub",
        "text": "Tu papel: reportar"
      },
      {
        "kind": "vinetas",
        "items": [
          "El sistema de datos del explotador debe incluir **notificación obligatoria**, **notificación voluntaria** y **autonotificación**, incluidos los sistemas automáticos de captura de datos, además de investigaciones e indicadores (219.110).",
          "La política de seguridad debe promover una **cultura positiva de seguridad operacional**, incluir los procedimientos para reportar y decir claramente qué comportamientos son **inaceptables** y en qué casos **no** se aplican medidas disciplinarias (219.105(a)(1)(i)(A), (C) y (D)).",
          "En aviones grandes, el SMS del RAC 121 incluye un **programa de análisis de datos de vuelo** (FDA), con salvaguardas para proteger las fuentes (121.115)."
        ]
      },
      {
        "kind": "sub",
        "text": "Protección de lo que reportas"
      },
      {
        "kind": "vinetas",
        "items": [
          "Lo que reportas por los sistemas obligatorios o voluntarios está protegido (219.115) y solo se usa para **mantener o mejorar la seguridad** (219.120).",
          "No se usa para procesos **disciplinarios, civiles, administrativos ni penales** contra empleados o personal de operaciones, ni se divulga al público (219.125).",
          "**Excepciones** que puede conceder la Aerocivil (219.130): hay evidencia de intención de causar daño, o de una conducta equivalente a **conducta temeraria, negligencia grave o acto doloso**; la administración de justicia la necesita y divulgarla compensa el daño a futuros reportes; divulgarla es necesario para la propia seguridad operacional.",
          "Si algo se divulga al público (solo en los casos de excepción y con autorización previa de la Aerocivil), va **sin identidades**, resumido y combinado, y solo puede divulgarlo el **ejecutivo responsable** (219.135).",
          "Las grabaciones de ambiente del puesto de trabajo, como la cabina de mando, tienen protección especial según el RAC 114 y el Decreto 997 de 2022 (219.140). En el RAC 121 las grabaciones del registrador de voz de cabina (CVR) solo se usan para la investigación de accidentes e incidentes, salvo las excepciones del 121.117."
        ]
      },
      {
        "kind": "titulo",
        "text": "Datos importantes"
      },
      {
        "kind": "table",
        "head": [
          "Tema",
          "Valor",
          "Numeral"
        ],
        "rows": [
          [
            "Riesgo",
            "Probabilidad y severidad previstas de las consecuencias de un peligro",
            "219.001"
          ],
          [
            "Estructura del SMS",
            "4 componentes, 12 elementos",
            "219.105"
          ],
          [
            "Sistemas de notificación",
            "Obligatoria, voluntaria y autonotificación",
            "219.110"
          ],
          [
            "Uso prohibido de tus reportes",
            "Disciplinario, civil, administrativo, penal, divulgación pública",
            "219.125"
          ],
          [
            "Cuándo se pierde la protección",
            "Intención de causar daño, conducta temeraria, negligencia grave, dolo",
            "219.130(a)"
          ],
          [
            "Lesión grave",
            "Más de 48 h de hospitalización dentro de 7 días; quemaduras de más del 5 %",
            "219.001"
          ],
          [
            "FDA obligatorio",
            "Aviones de más de 27.000 kg (y de más de 15.000 kg con más de 19 pasajeros certificados desde el 1/1/2027)",
            "121.115"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "vinetas",
        "items": [
          "Peligro es la condición; riesgo es su probabilidad y severidad.",
          "El SMS tiene 4 componentes: política, gestión de riesgos, aseguramiento y promoción.",
          "Tu parte es reportar, por los canales obligatorios y voluntarios.",
          "Lo que reportas no se usa para sancionarte, salvo que la Aerocivil conceda una excepción: intención de causar daño, conducta temeraria, negligencia grave o dolo, o necesidad de la justicia.",
          "La empresa debe decir por escrito qué conductas son inaceptables y cuándo no hay sanción."
        ]
      }
    ]
  },
  {
    "n": 15,
    "title": "RAC 114 · Investigación de accidentes e incidentes",
    "kicker": "Seguridad y consecuencias",
    "minutes": 7,
    "blocks": [
      {
        "kind": "p",
        "text": "Enmienda 3, abril de 2022 (Resolución 00696 del 5 de abril de 2022). Reemplazó al antiguo RAC 8."
      },
      {
        "kind": "titulo",
        "text": "¿De qué trata?"
      },
      {
        "kind": "p",
        "text": "Desarrolla en Colombia el Anexo 13 de la OACI: cómo se notifica, se protege y se investiga un accidente o incidente de aviación. La investigación la hace la Dirección Técnica de Investigación de Accidentes (DIACC), que es la autoridad de investigación de accidentes (AIG) del país (114.001). Para ti, como tripulante, deja cuatro cosas claras: qué evento es cuál, a quién avisas y en cuánto tiempo, qué no puedes tocar después y cómo se protege lo que dices y lo que grabó la cabina."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber un piloto"
      },
      {
        "kind": "sub",
        "text": "El objetivo no es buscar culpables"
      },
      {
        "kind": "p",
        "text": "El único objetivo de la investigación es prevenir futuros accidentes e incidentes; no busca determinar culpa ni responsabilidad (114.200(a)). Por eso identificar «causas» o «factores contribuyentes» no implica asignar culpa ni responsabilidad administrativa, civil o penal (114.001, definiciones de causas y de factores contribuyentes). La AIG es autónoma frente a las demás dependencias de la Aerocivil (114.205(a))."
      },
      {
        "kind": "sub",
        "text": "Accidente, incidente grave e incidente"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Accidente**: suceso ocurrido entre el momento en que alguien sube a bordo con intención de volar y el momento en que todos desembarcan, en el que (114.001): alguien sufre **lesiones mortales o graves** por estar en la aeronave, por contacto directo con ella (incluso con partes desprendidas) o por el chorro de un reactor; la aeronave sufre **daños estructurales** que afectan su resistencia, performance o características de vuelo y normalmente exigen reparación importante (no cuentan, por ejemplo, la falla limitada a un solo motor, las hélices, puntas de ala, llantas, frenos, pequeñas abolladuras o los daños por granizo o aves); o la aeronave **desaparece** o queda totalmente inaccesible.",
          "**Incidente grave**: incidente con alta probabilidad de haber terminado en accidente. Se diferencia del accidente solo por el resultado (114.001, nota 1).",
          "**Incidente**: todo suceso que no llega a accidente y afecta o puede afectar la seguridad de las operaciones (114.001).",
          "**Lesión grave**: por ejemplo, hospitalización de más de 48 horas dentro de los 7 días siguientes, fracturas (salvo las simples de nariz, dedos de manos o pies), quemaduras de segundo o tercer grado o de más del 5 % del cuerpo, daño a órganos internos (114.001)."
        ]
      },
      {
        "kind": "p",
        "text": "Ejemplos que **pueden** ser incidente grave (Adjunto C): cuasi colisiones que exigieron maniobra evasiva, impacto contra el suelo sin pérdida de control evitado por poco, despegue o aterrizaje en pista cerrada, calle de rodaje o pista no asignada, humo o fuego en cabina aunque se haya apagado, uso de oxígeno de emergencia por la tripulación, incapacitación de un piloto, emergencia declarada por combustible, salidas de pista o aterrizajes cortos o largos, e incursiones en pista de gravedad A. La calificación final la hace la AIG (114.315(a)(1), nota 2)."
      },
      {
        "kind": "sub",
        "text": "Notificación: tu obligación y tus plazos"
      },
      {
        "kind": "list",
        "items": [
          "**Tú, como tripulación involucrada**, te comunicas con la AIG **dentro de las 12 horas siguientes**, por teléfono o cualquier otro medio, para reportar el suceso y coordinar lo que sigue. Solo te exime la fuerza mayor (tus lesiones, o que el sitio o la aeronave hagan imposible la comunicación) (114.335(a)).",
          "Cualquier persona del personal aeronáutico que se entere de un accidente o incidente lo notifica a la DIACC **inmediatamente o tan pronto sea practicable**, por el medio más rápido (114.315(a)(1)).",
          "**El explotador** reporta dentro de las **12 horas**, preferiblemente por escrito, con un primer informe: tripulación con licencias y certificados médicos, ocupantes, lesiones, daños, puntos de despegue y aterrizaje, y la **lista de mercancías peligrosas** a bordo (114.330(a)).",
          "No notificar sin justificación se puede tomar como incumplimiento del reglamento (114.330 nota 1, 114.335 nota 2).",
          "Horario hábil de referencia para contactos personales: 08:00 a 17:00 hora local (13:00 a 22:00 UTC) (114.315, nota 1).",
          "Los hechos ilícitos (suplantación de tripulación, pistas ilegales, secuestro, sabotaje) no los investiga la AIG, pero no te eximen de notificar a la Aerocivil y a la AIG (114.460(b) y (d))."
        ]
      },
      {
        "kind": "sub",
        "text": "Después del suceso: qué pasa contigo"
      },
      {
        "kind": "vinetas",
        "items": [
          "Estás obligado a entregar la documentación que te pida la AIG y a asistir a entrevistas y diligencias (114.500(c)). El investigador a cargo puede citarte a entrevista, distinta de la declaración escrita que se pide después (114.335(b)).",
          "La DIACC informa de forma reservada a la Secretaría de Autoridad Aeronáutica, que decide sobre tu **aptitud psicofísica** y el **ejercicio de tu licencia** (114.500(a)); el reglamento prevé el retiro o la separación preventiva de las atribuciones de la licencia (114.320(a)).",
          "Pueden pedirte un **examen médico** con médico y psicólogo, lo antes posible (114.450(a))."
        ]
      },
      {
        "kind": "sub",
        "text": "Preservar evidencias y aeronave"
      },
      {
        "kind": "list",
        "items": [
          "La aeronave de un accidente o incidente grave queda **suspendida de inmediato** para todo vuelo, sin trámite adicional, hasta que la autoridad verifique su condición (114.500(d)(1)). Mientras tanto no se usa, no se mueve sin autorización de la AIG y no se le hace mantenimiento, reparación ni alteración (114.500(d)(3) y (4)).",
          "La tripulación, el explotador, los bomberos, el ATC y el SAR, entre otros, preservan por todos los medios la evidencia y los restos hasta terminar la investigación de campo (114.505(g)).",
          "Si la aeronave no bloquea la operación, **no se remueve** hasta que llegue el investigador y lo autorice (114.505(b)(3) y (c)(3)). Si hay que moverla, antes se fotografía su posición final (marcas en tierra, 8 puntos, cabina y partes separadas), se hace un croquis con GPS y se registran licencias y teléfonos (114.505(b)(3) nota 1 y (c)(2) nota).",
          "Con fallecidos en un aeródromo controlado, no se mueve hasta el levantamiento judicial (114.505(b)(4)).",
          "La documentación de la aeronave queda a disposición exclusiva de la AIG: no se puede sustraer, suprimir, adicionar, alterar ni modificar (114.505(e)(3)).",
          "Los particulares no pueden fotografiar ni grabar a las víctimas (114.505(h))."
        ]
      },
      {
        "kind": "sub",
        "text": "Registradores de vuelo (CVR y FDR)"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Nadie** (explotador, propietario ni otra persona) puede retirar, operar o manipular el registrador de datos de vuelo (FDR) ni el de voces de cabina (CVR) sin autorización expresa de la AIG (114.505(f)(3)).",
          "Los registradores no se energizan, abren ni copian antes de la lectura (114.505(f)(7)). Los recupera y custodia el investigador a cargo (114.505(f)(1)), y su manejo solo lo hace personal capacitado (114.210(a)(2)).",
          "La obligación de **desactivarlos al terminar el vuelo y no borrarlos** está en los reglamentos de operación; este tema se complementa con el RAC 91, 121 y 135 (por ejemplo, 135.265(d))."
        ]
      },
      {
        "kind": "sub",
        "text": "Protección de la información"
      },
      {
        "kind": "vinetas",
        "items": [
          "No se divulgan fuera de la investigación, salvo decisión de la autoridad competente con prueba de equilibrio de intereses: las **grabaciones de cabina** y sus transcripciones, las **declaraciones** que diste, las comunicaciones de la tripulación, tu **información médica o personal**, las grabaciones ATS y el proyecto de informe final (114.465(a)).",
          "El **sonido del CVR** y las imágenes de a bordo **no se divulgan al público** (114.465(j)).",
          "La AIG **no revela los nombres** de las personas relacionadas con el suceso (114.465(g)).",
          "Solo entran al informe final las partes pertinentes al análisis (114.465(f))."
        ]
      },
      {
        "kind": "sub",
        "text": "Informes"
      },
      {
        "kind": "vinetas",
        "items": [
          "La AIG procura publicar el **informe final dentro de 12 meses**; si no puede, publica una declaración provisional en cada aniversario (114.620(a) y (b)).",
          "Los costos de la investigación los paga el propietario o explotador (114.505(j))."
        ]
      },
      {
        "kind": "titulo",
        "text": "Datos importantes"
      },
      {
        "kind": "table",
        "head": [
          "Tema",
          "Dato",
          "Numeral"
        ],
        "rows": [
          [
            "Objetivo de la investigación",
            "Prevenir; no determina culpa ni responsabilidad",
            "114.200(a)"
          ],
          [
            "Autoridad investigadora",
            "Dirección Técnica de Investigación de Accidentes (DIACC)",
            "114.001"
          ],
          [
            "Reporte de la tripulación",
            "Dentro de 12 horas",
            "114.335(a)"
          ],
          [
            "Reporte del explotador",
            "Dentro de 12 horas, preferiblemente por escrito",
            "114.330(a)"
          ],
          [
            "Personal aeronáutico que se entere",
            "Inmediatamente o tan pronto sea practicable",
            "114.315(a)(1)"
          ],
          [
            "Reporte del SAR",
            "Dentro de 2 horas",
            "114.325(a)"
          ],
          [
            "Lesión grave (hospitalización)",
            "Más de 48 h dentro de los 7 días siguientes",
            "114.001"
          ],
          [
            "Lesión grave (quemaduras)",
            "2.º o 3.er grado, o más del 5 % del cuerpo",
            "114.001"
          ],
          [
            "Lesión mortal (estadística OACI)",
            "Muerte dentro de los 30 días",
            "114.001, nota 1"
          ],
          [
            "Aeronave tras accidente o incidente grave",
            "Suspendida de inmediato",
            "114.500(d)(1)"
          ],
          [
            "FDR y CVR",
            "Nadie los manipula sin autorización de la AIG",
            "114.505(f)(3)"
          ],
          [
            "Sonido del CVR",
            "Nunca al público",
            "114.465(j)"
          ],
          [
            "Nombres de los involucrados",
            "No se revelan al público",
            "114.465(g)"
          ],
          [
            "Informe final",
            "Si es posible, dentro de 12 meses",
            "114.620(a)"
          ],
          [
            "Incidente grave investigado",
            "Aeronave de masa máxima superior a 2.250 kg",
            "114.400(a)(3)"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "La investigación busca prevenir, no culpar: causas y factores contribuyentes no son responsabilidad legal.",
          "Accidente: muertos o lesionados graves, daño estructural importante o aeronave desaparecida. Incidente grave: casi fue accidente.",
          "Si estuviste involucrado, reportas a la AIG dentro de 12 horas; tu empresa también, en el mismo plazo.",
          "La aeronave queda suspendida y nada se mueve ni se toca sin el investigador.",
          "CVR y FDR: nadie los manipula; la grabación de cabina y tus declaraciones están protegidas.",
          "Debes colaborar con documentos, entrevistas y exámenes; la Aerocivil decide sobre tu licencia y tu aptitud médica."
        ]
      }
    ]
  },
  {
    "n": 16,
    "title": "RAC 13 · Régimen sancionatorio",
    "kicker": "Seguridad y consecuencias",
    "minutes": 8,
    "blocks": [
      {
        "kind": "p",
        "text": "Enmienda 7, octubre de 2020 (Resolución 02033 del 16-oct-2020, Diario Oficial 51.472)."
      },
      {
        "kind": "titulo",
        "text": "¿De qué trata?"
      },
      {
        "kind": "p",
        "text": "El RAC 13 dice qué conductas son infracciones a las normas aeronáuticas, cuánto cuestan (multas en UVT) y qué pasa con tu licencia: suspensión o cancelación. También fija cómo se investiga, qué circunstancias bajan o suben la sanción y en cuánto tiempo caduca la facultad de sancionar. La mayor parte del texto es para empresas, aeropuertos, talleres y pasajeros; aquí está solo lo que le puede pasar a un piloto."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber un piloto"
      },
      {
        "kind": "sub",
        "text": "Dos clases de infracción y dos clases de sanción"
      },
      {
        "kind": "list",
        "items": [
          "**Técnicas**: acciones u omisiones que atentan contra la seguridad aérea o ponen en peligro la seguridad operacional. **Administrativas**: violación de cualquier otra norma del sector (13.100 (b)).",
          "La **sanción principal es una multa** en UVT. En las **técnicas** (13.605 a 13.705) casi siempre viene además una **sanción accesoria**: suspensión o cancelación de la licencia con la que cometiste la falta, o suspensión de actividades de vuelo de la aeronave. En las **administrativas** que tocan al piloto (13.515 a 13.540) el texto solo fija multa.",
          "Si tienes varias licencias, la suspensión recae sobre **la licencia bajo cuyos privilegios cometiste la infracción** (13.915).",
          "La suspensión corre desde el día calendario siguiente a la ejecutoria de la resolución, o a más tardar dentro de los 3 días hábiles siguientes (13.920).",
          "Además de la sanción, la autoridad puede ordenar **reentrenamiento**: curso de repaso o simulador con énfasis en lo que falló, y examen ante inspector de la UAEAC (13.900).",
          "Toda infracción obliga a **reparar o neutralizar** sus consecuencias y evitar que se repita (13.200)."
        ]
      },
      {
        "kind": "sub",
        "text": "Mientras estés suspendido"
      },
      {
        "kind": "vinetas",
        "items": [
          "No puedes ejercer **ninguna** atribución ni habilitación de esa licencia hasta que se levante la medida o cumplas la sanción, y no te expiden una licencia similar mientras dure (13.110 (b)).",
          "Volar con la licencia suspendida o cancelada es otra infracción, más cara: 1.233 UVT y suspensión de hasta 1 año de la licencia que no haya sido cancelada (13.670 (a); 13.675).",
          "Si te **cancelan** la licencia, puedes pedir una nueva similar tras **6 años** de buena conducta sin infracciones, cumpliendo todos los requisitos otra vez (13.110 (c))."
        ]
      },
      {
        "kind": "sub",
        "text": "Infracciones típicas de un tripulante y su gravedad"
      },
      {
        "kind": "p",
        "text": "Ver la tabla de Datos importantes. Lo esencial:"
      },
      {
        "kind": "list",
        "items": [
          "**Documentos**: volar sin portar tu licencia o certificado médico, aunque estén vigentes en otro lugar, está en el escalón más leve (13.605 (a)).",
          "**Disciplina de cabina**: no verificar la lista de chequeo, no anotar a tiempo y con verdad en el libro de vuelo, o volar con los tiempos de vuelo, servicio o descanso vencidos (13.625 (e), (f), (g)).",
          "**Tránsito aéreo**: desobedecer sin justa causa instrucciones ATC, desviarte de la ruta o de la altitud autorizada, no aterrizar cuando te lo ordenan en una interceptación: suspensión que puede llegar a **3 años** (13.645 (c), (e), (f); 13.650).",
          "**Transpondedor y plan de vuelo**: volar sin identificación de transpondedor o apagarlo, o salir sin plan de vuelo autorizado (13.645 (h), (i)). Si además no corriges cuando ATC te lo pide, o terminas interceptado, **la multa y la suspensión se duplican** («se incrementarán en otro tanto») (13.645 (j)).",
          "**MEL**: iniciar la operación con un equipo o sistema esencial inoperativo o incumpliendo la MEL (13.645 (t)).",
          "**Alcohol y drogas**: ejercer las atribuciones de tu licencia bajo efecto de alcohol, estupefacientes o drogas (prescritas o no) que alteren tu estado físico o psíquico. **Si eres el comandante, la multa se duplica**, y la licencia se suspende hasta 3 años (13.660 (b); 13.665 (a)). Negarte a cumplir el programa de prevención de sustancias psicoactivas de la empresa o de la autoridad también es infracción (13.625 (v)).",
          "**Aptitud psicofísica**: seguir volando sabiendo que tu aptitud disminuyó de forma que te inhabilita, o no avisar a Medicina de Aviación dentro de **3 días calendario** una disminución de más de 20 días, un tratamiento continuado con medicamentos o una hospitalización (13.635 (n), (o)). Mentir u ocultar información para obtener o renovar el certificado médico (13.635 (p)).",
          "**Reportes**: no informar oportunamente a la Secretaría de Seguridad Operacional los accidentes o incidentes graves (13.660 (j)).",
          "**Operación**: desviarte de las técnicas de vuelo de los manuales (13.660 (n)), apartarte sin justa causa de las especificaciones de operación del explotador (13.635 (f)), operar en un aeródromo no apto (13.635 (k)).",
          "**Licencia**: ejercer funciones sin la licencia o habilitación requerida, o con ellas vencidas, salvo entrenamiento programado y validado (13.625 (c)); ejercer atribuciones que tu licencia no contempla (13.660 (c)); licencia con requisitos o soportes inconsistentes (13.660 (e), cancelación); falsificar una licencia o certificado (13.670 (b), cancelación)."
        ]
      },
      {
        "kind": "sub",
        "text": "Qué baja y qué sube la sanción"
      },
      {
        "kind": "list",
        "items": [
          "**Atenuantes** (13.300 (a)), cada uno reduce la multa **16,66 %**, hasta un **50 %** en total: no tener sanciones en los **3 años** anteriores; **presentarte voluntariamente** ante la autoridad e informar la falta (el «autorreporte» que reconoce el RAC 13); cualquier otra circunstancia demostrable que haga la falta menos gravosa, sin riesgo para la seguridad ni perjuicio a terceros.",
          "**Agravantes** (13.300 (b) y (d)), cada uno sube la multa **8,33 %**: cometer la falta para ejecutar u ocultar otra; prepararla; actuar con cómplices; aprovechar una calamidad; **generar una situación de peligro**; no tomar medidas para neutralizar la falta o evitar que se repita; empeorar sus consecuencias; **reincidir**.",
          "**Reincidencia** en la misma falta dentro de 3 años: la sanción puede **duplicarse**, y una suspensión que al duplicarse pase de 180 días puede convertirse en **cancelación** (13.300 (c)).",
          "**Varias infracciones a la vez**: se aplica la sanción de la más grave, que puede aumentarse hasta el doble sin superar la suma de todas (13.105).",
          "**Tentativa**: la mitad de la sanción de la falta consumada (13.110 (a)).",
          "**Emergencia**: no es culpable quien actuó en una emergencia en la que no era posible proceder de otra manera (13.400)."
        ]
      },
      {
        "kind": "sub",
        "text": "Cómo te llega un proceso"
      },
      {
        "kind": "list",
        "items": [
          "**Investigación de accidentes ≠ proceso sancionatorio.** La investigación de un accidente no busca culpables ni sanciones; pero si el investigador encuentra una posible infracción, pasa la queja a la dependencia competente (13.1020).",
          "**Medida preventiva inmediata**: si un inspector te sorprende en flagrancia en algo que atenta contra la seguridad, puede suspender en el acto un privilegio de tu licencia hasta que cese el peligro. La dependencia sancionadora debe confirmarla o revocarla en máximo **15 días hábiles**, y ese tiempo se descuenta de la suspensión que te impongan después (13.1075 (b), (d)). La Dirección de Servicios a la Navegación Aérea puede suspender de inmediato las actividades de vuelo de una aeronave o de sus tripulantes por violación del espacio aéreo o interceptación (13.1085).",
          "**Pliego de cargos**: tienes **10 días** desde la notificación para presentar descargos y pedir pruebas (13.2045 (b)).",
          "**Terminar antes**: si admites los hechos y pagas la multa dentro de los 10 días siguientes a la notificación del pliego, el proceso se archiva (13.2080); si pagas dentro de **5 días**, la multa **se reduce a la mitad**, siempre que no seas reincidente (13.2085). En ambos casos **no se cumple la suspensión accesoria**, aunque sí la preventiva que ya se hubiera ordenado (13.2095).",
          "**Recursos**: contra la decisión final solo procede **reposición**, en efecto devolutivo (13.1070 (b)).",
          "**Caducidad y prescripción**: la autoridad tiene **3 años** desde el hecho para sancionar; la sanción ya decretada prescribe a los **5 años** de su ejecutoria (13.2015)."
        ]
      },
      {
        "kind": "sub",
        "text": "Un caso que sorprende: las vacaciones"
      },
      {
        "kind": "p",
        "text": "Si acumulas **más de un período de vacaciones** sin disfrutar, quedas **suspendido preventivamente de actividades de vuelo en forma automática** desde el día siguiente a que se haga exigible el segundo período, hasta que disfrutes completo al menos uno, salvo que la planta de tripulantes de un equipo caiga de forma imprevista y súbita más del 5 % (13.1095). Si te programan así, tienes que reportarlo a la Secretaría de Seguridad Operacional; si no lo haces o vuelas en esa condición, te sancionan a ti también (13.615 (m))."
      },
      {
        "kind": "titulo",
        "text": "Datos importantes"
      },
      {
        "kind": "table",
        "head": [
          "Conducta del tripulante",
          "Multa",
          "Sanción accesoria sobre la licencia",
          "Numeral"
        ],
        "rows": [
          [
            "No portar licencia o certificado médico",
            "99 UVT",
            "puede suspenderse hasta 15 días",
            "13.605 (a); 13.610"
          ],
          [
            "PIC que sale sin algún documento de a bordo",
            "99 UVT",
            "puede suspenderse hasta 15 días",
            "13.605 (b); 13.610"
          ],
          [
            "PIC y despachador que despachan sin consultar información aeronáutica y MET",
            "99 UVT",
            "puede suspenderse hasta 15 días",
            "13.605 (d); 13.610"
          ],
          [
            "PIC que demora rodaje o vuelo sin justificación",
            "123 UVT",
            "hasta 30 días",
            "13.615 (j); 13.620"
          ],
          [
            "Tripulante sin diligencia en evacuación o emergencia",
            "123 UVT",
            "hasta 30 días",
            "13.615 (k); 13.620"
          ],
          [
            "Volar sin licencia o habilitación vigente para esa función",
            "247 UVT",
            "60 a 90 días",
            "13.625 (c); 13.630"
          ],
          [
            "No anotar a tiempo y con verdad en el libro de vuelo",
            "247 UVT",
            "60 a 90 días",
            "13.625 (e); 13.630"
          ],
          [
            "Volar con tiempos de vuelo, servicio o descanso vencidos",
            "247 UVT",
            "60 a 90 días",
            "13.625 (f); 13.630"
          ],
          [
            "No verificar la lista de chequeo",
            "247 UVT",
            "60 a 90 días",
            "13.625 (g); 13.630"
          ],
          [
            "PIC que acepta un despacho con sobrepeso o sobrecupo",
            "247 UVT",
            "60 a 90 días",
            "13.625 (h); 13.630"
          ],
          [
            "Negarse al programa de prevención de sustancias psicoactivas",
            "247 UVT",
            "60 a 90 días",
            "13.625 (v); 13.630"
          ],
          [
            "PIC que se aparta de las especificaciones de operación",
            "370 UVT",
            "90 a 120 días",
            "13.635 (f); 13.640"
          ],
          [
            "Seguir volando con disminución psicofísica, o no avisarla en 3 días",
            "370 UVT",
            "90 a 120 días",
            "13.635 (n), (o); 13.640"
          ],
          [
            "Información médica falsa u oculta",
            "370 UVT",
            "90 a 120 días",
            "13.635 (p); 13.640"
          ],
          [
            "Desobedecer instrucciones ATC; desviarse de ruta o altitud; no aterrizar cuando se ordena",
            "493 UVT",
            "hasta 3 años",
            "13.645 (c), (e), (f); 13.650"
          ],
          [
            "Volar sin transpondedor o apagarlo; salir sin plan de vuelo autorizado",
            "493 UVT (el doble si no corrige o hay interceptación)",
            "hasta 90 días (el doble en el mismo caso)",
            "13.645 (h), (i), (j); 13.650"
          ],
          [
            "Operar con equipo esencial inoperativo o incumpliendo la MEL",
            "493 UVT",
            "hasta 90 días",
            "13.645 (t); 13.650"
          ],
          [
            "Ejercer bajo efecto de alcohol o drogas",
            "740 UVT (el doble si es el comandante)",
            "hasta 3 años",
            "13.660 (b); 13.665 (a)"
          ],
          [
            "No informar accidentes o incidentes graves",
            "740 UVT",
            "hasta 120 días",
            "13.660 (j); 13.665 (c)"
          ],
          [
            "PIC que se desvía de las técnicas de vuelo de los manuales",
            "740 UVT",
            "hasta 120 días",
            "13.660 (n); 13.665 (c)"
          ],
          [
            "Ejercer con licencia suspendida o cancelada",
            "1.233 UVT",
            "suspensión hasta 1 año",
            "13.670 (a); 13.675"
          ],
          [
            "Falsificar licencia o certificado, o usar uno falso",
            "1.233 UVT",
            "cancelación",
            "13.670 (b); 13.675"
          ]
        ]
      },
      {
        "kind": "table",
        "head": [
          "Regla",
          "Valor",
          "Numeral"
        ],
        "rows": [
          [
            "Cada atenuante",
            "−16,66 % (máximo −50 %)",
            "13.300 (a)"
          ],
          [
            "Cada agravante",
            "+8,33 %",
            "13.300 (d)"
          ],
          [
            "Reincidencia (misma falta, 3 años)",
            "puede duplicar; más de 180 días de suspensión puede volverse cancelación",
            "13.300 (c)"
          ],
          [
            "Tentativa",
            "la mitad",
            "13.110 (a)"
          ],
          [
            "Nueva licencia tras cancelación",
            "6 años de buena conducta",
            "13.110 (c)"
          ],
          [
            "Descargos",
            "10 días desde la notificación del pliego",
            "13.2045 (b)"
          ],
          [
            "Pago en 5 días",
            "multa a la mitad, sin suspensión accesoria (si no hay reincidencia)",
            "13.2085; 13.2095"
          ],
          [
            "Revisión de medida preventiva",
            "máximo 15 días hábiles",
            "13.1075 (d)"
          ],
          [
            "Caducidad / prescripción",
            "3 años / 5 años",
            "13.2015"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "Infracción técnica = multa **más** suspensión (o cancelación) de la licencia con la que la cometiste.",
          "Lo más grave para un piloto: alcohol o drogas, desobedecer a ATC o desviarse de ruta o altitud (hasta 3 años), volar suspendido (suspensión de hasta 1 año) y falsificar documentos (cancelación).",
          "Presentarte voluntariamente a informar la falta es atenuante (−16,66 %); reincidir puede duplicar la sanción.",
          "Si te cae un pliego de cargos: 10 días para descargos; pagar en 5 días reduce la multa a la mitad y evita la suspensión accesoria.",
          "La autoridad tiene 3 años para sancionarte desde el hecho.",
          "Más de un período de vacaciones vencido = suspensión automática de vuelo."
        ]
      }
    ]
  },
  {
    "n": 17,
    "title": "RAC 1 · Definiciones",
    "kicker": "Referencia",
    "minutes": 10,
    "blocks": [
      {
        "kind": "p",
        "text": "Enmienda 18, febrero de 2026 (Resolución 00513 del 16-feb-2026, publicada en el Diario Oficial 53.401 del 17-feb-2026)."
      },
      {
        "kind": "titulo",
        "text": "¿De qué trata?"
      },
      {
        "kind": "p",
        "text": "El RAC 1 es el diccionario oficial de todos los RAC: fija el significado de los términos que usan las demás normas y unas reglas generales (a quién aplican los RAC, que su cumplimiento es obligatorio y que nadie puede alegar que no los conocía). No es una norma para memorizar entera: tiene cientos de definiciones, la mayoría para talleres, aeropuertos o fabricantes. Aquí están las que un piloto de aerolínea usa en entrevista, en el examen técnico y en el manual de operaciones."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber un piloto"
      },
      {
        "kind": "sub",
        "text": "Cómo funcionan las definiciones"
      },
      {
        "kind": "vinetas",
        "items": [
          "Las definiciones del RAC 1 son **generales** y valen para todos los RAC. Si otro RAC define la misma palabra de otra forma, **manda la del RAC particular**, pero solo para los asuntos de ese RAC. Si un RAC no define una palabra, se entiende como la define el RAC 1 (1.2).",
          "Consecuencia práctica: para operación de aerolínea, cuando el RAC 121 define algo (combustible, alternos), esa es la definición que usas.",
          "Los RAC son de **obligatorio cumplimiento** (1.1.3.1) y, una vez publicados en el Diario Oficial, **su ignorancia no sirve de excusa** (1.1.4). Las sanciones por incumplirlos se tramitan con los criterios del RAC 13 (1.1.3.2, Nota 1)."
        ]
      },
      {
        "kind": "sub",
        "text": "1. La tripulación y quién manda"
      },
      {
        "kind": "list",
        "items": [
          "**Piloto al mando (PIC) / Comandante**: el piloto titular de una licencia que lo habilite, designado por el explotador para pilotar la aeronave, y que responde por su operación y seguridad durante el tiempo de vuelo (1.2.1, «Piloto al mando» y «Comandante»).",
          "**Copiloto**: piloto con licencia y habilitación adecuadas al tipo o clase de aeronave, que presta servicios de pilotaje sin estar al mando. No cuenta como copiloto quien va a bordo solo para recibir instrucción de vuelo (1.2.1, «Copiloto»).",
          "**Piloto de relevo en crucero**: miembro de la tripulación de vuelo designado para hacer tareas de piloto en crucero y permitir el descanso previsto del PIC o del copiloto (1.2.1).",
          "**Miembro de la tripulación de vuelo**: tripulante con licencia a quien se le asignan obligaciones **esenciales** para la operación de la aeronave durante el tiempo de vuelo (1.2.1). El **miembro de la tripulación de cabina de mando** es el que ejerce sus atribuciones en la cabina de mando (1.2.1).",
          "**Tripulación**: incluye la **tripulación de vuelo** (comandante y copiloto, o cualquier otro piloto que ejerza como tal) y **otros tripulantes** (ingeniero de vuelo, navegante, auxiliares de servicios a bordo) (1.2.1, «Tripulación»).",
          "**Tripulación sencilla**: la que exige el certificado tipo (piloto y copiloto, más ingeniero y navegante si se requieren). **Tripulación múltiple**: más tripulantes que la sencilla, para poder aumentar las horas de vuelo o de servicio de la asignación según lo permitan los reglamentos (1.2.1).",
          "**Tripulante adicional (tripadi)**: tripulante que la empresa traslada en un vuelo **sin ejercer funciones**, para operar después, volver a su base o cumplir una asignación de la escuela; figura en los documentos del vuelo y **no ocasiona doble asignación** (1.2.1)."
        ]
      },
      {
        "kind": "sub",
        "text": "2. Tiempos, descanso y fatiga"
      },
      {
        "kind": "list",
        "items": [
          "**Tiempo de vuelo** tiene dos sentidos (1.2.1): **De la aeronave**: de un despegue al aterrizaje siguiente; **De la tripulación**: desde que la aeronave **empieza a moverse** con el propósito de despegar hasta que **se detiene** al final del vuelo, «de cuña a cuña». Este es el que va a tu bitácora.",
          "**Tiempo de vuelo por instrumentos**: tiempo en que se pilota solo por instrumentos, sin referencias externas (1.2.1).",
          "**Tiempo de servicio (duty time)**: todo el tiempo en que el tripulante está a disposición del explotador (1.2.1).",
          "**Período de servicio de vuelo**: desde que el tripulante empieza a prestar servicio, inmediatamente después de un descanso y antes de un vuelo o serie de vuelos, hasta que queda relevado de todo servicio al terminarlos (1.2.1).",
          "**Descanso**: tiempo en que el tripulante queda liberado de **toda** obligación con el explotador, antes y después de un vuelo o serie de vuelos. **Descanso a bordo**: debe ser en posición horizontal e independiente de pasajeros y de la cabina de vuelo (1.2.1).",
          "**Fatiga**: estado fisiológico de menor capacidad mental o física por falta de sueño, vigilia prolongada, fase circadiana o carga de trabajo, que puede menoscabar la alerta y el desempeño en funciones de seguridad (1.2.1).",
          "**FRMS** (sistema de gestión de riesgos asociados a la fatiga): medio basado en datos y en principios científicos y experiencia operacional para gestionar continuamente el riesgo de fatiga (1.2.1).",
          "Los **límites** (cuántas horas, cuánto descanso) **no están en el RAC 1**: viven en el RAC 121 (y RAC 135 para otros explotadores)."
        ]
      },
      {
        "kind": "sub",
        "text": "3. Mínimos y aproximaciones"
      },
      {
        "kind": "list",
        "items": [
          "**Altitud de decisión (DA) / altura de decisión (DH)**: en la aproximación de precisión, el punto en que se inicia la aproximación frustrada si no se tiene la referencia visual requerida. La **DA** va referida al nivel medio del mar; la **DH**, a la altura sobre la zona de toma de contacto (1.2.1, «Altitud de decisión»).",
          "**Altura mínima de descenso (MDA)**: la más baja autorizada en la aproximación final o en el circuito (circling) de una aproximación **sin trayectoria de descenso electrónica** (1.2.1).",
          "**Mínimos de utilización de aeródromo**: límites de uso de un aeródromo para despegue o aterrizaje, expresados en visibilidad, DH o MDA y nubosidad (1.2.1).",
          "**Techo**: altura sobre el terreno de la capa más baja de nubes u oscurecimiento reportada como «quebrada» o «nublado» (no «delgada» ni «parcial») (1.2.1).",
          "**Alcance visual en pista (RVR)**: distancia hasta la que el piloto, sobre el eje de la pista, ve las marcas o luces que la delimitan o señalan su eje (1.2.1).",
          "**Aproximación que no es de precisión**: sin guía electrónica de trayectoria de planeo. **De precisión**: con guía en azimut y en trayectoria de planeo (1.2.1, «Operación de aproximación y aterrizaje por instrumentos»).",
          "**CDFA** (aproximación final en descenso continuo): técnica para aproximaciones que no son de precisión, en descenso continuo y sin nivelar, desde el punto de referencia de aproximación final hasta unos 15 m (50 ft) sobre el umbral o hasta el inicio del enderezamiento; es congruente con la aproximación estabilizada (1.2.1).",
          "**IMC / VMC**: las VMC son visibilidad, distancia de nubes y base de nubes **iguales o mejores** que los mínimos del Reglamento del Aire; las IMC, **inferiores** a esos mínimos (1.2.1).",
          "El RAC 1 **no define «aproximación estabilizada»**. Lo más cercano es «Aproximación satisfactoria», que es un criterio para las demostraciones de operaciones CAT II (ver Datos importantes). Los criterios de aproximación estabilizada que aplica una aerolínea van en su manual de operaciones (RAC 121, Apéndice 9, A9.3.14)."
        ]
      },
      {
        "kind": "sub",
        "text": "4. Alternos, combustible y rutas largas"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Aeródromo de alternativa (alterno)**: aquel al que podría dirigirse una aeronave cuando es imposible o no es aconsejable ir al de aterrizaje previsto o aterrizar en él (1.2.1). **Los tipos** (de despegue, en ruta, de destino) **no están en el RAC 1**: los define el RAC 121 (121.001), que además aclara que en Colombia **no se usa el concepto de aeródromo aislado** y todo vuelo debe tener al menos un alterno.",
          "**Punto de no retorno**: último punto geográfico desde el que la aeronave puede seguir tanto al destino como a un alterno en ruta disponible (1.2.1).",
          "**EDTO** (operación con tiempo de desviación extendido): vuelo de avión con dos o más motores de turbina en el que el tiempo de desviación a un alterno en ruta supera el **umbral de tiempo** fijado por la UAEAC. Con dos motores equivale a ETOPS (1.2.1). **Combustible crítico para EDTO**: el suficiente para llegar a un alterno en ruta considerando, en el punto más crítico, la falla de sistema más limitante (1.2.1).",
          "**Definiciones de combustible del RAC 1** (básico, contingencia, reserva, sostenimiento, mínimo): ver Datos importantes. Son de 2004; **para aerolínea mandan las del RAC 121**, que usan otros términos (combustible para contingencias, reserva final, 121.2645)."
        ]
      },
      {
        "kind": "sub",
        "text": "5. Sucesos y emergencias"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Accidente**: suceso ligado a la utilización de una aeronave tripulada, entre el embarque con intención de volar y el desembarque de todos, en el que (i) alguien sufre lesiones mortales o graves por estar en la aeronave, por contacto directo con ella (incluso partes desprendidas) o por el chorro de un reactor; o (ii) la aeronave sufre daños estructurales que afectan su resistencia, performance o características de vuelo y exigen reparación importante; o (iii) la aeronave desaparece o queda inaccesible (1.2.1). Hay excepciones (por ejemplo, daño limitado a un solo motor, hélices, puntas de ala, neumáticos, frenos, o daños por granizo o aves).",
          "**Incidente**: suceso que no llega a accidente y que afecta o puede afectar la seguridad de las operaciones (1.2.1).",
          "**Incidente grave**: no está en el RAC 1. Lo define el RAC 114 (114.001): incidente con **alta probabilidad de que ocurriera un accidente**.",
          "**Emergencia**: hay motivos justificados para creer que la aeronave o sus ocupantes están amenazados por un peligro grave e inminente y necesitan auxilio inmediato (1.2.1). Las fases de los servicios de búsqueda son **incertidumbre (INCERFA)**, **alerta (ALERFA)** y **peligro (DETRESFA)** (1.2.1).",
          "**Peligro** (hazard): condición u objeto que puede causar o contribuir a un incidente o accidente. **SMS**: enfoque sistemático para gestionar la seguridad operacional, con estructura, rendición de cuentas, políticas y procedimientos (1.2.1)."
        ]
      },
      {
        "kind": "sub",
        "text": "6. La empresa, los documentos y el despacho"
      },
      {
        "kind": "list",
        "items": [
          "**Explotador**: persona natural o jurídica que opera la aeronave (como propietario o por contrato inscrito en el registro aeronáutico). Tiene el **control técnico y operacional** sobre la aeronave **y su tripulación** y responde por las operaciones (1.2.1).",
          "**Estado del explotador**: donde está la oficina principal del explotador (1.2.1).",
          "**Certificado de operación** (CDO; el RAC 121.001 aclara que equivale al AOC mencionado en los LAR): documento de la Secretaría de Autoridad Aeronáutica que certifica que el operador cumple las regulaciones y requisitos técnicos para explotar aeronaves en servicios aéreos comerciales, en los términos que el certificado fija (1.2.1).",
          "**Aerolínea**: empresa de servicios aéreos comerciales de transporte público con permiso de operación vigente (1.2.1).",
          "**MEL** (lista de equipo mínimo): la prepara **el explotador** con base en la MMEL del tipo (o más restrictiva) y dice con qué equipo inoperativo puede salir la aeronave, bajo condiciones. **CDL** (lista de desviaciones respecto a la configuración): la establece **el diseñador** con aprobación del Estado de diseño y dice de qué **partes exteriores** puede prescindirse al iniciar un vuelo, con sus limitaciones y correcciones de performance (1.2.1).",
          "**Despachador**: titular de licencia facultado para elaborar los documentos de vuelo y despacho y para hacer seguimiento al vuelo (1.2.1).",
          "**Licencia**: documento de la autoridad que certifica que su titular puede ejercer funciones aeronáuticas según sus condiciones y limitaciones. **Habilitación**: autorización inscrita en la licencia, que forma parte de ella, con condiciones, atribuciones o restricciones (1.2.1).",
          "**Sustancias psicoactivas**: alcohol, opiáceos, cannabinoides, sedantes e hipnóticos, cocaína, otros psicoestimulantes, alucinógenos y disolventes volátiles. **Se excluyen el tabaco y la cafeína** (1.2.1)."
        ]
      },
      {
        "kind": "titulo",
        "text": "Datos importantes"
      },
      {
        "kind": "table",
        "head": [
          "Término",
          "Dato clave",
          "Fuente"
        ],
        "rows": [
          [
            "Tiempo de vuelo (tripulación)",
            "«de cuña a cuña»: desde que la aeronave se mueve para despegar hasta que se detiene",
            "1.2.1"
          ],
          [
            "DA / DH",
            "DA sobre nivel medio del mar; DH sobre la zona de toma de contacto",
            "1.2.1"
          ],
          [
            "CAT I",
            "DH no inferior a 60 m (200 ft); visibilidad no inferior a 800 m o RVR no inferior a 550 m",
            "1.2.1, «Operación de aproximación…»"
          ],
          [
            "CAT II",
            "DH inferior a 60 m (200 ft) y no inferior a 30 m (100 ft); RVR no inferior a 350 m",
            "1.2.1"
          ],
          [
            "CAT IIIA",
            "DH inferior a 30 m (100 ft) o sin DH; RVR no inferior a 200 m",
            "1.2.1"
          ],
          [
            "CAT IIIB",
            "DH inferior a 15 m (50 ft) o sin DH; RVR inferior a 200 m y no inferior a 50 m",
            "1.2.1"
          ],
          [
            "CAT IIIC",
            "sin DH ni limitación de RVR",
            "1.2.1"
          ],
          [
            "CDFA",
            "descenso continuo hasta unos 15 m (50 ft) sobre el umbral",
            "1.2.1"
          ],
          [
            "Aproximación satisfactoria (demostración CAT II)",
            "de 500 ft a la DH: IAS dentro de ±5 kt de la programada; desviación máxima de ½ punto en la senda del ILS; sin fallas de sistema desde 300 ft hasta el flare",
            "1.2.1"
          ],
          [
            "Combustible de contingencia (internacional)",
            "10 % del tiempo total en ruta de origen a destino",
            "1.2.1"
          ],
          [
            "Combustible de sostenimiento (nacional)",
            "45 min a altura normal de crucero sobre el alterno",
            "1.2.1"
          ],
          [
            "Combustible de sostenimiento (internacional)",
            "30 min a 1.500 ft sobre la altura del alterno",
            "1.2.1"
          ],
          [
            "Combustible mínimo",
            "suma de básico + reserva + contingencia + sostenimiento aplicables",
            "1.2.1"
          ],
          [
            "Operación extendida sobre agua (avión)",
            "más de 50 NM de la costa más cercana",
            "1.2.1"
          ],
          [
            "Sustancias psicoactivas",
            "tabaco y cafeína excluidos",
            "1.2.1"
          ],
          [
            "Prelación de definiciones",
            "la del RAC particular prevalece sobre la del RAC 1 en su materia",
            "1.2"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "list",
        "items": [
          "El RAC 1 es el diccionario de los RAC; si otro RAC define distinto, manda el otro en su materia (el RAC 121 para aerolínea).",
          "PIC = comandante: responde por la operación y seguridad durante el tiempo de vuelo; el explotador tiene el control operacional sobre la aeronave y su tripulación.",
          "Tiempo de vuelo de la tripulación es «de cuña a cuña»; período de servicio de vuelo arranca después de un descanso y termina cuando te relevan de todo servicio.",
          "DA va sobre el nivel del mar, DH sobre la zona de toma de contacto; MDA es para aproximaciones sin senda electrónica.",
          "MEL la hace el explotador (equipo inoperativo); CDL la hace el diseñador (partes exteriores faltantes).",
          "Tipos de alterno, incidente grave, límites de tiempos y criterios de aproximación estabilizada no están aquí: RAC 121 y RAC 114."
        ]
      }
    ]
  },
  {
    "n": 18,
    "title": "RAC 210 · Telecomunicaciones aeronáuticas",
    "kicker": "Referencia",
    "minutes": 2,
    "blocks": [
      {
        "kind": "p",
        "text": "Enmienda 3, enero de 2025 (Resolución 00190 del 31-ene-2025, Diario Oficial 53.020 del 04-feb-2025). Derogó el antiguo RAC 19."
      },
      {
        "kind": "titulo",
        "text": "¿De qué trata?"
      },
      {
        "kind": "p",
        "text": "Es la versión colombiana del Anexo 10 de la OACI para el **proveedor de servicios CNS** (comunicaciones, navegación y vigilancia) de la Aerocivil: especificaciones técnicas de ILS, VOR, DME, NDB, GNSS, radar, transpondedor, ACAS, enlaces de datos y uso del espectro (210.005). Casi todo remite a los volúmenes del Anexo 10; no trae procedimientos de vuelo ni obligaciones del piloto."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber un piloto"
      },
      {
        "kind": "sub",
        "text": "Frecuencias y ELT"
      },
      {
        "kind": "vinetas",
        "items": [
          "**121,500 MHz es solo para emergencias reales** (210.620): canal libre para aeronaves en peligro, comunicación cuando falla el equipo de a bordo y no se pueden usar los canales normales, búsqueda y salvamento, ELT, e **interceptación** de aeronaves civiles. Está disponible y en **escucha continua** en todos los centros de control y de información de vuelo, en las torres y aproximaciones de aeródromos internacionales y de sus alternos, y donde lo designe el ATS (210.625 (a), (b)).",
          "**Aire-aire: 123,450 MHz**, para zonas remotas u oceánicas fuera del alcance VHF de tierra (210.630). **Auxiliar de búsqueda y salvamento: 123,100 MHz** (210.640). **HF de búsqueda y salvamento en el lugar del accidente: 3.023 kHz y 5.680 kHz** (210.600 (a)(2)).",
          "**ELT**: debe funcionar **en 406 MHz y en 121,500 MHz**; cuándo es obligatorio llevarlo lo dicen el RAC 91, 121 y 135 (210.600 (a)(1)).",
          "**Banda VHF aeronáutica**: frecuencias asignables de **118,000 a 136,975 MHz** (210.615 (b))."
        ]
      },
      {
        "kind": "sub",
        "text": "Dónde está lo que buscarías aquí"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Escucha constante con ATC y falla de comunicaciones** (VMC: seguir VMC y aterrizar en el aeródromo adecuado más cercano; IMC: 20 min sin radar o 7 min con radar, código 7600): **RAC 91.265**.",
          "**Competencia lingüística** (idioma de las comunicaciones): **RAC 91.535**.",
          "**Códigos 7500 (interferencia ilícita) y 7700 (al ser interceptado)**: Apéndices 8 y 9 del **RAC 91**.",
          "**Fraseología**: no está en este RAC (remite al Anexo 10, Vol. II, y a los procedimientos ATS)."
        ]
      },
      {
        "kind": "titulo",
        "text": "Datos importantes"
      },
      {
        "kind": "table",
        "head": [
          "Dato",
          "Valor",
          "Numeral"
        ],
        "rows": [
          [
            "Frecuencia de emergencia",
            "121,500 MHz, solo para emergencias reales, con escucha continua",
            "210.620, 210.625"
          ],
          [
            "Aire-aire en zonas remotas u oceánicas",
            "123,450 MHz",
            "210.630"
          ],
          [
            "Auxiliar de búsqueda y salvamento",
            "123,100 MHz",
            "210.640"
          ],
          [
            "HF de búsqueda y salvamento en el lugar del accidente",
            "3.023 kHz y 5.680 kHz",
            "210.600 (a)(2)"
          ],
          [
            "ELT",
            "406 MHz y 121,500 MHz",
            "210.600 (a)(1)"
          ],
          [
            "Banda VHF asignable",
            "118,000 a 136,975 MHz",
            "210.615 (b)"
          ]
        ]
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "vinetas",
        "items": [
          "El RAC 210 es la norma técnica del proveedor de comunicaciones, navegación y vigilancia; al piloto le deja las frecuencias.",
          "121,5 MHz es solo para emergencias reales y tiene escucha continua en centros de control, torres y aproximaciones internacionales.",
          "123,45 MHz es aire-aire; 123,1 MHz, auxiliar de búsqueda y salvamento.",
          "El ELT transmite en 406 MHz y en 121,5 MHz.",
          "Falla de comunicaciones, códigos de transpondedor e idioma están en el RAC 91."
        ]
      }
    ]
  },
  {
    "n": 19,
    "title": "RAC 4 · Normas de aeronavegabilidad y operación",
    "kicker": "Referencia",
    "minutes": 3,
    "blocks": [
      {
        "kind": "p",
        "text": "Enmienda 32, febrero de 2026 (Resolución 00513 del 16-feb-2026, Diario Oficial 53.401 del 17-feb-2026). Adoptado en 1974."
      },
      {
        "kind": "titulo",
        "text": "¿De qué trata?"
      },
      {
        "kind": "p",
        "text": "El RAC 4 fue durante décadas la norma que regulaba casi todo: aeronavegabilidad, mantenimiento, talleres, certificación de empresas, entrenamiento de tripulaciones, **tiempos de vuelo y descanso**, operaciones de vuelo, despacho, CAT II/III, ETOPS y aviación general. Desde 2015 se ha ido desmontando a medida que Colombia adoptó los RAC armonizados con los LAR. El estado de cada capítulo está en Datos importantes."
      },
      {
        "kind": "titulo",
        "text": "Lo que debe saber un piloto"
      },
      {
        "kind": "sub",
        "text": "¿Le sigue aplicando algo a un piloto de aerolínea?"
      },
      {
        "kind": "vinetas",
        "items": [
          "**Para operación de aerolínea, no.** El RAC 121 fijó que los capítulos operativos del RAC 4 (entrenamiento, **tiempos de vuelo, servicio y descanso**, operaciones de vuelo, despacho, registros) siguen vigentes **solo para las empresas certificadas bajo RAC 4 que estén en transición, y solo hasta el 31 de mayo de 2026** (RAC 121, Normas transitorias, Art. Segundo (c)). Además, toda empresa que no hubiera cerrado la fase 3 de su actualización al 1 de junio de 2025 (o a la fecha final, si se le repusieron términos) debía **cesar actividades de vuelo** (RAC 121, Normas transitorias, Art. 3). Hoy la aerolínea opera bajo **RAC 119 + RAC 121**.",
          "Los **límites de tiempo de vuelo y descanso** que antes estaban en el RAC 4 (4.17) hoy se citan del **RAC 121, 121.1910 y Apéndice 18**. Los **requisitos de experiencia reciente** del RAC 4 (por ejemplo, 3 despegues y 3 aterrizajes en 90 días para mantener la «autonomía» como PIC o copiloto, 4.16.1.19.1) tampoco son la cita vigente para aerolínea: buscar su equivalente en RAC 121.",
          "**Por qué conviene saberlo en entrevista**: muchos manuales, instructores y pilotos veteranos todavía dicen «según el RAC 4». La respuesta correcta hoy es citar el RAC 121 (operación), RAC 119 (certificación de la empresa), RAC 91 (reglas generales) y RAC 43/145/21 (aeronavegabilidad y mantenimiento)."
        ]
      },
      {
        "kind": "titulo",
        "text": "Datos importantes"
      },
      {
        "kind": "table",
        "head": [
          "Capítulo del RAC 4",
          "Estado",
          "Dónde vive hoy"
        ],
        "rows": [
          [
            "I · Mantenimiento, reconstrucción y alteración",
            "Reemplazado (Res. 02300 de 2016)",
            "RAC 43"
          ],
          [
            "III · Directivas de aeronavegabilidad",
            "Derogado (Res. 00534 de 2016)",
            "El RAC 4 no lo dice; por tema, el RAC 39 (Directrices de aeronavegabilidad)"
          ],
          [
            "IV · Certificación de aeronavegabilidad",
            "Derogado (Res. 03310 de 2015)",
            "RAC 21, Capítulos H e I"
          ],
          [
            "XV · Operación de empresas de transporte público",
            "Reemplazado desde el 1-dic-2020 (Res. 01593 de 2018)",
            "RAC 119"
          ],
          [
            "XXVI · Aeronaves experimentales",
            "Derogado (Res. 00513 de 2026)",
            "reservado"
          ],
          [
            "XXVII, XXVIII",
            "Reservados (2010)",
            "·"
          ],
          [
            "XXIX",
            "Derogado (Res. 02410 de 2018)",
            "·"
          ],
          [
            "II, V, VI, VII, XIV a XX (y XXII para helicópteros)",
            "**Régimen de transición** para empresas certificadas bajo RAC 4, **hasta el 31 de mayo de 2026** o hasta que terminen de certificarse bajo RAC 119 + 121/135",
            "RAC 121 (aviones de más de 19 pasajeros o más de 5.700 kg) y RAC 135 (los demás y helicópteros)"
          ],
          [
            "XXIV · Aerostatos; XXV · Aviación deportiva (4.25.8, aeromodelos)",
            "Sin reemplazo indicado; el RAC 91 remite a ellos",
            "RAC 4"
          ]
        ]
      },
      {
        "kind": "p",
        "text": "Fuentes: notas al inicio de cada capítulo del RAC 4; RAC 121, Normas transitorias, Artículo Segundo (b), (c) y Artículos 1 a 3; RAC 135, Normas de transición (c); RAC 91.005, Notas 1 y 3; RAC 91, Apéndice 13, 1.1 (b) (aeromodelos y aerostatos)."
      },
      {
        "kind": "titulo",
        "text": "En pocas palabras"
      },
      {
        "kind": "vinetas",
        "items": [
          "El RAC 4 es la norma histórica de operación; se ha reemplazado por capítulos.",
          "Para aerolíneas, su régimen de transición terminó el 31 de mayo de 2026: hoy rige RAC 119 + RAC 121.",
          "Tiempos de vuelo y descanso: RAC 121 Apéndice 18, no RAC 4.17.",
          "Fuera de las notas de transición, lo que el RAC 91 todavía manda a buscar en el RAC 4 son aerostatos y aeromodelos."
        ]
      }
    ]
  }
]

// La numeración es la que se guarda como progreso: si el documento se
// desordena, mejor caerse al arrancar que marcar leída la unidad equivocada.
RAC_LECCIONES.forEach((s, i) => {
  if (s.n !== i + 1) throw new Error(`racLeccion: la unidad ${s.n} está en la posición ${i + 1}`)
})

export const RAC_LECCION_TOTAL = RAC_LECCIONES.length
export const RAC_MINUTOS = RAC_LECCIONES.reduce((t, s) => t + s.minutes, 0)

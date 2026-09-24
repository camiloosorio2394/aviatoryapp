/**
 * Misiones guiadas de Aeropuertos. Son escenarios ficticios de práctica, no
 * sucesos reales ni reproducciones de cartas o reportes de un aeródromo.
 * Cada foto es una referencia visual ya revisada en el módulo; los datos que
 * aparecen después de observarla describen un cambio hipotético del caso.
 *
 * Las misiones son complementarias a los 30 ejercicios del catálogo de
 * progreso. No se mezclan con sus claves ni con el logro de práctica.
 */

export interface PuntoVisual {
  x: number
  y: number
  nombre: string
  explicacion: string
}

interface PasoBase {
  titulo: string
  situacion: string
  pregunta: string
}

export interface PasoObserva extends PasoBase {
  tipo: "observa"
  puntos: [PuntoVisual, PuntoVisual, PuntoVisual]
  correcta: number
}

export interface PasoDecide extends PasoBase {
  tipo: "decide"
  opciones: [
    { texto: string; explicacion: string },
    { texto: string; explicacion: string },
    { texto: string; explicacion: string },
  ]
  correcta: number
}

export type PasoMision = PasoObserva | PasoDecide

export interface MisionAeropuertos {
  id: string
  titulo: string
  subtitulo: string
  momento: string
  imagen: { src: string; alt: string; pie: string }
  lecciones: number[]
  pasos: [PasoObserva, PasoDecide, PasoDecide]
  cierre: string
}

export const AP_MISIONES: MisionAeropuertos[] = [
  {
    id: "cruce",
    titulo: "El cruce de pista",
    subtitulo: "Una autorización por radio no coincide con lo que ves delante.",
    momento: "Rodaje · noche",
    imagen: {
      src: "/modulos/aeropuertos/ap-pra-13-barra-parada.webp",
      alt: "Desde la cabina, una barra de luces rojas encendida cruza la calle de rodaje de noche",
      pie: "Escena inicial: barra de parada encendida. Los datos posteriores son cambios del escenario de práctica.",
    },
    lecciones: [14, 19],
    pasos: [
      {
        tipo: "observa",
        titulo: "Observa antes de mover el avión",
        situacion: "Ruedas hacia una pista y encuentras esta escena. Toca la pista visual que determina si puedes continuar.",
        pregunta: "¿Qué elemento manda aquí?",
        puntos: [
          { x: 7, y: 24, nombre: "Luces azules de borde", explicacion: "Marcan el borde de la calle, pero no autorizan a cruzar la barra." },
          { x: 51, y: 37, nombre: "Barra de parada roja", explicacion: "La barra roja encendida exige detenerse antes de ella." },
          { x: 51, y: 68, nombre: "Luces verdes del eje", explicacion: "El eje orienta la trayectoria, pero no anula una barra roja encendida." },
        ],
        correcta: 1,
      },
      {
        tipo: "decide",
        titulo: "La instrucción contradice la luz",
        situacion: "Control autoriza cruzar la pista. La barra de parada sigue encendida.",
        pregunta: "¿Qué haces?",
        opciones: [
          { texto: "Cruzo porque la autorización por radio tiene prioridad.", explicacion: "La autorización no permite ignorar una barra roja encendida. Hay que detenerse y aclarar la discrepancia." },
          { texto: "Me detengo antes de la barra y pido aclaración a control.", explicacion: "Correcto. Mantienes la posición y comunicas que la barra continúa encendida." },
          { texto: "Sigo despacio por el eje verde hasta ver la pista.", explicacion: "Las luces del eje no sustituyen la indicación de parada de la barra roja." },
        ],
        correcta: 1,
      },
      {
        tipo: "decide",
        titulo: "Un dato nuevo",
        situacion: "La barra se apaga. Ahora solo tienes una instrucción de rodaje hasta el punto de espera; todavía no recibes autorización para cruzar la pista.",
        pregunta: "¿Qué cambia en tu decisión?",
        opciones: [
          { texto: "Cruzo: la barra apagada equivale a autorización.", explicacion: "Que la barra esté apagada no reemplaza la autorización explícita para entrar o cruzar la pista." },
          { texto: "Me mantengo en el punto de espera y solicito autorización para cruzar.", explicacion: "Correcto. Necesitas ambas condiciones: barra apagada y autorización aplicable al cruce." },
          { texto: "Entro parcialmente en la pista para no retrasar el tránsito.", explicacion: "Entrar parcialmente sin autorización también invade la pista protegida." },
        ],
        correcta: 1,
      },
    ],
    cierre: "No sumes señales favorables para cancelar una prohibición: barra roja y autorización de cruce son comprobaciones distintas.",
  },
  {
    id: "final",
    titulo: "La final al atardecer",
    subtitulo: "La ayuda visual informa, pero no decide por sí sola si continúas.",
    momento: "Aproximación · ayudas visuales",
    imagen: {
      src: "/modulos/aeropuertos/ap-15-02-papi.webp",
      alt: "Vista de una pista en aproximación con cuatro luces PAPI, dos blancas y dos rojas, a la izquierda",
      pie: "Escena inicial: dos luces blancas y dos rojas. Los cambios siguientes se describen en el texto.",
    },
    lecciones: [15, 17],
    pasos: [
      {
        tipo: "observa",
        titulo: "Encuentra la referencia",
        situacion: "Estás en la aproximación. Toca la ayuda que te da una indicación visual de la senda.",
        pregunta: "¿Dónde está la indicación de senda?",
        puntos: [
          { x: 15, y: 51, nombre: "PAPI", explicacion: "El indicador de trayectoria de aproximación de precisión (Precision Approach Path Indicator, PAPI) muestra aquí dos luces blancas y dos rojas: indicación de senda." },
          { x: 50, y: 68, nombre: "Señal de umbral", explicacion: "Las fajas identifican el umbral; no muestran si estás alto o bajo respecto de la senda." },
          { x: 51, y: 36, nombre: "Luces del eje", explicacion: "Orientan la alineación de la pista; no son el indicador PAPI." },
        ],
        correcta: 0,
      },
      {
        tipo: "decide",
        titulo: "La indicación cambia",
        situacion: "Unos segundos después, el PAPI muestra tres rojas y una blanca. No es la combinación de la foto inicial.",
        pregunta: "¿Cómo interpretas la nueva lectura?",
        opciones: [
          { texto: "Estoy por debajo de la senda; verifico la aproximación y corrijo conforme al procedimiento y los criterios de estabilización.", explicacion: "Correcto. Tres rojas y una blanca indican estar bajo la senda; la corrección no debe comprometer una aproximación estabilizada." },
          { texto: "Estoy por encima de la senda y debo descender con rapidez.", explicacion: "Tres rojas y una blanca indican lo contrario: estás por debajo de la senda." },
          { texto: "La pista está cerrada y debo ignorar el PAPI.", explicacion: "Esa combinación indica posición vertical, no el estado de cierre de la pista." },
        ],
        correcta: 0,
      },
      {
        tipo: "decide",
        titulo: "Llegas al límite",
        situacion: "En este escenario de aproximación instrumental alcanzas los mínimos aplicables sin las referencias visuales requeridas. Alcanzas a ver el PAPI, pero eso por sí solo no satisface las condiciones para continuar.",
        pregunta: "¿Qué decisión corresponde?",
        opciones: [
          { texto: "Continúo porque el PAPI sigue encendido.", explicacion: "Una ayuda encendida no sustituye las referencias y condiciones exigidas por el procedimiento." },
          { texto: "Desciendo un poco más para buscar otras luces.", explicacion: "No se desciende por debajo del límite aplicable solo para buscar referencias." },
          { texto: "Ejecuto la aproximación frustrada según el procedimiento.", explicacion: "Correcto. Si no se cumplen las condiciones para continuar al llegar al límite, corresponde frustrar la aproximación." },
        ],
        correcta: 2,
      },
    ],
    cierre: "Identifica la ayuda, interpreta su lectura y luego contrástala con el procedimiento completo. Ninguna luz aislada autoriza a continuar.",
  },
  {
    id: "superficie",
    titulo: "La pista después de la lluvia",
    subtitulo: "Lo visible desde la cabina no reemplaza el informe ni el cálculo.",
    momento: "Aterrizaje · condición de pista",
    imagen: {
      src: "/modulos/aeropuertos/ap-20-02-agua-superficie.webp",
      alt: "Pista mojada con zonas de agua visibles sobre el pavimento",
      pie: "Referencia visual de agua en superficie. La foto no permite medir profundidad ni asignar una clave de condición.",
    },
    lecciones: [2, 20],
    pasos: [
      {
        tipo: "observa",
        titulo: "Qué se ve y qué no",
        situacion: "Tras una lluvia observas la pista. Toca el indicio que obliga a comprobar el informe vigente, sin intentar medirlo desde la foto.",
        pregunta: "¿Qué zona llama tu atención?",
        puntos: [
          { x: 36, y: 17, nombre: "Cielo nublado", explicacion: "El cielo explica el contexto, pero no describe la condición de cada tercio de pista." },
          { x: 54, y: 45, nombre: "Señal de eje", explicacion: "La señal blanca orienta la pista; no mide el estado del pavimento." },
          { x: 28, y: 68, nombre: "Agua visible", explicacion: "Hay agua visible. La foto por sí sola no permite establecer cobertura, profundidad ni clave de condición." },
        ],
        correcta: 2,
      },
      {
        tipo: "decide",
        titulo: "Antes de calcular",
        situacion: "El informe de condición de pista describe sus tres tercios por separado. Debes valorar si el aterrizaje es posible.",
        pregunta: "¿Qué información usas?",
        opciones: [
          { texto: "Solo la parte que parece más mojada en la fotografía.", explicacion: "Una foto no sustituye la evaluación publicada de los tres tercios." },
          { texto: "El informe vigente completo y los datos de performance de la aeronave.", explicacion: "Correcto. La condición reportada se relaciona con los datos de performance aplicables." },
          { texto: "La condición del primer tercio únicamente, porque allí comienza el aterrizaje.", explicacion: "También importa la condición de los otros tercios; no se descartan por la posición de la toma de contacto." },
        ],
        correcta: 1,
      },
      {
        tipo: "decide",
        titulo: "El reporte se actualiza",
        situacion: "Antes de aterrizar recibes un informe nuevo con peor condición en el último tercio. Ya no puedes confirmar que el cálculo anterior siga dentro de los límites.",
        pregunta: "¿Qué haces con el cálculo anterior?",
        opciones: [
          { texto: "Lo mantengo: el último tercio pesa menos que el primero.", explicacion: "Una condición nueva puede cambiar la performance. No hay base para mantener sin revisión el cálculo anterior." },
          { texto: "Reevalúo con el informe nuevo; si no puedo confirmar los límites para continuar, frustro la aproximación.", explicacion: "Correcto. El dato vigente y la performance aplicable gobiernan la decisión, no la foto ni un cálculo desactualizado." },
          { texto: "Uso el color del pavimento de la foto para estimar la frenada.", explicacion: "La apariencia no proporciona la información necesaria para calcular la performance." },
        ],
        correcta: 1,
      },
    ],
    cierre: "Una observación inicia la pregunta; el informe vigente y la performance de la aeronave permiten responderla.",
  },
  {
    id: "puesto",
    titulo: "El puesto asignado",
    subtitulo: "Una guía visual útil puede convertirse en señal de alto si hay discrepancia.",
    momento: "Plataforma · atraque",
    imagen: {
      src: "/modulos/aeropuertos/ap-22-05-atraque-avanzado.webp",
      alt: "Pantalla didáctica de guía visual de atraque con tipo A320, alineación y distancia restante",
      pie: "Pantalla didáctica, no interfaz de un aeropuerto real. En el caso, el avión es un A321.",
    },
    lecciones: [21, 22],
    pasos: [
      {
        tipo: "observa",
        titulo: "Comprueba el sistema",
        situacion: "Te acercas al puesto con un A321. Toca el elemento que primero debes contrastar con tu aeronave.",
        pregunta: "¿Qué dato no coincide?",
        puntos: [
          { x: 55, y: 27, nombre: "Tipo mostrado: A320", explicacion: "La pantalla indica A320 y el caso dice A321. No debes asumir que la guía corresponde a tu aeronave." },
          { x: 42, y: 9, nombre: "Luces superiores", explicacion: "Son parte de la instalación, pero la discrepancia inmediata está en la identificación mostrada." },
          { x: 77, y: 64, nombre: "Fachada de la terminal", explicacion: "La fachada no valida la asignación ni el tipo configurado en la guía." },
        ],
        correcta: 0,
      },
      {
        tipo: "decide",
        titulo: "No encaja tu aeronave",
        situacion: "El puesto asignado es el correcto, pero la pantalla de atraque sigue identificando A320 para tu A321.",
        pregunta: "¿Cómo procedes?",
        opciones: [
          { texto: "Sigo: los dos modelos son parecidos.", explicacion: "La similitud entre modelos no confirma que el sistema esté configurado para tu aeronave." },
          { texto: "Me detengo y pido confirmar la configuración y la guía antes de avanzar.", explicacion: "Correcto. Una discrepancia en la identificación exige aclaración antes de continuar el atraque." },
          { texto: "Ignoro la pantalla y estimo la distancia a ojo.", explicacion: "No se sustituye una guía que no concuerda por una estimación improvisada de separación." },
        ],
        correcta: 1,
      },
      {
        tipo: "decide",
        titulo: "Cambia la indicación",
        situacion: "El personal corrige el tipo mostrado. Más adelante, la guía indica PARADA, aunque todavía ves una línea amarilla que continúa hacia delante.",
        pregunta: "¿Qué prevalece?",
        opciones: [
          { texto: "Sigo la línea hasta que se termine.", explicacion: "La línea orienta la trayectoria, pero no anula una indicación de parada." },
          { texto: "Avanzo lentamente para obtener una distancia menor.", explicacion: "Avanzar después de una indicación de parada puede comprometer la separación en el puesto." },
          { texto: "Me detengo y confirmo la situación antes de cualquier otro movimiento.", explicacion: "Correcto. La indicación de parada exige detener el avión; cualquier discrepancia posterior se aclara sin avanzar." },
        ],
        correcta: 2,
      },
    ],
    cierre: "En plataforma, la línea ayuda a alinear; la identificación y la señal de parada determinan si puedes seguir avanzando.",
  },
]

export function resultadoPaso(paso: PasoMision, indice: number): { correcto: boolean; explicacion: string } {
  if (paso.tipo === "observa") {
    const punto = paso.puntos[indice]
    return { correcto: indice === paso.correcta, explicacion: punto?.explicacion ?? "Elige un punto de la imagen." }
  }
  const opcion = paso.opciones[indice]
  return { correcto: indice === paso.correcta, explicacion: opcion?.explicacion ?? "Elige una opción." }
}

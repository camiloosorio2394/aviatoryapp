import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  AlertTriangle,
  ArrowRight,
  Brain,
  ClipboardCheck,
  ClipboardList,
  CloudSun,
  Fuel,
  Gauge,
  Headset,
  Play,
  Scale,
  Wind,
  TowerControl,
} from "lucide-react"
import { AerodromeIcon } from "@/components/icons/aero"
import { fechaDeUltimaActividad } from "@/lib/activity"
import { TarjetaModulo } from "@/components/aerolinea/TarjetaModulo"
import { TEMAS_EN_CAMINO } from "@/components/aerolinea/carasDeModulo"
import type { TarjetaModuloProps } from "@/components/aerolinea/TarjetaModulo"
import { appButtonClass } from "@/lib/buttonStyles"
import { traerMejoresPuntajesDeExamen } from "@/services/aerolineas"
import { useSession } from "@/hooks/useSession"
import {
  NOTAM_PRACTICE_TOTAL,
  readLocalProgress,
  resumirNotam,
  NOTAM_TOTALES,
} from "@/lib/notamComun"
import { fetchNotamProgress } from "@/lib/notamProgress"
import { METAR_PRACTICE_TOTAL, readMetarProgress, resumirMetar, METAR_LECCION } from "@/lib/metar"
import { fetchMetarProgress } from "@/lib/metarProgress"
import {
  AIRLINE_MOCK_PASS_SCORE,
  BANCO_TOTAL,
  fetchMejorPuntajeSimulacro,
  readAirlineMockLocal,
} from "@/lib/airlineMock"
import {
  MP_HUB,
  MP_LECTURA_TOTAL,
  MP_PRACTICA_TOTAL,
  resumirMercancias,
  MP_LECTURA_MINUTOS,
} from "@/lib/mercancias"
import {
  AERO_HUB,
  AERO_LECTURA_MINUTOS,
  AERO_LECTURA_TOTAL,
  AERO_PRACTICA_TOTAL,
  resumirAerodinamica,
} from "@/lib/aerodinamica"
import {
  fetchAerodinamicaProgress,
  readAerodinamicaLocal,
} from "@/lib/aerodinamicaProgress"
import {
  AP_ACENTO,
  AP_HUB,
  AP_LECTURA_TOTAL,
  readAeropuertosLocal,
  resumirAeropuertos,
} from "@/lib/aeropuertos"
import { AP_PRACTICA_CONTEO } from "@/lib/aeropuertosConteo"
import {
  CM_ACENTO,
  CM_HUB,
  CM_LECTURA_TOTAL,
  CM_NIVELES,
  CM_TITULO_CORTO,
  readComunicacionesLocal,
  resumirComunicaciones,
} from "@/lib/comunicaciones"
// Los números, no la lección: `performanceLeccion` pesa tres mil líneas y esta
// pantalla solo necesita los totales, igual que con los demás módulos.
import {
  PERF_HUB,
  PERF_LECTURA_MINUTOS,
  PERF_LECTURA_TOTAL,
  PERF_PRACTICA_TOTAL,
  resumirPerformance,
} from "@/lib/performance"
import { fetchPerformanceProgress, readPerformanceLocal } from "@/lib/performanceProgress"
import {
  RAC_HUB,
  RAC_LECTURA_MINUTOS,
  RAC_LECTURA_TOTAL,
  RAC_PRACTICA_TOTAL,
  RAC_TITULO,
  resumirRac,
} from "@/lib/rac"
import { fetchRacProgress, readRacLocal } from "@/lib/racProgress"
import {
  CB_HUB,
  CB_LECTURA_MINUTOS,
  CB_LECTURA_TOTAL,
  CB_PRACTICA_TOTAL,
  CB_TITULO_CORTO,
  resumirCombustible,
} from "@/lib/combustible"
import { fetchCombustibleProgress, readCombustibleLocal } from "@/lib/combustibleProgress"
import { PSICO_HUB, SIMULACRO_TOTAL } from "@/lib/psicotecnicas"
import { PSICO_TOTAL } from "@/lib/psicotecnicasConteo"
import { leerPsicoLocal, mejorSimulacroRemoto } from "@/lib/psicotecnicasProgress"
import { fetchMercanciasProgress, readMercanciasLocal } from "@/lib/mercanciasProgress"
import { fetchAeropuertosProgress } from "@/lib/aeropuertosProgress"
import { fetchComunicacionesProgress } from "@/lib/comunicacionesProgress"
import { CM_PRACTICA_CONTEO } from "@/lib/comunicacionesConteo"
// Reusa la foto que la portada ya asocia a este módulo: la herramienta es del
// módulo, no un curso aparte, y compartir la imagen lo dice sin texto.
import matchPhoto from "@/assets/photos/aerolinea-piloto.webp"
import simulacroPhoto from "@/assets/photos/notam-evaluacion-examen.webp"
// La misma foto que abre el hub de Psicotécnicas. Antes la tarjeta traía la
// portada del SIMULACRO, que es una página interior del tema.
import psicoPhoto from "@/assets/photos/psicotecnicas-mano-panel.webp"
// La cabina al amanecer: la foto no la usa ninguna tarjeta de esta pantalla,
// así que el hero no repite imagen con lo que tiene debajo.
import heroPhoto from "@/assets/photos/cta-cockpit-dawn.jpg"

/**
 * Módulo Ingreso a aerolínea: la lista de TEMAS de estudio.
 *
 * La pantalla lee el progreso real de cada tema y ordena por él: primero lo
 * que quedó a medias, después lo que no se ha tocado y de último lo terminado.
 * Antes era estática, así que quien llevaba 6 de 13 secciones de NOTAM veía
 * exactamente lo mismo que quien nunca lo abrió.
 *
 * Composición densa, de una sola fila de temas (15 de septiembre de 2026):
 *
 *  - Arriba, el hero de las portadas de módulo en su versión corta: foto bajo
 *    velo navy, titular en Archivo y el panel de avance de cristal. Antes
 *    era la cabecera genérica de la app, y la pantalla que agrupa los módulos
 *    no se parecía a ninguno de ellos.
 *  - Los cinco temas caben en una fila. La tarjeta perdió el renglón del CTA
 *    —ahora es la flecha redonda del pie— y con eso entra la quinta columna.
 *    Las herramientas no se estudian ni se terminan, así que van en su propio
 *    grupo, en dos tarjetas horizontales que llenan la fila en vez de dejar
 *    dos huecos.
 *  - La rejilla responde al ancho del contenido y no al de la ventana, porque
 *    la barra lateral se come 245 px: una, dos, tres o cinco columnas, nunca
 *    cuatro, que con cinco temas deja uno huérfano en la segunda fila.
 *  - Lo que viene después («En camino») entra en la misma rejilla y ocupa las
 *    celdas que le sobran a la segunda fila, en vez de ir suelto debajo.
 *
 * Las tarjetas son `TarjetaModulo`, la versión compacta de la tarjeta de
 * catálogo.
 *
 * El hero no lleva botón. Tenía uno de «Seguir con …», y en su sitio está ahora
 * el hueco del video que presenta el módulo. Retomar no se pierde: la tarjeta
 * del tema a medias va marcada «En curso» y es la primera de la rejilla, que es
 * donde el ojo cae después del hero.
 */

/** Temas que todavía no tienen contenido: la lista vive en `carasDeModulo`. */
const PROXIMOS = TEMAS_EN_CAMINO

/** Rótulo de grupo: el de las portadas de módulo, en Archivo y con aire. */
const ROTULO =
  "nh-display m-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"

interface TemaEstado {
  card: Omit<TarjetaModuloProps, "cargando" | "chip" | "orientacion">
  /** Avance del tema, 0 a 100. Decide el orden de la lista. */
  pct: number
  to: string
  nombre: string
  /** Una herramienta no se estudia ni se completa: va aparte y no se retoma. */
  herramienta?: boolean
}

/** El CTA de un tema según por dónde vas. */
function ctaDeTema(pct: number): string {
  if (pct >= 100) return "Repasar"
  return pct > 0 ? "Continuar" : "Empezar"
}


export function AirlinePrep() {
  const { user, isLoading: sessionLoading } = useSession()
  const [notamProgress, setNotamProgress] = useState(() => {
    const local = readLocalProgress()
    return {
      lessonScreens: local.lessonScreens,
      practiceDone: local.exercisesDone,
      bestExamScore: local.bestExamScore,
    }
  })
  const [metarProgress, setMetarProgress] = useState(() => {
    const local = readMetarProgress()
    return {
      lessonScreens: local.lessonScreens,
      practiceDone: local.practiceDone,
      bestExamScore: local.bestExamScore,
    }
  })
  const [mejorSimulacro, setMejorSimulacro] = useState<number | null>(
    () => readAirlineMockLocal().bestScore
  )
  const [mercanciasProgreso, setMercanciasProgreso] = useState(() => readMercanciasLocal())
  const [aeroProgreso, setAeroProgreso] = useState(() => readAerodinamicaLocal())
  const [aeropuertosProgreso, setAeropuertosProgreso] = useState(() => readAeropuertosLocal())
  const [comunicacionesProgreso, setComunicacionesProgreso] = useState(() => readComunicacionesLocal())
  const [performanceProgreso, setPerformanceProgreso] = useState(() => readPerformanceLocal())
  const [racProgreso, setRacProgreso] = useState(() => readRacLocal())
  const [combustibleProgreso, setCombustibleProgreso] = useState(() => readCombustibleLocal())
  const [mejorPsico, setMejorPsico] = useState<number | null>(
    () => leerPsicoLocal().mejorSimulacro
  )
  const [hidratado, setHidratado] = useState(false)
  /** ISO de la última vez que tocó cualquier tema. null sin sesión o sin avance. */
  const [ultimaActividad, setUltimaActividad] = useState<string | null>(null)

  // Quien estudia sin cuenta ve su respaldo local de inmediato: no hay nada que
  // esperar. Con sesión, se espera a la base antes de dar el avance por bueno.
  const loading = sessionLoading || (Boolean(user) && !hidratado)

  // Arranca con el respaldo local (así la pantalla nunca miente hacia abajo
  // mientras carga) y lo completa con la base, que es la verdad entre
  // dispositivos. Si una consulta falla, se queda con lo local en vez de
  // borrar el avance de la vista.
  useEffect(() => {
    if (sessionLoading || !user) return
    let cancelled = false

    void (async () => {
      const [
        notamRes,
        metarRes,
        mejoresExamen,
        mockRes,
        mpRes,
        aeRes,
        apRes,
        cmRes,
        pfRes,
        racRes,
        cbRes,
        psicoRes,
      ] = await Promise.all([
        fetchNotamProgress(user.id),
        fetchMetarProgress(user.id),
        traerMejoresPuntajesDeExamen(user.id),
        fetchMejorPuntajeSimulacro(user.id),
        fetchMercanciasProgress(user.id),
        fetchAerodinamicaProgress(user.id),
        fetchAeropuertosProgress(user.id),
        fetchComunicacionesProgress(user.id),
        fetchPerformanceProgress(user.id),
        fetchRacProgress(user.id),
        fetchCombustibleProgress(user.id),
        mejorSimulacroRemoto(user.id),
      ])
      if (cancelled) return

      if (notamRes) {
        const local = readLocalProgress()
        const scores = [mejoresExamen.notam, local.bestExamScore].filter(
          (s): s is number => typeof s === "number"
        )
        setNotamProgress({
          lessonScreens: Array.from(
            new Set([...notamRes.lessonScreens, ...local.lessonScreens])
          ),
          practiceDone: Array.from(new Set([...notamRes.practiceDone, ...local.exercisesDone])),
          bestExamScore: scores.length > 0 ? Math.max(...scores) : null,
        })
      }
      if (metarRes) {
        const local = readMetarProgress()
        const scores = [mejoresExamen.metar, local.bestExamScore].filter(
          (s): s is number => typeof s === "number"
        )
        setMetarProgress({
          lessonScreens: Array.from(new Set([...metarRes.lessonScreens, ...local.lessonScreens])),
          practiceDone: Array.from(new Set([...metarRes.practiceDone, ...local.practiceDone])),
          bestExamScore: scores.length > 0 ? Math.max(...scores) : null,
        })
      }
      setMejorSimulacro(mockRes)
      if (mpRes) setMercanciasProgreso(mpRes)
      if (aeRes) setAeroProgreso(aeRes)
      if (apRes) setAeropuertosProgreso(apRes)
      if (cmRes) setComunicacionesProgreso(cmRes)
      if (pfRes) setPerformanceProgreso(pfRes)
      if (racRes) setRacProgreso(racRes)
      if (cbRes) setCombustibleProgreso(cbRes)

      // La última vez que tocó CUALQUIER tema: la más reciente de las cuatro
      // filas de progreso. Se compara en ISO, que ordena igual que la fecha.
      // NOTAM y METAR devuelven el progreso remoto pelado; Mercancías y
      // Aerodinámica lo envuelven y lo dejan en `remoto`.
      const fechas = [
        notamRes?.actualizado,
        metarRes?.actualizado,
        mpRes?.remoto.actualizado,
        aeRes?.remoto.actualizado,
        apRes?.remoto.actualizado,
        cmRes?.remoto.actualizado,
        pfRes?.remoto.actualizado,
        racRes?.remoto.actualizado,
        cbRes?.remoto.actualizado,
      ].filter((f): f is string => typeof f === "string" && f.length > 0)
      setUltimaActividad(fechas.length > 0 ? fechas.reduce((a, b) => (a > b ? a : b)) : null)
      // Se queda con el mayor entre la base y el respaldo local: si el mejor
      // intento se hizo sin sesión en este mismo equipo, no se pierde.
      if (psicoRes !== null) {
        setMejorPsico((local) => Math.max(local ?? 0, psicoRes))
      }
      setHidratado(true)
    })()

    return () => {
      cancelled = true
    }
  }, [user, sessionLoading])

  const notam = useMemo(() => resumirNotam(notamProgress), [notamProgress])
  // Las tres partes salen de la misma fuente ya unida (base + respaldo local).
  // Antes la lección venía de la base y la práctica y la evaluación solo de
  // localStorage, así que en otro dispositivo el porcentaje de METAR mentía:
  // la lección aparecía y los 10 informes y la evaluación salían en cero.
  const metar = useMemo(() => resumirMetar(metarProgress), [metarProgress])
  const mercancias = useMemo(() => resumirMercancias(mercanciasProgreso), [mercanciasProgreso])
  const aero = useMemo(() => resumirAerodinamica(aeroProgreso), [aeroProgreso])
  const aeropuertos = useMemo(() => resumirAeropuertos(aeropuertosProgreso), [aeropuertosProgreso])
  const comunicaciones = useMemo(() => resumirComunicaciones(comunicacionesProgreso), [comunicacionesProgreso])
  const performance = useMemo(() => resumirPerformance(performanceProgreso), [performanceProgreso])
  const rac = useMemo(() => resumirRac(racProgreso), [racProgreso])
  const combustible = useMemo(() => resumirCombustible(combustibleProgreso), [combustibleProgreso])

  // Los estados van en cifras cortas («9/9 secciones») porque la tarjeta de
  // cuatro columnas les da un renglón. Los que decían «13 secciones cortas» o
  // «9 secciones» a mano ya no cuadraban con los módulos: ahora salen de los
  // mismos totales que la lección.
  const temas: TemaEstado[] = useMemo(() => {
    const lista: TemaEstado[] = [
      {
        nombre: "NOTAM",
        to: "/app/aerolinea/notam",
        pct: notam.overall,
        card: {
          to: "/app/aerolinea/notam",
          // Símbolo de aeródromo de carta: un NOTAM avisa de lo que cambia en
          // un aeródromo o su espacio aéreo, así que el símbolo informa. Donde
          // no informaría (el simulacro, el match) se quedan los genéricos: la
          // regla es que el símbolo diga algo, no que decore.
          icon: AerodromeIcon,
          color: "var(--av-blue-500)",
          titulo: "NOTAM",
          meta: `${NOTAM_TOTALES.lessonScreens} secciones · ${NOTAM_TOTALES.lessonMinutes} min`,
          descripcion:
            "Lee la línea Q y decodifica avisos reales de la Aerocivil.",
          foto: "/modulos/notam/tema-notam-operacion.webp",
          cta: ctaDeTema(notam.overall),
          avance: notam.overall,
          completo: notam.overall >= 100,
          estado: notam.empty
            ? "Sin empezar"
            : notam.overall >= 100
              ? "Tema completo"
              : `${notam.lessonRead}/${NOTAM_TOTALES.lessonScreens} secciones · ${notam.practiceDone}/${NOTAM_PRACTICE_TOTAL} ejercicios`,
        },
      },
      {
        nombre: "Meteorología operacional",
        to: "/app/aerolinea/meteorologia",
        pct: metar.overall,
        card: {
          to: "/app/aerolinea/meteorologia",
          icon: CloudSun,
          color: "var(--av-mt-700)",
          titulo: "Meteorología operacional",
          meta: `${METAR_LECCION.secciones} secciones · ${METAR_LECCION.minutos} min`,
          // Lo que se aprende, en el orden en que se lee.
          descripcion:
            "Del cielo al informe: nubes, frentes, METAR y TAF.",
          foto: "/modulos/meteorologia/tema-meteorologia-conveccion.webp",
          cta: ctaDeTema(metar.overall),
          avance: metar.overall,
          completo: metar.overall >= 100,
          estado: metar.empty
            ? "Sin empezar"
            : metar.overall >= 100
              ? "Tema completo"
              : `${metar.lessonRead}/${METAR_LECCION.secciones} secciones · ${metar.practiceDone}/${METAR_PRACTICE_TOTAL} informes`,
        },
      },
      {
        nombre: "Mercancías peligrosas",
        to: MP_HUB,
        pct: mercancias.overall,
        card: {
          to: MP_HUB,
          icon: AlertTriangle,
          color: "var(--av-dg-700)",
          titulo: "Mercancías peligrosas",
          meta: `${MP_LECTURA_TOTAL} lecciones · ${MP_LECTURA_MINUTOS} min`,
          descripcion: "Clases, NOTOC, baterías de litio y qué hacer en vuelo.",
          foto: "/modulos/mercancias/tema-mercancias-carga.webp",
          cta: ctaDeTema(mercancias.overall),
          avance: mercancias.overall,
          completo: mercancias.overall >= 100,
          estado: mercancias.empty
            ? "Sin empezar"
            : mercancias.overall >= 100
              ? "Tema completo"
              : `${mercancias.lessonRead}/${MP_LECTURA_TOTAL} lecciones · ${mercancias.practiceDone}/${MP_PRACTICA_TOTAL} ejercicios`,
        },
      },
      {
        nombre: "Aerodinámica",
        to: AERO_HUB,
        pct: aero.overall,
        card: {
          to: AERO_HUB,
          icon: Wind,
          color: "var(--av-ae-700)",
          titulo: "Aerodinámica",
          meta: `${AERO_LECTURA_TOTAL} secciones · ${AERO_LECTURA_MINUTOS} min`,
          descripcion: "Sustentación, pérdida, factor de carga, Mach y altitud de densidad.",
          foto: "/modulos/aerodinamica/tema-aerodinamica-ala.webp",
          cta: ctaDeTema(aero.overall),
          avance: aero.overall,
          completo: aero.overall >= 100,
          estado:
            aero.empty
              ? "Sin empezar"
              : aero.overall >= 100
                ? "Tema completo"
                : `${aero.lessonRead}/${AERO_LECTURA_TOTAL} secciones · ${aero.practiceDone}/${AERO_PRACTICA_TOTAL} ejercicios`,
        },
      },
      // Aeropuertos es el módulo más visual: se estudia mirando.
      {
        nombre: "Aeropuertos",
        to: AP_HUB,
        pct: aeropuertos.overall,
        card: {
          to: AP_HUB,
          icon: TowerControl,
          color: AP_ACENTO,
          titulo: "Aeropuertos",
          meta: `${AP_LECTURA_TOTAL} lecciones · 5 niveles`,
          descripcion: "Señales, letreros y luces: leer un aeropuerto de un vistazo.",
          foto: "/modulos/aeropuertos/tema-aeropuertos-rodaje.webp",
          cta: ctaDeTema(aeropuertos.overall),
          avance: aeropuertos.overall,
          completo: aeropuertos.overall >= 100,
          estado: aeropuertos.empty
            ? "Sin empezar"
            : aeropuertos.overall >= 100
              ? "Tema completo"
              : `${aeropuertos.lessonRead}/${AP_LECTURA_TOTAL} lecciones · ${aeropuertos.practiceDone}/${AP_PRACTICA_CONTEO} ejercicios`,
        },
      },
      // Performance: el módulo existía completo y esta lista no lo nombraba, así
      // que desde la portada no había manera de llegar a él. Su práctica no
      // tiene pantalla aparte (vive en los temas 38 y 40), y por eso el estado
      // cuenta temas y ejercicios y no "lecciones y prácticas".
      {
        nombre: "Performance",
        to: PERF_HUB,
        pct: performance.overall,
        card: {
          to: PERF_HUB,
          icon: Gauge,
          color: "var(--av-pf-700)",
          titulo: "Performance",
          meta: `${PERF_LECTURA_TOTAL} temas · ${PERF_LECTURA_MINUTOS} min de lectura`,
          descripcion: "V₁, campo equilibrado, segundo segmento y peso máximo del día.",
          fotoHueco:
            "PERF-TEM-01 · 2:1 · 1200×600 · Avión de transporte iniciando la carrera de despegue, visto desde el costado de la pista",
          cta: ctaDeTema(performance.overall),
          avance: performance.overall,
          completo: performance.overall >= 100,
          estado: performance.empty
            ? "Sin empezar"
            : performance.overall >= 100
              ? "Tema completo"
              : `${performance.lessonRead}/${PERF_LECTURA_TOTAL} temas · ${performance.practiceDone}/${PERF_PRACTICA_TOTAL} ejercicios`,
        },
      },
      // RAC: el reglamento, unidad por unidad. Su práctica tampoco tiene
      // pantalla: las preguntas viven al final de cada unidad.
      {
        nombre: RAC_TITULO,
        to: RAC_HUB,
        pct: rac.overall,
        card: {
          to: RAC_HUB,
          icon: Scale,
          color: "var(--av-rc-700)",
          titulo: RAC_TITULO,
          meta: `${RAC_LECTURA_TOTAL} unidades · ${RAC_LECTURA_MINUTOS} min de lectura`,
          descripcion: "Las diecinueve normas de la Aerocivil que te tocan a ti, con su numeral.",
          fotoHueco:
            "RAC-TEM-01 · 2:1 · 1200×600 · Licencia de piloto y certificado médico sobre la mesa de despacho, junto al manual de operaciones",
          cta: ctaDeTema(rac.overall),
          avance: rac.overall,
          completo: rac.overall >= 100,
          estado: rac.empty
            ? "Sin empezar"
            : rac.overall >= 100
              ? "Tema completo"
              : `${rac.lessonRead}/${RAC_LECTURA_TOTAL} unidades · ${rac.practiceDone}/${RAC_PRACTICA_TOTAL} preguntas`,
        },
      },
      // Gestión del combustible: lo mismo, por capítulos.
      {
        nombre: CB_TITULO_CORTO,
        to: CB_HUB,
        pct: combustible.overall,
        card: {
          to: CB_HUB,
          icon: Fuel,
          color: "var(--av-cb-700)",
          titulo: CB_TITULO_CORTO,
          meta: `${CB_LECTURA_TOTAL} capítulos · ${CB_LECTURA_MINUTOS} min de lectura`,
          descripcion: "Con cuánto aterrizas, y dónde: del block fuel al MAYDAY COMBUSTIBLE.",
          fotoHueco:
            "CB-TEM-01 · 2:1 · 1200×600 · Indicador de combustible y plan operacional de vuelo sobre el pedestal, en cabina",
          cta: ctaDeTema(combustible.overall),
          avance: combustible.overall,
          completo: combustible.overall >= 100,
          estado: combustible.empty
            ? "Sin empezar"
            : combustible.overall >= 100
              ? "Tema completo"
              : `${combustible.lessonRead}/${CB_LECTURA_TOTAL} capítulos · ${combustible.practiceDone}/${CB_PRACTICA_TOTAL} preguntas`,
        },
      },
      // Comunicaciones ATC: lección, práctica con audio y evaluación, como
      // Aeropuertos.
      {
        nombre: CM_TITULO_CORTO,
        to: CM_HUB,
        pct: comunicaciones.overall,
        card: {
          to: CM_HUB,
          icon: Headset,
          color: CM_ACENTO,
          titulo: CM_TITULO_CORTO,
          meta: `${CM_LECTURA_TOTAL} lecciones · ${CM_NIVELES.length} niveles`,
          descripcion: "Escuchar, interpretar, confirmar y responder al ATC, de la rampa al océano.",
          fotoHueco: "CM-TEM-01 · 2:1 · 1200×600 · Piloto con auriculares y la mano en el selector de frecuencia",
          cta: ctaDeTema(comunicaciones.overall),
          avance: comunicaciones.overall,
          completo: comunicaciones.overall >= 100,
          estado: comunicaciones.empty
            ? "Sin empezar"
            : comunicaciones.overall >= 100
              ? "Tema completo"
              : `${comunicaciones.lessonRead}/${CM_LECTURA_TOTAL} lecciones · ${comunicaciones.practiceDone}/${CM_PRACTICA_CONTEO} ejercicios`,
        },
      },
      // Psicotécnicas no se "termina": es un banco para entrenar. Lo que hace
      // de avance es el mejor resultado del simulacro, que es lo único que
      // mide de verdad si ya estás listo para el proceso.
      {
        nombre: "Pruebas psicotécnicas",
        to: PSICO_HUB,
        pct: mejorPsico ?? 0,
        card: {
          to: PSICO_HUB,
          icon: Brain,
          // El violeta del tema, en su escalón de texto: el --av-violet-400 a
          // secas no llega a AA sobre blanco. Es el mismo valor que ya usa
          // .chip-violet; la variable se define en el contenedor de la página.
          color: "var(--psico-acento)",
          titulo: "Pruebas psicotécnicas",
          meta: `${PSICO_TOTAL} ejercicios · simulacro de ${SIMULACRO_TOTAL}`,
          descripcion: "Razonamiento abstracto, espacial y numérico, con reloj.",
          foto: psicoPhoto,
          cta: mejorPsico === null ? "Empezar" : "Entrenar",
          avance: mejorPsico ?? 0,
          estado:
            mejorPsico === null
              ? "Sin empezar"
              : `Mejor simulacro: ${mejorPsico}/100`,
        },
      },
      // El cierre del módulo, al estilo del simulacro TEA: la razón para volver
      // cuando ya leíste todo. No se completa, así que va con las herramientas.
      {
        nombre: "Simulacro de entrevista técnica",
        to: "/app/aerolinea/simulacro",
        pct: 0,
        herramienta: true,
        card: {
          to: "/app/aerolinea/simulacro",
          icon: ClipboardCheck,
          titulo: "Simulacro de entrevista técnica",
          // Del propio banco, no de una suma a mano: cuando entró Mercancías
          // Peligrosas esta cifra se quedó anunciando 40 con 45 cargadas.
          meta: `${BANCO_TOTAL} preguntas · 25 por intento`,
          descripcion: "Preguntas de todos los temas, mezcladas, como en la prueba de verdad.",
          foto: simulacroPhoto,
          cta: mejorSimulacro === null ? "Presentar el simulacro" : "Volver a presentarlo",
          estado:
            mejorSimulacro === null
              ? "Sin presentar · baraja en cada intento"
              : mejorSimulacro >= AIRLINE_MOCK_PASS_SCORE
                ? `Mejor puntaje: ${mejorSimulacro}/100 · aprobado`
                : `Mejor puntaje: ${mejorSimulacro}/100 · apruebas con ${AIRLINE_MOCK_PASS_SCORE}`,
        },
      },
      {
        nombre: "Para cuál calificas",
        to: "/app/match",
        pct: 0,
        herramienta: true,
        card: {
          to: "/app/match",
          icon: ClipboardList,
          titulo: "Para cuál calificas",
          meta: "Siempre disponible",
          descripcion:
            "Qué pide cada aerolínea de la región y qué te falta a ti para postular.",
          foto: matchPhoto,
          cta: "Ver mi match",
          estado: "Se calcula con tu Logbook y tu perfil",
        },
      },
    ]

    // Primero lo que está a medias, después lo no empezado y de último lo
    // terminado: la pantalla ordena por lo que te falta hacer, no por el orden
    // en que se publicaron los temas. Las herramientas van al final: no se
    // estudian ni se completan.
    const grupo = (t: TemaEstado) =>
      t.herramienta ? 3 : t.pct >= 100 ? 2 : t.pct > 0 ? 0 : 1
    return lista
      .map((t, i) => ({ t, i }))
      .sort((a, b) => grupo(a.t) - grupo(b.t) || b.t.pct - a.t.pct || a.i - b.i)
      .map(({ t }) => t)
  }, [notam, metar, mercancias, aero, aeropuertos, performance, rac, combustible, comunicaciones, mejorSimulacro, mejorPsico])

  const cursables = temas.filter((t) => !t.herramienta)
  const herramientas = temas.filter((t) => t.herramienta)

  // El único botón primario de la pantalla: retomar donde ibas, o entrar al
  // primero si todavía no empezaste nada. Las herramientas no se retoman.
  const enCurso = cursables.find((t) => t.pct > 0 && t.pct < 100)

  // Para la fila de lo que viene: cuántos temas hay abiertos y por cuál vas. Si
  // empezaste uno, vas por el primero, no por el segundo: el número es cuántos
  // has tocado, con mínimo uno (el que estás a punto de empezar).
  const disponibles = cursables.length
  const temaActual = Math.min(Math.max(1, cursables.filter((t) => t.pct > 0).length), disponibles)
  // La cifra grande del panel: el promedio de los temas abiertos, el mismo
  // cálculo con el que cada portada resume sus partes.
  const avanceGeneral = Math.round(
    cursables.reduce((suma, t) => suma + t.pct, 0) / Math.max(1, disponibles)
  )

  return (
    <>
      {/* `notam-hub` es lo que da el Archivo de las portadas a `.nh-display`.
          `@container`: las rejillas responden al ancho del contenido, no al de
          la ventana. La variable del violeta vive aquí porque solo esta
          pantalla la necesita. */}
      <div className="notam-hub @container px-5 sm:px-8 py-6 sm:py-8 pb-16 max-w-[1600px] mx-auto [--psico-acento:oklch(0.45_0.2_295)] dark:[--psico-acento:var(--av-violet-400)]">
        {/* El hero de las portadas de módulo, en su versión corta: la foto a
            sangre bajo el velo navy, el titular en Archivo, un solo botón y el
            panel de avance dentro, porque «qué es esto» y «cómo voy» son la
            misma pregunta al llegar. Mide lo justo para que la primera fila de
            tarjetas se vea sin bajar. */}
        <section className="relative overflow-hidden rounded-[18px] shadow-[0_1px_2px_rgba(11,27,48,0.08)]">
          <img
            src={heroPhoto}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 27%" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(8,20,36,.92) 0%, rgba(8,20,36,.80) 42%, rgba(8,20,36,.58) 72%, rgba(8,20,36,.42) 100%)",
            }}
          />

          <div className="relative grid gap-6 px-6 py-6 sm:px-10 sm:py-7 @4xl:grid-cols-[minmax(0,1fr)_minmax(0,272px)] @4xl:gap-10">
            <div className="min-w-0 self-center">
              <div className="flex flex-wrap items-center gap-3">
                <span className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7FB2F2]">
                  Módulo
                </span>
                <span className="hidden h-3 w-px bg-white/20 @md:block" aria-hidden />
                <span className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em] text-white/78">
                  {disponibles} temas abiertos
                </span>
              </div>

              <h1 className="nh-display mt-3 text-[32px] font-bold leading-none tracking-[-0.03em] text-white sm:text-[38px] @5xl:text-[44px]">
                Ingreso a aerolínea
              </h1>

              <p className="mt-3 mb-0 max-w-[52ch] text-[15px] leading-[1.55] text-white/80">
                Lo que evalúan las aerolíneas de la región, tema por tema.
              </p>

              {/* El sitio del video que presenta el módulo entero, con la misma
                  tarjeta de hueco que usaban los hubs de tema antes de tener el
                  suyo: miniatura, rótulo y la especificación de lo que falta.
                  Cuando exista el mp4 se cambia por un `VideoIntro` y no se
                  mueve nada alrededor.

                  Aquí había un botón de «Seguir con …». No se reemplaza por
                  otro: la acción de retomar vive en la tarjeta del tema, que ya
                  va marcada «En curso» y es la primera de la rejilla. */}
              <div className="mt-5 flex w-full max-w-[380px] items-center gap-3.5 rounded-[12px] border border-dashed border-white/20 bg-white/[0.05] p-2 pr-4 text-left">
                <span className="grid h-[52px] w-[92px] shrink-0 place-items-center rounded-[8px] border border-dashed border-white/20 bg-white/[0.06]">
                  <Play className="h-4 w-4 text-white/35" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="nh-display block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                    Espacio reservado
                  </span>
                  <span className="mt-1 block text-[13px] font-medium leading-[1.4] text-white/78">
                    IA-VID-01 · Presentación del módulo · ~60 s · con su cartel 16:9
                  </span>
                </span>
              </div>
            </div>

            {/* El mismo panel de cristal de las portadas, sin las filas por
                parte: aquí cada tema ya trae su barra en la tarjeta de abajo, y
                repetirlas duplicaba el hero sin decir nada nuevo. Queda la cifra
                global y por dónde vas en la ruta. */}
            <div className="self-start overflow-hidden rounded-[14px] border border-white/15 bg-[rgba(6,17,31,0.62)] backdrop-blur-[6px] @4xl:self-center">
              <div className="px-3.5 pb-3 pt-3.5">
                <div className="nh-display text-[10px] font-semibold uppercase tracking-[0.16em] text-white/72">
                  Tu avance
                </div>
                {loading ? (
                  <>
                    <div className="mt-2.5 h-6 w-16 animate-pulse rounded bg-white/15" />
                    <div className="mt-3 h-1 animate-pulse rounded-sm bg-white/15" />
                  </>
                ) : (
                  <>
                    <div className="mt-1.5 flex items-baseline gap-2">
                      <span className="nh-display tabular text-[23px] font-bold leading-none text-white">
                        {avanceGeneral}%
                      </span>
                      <span className="text-[11px] text-white/78">de los temas abiertos</span>
                    </div>
                    <div
                      className="mt-3 h-1 overflow-hidden rounded-sm bg-white/15"
                      role="progressbar"
                      aria-valuenow={avanceGeneral}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Avance de Ingreso a aerolínea"
                    >
                      <div
                        className="h-full rounded-sm transition-[width]"
                        style={{ width: `${avanceGeneral}%`, background: "var(--av-green-400)" }}
                      />
                    </div>
                  </>
                )}
                {!sessionLoading && !user && (
                  <p className="mt-2 mb-0 text-[10.5px] leading-[1.5] text-white/72">
                    Inicia sesión para guardar tu avance en la cuenta.
                  </p>
                )}
              </div>

              {/* El pie del panel: por dónde vas en la ruta y cuándo fue la
                  última vez. La fecha solo aparece cuando la base tiene una —
                  sin sesión o sin avance no hay nada que fechar, y una fila
                  vacía diría menos que ninguna. */}
              {(PROXIMOS.length > 0 || fechaDeUltimaActividad(ultimaActividad)) && (
                <dl className="m-0 border-t border-white/10 px-3.5 py-2.5 text-[11.5px] leading-[1.5]">
                  {PROXIMOS.length > 0 && (
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="text-white/72">Tema</dt>
                      <dd className="tabular m-0 font-semibold text-white/85">
                        {temaActual} de {disponibles + PROXIMOS.length}
                      </dd>
                    </div>
                  )}
                  {fechaDeUltimaActividad(ultimaActividad) && (
                    <div className="mt-1 flex items-baseline justify-between gap-3">
                      <dt className="shrink-0 text-white/72">Última actividad</dt>
                      <dd className="m-0 truncate font-semibold text-white/85">
                        {fechaDeUltimaActividad(ultimaActividad)}
                      </dd>
                    </div>
                  )}
                </dl>
              )}
            </div>
          </div>
        </section>

        <section className="mt-8" aria-labelledby="aerolinea-temas">
          <h2 id="aerolinea-temas" className={ROTULO}>
            Temas de estudio
          </h2>

          {/* Cuatro columnas. Cinco se probaron y quedaban demasiado estrechas
              —unos 213 px por tarjeta, con la descripción cortada a nada—, así
              que se paró en cuatro, que es donde la tarjeta todavía se lee.

              Los temas son cinco, o sea que el quinto cae solo en la segunda
              fila. En vez de dejar tres huecos, «En camino» entra en la misma
              rejilla y ocupa las tres celdas que sobran: la fila queda completa
              y con contenido de verdad, que además es su continuación natural
              —los temas que hay, y los que vienen. */}
          <div className="mt-3 grid grid-cols-1 gap-4 @xl:grid-cols-2 @4xl:grid-cols-4">
            {cursables.map((t) => (
              <TarjetaModulo
                key={t.to}
                {...t.card}
                chip={enCurso && t.to === enCurso.to ? "En curso" : undefined}
                cargando={loading}
              />
            ))}

            {/* Borde sólido, no punteado: en esta app el punteado significa
                «hueco por llenar» (los espacios de imagen reservados), y esto
                no es un hueco, es la ruta que viene. */}
            {PROXIMOS.length > 0 && (
              <div className="flex flex-col justify-center gap-3 rounded-2xl border border-border bg-muted/25 p-4 @xl:col-span-2 @4xl:col-span-3">
                <p className="m-0 text-[12.5px] leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">En camino.</span> Se abren en este
                  orden, cada uno cuando está completo:
                </p>
                <ol className="m-0 flex list-none flex-wrap gap-2 p-0">
                  {PROXIMOS.map((p, i) => (
                    <li
                      key={p}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 text-[12.5px] text-muted-foreground"
                    >
                      <span className="tabular text-[11px] font-semibold text-foreground/70">
                        {disponibles + i + 1}
                      </span>
                      {p}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

        </section>

        <section className="mt-10" aria-labelledby="aerolinea-herramientas">
          <h2 id="aerolinea-herramientas" className={ROTULO}>
            Herramientas
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-4 @3xl:grid-cols-2">
            {herramientas.map((t) => (
              <TarjetaModulo key={t.to} {...t.card} orientacion="horizontal" cargando={loading} />
            ))}
          </div>
        </section>

        {/* Lo que sí puedes adelantar hoy: en una franja, no en un bloque. */}
        <section className="mt-10 flex flex-col gap-3 rounded-xl surface px-5 py-4 @3xl:flex-row @3xl:items-center @3xl:justify-between @3xl:gap-6">
          <div className="min-w-0">
            <h2 className="m-0 text-[15px] font-semibold">Mientras tanto</h2>
            <p className="mt-0.5 mb-0 max-w-[64ch] text-[13px] leading-relaxed text-muted-foreground">
              Tu Logbook y tus vencimientos alimentan el Pilot ID con el que vas a postular, y
              afinan tu match por aerolínea.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Link to="/app/logbook" className={appButtonClass({ variant: "secondary" })}>
              Mi Logbook <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link to="/app/vencimientos" className={appButtonClass({ variant: "secondary" })}>
              Mis vencimientos <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}

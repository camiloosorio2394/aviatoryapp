import { useMemo, useState } from "react"
import { LectorLeccion, type LectorModulo } from "@/components/lesson/LectorLeccion"
import { readLocalProgress, writeLocalProgress } from "@/lib/notamComun"
import {
  fetchNotamProgress,
  markNotamProgress,
  pushPendingLocalProgress,
} from "@/lib/notamProgress"
import { LESSON_SCREENS } from "@/lib/notamLesson"

/**
 * Lección NOTAM. El lector es el genérico (LectorLeccion): aquí solo se dice
 * qué lecciones son, dónde se guarda el progreso y quién pinta el
 * decodificador, que es la única pieza interactiva propia del tema.
 *
 * Ruta: /app/aerolinea/notam/aprende?l=1
 */
const MODULO: LectorModulo = {
  tema: "lector-notam",
  nombre: "NOTAM",
  rotulo: "NOTAM · Módulo",
  hub: "/app/aerolinea/notam",
  practica: "/app/aerolinea/notam/practica",
  evaluacion: "/app/aerolinea/notam/evaluacion",
  portadas: "/modulos/notam",
  actividad: "notam-leccion",
  lecciones: LESSON_SCREENS,
  alFinal: "/app/aerolinea/notam/practica",
  textoFinal: "Práctica y evaluación →",
  leerLocal: () => readLocalProgress().lessonScreens,
  escribirLocal: (ns) => {
    writeLocalProgress({ lessonScreens: ns })
  },
  marcar: (n) => markNotamProgress({ lessonScreen: n }),
  hidratar: async (uid) => {
    const fetched = await fetchNotamProgress(uid)
    if (!fetched) return null
    const remote = await pushPendingLocalProgress(fetched)
    return remote.lessonScreens
  },
  interactivo: (nombre) => (nombre === "notam-decodificador" ? <Decodificador /> : null),
}

export function NotamLesson() {
  return <LectorLeccion modulo={MODULO} />
}

// ─── Decodificador interactivo ───────────────────────────────────────────────

interface Casilla {
  clave: string
  codigo: string
  rotulo: string
  /** La lectura de la casilla, en negrita: es lo que hay que retener. */
  titulo: string
  /** Lo que hace falta saber además del titular. Opcional a propósito. */
  detalle?: string
}

/**
 * Ejemplo didáctico con formato OACI completo (las casillas Q a G). No es un
 * aviso vigente y la pieza lo dice en pantalla: el resumen colombiano no trae
 * la línea Q, y justamente por eso el ejemplo completo se construye aparte.
 */
const NOTAM_DEMO: { cabecera: string; casillas: Casilla[]; aviso: string } = {
  cabecera: "A2451/26 NOTAMN",
  casillas: [
    {
      clave: "Q",
      codigo: "Q) SKED/QMRLC/IV/NBO/A/000/999/0442N07409W005",
      rotulo: "Q) calificador: QMRLC, pista cerrada",
      titulo: "Información codificada",
      detalle:
        "Esta línea resume el tipo de información del NOTAM. En este caso, QMRLC indica que se trata del cierre de una pista y especifica el tipo de tráfico y el área a la que aplica. En las siguientes secciones desglosaremos la línea Q letra por letra para entender qué información contiene.",
    },
    {
      clave: "A",
      codigo: "A) SKBO",
      rotulo: "A) aeródromo: SKBO",
      titulo: "Aeródromo afectado: SKBO, Bogotá/El Dorado.",
    },
    {
      clave: "B",
      codigo: "B) 2608010600",
      rotulo: "B) inicio de vigencia",
      titulo: "Inicio de vigencia: 01 AGO 2026, 06:00 UTC.",
      detalle: "Es el momento a partir del cual la información del NOTAM entra en vigor.",
    },
    {
      clave: "C",
      codigo: "C) 2608012359",
      rotulo: "C) fin de vigencia",
      titulo: "Fin de vigencia: 01 AGO 2026, 23:59 UTC.",
      detalle: "Hasta esta fecha y hora está prevista la condición indicada en el NOTAM.",
    },
    {
      clave: "E",
      codigo: "E) RWY 13L/31R CLSD DUE WIP",
      rotulo: "E) texto llano de la condición",
      titulo: "Información: RWY 13L/31R CLSD DUE WIP",
      detalle:
        "La pista 13L/31R está cerrada debido a trabajos en curso (WIP, Work In Progress).",
    },
    {
      clave: "F",
      codigo: "F) SFC  G) UNL",
      rotulo: "F/G) límites verticales",
      titulo: "Límites verticales: desde la superficie (SFC) hasta ilimitado (UNL).",
      detalle: "Indica el límite vertical de la información publicada.",
    },
  ],
  aviso:
    "Las horas de los NOTAM se expresan en UTC. Antes de utilizar la información, verifica siempre que el período de vigencia coincida con tu operación.",
}

/** La lectura de una casilla: el titular en negrita y el detalle debajo. */
function LecturaCasilla({ casilla, tono }: { casilla: Casilla; tono?: string }) {
  return (
    <>
      <span className="font-semibold" style={tono ? { color: tono } : undefined}>
        {casilla.titulo}
      </span>
      {casilla.detalle && <span> {casilla.detalle}</span>}
    </>
  )
}

const LINEAS_CODIGO: string[][] = [["Q"], ["A", "B", "C"], ["E"], ["F"]]

function Decodificador() {
  const [activa, setActiva] = useState<string | null>(null)
  const porClave = useMemo(() => new Map(NOTAM_DEMO.casillas.map((c) => [c.clave, c])), [])
  const rotulo = activa ? (porClave.get(activa)?.rotulo ?? "") : "Señala una casilla o su texto"

  return (
    <section aria-label="Decodificador interactivo">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2
          className="ln-display m-0 text-[24px] lg:text-[30px] font-semibold"
          style={{ lineHeight: 1.1, color: "var(--ln-ink)" }}
        >
          Así se ve uno de verdad
        </h2>
        <span className="mono hidden lg:inline text-[11.5px]" style={{ color: "var(--ln-primary)" }} aria-live="polite">
          {rotulo}
        </span>
      </div>

      {/* Escritorio: dos paneles con resaltado cruzado bidireccional */}
      {/* El aviso arriba y las lecturas debajo, no en dos columnas: en una
          columna de 720px el panel de la derecha queda tan angosto que la
          lectura de la casilla Q ocupa once lineas y deja la mitad del bloque
          en negro vacio. El resaltado cruzado se conserva. */}
      <div
        className="mt-4 hidden lg:flex lg:flex-col overflow-hidden rounded-[8px] border"
        style={{ borderColor: "var(--ln-hair-strong)" }}
        onMouseLeave={() => setActiva(null)}
      >
        <div
          className="mono flex flex-col px-[26px] py-6 text-[13.5px]"
          style={{ background: "var(--ln-navy)", lineHeight: 2.1 }}
        >
          <div style={{ color: "var(--ln-navy-dim)" }}>{NOTAM_DEMO.cabecera}</div>
          {LINEAS_CODIGO.map((claves, i) => (
            <div key={i}>
              {claves.map((clave, j) => {
                const c = porClave.get(clave)
                if (!c) return null
                const on = activa === clave
                return (
                  <span key={clave}>
                    {j > 0 && " "}
                    <span
                      role="button"
                      tabIndex={0}
                      onMouseEnter={() => setActiva(clave)}
                      onFocus={() => setActiva(clave)}
                      onBlur={() => setActiva(null)}
                      onClick={() => setActiva(on ? null : clave)}
                      className="cursor-pointer rounded-[3px] px-[5px] py-[3px] transition-colors duration-100"
                      style={{
                        background: on ? "var(--ln-bright)" : "transparent",
                        color: on ? "var(--ln-on-bright)" : "var(--ln-navy-text)",
                        fontWeight: on ? 600 : 400,
                      }}
                    >
                      {c.codigo}
                    </span>
                  </span>
                )
              })}
            </div>
          ))}
        </div>

        <div style={{ background: "var(--ln-paper)", borderTop: "1px solid var(--ln-hair-strong)" }}>
          {NOTAM_DEMO.casillas.map((c, i) => {
            const on = activa === c.clave
            return (
              <div
                key={c.clave}
                onMouseEnter={() => setActiva(c.clave)}
                onClick={() => setActiva(on ? null : c.clave)}
                className="grid grid-cols-[46px_1fr] gap-3 px-[18px] py-[11px] transition-colors duration-100"
                style={{
                  background: on ? "var(--ln-tint)" : "transparent",
                  borderBottom: i < NOTAM_DEMO.casillas.length - 1 ? "1px solid var(--ln-row-rule)" : "none",
                  cursor: "default",
                }}
              >
                <span className="mono text-[12.5px] font-semibold" style={{ color: "var(--ln-primary)" }}>
                  {c.clave === "F" ? "F/G)" : `${c.clave})`}
                </span>
                <span className="text-[14px] leading-[1.5]" style={{ color: "var(--ln-body)" }}>
                  <LecturaCasilla casilla={c} tono="var(--ln-ink)" />
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Móvil: código arriba y fichas apiladas, sin scroll horizontal */}
      <div className="mt-4 flex flex-col gap-2.5 lg:hidden">
        <div
          className="mono rounded-[6px] px-4 py-3.5 text-[11.5px]"
          style={{ background: "var(--ln-navy)", color: "var(--ln-navy-text)", lineHeight: 1.85 }}
        >
          <div style={{ color: "var(--ln-navy-dim)" }}>{NOTAM_DEMO.cabecera}</div>
          {NOTAM_DEMO.casillas.map((c) => (
            <div key={c.clave} className="break-words">
              {c.codigo}
            </div>
          ))}
        </div>
        {NOTAM_DEMO.casillas.map((c) => {
          const precaucion = c.clave === "E"
          return (
            <div
              key={c.clave}
              className="px-3.5 py-3"
              style={{
                background: precaucion ? "var(--ln-caution-bg)" : "var(--ln-sunk)",
                borderLeft: `3px solid ${precaucion ? "var(--ln-caution)" : "var(--ln-primary)"}`,
                borderRadius: "0 6px 6px 0",
              }}
            >
              <div
                className="mono text-[11.5px] font-semibold"
                style={{ color: precaucion ? "var(--ln-caution)" : "var(--ln-primary)" }}
              >
                {c.codigo}
              </div>
              <div
                className="mt-1 text-[14px] leading-[1.5]"
                style={{ color: precaucion ? "var(--ln-caution-ink)" : "var(--ln-body)" }}
              >
                <LecturaCasilla casilla={c} />
              </div>
            </div>
          )
        })}
      </div>

      <div
        className="mt-3.5 px-3.5 py-[11px] text-[13px] leading-[1.55]"
        style={{
          background: "var(--ln-caution-bg)",
          borderLeft: "3px solid var(--ln-caution)",
          color: "var(--ln-caution-ink)",
        }}
      >
        {NOTAM_DEMO.aviso}
      </div>
      <p className="mono mt-2.5 mb-0 text-[11px]" style={{ color: "var(--ln-faint)" }}>
        Ejemplo didáctico con formato OACI completo. No es un aviso vigente.
      </p>
    </section>
  )
}

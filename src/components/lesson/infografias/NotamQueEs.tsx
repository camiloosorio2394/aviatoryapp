import { InfografiaCanvas } from "@/components/lesson/InfografiaCanvas"

/**
 * Infografía "¿Qué es un NOTAM?", diseñada en Claude Design y portada a código.
 *
 * Es un lienzo fijo de 1687x1125 con maquetación absoluta, tal cual el diseño.
 * No reflowea a propósito: se ve en el visor de carta, que la ajusta al ancho y
 * deja acercarla. Ver InfografiaCanvas para el porqué.
 *
 * Lo único raster son las ilustraciones (24 piezas, WebP, 400 KB en total
 * contra los 2,1 MB que pesaban en PNG). Todo el texto es texto de verdad: se
 * mantiene nítido a cualquier zoom, lo lee un lector de pantalla y se puede
 * corregir una palabra sin rehacer una imagen.
 *
 * La hoja es clara en los dos temas, como `.doc-sheet`.
 */

const A = "/infografias/notam"

/** Punto de la lista de propósito. */
function Punto({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, height: 32 }}>
      <img src={`${A}/p1-ic-check.webp`} alt="" style={{ width: 32, height: 32, flex: "none" }} />
      <span style={{ fontSize: 18.5, whiteSpace: "nowrap", color: "#1E2A38" }}>{children}</span>
    </div>
  )
}

/** Columna de la banda de categorías. */
function Categoria({
  icono,
  titulo,
  texto,
  primera,
}: {
  icono: string
  titulo: string
  texto: string
  primera?: boolean
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 7px",
        borderLeft: primera ? undefined : "1px solid #e0e5ea",
      }}
    >
      <img src={`${A}/${icono}.webp`} alt="" style={{ width: 97, height: 97 }} />
      <div
        style={{
          marginTop: 8,
          fontSize: 19.5,
          fontWeight: 800,
          color: "#12305F",
          textAlign: "center",
          lineHeight: 1.22,
          textWrap: "balance",
        }}
      >
        {titulo}
      </div>
      <div
        style={{
          marginTop: 9,
          fontSize: 16,
          color: "#26313E",
          textAlign: "center",
          lineHeight: 1.45,
          textWrap: "pretty",
        }}
      >
        {texto}
      </div>
    </div>
  )
}

const CATEGORIAS: { icono: string; titulo: string; texto: string }[] = [
  {
    icono: "p1-ic-road",
    titulo: "PISTAS Y CALLES DE RODAJE",
    texto: "Cierres, limitaciones, condiciones de superficie o cambios temporales.",
  },
  {
    icono: "p1-ic-navaid",
    titulo: "AYUDAS A LA NAVEGACIÓN",
    texto: "Fuera de servicio, operando con limitaciones o cambios en la cobertura.",
  },
  {
    icono: "p1-ic-work",
    titulo: "OBSTÁCULOS Y CONSTRUCCIONES",
    texto: "Nuevos obstáculos, grúas, antenas o trabajos cercanos a áreas de vuelo.",
  },
  {
    icono: "p1-ic-airspace",
    titulo: "ESPACIO AÉREO RESTRINGIDO",
    texto: "Áreas peligrosas, militares o restringidas de uso temporal.",
  },
  {
    icono: "p1-ic-weather",
    titulo: "CONDICIONES ESPECIALES",
    texto: "Eventos, actividades o situaciones que pueden afectar las operaciones.",
  },
  {
    icono: "p1-ic-mega",
    titulo: "OTRA INFORMACIÓN IMPORTANTE",
    texto: "Cambios en servicios, procedimientos o instalaciones del aeropuerto.",
  },
]

export function NotamQueEs() {
  return (
    <InfografiaCanvas width={1687} height={1125} label="¿Qué es un NOTAM? Infografía del curso">
      <div
        style={{
          position: "relative",
          width: 1687,
          height: 1125,
          background: "#ffffff",
          overflow: "hidden",
          fontFamily: "'Roboto', Inter, Helvetica, Arial, sans-serif",
        }}
      >
        <img
          src={`${A}/p1-photo.webp`}
          alt=""
          style={{
            position: "absolute",
            left: 630,
            top: 0,
            width: 1057,
            height: 712,
            WebkitMaskImage:
              "linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 26px)",
            maskImage: "linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 26px)",
          }}
        />

        <div style={{ position: "absolute", left: 51, top: 22, width: 286, height: 3, background: "#E9A63A" }} />
        <div
          style={{
            position: "absolute",
            left: 45,
            top: 34,
            fontFamily: "'Archivo', Inter, sans-serif",
            whiteSpace: "nowrap",
            fontSize: 69,
            fontWeight: 800,
            letterSpacing: "-1.2px",
            color: "#12305F",
            lineHeight: 1,
          }}
        >
          ¿QUÉ ES UN NOTAM?
        </div>

        <div
          style={{
            position: "absolute",
            left: 34,
            top: 146,
            width: 718,
            height: 148,
            background: "#001E47",
            borderRadius: 14,
            padding: "20px 26px",
            color: "#ffffff",
            fontSize: 22.5,
            lineHeight: "36px",
          }}
        >
          Un <span style={{ color: "#F5B830", fontWeight: 700 }}>NOTAM (Notice to Airmen)</span> es
          un aviso que contiene información sobre condiciones que pueden afectar la seguridad,
          eficiencia o regularidad de las operaciones aéreas.
        </div>

        <img
          src={`${A}/p1-ic-target.webp`}
          alt=""
          style={{ position: "absolute", left: 50, top: 326, width: 44, height: 44 }}
        />
        <div
          style={{
            position: "absolute",
            left: 100,
            top: 332,
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: ".4px",
            color: "#1C4E9C",
          }}
        >
          PROPÓSITO
        </div>

        <div
          style={{
            position: "absolute",
            left: 54,
            top: 386,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            width: 706,
          }}
        >
          <Punto>Informar cambios, restricciones o condiciones fuera de lo normal.</Punto>
          <Punto>Prevenir riesgos para las aeronaves y el personal.</Punto>
          <Punto>Permitir una toma de decisiones segura y oportuna.</Punto>
          <Punto>Complementar la información de cartas aeronáuticas y publicaciones.</Punto>
        </div>

        <div style={{ position: "absolute", left: 51, top: 616, width: 570, height: 1, background: "#dfe3e8" }} />

        <div
          style={{
            position: "absolute",
            left: 55,
            top: 668,
            width: 992,
            height: 45,
            background: "#001E47",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 56,
          }}
        >
          <span
            style={{
              whiteSpace: "nowrap",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: ".4px",
              color: "#ffffff",
            }}
          >
            LOS NOTAMS PROPORCIONAN INFORMACIÓN TEMPORAL Y ESENCIAL COMO:
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            left: 25,
            top: 736,
            width: 1297,
            height: 246,
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
          }}
        >
          {CATEGORIAS.map((c, i) => (
            <Categoria key={c.icono} {...c} primera={i === 0} />
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            left: 1346,
            top: 700,
            width: 337,
            height: 301,
            background: "#E7EFF9",
            borderRadius: 12,
          }}
        >
          <div style={{ textAlign: "center", marginTop: 26, fontSize: 24, fontWeight: 800, color: "#1C4E9C" }}>
            ¿QUIÉN LOS EMITE?
          </div>
          <img
            src={`${A}/p1-ic-tower.webp`}
            alt=""
            style={{ position: "absolute", left: 26, top: 112, width: 74, height: 92 }}
          />
          <div
            style={{
              position: "absolute",
              left: 114,
              top: 116,
              width: 200,
              fontSize: 17,
              lineHeight: 1.55,
              color: "#26313E",
            }}
          >
            La autoridad aeronáutica del país a través de los Servicios de Información Aeronáutica
            (AIS).
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 34,
            top: 1016,
            width: 1620,
            height: 96,
            background: "#001E47",
            borderRadius: 22,
          }}
        >
          <img
            src={`${A}/p1-ic-pilot.webp`}
            alt=""
            style={{ position: "absolute", left: 168, top: 8, width: 80, height: 80 }}
          />
          <div
            style={{
              position: "absolute",
              left: 284,
              top: 33,
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: ".5px",
              color: "#F2B233",
            }}
          >
            RECUERDA
          </div>
          <div
            style={{
              position: "absolute",
              left: 416,
              top: 14,
              width: 2,
              height: 68,
              background: "rgba(255,255,255,.4)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 437,
              top: 23,
              width: 800,
              fontSize: 21,
              lineHeight: "32px",
              color: "#ffffff",
            }}
          >
            Siempre revisa los NOTAMs antes de cada vuelo y hasta el momento de la salida.
            <br />
            La información puede cambiar en cualquier momento.
          </div>
          <img
            src={`${A}/p1-plane.webp`}
            alt=""
            style={{ position: "absolute", left: 1191, top: 14, width: 290, height: 80 }}
          />
        </div>
      </div>
    </InfografiaCanvas>
  )
}

import { Aviso, Dato, Entradilla, F, P, Subtitulo, Tabla, Titular } from "../piezas"

/**
 * 01 · De dónde sale la norma.
 *
 * Cuatro documentos y quién manda sobre quién. En entrevista lo preguntan
 * porque separa al que estudió del que oyó nombrar la IATA DGR.
 */
export function Seccion01() {
  return (
    <>
      <Titular n="01">De dónde sale la norma</Titular>

      <Entradilla>
        Cuatro documentos, y no dicen lo mismo ni tienen el mismo peso. Saber cuál es norma y cuál
        es herramienta de trabajo es la mitad de la respuesta cuando te preguntan por el marco
        normativo.
      </Entradilla>

      <Tabla
        cabeceras={["Documento", "Quién lo emite", "Para qué sirve"]}
        filas={[
          [
            <F>Anexo 18</F>,
            "OACI",
            "La norma marco: el transporte sin riesgos de mercancías peligrosas por vía aérea.",
          ],
          [
            <>
              <F>Doc 9284</F>
              <br />
              Instrucciones Técnicas
            </>,
            "OACI",
            "El cómo detallado: clasificación, embalaje, marcado y la lista de números ONU. Se reedita cada dos años.",
          ],
          [
            <F>IATA DGR</F>,
            "IATA",
            "El manual operativo de la industria. Más estricto y más práctico, alineado con el Doc 9284. Anual.",
          ],
          [
            <F>RAC 175</F>,
            "Aerocivil (Colombia)",
            "El reglamento nacional: adopta el Anexo 18 y remite a las Instrucciones Técnicas.",
          ],
        ]}
      />

      <Aviso tono="info" titulo="La regla de oro">
        El <F>RAC 175</F> y el <F>Doc 9284</F> son la norma. La <F>IATA DGR</F> es la herramienta
        de trabajo diaria. Ante conflicto, prevalece la norma vigente.
      </Aviso>

      <Subtitulo>Por qué existe todo esto</Subtitulo>

      <P>
        En vuelo no hay bomberos ni forma de aterrizar de inmediato. Una mercancía mal declarada o
        mal estibada puede escalar a un incendio o a la pérdida de la aeronave en minutos. Por eso
        el sistema entero se apoya en hacer bien cinco cosas <F>antes</F> del vuelo: clasificar,
        embalar, marcar, documentar y segregar.
      </P>

      <Subtitulo>Dos casos que lo explican</Subtitulo>

      <Tabla
        cabeceras={["Caso", "Qué ocurrió", "Lección"]}
        filas={[
          [
            <F>ValuJet 592 (1996)</F>,
            "Generadores químicos de oxígeno mal declarados y sin tapas de seguridad, en bodega, provocaron un incendio incontrolable.",
            "Declarar y embalar bien no es papeleo.",
          ],
          [
            <F>UPS 6, Dubái (2010)</F>,
            "Una carga grande de baterías de litio se incendió; el humo y el fuego en cabina llevaron a la pérdida de la aeronave.",
            "El litio es un riesgo real y creciente.",
          ],
        ]}
      />

      <Aviso tono="info" titulo="Para la entrevista">
        Si te preguntan por qué le importan a un piloto las mercancías peligrosas si no las
        embala, la respuesta es que el comandante es el último filtro de seguridad: firma la
        información de mercancías peligrosas, decide ante una emergencia y responde por la
        seguridad del vuelo. Y si te piden citar, cita bien: <Dato>Anexo 18</Dato>{" "}
        <Dato>Doc 9284</Dato> <Dato>RAC 175</Dato>.
      </Aviso>
    </>
  )
}

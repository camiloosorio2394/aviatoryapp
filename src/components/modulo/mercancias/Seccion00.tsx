import { Aviso, Cifra, Entradilla, F, Lista, P, Panel, Subtitulo, Titular } from "../piezas"

/**
 * 00 · Briefing del módulo.
 *
 * Abre con la advertencia de vigencia completa, y va aquí y no al pie: el
 * material sale de la Edición Original del RAC 175 (marzo 2016, Resolución
 * 00478), que ha tenido enmiendas. Un piloto no puede salir de este módulo
 * creyendo que un límite que leyó es el vigente.
 */
export function Seccion00() {
  return (
    <>
      <Titular n="00">Briefing del módulo</Titular>

      <Entradilla>
        Qué son las mercancías peligrosas, cómo se clasifican, qué responde el comandante por
        ellas y qué se hace cuando algo sale mal en vuelo. Está armado para dos cosas a la vez:
        la operación en línea y la entrevista técnica de ingreso a una aerolínea.
      </Entradilla>

      <Aviso tono="ojo" titulo="Verifica siempre la edición vigente">
        <Lista
          items={[
            <>
              <F>RAC 175</F>: el material sale de la Edición Original, de marzo de 2016
              (Resolución 00478). Ha tenido enmiendas posteriores.
            </>,
            <>
              <F>Doc 9284 de OACI</F>, las Instrucciones Técnicas: se reedita cada dos años.
            </>,
            <>
              <F>IATA DGR</F>: se publica cada año.
            </>,
            <>
              <F>Tu explotador manda sobre esto</F>: cada aerolínea fija condiciones propias en
              su Manual de Operaciones y en su manual de mercancías peligrosas.
            </>,
          ]}
        />
        <p className="m-0 mt-3">
          Los límites y listados que veas aquí son para estudiar, no para aplicar en línea de
          vuelo. Antes de usar una cifra, confirma la edición en vigor.
        </p>
      </Aviso>

      <Subtitulo>Qué vas a encontrar</Subtitulo>

      <div className="grid gap-3 sm:grid-cols-3">
        <Cifra valor="9" rotulo="Clases de riesgo" nota="Con sus divisiones, 16 etiquetas" />
        <Cifra valor="9" rotulo="Secciones de lectura" nota="De la norma a la emergencia" />
        <Cifra valor="2" rotulo="Pruebas" nota="Práctica de clasificación y chequeo" />
      </div>

      <P>
        El módulo prioriza lo que un piloto usa de verdad: qué son, cómo se clasifican, qué
        responsabilidad tiene, qué llevan y qué no llevan los pasajeros, las baterías de litio,
        el NOTOC y la respuesta ante una emergencia.
      </P>

      <Panel titulo="Lo que este módulo no es">
        <P>
          No sustituye el curso formal de mercancías peligrosas ni los manuales de tu explotador.
          Para transportar mercancías peligrosas hace falta la formación acreditada que exige la
          norma; esto es preparación y repaso.
        </P>
      </Panel>

      <Aviso tono="info" titulo="Para la entrevista">
        En una entrevista técnica no buscan un experto en embalaje: buscan un piloto que entienda
        el riesgo, conozca sus responsabilidades y sepa reaccionar. Si dominas el NOTOC, las nueve
        clases y las baterías de litio, respondes con soltura casi cualquier pregunta del tema.
      </Aviso>
    </>
  )
}

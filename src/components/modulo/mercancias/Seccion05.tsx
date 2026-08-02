import { Aviso, Dato, Entradilla, F, P, Subtitulo, Tabla, Titular } from "../piezas"
import { Rombo } from "./Rombo"

/**
 * 05 · Marcas, etiquetas y documentos.
 *
 * Cómo se identifica una mercancía peligrosa (los cinco datos), qué documentos
 * la acompañan y cómo se lee una fila de la lista de la IATA DGR. Cierra con el
 * ejemplo trabajado del UN 3480, que es el que se pregunta.
 */
export function Seccion05() {
  return (
    <>
      <Titular n="05">Marcas, etiquetas y documentos</Titular>

      <Entradilla>
        Una mercancía peligrosa no se identifica por su nombre comercial sino por sus propiedades.
        Un teléfono es inocuo; su batería de litio sí es mercancía peligrosa. Estos cinco datos
        son los que la definen en el transporte.
      </Entradilla>

      <Tabla
        cabeceras={["Elemento", "Qué es", "Ejemplo"]}
        filas={[
          [
            <F>Número ONU (UN)</F>,
            "Identificador de cuatro dígitos de la sustancia.",
            <Dato>UN 1263</Dato>,
          ],
          [
            <F>Designación oficial (PSN)</F>,
            "El nombre técnico de transporte, Proper Shipping Name.",
            <Dato>Paint</Dato>,
          ],
          [
            <F>Clase o división</F>,
            "El tipo de riesgo principal, del 1 al 9.",
            "Clase 3, líquido inflamable",
          ],
          [
            <F>Grupo de embalaje</F>,
            "El grado de peligro: I alto, II medio, III menor.",
            <Dato>II</Dato>,
          ],
          [
            <F>Etiqueta o rótulo</F>,
            "El rombo de color que muestra el riesgo.",
            <span className="inline-flex items-center gap-2">
              <Rombo id="3" tam={30} etiqueta="Etiqueta de líquido inflamable" />
              Llama sobre rojo
            </span>,
          ],
        ]}
      />

      <Subtitulo>Los dos documentos</Subtitulo>

      <Tabla
        cabeceras={["Documento", "Qué es", "Quién lo genera"]}
        filas={[
          [
            <F>Declaración del expedidor</F>,
            "El remitente declara qué contiene el envío (UN, designación, clase, grupo de embalaje y cantidad) y certifica que va clasificado, embalado, marcado y etiquetado según la norma.",
            "Expedidor",
          ],
          [
            <F>NOTOC</F>,
            "La información escrita al comandante con las mercancías peligrosas que van a bordo (RAC 175.515).",
            "Explotador o agente de rampa",
          ],
        ]}
      />

      <Aviso tono="info" titulo="Cómo se relacionan">
        La declaración del expedidor es la <F>fuente</F>; el NOTOC se elabora a partir de ella. La
        tripulación compara los dos y confirma que coinciden: mismo UN, misma clase, mismo grupo
        de embalaje, misma cantidad y misma posición.
      </Aviso>

      <Subtitulo>Leer una fila de la lista de la IATA DGR</Subtitulo>

      <P>
        La lista de mercancías peligrosas es la tabla maestra: cada sustancia es una fila con
        columnas que definen cómo puede viajar. El piloto no la llena, pero saber leerla es lo que
        le permite comprobar que el NOTOC es coherente.
      </P>

      <Tabla
        cabeceras={["Columna", "Qué indica"]}
        filas={[
          [<F>N° ONU / ID</F>, "El identificador de la sustancia."],
          [<F>Designación (PSN)</F>, "El nombre oficial de transporte."],
          [<F>Clase o división</F>, "El riesgo principal."],
          [<F>Riesgo secundario</F>, "El peligro adicional, si lo hay."],
          [<F>Grupo de embalaje</F>, "I, II o III."],
          [<F>Etiquetas</F>, "Los rótulos que debe llevar el bulto."],
          [<F>EQ</F>, "Código de cantidad exceptuada, de E0 a E5."],
          [
            <F>Avión de pasajeros</F>,
            "Instrucción de embalaje y cantidad neta máxima por bulto. Si dice prohibido, no viaja con pasajeros.",
          ],
          [<F>Avión de carga</F>, "Instrucción y cantidad máxima solo en aeronave de carga."],
          [<F>Disposiciones especiales</F>, "Códigos que empiezan por A, con condiciones extra."],
          [<F>Código ERG</F>, "La guía de respuesta a emergencia que aplica."],
        ]}
      />

      <Subtitulo>Ejemplo trabajado: UN 3480</Subtitulo>

      <div
        className="rounded-xl p-4 sm:p-5"
        style={{
          background: "var(--mod-panel)",
          border: "1px solid var(--mod-line)",
          borderLeft: "3px solid #2C3440",
        }}
      >
        <div className="flex items-start gap-4">
          <Rombo id="9" tam={56} etiqueta="Etiqueta de clase 9" />
          <div className="min-w-0">
            <div className="mod-eyebrow">Fila de la lista</div>
            <h3
              className="m-0 mt-0.5 text-[17px] font-bold"
              style={{ fontFamily: "var(--mod-display)", color: "var(--mod-title)" }}
            >
              UN 3480 · Baterías de ión litio
            </h3>
            <p className="m-0 mt-1 text-[13.5px]" style={{ color: "var(--mod-muted)" }}>
              Transportadas solas, como carga.
            </p>
          </div>
        </div>

        <div className="mt-4">
          <Tabla
            cabeceras={["Columna", "Valor"]}
            filas={[
              [<F>Clase</F>, "9, mercancías peligrosas varias"],
              [<F>Grupo de embalaje</F>, "No lleva"],
              [<F>Etiquetas</F>, "Clase 9 de litio, más la marca de batería de litio"],
              [
                <F>Avión de pasajeros</F>,
                <span style={{ color: "var(--mod-no-fg)", fontWeight: 600 }}>Prohibido</span>,
              ],
              [
                <F>Avión de carga</F>,
                <>
                  <Dato>PI 965</Dato>, con estado de carga no mayor al 30 %
                </>,
              ],
            ]}
          />
        </div>

        <p className="m-0 mt-3 text-[13.5px] leading-[1.6]" style={{ color: "var(--mod-ink)" }}>
          <F>PI</F> es la instrucción de embalaje, Packing Instruction. <F>CAO</F> es Cargo
          Aircraft Only, solo aeronave de carga. Los números de instrucción, los límites y las
          disposiciones cambian con cada edición: este ejemplo es para aprender a leer la fila, no
          para aplicarlo.
        </p>
      </div>

      <Aviso tono="permitido" titulo="Y así se verifica contra el NOTOC">
        El NOTOC de ese envío mostraría <Dato>UN 3480</Dato>, clase 9, <Dato>PI 965</Dato> y el
        indicador de solo aeronave de carga. El comandante confirma que la aeronave es
        exclusivamente de carga, que el UN y la instrucción coinciden entre la declaración del
        expedidor, el NOTOC y la lista, y que el bulto lleva la marca de batería de litio. Si todo
        coincide, la documentación es coherente.
      </Aviso>
    </>
  )
}

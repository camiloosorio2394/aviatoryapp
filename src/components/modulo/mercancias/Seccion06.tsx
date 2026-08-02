import { Aviso, Banda, Dato, Entradilla, F, Lista, P, Subtitulo, Tabla, Titular } from "../piezas"

/**
 * 06 · Información al piloto al mando.
 *
 * El NOTOC y las responsabilidades del comandante. Es la sección que más
 * rinde en entrevista: casi todas las preguntas del tema terminan aquí.
 */
export function Seccion06() {
  return (
    <>
      <Titular n="06">Información al piloto al mando</Titular>

      <Entradilla>
        El comandante no clasifica ni embala, pero responde por la operación segura del vuelo.
        Estas son sus obligaciones concretas frente a las mercancías peligrosas, y el documento
        por el que pasan casi todas.
      </Entradilla>

      <Subtitulo>Qué le toca al comandante</Subtitulo>

      <Tabla
        cabeceras={["Momento", "Responsabilidad"]}
        filas={[
          [
            <F>Antes del vuelo</F>,
            <>
              Recibir por escrito y verificar la información de mercancías peligrosas a bordo, y
              firmarla antes de que se transporten (<Dato>RAC 175.515</Dato>).
            </>,
          ],
          [
            <F>Antes del vuelo</F>,
            "Confirmar que no haya mercancía no permitida en cabina o puesto de pilotaje, y que la carga de solo aeronaves de carga no vaya en una aeronave de pasajeros.",
          ],
          [<F>Durante el vuelo</F>, "Mantener el NOTOC accesible en cabina durante todo el vuelo."],
          [
            <F>En emergencia</F>,
            <>
              Informar cuanto antes al ATC la presencia y la naturaleza de las mercancías
              peligrosas, para que se alerte a los servicios del aeropuerto (
              <Dato>RAC 175.515</Dato>).
            </>,
          ],
          [
            <F>Después</F>,
            "Notificar todo suceso, accidente o hallazgo de mercancías no declaradas, según los procedimientos del explotador y de la autoridad.",
          ],
        ]}
      />

      <Aviso tono="info" titulo="La frase que suma puntos">
        &ldquo;El comandante es la última barrera del sistema: la mercancía ya fue clasificada,
        embalada y documentada, pero yo verifico el NOTOC, decido si acepto el vuelo y gestiono
        cualquier emergencia.&rdquo;
      </Aviso>

      <Subtitulo>Qué revisa la tripulación</Subtitulo>

      <Lista
        items={[
          <>
            <F>Documentos a bordo</F>: NOTOC y declaración del expedidor, presentes y firmados.
          </>,
          <>
            <F>Clase y compatibilidad</F>: a qué clase pertenece, si está permitida en ese tipo de
            aeronave, y si la posición y la segregación son correctas.
          </>,
          <>
            <F>Coherencia de datos</F>: que el UN, la clase, el grupo de embalaje y la cantidad
            coincidan entre la declaración, el NOTOC y la lista.
          </>,
        ]}
      />

      <Subtitulo>El NOTOC, columna por columna</Subtitulo>

      <P>
        El formato es horizontal y cada compañía usa el suyo, pero el bloque de mercancías
        peligrosas trae en general estas columnas.
      </P>

      <Tabla
        cabeceras={["Columna", "Qué indica"]}
        filas={[
          [<Dato>Station of Unloading</Dato>, "Aeropuerto de descarga."],
          [<Dato>AWB No.</Dato>, "Número de guía aérea."],
          [<Dato>No. of Packages</Dato>, "Número de bultos."],
          [<Dato>Proper Shipping Name</Dato>, "La designación oficial de transporte."],
          [<Dato>Class / Division</Dato>, "Clase y división de riesgo."],
          [<Dato>UN Number</Dato>, "El número ONU de la sustancia."],
          [<Dato>Subsidiary Hazard</Dato>, "Los riesgos secundarios, si los hay."],
          [<Dato>Net Quantity</Dato>, "Cantidad neta por bulto, si no es radiactivo."],
          [<Dato>Transport Index</Dato>, "El índice de transporte, si es material radiactivo."],
          [<Dato>Packing Group</Dato>, "Grupo de embalaje: I, II o III."],
          [<Dato>Loading position</Dato>, "La posición de estiba a bordo."],
          [<Dato>ERG code</Dato>, "El código de respuesta a emergencia."],
        ]}
      />

      <Aviso tono="info" titulo="El bloque de carga especial">
        El NOTOC suele traer además un bloque de <F>Special Cargo</F>, que no es mercancía
        peligrosa pero también requiere aviso al comandante: animales vivos, restos humanos o
        carga con requisitos particulares. Lo firma el agente de rampa.
      </Aviso>

      <Banda>
        El comandante lo revisa y lo firma antes del vuelo. Permanece accesible en cabina durante
        todo el vuelo. Una copia queda en tierra, y en vuelo internacional va también en inglés.
      </Banda>
    </>
  )
}

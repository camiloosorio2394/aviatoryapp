import { Aviso, Banda, Dato, Entradilla, F, P, Subtitulo, Tabla, Titular } from "../piezas"

/**
 * 08 · Emergencias y notificación.
 *
 * La secuencia conceptual ante un incidente en vuelo. El procedimiento real es
 * el del QRH y la guía de respuesta del explotador, y eso se dice: aquí se
 * aprende el orden de las decisiones, no se sustituye el manual.
 */
export function Seccion08() {
  return (
    <>
      <Titular n="08">Emergencias y notificación</Titular>

      <Entradilla>
        La respuesta exacta está en el QRH y en la guía de respuesta a emergencias de tu
        explotador. Lo que sigue es el orden de las decisiones, que es lo que se pregunta en
        entrevista y lo que hay que tener claro antes de necesitarlo.
      </Entradilla>

      <Tabla
        cabeceras={["#", "Acción", "Idea clave"]}
        filas={[
          [
            <Dato>1</Dato>,
            <F>Volar primero</F>,
            "Control de la aeronave, oxígeno y máscaras, gestión del humo.",
          ],
          [
            <Dato>2</Dato>,
            <F>Identificar</F>,
            "El NOTOC dice qué sustancia es y dónde está. Por eso va accesible en cabina.",
          ],
          [
            <Dato>3</Dato>,
            <F>Contener</F>,
            "Aplicar el QRH: fuego y humo, ventilación, kit de contención.",
          ],
          [
            <Dato>4</Dato>,
            <F>Declarar</F>,
            <>
              MAYDAY o PAN, e informar al ATC qué mercancía peligrosa hay a bordo (
              <Dato>RAC 175.515</Dato>).
            </>,
          ],
          [<Dato>5</Dato>, <F>Aterrizar</F>, "Desviar al aeródromo adecuado más cercano."],
          [
            <Dato>6</Dato>,
            <F>Informar</F>,
            "Pasar los datos de la mercancía a los servicios de emergencia y notificar el suceso.",
          ],
        ]}
      />

      <Aviso tono="info" titulo="Una forma de recordarlo">
        Volar, identificar, contener, declarar, desviar, informar. Primero se vuela; el NOTOC es la
        fuente de información inmediata para todo lo demás.
      </Aviso>

      <Subtitulo>Por qué el aviso al ATC no es opcional</Subtitulo>

      <P>
        Informar la naturaleza de la mercancía cambia lo que encuentra el avión en tierra: qué
        agente extintor traen los bomberos, con qué protección se acercan y cómo evacúan. Un
        aviso tardío convierte una emergencia gestionable en una que se gestiona a ciegas.
      </P>

      <Subtitulo>Y después del vuelo</Subtitulo>

      <P>
        Se notifica todo suceso o accidente con mercancías peligrosas, y también el hallazgo de
        mercancías <F>no declaradas</F> o mal declaradas, aunque no haya pasado nada. Ese reporte
        es el que hace que el sistema encuentre al expedidor que no declaró, y es la parte que más
        se olvida.
      </P>

      <Banda>
        Primero se vuela. El NOTOC dice qué llevas y dónde. El ATC tiene que saberlo cuanto antes.
        Y lo que pasó se notifica, aunque haya terminado bien.
      </Banda>
    </>
  )
}

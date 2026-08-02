import { Aviso, Dato, Entradilla, F, P, Subtitulo, Tabla, Titular } from "../piezas"

/**
 * 03 · Prohibiciones y limitaciones.
 *
 * Permitidas, restringidas y prohibidas, y el corte que de verdad le toca al
 * comandante: "solo aeronaves de carga" nunca viaja con pasajeros.
 *
 * El verde y el rojo son semánticos y aquí es donde entran: permitido y
 * prohibido, no decoración.
 */
export function Seccion03() {
  return (
    <>
      <Titular n="03">Prohibiciones y limitaciones</Titular>

      <Entradilla>
        No todas las mercancías peligrosas se tratan igual. Según la sustancia, la cantidad y el
        tipo de aeronave, la carga puede estar permitida, permitida con condiciones o prohibida
        del todo.
      </Entradilla>

      <div className="grid gap-3 sm:grid-cols-3">
        <Aviso tono="permitido" titulo="Permitidas">
          Se transportan cumpliendo embalaje, marcado, documentación y límites de cantidad.
          <br />
          <span className="opacity-80">Hielo seco declarado, cantidades limitadas.</span>
        </Aviso>
        <Aviso tono="ojo" titulo="Restringidas">
          Solo bajo condiciones especiales: aprobación del explotador, exención de la autoridad o
          &ldquo;solo aeronaves de carga&rdquo;.
          <br />
          <span className="opacity-80">Baterías de litio sueltas de mayor capacidad.</span>
        </Aviso>
        <Aviso tono="prohibido" titulo="Prohibidas">
          Nunca se transportan, por su naturaleza inestable o su riesgo inaceptable.
          <br />
          <span className="opacity-80">Explosivos muy sensibles, sustancias que reaccionan solas.</span>
        </Aviso>
      </div>

      <Subtitulo>Aeronave de pasajeros contra aeronave de carga</Subtitulo>

      <P>
        Es la limitación que más directamente toca al comandante. Un bulto marcado{" "}
        <Dato>Cargo Aircraft Only</Dato>, o &ldquo;solo aeronaves de carga&rdquo;, está permitido
        en una aeronave exclusiva de carga y <F>nunca</F> en una que lleve pasajeros.
      </P>

      <Aviso tono="prohibido" titulo="Esto no se negocia">
        El comandante debe asegurarse de que ningún bulto CAO viaje en un vuelo de pasajeros
        (RAC 175). Si aparece en el NOTOC de un vuelo con pasajeros, la carga no sale.
      </Aviso>

      <Subtitulo>Un ejemplo que se pregunta</Subtitulo>

      <Tabla
        cabeceras={["Sustancia", "Avión de pasajeros", "Avión de carga"]}
        filas={[
          [
            <>
              <F>UN 3480</F>
              <br />
              Baterías de ión litio, solas como carga
            </>,
            <span style={{ color: "var(--mod-no-fg)", fontWeight: 600 }}>Prohibido</span>,
            <>
              Permitido bajo <Dato>PI 965</Dato>, con estado de carga no mayor al 30 %
            </>,
          ],
        ]}
      />

      <P>
        Desde 2016 las baterías de ión litio no se aceptan como carga en aeronaves de pasajeros.
        Ojo con el matiz: eso es para las baterías que viajan <F>solas, como carga</F>. Las que
        van dentro de un equipo, o las que lleva un pasajero en su equipaje de mano, se rigen por
        otras reglas, que están en la sección 07.
      </P>

      <Aviso tono="ojo" titulo="Verifica la edición">
        Los límites, las instrucciones de embalaje y las disposiciones especiales cambian con cada
        edición del Doc 9284 y de la IATA DGR. Las cifras de aquí son para estudiar; antes de
        aplicarlas, confirma la edición en vigor.
      </Aviso>
    </>
  )
}

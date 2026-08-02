import { Aviso, Dato, Entradilla, F, Lista, P, Subtitulo, Tabla, Titular } from "../piezas"
import { Rombo } from "./Rombo"

/** Marca de sí, no o con aprobación, en la tabla de equipaje. */
function Si() {
  return <span style={{ color: "var(--mod-ok-fg)", fontWeight: 700 }}>Sí</span>
}
function No() {
  return <span style={{ color: "var(--mod-no-fg)", fontWeight: 700 }}>No</span>
}
function Aprob() {
  return <span style={{ color: "var(--mod-muted)", fontWeight: 600 }}>Con aprobación</span>
}

/**
 * 07 · Mercancías ocultas y estiba.
 *
 * Las mercancías peligrosas que no vienen declaradas como tales: las que suben
 * en el equipaje de un pasajero. Es donde de verdad aparecen sin avisar, y de
 * ahí sale el tema estrella, las baterías de litio. Cierra con la estiba y la
 * segregación de la carga que sí viene declarada.
 */
export function Seccion07() {
  return (
    <>
      <Titular n="07">Mercancías ocultas y estiba</Titular>

      <Entradilla>
        La carga declarada llega con su documentación. El problema son las que suben sin declarar,
        y casi siempre suben en el equipaje de un pasajero que no sabe que lleva una mercancía
        peligrosa encima.
      </Entradilla>

      <Subtitulo>Qué puede llevar un pasajero</Subtitulo>

      <P>
        Los pasajeros y la tripulación pueden llevar ciertos artículos peligrosos en cantidades
        pequeñas. Esta tabla resume las reglas generales.
      </P>

      <Tabla
        cabeceras={["Artículo", "Bodega", "Cabina", "Condición clave"]}
        filas={[
          [
            <F>Baterías de repuesto y power banks</F>,
            <No />,
            <Si />,
            "Solo en cabina, con los terminales protegidos.",
          ],
          [
            <F>Dispositivos electrónicos con batería</F>,
            <Si />,
            <Si />,
            "Mejor en cabina; si van en bodega, apagados y protegidos.",
          ],
          [
            <F>Cigarrillos electrónicos y vapeadores</F>,
            <No />,
            <Si />,
            "Solo cabina, y prohibido cargarlos a bordo.",
          ],
          [
            <F>Bebidas alcohólicas de 24 a 70 %</F>,
            <Si />,
            <Si />,
            "Hasta 5 litros por persona, en su envase de venta.",
          ],
          [
            <F>Aerosoles y artículos de tocador</F>,
            <Si />,
            <Si />,
            "De uso personal, con límite de cantidad total.",
          ],
          [
            <F>Encendedor o fósforos de seguridad</F>,
            <No />,
            <>1 en la persona</>,
            "Nunca en el equipaje; verificar el tipo permitido.",
          ],
          [
            <F>Oxígeno o gas de uso médico</F>,
            <Aprob />,
            <Aprob />,
            "Requiere aprobación del explotador.",
          ],
          [
            <F>Armas de fuego y munición</F>,
            <Aprob />,
            <No />,
            "Munición limitada, declarada y aprobada.",
          ],
        ]}
      />

      <Aviso tono="ojo" titulo="Esta tabla es para estudiar">
        Los valores exactos (vatios-hora, gramos, litros, número de unidades) salen del Doc 9284
        Parte 8 y de la sección 2.3 de la IATA DGR en su edición vigente, y de la política de tu
        explotador. Aquí están redondeados para aprender la regla, no para aplicarla en mostrador.
      </Aviso>

      <Subtitulo>Baterías de litio, el tema estrella</Subtitulo>

      <div className="flex items-start gap-4">
        <Rombo id="9" tam={52} etiqueta="Etiqueta de clase 9" />
        <P>
          Están en teléfonos, portátiles, power banks, sillas de ruedas y en la carga. Pueden
          entrar en <F>fuga térmica</F>: un cortocircuito o un golpe dispara calor que se
          autoalimenta y produce un fuego difícil de apagar. Son clase 9.
        </P>
      </div>

      <Tabla
        cabeceras={["Tipo", "Se mide en", "Dónde está"]}
        filas={[
          [
            <F>Ion litio, recargable</F>,
            <Dato>Wh</Dato>,
            "Teléfonos, portátiles, power banks, vehículos.",
          ],
          [
            <F>Litio metálico, no recargable</F>,
            <Dato>g de litio</Dato>,
            "Pilas de cámaras, relojes, dispositivos médicos.",
          ],
        ]}
      />

      <Lista
        items={[
          <>
            <F>Repuestos y power banks van solo en cabina</F>, nunca en bodega, con los terminales
            protegidos contra cortocircuito.
          </>,
          <>
            Como referencia general, y verificando la edición vigente: hasta <Dato>100 Wh</Dato>{" "}
            sin aprobación; de <Dato>100 a 160 Wh</Dato> con aprobación del explotador y un máximo
            de dos repuestos; por encima de <Dato>160 Wh</Dato>, solo como carga bajo norma.
          </>,
          <>
            Si un equipaje de mano con un dispositivo se baja a bodega en la puerta, el
            dispositivo debe ir <F>apagado</F>.
          </>,
          <>
            Señal de alerta en cabina: olor, humo, chisporroteo, o un dispositivo muy caliente o
            hinchado.
          </>,
        ]}
      />

      <Aviso tono="ojo" titulo="Si un dispositivo entra en fuga térmica en cabina">
        El concepto es <F>enfriar</F>: agua u otro líquido no inflamable en abundancia, porque lo
        que hay que frenar es el calor que pasa a las celdas vecinas. No lo cubras ni lo muevas
        sin protección. El procedimiento exacto es el del fabricante y el de tu explotador, con el
        kit de contención de a bordo.
      </Aviso>

      <Subtitulo>Estiba y segregación</Subtitulo>

      <P>
        La carga declarada sigue un flujo con responsables distintos en cada paso. El comandante
        entra al final, y es quien firma.
      </P>

      <Tabla
        cabeceras={["Paso", "Qué ocurre", "Quién"]}
        filas={[
          [<F>1. Clasificar</F>, "Asignar UN, designación, clase y grupo de embalaje.", "Expedidor"],
          [<F>2. Embalar y marcar</F>, "Embalaje homologado, marcas y etiquetas correctas.", "Expedidor"],
          [<F>3. Documentar</F>, "Declaración del expedidor, cuando aplica.", "Expedidor"],
          [
            <F>4. Aceptar</F>,
            "Verificación con lista de chequeo e inspección del bulto.",
            "Explotador o agente",
          ],
          [
            <F>5. Cargar y estibar</F>,
            "Segregación, sujeción y posición correcta. Nunca en cabina ni en el puesto de pilotaje.",
            "Explotador",
          ],
          [<F>6. Informar</F>, "Entrega y firma del NOTOC.", "Explotador al comandante"],
        ]}
      />

      <Aviso tono="info" titulo="Por qué existe la segregación">
        Hay clases que no pueden viajar juntas. Un oxidante junto a un inflamable es el ejemplo
        clásico: el oxidante no arde, pero si hay una fuga alimenta el fuego del otro. La
        segregación evita que una fuga ponga en contacto sustancias incompatibles.
      </Aviso>
    </>
  )
}

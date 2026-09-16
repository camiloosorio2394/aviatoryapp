/**
 * La entrevista de aerolínea que cierra cada nivel de Aeropuertos: quince
 * preguntas por nivel, como las hace el evaluador en la entrevista técnica,
 * con la respuesta esperada y lo que había que mencionar.
 *
 * Mismo trato que en Mercancías peligrosas: las lecciones no llevan preguntas
 * adentro, se juntan todas al cierre del nivel para que la sección no se
 * repita en cada lección. Aquí nacieron ya así, escritas y verificadas contra
 * los inventarios del módulo mientras se redactaban las lecciones.
 *
 * Norma: **solo OACI**. Sin citas de artículos ni de numerales, como el resto
 * del módulo: el evaluador pregunta por lo que se ve y por lo que se hace, no
 * por dónde está escrito. Donde una cifra depende de la enmienda vigente, la
 * respuesta lo dice con la fecha de aplicabilidad y no con el numeral.
 *
 * Se pintan en el lector (EntrevistaNivel.tsx) entre la última lección del
 * nivel y la primera del siguiente. No son lecciones: no cuentan para el
 * progreso ni para el logro de lectura.
 */

import type { LectorEntrevista } from "@/components/lesson/EntrevistaNivel"

export const AP_ENTREVISTAS: LectorEntrevista[] = [
  {
    nivel: 1,
    titulo: "Cómo se lee un aeropuerto",
    tras: 4,
    minutes: 12,
    preguntas: [
    {
      nivel: "concepto",
      q: "¿Qué es la franja de pista y qué se admite dentro?",
      respuesta:
        "Es la faja de terreno que envuelve la pista y sus zonas de parada. Se extiende 60 m antes del umbral y, en pista de aproximación de precisión de clave 3 o 4, 140 m a cada lado del eje. La superficie que colinda con la pista queda enrasada, sin escalón. Dentro de la parte protegida no hay objetos fijos, salvo ayudas visuales frangibles.",
      claves: ["60 m antes del umbral", "140 m a cada lado del eje, en precisión", "Enrasada, sin resalto", "Solo ayudas visuales frangibles"],
    },
    {
      nivel: "concepto",
      q: "¿Dónde empieza la RESA y qué longitud tiene?",
      respuesta:
        "Empieza donde termina la franja, no donde termina el pavimento de la pista. El mínimo obligatorio son 90 m y lo recomendado para clave 3 o 4 son 240 m. Su anchura es al menos el doble de la anchura de la pista.",
      claves: ["Arranca al final de la franja", "90 m mínimo", "240 m recomendado", "Anchura de al menos el doble de la pista"],
    },
    {
      nivel: "interpretacion",
      q: "La zona de parada y la zona libre de obstáculos están en el mismo sitio. ¿En qué se diferencian?",
      respuesta:
        "Las dos van pasado el extremo de la pista, pero la zona de parada es pavimento y la zona libre es aire limpio sobre terreno vigilado. La zona de parada tiene la misma anchura que la pista, aguanta un despegue abortado y suma a la ASDA. En pista por instrumentos, la zona libre se extiende 75 m a cada lado del eje prolongado, nunca mide más de la mitad del recorrido de despegue y suma a la TODA.",
      claves: ["Pavimento contra aire", "La zona de parada suma a la ASDA", "La zona libre suma a la TODA", "La zona libre no pasa de la mitad del TORA"],
    },
    {
      nivel: "concepto",
      q: "¿Cuáles son las cuatro distancias declaradas y cómo se publican?",
      respuesta:
        "TORA, TODA, ASDA y LDA. Se calculan y se publican al metro más próximo y para cada dirección de la pista, no para la pista entera. TODA es el TORA más la zona libre de obstáculos y ASDA es el TORA más la zona de parada, en los dos casos si las hay. La LDA es la pista disponible para aterrizar.",
      claves: ["Al metro más próximo", "Por dirección, no por pista", "TODA es TORA más zona libre", "ASDA es TORA más zona de parada"],
    },
    {
      nivel: "situacion",
      q: "La pista no tiene zona de parada ni zona libre de obstáculos, y el umbral está en el extremo. ¿Qué pasa con las cuatro cifras?",
      respuesta:
        "Las cuatro son iguales a la longitud declarada de la pista. No hay nada que sumarle al TORA, así que TODA y ASDA coinciden con él, y como el umbral no está desplazado la LDA también. Aun así se publican las cuatro, y para las dos direcciones.",
      claves: ["Las cuatro coinciden", "No hay nada que sumar", "Umbral en el extremo, LDA completa", "Se publican igual"],
    },
    {
      nivel: "situacion",
      q: "En una cabecera el umbral está desplazado. ¿Qué distancia cambia y en qué dirección?",
      respuesta:
        "Se recorta la LDA de esa cabecera, exactamente en la distancia del desplazamiento. El TORA, la TODA y la ASDA de esa dirección no cambian, porque el tramo anterior al umbral sigue sirviendo para el despegue. Las cuatro distancias de la dirección recíproca tampoco cambian.",
      claves: ["Solo la LDA", "Solo esa cabecera", "La recíproca no se toca", "El tramo previo sigue sirviendo para despegar"],
    },
    {
      nivel: "situacion",
      q: "Ruedas hacia la pista y ves una señal amarilla de cuatro líneas cruzando la calle, con letreros blancos sobre rojo a los dos lados. ¿Qué es y qué haces?",
      respuesta:
        "Es el punto de espera de la pista en patrón A2, y los letreros son de designación de pista. Las dos líneas continuas quedan del lado donde esperas y las dos de trazos miran a la pista. Sin autorización se para ahí: el eje amarillo de la calle se interrumpe justo en esa señal para recordarlo.",
      claves: ["Punto de espera, patrón A2", "Continuas del lado donde paras", "Blanco sobre rojo es instrucción obligatoria", "Sin autorización no se cruza"],
    },
    {
      nivel: "concepto",
      q: "Describe el letrero de distancia de pista restante.",
      respuesta:
        "Es inscripción blanca sobre fondo negro. Va a lo largo de toda la pista, espaciado cada 300 m, paralelo al eje y equidistante de él, siempre por fuera de los bordes del pavimento. Es frangible, va bajo, y todos los letreros de una misma pista son del mismo tamaño. Es un elemento nuevo en la norma OACI desde el 27 de noviembre de 2025.",
      claves: ["Blanco sobre negro", "Cada 300 m", "Por fuera del borde de la pista", "Nuevo desde el 27 de noviembre de 2025"],
    },
    {
      nivel: "situacion",
      q: "La torre te ofrece salir por una intersección. La pista declara 3 800 m de recorrido de despegue y desde esa intersección quedan 2 579 m. ¿Con qué número corres el cálculo?",
      respuesta:
        "Con 2 579 m, que es el recorrido de despegue disponible desde esa intersección. Ese número se confirma en la tabla publicada y en el letrero de la entrada, que es negro sobre amarillo y lleva la cifra en metros con una flecha en el sentido del despegue. No se corre de memoria ni por la pinta que tenga la pista. Si el cálculo no sale con esa cifra, se pide la pista completa.",
      claves: ["2 579 m, no 3 800", "Confirmarlo en lo publicado y en el letrero", "Letrero negro sobre amarillo, en metros", "Si no sale, pista completa"],
    },
    {
      nivel: "concepto",
      q: "¿Cuáles son las cartas de aeródromo y para qué sirve cada una?",
      respuesta:
        "La carta de aeródromo es la principal y te lleva del puesto a la pista. El plano de movimientos en tierra aparece cuando el rodaje no cabe con claridad en la anterior, y el plano de estacionamiento y atraque cubre puestos, guías y sistemas de atraque. La carta de obstáculos tipo A va una por pista y trae planta, perfil y el recuadro de las cuatro distancias declaradas. Quedan la carta topográfica de precisión, solo para categorías II y III, y la carta electrónica de terreno y obstáculos, que es un producto de datos y no una hoja.",
      claves: ["La de aeródromo es la principal", "La tipo A va una por pista", "La topográfica de precisión solo en categorías II y III", "La electrónica es datos, no hoja"],
    },
    {
      nivel: "interpretacion",
      q: "Necesitas la resistencia del pavimento y las distancias declaradas. ¿Dónde las buscas en la ficha del AIP?",
      respuesta:
        "La resistencia va con las características físicas de la pista, en AD 2.12, publicada con el código de cinco elementos. Las distancias declaradas van aparte, en AD 2.13, con las cuatro cifras de cada cabecera. Las luces de aproximación y de pista están en AD 2.14, y las condiciones de baja visibilidad viven en los procedimientos de vuelo, en AD 2.22.",
      claves: ["Resistencia en AD 2.12", "Distancias declaradas en AD 2.13", "Luces en AD 2.14", "Baja visibilidad en AD 2.22"],
    },
    {
      nivel: "concepto",
      q: "¿Cómo se representa un punto crítico en la carta y dónde va su explicación?",
      respuesta:
        "La norma obliga a rodear la ubicación con un círculo y a ponerle un identificador. La información adicional se anota en forma de tabla, que puede ir en el anverso o en el reverso de la misma carta. Ni el color ni el grosor del círculo están normalizados: los pone cada Estado.",
      claves: ["Círculo más identificador", "Tabla en el anverso o en el reverso", "Va en la misma carta", "Color y grosor libres"],
    },
    {
      nivel: "interpretacion",
      q: "¿En qué se diferencian el patrón A2 y el patrón B2, y cuándo aparece cada uno?",
      respuesta:
        "El A2 son cuatro líneas amarillas de 0,30 m con tres espacios de 0,30 m, 2,10 m de ancho total, con las dos continuas del lado de espera. El B2 es una escalera: dos líneas continuas de 0,30 m separadas 1,50 m, también 2,10 m de ancho total, unidas por travesaños de 0,9 m cada 3,0 m. El patrón A es siempre el más cercano a la pista y nunca desaparece; el B solo sale cuando hay dos o tres puntos de espera en una intersección con pista de aproximación de precisión de categoría I, II o III, y es el más alejado. Desde el 26 de noviembre de 2026 solo valen las configuraciones A2 y B2.",
      claves: ["A2 son cuatro líneas, B2 es escalera", "Los dos miden 2,10 m de ancho", "El A siempre es el más cercano a la pista", "A1 y B1 dejan de valer el 26 de noviembre de 2026"],
    },
    {
      nivel: "concepto",
      q: "¿Qué describe el número y qué describe la letra de la clave de referencia?",
      respuesta:
        "El número describe la longitud de campo de referencia del avión: 1 es menos de 800 m, 2 va de 800 a menos de 1 200, 3 de 1 200 a menos de 1 800 y 4 es de 1 800 en adelante. La letra describe solo la envergadura: A menos de 15 m, B de 15 a menos de 24, C de 24 a menos de 36, D de 36 a menos de 52, E de 52 a menos de 65 y F de 65 a menos de 80. La anchura exterior entre ruedas del tren principal dejó de determinar la letra el 8 de noviembre de 2018 y quedó como parámetro aparte, que fija anchuras de pista, de calles y de márgenes.",
      claves: ["El número es longitud de campo de referencia", "La letra es solo envergadura", "El 4 es de 1 800 m en adelante", "La F es de 65 a menos de 80 m"],
    },
    {
      nivel: "situacion",
      q: "Vas a un aeropuerto de clave 4F con un avión de 70 m de envergadura. Al entrar a una calle ves un letrero negro sobre naranja que dice «MAX SPAN 65 m». ¿Qué manda?",
      respuesta:
        "Manda el letrero, y el aviso publicado que lo respalda. La clave describe el aeródromo para planificar; la restricción temporal describe esa calle hoy. El letrero de zona fuera de servicio es negro sobre naranja, retrorreflectante y frangible, y su información no puede estar en conflicto con la que da el servicio de información aeronáutica. Si el letrero y el aviso no coinciden, se para y se reporta.",
      claves: ["Manda el letrero con su aviso", "La clave sirve para planificar, no para autorizar", "Negro sobre naranja es zona fuera de servicio", "Si no coinciden, parar y reportar"],
    },
    ],
  },
  {
    nivel: 2,
    titulo: "Lo pintado en el suelo",
    tras: 8,
    minutes: 12,
    preguntas: [
    {
      nivel: "concepto",
      q: "En el suelo de un aeropuerto, ¿qué te dice el color de lo pintado?",
      respuesta:
        "Todo lo de la pista se pinta en blanco y todo lo de calle de rodaje y plataforma en amarillo. Si voy rodando y aparece blanco debajo, estoy pisando pista. Hay dos excepciones que conviene nombrar: los galones, que son amarillos aunque estén alineados con la pista, y el eje de calle de rodaje que atraviesa la pista, que sigue siendo amarillo. Desde noviembre de 2025 se sumó el naranja con negro para el área fuera de servicio.",
      claves: ["Blanco es pista; amarillo es rodaje y plataforma", "Los galones son la excepción amarilla antes del umbral", "El eje de calle de rodaje sigue amarillo aunque cruce la pista", "Naranja con negro: área fuera de servicio"],
    },
    {
      nivel: "concepto",
      q: "¿Qué te dice la señal designadora de una pista y cómo se leen las letras cuando hay paralelas?",
      respuesta:
        "El número es la décima parte del rumbo magnético del eje, redondeada al entero más próximo y vista desde la aproximación; si queda de una sola cifra se le antepone un cero. Las letras identifican las paralelas y se leen de izquierda a derecha vistas desde la aproximación. Con dos pistas van L y R, con tres van L, C y R. Los dígitos son blancos y de unos nueve metros de alto.",
      claves: ["Décima parte del rumbo magnético, redondeada", "Se lee siempre desde la aproximación", "L, C y R de izquierda a derecha", "Blanco, dígitos de 9 m"],
    },
    {
      nivel: "interpretacion",
      q: "Vas en corta final y el eje pintado se ve grueso. ¿Qué te dice eso de la pista?",
      respuesta:
        "El ancho del eje codifica el tipo de pista. Con 0,90 m es una pista de precisión CAT II o CAT III. Con 0,45 m es CAT I o no precisión de clave 3 o 4. Con 0,30 m es visual o no precisión de clave 1 o 2. El eje va en trazos, y trazo más espacio suman entre 50 y 75 m.",
      claves: ["0,90 m: CAT II o CAT III", "0,45 m: CAT I o no precisión de clave alta", "0,30 m: visual o no precisión de clave baja", "Trazo más espacio, de 50 a 75 m"],
    },
    {
      nivel: "interpretacion",
      q: "Cuentas ocho fajas en el umbral. ¿Qué ancho tiene la pista y de dónde sale esa cuenta?",
      respuesta:
        "Ocho fajas son 30 m de ancho. La tabla completa es 4 fajas para 18 m, 6 para 23 m, 8 para 30 m, 12 para 45 m y 16 para 60 m. Las fajas son simétricas respecto del eje, arrancan a 6 m del umbral y miden 1,80 m de ancho con 1,80 m de separación. Desde noviembre de 2025 la señal de umbral va en toda pista pavimentada, sin excepción.",
      claves: ["Ocho fajas son 30 m", "4, 6, 8, 12 y 16 fajas para 18, 23, 30, 45 y 60 m", "El grupo arranca a 6 m del umbral y es simétrico", "Ahora es obligatoria en toda pista pavimentada"],
    },
    {
      nivel: "interpretacion",
      q: "Aterrizas en una pista con 2 600 m de distancia de aterrizaje disponible. ¿Dónde está el punto de visada y cuántos pares de la zona de toma de contacto vas a ver?",
      respuesta:
        "Con 2 400 m o más, el punto de visada empieza a 400 m del umbral y se ven seis pares. Las dos cosas se escalonan por distancia de aterrizaje disponible: el punto de visada a 150, 250, 300 o 400 m, y los pares en uno, dos, tres, cuatro o seis. Los pares van cada 150 m contados desde el umbral. Se borran los que caigan sobre el punto de visada o a 50 m o menos de él, así que ahí queda un hueco.",
      claves: ["400 m y seis pares", "Las dos cosas se escalonan por distancia de aterrizaje disponible", "Un par cada 150 m desde el umbral", "Se borran los pares pegados al punto de visada"],
    },
    {
      nivel: "concepto",
      q: "¿Para qué sirve la faja lateral de pista y cómo la distingues de la de una calle de rodaje?",
      respuesta:
        "Marca hasta dónde llega el pavimento de pista: por fuera de ella ya no es pista. Es blanca, continua, y mide al menos 0,90 m en pistas de 30 m o más. La de calle de rodaje es amarilla y va en doble línea, así que el color y el dibujo las separan de inmediato. En pistas de más de 60 m de ancho las fajas se colocan a 30 m del eje y no en el borde.",
      claves: ["Blanca y continua, borde exterior sobre el borde de pista", "Al menos 0,90 m en pistas de 30 m o más", "La de calle de rodaje es amarilla y doble", "Más de 60 m de ancho: se ponen a 30 m del eje"],
    },
    {
      nivel: "situacion",
      q: "Te autorizan a despegar desde el comienzo del pavimento y adelante ves flechas blancas sobre el eje. ¿Lo aceptas? ¿Y si en vez de flechas vieras galones amarillos?",
      respuesta:
        "Con flechas, sí. El tramo anterior a un umbral desplazado sirve para rodar, para despegar y para terminar el aterrizaje; lo único que no se puede hacer ahí es tomar contacto. Con galones amarillos, no: ese pavimento no es apto para uso normal, ni siquiera para rodar. Los galones van a 45 grados apuntando hacia la pista y marcan zonas de parada, áreas de chorro o pavimento inutilizable.",
      claves: ["Flechas: se rueda, se despega y se termina el aterrizaje", "Lo único prohibido sobre las flechas es tomar contacto", "Galones: ni aterrizar, ni despegar, ni rodar", "Galones amarillos a 45 grados apuntando hacia la pista"],
    },
    {
      nivel: "concepto",
      q: "¿En qué se nota que un umbral desplazado es temporal y no permanente?",
      respuesta:
        "En el temporal se tapan todas las señales anteriores al umbral nuevo, salvo el eje, que se convierte en flechas. Al final del tramo aparece un galón grande en punta de flecha que cruza la pista, de al menos 10 m de altura y 1,2 m de trazo. Si el desplazamiento va a durar poco, en lugar de pintarlo se ponen balizas con la misma forma y color. El caso permanente, en cambio, lleva galones amarillos y faja transversal pintados.",
      claves: ["Se tapan las señales anteriores, menos el eje", "El eje se convierte en flechas", "Galón grande en punta de flecha al final del tramo", "Si dura poco, balizas en vez de pintura"],
    },
    {
      nivel: "interpretacion",
      q: "Ves una cruz pintada en el pavimento. ¿Cómo sabes si te están cerrando una pista o una calle de rodaje?",
      respuesta:
        "Por el color y por el tamaño. La cruz de pista cerrada es blanca y grande, con brazo de unos 36 m y faja de 1,80 m. La de calle de rodaje cerrada es amarilla y mucho más pequeña, de unos 9 m. Sobre la pista se repiten con un intervalo máximo de 300 m y siempre va una en cada extremo del tramo cerrado.",
      claves: ["Pista cerrada: cruz blanca y grande", "Calle de rodaje cerrada: cruz amarilla y pequeña", "Máximo 300 m entre cruces en la pista", "Siempre una en cada extremo del tramo cerrado"],
    },
    {
      nivel: "concepto",
      q: "¿Qué dos elementos nuevos trae la norma desde noviembre de 2025 y cómo se reconocen?",
      respuesta:
        "Uno es la iluminación de pista cerrada: una cruz de luces blancas que destella un segundo encendida y un segundo apagada, orientada hacia la dirección de aproximación, con un mínimo de cinco luces por brazo. Si el sistema de destellos falla, las luces pasan solas a fijas. El otro es la señal de área fuera de servicio, con inscripción negra sobre fondo naranja, y su letrero del mismo color. El naranja es un color nuevo en el catálogo de señales pintadas.",
      claves: ["Cruz de luces blancas: un segundo encendida, un segundo apagada", "Mínimo cinco luces por brazo", "Si falla el destello, pasan a fijas", "Área fuera de servicio: negro sobre naranja"],
    },
    {
      nivel: "concepto",
      q: "Describe el punto de espera de la pista patrón A2 y dime cómo te indica de qué lado hay que esperar.",
      respuesta:
        "Son cuatro líneas amarillas: cuatro líneas y tres espacios de 0,30 m cada uno, con 2,10 m de ancho total. Las dos continuas van siempre del lado donde el avión tiene que detenerse y las dos de trazos del lado de la pista, así que las continuas me dicen de qué lado esperar. Es siempre la señal más cercana a la pista, aunque en esa intersección haya dos o tres puntos de espera. El eje de calle de rodaje se interrumpe al cruzarla.",
      claves: ["Cuatro líneas y tres espacios de 0,30 m", "Ancho total 2,10 m", "Las continuas van del lado donde hay que parar", "Siempre es el más cercano a la pista"],
    },
    {
      nivel: "interpretacion",
      q: "¿Cuándo aparece un patrón B2 y qué te está protegiendo?",
      respuesta:
        "Aparece cuando hay dos o tres puntos de espera en una intersección con pista de aproximación de precisión CAT I, II o III, y va siempre en las posiciones más alejadas de la pista. Lo que lo hace aparecer es que haya más de un punto de espera, no la categoría por sí sola. Es la escalera: dos líneas continuas de 0,30 m separadas 1,50 m y unidas por travesaños, con el mismo ancho total de 2,10 m que el A2. Al lado se pinta CAT II o CAT III cuando la señal es larga, y detrás de ella estoy fuera del área crítica.",
      claves: ["Dos o tres puntos de espera en pista de precisión", "Va en las posiciones más alejadas de la pista", "Escalera: continuas de 0,30 m separadas 1,50 m", "Inscripción CAT II o CAT III pintada al lado"],
    },
    {
      nivel: "interpretacion",
      q: "¿Qué es el eje mejorado, hasta dónde llega y dónde se corta?",
      respuesta:
        "Es una doble línea de trazos a cada lado del eje de la calle de rodaje, y significa que viene pista y hay que prepararse a parar. Se extiende hasta 47 m desde el patrón A, medidos alejándose de la pista. Si hay un patrón B2 dentro de esos 47 m, el realce se interrumpe 0,90 m antes y 0,90 m después y sigue hasta completar al menos tres trazos o los 47 m, lo que resulte mayor. El tramo que va del punto de espera a la pista no se realza nunca.",
      claves: ["Aviso de pista adelante", "47 m desde el patrón A, alejándose de la pista", "Se interrumpe 0,90 m a cada lado del B2", "Entre el punto de espera y la pista no se realza"],
    },
    {
      nivel: "situacion",
      q: "Ruedas hacia la pista sin autorización para cruzar. Adelante, las dos líneas continuas están de tu lado y las dos de trazos del otro. ¿Dónde paras y cuándo se considera que liberaste la señal?",
      respuesta:
        "Paro antes de las líneas continuas, con todo el avión de mi lado. Las continuas van siempre del lado donde hay que detenerse, así que la pista está del otro lado, el de los trazos. No estoy libre hasta que el avión completo cruza la señal, y eso vale igual al salir de la pista. Del lado de espera suele ir además la señal pintada de instrucción obligatoria, blanca sobre fondo rojo, que quiere decir que no se pasa sin autorización.",
      claves: ["Parar antes de las líneas continuas", "Las continuas marcan el lado donde se para; los trazos miran a la pista", "No se libera hasta que cruza el avión completo, también al salir", "Blanco sobre rojo: no se pasa sin autorización"],
    },
    {
      nivel: "situacion",
      q: "Entras al puesto de estacionamiento. ¿Qué te va marcando el camino, con qué referencia visual paras y qué líneas de la plataforma no son tuyas?",
      respuesta:
        "Sigo la línea de entrada, que la pisa la rueda de morro y no mi asiento. La barra de viraje y la línea de parada van en ángulo recto y están puestas a la altura del puesto del piloto izquierdo, así que cuando aparecen por mi ventanilla es el momento de girar y de frenar; la barra de viraje además lleva punta de flecha con el sentido del giro. Las líneas de seguridad no son amarillas: son de un color que contraste con el amarillo de los puestos y marcan hasta dónde llega el ala y por dónde circulan los equipos de tierra. Y el punto de espera de la vía de vehículos no lo dibuja la norma aeronáutica: sigue el código de tránsito local, por eso suele ser un «PARE».",
      claves: ["La línea de entrada la sigue la rueda de morro", "Barra de viraje y línea de parada, a la altura del piloto izquierdo", "Líneas de seguridad de color contrastante, de al menos 0,10 m", "La espera de la vía de vehículos la fija el tránsito terrestre"],
    },
    ],
  },
  {
    nivel: 3,
    titulo: "Letreros y balizas",
    tras: 12,
    minutes: 12,
    preguntas: [
    {
      nivel: "concepto",
      q: "¿Qué letreros son de instrucción obligatoria y cómo los reconoces a simple vista?",
      respuesta:
        "Son nueve y todos son blanco sobre rojo. Casi todos viven en el punto de espera de la pista: designación de pista, punto de espera de la pista, los cinco de categoría, prohibida la entrada y el punto de espera en vía de vehículos. El rojo es el único color que te frena.",
      claves: ["Blanco sobre rojo", "Son nueve", "Casi todos están en el punto de espera de la pista"],
    },
    {
      nivel: "interpretacion",
      q: "Estás rodando y ves un letrero rojo que dice `25-07`. ¿Qué te está diciendo?",
      respuesta:
        "Es el letrero de designación de pista: enfrente tienes la pista 07-25. Las cifras van en el orden en que las ves, así que el umbral de la 25 queda a tu izquierda y el de la 07 a tu derecha. Cerca de un extremo puede llevar solo esa cabecera.",
      claves: ["Designación de pista, no longitud ni nombre de calle", "El orden indica dónde queda cada umbral", "En un extremo, una sola designación"],
    },
    {
      nivel: "interpretacion",
      q: "Dos letreros rojos seguidos: uno dice `E2` y otro dice `25 CAT II/III`. ¿Qué diferencia hay?",
      respuesta:
        "El de `E2` lleva la designación de la calle más un número y marca un punto de espera puesto donde la calle dejaría infringir una superficie limitadora de obstáculos o interferir con las radioayudas. El de `25 CAT II/III` lleva un solo designador de pista seguido de la categoría y marca el punto de espera del área crítica de esa pista.",
      claves: ["E2 es calle más número", "El de categoría lleva un solo designador de pista", "25-07 CAT II no existe: nunca las dos cabeceras con CAT"],
    },
    {
      nivel: "interpretacion",
      q: "En el pavimento, ¿cómo distingues un punto de espera patrón A2 de uno patrón B2, y qué significa cada uno?",
      respuesta:
        "El A2 son cuatro líneas amarillas paralelas: las dos continuas van del lado en que el avión espera y las dos de trazos miran a la pista, y marca el primer punto de espera. El B2 son dos líneas continuas unidas por travesaños, con aspecto de escalera, y queda más atrás. Los dos miden 2,10 metros de ancho y los dos son válidos solo en su versión ancha.",
      claves: ["A2: cuatro líneas, las continuas del lado en que se espera", "B2: escalera, y va más atrás", "2,10 m de ancho los dos; nada de A1 ni B1"],
    },
    {
      nivel: "situacion",
      q: "Ruedas de noche con autorización «taxi via F, hold short of runway 25». Al llegar a una unión ves de frente un disco rojo con una barra blanca horizontal, sin texto. ¿Qué haces?",
      respuesta:
        "No entras. Ese es el letrero de prohibida la entrada y marca un pavimento al que ninguna aeronave puede entrar por ese lado, aunque tu autorización te lleve hacia allá. Te detienes antes, avisas que no puedes seguir por ahí y pides encaminamiento. Nunca sustituye a un punto de espera de pista.",
      claves: ["No se entra, aunque la autorización apunte hacia allá", "No lleva texto, y va a cada lado de la calle prohibida", "No es un «hold short»"],
    },
    {
      nivel: "concepto",
      q: "¿Cómo distingues un letrero de emplazamiento de uno de dirección?",
      respuesta:
        "El de emplazamiento es el único que invierte los colores: amarillo sobre negro, con borde amarillo cuando va solo, y nunca lleva flechas. Responde «dónde estoy». El de dirección es negro sobre amarillo y siempre lleva flecha; responde «por dónde sigo». En un letrero combinado, los virajes a la izquierda van a la izquierda del emplazamiento y los de la derecha a la derecha.",
      claves: ["Emplazamiento: amarillo sobre negro, sin flecha", "Dirección: negro sobre amarillo, siempre con flecha", "En el combinado, la izquierda a la izquierda"],
    },
    {
      nivel: "concepto",
      q: "¿Qué es un letrero negro sobre naranja y desde cuándo existe?",
      respuesta:
        "Es el letrero de área fuera de servicio. Avisa de obras o de distancias declaradas reducidas, y puede reforzarse con dos luces destellantes rojas o amarillas que destellan a la vez. Entró con la Enmienda 18 y es aplicable desde el 27 de noviembre de 2025.",
      claves: ["Área fuera de servicio", "Dos luces destellantes que destellan a la vez", "Aplicable desde el 27 de noviembre de 2025"],
    },
    {
      nivel: "interpretacion",
      q: "¿Qué lleva dibujado el letrero de pista libre y qué te autoriza a decir?",
      respuesta:
        "Lleva dibujada la señal de punto de espera de pista en configuración A: dos líneas continuas y dos de trazos. Marca el límite del área crítica o sensible del ILS, o el borde inferior de la superficie de transición interna, el que quede más lejos. Solo puedes reportar pista libre cuando el avión entero pasó ese letrero.",
      claves: ["Dibujo de la configuración A dentro del letrero", "Límite del área crítica o sensible, o de la transición interna", "El avión entero tiene que haberlo pasado"],
    },
    {
      nivel: "concepto",
      q: "¿De qué color es el letrero de distancia de pista restante y cada cuánto va?",
      respuesta:
        "Inscripción blanca sobre fondo negro. Va a lo largo de toda la pista, a uno o a los dos lados, por fuera de los bordes del pavimento, cada 300 metros aproximadamente con tolerancia de más o menos 30 metros. Todos los de una misma pista son del mismo tamaño.",
      claves: ["Blanco sobre negro", "Cada 300 m, con tolerancia de ±30 m", "Por fuera de los bordes y del mismo tamaño en toda la pista"],
    },
    {
      nivel: "interpretacion",
      q: "Entras a la pista por una intersección y ves un letrero amarillo con `2 150 m` y una flecha. ¿Qué cifra es esa y qué haces con ella?",
      respuesta:
        "Es el letrero de despegue desde intersección: te da el TORA que queda desde esa intersección, en metros, con la flecha apuntando en la dirección de despegue. Lo comparas con la distancia que pidió tu cálculo de despegue. Si no alcanza, lo dices antes de alinearte, no en la carrera.",
      claves: ["TORA restante desde esa intersección, en metros", "No es longitud total ni distancia de pista restante", "Va del lado izquierdo de la calle de entrada"],
    },
    {
      nivel: "concepto",
      q: "¿Qué medidas mínimas tiene la manga de viento y cómo se lee su codificación de colores?",
      respuesta:
        "El cono de tela mide 3,6 metros de largo como mínimo y 0,9 metros de diámetro en la base mayor, y tiene que ser legible desde 300 metros de altura. Si lleva dos colores son cinco bandas alternas, y la primera y la última son las del color más oscuro. El viento sale por la boca pequeña, y cuanto más horizontal queda la manga, más viento hay.",
      claves: ["3,6 m de largo y 0,9 m de diámetro, mínimos", "Cinco bandas, la primera y la última oscuras", "Se lee desde 300 m de altura"],
    },
    {
      nivel: "concepto",
      q: "¿De qué color son las balizas de borde y las de eje de calle de rodaje?",
      respuesta:
        "Las de borde son azules retrorreflectantes, con área visible de 150 centímetros cuadrados como mínimo. Las de eje son verdes retrorreflectantes, con área visible de 20 centímetros cuadrados como mínimo, colocadas sobre la señal de eje o desplazadas 30 centímetros como máximo. Todas las balizas son frangibles y bajas, para dar guarda a hélices y góndolas.",
      claves: ["Azul el borde, verde el eje", "Retrorreflectantes las dos", "Frangibles y bajas"],
    },
    {
      nivel: "interpretacion",
      q: "En un área de señales ves una haltera blanca. ¿Qué cambia si cada disco lleva encima una barra negra?",
      respuesta:
        "La haltera sola limita a pistas y calles de rodaje todo: aterrizaje, despegue y rodaje. Con una barra negra perpendicular sobre cada disco, solo el aterrizaje y el despegue quedan limitados a pistas, y el rodaje deja de estar limitado. Es el mismo panel con un matiz que cambia la operación.",
      claves: ["Haltera sola: todo limitado a pistas y calles", "Con barras: solo aterrizaje y despegue", "Las barras van perpendiculares, una sobre cada disco"],
    },
    {
      nivel: "situacion",
      q: "Te quedas sin radio en circuito y la torre te apunta con la lámpara de señales: ves una luz verde fija. ¿Qué te dicen y qué contestas?",
      respuesta:
        "Verde fija en vuelo es autorización para aterrizar. Contestas balanceando las alas de día, o encendiendo y apagando las luces de aterrizaje de noche. Ojo con el contexto: el mismo verde fija en tierra es autorización para despegar, así que el color solo se lee junto con tu situación. La lámpara es obligatoria en la torre de todo aeródromo controlado y da rojo, verde y blanco.",
      claves: ["Verde fija en vuelo: autorizado a aterrizar", "Se contesta balanceando alas o con las luces de aterrizaje", "El mismo color significa otra cosa en tierra"],
    },
    {
      nivel: "situacion",
      q: "De noche, con RVR de 400 metros, te dicen «hold short of runway 25». Ves la A2 adelante y, más atrás, la escalera B2 con el letrero `25 CAT II/III`. ¿En cuál paras?",
      respuesta:
        "En la de atrás, la de la escalera. Con esa visibilidad el aeropuerto está en procedimientos de baja visibilidad y el punto de espera que protege el área sensible del ILS es el más alejado de la pista. Parar en la A2 te deja dentro del área sensible y puede desviar la señal del que viene aterrizando. Si tienes duda, preguntas antes de avanzar.",
      claves: ["Se para en el más alejado, el del patrón B2", "El letrero rojo da la categoría; el controlador dice cuál aplica hoy", "Pasarse contamina el área sensible del ILS"],
    },
    ],
  },
  {
    nivel: 4,
    titulo: "Luces",
    tras: 17,
    minutes: 12,
    preguntas: [
    {
      nivel: "concepto",
      q: "¿Cada cuánto van las luces de borde de una pista y qué significa que el último tramo se vea amarillo?",
      respuesta:
        "Son dos filas blancas de intensidad variable, en el borde del pavimento o hasta 3 m por fuera, con separación uniforme: 60 m como máximo en pista de vuelo por instrumentos y 100 m en pista de vuelo visual. El último tramo puede verse amarillo, y cubre los últimos 600 m o el último tercio de la pista, lo que sea menor. Es un aviso de que la pista se está acabando, no una obligación: hay pistas donde ese tramo sigue blanco.",
      claves: ["Dos filas blancas", "60 m por instrumentos, 100 m en visual", "Amarillo en los últimos 600 m o el último tercio", "Es aviso, no obligación"],
    },
    {
      nivel: "concepto",
      q: "¿Cómo son las luces de protección de pista y para qué están?",
      respuesta:
        "Son amarillas y destellan entre 30 y 60 ciclos por minuto, con el haz dirigido hacia el avión que espera. Avisan de que la pista está a un paso. Hay dos configuraciones: la A son dos pares de luces, uno a cada lado de la calle, y la B es una fila que cruza la calle completa con las luces separadas 3 m. La configuración B no se coloca en el mismo emplazamiento que una barra de parada.",
      claves: ["Amarillas y destellando", "30 a 60 ciclos por minuto", "Configuración A a los lados, B cruzando", "La B no convive con barra de parada"],
    },
    {
      nivel: "concepto",
      q: "¿Qué es el PAPI, dónde va y cómo se lee?",
      respuesta:
        "Son cuatro cajas alineadas al lado izquierdo de la pista, separadas 9 m entre sí, con la más interna a 15 m del borde. En senda ves las dos internas rojas y las dos externas blancas. Cuanto más blanco veas, más alto vienes; cuanto más rojo, más bajo. El PAPI abreviado, el APAPI, hace lo mismo con dos cajas: en senda, una roja y una blanca.",
      claves: ["Cuatro cajas a la izquierda", "Dos rojas y dos blancas es senda", "Las rojas siempre del lado interno", "El APAPI son dos cajas"],
    },
    {
      nivel: "concepto",
      q: "¿Qué destella el faro de un aeródromo y a qué ritmo?",
      respuesta:
        "De 20 a 30 destellos por minuto. En aeródromo terrestre alterna verde y blanco, y en hidroaeródromo, amarillo y blanco. Tiene un pariente cercano, el faro de identificación, que manda la identificación del aeródromo en clave Morse.",
      claves: ["20 a 30 destellos por minuto", "Verde y blanco en terrestre", "Amarillo y blanco en hidroaeródromo", "Faro de identificación en Morse"],
    },
    {
      nivel: "concepto",
      q: "¿Cuándo cuenta una luz como fuera de servicio?",
      respuesta:
        "Cuando la intensidad media de su haz principal baja del 50 % del valor especificado. Ojo con eso: la luz puede estar encendida y contar igual como fuera de servicio. Por eso el conteo no se hace a ojo desde la cabina.",
      claves: ["Intensidad media del haz principal", "Por debajo del 50 %", "Puede estar encendida y contar igual"],
    },
    {
      nivel: "interpretacion",
      q: "Ves el eje de la pista en rojo y blanco alternados. ¿Qué te está diciendo?",
      respuesta:
        "Que quedan entre 900 y 300 m de pista. El eje va blanco mientras sobra pista, rojo y blanco cuando empieza a faltar y rojo en los últimos 300 m. En una pista de menos de 1 800 m el tramo alternado arranca en el punto medio, así que el aviso llega antes. Es una lectura de distancia que no te obliga a leer nada.",
      claves: ["Entre 900 y 300 m del extremo", "Rojo son los últimos 300 m", "En pista corta empieza en el punto medio"],
    },
    {
      nivel: "interpretacion",
      q: "Al aterrizar ves una fila de luces verdes cruzada. ¿Qué es y por qué no la ves si ruedas en sentido contrario?",
      respuesta:
        "Es el umbral: marca dónde empieza tu pista y desde ahí cuentas la distancia disponible. Va a 3 m por fuera del extremo como máximo, con al menos seis luces, y es unidireccional en la dirección de aproximación, por eso solo se ve llegando. Si el umbral está reforzado con barras de ala, verás además dos grupos verdes que se abren hacia afuera. El extremo de la pista lleva el color contrario: rojo.",
      claves: ["Es el umbral", "Unidireccional hacia la aproximación", "Barras de ala si está reforzado", "El extremo es rojo"],
    },
    {
      nivel: "interpretacion",
      q: "Sales de la pista y el eje de la calle alterna verde y amarillo. ¿Qué significa y dónde termina el alternado?",
      respuesta:
        "Que sigues dentro del área crítica o sensible del ILS. El alternado va desde el eje de la pista hasta el perímetro de esa área o hasta el borde inferior de la superficie de transición interna, lo que quede más lejos de la pista. La primera luz siempre es verde y la más cercana al perímetro siempre es amarilla; de ahí en adelante todas son verdes. Mientras veas amarillo no has liberado del todo.",
      claves: ["Área crítica o sensible del ILS", "La primera es verde y la última amarilla", "Después, todas verdes"],
    },
    {
      nivel: "interpretacion",
      q: "¿Por qué las luces de una torre de línea eléctrica destellan en el orden medio, arriba, abajo?",
      respuesta:
        "Porque lo peligroso no es la torre, es el cable que cuelga entre dos torres. Los tres niveles van en la cima, a la altura del punto más bajo de la catenaria y a mitad de camino entre los dos, y ese orden de destello es la firma que te dice que estás mirando una línea eléctrica y no una torre cualquiera. De día el cable se hace visible con esferas de 60 cm o más, de colores alternados.",
      claves: ["El obstáculo real es la catenaria", "Tres niveles: cima, medio y punto bajo del cable", "El orden es la firma", "Esferas para el día"],
    },
    {
      nivel: "interpretacion",
      q: "Una fila de borde cumple el porcentaje global de luces servibles pero tiene dos apagadas seguidas. ¿Se acepta?",
      respuesta:
        "No. La regla de adyacencia manda sobre el porcentaje: no se admite una luz fuera de servicio junto a otra. La única excepción son las barretas y las barras transversales, donde se admiten dos. El motivo es de lectura: dos apagadas seguidas abren un hueco en el patrón, y un hueco se lee como una curva o como un borde de pista donde no lo hay.",
      claves: ["La adyacencia manda sobre el porcentaje", "Nunca dos contiguas", "Excepción en barretas y barras transversales", "El hueco se lee como una curva"],
    },
    {
      nivel: "situacion",
      q: "Estás detenido en el punto de espera con la barra de parada roja encendida y el control te autoriza a cruzar. ¿Qué haces?",
      respuesta:
        "No cruzo. Una barra de parada encendida no se cruza nunca, ni siquiera con autorización. Si me autorizaron con la barra encendida, algo no cuadra: se lo confirmo al control y espero a que la apaguen. Además, con la barra encendida las luces de eje más allá quedan apagadas, así que la propia instalación me está diciendo que ese tramo no es mío.",
      claves: ["No se cruza encendida", "Ni con autorización del control", "Confirmar y esperar", "El eje más allá queda apagado"],
    },
    {
      nivel: "situacion",
      q: "En final ves aparecer dos filas rojas a lado y lado del eje del sistema de aproximación. ¿Qué te dicen?",
      respuesta:
        "Que el umbral está muy cerca y que el sistema es de precisión de categorías II y III. Esas filas laterales rojas solo existen en ese sistema y cubren los 270 m más cercanos al umbral. Ni el sistema sencillo ni el de precisión de categoría I las llevan, así que verlas ya te sitúa en el tramo final.",
      claves: ["Solo en precisión CAT II/III", "270 m desde el umbral", "El umbral está muy cerca"],
    },
    {
      nivel: "situacion",
      q: "Vas en aproximación nocturna y ves destellos corriendo hacia el umbral. ¿Para qué te sirven y para qué no?",
      respuesta:
        "Corren desde la luz más externa hacia el umbral, dos veces por segundo, y sirven para encontrar el sistema de aproximación y engancharlo con la vista. No sirven para volar la senda: eso lo da el indicador de pendiente, el PAPI o el APAPI. Confundir una cosa con la otra es un error clásico, porque los destellos no traen información vertical.",
      claves: ["Dos por segundo hacia el umbral", "Sirven para encontrar el sistema", "La senda la da el indicador de pendiente"],
    },
    {
      nivel: "situacion",
      q: "Rodando de noche hacia el puesto se te cruzan dos vehículos, uno con baliza azul y otro con baliza amarilla. ¿Cuál te obliga a prestar más atención?",
      respuesta:
        "El azul. El azul destellante identifica un vehículo de emergencia o de seguridad, y si va cruzando hacia la plataforma es probable que esté atendiendo algo. El amarillo destellante es un vehículo de servicio normal. Y si el amarillo es más potente y se pone delante de mí, es el vehículo guía y lo sigo.",
      claves: ["Azul es emergencia o seguridad", "Amarillo es servicio", "El vehículo guía lleva una amarilla más potente"],
    },
    {
      nivel: "situacion",
      q: "Operas en categoría III y el sistema de vigilancia avisa que las luces de eje de pista bajaron al 90 % de servibles. ¿Qué pasa con la operación?",
      respuesta:
        "El eje de pista exige 95 % en categorías II y III, así que con 90 % ya no se cumple el nivel de servicio y la operación tiene que bajar de categoría. El 90 % es el mínimo de la zona de toma de contacto, no el del eje. En ese mismo nivel, el umbral, el borde y los 450 m interiores del sistema de aproximación también piden 95 %, y el extremo, 75 %. Lo que decide si sigues es el aviso que el sistema de vigilancia le manda al control.",
      claves: ["El eje exige 95 %", "El 90 % es de la zona de toma de contacto", "El extremo, 75 %", "El aviso al control es lo que decide"],
    },
    ],
  },
  {
    nivel: 5,
    titulo: "Operar",
    tras: 22,
    minutes: 12,
    preguntas: [
    {
      nivel: "concepto",
      q: "¿Qué es un punto crítico y cómo lo reconoces en la carta de aeródromo?",
      respuesta:
        "Es un sitio del área de movimiento con riesgo de colisión o de incursión, normalmente por la geometría del lugar. En la carta va rodeado y rotulado «HS» con su número. La explicación de cada uno suele ir en un recuadro aparte, en la misma carta.",
      claves: ["Área de movimiento, riesgo de colisión o incursión", "Rodeado en la carta", "Rotulado «HS» y número", "Recuadro con la explicación"],
    },
    {
      nivel: "situacion",
      q: "¿Cuándo se revisa la ruta de rodaje de llegada y con qué a la vista?",
      respuesta:
        "Antes, en el briefing de descenso, con la carta de aeródromo a la vista, y no al aterrizar. El de salida se hace antes de arrancar. En los dos casos se sigue la autorización recibida, no la que uno esperaba.",
      claves: ["En el briefing de descenso, antes de tocar", "Carta de aeródromo a la vista", "El de salida, antes de arrancar", "Manda lo autorizado, no lo esperado"],
    },
    {
      nivel: "interpretacion",
      q: "Los Rodeos en 1977 y Linate en 2001 son accidentes muy distintos. ¿Qué tienen en común y qué le dicen a un piloto hoy?",
      respuesta:
        "En los dos había niebla y en los dos el error se cometió antes de llegar a la pista. En Los Rodeos uno despegó sin autorización con el otro todavía en la pista. En Linate un bimotor ejecutivo tomó la calle equivocada y salió a la pista activa. La lección es que la incursión se decide en el cruce anterior, cuando ya no ves y crees que vas bien.",
      claves: ["Poca visibilidad en los dos casos", "Despegue sin autorización con la pista ocupada", "Calle equivocada hacia la pista activa", "El error es anterior a la pista"],
    },
    {
      nivel: "concepto",
      q: "¿Qué es una barra de parada, cuándo es obligatoria y qué haces si la ves encendida con autorización dada?",
      respuesta:
        "Es una fila de luces rojas que cruza la calle en el punto de espera. Es obligatoria cuando la pista se usa con visibilidad en pista menor que 550 m. Una barra encendida no se cruza nunca, aunque el controlador te haya autorizado: paras antes y le avisas.",
      claves: ["Luces rojas cruzando la calle", "Obligatoria por debajo de 550 m de visibilidad en pista", "Encendida no se cruza, ni con autorización", "Paras y avisas"],
    },
    {
      nivel: "interpretacion",
      q: "¿Por qué el punto de espera de categoría está más atrás que el normal y cómo sabes, rodando, que ya saliste del área del ILS?",
      respuesta:
        "Está más atrás para dejar libres las áreas crítica y sensible del ILS: un avión parado dentro deforma la señal al que viene en final. Se dibuja con el patrón B2, la escalera, y lleva letrero rojo con la pista y la categoría. Saliendo de la pista, el eje alterna verde y amarillo mientras sigues dentro, y cuando todas las luces son verdes ya estás afuera.",
      claves: ["Proteger las áreas crítica y sensible del ILS", "Patrón B2, la escalera", "Letrero rojo con pista y categoría", "Verde y amarillo dentro, todo verde afuera"],
    },
    {
      nivel: "concepto",
      q: "El umbral de visibilidad que dispara casi todo el alumbrado de rodaje se movió. ¿De cuánto a cuánto, y desde cuándo?",
      respuesta:
        "Pasó de 350 m a 300 m de alcance visual en la pista, y aplica desde el 27 de noviembre de 2025. Es un cambio que recorre buena parte de las luces de rodaje: ejes de calle, plataformas de viraje, puntos de espera intermedios e indicadoras de salida rápida.",
      claves: ["De 350 m a 300 m", "Desde el 27 de noviembre de 2025", "Alcance visual en la pista", "Afecta al alumbrado de rodaje en bloque"],
    },
    {
      nivel: "concepto",
      q: "¿Entre qué valores va la clave de estado de la pista, y qué es un 6, un 1 y un 0?",
      respuesta:
        "Va de 6 a 0. El 6 es pista seca. El 1 es hielo. El 0 es lo peor que hay: hielo mojado, agua sobre nieve compactada, o nieve seca o mojada sobre hielo.",
      claves: ["De 6 a 0", "6 es seca", "1 es hielo", "0 es hielo mojado y equivalentes"],
    },
    {
      nivel: "interpretacion",
      q: "Te dan la pista en 5/3/2 y vas a aterrizar por el otro lado. ¿Cómo lo lees?",
      respuesta:
        "Los tercios se publican siempre desde el designador de pista más bajo, así que en tu sentido de aterrizaje van al revés: tu primer tercio es el 2. Es decir, tomas contacto sobre lo peor. Antes de seguir hay que revisar la performance con esa clave.",
      claves: ["Se publica desde el designador más bajo", "En tu sentido se leen al revés", "Toma de contacto sobre el 2", "Revisar performance antes de seguir"],
    },
    {
      nivel: "interpretacion",
      q: "¿Se puede cambiar una clave ya asignada, y en qué dirección?",
      respuesta:
        "Bajarla siempre se puede, y el reporte del piloto es una de las cosas que la baja. Subirla no: entre 5 y 2 una clave asignada no se mejora. Las claves 1 y 0 sí pueden mejorarse, pero nunca por encima de 3.",
      claves: ["Bajar, siempre", "De 5 a 2 no se mejora", "1 y 0 sí se pueden mejorar", "Nunca por encima de 3"],
    },
    {
      nivel: "concepto",
      q: "¿Qué reemplazó al ACN-PCN, desde cuándo, y de qué se compone el código?",
      respuesta:
        "Lo reemplazó el ACR-PCR, vigente desde el 28 de noviembre de 2024. Son cinco elementos y se leen siempre en el mismo orden: valor del índice, tipo de pavimento, resistencia de la subrasante, presión máxima de neumáticos y método de evaluación.",
      claves: ["ACR-PCR", "Desde el 28 de noviembre de 2024", "Cinco elementos", "Valor, tipo, subrasante, presión y método"],
    },
    {
      nivel: "situacion",
      q: "Vas a un aeropuerto cuyo PCR publicado es menor que tu ACR de hoy. ¿Puedes ir?",
      respuesta:
        "La regla es que tu ACR sea igual o menor que el PCR. Por encima solo se admite de forma excepcional y con el explotador del aeródromo de acuerdo: hasta un 10 % por encima, siempre que esos movimientos no pasen del 5 % del total del año. Más que eso exige un análisis, y nunca se hace como rutina.",
      claves: ["ACR igual o menor que PCR", "Hasta 10 % por encima, excepcional", "Los movimientos, dentro del 5 % anual", "Lo autoriza el aeródromo, no el piloto"],
    },
    {
      nivel: "concepto",
      q: "¿Con qué dato se elige la categoría de salvamento y extinción de incendios de un aeródromo, y qué se comprueba después?",
      respuesta:
        "Se elige por la longitud total del avión, no por el peso ni por la envergadura ni por los pasajeros. Después se comprueba la anchura máxima del fuselaje: si se pasa de la que corresponde a su fila, la categoría sube un nivel. Con muy poco tráfico el nivel puede bajar una sola categoría.",
      claves: ["Longitud total del avión", "Después, anchura del fuselaje", "Si se pasa, sube un nivel", "Con poco tráfico puede bajar una"],
    },
    {
      nivel: "concepto",
      q: "¿En qué ángulo se une a la pista una calle de salida rápida, y de qué color son sus luces indicadoras?",
      respuesta:
        "El eje se une a la pista en un ángulo de entre 25° y 45°, y lo ideal son 30°. Las luces indicadoras de salida rápida son amarillas, fijas y unidireccionales, y van sobre la pista, del mismo lado del eje que la salida. Te cuentan la distancia que falta hasta la salida.",
      claves: ["Entre 25° y 45°", "Lo ideal, 30°", "Amarillas, fijas y unidireccionales", "Del mismo lado que la salida"],
    },
    {
      nivel: "interpretacion",
      q: "En una guía visual de atraque, ¿qué te dice el verde y qué te dice el rojo?",
      respuesta:
        "Hay que separar las dos indicaciones. En la guía de azimut, el verde es el eje del puesto y el rojo es desviación. En el indicador de parada, el verde es siga y el rojo es que llegaste al punto de parada, no que algo falló.",
      claves: ["Azimut: verde es eje, rojo es desviación", "Parada: verde es siga", "Rojo de parada es llegaste, no falla", "Son dos indicaciones distintas"],
    },
    {
      nivel: "situacion",
      q: "Entrando al puesto, la pantalla del sistema avanzado de atraque se apaga de golpe. ¿Qué haces?",
      respuesta:
        "Frenas y esperas. Sin guía válida no se entra al puesto: el sistema tiene que avisar cuando falla, y el puesto tiene procedimiento de parada de emergencia. A partir de ahí manda el señalero, y conviene recordar que su parada normal es lenta y la de emergencia es brusca.",
      claves: ["Frenar y esperar", "Sin guía válida no se entra", "El sistema debe avisar su propia falla", "El señalero manda en el puesto"],
    },
    ],
  },
]

/**
 * Guion de la práctica con audio de Comunicaciones. Empezó como dos o tres
 * ítems de ejemplo por tipo (los primeros de cada arreglo, que usan las
 * pruebas) y ahora trae el guion completo: 10 copias, 20 colaciones, 8
 * «¿es para mí?», 15 hearback, 25 «¿qué respondes?», 15 «desármala», 15
 * paneles, 5 ráfagas, 10 «¿estándar o plain?» y 3 vuelos completos. Dentro de
 * cada arreglo, después de los ejemplos, la dificultad sube: radio limpia,
 * normal y sucia; una instrucción, dos y varias.
 *
 * Toda la fraseología sale del Doc 9432 (Manual de radiotelefonía, 4.ª ed.
 * 2007), tomada del inglés que el manual da entre paréntesis, y de las reglas
 * de colación del Doc 4444 (15.ª ed., Enm. 4) 4.5.7.5, con dos cambios:
 *
 *   - el distintivo FASTAIR 345 / G-CD / G-AB pasa a AVIANCA 452 (y los
 *     parecidos AVIANCA 425 y 542 en «¿es para mí?»);
 *   - los números van en palabras, como se transmiten (Doc 9432 2.4). Se
 *     escribe «niner» (NAI-na) y el resto con la grafía inglesa normal; el
 *     acento OACI (TRI, FA-IF, FO-ar) lo pone la voz.
 *
 * Los lugares son los ficticios del propio manual (Kennington, Wicken,
 * Georgetown, Alexander, Stephenville, North Cross, Colinton, Marlo, Walden,
 * Colin). TOLEX es un punto ficticio (el mismo de los niveles del módulo) y
 * «TOLEX two Bravo» y «Walden one Charlie» son salidas ficticias. Pistas,
 * frecuencias, códigos, niveles y QNH son de práctica: no son de ningún
 * aeródromo real. La frase sigue siendo la del párrafo citado; lo que cambia
 * son los valores. Cuando una transmisión junta dos instrucciones que el
 * manual da por separado, `fuente` cita cada párrafo.
 *
 * Lo que no es fraseología OACI va rotulado PLAIN LANGUAGE. Nada de lo que los
 * niveles marcan VERIFICAR (socorro y urgencia, MINIMUM FUEL, TCAS RA, CPDLC,
 * CLIMB VIA SID, velocidad, espera) aparece aquí como frase: por eso ningún
 * panel revisa SPD ni V/S.
 *
 * Cada transmisión tiene su entrada en contenido/audio/comunicaciones.json;
 * scripts/audio/comunicaciones.test.ts falla si no coinciden.
 */

import type {
  EjCopia,
  EjDesarmala,
  EjEsParaMi,
  EjEstandarOPlain,
  EjHearback,
  EjPanel,
  EjQueRespondes,
  EjRafaga,
  EjReadback,
  EjVueloCompleto,
  PerfilRadio,
  Transmision,
  VozRadio,
} from "@/lib/comunicacionesPractica"

function tx(id: string, voz: VozRadio, perfil: PerfilRadio, texto: string): Transmision {
  return { id, voz, perfil, texto }
}

// ─── Transmisiones ───────────────────────────────────────────────────────────

const T = {
  autRuta: tx(
    "cm-ej-aut-ruta-kennington",
    "atc_latam",
    "normal",
    "Avianca four five two, cleared to Kennington via Alfa one, flight level two eight zero, Wicken three Delta departure, squawk five five zero one.",
  ),
  salidaRumbo: tx(
    "cm-ej-salida-rumbo-040",
    "atc_uk",
    "normal",
    "Avianca four five two, turn right heading zero four zero until passing flight level seven zero, then direct Wicken VOR.",
  ),
  llegadaDescenso: tx(
    "cm-ej-llegada-descenso-4000",
    "atc_us",
    "normal",
    "Avianca four five two, descend to four thousand feet, QNH one zero zero five, transition level five zero, expect ILS approach runway two four.",
  ),
  squawk6402: tx("cm-ej-squawk-6402", "atc_latam", "limpia", "Avianca four five two, squawk six four zero two."),
  rodaje27: tx(
    "cm-ej-rodaje-27",
    "atc_uk",
    "normal",
    "Avianca four five two, taxi to holding point runway two seven, give way to B seven four seven passing left to right, QNH one zero one niner.",
  ),
  // ¿Es para mí? (1)
  e1a: tx("cm-ej-epm-425-contacto", "atc_us", "normal", "Avianca four two five, contact Alexander Control one two niner decimal one."),
  e1b: tx("cm-ej-epm-452-squawk", "atc_us", "normal", "Avianca four five two, squawk six four one one."),
  e1c: tx("cm-ej-epm-542-rumbo", "atc_us", "normal", "Avianca five four two, turn left heading zero five zero for separation."),
  e1d: tx("cm-ej-epm-452-rumbo", "atc_us", "normal", "Avianca four five two, fly heading zero five zero."),
  e1e: tx("cm-ej-epm-425-detenga", "atc_us", "normal", "Avianca four two five, stop descent at flight level one five zero."),
  e1f: tx("cm-ej-epm-452-ascenso", "atc_us", "normal", "Avianca four five two, continue climb to flight level three three zero."),
  // ¿Es para mí? (2)
  e2a: tx("cm-ej-epm-542-apresure", "atc_latam", "sucia", "Avianca five four two, expedite descent to flight level eight zero."),
  e2b: tx("cm-ej-epm-452-notifique-rumbo", "atc_latam", "sucia", "Avianca four five two, report heading."),
  e2c: tx("cm-ej-epm-425-reactive", "atc_latam", "sucia", "Avianca four two five, reset squawk six four one one."),
  e2d: tx("cm-ej-epm-452-nueva-aut", "atc_latam", "sucia", "Avianca four five two, recleared flight level three three zero."),
  // Hearback
  h1Atc: tx(
    "cm-ej-hb-ascenso-240",
    "atc_uk",
    "normal",
    "Avianca four five two, climb to flight level two four zero, expedite until passing flight level one eight zero.",
  ),
  h1Pm: tx(
    "cm-ej-hb-ascenso-240-pm",
    "piloto_pm",
    "normal",
    "Climbing to flight level two four zero, expediting until passing flight level one eight zero, Avianca four five two.",
  ),
  h2Atc: tx("cm-ej-hb-qnh-1003", "atc_latam", "normal", "Avianca four five two, QNH one zero zero three."),
  h2Pm: tx("cm-ej-hb-qnh-1003-pm", "piloto_pm", "normal", "QNH one zero one three, Avianca four five two."),
  h3Atc: tx("cm-ej-hb-rumbo-050", "atc_us", "normal", "Avianca four five two, turn left heading zero five zero for separation."),
  h3Pm: tx("cm-ej-hb-rumbo-050-pm", "piloto_pm", "normal", "Heading left one five zero, Avianca four five two."),
  // ¿Qué respondes?
  inmediata: tx("cm-ej-qr-salida-inmediata", "atc_uk", "limpia", "Avianca four five two, are you ready for immediate departure?"),
  // Desármala
  cruzDelNorte: tx(
    "cm-ej-des-north-cross",
    "atc_latam",
    "normal",
    "Avianca four five two, after passing North Cross NDB descend to flight level eight zero.",
  ),
  despegue24: tx(
    "cm-ej-des-despegue-24",
    "atc_uk",
    "normal",
    "Avianca four five two, runway two four, cleared for take-off, report airborne.",
  ),
  // Ráfagas
  salida121: tx("cm-ej-raf-salida-121750", "atc_us", "normal", "Avianca four five two, contact Departure one two one decimal seven five zero."),
  qnh1009: tx("cm-ej-raf-puesta-marcha-1009", "atc_latam", "normal", "Avianca four five two, start up approved, QNH one zero zero niner."),
  radioCheck: tx(
    "cm-ej-raf-matricula-gabcd",
    "piloto",
    "normal",
    "Stephenville Tower, Golf Alfa Bravo Charlie Delta, radio check one one eight decimal seven.",
  ),
  torre118: tx("cm-ej-raf-torre-1187", "atc_us", "sucia", "Avianca four five two, contact Tower one one eight decimal seven."),
  reset6411: tx("cm-ej-raf-reset-6411", "atc_uk", "sucia", "Avianca four five two, reset squawk six four one one."),
  aterrizaje24: tx(
    "cm-ej-raf-aterrizaje-24",
    "atc_uk",
    "sucia",
    "Avianca four five two, runway two four, cleared to land, wind two seven zero degrees two zero knots.",
  ),
  // ¿Estándar o plain?
  imposible: tx(
    "cm-ej-eop-cruce-wicken",
    "atc_latam",
    "normal",
    "Avianca four five two, Georgetown Departure, cleared to Colinton flight level two niner zero, cross Wicken flight level one five zero or above, if unable, maintain flight level one three zero.",
  ),
  // Vuelo completo
  despegue27: tx(
    "cm-ej-vc-despegue-27",
    "atc_uk",
    "normal",
    "Avianca four five two, runway two seven, cleared for take-off, report airborne.",
  ),
  ilsDirecta: tx(
    "cm-ej-vc-ils-directa-24",
    "atc_us",
    "sucia",
    "Avianca four five two, cleared straight-in ILS approach runway two four, report established.",
  ),
  primeraDerecha: tx(
    "cm-ej-vc-primera-derecha",
    "atc_latam",
    "sucia",
    "Avianca four five two, take first right, when vacated contact Ground one one eight decimal three five zero.",
  ),
} satisfies Record<string, Transmision>

// ─── Transmisiones del guion completo ────────────────────────────────────────
// Las voces cambian por dependencia y por ítem (atc_latam, atc_uk, atc_us) para
// que el piloto se acostumbre a los tres acentos. Cada «¿es para mí?» usa una
// sola voz: es un mismo controlador hablando con varios aviones.

const G = {
  // 1. Copia
  cpContactoAlexander: tx(
    "cm-cp-contacto-alexander-1263",
    "atc_us",
    "limpia",
    "Avianca four five two, contact Alexander Control one two six decimal three.",
  ),
  cpPreveaIls14: tx(
    "cm-cp-prevea-ils-14",
    "atc_uk",
    "limpia",
    "Avianca four five two, expect ILS approach runway one four, QNH one zero one eight.",
  ),
  cpInfoSalida19: tx(
    "cm-cp-info-salida-19",
    "atc_latam",
    "normal",
    "Avianca four five two, departure runway one niner, wind one seven zero degrees six knots, QNH one zero one two, temperature one eight, dewpoint one two, time four one.",
  ),
  cpRodaje09: tx(
    "cm-cp-rodaje-09-alfa",
    "atc_latam",
    "normal",
    "Avianca four five two, taxi to holding point runway zero niner via taxiway Alfa, hold short of runway one four, QNH one zero one five.",
  ),
  cpAutColinton: tx(
    "cm-cp-aut-colinton",
    "atc_uk",
    "normal",
    "Avianca four five two, cleared to Colinton via Bravo two, flight level three three zero, TOLEX two Bravo departure, squawk four six two one.",
  ),
  cpDespegue09: tx(
    "cm-cp-despegue-09-recto",
    "atc_uk",
    "normal",
    "Avianca four five two, climb straight ahead until four thousand feet before turning left, runway zero niner, cleared for take-off.",
  ),
  cpDetengaRumboSquawk: tx(
    "cm-cp-detenga-rumbo-squawk",
    "atc_latam",
    "sucia",
    "Avianca four five two, stop descent at flight level one three zero, turn right heading one niner zero, squawk three four seven one.",
  ),
  // 2. Readback
  rbTorre1189: tx("cm-rb-torre-1189", "atc_us", "limpia", "Avianca four five two, contact Georgetown Tower one one eight decimal niner."),
  rbAscenso110: tx("cm-rb-ascenso-110", "atc_uk", "limpia", "Avianca four five two, climb to flight level one one zero."),
  rbRumbo160: tx("cm-rb-rumbo-160", "atc_latam", "limpia", "Avianca four five two, fly heading one six zero."),
  rbReset4215: tx("cm-rb-reset-4215", "atc_us", "limpia", "Avianca four five two, reset squawk four two one five."),
  rbDescenso3000: tx(
    "cm-rb-descenso-3000",
    "atc_uk",
    "normal",
    "Avianca four five two, descend to three thousand feet, QNH one zero one seven, transition level six zero, expect ILS approach runway three two.",
  ),
  rbCuandoPase: tx(
    "cm-rb-cuando-pase-080",
    "atc_latam",
    "normal",
    "Avianca four five two, when passing flight level eight zero contact Alexander Control one two four decimal three five zero.",
  ),
  rbApresureDescenso: tx("cm-rb-apresure-descenso-120", "atc_us", "normal", "Avianca four five two, expedite descent to flight level one two zero."),
  rbTrasMarlo: tx("cm-rb-tras-marlo-260", "atc_uk", "normal", "Avianca four five two, after passing Marlo climb to flight level two six zero."),
  rbCruce11: tx("cm-rb-cruce-11", "atc_latam", "normal", "Avianca four five two, cross runway one one, report vacated."),
  rbInmediata: tx("cm-rb-salida-inmediata", "atc_uk", "normal", "Avianca four five two, line up. Be ready for immediate departure."),
  rbDespegueViraje34: tx(
    "cm-rb-despegue-34-viraje",
    "atc_us",
    "normal",
    "Avianca four five two, right turn approved, runway three four, cleared for take-off.",
  ),
  rbCondicionalAtr: tx("cm-rb-condicional-atr", "atc_uk", "normal", "Avianca four five two, behind the landing ATR, line up and wait behind."),
  rbRegresoPlataforma: tx(
    "cm-rb-regreso-plataforma",
    "atc_latam",
    "sucia",
    "Avianca four five two, take next right, return to ramp, contact Ground one two one decimal six.",
  ),
  rbPuesto14: tx("cm-rb-puesto-14", "atc_us", "sucia", "Avianca four five two, taxi to stand one four via taxiway Delta."),
  rbTresSesenta: tx("cm-rb-tres-sesenta-derecha", "atc_latam", "sucia", "Avianca four five two, make a three sixty turn right for sequencing."),
  // 3. ¿Es para mí? (3): limpia, 542
  e3a: tx("cm-epm3-542-ascenso", "atc_uk", "limpia", "Avianca five four two, climb to flight level one niner zero."),
  e3b: tx("cm-epm3-452-squawk", "atc_uk", "limpia", "Avianca four five two, squawk two six one three."),
  e3c: tx("cm-epm3-542-contacto", "atc_uk", "limpia", "Avianca five four two, contact Alexander Control one two eight decimal seven."),
  e3d: tx("cm-epm3-452-rumbo", "atc_uk", "limpia", "Avianca four five two, turn right heading one four zero."),
  // ¿Es para mí? (4): normal, 425
  e4a: tx("cm-epm4-425-descenso", "atc_latam", "normal", "Avianca four two five, descend to flight level one two zero."),
  e4b: tx("cm-epm4-452-notifique-nivel", "atc_latam", "normal", "Avianca four five two, report level."),
  e4c: tx("cm-epm4-425-rumbo", "atc_latam", "normal", "Avianca four two five, turn left heading two niner zero."),
  e4d: tx("cm-epm4-452-mantenga", "atc_latam", "normal", "Avianca four five two, maintain flight level one four zero."),
  e4e: tx("cm-epm4-425-squawk", "atc_latam", "normal", "Avianca four two five, squawk four seven zero one."),
  // ¿Es para mí? (5): normal, 45, 542 y 425 en la salida
  e5a: tx("cm-epm5-452-rumbo", "atc_us", "normal", "Avianca four five two, turn left heading zero six zero."),
  e5b: tx("cm-epm5-45-ascenso", "atc_us", "normal", "Avianca four five, climb to flight level one five zero."),
  e5c: tx("cm-epm5-542-contacto", "atc_us", "normal", "Avianca five four two, contact Alexander Control one two seven decimal niner."),
  e5d: tx("cm-epm5-452-ascenso", "atc_us", "normal", "Avianca four five two, climb to flight level one three zero."),
  e5e: tx("cm-epm5-425-apresure", "atc_us", "normal", "Avianca four two five, expedite climb to flight level one one zero."),
  // ¿Es para mí? (6): normal, torre
  e6a: tx("cm-epm6-452-espere-fuera", "atc_uk", "normal", "Avianca four five two, hold short of runway two seven."),
  e6b: tx(
    "cm-epm6-425-aterrizaje",
    "atc_uk",
    "normal",
    "Avianca four two five, runway two seven, cleared to land, wind two five zero degrees one two knots.",
  ),
  e6c: tx("cm-epm6-542-rodaje", "atc_uk", "normal", "Avianca five four two, taxi to holding point runway two seven via taxiway Bravo."),
  e6d: tx(
    "cm-epm6-425-salida-pista",
    "atc_uk",
    "normal",
    "Avianca four two five, take first left, when vacated contact Ground one two one decimal eight.",
  ),
  e6e: tx("cm-epm6-452-alineese", "atc_uk", "normal", "Avianca four five two, line up and wait."),
  // ¿Es para mí? (7): sucia
  e7a: tx("cm-epm7-45-descenso", "atc_latam", "sucia", "Avianca four five, descend to flight level eight zero."),
  e7b: tx("cm-epm7-452-detenga", "atc_latam", "sucia", "Avianca four five two, stop descent at flight level one one zero."),
  e7c: tx("cm-epm7-542-rumbo", "atc_latam", "sucia", "Avianca five four two, turn right heading three three zero."),
  e7d: tx("cm-epm7-452-contacto", "atc_latam", "sucia", "Avianca four five two, contact Georgetown Approach one one niner decimal five."),
  e7e: tx("cm-epm7-425-apresure", "atc_latam", "sucia", "Avianca four two five, expedite descent to flight level niner zero."),
  // ¿Es para mí? (8): sucia, la misma instrucción para dos aviones
  e8a: tx("cm-epm8-542-descenso", "atc_us", "sucia", "Avianca five four two, descend to four thousand feet, QNH one zero zero eight."),
  e8b: tx("cm-epm8-452-rumbo", "atc_us", "sucia", "Avianca four five two, turn left heading one niner zero."),
  e8c: tx("cm-epm8-425-rumbo", "atc_us", "sucia", "Avianca four two five, turn left heading one niner zero."),
  e8d: tx("cm-epm8-45-contacto", "atc_us", "sucia", "Avianca four five, contact Tower one one eight decimal three."),
  e8e: tx("cm-epm8-452-descenso", "atc_us", "sucia", "Avianca four five two, descend to five thousand feet, QNH one zero zero eight."),
  e8f: tx("cm-epm8-542-reactive", "atc_us", "sucia", "Avianca five four two, reset squawk one four three two."),
  // 4. Hearback
  h4Atc: tx("cm-hb-squawk-5236", "atc_latam", "limpia", "Avianca four five two, squawk five two three six."),
  h4Pm: tx("cm-hb-squawk-5236-pm", "piloto_pm", "limpia", "Five two three six, Avianca four five two."),
  h5Atc: tx("cm-hb-contacto-1321", "atc_us", "limpia", "Avianca four five two, contact Alexander Control one three two decimal one."),
  h5Pm: tx("cm-hb-contacto-1321-pm", "piloto_pm", "limpia", "One three two decimal seven, Avianca four five two."),
  h6Atc: tx("cm-hb-derecha-220", "atc_uk", "normal", "Avianca four five two, turn right heading two two zero."),
  h6Pm: tx("cm-hb-derecha-220-pm", "piloto_pm", "normal", "Left heading two two zero, Avianca four five two."),
  h7Atc: tx("cm-hb-espere-fuera-29", "atc_latam", "normal", "Avianca four five two, hold short of runway two niner."),
  h7Pm: tx("cm-hb-espere-fuera-29-pm", "piloto_pm", "normal", "Crossing runway two niner, Avianca four five two."),
  h8Atc: tx("cm-hb-descenso-6000", "atc_us", "normal", "Avianca four five two, descend to six thousand feet, QNH one zero two one."),
  h8Pm: tx("cm-hb-descenso-6000-pm", "piloto_pm", "normal", "Descending to flight level six zero, QNH one zero two one, Avianca four five two."),
  h9Atc: tx("cm-hb-tras-walden-090", "atc_uk", "normal", "Avianca four five two, after passing Walden descend to flight level niner zero."),
  h9Pm: tx("cm-hb-tras-walden-090-pm", "piloto_pm", "normal", "Descending to flight level niner zero, Avianca four five two."),
  h10Atc: tx("cm-hb-nueva-aut-290", "atc_latam", "normal", "Avianca four five two, recleared flight level two niner zero."),
  h10Pm: tx("cm-hb-nueva-aut-290-pm", "piloto_pm", "normal", "Recleared flight level two eight zero, Avianca four five two."),
  h11Atc: tx(
    "cm-hb-aut-kennington",
    "atc_uk",
    "normal",
    "Avianca four five two, cleared to Kennington via Alfa two, flight level two six zero, Walden one Charlie departure, squawk three three zero four.",
  ),
  h11Pm: tx(
    "cm-hb-aut-kennington-pm",
    "piloto_pm",
    "normal",
    "Cleared to Kennington via Alfa two, flight level two six zero, Walden one Charlie departure, squawk three three four zero, Avianca four five two.",
  ),
  h12Atc: tx(
    "cm-hb-aterrizaje-14",
    "atc_us",
    "normal",
    "Avianca four five two, runway one four, cleared to land, wind one two zero degrees one zero knots.",
  ),
  h12Pm: tx("cm-hb-aterrizaje-14-pm", "piloto_pm", "normal", "Runway one four, cleared to land, Avianca four five two."),
  h13Atc: tx("cm-hb-despegue-09", "atc_uk", "sucia", "Avianca four five two, runway zero niner, cleared for take-off."),
  h13Pm: tx("cm-hb-despegue-09-pm", "piloto_pm", "sucia", "Cleared for take-off runway two seven, Avianca four five two."),
  h14Atc: tx(
    "cm-hb-cuando-pase-1279",
    "atc_latam",
    "sucia",
    "Avianca four five two, when passing flight level eight zero contact Alexander Control one two seven decimal niner.",
  ),
  h14Pm: tx(
    "cm-hb-cuando-pase-1279-pm",
    "piloto_pm",
    "sucia",
    "When passing flight level eight zero, one two seven decimal niner, Avianca four two five.",
  ),
  h15Atc: tx(
    "cm-hb-correccion-340",
    "atc_us",
    "sucia",
    "Avianca four five two, turn left heading three one zero, correction, turn left heading three four zero.",
  ),
  h15Pm: tx("cm-hb-correccion-340-pm", "piloto_pm", "sucia", "Left heading three one zero, Avianca four five two."),
  // 5. ¿Qué respondes?
  qrRumboNivel: tx("cm-qr-rumbo-y-nivel", "atc_us", "limpia", "Avianca four five two, report heading and level."),
  qrTodas: tx("cm-qr-todas-las-estaciones", "atc_latam", "limpia", "All stations, Alexander Control, fuel dumping completed."),
  qrObras: tx("cm-qr-obras-puerta-12", "atc_uk", "limpia", "Avianca four five two, caution construction work adjacent to gate one two."),
  qrTransponder: tx("cm-qr-capacidad-transponder", "atc_us", "limpia", "Avianca four five two, advise type of transponder capability."),
  qrEstacion: tx("cm-qr-estacion-que-llama", "atc_latam", "normal", "Station calling Georgetown Ground, say again your call sign."),
  qrAtrVista: tx("cm-qr-atr-a-la-vista", "atc_uk", "normal", "Avianca four five two, report the ATR on final in sight."),
  qrCancele: tx(
    "cm-qr-cancele-despegue",
    "atc_uk",
    "normal",
    "Avianca four five two, hold position, cancel take-off, I say again, cancel take-off, vehicle on runway.",
  ),
  qrPare: tx("cm-qr-pare-inmediatamente", "atc_us", "normal", "Avianca four five two, stop immediately, Avianca four five two, stop immediately."),
  qrApresureRodaje: tx(
    "cm-qr-apresure-rodaje",
    "atc_latam",
    "normal",
    "Avianca four five two, expedite taxi, traffic on final runway three two, report runway three two vacated.",
  ),
  qrContinue: tx("cm-qr-continue-aproximacion", "atc_uk", "normal", "Avianca four five two, continue approach, wind one six zero degrees one four knots."),
  qrOmita: tx(
    "cm-qr-omita-notificaciones",
    "atc_latam",
    "normal",
    "Avianca four five two, omit position reports until FIR boundary, next report Colin.",
  ),
  qrIdentPerdida: tx(
    "cm-qr-identificacion-perdida",
    "atc_us",
    "normal",
    "Avianca four five two, identification lost due radar failure, contact Alexander Control on one three two decimal three five zero.",
  ),
  qrOrbita: tx("cm-qr-orbita-izquierda", "atc_uk", "normal", "Avianca four five two, orbit left for delay."),
  qrAltimetro: tx("cm-qr-compruebe-altimetro", "atc_latam", "normal", "Avianca four five two, check altimeter setting and confirm level."),
  qrTransponderOp: tx("cm-qr-confirme-transponder", "atc_us", "normal", "Avianca four five two, confirm transponder operating."),
  qrDesconocido: tx(
    "cm-qr-transito-desconocido",
    "atc_uk",
    "normal",
    "Avianca four five two, unknown traffic two o'clock, four miles, opposite direction, fast moving.",
  ),
  qrContactoAprox: tx("cm-qr-contacto-aproximacion", "atc_us", "normal", "Avianca four five two, contact Georgetown Approach one two zero decimal four."),
  qrPreveaIls32: tx("cm-qr-prevea-ils-32", "atc_latam", "normal", "Avianca four five two, expect ILS approach runway three two, QNH one zero one seven."),
  qrQuedeEscucha: tx(
    "cm-qr-quede-en-escucha-torre",
    "atc_us",
    "sucia",
    "Avianca four five two, stand by for Georgetown Tower one one eight decimal niner.",
  ),
  // 6. Desármala
  dsAscensoApresure: tx(
    "cm-ds-ascenso-210-apresure",
    "atc_us",
    "normal",
    "Avianca four five two, climb to flight level two one zero, expedite until passing flight level one five zero.",
  ),
  dsPasadaBaja: tx(
    "cm-ds-pasada-baja-14",
    "atc_uk",
    "sucia",
    "Avianca four five two, cleared low pass runway one four, not below five hundred feet, report final.",
  ),
  // 7. Panel
  pnAscenso5000: tx("cm-pn-ascenso-5000", "atc_latam", "limpia", "Avianca four five two, climb to five thousand feet."),
  pnTerreno: tx("cm-pn-alerta-terreno", "atc_us", "normal", "Avianca four five two, terrain alert, climb to three thousand feet, QNH one zero zero eight."),
  pnIdentificacion: tx("cm-pn-identificacion-120", "atc_latam", "normal", "Avianca four five two, for identification turn left heading one two zero."),
  pnEvitar: tx(
    "cm-pn-evitar-transito",
    "atc_uk",
    "sucia",
    "Avianca four five two, turn left immediately heading two zero zero to avoid traffic one o'clock five miles.",
  ),
  // 8. Ráfaga
  rfMatricula: tx("cm-rf-matricula-gerks", "piloto", "normal", "Walden Tower, Golf Echo Romeo Kilo Sierra, radio check one two zero decimal five."),
  // 9. ¿Estándar o plain?
  eopVectores: tx("cm-eop-desea-vectores", "atc_us", "normal", "Avianca four five two, do you want vectors?"),
  // 10. Vuelos completos
  v2Puesta: tx("cm-v2-puesta-en-marcha", "atc_latam", "limpia", "Avianca four five two, start up approved, QNH one zero one two."),
  v2Rodaje: tx("cm-v2-rodaje-19", "atc_latam", "limpia", "Avianca four five two, taxi to holding point runway one niner via taxiway Charlie."),
  v2Despegue: tx("cm-v2-despegue-19", "atc_uk", "limpia", "Avianca four five two, runway one niner, cleared for take-off."),
  v2Salida: tx("cm-v2-contacto-salida", "atc_uk", "limpia", "Avianca four five two, contact Georgetown Departure one two four decimal eight."),
  v2Ils: tx("cm-v2-ils-directa-14", "atc_us", "limpia", "Avianca four five two, cleared straight-in ILS approach runway one four, report established."),
  v2Torre: tx("cm-v2-contacto-torre", "atc_us", "limpia", "Avianca four five two, contact Tower one one niner decimal seven."),
  v3Cruce14: tx("cm-v3-cruce-14", "atc_latam", "normal", "Avianca four five two, cross runway one four, report vacated."),
  v3Aterrizaje32: tx(
    "cm-v3-aterrizaje-32",
    "atc_us",
    "sucia",
    "Avianca four five two, runway three two, cleared to land, wind three zero zero degrees one five knots.",
  ),
} satisfies Record<string, Transmision>

/** Todas las transmisiones de la práctica. Deben estar en el manifiesto. */
export const CM_TRANSMISIONES_EJEMPLO: Transmision[] = [...Object.values(T), ...Object.values(G)]

const DISTINTIVO = { id: "distintivo", etiqueta: "Distintivo", tipo: "distintivo" as const, valor: "Avianca 452" }

// ─── 1. Copia ────────────────────────────────────────────────────────────────

export const CM_COPIA: EjCopia[] = [
  {
    tipo: "copia",
    id: "c01",
    fuente: "Doc 9432 2.8.3.6",
    transmision: T.autRuta,
    campos: [
      { id: "limite", etiqueta: "Límite", tipo: "limite", esperado: "KENNINGTON" },
      { id: "ruta", etiqueta: "Ruta", tipo: "ruta", esperado: "A1", ayuda: "A1" },
      { id: "nivel", etiqueta: "Nivel", tipo: "nivel", esperado: "FL280", ayuda: "FL280" },
      { id: "salida", etiqueta: "Salida", tipo: "salida", esperado: "WICKEN 3 DELTA", alternativas: ["WICKEN 3D"] },
      { id: "squawk", etiqueta: "Squawk", tipo: "squawk", esperado: "5501", ayuda: "0000" },
    ],
    explicacion:
      "Es una autorización de ruta: se colaciona entera y se termina con el distintivo (Doc 9432 2.8.3.5 a y 2.8.3.7). Se copia en el orden en que llega: límite, ruta, nivel, salida y código SSR.",
  },
  {
    tipo: "copia",
    id: "c02",
    fuente: "Doc 9432 7.1.2",
    transmision: T.salidaRumbo,
    campos: [
      { id: "rumbo", etiqueta: "Rumbo", tipo: "rumbo", esperado: "040", ayuda: "000" },
      { id: "hasta", etiqueta: "Hasta pasar", tipo: "nivel", esperado: "FL70", ayuda: "FL70" },
      { id: "despues", etiqueta: "Después", tipo: "limite", esperado: "WICKEN", alternativas: ["WICKEN VOR"] },
    ],
    explicacion:
      "Una instrucción de salida con condición: el rumbo vale hasta pasar FL70 y luego va directo al VOR. El rumbo se colaciona siempre (Doc 9432 2.8.3.5 c).",
  },
  {
    tipo: "copia",
    id: "c03",
    fuente: "Doc 9432 7.3.1",
    transmision: T.llegadaDescenso,
    campos: [
      { id: "altitud", etiqueta: "Altitud", tipo: "altitud", esperado: "4000", ayuda: "pies" },
      { id: "qnh", etiqueta: "QNH", tipo: "qnh", esperado: "1005" },
      { id: "transicion", etiqueta: "Nivel de transición", tipo: "nivel", esperado: "FL50", ayuda: "FL50" },
      { id: "pista", etiqueta: "Pista", tipo: "pista", esperado: "24" },
    ],
    explicacion:
      "Al contacto inicial, aproximación da el tipo de aproximación previsto. Altitud, QNH, nivel de transición y pista se colacionan (Doc 9432 2.8.3.5 c).",
  },
  // ── Guion completo ──
  {
    tipo: "copia",
    id: "c04",
    fuente: "Doc 9432 2.8.2.1 y 2.4.4",
    transmision: G.cpContactoAlexander,
    campos: [
      { id: "dependencia", etiqueta: "Dependencia", tipo: "texto", esperado: "ALEXANDER CONTROL", alternativas: ["ALEXANDER"] },
      { id: "frecuencia", etiqueta: "Frecuencia", tipo: "frecuencia", esperado: "126.3", ayuda: "000.0" },
    ],
    explicacion:
      "Un cambio de frecuencia: a quién llamas y en qué frecuencia. 126,300 tiene el quinto y el sexto dígito en cero, así que se dicen solo los cuatro primeros, con «decimal» (Doc 9432 2.4.4). Se colaciona la frecuencia con tu distintivo.",
  },
  {
    tipo: "copia",
    id: "c05",
    fuente: "Doc 9432 7.3.1",
    transmision: G.cpPreveaIls14,
    campos: [
      { id: "aproximacion", etiqueta: "Aproximación prevista", tipo: "texto", esperado: "ILS" },
      { id: "pista", etiqueta: "Pista", tipo: "pista", esperado: "14" },
      { id: "qnh", etiqueta: "QNH", tipo: "qnh", esperado: "1018" },
    ],
    explicacion:
      "«Expect» no autoriza la aproximación: te dice cuál preparar. La pista en uso y el QNH se colacionan siempre (Doc 9432 2.8.3.5 c); la autorización de aproximación llega después.",
  },
  {
    tipo: "copia",
    id: "c06",
    fuente: "Doc 9432 4.2.1",
    transmision: G.cpInfoSalida19,
    campos: [
      { id: "pista", etiqueta: "Pista de salida", tipo: "pista", esperado: "19" },
      { id: "viento", etiqueta: "Viento (dirección)", tipo: "rumbo", esperado: "170", ayuda: "000" },
      { id: "qnh", etiqueta: "QNH", tipo: "qnh", esperado: "1012" },
    ],
    explicacion:
      "Información para la salida cuando no hay ATIS (Doc 9432 4.2.1). Llega mucho dato: pista, viento, QNH, temperatura, punto de rocío y hora. Lo que se colaciona es la pista y el QNH («runway one niner, QNH one zero one two, will call for start up»); el viento, la temperatura y la hora no están en la lista de 2.8.3.5.",
  },
  {
    tipo: "copia",
    id: "c07",
    fuente: "Doc 9432 4.4.1, 4.4.2 y 4.4.3",
    transmision: G.cpRodaje09,
    campos: [
      { id: "pista", etiqueta: "Punto de espera de la pista", tipo: "pista", esperado: "09" },
      { id: "calle", etiqueta: "Calle de rodaje", tipo: "ruta", esperado: "A", ayuda: "Letra" },
      { id: "esperaFuera", etiqueta: "Esperar fuera de la pista", tipo: "pista", esperado: "14" },
      { id: "qnh", etiqueta: "QNH", tipo: "qnh", esperado: "1015" },
    ],
    explicacion:
      "El límite de rodaje es el punto de espera de la 09 (Doc 9432 4.4.1). La ruta cruza la 14, y por eso la instrucción dice qué hacer ahí: esperar fuera (4.4.2). Esperar fuera, pista y QNH se colacionan (Doc 4444 4.5.7.5.1 b y c).",
  },
  {
    tipo: "copia",
    id: "c08",
    fuente: "Doc 9432 2.8.3.5 a y 2.8.3.6 (estructura). Ruta, salida y código de práctica",
    transmision: G.cpAutColinton,
    campos: [
      { id: "limite", etiqueta: "Límite", tipo: "limite", esperado: "COLINTON" },
      { id: "ruta", etiqueta: "Ruta", tipo: "ruta", esperado: "B2", ayuda: "A0" },
      { id: "nivel", etiqueta: "Nivel", tipo: "nivel", esperado: "FL330", ayuda: "FL000" },
      { id: "salida", etiqueta: "Salida", tipo: "salida", esperado: "TOLEX 2 BRAVO", alternativas: ["TOLEX 2B"] },
      { id: "squawk", etiqueta: "Squawk", tipo: "squawk", esperado: "4621", ayuda: "0000" },
    ],
    explicacion:
      "Autorización de ruta en el orden del manual: límite, ruta, nivel, salida y código SSR. Se colaciona entera (Doc 9432 2.8.3.5 a). TOLEX es un punto ficticio y «TOLEX two Bravo» una salida inventada para practicar.",
  },
  {
    tipo: "copia",
    id: "c09",
    fuente: "Doc 9432 4.5.9",
    transmision: G.cpDespegue09,
    campos: [
      { id: "altitud", etiqueta: "Recto hasta", tipo: "altitud", esperado: "4000", ayuda: "pies" },
      { id: "viraje", etiqueta: "Después vira a", tipo: "texto", esperado: "LEFT", alternativas: ["IZQUIERDA", "IZQ", "L", "TURNING LEFT", "TURN LEFT"] },
      { id: "pista", etiqueta: "Pista", tipo: "pista", esperado: "09" },
    ],
    explicacion:
      "Las instrucciones de salida pueden venir con la autorización de despegue (Doc 9432 4.5.9). Primero lo que haces en el aire (recto hasta 4 000 ft, luego a la izquierda) y al final la autorización. Se colacionan las dos cosas y la pista.",
  },
  {
    tipo: "copia",
    id: "c10",
    fuente: "Doc 9432 3.3.3.2, 6.3.1 y 6.5.2 (tres instrucciones en una transmisión)",
    transmision: G.cpDetengaRumboSquawk,
    campos: [
      { id: "nivel", etiqueta: "Detener descenso en", tipo: "nivel", esperado: "FL130", ayuda: "FL000" },
      { id: "direccion", etiqueta: "Viraje", tipo: "texto", esperado: "RIGHT", alternativas: ["DERECHA", "DER", "R"] },
      { id: "rumbo", etiqueta: "Rumbo", tipo: "rumbo", esperado: "190", ayuda: "000" },
      { id: "squawk", etiqueta: "Squawk", tipo: "squawk", esperado: "3471", ayuda: "0000" },
    ],
    explicacion:
      "Tres instrucciones seguidas con la radio sucia: nivel, rumbo y código. «Stop descent» anula el nivel anterior (Doc 9432 3.3.3.2). Si se te escapa una parte, pides solo esa parte: «say again» y el elemento (2.8.1.4).",
  },
]

// ─── 2. Readback con la voz ──────────────────────────────────────────────────

export const CM_READBACK: EjReadback[] = [
  {
    tipo: "readback",
    id: "r01",
    fuente: "Doc 9432 2.8.3.7",
    transmision: T.squawk6402,
    elementos: [{ id: "squawk", etiqueta: "Squawk", tipo: "squawk", valor: "6402" }, DISTINTIVO],
    modelo: "Six four zero two, Avianca four five two.",
    explicacion: "El código SSR se colaciona siempre, y la colación termina con tu distintivo (Doc 9432 2.8.3.5 c y 2.8.3.7).",
  },
  {
    tipo: "readback",
    id: "r02",
    fuente: "Doc 9432 7.3.1",
    transmision: T.llegadaDescenso,
    elementos: [
      { id: "altitud", etiqueta: "Altitud", tipo: "altitud", valor: "4000" },
      { id: "qnh", etiqueta: "QNH", tipo: "qnh", valor: "1005" },
      { id: "transicion", etiqueta: "Nivel de transición", tipo: "texto", valor: "transition level 50" },
      { id: "pista", etiqueta: "Pista", tipo: "pista", valor: "24" },
      DISTINTIVO,
    ],
    modelo:
      "Descending to four thousand feet, QNH one zero zero five, transition level five zero, expecting ILS approach runway two four, Avianca four five two.",
    explicacion:
      "Instrucción de nivel, reglaje de altímetro, nivel de transición y pista en uso: los cuatro están en la lista de lo que siempre se colaciona (Doc 9432 2.8.3.5 c).",
  },
  {
    tipo: "readback",
    id: "r03",
    fuente: "Doc 9432 4.4.3",
    transmision: T.rodaje27,
    elementos: [
      { id: "punto", etiqueta: "Límite de rodaje", tipo: "texto", valor: "holding point" },
      { id: "pista", etiqueta: "Pista", tipo: "pista", valor: "27" },
      { id: "qnh", etiqueta: "QNH", tipo: "qnh", valor: "1019" },
      DISTINTIVO,
    ],
    modelo: "Holding point runway two seven, QNH one zero one niner, giving way to B seven four seven, Avianca four five two.",
    explicacion:
      "Toda instrucción de rodaje trae un límite (Doc 9432 4.4.1). Pista y QNH se colacionan; el ceda el paso se confirma para que el controlador sepa que viste el tráfico.",
  },
  // ── Guion completo ──
  {
    tipo: "readback",
    id: "r04",
    fuente: "Doc 9432 2.8.2.1 y 2.4.4",
    transmision: G.rbTorre1189,
    elementos: [{ id: "frecuencia", etiqueta: "Frecuencia", tipo: "frecuencia", valor: "118.9" }, DISTINTIVO],
    modelo: "One one eight decimal niner, Avianca four five two.",
    explicacion:
      "El cambio de frecuencia se colaciona con la frecuencia y el distintivo, como en el ejemplo del manual. 118,900 tiene el quinto y el sexto dígito en cero: se dicen solo los cuatro primeros (Doc 9432 2.4.4).",
  },
  {
    tipo: "readback",
    id: "r05",
    fuente: "Doc 9432 3.3.3.1 y 3.3.3.2",
    transmision: G.rbAscenso110,
    elementos: [{ id: "nivel", etiqueta: "Nivel", tipo: "nivel", valor: "FL110" }, DISTINTIVO],
    modelo: "Climbing to flight level one one zero, Avianca four five two.",
    explicacion:
      "Instrucción de nivel: se colaciona siempre (Doc 9432 2.8.3.5 c). «Flight level» delante del número le dice al controlador que tu referencia es 1013,2 hPa (Doc 4444 4.5.7.5.1, nota).",
  },
  {
    tipo: "readback",
    id: "r06",
    fuente: "Doc 9432 6.3.1",
    transmision: G.rbRumbo160,
    elementos: [{ id: "rumbo", etiqueta: "Rumbo", tipo: "rumbo", valor: "160" }, DISTINTIVO],
    modelo: "Heading one six zero, Avianca four five two.",
    explicacion: "Rumbo magnético, dígito a dígito (Doc 9432 6.1.2 y 2.4.2). Las instrucciones de rumbo se colacionan siempre (2.8.3.5 c).",
  },
  {
    tipo: "readback",
    id: "r07",
    fuente: "Doc 9432 6.5.1 y 6.5.2",
    transmision: G.rbReset4215,
    elementos: [
      { id: "reactive", etiqueta: "Reactivar", tipo: "texto", valor: "resetting", alternativas: ["reset"] },
      { id: "squawk", etiqueta: "Squawk", tipo: "squawk", valor: "4215" },
      DISTINTIVO,
    ],
    modelo: "Resetting four two one five, Avianca four five two.",
    explicacion:
      "«Reset squawk» pide volver a seleccionar el modo y el código asignados (Doc 9432 6.5.1). La respuesta del manual es «resetting» y el código (6.5.2).",
  },
  {
    tipo: "readback",
    id: "r08",
    fuente: "Doc 9432 7.3.1",
    transmision: G.rbDescenso3000,
    elementos: [
      { id: "altitud", etiqueta: "Altitud", tipo: "altitud", valor: "3000" },
      { id: "qnh", etiqueta: "QNH", tipo: "qnh", valor: "1017" },
      { id: "transicion", etiqueta: "Nivel de transición", tipo: "texto", valor: "transition level 60" },
      { id: "pista", etiqueta: "Pista", tipo: "pista", valor: "32" },
      DISTINTIVO,
    ],
    modelo:
      "Descending to three thousand feet, QNH one zero one seven, transition level six zero, expecting ILS approach runway three two, Avianca four five two.",
    explicacion:
      "Altitud en pies con QNH: estás bajando por debajo del nivel de transición. «Three thousand» se dice con THOUSAND (Doc 9432 2.4.3). Altitud, QNH, nivel de transición y pista se colacionan (Doc 4444 4.5.7.5.1 c).",
  },
  {
    tipo: "readback",
    id: "r09",
    fuente: "Doc 9432 2.8.2.1 y 2.4.4",
    transmision: G.rbCuandoPase,
    elementos: [
      { id: "condicion", etiqueta: "Condición", tipo: "texto", valor: "when passing" },
      { id: "nivel", etiqueta: "Al pasar", tipo: "nivel", valor: "FL80" },
      { id: "frecuencia", etiqueta: "Frecuencia", tipo: "frecuencia", valor: "124.350" },
      DISTINTIVO,
    ],
    modelo: "When passing flight level eight zero, Alexander Control one two four decimal three five zero, Avianca four five two.",
    explicacion:
      "Cambio de frecuencia con condición: no cambias hasta pasar FL80, y la colación lo dice (Doc 9432 2.8.2.1). 124,350 se dice con los seis dígitos porque el quinto y el sexto no son los dos cero (2.4.4).",
  },
  {
    tipo: "readback",
    id: "r10",
    fuente: "Doc 9432 3.3.3.3",
    transmision: G.rbApresureDescenso,
    elementos: [
      { id: "apresure", etiqueta: "Apresurar", tipo: "texto", valor: "expediting", alternativas: ["expedite"] },
      { id: "nivel", etiqueta: "Nivel", tipo: "nivel", valor: "FL120" },
      DISTINTIVO,
    ],
    modelo: "Expediting descent to flight level one two zero, Avianca four five two.",
    explicacion:
      "«Expedite» pide un régimen mayor que el normal, por tránsito (Doc 9432 3.3.3.3). Si no puedes, se dice «unable to expedite» en vez de colacionar.",
  },
  {
    tipo: "readback",
    id: "r11",
    fuente: "Doc 9432 3.3.3.1 (el manual da el ejemplo en descenso; ascenso y descenso son intercambiables)",
    transmision: G.rbTrasMarlo,
    elementos: [
      { id: "condicion", etiqueta: "Condición", tipo: "texto", valor: "after Marlo", alternativas: ["after passing Marlo"] },
      { id: "nivel", etiqueta: "Nivel", tipo: "nivel", valor: "FL260" },
      DISTINTIVO,
    ],
    modelo: "After Marlo climb to flight level two six zero, Avianca four five two.",
    explicacion:
      "La condición va en la colación: sin ella, el controlador no sabe si entendiste que no puedes subir antes de Marlo (lugar ficticio del manual). Es una instrucción de nivel condicional (Doc 9432 2.8.3.6).",
  },
  {
    tipo: "readback",
    id: "r12",
    fuente: "Doc 9432 4.4.2; Doc 4444 4.5.7.5.1 b",
    transmision: G.rbCruce11,
    elementos: [
      { id: "cruce", etiqueta: "Cruzar", tipo: "texto", valor: "crossing", alternativas: ["cross"] },
      { id: "pista", etiqueta: "Pista", tipo: "pista", valor: "11" },
      DISTINTIVO,
    ],
    modelo: "Crossing runway one one, wilco, Avianca four five two.",
    explicacion:
      "Toda autorización para cruzar una pista se colaciona (Doc 4444 4.5.7.5.1 b). El «wilco» cubre el «report vacated»: el «vacated» se dice cuando toda la aeronave sobrepasó el punto de espera del otro lado (Doc 9432 4.4.2, nota).",
  },
  {
    tipo: "readback",
    id: "r13",
    fuente: "Doc 9432 4.5.5",
    transmision: G.rbInmediata,
    elementos: [{ id: "posicion", etiqueta: "Entrar a la pista", tipo: "texto", valor: "lining up", alternativas: ["line up"] }, DISTINTIVO],
    modelo: "Lining up, Avianca four five two.",
    explicacion:
      "Te piden entrar a la pista y estar listo para salir sin demora. Todavía no hay autorización de despegue: esa llega aparte, con «cleared for take-off» (Doc 9432 4.5.5 y 2.8.3.3).",
  },
  {
    tipo: "readback",
    id: "r14",
    fuente: "Doc 9432 4.5.9",
    transmision: G.rbDespegueViraje34,
    elementos: [
      { id: "pista", etiqueta: "Pista", tipo: "pista", valor: "34" },
      { id: "aut", etiqueta: "Autorización", tipo: "texto", valor: "cleared for take-off" },
      { id: "viraje", etiqueta: "Viraje aprobado", tipo: "texto", valor: "right turn" },
      DISTINTIVO,
    ],
    modelo: "Runway three four, cleared for take-off, right turn, Avianca four five two.",
    explicacion:
      "Pediste virar a la derecha después del despegue y te lo aprueban junto con la autorización. Colacionas la pista, la autorización y el viraje, como en el ejemplo del manual (Doc 9432 4.5.9).",
  },
  {
    tipo: "readback",
    id: "r15",
    fuente: "Doc 9432 4.5.7",
    transmision: G.rbCondicionalAtr,
    elementos: [
      { id: "condicion", etiqueta: "Condición", tipo: "texto", valor: "behind the landing ATR", alternativas: ["behind the ATR"] },
      { id: "accion", etiqueta: "Autorización", tipo: "texto", valor: "line up and wait" },
      DISTINTIVO,
    ],
    modelo: "Behind the landing ATR, line up and wait behind, Avianca four five two.",
    explicacion:
      "Autorización condicional: distintivo, condición, autorización y la condición otra vez (Doc 9432 4.5.7). Solo vale si tienes el ATR a la vista; si no lo ves, no la aceptes: dilo.",
  },
  {
    tipo: "readback",
    id: "r16",
    fuente: "Doc 9432 4.2.1",
    transmision: G.cpInfoSalida19,
    elementos: [
      { id: "pista", etiqueta: "Pista", tipo: "pista", valor: "19" },
      { id: "qnh", etiqueta: "QNH", tipo: "qnh", valor: "1012" },
      DISTINTIVO,
    ],
    modelo: "Runway one niner, QNH one zero one two, will call for start up, Avianca four five two.",
    explicacion:
      "De toda la información de salida se colacionan la pista y el QNH, como en el ejemplo del manual (Doc 9432 4.2.1). «Will call for start up» avisa que la puesta en marcha la pides después.",
  },
  {
    tipo: "readback",
    id: "r17",
    fuente: "Doc 9432 2.8.3.5 a, 2.8.3.6 y 2.8.3.7",
    transmision: G.cpAutColinton,
    elementos: [
      { id: "limite", etiqueta: "Límite", tipo: "texto", valor: "Colinton" },
      { id: "ruta", etiqueta: "Ruta", tipo: "texto", valor: "Bravo two" },
      { id: "nivel", etiqueta: "Nivel", tipo: "nivel", valor: "FL330" },
      { id: "salida", etiqueta: "Salida", tipo: "texto", valor: "TOLEX two Bravo" },
      { id: "squawk", etiqueta: "Squawk", tipo: "squawk", valor: "4621" },
      DISTINTIVO,
    ],
    modelo:
      "Cleared to Colinton via Bravo two, flight level three three zero, TOLEX two Bravo departure, squawk four six two one, Avianca four five two.",
    explicacion:
      "La autorización de ruta se colaciona entera y en el mismo orden (Doc 9432 2.8.3.5 a). Si solo repites el nivel y el código, el controlador no puede comprobar que tienes cargada la ruta y la salida correctas.",
  },
  {
    tipo: "readback",
    id: "r18",
    fuente: "Doc 9432 4.5.12",
    transmision: G.rbRegresoPlataforma,
    elementos: [
      { id: "salida", etiqueta: "Salida de pista", tipo: "texto", valor: "next right" },
      { id: "plataforma", etiqueta: "Destino", tipo: "texto", valor: "return to ramp" },
      { id: "frecuencia", etiqueta: "Frecuencia", tipo: "frecuencia", valor: "121.6" },
      DISTINTIVO,
    ],
    modelo: "Next right, return to ramp, one two one decimal six, Avianca four five two.",
    explicacion:
      "Después de interrumpir un despegue y pedir el regreso, la torre te saca de la pista y te pasa a Superficie. Colacionas la salida, el destino y la frecuencia (Doc 9432 4.5.12).",
  },
  {
    tipo: "readback",
    id: "r19",
    fuente: "Doc 9432 4.9",
    transmision: G.rbPuesto14,
    elementos: [
      { id: "puesto", etiqueta: "Puesto", tipo: "texto", valor: "stand one four" },
      { id: "calle", etiqueta: "Calle de rodaje", tipo: "texto", valor: "taxiway Delta" },
      DISTINTIVO,
    ],
    modelo: "Stand one four via taxiway Delta, Avianca four five two.",
    explicacion: "Rodaje a plataforma después del aterrizaje: puesto y ruta, como en el ejemplo del manual (Doc 9432 4.9).",
  },
  {
    tipo: "readback",
    id: "r20",
    fuente: "Doc 9432 6.3.4",
    transmision: G.rbTresSesenta,
    elementos: [{ id: "orbita", etiqueta: "Viraje", tipo: "texto", valor: "three sixty turn right" }, DISTINTIVO],
    modelo: "Three sixty turn right, Avianca four five two.",
    explicacion:
      "Un viraje completo por la derecha para secuencia (Doc 9432 6.3.4). El lado importa: colaciónalo tal como te lo dieron.",
  },
]

// ─── 3. ¿Es para mí? ─────────────────────────────────────────────────────────

export const CM_ES_PARA_MI: EjEsParaMi[] = [
  {
    tipo: "esParaMi",
    id: "e01",
    fuente: "Doc 9432 2.8.2.1, 3.3.3.2, 6.3.1 y 6.5.2",
    repeticiones: 0,
    distintivo: "AVIANCA 452",
    transmisiones: [
      { transmision: T.e1a, paraMi: false },
      { transmision: T.e1b, paraMi: true },
      { transmision: T.e1c, paraMi: false },
      { transmision: T.e1d, paraMi: true },
      { transmision: T.e1e, paraMi: false },
      { transmision: T.e1f, paraMi: true },
    ],
    explicacion:
      "Con distintivos parecidos el ATC puede ordenar cambiar temporalmente el tipo de distintivo (Doc 9432 2.7.2.3). Mientras tanto, escucha el distintivo completo antes de la instrucción: 452, no 425 ni 542.",
  },
  {
    tipo: "esParaMi",
    id: "e02",
    fuente: "Doc 9432 3.3.3.2, 3.3.3.3, 6.3.2 y 6.5.2",
    repeticiones: 0,
    distintivo: "AVIANCA 452",
    transmisiones: [
      { transmision: T.e2a, paraMi: false },
      { transmision: T.e2b, paraMi: true },
      { transmision: T.e2c, paraMi: false },
      { transmision: T.e2d, paraMi: true },
    ],
    explicacion:
      "Con la radio sucia el distintivo es lo primero que se pierde. Si dudas de que era para ti, no ejecutes: pregunta (Doc 9432 2.8.1.4).",
  },
  // ── Guion completo ──
  {
    tipo: "esParaMi",
    id: "e03",
    fuente: "Doc 9432 2.8.2.1, 3.3.3.1, 6.3.1 y 6.5.2",
    repeticiones: 0,
    distintivo: "AVIANCA 452",
    transmisiones: [
      { transmision: G.e3a, paraMi: false },
      { transmision: G.e3b, paraMi: true },
      { transmision: G.e3c, paraMi: false },
      { transmision: G.e3d, paraMi: true },
    ],
    explicacion:
      "Solo hay otro avión, el 542: mismas cifras en otro orden. El distintivo va primero en cada transmisión del ATC; escúchalo entero antes de pensar en la instrucción.",
  },
  {
    tipo: "esParaMi",
    id: "e04",
    fuente: "Doc 9432 3.3.3.1, 6.3.1 y 6.5.2",
    repeticiones: 0,
    distintivo: "AVIANCA 452",
    transmisiones: [
      { transmision: G.e4a, paraMi: false },
      { transmision: G.e4b, paraMi: true },
      { transmision: G.e4c, paraMi: false },
      { transmision: G.e4d, paraMi: true },
      { transmision: G.e4e, paraMi: false },
    ],
    explicacion:
      "El 425 empieza igual que tú: «four». La diferencia está en el segundo y el tercer dígito. Tu colación termina con tu distintivo justamente para que el ATC note si respondió el avión equivocado (Doc 9432 2.8.3.4 y 2.8.3.7).",
  },
  {
    tipo: "esParaMi",
    id: "e05",
    fuente: "Doc 9432 2.8.2.1, 3.3.3.1, 3.3.3.3 y 6.3.1",
    repeticiones: 0,
    distintivo: "AVIANCA 452",
    transmisiones: [
      { transmision: G.e5a, paraMi: true },
      { transmision: G.e5b, paraMi: false },
      { transmision: G.e5c, paraMi: false },
      { transmision: G.e5d, paraMi: true },
      { transmision: G.e5e, paraMi: false },
    ],
    explicacion:
      "Tres parecidos en la misma salida: 45, 542 y 425. El «Avianca four five» es el más traicionero: suena a tu distintivo cortado. Un distintivo con número de vuelo no se abrevia (Doc 9432 2.7.2.2 c), así que «four five» no eres tú.",
  },
  {
    tipo: "esParaMi",
    id: "e06",
    fuente: "Doc 9432 4.4.2, 4.5.3, 4.7.1 y 4.9",
    repeticiones: 0,
    distintivo: "AVIANCA 452",
    transmisiones: [
      { transmision: G.e6a, paraMi: true },
      { transmision: G.e6b, paraMi: false },
      { transmision: G.e6c, paraMi: false },
      { transmision: G.e6d, paraMi: false },
      { transmision: G.e6e, paraMi: true },
    ],
    explicacion:
      "En la torre el error cuesta más: si tomas para ti el «cleared to land» o el rodaje de otro, estás en la pista equivocada. Tuyas son dos: esperar fuera de la 27 y, cuando el 425 ya salió, entrar y esperar.",
  },
  {
    tipo: "esParaMi",
    id: "e07",
    fuente: "Doc 9432 2.8.2.1, 3.3.3.2, 3.3.3.3 y 6.3.1",
    repeticiones: 0,
    distintivo: "AVIANCA 452",
    transmisiones: [
      { transmision: G.e7a, paraMi: false },
      { transmision: G.e7b, paraMi: true },
      { transmision: G.e7c, paraMi: false },
      { transmision: G.e7d, paraMi: true },
      { transmision: G.e7e, paraMi: false },
    ],
    explicacion:
      "Radio sucia y cuatro distintivos. Si no oíste el tuyo completo, no ejecutes: pide que repitan (Doc 9432 2.8.1.4). Con distintivos parecidos, el ATC puede ordenar cambiar temporalmente el tipo de distintivo (2.7.2.3).",
  },
  {
    tipo: "esParaMi",
    id: "e08",
    fuente: "Doc 9432 2.8.2.1, 6.3.1, 6.5.2 y 7.3.1",
    repeticiones: 0,
    distintivo: "AVIANCA 452",
    transmisiones: [
      { transmision: G.e8a, paraMi: false },
      { transmision: G.e8b, paraMi: true },
      { transmision: G.e8c, paraMi: false },
      { transmision: G.e8d, paraMi: false },
      { transmision: G.e8e, paraMi: true },
      { transmision: G.e8f, paraMi: false },
    ],
    explicacion:
      "El más difícil: el 425 recibe la misma instrucción de rumbo que tú, y el 542 el mismo QNH. Si el valor te suena conocido, eso no dice nada: lo que decide es el distintivo.",
  },
]

// ─── 4. Hearback ─────────────────────────────────────────────────────────────

export const CM_HEARBACK: EjHearback[] = [
  {
    tipo: "hearback",
    id: "h01",
    fuente: "Doc 9432 3.3.3.3",
    instruccion: T.h1Atc,
    colacion: T.h1Pm,
    elementos: [
      { id: "nivel", etiqueta: "Nivel autorizado" },
      { id: "condicion", etiqueta: "Hasta pasar" },
      { id: "distintivo", etiqueta: "Distintivo" },
    ],
    error: null,
    explicacion: "La colación trae el nivel, la condición y el distintivo tal como los dio el controlador.",
  },
  {
    tipo: "hearback",
    id: "h02",
    fuente: "Doc 9432 2.8.3.9",
    instruccion: T.h2Atc,
    colacion: T.h2Pm,
    elementos: [
      { id: "qnh", etiqueta: "QNH" },
      { id: "distintivo", etiqueta: "Distintivo" },
    ],
    error: "qnh",
    explicacion:
      "El ATC dio 1003 y el compañero colacionó 1013. Es el ejemplo del propio manual: el controlador respondería «negative, I say again, QNH 1003». Como PM, lo cazas tú antes.",
  },
  {
    tipo: "hearback",
    id: "h03",
    fuente: "Doc 9432 6.3.1 (colación modelo; el error es de práctica)",
    instruccion: T.h3Atc,
    colacion: T.h3Pm,
    elementos: [
      { id: "direccion", etiqueta: "Dirección del viraje" },
      { id: "rumbo", etiqueta: "Rumbo" },
      { id: "distintivo", etiqueta: "Distintivo" },
    ],
    error: "rumbo",
    explicacion: "El ATC dio rumbo 050 y el compañero colacionó 150. Un dígito cambia el viraje en cien grados.",
  },
  // ── Guion completo ──
  {
    tipo: "hearback",
    id: "h04",
    fuente: "Doc 9432 6.5.2 y 2.8.3.7",
    instruccion: G.h4Atc,
    colacion: G.h4Pm,
    elementos: [
      { id: "squawk", etiqueta: "Código SSR" },
      { id: "distintivo", etiqueta: "Distintivo" },
    ],
    error: null,
    explicacion: "Código y distintivo, tal como los dio el controlador. Una colación correcta también hay que confirmarla: no des por bueno lo que no escuchaste.",
  },
  {
    tipo: "hearback",
    id: "h05",
    fuente: "Doc 9432 2.8.2.1 (colación modelo; el error es de práctica)",
    instruccion: G.h5Atc,
    colacion: G.h5Pm,
    elementos: [
      { id: "frecuencia", etiqueta: "Frecuencia" },
      { id: "distintivo", etiqueta: "Distintivo" },
    ],
    error: "frecuencia",
    explicacion: "El ATC dio 132,1 y el compañero colacionó 132,7. Con esa frecuencia el avión se queda sin contacto: lo corriges antes de que cambie la radio.",
  },
  {
    tipo: "hearback",
    id: "h06",
    fuente: "Doc 9432 6.3.1 (colación modelo; el error es de práctica)",
    instruccion: G.h6Atc,
    colacion: G.h6Pm,
    elementos: [
      { id: "direccion", etiqueta: "Dirección del viraje" },
      { id: "rumbo", etiqueta: "Rumbo" },
      { id: "distintivo", etiqueta: "Distintivo" },
    ],
    error: "direccion",
    explicacion: "El número está bien, el lado no: el ATC dijo derecha y el compañero, izquierda. Si el ATC da el sentido del viraje, la colación lo repite.",
  },
  {
    tipo: "hearback",
    id: "h07",
    fuente: "Doc 9432 4.4.2; Doc 4444 4.5.7.5.1 b (el error es de práctica)",
    instruccion: G.h7Atc,
    colacion: G.h7Pm,
    elementos: [
      { id: "accion", etiqueta: "Instrucción" },
      { id: "pista", etiqueta: "Pista" },
      { id: "distintivo", etiqueta: "Distintivo" },
    ],
    error: "accion",
    explicacion:
      "El ATC dijo esperar fuera de la 29 y el compañero colacionó cruzarla. Es el error de colación más peligroso en tierra: acaba en una incursión en la pista. Esperar fuera y cruzar se colacionan siempre (Doc 4444 4.5.7.5.1 b).",
  },
  {
    tipo: "hearback",
    id: "h08",
    fuente: "Doc 4444 4.5.7.5.1 (nota); Doc 9432 2.4.3 (el error es de práctica)",
    instruccion: G.h8Atc,
    colacion: G.h8Pm,
    elementos: [
      { id: "altitud", etiqueta: "Altitud y referencia" },
      { id: "qnh", etiqueta: "QNH" },
      { id: "distintivo", etiqueta: "Distintivo" },
    ],
    error: "altitud",
    explicacion:
      "El ATC dio 6 000 ft con QNH 1021 y el compañero colacionó FL60. Son referencias distintas: con QNH la cifra va seguida de «feet»; «flight level» es con 1013,2 hPa (Doc 4444 4.5.7.5.1, nota). El QNH sí está bien.",
  },
  {
    tipo: "hearback",
    id: "h09",
    fuente: "Doc 9432 3.3.3.1 y 2.8.3.8 (el error es de práctica)",
    instruccion: G.h9Atc,
    colacion: G.h9Pm,
    elementos: [
      { id: "condicion", etiqueta: "Condición" },
      { id: "nivel", etiqueta: "Nivel" },
      { id: "distintivo", etiqueta: "Distintivo" },
    ],
    error: "condicion",
    explicacion:
      "Falta la condición: el ATC dijo descender después de pasar Walden y la colación suena a descenso inmediato. En el ejemplo del manual la colación empieza por la condición («after North Cross NDB…»).",
  },
  {
    tipo: "hearback",
    id: "h10",
    fuente: "Doc 9432 3.3.3.2 y 2.6 (RECLEARED) (el error es de práctica)",
    instruccion: G.h10Atc,
    colacion: G.h10Pm,
    elementos: [
      { id: "nivel", etiqueta: "Nivel" },
      { id: "distintivo", etiqueta: "Distintivo" },
    ],
    error: "nivel",
    explicacion:
      "Nueva autorización a FL290 y el compañero colacionó FL280. «Recleared» invalida lo anterior (Doc 9432 2.6): si el valor nuevo queda mal, el avión sube a un nivel que nadie autorizó.",
  },
  {
    tipo: "hearback",
    id: "h11",
    fuente: "Doc 9432 2.8.3.5 a y 2.8.3.6 (estructura; ruta, salida y código de práctica)",
    instruccion: G.h11Atc,
    colacion: G.h11Pm,
    elementos: [
      { id: "limite", etiqueta: "Límite" },
      { id: "ruta", etiqueta: "Ruta" },
      { id: "nivel", etiqueta: "Nivel" },
      { id: "salida", etiqueta: "Salida" },
      { id: "squawk", etiqueta: "Código SSR" },
      { id: "distintivo", etiqueta: "Distintivo" },
    ],
    error: "squawk",
    explicacion:
      "Todo bien hasta el código: el ATC dio 3304 y el compañero colacionó 3340. En una autorización larga el error suele estar al final, cuando la atención ya bajó. «Walden one Charlie» es una salida ficticia.",
  },
  {
    tipo: "hearback",
    id: "h12",
    fuente: "Doc 9432 4.7.1",
    instruccion: G.h12Atc,
    colacion: G.h12Pm,
    elementos: [
      { id: "pista", etiqueta: "Pista" },
      { id: "autorizacion", etiqueta: "Autorización" },
      { id: "distintivo", etiqueta: "Distintivo" },
    ],
    error: null,
    explicacion: "Correcta: pista y autorización. El viento no se colaciona, así que su ausencia no es un error (Doc 9432 4.7.1 y 2.8.3.5).",
  },
  {
    tipo: "hearback",
    id: "h13",
    fuente: "Doc 9432 4.5.8 (el error es de práctica)",
    instruccion: G.h13Atc,
    colacion: G.h13Pm,
    elementos: [
      { id: "autorizacion", etiqueta: "Autorización" },
      { id: "pista", etiqueta: "Pista" },
      { id: "distintivo", etiqueta: "Distintivo" },
    ],
    error: "pista",
    explicacion:
      "Autorizado a despegar de la 09 y el compañero dijo la 27: la misma pista en sentido contrario. Por eso la autorización lleva el número de pista (Doc 9432 4.5.8) y por eso se colaciona.",
  },
  {
    tipo: "hearback",
    id: "h14",
    fuente: "Doc 9432 2.8.2.1, 2.8.3.4 y 2.8.3.7 (el error es de práctica)",
    instruccion: G.h14Atc,
    colacion: G.h14Pm,
    elementos: [
      { id: "condicion", etiqueta: "Condición" },
      { id: "frecuencia", etiqueta: "Frecuencia" },
      { id: "distintivo", etiqueta: "Distintivo" },
    ],
    error: "distintivo",
    explicacion:
      "La colación está completa, pero termina con «Avianca four two five». El controlador puede creer que respondió otro avión. La colación termina con tu distintivo precisamente para eso (Doc 9432 2.8.3.4 y 2.8.3.7).",
  },
  {
    tipo: "hearback",
    id: "h15",
    fuente: "Doc 9432 2.8.1.6 y 6.3.1 (el error es de práctica)",
    instruccion: G.h15Atc,
    colacion: G.h15Pm,
    elementos: [
      { id: "direccion", etiqueta: "Dirección del viraje" },
      { id: "rumbo", etiqueta: "Rumbo" },
      { id: "distintivo", etiqueta: "Distintivo" },
    ],
    error: "rumbo",
    explicacion:
      "El controlador se corrigió: «correction» anula lo que venía antes y da la versión buena (Doc 9432 2.8.1.6). El rumbo es 340, no 310. El compañero se quedó con el primer número.",
  },
]

// ─── 5. ¿Qué respondes? ──────────────────────────────────────────────────────

export const CM_QUE_RESPONDES: EjQueRespondes[] = [
  {
    tipo: "queRespondes",
    id: "q01",
    fuente: "Doc 9432 3.3.3.3 y 2.8.3.10",
    situacion: "Vas pesado y no puedes apresurar el ascenso.",
    transmision: T.h1Atc,
    opciones: [
      "Unable to expedite, Avianca four five two.",
      "Roger, Avianca four five two.",
      "Wilco, Avianca four five two.",
      "Negative, Avianca four five two.",
    ],
    correcta: 0,
    explicacion:
      "Si no puedes cumplir, se dice «unable» (Doc 9432 2.8.3.10). «Wilco» sería prometer lo que no vas a hacer, y «roger» solo dice que recibiste.",
  },
  {
    tipo: "queRespondes",
    id: "q02",
    fuente: "Doc 9432 4.5.5 y 2.6",
    situacion: "Estás en el punto de espera con la lista de antes del despegue terminada.",
    transmision: T.inmediata,
    opciones: [
      "Roger, Avianca four five two.",
      "Avianca four five two, affirm.",
      "Wilco, Avianca four five two.",
      "Correct, Avianca four five two.",
    ],
    correcta: 1,
    explicacion:
      "Es una pregunta: se contesta «affirm» o «negative». «Roger» nunca responde una pregunta que pide sí o no (Doc 9432 2.6, nota a RECIBIDO).",
  },
  {
    tipo: "queRespondes",
    id: "q03",
    fuente: "Doc 9432 6.3.2",
    situacion: "Vuelas con rumbo 050.",
    transmision: T.e2b,
    opciones: [
      "Avianca four five two, heading zero five zero.",
      "Wilco, Avianca four five two.",
      "Roger, Avianca four five two.",
      "Affirm, Avianca four five two.",
    ],
    correcta: 0,
    explicacion: "«Report heading» pide un dato, no un acuse: se contesta con el rumbo (Doc 9432 6.3.2).",
  },
  // ── Guion completo ──
  {
    tipo: "queRespondes",
    id: "q04",
    fuente: "Doc 9432 3.3.3.1",
    situacion: "Vas nivelado a 5 000 ft con el QNH.",
    transmision: G.e4b,
    opciones: [
      "Avianca four five two, maintaining five thousand feet.",
      "Roger, Avianca four five two.",
      "Wilco, Avianca four five two.",
      "Affirm, Avianca four five two.",
    ],
    correcta: 0,
    explicacion: "«Report level» pide un dato: respondes con el nivel, en pies porque vas con QNH (Doc 9432 3.3.3.1). «Roger» o «wilco» no le dan nada al controlador.",
  },
  {
    tipo: "queRespondes",
    id: "q05",
    fuente: "Doc 9432 6.2.1",
    situacion: "Vuelas con rumbo 230 a 6 000 ft.",
    transmision: G.qrRumboNivel,
    opciones: [
      "Heading and level, wilco, Avianca four five two.",
      "Roger, Avianca four five two.",
      "Avianca four five two, heading two three zero at six thousand feet.",
      "Avianca four five two, two three zero, six zero.",
    ],
    correcta: 2,
    explicacion:
      "Dos datos, cada uno con su palabra: «heading» y el nivel con su unidad (Doc 9432 6.2.1). «Two three zero, six zero» obliga al controlador a adivinar cuál es cuál.",
  },
  {
    tipo: "queRespondes",
    id: "q06",
    fuente: "Doc 9432 2.8.1.2 y 2.8.1.3",
    situacion: "Vas en la frecuencia de Alexander Control y escuchas esta transmisión.",
    transmision: G.qrTodas,
    opciones: [
      "Roger, Avianca four five two.",
      "All stations, Avianca four five two, copied.",
      "Say again, Avianca four five two.",
      "No respondes: es una radiodifusión a todas las estaciones.",
    ],
    correcta: 3,
    explicacion:
      "«All stations» es información para todos; no se espera respuesta, salvo que después llamen a cada estación para pedir acuse (Doc 9432 2.8.1.3). Si todos respondieran, la frecuencia se bloquearía.",
  },
  {
    tipo: "queRespondes",
    id: "q07",
    fuente: "Doc 9432 4.10",
    situacion: "Ruedas hacia la plataforma después de aterrizar.",
    transmision: G.qrObras,
    opciones: [
      "Wilco, Avianca four five two.",
      "Holding, Avianca four five two.",
      "Roger, Avianca four five two.",
      "Affirm, Avianca four five two.",
    ],
    correcta: 2,
    explicacion:
      "Es información esencial del aeródromo, no una instrucción: basta «roger», como en el ejemplo del manual (Doc 9432 4.10). No tienes que detenerte; tienes que rodar con cuidado cerca de la puerta 12.",
  },
  {
    tipo: "queRespondes",
    id: "q08",
    fuente: "Doc 9432 6.5.2",
    situacion: "Tu transpondedor transmite altitud de presión (modo C).",
    transmision: G.qrTransponder,
    opciones: [
      "Avianca four five two, transponder Charlie.",
      "Affirm, Avianca four five two.",
      "Squawking, Avianca four five two.",
      "Roger, Avianca four five two.",
    ],
    correcta: 0,
    explicacion: "Te preguntan qué capacidad tiene tu transpondedor. «Transponder Charlie» dice que transmite altitud de presión (Doc 9432 6.5.1 y 6.5.2).",
  },
  {
    tipo: "queRespondes",
    id: "q09",
    fuente: "Doc 9432 2.8.1.5 y 2.8.1.1",
    situacion: "Llamaste a Georgetown Ground con la frecuencia cargada y te contestan esto.",
    transmision: G.qrEstacion,
    opciones: [
      "Four five two.",
      "Georgetown Ground, Avianca four five two.",
      "Say again, Avianca four five two.",
      "Roger, Georgetown Ground.",
    ],
    correcta: 1,
    explicacion:
      "El controlador no sabe quién llamó. Repites la llamada con los dos distintivos completos (Doc 9432 2.8.1.5 y 2.8.1.1). Un «four five two» suelto es justo lo que no se entendió.",
  },
  {
    tipo: "queRespondes",
    id: "q10",
    fuente: "Doc 9432 4.5.7",
    situacion: "Estás en el punto de espera y ves el ATR en final.",
    transmision: G.qrAtrVista,
    opciones: [
      "Wilco, Avianca four five two.",
      "Looking out, Avianca four five two.",
      "Roger, Avianca four five two.",
      "Avianca four five two, ATR in sight.",
    ],
    correcta: 3,
    explicacion:
      "Antes de darte una autorización condicional, el controlador comprueba que ves el tránsito (Doc 9432 4.5.7). «In sight» es lo que necesita oír. Si no lo vieras, lo dices: no se acepta una condición sobre un avión que no ves.",
  },
  {
    tipo: "queRespondes",
    id: "q11",
    fuente: "Doc 9432 4.5.10",
    situacion: "Estás alineado en la pista, todavía sin iniciar la carrera.",
    transmision: G.qrCancele,
    opciones: [
      "Holding, Avianca four five two.",
      "Taking off, Avianca four five two.",
      "Roger, cancel, Avianca four five two.",
      "Say again, Avianca four five two.",
    ],
    correcta: 0,
    explicacion:
      "Se cancela la autorización de despegue y te piden mantener posición: respondes «holding» (Doc 9432 4.5.10). El controlador repitió «cancel take-off» a propósito: no hace falta pedir que lo repita otra vez.",
  },
  {
    tipo: "queRespondes",
    id: "q12",
    fuente: "Doc 9432 4.5.11",
    situacion: "Iniciaste la carrera de despegue y vas a baja velocidad.",
    transmision: G.qrPare,
    opciones: [
      "Roger, Avianca four five two.",
      "Stopping, Avianca four five two.",
      "Holding short, Avianca four five two.",
      "Say again, Avianca four five two.",
    ],
    correcta: 1,
    explicacion:
      "La orden se repite con el distintivo porque es urgente (Doc 9432 4.5.11). Primero frenas; la respuesta es una palabra: «stopping». Después pides lo que necesites (4.5.12).",
  },
  {
    tipo: "queRespondes",
    id: "q13",
    fuente: "Doc 9432 4.4.2",
    situacion: "Estás cruzando la pista 32 con autorización.",
    transmision: G.qrApresureRodaje,
    opciones: [
      "Runway vacated, Avianca four five two.",
      "Unable, Avianca four five two.",
      "Expediting, Avianca four five two.",
      "Roger, report vacated, Avianca four five two.",
    ],
    correcta: 2,
    explicacion:
      "Ahora respondes «expediting»; «runway vacated» va después, cuando toda la aeronave haya sobrepasado el punto de espera (Doc 9432 4.4.2 y su nota). Decirlo antes le daría al controlador una pista libre que no lo está.",
  },
  {
    tipo: "queRespondes",
    id: "q14",
    fuente: "Doc 9432 4.7.1",
    situacion: "Final larga. Todavía hay un avión en la pista.",
    transmision: G.qrContinue,
    opciones: [
      "Avianca four five two.",
      "Runway one four, cleared to land, Avianca four five two.",
      "Roger, cleared to land, Avianca four five two.",
      "Wilco, landing, Avianca four five two.",
    ],
    correcta: 0,
    explicacion:
      "«Continue approach» no es autorización para aterrizar: sigues y esperas. En el ejemplo del manual el piloto responde solo con su distintivo (Doc 9432 4.7.1). Colacionar «cleared to land» sería inventarte una autorización.",
  },
  {
    tipo: "queRespondes",
    id: "q15",
    fuente: "Doc 9432 3.4.2",
    situacion: "En crucero, con vigilancia radar. Colin es el punto siguiente de tu ruta.",
    transmision: G.qrOmita,
    opciones: [
      "Roger, next Colin, Avianca four five two.",
      "Avianca four five two, wilco.",
      "Affirm, Avianca four five two.",
      "Negative, Avianca four five two.",
    ],
    correcta: 1,
    explicacion:
      "Te dispensan de notificar posición hasta el límite de la FIR y te dicen dónde está la próxima: respondes «wilco», como en el manual (Doc 9432 3.4.2). La próxima notificación, en Colin, sí la haces.",
  },
  {
    tipo: "queRespondes",
    id: "q16",
    fuente: "Doc 9432 6.2.2",
    situacion: "En ruta, con vectores del radar.",
    transmision: G.qrIdentPerdida,
    opciones: [
      "Negative radar, Avianca four five two.",
      "Identification lost, wilco, Avianca four five two.",
      "Say again, Avianca four five two.",
      "Roger, one three two decimal three five zero, Avianca four five two.",
    ],
    correcta: 3,
    explicacion:
      "Te informan que se perdió la identificación y te cambian de frecuencia. Acusas recibo y colacionas la frecuencia, como en el ejemplo del manual (Doc 9432 6.2.2). 132,350 se dice con seis dígitos (2.4.4).",
  },
  {
    tipo: "queRespondes",
    id: "q17",
    fuente: "Doc 9432 6.3.4",
    situacion: "En la llegada, con demora por tránsito.",
    transmision: G.qrOrbita,
    opciones: [
      "Orbit left, Avianca four five two.",
      "Holding, Avianca four five two.",
      "Three sixty right, Avianca four five two.",
      "Roger, Avianca four five two.",
    ],
    correcta: 0,
    explicacion:
      "Un viraje completo a la izquierda para demora; se colaciona con el lado (Doc 9432 6.3.4). «Holding» es otra cosa: mantener posición o esperar en tierra.",
  },
  {
    tipo: "queRespondes",
    id: "q18",
    fuente: "Doc 9432 6.5.1 y 6.5.2",
    situacion: "Tienes 1013 en el altímetro y vas nivelado en FL110.",
    transmision: G.qrAltimetro,
    opciones: [
      "Checked, Avianca four five two.",
      "Avianca four five two, altimeter one zero one three, flight level one one zero.",
      "Affirm, Avianca four five two.",
      "Avianca four five two, QNH one zero one three, one one thousand feet.",
    ],
    correcta: 1,
    explicacion:
      "El controlador ve en la pantalla un nivel que no le cuadra. Le das el reglaje y el nivel, como en el ejemplo del manual (Doc 9432 6.5.2). Con 1013 es nivel de vuelo, no altitud en pies.",
  },
  {
    tipo: "queRespondes",
    id: "q19",
    fuente: "Doc 9432 6.5.2",
    situacion: "El transpondedor marca falla y no responde.",
    transmision: G.qrTransponderOp,
    opciones: [
      "Affirm, Avianca four five two.",
      "Roger, Avianca four five two.",
      "Avianca four five two, negative, transponder unserviceable.",
      "Squawking, Avianca four five two.",
    ],
    correcta: 2,
    explicacion:
      "Es una pregunta de sí o no, y la respuesta es no: «negative» y el motivo (Doc 9432 6.5.2 y 2.6). Decir «affirm» para no complicarse deja al controlador con una información falsa.",
  },
  {
    tipo: "queRespondes",
    id: "q20",
    fuente: "Doc 9432 6.4.1",
    situacion: "Acabas de oír la información de tránsito. Todavía no lo has visto y empiezas a buscarlo.",
    transmision: G.qrDesconocido,
    opciones: [
      "Traffic in sight, Avianca four five two.",
      "Looking out, Avianca four five two.",
      "Roger, Avianca four five two.",
      "Wilco, Avianca four five two.",
    ],
    correcta: 1,
    explicacion:
      "«Looking out» dice que lo estás buscando (Doc 9432 6.4.1). Cuando lo veas, avisas «traffic in sight». Decir que lo ves antes de verlo es la peor opción.",
  },
  {
    tipo: "queRespondes",
    id: "q21",
    fuente: "Doc 9432 7.3.1; Doc 4444 4.11.2.1.1",
    situacion: "Ya colacionaste la frecuencia y cambiaste. Vas en FL90, con la información Echo del ATIS, estimando North Cross a los 52.",
    transmision: G.qrContactoAprox,
    opciones: [
      "Approach, go ahead, Avianca four five two.",
      "Avianca four five two, with you.",
      "Georgetown Approach, Avianca four five two, flight level niner zero, estimating North Cross five two, information Echo.",
      "Georgetown Approach, Avianca four five two, request descent.",
    ],
    correcta: 2,
    explicacion:
      "En la llamada inicial después de cambiar de frecuencia va el nivel (Doc 4444 4.11.2.1.1). El manual la arma con estación, distintivo, nivel, estimada y la letra del ATIS (Doc 9432 7.3.1).",
  },
  {
    tipo: "queRespondes",
    id: "q22",
    fuente: "Doc 9432 7.3.1",
    situacion: "Llegas alineado con la 32 y prefieres entrar directo al ILS.",
    transmision: G.qrPreveaIls32,
    opciones: [
      "Runway three two, QNH one zero one seven, request straight-in ILS approach, Avianca four five two.",
      "Roger, straight-in, Avianca four five two.",
      "Avianca four five two, cleared straight-in ILS.",
      "Request straight-in, Avianca four five two.",
    ],
    correcta: 0,
    explicacion:
      "Colacionas lo que se colaciona siempre (pista y QNH) y después pides. Así lo hace el ejemplo del manual (Doc 9432 7.3.1). La última opción pide bien pero se come la colación.",
  },
  {
    tipo: "queRespondes",
    id: "q23",
    fuente: "Doc 9432 4.7.2",
    situacion: "Pediste una pasada baja porque el tren izquierdo no marca abajo y asegurado.",
    transmision: G.dsPasadaBaja,
    opciones: [
      "Roger, Avianca four five two.",
      "Low pass, Avianca four five two.",
      "Runway one four, cleared to land, Avianca four five two.",
      "Runway one four, not below five hundred feet, wilco, Avianca four five two.",
    ],
    correcta: 3,
    explicacion:
      "La pista y la restricción de altura se colacionan; el «wilco» cubre el «report final», como en el ejemplo del manual (Doc 9432 4.7.2). Es una pasada baja: no te autorizaron a aterrizar.",
  },
  {
    tipo: "queRespondes",
    id: "q24",
    fuente: "Doc 9432 2.8.1.6 y 6.3.1",
    situacion: "Vuelas con rumbo 020.",
    transmision: G.h15Atc,
    opciones: [
      "Left heading three one zero, Avianca four five two.",
      "Left heading three four zero, Avianca four five two.",
      "Correction, Avianca four five two.",
      "Roger, Avianca four five two.",
    ],
    correcta: 1,
    explicacion:
      "«Correction» dice que hubo un error y lo que sigue es la versión correcta (Doc 9432 2.8.1.6). Colacionas solo el valor bueno: izquierda, rumbo 340.",
  },
  {
    tipo: "queRespondes",
    id: "q25",
    fuente: "Doc 9432 2.8.2.2",
    situacion: "Estás en la aproximación final, con la frecuencia muy cargada.",
    transmision: G.qrQuedeEscucha,
    opciones: [
      "Georgetown Tower, Avianca four five two, final.",
      "One one eight decimal niner, Avianca four five two.",
      "Roger, contacting Tower, Avianca four five two.",
      "Monitoring, Avianca four five two.",
    ],
    correcta: 1,
    explicacion:
      "«Stand by for» significa quedar en escucha: cambias de frecuencia y esperas a que la torre te llame (Doc 9432 2.8.2.2). Colacionas la frecuencia. Llamar tú de inmediato es lo que la instrucción evita.",
  },
]

// ─── 6. Desármala ────────────────────────────────────────────────────────────

export const CM_DESARMALA: EjDesarmala[] = [
  {
    tipo: "desarmala",
    id: "d01",
    fuente: "Doc 9432 3.3.3.1",
    transmision: T.cruzDelNorte,
    fichas: [
      { id: "cs", texto: "AVIANCA 452", categoria: "distintivo" },
      { id: "cond", texto: "AFTER PASSING NORTH CROSS NDB", categoria: "condicion" },
      { id: "acc", texto: "DESCEND", categoria: "accion" },
      { id: "val", texto: "FL 80", categoria: "valor" },
    ],
    explicacion: "La condición va antes de la acción: no se desciende hasta pasar el NDB. Es lo primero que se pierde si solo se escucha el número.",
  },
  {
    tipo: "desarmala",
    id: "d02",
    fuente: "Doc 9432 7.1.2",
    transmision: T.salidaRumbo,
    fichas: [
      { id: "cs", texto: "AVIANCA 452", categoria: "distintivo" },
      { id: "acc", texto: "TURN RIGHT", categoria: "accion" },
      { id: "val", texto: "HEADING 040", categoria: "valor" },
      { id: "cond", texto: "UNTIL PASSING FL 70", categoria: "condicion" },
      { id: "sig", texto: "THEN DIRECT WICKEN VOR", categoria: "siguiente" },
    ],
    explicacion: "Cinco piezas: quién, qué, cuánto, hasta cuándo y qué sigue. La siguiente acción ya viene autorizada: no hay que esperar otra llamada.",
  },
  {
    tipo: "desarmala",
    id: "d03",
    fuente: "Doc 9432 4.5.6",
    transmision: T.despegue24,
    fichas: [
      { id: "cs", texto: "AVIANCA 452", categoria: "distintivo" },
      { id: "val", texto: "RUNWAY 24", categoria: "valor" },
      { id: "acc", texto: "CLEARED FOR TAKE-OFF", categoria: "accion" },
      { id: "sig", texto: "REPORT AIRBORNE", categoria: "siguiente" },
    ],
    explicacion:
      "La palabra «take-off» solo se usa para autorizar o cancelar el despegue (Doc 9432 2.8.3.3). La pista va con la autorización y se colaciona.",
  },
  // ── Guion completo ──
  {
    tipo: "desarmala",
    id: "d04",
    fuente: "Doc 9432 3.3.3.1",
    transmision: G.rbAscenso110,
    fichas: [
      { id: "cs", texto: "AVIANCA 452", categoria: "distintivo" },
      { id: "acc", texto: "CLIMB", categoria: "accion" },
      { id: "val", texto: "FL 110", categoria: "valor" },
    ],
    explicacion: "La forma más simple: quién, qué y cuánto. Todas las demás le agregan piezas a esta.",
  },
  {
    tipo: "desarmala",
    id: "d05",
    fuente: "Doc 9432 2.8.2.1",
    transmision: G.rbTorre1189,
    fichas: [
      { id: "cs", texto: "AVIANCA 452", categoria: "distintivo" },
      { id: "acc", texto: "CONTACT", categoria: "accion" },
      { id: "dep", texto: "GEORGETOWN TOWER", categoria: "valor" },
      { id: "frec", texto: "118.9", categoria: "valor" },
    ],
    explicacion: "Dos valores: a quién y en qué frecuencia. «Contact» es establecer comunicación (Doc 9432 2.6): llamas tú.",
  },
  {
    tipo: "desarmala",
    id: "d06",
    fuente: "Doc 9432 3.3.3.3",
    transmision: G.rbApresureDescenso,
    fichas: [
      { id: "cs", texto: "AVIANCA 452", categoria: "distintivo" },
      { id: "acc", texto: "EXPEDITE DESCENT", categoria: "accion" },
      { id: "val", texto: "FL 120", categoria: "valor" },
    ],
    explicacion: "«Expedite» cambia cómo haces la acción (más rápido que lo normal), no el valor. El nivel autorizado sigue siendo uno solo: FL120.",
  },
  {
    tipo: "desarmala",
    id: "d07",
    fuente: "Doc 9432 3.3.3.1",
    transmision: G.rbTrasMarlo,
    fichas: [
      { id: "cs", texto: "AVIANCA 452", categoria: "distintivo" },
      { id: "cond", texto: "AFTER PASSING MARLO", categoria: "condicion" },
      { id: "acc", texto: "CLIMB", categoria: "accion" },
      { id: "val", texto: "FL 260", categoria: "valor" },
    ],
    explicacion: "La condición va antes de la acción y la frena: no subes hasta pasar Marlo (lugar ficticio del manual).",
  },
  {
    tipo: "desarmala",
    id: "d08",
    fuente: "Doc 9432 4.4.2",
    transmision: G.rbCruce11,
    fichas: [
      { id: "cs", texto: "AVIANCA 452", categoria: "distintivo" },
      { id: "acc", texto: "CROSS", categoria: "accion" },
      { id: "val", texto: "RUNWAY 11", categoria: "valor" },
      { id: "sig", texto: "REPORT VACATED", categoria: "siguiente" },
    ],
    explicacion: "Lo que sigue es un aviso tuyo: para el manual, la pista queda libre cuando toda la aeronave sobrepasó el punto de espera (Doc 9432 4.4.2, nota).",
  },
  {
    tipo: "desarmala",
    id: "d09",
    fuente: "Doc 9432 2.8.2.1",
    transmision: G.rbCuandoPase,
    fichas: [
      { id: "cs", texto: "AVIANCA 452", categoria: "distintivo" },
      { id: "cond", texto: "WHEN PASSING FL 80", categoria: "condicion" },
      { id: "acc", texto: "CONTACT", categoria: "accion" },
      { id: "dep", texto: "ALEXANDER CONTROL", categoria: "valor" },
      { id: "frec", texto: "124.350", categoria: "valor" },
    ],
    explicacion: "La condición está antes de la acción: el cambio de frecuencia espera hasta FL80. Quien cambia antes deja el sector sin avisar.",
  },
  {
    tipo: "desarmala",
    id: "d10",
    fuente: "Doc 9432 3.3.3.3",
    transmision: G.dsAscensoApresure,
    fichas: [
      { id: "cs", texto: "AVIANCA 452", categoria: "distintivo" },
      { id: "acc", texto: "CLIMB", categoria: "accion" },
      { id: "val", texto: "FL 210", categoria: "valor" },
      { id: "acc2", texto: "EXPEDITE", categoria: "accion" },
      { id: "cond", texto: "UNTIL PASSING FL 150", categoria: "condicion" },
    ],
    explicacion: "Dos acciones: subir a FL210 y apresurar. La condición limita solo la segunda: pasado FL150 sigues al régimen normal hasta FL210.",
  },
  {
    tipo: "desarmala",
    id: "d11",
    fuente: "Doc 9432 4.9",
    transmision: T.primeraDerecha,
    fichas: [
      { id: "cs", texto: "AVIANCA 452", categoria: "distintivo" },
      { id: "acc", texto: "TAKE FIRST RIGHT", categoria: "accion" },
      { id: "cond", texto: "WHEN VACATED", categoria: "condicion" },
      { id: "sig", texto: "CONTACT GROUND", categoria: "siguiente" },
      { id: "val", texto: "118.350", categoria: "valor" },
    ],
    explicacion: "La siguiente acción ya viene dada con su condición: cambias a Superficie cuando dejas libre la pista, no antes (Doc 9432 4.9).",
  },
  {
    tipo: "desarmala",
    id: "d12",
    fuente: "Doc 9432 4.5.7",
    transmision: G.rbCondicionalAtr,
    fichas: [
      { id: "cs", texto: "AVIANCA 452", categoria: "distintivo" },
      { id: "cond", texto: "BEHIND THE LANDING ATR", categoria: "condicion" },
      { id: "acc", texto: "LINE UP AND WAIT", categoria: "accion" },
      { id: "cond2", texto: "BEHIND", categoria: "condicion" },
    ],
    explicacion:
      "El orden es fijo en una autorización condicional: distintivo, condición, autorización y la condición otra vez (Doc 9432 4.5.7). Esa repetición final está para que no se pierda.",
  },
  {
    tipo: "desarmala",
    id: "d13",
    fuente: "Doc 9432 4.5.9",
    transmision: G.cpDespegue09,
    fichas: [
      { id: "cs", texto: "AVIANCA 452", categoria: "distintivo" },
      { id: "acc", texto: "CLIMB STRAIGHT AHEAD", categoria: "accion" },
      { id: "cond", texto: "UNTIL 4000 FT", categoria: "condicion" },
      { id: "sig", texto: "TURNING LEFT", categoria: "siguiente" },
      { id: "val", texto: "RUNWAY 09", categoria: "valor" },
      { id: "aut", texto: "CLEARED FOR TAKE-OFF", categoria: "accion" },
    ],
    explicacion:
      "Las instrucciones de salida van antes de la autorización de despegue (Doc 9432 4.5.9). El viraje a la izquierda es lo que sigue, y solo después de 4 000 ft.",
  },
  {
    tipo: "desarmala",
    id: "d14",
    fuente: "Doc 9432 4.7.2",
    transmision: G.dsPasadaBaja,
    fichas: [
      { id: "cs", texto: "AVIANCA 452", categoria: "distintivo" },
      { id: "acc", texto: "CLEARED LOW PASS", categoria: "accion" },
      { id: "val", texto: "RUNWAY 14", categoria: "valor" },
      { id: "cond", texto: "NOT BELOW 500 FT", categoria: "condicion" },
      { id: "sig", texto: "REPORT FINAL", categoria: "siguiente" },
    ],
    explicacion: "«Not below» es una restricción que acompaña toda la maniobra. La autorización es para pasar bajo, no para aterrizar.",
  },
  {
    tipo: "desarmala",
    id: "d15",
    fuente: "Doc 9432 3.3.3.2, 6.3.1 y 6.5.2",
    transmision: G.cpDetengaRumboSquawk,
    fichas: [
      { id: "cs", texto: "AVIANCA 452", categoria: "distintivo" },
      { id: "acc1", texto: "STOP DESCENT", categoria: "accion" },
      { id: "val1", texto: "FL 130", categoria: "valor" },
      { id: "acc2", texto: "TURN RIGHT", categoria: "accion" },
      { id: "val2", texto: "HEADING 190", categoria: "valor" },
      { id: "acc3", texto: "SQUAWK", categoria: "accion" },
      { id: "val3", texto: "3471", categoria: "valor" },
    ],
    explicacion: "Tres pares de acción y valor en una transmisión. Desarmarla en pares es la forma de no perder ninguno al colacionar.",
  },
]

// ─── 7. Panel de cabina ──────────────────────────────────────────────────────

export const CM_PANEL: EjPanel[] = [
  {
    tipo: "panel",
    id: "p01",
    fuente: "Doc 9432 6.2.1 y 6.3.1",
    transmision: T.h3Atc,
    inicial: { hdg: 110, alt: 2500, spd: 180, vs: 0 },
    objetivo: { hdg: 50 },
    explicacion: "Rumbo 050 por la izquierda. El panel no sabe por qué lado girar: el lado lo das tú al piloto automático o al avión.",
  },
  {
    tipo: "panel",
    id: "p02",
    fuente: "Doc 9432 3.3.3.3",
    transmision: T.h1Atc,
    inicial: { hdg: 90, alt: 10000, spd: 250, vs: 0 },
    objetivo: { alt: 24000 },
    altEnNivel: true,
    explicacion: "Lo que se selecciona es el nivel autorizado, FL240. El FL180 es solo hasta dónde apresurar.",
  },
  {
    tipo: "panel",
    id: "p03",
    fuente: "Doc 9432 7.3.1",
    transmision: T.llegadaDescenso,
    inicial: { hdg: 240, alt: 8000, spd: 250, vs: 0 },
    objetivo: { alt: 4000 },
    explicacion: "4000 pies con QNH 1005. La altitud va en pies: por debajo del nivel de transición ya no es un nivel de vuelo.",
  },
  // ── Guion completo ──
  {
    tipo: "panel",
    id: "p04",
    fuente: "Doc 9432 6.3.1",
    transmision: G.rbRumbo160,
    inicial: { hdg: 90, alt: 6000, spd: 210, vs: 0 },
    objetivo: { hdg: 160 },
    explicacion: "Rumbo 160. Solo cambia el rumbo: la altitud seleccionada se queda como estaba.",
  },
  {
    tipo: "panel",
    id: "p05",
    fuente: "Doc 9432 3.3.3.1",
    transmision: G.rbAscenso110,
    inicial: { hdg: 250, alt: 7000, spd: 250, vs: 0 },
    objetivo: { alt: 11000 },
    altEnNivel: true,
    explicacion: "FL110. En el panel se selecciona el nivel autorizado, no uno intermedio.",
  },
  {
    tipo: "panel",
    id: "p06",
    fuente: "Doc 9432 3.3.2 y 3.3.3.1",
    transmision: G.pnAscenso5000,
    inicial: { hdg: 300, alt: 3000, spd: 200, vs: 0 },
    objetivo: { alt: 5000 },
    explicacion: "5 000 ft: altitud en pies, con QNH. «Five thousand» se transmite con THOUSAND (Doc 9432 2.4.3).",
  },
  {
    tipo: "panel",
    id: "p07",
    fuente: "Doc 9432 6.3.1",
    transmision: G.h6Atc,
    inicial: { hdg: 180, alt: 9000, spd: 250, vs: 0 },
    objetivo: { hdg: 220 },
    explicacion: "Rumbo 220 por la derecha: de 180 son 40° a la derecha. El panel solo recibe el número; el lado del viraje lo vigilas tú.",
  },
  {
    tipo: "panel",
    id: "p08",
    fuente: "Doc 9432 3.3.3.3",
    transmision: G.rbApresureDescenso,
    inicial: { hdg: 40, alt: 18000, spd: 280, vs: 0 },
    objetivo: { alt: 12000 },
    altEnNivel: true,
    explicacion: "FL120. «Expedite» se vuela con el régimen de descenso; lo que se selecciona es el nivel.",
  },
  {
    tipo: "panel",
    id: "p09",
    fuente: "Doc 9432 7.3.1; Doc 4444 4.10.4.5",
    transmision: G.h8Atc,
    inicial: { hdg: 120, alt: 10000, spd: 250, vs: 0 },
    objetivo: { alt: 6000 },
    explicacion:
      "6 000 ft con QNH 1021. Es la primera autorización por debajo del nivel de transición, por eso trae el QNH (Doc 4444 4.10.4.5). No es FL60.",
  },
  {
    tipo: "panel",
    id: "p10",
    fuente: "Doc 9432 3.3.3.3",
    transmision: G.dsAscensoApresure,
    inicial: { hdg: 330, alt: 11000, spd: 250, vs: 0 },
    objetivo: { alt: 21000 },
    altEnNivel: true,
    explicacion: "FL210 es el nivel autorizado. FL150 es solo hasta dónde apresurar el ascenso: si seleccionas 150, el avión se nivela donde nadie lo pidió.",
  },
  {
    tipo: "panel",
    id: "p11",
    fuente: "Doc 9432 6.7.1",
    transmision: G.pnTerreno,
    inicial: { hdg: 210, alt: 2000, spd: 200, vs: 0 },
    objetivo: { alt: 3000 },
    explicacion: "Alerta de terreno: 3 000 ft con QNH 1008, ya (Doc 9432 6.7.1). Revisa también que el altímetro tenga ese QNH.",
  },
  {
    tipo: "panel",
    id: "p12",
    fuente: "Doc 9432 6.2.1",
    transmision: G.pnIdentificacion,
    inicial: { hdg: 200, alt: 5000, spd: 220, vs: 0 },
    objetivo: { hdg: 120 },
    explicacion: "Viraje a la izquierda para identificación, hasta 120 (Doc 9432 6.2.1). El radar confirma quién eres viendo cuál de los ecos gira.",
  },
  {
    tipo: "panel",
    id: "p13",
    fuente: "Doc 9432 6.7.2",
    transmision: G.pnEvitar,
    inicial: { hdg: 280, alt: 12000, spd: 280, vs: 0 },
    objetivo: { hdg: 200 },
    altEnNivel: true,
    explicacion:
      "Maniobra de evitación: izquierda, inmediatamente, a 200 (Doc 9432 6.7.2). «Immediately» solo se usa cuando la seguridad lo exige (3.1.5): primero el viraje, después la colación.",
  },
  {
    tipo: "panel",
    id: "p14",
    fuente: "Doc 9432 3.3.3.2 y 6.3.1",
    transmision: G.cpDetengaRumboSquawk,
    inicial: { hdg: 150, alt: 9000, spd: 280, vs: 0 },
    objetivo: { alt: 13000, hdg: 190 },
    altEnNivel: true,
    explicacion:
      "Dos perillas: el nivel seleccionado sube de FL90 a FL130, donde te detienen, y el rumbo pasa a 190 por la derecha. El código SSR va en el transpondedor, no en este panel.",
  },
  {
    tipo: "panel",
    id: "p15",
    fuente: "Doc 9432 2.8.1.6 y 6.3.1",
    transmision: G.h15Atc,
    inicial: { hdg: 20, alt: 8000, spd: 250, vs: 0 },
    objetivo: { hdg: 340 },
    explicacion: "La versión buena es la que va después de «correction»: izquierda a 340. Si seleccionaste 310, te quedaste con la que el controlador anuló.",
  },
]

// ─── 8. Ráfaga de números ────────────────────────────────────────────────────

export const CM_RAFAGA: EjRafaga[] = [
  {
    tipo: "rafaga",
    id: "n01",
    fuente: "Doc 9432 2.8.3.7, 4.2.2, 4.5.6 y 6.3.1",
    segundos: 8,
    dictados: [
      { id: "sq", tipo: "squawk", transmision: T.squawk6402, esperado: "6402" },
      { id: "frec", tipo: "frecuencia", transmision: T.salida121, esperado: "121.750" },
      { id: "qnh", tipo: "qnh", transmision: T.qnh1009, esperado: "1009" },
      { id: "hdg", tipo: "rumbo", transmision: T.e1d, esperado: "050" },
    ],
    explicacion: "Los números se transmiten dígito a dígito (Doc 9432 2.4.2), y las frecuencias con «decimal» (2.4.4).",
  },
  {
    tipo: "rafaga",
    id: "n02",
    fuente: "Doc 9432 2.8.4.3, 4.7.1, 6.5.2 y 7.3.1",
    segundos: 8,
    dictados: [
      { id: "mat", tipo: "matricula", transmision: T.radioCheck, esperado: "GABCD" },
      { id: "frec", tipo: "frecuencia", transmision: T.torre118, esperado: "118.7" },
      { id: "sq", tipo: "squawk", transmision: T.reset6411, esperado: "6411" },
      { id: "rwy", tipo: "pista", transmision: T.aterrizaje24, esperado: "24" },
    ],
    explicacion: "La matrícula se deletrea letra por letra con el alfabeto (Doc 9432 2.3.2). Con radio sucia, apunta mientras escuchas.",
  },
  // ── Guion completo ──
  {
    tipo: "rafaga",
    id: "n03",
    fuente: "Doc 9432 2.4.2, 2.4.4, 3.3.3.1, 6.5.2 y 7.3.1",
    segundos: 10,
    dictados: [
      { id: "sq", tipo: "squawk", transmision: G.h4Atc, esperado: "5236" },
      { id: "frec", tipo: "frecuencia", transmision: G.rbTorre1189, esperado: "118.9" },
      { id: "qnh", tipo: "qnh", transmision: G.cpPreveaIls14, esperado: "1018" },
      { id: "fl", tipo: "nivel", transmision: G.rbAscenso110, esperado: "FL110" },
    ],
    explicacion: "Para empezar, radio limpia y diez segundos. Un número por transmisión: el reto es escribirlo mientras lo oyes, no después.",
  },
  {
    tipo: "rafaga",
    id: "n04",
    fuente: "Doc 9432 2.3.2, 2.4.4, 2.8.2.1, 2.8.4.1, 4.5.9, 6.2.1 y 6.5.2",
    segundos: 8,
    dictados: [
      { id: "mat", tipo: "matricula", transmision: G.rfMatricula, esperado: "GERKS" },
      { id: "hdg", tipo: "rumbo", transmision: G.pnIdentificacion, esperado: "120" },
      { id: "rwy", tipo: "pista", transmision: G.cpDespegue09, esperado: "09" },
      { id: "sq", tipo: "squawk", transmision: G.rbReset4215, esperado: "4215" },
      { id: "frec", tipo: "frecuencia", transmision: G.rbCuandoPase, esperado: "124.350" },
    ],
    explicacion:
      "Cinco tipos de número en fila. La matrícula G-ERKS es ficticia y va deletreada (Doc 9432 2.3.2). En la autorización de despegue la pista llega en medio, después de la altitud.",
  },
  {
    tipo: "rafaga",
    id: "n05",
    fuente: "Doc 9432 2.4.2, 2.4.3, 2.4.4, 3.3.3.2, 4.7.1 y 6.5.2",
    segundos: 7,
    dictados: [
      { id: "frec", tipo: "frecuencia", transmision: G.h5Atc, esperado: "132.1" },
      { id: "qnh", tipo: "qnh", transmision: G.h8Atc, esperado: "1021" },
      { id: "fl", tipo: "nivel", transmision: G.h10Atc, esperado: "FL290" },
      { id: "sq", tipo: "squawk", transmision: G.cpDetengaRumboSquawk, esperado: "3471" },
      { id: "rwy", tipo: "pista", transmision: G.h12Atc, esperado: "14" },
    ],
    explicacion:
      "Radio sucia, siete segundos y números escondidos entre otros: el QNH viene después de una altitud, el código después de un nivel y un rumbo. Si no lo escribes a tiempo, en la cabina se pide «say again» y el elemento (Doc 9432 2.8.1.4).",
  },
]

// ─── 9. ¿Estándar o plain? ───────────────────────────────────────────────────

export const CM_ESTANDAR_O_PLAIN: EjEstandarOPlain[] = [
  {
    tipo: "estandarOPlain",
    id: "s01",
    fuente: "Doc 9432 2.8.3.10",
    situacion: "Te piden cruzar WICKEN a FL150 o más alto. Con el peso de hoy no llegas; puedes mantener FL130.",
    transmision: T.imposible,
    clasificacion: "fraseologia",
    frase: "Georgetown Departure, unable to cross Wicken flight level one five zero due weight, maintaining flight level one three zero, Avianca four five two.",
    explicacion:
      "Hay fraseología para esto: «unable» y el motivo (Doc 9432 2.8.3.10). El controlador ya te dio la alternativa, así que no hace falta lenguaje claro.",
  },
  {
    tipo: "estandarOPlain",
    id: "s02",
    fuente: "Doc 9432 3.2.3 y 3.2.4 (cuándo usar lenguaje claro). Frases PLAIN LANGUAGE de práctica",
    situacion:
      "Un pasajero se desmaya. La tripulación de cabina pide que haya asistencia médica al aterrizar. El avión está bien y sigues la aproximación.",
    clasificacion: "plain",
    bloques: {
      problema: { opciones: ["Passenger no good.", "We have a sick passenger on board.", "We have a technical problem."], correcta: 1 },
      capacidad: { opciones: ["The aircraft is fully serviceable.", "Maybe we can continue.", "We are unable to continue."], correcta: 0 },
      necesidad: { opciones: ["We want a doctor now please.", "Request vectors.", "Request medical assistance on arrival."], correcta: 2 },
      intencion: { opciones: ["We go around.", "We will continue the approach.", "We will hold."], correcta: 1 },
    },
    explicacion:
      "No hay una frase OACI que lo cubra: va en lenguaje claro, pero claro, breve y sin ambigüedad (Doc 9432 3.2.3 y 3.2.4). Si la situación pide declarar urgencia, esa fraseología está en el cap. 9 del Doc 9432, que no está cargado aquí: verificar.",
  },
  // ── Guion completo ──
  {
    tipo: "estandarOPlain",
    id: "s03",
    fuente: "Doc 9432 2.8.4.1 a 2.8.4.3",
    situacion: "En plataforma, antes de pedir nada, quieres comprobar que Georgetown Tower te recibe bien en 118,9.",
    clasificacion: "fraseologia",
    frase: "Georgetown Tower, Avianca four five two, radio check one one eight decimal niner.",
    explicacion:
      "La prueba de radio tiene forma fija: estación, aeronave, «radio check» y la frecuencia (Doc 9432 2.8.4.1). La respuesta usa la escala de 1 (ininteligible) a 5 (perfectamente inteligible) (2.8.4.3).",
  },
  {
    tipo: "estandarOPlain",
    id: "s04",
    fuente: "Doc 9432 2.5.2",
    situacion: "En crucero vas a dar una hora estimada y el reloj de a bordo no coincide con el de tu compañero. Quieres la hora de Alexander Control.",
    clasificacion: "fraseologia",
    frase: "Alexander Control, Avianca four five two, request time check.",
    explicacion: "Hay frase para eso: «request time check». La dependencia da la hora redondeada al medio minuto más próximo (Doc 9432 2.5.2).",
  },
  {
    tipo: "estandarOPlain",
    id: "s05",
    fuente: "Doc 9432 4.7.2 y 4.7.3",
    situacion:
      "En la aproximación a la pista 14 el tren izquierdo no marca abajo y asegurado. Quieres que desde la torre lo miren en una pasada baja.",
    clasificacion: "fraseologia",
    frase: "Georgetown Tower, Avianca four five two, request low pass, unsafe left gear indication.",
    explicacion:
      "Aunque suene a situación rara, el manual trae la frase: «request low pass» y el motivo (Doc 9432 4.7.2). La torre te describe el tren con las frases de 4.7.3. Lo que necesites además (tiempo para la lista, servicios en tierra) ya va en lenguaje claro.",
  },
  {
    tipo: "estandarOPlain",
    id: "s06",
    fuente: "Doc 9432 6.4.2",
    situacion: "Te informaron un tránsito a las dos, a cinco millas. Ya lo tienes a la vista y el controlador te pregunta esto.",
    transmision: G.eopVectores,
    clasificacion: "fraseologia",
    frase: "Avianca four five two, negative vectors, traffic in sight.",
    explicacion:
      "Es la respuesta del ejemplo del manual (Doc 9432 6.4.2): no quieres vectores y dices por qué. «No thanks, we see him» dice lo mismo, pero no es fraseología.",
  },
  {
    tipo: "estandarOPlain",
    id: "s07",
    fuente: "Doc 9432 3.2.3 y 3.2.4; Doc 9835 4.3.4 (lenguaje claro). Frases PLAIN LANGUAGE de práctica",
    situacion:
      "En el ascenso inicial desde Georgetown se enciende el aviso de puerta de carga. La presurización está normal y el avión vuela bien. Con la lista terminada, el capitán decide regresar a Georgetown.",
    clasificacion: "plain",
    bloques: {
      problema: { opciones: ["Door is maybe open, not sure.", "We have a cargo door warning.", "We have an engine failure."], correcta: 1 },
      capacidad: {
        opciones: ["We cannot climb anymore.", "Everything is fine, no problem.", "Cabin pressure is normal and the aircraft is controllable."],
        correcta: 2,
      },
      necesidad: { opciones: ["Request vectors to return to Georgetown.", "Give us any runway.", "Request higher level."], correcta: 0 },
      intencion: { opciones: ["We will continue to Colinton.", "We will return to Georgetown.", "We will hold at TOLEX."], correcta: 1 },
    },
    explicacion:
      "No hay frase OACI para un aviso de puerta: va en lenguaje claro, claro y conciso (Doc 9835 4.3.4). Decir lo que sí funciona (presurización normal) evita que el ATC suponga lo peor. Si la situación exige declarar urgencia, esa fraseología está en el Doc 9432 cap. 9, no cargado: verificar. TOLEX es un punto ficticio.",
  },
  {
    tipo: "estandarOPlain",
    id: "s08",
    fuente: "Doc 9432 3.2.3 y 3.2.4; Doc 9835 3.3.20 y 4.3.4. Frases PLAIN LANGUAGE de práctica",
    situacion:
      "En crucero, un pasajero agresivo golpeó a un tripulante de cabina. Ya está controlado y sentado. Aterrizas en Kennington en 40 minutos y quieres que la policía espere el avión, sin cambiar el plan.",
    clasificacion: "plain",
    bloques: {
      problema: { opciones: ["A passenger is very bad person.", "We have a medical emergency.", "We have a disruptive passenger on board."], correcta: 2 },
      capacidad: {
        opciones: ["The situation is now under control.", "We are losing control of the cabin.", "Maybe under control, maybe not."],
        correcta: 0,
      },
      necesidad: { opciones: ["Please send somebody.", "Request police on arrival.", "Request immediate landing."], correcta: 1 },
      intencion: { opciones: ["We will divert to Georgetown.", "We will hold.", "We will continue to Kennington as planned."], correcta: 2 },
    },
    explicacion:
      "Tampoco hay frase normalizada. Lo que el ATC necesita: qué pasó, que está controlado, qué preparar en tierra y que el plan no cambia. El Doc 9835 (3.3.20) pide incluso en lenguaje común claridad, concisión y términos inequívocos.",
  },
  {
    tipo: "estandarOPlain",
    id: "s09",
    fuente: "Doc 9432 3.2.3 y 3.2.4; Doc 9835 4.3.4. Frases PLAIN LANGUAGE de práctica",
    situacion:
      "En la aproximación a la pista 32 sentiste un impacto de ave en la nariz. Todas las indicaciones están normales y decides continuar. Quieres que revisen la pista después de tu aterrizaje.",
    clasificacion: "plain",
    bloques: {
      problema: { opciones: ["We had a bird strike on the nose.", "Something hit us, we don't know.", "We have a technical failure."], correcta: 0 },
      capacidad: { opciones: ["We are unable to land.", "All indications are normal.", "We think maybe it is OK."], correcta: 1 },
      necesidad: { opciones: ["Request a long final.", "Request emergency services now.", "Request runway inspection after our landing."], correcta: 2 },
      intencion: { opciones: ["We will go around.", "We will continue the approach.", "We will hold."], correcta: 1 },
    },
    explicacion:
      "El aviso sirve a los que vienen detrás: puede haber restos en la pista. «All indications are normal» evita que el controlador active una emergencia que no declaraste; si algo cambia, lo dices.",
  },
  {
    tipo: "estandarOPlain",
    id: "s10",
    fuente: "Doc 9432 3.2.3 y 3.2.4; Doc 9835 4.3.4. Frases PLAIN LANGUAGE de práctica",
    situacion:
      "Rodando hacia la pista, un pasajero sufre una crisis de ansiedad y la tripulación de cabina pide volver al puesto para desembarcarlo. El avión está en servicio.",
    clasificacion: "plain",
    bloques: {
      problema: {
        opciones: ["Passenger crazy, want out.", "A passenger must leave the aircraft for medical reasons.", "We have a technical problem."],
        correcta: 1,
      },
      capacidad: { opciones: ["The aircraft is serviceable.", "We are unable to taxi.", "Maybe we can go later."], correcta: 0 },
      necesidad: { opciones: ["Request to line up now.", "Request immediate departure.", "Request taxi back to the stand."], correcta: 2 },
      intencion: {
        opciones: ["We will depart and see.", "We will disembark the passenger and then call for start up.", "We will hold on the runway."],
        correcta: 1,
      },
    },
    explicacion:
      "Una situación de rutina sin frase OACI: lenguaje claro y corto. El ATC necesita saber que el avión está bien (no hay emergencia) y qué vas a pedir después, para reorganizar la secuencia de salidas.",
  },
]

// ─── 10. Vuelo completo ──────────────────────────────────────────────────────

export const CM_VUELO_COMPLETO: EjVueloCompleto[] = [
  {
    tipo: "vueloCompleto",
    id: "v01",
    titulo: "Georgetown a Kennington (escenario de práctica)",
    fuente: "Doc 9432 caps. 2, 3, 4, 6 y 7 (cada paso cita el suyo). Valores adaptados para que el vuelo sea coherente",
    explicacion: "Diecinueve transmisiones de la autorización a la plataforma, con la radio cada vez peor.",
    pasos: [
      { fase: "Autorización", perfil: "limpia", ejercicio: CM_COPIA[0] },
      { fase: "Rodaje", perfil: "limpia", ejercicio: CM_READBACK[2] },
      { fase: "Punto de espera", perfil: "limpia", ejercicio: CM_QUE_RESPONDES[1] },
      {
        fase: "Despegue",
        perfil: "limpia",
        ejercicio: {
          tipo: "readback",
          id: "vc-despegue",
          fuente: "Doc 9432 4.5.6",
          transmision: T.despegue27,
          elementos: [
            { id: "pista", etiqueta: "Pista", tipo: "pista", valor: "27" },
            { id: "aut", etiqueta: "Autorización", tipo: "texto", valor: "cleared for take-off" },
            DISTINTIVO,
          ],
          modelo: "Runway two seven, cleared for take-off, wilco, Avianca four five two.",
          explicacion: "La autorización de despegue se colaciona con la pista (Doc 9432 2.8.3.5 b).",
        },
      },
      {
        fase: "Salida",
        perfil: "normal",
        ejercicio: {
          tipo: "rafaga",
          id: "vc-salida",
          fuente: "Doc 9432 4.5.6",
          segundos: 8,
          dictados: [{ id: "frec", tipo: "frecuencia", transmision: T.salida121, esperado: "121.750" }],
          explicacion: "El cambio de frecuencia se colaciona con la frecuencia y el distintivo.",
        },
      },
      {
        fase: "Instrucción de salida",
        perfil: "normal",
        ejercicio: {
          tipo: "panel",
          id: "vc-rumbo",
          fuente: "Doc 9432 7.1.2",
          transmision: T.salidaRumbo,
          inicial: { hdg: 270, alt: 5000, spd: 220, vs: 0 },
          objetivo: { hdg: 40 },
          explicacion: "Rumbo 040 por la derecha hasta pasar FL70.",
        },
      },
      { fase: "Frecuencia congestionada", perfil: "normal", ejercicio: CM_ES_PARA_MI[1] },
      { fase: "Ascenso", perfil: "normal", ejercicio: CM_HEARBACK[0] },
      { fase: "Descenso", perfil: "sucia", ejercicio: CM_DESARMALA[0] },
      { fase: "Vigilancia", perfil: "sucia", ejercicio: CM_QUE_RESPONDES[2] },
      { fase: "Llegada", perfil: "sucia", ejercicio: CM_COPIA[2] },
      {
        fase: "Aproximación",
        perfil: "sucia",
        ejercicio: {
          tipo: "readback",
          id: "vc-ils",
          fuente: "Doc 9432 7.3.1",
          transmision: T.ilsDirecta,
          elementos: [
            { id: "aprox", etiqueta: "Aproximación", tipo: "texto", valor: "ILS" },
            { id: "pista", etiqueta: "Pista", tipo: "pista", valor: "24" },
            DISTINTIVO,
          ],
          modelo: "Cleared straight-in ILS approach runway two four, wilco, Avianca four five two.",
          explicacion: "La autorización de aproximación se colaciona con el tipo y la pista.",
        },
      },
      {
        fase: "Cambio a torre",
        perfil: "sucia",
        ejercicio: {
          tipo: "rafaga",
          id: "vc-torre",
          fuente: "Doc 9432 7.3.1",
          segundos: 8,
          dictados: [{ id: "frec", tipo: "frecuencia", transmision: T.torre118, esperado: "118.7" }],
          explicacion: "118.7: con 5.º y 6.º dígito en cero se dicen solo los cuatro primeros (Doc 9432 2.4.4).",
        },
      },
      {
        fase: "Aterrizaje",
        perfil: "sucia",
        ejercicio: {
          tipo: "readback",
          id: "vc-aterrizaje",
          fuente: "Doc 9432 4.7.1",
          transmision: T.aterrizaje24,
          elementos: [
            { id: "pista", etiqueta: "Pista", tipo: "pista", valor: "24" },
            { id: "aut", etiqueta: "Autorización", tipo: "texto", valor: "cleared to land" },
            DISTINTIVO,
          ],
          modelo: "Runway two four, cleared to land, Avianca four five two.",
          explicacion: "La autorización para aterrizar se colaciona con la pista (Doc 9432 2.8.3.5 b). El viento no.",
        },
      },
      {
        fase: "Después del aterrizaje",
        perfil: "sucia",
        ejercicio: {
          tipo: "queRespondes",
          id: "vc-primera-derecha",
          fuente: "Doc 9432 4.9",
          situacion: "Acabas de aterrizar y vas a tomar la primera salida a la derecha.",
          transmision: T.primeraDerecha,
          opciones: [
            "Roger, Avianca four five two.",
            "First left, one one eight decimal three five, Avianca four five two.",
            "First right, wilco, one one eight decimal three five zero, Avianca four five two.",
            "Wilco, Avianca four five two.",
          ],
          correcta: 2,
          explicacion: "Se confirma la salida y la frecuencia, como en el ejemplo del manual (Doc 9432 4.9).",
        },
      },
    ],
  },
  // ── Guion completo ──
  {
    tipo: "vueloCompleto",
    id: "v02",
    titulo: "Georgetown a Colinton con la radio limpia (escenario de práctica)",
    fuente: "Doc 9432 caps. 2, 3, 4, 6 y 7 (cada paso cita el suyo). Valores de práctica",
    explicacion:
      "El primer vuelo completo: diecinueve transmisiones sin ruido, una instrucción a la vez. Sirve para aprender el orden del vuelo antes de que la radio se ensucie.",
    pasos: [
      { fase: "Información de salida", perfil: "limpia", ejercicio: delId(CM_COPIA, "c06") },
      { fase: "Autorización", perfil: "limpia", ejercicio: delId(CM_COPIA, "c08") },
      {
        fase: "Puesta en marcha",
        perfil: "limpia",
        ejercicio: {
          tipo: "readback",
          id: "v02-puesta",
          fuente: "Doc 9432 4.2.2 y 2.8.3.5 c",
          transmision: G.v2Puesta,
          elementos: [{ id: "qnh", etiqueta: "QNH", tipo: "qnh", valor: "1012" }, DISTINTIVO],
          modelo: "Start up approved, QNH one zero one two, Avianca four five two.",
          explicacion: "La puesta en marcha aprobada viene con el QNH, y el reglaje de altímetro se colaciona siempre (Doc 9432 2.8.3.5 c).",
        },
      },
      {
        fase: "Rodaje",
        perfil: "limpia",
        ejercicio: {
          tipo: "readback",
          id: "v02-rodaje",
          fuente: "Doc 9432 4.4.2",
          transmision: G.v2Rodaje,
          elementos: [
            { id: "punto", etiqueta: "Límite de rodaje", tipo: "texto", valor: "holding point" },
            { id: "pista", etiqueta: "Pista", tipo: "pista", valor: "19" },
            DISTINTIVO,
          ],
          modelo: "Via Charlie, holding point runway one niner, Avianca four five two.",
          explicacion: "El límite es el punto de espera de la 19: ahí te detienes (Doc 9432 4.4.1). La colación sigue el ejemplo del manual (4.4.2).",
        },
      },
      {
        fase: "Despegue",
        perfil: "limpia",
        ejercicio: {
          tipo: "readback",
          id: "v02-despegue",
          fuente: "Doc 9432 4.5.4",
          transmision: G.v2Despegue,
          elementos: [
            { id: "pista", etiqueta: "Pista", tipo: "pista", valor: "19" },
            { id: "aut", etiqueta: "Autorización", tipo: "texto", valor: "cleared for take-off" },
            DISTINTIVO,
          ],
          modelo: "Runway one niner, cleared for take-off, Avianca four five two.",
          explicacion: "La autorización de despegue se colaciona con la pista (Doc 9432 4.5.4 y 2.8.3.5 b).",
        },
      },
      {
        fase: "Salida",
        perfil: "limpia",
        ejercicio: {
          tipo: "rafaga",
          id: "v02-salida",
          fuente: "Doc 9432 4.5.6 y 2.4.4",
          segundos: 10,
          dictados: [{ id: "frec", tipo: "frecuencia", transmision: G.v2Salida, esperado: "124.8" }],
          explicacion: "124,800: quinto y sexto dígito en cero, se dicen cuatro (Doc 9432 2.4.4).",
        },
      },
      { fase: "Ascenso", perfil: "limpia", ejercicio: delId(CM_READBACK, "r05") },
      { fase: "Vectores", perfil: "limpia", ejercicio: delId(CM_PANEL, "p04") },
      { fase: "Código SSR", perfil: "limpia", ejercicio: delId(CM_HEARBACK, "h04") },
      { fase: "Cambio a Control", perfil: "limpia", ejercicio: delId(CM_COPIA, "c04") },
      { fase: "Crucero", perfil: "limpia", ejercicio: delId(CM_QUE_RESPONDES, "q15") },
      { fase: "Descenso", perfil: "limpia", ejercicio: delId(CM_DESARMALA, "d06") },
      { fase: "Llegada", perfil: "limpia", ejercicio: delId(CM_COPIA, "c05") },
      {
        fase: "Aproximación",
        perfil: "limpia",
        ejercicio: {
          tipo: "readback",
          id: "v02-ils",
          fuente: "Doc 9432 7.3.1",
          transmision: G.v2Ils,
          elementos: [
            { id: "aprox", etiqueta: "Aproximación", tipo: "texto", valor: "ILS" },
            { id: "pista", etiqueta: "Pista", tipo: "pista", valor: "14" },
            DISTINTIVO,
          ],
          modelo: "Cleared straight-in ILS approach runway one four, wilco, Avianca four five two.",
          explicacion: "Tipo de aproximación y pista, y el «wilco» por el «report established» (Doc 9432 7.3.1).",
        },
      },
      {
        fase: "Cambio a torre",
        perfil: "limpia",
        ejercicio: {
          tipo: "rafaga",
          id: "v02-torre",
          fuente: "Doc 9432 7.3.1 y 2.4.4",
          segundos: 10,
          dictados: [{ id: "frec", tipo: "frecuencia", transmision: G.v2Torre, esperado: "119.7" }],
          explicacion: "Frecuencia de la torre: se colaciona y se llama en cuanto cambias (Doc 9432 7.3.1).",
        },
      },
      { fase: "Aterrizaje", perfil: "limpia", ejercicio: delId(CM_HEARBACK, "h12") },
      { fase: "Rodaje a plataforma", perfil: "limpia", ejercicio: delId(CM_READBACK, "r19") },
    ],
  },
  {
    tipo: "vueloCompleto",
    id: "v03",
    titulo: "Stephenville a Kennington con la frecuencia congestionada (escenario de práctica)",
    fuente: "Doc 9432 caps. 2, 3, 4, 6 y 7 (cada paso cita el suyo). Valores de práctica",
    explicacion:
      "El vuelo difícil: dieciocho transmisiones, radio sucia desde el despegue, tres distintivos parecidos al tuyo en la misma frecuencia y un compañero que colaciona con errores.",
    pasos: [
      { fase: "Autorización", perfil: "normal", ejercicio: delId(CM_HEARBACK, "h11") },
      { fase: "Rodaje", perfil: "normal", ejercicio: delId(CM_COPIA, "c07") },
      {
        fase: "Cruce de pista",
        perfil: "normal",
        ejercicio: {
          tipo: "readback",
          id: "v03-cruce",
          fuente: "Doc 9432 4.4.2; Doc 4444 4.5.7.5.1 b",
          transmision: G.v3Cruce14,
          elementos: [
            { id: "cruce", etiqueta: "Cruzar", tipo: "texto", valor: "crossing", alternativas: ["cross"] },
            { id: "pista", etiqueta: "Pista", tipo: "pista", valor: "14" },
            DISTINTIVO,
          ],
          modelo: "Crossing runway one four, wilco, Avianca four five two.",
          explicacion: "La 14 era la pista que esperabas fuera. Ahora te autorizan a cruzarla: se colaciona con el número de pista.",
        },
      },
      { fase: "Despegue", perfil: "sucia", ejercicio: delId(CM_HEARBACK, "h13") },
      { fase: "Frecuencia congestionada", perfil: "sucia", ejercicio: delId(CM_ES_PARA_MI, "e05") },
      { fase: "Cambio a Control", perfil: "sucia", ejercicio: delId(CM_HEARBACK, "h14") },
      { fase: "Vectores", perfil: "sucia", ejercicio: delId(CM_PANEL, "p15") },
      { fase: "Descenso", perfil: "sucia", ejercicio: delId(CM_PANEL, "p14") },
      { fase: "Llegada", perfil: "sucia", ejercicio: delId(CM_READBACK, "r08") },
      {
        fase: "Aterrizaje",
        perfil: "sucia",
        ejercicio: {
          tipo: "readback",
          id: "v03-aterrizaje",
          fuente: "Doc 9432 4.7.1 y 2.8.3.5 b",
          transmision: G.v3Aterrizaje32,
          elementos: [
            { id: "pista", etiqueta: "Pista", tipo: "pista", valor: "32" },
            { id: "aut", etiqueta: "Autorización", tipo: "texto", valor: "cleared to land" },
            DISTINTIVO,
          ],
          modelo: "Runway three two, cleared to land, Avianca four five two.",
          explicacion: "Pista y autorización; el viento no se colaciona (Doc 9432 4.7.1).",
        },
      },
      { fase: "Rodaje a plataforma", perfil: "sucia", ejercicio: delId(CM_READBACK, "r19") },
    ],
  },
]

/** El ítem de un arreglo por su id. Así un vuelo no depende de la posición del ítem. */
function delId<E extends { id: string }>(lista: E[], id: string): E {
  const ej = lista.find((e) => e.id === id)
  if (!ej) throw new Error(`No existe el ítem ${id}`)
  return ej
}

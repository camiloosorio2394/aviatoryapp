/**
 * Ejercicios de práctica del módulo MEL. Formato y reglas: docs/MEL_PRACTICA.md.
 *
 * Entradas REALES: texto literal de las MMEL de la FAA (A318-A321 Rev 32 y
 * B-737 Rev 63a), con la cita en `fuente`. Son la MMEL del tipo, no la MEL de
 * un operador; cuando se usa un extracto (algunas filas), la cita lo dice.
 *
 * Entradas INVENTADAS: sin `fuente`, sin atribuirlas a ningún avión ni
 * operador («Aeronave de ejemplo»), numeradas XX-85 a XX-89, que no existen
 * en las MMEL cargadas. No traen cifras de performance ni el contenido de un
 * procedimiento (M) u (O): solo dicen que existe.
 *
 * Plazos: sistema FAA (PL-25 Rev 24). En Colombia, los de la MEL aprobada.
 */

import type {
  EjBuscaElItem,
  EjCalculaElPlazo,
  EjCombinados,
  EjImpactoOperacional,
  EjLeeLaEntrada,
  EjPodemosSalir,
  EjercicioMel,
  EntradaMel,
} from "@/lib/melPractica"

// ─── Citas ───────────────────────────────────────────────────────────────────

const A320 = "MMEL FAA A318-A321, Rev 32"
const B737 = "MMEL FAA B-737, Rev 63a"
const R32 = "rev. 32, 07/30/2025"
const R31 = "rev. 31, 08/13/2024"
const R30 = "rev. 30, 03/03/2023"
const R63 = "rev. 63, 04/03/2026"

// ─── Entradas reales: MMEL FAA A318-A321 Rev 32 ──────────────────────────────

const ATA21 = { numero: "21", titulo: "Air Conditioning" }
const ATA22 = { numero: "22", titulo: "Autoflight" }
const ATA23 = { numero: "23", titulo: "Communications" }
const ATA24 = { numero: "24", titulo: "Electrical Power" }
const ATA25 = { numero: "25", titulo: "Equipment/Furnishings" }
const ATA26 = { numero: "26", titulo: "Fire Protection" }
const ATA27 = { numero: "27", titulo: "Flight Controls" }
const ATA28 = { numero: "28", titulo: "Fuel" }
const ATA29 = { numero: "29", titulo: "Hydraulic Power" }
const ATA30 = { numero: "30", titulo: "Ice and Rain Protection" }
const ATA31 = { numero: "31", titulo: "Indicating/Recording Systems" }
const ATA32 = { numero: "32", titulo: "Landing Gear" }
const ATA33 = { numero: "33", titulo: "Lights" }
const ATA34 = { numero: "34", titulo: "Navigation" }
const ATA35 = { numero: "35", titulo: "Oxygen" }
const ATA36 = { numero: "36", titulo: "Pneumatic" }
const ATA38 = { numero: "38", titulo: "Water/Waste" }
const ATA49 = { numero: "49", titulo: "Airborne Auxiliary Power" }
const ATA52 = { numero: "52", titulo: "Doors" }
const ATA73 = { numero: "73", titulo: "Engine Fuel and Control" }

const ALT_ALERT: EntradaMel = {
  codigo: "34-42-04",
  ata: ATA34,
  titulo: "Altitude Alerting System",
  fuente: `${A320}, 34-42-04, p. 34-20 (${R32})`,
  filas: [
    {
      categoria: "A",
      instalados: "-",
      requeridos: "0",
      procedimientos: ["O"],
      observaciones:
        "May be inoperative provided: a) Autopilot with altitude hold and altitude capture operates normally, b) Enroute operations (i.e., RVSM) do not require its use, c) Airplane does not depart from a designated airport (as listed in the operator’s MEL) where repair or replacement can be made, and d) Repairs are made within 3 flight-days.",
    },
    { categoria: "C", instalados: "-", requeridos: "1", observaciones: "All but one may be inoperative." },
    {
      subitem: "1) Aural Alert",
      categoria: "C",
      instalados: "-",
      requeridos: "0",
      observaciones:
        "May be inoperative provided: a) Visual alert operates normally, and b) Autopilot with altitude hold and altitude capture operates normally.",
    },
    {
      subitem: "2) Visual Alert",
      categoria: "C",
      instalados: "-",
      requeridos: "0",
      observaciones:
        "May be inoperative provided: a) Aural alert operates normally, and b) Autopilot with altitude hold and altitude capture operates normally.",
    },
  ],
}

const RADIO_ALTIMETRO: EntradaMel = {
  codigo: "34-42-01",
  ata: ATA34,
  titulo: "Radio Altimeter (RA) Systems",
  fuente: `${A320}, 34-42-01, p. 34-18 (${R32}); extracto: sub-ítem 1)`,
  filas: [
    {
      subitem: "1) Aircraft without Mod 163323/MP P20703 (eRudder)",
      categoria: "A",
      instalados: "2",
      requeridos: "1",
      procedimientos: ["M", "O"],
      observaciones:
        "One may be inoperative provided: a) Approach minimums do not require its use, b) Both FCU channels operate normally, c) All ELACs, SECs, ADIRS, SFCC, LGCIU, and FACs operate normally, and d) Repairs are made within 2 flight-days for RA 1 and within 3 flight-days for RA 2.",
      notas: [
        "For aircraft equipped with TCAS or T2CAS and without Mod 155145/MP P13063, Mod 39146/MP P10960, Mod 152353/MP P18041, or Mod 152920/MP P12603, inoperative RA 1 renders GPWS Modes 1-5 inoperative.",
      ],
    },
  ],
}

const ADR3: EntradaMel = {
  codigo: "34-10-01",
  ata: ATA34,
  titulo: "ADIRS",
  fuente: `${A320}, 34-10-01, p. 34-8 (${R32}); extracto: sub-ítem 5)`,
  filas: [
    {
      subitem: "5) ADR 3 (except A321neo XLR)",
      categoria: "C",
      instalados: "1",
      requeridos: "0",
      procedimientos: ["M", "O"],
      observaciones:
        "May be inoperative provided: a) Enroute operations do not require its use, b) IR 1 and IR 2 are operative, c) ADR 2 is operative, and d) Approach minimums do not require its use.",
    },
  ],
}

const AUTOPILOTO: EntradaMel = {
  codigo: "22-10-01",
  ata: ATA22,
  titulo: "Autopilot Systems",
  fuente: `${A320}, 22-10-01, p. 22-1 (${R32})`,
  filas: [
    {
      categoria: "C",
      instalados: "2",
      requeridos: "1",
      procedimientos: ["O"],
      observaciones: "One may be inoperative provided approach minimums do not require its use.",
    },
    {
      categoria: "B",
      instalados: "2",
      requeridos: "0",
      procedimientos: ["O"],
      observaciones:
        "May be inoperative provided: a) Approach minimums do not require their use, b) Enroute operations do not require their use, and c) Number of flight segments and segment duration is acceptable to flightcrew.",
      notas: ["Any Mode which operates normally may be used."],
    },
  ],
}

const AP_DISC: EntradaMel = {
  codigo: "22-10-05",
  ata: ATA22,
  titulo: "AP Disengagement Warning System",
  fuente: `${A320}, 22-10-05, p. 22-2 (${R32})`,
  filas: [
    {
      categoria: "B",
      instalados: "1",
      requeridos: "0",
      procedimientos: ["O"],
      observaciones: "May be inoperative provided both autopilots are not used.",
    },
  ],
}

const TAT: EntradaMel = {
  codigo: "30-31-05",
  ata: ATA30,
  titulo: "TAT Probe Heaters",
  fuente: `${A320}, 30-31-05, p. 30-11 (${R32})`,
  filas: [
    { categoria: "C", instalados: "2", requeridos: "1", observaciones: "One may be inoperative." },
    {
      categoria: "C",
      instalados: "2",
      requeridos: "0",
      observaciones:
        "Except for ETOPS beyond 120 minutes, may be inoperative provided airplane is not operated in visible moisture or in known or forecast icing conditions.",
    },
  ],
}

const WINDOW_HEAT: EntradaMel = {
  codigo: "30-42-01",
  ata: ATA30,
  titulo: "Window Heat Computers",
  fuente: `${A320}, 30-42-01, p. 30-11 (${R32})`,
  filas: [
    {
      categoria: "C",
      instalados: "2",
      requeridos: "1",
      procedimientos: ["M"],
      observaciones:
        "Except for ETOPS beyond 120 minutes, one may be inoperative provided: a) All heaters and failure warnings on the front and sliding windows associated with operative systems are verified to operate normally, b) Airplane is not operated in known or forecast icing conditions, and c) Approach minimums do not require its use.",
    },
  ],
}

const WIPER: EntradaMel = {
  codigo: "30-45-01",
  ata: ATA30,
  titulo: "Windshield Wiper Systems",
  fuente: `${A320}, 30-45-01, p. 30-12 (${R32}); extracto: filas del sistema, sin sub-ítems`,
  filas: [
    {
      categoria: "C",
      instalados: "2",
      requeridos: "0",
      procedimientos: ["O"],
      observaciones:
        "May be inoperative provided: a) Airplane is not operated in precipitation within 5 SM of the airport of takeoff or intended landing, and b) Approach minimums do not require its use.",
    },
    {
      categoria: "C",
      instalados: "2",
      requeridos: "0",
      procedimientos: ["M", "O"],
      observaciones:
        "May be inoperative continuously running provided: a) Airplane is not operated in precipitation within 5 SM of the airport of takeoff or intended landing, b) Approach minimums do not require its use, and c) Affected wiper is deactivated.",
    },
    {
      categoria: "B",
      instalados: "2",
      requeridos: "1",
      observaciones: "One may be inoperative provided associated rain repellent system is installed and operative.",
    },
  ],
}

const RAIN_REPELLANT: EntradaMel = {
  codigo: "30-45-02",
  ata: ATA30,
  titulo: "Rain Repellant Systems",
  tripleAsterisco: true,
  fuente: `${A320}, 30-45-02, p. 30-13 (${R32})`,
  filas: [{ categoria: "D", instalados: "2", requeridos: "0", observaciones: "One or both may be inoperative." }],
}

const LANDING_LIGHTS: EntradaMel = {
  codigo: "33-40-02",
  ata: ATA33,
  titulo: "Landing Lighting System",
  fuente: `${A320}, 33-40-02, p. 33-7 (${R32})`,
  filas: [
    {
      subitem: "1) Landing Lights",
      categoria: "C",
      instalados: "2",
      requeridos: "1",
      observaciones: "One may be inoperative provided taxi and takeoff lights operate normally.",
    },
    { categoria: "C", instalados: "2", requeridos: "0", observaciones: "May be inoperative for non-night operations." },
    {
      subitem: "2) Extension/Retraction Systems",
      categoria: "C",
      instalados: "2",
      requeridos: "0",
      procedimientos: ["O"],
      observaciones: "May be inoperative in the extended position provided a 1% fuel penalty is applied for each extended light.",
    },
    {
      categoria: "C",
      instalados: "2",
      requeridos: "0",
      observaciones: "May be inoperative in the retracted position provided that the associated light is considered inoperative.",
    },
  ],
}

const TAXI_LIGHTS: EntradaMel = {
  codigo: "33-40-04",
  ata: ATA33,
  titulo: "Taxi and Takeoff Light Systems",
  fuente: `${A320}, 33-40-04, p. 33-7 (${R32})`,
  filas: [{ categoria: "C", instalados: "2", requeridos: "0", observaciones: "One or both may be inoperative." }],
}

const LOGO_LIGHTS: EntradaMel = {
  codigo: "33-40-05",
  ata: ATA33,
  titulo: "Logo Lights",
  tripleAsterisco: true,
  fuente: `${A320}, 33-40-05, p. 33-7 (${R32})`,
  filas: [{ categoria: "D", instalados: "2", requeridos: "0", observaciones: "One or both may be inoperative." }],
}

const SLIDE_LIGHTING: EntradaMel = {
  codigo: "33-50-05",
  ata: ATA33,
  titulo: "Escape Slide Lighting",
  fuente: `${A320}, 33-50-05, p. 33-10 (${R32})`,
  filas: [{ categoria: "B", instalados: "-", requeridos: "0", observaciones: "May be inoperative for non-night operations." }],
}

const NAV_DATABASE: EntradaMel = {
  codigo: "34-61-01",
  ata: ATA34,
  titulo: "Navigation Databases",
  fuente: `${A320}, 34-61-01, p. 34-34 (${R32})`,
  filas: [
    {
      categoria: "A",
      instalados: "-",
      requeridos: "0",
      observaciones:
        "May be inoperative provided: a) Operations do not require its use, b) It is not used in a primary navigation system required by 14 CFR, c) Alternate procedures are developed and used, d) The ICAO Flight Plan is updated (as required) to notify ATC of the navigation equipment status of the aircraft, and e) It is repaired within 10 flight-days.",
      notas: ["An out-of-currency or out-of-date navigation database is not authorized MMEL relief per 14 CFR."],
    },
  ],
}

const RAM_AIR: EntradaMel = {
  codigo: "21-55-01",
  ata: ATA21,
  titulo: "Emergency Ram Air Inlet",
  fuente: `${A320}, 21-55-01, p. 21-24 (${R30})`,
  filas: [
    {
      categoria: "C",
      instalados: "1",
      requeridos: "0",
      procedimientos: ["O"],
      observaciones: "Except for ETOPS and extended overwater flight, may be inoperative in the open position for unpressurized flight.",
    },
  ],
}

const BLEED_SUPPLY: EntradaMel = {
  codigo: "36-11-01",
  ata: ATA36,
  titulo: "Bleed Air Supply Systems",
  fuente: `${A320}, 36-11-01, p. 36-4 (${R31}); extracto: sub-ítem 1)`,
  filas: [
    {
      subitem: "1) A318/A319ceo/A320ceo/A321ceo Aircraft with or without Mod. 31283/MP P7125 or A319neo/A320neo/A321neo",
      categoria: "C",
      instalados: "2",
      requeridos: "1",
      procedimientos: ["O"],
      observaciones:
        "Except for ETOPS beyond 120 minutes, one may be inoperative provided: a) The associated ENG BLEED pb-sw is selected OFF, b) The aircraft is not operated in known or forecast icing conditions, c) Airplane remains at or below FL 310, and d) The X-BLEED valve selector switch is selected OPEN.",
    },
  ],
}

const PRV: EntradaMel = {
  codigo: "36-11-02",
  ata: ATA36,
  titulo: "Bleed Valves (PRV)",
  fuente: `${A320}, 36-11-02, p. 36-5 (${R31})`,
  filas: [
    {
      categoria: "C",
      instalados: "2",
      requeridos: "1",
      procedimientos: ["M", "O"],
      observaciones:
        "Except for ETOPS beyond 120 minutes, one may be inoperative secured closed provided associated bleed air supply system is considered inoperative.",
    },
  ],
}

const APU_FUEL_PUMP: EntradaMel = {
  codigo: "49-30-01",
  ata: ATA49,
  titulo: "APU Fuel Pump",
  fuente: `${A320}, 49-30-01, p. 49-2 (${R30})`,
  filas: [
    {
      categoria: "C",
      instalados: "1",
      requeridos: "0",
      observaciones: "Except for ETOPS, may be inoperative provided both engine driven generators are operative.",
    },
    {
      categoria: "A",
      instalados: "1",
      requeridos: "0",
      observaciones: "Except for ETOPS beyond 120 minutes, may be inoperative provided repairs are made within 4 flights.",
      notas: ["APU may be started using A.C. boost pump feeding left fuel manifold."],
    },
  ],
}

const FLEX: EntradaMel = {
  codigo: "73-20-05",
  ata: ATA73,
  titulo: "Flex Temp Function",
  fuente: `${A320}, 73-20-05, p. 73-2 (${R31})`,
  filas: [
    { categoria: "C", instalados: "2", requeridos: "0", observaciones: "May be inoperative provided takeoff is performed in TOGA or de-rated Mode." },
  ],
}

const OVERTHRUST: EntradaMel = {
  codigo: "73-20-11",
  ata: ATA73,
  titulo: "Engine Overthrust Protection System (A318 or A319neo/A320neo/A321neo)",
  fuente: `${A320}, 73-20-11, p. 73-2 (${R31})`,
  filas: [{ categoria: "A", instalados: "2", requeridos: "1", observaciones: "One may be inoperative for 6 flights." }],
}

const FUEL_FILTER: EntradaMel = {
  codigo: "73-30-06",
  ata: ATA73,
  titulo: "FUEL FILTER DEGRAD or FUEL FILTER PARTLY CLOGGED Cautions on ECAM EWD",
  fuente: `${A320}, 73-30-06, p. 73-7 (${R31}); extracto: sub-ítem 3)`,
  filas: [
    {
      subitem: "3) CFM LEAP-1A Engines (except A321neo XLR)",
      categoria: "A",
      instalados: "2",
      requeridos: "1",
      observaciones:
        "One may be inoperative provided: a) ENG 1(2) FUEL SENSOR FAULT caution is not displayed on EWD for opposite engine and, b) Repairs are made within 3 flights or 6 flight-hours, whichever occurs first.",
    },
    {
      categoria: "C",
      instalados: "2",
      requeridos: "1",
      procedimientos: ["M"],
      observaciones: "One may be inoperative provided associated filter is replaced before next flight and then every 100 flight-hours.",
    },
  ],
}

const AVIONICS_SMOKE: EntradaMel = {
  codigo: "26-15-01",
  ata: ATA26,
  titulo: "Avionics Smoke Detection System",
  fuente: `${A320}, 26-15-01, p. 26-3 (${R31})`,
  filas: [
    {
      categoria: "A",
      instalados: "1",
      requeridos: "0",
      procedimientos: ["O"],
      observaciones: "Except for ETOPS, may be inoperative for 3 flight-legs.",
    },
  ],
}

const O2_MANUAL: EntradaMel = {
  codigo: "35-23-01",
  ata: ATA35,
  titulo: "Passenger Oxygen Manual Control System",
  fuente: `${A320}, 35-23-01, p. 35-3 (${R32})`,
  filas: [
    {
      categoria: "C",
      instalados: "1",
      requeridos: "0",
      procedimientos: ["O"],
      observaciones: "May be inoperative provided airplane remains at or below FL 250.",
    },
  ],
}

const CENTER_TANK: EntradaMel = {
  codigo: "28-21-02",
  ata: ATA28,
  titulo: "Center Tank Systems",
  fuente: `${A320}, 28-21-02, p. 28-7 (${R32}); extracto: sub-ítem 1) a)`,
  filas: [
    { subitem: "1) Pumps" },
    {
      subitem: "a) A318/A319/A320 without ACT and without Mod. 154327/MP J3527",
      categoria: "C",
      instalados: "2",
      requeridos: "1",
      procedimientos: ["O"],
      observaciones:
        "One may be inoperative provided (when center tank fuel is required) a suitable alternate airport exists within range of wing tanks fuel loading.",
    },
    {
      categoria: "C",
      instalados: "2",
      requeridos: "0",
      procedimientos: ["O"],
      observaciones: "May be inoperative provided: a) Center tank pumps remain OFF, and b) Center tank remains empty.",
    },
    {
      categoria: "C",
      instalados: "2",
      requeridos: "0",
      procedimientos: ["O"],
      observaciones: "May be inoperative provided fuel in center tank is considered unusable and is included in ZFW and CG calculations.",
    },
  ],
}

// ─── Entradas reales: MMEL FAA B-737 Rev 63a ─────────────────────────────────

const B737_LAV_SMOKE: EntradaMel = {
  codigo: "26-16",
  ata: ATA26,
  titulo: "Lavatory Smoke Detection System",
  fuente: `${B737}, ítem 26-16, p. 26-12 (${R63}); extracto: 16-01 y 16-02`,
  filas: [
    {
      secuencia: "16-01",
      subitem: "Passenger Configuration",
      categoria: "C",
      instalados: "-",
      requeridos: "0",
      procedimientos: ["M", "O"],
      observaciones:
        "For each lavatory, lavatory smoke detection system may be inoperative provided: a) Lavatory waste receptacle is empty, b) Associated lavatory door is locked closed and placarded: “INOPERATIVE - DO NOT ENTER”, and c) Lavatory is used only by crewmembers.",
      notas: ["These provisions are not intended to prohibit lavatory use or inspection by crewmembers."],
    },
    { secuencia: "16-02", subitem: "Cargo Configuration", categoria: "D", instalados: "-", requeridos: "0", observaciones: "May be inoperative." },
  ],
}

const B737_AUX_PITOT: EntradaMel = {
  codigo: "30-05",
  ata: ATA30,
  titulo: "Pitot/Static Probe Heaters",
  fuente: `${B737}, ítem 30-05, p. 30-6 (${R63}); extracto: 05-01 y 05-01-01`,
  filas: [
    { secuencia: "05-01", subitem: "(-100/-200/-300/-400/-500)" },
    {
      secuencia: "05-01-01",
      subitem: "No. 1 Aux Pitot/Static Heater (Right Lower Probe)",
      categoria: "B",
      instalados: "1",
      requeridos: "0",
      observaciones:
        "May be inoperative provided: a) No. 2 Aux Pitot Static heater operates normally, b) RVSM operations are not conducted, and c) Airplane is not operated in known or forecast icing conditions.",
    },
  ],
}

const B737_AUTOLAND: EntradaMel = {
  codigo: "22-20",
  ata: ATA22,
  titulo: "Automatic Landing System",
  fuente: `${B737}, ítem 22-20, p. 22-11 (${R63}); extracto: 20-01 y 20-02`,
  filas: [
    {
      secuencia: "20-01",
      subitem: "*** Fail Passive",
      categoria: "C",
      instalados: "1",
      requeridos: "0",
      observaciones: "May be inoperative provided approach minimums do not require its use.",
    },
    {
      secuencia: "20-02",
      subitem: "*** Fail Operational (LAND 3) (-600/-700/-800/-900/-900ER)",
      categoria: "C",
      instalados: "1",
      requeridos: "0",
      observaciones: "May be inoperative provided approach minimums do not require its use.",
    },
  ],
}

// ─── Entradas inventadas (Aeronave de ejemplo) ───────────────────────────────

const HYD_QTY: EntradaMel = {
  codigo: "29-85-01",
  ata: ATA29,
  titulo: "Hydraulic Reservoir Quantity Indication",
  filas: [
    {
      categoria: "C",
      instalados: "3",
      requeridos: "2",
      procedimientos: ["M"],
      observaciones: "One may be inoperative provided associated reservoir quantity is verified by maintenance before each departure.",
    },
  ],
}

const CARGO_DOOR: EntradaMel = {
  codigo: "52-85-01",
  ata: ATA52,
  titulo: "Aft Cargo Door Warning",
  filas: [
    {
      categoria: "C",
      instalados: "1",
      requeridos: "0",
      procedimientos: ["M"],
      observaciones: "May be inoperative provided associated door is verified closed, latched and locked before each departure.",
    },
  ],
}

const WATER_HEATER: EntradaMel = {
  codigo: "25-85-01",
  ata: ATA25,
  titulo: "Galley Water Heater",
  filas: [
    {
      categoria: "D",
      instalados: "-",
      requeridos: "0",
      procedimientos: ["M"],
      observaciones: "May be inoperative provided associated electrical power is deactivated.",
    },
  ],
}

const INTERPHONE: EntradaMel = {
  codigo: "23-86-01",
  ata: ATA23,
  titulo: "Cabin Interphone Handsets",
  filas: [
    {
      categoria: "C",
      instalados: "-",
      requeridos: "-",
      procedimientos: ["O"],
      observaciones:
        "Individual handsets may be inoperative provided: a) At least one handset operates normally at each required flight attendant station, and b) Alternate procedures are established and used.",
    },
  ],
}

const LOUDSPEAKER: EntradaMel = {
  codigo: "23-85-01",
  ata: ATA23,
  titulo: "Cockpit Loudspeakers",
  filas: [
    {
      categoria: "C",
      instalados: "2",
      requeridos: "1",
      observaciones: "One may be inoperative provided both flight crew headsets operate normally.",
    },
  ],
}

const GALLEY_SHED: EntradaMel = {
  codigo: "24-87-01",
  ata: ATA24,
  titulo: "Galley Load Shedding Function",
  filas: [
    {
      categoria: "C",
      instalados: "1",
      requeridos: "0",
      procedimientos: ["M", "O"],
      observaciones: "May be inoperative provided: a) Galley power is deactivated, and b) (O) procedure is used.",
      notas: ["Galley power may be restored on the ground with external power connected."],
    },
  ],
}

const PACK_OUTLET: EntradaMel = {
  codigo: "21-87-01",
  ata: ATA21,
  titulo: "Pack Outlet Temperature Indication",
  filas: [
    {
      categoria: "C",
      instalados: "2",
      requeridos: "1",
      procedimientos: ["O"],
      observaciones: "One may be inoperative provided associated pack outlet temperature is monitored as specified in the (O) procedure.",
    },
  ],
}

const FUEL_USED: EntradaMel = {
  codigo: "28-86-01",
  ata: ATA28,
  titulo: "Fuel Used Indication",
  filas: [
    {
      categoria: "C",
      instalados: "2",
      requeridos: "1",
      procedimientos: ["O"],
      observaciones: "One may be inoperative provided fuel quantity indication for all tanks operates normally.",
    },
  ],
}

const CENTER_QTY: EntradaMel = {
  codigo: "28-87-01",
  ata: ATA28,
  titulo: "Center Tank Fuel Quantity Indication",
  filas: [
    {
      categoria: "C",
      instalados: "1",
      requeridos: "0",
      procedimientos: ["M", "O"],
      observaciones:
        "May be inoperative provided: a) Center tank fuel quantity is verified by a maintenance procedure before each departure, and b) (O) procedure is used.",
    },
  ],
}

const WATER_QTY: EntradaMel = {
  codigo: "38-85-01",
  ata: ATA38,
  titulo: "Potable Water Quantity Indication",
  filas: [{ categoria: "D", instalados: "1", requeridos: "0", observaciones: "May be inoperative." }],
}

const APU_BLEED: EntradaMel = {
  codigo: "49-85-01",
  ata: ATA49,
  titulo: "APU Bleed Air Supply",
  filas: [
    {
      categoria: "C",
      instalados: "1",
      requeridos: "0",
      procedimientos: ["O"],
      observaciones: "Except for ETOPS, may be inoperative provided procedures do not require its use.",
    },
  ],
}

const ENG_BLEED: EntradaMel = {
  codigo: "36-87-01",
  ata: ATA36,
  titulo: "Engine Bleed Air Supply",
  filas: [
    {
      categoria: "C",
      instalados: "2",
      requeridos: "1",
      procedimientos: ["M", "O"],
      observaciones:
        "One may be inoperative provided: a) APU bleed air supply operates normally, b) Airplane remains at or below the altitude specified in the (O) procedure, and c) Airplane is not operated in known or forecast icing conditions.",
    },
  ],
}

const READING_LIGHTS: EntradaMel = {
  codigo: "33-87-01",
  ata: ATA33,
  titulo: "Passenger Reading Lights",
  filas: [{ categoria: "D", instalados: "-", requeridos: "0", observaciones: "Individual lights may be inoperative." }],
}

const FLAP_SECUNDARIA: EntradaMel = {
  codigo: "27-85-01",
  ata: ATA27,
  titulo: "Flap Position Indication (Secondary Display)",
  filas: [
    {
      categoria: "C",
      instalados: "1",
      requeridos: "0",
      observaciones: "May be inoperative provided flap position indication on primary display operates normally.",
    },
  ],
}

const FLAP_PRIMARIA: EntradaMel = {
  codigo: "27-86-01",
  ata: ATA27,
  titulo: "Flap Position Indication (Primary Display)",
  filas: [
    {
      categoria: "C",
      instalados: "1",
      requeridos: "0",
      procedimientos: ["O"],
      observaciones: "May be inoperative provided flap position indication on secondary display operates normally.",
    },
  ],
}

// ─── a) Lee la entrada (13) ──────────────────────────────────────────────────

const SI_NO = ["Sí", "No"]

export const MEL_LEE_LA_ENTRADA: EjLeeLaEntrada[] = [
  {
    id: "alerta-altitud",
    tipo: "leeLaEntrada",
    contexto: "Tech log: «ALT ALERT INOP». Lee la primera fila, la del sistema completo.",
    entrada: ALT_ALERT,
    fila: 0,
    fuente: `${ALT_ALERT.fuente}; PL-25 Rev 24: Dash, Repair Category A, Flight-Day`,
    pasos: [
      { tipo: "toca", id: "cat", enunciado: "Toca la categoría de reparación de esta fila.", parte: "categoria" },
      {
        tipo: "elige",
        id: "inst",
        campo: "instalados",
        enunciado: "¿Qué significa el «-» en instalados?",
        opciones: [
          "Que no hay ninguno instalado en este avión",
          "Que no aplica a este avión",
          "Que puede faltar cualquier cantidad sin condiciones",
          "Que el número instalado es variable",
        ],
        correctas: [3],
      },
      {
        tipo: "elige",
        id: "plazo",
        campo: "plazo",
        enunciado: "¿Cuál es el plazo de esta fila?",
        opciones: [
          "El que dice Remarks: 3 flight-days, sin contar el día en que se anotó",
          "3 días calendario, como cualquier ítem de categoría B",
          "10 días calendario, el mismo plazo que se da a un ítem de categoría C",
          "3 vuelos, contados desde el momento en que se difirió",
        ],
        correctas: [0],
      },
      { tipo: "elige", id: "m", campo: "m", enunciado: "¿Hay procedimiento (M)?", opciones: SI_NO, correctas: [1] },
      { tipo: "elige", id: "o", campo: "o", enunciado: "¿Hay procedimiento (O)?", opciones: SI_NO, correctas: [0] },
      {
        tipo: "elige",
        id: "cond",
        campo: "condiciones",
        enunciado: "Marca todas las condiciones que pide esta fila.",
        opciones: [
          "Autopiloto con altitude hold y altitude capture operando normalmente",
          "Que la operación en ruta (RVSM) no lo requiera",
          "No salir de un aeropuerto designado en la MEL del operador donde se pueda reparar",
          "Que la alerta visual funcione",
          "Reparar en 3 flight-days",
        ],
        correctas: [0, 1, 2, 4],
      },
    ],
    explicacion:
      "La categoría A no trae plazo propio: el plazo está en Remarks («Repairs are made within 3 flight-days») y, por ser flight-days, el día del descubrimiento no cuenta (PL-25). El «-» es número variable. La alerta visual es condición del sub-ítem 1), no de esta fila. Y la condición c) es de las que se olvidan: si estás en una base donde se puede reparar, no sales con el alivio.",
  },
  {
    id: "sonda-tat",
    tipo: "leeLaEntrada",
    contexto: "Las dos calefacciones de sonda TAT fallaron. Lee la fila que aplica.",
    entrada: TAT,
    fila: 1,
    fuente: `${TAT.fuente}; PL-25 Rev 24: Icing Conditions`,
    pasos: [
      { tipo: "toca", id: "req", enunciado: "Toca el número requerido para despacho de la fila que aplica.", parte: "requeridos" },
      {
        tipo: "elige",
        id: "fila",
        campo: "configuracion",
        enunciado: "¿Por qué no sirve la primera fila?",
        opciones: [
          "Porque es de otra configuración de avión",
          "Porque no trae (M) y con las dos sondas sin calefacción hace falta",
          "Porque pide 1 operativo y hoy no queda ninguno",
          "Porque es categoría C",
        ],
        correctas: [2],
      },
      {
        tipo: "elige",
        id: "cond",
        campo: "condiciones",
        enunciado: "¿Qué pide la segunda fila? Marca todo lo que aplique.",
        opciones: [
          "Que no sea ETOPS de más de 120 minutos",
          "No volar en humedad visible",
          "No volar en engelamiento conocido o pronosticado",
          "Que un mecánico desactive las sondas",
        ],
        correctas: [0, 1, 2],
      },
      { tipo: "elige", id: "m", campo: "m", enunciado: "¿Hay procedimiento (M) en esta fila?", opciones: SI_NO, correctas: [1] },
    ],
    explicacion:
      "Con las dos inoperativas se lee la fila «C 2 0». La primera fila («C 2 1, one may be inoperative») exige que quede una. La segunda trae tres límites: nada de ETOPS de más de 120 minutos, nada de humedad visible y nada de engelamiento conocido o pronosticado. No tiene (M): no hay nada que desactivar.",
  },
  {
    id: "luz-aterrizaje-extendida",
    tipo: "leeLaEntrada",
    contexto: "Una luz de aterrizaje quedó extendida y no se retrae. Busca la fila de su mecanismo.",
    entrada: LANDING_LIGHTS,
    fila: 2,
    fuente: `${LANDING_LIGHTS.fuente}; PL-25 Rev 24: (O) Symbol`,
    pasos: [
      { tipo: "toca", id: "proc", enunciado: "Toca lo que te dice que hay un procedimiento para la tripulación.", parte: "procedimientos" },
      {
        tipo: "elige",
        id: "sistema",
        campo: "configuracion",
        enunciado: "¿Qué sub-ítem aplica?",
        opciones: ["1) Landing Lights", "2) Extension/Retraction Systems", "El ítem completo 33-40-02", "Ninguno: una luz trabada extendida no tiene alivio"],
        correctas: [1],
      },
      {
        tipo: "elige",
        id: "cond",
        campo: "condiciones",
        enunciado: "¿Qué condición trae la fila de la luz extendida?",
        opciones: [
          "Que la luz se considere inoperativa",
          "Solo operación diurna, como la fila «non-night»",
          "Que las luces de rodaje y despegue funcionen",
          "Una penalización de combustible del 1 % por cada luz extendida",
        ],
        correctas: [3],
      },
      { tipo: "elige", id: "cat", campo: "categoria", enunciado: "¿Categoría?", opciones: ["A", "B", "C", "D"], correctas: [2] },
    ],
    explicacion:
      "El problema no es la luz sino el mecanismo: sub-ítem 2). Extendida pide aplicar un 1 % de combustible por cada luz extendida (es el (O)); retraída pide considerar la luz inoperativa, y eso te devuelve al sub-ítem 1) con sus propias condiciones. La misma avería tiene dos filas según cómo quedó.",
  },
  {
    id: "computador-calefaccion-ventanas",
    tipo: "leeLaEntrada",
    contexto: "Falla uno de los dos computadores de calefacción de ventanas.",
    entrada: WINDOW_HEAT,
    fila: 0,
    fuente: `${WINDOW_HEAT.fuente}; PL-25 Rev 24: (M) Symbol`,
    pasos: [
      { tipo: "toca", id: "inst", enunciado: "Toca el número instalado.", parte: "instalados" },
      { tipo: "elige", id: "m", campo: "m", enunciado: "¿Hay procedimiento (M)?", opciones: SI_NO, correctas: [0] },
      {
        tipo: "elige",
        id: "cond",
        campo: "condiciones",
        enunciado: "Marca todas las condiciones.",
        opciones: [
          "Verificar calefactores y avisos de falla de las ventanas del sistema que queda",
          "No volar en engelamiento conocido o pronosticado",
          "Que los mínimos de aproximación no lo requieran",
          "Volar a FL 250 o por debajo",
          "No hacer ETOPS de más de 120 minutos",
        ],
        correctas: [0, 1, 2, 4],
      },
      {
        tipo: "elige",
        id: "quien",
        campo: "m",
        enunciado: "¿Quién hace la verificación a)?",
        opciones: ["Mantenimiento, por el (M)", "La tripulación en el prevuelo", "El despachador, al revisar la MEL", "Nadie: es informativa"],
        correctas: [0],
      },
    ],
    explicacion:
      "«Except for ETOPS beyond 120 minutes» va antes de «provided», pero es igual de obligatorio. La verificación a) es lo que marca el (M): la hace mantenimiento antes de usar el alivio y queda en el tech log. El piloto no la hace: la confirma.",
  },
  {
    id: "humo-lavabo-b737",
    tipo: "leeLaEntrada",
    contexto: "B737 de pasajeros: el detector de humo del lavabo trasero falla en la prueba.",
    entrada: B737_LAV_SMOKE,
    fila: 0,
    fuente: `${B737_LAV_SMOKE.fuente}; PL-25 Rev 24: Dash, NOTE`,
    pasos: [
      { tipo: "toca", id: "codigo", enunciado: "Toca la secuencia de la fila que aplica a un avión de pasajeros.", parte: "codigo" },
      {
        tipo: "elige",
        id: "inst",
        campo: "instalados",
        enunciado: "Instalados «-» y requeridos «0». ¿Qué quiere decir?",
        opciones: [
          "Que se puede salir con todos los detectores de lavabo inoperativos, sin condiciones",
          "Que no aplica a aviones de pasajeros, solo a la configuración de carga",
          "Que el número varía por avión, y cada lavabo puede quedar sin detector si se cumplen las condiciones",
          "Que se requiere un detector operativo en cada lavabo del avión",
        ],
        correctas: [2],
      },
      {
        tipo: "elige",
        id: "cond",
        campo: "condiciones",
        enunciado: "Marca las condiciones de la fila 16-01.",
        opciones: [
          "Receptáculo de desechos del lavabo vacío",
          "Puerta cerrada con seguro y placard «INOPERATIVE - DO NOT ENTER»",
          "Lavabo solo para tripulantes",
          "Extintor del lavabo verificado",
        ],
        correctas: [0, 1, 2],
      },
      {
        tipo: "elige",
        id: "nota",
        campo: "condiciones",
        enunciado: "La NOTE dice que la tripulación puede usar e inspeccionar el lavabo. ¿Es una condición?",
        opciones: ["Sí, hay que cumplirla", "No: aclara cómo se leen las condiciones"],
        correctas: [1],
      },
    ],
    explicacion:
      "En Boeing la fila se identifica por secuencia (16-01 pasajeros, 16-02 carga). La 16-02 es D sin condiciones, pero no es tu avión. En la 16-01 las tres letras son obligatorias; la NOTE informa (PL-25: una nota no es parte del proviso).",
  },
  {
    id: "sangrado-motor",
    tipo: "leeLaEntrada",
    contexto: "A320ceo sin Mod. 31283: el sistema de sangrado del motor 1 queda inoperativo.",
    entrada: BLEED_SUPPLY,
    fila: 0,
    fuente: BLEED_SUPPLY.fuente ?? "",
    pasos: [
      {
        tipo: "elige",
        id: "ata",
        campo: "ata",
        enunciado: "¿En qué capítulo ATA está?",
        opciones: ["21 Air Conditioning", "30 Ice and Rain Protection", "36 Pneumatic", "75 Bleed Air"],
        correctas: [2],
      },
      { tipo: "toca", id: "obs", enunciado: "Toca las condiciones de la fila.", parte: "observaciones" },
      {
        tipo: "elige",
        id: "cond",
        campo: "condiciones",
        enunciado: "Marca todas las condiciones.",
        opciones: [
          "ENG BLEED del lado afectado en OFF",
          "Sin engelamiento conocido o pronosticado",
          "FL 310 o por debajo",
          "Selector X-BLEED en OPEN",
          "Speedbrakes operativos",
        ],
        correctas: [0, 1, 2, 3],
      },
      { tipo: "elige", id: "o", campo: "o", enunciado: "¿Hay (O)?", opciones: SI_NO, correctas: [0] },
    ],
    explicacion:
      "Los speedbrakes aparecen en el sub-ítem 2) de la misma MMEL, que es de otra configuración. Tu fila pide cuatro cosas y además excluye ETOPS de más de 120 minutos. El techo de FL 310 cambia el plan y el combustible: es la primera conversación con despacho.",
  },
  {
    id: "ram-air-emergencia",
    tipo: "leeLaEntrada",
    contexto: "La entrada de aire de emergencia (RAM AIR) quedó abierta.",
    entrada: RAM_AIR,
    fila: 0,
    fuente: RAM_AIR.fuente ?? "",
    pasos: [
      { tipo: "toca", id: "cat", enunciado: "Toca la categoría.", parte: "categoria" },
      {
        tipo: "elige",
        id: "cond",
        campo: "condiciones",
        enunciado: "¿En qué vuelo se puede usar este alivio?",
        opciones: [
          "En cualquier vuelo presurizado, con el (O) de la tripulación",
          "Solo en vuelo no presurizado, que no sea ETOPS ni sobre agua extendido",
          "En ETOPS de hasta 120 minutos y en vuelo sobre agua",
          "Solo en vuelos de traslado sin pasajeros, presurizado o no",
        ],
        correctas: [1],
      },
      { tipo: "elige", id: "o", campo: "o", enunciado: "¿Hay (O)?", opciones: SI_NO, correctas: [0] },
      { tipo: "elige", id: "req", campo: "requeridos", enunciado: "¿Cuántas se requieren para despacho?", opciones: ["0", "1", "2", "-"], correctas: [0] },
    ],
    explicacion:
      "Requeridos 0 no quiere decir que el avión salga como siempre: el alivio es solo para vuelo no presurizado, y excluye ETOPS y vuelo extendido sobre agua. En una aerolínea de pasajeros eso deja al avión, en la práctica, para un vuelo especial.",
  },
  {
    id: "calefaccion-pitot-aux-b737",
    tipo: "leeLaEntrada",
    contexto: "B737-300: falla el calefactor de la sonda pitot/estática auxiliar No. 1.",
    entrada: B737_AUX_PITOT,
    fila: 1,
    fuente: `${B737_AUX_PITOT.fuente}; PL-25 Rev 24: Repair Category B`,
    pasos: [
      { tipo: "toca", id: "codigo", enunciado: "Toca la secuencia de la fila de este calefactor.", parte: "codigo" },
      {
        tipo: "elige",
        id: "config",
        campo: "configuracion",
        enunciado: "¿A qué modelos aplica esta fila?",
        opciones: ["A todos los B737", "Solo al -300", "-600 a -900ER", "-100 a -500"],
        correctas: [3],
      },
      {
        tipo: "elige",
        id: "plazo",
        campo: "plazo",
        enunciado: "Categoría B en el sistema FAA. ¿Plazo?",
        opciones: [
          "72 horas exactas, contadas desde la hora del reporte en el tech log",
          "3 flight-days, sin contar los días en que el avión no vuela",
          "10 días calendario, como la categoría C",
          "3 días calendario, sin contar el día en que se anotó",
        ],
        correctas: [3],
      },
      {
        tipo: "elige",
        id: "cond",
        campo: "condiciones",
        enunciado: "Marca las condiciones.",
        opciones: [
          "Calefactor auxiliar No. 2 operando normalmente",
          "No operar en RVSM",
          "Sin engelamiento conocido o pronosticado",
          "Solo de día",
        ],
        correctas: [0, 1, 2],
      },
    ],
    explicacion:
      "La fila 05-01 agrupa los modelos -100 a -500. Una categoría B vence a las 2359 del tercer día después del registro (PL-25), no 72 horas después de la hora del reporte. Y un calefactor de sonda te saca de RVSM: el alivio condiciona el nivel, no solo el clima.",
  },
  {
    id: "base-de-datos-navegacion",
    tipo: "leeLaEntrada",
    contexto: "La base de datos de navegación no carga en el FMS.",
    entrada: NAV_DATABASE,
    fila: 0,
    fuente: `${NAV_DATABASE.fuente}; PL-25 Rev 24: NOTE, Flight-Day`,
    pasos: [
      { tipo: "toca", id: "nota", enunciado: "Toca lo que excluye una base de datos vencida.", parte: "nota" },
      {
        tipo: "elige",
        id: "plazo",
        campo: "plazo",
        enunciado: "¿Plazo?",
        opciones: ["10 días calendario", "10 flight-days", "Ninguno: es categoría A", "120 días"],
        correctas: [1],
      },
      {
        tipo: "elige",
        id: "cond",
        campo: "condiciones",
        enunciado: "¿Cuáles de estas condiciones están en la fila?",
        opciones: [
          "Que la operación no la requiera",
          "Procedimientos alternos desarrollados y usados",
          "Actualizar el plan de vuelo OACI para avisar a ATC del equipo de navegación",
          "Volar solo de día",
        ],
        correctas: [0, 1, 2],
      },
      { tipo: "elige", id: "m", campo: "m", enunciado: "¿Hay (M)?", opciones: SI_NO, correctas: [1] },
    ],
    explicacion:
      "El alivio es para una base de datos inoperativa, no vencida: la NOTE dice que una desactualizada no tiene alivio MMEL. Categoría A con plazo en Remarks: 10 flight-days. La condición d) es fácil de olvidar: el plan de vuelo OACI tiene que reflejar el equipo real.",
  },
  {
    id: "cantidad-hidraulico",
    tipo: "leeLaEntrada",
    contexto: "Aeronave de ejemplo: la indicación de cantidad del depósito hidráulico 3 marca en blanco.",
    entrada: HYD_QTY,
    fila: 0,
    fuente: "PL-25 Rev 24: (M) Symbol, Repair Category C",
    pasos: [
      { tipo: "toca", id: "proc", enunciado: "Toca el símbolo que dice quién tiene trabajo antes del vuelo.", parte: "procedimientos" },
      { tipo: "elige", id: "req", campo: "requeridos", enunciado: "¿Cuántas indicaciones se requieren?", opciones: ["0", "1", "2", "3"], correctas: [2] },
      {
        tipo: "elige",
        id: "cuando",
        campo: "condiciones",
        enunciado: "¿Cada cuánto se verifica la cantidad del depósito?",
        opciones: ["Una vez, al diferir", "Una vez por día", "Antes de cada salida", "Cada 100 horas"],
        correctas: [2],
      },
      {
        tipo: "elige",
        id: "sistema",
        campo: "sistema",
        enunciado: "¿Qué está inoperativo?",
        opciones: ["La indicación de cantidad de un depósito", "La bomba del sistema 3", "El sistema hidráulico 3, con su depósito y sus bombas", "El depósito del sistema 3"],
        correctas: [0],
      },
    ],
    explicacion:
      "Lo que falla es la indicación, no el sistema: el sistema hidráulico sigue en servicio. El (M) no es de una sola vez: «before each departure» quiere decir antes de cada salida, así que en cada escala tiene que haber una verificación nueva en el tech log.",
  },
  {
    id: "telefonos-cabina",
    tipo: "leeLaEntrada",
    contexto: "Aeronave de ejemplo: no funciona un auricular del interfono de cabina.",
    entrada: INTERPHONE,
    fila: 0,
    fuente: "PL-25 Rev 24: Dash, (O) Symbol",
    pasos: [
      { tipo: "toca", id: "inst", enunciado: "Toca el número instalado.", parte: "instalados" },
      {
        tipo: "elige",
        id: "dash",
        campo: "requeridos",
        enunciado: "Requeridos «-». ¿Cuántos tienen que funcionar?",
        opciones: [
          "Ninguno: el guion quiere decir que todos pueden fallar",
          "Todos los instalados, porque el guion no fija un mínimo",
          "Uno en todo el avión, en la estación del jefe de cabina",
          "Al menos uno en cada estación de auxiliar requerida, según Remarks",
        ],
        correctas: [3],
      },
      { tipo: "elige", id: "o", campo: "o", enunciado: "¿Hay (O)?", opciones: SI_NO, correctas: [0] },
      { tipo: "elige", id: "cat", campo: "categoria", enunciado: "¿Categoría?", opciones: ["A", "B", "C", "D"], correctas: [2] },
    ],
    explicacion:
      "Con «-» el número real sale de Remarks: al menos uno por estación requerida. El (O) quiere decir que hay procedimientos alternos que la tripulación tiene que conocer (cómo se comunica la cabina con esa estación) antes de salir.",
  },
  {
    id: "desconexion-galley",
    tipo: "leeLaEntrada",
    contexto: "Aeronave de ejemplo: falla la desconexión automática de carga de los galleys.",
    entrada: GALLEY_SHED,
    fila: 0,
    fuente: "PL-25 Rev 24: (M) Symbol, (O) Symbol, NOTE",
    pasos: [
      { tipo: "toca", id: "proc", enunciado: "Toca los procedimientos asociados.", parte: "procedimientos" },
      {
        tipo: "elige",
        id: "mo",
        campo: "m",
        enunciado: "¿Quién hace qué?",
        opciones: [
          "La tripulación desactiva el galley desde la cabina de vuelo",
          "Mantenimiento desactiva la energía del galley; la tripulación usa el (O)",
          "Mantenimiento hace todo, también el procedimiento (O)",
          "Nadie: es categoría C y solo se anota en el tech log",
        ],
        correctas: [1],
      },
      { tipo: "toca", id: "nota", enunciado: "Toca lo que permite dar energía en tierra.", parte: "nota" },
      { tipo: "elige", id: "req", campo: "requeridos", enunciado: "¿Requeridos?", opciones: ["0", "1"], correctas: [0] },
    ],
    explicacion:
      "(M)(O): dos requisitos, cada uno de su dueño. La desactivación a) es trabajo de mantenimiento y queda en el tech log; el procedimiento b) es de la tripulación. La NOTE aclara un uso en tierra; no quita ninguna condición.",
  },
  {
    id: "bomba-combustible-apu",
    tipo: "leeLaEntrada",
    contexto: "La bomba de combustible de la APU no funciona. El vuelo de hoy es ETOPS de 120 minutos.",
    entrada: APU_FUEL_PUMP,
    fila: 1,
    fuente: `${APU_FUEL_PUMP.fuente}; PL-25 Rev 24: Repair Category A`,
    pasos: [
      {
        tipo: "elige",
        id: "fila",
        campo: "configuracion",
        enunciado: "¿Cuál fila permite este vuelo?",
        opciones: [
          "La C: permite ETOPS si los dos generadores de motor funcionan",
          "La A: excluye solo ETOPS de más de 120 minutos",
          "Ninguna: la bomba de la APU es obligatoria en ETOPS",
          "Las dos, y se elige la menos restrictiva",
        ],
        correctas: [1],
      },
      { tipo: "toca", id: "cat", enunciado: "Toca la categoría de la fila que aplica.", parte: "categoria" },
      {
        tipo: "elige",
        id: "plazo",
        campo: "plazo",
        enunciado: "¿Cuándo empieza a contar el plazo de esa fila?",
        opciones: ["Desde la medianoche", "Cuando se difiere el ítem", "Al primer vuelo ETOPS", "Al terminar el día"],
        correctas: [1],
      },
      {
        tipo: "elige",
        id: "nota",
        campo: "condiciones",
        enunciado: "¿Qué hace la NOTE?",
        opciones: ["Informa cómo se puede arrancar la APU", "Agrega una condición al alivio", "Prohíbe arrancar la APU en vuelo con la bomba inoperativa", "Cambia la categoría"],
        correctas: [0],
      },
    ],
    explicacion:
      "La fila C dice «Except for ETOPS»: ningún ETOPS. La A permite ETOPS de hasta 120 minutos, pero por 4 vuelos, y en vuelos el plazo corre desde que se difiere, no desde la medianoche (PL-25, Repair Category A). Elegir la fila correcta cambia el plazo de 10 días a 4 vuelos.",
  },
]

// ─── b) ¿Podemos salir? (13) ─────────────────────────────────────────────────

export const MEL_PODEMOS_SALIR: EjPodemosSalir[] = [
  {
    id: "limpiaparabrisas-lluvia",
    tipo: "podemosSalir",
    titulo: "Limpiaparabrisas del capitán",
    defecto: "El limpiaparabrisas izquierdo no se mueve. Diferido por la fila C 2 0 (O).",
    entrada: WIPER,
    fila: 0,
    estado: ["Anotado hoy a las 06:10, placard en el selector.", "(O) repasado en el briefing."],
    vuelo: [
      "Salida 07:30 con cielo despejado.",
      "TAF del destino: TEMPO de lluvia ligera entre las 08:00 y las 11:00. Llegada prevista 08:45.",
      "Aproximación ILS CAT I.",
    ],
    decision: "no",
    razones: [
      { texto: "La condición a) prohíbe operar con precipitación a menos de 5 SM del aeropuerto de aterrizaje previsto.", correcta: true },
      { texto: "Hay lluvia pronosticada en el destino a la hora de llegada.", correcta: true },
      { texto: "El problema es la aproximación CAT I.", correcta: false },
      { texto: "Como la salida es con cielo despejado, basta.", correcta: false },
    ],
    fuente: `${WIPER.fuente}`,
    explicacion:
      "La condición mira el despegue y el aterrizaje previsto. Con un TEMPO de lluvia en el destino a la hora de llegada, el alivio no se cumple aunque en origen esté despejado. Se habla con despacho: otro avión, otra hora o reparar. La B 2 1 con repelente de lluvia es otra fila, con otras condiciones.",
  },
  {
    id: "luces-tobogan-noche",
    tipo: "podemosSalir",
    titulo: "Iluminación de toboganes",
    defecto: "La iluminación del tobogán de la puerta 2R no enciende en la prueba.",
    entrada: SLIDE_LIGHTING,
    fila: 0,
    estado: ["Anotado hoy, placard en la puerta.", "Categoría B."],
    vuelo: ["Salida 17:50 local, llegada 19:20 local.", "Fin del crepúsculo civil en el destino: 18:40 local."],
    decision: "no",
    razones: [
      { texto: "El alivio es solo para operaciones que no sean nocturnas.", correcta: true },
      { texto: "La llegada es después del fin del crepúsculo civil: ya es de noche (PL-25, Night).", correcta: true },
      { texto: "Se puede porque la salida es de día.", correcta: false },
      { texto: "El problema es que es categoría B.", correcta: false },
    ],
    fuente: `${SLIDE_LIGHTING.fuente}; PL-25 Rev 24: Night`,
    explicacion:
      "PL-25 define la noche como el tiempo entre el fin del crepúsculo civil vespertino y el inicio del matutino. Una parte del vuelo cae de noche, así que «non-night operations» no se cumple. Una evacuación en la llegada sería en la oscuridad.",
  },
  {
    id: "base-datos-vencida",
    tipo: "podemosSalir",
    titulo: "Base de datos vencida",
    defecto: "El FMS muestra la base de datos del ciclo anterior: el ciclo vigente empezó ayer y no se cargó.",
    entrada: NAV_DATABASE,
    fila: 0,
    estado: ["Mantenimiento propone diferirla por 34-61-01."],
    vuelo: ["Vuelo doméstico diurno, VMC.", "Salida por un procedimiento RNAV."],
    decision: "no",
    razones: [
      { texto: "La NOTE dice que una base de datos vencida no tiene alivio MMEL.", correcta: true },
      { texto: "34-61-01 es para una base de datos inoperativa, no desactualizada.", correcta: true },
      { texto: "Con VMC se puede salir sin base de datos.", correcta: false },
      { texto: "Se puede si el plan de vuelo OACI se actualiza.", correcta: false },
    ],
    fuente: NAV_DATABASE.fuente ?? "",
    explicacion:
      "La NOTE no es una condición del alivio, pero aquí cierra la puerta: «An out-of-currency or out-of-date navigation database is not authorized MMEL relief». La solución es cargar el ciclo vigente, no diferir.",
  },
  {
    id: "aviso-desconexion-ap",
    tipo: "podemosSalir",
    titulo: "Aviso de desconexión del autopiloto",
    defecto: "En la prueba no suena el aviso de desconexión del autopiloto.",
    entrada: AP_DISC,
    fila: 0,
    estado: ["Diferido con placard. (O) disponible."],
    vuelo: ["Destino con niebla: el pronóstico a la hora de llegada solo permite aproximación CAT III con aterrizaje automático.", "Alterno en CAT I."],
    decision: "no",
    razones: [
      { texto: "La condición es no usar ninguno de los dos autopilotos.", correcta: true },
      { texto: "Una aproximación CAT III con aterrizaje automático necesita el autopiloto.", correcta: true },
      { texto: "El alterno en CAT I resuelve el problema.", correcta: false },
      { texto: "Es categoría B, así que no hay alivio.", correcta: false },
    ],
    fuente: AP_DISC.fuente ?? "",
    explicacion:
      "El alivio parece pequeño (un aviso), pero la condición es volar sin autopiloto. Con un destino que solo se puede aterrizar en automático, el plan no sirve: el alterno es para cuando el plan falla, no para planear no poder aterrizar en el destino. Además está la carga de trabajo de volar todo a mano.",
  },
  {
    id: "flex-inoperativo",
    tipo: "podemosSalir",
    titulo: "Empuje flexible",
    defecto: "La función FLEX TEMP no está disponible en ninguno de los dos motores.",
    entrada: FLEX,
    fila: 0,
    estado: ["Anotado y con placard."],
    vuelo: ["Pista larga y seca, 20 °C.", "Despacho tenía previsto un despegue FLEX."],
    decision: "si",
    cumpliendo: "Despegar en TOGA o en modo de empuje reducido (de-rated), con la performance de despegue calculada para ese modo.",
    razones: [
      { texto: "La condición es despegar en TOGA o en modo de-rated.", correcta: true },
      { texto: "Los datos de despegue tienen que salir para el modo que se va a usar, no para FLEX.", correcta: true },
      { texto: "Hay que volar por debajo de FL 250.", correcta: false },
      { texto: "Hace falta un (M) antes del vuelo.", correcta: false },
    ],
    fuente: `${FLEX.fuente}; FAA Order 8900.1 Vol 4 Cap 4 Secc 3, 4-691C`,
    explicacion:
      "Sin FLEX el avión despega igual, pero con otro empuje. El cambio llega a la tarjeta de despegue: velocidades y datos de performance del modo que se va a usar. La cifra la calcula el sistema de performance del operador, no la memoria.",
  },
  {
    id: "oxigeno-control-manual",
    tipo: "podemosSalir",
    titulo: "Oxígeno de pasajeros: control manual",
    defecto: "El control manual del oxígeno de pasajeros no funciona en la prueba.",
    entrada: O2_MANUAL,
    fila: 0,
    estado: ["Diferido, placard puesto. (O) disponible."],
    vuelo: ["Plan original en FL 360, 2 h 10 min.", "Sin restricciones de meteorología."],
    decision: "si",
    cumpliendo: "Rehacer el plan a FL 250 o por debajo, con el combustible recalculado para ese nivel.",
    razones: [
      { texto: "La condición es volar a FL 250 o por debajo.", correcta: true },
      { texto: "El plan en FL 360 no la cumple: hay que rehacerlo.", correcta: true },
      { texto: "Un nivel más bajo cambia el consumo: despacho recalcula el combustible.", correcta: true },
      { texto: "El alivio solo vale para vuelos de menos de una hora.", correcta: false },
    ],
    fuente: `${O2_MANUAL.fuente}; AC 120-125, 6.4`,
    explicacion:
      "Sí, pero no con el plan de hoy. El techo de FL 250 cambia el nivel, el tiempo y el combustible. El avión sale cuando el plan nuevo existe, no cuando el piloto «se acuerda» de bajar.",
  },
  {
    id: "tat-sin-pronostico",
    tipo: "podemosSalir",
    titulo: "Calefacción de las dos sondas TAT",
    defecto: "Las dos calefacciones de sonda TAT están inoperativas. Diferido por la fila C 2 0.",
    entrada: TAT,
    fila: 1,
    estado: ["Anotado hoy, placard puesto."],
    vuelo: ["Vuelo doméstico, salida en 90 minutos.", "El paquete de despacho todavía no trae el pronóstico de ruta ni de engelamiento."],
    decision: "falta",
    razones: [
      { texto: "La condición prohíbe humedad visible y engelamiento conocido o pronosticado.", correcta: true },
      { texto: "Sin el pronóstico no se puede saber si la condición se cumple.", correcta: true },
      { texto: "Como no es ETOPS, se sale.", correcta: false },
      { texto: "Se sale y se evita la nube si aparece.", correcta: false },
    ],
    fuente: TAT.fuente ?? "",
    explicacion:
      "Hay que pedir el pronóstico antes de decidir. Si trae nubes o engelamiento en la trayectoria, no se sale; si no, se sale. «Humedad visible» es casi cualquier nube: la condición es más estricta de lo que parece.",
  },
  {
    id: "calefaccion-ventanas-etops",
    tipo: "podemosSalir",
    titulo: "Computador de calefacción de ventanas",
    defecto: "Un computador de calefacción de ventanas falla.",
    entrada: WINDOW_HEAT,
    fila: 0,
    estado: ["(M) cumplido y firmado: calefactores y avisos del otro sistema verificados.", "Placard puesto."],
    vuelo: ["Vuelo ETOPS con tiempo de desvío de 180 minutos.", "Sin engelamiento pronosticado."],
    decision: "no",
    razones: [
      { texto: "La entrada excluye ETOPS de más de 120 minutos.", correcta: true },
      { texto: "El (M) cumplido no cambia la exclusión.", correcta: true },
      { texto: "El problema es el engelamiento.", correcta: false },
      { texto: "Se puede si los mínimos de aproximación no lo requieren.", correcta: false },
    ],
    fuente: WINDOW_HEAT.fuente ?? "",
    explicacion:
      "Todo lo demás está en orden, pero «Except for ETOPS beyond 120 minutes» deja fuera este vuelo. Opciones: otro avión, otra ruta sin ETOPS largo o reparar. La decisión es de la aerolínea con despacho.",
  },
  {
    id: "cantidad-hidraulico-escala",
    tipo: "podemosSalir",
    titulo: "Indicación de cantidad hidráulica",
    defecto: "Aeronave de ejemplo: la indicación de cantidad del depósito hidráulico 3 está en blanco desde ayer.",
    entrada: HYD_QTY,
    fila: 0,
    estado: [
      "Diferido ayer. Hay una verificación del depósito firmada ayer a las 18:00, antes del último vuelo.",
      "Hoy, primer vuelo del día: no hay verificación nueva en el tech log.",
    ],
    vuelo: ["Vuelo doméstico, meteorología sin restricciones."],
    decision: "no",
    razones: [
      { texto: "El (M) pide verificar la cantidad antes de cada salida.", correcta: true },
      { texto: "La verificación de ayer ya se usó en el vuelo de ayer.", correcta: true },
      { texto: "Basta con que el diferido esté abierto y vigente.", correcta: false },
      { texto: "La tripulación puede mirar el depósito en el recorrido exterior y firmar.", correcta: false },
    ],
    fuente: "PL-25 Rev 24: (M) Symbol; AC 120-125, 6.1.3",
    explicacion:
      "Todavía no. «Before each departure» no se cumple con la firma de ayer. Se llama a mantenimiento para que verifique y firme; después se sale. El (M) lo hace personal de mantenimiento: la tripulación verifica que esté firmado.",
  },
  {
    id: "aviso-puerta-carga",
    tipo: "podemosSalir",
    titulo: "Aviso de puerta de carga trasera",
    defecto: "Aeronave de ejemplo: el aviso de la puerta de carga trasera no funciona.",
    entrada: CARGO_DOOR,
    fila: 0,
    estado: [
      "Diferido hace 4 días, categoría C: vigente.",
      "Hoy: mecánico verificó puerta cerrada, asegurada y trabada, firmado a las 05:40. Placard puesto.",
    ],
    vuelo: ["Vuelo doméstico. Salida 06:15."],
    decision: "si",
    cumpliendo: "Con la verificación de mantenimiento de esta salida firmada y el placard puesto.",
    razones: [
      { texto: "El (M) de esta salida está hecho y firmado.", correcta: true },
      { texto: "El plazo sigue vigente.", correcta: true },
      { texto: "Hace falta además volar por debajo de un nivel.", correcta: false },
      { texto: "El aviso de la puerta es requerido: no se puede diferir.", correcta: false },
    ],
    fuente: "PL-25 Rev 24: (M) Symbol, Repair Category C, Placarding",
    explicacion:
      "Todo en orden: ítem con alivio, plazo vigente, (M) de esta salida firmado y placard. En la próxima escala hace falta otra verificación, porque el (M) es «before each departure».",
  },
  {
    id: "calentador-agua-vencido",
    tipo: "podemosSalir",
    titulo: "Calentador de agua del galley",
    defecto: "Aeronave de ejemplo: calentador de agua del galley delantero inoperativo.",
    entrada: WATER_HEATER,
    fila: 0,
    estado: [
      "Anotado el 10 de mayo. El operador cuenta en hora local.",
      "Hoy es 8 de septiembre. El tech log no muestra reparación.",
      "Mantenimiento propone darle una extensión.",
    ],
    vuelo: ["Vuelo doméstico diurno."],
    decision: "no",
    razones: [
      { texto: "Categoría D: 120 días sin contar el del registro; venció a las 2359 del 7 de septiembre.", correcta: true },
      { texto: "En la FAA, la extensión única solo existe para B y C, no para D.", correcta: true },
      { texto: "Como es un ítem de cabina, el plazo no importa.", correcta: false },
      { texto: "El plazo de D son cuatro meses: vence el 10 de septiembre.", correcta: false },
    ],
    fuente: "PL-25 Rev 24: Repair Category D; Continuing Authorization, Single Extension",
    explicacion:
      "Del 11 de mayo al 7 de septiembre son 120 días: el plazo terminó ayer. PL-25 no autoriza la extensión única para categorías A y D. Hasta que se repare, el avión no sale con ese diferido.",
  },
  {
    id: "interfono-sin-detalle",
    tipo: "podemosSalir",
    titulo: "«INTERPHONE INOP»",
    defecto: "Aeronave de ejemplo: el tech log dice solo «INTERPHONE INOP». Sin más detalle.",
    entrada: INTERPHONE,
    fila: 0,
    estado: ["Mantenimiento está en otro avión. No hay placard."],
    vuelo: ["Vuelo con cuatro auxiliares; estaciones requeridas: delantera y trasera."],
    decision: "falta",
    razones: [
      { texto: "No se sabe qué auricular falló ni en qué estación.", correcta: true },
      { texto: "El alivio exige al menos uno operativo en cada estación requerida.", correcta: true },
      { texto: "Con «-» en requeridos, cualquier cantidad sirve.", correcta: false },
      { texto: "El interfono no afecta la seguridad: se sale.", correcta: false },
    ],
    fuente: "PL-25 Rev 24: Dash, Placarding",
    explicacion:
      "Primero hay que saber qué falló. Si es un auricular y la estación tiene otro, el alivio se cumple con el (O). Si es todo el interfono, o una estación requerida queda sin ninguno, es otro ítem o no hay alivio. Y falta el placard.",
  },
  {
    id: "humo-lavabo-cumplido",
    tipo: "podemosSalir",
    titulo: "Detector de humo del lavabo (B737)",
    defecto: "B737-800 de pasajeros: el detector de humo del lavabo trasero izquierdo falla.",
    entrada: B737_LAV_SMOKE,
    fila: 0,
    estado: [
      "(M) firmado: receptáculo de desechos vacío, puerta con seguro y placard «INOPERATIVE - DO NOT ENTER».",
      "Anotado hoy, categoría C.",
    ],
    vuelo: ["Vuelo doméstico, 1 h 40 min, 180 pasajeros."],
    decision: "si",
    cumpliendo: "Con el lavabo cerrado para pasajeros, solo para la tripulación, y el (O) comentado con la jefa de cabina.",
    razones: [
      { texto: "Las condiciones a) y b) están cumplidas y firmadas.", correcta: true },
      { texto: "La condición c) es de la operación: el lavabo es solo para tripulantes.", correcta: true },
      { texto: "Falta la fila 16-02.", correcta: false },
      { texto: "La NOTE prohíbe que la tripulación lo use.", correcta: false },
    ],
    fuente: B737_LAV_SMOKE.fuente ?? "",
    explicacion:
      "Se sale. El piloto confirma el (M) y el placard, y el (O) llega a la cabina: con un lavabo menos, la jefa de cabina tiene que saberlo antes del embarque. La NOTE permite que los tripulantes lo usen o lo revisen.",
  },
]

// ─── c) Calcula el plazo (11) ────────────────────────────────────────────────

const AVISO_FAA = "Sistema FAA (PL-25 Rev 24). En Colombia rige el plazo de la MEL aprobada del operador."

export const MEL_CALCULA_EL_PLAZO: EjCalculaElPlazo[] = [
  {
    id: "pl25-categoria-b",
    tipo: "calculaElPlazo",
    situacion: `Un ítem categoría B se anotó en el tech log el 26 de enero a las 10:00. El operador cuenta en hora local. ${AVISO_FAA}`,
    categoria: "B",
    plazo: { unidad: "calendario" },
    registro: { fecha: "2026-01-26", hora: "10:00", huso: -5 },
    cuenta: "local",
    opciones: ["2026-01-28T23:59", "2026-01-29T10:00", "2026-01-30T23:59", "2026-01-29T23:59"],
    fuente: "PL-25 Rev 24: Repair Category B (ejemplo del 26 de enero); Day of Discovery",
    explicacion:
      "El 26 es el day of discovery y no cuenta. Cuentan 27, 28 y 29: vence a las 2359 del 29. Es el ejemplo de la propia PL-25. Las «72 hours» son tres días completos, no 72 horas desde las 10:00.",
  },
  {
    id: "pl25-categoria-c",
    tipo: "calculaElPlazo",
    situacion: `El mismo registro, 26 de enero a las 10:00, pero el ítem es categoría C. ${AVISO_FAA}`,
    categoria: "C",
    plazo: { unidad: "calendario" },
    registro: { fecha: "2026-01-26", hora: "10:00", huso: -5 },
    cuenta: "local",
    opciones: ["2026-02-04T23:59", "2026-02-05T10:00", "2026-02-05T23:59", "2026-02-06T23:59"],
    fuente: "PL-25 Rev 24: Repair Category C (ejemplo del 26 de enero)",
    explicacion:
      "Diez días desde la 0000 del 27 de enero: del 27 al 31 son cinco, y del 1 al 5 de febrero otros cinco. Vence a las 2359 del 5 de febrero, como dice PL-25.",
  },
  {
    id: "categoria-d",
    tipo: "calculaElPlazo",
    situacion: `Aeronave de ejemplo: el calentador de agua del galley (categoría D) se anotó el 3 de marzo a las 16:45, hora local. ${AVISO_FAA}`,
    entrada: WATER_HEATER,
    fila: 0,
    categoria: "D",
    plazo: { unidad: "calendario" },
    registro: { fecha: "2026-03-03", hora: "16:45", huso: -5 },
    cuenta: "local",
    opciones: ["2026-07-01T23:59", "2026-06-30T23:59", "2026-07-01T16:45", "2026-07-03T23:59"],
    fuente: "PL-25 Rev 24: Repair Category D",
    explicacion:
      "120 días desde el 4 de marzo: 28 de marzo, 30 de abril, 31 de mayo y 30 de junio suman 119; el 1 de julio es el día 120. «Cuatro meses» (3 de julio) no es lo mismo que 120 días.",
  },
  {
    id: "categoria-c-en-utc",
    tipo: "calculaElPlazo",
    situacion: `Un ítem categoría C se anotó el 14 de agosto a las 21:30 hora de Bogotá (UTC−5). El operador cuenta en UTC. ${AVISO_FAA}`,
    entrada: PACK_OUTLET,
    fila: 0,
    categoria: "C",
    plazo: { unidad: "calendario" },
    registro: { fecha: "2026-08-14", hora: "21:30", huso: -5 },
    cuenta: "UTC",
    opciones: ["2026-08-24T23:59", "2026-08-25T21:30", "2026-08-26T23:59", "2026-08-25T23:59"],
    fuente: "PL-25 Rev 24: Day of Discovery, Repair Category C; FAA Order 8900.1 Vol 4 Cap 4 Secc 3, 4-685B2)b)",
    explicacion:
      "Las 21:30 en Bogotá son las 02:30 UTC del 15 de agosto. Si el operador cuenta en UTC, el day of discovery es el 15: cuentan del 16 al 25 y vence a las 2359 UTC del 25. Contarlo en hora local da un día menos.",
  },
  {
    id: "categoria-b-bisiesto",
    tipo: "calculaElPlazo",
    situacion: `Un ítem categoría B se anotó el 27 de febrero de 2028 a las 08:00, hora local. 2028 es bisiesto. ${AVISO_FAA}`,
    categoria: "B",
    plazo: { unidad: "calendario" },
    registro: { fecha: "2028-02-27", hora: "08:00", huso: -5 },
    cuenta: "local",
    opciones: ["2028-02-29T23:59", "2028-03-01T23:59", "2028-03-01T08:00", "2028-03-02T23:59"],
    fuente: "PL-25 Rev 24: Repair Category B",
    explicacion: "El 27 no cuenta. Cuentan 28 y 29 de febrero y 1 de marzo: vence a las 2359 del 1 de marzo. Olvidar el 29 corre el plazo un día.",
  },
  {
    id: "radioaltimetro-flight-days",
    tipo: "calculaElPlazo",
    situacion:
      "El radioaltímetro 1 se difirió por 34-42-01 el lunes 6 de abril a las 19:10, hora local (el operador cuenta en local). El martes 7 el avión queda de reserva y no inicia ningún vuelo; vuela el miércoles 8, el jueves 9 y el viernes 10.",
    entrada: RADIO_ALTIMETRO,
    fila: 0,
    categoria: "A",
    plazo: { unidad: "diasDeVuelo", dias: 2, fechasConVuelo: ["2026-04-08", "2026-04-09", "2026-04-10"] },
    registro: { fecha: "2026-04-06", hora: "19:10", huso: -5 },
    cuenta: "local",
    opciones: ["2026-04-08T19:10", "2026-04-09T23:59", "2026-04-08T23:59", "2026-04-10T23:59"],
    fuente: `${RADIO_ALTIMETRO.fuente}; PL-25 Rev 24: Flight-Day, Repair Category A`,
    explicacion:
      "Para el RA 1 son 2 flight-days. El 6 no cuenta, y el 7 tampoco porque el avión no inició ningún vuelo (PL-25: flight-day es un día en que se inicia al menos un vuelo). Cuentan el 8 y el 9: vence a las 2359 del 9. Para el RA 2 serían 3.",
  },
  {
    id: "alerta-altitud-flight-days",
    tipo: "calculaElPlazo",
    situacion:
      "La alerta de altitud se difirió por la fila A de 34-42-04 el viernes 9 de octubre a las 14:20 UTC. El operador cuenta en UTC. El avión vuela el sábado 10, descansa el domingo 11 y vuela el lunes 12, el martes 13 y el miércoles 14.",
    entrada: ALT_ALERT,
    fila: 0,
    categoria: "A",
    plazo: { unidad: "diasDeVuelo", dias: 3, fechasConVuelo: ["2026-10-10", "2026-10-12", "2026-10-13", "2026-10-14"] },
    registro: { fecha: "2026-10-09", hora: "14:20", huso: 0 },
    cuenta: "UTC",
    opciones: ["2026-10-12T14:20", "2026-10-12T23:59", "2026-10-13T23:59", "2026-10-14T23:59"],
    fuente: `${ALT_ALERT.fuente}; PL-25 Rev 24: Flight-Day, Repair Category A`,
    explicacion:
      "Tres flight-days sin contar el 9: el 10, el 12 y el 13 (el domingo 11 no hubo vuelos y no cuenta). Vence a las 2359 UTC del 13. Contar días calendario daría el 12.",
  },
  {
    id: "humo-avionica-tramos",
    tipo: "calculaElPlazo",
    situacion:
      "La detección de humo de aviónica se difirió por 26-15-01 hoy antes del primer vuelo. El avión ya hizo BOG-CLO y CLO-BOG. ¿Cuál es el último tramo de la programación que puede volar con el diferido?",
    entrada: AVIONICS_SMOKE,
    fila: 0,
    categoria: "A",
    plazo: {
      unidad: "vuelosHoras",
      vuelos: 3,
      tramos: [
        { id: "t1", ruta: "BOG-CLO", horas: 1.0, hecho: true },
        { id: "t2", ruta: "CLO-BOG", horas: 1.0, hecho: true },
        { id: "t3", ruta: "BOG-BAQ", horas: 1.4 },
        { id: "t4", ruta: "BAQ-BOG", horas: 1.4 },
        { id: "t5", ruta: "BOG-PEI", horas: 0.8 },
      ],
    },
    cuenta: "local",
    opciones: [],
    fuente: `${AVIONICS_SMOKE.fuente}; PL-25 Rev 24: Repair Category A`,
    explicacion:
      "«3 flight-legs»: en tramos el plazo corre desde que se difiere, sin day of discovery. Van dos; BOG-BAQ es el tercero y el último. BAQ-BOG sería el cuarto: el avión se quedaría en Barranquilla si no se repara allá.",
  },
  {
    id: "sobreempuje-vuelos",
    tipo: "calculaElPlazo",
    situacion:
      "Un canal de la protección contra sobreempuje (73-20-11) se difirió ayer por la tarde. Ayer voló dos tramos más. Hoy tiene cinco programados. ¿Cuál es el último que puede volar?",
    entrada: OVERTHRUST,
    fila: 0,
    categoria: "A",
    plazo: {
      unidad: "vuelosHoras",
      vuelos: 6,
      tramos: [
        { id: "t1", ruta: "MDE-BOG", horas: 0.9, hecho: true },
        { id: "t2", ruta: "BOG-MDE", horas: 0.9, hecho: true },
        { id: "t3", ruta: "MDE-CTG", horas: 1.2 },
        { id: "t4", ruta: "CTG-MDE", horas: 1.2 },
        { id: "t5", ruta: "MDE-BOG", horas: 0.9 },
        { id: "t6", ruta: "BOG-SMR", horas: 1.3 },
        { id: "t7", ruta: "SMR-BOG", horas: 1.3 },
      ],
    },
    cuenta: "local",
    opciones: [],
    fuente: `${OVERTHRUST.fuente}; PL-25 Rev 24: Repair Category A`,
    explicacion:
      "«For 6 flights» desde que se difirió: los dos de ayer cuentan. Quedan cuatro: MDE-CTG, CTG-MDE, MDE-BOG y BOG-SMR. El regreso SMR-BOG sería el séptimo. Cambiar de día no reinicia nada.",
  },
  {
    id: "filtro-combustible-lo-que-ocurra-primero",
    tipo: "calculaElPlazo",
    situacion:
      "A320neo con motores LEAP-1A: la alerta de filtro de combustible de un motor se difirió por la fila A de 73-30-06 3) antes de BOG-PTY, ya volado (1,6 h). ¿Cuál es el último tramo que puede volar?",
    entrada: FUEL_FILTER,
    fila: 0,
    categoria: "A",
    plazo: {
      unidad: "vuelosHoras",
      vuelos: 3,
      horas: 6,
      tramos: [
        { id: "t1", ruta: "BOG-PTY", horas: 1.6, hecho: true },
        { id: "t2", ruta: "PTY-BOG", horas: 1.7 },
        { id: "t3", ruta: "BOG-CUN", horas: 2.9 },
        { id: "t4", ruta: "CUN-BOG", horas: 2.9 },
      ],
    },
    cuenta: "local",
    opciones: [],
    fuente: `${FUEL_FILTER.fuente}; PL-25 Rev 24: Repair Category A`,
    explicacion:
      "«3 flights or 6 flight-hours, whichever occurs first». PTY-BOG deja 2 vuelos y 3,3 h. BOG-CUN sería el tercer vuelo, pero llevaría la cuenta a 6,2 h: pasa las 6 horas antes que los 3 vuelos. El último es PTY-BOG.",
  },
  {
    id: "categoria-c-fin-de-ano",
    tipo: "calculaElPlazo",
    situacion: `Aeronave de ejemplo: la indicación de temperatura de un pack (categoría C) se anotó el 27 de diciembre a las 03:15, hora local. El operador cuenta en local. ${AVISO_FAA}`,
    entrada: PACK_OUTLET,
    fila: 0,
    categoria: "C",
    plazo: { unidad: "calendario" },
    registro: { fecha: "2026-12-27", hora: "03:15", huso: -5 },
    cuenta: "local",
    opciones: ["2027-01-05T23:59", "2027-01-06T23:59", "2027-01-06T03:15", "2027-01-07T23:59"],
    fuente: "PL-25 Rev 24: Repair Category C, Day of Discovery",
    explicacion:
      "Aunque se anotó a las 03:15, el 27 entero es el day of discovery. Cuentan del 28 al 31 de diciembre (cuatro) y del 1 al 6 de enero (seis): vence a las 2359 del 6 de enero.",
  },
]

// ─── d) Combinados (9) ───────────────────────────────────────────────────────

export const MEL_COMBINADOS: EjCombinados[] = [
  {
    id: "prv-y-sangrado",
    tipo: "combinados",
    titulo: "Válvula de sangrado que arrastra al sangrado",
    items: [
      { entrada: PRV, fila: 0, estado: "Nuevo: PRV 2 falla cerrada. (M) cumplido: asegurada cerrada." },
      { entrada: BLEED_SUPPLY, fila: 0, estado: "Entra por el «considered inoperative» de la PRV." },
    ],
    vuelo: ["A320ceo sin Mod. 31283.", "Plan en FL 280.", "Pronóstico de engelamiento moderado en el descenso al destino."],
    decision: "no",
    dependencia: {
      opciones: [
        "Las dos piden (M): con el de la PRV firmado, el sangrado ya queda cubierto",
        "No se cruzan: la PRV cerrada no cambia nada del sistema de sangrado",
        "El sangrado exige que la PRV funcione, así que no hay alivio posible",
        "La PRV se considera sangrado inoperativo, así que hay que cumplir todo 36-11-01",
      ],
      correcta: 3,
    },
    fuente: `${PRV.fuente}; ${BLEED_SUPPLY.fuente}; PL-25 Rev 24: Considered Inoperative`,
    explicacion:
      "«Considered inoperative» trae la otra entrada completa (PL-25). 36-11-01 1) prohíbe el engelamiento conocido o pronosticado, y hoy hay pronóstico en el descenso. El FL 280 está bien, pero no alcanza.",
  },
  {
    id: "radioaltimetro-y-adr3",
    tipo: "combinados",
    titulo: "Radioaltímetro y ADR 3",
    items: [
      { entrada: ADR3, fila: 0, estado: "Abierto desde anteayer: ADR 3 inoperativo, (M) firmado." },
      { entrada: RADIO_ALTIMETRO, fila: 0, estado: "Nuevo: RA 2 inoperativo." },
    ],
    vuelo: ["A320 sin Mod eRudder.", "Vuelo diurno, destino en VMC."],
    decision: "no",
    dependencia: {
      opciones: [
        "Los dos son categoría A: rige el plazo más corto de los dos",
        "El RA pide que todos los ADIRS operen normalmente, y el ADR 3 no",
        "El ADR 3 pide que funcionen los dos radioaltímetros, y el RA 2 no funciona",
        "No hay relación: cada uno tiene su propio alivio y se cumple por separado",
      ],
      correcta: 1,
    },
    fuente: `${RADIO_ALTIMETRO.fuente}; ${ADR3.fuente}`,
    explicacion:
      "La condición c) del RA exige «All ELACs, SECs, ADIRS, SFCC, LGCIU, and FACs operate normally». Con el ADR 3 diferido, el ADIRS no está completo y el alivio del RA no aplica. Uno de los dos se repara antes de salir.",
  },
  {
    id: "luces-aterrizaje-y-rodaje-dia",
    tipo: "combinados",
    titulo: "Luz de aterrizaje y luz de rodaje",
    items: [
      { entrada: TAXI_LIGHTS, fila: 0, estado: "Abierto: una luz de rodaje y despegue inoperativa." },
      { entrada: LANDING_LIGHTS, fila: 1, estado: "Nuevo: luz de aterrizaje izquierda inoperativa." },
    ],
    vuelo: ["Salida 09:00, llegada 10:30. Todo el vuelo de día."],
    decision: "si",
    cumpliendo: "Por la segunda fila de 33-40-02: solo operación no nocturna.",
    dependencia: {
      opciones: [
        "No se cruzan: cada luz tiene su propio alivio de categoría C",
        "La fila «C 2 0» exige que la otra luz de aterrizaje funcione",
        "La primera fila de aterrizaje pide las de rodaje y despegue operando; como no, queda la «non-night»",
        "La luz de rodaje y despegue pide las de aterrizaje operando, así que la de rodaje pierde su alivio de categoría C",
      ],
      correcta: 2,
    },
    fuente: `${LANDING_LIGHTS.fuente}; ${TAXI_LIGHTS.fuente}`,
    explicacion:
      "La fila «C 2 1» no sirve porque pide las luces de rodaje y despegue operando. Queda la «C 2 0, for non-night operations». Hoy el vuelo es de día: se sale. El mismo avión, con salida a las 18:30, no saldría.",
  },
  {
    id: "limpiaparabrisas-y-repelente",
    tipo: "combinados",
    titulo: "Limpiaparabrisas y repelente de lluvia",
    items: [
      { entrada: RAIN_REPELLANT, fila: 0, estado: "Abierto: repelente de lluvia del lado izquierdo inoperativo." },
      { entrada: WIPER, fila: 2, estado: "Nuevo: limpiaparabrisas izquierdo inoperativo." },
    ],
    vuelo: ["TAF de origen y destino sin precipitación durante todo el periodo.", "Aproximación ILS CAT I."],
    decision: "si",
    cumpliendo: "Por la primera fila de 30-45-01: sin precipitación a 5 SM del despegue y del aterrizaje, y con el (O).",
    dependencia: {
      opciones: [
        "La fila «B 2 1» pide el repelente operativo; como no, se usa la fila C 2 0 con sus condiciones",
        "El repelente de lluvia pide el limpiaparabrisas operativo, así que el repelente ya no tiene alivio",
        "No se cruzan: el repelente es D y el limpiaparabrisas tiene su propia fila",
        "La fila C 2 0 exige los dos limpiaparabrisas y el repelente operativos",
      ],
      correcta: 0,
    },
    fuente: `${WIPER.fuente}; ${RAIN_REPELLANT.fuente}`,
    explicacion:
      "El repelente, solo, es D sin condiciones. Pero la fila más cómoda del limpiaparabrisas lo necesita. Queda la «C 2 0 (O)»: sin precipitación a 5 SM del despegue y del aterrizaje previsto, y mínimos que no lo requieran. Hoy se cumple.",
  },
  {
    id: "alerta-altitud-y-autopiloto",
    tipo: "combinados",
    titulo: "Alerta de altitud y un autopiloto",
    items: [
      { entrada: AUTOPILOTO, fila: 0, estado: "Abierto: AP 1 inoperativo." },
      { entrada: ALT_ALERT, fila: 0, estado: "Nuevo: alerta de altitud inoperativa, por la fila A." },
    ],
    vuelo: ["AP 2 con altitude hold y capture operando.", "Plan en FL 370, espacio RVSM.", "Salida desde una estación sin mantenimiento para este ítem."],
    decision: "no",
    dependencia: {
      opciones: [
        "El autopiloto pide la alerta de altitud operativa, y la alerta es justo la que está inoperativa",
        "Los dos piden (M): sin la firma de mantenimiento en los dos ítems no hay alivio para salir",
        "No se cruzan: son capítulos ATA distintos",
        "La alerta de altitud pide un autopiloto con altitude hold y capture: el AP 2 lo cubre",
      ],
      correcta: 3,
    },
    fuente: `${ALT_ALERT.fuente}; ${AUTOPILOTO.fuente}`,
    explicacion:
      "El cruce se resuelve (el AP 2 cubre la condición a), pero la b) no: «Enroute operations (i.e., RVSM) do not require its use». Con el plan en FL 370 hay que replanear fuera de RVSM, con su combustible, o no se sale.",
  },
  {
    id: "combustible-usado-y-tanque-central",
    tipo: "combinados",
    titulo: "Fuel used y cantidad del tanque central",
    items: [
      { entrada: CENTER_QTY, fila: 0, estado: "Abierto: indicación del tanque central inoperativa. (M) de esta salida firmado." },
      { entrada: FUEL_USED, fila: 0, estado: "Nuevo: fuel used del motor 2 en blanco." },
    ],
    vuelo: ["Aeronave de ejemplo. Vuelo de 3 h con combustible en el tanque central."],
    decision: "no",
    dependencia: {
      opciones: [
        "El tanque central pide el fuel used de los dos motores operando normalmente",
        "Los dos son C: se pueden llevar juntos mientras no venza ningún plazo",
        "El fuel used pide la indicación de todos los tanques, y la del central no funciona",
        "No se cruzan: el (M) del tanque central ya reemplaza la indicación que falta",
      ],
      correcta: 2,
    },
    fuente: "PL-34 Rev 5 (ítems múltiples); RAC 91 Apéndice 2 (f)",
    explicacion:
      "La dependencia va en un solo sentido: el tanque central no pide nada del fuel used, pero el fuel used pide la indicación de todos los tanques. Con los dos abiertos, el piloto no tendría cómo cruzar lo consumido con lo que queda. Se repara uno.",
  },
  {
    id: "altavoz-y-agua",
    tipo: "combinados",
    titulo: "Altavoz de cabina e indicación de agua",
    items: [
      { entrada: WATER_QTY, fila: 0, estado: "Abierto: indicación de agua potable inoperativa." },
      { entrada: LOUDSPEAKER, fila: 0, estado: "Nuevo: altavoz del primer oficial inoperativo." },
    ],
    vuelo: ["Aeronave de ejemplo. Los dos headsets de la tripulación funcionan."],
    decision: "si",
    cumpliendo: "Con los dos headsets de la tripulación operando.",
    dependencia: {
      opciones: [
        "Ninguna: no comparten sistema ni condición; cada uno se cumple por su lado",
        "El altavoz pide la indicación de agua potable operando normalmente en la cabina",
        "Los dos son de categoría D, así que se pueden llevar juntos sin revisar nada más",
        "La indicación de agua pide que los dos headsets de la tripulación funcionen bien",
      ],
      correcta: 0,
    },
    fuente: "PL-34 Rev 5 (ítems múltiples)",
    explicacion:
      "Revisar el cruce no quiere decir encontrarlo siempre. Aquí no hay dependencia: el altavoz pide headsets (funcionan) y la indicación de agua no pide nada. Se sale con los dos diferidos anotados y con placard.",
  },
  {
    id: "sangrado-apu-motor-lectura",
    tipo: "combinados",
    titulo: "Tres ítems: sangrado de APU, de motor y luces de lectura",
    items: [
      { entrada: READING_LIGHTS, fila: 0, estado: "Abierto: tres luces de lectura." },
      { entrada: APU_BLEED, fila: 0, estado: "Abierto desde ayer: sangrado de la APU inoperativo." },
      { entrada: ENG_BLEED, fila: 0, estado: "Nuevo: sangrado del motor 2 inoperativo. (M) firmado." },
    ],
    vuelo: ["Aeronave de ejemplo. Vuelo doméstico, sin ETOPS.", "Sin engelamiento pronosticado."],
    decision: "no",
    dependencia: {
      opciones: [
        "No se cruzan: cada sangrado tiene su (M)",
        "El sangrado de motor pide el de la APU operando normalmente",
        "El sangrado de la APU pide los dos sangrados de motor operando normalmente",
        "Con tres ítems abiertos se pasa el máximo de diferidos que admite el avión",
      ],
      correcta: 1,
    },
    fuente: "PL-34 Rev 5 (ítems múltiples); FAA Order 8900.1 Vol 4 Cap 4 Secc 3, 4-692",
    explicacion:
      "Las luces de lectura son ruido: no cruzan con nada. El nuevo ítem pide «APU bleed air supply operates normally», y está diferido desde ayer. Aunque el vuelo cumpla el nivel y no haya engelamiento, falta la condición a).",
  },
  {
    id: "indicacion-flaps-intermitente",
    tipo: "combinados",
    titulo: "Indicación de flaps: una diferida, la otra intermitente",
    items: [
      { entrada: FLAP_SECUNDARIA, fila: 0, estado: "Abierto: indicación secundaria inoperativa." },
      { entrada: FLAP_PRIMARIA, fila: 0, estado: "Hoy: la tripulación anterior reporta que la indicación primaria parpadea y se pierde a ratos." },
    ],
    vuelo: ["Aeronave de ejemplo. Mantenimiento dice que «ahora funciona»."],
    decision: "no",
    dependencia: {
      opciones: [
        "La primaria no tiene nada que ver: el ítem abierto es solo la secundaria",
        "Basta con que la primaria funcione en tierra en la prueba de mantenimiento",
        "Las dos son C, así que se suman sus plazos y se sale con las dos diferidas",
        "La secundaria pide la primaria operando normalmente; una intermitente es inoperativa",
      ],
      correcta: 3,
    },
    fuente: "PL-25 Rev 24: Inoperative, Operative",
    explicacion:
      "PL-25 llama inoperativo a lo que «is not consistently functioning normally». Una indicación que se pierde a ratos no funciona de forma consistente: la condición de la secundaria no se cumple. Hasta que mantenimiento corrija la primaria, no hay alivio.",
  },
]

// ─── e) Busca el ítem (11) ───────────────────────────────────────────────────
// Índices de la MMEL FAA A318-A321 Rev 32: capítulos y títulos literales.

const CAP: Record<string, { numero: string; titulo: string }> = Object.fromEntries(
  [ATA21, ATA22, ATA23, ATA24, ATA25, ATA26, ATA27, ATA28, ATA29, ATA30, ATA31, ATA32, ATA33, ATA34, ATA35, ATA36, ATA38, ATA49, ATA52, ATA73].map(
    (c) => [c.numero, c],
  ),
)

function caps(...n: string[]) {
  return n.map((x) => {
    const c = CAP[x]
    if (!c) throw new Error(`Capítulo ATA ${x} sin título`)
    return c
  })
}

const INDICE_A320 = `${A320}, índice de capítulos e ítems`

export const MEL_BUSCA_EL_ITEM: EjBuscaElItem[] = [
  {
    id: "radioaltura-capitan",
    tipo: "buscaElItem",
    sintoma: "En el PFD del capitán no aparece la radioaltura durante la aproximación. El ECAM muestra la falla del RA 1.",
    capitulos: caps("22", "31", "32", "34"),
    capitulo: "34",
    items: [
      { codigo: "34-42-01", titulo: "Radio Altimeter (RA) Systems" },
      { codigo: "34-42-02", titulo: "Automatic Callout System" },
      { codigo: "34-42-04", titulo: "Altitude Alerting System" },
      { codigo: "34-48-01", titulo: "Ground Proximity Warning System (GPWS)" },
    ],
    item: "34-42-01",
    fuente: INDICE_A320,
    explicacion:
      "El radioaltímetro es navegación (ATA 34), aunque se vea en una pantalla (31). Los callouts y el GPWS dependen de él, pero son otros ítems: se difiere lo que falló.",
  },
  {
    id: "reloj-cabina",
    tipo: "buscaElItem",
    sintoma: "El reloj del panel de instrumentos está apagado: no da hora UTC ni cronómetro.",
    capitulos: caps("23", "31", "33", "34"),
    capitulo: "31",
    items: [
      { codigo: "31-21-01", titulo: "Clock System" },
      { codigo: "31-30-02", titulo: "Flight Data Recorder (FDR) System" },
      { codigo: "31-63-01", titulo: "Display Units (DU)" },
      { codigo: "31-58-01", titulo: "Master Warn System" },
    ],
    item: "31-21-01",
    fuente: INDICE_A320,
    explicacion:
      "El reloj está en 31, Indicating/Recording Systems. Ojo: el cronómetro del ND tiene su propio ítem en el capítulo 34 («34-14-05 Chrono»), pero aquí falló el reloj entero.",
  },
  {
    id: "luz-aterrizaje",
    tipo: "buscaElItem",
    sintoma: "En el recorrido exterior, la luz de aterrizaje derecha no enciende.",
    capitulos: caps("32", "34", "33", "30"),
    capitulo: "33",
    items: [
      { codigo: "33-40-01", titulo: "Navigation Lights Systems" },
      { codigo: "33-40-03", titulo: "Runway Turn-Off Light Systems" },
      { codigo: "33-40-02", titulo: "Landing Lighting System" },
      { codigo: "33-40-04", titulo: "Taxi and Takeoff Light Systems" },
    ],
    item: "33-40-02",
    fuente: INDICE_A320,
    explicacion: "Las luces exteriores van en 33 Lights. La de aterrizaje no es la de rodaje ni la de salida de pista: son ítems distintos con condiciones distintas.",
  },
  {
    id: "bomba-tanque-central",
    tipo: "buscaElItem",
    sintoma: "A320 sin tanques adicionales: una bomba del tanque central no da presión.",
    capitulos: caps("28", "29", "36", "73"),
    capitulo: "28",
    items: [
      { codigo: "28-21-01", titulo: "Wing Tank Pumps" },
      { codigo: "28-21-02", titulo: "Center Tank Systems" },
      { codigo: "28-25-01", titulo: "Fuel Quantity Preselector System" },
      { codigo: "28-40-01", titulo: "Low Level Detection Systems" },
    ],
    item: "28-21-02",
    fuente: INDICE_A320,
    explicacion:
      "Las bombas de los tanques están en 28 Fuel. Las del tanque central no están en «Wing Tank Pumps», sino en «Center Tank Systems», y dentro de él hay sub-ítems por configuración (con o sin ACT).",
  },
  {
    id: "humo-lavabo",
    tipo: "buscaElItem",
    sintoma: "La prueba del detector de humo del lavabo trasero falla.",
    capitulos: caps("21", "38", "33", "26"),
    capitulo: "26",
    items: [
      { codigo: "26-15-01", titulo: "Avionics Smoke Detection System" },
      { codigo: "26-16-03", titulo: "Smoke Detectors in FWD Cargo Compartment" },
      { codigo: "26-17-01", titulo: "Lavatory Smoke Detection System" },
      { codigo: "26-25-01", titulo: "Lavatory Waste Bin Fire Extinguisher System" },
    ],
    item: "26-17-01",
    fuente: INDICE_A320,
    explicacion: "Detección de humo es protección contra fuego (26), no agua y desechos (38). En el lavabo hay dos ítems: el detector y el extintor de la papelera.",
  },
  {
    id: "calefaccion-tat",
    tipo: "buscaElItem",
    sintoma: "ECAM: falla la calefacción de la sonda TAT 2.",
    capitulos: caps("30", "34", "31", "36"),
    capitulo: "30",
    items: [
      { codigo: "30-31-02", titulo: "Pitot Heaters" },
      { codigo: "30-31-03", titulo: "Static Port Heaters" },
      { codigo: "30-31-04", titulo: "Angle of Attack Probe Heaters" },
      { codigo: "30-31-05", titulo: "TAT Probe Heaters" },
    ],
    item: "30-31-05",
    fuente: INDICE_A320,
    explicacion:
      "La calefacción de sondas es protección contra hielo (30), no navegación (34), aunque las sondas alimenten datos de aire. Cada sonda tiene su ítem: pitot, estática, AOA y TAT.",
  },
  {
    id: "valvula-sangrado",
    tipo: "buscaElItem",
    sintoma: "ECAM: la válvula reguladora de presión (PRV) del sangrado del motor 2 queda cerrada.",
    capitulos: caps("36", "21", "73", "49"),
    capitulo: "36",
    items: [
      { codigo: "36-11-02", titulo: "Bleed Valves (PRV)" },
      { codigo: "36-11-04", titulo: "Fan Air Valves (FAV)" },
      { codigo: "36-11-07", titulo: "High Pressure Valves (HPV)" },
      { codigo: "36-12-02", titulo: "APU Bleed Valve" },
    ],
    item: "36-11-02",
    fuente: INDICE_A320,
    explicacion:
      "El sangrado es neumático (36). En esta MMEL no se busca en «75 Bleed Air» ni en aire acondicionado. Y la PRV tiene nombre propio, distinto de la HPV y de la FAV.",
  },
  {
    id: "autofreno",
    tipo: "buscaElItem",
    sintoma: "El autofreno no se arma en ningún modo; el frenado manual es normal.",
    capitulos: caps("27", "29", "22", "32"),
    capitulo: "32",
    items: [
      { codigo: "32-42-01", titulo: "Main Wheel Braking Systems" },
      { codigo: "32-42-04", titulo: "AUTO/BRK Function" },
      { codigo: "32-47-01", titulo: "Brake Temperature Monitoring Unit" },
      { codigo: "32-51-03", titulo: "Nose Wheel Steering Control System Deactivation Device (For A/C Towing)" },
    ],
    item: "32-42-04",
    fuente: INDICE_A320,
    explicacion:
      "Frenos van con el tren (32 Landing Gear), no con autovuelo (22). Si el frenado normal está bien, el ítem es la función AUTO/BRK, no los frenos.",
  },
  {
    id: "ads-b",
    tipo: "buscaElItem",
    sintoma: "Tras el prevuelo, el sistema muestra falla de la función ADS-B out.",
    capitulos: caps("23", "31", "34", "22"),
    capitulo: "34",
    items: [
      { codigo: "34-43-01", titulo: "Traffic Alert and Collision Avoidance System (TCAS II)" },
      { codigo: "34-52-01", titulo: "ATC Transponders and Automatic Altitude Reporting Systems" },
      { codigo: "34-55-01", titulo: "VOR Navigation" },
      { codigo: "34-57-02", titulo: "Automatic Dependent Surveillance-Broadcast (ADS-B) System" },
    ],
    item: "34-57-02",
    fuente: INDICE_A320,
    explicacion:
      "La ADS-B está en 34 Navigation con ítem propio, no en comunicaciones (23). Aunque use el transpondedor, el alivio y sus condiciones (autorización previa de ATC) están en 34-57-02.",
  },
  {
    id: "bomba-combustible-apu",
    tipo: "buscaElItem",
    sintoma: "La bomba de combustible de la APU no funciona; los motores están normales.",
    capitulos: caps("28", "49", "73", "24"),
    capitulo: "49",
    items: [
      { codigo: "49-10-01", titulo: "APU System" },
      { codigo: "49-30-02", titulo: "APU LP Valve" },
      { codigo: "49-30-01", titulo: "APU Fuel Pump" },
      { codigo: "49-70-01", titulo: "MASTER Switch ON Light" },
    ],
    item: "49-30-01",
    fuente: INDICE_A320,
    explicacion:
      "Es combustible, pero de la APU: está en 49 Airborne Auxiliary Power, no en 28 Fuel. La trampa es buscar por la palabra «fuel».",
  },
  {
    id: "luces-inspeccion-ala",
    tipo: "buscaElItem",
    sintoma: "De noche, antes del deshielo, las luces que iluminan el borde de ataque del ala no encienden.",
    capitulos: caps("30", "33", "26", "32"),
    capitulo: "33",
    items: [
      { codigo: "33-40-02", titulo: "Landing Lighting System" },
      { codigo: "33-40-05", titulo: "Logo Lights" },
      { codigo: "33-40-06", titulo: "Anticollision/Strobe Lighting" },
      { codigo: "33-40-07", titulo: "Wing Scan Lights" },
    ],
    item: "33-40-07",
    fuente: INDICE_A320,
    explicacion:
      "Sirven para ver el hielo, pero son luces: 33-40-07 Wing Scan Lights. Su condición sí habla de hielo: que los procedimientos de deshielo en tierra no las requieran.",
  },
]

// ─── f) Impacto operacional (11) ─────────────────────────────────────────────

export const MEL_IMPACTO_OPERACIONAL: EjImpactoOperacional[] = [
  {
    id: "alerta-altitud",
    tipo: "impactoOperacional",
    contexto: "Alerta de altitud diferida por la fila A.",
    entrada: ALT_ALERT,
    fila: 0,
    afecta: ["rvsm"],
    porQue: {
      rvsm: "«Enroute operations (i.e., RVSM) do not require its use»: fuera de RVSM.",
      combustible: "Volar por debajo de RVSM cambia el consumo, pero es consecuencia del nivel; la capacidad que se pierde es RVSM.",
    },
    fuente: ALT_ALERT.fuente ?? "",
    explicacion:
      "La entrada nombra RVSM por su nombre. Lo demás (autopiloto, aeropuerto designado, plazo) son condiciones, no capacidades que se pierdan.",
  },
  {
    id: "calefaccion-pitot-aux-b737",
    tipo: "impactoOperacional",
    contexto: "B737-300: calefactor pitot/estático auxiliar No. 1 inoperativo.",
    entrada: B737_AUX_PITOT,
    fila: 1,
    afecta: ["rvsm", "meteorologia"],
    porQue: {
      rvsm: "«RVSM operations are not conducted».",
      meteorologia: "Nada de engelamiento conocido o pronosticado.",
    },
    fuente: B737_AUX_PITOT.fuente ?? "",
    explicacion: "Dos capacidades en una sola entrada: el nivel (fuera de RVSM) y la meteorología (sin engelamiento).",
  },
  {
    id: "computador-calefaccion-ventanas",
    tipo: "impactoOperacional",
    contexto: "Un computador de calefacción de ventanas inoperativo.",
    entrada: WINDOW_HEAT,
    fila: 0,
    afecta: ["edto", "meteorologia", "catIIIII"],
    porQue: {
      edto: "Excluye ETOPS de más de 120 minutos.",
      meteorologia: "Sin engelamiento conocido o pronosticado.",
      catIIIII: "«Approach minimums do not require its use»: las aproximaciones con mínimos que lo exijan quedan fuera.",
    },
    fuente: `${WINDOW_HEAT.fuente}. VERIFICAR qué mínimos lo exigen contra el AFM y las autorizaciones del operador.`,
    explicacion:
      "Tres límites en una entrada: EDTO largo, engelamiento y mínimos de aproximación. Cuáles aproximaciones exactamente lo exigen lo dicen el AFM y las autorizaciones del operador.",
  },
  {
    id: "luz-aterrizaje-extendida",
    tipo: "impactoOperacional",
    contexto: "Una luz de aterrizaje quedó extendida (sub-ítem 2), fila (O)).",
    entrada: LANDING_LIGHTS,
    fila: 2,
    afecta: ["combustible"],
    porQue: { combustible: "«A 1% fuel penalty is applied for each extended light»." },
    fuente: LANDING_LIGHTS.fuente ?? "",
    explicacion: "Una luz extendida no es un problema de luz: es resistencia. La MMEL lo traduce en combustible: 1 % por cada luz extendida.",
  },
  {
    id: "flex",
    tipo: "impactoOperacional",
    contexto: "FLEX TEMP inoperativo.",
    entrada: FLEX,
    fila: 0,
    afecta: ["performance"],
    porQue: { performance: "Despegue en TOGA o de-rated: otros datos de despegue." },
    fuente: FLEX.fuente ?? "",
    explicacion: "Cambia cómo se calcula el despegue. Los números salen del sistema de performance del operador para el modo que se use.",
  },
  {
    id: "base-de-datos",
    tipo: "impactoOperacional",
    contexto: "Base de datos de navegación inoperativa (no vencida).",
    entrada: NAV_DATABASE,
    fila: 0,
    afecta: ["pbn"],
    porQue: { pbn: "Sin base de datos no hay procedimientos RNAV/RNP: «Operations do not require its use»." },
    fuente: `${NAV_DATABASE.fuente}. VERIFICAR qué operaciones PBN autoriza el operador contra sus especificaciones.`,
    explicacion:
      "Sin base de datos no hay rutas ni procedimientos PBN. Además hay que avisar a ATC por el plan de vuelo OACI (condición d).",
  },
  {
    id: "limpiaparabrisas",
    tipo: "impactoOperacional",
    contexto: "Los dos limpiaparabrisas inoperativos (primera fila).",
    entrada: WIPER,
    fila: 0,
    afecta: ["meteorologia", "catIIIII"],
    porQue: {
      meteorologia: "Sin precipitación a menos de 5 SM del despegue y del aterrizaje previsto.",
      catIIIII: "«Approach minimums do not require its use».",
    },
    fuente: `${WIPER.fuente}. VERIFICAR qué mínimos lo exigen contra el AFM y las autorizaciones del operador.`,
    explicacion: "El avión depende del pronóstico en origen y destino, y de que la aproximación prevista no necesite los limpiaparabrisas.",
  },
  {
    id: "autoland-b737",
    tipo: "impactoOperacional",
    contexto: "B737-800: el aterrizaje automático fail operational (LAND 3) está inoperativo.",
    entrada: B737_AUTOLAND,
    fila: 1,
    afecta: ["catIIIII"],
    porQue: { catIIIII: "«Approach minimums do not require its use»: las aproximaciones que usan LAND 3 quedan fuera." },
    fuente: `${B737_AUTOLAND.fuente}. VERIFICAR qué categorías de aproximación autoriza el operador con fail passive.`,
    explicacion: "Es el ejemplo más directo: el alivio existe mientras la aproximación no dependa del sistema. Con niebla en destino, el plan cambia.",
  },
  {
    id: "luces-logo",
    tipo: "impactoOperacional",
    contexto: "Las dos luces del logo inoperativas.",
    entrada: LOGO_LIGHTS,
    fila: 0,
    afecta: ["ninguna"],
    porQue: { ninguna: "D, sin condiciones: se anota, se pone placard y se repara en plazo." },
    fuente: LOGO_LIGHTS.fuente ?? "",
    explicacion: "No todo diferido cambia el vuelo. Este no: sin condiciones y sin procedimientos. Igual lleva anotación, placard y plazo.",
  },
  {
    id: "sangrado-motor",
    tipo: "impactoOperacional",
    contexto: "Un sistema de sangrado de motor inoperativo (36-11-01, sub-ítem 1)).",
    entrada: BLEED_SUPPLY,
    fila: 0,
    afecta: ["edto", "meteorologia", "combustible"],
    porQue: {
      edto: "Excluye ETOPS de más de 120 minutos.",
      meteorologia: "Sin engelamiento conocido o pronosticado.",
      combustible: "FL 310 o por debajo: el plan en un nivel más alto se rehace, y cambia el consumo.",
    },
    fuente: BLEED_SUPPLY.fuente ?? "",
    explicacion: "El techo de FL 310 no se marca como RVSM: se puede volar en RVSM por debajo de FL 310. Lo que cambia es el nivel del plan y, con él, el combustible.",
  },
  {
    id: "bomba-tanque-central",
    tipo: "impactoOperacional",
    contexto: "Una de las dos bombas del tanque central inoperativa (primera fila).",
    entrada: CENTER_TANK,
    fila: 1,
    afecta: ["combustible"],
    porQue: {
      combustible:
        "Si se necesita el combustible del central, tiene que haber un alterno adecuado al alcance del combustible de las alas: cambia el plan de combustible y el alterno.",
    },
    fuente: CENTER_TANK.fuente ?? "",
    explicacion:
      "La condición es de planificación: por si el combustible del central no se puede usar, el vuelo tiene que poder llegar a un alterno con el de las alas.",
  },
]

// ─── Todo junto ──────────────────────────────────────────────────────────────

export const MEL_PRACTICA_DATOS: readonly EjercicioMel[] = [
  ...MEL_LEE_LA_ENTRADA,
  ...MEL_PODEMOS_SALIR,
  ...MEL_CALCULA_EL_PLAZO,
  ...MEL_COMBINADOS,
  ...MEL_BUSCA_EL_ITEM,
  ...MEL_IMPACTO_OPERACIONAL,
]

/** Las entradas usadas, para verificar formato y citas. */
export const MEL_ENTRADAS_REALES: readonly EntradaMel[] = [
  ALT_ALERT,
  RADIO_ALTIMETRO,
  ADR3,
  AUTOPILOTO,
  AP_DISC,
  TAT,
  WINDOW_HEAT,
  WIPER,
  RAIN_REPELLANT,
  LANDING_LIGHTS,
  TAXI_LIGHTS,
  LOGO_LIGHTS,
  SLIDE_LIGHTING,
  NAV_DATABASE,
  RAM_AIR,
  BLEED_SUPPLY,
  PRV,
  APU_FUEL_PUMP,
  FLEX,
  OVERTHRUST,
  FUEL_FILTER,
  AVIONICS_SMOKE,
  O2_MANUAL,
  CENTER_TANK,
  B737_LAV_SMOKE,
  B737_AUX_PITOT,
  B737_AUTOLAND,
]

export const MEL_ENTRADAS_INVENTADAS: readonly EntradaMel[] = [
  HYD_QTY,
  CARGO_DOOR,
  WATER_HEATER,
  INTERPHONE,
  LOUDSPEAKER,
  GALLEY_SHED,
  PACK_OUTLET,
  FUEL_USED,
  CENTER_QTY,
  WATER_QTY,
  APU_BLEED,
  ENG_BLEED,
  READING_LIGHTS,
  FLAP_SECUNDARIA,
  FLAP_PRIMARIA,
]

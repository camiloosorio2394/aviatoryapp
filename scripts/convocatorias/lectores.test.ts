// Los lectores de convocatorias contra lo que devolvieron los portales el
// 26-sep-2026 (scripts/convocatorias/fixtures). Si una aerolínea cambia su
// portal y la función empieza a fallar, se baja la muestra nueva, se ajusta el
// lector y estas pruebas dicen si lo de antes sigue funcionando.
import fs from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"
import {
  COPA_LISTA,
  SATENA_PAGINA,
  WINGO_PAGINA,
  avianca,
  candidatosCopa,
  candidatosSitemap,
  ARAJET_LISTA,
  BOA_EMPLEOS,
  CLIC_PAGINA,
  VIVA_PILOTOS,
  VIVA_RSS,
  VOLARIS_REQUISITOS,
  arajet,
  paginaViva,
  paginaVolaris,
  requisitosClave,
  vacantesViva,
  viva,
  volaris,
  SKY_LISTA,
  boa,
  candidatosSky,
  cargoDelTitulo,
  clic,
  copa,
  copaDetalle,
  fechaSuccessFactors,
  jetsmart,
  requisitosDelHtml,
  satena,
  sky,
  textoPlano,
  vacanteCopa,
  vacanteSuccessFactors,
  vacanteWingo,
  vacanteSky,
  vacantesBoa,
  vacantesClic,
  vacantesSatena,
  wingo,
  type Traer,
} from "../../supabase/functions/revisar-convocatorias/lectores"

const muestra = (f: string) => fs.readFileSync(path.join(__dirname, "fixtures", f), "utf8")

/** Un `traer` que responde con las muestras y falla con cualquier otra URL. */
function traerDe(mapa: Record<string, string>): Traer {
  return async (url) => {
    if (!(url in mapa)) throw new Error(`URL no esperada: ${url}`)
    return muestra(mapa[url])
  }
}

describe("cargoDelTitulo", () => {
  it("reconoce los cargos de piloto como los escriben las aerolíneas", () => {
    expect(cargoDelTitulo("Primer Oficial")).toBe("primer_oficial")
    expect(cargoDelTitulo("PRIMER-OFICIAL-Buenos-Air")).toBe("primer_oficial")
    expect(cargoDelTitulo("Copiloto A320")).toBe("primer_oficial")
    expect(cargoDelTitulo("B737 First Officer")).toBe("primer_oficial")
    expect(cargoDelTitulo("Capitan")).toBe("capitan")
    expect(cargoDelTitulo("CAPITÁN")).toBe("capitan")
    expect(cargoDelTitulo("Programa de Cadetes 2027")).toBe("cadete")
    expect(cargoDelTitulo("Pilotos")).toBe("piloto")
  })

  it("no confunde cargos de tierra que mencionan el vuelo", () => {
    expect(cargoDelTitulo("Analista Senior de Despacho Temporal")).toBeNull()
    expect(cargoDelTitulo("DESPACHADOR VUELO")).toBeNull()
    expect(cargoDelTitulo("Tripulante de Cabina")).toBeNull()
    expect(cargoDelTitulo("Mecanico de Aviacion")).toBeNull()
    expect(cargoDelTitulo("Instructor de simulador")).toBeNull()
    expect(cargoDelTitulo("SEMILLERO AGENTE DE OPERACIONES ADZ 2026")).toBeNull()
  })
})

describe("textos y fechas", () => {
  it("decodifica las entidades y aplana el HTML", () => {
    expect(textoPlano("<p>Licencia&nbsp;<b>PCA</b> &amp; m&aacute;s</p>")).toBe("Licencia PCA & más")
  })

  it("lee las fechas de SuccessFactors en la hora de Bogotá", () => {
    expect(fechaSuccessFactors("Wed Sep 09 02:00:00 UTC 2026")).toBe("2026-09-08")
    expect(fechaSuccessFactors("Fri Jan 01 03:00:00 UTC 2027")).toBe("2026-12-31")
    expect(fechaSuccessFactors("mañana")).toBeNull()
  })

  it("toma solo las listas que van bajo un título de requisitos", () => {
    const html = "<h3>Funciones</h3><ul><li>Volar</li></ul><p><strong>Requisitos</strong></p><ul><li>Licencia</li><li>Médico</li></ul><p>Beneficios</p><ul><li>Seguro</li></ul>"
    expect(requisitosDelHtml(html)).toEqual(["Licencia", "Médico"])
  })
})

describe("Copa", () => {
  it("de la lista toma solo las vacantes con título de piloto", () => {
    expect(candidatosCopa(muestra("copa-lista.json"))).toEqual([
      { id: "12380", titulo: "Primer Oficial" },
      { id: "12379", titulo: "Capitan" },
    ])
  })

  it("lee el Primer Oficial con sus fechas, su lugar y sus requisitos en inglés", () => {
    const v = vacanteCopa(muestra("copa-12380.json"))
    expect(v).toMatchObject({
      clave: "12380",
      cargo: "primer_oficial",
      titulo: "Primer Oficial",
      pais: "Panamá",
      ciudad: "Panamá",
      publicadaEn: "2026-02-10",
      cierraEn: "2026-12-31",
      idioma: "en",
      abierta: true,
    })
    expect(v?.url).toBe("https://ejom.fa.us6.oraclecloud.com/hcmUI/CandidateExperience/es/sites/CX_1/job/12380")
    expect(v?.requisitos).toHaveLength(8)
    expect(v?.requisitos[0]).toBe("Minimum age: Twenty-one (21) years.")
    expect(v?.requisitos).toContain("Minimum ICAO English Language Proficiency level 5")
    // Los beneficios no son requisitos.
    expect(v?.requisitos.join(" ")).not.toMatch(/health insurance/)
  })

  it("una lista vacía es un fallo, no «no hay vacantes»", () => {
    expect(() => candidatosCopa(JSON.stringify({ items: [{ requisitionList: [] }] }))).toThrow(/vacía/)
  })

  it("la fuente entera: descarga la lista y el detalle de cada candidata", async () => {
    const detalleCapitan = JSON.stringify({ items: [{ Id: "12379", Title: "Capitan", JobFunctionCode: "PILOTO" }] })
    const mapa: Record<string, string> = { [COPA_LISTA]: "copa-lista.json", [copaDetalle("12380")]: "copa-12380.json" }
    const traer: Traer = async (url) => (url === copaDetalle("12379") ? detalleCapitan : traerDe(mapa)(url))
    const vacantes = await copa.leer(traer)
    expect(vacantes.map((v) => [v.clave, v.cargo])).toEqual([
      ["12380", "primer_oficial"],
      ["12379", "capitan"],
    ])
  })
})

describe("JetSMART y Avianca (SuccessFactors)", () => {
  it("del sitemap de JetSMART salen el Primer Oficial y el Capitán, nada más", () => {
    expect(candidatosSitemap(muestra("jetsmart-sitemap.xml"), "https://recruitment.jetsmart.net")).toEqual([
      { clave: "1329568962", url: "https://recruitment.jetsmart.net/job/PRIMER-OFICIAL-Buenos-Air/1329568962/" },
      { clave: "1329970462", url: "https://recruitment.jetsmart.net/job/Medellin-CAPIT%C3%81N-Medell%C3%ADn-%28/1329970462/" },
    ])
  })

  it("el sitemap de Avianca de ese día no tenía vacantes de piloto", () => {
    expect(candidatosSitemap(muestra("avianca-sitemap.xml"), "https://jobs.avianca.com")).toEqual([])
  })

  it("lee la vacante de JetSMART: base en Argentina, fechas y requisitos", () => {
    const url = "https://recruitment.jetsmart.net/job/PRIMER-OFICIAL-Buenos-Air/1329568962/"
    const v = vacanteSuccessFactors(muestra("jetsmart-primer-oficial.html"), url, "1329568962")
    expect(v).toMatchObject({
      cargo: "primer_oficial",
      titulo: "Primer oficial",
      pais: "Argentina",
      ciudad: null,
      publicadaEn: "2026-09-08",
      cierraEn: "2026-12-31",
      idioma: "es",
      abierta: true,
    })
    expect(v?.requisitos[0]).toBe("Licencia Argentina de Piloto Comercial o Comercial de Primera Vigente.")
    expect(v?.requisitos).toContain("Nivel de inglés OACI 4 o superior vigente")
  })

  it("en Avianca el país va al final («Bogotá, CO») y una vacante de tierra no pasa", () => {
    expect(vacanteSuccessFactors(muestra("avianca-coordinador.html"), "https://jobs.avianca.com/job/x/1441065833/", "1441065833")).toBeNull()
  })

  it("las fuentes completas no descargan más que el sitemap cuando no hay candidatas", async () => {
    const vacantes = await avianca.leer(traerDe({ "https://jobs.avianca.com/sitemap.xml": "avianca-sitemap.xml" }))
    expect(vacantes).toEqual([])
    const traerJs = traerDe({
      "https://recruitment.jetsmart.net/sitemap.xml": "jetsmart-sitemap.xml",
      "https://recruitment.jetsmart.net/job/PRIMER-OFICIAL-Buenos-Air/1329568962/": "jetsmart-primer-oficial.html",
      "https://recruitment.jetsmart.net/job/Medellin-CAPIT%C3%81N-Medell%C3%ADn-%28/1329970462/": "jetsmart-primer-oficial.html",
    })
    expect((await jetsmart.leer(traerJs)).length).toBe(2)
  })

  it("un sitemap vacío es un fallo", () => {
    expect(() => candidatosSitemap("<urlset></urlset>", "https://jobs.avianca.com")).toThrow(/sin vacantes/)
  })
})

describe("Wingo", () => {
  it("sin vacantes, pero con sus requisitos publicados", () => {
    const v = vacanteWingo(muestra("wingo.html"))
    expect(v.abierta).toBe(false)
    expect(v.tipo).toBe("pagina")
    expect(v.url).toBe(WINGO_PAGINA)
    expect(v.requisitos).toContain("Debes ser mayor de 21 años.")
    expect(v.requisitos).toContain("Copia del Examen TEA o EALTS mínimo nivel 4.")
    // «Funciones del cargo» no son requisitos, ni la indicación de mandar el PDF.
    expect(v.requisitos.join(" ")).not.toMatch(/Comandar de manera segura|un solo documento en PDF/)
  })

  it("cuando el bloque deja de decir «no tenemos vacantes», queda abierta", async () => {
    // La frase sale dos veces (tripulantes y pilotos): se cambia la de pilotos.
    const html = muestra("wingo.html").replace("no tenemos vacantes disponibles. Sin embargo, si lo tuyo es volar", "estamos buscando Primeros Oficiales. Si lo tuyo es volar")
    const [v] = await wingo.leer(async () => html)
    expect(v.abierta).toBe(true)
  })
})

describe("SATENA", () => {
  it("«no hay ofertas laborales» es cero vacantes, no un fallo", async () => {
    expect(await satena.leer(traerDe({ [SATENA_PAGINA]: "satena.html" }))).toEqual([])
  })

  it("si aparece una oferta de piloto, la toma", () => {
    const html = "<h2>Ofertas de Empleo</h2><div><a>Copiloto ATR 42</a></div><div><a>Auxiliar contable</a></div>"
    expect(vacantesSatena(html).map((v) => [v.clave, v.cargo])).toEqual([["copiloto-atr-42", "primer_oficial"]])
  })
})

describe("Clic", () => {
  it("hoy: cuatro vacantes de tierra, ninguna de piloto", async () => {
    expect(await clic.leer(traerDe({ [CLIC_PAGINA]: "clic.html" }))).toEqual([])
  })

  it("octubre de 2024: «PILOTO 42/72 - 600» era para capitán, con sus requisitos en lista", () => {
    const [v] = vacantesClic(muestra("clic-2024.html"))
    expect(v).toMatchObject({
      clave: "piloto-42-72-600-20241009",
      cargo: "capitan",
      titulo: "PILOTO 42/72 - 600",
      pais: "Colombia",
      ciudad: "Bogotá",
      url: CLIC_PAGINA,
      publicadaEn: "2024-10-09",
      cierraEn: null,
      abierta: true,
    })
    expect(v.requisitos).toContain("5.000 horas de vuelo, adjuntar certificado de horas voladas")
    expect(v.requisitos).toContain("Certificado original examen de inglés, con nivel mínimo OACI 4")
  })

  it("los requisitos en párrafo con viñetas «°» también se leen", () => {
    const html =
      '<div class="accordion"><div class="accordion-item"><div class="mpre"> 01/11/2026 / Bogotá </div><div class="tit">Primer Oficial ATR</div>' +
      "<h3>Requisitos:&nbsp;</h3><p><strong>&deg;</strong> Licencia PCA<br /><span>&deg;</span> 250 horas de vuelo<br />&deg; Inglés OACI 4</p></div></div>"
    const [v] = vacantesClic(html)
    expect(v.cargo).toBe("primer_oficial")
    expect(v.requisitos).toEqual(["Licencia PCA", "250 horas de vuelo", "Inglés OACI 4"])
  })
})

describe("Sky Airline (Genoma)", () => {
  it("la lista de ese día no tenía avisos de piloto", () => {
    expect(candidatosSky(muestra("sky-lista.json"))).toEqual([])
  })

  it("un aviso de piloto: país, fecha, enlace y requisitos en lista", () => {
    const detalle = JSON.parse(muestra("sky-detalle.json"))
    const piloto = {
      ...detalle,
      job_application: "Primer Oficial A320",
      location_city: "Lima",
      location_country: "PE",
      description: "<p>Buscamos pilotos.</p><p><strong>Requisitos</strong></p><ul><li>Licencia de piloto comercial</li><li>250 horas de vuelo</li></ul>",
    }
    const v = vacanteSky(JSON.stringify(piloto))
    expect(v).toMatchObject({ cargo: "primer_oficial", pais: "Perú", url: `https://jobs.genoma.work/sky-airline/${detalle.id}/` })
    expect(v?.requisitos).toEqual(["Licencia de piloto comercial", "250 horas de vuelo"])
    // Un aviso cerrado no cuenta.
    expect(vacanteSky(JSON.stringify({ ...piloto, status: "CLOSE" }))).toBeNull()
  })

  it("una lista vacía es un fallo", () => {
    expect(() => candidatosSky(JSON.stringify({ jobapplications: [] }))).toThrow(/vacía/)
  })

  it("la fuente entera: con la lista de ese día no descarga ningún detalle", async () => {
    expect(await sky.leer(traerDe({ [SKY_LISTA]: "sky-lista.json" }))).toEqual([])
  })
})

describe("BoA (WordPress)", () => {
  it("la lista vacía de ese día es «no hay vacantes», no un fallo", async () => {
    expect(await boa.leer(traerDe({ [BOA_EMPLEOS]: "boa-empleo.json" }))).toEqual([])
  })

  it("una entrada de piloto se lee con su enlace y sus requisitos", () => {
    const [v] = vacantesBoa(
      JSON.stringify([
        {
          id: 5120,
          date: "2026-10-02T09:00:00",
          link: "https://www.boa.gob.bo/empleo/primer-oficial-b737/",
          title: { rendered: "Primer Oficial B737 &#8211; Cochabamba" },
          content: { rendered: "<h3>Requisitos</h3><ul><li>Licencia de piloto comercial boliviana</li><li>500 horas de vuelo</li></ul>" },
        },
        { id: 5121, date: "2026-10-02T09:00:00", link: "https://www.boa.gob.bo/empleo/agente/", title: { rendered: "Agente de counter" } },
      ]),
    )
    expect(v).toMatchObject({ clave: "boa-5120", cargo: "primer_oficial", pais: "Bolivia", publicadaEn: "2026-10-02" })
    expect(v.titulo).toBe("Primer Oficial B737 – Cochabamba")
    expect(v.requisitos).toEqual(["Licencia de piloto comercial boliviana", "500 horas de vuelo"])
  })

  it("lo que no es una lista es un fallo", () => {
    expect(() => vacantesBoa(JSON.stringify({ code: "rest_no_route" }))).toThrow(/otra forma/)
  })
})

describe("requisitosClave: las horas y el nivel, leídos de los requisitos", () => {
  it("LATAM: 150 horas y OACI 4", () => {
    expect(requisitosClave(["Haber acumulado 150 horas de vuelo o más", "Contar con Nivel de Inglés OACI 4 o Superior"])).toEqual({
      horas: 150,
      horasNacionales: null,
      horasExtranjeros: null,
      icao: 4,
    })
  })

  it("Copa: panameños y extranjeros en renglones aparte, ICAO 5", () => {
    expect(
      requisitosClave([
        "For Panamanians, minimum of 250 hours of total time in fixed wing aircraft",
        "For foreign applicants: A minimum of 1,000 hours of total flight time in fixed-wing aircraft",
        "Minimum ICAO English Language Proficiency level 5",
      ]),
    ).toEqual({ horas: null, horasNacionales: 250, horasExtranjeros: 1000, icao: 5 })
  })

  it("Arajet: las dos cifras en el mismo renglón, la de dominicanos entre paréntesis", () => {
    expect(
      requisitosClave(["Equal or more than 1,500 total hours (1,000 hours for Dominican candidates).", "ICAO Lv. 4 ENGLISH Language Proficiency", "No PIC hours requirement needed."]),
    ).toEqual({ horas: 1500, horasNacionales: 1000, horasExtranjeros: null, icao: 4 })
  })

  it("las horas al mando, en jet o como capitán no son las totales", () => {
    expect(
      requisitosClave([
        "3.000 horas de vuelo mínimo total.",
        "1.000 h de vuelo como capitán en JET de línea aérea o 3.000 horas de vuelo como capitán en ATR.",
        "1,000 hours of flight time as PIC on transport category aircraft over 100 passengers.",
      ]).horas,
    ).toBe(3000)
    // Pero lo que viene después de la coma ya es otra cosa.
    expect(requisitosClave(["1.800 horas, con mínimo 800 en jet"]).horas).toBe(1800)
  })

  it("Volaris y Viva: «220 hrs.», «Nivel de inglés 4» y «RTARI 4»", () => {
    expect(requisitosClave(["Contar con mínimo 220 hrs. de vuelo certificadas en bitácora.", "Nivel de inglés 4 o superior con certificado de aviación."])).toMatchObject({
      horas: 220,
      icao: 4,
    })
    expect(requisitosClave(["RTARI 4 o superior.", "200 horas de vuelo real."])).toMatchObject({ horas: 200, icao: 4 })
  })

  it("Wingo no publica horas; un avión, una visa o un pasaporte no son horas ni nivel", () => {
    expect(requisitosClave(["Copia del Examen TEA o EALTS mínimo nivel 4.", "Copia de la última hoja de la bitácora de vuelo."])).toEqual({
      horas: null,
      horasNacionales: null,
      horasExtranjeros: null,
      icao: 4,
    })
    expect(requisitosClave(["Curso de familiarización A320 (A320 FAM)", "Visa B1/B2 para EE.UU. vigente", "Pasaporte con vigencia de al menos 6 meses"])).toEqual({
      horas: null,
      horasNacionales: null,
      horasExtranjeros: null,
      icao: null,
    })
  })
})

describe("Arajet (Manatal)", () => {
  it("First Officer y Captain, con sus requisitos en inglés; la paginación sigue hasta el final", async () => {
    const vacantes = await arajet.leer(
      traerDe({
        [ARAJET_LISTA]: "arajet-1.json",
        "https://www.careers-page.com/api/v1.0/c/arajetjobs/jobs/?page=2&page_size=20": "arajet-2.json",
      }),
    )
    expect(vacantes.map((v) => [v.clave, v.cargo, v.pais])).toEqual([
      ["QV5Y38X8", "capitan", "República Dominicana"],
      ["W35R565W", "primer_oficial", "República Dominicana"],
    ])
    const fo = vacantes.find((v) => v.clave === "W35R565W")
    expect(fo).toMatchObject({ idioma: "en", url: "https://www.careers-page.com/arajetjobs/job/W35R565W", publicadaEn: null })
    expect(fo?.requisitos).toContain("Equal or more than 1,500 total hours (1,000 hours for Dominican candidates).")
    expect(requisitosClave(fo?.requisitos ?? [])).toMatchObject({ horas: 1500, horasNacionales: 1000, icao: 4 })
  })
})

describe("Volaris", () => {
  it("su página fija de requisitos de copiloto, como página cerrada", () => {
    const v = paginaVolaris(muestra("volaris-requisitos.html"))
    expect(v).toMatchObject({ tipo: "pagina", abierta: false, cargo: "primer_oficial", pais: "México" })
    expect(v.requisitos).toContain("Pasaporte mexicano / costarricense / salvadoreño vigente.")
    expect(requisitosClave(v.requisitos)).toMatchObject({ horas: 220, icao: 4 })
  })

  it("la fuente entera: la página de requisitos y, del sitemap, ninguna vacante de piloto ese día", async () => {
    const vacantes = await volaris.leer(
      traerDe({ "https://jobs.volaris.com/sitemap.xml": "volaris-sitemap.xml", [VOLARIS_REQUISITOS]: "volaris-requisitos.html" }),
    )
    expect(vacantes.map((v) => v.clave)).toEqual(["requisitos-copiloto"])
  })
})

describe("Viva", () => {
  it("el RSS: «Piloto (TBD)» es un semillero y no cuenta", () => {
    expect(vacantesViva(muestra("viva.rss"))).toEqual([])
  })

  it("la página del área: la ruta de Primer Oficial sin experiencia en jet, 200 horas y RTARI 4", () => {
    const v = paginaViva(muestra("viva-pilotos.html"))
    expect(v).toMatchObject({ tipo: "pagina", abierta: false, titulo: "Primer oficial sin experiencia en jet" })
    expect(v.requisitos).toContain("Pasaporte Mexicano vigente.")
    expect(requisitosClave(v.requisitos)).toMatchObject({ horas: 200, icao: 4 })
  })

  it("la fuente entera devuelve solo la página", async () => {
    const vacantes = await viva.leer(traerDe({ [VIVA_RSS]: "viva.rss", [VIVA_PILOTOS]: "viva-pilotos.html" }))
    expect(vacantes.map((v) => v.clave)).toEqual(["primer-oficial-sin-jet"])
  })
})

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
  cargoDelTitulo,
  copa,
  copaDetalle,
  fechaSuccessFactors,
  jetsmart,
  requisitosDelHtml,
  satena,
  textoPlano,
  vacanteCopa,
  vacanteSuccessFactors,
  vacanteWingo,
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

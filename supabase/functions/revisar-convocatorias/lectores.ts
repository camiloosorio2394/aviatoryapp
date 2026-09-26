// Los lectores de convocatorias: qué vacantes de piloto tiene abiertas cada
// aerolínea y qué requisitos publicó, leído de su propio portal de empleo.
//
// Este archivo no toca la red ni la base: cada fuente recibe `traer` (la que
// descarga una URL como texto) y devuelve lo que encontró. index.ts le pasa el
// fetch de verdad; scripts/convocatorias/lectores.test.ts le pasa las muestras
// guardadas en scripts/convocatorias/fixtures. Por eso no importa nada de Deno.
//
// De dónde lee cada una (revisado el 26-sep-2026, respetando el robots.txt de
// cada sitio):
//   Copa      la API pública de Oracle Recruiting (JSON).
//   Avianca   el sitemap de jobs.avianca.com y la página de cada vacante.
//   JetSMART  el sitemap de recruitment.jetsmart.net y la página de cada vacante.
//   Wingo     el bloque «Pilotos» de su página «Trabaja con nosotros».
//   SATENA    su bolsa de empleo.
//   Clic      su página «Trabaja con nosotros» (HTML propio; se postula por correo).
//   Sky       la API pública de Genoma, su portal de empleo (Chile y Perú).
//   BoA       la API de WordPress de su sitio institucional (post type «empleo»).
//   Arajet    la API pública de Manatal (careers-page.com).
//   Volaris   el sitemap de SuccessFactors y su página fija de requisitos.
//   Viva      el RSS de Teamtailor (área Pilotos) y la página del área.
//   Aeroméxico y Aerolíneas Argentinas: a mano. Aeroméxico publica en el portal
//             de su sindicato y Aerolíneas Argentinas solo en LinkedIn, que
//             prohíbe leerlo.
//   LATAM     ninguna: el robots.txt de su portal prohíbe leer la lista. Se
//             marca a mano con private.convocatoria_manual().

export type Cargo = "primer_oficial" | "cadete" | "piloto" | "capitan"

export interface Vacante {
  /** El id en la fuente. Solo letras, números y guiones. */
  clave: string
  cargo: Cargo
  titulo: string
  pais: string | null
  ciudad: string | null
  url: string
  /** AAAA-MM-DD, en la hora de Bogotá. */
  publicadaEn: string | null
  cierraEn: string | null
  /** Tal como los publicó la aerolínea, uno por renglón. */
  requisitos: string[]
  idioma: "es" | "en"
  abierta: boolean
  /**
   * `vacante`: una convocatoria puntual. `pagina`: la página de pilotos de la
   * aerolínea (Wingo, LATAM), que está siempre y dice si hay vacantes o no.
   */
  tipo: "vacante" | "pagina"
}

export type Traer = (url: string) => Promise<string>

export interface Fuente {
  /** El código OACI de la tabla `airlines`. */
  codigo: string
  leer: (traer: Traer) => Promise<Vacante[]>
}

// ─── Texto ──────────────────────────────────────────────────────────────────

const ENTIDADES: Record<string, string> = {
  nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', apos: "'",
  aacute: "á", eacute: "é", iacute: "í", oacute: "ó", uacute: "ú", ntilde: "ñ", uuml: "ü",
  Aacute: "Á", Eacute: "É", Iacute: "Í", Oacute: "Ó", Uacute: "Ú", Ntilde: "Ñ", Uuml: "Ü",
  ordm: "º", ordf: "ª", deg: "°", ndash: "-", mdash: "-", rsquo: "'", lsquo: "'", rdquo: '"', ldquo: '"',
}

export function decodificar(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const n = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)
      return Number.isFinite(n) ? String.fromCodePoint(n) : m
    }
    return ENTIDADES[e] ?? m
  })
}

/** El texto de un pedazo de HTML, en un renglón y sin espacios de sobra. */
export function textoPlano(html: string): string {
  return decodificar(html.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim()
}

function sinAcentos(s: string): string {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()
}

// ─── Qué es una vacante de piloto ───────────────────────────────────────────

/** Cargos que mencionan vuelo pero no son de piloto. */
const NO_ES_PILOTO = /despach|controlador|tecnic|mecanic|auxiliar|tripulante|sobrecargo|ingenier|simulador|dron|agente|analista|inspector/

/**
 * El cargo, leído del título. `null` si no es una vacante de piloto: el
 * buscador de algunos portales devuelve «Analista de Despacho» cuando se le
 * pregunta por «piloto», así que el título manda.
 */
export function cargoDelTitulo(titulo: string): Cargo | null {
  const t = sinAcentos(titulo).replace(/[-_]+/g, " ")
  if (NO_ES_PILOTO.test(t)) return null
  if (/primer(o)?s? oficial|copiloto|first officer|segundo al mando/.test(t)) return "primer_oficial"
  if (/cadete|ab ?initio|semillero de pilotos|formacion de pilotos|programa de pilotos/.test(t)) return "cadete"
  if (/capitan|captain|comandante/.test(t)) return "capitan"
  if (/\bpilot(o|os|s)?\b/.test(t)) return "piloto"
  return null
}

/**
 * Los renglones de requisitos de una vacante: las listas que vienen después de
 * un título como «Requisitos», «Requirements» o «Formación requerida». Si la
 * aerolínea no los puso en lista, sale vacío y la app lleva a su página.
 */
export function requisitosDelHtml(html: string): string[] {
  const salida: string[] = []
  const listas = /<ul[^>]*>([\s\S]*?)<\/ul>/gi
  let fin = 0
  for (let m = listas.exec(html); m; m = listas.exec(html)) {
    // Lo que va entre la lista anterior y esta: ahí está su título.
    const antes = textoPlano(html.slice(fin, m.index)).slice(-60)
    fin = m.index + m[0].length
    if (!/requisit|requirement|requerimient|formaci[oó]n requerida|qu[eé] buscamos|perfil requerido/i.test(antes)) continue
    for (const li of m[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)) {
      const renglon = textoPlano(li[1]).slice(0, 300)
      if (renglon && !salida.includes(renglon)) salida.push(renglon)
    }
  }
  return salida.slice(0, 25)
}

/** Si la vacante está en inglés (Copa publica las suyas así). */
function idiomaDe(texto: string): "es" | "en" {
  const en = (texto.match(/\b(the|and|with|requirements|minimum|years|license)\b/gi) ?? []).length
  const es = (texto.match(/\b(el|la|los|con|requisitos|mínimo|años|licencia|de)\b/gi) ?? []).length
  return en > es ? "en" : "es"
}

// ─── Lo que pide, en números ────────────────────────────────────────────────

/**
 * Las horas y el nivel de inglés que pide una convocatoria, leídos de sus
 * requisitos. Se calculan aquí, al guardar, y quedan en la tabla: la app y el
 * aviso de la meta de horas leen esas columnas y no vuelven a leer el texto.
 *
 * Las horas pueden distinguir nacionales de extranjeros, en renglones aparte
 * (Copa: «For Panamanians, 250 hours» y «For foreign applicants: 1,000 hours»)
 * o en el mismo, entre paréntesis (Arajet: «1,500 total hours (1,000 hours for
 * Dominican candidates)»). Por eso cada renglón se parte en tramos antes de
 * mirar a quién se refiere cada número.
 */
export interface RequisitosClave {
  horas: number | null
  horasNacionales: number | null
  horasExtranjeros: number | null
  icao: number | null
}

/** «1,000», «1.000» o «1000» horas, con hasta dos palabras en medio («total hours», «de vuelo»). */
const HORAS = /(\d{1,3}(?:[.,]\d{3})+|\d+)\s*(?:(?:total|totales|de|of|flight|vuelo)\s+){0,2}(?:horas|hours|hrs|h\b)/g
/** Lo que sigue al número y dice que no son las totales: al mando, en jet, como capitán. */
const NO_SON_TOTALES = /\bpic\b|al mando|como capitan|como comandante|en jet|jet de|\batr\b|multimotor|simulador|instruccion|in command/
const EXTRANJEROS = /extranjer|foreign/
const NACIONALES = /panamen|panamanian|colombian|argentin|chilen|peruan|mexican|dominican|nacional(?!idad)/

export function requisitosClave(requisitos: string[]): RequisitosClave {
  const r: RequisitosClave = { horas: null, horasNacionales: null, horasExtranjeros: null, icao: null }
  for (const renglon of requisitos) {
    const t = sinAcentos(renglon)
    for (const tramo of t.split(/[()]|;/)) {
      for (const m of tramo.matchAll(HORAS)) {
        const fin = (m.index ?? 0) + m[0].length
        // El contexto de cada número llega hasta la coma siguiente: «1.800
        // horas, con mínimo 800 en jet» son 1.800 totales.
        const despues = tramo.slice(fin, fin + 40).split(",")[0]
        if (NO_SON_TOTALES.test(despues)) continue
        const n = Number(m[1].replace(/[.,]/g, ""))
        if (EXTRANJEROS.test(tramo)) r.horasExtranjeros ??= n
        else if (NACIONALES.test(tramo)) r.horasNacionales ??= n
        else r.horas ??= n
      }
    }
    if (r.icao === null) {
      const i =
        t.match(/(?:oaci|icao)\D{0,45}?([1-6])\b/) ??
        t.match(/(?:ingles|english|tea|ealts)\D{0,30}?nivel\s*([1-6])\b/) ??
        t.match(/nivel\s*([1-6])\D{0,25}(?:oaci|icao)/) ??
        t.match(/nivel de ingles\s*([1-6])\b/) ??
        t.match(/\brtari\s*([1-6])\b/)
      if (i) r.icao = Number(i[1])
    }
  }
  return r
}

// ─── Fechas y lugares ───────────────────────────────────────────────────────

/** Un instante como fecha AAAA-MM-DD en Bogotá (UTC-5, sin horario de verano). */
export function fechaEnBogota(ms: number): string | null {
  if (!Number.isFinite(ms)) return null
  return new Date(ms - 5 * 3600_000).toISOString().slice(0, 10)
}

const MESES: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 }

/** «Wed Sep 09 02:00:00 UTC 2026», el formato de SuccessFactors. */
export function fechaSuccessFactors(s: string | null): string | null {
  const m = s?.match(/^\w{3} (\w{3}) (\d{1,2}) (\d{2}):(\d{2}):(\d{2}) UTC (\d{4})$/)
  if (!m || !(m[1] in MESES)) return null
  return fechaEnBogota(Date.UTC(Number(m[6]), MESES[m[1]], Number(m[2]), Number(m[3]), Number(m[4]), Number(m[5])))
}

const PAISES: Record<string, string> = {
  AR: "Argentina", BO: "Bolivia", BR: "Brasil", CL: "Chile", CO: "Colombia", CR: "Costa Rica", DO: "República Dominicana",
  EC: "Ecuador", ES: "España", GT: "Guatemala", MX: "México", PA: "Panamá", PE: "Perú", PY: "Paraguay",
  SV: "El Salvador", US: "Estados Unidos", UY: "Uruguay", VE: "Venezuela",
}

export function nombreDePais(codigo: string | null | undefined): string | null {
  if (!codigo) return null
  return PAISES[codigo.toUpperCase()] ?? null
}

// ─── Copa: Oracle Recruiting ────────────────────────────────────────────────

const COPA_API = "https://ejom.fa.us6.oraclecloud.com/hcmRestApi/resources/latest"
export const COPA_LISTA =
  `${COPA_API}/recruitingCEJobRequisitions?onlyData=true&expand=requisitionList` +
  `&finder=findReqs;siteNumber=CX_1,limit=200,sortBy=POSTING_DATES_DESC`
export const copaDetalle = (id: string) =>
  `${COPA_API}/recruitingCEJobRequisitionDetails?expand=all&onlyData=true&finder=ById;Id="${id}",siteNumber=CX_1`
const copaPagina = (id: string) => `https://ejom.fa.us6.oraclecloud.com/hcmUI/CandidateExperience/es/sites/CX_1/job/${id}`

/** Las vacantes de la lista cuyo título es de piloto. */
export function candidatosCopa(json: string): { id: string; titulo: string }[] {
  const lista = JSON.parse(json)?.items?.[0]?.requisitionList
  if (!Array.isArray(lista) || lista.length === 0) throw new Error("Copa: la lista llegó vacía o con otra forma")
  return lista
    .filter((j: { Id?: unknown; Title?: unknown }) => typeof j.Id === "string" && typeof j.Title === "string")
    .filter((j: { Title: string }) => cargoDelTitulo(j.Title) !== null)
    .map((j: { Id: string; Title: string }) => ({ id: j.Id, titulo: j.Title }))
}

export function vacanteCopa(json: string): Vacante | null {
  const d = JSON.parse(json)?.items?.[0]
  if (!d || typeof d.Id !== "string") throw new Error("Copa: el detalle llegó con otra forma")
  // La función del cargo es la que dice si es de piloto; el título solo dice cuál.
  if (d.JobFunctionCode !== "PILOTO") return null
  const cargo = cargoDelTitulo(String(d.Title ?? ""))
  if (!cargo) return null
  const descripcion = String(d.ExternalDescriptionStr ?? "")
  return {
    clave: d.Id.replace(/[^A-Za-z0-9-]/g, ""),
    cargo,
    titulo: String(d.Title).trim(),
    pais: nombreDePais(d.PrimaryLocationCountry),
    ciudad: String(d.PrimaryLocation ?? "").split(",")[0].trim() || null,
    url: copaPagina(d.Id),
    publicadaEn: fechaEnBogota(Date.parse(d.ExternalPostedStartDate)),
    cierraEn: fechaEnBogota(Date.parse(d.ExternalPostedEndDate)),
    requisitos: requisitosDelHtml(descripcion),
    idioma: idiomaDe(textoPlano(descripcion)),
    abierta: true,
    tipo: "vacante",
  }
}

export const copa: Fuente = {
  codigo: "CMP",
  async leer(traer) {
    const salida: Vacante[] = []
    for (const c of candidatosCopa(await traer(COPA_LISTA))) {
      const v = vacanteCopa(await traer(copaDetalle(c.id)))
      if (v) salida.push(v)
    }
    return salida
  },
}

// ─── Avianca y JetSMART: SAP SuccessFactors ─────────────────────────────────

/** Las vacantes del sitemap cuyo título (va en la URL) es de piloto. */
export function candidatosSitemap(xml: string, origen: string): { clave: string; url: string }[] {
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decodificar(m[1]).trim())
  if (urls.length === 0) throw new Error(`${origen}: el sitemap llegó sin vacantes`)
  const salida: { clave: string; url: string }[] = []
  for (const url of urls) {
    const m = url.match(/\/job\/([^/]+)\/(\d+)\/?$/)
    if (!m || !url.startsWith(origen)) continue
    let slug = m[1]
    try {
      slug = decodeURIComponent(slug)
    } catch {
      // Un %XX cortado a la mitad: se busca en el texto tal como vino.
    }
    if (cargoDelTitulo(slug)) salida.push({ clave: m[2], url })
  }
  return salida
}

function meta(html: string, prop: string): string | null {
  const m = html.match(new RegExp(`itemprop="${prop}"[^>]*content="([^"]*)"`))
  return m ? decodificar(m[1]).trim() : null
}

/** La página de una vacante de SuccessFactors, leída de su marcado schema.org. */
export function vacanteSuccessFactors(html: string, url: string, clave: string): Vacante | null {
  if (!html.includes("schema.org/JobPosting")) throw new Error(`La vacante ${clave} llegó sin su marcado`)
  const titulo = textoPlano(html.match(/<[^>]*itemprop="title"[^>]*>([^<]*)/)?.[1] ?? "")
  const cargo = cargoDelTitulo(titulo)
  if (!cargo) return null
  // «Bogotá, CO» en Avianca y «AR, Buenos Air» en JetSMART: el país es el par
  // de mayúsculas. La ciudad no se guarda: el portal la corta («Buenos Air»,
  // «Medellín (»), y mal escrita se ve peor que no estar.
  const partes = (meta(html, "streetAddress") ?? "").split(",").map((p) => p.trim()).filter(Boolean)
  const codigoPais = partes.find((p) => /^[A-Z]{2}$/.test(p)) ?? null
  const d = html.indexOf('class="jobdescription"')
  const descripcion = d >= 0 ? html.slice(d) : ""
  return {
    clave,
    cargo,
    titulo: titulo.charAt(0) + titulo.slice(1).toLowerCase(),
    pais: nombreDePais(codigoPais),
    ciudad: null,
    url,
    publicadaEn: fechaSuccessFactors(meta(html, "datePosted")),
    cierraEn: fechaSuccessFactors(meta(html, "validThrough")),
    requisitos: requisitosDelHtml(descripcion),
    idioma: "es",
    abierta: true,
    tipo: "vacante",
  }
}

function successFactors(codigo: string, origen: string): Fuente {
  return {
    codigo,
    async leer(traer) {
      const salida: Vacante[] = []
      for (const c of candidatosSitemap(await traer(`${origen}/sitemap.xml`), origen)) {
        const v = vacanteSuccessFactors(await traer(c.url), c.url, c.clave)
        if (v) salida.push(v)
      }
      return salida
    },
  }
}

export const avianca = successFactors("AVA", "https://jobs.avianca.com")
export const jetsmart = successFactors("JES", "https://recruitment.jetsmart.net")

// ─── Wingo: su página de empleo ─────────────────────────────────────────────

export const WINGO_PAGINA = "https://www.wingo.com/acerca-de-nosotros/trabaja-con-nosotros"

/** El HTML de la página, que viene dentro del JSON de Next.js. */
function contenidoWingo(html: string): string {
  const m = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/)
  if (!m) throw new Error("Wingo: la página llegó sin __NEXT_DATA__")
  const pila: unknown[] = [JSON.parse(m[1])]
  while (pila.length) {
    const o = pila.pop()
    if (!o || typeof o !== "object") continue
    for (const [k, v] of Object.entries(o as Record<string, unknown>)) {
      if (k === "contenidoHtml" && typeof v === "string" && />\s*Pilotos\s*</.test(v)) return v
      if (v && typeof v === "object") pila.push(v)
    }
  }
  throw new Error("Wingo: no se encontró el bloque de Pilotos")
}

/**
 * Wingo no tiene portal: publica un bloque «Pilotos» con sus requisitos, y
 * dice «no tenemos vacantes» mientras no esté contratando. Se guarda siempre,
 * abierta o no, porque los requisitos sirven aunque no haya convocatoria.
 */
export function vacanteWingo(html: string): Vacante {
  const contenido = contenidoWingo(html)
  const bloque = contenido.slice(contenido.search(/>\s*Pilotos\s*</))
  return {
    clave: "pilotos",
    cargo: "piloto",
    titulo: "Pilotos",
    pais: "Colombia",
    ciudad: null,
    url: WINGO_PAGINA,
    publicadaEn: null,
    cierraEn: null,
    requisitos: requisitosDelHtml(bloque),
    idioma: "es",
    abierta: !/no tenemos vacantes/i.test(textoPlano(bloque)),
    tipo: "pagina",
  }
}

export const wingo: Fuente = {
  codigo: "GCO",
  async leer(traer) {
    return [vacanteWingo(await traer(WINGO_PAGINA))]
  },
}

// ─── SATENA: su bolsa de empleo ─────────────────────────────────────────────

export const SATENA_PAGINA = "https://apps.satena.com.co/bolsa-empleo/index.php"

/**
 * La bolsa dice «En el momento no hay ofertas laborales» cuando no hay nada.
 * Si hay ofertas, se toman los renglones que sean de piloto; el formato de una
 * oferta no se ha visto todavía, así que no se leen requisitos: la app lleva a
 * la página.
 */
export function vacantesSatena(html: string): Vacante[] {
  if (/no hay ofertas laborales/i.test(textoPlano(html))) return []
  if (!/Ofertas/i.test(html)) throw new Error("SATENA: la bolsa llegó con otra forma")
  const renglones = html
    .replace(/<\/(p|li|h\d|div|td|tr|a)>/gi, "\n")
    .split("\n")
    .map((r) => textoPlano(r))
    .filter((r) => r.length > 3 && r.length < 140)
  const vistas = new Set<string>()
  const salida: Vacante[] = []
  for (const r of renglones) {
    const cargo = cargoDelTitulo(r)
    const clave = sinAcentos(r).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60)
    if (!cargo || vistas.has(clave)) continue
    vistas.add(clave)
    salida.push({
      clave,
      cargo,
      titulo: r,
      pais: "Colombia",
      ciudad: null,
      url: SATENA_PAGINA,
      publicadaEn: null,
      cierraEn: null,
      requisitos: [],
      idioma: "es",
      abierta: true,
      tipo: "vacante",
    })
  }
  return salida
}

export const satena: Fuente = {
  codigo: "NSE",
  async leer(traer) {
    return vacantesSatena(await traer(SATENA_PAGINA))
  },
}

// ─── Clic: su página de empleo ──────────────────────────────────────────────

export const CLIC_PAGINA = "https://clicair.co/trabaja-con-nosotros"

/** Los renglones de un párrafo con viñetas «°» separadas por <br>, como publica Clic. */
function renglonesDeParrafo(html: string): string[] {
  return html
    .split(/<br\s*\/?>/i)
    .map((r) => textoPlano(r).replace(/^[°•\-–·*]+\s*/, "").trim())
    .filter((r) => r.length > 1)
}

/**
 * Clic publica cada vacante en un acordeón: arriba «dd/mm/aaaa / Ciudad» y el
 * título, abajo el objetivo y los requisitos (en lista o en un párrafo con
 * viñetas). No hay fecha de cierre ni página por vacante: se postula por
 * correo y el enlace es la página de empleo.
 *
 * El título dice «PILOTO» aunque sea para capitán (octubre de 2024: «PILOTO
 * 42/72 - 600», con licencia PTL y 5.000 h): si el texto habla de capitanes,
 * el cargo es capitán.
 */
export function vacantesClic(html: string): Vacante[] {
  if (!html.includes("accordion")) throw new Error("Clic: la página llegó con otra forma")
  const salida: Vacante[] = []
  for (const item of html.split(/<div class="accordion-item">/).slice(1)) {
    const titulo = textoPlano(item.match(/class="tit">([\s\S]*?)<\/div>/)?.[1] ?? "")
    let cargo = cargoDelTitulo(titulo)
    if (!cargo) continue
    const texto = sinAcentos(textoPlano(item))
    if (cargo === "piloto" && /capitan|comandante|licencia ptl/.test(texto)) cargo = "capitan"
    const cabeza = textoPlano(item.match(/class="mpre">([\s\S]*?)<\/div>/)?.[1] ?? "")
    const f = cabeza.match(/(\d{2})\/(\d{2})\/(\d{4})\s*\/?\s*(.*)/)
    const publicadaEn = f ? `${f[3]}-${f[2]}-${f[1]}` : null
    let requisitos = requisitosDelHtml(item)
    if (requisitos.length === 0) {
      const parrafo = item.match(/Requisitos:?[\s\S]*?<\/h3>\s*<p>([\s\S]*?)<\/p>/i)?.[1]
      requisitos = parrafo ? renglonesDeParrafo(parrafo).slice(0, 25) : []
    }
    const base = sinAcentos(titulo).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60)
    salida.push({
      clave: `${base}-${(publicadaEn ?? "").replace(/-/g, "")}`.replace(/-$/, ""),
      cargo,
      titulo,
      pais: "Colombia",
      ciudad: f?.[4]?.trim() || null,
      url: CLIC_PAGINA,
      publicadaEn,
      cierraEn: null,
      requisitos,
      idioma: "es",
      abierta: true,
      tipo: "vacante",
    })
  }
  return salida
}

export const clic: Fuente = {
  codigo: "EFY",
  async leer(traer) {
    return vacantesClic(await traer(CLIC_PAGINA))
  },
}

// ─── Sky Airline: Genoma ────────────────────────────────────────────────────

export const SKY_LISTA = "https://api.genoma.work/api/v1/gamesandtests/sky-airline/jobslisting/"
export const skyDetalle = (id: string) => `https://api.genoma.work/api/v1/gamesandtests/jobapplications/${id}/public/`
const skyPagina = (id: string) => `https://jobs.genoma.work/sky-airline/${id}/`

interface AvisoSky {
  id?: unknown
  job_application?: unknown
  location_city?: unknown
  location_country?: unknown
  creation_date?: unknown
}

/**
 * El país de un aviso de Sky. Genoma trae un código (CL, PE, INT) que no
 * siempre cuadra con la ciudad («Analista Growth Senior»: ciudad «Perú», país
 * «CL»); si la ciudad es un país, manda la ciudad.
 */
function paisSky(a: AvisoSky): string | null {
  const ciudad = typeof a.location_city === "string" ? a.location_city.trim() : ""
  if (/^per[uú]$/i.test(ciudad)) return "Perú"
  if (/^chile$/i.test(ciudad)) return "Chile"
  return typeof a.location_country === "string" ? nombreDePais(a.location_country) : null
}

/** Los avisos de la lista cuyo título es de piloto. */
export function candidatosSky(json: string): AvisoSky[] {
  const lista = JSON.parse(json)?.jobapplications
  if (!Array.isArray(lista) || lista.length === 0) throw new Error("Sky: la lista llegó vacía o con otra forma")
  return lista.filter((a: AvisoSky) => typeof a.id === "string" && typeof a.job_application === "string" && cargoDelTitulo(a.job_application))
}

export function vacanteSky(json: string): Vacante | null {
  const d = JSON.parse(json) as AvisoSky & { description?: unknown; status?: unknown }
  if (typeof d.id !== "string") throw new Error("Sky: el detalle llegó con otra forma")
  if (typeof d.status === "string" && d.status !== "ACTIV") return null
  const titulo = String(d.job_application ?? "").trim()
  const cargo = cargoDelTitulo(titulo)
  if (!cargo) return null
  return {
    clave: d.id.replace(/[^A-Za-z0-9-]/g, "").slice(0, 80),
    cargo,
    titulo,
    pais: paisSky(d),
    ciudad: null,
    url: skyPagina(d.id),
    publicadaEn: typeof d.creation_date === "string" ? fechaEnBogota(Date.parse(d.creation_date)) : null,
    cierraEn: null,
    requisitos: requisitosDelHtml(String(d.description ?? "")),
    idioma: "es",
    abierta: true,
    tipo: "vacante",
  }
}

export const sky: Fuente = {
  codigo: "SKU",
  async leer(traer) {
    const salida: Vacante[] = []
    for (const a of candidatosSky(await traer(SKY_LISTA))) {
      const v = vacanteSky(await traer(skyDetalle(String(a.id))))
      if (v) salida.push(v)
    }
    return salida
  },
}

// ─── BoA: WordPress ─────────────────────────────────────────────────────────

export const BOA_EMPLEOS = "https://www.boa.gob.bo/wp-json/wp/v2/empleo?per_page=100"

interface EntradaWordPress {
  id?: unknown
  date?: unknown
  link?: unknown
  title?: { rendered?: unknown }
  content?: { rendered?: unknown }
}

/**
 * BoA publica sus convocatorias como entradas «empleo» de WordPress: título,
 * fecha, enlace y el contenido en HTML. Una lista vacía es «no hay vacantes»
 * (así estaba el 26-sep-2026); lo que no sea una lista es un fallo.
 */
export function vacantesBoa(json: string): Vacante[] {
  const lista = JSON.parse(json)
  if (!Array.isArray(lista)) throw new Error("BoA: la lista llegó con otra forma")
  const salida: Vacante[] = []
  for (const e of lista as EntradaWordPress[]) {
    const titulo = textoPlano(String(e.title?.rendered ?? ""))
    const cargo = cargoDelTitulo(titulo)
    const url = typeof e.link === "string" ? e.link : ""
    if (!cargo || !url.startsWith("https://") || typeof e.id !== "number") continue
    salida.push({
      clave: `boa-${e.id}`,
      cargo,
      titulo,
      pais: "Bolivia",
      ciudad: null,
      url,
      publicadaEn: typeof e.date === "string" ? e.date.slice(0, 10) : null,
      cierraEn: null,
      requisitos: requisitosDelHtml(String(e.content?.rendered ?? "")),
      idioma: "es",
      abierta: true,
      tipo: "vacante",
    })
  }
  return salida
}

export const boa: Fuente = {
  codigo: "BOV",
  async leer(traer) {
    return vacantesBoa(await traer(BOA_EMPLEOS))
  },
}

// ─── Arajet: Manatal ────────────────────────────────────────────────────────

export const ARAJET_LISTA = "https://www.careers-page.com/api/v1.0/c/arajetjobs/jobs/?page_size=20&page=1"

interface AvisoManatal {
  hash?: unknown
  position_name?: unknown
  description?: unknown
  country?: unknown
  city?: unknown
}

/**
 * Una página de la API de Manatal: los avisos de piloto y la siguiente página.
 * Manatal no da fechas; el país sale del aviso o, si no lo trae (el First
 * Officer de Arajet no lo trae), de la base de la aerolínea.
 */
export function paginaArajet(json: string): { vacantes: Vacante[]; siguiente: string | null } {
  const d = JSON.parse(json)
  if (!Array.isArray(d?.results)) throw new Error("Arajet: la lista llegó con otra forma")
  const vacantes: Vacante[] = []
  for (const a of d.results as AvisoManatal[]) {
    const titulo = typeof a.position_name === "string" ? a.position_name.trim() : ""
    const cargo = cargoDelTitulo(titulo)
    if (!cargo || typeof a.hash !== "string") continue
    const descripcion = String(a.description ?? "")
    vacantes.push({
      clave: a.hash.replace(/[^A-Za-z0-9-]/g, ""),
      cargo,
      titulo,
      pais: typeof a.country === "string" && a.country.trim() ? (a.country.trim() === "Dominican Republic" ? "República Dominicana" : a.country.trim()) : "República Dominicana",
      ciudad: typeof a.city === "string" && a.city.trim() ? a.city.trim() : null,
      url: `https://www.careers-page.com/arajetjobs/job/${a.hash}`,
      publicadaEn: null,
      cierraEn: null,
      requisitos: requisitosDelHtml(descripcion),
      idioma: idiomaDe(textoPlano(descripcion)),
      abierta: true,
      tipo: "vacante",
    })
  }
  const siguiente = typeof d.next === "string" && d.next.startsWith("https://www.careers-page.com/") ? d.next : null
  return { vacantes, siguiente }
}

export const arajet: Fuente = {
  codigo: "DWI",
  async leer(traer) {
    const salida: Vacante[] = []
    let url: string | null = ARAJET_LISTA
    for (let paginas = 0; url && paginas < 6; paginas++) {
      const { vacantes, siguiente } = paginaArajet(await traer(url))
      salida.push(...vacantes)
      url = siguiente
    }
    return salida
  },
}

// ─── Volaris: SuccessFactors y su página de requisitos ─────────────────────

export const VOLARIS_REQUISITOS = "https://jobs.volaris.com/content/Requisitos-para-Copiloto/?locale=es_MX"

/**
 * Volaris publica siempre sus requisitos de copiloto en una página fija. Se
 * guarda como la página de pilotos de la aerolínea (cerrada: no es una
 * vacante); las vacantes de verdad salen del sitemap, como en Avianca.
 */
export function paginaVolaris(html: string): Vacante {
  const i = html.search(/<h2[^>]*>\s*Requisitos para Copiloto/i)
  if (i < 0) throw new Error("Volaris: la página de requisitos llegó con otra forma")
  const requisitos = requisitosDelHtml(html.slice(i, i + 8000))
  if (requisitos.length === 0) throw new Error("Volaris: la página de requisitos llegó sin lista")
  return {
    clave: "requisitos-copiloto",
    cargo: "primer_oficial",
    titulo: "Copiloto",
    pais: "México",
    ciudad: null,
    url: VOLARIS_REQUISITOS,
    publicadaEn: null,
    cierraEn: null,
    requisitos,
    idioma: "es",
    abierta: false,
    tipo: "pagina",
  }
}

const volarisVacantes = successFactors("VOI", "https://jobs.volaris.com")
export const volaris: Fuente = {
  codigo: "VOI",
  async leer(traer) {
    const vacantes = await volarisVacantes.leer(traer)
    return [paginaVolaris(await traer(VOLARIS_REQUISITOS)), ...vacantes]
  },
}

// ─── Viva: Teamtailor ───────────────────────────────────────────────────────

export const VIVA_RSS = "https://jobs.vivaaerobus.com/jobs.rss"
export const VIVA_PILOTOS = "https://jobs.vivaaerobus.com/departments/pilotos"

function etiqueta(xml: string, nombre: string): string | null {
  const m = xml.match(new RegExp(`<${nombre}[^>]*>([\\s\\S]*?)</${nombre}>`))
  if (!m) return null
  return decodificar(m[1].replace(/^<!\[CDATA\[|\]\]>$/g, "")).trim()
}

/**
 * Las vacantes del área Pilotos en el RSS. «Piloto (TBD)» es un semillero sin
 * fecha ni requisitos, no una convocatoria: se deja fuera.
 */
export function vacantesViva(rss: string): Vacante[] {
  if (!rss.includes("<rss")) throw new Error("Viva: el RSS llegó con otra forma")
  const salida: Vacante[] = []
  for (const item of rss.split("<item>").slice(1)) {
    const area = etiqueta(item, "tt:department") ?? ""
    const titulo = etiqueta(item, "title") ?? ""
    const url = etiqueta(item, "link") ?? ""
    if (!/pilot/i.test(area) || /\btbd\b|semillero|talent/i.test(titulo) || !url.startsWith("https://")) continue
    const cargo = cargoDelTitulo(titulo) ?? "piloto"
    const id = url.match(/\/jobs\/(\d+)/)?.[1]
    if (!id) continue
    const fecha = etiqueta(item, "pubDate")
    salida.push({
      clave: `viva-${id}`,
      cargo,
      titulo,
      pais: "México",
      ciudad: null,
      url,
      publicadaEn: fecha ? fechaEnBogota(Date.parse(fecha)) : null,
      cierraEn: null,
      requisitos: requisitosDelHtml(etiqueta(item, "description") ?? ""),
      idioma: "es",
      abierta: true,
      tipo: "vacante",
    })
  }
  return salida
}

/**
 * La página del área de pilotos: dos rutas de Primer Oficial. Se guarda la de
 * quien no tiene experiencia en jet, que es la de ingreso; sus renglones son
 * párrafos que empiezan con guion.
 */
export function paginaViva(html: string): Vacante {
  const i = html.search(/<h3[^>]*>\s*Primer Oficial sin Experiencia/i)
  if (i < 0) throw new Error("Viva: la página de pilotos llegó con otra forma")
  const bloque = html.slice(i, html.indexOf("</div>", html.indexOf("<div", i + 10)))
  const requisitos = [...bloque.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => textoPlano(m[1]).replace(/^[-•·]\s*/, ""))
    .filter((r) => r.length > 1)
  if (requisitos.length === 0) throw new Error("Viva: la página de pilotos llegó sin requisitos")
  return {
    clave: "primer-oficial-sin-jet",
    cargo: "primer_oficial",
    titulo: "Primer oficial sin experiencia en jet",
    pais: "México",
    ciudad: null,
    url: VIVA_PILOTOS,
    publicadaEn: null,
    cierraEn: null,
    requisitos,
    idioma: "es",
    abierta: false,
    tipo: "pagina",
  }
}

export const viva: Fuente = {
  codigo: "VIV",
  async leer(traer) {
    const vacantes = vacantesViva(await traer(VIVA_RSS))
    return [paginaViva(await traer(VIVA_PILOTOS)), ...vacantes]
  },
}

export const FUENTES: Fuente[] = [copa, avianca, jetsmart, wingo, satena, clic, sky, boa, arajet, volaris, viva]

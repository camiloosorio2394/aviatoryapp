// revisar-convocatorias: lee los portales de empleo de las aerolíneas y deja en
// `convocatorias` las vacantes de piloto que están abiertas, con sus requisitos.
//
// La llama pg_cron cada 6 horas (job `aviatory_convocatorias`). No pide JWT,
// porque pg_cron no tiene sesión; en su lugar exige la llave del Vault en el
// encabezado `x-llave` (migración 20261001040000), que valida la base con
// convocatorias_llave_valida(). Sin llave, 401 y no descarga nada. Y aunque la
// llave llegue, se frena sola: si la última revisión empezó hace menos de 50
// minutos, contesta 429, para no martillar los portales de las aerolíneas.
//
// Lo que se lee y cómo está en lectores.ts. Aquí solo va la red y la base:
//   - cada fuente se lee aparte; si una falla, sus vacantes se quedan como
//     estaban (un portal caído no cierra convocatorias) y el error queda en
//     `convocatorias_revisiones`;
//   - si una fuente se leyó bien, lo que tenía abierto y ya no aparece se marca
//     cerrado. Nunca se borra una fila: la última convocatoria de cada
//     aerolínea, con sus requisitos, sirve aunque ya haya cerrado;
//   - las horas y el nivel de inglés se leen de los requisitos aquí, una vez, y
//     quedan en sus columnas: la app y el aviso de la meta de horas los usan
//     tal cual (migración 20261001060000).
//
// Usa SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY, que Supabase pone solo en
// toda función. No necesita secretos propios.

import { createClient } from "jsr:@supabase/supabase-js@2"
import { FUENTES, requisitosClave, type Vacante } from "./lectores.ts"

const AGENTE = "AviatoryConvocatorias/1.0 (+https://aviatoryapp-mu.vercel.app)"
const MINUTOS_ENTRE_REVISIONES = 50
const PAUSA_ENTRE_DESCARGAS_MS = 1200
const TIEMPO_POR_DESCARGA_MS = 25_000

// SATENA y BoA sirven su certificado sin el intermedio: un navegador lo completa
// solo, pero el fetch de la función no, y la descarga fallaba con «UnknownIssuer».
// Para esos dos hosts se confía además en el intermedio que les falta:
//   SATENA  Starfield Secure Certificate Authority - G2, bajado del repositorio
//           de Starfield (certificates.starfieldtech.com/repository/sfig2.crt).
//           SHA-256 93:A0:78:98:D8:9B:2C:CA:…:D3:91:CC:72; vence el 3 de mayo de 2031.
//   BoA     GlobalSign RSA OV SSL CA 2018, el que nombra su certificado
//           (secure.globalsign.com/cacert/gsrsaovsslca2018.crt). SHA-256
//           B6:76:FF:A3:17:9E:88:12:…:28:93:76:4A; vence el 21 de noviembre de 2028.
const STARFIELD_G2 = `-----BEGIN CERTIFICATE-----
MIIFADCCA+igAwIBAgIBBzANBgkqhkiG9w0BAQsFADCBjzELMAkGA1UEBhMCVVMx
EDAOBgNVBAgTB0FyaXpvbmExEzARBgNVBAcTClNjb3R0c2RhbGUxJTAjBgNVBAoT
HFN0YXJmaWVsZCBUZWNobm9sb2dpZXMsIEluYy4xMjAwBgNVBAMTKVN0YXJmaWVs
ZCBSb290IENlcnRpZmljYXRlIEF1dGhvcml0eSAtIEcyMB4XDTExMDUwMzA3MDAw
MFoXDTMxMDUwMzA3MDAwMFowgcYxCzAJBgNVBAYTAlVTMRAwDgYDVQQIEwdBcml6
b25hMRMwEQYDVQQHEwpTY290dHNkYWxlMSUwIwYDVQQKExxTdGFyZmllbGQgVGVj
aG5vbG9naWVzLCBJbmMuMTMwMQYDVQQLEypodHRwOi8vY2VydHMuc3RhcmZpZWxk
dGVjaC5jb20vcmVwb3NpdG9yeS8xNDAyBgNVBAMTK1N0YXJmaWVsZCBTZWN1cmUg
Q2VydGlmaWNhdGUgQXV0aG9yaXR5IC0gRzIwggEiMA0GCSqGSIb3DQEBAQUAA4IB
DwAwggEKAoIBAQDlkGZL7PlGcakgg77pbL9KyUhpgXVObST2yxcT+LBxWYR6ayuF
pDS1FuXLzOlBcCykLtb6Mn3hqN6UEKwxwcDYav9ZJ6t21vwLdGu4p64/xFT0tDFE
3ZNWjKRMXpuJyySDm+JXfbfYEh/JhW300YDxUJuHrtQLEAX7J7oobRfpDtZNuTlV
Bv8KJAV+L8YdcmzUiymMV33a2etmGtNPp99/UsQwxaXJDgLFU793OGgGJMNmyDd+
MB5FcSM1/5DYKp2N57CSTTx/KgqT3M0WRmX3YISLdkuRJ3MUkuDq7o8W6o0OPnYX
v32JgIBEQ+ct4EMJddo26K3biTr1XRKOIwSDAgMBAAGjggEsMIIBKDAPBgNVHRMB
Af8EBTADAQH/MA4GA1UdDwEB/wQEAwIBBjAdBgNVHQ4EFgQUJUWBaFAmOD07LSy+
zWrZtj2zZmMwHwYDVR0jBBgwFoAUfAwyH6fZMH/EfWijYqihzqsHWycwOgYIKwYB
BQUHAQEELjAsMCoGCCsGAQUFBzABhh5odHRwOi8vb2NzcC5zdGFyZmllbGR0ZWNo
LmNvbS8wOwYDVR0fBDQwMjAwoC6gLIYqaHR0cDovL2NybC5zdGFyZmllbGR0ZWNo
LmNvbS9zZnJvb3QtZzIuY3JsMEwGA1UdIARFMEMwQQYEVR0gADA5MDcGCCsGAQUF
BwIBFitodHRwczovL2NlcnRzLnN0YXJmaWVsZHRlY2guY29tL3JlcG9zaXRvcnkv
MA0GCSqGSIb3DQEBCwUAA4IBAQBWZcr+8z8KqJOLGMfeQ2kTNCC+Tl94qGuc22pN
QdvBE+zcMQAiXvcAngzgNGU0+bE6TkjIEoGIXFs+CFN69xpk37hQYcxTUUApS8L0
rjpf5MqtJsxOYUPl/VemN3DOQyuwlMOS6eFfqhBJt2nk4NAfZKQrzR9voPiEJBjO
eT2pkb9UGBOJmVQRDVXFJgt5T1ocbvlj2xSApAer+rKluYjdkf5lO6Sjeb6JTeHQ
sPTIFwwKlhR8Cbds4cLYVdQYoKpBaXAko7nv6VrcPuuUSvC33l8Odvr7+2kDRUBQ
7nIMpBKGgc0T0U7EPMpODdIm8QC3tKai4W56gf0wrHofx1l7
-----END CERTIFICATE-----`
const GLOBALSIGN_OV_2018 = `-----BEGIN CERTIFICATE-----
MIIETjCCAzagAwIBAgINAe5fIh38YjvUMzqFVzANBgkqhkiG9w0BAQsFADBMMSAw
HgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMzETMBEGA1UEChMKR2xvYmFs
U2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjAeFw0xODExMjEwMDAwMDBaFw0yODEx
MjEwMDAwMDBaMFAxCzAJBgNVBAYTAkJFMRkwFwYDVQQKExBHbG9iYWxTaWduIG52
LXNhMSYwJAYDVQQDEx1HbG9iYWxTaWduIFJTQSBPViBTU0wgQ0EgMjAxODCCASIw
DQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKdaydUMGCEAI9WXD+uu3Vxoa2uP
UGATeoHLl+6OimGUSyZ59gSnKvuk2la77qCk8HuKf1UfR5NhDW5xUTolJAgvjOH3
idaSz6+zpz8w7bXfIa7+9UQX/dhj2S/TgVprX9NHsKzyqzskeU8fxy7quRU6fBhM
abO1IFkJXinDY+YuRluqlJBJDrnw9UqhCS98NE3QvADFBlV5Bs6i0BDxSEPouVq1
lVW9MdIbPYa+oewNEtssmSStR8JvA+Z6cLVwzM0nLKWMjsIYPJLJLnNvBhBWk0Cq
o8VS++XFBdZpaFwGue5RieGKDkFNm5KQConpFmvv73W+eka440eKHRwup08CAwEA
AaOCASkwggElMA4GA1UdDwEB/wQEAwIBhjASBgNVHRMBAf8ECDAGAQH/AgEAMB0G
A1UdDgQWBBT473/yzXhnqN5vjySNiPGHAwKz6zAfBgNVHSMEGDAWgBSP8Et/qC5F
JK5NUPpjmove4t0bvDA+BggrBgEFBQcBAQQyMDAwLgYIKwYBBQUHMAGGImh0dHA6
Ly9vY3NwMi5nbG9iYWxzaWduLmNvbS9yb290cjMwNgYDVR0fBC8wLTAroCmgJ4Yl
aHR0cDovL2NybC5nbG9iYWxzaWduLmNvbS9yb290LXIzLmNybDBHBgNVHSAEQDA+
MDwGBFUdIAAwNDAyBggrBgEFBQcCARYmaHR0cHM6Ly93d3cuZ2xvYmFsc2lnbi5j
b20vcmVwb3NpdG9yeS8wDQYJKoZIhvcNAQELBQADggEBAJmQyC1fQorUC2bbmANz
EdSIhlIoU4r7rd/9c446ZwTbw1MUcBQJfMPg+NccmBqixD7b6QDjynCy8SIwIVbb
0615XoFYC20UgDX1b10d65pHBf9ZjQCxQNqQmJYaumxtf4z1s4DfjGRzNpZ5eWl0
6r/4ngGPoJVpjemEuunl1Ig423g7mNA2eymw0lIYkN5SQwCuaifIFJ6GlazhgDEw
fpolu4usBCOmmQDo8dIm7A9+O4orkjgTHY+GzYZSR+Y0fFukAj6KYXwidlNalFMz
hriSqHKvoflShx8xpfywgVcvzfTO3PYkz6fiNJBonf6q8amaEsybwMbDqKWwIX7e
SPY=
-----END CERTIFICATE-----`
const HOSTS_SIN_INTERMEDIO = new Set(["apps.satena.com.co", "www.boa.gob.bo"])
let clienteConIntermedio: Deno.HttpClient | undefined
try {
  clienteConIntermedio = Deno.createHttpClient({ caCerts: [STARFIELD_G2, GLOBALSIGN_OV_2018] })
} catch {
  // Sin createHttpClient, SATENA y BoA fallan como antes y queda anotado en el resultado.
}

const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
  auth: { persistSession: false },
})

function respuesta(cuerpo: unknown, status = 200) {
  return new Response(JSON.stringify(cuerpo), { status, headers: { "Content-Type": "application/json" } })
}

const esperar = (ms: number) => new Promise((r) => setTimeout(r, ms))

/** Descarga una URL como texto, con pausa entre descargas para no apurar a nadie. */
async function traer(url: string): Promise<string> {
  await esperar(PAUSA_ENTRE_DESCARGAS_MS)
  const cliente = HOSTS_SIN_INTERMEDIO.has(new URL(url).host) ? clienteConIntermedio : undefined
  const r = await fetch(url, {
    headers: { "User-Agent": AGENTE, Accept: "application/json, text/html, application/xml;q=0.9, */*;q=0.8" },
    signal: AbortSignal.timeout(TIEMPO_POR_DESCARGA_MS),
    ...(cliente ? { client: cliente } : {}),
  })
  if (!r.ok) throw new Error(`${r.status} en ${new URL(url).host}`)
  return await r.text()
}

async function guardar(airlineId: number, vacantes: Vacante[]) {
  const ahora = new Date().toISOString()
  const { data: antes, error: e1 } = await db
    .from("convocatorias")
    .select("clave_externa, abierta, cerrada_en")
    .eq("airline_id", airlineId)
    .eq("fuente", "automatica")
  if (e1) throw e1
  const previa = new Map((antes ?? []).map((f) => [f.clave_externa, f]))

  if (vacantes.length > 0) {
    const filas = vacantes.map((v) => {
      const n = requisitosClave(v.requisitos)
      return {
        airline_id: airlineId,
        clave_externa: v.clave,
        cargo: v.cargo,
        titulo: v.titulo,
        pais: v.pais,
        ciudad: v.ciudad,
        url: v.url,
        publicada_en: v.publicadaEn,
        cierra_en: v.cierraEn,
        requisitos: v.requisitos,
        idioma: v.idioma,
        abierta: v.abierta,
        tipo: v.tipo,
        fuente: "automatica",
        vista_por_ultima_vez: ahora,
        horas_minimas: n.horas,
        horas_nacionales: n.horasNacionales,
        horas_extranjeros: n.horasExtranjeros,
        nivel_icao: n.icao,
        // La fecha de cierre es la primera vez que se vio cerrada, no la última.
        cerrada_en: v.abierta ? null : (previa.get(v.clave)?.cerrada_en ?? ahora),
      }
    })
    const { error } = await db.from("convocatorias").upsert(filas, { onConflict: "airline_id,clave_externa" })
    if (error) throw error
  }

  const vistas = new Set(vacantes.map((v) => v.clave))
  const desaparecidas = (antes ?? []).filter((f) => f.abierta && !vistas.has(f.clave_externa)).map((f) => f.clave_externa)
  if (desaparecidas.length > 0) {
    const { error } = await db
      .from("convocatorias")
      .update({ abierta: false, cerrada_en: ahora })
      .eq("airline_id", airlineId)
      .eq("fuente", "automatica")
      .in("clave_externa", desaparecidas)
    if (error) throw error
  }
  return desaparecidas.length
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return respuesta({ error: "Solo POST" }, 405)

  const { data: llaveValida, error: eLlave } = await db.rpc("convocatorias_llave_valida", {
    p_llave: req.headers.get("x-llave") ?? "",
  })
  if (eLlave) return respuesta({ error: eLlave.message }, 500)
  if (llaveValida !== true) return respuesta({ error: "Sin llave" }, 401)

  const { data: ultima, error: e0 } = await db
    .from("convocatorias_revisiones")
    .select("empezo_en")
    .order("empezo_en", { ascending: false })
    .limit(1)
    .maybeSingle()
  if (e0) return respuesta({ error: e0.message }, 500)
  if (ultima && Date.now() - Date.parse(ultima.empezo_en) < MINUTOS_ENTRE_REVISIONES * 60_000) {
    return respuesta({ omitida: `La última revisión empezó hace menos de ${MINUTOS_ENTRE_REVISIONES} minutos.` }, 429)
  }

  const { data: revision, error: e1 } = await db.from("convocatorias_revisiones").insert({}).select("id").single()
  if (e1) return respuesta({ error: e1.message }, 500)

  const { data: aerolineas, error: e2 } = await db.from("airlines").select("id, code")
  if (e2) return respuesta({ error: e2.message }, 500)
  const idDe = new Map((aerolineas ?? []).map((a) => [a.code, a.id as number]))

  const resultado: Record<string, unknown> = {}
  for (const fuente of FUENTES) {
    const airlineId = idDe.get(fuente.codigo)
    if (!airlineId) {
      resultado[fuente.codigo] = { ok: false, error: "La aerolínea no está en la tabla airlines" }
      continue
    }
    try {
      const vacantes = await fuente.leer(traer)
      const cerradas = await guardar(airlineId, vacantes)
      resultado[fuente.codigo] = {
        ok: true,
        abiertas: vacantes.filter((v) => v.abierta).map((v) => `${v.titulo}${v.pais ? ` (${v.pais})` : ""}`),
        cerradas,
      }
    } catch (e) {
      resultado[fuente.codigo] = { ok: false, error: String(e instanceof Error ? e.message : e).slice(0, 300) }
    }
  }

  await db
    .from("convocatorias_revisiones")
    .update({ termino_en: new Date().toISOString(), resultado })
    .eq("id", revision.id)
  return respuesta(resultado)
})

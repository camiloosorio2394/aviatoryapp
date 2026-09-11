/**
 * Validación de un banco de contenido/bancos/ y el SQL que lo carga en
 * public.banco_preguntas. Sin dependencias: lo usan sembrar.mjs y sus pruebas.
 */

const NOMBRE_BANCO = /^[a-z0-9_]{3,40}$/
const DELIMITADOR = "$banco$"

function fallo(banco, mensaje) {
  return new Error(`banco ${banco}: ${mensaje}`)
}

/**
 * Revisa un banco con las mismas reglas que las restricciones de
 * banco_preguntas, para que un error de edición se vea al cargar y no en la base.
 * Devuelve el banco normalizado.
 */
export function validarBanco(datos) {
  const banco = datos?.banco
  if (typeof banco !== "string" || !NOMBRE_BANCO.test(banco)) {
    throw new Error(`nombre de banco inválido: ${String(banco)}`)
  }
  if (!Array.isArray(datos.preguntas) || datos.preguntas.length === 0) {
    throw fallo(banco, "no tiene preguntas")
  }

  const vistos = new Set()
  const preguntas = datos.preguntas.map((p, i) => {
    const donde = `pregunta ${i + 1}`
    const id = typeof p.id === "number" ? String(p.id) : p.id
    if (typeof id !== "string" || id.length < 1 || id.length > 60) throw fallo(banco, `${donde}: id inválido`)
    if (vistos.has(id)) throw fallo(banco, `id repetido: ${id}`)
    vistos.add(id)

    if (typeof p.enunciado !== "string" || p.enunciado.trim().length === 0 || p.enunciado.length > 4000) {
      throw fallo(banco, `${id}: enunciado vacío o de más de 4000 caracteres`)
    }
    if (
      !Array.isArray(p.opciones) ||
      p.opciones.length < 2 ||
      p.opciones.length > 6 ||
      p.opciones.some((o) => typeof o !== "string" || o.trim().length === 0)
    ) {
      throw fallo(banco, `${id}: necesita de 2 a 6 opciones de texto`)
    }
    if (new Set(p.opciones).size !== p.opciones.length) {
      throw fallo(banco, `${id}: tiene opciones repetidas`)
    }
    if (!Number.isInteger(p.correcta) || p.correcta < 0 || p.correcta >= p.opciones.length) {
      throw fallo(banco, `${id}: la correcta está fuera de rango`)
    }
    const explicacion = p.explicacion ?? ""
    if (typeof explicacion !== "string" || explicacion.length > 4000) {
      throw fallo(banco, `${id}: explicación de más de 4000 caracteres`)
    }
    const referencia = p.referencia ?? null
    if (referencia !== null && (typeof referencia !== "string" || referencia.length > 300)) {
      throw fallo(banco, `${id}: referencia de más de 300 caracteres`)
    }
    const metadatos = p.metadatos ?? {}
    if (typeof metadatos !== "object" || Array.isArray(metadatos) || metadatos === null) {
      throw fallo(banco, `${id}: metadatos debe ser un objeto`)
    }

    return { id, enunciado: p.enunciado, opciones: p.opciones, correcta: p.correcta, explicacion, referencia, metadatos }
  })

  return { banco, preguntas }
}

/**
 * SQL idempotente para un banco ya validado: inserta lo nuevo, actualiza lo que
 * cambió y desactiva (no borra) lo que salió del archivo. Las sesiones pasadas
 * referencian sus preguntas, así que nunca se borran.
 */
export function sqlDeBanco({ banco, preguntas }) {
  const json = JSON.stringify(preguntas)
  if (json.includes(DELIMITADOR)) {
    throw fallo(banco, `el contenido no puede incluir ${DELIMITADOR}`)
  }

  return `-- Banco ${banco}: ${preguntas.length} preguntas
with datos as (
  select *
  from jsonb_to_recordset(${DELIMITADOR}${json}${DELIMITADOR}::jsonb)
    as d(id text, enunciado text, opciones jsonb, correcta smallint, explicacion text, referencia text, metadatos jsonb)
),
cargadas as (
  insert into public.banco_preguntas as bp
    (banco, clave_externa, enunciado, opciones, correcta, explicacion, referencia, metadatos, activa, actualizada_en)
  select '${banco}', d.id, d.enunciado, d.opciones, d.correcta, coalesce(d.explicacion, ''), d.referencia,
         coalesce(d.metadatos, '{}'::jsonb), true, now()
  from datos d
  on conflict (banco, clave_externa) do update set
    enunciado = excluded.enunciado,
    opciones = excluded.opciones,
    correcta = excluded.correcta,
    explicacion = excluded.explicacion,
    referencia = excluded.referencia,
    metadatos = excluded.metadatos,
    activa = true,
    actualizada_en = now()
  where (bp.enunciado, bp.opciones, bp.correcta, bp.explicacion, bp.referencia, bp.metadatos, bp.activa)
    is distinct from (excluded.enunciado, excluded.opciones, excluded.correcta, excluded.explicacion,
                      excluded.referencia, excluded.metadatos, true)
  returning 1
)
update public.banco_preguntas
set activa = false, actualizada_en = now()
where banco = '${banco}' and activa and clave_externa not in (select id from datos);
`
}

-- ============================================================================
-- Psicotécnicas: terminar una tanda no entrega el banco.
--
-- Hallazgo de la tercera auditoría: psico_terminar devolvía la respuesta y la
-- explicación de TODOS los ejercicios de la tanda, se hubieran respondido o no.
-- Iniciar una tanda, terminarla de inmediato y leer lo que contesta el RPC era
-- una forma de ir vaciando el banco sin responder nada: la tanda completa
-- corregida, y sin límite de tandas.
--
-- Cambio: lo que quedó sin responder vuelve con respuesta y explicación en
-- null. La pantalla ya lo contempla —dice «La respuesta y la explicación se
-- muestran en los ejercicios que respondiste»— y eso está desplegado en
-- producción, comprobado en el bundle servido.
--
-- El enmascarado va en la salida, no en lo guardado: psico_sesiones.resultado
-- conserva la corrección completa —la tabla tiene RLS y ninguna política, así
-- que nadie la lee por PostgREST— y las tandas terminadas antes de este cambio
-- también salen enmascaradas cuando se vuelven a pedir.
--
-- No toca filas.
-- ============================================================================

create or replace function private.psico_sin_lo_no_respondido(p_resultado jsonb)
returns jsonb
language sql
immutable
set search_path = ''
as $$
  -- Empareja revision con respuestas por posicion, no por orden: si algún día
  -- una de las dos listas se arma distinto, sigue tapando lo correcto.
  select case
    when p_resultado is null or jsonb_typeof(p_resultado->'revision') <> 'array' then p_resultado
    else jsonb_set(p_resultado, '{revision}', (
      select coalesce(jsonb_agg(
        case when c.contestada then x.item
             else x.item || '{"respuesta": null, "explicacion": null}'::jsonb end
        order by x.ord
      ), '[]'::jsonb)
      from jsonb_array_elements(p_resultado->'revision') with ordinality as x(item, ord)
      left join lateral (
        select (a.value->>'elegida') is not null as contestada
        from jsonb_array_elements(p_resultado->'respuestas') as a
        where a.value->>'posicion' = x.item->>'posicion'
        limit 1
      ) c on true
    ))
  end
$$;

comment on function private.psico_sin_lo_no_respondido(jsonb) is
  'Tapa respuesta y explicacion de los ejercicios sin responder. Si no encuentra la posicion en respuestas, tapa: el valor por defecto es no revelar.';

create or replace function public.psico_terminar(p_sesion uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_s public.psico_sesiones%rowtype;
  v_respuestas jsonb;
  v_revision jsonb;
  v_total integer;
  v_correctas integer;
  v_velocidad integer;
  v_porcentaje integer;
  v_global integer;
  v_resultado jsonb;
begin
  if v_user is null then
    raise exception 'sin_sesion' using errcode = '42501';
  end if;

  select * into v_s from public.psico_sesiones where id = p_sesion and user_id = v_user for update;
  if not found then
    raise exception 'sesion_no_encontrada' using errcode = 'P0001';
  end if;
  if v_s.terminada_en is not null then
    return private.psico_sin_lo_no_respondido(v_s.resultado);
  end if;

  with filas as (
    select
      u.ord::int as posicion,
      b.metadatos->>'categoria' as categoria,
      b.metadatos->>'subcategoria' as subcategoria,
      b.clave_externa as clave,
      b.correcta as respuesta,
      b.explicacion,
      b.referencia as fuente,
      v_s.limites[u.ord] as limite,
      v_s.respuestas -> u.ord::text as r
    from unnest(v_s.preguntas) with ordinality as u(id, ord)
    join public.banco_preguntas b on b.id = u.id
  ),
  marcadas as (
    select f.*,
      coalesce((f.r->>'correcta')::boolean, false) as acierto,
      f.r is not null and jsonb_typeof(f.r->'opcion') = 'number' as contestada
    from filas f
  )
  select
    jsonb_agg(jsonb_build_object(
      'posicion', m.posicion,
      'categoria', m.categoria,
      'elegida', case when m.contestada then m.r->'opcion' else 'null'::jsonb end,
      'correcta', m.acierto,
      'segundos', coalesce((m.r->>'segundos')::int, 0),
      'limite', m.limite
    ) order by m.posicion),
    jsonb_agg(jsonb_build_object(
      'posicion', m.posicion,
      'id', m.clave,
      'respuesta', m.respuesta,
      'explicacion', m.explicacion,
      'subcategoria', m.subcategoria,
      'fuente', m.fuente
    ) order by m.posicion),
    count(*),
    count(*) filter (where m.acierto),
    -- Misma velocidad que calcularResultado(): el tiempo que sobró, solo en lo respondido.
    round(avg(
      case when m.contestada then
        case when m.limite = 0 then 0
             else greatest(0::numeric, least(1::numeric, (m.limite - (m.r->>'segundos')::int)::numeric / m.limite)) * 100
        end
      end
    ))
  into v_respuestas, v_revision, v_total, v_correctas, v_velocidad
  from marcadas m;

  v_velocidad := coalesce(v_velocidad, 0);
  v_porcentaje := case when v_total = 0 then 0 else round(v_correctas * 100.0 / v_total)::int end;
  v_global := round(v_porcentaje * 0.7 + v_velocidad * 0.3)::int;

  insert into public.user_psico_attempts (user_id, modo, categoria, nivel, total, correctas, score, velocidad, global)
  values (v_user, v_s.modo, v_s.categoria, v_s.nivel, v_total, v_correctas, v_porcentaje, v_velocidad, v_global);

  v_resultado := jsonb_build_object(
    'total', v_total,
    'correctas', v_correctas,
    'porcentaje', v_porcentaje,
    'velocidad', v_velocidad,
    'global', v_global,
    'aprobacion', (select t.total from public.module_thresholds t where t.code = 'psico_simulacro_pass'),
    'respuestas', v_respuestas,
    'revision', v_revision
  );

  update public.psico_sesiones
  set terminada_en = now(), resultado = v_resultado
  where id = v_s.id;

  -- Se guarda completo y se entrega tapado: la corrección del piloto queda
  -- entera en la base y lo que no respondió no sale por el API.
  return private.psico_sin_lo_no_respondido(v_resultado);
end;
$$;

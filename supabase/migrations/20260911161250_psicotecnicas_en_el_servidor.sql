-- ============================================================================
-- Psicotécnicas calificadas en el servidor
--
-- Hasta hoy los 238 ejercicios viajaban al navegador con su respuesta y su
-- explicación, y el navegador medía el tiempo, calculaba precisión, velocidad y
-- resultado global, e insertaba el intento. Quien quisiera podía leer las
-- respuestas o guardarse un simulacro aprobado (y su logro).
--
-- Ahora, igual que las evaluaciones de 20260911080000:
--   - Los ejercicios viven en banco_preguntas (banco 'psicotecnicas'), sin
--     permisos para el cliente. Se siembran desde contenido/bancos/.
--   - psico_iniciar sortea la tanda y devuelve lo que se ve durante el
--     ejercicio (enunciado, opciones, figura o imagen, segundos), sin id,
--     categoría, respuesta ni explicación.
--   - El reloj lo lleva el servidor: cada respuesta mide el tiempo desde la
--     anterior (o desde que se aplazó un ejercicio). En evaluación y simulación
--     una respuesta que llega con el reloj vencido cuenta como no respondida.
--     En entrenamiento el reloj no expulsa y se acepta el tiempo que marca la
--     pantalla, nunca mayor que el real.
--   - psico_terminar calcula precisión, velocidad y global con la misma fórmula
--     de la app (70% precisión, 30% velocidad), guarda el intento en
--     user_psico_attempts (su disparador de logros sigue igual) y devuelve la
--     revisión.
--
-- No toca filas de usuarios. Retirar el INSERT directo sobre user_psico_attempts
-- va en una migración posterior, cuando la app ya use estas funciones.
-- ============================================================================


create table public.psico_sesiones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  modo text not null check (modo in ('entrenamiento', 'evaluacion', 'simulacion')),
  categoria text not null check (categoria in ('abstracto', 'espacial', 'numerico', 'todas')),
  nivel text not null check (nivel in ('basico', 'intermedio', 'avanzado', 'todos')),
  preguntas uuid[] not null check (cardinality(preguntas) between 1 and 30),
  -- Segundos de cada posición, fijados al sortear.
  limites smallint[] not null,
  -- {"3": {"opcion": 1, "correcta": true, "segundos": 21}}; opcion null = sin responder.
  respuestas jsonb not null default '{}'::jsonb check (jsonb_typeof(respuestas) = 'object'),
  -- Desde cuándo corre el reloj del ejercicio que está en pantalla.
  reloj_desde timestamptz not null default now(),
  iniciada_en timestamptz not null default now(),
  vence_en timestamptz not null,
  terminada_en timestamptz,
  resultado jsonb,
  check (cardinality(limites) = cardinality(preguntas))
);

create index psico_sesiones_usuario_inicio on public.psico_sesiones (user_id, iniciada_en desc);

comment on table public.psico_sesiones is
  'Una tanda de psicotécnicas en curso o terminada. Sin permisos para el cliente: todo pasa por psico_*.';

alter table public.psico_sesiones enable row level security;
revoke all on table public.psico_sesiones from anon, authenticated;


-- ─── Segundos por ejercicio ─────────────────────────────────────────────────
-- Espejo de TIEMPOS, FACTOR_NIVEL y tiempoDe() en src/lib/psicotecnicas.ts,
-- que siguen ahí para los textos de las pantallas.
create or replace function private.psico_limite(
  p_modo text,
  p_categoria text,
  p_nivel_ejercicio text,
  p_nivel_filtro text
)
returns smallint
language sql
immutable
set search_path = ''
as $$
  select case
    when p_modo = 'entrenamiento' then 60
    else round(
      (case when p_categoria = 'numerico' then 60 else 45 end)
      * (case coalesce(nullif(p_nivel_filtro, 'todos'), p_nivel_ejercicio)
           when 'basico' then 1.35
           when 'avanzado' then 0.75
           else 1
         end)
    )
  end::smallint
$$;

revoke all on function private.psico_limite(text, text, text, text) from public, anon, authenticated;


-- ─── Iniciar ────────────────────────────────────────────────────────────────
create or replace function public.psico_iniciar(
  p_modo text,
  p_categoria text,
  p_nivel text,
  p_cantidad integer
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_ids uuid[];
  v_limites smallint[];
  v_sesion public.psico_sesiones%rowtype;
begin
  if v_user is null then
    raise exception 'sin_sesion' using errcode = '42501';
  end if;
  if p_modo is null or p_modo not in ('entrenamiento', 'evaluacion', 'simulacion')
     or p_categoria is null or p_categoria not in ('abstracto', 'espacial', 'numerico', 'todas')
     or p_nivel is null or p_nivel not in ('basico', 'intermedio', 'avanzado', 'todos')
     or (p_modo = 'simulacion' and (p_categoria <> 'todas' or p_nivel <> 'todos'))
     or (p_modo <> 'simulacion' and (p_cantidad is null or p_cantidad not between 1 and 30)) then
    raise exception 'parametros_invalidos' using errcode = '22023';
  end if;

  -- Un piloto a la vez, y un tope que deja entrenar de sobra pero no descargar
  -- el banco a punta de tandas.
  perform pg_advisory_xact_lock(hashtextextended('psico:' || v_user::text, 0));
  if (
    select count(*) from public.psico_sesiones s
    where s.user_id = v_user and s.iniciada_en > now() - interval '1 hour'
  ) >= 20 then
    raise exception 'demasiados_intentos' using errcode = 'P0001';
  end if;

  if p_modo = 'simulacion' then
    -- Diez de cada familia; si a una le faltan, se completa con las otras.
    select array_agg(t.id) into v_ids
    from (
      select b.id, row_number() over (partition by b.metadatos->>'categoria' order by random()) as n
      from public.banco_preguntas b
      where b.banco = 'psicotecnicas' and b.activa
    ) t
    where t.n <= 10;

    if coalesce(cardinality(v_ids), 0) < 30 then
      v_ids := coalesce(v_ids, '{}') || coalesce((
        select array_agg(r.id)
        from (
          select b.id
          from public.banco_preguntas b
          where b.banco = 'psicotecnicas' and b.activa and b.id <> all (coalesce(v_ids, '{}'))
          order by random()
          limit 30 - coalesce(cardinality(v_ids), 0)
        ) r
      ), '{}');
    end if;
  else
    select array_agg(t.id) into v_ids
    from (
      select b.id
      from public.banco_preguntas b
      where b.banco = 'psicotecnicas' and b.activa
        and (p_categoria = 'todas' or b.metadatos->>'categoria' = p_categoria)
        and (p_nivel = 'todos' or b.metadatos->>'nivel' = p_nivel)
      order by random()
      limit p_cantidad
    ) t;
  end if;

  if coalesce(cardinality(v_ids), 0) = 0 then
    raise exception 'sin_ejercicios' using errcode = 'P0001';
  end if;

  -- Barajadas entre sí: en el simulacro no vienen por bloques de familia.
  select array_agg(u.id order by random()) into v_ids from unnest(v_ids) as u(id);

  select array_agg(private.psico_limite(p_modo, b.metadatos->>'categoria', b.metadatos->>'nivel', p_nivel) order by u.ord)
    into v_limites
  from unnest(v_ids) with ordinality as u(id, ord)
  join public.banco_preguntas b on b.id = u.id;

  insert into public.psico_sesiones (user_id, modo, categoria, nivel, preguntas, limites, vence_en)
  values (v_user, p_modo, p_categoria, p_nivel, v_ids, v_limites, now() + interval '3 hours')
  returning * into v_sesion;

  return jsonb_build_object(
    'sesion', v_sesion.id,
    'modo', v_sesion.modo,
    'vence_en', v_sesion.vence_en,
    'ejercicios', (
      select jsonb_agg(
        jsonb_build_object(
          'posicion', u.ord,
          'enunciado', b.enunciado,
          'opciones', b.opciones,
          'imagen', b.metadatos->'imagen',
          'imagen_alt', b.metadatos->'imagenAlt',
          'figura', b.metadatos->'figura',
          'opciones_en_imagen', coalesce((b.metadatos->>'opcionesEnImagen')::boolean, false),
          'limite', v_limites[u.ord]
        )
        order by u.ord
      )
      from unnest(v_ids) with ordinality as u(id, ord)
      join public.banco_preguntas b on b.id = u.id
    )
  );
end;
$$;

revoke all on function public.psico_iniciar(text, text, text, integer) from public, anon;
grant execute on function public.psico_iniciar(text, text, text, integer) to authenticated;


-- ─── Responder ──────────────────────────────────────────────────────────────
-- p_opcion null: se acabó el tiempo sin responder. p_segundos: lo que marcó la
-- pantalla; solo se usa en entrenamiento y nunca por encima del tiempo real.
-- La primera respuesta de cada posición es la que queda.
create or replace function public.psico_responder(
  p_sesion uuid,
  p_posicion integer,
  p_opcion integer,
  p_segundos integer
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_s public.psico_sesiones%rowtype;
  v_b public.banco_preguntas%rowtype;
  v_registro jsonb;
  v_opcion integer := p_opcion;
  v_transcurridos integer;
  v_segundos integer;
  v_salida jsonb;
begin
  if v_user is null then
    raise exception 'sin_sesion' using errcode = '42501';
  end if;

  select * into v_s from public.psico_sesiones where id = p_sesion and user_id = v_user for update;
  if not found then
    raise exception 'sesion_no_encontrada' using errcode = 'P0001';
  end if;
  if v_s.terminada_en is not null then
    raise exception 'sesion_terminada' using errcode = 'P0001';
  end if;
  if v_s.vence_en < now() then
    raise exception 'sesion_vencida' using errcode = 'P0001';
  end if;
  if p_posicion is null or p_posicion not between 1 and cardinality(v_s.preguntas) then
    raise exception 'posicion_invalida' using errcode = '22023';
  end if;

  select * into v_b from public.banco_preguntas where id = v_s.preguntas[p_posicion];
  if v_opcion is not null and v_opcion not between 0 and jsonb_array_length(v_b.opciones) - 1 then
    raise exception 'opcion_invalida' using errcode = '22023';
  end if;

  v_registro := v_s.respuestas -> p_posicion::text;
  if v_registro is null then
    v_transcurridos := greatest(0, round(extract(epoch from now() - v_s.reloj_desde)))::int;
    if v_s.modo = 'entrenamiento' then
      v_segundos := least(greatest(coalesce(p_segundos, v_transcurridos), 0), v_transcurridos);
    else
      v_segundos := v_transcurridos;
      -- Cinco segundos de gracia por la red; más allá, el reloj ya se había acabado.
      if v_opcion is not null and v_transcurridos > v_s.limites[p_posicion] + 5 then
        v_opcion := null;
      end if;
    end if;

    v_registro := jsonb_build_object(
      'opcion', v_opcion,
      'correcta', v_opcion is not null and v_opcion = v_b.correcta,
      'segundos', v_segundos
    );
    update public.psico_sesiones
    set respuestas = respuestas || jsonb_build_object(p_posicion::text, v_registro),
        reloj_desde = now()
    where id = v_s.id;
  end if;

  v_salida := jsonb_build_object(
    'posicion', p_posicion,
    'opcion', v_registro->'opcion',
    'segundos', (v_registro->>'segundos')::int,
    'limite', v_s.limites[p_posicion]
  );

  -- Solo el entrenamiento corrige al momento.
  if v_s.modo = 'entrenamiento' then
    v_salida := v_salida || jsonb_build_object(
      'correcta', (v_registro->>'correcta')::boolean,
      'respuesta', v_b.correcta,
      'explicacion', v_b.explicacion,
      'id', v_b.clave_externa,
      'subcategoria', v_b.metadatos->>'subcategoria',
      'fuente', v_b.referencia
    );
  end if;

  return v_salida;
end;
$$;

revoke all on function public.psico_responder(uuid, integer, integer, integer) from public, anon;
grant execute on function public.psico_responder(uuid, integer, integer, integer) to authenticated;


-- ─── Aplazar ────────────────────────────────────────────────────────────────
-- Dejar un ejercicio para el final reinicia el reloj: lo que se mide es la
-- pasada en que se responde.
create or replace function public.psico_aplazar(p_sesion uuid, p_posicion integer)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_s public.psico_sesiones%rowtype;
begin
  if v_user is null then
    raise exception 'sin_sesion' using errcode = '42501';
  end if;

  select * into v_s from public.psico_sesiones where id = p_sesion and user_id = v_user for update;
  if not found then
    raise exception 'sesion_no_encontrada' using errcode = 'P0001';
  end if;
  if v_s.terminada_en is not null then
    raise exception 'sesion_terminada' using errcode = 'P0001';
  end if;
  if v_s.vence_en < now() then
    raise exception 'sesion_vencida' using errcode = 'P0001';
  end if;
  if p_posicion is null or p_posicion not between 1 and cardinality(v_s.preguntas) then
    raise exception 'posicion_invalida' using errcode = '22023';
  end if;

  if not v_s.respuestas ? p_posicion::text then
    update public.psico_sesiones set reloj_desde = now() where id = v_s.id;
  end if;
end;
$$;

revoke all on function public.psico_aplazar(uuid, integer) from public, anon;
grant execute on function public.psico_aplazar(uuid, integer) to authenticated;


-- ─── Terminar ───────────────────────────────────────────────────────────────
-- Idempotente: si la tanda ya se cerró, devuelve el mismo resultado.
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
    return v_s.resultado;
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

  return v_resultado;
end;
$$;

revoke all on function public.psico_terminar(uuid) from public, anon;
grant execute on function public.psico_terminar(uuid) to authenticated;

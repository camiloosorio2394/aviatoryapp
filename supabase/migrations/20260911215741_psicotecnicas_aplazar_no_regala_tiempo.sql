-- ============================================================================
-- Psicotécnicas: aplazar no regala tiempo.
--
-- Hallazgo de la tercera auditoría: psico_aplazar reiniciaba reloj_desde sin
-- guardar lo transcurrido. Llamándola justo antes de responder, el ejercicio
-- quedaba en ~0 segundos: la velocidad (30 % de la nota global) salía perfecta
-- y, en evaluación y simulacro, el corte por tiempo agotado no se aplicaba. La
-- regla de «no se aplaza dos veces» solo existía en la pantalla.
--
-- Cambio: psico_sesiones.acumulado guarda los segundos ya gastados en cada
-- ejercicio. Aplazar los suma y reinicia el reloj para el siguiente; responder
-- cuenta lo acumulado más lo de esta vuelta. Aplazar deja de dar tiempo gratis
-- y el piloto puede seguir saltando ejercicios, que es para lo que existe.
--
-- No toca filas: la columna nace vacía y las sesiones en curso siguen contando
-- desde su reloj, como hasta ahora.
-- ============================================================================

alter table public.psico_sesiones
  add column if not exists acumulado jsonb not null default '{}'::jsonb;

comment on column public.psico_sesiones.acumulado is
  'Segundos ya gastados en cada posición antes de aplazarla. Se suman al responder.';

create or replace function public.psico_aplazar(p_sesion uuid, p_posicion integer)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_s public.psico_sesiones%rowtype;
  v_transcurridos integer;
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

  -- Lo respondido ya tiene su tiempo contado: aplazarlo no cambia nada.
  if not v_s.respuestas ? p_posicion::text then
    v_transcurridos := greatest(0, round(extract(epoch from now() - v_s.reloj_desde)))::int;
    update public.psico_sesiones
    set acumulado = acumulado || jsonb_build_object(
          p_posicion::text,
          coalesce((acumulado ->> p_posicion::text)::int, 0) + v_transcurridos
        ),
        reloj_desde = now()
    where id = v_s.id;
  end if;
end;
$$;

revoke all on function public.psico_aplazar(uuid, integer) from public, anon;
grant execute on function public.psico_aplazar(uuid, integer) to authenticated;

create or replace function public.psico_responder(p_sesion uuid, p_posicion integer, p_opcion integer, p_segundos integer)
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
    -- Lo de esta vuelta más lo que ya se había gastado antes de aplazarlo.
    v_transcurridos := coalesce((v_s.acumulado ->> p_posicion::text)::int, 0)
      + greatest(0, round(extract(epoch from now() - v_s.reloj_desde)))::int;
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

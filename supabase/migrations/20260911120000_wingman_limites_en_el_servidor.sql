-- Wingman: el uso, los límites y el historial los decide el servidor.
--
-- Antes la función de borde confiaba en el cliente para tres cosas:
--   - el límite gratis contaba `conversation_id` distintos, y el id lo mandaba
--     el cliente: repitiendo el mismo id, mensajes ilimitados;
--   - el historial de la conversación llegaba del navegador tal cual, así que
--     se podían inventar turnos del asistente y usar Wingman de proxy general;
--   - `trialing` contaba como Pro sin mirar `current_period_end`, y los planes
--     Pro+ no contaban como Pro.
-- Además el límite se revisaba antes de llamar al modelo y el uso se guardaba
-- después: varias peticiones simultáneas pasaban todas el control.
--
-- Ahora la función de borde llama a `wingman_reservar` con la service_role:
-- bajo un candado por usuario revisa los límites, valida que la conversación
-- sea del piloto, devuelve el historial guardado y registra el mensaje antes de
-- llamar al modelo. Si el modelo falla, el mensaje queda marcado `failed` y no
-- cuenta. No se borran filas.

alter table public.ai_interactions
  add column if not exists failed boolean not null default false;

comment on column public.ai_interactions.failed is
  'Mensaje del piloto que no obtuvo respuesta del modelo. No cuenta para los límites ni entra al historial.';

-- ─── Plan de pago vigente ────────────────────────────────────────────────────

create or replace function private.plan_pro_vigente(p_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((
    select
      s.plan = 'founder_lifetime'
      or (
        s.plan in ('pro_monthly', 'pro_annual', 'pro_plus_monthly', 'pro_plus_annual')
        and (
          s.status = 'active'
          or (s.status = 'trialing' and s.current_period_end > now())
        )
      )
    from public.subscriptions s
    where s.user_id = p_user_id
    order by s.created_at desc
    limit 1
  ), false);
$$;

revoke all on function private.plan_pro_vigente(uuid) from public, anon, authenticated;

-- ─── Límites ─────────────────────────────────────────────────────────────────

create or replace function private.wingman_limites()
returns jsonb
language sql
immutable
set search_path = ''
as $$
  select jsonb_build_object(
    'conversaciones_gratis_mes', 5,     -- conversaciones nuevas al mes sin plan de pago
    'mensajes_por_conversacion', 20,    -- turnos del piloto dentro de una conversación
    'mensajes_por_minuto', 6,
    'mensajes_por_dia', 60,             -- tope de abuso, también con plan de pago
    'historial_mensajes', 20,           -- cuántos mensajes previos van al modelo
    'caracteres_mensaje', 4000
  );
$$;

revoke all on function private.wingman_limites() from public, anon, authenticated;

-- Conversaciones que cuentan en el mes (hora de Bogotá), sin las fallidas.
create or replace function private.wingman_conversaciones_mes(p_user_id uuid)
returns integer
language sql
stable
security definer
set search_path = ''
as $$
  select count(distinct i.conversation_id)::int
  from public.ai_interactions i
  where i.user_id = p_user_id
    and i.role = 'user'
    and not i.failed
    and i.created_at >= (date_trunc('month', now() at time zone 'America/Bogota') at time zone 'America/Bogota');
$$;

revoke all on function private.wingman_conversaciones_mes(uuid) from public, anon, authenticated;

-- La función vieja la leen clientes con la versión anterior en caché: se
-- conserva, con la misma cuenta que usa el servidor.
create or replace function public.ai_usage_this_month()
returns integer
language sql
stable
security definer
set search_path = ''
as $$
  select case when auth.uid() is null then 0 else private.wingman_conversaciones_mes(auth.uid()) end;
$$;

-- Lo que el panel de Wingman muestra: cuántas lleva, cuántas tiene y si su plan
-- las hace ilimitadas.
create or replace function public.wingman_estado()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
begin
  if v_user is null then
    raise exception 'sin_sesion' using errcode = '42501';
  end if;
  return jsonb_build_object(
    'usadas', private.wingman_conversaciones_mes(v_user),
    'limite', (private.wingman_limites()->>'conversaciones_gratis_mes')::int,
    'pro', private.plan_pro_vigente(v_user)
  );
end;
$$;

revoke all on function public.wingman_estado() from public, anon;
grant execute on function public.wingman_estado() to authenticated;

-- ─── Reserva de un mensaje ───────────────────────────────────────────────────
--
-- Solo la llama la función de borde (service_role), que ya verificó el JWT y
-- pasa el id del piloto. Errores (en `message`):
--   conversacion_no_encontrada, conversacion_llena, limite_mensual,
--   demasiado_rapido, limite_diario, mensaje_invalido, tipo_invalido.

create or replace function public.wingman_reservar(
  p_user_id uuid,
  p_conversation_id uuid,
  p_kind text,
  p_mensaje text
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_limites jsonb := private.wingman_limites();
  v_mensaje text := btrim(coalesce(p_mensaje, ''));
  v_conversacion uuid;
  v_kind text := p_kind;
  v_historial jsonb;
  v_id bigint;
begin
  if p_user_id is null then
    raise exception 'sin_sesion' using errcode = '42501';
  end if;
  if p_kind not in ('quiz_explain', 'study_help', 'general') then
    raise exception 'tipo_invalido' using errcode = '22023';
  end if;
  if char_length(v_mensaje) = 0 or char_length(v_mensaje) > (v_limites->>'caracteres_mensaje')::int then
    raise exception 'mensaje_invalido' using errcode = '22023';
  end if;

  -- Un piloto a la vez: sin esto, peticiones simultáneas pasaban todas el límite.
  perform pg_advisory_xact_lock(hashtextextended('wingman:' || p_user_id::text, 0));

  if (
    select count(*) from public.ai_interactions i
    where i.user_id = p_user_id and i.role = 'user' and not i.failed
      and i.created_at > now() - interval '1 minute'
  ) >= (v_limites->>'mensajes_por_minuto')::int then
    raise exception 'demasiado_rapido' using errcode = 'P0001';
  end if;

  if (
    select count(*) from public.ai_interactions i
    where i.user_id = p_user_id and i.role = 'user' and not i.failed
      and i.created_at > now() - interval '1 day'
  ) >= (v_limites->>'mensajes_por_dia')::int then
    raise exception 'limite_diario' using errcode = 'P0001';
  end if;

  if p_conversation_id is null then
    if not private.plan_pro_vigente(p_user_id)
       and private.wingman_conversaciones_mes(p_user_id) >= (v_limites->>'conversaciones_gratis_mes')::int then
      raise exception 'limite_mensual' using errcode = 'P0001';
    end if;
    v_conversacion := gen_random_uuid();
    v_historial := '[]'::jsonb;
  else
    -- La conversación tiene que existir y ser del piloto; el tipo es el suyo.
    select i.kind into v_kind
    from public.ai_interactions i
    where i.conversation_id = p_conversation_id and i.user_id = p_user_id and i.role = 'user'
    order by i.id
    limit 1;
    if not found then
      raise exception 'conversacion_no_encontrada' using errcode = 'P0001';
    end if;

    if (
      select count(*) from public.ai_interactions i
      where i.conversation_id = p_conversation_id and i.user_id = p_user_id
        and i.role = 'user' and not i.failed
    ) >= (v_limites->>'mensajes_por_conversacion')::int then
      raise exception 'conversacion_llena' using errcode = 'P0001';
    end if;

    v_conversacion := p_conversation_id;
    select coalesce(jsonb_agg(jsonb_build_object('role', h.role, 'content', h.content) order by h.id), '[]'::jsonb)
      into v_historial
    from (
      select i.id, i.role, i.content
      from public.ai_interactions i
      where i.conversation_id = p_conversation_id and i.user_id = p_user_id and not i.failed
      order by i.id desc
      limit (v_limites->>'historial_mensajes')::int
    ) h;
  end if;

  insert into public.ai_interactions (user_id, conversation_id, kind, role, content)
  values (p_user_id, v_conversacion, v_kind, 'user', v_mensaje)
  returning id into v_id;

  return jsonb_build_object(
    'conversation_id', v_conversacion,
    'mensaje_id', v_id,
    'kind', v_kind,
    'historial', v_historial
  );
end;
$$;

revoke all on function public.wingman_reservar(uuid, uuid, text, text) from public, anon, authenticated;
grant execute on function public.wingman_reservar(uuid, uuid, text, text) to service_role;

-- ─── Cierre del mensaje ──────────────────────────────────────────────────────
--
-- Con respuesta: guarda el turno del asistente en la misma conversación.
-- Sin respuesta (p_texto nulo): marca el mensaje del piloto como fallido.

create or replace function public.wingman_cerrar(
  p_mensaje_id bigint,
  p_texto text,
  p_tokens_input integer,
  p_tokens_output integer,
  p_modelo text
)
returns bigint
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_pregunta public.ai_interactions%rowtype;
  v_id bigint;
begin
  select * into v_pregunta from public.ai_interactions where id = p_mensaje_id and role = 'user';
  if not found then
    raise exception 'mensaje_no_encontrado' using errcode = 'P0001';
  end if;

  if p_texto is null then
    update public.ai_interactions set failed = true where id = p_mensaje_id;
    return null;
  end if;

  insert into public.ai_interactions (user_id, conversation_id, kind, role, content, tokens_input, tokens_output, model)
  values (v_pregunta.user_id, v_pregunta.conversation_id, v_pregunta.kind, 'assistant', p_texto,
          greatest(coalesce(p_tokens_input, 0), 0), greatest(coalesce(p_tokens_output, 0), 0), p_modelo)
  returning id into v_id;
  return v_id;
end;
$$;

revoke all on function public.wingman_cerrar(bigint, text, integer, integer, text) from public, anon, authenticated;
grant execute on function public.wingman_cerrar(bigint, text, integer, integer, text) to service_role;

-- Historial y conteo por conversación. Reemplaza al índice de una sola columna;
-- el de user_id lo cubre ai_interactions_user_month_idx (user_id, created_at).
create index if not exists ai_interactions_conversacion_usuario_idx
  on public.ai_interactions (conversation_id, user_id, id);
drop index if exists public.ai_interactions_conversation_id_idx;
drop index if exists public.ai_interactions_user_id_idx;

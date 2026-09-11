-- ============================================================================
-- Comunidad en vivo, por canal.
--
-- Hallazgos:
--   - Las reacciones no tenían canal. Cada piloto conectado a un canal recibía
--     las reacciones de toda la comunidad, y Realtime revisaba el RLS de cada
--     una para cada suscriptor: el costo crece con pilotos por reacciones.
--   - Con la identidad de réplica por defecto, el WAL de un borrado solo trae
--     la llave primaria, y Realtime compara el filtro de la suscripción con eso
--     (realtime.apply_rls -> is_visible_through_filters). El filtro por
--     channel_id nunca coincidía: un mensaje borrado no desaparecía en vivo
--     para los demás.
--
-- Cambios:
--   1. community_reactions.channel_id, con su índice. Lo pone un disparador con
--      el canal del mensaje; el cliente no lo manda.
--   2. replica identity full en community_messages y community_reactions: el
--      WAL de un borrado trae la fila y el filtro por canal funciona. Con RLS,
--      el aviso que llega al cliente sigue trayendo solo la llave primaria.
--
-- community_reactions está vacía: la columna nace not null sin tocar filas. Si
-- tuviera filas, la migración falla en vez de completarlas.
-- ============================================================================

alter table public.community_reactions
  add column channel_id bigint not null references public.community_channels (id) on delete cascade;

create index if not exists community_reactions_channel_id_idx on public.community_reactions (channel_id);

create or replace function private.reaccion_con_canal()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  select m.channel_id into new.channel_id
  from public.community_messages m
  where m.id = new.message_id;
  if new.channel_id is null then
    raise exception 'mensaje_no_encontrado' using errcode = '23503';
  end if;
  return new;
end
$$;
revoke all on function private.reaccion_con_canal() from public;

drop trigger if exists trg_canal_community_reactions on public.community_reactions;
create trigger trg_canal_community_reactions before insert on public.community_reactions
  for each row execute function private.reaccion_con_canal();

alter table public.community_messages replica identity full;
alter table public.community_reactions replica identity full;

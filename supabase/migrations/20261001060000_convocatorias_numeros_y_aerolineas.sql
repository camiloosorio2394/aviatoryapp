-- ============================================================================
-- Las horas y el nivel de inglés de cada convocatoria, ya leídos, en columnas;
-- y las aerolíneas que se suman a la revisión.
--
-- Hasta 20261001050000 las horas se leían del texto de los requisitos dos
-- veces: en la app (TypeScript) y en la base (private.horas_de_convocatoria),
-- con dos copias de las mismas reglas. Arajet mostró por qué eso no sirve: su
-- renglón «1,500 total hours (1,000 hours for Dominican candidates)» pedía una
-- regla nueva, y había que escribirla dos veces. Ahora se leen una sola vez, al
-- guardar (requisitosClave() en supabase/functions/revisar-convocatorias/
-- lectores.ts), y la app y el aviso de la meta de horas usan estas columnas.
--
-- Las aerolíneas nuevas (26-sep-2026, pedido de Camilo: «busca más»):
--   Clic, Sky, BoA, Arajet, Volaris y Viva se leen solas;
--   Aeroméxico (publica en el portal de su sindicato) y Aerolíneas Argentinas
--   (solo LinkedIn, que prohíbe leerlo) se marcan a mano.
-- Sus requisitos no llevan mínimos nuestros: `requirements` queda vacío, porque
-- las horas son las que pida cada convocatoria.
-- ============================================================================

alter table public.convocatorias
  add column horas_minimas integer check (horas_minimas between 0 and 30000),
  add column horas_nacionales integer check (horas_nacionales between 0 and 30000),
  add column horas_extranjeros integer check (horas_extranjeros between 0 and 30000),
  add column nivel_icao smallint check (nivel_icao between 1 and 6);

comment on column public.convocatorias.horas_minimas is
  'Horas totales que pide, leídas de los requisitos. Si distingue, van en horas_nacionales y horas_extranjeros.';

-- ─── A mano, con los números ────────────────────────────────────────────────
-- La firma cambia: se quita la vieja para no dejar dos.
drop function if exists private.convocatoria_manual(text, text, text, boolean, text[], text, text, text, text);

create function private.convocatoria_manual(
  p_aerolinea text,
  p_titulo text,
  p_url text,
  p_abierta boolean,
  p_requisitos text[] default '{}',
  p_pais text default null,
  p_cargo text default 'primer_oficial',
  p_clave text default 'manual',
  p_tipo text default 'vacante',
  p_horas integer default null,
  p_horas_nacionales integer default null,
  p_horas_extranjeros integer default null,
  p_nivel_icao smallint default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_airline bigint;
begin
  select id into v_airline from public.airlines where code = p_aerolinea;
  if v_airline is null then
    raise exception 'No hay una aerolínea con el código %', p_aerolinea using errcode = 'invalid_parameter_value';
  end if;

  insert into public.convocatorias as c
    (airline_id, clave_externa, cargo, tipo, titulo, pais, url, requisitos, abierta, fuente, cerrada_en,
     horas_minimas, horas_nacionales, horas_extranjeros, nivel_icao)
  values
    (v_airline, p_clave, p_cargo, p_tipo, p_titulo, p_pais, p_url, coalesce(p_requisitos, '{}'), p_abierta, 'manual',
     case when p_abierta then null else now() end,
     p_horas, p_horas_nacionales, p_horas_extranjeros, p_nivel_icao)
  on conflict (airline_id, clave_externa) do update set
    cargo = excluded.cargo,
    tipo = excluded.tipo,
    titulo = excluded.titulo,
    pais = coalesce(excluded.pais, c.pais),
    url = excluded.url,
    -- Cerrar sin repetir los requisitos ni los números no los borra.
    requisitos = case when cardinality(excluded.requisitos) > 0 then excluded.requisitos else c.requisitos end,
    horas_minimas = coalesce(excluded.horas_minimas, c.horas_minimas),
    horas_nacionales = coalesce(excluded.horas_nacionales, c.horas_nacionales),
    horas_extranjeros = coalesce(excluded.horas_extranjeros, c.horas_extranjeros),
    nivel_icao = coalesce(excluded.nivel_icao, c.nivel_icao),
    abierta = excluded.abierta,
    fuente = 'manual',
    vista_por_ultima_vez = now(),
    cerrada_en = case when excluded.abierta then null else coalesce(c.cerrada_en, now()) end;
end;
$$;

revoke all on function private.convocatoria_manual(text, text, text, boolean, text[], text, text, text, text, integer, integer, integer, smallint)
  from public, anon, authenticated;

comment on function private.convocatoria_manual(text, text, text, boolean, text[], text, text, text, text, integer, integer, integer, smallint) is
  'Marca a mano una convocatoria (LATAM, Aeroméxico, Aerolíneas Argentinas). Solo desde el editor SQL. Las horas y el nivel van en sus parámetros: aquí no se leen del texto.';

-- La página de pilotos de LATAM, con los números de sus requisitos
-- («150 horas de vuelo o más», «OACI 4 o Superior»).
update public.convocatorias
set horas_minimas = 150, nivel_icao = 4
where clave_externa = 'pagina-pilotos'
  and airline_id = (select id from public.airlines where code = 'LAN');

-- ─── Las horas que le aplican a un piloto, desde las columnas ───────────────
drop function if exists private.horas_de_convocatoria(text[], text, text);

create function private.horas_que_aplican(
  p_horas integer,
  p_horas_nacionales integer,
  p_horas_extranjeros integer,
  p_pais_del_piloto text,
  p_pais_de_la_convocatoria text
)
returns integer
language sql
immutable
set search_path = ''
as $$
  -- Si distingue, las de su caso según su país; sin país, las de extranjero.
  -- Mismas reglas que horasQueAplican() en src/lib/convocatorias.ts.
  select case
    when p_pais_del_piloto is not null and p_pais_de_la_convocatoria is not null
         and translate(lower(trim(p_pais_del_piloto)), 'áéíóúüñ', 'aeiouun')
           = translate(lower(trim(p_pais_de_la_convocatoria)), 'áéíóúüñ', 'aeiouun')
         and p_horas_nacionales is not null
      then p_horas_nacionales
    when not (p_pais_del_piloto is not null and p_pais_de_la_convocatoria is not null
         and translate(lower(trim(p_pais_del_piloto)), 'áéíóúüñ', 'aeiouun')
           = translate(lower(trim(p_pais_de_la_convocatoria)), 'áéíóúüñ', 'aeiouun'))
         and p_horas_extranjeros is not null
      then p_horas_extranjeros
    else coalesce(p_horas, p_horas_extranjeros, p_horas_nacionales)
  end;
$$;

revoke all on function private.horas_que_aplican(integer, integer, integer, text, text) from public, anon, authenticated;

create or replace function private.avisar_meta_de_horas_cerca()
returns int
language plpgsql
security definer
set search_path = ''
as $meta$
declare
  v_today date;
  v_total int := 0;
  r record;
  -- A cuántas horas del mínimo se considera «cerca». Es la distancia que un
  -- piloto que vuela seguido cubre en pocas semanas.
  c_margen constant numeric := 50;
  -- Cuánto hace que voló para que el aviso sea consecuencia de anotar.
  c_dias_desde_el_vuelo constant int := 7;
begin
  v_today := (now() at time zone 'America/Bogota')::date;

  for r in
    select distinct on (ps.user_id)
           ps.user_id,
           ps.total_hours,
           a.name as aerolinea,
           h.horas - ps.total_hours as faltan
    from public.pilot_state ps
    left join public.profiles p on p.id = ps.user_id
    join public.convocatorias c
      on c.abierta
     and c.cargo <> 'capitan'
     and (c.cierra_en is null or c.cierra_en >= v_today)
    join public.airlines a on a.id = c.airline_id
    cross join lateral (
      select private.horas_que_aplican(c.horas_minimas, c.horas_nacionales, c.horas_extranjeros, p.country, c.pais) as horas
    ) h
    where ps.total_hours is not null
      and h.horas is not null
      and h.horas > ps.total_hours
      and h.horas - ps.total_hours <= c_margen
      and exists (
        select 1 from public.flights f
        where f.user_id = ps.user_id
          and f.flight_date >= v_today - c_dias_desde_el_vuelo
      )
      and not exists (
        select 1 from public.notifications n
        where n.user_id = ps.user_id
          and n.type = 'milestone_close'
          and n.body like '%' || a.name || '%'
          and n.created_at >= now() - interval '30 days'
      )
    order by ps.user_id, faltan
  loop
    insert into public.notifications (user_id, type, title, body, icon, action_url)
    values (
      r.user_id,
      'milestone_close',
      'Te faltan ' || to_char(r.faltan, 'FM999990.0') || ' h para ' || r.aerolinea,
      'Con ' || to_char(r.total_hours, 'FM999990.0') || ' h de carrera ya estás a ' ||
        to_char(r.faltan, 'FM999990.0') || ' h de lo que pide la convocatoria abierta de ' || r.aerolinea || '.',
      '✈️',
      '/app/match'
    );
    v_total := v_total + 1;
  end loop;

  return v_total;
end;
$meta$;

revoke all on function private.avisar_meta_de_horas_cerca() from public, anon, authenticated;

-- ─── Las aerolíneas nuevas ──────────────────────────────────────────────────
-- Códigos OACI verificados en la lista de designadores de la FAA (JO 7340.2) y
-- en la ficha de Wikipedia de cada una. El color es el de su logo.
insert into public.airlines (name, code, country, brand_color, requirements, order_index)
select v.name, v.code, v.country, v.brand_color, '{}'::jsonb, v.order_index
from (values
  ('Clic', 'EFY', 'Colombia', '#E40046', 7),
  ('Arajet', 'DWI', 'República Dominicana', '#510C76', 8),
  ('Sky Airline', 'SKU', 'Chile', '#59237F', 9),
  ('BoA', 'BOV', 'Bolivia', '#0D2B60', 10),
  ('Volaris', 'VOI', 'México', '#A12885', 11),
  ('Viva', 'VIV', 'México', '#00AE44', 12),
  ('Aeroméxico', 'AMX', 'México', '#040C3E', 13),
  ('Aerolíneas Argentinas', 'ARG', 'Argentina', '#0081C6', 14)
) as v(name, code, country, brand_color, order_index)
where not exists (select 1 from public.airlines a where a.code = v.code);

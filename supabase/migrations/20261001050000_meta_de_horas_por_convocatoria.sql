-- ============================================================================
-- La meta de horas sale de las convocatorias, no de una tabla nuestra.
--
-- Camilo (26-sep-2026): «las horas mínimas son las que pida la convocatoria,
-- no las que nosotros digamos». El aviso «te faltan X h» se calculaba con
-- airlines.requirements->>'min_hours_total', que puso la app. Ahora se calcula
-- con las convocatorias de ingreso abiertas (primer oficial, cadete o pilotos;
-- capitán no), leyendo las horas de sus requisitos tal como los publicó la
-- aerolínea.
--
-- private.horas_de_convocatoria() lee las horas con las mismas reglas que
-- requisitosClave() y horasQueAplican() en src/lib/convocatorias.ts. Si se
-- cambia una, se cambia la otra: las dos se prueban con los mismos requisitos
-- (supabase/tests/convocatorias.sql y src/lib/convocatorias.test.ts).
-- ============================================================================

create or replace function private.horas_de_convocatoria(
  p_requisitos text[],
  p_pais_del_piloto text,
  p_pais_de_la_convocatoria text
)
returns integer
language plpgsql
immutable
set search_path = ''
as $$
declare
  v_renglon text;
  v_t text;
  v_m text[];
  v_n integer;
  v_generales integer;
  v_nacionales integer;
  v_extranjeros integer;
  v_es_nacional boolean;
begin
  foreach v_renglon in array coalesce(p_requisitos, '{}') loop
    v_t := translate(lower(v_renglon), 'áéíóúüñ', 'aeiouun');
    v_m := regexp_match(v_t, '(\d{1,3}(?:[.,]\d{3})+|\d+)\s*(?:horas|hours|hrs|h\M)');
    -- Las horas al mando, en jet o como capitán no son las totales.
    if v_m is not null
       and v_t !~ '\mpic\M|al mando|como capitan|como comandante|en jet|jet de|\matr\M|multimotor|simulador|instruccion' then
      v_n := replace(replace(v_m[1], '.', ''), ',', '')::integer;
      if v_t ~ 'extranjer|foreign' then
        v_extranjeros := coalesce(v_extranjeros, v_n);
      elsif v_t ~ 'panamen|panamanian|colombian|argentin|chilen|peruan|mexican|dominican|nacional(?!idad)' then
        v_nacionales := coalesce(v_nacionales, v_n);
      else
        v_generales := coalesce(v_generales, v_n);
      end if;
    end if;
  end loop;

  v_es_nacional := p_pais_del_piloto is not null and p_pais_de_la_convocatoria is not null
    and translate(lower(trim(p_pais_del_piloto)), 'áéíóúüñ', 'aeiouun')
      = translate(lower(trim(p_pais_de_la_convocatoria)), 'áéíóúüñ', 'aeiouun');
  if v_es_nacional and v_nacionales is not null then return v_nacionales; end if;
  if not v_es_nacional and v_extranjeros is not null then return v_extranjeros; end if;
  return coalesce(v_generales, v_extranjeros, v_nacionales);
end;
$$;

revoke all on function private.horas_de_convocatoria(text[], text, text) from public, anon, authenticated;

comment on function private.horas_de_convocatoria(text[], text, text) is
  'Las horas mínimas que pide una convocatoria a un piloto de ese país. Mismas reglas que src/lib/convocatorias.ts.';

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
      select private.horas_de_convocatoria(c.requisitos, p.country, c.pais) as horas
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

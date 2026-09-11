-- ============================================================================
-- Panel del piloto: panel_inicio() y panel_tarjetas() devuelven lo mismo que
-- las consultas que reemplazan, y nada de otro piloto.
--
-- Lo que el cliente todavía lee (perfil, estado, quizzes, logros, documentos)
-- se compara como el piloto, con su RLS. Lo que ya solo lee el servidor
-- (actividad, compañeros, dominio, preparación) se compara como servidor, con
-- el mismo piloto en la sesión.
--
-- Solo lee. Termina en PRUEBA_DESHECHA con la lista de lo verificado, o en
-- FALLO. Cómo se corre: supabase/tests/README.md.
-- ============================================================================
do $prueba$
declare
  x_usuario uuid;
  x_inicio jsonb;
  x_tarjetas jsonb;
  x_esperado jsonb;
  x_pilotos int := 0;
  x_lecciones_notam int;
  x_log text := '';
begin
  select lecciones into x_lecciones_notam from public.modulos_contenido where modulo = 'notam';

  -- Sin sesión no hay panel, y anon no lo ejecuta.
  perform set_config('request.jwt.claims', '', true);
  begin
    perform public.panel_inicio();
    raise exception 'FALLO panel_inicio sin sesión';
  exception when insufficient_privilege then null;
  end;
  if has_function_privilege('anon', 'public.panel_inicio()', 'execute')
     or has_function_privilege('anon', 'public.panel_tarjetas()', 'execute') then
    raise exception 'FALLO anon ejecuta el panel';
  end if;
  x_log := x_log || ' sin_sesion';

  for x_usuario in select id from auth.users order by created_at limit 5 loop
    x_pilotos := x_pilotos + 1;
    perform set_config('request.jwt.claims', json_build_object('sub', x_usuario, 'role', 'authenticated')::text, true);
    set local role authenticated;

    x_inicio := public.panel_inicio();
    x_tarjetas := public.panel_tarjetas();

    -- Como el piloto, con su RLS.
    x_esperado := (select jsonb_build_object('full_name', full_name, 'username', username, 'photo_url', photo_url)
                   from public.profiles where id = x_usuario);
    if x_inicio -> 'perfil' is distinct from x_esperado then
      raise exception 'FALLO perfil de %: % contra %', x_usuario, x_inicio -> 'perfil', x_esperado;
    end if;
    if (x_inicio -> 'piloto' ->> 'stage') is distinct from (select stage::text from public.pilot_state where user_id = x_usuario) then
      raise exception 'FALLO etapa de %', x_usuario;
    end if;
    if (x_inicio ->> 'quizzes_completados')::int
       <> (select count(*) from public.vault_sessions where user_id = x_usuario and completed_at is not null) then
      raise exception 'FALLO quizzes de %', x_usuario;
    end if;
    if (select count(*) from jsonb_array_elements(x_tarjetas -> 'logros') e where e ->> 'unlocked_at' is not null)
       <> (select count(*) from public.user_achievements where user_id = x_usuario) then
      raise exception 'FALLO logros desbloqueados de %', x_usuario;
    end if;
    if jsonb_array_length(x_tarjetas -> 'logros') <> (select count(*) from public.achievements) then
      raise exception 'FALLO catálogo de logros';
    end if;
    if jsonb_array_length(x_tarjetas -> 'licencias')
       <> (select count(*) from public.licenses_held where user_id = x_usuario and expires_date is not null) then
      raise exception 'FALLO documentos de %', x_usuario;
    end if;
    if exists (select 1 from jsonb_array_elements(x_tarjetas -> 'quiz_diario') e where e ? 'explanation' or e ? 'options') then
      raise exception 'FALLO el quiz del día trae explicación u opciones';
    end if;
    if (x_tarjetas -> 'notam' ->> 'lecciones')::int > x_lecciones_notam then
      raise exception 'FALLO NOTAM cuenta secciones que no existen';
    end if;
    reset role;

    -- Como servidor, con el mismo piloto en la sesión.
    if jsonb_array_length(x_tarjetas -> 'actividad')
       <> (select count(*) from public.daily_activity where user_id = x_usuario and date >= current_date - 90) then
      raise exception 'FALLO actividad de %', x_usuario;
    end if;
    x_esperado := coalesce((select jsonb_agg(jsonb_build_object('username', username, 'current_streak', current_streak))
                            from public.get_peers_in_stage(5)), '[]'::jsonb);
    if x_tarjetas -> 'companeros' is distinct from x_esperado then
      raise exception 'FALLO compañeros de %', x_usuario;
    end if;
    x_esperado := coalesce((select jsonb_agg(to_jsonb(m)) from public.get_subject_mastery() m), '[]'::jsonb);
    if x_tarjetas -> 'dominio' is distinct from x_esperado then
      raise exception 'FALLO dominio de %', x_usuario;
    end if;
    if (x_tarjetas -> 'preparacion' ->> 'attempts_60d') is distinct from
       (select attempts_60d::text from public.user_pca_readiness where user_id = x_usuario) then
      raise exception 'FALLO preparación de %', x_usuario;
    end if;
  end loop;
  x_log := x_log || ' igual_a_las_consultas(' || x_pilotos || '_pilotos)';

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;

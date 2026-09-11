-- ============================================================================
-- Logros: cada disparador evalúa su grupo, lección y práctica cuentan contra el
-- catálogo, y la app se pone al día con check_and_unlock_achievements.
--
-- Escribe filas de prueba y las deshace: termina en PRUEBA_DESHECHA con la
-- lista de lo verificado, o en FALLO. Cómo se corre: supabase/tests/README.md.
-- ============================================================================
do $prueba$
declare
  x_a uuid;
  x_b uuid;
  x_canal bigint;
  x_practicas text[];
  x_i int;
  x_n int;
  x_log text := '';
begin
  select id into x_a from auth.users order by created_at limit 1;
  select id into x_b from auth.users order by created_at offset 1 limit 1;
  select id into x_canal from public.community_channels order by id limit 1;
  select practicas into x_practicas from public.modulos_contenido where modulo = 'notam';

  -- Punto de partida conocido para A (dentro de la transacción).
  delete from public.user_achievements where user_id = x_a;
  delete from public.user_notam_progress where user_id = x_a;
  delete from public.community_messages where user_id = x_a and created_at > now() - interval '10 minutes';

  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;

  -- Lección de NOTAM: las nueve secciones del catálogo la ganan.
  for x_i in 1..8 loop
    perform public.notam_mark_progress(x_i::smallint, null);
  end loop;
  reset role;
  if exists (select 1 from public.user_achievements ua join public.achievements a on a.id = ua.achievement_id
             where ua.user_id = x_a and a.code = 'notam_lesson') then
    raise exception 'FALLO notam_lesson con 8 secciones';
  end if;
  set local role authenticated;
  perform public.notam_mark_progress(9::smallint, null);
  reset role;
  if not exists (select 1 from public.user_achievements ua join public.achievements a on a.id = ua.achievement_id
                 where ua.user_id = x_a and a.code = 'notam_lesson') then
    raise exception 'FALLO notam_lesson no se ganó con las 9 secciones';
  end if;
  x_log := x_log || ' leccion_con_catalogo';

  -- Práctica de NOTAM: todas las del catálogo, no 40.
  set local role authenticated;
  for x_i in 1..cardinality(x_practicas) - 1 loop
    perform public.notam_mark_progress(null, x_practicas[x_i]);
  end loop;
  reset role;
  if exists (select 1 from public.user_achievements ua join public.achievements a on a.id = ua.achievement_id
             where ua.user_id = x_a and a.code = 'notam_practice') then
    raise exception 'FALLO notam_practice sin la práctica completa';
  end if;
  set local role authenticated;
  perform public.notam_mark_progress(null, x_practicas[cardinality(x_practicas)]);
  reset role;
  if not exists (select 1 from public.user_achievements ua join public.achievements a on a.id = ua.achievement_id
                 where ua.user_id = x_a and a.code = 'notam_practice') then
    raise exception 'FALLO notam_practice no se ganó con la práctica completa';
  end if;
  x_log := x_log || ' practica_con_catalogo';

  -- Claves de versiones viejas no cuentan.
  delete from public.user_achievements where user_id = x_b;
  delete from public.user_notam_progress where user_id = x_b;
  insert into public.user_notam_progress (user_id, lesson_screens, practice_done)
  values (x_b, '{1,2,3,4,5,6,7,8,13}', array(select 'viejo-' || g from generate_series(1, 200) as g));
  if exists (select 1 from public.user_achievements ua join public.achievements a on a.id = ua.achievement_id
             where ua.user_id = x_b and a.code in ('notam_lesson', 'notam_practice')) then
    raise exception 'FALLO claves viejas ganaron logros de NOTAM';
  end if;
  x_log := x_log || ' claves_viejas_no_cuentan';

  -- Cada disparador evalúa su grupo: un mensaje no revisa first_step.
  delete from public.user_achievements ua using public.achievements a
  where ua.user_id = x_a and a.id = ua.achievement_id and a.code in ('first_step', 'community_hello');
  set local role authenticated;
  insert into public.community_messages (channel_id, user_id, content) values (x_canal, x_a, 'hola');
  reset role;
  select count(*) filter (where a.code = 'community_hello'), count(*) filter (where a.code = 'first_step')
    into x_n, x_i
  from public.user_achievements ua join public.achievements a on a.id = ua.achievement_id
  where ua.user_id = x_a;
  if x_n <> 1 then raise exception 'FALLO el mensaje no dio community_hello'; end if;
  if x_i <> 0 and exists (select 1 from public.pilot_state where user_id = x_a and stage is not null) then
    raise exception 'FALLO el disparador de mensajes revisó first_step';
  end if;
  x_log := x_log || ' grupo_por_tabla';

  -- La app se pone al día con todos los grupos, solo sobre sí misma.
  set local role authenticated;
  if exists (select 1 from public.pilot_state where user_id = x_a and stage is not null) then
    perform public.check_and_unlock_achievements(x_a);
    if not exists (select 1 from public.user_achievements ua join public.achievements a on a.id = ua.achievement_id
                   where ua.user_id = x_a and a.code = 'first_step') then
      raise exception 'FALLO check_and_unlock_achievements no revisó todos los grupos';
    end if;
  end if;
  if public.check_and_unlock_achievements(x_b) <> 0 then
    raise exception 'FALLO un piloto desbloqueó logros de otro';
  end if;
  reset role;
  x_log := x_log || ' ponerse_al_dia';

  -- Con todo el grupo ganado no hay nada que desbloquear.
  if private.desbloquear_logros(x_a, 'comunidad') <> 0 then
    raise exception 'FALLO un grupo completo volvió a desbloquear';
  end if;
  begin
    perform private.desbloquear_logros(x_a, 'inventado');
    raise exception 'FALLO aceptó un grupo desconocido';
  exception when invalid_parameter_value then null;
  end;
  if to_regprocedure('public.trigger_check_achievements()') is not null
     or to_regprocedure('public.trigger_check_achievements_pilot()') is not null then
    raise exception 'FALLO siguen las funciones de disparador viejas';
  end if;
  if has_function_privilege('authenticated', 'private.desbloquear_logros(uuid, text)', 'execute') then
    raise exception 'FALLO el cliente ejecuta desbloquear_logros';
  end if;
  x_log := x_log || ' grupo_completo_y_cerrado';

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;

-- ============================================================================
-- Módulo Comunicaciones ATC: progreso, catálogo y permisos.
-- Migración 20260925000000.
--
-- Corre esto con la migración aplicada. Comprueba que la RPC valida contra el
-- catálogo (69 lecciones, ninguna práctica todavía), que repetir no duplica,
-- que cada piloto ve solo lo suyo, que nadie escribe la tabla directo, que
-- anon no tiene nada, y que la migración no tocó los otros módulos.
--
-- No borra filas: el punto de partida se fija con upsert y todo lo escrito se
-- deshace. Termina en PRUEBA_DESHECHA con la lista de lo verificado, o en
-- FALLO. Cómo se corre: supabase/tests/README.md.
-- ============================================================================
do $prueba$
declare
  x_a uuid; x_b uuid; x_n int; x_m int; x_log text := '';
begin
  select id into x_a from auth.users order by created_at limit 1;
  select id into x_b from auth.users order by created_at offset 1 limit 1;
  if x_a is null or x_b is null then raise exception 'FALLO hacen falta dos usuarios'; end if;

  -- ── Catálogo y umbral ─────────────────────────────────────────────────────
  select lecciones, cardinality(practicas) into x_n, x_m
  from public.modulos_contenido where modulo = 'comunicaciones';
  if x_n is null then raise exception 'FALLO no hay catálogo de comunicaciones'; end if;
  if x_n <> 69 or x_m <> 0 then raise exception 'FALLO catalogo comunicaciones % %', x_n, x_m; end if;
  x_log := x_log || ' catalogo_69_y_0';

  if (select total from public.module_thresholds where code = 'comunicaciones_lesson') is distinct from 69 then
    raise exception 'FALLO el umbral de lección no es 69';
  end if;
  x_log := x_log || ' umbral';

  -- ── Permisos: lectura para authenticated, nada para anon, RLS encendida ──
  if not (select relrowsecurity from pg_class where oid = 'public.user_comunicaciones_progress'::regclass) then
    raise exception 'FALLO la tabla no tiene RLS';
  end if;
  if has_table_privilege('anon', 'public.user_comunicaciones_progress', 'select')
     or has_table_privilege('authenticated', 'public.user_comunicaciones_progress', 'insert')
     or has_table_privilege('authenticated', 'public.user_comunicaciones_progress', 'update')
     or has_table_privilege('authenticated', 'public.user_comunicaciones_progress', 'delete')
     or not has_table_privilege('authenticated', 'public.user_comunicaciones_progress', 'select') then
    raise exception 'FALLO permisos de la tabla';
  end if;
  if has_function_privilege('anon', 'public.comunicaciones_mark_progress(smallint, text)', 'execute')
     or not has_function_privilege('authenticated', 'public.comunicaciones_mark_progress(smallint, text)', 'execute') then
    raise exception 'FALLO permisos de la RPC';
  end if;
  select count(*) into x_n from pg_proc p
  where p.oid = 'public.comunicaciones_mark_progress(smallint, text)'::regprocedure
    and p.prosecdef and p.proconfig @> array['search_path=""'];
  if x_n <> 1 then raise exception 'FALLO la RPC no es security definer con search_path vacío'; end if;
  x_log := x_log || ' permisos';

  -- ── Punto de partida conocido, sin borrar ────────────────────────────────
  insert into public.user_comunicaciones_progress (user_id, lesson_screens, practice_done)
  values (x_a, '{}', '{}')
  on conflict (user_id) do update set lesson_screens = '{}', practice_done = '{}';
  insert into public.user_comunicaciones_progress (user_id, lesson_screens, practice_done)
  values (x_b, '{1,2,3}', '{}')
  on conflict (user_id) do update set lesson_screens = '{1,2,3}', practice_done = '{}';

  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;

  -- ── Marcar progreso: solo lo que existe en el catálogo ────────────────────
  perform public.comunicaciones_mark_progress(1::smallint, null);
  perform public.comunicaciones_mark_progress(69::smallint, null);
  -- Repetir no duplica.
  perform public.comunicaciones_mark_progress(1::smallint, null);

  begin
    perform public.comunicaciones_mark_progress(70::smallint, null);
    raise exception 'FALLO leccion 70 aceptada';
  exception when invalid_parameter_value then x_log := x_log || ' leccion_fuera';
  end;
  begin
    perform public.comunicaciones_mark_progress(0::smallint, null);
    raise exception 'FALLO leccion 0 aceptada';
  exception when invalid_parameter_value then x_log := x_log || ' leccion_cero';
  end;
  -- Sin práctica en el catálogo, ninguna clave entra; tampoco una de otro módulo.
  begin
    perform public.comunicaciones_mark_progress(null, 'cm-pra-01');
    raise exception 'FALLO practica inventada aceptada';
  exception when invalid_parameter_value then x_log := x_log || ' practica_inventada';
  end;
  begin
    perform public.comunicaciones_mark_progress(null, 'ap-rec-r01');
    raise exception 'FALLO clave de aeropuertos aceptada';
  exception when invalid_parameter_value then x_log := x_log || ' clave_ajena';
  end;

  select array_length(lesson_screens, 1), coalesce(array_length(practice_done, 1), 0)
  into x_n, x_m from public.user_comunicaciones_progress where user_id = x_a;
  if x_n <> 2 or x_m <> 0 then raise exception 'FALLO progreso de A: % lecciones, % practicas', x_n, x_m; end if;
  x_log := x_log || ' rpc_idempotente';

  -- ── RLS: cada uno ve lo suyo, y nadie escribe directo ────────────────────
  select count(*) into x_n from public.user_comunicaciones_progress where user_id <> x_a;
  if x_n <> 0 then raise exception 'FALLO A ve % filas de progreso ajenas', x_n; end if;
  select count(*) into x_n from public.user_comunicaciones_progress where user_id = x_a;
  if x_n <> 1 then raise exception 'FALLO A no ve su progreso'; end if;
  x_log := x_log || ' rls_progreso';

  begin
    update public.user_comunicaciones_progress
    set lesson_screens = (select array_agg(i::smallint) from generate_series(1, 69) i)
    where user_id = x_a;
    raise exception 'FALLO update directo aceptado';
  exception when insufficient_privilege then x_log := x_log || ' sin_update_directo';
  end;
  begin
    insert into public.user_comunicaciones_progress (user_id, lesson_screens)
    values (x_b, '{1}');
    raise exception 'FALLO insert directo aceptado';
  exception when insufficient_privilege then x_log := x_log || ' sin_insert_directo';
  end;

  reset role;

  -- Sin sesión, la RPC no escribe.
  perform set_config('request.jwt.claims', '', true);
  begin
    perform public.comunicaciones_mark_progress(2::smallint, null);
    raise exception 'FALLO marca sin sesión aceptada';
  exception when others then
    if sqlerrm <> 'no authenticated user' then raise; end if;
    x_log := x_log || ' sin_sesion';
  end;

  -- ── Los otros módulos siguen en su catálogo ──────────────────────────────
  select count(*) into x_n from public.modulos_contenido
  where modulo in ('notam', 'metar', 'mercancias', 'aerodinamica');
  if x_n <> 4 then raise exception 'FALLO un módulo viejo perdió su catálogo: %', x_n; end if;
  x_log := x_log || ' modulos_viejos';

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;

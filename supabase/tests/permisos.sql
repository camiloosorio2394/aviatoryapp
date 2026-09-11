-- ============================================================================
-- Permisos: las reglas que valen para toda la base.
--
-- Solo lee. Termina en PRUEBA_DESHECHA con la lista de lo verificado, o en
-- FALLO con lo que no cumple. Cómo se corre: supabase/tests/README.md.
-- ============================================================================
do $prueba$
declare
  x_lista text;
  x_log text := '';
begin
  -- Toda tabla de public tiene RLS.
  select string_agg(c.relname, ', ' order by c.relname) into x_lista
  from pg_class c join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and c.relkind in ('r', 'p') and not c.relrowsecurity;
  if x_lista is not null then raise exception 'FALLO tablas sin RLS: %', x_lista; end if;
  x_log := x_log || ' rls';

  -- anon no tiene permisos sobre tablas, vistas ni secuencias de public, ni
  -- sobre columnas sueltas.
  select string_agg(distinct c.relname, ', ') into x_lista
  from pg_class c join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and c.relkind in ('r', 'p', 'v', 'm', 'S')
    and (
      exists (select 1 from aclexplode(c.relacl) a where a.grantee = 'anon'::regrole)
      or exists (
        select 1 from pg_attribute t, aclexplode(t.attacl) a
        where t.attrelid = c.oid and a.grantee = 'anon'::regrole
      )
    );
  if x_lista is not null then raise exception 'FALLO anon con permisos en: %', x_lista; end if;
  x_log := x_log || ' anon_sin_tablas';

  -- anon ejecuta en public una sola función: la que usa el registro.
  select string_agg(p.proname, ', ' order by p.proname) into x_lista
  from pg_proc p join pg_namespace n on n.oid = p.pronamespace
  where n.nspname = 'public' and has_function_privilege('anon', p.oid, 'execute')
    and p.proname <> 'check_username_available';
  if x_lista is not null then raise exception 'FALLO anon ejecuta: %', x_lista; end if;
  x_log := x_log || ' anon_una_funcion';

  -- El esquema private no se ve desde el cliente.
  if has_schema_privilege('anon', 'private', 'usage') or has_schema_privilege('authenticated', 'private', 'usage') then
    raise exception 'FALLO el cliente usa el esquema private';
  end if;
  x_log := x_log || ' private_cerrado';

  -- Toda función security definer fija su search_path.
  select string_agg(n.nspname || '.' || p.proname, ', ' order by p.proname) into x_lista
  from pg_proc p join pg_namespace n on n.oid = p.pronamespace
  where n.nspname in ('public', 'private') and p.prosecdef
    and not exists (select 1 from unnest(coalesce(p.proconfig, '{}')) cfg where cfg like 'search_path=%');
  if x_lista is not null then raise exception 'FALLO security definer sin search_path: %', x_lista; end if;
  x_log := x_log || ' definer_con_search_path';

  -- Lo nuevo nace cerrado: lo que crea postgres en public no trae permisos
  -- para anon ni authenticated, y las funciones no las ejecuta PUBLIC.
  select string_agg(d.defaclobjtype::text, ', ') into x_lista
  from pg_default_acl d, aclexplode(d.defaclacl) a
  where d.defaclrole = 'postgres'::regrole
    and d.defaclnamespace in (0, 'public'::regnamespace)
    and a.grantee in ('anon'::regrole, 'authenticated'::regrole);
  if x_lista is not null then raise exception 'FALLO permisos por defecto abiertos (tipos %)', x_lista; end if;
  if not exists (
    select 1 from pg_default_acl d
    where d.defaclrole = 'postgres'::regrole and d.defaclnamespace = 0 and d.defaclobjtype = 'f'
      and not exists (select 1 from aclexplode(d.defaclacl) a where a.grantee = 0)
  ) then
    raise exception 'FALLO las funciones nuevas las ejecuta PUBLIC';
  end if;
  x_log := x_log || ' nada_nace_abierto';

  -- Las vistas de public respetan el RLS de quien consulta.
  select string_agg(c.relname, ', ') into x_lista
  from pg_class c join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and c.relkind in ('v', 'm')
    and not coalesce('security_invoker=true' = any (c.reloptions), false);
  if x_lista is not null then raise exception 'FALLO vistas sin security_invoker: %', x_lista; end if;
  x_log := x_log || ' vistas_invoker';

  -- Lo que corrige no lo lee el cliente.
  select string_agg(format('%s.%s', t, col), ', ') into x_lista
  from (values
    ('banco_preguntas', 'correcta'), ('banco_preguntas', 'explicacion'), ('banco_preguntas', 'referencia'),
    ('evaluacion_sesiones', 'respuestas'), ('evaluacion_sesiones', 'orden_opciones'),
    ('psico_sesiones', 'respuestas'),
    ('icao_quiz_questions', 'correct_answer'), ('icao_quiz_questions', 'explanation'),
    ('vault_questions', 'correct_answer_enc'),
    ('answer_options', 'is_correct'),
    ('user_notam_exam_attempts', 'answers'),
    ('modulos_contenido', 'practicas')
  ) as v(t, col)
  where has_column_privilege('authenticated', format('public.%I', t), col, 'select');
  if x_lista is not null then raise exception 'FALLO el cliente lee: %', x_lista; end if;
  x_log := x_log || ' correcciones_ocultas';

  -- Lo que la app no usa no queda abierto (migración 20260911212138).
  -- Si una pantalla lo necesita, la migración que la trae devuelve el permiso y
  -- lo saca de esta lista.
  select string_agg(f, ', ') into x_lista
  from unnest(array[
    'public.get_daily_quiz()', 'public.get_peers_in_stage(integer)', 'public.get_subject_mastery()',
    'public.ai_usage_this_month()', 'public.get_activity_heatmap()', 'public.get_pilot_cv(text)',
    'public.recalc_pilot_hours(uuid)', 'public.unread_notifications_count()'
  ]) as f
  where has_function_privilege('authenticated', f, 'execute');
  if x_lista is null then
    select string_agg(t, ', ') into x_lista
    from unnest(array['public.user_pca_readiness', 'public.daily_activity']) as t
    where has_table_privilege('authenticated', t, 'select');
  end if;
  if x_lista is not null then raise exception 'FALLO el cliente conserva acceso sin uso: %', x_lista; end if;
  x_log := x_log || ' sin_uso_cerrado';

  -- El cliente escribe solo en estas tablas: lo que el piloto declara o publica.
  -- Puntajes, intentos, progreso, logros y rachas van por funciones. Una tabla
  -- nueva que el cliente escriba entra a esta lista con su razón.
  select string_agg(c.relname, ', ' order by c.relname) into x_lista
  from pg_class c join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and c.relkind in ('r', 'p', 'v')
    and (
      has_any_column_privilege('authenticated', c.oid, 'insert')
      or has_any_column_privilege('authenticated', c.oid, 'update')
      or has_table_privilege('authenticated', c.oid, 'delete')
    )
    and c.relname not in (
      'ai_interactions',        -- solo feedback y feedback_at de respuestas del asistente
      'checklist_progress',     -- casillas propias
      'community_messages',     -- con tope por disparador
      'community_reactions',    -- con tope por disparador
      'content_reports',        -- con tope por disparador
      'exam_report_topics',     -- temas de un reporte propio
      'exam_reports',           -- con tope por disparador
      'flights',                -- bitácora que el piloto declara
      'licenses_held',          -- licencias que el piloto declara
      'pilot_state',            -- horas y metas que el piloto declara
      'profiles',               -- nombre, país, usuario, foto, CV público
      'user_achievements',      -- solo la marca «visto»
      'user_icao_mock_results', -- autoevaluación del simulacro ICAO
      'user_icao_speaking'      -- grabaciones de práctica propias
    );
  if x_lista is not null then raise exception 'FALLO el cliente escribe en: %', x_lista; end if;
  x_log := x_log || ' escrituras_acotadas';

  -- De profiles y user_achievements, solo esas columnas.
  if has_column_privilege('authenticated', 'public.user_achievements', 'unlocked_at', 'update')
     or has_column_privilege('authenticated', 'public.user_achievements', 'achievement_id', 'update')
     or has_column_privilege('authenticated', 'public.profiles', 'id', 'update') then
    raise exception 'FALLO columnas de logros o perfil editables';
  end if;
  x_log := x_log || ' columnas_acotadas';

  -- Archivos: los buckets limitan tamaño y tipo en el servidor, y cada piloto
  -- escribe solo en su carpeta de avatars.
  select string_agg(id, ', ') into x_lista
  from storage.buckets where file_size_limit is null or allowed_mime_types is null;
  if x_lista is not null then raise exception 'FALLO buckets sin límite de tamaño o tipo: %', x_lista; end if;
  select string_agg(policyname, ', ') into x_lista
  from pg_policies
  where schemaname = 'storage' and tablename = 'objects'
    and 'authenticated' = any (roles) and cmd in ('INSERT', 'UPDATE', 'DELETE')
    and coalesce(with_check, qual) not like '%auth.uid()%';
  if x_lista is not null then raise exception 'FALLO escritura de archivos sin dueño: %', x_lista; end if;
  x_log := x_log || ' archivos_con_limite';

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;

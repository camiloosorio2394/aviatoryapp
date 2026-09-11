-- ============================================================================
-- Comunidad y reportes: tope por piloto, fecha del servidor y columnas que el
-- cliente puede mandar. Migración 20260911193818.
--
-- Escribe filas de prueba y las deshace: termina en PRUEBA_DESHECHA con la
-- lista de lo verificado, o en FALLO. Cómo se corre: supabase/tests/README.md.
-- ============================================================================
do $prueba$
declare
  x_a uuid;
  x_canal bigint;
  x_materia bigint;
  x_doc bigint;
  x_vistas int;
  x_fecha timestamptz;
  x_i int;
  x_log text := '';
begin
  select id into x_a from auth.users order by created_at limit 1;
  select id into x_canal from public.community_channels order by id limit 1;
  select id into x_materia from public.subjects order by id limit 1;
  select id into x_doc from public.library_items where is_published order by id limit 1;

  -- Punto de partida conocido (dentro de la transacción).
  delete from public.community_messages where user_id = x_a and created_at > now() - interval '10 minutes';
  delete from public.exam_reports where user_id = x_a and created_at > now() - interval '1 day';

  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;

  -- Mensajes: 30 cada 10 minutos; el 31 no entra.
  for x_i in 1..30 loop
    insert into public.community_messages (channel_id, user_id, content) values (x_canal, x_a, 'prueba ' || x_i);
  end loop;
  begin
    insert into public.community_messages (channel_id, user_id, content) values (x_canal, x_a, 'prueba 31');
    raise exception 'FALLO el mensaje 31 entró';
  exception when others then if sqlerrm <> 'demasiadas_publicaciones' then raise; end if;
  end;
  x_log := x_log || ' mensajes_30';

  -- La fecha no la manda el cliente.
  begin
    insert into public.community_messages (channel_id, user_id, content, created_at)
    values (x_canal, x_a, 'del futuro', now() + interval '1 year');
    raise exception 'FALLO el cliente fijó created_at';
  exception when insufficient_privilege then x_log := x_log || ' fecha_no_editable';
  end;

  -- Reportes de examen: 5 por día, sin editar ni borrar.
  for x_i in 1..5 loop
    insert into public.exam_reports (user_id, subject_id, exam_date, passed) values (x_a, x_materia, current_date, true);
  end loop;
  begin
    insert into public.exam_reports (user_id, subject_id, exam_date, passed) values (x_a, x_materia, current_date, true);
    raise exception 'FALLO el reporte 6 entró';
  exception when others then if sqlerrm <> 'demasiadas_publicaciones' then raise; end if;
  end;
  begin
    update public.exam_reports set passed = false where user_id = x_a;
    raise exception 'FALLO reporte editable';
  exception when insufficient_privilege then null;
  end;
  begin
    delete from public.exam_reports where user_id = x_a;
    raise exception 'FALLO reporte borrable';
  exception when insufficient_privilege then null;
  end;
  x_log := x_log || ' reportes_5_sin_editar';

  -- Biblioteca: abrir el mismo documento dos veces el mismo día suma una visita.
  reset role;
  delete from public.user_library_views where user_id = x_a and item_id = x_doc;
  select views_count into x_vistas from public.library_items where id = x_doc;
  set local role authenticated;
  perform public.bump_library_item_views(x_doc);
  perform public.bump_library_item_views(x_doc);
  reset role;
  if (select views_count from public.library_items where id = x_doc) <> coalesce(x_vistas, 0) + 1 then
    raise exception 'FALLO la biblioteca sumó más de una visita';
  end if;
  select viewed_at into x_fecha from public.user_library_views where user_id = x_a and item_id = x_doc;
  if x_fecha is null then raise exception 'FALLO no guardó la apertura'; end if;
  x_log := x_log || ' visita_una_al_dia';

  -- Sin sesión de piloto (service role, tareas del servidor) no hay tope, pero
  -- la fecha igual la pone el servidor.
  perform set_config('request.jwt.claims', '', true);
  insert into public.community_messages (channel_id, user_id, content, created_at)
  values (x_canal, x_a, 'servidor', now() + interval '1 year')
  returning created_at into x_fecha;
  if x_fecha > now() + interval '1 minute' then raise exception 'FALLO created_at futuro aceptado'; end if;
  x_log := x_log || ' fecha_del_servidor';

  -- Reacciones y reportes de contenido usan el mismo disparador con su tope.
  if not exists (select 1 from pg_trigger where tgname = 'trg_tope_community_reactions' and encode(tgargs, 'escape') like '120\\00010 minutes%')
     or not exists (select 1 from pg_trigger where tgname = 'trg_tope_content_reports' and encode(tgargs, 'escape') like '20\\0001 day%') then
    raise exception 'FALLO disparadores de tope de reacciones o reportes de contenido';
  end if;
  x_log := x_log || ' topes_reacciones_y_contenido';

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;

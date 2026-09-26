-- ============================================================================
-- Topes que no se esquivan borrando, y restricciones de tamaño y forma.
-- Migración 20261002010000.
--
-- Comprueba que:
--   · publicar 30 mensajes, borrarlos y publicar otro sigue topado (antes el
--     borrado devolvía el cupo);
--   · el registro de inserciones no lo lee ni lo toca el cliente;
--   · una reacción larga, una evidencia en la carpeta de otro piloto y una foto
--     de perfil de otro sitio se rechazan, y las válidas pasan;
--   · las tablas nuevas tienen su disparador de tope.
--
-- ESCRITA SIN BASE DONDE CORRERLA (26-sep-2026). Escribe y borra dentro de la
-- transacción, que se deshace al final. Termina en PRUEBA_DESHECHA o en FALLO.
-- ============================================================================
do $prueba$
declare
  x_a uuid; x_b uuid; x_canal bigint; x_msg bigint; x_i int; x_n int; x_log text := '';
begin
  select id into x_a from auth.users order by created_at limit 1;
  select id into x_b from auth.users order by created_at offset 1 limit 1;
  select id into x_canal from public.community_channels order by id limit 1;
  if x_a is null or x_b is null or x_canal is null then raise exception 'FALLO hacen falta dos usuarios y un canal'; end if;

  -- ── El registro no es del cliente ─────────────────────────────────────────
  if has_table_privilege('authenticated', 'private.registro_de_inserciones', 'select')
     or has_table_privilege('authenticated', 'private.registro_de_inserciones', 'delete') then
    raise exception 'FALLO el cliente ve o borra el registro de inserciones';
  end if;
  select count(*) into x_n from pg_trigger
  where tgname in ('trg_tope_postulaciones', 'trg_tope_flights', 'trg_tope_licenses_held',
                   'trg_tope_user_icao_speaking', 'trg_tope_user_icao_mock_results', 'trg_tope_verificaciones_horas')
    and not tgisinternal;
  if x_n <> 6 then raise exception 'FALLO faltan disparadores de tope: %', x_n; end if;
  x_log := x_log || ' registro_cerrado_y_topes_nuevos';

  -- ── Borrar no devuelve cupo ───────────────────────────────────────────────
  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;
  for x_i in 1..30 loop
    insert into public.community_messages (channel_id, user_id, content) values (x_canal, x_a, 'prueba ' || x_i);
  end loop;
  delete from public.community_messages where user_id = x_a and content like 'prueba %';
  begin
    insert into public.community_messages (channel_id, user_id, content) values (x_canal, x_a, 'uno más');
    raise exception 'FALLO borrar devolvió el cupo';
  exception when others then
    if sqlerrm <> 'demasiadas_publicaciones' then raise; end if;
    x_log := x_log || ' borrar_no_devuelve_cupo';
  end;

  -- ── Forma de lo que escribe el cliente ────────────────────────────────────
  begin
    update public.profiles set photo_url = 'https://otro-sitio.example/pixel.png' where id = x_a;
    raise exception 'FALLO aceptó una foto de otro sitio';
  exception when check_violation then x_log := x_log || ' foto_ajena_no';
  end;
  update public.profiles
  set photo_url = 'https://x.supabase.co/storage/v1/object/public/avatars/' || x_a::text || '/avatar.png?v=1'
  where id = x_a;
  x_log := x_log || ' foto_propia_si';

  begin
    insert into public.verificaciones_horas (user_id, horas_total, horas_pic, evidencia)
    values (x_a, 10, 5, x_b::text || '/1.pdf');
    raise exception 'FALLO aceptó la evidencia de otro piloto';
  exception when check_violation then x_log := x_log || ' evidencia_ajena_no';
  end;
  reset role;

  -- La reacción (con el tope de mensajes ya lleno, se prueba como B).
  perform set_config('request.jwt.claims', json_build_object('sub', x_b, 'role', 'authenticated')::text, true);
  set local role authenticated;
  insert into public.community_messages (channel_id, user_id, content) values (x_canal, x_b, 'mensaje de B')
  returning id into x_msg;
  begin
    insert into public.community_reactions (message_id, user_id, emoji, channel_id)
    values (x_msg, x_b, repeat('texto largo ', 5), x_canal);
    raise exception 'FALLO aceptó una reacción que no es un emoji';
  exception when check_violation then x_log := x_log || ' reaccion_larga_no';
  end;
  insert into public.community_reactions (message_id, user_id, emoji, channel_id) values (x_msg, x_b, '👍', x_canal);
  x_log := x_log || ' reaccion_valida_si';
  reset role;

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;

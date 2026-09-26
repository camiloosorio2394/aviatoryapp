-- ============================================================================
-- El foro de la comunidad. Migraciones 20261003000000 y 20261003010000.
--
-- Comprueba que:
--   · el cliente no toca las tablas, y anon solo ejecuta las lecturas;
--   · publicar nace con el voto del autor y gana «Hola comunidad»;
--   · votar mueve los puntos por diferencia (bajar, cambiar, quitar);
--   · comentar suma al contador, avisa al autor una sola vez y la respuesta a
--     una respuesta cuelga del comentario raíz;
--   · un aviso pide aerolínea, no lo confirma su autor, y confirmar o
--     desmentir mueve sus cuentas;
--   · reportar cuenta una vez por piloto;
--   · sin sesión se lee el feed y la publicación, sin ids de usuario ni el
--     autor de lo anónimo; la segunda página pide entrar; de los comentarios
--     se ven tres; y no se puede publicar;
--   · borrar saca la publicación del feed y de su página;
--   · el tope de 10 publicaciones al día.
--
-- Escribe dentro de la transacción, que se deshace al final. Termina en
-- PRUEBA_DESHECHA o en FALLO. Corrida el 26-sep-2026 con PGlite (Postgres 18)
-- sobre un esqueleto de la base; falta correrla contra la base ya migrada.
-- ============================================================================
do $prueba$
declare
  x_a uuid;
  x_b uuid;
  x_aero bigint;
  x_pub bigint;
  x_anon bigint;
  x_aviso bigint;
  x_c1 jsonb;
  x_c2 jsonb;
  x_c3 jsonb;
  x_j jsonb;
  x_n integer;
  x_i integer;
  x_log text := '';
begin
  select id into x_a from auth.users order by created_at limit 1;
  select id into x_b from auth.users order by created_at offset 1 limit 1;
  select id into x_aero from public.airlines order by id limit 1;
  if x_a is null or x_b is null or x_aero is null then
    raise exception 'FALLO hacen falta dos usuarios y una aerolínea';
  end if;

  -- ── Permisos ──────────────────────────────────────────────────────────────
  if has_table_privilege('authenticated', 'public.foro_publicaciones', 'select')
     or has_table_privilege('anon', 'public.foro_publicaciones', 'select')
     or has_table_privilege('authenticated', 'public.foro_votos', 'insert')
     or has_table_privilege('authenticated', 'public.foro_reportes', 'select') then
    raise exception 'FALLO el cliente toca las tablas del foro';
  end if;
  if not has_function_privilege('anon', 'public.foro_feed(text, text, bigint, integer)', 'execute')
     or not has_function_privilege('anon', 'public.foro_publicacion(bigint)', 'execute')
     or has_function_privilege('anon', 'public.foro_publicar(text, text, text, bigint, text, boolean)', 'execute')
     or has_function_privilege('anon', 'public.foro_votar(bigint, integer)', 'execute') then
    raise exception 'FALLO los permisos de anon en el foro';
  end if;
  x_log := x_log || ' tablas_cerradas';

  -- ── A publica ─────────────────────────────────────────────────────────────
  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;
  x_pub := public.foro_publicar('entrevistas', 'Así fue mi entrevista de prueba', 'Primero el simulador, después la técnica.');
  x_j := public.foro_publicacion(x_pub);
  if (x_j #>> '{publicacion,puntos}')::int <> 1 or (x_j #>> '{publicacion,mi_voto}')::int <> 1
     or not (x_j #>> '{publicacion,es_mia}')::boolean then
    raise exception 'FALLO la publicación no nace con el voto del autor: %', x_j -> 'publicacion';
  end if;
  begin
    perform public.foro_publicar('avisos', 'Abrió la convocatoria de prueba', '', null);
    raise exception 'FALLO aceptó un aviso sin aerolínea';
  exception when others then
    if sqlerrm <> 'aviso_sin_aerolinea' then raise; end if;
  end;
  begin
    perform public.foro_publicar('entrevistas', 'corto');
    raise exception 'FALLO aceptó un título de cinco letras';
  exception when others then
    if sqlerrm <> 'titulo_invalido' then raise; end if;
  end;
  x_aviso := public.foro_publicar('avisos', 'Abrió la convocatoria de prueba', '', x_aero, 'Bogotá');
  begin
    perform public.foro_confirmar(x_aviso, true);
    raise exception 'FALLO el autor confirmó su propio aviso';
  exception when others then
    if sqlerrm <> 'aviso_propio' then raise; end if;
  end;
  reset role;
  if not exists (
    select 1 from public.user_achievements ua join public.achievements a on a.id = ua.achievement_id
    where ua.user_id = x_a and a.code = 'community_hello'
  ) then
    raise exception 'FALLO publicar no dio «Hola comunidad»';
  end if;
  x_log := x_log || ' publicar';

  -- ── B publica anónimo, vota, comenta, confirma y reporta ─────────────────
  perform set_config('request.jwt.claims', json_build_object('sub', x_b, 'role', 'authenticated')::text, true);
  set local role authenticated;
  x_anon := public.foro_publicar('preguntas', 'Pregunta anónima de prueba', 'Sin mi nombre, por favor.', null, null, true);

  x_j := public.foro_votar(x_pub, -1);
  if (x_j ->> 'puntos')::int <> 0 then raise exception 'FALLO votar abajo: %', x_j; end if;
  x_j := public.foro_votar(x_pub, 1);
  if (x_j ->> 'puntos')::int <> 2 then raise exception 'FALLO cambiar el voto: %', x_j; end if;
  x_j := public.foro_votar(x_pub, 0);
  if (x_j ->> 'puntos')::int <> 1 then raise exception 'FALLO quitar el voto: %', x_j; end if;
  x_log := x_log || ' votar';

  x_c1 := public.foro_comentar(x_pub, 'Gracias por contarlo.');
  x_c2 := public.foro_comentar(x_pub, 'Una respuesta.', (x_c1 ->> 'id')::bigint);
  x_c3 := public.foro_comentar(x_pub, 'La respuesta a la respuesta.', (x_c2 ->> 'id')::bigint);
  if (x_c3 ->> 'padre_id')::bigint <> (x_c1 ->> 'id')::bigint then
    raise exception 'FALLO la respuesta a una respuesta no cuelga del raíz: %', x_c3;
  end if;
  perform public.foro_comentar(x_pub, 'Otro comentario.');
  perform public.foro_comentar(x_pub, 'Y otro más.');

  begin
    perform public.foro_confirmar(x_pub, true);
    raise exception 'FALLO confirmó algo que no es un aviso';
  exception when others then
    if sqlerrm <> 'no_es_aviso' then raise; end if;
  end;
  x_j := public.foro_confirmar(x_aviso, true);
  if (x_j ->> 'confirmaciones')::int <> 1 or not (x_j ->> 'vigente')::boolean then
    raise exception 'FALLO confirmar el aviso: %', x_j;
  end if;
  x_j := public.foro_confirmar(x_aviso, false);
  if (x_j ->> 'confirmaciones')::int <> 0 or (x_j ->> 'desmentidos')::int <> 1 then
    raise exception 'FALLO pasar de «sigue» a «ya no»: %', x_j;
  end if;

  if not public.foro_reportar(x_pub, null, 'spam') then raise exception 'FALLO el reporte no contó'; end if;
  if public.foro_reportar(x_pub, null, 'spam') then raise exception 'FALLO el mismo piloto reportó dos veces'; end if;
  reset role;

  select count(*) into x_n from public.notifications where user_id = x_a and type = 'foro_respuesta';
  if x_n <> 1 then
    raise exception 'FALLO avisos al autor: % (esperaba uno, sin repetir mientras no lo lea)', x_n;
  end if;
  select comentarios, reportes into x_n, x_i from public.foro_publicaciones where id = x_pub;
  if x_n <> 5 or x_i <> 1 then
    raise exception 'FALLO los contadores: % comentarios y % reportes', x_n, x_i;
  end if;
  x_log := x_log || ' comentar_confirmar_reportar';

  -- ── Sin sesión ────────────────────────────────────────────────────────────
  perform set_config('request.jwt.claims', json_build_object('role', 'anon')::text, true);
  set local role anon;
  x_j := public.foro_feed();
  if jsonb_array_length(x_j -> 'publicaciones') < 3 then
    raise exception 'FALLO sin sesión no se ve el feed: %', x_j;
  end if;
  if position(x_a::text in x_j::text) > 0 or position(x_b::text in x_j::text) > 0 then
    raise exception 'FALLO el feed público lleva un id de usuario';
  end if;
  if exists (
    select 1 from jsonb_array_elements(x_j -> 'publicaciones') e
    where (e ->> 'id')::bigint = x_anon and jsonb_typeof(e -> 'autor') <> 'null'
  ) then
    raise exception 'FALLO la publicación anónima muestra a su autor';
  end if;
  x_j := public.foro_feed(null, 'nuevo', null, 1);
  if not (x_j ->> 'requiere_sesion')::boolean or jsonb_array_length(x_j -> 'publicaciones') <> 0 then
    raise exception 'FALLO la segunda página no pide entrar: %', x_j;
  end if;
  x_j := public.foro_publicacion(x_pub);
  if jsonb_array_length(x_j -> 'comentarios') <> 3 or (x_j ->> 'total_comentarios')::int <> 5 then
    raise exception 'FALLO sin sesión debían verse 3 de 5 comentarios: %', x_j -> 'comentarios';
  end if;
  begin
    perform public.foro_publicar('preguntas', 'Publicación sin sesión');
    raise exception 'FALLO publicó sin sesión';
  exception when insufficient_privilege then
    x_log := x_log || ' sin_sesion_solo_lee';
  end;
  reset role;

  -- ── A borra y llega al tope ───────────────────────────────────────────────
  perform set_config('request.jwt.claims', json_build_object('sub', x_a, 'role', 'authenticated')::text, true);
  set local role authenticated;
  perform public.foro_borrar(x_pub);
  if public.foro_publicacion(x_pub) is not null then
    raise exception 'FALLO la publicación borrada se sigue viendo';
  end if;
  if exists (
    select 1 from jsonb_array_elements(public.foro_feed(null, 'nuevo') -> 'publicaciones') e
    where (e ->> 'id')::bigint = x_pub
  ) then
    raise exception 'FALLO la publicación borrada sigue en el feed';
  end if;
  x_log := x_log || ' borrar';

  -- Hoy ya lleva dos: ocho más llegan a diez, y la siguiente no pasa.
  for x_i in 1..8 loop
    perform public.foro_publicar('preguntas', 'Pregunta de prueba número ' || x_i);
  end loop;
  begin
    perform public.foro_publicar('preguntas', 'Una más de la cuenta');
    raise exception 'FALLO pasó el tope de publicaciones';
  exception when others then
    if sqlerrm <> 'demasiadas_publicaciones' then raise; end if;
    x_log := x_log || ' tope';
  end;
  reset role;

  raise exception 'PRUEBA_DESHECHA%', x_log;
end
$prueba$;

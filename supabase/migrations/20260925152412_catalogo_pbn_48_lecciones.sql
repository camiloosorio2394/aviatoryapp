-- ============================================================================
-- PBN queda en 48 capítulos: el catálogo que valida el progreso.
--
-- El módulo se reestructuró (cinco fusiones de capítulos redundantes y un
-- capítulo nuevo sobre cómo se vuela a una MDA), así que pasa de 52 lecciones y
-- 156 claves de práctica a 48 y 144. `pbn_mark_progress` valida contra esta
-- fila: sin actualizarla rechazaría las claves nuevas y seguiría aceptando las
-- de los capítulos que ya no existen.
--
-- Lo generó `node scripts/catalogo/sembrar.mjs` desde
-- contenido/catalogo/modulos.json, que a su vez sale de src/lib/pbnPractica.ts.
-- No se escribe a mano.
--
-- Se aplicó cuando `user_pbn_progress` estaba vacía (0 filas, 0 intentos, 0
-- sesiones): nadie tenía progreso que pudiera quedar apuntando a otro capítulo.
-- ============================================================================
insert into public.modulos_contenido (modulo, lecciones, practicas) values
('pbn', 48, array['p01-q1', 'p01-q2', 'p01-q3', 'p02-q1', 'p02-q2', 'p02-q3', 'p03-q1', 'p03-q2', 'p03-q3', 'p04-q1', 'p04-q2', 'p04-q3', 'p05-q1', 'p05-q2', 'p05-q3', 'p06-q1', 'p06-q2', 'p06-q3', 'p07-q1', 'p07-q2', 'p07-q3', 'p08-q1', 'p08-q2', 'p08-q3', 'p09-q1', 'p09-q2', 'p09-q3', 'p10-q1', 'p10-q2', 'p10-q3', 'p11-q1', 'p11-q2', 'p11-q3', 'p12-q1', 'p12-q2', 'p12-q3', 'p13-q1', 'p13-q2', 'p13-q3', 'p14-q1', 'p14-q2', 'p14-q3', 'p15-q1', 'p15-q2', 'p15-q3', 'p16-q1', 'p16-q2', 'p16-q3', 'p17-q1', 'p17-q2', 'p17-q3', 'p18-q1', 'p18-q2', 'p18-q3', 'p19-q1', 'p19-q2', 'p19-q3', 'p20-q1', 'p20-q2', 'p20-q3', 'p21-q1', 'p21-q2', 'p21-q3', 'p22-q1', 'p22-q2', 'p22-q3', 'p23-q1', 'p23-q2', 'p23-q3', 'p24-q1', 'p24-q2', 'p24-q3', 'p25-q1', 'p25-q2', 'p25-q3', 'p26-q1', 'p26-q2', 'p26-q3', 'p27-q1', 'p27-q2', 'p27-q3', 'p28-q1', 'p28-q2', 'p28-q3', 'p29-q1', 'p29-q2', 'p29-q3', 'p30-q1', 'p30-q2', 'p30-q3', 'p31-q1', 'p31-q2', 'p31-q3', 'p32-q1', 'p32-q2', 'p32-q3', 'p33-q1', 'p33-q2', 'p33-q3', 'p34-q1', 'p34-q2', 'p34-q3', 'p35-q1', 'p35-q2', 'p35-q3', 'p36-q1', 'p36-q2', 'p36-q3', 'p37-q1', 'p37-q2', 'p37-q3', 'p38-q1', 'p38-q2', 'p38-q3', 'p39-q1', 'p39-q2', 'p39-q3', 'p40-q1', 'p40-q2', 'p40-q3', 'p41-q1', 'p41-q2', 'p41-q3', 'p42-q1', 'p42-q2', 'p42-q3', 'p43-q1', 'p43-q2', 'p43-q3', 'p44-q1', 'p44-q2', 'p44-q3', 'p45-q1', 'p45-q2', 'p45-q3', 'p46-q1', 'p46-q2', 'p46-q3', 'p47-q1', 'p47-q2', 'p47-q3', 'p48-q1', 'p48-q2', 'p48-q3']::text[])
on conflict (modulo) do update set
  lecciones = excluded.lecciones,
  practicas = excluded.practicas,
  actualizado_en = now();

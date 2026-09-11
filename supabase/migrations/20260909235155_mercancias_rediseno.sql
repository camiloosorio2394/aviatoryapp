-- ============================================================================
-- Módulo Mercancías peligrosas, rediseño del 9 de septiembre de 2026
--
-- El módulo pasó de 9 secciones en un lector propio a 18 lecciones en el
-- lector genérico, con una práctica de 49 ejercicios (etiquetas, casos,
-- escenarios y entrevista) y una evaluación de 25 preguntas al azar de un
-- banco de 60. Los umbrales de los logros viven en module_thresholds a
-- propósito (ver 20260802010000_modulo_mercancias.sql): aquí se actualizan
-- para que «Mercancías leído» no se otorgue a la lección 9 de 18.
--
-- Las tablas y la RPC no cambian: lesson_screens sigue guardando números de
-- lección (ahora 1 a 18) y practice_done las claves de la práctica (etq-*,
-- c*, esc-*, ent-*). Los números 0 a 8 guardados por el lector anterior se
-- descartan al leer en la app; no se migran.
-- ============================================================================

update public.module_thresholds set total = 18, nota = 'MP_LECTURA_TOTAL de src/lib/mercancias.ts (18 lecciones en 5 niveles)'
  where code = 'mercancias_lesson';
update public.module_thresholds set total = 49, nota = 'PRACTICA_TOTAL de src/lib/mercanciasPractica.ts (4 etiquetas + 10 casos + 10 escenarios + 25 entrevista)'
  where code = 'mercancias_practice';
update public.module_thresholds set total = 80, nota = 'MP_PASS_SCORE: 25 preguntas al azar de 60, apruebas con 80'
  where code = 'mercancias_pass';

update public.achievements set
  description = 'Leíste las dieciocho lecciones del módulo de mercancías peligrosas'
  where code = 'mercancias_lesson';
update public.achievements set
  name = 'Mercancías practicadas',
  description = 'Resolviste los 49 ejercicios de la práctica: etiquetas, clasificación, escenarios y entrevista'
  where code = 'mercancias_practice';
update public.achievements set
  name = 'Evaluación superada',
  description = 'Aprobaste la evaluación de mercancías peligrosas'
  where code = 'mercancias_exam';
update public.achievements set
  description = 'Terminaste el módulo entero: lección, práctica y evaluación'
  where code = 'mercancias_master';

comment on column public.user_mercancias_progress.lesson_screens is
  'Números de lección leída, 1 a 18 (rediseño de septiembre de 2026). Los 0 a 8 del lector anterior se ignoran en la app.';
comment on column public.user_mercancias_progress.practice_done is
  'Claves de la práctica resueltas: etq-<id>, c<n>, esc-<id>, ent-<n>.';

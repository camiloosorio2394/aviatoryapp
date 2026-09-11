-- ============================================================================
-- Meteorología: el módulo incorpora el TAF
--
-- La lección pasa de 9 a 13 secciones: a las nueve de METAR se suman cuatro de
-- TAF (qué es, los grupos de cambio, leer uno completo, y cómo decide tu
-- alterno). El umbral vive en module_thresholds a propósito, igual que los de
-- NOTAM y Mercancías, para que el logro no dependa de un número escrito a mano
-- dentro de una función.
--
-- Sin esta migración, «METAR leído» se otorgaría al llegar a la lección 9 de
-- 13, que es justo donde ahora empieza lo nuevo.
--
-- Las tablas y la RPC no cambian: lesson_screens sigue guardando números de
-- lección y los del 1 al 9 conservan su significado, así que el progreso ya
-- registrado por los alumnos sigue siendo válido y no se migra nada.
-- ============================================================================

update public.module_thresholds
  set total = 13,
      nota = 'METAR_LESSON_TOTAL de src/lib/metarLesson.ts (9 de METAR + 4 de TAF)'
  where code = 'metar_lesson';

update public.achievements
  set name = 'Meteorología leída',
      description = 'Leíste las trece lecciones del módulo: el METAR grupo por grupo y el TAF completo'
  where code = 'metar_lesson';

comment on column public.user_metar_progress.lesson_screens is
  'Números de lección leída, 1 a 13. Del 1 al 9, METAR; del 10 al 13, TAF (septiembre de 2026).';

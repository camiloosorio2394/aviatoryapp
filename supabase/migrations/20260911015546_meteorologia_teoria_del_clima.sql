-- ============================================================================
-- Meteorología: entra la teoría del clima, y la lección se reordena
--
-- La lección pasa de 13 a 30 secciones. Las trece que había (nueve de METAR y
-- cuatro de TAF) no cambian de contenido, pero sí de sitio: delante entran
-- diecisiete de teoría, adaptadas de los capítulos 11 y 12 del Pilot Handbook
-- of Aeronautical Knowledge.
--
-- El orden es al revés del que había y es deliberado: se puede decodificar
-- `BKN015CB` sin saber qué es un cumulonimbus, pero no se puede DECIDIR con él.
--
-- ─── LO QUE HAY QUE LEER ANTES DE APLICAR ───────────────────────────────────
--
-- Esta migración, a diferencia de la de septiembre, **sí toca filas de los
-- usuarios**. `user_metar_progress.lesson_screens` guarda números de lección, y
-- al meter diecisiete lecciones delante esos números dejaron de significar lo
-- mismo: quien tenía guardado el 1 había leído «¿Qué es un METAR?», que ahora
-- es la lección 18.
--
-- Sin el desplazamiento, a ese alumno le aparecerían como leídas trece
-- lecciones de teoría que no ha abierto, y como sin leer las trece que sí leyó.
-- Es peor que perder el progreso: es progreso equivocado.
--
-- El desplazamiento tiene guarda para no poder aplicarse dos veces: solo mueve
-- filas cuyo máximo sea 13 o menos, y después del cambio el mínimo posible es
-- 18. Si esta migración se corre otra vez, no encuentra nada que mover.
--
-- Ninguna fila se borra. Si prefieres revisarlo antes, la consulta de control
-- está al final, comentada.
-- ============================================================================

-- ─── Nota del 11 de septiembre de 2026 ──────────────────────────────────────
-- Esta migración ya está aplicada en producción (versión 20260911015546). Se
-- envolvió en una guarda para que volver a correrla no toque nada. La de antes
-- («el número más alto es 13 o menos») deja de proteger en cuanto un alumno lee
-- solo las primeras lecciones, y el historial de migraciones está
-- desincronizado (docs/PENDIENTES_CAMILO.md, §11): un `db push` la intentaría
-- otra vez. Ahora la guarda es el umbral, que solo vale 13 antes de la primera
-- pasada. El orden de las lecciones cambió después de esta: ver
-- 20260911030000_meteorologia_orden_por_niveles.sql.

do $$
begin
  if (select total from public.module_thresholds where code = 'metar_lesson') is distinct from 13 then
    raise notice 'meteorologia_teoria_del_clima ya estaba aplicada: no se toca nada.';
    return;
  end if;

  -- ─── 1 · El umbral del logro ─────────────────────────────────────────────
  update public.module_thresholds
    set total = 30,
        nota = 'METAR_LESSON_TOTAL de src/lib/metarLesson.ts (17 de teoría del clima + 9 de METAR + 4 de TAF)'
    where code = 'metar_lesson';

  update public.achievements
    set name = 'Meteorología leída',
        description = 'Leíste las treinta lecciones del módulo: la teoría del clima, de dónde sale la información, y el METAR y el TAF grupo por grupo'
    where code = 'metar_lesson';

  -- ─── 2 · El progreso ya guardado, a su sitio nuevo ───────────────────────
  -- Suma 17 a cada número.
  update public.user_metar_progress
    set lesson_screens = (
          select coalesce(array_agg(n + 17 order by n + 17), '{}')
          from unnest(lesson_screens) as n
        )
    where lesson_screens is not null
      and array_length(lesson_screens, 1) > 0
      and (select max(n) from unnest(lesson_screens) as n) <= 13;

  execute $c$
    comment on column public.user_metar_progress.lesson_screens is
      'Números de lección leída, 1 a 30. Del 1 al 17, teoría del clima y servicios meteorológicos; del 18 al 26, METAR; del 27 al 30, TAF (septiembre de 2026).'
  $c$;
end $$;

-- ─── Consulta de control, por si quieres mirar antes o después ──────────────
-- select user_id, lesson_screens
-- from public.user_metar_progress
-- where lesson_screens is not null and array_length(lesson_screens, 1) > 0
-- order by user_id;

-- ============================================================================
-- Meteorología: la lección se ordena en seis niveles
--
-- El índice mezclaba las partes de teoría con «Básico / Intermedio / Avanzado»
-- del METAR, y la información en ruta (PIREP, avisos, cartas) iba delante del
-- METAR y el TAF que da por sabidos. Ahora:
--
--   Nivel 1 · La atmósfera y el aire en movimiento   lecciones  1 a  5
--   Nivel 2 · Agua, estabilidad y nubes              lecciones  6 a  9
--   Nivel 3 · Masas de aire, frentes y tormentas     lecciones 10 a 12
--   Nivel 4 · El METAR, grupo por grupo              lecciones 13 a 21
--   Nivel 5 · El TAF                                 lecciones 22 a 25
--   Nivel 6 · Información en ruta                    lecciones 26 a 30
--
-- ─── LO QUE HAY QUE LEER ANTES DE APLICAR ───────────────────────────────────
--
-- Toca filas de usuarios y NO BORRA NINGUNA. `lesson_screens` guarda números de
-- lección, así que se renumeran:
--
--   18 a 30 (METAR y TAF)            pasan a 13 a 25   (restan 5)
--   13 a 17 (información en ruta)    pasan a 26 a 30   (suman 13)
--    1 a 12 (teoría)                 no cambian
--
-- Y repara lo que dejó la migración anterior. El respaldo del navegador volvió a
-- subir la numeración vieja de trece lecciones y dejó filas mezcladas como
-- {1,2,3,4,5,6,18,19,20,21,22,23}. Un número de 1 a 13 cuyo +17 también está en
-- la fila es esa copia vieja, y se quita antes de renumerar. El caso ambiguo
-- (alguien que de verdad leyó, por ejemplo, la teoría 1 y el METAR 1) no existe
-- hoy: las únicas filas con lecciones son las cuentas de prueba de Camilo.
--
-- Renumerar es una permutación: aplicarla dos veces SÍ haría daño. La guarda es
-- la marca [orden por niveles] del comentario de la columna. Si ya está, no se
-- mueve nada. No quites esa marca del comentario.
--
-- Cuándo aplicarla: con el código nuevo ya desplegado y la app actualizada en el
-- navegador. Si una pestaña con la versión vieja abre Meteorología después,
-- vuelve a subir números viejos.
--
-- La consulta de control está al final, comentada: córrela antes y después.
-- ============================================================================

begin;

do $$
declare
  v_comentario text;
begin
  select col_description(a.attrelid, a.attnum) into v_comentario
    from pg_attribute a
   where a.attrelid = 'public.user_metar_progress'::regclass
     and a.attname = 'lesson_screens';

  if coalesce(v_comentario, '') like '%[orden por niveles]%' then
    raise notice 'El orden por niveles ya estaba aplicado: no se mueve nada.';
    return;
  end if;

  update public.user_metar_progress p
     set lesson_screens = (
           select coalesce(array_agg(t.nuevo order by t.nuevo), '{}')
             from (
               select distinct
                      case
                        when n between 18 and 30 then n - 5
                        when n between 13 and 17 then n + 13
                        else n
                      end as nuevo
                 from unnest(p.lesson_screens) as n
                where not (n between 1 and 13 and (n + 17) = any (p.lesson_screens))
             ) as t
         )
   where p.lesson_screens is not null
     and cardinality(p.lesson_screens) > 0;

  execute $c$
    comment on column public.user_metar_progress.lesson_screens is
      'Números de lección leída, 1 a 30, en el orden por niveles del 11 de septiembre de 2026 [orden por niveles]: del 1 al 12, teoría del clima; del 13 al 21, METAR; del 22 al 25, TAF; del 26 al 30, información en ruta. No quites la marca entre corchetes: es la guarda de la migración 20260911030000.'
  $c$;
end $$;

update public.module_thresholds
   set nota = 'METAR_LESSON_TOTAL de src/lib/metarLesson.ts (12 de teoría del clima + 9 de METAR + 4 de TAF + 5 de información en ruta)'
 where code = 'metar_lesson';

update public.achievements
   set description = 'Leíste las treinta lecciones del módulo: la teoría del clima, el METAR y el TAF grupo por grupo, y la información en ruta'
 where code = 'metar_lesson';

commit;

-- ─── Consulta de control, antes y después ───────────────────────────────────
-- select left(user_id::text, 8) as usuario, lesson_screens
--   from public.user_metar_progress
--  where cardinality(lesson_screens) > 0
--  order by user_id;

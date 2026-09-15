-- Módulo Aerodinámica: progreso, quiz final, catálogo, panel y logros.
--
-- Todo es el patrón que ya usa Mercancías peligrosas, leído de la base con
-- pg_get_functiondef el 14 de septiembre de 2026. Las funciones compartidas
-- (evaluacion_terminar, secciones_leidas, practicas_hechas, panel_tarjetas,
-- desbloquear_logros) se reemplazan enteras conservando todo lo demás igual:
-- lo único que cambia en cada una es la rama de 'aerodinamica'.
--
-- El contenido sale de docs/contenido/aerodinamica.md por
-- scripts/aerodinamica/convertir.mjs. Esta migración la escribe
-- scripts/aerodinamica/migracion.mjs.
--
-- NO toca simulacro_aerolinea: meter el banco de Aerodinámica en el simulacro
-- cambia otro producto, y esa decisión es de Camilo.

-- ── 1 · Progreso del módulo ────────────────────────────────────────────────

create table if not exists public.user_aerodinamica_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  lesson_screens smallint[] not null default '{}',
  practice_done text[] not null default '{}',
  updated_at timestamptz not null default now()
);

alter table public.user_aerodinamica_progress enable row level security;

-- Solo lectura de lo propio. Escribir es exclusivo de la RPC, que valida
-- contra el catálogo: sin esto, cualquiera podría marcarse el módulo entero.
drop policy if exists aerodinamica_progress_select_own on public.user_aerodinamica_progress;
create policy aerodinamica_progress_select_own
  on public.user_aerodinamica_progress
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

revoke all on public.user_aerodinamica_progress from anon, authenticated;
grant select on public.user_aerodinamica_progress to authenticated;

-- ── 2 · Intentos del quiz final ────────────────────────────────────────────

create table if not exists public.user_aerodinamica_exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  score smallint not null,
  correct smallint not null default 0,
  total smallint not null default 0,
  taken_at timestamptz not null default now()
);

create index if not exists user_aerodinamica_exam_attempts_user_idx
  on public.user_aerodinamica_exam_attempts (user_id, taken_at desc);

alter table public.user_aerodinamica_exam_attempts enable row level security;

drop policy if exists aerodinamica_exam_select_own on public.user_aerodinamica_exam_attempts;
create policy aerodinamica_exam_select_own
  on public.user_aerodinamica_exam_attempts
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- Quien inserta es evaluacion_terminar, que es SECURITY DEFINER.
revoke all on public.user_aerodinamica_exam_attempts from anon, authenticated;
grant select on public.user_aerodinamica_exam_attempts to authenticated;

-- ── 3 · Catálogo de contenido ──────────────────────────────────────────────
--
-- Doce secciones y sesenta y dos claves de práctica: trece escenarios de
-- aplicación y cuarenta y nueve preguntas de entrevista. Es contra esto que
-- valida la RPC. De aquí en adelante lo mantiene al día
-- scripts/catalogo/sembrar.mjs, como el de los demás módulos.

insert into public.modulos_contenido (modulo, lecciones, practicas)
values (
  'aerodinamica',
  12,
  (
    select array_agg(clave order by clave)
    from (
      select 'esc-' || lpad(i::text, 2, '0') as clave from generate_series(1, 13) as i
      union all
      select 'ent-' || lpad(i::text, 2, '0') from generate_series(1, 49) as i
    ) as claves
  )
)
on conflict (modulo) do update set
  lecciones = excluded.lecciones,
  practicas = excluded.practicas,
  actualizado_en = now();

-- ── 4 · Umbrales, que documentan las constantes del front ──────────────────

insert into public.module_thresholds (code, total, nota) values
  ('aerodinamica_lesson', 12, 'AERO_LECTURA_TOTAL de src/lib/aerodinamica.ts (12 secciones, S01 a S12)'),
  ('aerodinamica_practice', 62, 'AERO_PRACTICA_TOTAL de src/lib/aerodinamica.ts (13 escenarios + 49 preguntas de entrevista)'),
  ('aerodinamica_pass', 80, 'AERO_PASS_SCORE: 20 preguntas al azar de 40, apruebas con 80')
on conflict (code) do update set total = excluded.total, nota = excluded.nota;

-- Y de paso, dos filas de Mercancías que quedaron desfasadas al quitar el
-- nivel 3 del módulo (PR #207): el umbral decía dieciocho lecciones y el logro
-- las describe igual. Son documentación, no gobiernan nada, pero mentían.
update public.module_thresholds
set total = 14,
    nota = 'MP_LECTURA_TOTAL de src/lib/mercancias.ts (14 lecciones en 4 niveles)'
where code = 'mercancias_lesson';

update public.achievements
set description = 'Leíste las catorce lecciones del módulo de mercancías peligrosas'
where code = 'mercancias_lesson';

-- ── 5 · Marcar progreso ────────────────────────────────────────────────────
--
-- Copia fiel de mercancias_mark_progress: valida contra el catálogo y agrega
-- sin duplicar, así que repetir la llamada no cambia nada.

create or replace function public.aerodinamica_mark_progress(
  p_lesson_screen smallint default null,
  p_practice_id text default null
)
returns public.user_aerodinamica_progress
language plpgsql
security definer
set search_path to ''
as $$
declare
  v_row public.user_aerodinamica_progress;
begin
  if auth.uid() is null then
    raise exception 'no authenticated user';
  end if;
  perform private.validar_marca_progreso('aerodinamica', p_lesson_screen, p_practice_id);

  insert into public.user_aerodinamica_progress (user_id, lesson_screens, practice_done, updated_at)
  values (
    auth.uid(),
    case when p_lesson_screen is null then '{}'::smallint[] else array[p_lesson_screen] end,
    case when p_practice_id is null then '{}'::text[] else array[p_practice_id] end,
    now()
  )
  on conflict (user_id) do update set
    lesson_screens = (
      select coalesce(array_agg(distinct s order by s), '{}'::smallint[])
      from unnest(
        public.user_aerodinamica_progress.lesson_screens ||
        case when p_lesson_screen is null then '{}'::smallint[] else array[p_lesson_screen] end
      ) as s
    ),
    practice_done = (
      select coalesce(array_agg(distinct p order by p), '{}'::text[])
      from unnest(
        public.user_aerodinamica_progress.practice_done ||
        case when p_practice_id is null then '{}'::text[] else array[p_practice_id] end
      ) as p
    ),
    updated_at = now()
  returning * into v_row;

  return v_row;
end
$$;

revoke all on function public.aerodinamica_mark_progress(smallint, text) from public, anon;
grant execute on function public.aerodinamica_mark_progress(smallint, text) to authenticated;

-- ── 6 · Conteos por módulo ─────────────────────────────────────────────────
--
-- Las dos son la función que ya existe con una rama más.

create or replace function private.secciones_leidas(p_user uuid, p_modulo text)
returns integer
language sql
stable security definer
set search_path to ''
as $$
  select count(distinct s)::int
  from (
    select unnest(lesson_screens) as s from public.user_notam_progress where p_modulo = 'notam' and user_id = p_user
    union all
    select unnest(lesson_screens) from public.user_metar_progress where p_modulo = 'metar' and user_id = p_user
    union all
    select unnest(lesson_screens) from public.user_mercancias_progress where p_modulo = 'mercancias' and user_id = p_user
    union all
    select unnest(lesson_screens) from public.user_aerodinamica_progress where p_modulo = 'aerodinamica' and user_id = p_user
  ) as leidas
  where s between 1 and (select c.lecciones from public.modulos_contenido c where c.modulo = p_modulo)
$$;

create or replace function private.practicas_hechas(p_user uuid, p_modulo text)
returns integer
language sql
stable security definer
set search_path to ''
as $$
  select count(distinct p)::int
  from (
    select unnest(practice_done) as p from public.user_notam_progress where p_modulo = 'notam' and user_id = p_user
    union all
    select unnest(practice_done) from public.user_metar_progress where p_modulo = 'metar' and user_id = p_user
    union all
    select unnest(practice_done) from public.user_mercancias_progress where p_modulo = 'mercancias' and user_id = p_user
    union all
    select unnest(practice_done) from public.user_aerodinamica_progress where p_modulo = 'aerodinamica' and user_id = p_user
  ) as hechas
  where exists (
    select 1 from public.modulos_contenido c
    where c.modulo = p_modulo and hechas.p = any (c.practicas)
  )
$$;

-- ── 7 · El quiz final ──────────────────────────────────────────────────────

insert into public.evaluaciones
  (clave, titulo, retroalimentacion, preguntas_por_intento, aprobacion,
   barajar_opciones, minutos_vigencia, destino, activa, modulo_leccion)
values
  ('aerodinamica_evaluacion', 'Aerodinámica · Evaluación', 'al_final', 20, 80,
   true, 180, 'aerodinamica', true, 'aerodinamica')
on conflict (clave) do update set
  titulo = excluded.titulo,
  retroalimentacion = excluded.retroalimentacion,
  preguntas_por_intento = excluded.preguntas_por_intento,
  aprobacion = excluded.aprobacion,
  barajar_opciones = excluded.barajar_opciones,
  minutos_vigencia = excluded.minutos_vigencia,
  destino = excluded.destino,
  activa = excluded.activa,
  modulo_leccion = excluded.modulo_leccion;

insert into public.evaluacion_fuentes (evaluacion, banco, etiqueta, cupo)
values ('aerodinamica_evaluacion', 'aerodinamica_evaluacion', null, null)
on conflict do nothing;

-- ── 8 · El banco: 40 preguntas, ev-01 a ev-40 ──────────────────────────────
--
-- Generado por scripts/bancos/banco.mjs desde
-- contenido/bancos/aerodinamica_evaluacion.json. Cada pregunta lleva su
-- sección en los metadatos ({"tema": "S04"}): es lo que permite que el
-- resultado diga qué secciones repasar. `correcta` es índice desde 0.
-- El SQL no borra: desactiva lo que salga del archivo, porque las sesiones
-- ya jugadas referencian sus preguntas.

-- Banco aerodinamica_evaluacion: 40 preguntas
with datos as (
  select *
  from jsonb_to_recordset($banco$[{"id":"ev-01","enunciado":"La presión dinámica es:","opciones":["½ ρ V², la presión asociada al movimiento del aire","La presión a nivel del mar en atmósfera estándar","La presión del aire en reposo","La presión medida por la toma estática"],"correcta":0,"explicacion":"Es la presión que resulta del movimiento; el anemómetro mide la diferencia entre presión total y estática, es decir, la presión dinámica.","referencia":null,"metadatos":{"tema":"S01","seccion":1}},{"id":"ev-02","enunciado":"La separación de la capa límite en el extradós:","opciones":["Es producida por el tren de aterrizaje","Aumenta la resistencia y destruye sustentación; avanza hacia el borde de ataque al aumentar el ángulo de ataque","Solo ocurre a velocidades supersónicas","Reduce la resistencia y aumenta la sustentación"],"correcta":1,"explicacion":"La separación es el mecanismo de la pérdida. Con más ángulo de ataque el punto de separación se mueve hacia adelante.","referencia":null,"metadatos":{"tema":"S01","seccion":1}},{"id":"ev-03","enunciado":"En un descenso estabilizado a velocidad constante:","opciones":["La sustentación es mucho mayor que el peso","Las fuerzas no están en equilibrio","Una componente del peso actúa hacia adelante en la trayectoria y el empuje es menor que la resistencia","El empuje es mayor que la resistencia"],"correcta":2,"explicacion":"En descenso estabilizado hay equilibrio: la componente del peso a lo largo de la trayectoria reemplaza parte del empuje.","referencia":null,"metadatos":{"tema":"S02","seccion":2}},{"id":"ev-04","enunciado":"Un piloto sube la nariz en ascenso sin cambiar el empuje. Lo esperable es:","opciones":["Aumento sostenido de la tasa de ascenso sin cambio de velocidad","Reducción del ángulo de ataque","Aumento de velocidad","Mayor ángulo de trayectoria por un momento y disminución de velocidad"],"correcta":3,"explicacion":"Sin más empuje, la altura se gana a costa de la velocidad; el ángulo de ataque tiende a aumentar.","referencia":null,"metadatos":{"tema":"S02","seccion":2}},{"id":"ev-05","enunciado":"La teoría del \"tiempo de tránsito igual\":","opciones":["Es falsa: el aire del extradós llega antes al borde de salida","Es válida por encima del Mach crítico","Es la explicación correcta de la sustentación","Solo aplica a perfiles simétricos"],"correcta":0,"explicacion":"NASA la clasifica como teoría incorrecta. La sustentación se explica por el desvío del flujo y la distribución de presiones.","referencia":null,"metadatos":{"tema":"S03","seccion":3}},{"id":"ev-06","enunciado":"En la ecuación L = ½ ρ V² S CL, el término ½ ρ V² corresponde a:","opciones":["El peso","La presión dinámica","El coeficiente de sustentación","La superficie alar"],"correcta":1,"explicacion":"Es la presión dinámica (q), la misma magnitud que mide el anemómetro.","referencia":null,"metadatos":{"tema":"S03","seccion":3}},{"id":"ev-07","enunciado":"El coeficiente de sustentación (CL) de un ala depende principalmente de:","opciones":["Solo de la velocidad","Del peso del avión","Del ángulo de ataque y la configuración, y también del Mach y la contaminación","Solo de la densidad"],"correcta":2,"explicacion":"El CL resume la capacidad del ala en una condición: ángulo de ataque, forma y configuración; a gran velocidad lo afecta el Mach.","referencia":null,"metadatos":{"tema":"S03","seccion":3}},{"id":"ev-08","enunciado":"¿Cuál afirmación es correcta?","opciones":["Con empuje máximo no puede haber pérdida","Con la nariz abajo no puede haber pérdida","Un avión solo entra en pérdida a baja velocidad","Un avión puede entrar en pérdida a cualquier velocidad, actitud y potencia si supera su ángulo de ataque crítico"],"correcta":3,"explicacion":"La pérdida depende del ángulo de ataque. Es la afirmación de la FAA (AC 61-67C, AFH).","referencia":null,"metadatos":{"tema":"S04","seccion":4}},{"id":"ev-09","enunciado":"Con alas niveladas, un avión tiene 5° de pitch y 3° de trayectoria descendente. El ángulo de ataque aproximado es:","opciones":["2°","5°","8°","–3°"],"correcta":2,"explicacion":"AOA ≈ pitch – trayectoria = 5° – (–3°) = 8°.","referencia":null,"metadatos":{"tema":"S04","seccion":4}},{"id":"ev-10","enunciado":"¿Qué condición **reduce** la velocidad de pérdida?","opciones":["Extender flaps y slats","Mayor peso","Viraje con 45° de alabeo","CG adelantado"],"correcta":0,"explicacion":"Los hipersustentadores aumentan el CLmax. Las demás opciones aumentan la velocidad de pérdida.","referencia":null,"metadatos":{"tema":"S04","seccion":4}},{"id":"ev-11","enunciado":"Según la AC 120-109A, durante la recuperación de una pérdida:","opciones":["Se aplica siempre empuje máximo antes de bajar la nariz","Se reduce el ángulo de ataque como prioridad y se acepta la pérdida de altitud","Se busca perder la menor altitud posible aun manteniendo el ángulo de ataque","Se extienden speed brakes para controlar la velocidad"],"correcta":1,"explicacion":"Reducir el ángulo de ataque es lo prioritario. El empuje va según necesidad y los speed brakes se retraen.","referencia":null,"metadatos":{"tema":"S04","seccion":4}},{"id":"ev-12","enunciado":"En un ala en flecha, la pérdida tiende a comenzar en:","opciones":["La raíz, con nariz abajo","Toda el ala al mismo tiempo, sin efecto de cabeceo","Las puntas, con tendencia de nariz arriba","El estabilizador horizontal"],"correcta":2,"explicacion":"La capa límite fluye hacia las puntas; al perder sustentación atrás, la resultante se desplaza hacia adelante y la nariz sube.","referencia":null,"metadatos":{"tema":"S04","seccion":4}},{"id":"ev-13","enunciado":"Por debajo de la velocidad de mínima resistencia:","opciones":["La resistencia total es cero","El avión no puede mantener vuelo nivelado en ningún caso","Domina la resistencia parásita","Domina la resistencia inducida y volar más lento exige más empuje"],"correcta":3,"explicacion":"Es el régimen de mando invertido: al frenar, la resistencia inducida crece más de lo que baja la parásita.","referencia":null,"metadatos":{"tema":"S05","seccion":5}},{"id":"ev-14","enunciado":"¿Qué reduce la resistencia inducida?","opciones":["Winglets y mayor alargamiento del ala","Menor velocidad","Mayor factor de carga","Mayor peso"],"correcta":0,"explicacion":"Winglets y alargamiento reducen la intensidad de los vórtices de punta. Las demás opciones la aumentan.","referencia":null,"metadatos":{"tema":"S05","seccion":5}},{"id":"ev-15","enunciado":"La velocidad de L/Dmax de un avión:","opciones":["Disminuye con el peso","Aumenta con el peso","Coincide con VMO","Es la misma para cualquier peso"],"correcta":1,"explicacion":"L/Dmax ocurre a un ángulo de ataque fijo; con más peso se necesita más presión dinámica para el mismo CL.","referencia":null,"metadatos":{"tema":"S05","seccion":5}},{"id":"ev-16","enunciado":"Un viraje nivelado coordinado de 30° de alabeo produce un factor de carga aproximado de:","opciones":["1,00 G","1,15 G","1,41 G","2,00 G"],"correcta":1,"explicacion":"n = 1/cos 30° ≈ 1,15 G.","referencia":null,"metadatos":{"tema":"S06","seccion":6}},{"id":"ev-17","enunciado":"Si la velocidad de pérdida de un avión es 140 kt en 1 G, en un viraje nivelado de 60° será aproximadamente:","opciones":["150 kt","167 kt","198 kt","280 kt"],"correcta":2,"explicacion":"n = 2; √2 ≈ 1,41; 140 × 1,41 ≈ 198 kt.","referencia":null,"metadatos":{"tema":"S06","seccion":6}},{"id":"ev-18","enunciado":"El texto que 14 CFR 25.1583(a)(3) exige en el manual de vuelo advierte que:","opciones":["Va solo aplica con flaps extendidos","Por debajo de Va se puede aplicar cualquier combinación de mandos","Las entradas grandes y alternadas, o completas en más de un eje al mismo tiempo, pueden producir falla estructural a cualquier velocidad, incluso por debajo de Va","Va es igual a VMO"],"correcta":2,"explicacion":"La advertencia se reforzó tras AA587: Va no protege contra entradas alternadas ni multieje.","referencia":null,"metadatos":{"tema":"S06","seccion":6}},{"id":"ev-19","enunciado":"En un avión de transporte, el límite de factor de carga positivo con flaps extendidos (14 CFR 25.345) es:","opciones":["+6,0 G","+3,8 G","+1,0 G","+2,0 G"],"correcta":3,"explicacion":"Con flaps extendidos el requisito de maniobra es +2,0 G; con flaps arriba, al menos +2,5 G.","referencia":null,"metadatos":{"tema":"S06","seccion":6}},{"id":"ev-20","enunciado":"Los slats y dispositivos de borde de ataque:","opciones":["Retrasan la separación y aumentan el ángulo de ataque crítico y el CLmax","Aumentan la resistencia parásita sin efecto en la pérdida","Reducen el ángulo de ataque crítico","Solo se usan en crucero"],"correcta":0,"explicacion":"Energizan o protegen el flujo del borde de ataque y permiten más ángulo de ataque antes de la pérdida.","referencia":null,"metadatos":{"tema":"S07","seccion":7}},{"id":"ev-21","enunciado":"En vuelo, los spoilers usados de forma asimétrica:","opciones":["Aumentan la sustentación del ala que baja","Ayudan al alabeo sin producir guiñada adversa","Controlan el cabeceo","Actúan como flaps"],"correcta":1,"explicacion":"El spoiler del ala que debe bajar reduce su sustentación; como no aumenta la resistencia inducida del ala que sube, no genera guiñada adversa.","referencia":null,"metadatos":{"tema":"S07","seccion":7}},{"id":"ev-22","enunciado":"En un avión convencional, el estabilizador horizontal normalmente:","opciones":["No genera fuerza en vuelo nivelado","Controla la guiñada","Genera una fuerza hacia abajo que equilibra el momento de nariz abajo del ala y el CG","Genera sustentación hacia arriba igual a la del ala"],"correcta":2,"explicacion":"Con el CG delante del centro de presión, la cola empuja hacia abajo para equilibrar el momento.","referencia":null,"metadatos":{"tema":"S07","seccion":7}},{"id":"ev-23","enunciado":"Un avión estáticamente estable pero dinámicamente inestable, ante una perturbación:","opciones":["Se aleja de inmediato del equilibrio","Vuelve sin oscilar","Se queda en la nueva posición","Tiende a volver, pero oscila con amplitud creciente"],"correcta":3,"explicacion":"La tendencia inicial es volver (estática positiva), pero las oscilaciones crecen (dinámica negativa).","referencia":null,"metadatos":{"tema":"S08","seccion":8}},{"id":"ev-24","enunciado":"Con el CG atrasado dentro de límites, respecto a uno adelantado:","opciones":["Menor estabilidad longitudinal y fuerzas de mando más livianas","Mayor velocidad de pérdida","Mayor consumo","Mayor esfuerzo para rotar"],"correcta":0,"explicacion":"Con CG atrasado baja la carga en la cola: menos resistencia y velocidad de pérdida, pero menos estabilidad y mandos más livianos.","referencia":null,"metadatos":{"tema":"S08","seccion":8}},{"id":"ev-25","enunciado":"¿En qué condición es más probable que el piloto sobrecargue la estructura sin darse cuenta?","opciones":["CG exactamente en el centro del rango","CG en el límite trasero, por fuerzas de mando livianas","La posición del CG no influye","CG en el límite delantero"],"correcta":1,"explicacion":"Con mandos livianos es más fácil aplicar G de más (PHAK).","referencia":null,"metadatos":{"tema":"S08","seccion":8}},{"id":"ev-26","enunciado":"Al salir del efecto suelo en el despegue, el avión:","opciones":["Necesita menos ángulo de ataque para el mismo CL","No sufre cambios","Necesita más ángulo de ataque para el mismo CL y aumenta su resistencia inducida","Pierde resistencia parásita"],"correcta":2,"explicacion":"Al alejarse del suelo se recuperan el downwash y los vórtices: sube la resistencia inducida y el ángulo de ataque requerido.","referencia":null,"metadatos":{"tema":"S09","seccion":9}},{"id":"ev-27","enunciado":"En un avión de hélice que gira a la derecha (vista desde la cabina), con alta potencia y alto ángulo de ataque, el factor P produce:","opciones":["Guiñada a la derecha","Ningún efecto","Cabeceo nariz abajo","Guiñada a la izquierda"],"correcta":3,"explicacion":"La pala descendente (lado derecho) tiene mayor ángulo de ataque y más empuje; la nariz guiña a la izquierda.","referencia":null,"metadatos":{"tema":"S09","seccion":9}},{"id":"ev-28","enunciado":"La mayoría de los aviones se diseñan con:","opciones":["Leve inestabilidad espiral, preferible al Dutch Roll","Efecto diedro negativo","Fuerte tendencia al Dutch Roll","Estabilidad direccional nula"],"correcta":0,"explicacion":"Según el PHAK, la inestabilidad espiral leve es más fácil de manejar que el Dutch Roll.","referencia":null,"metadatos":{"tema":"S09","seccion":9}},{"id":"ev-29","enunciado":"Cuando la velocidad supera el Mach crítico:","opciones":["Desaparece la resistencia","Aparecen zonas de flujo supersónico, ondas de choque y, poco después, aumento brusco de resistencia","El ángulo de ataque crítico aumenta","El avión alcanza Mach 1"],"correcta":1,"explicacion":"El Mach crítico es el primer Mach 1 local. La subida brusca de resistencia ocurre en el Mach de divergencia, 5–10 % por encima.","referencia":null,"metadatos":{"tema":"S10","seccion":10}},{"id":"ev-30","enunciado":"La flecha del ala aumenta el Mach crítico porque:","opciones":["Aumenta la curvatura del perfil","Reduce el peso del ala","Solo la componente del flujo perpendicular al borde de ataque determina la distribución de presión y es menor que la velocidad del avión","Aumenta la superficie alar"],"correcta":2,"explicacion":"Es la teoría de la flecha del PHAK y NASA: el ala \"ve\" una velocidad efectiva menor.","referencia":null,"metadatos":{"tema":"S10","seccion":10}},{"id":"ev-31","enunciado":"A gran altitud el límite de velocidad máxima operativa se expresa normalmente como:","opciones":["Va","VRA","VMO en KCAS","MMO en Mach"],"correcta":3,"explicacion":"Por encima de la altitud de cruce, el Mach máximo se alcanza antes que VMO; el límite es MMO.","referencia":null,"metadatos":{"tema":"S10","seccion":10}},{"id":"ev-32","enunciado":"El Mach Buffet se debe a:","opciones":["La separación del flujo detrás de una onda de choque","La reacción del torque de los motores","La turbulencia de la estela de otro avión","El tren de aterrizaje extendido"],"correcta":0,"explicacion":"La onda de choque puede provocar separación de la capa límite y ese flujo separado hace vibrar la estructura.","referencia":null,"metadatos":{"tema":"S10","seccion":10}},{"id":"ev-33","enunciado":"¿Qué efecto tiene un aumento de peso sobre los límites de buffet a gran altitud?","opciones":["Solo afecta el de alta velocidad","Sube el buffet de baja velocidad y baja el de alta: reduce el margen","No tiene efecto","Baja el buffet de baja velocidad y sube el de alta"],"correcta":1,"explicacion":"Más peso exige más ángulo de ataque, igual que más G (PHAK; AC 61-107A, cancelada).","referencia":null,"metadatos":{"tema":"S11","seccion":11}},{"id":"ev-34","enunciado":"La altitud máxima de operación de un jet en un día dado es:","opciones":["La mayor entre las tres","Siempre la altitud máxima certificada","La menor entre la certificada, la limitada por empuje y la limitada por buffet","La altitud de cruce"],"correcta":2,"explicacion":"Es la definición de la AUPRTA; con más temperatura o peso, baja.","referencia":null,"metadatos":{"tema":"S11","seccion":11}},{"id":"ev-35","enunciado":"Un margen de buffet de 1,3 G equivale aproximadamente a:","opciones":["Un viraje nivelado de 25°","Un viraje nivelado de 60°","Un viraje nivelado de 15°","Un viraje nivelado de 40°"],"correcta":3,"explicacion":"1/cos 40° ≈ 1,31 G.","referencia":null,"metadatos":{"tema":"S11","seccion":11}},{"id":"ev-36","enunciado":"En Coffin Corner, el piloto:","opciones":["Tiene un margen mínimo: desacelerar lleva al buffet de baja velocidad y acelerar al Mach buffet","Solo está limitado por VMO","Puede reducir o aumentar la velocidad con amplios márgenes","Está por debajo de la altitud de cruce"],"correcta":0,"explicacion":"Es la convergencia de los límites aerodinámicos de baja y alta velocidad.","referencia":null,"metadatos":{"tema":"S11","seccion":11}},{"id":"ev-37","enunciado":"Al aumentar la temperatura en crucero respecto a la ISA, la altitud máxima:","opciones":["No cambia","Disminuye","Aumenta","Solo cambia si hay turbulencia"],"correcta":1,"explicacion":"Con temperatura alta los motores entregan menos empuje: baja la altitud limitada por empuje y, con ella, la altitud máxima (AUPRTA). La altitud limitada por buffet no depende de la temperatura.","referencia":null,"metadatos":{"tema":"S11","seccion":11}},{"id":"ev-38","enunciado":"A una misma IAS, al aumentar la altitud de densidad la TAS:","opciones":["Depende solo del viento","Disminuye","Aumenta","Es igual"],"correcta":2,"explicacion":"Con menos densidad se necesita más velocidad verdadera para la misma presión dinámica.","referencia":null,"metadatos":{"tema":"S12","seccion":12}},{"id":"ev-39","enunciado":"Para certificación de despegue en transporte, 14 CFR 25.105(d) considera:","opciones":["Solo el viento cruzado","Ningún efecto del viento","El 100 % del viento de frente y el 100 % del de cola","No más del 50 % del viento de frente y no menos del 150 % del de cola"],"correcta":3,"explicacion":"Es un factor conservador: se da poco crédito al viento de frente y se penaliza más el de cola.","referencia":null,"metadatos":{"tema":"S12","seccion":12}},{"id":"ev-40","enunciado":"¿Qué efecto tiene la humedad alta sobre la performance?","opciones":["Empeora la performance porque el aire húmedo es menos denso","Mejora la performance porque el aire húmedo es más denso","No tiene efecto","Solo afecta la visibilidad"],"correcta":0,"explicacion":"El vapor de agua es más liviano que el aire seco: sube la altitud de densidad.","referencia":null,"metadatos":{"tema":"S12","seccion":12}}]$banco$::jsonb)
    as d(id text, enunciado text, opciones jsonb, correcta smallint, explicacion text, referencia text, metadatos jsonb)
),
cargadas as (
  insert into public.banco_preguntas as bp
    (banco, clave_externa, enunciado, opciones, correcta, explicacion, referencia, metadatos, activa, actualizada_en)
  select 'aerodinamica_evaluacion', d.id, d.enunciado, d.opciones, d.correcta, coalesce(d.explicacion, ''), d.referencia,
         coalesce(d.metadatos, '{}'::jsonb), true, now()
  from datos d
  on conflict (banco, clave_externa) do update set
    enunciado = excluded.enunciado,
    opciones = excluded.opciones,
    correcta = excluded.correcta,
    explicacion = excluded.explicacion,
    referencia = excluded.referencia,
    metadatos = excluded.metadatos,
    activa = true,
    actualizada_en = now()
  where (bp.enunciado, bp.opciones, bp.correcta, bp.explicacion, bp.referencia, bp.metadatos, bp.activa)
    is distinct from (excluded.enunciado, excluded.opciones, excluded.correcta, excluded.explicacion,
                      excluded.referencia, excluded.metadatos, true)
  returning 1
)
update public.banco_preguntas
set activa = false, actualizada_en = now()
where banco = 'aerodinamica_evaluacion' and activa and clave_externa not in (select id from datos);


-- ── 9 · evaluacion_terminar, con la rama nueva ─────────────────────────────
--
-- La función entera, idéntica a la que había, más el `when 'aerodinamica'`.

create or replace function public.evaluacion_terminar(p_sesion uuid)
returns jsonb
language plpgsql
security definer
set search_path to ''
as $$
declare
  v_user uuid := auth.uid();
  v_s public.evaluacion_sesiones%rowtype;
  v_eval public.evaluaciones%rowtype;
  v_total int;
  v_puntaje smallint;
  v_aprobada boolean;
  v_duracion int;
  v_revision jsonb;
  v_detalle jsonb;
begin
  if v_user is null then
    raise exception 'unauthorized' using errcode = '28000';
  end if;

  select * into v_s
  from public.evaluacion_sesiones
  where id = p_sesion and user_id = v_user
  for update;
  if not found then
    raise exception 'sesion_no_encontrada' using errcode = 'P0002';
  end if;

  select * into v_eval from public.evaluaciones where clave = v_s.evaluacion;
  v_total := cardinality(v_s.preguntas);

  -- Revisión: por posición, lo elegido y si acertó. La correcta, la explicación
  -- y la referencia van solo en lo respondido: terminar un intento sin responder
  -- no entrega el banco. Las preguntas sin responder cuentan como incorrectas.
  select
    jsonb_agg(
      jsonb_build_object(
        'posicion', s.pos,
        'opcion', (v_s.respuestas -> s.pos::text ->> 'opcion')::int,
        'correcta', coalesce((v_s.respuestas -> s.pos::text ->> 'correcta')::boolean, false),
        'opcion_correcta', case when v_s.respuestas ? s.pos::text
          then private.opcion_correcta_mostrada(v_s.orden_opciones -> (s.pos - 1)::int, bp.correcta) end,
        'explicacion', case when v_s.respuestas ? s.pos::text then bp.explicacion end,
        'referencia', case when v_s.respuestas ? s.pos::text then bp.referencia end
      )
      order by s.pos
    ),
    -- El detalle que la tabla de NOTAM ya guardaba: texto elegido y, si se
    -- respondió, el correcto.
    jsonb_agg(
      jsonb_build_object(
        'id', bp.clave_externa,
        'elegida', coalesce(
          bp.opciones ->> ((v_s.orden_opciones -> (s.pos - 1)::int ->> ((v_s.respuestas -> s.pos::text ->> 'opcion')::int))::int),
          ''
        ),
        'correcta', case when v_s.respuestas ? s.pos::text then bp.opciones ->> bp.correcta end,
        'ok', coalesce((v_s.respuestas -> s.pos::text ->> 'correcta')::boolean, false)
      )
      order by s.pos
    )
  into v_revision, v_detalle
  from unnest(v_s.preguntas) with ordinality as s(qid, pos)
  join public.banco_preguntas bp on bp.id = s.qid;

  if v_s.terminada_en is null then
    v_puntaje := round(100.0 * v_s.correctas / v_total);
    v_aprobada := v_puntaje >= v_eval.aprobacion;
    v_duracion := least(extract(epoch from now() - v_s.iniciada_en), 86400)::int;

    update public.evaluacion_sesiones
    set terminada_en = now(), puntaje = v_puntaje, aprobada = v_aprobada
    where id = p_sesion;

    -- El resultado va a la tabla de intentos del módulo: su historial y sus
    -- disparadores de logros siguen funcionando igual.
    case v_eval.destino
      when 'notam' then
        insert into public.user_notam_exam_attempts
          (user_id, score, correct_count, total_questions, passed, answers, duration_seconds)
        values (v_user, v_puntaje, v_s.correctas, v_total, v_aprobada, v_detalle, v_duracion);
      when 'metar' then
        insert into public.user_metar_exam_attempts (user_id, score, correct, total)
        values (v_user, v_puntaje, v_s.correctas, v_total);
      when 'mercancias' then
        insert into public.user_mercancias_exam_attempts (user_id, score, correct, total)
        values (v_user, v_puntaje, v_s.correctas, v_total);
      when 'aerodinamica' then
        insert into public.user_aerodinamica_exam_attempts (user_id, score, correct, total)
        values (v_user, v_puntaje, v_s.correctas, v_total);
      when 'simulacro_aerolinea' then
        insert into public.user_airline_mock_attempts (user_id, score, correct, total)
        values (v_user, v_puntaje, v_s.correctas, v_total);
    end case;

    -- Terminar una evaluación es un día de estudio.
    perform public.record_daily_activity(v_total, v_s.correctas, ceil(v_duracion / 60.0)::int);
    perform public.increment_streak();
  else
    v_puntaje := v_s.puntaje;
    v_aprobada := v_s.aprobada;
    v_duracion := least(extract(epoch from v_s.terminada_en - v_s.iniciada_en), 86400)::int;
  end if;

  return jsonb_build_object(
    'puntaje', v_puntaje,
    'correctas', v_s.correctas,
    'total', v_total,
    'aprobada', v_aprobada,
    'aprobacion', v_eval.aprobacion,
    'duracion_segundos', v_duracion,
    'revision', v_revision
  );
end
$$;

-- ── 10 · Logros ────────────────────────────────────────────────────────────

insert into public.achievements (code, name, description, icon, tier, order_index) values
  ('aerodinamica_lesson', 'Aerodinámica leída', 'Leíste las doce secciones del módulo de aerodinámica', '📖', 'bronze', 22),
  ('aerodinamica_practice', 'Aerodinámica practicada', 'Resolviste los 62 ejercicios: trece escenarios de aplicación y cuarenta y nueve preguntas de entrevista', '🎯', 'silver', 23),
  ('aerodinamica_exam', 'Quiz de aerodinámica superado', 'Aprobaste el quiz final de aerodinámica', '✅', 'silver', 24),
  ('aerodinamica_master', 'Aerodinámica dominada', 'Terminaste el módulo entero: lección, práctica y quiz final', '🛫', 'gold', 25)
on conflict (code) do update set
  name = excluded.name,
  description = excluded.description,
  icon = excluded.icon,
  tier = excluded.tier,
  order_index = excluded.order_index;

drop trigger if exists trg_check_achievements_aerodinamica on public.user_aerodinamica_progress;
create trigger trg_check_achievements_aerodinamica
  after insert or update on public.user_aerodinamica_progress
  for each row execute function private.trigger_logros('aerodinamica');

drop trigger if exists trg_check_achievements_aerodinamica_exam on public.user_aerodinamica_exam_attempts;
create trigger trg_check_achievements_aerodinamica_exam
  after insert or update on public.user_aerodinamica_exam_attempts
  for each row execute function private.trigger_logros('aerodinamica');

-- El grupo de logros: la rama de 'aerodinamica' es la de 'mercancias' con sus
-- tablas. La función va entera porque el grupo desconocido levanta excepción,
-- y sin esto el primer trigger rompería el marcado de progreso.

create or replace function private.desbloquear_logros(p_user uuid, p_grupo text)
returns integer
language plpgsql
security definer
set search_path to ''
as $$
declare
  v_codigos text[];
  v_new int := 0;
  v_n int;
  v_bool bool;
  v_lecciones bool;
  v_practicas bool;
  v_aprobado bool;
begin
  if p_user is null then return 0; end if;

  v_codigos := case p_grupo
    when 'quiz' then array['first_quiz', 'first_100', 'subject_master']
    when 'racha' then array['streak_3', 'streak_7', 'streak_30']
    when 'comunidad' then array['community_hello']
    when 'piloto' then array['first_step', 'icao_climb']
    when 'suscripcion' then array['founder_badge']
    when 'notam' then array['notam_lesson', 'notam_practice', 'notam_exam', 'notam_master']
    when 'metar' then array['metar_lesson', 'metar_master']
    when 'mercancias' then array['mercancias_lesson', 'mercancias_practice', 'mercancias_exam', 'mercancias_master']
    when 'aerodinamica' then array['aerodinamica_lesson', 'aerodinamica_practice', 'aerodinamica_exam', 'aerodinamica_master']
    when 'aerolinea' then array['airline_mock_passed']
  end;
  if v_codigos is null then
    raise exception 'grupo_de_logros_desconocido: %', p_grupo using errcode = '22023';
  end if;

  -- Con todos los logros del grupo ya ganados no hay nada que contar: es el caso
  -- de cada sección leída después del logro de la lección.
  if not exists (
    select 1 from public.achievements a
    where a.code = any (v_codigos)
      and not exists (
        select 1 from public.user_achievements ua
        where ua.user_id = p_user and ua.achievement_id = a.id
      )
  ) then
    return 0;
  end if;

  case p_grupo
  when 'quiz' then
    -- vault_sessions es donde escribe el quiz actual; en quiz_attempts quedaron
    -- intentos previos a la migración al vault. Nadie pierde lo que ya hizo.
    select coalesce(sum(preguntas), 0)::int, count(*) > 0
      into v_n, v_bool
      from (
        select coalesce(array_length(question_ids, 1), 0) as preguntas
          from public.vault_sessions
          where user_id = p_user and completed_at is not null
        union all
        select coalesce(total_questions, 0)
          from public.quiz_attempts
          where user_id = p_user and finished_at is not null
      ) as intentos;
    if v_bool then v_new := v_new + public._try_unlock(p_user, 'first_quiz'); end if;
    if v_n >= 100 then v_new := v_new + public._try_unlock(p_user, 'first_100'); end if;

    -- subject_master va solo contra vault_sessions: la materia de la tabla vieja
    -- es un id numérico y la nueva un slug; mezclarlas daría rachas falsas.
    with last5 as (
      select subject_slug,
             case
               when coalesce(array_length(question_ids, 1), 0) = 0 then 0
               else round(coalesce(correct_count, 0)::numeric * 100 / array_length(question_ids, 1))
             end as score
      from public.vault_sessions
      where user_id = p_user and completed_at is not null and subject_slug is not null
      order by completed_at desc
      limit 5
    )
    select count(*)::int into v_n
    from last5
    where score >= 80 and subject_slug = (select subject_slug from last5 limit 1);
    if v_n = 5 then v_new := v_new + public._try_unlock(p_user, 'subject_master'); end if;

  when 'racha' then
    select coalesce(current_streak, 0) into v_n from public.streaks where user_id = p_user;
    if coalesce(v_n, 0) >= 3 then v_new := v_new + public._try_unlock(p_user, 'streak_3'); end if;
    if coalesce(v_n, 0) >= 7 then v_new := v_new + public._try_unlock(p_user, 'streak_7'); end if;
    if coalesce(v_n, 0) >= 30 then v_new := v_new + public._try_unlock(p_user, 'streak_30'); end if;

  when 'comunidad' then
    if exists (select 1 from public.community_messages where user_id = p_user) then
      v_new := v_new + public._try_unlock(p_user, 'community_hello');
    end if;

  when 'piloto' then
    select (stage is not null), coalesce(icao_english_level, 0)
      into v_bool, v_n
      from public.pilot_state where user_id = p_user;
    if coalesce(v_bool, false) then v_new := v_new + public._try_unlock(p_user, 'first_step'); end if;
    if coalesce(v_n, 0) >= 4 then v_new := v_new + public._try_unlock(p_user, 'icao_climb'); end if;

  when 'suscripcion' then
    if (
      select plan::text from public.subscriptions
      where user_id = p_user order by created_at desc limit 1
    ) = 'founder_lifetime' then
      v_new := v_new + public._try_unlock(p_user, 'founder_badge');
    end if;

  when 'notam' then
    v_lecciones := private.secciones_leidas(p_user, 'notam')
      >= (select c.lecciones from public.modulos_contenido c where c.modulo = 'notam');
    v_practicas := private.practicas_hechas(p_user, 'notam')
      >= (select cardinality(c.practicas) from public.modulos_contenido c where c.modulo = 'notam');
    v_aprobado := exists (
      select 1 from public.user_notam_exam_attempts where user_id = p_user and coalesce(score, 0) >= 80
    );
    if v_lecciones then v_new := v_new + public._try_unlock(p_user, 'notam_lesson'); end if;
    if v_practicas then v_new := v_new + public._try_unlock(p_user, 'notam_practice'); end if;
    if v_aprobado then v_new := v_new + public._try_unlock(p_user, 'notam_exam'); end if;
    if v_lecciones and v_practicas and v_aprobado then
      v_new := v_new + public._try_unlock(p_user, 'notam_master');
    end if;

  when 'metar' then
    v_lecciones := private.secciones_leidas(p_user, 'metar')
      >= (select c.lecciones from public.modulos_contenido c where c.modulo = 'metar');
    v_practicas := private.practicas_hechas(p_user, 'metar')
      >= (select cardinality(c.practicas) from public.modulos_contenido c where c.modulo = 'metar');
    v_aprobado := exists (
      select 1 from public.user_metar_exam_attempts where user_id = p_user and coalesce(score, 0) >= 80
    );
    if v_lecciones then v_new := v_new + public._try_unlock(p_user, 'metar_lesson'); end if;
    if v_lecciones and v_practicas and v_aprobado then
      v_new := v_new + public._try_unlock(p_user, 'metar_master');
    end if;

  when 'mercancias' then
    v_lecciones := private.secciones_leidas(p_user, 'mercancias')
      >= (select c.lecciones from public.modulos_contenido c where c.modulo = 'mercancias');
    v_practicas := private.practicas_hechas(p_user, 'mercancias')
      >= (select cardinality(c.practicas) from public.modulos_contenido c where c.modulo = 'mercancias');
    v_aprobado := exists (
      select 1 from public.user_mercancias_exam_attempts
      where user_id = p_user
        and coalesce(score, 0) >= coalesce((select total from public.module_thresholds where code = 'mercancias_pass'), 80)
    );
    if v_lecciones then v_new := v_new + public._try_unlock(p_user, 'mercancias_lesson'); end if;
    if v_practicas then v_new := v_new + public._try_unlock(p_user, 'mercancias_practice'); end if;
    if v_aprobado then v_new := v_new + public._try_unlock(p_user, 'mercancias_exam'); end if;
    if v_lecciones and v_practicas and v_aprobado then
      v_new := v_new + public._try_unlock(p_user, 'mercancias_master');
    end if;

  when 'aerodinamica' then
    v_lecciones := private.secciones_leidas(p_user, 'aerodinamica')
      >= (select c.lecciones from public.modulos_contenido c where c.modulo = 'aerodinamica');
    v_practicas := private.practicas_hechas(p_user, 'aerodinamica')
      >= (select cardinality(c.practicas) from public.modulos_contenido c where c.modulo = 'aerodinamica');
    v_aprobado := exists (
      select 1 from public.user_aerodinamica_exam_attempts
      where user_id = p_user
        and coalesce(score, 0) >= coalesce((select total from public.module_thresholds where code = 'aerodinamica_pass'), 80)
    );
    if v_lecciones then v_new := v_new + public._try_unlock(p_user, 'aerodinamica_lesson'); end if;
    if v_practicas then v_new := v_new + public._try_unlock(p_user, 'aerodinamica_practice'); end if;
    if v_aprobado then v_new := v_new + public._try_unlock(p_user, 'aerodinamica_exam'); end if;
    if v_lecciones and v_practicas and v_aprobado then
      v_new := v_new + public._try_unlock(p_user, 'aerodinamica_master');
    end if;

  when 'aerolinea' then
    if exists (
      select 1 from public.user_airline_mock_attempts
      where user_id = p_user
        and coalesce(score, 0) >= coalesce((select total from public.module_thresholds where code = 'airline_mock_pass'), 85)
    ) then
      v_new := v_new + public._try_unlock(p_user, 'airline_mock_passed');
    end if;
  end case;

  return v_new;
end
$$;

-- ── 11 · El panel ──────────────────────────────────────────────────────────
--
-- La función entera con un bloque más. El panel ya trae los tres módulos; este
-- es el cuarto.

create or replace function public.panel_tarjetas()
returns jsonb
language plpgsql
security definer
set search_path to ''
as $$
declare
  v_user uuid := auth.uid();
begin
  if v_user is null then
    raise exception 'sin_sesion' using errcode = '42501';
  end if;

  return jsonb_build_object(
    'logros', coalesce((
      select jsonb_agg(
        jsonb_build_object(
          'id', a.id, 'code', a.code, 'name', a.name, 'description', a.description,
          'icon', a.icon, 'tier', a.tier, 'unlocked_at', ua.unlocked_at
        )
        order by a.order_index
      )
      from public.achievements a
      left join public.user_achievements ua on ua.achievement_id = a.id and ua.user_id = v_user
    ), '[]'::jsonb),
    'actividad', coalesce((
      select jsonb_agg(
        jsonb_build_object('date', d.date, 'activities_count', d.activities_count, 'questions_answered', d.questions_answered)
        order by d.date
      )
      from public.daily_activity d
      where d.user_id = v_user and d.date >= current_date - 90
    ), '[]'::jsonb),
    'companeros', coalesce((
      select jsonb_agg(jsonb_build_object('username', c.username, 'current_streak', c.current_streak))
      from public.get_peers_in_stage(5) c
    ), '[]'::jsonb),
    'quiz_diario', coalesce((
      select jsonb_agg(jsonb_build_object('question_id', q.question_id, 'statement', q.statement, 'subject_name', q.subject_name))
      from public.get_daily_quiz() q
    ), '[]'::jsonb),
    'dominio', coalesce((
      select jsonb_agg(to_jsonb(m)) from public.get_subject_mastery() m
    ), '[]'::jsonb),
    'notam', jsonb_build_object(
      'lecciones', private.secciones_leidas(v_user, 'notam'),
      'practicas', private.practicas_hechas(v_user, 'notam'),
      'mejor', (select max(e.score) from public.user_notam_exam_attempts e where e.user_id = v_user)
    ),
    'metar', jsonb_build_object(
      'lecciones', private.secciones_leidas(v_user, 'metar'),
      'practicas', private.practicas_hechas(v_user, 'metar'),
      'mejor', (select max(e.score) from public.user_metar_exam_attempts e where e.user_id = v_user)
    ),
    'mercancias', jsonb_build_object(
      'lecciones', private.secciones_leidas(v_user, 'mercancias'),
      'practicas', private.practicas_hechas(v_user, 'mercancias'),
      'mejor', (select max(e.score) from public.user_mercancias_exam_attempts e where e.user_id = v_user)
    ),
    'aerodinamica', jsonb_build_object(
      'lecciones', private.secciones_leidas(v_user, 'aerodinamica'),
      'practicas', private.practicas_hechas(v_user, 'aerodinamica'),
      'mejor', (select max(e.score) from public.user_aerodinamica_exam_attempts e where e.user_id = v_user)
    ),
    'licencias', coalesce((
      select jsonb_agg(
        jsonb_build_object('id', l.id, 'license_type', l.license_type, 'custom_name', l.custom_name, 'expires_date', l.expires_date)
        order by l.expires_date
      )
      from public.licenses_held l
      where l.user_id = v_user and l.expires_date is not null
    ), '[]'::jsonb),
    'preparacion', (
      select jsonb_build_object(
        'attempts_60d', r.attempts_60d, 'avg_score_60d', r.avg_score_60d, 'best_score', r.best_score,
        'passed_recently', r.passed_recently, 'readiness_color', r.readiness_color
      )
      from public.user_pca_readiness r where r.user_id = v_user
    )
  );
end
$$;

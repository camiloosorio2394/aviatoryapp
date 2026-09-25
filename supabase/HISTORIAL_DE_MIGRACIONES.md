# Historial de migraciones

`supabase/migrations/` tiene un archivo por cada fila de
`supabase_migrations.schema_migrations` de producción —**92 y 92 al 14 de
septiembre de 2026**—, con la versión y el nombre que registró la base.

Antes de esta alineación, el repo tenía 63 archivos: 32 con una versión
inventada al escribirlos, 7 migraciones que solo existían en la base y un
archivo aplicado a mano. Un `supabase db push` habría intentado correr otra vez
lo ya aplicado.

## Cómo se mantiene

Después de aplicar una migración, el archivo se nombra con la versión que
registró la base:

```sql
select version from supabase_migrations.schema_migrations where name = '<nombre>';
```

## Versiones renombradas

Los documentos de `docs/` y los comentarios dentro de migraciones anteriores
nombran algunas por su versión vieja.

| Versión vieja | Versión en la base |
| --- | --- |
| 20260730050000_security_lockdown | 20260730050401_security_lockdown_view_and_definer_functions |
| 20260730060000_notam_module | 20260730092516_notam_module |
| 20260730070000_fix_airline_seed | 20260730095720_fix_airline_seed |
| 20260731010000_hoja_de_vida_publica | 20260731134522_hoja_de_vida_publica |
| 20260731020000_metar_progreso | 20260801020743_metar_progreso |
| 20260731030000_fix_activity_heatmap | 20260801020804_fix_activity_heatmap |
| 20260731040000_subject_mastery_desde_vault | 20260801021117_subject_mastery_desde_vault |
| 20260801010000_logros_modulo_aerolinea | 20260802004513_logros_modulo_aerolinea |
| 20260801020000_metar_practica_evaluacion | 20260802004527_metar_practica_evaluacion |
| 20260801030000_metar_master_condicion | 20260802004819_metar_master_condicion |
| 20260801040000_simulacro_aerolinea | 20260802023239_simulacro_aerolinea |
| 20260803150000_biblioteca_rac_91_121_67 | 20260803191653_biblioteca_rac_91_121_67 |
| 20260908010000_modulo_psicotecnicas | 20260910183600_modulo_psicotecnicas |
| 20260909010000_reportes_de_contenido | 20260910183616_reportes_de_contenido |
| 20260909230000_mercancias_rediseno | 20260909235155_mercancias_rediseno |
| 20260910120000_meteorologia_taf | 20260910125950_meteorologia_taf |
| 20260910190000_psico_orden_logro | 20260910184045_psico_orden_logro |
| 20260911010000_meteorologia_teoria_del_clima | 20260911015546_meteorologia_teoria_del_clima |
| 20260911040000_seguridad_banco_pca_logros_rachas | 20260911131201_seguridad_banco_pca_logros_rachas |
| 20260911060000_permisos_por_columna_y_validaciones | 20260911143419_permisos_por_columna_y_validaciones |
| 20260911080000_evaluaciones_en_el_servidor | 20260911145550_evaluaciones_en_el_servidor |
| 20260911100000_intentos_solo_desde_el_servidor | 20260911153640_intentos_solo_desde_el_servidor |
| 20260911120000_wingman_limites_en_el_servidor | 20260911154748_wingman_limites_en_el_servidor |
| 20260911140000_psicotecnicas_en_el_servidor | 20260911161250_psicotecnicas_en_el_servidor |
| 20260911160000_intentos_psico_solo_desde_el_servidor | 20260911164937_intentos_psico_solo_desde_el_servidor |
| 20260911170000_rls_por_consulta_indices_y_permisos | 20260911165258_rls_por_consulta_indices_y_permisos |
| 20260911180000_progreso_por_rpc_y_minimo_privilegio | 20260911170254_progreso_por_rpc_y_minimo_privilegio |
| 20260911190000_icao_quiz_corregido_en_el_servidor | 20260911171206_icao_quiz_corregido_en_el_servidor |
| 20260911193000_icao_quiz_solo_desde_el_servidor | 20260911172904_icao_quiz_solo_desde_el_servidor |
| 20260911200000_permisos_minimos_y_nada_abierto_por_defecto | 20260911173659_permisos_minimos_y_nada_abierto_por_defecto |
| 20260911210000_comunidad_autores | 20260911182957_comunidad_autores |
| 20260911213000_quitar_get_profile_avatars | 20260911184420_quitar_get_profile_avatars |

## Recuperadas de la base

Estas corrieron en producción sin que su archivo llegara al repo. Su texto sale de
`schema_migrations.statements` y coincide byte a byte (md5):
`20260730212438_official_bank_private_bucket`, `20260730221454_pca_stats_rpc`,
`20260730224634_pca_stats_with_exam_date`, `20260802221339_biblioteca_por_modulos`,
`20260802222743_biblioteca_acentos`, `20260802222843_logros_acentos` y
`20260802231442_biblioteca_estante`.

Tres más aparecen dos veces en la base, con el mismo contenido las dos veces:
`20260802221108_modulo_mercancias`, `20260802221133_icao_speaking` y
`20260802221500_fix_search_path_bump_library_views`. Su archivo es copia del de la
primera aplicación, con una cabecera que lo dice.

## Archivos cuyo texto no es idéntico al que corrió

Se compararon sin comentarios ni espacios. Estos difieren, y el archivo describe
el estado real de producción:

- **Comentarios.** 13 archivos tienen comentarios que no se enviaron al aplicarlos.
- **Tildes.** `logros_modulo_aerolinea`, `metar_practica_evaluacion` y
  `simulacro_aerolinea` se aplicaron sin tildes; `logros_acentos` y
  `biblioteca_acentos` corrigieron los textos después.
- **Guarda.** `20260911015546_meteorologia_teoria_del_clima` quedó envuelta en una
  guarda para que volver a correrla no desplace otra vez el progreso.
- **Aplicado a mano.** El `update` de `community_channels` al final de
  `20260801021117_subject_mastery_desde_vault` no está en el historial, pero
  producción ya tiene ese texto.

## Las dos que faltaban en el historial (cerrado el 14 de septiembre de 2026)

Había dos archivos en el repo sin fila en `schema_migrations`. Se compararon
las 90 filas de producción contra los 92 archivos del repo, uno por uno:

| Versión | Estaba aplicada | Qué se hizo |
| --- | --- | --- |
| `20260911030000_meteorologia_orden_por_niveles` | Sí | Solo registrarla |
| `20260911210000_meteorologia_evaluacion_seis_niveles` | **No** | Aplicarla y registrarla |

La primera se había corrido en el SQL Editor: su marca está en producción, el
comentario de `user_metar_progress.lesson_screens` dice `[orden por niveles]`.

La segunda **nunca se había corrido**, y con ella tampoco se había cargado el
banco de Meteorología: producción seguía con las 20 preguntas del código METAR
y sorteaba 20 de 20, mientras la app anunciaba «25 al azar de 104». Se cargó el
banco con `scripts/bancos/sembrar.mjs`, se corrieron sus dos `update` y se
comprobó con md5 que los cinco bancos de producción son los de
`contenido/bancos/`. `supabase/tests/progreso_y_evaluaciones.sql` ahora lo
vigila con `bancos_como_en_el_repo` y `la_muestra_es_muestra`.

Hoy hay **92 filas y 92 archivos**, sin sobrantes por ningún lado.

### Cómo se registra una que se aplicó por fuera

Con el CLI enlazado al proyecto:

```bash
supabase migration repair --status applied <version>
```

Es equivalente a insertar su fila en `supabase_migrations.schema_migrations`
(`version` y `name`, sin `statements`, que es lo que deja el propio comando).
Antes de registrarla hay que **comprobar que de verdad está aplicada**: si no lo
está, marcarla hace que `db push` la salte para siempre. Eso es exactamente lo
que llevaba tres días pasando con la evaluación de Meteorología.

## 24 de septiembre de 2026: las ocho que estaban pendientes

Se aplicaron por el conector de Supabase, en orden, contra producción:

| Versión de archivo | Nombre | Qué trae |
| --- | --- | --- |
| 20260914230000 | modulo_aerodinamica | **ya estaba corrida a mano** desde el 14; solo se registró |
| 20260915120000 | postulaciones | la tabla, su disparador y sus políticas |
| 20260915120500 | aviso_de_postulacion | el valor nuevo del enum de notificaciones |
| 20260915121000 | seguimiento_de_postulaciones | la función del recordatorio y su tarea de cron |
| 20260915140000 | panel_completo | `plan` y `postulaciones` en el panel |
| 20260915230000 | evaluacion_de_aeropuertos | intentos, reglas, fuente y la rama del CASE |
| 20260916000000 | progreso_de_aeropuertos | progreso, catálogo, umbrales, RPC, logros y disparadores |
| 20260926000000 | modulo_performance | lo mismo para Performance |
| 20260926010000 | panel_y_logros_con_los_seis_modulos | las tres funciones compartidas, completas |

Aerodinámica estaba aplicada pero sin registrar: sus tablas, su fila del
catálogo, sus cuatro logros y sus ramas en las funciones compartidas ya estaban
en la base. Se comprobaron una a una antes de registrarla.

Las de Aeropuertos y Performance se aplicaron **sin** sus copias de
`desbloquear_logros`, `check_and_unlock_achievements` y `panel_tarjetas`, para no
publicar tres veces seguidas la misma función pisándose a sí misma. Esas tres las
publica entera y una sola vez `20260926010000`.

El conector registra cada migración con la hora en que la corre, no con la
versión del nombre de archivo, así que en `schema_migrations` hay dos filas por
cada una: la del conector (`20260924203326` y siguientes) y la de la versión de
archivo, insertada después para que `db push` no las vea pendientes.

### La regla del orden, que es la que muerde

<!-- ULTIMA_APLICADA: 20260929000000 -->

**Toda migración nueva lleva una versión posterior a `20260929000000`.**

No es burocracia. Seis funciones se republican enteras en cada migración de
módulo —`private.secciones_leidas`, `private.practicas_hechas`,
`private.desbloquear_logros`, `public.check_and_unlock_achievements`,
`public.evaluacion_terminar` y `public.panel_tarjetas`— y en la base manda la
última que se corre. Una migración con versión anterior a la última aplicada se
corre igual, *después*, y deja su versión de esas funciones encima de la buena.
Sin error: la evaluación del módulo perdido revienta al terminar el intento, su
progreso cuenta cero y su tarjeta desaparece del panel.

`scripts/migraciones/funciones-compartidas.test.ts` comprueba las dos cosas: que
la última migración que publica cada función conoce todos los módulos del
catálogo, y que no hay archivos pendientes con versión anterior a la marca de
arriba. Al aplicar una tanda, se actualiza esa marca.

## 25 de septiembre: Comunicaciones, RAC y Combustible, y la marca al día

La marca se había quedado en `20260926010000` mientras la base ya iba por
`20260928000000`. Lo que pasó en medio:

- Las tres de Comunicaciones ATC (`20260927000000`, `20260927010000` y
  `20260927020000`) se aplicaron y nadie movió la marca.
- `20260928000000_modulos_rac_y_combustible.sql` se aplicó por el conector, en
  cuatro tramos (`modulos_rac_y_combustible_1` a `_4`), y después se insertó la
  fila de la versión de archivo para que la carpeta y el historial coincidan.

**Dos sesiones montaron RAC y Combustible a la vez**, cada una con su migración
y el mismo nombre de archivo. La que quedó en el repo es la del PR #274. La que
se había aplicado era la otra. Se compararon antes de tocar nada: las seis
funciones compartidas resultaron idénticas una vez quitados comentarios y
espacios, y el catálogo también (rac 19 lecciones y 54 prácticas, combustible
23 y 66, con las mismas claves). Solo faltaban dos umbrales de lección
(`rac_lesson`, `combustible_lesson`) y los textos de los ocho logros, que se
aplicaron aparte (`alinear_rac_y_combustible_con_el_pr_274`).

Comprobado contra la base ya migrada: las seis funciones nombran los nueve
módulos, `panel_tarjetas` conserva `plan`, `postulaciones`, `licencias` y
`preparacion`, y umbrales, logros y evaluaciones coinciden con el repo.

`supabase db push` sigue sin servir: el conector registró sus migraciones con la
hora a la que las corrió, así que el CLI ve versiones remotas que no existen en
la carpeta y se niega a seguir. Se aplica por el editor de SQL o por el
conector.

Los dos bancos, `rac_evaluacion` (50 preguntas) y `combustible_evaluacion`
(40), quedaron sembrados el mismo día, en tramos de catorce preguntas porque el
conector no traga el archivo entero. Se comprobaron con una huella md5 sobre
`id|enunciado|correcta`, calculada igual en Postgres y en node: las dos
coincidieron exactas.

## 25 de septiembre: RVSM

`20260929000000_modulo_rvsm.sql` es el décimo módulo. Se aplicó por el conector
en cinco tramos, y después se insertó la fila de la versión de archivo:

| Tramo | Qué trae |
| --- | --- |
| `modulo_rvsm_1_tablas_catalogo_y_evaluacion` | las dos tablas de piloto, sus políticas, la fila del catálogo, la evaluación y su fuente |
| `modulo_rvsm_2_conteos` | `private.secciones_leidas` y `private.practicas_hechas`, enteras |
| `modulo_rvsm_3_evaluacion_terminar` | `public.evaluacion_terminar`, entera |
| `modulo_rvsm_4_desbloquear_logros` | los cuatro logros y `private.desbloquear_logros` |
| `modulo_rvsm_5_panel_y_repaso` | `public.check_and_unlock_achievements` y `public.panel_tarjetas` |

`private.desbloquear_logros` pasa de las trescientas líneas y transcribirla a
mano era el camino con más riesgo, así que el tramo 4 la lee con
`pg_get_functiondef`, inserta sus dos bloques nuevos con una aserción por
bloque y la vuelve a publicar. Si el texto que espera no está, el bloque falla y
no escribe nada.

Comprobado contra la base ya migrada: las seis funciones compartidas nombran los
diez módulos, `panel_tarjetas` conserva `plan`, `postulaciones`, `licencias` y
`preparacion`, y `desbloquear_logros` desbloquea los cuatro logros de RVSM
leyendo `user_rvsm_exam_attempts` con el umbral `rvsm_pass`.

El banco `rvsm_evaluacion` (40 preguntas) se sembró en tres tramos más su
cierre, con la misma huella md5 de los otros dos: `19c940ed…` en la base y en el
archivo.

La evaluación había quedado con `modulo_leccion` en null, o sea que abría sin la
lección completa. Todas las que dan nota la exigen, así que se corrigió en el
archivo y en la base (`puerta_de_leccion_de_rvsm`).

`supabase/tests/rvsm.sql` se corrió contra la base ya migrada y pasó:
`PRUEBA_DESHECHA` con los veintiún puntos, y nada quedó escrito.

**Ojo con RAC y Gestión del combustible**: el archivo del repo les pone
`modulo_leccion`, pero en la base están en null, porque lo aplicado fue la
migración de la otra sesión. Sus dos evaluaciones abren hoy sin la lección
completa, y por eso `supabase/tests/rac_y_combustible.sql` falla en su primera
comprobación. Se arregla con un update de dos líneas, pero **es un cambio de
comportamiento para quien ya esté a medio módulo**, así que se decide aparte.

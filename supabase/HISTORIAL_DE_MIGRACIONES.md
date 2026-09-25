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

## Las tres de Comunicaciones ATC (verificadas el 24 de septiembre de 2026)

`20260927000000_progreso_de_comunicaciones`, `20260927010000_evaluacion_de_comunicaciones`
y `20260927020000_panel_y_logros_de_comunicaciones` están aplicadas en producción:
se comprobó en `schema_migrations` el 24 de septiembre. Desde entonces la última
aplicada es `20260927020000`. Entre `010000` y `020000` quedaron publicadas las
seis funciones compartidas con los siete módulos del catálogo.

### La regla del orden, que es la que muerde

<!-- ULTIMA_APLICADA: 20260929120000 -->

**Toda migración nueva lleva una versión posterior a `20260929120000`.**

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

### La excepción: lo que ya se aplicó por debajo de la marca

<!-- APLICADAS_BAJO_LA_MARCA: 20260925152412 20260925152815 -->

El peligro de arriba es de las migraciones **pendientes**: la base las correría
después de las que ya tiene. Una que ya está aplicada no se vuelve a correr
nunca, así que no puede quedar encima de nada.

Y eso pasa cada vez que se aplica por el conector, porque **el conector registra
la versión con la fecha real** y las migraciones de módulo de este repo van
numeradas con fechas adelantadas. Una aplicada hoy queda por debajo de la marca
sin que nada esté mal.

Las versiones de esa lista quedan fuera de la comprobación. Para entrar ahí,
una versión tiene que estar **de verdad aplicada** en
`supabase_migrations.schema_migrations` y tener su archivo en el repo: la prueba
exige el archivo, y quien la agregue se compromete a lo primero. Si una
migración sigue pendiente, **no va en esta lista**: se renombra con una versión
posterior a la marca, que es lo que pide el mensaje de la prueba.

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

Los bancos `rac_evaluacion` (50 preguntas) y `combustible_evaluacion` (40)
quedaron sembrados el mismo día, en tramos de catorce preguntas porque el
conector no traga el archivo entero. Se comprobaron con una huella md5 sobre
`id|enunciado|correcta`, calculada igual en Postgres y en node: las dos
coincidieron exactas.

Quedaron dos diferencias con el repo, que arregla
`20260930000000_evaluacion_entrega_el_tema_del_banco` (pendiente de correr):
las dos evaluaciones sin `modulo_leccion` y el catálogo de Combustible con 66
prácticas en vez de 76 (sin los diez escenarios). Ver
`docs/RAC_COMBUSTIBLE_ESTADO.md`, «La base».

Y la rama `claude/modulo-mel` traía tres migraciones que empezaban en
`20260928000000`, la misma versión que la de RAC y Combustible. Se renumeraron a
`20261001000000`, `20261001010000` y `20261001020000`, por encima de todo lo de
main (incluida `20260930000000`, pendiente), y sus funciones compartidas se
copiaron de la última que las publica, `20260929120000_modulo_pbn`, con la rama
de MEL. Pendientes de correr: el orden está en `docs/MEL_ESTADO.md`.

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

## 25 de septiembre: PBN

`20260929120000_modulo_pbn.sql` es el módulo once, y el más grande: 52
capítulos, 156 preguntas de práctica y un banco de 50. Se aplicó por el conector
en tres tramos, y después se insertó la fila de la versión de archivo:

| Tramo | Qué trae |
| --- | --- |
| `modulo_pbn_1_tablas_catalogo_y_evaluacion` | las dos tablas de piloto, sus políticas, la RPC, la fila del catálogo, los umbrales, la evaluación con su fuente y los cuatro logros |
| `modulo_pbn_2_funciones_compartidas` | cinco de las seis funciones compartidas |
| `modulo_pbn_3_desbloquear_logros` | `private.desbloquear_logros` y los dos disparadores |

**Las seis funciones compartidas no se transcribieron.** El tramo 2 recorre una
lista de cinco pares (ancla, texto nuevo), lee cada función con
`pg_get_functiondef`, comprueba que el ancla está y que `pbn` **no** está
todavía, y la vuelve a publicar con la rama añadida. El tramo 3 hace lo mismo
con `desbloquear_logros`, que pasa de las trescientas líneas, insertándole dos
bloques. Si el texto que espera no está, el bloque falla y no escribe nada. Es
la misma técnica de RVSM, ahora para las seis y no solo para una.

La versión va **entre** la última aplicada (`20260929000000`) y la que sigue
pendiente de correr (`20260930000000`), para no dejar un archivo pendiente por
debajo de la marca.

Comprobado contra la base ya migrada: las seis funciones compartidas nombran los
once módulos del catálogo, `panel_tarjetas` conserva `plan`, `postulaciones`,
`licencias` y `preparacion`, y `desbloquear_logros` desbloquea los cuatro
logros de PBN leyendo `user_pbn_exam_attempts` con el umbral `pbn_pass`.

El banco `pbn_evaluacion` (50 preguntas) se sembró en cuatro tramos, con la
huella md5 de siempre: `a2ed9531…` en la base y en el archivo.

`supabase/tests/pbn.sql` se corrió contra la base ya migrada y pasó:
`PRUEBA_DESHECHA` con los veintiún puntos, y nada quedó escrito.

## 25 de septiembre, después: PBN queda en 48 capítulos

La auditoría del módulo encontró cinco pares de capítulos que enseñaban lo
mismo, un tema que faltaba y un banco que solo examinaba 35 de los 52. Se
fusionaron los cinco pares, entró un capítulo nuevo sobre cómo se vuela a una
MDA y el banco pasó de 50 a 66 preguntas, con al menos una por capítulo. El
módulo queda en **48 capítulos, 144 preguntas de práctica y banco de 66**.

Eso movió cuatro cosas en la base, en cinco filas del historial:

| Fila | Archivo | Qué hizo |
| --- | --- | --- |
| `20260925152412_catalogo_pbn_48_lecciones` | sí | la fila del catálogo: 48 lecciones y las 144 claves |
| `20260925152549_banco_pbn_1_remapear_tema_a_48_capitulos` | no, es siembra | el `tema` de las 50 preguntas que ya estaban, a la numeración nueva |
| `20260925152651_banco_pbn_2_nuevas_ev51_a_ev58` | no, es siembra | ocho preguntas nuevas |
| `20260925152737_banco_pbn_3_nuevas_ev59_a_ev66` | no, es siembra | las otras ocho |
| `20260925152815_umbral_leccion_pbn_48` | sí | `module_thresholds.pbn_lesson`, de 52 a 48 |

**El umbral es la mitad que se olvida.** `evaluacion_iniciar` compara las
secciones leídas contra `pbn_lesson`. Con el catálogo en 48 y el umbral en 52 la
evaluación no habría abierto nunca, porque el piloto puede leer 48 como máximo.

**Las tres filas de banco no llevan archivo**, como las demás siembras: las
preguntas traen su respuesta y el contenido se edita en `contenido/bancos/` y se
carga con `node scripts/bancos/sembrar.mjs`. Aquí se aplicaron por el conector,
que registra fila, y por eso quedan anotadas.

**No se tocó ninguna función compartida**, así que la regla del orden no aplica y
la marca se queda en `20260929120000`: estas cinco versiones son **anteriores**
a la marca y ya están aplicadas, que es la situación válida. La que sigue
pendiente sigue siendo `20260930000000`.

Antes de aplicar se comprobó que **nadie tenía progreso de PBN**: cero filas en
`user_pbn_progress`, cero en `user_pbn_exam_attempts` y cero sesiones de
`pbn_evaluacion`. Renumerar capítulos con progreso guardado habría dejado a cada
piloto apuntando a otro capítulo; hoy no costó nada y después del despliegue sí.

Comprobado contra la base:

- Las 50 preguntas que ya estaban **no cambiaron de texto**: se comparó la huella
  md5 de enunciado, opciones, correcta, explicación y referencia antes de
  remapear el tema, y daba lo mismo en la base y en el repo
  (`2fa59b1c…`). Solo cambió a qué capítulo apuntan.
- Con las 66 sembradas, las dos huellas coinciden con el archivo: texto
  `0b091807…` y temas `0b0d8774…`. 66 activas, 0 inactivas, los 48 capítulos
  cubiertos.
- `supabase/tests/pbn.sql` se actualizó a 48, 144 y 66. Además se corrió una
  prueba del delta contra la base, que terminó en `PRUEBA_DESHECHA` con sus
  cinco puntos y sin dejar una fila: catálogo y umbral, banco de 66 cubriendo los
  48, la RPC aceptando la lección 48 y rechazando la 49 y `p49-q1`, la puerta
  cerrada con 47, y el panel informando 48.

**El PR #277 se mergeó con una migración en la misma versión que RVSM**
(`20260929000000_evaluacion_entrega_el_tema_del_banco`), escrita sin saber que
RVSM ya estaba aplicado. La versión `20260929000000` la tiene registrada la base
para `modulo_rvsm`, así que la otra, que está pendiente de correr, se renumeró a
`20260930000000` y la marca de arriba pasó a `20260929000000`. Cuando se corra,
hay que mover la marca otra vez.

## 25 de septiembre, noche: el banco de PBN deja de regalar la respuesta

En el banco de 66, la opción correcta era la más larga en el 94 % de las
preguntas y estaba en la B en el 94 %. Un piloto que marcara siempre la más
larga aprobaba sin haber leído nada. Se reescribieron las cuatro opciones de
las 66 (y de las 144 de práctica, que tenían el mismo vicio en el 86 %) y se
repartió la correcta entre las cuatro letras y los cuatro puestos de largo.
Quedó así: en el banco la mejor estrategia a ciegas acierta el 26 %, y en la
práctica el 25 %.

Dos filas en el historial, las dos de siembra y sin archivo:

| Fila | Qué hizo |
| --- | --- |
| `20260925200759_banco_pbn_4_opciones_sin_sesgo_1` | `opciones` y `correcta` de `ev-01` a `ev-33` |
| `20260925200841_banco_pbn_4_opciones_sin_sesgo_2` | lo mismo de `ev-34` a `ev-66` |

No cambió ningún enunciado, explicación, referencia ni tema. Antes de aplicar
se comprobó que **no había ninguna sesión de `pbn_evaluacion`** en
`evaluacion_sesiones` (abierta ni cerrada) ni intentos en
`user_pbn_exam_attempts`: cambiar la letra correcta con un examen a medias
habría calificado mal ese intento.

Comprobado contra la base: 66 activas, y la huella md5 de id, enunciado,
correcta, explicación, referencia y opciones da `4c4478c2…` en la base y en
`contenido/bancos/pbn_evaluacion.json`.

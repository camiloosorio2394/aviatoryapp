# Historial de migraciones

`supabase/migrations/` tiene un archivo por cada fila de
`supabase_migrations.schema_migrations` de producción (72 al 11 de septiembre de
2026), con la versión y el nombre que registró la base. Hay además un archivo
que se aplicó a mano y no está en ese historial (ver abajo).

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

## Aplicada a mano, fuera del historial

`20260911030000_meteorologia_orden_por_niveles` se corrió en el SQL Editor. Su
marca está en producción: el comentario de `user_metar_progress.lesson_screens`
dice `[orden por niveles]`. Para registrarla sin volver a correrla, con el CLI
enlazado al proyecto:

```bash
supabase migration repair --status applied 20260911030000
```

Si se vuelve a correr, no mueve nada: su propia guarda revisa esa marca.

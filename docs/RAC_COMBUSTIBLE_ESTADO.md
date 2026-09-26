# Módulos «RAC» y «Gestión del combustible» · estado del trabajo

**Para quien retome esto** (incluida una sesión futura de Claude Code): qué está
hecho, qué falta correr en la base y qué queda pendiente. Actualízalo al
terminar cada paso.

## Qué son

Dos temas nuevos de «Ingreso a aerolínea», con la misma casa que los demás:
hub con tres puertas (Aprende, Practica, Evalúate), el lector compartido
(`LectorLeccion`), la práctica con corrección inmediata y la evaluación con el
banco en el servidor.

| | RAC | Gestión del combustible |
|---|---|---|
| Ruta | `/app/aerolinea/rac` | `/app/aerolinea/combustible` |
| Lección | 19 unidades en 5 bloques, 116 min | 23 capítulos en 3 partes, 151 min |
| Práctica | 54 preguntas (`u05-q2`) | 66 preguntas (`c06-q1`) y 10 escenarios (`esc-03`) |
| Evaluación | 20 al azar de 50, aprueba con 80 | 20 al azar de 40, aprueba con 80 |
| Acento | grafito pizarra `#3D4958` (`--av-rac-*`, `.lector-rac`) | azul queroseno `#005071` (`--av-cb-*`, `.lector-cb`) |
| Fuente editorial | `docs/contenido/rac.md` | `docs/contenido/gestion-combustible.md` |

## De dónde sale cada cosa

Los documentos de `docs/contenido/` son la fuente. Todo lo demás se genera:

```
node scripts/rac/convertir.mjs          # racLeccion.ts, racPractica.ts, contenido/bancos/rac_evaluacion.json
node scripts/combustible/convertir.mjs  # combustibleLeccion.ts, combustiblePractica.ts, contenido/bancos/combustible_evaluacion.json
```

Si cambia el contenido: se corre el convertidor, luego
`ACTUALIZAR_CATALOGO=1 npx vitest run scripts/catalogo` si cambiaron las claves
de práctica, y `node scripts/bancos/sembrar.mjs <banco>` si cambió el banco.
`src/lib/racContenido.test.ts` y `src/lib/combustibleContenido.test.ts` fallan
si lo generado ya no cuadra con el documento.

**Las preguntas no van en las lecciones** (regla de Camilo): el quiz de cada
unidad o capítulo es la práctica, y el quiz final es la evaluación del servidor.
Los diez escenarios del capítulo 23 son `piensaComoPiloto` con `clave`: abrir
la respuesta cuenta como práctica hecha.

## Qué se hizo

- **Contenido** auditado contra los RAC de la Aerocivil (descargados el
  24-sep-2026) y contra RAC 121, OACI (Anexo 6, Doc 9976) y FAA para
  combustible. Las claves de las 210 preguntas (54 y 50 de RAC, 66 y 40 de
  combustible) las revisaron agentes independientes: cero errores de clave. Las explicaciones no nombran letras,
  porque el servidor baraja las opciones.
- **Combustible sin EASA** (25-sep-2026): Camilo decidió que EASA no es fuente
  del módulo, igual que en PBN, RVSM y ETOPS. Lo que se apoyaba en ella se
  reescribió con el Anexo 6, la FAA o el RAC 121, o se quitó (la cuota europea de
  tankering); `c09-q2` y `ev-10` se reescribieron con su mismo tema, y
  `combustibleContenido.test.ts` falla si EASA o sus otros nombres vuelven a la
  lección, la práctica, el hub o el banco. En el mismo cambio, las opciones del
  banco y de la práctica dejaron de delatar la correcta por su largo.
- **App**: `src/lib/rac.ts` y `src/lib/combustible.ts` (rutas, conteos,
  resumen), sus `*Progress.ts` sobre el progreso común, las pantallas
  (`Rac*.tsx`, `Combustible*.tsx`), las rutas en `App.tsx`, las tarjetas en
  `AirlinePrep.tsx` (con su hueco de portada), los temas del lector en
  `index.css` y las reglas de contenido pesado en `eslint.config.js`.
- **`PracticaQuiz`** (`src/components/modulo/PracticaQuiz.tsx`): la pantalla de
  práctica de opción múltiple, compartida. Filtro por unidad, avance, salto a
  cualquier pregunta, corrección al instante con la explicación, el numeral y
  el enlace para repasar la unidad. Un módulo nuevo con preguntas de práctica
  la configura; no escribe otra.
- **Dos arreglos al lector compartido**, que también le sirven a Performance:
  - Sin portada automática, el primer bloque solo sale de la columna si es una
    imagen (`figura` o `hueco`). Un párrafo de entrada salía más ancho que el
    resto del texto; pasaba también en las 40 lecciones de Performance.
  - En la ficha «Piensa como piloto», la pestaña le deja su sitio a la píldora
    («Escenario de práctica»): un momento largo pasaba por debajo de ella.
- **Base**: una sola migración para los dos,
  `supabase/migrations/20260928000000_modulos_rac_y_combustible.sql`
  (por qué una sola: en su cabecera). Semillas de los bancos en
  `supabase/seeds/`. Prueba en `supabase/tests/rac_y_combustible.sql` y casos
  nuevos en `logros.sql`.

## La base

**Aplicado** (lo hizo otra sesión, ver
`supabase/HISTORIAL_DE_MIGRACIONES.md`, «25 de septiembre»): la migración
`20260928000000_modulos_rac_y_combustible.sql` y los dos bancos. Comprobado
contra la base el 24-sep, solo leyendo: `rac_evaluacion` con 50 preguntas
activas y `combustible_evaluacion` con 40, las dos con su tema.

Lo que se aplicó no era exactamente el archivo del repo (dos sesiones montaron
lo mismo a la vez). Quedaron dos diferencias, que arregla la migración de abajo:

- `rac_evaluacion` y `combustible_evaluacion` sin `modulo_leccion`: el
  servidor no exigía la lección completa, solo la pantalla.
- El catálogo de Combustible con 66 prácticas y no 76: faltaban los diez
  escenarios (`esc-01` a `esc-10`), así que la base rechazaba esas marcas y
  ese avance quedaba solo en el navegador.

**Falta correr** `supabase/migrations/20260930000000_evaluacion_entrega_el_tema_del_banco.sql`,
que además hace que la evaluación entregue el tema de cada pregunta (ver
«Los temas a repasar», abajo). No depende de nada más. Cada paso en su propia
ejecución del SQL Editor:

| # | Qué se pega en el SQL Editor | Resultado esperado |
|---|---|---|
| 1 | `supabase/migrations/20260930000000_evaluacion_entrega_el_tema_del_banco.sql` | Sin error. Si dice «evaluacion_iniciar en la base no es la de 20260911194440», alguien la cambió: no se aplica nada y hay que comparar |
| 2 | `supabase/tests/evaluacion_temas.sql` | `PRUEBA_DESHECHA funcion_y_permisos rac_y_combustible_como_el_repo rac_cerrada_con_18 rac_con_tema combustible_con_tema aerodinamica_con_tema performance_con_tema notam_sin_tema simulacro_con_etiqueta` |
| 3 | `supabase/tests/rac_y_combustible.sql`, `logros.sql`, `permisos.sql`, `panel.sql`, una por ejecución | Cada una en `PRUEBA_DESHECHA …` |

Lo que tiene que decir `rac_y_combustible.sql`, por cada módulo (`rac:` y
`combustible:`): `catalogo_N_y_umbrales reglas_20_y_80 banco_N_bien_formado
permisos leccion_fuera leccion_cero practica_inventada clave_ajena
rpc_idempotente sin_update_directo sin_intento_a_mano puerta_cerrada_con_N-1
puerta_abierta_con_N terminar_escribe_en_su_tabla sin_sesion conteos
logros_los_cuatro`, y al final `modulos_de_antes terminar_enruta_a_todos
panel_con_los_nueve grupos_de_logros`. Antes de la migración de arriba falla en
la evaluación de RAC (sin lección exigida) o en el catálogo de Combustible: es
lo esperado. **Las dos pruebas se escribieron sin base donde correrlas**: si
fallan por un nombre o un tipo, se corrige la prueba; si por una regla, la
migración.

Después de aplicar, el archivo se renombra con la versión que registró la base:

```sql
select version, name from supabase_migrations.schema_migrations
where name = 'evaluacion_entrega_el_tema_del_banco';
```

y `ULTIMA_APLICADA` sube en `supabase/HISTORIAL_DE_MIGRACIONES.md`.

### Los temas a repasar

Cada pregunta de los bancos de RAC y Combustible lleva su unidad o capítulo en
los metadatos (`U05`, `C16`), y las pantallas de evaluación saben convertirlo
en «RAC 91» o «Capítulo 16» con su enlace. Pero `evaluacion_iniciar` entregaba
como tema solo la etiqueta de la fuente, que solo tiene el simulacro: en los
módulos de un solo banco el tema llegaba nulo y el resultado nunca decía qué
repasar. Pasaba igual en Aerodinámica (`S04`) y Performance (`12`), que ya
estaban en producción, y en RVSM (`R07`).

La migración cambia esa sola línea: `coalesce(ef.etiqueta, bp.metadatos ->> 'tema')`.
Los demás no cambian: los bancos de NOTAM, Meteorología, Mercancías, Aeropuertos
y Comunicaciones no traen tema, y el simulacro conserva su etiqueta. La prueba
comprueba las dos cosas.

## Pendiente

- [x] **Fase 1, RAC:** foto del tema, hero y tres tarjetas del hub en WebP.
- [x] **Fase 2, Combustible:** foto del tema, hero y tres tarjetas del hub en WebP.
- [ ] **Imágenes.** El tema y el hub de RAC y de Combustible ya tienen sus cinco
      fotos cada uno. Las lecciones
      no tienen portada (`portadaAuto: false`); cuando existan, van a
      `public/modulos/rac/leccion-NN.webp` y
      `public/modulos/combustible/leccion-NN.webp` y se quita ese `false`.
      Combustible tiene además 15 figuras con hueco rotulado dentro de los
      capítulos (`CB_FIGURAS_PENDIENTES`).
- [ ] **Video de apertura** de cada módulo, con la serie de HyperFrames (ver
      CLAUDE.md, «Trampa del idioma de la voz»).
- [ ] **Correr la migración de los temas** (arriba, «La base»). En cuanto
      esté, el resultado de la evaluación de RAC, Combustible, Aerodinámica y
      Performance dice qué unidades repasar, sin tocar la app.
- [ ] **Volver a sembrar `combustible_evaluacion`**, que cambió el 25-sep
      (sin EASA y con las opciones parejas): se pega
      `supabase/seeds/combustible_evaluacion.sql` en el SQL Editor.

## La lectura de RAC: de 3 a 8 minutos por unidad

El encargo pedía **3 a 8 minutos de lectura por RAC**, y seis unidades se
pasaban: RAC 2 (~13), RAC 121 (~12), RAC 91 (~12), RAC 1 (~10), RAC 61 y RAC 67
(~9). Partirlas en dos no cumplía el encargo, que es por RAC, y habría cambiado
el catálogo de la base. Se hizo lo que pide la casa (CLAUDE.md, «Cómo se enseña
aquí»): **el detalle de la norma baja a un bloque plegado**, que no compite con
lo que el piloto tiene que saber y se abre a demanda. No se borró nada.

- En `docs/contenido/rac.md`, `#### Detalle · …` pliega lo que sigue hasta el
  próximo apartado (`detalleTecnico` en la app). Hay 35 pliegues.
- Lo que se pliega es lo que un piloto de línea consulta y no memoriza: el
  reparto de horas por fase, los formatos de chequeo, las tablas por sector del
  Apéndice 18, los documentos a bordo, lo de alumno y piloto privado, la
  convalidación. **No se plegó nada que pregunten la práctica o la
  evaluación**: en las 45 preguntas (de práctica y de evaluación) de las
  unidades que tienen pliegues, el numeral que cita cada una está en el texto
  visible de su unidad (se comprobó con un cruce automático).
  Por eso siguen a la vista, por ejemplo, la recencia del PTL, el
  emparejamiento de tripulaciones nuevas, el descanso controlado y las
  categorías de aproximación del RAC 1.
- `scripts/rac/convertir.mjs` calcula los minutos con el texto visible (230
  palabras por minuto, el ritmo con el que se habían estimado las fichas) y
  **falla** si la ficha dice otra cosa o si una unidad sale de 3 a 8. La única
  excepción es el RAC 210, una ficha de ~2 min: rellenarla sería meter lo que
  al piloto no le toca. Las otras fichas (RAC 203, 119 y 4) ya dan 3 minutos.
- El módulo pasa de 134 a 116 minutos.

Lo demás que se había anotado como simplificación del convertidor ya estaba
resuelto: la cursiva del documento pasa a negrita (no se pierde), las sublistas
se unen a su ítem con punto y coma, y los «Anexo» que aparecen en las lecciones
son los de la OACI, no referencias al anexo del documento.

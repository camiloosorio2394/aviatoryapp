# Módulo «Comunicaciones aeronáuticas y gestión ATC» · estado del trabajo

**Para quien retome esto** (incluida una sesión futura de Claude Code que
arranque sola): este archivo dice qué está hecho y qué sigue. Actualízalo al
terminar cada paso.

## Qué es

Módulo nuevo de «Ingreso a aerolínea»: **69 lecciones en 8 niveles** (los 68
capítulos de la especificación de Camilo y el repaso «50 frases» como lección
69), con el lector compartido (`LectorLeccion`).

El objetivo, en palabras de la especificación: que el piloto termine capaz de
**escuchar, interpretar, confirmar y responder** correctamente a una
comunicación ATC. No es un curso de inglés general ni una lista de fraseología.

**La norma es OACI** (Anexo 10 Vol. II, Doc 4444, Doc 9432). Lo que sea de un
Estado o de un explotador se dice como tal; lo que no tenga fuente cargada va
con un callout `verificar`.

| Nivel | Nombre | Lecciones |
|---|---|---|
| 1 | Fundamentos | 01 a 07 |
| 2 | El idioma | 08 a 11 |
| 3 | Autorizaciones y superficie | 12 a 18 |
| 4 | En ruta y llegada | 19 a 30 |
| 5 | Vigilancia, contingencias y emergencias | 31 a 40 |
| 6 | Data link y operación oceánica | 41 a 50 |
| 7 | Situaciones no normales y factores humanos | 51 a 61 |
| 8 | Práctica y repaso | 62 a 69 |

## Plan, en orden

- [x] **1. Infraestructura** (25-sep-2026). Ver «Qué se hizo» abajo.
- [ ] **2. Contenido**, nivel por nivel, desde `docs/comunicaciones/nivel-N.md`
      hacia `src/lib/comunicacionesLeccion/nivelN.ts`. Una cosa a la vez: un
      nivel por sesión.
- [ ] **3. Portadas** de lección (`public/modulos/comunicaciones/leccion-NN.webp`,
      16:9) y las imágenes de cada lección (huecos `CM-NN-MM`).
- [ ] **4. Práctica.** Con sus claves generadas por función (como
      `claveReconoce` en Aeropuertos), su archivo de conteo liviano, el módulo
      en `contenido/catalogo/modulos.json`, en `MODULOS_AEROLINEA`
      (`src/lib/modulosAerolinea.ts`, con el token `var(--av-cm-500)`) y en
      `CARA_DE_MODULO`. Ahí entra también la rama de `'comunicaciones'` en
      `panel_tarjetas`, `secciones_leidas`, `practicas_hechas` y los logros,
      por migración y partiendo de la versión que esté corriendo en la base.
- [ ] **5. Evaluación** con el banco en el servidor:
      `contenido/bancos/comunicaciones_evaluacion.json`, reglas en
      `evaluaciones` y `evaluacion_fuentes` por migración, pantalla sobre
      `ExamenModulo`, tabla de intentos solo con `select`. Mismo recorrido que
      `20260915230000_evaluacion_de_aeropuertos.sql`.
- [ ] **6. Video de apertura** (`CM-VID-01`), con la serie de HyperFrames. Antes
      de generar voz: `"lang": "es"` en `audio_request.json` (ver CLAUDE.md,
      «Trampa del idioma de la voz»).

## Qué se hizo (paso 1)

- `src/lib/comunicaciones.ts`: rutas (`/app/aerolinea/comunicaciones` y
  `/aprende`), niveles, total fijo (`CM_LECTURA_TOTAL = 69`), acento
  (`CM_ACENTO`), resumen para Ingreso a aerolínea y respaldo local
  (`aviatory.comunicaciones.progress`).
- `src/lib/comunicacionesLeccion/`: `index.ts` junta los ocho niveles, comprueba
  la numeración y **documenta al inicio el formato de todos los bloques**
  (genéricos, de curso y de piloto) y cómo va un hueco de imagen. `nivel1.ts` a
  `nivel8.ts` traen cada lección con su título y un solo bloque, el marcador
  `EN_REDACCION` (`enRedaccion.ts`).
- **Las lecciones en redacción no cuentan.** El lector compartido ganó un
  campo opcional, `cuenta(n)`: si devuelve false, llegar al pie no marca la
  lección como leída ni registra estudio del día (si no, 69 páginas vacías
  darían el módulo por leído y una racha gratis). Los demás módulos no lo usan
  y no cambian. En cuanto una lección deja de ser solo el marcador, cuenta sola.
- `src/pages/ComunicacionesLeccion.tsx`: el lector, con el tema `lector-cm`.
  Sin entrevistas de nivel ni práctica: el pie de la última lección vuelve al hub.
- `src/pages/Comunicaciones.tsx`: el hub, como el de Aeropuertos, con el espacio
  del video (`CM-VID-01`) y una sola puerta, «1. Aprende» (portada
  `CM-POR-01`). Práctica y evaluación **no se anuncian**: Aeropuertos no tiene
  patrón de «próximamente».
- `src/App.tsx`: el hub dentro de `AppLayout`, el lector en el grupo a pantalla
  completa, junto a los de Aeropuertos.
- `src/pages/AirlinePrep.tsx`: la tarjeta del tema (portada `CM-TEM-01`), con
  el avance de la lección, que por ahora es el avance del tema.
- `src/index.css`: tokens `--av-cm-*` y el tema `.lector-notam.lector-cm`.
- `src/lib/comunicacionesProgress.ts` sobre el progreso común, y la tabla y la
  RPC en `src/integrations/supabase/types.ts`, escritas a mano con la forma de
  la migración.
- `eslint.config.js`: `@/lib/comunicacionesLeccion` solo lo importa su lector.
- `src/lib/leccionesConteo.test.ts`: el total fijo contra el contenido, los
  cortes de nivel de la especificación y el número de lecciones de la migración.

## El color: ciruela de radio

Acento `#5E3567` = `oklch(0.40 0.095 320)`.

Se propuso un índigo violeta `#4A3B7A`, que es el matiz **292**. En la pantalla
de Ingreso a aerolínea la tarjeta de este módulo va al lado de la de
psicotécnicas, que es violeta **295** (`oklch(0.45 0.2 295)`), y el token
`--av-ap-*` también es violeta (287): habrían sido tres violetas casi iguales.
Se corrió al **320** (ciruela): misma familia, separada por matiz y por croma
(la mitad que psicotécnicas), y lejos del rojo de error (25), del ámbar (70) y
del verde de correcto (155).

| Uso | Valor | Contraste medido |
|---|---|---|
| Primario del lector, texto sobre papel `#FBFAF8` | `#5E3567` | 9,2:1 (blanco encima: 9,6:1) |
| Foco sobre papel | `#8B5D96` | 4,9:1 |
| Foco sobre el índice navy | `#D9B6E1` | 9,2:1 |
| `--av-cm-500` claro sobre papel | `oklch(0.56 0.10 320)` | 4,7:1 |
| `--av-cm-700` oscuro, blanco encima | `oklch(0.50 0.09 320)` | 6,2:1 |
| `--av-cm-fg` oscuro sobre tarjeta oscura | `oklch(0.80 0.075 320)` | 8,6:1 |

## Cómo se carga el contenido de una lección

Todo está en el comentario de `src/lib/comunicacionesLeccion/index.ts`. Lo
esencial:

- No se cambian `n` ni `title`. `blocks` se reemplaza entero; `minutes` pasa
  del 1 provisional a la lectura real.
- Hueco de imagen:

  ```ts
  {
    kind: "hueco",
    rotulo: "CM-16-01 · Diagrama · 16:9 · 1600×900",
    descripcion: "Qué tiene que mostrar y por qué.",
    alto: 280,
  }
  ```

- Imágenes a `public/modulos/comunicaciones/`, nunca a `src/assets`.
- Nada de rayas largas, nada de fraseología, accidentes, cifras ni artículos
  inventados; lo que no tenga fuente cargada (Doc 4444 cap. 14, Doc 10037…) va
  con `callout` de tono `verificar`.
- Un «pon a prueba» de lección no copia una pregunta de evaluación.

## Lo que le queda por correr a Camilo

Nada de esto está aplicado. Va **después de los siete pasos de Aeropuertos**
(ver `docs/AEROPUERTOS_ESTADO.md`, «Lo que le queda por correr a Camilo»), cada
paso en su propia ejecución del SQL Editor:

| # | Qué se pega en el SQL Editor | Resultado esperado |
|---|---|---|
| 8 | `supabase/migrations/20260925000000_progreso_de_comunicaciones.sql` | Sin error (un aviso de «does not exist, skipping» por la política, normal) |
| 9 | `supabase/tests/comunicaciones.sql` | Termina en el error `PRUEBA_DESHECHA catalogo_69_y_0 umbral permisos leccion_fuera leccion_cero practica_inventada clave_ajena rpc_idempotente rls_progreso sin_update_directo sin_insert_directo sin_sesion modulos_viejos` (eso es pasar) |
| 10 | `supabase/tests/permisos.sql` otra vez | `PRUEBA_DESHECHA …` como antes: la tabla nueva no le agrega nada que falle |

La migración **no depende** de las de Aeropuertos (solo usa `modulos_contenido`,
`module_thresholds` y `private.validar_marca_progreso`, que existen desde
septiembre) y **no reescribe ninguna función compartida**: ni `panel_tarjetas`,
ni `secciones_leidas`, ni `practicas_hechas`, ni los logros. Se puede correr
dos veces sin error. El orden es para que el historial quede en el orden de los
archivos.

Después de aplicar, si se aplicó con `apply_migration` o la CLI:

```sql
select version, name from supabase_migrations.schema_migrations
where name = 'progreso_de_comunicaciones';
```

y el archivo se renombra con esa versión (y la ruta en
`src/lib/leccionesConteo.test.ts`, que lo lee).

### Lo que no se pudo probar

La migración y su prueba **no se corrieron** contra ninguna base: esta sesión no
tenía escritura y no se debía. Están escritas sobre el patrón ya probado de
Aeropuertos (la RPC es copia fiel de `aeropuertos_mark_progress`).

### Mientras no las corra

Nada se rompe. La consulta a la tabla que aún no existe falla, `leer` devuelve
null y el módulo se queda con el respaldo local del navegador. Como las 69
lecciones están en redacción, de todos modos no hay avance que guardar todavía.

## Decisiones que tiene que confirmar Camilo

1. **El color** (ciruela `#5E3567` en vez del índigo `#4A3B7A` propuesto), por
   el choque con psicotécnicas. Si se confirma, falta su fila en la tabla de
   acentos de `CLAUDE.md`.
2. **El módulo no está en el panel ni en `contenido/catalogo/modulos.json`.** La
   prueba del catálogo exige que el panel tenga los mismos módulos que el
   catálogo y que cada uno tenga práctica; sin práctica, entrar ahí obligaba a
   cambiar esas reglas y a reescribir `panel_tarjetas`. Hasta que haya
   práctica, la fila de `modulos_contenido` la escribe la migración. La tarjeta
   sí está en Ingreso a aerolínea.
3. **La tarjeta ya se ve** en Ingreso a aerolínea, con 69 lecciones en
   redacción. Si se prefiere esconderla hasta que haya contenido, es quitar
   un bloque de `temas` en `AirlinePrep.tsx`.
4. **El repaso «50 frases» es la lección 69** del nivel 8 y no una pantalla
   aparte.
5. Visto de paso, no es de este módulo: el token `--av-ap-*` de Aeropuertos
   sigue siendo violeta (287) mientras el lector y `AP_ACENTO` son verde menta
   `#2F766A`. El panel pinta Aeropuertos con `var(--av-ap-500)`, o sea en
   violeta.

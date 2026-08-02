# Cami: qué entró hoy y qué te toca

Pégale esto completo a tu Claude Code, parado en la raíz del repo.

Sesión del 2 de agosto. Todo está en `main` y desplegado. Lo que sigue son
**cuatro cosas que necesitan algo de tu lado**, en orden de urgencia, y después
el resumen de lo que se construyó.

Estado del repositorio al cerrar: `9f6cda7`.

---

## 1 · URGENTE: la migración de Mercancías Peligrosas se aplicó a medias

**Esto es lo primero que hay que mirar.** Verificado contra producción hoy, no
supuesto:

| Pieza de `20260802010000_modulo_mercancias.sql` | Estado en la base |
|---|---|
| `user_mercancias_progress` | **Existe** |
| `user_mercancias_exam_attempts` | **Existe** |
| RPC `mercancias_mark_progress` | Existe |
| Logros `mercancias_lesson`, `mercancias_practice`, `mercancias_exam`, `mercancias_master` | **NO están en `achievements`** |
| Umbrales `mercancias_lesson`, `mercancias_practice`, `mercancias_pass` | **NO están en `module_thresholds`** |

O sea: el módulo guarda el progreso, pero **sus cuatro logros no se pueden
otorgar nunca**, porque no existen en el catálogo. Es exactamente el defecto de
`metar_master` que esta migración venía a no repetir, y esta vez no lo causó el
archivo sino que se aplicó incompleto.

**Qué hacer:** volver a aplicar `20260802010000_modulo_mercancias.sql` **entera**.
Es segura de repetir: todo va con `create table if not exists`, `on conflict do
update`, `drop policy if exists` y `create or replace function`. No borra nada
ni duplica.

**Cómo comprobar que quedó bien**, con estas dos consultas:

```sql
select code from public.achievements where code like 'mercancias%';
-- deben salir 4

select code, total from public.module_thresholds where code like 'mercancias%';
-- deben salir 3: mercancias_lesson=9, mercancias_practice=4, mercancias_pass=80
```

Y ojo con el orden si vuelves a correr varias: **las migraciones del 1 y el 2 de
agosto recrean `check_and_unlock_achievements`**, así que la última que apliques
es la que queda. Si aplicas la de mercancías después de la del simulacro, bien.
Si lo haces al revés, `airline_mock_passed` deja de otorgarse.

---

## 2 · Falta aplicar la migración de la Biblioteca

`20260802020000_biblioteca_por_modulos.sql` **no está aplicada**. Comprobado:
`library_categories` sigue con las nueve categorías genéricas viejas y la RPC
`bump_library_item_views` no existe.

La Biblioteca ya está construida y desplegada, pero hasta que apliques esto
muestra su estado vacío, que es honesto pero no sirve de nada.

Tres cosas de esa migración que conviene que sepas antes de aplicarla:

- **Borra las nueve categorías del marcador de posición** (Manuales, SOPs, Quick
  References, Performance Tools, Weight & Balance, Briefings, Checklist
  Philosophy, CRM/TEM, Accident Case Studies) y pone las de módulo en su lugar.
  Va con salvaguarda: **solo borra la que no tenga ni un documento colgando**.
- **Crea `bump_library_item_views`.** El brief la daba por existente y no lo
  está: se probó con todas las firmas plausibles y Postgres responde siempre
  "Could not find the function".
- **Añade una política de storage** de solo `select` para `authenticated` sobre
  el bucket `documentos-oficiales`, que no existía.

### Y hay que subir dos PDF al bucket

De los documentos que la Biblioteca aloja, **solo uno está en el bucket**. Los
PDF no entran al repositorio, así que hay que subirlos a `documentos-oficiales`
**con el nombre exacto** que espera cada fila, o el visor dirá que el documento
no está cargado:

| Documento | Nombre de archivo que espera la fila |
|---|---|
| RAC 175 | `RAC 175 - Transporte sin Riesgo de Mercancias Peligrosas por via Aerea.pdf` |
| LAR 175 | `LAR 175 MERCANCIAS PELIGROSAS.pdf` |

Sin tildes ni eñes a propósito. Si los subes con otro nombre, cambia también el
`file_url` de la migración.

El del banco de preguntas del PCA **ya está**, como
`Banco de Preguntas Licencia PCA.pdf`, y su fila apunta ahí. Verificado.

Las ediciones salieron de la portada de cada PDF, no de internet: **RAC 175**
Edición Original, marzo 2016, Resolución 00478. **LAR 175** Primera edición,
Enmienda 4, diciembre 2017.

---

## 3 · El experimento del dictado está construido y SIN MEDIR

`user_icao_speaking` ya está aplicada, y la pantalla funciona en producción.
Pero **el experimento que justificaba hacerlo no se ha corrido**, y no lo podía
correr Claude: hace falta una persona hablando inglés a un micrófono.

La pregunta sigue siendo una sola: *¿el reconocedor del navegador entiende a un
piloto colombiano hablando inglés lo bastante bien como para que le sirva?*

**El protocolo**, diez minutos:

1. Abrir `/app/icao/interview` en Chrome, en un equipo con micrófono.
2. Aceptar el permiso de dictado la primera vez.
3. Responder hablando **seis** preguntas, de 30 a 60 segundos, en inglés normal.
   Sin vocalizar de más: el punto es medir el habla real.
4. Anotar por respuesta: lo que dijiste de verdad, la transcripción **sin
   corregir**, los segundos, las palabras y la confianza.

La confianza sale de `user_icao_speaking.confianza`. Los **reenganches** (las
veces que Chrome corta solo y hay que rearrancar) los cuenta el hook pero no se
muestran en pantalla, porque al piloto no le dicen nada. Si los quieres visibles
mientras dure el experimento, es una línea.

**Sin medir esto no se puede decidir** si la idea se extiende al resto del
módulo o se cambia por Whisper.

Y **iOS Safari no está verificado**: el brief avisaba de que puede cortarse al
bloquear la pantalla, y sin dispositivo no se pudo comprobar. El aviso de
navegador no soportado sí funciona y está probado.

---

## 4 · Lo que sigue esperando una decisión tuya

**El diseño de Mercancías Peligrosas no es accesible desde la cuenta de Nico.**
El proyecto `2c3494a5-8704-49d9-93d0-ce93cbf2946b` responde "Project not found"
y no aparece en su lista. **Compártelo o pasa el `.dc.html`.**

Mientras tanto el módulo se construyó con el `.docx` y con lo que el brief
documenta. Lo que quedó sin contrastar contra tu diseño:

| Dato | Estado |
|---|---|
| `CLASES[1]`, Explosivos | Alineado: el brief transcribe sus `ejemplos` y su `divisiones[0]` literal |
| Clases 2 a 9: `desc`, `ejemplos`, `divisiones` | Del `.docx`. Redacción probablemente distinta |
| `CLASES[].bg` y `fg` | Ver abajo |
| Los 4 `CASOS` de práctica | **Escritos por Claude**, no son los tuyos |
| Las 5 `PREGUNTAS` del chequeo | **Escritas por Claude**, no son las tuyas |

Los `CASOS` y las `PREGUNTAS` son lo que más conviene que revises: es contenido
pedagógico, no maquetación. Están en `src/lib/mercanciasPractica.ts` y se
cambian sin tocar nada más.

**El color de clase**: como solo conocíamos el de la clase 1, los otros ocho se
sacaron muestreando los rombos oficiales. Sale fiel pero choca: la 3 y la 4 son
rojas las dos, la 5 y la 7 amarillas, y la 6, la 8 y la 9 tienen etiqueta blanca
o blanca y negra. Se decidió que **la identidad la lleve el rombo y no un cuadro
de color**, y que el color solo tiña bordes. Si tu diseño tiene nueve colores
distintos para que cada clase se distinga por color, dilo y se alinea.

Y sigue sin decidirse, de antes: **si Entrevista técnica, HR y Psicotécnicos son
temas del módulo o módulos aparte.** Hoy están prometidos en los dos sitios y no
se ha tocado nada esperando.

---

## Lo que se construyó, en orden

**Cierre del módulo Ingreso a aerolínea** (`df6f2e6` a `6f7619e`)

El simulacro de entrevista técnica no guardaba nada: el piloto presentaba 25
preguntas y al salir de la pantalla el intento desaparecía. Ahora persiste, con
su logro `airline_mock_passed` y mínimo 85. METAR persistía la lección en base
pero la práctica y la evaluación solo en local, así que en otro dispositivo el
porcentaje mentía; ahora viaja entero. La línea de ruta del hub se rompía sola
al abrirse temas (con dos pendientes salía "Después vienen  y B"). Y
`CourseCard` volvió al sistema tipográfico, lo que de paso arregló que en modo
oscuro llevara la sombra clara.

**Partir las rutas** (`279f215`)

El bundle estaba en **2.028 KB contra los 2.048** que precachea Workbox, y
pasarse hace fallar el build sin avisar. Las 40 páginas pasaron a `lazy`: el
trozo principal bajó a **649 KB**, un 68 por ciento menos. Sin esto no entraba
ningún módulo nuevo.

**Módulo Mercancías Peligrosas** (`a9e55d0` a `f48dd13`)

Primer módulo con lector propio, a pantalla completa y fuera del layout de la
app. El cascarón es genérico (`src/components/modulo`): cuando NOTAM y METAR
migren, reusan lo mismo. Once secciones, las nueve clases con sus **etiquetas
oficiales OACI** (no cuadros de color), práctica de clasificación y chequeo
final. Probado a 375 px: cero scroll lateral en las once.

**Biblioteca** (`afe4546`)

La bibliografía de cada módulo, con las categorías por módulo. RAC 175 y LAR 175
se alojan; Anexo 18, Doc 9284 y IATA DGR van como ficha de referencia sin
archivo, que es lo que decidiste. El visor se generalizó desde `OfficialBank`
(que se borró) y pasó a scroll continuo con virtualización. El banco oficial se
mudó a la Biblioteca y la ruta vieja quedó como redirección.

Probado contra el banco real, 148 páginas y 23 MB: nunca más de 6 páginas
dibujadas y la memoria constante entre 15 y 24 MB. Salieron **tres fallos** de
liberación de memoria y de render que están arreglados y explicados en el
commit. La caducidad de la URL firmada se probó con una firma de 3 segundos:
sirve, caduca y sin firma el bucket responde error.

**Dictado en el TEA Parte 1** (`9f6cda7`)

El piloto responde hablando y ve la transcripción al lado de la respuesta
modelo. Las cuatro trampas de la API están resueltas y **probadas con un
reconocedor falso** que imita a Chrome. No se guarda audio en ninguna parte, y
el consentimiento dice explícitamente que el audio sale hacia Google o Apple
según el navegador. `Privacy.tsx` tiene ahora un punto 4.1 propio, porque hasta
hoy no lo mencionaba y a partir de este cambio habría sido falso.

Lo que se muestra son hechos: la transcripción, los segundos y las palabras.
**Ninguna nota de pronunciación**, que es lo que el brief pedía no hacer.

---

## Comprobaciones al cerrar

```
npx tsc -p tsconfig.app.json --noEmit    limpio
npm run build                            limpio
npx eslint src --ext .ts,.tsx            20 problemas, los mismos de antes
chunk principal                          649 KB
```

Ningún PDF entró al repositorio. La Biblioteca salió de "Próximamente".
`OfficialBank.tsx` y `useOfficialBank.ts` borrados.

La lista viva de lo que necesita algo de tu lado está en
`docs/PENDIENTES_CAMILO.md`, y se va actualizando en cada sesión.

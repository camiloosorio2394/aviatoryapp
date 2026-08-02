# Tarea: Biblioteca, la bibliografía de cada módulo

Pégale esto completo a tu Claude Code, parado en la raíz del repo.

La Biblioteca guarda los documentos de referencia de cada módulo. Arranca con
la bibliografía de **Mercancías peligrosas** y la estructura tiene que servir
para los módulos que vengan.

---

## 1 · Lo primero: el problema de derechos, y cómo se resuelve

**Léelo antes de subir un solo PDF.** Cami ya decidió qué se sube y qué no:

| Fuente | Quién lo publica | Decisión |
|---|---|---|
| **RAC 175** | Aerocivil de Colombia | **Se aloja.** Reglamento público colombiano |
| **LAR 175** | SRVSOP | **Se aloja.** Publicación regional abierta |
| OACI Anexo 18 | OACI | Ficha de referencia, sin PDF |
| OACI Doc 9284 | OACI | Ficha de referencia, sin PDF |
| IATA DGR | IATA | Ficha de referencia, sin PDF |

**Solo se alojan RAC 175 y LAR 175.** Los dos son reglamentos publicados
abiertamente por su autoridad, así que servirlos desde la app no tiene ningún
problema.

Las tres publicaciones de la OACI y de IATA **no se suben**: son de pago, y que
alguna circule libremente en internet no es lo mismo que estar liberada. Van
como ficha de referencia, que para el piloto sirve igual o más (punto 4).

**No abras esta discusión de nuevo ni propongas subirlas.** Ya está decidido.

Y aunque los dos que se alojan sean públicos, la salvaguarda de edición del
punto 4bis **también les aplica**: el RAC 175 tiene enmiendas posteriores a su
edición original y el LAR también se enmienda.

### La solución: dos tipos de ficha

La Biblioteca no es solo un repositorio de PDF. Cada entrada es de uno de estos
dos tipos, y `library_items` ya tiene los campos para ambos:

**1. Documento alojado** (`type = 'pdf'`). El PDF vive en el bucket y se abre en
el visor. Solo para lo que se puede distribuir: RAC 175, AIP, circulares de la
Aerocivil, material propio de Aviatory.

**2. Ficha de referencia** (`type = 'referencia'`). **Sin PDF.** La ficha dice
qué es el documento, quién lo publica, cada cuánto se reedita, **qué capítulos
le importan al piloto** y el enlace oficial para consultarlo o comprarlo. Usa
`source`, `authors`, `version` y `embed_url`.

La ficha de referencia no es un premio de consolación: para un piloto que
prepara una entrevista, saber que **el Doc 9284 se reedita cada dos años y la
DGR cada año, y que ante conflicto prevalece la norma**, vale más que tener 900
páginas que no va a leer. Eso ya está en el módulo y aquí se refuerza.

**No subas al bucket nada que no sea RAC 175 o LAR 175** sin preguntarle a Cami
primero. Tener una licencia de un manual no da derecho a redistribuirlo: la
licencia es de quien la compra, no de los usuarios de la app.

---

## 2 · Lo que ya existe: no lo construyas otra vez

Verificado en producción:

**Bucket `documentos-oficiales`**
- **Privado** (`public = false`). No se puede enlazar directo
- Límite de 50 MB por archivo, solo `application/pdf`
- Ya tiene 1 archivo dentro

**Tablas, las dos vacías y con RLS de solo lectura:**

```
library_categories : id, slug, name, description, icon_name, color, order_index
library_items      : id, category_id, slug, title, type, description,
                     file_url, embed_url, content_md, source, authors,
                     version, language, aircraft_type, tags,
                     is_premium, is_published, order_index, views_count,
                     published_at, created_at, updated_at
```

Y existe la RPC `bump_library_item_views`, que ya cuenta las aperturas.

---

## 3 · La división por módulos

`library_categories` hoy no tiene filas. **Las categorías son los módulos**, no
categorías temáticas genéricas:

```
slug                    name                      order_index
pca                     Examen PCA                1
icao                    Inglés ICAO               2
notam                   NOTAM                     3
metar                   Meteorología operacional  4
mercancias-peligrosas   Mercancías peligrosas     5
general                 General                   9
```

Usa el mismo `color` e `icon_name` que ya tiene cada módulo en la app, para que
el piloto reconozca de dónde viene cada documento.

**Ojo con `Library.tsx`**: hoy es un placeholder con nueve categorías inventadas
(manuales, SOPs, quick refs, performance tools, W&B, briefings, checklist
philosophy, CRM/TEM, accident studies). **Eso se reemplaza entero** por la
división por módulos. No lo conserves.

---

## 4 · El contenido de arranque: Mercancías peligrosas

```
[pdf]         RAC 175, Transporte sin riesgos de mercancías peligrosas por vía aérea
              source: Aerocivil de Colombia
              version: Edición Original, marzo 2016, Resolución 00478
              embed_url: la pagina de los RAC en aerocivil.gov.co

[pdf]         LAR 175, Transporte sin riesgos de mercancías peligrosas por vía aérea
              source: SRVSOP
              version: la enmienda que corresponda al PDF que se suba
              embed_url: la pagina de los LAR en el sitio del SRVSOP

[referencia]  OACI, Anexo 18
              source: OACI · authors: OACI
              description: la norma marco. Qué cubre y por qué el RAC 175 lo adopta
              embed_url: la ficha del Anexo en la tienda de la OACI

[referencia]  OACI, Doc 9284, Instrucciones Técnicas
              source: OACI · version: se reedita cada 2 años
              description: el "cómo" detallado: clasificación, embalaje, marcado
                           y el listado UN. Qué capítulos le importan al piloto
              embed_url: la ficha del documento en la tienda de la OACI

[referencia]  IATA DGR
              version: anual
              description: manual operativo de la industria, más estricto que la
                           norma. Ante conflicto prevalece la norma vigente
```

El texto de las descripciones **sale del .docx del módulo**, sección 3 "Marco
normativo". No lo reescribas de memoria.

---

## 4bis · La salvaguarda de edición, obligatoria

Ninguna ficha normativa se publica sin esto. Es la regla de "cero mentiras en
pantalla" aplicada a documentos que caducan.

**En la base**, `library_items` ya tiene los campos:

- `version`: la edición exacta del archivo que se subió, textual. No
  "actualizado", no "vigente": `Edición Original, marzo 2016, Resolución 00478`
- `published_at`: la fecha de esa edición, no la de subida
- `embed_url`: **el enlace a la fuente oficial**, en las fichas de PDF también

**En pantalla**, cada documento normativo muestra:

1. Su edición, siempre visible junto al título. Nunca solo el nombre del
   documento
2. Un aviso corto y permanente: que las normas se enmiendan y que hay que
   verificar la edición vigente en la fuente oficial
3. **El enlace a la fuente oficial junto al botón de abrir.** No escondido en un
   pie: al lado, como una acción más

Y en los que se reeditan por calendario, dilo en la propia ficha: **el Doc 9284
cada 2 años, la IATA DGR cada año.**

El módulo de mercancías peligrosas ya abre con esa advertencia. La Biblioteca no
puede contradecirla sirviendo un PDF a secas.

---

## 5 · El visor: casi todo ya está hecho

**No lo construyas de cero.** `src/pages/OfficialBank.tsx` ya tiene un visor
propio sobre **pdf.js**, y `src/hooks/useOfficialBank.ts` ya resuelve la URL
firmada contra el bucket privado. La tarea es **generalizarlos**, no reescribir.

**Lo que hay que sacar a componente reutilizable:**

1. `useOfficialBank` pasa a recibir **la ruta del archivo** en vez de tenerla
   fija. Algo como `usePdfFirmado(rutaEnBucket)`. Devuelve la URL firmada, el
   estado de carga y el error. La lógica ya está escrita
2. El visor pasa a `src/components/lector/VisorPdf.tsx`, y `OfficialBank.tsx`
   lo consume igual que la Biblioteca

**Guarda en `file_url` la ruta dentro del bucket**, no una URL completa: la
firmada se genera al abrir y caduca.

---

## 6 · Scroll continuo, no página por página

El visor de hoy muestra **una página a la vez**, con estado `page` y botones de
avanzar. **Eso se cambia.** El PDF tiene que leerse de corrido hacia abajo, como
un documento, que es como se consulta un reglamento.

**Cómo hacerlo sin que se muera el navegador:** un RAC completo son cientos de
páginas y renderizar todas a canvas de golpe revienta la memoria. El patrón es:

1. Monta un contenedor con **una caja por página**, cada una con el alto real de
   esa página según su `viewport`. Así la barra de scroll es correcta desde el
   principio y no salta
2. Con un `IntersectionObserver`, **renderiza solo las páginas cercanas a la
   ventana** (la visible más dos por arriba y dos por abajo) y libera el canvas
   de las que se alejan
3. Conserva la posición de lectura, como ya hace hoy con `sessionStorage`. Pero
   guarda el **número de página visible**, no el scroll en píxeles, que cambia
   con el ancho de la ventana
4. Un indicador flotante de `página X de Y` y un campo para saltar. Sin botones
   de anterior y siguiente: el scroll es la navegación

Y que funcione en celular: ancho completo, pellizcar para acercar, y sin scroll
horizontal cuando está ajustado al ancho.

---

## 7 · Que no se pueda copiar

Buena noticia: **el visor actual ya lo cumple sin proponérselo.** Renderiza a
canvas y **no monta la capa de texto** de pdf.js, así que el contenido son
píxeles y no hay texto que seleccionar ni copiar.

**Mantenlo así. No añadas `TextLayer` ni `renderTextLayer`**, aunque los veas en
los ejemplos de pdf.js y aunque den búsqueda dentro del documento. Esa capa es
justo lo que haría el PDF copiable.

Lo que falta: `OfficialBank.tsx` **no usa `ContentGuard`** hoy. Envuelve el
visor en `<ContentGuard>` (`src/components/ContentGuard.tsx`), que bloquea el
menú contextual, `Ctrl+S`, `Ctrl+P`, oculta el contenido al imprimir y estampa
la marca de agua con el correo del usuario.

**Sé honesto con Cami sobre el alcance**: con canvas y sin capa de texto el
contenido no se puede seleccionar ni copiar, que es lo que pidió. Pero nada
impide una captura de pantalla. La marca de agua con el correo es lo que de
verdad desincentiva compartirla. No le vendas que es imposible de extraer.

---

## 8 · El banco oficial de la Aerocivil se muda aquí

Hoy el banco de preguntas vive en `/app/banco-oficial` y se enlaza desde el
módulo Examen PCA. **Sale de ahí y entra a la Biblioteca**, en la categoría
`pca`. Es un documento de referencia, no una herramienta del módulo.

**Los cuatro sitios que hay que tocar**, verificados:

```
src/App.tsx:129                        la ruta /app/banco-oficial
src/components/layout/AppSidebar.tsx:82  entrada "Banco oficial" en Herramientas
src/components/layout/AppTopbar.tsx:33   la miga de pan
src/pages/Pca.tsx:188                    la ModuleCard del hub de PCA
```

**Qué hacer con cada uno:**

- **La ruta se conserva como redirección** a la ficha del documento en la
  Biblioteca. Ya hay precedente en `App.tsx` con `/app/exam-tracker` y
  `/app/aerolineas`: los enlaces viejos que alguien haya compartido siguen
  funcionando
- **En el sidebar, "Banco oficial" desaparece** de Herramientas y **"Biblioteca"
  entra en su lugar**, saliendo del bloque `soonItems`. El menú queda igual de
  largo
- **En `Pca.tsx` se quita la ModuleCard "Banco oficial"**. El hub pasa de 3
  tarjetas a 2 (continuar y "Qué cayó en el examen"), y en su sitio va una que
  lleve a la **categoría PCA de la Biblioteca**, no al documento suelto: así el
  día que haya más material del PCA ya está el sitio
- **`OfficialBank.tsx` se borra** una vez que su visor esté extraído a
  `VisorPdf` y la Biblioteca lo consuma. No dejes las dos pantallas conviviendo

**Y la entrada en `library_items`**, categoría `pca`:

```
[pdf]  Banco de preguntas oficial, Aerocivil
       source: Aeronáutica Civil de Colombia
       file_url: la ruta que ya usa useOfficialBank en el bucket
       description: el documento oficial completo, para consultar y verificar
```

Ojo: el módulo PCA presume de que sus preguntas se pueden **comprobar contra el
documento oficial**, y ese es medio argumento de venta. Al mudarlo, que el aviso
de `Pca.tsx` que dice "preguntas verificadas contra Aerocivil" siga llevando a
donde ahora vive el documento. **No lo dejes apuntando a una ruta muerta.**

---

## 9 · La pantalla

Reemplaza `src/pages/Library.tsx` entero.

- **Contenedor a `max-w-[1280px]`**. Hoy está en 1480
- **Quita el `Sparkles`**, que ahí sigue
- `.surface` y `.surface-lift`, botones con `appButtonClass()`
- Agrupada por módulo, con el color y el icono de cada uno
- Cada ficha muestra el tipo (documento o referencia), la fuente, la versión y
  la fecha, porque en material normativo **la versión es la mitad de la
  información**
- Las fichas de referencia no se ven como documentos rotos: llevan su propio
  tratamiento y su enlace oficial
- **Estado vacío honesto**: un módulo sin documentos dice que todavía no tiene,
  no un cero ni una tarjeta fantasma

**Sácala de "Próximamente"** en `src/components/layout/AppSidebar.tsx`: hoy está
en el bloque `soonItems` con `soon: true`. Cuando tenga contenido, pasa a la
sección Herramientas.

**Y enlázala desde el módulo**: en el hub de Mercancías peligrosas, un acceso a
su bibliografía. Un piloto que está estudiando y quiere ver la norma no debería
tener que buscarla en otro menú.

---

## 10 · La migración

Escríbela, **no la apliques**: Cami la aplica por MCP.

- `insert` de las categorías de módulo en `library_categories`
- `insert` de las entradas de mercancías peligrosas en `library_items`
- Política de storage para que `authenticated` pueda leer del bucket
  `documentos-oficiales`, si no la hay ya
- Revisa que `library_items` tenga índice por `category_id` y por
  `is_published`

El PDF del RAC 175 lo sube Cami al bucket, o dile qué ruta usar y él lo deja
ahí. **No metas PDF al repositorio**: son megas que viajarían en cada `git
clone` y en el build.

---

## 11 · Convenciones

- Contenedor `max-w-[1280px]`, tipografía **12 / 13 / 15 / 17 / 20 / 24 / 32**,
  pesos **400 / 500 / 600**, radios 8px controles y 12px superficies
- `.surface`, nunca `border border-border bg-card`
- Botones con `appButtonClass()`, solo tamaños `md` y `lg`
- Español neutro LATAM con **tuteo**. Prohibido el voseo
- **Prohibido el guion largo en texto visible**
- Sin emojis, sin lenguaje de desarrollador al usuario
- **Cero mentiras en pantalla**: si un documento no está, se dice

---

## 12 · Antes de abrir el PR

```bash
npx tsc -p tsconfig.app.json --noEmit
npm run build
npx eslint src --ext .ts,.tsx        # no subir de 20 problemas
```

```bash
# ningun PDF entro al repositorio
git ls-files "*.pdf" | head

# la biblioteca salio de Proximamente
grep -n "biblioteca" src/components/layout/AppSidebar.tsx

# se limpio la deuda de la pantalla vieja
grep -nE "Sparkles|max-w-\[1480px\]|border bg-card" src/pages/Library.tsx
```

Los tres deberían salir vacíos.

**Y la prueba de verdad**: abre un documento con un usuario real, copia la URL
firmada, espera a que caduque y comprueba que deja de servir. Si sigue
abriendo, la caducidad no quedó puesta.

Verifica el deploy antes de dar nada por hecho:

```bash
gh api repos/camiloosorio2394/aviatoryapp/deployments --jq '.[0] | "\(.sha[0:7]) \(.environment)"'
```

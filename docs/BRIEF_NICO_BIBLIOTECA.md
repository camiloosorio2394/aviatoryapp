# Tarea: Biblioteca, la bibliografía de cada módulo

Pégale esto completo a tu Claude Code, parado en la raíz del repo.

La Biblioteca guarda los documentos de referencia de cada módulo. Arranca con
la bibliografía de **Mercancías peligrosas** y la estructura tiene que servir
para los módulos que vengan.

---

## 1 · Lo primero: el problema de derechos, y cómo se resuelve

**Léelo antes de subir un solo PDF.** De las cuatro fuentes de mercancías
peligrosas, solo una se puede alojar:

| Fuente | Quién lo publica | ¿Se puede alojar? |
|---|---|---|
| **RAC 175** | Aerocivil de Colombia | **Sí.** Reglamento público colombiano |
| **AIP Colombia** | Aerocivil | **Sí.** Publicación oficial de consulta pública |
| OACI Anexo 18 | OACI | **No.** Publicación de pago |
| OACI Doc 9284, Instrucciones Técnicas | OACI | **No.** Publicación de pago |
| IATA DGR | IATA | **No.** Manual comercial, licencia anual |

Subir los tres últimos al bucket y servírselos a los usuarios es **redistribuir
obra protegida**. No es un tecnicismo: IATA persigue activamente la
redistribución de la DGR, y Aviatory es un producto de pago, así que no aplica
ningún uso educativo cómodo.

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

**Si Cami tiene licencia de la DGR**, sigue sin poder redistribuirla a los
usuarios: la licencia es suya, no de ellos. Que lo consulte con él antes de
subir nada que no sea RAC o AIP.

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
              description: tiene que decir que ha tenido enmiendas posteriores
                           y que hay que verificar la edición vigente

[referencia]  OACI, Anexo 18
              source: OACI · authors: OACI
              description: la norma marco. Qué cubre y por qué el RAC 175 lo adopta
              embed_url: la ficha del Anexo en la tienda de la OACI

[referencia]  OACI, Doc 9284, Instrucciones Técnicas
              version: se reedita cada 2 años
              description: el "cómo" detallado. Qué capítulos le importan al piloto

[referencia]  IATA DGR
              version: anual
              description: manual operativo de la industria, más estricto que la
                           norma. Ante conflicto prevalece la norma vigente
```

El texto de las descripciones **sale del .docx del módulo**, sección 3 "Marco
normativo". No lo reescribas de memoria.

---

## 5 · Servir un PDF privado: URL firmada

El bucket es privado, así que `getPublicUrl` no sirve. Hay que generar una URL
firmada con caducidad corta desde el cliente ya autenticado:

```ts
const { data, error } = await supabase.storage
  .from("documentos-oficiales")
  .createSignedUrl(rutaDelArchivo, 60 * 30)   // 30 minutos
```

Eso resuelve dos cosas a la vez: el documento no queda expuesto en una URL
pública, y el enlace caduca aunque alguien lo copie.

**Guarda en `file_url` la ruta dentro del bucket**, no una URL completa. La URL
firmada se genera al abrir.

---

## 6 · El visor y la protección

El PDF se abre **dentro de la app**, no en una pestaña nueva. Un `<iframe>` con
la URL firmada basta para empezar.

Envuélvelo en `<ContentGuard>` (`src/components/ContentGuard.tsx`), que ya
bloquea copiar, el menú contextual, `Ctrl+S`, `Ctrl+P` y oculta el contenido al
imprimir, además de poner la marca de agua con el correo del usuario.

**Sé honesto en lo que le prometes a Cami**: ninguna de esas medidas impide que
alguien haga capturas o use el visor nativo del navegador. Lo que hacen es
poner fricción y dejar el correo del usuario impreso en cualquier captura, que
es lo que de verdad desincentiva compartir. Un PDF que llega al navegador es un
PDF que se puede guardar; no le vendas lo contrario.

---

## 7 · La pantalla

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

## 8 · La migración

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

## 9 · Convenciones

- Contenedor `max-w-[1280px]`, tipografía **12 / 13 / 15 / 17 / 20 / 24 / 32**,
  pesos **400 / 500 / 600**, radios 8px controles y 12px superficies
- `.surface`, nunca `border border-border bg-card`
- Botones con `appButtonClass()`, solo tamaños `md` y `lg`
- Español neutro LATAM con **tuteo**. Prohibido el voseo
- **Prohibido el guion largo en texto visible**
- Sin emojis, sin lenguaje de desarrollador al usuario
- **Cero mentiras en pantalla**: si un documento no está, se dice

---

## 10 · Antes de abrir el PR

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

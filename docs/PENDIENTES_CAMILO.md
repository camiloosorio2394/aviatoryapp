# Pendientes y comentarios para Camilo

Documento vivo. Lo que está aquí necesita algo de tu lado: aplicar, decidir o
confirmar. Cuando algo se cierra, se borra de aquí.

Última actualización: 10 de septiembre de 2026 (las dos migraciones, aplicadas).

---

## URGENTE · Autorizar la URL de recuperación de contraseña

Va lo primero porque **hasta que lo hagas, el flujo nuevo no funciona en
producción**, y hoy quien olvida la contraseña se queda fuera de su cuenta sin
salida: el botón «¿Olvidaste tu contraseña?» solo mandaba a escribir a
`hola@aviatory.app`, que es una dirección que no existe —el dominio no tiene
MX—.

Ya está construido el flujo entero: `/recuperar` pide el correo,
`resetPasswordForEmail` manda el enlace, y `/nueva-clave` lo recibe y fija la
contraseña. Falta lo que solo se puede hacer desde tu consola.

### 1 · Las URL de redirección

En **Supabase → Authentication → URL Configuration → Redirect URLs**, añade:

```
https://aviatoryapp-mu.vercel.app/nueva-clave
```

Y si quieres que el flujo también se pueda probar fuera de producción:

```
http://localhost:5173/nueva-clave
https://*-aviatoryapp.vercel.app/nueva-clave
```

Supabase solo redirige a direcciones de esa lista. Si la de producción no está,
el enlace del correo lleva al **Site URL** y el piloto aterriza en la portada sin
entender por qué, con el token gastado.

El código no fija ninguna de esas URL a mano: arma el `redirectTo` con el origen
desde donde se pidió (`${window.location.origin}/nueva-clave`), así que funciona
igual en producción, en una preview y en local sin tocar nada. Lo único que hay
que mantener es la lista de arriba.

### 2 · El correo saliente, que es el que de verdad bloquea

El remitente que trae Supabase de fábrica **está limitado a unos pocos correos
por hora y es para desarrollo**, no para producción. Con eso, el día que tres
pilotos olviden la contraseña seguidos, al tercero no le llega nada y no hay
mensaje de error que se lo explique: para la aplicación, el envío salió bien.

Para abrirlo al público hace falta un SMTP propio en **Authentication → Emails →
SMTP Settings** (Resend, Postmark, SendGrid, el que prefieras). Y eso depende de
algo que no es tuyo ni mío: **no hay dominio**. `aviatory.app` y
`aviatoryapp.com` no resuelven, así que tampoco hay desde dónde firmar el correo.
Es la misma pieza que bloquea `hola@` y `partners@`.

Mientras no haya SMTP propio, el flujo funciona pero con cuentagotas. Conviene
saberlo antes de anunciarlo.

### 3 · Mira el texto del correo

En **Authentication → Email Templates → Reset Password**. El de fábrica viene en
inglés y firmado por Supabase; los pilotos son de habla hispana. El enlace tiene
que seguir apuntando a `{{ .ConfirmationURL }}`.

---

## 0 · Lo que dejó la tanda del 2 de agosto por la tarde

Cinco tareas, ninguna toca NOTAM. Esto es lo que necesita algo de tu lado.

### 0.1 · Una migración nueva, sin aplicar

`20260802050000_paginas_biblioteca.sql`. Crea
`set_library_item_pages(bigint, integer)`, que es como la Biblioteca rellena
sola `library_items.paginas`: pdf.js ya sabe cuántas páginas tiene un documento
al abrirlo, así que la cifra sale gratis y siempre correcta. Va por RPC porque
`library_items` es de solo lectura para los pilotos y tiene que seguir
siéndolo; la función solo escribe cuando `paginas` está en null, solo sobre
documentos publicados y solo con sesión.

**Mientras no la apliques**, el visor la llama y falla en silencio: los
documentos sin `paginas` (RAC 2 y RAC 61) siguen sin mostrar su número de
páginas y no se rompe nada.

Los tipos ya los regeneré contra producción, así que ahora traen `familia`,
`destacado`, `paginas`, `portada_url` y `module_thresholds`. Tras aplicar la
migración, repite el comando para que entre también la función nueva.

### 0.2 · Los cinco documentos están marcados como destacados

`destacado = true` en los cinco, así que la fila **Esenciales** de la Biblioteca
repite el estante entero. La fila es tu palanca de curaduría y la dejé
exactamente como dice el brief; decide tú cuáles son de verdad los esenciales y
quítale la marca a los demás.

### 0.3 · El aviso de vigencia salió del estante y sigue en cada documento

El brief pedía la Biblioteca sin estados de vigencia. Quité de la portada del
estante el recuadro ámbar que avisaba de que las ediciones caducan, **pero sigue
íntegro en la ficha de cada documento**, justo encima del visor, que es donde el
piloto está a punto de aplicar un límite. Si lo quieres también en el estante,
se devuelve en una línea.

### 0.4 · La pieza de imagen, y qué falta para que la uses en NOTAM

Ya existe en los dos renderizadores, que era lo que te bloqueaba:

```tsx
<Figura src="/modulos/…" alt="…" ancho={1200} alto={800} pie="…" />     // lector de módulo
{ kind: "figura", src: "/modulos/…", alt: "…", ancho: 1200, alto: 800 } // hoja de documento
```

`alt` es obligatorio en el tipo, y `ancho`/`alto` son los del archivo (sin ellos
el texto salta cuando la imagen carga).

**El único detalle**: el tipo `LessonBlock` vive en `src/lib/notamLesson.ts`,
que es tuyo esta semana y no lo abrí. La variante nueva está en
`src/lib/docBlocks.ts`, fuera. Para escribir figuras dentro de `notamLesson.ts`,
teclea las pantallas como `DocScreen[]` en lugar de `LessonScreen[]`: es la
misma pantalla con la lista de bloques ampliada, y es un solo cambio de tipo en
un archivo que ya estás editando.

Las imágenes van en `public/modulos/<modulo>/`, a WebP con
`node scripts/optimizar-imagenes.mjs <origen> public/modulos/<modulo> 1400`, y
quedan fuera del precache de la PWA. Está explicado en `public/modulos/LEEME.md`.

### 0.5 · Dos secciones del módulo ICAO no guardan nada, y por eso no tienen avance

El hub de Inglés ICAO ya lee el progreso real y ordena por él, como el de
Ingreso a aerolínea. Pero solo tres de las cinco piezas tienen de dónde leer:

| Sección | Fuente de avance |
|---|---|
| Vocabulario | `user_icao_quiz_attempts` |
| Entrevista (Parte 1) | `user_icao_speaking` |
| **Comprensión (Parte 2)** | **Ninguna. No persiste nada** |
| **Descripción de imágenes (Parte 3)** | **Ninguna. No persiste nada** |
| Simulacro TEA | `user_icao_mock_results` |

A las dos sin fuente **no les puse un 0%**: un cero afirma que lo intentaste y
no avanzaste, y lo cierto es que no sabemos. Sus tarjetas enseñan cuánto
contenido hay dentro y ya. Si quieres que midan avance, hay que decidir primero
qué cuenta como hecho en cada una (¿escuchar el audio?, ¿acertar el quiz de
comprensión?, ¿describir el par entero?), y eso es decisión de contenido.

### 0.6 · Los testimonios de la landing ya no están

Borré `Testimonials.tsx` entero y la fila de "+2.000 pilotos" con avatares
inventados del Hero. No los sustituí por nada: la sección vuelve cuando haya
pilotos reales que quieran dar el suyo.

**Queda uno que no toqué porque se sale del encargo**: en `Stats.tsx`, la
tarjeta **"3x · Más rápido que estudiar solo con PDFs y videos sueltos"** es una
cifra inventada presentada como dato, dentro de una rejilla de cifras. Por la
misma regla de cero mentiras en pantalla, o se respalda o se quita. Dime y lo
hago.

### 0.7 · El lector en celular ya estaba bien

Verificado a 390 px en las 11 secciones del lector de Mercancías: cero scroll
horizontal, la rejilla de las nueve clases en 3 columnas con el rombo a 44 px,
el índice convertido en tira de números, el contador `03 / 09` sin pisarse con
la vigencia, y los botones de Anterior y Siguiente apilados y completos. No hizo
falta cambiar nada: la pasada de celular ya había entrado con el propio lector.

Lo que **no** pude probar es Android Chrome ni iOS Safari de verdad, solo un
navegador a 390 px. Si tienes el teléfono a mano, vale una mirada.

### 0.8 · Un arreglo de layout que afecta a toda la app

`AppLayout` llevaba la columna de contenido como ítem flex sin `min-w-0`, así
que su ancho mínimo lo fijaba el contenido más ancho de la página. La primera
tira con desplazamiento horizontal (el estante de la Biblioteca) empujó la
página entera a 809 px en un teléfono de 390. Está arreglado con una clase, pero
conviene saberlo: cualquier carrusel que se añada a partir de ahora habría
tenido el mismo problema.

---

## 1 · Estado real de las migraciones

Comprobado contra producción el 2 de agosto, consultando la base, no supuesto.

| Archivo | Estado |
|---|---|
| `20260801030000_metar_master_condicion.sql` | Aplicada |
| `20260801040000_simulacro_aerolinea.sql` | Aplicada, completa |
| `20260802010000_modulo_mercancias.sql` | **APLICADA A MEDIAS. Hay que repetirla** |
| `20260802020000_biblioteca_por_modulos.sql` | **Sin aplicar** |
| `20260802030000_icao_speaking.sql` | Aplicada |
| `20260802050000_paginas_biblioteca.sql` | **Sin aplicar.** Ver el punto 0.1 |

### La de mercancías está incompleta y es lo más urgente

Las tablas existen y la RPC también, pero **los cuatro logros no están en
`achievements` y los tres umbrales no están en `module_thresholds`**. O sea: el
módulo guarda el progreso y sus logros no se pueden otorgar nunca. Es el defecto
de `metar_master` otra vez, esta vez por aplicación parcial y no por el archivo.

Hay que **volver a aplicarla entera**. Es segura de repetir: todo va con
`if not exists`, `on conflict do update`, `drop policy if exists` y
`create or replace function`.

Para comprobar que quedó bien:

```sql
select code from public.achievements where code like 'mercancias%';   -- 4 filas
select code, total from public.module_thresholds where code like 'mercancias%';  -- 3 filas
```

**Ojo con el orden**: las migraciones del 1 y el 2 de agosto recrean
`check_and_unlock_achievements`, así que la última que se aplique es la que
queda. La de mercancías después de la del simulacro, nunca al revés.

Cada una trae la tabla, el logro **con su condición dentro de
`check_and_unlock_achievements`** y **su disparador**, en la misma migración. Es
la lección de `metar_master`: separarlos deja el logro visible en el perfil y
sin forma de ganarlo.

Las tres recrean `check_and_unlock_achievements`, así que **el orden importa**:
la última en aplicarse es la que queda. Aplícalas en orden de nombre.

Y las tres llevan el `revoke`, porque Postgres devuelve `EXECUTE` a `PUBLIC` en
cada `create or replace function`.

Después de aplicarlas: `get_advisors` tipo `security`, y regenerar los tipos.

```bash
npx supabase gen types typescript --project-id $REF > src/integrations/supabase/types.ts
```

Mientras tanto los tipos están escritos a mano para las cuatro tablas nuevas.
La regeneración debería dejarlos igual; si algo cambia, es que la migración y lo
que escribí no coinciden y hay que mirarlo.

---

## 1bis · Los dos PDF de la Biblioteca los tienes que subir tú

La Biblioteca ya está montada, pero **de sus dos documentos alojados solo uno
está en el bucket**. Los PDF no entran al repositorio (serían megas en cada
clone y en cada build), así que hay que subirlos al bucket
`documentos-oficiales` **con el nombre exacto** que espera la migración:

| Documento | Nombre de archivo que espera la fila |
|---|---|
| RAC 175 | `RAC 175 - Transporte sin Riesgo de Mercancias Peligrosas por via Aerea.pdf` |
| LAR 175 | `LAR 175 MERCANCIAS PELIGROSAS.pdf` |

Sin tilde y sin eñe en el nombre a propósito: el bucket ya sirve un archivo con
espacios y funciona, pero los acentos en la ruta firmada dan más problemas de
los que valen. **Si los subes con otro nombre, cámbialo también en el
`file_url` de la migración**, o el visor dirá que el documento no está cargado.

El tercero, el banco de preguntas del PCA, **ya está** en el bucket como
`Banco de Preguntas Licencia PCA.pdf` y su fila apunta ahí. Verificado.

Y una cosa que hay que confirmar contigo: **la edición del banco de preguntas**.
No trae número ni fecha en la portada, así que su ficha dice "Edición sin
numerar, confirmar la vigente con la Aerocivil". Si sabes de qué año es, se
corrige y deja de ser una ficha a medias.

---

## 1ter · Tres cosas del brief de la Biblioteca que no eran como decía

Ninguna bloqueó nada, pero conviene saberlas:

**`library_categories` no estaba vacía.** Tenía las nueve categorías genéricas
del marcador de posición (Manuales, SOPs, Quick References, Performance Tools,
Weight & Balance, Briefings, Checklist Philosophy, CRM/TEM, Accident Case
Studies), sembradas en la base y no solo en el frontend. La migración las borra,
pero **con salvaguarda**: solo borra la que no tenga ni un documento colgando.
Si subiste algo a alguna mientras tanto, esa se queda.

**La RPC `bump_library_item_views` no existe.** El brief la daba por hecha. La
probé con todas las firmas plausibles y Postgres responde siempre "Could not
find the function". La crea la migración nueva.

**No había política de storage para leer el bucket.** Se añade una de solo
`select` para `authenticated`. Sin ella, `createSignedUrl` funciona hoy porque
la sesión actual tiene permiso por otra vía, pero conviene que sea explícita.

---

## 1quater · El dictado del TEA está sin medir, y hay que medirlo

El módulo está construido y desplegado, pero **el experimento que justificaba
hacerlo sigue sin correr**, y no lo puedo correr yo: hace falta una persona
hablando inglés a un micrófono.

La pregunta a responder es una sola: *¿el reconocedor del navegador entiende a
un piloto colombiano hablando inglés lo bastante bien como para que le sirva?*

**El protocolo, que toma unos diez minutos:**

1. Abre `/app/icao/interview` en Chrome, en un equipo con micrófono.
2. Acepta el permiso de dictado la primera vez.
3. Responde hablando **seis** preguntas, de 30 a 60 segundos cada una, como en
   el examen. Sin vocalizar de más: el punto es medir el habla normal.
4. Después de cada una, apunta lo que ves en pantalla (segundos y palabras) y
   copia la transcripción.

**Lo que hay que anotar por respuesta**, que es lo que decide si esto sigue o se
cambia por Whisper:

| Dato | De dónde sale |
|---|---|
| Lo que dijiste de verdad | De tu cabeza, antes de mirar la pantalla |
| La transcripción, **sin corregir** | De la pantalla |
| Segundos y palabras | De la pantalla |
| Confianza media | De la base, columna `confianza`, tras aplicar la migración |
| Cuántas veces se cortó solo | El hook lo cuenta; hoy no se muestra, ver abajo |

**Un detalle que dejé sin poner en pantalla a propósito**: el hook cuenta los
reenganches (las veces que Chrome corta solo y hay que volver a arrancar), pero
no se muestra al piloto, porque a él no le dice nada. Para la medición sí
importa. Se lee en la consola o se saca a la vista con una línea, dime si lo
quieres visible mientras dure el experimento.

Y **iOS Safari**: el brief avisa de que puede cortarse al bloquear la pantalla.
Sin dispositivo no lo pude verificar. El aviso de navegador no soportado está
puesto y funciona; lo que no está comprobado es el comportamiento de Safari en
iOS con la pantalla apagada.

---

## 2 · El diseño de Mercancías Peligrosas no es accesible

Esto es lo que más me condiciona y lo que más rápido se arregla de tu lado.

El brief manda importar el diseño con el MCP y da la URL:

```
https://claude.ai/design/p/2c3494a5-8704-49d9-93d0-ce93cbf2946b
```

Desde la cuenta de Nico responde **"Project not found — This project may have
been deleted, or you might not have access to it"**, y no aparece en su lista de
diseños. No está compartido con él.

**Lo que necesito:** que lo compartas, o que nos pases el `.dc.html`. Con eso
contrasto en un rato lo que sigue.

### Qué construí mientras tanto

El contenido salió del `.docx` que pasó Nico, que es la fuente con la que se
hizo el propio diseño. La estructura, la paleta y las 11 secciones salieron del
brief, que las documenta con detalle.

### Qué falta contrastar contra el diseño

| Dato | Estado |
|---|---|
| `CLASES[1]` (Explosivos) | **Alineado**. El brief transcribe sus `ejemplos` y su `divisiones[0]` literal, y así quedaron |
| `CLASES` 2 a 9: `desc`, `ejemplos`, `divisiones` | Del `.docx`. Redacción probablemente distinta |
| `CLASES[].bg` | Ver el punto 3. Solo conozco el de la clase 1 |
| `CLASES[].fg` (`#16202A`) | **No implementado**. Ver el punto 3 |
| `CASOS`, los 4 de práctica | **Escritos por mí.** Los del diseño no los tengo |
| `PREGUNTAS`, las 5 del chequeo | **Escritas por mí.** Las del diseño no las tengo |

Los `CASOS` y las `PREGUNTAS` son lo más probable que quieras revisar: son
contenido pedagógico, no maquetación. Están en
`src/lib/mercanciasPractica.ts` y se cambian sin tocar nada más.

### Y dos archivos que tampoco pude leer

El brief dice que el proyecto del diseño trae `rac175.txt` (la fuente normativa)
y el PDF del material. No están en el repo y no tengo acceso al proyecto, así
que **el módulo no está contrastado contra el texto del RAC 175**. Todo lo
normativo sale del `.docx`.

---

## 3 · Decisión que tomé y quiero que confirmes: el color de clase

El brief dice que `CLASES[].bg` es el sistema del módulo, "el naranja de la
clase 1 reaparece cada vez que se hable de explosivos". Solo documenta el de la
clase 1 (`#E87722`).

Como no tenía los otros ocho, **los saqué muestreando los rombos oficiales**.
El resultado es fiel pero choca:

| Clase | Color del rombo real |
|---|---|
| 1 Explosivos | naranja `#E87722` |
| 2 Gases | verde `#1E8A4C` (del 2.2; el 2.1 es rojo y el 2.3 blanco) |
| 3 Líq. inflamables | rojo `#D0102E` |
| 4 Sól. inflamables | rojo `#D0102E` — igual que la 3 |
| 5 Oxidantes | amarillo `#C08A00` |
| 6 Tóxicas | la etiqueta es blanca |
| 7 Radiactivo | amarillo — igual que la 5 |
| 8 Corrosivas | la etiqueta es blanca y negra |
| 9 Varias | la etiqueta es blanca y negra |

O sea: **el color no distingue las nueve clases, porque en la realidad no las
distingue.** Rojo significa inflamable dos veces, y eso es lo correcto de
enseñar.

**Lo que hice:** que la identidad la lleve **el rombo**, no un cuadro de color.
Donde hay que identificar una clase se pone su etiqueta oficial. El color solo
tiñe bordes y acentos, y que dos clases lo compartan deja de importar.

**Lo que necesito de ti:** si tu diseño tiene nueve colores distintos e
inventados para que cada clase se distinga por color, dímelo y me alineo. Si no,
esto se queda como está, que además usa los rombos que ya extrajimos.

Por lo mismo, `fg` (`#16202A`, el texto sobre el color de clase) **no está
implementado**: hoy no hay ningún sitio donde se ponga texto encima del color de
una clase. Si el diseño sí lo tiene, entra con el resto.

---

## 4 · Tres desviaciones menores del brief, con su motivo

**El índice muestra las 11 secciones, no las 9.** El brief dice "las 9 secciones
numeradas 00 a 08". Yo muestro las once, separadas en dos grupos: *Contenido*
(00 a 08) y *Ponte a prueba* (09 y 10). El contador de la barra sí cuenta solo
las de lectura (`03 / 09`) y en la práctica y el chequeo cambia el número por el
nombre de la sección. Me pareció que esconder del índice las dos secciones que
cierran el módulo las dejaba sin puerta de entrada. Se revierte en un minuto.

**El índice en celular no colapsa, se convierte en una tira de números.** El
brief pedía que colapsara. Un cajón esconde en qué sección vas, que es la mitad
de la utilidad del índice, así que la tira horizontal me pareció mejor. Probado
a 375 px, cero scroll lateral en las once secciones.

**La banda de "Recuerda" no está al pie de todas las secciones.** El brief la
describe como parte de la estructura de pantalla. La puse solo donde hay algo
que subrayar (06, 08 y 10): repetirla en las nueve la habría convertido en
decoración, y el resto de secciones ya cierran con un aviso. Si la quieres fija,
se pone.

---

## 5 · La sección se marca leída al entrar

Va contra la regla del proyecto, que es no registrar nada al montar una página.
Aquí lo hice a propósito: en un lector la sección se abre para leerla, no hay un
botón de "ya la leí" y no lo va a haber.

Lo que **no** se infla es la racha: `registrarEstudioDiario` tiene tope de una
vez al día por superficie, así que leer nueve secciones cuenta como un día de
estudio, no como nueve.

---

## 6 · Contenido que conviene que revise un experto

El módulo enseña normativa. Yo lo redacté desde el `.docx`, pero hay tres
puntos donde una revisión tuya vale la pena:

- **Sección 04, grupos de embalaje.** El `.docx` casi no lo desarrolla. Escribí
  qué son, los tres niveles y qué clases no lo llevan. Es correcto en general,
  pero es la sección con menos respaldo del material original.
- **Sección 07, "Mercancías ocultas y estiba".** El `.docx` no trae una sección
  de mercancías ocultas como tal. La armé alrededor de lo que sí trae: lo que
  sube en el equipaje de un pasajero, las baterías de litio y la segregación.
  Si esperabas la lista clásica de indicadores de mercancía oculta (descripciones
  genéricas de carga, equipaje de tripulación, etc.), esa no está.
- **Los 4 casos de práctica.** Pintura (clase 3), litio como carga (9), hielo
  seco (9) y sodio metálico (4.3). Elegidos para enseñar cosas distintas, no
  para cubrir las nueve clases.

Donde una cifra depende de la edición vigente, la sección lo dice. **No hay
ningún límite presentado como aplicable en línea de vuelo**, que era la
condición del punto 6 del brief.

---

## 6bis · Hasta dónde protege el visor de la Biblioteca

Para que quede dicho sin adornos, porque es fácil venderlo de más.

**Lo que sí hace.** El PDF se dibuja a canvas y **no se monta la capa de texto**
de pdf.js, así que el contenido son píxeles: no hay nada que seleccionar ni
copiar. Encima va `ContentGuard`, que bloquea el menú contextual, `Ctrl+C`,
`Ctrl+S` y `Ctrl+P`, oculta el contenido al imprimir y estampa el correo del
usuario en diagonal. Y la URL del archivo es firmada y caduca en una hora:
comprobado con una firma corta, deja de servir al vencer, y sin firma el bucket
responde error.

**Lo que no hace, y no lo va a hacer.** Nada de eso impide una captura de
pantalla; ningún navegador permite bloquearlas. Lo que de verdad desincentiva
compartirla es que salga con el correo impreso encima. Y para dibujar el PDF el
archivo tiene que llegar al dispositivo, así que alguien con la consola abierta
puede sacarlo. **No es un DRM y no conviene presentarlo como tal.**

Una consecuencia de no montar la capa de texto: **no hay buscador dentro del
documento**. Es el precio de que no se pueda copiar, y es el intercambio que
pediste.

---

## 7 · Lo que sigue esperando una decisión tuya, de antes

Sin cambios desde la auditoría del módulo Ingreso a aerolínea:

**Entrevista técnica, Entrevista HR y CRM, y Psicotécnicos: ¿son temas del
módulo o módulos aparte?** Hoy están prometidos en los dos sitios, en `PROXIMOS`
de `AirlinePrep.tsx` y como `/app/entrevistas` y `/app/psicotecnicas` en el
bloque "Próximamente" del sidebar, los dos como marcador de posición. No se ha
tocado nada a la espera de que elijas.

**Repetición espaciada.** Entre las 22 preguntas intercaladas de la lección, los
50 ejercicios de práctica, las 60 de evaluación y ahora las 45 del banco del
simulacro, hay material de sobra para una cola de repaso con lo que fallaste.
Hoy nada te devuelve un error. Es decisión de plataforma y toca también el banco
PCA, así que no se empezó.

---

## 8 · Pruebas psicotécnicas (8 de septiembre de 2026)

Entró el tema **Pruebas Psicotécnicas** en Ingreso a aerolínea
(`/app/aerolinea/psicotecnicas`): 245 ejercicios cronometrados de razonamiento
abstracto, espacial y numérico, tres modos, tres niveles y un simulacro de 30.
Con eso, la pregunta de la sección 7 queda medio respondida sola: psicotécnicos
es un **tema del módulo**, no un módulo aparte. `/app/psicotecnicas` sigue
existiendo como panorama amplio de assessment y ahora enlaza al tema real.

Quedan tres decisiones que no son técnicas y por eso no se tomaron.

### 8.1 · Derechos sobre el material — la que más urge

Los siete documentos que entregó Nico son cuadernillos de terceros, y cuatro
llevan marca de agua o logotipo del autor: Hospital Farallón y DaVinci Centro de
Estudios, AulaContable y Grupo Pinillos, Centro de Nivelación MARPID, y U. P.
Aula Magna. Las figuras se recortaron tal cual porque redibujarlas cambiaría el
ejercicio, así que **esas marcas se ven dentro de la app**.

Publicarlas en un producto de pago es una decisión de negocio. Las opciones, de
menor a mayor esfuerzo: pedir permiso a los autores, sustituir el material por
ejercicios propios, o dejar el módulo en acceso restringido hasta resolverlo. El
detalle documento por documento está en `src/data/psicotecnicas/FUENTES.md`.

### 8.2 · Faltan ~120 ejercicios por cargar, y no tienen clave

Dos documentos quedaron extraídos pero sin cargar, porque **ninguno trae hoja de
respuestas**:

- `455247140` (A2): 61 figuras, ya recortadas y versionadas en
  `public/psicotecnicas/abstracto/AB-A2-*.webp`.
- `354684364` (A3, `.docx`): 9 páginas escaneadas, unos 60 ejercicios de
  rotación, todavía dentro del archivo.

Resolver cada uno a ojo y cargarlo sin verificar sería peor que no tenerlos: un
banco de entrenamiento con respuestas equivocadas enseña al revés. Hace falta
una pasada de resolución y verificación. Ojo con A2: mezcla ejercicios
espaciales pese a llamarse «abstracto», así que la categoría se decide ejercicio
por ejercicio.

Del tercer documento de espacial que mencionaba el encargo no llegó ninguno.

### 8.3 · Dos ejercicios del original están mal, y uno se puede rescatar

Del documento `256486461` quedaron fuera dos de los cuarenta:

- **Ejercicio 11.** La respuesta correcta es 3!·2! = 12 y la alternativa D dice
  «12000». Es una errata evidente. Si la das por buena, se carga con la D
  corregida a 12 y recuperamos el ejercicio.
- **Ejercicio 37.** Ninguna lectura del enunciado produce una de sus cuatro
  alternativas. Está mal en la fuente, no en la extracción; este no se rescata.

### 8.4 · Detalle que conviene saber

Las 173 series numéricas del documento `336461140` son de **completar el
número**: el original no ofrece alternativas. Como el módulo funciona con opción
múltiple cronometrada, `scripts/psicotecnicas/generar-series.mjs` genera tres
distractores por ítem a partir de los errores típicos. La respuesta y el
desglose son los del documento; las alternativas no. Si prefieres que esas vayan
con campo de texto en vez de opción múltiple, es un cambio acotado al reproductor.

### 8.5 · Las visuales del tema

Todo lo que no es un ejercicio está dibujado para Aviatory, no recortado de las
fuentes: la portada del tema, las tres ilustraciones de familia del hub y las
dos láminas de la lección del cubo. Salen de
`scripts/psicotecnicas/generar-visuales.mjs`, que las genera como SVG y las
rasteriza a WebP; pesan 160 KB entre las seis y quedan fuera del precache.

Siguen el lenguaje de NOTAM y Mercancías —fondo navy, vector plano, trazo
blanco, un acento por pieza— con los tokens de marca de `src/index.css`
convertidos a sRGB, no aproximados a ojo. Si el diseño cambia, se tocan los
colores en el script y se regenera; no hay que rehacer nada a mano.

Las dos láminas de teoría del cubo sustituyen a las de la fuente 667035629, que
enseñaban lo mismo con la marca de agua de su autor encima. Son dos imágenes de
terceros menos en el producto.

## 9 · Figuras dibujadas: el orden del encargo hay que cambiarlo (9 de septiembre de 2026)

Sobre `docs/BRIEF_NICO_2026-09-09_PSICOTECNICAS.md`. El motor de figuras ya
está y funciona, pero el orden de ataque del punto 1.4 parte de una premisa que
no se sostiene, y conviene decidirlo antes de seguir dibujando.

### 9.1 · `AB-A2` no es «el más simple»: es el más variado de los tres

El brief lo describe como «una rejilla de dos por dos con una flecha arriba o
abajo en un cuadrante» y por eso lo pone primero. Revisadas las 61 una a una,
esa descripción vale para **una**: la `AB-A2-02`. El resto se reparte así:

| Qué son | Cuántas | ¿Se pueden describir por atributos? |
|---|---|---|
| Sólidos isométricos sombreados (vistas, proyecciones, desarrollos) | ~17 | **No.** Habría que escribir un motor 3D, no un vocabulario de figuras |
| Giros de polígonos irregulares y de escenas ilustradas (un `5`, una habitación con muebles, cuadriláteros arbitrarios) | ~5 | **No.** Son contornos sueltos: exactamente el `path` a mano que el brief prohíbe |
| Matrices y series con tramas, sombreados y texturas | ~4 | A medias, y cada una con su propio vocabulario |
| Series y matrices de primitivas geométricas | ~34 | Sí, pero casi una gramática distinta por ejercicio |
| Rejilla de flechas, la del brief | 1 | Sí |

El problema de fondo no es el trabajo: es que dibujar «por atributos» solo
compra algo cuando varios ejercicios comparten la misma gramática. En `AB-A2`
no la comparten, así que serían unas cuarenta gramáticas para cuarenta
ejercicios, y para diecisiete no hay gramática posible.

### 9.2 · `AB-A1` sí, y además es el que está haciendo daño hoy

Las veinte del `A1` comparten formato —matriz de tres por tres, un puñado de
primitivas— y **son las que están en producción con el logotipo de Facebook
impreso en mitad de la pregunta y las letras C y D cortadas**. Encima traen
clave de respuestas verificada, así que cada figura dibujada se puede contrastar
contra ella.

Por eso empecé por el `A1` y no por el `A2`, que es la única desviación del
brief. Si prefieres el orden original, dilo y se cambia: nada de lo hecho se
pierde, porque el `A1` es el punto 2 de tu propia lista.

### 9.3 · Lo que propongo para `AB-A2`

Que no se dibuje entero. Tres caminos, y creo que el tercero es el bueno:

1. **Dibujar solo lo que tenga gramática compartida** (la rejilla de flechas y
   las series de primitivas que se repitan), y dejar el resto fuera del banco.
2. **Encargar los sólidos isométricos como ilustración propia**, uno a uno. Son
   ~17 y no los resuelve ningún vocabulario.
3. **Dejar `AB-A2` donde está —sin cargar— y escribir ejercicios propios de
   razonamiento espacial.** Sale más barato que transcribir 61 ajenos, no tiene
   el problema de derechos del punto 8.1, y las respuestas nacen verificadas
   porque las genera el mismo código que dibuja la figura.

Recuerda que `A2` tampoco trae hoja de respuestas (punto 8.2), así que cargarlo
obliga además a deducir 61 respuestas. El solucionador nuevo
(`src/lib/psicotecnicasSolucionador.ts`) sabe hacerlo cuando la regla es de la
familia conocida, pero solo se pronuncia si la regla explica la figura con dos
apoyos como mínimo; con los sólidos sombreados no puede ni empezar.

### 9.4 · Lo que sí quedó hecho, y cómo se comprueba

- `src/lib/psicotecnicasFiguras.ts` — el vocabulario y el dibujo. El trazo es
  `currentColor`, así que la figura sigue al tema y desaparece el `bg-white`
  que metía un bloque claro en tema oscuro. El isotipo lo pone **una sola
  función**, y el lienzo crece para dejarle sitio en vez de mover el dibujo.
- `src/lib/psicotecnicasSolucionador.ts` — deduce la respuesta desde los
  atributos. Familia cerrada de reglas, mínimo dos apoyos, y si dos reglas
  señalan alternativas distintas el ejercicio sale como ambiguo en vez de
  publicarse.
- `scripts/psicotecnicas/verificar-figuras.mjs` — compara la respuesta deducida
  con la del banco, exige que el recorte original siga en `public/`, y escribe
  `revision-figuras.html` con el dibujo al lado del recorte. **Sale con error si
  no comprobó ninguna figura**, que es la lección del verificador de respuestas.
- `AB-A1-01` convertida y verificada: la regla es «unión de las dos primeras,
  por filas», da la C, y la C es lo que dice la clave del cuadernillo.

Ninguna respuesta del banco se tocó, y ningún `.webp` se borró.

### 9.5 · Dónde quedó cada matriz del A1

Trece de las veinte están dibujadas y en la aplicación; el resto sigue con su
recorte, ahora sin el logotipo de Facebook donde se pudo quitar.

| Matrices | Estado |
|---|---|
| 01, 03, 04, 05, 06, 07, 09, 11, 12, 17, 19, 20 | Dibujadas. El solucionador deduce la respuesta desde los atributos y coincide con la clave del cuadernillo |
| 02 | Dibujada. Su regla —los brazos del rombo se añaden y se quitan de uno en uno— no está en la familia del solucionador, así que **no tiene comprobación automática**: hay que aprobarla mirando el HTML de revisión |
| 08, 10, 13, 14, 15, 16, 18 | **Paradas, y cada una por su motivo.** Abajo, una por una |

### 9.5.1 · Volver al PDF original ya no es un remedio

El brief pedía que, si una figura no se lee en el recorte, se vuelva al
cuadernillo original. Se volvió, y ahí se acaba el camino: cada diapositiva del
`554759531` es **un JPEG de 720 × 720 píxeles** incrustado en la página. Se
comprobó en las nueve láminas que faltaban:

```
pdfimages -list -f 77 -l 77 554759531-Razonamiento-Abstracto-Series-de-Figuras.pdf
  77   0  image   720  720  rgb  3  8  jpeg   no   615  0   96  96
```

Los recortes que tenemos son de 974 × 1013, o sea que **ya son más grandes que
el original**: se rindió la página a 200 ppp y eso amplió el JPEG, sin añadir un
solo detalle. Rendirla a 400 ppp tampoco sirve, y se probó.

En esos 720 píxeles, cada alternativa de la tira de abajo ocupa unos 120 × 80.
Eso es lo que hay. Lo que no se distinga ahí no se distingue, y el único remedio
que queda es leerlo del cuadernillo en papel.

### 9.5.2 · Qué bloquea cada una de las ocho

| Matriz | Qué la para |
|---|---|
| **08** | Rectángulo con las dos diagonales. Lo que varía son cuerdas horizontales que cortan el triángulo de arriba a **alturas distintas**, y una barra vertical en el centro. La altura de la cuerda es una medida continua: dos casillas que se parecen pueden ser la misma o no, y no hay forma de decidirlo a esta resolución |
| **10** | Triángulos dentro de triángulos. La geometría cambia entera de casilla a casilla y no hay un vocabulario corto que la describa sin dibujar `path` a mano, que es justo lo que no se puede hacer aquí: un `path` no se compara, ni se resuelve, ni se verifica |
| **13** | Un arco en «C» con tres símbolos —triángulo, círculo, cuadrado— repartidos entre cuatro sitios. La **C y la D son la misma alternativa** salvo dónde cae el círculo respecto del vértice del arco: medido sobre los píxeles, el centro está al 21 % del ancho de la caja en la C y al 13 % en la D. Y no hay regla por filas ni por columnas que sostenga ninguna de las dos: el círculo va derecha, arriba, izquierda en la primera fila, y las tres veces izquierda en la segunda |
| **14** | La cuña negra dentro del círculo sectorizado. Su ángulo **es** la regla, y es pequeña; no se puede fijar con seguridad |
| **15** | Una cruz con trazos oblicuos. El banco dice que son «la misma figura girada», pero el número de trazos crece —uno, uno, uno / dos, dos, uno / tres, tres, ?—, así que o el enunciado está mal o los trazos no se leen bien. Sea lo que sea, hay que mirarlo con el papel delante antes de dibujar nada |
| **16** | Distinguir rayado «/» de rayado «\» por cuadrante. La medición automática dio cuadrantes rayados donde a ojo están en blanco, así que la medición está mal, no el ojo |
| **18** | La para el propio cuadernillo. Está abajo, en 9.5.3, porque el motivo es aprovechable |

### 9.5.3 · La 18 se queda fuera, y no por falta de lectura

Esta conviene contarla entera, porque está a un dato de cerrarse y ese dato lo
tiene el cuadernillo en papel.

Cada casilla son cuatro cuadrantes en aspa. Todo lo que decide está medido y
cuadra:

- **La mitad teñida** es constante en cada fila: en la primera, la mitad de
  abajo a la derecha del cuadrante de arriba a la izquierda; en la segunda, la
  de abajo a la izquierda del de arriba a la derecha; en la tercera, la de
  arriba a la izquierda del de abajo a la derecha.
- **La letra** también: A, B y C, una por fila, siempre en el mismo sitio de su
  cuadrante.
- **El punto** aparece una vez por fila y una por columna. Al hueco no le toca.
- **La barrita negra** también aparece una vez por fila y una por columna. Al
  hueco **sí** le toca.

Con eso la respuesta es la D, que es lo que dice la clave. El problema es que la
**B es idéntica a la D** salvo en una cosa: en la B cada cuadrante lleva una
sola diagonal en vez de las dos. Y la matriz no permite decidir eso, porque se
contradice a sí misma: las tres casillas de la primera fila pierden una
diagonal en su cuadrante teñido, la cuarta y la quinta la conservan, y la sexta
—que es de la misma fila que esas dos y tiene el mismo relleno— la pierde.

No es que el recorte la haya borrado. El gris mínimo a lo largo de esa línea es
de 24 a 64 en la cuarta y la quinta casilla, y de 235 a 255 en la sexta: en la
sexta no hay tinta.

Así que hay dos posibilidades, y las dos se resuelven mirando el papel:

1. El cuadernillo tiene un desliz en la sexta casilla. Si es eso, la diagonal
   está en el original, la regla pasa a ser «todos los cuadrantes con sus dos
   diagonales salvo en la primera fila», y la figura se cierra sola.
2. El cuadernillo dibuja las diagonales a ojo. Entonces la B y la D no se
   distinguen por nada que la matriz enseñe, y el ejercicio se queda fuera.

**Lo que hace falta:** que alguien mire en el cuadernillo impreso la casilla de
en medio de la derecha del problema 18 y diga si el cuadrante de arriba a la
derecha tiene una diagonal o dos. Con esa frase se dibuja en veinte minutos.

Las tres primeras filas del brief —11, 14 y 18— quedan así: la **11 está
hecha**, la 14 sigue fuera por el ángulo de la cuña, y la 18 espera esa
comprobación.

### 9.6 · El logotipo de Facebook ya no se ve en quince de las veinte

`scripts/psicotecnicas/quitar-marca.mjs` (ya sustituido por `recortar-laminas.mjs`, ver §12). El logotipo del cuadernillo A1 no está
dentro de la figura: cae en el hueco entre la matriz y las alternativas, así que
se puede recortar sin tocar el ejercicio. El script lo localiza por ser lo único
azul de la lámina, comprueba que entre la franja y el dibujo hay papel por
arriba y por abajo, y cose las dos mitades.

Quince quedaron limpias. En cinco —01, 02, 11, 14 y 18— la franja roza el dibujo
y el script se niega: **preferimos un recorte con marca a un recorte con el
ejercicio mordido**. De esas cinco, la 01 y la 02 ya están dibujadas, así que en
producción solo quedan tres láminas con el logotipo: la 11, la 14 y la 18.

Los originales no se tocaron. La lámina limpia se escribe al lado con el sufijo
`-limpio` y el banco apunta a ella por `src/data/psicotecnicas/laminasLimpias.ts`,
que genera el propio script.

Esto **no** sustituye al encargo de dibujar las figuras: las letras de las
opciones siguen cortadas en el recorte, y esa parte solo la arregla el dibujo.

### 9.7 · La portada, y la foto que le falta

`/app/aerolinea/psicotecnicas` está rehecha con el patrón de NOTAM: hero con la
foto a sangre bajo el velo navy, franja de avance de una sola caja con las tres
familias, y las cuatro partes en `CourseCard`. El vocabulario de movimiento no
se duplicó: se amplió el alcance de las reglas `.ln-*` que ya existían para el
lector de NOTAM, así que las dos pantallas se mueven igual y el bloque de
`prefers-reduced-motion` cubre las dos.

Dos cosas para ti:

1. **La foto del hero es prestada.** Usa `psicotecnicas-mano-panel.jpg`, que ya
   estaba en el repositorio y sale también en la landing. Funciona, pero no
   tiene el tratamiento navy de `notam-hero.webp`. Si quieres una propia, el
   corte es horizontal, sin texto encima.
2. **La franja enseña el último acierto por familia, no ejercicios resueltos.**
   El encargo pedía resueltos sobre el total, y ese dato hoy no existe: mientras
   la migración del punto 8.6 siga sin aplicar, los intentos solo viven en
   `localStorage` y no hay recuento por ejercicio. Antes enseñar lo que hay que
   inventar una cifra. En cuanto se aplique la migración, se cambia en un sitio.

### 9.8 · Un detalle que NOTAM también tiene

El sello «Sin intentos» de la franja iba con tres hexadecimales fijos —crema,
ocre y arena—, así que en tema oscuro quedaba un bloque claro en medio de la
franja. En psicotécnicas ya está arreglado: es `.psico-hub .ph-sello`, con el
ámbar de marca en translúcido y el texto que cambia de tono en oscuro, el mismo
trato que ya tenía `.chip-amber`.

**La celda de Evaluación de la portada de NOTAM lleva los mismos tres
hexadecimales** (`src/pages/Notam.tsx`, el sub componente `Celda`). No lo toqué
porque el encargo era la portada de psicotécnicas y NOTAM es tuyo, pero es
copiar la clase y borrar el `style`.

### 9.9 · El punto 3 del brief, el del movimiento

Hecho, salvo una cosa que hoy no se puede construir.

**El reloj es un aro** alrededor del contador, y se vacía a la vez que corre el
descuento —un segundo exacto, lineal—, así que no da un tirón en cada tic. En
los últimos diez segundos pasa a ámbar y a cero se queda vacío en rojo. **No
parpadea**: un parpadeo en mitad de un ejercicio rompe justo la concentración
que la prueba mide.

**La figura entra una sola vez**, al abrir la sesión, con la aparición de
`.ln-aparece`. Entre un ejercicio y el siguiente **no se anima nada**, que es lo
que pide el punto 3.4: cada milisegundo ahí es tiempo que el alumno pierde y que
en la prueba real no va a perder.

**Acierto y fallo solo en entrenamiento.** Ya era así por estructura —la
corrección depende de `corrigeAlMomento`—, y ahora además la transición de 160 ms
vive en `.psico-juego .pj-opcion`, con alcance, y no en estilos en línea.

**Las cifras del informe suben desde cero** una vez, en 600 ms, y solo el
resultado global, la precisión y la velocidad. Con el movimiento reducido
activado llegan puestas, sin recorrido.

De la interactividad del punto 3.3 entran dos de las tres:

- **Repasar lo que falló.** El informe trae ahora los fallados y los que se
  quedaron sin responder, plegados, con su figura y su explicación. Era el que
  el propio brief señalaba como el importante —«es donde se aprende»—, porque
  hasta ahora la explicación pasaba y no se recuperaba.
- **Dejarlo para el final.** Dentro de una sesión cronometrada se puede aplazar
  un ejercicio: se va al fondo de la cola y vuelve con el reloj de nuevo a cero.
  Solo una vez por ejercicio. El tiempo que se registra es el de la vuelta en
  que se responde, no la suma de las dos, que es lo que pasa en una prueba real.

**El comparador de los espaciales no.** Alternar entre el cubo y cada desarrollo
exige que la figura sea una descripción, y los dieciocho ejercicios espaciales
siguen siendo recortes: sobre un pixel no hay nada que alternar. Sale gratis en
cuanto se dibujen, y no antes.

## 10 · Verificación de las respuestas (9 de septiembre de 2026)

Camilo preguntó si las respuestas son las que son, porque en NOTAM salió un 70 %
con información errónea. Se revisaron las 238 contra los cuadernillos, sin
fiarse de lo que decía `FUENTES.md`. **Apareció un fallo, y era de los que no se
ven mirando la respuesta: la pregunta estaba mal.**

### 10.1 · Once ejercicios preguntaban otra cosa

El documento de series numéricas tiene diez bloques y **no todos piden lo
mismo**: seis dicen «completa la serie», dos dicen «señala el número erróneo» y
uno pide «los dos números que siguen». El generador los cargaba todos como
«Complete la serie».

Resultado: once ejercicios con la pregunta cambiada. El más claro, el 7.1: serie
«2, 4, 6, 7, 8, 10, 12», y el banco respondía **7**. Como continuación no tiene
sentido —el 7 ya está en la serie—; es la respuesta a «cuál sobra».

Encima, el cuadernillo **mezcla los dos tipos dentro del mismo bloque**: bajo el
encabezado de «número erróneo» hay series limpias cuya solución impresa es la
continuación. Así que el tipo se decide ahora **por ítem y con evidencia**: si la
respuesta impresa es uno de los términos de la serie, es el intruso; si no
aparece, es la continuación. Los once entran como «Señala el número que sobra»,
con las alternativas sacadas de la propia serie.

### 10.2 · Cómo queda comprobado el banco

| Origen | Cuántos | Contra qué |
|---|---|---|
| A1 abstracto | 20 | La lámina SOLUCIONES de su PDF. Coinciden los 20 |
| E1 espacial | 14 | La clave del final de su PDF. Coinciden los 14 |
| E2 espacial | 4 | La opción resaltada en las páginas 10–13. Coinciden las 4 |
| N1 numérico | 38 | Recalculadas desde el enunciado. Cuadran las 38 |
| N2 series | 162 | Resueltas de cero, sin mirar la respuesta: **129 coinciden, 0 discrepan** |

**205 de 238 comprobadas por una vía independiente de quien las cargó.** Las 33
restantes son 2 series ambiguas en el propio original y 31 con reglas fuera de
la familia del solucionador; se miraron a mano por muestreo y salieron bien,
pero eso no es estar comprobadas y por eso se cuentan aparte.

### 10.3 · Dos verificadores nuevos, y una regla

- `verificar-claves.mjs` lee la clave impresa de los dos PDF que la traen y la
  compara con el banco.
- `verificar-series.mjs` resuelve las 162 series **sin mirar la respuesta**,
  buscando la regla entre una familia cerrada; y a las de «número que sobra» las
  comprueba al revés, quitando cada término y viendo cuál deja una serie limpia.

Los dos siguen la regla de la casa: **cero comprobaciones no es un aprobado**.
Si falta el PDF, o no aparece su clave, salen con error en vez de dar por bueno
lo que no miraron.

### 10.4 · Lo que sigue sin poder comprobarse solo

Las dos series ambiguas son `NU-N2-08-04` (quitando el 58 o el 43 la serie queda
limpia) y `NU-N2-08-13` (quitando el 1, el 13 o el 15). No están mal: están mal
planteadas **en el original**. Se quedan con la respuesta del cuadernillo, pero
si quieres afinar el banco son las dos primeras candidatas a salir.

## 12 · Las veinte láminas del A1, rehechas desde el PDF

Nico vio en la app que la opción C salía tachada. No estaba tachada: **el
recorte partía la fila de letras por la mitad**. De la C solo sobrevivía el arco
de abajo de su recuadro —que en pantalla se lee como un tachón— y la D y la E
quedaban mordidas. Las veinte compartían el mismo encuadre de 1123 × 821, así
que era el recorte y no el original.

Ahora salen del PDF, con `scripts/psicotecnicas/recortar-laminas.mjs`. Lo que se
gana de una vez:

- Las cinco letras enteras, que era el defecto que se veía.
- **El logotipo de Facebook desaparece de las veinte**, incluidas la 11, la 14 y
  la 18, que eran las tres que el recorte anterior no podía limpiar sin morder
  el dibujo. Ya no queda ninguna marca ajena en el módulo abstracto.
- Fuera también la banda amarilla de la escuela, su logotipo, el correo, las
  flechas de navegación y la paginación del cuadernillo. Lo que queda es el
  ejercicio.
- Más resolución: 974 px de ancho contra los 1123 de una captura, pero rendidos
  a 200 puntos por pulgada desde el vector, así que el trazo es limpio.

`quitar-marca.mjs` queda borrado: hacía peor lo mismo, partiendo de una captura
en vez del original.

Sigue en pie dibujar las doce que faltan. Esto no lo sustituye: arregla lo que se
veía mal hoy, y quita la marca ajena, pero un recorte sigue siendo material de
otro.

## 13 · El damero de las láminas espaciales

Nico vio un ejercicio espacial que en la app parecía una imagen rota: la figura
diminuta en una esquina y el resto una cuadrícula gris. No era transparencia:
las láminas del cuadernillo E2 salieron de diapositivas con fondo transparente,
y al exportarlas **la cuadrícula que los editores dibujan para decir «aquí no
hay nada» quedó pintada dentro del pixel**. Doce láminas lo tenían.

`scripts/psicotecnicas/limpiar-espacial.mjs` lo apaga y reencuadra. El umbral no
es a ojo: el damero vive exactamente en 240 y 255, y el dibujo de estas láminas
no pasa de 224, así que se separan sin tocar el sombreado de mesas ni cubos.
Los cuatro ejercicios pasaron de 1181×855 con la figura al 20 % a un encuadre
ajustado.

### 13.1 · Y una que sí estaba mordida

`ES-E2-10` —el de los dos dados sobre la mesa— **tenía cortada la cara de arriba
del dado superior**, y ese ejercicio pide contar los puntos que NO se ven. Con
la cara cortada, la pregunta no se puede responder mirando.

Esa no se arregla reencuadrando, porque lo que falta ya no está en el archivo.
Se rehizo desde la página 13 del PDF, donde el dado sale entero. Comprobado que
la respuesta sigue cuadrando: dos dados son 42 puntos, se ven 1+5+3 arriba y 5+3
abajo —17—, quedan **25**, que es la A y es lo que dice la fuente.

### 13.2 · Lo que NO se pudo automatizar, y por qué queda anotado

Intenté sacar las cuatro del PDF con detección automática de la figura dentro de
la diapositiva. **No es fiable y lo dejé fuera**: en dos de los cuatro intentos
el recorte se llevó por delante la lista de alternativas, y en esas diapositivas
la respuesta correcta va resaltada en amarillo. Un recorte automático que falla
así no muestra una imagen fea: **le enseña la respuesta al alumno**.

La 10 se recortó a mano con coordenadas comprobadas una a una. Si hay que rehacer
otra desde el PDF, que sea igual: a mano y mirándola.

### 13.3 · Los ocho ejemplos siguen mordidos en origen

`ES-E2-ejemplo-04` a `-09`, `-14` y `-15` tienen el dibujo pegado al borde del
lienzo, o sea que el recorte original ya los cortó. El damero sí se les quitó,
pero lo que falta del dibujo no vuelve sin ir al PDF. Salen en la lección
Aprende, no en un ejercicio con respuesta, así que el daño es menor — pero está
sin arreglar y conviene saberlo.

## 14 · Reportar un fallo desde la app

Los tres últimos fallos del módulo —la fila de letras cortada, el damero de
fondo, el dado sin su cara de arriba— **los encontró Nico mirando la pantalla,
no ninguno de los seis verificadores**. Y no fue mala suerte: los verificadores
comprueban que la respuesta sea la correcta y que el archivo exista, y ninguno
puede mirar si la imagen se ve bien. Ese hueco no se tapa con más verificadores.

Quien sí mira todas las pantallas, todos los días, es el piloto.

Debajo de cada ejercicio hay ahora un «¿Algo mal en esta pregunta?»: cuatro
motivos de un toque —imagen, respuesta, enunciado, otra cosa— y un campo libre
opcional. El reporte se guarda con el **identificador de la ficha**, y ahí está
todo el valor: «una imagen se ve mal» no se puede arreglar; «ES-E2-10, la figura
está cortada» lleva directo al archivo, a la ficha y a la página del cuadernillo.

Sale en dos sitios: en el reproductor cuando ya se reveló la respuesta —durante
la tanda cronometrada no, que ahí cualquier cosa roba tiempo— y en el repaso del
informe, que es la única ocasión en que un piloto de evaluación o de simulacro
vuelve a ver la figura con calma.

### 14.1 · Por qué no es un correo

Porque hoy no hay a dónde mandarlo: no hay dominio, `hola@aviatory.app` no tiene
MX, y el remitente de fábrica de Supabase está limitado a unos pocos envíos por
hora. Un aviso por correo se perdería en silencio, que es peor que no tenerlo.

Va a una tabla, `content_reports`, que puedes consultar desde la consola desde el
primer día. Cuando haya correo, añadir el aviso encima es una línea.

### 14.2 · Cómo los lees

La tabla ya está en la base: la migración se aplicó el 10 de septiembre de 2026.
Para leer lo que vaya llegando:

```sql
select created_at, modulo, ejercicio_id, motivo, detalle, contexto
from public.content_reports
where estado = 'nuevo'
order by created_at desc;
```

Y para cerrarlos: `update public.content_reports set estado = 'arreglado' where id = '…';`
No hay política de update para los pilotos a propósito: marcar un reporte como
atendido es de quien lo atiende, no de quien lo mandó.

---

## 15 · Cuatro matrices más del A1 (10 de septiembre de 2026)

Están dibujadas la **11, la 12, la 19 y la 20**. Con las ocho de antes, doce de
veinte. Las cuatro las deduce el solucionador por su cuenta y las cuatro
coinciden con la clave impresa del cuadernillo.

| | Regla | Responde |
|---|---|---|
| **11** | La letra y la trama del lomo van en sudoku, y hay un tercero fuera del recuadro: de cada casilla cuelga un tallo y la barra del final aparece dos veces por fila y dos por columna | A |
| **12** | Dos sudokus a la vez: el símbolo —asterisco, viga, línea— y la cantidad —tres, cuatro, cinco— | E |
| **19** | Los puntos van 0, 2 y 4 en cada fila. Las columnas no dicen nada | E |
| **20** | La tercera casilla de cada fila es la **suma** de las dos anteriores | A |

### 15.1 · Dos cosas se contaron con el ordenador, no con el ojo

En la **12**, la segunda casilla tiene cuatro líneas verticales, no cinco. A ojo
se cuentan mal. Se contaron buscando tramos oscuros en una fila de píxeles, y el
resultado se comprueba solo: con cinco, el cuadro de cantidades no cierra.

En la **19**, los puntos se contaron detectando manchas macizas —discos negros
de tamaño y densidad conocidos—, no mirando. Cuatro y cinco puntos se confunden.

Esto es lo que hay que hacer con lo que se cuenta. El ojo sirve para decir «hay
un asterisco», no para decir «hay cinco».

### 15.2 · El solucionador aprendió dos cosas, y desaprendió una

**Un atributo sin regla ya no tumba la figura.** En la 12, la orientación de la
línea que falta no es regla de fila ni de columna: las tres líneas giran
cuarenta y cinco grados cada vez, y declararle al programa qué orientaciones
existen sería escribirle la respuesta. Ahora ese atributo se marca como libre,
la predicción sale sin él y se exige que encaje **una sola** alternativa. Si
encajaran dos, sigue saliendo ambiguo.

**Una regla nueva, más floja y por eso más exigente.** La 19 se sostiene solo
por filas —la columna del medio trae dos, dos y cuatro—, así que hizo falta
«mismo reparto en cada fila, no en las columnas». Para valer pide que el reparto
sean **tres valores distintos**: un reparto de dos, del tipo «dos sí y un no»,
repetido en tres filas sale por casualidad demasiado a menudo. Vale dos apoyos,
los justos, y el verificador la nombra entera para que se vea sobre qué se
apoya cada figura.

**Y lo que se desapretó de más:** al dejar libres los atributos sin regla se
estaban dejando libres también los que tenían dos reglas **contradiciéndose**.
No es lo mismo. No saber es no saber; decir dos cosas a la vez significa que la
transcripción o la figura están mal, y eso vuelve a sacar al ejercicio del
banco. Ya están separados los dos casos.

### 15.3 · Cómo comprobarlo

```bash
node scripts/psicotecnicas/verificar-figuras.mjs
node scripts/psicotecnicas/revisar-modulo.mjs
```

El primero falla si una figura dibujada no está ni deducida ni firmada. El
segundo escribe `revision-modulo.html` con los 238 ejercicios para mirarlos de
golpe. Hoy: **12 dibujadas, 11 deducidas automáticamente**, y la 02 sigue
esperando que una persona la refrende.

### 15.4 · Y una más: la 17

Entró después de las cuatro de arriba, y merece una línea porque casi se queda
fuera por una lectura mía equivocada. Las puntas del casco no son «negra o
blanca»: se tiñe **media** punta, la de arriba o la de abajo, y eso es la regla.
Leídas como enteras, el ejercicio se queda sin nada que seguir. Se midió la
densidad de tinta en las cuatro medias puntas de cada casilla —0.72 contra
0.15— y ahí no hay discusión.

El solucionador, además, se plantó con razón: el cuerpo viene partido en cuatro
cuadros, en cuatro columnas o entero, y esa partición hasta cae en un cuadro por
columnas, así que predecía una casilla partida que no encaja con ninguna
alternativa. Pero **las cinco alternativas traen el cuerpo entero**: el
cuadernillo no está preguntando eso. Ahora se ignoran los atributos que valen lo
mismo en las cinco, que es un veto que solo podía inventar desacuerdos.

Con la 17 van **trece de veinte**.

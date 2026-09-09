# Tarea: cerrar psicotécnicas — la migración, las figuras y las respuestas

Pégale esto completo a tu Claude Code, parado en la raíz del repo, con `main`
actualizado. Tu rama ya está fusionada y publicada en `8da3929`.

Tres cosas, en este orden: aplicar la migración, terminar de dibujar las doce
figuras que faltan, y dejar auditada cada respuesta del banco. La regla que
manda sobre todo lo demás está en el punto 3: **ninguna figura se da por hecha
hasta que tres fuentes independientes digan la misma respuesta.**

---

## 0 · Dónde estamos exactamente

Medido sobre `main` hoy, no de memoria:

| Estado | Láminas | Cuáles |
|---|---|---|
| Dibujadas en vector | 8 | 01 02 03 04 05 06 07 09 |
| Recorte limpio, sin logo | 15 | 03 04 05 06 07 08 09 10 12 13 15 16 17 19 20 |
| **Con el logo de Facebook todavía** | **3** | **11 14 18** |
| Pendientes de dibujar | 12 | 08 10 11 12 13 14 15 16 17 18 19 20 |

De las pendientes, tú dejaste paradas a propósito la **08**, la **10** y la
**11**: no se leen con seguridad sus extensiones en el recorte. Eso sigue siendo
la decisión correcta y el punto 2.3 dice cómo cerrarlas.

Verificación del banco hoy:

```
verificar-banco       238 ejercicios, 39 con figura, todas las rutas existen
verificar-numerico    38 de 38 recalculados desde el enunciado
verificar-respuestas  97 de 162 series comprobadas, 0 discrepancias
verificar-claves      34 de 34 contra la clave impresa
verificar-series      129 resueltas de cero, 0 discrepancias
verificar-figuras     7 de 8 deducidas; AB-A1-02 sin comprobación automática
```

---

## 1 · La migración

`supabase/migrations/20260908010000_modulo_psicotecnicas.sql`. Sin ella los
intentos solo viven en `localStorage`, no pasan de un dispositivo a otro, y el
logro `psico_simulacro` no se desbloquea nunca.

### 1.1 · Por qué está frenada

`supabase db push` se detiene porque el historial del repositorio y el de la base
están desincronizados. La base tiene **doce migraciones aplicadas a mano que no
existen como archivo**, de `20260730050401` a `20260803191653`. Cinco de ellas ya
se marcaron como aplicadas —mercancías, biblioteca por módulos, ICAO speaking,
simulacro de aerolínea y páginas de biblioteca— porque esas funciones están vivas
en la app y marcarlas solo dejó escrito lo que ya era cierto. Faltan las otras
siete.

### 1.2 · Cómo cerrarlo

Lo correcto es `supabase db pull`, que trae a archivos lo que se aplicó a mano.
Marcarlas como revertidas sería mentir: están aplicadas.

```bash
supabase db pull                 # trae el esquema real a un archivo nuevo
git diff                         # LÉELO ENTERO antes de seguir
supabase db push                 # ahora sí, aplica la de psicotécnicas
```

> **El paso que no puedes saltarte es el `git diff`.** `db pull` escribe el
> esquema tal como está hoy en la base, y ahí dentro va
> `check_and_unlock_achievements` en su versión viva, que incluye logros que se
> añadieron en esas migraciones sueltas. Si el archivo que genera acaba
> reemplazando esa función por la versión que guarda el repositorio, revierte en
> silencio logros que hoy funcionan. Revisa esa función línea a línea antes de
> hacer `push`.

La migración nueva es **puramente aditiva** y está escrita así a propósito: crea
`user_psico_attempts` con su seguridad por fila, su índice, sus dos políticas, su
umbral, su logro, su propia función `check_psico_achievement()` y su disparador.
**No recrea `check_and_unlock_achievements`.** No la cambies para que lo haga.

### 1.3 · Autorización de la URL

En Supabase, en Authentication → URL Configuration, hay que autorizar
`https://aviatoryapp-mu.vercel.app/nueva-clave`. Eso es del PR de recuperación de
contraseña, pero se hace en la misma sesión de consola y conviene no volver.

### 1.4 · Cómo compruebas que quedó

No basta con que el comando termine sin error:

1. Haz un simulacro completo en la app, con sesión iniciada.
2. Comprueba que aparece una fila en `user_psico_attempts` con tu `user_id`.
3. Cierra sesión, entra desde otro navegador y comprueba que el avance viaja.
4. Comprueba que el logro `psico_simulacro` se desbloqueó.
5. Comprueba que **los logros que ya tenías siguen ahí**. Es la prueba de que el
   `db pull` no pisó nada.

---

## 2 · Las doce figuras que faltan

### 2.1 · Prioridad

Primero la **11**, la **14** y la **18**. Son las tres que siguen con el logotipo
de Facebook impreso en mitad de la pregunta, en producción, ahora mismo. Dibujar
esas tres quita la última marca ajena del módulo. El resto puede ir después.

### 2.2 · El vocabulario

Si una lámina no cabe en el vocabulario que ya tiene
`src/lib/psicotecnicasFiguras.ts`, **se amplía el vocabulario**. No metas un
`path` a mano: en cuanto haya trazos sueltos, el solucionador deja de poder
deducir la respuesta y perdemos la única red que tenemos.

Cada atributo nuevo que añadas tiene que ser algo que el solucionador pueda
seguir por filas y por columnas. Si no lo puede seguir, no es un atributo: es un
dibujo.

### 2.3 · Las tres que dejaste paradas

La 08, la 10 y la 11 no se leen con seguridad en el recorte. No las adivines.
Para cada una:

1. Vuelve al PDF de origen, no al `.webp`, y ábrelo al máximo aumento.
2. Si sigue sin leerse, dibújala con el atributo dudoso marcado como
   **incierto**, y déjala fuera del banco hasta resolverlo.
3. Anota en `FUENTES.md` qué no se leía y qué decidiste.

**Una figura dudosa fuera del banco es mejor que una figura inventada dentro.**

---

## 3 · La regla que manda: tres fuentes, una respuesta

Esto es lo que Camilo pidió y es el corazón del encargo. Una figura no está hecha
cuando se ve bien. Está hecha cuando **tres fuentes independientes coinciden**:

| # | Fuente | Cómo se comprueba |
|---|---|---|
| 1 | La clave impresa del cuadernillo | `verificar-claves.mjs` |
| 2 | El solucionador, deduciendo desde los atributos | `verificar-figuras.mjs` |
| 3 | El ojo, sobre el HTML de revisión | Manual, y se firma |

Si las tres coinciden, la figura entra. Si dos coinciden y una no, **se para y se
mira**, no se elige por mayoría. Si el solucionador no puede deducirla, esa
figura no puede entrar sin aprobación manual explícita.

### 3.1 · El caso que ya tienes abierto

`AB-A1-02` es la única de las ocho dibujadas que el solucionador no explica:
«ninguna regla de la familia explica la figura con al menos 2 apoyos». Su
respuesta es la de la clave del cuadernillo, así que dos de las tres fuentes
están. Falta la tercera.

Hay dos salidas y las dos valen:

- **Enseñarle la regla al solucionador**, si la figura tiene una regla real que
  todavía no sabe seguir. Es la buena, porque sirve para las que vengan.
- **Aprobarla a mano** sobre el HTML, y dejar constancia. Si eliges esta, tiene
  que quedar registrado en el propio banco, no en un comentario suelto.

### 3.2 · Lo que falta en la herramienta

`revision-figuras.html` se genera y está en `.gitignore`, así que la aprobación
manual no deja rastro: nadie puede saber después qué figuras se miraron y cuáles
no. Añade un registro de aprobación versionado, por ejemplo
`src/data/psicotecnicas/figurasAprobadas.ts`, con la lámina, quién la aprobó y
contra qué. Y que `verificar-figuras.mjs` **falle** si una figura dibujada no está
ni deducida por el solucionador ni aprobada en ese registro.

Hoy el verificador avisa y sigue. Tiene que parar.

---

## 4 · La auditoría de las respuestas

De las 238, hay 205 comprobadas de forma independiente. Quedan 33 y no todas son
iguales.

### 4.1 · Lo que hay que decidir, no verificar

**Los bloques 9 y 10 de las series preguntan otra cosa que el documento.** Esto
es lo mismo que arreglaste en los bloques 7 y 8, pero no llegó hasta aquí. El
cuadernillo dice, en el ejercicio 9:

> «En este ejercicio debes hallar **los dos números que siguen** a la serie.»

Y el ejercicio 10 **no trae instrucción propia**, así que hereda esa. En la app,
los 24 ejercicios de esos dos bloques siguen preguntando «Complete la serie» con
una sola respuesta.

No está roto como lo estaba el bloque 7: en `NU-N2-09-01` la respuesta 71 sí es un
término válido de continuación. Pero la regla de ese bloque alterna de dos en dos
y con un solo término no se puede demostrar, y las alternativas están generadas
para la pregunta equivocada.

Dos salidas:

- **Pedir los dos números**, con las alternativas en pares («71 y 72»). Es fiel al
  documento y el ejercicio recupera su gracia.
- **Dejar uno solo y decirlo**, cambiando el enunciado a algo que sea verdad.

Lo que no vale es que el enunciado diga una cosa y la fuente otra.

### 4.2 · Las dos ambiguas

`NU-N2-08-04` y `NU-N2-08-13` son ambiguas en el original. Si no se pueden cerrar
mirando la fuente, sácalas del banco. 160 series buenas valen más que 162 con dos
que admiten dos lecturas.

### 4.3 · Las 31 restantes

Son las que el solucionador no sabe resolver porque su regla queda fuera de la
familia que entiende. Para cada una, una de estas tres, y queda anotada cuál:

1. El solucionador aprende la regla.
2. Se comprueba a mano contra el desglose del documento y se registra.
3. Sale del banco.

---

## 5 · Antes de abrir el PR

```bash
node scripts/psicotecnicas/verificar-banco.mjs
node scripts/psicotecnicas/verificar-numerico.mjs
node scripts/psicotecnicas/verificar-respuestas.mjs "C:/Datos/Downloads"
node scripts/psicotecnicas/verificar-claves.mjs "C:/Datos/Downloads"
node scripts/psicotecnicas/verificar-series.mjs "C:/Datos/Downloads"
node scripts/psicotecnicas/verificar-figuras.mjs
npx tsc -b
npm run build
```

Y estas tres, que no las ve ningún script:

- Abre un ejercicio de cada familia en el navegador y compruébalo con los ojos.
- Ponlo en tema oscuro.
- Ponlo a 375 px de ancho.

### La trampa que ya nos costó caro

`verificar-respuestas.mjs` daba «0 verificadas, 0 discrepancias» y en pantalla se
leía igual que un aprobado, porque no encontraba la sección del PDF y no lo
decía. Ya lleva `-enc UTF-8` y sale con error. **Cualquier verificador que
escribas tiene que fallar cuando no comprueba nada.** Cero comprobaciones no es
un aprobado.

---

## 6 · La decisión que sigue abierta

`AB-A2`, las 61 figuras. Tu lectura era la correcta y el orden del encargo
anterior partía de una premisa falsa: describí el conjunto entero mirando una
sola figura. Revisadas, hay rejillas con flechas, rotaciones del número 5,
hexágonos con un cuadrado orbitando y tramas de radios con puntos cuya posición
es la regla. No hay un vocabulario común.

**Recomendación en pie: no dibujarlo.** Escribir ejercicios espaciales propios
cuesta parecido, no arrastra el problema de origen y el material queda nuestro.
Esa decisión es de Camilo y todavía no está tomada, así que **no empieces por
ahí**. Las doce del A1 primero.

---

## 7 · Nota de producto

Los cuadernillos son de donde salieron los ejercicios, no son parte del producto.
No aparecen en la interfaz, ni citados, ni con su marca. La trazabilidad vive en
el campo `fuente` de cada ficha y en `src/data/psicotecnicas/FUENTES.md`, que es
documentación interna.

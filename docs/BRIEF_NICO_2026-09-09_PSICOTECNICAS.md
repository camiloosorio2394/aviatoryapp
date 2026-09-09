# Tarea: psicotécnicas en formato propio

Pégale esto completo a tu Claude Code, parado en la raíz del repo, con `main`
actualizado (`bc1aa2e` o posterior).

Son tres encargos sobre el tema que ya está en producción: sacar los ejercicios
de los recortes de PDF y dibujarlos como figuras nuestras, rehacer la portada de
acceso con el diseño del módulo NOTAM, y darle el movimiento que hoy no tiene.

---

## 0 · Por qué hay que hacerlo

El tema funciona. El problema está en las 38 figuras que vienen recortadas de los
cuadernillos. Mirándolas una a una:

- Las 20 de abstracto del conjunto `AB-A1` llevan un logotipo de Facebook y el
  usuario `/eshingre` impresos **en mitad de la pregunta**, entre la matriz y las
  opciones.
- En esas mismas 20 el recorte **corta las letras de las opciones**: la C se ve
  solo por el arco de arriba y la D queda partida. Las 20 comparten un encuadre
  idéntico de 1123 × 821, así que es el recorte y no el original.
- En las 14 de espacial `ES-E1`, la marca de agua de DaVinci cae **justo encima
  de las opciones B y C**, que son las figuras que hay que comparar para
  responder.

Reencuadrar arregla lo segundo y nada más: las marcas están impresas dentro de la
imagen. La única salida que las quita y que además nos deja el material en casa
es dibujar los ejercicios nosotros.

### Lo que ya juega a favor

- **No son fotografías.** Son rectángulos con segmentos, triángulos, cruces,
  barras negras, circulitos y flechas. El conjunto `AB-A2` es aún más simple: una
  rejilla de dos por dos con una flecha arriba o abajo en un cuadrante.
- **El análisis ya está escrito.** Cada ficha tiene su `imagenAlt` describiendo la
  figura y su `explicacion` nombrando qué atributos varían. Esto no es deducir el
  ejercicio otra vez: es codificar algo ya analizado.
- **Ya sabemos dibujar lo más difícil.** `scripts/psicotecnicas/generar-visuales.mjs`
  tiene `cubo()`, `tapaLevantada()`, `caraAbierta()`, `reticula()` y `etiqueta()`,
  en uso para las láminas de teoría. Es justo lo que necesita la familia espacial.

---

## 1 · Los ejercicios, dibujados por nosotros

### 1.1 · El cambio estructural que importa

Hoy `EjercicioPsico` lleva `opcionesEnImagen: true`: las opciones A–E existen solo
como letras en los botones y los dibujos están dentro del pixel de la imagen
grande. Por eso duele que la C esté cortada.

Al dibujar, **cada opción pasa a ser su propia figura y su propio botón**.
`opcionesEnImagen` desaparece para estos ejercicios. El problema se resuelve por
estructura, no por encuadre, y de paso el ejercicio se vuelve usable en un móvil,
donde hoy hay que ampliar una imagen de 1123 px para distinguir dos trazos.

### 1.2 · Modelo de datos

La forma exacta la decides tú, pero tiene que cumplir dos cosas: describir la
figura **por atributos** y no por coordenadas sueltas, y que el enunciado y las
opciones salgan de la misma descripción. Boceto para `AB-A2`, el más simple:

```ts
// Rejilla 2×2, una flecha en un cuadrante.
// cuadrante: 0=sup-izq 1=sup-der 2=inf-izq 3=inf-der
type CeldaFlechas = { flechas: { cuadrante: 0 | 1 | 2 | 3; sentido: "arriba" | "abajo" }[] }

{
  id: "AB-A2-02",
  figura: {
    tipo: "serie-lineal",
    celdas: [
      { flechas: [{ cuadrante: 1, sentido: "arriba" }, { cuadrante: 2, sentido: "abajo" }] },
      { flechas: [{ cuadrante: 0, sentido: "abajo" }, { cuadrante: 3, sentido: "abajo" }] },
      // …
      { tipo: "incognita" },
    ],
    opciones: [ /* cuatro CeldaFlechas */ ],
  },
}
```

Para `AB-A1`, que son matrices de tres por tres con figuras compuestas, mismo
principio: un rectángulo contenedor y una lista de elementos con su tipo
(`diagonal`, `vertical`, `trazo-esquina`, `triangulo`, `barra`, `cruz`, `circulo`)
y su posición.

**Si un ejercicio no cabe en el vocabulario, se amplía el vocabulario.** No metas
un `path` a mano: en cuanto haya trazos sueltos perdemos la ventaja entera.

### 1.3 · La marca de Aviatory en la figura

Va el isotipo monocromo, que ya existe en
`src/assets/logos/aviatory-isotype-mono.svg`. **No** el logotipo horizontal: en
una figura de ejercicio el wordmark compite con el enunciado.

- **Dónde**: esquina superior derecha del lienzo, fuera del área de dibujo.
- **Tamaño**: 18 px de alto en el `viewBox` de la figura, sin escalar con el zoom
  del ejercicio.
- **Color**: el token de texto secundario al 35 % de opacidad. Marca de agua
  discreta, que no compita con los trazos.
- **Quién lo pone**: el generador, en una sola función, para que salga idéntico en
  las 99 figuras. Nunca copiado ficha por ficha.

> **Regla de oro.** La marca no puede tocar ninguna parte del ejercicio. Si en
> alguna figura el dibujo llega a esa esquina, **se crece el lienzo, no se mueve
> el dibujo**. Mover el dibujo cambia el ejercicio.

### 1.4 · Orden de ataque

| # | Conjunto | Cuántas | Por qué en ese orden |
|---|---|---|---|
| 1 | `AB-A2` | 61 | El más simple, y todavía no está publicado: si se dibuja ahora, esos recortes no llegan a salir nunca. |
| 2 | `AB-A1` | 20 | Quita de un golpe el logo de Facebook y las letras cortadas, que hoy están en producción. |
| 3 | `ES-E1` y `ES-E2` | 18 | Lo más costoso, pero las primitivas de cubo ya existen. |
| — | Numérico | 200 | Ya está en formato propio: son datos, se generan y se verifican. No se toca. |

### 1.5 · Verificación, que aquí no es opcional

El riesgo de este encargo no es el tiempo, es la transcripción: una flecha al
revés cambia la respuesta correcta y nadie se entera. Hace falta un verificador
nuevo, `scripts/psicotecnicas/verificar-figuras.mjs`, que antes de borrar ningún
recorte:

1. Renderice la figura dibujada al lado del recorte original, en un HTML de
   revisión que se abra en el navegador.
2. Compruebe que el número de opciones dibujadas coincide con `opciones.length`.
3. Compruebe que la respuesta declarada sigue apuntando a la misma opción que en
   el recorte.
4. Falle con código de salida distinto de cero si alguna figura del banco no tiene
   descripción, igual que hace `verificar-banco.mjs` con los archivos.

### 1.6 · Lo que NO hay que hacer

- **No borres ningún `.webp` de `public/psicotecnicas/`** hasta que su figura
  dibujada esté revisada una a una contra el recorte. Son la única prueba de qué
  decía el original.
- **No cambies ninguna respuesta.** Si al dibujar te parece que la del banco está
  mal, párate y anótalo. Ya pasó con las once series que se dejaron fuera y con la
  respuesta truncada: eso se decide mirando la fuente, no dibujando.
- **No edites `src/data/psicotecnicas/series.ts` a mano.** Lo reescribe
  `generar-series.mjs`.

### 1.7 · Criterio de aceptación

- Las tres verificaciones del banco siguen pasando.
- El verificador nuevo pasa y su HTML de revisión está aprobado figura por figura.
- Ningún ejercicio convertido conserva `opcionesEnImagen`.
- La marca aparece en todas las figuras, misma posición y tamaño.
- Las figuras se ven bien en tema claro y oscuro, y legibles a 375 px sin ampliar.

---

## 2 · La portada, con el diseño del módulo NOTAM

Que `/app/aerolinea/psicotecnicas` se lea como la misma casa que
`/app/aerolinea/notam`. Hoy es una pila de tarjetas redondeadas. El patrón bueno
ya está en `src/pages/Notam.tsx`, tal como quedó en `a2a239b`.

La pantalla responde tres preguntas en este orden, y ese orden **es** el diseño:
qué es esta sección, cómo vas, por dónde entras.

### 2.1 · El hero

Tarjeta con la foto a sangre bajo un velo navy. El velo es un degradado y no una
opacidad plana, porque el titular tiene que leerse sobre cualquier zona de la
imagen.

```tsx
<section className="relative overflow-hidden rounded-[18px]
                 shadow-[0_1px_2px_rgba(11,27,48,0.08)]">
  <img src={portada} alt="" aria-hidden
       className="absolute inset-0 h-full w-full object-cover" />
  <div className="pointer-events-none absolute inset-0" aria-hidden
       style={{ background:
         "linear-gradient(105deg, rgba(8,20,36,.90) 0%, rgba(8,20,36,.76) 40%," +
         " rgba(8,20,36,.50) 70%, rgba(8,20,36,.30) 100%)" }} />

  <div className="relative grid gap-8 px-7 pb-10 pt-9 sm:px-12 sm:pb-12 sm:pt-11
                  lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-10">
    …
  </div>
</section>
```

| Pieza | Especificación |
|---|---|
| Epígrafe | «SECCIÓN 02» en `#7FB2F2` + filete vertical `bg-white/20` + «INGRESO A AEROLÍNEA» en `text-white/60`. Archivo 11 px, `tracking-[0.16em]`, mayúsculas. |
| Titular | «Pruebas psicotécnicas». Archivo 700, `text-[42px] sm:text-[52px] lg:text-[64px]`, `tracking-[-0.03em]`, `leading-none`, blanco. |
| Bajada | 17 px, `leading-[1.6]`, `text-white/80`, `max-w-[56ch]`. Qué se entrena y por qué lo piden las aerolíneas. |
| Botón primario | «Empezar a practicar». `bg: var(--av-blue-500)`, `rounded-[10px]`, `min-h-[48px]`, `px-6`, `shadow-[0_6px_18px_rgba(10,26,47,0.35)]`. |
| Botón secundario | «Hacer el simulacro». Transparente, `border-white/25`, `text-white/90`, `hover:border-white/60`, `whitespace-nowrap`. |
| Panel de avance | `rounded-[14px] border-white/15 bg-[rgba(6,17,31,0.62)] backdrop-blur-[6px] px-5 py-[18px] lg:min-w-[230px]`, con `self-start`. Rótulo «Tu avance» a 10 px, cifra Archivo 700 a 40 px, barra de 4 px con relleno `#4E9BF5`, nota de guardado a 12 px en `text-white/55`. |

### 2.2 · La franja de avance

Una sola caja con tres celdas, no tres tarjetas sueltas. El separador es el hueco
de un píxel de la retícula sobre el color del borde:

```tsx
<div className="mt-6 grid gap-px overflow-hidden rounded-[14px] border border-border
                bg-border [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
```

Cada celda en `bg-card px-6 py-[22px]`: título Archivo 600 a 16 px, cifra a 14 px
del color de la familia, barra recta de 5 px, pie a 11 px en
`text-muted-foreground`. Aquí las tres celdas son las tres familias —
**Abstracto**, **Espacial**, **Numérico** — con resueltos sobre el total de cada
una.

> **Lo que rompió esto en NOTAM.** Cuando la cifra se sustituye por un sello, por
> ejemplo «Sin intentos», el sello necesita `whitespace-nowrap` y `shrink-0`. Sin
> eso parte en dos líneas y descuadra la altura de toda la franja.

### 2.3 · Las cuatro entradas

Debajo, «Por dónde vas a pasar» con el mismo `CourseCard` que ya usa NOTAM: media
de 140 px con velo inferior, sello con icono y número, meta, título, texto, la
llamada a la acción y el pie con barra y estado. Las cuatro son Aprende, Práctica,
Evaluación y Simulacro.

### 2.4 · Detalles que no se pueden saltar

- **Traduce a tokens, no copies hexadecimales.** El único color fijo del hero es el
  velo, porque va sobre una foto. Todo lo demás sale de `var(--av-*)`, `bg-card`,
  `border-border` y `text-muted-foreground`, para que siga al tema.
- **La familia de titulares va con alcance.** En NOTAM se declaró
  `.notam-hub .nh-display { font-family: "Archivo", var(--font-sans) }` en
  `src/index.css`. Haz lo mismo con `.psico-hub .ph-display`. No toques la familia
  global.
- **Ninguna cifra escrita a mano.** Los totales salen del banco. Si mañana entran
  las 61 del `AB-A2`, la portada tiene que decir el número nuevo sola.
- **Falta la foto de portada.** Horizontal, tratamiento navy, sin texto encima, del
  mismo corte que `src/assets/photos/notam-hero.webp`. Va importada desde
  `src/assets/photos/`, **no** desde `public/`, para que Vite le ponga hash y no
  dependa de la reescritura de Vercel.

### 2.5 · Criterio de aceptación

- Puestas una al lado de la otra, las portadas de NOTAM y de psicotécnicas se leen
  como la misma pantalla con otro contenido.
- Las tres celdas de la franja miden lo mismo de alto y de ancho, y ningún sello
  parte en dos líneas.
- En tema oscuro no queda ningún bloque claro fuera de sitio.
- A 375 px el hero pasa a una columna y la página no se desplaza en horizontal.

---

## 3 · Movimiento con función, y solo con función

El módulo NOTAM ya tiene un vocabulario de animación que funciona y respeta
`prefers-reduced-motion`. **Reutilízalo** en vez de inventar otro: es lo que hace
que las dos secciones se sientan la misma aplicación.

### 3.1 · Lo que ya existe en `src/index.css`

| Clase | Qué hace | Cómo se dispara |
|---|---|---|
| `.ln-aparece` + `.ln-visible` | Entra subiendo diez píxeles, 520 ms. | El componente añade `ln-visible` al entrar en pantalla. |
| `.ln-carril` | Traza una línea de progreso con `scaleX`. | Hereda de `.ln-visible` del contenedor. |
| `.ln-avion` | Llega a su parada con retardo, después del carril. | Igual. |
| `.ln-resaltador` | Banda de rotulador que recorre y se va. | Retardo escalonado por línea, inline. |

El disparador es `useInView` de `src/hooks/useInView.ts`, con `triggerOnce`.
Devuelve `inView` de inmediato cuando el usuario tiene el movimiento reducido
activado, y el bloque `@media (prefers-reduced-motion: reduce)` deja todo ya
puesto, sin recorrido.

### 3.2 · Dónde ponerlo aquí

1. **Carril de familias en la portada.** El mismo patrón que el carril de etapas
   del vuelo de NOTAM: Abstracto, Espacial y Numérico sobre una línea, con la
   parada de la familia más atrasada marcada. Enseña dónde está flojo sin
   escribirlo.
2. **Entrada de la figura del ejercicio.** La aparición de `.ln-aparece`. Una
   figura que se planta de golpe en mitad de un cronómetro se lee como un salto de
   maquetación.
3. **El reloj como anillo, no como número.** Un aro de progreso alrededor del
   contador que se vacía. Es la única animación continua que admite esta pantalla y
   tiene función: se ve el tiempo sin leer una cifra. Que pase a ámbar en los
   últimos diez segundos, y que no parpadee.
4. **Acierto y fallo, solo en entrenamiento.** La opción elegida se tiñe y la
   correcta se marca, transición de 160 ms. En evaluación y simulación **no se
   anima nada**: no hay corrección al momento y cualquier movimiento ahí es una
   pista.
5. **Resultado del simulacro.** Las cifras de precisión y velocidad suben desde
   cero una vez, en 600 ms. Una sola vez, al llegar. No al volver a la pantalla.

### 3.3 · Interactividad, con el mismo filtro

Si ayuda a comprender o a decidir, entra. Si solo mueve la pantalla, no.

- **Revisión al final de la sesión.** Volver sobre los fallados, ver la figura otra
  vez y leer la explicación. Hoy la explicación pasa y no se recupera, que es donde
  se aprende.
- **Comparador en los espaciales.** Alternar entre el cubo y cada desarrollo sin
  perder de vista el cubo. Es lo que hace un candidato con el papel: tapar y
  comparar.
- **Marcar y volver.** Dentro de una sesión cronometrada, dejar uno para el final.
  Es la estrategia real de una prueba con reloj y ahora no se puede entrenar.

### 3.4 · Nada de esto

Ni confeti, ni rebotes, ni contadores en bucle, ni transición entre pregunta y
pregunta que se note. Esto es una prueba contra reloj: cada milisegundo de
animación entre ejercicios es tiempo que el alumno pierde y que en la prueba real
no va a perder.

### 3.5 · Criterio de aceptación

- Con el movimiento reducido activado, la pantalla es enteramente utilizable y no
  se mueve nada.
- Ninguna animación se dispara entre un ejercicio y el siguiente dentro de una
  sesión cronometrada.
- En evaluación y simulación no hay ninguna señal visual de acierto o error.
- Las clases nuevas viven en `src/index.css` con alcance, no en estilos en línea
  repartidos.

---

## 4 · Antes de abrir el PR

```bash
node scripts/psicotecnicas/verificar-banco.mjs
node scripts/psicotecnicas/verificar-numerico.mjs
node scripts/psicotecnicas/verificar-respuestas.mjs "C:/Datos/Downloads"
node scripts/psicotecnicas/verificar-figuras.mjs      # el nuevo
npx tsc -b
npm run build
```

### Dos cosas que ya nos mordieron

**El verificador de respuestas daba un aprobado sobre cero comprobaciones.**
Buscaba un texto acentuado en el PDF sin fijar la codificación, no encontraba la
sección y terminaba con «0 verificadas, 0 discrepancias», que en pantalla se lee
igual que todo bien. Ya lleva `-enc UTF-8` y sale con error si no encuentra el
corte. Cuando escribas el verificador nuevo aplica la misma regla: **cero
comprobaciones no es un aprobado.**

**Las figuras no estaban excluidas de la reescritura de Vercel.** Una ruta que
faltara devolvía HTML con código 200 en vez de un 404 y la imagen se rompía en
silencio. Ya está añadido `psicotecnicas/` a la exclusión de `vercel.json`. Si
creas una carpeta nueva bajo `public/`, añádela ahí también.

---

## 5 · Nota de producto

Los cuadernillos son de donde salieron los ejercicios, **no son parte del
producto**. No aparecen en la interfaz, ni citados, ni con su marca. La
trazabilidad vive en el campo `fuente` de cada ficha y en
`src/data/psicotecnicas/FUENTES.md`, que es documentación interna. Cuando las
figuras estén dibujadas, lo que ve el alumno es un ejercicio de Aviatory.

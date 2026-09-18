# Imágenes de las lecciones de módulo

Una carpeta por módulo:

```
public/modulos/mercancias/rombo-clase-3.webp
public/modulos/notam/linea-q.webp
```

Se referencian desde la lección con la ruta absoluta, sin `public`:

```tsx
<Figura src="/modulos/mercancias/rombo-clase-3.webp" alt="…" ancho={1200} alto={800} />
```

o, en la lección-documento:

```ts
{ kind: "figura", src: "/modulos/mercancias/rombo-clase-3.webp", alt: "…", ancho: 1200, alto: 800 }
```

`alt` es obligatorio y `ancho`/`alto` son los del archivo: sin ellos el texto
salta cuando la imagen carga.

## Qué tamaño se ve en pantalla

Dos medidas, y solo dos:

- **La foto se queda a la medida del texto: 720 px.** Vale para la figura, para
  la ficha de «reconoce» y para el hueco que espera a la foto. Una figura que
  ilustre un detalle puede pedir menos con `anchoMax`, nunca más.
- **La portada de la sección y las láminas de trazo se salen de la columna** y
  llegan a 1200 px en un monitor ancho. La portada es la de arriba del todo; en
  Aeropuertos, que no lleva portada automática, es el primer bloque de la
  lección.

Quien decide esto es `BLOQUES_ANCHOS`, en `components/lesson/LectorLeccion.tsx`.

## Antes de meterlas aquí, a WebP

```
node scripts/optimizar-imagenes.mjs <carpeta-de-origen> public/modulos/<modulo> 1600
```

1600 px de ancho es el estándar: cubre con holgura los 720 px de una figura en
pantalla de doble densidad, y es lo que ya traen Meteorología, Aeropuertos y
Aerodinámica. Los dos primeros módulos se optimizaron a 1400, que era el tope
por defecto del script y se queda justo; no hace falta rehacerlos, pero lo nuevo
va a 1600.

El script reporta el antes y el después. Las ilustraciones de mercancías
pasaron de 2,36 MB a 294 KB.

## No van en el precache

`vite.config.ts` las excluye con `globIgnores` y las sirve con `CacheFirst`:
son material de una sección concreta y precachearlas encarecería la instalación
de la PWA para todos, incluidos los que nunca abren ese módulo. La primera vez
que un piloto ve la sección quedan en caché.

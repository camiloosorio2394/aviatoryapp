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

## Antes de meterlas aquí, a WebP

```
node scripts/optimizar-imagenes.mjs <carpeta-de-origen> public/modulos/<modulo> 1400
```

El script reporta el antes y el después. Las ilustraciones de mercancías
pasaron de 2,36 MB a 294 KB.

## No van en el precache

`vite.config.ts` las excluye con `globIgnores` y las sirve con `CacheFirst`:
son material de una sección concreta y precachearlas encarecería la instalación
de la PWA para todos, incluidos los que nunca abren ese módulo. La primera vez
que un piloto ve la sección quedan en caché.

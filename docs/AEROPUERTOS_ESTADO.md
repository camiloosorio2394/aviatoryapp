# Módulo «Aeropuertos» · estado del trabajo

**Para quien retome esto** (incluida una sesión futura de Claude Code que
arranque sola): este archivo dice qué está hecho y qué sigue. Actualízalo al
terminar cada paso.

## Qué es

Módulo nuevo de «Ingreso a aerolínea»: 22 lecciones en 5 niveles, con el lector
compartido (`LectorLeccion`), entrevista de 15 preguntas al cierre de cada nivel
y un catálogo visual de 177 fichas. **Es un módulo visual**: texto corto y 231
huecos de imagen rotulados que Camilo va a ir llenando.

**La norma es solo OACI**: Anexo 14 Vol. I, 9.ª edición (2022) con la Enmienda
18, aplicable desde el 27-nov-2025. Nada de FAA, nada de RAC como base.

## El material ya está escrito y verificado

Todo está en el scratchpad de la sesión del 15-sep-2026:
`C:\Users\HP\AppData\Local\Temp\claude\C--Datos-Documents\44b2c2cc-163f-4c83-a128-00ce71cd78bb\scratchpad\aeropuertos\`

- `BRIEF-AEROPUERTOS.md`: el documento completo (7.900 líneas), que es la fuente
  para escribir el contenido.
- `brief-nivel1.md` … `brief-nivel5.md`: el texto de cada lección y la ficha de
  cada hueco, con sus ocho campos.
- `brief-catalogo.md`: las 177 fichas del catálogo.
- `inventario-*.md`: los siete inventarios verificados contra la norma.
- Copia de seguridad del brief dentro del repo: `docs/BRIEF_AEROPUERTOS.md`.

## Decisiones tomadas por Camilo

1. Solo OACI.
2. Los puntos de espera se dibujan con los patrones anchos **A2 y B2**.
3. Texto mínimo: 120 a 160 palabras por lección. Si algo necesita más texto, es
   que falta una imagen.
4. Ninguna pregunta dentro de una lección. Las quince van en la entrevista del
   nivel.
5. Empezar por el nivel 2, pero dejar los cinco niveles rotulados.

## Plan, en orden

- [x] **1. Infraestructura.** `src/lib/aeropuertos.ts` (rutas, niveles, totales),
      tema del módulo en `src/index.css`, página del lector
      `src/pages/AeropuertosLeccion.tsx`, hub `src/pages/Aeropuertos.tsx`, rutas
      en `src/App.tsx` y tarjeta en `src/pages/AirlinePrep.tsx`.
- [ ] **2. Progreso.** `src/lib/aeropuertosProgress.ts` con respaldo local, y el
      SQL para Camilo en `supabase/migrations/`. **La migración no se aplica: se
      le entrega para que la corra él.**
- [x] **3. Nivel 2** (lecciones 05 a 08, 31 huecos) desde `brief-nivel2.md`.
- [x] **4. Nivel 1** (01 a 04, 28 huecos).
- [x] **5. Nivel 3** (09 a 12, 31 huecos).
- [x] **6. Nivel 4** (13 a 17, 37 huecos).
- [x] **7. Nivel 5** (18 a 22, 35 huecos).
- [x] **8. Entrevistas** de los cinco niveles en `aeropuertosLeccion/entrevistas.ts`.
- [ ] **9. Catálogo visual**, con su componente.
- [ ] **10. Comprobar**: `npx tsc -b`, `npx eslint`, `npx vite build`, y ver el
      módulo en el navegador.
- [ ] **11. Commit y push**, con rutas explícitas (hay otras sesiones sobre la
      misma carpeta).

## Cómo se escribe cada lección

Como en Mercancías: un `DocScreen` por lección con sus bloques. El hueco va así,
y el rótulo lleva el código y la medida, que es lo que Camilo ve en pantalla:

```ts
{
  kind: "hueco",
  rotulo: "AP-07-03 · Fotografía · 3:2 · 1200×800",
  descripcion: "Lo que tiene que mostrar, tomado del brief.",
  alto: 280,
}
```

Las fichas con imagen usan `kind: "fichas"` con `hueco` en cada item, igual que
la sección 3 de Mercancías.

## Reglas que no se pueden saltar

- Nada de rayas largas en el contenido.
- Sin citas de artículos en el texto.
- Ninguna imagen con patrón A1 ni B1.
- Las líneas continuas del punto de espera van **del lado de espera**; las de
  trazos miran a la pista. Verificado en la Figura 5-6 del Anexo 14.
- No aplicar migraciones a la base: el SQL se le entrega a Camilo.
- `git add` con rutas explícitas, nunca `-A`.

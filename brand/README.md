# Brand assets — AviatorYapp

Carpeta para archivos de marca **fuente** (no se bundlean con la app).

## Estructura

```
brand/
├── logos/          # logos en SVG/PNG/AI/PDF (varias variantes)
├── README.md       # este archivo
```

## Convenciones

- **Logos**: dropear en `brand/logos/` con naming descriptivo (ej `aviatory-logo-light.svg`, `aviatory-icon-32.png`, `aviatory-wordmark-dark.svg`)
- **Cuando un asset esté listo para producción**, copiarlo a `public/` (para servir directo) o a `src/assets/` (para bundlear con import)
- **Esta carpeta NO se sirve al cliente** — es source de diseño, queda en el repo solo para versionado

## Flujo cuando agregamos un logo nuevo

1. Nico/diseñador dropea `aviatory-logo-light.svg` en `brand/logos/`
2. Claude Code lo copia a `public/brand/aviatory-logo-light.svg` o `src/assets/logos/aviatory-logo-light.svg` según uso
3. Componente lo referencia: `<img src="/brand/aviatory-logo-light.svg" />` (si está en public) o `import logoLight from "@/assets/logos/aviatory-logo-light.svg"` (si está en src/assets)

## Por qué separamos

- `brand/` versiona archivos pesados (PDFs, AI, PSD) sin meterlos al bundle de Vite
- Mantiene `public/` y `src/assets/` solo con lo que la app realmente usa
- Si mañana cambia diseño, los archivos viejos quedan en `brand/` como historial

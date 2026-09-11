import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

/**
 * Contenido pesado: cada módulo solo lo importan sus pantallas. Importado desde
 * otra, viaja entero con ella (así llegaba el contenido de NOTAM al Dashboard).
 * Los `import type` se permiten: no llegan al bundle.
 */
const CONTENIDO = [
  {
    name: '@/lib/notam',
    permitido: ['src/pages/Notam*.tsx'],
    message:
      'Trae el contenido completo de NOTAM. Nivel, progreso local, conteos y resumen están en @/lib/notamComun; los NOTAM nacionales de la lección, en @/lib/notamNacionales; accentText, en @/lib/tileColors.',
  },
  {
    name: '@/lib/notamLesson',
    permitido: ['src/pages/Notam*.tsx', 'src/lib/notam.ts'],
    message: 'Trae la lección NOTAM completa. Sus conteos (secciones, minutos) están en @/lib/notamComun.',
  },
  {
    name: '@/lib/metarLesson',
    permitido: ['src/pages/MetarLesson.tsx'],
    message: 'Trae la lección METAR completa. Sus conteos están en METAR_LECCION (@/lib/metar).',
  },
  {
    name: '@/lib/mercanciasLeccion',
    permitido: ['src/pages/MercanciasLeccion.tsx'],
    message: 'Trae las 18 lecciones de Mercancías. Niveles y conteos están en @/lib/mercancias.',
  },
  {
    name: '@/lib/mercanciasPractica',
    permitido: ['src/pages/MercanciasPractice.tsx'],
    message: 'Trae la práctica completa de Mercancías. Su total está en MP_PRACTICA_TOTAL (@/lib/mercancias).',
  },
]

const restringirContenido = (patron) => ({
  '@typescript-eslint/no-restricted-imports': [
    'error',
    {
      paths: CONTENIDO.filter((c) => !c.permitido.includes(patron)).map(({ name, message }) => ({
        name,
        message,
        allowTypeImports: true,
      })),
    },
  ],
})

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    // El banco de psicotécnicas (con sus respuestas) lo sirve el servidor. Si la
    // app lo importara, volvería entero al bundle.
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/data/psicotecnicas/**', 'src/**/*.test.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '^@/data/psicotecnicas(/(?!aprende$).*)?$',
              message:
                'Los ejercicios de psicotécnicas llegan del servidor (services/psicotecnicas.ts). Desde la app solo se importa @/data/psicotecnicas/aprende.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/**/*.test.{ts,tsx}'],
    rules: restringirContenido(null),
  },
  // Cada sección puede importar su propio contenido y nada más.
  ...[...new Set(CONTENIDO.flatMap((c) => c.permitido))].map((patron) => ({
    files: [patron],
    rules: restringirContenido(patron),
  })),
])
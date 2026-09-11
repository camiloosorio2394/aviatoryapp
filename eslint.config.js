import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

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
    // El contenido del tema NOTAM (sus JSON y la lección, unos 400 KB) solo lo
    // cargan sus pantallas. Importado desde otra, viaja entero con ella.
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/pages/Notam*.tsx', 'src/lib/notam.ts', 'src/**/*.test.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@/lib/notam',
              allowTypeImports: true,
              message:
                'Trae el contenido completo de NOTAM. Nivel, progreso local, conteos y resumen están en @/lib/notamComun; los NOTAM nacionales de la lección, en @/lib/notamNacionales; accentText, en @/lib/tileColors.',
            },
            {
              name: '@/lib/notamLesson',
              allowTypeImports: true,
              message: 'Trae la lección NOTAM completa. Sus conteos (secciones, minutos) están en @/lib/notamComun.',
            },
          ],
        },
      ],
    },
  },
])

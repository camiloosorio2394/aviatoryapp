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
])

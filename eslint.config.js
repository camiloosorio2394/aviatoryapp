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

/**
 * Pantallas y componentes que todavía consultan la base directo, con el cliente
 * de Supabase importado en el propio archivo. El acceso a datos va en
 * `src/services/*` (modelos: `services/bitacora.ts`, `services/panel.ts`,
 * `services/evaluaciones.ts`) o en los hooks y lib que ya existen.
 *
 * **Esta lista solo se achica.** Cada pantalla que pasa a un servicio sale de
 * aquí y no vuelve; una pantalla nueva no se agrega. La lista se generó con
 * grep, no a mano:
 *
 *   grep -rln "@/integrations/supabase/client" src/pages src/components \
 *     --include="*.ts" --include="*.tsx" | grep -v "\.test\." | sort
 */
const ACCESO_DIRECTO_HEREDADO = [
  'src/components/layout/AppTopbar.tsx',
  'src/components/layout/NotificacionesProvider.tsx',
  'src/pages/AirlinePrep.tsx',
  'src/pages/Airlines.tsx',
  'src/pages/Community.tsx',
  'src/pages/CommunityChannel.tsx',
  'src/pages/ExamTracker.tsx',
  'src/pages/ExamTrackerSubject.tsx',
  'src/pages/Expiries.tsx',
  'src/pages/IcaoInterview.tsx',
  'src/pages/IcaoVocabulary.tsx',
  'src/pages/InterviewSpeakingIntro.tsx',
  'src/pages/Logbook.tsx',
  'src/pages/Login.tsx',
  'src/pages/MercanciasExam.tsx',
  'src/pages/Metar.tsx',
  'src/pages/Notam.tsx',
  'src/pages/NotamExam.tsx',
  'src/pages/NuevaClave.tsx',
  'src/pages/Onboarding.tsx',
  'src/pages/Profile.tsx',
  'src/pages/Recuperar.tsx',
  'src/pages/Referrals.tsx',
  'src/pages/Route.tsx',
  'src/pages/TestInicial.tsx',
]

const CLIENTE_SUPABASE = {
  name: '@/integrations/supabase/client',
  message:
    'El acceso a datos va en src/services/* (modelos: services/bitacora.ts, services/panel.ts, services/evaluaciones.ts) o en los hooks y lib que ya existen. La pantalla llama al servicio.',
}

/**
 * Los `paths` prohibidos de un archivo: el contenido que no le toca y, en
 * pantallas y componentes, el cliente de Supabase.
 *
 * Van en la misma regla a propósito. En flat config el último bloque que toca
 * una regla la reemplaza entera, así que dos bloques con
 * `@typescript-eslint/no-restricted-imports` sobre el mismo archivo se pisan:
 * el segundo borraría las restricciones del primero.
 */
const restringirImports = (patron, conCliente) => ({
  '@typescript-eslint/no-restricted-imports': [
    'error',
    {
      paths: [
        ...CONTENIDO.filter((c) => !c.permitido.includes(patron)).map(({ name, message }) => ({
          name,
          message,
          allowTypeImports: true,
        })),
        ...(conCliente ? [CLIENTE_SUPABASE] : []),
      ],
    },
  ],
})

const esPantalla = (patron) => patron.startsWith('src/pages/') || patron.startsWith('src/components/')

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
    rules: {
      // Con verbatimModuleSyntax, import { type X } deja un import con efecto al
      // ejecutar: el módulo entra al bundle aunque solo se usen sus tipos. Así
      // un tipo de un archivo de contenido arrastraría el contenido entero.
      '@typescript-eslint/no-import-type-side-effects': 'error',
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
    // console.error solo llega a la consola del navegador del piloto: lo que
    // alguien tiene que ver va por reportarError (src/lib/errores.ts), que
    // además lo guarda en la base. console.warn queda para lo degradado.
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/**/*.test.{ts,tsx}', 'src/lib/errores.ts'],
    rules: {
      'no-console': ['error', { allow: ['warn'] }],
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/**/*.test.{ts,tsx}'],
    rules: restringirImports(null, false),
  },
  {
    // Una pantalla no habla con la base: le pide los datos a un servicio, que es
    // donde vive la consulta, la forma validada y el reporte de error. Así la
    // pantalla se prueba sin red y la consulta se prueba sin pantalla.
    files: ['src/pages/**/*.{ts,tsx}', 'src/components/**/*.{ts,tsx}'],
    ignores: ['src/**/*.test.{ts,tsx}', ...ACCESO_DIRECTO_HEREDADO],
    rules: restringirImports(null, true),
  },
  // Cada sección puede importar su propio contenido y nada más. Va después de
  // los dos bloques de arriba, así que aquí se vuelve a decir si el archivo
  // lleva también la restricción del cliente.
  ...[...new Set(CONTENIDO.flatMap((c) => c.permitido))].flatMap((patron) => [
    { files: [patron], rules: restringirImports(patron, false) },
    ...(esPantalla(patron)
      ? [
          {
            files: [patron],
            ignores: ACCESO_DIRECTO_HEREDADO,
            rules: restringirImports(patron, true),
          },
        ]
      : []),
  ]),
])
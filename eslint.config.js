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
  {
    name: '@/lib/aeropuertosLeccion',
    // El mapa visual solo se importa desde la pantalla diferida del catálogo.
    permitido: ['src/pages/AeropuertosLeccion.tsx', 'src/lib/aeropuertosCatalogoImagenes.ts'],
    message: 'Trae las 22 lecciones de Aeropuertos. Niveles y conteos están en @/lib/aeropuertos.',
  },
  {
    name: '@/lib/aeropuertosCatalogo',
    permitido: ['src/pages/AeropuertosCatalogo.tsx', 'src/lib/aeropuertosCatalogoImagenes.ts'],
    message: 'Trae las 177 fichas del catálogo de Aeropuertos, que pesan como una lección entera.',
  },
  {
    name: '@/lib/aeropuertosPractica',
    permitido: ['src/pages/AeropuertosPractice.tsx'],
    message: 'Trae la práctica completa de Aeropuertos.',
  },
  {
    name: '@/lib/comunicacionesLeccion',
    permitido: ['src/pages/ComunicacionesLeccion.tsx'],
    message: 'Trae las 69 lecciones de Comunicaciones ATC. Niveles y conteos están en @/lib/comunicaciones.',
  },
  {
    // El guion de la práctica pasa por comunicacionesPracticaGrupos, que lo
    // ordena y deriva las claves; la página importa ese y no este.
    name: '@/lib/comunicacionesPracticaEjemplos',
    permitido: ['src/lib/comunicacionesPracticaGrupos.ts'],
    message:
      'Trae el guion completo de la práctica de Comunicaciones ATC. La página lo recibe de @/lib/comunicacionesPracticaGrupos; el total está en @/lib/comunicacionesConteo.',
  },
  {
    name: '@/lib/comunicacionesPracticaGrupos',
    permitido: ['src/pages/ComunicacionesPractice.tsx'],
    message: 'Trae la práctica completa de Comunicaciones ATC. Su total está en CM_PRACTICA_CONTEO (@/lib/comunicacionesConteo).',
  },
  {
    name: '@/lib/racLeccion',
    permitido: ['src/pages/RacLeccion.tsx'],
    message: 'Trae las 19 unidades del módulo RAC. Rutas, conteos y resumen están en @/lib/rac.',
  },
  {
    name: '@/lib/racPractica',
    permitido: ['src/pages/RacPractice.tsx'],
    message: 'Trae la práctica completa del módulo RAC. Su total está en RAC_PRACTICA_TOTAL (@/lib/rac).',
  },
  {
    name: '@/lib/combustibleLeccion',
    permitido: ['src/pages/CombustibleLeccion.tsx'],
    message: 'Trae los 23 capítulos de Gestión del combustible. Rutas, conteos y resumen están en @/lib/combustible.',
  },
  {
    name: '@/lib/combustiblePractica',
    permitido: ['src/pages/CombustiblePractice.tsx'],
    message: 'Trae la práctica completa de Gestión del combustible. Su total está en CB_PRACTICA_TOTAL (@/lib/combustible).',
  },
  {
    name: '@/lib/melLeccion',
    permitido: ['src/pages/MelLeccion.tsx'],
    message: 'Trae las 40 lecciones de MEL. Niveles y conteos están en @/lib/mel.',
  },
  {
    // Los ejercicios pasan por melPracticaGrupos, que los ordena y deriva las
    // claves; la página importa ese y no este.
    name: '@/lib/melPracticaDatos',
    permitido: ['src/lib/melPracticaGrupos.ts'],
    message:
      'Trae los 68 ejercicios de la práctica de MEL. La página los recibe de @/lib/melPracticaGrupos; el total está en @/lib/melConteo.',
  },
  {
    name: '@/lib/melPracticaGrupos',
    permitido: ['src/pages/MelPractice.tsx'],
    message: 'Trae la práctica completa de MEL. Su total está en MEL_PRACTICA_CONTEO (@/lib/melConteo).',
  },
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
    //
    // Ya no hay excepciones: la lista de las veinticinco pantallas que todavía
    // consultaban directo quedó vacía y se borró. Una pantalla nueva no puede
    // volver a abrirla, que era justo el riesgo de dejarla puesta.
    files: ['src/pages/**/*.{ts,tsx}', 'src/components/**/*.{ts,tsx}'],
    ignores: ['src/**/*.test.{ts,tsx}'],
    rules: restringirImports(null, true),
  },
  // Cada sección puede importar su propio contenido y nada más. Va después de
  // los dos bloques de arriba, así que aquí se vuelve a decir si el archivo
  // lleva también la restricción del cliente.
  ...[...new Set(CONTENIDO.flatMap((c) => c.permitido))].flatMap((patron) => [
    { files: [patron], rules: restringirImports(patron, false) },
    ...(esPantalla(patron) ? [{ files: [patron], rules: restringirImports(patron, true) }] : []),
  ]),
])

import { lazy, Suspense, useEffect } from "react"
import type { ComponentType } from "react"
import { Navigate, Outlet, Route, Routes, useParams } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import { ReloadPrompt } from "@/components/ReloadPrompt"
import { AvisoAnalitica } from "@/components/AvisoAnalitica"
import { RequireAuth } from "@/components/auth/RequireAuth"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { useSession } from "@/hooks/useSession"
import { usePageViewTracking } from "@/hooks/usePageViewTracking"
import { identifyUser, resetIdentity } from "@/lib/analytics"

/**
 * Las páginas van con `lazy`, todas.
 *
 * Importadas de golpe, las cuarenta caben en un solo `index.js` que ya iba por
 * 2.028 KB contra los 2.048 que Workbox precachea. Pasarse de ahí no avisa: el
 * build falla. Un módulo nuevo entero lo reventaba, y quedaban 20 KB.
 *
 * Es la misma razón por la que las infografías de la lección ya se cargaban
 * aparte (el registro INFOGRAFIAS de components/DocLessonBlocks.tsx), pero
 * resuelta donde de verdad pesa: el piloto descarga la pantalla que abre, no
 * las cuarenta.
 *
 * El `.then` es porque las páginas son exportaciones con nombre, no por defecto.
 *
 * El layout de la app va igual: quien entra a la landing no descarga la barra,
 * los avisos ni Wingman.
 */
function page<T, K extends keyof T>(cargar: () => Promise<T>, nombre: K) {
  return lazy(() => cargar().then((m) => ({ default: m[nombre] as ComponentType })))
}

const AppLayout = page(() => import("@/components/layout/AppLayout"), "AppLayout")
const Landing = page(() => import("@/pages/Landing"), "Landing")
const Pricing = page(() => import("@/pages/Pricing"), "Pricing")
const Contact = page(() => import("@/pages/Contact"), "Contact")
const Login = page(() => import("@/pages/Login"), "Login")
const Recuperar = page(() => import("@/pages/Recuperar"), "Recuperar")
const NuevaClave = page(() => import("@/pages/NuevaClave"), "NuevaClave")
const Onboarding = page(() => import("@/pages/Onboarding"), "Onboarding")
const Dashboard = page(() => import("@/pages/Dashboard"), "Dashboard")
const TestInicial = page(() => import("@/pages/TestInicial"), "TestInicial")
const GeneralSubjects = page(() => import("@/pages/GeneralSubjects"), "GeneralSubjects")
const RoutePage = page(() => import("@/pages/Route"), "Route")
const Airlines = page(() => import("@/pages/Airlines"), "Airlines")
const Profile = page(() => import("@/pages/Profile"), "Profile")
const Community = page(() => import("@/pages/Community"), "Community")
const Foro = page(() => import("@/pages/foro/Foro"), "Foro")
const PublicacionForo = page(() => import("@/pages/foro/PublicacionForoPagina"), "PublicacionForoPagina")
const PublicarForo = page(() => import("@/pages/foro/PublicarForo"), "PublicarForo")
const CommunityChannel = page(() => import("@/pages/CommunityChannel"), "CommunityChannel")
const Logbook = page(() => import("@/pages/Logbook"), "Logbook")
const Expiries = page(() => import("@/pages/Expiries"), "Expiries")
const Referrals = page(() => import("@/pages/Referrals"), "Referrals")
const Logros = page(() => import("@/pages/Logros"), "Logros")
const ExamTracker = page(() => import("@/pages/ExamTracker"), "ExamTracker")
const ExamTrackerSubject = page(() => import("@/pages/ExamTrackerSubject"), "ExamTrackerSubject")
const Icao = page(() => import("@/pages/Icao"), "Icao")
const IcaoVocabulary = page(() => import("@/pages/IcaoVocabulary"), "IcaoVocabulary")
const IcaoQuiz = page(() => import("@/pages/IcaoQuiz"), "IcaoQuiz")
const IcaoInterview = page(() => import("@/pages/IcaoInterview"), "IcaoInterview")
const IcaoComprehension = page(() => import("@/pages/IcaoComprehension"), "IcaoComprehension")
const IcaoPictureDescription = page(
  () => import("@/pages/IcaoPictureDescription"),
  "IcaoPictureDescription"
)
const IcaoMockExam = page(() => import("@/pages/IcaoMockExam"), "IcaoMockExam")
const Pca = page(() => import("@/pages/Pca"), "Pca")
const AirlinePrep = page(() => import("@/pages/AirlinePrep"), "AirlinePrep")
const AirlineMockExam = page(() => import("@/pages/AirlineMockExam"), "AirlineMockExam")
const Notam = page(() => import("@/pages/Notam"), "Notam")
const Metar = page(() => import("@/pages/Metar"), "Metar")
const MetarLesson = page(() => import("@/pages/MetarLesson"), "MetarLesson")
const MetarDecoder = page(() => import("@/pages/MetarDecoder"), "MetarDecoder")
const MetarPractice = page(() => import("@/pages/MetarPractice"), "MetarPractice")
const MetarExam = page(() => import("@/pages/MetarExam"), "MetarExam")
const NotamLesson = page(() => import("@/pages/NotamLesson"), "NotamLesson")
const NotamPractice = page(() => import("@/pages/NotamPractice"), "NotamPractice")
const NotamExam = page(() => import("@/pages/NotamExam"), "NotamExam")
const Mercancias = page(() => import("@/pages/Mercancias"), "Mercancias")
const MercanciasLeccion = page(() => import("@/pages/MercanciasLeccion"), "MercanciasLeccion")
const Aeropuertos = page(() => import("@/pages/Aeropuertos"), "Aeropuertos")
const AeropuertosLeccion = page(() => import("@/pages/AeropuertosLeccion"), "AeropuertosLeccion")
const AeropuertosExam = page(() => import("@/pages/AeropuertosExam"), "AeropuertosExam")
const AeropuertosPractice = page(() => import("@/pages/AeropuertosPractice"), "AeropuertosPractice")
const AeropuertosMisiones = page(() => import("@/pages/AeropuertosMisiones"), "AeropuertosMisiones")
const AeropuertosCatalogo = page(() => import("@/pages/AeropuertosCatalogo"), "AeropuertosCatalogo")
const Comunicaciones = page(() => import("@/pages/Comunicaciones"), "Comunicaciones")
const ComunicacionesLeccion = page(() => import("@/pages/ComunicacionesLeccion"), "ComunicacionesLeccion")
const ComunicacionesPractice = page(() => import("@/pages/ComunicacionesPractice"), "ComunicacionesPractice")
const ComunicacionesExam = page(() => import("@/pages/ComunicacionesExam"), "ComunicacionesExam")
const Rac = page(() => import("@/pages/Rac"), "Rac")
const RacLeccion = page(() => import("@/pages/RacLeccion"), "RacLeccion")
const RacPractice = page(() => import("@/pages/RacPractice"), "RacPractice")
const RacExam = page(() => import("@/pages/RacExam"), "RacExam")
const Combustible = page(() => import("@/pages/Combustible"), "Combustible")
const CombustibleLeccion = page(() => import("@/pages/CombustibleLeccion"), "CombustibleLeccion")
const CombustiblePractice = page(() => import("@/pages/CombustiblePractice"), "CombustiblePractice")
const CombustibleExam = page(() => import("@/pages/CombustibleExam"), "CombustibleExam")
const Rvsm = page(() => import("@/pages/Rvsm"), "Rvsm")
const RvsmLeccion = page(() => import("@/pages/RvsmLeccion"), "RvsmLeccion")
const RvsmPractice = page(() => import("@/pages/RvsmPractice"), "RvsmPractice")
const RvsmExam = page(() => import("@/pages/RvsmExam"), "RvsmExam")
const Pbn = page(() => import("@/pages/Pbn"), "Pbn")
const PbnLeccion = page(() => import("@/pages/PbnLeccion"), "PbnLeccion")
const PbnPractice = page(() => import("@/pages/PbnPractice"), "PbnPractice")
const PbnExam = page(() => import("@/pages/PbnExam"), "PbnExam")
const Mel = page(() => import("@/pages/Mel"), "Mel")
const MelLeccion = page(() => import("@/pages/MelLeccion"), "MelLeccion")
const MelPractice = page(() => import("@/pages/MelPractice"), "MelPractice")
const MelExam = page(() => import("@/pages/MelExam"), "MelExam")
const MercanciasPractice = page(() => import("@/pages/MercanciasPractice"), "MercanciasPractice")
const MercanciasExam = page(() => import("@/pages/MercanciasExam"), "MercanciasExam")
const Aerodinamica = page(() => import("@/pages/Aerodinamica"), "Aerodinamica")
const AerodinamicaLeccion = page(() => import("@/pages/AerodinamicaLeccion"), "AerodinamicaLeccion")
const AerodinamicaPractice = page(() => import("@/pages/AerodinamicaPractice"), "AerodinamicaPractice")
const AerodinamicaExam = page(() => import("@/pages/AerodinamicaExam"), "AerodinamicaExam")
const Performance = page(() => import("@/pages/Performance"), "Performance")
const PerformanceLeccion = page(() => import("@/pages/PerformanceLeccion"), "PerformanceLeccion")
const PerformanceExam = page(() => import("@/pages/PerformanceExam"), "PerformanceExam")
const PsychTests = page(() => import("@/pages/PsychTests"), "PsychTests")
const PsicoHub = page(() => import("@/pages/PsicoHub"), "PsicoHub")
const PsicoPractica = page(() => import("@/pages/PsicoSesion"), "PsicoPractica")
const PsicoEvaluacion = page(() => import("@/pages/PsicoSesion"), "PsicoEvaluacion")
const PsicoSimulacro = page(() => import("@/pages/PsicoSimulacro"), "PsicoSimulacro")
const PsicoAprende = page(() => import("@/pages/PsicoAprende"), "PsicoAprende")
const Library = page(() => import("@/pages/Library"), "Library")
const BibliotecaDocumento = page(
  () => import("@/pages/BibliotecaDocumento"),
  "BibliotecaDocumento"
)
const VaultQuizPlayer = page(() => import("@/pages/VaultQuizPlayer"), "VaultQuizPlayer")
const InterviewSim = page(() => import("@/pages/InterviewSim"), "InterviewSim")
const InterviewSpeakingIntro = page(
  () => import("@/pages/InterviewSpeakingIntro"),
  "InterviewSpeakingIntro"
)
const Terms = page(() => import("@/pages/Terms"), "Terms")
const Privacy = page(() => import("@/pages/Privacy"), "Privacy")
const NotFound = page(() => import("@/pages/NotFound"), "NotFound")

/**
 * Lo que se ve mientras llega el trozo de la página.
 *
 * Sin texto y con el fondo del tema: en una red normal el trozo llega en menos
 * de lo que dura un parpadeo, y un cartel que aparece y desaparece se nota más
 * que el propio salto.
 */
function PaginaCargando() {
  return <div className="min-h-screen bg-background" aria-busy="true" />
}

/**
 * Redireccion legacy con parametro. Exam Tracker paso a vivir dentro del
 * modulo del examen PCA, pero los enlaces a una materia concreta ya estaban
 * compartidos: se conserva el slug al redirigir.
 */
function LegacyExamTracker() {
  const { slug } = useParams()
  return <Navigate to={`/app/examenes/${slug}`} replace />
}

function App() {
  // Analytics: page views + user identification
  usePageViewTracking()
  const { user } = useSession()
  useEffect(() => {
    if (user) {
      // Solo el id: el correo no tiene por qué salir a un tercero.
      identifyUser(user.id)
    } else {
      resetIdentity()
    }
  }, [user])

  return (
    <>
      {/* El boundary va por dentro del router y no en `main.tsx`, para que su
          pantalla de fallo herede el tema y los tokens, y para que el enlace de
          volver funcione. Envuelve al `Suspense`: así también atrapa el error
          de una página que no llega a cargar. */}
      <ErrorBoundary>
        <Suspense fallback={<PaginaCargando />}>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Landing />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terminos" element={<Terms />} />
            <Route path="/privacidad" element={<Privacy />} />
            <Route path="/login" element={<Login />} />
            {/* Recuperar la contraseña va por fuera de RequireAuth a propósito:
                Supabase entrega el enlace del correo como una sesión ya iniciada, y
                atar la pantalla a esa carrera no aporta nada. */}
            <Route path="/recuperar" element={<Recuperar />} />
            <Route path="/nueva-clave" element={<NuevaClave />} />

            {/* Con sesión y a pantalla completa: sin barra lateral ni Wingman. */}
            <Route
              element={
                <RequireAuth>
                  <Outlet />
                </RequireAuth>
              }
            >
              <Route path="/onboarding" element={<Onboarding />} />
              {/* Las lecciones de Ingreso a aerolínea usan el lector genérico de
                  NOTAM, a pantalla completa. */}
              <Route path="/app/aerolinea/notam/aprende" element={<NotamLesson />} />
              <Route path="/app/aerolinea/meteorologia/aprende" element={<MetarLesson />} />
              <Route path="/app/aerolinea/mercancias/aprende" element={<MercanciasLeccion />} />
              <Route path="/app/aerolinea/aerodinamica/aprende" element={<AerodinamicaLeccion />} />
              <Route path="/app/aerolinea/performance/aprende" element={<PerformanceLeccion />} />
              <Route path="/app/aerolinea/aeropuertos/aprende" element={<AeropuertosLeccion />} />
              <Route path="/app/aerolinea/comunicaciones/aprende" element={<ComunicacionesLeccion />} />
              <Route path="/app/aerolinea/rac/aprende" element={<RacLeccion />} />
              <Route path="/app/aerolinea/combustible/aprende" element={<CombustibleLeccion />} />
              <Route path="/app/aerolinea/rvsm/aprende" element={<RvsmLeccion />} />
              <Route path="/app/aerolinea/pbn/aprende" element={<PbnLeccion />} />
              <Route path="/app/aerolinea/mel/aprende" element={<MelLeccion />} />
            </Route>

            {/* Con sesión, dentro de la app. AppLayout es la ruta de layout: se monta
                una vez para todas estas pantallas, así que cambiar de pantalla no
                vuelve a montar la barra, Wingman, los avisos ni sus suscripciones.
                Una pantalla nueva con barra va aquí y no envuelve nada. */}
            <Route
              element={
                <RequireAuth>
                  <AppLayout />
                </RequireAuth>
              }
            >
              <Route path="/app" element={<Dashboard />} />
              <Route path="/app/test-inicial" element={<TestInicial />} />
              <Route path="/app/materias" element={<GeneralSubjects />} />

              <Route path="/app/icao" element={<Icao />} />
              <Route path="/app/icao/vocabulario" element={<IcaoVocabulary />} />
              <Route path="/app/icao/quiz" element={<IcaoQuiz />} />
              <Route path="/app/icao/interview" element={<IcaoInterview />} />
              <Route path="/app/icao/comprension" element={<IcaoComprehension />} />
              <Route path="/app/icao/picture-description" element={<IcaoPictureDescription />} />
              <Route path="/app/icao/simulacro" element={<IcaoMockExam />} />
              <Route path="/app/pca" element={<Pca />} />
              <Route path="/app/pca/quiz/:subject" element={<VaultQuizPlayer />} />
              <Route path="/app/aerolinea" element={<AirlinePrep />} />
              {/* Sección NOTAM del módulo Ingreso a Aerolínea */}
              <Route path="/app/aerolinea/notam" element={<Notam />} />
              <Route path="/app/aerolinea/notam/practica" element={<NotamPractice />} />
              <Route path="/app/aerolinea/notam/evaluacion" element={<NotamExam />} />
              {/* Tema Meteorología operacional (METAR) del módulo Ingreso a Aerolínea */}
              <Route path="/app/aerolinea/meteorologia" element={<Metar />} />
              <Route path="/app/aerolinea/meteorologia/decodificador" element={<MetarDecoder />} />
              <Route path="/app/aerolinea/meteorologia/practica" element={<MetarPractice />} />
              <Route path="/app/aerolinea/meteorologia/evaluacion" element={<MetarExam />} />
              {/* Tema Mercancías peligrosas. El hub vive dentro de la app; la lección
                  va arriba, a pantalla completa. */}
              <Route path="/app/aerolinea/mercancias" element={<Mercancias />} />
              <Route path="/app/aerolinea/mercancias/practica" element={<MercanciasPractice />} />
              <Route path="/app/aerolinea/mercancias/evaluacion" element={<MercanciasExam />} />
              {/* Tema Aerodinámica. Mismo reparto: el hub, la práctica y el quiz
                  final dentro de la app; la lección va arriba, a pantalla completa. */}
              <Route path="/app/aerolinea/aerodinamica" element={<Aerodinamica />} />
              <Route path="/app/aerolinea/aeropuertos" element={<Aeropuertos />} />
              <Route path="/app/aerolinea/aeropuertos/practica" element={<AeropuertosPractice />} />
              <Route path="/app/aerolinea/aeropuertos/practica/misiones" element={<AeropuertosMisiones />} />
              <Route path="/app/aerolinea/aeropuertos/catalogo" element={<AeropuertosCatalogo />} />
              <Route path="/app/aerolinea/aeropuertos/evaluacion" element={<AeropuertosExam />} />
              {/* Tema Comunicaciones ATC. El hub, la práctica con audio y la
                  evaluación; la lección va arriba, a pantalla completa. */}
              <Route path="/app/aerolinea/comunicaciones" element={<Comunicaciones />} />
              <Route path="/app/aerolinea/comunicaciones/practica" element={<ComunicacionesPractice />} />
              <Route path="/app/aerolinea/comunicaciones/evaluacion" element={<ComunicacionesExam />} />
              {/* Tema RAC: una unidad por reglamento, la práctica con el quiz de
                  cada unidad y la evaluación. */}
              <Route path="/app/aerolinea/rac" element={<Rac />} />
              <Route path="/app/aerolinea/rac/practica" element={<RacPractice />} />
              <Route path="/app/aerolinea/rac/evaluacion" element={<RacExam />} />
              {/* Tema Gestión del combustible: veintitrés capítulos, la práctica
                  con el quiz de cada capítulo (los escenarios viven en el 23) y
                  la evaluación. */}
              <Route path="/app/aerolinea/combustible" element={<Combustible />} />
              <Route path="/app/aerolinea/combustible/practica" element={<CombustiblePractice />} />
              <Route path="/app/aerolinea/combustible/evaluacion" element={<CombustibleExam />} />
              {/* Tema RVSM: treinta y dos capítulos, la práctica con el quiz de
                  cada capítulo (los diez escenarios viven en el 32) y la
                  evaluación. */}
              <Route path="/app/aerolinea/rvsm" element={<Rvsm />} />
              <Route path="/app/aerolinea/rvsm/practica" element={<RvsmPractice />} />
              <Route path="/app/aerolinea/rvsm/evaluacion" element={<RvsmExam />} />

              {/* Tema PBN: cuarenta y ocho capítulos, la práctica con el quiz de
                  cada uno y la evaluación de sesenta y seis preguntas del servidor. */}
              <Route path="/app/aerolinea/pbn" element={<Pbn />} />
              <Route path="/app/aerolinea/pbn/practica" element={<PbnPractice />} />
              <Route path="/app/aerolinea/pbn/evaluacion" element={<PbnExam />} />

              {/* Tema MEL. El hub, la práctica y la evaluación; la lección va
                  arriba, a pantalla completa. */}
              <Route path="/app/aerolinea/mel" element={<Mel />} />
              <Route path="/app/aerolinea/mel/practica" element={<MelPractice />} />
              <Route path="/app/aerolinea/mel/evaluacion" element={<MelExam />} />
              <Route path="/app/aerolinea/aerodinamica/practica" element={<AerodinamicaPractice />} />
              <Route path="/app/aerolinea/aerodinamica/evaluacion" element={<AerodinamicaExam />} />
              {/* Tema Performance. No lleva práctica aparte: los ejercicios y los
                  escenarios viven dentro de los temas 38 y 40 de la lección. */}
              <Route path="/app/aerolinea/performance" element={<Performance />} />
              <Route path="/app/aerolinea/performance/evaluacion" element={<PerformanceExam />} />
              <Route path="/app/aerolinea/simulacro" element={<AirlineMockExam />} />
              {/* Tema Pruebas Psicotécnicas. El hub, los dos modos con filtro y el
                  simulacro; la lección va aparte porque no lleva reloj. */}
              <Route path="/app/aerolinea/psicotecnicas" element={<PsicoHub />} />
              <Route path="/app/aerolinea/psicotecnicas/aprende" element={<PsicoAprende />} />
              <Route path="/app/aerolinea/psicotecnicas/practica" element={<PsicoPractica />} />
              <Route path="/app/aerolinea/psicotecnicas/evaluacion" element={<PsicoEvaluacion />} />
              <Route path="/app/aerolinea/psicotecnicas/simulacro" element={<PsicoSimulacro />} />
              {/* El panorama amplio de assessment (9 categorías, COMPASS/CUT-E/
                  PILAPT) sigue donde estaba: es otra cosa que el tema de razonamiento
                  que acaba de abrirse, y ahora enlaza a él. */}
              <Route path="/app/psicotecnicas" element={<PsychTests />} />
              <Route path="/app/biblioteca" element={<Library />} />
              <Route path="/app/biblioteca/:slug" element={<BibliotecaDocumento />} />
              <Route path="/app/entrevistas" element={<InterviewSim />} />
              <Route path="/app/entrevistas/speaking" element={<InterviewSpeakingIntro />} />
              <Route path="/app/ruta" element={<RoutePage />} />
              <Route path="/app/match" element={<Airlines />} />
              <Route path="/app/logbook" element={<Logbook />} />
              <Route path="/app/vencimientos" element={<Expiries />} />
              <Route path="/app/referidos" element={<Referrals />} />
              <Route path="/app/examenes" element={<ExamTracker />} />
              <Route path="/app/examenes/:slug" element={<ExamTrackerSubject />} />
              {/* El foro. Solo con sesión: todavía no se quiere aparecer en
                  Google (la lectura pública espera en pendiente/comunidad-publica-seo). */}
              <Route path="/app/comunidad" element={<Foro />} />
              <Route path="/app/comunidad/c/:categoria" element={<Foro />} />
              <Route path="/app/comunidad/p/:id" element={<PublicacionForo />} />
              <Route path="/app/comunidad/p/:id/:slug" element={<PublicacionForo />} />
              <Route path="/app/comunidad/publicar" element={<PublicarForo />} />
              {/* Las salas de chat de antes del foro siguen, un paso más adentro. */}
              <Route path="/app/comunidad/salas" element={<Community />} />
              <Route path="/app/comunidad/:slug" element={<CommunityChannel />} />
              <Route path="/app/perfil" element={<Profile />} />
              <Route path="/app/logros" element={<Logros />} />
            </Route>

            {/* Rutas viejas. Redirigen sin pedir sesión: la pantalla de destino la pide. */}
            {/* Materias y el viejo banco de preguntas se consolidaron en el módulo
                Examen PCA (vault-backed). Estas rutas legacy redirigen ahí para que
                cualquier link viejo (Dashboard, deep links) siga funcionando. */}
            <Route path="/app/materias/:slug" element={<Navigate to="/app/pca" replace />} />
            <Route path="/app/quiz" element={<Navigate to="/app/pca" replace />} />
            <Route path="/app/quiz/:slug" element={<Navigate to="/app/pca" replace />} />
            {/* Exam Tracker y Match pasaron a vivir dentro de su modulo. Las rutas
                viejas siguen funcionando para no romper enlaces ya compartidos. */}
            <Route path="/app/exam-tracker" element={<Navigate to="/app/examenes" replace />} />
            <Route path="/app/exam-tracker/:slug" element={<LegacyExamTracker />} />
            <Route path="/app/aerolineas" element={<Navigate to="/app/match" replace />} />
            {/* El banco oficial se mudo a la Biblioteca: es un documento de
                referencia, no una herramienta del modulo. */}
            <Route
              path="/app/banco-oficial"
              element={<Navigate to="/app/biblioteca/banco-preguntas-pca" replace />}
            />
            {/* Picture Description y Discussion se unificaron en un solo módulo
                (TEA Part 3). La ruta vieja /discussion redirige para no romper links. */}
            <Route path="/app/icao/discussion" element={<Navigate to="/app/icao/picture-description" replace />} />

            {/* Ruta del lector anterior: los enlaces guardados siguen llegando a la lección. */}
            <Route
              path="/app/aerolinea/mercancias/leccion"
              element={<Navigate to="/app/aerolinea/mercancias/aprende" replace />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <Toaster />
      <ReloadPrompt />
      <AvisoAnalitica />
    </>
  )
}

export default App

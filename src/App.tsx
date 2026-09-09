import { lazy, Suspense, useEffect } from "react"
import type { ComponentType } from "react"
import { Navigate, Route, Routes, useParams } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import { ReloadPrompt } from "@/components/ReloadPrompt"
import { RequireAuth } from "@/components/auth/RequireAuth"
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
 */
function page<T, K extends keyof T>(cargar: () => Promise<T>, nombre: K) {
  return lazy(() => cargar().then((m) => ({ default: m[nombre] as ComponentType })))
}

const Landing = page(() => import("@/pages/Landing"), "Landing")
const Pricing = page(() => import("@/pages/Pricing"), "Pricing")
const Contact = page(() => import("@/pages/Contact"), "Contact")
const Login = page(() => import("@/pages/Login"), "Login")
const Onboarding = page(() => import("@/pages/Onboarding"), "Onboarding")
const Dashboard = page(() => import("@/pages/Dashboard"), "Dashboard")
const TestInicial = page(() => import("@/pages/TestInicial"), "TestInicial")
const GeneralSubjects = page(() => import("@/pages/GeneralSubjects"), "GeneralSubjects")
const RoutePage = page(() => import("@/pages/Route"), "Route")
const Airlines = page(() => import("@/pages/Airlines"), "Airlines")
const Profile = page(() => import("@/pages/Profile"), "Profile")
const Community = page(() => import("@/pages/Community"), "Community")
const CommunityChannel = page(() => import("@/pages/CommunityChannel"), "CommunityChannel")
const Logbook = page(() => import("@/pages/Logbook"), "Logbook")
const Expiries = page(() => import("@/pages/Expiries"), "Expiries")
const Referrals = page(() => import("@/pages/Referrals"), "Referrals")
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
const MercanciasPractice = page(() => import("@/pages/MercanciasPractice"), "MercanciasPractice")
const MercanciasExam = page(() => import("@/pages/MercanciasExam"), "MercanciasExam")
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
      identifyUser(user.id, { email: user.email ?? undefined })
    } else {
      resetIdentity()
    }
  }, [user])

  return (
    <>
      <Suspense fallback={<PaginaCargando />}>
        <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terminos" element={<Terms />} />
        <Route path="/privacidad" element={<Privacy />} />
        <Route path="/login" element={<Login />} />

        {/* Auth-required onboarding */}
        <Route
          path="/onboarding"
          element={
            <RequireAuth>
              <Onboarding />
            </RequireAuth>
          }
        />

        {/* App (auth required) */}
        <Route
          path="/app"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        {/* Materias y el viejo banco de preguntas se consolidaron en el módulo
            Examen PCA (vault-backed). Estas rutas legacy redirigen ahí para que
            cualquier link viejo (Dashboard, deep links) siga funcionando. */}
        <Route
          path="/app/test-inicial"
          element={
            <RequireAuth>
              <TestInicial />
            </RequireAuth>
          }
        />
        <Route
          path="/app/materias"
          element={
            <RequireAuth>
              <GeneralSubjects />
            </RequireAuth>
          }
        />
        {/* Exam Tracker y Match pasaron a vivir dentro de su modulo. Las rutas
            viejas siguen funcionando para no romper enlaces ya compartidos. */}
        {/* El banco oficial se mudo a la Biblioteca: es un documento de
            referencia, no una herramienta del modulo. */}
        <Route
          path="/app/banco-oficial"
          element={<Navigate to="/app/biblioteca/banco-preguntas-pca" replace />}
        />
        <Route path="/app/exam-tracker" element={<Navigate to="/app/examenes" replace />} />
        <Route path="/app/exam-tracker/:slug" element={<LegacyExamTracker />} />
        <Route path="/app/aerolineas" element={<Navigate to="/app/match" replace />} />
        <Route path="/app/materias/:slug" element={<Navigate to="/app/pca" replace />} />
        <Route path="/app/quiz" element={<Navigate to="/app/pca" replace />} />
        <Route path="/app/quiz/:slug" element={<Navigate to="/app/pca" replace />} />

        {/* New career modules */}
        <Route
          path="/app/icao"
          element={
            <RequireAuth>
              <Icao />
            </RequireAuth>
          }
        />
        <Route
          path="/app/icao/vocabulario"
          element={
            <RequireAuth>
              <IcaoVocabulary />
            </RequireAuth>
          }
        />
        <Route
          path="/app/icao/quiz"
          element={
            <RequireAuth>
              <IcaoQuiz />
            </RequireAuth>
          }
        />
        <Route
          path="/app/icao/interview"
          element={
            <RequireAuth>
              <IcaoInterview />
            </RequireAuth>
          }
        />
        <Route
          path="/app/icao/comprension"
          element={
            <RequireAuth>
              <IcaoComprehension />
            </RequireAuth>
          }
        />
        <Route
          path="/app/icao/picture-description"
          element={
            <RequireAuth>
              <IcaoPictureDescription />
            </RequireAuth>
          }
        />
        {/* Picture Description y Discussion se unificaron en un solo módulo
            (TEA Part 3). La ruta vieja /discussion redirige para no romper links. */}
        <Route path="/app/icao/discussion" element={<Navigate to="/app/icao/picture-description" replace />} />
        <Route
          path="/app/icao/simulacro"
          element={
            <RequireAuth>
              <IcaoMockExam />
            </RequireAuth>
          }
        />
        <Route
          path="/app/pca"
          element={
            <RequireAuth>
              <Pca />
            </RequireAuth>
          }
        />
        <Route
          path="/app/pca/quiz/:subject"
          element={
            <RequireAuth>
              <VaultQuizPlayer />
            </RequireAuth>
          }
        />
        <Route
          path="/app/aerolinea"
          element={
            <RequireAuth>
              <AirlinePrep />
            </RequireAuth>
          }
        />
        {/* Sección NOTAM del módulo Ingreso a Aerolínea */}
        <Route
          path="/app/aerolinea/notam"
          element={
            <RequireAuth>
              <Notam />
            </RequireAuth>
          }
        />
        <Route
          path="/app/aerolinea/notam/aprende"
          element={
            <RequireAuth>
              <NotamLesson />
            </RequireAuth>
          }
        />
        
        <Route
          path="/app/aerolinea/notam/practica"
          element={
            <RequireAuth>
              <NotamPractice />
            </RequireAuth>
          }
        />
        <Route
          path="/app/aerolinea/notam/evaluacion"
          element={
            <RequireAuth>
              <NotamExam />
            </RequireAuth>
          }
        />
        {/* Tema Meteorología operacional (METAR) del módulo Ingreso a Aerolínea */}
        <Route
          path="/app/aerolinea/meteorologia"
          element={
            <RequireAuth>
              <Metar />
            </RequireAuth>
          }
        />
        <Route
          path="/app/aerolinea/meteorologia/aprende"
          element={
            <RequireAuth>
              <MetarLesson />
            </RequireAuth>
          }
        />
        <Route
          path="/app/aerolinea/meteorologia/decodificador"
          element={
            <RequireAuth>
              <MetarDecoder />
            </RequireAuth>
          }
        />
        <Route
          path="/app/aerolinea/meteorologia/practica"
          element={
            <RequireAuth>
              <MetarPractice />
            </RequireAuth>
          }
        />
        <Route
          path="/app/aerolinea/meteorologia/evaluacion"
          element={
            <RequireAuth>
              <MetarExam />
            </RequireAuth>
          }
        />
        {/* Tema Mercancías peligrosas. El hub vive dentro de la app; la lección
            usa el lector genérico de NOTAM, a pantalla completa. */}
        <Route
          path="/app/aerolinea/mercancias"
          element={
            <RequireAuth>
              <Mercancias />
            </RequireAuth>
          }
        />
        <Route
          path="/app/aerolinea/mercancias/aprende"
          element={
            <RequireAuth>
              <MercanciasLeccion />
            </RequireAuth>
          }
        />
        <Route
          path="/app/aerolinea/mercancias/practica"
          element={
            <RequireAuth>
              <MercanciasPractice />
            </RequireAuth>
          }
        />
        <Route
          path="/app/aerolinea/mercancias/evaluacion"
          element={
            <RequireAuth>
              <MercanciasExam />
            </RequireAuth>
          }
        />
        {/* Ruta del lector anterior: los enlaces guardados siguen llegando a la lección. */}
        <Route
          path="/app/aerolinea/mercancias/leccion"
          element={<Navigate to="/app/aerolinea/mercancias/aprende" replace />}
        />
        <Route
          path="/app/aerolinea/simulacro"
          element={
            <RequireAuth>
              <AirlineMockExam />
            </RequireAuth>
          }
        />
        {/* Tema Pruebas Psicotécnicas. El hub, los dos modos con filtro y el
            simulacro; la lección va aparte porque no lleva reloj. */}
        <Route
          path="/app/aerolinea/psicotecnicas"
          element={
            <RequireAuth>
              <PsicoHub />
            </RequireAuth>
          }
        />
        <Route
          path="/app/aerolinea/psicotecnicas/aprende"
          element={
            <RequireAuth>
              <PsicoAprende />
            </RequireAuth>
          }
        />
        <Route
          path="/app/aerolinea/psicotecnicas/practica"
          element={
            <RequireAuth>
              <PsicoPractica />
            </RequireAuth>
          }
        />
        <Route
          path="/app/aerolinea/psicotecnicas/evaluacion"
          element={
            <RequireAuth>
              <PsicoEvaluacion />
            </RequireAuth>
          }
        />
        <Route
          path="/app/aerolinea/psicotecnicas/simulacro"
          element={
            <RequireAuth>
              <PsicoSimulacro />
            </RequireAuth>
          }
        />
        {/* El panorama amplio de assessment (9 categorías, COMPASS/CUT-E/
            PILAPT) sigue donde estaba: es otra cosa que el tema de razonamiento
            que acaba de abrirse, y ahora enlaza a él. */}
        <Route
          path="/app/psicotecnicas"
          element={
            <RequireAuth>
              <PsychTests />
            </RequireAuth>
          }
        />
        <Route
          path="/app/biblioteca"
          element={
            <RequireAuth>
              <Library />
            </RequireAuth>
          }
        />
        <Route
          path="/app/biblioteca/:slug"
          element={
            <RequireAuth>
              <BibliotecaDocumento />
            </RequireAuth>
          }
        />
        <Route
          path="/app/entrevistas"
          element={
            <RequireAuth>
              <InterviewSim />
            </RequireAuth>
          }
        />
        <Route
          path="/app/entrevistas/speaking"
          element={
            <RequireAuth>
              <InterviewSpeakingIntro />
            </RequireAuth>
          }
        />
        <Route
          path="/app/ruta"
          element={
            <RequireAuth>
              <RoutePage />
            </RequireAuth>
          }
        />
        <Route
          path="/app/match"
          element={
            <RequireAuth>
              <Airlines />
            </RequireAuth>
          }
        />
        <Route
          path="/app/logbook"
          element={
            <RequireAuth>
              <Logbook />
            </RequireAuth>
          }
        />
        <Route
          path="/app/vencimientos"
          element={
            <RequireAuth>
              <Expiries />
            </RequireAuth>
          }
        />
        <Route
          path="/app/referidos"
          element={
            <RequireAuth>
              <Referrals />
            </RequireAuth>
          }
        />
        <Route
          path="/app/examenes"
          element={
            <RequireAuth>
              <ExamTracker />
            </RequireAuth>
          }
        />
        <Route
          path="/app/examenes/:slug"
          element={
            <RequireAuth>
              <ExamTrackerSubject />
            </RequireAuth>
          }
        />
        <Route
          path="/app/comunidad"
          element={
            <RequireAuth>
              <Community />
            </RequireAuth>
          }
        />
        <Route
          path="/app/comunidad/:slug"
          element={
            <RequireAuth>
              <CommunityChannel />
            </RequireAuth>
          }
        />
        <Route
          path="/app/perfil"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />

        <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
      <ReloadPrompt />
    </>
  )
}

export default App

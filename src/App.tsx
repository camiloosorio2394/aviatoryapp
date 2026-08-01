import { useEffect } from "react"
import { Navigate, Route, Routes, useParams } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import { ReloadPrompt } from "@/components/ReloadPrompt"
import { RequireAuth } from "@/components/auth/RequireAuth"
import { GeneralSubjects } from "@/pages/GeneralSubjects"
import { OfficialBank } from "@/pages/OfficialBank"
import { useSession } from "@/hooks/useSession"
import { usePageViewTracking } from "@/hooks/usePageViewTracking"
import { identifyUser, resetIdentity } from "@/lib/analytics"
import { Landing } from "@/pages/Landing"
import { Pricing } from "@/pages/Pricing"
import { Contact } from "@/pages/Contact"
import { Login } from "@/pages/Login"
import { Onboarding } from "@/pages/Onboarding"
import { Dashboard } from "@/pages/Dashboard"
import { TestInicial } from "@/pages/TestInicial"
import { Route as RoutePage } from "@/pages/Route"
import { Airlines } from "@/pages/Airlines"
import { Profile } from "@/pages/Profile"
import { Community } from "@/pages/Community"
import { CommunityChannel } from "@/pages/CommunityChannel"
import { Logbook } from "@/pages/Logbook"
import { Expiries } from "@/pages/Expiries"
import { Referrals } from "@/pages/Referrals"
import { ExamTracker } from "@/pages/ExamTracker"
import { ExamTrackerSubject } from "@/pages/ExamTrackerSubject"
import { Icao } from "@/pages/Icao"
import { IcaoVocabulary } from "@/pages/IcaoVocabulary"
import { IcaoQuiz } from "@/pages/IcaoQuiz"
import { IcaoInterview } from "@/pages/IcaoInterview"
import { IcaoComprehension } from "@/pages/IcaoComprehension"
import { IcaoPictureDescription } from "@/pages/IcaoPictureDescription"
import { IcaoMockExam } from "@/pages/IcaoMockExam"
import { Pca } from "@/pages/Pca"
import { AirlinePrep } from "@/pages/AirlinePrep"
import { AirlineMockExam } from "@/pages/AirlineMockExam"
import { Notam } from "@/pages/Notam"
import { Metar } from "@/pages/Metar"
import { MetarLesson } from "@/pages/MetarLesson"
import { MetarDecoder } from "@/pages/MetarDecoder"
import { MetarPractice } from "@/pages/MetarPractice"
import { MetarExam } from "@/pages/MetarExam"
import { NotamLesson } from "@/pages/NotamLesson"
import { NotamDecoder } from "@/pages/NotamDecoder"
import { NotamPractice } from "@/pages/NotamPractice"
import { NotamExam } from "@/pages/NotamExam"
import { PsychTests } from "@/pages/PsychTests"
import { Library } from "@/pages/Library"
import { VaultQuizPlayer } from "@/pages/VaultQuizPlayer"
import { InterviewSim } from "@/pages/InterviewSim"
import { InterviewSpeakingIntro } from "@/pages/InterviewSpeakingIntro"
import { Terms } from "@/pages/Terms"
import { Privacy } from "@/pages/Privacy"
import { NotFound } from "@/pages/NotFound"

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
        <Route
          path="/app/banco-oficial"
          element={
            <RequireAuth>
              <OfficialBank />
            </RequireAuth>
          }
        />
        {/* Exam Tracker y Match pasaron a vivir dentro de su modulo. Las rutas
            viejas siguen funcionando para no romper enlaces ya compartidos. */}
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
          path="/app/aerolinea/notam/decodificador"
          element={
            <RequireAuth>
              <NotamDecoder />
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
        <Route
          path="/app/aerolinea/simulacro"
          element={
            <RequireAuth>
              <AirlineMockExam />
            </RequireAuth>
          }
        />
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
      <Toaster />
      <ReloadPrompt />
    </>
  )
}

export default App

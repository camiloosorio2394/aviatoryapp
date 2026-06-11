import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import { RequireAuth } from "@/components/auth/RequireAuth"
import { useSession } from "@/hooks/useSession"
import { usePageViewTracking } from "@/hooks/usePageViewTracking"
import { identifyUser, resetIdentity } from "@/lib/analytics"
import { Landing } from "@/pages/Landing"
import { Pricing } from "@/pages/Pricing"
import { Contact } from "@/pages/Contact"
import { Login } from "@/pages/Login"
import { Onboarding } from "@/pages/Onboarding"
import { Dashboard } from "@/pages/Dashboard"
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
import { Pca } from "@/pages/Pca"
import { AirlinePrep } from "@/pages/AirlinePrep"
import { PsychTests } from "@/pages/PsychTests"
import { Library } from "@/pages/Library"
import { VaultQuizPlayer } from "@/pages/VaultQuizPlayer"
import { InterviewSim } from "@/pages/InterviewSim"
import { Terms } from "@/pages/Terms"
import { Privacy } from "@/pages/Privacy"
import { NotFound } from "@/pages/NotFound"

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
        <Route path="/app/materias" element={<Navigate to="/app/pca" replace />} />
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
          path="/app/ruta"
          element={
            <RequireAuth>
              <RoutePage />
            </RequireAuth>
          }
        />
        <Route
          path="/app/aerolineas"
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
          path="/app/exam-tracker"
          element={
            <RequireAuth>
              <ExamTracker />
            </RequireAuth>
          }
        />
        <Route
          path="/app/exam-tracker/:slug"
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
    </>
  )
}

export default App

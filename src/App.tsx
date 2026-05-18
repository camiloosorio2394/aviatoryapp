import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
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
import { Quiz } from "@/pages/Quiz"
import { QuizPlayer } from "@/pages/QuizPlayer"
import { Route as RoutePage } from "@/pages/Route"
import { Airlines } from "@/pages/Airlines"
import { Profile } from "@/pages/Profile"
import { Community } from "@/pages/Community"
import { CommunityChannel } from "@/pages/CommunityChannel"
import { Logbook } from "@/pages/Logbook"
import { Expiries } from "@/pages/Expiries"
import { Referrals } from "@/pages/Referrals"
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
        <Route
          path="/app/quiz"
          element={
            <RequireAuth>
              <Quiz />
            </RequireAuth>
          }
        />
        <Route
          path="/app/quiz/:slug"
          element={
            <RequireAuth>
              <QuizPlayer />
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

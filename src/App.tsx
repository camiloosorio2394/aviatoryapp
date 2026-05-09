import { Route, Routes } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import { RequireAuth } from "@/components/auth/RequireAuth"
import { Landing } from "@/pages/Landing"
import { Login } from "@/pages/Login"
import { Onboarding } from "@/pages/Onboarding"
import { Dashboard } from "@/pages/Dashboard"
import { NotFound } from "@/pages/NotFound"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/onboarding"
          element={
            <RequireAuth>
              <Onboarding />
            </RequireAuth>
          }
        />
        <Route
          path="/app"
          element={
            <RequireAuth>
              <Dashboard />
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

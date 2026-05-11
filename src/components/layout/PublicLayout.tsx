import type { ReactNode } from "react"
import { Header } from "./Header"
import { Footer } from "./Footer"

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  )
}

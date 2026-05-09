import { useState } from "react"
import { Button } from "@/components/ui/button"

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-5xl font-bold tracking-tight">AviatorYapp</h1>
        <p className="text-muted-foreground">
          Vite + React + TS + Tailwind v4 + shadcn v4 + Supabase + Vercel
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button onClick={() => setCount((c) => c + 1)}>
          Clicked {count} times
        </Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    </main>
  )
}

export default App

import { PublicLayout } from "@/components/layout/PublicLayout"
import { Hero } from "@/components/landing/Hero"
import { PainPoints } from "@/components/landing/PainPoints"
import { Solutions } from "@/components/landing/Solutions"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { Features } from "@/components/landing/Features"
import { PricingPreview } from "@/components/landing/PricingPreview"
import { FAQ } from "@/components/landing/FAQ"
import { FinalCTA } from "@/components/landing/FinalCTA"

export function Landing() {
  return (
    <PublicLayout>
      <Hero />
      <PainPoints />
      <Solutions />
      <HowItWorks />
      <Features />
      <PricingPreview />
      <FAQ />
      <FinalCTA />
    </PublicLayout>
  )
}

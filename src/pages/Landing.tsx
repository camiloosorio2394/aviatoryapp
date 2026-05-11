import { PublicLayout } from "@/components/layout/PublicLayout"
import { Hero } from "@/components/landing/Hero"
import { SocialProof } from "@/components/landing/SocialProof"
import { PainPoints } from "@/components/landing/PainPoints"
import { Solutions } from "@/components/landing/Solutions"
import { Stats } from "@/components/landing/Stats"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { Comparison } from "@/components/landing/Comparison"
import { Testimonials } from "@/components/landing/Testimonials"
import { FounderStory } from "@/components/landing/FounderStory"
import { PricingPreview } from "@/components/landing/PricingPreview"
import { FAQ } from "@/components/landing/FAQ"
import { FinalCTA } from "@/components/landing/FinalCTA"

/**
 * Marketing landing — strategic flow:
 *  1. Hero       → grab attention + risk-reversed CTA
 *  2. SocialProof→ airline logos = "this is real for serious pilots"
 *  3. PainPoints → resonance ("¿te suena familiar?")
 *  4. Solutions  → bento grid showing the platform
 *  5. Stats      → numbers that build trust
 *  6. HowItWorks → demystify the path
 *  7. Comparison → "vs estudiar solo / vs bank tradicional"
 *  8. Testimonials → social proof v2 (peers)
 *  9. FounderStory→ humanize, who's behind
 * 10. Pricing   → make the offer concrete
 * 11. FAQ      → handle objections
 * 12. FinalCTA  → close
 */
export function Landing() {
  return (
    <PublicLayout>
      <Hero />
      <SocialProof />
      <PainPoints />
      <Solutions />
      <Stats />
      <HowItWorks />
      <Comparison />
      <Testimonials />
      <FounderStory />
      <PricingPreview />
      <FAQ />
      <FinalCTA />
    </PublicLayout>
  )
}

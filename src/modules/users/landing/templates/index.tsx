import type { FC } from "react"
import { CtaSection } from "../sections/cta"
import { EventsSection } from "../sections/events"
import { FeaturesSection } from "../sections/features"
import { HeroSection } from "../sections/hero"
import { HowItWorksSection } from "../sections/how-it-works"
import { TestimonialsSection } from "../sections/testimonials"
import { VerifySection } from "../sections/verify"
import { WalletPreviewSection } from "../sections/wallet-preview"

const UserLandingPageTemplate: FC = () => {
  return (
    <>
      <HeroSection />
      <EventsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <VerifySection />
      <WalletPreviewSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}

export default UserLandingPageTemplate

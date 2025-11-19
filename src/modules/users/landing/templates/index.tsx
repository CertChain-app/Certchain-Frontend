import type { FC } from "react"
import { CtaSection } from "../sections/cta"
import { DashboardPreviewSection } from "../sections/dashboard-preview"
import { EventsSection } from "../sections/events"
import { FeaturesSection } from "../sections/features"
import { HeroSection } from "../sections/hero"
import { HowItWorksSection } from "../sections/how-it-works"
import { TestimonialsSection } from "../sections/testimonials"

const UserLandingPageTemplate: FC = () => {
  return (
    <div className='min-h-screen bg-gray-50 text-gray-900'>
      <HeroSection />
      <EventsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <DashboardPreviewSection />
      {/* <BlogSection /> */}
      <CtaSection />
    </div>
  )
}

export default UserLandingPageTemplate

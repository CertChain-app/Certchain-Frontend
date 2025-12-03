import { Button } from "@mantine/core"
import Link from "next/link"
import CtaSection from "../components/cta"
import FaqSection from "../sections/faq"
import FeaturesSection from "../sections/features"
import FourDivisionsSection from "../sections/four-divisions"
import TestimonialsSection from "../sections/testimonials"

export default function OrganizersLandingTemplate() {
  return (
    <div>
      {/* Hero Section */}
      <section className='bg-white'>
        <div className='container mx-auto px-4 py-20 text-center'>
          <h1 className='mb-6 text-4xl font-bold tracking-tight md:text-6xl'>
            Elevate Your Events with{" "}
            <span className='bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
              CertChain
            </span>
          </h1>
          <p className='mx-auto mb-12 max-w-2xl text-base md:text-xl text-gray-600'>
            The all-in-one platform for managing events, verifying attendance,
            and issuing certificates with blockchain security.
          </p>
          <Button
            className='bg-gradient-to-r from-blue-500 to-purple-500'
            component={Link}
            radius='xl'
            size='lg'
            href='/organizers/signup'
          >
            Start Your Free Trial
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Four Divisions Section */}
      <FourDivisionsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Pricing Section */}
      {/* <PricingSection /> */}

      {/* FAQ Section */}
      <FaqSection />

      {/* CTA Section */}
      <CtaSection />
    </div>
  )
}

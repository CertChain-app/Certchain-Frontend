import type { FC } from "react"
import { StepCard } from "../components/step-card"
import { steps } from "../data"

export const HowItWorksSection: FC = () => {
  return (
    <section
      id='how-it-works'
      className='bg-gradient-to-br from-blue-50 to-purple-50 py-20'
    >
      <div className='container mx-auto px-4'>
        <h2 className='mb-12 text-center text-3xl font-bold'>
          How CertChain Works
        </h2>
        <div className='relative'>
          <div className='absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 to-purple-300 transform -translate-y-1/2 hidden lg:block'></div>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative z-10'>
            {steps.map((step, index) => (
              <StepCard key={index} {...step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

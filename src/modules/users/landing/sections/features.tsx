import type { FC } from "react"
import { FeatureCard } from "../components/feature-card"
import { features } from "../data"

export const FeaturesSection: FC = () => {
  return (
    <section id='features' className='bg-white py-20'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-12 text-center text-3xl font-bold'>
          Empower Your Event Experience
        </h2>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

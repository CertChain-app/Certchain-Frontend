import type { FC } from "react"
import { TestimonialCard } from "../components/testimonial-card"

const TestimonialsSection: FC = ({}) => {
  return (
    <section id='testimonials' className='bg-gray-100 py-20'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-12 text-center text-3xl font-bold'>
          What Our Clients Say
        </h2>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          <TestimonialCard
            quote="CertChain revolutionized our certification process. It's fast, secure, and our participants love it!"
            author='Jane Doe'
            position='Event Manager, TechConf'
          />
          <TestimonialCard
            quote='The blockchain verification feature gives our certificates the credibility they deserve. Highly recommended!'
            author='John Smith'
            position='CEO, EduCorp'
          />
          <TestimonialCard
            quote="CertChain's analytics helped us improve our events and increase participant engagement significantly."
            author='Emily Brown'
            position='Director, Global Summits'
          />
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection

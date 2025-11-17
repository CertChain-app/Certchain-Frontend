import type { FC } from "react"
import { TestimonialCard } from "../components/testimonial-card"
import { testimonials } from "../data"

export const TestimonialsSection: FC = () => {
  return (
    <section id='testimonials' className='bg-white py-20'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-12 text-center text-3xl font-bold'>
          What Our Users Say
        </h2>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

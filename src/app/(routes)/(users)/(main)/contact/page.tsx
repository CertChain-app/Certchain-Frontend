import { Mail, MapPin, Phone } from "lucide-react"

const contactCards = [
  {
    title: "Call us",
    description: "+1 (555) 123-4567",
    icon: Phone,
  },
  {
    title: "Email",
    description: "support@certchain.co",
    icon: Mail,
  },
  {
    title: "Visit",
    description: "100 Event Avenue, Innovation City",
    icon: MapPin,
  },
]

export default function ContactPage() {
  return (
    <main className='bg-gray-50 text-gray-900'>
      <section className='bg-white'>
        <div className='container mx-auto px-6 md:px-10 lg:px-12 py-24 md:py-28'>
          <div className='max-w-3xl'>
            <p className='text-xs uppercase tracking-[0.35em] text-blue-600'>
              Contact
            </p>
            <h1 className='mt-4 text-4xl font-bold tracking-tight md:text-5xl'>
              Let&apos;s talk about your next event.
            </h1>
            <p className='mt-6 text-lg text-gray-600'>
              Reach out to our team for partnerships, product support, or event
              onboarding. We respond within one business day.
            </p>
          </div>
        </div>
      </section>

      <section className='container mx-auto px-4 py-16 md:py-20'>
        <div className='grid gap-6 md:grid-cols-3'>
          {contactCards.map((card) => (
            <div
              key={card.title}
              className='rounded-2xl bg-white p-7 shadow-sm border border-gray-100'
            >
              <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600'>
                <card.icon className='h-5 w-5' />
              </div>
              <h3 className='mt-4 text-lg font-semibold text-gray-900'>
                {card.title}
              </h3>
              <p className='mt-2 text-gray-600'>{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='container mx-auto px-4 pb-20'>
        <div className='rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-10 md:p-12 text-white'>
          <h2 className='text-2xl font-semibold'>Support hours</h2>
          <p className='mt-3 text-blue-100'>
            Monday - Friday · 9:00 AM - 6:00 PM (UTC)
          </p>
          <p className='mt-2 text-blue-100'>We&apos;re here to help you succeed.</p>
        </div>
      </section>
    </main>
  )
}

export default function AboutPage() {
  return (
    <main className='bg-gray-50 text-gray-900'>
      <section className='relative overflow-hidden bg-white'>
        <div className='absolute inset-0'>
          <div className='absolute -top-32 -right-24 h-72 w-72 rounded-full bg-blue-100 blur-3xl' />
          <div className='absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-purple-100 blur-3xl' />
        </div>
        <div className='container mx-auto px-6 md:px-10 lg:px-12 py-24 md:py-28 relative'>
          <div className='max-w-3xl'>
            <p className='text-xs uppercase tracking-[0.35em] text-blue-600'>
              About CertChain
            </p>
            <h1 className='mt-4 text-4xl font-bold tracking-tight md:text-5xl'>
              Building trust for events and achievements.
            </h1>
            <p className='mt-6 text-lg text-gray-600'>
              CertChain helps communities run better events and issue verified
              certificates that participants can share instantly. We blend secure
              infrastructure with a delightful experience for attendees and
              organizers.
            </p>
          </div>
        </div>
      </section>

      <section className='container mx-auto px-4 py-16 md:py-20'>
        <div className='grid gap-10 md:grid-cols-3'>
          {[
            {
              title: "Reliable verification",
              copy: "Every certificate is tied to tamper-proof records and can be validated from anywhere.",
            },
            {
              title: "Purpose-built for events",
              copy: "From registrations to check-ins, the platform stays focused on the event lifecycle.",
            },
            {
              title: "Designed for growth",
              copy: "Analytics, messaging, and automation make scaling your community effortless.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className='rounded-2xl bg-white p-7 shadow-sm border border-gray-100'
            >
              <h3 className='text-xl font-semibold text-gray-900'>{item.title}</h3>
              <p className='mt-3 text-gray-600'>{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='bg-white'>
        <div className='container mx-auto px-4 py-16 md:py-20'>
          <div className='grid gap-12 md:grid-cols-2'>
            <div className='rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-10'>
              <h2 className='text-2xl font-semibold text-gray-900'>Our mission</h2>
              <p className='mt-4 text-gray-600'>
                Give every participant a certificate they can prove, share, and
                celebrate. We want organizers to feel confident that attendance
                records and achievements are accurate and verifiable.
              </p>
              <p className='mt-4 text-gray-600'>
                CertChain is built for modern communities, hackathons, workshops,
                and online events that need a trusted source of truth.
              </p>
            </div>
            <div className='rounded-3xl border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-10'>
              <h2 className='text-2xl font-semibold text-gray-900'>What we value</h2>
              <ul className='mt-4 space-y-3 text-gray-600'>
                <li>Transparent verification for every attendee.</li>
                <li>Clean, human-friendly dashboards.</li>
                <li>Automation that saves organizers hours.</li>
                <li>Security that scales with your events.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className='container mx-auto px-4 py-16 md:py-20'>
        <div className='rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-10 md:p-12 text-white'>
          <h2 className='text-3xl font-semibold'>Join the CertChain story</h2>
          <p className='mt-3 max-w-2xl text-blue-100'>
            We are partnering with organizers worldwide to deliver secure,
            beautiful credentials. If you&apos;re ready to elevate your events,
            we&apos;d love to hear from you.
          </p>
        </div>
      </section>
    </main>
  )
}

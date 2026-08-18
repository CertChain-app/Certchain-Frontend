import type { FC } from "react"

const STEPS = [
  {
    n: "01",
    title: "Create your account",
    body: "Set up a free profile in a minute and get your credential wallet.",
  },
  {
    n: "02",
    title: "Attend & participate",
    body: "Register for events, keep your ticket handy, and take part.",
  },
  {
    n: "03",
    title: "Receive your credential",
    body: "Issuers mint your certificate the moment you complete the event.",
  },
  {
    n: "04",
    title: "Share proof anywhere",
    body: "Send a verify link that confirms authenticity instantly, forever.",
  },
]

export const HowItWorksSection: FC = () => {
  return (
    <section id='how-it-works' className='border-t border-border bg-background'>
      <div className='mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24'>
        <div className='max-w-2xl'>
          <p className='font-mono text-xs uppercase tracking-widest text-primary'>
            // workflow
          </p>
          <h2 className='mt-2 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl'>
            From attendance to proof
          </h2>
        </div>

        <ol className='mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4'>
          {STEPS.map((step) => (
            <li key={step.n} className='relative bg-card p-6'>
              <span className='font-mono text-sm font-semibold text-primary'>
                {step.n}
              </span>
              <h3 className='mt-6 text-base font-semibold text-foreground'>
                {step.title}
              </h3>
              <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

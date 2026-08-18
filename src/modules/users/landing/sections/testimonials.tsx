import type { FC } from "react"

const QUOTES = [
  {
    quote:
      "Managing my professional certifications is finally effortless. I share one link and people trust it instantly.",
    name: "Alex Johnson",
    role: "Software Developer",
  },
  {
    quote:
      "The verification gives our certificates the credibility they deserve. Highly recommended.",
    name: "Sarah Lee",
    role: "Marketing Specialist",
  },
  {
    quote:
      "I discovered so many great events through CertChain — it is now my go-to for professional growth.",
    name: "Michael Chen",
    role: "Data Scientist",
  },
]

export const TestimonialsSection: FC = () => {
  return (
    <section
      id='testimonials'
      className='border-t border-border bg-secondary/40'
    >
      <div className='mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24'>
        <div className='max-w-2xl'>
          <p className='font-mono text-xs uppercase tracking-widest text-primary'>
            // trusted by
          </p>
          <h2 className='mt-2 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl'>
            What our members say
          </h2>
        </div>

        <div className='mt-10 grid gap-5 md:grid-cols-3'>
          {QUOTES.map((item) => (
            <figure
              key={item.name}
              className='flex flex-col rounded-xl border border-border bg-card p-6'
            >
              <blockquote className='flex-1 text-pretty text-[15px] leading-relaxed text-foreground/90'>
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className='mt-6 flex items-center gap-3'>
                <span className='flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-semibold text-primary'>
                  {item.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <span>
                  <span className='block text-sm font-semibold text-foreground'>
                    {item.name}
                  </span>
                  <span className='block text-xs text-muted-foreground'>
                    {item.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

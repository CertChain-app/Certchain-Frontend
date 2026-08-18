import { ButtonLink } from "@/modules/users/common/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { FC } from "react"

export const CtaSection: FC = () => {
  return (
    <section className='border-t border-border bg-background'>
      <div className='mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20'>
        <div className='relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-12'>
          <div
            aria-hidden
            className='pointer-events-none absolute inset-0 opacity-50'
            style={{
              backgroundImage:
                "linear-gradient(to right, color-mix(in oklch, oklch(var(--primary)) 8%, transparent) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className='relative max-w-xl'>
            <h2 className='text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl'>
              Ready to make your achievements verifiable?
            </h2>
            <p className='mt-3 text-pretty text-muted-foreground'>
              Join thousands of professionals using CertChain to discover events
              and carry credentials that speak for themselves.
            </p>
            <div className='mt-6 flex flex-wrap gap-3'>
              <ButtonLink href='/auth/register' size='lg'>
                Create free account
                <ArrowRight className='size-4' />
              </ButtonLink>
              <ButtonLink href='/events' size='lg' variant='outline'>
                Explore events
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { Button, ButtonLink } from "@/modules/users/common/components/ui/button"
import { GuestButton } from "@/modules/users/common/components/guest-button"
import { ArrowRight, Search, ShieldCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, type FC, type FormEvent } from "react"
import { CredentialCard } from "../components/credential-card"

const STATS = [
  { value: "128k+", label: "credentials issued" },
  { value: "2,400+", label: "trusted issuers" },
  { value: "0.4s", label: "avg. verification" },
]

export const HeroSection: FC = () => {
  const router = useRouter()
  const [query, setQuery] = useState("")

  const handleSearch = (event: FormEvent) => {
    event.preventDefault()
    const search = query.trim()
    router.push(
      search
        ? `/events?search=${encodeURIComponent(search)}&searchFields=title`
        : "/events"
    )
  }

  return (
    <section id='top' className='relative overflow-hidden'>
      {/* warm paper glow */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0'
        style={{
          background:
            "radial-gradient(60% 55% at 78% 12%, color-mix(in oklch, oklch(var(--accent)) 26%, transparent), transparent 70%)",
        }}
      />

      <div className='relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.1fr_0.9fr]'>
        <div>
          <span className='inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground'>
            <ShieldCheck className='size-3.5 text-verified' />
            Tamper-proof, instantly verifiable
          </span>

          <h1 className='mt-5 text-balance font-serif text-5xl font-medium leading-[1.02] tracking-tight text-foreground sm:text-6xl md:text-7xl'>
            Certificates that{" "}
            <span className='italic text-primary'>prove themselves.</span>
          </h1>

          <p className='mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground'>
            Discover events, keep your tickets in one place, and collect
            certificates that anyone can verify in seconds — no phone calls, no
            forged PDFs.
          </p>

          <form onSubmit={handleSearch} className='mt-7 max-w-md'>
            <div className='flex items-center gap-2 rounded-lg border border-border bg-card p-1.5 shadow-sm focus-within:border-primary/60 focus-within:ring-[3px] focus-within:ring-primary/15'>
              <Search className='ml-2 size-4 shrink-0 text-muted-foreground' />
              <input
                type='search'
                value={query}
                onChange={(event) => setQuery(event.currentTarget.value)}
                placeholder='Search events, issuers, or credentials'
                aria-label='Search events'
                className='h-9 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground'
              />
              <Button type='submit' className='h-9 px-3'>
                Search
              </Button>
            </div>
          </form>

          <div className='mt-6 flex flex-wrap items-center gap-3'>
            <ButtonLink href='/auth/register' size='lg'>
              Create free account
              <ArrowRight className='size-4' />
            </ButtonLink>
            <ButtonLink href='#verify' size='lg' variant='outline'>
              Verify a certificate
            </ButtonLink>
            <GuestButton />
          </div>

          <p className='mt-3 text-xs text-muted-foreground'>
            Guest mode opens a demo account with sample events and certificates
            — no signup.
          </p>

          <dl className='mt-10 flex flex-wrap gap-x-10 gap-y-4'>
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className='font-mono text-2xl font-semibold text-foreground'>
                  {stat.value}
                </dt>
                <dd className='mt-0.5 text-xs text-muted-foreground'>
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* signature credential card */}
        <div className='relative mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto'>
          <CredentialCard className='relative z-10' />
          <div
            aria-hidden
            className='absolute -right-4 top-8 z-0 hidden h-full w-full rounded-xl border border-border bg-card/60 sm:block'
          />
        </div>
      </div>
    </section>
  )
}

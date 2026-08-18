import {
  BadgeCheck,
  Fingerprint,
  Lock,
  Share2,
  Ticket,
  Users,
} from "lucide-react"
import type { FC } from "react"

const FEATURES = [
  {
    icon: Ticket,
    title: "One place for tickets",
    body: "Store and access every event ticket in a single wallet, ready on entry.",
  },
  {
    icon: BadgeCheck,
    title: "Tamper-proof certificates",
    body: "Each certificate is digitally signed and tamper-evident, so it can never be edited or faked.",
  },
  {
    icon: Fingerprint,
    title: "Instant verification",
    body: "Share a link or ID and employers confirm authenticity in under a second.",
  },
  {
    icon: Lock,
    title: "Encrypted storage",
    body: "Your credentials stay private and encrypted until you choose to share.",
  },
  {
    icon: Users,
    title: "Professional network",
    body: "Connect with peers and issuers you meet across events you attend.",
  },
  {
    icon: Share2,
    title: "Portable proof",
    body: "Export a verifiable badge to LinkedIn, your résumé, or a public profile.",
  },
]

export const FeaturesSection: FC = () => {
  return (
    <section id='features' className='border-t border-border bg-secondary/40'>
      <div className='mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24'>
        <div className='max-w-2xl'>
          <p className='text-xs font-semibold uppercase tracking-[0.18em] text-primary'>
            Capabilities
          </p>
          <h2 className='mt-2 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl'>
            Everything a credential should be
          </h2>
          <p className='mt-3 text-pretty text-muted-foreground'>
            Built for the moment your achievement needs to be trusted by someone
            who wasn&apos;t in the room.
          </p>
        </div>

        <div className='mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3'>
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className='group bg-card p-6 transition-colors hover:bg-accent/40'
            >
              <span className='flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground'>
                <feature.icon className='size-5' />
              </span>
              <h3 className='mt-4 text-base font-semibold text-foreground'>
                {feature.title}
              </h3>
              <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

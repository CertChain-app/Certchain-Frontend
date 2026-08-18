import { CalendarCheck, LineChart, Share2, Wallet } from "lucide-react"
import type { FC } from "react"
import { CredentialCard } from "../components/credential-card"

const ITEMS = [
  { icon: CalendarCheck, label: "Track every event you participate in" },
  { icon: Wallet, label: "Manage all earned certificates in one wallet" },
  { icon: Share2, label: "Share verifiable proof with a single link" },
  { icon: LineChart, label: "Get recommendations tuned to your goals" },
]

export const WalletPreviewSection: FC = () => {
  return (
    <section id='wallet' className='border-t border-border bg-background'>
      <div className='mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2'>
        <div>
          <p className='font-mono text-xs uppercase tracking-widest text-primary'>
            // your wallet
          </p>
          <h2 className='mt-2 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl'>
            One home for your professional journey
          </h2>
          <p className='mt-3 max-w-md text-pretty text-muted-foreground'>
            Every ticket, badge, and certificate lives together — organized,
            encrypted, and ready to prove.
          </p>

          <ul className='mt-8 space-y-3'>
            {ITEMS.map((item) => (
              <li
                key={item.label}
                className='flex items-center gap-3 rounded-lg border border-border bg-card p-3.5'
              >
                <span className='flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary'>
                  <item.icon className='size-[18px]' />
                </span>
                <span className='text-sm text-foreground'>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className='relative pt-6 sm:pt-0'>
          <CredentialCard className='relative z-20 ml-auto' />
          <CredentialCard
            className='absolute -top-6 left-0 z-10 hidden opacity-70 sm:block'
            issuer='Nepal Startup Hub'
            title='Founders Legal Clinic — Attendee'
            issuedOn='August 18, 2026'
            certId='CC-1B9D-4A77'
          />
        </div>
      </div>
    </section>
  )
}

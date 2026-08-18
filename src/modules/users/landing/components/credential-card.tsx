import { cn } from "@/modules/core/lib/utils"
import { BadgeCheck, ShieldCheck } from "lucide-react"
import type { FC } from "react"

interface CredentialCardProps {
  issuer?: string
  holder?: string
  title?: string
  issuedOn?: string
  certId?: string
  className?: string
}

/**
 * The signature visual of the landing page: a certificate rendered the way a
 * printed one would be — engraved rules, a wax-seal mark, and the verification
 * strip that makes the whole thing checkable.
 */
export const CredentialCard: FC<CredentialCardProps> = ({
  issuer = "CertChain Foundation",
  holder = "Alex Johnson",
  title = "Winter Hackathon 2026 — Finalist",
  issuedOn = "August 14, 2026",
  certId = "CC-8F3A-C2E1",
  className,
}) => {
  return (
    <div
      className={cn(
        "relative w-full max-w-sm overflow-hidden rounded-lg border border-border bg-card shadow-[0_1px_0_0_rgba(0,0,0,0.02),0_28px_50px_-28px_rgba(80,20,20,0.35)]",
        className
      )}
    >
      {/* engraved top rule */}
      <div className='flex items-center gap-2 border-b border-border bg-secondary/60 px-5 py-2.5'>
        <ShieldCheck className='size-4 shrink-0 text-primary' />
        <span className='truncate text-xs font-medium tracking-wide text-muted-foreground'>
          {issuer}
        </span>
        <span className='ml-auto inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-verified'>
          <BadgeCheck className='size-3.5' />
          Verified
        </span>
      </div>

      <div className='p-5'>
        <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-foreground/70'>
          Certificate of achievement
        </p>
        <p className='mt-3 text-[11px] text-muted-foreground'>Awarded to</p>
        <p className='font-serif text-2xl font-medium leading-tight text-foreground'>
          {holder}
        </p>
        <p className='mt-2 text-sm leading-relaxed text-foreground/75'>
          {title}
        </p>

        <div className='mt-6 flex items-end justify-between gap-4'>
          <dl className='space-y-1.5 text-[11px]'>
            <div className='flex gap-2'>
              <dt className='w-14 shrink-0 text-muted-foreground'>Issued</dt>
              <dd className='text-foreground'>{issuedOn}</dd>
            </div>
            <div className='flex gap-2'>
              <dt className='w-14 shrink-0 text-muted-foreground'>Cert ID</dt>
              <dd className='tabular-nums tracking-wider text-foreground'>
                {certId}
              </dd>
            </div>
          </dl>

          {/* wax-seal signature mark */}
          <div
            aria-hidden
            className='relative flex size-16 shrink-0 items-center justify-center rounded-full bg-accent/25 text-primary ring-1 ring-inset ring-accent/50'
          >
            <span className='absolute inset-1.5 rounded-full border border-dashed border-primary/30' />
            <ShieldCheck className='size-6' />
          </div>
        </div>
      </div>

      <div className='flex items-center justify-between gap-3 border-t border-border bg-secondary/40 px-5 py-3'>
        <span className='truncate text-[11px] text-muted-foreground'>
          Verify at certchain.io/v/{certId}
        </span>
        <span className='inline-flex shrink-0 items-center gap-1.5 text-[11px] text-verified'>
          <span className='size-1.5 rounded-full bg-verified' />
          Authentic
        </span>
      </div>
    </div>
  )
}

import { SAMPLE_CERTIFICATE_ID } from "@/lib/guest"
import { ArrowRight, GraduationCap } from "lucide-react"
import Link from "next/link"
import type { FC } from "react"

interface SampleCertificateProps {
  /** Rendered as a compact one-liner instead of a card. */
  compact?: boolean
}

/**
 * A real, seeded certificate anyone can open to see what verification looks
 * like. Its id is pinned in the seed, so it survives the nightly demo reset.
 */
const SampleCertificate: FC<SampleCertificateProps> = ({ compact = false }) => {
  const href = `/certificates/${SAMPLE_CERTIFICATE_ID}`

  if (compact) {
    return (
      <Link
        href={href}
        className='inline-flex items-center gap-1 font-mono text-xs text-primary underline-offset-4 hover:underline'
      >
        → see a sample certificate
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className='group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent/25'
    >
      <span className='flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary'>
        <GraduationCap className='size-6' />
      </span>
      <span className='min-w-0 flex-1'>
        <span className='block font-medium text-foreground'>
          Don&apos;t have one? Try a sample
        </span>
        <span className='block truncate text-sm text-muted-foreground'>
          Certification Day 2026 · issued by CertChain Demo Co.
        </span>
      </span>
      <ArrowRight className='size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary' />
    </Link>
  )
}

export default SampleCertificate

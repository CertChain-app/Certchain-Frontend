import { SAMPLE_CERTIFICATE_ID } from "@/lib/guest"
import { IconArrowRight } from "@tabler/icons-react"
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
        className='inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline'
      >
        See a sample certificate
        <IconArrowRight size={15} />
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className='group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-sm'
    >
      <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-xl'>
        🎓
      </div>
      <div className='min-w-0 flex-1'>
        <p className='font-medium text-gray-900'>
          Don&apos;t have one? Try a sample
        </p>
        <p className='truncate text-sm text-gray-600'>
          Certification Day 2026 · issued by CertChain Demo Co.
        </p>
      </div>
      <IconArrowRight
        size={18}
        className='shrink-0 text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-blue-600'
      />
    </Link>
  )
}

export default SampleCertificate

import { ShieldCheck } from "lucide-react"
import type { FC } from "react"
import SampleCertificate from "../components/sample-certificate"
import VerifyCertificateForm from "../components/verify-form"

const REASSURANCES = [
  "No account needed — verification is public.",
  "The ID is the last part of a certificate link, e.g. /certificates/<id>.",
  "Results show the holder, the event, and the issuer.",
]

const VerifyCertificateTemplate: FC = () => {
  return (
    <section className='relative overflow-hidden'>
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0'
        style={{
          background:
            "radial-gradient(55% 45% at 50% 0%, color-mix(in oklch, oklch(var(--accent)) 22%, transparent), transparent 70%)",
        }}
      />

      <div className='relative mx-auto max-w-2xl px-4 py-14 sm:px-6 md:py-20'>
        <div className='text-center'>
          <span className='inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground'>
            <ShieldCheck className='size-3.5 text-verified' />
            Public certificate register
          </span>
          <h1 className='mt-5 text-balance font-serif text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl'>
            Verify a certificate
          </h1>
          <p className='mx-auto mt-4 max-w-lg text-pretty leading-relaxed text-muted-foreground'>
            Paste a certificate ID or the link from a certificate to check who
            it was issued to, for which event, and by whom.
          </p>
        </div>

        <div className='mt-8 rounded-2xl border border-border bg-card p-6 shadow-[0_1px_0_0_rgba(0,0,0,0.02),0_28px_50px_-32px_rgba(30,50,90,0.35)] sm:p-8'>
          <VerifyCertificateForm autoFocus />

          <ul className='mt-5 space-y-2'>
            {REASSURANCES.map((item) => (
              <li
                key={item}
                className='flex items-start gap-2 text-sm text-muted-foreground'
              >
                <span className='mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/50' />
                {item}
              </li>
            ))}
          </ul>

          <div className='my-6 h-px bg-border' />

          <SampleCertificate />
        </div>
      </div>
    </section>
  )
}

export default VerifyCertificateTemplate

"use client"

import { SAMPLE_CERTIFICATE_ID } from "@/lib/guest"
import { Button } from "@/modules/users/common/components/ui/button"
import { ArrowUpRight, BadgeCheck, Loader2, Search, ShieldCheck, XCircle } from "lucide-react"
import Link from "next/link"
import { useState, type FC, type FormEvent } from "react"

interface CertificateSummary {
  id: string
  createdAt?: string
  user?: { firstName?: string; lastName?: string }
  event?: {
    title?: string
    organizer?: { name?: string }
  }
}

type Result =
  | { status: "idle" }
  | { status: "checking" }
  | { status: "verified"; certificate: CertificateSummary }
  | { status: "not-found"; id: string }
  | { status: "error" }

/** People paste the whole certificate link far more often than the bare id. */
const extractId = (value: string) =>
  value.trim().replace(/\/+$/, "").split("/").pop() ?? ""

const formatDate = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—"

export const VerifySection: FC = () => {
  const [value, setValue] = useState("")
  const [result, setResult] = useState<Result>({ status: "idle" })

  const verify = async (raw: string) => {
    const id = extractId(raw)
    if (!id) return

    setResult({ status: "checking" })

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/certificates/${encodeURIComponent(id)}`
      )

      if (!response.ok) {
        setResult({ status: "not-found", id })
        return
      }

      const body = (await response.json()) as { data?: CertificateSummary }
      if (!body?.data) {
        setResult({ status: "not-found", id })
        return
      }

      setResult({ status: "verified", certificate: body.data })
    } catch {
      setResult({ status: "error" })
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (result.status === "checking") return
    verify(value)
  }

  const showSample = () => {
    setValue(SAMPLE_CERTIFICATE_ID)
    verify(SAMPLE_CERTIFICATE_ID)
  }

  return (
    <section
      id='verify'
      className='border-t border-border bg-primary text-primary-foreground'
    >
      <div className='mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2'>
        <div>
          <p className='font-mono text-xs uppercase tracking-widest text-primary-foreground/70'>
            // verify
          </p>
          <h2 className='mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl'>
            Got a certificate? Check it here.
          </h2>
          <p className='mt-3 max-w-md text-pretty leading-relaxed text-primary-foreground/80'>
            Paste a certificate ID or link to see who it was issued to, for
            which event, and by whom. No account required.
          </p>

          <form onSubmit={handleSubmit} className='mt-7 max-w-md'>
            <div className='flex items-center gap-2 rounded-lg border border-primary-foreground/25 bg-primary-foreground/10 p-1.5 focus-within:border-primary-foreground/60'>
              <Search className='ml-2 size-4 shrink-0 text-primary-foreground/70' />
              <input
                value={value}
                onChange={(event) => {
                  setValue(event.currentTarget.value)
                  if (result.status !== "idle") setResult({ status: "idle" })
                }}
                placeholder='Certificate ID or link'
                aria-label='Certificate ID or link'
                className='h-9 w-full bg-transparent font-mono text-sm outline-none placeholder:text-primary-foreground/50'
              />
              <Button
                type='submit'
                className='h-9 bg-primary-foreground px-4 text-primary hover:bg-primary-foreground/90'
                disabled={result.status === "checking"}
              >
                {result.status === "checking" ? (
                  <Loader2 className='size-4 animate-spin' />
                ) : (
                  "Verify"
                )}
              </Button>
            </div>
            <button
              type='button'
              onClick={showSample}
              className='mt-3 font-mono text-xs text-primary-foreground/70 underline-offset-4 hover:underline'
            >
              → see a sample certificate
            </button>
          </form>
        </div>

        {/* result panel */}
        <div className='rounded-xl border border-primary-foreground/20 bg-primary-foreground/5 p-6'>
          {result.status === "verified" ? (
            <div>
              <div className='flex items-center gap-2 rounded-lg bg-verified/20 px-3 py-2'>
                <BadgeCheck className='size-5 shrink-0 text-verified' />
                <span className='text-sm font-semibold'>
                  Authentic — issued through CertChain
                </span>
              </div>

              <dl className='mt-5 divide-y divide-primary-foreground/15'>
                {[
                  [
                    "Holder",
                    [
                      result.certificate.user?.firstName,
                      result.certificate.user?.lastName,
                    ]
                      .filter(Boolean)
                      .join(" ") || "—",
                  ],
                  ["Credential", result.certificate.event?.title ?? "—"],
                  [
                    "Issuer",
                    result.certificate.event?.organizer?.name ?? "—",
                  ],
                  ["Issued", formatDate(result.certificate.createdAt)],
                  ["Certificate ID", result.certificate.id],
                ].map(([label, detail]) => (
                  <div
                    key={label}
                    className='flex items-start justify-between gap-4 py-2.5'
                  >
                    <dt className='shrink-0 text-xs uppercase text-primary-foreground/60'>
                      {label}
                    </dt>
                    <dd className='truncate font-mono text-sm'>{detail}</dd>
                  </div>
                ))}
              </dl>

              <Link
                href={`/certificates/${result.certificate.id}`}
                className='mt-5 inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline'
              >
                Open the full certificate
                <ArrowUpRight className='size-4' />
              </Link>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center py-10 text-center'>
              <span className='flex size-12 items-center justify-center rounded-full bg-primary-foreground/10'>
                {result.status === "not-found" || result.status === "error" ? (
                  <XCircle className='size-6 text-primary-foreground/70' />
                ) : (
                  <ShieldCheck className='size-6 text-primary-foreground/70' />
                )}
              </span>
              <p className='mt-4 max-w-xs text-sm text-primary-foreground/70'>
                {result.status === "checking" &&
                  "Checking the certificate register…"}
                {result.status === "idle" &&
                  "Verification results will appear here."}
                {result.status === "not-found" &&
                  "No certificate matches that ID. Check for a typo, or paste the full certificate link."}
                {result.status === "error" &&
                  "We couldn't reach the register just now. Please try again in a moment."}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

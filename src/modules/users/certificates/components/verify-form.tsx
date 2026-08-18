"use client"

import { cn } from "@/modules/core/lib/utils"
import { BadgeCheck, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, type FC, type FormEvent } from "react"

interface VerifyCertificateFormProps {
  autoFocus?: boolean
  className?: string
}

/**
 * Takes a certificate id and sends the visitor to its public verification
 * page. The lookup itself happens there, server-side, so this stays a plain
 * navigation — no auth, no client fetch.
 */
const VerifyCertificateForm: FC<VerifyCertificateFormProps> = ({
  autoFocus = false,
  className,
}) => {
  const router = useRouter()
  const [value, setValue] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    // Accept a pasted URL as readily as a bare id — people copy the whole
    // address far more often than the fragment you actually need.
    const id = value.trim().replace(/\/+$/, "").split("/").pop() ?? ""

    if (!id) {
      setError("Enter a certificate ID to verify")
      return
    }

    setError(null)
    router.push(`/certificates/${encodeURIComponent(id)}`)
  }

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)}>
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg border border-border bg-card p-1.5 shadow-sm focus-within:border-primary/60 focus-within:ring-[3px] focus-within:ring-primary/15",
          error && "border-destructive/60"
        )}
      >
        <Search className='ml-2 size-4 shrink-0 text-muted-foreground' />
        <input
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value)
            if (error) setError(null)
          }}
          placeholder='Certificate ID or link'
          aria-label='Certificate ID'
          autoFocus={autoFocus}
          className='h-9 w-full bg-transparent font-mono text-sm text-foreground outline-none placeholder:font-sans placeholder:text-muted-foreground'
        />
        <button
          type='submit'
          className='inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80'
        >
          <BadgeCheck className='size-4' />
          Verify
        </button>
      </div>

      {error && (
        <p role='alert' className='mt-2 text-sm text-destructive'>
          {error}
        </p>
      )}
    </form>
  )
}

export default VerifyCertificateForm

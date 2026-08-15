"use client"

import { Button, TextInput } from "@mantine/core"
import { IconRosetteDiscountCheck } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { useState, type FC, type FormEvent } from "react"

interface VerifyCertificateFormProps {
  size?: "sm" | "md" | "lg"
  autoFocus?: boolean
}

/**
 * Takes a certificate id and sends the visitor to its public verification
 * page. The lookup itself happens there, server-side, so this stays a plain
 * navigation — no auth, no client fetch.
 */
const VerifyCertificateForm: FC<VerifyCertificateFormProps> = ({
  size = "md",
  autoFocus = false,
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
    <form onSubmit={handleSubmit} className='w-full'>
      <div className='flex flex-col gap-3 sm:flex-row'>
        <TextInput
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          placeholder='Certificate ID or link'
          size={size}
          autoFocus={autoFocus}
          error={error}
          className='flex-1'
          aria-label='Certificate ID'
        />
        <Button
          type='submit'
          size={size}
          leftSection={<IconRosetteDiscountCheck size={18} />}
        >
          Verify
        </Button>
      </div>
    </form>
  )
}

export default VerifyCertificateForm

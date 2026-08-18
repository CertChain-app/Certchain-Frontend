"use client"

import { useGuestEntry } from "@/modules/users/auth/hooks/use-guest-entry"
import { Loader2, Wand2 } from "lucide-react"
import type { FC } from "react"
import { Button, type ButtonSize, type ButtonVariant } from "./ui/button"

interface GuestButtonProps {
  label?: string
  redirectTo?: string
  onDone?: () => void
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

/** Guest entry styled for the marketing surface. */
export const GuestButton: FC<GuestButtonProps> = ({
  label = "Preview as guest",
  redirectTo,
  onDone,
  variant = "ghost",
  size = "lg",
  className,
}) => {
  const { start, isPending } = useGuestEntry({ redirectTo, onDone })

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={start}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className='size-4 animate-spin' />
      ) : (
        <Wand2 className='size-4' />
      )}
      {label}
    </Button>
  )
}

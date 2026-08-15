"use client"

import { IApiError } from "@/api/types"
import { Button, ButtonProps } from "@mantine/core"
import { IconWand } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import type { FC } from "react"
import { toast } from "react-toastify"
import { useGuestLogin } from "../mutations/use-guest-login"

interface GuestLoginButtonProps extends ButtonProps {
  label?: string
  redirectTo?: string
  /** Called once the attempt settles, e.g. to close the mobile drawer. */
  onDone?: () => void
}

/**
 * Signs the visitor into the shared demo attendee account and drops them on the
 * dashboard. No form, no email verification.
 */
const GuestLoginButton: FC<GuestLoginButtonProps> = ({
  label = "Explore as guest",
  redirectTo = "/dashboard",
  onDone,
  ...props
}) => {
  const router = useRouter()
  const guestLogin = useGuestLogin()

  const handleClick = () => {
    guestLogin.mutate(undefined, {
      onSuccess: () => {
        toast.success("You are browsing as a guest")
        router.push(redirectTo)
      },
      onError: (error) => {
        const e = error as IApiError
        toast.error(
          e.response?.data?.message ?? "Guest mode is unavailable right now"
        )
      },
      onSettled: () => onDone?.(),
    })
  }

  return (
    <Button
      variant='default'
      leftSection={<IconWand size={18} />}
      loading={guestLogin.isPending}
      onClick={handleClick}
      {...props}
    >
      {label}
    </Button>
  )
}

export default GuestLoginButton

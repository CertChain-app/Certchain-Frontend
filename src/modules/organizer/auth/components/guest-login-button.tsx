"use client"

import { IApiError } from "@/api/types"
import { Button, ButtonProps } from "@mantine/core"
import { IconWand } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import type { FC } from "react"
import { toast } from "react-toastify"
import { useOrganizerGuestLogin } from "../mutations/use-organizer-guest-login"

interface OrganizerGuestLoginButtonProps extends ButtonProps {
  label?: string
}

/**
 * Signs the visitor into the demo organizer workspace and opens its dashboard.
 */
const OrganizerGuestLoginButton: FC<OrganizerGuestLoginButtonProps> = ({
  label = "Explore the demo workspace",
  ...props
}) => {
  const router = useRouter()
  const guestLogin = useOrganizerGuestLogin()

  const handleClick = () => {
    guestLogin.mutate(undefined, {
      onSuccess: (res) => {
        const organizerId = res?.data?.data?.organizer?.id

        if (!organizerId) {
          toast.error("Guest mode is unavailable right now")
          return
        }

        toast.success("You are browsing as a guest")
        router.push(`/organizers/${organizerId}/dashboard`)
      },
      onError: (error) => {
        const e = error as IApiError
        toast.error(
          e.response?.data?.message ?? "Guest mode is unavailable right now"
        )
      },
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

export default OrganizerGuestLoginButton

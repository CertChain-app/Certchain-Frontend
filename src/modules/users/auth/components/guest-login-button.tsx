"use client"

import { Button, ButtonProps } from "@mantine/core"
import { IconWand } from "@tabler/icons-react"
import type { FC } from "react"
import { useGuestEntry } from "../hooks/use-guest-entry"

interface GuestLoginButtonProps extends ButtonProps {
  label?: string
  redirectTo?: string
  /** Called once the attempt settles, e.g. to close the mobile drawer. */
  onDone?: () => void
}

/** Mantine-flavoured guest entry, for the dashboard-styled surfaces. */
const GuestLoginButton: FC<GuestLoginButtonProps> = ({
  label = "Explore as guest",
  redirectTo = "/dashboard",
  onDone,
  ...props
}) => {
  const { start, isPending } = useGuestEntry({ redirectTo, onDone })

  return (
    <Button
      variant='default'
      leftSection={<IconWand size={18} />}
      loading={isPending}
      onClick={start}
      {...props}
    >
      {label}
    </Button>
  )
}

export default GuestLoginButton

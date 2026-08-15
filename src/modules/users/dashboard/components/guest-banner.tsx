"use client"

import { isGuestEmail } from "@/lib/guest"
import { Alert, Button } from "@mantine/core"
import { IconWand } from "@tabler/icons-react"
import type { FC } from "react"
import { useLogout } from "../../auth/mutations/use-logout"
import { useUserSession } from "../../auth/queries/use-user-session"

/**
 * Shown only while signed in as the shared demo attendee, so a visitor knows
 * the data is not theirs.
 */
const GuestBanner: FC = () => {
  const { user } = useUserSession()
  const logout = useLogout()

  if (!isGuestEmail(user?.email)) return null

  return (
    <Alert
      color='indigo'
      variant='light'
      icon={<IconWand size={18} />}
      title='You are browsing as a guest'
    >
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <span className='text-sm'>
          This is a shared demo account filled with sample events and
          certificates. Anything you change here is visible to other visitors.
        </span>
        <Button
          size='xs'
          variant='white'
          loading={logout.isPending}
          onClick={() => logout.mutate()}
        >
          Leave guest mode
        </Button>
      </div>
    </Alert>
  )
}

export default GuestBanner

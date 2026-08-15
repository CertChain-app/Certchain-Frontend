"use client"

import { isGuestEmail } from "@/lib/guest"
import { useOrganizerLogout } from "@/modules/organizer/auth/mutations/use-organizer-logout"
import { Alert, Button } from "@mantine/core"
import { IconWand } from "@tabler/icons-react"
import type { FC } from "react"
import { useSession } from "../../auth/queries/use-session"

/**
 * Shown only while signed in as the demo organizer, so a visitor knows the
 * workspace is a shared sandbox.
 */
const OrganizerGuestBanner: FC = () => {
  const { user } = useSession()
  const logout = useOrganizerLogout()

  if (!isGuestEmail(user?.email)) return null

  return (
    <Alert
      color='indigo'
      variant='light'
      icon={<IconWand size={18} />}
      title='You are browsing the demo workspace'
      mb='md'
    >
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <span className='text-sm'>
          Every event, attendee, and certificate here is sample data. Create,
          edit, and issue freely — other visitors share this workspace.
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

export default OrganizerGuestBanner

import { IUserEvent } from "@/modules/types"
import { ActionIcon, Tooltip } from "@mantine/core"
import { EyeIcon } from "lucide-react"
import { type FC } from "react"

import Link from "next/link"

interface EventTableActionsProps {
  event: IUserEvent
}

const EventTableActions: FC<EventTableActionsProps> = ({ event }) => {
  return (
    <div className='flex items-center gap-2'>
      <Tooltip label='View Event'>
        <ActionIcon
          component={Link}
          href={`/dashboard/events/${event.id}`}
          variant='gradient'
        >
          <EyeIcon className='w-4 h-4' />
        </ActionIcon>
      </Tooltip>
    </div>
  )
}

export default EventTableActions

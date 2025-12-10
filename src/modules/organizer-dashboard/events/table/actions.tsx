import { IEvent } from "@/modules/types"
import { ActionIcon, Text, Tooltip } from "@mantine/core"
import { modals } from "@mantine/modals"
import { EyeIcon, PenIcon, TrashIcon } from "lucide-react"
import { type FC } from "react"

import Link from "next/link"
import { useLink } from "../../common/utils/link"
import { useDeleteEvent } from "../mutations/use-delete-event"

interface EventTableActionsProps {
  event: IEvent
}

const EventTableActions: FC<EventTableActionsProps> = ({ event }) => {
  const deleteMutation = useDeleteEvent()
  const { getLink } = useLink()

  return (
    <div className='flex items-center gap-2'>
      <Tooltip label='View Event'>
        <ActionIcon
          component={Link}
          href={getLink(`dashboard/events/${event.id}`)}
          variant='gradient'
        >
          <EyeIcon className='w-4 h-4' />
        </ActionIcon>
      </Tooltip>
      <Tooltip label='Edit Event'>
        <ActionIcon
          component={Link}
          href={getLink(`dashboard/events/${event.id}/edit`)}
          variant='outline'
        >
          <PenIcon className='w-4 h-4' />
        </ActionIcon>
      </Tooltip>
      <Tooltip label='Delete Event'>
        <ActionIcon
          loading={deleteMutation.isPending}
          variant='filled'
          color='red'
          onClick={() => {
            modals.openConfirmModal({
              title: "Delete Event",
              children: (
                <Text>Are you sure you want to delete this event?</Text>
              ),
              labels: { confirm: "Delete", cancel: "Cancel" },
              confirmProps: { color: "red" },
              onConfirm: () => {
                deleteMutation.mutate(event.id)
              },
            })
          }}
        >
          <TrashIcon className='w-4 h-4' />
        </ActionIcon>
      </Tooltip>
    </div>
  )
}

export default EventTableActions

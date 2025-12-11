import { IUserEvent } from "@/modules/types"
import { ActionIcon, Tooltip } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { modals } from "@mantine/modals"
import { BanIcon } from "lucide-react"
import { type FC } from "react"
import BanUserModal from "../models/ban-user-modal"
import { useUnbanUser } from "../mutations/use-unban-user"

interface JoineeTableActionsProps {
  joinee: IUserEvent
}

const JoineeTableActions: FC<JoineeTableActionsProps> = ({ joinee }) => {
  const [isOpen, { open, close }] = useDisclosure()
  const unbanUserMutation = useUnbanUser()
  return (
    <div className='flex items-center gap-2'>
      {!joinee.ban ? (
        <Tooltip label='Ban User'>
          <ActionIcon variant='outline' color='red' onClick={open}>
            <BanIcon className='w-4 h-4' />
          </ActionIcon>
        </Tooltip>
      ) : (
        <Tooltip label='Unban User'>
          <ActionIcon
            variant='outline'
            color='green'
            loading={unbanUserMutation.isPending}
            onClick={() =>
              modals.openConfirmModal({
                title: "Unban User",
                children: <p>Are you sure you want to unban this user?</p>,
                labels: { confirm: "Unban", cancel: "Cancel" },
                onConfirm: () => unbanUserMutation.mutate({ id: joinee.id }),
              })
            }
          >
            <BanIcon className='w-4 h-4 rotate-180' />
          </ActionIcon>
        </Tooltip>
      )}

      <BanUserModal userEvent={joinee} isOpen={isOpen} onClose={close} />
    </div>
  )
}

export default JoineeTableActions

import { IUserEvent } from "@/modules/types"
import { Modal } from "@mantine/core"
import BanUserFromEventForm from "../ban-forms/form"

interface BanUserModalProps {
  userEvent: IUserEvent
  isOpen: boolean
  onClose: () => void
}

export default function BanUserModal({
  userEvent,
  isOpen,
  onClose,
}: BanUserModalProps) {
  return (
    <Modal title='Ban User' opened={isOpen} onClose={onClose}>
      <BanUserFromEventForm onSuccess={onClose} userEvent={userEvent} />
    </Modal>
  )
}

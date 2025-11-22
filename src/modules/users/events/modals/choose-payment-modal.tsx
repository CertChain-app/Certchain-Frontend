import { Button, Modal, Stack } from "@mantine/core"
import { useJoinEvent } from "../mutations/use-join-event"

interface ChoosePaymentModalProps {
  opened: boolean
  onClose: () => void
  eventId: string
}

export function ChoosePaymentModal({
  opened,
  onClose,
  eventId,
}: ChoosePaymentModalProps) {
  const joinEvent = useJoinEvent()
  const handleKhaltiPayment = () => {
    joinEvent.mutate({ eventId, paymentMethod: "khalti" })
    onClose()
  }

  return (
    <Modal opened={opened} onClose={onClose} title='Choose Payment Method'>
      <Stack>
        <Button
          fullWidth
          size='lg'
          onClick={handleKhaltiPayment}
          loading={joinEvent.isPending}
        >
          Pay with Khalti
        </Button>
      </Stack>
    </Modal>
  )
}

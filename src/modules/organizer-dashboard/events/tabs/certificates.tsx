import { IEvent } from "@/modules/types"
import { Alert, Button } from "@mantine/core"
import { modals } from "@mantine/modals"
import { IconInfoCircle } from "@tabler/icons-react"
import OrganizerEventCertificatesTable from "../certificates-table/table"
import { useAssignCertificatesToAll } from "../mutations/use-assign-certificate-to-all"

interface CertificatesTabProps {
  event: IEvent
}

export default function CertificatesTab({ event }: CertificatesTabProps) {
  const assignCertificatesToAll = useAssignCertificatesToAll()
  return (
    <div>
      {!event.completedAt && (
        <Alert
          color='yellow'
          title='Event Not Completed'
          icon={<IconInfoCircle size={16} />}
        >
          This event needs to be marked as completed before you can generate
          certificates. Please mark the event as completed first.
        </Alert>
      )}

      {event.completedAt && (
        <div className='mb-4'>
          <Button
            variant='filled'
            color='blue'
            loading={assignCertificatesToAll.isPending}
            onClick={() => {
              modals.openConfirmModal({
                title: "Assign Certificates to All Participants",
                children: (
                  <p>
                    Are you sure you want to assign certificates to all
                    participants?
                  </p>
                ),
                labels: { confirm: "Assign", cancel: "Cancel" },
                onConfirm: () => assignCertificatesToAll.mutate(event.id),
              })
            }}
          >
            Assign Certificates to All Participants
          </Button>
        </div>
      )}

      <OrganizerEventCertificatesTable eventId={event.id} />
    </div>
  )
}

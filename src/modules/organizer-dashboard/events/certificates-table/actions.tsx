import { ICertificate } from "@/modules/types"
import { ActionIcon, Tooltip } from "@mantine/core"
import { modals } from "@mantine/modals"
import { Trash2Icon } from "lucide-react"
import { type FC } from "react"
import { useRemoveCertificate } from "../mutations/use-remove-certificate"

interface CertificateTableActionsProps {
  certificate: ICertificate
}

const CertificateTableActions: FC<CertificateTableActionsProps> = ({
  certificate,
}) => {
  const removeCertificateMutation = useRemoveCertificate()

  return (
    <div className='flex items-center gap-2'>
      <Tooltip label='Remove Certificate'>
        <ActionIcon
          variant='outline'
          color='red'
          loading={removeCertificateMutation.isPending}
          onClick={() =>
            modals.openConfirmModal({
              title: "Remove Certificate",
              children: (
                <p>Are you sure you want to remove this certificate?</p>
              ),
              labels: { confirm: "Remove", cancel: "Cancel" },
              onConfirm: () => removeCertificateMutation.mutate(certificate.id),
            })
          }
        >
          <Trash2Icon className='w-4 h-4' />
        </ActionIcon>
      </Tooltip>
    </div>
  )
}

export default CertificateTableActions

import { IApiError } from "@/api/types"
import { populateError } from "@/modules/core/lib/form"
import { IUserEvent } from "@/modules/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@mantine/core"
import { useForm } from "react-hook-form"
import { Textarea } from "react-hook-form-mantine"
import { toast } from "react-toastify"
import { useBanUser } from "../mutations/use-ban-user"
import { BanUserFromEventSchema, banUserFromEventSchema } from "./schema"

interface BanUserFromEventFormProps {
  userEvent: IUserEvent
  onSuccess: () => void
}

export default function BanUserFromEventForm({
  userEvent,
  onSuccess,
}: BanUserFromEventFormProps) {
  const form = useForm<BanUserFromEventSchema>({
    resolver: zodResolver(banUserFromEventSchema),
  })

  const banUserMutation = useBanUser()

  const onSubmit = (data: BanUserFromEventSchema) => {
    banUserMutation.mutate(
      { id: userEvent.id, data },
      {
        onSuccess: () => {
          toast.success("User banned successfully")
          onSuccess()
        },
        onError: (res) => {
          populateError(form, res as IApiError)
        },
      }
    )
  }

  return (
    <form
      className='flex flex-col gap-2'
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Textarea
        placeholder='Reason for banning'
        control={form.control}
        name='reason'
        label='Reason'
      />
      <Button loading={banUserMutation.isPending} type='submit'>
        Ban
      </Button>
    </form>
  )
}

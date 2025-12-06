import { IApiError } from "@/api/types"
import { populateError } from "@/modules/core/lib/form"
import { useOrganizerDashboardContext } from "@/modules/organizer-dashboard/common/context/organizer-dashboard-context"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Group } from "@mantine/core"
import Link from "next/link"
import type { FC } from "react"
import { useForm } from "react-hook-form"
import { TextInput } from "react-hook-form-mantine"
import { toast } from "react-toastify"
import { useOrganizerForgotPassword } from "../../mutations/use-organizer-forgot-password"
import {
  organizerForgotPasswordSchema,
  OrganizerForgotPasswordSchema,
} from "./schema"

interface OrganizerForgotPasswordFormProps {
  onSuccess?: () => void
}

const OrganizerForgotPasswordForm: FC<OrganizerForgotPasswordFormProps> = ({
  onSuccess,
}) => {
  const { organizer } = useOrganizerDashboardContext()
  const form = useForm<OrganizerForgotPasswordSchema>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(organizerForgotPasswordSchema),
  })

  const organizerForgotPasswordMutation = useOrganizerForgotPassword()

  const onSubmit = (data: OrganizerForgotPasswordSchema) => {
    organizerForgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        toast.success("The password reset link has been sent to your email")
        onSuccess?.()
      },
      onError: (err) => {
        populateError(form, err as IApiError)
      },
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className='grid gap-3 max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg'>
        <TextInput
          name='email'
          label='Your Email'
          placeholder='john@example.com'
          control={form.control}
        />

        <Group justify='space-between'>
          <Button
            component={Link}
            href={`/organizers/${organizer?.id}/auth/login`}
            variant='subtle'
          >
            Back to login
          </Button>
          <Button
            loading={organizerForgotPasswordMutation.isPending}
            type='submit'
          >
            Reset Password
          </Button>
        </Group>
      </div>
    </form>
  )
}

export default OrganizerForgotPasswordForm

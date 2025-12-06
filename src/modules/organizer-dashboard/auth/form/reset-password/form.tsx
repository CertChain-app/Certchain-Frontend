import { IApiError } from "@/api/types"
import { populateError } from "@/modules/core/lib/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Stack } from "@mantine/core"
import { useParams, useRouter } from "next/navigation"
import type { FC } from "react"
import { useForm } from "react-hook-form"
import { PasswordInput, TextInput } from "react-hook-form-mantine"
import { toast } from "react-toastify"
import { useOrganizerResetPassword } from "../../mutations/use-organizer-reset-password"
import {
  organizerResetPasswordSchema,
  OrganizerResetPasswordSchema,
} from "./schema"

interface OrganizerResetPasswordFormProps {
  token: string
  email: string
  onSuccess?: () => void
}

const OrganizerResetPasswordForm: FC<OrganizerResetPasswordFormProps> = ({
  token,
  email,
  onSuccess,
}) => {
  const router = useRouter()
  const { id } = useParams()
  const form = useForm<OrganizerResetPasswordSchema>({
    defaultValues: {
      token,
      email,
      password: "",
      passwordConfirmation: "",
    },
    resolver: zodResolver(organizerResetPasswordSchema),
  })

  const organizerResetPasswordMutation = useOrganizerResetPassword()

  const onSubmit = (data: OrganizerResetPasswordSchema) => {
    organizerResetPasswordMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Password reset successfully")
        router.push(`/organizers/${id}/auth/login`)
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
        <Stack gap={5}>
          <TextInput
            name='email'
            label='Email'
            placeholder='Enter your email'
            control={form.control}
            disabled
          />
          <PasswordInput
            name='password'
            label='New Password'
            placeholder='Enter your new password'
            control={form.control}
          />

          <PasswordInput
            name='passwordConfirmation'
            label='Confirm New Password'
            placeholder='Confirm your new password'
            control={form.control}
          />
        </Stack>

        <Button
          loading={organizerResetPasswordMutation.isPending}
          type='submit'
        >
          Reset Password
        </Button>
      </div>
    </form>
  )
}

export default OrganizerResetPasswordForm

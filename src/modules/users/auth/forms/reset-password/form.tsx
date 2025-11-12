"use client"
import { IApiError } from "@/api/types"
import { populateError } from "@/modules/core/lib/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Stack } from "@mantine/core"
import { useRouter } from "next/navigation"
import type { FC } from "react"
import { useForm } from "react-hook-form"
import { PasswordInput, TextInput } from "react-hook-form-mantine"
import { toast } from "react-toastify"
import { useResetPassword } from "../../mutations/use-reset-password"
import { resetPasswordSchema, type ResetPasswordSchema } from "./schema"

interface ResetPasswordFormProps {
  token: string
  email: string
  onSuccess?: () => void
}

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({
  token,
  email,
  onSuccess,
}) => {
  const router = useRouter()
  const form = useForm<ResetPasswordSchema>({
    defaultValues: {
      token,
      email,
      password: "",
      passwordConfirmation: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  })

  const resetPasswordMutation = useResetPassword()

  const onSubmit = (data: ResetPasswordSchema) => {
    resetPasswordMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Password reset successfully")
        router.push("/auth/login")
        onSuccess?.()
      },
      onError: (error) => {
        populateError(form, error as IApiError)
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

        <Button loading={resetPasswordMutation.isPending} type='submit'>
          Reset Password
        </Button>
      </div>
    </form>
  )
}

export default ResetPasswordForm

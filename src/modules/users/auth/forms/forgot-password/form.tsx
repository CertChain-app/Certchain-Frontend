"use client"

import { IApiError } from "@/api/types"
import { populateError } from "@/modules/core/lib/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Stack } from "@mantine/core"
import { IconArrowRight } from "@tabler/icons-react"
import router from "next/router"
import { useForm } from "react-hook-form"
import { TextInput } from "react-hook-form-mantine"
import { toast } from "react-toastify"
import { useForgotPassword } from "../../mutations/use-forgot-password"
import { forgotPasswordSchema, type ForgotPasswordSchema } from "./schema"

export default function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const forgotPasswordMutation = useForgotPassword()

  const handleSubmit = (values: ForgotPasswordSchema) => {
    forgotPasswordMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Password reset instructions sent to your email")
        router.push("/auth/login")
      },
      onError: (error) => {
        populateError(form, error as IApiError)
      },
    })
  }

  return (
    <Box className='mb-6'>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Stack gap='lg'>
          <TextInput
            name='email'
            control={form.control}
            label='Email'
            placeholder='Enter your email'
            withAsterisk
          />

          <Button
            fullWidth
            loading={forgotPasswordMutation.isPending}
            rightSection={<IconArrowRight size={18} />}
            className='font-medium'
            type='submit'
          >
            Reset Password
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

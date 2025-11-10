"use client"

import { IApiError } from "@/api/types"
import { populateError } from "@/modules/core/lib/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Group, Stack, Text } from "@mantine/core"
import { IconArrowRight } from "@tabler/icons-react"
import Link from "next/link"
import router from "next/router"
import { useForm } from "react-hook-form"
import { PasswordInput, TextInput } from "react-hook-form-mantine"
import { toast } from "react-toastify"
import { useLogin } from "../../mutations/use-login"
import { loginSchema, type LoginSchema } from "./schema"

export default function LoginForm() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const loginMutation = useLogin()

  const handleSubmit = (values: LoginSchema) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Successfully logged in")
        router.push("/dashboard")
      },
      onError: (error) => {
        const e = error as IApiError

        populateError(form, e)
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

          <div>
            <Group justify='space-between' mb={3}>
              <Text component='label' size='sm' fw={500}>
                Password
                <span className='text-red-500'>*</span>
              </Text>
              <Link
                href='/auth/forgot-password'
                className='text-sm text-blue-500 hover:underline'
              >
                Forgot password?
              </Link>
            </Group>
            <PasswordInput
              name='password'
              control={form.control}
              placeholder='Enter your password'
            />
          </div>

          <Button
            fullWidth
            loading={loginMutation.isPending}
            rightSection={<IconArrowRight size={18} />}
            className='font-medium'
            type='submit'
          >
            Sign In
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

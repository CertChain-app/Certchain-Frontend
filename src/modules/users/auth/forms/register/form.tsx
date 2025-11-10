"use client"

import { IApiError } from "@/api/types"
import { PhoneNumberInput } from "@/modules/core/components/phone-number-input/phone-number-input"
import { populateError } from "@/modules/core/lib/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Group, Stack } from "@mantine/core"
import { IconArrowRight } from "@tabler/icons-react"
import router from "next/router"
import { useForm } from "react-hook-form"
import { PasswordInput, TextInput } from "react-hook-form-mantine"
import { toast } from "react-toastify"
import { useRegister } from "../../mutations/use-register"
import { registerSchema, type RegisterSchema } from "./schema"

export default function RegisterForm() {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
  })

  const registerMutation = useRegister()

  const handleSubmit = (values: RegisterSchema) => {
    registerMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Please check your email for verification")
        router.push("/dashboard")
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
          <Group grow>
            <TextInput
              name='firstName'
              control={form.control}
              label='First Name'
              placeholder='Enter your first name'
              withAsterisk
            />

            <TextInput
              name='lastName'
              control={form.control}
              label='Last Name'
              placeholder='Enter your last name'
              withAsterisk
            />
          </Group>

          <TextInput
            name='email'
            control={form.control}
            label='Email'
            placeholder='Enter your email'
            withAsterisk
          />

          <Group grow>
            <PasswordInput
              name='password'
              control={form.control}
              label='Password'
              placeholder='Create a password'
              withAsterisk
            />

            <PasswordInput
              name='confirmPassword'
              control={form.control}
              label='Confirm Password'
              placeholder='Confirm your password'
              withAsterisk
            />
          </Group>

          <PhoneNumberInput
            name='phone'
            control={form.control}
            label='Phone Number (Optional)'
            placeholder='Enter your phone number'
          />

          <Button
            fullWidth
            loading={registerMutation.isPending}
            rightSection={<IconArrowRight size={18} />}
            className=' font-medium'
            type='submit'
          >
            Create Account
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

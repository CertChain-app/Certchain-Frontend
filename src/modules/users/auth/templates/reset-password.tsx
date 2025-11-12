"use client"

import { Button, Container, Paper, Stack, Text, Title } from "@mantine/core"
import { jwtDecode } from "jwt-decode"
import Link from "next/link"
import ResetPasswordForm from "../forms/reset-password/form"

export default function ResetPasswordTemplate({ token }: { token: string }) {
  const { email } = jwtDecode(token ?? "") as { email: string }
  if (!email) {
    return <div>Invalid token</div>
  }
  return (
    <Container size='sm' py={40}>
      <Paper radius='md' p='xl' withBorder className='bg-white'>
        <Title order={2} className='text-center mb-6'>
          Reset Password
        </Title>

        <Text c='dimmed' size='sm' className='text-center mb-8'>
          Enter your new password below to reset your account password
        </Text>

        <ResetPasswordForm token={token} email={email} />

        <Stack gap='sm' align='center' mt='lg'>
          <Text size='sm' c='dimmed'>
            Remember your password?
          </Text>
          <Link href='/auth/login' className='w-full'>
            <Button variant='light' fullWidth>
              Back to login
            </Button>
          </Link>
        </Stack>

        <Text size='xs' c='dimmed' ta='center' mt='xl'>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </Paper>
    </Container>
  )
}

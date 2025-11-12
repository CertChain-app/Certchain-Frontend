"use client"

import { Button, Container, Paper, Stack, Text, Title } from "@mantine/core"
import Link from "next/link"
import ForgotPasswordForm from "../forms/forgot-password/form"

export default function ForgotPasswordTemplate() {
  return (
    <Container size='sm' py={40}>
      <Paper radius='md' p='xl' withBorder className='bg-white'>
        <Title order={2} className='text-center mb-6'>
          Forgot Password
        </Title>

        <Text c='dimmed' size='sm' className='text-center mb-8'>
          Enter your email address and we&apos;ll send you instructions to reset
          your password
        </Text>

        <ForgotPasswordForm />

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

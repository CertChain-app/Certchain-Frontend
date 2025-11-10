"use client"

import {
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import Link from "next/link"
import LoginForm from "../forms/login/form"

export default function LoginTemplate() {
  return (
    <Container size='sm' py={40}>
      <Paper radius='md' p='xl' withBorder className='bg-white'>
        <Title order={2} className='text-center mb-6'>
          Welcome back
        </Title>

        <Text c='dimmed' size='sm' className='text-center mb-8'>
          Sign in to your account to continue exploring amazing events
        </Text>

        <LoginForm />

        <Divider label='or' labelPosition='center' my='lg' />

        <Stack gap='sm' align='center'>
          <Text size='sm' c='dimmed'>
            Don&apos;t have an account?
          </Text>
          <Link href='/auth/register' className='w-full'>
            <Button variant='light' fullWidth>
              Create an account
            </Button>
          </Link>
        </Stack>

        <Text size='xs' c='dimmed' ta='center' mt='xl'>
          By signing in, you agree to our Terms of Service and Privacy Policy
        </Text>
      </Paper>
    </Container>
  )
}

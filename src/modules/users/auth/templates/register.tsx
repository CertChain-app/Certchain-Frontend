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
import RegisterForm from "../forms/register/form"

export default function RegisterTemplate() {
  return (
    <Container size='sm' py={40}>
      <Paper radius='md' p='xl' withBorder className='bg-white'>
        <Title order={2} className='text-center mb-6'>
          Create your account
        </Title>

        <Text c='dimmed' size='sm' className='text-center mb-8'>
          Join thousands of event organizers and attendees. Start exploring
          amazing events today!
        </Text>

        <RegisterForm />

        <Divider label='or' labelPosition='center' my='lg' />

        <Stack gap='sm' align='center'>
          <Text size='sm' c='dimmed'>
            Already have an account?
          </Text>
          <Link href='/login' className='w-full'>
            <Button variant='light' fullWidth>
              Sign in to your account
            </Button>
          </Link>
        </Stack>

        <Text size='xs' c='dimmed' ta='center' mt='xl'>
          By creating an account, you agree to our Terms of Service and Privacy
          Policy
        </Text>
      </Paper>
    </Container>
  )
}

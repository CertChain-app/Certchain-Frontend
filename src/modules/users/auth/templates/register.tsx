"use client"

import AccountTypeSwitch, {
  type AccountType,
} from "@/modules/core/components/account-type-switch"
import OrganizerGuestLoginButton from "@/modules/organizer/auth/components/guest-login-button"
import OrganizerRegisterForm from "@/modules/organizer/auth/form/form"
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
import { useState } from "react"
import GuestLoginButton from "../components/guest-login-button"
import RegisterForm from "../forms/register/form"

interface RegisterTemplateProps {
  defaultType?: AccountType
}

export default function RegisterTemplate({
  defaultType = "attendee",
}: RegisterTemplateProps) {
  const [accountType, setAccountType] = useState<AccountType>(defaultType)
  const isOrganizer = accountType === "organizer"

  return (
    <Container size={isOrganizer ? "md" : "sm"} py={40}>
      <Paper radius='md' p='xl' withBorder className='bg-white'>
        <Title order={2} className='text-center mb-6'>
          {isOrganizer ? "Create your organization" : "Create your account"}
        </Title>

        <div className='mb-6'>
          <AccountTypeSwitch value={accountType} onChange={setAccountType} />
        </div>

        <Text c='dimmed' size='sm' className='text-center mb-8'>
          {isOrganizer
            ? "Run events, manage attendees, and issue verifiable certificates."
            : "Join thousands of event organizers and attendees. Start exploring amazing events today!"}
        </Text>

        {isOrganizer ? <OrganizerRegisterForm /> : <RegisterForm />}

        <Divider label='or' labelPosition='center' my='lg' />

        <Stack gap='sm' align='center'>
          <Text size='sm' c='dimmed'>
            Already have an account?
          </Text>
          <Link
            href={isOrganizer ? "/auth/login?as=organizer" : "/auth/login"}
            className='w-full'
          >
            <Button variant='light' fullWidth>
              Sign in to your account
            </Button>
          </Link>

          {isOrganizer ? (
            <OrganizerGuestLoginButton
              fullWidth
              mt='xs'
              label='Skip signup, open the demo workspace'
            />
          ) : (
            <GuestLoginButton
              fullWidth
              mt='xs'
              label='Skip signup, explore as guest'
            />
          )}

          <Text size='xs' c='dimmed' ta='center'>
            Guest mode signs you into a shared demo account with sample events
            and certificates.
          </Text>
        </Stack>

        <Text size='xs' c='dimmed' ta='center' mt='xl'>
          By creating an account, you agree to our Terms of Service and Privacy
          Policy
        </Text>
      </Paper>
    </Container>
  )
}

"use client"

import AccountTypeSwitch, {
  type AccountType,
} from "@/modules/core/components/account-type-switch"
import OrganizerGuestLoginButton from "@/modules/organizer/auth/components/guest-login-button"
import OrganizationLoginForm from "@/modules/organizer/auth/organization-login-form/form"
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
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import GuestLoginButton from "../components/guest-login-button"
import LoginForm from "../forms/login/form"
import { useUserSession } from "../queries/use-user-session"

interface LoginTemplateProps {
  defaultType?: AccountType
}

export default function LoginTemplate({
  defaultType = "attendee",
}: LoginTemplateProps) {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useUserSession()
  const [accountType, setAccountType] = useState<AccountType>(defaultType)

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || isAuthenticated) {
    return (
      <Container size='sm' py={40}>
        <Paper radius='md' p='xl' withBorder className='bg-white'>
          <Text c='dimmed' size='sm' className='text-center'>
            Loading...
          </Text>
        </Paper>
      </Container>
    )
  }

  const isOrganizer = accountType === "organizer"

  return (
    <Container size='sm' py={40}>
      <Paper radius='md' p='xl' withBorder className='bg-white'>
        <Title order={2} className='text-center mb-6'>
          Welcome back
        </Title>

        <div className='mb-6'>
          <AccountTypeSwitch value={accountType} onChange={setAccountType} />
        </div>

        <Text c='dimmed' size='sm' className='text-center mb-8'>
          {isOrganizer
            ? "Enter your organization's CertChain address to continue"
            : "Sign in to your account to continue exploring amazing events"}
        </Text>

        {isOrganizer ? (
          <div className='mb-6'>
            <OrganizationLoginForm />
          </div>
        ) : (
          <LoginForm />
        )}

        <Divider label='or' labelPosition='center' my='lg' />

        <Stack gap='sm' align='center'>
          <Text size='sm' c='dimmed'>
            Don&apos;t have an account?
          </Text>
          <Link
            href={isOrganizer ? "/auth/register?as=organizer" : "/auth/register"}
            className='w-full'
          >
            <Button variant='light' fullWidth>
              {isOrganizer ? "Create an organization" : "Create an account"}
            </Button>
          </Link>

          {isOrganizer ? (
            <OrganizerGuestLoginButton fullWidth mt='xs' />
          ) : (
            <GuestLoginButton fullWidth mt='xs' />
          )}

          <Text size='xs' c='dimmed' ta='center'>
            Guest mode signs you into a shared demo account with sample events
            and certificates. No email needed.
          </Text>
        </Stack>

        <Text size='xs' c='dimmed' ta='center' mt='xl'>
          By signing in, you agree to our Terms of Service and Privacy Policy
        </Text>
      </Paper>
    </Container>
  )
}

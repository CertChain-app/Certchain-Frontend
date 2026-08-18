"use client"

import AccountTypeSwitch, {
  type AccountType,
} from "@/modules/core/components/account-type-switch"
import OrganizerGuestLoginButton from "@/modules/organizer/auth/components/guest-login-button"
import OrganizationLoginForm from "@/modules/organizer/auth/organization-login-form/form"
import { ButtonLink } from "@/modules/users/common/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AuthDivider } from "../components/auth-divider"
import { AuthShell } from "../components/auth-shell"
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
      <AuthShell
        eyebrow='// sign in'
        title='Welcome back'
        description='Checking your session…'
      >
        <div className='space-y-3'>
          <div className='h-10 animate-pulse rounded-lg bg-muted' />
          <div className='h-10 animate-pulse rounded-lg bg-muted' />
          <div className='h-9 animate-pulse rounded-lg bg-muted' />
        </div>
      </AuthShell>
    )
  }

  const isOrganizer = accountType === "organizer"

  return (
    <AuthShell
      eyebrow='// sign in'
      title='Welcome back'
      description={
        isOrganizer
          ? "Enter your organization's CertChain address to continue."
          : "Sign in to pick up your tickets, events, and certificates."
      }
      footer='By signing in, you agree to our Terms of Service and Privacy Policy.'
    >
      <div className='mb-6'>
        <AccountTypeSwitch value={accountType} onChange={setAccountType} />
      </div>

      {isOrganizer ? <OrganizationLoginForm /> : <LoginForm />}

      <AuthDivider />

      <div className='space-y-3'>
        <p className='text-center text-sm text-muted-foreground'>
          Don&apos;t have an account?
        </p>

        <ButtonLink
          href={isOrganizer ? "/auth/register?as=organizer" : "/auth/register"}
          variant='outline'
          size='lg'
          className='w-full'
        >
          {isOrganizer ? "Create an organization" : "Create an account"}
        </ButtonLink>

        {isOrganizer ? (
          <OrganizerGuestLoginButton fullWidth />
        ) : (
          <GuestLoginButton fullWidth />
        )}

        <p className='text-center text-xs text-muted-foreground'>
          Guest mode signs you into a shared demo account with sample events and
          certificates. No email needed.
        </p>
      </div>
    </AuthShell>
  )
}

"use client"

import AccountTypeSwitch, {
  type AccountType,
} from "@/modules/core/components/account-type-switch"
import OrganizerGuestLoginButton from "@/modules/organizer/auth/components/guest-login-button"
import OrganizerRegisterForm from "@/modules/organizer/auth/form/form"
import { ButtonLink } from "@/modules/users/common/components/ui/button"
import { useState } from "react"
import { AuthDivider } from "../components/auth-divider"
import { AuthShell } from "../components/auth-shell"
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
    <AuthShell
      wide={isOrganizer}
      eyebrow='// join'
      title={isOrganizer ? "Create your organization" : "Create your account"}
      description={
        isOrganizer
          ? "Run events, manage attendees, and issue verifiable certificates."
          : "Collect tickets and tamper-proof certificates from every event you attend."
      }
      footer='By creating an account, you agree to our Terms of Service and Privacy Policy.'
    >
      <div className='mb-6'>
        <AccountTypeSwitch value={accountType} onChange={setAccountType} />
      </div>

      {isOrganizer ? <OrganizerRegisterForm /> : <RegisterForm />}

      <AuthDivider />

      <div className='space-y-3'>
        <p className='text-center text-sm text-muted-foreground'>
          Already have an account?
        </p>

        <ButtonLink
          href={isOrganizer ? "/auth/login?as=organizer" : "/auth/login"}
          variant='outline'
          size='lg'
          className='w-full'
        >
          Sign in to your account
        </ButtonLink>

        {isOrganizer ? (
          <OrganizerGuestLoginButton
            fullWidth
            label='Skip signup, open the demo workspace'
          />
        ) : (
          <GuestLoginButton fullWidth label='Skip signup, explore as guest' />
        )}

        <p className='text-center text-xs text-muted-foreground'>
          Guest mode signs you into a shared demo account with sample events and
          certificates.
        </p>
      </div>
    </AuthShell>
  )
}

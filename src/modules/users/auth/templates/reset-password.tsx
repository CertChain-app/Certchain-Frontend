"use client"

import { ButtonLink } from "@/modules/users/common/components/ui/button"
import { jwtDecode } from "jwt-decode"
import { AuthDivider } from "../components/auth-divider"
import { AuthShell } from "../components/auth-shell"
import ResetPasswordForm from "../forms/reset-password/form"

export default function ResetPasswordTemplate({ token }: { token: string }) {
  const { email } = (jwtDecode(token ?? "") ?? {}) as { email?: string }

  if (!email) {
    return (
      <AuthShell
        eyebrow='// recover'
        title='This link has expired'
        description='The reset link is invalid or no longer valid. Request a fresh one and try again.'
      >
        <ButtonLink href='/auth/forgot-password' size='lg' className='w-full'>
          Request a new link
        </ButtonLink>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      eyebrow='// recover'
      title='Set a new password'
      description={`Choose a new password for ${email}.`}
      footer='By continuing, you agree to our Terms of Service and Privacy Policy.'
    >
      <ResetPasswordForm token={token} email={email} />

      <AuthDivider />

      <div className='space-y-3'>
        <p className='text-center text-sm text-muted-foreground'>
          Remember your password?
        </p>
        <ButtonLink
          href='/auth/login'
          variant='outline'
          size='lg'
          className='w-full'
        >
          Back to sign in
        </ButtonLink>
      </div>
    </AuthShell>
  )
}

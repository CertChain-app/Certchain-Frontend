"use client"

import { ButtonLink } from "@/modules/users/common/components/ui/button"
import { AuthDivider } from "../components/auth-divider"
import { AuthShell } from "../components/auth-shell"
import ForgotPasswordForm from "../forms/forgot-password/form"

export default function ForgotPasswordTemplate() {
  return (
    <AuthShell
      eyebrow='// recover'
      title='Forgot your password?'
      description="Enter your email address and we'll send you instructions to reset it."
      footer='By continuing, you agree to our Terms of Service and Privacy Policy.'
    >
      <ForgotPasswordForm />

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

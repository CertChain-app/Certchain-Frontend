"use client"

import { Box, Stack, Text } from "@mantine/core"
import { jwtDecode } from "jwt-decode"
import type { FC } from "react"
import OrganizerResetPasswordForm from "../form/reset-password/form"

interface OrganizerResetPasswordTemplateProps {
  token?: string
}

const OrganizerResetPasswordTemplate: FC<
  OrganizerResetPasswordTemplateProps
> = ({ token }) => {
  const { email } = jwtDecode(token ?? "") as { email: string }
  if (!email) {
    return <div>Invalid token</div>
  }
  return (
    <Box maw={400} mx='auto' mt={40} className='space-y-5 mb-10'>
      <Stack gap={5} align='center'>
        <Text size='xl' fw={500}>
          Reset Password
        </Text>
        <Text size='sm' c='dimmed' ta='center'>
          Enter your new password below
        </Text>
      </Stack>

      <OrganizerResetPasswordForm token={token ?? ""} email={email} />
    </Box>
  )
}

export default OrganizerResetPasswordTemplate

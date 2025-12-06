"use client"

import { Box, Stack, Text } from "@mantine/core"
import type { FC } from "react"
import { useOrganizerDashboardContext } from "../../common/context/organizer-dashboard-context"
import OrganizerForgotPasswordForm from "../form/forgot-password/form"

const OrganizerForgotPasswordTemplate: FC = () => {
  const { organizer } = useOrganizerDashboardContext()

  return (
    <Box maw={400} mx='auto' mt={40} className='space-y-5 mb-10'>
      <Stack gap={5} align='center'>
        <Text size='lg' fw={700} className='text-primary text-center'>
          {organizer?.name}
        </Text>
        <Text size='xl' fw={500}>
          Forgot Password?
        </Text>
        <Text size='sm' c='dimmed' ta='center'>
          Enter your email address and we&apos;ll send you instructions to reset
          your password
        </Text>
      </Stack>

      <OrganizerForgotPasswordForm />
    </Box>
  )
}

export default OrganizerForgotPasswordTemplate

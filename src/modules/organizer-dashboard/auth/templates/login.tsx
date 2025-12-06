"use client"

import { Avatar, Box, Stack, Text } from "@mantine/core"
import type { FC } from "react"
import { useOrganizerDashboardContext } from "../../common/context/organizer-dashboard-context"
import OrganizerLoginForm from "../form/login/form"

const OrganizerLoginTemplate: FC = () => {
  const { organizer } = useOrganizerDashboardContext()

  return (
    <Box maw={400} mx='auto' mt={40} className='space-y-5 mb-10'>
      <Stack align='center' gap='lg'>
        <Avatar size='xl' radius='xl' color='blue' name={organizer?.name} />

        <Stack gap={5} align='center'>
          <Text size='xl' fw={500} className='text-center'>
            Welcome back, <strong>{organizer?.name ?? "Organizer"}!</strong>
          </Text>
          <Text size='sm' c='dimmed'>
            Continue to login to your account
          </Text>
        </Stack>
      </Stack>

      <OrganizerLoginForm organizerId={organizer?.id ?? ""} />
    </Box>
  )
}

export default OrganizerLoginTemplate

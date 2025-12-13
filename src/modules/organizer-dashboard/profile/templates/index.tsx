"use client"

import { Breadcrumbs, Text, Title } from "@mantine/core"
import { Loader } from "lucide-react"
import type { FC } from "react"
import OrganizerProfileForm from "../form/form"
import { useOrganizerProfile } from "../queries/use-organizer-profile"

const OrganizerProfile: FC = () => {
  const { data, isLoading } = useOrganizerProfile()

  if (isLoading)
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader />
      </div>
    )

  if (!data?.data?.data) return null

  return (
    <div className='p-6'>
      <Breadcrumbs className='mb-6'>
        <Text size='sm'>Dashboard</Text>
        <Text size='sm'>Profile</Text>
      </Breadcrumbs>

      <div className='mb-6'>
        <Title order={1} className='text-2xl font-semibold text-gray-900'>
          Organization Profile
        </Title>
        <Text className='text-gray-500 mt-1'>
          Manage your organization&apos;s profile information
        </Text>
      </div>

      <OrganizerProfileForm organizer={data.data.data} />
    </div>
  )
}

export default OrganizerProfile

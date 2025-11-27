"use client"

import { Anchor, Breadcrumbs, Text, Title } from "@mantine/core"
import Link from "next/link"
import type { FC } from "react"
import UserEventsTable from "../table/table"

const UserEventsTemplate: FC = () => {
  return (
    <div className='p-6'>
      <Breadcrumbs className='mb-6'>
        <Anchor component={Link} href={"/dashboard"} size='sm'>
          Dashboard
        </Anchor>
        <Text size='sm'>My Events</Text>
      </Breadcrumbs>

      <div className='mb-6'>
        <Title order={1} className='text-2xl font-semibold text-gray-900'>
          My Events
        </Title>
        <Text className='text-gray-500 mt-1'>
          View and manage all your registered events
        </Text>
      </div>

      <UserEventsTable />
    </div>
  )
}

export default UserEventsTemplate

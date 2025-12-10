"use client"

import { Anchor, Breadcrumbs, Button, Text, Title } from "@mantine/core"
import Link from "next/link"
import type { FC } from "react"
import { useLink } from "../../common/utils/link"
import OrganizerEventsTable from "../table/table"

const OrganizerEventsTemplate: FC = ({}) => {
  const { getLink } = useLink()
  return (
    <div className='p-6'>
      <Breadcrumbs className='mb-6'>
        <Anchor href={getLink("dashboard")} size='sm'>
          Dashboard
        </Anchor>
        <Text size='sm'>Events</Text>
      </Breadcrumbs>

      <div className='mb-6 flex items-center justify-between'>
        <div>
          <Title order={1} className='text-2xl font-semibold text-gray-900'>
            Events
          </Title>
          <Text className='text-gray-500 mt-1'>
            Manage and organize all your events in one place
          </Text>
        </div>
        <Button
          component={Link}
          href={getLink("dashboard/events/new")}
          variant='filled'
          color='blue'
        >
          + New Event
        </Button>
      </div>

      <OrganizerEventsTable />
    </div>
  )
}

export default OrganizerEventsTemplate

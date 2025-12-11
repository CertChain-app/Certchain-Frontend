"use client"

import { Text, Title } from "@mantine/core"
import { EventForm } from "../forms/form"
import { useEvent } from "../queries/use-event"

interface EditEventTemplateProps {
  eventId: string
}

export default function EditEventTemplate({ eventId }: EditEventTemplateProps) {
  const { data: event } = useEvent(eventId)
  return (
    <div className='p-6'>
      <div className='mb-6'>
        <Title order={1} className='text-2xl font-semibold text-gray-900'>
          Edit Event
        </Title>
        <Text className='text-gray-500 mt-1'>
          Edit the event details for your organization
        </Text>
      </div>

      {event?.data?.data && <EventForm event={event.data.data} />}
    </div>
  )
}

"use client"

import { Text, Title } from "@mantine/core"
import { EventForm } from "../forms/form"

export default function NewEventTemplate() {
  return (
    <div className='p-6'>
      <div className='mb-6'>
        <Title order={1} className='text-2xl font-semibold text-gray-900'>
          Create New Event
        </Title>
        <Text className='text-gray-500 mt-1'>
          Create and configure a new event for your organization
        </Text>
      </div>

      <EventForm />
    </div>
  )
}

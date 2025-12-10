"use client"
import { RichInput } from "@/modules/core/components/rich-input"
import { Card, Text } from "@mantine/core"
import type { FC } from "react"
import { UseFormReturn } from "react-hook-form"
import { EventSchema } from "../schema"

interface EventDescriptionFormSectionProps {
  form: UseFormReturn<EventSchema>
}

const EventDescriptionFormSection: FC<EventDescriptionFormSectionProps> = ({
  form,
}) => {
  return (
    <Card withBorder radius='md' p='md' className='bg-white'>
      <Card.Section p='md' className='border-b border-gray-200'>
        <Text size='sm' fw={500} className='text-gray-700'>
          Event Description
        </Text>
        <Text size='xs' className='text-gray-500 mt-1'>
          Provide a detailed description of your event
        </Text>
      </Card.Section>
      <div className='pt-3'>
        <RichInput
          label='Description'
          placeholder='Event Description'
          control={form.control}
          name='description'
        />
      </div>
    </Card>
  )
}

export default EventDescriptionFormSection

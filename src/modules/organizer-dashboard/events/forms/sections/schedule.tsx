import { Button, Card, Group, Text } from "@mantine/core"
import type { FC } from "react"
import { useFieldArray, UseFormReturn } from "react-hook-form"
import { DateTimePicker, Textarea, TextInput } from "react-hook-form-mantine"
import { EventSchema } from "../schema"

interface ScheduleFormSectionProps {
  form: UseFormReturn<EventSchema>
}

const ScheduleFormSection: FC<ScheduleFormSectionProps> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "schedules",
  })

  return (
    <Card withBorder radius='md' p='md' className='bg-white'>
      <Card.Section p='md' className='border-b border-gray-200'>
        <Text size='sm' fw={500} className='text-gray-700'>
          Event Schedule
        </Text>
        <Text size='xs' className='text-gray-500 mt-1'>
          Provide a detailed description of your event
        </Text>
      </Card.Section>
      <div className='pt-3'>
        <div className='grid grid-cols-2 mb-3 gap-3'>
          {fields.map((field, index) => (
            <Card
              className='bg-white space-y-3'
              key={field.id}
              withBorder
              radius='md'
              p='md'
            >
              <Group justify='flex-end'>
                <Button
                  variant='subtle'
                  color='red'
                  size='xs'
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </Group>
              <TextInput
                label='Title'
                placeholder='Schedule Title'
                control={form.control}
                name={`schedules.${index}.title`}
              />
              <DateTimePicker
                label='Date Time'
                placeholder='Schedule Date Time'
                control={form.control}
                name={`schedules.${index}.date`}
              />

              <Textarea
                label='Description'
                placeholder='Schedule Description'
                control={form.control}
                name={`schedules.${index}.description`}
              />
            </Card>
          ))}
        </div>
        <Button
          variant='outline'
          size='xs'
          onClick={() =>
            append({
              title: "",
              date: new Date(),
            })
          }
        >
          Add Schedule
        </Button>
      </div>
    </Card>
  )
}

export default ScheduleFormSection

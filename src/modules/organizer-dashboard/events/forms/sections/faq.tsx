import { Button, Card, Group, Text } from "@mantine/core"
import type { FC } from "react"
import { useFieldArray, UseFormReturn } from "react-hook-form"
import { Textarea, TextInput } from "react-hook-form-mantine"
import { EventSchema } from "../schema"

interface FAQFormSectionProps {
  form: UseFormReturn<EventSchema>
}

const FAQFormSection: FC<FAQFormSectionProps> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "faqs",
  })

  return (
    <Card withBorder radius='md' p='md' className='bg-white'>
      <Card.Section p='md' className='border-b border-gray-200'>
        <Text size='sm' fw={500} className='text-gray-700'>
          Frequently Asked Questions
        </Text>
        <Text size='xs' className='text-gray-500 mt-1'>
          Add FAQ questions and answers for your event
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
                label='Question'
                placeholder='Enter FAQ question'
                control={form.control}
                name={`faqs.${index}.question`}
              />
              <Textarea
                label='Answer'
                placeholder='Enter FAQ answer'
                control={form.control}
                name={`faqs.${index}.answer`}
              />
            </Card>
          ))}
        </div>
        <Button
          variant='outline'
          size='xs'
          onClick={() =>
            append({
              question: "",
              answer: "",
            })
          }
        >
          Add FAQ
        </Button>
      </div>
    </Card>
  )
}

export default FAQFormSection

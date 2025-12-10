import { UploadInput } from "@/modules/core/components/upload-input"
import { Card, Grid, Group, Stack, Text } from "@mantine/core"
import type { FC } from "react"
import { UseFormReturn } from "react-hook-form"
import {
  DateTimePicker,
  NumberInput,
  Select,
  Switch,
  TextInput,
} from "react-hook-form-mantine"
import { EventSchema } from "../schema"

interface GeneralDetailFormSectionProps {
  form: UseFormReturn<EventSchema>
}

const GeneralDetailFormSection: FC<GeneralDetailFormSectionProps> = ({
  form,
}) => {
  return (
    <Card withBorder radius='md' className='bg-white'>
      <Card.Section p='md' className='border-b border-gray-200'>
        <Text size='sm' fw={500} className='text-gray-700'>
          Event Details
        </Text>
        <Text size='xs' className='text-gray-500 mt-1'>
          Fill out the basic information about your event
        </Text>
      </Card.Section>

      <Stack gap='md' className='mt-4'>
        <TextInput
          withAsterisk
          label='Handle'
          placeholder='event-handle'
          control={form.control}
          name='handle'
        />

        <TextInput
          withAsterisk
          label='Title'
          placeholder='Event Title'
          control={form.control}
          name='title'
        />

        <Group grow>
          <DateTimePicker
            withAsterisk
            label='Start Date'
            placeholder='Pick start date'
            control={form.control}
            name='startDate'
          />

          <DateTimePicker
            withAsterisk
            label='End Date'
            placeholder='Pick end date'
            control={form.control}
            name='endDate'
          />
        </Group>

        <UploadInput
          withAsterisk
          label='Banner Image'
          name='banner'
          control={form.control}
          uploadProps={{
            accept: "image/*",
            multiple: false,
          }}
        />

        <Select
          withAsterisk
          label='Event Type'
          placeholder='Select event type'
          data={[
            { value: "ONLINE", label: "Online" },
            { value: "IN_PERSON", label: "In Person" },
          ]}
          control={form.control}
          name='type'
        />

        {form.watch("type") === "IN_PERSON" && (
          <>
            <Grid>
              <Grid.Col span={12}>
                <TextInput
                  withAsterisk
                  label='Address'
                  placeholder='Address'
                  control={form.control}
                  name='address'
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  withAsterisk
                  label='City'
                  placeholder='City'
                  control={form.control}
                  name='city'
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  withAsterisk
                  label='State'
                  placeholder='State'
                  control={form.control}
                  name='state'
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  withAsterisk
                  label='Country'
                  placeholder='Country'
                  control={form.control}
                  name='country'
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  withAsterisk
                  label='Pincode'
                  placeholder='Pincode'
                  control={form.control}
                  name='pincode'
                />
              </Grid.Col>
            </Grid>
          </>
        )}

        {form.watch("type") === "ONLINE" && (
          <>
            <Grid>
              <Grid.Col span={6}>
                <TextInput
                  withAsterisk
                  label='Meeting Link'
                  placeholder='Meeting Link'
                  control={form.control}
                  name='link'
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label='Meeting Password'
                  placeholder='Meeting Password (Optional)'
                  control={form.control}
                  name='password'
                />
              </Grid.Col>
            </Grid>
          </>
        )}

        <Switch label='Paid Event' control={form.control} name='isPaid' />

        {form.watch("isPaid") && (
          <NumberInput
            withAsterisk
            label='Cost'
            placeholder='Cost'
            control={form.control}
            name='cost'
          />
        )}

        <Switch
          label='Featured Event'
          control={form.control}
          name='isFeatured'
        />
      </Stack>
    </Card>
  )
}

export default GeneralDetailFormSection

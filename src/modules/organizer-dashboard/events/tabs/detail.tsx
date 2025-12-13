import OImage from "@/modules/core/components/o-image"
import { IEvent } from "@/modules/types"
import { Accordion, Card, Grid, Group, Text, Title } from "@mantine/core"
import {
  IconCalendar,
  IconClock,
  IconCoin,
  IconLink,
  IconLock,
  IconMapPin,
} from "@tabler/icons-react"
import dayjs from "dayjs"

interface EventDetailTabProps {
  eventData: IEvent
}

export default function EventDetailTab({ eventData }: EventDetailTabProps) {
  return (
    <>
      <Card shadow='sm' padding='lg' radius='md' withBorder className='mb-6'>
        {eventData.banner && (
          <Card.Section>
            <OImage
              src={eventData.banner}
              alt={eventData.title}
              className='w-full h-full object-contain object-center'
              width={1280}
              height={500}
            />
          </Card.Section>
        )}
        <Group justify='space-between' className='mt-4'>
          <Title order={1} className='text-2xl font-semibold text-gray-900'>
            {eventData.title}
          </Title>
          <Text className='text-gray-500'>#{eventData.handle}</Text>
        </Group>
      </Card>

      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card
            shadow='sm'
            padding='lg'
            radius='md'
            withBorder
            className='mb-6'
          >
            <Title order={2} className='text-xl font-medium mb-4'>
              Event Details
            </Title>
            <Grid>
              <Grid.Col span={6}>
                <Group>
                  <IconMapPin size={20} />
                  <Text>{eventData.type}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={6}>
                <Group>
                  <IconCoin size={20} />
                  <Text>
                    {eventData.isPaid ? `Rs. ${eventData.cost}` : "Free"}
                  </Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={6}>
                <Group>
                  <IconCalendar size={20} />
                  <Text>
                    Starts: {dayjs(eventData.startDate).format("MMMM D, YYYY")}
                  </Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={6}>
                <Group>
                  <IconClock size={20} />
                  <Text>
                    Ends: {dayjs(eventData.endDate).format("MMMM D, YYYY")}
                  </Text>
                </Group>
              </Grid.Col>
              {eventData.type === "IN_PERSON" && (
                <Grid.Col span={12}>
                  <Card withBorder radius='md' className='bg-gray-50'>
                    <Title order={3} className='text-lg font-medium mb-2'>
                      Venue Details
                    </Title>
                    <Text>{eventData.address}</Text>
                    <Text>
                      {eventData.city}, {eventData.state}
                    </Text>
                    <Text>
                      {eventData.country} - {eventData.pincode}
                    </Text>
                  </Card>
                </Grid.Col>
              )}
              {eventData.type === "ONLINE" && (
                <Grid.Col span={12}>
                  <Card withBorder radius='md' className='bg-gray-50'>
                    <Title order={3} className='text-lg font-medium mb-2'>
                      Meeting Details
                    </Title>
                    <Group>
                      <IconLink size={20} />
                      <Text>
                        Meeting Link:{" "}
                        <a
                          href={eventData.link}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {eventData.link}
                        </a>
                      </Text>
                    </Group>
                    {eventData.password && (
                      <Group className='mt-2'>
                        <IconLock size={20} />
                        <Text>Password: {eventData.password}</Text>
                      </Group>
                    )}
                  </Card>
                </Grid.Col>
              )}
            </Grid>
          </Card>

          <Card
            shadow='sm'
            padding='lg'
            radius='md'
            withBorder
            className='mb-6'
          >
            <Title order={2} className='text-xl font-medium mb-4'>
              Description
            </Title>
            <div
              className='prose max-w-none'
              dangerouslySetInnerHTML={{ __html: eventData.description }}
            />
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          {eventData.schedules && eventData.schedules.length > 0 && (
            <Card
              shadow='sm'
              padding='lg'
              radius='md'
              withBorder
              className='mb-6'
            >
              <Title order={2} className='text-xl font-medium mb-4'>
                Schedule
              </Title>
              <div className='space-y-4'>
                {eventData.schedules.map((schedule, index) => (
                  <Card
                    key={index}
                    withBorder
                    radius='md'
                    className='bg-gray-50'
                  >
                    <Text fw={600}>{schedule.title}</Text>
                    <Text size='sm' c='dimmed'>
                      {dayjs(schedule.date).format("MMMM D, YYYY")} at{" "}
                      {dayjs(schedule.date).format("h:mm A")}
                    </Text>
                    <Text className='mt-2'>{schedule.description}</Text>
                  </Card>
                ))}
              </div>
            </Card>
          )}

          {eventData.faqs && eventData.faqs.length > 0 && (
            <Card shadow='sm' padding='lg' radius='md' withBorder>
              <Title order={2} className='text-xl font-medium mb-4'>
                FAQs
              </Title>
              <Accordion>
                {eventData.faqs.map((faq, index) => (
                  <Accordion.Item key={index} value={`faq-${index}`}>
                    <Accordion.Control>{faq.question}</Accordion.Control>
                    <Accordion.Panel>{faq.answer}</Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Card>
          )}
        </Grid.Col>
      </Grid>
    </>
  )
}

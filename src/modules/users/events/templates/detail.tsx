"use client"

import OImage from "@/modules/core/components/o-image"
import { IEvent } from "@/modules/types"
import {
  Accordion,
  Box,
  Button,
  Grid,
  Group,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import {
  IconCalendar,
  IconCalendarEvent,
  IconClock,
  IconCoin,
  IconHelp,
  IconLink,
  IconListDetails,
  IconLock,
  IconMapPin,
  IconUserPlus,
} from "@tabler/icons-react"
import { AddToCalendarButton } from "add-to-calendar-button-react"
import dayjs from "dayjs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUserSession } from "../../auth/queries/use-user-session"
import { useIsJoinedEvent } from "../../user-events/queries/use-is-joined-event"
import { ChoosePaymentModal } from "../modals/choose-payment-modal"
import { useJoinEvent } from "../mutations/use-join-event"

interface EventDetailTemplateProps {
  event: IEvent
}

export default function EventDetailTemplate({
  event,
}: EventDetailTemplateProps) {
  const eventData = event

  const { data: isJoinedResponse } = useIsJoinedEvent(eventData.id)

  const { isAuthenticated } = useUserSession()
  const router = useRouter()

  const hasSchedules = eventData.schedules && eventData.schedules.length > 0
  const hasFaqs = eventData.faqs && eventData.faqs.length > 0

  const [
    openedPaymentModal,
    { open: openPaymentModal, close: closePaymentModal },
  ] = useDisclosure()

  const joinEvent = useJoinEvent()

  const handleJoinEvent = () => {
    if (!isAuthenticated) {
      router.push("/auth/login")
      return
    }

    const isPaid = eventData.isPaid
    if (isPaid) {
      openPaymentModal()
      return
    }

    joinEvent.mutate({ eventId: eventData.id })
  }

  return (
    <div className='max-w-7xl mx-auto p-6'>
      <Box p='lg' className='mb-6 border rounded-md bg-white shadow-sm'>
        <Group>
          {eventData.organizer?.logo && (
            <OImage
              src={eventData.organizer.logo}
              alt='Organization Logo'
              width={64}
              height={64}
              className='rounded-full'
            />
          )}
          <div>
            <Text size='lg' fw={500}>
              {eventData.organizer?.name}
            </Text>
            <Text c='dimmed' size='sm'>
              Event Organizer
            </Text>
          </div>
        </Group>
      </Box>

      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          {eventData.banner && (
            <Box className='mb-6 rounded-lg overflow-hidden shadow-md'>
              <OImage
                src={eventData.banner}
                alt={eventData.title}
                className='w-full h-[470px] object-cover'
                width={816}
                height={470}
              />
            </Box>
          )}

          <Title order={1} className='text-3xl font-bold mb-6'>
            {eventData.title}
          </Title>

          <Box className='bg-white rounded-lg shadow-sm p-4'>
            <Tabs defaultValue='overview' variant='outline'>
              <Tabs.List>
                <Tabs.Tab
                  value='overview'
                  leftSection={<IconListDetails size={16} />}
                >
                  Overview
                </Tabs.Tab>
                {hasSchedules && (
                  <Tabs.Tab
                    value='schedule'
                    leftSection={<IconCalendarEvent size={16} />}
                  >
                    Schedule
                  </Tabs.Tab>
                )}
                {hasFaqs && (
                  <Tabs.Tab value='faqs' leftSection={<IconHelp size={16} />}>
                    FAQs
                  </Tabs.Tab>
                )}
              </Tabs.List>

              <Box className='mt-4'>
                <Tabs.Panel value='overview'>
                  <div
                    className='prose max-w-none'
                    dangerouslySetInnerHTML={{ __html: eventData.description }}
                  />
                </Tabs.Panel>

                {hasSchedules && (
                  <Tabs.Panel value='schedule'>
                    <Stack gap='md'>
                      {eventData.schedules.map((schedule, index: number) => (
                        <Box
                          key={index}
                          className='border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors'
                        >
                          <Text fw={600} size='lg' mb='xs'>
                            {schedule.title}
                          </Text>
                          <Text size='sm' c='dimmed' mb='sm'>
                            {dayjs(schedule.date).format("MMMM D, YYYY")} at{" "}
                            {dayjs(schedule.date).format("h:mm A")}
                          </Text>
                          <Text mb='md'>{schedule.description}</Text>
                          <AddToCalendarButton
                            name={schedule.title}
                            description={schedule.description}
                            startDate={dayjs(schedule.date).format(
                              "YYYY-MM-DD"
                            )}
                            startTime={dayjs(schedule.date).format("HH:mm")}
                            endTime={dayjs(schedule.date)
                              .add(1, "hour")
                              .format("HH:mm")}
                            options={[
                              "Apple",
                              "Google",
                              "iCal",
                              "Microsoft365",
                              "Outlook.com",
                              "Yahoo",
                            ]}
                            timeZone='America/Los_Angeles'
                          />
                        </Box>
                      ))}
                    </Stack>
                  </Tabs.Panel>
                )}

                {hasFaqs && (
                  <Tabs.Panel value='faqs'>
                    <Accordion variant='separated'>
                      {eventData.faqs.map((faq, index: number) => (
                        <Accordion.Item key={index} value={`faq-${index}`}>
                          <Accordion.Control>
                            <Text fw={500}>{faq.question}</Text>
                          </Accordion.Control>
                          <Accordion.Panel>
                            <Text>{faq.answer}</Text>
                          </Accordion.Panel>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  </Tabs.Panel>
                )}
              </Box>
            </Tabs>
          </Box>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Box
            p='lg'
            className='border rounded-lg shadow-sm bg-white sticky top-6'
          >
            <Stack>
              <Group>
                <IconMapPin size={20} className='text-blue-500' />
                <Text>{eventData.type}</Text>
              </Group>

              <Group>
                <IconCalendar size={20} className='text-blue-500' />
                <Text>
                  Starts on: {dayjs(eventData.startDate).format("MMMM D, YYYY")}
                </Text>
              </Group>

              <Group>
                <IconClock size={20} className='text-blue-500' />
                <Text>
                  Ends on: {dayjs(eventData.endDate).format("MMMM D, YYYY")}
                </Text>
              </Group>

              <Group>
                <IconCoin size={20} className='text-blue-500' />
                <Text>
                  {eventData.isPaid ? `Rs. ${eventData.cost}` : "Free"}
                </Text>
              </Group>

              {eventData.type === "ONLINE" && isJoinedResponse?.data?.data && (
                <>
                  <Group>
                    <IconLink size={20} className='text-blue-500' />
                    <Text
                      component='a'
                      href={eventData.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-500 hover:underline'
                    >
                      Meeting Link
                    </Text>
                  </Group>

                  {eventData.password && (
                    <Group>
                      <IconLock size={20} className='text-blue-500' />
                      <Text>Password: {eventData.password}</Text>
                    </Group>
                  )}
                </>
              )}

              {eventData.type === "IN_PERSON" && (
                <div className='border-t pt-4 mt-2'>
                  <Text fw={500} mb='xs' size='lg'>
                    Venue Details
                  </Text>
                  <Text>{eventData.address}</Text>
                  <Text>
                    {eventData.city}, {eventData.state}
                  </Text>
                  <Text>
                    {eventData.country} - {eventData.pincode}
                  </Text>
                </div>
              )}

              {!isJoinedResponse?.data?.data ? (
                <Button
                  fullWidth
                  size='lg'
                  leftSection={<IconUserPlus size={20} />}
                  onClick={handleJoinEvent}
                  className='mt-4'
                  loading={joinEvent.isPending}
                >
                  Join Event
                </Button>
              ) : (
                <Button
                  fullWidth
                  component={Link}
                  href={`/user/events/${eventData.id}`}
                  size='lg'
                  leftSection={<IconUserPlus size={20} />}
                >
                  View Detail (Already Joined)
                </Button>
              )}
            </Stack>
          </Box>
        </Grid.Col>
      </Grid>

      <ChoosePaymentModal
        opened={openedPaymentModal}
        onClose={closePaymentModal}
        eventId={eventData.id}
      />
    </div>
  )
}

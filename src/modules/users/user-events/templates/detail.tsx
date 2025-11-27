"use client"

import OImage from "@/modules/core/components/o-image"
import {
  Accordion,
  ActionIcon,
  Box,
  Button,
  CopyButton,
  Grid,
  Group,
  Loader,
  Overlay,
  Paper,
  RingProgress,
  Stack,
  Tabs,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
} from "@mantine/core"
import { useInterval } from "@mantine/hooks"
import QRCodeStyling from "@solana/qr-code-styling"
// import { AddToCalendarButton } from "add-to-calendar-button-react"
import dayjs from "dayjs"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import {
  TbCalendar,
  TbCalendarEvent,
  TbCertificate,
  TbCheck,
  TbClock,
  TbClock2,
  TbCopy,
  TbDownload,
  TbHelp,
  TbLink,
  TbListDetails,
  TbLock,
  TbMapPin,
} from "react-icons/tb"
import { useEvent } from "../queries/use-event"

interface UserEventDetailTemplateProps {
  id: string
}

interface TimeLeft {
  hours: number
  minutes: number
  seconds: number
  total: number
}

export default function UserEventDetailTemplate({
  id,
}: UserEventDetailTemplateProps) {
  const { data: response, isLoading, error } = useEvent(id)
  const userEvent = response?.data?.data
  const qrRef = useRef<HTMLDivElement>(null)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  })

  const isBanned = useMemo(() => {
    return !!userEvent?.ban
  }, [userEvent])

  // Calculate time left
  const calculateTimeLeft = () => {
    if (!userEvent?.event.startDate)
      return { hours: 0, minutes: 0, seconds: 0, total: 0 }

    const eventStart = dayjs(userEvent.event.startDate)
    const now = dayjs()
    const diff = eventStart.diff(now, "second")

    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, total: 0 }

    const hours = Math.floor(diff / 3600)
    const minutes = Math.floor((diff % 3600) / 60)
    const seconds = diff % 60

    return { hours, minutes, seconds, total: diff }
  }

  // Update time every second
  const interval = useInterval(() => {
    setTimeLeft(calculateTimeLeft())
  }, 1000)

  useEffect(() => {
    setTimeLeft(calculateTimeLeft())
    interval.start()
    return interval.stop
  }, [userEvent])

  // Check if the event is starting within 30 minutes
  const isWithin30Minutes = useMemo(() => {
    if (!userEvent?.event.startDate) return false
    const eventStart = dayjs(userEvent.event.startDate)
    const now = dayjs()
    const minutesUntilStart = eventStart.diff(now, "minute")
    // Default duration of 2 hours if not specified
    const duration = userEvent.event.duration || 120
    return minutesUntilStart <= 30 && minutesUntilStart >= -duration
  }, [userEvent])

  // Format time until event starts for text display
  const timeUntilStart = useMemo(() => {
    if (timeLeft.total <= 0) return "Event has started"

    const parts = []
    if (timeLeft.hours > 0) parts.push(`${timeLeft.hours}h`)
    if (timeLeft.minutes > 0) parts.push(`${timeLeft.minutes}m`)
    parts.push(`${timeLeft.seconds}s`)

    return parts.join(" ")
  }, [timeLeft])

  // Calculate progress for the countdown ring
  const progressValue = useMemo(() => {
    if (!userEvent?.event.startDate || timeLeft.total <= 0) return 100
    const thirtyMinutesInSeconds = 30 * 60
    return (
      ((thirtyMinutesInSeconds - timeLeft.total) / thirtyMinutesInSeconds) * 100
    )
  }, [timeLeft, userEvent])

  // Initialize QR Code
  const qrCode = useMemo(() => {
    if (!userEvent) return null

    return new QRCodeStyling({
      width: 200,
      height: 200,
      type: "svg",
      data: JSON.stringify({
        userEventId: userEvent.id,
        name: `${userEvent.user.firstName} ${userEvent.user.lastName}`,
        email: userEvent.user.email,
      }),
      dotsOptions: {
        color: "#2A2A2A",
        type: "dots",
      },
      cornersSquareOptions: {
        color: "#9945FF",
        type: "extra-rounded",
      },
      cornersDotOptions: {
        color: "#9945FF",
        type: "dot",
      },
      backgroundOptions: {
        color: "#FFFFFF",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 10,
      },
    })
  }, [userEvent])

  // Generate QR code when it changes
  useEffect(() => {
    if (qrRef.current && qrCode) {
      qrRef.current.innerHTML = ""
      qrCode.append(qrRef.current)
    }
  }, [qrCode])

  // Show loading state
  if (isLoading) {
    return (
      <Box className='h-[50vh] flex items-center justify-center'>
        <Loader size='lg' />
      </Box>
    )
  }

  // Show error state
  if (error || !userEvent) {
    return (
      <Box className='h-[50vh] flex items-center justify-center'>
        <Text c='red' size='lg'>
          Failed to load event details
        </Text>
      </Box>
    )
  }

  const { event } = userEvent
  const hasSchedules = event.schedules && event.schedules.length > 0
  const hasFaqs = event.faqs && event.faqs.length > 0

  return (
    <div className='max-w-7xl mx-auto p-6'>
      <Box
        p='lg'
        className='mb-6 border border-opacity-20 rounded-xl bg-white/70 backdrop-blur-md shadow-lg'
      >
        <div className='flex items-center gap-4'>
          {event.organizer?.logo && (
            <OImage
              src={event.organizer.logo}
              alt='Organization Logo'
              width={64}
              height={64}
              className='rounded-full w-16 h-16 mr-2'
            />
          )}
          <div>
            <Text size='lg' fw={500}>
              {event.organizer?.name}
            </Text>
            <Text c='dimmed' size='sm'>
              Event Organizer
            </Text>
          </div>
        </div>
      </Box>

      {userEvent?.event?.completedAt && (
        <Box
          p='lg'
          className='mb-6 border border-opacity-20 rounded-xl bg-white/70 backdrop-blur-md shadow-lg'
        >
          <Group>
            <ThemeIcon
              size='lg'
              radius='xl'
              variant='light'
              color='green'
              className='bg-green-100'
            >
              <TbCheck size={20} className='text-green-600' />
            </ThemeIcon>
            <div>
              <Text
                size='lg'
                fw={500}
                className='bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent'
              >
                Event Completed
              </Text>
              <Text size='sm' c='dimmed'>
                {dayjs(userEvent.completedAt as string).format("MMMM D, YYYY")}
              </Text>
            </div>
          </Group>
        </Box>
      )}

      {userEvent?.certificate && (
        <Box
          p='lg'
          className='mb-6 border border-opacity-20 rounded-xl bg-white/70 backdrop-blur-md shadow-lg'
        >
          <Group>
            <ThemeIcon
              size='lg'
              radius='xl'
              variant='light'
              color='blue'
              className='bg-blue-100'
            >
              <TbCertificate size={20} className='text-blue-600' />
            </ThemeIcon>
            <div className='flex-1'>
              <Text
                size='lg'
                fw={500}
                className='bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent'
              >
                Your Certificate is Ready
              </Text>
              <Text size='sm' c='dimmed'>
                You can now download your event completion certificate
              </Text>
            </div>
            <Button
              variant='light'
              color='blue'
              component={Link}
              href={`/certificates/${userEvent.certificate.id}`}
              leftSection={<TbDownload size={16} />}
            >
              View Certificate
            </Button>
          </Group>
        </Box>
      )}

      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          {event.banner && (
            <Box className='mb-6 rounded-2xl overflow-hidden shadow-xl ring-1 ring-purple-500/20'>
              <OImage
                src={event.banner}
                alt={event.title}
                className='w-full h-[470px] object-cover hover:scale-105 transition-transform duration-700'
                width={816}
                height={470}
              />
            </Box>
          )}

          <Title
            order={1}
            className='text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent'
          >
            {event.title}
          </Title>

          <Box className='bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-opacity-20 p-6'>
            <Tabs defaultValue='overview' variant='outline'>
              <Tabs.List>
                <Tabs.Tab
                  value='overview'
                  leftSection={<TbListDetails size={16} />}
                  className='hover:bg-purple-50 transition-colors'
                >
                  Overview
                </Tabs.Tab>
                {hasSchedules && (
                  <Tabs.Tab
                    value='schedule'
                    leftSection={<TbCalendarEvent size={16} />}
                    className='hover:bg-purple-50 transition-colors'
                  >
                    Schedule
                  </Tabs.Tab>
                )}
                {hasFaqs && (
                  <Tabs.Tab
                    value='faqs'
                    leftSection={<TbHelp size={16} />}
                    className='hover:bg-purple-50 transition-colors'
                  >
                    FAQs
                  </Tabs.Tab>
                )}
              </Tabs.List>

              <Box className='mt-6'>
                <Tabs.Panel value='overview'>
                  <Stack>
                    <Group className='p-4 rounded-lg bg-purple-50/50 backdrop-blur-sm'>
                      <TbMapPin size={20} className='text-purple-500' />
                      <Text className='font-medium'>{event.type}</Text>
                    </Group>

                    <Group className='p-4 rounded-lg bg-blue-50/50 backdrop-blur-sm'>
                      <TbCalendar size={20} className='text-blue-500' />
                      <Text className='font-medium'>
                        Starts on:{" "}
                        {dayjs(event.startDate).format("MMMM D, YYYY")}
                      </Text>
                    </Group>

                    <Group className='p-4 rounded-lg bg-purple-50/50 backdrop-blur-sm'>
                      <TbClock size={20} className='text-purple-500' />
                      <Text className='font-medium'>
                        Ends on: {dayjs(event.endDate).format("MMMM D, YYYY")}
                      </Text>
                    </Group>

                    {event.type === "IN_PERSON" && (
                      <Paper
                        withBorder
                        p='md'
                        radius='xl'
                        className='bg-white/70 backdrop-blur-md shadow-lg border-opacity-20'
                      >
                        {isBanned && (
                          <Overlay
                            blur={5}
                            center
                            className='rounded-xl bg-black/5 backdrop-blur-md'
                          >
                            <Text
                              fw={500}
                              size='lg'
                              className='bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent'
                            >
                              You have been banned from this event
                            </Text>
                          </Overlay>
                        )}
                        <Title
                          order={3}
                          size='h4'
                          mb='md'
                          className='bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent'
                        >
                          Venue Details
                        </Title>
                        <Stack className='space-y-2'>
                          <Text className='font-medium'>{event.address}</Text>
                          <Text className='font-medium'>
                            {event.city}, {event.state}
                          </Text>
                          <Text className='font-medium'>
                            {event.country} - {event.pincode}
                          </Text>
                        </Stack>
                      </Paper>
                    )}

                    <div
                      className='prose max-w-none mt-6'
                      dangerouslySetInnerHTML={{ __html: event.description }}
                    />
                  </Stack>
                </Tabs.Panel>

                {hasSchedules && (
                  <Tabs.Panel value='schedule'>
                    <Stack gap='md'>
                      {event.schedules.map((schedule, index: number) => (
                        <Box
                          key={index}
                          className='border border-opacity-20 rounded-xl bg-white/70 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 p-6 '
                        >
                          <Text
                            fw={600}
                            size='lg'
                            mb='xs'
                            className='bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent'
                          >
                            {schedule.title}
                          </Text>
                          <Group
                            mb='sm'
                            className='p-3 rounded-lg bg-purple-50/50 backdrop-blur-sm inline-flex'
                          >
                            <TbCalendar size={18} className='text-purple-500' />
                            <Text size='sm' className='font-medium'>
                              {dayjs(schedule.date).format("MMMM D, YYYY")} at{" "}
                              {dayjs(schedule.date).format("h:mm A")}
                            </Text>
                          </Group>
                          <Text
                            mb='md'
                            className='text-gray-600 leading-relaxed'
                          >
                            {schedule.description}
                          </Text>

                          {/* <div>
                            <AddToCalendarButton
                              name={schedule.title}
                              description={schedule.description}
                              startDate={dayjs(schedule.date).format(
                                "YYYY-MM-DD"
                              )}
                              options={[
                                "Apple",
                                "Google",
                                "iCal",
                                "Microsoft365",
                                "Outlook.com",
                                "Yahoo",
                              ]}
                              startTime={dayjs(schedule.date).format("HH:mm")}
                              endTime={dayjs(schedule.date)
                                .add(1, "hour")
                                .format("HH:mm")}
                            />
                          </div> */}
                        </Box>
                      ))}
                    </Stack>
                  </Tabs.Panel>
                )}

                {hasFaqs && (
                  <Tabs.Panel value='faqs'>
                    <Accordion
                      variant='separated'
                      classNames={{
                        item: "bg-white/70 backdrop-blur-md border border-opacity-20 rounded-xl mb-3 overflow-hidden",
                        control:
                          "hover:bg-purple-50/50 transition-colors px-6 py-4",
                        content: "px-6 py-4",
                        chevron: "text-purple-500",
                      }}
                    >
                      {event.faqs.map((faq, index: number) => (
                        <Accordion.Item key={index} value={`faq-${index}`}>
                          <Accordion.Control>
                            <Text
                              fw={500}
                              className='bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent'
                            >
                              {faq.question}
                            </Text>
                          </Accordion.Control>
                          <Accordion.Panel>
                            <Text className='text-gray-600 leading-relaxed'>
                              {faq.answer}
                            </Text>
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
          <Stack gap='md' className='sticky top-6'>
            {event.type === "ONLINE" && (
              <Box
                p='lg'
                className='border border-opacity-20 rounded-xl bg-white/70 backdrop-blur-md shadow-lg'
              >
                {isBanned && (
                  <Overlay
                    blur={5}
                    center
                    className='rounded-xl bg-black/5 backdrop-blur-md'
                  >
                    <Text
                      fw={500}
                      size='lg'
                      className='bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent'
                    >
                      You have been banned from this event
                    </Text>
                  </Overlay>
                )}
                <Stack align='center' gap='lg'>
                  <Title
                    order={3}
                    size='h4'
                    className='bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent'
                  >
                    Meeting Details
                  </Title>

                  {isWithin30Minutes ? (
                    <Stack gap='md' style={{ width: "100%" }}>
                      <Paper
                        withBorder
                        p='md'
                        radius='xl'
                        className='bg-white/80 backdrop-blur-md shadow-md border-opacity-20'
                      >
                        <Stack>
                          <Group>
                            <TbLink size={20} className='text-purple-500' />
                            <Text
                              component='a'
                              href={event.link}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='text-purple-500 hover:text-purple-600 transition-colors'
                            >
                              Join Meeting
                            </Text>
                            <CopyButton value={event.link || ""} timeout={2000}>
                              {({ copied, copy }) => (
                                <Tooltip label={copied ? "Copied" : "Copy"}>
                                  <ActionIcon
                                    color={copied ? "teal" : "gray"}
                                    onClick={copy}
                                    className='hover:bg-purple-50 transition-colors'
                                  >
                                    {copied ? (
                                      <TbCheck size={16} />
                                    ) : (
                                      <TbCopy size={16} />
                                    )}
                                  </ActionIcon>
                                </Tooltip>
                              )}
                            </CopyButton>
                          </Group>

                          {event.password && (
                            <Group>
                              <TbLock size={20} className='text-purple-500' />
                              <Text className='font-medium'>
                                Password: {event.password}
                              </Text>
                              <CopyButton value={event.password} timeout={2000}>
                                {({ copied, copy }) => (
                                  <Tooltip label={copied ? "Copied" : "Copy"}>
                                    <ActionIcon
                                      color={copied ? "teal" : "gray"}
                                      onClick={copy}
                                      className='hover:bg-purple-50 transition-colors'
                                    >
                                      {copied ? (
                                        <TbCheck size={16} />
                                      ) : (
                                        <TbCopy size={16} />
                                      )}
                                    </ActionIcon>
                                  </Tooltip>
                                )}
                              </CopyButton>
                            </Group>
                          )}
                        </Stack>
                      </Paper>
                    </Stack>
                  ) : (
                    <Stack align='center' gap='md'>
                      <RingProgress
                        size={120}
                        thickness={8}
                        roundCaps
                        sections={[{ value: progressValue, color: "violet" }]}
                        label={
                          <Stack align='center' gap={0}>
                            <TbClock2 size={28} className='text-purple-500' />
                            <Text
                              size='xs'
                              fw={700}
                              className='text-purple-600'
                            >
                              {timeUntilStart}
                            </Text>
                          </Stack>
                        }
                      />
                      <Stack align='center' gap='xs'>
                        <Text size='sm' c='dimmed' ta='center'>
                          Meeting link will be available 30 minutes before the
                          event starts
                        </Text>
                        <Group gap='xs'>
                          <Paper
                            withBorder
                            p='xs'
                            radius='md'
                            className='bg-white/80 backdrop-blur-sm'
                          >
                            <Stack align='center' gap={0}>
                              <Text
                                size='xl'
                                fw={700}
                                className='text-purple-600'
                              >
                                {timeLeft.hours.toString().padStart(2, "0")}
                              </Text>
                              <Text size='xs' c='dimmed'>
                                hours
                              </Text>
                            </Stack>
                          </Paper>
                          <Text size='xl' fw={700} className='text-purple-500'>
                            :
                          </Text>
                          <Paper
                            withBorder
                            p='xs'
                            radius='md'
                            className='bg-white/80 backdrop-blur-sm'
                          >
                            <Stack align='center' gap={0}>
                              <Text
                                size='xl'
                                fw={700}
                                className='text-purple-600'
                              >
                                {timeLeft.minutes.toString().padStart(2, "0")}
                              </Text>
                              <Text size='xs' c='dimmed'>
                                mins
                              </Text>
                            </Stack>
                          </Paper>
                          <Text size='xl' fw={700} className='text-purple-500'>
                            :
                          </Text>
                          <Paper
                            withBorder
                            p='xs'
                            radius='md'
                            className='bg-white/80 backdrop-blur-sm'
                          >
                            <Stack align='center' gap={0}>
                              <Text
                                size='xl'
                                fw={700}
                                className='text-purple-600'
                              >
                                {timeLeft.seconds.toString().padStart(2, "0")}
                              </Text>
                              <Text size='xs' c='dimmed'>
                                secs
                              </Text>
                            </Stack>
                          </Paper>
                        </Group>
                      </Stack>
                    </Stack>
                  )}
                </Stack>
              </Box>
            )}

            {event.type === "IN_PERSON" && (
              <Box
                p='lg'
                className='border border-opacity-20 rounded-xl bg-white/70 backdrop-blur-md shadow-lg'
              >
                {isBanned && (
                  <Overlay
                    blur={5}
                    center
                    className='rounded-xl bg-black/5 backdrop-blur-md'
                  >
                    <Text
                      fw={500}
                      size='lg'
                      className='bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent'
                    >
                      You have been banned from this event
                    </Text>
                  </Overlay>
                )}
                <Stack align='center' gap='lg'>
                  <Title
                    order={3}
                    size='h4'
                    className='bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent'
                  >
                    Event Entry QR Code
                  </Title>
                  <Paper
                    withBorder
                    p='lg'
                    radius='xl'
                    className='bg-white/80 backdrop-blur-md shadow-md border-opacity-20'
                  >
                    <div ref={qrRef} />
                  </Paper>
                  <Text size='sm' c='dimmed' ta='center'>
                    Show this QR code at the event entrance for verification
                  </Text>
                </Stack>
              </Box>
            )}
          </Stack>
        </Grid.Col>
      </Grid>
    </div>
  )
}

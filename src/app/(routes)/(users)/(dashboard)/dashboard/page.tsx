"use client"

import { useUpcomingEvents } from "@/modules/users/events/queries/use-upcoming-events"
import { useUserSession } from "@/modules/users/auth/queries/use-user-session"
import { useEvents } from "@/modules/users/user-events/queries/use-events"
import {
  Badge,
  Button,
  Group,
  Paper,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import { ArrowRight, Calendar, Clock, Ticket } from "lucide-react"
import Link from "next/link"
import dayjs from "dayjs"

const getStatusColor = (status?: string) => {
  if (status === "ACTIVE") return "green"
  if (status === "BANNED") return "red"
  if (status === "LEFT") return "gray"
  return "blue"
}

const getStatusLabel = (status?: string) => {
  if (status === "ACTIVE") return "Active"
  if (status === "BANNED") return "Banned"
  if (status === "LEFT") return "Left"
  return "Pending"
}

export default function DashboardPage() {
  const { user } = useUserSession()
  const { data: registeredEvents, isLoading: isRegisteredLoading } = useEvents({
    page: 1,
    limit: 5,
    search: "",
    searchFields: "",
    sort: "",
  })
  const { data: upcomingEvents, isLoading: isUpcomingLoading } =
    useUpcomingEvents({
      page: 1,
      limit: 4,
    })

  const registeredList = registeredEvents?.data?.data ?? []
  const upcomingList = upcomingEvents?.data?.data ?? []
  const registeredTotal =
    registeredEvents?.data?.meta?.total ?? registeredList.length

  const stats = [
    {
      label: "Registered events",
      value: registeredTotal,
      icon: Ticket,
      bgClass: "bg-blue-50",
      iconClass: "text-blue-600",
    },
    {
      label: "Upcoming events",
      value: upcomingList.length,
      icon: Calendar,
      bgClass: "bg-teal-50",
      iconClass: "text-teal-600",
    },
    {
      label: "Next event",
      value: registeredList[0]?.event?.startDate
        ? dayjs(registeredList[0].event.startDate).format("DD MMM")
        : "--",
      icon: Clock,
      bgClass: "bg-orange-50",
      iconClass: "text-orange-600",
    },
  ]

  return (
    <div className='space-y-8'>
      <div>
        <Title order={1} className='text-2xl font-semibold text-gray-900'>
          Welcome back{user?.firstName ? `, ${user.firstName}` : ""}
        </Title>
        <Text size='sm' c='dimmed'>
          Track your registrations and jump back into upcoming events.
        </Text>
      </div>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing='lg'>
        {stats.map(({ label, value, icon: Icon, bgClass, iconClass }) => (
          <Paper
            key={label}
            radius='md'
            p='md'
            className='border border-gray-200 bg-white'
          >
            <Group>
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-lg ${bgClass}`}
              >
                <Icon size={20} className={iconClass} />
              </div>
              <div>
                <Text size='xs' c='dimmed'>
                  {label}
                </Text>
                <Title order={3} className='text-gray-900'>
                  {value}
                </Title>
              </div>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing='lg'>
        <Paper radius='lg' p='md' className='border border-gray-200 bg-white'>
          <Group justify='space-between' className='mb-4'>
            <div>
              <Title order={3} className='text-lg'>
                My events
              </Title>
              <Text size='sm' c='dimmed'>
                Your active registrations
              </Text>
            </div>
            <Button
              component={Link}
              href='/dashboard/events'
              variant='light'
            >
              View all
            </Button>
          </Group>

          {isRegisteredLoading ? (
            <Stack>
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} height={54} radius='md' />
              ))}
            </Stack>
          ) : registeredList.length ? (
            <Stack>
              {registeredList.slice(0, 3).map((userEvent) => (
                <div
                  key={userEvent.id}
                  className='flex flex-wrap items-center justify-between gap-3 rounded-md border border-gray-100 bg-gray-50 px-4 py-3'
                >
                  <div>
                    <Text fw={600} className='text-gray-900'>
                      {userEvent.event.title}
                    </Text>
                    <Text size='sm' c='dimmed'>
                      {dayjs(userEvent.event.startDate).format("DD MMM YYYY")}
                      {userEvent.event.city
                        ? ` • ${userEvent.event.city}`
                        : ""}
                    </Text>
                  </div>
                  <Group gap='sm'>
                    <Badge
                      color={getStatusColor(userEvent.status)}
                      variant='light'
                    >
                      {getStatusLabel(userEvent.status)}
                    </Badge>
                    <Button
                      component={Link}
                      href={`/dashboard/events/${userEvent.id}`}
                      size='xs'
                      variant='subtle'
                      rightSection={<ArrowRight size={14} />}
                    >
                      Details
                    </Button>
                  </Group>
                </div>
              ))}
            </Stack>
          ) : (
            <Text size='sm' c='dimmed'>
              You have not joined any events yet. Explore upcoming events to get
              started.
            </Text>
          )}
        </Paper>

        <Paper radius='lg' p='md' className='border border-gray-200 bg-white'>
          <Group justify='space-between' className='mb-4'>
            <div>
              <Title order={3} className='text-lg'>
                Upcoming events
              </Title>
              <Text size='sm' c='dimmed'>
                New events you can join
              </Text>
            </div>
            <Button component={Link} href='/events' variant='light'>
              Browse events
            </Button>
          </Group>

          {isUpcomingLoading ? (
            <Stack>
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} height={80} radius='md' />
              ))}
            </Stack>
          ) : upcomingList.length ? (
            <Stack>
              {upcomingList.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  className='rounded-md border border-gray-100 bg-gray-50 p-4'
                >
                  <Text fw={600} className='text-gray-900'>
                    {event.title}
                  </Text>
                  <Text size='sm' c='dimmed'>
                    {dayjs(event.startDate).format("DD MMM YYYY")}
                    {event.city ? ` • ${event.city}` : ""}
                  </Text>
                  <Button
                    component={Link}
                    href={`/events/${event.id}`}
                    size='xs'
                    variant='subtle'
                    className='mt-3'
                    rightSection={<ArrowRight size={14} />}
                  >
                    View event
                  </Button>
                </div>
              ))}
            </Stack>
          ) : (
            <Text size='sm' c='dimmed'>
              No upcoming events are available right now. Check back soon.
            </Text>
          )}
        </Paper>
      </SimpleGrid>
    </div>
  )
}

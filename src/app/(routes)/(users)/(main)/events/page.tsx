"use client"

import { Container, SimpleGrid, Text, Title } from "@mantine/core"
import { usePublicEvents } from "@/modules/users/events/queries/use-public-events"
import { EventCard } from "@/modules/users/landing/components/event-card"
import { EventLoadingCard } from "@/modules/users/landing/components/event-loading-card"

export default function EventsPage() {
  const { data, isLoading } = usePublicEvents({ page: 1, limit: 12 })
  const events = data?.data?.data ?? []

  return (
    <Container size='xl' py={40}>
      <Title order={2} className='mb-2 text-2xl font-semibold text-gray-900'>
        Explore Events
      </Title>
      <Text className='text-gray-600 mb-8'>
        Discover upcoming events and join the ones that match your interests.
      </Text>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing='lg'>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <EventLoadingCard key={index} />
            ))
          : events.map((event) => <EventCard key={event.id} event={event} />)}
      </SimpleGrid>
      {!isLoading && events.length === 0 && (
        <Text className='text-gray-500 mt-8'>
          No upcoming events are available yet.
        </Text>
      )}
    </Container>
  )
}

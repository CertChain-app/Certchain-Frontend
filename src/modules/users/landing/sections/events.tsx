"use client"

import { Button } from "@mantine/core"
import type { FC } from "react"
import { useUpcomingEvents } from "../../events/queries/use-upcoming-events"
import { EventCard } from "../components/event-card"
import { EventLoadingCard } from "../components/event-loading-card"

export const EventsSection: FC = () => {
  const { data, isLoading } = useUpcomingEvents({
    page: 1,
    limit: 3,
  })

  return (
    <section id='events' className='bg-gray-100 py-20'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-12 text-center text-3xl font-bold'>
          Upcoming Events
        </h2>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <EventLoadingCard key={index} />
              ))
            : data?.data?.data?.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
        </div>
        <div className='text-center mt-12'>
          <Button className='bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90'>
            View All Events
          </Button>
        </div>
      </div>
    </section>
  )
}

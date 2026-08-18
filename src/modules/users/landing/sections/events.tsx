"use client"

import { ButtonLink } from "@/modules/users/common/components/ui/button"
import type { FC } from "react"
import { useUpcomingEvents } from "../../events/queries/use-upcoming-events"
import { EventCard } from "../components/event-card"
import { EventLoadingCard } from "../components/event-loading-card"

export const EventsSection: FC = () => {
  const { data, isLoading } = useUpcomingEvents({ page: 1, limit: 3 })
  const events = data?.data?.data ?? []

  return (
    <section id='events' className='border-t border-border bg-background'>
      <div className='mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24'>
        <div className='flex items-end justify-between gap-4'>
          <div>
            <p className='font-mono text-xs uppercase tracking-widest text-primary'>
              // upcoming
            </p>
            <h2 className='mt-2 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl'>
              Events worth a credential
            </h2>
          </div>
          <ButtonLink
            href='/events'
            variant='outline'
            size='lg'
            className='hidden sm:inline-flex'
          >
            View all events
          </ButtonLink>
        </div>

        <div className='mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <EventLoadingCard key={index} />
              ))
            : events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
        </div>

        {!isLoading && events.length === 0 && (
          <p className='mt-10 rounded-xl border border-dashed border-border bg-card px-6 py-10 text-center text-sm text-muted-foreground'>
            No upcoming events are open for registration right now. Check back
            soon.
          </p>
        )}

        <ButtonLink
          href='/events'
          variant='outline'
          size='lg'
          className='mt-8 w-full sm:hidden'
        >
          View all events
        </ButtonLink>
      </div>
    </section>
  )
}

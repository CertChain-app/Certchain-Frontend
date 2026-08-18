"use client"

import OImage from "@/modules/core/components/o-image"
import { EventType, IEvent } from "@/modules/types"
import dayjs from "dayjs"
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react"
import Link from "next/link"
import type { FC } from "react"

interface EventCardProps {
  event: IEvent
}

/** "Naxal, Kathmandu, Nepal" — skipping whichever parts the organiser left out. */
const formatLocation = (event: IEvent) => {
  if (event.type === EventType.ONLINE) return "Online event"

  const parts = [event.address, event.city, event.state, event.country].filter(
    (part): part is string => !!part && part.trim().length > 0
  )

  return parts.length > 0 ? parts.join(", ") : "Venue to be announced"
}

export const EventCard: FC<EventCardProps> = ({ event }) => {
  return (
    <article className='group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-[0_24px_48px_-28px_rgba(30,50,90,0.35)]'>
      <Link
        href={`/events/${event.id}`}
        className='relative block aspect-[16/10] overflow-hidden bg-muted'
      >
        <OImage
          src={event.banner}
          alt={event.title}
          width={1200}
          height={750}
          notModal
          className='h-full w-full rounded-none object-cover transition-transform duration-500 group-hover:scale-105'
        />
        <span className='absolute left-3 top-3 rounded-md bg-background/90 px-2 py-1 font-mono text-[11px] text-foreground backdrop-blur'>
          {event.type === EventType.ONLINE ? "Online" : "In person"}
        </span>
        {!event.isPaid && (
          <span className='absolute right-3 top-3 rounded-md bg-verified px-2 py-1 font-mono text-[11px] font-medium text-verified-foreground'>
            Free
          </span>
        )}
      </Link>

      <div className='flex flex-1 flex-col p-5'>
        <h3 className='line-clamp-2 text-base font-semibold text-foreground'>
          {event.title}
        </h3>

        <div className='mt-3 space-y-1.5 text-sm text-muted-foreground'>
          <p className='flex items-center gap-2'>
            <CalendarDays className='size-4 shrink-0 text-primary' />
            {dayjs(event.startDate).format("DD MMM YYYY")}
          </p>
          <p className='flex items-start gap-2'>
            <MapPin className='mt-0.5 size-4 shrink-0 text-primary' />
            <span className='line-clamp-2'>{formatLocation(event)}</span>
          </p>
        </div>

        <Link
          href={`/events/${event.id}`}
          className='mt-5 inline-flex items-center gap-1 self-start text-sm font-medium text-primary hover:underline'
        >
          Learn more
          <ArrowUpRight className='size-4' />
        </Link>
      </div>
    </article>
  )
}

"use client"

import { usePublicEvents } from "@/modules/users/events/queries/use-public-events"
import { EventCard } from "@/modules/users/landing/components/event-card"
import { EventLoadingCard } from "@/modules/users/landing/components/event-loading-card"
import { Search, X } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, type FormEvent } from "react"

export default function EventsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get("search") ?? ""

  const [query, setQuery] = useState(search)
  useEffect(() => setQuery(search), [search])

  const { data, isLoading } = usePublicEvents({
    page: 1,
    limit: 12,
    ...(search ? { search, searchFields: "title" } : {}),
  })
  const events = data?.data?.data ?? []

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const next = query.trim()
    router.push(
      next
        ? `/events?search=${encodeURIComponent(next)}&searchFields=title`
        : "/events"
    )
  }

  return (
    <div className='mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20'>
      <p className='font-mono text-xs uppercase tracking-widest text-primary'>
        // events
      </p>
      <h1 className='mt-2 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl'>
        Explore events
      </h1>
      <p className='mt-3 max-w-lg text-pretty text-muted-foreground'>
        Discover upcoming events and join the ones that match your interests.
        Every one of them issues a verifiable certificate.
      </p>

      <form onSubmit={handleSubmit} className='mt-7 max-w-md'>
        <div className='flex items-center gap-2 rounded-lg border border-border bg-card p-1.5 shadow-sm focus-within:border-primary/60 focus-within:ring-[3px] focus-within:ring-primary/15'>
          <Search className='ml-2 size-4 shrink-0 text-muted-foreground' />
          <input
            type='search'
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder='Search events by title'
            aria-label='Search events by title'
            className='h-9 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground'
          />
          <button
            type='submit'
            className='h-9 shrink-0 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80'
          >
            Search
          </button>
        </div>
      </form>

      {search && (
        <p className='mt-4 flex items-center gap-2 text-sm text-muted-foreground'>
          Showing results for
          <span className='font-medium text-foreground'>
            &ldquo;{search}&rdquo;
          </span>
          <Link
            href='/events'
            className='inline-flex items-center gap-1 text-primary hover:underline'
          >
            <X className='size-3.5' />
            clear
          </Link>
        </p>
      )}

      <div className='mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <EventLoadingCard key={index} />
            ))
          : events.map((event) => <EventCard key={event.id} event={event} />)}
      </div>

      {!isLoading && events.length === 0 && (
        <p className='mt-10 rounded-xl border border-dashed border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground'>
          {search
            ? `No events match “${search}”. Try a different search.`
            : "No upcoming events are available yet."}
        </p>
      )}
    </div>
  )
}

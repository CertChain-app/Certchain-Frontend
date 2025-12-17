import { IEvent } from "@/modules/types"
import { EventCard } from "../components/event-card"

interface EventGridProps {
  title: string
  events: Array<IEvent>
}

export const EventGrid = ({ title, events }: EventGridProps) => {
  if (events.length === 0) return null

  return (
    <section className='py-8'>
      <div className='container'>
        <h2 className='mb-8 text-2xl font-bold'>{title}</h2>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}

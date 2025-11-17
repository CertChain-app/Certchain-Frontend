import OImage from "@/modules/core/components/o-image"
import { IEvent } from "@/modules/types"
import { Button, Card } from "@mantine/core"
import dayjs from "dayjs"
import { MapPin } from "lucide-react"
import Link from "next/link"

interface EventCardProps {
  event: IEvent
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card withBorder className='bg-white w-full overflow-hidden'>
      <OImage
        src={event.banner as string}
        alt={event.title}
        width={1200}
        height={600}
        className='w-full h-full object-fit'
      />
      <div className='p-6'>
        <h3 className='text-xl font-semibold mb-2'>{event.title}</h3>
        <p className='text-gray-600 mb-2'>
          {dayjs(event.startDate).format("DD MMMM YYYY")}
        </p>
        <p className='text-gray-600 flex items-center'>
          <MapPin className='h-4 w-4 mr-1' />
          {event.address}, {event.city}, {event.state} {event.pincode},{" "}
          {event.country}
        </p>
        <Button
          component={Link}
          href={`/events/${event.id}`}
          className='mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90'
        >
          Learn More
        </Button>
      </div>
    </Card>
  )
}

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
    <Card withBorder className='bg-white w-full max-w-sm overflow-hidden'>
      <div className='w-full h-40 sm:h-44 bg-gray-100 overflow-hidden'>
        <OImage
          src={event.banner as string}
          alt={event.title}
          width={1200}
          height={675}
          className='w-full h-full object-cover scale-100 transition-transform duration-500 ease-out'
        />
      </div>
      <div className='p-5'>
        <h3 className='text-lg font-semibold mb-2 line-clamp-2'>
          {event.title}
        </h3>
        <p className='text-gray-600 mb-2 text-sm'>
          {dayjs(event.startDate).format("DD MMMM YYYY")}
        </p>
        <p className='text-gray-600 flex items-center text-sm line-clamp-2'>
          <MapPin className='h-4 w-4 mr-1' />
          {event.address}, {event.city}, {event.state} {event.pincode},{" "}
          {event.country}
        </p>
        <Button
          size='sm'
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

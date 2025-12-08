import EditEventTemplate from "@/modules/organizer-dashboard/events/templates/edit"
import type { FC } from "react"

interface EventsEditPageProps {
  params: Promise<{ eventId: string }>
}

const EventsEditPage: FC<EventsEditPageProps> = async ({ params }) => {
  const { eventId } = await params

  return <EditEventTemplate eventId={eventId} />
}

export default EventsEditPage

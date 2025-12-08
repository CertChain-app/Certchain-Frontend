import EventDetailTemplate from "@/modules/organizer-dashboard/events/templates/detail"

export interface EventDetailPageProps {
  params: Promise<{ eventId: string }>
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { eventId } = await params
  return <EventDetailTemplate eventId={eventId} />
}

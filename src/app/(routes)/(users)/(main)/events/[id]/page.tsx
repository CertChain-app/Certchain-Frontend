import { wsrvLoader } from "@/modules/core/lib/loader"
import { createMetadata } from "@/modules/core/lib/seo"
import { getEvent } from "@/modules/users/events/server-queries/get-event"
import EventDetailTemplate from "@/modules/users/events/templates/detail"
import { notFound } from "next/navigation"

interface EventDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: EventDetailPageProps) {
  const { id } = await params
  const event = await getEvent(id)
  if (!event?.data) return null
  return createMetadata({
    title: `${event?.data?.title} - ${event?.data?.organizer?.name}`,
    description: event?.data?.description || "Event",
    image:
      wsrvLoader({
        src: event?.data?.banner || "",
        width: 1200,
        height: 600,
      }) || "",
  })
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { id } = await params
  const event = await getEvent(id)
  if (!event?.data) return notFound()
  return <EventDetailTemplate event={event?.data} />
}

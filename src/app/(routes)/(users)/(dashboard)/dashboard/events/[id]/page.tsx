import UserEventDetailTemplate from "@/modules/users/user-events/templates/detail"

interface EventDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { id } = await params

  return <UserEventDetailTemplate id={id} />
}

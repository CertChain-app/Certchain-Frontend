import OrganizerEventJoineesTable from "../joinees-table/table"

interface EventJoineesTabProps {
  eventId: string
}

export default function EventJoineesTab({ eventId }: EventJoineesTabProps) {
  return <OrganizerEventJoineesTable eventId={eventId} />
}

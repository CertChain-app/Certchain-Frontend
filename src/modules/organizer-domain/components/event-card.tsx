import OImage from "@/modules/core/components/o-image"
import { useLink } from "@/modules/organizer-dashboard/common/utils/link"
import { IEvent } from "@/modules/types"
import { EventStatus, EventType } from "@/modules/types/enums"
import {
  Badge,
  Button,
  Card,
  Group,
  Spoiler,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import dayjs from "dayjs"
import { CalendarIcon, MapPinIcon } from "lucide-react"
import Link from "next/link"

interface EventCardProps {
  event: IEvent
}

export const EventCard = ({ event }: EventCardProps) => {
  const { getRootLink } = useLink()
  const isEnded = event.status === EventStatus.ENDED

  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder>
      {event.banner && (
        <Card.Section>
          <OImage
            width={467}
            height={262}
            src={event.banner}
            alt={event.title}
            className='object-cover aspect-video'
          />
        </Card.Section>
      )}

      <Stack gap='xs' mt={event.banner ? "md" : 0}>
        <Group gap='xs'>
          <Badge
            variant='outline'
            color={event.type === EventType.ONLINE ? "blue" : "green"}
          >
            {event.type}
          </Badge>
        </Group>

        <Title order={3} lineClamp={2}>
          {event.title}
        </Title>

        <Spoiler maxHeight={80} showLabel='Read more' hideLabel='Hide'>
          <Text
            size='sm'
            c='dimmed'
            className='prose'
            dangerouslySetInnerHTML={{ __html: event.description }}
          />
        </Spoiler>

        <Stack gap='xs' mt='sm'>
          <Group gap='xs'>
            <CalendarIcon size={16} />
            <Text size='sm' c='dimmed'>
              {dayjs(event.startDate).format("MMM D, YYYY")} -{" "}
              {dayjs(event.endDate).format("MMM D, YYYY")}
            </Text>
          </Group>

          {event.city && event.state && (
            <Group gap='xs'>
              <MapPinIcon size={16} />
              <Text size='sm' c='dimmed'>
                {event.city}, {event.state}
              </Text>
            </Group>
          )}
        </Stack>

        <Group justify='space-between' align='center' mt='md'>
          {event.isPaid ? (
            <Text fz='lg' fw={600} c='green'>
              Rs.{event.cost}
            </Text>
          ) : (
            <Badge variant='filled' color='gray'>
              Free
            </Badge>
          )}
          <Button
            variant='light'
            component={Link}
            href={getRootLink(`/events/${event.id}`)}
            disabled={isEnded}
          >
            {isEnded
              ? "Event Ended"
              : event.isPaid
              ? "Register Now"
              : "Join for Free"}
          </Button>
        </Group>
      </Stack>
    </Card>
  )
}

import OImage from "@/modules/core/components/o-image"
import { useLink } from "@/modules/organizer-dashboard/common/utils/link"
import { useOrganizerContext } from "@/modules/organizer/contexts/organizer-context"
import { EventStatus, EventType } from "@/modules/types/enums"
import { Badge, Button, Group, Stack, Text, Title } from "@mantine/core"

import dayjs from "dayjs"
import { CalendarIcon, MapPinIcon } from "lucide-react"
import Link from "next/link"

export const FeaturedEventSection = () => {
  const { featuredEvent } = useOrganizerContext()
  const { getRootLink } = useLink()

  console.log(featuredEvent)

  if (!featuredEvent) return null

  const isEnded = featuredEvent.status === EventStatus.ENDED

  return (
    <section className='py-12'>
      <div className='container mx-auto px-4'>
        <Title order={2} size='h1' mb='xl'>
          Featured Event
        </Title>
        <div className='overflow-hidden rounded-xl border bg-white'>
          <div className='grid md:grid-cols-2'>
            {featuredEvent.banner && (
              <div className='relative h-64 md:h-full'>
                <OImage
                  src={featuredEvent.banner}
                  alt={featuredEvent.title}
                  height={334}
                  width={594}
                  className='h-full object-cover aspect-video'
                />
              </div>
            )}
            <Stack p='xl' justify='space-between'>
              <div>
                <Group gap='xs' mb='md'>
                  <Badge
                    variant='outline'
                    color={
                      featuredEvent.type === EventType.ONLINE ? "blue" : "green"
                    }
                  >
                    {featuredEvent.type}
                  </Badge>
                </Group>

                <Title order={3} mb='xs'>
                  {featuredEvent.title}
                </Title>
                <Text
                  c='dimmed'
                  className='prose'
                  dangerouslySetInnerHTML={{
                    __html: featuredEvent.description,
                  }}
                  mb='lg'
                />

                <Stack gap='xs'>
                  <Group gap='xs'>
                    <CalendarIcon size={16} />
                    <Text size='sm' c='dimmed'>
                      {dayjs(featuredEvent.startDate).format("MMM D, YYYY")} -{" "}
                      {dayjs(featuredEvent.endDate).format("MMM D, YYYY")}
                    </Text>
                  </Group>

                  {featuredEvent.city && featuredEvent.state && (
                    <Group gap='xs'>
                      <MapPinIcon size={16} />
                      <Text size='sm' c='dimmed'>
                        {featuredEvent.city}, {featuredEvent.state}
                      </Text>
                    </Group>
                  )}
                </Stack>
              </div>

              <Group justify='space-between' align='center' mt='xl'>
                {featuredEvent.isPaid ? (
                  <Text fz='xl' fw={600} c='green'>
                    ${featuredEvent.cost}
                  </Text>
                ) : (
                  <Badge variant='filled' color='gray' size='lg'>
                    Free
                  </Badge>
                )}
                <Button
                  size='lg'
                  component={Link}
                  href={getRootLink(`/events/${featuredEvent.id}`)}
                  disabled={isEnded}
                >
                  {isEnded
                    ? "Event Ended"
                    : featuredEvent.isPaid
                    ? "Register Now"
                    : "Join for Free"}
                </Button>
              </Group>
            </Stack>
          </div>
        </div>
      </div>
    </section>
  )
}

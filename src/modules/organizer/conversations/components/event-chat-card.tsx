"use client"

import { useLink } from "@/modules/organizer-dashboard/common/utils/link"
import { IConversation } from "@/modules/types"
import { Button, Card, Group, Text } from "@mantine/core"
import { IconMessage2 } from "@tabler/icons-react"
import Link from "next/link"

interface EventChatCardProps {
  conversation: IConversation
}

export default function EventChatCard({ conversation }: EventChatCardProps) {
  const { getLink } = useLink()
  return (
    <Card
      withBorder
      shadow='sm'
      radius='md'
      className='hover:shadow-md transition-shadow'
    >
      <div className='space-y-4'>
        <div>
          <Text size='lg' fw={500} className='text-gray-900'>
            {conversation.event?.title}
          </Text>
          <Text size='sm' color='dimmed'>
            Organized by {conversation.event?.organizer?.name}
          </Text>
        </div>

        <Group justify='end' align='center'>
          <Button
            component={Link}
            href={getLink(`dashboard/conversations/${conversation.id}`)}
            variant='light'
            leftSection={<IconMessage2 size={16} />}
            className='bg-blue-50 text-blue-600 hover:bg-blue-100'
          >
            Join Discussion
          </Button>
        </Group>
      </div>
    </Card>
  )
}

"use client"

import { usePagination } from "@/modules/core/hooks/use-pagination"
import { Pagination, Text } from "@mantine/core"
import { useRouter } from "next/navigation"
import EventChatCard from "../components/event-chat-card"
import { useConversations } from "../queries/use-conversations"

export default function ChatsIndexTemplate() {
  const { requestParams } = usePagination()
  const router = useRouter()
  const { data: conversations } = useConversations({
    ...requestParams,
    limit: 100,
  })

  return (
    <div>
      <div className='grid grid-cols-4 gap-4'>
        {conversations?.data?.data?.map((conversation) => (
          <EventChatCard key={conversation.id} conversation={conversation} />
        ))}
      </div>
      {conversations?.data?.meta?.lastPage ? (
        conversations?.data?.meta?.lastPage > 1 && (
          <Pagination
            total={conversations?.data?.meta?.lastPage}
            value={conversations?.data?.meta?.currentPage}
            onChange={(page) => router.push(`/dashboard/chats?page=${page}`)}
          />
        )
      ) : (
        <div className='flex justify-center items-center h-full'>
          <Text size='lg' fw={500} className='text-gray-900'>
            No conversations found
          </Text>
        </div>
      )}
    </div>
  )
}

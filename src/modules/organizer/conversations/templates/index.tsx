"use client"

import { Loader, Pagination, Text } from "@mantine/core"
import { useRouter } from "next/navigation"
import EventChatCard from "../components/event-chat-card"
import { useConversations } from "../queries/use-conversations"

export default function OrganizerChatsIndexTemplate() {
  const router = useRouter()
  const { data: conversations, isLoading } = useConversations()

  console.log(conversations)

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <Loader />
      </div>
    )
  }

  return (
    <div>
      <div className='grid grid-cols-4 gap-4'>
        {conversations?.data?.map((conversation) => (
          <EventChatCard key={conversation.id} conversation={conversation} />
        ))}
      </div>
      {conversations?.data?.length && conversations?.data?.length > 0 ? (
        conversations?.meta?.lastPage &&
        conversations?.meta?.lastPage > 1 && (
          <Pagination
            total={conversations?.meta?.lastPage}
            value={conversations?.meta?.currentPage}
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

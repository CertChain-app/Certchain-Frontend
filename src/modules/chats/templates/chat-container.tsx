"use client"

import { SocketProvider } from "@/hooks/use-socket"
import { ChatTemplate } from "@/modules/chats/templates/chat"
import { useUserSession } from "@/modules/users/auth/queries/use-user-session"
import { Loader } from "lucide-react"

export default function ChatContainer({
  conversationId,
}: {
  conversationId: string
}) {
  const { user, isLoading } = useUserSession()
  return (
    <SocketProvider url={`${process.env.NEXT_PUBLIC_API_URL}/chat`}>
      {isLoading ? (
        <div className='flex justify-center items-center h-screen'>
          <Loader />
        </div>
      ) : (
        <ChatTemplate conversationId={conversationId} userId={user?.id} />
      )}
    </SocketProvider>
  )
}

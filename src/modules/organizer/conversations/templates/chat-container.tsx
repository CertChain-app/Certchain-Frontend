"use client"

import { SocketProvider } from "@/hooks/use-socket"
import { useSession } from "@/modules/organizer-dashboard/auth/queries/use-session"
import { Loader } from "lucide-react"
import { ChatTemplate } from "./chat"

export default function OrganizerChatContainer({
  conversationId,
}: {
  conversationId: string
}) {
  const { user, isLoading } = useSession()
  return (
    <SocketProvider url={`${process.env.NEXT_PUBLIC_API_URL}/chat`}>
      {isLoading ? (
        <div className='flex justify-center items-center h-screen'>
          <Loader />
        </div>
      ) : (
        <ChatTemplate conversationId={conversationId} teamMemberId={user?.id} />
      )}
    </SocketProvider>
  )
}

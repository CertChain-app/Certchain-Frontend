import { api } from "@/api"
import { useSocket } from "@/hooks/use-socket"
import { IMessage } from "@/modules/types/models"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"

interface UseChatProps {
  conversationId: string
  userId?: string
  teamMemberId?: string
}

export const useChat = ({
  conversationId,
  userId,
  teamMemberId,
}: UseChatProps) => {
  const { socket, isConnected } = useSocket()
  const queryClient = useQueryClient()
  const [isTyping, setIsTyping] = useState(false)

  // Fetch conversation details
  const { data: messages, isLoading } = useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: async () => {
      const response = await api.user.conversation.getMessages(conversationId, {
        page: 1,
        limit: 100,
      })
      return response.data
    },
  })

  // Send message mutation
  const { mutate: sendMessage } = useMutation<void, Error, string>({
    mutationFn: (content: string) => {
      if (!socket || !isConnected) {
        throw new Error("Socket not connected")
      }
      socket.emit("send_message", {
        conversationId,
        content,
        userId,
        teamMemberId,
      })
      return Promise.resolve()
    },
  })

  // Socket event handlers
  useEffect(() => {
    if (!socket || !isConnected) return

    // Join conversation room
    socket.emit("join_conversation", {
      conversationId,
      userId,
      teamMemberId,
    })

    // Listen for new messages
    socket.on("new_message", (message: IMessage) => {
      queryClient.setQueryData<IMessage[]>(
        ["conversation", conversationId],
        (old) => {
          if (!old) return old
          const messages = [...(old || []), message].sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          return messages
        }
      )
    })

    // Listen for typing events
    socket.on(
      "user_typing",
      ({
        isTyping: typing,
        userId: typingUserId,
        teamMemberId: typingTeamMemberId,
      }: {
        isTyping: boolean
        userId?: string
        teamMemberId?: string
      }) => {
        // Don't show typing indicator if it's the current user
        if (typingUserId === userId || typingTeamMemberId === teamMemberId)
          return
        setIsTyping(typing)
      }
    )

    // Listen for errors
    socket.on("error", (error: { message: string }) => {
      console.error("Socket error:", error.message)
    })

    return () => {
      socket.emit("leave_conversation", {
        conversationId,
        userId,
        teamMemberId,
      })
      socket.off("new_message")
      socket.off("user_typing")
      socket.off("error")
    }
  }, [socket, isConnected, conversationId, userId, teamMemberId, queryClient])

  return {
    messages,
    isLoading,
    sendMessage,
    isTyping,
    isConnected,
  }
}

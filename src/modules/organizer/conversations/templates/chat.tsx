"use client"

import { Alert, Box, Loader, Paper } from "@mantine/core"
import { IconAlertCircle } from "@tabler/icons-react"
import { useEffect, useRef } from "react"
import { ChatInput } from "../components/chat-input"
import { MessageBubble } from "../components/message-bubble"
import { useChat } from "../queries/use-chat"

interface ChatTemplateProps {
  conversationId: string
  userId?: string
  teamMemberId?: string
  className?: string
}

export const ChatTemplate = ({
  conversationId,
  userId,
  teamMemberId,
  className,
}: ChatTemplateProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { messages, isLoading, sendMessage, isTyping, isConnected } = useChat({
    conversationId,
    userId,
    teamMemberId,
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  if (isLoading) {
    return (
      <Box className='flex items-center justify-center h-full'>
        <Loader size='lg' />
      </Box>
    )
  }

  return (
    <Paper
      className={`flex flex-col h-[calc(100vh-64px)] ${className || ""}`}
      radius={0}
    >
      {/* Connection Status */}
      {!isConnected && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title='Connection Lost'
          color='yellow'
          variant='light'
        >
          Reconnecting to chat...
        </Alert>
      )}

      {/* Messages Container */}
      <Box className='flex-1 overflow-y-auto p-4 space-y-4 min-h-0'>
        {messages?.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && (
          <Box className='text-sm text-gray-500 italic'>
            Someone is typing...
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Chat Input */}
      <ChatInput onSendMessage={sendMessage} isLoading={!isConnected} />
    </Paper>
  )
}

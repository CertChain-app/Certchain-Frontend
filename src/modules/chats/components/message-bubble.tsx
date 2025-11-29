import { cn } from "@/lib/utils"
import { IMessage } from "@/modules/types/models"
import { useUserSession } from "@/modules/users/auth/queries/use-user-session"
import { Avatar, Paper } from "@mantine/core"
import dayjs from "dayjs"
import { Bot } from "lucide-react"
import { useMemo } from "react"

interface MessageBubbleProps {
  message: IMessage
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const { user } = useUserSession()
  const isOwnMessage = useMemo(() => {
    return message.sender?.userId === user?.id
  }, [message.sender?.userId, user?.id])

  const isAiMessage = message.isAi

  console.log(message)
  return (
    <div
      className={cn(
        "flex w-full gap-2 mb-4",
        isOwnMessage ? "flex-row-reverse" : "flex-row"
      )}
    >
      {isAiMessage ? (
        <div className='w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center'>
          <Bot className='w-5 h-5 text-blue-500' />
        </div>
      ) : (
        <Avatar
          size='sm'
          src={(message.sender?.user?.avatar as string) || null}
          radius='xl'
        >
          {message.sender?.user?.firstName?.[0] ||
            message.sender?.teamMember?.name?.[0] ||
            "?"}
        </Avatar>
      )}
      <div
        className={cn(
          "flex flex-col max-w-[70%]",
          isOwnMessage ? "items-end" : "items-start"
        )}
      >
        <div className='flex items-center gap-2'>
          <span className='text-sm font-medium text-gray-700'>
            {isAiMessage
              ? "Certchain Assistant"
              : isOwnMessage
              ? "You"
              : message.sender?.user?.firstName &&
                message.sender?.user?.lastName
              ? `${message.sender.user.firstName} ${message.sender.user.lastName}`
              : message.sender?.teamMember?.name || "Unknown"}
          </span>
          <span className='text-xs text-gray-500'>
            {dayjs(message.createdAt).format("HH:mm")}
          </span>
        </div>
        <Paper
          className={cn(
            "mt-1 px-4 py-2",
            isOwnMessage
              ? "bg-blue-500 text-white"
              : isAiMessage
              ? "bg-blue-100 text-gray-900"
              : "bg-gray-100 text-gray-900"
          )}
          radius='lg'
          shadow='sm'
        >
          {message.content}
        </Paper>
      </div>
    </div>
  )
}

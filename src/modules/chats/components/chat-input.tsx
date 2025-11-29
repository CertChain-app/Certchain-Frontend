import { ActionIcon, Textarea } from "@mantine/core"
import { IconSend } from "@tabler/icons-react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { KeyboardEvent, useEffect, useRef, useState } from "react"

interface ChatInputProps {
  onSendMessage: (content: string) => void
  isLoading?: boolean
}

export const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState("")

  const [error, setError] = useState<string | null>(null)

  const inputRef = useRef<HTMLTextAreaElement>(null)

  const profanityCheckMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post("https://vector.profanity.dev", {
        message,
      })
      return response.data
    },
    onSuccess: (data) => {
      console.log(data)
      if (data.isProfanity) {
        setError("Please refrain from using profane language")
      } else {
        onSendMessage(message.trim())
        setMessage("")
      }
    },
    onError: (error) => {
      console.log(error)
    },
  })

  useEffect(() => {
    // Focus the input when component mounts
    inputRef.current?.focus()
  }, [])

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      profanityCheckMutation.mutate()
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className='flex items-end gap-2 p-4 border-t bg-white'>
      <Textarea
        ref={inputRef}
        value={message}
        error={error}
        onChange={(e) => {
          setMessage(e.currentTarget.value)
          setError(null)
        }}
        onKeyDown={handleKeyPress}
        placeholder='Type a message...'
        className='flex-1'
        minRows={2}
        maxRows={4}
        autosize
        disabled={isLoading}
      />
      <ActionIcon
        onClick={handleSend}
        disabled={!message.trim() || isLoading}
        variant='filled'
        color='blue'
        size='lg'
      >
        <IconSend size={18} />
      </ActionIcon>
    </div>
  )
}

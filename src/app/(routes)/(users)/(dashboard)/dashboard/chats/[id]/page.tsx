import ChatContainer from "@/modules/chats/templates/chat-container"

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ChatContainer conversationId={id} />
}

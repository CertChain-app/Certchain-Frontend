import OrganizerChatContainer from "@/modules/organizer/conversations/templates/chat-container"

export default async function OrganizerConversationPage({
  params,
}: {
  params: Promise<{ conversationId: string }>
}) {
  const { conversationId } = await params
  return <OrganizerChatContainer conversationId={conversationId} />
}

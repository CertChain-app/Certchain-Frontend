import { IConversation, IMessage } from "@/modules/types/models"
import { CrudClient } from "../templates/CrudClient"
import { IApiParams } from "../types"

export class OrganizerConversationClient extends CrudClient<IConversation> {
  constructor() {
    super("organizers/conversation")
  }

  async getConversations() {
    const response = await this.get<IConversation[]>(`/`)
    return response.data
  }

  async getConversation(id: string) {
    const response = await this.get<IConversation>(`/${id}`)
    return response.data
  }

  async getMessages(conversationId: string, params: IApiParams) {
    const response = await this.get<IMessage[]>(`/${conversationId}/messages`, {
      params,
    })
    return response.data
  }

  async markAsRead(conversationId: string) {
    const response = await this.post(`/${conversationId}/read`)
    return response.data
  }
}

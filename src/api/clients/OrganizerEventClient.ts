import { ICertificate, IEvent, IUserEvent } from "@/modules/types"
import { CrudClient } from "../templates/CrudClient"
import { IApiParams } from "../types"

export class OrganizerEventClient extends CrudClient<IEvent> {
  constructor() {
    super("organizers/event")
  }

  async getJoinees(eventId: string, params: IApiParams) {
    return this.get<IUserEvent[]>(`/${eventId}/joinees`, {
      params,
    })
  }

  async getCertificates(eventId: string, params: IApiParams) {
    return this.get<ICertificate[]>(`/${eventId}/certificates`, {
      params,
    })
  }

  async markAsCompleted(eventId: string) {
    return this.put(`/${eventId}/mark-as-completed`, {})
  }
}

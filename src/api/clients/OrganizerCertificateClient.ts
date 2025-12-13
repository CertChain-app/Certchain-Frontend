import { ICertificate } from "@/modules/types"
import { CrudClient } from "../templates/CrudClient"
import { IApiParams } from "../types"

export class OrganizerCertificateClient extends CrudClient<ICertificate> {
  constructor() {
    super("organizer/certificate")
  }

  async findAll(eventId: string, params: IApiParams) {
    return this.get<ICertificate[]>(`/${eventId}`, {
      params,
    })
  }

  async createBulk(eventId: string) {
    return this.post(`/bulk/${eventId}`, {})
  }

  async createBulkSelected(eventId: string, userIds: string[]) {
    return this.post(`/bulk-selected/${eventId}`, { userIds })
  }
}

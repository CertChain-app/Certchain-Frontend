import { BanUserFromEventSchema } from "@/modules/organizer-dashboard/events/ban-forms/schema"
import { IUserEvent } from "@/modules/types"
import { CrudClient } from "../templates/CrudClient"

export class OrganizerUserEventClient extends CrudClient<IUserEvent> {
  constructor() {
    super("organizer/user-event")
  }

  ban(id: string, data: BanUserFromEventSchema) {
    return this.post(`/${id}/ban`, data)
  }

  unban(id: string) {
    return this.post(`/${id}/unban`)
  }
}

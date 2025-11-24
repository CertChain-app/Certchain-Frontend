import { IUserEvent } from "@/modules/types"
import { CrudClient } from "../templates/CrudClient"

export class UserUserEventClient extends CrudClient<IUserEvent> {
  constructor() {
    super("user/user-event")
  }

  isJoined(id: string) {
    return this.get<boolean>(`/${id}/is-joined`)
  }
}

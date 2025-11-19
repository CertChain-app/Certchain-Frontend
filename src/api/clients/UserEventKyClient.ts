import { IEvent } from "@/modules/types"
import { KyCrudClient } from "../templates/KyCrudClient"
import { IApiParams } from "../types"

export class UserEventKyClient extends KyCrudClient<IEvent> {
  constructor() {
    super("user/event")
  }

  getAll(organizerId: string, params: IApiParams) {
    return this.get("/", {
      searchParams: {
        ...params,
        organizerId,
      },
    })
  }
}

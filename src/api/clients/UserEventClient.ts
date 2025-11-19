import { IEvent, IUserEvent } from "@/modules/types"
import { CrudClient } from "../templates/CrudClient"
import { IApiParams } from "../types"

interface KhaltiResponse {
  paymentId: string
  paymentUrl: string
}

type JoinEventResponse = {
  [key: string]: unknown
} & {
  message: string
  data: IUserEvent | KhaltiResponse
}

export class UserEventClient extends CrudClient<IEvent> {
  constructor() {
    super("user/event")
  }

  getAll(organizerId: string, params: IApiParams) {
    return this.get<IEvent[]>("/", {
      params: {
        ...params,
        organizerId,
      },
    })
  }

  upcoming(params: IApiParams) {
    return this.get<IEvent[]>("/upcoming", {
      params: {
        ...params,
      },
    })
  }

  currentlyRunning(params: IApiParams) {
    return this.get<IEvent[]>("/currently-running", {
      params: {
        ...params,
      },
    })
  }

  join(eventId: string, paymentMethod?: string) {
    return this.post<JoinEventResponse>(`/${eventId}/join`, {
      eventId,
      paymentMethod,
    })
  }

  verifyPayment(pidx: string) {
    return this.post<
      {
        [key: string]: unknown
      } & IUserEvent
    >(`/verify-payment/${pidx}`)
  }
}

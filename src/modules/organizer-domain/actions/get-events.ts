import { UserEventKyClient } from "@/api/clients/UserEventKyClient"

export const getEvents = async (organizerId: string) => {
  const kyClient = new UserEventKyClient()
  const events = await kyClient.getAll(organizerId, {
    page: 1,
    limit: 100,
  })

  return events
}

export const getFeaturedEvent = async (organizerId: string) => {
  const kyClient = new UserEventKyClient()
  const events = await kyClient.getAll(organizerId, {
    page: 1,
    limit: 1,
    searchFields: "bool:isFeatured",
    search: "true",
  })

  return events
}

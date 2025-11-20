import { UserEventKyClient } from "@/api/clients/UserEventKyClient"

export async function getEvent(id: string) {
  const client = new UserEventKyClient()
  const event = await client.one(id, {})
  return event
}

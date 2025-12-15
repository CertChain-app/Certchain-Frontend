import { OrganizerKyClient } from "@/api/clients/OrganizersKyClient"

export const getOrganizerByDomain = async (domain: string) => {
  const client = new OrganizerKyClient()
  const response = await client.findByDomain(domain)
  return response
}

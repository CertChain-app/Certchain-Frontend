import { IOrganizer } from "@/modules/types"
import { KyCrudClient } from "../templates/KyCrudClient"

export class OrganizerKyClient extends KyCrudClient<IOrganizer> {
  constructor() {
    super("organizer")
  }

  findByDomain(domain: string) {
    console.log("findByDomain", domain)
    return this.get<IOrganizer>(`/by-domain/${domain}`)
  }
}

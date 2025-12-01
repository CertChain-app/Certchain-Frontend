import { IOrganizer } from "@/modules/types"
import { CrudClient } from "../templates/CrudClient"

export class OrganizersClient extends CrudClient<IOrganizer> {
  constructor() {
    super("organizer")
  }

  profile() {
    return this.get<IOrganizer>("/profile")
  }
}

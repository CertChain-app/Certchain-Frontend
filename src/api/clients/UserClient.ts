import { ICertificate, IUser } from "@/modules/types"
import { CrudClient } from "../templates/CrudClient"

export class UserClient extends CrudClient<IUser> {
  constructor() {
    super("users")
  }

  profile() {
    return this.get<IUser>("/me")
  }

  certificates() {
    return this.get<ICertificate[]>("/me/certificates")
  }
}

import { OrganizerForgotPasswordSchema } from "@/modules/organizer-dashboard/auth/form/forgot-password/schema"
import { OrganizerResetPasswordSchema } from "@/modules/organizer-dashboard/auth/form/reset-password/schema"
import { IUser } from "@/modules/types"
import { LoginSchema } from "@/modules/users/auth/forms/login/schema"
import { RegisterSchema } from "@/modules/users/auth/forms/register/schema"
import { CrudClient } from "../templates/CrudClient"

export class UserAuthClient extends CrudClient<IUser, RegisterSchema> {
  constructor() {
    super("users/auth")
  }

  async register(data: RegisterSchema) {
    return this.post("/register", data)
  }

  async session() {
    return this.get<{
      user: IUser
    }>("/session")
  }

  async login(data: LoginSchema) {
    return this.post("/login", data)
  }

  async forgotPassword(data: OrganizerForgotPasswordSchema) {
    return this.post("/forgot-password", data)
  }

  async resetPassword(data: OrganizerResetPasswordSchema) {
    return this.post("/reset-password", data)
  }

  async logout() {
    return this.post("/logout")
  }
}

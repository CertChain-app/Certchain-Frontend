import { OrganizerForgotPasswordSchema } from "@/modules/organizer-dashboard/auth/form/forgot-password/schema"
import { OrganizerLoginSchema } from "@/modules/organizer-dashboard/auth/form/login/schema"
import { OrganizerResetPasswordSchema } from "@/modules/organizer-dashboard/auth/form/reset-password/schema"
import { OrganizerRegisterSchema } from "@/modules/organizer/auth/form/schema"
import { OrganizationLoginSchema } from "@/modules/organizer/auth/organization-login-form/schema"
import { IOrganizer, ITeamMember } from "@/modules/types"
import { CrudClient } from "../templates/CrudClient"

export class OrganizerAuthClient extends CrudClient<IOrganizer> {
  constructor() {
    super("organizer/auth")
  }

  async signInWithOrganization(data: OrganizationLoginSchema) {
    return this.post<IOrganizer>("/sign-in-with-organization", data)
  }

  async register(data: OrganizerRegisterSchema) {
    return this.post<{
      organizer: IOrganizer
      teamMember: ITeamMember
    }>("/register", data)
  }

  async session() {
    return this.get<{
      teamMember: ITeamMember
    }>("/session")
  }

  async login(data: OrganizerLoginSchema) {
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

import { OrganizerAuthClient } from "./clients/OrganizerAuthClient"
import { OrganizerCertificateClient } from "./clients/OrganizerCertificateClient"
import { OrganizerConversationClient } from "./clients/OrganizerConversationClient"
import { OrganizerEventClient } from "./clients/OrganizerEventClient"
import { OrganizersClient } from "./clients/OrganizersClient"
import { OrganizerUserEventClient } from "./clients/OrganizerUserEventClient"
import { UserAuthClient } from "./clients/UserAuthClient"
import { UserConversationClient } from "./clients/UserConservationClient"
import { UserEventClient } from "./clients/UserEventClient"
import { UserUserEventClient } from "./clients/UserUserEventClient"

export const api = {
  organizer: {
    auth: new OrganizerAuthClient(),
    event: new OrganizerEventClient(),
    userEvent: new OrganizerUserEventClient(),
    certificate: new OrganizerCertificateClient(),
    conversation: new OrganizerConversationClient(),
  },
  user: {
    auth: new UserAuthClient(),
    event: new UserEventClient(),
    userEvent: new UserUserEventClient(),
    conversation: new UserConversationClient(),
  },
  organizers: new OrganizersClient(),
}

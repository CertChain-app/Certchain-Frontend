import { IOrganizer } from "@/modules/types"
import { createContext, useContext } from "react"

export const OrganizerDashboardContext = createContext<{
  organizer: IOrganizer | null
}>({
  organizer: null,
})

export const useOrganizerDashboardContext = () => {
  return useContext(OrganizerDashboardContext)
}

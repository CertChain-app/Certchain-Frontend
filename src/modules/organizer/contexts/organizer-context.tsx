"use client"

import { IEvent, IOrganizer } from "@/modules/types"
import { createContext, useContext } from "react"

export interface OrganizerProviderContextType {
  domain: string
  organizer: IOrganizer | null
  events: IEvent[]
  featuredEvent: IEvent | null
}

export const OrganizerProviderContext =
  createContext<OrganizerProviderContextType>({
    domain: "",
    organizer: null,
    events: [],
    featuredEvent: null,
  })

export const useOrganizerContext = () => {
  const context = useContext(OrganizerProviderContext)
  if (!context) {
    throw new Error(
      "useOrganizerContext must be used within a OrganizerProvider"
    )
  }
  return context
}

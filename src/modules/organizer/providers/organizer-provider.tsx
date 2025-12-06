"use client"

import { type FC } from "react"
import {
  OrganizerProviderContext,
  OrganizerProviderContextType,
} from "../contexts/organizer-context"

type OrganizerProviderProps = {
  children: React.ReactNode
} & OrganizerProviderContextType

const OrganizerProvider: FC<OrganizerProviderProps> = ({
  domain,
  organizer,
  children,
  events,
  featuredEvent,
}) => {
  return (
    <OrganizerProviderContext.Provider
      value={{ domain, organizer, events, featuredEvent }}
    >
      {children}
    </OrganizerProviderContext.Provider>
  )
}

export default OrganizerProvider

"use client"

import { Loader } from "@mantine/core"
import { FC } from "react"
import { OrganizerDashboardContext } from "../context/organizer-dashboard-context"
import { useOrganizer } from "../queries/use-organizer"

type OrganizerDashboardProviderProps = {
  children: React.ReactNode
  id: string
}

export const OrganizerDashboardProvider: FC<
  OrganizerDashboardProviderProps
> = ({ children, id }) => {
  const { data: organizer, isLoading } = useOrganizer(id)

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-[calc(50vh)]'>
        <Loader />
      </div>
    )
  }
  return (
    <OrganizerDashboardContext.Provider
      value={{ organizer: organizer?.data?.data ?? null }}
    >
      {children}
    </OrganizerDashboardContext.Provider>
  )
}

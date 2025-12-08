import { OrganizerDashboardProvider } from "@/modules/organizer-dashboard/common/providers/organizer-dashboard-provider"
import type { FC } from "react"

interface OrganizerIndividualLayoutProps {
  children: React.ReactNode
  params: Promise<{ id: string }>
}

const OrganizerIndividualLayout: FC<OrganizerIndividualLayoutProps> = async ({
  children,
  params,
}) => {
  const { id } = await params
  return (
    <OrganizerDashboardProvider id={id}>{children}</OrganizerDashboardProvider>
  )
}

export default OrganizerIndividualLayout

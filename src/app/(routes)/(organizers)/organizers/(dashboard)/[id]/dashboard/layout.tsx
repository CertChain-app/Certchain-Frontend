import OrganizerProtectedRoute from "@/modules/organizer-dashboard/auth/components/protected-route"
import OrganizerDashboardLayoutTemplate from "@/modules/organizer-dashboard/dashboard/layouts/organizer-dashboard-layout"
import type { FC } from "react"

interface OrganizerDashboardLayoutProps {
  children: React.ReactNode
}

const OrganizerDashboardLayout: FC<OrganizerDashboardLayoutProps> = ({
  children,
}) => {
  return (
    <OrganizerDashboardLayoutTemplate>
      <OrganizerProtectedRoute>{children}</OrganizerProtectedRoute>
    </OrganizerDashboardLayoutTemplate>
  )
}

export default OrganizerDashboardLayout

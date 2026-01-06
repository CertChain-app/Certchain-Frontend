import OrganizerProtectedRoute from "@/modules/organizer-dashboard/auth/components/protected-route"
import { OrganizerDashboardProvider } from "@/modules/organizer-dashboard/common/providers/organizer-dashboard-provider"
import OrganizerDashboardLayoutTemplate from "@/modules/organizer-dashboard/dashboard/layouts/organizer-dashboard-layout"

interface OrganizerDashboardLayoutProps {
  children: React.ReactNode
  params: Promise<{ id: string }>
}

const OrganizerDashboardLayout = async ({
  children,
  params,
}: OrganizerDashboardLayoutProps) => {
  const { id } = await params

  return (
    <OrganizerDashboardProvider id={id}>
      <OrganizerDashboardLayoutTemplate>
        <OrganizerProtectedRoute>{children}</OrganizerProtectedRoute>
      </OrganizerDashboardLayoutTemplate>
    </OrganizerDashboardProvider>
  )
}

export default OrganizerDashboardLayout

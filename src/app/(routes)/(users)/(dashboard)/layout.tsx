import UserProtectedRoute from "@/modules/users/auth/components/protected-route"
import DashboardLayoutTemplate from "@/modules/users/dashboard/layouts/dashboard-layout"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <UserProtectedRoute>
      <DashboardLayoutTemplate>{children}</DashboardLayoutTemplate>
    </UserProtectedRoute>
  )
}

export default DashboardLayout

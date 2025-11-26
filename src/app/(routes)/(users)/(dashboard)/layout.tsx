import DashboardLayoutTemplate from "@/modules/users/dashboard/layouts/dashboard-layout"
import type { FC } from "react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return <DashboardLayoutTemplate>{children}</DashboardLayoutTemplate>
}

export default DashboardLayout

import OrganizerProtectedRoute from "@/modules/organizer-dashboard/auth/components/protected-route"
import OrganizerDashboardLayoutTemplate from "@/modules/organizer-dashboard/dashboard/layouts/organizer-dashboard-layout"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface OrganizerDashboardLayoutProps {
  children: React.ReactNode
  params: Promise<{ id: string }>
}

const OrganizerDashboardLayout = async ({
  children,
  params,
}: OrganizerDashboardLayoutProps) => {
  const { id } = await params
  const cookieStore = await cookies()
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ")
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_BASE_URL ?? ""

  const response = await fetch(`${apiBase}/organizer/auth/session`, {
    headers: {
      cookie: cookieHeader,
    },
    cache: "no-store",
  })

  if (!response.ok) {
    redirect(`/organizers/${id}/auth/login`)
  }

  return (
    <OrganizerDashboardLayoutTemplate>
      <OrganizerProtectedRoute>{children}</OrganizerProtectedRoute>
    </OrganizerDashboardLayoutTemplate>
  )
}

export default OrganizerDashboardLayout

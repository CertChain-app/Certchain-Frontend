import DashboardLayoutTemplate from "@/modules/users/dashboard/layouts/dashboard-layout"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ")
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_BASE_URL ?? ""

  const response = await fetch(`${apiBase}/users/auth/session`, {
    headers: {
      cookie: cookieHeader,
    },
    cache: "no-store",
  })

  if (!response.ok) {
    redirect("/auth/login")
  }

  return <DashboardLayoutTemplate>{children}</DashboardLayoutTemplate>
}

export default DashboardLayout

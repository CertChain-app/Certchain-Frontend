import OrganizerResetPasswordTemplate from "@/modules/organizer-dashboard/auth/templates/reset-password"
import type { FC } from "react"

interface OrganizerResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>
}

const OrganizerResetPasswordPage: FC<OrganizerResetPasswordPageProps> = async ({
  searchParams,
}) => {
  const sp = await searchParams
  const token = sp.token
  if (!token) {
    return <div>Invalid token</div>
  }
  return <OrganizerResetPasswordTemplate token={token} />
}

export default OrganizerResetPasswordPage

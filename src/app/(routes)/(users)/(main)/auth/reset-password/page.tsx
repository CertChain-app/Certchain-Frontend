import ResetPasswordTemplate from "@/modules/users/auth/templates/reset-password"
import type { FC } from "react"

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>
}

const ResetPasswordPage: FC<ResetPasswordPageProps> = async ({
  searchParams,
}) => {
  const sp = await searchParams
  const token = sp.token
  if (!token) {
    return <div>Invalid token</div>
  }
  return <ResetPasswordTemplate token={token} />
}

export default ResetPasswordPage

import BaseUserLayout from "@/modules/users/common/layouts/base"
import type { FC } from "react"

interface UserLayoutProps {
  children: React.ReactNode
}

const UserLayout: FC<UserLayoutProps> = ({ children }) => {
  return <BaseUserLayout>{children}</BaseUserLayout>
}

export default UserLayout

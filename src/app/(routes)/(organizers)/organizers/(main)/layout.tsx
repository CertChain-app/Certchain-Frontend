import BaseOrganizerLayout from "@/modules/organizer/common/layouts/base"
import type { FC } from "react"

interface OrganizerLayoutProps {
  children: React.ReactNode
}

const OrganizerLayout: FC<OrganizerLayoutProps> = ({ children }) => {
  return <BaseOrganizerLayout>{children}</BaseOrganizerLayout>
}

export default OrganizerLayout

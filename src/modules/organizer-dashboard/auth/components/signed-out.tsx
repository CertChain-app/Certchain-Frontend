import { Loader } from "@mantine/core"
import type { FC } from "react"
import { useSession } from "../queries/use-session"

interface OrganizerSignedOutProps {
  children: React.ReactNode
  loader?: React.ReactNode
}

const OrganizerSignedOut: FC<OrganizerSignedOutProps> = ({
  children,
  loader,
}) => {
  const { isAuthenticated, isLoading } = useSession()

  if (isLoading) return loader || <Loader size='sm' />
  if (isAuthenticated) return null

  return <>{children}</>
}

export default OrganizerSignedOut

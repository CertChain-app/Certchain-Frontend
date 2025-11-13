import { Loader } from "@mantine/core"
import type { FC } from "react"
import { useUserSession } from "../queries/use-user-session"

interface UserSignedOutProps {
  children: React.ReactNode
  loader?: React.ReactNode
}

const UserSignedOut: FC<UserSignedOutProps> = ({ children, loader }) => {
  const { isAuthenticated, isLoading } = useUserSession()

  if (isLoading) return loader || <Loader size='sm' />
  if (isAuthenticated) return null

  return <>{children}</>
}

export default UserSignedOut

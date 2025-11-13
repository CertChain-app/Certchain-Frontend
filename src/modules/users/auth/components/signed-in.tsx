import { IUser } from "@/modules/types"
import { Loader } from "@mantine/core"
import type { FC } from "react"
import { useUserSession } from "../queries/use-user-session"

interface UserSignedInProps {
  children: (user: IUser | undefined, isLoading: boolean) => React.ReactNode
  loader?: React.ReactNode
}

const UserSignedIn: FC<UserSignedInProps> = ({ children, loader }) => {
  const { isAuthenticated, isLoading, user } = useUserSession()

  if (isLoading) return loader || <Loader size='sm' />
  if (!isAuthenticated) return null

  return children(user, isLoading)
}

export default UserSignedIn

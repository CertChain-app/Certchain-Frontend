import { ITeamMember } from "@/modules/types"
import { Loader } from "@mantine/core"
import type { FC } from "react"
import { useSession } from "../queries/use-session"

interface OrganizerSignedInProps {
  children: (
    user: ITeamMember | undefined,
    isLoading: boolean
  ) => React.ReactNode
  loader?: React.ReactNode
}

const OrganizerSignedIn: FC<OrganizerSignedInProps> = ({
  children,
  loader,
}) => {
  const { isAuthenticated, isLoading, user } = useSession()

  if (isLoading) return loader || <Loader size='sm' />
  if (!isAuthenticated) return null

  return children(user, isLoading)
}

export default OrganizerSignedIn

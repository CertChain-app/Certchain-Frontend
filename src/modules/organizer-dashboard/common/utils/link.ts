import { useSession } from "../../auth/queries/use-session"

export const useLink = () => {
  const { user } = useSession()

  const getLink = (link: string) => {
    return `/organizers/${user?.organizerId}/${link}`
  }

  const getRootLink = (link: string) => {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/${link}`
  }

  return { getLink, getRootLink }
}

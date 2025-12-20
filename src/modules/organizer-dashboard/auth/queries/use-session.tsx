import { api } from "@/api"
import { useQuery } from "@tanstack/react-query"

export const useSession = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["session"],
    queryFn: () => api.organizer.auth.session(),
    retry: false,
  })

  const user = isError ? undefined : data?.data?.data?.teamMember

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
  }
}

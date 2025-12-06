import { api } from "@/api"
import { useQuery } from "@tanstack/react-query"

export const useSession = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["session"],
    queryFn: () => api.organizer.auth.session(),
  })

  return {
    user: data?.data?.data?.teamMember,
    isLoading,
    error,
    isAuthenticated: !!data?.data?.data?.teamMember,
  }
}

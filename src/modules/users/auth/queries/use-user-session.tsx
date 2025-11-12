import { api } from "@/api"
import { useQuery } from "@tanstack/react-query"

export const useUserSession = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user-session"],
    queryFn: () => api.user.auth.session(),
  })

  return {
    user: data?.data?.data?.user,
    isLoading,
    error,
    isAuthenticated: !!data?.data?.data?.user,
  }
}

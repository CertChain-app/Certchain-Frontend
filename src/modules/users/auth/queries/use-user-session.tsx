import { api } from "@/api"
import { useQuery } from "@tanstack/react-query"

export const useUserSession = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user-session"],
    queryFn: () => api.user.auth.session(),
    refetchOnWindowFocus: false,
    refetchOnMount: "always",
    refetchOnReconnect: false,
    staleTime: 60 * 1000,
    retry: false,
  })

  const user = data?.data?.data?.user

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
  }
}

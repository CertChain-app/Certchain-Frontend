import { api } from "@/api"
import { useQuery } from "@tanstack/react-query"

export const useUserSession = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["user-session"],
    queryFn: () => api.user.auth.session(),
    retry: false,
  })

  const user = isError ? undefined : data?.data?.data?.user

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
  }
}

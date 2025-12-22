import { api } from "@/api"
import { useQuery } from "@tanstack/react-query"

export const useCertificates = () => {
  return useQuery({
    queryKey: ["user-certificates"],
    queryFn: () => api.user.profile.certificates(),
  })
}

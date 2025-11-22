import { api } from "@/api"
import { useQuery } from "@tanstack/react-query"

export const useCheckPaymentStatus = (pidx: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ["payment-status", pidx],
    queryFn: () => api.user.event.verifyPayment(pidx),
    enabled,
  })
}

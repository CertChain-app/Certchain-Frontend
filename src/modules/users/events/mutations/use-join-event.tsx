import { api } from "@/api"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"

export const useJoinEvent = () => {
  return useMutation({
    mutationFn: ({
      eventId,
      paymentMethod,
    }: {
      eventId: string
      paymentMethod?: string
    }) => {
      return api.user.event.join(eventId, paymentMethod)
    },
    onSuccess: (res) => {
      console.log("Khalti Response", res)
      if (res?.data?.data?.paymentId) {
        window.location.href = res.data?.data?.paymentUrl as string
      } else {
        toast.success(res.data?.message)
      }
    },
  })
}

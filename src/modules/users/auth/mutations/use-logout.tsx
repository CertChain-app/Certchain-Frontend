"use client"

import { api } from "@/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const useLogout = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: () => api.user.auth.logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user-session"] })
      router.replace("/auth/login")
    },
  })
}

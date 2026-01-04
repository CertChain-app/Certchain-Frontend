"use client"

import { api } from "@/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

const ACCESS_TOKEN_KEY = "cc_access_token"

export const useLogout = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: () => api.user.auth.logout(),
    onSuccess: () => {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(ACCESS_TOKEN_KEY)
      }
      queryClient.removeQueries({ queryKey: ["user-session"] })
      router.replace("/auth/login")
    },
  })
}

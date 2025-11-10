import { api } from "@/api"
import { useMutation } from "@tanstack/react-query"
import { RegisterSchema } from "../forms/register/schema"

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterSchema) => api.user.auth.register(data),
  })
}

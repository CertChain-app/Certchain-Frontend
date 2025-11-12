import { z } from "zod"

export const resetPasswordSchema = z
  .object({
    token: z.string(),
    password: z.string().min(8, {
      message: "The password field must be at least 8 characters",
    }),
    passwordConfirmation: z.string().min(8, {
      message: "The password confirmation field must be at least 8 characters",
    }),
    email: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  })

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>

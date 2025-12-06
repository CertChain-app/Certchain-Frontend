import { z } from "zod"

export const organizerForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "The email field must be a valid email address",
  }),
})

export type OrganizerForgotPasswordSchema = z.infer<
  typeof organizerForgotPasswordSchema
>

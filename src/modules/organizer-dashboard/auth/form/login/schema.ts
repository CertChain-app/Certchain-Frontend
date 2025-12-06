import { z } from "zod"

export const organizerLoginSchema = z.object({
  email: z.string().email({
    message: "The email field must be a valid email address",
  }),
  password: z.string().min(8, {
    message: "The password field must be at least 8 characters",
  }),
  organizerId: z.string(),
})

export type OrganizerLoginSchema = z.infer<typeof organizerLoginSchema>

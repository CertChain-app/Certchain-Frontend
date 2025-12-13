import { z } from "zod"

export const banUserFromEventSchema = z.object({
  reason: z.string().min(1),
})

export type BanUserFromEventSchema = z.infer<typeof banUserFromEventSchema>

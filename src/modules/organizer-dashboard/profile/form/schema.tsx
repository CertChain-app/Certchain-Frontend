import { OrganizerType } from "@/modules/types"
import { z } from "zod"

export const organizerProfileSchema = z.object({
  logo: z.string().optional(),
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).optional(),
  type: z.nativeEnum(OrganizerType).optional(),
  subdomain: z.string().optional(),
})

export type OrganizerProfileSchema = z.infer<typeof organizerProfileSchema>

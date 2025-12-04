import { z } from "zod"

export const organizationLoginSchema = z.object({
  subdomain: z.string().min(3),
})

export type OrganizationLoginSchema = z.infer<typeof organizationLoginSchema>

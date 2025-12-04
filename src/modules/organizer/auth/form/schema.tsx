import { z } from "zod"

export enum OrganizerType {
  INSTITUTE = "INSTITUTE",
  ORGANIZATION = "ORGANIZATION",
  INDIVIDUAL = "INDIVIDUAL",
  COLLEGE = "COLLEGE",
  SCHOOL = "SCHOOL",
  OTHER = "OTHER",
}

export const organizerRegisterSchema = z.object({
  name: z.string().min(1, { message: "The name field is required" }),
  organizationContactEmail: z
    .string()
    .email({ message: "The email field must be a valid email address" })
    .min(1, { message: "The email field is required" }),
  organizationName: z
    .string()
    .min(1, { message: "The organization name field is required" }),
  email: z
    .string()
    .email({ message: "The email field must be a valid email address" })
    .min(1, { message: "The email field is required" }),
  phone: z.string().min(10, {
    message: "The phone field must be at least 10 characters long",
  }),
  password: z.string().min(8, {
    message: "The password field must be at least 8 characters long",
  }),
  type: z.nativeEnum(OrganizerType, {
    message: "The type field is required",
  }),
  subdomain: z
    .string()
    .min(3, {
      message: "The subdomain field must be at least 3 characters long",
    })
    .regex(/^[a-z0-9-]+$/, {
      message:
        "The subdomain field can only contain lowercase letters, numbers and hyphens",
    }),
})

export type OrganizerRegisterSchema = z.infer<typeof organizerRegisterSchema>

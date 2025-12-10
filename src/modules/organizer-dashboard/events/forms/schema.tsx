import { z } from "zod"

export const eventSchema = z
  .object({
    handle: z
      .string()
      .min(1, "Handle is required")
      .regex(/^[a-z0-9-]+$/, {
        message:
          "Handle must be in lowercase and can only contain letters, numbers, and hyphens",
      }),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    startDate: z.date({
      required_error: "Start date is required",
    }),
    endDate: z.date({
      required_error: "End date is required",
    }),
    banner: z.string().min(1, "Banner image is required"),
    type: z.enum(["ONLINE", "IN_PERSON"], {
      required_error: "Event type is required",
    }),
    isPaid: z.boolean().optional(),
    cost: z.number().optional(),
    link: z.string().optional(),
    password: z.string().optional(),

    // Physical location details
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    pincode: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),

    isFeatured: z.boolean().optional(),

    schedules: z
      .array(
        z.object({
          title: z.string().min(1, "Title is required"),
          description: z.string().optional(),
          date: z.date({
            required_error: "Date is required",
          }),
        })
      )
      .optional(),
    faqs: z.array(
      z.object({
        question: z.string().min(1, "Question is required"),
        answer: z.string().min(1, "Answer is required"),
      })
    ),
  })
  .refine(
    (data) => {
      if (data.isPaid && !data.cost) {
        return false
      }
      return true
    },
    {
      message: "Cost is required if event is paid",
      path: ["cost"],
    }
  )
  .refine(
    (data) => {
      if (data.type === "IN_PERSON" && !data.address) {
        return false
      }
      return true
    },
    {
      message: "Address is required for in-person events",
      path: ["address"],
    }
  )
  .refine(
    (data) => {
      if (data.type === "IN_PERSON" && !data.city) {
        return false
      }
      return true
    },
    {
      message: "City is required for in-person events",
      path: ["city"],
    }
  )
  .refine(
    (data) => {
      if (data.type === "IN_PERSON" && !data.state) {
        return false
      }
      return true
    },
    {
      message: "State is required for in-person events",
      path: ["state"],
    }
  )
  .refine(
    (data) => {
      if (data.type === "IN_PERSON" && !data.country) {
        return false
      }
      return true
    },
    {
      message: "Country is required for in-person events",
      path: ["country"],
    }
  )
  .refine(
    (data) => {
      if (data.type === "IN_PERSON" && !data.pincode) {
        return false
      }
      return true
    },
    {
      message: "Pincode is required for in-person events",
      path: ["pincode"],
    }
  )
  .refine(
    (data) => {
      if (data.type === "ONLINE" && !data.link) {
        return false
      }
      return true
    },
    {
      message: "Meeting link is required for online events",
      path: ["link"],
    }
  )

export type EventSchema = z.infer<typeof eventSchema>

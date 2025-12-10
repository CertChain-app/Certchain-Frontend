"use client"

import { IApiError } from "@/api/types"
import { populateError } from "@/modules/core/lib/form"
import { IEvent } from "@/modules/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@mantine/core"
import { useQueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useLink } from "../../common/utils/link"
import { useCreateEvent } from "../mutations/use-create-event"
import { useUpdateEvent } from "../mutations/use-update-event"
import { eventSchema, type EventSchema } from "./schema"
import EventDescriptionFormSection from "./sections/description"
import FAQFormSection from "./sections/faq"
import GeneralDetailFormSection from "./sections/general-detail"
import ScheduleFormSection from "./sections/schedule"

interface EventFormProps {
  event?: IEvent
}

export function EventForm({ event }: EventFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { getLink } = useLink()
  const form = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      handle: event?.handle || "",
      title: event?.title || "",
      description: event?.description || "",
      startDate: event?.startDate
        ? dayjs(event.startDate).toDate()
        : dayjs().toDate(),
      endDate: event?.endDate
        ? dayjs(event.endDate).toDate()
        : dayjs().add(1, "day").toDate(),
      banner: event?.banner ? event.banner : "",
      type: event?.type || "IN_PERSON",
      isPaid: event?.isPaid || false,
      cost: event?.cost || 0,
      link: event?.link || "",
      password: event?.password || "",
      address: event?.address || "",
      city: event?.city || "",
      state: event?.state || "",
      country: event?.country || "",
      pincode: event?.pincode || "",
      isFeatured: event?.isFeatured || false,
      schedules:
        event?.schedules?.map((schedule) => ({
          title: schedule.title,
          description: schedule.description,
          date: dayjs(schedule.date).toDate(),
        })) || [],
      faqs:
        event?.faqs?.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        })) || [],
    },
  })

  const createEventMutation = useCreateEvent()
  const updateEventMutation = useUpdateEvent()

  const handleSubmit = (values: EventSchema) => {
    if (event) {
      updateEventMutation.mutate(
        {
          id: event.id,
          event: values,
        },
        {
          onSuccess: () => {
            toast.success("Event updated successfully")
            router.push(getLink("dashboard/events"))
            queryClient.invalidateQueries({ queryKey: ["events"] })
            queryClient.invalidateQueries({ queryKey: ["event", event?.id] })
          },
        }
      )
    } else {
      createEventMutation.mutate(
        {
          ...values,
        },
        {
          onSuccess: () => {
            toast.success("Event created successfully")
            router.push(getLink("dashboard/events"))
            queryClient.invalidateQueries({ queryKey: ["events"] })
          },
          onError: (err: Error) => {
            if ("isAxiosError" in err) {
              populateError(form, err as IApiError)
            }
          },
        }
      )
    }
  }

  return (
    <form className='space-y-3' onSubmit={form.handleSubmit(handleSubmit)}>
      <GeneralDetailFormSection form={form} />
      <EventDescriptionFormSection form={form} />
      <ScheduleFormSection form={form} />
      <FAQFormSection form={form} />

      <Button type='submit' loading={createEventMutation.isPending}>
        {event ? "Update Event" : "Create Event"}
      </Button>
    </form>
  )
}

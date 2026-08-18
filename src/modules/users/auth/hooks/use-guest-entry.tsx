"use client"

import { IApiError } from "@/api/types"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { useGuestLogin } from "../mutations/use-guest-login"

interface UseGuestEntryOptions {
  redirectTo?: string
  /** Called once the attempt settles, e.g. to close a mobile drawer. */
  onDone?: () => void
}

/**
 * Signs the visitor into the shared demo attendee account and drops them on
 * the dashboard. Shared by every guest-mode entry point so the toast copy and
 * redirect stay identical wherever it is offered.
 */
export const useGuestEntry = ({
  redirectTo = "/dashboard",
  onDone,
}: UseGuestEntryOptions = {}) => {
  const router = useRouter()
  const guestLogin = useGuestLogin()

  const start = () => {
    guestLogin.mutate(undefined, {
      onSuccess: () => {
        toast.success("You are browsing as a guest")
        router.push(redirectTo)
      },
      onError: (error) => {
        const e = error as IApiError
        toast.error(
          e.response?.data?.message ?? "Guest mode is unavailable right now"
        )
      },
      onSettled: () => onDone?.(),
    })
  }

  return { start, isPending: guestLogin.isPending }
}

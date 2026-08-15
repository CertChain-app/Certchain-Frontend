/**
 * Guest mode: one-click sign-in as a pre-seeded demo account so the app can be
 * explored without registering.
 *
 * These emails must match GUEST_USER_EMAIL / GUEST_ORGANIZER_EMAIL on the API,
 * and are only used to recognise a guest session so the UI can label it.
 */
export const GUEST_USER_EMAIL =
  process.env.NEXT_PUBLIC_GUEST_USER_EMAIL ?? "guest.user@certchain.demo"

export const GUEST_ORGANIZER_EMAIL =
  process.env.NEXT_PUBLIC_GUEST_ORGANIZER_EMAIL ??
  "guest.organizer@certchain.demo"

export const isGuestEmail = (email?: string | null) =>
  !!email &&
  (email.toLowerCase() === GUEST_USER_EMAIL.toLowerCase() ||
    email.toLowerCase() === GUEST_ORGANIZER_EMAIL.toLowerCase())

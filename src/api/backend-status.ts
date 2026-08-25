/**
 * Tracks whether the API is taking long enough to look asleep rather than
 * busy.
 *
 * The API runs on Render's free tier, which spins the instance down after a
 * spell of inactivity. The request that wakes it can sit unanswered for the
 * better part of a minute, and while it does the app is indistinguishable
 * from broken: spinners that never resolve, or a bare "failed to load". This
 * gives the UI something honest to say in the meantime.
 *
 * A plain module-level store rather than context: the axios interceptors that
 * feed it are not React, and every consumer wants the same single value.
 */

/**
 * How long a request may run before we call it a cold start. Comfortably
 * above a warm round trip to Render, so ordinary requests never trip it.
 */
const SLOW_REQUEST_MS = 3500

type Listener = (waking: boolean) => void

const listeners = new Set<Listener>()

let pending = 0
let timer: ReturnType<typeof setTimeout> | null = null
let waking = false

const publish = (next: boolean) => {
  if (next === waking) return
  waking = next
  listeners.forEach((listener) => listener(waking))
}

const clearTimer = () => {
  if (!timer) return
  clearTimeout(timer)
  timer = null
}

export const isBackendWaking = () => waking

/** Server render has no requests in flight, so it is never waking. */
export const isBackendWakingOnServer = () => false

export const subscribeBackendWaking = (listener: Listener) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export const requestStarted = () => {
  pending += 1
  // One timer for the whole batch: the first slow request is what tells us
  // the instance is cold, and restarting it per request would keep pushing
  // the banner out of reach on a dashboard that fires several at once.
  if (!timer && !waking) {
    timer = setTimeout(() => {
      timer = null
      publish(true)
    }, SLOW_REQUEST_MS)
  }
}

export const requestSettled = () => {
  pending = Math.max(0, pending - 1)
  if (pending > 0) return
  clearTimer()
  publish(false)
}

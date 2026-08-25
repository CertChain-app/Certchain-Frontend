"use client"

import {
  isBackendWaking,
  isBackendWakingOnServer,
  subscribeBackendWaking,
} from "@/api/backend-status"
import { Loader, Text } from "@mantine/core"
import { useEffect, useState, useSyncExternalStore, type FC } from "react"

/**
 * How long the instance has to stay unreachable before we stop saying "a
 * moment" and admit it may be the full cold start.
 */
const STILL_WAITING_MS = 12000

/**
 * Explains the wait when the API is cold.
 *
 * The API sleeps on Render's free tier and can take the better part of a
 * minute to answer the request that wakes it. Without this the app just sits
 * on a spinner, which reads as broken rather than slow.
 */
const BackendWakingBanner: FC = () => {
  const waking = useSyncExternalStore(
    subscribeBackendWaking,
    isBackendWaking,
    isBackendWakingOnServer
  )
  const [stillWaiting, setStillWaiting] = useState(false)

  useEffect(() => {
    if (!waking) {
      setStillWaiting(false)
      return
    }
    const timer = setTimeout(() => setStillWaiting(true), STILL_WAITING_MS)
    return () => clearTimeout(timer)
  }, [waking])

  if (!waking) return null

  return (
    <div
      role='status'
      aria-live='polite'
      className='fixed inset-x-0 bottom-6 z-[1000] flex justify-center px-4 pointer-events-none'
    >
      <div className='pointer-events-auto flex items-center gap-3 rounded-xl border border-gray-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-md max-w-md'>
        <Loader size='sm' color='certchain' />
        <div>
          <Text size='sm' fw={600} className='text-gray-900'>
            Starting the server
          </Text>
          <Text size='xs' c='dimmed'>
            {stillWaiting
              ? "Still waking up. The free hosting tier sleeps when idle, so this first request can take up to a minute."
              : "This can take a moment on the first request. Hang tight."}
          </Text>
        </div>
      </div>
    </div>
  )
}

export default BackendWakingBanner

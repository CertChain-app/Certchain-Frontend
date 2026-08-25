import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios"
import ky from "ky"
import { requestSettled, requestStarted } from "./backend-status"

const baseUrl =
  process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_BASE_URL ?? ""

export const af = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
})

export const kf = ky.create({
  prefixUrl: baseUrl,
  credentials: "include",
  throwHttpErrors: false,
})

/**
 * A waking Render instance answers with a gateway error, or drops the
 * connection outright, until it is back up. Neither means the request was
 * wrong, so the first ones through the door get another go.
 */
const COLD_START_STATUSES = [502, 503, 504]
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 3000

type RetriedRequest = InternalAxiosRequestConfig & { retryCount?: number }

const isColdStart = (error: AxiosError) =>
  !error.response || COLD_START_STATUSES.includes(error.response.status)

/**
 * Only GETs. They carry no side effect, so a retry can at worst waste a round
 * trip - whereas a POST that reached the server and lost only its response
 * would be replayed, and a second join or payment is a real cost.
 */
const isRetryable = (config: RetriedRequest) =>
  (config.method ?? "get").toLowerCase() === "get"

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

af.interceptors.request.use((config: RetriedRequest) => {
  // Retries re-enter this interceptor, but the attempt they replace was never
  // settled - counting them again would leave the tally permanently above
  // zero and pin the banner open.
  if (!config.retryCount) requestStarted()
  return config
})

af.interceptors.response.use(
  (response) => {
    requestSettled()
    return response
  },
  async (error: AxiosError) => {
    const config = error.config as RetriedRequest | undefined

    if (
      config &&
      isColdStart(error) &&
      isRetryable(config) &&
      (config.retryCount ?? 0) < MAX_RETRIES
    ) {
      config.retryCount = (config.retryCount ?? 0) + 1
      await wait(RETRY_DELAY_MS)
      // Deliberately still counted as in flight, so the banner holds steady
      // across the gap rather than blinking between attempts.
      return af(config)
    }

    requestSettled()
    return Promise.reject(error)
  }
)

import axios, { AxiosHeaders } from "axios"
import ky from "ky"

const baseUrl =
  process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_BASE_URL ?? ""

const ACCESS_TOKEN_KEY = "cc_access_token"

const getAccessToken = () => {
  if (typeof window === "undefined") return null
  return window.localStorage.getItem(ACCESS_TOKEN_KEY)
}

export const af = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
})

af.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    const headers = AxiosHeaders.from(config.headers ?? {})
    headers.set("Authorization", `Bearer ${token}`)
    config.headers = headers
  }
  return config
})

export const kf = ky.create({
  prefixUrl: baseUrl,
  credentials: "include",
  throwHttpErrors: false,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = getAccessToken()
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`)
        }
      },
    ],
  },
})

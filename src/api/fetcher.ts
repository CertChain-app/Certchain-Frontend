import axios from "axios"
import ky from "ky"

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

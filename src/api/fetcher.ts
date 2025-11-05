import axios from "axios"
import ky from "ky"

export const af = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + "/api",
  withCredentials: true,
})

export const kf = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  credentials: "include",
  throwHttpErrors: false,
})

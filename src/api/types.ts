import { AxiosError } from "axios"

export interface IApiResponse<T> {
  success: boolean
  statusCode: number
  data: T | null
  errors: Record<string, string>
  meta?: {
    total: number
    items: number
    currentPage: number
    perPage: number
    lastPage: number
    [key: string]: number
  }
  path: string
  message: string
  stackTrace?: string
}

export type IApiParams = {
  page?: number
  limit?: number
  sort?: string
  searchFields?: string
  search?: string
}

export type IApiError = AxiosError<IApiResponse<Record<string, unknown>>>

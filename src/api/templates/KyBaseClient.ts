import { kf } from "@/api/fetcher"
import { Options as KyOptions } from "ky"
import { IApiResponse } from "../types"

export class KyBaseClient {
  private readonly prefix: string

  constructor(prefix?: string) {
    this.prefix = prefix ? `${prefix}` : ""
  }

  protected async get<T extends Record<string, unknown>>(
    path: string,
    options?: KyOptions
  ): Promise<IApiResponse<T>> {
    const response = await kf
      .get(this.prefix + path, options)
      .json<IApiResponse<T>>()
    return response
  }

  protected async post<
    T extends Record<string, unknown>,
    B extends Record<string, unknown> = Record<string, unknown>
  >(path: string, body?: B, options?: KyOptions): Promise<IApiResponse<T>> {
    const response = await kf
      .post(this.prefix + path, {
        json: body,
        ...options,
      })
      .json<IApiResponse<T>>()
    return response
  }

  protected async put<
    T extends Record<string, unknown>,
    B extends Record<string, unknown> = Record<string, unknown>
  >(path: string, body: B, options?: KyOptions): Promise<IApiResponse<T>> {
    const response = await kf
      .put(this.prefix + path, {
        json: body,
        ...options,
      })
      .json<IApiResponse<T>>()
    return response
  }

  protected async delete<T extends Record<string, unknown>>(
    path: string,
    options?: KyOptions
  ): Promise<IApiResponse<T>> {
    const response = await kf
      .delete(this.prefix + path, options)
      .json<IApiResponse<T>>()
    return response
  }

  protected async patch<
    T extends Record<string, unknown>,
    B extends Record<string, unknown> = Record<string, unknown>
  >(path: string, body: B, options?: KyOptions): Promise<IApiResponse<T>> {
    const response = await kf
      .patch(this.prefix + path, {
        json: body,
        ...options,
      })
      .json<IApiResponse<T>>()
    return response
  }

  async postForm<
    T extends Record<string, unknown>,
    B extends Record<string, unknown> = Record<string, unknown>
  >(path: string, body?: B, options?: KyOptions): Promise<IApiResponse<T>> {
    const formData = new FormData()
    if (body) {
      Object.entries(body).forEach(([key, value]) => {
        formData.append(key, value as string | Blob)
      })
    }
    const response = await kf
      .post(this.prefix + path, {
        body: formData,
        ...options,
      })
      .json<IApiResponse<T>>()
    return response
  }

  protected async putForm<
    T extends Record<string, unknown>,
    B extends Record<string, unknown> = Record<string, unknown>
  >(path: string, body?: B, options?: KyOptions): Promise<IApiResponse<T>> {
    const formData = new FormData()
    if (body) {
      Object.entries(body).forEach(([key, value]) => {
        formData.append(key, value as string | Blob)
      })
    }
    const response = await kf
      .put(this.prefix + path, {
        body: formData,
        ...options,
      })
      .json<IApiResponse<T>>()
    return response
  }
}

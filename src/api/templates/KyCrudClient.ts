import { IApiParams, IApiResponse } from "@/api/types"
import { Options } from "ky"
import { KyBaseClient } from "./KyBaseClient"

export class KyCrudClient<
  T extends Record<string, unknown> = Record<string, unknown>,
  C extends Record<string, unknown> = Record<string, unknown>,
  U extends Record<string, unknown> = Record<string, unknown>
> extends KyBaseClient {
  private containsImage: boolean

  constructor(endpoint: string, containsImage: boolean = false) {
    super(endpoint)
    this.containsImage = containsImage
  }

  async all(
    params?: IApiParams,
    options?: Options
  ): Promise<IApiResponse<T[]>> {
    const response = await this.get<{ data: T[] }>("/", {
      searchParams: params,
      ...options,
    })
    return {
      ...response,
      data: response.data?.data || null,
    }
  }

  async one(id: string, options: Options): Promise<IApiResponse<T>> {
    return this.get<T>(`/${id}`, options)
  }

  async create(data: C): Promise<IApiResponse<T>> {
    return this.containsImage
      ? this.postForm<T>("/", data)
      : this.post<T>("/", data)
  }

  async createForm(data: Record<string, unknown>): Promise<IApiResponse<T>> {
    return this.postForm<T>("/", data)
  }

  async update(id: string, data: U): Promise<IApiResponse<T>> {
    return this.containsImage
      ? this.putForm<T>(`/${id}`, data)
      : this.put<T>(`/${id}`, data)
  }

  async remove(id: string): Promise<IApiResponse<T>> {
    return this.delete<T>(`/${id}`)
  }
}

import { IApiResponse } from "@/api/types"
import { DataTableSortStatus } from "mantine-datatable"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export const usePagination = <T extends Record<string, unknown>>() => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const PAGE_SIZES = [10, 15, 20, 50, 100, 150, 200, 500, 1000]

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<T>>(() => {
    const sortParam = searchParams.get("sort")
    if (sortParam) {
      const [columnAccessor, direction] = sortParam.split(":")
      return { columnAccessor, direction: direction as "asc" | "desc" }
    }
    return { columnAccessor: "", direction: "asc" }
  })

  const tablePaginationParams = (response: IApiResponse<T[]>) => {
    if (
      response?.data &&
      Array.isArray(response.data) &&
      response.data.length > 0
    ) {
      const { meta } = response
      const { total, currentPage } = meta ?? {}

      return {
        totalRecords: total,
        page: currentPage ?? 1,
        recordsPerPage: +(searchParams.get("limit") ?? 10),
        sortStatus,
        onSortStatusChange: (status: DataTableSortStatus<T>) => {
          setSortStatus(status)
          const params = new URLSearchParams(searchParams)
          params.set(
            "sort",
            `${status.columnAccessor as string}:${status.direction}`
          )
          router.push(`${pathname}?${params.toString()}`)
        },
        onPageChange: (page: number) => {
          const params = new URLSearchParams(searchParams)
          params.set("page", page.toString())
          router.push(`${pathname}?${params.toString()}`)
        },
        recordsPerPageOptions: PAGE_SIZES,
        onRecordsPerPageChange: (size: number) => {
          const params = new URLSearchParams(searchParams)
          params.set("limit", size.toString())
          router.push(`${pathname}?${params.toString()}`)
        },
      }
    }

    return {
      totalRecords: 0,
      page: 1,
      recordsPerPage: 10,
      onPageChange: () => {},
    }
  }

  const tablePaginationParamsWithDataPath = <D extends Record<string, T[]>>(
    response: IApiResponse<D>,
    path: keyof D
  ) => {
    const data = response?.data?.[path] as T[]
    if (data && data.length > 0) {
      const { meta } = response
      const { total, currentPage } = meta ?? {}

      return {
        totalRecords: Number(total),
        page: Number(currentPage) ?? 1,
        recordsPerPage: +(searchParams.get("limit") ?? 10),
        sortStatus,
        onSortStatusChange: (status: DataTableSortStatus<T>) => {
          setSortStatus(status)
          const params = new URLSearchParams(searchParams)
          params.set(
            "sort",
            `${status.columnAccessor as string}:${status.direction}`
          )
          router.push(`${pathname}?${params.toString()}`)
        },
        onPageChange: (page: number) => {
          const params = new URLSearchParams(searchParams)
          params.set("page", page.toString())
          router.push(`${pathname}?${params.toString()}`)
        },
        recordsPerPageOptions: PAGE_SIZES,
        onRecordsPerPageChange: (size: number) => {
          const params = new URLSearchParams(searchParams)
          params.set("limit", size.toString())
          router.push(`${pathname}?${params.toString()}`)
        },
      }
    }

    return {
      totalRecords: 0,
      page: 1,
      recordsPerPage: 10,
      onPageChange: () => {},
    }
  }

  const requestParams = () => {
    return {
      page: +(searchParams.get("page") ?? 1),
      limit: +(searchParams.get("limit") ?? 10),
      search: searchParams.get("search") ?? "",
      searchFields: searchParams.get("searchFields") ?? "",
      sort: searchParams.get("sort") ?? "",
    }
  }

  return {
    tablePaginationParams,
    tablePaginationParamsWithDataPath,
    requestParams,
  }
}

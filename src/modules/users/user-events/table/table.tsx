"use client"

import { IApiResponse } from "@/api/types"
import { usePagination } from "@/modules/core/hooks/use-pagination"
import { IUserEvent } from "@/modules/types"
import { DataTable, DataTableColumn } from "mantine-datatable"
import type { FC } from "react"
import { useEvents } from "../queries/use-events"
import { columns } from "./columns"

const UserEventsTable: FC = () => {
  const { requestParams, tablePaginationParams } = usePagination()
  const { data, isLoading } = useEvents(requestParams())
  return (
    <DataTable
      borderRadius='md'
      minHeight={data?.data?.data?.length ?? 0 > 0 ? 0 : 400}
      columns={columns as unknown as DataTableColumn<Record<string, unknown>>[]}
      withTableBorder
      records={data?.data?.data ?? []}
      fetching={isLoading}
      {...tablePaginationParams(data?.data as IApiResponse<IUserEvent[]>)}
    />
  )
}

export default UserEventsTable

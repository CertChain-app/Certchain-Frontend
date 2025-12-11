"use client"

import { IApiResponse } from "@/api/types"
import { usePagination } from "@/modules/core/hooks/use-pagination"
import { IUserEvent } from "@/modules/types"
import { DataTable } from "mantine-datatable"
import type { FC } from "react"
import { useEventJoinees } from "../queries/use-event-joinees"
import { columns } from "./columns"

interface OrganizerEventJoineesTableProps {
  eventId: string
}

const OrganizerEventJoineesTable: FC<OrganizerEventJoineesTableProps> = ({
  eventId,
}) => {
  type UserEventRecord = IUserEvent & Record<string, unknown>
  const { requestParams, tablePaginationParams } =
    usePagination<UserEventRecord>()
  const { data, isLoading } = useEventJoinees(eventId, requestParams())
  return (
    <DataTable<UserEventRecord>
      borderRadius='md'
      minHeight={data?.data?.data?.length ?? 0 > 0 ? 0 : 400}
      columns={columns}
      withTableBorder
      records={data?.data?.data ?? []}
      fetching={isLoading}
      {...tablePaginationParams(data?.data as IApiResponse<UserEventRecord[]>)}
    />
  )
}

export default OrganizerEventJoineesTable

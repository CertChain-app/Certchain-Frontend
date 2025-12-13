"use client"

import { IApiResponse } from "@/api/types"
import { usePagination } from "@/modules/core/hooks/use-pagination"
import { ICertificate } from "@/modules/types"
import { DataTable } from "mantine-datatable"
import type { FC } from "react"
import { useEventCertificates } from "../queries/use-event-certificates"
import { columns } from "./columns"

interface OrganizerEventCertificatesTableProps {
  eventId: string
}

const OrganizerEventCertificatesTable: FC<
  OrganizerEventCertificatesTableProps
> = ({ eventId }) => {
  type CertificateRecord = ICertificate & Record<string, unknown>
  const { requestParams, tablePaginationParams } =
    usePagination<CertificateRecord>()
  const { data, isLoading } = useEventCertificates(eventId, requestParams())
  return (
    <DataTable<CertificateRecord>
      borderRadius='md'
      minHeight={data?.data?.data?.length ?? 0 > 0 ? 0 : 400}
      columns={columns}
      withTableBorder
      records={data?.data?.data ?? []}
      fetching={isLoading}
      {...tablePaginationParams(
        data?.data as IApiResponse<CertificateRecord[]>
      )}
    />
  )
}

export default OrganizerEventCertificatesTable

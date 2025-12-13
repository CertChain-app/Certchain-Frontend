import TextSearch from "@/modules/core/components/searches/text-search"
import { ICertificate } from "@/modules/types"
import dayjs from "dayjs"
import { DataTableColumn } from "mantine-datatable"
import CertificateTableActions from "./actions"

export const columns: DataTableColumn<ICertificate>[] = [
  {
    accessor: "user.firstName",
    title: "Name",
    sortable: true,
    render: (certificate) =>
      `${certificate?.user?.firstName} ${certificate?.user?.lastName}`,
    filter: (
      <TextSearch
        label='Name'
        placeholder='Search events...'
        description='Show events whose title includes the specified text'
        searchFields='user.firstName, user.lastName'
      />
    ),
  },
  {
    accessor: "user.email",
    title: "Email",
    sortable: true,
    filter: (
      <TextSearch
        label='Email'
        placeholder='Search events...'
        description='Show events whose handle includes the specified text'
        searchFields='user.email'
      />
    ),
  },

  {
    accessor: "certifiedDate",
    title: "Certified Date",
    sortable: true,
    render: (certificate) =>
      certificate.createdAt
        ? dayjs(certificate.createdAt).format("YYYY-MM-DD HH:mm")
        : "Not certified",
  },
  {
    accessor: "actions",
    title: "Actions",
    render: (certificate) => (
      <CertificateTableActions certificate={certificate} />
    ),
  },
]

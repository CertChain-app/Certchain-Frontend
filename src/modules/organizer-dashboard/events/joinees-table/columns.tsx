import TextSearch from "@/modules/core/components/searches/text-search"
import { IUserEvent } from "@/modules/types"
import dayjs from "dayjs"
import { DataTableColumn } from "mantine-datatable"
import JoineeTableActions from "./actions"

export const columns: DataTableColumn<IUserEvent>[] = [
  {
    accessor: "user.firstName",
    title: "Name",
    sortable: true,
    render: (joinee) => `${joinee.user.firstName} ${joinee.user.lastName}`,
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
    accessor: "user.phone",
    title: "Phone",
    sortable: true,
    render: (joinee) => joinee.user.phone,
  },

  {
    accessor: "payment.status",
    title: "Payment Status",
    sortable: true,
    render: (joinee) =>
      joinee.payment?.paymentStatus
        ? `${joinee.payment?.paymentStatus} (${joinee.payment?.paymentMethod})`
        : "N/A",
  },

  {
    accessor: "joinedAt",
    title: "Joined Date",
    sortable: true,
    render: (event) => dayjs(event.createdAt).format("YYYY-MM-DD HH:mm"),
  },

  {
    accessor: "actions",
    title: "Actions",
    render: (joinee) => <JoineeTableActions joinee={joinee} />,
  },
]

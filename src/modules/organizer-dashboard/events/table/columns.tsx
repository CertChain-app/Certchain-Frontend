import OImage from "@/modules/core/components/o-image"
import TextSearch from "@/modules/core/components/searches/text-search"
import { IEvent } from "@/modules/types"
import dayjs from "dayjs"
import { DataTableColumn } from "mantine-datatable"
import EventTableActions from "./actions"

export const columns: DataTableColumn<IEvent>[] = [
  {
    accessor: "title",
    title: "Title",
    sortable: true,
    filter: (
      <TextSearch
        label='Title'
        placeholder='Search events...'
        description='Show events whose title includes the specified text'
        searchFields='title'
      />
    ),
  },
  {
    accessor: "handle",
    title: "Handle",
    sortable: true,
    filter: (
      <TextSearch
        label='Handle'
        placeholder='Search events...'
        description='Show events whose handle includes the specified text'
        searchFields='handle'
      />
    ),
  },
  {
    accessor: "banner",
    title: "Banner",
    render: (event) =>
      event.banner ? (
        <OImage
          width={100}
          height={100}
          src={event.banner}
          alt={event.title}
          className='w-10 h-10 object-cover rounded'
        />
      ) : (
        "No banner"
      ),
  },
  {
    accessor: "type",
    title: "Type",
    sortable: true,
    render: (event) => (event.type === "ONLINE" ? "Online" : "In Person"),
  },
  {
    accessor: "startDate",
    title: "Start Date",
    sortable: true,
    render: (event) => dayjs(event.startDate).format("YYYY-MM-DD HH:mm"),
  },
  {
    accessor: "endDate",
    title: "End Date",
    sortable: true,
    render: (event) => dayjs(event.endDate).format("YYYY-MM-DD HH:mm"),
  },
  {
    accessor: "createdAt",
    title: "Created At",
    sortable: true,
    render: (event) => dayjs(event.createdAt).format("YYYY-MM-DD HH:mm"),
  },
  {
    accessor: "actions",
    title: "Actions",
    render: (event) => <EventTableActions event={event} />,
  },
]

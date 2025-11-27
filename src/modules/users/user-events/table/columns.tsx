import OImage from "@/modules/core/components/o-image"
import TextSearch from "@/modules/core/components/searches/text-search"
import { IUserEvent } from "@/modules/types"
import dayjs from "dayjs"
import { DataTableColumn } from "mantine-datatable"
import EventTableActions from "./actions"

export const columns: DataTableColumn<IUserEvent>[] = [
  {
    accessor: "event.title",
    title: "Event",
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
    accessor: "event.banner",
    title: "Banner",
    render: (event) =>
      event?.event?.banner ? (
        <OImage
          width={100}
          height={100}
          src={event.event.banner}
          alt={event.event.title}
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
    render: (event) => dayjs(event.event.startDate).format("YYYY-MM-DD HH:mm"),
  },
  {
    accessor: "endDate",
    title: "End Date",
    sortable: true,
    render: (event) => dayjs(event.event.endDate).format("YYYY-MM-DD HH:mm"),
  },

  {
    accessor: "actions",
    title: "Actions",
    render: (event) => <EventTableActions event={event} />,
  },
]

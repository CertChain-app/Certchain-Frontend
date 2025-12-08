"use client"

import { Code, Group, ScrollArea } from "@mantine/core"
import {
  IconGauge,
  IconMessage2,
  IconNotes,
  IconUser,
} from "@tabler/icons-react"
import { useNavbar } from "../context/navbar-context"

import Logo from "@/modules/core/components/logo"
import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { useLink } from "../../common/utils/link"
import { LinksGroup } from "./navbar-link-groups"
import UserButton from "./user-button"

export default function OrganizerDashboardNavbar() {
  const { isOpen } = useNavbar()
  const { getLink } = useLink()
  const pathname = usePathname()

  const sidebarItems = useMemo(() => {
    return [
      {
        label: "Dashboard",
        icon: IconGauge,
        link: getLink("dashboard"),
        active: pathname === getLink("dashboard"),
        className:
          pathname === getLink("dashboard") ? "bg-blue-50 text-blue-600" : "",
      },
      {
        label: "Events",
        icon: IconNotes,
        link: getLink("dashboard/events"),
        active: pathname === getLink("dashboard/events"),
        className:
          pathname === getLink("dashboard/events")
            ? "bg-blue-50 text-blue-600"
            : "",
      },
      {
        label: "Conversations",
        icon: IconMessage2,
        link: getLink("dashboard/conversations"),
        active: pathname === getLink("dashboard/conversations"),
        className:
          pathname === getLink("dashboard/conversations")
            ? "bg-blue-50 text-blue-600"
            : "",
      },
      {
        label: "Organizer Profile",
        icon: IconUser,
        link: getLink("dashboard/organizer"),
        active: pathname === getLink("dashboard/organizer"),
        className:
          pathname === getLink("dashboard/organizer")
            ? "bg-blue-50 text-blue-600"
            : "",
      },
    ]
  }, [getLink, pathname])

  const links = sidebarItems.map((item) => (
    <LinksGroup {...item} active={item.active} key={item.label} />
  ))

  return (
    <nav
      className={`bg-white h-screen fixed top-0 left-0 w-[300px] p-4 pb-0 flex flex-col border-r border-gray-200 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className='px-4 pt-0 -mx-4 text-black border-b border-gray-200'>
        <Group justify='space-between'>
          <Logo style={{ width: 120 }} />
          <Code fw={700}>v3.1.2</Code>
        </Group>
      </div>

      <ScrollArea className='flex-1 -mx-4'>
        <div className='py-8'>{links}</div>
      </ScrollArea>

      <div className='-mx-4 border-t border-gray-200'>
        <UserButton />
      </div>
    </nav>
  )
}

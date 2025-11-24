"use client"

import { Code, Group, ScrollArea } from "@mantine/core"
import { IconGauge, IconMessages, IconNotes } from "@tabler/icons-react"
import { useNavbar } from "../context/navbar-context"

import Logo from "@/modules/core/components/logo"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { LinksGroup } from "./navbar-link-groups"
import UserButton from "./user-button"

export default function DashboardNavbar() {
  const { isOpen } = useNavbar()
  const pathname = usePathname()

  const sidebarItems = useMemo(() => {
    return [
      {
        label: "Dashboard",
        icon: IconGauge,
        link: "/dashboard",
        active: pathname === "/dashboard",
        className: pathname === "/dashboard" ? "bg-blue-50 text-blue-600" : "",
      },
      {
        label: "Events",
        icon: IconNotes,
        link: "/dashboard/events",
        active: pathname === "/dashboard/events",
        className:
          pathname === "/dashboard/events" ? "bg-blue-50 text-blue-600" : "",
      },
      {
        label: "Chats",
        icon: IconMessages,
        link: "/dashboard/chats",
        active: pathname === "/dashboard/chats",
        className:
          pathname === "/dashboard/chats" ? "bg-blue-50 text-blue-600" : "",
      },
      // {
      //   label: "Profile",
      //   icon: IconUser,
      //   link: "/dashboard/profile",
      //   active: pathname === "/dashboard/profile",
      //   className:
      //     pathname === "/dashboard/profile" ? "bg-blue-50 text-blue-600" : "",
      // },
    ]
  }, [pathname])

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
          <Link href='/'>
            <Logo style={{ width: 120 }} />
          </Link>
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

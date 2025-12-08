"use client"

import { useOrganizerLogout } from "@/modules/organizer/auth/mutations/use-organizer-logout"
import { Avatar, Group, Menu, Text, UnstyledButton } from "@mantine/core"
import { IconChevronRight, IconLogout, IconSettings } from "@tabler/icons-react"
import Link from "next/link"
import { useSession } from "../../auth/queries/use-session"
import { useOrganizerDashboardContext } from "../../common/context/organizer-dashboard-context"
import { useLink } from "../../common/utils/link"

export function UserButton() {
  const { organizer } = useOrganizerDashboardContext()
  const { user } = useSession()
  const { getLink } = useLink()

  const logout = useOrganizerLogout()

  return (
    <Menu width={300}>
      <Menu.Target>
        <UnstyledButton className='block w-full p-4 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-dark-800'>
          <Group>
            <Avatar radius='xl' color='blue' name={organizer?.name} />

            <div style={{ flex: 1 }}>
              <Text size='sm' className='text-black' fw={500}>
                {user?.name}
              </Text>

              <Text c='dimmed' size='xs'>
                {user?.email ?? "organizer@example.com"}
              </Text>
            </div>

            <IconChevronRight size={14} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<IconSettings size={14} />}>
          <Link href={getLink("dashboard/profile")}>Profile</Link>
        </Menu.Item>
        <Menu.Item
          leftSection={<IconLogout size={14} />}
          color='red'
          onClick={() => logout.mutate()}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default UserButton

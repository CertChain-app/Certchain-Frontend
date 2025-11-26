"use client"

import { useOrganizerLogout } from "@/modules/organizer/auth/mutations/use-organizer-logout"
import { Avatar, Group, Menu, Text, UnstyledButton } from "@mantine/core"
import { IconChevronRight, IconLogout } from "@tabler/icons-react"
import { useUserSession } from "../../auth/queries/use-user-session"
export function UserButton() {
  const { user } = useUserSession()

  const logout = useOrganizerLogout()

  return (
    <Menu width={300}>
      <Menu.Target>
        <UnstyledButton className='block w-full p-4 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-dark-800'>
          <Group>
            <Avatar
              radius='xl'
              color='blue'
              name={user?.firstName + " " + user?.lastName}
            />

            <div style={{ flex: 1 }}>
              <Text size='sm' className='text-black' fw={500}>
                {user?.firstName + " " + user?.lastName}
              </Text>

              <Text c='dimmed' size='xs'>
                {user?.email}
              </Text>
            </div>

            <IconChevronRight size={14} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        {/* <Menu.Item leftSection={<IconSettings size={14} />}>
          <Link href='/dashboard/profile'>Profile</Link>
        </Menu.Item> */}
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

"use client"

import { IconMenu2 } from "@tabler/icons-react"
import { useNavbar } from "../context/navbar-context"
import UserButton from "./user-button"

const OrganizerDashboardHeader = () => {
  const { toggle } = useNavbar()

  return (
    <div className='px-4 flex items-center justify-between'>
      <button
        onClick={toggle}
        className='p-1 hover:bg-gray-100 rounded-lg transition-colors'
      >
        <IconMenu2 size={24} />
      </button>

      <div className='w-[300px]'>
        <UserButton />
      </div>
    </div>
  )
}

export default OrganizerDashboardHeader

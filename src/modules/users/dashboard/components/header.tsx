"use client"

import { IconMenu2 } from "@tabler/icons-react"
import { useNavbar } from "../context/navbar-context"
import UserButton from "./user-button"

const DashboardHeader = () => {
  const { toggle } = useNavbar()

  return (
    <div className='px-4 flex items-center justify-between h-full'>
      <div className='flex items-center gap-4'>
        <button
          onClick={toggle}
          className='p-1 hover:bg-gray-100 rounded-lg transition-colors'
          aria-label='Toggle navigation menu'
        >
          <IconMenu2 size={24} />
        </button>
      </div>

      <div className='flex items-center'>
        <UserButton />
      </div>
    </div>
  )
}

export default DashboardHeader

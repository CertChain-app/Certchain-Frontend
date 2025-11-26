"use client"

import type { FC } from "react"
import SignedIn from "../../auth/components/signed-in"
import DashboardHeader from "../components/header"
import DashboardNavbar from "../components/navbar"
import { NavbarProvider, useNavbar } from "../context/navbar-context"

const MainContent: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpen } = useNavbar()

  return (
    <div
      className={`flex-1 transition-[margin] duration-300 ${
        isOpen ? "ml-[300px]" : "ml-0"
      }`}
    >
      {/* Header - Fixed at the top */}
      <header className='h-16 border-b border-gray-200 bg-white'>
        <DashboardHeader />
      </header>

      {/* Main content */}
      <main className='p-6'>{children}</main>
    </div>
  )
}

const DashboardLayoutTemplate: FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <NavbarProvider>
      <div className='min-h-screen flex'>
        {/* Navbar - Fixed on the left */}
        <SignedIn loader={<></>}>{() => <DashboardNavbar />}</SignedIn>
        <MainContent>{children}</MainContent>
      </div>
    </NavbarProvider>
  )
}

export default DashboardLayoutTemplate

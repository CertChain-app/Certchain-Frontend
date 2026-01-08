"use client"

import type { FC } from "react"
import SignedIn from "../../auth/components/signed-in"
import { useUserSession } from "../../auth/queries/use-user-session"
import DashboardHeader from "../components/header"
import DashboardNavbar from "../components/navbar"
import { NavbarProvider, useNavbar } from "../context/navbar-context"

const MainContent: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpen } = useNavbar()
  const { error } = useUserSession()

  return (
    <div
      className={`flex-1 transition-[margin] duration-300 ml-0 ${
        isOpen ? "md:ml-[300px]" : "md:ml-0"
      }`}
    >
      {/* Header - Fixed at the top */}
      <header className='h-16 border-b border-gray-200 bg-white'>
        <DashboardHeader />
      </header>

      {/* Main content */}
      <main className='p-6 space-y-4'>
        {error && (
          <div className='rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
            Session error: {String((error as { message?: string })?.message ?? error)}
          </div>
        )}
        {children}
      </main>
    </div>
  )
}

const MobileNavOverlay: FC = () => {
  const { isOpen, close } = useNavbar()

  if (!isOpen) return null

  return (
    <button
      type='button'
      aria-label='Close navigation menu'
      onClick={close}
      className='fixed inset-0 z-20 bg-black/30 backdrop-blur-sm md:hidden'
    />
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
        <MobileNavOverlay />
        <MainContent>{children}</MainContent>
      </div>
    </NavbarProvider>
  )
}

export default DashboardLayoutTemplate

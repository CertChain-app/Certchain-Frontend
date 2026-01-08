"use client"

import { createContext, useContext, useEffect, useState } from "react"

interface NavbarContextType {
  isOpen: boolean
  toggle: () => void
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined)

export function NavbarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)")
    setIsOpen(media.matches)
  }, [])

  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <NavbarContext.Provider value={{ isOpen, toggle }}>
      {children}
    </NavbarContext.Provider>
  )
}

export function useNavbar() {
  const context = useContext(NavbarContext)
  if (context === undefined) {
    throw new Error("useNavbar must be used within a NavbarProvider")
  }
  return context
}

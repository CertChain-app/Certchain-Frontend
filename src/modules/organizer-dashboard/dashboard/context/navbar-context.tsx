import { createContext, useContext, useState } from "react"

interface NavbarContextType {
  isOpen: boolean
  toggle: () => void
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined)

export function NavbarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true)

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

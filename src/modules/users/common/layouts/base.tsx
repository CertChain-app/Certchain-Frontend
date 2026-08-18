import type { FC } from "react"
import { Footer } from "../components/footer"
import { Navbar } from "../components/navbar"

interface BaseUserLayoutProps {
  children: React.ReactNode
}

const BaseUserLayout: FC<BaseUserLayoutProps> = ({ children }) => {
  return (
    <div className='flex min-h-screen flex-col bg-background font-sans text-foreground'>
      <Navbar />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  )
}

export default BaseUserLayout

import type { FC } from "react"
import { Footer } from "../components/footer"
import { Navbar } from "../components/navbar"

interface BaseUserLayoutProps {
  children: React.ReactNode
}

const BaseUserLayout: FC<BaseUserLayoutProps> = ({ children }) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  )
}

export default BaseUserLayout

import type { FC } from "react"
import { Footer } from "../components/footer"
import { Navbar } from "../components/navbar"

interface BaseUserLayoutProps {
  children: React.ReactNode
}

const BaseUserLayout: FC<BaseUserLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default BaseUserLayout

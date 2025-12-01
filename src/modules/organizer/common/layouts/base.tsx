import type { FC } from "react"
import Footer from "../components/footer"
import Navbar from "../components/navbar"

interface BaseOrganizerLayoutProps {
  children: React.ReactNode
}

const BaseOrganizerLayout: FC<BaseOrganizerLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default BaseOrganizerLayout

"use client"

import { Loader } from "@mantine/core"
import { useRouter } from "next/navigation"
import { FC, useEffect } from "react"
import { useUserSession } from "../queries/use-user-session"

interface UserProtectedRouteProps {
  children: React.ReactNode
}

const UserProtectedRoute: FC<UserProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useUserSession()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/auth/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated)
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader />
      </div>
    )

  return <>{children}</>
}

export default UserProtectedRoute

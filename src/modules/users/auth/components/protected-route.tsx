"use client"

import { Loader } from "@mantine/core"
import { useParams, useRouter } from "next/navigation"
import { FC } from "react"
import { useUserSession } from "../queries/use-user-session"

interface UserProtectedRouteProps {
  children: React.ReactNode
}

const UserProtectedRoute: FC<UserProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useUserSession()
  const { id } = useParams()
  const router = useRouter()
  if (isLoading)
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader />
      </div>
    )
  if (!isAuthenticated) {
    router.push(`/organizers/${id}/auth/login`)
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-800 mb-2'>
            Access Denied
          </h1>
          <p className='text-gray-600'>Please sign in to access this page</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default UserProtectedRoute

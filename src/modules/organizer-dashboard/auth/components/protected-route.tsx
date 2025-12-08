"use client"

import { Loader } from "@mantine/core"
import { useParams, useRouter } from "next/navigation"
import { FC } from "react"
import { useSession } from "../queries/use-session"

interface OrganizerProtectedRouteProps {
  children: React.ReactNode
}

const OrganizerProtectedRoute: FC<OrganizerProtectedRouteProps> = ({
  children,
}) => {
  const { isAuthenticated, isLoading } = useSession()
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

export default OrganizerProtectedRoute

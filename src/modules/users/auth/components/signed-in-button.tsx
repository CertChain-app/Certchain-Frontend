import router from "next/router"
import { useUserSession } from "../queries/use-user-session"

interface SignedInButtonProps {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
}

function SignedInButton({ children, onClick }: SignedInButtonProps) {
  const { isAuthenticated } = useUserSession()

  if (!isAuthenticated) {
    return (
      <div onClick={() => router.push("/auth/login")}>Sign in to continue</div>
    )
  }

  return <div onClick={onClick}>{children}</div>
}

export { SignedInButton }

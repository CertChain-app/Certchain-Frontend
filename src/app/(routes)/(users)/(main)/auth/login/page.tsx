import LoginTemplate from "@/modules/users/auth/templates/login"

interface LoginPageProps {
  searchParams: Promise<{ as?: string }>
}

const LoginPage = async ({ searchParams }: LoginPageProps) => {
  const { as } = await searchParams

  return (
    <LoginTemplate defaultType={as === "organizer" ? "organizer" : "attendee"} />
  )
}

export default LoginPage

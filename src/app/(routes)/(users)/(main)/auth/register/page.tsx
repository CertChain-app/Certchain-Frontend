import RegisterTemplate from "@/modules/users/auth/templates/register"

interface RegisterPageProps {
  searchParams: Promise<{ as?: string }>
}

const RegisterPage = async ({ searchParams }: RegisterPageProps) => {
  const { as } = await searchParams

  return (
    <RegisterTemplate
      defaultType={as === "organizer" ? "organizer" : "attendee"}
    />
  )
}

export default RegisterPage

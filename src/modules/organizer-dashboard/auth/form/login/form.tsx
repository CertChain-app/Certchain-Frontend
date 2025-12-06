import { IApiError } from "@/api/types"
import { populateError } from "@/modules/core/lib/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Anchor, Button } from "@mantine/core"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { FC } from "react"
import { useForm } from "react-hook-form"
import { PasswordInput, TextInput } from "react-hook-form-mantine"
import { toast } from "react-toastify"
import { useOrganizerDashboardContext } from "../../../common/context/organizer-dashboard-context"
import { useOrganizerLogin } from "../../mutations/use-organizer-login"
import { organizerLoginSchema, OrganizerLoginSchema } from "./schema"

interface OrganizerLoginFormProps {
  onSuccess?: () => void
  organizerId: string
}

const OrganizerLoginForm: FC<OrganizerLoginFormProps> = ({
  onSuccess,
  organizerId,
}) => {
  const form = useForm<OrganizerLoginSchema>({
    defaultValues: {
      email: "",
      password: "",
      organizerId,
    },
    resolver: zodResolver(organizerLoginSchema),
  })

  const router = useRouter()

  const { organizer } = useOrganizerDashboardContext()

  const organizerLoginMutation = useOrganizerLogin()

  const onSubmit = (data: OrganizerLoginSchema) => {
    organizerLoginMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Login successful")
        router.push(`/organizers/${organizerId}/dashboard`)
        onSuccess?.()
      },
      onError: (err) => {
        populateError(form, err as IApiError)
      },
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className='grid gap-3 max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg'>
        <TextInput
          name='email'
          label='Your Email'
          placeholder='john@example.com'
          control={form.control}
        />

        <div className='space-y-2'>
          <PasswordInput
            name='password'
            label='Password'
            placeholder='Choose a secure password'
            control={form.control}
          />
          <div className='text-right'>
            <Anchor
              component={Link}
              href={`/organizers/${organizer?.id}/auth/forgot-password`}
              type='button'
              size='sm'
            >
              Forgot password?
            </Anchor>
          </div>
        </div>

        <Button loading={organizerLoginMutation.isPending} type='submit'>
          Login
        </Button>
      </div>
    </form>
  )
}

export default OrganizerLoginForm

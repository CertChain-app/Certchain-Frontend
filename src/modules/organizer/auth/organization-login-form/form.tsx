"use client"
import { IApiError } from "@/api/types"
import { populateError } from "@/modules/core/lib/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@mantine/core"
import { useRouter } from "next/navigation"
import type { FC } from "react"
import { useForm } from "react-hook-form"
import { TextInput } from "react-hook-form-mantine"
import { toast } from "react-toastify"
import { useOrganizerSubdomainLogin } from "../mutations/use-organizer-subdomain-login"
import { OrganizationLoginSchema, organizationLoginSchema } from "./schema"

const OrganizationLoginForm: FC = () => {
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      subdomain: "",
    },
    resolver: zodResolver(organizationLoginSchema),
  })

  const mutation = useOrganizerSubdomainLogin()

  const onSubmit = (data: OrganizationLoginSchema) => {
    mutation.mutate(data, {
      onSuccess: (res) => {
        if (!res?.data?.data?.id) {
          toast.error("Something went wrong")
          return
        }

        const organizer = res.data.data
        router.push(`/organizers/${organizer.id}/auth/login`)
      },
      onError: (e) => {
        populateError(form, e as IApiError)
      },
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
      <div className='relative rounded-md border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500'>
        <TextInput
          size='lg'
          name='subdomain'
          rightSection={
            <span className='text-gray-500 pr-3'>.certchain.co</span>
          }
          rightSectionWidth={110}
          placeholder='your-workspace'
          control={form.control}
          className='border-0 focus:ring-0'
          styles={{
            input: {
              border: "none",
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
            },
          }}
        />
      </div>

      <Button
        fullWidth
        type='submit'
        size='lg'
        loading={mutation.isPending}
        className='bg-purple-900 hover:bg-purple-800 text-white font-medium'
      >
        Continue
      </Button>
    </form>
  )
}

export default OrganizationLoginForm

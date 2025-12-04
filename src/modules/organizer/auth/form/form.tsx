"use client"

import { IApiError } from "@/api/types"
import { PhoneNumberInput } from "@/modules/core/components/phone-number-input/phone-number-input"
import { populateError } from "@/modules/core/lib/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@mantine/core"
import { useRouter } from "next/navigation"
import type { FC } from "react"
import { useForm } from "react-hook-form"
import { PasswordInput, Select, TextInput } from "react-hook-form-mantine"
import { toast } from "react-toastify"
import { useOrganizerAuthRegisterMutation } from "../mutations/use-organizer-register"
import {
  OrganizerRegisterSchema,
  organizerRegisterSchema,
  OrganizerType,
} from "./schema"

interface OrganizerRegisterFormProps {
  onSuccess?: () => void
}

const OrganizerRegisterForm: FC<OrganizerRegisterFormProps> = ({
  onSuccess,
}) => {
  const router = useRouter()
  const form = useForm<OrganizerRegisterSchema>({
    defaultValues: {
      type: OrganizerType.INSTITUTE,
      name: "",
      email: "",
      phone: "",
      subdomain: "",
      organizationContactEmail: "",
      organizationName: "",
      password: "",
    },
    resolver: zodResolver(organizerRegisterSchema),
  })

  const organizerAuthRegisterMutation = useOrganizerAuthRegisterMutation()

  const onSubmit = (data: OrganizerRegisterSchema) => {
    organizerAuthRegisterMutation.mutate(data, {
      onSuccess: (res) => {
        if (res?.data?.data?.organizer) {
          router.push(`/organizers/${res?.data?.data?.organizer?.id}/dashboard`)
          toast.success(
            "Your account has been created successfully. Check your email for verification."
          )
        }
        onSuccess?.()
      },
      onError: (error) => {
        populateError(form, error as IApiError)
      },
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className='grid gap-8 max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg'>
        <Select
          name='type'
          label='Organization Type'
          placeholder='Select your organization type'
          data={[
            { value: OrganizerType.INSTITUTE, label: "Institute" },
            { value: OrganizerType.ORGANIZATION, label: "Organization" },
            { value: OrganizerType.INDIVIDUAL, label: "Individual" },
            { value: OrganizerType.COLLEGE, label: "College" },
            { value: OrganizerType.SCHOOL, label: "School" },
            { value: OrganizerType.OTHER, label: "Other" },
          ]}
          control={form.control}
          className='mb-2'
        />

        <div className='grid md:grid-cols-2 gap-6'>
          <TextInput
            name='name'
            label='Your Name'
            placeholder='John Doe'
            control={form.control}
          />
          <TextInput
            name='email'
            label='Your Email'
            placeholder='john@example.com'
            control={form.control}
          />
        </div>

        <div className='grid md:grid-cols-2 gap-6'>
          <PhoneNumberInput
            name='phone'
            label='Phone Number'
            placeholder='+91 9876543210'
            control={form.control}
          />
          <TextInput
            name='subdomain'
            label='Subdomain'
            placeholder='your-organization'
            control={form.control}
            rightSectionWidth={90}
            rightSection='.certchain.co'
            rightSectionProps={{
              className: "text-gray-500 text-xs",
            }}
          />
        </div>

        <div className='grid md:grid-cols-2 gap-6'>
          <TextInput
            name='organizationName'
            label='Organization Name'
            placeholder='Acme Inc.'
            control={form.control}
          />
          <TextInput
            name='organizationContactEmail'
            label='Organization Contact Email'
            placeholder='contact@acme.com'
            control={form.control}
          />
        </div>

        <PasswordInput
          name='password'
          label='Password'
          placeholder='Choose a secure password'
          control={form.control}
        />

        <Button type='submit' loading={organizerAuthRegisterMutation.isPending}>
          Create Your Account
        </Button>

        <p className='text-center text-sm text-gray-600'>
          By creating an account, you agree to our Terms of Service and Privacy
          Policy
        </p>
      </div>
    </form>
  )
}

export default OrganizerRegisterForm

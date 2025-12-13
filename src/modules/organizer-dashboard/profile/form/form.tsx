import { IApiError } from "@/api/types"
import { PhoneNumberInput } from "@/modules/core/components/phone-number-input/phone-number-input"
import { UploadInput } from "@/modules/core/components/upload-input"
import { populateError } from "@/modules/core/lib/form"
import { IOrganizer, OrganizerType } from "@/modules/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, Text } from "@mantine/core"
import { useQueryClient } from "@tanstack/react-query"
import type { FC } from "react"
import { useForm } from "react-hook-form"
import { Select, TextInput } from "react-hook-form-mantine"
import { toast } from "react-toastify"
import { useUpdateOrganizerProfile } from "../mutations/use-update-profile"
import { OrganizerProfileSchema, organizerProfileSchema } from "./schema"

interface OrganizerProfileFormProps {
  organizer: IOrganizer
}

const OrganizerProfileForm: FC<OrganizerProfileFormProps> = ({ organizer }) => {
  const queryClient = useQueryClient()
  const form = useForm<OrganizerProfileSchema>({
    resolver: zodResolver(organizerProfileSchema),
    defaultValues: {
      logo: organizer.logo || "",
      name: organizer.name || "",
      email: organizer.email || "",
      phone: organizer.phone || "",
      type: organizer.type || OrganizerType.INDIVIDUAL,
      subdomain: organizer.subdomain || "",
    },
  })

  const updateProfileMutation = useUpdateOrganizerProfile()

  const handleSubmit = (values: OrganizerProfileSchema) => {
    updateProfileMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Profile updated successfully")
        queryClient.invalidateQueries({ queryKey: ["organizer-profile"] })
      },
      onError: (err: Error) => {
        if ("isAxiosError" in err) {
          populateError(form, err as IApiError)
        }
      },
    })
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className='space-y-3'>
        <Card withBorder radius='md' className='bg-white'>
          <Card.Section p='md' className='border-b border-gray-200'>
            <Text size='sm' fw={500} className='text-gray-700'>
              Organization Profile
            </Text>
            <Text size='xs' className='text-gray-500 mt-1'>
              Update your organization&apos;s profile information
            </Text>
          </Card.Section>

          <div className='space-y-4 p-4'>
            <UploadInput
              label='Logo'
              name='logo'
              control={form.control}
              uploadProps={{
                accept: "image/*",
                multiple: false,
              }}
            />

            <div className='grid md:grid-cols-2 gap-4'>
              <TextInput
                label='Organization Name'
                placeholder='Enter organization name'
                control={form.control}
                name='name'
              />

              <Select
                label='Organization Type'
                placeholder='Select organization type'
                data={[
                  { value: OrganizerType.INSTITUTE, label: "Institute" },
                  { value: OrganizerType.ORGANIZATION, label: "Organization" },
                  { value: OrganizerType.INDIVIDUAL, label: "Individual" },
                  { value: OrganizerType.COLLEGE, label: "College" },
                  { value: OrganizerType.SCHOOL, label: "School" },
                  { value: OrganizerType.OTHER, label: "Other" },
                ]}
                control={form.control}
                name='type'
              />
            </div>

            <div className='grid md:grid-cols-2 gap-4'>
              <TextInput
                label='Email'
                placeholder='Enter email'
                control={form.control}
                name='email'
              />

              <PhoneNumberInput
                label='Phone Number'
                placeholder='Enter phone number'
                control={form.control}
                name='phone'
              />
            </div>

            <TextInput
              label='Subdomain'
              placeholder='Enter subdomain'
              control={form.control}
              name='subdomain'
              rightSectionWidth={90}
              rightSection='.certchain.co'
              rightSectionProps={{
                className: "text-gray-500 text-xs",
              }}
            />
          </div>
        </Card>

        <Button
          type='submit'
          loading={updateProfileMutation.isPending}
          className='w-full'
        >
          Update Profile
        </Button>
      </div>
    </form>
  )
}

export default OrganizerProfileForm

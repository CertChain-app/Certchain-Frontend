import OImage from "@/modules/core/components/o-image"
import { useOrganizerContext } from "@/modules/organizer/contexts/organizer-context"
import { Group, Stack, Text } from "@mantine/core"
import { AtSignIcon, PhoneIcon } from "lucide-react"

export const OrganizerHeader = () => {
  const { organizer } = useOrganizerContext()

  if (!organizer) return null

  return (
    <header className='bg-gradient-to-r from-blue-100/10 to-blue-100/5 py-16'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12'>
          {organizer.logo && (
            <OImage
              width={300}
              height={75}
              src={organizer.logo}
              alt={organizer.name}
              className='h-auto w-40 md:w-48 object-contain'
            />
          )}
          <Stack gap='md' className='text-center md:text-left flex-1'>
            <div>
              <h1 className='text-4xl font-bold tracking-tight text-gray-900 md:text-5xl'>
                {organizer.name}
              </h1>
              <Text size='lg' c='dimmed' mt='xs'>
                {organizer.type.charAt(0) +
                  organizer.type.slice(1).toLowerCase()}{" "}
              </Text>
            </div>

            <div className='flex flex-col gap-2 md:flex-row md:gap-8'>
              <Group gap='xs'>
                <AtSignIcon size={18} className='text-blue-600' />
                <Text>{organizer.email || "contact@example.com"}</Text>
              </Group>
              <Group gap='xs'>
                <PhoneIcon size={18} className='text-blue-600' />
                <Text>{organizer.phone || "+1 234 567 890"}</Text>
              </Group>
            </div>
          </Stack>
        </div>
      </div>
    </header>
  )
}

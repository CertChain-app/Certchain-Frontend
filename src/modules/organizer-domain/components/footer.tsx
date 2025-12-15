import Logo from "@/modules/core/components/logo"
import OImage from "@/modules/core/components/o-image"
import { useOrganizerContext } from "@/modules/organizer/contexts/organizer-context"
import { Group, Stack, Text } from "@mantine/core"
import { AtSignIcon, PhoneIcon } from "lucide-react"
import Link from "next/link"

export const Footer = () => {
  const { organizer } = useOrganizerContext()

  if (!organizer) return null

  return (
    <footer className='border-t bg-gray-50'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid gap-8 md:grid-cols-2'>
          <div>
            {organizer.logo && (
              <OImage
                width={200}
                height={50}
                src={organizer.logo}
                alt={organizer.name}
                className='mb-4 h-auto w-32 object-contain'
              />
            )}
            <Text size='lg' fw={500}>
              {organizer.name}
            </Text>
          </div>

          <Stack gap='sm'>
            <Group gap='xs'>
              <AtSignIcon size={18} className='text-blue-600' />
              <Text>{organizer.email || "contact@example.com"}</Text>
            </Group>
            <Group gap='xs'>
              <PhoneIcon size={18} className='text-blue-600' />
              <Text>{organizer.phone || "+1 234 567 890"}</Text>
            </Group>
          </Stack>
        </div>
      </div>

      <div className='border-t bg-gray-100 py-4'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col items-center gap-4 md:flex-row md:justify-between'>
            <Link href='https://certchain.co' target='_blank'>
              <Logo className='w-36' />
            </Link>
            <Text size='sm' c='dimmed'>
              © {new Date().getFullYear()} CertChain.co. All rights reserved.
            </Text>
          </div>
        </div>
      </div>
    </footer>
  )
}

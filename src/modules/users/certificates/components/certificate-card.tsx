import { ICertificate } from "@/modules/types"
import { Badge, Button, Card, Group, Text } from "@mantine/core"
import dayjs from "dayjs"
import Link from "next/link"
import type { FC } from "react"

interface CertificateCardProps {
  certificate: ICertificate
}

const CertificateCard: FC<CertificateCardProps> = ({ certificate }) => {
  if (!certificate?.id) return null
  const eventTitle = certificate.event?.title ?? "Untitled Event"
  const issuedAt = certificate.createdAt
    ? dayjs(certificate.createdAt).format("MMM D, YYYY")
    : ""

  return (
    <Card
      withBorder
      radius='lg'
      className='bg-white/90 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow'
    >
      <div className='flex items-start gap-4'>
        <div className='h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold'>
          CC
        </div>
        <div className='flex-1'>
          <Text fw={600} className='text-gray-900 line-clamp-2'>
            {eventTitle}
          </Text>
          <Text size='sm' c='dimmed'>
            Issued {issuedAt}
          </Text>
          <Group gap='xs' mt='xs'>
            <Badge variant='light' color='blue'>
              Verified
            </Badge>
            {certificate.event?.organizer?.name && (
              <Badge variant='outline' color='gray'>
                {certificate.event.organizer.name}
              </Badge>
            )}
          </Group>
        </div>
      </div>
      <Group justify='space-between' mt='md'>
        <Text size='xs' c='dimmed'>
          ID: {certificate.id}
        </Text>
        <Button
          component={Link}
          href={`/certificates/${certificate.id}`}
          variant='light'
          size='xs'
        >
          View Certificate
        </Button>
      </Group>
    </Card>
  )
}

export default CertificateCard

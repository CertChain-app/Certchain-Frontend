"use client"

import UserProtectedRoute from "@/modules/users/auth/components/protected-route"
import { Anchor, Breadcrumbs, SimpleGrid, Text, Title } from "@mantine/core"
import Link from "next/link"
import type { FC } from "react"
import { ICertificate } from "@/modules/types"
import CertificateCard from "../components/certificate-card"
import { useEvents } from "@/modules/users/user-events/queries/use-events"

const UserCertificatesTemplate: FC = () => {
  const { data, isLoading } = useEvents({
    page: 1,
    limit: 100,
    search: "",
    searchFields: "",
    sort: "",
  })
  const userEvents = data?.data?.data ?? []
  const certificates = userEvents.flatMap((userEvent) => {
    if (!userEvent.certificate) return []

    if (typeof userEvent.certificate === "string") {
      if (!userEvent.certificate) return []
      return [
        {
          id: userEvent.certificate,
          event: userEvent.event,
          eventId: userEvent.event?.id ?? "",
          user: userEvent.user,
          userId: userEvent.user?.id ?? "",
          createdAt: userEvent.event?.endDate ?? new Date(),
          updatedAt: userEvent.event?.endDate ?? new Date(),
        } satisfies ICertificate,
      ]
    }

    const certificateId =
      userEvent.certificate?.id ||
      (userEvent.certificate as { certificateId?: string })?.certificateId ||
      ""
    if (!certificateId) return []

    return [
      {
        ...userEvent.certificate,
        id: certificateId,
        event: userEvent.certificate?.event ?? userEvent.event,
        eventId:
          userEvent.certificate?.eventId ?? userEvent.event?.id ?? "",
        user: userEvent.certificate?.user ?? userEvent.user,
        userId: userEvent.certificate?.userId ?? userEvent.user?.id ?? "",
        createdAt:
          userEvent.certificate?.createdAt ??
          userEvent.event?.endDate ??
          new Date(),
        updatedAt:
          userEvent.certificate?.updatedAt ??
          userEvent.certificate?.createdAt ??
          userEvent.event?.endDate ??
          new Date(),
      } satisfies ICertificate,
    ]
  })

  return (
    <UserProtectedRoute>
      <div className='p-6'>
        <Breadcrumbs className='mb-6'>
          <Anchor component={Link} href='/dashboard' size='sm'>
            Dashboard
          </Anchor>
          <Text size='sm'>My Certificates</Text>
        </Breadcrumbs>

        <div className='mb-6'>
          <Title order={1} className='text-2xl font-semibold text-gray-900'>
            My Certificates
          </Title>
          <Text className='text-gray-500 mt-1'>
            View and download your verified certificates
          </Text>
        </div>

        <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing='lg'>
          {certificates.map((certificate) => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </SimpleGrid>

        {!isLoading && certificates.length === 0 && (
          <Text className='text-gray-500 mt-8'>
            You don&apos;t have any certificates yet.
          </Text>
        )}
      </div>
    </UserProtectedRoute>
  )
}

export default UserCertificatesTemplate

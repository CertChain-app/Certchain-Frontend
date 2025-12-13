"use client"

import {
  Button,
  Grid,
  Group,
  Paper,
  Tabs,
  Text,
  ThemeIcon,
} from "@mantine/core"
import { modals } from "@mantine/modals"
import { IconArrowLeft, IconCheck } from "@tabler/icons-react"
import { PenIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  TbCertificate,
  TbChartBar,
  TbCurrencyRupeeNepalese,
  TbUsers,
} from "react-icons/tb"
import { useLink } from "../../common/utils/link"
import { useDeleteEvent } from "../mutations/use-delete-event"
import { useMarkEventAsCompleted } from "../mutations/use-mark-event-as-completed"
import { useEvent } from "../queries/use-event"
import CertificatesTab from "../tabs/certificates"
import EventDetailTab from "../tabs/detail"
import EventJoineesTab from "../tabs/joinees"

interface EventDetailTemplateProps {
  eventId: string
}

export default function EventDetailTemplate({
  eventId,
}: EventDetailTemplateProps) {
  const { data: event } = useEvent(eventId)
  const { getLink } = useLink()
  const router = useRouter()
  const eventData = event?.data?.data
  const deleteMutation = useDeleteEvent()
  const markAsCompletedMutation = useMarkEventAsCompleted()
  if (!eventData) {
    return null
  }

  return (
    <div className='p-6 max-w-7xl mx-auto'>
      <Group justify='space-between' className='mb-4'>
        <Button
          leftSection={<IconArrowLeft size={16} />}
          variant='subtle'
          onClick={() => router.push(getLink("dashboard/events"))}
        >
          Back to Events
        </Button>

        <Group>
          <Button
            component={Link}
            href={getLink(`dashboard/events/${eventId}/edit`)}
            variant='outline'
            leftSection={<PenIcon className='w-4 h-4' />}
          >
            Edit
          </Button>
          {!eventData?.completedAt && (
            <Button
              variant='filled'
              loading={markAsCompletedMutation.isPending}
              onClick={() =>
                modals.openConfirmModal({
                  title: "Mark as Completed",
                  children: (
                    <Text>
                      Are you sure you want to mark this event as completed?
                      You&apos;ll be able to generate the certificate for all
                      the users, after you mark this event as completed.
                    </Text>
                  ),
                  labels: { confirm: "Mark as Completed", cancel: "Cancel" },
                  onConfirm: () => {
                    markAsCompletedMutation.mutate(eventId)
                  },
                })
              }
              leftSection={<IconCheck size={16} />}
            >
              Mark as Completed
            </Button>
          )}
          <Button
            loading={deleteMutation.isPending}
            variant='filled'
            color='red'
            leftSection={<TrashIcon className='w-4 h-4' />}
            onClick={() => {
              modals.openConfirmModal({
                title: "Delete Event",
                children: (
                  <Text>Are you sure you want to delete this event?</Text>
                ),
                labels: { confirm: "Delete", cancel: "Cancel" },
                confirmProps: { color: "red" },
                onConfirm: () => {
                  deleteMutation.mutate(eventId)
                },
              })
            }}
          >
            Delete
          </Button>
        </Group>
      </Group>

      <Grid className='mb-6'>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Paper
            p='md'
            radius='md'
            className='bg-white/70 backdrop-blur-md shadow-lg border border-opacity-20'
          >
            <Group>
              <ThemeIcon
                size='lg'
                radius='md'
                variant='light'
                color='blue'
                className='bg-blue-100'
              >
                <TbUsers size={20} className='text-blue-600' />
              </ThemeIcon>
              <div>
                <Text size='xs' c='dimmed'>
                  Total Participants
                </Text>
                <Text fw={700} size='xl'>
                  {eventData?.analytics?.totalParticipants || 0}
                </Text>
              </div>
            </Group>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Paper
            p='md'
            radius='md'
            className='bg-white/70 backdrop-blur-md shadow-lg border border-opacity-20'
          >
            <Group>
              <ThemeIcon
                size='lg'
                radius='md'
                variant='light'
                color='teal'
                className='bg-teal-100'
              >
                <TbCertificate size={20} className='text-teal-600' />
              </ThemeIcon>
              <div>
                <Text size='xs' c='dimmed'>
                  Total Certificates
                </Text>
                <Text fw={700} size='xl'>
                  {eventData?.analytics?.totalCertificates || 0}
                </Text>
              </div>
            </Group>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Paper
            p='md'
            radius='md'
            className='bg-white/70 backdrop-blur-md shadow-lg border border-opacity-20'
          >
            <Group>
              <ThemeIcon
                size='lg'
                radius='md'
                variant='light'
                color='green'
                className='bg-green-100'
              >
                <TbChartBar size={20} className='text-green-600' />
              </ThemeIcon>
              <div>
                <Text size='xs' c='dimmed'>
                  Certificate Rate
                </Text>
                <Text fw={700} size='xl'>
                  {eventData?.analytics?.certificateRate?.toFixed(1) || 0}%
                </Text>
              </div>
            </Group>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Paper
            p='md'
            radius='md'
            className='bg-white/70 backdrop-blur-md shadow-lg border border-opacity-20'
          >
            <Group>
              <ThemeIcon
                size='lg'
                radius='md'
                variant='light'
                color='violet'
                className='bg-violet-100'
              >
                <TbCurrencyRupeeNepalese
                  size={20}
                  className='text-violet-600'
                />
              </ThemeIcon>
              <div>
                <Text size='xs' c='dimmed'>
                  Total Revenue
                </Text>
                <Text fw={700} size='xl'>
                  NPR.
                  {(
                    eventData?.analytics?.totalRevenue / 100
                  )?.toLocaleString() || 0}
                </Text>
              </div>
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>

      <Tabs variant='outline' color='gray' defaultValue='details'>
        <Tabs.List>
          <Tabs.Tab value='details'>Details</Tabs.Tab>
          <Tabs.Tab value='joinees'>Joinees</Tabs.Tab>
          <Tabs.Tab value='certificates'>Certificates</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel variant='outline' className='border p-2' value='details'>
          <EventDetailTab eventData={eventData} />
        </Tabs.Panel>
        <Tabs.Panel variant='outline' className='border p-2' value='joinees'>
          <EventJoineesTab eventId={eventId} />
        </Tabs.Panel>
        <Tabs.Panel
          variant='outline'
          className='border p-2'
          value='certificates'
        >
          <CertificatesTab event={eventData} />
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

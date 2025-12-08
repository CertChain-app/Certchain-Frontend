"use client"
import { Grid, Group, Paper, Text, ThemeIcon } from "@mantine/core"
import { FC } from "react"
import {
  TbCertificate,
  TbChartBar,
  TbCurrencyRupeeNepalese,
  TbUsers,
} from "react-icons/tb"
import { useSession } from "../../auth/queries/use-session"
import { useOrganizer } from "../../common/queries/use-organizer"

export const DashboardTemplate: FC = () => {
  const { user } = useSession()
  const { data: organizer } = useOrganizer(user?.organizerId ?? "")
  const analytics = organizer?.data?.data?.analytics

  if (!analytics) {
    return <Text>Loading analytics...</Text>
  }

  return (
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
              color='violet'
              className='bg-violet-100'
            >
              <TbCurrencyRupeeNepalese size={20} className='text-violet-600' />
            </ThemeIcon>
            <div>
              <Text size='xs' c='dimmed'>
                Total Revenue
              </Text>
              <Text fw={700} size='xl'>
                {`NPR ${analytics.totalRevenue.toLocaleString()}`}
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
                {analytics.totalParticipants.toLocaleString()}
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
                {analytics.totalCertificates.toLocaleString()}
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
                {(analytics.certificateRate * 100).toFixed(1)}%
              </Text>
            </div>
          </Group>
        </Paper>
      </Grid.Col>
    </Grid>
  )
}

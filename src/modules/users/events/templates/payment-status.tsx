"use client"

import { Alert, Loader, Paper, Stack, Text, Title } from "@mantine/core"
import { IconCheck, IconX } from "@tabler/icons-react"
import { useCheckPaymentStatus } from "../queries/use-check-payment-status"

export const PaymentStatusTemplate = ({ pidx }: { pidx: string }) => {
  const { data: res, isLoading } = useCheckPaymentStatus(pidx, !!pidx)

  if (isLoading) {
    return (
      <Paper p='xl' mx='auto' maw={500}>
        <Stack align='center' gap='md'>
          <Loader />
          <Text>Verifying payment...</Text>
        </Stack>
      </Paper>
    )
  }

  if (!res?.data?.data) {
    return (
      <Paper p='xl' mx='auto' maw={500}>
        <Alert variant='filled' color='red'>
          Failed to verify payment. Please try again.
        </Alert>
      </Paper>
    )
  }

  if (res?.data?.message === "PAYMENT_ALREADY_VERIFIED") {
    return (
      <Paper p='xl' mx='auto' maw={500}>
        <Stack align='center' gap='md'>
          <IconX size={48} color='red' />
          <Title order={3}>Payment Failed</Title>
          <Text>Your payment has already been verified.</Text>
        </Stack>
      </Paper>
    )
  }

  return (
    <Paper p='xl' mx='auto' maw={500}>
      <Stack align='center' gap='md'>
        {res?.data?.message === "PAYMENT_VERIFIED" ? (
          <Stack align='center' gap='md'>
            <IconCheck size={48} color='green' />
            <Title order={3}>Payment Successful</Title>
            <Text>Your payment has been verified successfully.</Text>
          </Stack>
        ) : (
          <Stack align='center' gap='md'>
            <IconX size={48} color='red' />
            <Title order={3}>Payment Failed</Title>
            <Text>Your payment could not be verified. Please try again.</Text>
          </Stack>
        )}
      </Stack>
    </Paper>
  )
}

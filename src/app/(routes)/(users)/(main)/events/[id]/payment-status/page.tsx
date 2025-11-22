import { PaymentStatusTemplate } from "@/modules/users/events/templates/payment-status"

interface PaymentStatusPageProps {
  searchParams: Promise<{
    pidx: string
  }>
}

export default async function PaymentStatusPage({
  searchParams,
}: PaymentStatusPageProps) {
  const { pidx } = await searchParams
  return (
    <div className='flex justify-center items-center my-10'>
      <PaymentStatusTemplate pidx={pidx} />
    </div>
  )
}

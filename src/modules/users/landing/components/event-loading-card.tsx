import { Card, Skeleton } from "@mantine/core"

export function EventLoadingCard() {
  return (
    <Card withBorder className='bg-white overflow-hidden'>
      <Skeleton height={200} className='w-full' />
      <div className='p-6'>
        <Skeleton height={24} width='70%' className='mb-2' />
        <Skeleton height={20} width='40%' className='mb-2' />
        <Skeleton height={20} width='60%' className='mb-2' />
        <Skeleton height={36} className='mt-4 w-full' />
      </div>
    </Card>
  )
}

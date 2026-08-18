import type { FC } from "react"

export const EventLoadingCard: FC = () => {
  return (
    <div className='overflow-hidden rounded-xl border border-border bg-card'>
      <div className='aspect-[16/10] animate-pulse bg-muted' />
      <div className='space-y-3 p-5'>
        <div className='h-4 w-3/4 animate-pulse rounded bg-muted' />
        <div className='h-3 w-2/5 animate-pulse rounded bg-muted' />
        <div className='h-3 w-3/5 animate-pulse rounded bg-muted' />
        <div className='h-3 w-1/4 animate-pulse rounded bg-muted' />
      </div>
    </div>
  )
}

import { Card } from "@mantine/core"

interface TestimonialCardProps {
  quote: string
  author: string
  position: string
}

export function TestimonialCard({
  quote,
  author,
  position,
}: TestimonialCardProps) {
  return (
    <Card withBorder className='bg-white p-6'>
      <p className='mb-4 text-lg italic text-gray-700'>&ldquo;{quote}&rdquo;</p>
      <div>
        <p className='font-semibold'>{author}</p>
        <p className='text-sm text-gray-600'>{position}</p>
      </div>
    </Card>
  )
}

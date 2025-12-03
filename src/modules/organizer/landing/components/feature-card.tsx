import { Card } from "@mantine/core"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card withBorder className='bg-white p-6'>
      <div className='mb-4'>{icon}</div>
      <h3 className='mb-2 text-lg md:text-xl font-semibold'>{title}</h3>
      <p className='text-gray-600 text-sm md:text-base'>{description}</p>
    </Card>
  )
}

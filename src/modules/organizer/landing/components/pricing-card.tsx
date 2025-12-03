import { Button, Card } from "@mantine/core"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

interface PricingCardProps {
  title: string
  price: string
  features: string[]
  highlighted?: boolean
}

export function PricingCard({
  title,
  price,
  features,
  highlighted = false,
}: PricingCardProps) {
  return (
    <Card
      withBorder
      className={`p-6 ${
        highlighted
          ? "bg-gradient-to-b from-blue-500 to-purple-500 text-white"
          : "bg-white"
      }`}
    >
      <h3 className='text-2xl font-bold mb-4'>{title}</h3>
      <p className='text-4xl font-bold mb-6'>
        {price}
        <span className='text-lg font-normal'>
          {price !== "Custom" && "/mo"}
        </span>
      </p>
      <ul className='space-y-2 mb-6'>
        {features.map((feature, index) => (
          <li key={index} className='flex items-center'>
            <CheckCircle className='h-5 w-5 mr-2 flex-shrink-0' />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        component={Link}
        href='/organizers/auth/register'
        className={`w-full ${
          highlighted
            ? "bg-white text-blue-500 hover:bg-gray-100"
            : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
        }`}
      >
        {price === "Custom" ? "Contact Sales" : "Get Started"}
      </Button>
    </Card>
  )
}

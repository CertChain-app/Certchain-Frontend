import { LucideIcon } from "lucide-react"

export interface Feature {
  title: string
  description: string
  icon: LucideIcon
}

export interface Testimonial {
  quote: string
  author: string
  position: string
}

export interface PricingTier {
  title: string
  price: string
  features: string[]
  highlighted?: boolean
}

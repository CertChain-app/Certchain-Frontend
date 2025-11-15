export interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

export interface Testimonial {
  quote: string
  author: string
  position: string
}

export interface Event {
  title: string
  date: string
  location: string
  image: string
}

export interface Step {
  number: string
  title: string
  description: string
  icon: React.ReactNode
}

export interface BlogPost {
  title: string
  excerpt: string
  author: string
  date: string
  image: string
}

export interface DashboardFeature {
  icon: React.ReactNode
  iconBgClass: string
  iconClass: string
  description: string
}

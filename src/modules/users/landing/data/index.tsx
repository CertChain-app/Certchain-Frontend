import {
  Award,
  BarChart,
  Calendar,
  BadgeIcon as Certificate,
  Compass,
  GraduationCap,
  Shield,
  Ticket,
  UserPlus,
  Users,
  Zap,
} from "lucide-react"
import type {
  BlogPost,
  DashboardFeature,
  Event,
  Feature,
  Step,
  Testimonial,
} from "../types"

export const features: Feature[] = [
  {
    icon: <Ticket className='h-8 w-8 text-blue-500' />,
    title: "Easy Event Access",
    description: "Store and access your event tickets securely in one place.",
  },
  {
    icon: <Certificate className='h-8 w-8 text-purple-500' />,
    title: "Verified Certificates",
    description:
      "Receive and showcase tamper-proof certificates backed by advanced technology.",
  },
  {
    icon: <Users className='h-8 w-8 text-blue-500' />,
    title: "Collaborative",
    description: "Connect with other professionals and grow your network.",
  },
  {
    icon: <Shield className='h-8 w-8 text-purple-500' />,
    title: "Secure Storage",
    description: "Keep all your credentials safe with advanced encryption.",
  },
  {
    icon: <Zap className='h-8 w-8 text-blue-500' />,
    title: "Instant Verification",
    description:
      "Share and verify your certificates with potential employers instantly.",
  },
  {
    icon: <BarChart className='h-8 w-8 text-purple-500' />,
    title: "Analytics",
    description:
      "Track your professional growth with detailed insights and analytics.",
  },
]

export const testimonials: Testimonial[] = [
  {
    quote:
      "CertChain has made managing my professional certifications a breeze. I love how easily I can share my achievements!",
    author: "Alex Johnson",
    position: "Software Developer",
  },
  {
    quote:
      "The blockchain verification gives our certificates the credibility they deserve. Highly recommended!",
    author: "Sarah Lee",
    position: "Marketing Specialist",
  },
  {
    quote:
      "I've discovered so many great events through CertChain. It's become my go-to platform for professional development.",
    author: "Michael Chen",
    position: "Data Scientist",
  },
]

export const events: Event[] = [
  {
    title: "Tech Conference 2024",
    date: "May 15-17, 2024",
    location: "San Francisco, CA",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Digital Marketing Summit",
    date: "June 5-6, 2024",
    location: "New York, NY",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "AI & Machine Learning Expo",
    date: "July 10-12, 2024",
    location: "Boston, MA",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export const steps: Step[] = [
  {
    number: "1",
    title: "Create Account",
    description: "Sign up for free and set up your profile in minutes.",
    icon: <UserPlus className='h-12 w-12 text-blue-500' />,
  },
  {
    number: "2",
    title: "Discover Events",
    description: "Browse and register for events that match your interests.",
    icon: <Compass className='h-12 w-12 text-purple-500' />,
  },
  {
    number: "3",
    title: "Attend & Learn",
    description: "Participate in events and expand your knowledge and network.",
    icon: <GraduationCap className='h-12 w-12 text-blue-500' />,
  },
  {
    number: "4",
    title: "Earn Certificates",
    description:
      "Receive verified certificates for your participation and achievements.",
    icon: <Award className='h-12 w-12 text-purple-500' />,
  },
]

export const blogPosts: BlogPost[] = [
  {
    title: "The Future of Event Certification",
    excerpt:
      "Explore how advanced technology is revolutionizing the way we verify and store professional credentials.",
    author: "Emma Watson",
    date: "April 15, 2024",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Top 5 Networking Tips for Virtual Events",
    excerpt:
      "Learn how to make meaningful connections at online conferences and workshops.",
    author: "James Smith",
    date: "April 10, 2024",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Maximizing Your Professional Development",
    excerpt:
      "Discover strategies to leverage your digital certificates for career growth.",
    author: "Olivia Parker",
    date: "April 5, 2024",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export const dashboardFeatures: DashboardFeature[] = [
  {
    icon: <Calendar />,
    iconBgClass: "bg-blue-100",
    iconClass: "text-blue-500",
    description: "Track your event participation",
  },
  {
    icon: <Certificate />,
    iconBgClass: "bg-purple-100",
    iconClass: "text-purple-500",
    description: "Manage your earned certificates",
  },
  {
    icon: <Users />,
    iconBgClass: "bg-green-100",
    iconClass: "text-green-500",
    description: "Connect with other professionals",
  },
  {
    icon: <BarChart />,
    iconBgClass: "bg-yellow-100",
    iconClass: "text-yellow-500",
    description: "Get personalized event recommendations",
  },
]

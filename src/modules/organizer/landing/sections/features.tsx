import { CheckCircle, Globe, Shield, Star, Users, Zap } from "lucide-react"
import type { FC } from "react"
import { FeatureCard } from "../components/feature-card"

const features = [
  {
    icon: Zap,
    iconClass: "text-blue-500",
    title: "Lightning Fast",
    description: "Issue and verify certificates in seconds, not days.",
  },
  {
    icon: Shield,
    iconClass: "text-purple-500",
    title: "Blockchain Secured",
    description: "Tamper-proof certificates backed by blockchain technology.",
  },
  {
    icon: Users,
    iconClass: "text-blue-500",
    title: "Collaborative",
    description: "Easy team management and multi-user access controls.",
  },
  {
    icon: Globe,
    iconClass: "text-purple-500",
    title: "Global Reach",
    description: "Host events and issue certificates worldwide.",
  },
  {
    icon: CheckCircle,
    iconClass: "text-blue-500",
    title: "Customizable",
    description: "Tailor certificates and event pages to your brand.",
  },
  {
    icon: Star,
    iconClass: "text-purple-500",
    title: "Analytics",
    description:
      "Gain insights with comprehensive event and certification analytics.",
  },
]

const FeaturesSection: FC = ({}) => {
  return (
    <section id='features' className='bg-gray-100 py-20'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-12 text-center text-2xl font-bold sm:text-3xl'>
          Why Choose CertChain?
        </h2>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={<feature.icon className={feature.iconClass} />}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection

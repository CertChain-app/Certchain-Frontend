import type { FC } from "react"
import { PricingCard } from "../components/pricing-card"

const PricingSection: FC = ({}) => {
  return (
    <section id='pricing' className='bg-white py-20'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-12 text-center text-3xl font-bold'>
          Simple, Transparent Pricing
        </h2>
        <div className='grid gap-8 md:grid-cols-4'>
          <PricingCard
            title='Free'
            price='₹0'
            features={["1 event", "Unlimited certificates", "Email support"]}
          />
          <PricingCard
            title='Starter'
            price='₹3,999'
            features={[
              "5 events per month",
              "500 certificates",
              "Basic analytics",
              "Email support",
            ]}
          />
          <PricingCard
            title='Pro'
            price='₹7,999'
            features={[
              "Unlimited events",
              "8000 certificates",
              "Advanced analytics",
              "Priority support",
              "Custom branding",
            ]}
            highlighted={true}
          />
          <PricingCard
            title='Enterprise'
            price='Custom'
            features={[
              "Unlimited events",
              "Unlimited certificates",
              "Dedicated account manager",
              "API access",
              "On-premise deployment option",
              "24/7 phone support",
            ]}
          />
        </div>
      </div>
    </section>
  )
}

export default PricingSection

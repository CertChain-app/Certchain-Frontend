import Image from "next/image"
import type { FC } from "react"
import { dashboardFeatures } from "../data"

export const DashboardPreviewSection: FC = () => {
  return (
    <section id='dashboard-preview' className='bg-gray-100 py-20'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-12 text-center text-3xl font-bold'>
          Your Personalized Dashboard
        </h2>
        <div className='grid md:grid-cols-2 gap-8 items-center'>
          <div className='space-y-6'>
            <h3 className='text-2xl font-semibold mb-4'>
              Manage Your Professional Journey
            </h3>
            <ul className='space-y-4'>
              {dashboardFeatures.map((feature, index) => (
                <li
                  key={index}
                  className='flex items-center space-x-3 bg-white rounded-lg p-3 shadow-sm transition-all hover:shadow-md'
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full ${feature.iconBgClass} flex items-center justify-center`}
                  >
                    <div className={feature.iconClass}>{feature.icon}</div>
                  </div>
                  <span className='text-gray-700'>{feature.description}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className='bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-lg shadow-lg'>
            <Image
              src='/placeholder.svg?height=400&width=600'
              alt='Dashboard Preview'
              width={600}
              height={400}
              className='w-full h-auto rounded-lg shadow-md'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

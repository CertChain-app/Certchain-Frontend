import { Button, Card } from "@mantine/core"
import type { FC } from "react"

export const CtaSection: FC = () => {
  return (
    <section className='bg-gray-100 py-20'>
      <div className='container mx-auto px-4'>
        <Card className='bg-gradient-to-r from-blue-50 to-purple-50 p-8 text-center'>
          <h2 className='mb-4 text-3xl font-bold text-gray-900'>
            Ready to Elevate Your Event Experience?
          </h2>
          <p className='mb-8 text-xl text-gray-600'>
            Join thousands of professionals using CertChain to discover events,
            manage certificates, and grow their careers.
          </p>
          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <Button
              size='lg'
              radius='xl'
              className='bg-gradient-to-r from-blue-500 to-purple-500'
            >
              Create Your Free Account
            </Button>
            <Button
              variant='outline'
              size='lg'
              radius='xl'
              className='text-gray-900 border-gray-300 hover:bg-gray-100'
            >
              Explore Events
            </Button>
          </div>
        </Card>
      </div>
    </section>
  )
}

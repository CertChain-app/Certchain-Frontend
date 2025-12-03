import { Button, Card } from "@mantine/core"
import Link from "next/link"
import type { FC } from "react"

const CtaSection: FC = ({}) => {
  return (
    <section className='bg-white py-20'>
      <div className='container mx-auto px-4'>
        <Card
          withBorder
          className='bg-gradient-to-r from-blue-50 to-purple-50 p-8 text-center'
        >
          <h2 className='mb-4 text-3xl font-bold text-gray-900'>
            Ready to Transform Your Event Certification?
          </h2>
          <p className='mb-8 text-xl text-gray-600'>
            Join thousands of organizations already using CertChain to
            streamline their certification process.
          </p>
          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <Button
              className='bg-gradient-to-r from-blue-500 to-purple-500'
              component={Link}
              href='/organizers/auth/register'
              radius='xl'
              size='lg'
            >
              Start Your Free Trial
            </Button>
            <Button
              variant='outline'
              radius='xl'
              size='lg'
              className='text-gray-900 border-gray-300 hover:bg-gray-100'
            >
              Schedule a Demo
            </Button>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default CtaSection

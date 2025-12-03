import { Button, Card } from "@mantine/core"
import type { FC } from "react"

const FourDivisionsSection: FC = ({}) => {
  return (
    <section className='bg-white px-4 py-24'>
      <div className='container mx-auto max-w-7xl'>
        <div className='mb-16 text-center'>
          <h2 className='mb-4 text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl'>
            Four Divisions, One{" "}
            <span className='bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
              Common Goal
            </span>
          </h2>
          <p className='mx-auto max-w-2xl text-lg text-gray-600'>
            CertChain comprises four operational divisions aimed at facilitating
            your certification, event management, and development.
          </p>
        </div>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          <Card className='relative overflow-hidden rounded-xl border-0 bg-gray-50 p-6'>
            <div className='mb-8'>
              <svg
                className='h-16 w-16 text-blue-500'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1'
              >
                <path d='M12 6.5c0 2.5-4 2.5-4 2.5v-5s4 0 4 2.5z' />
                <path d='M8.5 4h7c.28 0 .5.22.5.5v15c0 .28-.22.5-.5.5h-7c-.28 0-.5-.22-.5-.5v-15c0-.28.22-.5.5-.5z' />
                <path d='M12 17.5c0-2.5-4-2.5-4-2.5v5s4 0 4-2.5z' />
              </svg>
            </div>
            <h3 className='mb-4 text-xl md:text-2xl font-medium text-gray-900'>
              Learn.
            </h3>
            <p className='mb-8 text-gray-600'>
              Learn how to manage events and issue certificates from 0 to
              enterprise scale using our comprehensive framework.
            </p>
            <Button
              variant='outline'
              className='border-gray-300 text-sm md:text-base text-gray-900 hover:bg-gray-100'
            >
              Learn The Program
            </Button>
          </Card>
          <Card className='relative overflow-hidden rounded-xl border-0 bg-gray-50 p-6'>
            <div className='mb-8'>
              <svg
                className='h-16 w-16 text-purple-500'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1'
              >
                <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' />
              </svg>
            </div>
            <h3 className='mb-4 text-xl md:text-2xl font-medium text-gray-900'>
              Build.
            </h3>
            <p className='mb-8 text-sm md:text-base text-gray-600'>
              We nurture organizations from ground zero, encompassing strategy,
              design, and execution of events.
            </p>
            <Button
              variant='outline'
              className='border-gray-300 text-sm md:text-base text-gray-900 hover:bg-gray-100'
            >
              Join Event
            </Button>
          </Card>
          <Card className='relative overflow-hidden rounded-xl border-0 bg-gray-50 p-6'>
            <div className='mb-8'>
              <svg
                className='h-16 w-16 text-blue-500'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1'
              >
                <path d='M20 12V8H4v4M20 16H4M20 20H4M4 4h16' />
                <path d='M12 12v8M8 12v8M16 12v8' />
              </svg>
            </div>
            <h3 className='mb-4 text-xl md:text-2xl font-medium text-gray-900'>
              Grow.
            </h3>
            <p className='mb-8 text-sm md:text-base text-gray-600'>
              We assist in growing your events 3x-5x through our incubation
              process, strategic support, and funding options.
            </p>
            <Button className='bg-gradient-to-r from-blue-500 to-purple-500 text-sm md:text-base text-white hover:opacity-90'>
              Register Your Organization
            </Button>
          </Card>
          <Card className='relative overflow-hidden rounded-xl border-0 bg-gray-50 p-6'>
            <div className='mb-8'>
              <svg
                className='h-16 w-16 text-purple-500'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1'
              >
                <path d='M17 8l4 4-4 4M7 16l-4-4 4-4' />
                <path d='M14 4l-4 16' />
              </svg>
            </div>
            <h3 className='mb-4 text-xl md:text-2xl font-medium text-gray-900'>
              Connect.
            </h3>
            <p className='mb-8 text-sm md:text-base text-gray-600'>
              The leading community for event organizers to collaborate, learn,
              form partnerships, and connect with participants.
            </p>
            <Button
              variant='outline'
              className='border-gray-300 text-sm md:text-base text-gray-900 hover:bg-gray-100'
            >
              Join Event
            </Button>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default FourDivisionsSection

import { Button } from "@mantine/core"
import type { FC } from "react"
import SearchForm from "../components/search-form"

export const HeroSection: FC = () => {
  return (
    <section className='bg-white'>
      <div className='container mx-auto px-4 py-20 text-center'>
        <h1 className='mb-6 text-4xl font-bold tracking-tight md:text-6xl'>
          Discover Events and Manage Certificates with{" "}
          <span className='bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
            CertChain
          </span>
        </h1>
        <p className='mx-auto mb-8 max-w-2xl text-xl text-gray-600'>
          Your all-in-one platform for finding events, storing tickets, and
          managing your earned certificates with advanced security.
        </p>
        <div className='mx-auto max-w-2xl mb-8'>
          <SearchForm />
        </div>
        <Button
          variant='gradient'
          radius='xl'
          size='xl'
          className='bg-gradient-to-r from-blue-500 to-purple-500'
        >
          Create Your Free Account
        </Button>
      </div>
    </section>
  )
}

import { Button, Input } from "@mantine/core"
import Link from "next/link"
import type { FC } from "react"

export const Footer: FC = () => {
  return (
    <footer className='bg-white py-12'>
      <div className='container mx-auto px-4'>
        <div className='grid gap-8 md:grid-cols-4'>
          <div>
            <div className='flex items-center gap-2 mb-4'>
              <div className='h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500' />
              <span className='text-xl font-bold'>CertChain</span>
            </div>
            <p className='text-gray-600'>
              Empowering your event journey with advanced security.
            </p>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='#' className='text-gray-600 hover:text-gray-900'>
                  Find Events
                </Link>
              </li>
              <li>
                <Link href='#' className='text-gray-600 hover:text-gray-900'>
                  My Certificates
                </Link>
              </li>
              <li>
                <Link href='#' className='text-gray-600 hover:text-gray-900'>
                  Networking
                </Link>
              </li>
              <li>
                <Link href='#' className='text-gray-600 hover:text-gray-900'>
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Company</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='#' className='text-gray-600 hover:text-gray-900'>
                  About Us
                </Link>
              </li>
              <li>
                <Link href='#' className='text-gray-600 hover:text-gray-900'>
                  Careers
                </Link>
              </li>
              <li>
                <Link href='#' className='text-gray-600 hover:text-gray-900'>
                  Partners
                </Link>
              </li>
              <li>
                <Link href='#' className='text-gray-600 hover:text-gray-900'>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Stay Connected</h3>
            <p className='text-gray-600 mb-4'>
              Get the latest updates on events and features.
            </p>
            <form className='flex'>
              <Input
                type='email'
                placeholder='Enter your email'
                className='rounded-r-none'
              />
              <Button
                type='submit'
                className='rounded-l-none bg-gradient-to-r from-blue-500 to-purple-500 text-white'
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className='mt-12 pt-8 border-t border-gray-200 text-center text-gray-600'>
          © 2024 CertChain. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

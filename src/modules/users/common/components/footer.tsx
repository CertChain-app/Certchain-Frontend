"use client"

import { Button, Input } from "@mantine/core"
import Link from "next/link"
import type { FC } from "react"
import { useLogout } from "@/modules/users/auth/mutations/use-logout"
import { useUserSession } from "@/modules/users/auth/queries/use-user-session"

export const Footer: FC = () => {
  const { isAuthenticated } = useUserSession()
  const logout = useLogout()

  return (
    <footer className='bg-white py-12'>
      <div className='container mx-auto px-6 md:px-10 lg:px-12'>
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
                <Link href='/events' className='text-gray-600 hover:text-gray-900'>
                  Find Events
                </Link>
              </li>
              <li>
                <Link
                  href='/dashboard/certificates'
                  className='text-gray-600 hover:text-gray-900'
                >
                  My Certificates
                </Link>
              </li>
              <li>
                <span className='text-gray-600 cursor-default'>
                  Networking
                </span>
              </li>
              <li>
                <span className='text-gray-600 cursor-default'>
                  Help Center
                </span>
              </li>
              {isAuthenticated && (
                <li>
                  <button
                    type='button'
                    onClick={() => logout.mutate()}
                    className='text-gray-600 hover:text-gray-900'
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Company</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='/about' className='text-gray-600 hover:text-gray-900'>
                  About Us
                </Link>
              </li>
              <li>
                <span className='text-gray-600 cursor-default'>
                  Careers
                </span>
              </li>
              <li>
                <span className='text-gray-600 cursor-default'>
                  Partners
                </span>
              </li>
              <li>
                <Link href='/contact' className='text-gray-600 hover:text-gray-900'>
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

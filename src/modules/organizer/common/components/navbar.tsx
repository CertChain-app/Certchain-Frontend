"use client"

import Logo from "@/modules/core/components/logo"
import { Button } from "@mantine/core"
import Link from "next/link"
import { FC } from "react"
import OrganizerGuestLoginButton from "../../auth/components/guest-login-button"

const Navbar: FC = ({}) => {
  return (
    <nav className='bg-white shadow-sm'>
      <div className='container mx-auto flex items-center justify-between p-4'>
        <Link href='/' className='flex items-center gap-2'>
          <Logo className='w-36' />
        </Link>
        <div className='hidden md:flex items-center gap-8'>
          <Link
            className='text-sm text-gray-600 hover:text-gray-900'
            href='#features'
          >
            Features
          </Link>
          <Link
            className='text-sm text-gray-600 hover:text-gray-900'
            href='#pricing'
          >
            Pricing
          </Link>
          <Link
            className='text-sm text-gray-600 hover:text-gray-900'
            href='#testimonials'
          >
            Testimonials
          </Link>
          <Link
            className='text-sm text-gray-600 hover:text-gray-900'
            href='#faq'
          >
            FAQ
          </Link>
        </div>
        <div className='flex items-center gap-4'>
          <OrganizerGuestLoginButton
            variant='subtle'
            color='indigo'
            label='Try the demo'
            visibleFrom='sm'
          />
          <Button
            variant='subtle'
            component={Link}
            href='/auth/login?as=organizer'
          >
            Login
          </Button>
          <Button
            component={Link}
            href='/auth/register?as=organizer'
            className='bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90'
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

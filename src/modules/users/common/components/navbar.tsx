"use client"
import Logo from "@/modules/core/components/logo"
import { Button, Drawer, Menu } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

import Link from "next/link"
import type { FC } from "react"
import UserSignedIn from "../../auth/components/signed-in"
import UserSignedOut from "../../auth/components/signed-out"

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Events", href: "#events" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Blog", href: "#blog" },
  { label: "For Organizers", href: "/organizers" },
]

export const Navbar: FC = () => {
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <nav className='bg-white shadow-sm'>
      <div className='container mx-auto flex items-center justify-between p-4'>
        <Link href='/' className='flex items-center gap-2'>
          <Logo className='w-36' />
        </Link>
        <div className='hidden md:flex items-center gap-8'>
          {navLinks.map((link) => (
            <Link
              className='text-sm text-gray-600 hover:text-gray-900'
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className='hidden md:flex items-center gap-4'>
          <UserSignedIn>
            {() => (
              <>
                <Button
                  className='bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90'
                  component={Link}
                  href='/dashboard'
                >
                  Dashboard
                </Button>
              </>
            )}
          </UserSignedIn>
          <UserSignedOut>
            <Button
              variant='subtle'
              className='text-gray-600 hover:text-gray-900'
              component={Link}
              href='/auth/login'
            >
              Sign in
            </Button>
            <Button
              className='bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90'
              component={Link}
              href='/auth/register'
            >
              Join Now
            </Button>
          </UserSignedOut>
        </div>
        <Button onClick={open} className='md:hidden'>
          <Menu />
        </Button>
        <Drawer opened={opened} onClose={close} title='Menu'>
          <nav className='flex flex-col gap-4'>
            {navLinks.map((link) => (
              <Link
                className='text-lg font-medium hover:text-blue-500'
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}

            <Button
              variant='ghost'
              className='justify-start px-0'
              component={Link}
              href='/auth/login'
            >
              Sign in
            </Button>
            <Button
              component={Link}
              href='/auth/register'
              className='bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90'
            >
              Join Now
            </Button>
          </nav>
        </Drawer>
      </div>
    </nav>
  )
}

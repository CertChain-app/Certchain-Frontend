"use client"

import { useLogout } from "@/modules/users/auth/mutations/use-logout"
import { useUserSession } from "@/modules/users/auth/queries/use-user-session"
import Link from "next/link"
import type { FC } from "react"
import { BrandMark } from "./brand-mark"

const COLUMNS = [
  {
    heading: "Product",
    items: [
      { label: "Find events", href: "/events" },
      { label: "My certificates", href: "/dashboard/certificates" },
      { label: "Verify", href: "/verify" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "For organizers", href: "/organizers" },
    ],
  },
]

export const Footer: FC = () => {
  const { isAuthenticated } = useUserSession()
  const logout = useLogout()

  return (
    <footer className='border-t border-border bg-background font-sans'>
      <div className='mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]'>
        <div>
          <BrandMark size='sm' />
          <p className='mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground'>
            Verifiable credentials for the events and achievements that move
            your career forward.
          </p>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.heading}>
            <p className='font-mono text-xs uppercase tracking-widest text-muted-foreground'>
              {column.heading}
            </p>
            <ul className='mt-4 space-y-2.5'>
              {column.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className='text-sm text-foreground/80 transition-colors hover:text-primary'
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className='font-mono text-xs uppercase tracking-widest text-muted-foreground'>
            Account
          </p>
          <ul className='mt-4 space-y-2.5'>
            {isAuthenticated ? (
              <li>
                <button
                  type='button'
                  onClick={() => logout.mutate()}
                  className='text-sm text-foreground/80 transition-colors hover:text-primary'
                >
                  Log out
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href='/auth/login'
                    className='text-sm text-foreground/80 transition-colors hover:text-primary'
                  >
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link
                    href='/auth/register'
                    className='text-sm text-foreground/80 transition-colors hover:text-primary'
                  >
                    Create an account
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <div className='border-t border-border'>
        <div className='mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6'>
          <p className='font-mono text-xs text-muted-foreground'>
            © {new Date().getFullYear()} CertChain. All rights reserved.
          </p>
          <p className='font-mono text-xs text-muted-foreground'>
            built on an open, verifiable ledger
          </p>
        </div>
      </div>
    </footer>
  )
}

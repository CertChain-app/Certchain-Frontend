"use client"

import { cn } from "@/modules/core/lib/utils"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState, type FC } from "react"
import UserSignedIn from "../../auth/components/signed-in"
import UserSignedOut from "../../auth/components/signed-out"
import { BrandMark } from "./brand-mark"
import { GuestButton } from "./guest-button"
import { ButtonLink } from "./ui/button"

const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Events", href: "/events" },
  { label: "Verify", href: "/verify" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Testimonials", href: "/#testimonials" },
]

/** Holds the row's height while the session resolves, so nothing jumps. */
const AuthPlaceholder = <span className='h-8 w-40' aria-hidden />

export const Navbar: FC = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Route changes come from anchor links inside the sheet too, so close on any.
  useEffect(() => setOpen(false), [pathname])

  return (
    <header className='sticky top-0 z-50 border-b border-border/70 bg-background/80 font-sans backdrop-blur-md'>
      <div className='mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6'>
        <BrandMark />

        <nav className='hidden items-center gap-7 md:flex'>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='text-sm text-muted-foreground transition-colors hover:text-foreground'
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className='hidden items-center gap-2 md:flex'>
          <UserSignedIn loader={AuthPlaceholder}>
            {() => (
              <ButtonLink href='/dashboard' size='sm'>
                Dashboard
              </ButtonLink>
            )}
          </UserSignedIn>
          <UserSignedOut loader={AuthPlaceholder}>
            <GuestButton
              label='Try the demo'
              size='sm'
              className='text-muted-foreground hover:text-foreground'
            />
            <ButtonLink
              href='/auth/login'
              variant='ghost'
              size='sm'
              className='text-muted-foreground hover:text-foreground'
            >
              Sign in
            </ButtonLink>
            <ButtonLink href='/auth/register' size='sm'>
              Join now
            </ButtonLink>
          </UserSignedOut>
        </div>

        <button
          type='button'
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className='inline-flex size-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted md:hidden'
        >
          {open ? <X className='size-4' /> : <Menu className='size-4' />}
        </button>
      </div>

      {/* mobile sheet */}
      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background transition-[max-height] duration-300 md:hidden",
          open ? "max-h-[32rem]" : "max-h-0 border-t-0"
        )}
      >
        <nav className='flex flex-col gap-1 px-4 py-4 sm:px-6'>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className='rounded-lg px-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted'
            >
              {link.label}
            </Link>
          ))}

          <div className='mt-3 flex flex-col gap-2 border-t border-border pt-4'>
            <UserSignedIn loader={AuthPlaceholder}>
              {() => (
                <ButtonLink href='/dashboard' size='lg'>
                  Dashboard
                </ButtonLink>
              )}
            </UserSignedIn>
            <UserSignedOut loader={AuthPlaceholder}>
              <GuestButton
                label='Try the demo'
                variant='outline'
                onDone={() => setOpen(false)}
              />
              <ButtonLink href='/auth/login' variant='outline' size='lg'>
                Sign in
              </ButtonLink>
              <ButtonLink href='/auth/register' size='lg'>
                Join now
              </ButtonLink>
            </UserSignedOut>
          </div>
        </nav>
      </div>
    </header>
  )
}

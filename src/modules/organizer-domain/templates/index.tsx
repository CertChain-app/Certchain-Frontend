"use client"

import Logo from "@/modules/core/components/logo"
import { useOrganizerContext } from "@/modules/organizer/contexts/organizer-context"
import { Button } from "antd"
import Link from "next/link"
import { Footer } from "../components/footer"
import { EventGrid } from "../sections/event-grid"
import { FeaturedEventSection } from "../sections/featured-event"
import { OrganizerHeader } from "../sections/organizer-header"

const OrganizerDomainTemplate = () => {
  const { organizer, events } = useOrganizerContext()

  if (!organizer) return null

  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-white py-5'>
        <div className='container flex items-center justify-between mx-auto px-4 '>
          <Link
            href='https://certchain.co'
            target='_blank'
            className='flex items-center gap-2'
          >
            <Logo className='w-36' />
          </Link>

          <div className='flex  items-center gap-2'>
            <Button variant='link'>
              <Link
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/organizers/${organizer.id}/dashboard`}
              >
                Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <OrganizerHeader />
      <main className='pb-16'>
        <FeaturedEventSection />
        <div className='container mx-auto px-10'>
          <EventGrid title='Currently Running Events' events={events} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default OrganizerDomainTemplate

import { createOrganizerMetadata } from "@/modules/core/lib/seo"
import {
  getEvents,
  getFeaturedEvent,
} from "@/modules/organizer-domain/actions/get-events"
import OrganizerProvider from "@/modules/organizer/providers/organizer-provider"
import { getOrganizerByDomain } from "@/modules/organizer/queries/get-organizer-by-domain"
import { IEvent, IOrganizer } from "@/modules/types"
import type { FC } from "react"

interface OrganizerLayoutProps {
  params: Promise<{ domain: string }>
  children: React.ReactNode
}

export const generateMetadata = async ({ params }: OrganizerLayoutProps) => {
  const { domain } = await params
  const organizer = await getOrganizerByDomain(domain)

  console.log(`organizer`, organizer)
  return createOrganizerMetadata({
    organizer: organizer.data as IOrganizer,
  })
}

const OrganizerLayout: FC<OrganizerLayoutProps> = async ({
  children,
  params,
}) => {
  const { domain } = await params
  const organizer = await getOrganizerByDomain(domain)

  const events = await getEvents(organizer.data?.id || "")
  const featuredEvent = await getFeaturedEvent(organizer.data?.id || "")

  console.log(`featuredEvent`, featuredEvent.data?.[0])

  return (
    <OrganizerProvider
      organizer={organizer.data as IOrganizer}
      domain={domain}
      events={(events.data || []) as IEvent[]}
      featuredEvent={featuredEvent.data?.[0] as IEvent | null}
    >
      <main className='bg-muted min-h-screen'>{children}</main>
    </OrganizerProvider>
  )
}

export default OrganizerLayout

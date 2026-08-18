/* eslint-disable @next/next/no-img-element */
import SampleCertificate from "@/modules/users/certificates/components/sample-certificate"
import VerifyCertificateForm from "@/modules/users/certificates/components/verify-form"
import type { Metadata } from "next"
import Link from "next/link"

interface CertificatePageProps {
  params: Promise<{ id: string }>
}

interface CertificateSummary {
  id: string
  createdAt: string
  user?: { firstName?: string; lastName?: string }
  event?: {
    id?: string
    title?: string
    handle?: string
    startDate?: string
    city?: string
    country?: string
    organizer?: { name?: string; logo?: string }
  }
}

const fetchCertificate = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/certificates/${id}`,
      { next: { revalidate: 300 } }
    )
    if (!res.ok) return null
    const body = (await res.json()) as { data?: CertificateSummary }
    return body?.data ?? null
  } catch {
    return null
  }
}

const holderName = (certificate: CertificateSummary | null) =>
  [certificate?.user?.firstName, certificate?.user?.lastName]
    .filter(Boolean)
    .join(" ")

const formatDate = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null

export async function generateMetadata({
  params,
}: CertificatePageProps): Promise<Metadata> {
  const { id } = await params
  const certificate = await fetchCertificate(id)

  const holder = holderName(certificate)
  const eventTitle = certificate?.event?.title
  const organizer = certificate?.event?.organizer?.name

  const title =
    holder && eventTitle ? `${holder} — ${eventTitle}` : "Verify certificate"
  const description =
    holder && eventTitle
      ? `${holder} completed ${eventTitle}${
          organizer ? `, issued by ${organizer}` : ""
        }. Verified by CertChain.`
      : "Verify a CertChain certificate."

  const image = `/certificates/${id}/image`

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div>
    <dt className='text-xs uppercase tracking-wide text-gray-500'>{label}</dt>
    <dd className='mt-1 font-medium text-gray-900'>{value}</dd>
  </div>
)

export default async function CertificatePage({
  params,
}: CertificatePageProps) {
  const { id } = await params
  const certificate = await fetchCertificate(id)

  if (!certificate) {
    return (
      <div className='min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10'>
        <div className='w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl text-center'>
          <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-2xl'>
            ⚠
          </div>
          <h1 className='text-xl font-semibold text-gray-900'>
            No certificate matches that ID
          </h1>
          <p className='mt-2 text-sm text-gray-600'>
            Check the ID and try again. A certificate that has been revoked or
            deleted will not verify either.
          </p>
          <div className='mt-6'>
            <VerifyCertificateForm />
          </div>

          <div className='mt-4'>
            <SampleCertificate compact />
          </div>
        </div>
      </div>
    )
  }

  const holder = holderName(certificate)
  const { event } = certificate
  const location = [event?.city, event?.country].filter(Boolean).join(", ")

  return (
    <div className='min-h-screen bg-slate-50 px-4 py-10'>
      <div className='mx-auto w-full max-w-5xl'>
        <div className='mb-4 flex items-center justify-center gap-2 text-sm font-medium text-emerald-700'>
          <span className='flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100'>
            ✓
          </span>
          Verified certificate
        </div>

        <div className='rounded-2xl bg-white shadow-xl overflow-hidden'>
          <img
            src={`/certificates/${id}/image`}
            alt={
              holder && event?.title
                ? `Certificate issued to ${holder} for ${event.title}`
                : "Certificate"
            }
            className='w-full h-auto block'
          />

          <dl className='grid gap-6 border-t border-gray-100 p-6 sm:grid-cols-2 lg:grid-cols-4'>
            {holder && <Detail label='Issued to' value={holder} />}
            {event?.title && <Detail label='Event' value={event.title} />}
            {event?.organizer?.name && (
              <Detail label='Issued by' value={event.organizer.name} />
            )}
            {formatDate(certificate.createdAt) && (
              <Detail
                label='Issued on'
                value={formatDate(certificate.createdAt) as string}
              />
            )}
            {location && <Detail label='Location' value={location} />}
          </dl>
        </div>

        <div className='mt-6 text-center text-sm text-gray-600'>
          {event?.id && (
            <Link
              href={`/events/${event.id}`}
              className='text-blue-600 hover:underline'
            >
              View the event
            </Link>
          )}
          <span className='mx-2 text-gray-300'>·</span>
          <Link href='/verify' className='text-blue-600 hover:underline'>
            Verify another certificate
          </Link>
        </div>
      </div>
    </div>
  )
}

/* eslint-disable @next/next/no-img-element */

interface CertificatePageProps {
  params: { id: string }
}

export default function CertificatePage({ params }: CertificatePageProps) {
  return (
    <div className='min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10'>
      <div className='w-full max-w-5xl rounded-2xl bg-white shadow-xl overflow-hidden'>
        <img
          src={`/certificates/${params.id}/image`}
          alt='Certificate'
          className='w-full h-auto block'
        />
      </div>
    </div>
  )
}

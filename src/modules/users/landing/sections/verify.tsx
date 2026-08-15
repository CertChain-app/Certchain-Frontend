import SampleCertificate from "@/modules/users/certificates/components/sample-certificate"
import VerifyCertificateForm from "@/modules/users/certificates/components/verify-form"
import type { FC } from "react"

export const VerifySection: FC = () => {
  return (
    <section id='verify' className='bg-white py-20'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-gray-50 p-8 sm:p-10'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold tracking-tight sm:text-3xl'>
              Got a certificate? Check it here.
            </h2>
            <p className='mx-auto mt-3 max-w-xl text-gray-600'>
              Paste a certificate ID or link to see who it was issued to, for
              which event, and by whom. No account required.
            </p>
          </div>

          <div className='mx-auto mt-6 max-w-xl'>
            <VerifyCertificateForm size='md' />

            <div className='mt-4 text-center'>
              <SampleCertificate compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import type { FC } from "react"
import OrganizerRegisterForm from "../form/form"

const OrganizerRegisterTemplate: FC = ({}) => {
  return (
    <div className='container mx-auto px-4 py-12'>
      <div className='max-w-2xl mx-auto text-center'>
        <h1 className='text-4xl font-bold mb-4'>Create Your Account</h1>
        <p className='text-gray-600 text-lg mb-8'>
          Join thousands of event organizers who trust CertChain to manage their
          certifications. Get started with your free trial today.
        </p>
      </div>
      <OrganizerRegisterForm />
    </div>
  )
}

export default OrganizerRegisterTemplate

import type { FC } from "react"
import OrganizerGuestLoginButton from "../components/guest-login-button"
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

        <div className='mb-10 flex flex-col items-center gap-2'>
          <OrganizerGuestLoginButton label='Just looking? Open the demo workspace' />
          <p className='text-xs text-gray-500'>
            Sample events, attendees, and issued certificates — no signup.
          </p>
        </div>
      </div>
      <OrganizerRegisterForm />
    </div>
  )
}

export default OrganizerRegisterTemplate

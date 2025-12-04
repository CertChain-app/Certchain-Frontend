import Logo from "@/modules/core/components/logo"
import OrganizationLoginForm from "../organization-login-form/form"

export default function OrganizationLoginTemplate() {
  return (
    <div className='min-h-screen flex mt-10 justify-center px-4 py-5'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center'>
          <div className='flex justify-center mb-3'>
            <Logo className='w-52' />
          </div>
          <h1 className='text-3xl font-bold mb-2'>
            Sign in to your organization
          </h1>
          <p className='text-gray-600 mb-8'>
            Enter your organization&apos;s CertChain URL
          </p>
        </div>
        <OrganizationLoginForm />
        <div className='text-center space-y-4 mt-6 text-sm'>
          <p className='text-gray-600'>
            Looking to create a organization instead?{" "}
            <a href='/register' className='text-blue-600 hover:text-blue-700'>
              Create a new organization
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

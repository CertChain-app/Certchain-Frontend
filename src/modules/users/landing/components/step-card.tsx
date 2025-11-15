interface StepCardProps {
  number: string
  title: string
  description: string
  icon: React.ReactNode
}

export function StepCard({ number, title, description, icon }: StepCardProps) {
  return (
    <div className='bg-white p-6 rounded-lg shadow-lg text-center relative z-10'>
      <div className='mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 text-white text-xl font-bold'>
        {number}
      </div>
      <div className='mb-4 flex justify-center'>{icon}</div>
      <h3 className='mb-2 text-xl font-semibold'>{title}</h3>
      <p className='text-gray-600'>{description}</p>
    </div>
  )
}

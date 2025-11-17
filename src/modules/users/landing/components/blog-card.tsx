import { Button, Card } from "@mantine/core"
import Image from "next/image"

interface BlogCardProps {
  title: string
  excerpt: string
  author: string
  date: string
  image: string
}

export function BlogCard({
  title,
  excerpt,
  author,
  date,
  image,
}: BlogCardProps) {
  return (
    <Card withBorder className='bg-white overflow-hidden'>
      <Image
        src={image}
        alt={title}
        width={400}
        height={200}
        className='w-full h-48 object-cover'
      />
      <div className='p-6'>
        <h3 className='text-xl font-semibold mb-2'>{title}</h3>
        <p className='text-gray-600 mb-4'>{excerpt}</p>
        <div className='flex justify-between items-center text-sm text-gray-500'>
          <span>{author}</span>
          <span>{date}</span>
        </div>
        <Button className='mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90'>
          Read More
        </Button>
      </div>
    </Card>
  )
}

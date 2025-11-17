import { Button } from "@mantine/core"
import type { FC } from "react"
import { BlogCard } from "../components/blog-card"
import { blogPosts } from "../data"

export const BlogSection: FC = () => {
  return (
    <section id='blog' className='bg-white py-20'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-12 text-center text-3xl font-bold'>
          Latest from Our Blog
        </h2>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {blogPosts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>
        <div className='text-center mt-12'>
          <Button className='bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90'>
            Read More Articles
          </Button>
        </div>
      </div>
    </section>
  )
}

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState, useEffect } from 'react'

const BlogEdit = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [image, setImage] = useState('')
  const [authorId, setAuthorId] = useState('')

  useEffect(() => {
    const blogData = {
      title: 'Sample Blog Title',
      content: 'This is the sample content for the blog...',
      tags: ['React', 'JavaScript'],
      image: 'https://example.com/sample-image.jpg',
      authorId: '12345'
    }

    setTitle(blogData.title)
    setContent(blogData.content)
    setTags(blogData.tags.join(', '))
    setImage(blogData.image)
    setAuthorId(blogData.authorId)
  }, [])

  return (
    <div className='container mx-auto p-6'>
      <Card className='shadow-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Edit Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <form className='space-y-4'>
            <div>
              <label className='block font-medium'>Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Enter blog title'
                className='w-full'
              />
            </div>
            <div>
              <label className='block font-medium'>Content</label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='Enter blog content'
                className='w-full'
              />
            </div>
            <div>
              <label className='block font-medium'>Tags (comma separated)</label>
              <Input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder='e.g. React, JavaScript, WebDev'
                className='w-full'
              />
            </div>
            <div>
              <label className='block font-medium'>Image URL</label>
              <Input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder='Enter image URL'
                className='w-full'
              />
            </div>
            <div>
              <label className='block font-medium'>Author ID</label>
              <Input
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                placeholder='Enter author ID'
                className='w-full'
              />
            </div>
            <Button className='bg-blue-500 text-white w-full mt-4'>Update Blog</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default BlogEdit

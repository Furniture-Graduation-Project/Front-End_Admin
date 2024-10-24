import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'

const BlogAdd = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [image, setImage] = useState('')
  const [authorId, setAuthorId] = useState('')

  return (
    <div className='container mx-auto p-6'>
      <Card className='shadow-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Add New Blog</CardTitle>
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
            <Button className='bg-green-500 text-white w-full mt-4'>Add Blog</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default BlogAdd

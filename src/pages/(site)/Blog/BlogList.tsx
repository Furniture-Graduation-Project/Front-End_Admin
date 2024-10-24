import { Button } from '@/components/ui/button'
import { Edit, Trash } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Blog Post 1',
      content: 'This is a sample content for Blog Post 1...',
      author: 'John Doe',
      date: '2024-10-01'
    },
    {
      id: 2,
      title: 'Blog Post 2',
      content: 'This is a sample content for Blog Post 2...',
      author: 'Jane Smith',
      date: '2024-10-03'
    },
    {
      id: 3,
      title: 'Blog Post 3',
      content: 'This is a sample content for Blog Post 3...',
      author: 'Alice Johnson',
      date: '2024-10-05'
    }
  ])

  const handleDelete = (id: number) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id)
    setBlogs(updatedBlogs)
  }

  return (
    <div className='container mx-auto p-6'>
      <div className='flex justify-between items-center mb-6'>
        <Link to='/blog/add'>
          <Button variant='default' className='bg-green-500 text-white'>
            Add Blog
          </Button>
        </Link>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200'>
          <thead>
            <tr>
              <th className='px-4 py-2 text-left'>Title</th>
              <th className='px-4 py-2 text-left'>Author</th>
              <th className='px-4 py-2 text-left'>Date</th>
              <th className='px-4 py-2 text-left'>Content</th>
              <th className='px-4 py-2 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className='border-t'>
                <td className='px-4 py-2'>{blog.title}</td>
                <td className='px-4 py-2'>{blog.author}</td>
                <td className='px-4 py-2'>{new Date(blog.date).toLocaleDateString()}</td>
                <td className='px-4 py-2'>{blog.content.slice(0, 50)}...</td>
                <td className='px-4 py-2'>
                  <div className='flex items-center space-x-2'>
                    <Link to={`/blog/edit`}>
                      <Button variant='outline' className='text-blue-500'>
                        <Edit size={18} />
                      </Button>
                    </Link>

                    <Button variant='outline' className='text-red-500' onClick={() => handleDelete(blog.id)}>
                      <Trash size={18} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BlogList

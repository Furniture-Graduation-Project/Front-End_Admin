import { Outlet } from 'react-router-dom'
import BlogList from './BlogList'

const Blog = () => {
  return (
    <div className=' bg-[#F5F6FA] relative h-full px-3 sm:px-5 pt-5 pb-16 sm:py-5 space-y-2 sm:space-y-4 '>
      <p className='text-3xl font-bold'>Blog</p>
      <Outlet></Outlet>
    </div>
  )
}

export default Blog

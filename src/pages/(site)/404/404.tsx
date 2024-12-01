import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='flex items-center justify-center bg-white dark:bg-gray-900 sm:rounded-xl h-full sm:h-auto px-28 py-24'>
      <div className='text-center'>
        <img src='/404.png' alt='404 Not Found' className='mb-16 hover:scale-105 transition transform duration-200' />
        <div className='opacity-90'>
          <p className='sm:text-[32px] text-xl font-bold text-gray-900 dark:text-gray-100'>
            Looks like you’ve got lost…
          </p>
          <Link to='/' className='flex flex-col'>
            <Button
              variant={'outline'}
              className='mt-9 px-4 py-2 sm:py-7 bg-blue-500 text-white dark:bg-blue-600 dark:hover:bg-blue-700 rounded sm:text-xl font-bold'
            >
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage

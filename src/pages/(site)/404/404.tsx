import { Link } from 'react-router-dom'

const page404 = () => {
  return (
    <>
      <div className='flex items-center justify-center bg-white rounded-xl p-12'>
        <div className='text-center'>
          <img src='/404.png' alt='404 Not Found' className='mb-16' />
          <div>
            <p className='text-[32px]'>Looks like you’ve got lost…</p>
            <Link to='/dashboard' className='flex flex-col'>
              <button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'>Back to Dashboard</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default page404

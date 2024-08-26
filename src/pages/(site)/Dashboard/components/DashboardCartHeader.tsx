import { User } from 'lucide-react'

const DashboardCartHeader = () => {
  return (
    <>
      <div className='bg-white rounded-lg p-4 flex flex-col justify-between h-[161px]'>
        <div className='flex items-center'>
          <div className='flex-grow'>
            <p className='text-[16px]'>Total User</p>
            <p className='text-[28px] font-bold mt-4'>40,698</p>
          </div>
          <div className='bg-[#8280FF] w-[60px] h-[60px] rounded-xl flex items-center justify-center'>
            <User className='w-[30px] h-[30px]' />
          </div>
        </div>
        <p className='text-center text-gray-500 text-sm mt-2'>8.5% Up from yesterday</p>
      </div>
    </>
  )
}

export default DashboardCartHeader

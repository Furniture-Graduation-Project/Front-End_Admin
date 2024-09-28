import { Outlet } from 'react-router-dom'
import MessLeft from './components/MessageMenu/MessageMenu'
import { IDateKey } from '@/interface/message'
import { useState } from 'react'

const Conversation = () => {
  const [isDataKey, setIsDataKey] = useState<IDateKey>({} as IDateKey)
  return (
    <div className=' bg-[#F5F6FA] relative'>
      <p className='p-2 sm:p-4 text-[32px] font-bold'>Liên hệ khách hàng</p>
      <div className='grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-5 px-2 sm:px-4'>
        <MessLeft />
        <div className='h-full max-'>
          <Outlet context={[isDataKey, setIsDataKey]}></Outlet>
        </div>
      </div>
    </div>
  )
}

export default Conversation

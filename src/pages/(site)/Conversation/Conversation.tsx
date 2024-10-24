import { Outlet } from 'react-router-dom'
import MessLeft from './components/MessageMenu/MessageMenu'

const Conversation = () => {
  return (
    <div className=' bg-[#F5F6FA] relative h-full px-3 sm:px-5 pt-5 pb-16 sm:py-5 space-y-2 sm:space-y-4 '>
      <p className='text-3xl font-bold'>Liên hệ khách hàng</p>
      <div className='flex flex-col h-full max-h-full sm:h-0 sm:grid grid-cols-[auto_1fr] gap-5'>
        <MessLeft />
        <div className='flex-grow'>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  )
}

export default Conversation

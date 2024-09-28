import { Outlet } from 'react-router-dom'
import MessLeft from './components/MessageMenu/MessageMenu'

const Conversation = () => {
  return (
    <div className=' bg-[#F5F6FA] relative'>
      <p className='p-2 sm:p-4 text-[32px] font-bold'>Liên hệ khách hàng</p>
      <div className='grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-5 px-2 sm:px-4'>
        <MessLeft />
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default Conversation

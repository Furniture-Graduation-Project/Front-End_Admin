import { Outlet } from 'react-router-dom'
import MessLeft from './components/MessageMenu/MessageMenu'

const Conversation = () => {
  return (
    <>
      <p className='text-3xl font-bold'>Liên hệ khách hàng</p>
      <div className='flex flex-col h-full max-h-full md:h-0 md:grid grid-cols-[auto_1fr] gap-5'>
        <MessLeft />
        <div className='flex-grow'>
          <Outlet></Outlet>
        </div>
      </div>
    </>
  )
}

export default Conversation

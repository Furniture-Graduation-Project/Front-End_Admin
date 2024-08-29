import { Outlet } from 'react-router-dom'
import MessLeft from './components/MessageMenu/MessageMenu'

const Conversation = () => {
  return (
    <>
      <div className='min-h-screen bg-[#F5F6FA] relative'>
        <p className='p-5 sm:p-10 text-[32px] font-bold'>Inbox</p>
        <div className='grid grid-cols-1 sm:grid-cols-[3fr_7fr] gap-5 px-5 sm:px-10'>
          <MessLeft />
          <Outlet></Outlet>
        </div>
      </div>
    </>
  )
}

export default Conversation

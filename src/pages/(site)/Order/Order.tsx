import { Outlet } from 'react-router-dom'
import HorizontalBar from './components/HorizontalBar'
import Table from './components/Table'

const Order = () => {
  return (
    <>
      <div className='min-h-screen bg-[#F5F6FA] relative'>
        <p className='p-5 sm:p-10 text-[32px] font-bold'>Order</p>
        <div className='grid grid-cols-1 sm:grid-cols-[3fr_7fr] gap-[10px] px-5 sm:px-10'>
          <div className='sticky top-0'>
            <HorizontalBar />
          </div>
        </div>

        <div className='px-5 pt-10 sm:px-10'>
          <Table />
        </div>
      </div>
    </>
  )
}

export default Order

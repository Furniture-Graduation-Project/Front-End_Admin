import { Outlet } from 'react-router-dom'

const OrderPage = () => {
  return (
    <div className='bg-[#F5F6FA] p-[30px]'>
      <Outlet />
    </div>
  )
}

export default OrderPage

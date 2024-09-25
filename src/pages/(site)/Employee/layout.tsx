import { Outlet } from 'react-router-dom'

const EmployeeLayout = () => {
  return (
    <div className='bg-[#F5F6FA] p-[30px] h-screen'>
      <Outlet />
    </div>
  )
}

export default EmployeeLayout

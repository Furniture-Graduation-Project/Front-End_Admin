import { Outlet } from 'react-router-dom'

const EmployeePage = () => {
  return (
    <div className='bg-[#F5F6FA] p-[30px]'>
      <Outlet />
    </div>
  )
}

export default EmployeePage

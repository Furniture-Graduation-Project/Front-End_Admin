import { DataTable } from '@/components/ui/data-table'
import useEmployeeQuery from '@/hooks/querys/useEmployeeQuery'
import { IEmployee } from '@/interface/employee'
import { columns } from './_components/columns'
import { format } from 'date-fns'

const EmployeePage = () => {
  const { data } = useEmployeeQuery()
  const employees = data?.data || []
  console.log(employees)

  const formattedUsers: IEmployee[] = employees.map((employee: IEmployee) => ({
    _id: employee._id,
    name: employee.fullName,
    address: employee.address,
    email: employee.email,
    phoneNumber: employee.phoneNumber,
    role: employee.role,
    createdAt: employee.createdAt ? format(new Date(employee.createdAt), 'dd/MM/yyyy') : ''
  }))
  return (
    <div>
      <h1 className='text-[32px] font-semibold'>Employee Lists</h1>
      <DataTable columns={columns} data={formattedUsers} searchKey='name' />
    </div>
  )
}

export default EmployeePage

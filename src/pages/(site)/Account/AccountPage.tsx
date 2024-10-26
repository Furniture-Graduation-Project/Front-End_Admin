import useAccountQuery from '@/hooks/querys/useAccountQuery'
import { columns, UserColumn } from './components/columns'
import { format } from 'date-fns'
import { DataTable } from '@/components/ui/data-table'

const AccountPage = () => {
  const { data } = useAccountQuery()
  const users = data?.data?.users || []

  const formattedUsers: UserColumn[] = users.map((user: UserColumn) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: format(new Date(user.createdAt), 'dd/MM/yyyy')
  }))

  return (
    <div>
      <h1 className='text-[32px] font-semibold'>Account Lists</h1>
      <DataTable columns={columns} data={formattedUsers} searchKey='name' />
    </div>
  )
}

export default AccountPage

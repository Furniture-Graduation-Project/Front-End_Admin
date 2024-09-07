import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import { Search, ChevronLeft, ChevronRight, BookUser } from 'lucide-react'
import { Link } from 'react-router-dom'

const AccountList = () => {
  const accounts = [
    {
      id: 1,
      type: 'Admin',
      provider: 'Google',
      expires_at: '2024-12-31'
    },
    {
      id: 2,
      type: 'User',
      provider: 'Facebook',
      expires_at: '2025-06-15'
    },
    {
      id: 3,
      type: 'Guest',
      provider: 'Twitter',
      expires_at: '2023-09-20'
    }
  ]

  return (
    <div className='container mx-auto p-7 bg-[#f5f6fa]'>
      {/* Thanh tìm kiếm */}
      <div className='flex justify-between items-center mb-7'>
        <div className='text-2xl font-semibold'>Account List</div>
        <div className='flex items-center space-x-2 relative'>
          <Search className='text-gray-700 absolute left-5' size={16} />
          <input
            type='text'
            placeholder='Search account name'
            className='border rounded-3xl py-2 px-9 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
      </div>
      {/* Bảng danh sách tài khoản */}
      <Table className='w-full bg-white shadow-md rounded-lg overflow-hidden'>
        <TableHeader className='border-b-2'>
          <TableRow className='text-left'>
            <TableCell className='py-4 pl-6 font-bold'>ID</TableCell>
            <TableCell className='p-4 font-bold'>Type</TableCell>
            <TableCell className='p-4 font-bold'>Provider</TableCell>
            <TableCell className='p-4 font-bold'>Expires At</TableCell>
            <TableCell className='py-4 font-bold text-center'>Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.id} className='border-t hover:bg-gray-50 transition-colors'>
              <TableCell className='p-4 font-medium'>{account.id}</TableCell>
              <TableCell className='p-4 font-medium'>{account.type}</TableCell>
              <TableCell className='p-4'>{account.provider}</TableCell>
              <TableCell className='p-4'>{account.expires_at}</TableCell>
              <TableCell className='p-4 flex items-center justify-center'>
                <Link to={`/account/${account.id}`}>
                  <button className='text-red-600 hover:text-red-800 transition-colors border border-gray-200 px-3 py-1 rounded-lg'>
                    <BookUser size={18} />
                  </button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Phân trang */}
      <div className='flex justify-between items-center mt-7'>
        <p className='text-[14px] font-light'>Showing 1-03 of 78</p>
        <div>
          <Button variant='outline'>
            <ChevronLeft size={18} className='mx-2' />
          </Button>
          <Button variant='outline'>
            <ChevronRight size={18} className='mx-2' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AccountList

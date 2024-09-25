import { Edit, Search, Trash, Plus } from 'lucide-react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const VoucherList = () => {
  const vouchers = [
    {
      _id: '64f58e5c4e1e9b0012cabc12',
      code: 'SAVE10',
      description: 'Giảm 10% cho tất cả các sản phẩm',
      type: 'Percent',
      value: 10,
      startDate: '2024-09-01T00:00:00Z',
      endDate: '2024-09-30T23:59:59Z',
      usageLimit: 100,
      usedCount: 25,
      status: 'active'
    },
    {
      _id: '64f58f5c4e1e9b0012cacd12',
      code: 'FIXED50',
      description: 'Giảm giá 50.000 VND cho đơn hàng từ 500.000 VND',
      type: 'Fixed',
      value: 50000,
      startDate: '2024-09-05T00:00:00Z',
      endDate: '2024-09-25T23:59:59Z',
      usageLimit: 50,
      usedCount: 10,
      status: 'inactive'
    }
  ]

  return (
    <div className='container mx-auto p-7 bg-[#f5f6fa]'>
      {/* Thanh tìm kiếm */}
      <div className='flex justify-between items-center mb-7'>
        <div className='text-2xl font-semibold'>Voucher List</div>
      </div>
      <div className='w-full flex justify-between pb-7'>
        <a href='/voucher/add'>
          <Button variant='primary' className='flex items-center space-x-2'>
            <Plus size={18} />
            <span>Add Voucher</span>
          </Button>
        </a>
        <div className='flex items-center space-x-2'>
          <div className='flex items-center space-x-2 relative'>
            <Search className='text-gray-700 absolute left-5' size={16} />
            <input
              type='text'
              placeholder='Search voucher name'
              className='border rounded-3xl py-2 px-9 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>
      </div>
      {/* Bảng danh sách voucher */}
      <Table className='w-full bg-white shadow-md rounded-lg overflow-hidden'>
        <TableHeader className='border-b-2'>
          <TableRow className='text-left'>
            <TableCell className='p-4 font-bold'>Voucher Code</TableCell>
            <TableCell className='p-4 font-bold'>Description</TableCell>
            <TableCell className='p-4 font-bold'>Type</TableCell>
            <TableCell className='p-4 font-bold'>Value</TableCell>
            <TableCell className='p-4 font-bold'>Start Date</TableCell>
            <TableCell className='p-4 font-bold'>End Date</TableCell>
            <TableCell className='p-4 font-bold'>Usage Limit</TableCell>
            <TableCell className='p-4 font-bold'>Used Count</TableCell>
            <TableCell className='p-4 font-bold'>Status</TableCell>
            <TableCell className='p-4 font-bold'>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vouchers.map((voucher) => (
            <TableRow key={voucher._id} className='border-t hover:bg-gray-50 transition-colors'>
              <TableCell className='p-4 font-medium'>{voucher.code}</TableCell>
              <TableCell className='p-4'>{voucher.description}</TableCell>
              <TableCell className='p-4'>{voucher.type}</TableCell>
              <TableCell className='p-4'>{voucher.value}</TableCell>
              <TableCell className='p-4'>{new Date(voucher.startDate).toLocaleDateString()}</TableCell>
              <TableCell className='p-4'>{new Date(voucher.endDate).toLocaleDateString()}</TableCell>
              <TableCell className='p-4'>{voucher.usageLimit}</TableCell>
              <TableCell className='p-4'>{voucher.usedCount}</TableCell>
              <TableCell className='p-4'>
                <span
                  className={`px-2 py-1 rounded-full text-white ${voucher.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}
                >
                  {voucher.status}
                </span>
              </TableCell>
              <TableCell className='p-4'>
                <button className=' text-gray-600 hover:text-gray-800 transition-colors border border-gray-200 px-3 py-1 rounded-s-lg'>
                  <Edit size={18} />
                </button>
                <button className='text-red-600 hover:text-red-800 transition-colors border border-gray-200 px-3 py-1 rounded-e-lg'>
                  <Trash size={18} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Phân trang */}
      <div className='flex justify-between items-center mt-7'>
        <p className='text-[14px] font-light'>Showing 1-2 of 2</p>
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

export default VoucherList

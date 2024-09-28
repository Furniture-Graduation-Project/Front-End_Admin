import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

const Table = () => {
  const data = [
    { id: 1, name: 'Nguyễn Văn A', address: 'Hà Nội', date: '2024-09-21', type: 'Loại A', status: 'Hoàn thành' },
    { id: 2, name: 'Trần Thị B', address: 'TP. HCM', date: '2024-09-20', type: 'Loại B', status: 'Đang xử lý' },
    { id: 3, name: 'Lê Văn C', address: 'Đà Nẵng', date: '2024-09-19', type: 'Loại C', status: 'Hoàn thành' },
    { id: 4, name: 'Phạm Thị D', address: 'Hải Phòng', date: '2024-09-18', type: 'Loại D', status: 'Chờ duyệt' },
    { id: 5, name: 'Hoàng Văn E', address: 'Huế', date: '2024-09-17', type: 'Loại E', status: 'Hủy bỏ' }
  ]

  return (
    <div className='overflow-x-auto rounded-lg'>
      <table className='min-w-full table-auto border-collapse border border-gray-300 rounded-lg'>
        <thead>
          <tr className='bg-white text-black'>
            <th className='px-4 py-4 border-b border-gray-300 text-left'>ID</th>
            <th className='px-4 py-4 border-b border-gray-300 text-left'>Tên</th>
            <th className='px-4 py-4 border-b border-gray-300 text-left'>Địa chỉ</th>
            <th className='px-4 py-4 border-b border-gray-300 text-left'>Ngày</th>
            <th className='px-4 py-4 border-b border-gray-300 text-left'>Kiểu</th>
            <th className='px-4 py-4 border-b border-gray-300 text-left'>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className='bg-white '>
              <td className='px-4 py-4 border-b border-gray-300'>{item.id}</td>
              <td className='px-4 py-4 border-b border-gray-300'>{item.name}</td>
              <td className='px-4 py-4 border-b border-gray-300'>{item.address}</td>
              <td className='px-4 py-4 border-b border-gray-300'>{item.date}</td>
              <td className='px-4 py-4 border-b border-gray-300'>{item.type}</td>
              <td className='px-4 py-4 border-b border-gray-300'>
                <div className='bg-[#00B69B] rounded-[4.5px] opacity-35 w-[93px] text-center'>{item.status}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex justify-between mt-4'>
        <button className=' flex border opacity-80 text-[#202224] px-4 py-2 rounded-lg'>
          <ChevronLeft />
          Prev. Date
        </button>
        <button className='flex border opacity-80 text-[#202224] px-4 py-2 rounded-lg'>
          Next Date <ChevronRight />
        </button>
      </div>
    </div>
  )
}

export default Table

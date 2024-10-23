import React, { useState } from 'react'
import { ChevronDownIcon, FilterIcon, RotateCcw } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Calendar } from '@/components/ui/calendar'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DateRange } from 'react-day-picker'

type OrderType = string
type StatusType = string

const HorizontalBar = () => {
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(undefined)
  const [orderType, setOrderType] = useState<OrderType[]>([])
  const [status, setStatus] = useState<StatusType[]>([])

  const handleDateSelect = (range: DateRange | undefined) => {
    setSelectedDate(range)
  }

  return (
    <div className='flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md gap-y-4 md:gap-y-0 md:gap-x-4'>
      <div className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition'>
        <FilterIcon className='w-5 h-5 text-gray-600' />
      </div>

      <div className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition'>
        <span className='text-sm font-medium'>Lọc theo</span>
      </div>

      <div className='relative'>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='ghost' className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition'>
              <span>
                {selectedDate
                  ? `${selectedDate.from?.toLocaleDateString()} - ${selectedDate.to?.toLocaleDateString()}`
                  : 'Ngày'}
              </span>
              <ChevronDownIcon className='w-4 h-4' />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar mode='range' selected={selectedDate} onSelect={handleDateSelect} />
            <Button onClick={() => console.log('Selected date range:', selectedDate)}>Nộp đơn ngày</Button>
          </PopoverContent>
        </Popover>
      </div>

      <div className='relative'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition'>
              <span>Loại đơn hàng</span>
              <ChevronDownIcon className='w-4 h-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <p className='p-[5px]'>Lựa chọn loại đơn hàng</p>
            <DropdownMenuItem>
              <div className='grid p-[5px] grid-cols-2 gap-2'>
                {[
                  'Sức khỏe & Y học',
                  'Sách & Văn phòng',
                  'Dịch vụ & công nghiệp',
                  'Thời tràng & làm việc ',
                  'Nhà cửa & cuộc sống',
                  'Điện tử',
                  'Di động & Điện thoại',
                  'Phụ kiện'
                ].map((type, index) => (
                  <div key={index} className='flex items-center'>
                    <div
                      className={`w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center mr-2 ${
                        orderType.includes(type) ? 'bg-blue-600 text-white' : 'bg-white'
                      }`}
                      onClick={() => {
                        setOrderType((prev) =>
                          prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
                        )
                      }}
                    >
                      {orderType.includes(type) && '✓'}
                    </div>
                    <span className='text-sm'>{type}</span>
                  </div>
                ))}
              </div>
            </DropdownMenuItem>
            <Button onClick={() => console.log('Selected order types:', orderType)}>Nộp đơn loại đơn hàng</Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='relative'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition'>
              <span>Trạng thái</span>
              <ChevronDownIcon className='w-4 h-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <p className='p-[5px]'>Lựa chọn trạng thái</p>
            <DropdownMenuItem>
              <div className='grid grid-cols-2 gap-2'>
                {['Trạng thái 1', 'Trạng thái 2', 'Trạng thái 3', 'Trạng thái 4', 'Trạng thái 5'].map(
                  (statusType, index) => (
                    <div key={index} className='flex items-center'>
                      <div
                        className={`w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center mr-2 ${
                          status.includes(statusType) ? 'bg-blue-600 text-white' : 'bg-white'
                        }`}
                        onClick={() => {
                          setStatus((prev) =>
                            prev.includes(statusType)
                              ? prev.filter((item) => item !== statusType)
                              : [...prev, statusType]
                          )
                        }}
                      >
                        {status.includes(statusType) && '✓'}
                      </div>
                      <span className='text-sm'>{statusType}</span>
                    </div>
                  )
                )}
              </div>
            </DropdownMenuItem>
            <Button onClick={() => console.log('Selected statuses:', status)}>Nộp đơn trạng thái</Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='flex text-[#EA0234] items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition'>
        <Button
          variant='ghost'
          onClick={() => {
            setSelectedDate(undefined)
            setOrderType([])
            setStatus([])
          }}
        >
          <RotateCcw className='w-4 h-4 pr-[2px]' />
          Đặt lại bộ lọc
        </Button>
      </div>
    </div>
  )
}

export default HorizontalBar

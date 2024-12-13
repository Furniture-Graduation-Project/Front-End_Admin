import { Button } from '@/components/ui/button'
import { CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useDebouncedCallback } from '@/hooks/useDebounceCallBack'
import { IOrder } from '@/interface/order'
import { Table } from '@tanstack/react-table'
import { Settings2 } from 'lucide-react'

const OrderListHeader = ({
  table,
  queryParams,
  setPagination,
  setQueryParams
}: {
  table: Table<IOrder>
  queryParams: any
  isLoading: boolean
  setQueryParams: (params: any) => void
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void
}) => {
  const pageSizeOptions: number[] = [10, 20, 30, 40, 50]

  const debouncedSearch = useDebouncedCallback((key: string, value: string) => {
    setQueryParams((prev: any) => ({
      ...prev,
      [key]: value
    }))
  }, 700)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const name = event.target.name
    if (name === 'code' && ((value.length >= 16 && value.length <= 20) || value.length === 0)) {
      debouncedSearch(name, value)
    }
  }

  const handleSelectChange = (key: string) => (value: string) => {
    if (key == 'filter') {
      setQueryParams({ filter: value })
      return
    }
    debouncedSearch(key, value)
  }

  return (
    <CardHeader>
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 w-full'>
        <Input
          onChange={handleChange}
          name='code'
          placeholder='Tìm kiếm theo mã đơn 16 - 20 ký tự...'
          minLength={16}
          maxLength={20}
          className='order-last sm:order-first col-span-2 sm:col-span-1 '
        />
        <Select onValueChange={handleSelectChange('filter')}>
          <SelectTrigger className='w-full max-w-[200px]'>
            <SelectValue placeholder='Hiển thị đơn hàng' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả các đơn</SelectItem>
            <SelectItem value='return'>Đơn hoàn trả</SelectItem>
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              <Settings2 />
              <span className='sr-only'> Hiển thị</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Chuyển đổi các cột</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
            <DropdownMenuLabel>Bản ghi mỗi trang</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {pageSizeOptions.map((pageSize) => (
              <DropdownMenuCheckboxItem
                key={pageSize}
                checked={table.getState().pagination.pageSize === pageSize}
                onCheckedChange={() =>
                  setPagination({
                    pageIndex: 0,
                    pageSize: pageSize
                  })
                }
              >
                {pageSize}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <div
          className={` grid-cols-2 gap-2 ${!queryParams?.filter || queryParams?.filter != 'return' ? 'grid' : 'hidden'}`}
        >
          <Select onValueChange={handleSelectChange('status')}>
            <SelectTrigger className='w-full max-w-[200px]'>
              <SelectValue placeholder='Trạng thái đơn' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='pending'>Chờ thanh toán</SelectItem>
              <SelectItem value='unpaid'>Chờ xử lý</SelectItem>
              <SelectItem value='confirmed'>Đã xác nhận</SelectItem>
              <SelectItem value='processing'>Đang lấy hàng</SelectItem>
              <SelectItem value='shipped'>Đã gửi hàng</SelectItem>
              <SelectItem value='delivered'>Đã giao hàng</SelectItem>
              <SelectItem value='received'>Khách hàng đã nhận</SelectItem>
              <SelectItem value='cancelled'>Đã hủy</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={handleSelectChange('payment')}>
            <SelectTrigger className='w-full max-w-[200px]'>
              <SelectValue placeholder='Trạng thái thanh toán' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='paid'>Đã thanh toán</SelectItem>
              <SelectItem value='unpaid'>Chưa thanh toán</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div
          className={` grid-cols-2 gap-2 ${queryParams?.filter && queryParams.filter == 'return' ? 'grid' : 'hidden'}`}
        >
          <Select onValueChange={handleSelectChange('return')}>
            <SelectTrigger className='w-[220px] max-w-[200px]'>
              <SelectValue placeholder='Trạng thái hoàn trả' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Tất cả đơn hàng</SelectItem>
              <SelectItem value='pending'>Chưa xử lý</SelectItem>
              <SelectItem value='processing'>Đang xử lý</SelectItem>
              <SelectItem value='resolved'>Đã xử lý</SelectItem>
              <SelectItem value='returned'>Đã trả hàng</SelectItem>
              <SelectItem value='refunded'>Đã hoàn tiền</SelectItem>
              <SelectItem value='finished'>Đã hoàn thành</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </CardHeader>
  )
}

export default OrderListHeader

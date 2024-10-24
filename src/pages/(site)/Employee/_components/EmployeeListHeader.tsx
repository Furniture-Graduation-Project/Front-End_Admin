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
import { IEmployee } from '@/interface/employee'
import { Table } from '@tanstack/react-table'
import { Plus, Trash2, Settings2 } from 'lucide-react'

const EmployeeListHeader = ({
  table,
  setPagination
}: {
  table: Table<IEmployee>
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void
}) => {
  const pageSizeOptions: number[] = [10, 20, 30, 40, 50]

  return (
    <CardHeader className='grid grid-cols-2 sm:grid-cols-3'>
      <div className='flex items-center space-x-2'>
        <Button variant='outline'>
          <Plus />
          <span>Thêm Nhân Viên</span>
        </Button>
        <Button variant='outline'>
          <Trash2 />
          <span>Xóa</span>
        </Button>
      </div>

      <Input
        placeholder='Tìm kiếm theo tên...'
        value={(table.getColumn('fullName')?.getFilterValue() as string) ?? ''} // Thay 'name' bằng cột tìm kiếm thực tế
        onChange={(event) => {
          const value = event.target.value
          console.log('Giá trị tìm kiếm mới:', value)
          table.getColumn('fullName')?.setFilterValue(value) // Cập nhật cột tìm kiếm
        }}
        className='order-last sm:order-first col-span-2 sm:col-span-1'
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='ml-auto'>
            <Settings2 />
            <span className='sr-only'>Hiển thị</span>
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
    </CardHeader>
  )
}

export default EmployeeListHeader

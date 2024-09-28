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
import { ToggleGroup } from '@/components/ui/toggle-group'
import { IConversation } from '@/interface/message'
import { ITable } from '@/interface/table'
import { CircleAlert, FileDown, Settings2, Trash2 } from 'lucide-react'

const MessageListHeader = ({ table }: ITable<IConversation>) => {
  const pageSizeOptions: number[] = [10, 20, 30, 40, 50]
  return (
    <CardHeader className='grid grid-cols-2 sm:grid-cols-3'>
      <ToggleGroup className='w-fit mt-[6px] order-first' variant='outline' type='multiple'>
        <Button variant='outline'>
          <FileDown />
        </Button>
        <Button variant='outline'>
          <CircleAlert />
        </Button>
        <Button variant='outline'>
          <Trash2 />
        </Button>
      </ToggleGroup>
      <Input
        placeholder='Tìm kiếm...'
        value={(table.getColumn('userId')?.getFilterValue() as string) ?? ''}
        onChange={(event) => {
          console.log('Giá trị mới:', event.target.value) // Log giá trị mới
          table.getColumn('userId')?.setFilterValue(event.target.value)
        }}
        className='order-last sm:order-first'
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='ml-auto'>
            <Settings2 />
            Hiển thị
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
              onCheckedChange={() => table.setPageSize(pageSize)}
            >
              {pageSize}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </CardHeader>
  )
}

export default MessageListHeader

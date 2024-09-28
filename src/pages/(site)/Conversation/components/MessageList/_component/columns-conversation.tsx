import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { IConversation, IMessage, ITableMetaConversation } from '@/interface/message'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { ArrowUpDown, Eye, MoreHorizontal, Pencil, Star, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
export const columnsConversation: ColumnDef<IConversation>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'star',
    header: 'Đánh dấu',
    cell: ({ row }) => {
      const rowData = row.original as IConversation
      const handleStarToggle = (id: string): void => {}
      return (
        <Star
          onClick={() => handleStarToggle(rowData._id)}
          className={`capitalize w-[20px] h-[20px] ${row.getValue('star') ? 'text-yellow-500' : 'text-gray-400'}`}
          fill={row.getValue('star') ? '#FFD700' : 'none'}
          stroke={row.getValue('star') ? '#FFD700' : 'gray'}
        />
      )
    }
  },
  {
    accessorKey: 'userId',
    header: () => <div>Tên khách hàng</div>,

    cell: ({ row }) => {
      const messages = row.getValue('messages') as IMessage[]
      const conversationId = row.original._id
      const userId = row.getValue('userId') as { name: string }
      if (messages && messages.length > 0 && conversationId) {
        return (
          <Link to={`/conversation/texting/${conversationId}`}>
            {messages[0].status === 'read' ? (
              <div className='lowercase'>{userId.name}</div>
            ) : (
              <div className='lowercase font-bold'>{userId.name}</div>
            )}
          </Link>
        )
      }

      return <div>##Trống</div>
    },
    filterFn: (row, _id, filterValue) => {
      const user = row.getValue(_id) as { name: string }
      return user?.name?.toLowerCase().includes(filterValue.toLowerCase())
    }
  },
  {
    accessorKey: 'label',
    header: () => <div>Nhãn</div>,
    cell: ({ row }) => <div className='lowercase'>{row.getValue('label')}</div>
  },
  {
    accessorKey: 'messages',
    header: () => <div>Nội dung</div>,
    cell: ({ row }) => {
      const messages = row.getValue('messages') as Array<IMessage>
      const conversationId = row.original._id
      if (messages.length > 0 && conversationId) {
        return (
          <Link to={`/conversation/texting/${conversationId}`}>
            {messages[0].status === 'read' ? (
              <div className='font-medium line-clamp-1'>{messages[0].content}</div>
            ) : (
              <div className='flex items-center space-x-2'>
                <span className='relative flex h-3 w-3'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
                  <span className='relative inline-flex rounded-full h-3 w-3 bg-sky-500'></span>
                </span>
                <div className='font-bold line-clamp-1'>{messages[0].content}</div>
              </div>
            )}
          </Link>
        )
      }
      return <div className='font-medium'>##Nội dung không có sẵn</div>
    }
  },
  {
    accessorKey: 'timestamp',
    header: ({ column }) => (
      <button className='flex' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Ngày
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </button>
    ),
    cell: ({ row }) => {
      const messages = row.getValue('messages') as Array<IMessage>

      if (messages.length > 0) {
        const date = new Date(messages[0].timestamp)

        const formattedDate = format(date, 'Pp', { locale: vi })

        return <div className='font-medium'>{formattedDate}</div>
      }

      return <div className='font-medium'>##Nội dung không có sẵn</div>
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row, table }) => {
      const meta = table.options.meta as ITableMetaConversation | undefined
      const conversationId = row.original._id
      const userId = row.getValue('userId') as { _id: string; name: string }
      const [isDropdown, setIsDropdown] = useState(false)
      return (
        <>
          <DropdownMenu open={isDropdown} onOpenChange={setIsDropdown}>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
              <DropdownMenuItem>
                <Eye className='mr-2 h-4 w-4' />
                <Link to={`/account/user/${userId._id}`}>Thông tin</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pencil className='mr-2 h-4 w-4' />
                <Link to={`/conversation/texting/${conversationId}`}>Nhắn tin</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsDropdown(false)}
                onSelect={() => meta?.openDeleteModal(conversationId)}
                className='text-red-600'
              >
                <Trash2 className='mr-2 h-4 w-4' />
                Delete Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    }
  }
]

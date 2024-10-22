import { ColumnDef } from '@tanstack/react-table'
import { CellAction } from './cell-action'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { IEmployee } from '@/interface/employee'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

export const columns: ColumnDef<IEmployee>[] = [
  {
    accessorKey: 'STT',
    header: 'STT',
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>
    }
  },
  {
    accessorKey: 'avatar',
    header: 'Avatar',
    cell: ({ row }) => {
      return (
        <img
          src={
            row.original.avatar ||
            'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png'
          }
          alt='avatar'
          className='w-8 h-8 rounded-full'
        />
      )
    }
  },
  {
    accessorKey: 'fullName',
    // header: ({ column }) => {
    //   return (
    //     <Button className='p-0' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
    //       Full Name
    //       <ArrowUpDown className='ml-2 h-4 w-4' />
    //     </Button>
    //   )
    // }
    header: 'Full Name'
  },
  {
    accessorKey: 'username',
    // header: ({ column }) => {
    //   return (
    //     <Button className='p-0' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
    //       User Name
    //       <ArrowUpDown className='ml-2 h-4 w-4' />
    //     </Button>
    //   )
    // }
    header: 'User Name'
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number'
  },
  {
    accessorKey: 'address',
    header: 'Address'
  },
  {
    accessorKey: 'role',
    header: 'Role'
  },
  {
    accessorKey: 'createdAt',
    // header: ({ column }) => {
    //   return (
    //     <Button className='p-0' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
    //       Date
    //       <ArrowUpDown className='ml-2 h-4 w-4' />
    //     </Button>
    //   )
    // },
    header: 'Date',
    cell: ({ row }) => {
      const formattedDate = format(row.getValue('createdAt'), 'Pp', { locale: vi })
      return <div className='font-medium'>{formattedDate}</div>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]

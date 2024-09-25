import { ColumnDef } from '@tanstack/react-table'
import { CellAction } from './cell-action'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { IEmployee } from '@/interface/employee'

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
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button variant='column' className='p-0' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button variant='column' className='p-0' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Email
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
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
    header: ({ column }) => {
      return (
        <Button variant='column' className='p-0' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]

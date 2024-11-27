import { ColumnDef } from '@tanstack/react-table'
import { CellAction } from './cell-action'
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
    header: 'Ảnh đại diện',
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
    header: 'Họ và Tên'
  },
  {
    accessorKey: 'username',
    header: 'Tên người dùng'
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Số điện thoại'
  },
  {
    accessorKey: 'address',
    header: 'Địa chỉ'
  },
  {
    accessorKey: 'role',
    header: 'Vai trò'
  },
  {
    accessorKey: 'createdAt',
    header: 'Ngày tạo',
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

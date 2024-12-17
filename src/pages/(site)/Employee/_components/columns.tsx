import { ColumnDef } from '@tanstack/react-table'
import { CellAction } from './cell-action'
import { IEmployee } from '@/interface/employee'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { formatDate } from '@/utils/formatDate'

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
    header: 'Vai trò',
    cell: ({ row }) => {
      const roleMap: Record<string, string> = {
        admin: 'Quản trị viên',
        product: 'Nhân viên kho',
        order: 'Nhân viên bán hàng',
        support: 'Nhân viên hỗ trợ'
      }

      const role = row.getValue('role') as string

      return <span>{roleMap[role] || 'Không xác định'}</span>
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Ngày tạo',
    cell: ({ row }) => {
      return <div className='font-medium'>{formatDate(row.getValue('createdAt'))}</div>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]

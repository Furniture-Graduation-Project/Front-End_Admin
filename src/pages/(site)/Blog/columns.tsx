import { ColumnDef } from '@tanstack/react-table'
import { CellAction } from './cell-action'
import { IBlog } from '@/interface/blog'
import { formatDate } from '@/utils/formatDate'

export const columns: ColumnDef<IBlog>[] = [
  {
    accessorKey: 'STT',
    header: 'STT',
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>
    }
  },
  {
    accessorKey: 'title',
    header: 'Tiêu đề',
    cell: ({ row }) => {
      return <p>{row.getValue('title')}</p>
    }
  },
  {
    accessorKey: 'employeeId',
    header: 'Tác giả',
    cell: ({ row }) => {
      const employee = row.original.employeeId
      return <p>{employee?.fullName || 'Chưa có tên'}</p>
    }
  },
  {
    accessorKey: 'content',
    header: 'Nội dung',
    cell: ({ row }) => {
      const content = row.getValue('content') as string
      return <p>{content.slice(0, 50)}...</p>
    }
  },
  {
    accessorKey: 'tags',
    header: 'Nhãn',
    cell: ({ row }) => {
      const tags = row.getValue('tags') as string[]
      return <p>{tags.join(', ')}</p>
    }
  },
  {
    accessorKey: 'image',
    header: 'Ảnh',
    cell: ({ row }) => {
      const imageUrl = row.getValue('image') as string
      return imageUrl ? <img src={imageUrl} alt='Blog' className='w-16 h-16 object-cover' /> : <p>Không có ảnh</p>
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Ngày tạo',
    cell: ({ row }) => {
      return <p>{formatDate(row.getValue('createdAt'))}</p>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]

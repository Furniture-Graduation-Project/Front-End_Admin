import { ColumnDef } from '@tanstack/react-table'
import { CellAction } from './cell-action'
import { IBlog } from '@/interface/blog'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

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
    header: 'Title',
    cell: ({ row }) => {
      return <p>{row.getValue('title')}</p>
    }
  },
  {
    accessorKey: 'employeeId',
    header: 'Employee',
    cell: ({ row }) => {
      return <p>{row.getValue('employeeId')}</p>
    }
  },
  {
    accessorKey: 'content',
    header: 'Content',
    cell: ({ row }) => {
      const content = row.getValue('content') as string
      return <p>{content.slice(0, 50)}...</p>
    }
  },
  {
    accessorKey: 'tags',
    header: 'Tag',
    cell: ({ row }) => {
      const tags = row.getValue('tags') as string[]
      return <p>{tags.join(', ')}</p>
    }
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const imageUrl = row.getValue('image') as string
      return imageUrl ? <img src={imageUrl} alt='Blog' className='w-16 h-16 object-cover' /> : <p>No Image</p>
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => {
      const formattedDate = format(new Date(row.getValue('createdAt')), 'Pp', { locale: vi })
      return <p>{formattedDate}</p>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]

import { ColumnDef } from '@tanstack/react-table'
import { CellAction } from './cell-action'
import { IProduct } from '@/interface/product'

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: 'STT',
    header: 'STT',
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>
    }
  },
  {
    accessorKey: 'name',
    header: 'Tên sản phẩm',
    cell: ({ row }) => {
      return <p className='w-32'>{row.original.name}</p>
    }
  },
  {
    header: 'Ảnh',
    accessorKey: 'images',
    cell: ({ row }) => {
      return <img src={row.original.images[0]} alt={row.original.name} className='w-32 h-32 object-cover rounded-lg' />
    }
  },
  {
    header: 'Danh mục',
    accessorKey: 'categoryId',
    accessorFn: (row: IProduct) => row.category?.categoryName || '',
    cell: ({ row }) => {
      return <p>{row.original.category?.categoryName}</p>
    }
  },
  {
    accessorKey: 'description',
    header: 'Mô tả',
    cell: ({ row }) => {
      return <p className='w-80'>{row.getValue<string>('description') || 'N/A'}</p>
    }
  },
  {
    header: 'Chất liệu',
    cell: ({ row }) => <p className='w-16'>{row.original.material?.materialName || 'N/A'}</p>
  },
  {
    accessorKey: 'materialDetail',
    header: 'Chi tiết chất liệu',
    cell: ({ row }) => <p className='w-36'>{row.getValue<string>('materialDetail') || 'N/A'}</p>
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const status = row.getValue<string>('status')
      return <p>{status.charAt(0).toUpperCase() + status.slice(1)}</p>
    }
  },
  {
    id: 'Chức năng',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]

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
    header: 'Tên sản phẩm'
  },
  {
    header: 'Danh mục',
    cell: ({ row }) => {
      return <p>{row.original.category?.categoryName}</p>
    }
  },
  {
    accessorKey: 'description',
    header: 'Mô tả',
    cell: ({ row }) => {
      return <p>{row.getValue<string>('description') || 'N/A'}</p>
    }
  },
  {
    header: 'Chất liệu',
    cell: ({ row }) => <p>{row.original.material?.materialName || 'N/A'}</p>
  },
  {
    accessorKey: 'materialDetail',
    header: 'Chi tiết Chất liệu',
    cell: ({ row }) => <p>{row.getValue<string>('materialDetail') || 'N/A'}</p>
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const status = row.getValue<string>('status').toLowerCase()
      let displayStatus = ''
      switch (status) {
        case 'creating':
          displayStatus = 'Đang tạo'
          break
        case 'available':
          displayStatus = 'Còn hàng'
          break
        case 'disable':
          displayStatus = 'Khóa'
          break
        default:
          displayStatus = 'Không xác định'
      }
      return <p>{displayStatus}</p>
    }
  },
  {
    id: 'Chức năng',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]

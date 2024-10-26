import { ColumnDef } from '@tanstack/react-table'
import { CellAction } from './cell-action'
import { IProduct } from '@/interface/product'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

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
    header: 'Product Name'
  },
  {
    accessorKey: 'category',
    header: 'Category'
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      return <p>{row.getValue<string>('description') || 'N/A'}</p> // Cung cấp kiểu dữ liệu
    }
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      return <p>${row.getValue<number>('price').toFixed(2)}</p> // Cung cấp kiểu dữ liệu
    }
  },
  {
    accessorKey: 'SKU',
    header: 'SKU'
  },
  {
    accessorKey: 'material',
    header: 'Material',
    cell: ({ row }) => {
      return <p>{row.getValue<string>('material') || 'N/A'}</p> // Cung cấp kiểu dữ liệu
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue<string>('status'); // Cung cấp kiểu dữ liệu
      return <p>{status.charAt(0).toUpperCase() + status.slice(1)}</p>; // Định dạng trạng thái
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]

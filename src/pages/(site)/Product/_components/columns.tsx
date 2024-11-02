import { ColumnDef } from '@tanstack/react-table'
import { CellAction } from './cell-action'
import { IProduct } from '@/interface/product'

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: 'STT',
    header: 'STT',
    cell: ({ row }) => <p>{row.index + 1}</p>
  },
  {
    accessorKey: 'name',
    header: 'Product Name'
  },
  {
    header: 'Category',
    cell: ({ row }) => <p>{row.original.category?.categoryName}</p>
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <p>{row.getValue<string>('description') || 'N/A'}</p>
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => <p>${row.getValue<number>('price').toFixed(2)}</p>
  },
  {
    accessorKey: 'SKU',
    header: 'SKU'
  },
  {
    accessorKey: 'material',
    header: 'Material',
    cell: ({ row }) => <p>{row.getValue<string>('material') || 'N/A'}</p>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue<string>('status')
      return <p>{status.charAt(0).toUpperCase() + status.slice(1)}</p>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]

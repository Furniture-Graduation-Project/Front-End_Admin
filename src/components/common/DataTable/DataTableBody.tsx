import { Skeleton } from '@/components/ui/skeleton'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { ColumnDef, flexRender, Table } from '@tanstack/react-table'

const DataTableBody = ({
  table,
  columns,
  isLoading
}: {
  table: Table<any>
  columns: ColumnDef<any>[]
  isLoading?: boolean
}) => {
  const rowCount = 10
  const columnCount = columns.length
  const isLoadings = false

  return (
    <TableBody>
      {isLoadings ? (
        Array.from({ length: rowCount }).map((_, i) => (
          <TableRow key={i} className='hover:bg-transparent'>
            {Array.from({ length: columnCount }).map((_, j) => (
              <TableCell key={j}>
                <Skeleton className='h-6 w-full' />
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className='h-24 text-center'>
            Không có bản ghi nào.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}

export default DataTableBody

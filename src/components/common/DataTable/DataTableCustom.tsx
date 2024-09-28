import { Table } from '@/components/ui/table'
import DataTableHeader from './_component/DataTableCustomHeader'
import DataTableBody from './_component/DataTableCustomBody'
import { ITableCustom } from '@/interface/table'

const DataTableCustom = ({ table, columns, isLoading, isError }: ITableCustom) => {
  return (
    <Table>
      <DataTableHeader table={table} />
      <DataTableBody table={table} columns={columns} isLoading={isLoading} isError={isError} />
    </Table>
  )
}

export default DataTableCustom

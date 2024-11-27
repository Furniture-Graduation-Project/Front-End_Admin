import { useAccountQueryLimited } from '@/hooks/querys/useAccountQuery'
import { columns } from './components/columns'
import DataTableCustom from '@/components/common/DataTable/DataTableCustom'
import { useDataTable } from '@/hooks/useDataTable'
import { PaginationState } from '@tanstack/react-table'
import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import { useState } from 'react'

const AccountPage = () => {
  const [pagination, setPagination] = useState<PaginationState>(DEFAULT_PAGE_SIZE)
  const { data, isLoading, isError, refetch} = useAccountQueryLimited(pagination)

console.log(data);

const {table} = useDataTable({
  columns: columns,
  data: data?.data || [],
  totalData: data?.totalData,
  totalPage: data?.totalPage,
  pagination,
  setPagination
})
  return (
    <div>
      <h1 className='text-[32px] font-semibold'>Account Lists</h1>
      <DataTableCustom table={table} columns={columns} isLoading={isLoading} isError={isError} refetch={refetch}/>
    </div>
  )
}

export default AccountPage

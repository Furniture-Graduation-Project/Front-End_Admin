import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import DataTableCustom from '@/components/common/DataTable/DataTableCustom'
import { useState } from 'react'
import { useMultipleOrderQuery } from '@/hooks/querys/useOrderQuery'
import { useDataTable } from '@/hooks/useDataTable'
import { PaginationState } from '@tanstack/react-table'
import { columns } from './columns'
import OrderListHeader from './OrderListHeader'

const OrderList = () => {
  const [pagination, setPagination] = useState<PaginationState>(DEFAULT_PAGE_SIZE)
  const [queryParams, setQueryParams] = useState()
  const { data, isLoading, isError, refetch } = useMultipleOrderQuery(pagination, queryParams)

  const { table } = useDataTable({
    data: data?.data ?? [],
    columns: columns,
    totalData: data?.totalData,
    totalPage: data?.totalPage,
    pagination,
    setPagination
  })
  return (
    <>
      <h1 className='text-[32px] font-semibold dark:text-gray-100'>Danh sách đơn hàng</h1>
      <div className='w-full mt-5 rounded-xl bg-white dark:bg-gray-800 p-4'>
        <OrderListHeader
          table={table}
          isLoading={isLoading}
          setPagination={setPagination}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
        />
        <DataTableCustom columns={columns} isError={isError} isLoading={isLoading} refetch={refetch} table={table} />
      </div>
    </>
  )
}

export default OrderList

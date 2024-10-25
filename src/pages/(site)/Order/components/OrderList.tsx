import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import DataTableCustom from '@/components/common/DataTable/DataTableCustom'
import React, { useState } from 'react'
import { useMultipleOrderQuery } from '@/hooks/querys/useOrderQuery'
import { useDataTable } from '@/hooks/useDataTable'
import { PaginationState } from '@tanstack/react-table'
import { columns } from './columns'
import AlertAcitonDialog from '@/components/modals/AlertDialog'

const OrderList = () => {
  const [pagination, setPagination] = useState<PaginationState>(DEFAULT_PAGE_SIZE)
  const { data, isLoading, isError, refetch } = useMultipleOrderQuery(pagination)

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
      <h1 className='text-[32px] font-semibold'>Danh sách đơn hàng</h1>
      <div className='w-full mt-5 bg-white rounded-xl'>
        <DataTableCustom columns={columns} isError={isError} isLoading={isLoading} refetch={refetch} table={table} />
      </div>
    </>
  )
}

export default OrderList

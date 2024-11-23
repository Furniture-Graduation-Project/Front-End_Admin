import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import DataTableCustom from '@/components/common/DataTable/DataTableCustom'
import React, { useState } from 'react'
import { columns } from './columns'
import { useMultipleCategoryQuery } from '@/hooks/querys/useCategoryQuery'
import { useDataTable } from '@/hooks/useDataTable'
import { PaginationState } from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import CategoryListHeader from './CategoryListHeader '
import { useAuth } from '@/context/AuthContext'

const CategoryList = () => {
  const { user, isLoading: authLoading } = useAuth()
  const [pagination, setPagination] = useState<PaginationState>(DEFAULT_PAGE_SIZE)
  const { data, isLoading, isError, refetch } = useMultipleCategoryQuery(pagination)

  const { table } = useDataTable({
    data: data?.data ?? [],
    columns: columns,
    totalData: data?.totalData,
    totalPage: data?.totalPage,
    pagination,
    setPagination
  })

  const canAddCategory = user?.role === 'admin' || user?.role === 'product'

  return (
    <>
      <h1 className='text-[32px] font-semibold dark:text-gray-100'>Danh sách danh mục</h1>
      <div className='w-full pt-5'>
        {!authLoading && canAddCategory && (
          <Link to='/category/add'>
            <Button variant='outline' className='space-x-2 bg-[#F5F6FA] dark:bg-gray-800 text-black dark:text-gray-100'>
              <Plus size={18} />
              <span>Add Category</span>
            </Button>
          </Link>
        )}
      </div>
      <div className='w-full mt-5 bg-white dark:bg-gray-800 rounded-xl p-4'>
        <CategoryListHeader table={table} setPagination={setPagination} />
        {isLoading && <div className='text-center'>Đang tải...</div>}
        {isError && <div className='text-red-600'>Lỗi khi tải danh mục. Vui lòng thử lại.</div>}
        <DataTableCustom columns={columns} isError={isError} isLoading={isLoading} refetch={refetch} table={table} />
      </div>
    </>
  )
}

export default CategoryList

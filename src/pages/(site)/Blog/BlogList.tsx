import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import DataTableCustom from '@/components/common/DataTable/DataTableCustom'
import React, { useState } from 'react'
import { columns } from './columns'
import { useMultipleBlogQuery } from '@/hooks/querys/useBlogQuery'
import { useDataTable } from '@/hooks/useDataTable'
import { PaginationState } from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const BlogList = () => {
  const [pagination, setPagination] = useState<PaginationState>(DEFAULT_PAGE_SIZE)
  const [searchTerm, setSearchTerm] = useState('')

  const { data, isLoading, isError, refetch } = useMultipleBlogQuery(pagination, searchTerm)

  const { table } = useDataTable({
    data: data?.data ?? [],
    columns,
    totalData: data?.totalData,
    totalPage: data?.totalPage,
    pagination,
    setPagination
  })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    refetch()
  }

  return (
    <div className='bg-white dark:bg-gray-900 p-5 rounded-lg'>
      <h1 className='text-[32px] font-semibold text-gray-900 dark:text-white'>Danh sách bài viết</h1>
      <div className='w-full pt-5'>
        <Link to='/blog/add'>
          <Button
            variant={'outline'}
            className='space-x-2 bg-[#F5F6FA] text-black dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-white dark:hover:text-black'
          >
            <span>Thêm bài viết</span>
          </Button>
        </Link>
      </div>
      <div className='w-full mt-5 dark:p-5 bg-white dark:bg-gray-800 rounded-xl'>
        <div className='mr-5 pt-5'>
          <Input
            type='text'
            placeholder='Tìm kiếm theo tên tác giả...'
            value={searchTerm}
            onChange={handleSearch}
            className='border p-2 rounded mb-5 w-1/3 ml-auto dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600'
          />
        </div>
        {/* {isLoading && <p className='text-gray-700 dark:text-gray-300'>Đang tải dữ liệu...</p>} */}
        {/* {isError && <p className='text-red-600'>Đã có lỗi xảy ra khi lấy dữ liệu.</p>} */}
        <DataTableCustom columns={columns} isError={isError} isLoading={isLoading} refetch={refetch} table={table} />
      </div>
    </div>
  )
}

export default BlogList

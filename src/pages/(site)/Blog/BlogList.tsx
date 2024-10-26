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
    <div>
      <h1 className='text-[32px] font-semibold'>Danh sách Blog</h1>
      <div className='w-full pt-5'>
        <Link to='/blog/add'>
          <Button variant={'outline'} className='space-x-2 bg-[#F5F6FA] text-black'>
            <span>Thêm Blog</span>
          </Button>
        </Link>
      </div>
      <div className='w-full mt-5 bg-white rounded-xl'>
        <div className='mr-5 pt-5'>
          <Input
            type='text'
            placeholder='Tìm kiếm theo tên tác giả...'
            value={searchTerm}
            onChange={handleSearch}
            className='border p-2 rounded mb-5 w-1/3 ml-auto'
          />
        </div>
        {isLoading && <p>Đang tải dữ liệu...</p>}
        {/* {isError && <p>Đã có lỗi xảy ra khi lấy dữ liệu.</p>} */}
        <DataTableCustom columns={columns} isError={isError} isLoading={isLoading} refetch={refetch} table={table} />
      </div>
    </div>
  )
}

export default BlogList

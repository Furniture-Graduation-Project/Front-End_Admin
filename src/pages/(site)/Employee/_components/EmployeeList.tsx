import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import DataTableCustom from '@/components/common/DataTable/DataTableCustom'
import React, { useState } from 'react'
import { columns } from './columns'
import { useMutipleEmployeeQuery } from '@/hooks/querys/useEmployeeQuery'
import { useDataTable } from '@/hooks/useDataTable'
import { PaginationState } from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const EmployeeList = () => {
  const [pagination, setPagination] = useState<PaginationState>(DEFAULT_PAGE_SIZE)
  const [searchTerm, setSearchTerm] = useState('')
  const { data, isLoading, isError, refetch } = useMutipleEmployeeQuery(pagination, searchTerm)

  const { table } = useDataTable({
    data: data?.data ?? [],
    columns: columns,
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
      <h1 className='text-[32px] font-semibold'>Danh sách nhân viên</h1>
      <div className='w-full pt-5'>
        <Link to='/employee/add'>
          <Button variant={'outline'} className='space-x-2 bg-[#F5F6FA] text-black'>
            <Plus size={18} />
            <span>Add Employee</span>
          </Button>
        </Link>
      </div>
      <div className='w-full mt-5 bg-white rounded-xl'>
        <div className='mr-5 pt-5'>
          <Input
            type='text'
            placeholder='Tìm kiếm theo tên...'
            value={searchTerm}
            onChange={handleSearch}
            className='border p-2 rounded mb-5 w-1/3 ml-auto'
          />
        </div>
        <DataTableCustom columns={columns} isError={isError} isLoading={isLoading} refetch={refetch} table={table} />
      </div>
    </div>
  )
}

export default EmployeeList

import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import DataTableCustom from '@/components/common/DataTable/DataTableCustom'
import { useEffect, useState } from 'react'
import { columns } from './columns'
import { useMultipleProductQuery } from '@/hooks/querys/useProductQuery'
import { useDataTable } from '@/hooks/useDataTable'
import { PaginationState } from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import ProductListHeader from './ProductListHeader'
import { IProduct } from '@/interface/product'
import { useAuth } from '@/context/AuthContext'

const ProductList = () => {
  const [pagination, setPagination] = useState<PaginationState>(DEFAULT_PAGE_SIZE)
  const [status, setStatus] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const { data, isLoading, isError, refetch } = useMultipleProductQuery(pagination, status, selectedCategory)

  const auth = useAuth()
  const userRole = auth.user?.role

  const { table } = useDataTable({
    data: data?.data ?? ([] as IProduct[]),
    columns: columns,
    totalData: data?.totalData,
    totalPage: data?.totalPage,
    pagination,
    setPagination
  })

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0
    }))
    refetch()
  }, [status, selectedCategory])

  return (
    <>
      <h1 className='text-[32px] font-semibold dark:text-gray-100'>Danh sách sản phẩm</h1>
      <div className='w-full pt-5'>
        {(userRole === 'admin' || userRole === 'product') && (
          <Link to='/product/add'>
            <Button variant='outline' className='space-x-2 bg-[#F5F6FA] dark:bg-gray-800 text-black dark:text-gray-100'>
              <Plus size={18} />
              <span>Thêm sản phẩm</span>
            </Button>
          </Link>
        )}
      </div>
      <div className='w-full mt-5 bg-white dark:bg-gray-800 rounded-xl p-4'>
        <ProductListHeader
          table={table}
          setPagination={setPagination}
          selectedStatus={status}
          setSelectedStatus={setStatus}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {isLoading && <div className='text-center'>Đang tải...</div>}
        {isError && <div className='text-red-600'>Lỗi khi tải sản phẩm. Vui lòng thử lại.</div>}
        <DataTableCustom columns={columns} isError={isError} isLoading={isLoading} refetch={refetch} table={table} />
      </div>
    </>
  )
}

export default ProductList

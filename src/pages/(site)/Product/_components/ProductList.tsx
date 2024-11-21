import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DEFAULT_PAGE_SIZE } from '@/constants/pagination'
import DataTableCustom from '@/components/common/DataTable/DataTableCustom'
import ProductListHeader from './ProductListHeader'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { columns } from './columns'
import { useMultipleProductQuery } from '@/hooks/querys/useProductQuery'
import { useDataTable } from '@/hooks/useDataTable'
import { PaginationState } from '@tanstack/react-table'
import { IProduct } from '@/interface/product'
import { useAuth } from '@/context/AuthContext'

const ProductList = () => {
  const { user, isLoading: authLoading } = useAuth()
  const [pagination, setPagination] = useState<PaginationState>(DEFAULT_PAGE_SIZE)
  const { data, isLoading, isError } = useMultipleProductQuery(pagination)

  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    if (data) {
      setProducts(data.data)
    }
  }, [data])

  const { table } = useDataTable({
    data: products,
    columns: columns,
    totalData: data?.totalData,
    totalPage: data?.totalPage,
    pagination,
    setPagination
  })

  const canAddProduct = user?.role === 'admin' || user?.role === 'product'

  return (
    <>
      <h1 className='text-[32px] font-semibold dark:text-gray-100'>Danh sách sản phẩm</h1>
      <div className='w-full pt-5'>
        {!authLoading && canAddProduct && (
          <Link to='/product/add'>
            <Button variant='outline' className='space-x-2 bg-[#F5F6FA] dark:bg-gray-800 text-black dark:text-gray-100'>
              <Plus size={18} />
              <span>Add Product</span>
            </Button>
          </Link>
        )}
      </div>
      <div className='w-full mt-5 bg-white dark:bg-gray-800 rounded-xl p-4'>
        <ProductListHeader table={table} setPagination={setPagination} />
        {isLoading && <div className='text-center'>Đang tải...</div>}
        {isError && <div className='text-red-600'>Lỗi khi tải sản phẩm. Vui lòng thử lại.</div>}
        <DataTableCustom
          columns={columns}
          isError={isError}
          isLoading={isLoading}
          table={table}
          refetch={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </div>
    </>
  )
}

export default ProductList

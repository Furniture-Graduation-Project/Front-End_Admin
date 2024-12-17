import { useEffect, useState } from 'react'
import { StatisticalService } from '@/services/statistical'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const DashboardTopProduct = () => {
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setIsError(false)
      try {
        const response = await StatisticalService.getTopProducts()
        const data = response.data.data || []
        console.log(data)
        setProducts(data)
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu:', err)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='bg-white ml-5 mr-5 rounded-lg mt-7 dark:bg-gray-800'>
      <div className='ml-5 mr-5'>
        {isLoading && <div className='text-center p-5 text-gray-500'>Đang tải dữ liệu...</div>}
        {isError && <div className='text-center p-5 text-red-500'>Lỗi khi tải dữ liệu, vui lòng thử lại sau.</div>}
        {!isLoading && !isError && (
          <Table>
            <TableHeader className='bg-[#F1F4F9]'>
              <TableRow>
                <TableHead className='text-black font-bold'>STT</TableHead>
                <TableHead className='text-black font-bold'>Tên sản phẩm</TableHead>
                <TableHead className='text-black font-bold'>Thể loại</TableHead>
                <TableHead className='text-black font-bold'>Biến thể</TableHead>
                <TableHead className='text-black font-bold'>Hình ảnh</TableHead>
                <TableHead className='text-black font-bold'>Số lượng bán ra</TableHead>
                <TableHead className='text-black font-bold'>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length > 0 ? (
                products.map((product: any, index: number) => (
                  <TableRow key={product._id || index}>
                    <TableCell className='text-black'>{index + 1}</TableCell>
                    <TableCell>{product.name || 'Không xác định'}</TableCell>
                    <TableCell>{product.categoryName || 'Không xác định'}</TableCell>
                    <TableCell>
                      {product.variants && product.variants.length > 0
                        ? product.variants.map((variant: any) => variant.value).join(', ')
                        : 'Không xác định'}
                    </TableCell>
                    <TableCell>
                      <img src={product.image} alt='Product Image' className='w-16 h-16 object-cover rounded' />
                    </TableCell>
                    <TableCell>{product.quantity || 'Không xác định'}</TableCell>
                    <TableCell>
                      <Button className=' bg-black hover:bg text-white px-4 py-2 rounded'>
                        <Link to={`/product/info/${product?._id}`} className='flex items-center'>
                          Chi tiết
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className='text-center'>
                    Không có sản phẩm nào.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}

export default DashboardTopProduct

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { useReviewQuery } from '@/hooks/querys/useReviewQuery'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const ProductDetailReviews = ({ dataId }: { dataId: string }) => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })

  const { data: reviewList, isLoading, isError } = useReviewQuery(dataId || '', pagination)
  const getRatingColor = (rating: number) => {
    if (rating === 1) return 'text-red-500'
    if (rating === 2 || rating === 3) return 'text-yellow-500'
    if (rating === 4 || rating === 5) return 'text-green-500'
    return ''
  }

  return (
    <div>
      <Label className='font-bold text-2xl'>Đánh giá của khách hàng</Label>
      <div className='p-4'>
        <Table className='w-full table-auto border-collapse'>
          <TableBody>
            <TableRow>
              <TableCell className='font-semibold text-left border-b p-2'>Bình luận</TableCell>
              <TableCell className='font-semibold text-center border-b p-2'>Đánh giá</TableCell>
              <TableCell className='font-semibold text-center border-b p-2'>Tên người dùng</TableCell>
              <TableCell className='font-semibold text-center border-b p-2'>Ngày bình luận</TableCell>
              <TableCell className='font-semibold text-center border-b p-2'></TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className='text-center p-2'>
                  Loading reviews...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={5} className='text-center p-2'>
                  Failed to load reviews
                </TableCell>
              </TableRow>
            ) : reviewList?.data && reviewList.data.length > 0 ? (
              reviewList.data.map((review) => (
                <TableRow key={review.id} className='border-b'>
                  <TableCell className='text-left p-2'>{review.reviewText}</TableCell>
                  <TableCell className={`text-center p-2 ${getRatingColor(review.rating)}`}>
                    {review.rating}/5
                  </TableCell>
                  <TableCell className='text-center p-2'>
                    {review.userId ? review.userId.name : 'Người dùng ẩn danh'}
                  </TableCell>
                  <TableCell className='text-center p-2'>
                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell className='text-center p-2'>
                    <Link to={`/account/${review.userId._id}`}>
                      <Button size='sm' variant='outline'>
                        Xem thông tin khách hàng
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className='text-center p-2'>
                  Không có đánh giá nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {reviewList?.totalData && reviewList.totalData > pagination.pageSize && (
          <div className='flex justify-center'>
            <Button
              className='rounded-full px-10'
              variant={'outline'}
              onClick={() => setPagination((p) => ({ ...p, pageSize: p.pageSize + 5 }))}
            >
              Tải thêm
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetailReviews

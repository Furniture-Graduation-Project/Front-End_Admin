import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useSingleOrderQuery } from '@/hooks/querys/useOrderQuery'
import { formatDate } from '@/utils/formatDate'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import { formatCurrency } from '@/utils/formatCurrency'

const OrderReturn = () => {
  const { id } = useParams()
  const { data } = useSingleOrderQuery(id || '')
  const getStatus = (status: string) => {
    return status == 'pending' ? 'Chờ xử lý' : status == 'approved' ? 'Đã chấp nhận' : 'Đã từ chối'
  }
  return (
    <div className='max-w-3xl mx-auto p-6'>
      <Card>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <h2 className='text- font-bold'>Chi tiết yêu cầu hoàn trả</h2>
            <Link className='flex items-center gap-2 whitespace-nowrap' to={`/account/order/${data?.data.data._id}`}>
              <ArrowLeft size={16} /> Quay lại
            </Link>
          </div>
        </CardHeader>
        <CardContent className='space-y-2'>
          <h2>Trạng thái : {data?.data.data.returnInfo?.dateResolved ? 'Đã giải quyết' : 'Chưa giải quyết'}</h2>
          <div>
            <h3>
              Ngày yêu cầu hoàn trả :{' '}
              {data?.data.data.returnInfo?.dateRequested && formatDate(data?.data.data.returnInfo?.dateRequested)}
            </h3>
            {data?.data.data.returnInfo?.dateResolved && (
              <h3>Ngày giải quyết : {formatDate(data?.data.data.returnInfo?.dateResolved)}</h3>
            )}
          </div>
          <p>
            <strong>Lý do trả hàng:</strong> {data?.data.data.returnInfo?.reason}
          </p>
        </CardContent>
      </Card>
      <Card className='mt-6'>
        <CardHeader>
          <h3 className='font-semibold'>Sản phẩm trả lại:</h3>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>git 
              <TableRow>
                <TableCell className='text-left whitespace-nowrap min-w-[300px]'>Sản phẩm</TableCell>
                <TableCell className='text-center whitespace-nowrap'>Số lượng</TableCell>
                <TableCell className='text-center whitespace-nowrap'>Giá</TableCell>
                <TableCell className='text-center whitespace-nowrap'>Trạng thái</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.data.returnInfo?.items.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className='flex items-center gap-5'>
                    <img
                      src={item.productOptionId?.image || ''}
                      alt={item.productId?.name}
                      className='w-32 h-32 object-cover'
                    />
                    <div className='flex flex-col gap-2'>
                      <h4 className='text-lg font-semibold'>{item.productId?.name}</h4>
                      <div className='text-sm text-gray-500'>
                        {item.productOptionId?.variants &&
                          item.productOptionId.variants.map((variant: any, id: number) => (
                            <h4 className='whitespace-nowrap' key={id}>
                              {variant.variant}: {variant.value}
                            </h4>
                          ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className='text-center'>{item.quantity}</TableCell>
                  <TableCell className='text-center'>{formatCurrency(item.quantity * item.unitPrice)}</TableCell>
                  <TableCell className='text-center'>{getStatus(item.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default OrderReturn

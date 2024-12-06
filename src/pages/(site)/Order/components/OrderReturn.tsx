import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useSingleOrderQuery } from '@/hooks/querys/useOrderQuery'
import { formatDate } from '@/utils/formatDate'
import { ArrowLeft, Check, MoreHorizontal } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import { formatCurrency } from '@/utils/formatCurrency'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import AlertAcitonDialog from '@/components/modals/AlertDialog'
import { useState } from 'react'
import useOrderMutation from '@/hooks/mutations/useOrderMutation'
import { useToast } from '@/hooks/use-toast'

const OrderReturn = () => {
  const { id } = useParams()
  const { toast } = useToast()
  const { data } = useSingleOrderQuery(id || '')
  const { mutate } = useOrderMutation({ action: 'UPDATE' })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getStatus = (status: string) => {
    return status == 'pending' ? 'Chờ xử lý' : status == 'approved' ? 'Đã chấp nhận' : 'Đã từ chối'
  }
  const handleFinish = () => {
    if (data?.data.data.returnInfo && !data?.data.data.returnInfo.dateResolved) {
      const pending = data?.data.data.returnInfo.items.some((item: any) => {
        return item.status == 'pending'
      })
      if (pending) {
        setIsModalOpen(false)
        toast({
          title: 'Cập nhật thất bại',
          description: 'Vẫn còn yêu cầu trả sản phẩm chưa giải quyết !',
          variant: 'destructive'
        })
        return
      }
      const itemsResolved = data?.data.data.returnInfo.items.map((item: any) => {
        return {
          ...item,
          productId: item.productId._id,
          productOptionId: item.productOptionId._id
        }
      })
      const updatedItemsOrder = data.data.data.items
        .map((orderItem: any) => {
          const resolvedItem = itemsResolved.find(
            (resolved: any) =>
              resolved.productId === orderItem.productId && resolved.productOptionId === orderItem.productOptionId
          )
          if (resolvedItem) {
            const updatedQuantity = orderItem.quantity - resolvedItem.quantity
            return {
              ...orderItem,
              quantity: updatedQuantity
            }
          }
          return {
            ...orderItem,
            productId: orderItem.productId._id,
            productOptionId: orderItem.productOptionId._id
          }
        })
        .filter((item: any) => item.quantity > 0)
      console.log(updatedItemsOrder)

      const newStatus = {
        _id: data?.data.data._id,
        items: updatedItemsOrder,
        returnInfo: {
          ...data?.data.data.returnInfo,
          items: itemsResolved,
          dateResolved: new Date()
        }
      }
      mutate(newStatus)
      setIsModalOpen(false)
    }
  }
  const updateOrderReturn = (status: string, id: string) => {
    if (data?.data.data.returnInfo?.dateResolved) {
      toast({
        title: 'Cập nhật thất bại',
        description: 'Không thể cập nhật yêu cầu trả hàng sau khi đánh dấu hoàn thành !',
        variant: 'destructive'
      })
      return
    }
    if (data?.data.data.returnInfo) {
      const items = data?.data.data.returnInfo.items.map((item: any) => {
        if (item.productOptionId._id == id) {
          return {
            ...item,
            productId: item.productId._id,
            productOptionId: item.productOptionId._id,
            status
          }
        }
        return {
          ...item,
          productId: item.productId._id,
          productOptionId: item.productOptionId._id
        }
      })
      const newStatus = {
        _id: data?.data.data._id,
        returnInfo: {
          ...data?.data.data.returnInfo,
          items
        }
      }
      mutate(newStatus)
      setIsModalOpen(false)
    }
  }
  return (
    <>
      <h1 className='text-3xl font-bold mb-6 dark:text-gray-100'>Thông tin yêu cầu trả hàng của khách hàng</h1>
      <Card>
        <CardHeader>
          <div className='flex flex-wrap justify-between items-center'>
            <h2 className='text-xl font-bold'>Chi tiết yêu cầu hoàn trả</h2>
            <Link className='flex items-center gap-2 whitespace-nowrap' to={`/order/edit/${data?.data.data._id}`}>
              <ArrowLeft size={16} /> Quay lại đơn hàng
            </Link>
          </div>
        </CardHeader>
        <CardContent className='space-y-2'>
          <h2>
            <strong>Trạng thái :</strong>{' '}
            {data?.data.data.returnInfo?.dateResolved ? (
              <span className='text-green-500'>Đã giải quyết</span>
            ) : (
              <span className='text-red-500'>Chờ giải quyết</span>
            )}
          </h2>

          <h3>
            <strong>Ngày yêu cầu hoàn trả :</strong>{' '}
            {data?.data.data.returnInfo?.dateRequested && formatDate(data?.data.data.returnInfo?.dateRequested)}
          </h3>
          {data?.data.data.returnInfo?.dateResolved && (
            <h3>
              <strong>Ngày giải quyết :</strong> {formatDate(data?.data.data.returnInfo?.dateResolved)}
            </h3>
          )}

          <p>
            <strong>Tên khách hàng : </strong>
            {data?.data.data.orderName}
          </p>
          <p>
            <strong>Số diện thoại :</strong> {data?.data.data.orderPhone}
          </p>
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
            <TableHeader>
              <TableRow>
                <TableCell className='text-left whitespace-nowrap min-w-[300px]'>Sản phẩm</TableCell>
                <TableCell className='text-center whitespace-nowrap'>Số lượng</TableCell>
                <TableCell className='text-center whitespace-nowrap'>Giá</TableCell>
                <TableCell className='text-center whitespace-nowrap'>Trạng thái</TableCell>
                <TableCell className='text-center whitespace-nowrap'>Thao tác</TableCell>
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
                  <TableCell className='text-center'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant={'ghost'} className='h-8 w-8 p-0'>
                          <span className='sr-only'>Mở menu</span>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel className='font-bold'>Hành Động</DropdownMenuLabel>
                        <DropdownMenuItem onSelect={() => updateOrderReturn('approved', item.productOptionId?._id)}>
                          Chấp nhận
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => updateOrderReturn('rejected', item.productOptionId?._id)}>
                          Không chấp nhận
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className='justify-end flex mt-5'>
            <Button
              disabled={!!data?.data.data.returnInfo?.dateResolved}
              onClick={() => setIsModalOpen(true)}
              className='flex gap-2'
            >
              <Check /> Hoàn thành yêu cầu
            </Button>
          </div>
          <AlertAcitonDialog
            title='Bạn chắc chắn muốn hoàn thành yêu cầu này?'
            description='Trạng thái của sản phẩm hoàn trả sẽ không thể thay đổi sau khi đánh dấu hoàn thành !'
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            handleAciton={handleFinish}
            className='dark:bg-gray-800 dark:text-white'
          />
        </CardContent>
      </Card>
    </>
  )
}

export default OrderReturn

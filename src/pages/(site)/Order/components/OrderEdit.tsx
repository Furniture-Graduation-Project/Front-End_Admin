import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import AlertAcitonDialog from '@/components/modals/AlertDialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatCurrency } from '@/utils/formatCurrency'
import { useSingleOrderQuery } from '@/hooks/querys/useOrderQuery'
import useOrderMutation from '@/hooks/mutations/useOrderMutation'
import { getStatusText } from '@/utils/getOrderStatus'
import { useToast } from '@/hooks/use-toast'
import { Separator } from '@/components/ui/separator'

const OrderEdit = () => {
  const { id } = useParams<{ id: string }>()
  const { toast } = useToast()
  const [paymentStatus, setPaymentStatus] = useState<'paid' | 'unpaid'>('unpaid')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: orderData } = useSingleOrderQuery(id || '')
  const { mutate } = useOrderMutation({ action: 'UPDATE' })
  const [orderStatuses, setOrderStatuses] = useState<string[]>([
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered'
  ])
  const [orderStatus, setOrderStatus] = useState<string>()

  const paymentStatuses = ['paid', 'unpaid']

  const handleSubmit = async (data: { status: any }) => {
    if (orderData?.data?.data._id && orderData?.data?.data.status !== 'received') {
      if (data.status == 'received') {
        const deliveredItem = orderData?.data?.data?.statusHistory?.find((item: any) => item.status == 'delivered')
        if (deliveredItem?.date) {
          const delivered = new Date(deliveredItem.date)
          const sevenDaysLater = new Date(delivered)
          sevenDaysLater.setDate(sevenDaysLater.getDate() + 7)
          const today = new Date()
          if (today >= sevenDaysLater) {
            const newStatus = {
              _id: orderData?.data?.data._id,
              status: data.status,
              statusHistory: [
                ...orderData?.data?.data.statusHistory,
                {
                  status: data.status
                }
              ]
            }
            mutate(newStatus)
            return
          } else {
            toast({
              title: 'Cập nhật thất bại',
              description: 'Đơn hàng sẽ được cập nhật tự động hoặc thủ công sau 7 ngày kể từ ngày giao',
              variant: 'destructive'
            })
            return
          }
        } else {
          toast({
            title: 'Lỗi',
            description: 'Không tìm thấy ngày giao trong lịch sử trạng thái',
            variant: 'destructive'
          })
          return
        }
      }
      const newStatus = {
        _id: orderData?.data?.data._id,
        status: data.status,
        statusHistory: [
          ...orderData?.data?.data.statusHistory,
          {
            status: data.status
          }
        ]
      }
      mutate(newStatus)
    } else {
      toast({
        title: 'Cập nhật thất bại',
        description: 'Không thể thay đổi trạng thái đơn hàng đã hoàn thành !',
        variant: 'destructive'
      })
    }
  }
  const hanleChangePayment = async () => {
    if (orderData?.data?.data._id && orderData?.data?.data.status !== 'received') {
      if (
        orderData?.data?.data.status == 'unpaid' &&
        paymentStatus == 'paid' &&
        orderData?.data?.data.payment?.paymentStatus == 'unpaid'
      ) {
        const newStatus = {
          _id: orderData?.data?.data._id,
          status: 'pending',
          payment: {
            ...orderData?.data?.data.payment,
            paymentStatus: 'paid'
          }
        }
        mutate(newStatus)
        setIsModalOpen(false)
        return
      } else {
        const newStatus = {
          _id: orderData?.data?.data._id,
          payment: {
            ...orderData?.data?.data.payment,
            paymentStatus: paymentStatus
          }
        }
        mutate(newStatus)
        setIsModalOpen(false)
      }
    } else {
      setIsModalOpen(false)
      toast({
        title: 'Cập nhật thất bại',
        description: 'Không thể thay đổi trạng thái thanh toán đơn hàng đã hoàn thành !',
        variant: 'destructive'
      })
    }
  }
  useEffect(() => {
    if (orderData) {
      if (orderData?.data?.data.payment?.paymentMethod == 'cash_on_delivery') {
        const cashOnDeliverys = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'received', 'cancelled']
        setOrderStatuses(cashOnDeliverys)
      }
      if (orderData?.data?.data.payment?.paymentMethod == 'credit_card') {
        const creditCard = [
          'unpaid',
          'pending',
          'confirmed',
          'processing',
          'shipped',
          'delivered',
          'received',
          'cancelled'
        ]
        setOrderStatuses(creditCard)
      }
      setOrderStatus(orderData?.data?.data.status)
      setPaymentStatus(orderData?.data?.data.payment?.paymentStatus)
    }
  }, [orderData])
  return (
    <>
      <h1 className='text-3xl font-bold mb-6 dark:text-gray-100'>Thông tin đơn hàng</h1>
      <div className='p-5 bg-white dark:bg-gray-800'>
        <h2 className='font-bold text-2xl mb-6 text-gray-800 dark:text-gray-100 border-b pb-4'>Trạng thái đơn hàng</h2>
        <div className='space-y-4 mb-4'>
          <div className='flex items-center'>
            <span className='mr-3 font-bold text-gray-800 dark:text-gray-100'>Trạng thái đơn hàng:</span>
            <span className='text-gray-600 dark:text-gray-400'>
              {orderData?.data?.data.status && getStatusText(orderData?.data?.data.status)}
            </span>
          </div>
          <div className='flex items-center'>
            <span className='mr-3 font-bold text-gray-800 dark:text-gray-100'>Trạng thái thanh toán:</span>
            <span className='text-gray-600 dark:text-gray-400'>
              {orderData?.data?.data.payment.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
            </span>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='bg-slate-50 dark:bg-gray-700 shadow rounded-lg p-6'>
            <h3 className='font-bold text-2xl mb-4 text-gray-800 dark:text-gray-100'>Cập nhập trạng thái đơn hàng</h3>
            <select
              onChange={(e) => setOrderStatus(e.target.value as string)}
              id='status'
              className='w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200'
            >
              {orderStatuses.map((status, index) => {
                console.log(index)

                const isDisabled =
                  index <= orderStatuses.indexOf(orderData?.data?.data.status as string) ||
                  index > orderStatuses.indexOf(orderData?.data?.data.status as string) + 1
                const isPaid =
                  orderData?.data?.data.payment?.paymentMethod == 'credit_card'
                    ? orderData?.data?.data.payment?.paymentStatus == 'paid'
                    : true
                console.log(isDisabled + status)

                return (
                  <option
                    selected={status === orderStatus}
                    key={status}
                    value={status}
                    disabled={isDisabled || status == 'cancelled' || status == 'received' || !isPaid}
                  >
                    {getStatusText(status)}
                  </option>
                )
              })}
            </select>
            <div className='flex justify-end'>
              <Button
                type='submit'
                variant='default'
                onClick={() => handleSubmit({ status: orderStatus })}
                className='bg-black hover text-white font-semibold py-2 rounded-md mt-4 dark:bg-blue-500 dark:hover:bg-blue-400'
              >
                {'Cập nhật trạng thái đơn hàng'}
              </Button>
            </div>
          </div>
          <div className='bg-slate-50 dark:bg-gray-700 shadow rounded-lg p-6'>
            <h2 className='font-bold text-2xl mb-4 text-gray-800 dark:text-gray-100'>Cập nhật trạng thái thanh toán</h2>
            <select
              className='w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-gray-200'
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value as 'paid' | 'unpaid')}
            >
              {paymentStatuses.map((status) => (
                <option selected={status === orderData?.data?.data.payment.paymentStatus} key={status} value={status}>
                  {status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                </option>
              ))}
            </select>
            <div className='flex justify-end'>
              <Button
                onClick={() => setIsModalOpen(true)}
                variant='default'
                className='bg-black hover text-white font-semibold py-2 rounded-md mt-4 dark:bg-blue-500 dark:hover:bg-blue-400'
              >
                {'Cập nhật trạng thái thanh toán'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white dark:bg-gray-800 shadow rounded-lg p-6 mt-8'>
        <h2 className='font-bold text-2xl mb-4 text-gray-800 dark:text-gray-100 border-b pb-4'>Thông tin khách hàng</h2>
        <div className='space-y-4'>
          <div className='flex items-center space-x-3'>
            <span role='img' aria-label='user' className='text-gray-800 dark:text-gray-100 text-2xl'>
              👤
            </span>
            <div className='flex-1'>
              <div
                id='orderName'
                className='w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              >
                {orderData?.data?.data?.orderName}
              </div>
            </div>
          </div>
          <div className='flex items-center space-x-3'>
            <span role='img' aria-label='phone' className='text-gray-800 dark:text-gray-100 text-2xl'>
              📞
            </span>
            <div className='flex-1'>
              <div
                id='orderPhone'
                className='w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              >
                {orderData?.data?.data?.orderPhone}
              </div>
            </div>
          </div>
          <div className='flex items-center space-x-3'>
            <span role='img' aria-label='address' className='text-gray-800 dark:text-gray-100 text-2xl'>
              📍
            </span>
            <div className='flex-1'>
              <div
                id='orderAddress'
                className='w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              >
                {orderData?.data?.data?.orderAddress}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white dark:bg-gray-800 shadow rounded-lg p-6 mt-8'>
        <h2 className='font-bold text-2xl mb-4 text-gray-800 dark:text-gray-100 border-b pb-4'>Thông tin sản phẩm</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Ảnh</TableHead>
              <TableHead>Tên sản phẩm</TableHead>
              <TableHead>Biến thể</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Số lượng</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderData?.data?.data?.items.map((item: any, index) => (
              <TableRow key={item._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className='w-40 h-40 min-w-[10rem]'>
                  <div className='w-full h-full overflow-hidden rounded-md'>
                    <img
                      src={item.productId.images[0]}
                      alt={item.productId.name}
                      className='w-full h-full object-contain'
                    />
                  </div>
                </TableCell>

                <TableCell className=' whitespace-nowrap'>{item.productId.name}</TableCell>
                <TableCell className='whitespace-nowrap'>
                  {item.productOptionId?.variants &&
                    item.productOptionId.variants.map((variant: any, id: number) => (
                      <div key={id} className='text-sm text-gray-500 dark:text-gray-400'>
                        {variant.variant}: {variant.value}
                      </div>
                    ))}
                </TableCell>
                <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{formatCurrency(item.unitPrice * item.quantity)}</TableCell>
                <TableCell>
                  <Link className='text-blue-500 font-medium' to={`/product/info/${item.productId._id}`}>
                    Chi tiết
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Separator className='my-4' />
        <div className='flex flex-col items-end space-y-2 bg-orange-50 dark:bg-gray-950 p-4 rounded-md'>
          <h2 className='text-xl font-bold'>
            Tổng tiền cần thanh toán :{' '}
            {orderData?.data?.data?.totalPrice && formatCurrency(orderData?.data?.data?.totalPrice)}
          </h2>
          <h3 className='text-lg uppercase' id='idOrder'>
            Mã đơn hàng: <span>{orderData?.data?.data?._id}</span>
          </h3>
        </div>
      </div>

      <AlertAcitonDialog
        title='Bạn chắc chắn muốn thay đổi trạng thái thanh toán hay không?'
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        handleAciton={hanleChangePayment}
        className='dark:bg-gray-800 dark:text-white'
      />
    </>
  )
}
export default OrderEdit

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IOrder } from '@/interface/order'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { OrderService } from '@/services/order'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { AlertModal } from '@/components/modals/alert-modal'
import AlertAcitonDialog from '@/components/modals/AlertDialog'

const orderStatuses = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
  'returned',
  'refunded'
] as const

const paymentStatuses = ['paid', 'unpaid']

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Chờ xử lý'
    case 'confirmed':
      return 'Đã xác nhận'
    case 'processing':
      return 'Đang xử lý'
    case 'shipped':
      return 'Đã gửi hàng'
    case 'delivered':
      return 'Đã giao hàng'
    case 'cancelled':
      return 'Đã hủy'
    case 'returned':
      return 'Đã hoàn trả'
    case 'refunded':
      return 'Đã hoàn tiền'
    default:
      return ''
  }
}

const FormSchema = z.object({
  status: z.enum(orderStatuses)
})

const OrderEdit = () => {
  const { id } = useParams<{ id: string }>()
  const [order, setOrder] = useState<IOrder | null>(null)
  const [loading, setLoading] = useState(true)
  const [paymentStatus, setPaymentStatus] = useState<'paid' | 'unpaid'>('unpaid')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const form = useForm<IOrder>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: 'pending'
    }
  })

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) {
        console.error('ID không tồn tại')
        return
      }

      try {
        const response = await OrderService.getById(id)
        setOrder(response.data.data)
        setPaymentStatus(response.data.data.payment.paymentStatus)
        form.reset({ status: response.data.data.status })
      } catch (error) {
        console.error('Lỗi khi lấy thông tin đơn hàng:', error)
        toast({
          title: 'Lỗi',
          description: 'Không thể lấy thông tin đơn hàng.',
          variant: 'destructive'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [id, form])

  const handleSubmit = async (data: IOrder) => {
    setLoading(true)
    try {
      await OrderService.update(id!, { status: data.status })
      toast({
        title: 'Cập nhật thành công',
        description: `Đơn hàng đã được cập nhật trạng thái thành ${getStatusText(data.status)}.`,
        variant: 'default'
      })
    } catch (error) {
      console.error('Lỗi khi cập nhật đơn hàng:', error)
      toast({
        title: 'Lỗi cập nhật',
        description: 'Đã xảy ra lỗi khi cập nhật đơn hàng.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentStatusUpdate = async () => {
    if (!order) {
      console.error('Không có đơn hàng để cập nhật trạng thái thanh toán')
      return
    }

    setLoading(true)
    try {
      const updatedPayment = {
        ...order.payment,
        paymentStatus
      }
      await OrderService.update(id!, { payment: updatedPayment })

      toast({
        title: 'Cập nhật thành công',
        description: `Trạng thái thanh toán đã được cập nhật thành ${paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}.`,
        variant: 'default'
      })
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái thanh toán:', error)
      toast({
        title: 'Lỗi cập nhật',
        description: 'Đã xảy ra lỗi khi cập nhật trạng thái thanh toán.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const confirmPaymentUpdate = () => {
    setIsModalOpen(true)
  }

  const handleModalConfirm = async () => {
    setIsModalOpen(false)
    await handlePaymentStatusUpdate()
  }

  if (loading) {
    return <div>Đang tải...</div>
  }

  if (!order) {
    return <div>Không tìm thấy đơn hàng với ID đã cho.</div>
  }

  const currentStatusIndex = orderStatuses.indexOf(order.status)

  return (
    <div className='bg-gray-50 min-h-screen py-8 px-4 md:px-10'>
      <div className='bg-white shadow rounded-lg p-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
            <FormField
              name='status'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor='status' className='font-bold text-2xl mb-4 text-gray-800'>
                    Cập nhập trạng thái đơn hàng
                  </Label>
                  <FormControl>
                    <select
                      id='status'
                      {...field}
                      className='w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                      {orderStatuses.map((status, index) => {
                        const isDisabled = index < currentStatusIndex || index > currentStatusIndex + 1
                        return (
                          <option key={status} value={status} disabled={isDisabled}>
                            {getStatusText(status)}
                          </option>
                        )
                      })}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              variant='default'
              disabled={loading}
              className=' bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-md'
            >
              {loading ? 'Đang xử lý...' : 'Cập nhật trạng thái đơn hàng'}
            </Button>
          </form>
        </Form>
      </div>

      <div className='bg-white shadow rounded-lg p-6 mt-8'>
        <h2 className='font-bold text-2xl mb-4 text-gray-800'>Cập nhật trạng thái thanh toán</h2>
        <select
          className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500'
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value as 'paid' | 'unpaid')}
        >
          {paymentStatuses.map((status) => (
            <option key={status} value={status}>
              {status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
            </option>
          ))}
        </select>
        <Button
          onClick={confirmPaymentUpdate}
          variant='default'
          disabled={loading}
          className=' bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-md mt-4'
        >
          {loading ? 'Đang xử lý...' : 'Cập nhật trạng thái thanh toán'}
        </Button>
      </div>
      <AlertAcitonDialog
        title='Bạn chắc chắn muốn thay đổi trạng thái thanh toán hay không?'
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        handleAciton={handleModalConfirm}
      />
    </div>
  )
}

export default OrderEdit

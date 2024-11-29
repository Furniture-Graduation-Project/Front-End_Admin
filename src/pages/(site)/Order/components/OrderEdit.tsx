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
import AlertAcitonDialog from '@/components/modals/AlertDialog'
// import React from 'react'

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

  
  // State để lưu địa điểm mới
  const [newLocation, setNewLocation] = useState('');

  const handleAddLocation = async () => {
    if (!newLocation.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập địa điểm.",
        variant: "destructive",
      });
      return;
    }
  
    // Kiểm tra dữ liệu order và shipments
    if (!order) {
      toast({
        title: "Lỗi",
        description: "Dữ liệu đơn hàng không tồn tại.",
        variant: "destructive",
      });
      return;
    }
  
    if (!order.shipments) {
      toast({
        title: "Lỗi",
        description: "Thông tin shipment không có sẵn.",
        variant: "destructive",
      });
      return;
    }
  
    try {
      setLoading(true);
  
      const updatedLocations = [...(order.shipments.locations || []), newLocation];
  
      await OrderService.update(id!, {
        shipments: {
          ...order.shipments,
          locations: updatedLocations,
        },
      });
  
      // Cập nhật dữ liệu trong giao diện
      setOrder((prev) =>
        prev
          ? {
              ...prev,
              shipments: {
                ...prev.shipments,
                locations: updatedLocations,
              },
            }
          : null
      );
  
      toast({
        title: "Thành công",
        description: "Đã thêm địa điểm mới vào shipments.",
        variant: "default",
      });
  
      // Reset input
      setNewLocation("");
    } catch (error) {
      console.error("Lỗi khi thêm địa điểm:", error);
      toast({
        title: "Lỗi",
        description: "Không thể thêm địa điểm, vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return <div>Đang tải...</div>
  }

  if (!order) {
    return <div>Không tìm thấy đơn hàng với ID đã cho.</div>
  }

  const currentStatusIndex = orderStatuses.indexOf(order.status)

  return (

    <div className='bg-gray-50 dark:bg-gray-900 min-h-screen py-8 px-4 md:px-10'>
      <div className='bg-white dark:bg-gray-800 shadow rounded-lg p-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
            <FormField
              name='status'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor='status' className='font-bold text-2xl mb-4 text-gray-800 dark:text-gray-100'>
                    Cập nhập trạng thái đơn hàng
                  </Label>
                  <FormControl>
                    <select
                      id='status'
                      {...field}
                      className='w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200'
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
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="default"
                disabled={loading}
                className="bg-black hover text-white font-semibold py-2 rounded-md  dark:bg-blue-500 dark:hover:bg-blue-400"
              >
                {loading ? "Đang xử lý..." : "Cập nhật trạng thái đơn hàng"}
              </Button>
            </div>

          </form>
        </Form>
      </div>
      <div className='bg-white dark:bg-gray-800 shadow rounded-lg p-6 mt-8'>
        <h2 className='font-bold text-2xl mb-4 text-gray-800 dark:text-gray-100'>Cập nhật trạng thái thanh toán</h2>
        <select
          className='w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-gray-200'
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value as 'paid' | 'unpaid')}
        >
          {paymentStatuses.map((status) => (
            <option key={status} value={status}>
              {status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
            </option>
          ))}
        </select>
        <div className="flex justify-end">
          <Button
            onClick={confirmPaymentUpdate}
            variant="default"
            disabled={loading}
            className="bg-black hover text-white font-semibold py-2 rounded-md mt-4 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            {loading ? "Đang xử lý..." : "Cập nhật trạng thái thanh toán"}
          </Button>
        </div>
      </div>
      <AlertAcitonDialog
        title='Bạn chắc chắn muốn thay đổi trạng thái thanh toán hay không?'
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        handleAciton={handleModalConfirm}
        className='dark:bg-gray-800 dark:text-white'
      />
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mt-8">
        <h2 className='font-bold text-2xl mb-4 text-gray-800 dark:text-gray-100'>Thông tin khách hàng</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <span role="img" aria-label="user" className="text-gray-800 dark:text-gray-100 text-2xl">👤</span>
            <div className="flex-1">
              <input
                id="orderName"
                type="text"
                value={order.orderName}
                readOnly
                className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span role="img" aria-label="phone" className="text-gray-800 dark:text-gray-100 text-2xl">📞</span>
            <div className="flex-1">
              <input
                id="orderPhone"
                type="text"
                value={order.orderPhone}
                readOnly
                className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span role="img" aria-label="address" className="text-gray-800 dark:text-gray-100 text-2xl">📍</span>
            <div className="flex-1">
              <input
                id="orderAddress"
                type="text"
                value={order.orderAddress}
                readOnly
                className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mt-8">
        <h2 className='font-bold text-2xl mb-4 text-gray-800 dark:text-gray-100'>Danh sách sản phẩm</h2>
        <div className="flex flex-col space-y-4 border border-gray-300 dark:border-gray-700">
          <div className="flex font-bold text-lg text-gray-800 dark:text-gray-100 border-b border-r border-gray-300 dark:border-gray-700">
            <div className="flex-1 p-2">STT</div>
            <div className='flex-1 p-2'>Ảnh</div>
            <div className="flex-1 p-2">Tên sản phẩm</div>
            <div className='flex-1 p-2'>Biến thể</div>
            <div className="flex-1 p-2">Giá</div>
            <div className="flex-1 p-2">Số lượng</div>
            <div className='flex-1 p-2'>Tổng tiền</div>
          </div>
          {order.items.map((item, index) => (
            <div key={item._id} className="flex space-x-4 border-b border-r border-gray-300 dark:border-gray-700">
              <div className="flex-1 p-2">{index + 1}</div>
              <div className="flex-1 p-2">
                <img
                  src={item.productId.images[0]}
                  alt={item.productId.name}
                  className="w-20 h-20"
                />
              </div>
              <div className="flex-1 p-2">{item.productId.name}</div>
              <div className='flex-1 p-2'>
                <span>Biến thể: {item.productOptionId}</span>
              </div>
              <div className="flex-1 p-2">{item.unitPrice.toLocaleString()} VND</div>
              <div className="flex-1 p-2">{item.quantity}</div>
              <div className="flex-1 p-2">{(item.unitPrice * item.quantity).toLocaleString()} VND</div>
            </div>
          ))}
        </div>
      </div>
      {/* Section thêm địa điểm */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mt-8">
        <h2 className="font-bold text-2xl mb-4 text-gray-800 dark:text-gray-100">
          Thêm địa điểm tại shipments
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            placeholder="Nhập địa điểm mới"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          />
          <Button
            onClick={handleAddLocation}
            variant="default"
            disabled={loading}
            className="bg-black hover text-white font-semibold py-2 rounded-md mt-4 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            {loading ? "Đang xử lý..." : "Thêm địa điểm"}
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mt-8">
        <h2 className="font-bold text-2xl mb-4 text-gray-800 dark:text-gray-100">
          Danh sách địa điểm
        </h2>
        {order?.shipments?.locations?.length ? (
          <ul className="list-disc pl-6 text-gray-800 dark:text-gray-200">
            {order.shipments.locations.map((location, index) => (
              <li key={index}>{location}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            Chưa có địa điểm nào trong danh sách.
          </p>
        )}
      </div>
    </div>
  )
}
export default OrderEdit


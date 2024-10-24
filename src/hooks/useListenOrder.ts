import { useEffect } from 'react'
import { SocketService } from '@/services/socket'
import { toast } from 'sonner'

const useListenOrder = () => {
  // Hàm xử lý khi có sự kiện "Order"
  const handleOrderEvent = (data: any) => {
    console.log('Received Order event:', data)
    toast('Order received', {
      description: 'Order by : ' + data.orderName,
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo action clicked')
      }
    })
  }

  useEffect(() => {
    SocketService.init() // Khởi tạo socket

    const socket = SocketService.get() // Lấy socket từ SocketService
    if (socket) {
      console.log('Socket connected:', socket.connected) // Kiểm tra kết nối socket

      socket.on('Order', handleOrderEvent) // Lắng nghe sự kiện "Order"
      console.log('Listener for "Order" event added.')
    }

    // Cleanup khi component bị hủy
    return () => {
      if (socket) {
        socket.off('Order', handleOrderEvent) // Hủy lắng nghe sự kiện khi unmount
        console.log('Listener for "Order" event removed.')
      }
      SocketService.disconnect() // Ngắt kết nối socket khi component unmount nếu cần
    }
  }, []) // Chạy một lần khi component mount

  return null // Hoặc trả về một giá trị khác nếu cần
}

export default useListenOrder

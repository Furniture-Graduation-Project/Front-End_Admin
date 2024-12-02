import { useEffect } from 'react'
import { SocketService } from '@/services/socket'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'

const useListenOrder = () => {
  const { user } = useAuth()
  const handleOrderEvent = (data: any) => {
    toast('Order received', {
      description: 'Order by : ' + data.orderName,
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo action clicked')
      }
    })
  }
  useEffect(() => {
    if (user?.role == 'order' || user?.role == 'admin') {
      SocketService.init()
      const socket = SocketService.get()
      if (socket) {
        socket.on('Order', handleOrderEvent)
      }
      return () => {
        if (socket) {
          socket.off('Order', handleOrderEvent)
        }
        SocketService.disconnect()
      }
    }
  }, [user])

  return null
}

export default useListenOrder

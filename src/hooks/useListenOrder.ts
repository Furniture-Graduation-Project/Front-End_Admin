import { useEffect } from 'react'
import { SocketService } from '@/services/socket'
import { toast } from 'sonner'

const useListenOrder = () => {
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
  }, [])

  return null
}

export default useListenOrder

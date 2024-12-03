import { useState } from 'react'
import { Button } from '@/components/ui/button'

const OrderShipment = () => {
  const [newLocation, setNewLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState({
    shipments: {
      locations: ['Hà Nội', 'Hồ Chí Minh']
    }
  })

  const handleAddLocation = () => {
    if (!newLocation.trim()) return

    setLoading(true)

    // Giả lập thêm địa điểm (có thể thay đổi theo API hoặc logic thực tế của bạn)
    setTimeout(() => {
      setOrder((prevOrder) => ({
        ...prevOrder,
        shipments: {
          locations: [...prevOrder.shipments.locations, newLocation]
        }
      }))
      setNewLocation('')
      setLoading(false)
    }, 1000) // Giả lập thời gian xử lý
  }

  return (
    <div>
      <div className='bg-white dark:bg-gray-800 shadow rounded-lg p-6 mt-8'>
        <h2 className='font-bold text-2xl mb-4 text-gray-800 dark:text-gray-100'>Thêm địa điểm tại shipments</h2>
        <div className='space-y-4'>
          <input
            type='text'
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            placeholder='Nhập địa điểm mới'
            className='w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          />
          <Button
            onClick={handleAddLocation}
            variant='default'
            disabled={loading}
            className='bg-black hover:text-white font-semibold py-2 rounded-md mt-4 dark:bg-blue-500 dark:hover:bg-blue-400'
          >
            {loading ? 'Đang xử lý...' : 'Thêm địa điểm'}
          </Button>
        </div>
      </div>
      <div className='bg-white dark:bg-gray-800 shadow rounded-lg p-6 mt-8'>
        <h2 className='font-bold text-2xl mb-4 text-gray-800 dark:text-gray-100'>Danh sách địa điểm</h2>
        {order?.shipments?.locations?.length ? (
          <ul className='list-disc pl-6 text-gray-800 dark:text-gray-200'>
            {order.shipments.locations.map((location, index) => (
              <li key={index}>{location}</li>
            ))}
          </ul>
        ) : (
          <p className='text-gray-500 dark:text-gray-400'>Chưa có địa điểm nào trong danh sách.</p>
        )}
      </div>
    </div>
  )
}

export default OrderShipment

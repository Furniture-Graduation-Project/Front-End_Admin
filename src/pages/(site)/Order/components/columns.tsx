import { ColumnDef } from '@tanstack/react-table'
import { IOrder } from '@/interface/order'
import { CellAction } from './cell-action'

const getStatusBgColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-200 dark:bg-yellow-700'
    case 'confirmed':
      return 'bg-blue-200 dark:bg-blue-700'
    case 'unpaid':
      return 'bg-blue-200 dark:bg-blue-700'
    case 'processing':
      return 'bg-orange-200 dark:bg-orange-700'
    case 'shipped':
      return 'bg-green-200 dark:bg-green-700'
    case 'delivered':
      return 'bg-teal-200 dark:bg-teal-700'
    case 'cancelled':
      return 'bg-red-200 dark:bg-red-700'
    case 'returned':
      return 'bg-purple-200 dark:bg-purple-700'
    case 'refunded':
      return 'bg-gray-200 dark:bg-gray-700'
    default:
      return ''
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Chờ xử lý'
    case 'confirmed':
      return 'Đã xác nhận'
    case 'unpaid':
      return 'Chờ thanh toán'
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

const getPaymentStatusBgColor = (paymentStatus: string) => {
  switch (paymentStatus) {
    case 'paid':
      return 'bg-green-200 dark:bg-green-700'
    case 'unpaid':
      return 'bg-red-200 dark:bg-red-700'
    default:
      return ''
  }
}

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: 'STT',
    header: 'STT',
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>
    }
  },
  {
    accessorKey: 'orderName',
    header: 'Tên Đơn Hàng'
  },
  {
    accessorKey: 'orderPhone',
    header: 'Số Điện Thoại'
  },
  {
    accessorKey: 'orderAddress',
    header: 'Địa Chỉ'
  },
  {
    accessorKey: 'totalPrice',
    header: 'Tổng Giá Trị',
    cell: ({ row }) => {
      const price = row.getValue<number>('totalPrice')
      return <div>{`$${price.toFixed(2)}`}</div>
    }
  },
  {
    accessorKey: 'status',
    header: 'Trạng Thái',
    cell: ({ row }) => {
      const status = row.getValue<string>('status')
      const bgColor = getStatusBgColor(status)
      const statusText = getStatusText(status)
      return (
        <div
          className={`flex items-center justify-center p-1 rounded ${bgColor} text-center text-black dark:text-white`}
        >
          {statusText}
        </div>
      )
    }
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Trạng Thái Thanh Toán',
    cell: ({ row }) => {
      const paymentStatus = row.original.payment.paymentStatus
      const bgColor = getPaymentStatusBgColor(paymentStatus)
      const paymentText = paymentStatus === 'paid' ? 'Đã Thanh Toán' : 'Chưa Thanh Toán'
      return (
        <div
          className={`flex items-center justify-center p-1 rounded ${bgColor} text-center text-black dark:text-white
            w-[150px] sm:w-[120px] md:w-[100px] lg:w-[150px]`}
        >
          {paymentText}
        </div>
      )
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]

import { IOrderItem } from './orderItem'
import { IPayment } from './payment'
import { IShipment } from './shipment'

export interface IOrder {
  _id: string
  userId: string
  orderName: string
  orderPhone: string
  orderAddress: string
  totalPrice: number
  items: IOrderItem[]
  payment: IPayment
  shipments: IShipment
  status:
    | 'unpaid'
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'received'
    | 'cancelled'
    | 'returned'
    | 'refunded'
  statusHistory: {
    status:
      | 'unpaid'
      | 'pending'
      | 'confirmed'
      | 'processing'
      | 'shipped'
      | 'delivered'
      | 'received'
      | 'cancelled'
      | 'returned'
      | 'refunded'
    date?: Date
  }[]
  returnInfo?: {
    reason: string
    items: IItemReturnOrder[]
    dateRequested: Date
    dateResolved: Date
  }
}
export interface IItemReturnOrder {
  productId: string
  productOptionId: string
  quantity: number
  unitPrice: number
  status: string
}

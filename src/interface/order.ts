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
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned' | 'refunded'
}

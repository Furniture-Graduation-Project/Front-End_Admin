export interface IOrderItem {
  variants: any
  price: any
  productName: ReactNode
  _id: Key | null | undefined
  productId: string
  productOptionId: string
  unitPrice: number
  quantity: number
}

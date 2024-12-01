export interface Variant {
  variant: string
  value: string
}
export interface ProductItem {
  _id?: string
  productId: string
  variants: Variant[]
  stock: number
  outStock: number
  price: number
  image?: string
  SKU: string
  status: 'active' | 'deleted'
}

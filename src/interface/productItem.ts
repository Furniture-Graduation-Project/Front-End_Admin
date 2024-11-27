export interface Variant {
  variant: string
  value: string
}

export interface ProductItem {
  productId: string
  variants: Variant[]
  stock: number
  price: number
  image?: string
}

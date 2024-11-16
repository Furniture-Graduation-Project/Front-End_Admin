import { ICategory } from './category'
export interface IProduct {
  _id?: string
  name: string
  category: ICategory
  description?: string
  price: number
  SKU: string
  images: string[]
  material?: string
  status: 'available' | 'out of stock' | 'discontinued'
}

export interface ProductFormData {
  name: string
  category: string
  description?: string
  price: number
  SKU: string
  images: string[]
  material?: string
  status: 'available' | 'out of stock' | 'discontinued'
}

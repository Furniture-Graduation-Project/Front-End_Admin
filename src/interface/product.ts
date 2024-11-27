import { ICategory } from './category'
import { IMaterial } from './material'
export interface IProduct {
  _id?: string
  name: string
  category: ICategory
  description?: string
  SKU: string
  images: string[]
  material: IMaterial
  materialDetail: string
  status: 'available' | 'out of stock' | 'discontinued'
}

export interface ProductFormData {
  name: string
  category: string
  description?: string
  SKU: string
  image: string
  images: string[]
  material: string
  materialDetail: string
  status: 'available' | 'out of stock' | 'discontinued'
}

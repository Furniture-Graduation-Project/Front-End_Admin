import { ICategory } from './category'
import { IMaterial } from './material'
import { ProductItem } from './productItem'
export interface IProduct {
  _id?: string
  name: string
  category: ICategory
  description?: string
  images: string[]
  material: IMaterial
  materialDetail: string
  status: 'creating' | 'available' | 'disable'
  items?: ProductItem[]
}

export interface ProductFormData {
  name: string
  category: string
  description?: string
  images: string[]
  material: string
  materialDetail: string
  status: 'creating' | 'available' | 'disable'
}

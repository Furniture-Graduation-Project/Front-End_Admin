import { ICategory } from './category'
import { IMaterial } from './material'
export interface IProduct {
  _id?: string
  name: string
  category: ICategory
  description?: string
  images: string[]
  material: IMaterial
  materialDetail: string
  status: 'creating' | 'available' | 'disable'
}

export interface ProductFormData {
  name: string
  category: string
  description?: string
  images: string[] | File[] | undefined
  material: string
  materialDetail: string
  status: 'creating' | 'available' | 'disable'
}

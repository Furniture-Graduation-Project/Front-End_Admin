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
  status: 'Đang tạo' | 'Còn hàng' | 'Khóa'
}

export interface ProductFormData {
  name: string
  category: string
  description?: string
  images: string[]
  material: string
  materialDetail: string
  status: 'Đang tạo' | 'Còn hàng' | 'Khóa'
}

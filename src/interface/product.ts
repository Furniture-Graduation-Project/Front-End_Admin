import { ICategory } from './category'

export interface IProduct {
  _id?: string
  categoryId: ICategory
  thumnail: string
  name: string
  title: string
  description: string
  price: number
  quantity: number
  colors: string[]
  size: string[]
  brand: string
  images: string[]
}

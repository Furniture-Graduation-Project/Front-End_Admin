import { IUser } from './account'
import { IProduct } from './product'

export interface IReview {
  id?: string
  productId?: IProduct
  userId: IUser
  rating: number
  reviewText: string
  createdAt?: Date
}

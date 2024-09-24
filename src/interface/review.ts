import { IProduct } from './product'

export interface IReview {
  id?: string
  productId: IProduct // ID của sản phẩm
  userId: string // ID của người dùng
  rating: number // Đánh giá từ 1 đến 5
  comment: string // Nội dung review
  createdAt?: Date // Ngày tạo review
}

export interface IPromotion {
  _id?: string
  name: string
  description?: string
  discountPercentage: number
  startDate: string
  endDate: string
  isActive: boolean
  applicableProducts?: string[] // Array of Product IDs
  createdAt?: string
  updatedAt?: string
}

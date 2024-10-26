export interface IBlog {
  _id?: string
  authorId: string
  title: string
  content: string
  tags?: string[]
  image?: string
  date?: Date
  createdAt?: Date
  updatedAt?: Date
}

export interface IBlog {
  authorId: string
  title: string
  content: string
  tags: string[]
  image?: string
  date: Date
  createdAt?: Date
  updatedAt?: Date
}

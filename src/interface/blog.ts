export interface IBlog {
  _id?: string
  employeeId: string
  title: string
  content: string
  tags?: string[]
  image?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface ICreateBlog {
  employeeId: string
  title: string
  content: string
  tags?: string[]
  image?: string
}

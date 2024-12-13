export interface IApiResponse<T> {
  sort: any
  data: T
  message: string
  totalData?: number
  totalPage?: number
  token?: string
  success: boolean
}

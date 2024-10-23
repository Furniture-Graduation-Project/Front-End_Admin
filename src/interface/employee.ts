export interface IEmployee {
  _id?: string
  fullName: string
  avatar?: string
  username: string
  password: string
  phoneNumber: string
  address: string
  role: string
  createdAt?: string
  token?: string
}
export interface ICreateEmployee {
  fullName: string
  avatar?: string
  username: string
  password: string
  phoneNumber: string
  address: string
  role: string
}
export interface ILoginResponse {
  employee: IEmployee // Dữ liệu nhân viên
  token: string // Token đăng nhập
}

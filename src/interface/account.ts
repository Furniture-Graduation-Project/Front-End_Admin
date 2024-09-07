export interface Account {
  id: number
  type: string
  provider: string
  expires_at: string
  status: 'active' | 'inactive'
}

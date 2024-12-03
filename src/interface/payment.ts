export interface IPayment {
  paymentMethod: 'credit_card' | 'cash_on_delivery'
  amount: number
  paymentDate?: Date
  paymentStatus: 'paid' | 'unpaid'
}

export interface IPayment {
  // paymentMethod: 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer' | 'cash_on_delivery'
  // amount: number
  // paymentDate?: Date
  paymentStatus: 'paid' | 'unpaid'
}

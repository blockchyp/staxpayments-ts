import * as StaxPayments from '../index'

if (typeof window !== 'undefined') {
  (window as any).staxpayments = StaxPayments;
}

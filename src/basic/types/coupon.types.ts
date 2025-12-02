export type CouponValidationError = 'DUPLICATED' | 'NOT_FOUND';
export type CouponValidation =
  | { valid: false; error: CouponValidationError }
  | { valid: true; error: null };

export interface Coupon {
  name: string;
  code: string;
  discountType: 'amount' | 'percentage';
  discountValue: number;
}

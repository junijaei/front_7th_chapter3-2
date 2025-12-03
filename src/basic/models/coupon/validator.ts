import { findCouponByCode } from '@/models/coupon/coupon';
import { Coupon, CouponValidation } from '@/types';

export const validateAddCoupon = (
  coupons: Coupon[],
  newCoupon: Coupon
): CouponValidation => {
  const existingCoupon = findCouponByCode(coupons, newCoupon.code);
  if (existingCoupon)
    return {
      valid: false,
      error: 'DUPLICATED',
      message: '이미 존재하는 쿠폰 코드입니다.',
    };
  return { valid: true, error: null, message: '쿠폰이 추가되었습니다.' };
};

export const validateRemoveCoupon = (
  coupons: Coupon[],
  removeCouponCode: string
): CouponValidation => {
  if (!findCouponByCode(coupons, removeCouponCode))
    return {
      valid: false,
      error: 'NOT_FOUND',
      message: '존재하지 않는 쿠폰입니다.',
    };
  return { valid: true, error: null, message: '쿠폰이 삭제되었습니다.' };
};

export const validateCouponDiscount = (
  discountType: 'percentage' | 'amount',
  discountValue: number
): CouponValidation => {
  if (discountType === 'percentage' && discountValue > 100) {
    return {
      valid: false,
      error: 'INVALID_DISCOUNT',
      message: '할인율은 100%를 초과할 수 없습니다',
    };
  } else if (discountType === 'amount' && discountValue > 100000) {
    return {
      valid: false,
      error: 'INVALID_DISCOUNT',
      message: '할인 금액은 100,000원을 초과할 수 없습니다',
    };
  }
  return { valid: true, error: null, message: '' };
};

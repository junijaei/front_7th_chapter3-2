import {
  addItemToCart,
  calculateCartTotal,
  findItemFromCartById,
  getRemainingStock,
  removeItemFromCart,
  updateItemQuantity,
  validateAddCartItem,
  validateApplyCoupon,
  validateRemoveCartItem,
  validateUpdateCartItemQuantity,
} from '@/models/cart';
import { CartItem, CartValidation, Coupon, Product } from '@/types';
import { useLocalStorage } from '@/utils/hooks/useLocalStorage';
import { useCallback, useMemo, useState } from 'react';

export function useCart() {
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  /**
   * 새 상품을 장바구니에 추가
   * - 상품 재고 검증
   * - 이미 있으면 수량 +1, 없으면 새로 추가
   */
  const addToCart = useCallback(
    (product: Product): CartValidation => {
      const validation = validateAddCartItem(cart, product);
      if (!validation.valid) {
        return validation;
      }

      setCart((prevCart) => {
        const existingItem = findItemFromCartById(prevCart, product.id);
        if (existingItem) {
          return updateItemQuantity(
            prevCart,
            product.id,
            existingItem.quantity + 1
          );
        }
        return addItemToCart(prevCart, product);
      });

      return validation;
    },
    [cart, setCart]
  );

  /**
   * 장바구니에서 상품 삭제
   * - 상품 존재 여부 검증
   */
  const removeFromCart = useCallback(
    (productId: string): CartValidation => {
      const validation = validateRemoveCartItem(cart, productId);
      if (!validation.valid) {
        return validation;
      }

      setCart((prevCart) => removeItemFromCart(prevCart, productId));
      return validation;
    },
    [cart, setCart]
  );

  /**
   * 장바구니 상품의 수량 변경
   * - 0 이하면 삭제
   * - 재고 범위 내에서 수량 변경
   */
  const updateQuantity = useCallback(
    (productId: string, newQuantity: number): CartValidation => {
      const validation = validateUpdateCartItemQuantity(
        cart,
        productId,
        newQuantity
      );
      if (!validation.valid) {
        return validation;
      }

      // validation이 성공이면 수량이 0 이하인 경우 삭제로 이미 처리됨
      if (newQuantity > 0) {
        setCart((prevCart) =>
          updateItemQuantity(prevCart, productId, newQuantity)
        );
      } else {
        setCart((prevCart) => removeItemFromCart(prevCart, productId));
      }

      return validation;
    },
    [cart, setCart]
  );

  /**
   * 쿠폰 적용
   * - 최소 구매 금액 검증 (percentage 쿠폰)
   */
  const applyCoupon = useCallback(
    (coupon: Coupon): CartValidation => {
      const validation = validateApplyCoupon(cart, coupon);
      if (!validation.valid) {
        return validation;
      }

      setSelectedCoupon(coupon);
      return validation;
    },
    [cart]
  );

  /**
   * 장바구니 비우기
   */
  const clearCart = useCallback(() => {
    setCart([]);
    setSelectedCoupon(null);
  }, [setCart]);

  // 계산된 값들
  const totals = useMemo(() => {
    return calculateCartTotal(cart, selectedCoupon);
  }, [cart, selectedCoupon]);

  const totalItemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return {
    cart,
    selectedCoupon,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    clearCart,
    totals,
    totalItemCount,
    getRemainingStock,
  };
}

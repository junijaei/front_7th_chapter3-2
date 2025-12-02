// TODO: 상품 관리 Hook
// 힌트:
// 1. 상품 목록 상태 관리 (localStorage 연동 고려)
// 2. 상품 CRUD 작업
// 3. 재고 업데이트
// 4. 할인 규칙 추가/삭제
//
// 반환할 값:
// - products: 상품 배열
// - updateProduct: 상품 정보 수정
// - addProduct: 새 상품 추가
// - updateProductStock: 재고 수정
// - addProductDiscount: 할인 규칙 추가
// - removeProductDiscount: 할인 규칙 삭제

import {
  addDiscountToList,
  addProductToList,
  removeDiscountFromList,
  removeProductInList,
  updateProductInList,
  updateStockInList,
} from '@/models/product';
import { Discount, Product } from '@/types';
import { useLocalStorage } from '@/utils/hooks/useLocalStorage';
import { useCallback } from 'react';

const initialProducts: Product[] = [
  {
    id: 'p1',
    name: '상품1',
    price: 10000,
    stock: 20,
    discounts: [
      { quantity: 10, rate: 0.1 },
      { quantity: 20, rate: 0.2 },
    ],
    description: '최고급 품질의 프리미엄 상품입니다.',
  },
  {
    id: 'p2',
    name: '상품2',
    price: 20000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.15 }],
    description: '다양한 기능을 갖춘 실용적인 상품입니다.',
    isRecommended: true,
  },
  {
    id: 'p3',
    name: '상품3',
    price: 30000,
    stock: 20,
    discounts: [
      { quantity: 10, rate: 0.2 },
      { quantity: 30, rate: 0.25 },
    ],
    description: '대용량과 고성능을 자랑하는 상품입니다.',
  },
];

export function useProducts() {
  const [products, setProducts] = useLocalStorage<Product[]>(
    'products',
    initialProducts
  );

  const addProduct = useCallback((newProduct: Omit<Product, 'id'>) => {
    setProducts((prev) => addProductToList(prev, newProduct));
  }, []);

  const updateProduct = useCallback((product: Partial<Product>) => {
    setProducts((prev) => updateProductInList(prev, product));
  }, []);

  const deleteProduct = useCallback((productId: string) => {
    setProducts((prev) => removeProductInList(prev, productId));
  }, []);

  const updateProductStock = useCallback((productId: string, stock: number) => {
    setProducts((prev) => updateStockInList(prev, productId, stock));
  }, []);

  const addProductDiscount = useCallback(
    (productId: string, discount: Discount) => {
      setProducts((prev) => addDiscountToList(prev, productId, discount));
    },
    []
  );

  const removeProductDiscount = useCallback(
    (productId: string, discount: Discount) => {
      setProducts((prev) => removeDiscountFromList(prev, productId, discount));
    },
    []
  );

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateProductStock,
    addProductDiscount,
    removeProductDiscount,
  };
}

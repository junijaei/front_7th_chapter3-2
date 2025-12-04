import {
  addDiscountToList,
  addProductToList,
  removeDiscountFromList,
  removeProductInList,
  updateProductInList,
  updateStockInList,
  validateAddProduct,
  validateRemoveCartItem,
  validateUpdateProduct,
} from '@/models/product';
import { Discount, Product, ProductValidation } from '@/types';
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

  const addProduct = useCallback(
    (newProduct: Omit<Product, 'id'>): ProductValidation => {
      const result = validateAddProduct(products, newProduct);
      if (result.valid) {
        setProducts((prev) => addProductToList(prev, newProduct));
      }
      return result;
    },
    [products, setProducts]
  );

  const updateProduct = useCallback(
    (product: Partial<Product>): ProductValidation => {
      if (!product.id) {
        return {
          valid: false,
          error: 'NOT_FOUND',
          message: '상품 ID가 필요합니다.',
        };
      }
      const result = validateUpdateProduct(products, product.id, product);
      if (result.valid) {
        setProducts((prev) => updateProductInList(prev, product));
      }
      return result;
    },
    [products, setProducts]
  );

  const deleteProduct = useCallback(
    (productId: string): ProductValidation => {
      const result = validateRemoveCartItem(products, productId);
      if (result.valid) {
        setProducts((prev) => removeProductInList(prev, productId));
      }
      return result;
    },
    [products, setProducts]
  );

  const updateProductStock = useCallback(
    (productId: string, stock: number) => {
      setProducts((prev) => updateStockInList(prev, productId, stock));
    },
    [setProducts]
  );

  const addProductDiscount = useCallback(
    (productId: string, discount: Discount) => {
      setProducts((prev) => addDiscountToList(prev, productId, discount));
    },
    [setProducts]
  );

  const removeProductDiscount = useCallback(
    (productId: string, discount: Discount) => {
      setProducts((prev) => removeDiscountFromList(prev, productId, discount));
    },
    [setProducts]
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

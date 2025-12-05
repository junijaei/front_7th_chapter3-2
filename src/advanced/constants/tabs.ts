import { CouponsTab } from '@/advanced/features/coupon/ui/CouponsTab';
import { ProductsTab } from '@/advanced/features/product/ui/ProductsTab';

export const ADMIN_TABS = [
  { id: 'products', label: '상품 관리', component: ProductsTab },
  { id: 'coupons', label: '쿠폰 관리', component: CouponsTab },
] as const;

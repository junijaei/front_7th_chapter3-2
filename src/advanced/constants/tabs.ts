import { TabItem } from '@/shared/hooks';
import { CouponsTab } from '@/features/coupon';
import { ProductsTab } from '@/features/product';

export const ADMIN_TABS: TabItem[] = [
  { id: 'products', label: '상품 관리', component: ProductsTab },
  { id: 'coupons', label: '쿠폰 관리', component: CouponsTab },
];

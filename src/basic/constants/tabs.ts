import { TabItem } from '@/hooks/useTab';
import { CouponsTab } from '@/pages/AdminPage/components/CouponsTab';
import { ProductsTab } from '@/pages/AdminPage/components/ProductsTab';

export const ADMIN_TABS: TabItem[] = [
  { id: 'products', label: '상품 관리', component: ProductsTab },
  { id: 'coupons', label: '쿠폰 관리', component: CouponsTab },
];

import { AdminPage } from '@/advanced/pages/AdminPage';
import { ProductsPage } from '@/advanced/pages/ProductsPage';

export const PAGES = [
  { id: 'products', name: '상품 페이지', component: ProductsPage },
  { id: 'admin', name: '쿠폰 관리', component: AdminPage },
] as const;

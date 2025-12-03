import { useFilter } from '@/hooks/useFilter';
import { ProductItem } from '@/pages/ProductsPage/components/ProductItem';
import { CartItem, Product } from '@/types';

export const ProductList = ({
  products,
  cart,
}: {
  products: Product[];
  cart: CartItem[];
}) => {
  const productFilter = (list: Product[], query: string) => {
    return list.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        (product.description &&
          product.description.toLowerCase().includes(query.toLowerCase()))
    );
  };
  const { filteredList, query } = useFilter<Product>(products, productFilter);

  return (
    <section>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">전체 상품</h2>
        <div className="text-sm text-gray-600">
          총 {filteredList.length}개 상품
        </div>
      </div>
      {filteredList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            "{query}"에 대한 검색 결과가 없습니다.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredList.map((product) => (
            <ProductItem product={product} cart={cart} />
          ))}
        </div>
      )}
    </section>
  );
};

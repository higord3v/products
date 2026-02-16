import { Product } from "@/types";
import ProductCard from "@/app/components/ProductCard";
import Button from "@/app/components/ui/Button";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  favorites: string[];
  onToggleFavorite: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export default function ProductGrid({
  products,
  isLoading,
  isError,
  onRetry,
  favorites,
  onToggleFavorite,
  onViewDetails,
}: ProductGridProps) {
  // Loading State
  if (isLoading) {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className='bg-white rounded-xl shadow-md h-80 animate-pulse'
          >
            <div className='h-48 bg-gray-200 rounded-t-xl'></div>
            <div className='p-4 space-y-3'>
              <div className='h-4 bg-gray-200 rounded w-3/4'></div>
              <div className='h-3 bg-gray-200 rounded w-1/2'></div>
              <div className='h-6 bg-gray-200 rounded w-1/3 mt-4'></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className='text-center py-20'>
        <div className='text-red-500 mb-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-12 w-12 mx-auto'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>
        <h3 className='text-lg font-medium text-gray-900'>
          Erro ao carregar produtos
        </h3>
        <p className='mt-1 text-gray-500'>
          Não foi possível conectar ao servidor.
        </p>
        <Button
          onClick={onRetry}
          variant='ghost'
          className='mt-4 text-[#7ABA28]'
        >
          Tentar novamente
        </Button>
      </div>
    );
  }

  // Empty State
  if (!isLoading && !isError && products.length === 0) {
    return (
      <div className='text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-12 w-12 mx-auto text-gray-400'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
          />
        </svg>
        <h3 className='mt-2 text-sm font-medium text-gray-900'>
          Nenhum produto encontrado
        </h3>
        <p className='mt-1 text-sm text-gray-500'>
          Tente ajustar seus filtros de busca.
        </p>
      </div>
    );
  }

  // Data State
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {products.map((product, index) => (
        <ProductCard
          key={product.codigo}
          product={product}
          onViewDetails={onViewDetails}
          isFavorite={favorites.includes(product.codigo)}
          onToggleFavorite={onToggleFavorite}
          priority={index < 4}
        />
      ))}
    </div>
  );
}

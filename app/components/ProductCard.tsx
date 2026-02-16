"use client";

import Image from "next/image";

import { Product } from "@/types";
// Requisities said "Tailwind", "React Query", "Zustand".
// It didn't specify an Icon library.
// I should use SVG directly.

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
  priority?: boolean;
}

export default function ProductCard({
  product,
  onViewDetails,
  isFavorite,
  onToggleFavorite,
  priority = false,
}: ProductCardProps) {
  // Format price
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(parseFloat(product.preco));

  return (
    <div className='bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col'>
      <div className='relative h-48 bg-gray-100'>
        {/* EXCLUSIVO Badge */}
        <div className='absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded tracking-wider z-10'>
          EXCLUSIVO!
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product);
          }}
          className='absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors z-10'
          aria-label={
            isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={`h-5 w-5 ${isFavorite ? "text-red-500 fill-current" : "text-gray-400"}`}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
            />
          </svg>
        </button>

        {/* Image */}
        <div className='relative w-full h-full p-4'>
          <Image
            src={product.imagem}
            alt={product.nome}
            fill
            className='object-contain p-4'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            priority={priority}
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
          />
        </div>
      </div>

      <div className='p-4 flex flex-col flex-1'>
        <h3 className='text-gray-800 font-semibold text-lg leading-tight mb-1 line-clamp-2 min-h-[44px]'>
          {product.nome}
        </h3>
        <p className='text-xs text-gray-500 mb-2'>Cód: {product.codigo}</p>

        <div className='mt-auto flex items-center justify-between'>
          <span className='text-xl font-bold text-[#7ABA28]'>
            {formattedPrice}
          </span>
        </div>

        <button
          onClick={() => onViewDetails(product)}
          className='mt-4 w-full bg-[#7ABA28] hover:bg-[#6cba0f] text-white font-bold py-2 px-4 rounded transition-colors text-sm uppercase tracking-wide'
        >
          Confira
        </button>
      </div>
    </div>
  );
}

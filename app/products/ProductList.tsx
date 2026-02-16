"use client";

import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/getProducts";
import { useState, useMemo, useEffect } from "react";
import { Product, UserData } from "@/types";
import ProductCard from "@/app/components/ProductCard";
import { useDebounce } from "@/app/hooks/useDebounce";
import Modal from "@/app/components/Modal";
import Image from "next/image";

interface ProductListProps {
  initialProducts: Product[];
  user: UserData;
  token: string;
}

export default function ProductList({
  initialProducts,
  user: serverUser,
  token: serverToken,
}: ProductListProps) {
  const { token, user, setAuth } = useAuthStore();

  // Hydrate store if needed
  useEffect(() => {
    if (!token && serverToken) {
      setAuth(serverToken, serverUser);
    }
  }, [serverToken, serverUser, token, setAuth]);

  // Use local state or store state (prefer store but fallback to prop for initial render if store empty)
  const currentUser = user || serverUser;
  const currentToken = token || serverToken;

  // State
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [sortOption, setSortOption] = useState<
    "price-asc" | "price-desc" | "name-asc" | "name-desc"
  >("name-asc");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Load Favorites from LocalStorage on Mount
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Persist Favorites
  const toggleFavorite = (product: Product) => {
    let newFavorites;
    if (favorites.includes(product.codigo)) {
      newFavorites = favorites.filter((id) => id !== product.codigo);
    } else {
      newFavorites = [...favorites, product.codigo];
    }
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  // Fetch Logic
  const {
    data: products = initialProducts,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products", debouncedSearch, currentToken],
    queryFn: () => {
      if (!currentToken) return [];
      const isNumeric = /^\d+$/.test(debouncedSearch);
      return fetchProducts({
        token: currentToken,
        nome_produto: isNumeric ? "" : debouncedSearch,
        codigo_produto: isNumeric ? debouncedSearch : "",
      });
    },
    enabled: !!currentToken,
    initialData: debouncedSearch === "" ? initialProducts : undefined, // Use initial data only for empty search
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Derived State (Filtering, Sorting, Pagination)
  const processedProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by Favorites
    if (showFavoritesOnly) {
      filtered = filtered.filter((p) => favorites.includes(p.codigo));
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortOption === "price-asc")
        return parseFloat(a.preco) - parseFloat(b.preco);
      if (sortOption === "price-desc")
        return parseFloat(b.preco) - parseFloat(a.preco);
      if (sortOption === "name-asc") return a.nome.localeCompare(b.nome);
      if (sortOption === "name-desc") return b.nome.localeCompare(a.nome);
      return 0;
    });

    return filtered;
  }, [products, showFavoritesOnly, favorites, sortOption]);

  const totalPages = Math.ceil(processedProducts.length / itemsPerPage);
  const paginatedProducts = processedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, showFavoritesOnly, sortOption]);

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      {/* Header */}
      <header className='bg-white shadow-sm sticky top-0 z-30'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4'>
          {/* Logo / Brand */}
          <div className='flex-shrink-0 flex items-center'>
            <span className='text-2xl font-bold text-[#7ABA28]'>
              Innovation
            </span>
            <span className='text-2xl font-bold text-gray-700 ml-1 hidden sm:block'>
              Brindes
            </span>
          </div>

          {/* Search Bar */}
          <div className='flex-1 max-w-lg flex gap-2'>
            <div className='relative flex-1'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <svg
                  className='h-5 w-5 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </div>
              <input
                type='text'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Buscar por nome ou código...'
                className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-100 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#7ABA28] focus:border-[#7ABA28] sm:text-sm transition-colors'
              />
            </div>
            <button
              onClick={() => refetch()}
              className='bg-[#7ABA28] hover:bg-[#6cba0f] text-white px-4 py-2 rounded-md font-medium transition-colors'
            >
              Buscar
            </button>
          </div>

          {/* Actions */}
          <div className='flex items-center gap-4'>
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`p-2 rounded-full transition-colors relative ${showFavoritesOnly ? "bg-red-50 text-red-500" : "hover:bg-gray-100 text-gray-600"}`}
              title='Ver Favoritos'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className={`h-6 w-6 ${showFavoritesOnly ? "fill-current" : "fill-none"}`}
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

            <div className='hidden sm:flex flex-col items-end mr-2'>
              <span className='text-sm font-medium text-gray-700'>
                {currentUser?.nome_usuario}
              </span>
              <span className='text-xs text-gray-500'>
                {currentUser?.nome_grupo}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className='text-gray-500 hover:text-red-500 transition-colors'
              title='Sair'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1'>
        {/* Controls Bar */}
        <div className='flex flex-col sm:flex-row justify-between items-center mb-6 gap-4'>
          <h1 className='text-2xl font-bold text-gray-800'>
            {showFavoritesOnly ? "Seus Favoritos" : "Produtos em Destaque"}
          </h1>

          <div className='flex items-center gap-2'>
            <label htmlFor='sort' className='text-sm font-medium text-gray-700'>
              Ordernar por:
            </label>
            <select
              id='sort'
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className='block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#7ABA28] focus:border-[#7ABA28] sm:text-sm rounded-md'
            >
              <option value='name-asc'>Nome (A-Z)</option>
              <option value='name-desc'>Nome (Z-A)</option>
              <option value='price-asc'>Menor Preço</option>
              <option value='price-desc'>Maior Preço</option>
            </select>
          </div>
        </div>

        {/* Content Status */}
        {isLoading && (
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
        )}

        {isError && (
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
            <button
              onClick={() => refetch()}
              className='mt-4 text-[#7ABA28] hover:underline'
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && paginatedProducts.length === 0 && (
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
        )}

        {/* Product Grid */}
        {!isLoading && !isError && paginatedProducts.length > 0 && (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {paginatedProducts.map((product, index) => (
                <ProductCard
                  key={product.codigo}
                  product={product}
                  onViewDetails={setSelectedProduct}
                  isFavorite={favorites.includes(product.codigo)}
                  onToggleFavorite={toggleFavorite}
                  priority={index < 4}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className='mt-8 flex justify-center items-center gap-2'>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className='p-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50'
                >
                  Anterior
                </button>
                <span className='text-sm text-gray-700'>
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className='p-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50'
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Product Detail Modal */}
      <Modal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        title={selectedProduct?.nome}
      >
        {selectedProduct && (
          <div className='flex flex-col md:flex-row gap-6'>
            <div className='md:w-1/2 aspect-square relative bg-gray-100 rounded-lg overflow-hidden'>
              <div className='relative w-full h-full p-4'>
                <Image
                  src={selectedProduct.imagem}
                  alt={selectedProduct.nome}
                  fill
                  className='object-contain'
                  sizes='(max-width: 768px) 100vw, 50vw'
                />
              </div>
            </div>
            <div className='md:w-1/2 space-y-4'>
              <div className='text-sm text-gray-500'>
                <p>Referência: {selectedProduct.referencia}</p>
                <p>Código: {selectedProduct.codigo}</p>
                <p>Categoria: {selectedProduct.codigo_categoria}</p>
              </div>

              <div className='text-2xl font-bold text-[#7ABA28]'>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(parseFloat(selectedProduct.preco))}
              </div>

              <div className='prose prose-sm text-gray-600'>
                <h4 className='font-semibold text-gray-900'>Descrição</h4>
                <p>{selectedProduct.descricao}</p>
              </div>

              <button className='w-full py-3 bg-[#7ABA28] hover:bg-[#6cba0f] text-white font-bold rounded-lg transition-colors'>
                Adicionar ao Carrinho (Simulação)
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

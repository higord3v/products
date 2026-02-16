import { SortOption } from "@/types";

interface ProductFiltersProps {
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

export default function ProductFilters({
  showFavoritesOnly,
  onToggleFavorites,
  sortOption,
  onSortChange,
}: ProductFiltersProps) {
  return (
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
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className='block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#7ABA28] focus:border-[#7ABA28] sm:text-sm rounded-md'
        >
          <option value='name-asc'>Nome (A-Z)</option>
          <option value='name-desc'>Nome (Z-A)</option>
          <option value='price-asc'>Menor Preço</option>
          <option value='price-desc'>Maior Preço</option>
        </select>
      </div>
    </div>
  );
}

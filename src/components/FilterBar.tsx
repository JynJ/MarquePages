import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import { FilterOptions, Category } from '../types';

interface FilterBarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  categories: Category[];
  allTags: string[];
}

export const FilterBar = ({ filters, onFiltersChange, categories, allTags }: FilterBarProps) => {
  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    updateFilter('tags', newTags);
  };

  const toggleSortOrder = () => {
    updateFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Recherche */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Catégorie */}
        <select
          value={filters.category}
          onChange={(e) => updateFilter('category', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.icon} {category.name}
            </option>
          ))}
        </select>

        {/* Tri */}
        <div className="flex gap-2">
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value as any)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="title">Titre</option>
            <option value="createdAt">Date de création</option>
            <option value="updatedAt">Date de modification</option>
            <option value="url">URL</option>
          </select>
          <button
            onClick={toggleSortOrder}
            className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            title={`Trier ${filters.sortOrder === 'asc' ? 'décroissant' : 'croissant'}`}
          >
            {filters.sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
          </button>
        </div>

        {/* Filtres avancés */}
        <div className="flex gap-2">
          <button
            onClick={() => updateFilter('favoritesOnly', !filters.favoritesOnly)}
            className={`px-3 py-2 rounded-md text-sm ${
              filters.favoritesOnly
                ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                : 'bg-gray-100 text-gray-700 border border-gray-300'
            }`}
          >
            ⭐ Favoris
          </button>
        </div>
      </div>

      {/* Tags */}
      {allTags.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Filter size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtrer par tags :</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.tags.includes(tag)
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-300'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tags sélectionnés */}
      {filters.tags.length > 0 && (
        <div className="mt-2">
          <span className="text-sm text-gray-600">
            Tags sélectionnés : {filters.tags.join(', ')}
          </span>
          <button
            onClick={() => updateFilter('tags', [])}
            className="ml-2 text-sm text-blue-600 hover:text-blue-800"
          >
            Effacer
          </button>
        </div>
      )}
    </div>
  );
};

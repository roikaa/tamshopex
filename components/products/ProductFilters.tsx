// components/products/ProductFilters.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Category {
  id: string;
  name: string;
}

interface ProductFiltersProps {
  categories?: Category[];
}

export default function ProductFilters({ categories = [] }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State for all filter values
  const [filters, setFilters] = useState({
    categoryId: searchParams.get('categoryId') || '',
    minPrice: parseInt(searchParams.get('minPrice') || '0'),
    maxPrice: parseInt(searchParams.get('maxPrice') || '1000'),
    inStock: searchParams.get('inStock') === 'true',
  });

  // Update URL when filters change
  const updateFilters = (newFilters: Partial<typeof filters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    // Create URL search params
    const params = new URLSearchParams(searchParams.toString());
    
    // Update or remove category filter
    if (updatedFilters.categoryId) {
      params.set('categoryId', updatedFilters.categoryId);
    } else {
      params.delete('categoryId');
    }
    
    // Update or remove price filters
    if (updatedFilters.minPrice > 0) {
      params.set('minPrice', updatedFilters.minPrice.toString());
    } else {
      params.delete('minPrice');
    }
    
    if (updatedFilters.maxPrice < 1000) {
      params.set('maxPrice', updatedFilters.maxPrice.toString());
    } else {
      params.delete('maxPrice');
    }
    
    // Update or remove stock filter
    if (updatedFilters.inStock) {
      params.set('inStock', 'true');
    } else {
      params.delete('inStock');
    }
    
    // Update URL
    const newUrl = params.toString() ? `/products?${params.toString()}` : '/products';
    router.push(newUrl);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      categoryId: '',
      minPrice: 0,
      maxPrice: 1000,
      inStock: false,
    });
    router.push('/products');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        {categories.length > 0 && (
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              value={filters.categoryId}
              onChange={(e) => updateFilters({ categoryId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Price Range Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Price Range: ${filters.minPrice} - ${filters.maxPrice}
          </label>
          
          {/* Min Price Slider */}
          <div className="mb-4">
            <label className="block text-xs text-gray-500 mb-1">Minimum Price</label>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={filters.minPrice}
              onChange={(e) => {
                const newMin = parseInt(e.target.value);
                updateFilters({ 
                  minPrice: newMin,
                  maxPrice: Math.max(newMin, filters.maxPrice)
                });
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>$0</span>
              <span>$1000</span>
            </div>
          </div>

          {/* Max Price Slider */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Maximum Price</label>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={filters.maxPrice}
              onChange={(e) => {
                const newMax = parseInt(e.target.value);
                updateFilters({ 
                  maxPrice: newMax,
                  minPrice: Math.min(filters.minPrice, newMax)
                });
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>$0</span>
              <span>$1000</span>
            </div>
          </div>
        </div>

        {/* In Stock Filter */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => updateFilters({ inStock: e.target.checked })}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700">In Stock Only</span>
          </label>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 0 2px 0 #555;
          transition: background .15s ease-in-out;
        }

        .slider::-webkit-slider-thumb:hover {
          background: #2563eb;
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 2px 0 #555;
        }

        .slider::-moz-range-thumb:hover {
          background: #2563eb;
        }

        .slider::-webkit-slider-track {
          height: 8px;
          border-radius: 5px;
          background: #e5e7eb;
        }

        .slider::-moz-range-track {
          height: 8px;
          border-radius: 5px;
          background: #e5e7eb;
          border: none;
        }
      `}</style>
    </div>
  );
}

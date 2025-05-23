// components/products/ProductGrid.tsx
// components/products/ProductGrid.tsx
"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define TypeScript interface for Product
interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  stock: number;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  total: number;
}

interface ProductGridProps {
  searchQuery?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

// Define sort options that match the API
type SortOption = 'relevance' | 'price_asc' | 'price_desc' | 'newest' | 'name_asc' | 'name_desc';

export default function ProductGrid({
  searchQuery,
  categoryId,
  minPrice,
  maxPrice,
  inStock
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [retryCount, setRetryCount] = useState<number>(0);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryId, minPrice, maxPrice, inStock, sortBy]);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Build query parameters
        const params = new URLSearchParams();
        params.append('page', currentPage.toString());
        params.append('limit', '12');
        params.append('sortBy', sortBy);
        
        if (searchQuery) params.append('search', searchQuery);
        if (categoryId) params.append('categoryId', categoryId);
        if (minPrice !== undefined) params.append('minPrice', minPrice.toString());
        if (maxPrice !== undefined) params.append('maxPrice', maxPrice.toString());
        if (inStock) params.append('inStock', 'true');

        const response = await fetch(`/api/products?${params.toString()}`, {
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Server response:', response.status, errorData);
          throw new Error(errorData.message || `Failed to fetch products: ${response.status} ${response.statusText}`);
        }
        
        const data: ApiResponse = await response.json();
        
        // Validate the response structure
        if (!data.products || !Array.isArray(data.products)) {
          console.error('Unexpected data format:', data);
          throw new Error('Received invalid data format from server');
        }
        
        setProducts(data.products);
        setPagination(data.pagination);
        setRetryCount(0); // Reset retry count on success
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(`Error loading products. ${errorMessage}`);
        console.error('Error fetching products:', err);
        
        // Retry logic for non-404 errors
        if (retryCount < 3 && !errorMessage.includes('404')) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 2000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, sortBy, searchQuery, categoryId, minPrice, maxPrice, inStock, retryCount]);

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    if (page < 1 || page > pagination.totalPages) return;
    setCurrentPage(page);
  };

  // Retry fetching products
  const handleRetry = () => {
    setError(null);
    setRetryCount(prev => prev + 1);
  };

  // Format price in DZD
   const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'DZD'
    }).format(price);
  };

  // Display loading state
  if (loading) {
    return (
      <div className="space-y-6">
        {/* Loading header */}
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
          <div className="h-10 bg-gray-300 rounded w-48 animate-pulse"></div>
        </div>
        
        {/* Loading grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-lg overflow-hidden animate-pulse">
              <div className="aspect-square bg-gray-300"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Display error message
  if (error) {
    return (
      <div className="text-center p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Products</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={handleRetry} 
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Generate pagination numbers
  const generatePageNumbers = () => {
    const pages = [];
    const { totalPages, page: currentPage } = pagination;
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 4) {
        pages.push('...');
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 3) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="space-y-6">
      {/* Header with results count and sort */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {products.length} of {pagination.total} products
          {searchQuery && ` for "${searchQuery}"`}
        </p>
        <select 
          className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="relevance">Most Relevant</option>
          <option value="newest">Newest First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name: A to Z</option>
          <option value="name_desc">Name: Z to A</option>
        </select>
      </div>
      
      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">
            {searchQuery 
              ? `No products match your search for "${searchQuery}"`
              : "No products match your current filters"
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200"
            >
              <div className="aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden">
                {product.imageUrl ? (
                  <Image 
                    src={product.imageUrl} 
                    alt={product.name} 
                    width={300} 
                    height={300} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm">No image</span>
                  </div>
                )}
                
                {/* Overlay badges */}
                {product.stock === 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    Out of Stock
                  </div>
                )}
                
                <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  {product.category.name}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {product.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-blue-600">
                    {formatPrice(product.price)}
                  </p>
                  <span className="text-sm text-gray-500">
                    Stock: {product.stock}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={!pagination.hasPrevPage}
            className={`px-3 py-2 border rounded-md transition-colors ${
              !pagination.hasPrevPage
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>
          
          {generatePageNumbers().map((pageNum, index) => (
            pageNum === '...' ? (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
                ...
              </span>
            ) : (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum as number)}
                className={`px-3 py-2 border rounded-md transition-colors ${
                  currentPage === pageNum
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            )
          ))}
          
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={!pagination.hasNextPage}
            className={`px-3 py-2 border rounded-md transition-colors ${
              !pagination.hasNextPage
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

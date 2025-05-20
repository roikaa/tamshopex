// components/products/ProductGrid.tsx

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

// Define sort options
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 8;
  const [retryCount, setRetryCount] = useState<number>(0);

  // Fetch products from the API with retry functionality
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products', {
          // Adding cache control to prevent stale responses
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        
        if (!response.ok) {
          const errorText = await response.text().catch(() => 'Unknown error');
          console.error('Server response:', response.status, errorText);
          throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Validate that we received an array
        if (!Array.isArray(data)) {
          console.error('Unexpected data format:', data);
          throw new Error('Received invalid data format from server');
        }
        
        setProducts(data);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(`Error loading products. ${errorMessage}`);
        console.error('Error fetching products:', err);
        
        // If we've had fewer than 3 retries and this isn't a 404 error
        // (which suggests the endpoint doesn't exist), try again after a delay
        if (retryCount < 3 && !(errorMessage.includes('404'))) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 2000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [retryCount]);

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
  };

  // Sort products based on selected option
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      default:
        // Featured - could be based on some other criteria,
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });

  // Paginate products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Pagination handlers
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Retry fetching products
  const handleRetry = () => {
    setError(null);
    setRetryCount(prev => prev + 1);
  };

  // Display loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Display error message
  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>{error}</p>
        <button 
          onClick={handleRetry} 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  // Generate array of page numbers to display
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">Showing {products.length} products</p>
        <select 
          className="border border-gray-300 rounded-md px-3 py-1"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>
      
      {currentProducts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                {product.imageUrl ? (
                  <Image 
                    src={product.imageUrl} 
                    alt={product.name} 
                    width={300} 
                    height={300} 
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <p className="text-gray-400">No image available</p>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <p className="text-blue-600 mt-1">{product.price} DA</p>
                {product.stock === 0 && (
                  <p className="text-red-500 text-sm mt-1">Out of stock</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
      
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded-md ${
                currentPage === 1
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => goToPage(number)}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === number
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {number}
              </button>
            ))}
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded-md ${
                currentPage === totalPages
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

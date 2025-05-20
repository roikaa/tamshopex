
// app/products/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  id: string | number;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  stock?: number;
  category: string;
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${params.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Product not found');
          } else {
            throw new Error('Failed to fetch product');
          }
          return;
        }

        const productData = await response.json();
        setProduct(productData);
      } catch (err) {
        setError('Error loading product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    console.log('Adding product to cart:', product?.id);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">{error}</h1>
          <button 
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center overflow-hidden">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <p className="text-gray-500">No Image Available</p>
          )}
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-xl text-gray-600 mb-4">
            ${typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}
          </p>
          
          {product.stock !== undefined && (
            <p className={`text-sm mb-4 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </p>
          )}
          
          <div className="border-t border-b border-gray-200 py-4 my-6">
            <p className="text-gray-700">
              {product.description || 'No description available.'}
            </p>
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 rounded-md mb-4 ${
              product.stock === 0 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
          
        </div>
      </div>
    </div>
  );
};

'use client';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

interface Product {
  id: string | number;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  stock?: number;
  category: string;
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the params promise using React.use()
  const resolvedParams = use(params);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  
  const router = useRouter();
  // Replace this with your actual auth state
  // const { user } = useAuth(); // Or however you get the user
  const user = null; // Set this to your actual user object when logged in
  
  const { addToCart, getCartItem, cartCount } = useCart(user?.id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${resolvedParams.id}`);
        
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
  }, [resolvedParams.id]);

  // Get current cart item for this product
  const cartItem = product ? getCartItem(product.id.toString()) : null;
  const currentCartQuantity = cartItem ? cartItem.quantity : 0;
  const maxAvailable = product ? (product.stock || 0) - currentCartQuantity : 0;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= maxAvailable) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (!product || quantity <= 0 || quantity > maxAvailable) return;

    try {
      setAddingToCart(true);
      await addToCart(product.id.toString(), quantity);
      
      // Show success state
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
      
      // Reset quantity to 1
      setQuantity(1);
    } catch (error) {
      console.error('Failed to add to cart - Full error:', error);
      
      // Show more specific error message
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to add item to cart: ${errorMessage}`);
    } finally {
      setAddingToCart(false);
    }
  };

  const goToCart = () => {
    router.push('/cart');
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
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const isOutOfStock = (product.stock || 0) <= 0;
  const isMaxQuantityInCart = maxAvailable <= 0;

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
          
          <p className="text-2xl font-bold text-blue-600 mb-4">
            {typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)} DA
          </p>
          
          <div className="mb-4">
            {product.stock !== undefined && (
              <>
                <p className={`text-sm mb-2 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </p>
                {currentCartQuantity > 0 && (
                  <p className="text-sm text-blue-600 mb-2">
                    {currentCartQuantity} already in cart
                  </p>
                )}
              </>
            )}
          </div>
          
          <div className="border-t border-b border-gray-200 py-4 my-6">
            <p className="text-gray-700">
              {product.description || 'No description available.'}
            </p>
          </div>

          {/* Quantity Selector */}
          {!isOutOfStock && !isMaxQuantityInCart && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="h-4 w-4" />
                </button>
                
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= maxAvailable}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4" />
                </button>
                
                <span className="text-sm text-gray-500">
                  Max: {maxAvailable}
                </span>
              </div>
            </div>
          )}
          
          {/* Add to Cart Button */}
          <div className="space-y-3">
            <button 
              onClick={handleAddToCart}
              disabled={isOutOfStock || isMaxQuantityInCart || addingToCart || quantity <= 0}
              className={`w-full py-3 px-4 rounded-md font-medium transition-colors flex items-center justify-center space-x-2 ${
                isOutOfStock || isMaxQuantityInCart
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : addedToCart
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {addingToCart ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Adding to Cart...</span>
                </>
              ) : addedToCart ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  <span>
                    {isOutOfStock 
                      ? 'Out of Stock' 
                      : isMaxQuantityInCart
                      ? 'Maximum Quantity in Cart'
                      : `Add ${quantity} to Cart`
                    }
                  </span>
                </>
              )}
            </button>

            {/* View Cart Button */}
            {cartCount > 0 && (
              <button
                onClick={goToCart}
                className="w-full py-3 px-4 border-2 border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors font-medium"
              >
                View Cart ({cartCount} items)
              </button>
            )}
          </div>

          {/* Stock Warning */}
          {product.stock !== undefined && product.stock > 0 && product.stock <= 5 && (
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-md">
              <p className="text-sm text-orange-800">
                ⚠️ Only {product.stock} left in stock!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

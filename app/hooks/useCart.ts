import { useState, useEffect, useCallback } from 'react';

interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string | null;
  stock: number;
  category: {
    name: string;
  };
}

interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

interface Cart {
  id: string;
  items: CartItem[];
  total: string;
}

export function useCart(userId: string) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart data
  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      
      const response = await fetch(`/api/cart?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
        setCartCount(data.cart.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0));
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Add item to cart
  const addToCart = useCallback(async (productId: string, quantity: number = 1) => {
    try {
      console.log('Adding to cart:', { productId, quantity, userId });

      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity,
          userId,
        }),
      });

      console.log('Cart API response status:', response.status);

      if (response.ok) {
        await fetchCart();
        return true;
      } else {
        const errorData = await response.json();
        console.error('Cart API error response:', errorData);
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error in addToCart function:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error - check if your API is running');
      }
      throw error;
    }
  }, [userId, fetchCart]);

  // Update item quantity
  const updateQuantity = useCallback(async (cartItemId: string, quantity: number) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItemId,
          quantity,
        }),
      });

      if (response.ok) {
        await fetchCart();
        return true;
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  }, [fetchCart]);

  // Remove item from cart
  const removeItem = useCallback(async (cartItemId: string) => {
    try {
      const response = await fetch(`/api/cart?cartItemId=${cartItemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchCart();
        return true;
      } else {
        throw new Error('Failed to remove item');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      throw error;
    }
  }, [fetchCart]);

  // Clear cart
  const clearCart = useCallback(async () => {
    try {
      const response = await fetch(`/api/cart/clear?userId=${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchCart();
        return true;
      } else {
        throw new Error('Failed to clear cart');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }, [userId, fetchCart]);

  // Get cart item by product ID
  const getCartItem = useCallback((productId: string) => {
    return cart?.items.find(item => item.product.id === productId) || null;
  }, [cart]);

  // Initialize cart on mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return {
    cart,
    cartCount,
    loading,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    getCartItem,
    fetchCart,
  };
}

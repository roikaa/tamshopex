// components/layout/Header.tsx
// components/layout/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../../app/hooks/useCart';

const categories = [
  { name: 'Electronics', href: '/products?category=electronics' },
  { name: 'Clothing', href: '/products?category=clothing' },
  { name: 'Home & Kitchen', href: '/products?category=home-kitchen' },
  { name: 'Books', href: '/products?category=books' },
  { name: 'Sports', href: '/products?category=sports' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Replace this with your actual auth state
  const user = null; // Set this to your actual user object when logged in
  const { cartCount } = useCart(user?.id);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="font-bold text-2xl text-blue-600">
              TamShopEx
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600">
              All Products
            </Link>
                        <Link href="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
             <Link href="/search" className="text-gray-500 hover:text-blue-600">
              <Search size={20} />
            </Link>
           

            {/* User */}
            <Link href="/signin" className="text-gray-500 hover:text-blue-600">
              <User size={20} />
            </Link>

            {/* Cart */}
            <Link href="/cart" className="text-gray-500 hover:text-blue-600 relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-500 hover:text-blue-600"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl flex flex-col">
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="font-semibold text-lg">Menu</h2>
              <button onClick={() => setIsMenuOpen(false)}>
                <X size={24} className="text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full border border-gray-300 rounded-md py-2 px-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
              <nav className="space-y-6">
                <div>
                  <Link
                    href="/"
                    className="block py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                </div>
                <div>
                  <Link
                    href="/products"
                    className="block py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    All Products
                  </Link>
                </div>
                <div>
                  <p className="font-semibold mb-2">Categories</p>
                  <div className="ml-4 space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="block py-1 text-gray-700 hover:text-blue-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <Link
                    href="/about"
                    className="block py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                </div>
                <div>
                  <Link
                    href="/contact"
                    className="block py-2 text-gray-700 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
              </nav>
            </div>
            <div className="p-4 border-t">
              <div className="flex justify-between">
                <Link
                  href="/account"
                  className="text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Account
                </Link>
                <Link
                  href="/cart"
                  className="text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cart ({cartCount})
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

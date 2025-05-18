// components/layout/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
//import { useCart } from '../cart/CartProvider';
//import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';

export default function Header() {
//  const { openCart, itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="rounded-md p-1 hover:bg-gray-100 md:hidden"
          aria-label="Open menu"
        >
          menu
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative h-8 w-8 mr-2">
            <Image
              src="/window.svg"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold text-blue-600">ShopEx</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link href="/" className="font-medium hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/Loding" className="font-medium hover:text-blue-600">
                Products
              </Link>
            </li>
            <li>
              <Link href="/categories" className="font-medium hover:text-blue-600">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/about" className="font-medium hover:text-blue-600">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="font-medium hover:text-blue-600">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="rounded-md p-1 hover:bg-gray-100"
            aria-label="Search"
          >
            Search

          </button>
          
          <Link href="/account" className="rounded-md p-1 hover:bg-gray-100">
            user
          </Link>
          
          <button
            className="relative rounded-md p-1 hover:bg-gray-100"
          >
          cart
          </button>
        </div>
      </div>

      {/* Search Bar - Conditional Render */}
      {isSearchOpen && (
        <div className="border-t border-gray-200 py-4">
          <div className="mx-auto max-w-3xl px-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu - Modal */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div 
            className="fixed inset-0 bg-black/30"
            onClick={() => setIsMenuOpen(false)}
          />
          
          <div className="relative w-4/5 max-w-sm bg-white">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                  <div className="relative h-8 w-8 mr-2">
                    <Image
                      src="/api/placeholder/32/32"
                      alt="Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xl font-bold text-blue-600">ShopEx</span>
                </Link>
                
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full p-1 hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  X
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-2 px-4">
                  <li>
                    <Link 
                      href="/" 
                      className="block py-2 font-medium hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/products" 
                      className="block py-2 font-medium hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/categories" 
                      className="block py-2 font-medium hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/about" 
                      className="block py-2 font-medium hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/contact" 
                      className="block py-2 font-medium hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

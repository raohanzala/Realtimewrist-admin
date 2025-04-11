import React, { useState } from 'react';
import { FaShoppingCart, FaUserCircle, FaSearch } from 'react-icons/fa';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-black text-white py-5 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-10">

        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img src="/images/logo.png" alt="Logo" className="h-12 w-auto" />
          <span className="text-3xl font-bold text-gold">MartStore</span>
        </div>

        {/* Navigation Links and Dropdowns */}
        <div className="hidden md:flex items-center space-x-8 text-lg font-semibold">
          <a href="/" className="hover:text-gold transition duration-300">Home</a>
          <div className="relative">
            <button className="hover:text-gold transition duration-300">
              Shop
            </button>
            <div className="absolute left-0 mt-2 w-40 bg-white text-black shadow-lg rounded-lg hidden group-hover:block">
              <a href="/shop/men" className="block px-4 py-2 hover:bg-gray-100">Men</a>
              <a href="/shop/women" className="block px-4 py-2 hover:bg-gray-100">Women</a>
              <a href="/shop/kids" className="block px-4 py-2 hover:bg-gray-100">Kids</a>
              <a href="/shop/accessories" className="block px-4 py-2 hover:bg-gray-100">Accessories</a>
            </div>
          </div>
          <a href="/about" className="hover:text-gold transition duration-300">About</a>
          <a href="/contact" className="hover:text-gold transition duration-300">Contact</a>
        </div>

        {/* Search Bar (Mobile View) */}
        <div className="relative md:hidden flex items-center">
          <button
            className="text-white"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <FaSearch size={24} />
          </button>
          {isSearchOpen && (
            <div className="absolute top-0 left-0 w-full bg-white text-black p-2 rounded-lg shadow-lg">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-lg border-none focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex items-center bg-gray-800 rounded-full px-6 py-2 max-w-md w-full">
          <input
            type="text"
            placeholder="Search for products..."
            className="bg-transparent text-white outline-none w-full"
          />
          <button className="text-white">
            <FaSearch size={20} />
          </button>
        </div>

        {/* User and Cart Icons */}
        <div className="flex items-center space-x-6">
          <button className="text-white hover:text-gold transition duration-300">
            <FaUserCircle size={28} />
          </button>
          <button className="relative text-white hover:text-gold transition duration-300">
            <FaShoppingCart size={28} />
            <span className="absolute top-0 right-0 text-xs bg-red-600 text-white rounded-full px-1">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

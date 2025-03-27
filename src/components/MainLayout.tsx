import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { RootState } from '../redux/store';
import ProductList from './ProductList';
import Cart from './Cart';
import Logo from './Logo';
import Dashboard from './Dashboard';

const MainLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [isSideCartOpen, setIsSideCartOpen] = useState(false);
  const location = useLocation(); // Añadir esta línea
  const cartItems = useSelector((state: RootState) => state.cart.cart?.items || []);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleSideCart = () => {
    setIsSideCartOpen(!isSideCartOpen);
  };

  // Determinar si el carrito debe mostrarse
  const showCart = location.pathname !== '/dashboard';

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Logo />
            <Link 
              to="/dashboard" 
              className="text-gray-700 hover:text-primary transition"
            >
              Dashboard
            </Link>
          </div>
          {showCart && ( // Añadir condición
            <div 
              onClick={toggleSideCart} 
              className="relative cursor-pointer hover:bg-gray-100 p-2 rounded-full transition"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-gray-700" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto px-4">
        {children || <ProductList /> || <Dashboard />}
      </main>

      {/* Side Cart - Solo se muestra si showCart es true */}
      {showCart && (
        <div 
          className={`fixed top-0 right-0 w-96 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 
            ${isSideCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <button 
                onClick={toggleSideCart} 
                className="text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
            </div>
            <div className="flex-grow overflow-y-auto">
              <Cart />
            </div>
          </div>
        </div>
      )}

      {/* Cart Overlay - También condicionado */}
      {showCart && isSideCartOpen && (
        <div 
          onClick={toggleSideCart}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}
    </div>
  );
};

export default MainLayout;
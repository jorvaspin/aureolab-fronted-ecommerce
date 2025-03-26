import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Checkout from '../components/Checkout';
import Cart from '../components/Cart';
import Logo from '../components/Logo';

const CheckoutPage: React.FC = () => {
  const [isSideCartOpen, setIsSideCartOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.cart?.items || []);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleSideCart = () => {
    setIsSideCartOpen(!isSideCartOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
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
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow pt-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="w-full">
            <Checkout />
          </div>
          
          {/* Cart Summary */}
          <div className="w-full bg-white shadow-md rounded-lg p-6 h-fit">
            <h2 className="text-2xl font-bold mb-4">Resumen del Pedido</h2>
            <Cart />
          </div>
        </div>
      </main>

      {/* Side Cart Modal (Optional) */}
      {isSideCartOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSideCart}
        >
          <div 
            className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Mi Carrito</h2>
              <button 
                onClick={toggleSideCart} 
                className="text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <Cart />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
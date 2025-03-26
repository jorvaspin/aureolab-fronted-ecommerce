import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux/store';
import { fetchCart, removeFromCart } from '../redux/cartSlice';

const Cart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, loading, error } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // formateamos el precio a dos decimales
  const formatPrice = (price: number | string): string => {
    const numPrice = Number(price);
    return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2);
  };

  // calculamos el total del carrito
  const calculateTotal = () => {
    return cart?.items.reduce((total, item) => 
      total + (Number(item.product.price) * item.quantity), 0) || 0;
  };

  // se elimina un item del carrito
  const handleRemoveItem = async (itemId: number) => {
    try {
      await dispatch(removeFromCart(itemId));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  // chequeamos si estamos en la página de checkout
  const isCheckoutPage = location.pathname === '/checkout';

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        {error}
      </div>
    );
  }

  return (
    <>
      {cart?.items.length === 0 ? (
        <p className="text-center text-gray-600">Tu carrito está vacío</p>
      ) : (
        <>
          <div>
            {cart?.items.map(item => (
              <div 
                key={item.id} 
                className="flex items-center justify-between py-2 border-b"
              >
                <div className="flex items-center">
                  <img 
                    src={item.product.imageUrl || 'https://i.ibb.co/PZh01MkM/images-q-tbn-ANd9-Gc-TNNLEL-qmm-Le-FR1nx-Juep-FOg-PYfnw-HR56vcw-s.png'} 
                    alt={item.product.name} 
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h3 className="text-md font-bold">{item.product.name}</h3>
                    <p className="text-gray-600">${formatPrice(item.product.price)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="mx-2">Cantidad: {item.quantity}</span>
                  <span className="font-bold mr-4">
                    ${formatPrice(item.product.price * item.quantity)}
                  </span>
                  <button 
                    onClick={() => handleRemoveItem(item.product.id)}
                    className="text-red-500 hover:bg-red-100 p-2 rounded-full transition"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4 text-right">
              <h3 className="text-xl font-bold">
                Total: ${formatPrice(calculateTotal())}
              </h3>
              {!isCheckoutPage && (
                <button 
                  onClick={handleProceedToCheckout}
                  className="mt-2 w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Proceder al Checkout
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
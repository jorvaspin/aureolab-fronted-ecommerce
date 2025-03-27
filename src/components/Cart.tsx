import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux/store';
import { fetchCart, removeFromCart } from '../redux/cartSlice';
import { Trash2, ShoppingCart, Package } from 'lucide-react';
import { formatPrice } from '../utils/formaters';

const Cart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, loading, error } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

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
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <ShoppingCart className="mr-3 text-blue-600" size={28} />
          Mi Carrito
        </h2>
      </div>

      {cart?.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-grow p-6 text-center">
          <Package className="text-gray-400 mb-4" size={64} />
          <p className="text-gray-600 text-lg">El carrito esta vacio</p>
          <p className="text-gray-500 text-sm mb-4">Explore los productos y compre!</p>
        </div>
      ) : (
        <>
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {cart?.items.map(item => (
              <div 
                key={item.id} 
                className="bg-white shadow-sm rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.product.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'}
                    alt={item.product.name} 
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                    <p className="text-gray-500 text-sm">
                      ${formatPrice(item.product.price)} x {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-gray-800">
                    ${formatPrice(item.product.price * item.quantity)}
                  </span>
                  <button 
                    onClick={() => handleRemoveItem(item.product.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-full transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-xl font-bold text-gray-800">
                ${formatPrice(calculateTotal())}
              </span>
            </div>

            {!isCheckoutPage && (
              <button 
                onClick={handleProceedToCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>Checkout</span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
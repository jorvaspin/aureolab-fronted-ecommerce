import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { StripeProvider } from './services/stripeService';
import MainLayout from './components/MainLayout';
import CheckoutPage from './pages/CheckoutPage';
import DashboardPage from './pages/DashboardPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrderCancelPage from './pages/OrderCancelPage';
import axios from 'axios';

const App: React.FC = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;
  
  useEffect(() => {
    const initializeCart = async () => {
      try {
        let cartId = localStorage.getItem('cartId');

        if (!cartId) {
          const response = await axios.get(`${BACKEND_URL}/carts`, {
            withCredentials: true
          });

          cartId = response.data.cart.id;
          localStorage.setItem('cartId', cartId || '');
        }
      } catch (error) {
        console.error('Error inicializando carrito:', error);
      }
    };

    initializeCart();
  }, [BACKEND_URL]);

  return (
    <Provider store={store}>
      <StripeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/order-cancel" element={<OrderCancelPage />} />
          </Routes>
        </Router>
      </StripeProvider>
    </Provider>
  );
};

export default App;
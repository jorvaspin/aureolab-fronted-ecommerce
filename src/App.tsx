import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { StripeProvider } from './services/stripeService';
import MainLayout from './components/MainLayout';
import CheckoutPage from './pages/CheckoutPage';
import DashboardPage from './pages/DashboardPage';
import axios from 'axios';

const App: React.FC = () => {
  useEffect(() => {
    const initializeCart = async () => {
      try {
        let cartId = localStorage.getItem('cartId');

        if (!cartId) {
          const response = await axios.get('http://localhost:3015/api/carts', {
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
  }, []);

  return (
    <Provider store={store}>
      <StripeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </Router>
      </StripeProvider>
    </Provider>
  );
};

export default App;
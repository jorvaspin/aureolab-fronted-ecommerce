import React, { useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { cartService } from '../services/api';
import PaymentCardLogos from './PaymentCardLogos';
import { ShoppingCart } from 'lucide-react';

interface CheckoutForm {
  email: string;
  phone: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

const Checkout: React.FC = () => {
  const stripe = useStripe();
  const { cart } = useSelector((state: RootState) => state.cart);

  const [formData, setFormData] = useState<CheckoutForm>({
    email: '',
    phone: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'email' || name === 'phone') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof CheckoutForm] as object),
          [field]: value
        }
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!cart?.items) {
        throw new Error('El carrito está vacío');
      }

      const checkoutResponse = await cartService.checkout(cart.id);
      window.location.href = checkoutResponse;
    } catch (error) {
      console.error('Checkout error', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-50">
      <div className="container mx-auto px-4 py-0 grid gap-8">
        {/* Payment Details */}
        <div className="bg-white shadow-md rounded-lg">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <ShoppingCart className="mr-3 text-blue-600" size={28} />
              Detalles de Pago
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Información de Contacto</h3>
                <div className="space-y-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 transition duration-300"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Teléfono"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 transition duration-300"
                    required
                  />
                </div>
              </div>

              {/* Billing Address */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Dirección de Facturación</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="billingAddress.street"
                    placeholder="Dirección"
                    value={formData.billingAddress.street}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 transition duration-300"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="billingAddress.city"
                      placeholder="Ciudad"
                      value={formData.billingAddress.city}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 transition duration-300"
                      required
                    />
                    <input
                      type="text"
                      name="billingAddress.state"
                      placeholder="Estado"
                      value={formData.billingAddress.state}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 transition duration-300"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-4 text-center">
              <PaymentCardLogos />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={!stripe || isLoading}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md 
                hover:bg-blue-700 transition duration-300 
                flex items-center justify-center 
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg 
                    className="animate-spin h-5 w-5 mr-3" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    ></circle>
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Procesando...
                </div>
              ) : (
                'Pagar Ahora'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
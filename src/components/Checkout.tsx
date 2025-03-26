import React, { useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import {useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { cartService } from '../services/api';

// definimos la forma de checkout (PUEDE CAMBIAR)
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
  //const dispatch: AppDispatch = useDispatch();
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

  // manejamos el cambio de los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Si es un campo de nivel superior (email o phone)
    if (name === 'email' || name === 'phone') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    } 
    // Si es un campo de dirección
    else {
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

  // manejamos el submit del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!cart?.items) {
        throw new Error('El carrito está vacío');
      }

      // formateamos los items del carrito
      // const formattedCartItems = {
      //   cartItems: cart.items.map(item => ({
      //     productId: item.product.id,
      //     quantity: item.quantity
      //   }))
      // };

      // enviamos la información de checkout tanto los items como el cartId para generar el order
      // const checkoutResponse = await cartService.checkout(formattedCartItems, cart.id);
      const checkoutResponse = await cartService.checkout(cart.id);
      // enviamos al proceso de pago de stripe
      window.location.href = checkoutResponse

    } catch (error) {
      console.error('Checkout error', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Campos de contacto */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Información de Contacto</h3>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Campos de dirección de facturación */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Dirección de Facturación</h3>
            <input
              type="text"
              name="billingAddress.street"
              placeholder="Calle"
              value={formData.billingAddress.street}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="billingAddress.city"
                placeholder="Ciudad"
                value={formData.billingAddress.city}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="billingAddress.state"
                placeholder="Estado"
                value={formData.billingAddress.state}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={!stripe}
          className="mt-6 w-full bg-primary text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Pagar Ahora
        </button>
      </form>
    </div>
  );
};

export default Checkout;
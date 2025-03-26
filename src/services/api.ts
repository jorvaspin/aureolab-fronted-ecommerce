import axios from 'axios';

// configuramos axios para manejar cookies
axios.defaults.withCredentials = true;

const BASE_URL = process.env.REACT_APP_API_URL;

// creamos un servicio para los productos
export const productService = {
  async getProducts() {
    const response = await axios.get(`${BASE_URL}/products`);
    console.log(response.data);
    // Devuelve directamente el array de productos
    return response.data.products;
  }
};

// creamos un servicio para el carrito
export const cartService = {
  async getCart() {
    try {
      // obtenemos cartId de localStorage
      const cartId = localStorage.getItem('cartId');
      
      const response = await axios.get(`${BASE_URL}/carts`, {
        params: { cartId } // enviamos cartId como parámetro
      });

      // guardamos o actualizamos cartId dependiendo de la respuesta
      if (response.data.cartId) {
        localStorage.setItem('cartId', response.data.cartId);
      }

      return response.data.cart;
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
      throw error;
    }
  },

  // añadimos un producto al carrito
  async addToCart(productId: number, quantity: number = 1) {
    try {
      // obtenemos cartId de localStorage
      const cartId = localStorage.getItem('cartId');

      const response = await axios.post(`${BASE_URL}/carts/add`, { 
        productId, 
        quantity,
        cartId // enviamos cartId en el cuerpo
      });

      return response.data;
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
      throw error;
    }
  },

  async removeFromCart(itemId: number) {
    try {
      console.log(itemId);
      const response = await axios.delete(`${BASE_URL}/carts/remove/${itemId}`);

      return response.data;
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
      throw error;
    }
  },

  // creamos una orden de pago con los items del carrito
  // async checkout(checkoutData: { cartItems: { productId: number; quantity: number }[] }, cartId: string) {
  async checkout(cartId: string) {
    const response = await axios.post(`${BASE_URL}/orders/checkout`, { cartId: cartId });

    return response.data.checkoutUrl;
  }

};
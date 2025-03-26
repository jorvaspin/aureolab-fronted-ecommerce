import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartService } from '../services/api';
import { Cart } from '../types/cart';

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null
};

// hacemos un async thunk para obtener el carrito
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      return await cartService.getCart();
    } catch (error) {
      return rejectWithValue('Error al fetchin del carro' + error);
    }
  }
);

// añadimos un producto al carrito
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }: { productId: number, quantity?: number }, { rejectWithValue }) => {
    try {
      return await cartService.addToCart(productId, quantity);
    } catch (error) {
      console.log(error);
      return rejectWithValue('Error adding to cart:' + error);
    }
  }
);

// removemos un producto del carrito
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (itemId: number, { rejectWithValue }) => {
    try {
      // Call the service method to remove the item
      return await cartService.removeFromCart(itemId);
    } catch (error) {
      console.error('Error removing item from cart:', error);
      return rejectWithValue('Error removing item from cart: ' + error);
    }
  }
);

// creamos un slice para el carrito
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      // Add handling for removeFromCart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  }
});

export default cartSlice.reducer;
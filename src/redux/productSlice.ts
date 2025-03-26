import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../services/api';
import { Product } from '../types/product';

interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null
};

// hacemos un async thunk para obtener los productos
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
        const products = await productService.getProducts();
        
        // Validación adicional
        if (!Array.isArray(products)) {
            throw new Error('Respuesta inválida: los productos no son un array');
        }
        
        return products;
        } catch (error) {
        return rejectWithValue('Error fetching products: ' + error);
        }
}
);

// creamos un slice para los productos
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default productSlice.reducer;
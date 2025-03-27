import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchProducts } from '../redux/productSlice';
import ProductCard from './ProductCart';
import { RefreshCw, AlertTriangle } from 'lucide-react';

const ProductList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <RefreshCw 
            className="mx-auto mb-4 h-16 w-16 text-primary animate-spin" 
          />
          <p className="text-xl text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-red-200">
          <AlertTriangle className="mx-auto mb-4 h-16 w-16 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error al cargar productos</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => dispatch(fetchProducts())}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50 mt-7">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Nuestros Productos
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explora nuestra selección de productos. Cada artículo ha sido cuidadosamente seleccionado para ofrecerte la mejor calidad.
        </p>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <p className="text-gray-500 text-xl mb-4">
            No hay productos disponibles en este momento.
          </p>
          <button 
            onClick={() => dispatch(fetchProducts())}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Recargar Productos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
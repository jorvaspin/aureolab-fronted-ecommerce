import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Product } from '../types/product';
import { addToCart } from '../redux/cartSlice';
import { AppDispatch } from '../redux/store';
import { ShoppingCart, AlertTriangle, Star, Loader2 } from 'lucide-react';
import { formatPrice } from '../utils/formaters';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch: AppDispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (product.stock === 0) return;

    try {
      setIsAdding(true);
      await dispatch(addToCart({ 
        productId: product.id, 
        quantity: 1 
      })).unwrap();
      
      // Optional: Add a toast or notification here
      console.log(`${product.name} añadido al carrito`);
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
      <div className="relative">
        <img 
          src={product.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'} 
          alt={product.name} 
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.stock === 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Sin Stock
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-bold text-gray-800 truncate max-w-[70%]">
            {product.name}
          </h3>
          <div className="flex items-center text-yellow-500">
            <Star className="h-5 w-5 fill-current mr-1" />
            <span className="text-sm font-medium">4.5</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[3rem]">
          {product.description || 'No hay descripción disponible'}
        </p>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xl font-bold text-primary">
              ${formatPrice(product.price)}
            </span>
            <span className="ml-2 text-sm text-gray-500">
              Stock: {product.stock}
            </span>
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isAdding}
            className={`
              relative rounded-full p-2 transition-all duration-300 flex items-center justify-center
              ${product.stock > 0 
                ? (isAdding 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-primary text-white hover:bg-blue-700') 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
            `}
          >
            {isAdding ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ShoppingCart className="h-5 w-5" />
            )}
            {isAdding && (
              <span className="ml-2 text-sm">Añadiendo...</span>
            )}
          </button>
        </div>
      </div>

      {/* Cart Addition Animation */}
      {isAdding && (
        <div className="absolute inset-0 bg-primary bg-opacity-20 animate-pulse pointer-events-none"></div>
      )}
    </div>
  );
};

export default ProductCard;
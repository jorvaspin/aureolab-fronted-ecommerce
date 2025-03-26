import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Product } from '../types/product';
import { addToCart } from '../redux/cartSlice';
import { AppDispatch } from '../redux/store';

// Función de utilidad para formatear precio
const formatPrice = (price: string | number): string => {
  return Number(price).toFixed(2);
};

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
      })).unwrap(); // esto lanzara un error si la acción es rechazada
      
      console.log(`${product.name} añadido al carrito`);
    } catch (error) {
      // Manejo de errores
      console.log(error);
      console.error('Error al añadir al carrito:');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <img 
        src={product.imageUrl || 'https://i.ibb.co/PZh01MkM/images-q-tbn-ANd9-Gc-TNNLEL-qmm-Le-FR1nx-Juep-FOg-PYfnw-HR56vcw-s.png'} 
        alt={product.name} 
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="mt-4 flex-grow">
        <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-2xl font-bold text-primary">
            ${formatPrice(product.price)}
          </span>
          <span className="text-sm text-gray-500">
            Stock: {product.stock}
          </span>
        </div>
      </div>
      <button 
        onClick={handleAddToCart}
        disabled={product.stock === 0 || isAdding}
        className={`mt-4 w-full py-2 rounded-md ${
          product.stock > 0 
            ? (isAdding 
              ? 'bg-gray-400 text-white cursor-not-allowed' 
              : 'bg-primary text-white hover:bg-blue-700')
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isAdding 
          ? 'Añadiendo...' 
          : (product.stock > 0 ? 'Añadir al Carrito' : 'Sin Stock')
        }
      </button>
    </div>
  );
};

export default ProductCard;
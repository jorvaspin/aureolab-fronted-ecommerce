import React from 'react';
import { 
  ShoppingBagIcon, 
  CreditCardIcon, 
  CalendarIcon,
  RefreshCwIcon 
} from 'lucide-react';
import { Order } from '../../types/order';
import { RefundSection } from './RefundSection';

interface OrderDetailsProps {
  selectedOrder: Order | null;
  onOrdersUpdate: React.Dispatch<React.SetStateAction<Order[]>>;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ 
  selectedOrder, 
  onOrdersUpdate 
}) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;

  const handleRefundProcessed = (updatedOrder: Order) => {
    onOrdersUpdate(prevOrders => 
      prevOrders.map(order => 
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  };

  // Helper function to get refund status color
  const getRefundStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!selectedOrder) {
    return (
      <div className="col-span-8 bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 text-center text-gray-500 py-10">
          Selecciona una orden para ver detalles
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-8 bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg leading-6 font-semibold text-gray-900">
          Detalles de Orden
        </h3>
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-gray-500" />
          <span className="text-sm text-gray-600">
            {new Date(selectedOrder.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div>
          {/* Order Summary Header */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <div>
              <h4 className="text-xl font-bold text-gray-900 flex items-center">
                <ShoppingBagIcon className="w-6 h-6 mr-2 text-blue-600" />
                Orden #{selectedOrder.id}
              </h4>
            </div>
            <div className="flex items-center">
              <CreditCardIcon className="w-5 h-5 mr-2 text-green-600" />
              <p className="text-xl font-bold text-gray-900">
                Total: ${selectedOrder.total}
              </p>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-gray-900 mb-3">
              Artículos Comprados
            </h5>
            <div className="grid grid-cols-1 gap-4">
              {selectedOrder.products.map(item => (
                <div 
                  key={item.id} 
                  className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 mr-4 flex-shrink-0">
                    <img 
                      src={item.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'} 
                      alt={item.productName}
                      className="w-full h-full object-cover rounded-md"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-product.png';
                      }}
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h6 className="text-md font-semibold text-gray-900">
                          {item.productName}
                        </h6>
                        {item.description && (
                          <p className="text-sm text-gray-500 mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {item.quantity} x ${item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Refund Information Section */}
          {selectedOrder.refunds && selectedOrder.refunds.length > 0 && (
            <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center mb-4">
                <RefreshCwIcon className="w-6 h-6 mr-2 text-blue-600" />
                <h5 className="text-lg font-semibold text-gray-900">
                  Reembolsos
                </h5>
              </div>
              <div className="space-y-3">
                {selectedOrder.refunds.map(refund => (
                  <div 
                    key={refund.id} 
                    className="bg-white rounded-md p-3 shadow-sm border border-gray-100 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Reembolso #{refund.id}
                      </p>
                      <p className="text-md font-bold text-gray-900">
                        ${refund.amount}
                      </p>
                    </div>
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRefundStatusColor(refund.status)}`}>
                        {refund.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Refund Section */}
          {selectedOrder.status === 'PAID' && (
            <RefundSection 
              order={selectedOrder}
              onRefundProcessed={handleRefundProcessed}
              backendUrl={BACKEND_URL}
            />
          )}
        </div>
      </div>
    </div>
  );
};
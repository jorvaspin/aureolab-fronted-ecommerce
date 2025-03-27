import React from 'react';
import { ShoppingBagIcon } from 'lucide-react';
import { Order } from '../../types/order';

interface OrderListProps {
  orders: Order[];
  selectedOrder: Order | null;
  onSelectOrder: (order: Order) => void;
}

export const OrderList: React.FC<OrderListProps> = ({ 
  orders, 
  selectedOrder, 
  onSelectOrder 
}) => {
  return (
    <div className="col-span-4 bg-white shadow-lg rounded-2xl overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-blue-50">
        <h3 className="text-lg leading-6 font-semibold text-gray-900 flex items-center">
          <ShoppingBagIcon className="mr-2 text-blue-600" size={20} />
          Mis Órdenes
        </h3>
      </div>
      <div className="divide-y divide-gray-200">
        {orders.length === 0 ? (
          <p className="text-center text-gray-600 py-4">No hay órdenes</p>
        ) : (
          orders.map(order => (
            <div 
              key={order.id} 
              className={`px-4 py-4 sm:px-6 cursor-pointer hover:bg-blue-50 transition 
                ${selectedOrder?.id === order.id ? 'bg-blue-100' : ''}`}
              onClick={() => onSelectOrder(order)}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  Orden #{order.id}
                </p>
                <p className="text-sm text-gray-500">
                  ${order.total}
                </p>
              </div>
              <div className="mt-2 flex justify-between">
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 
                  order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                  order.status === 'REFUNDED' ? 'bg-red-100 text-red-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
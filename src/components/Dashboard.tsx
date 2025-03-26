import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBagIcon, CreditCardIcon, CalendarIcon } from 'lucide-react';


interface Order {
  id: number;
  total: number;
  status: string;
  createdAt: string;
  products: Array<{
    description: string | null;
    imageUrl: string;
    id: number;
    productName: string;
    quantity: number;
    price: number;
  }>;
}

const Dashboard: React.FC = () => {

  const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;

  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [refundAmount, setRefundAmount] = useState<number>(0);
  const [refundMessage, setRefundMessage] = useState<string>('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/orders`, {
          withCredentials: true
        });
        // filtramos las órdenes con items
        const validOrders = response.data.orders.filter((order: Order) => 
          order.products && order.products.length > 0
        );
        console.log(validOrders);
        setOrders(validOrders);
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };

    fetchOrders();
  }, [BACKEND_URL]);

  const handleRefund = async () => {
    if (!selectedOrder) return;

    try {
      const response = await axios.post(`${BACKEND_URL}/orders/${selectedOrder.id}/refund`, {
        amount: refundAmount
      }, {
        withCredentials: true
      });
      
      setRefundMessage('Reembolso procesado exitosamente');
      
      const updatedOrders = orders.map(order => 
        order.id === selectedOrder.id 
          ? { ...order, status: response.data.orderStatus || 'REFUNDED' } 
          : order
      );
      setOrders(updatedOrders);
      
      setSelectedOrder(null);
      setRefundAmount(0);
    } catch (error) {
      console.error('Error processing refund', error);
      setRefundMessage('Error al procesar el reembolso');
    }
  };

  return (
    <div className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-3xl font-bold text-gray-900 mb-8">Dashboard de Órdenes</div>
      
      <div className="grid grid-cols-12 gap-6">
        {/* Order List Section - Kept the same as before */}
        <div className="col-span-4 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-semibold text-gray-900">Mis Órdenes</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {orders.length === 0 ? (
              <p className="text-center text-gray-600 py-4">No hay órdenes</p>
            ) : (
              orders.map(order => (
                <div 
                  key={order.id} 
                  className={`px-4 py-4 sm:px-6 cursor-pointer hover:bg-gray-50 ${
                    selectedOrder?.id === order.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedOrder(order)}
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

        {/* Enhanced Order Details Section */}
        <div className="col-span-8 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg leading-6 font-semibold text-gray-900">
              Detalles de Orden
            </h3>
            {selectedOrder && (
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {new Date(selectedOrder.createdAt).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
          
          <div className="p-6">
            {selectedOrder ? (
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
                
                {/* Product Details with Images */}
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
                            src={item.imageUrl || 'https://i.ibb.co/PZh01MkM/images-q-tbn-ANd9-Gc-TNNLEL-qmm-Le-FR1nx-Juep-FOg-PYfnw-HR56vcw-s.png'} 
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
                
                {/* Refund Section - Kept similar to previous implementation */}
                {selectedOrder.status === 'PAID' && (
                  <div className="mt-6">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monto de Reembolso
                      </label>
                      <input 
                        type="number" 
                        max={selectedOrder.total}
                        value={refundAmount}
                        onChange={(e) => setRefundAmount(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ingrese monto a reembolsar"
                      />
                    </div>
                    
                    <button 
                      onClick={handleRefund}
                      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                      Procesar Reembolso
                    </button>
                  </div>
                )}
                
                {refundMessage && (
                  <div className={`mt-4 p-3 rounded-md text-center ${
                    refundMessage.includes('Error') 
                      ? 'bg-red-50 text-red-800' 
                      : 'bg-green-50 text-green-800'
                  }`}>
                    {refundMessage}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-10">
                Selecciona una orden para ver detalles
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
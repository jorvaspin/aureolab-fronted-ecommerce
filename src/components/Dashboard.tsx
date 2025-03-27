import React from 'react';
import { TrendingUp } from 'lucide-react';

import { useOrders } from '../hooks/useOrders';
import { DashboardMetrics } from '../components/dashboard/DashboardMetrics';
import { OrderList } from '../components/dashboard/OrderList';
import { OrderDetails } from '../components/dashboard/OrderDetails';
import { Order } from '../types/order';

const Dashboard: React.FC = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;

  // Use the custom hook for orders
  const { 
    orders, 
    selectedOrder, 
    setSelectedOrder, 
    setOrders, 
    calculateMetrics 
  } = useOrders(BACKEND_URL);

  // Calculate metrics from the hook
  const { 
    totalRevenue, 
    pendingOrders, 
    completedOrders 
  } = calculateMetrics();

  // Handler to select an order
  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <TrendingUp className="mr-3 text-blue-600" size={32} />
            Dashboard de Órdenes
          </h1>
          
          {/* Dashboard Metrics Component */}
          <DashboardMetrics 
            totalRevenue={totalRevenue}
            completedOrdersCount={completedOrders.length}
            pendingOrdersCount={pendingOrders.length}
          />
        </div>
        
        <div className="grid grid-cols-12 gap-6">
          {/* Order List Component */}
          <OrderList 
            orders={orders}
            selectedOrder={selectedOrder}
            onSelectOrder={handleSelectOrder}
          />

          {/* Order Details Component */}
          <OrderDetails 
            selectedOrder={selectedOrder}
            onOrdersUpdate={setOrders}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
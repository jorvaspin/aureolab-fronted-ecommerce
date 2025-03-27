import React from 'react';
import { 
  ShoppingBagIcon, 
  RefreshCcw,
  CircleDollarSign,
  HandCoins
} from 'lucide-react';
import { formatPrice } from '../../utils/formaters';

interface DashboardMetricsProps {
  totalRevenue: number;
  completedOrdersCount: number;
  pendingOrdersCount: number;
  refundedOrdersCount: number;
}

export const DashboardMetrics: React.FC<DashboardMetricsProps> = ({
  totalRevenue,
  completedOrdersCount,
  pendingOrdersCount,
  refundedOrdersCount
}) => {

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-white shadow rounded-lg p-4 text-center">
        <CircleDollarSign className="mx-auto text-green-600 mb-2" size={24} />
        <p className="text-gray-500 text-sm">Ingresos Totales</p>
        <p className="text-xl font-bold text-gray-900">${formatPrice(totalRevenue)}</p>
      </div>
      <div className="bg-white shadow rounded-lg p-4 text-center">
        <ShoppingBagIcon className="mx-auto text-blue-600 mb-2" size={24} />
        <p className="text-gray-500 text-sm">Órdenes Completadas</p>
        <p className="text-xl font-bold text-gray-900">{completedOrdersCount}</p>
      </div>
      <div className="bg-white shadow rounded-lg p-4 text-center">
        <RefreshCcw className="mx-auto text-yellow-600 mb-2" size={24} />
        <p className="text-gray-500 text-sm">Órdenes Pendientes</p>
        <p className="text-xl font-bold text-gray-900">{pendingOrdersCount}</p>
      </div>
      {/* añadimos los refunds */}
      <div className="bg-white shadow rounded-lg p-4 text-center">
        <HandCoins className="mx-auto text-yellow-600 mb-2" size={24} />
        <p className="text-gray-500 text-sm">Reembolsos</p>
        <p className="text-xl font-bold text-gray-900">{refundedOrdersCount}</p>
      </div>
    </div>
  );
};
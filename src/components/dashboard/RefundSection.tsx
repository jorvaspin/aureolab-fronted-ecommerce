import React, { useState } from 'react';
import axios from 'axios';
import { Order } from '../../types/order';

interface RefundSectionProps {
  order: Order;
  onRefundProcessed: (updatedOrder: Order) => void;
  backendUrl: string;
}

export const RefundSection: React.FC<RefundSectionProps> = ({ 
  order, 
  onRefundProcessed,
  backendUrl 
}) => {
  const [refundAmount, setRefundAmount] = useState<number>(0);
  const [refundMessage, setRefundMessage] = useState<string>('');

  const handleRefund = async () => {
    try {
      const response = await axios.post(`${backendUrl}/orders/${order.id}/refund`, {
        amount: refundAmount
      }, {
        withCredentials: true
      });
      
      setRefundMessage('Reembolso procesado exitosamente');
      
      const updatedOrder = {
        ...order,
        status: response.data.orderStatus || 'REFUNDED'
      };
      
      onRefundProcessed(updatedOrder);
      
      setRefundAmount(0);
    } catch (error) {
      console.error('Error processing refund', error);
      setRefundMessage('Error al procesar el reembolso');
    }
  };

  return (
    <div className="mt-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Monto de Reembolso
        </label>
        <input 
          type="number" 
          max={order.total}
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
  );
};
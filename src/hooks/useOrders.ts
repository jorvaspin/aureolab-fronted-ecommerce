import { useState, useEffect } from 'react';
import axios from 'axios';
import { Order } from '../types/order';

export const useOrders = (backendUrl: string) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${backendUrl}/orders`, {
          withCredentials: true
        });
        const validOrders = response.data.orders.filter((order: Order) => 
          order.products && order.products.length > 0
        );
        setOrders(validOrders);
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };

    fetchOrders();
  }, [backendUrl]);

  const calculateMetrics = () => {
    const totalRevenue = orders.reduce((sum, order) => 
      order.status === 'COMPLETED' || order.status === 'PAID' ? sum + order.total : sum, 0);
    
    const pendingOrders = orders.filter(order => order.status === 'PENDING');
    
    const completedOrders = orders.filter(order => 
      order.status === 'COMPLETED' || order.status === 'PAID'
    );

    // los refunds realizados
    const refundedOrders = orders.filter(order => order.status === 'REFUNDED' || order.status === 'PARTIALLY_REFUNDED');


    return { totalRevenue, pendingOrders, completedOrders, refundedOrders };
  };

  return { 
    orders, 
    selectedOrder, 
    setSelectedOrder, 
    setOrders, 
    calculateMetrics 
  };
};
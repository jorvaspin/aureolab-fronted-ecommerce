import React from 'react';
import { AlertTriangleIcon } from 'lucide-react';
import MainLayout from '../components/MainLayout';

const OrderCancelPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto">
          <AlertTriangleIcon className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Orden Cancelada
          </h1>
          <p className="text-gray-600 mb-6">
            Tu orden de compra ha sido cancelada. No se ha realizado ningún cargo.
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
            <p className="text-yellow-800 font-semibold">
              ¿Necesitas ayuda?
            </p>
            <p className="text-yellow-700 mt-2">
              Si esto fue un error, por favor intenta realizar la compra nuevamente.
            </p>
          </div>
          
          <div className="mt-8 space-x-4">
            <a 
              href="/" 
              className="inline-block bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition duration-300"
            >
              Volver a Comprar
            </a>
            <a 
              href="/dashboard" 
              className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition duration-300"
            >
              Mis Órdenes
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderCancelPage;
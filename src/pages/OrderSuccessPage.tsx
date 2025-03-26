import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
// import axios from 'axios';
import MainLayout from '../components/MainLayout';
import { CheckCircleIcon } from 'lucide-react';

const OrderSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  // interface OrderDetails {
  //   orderId: string;
  //   total: number;
  // }

  // const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // Extraer session_id de la URL
  const sessionId = searchParams.get('session_id');
  console.log(sessionId);

  // simulamos un loading
  setTimeout(() => {
    setLoading(false);
  }
  , 1000);

  // useEffect(() => {
  //   const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;

  //   const fetchOrderDetails = async () => {
  //     try {
  //       if (sessionId) {
  //         const response = await axios.get(`${BACKEND_URL}/orders/verify-stripe-session/${sessionId}`, {
  //           withCredentials: true
  //         });
          
  //         setOrderDetails(response.data);
  //         setLoading(false);
  //       } else {
  //         setError('No se encontró el ID de sesión');
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching order details', error);
  //       setError('No se pudieron cargar los detalles de la orden');
  //       setLoading(false);
  //     }
  //   };

  //   fetchOrderDetails();
  // }, [sessionId]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }

  // if (error) {
  //   return (
  //     <MainLayout>
  //       <div className="container mx-auto px-4 py-20 text-center">
  //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  //           {error}
  //         </div>
  //       </div>
  //     </MainLayout>
  //   );
  // }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto">
          <CheckCircleIcon className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Compra Exitosa!
          </h1>
          <p className="text-gray-600 mb-6">
            Tu orden ha sido procesada correctamente.
          </p>
          
          {/* {orderDetails && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
              <p className="text-green-800 font-semibold">
                Número de Orden: #{orderDetails.orderId}
              </p>
              <p className="text-green-700 mt-2">
                Total: ${orderDetails.total}
              </p>
            </div>
          )} */}
          
          <div className="mt-8">
            <a 
              href="/dashboard" 
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Ver Mis Órdenes
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderSuccessPage;
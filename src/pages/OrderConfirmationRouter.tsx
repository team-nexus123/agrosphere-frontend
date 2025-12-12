import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

// This component handles the loading state and redirects to the correct success page.
const OrderConfirmationRouter: React.FC = () => {
    // ADD clearCart to destructuring
    const { transaction, clearCart } = useCart(); 
    const navigate = useNavigate();
    // No local loading state necessary; we display a loading UI then redirect

    useEffect(() => {
        // 1. Safety check: If transaction data is not here, redirect home.
        if (!transaction) {
            navigate('/', { replace: true });
            return;
        }

        // 2. Simulate the transaction processing time (1.5 seconds)
        const timer = setTimeout(() => {
            // **FIX HERE:** Clear the cart state immediately after payment simulation 
            // and before redirecting. The success page will just read the 'transaction' state.
            clearCart(); 

            // After loading, decide where to redirect
            if (transaction.hasTraceableGoods) {
                // If the order contained traceable items
                navigate('/order/traceable', { replace: true });
            } else {
                // If the order contained ONLY standard items
                navigate('/order/standard', { replace: true });
            }
        }, 1500); // 1.5 seconds loading delay

        // Cleanup
        return () => clearTimeout(timer); 

    }, [transaction, navigate, clearCart]); // Added clearCart to dependency array


    // Loading state content (this is what the user sees for 1.5 seconds)
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <p className="text-4xl animate-spin">⚙️</p>
                <h2 className="text-xl font-bold text-gray-800 mt-4">Processing Web3 Payment...</h2>
                <p className="text-gray-500 mt-2">Finalizing AgroCoin transfer and generating tracking data.</p>
            </div>
        </Layout>
    );
};

export default OrderConfirmationRouter;
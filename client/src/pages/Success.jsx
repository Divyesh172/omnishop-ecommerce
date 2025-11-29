import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Success = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full border border-gray-100">
                <div className="flex justify-center mb-6">
                    <CheckCircle className="text-green-500 w-20 h-20 animate-bounce" />
                </div>
                <h1 className="text-3xl font-bold text-slate-800 mb-4">Payment Successful!</h1>
                <p className="text-slate-500 mb-8">
                    Thank you for your purchase. Your order has been confirmed.
                </p>
                <Link to="/" className="block w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition">
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default Success;
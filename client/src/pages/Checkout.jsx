import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";

// REPLACE WITH YOUR PUBLISHABLE KEY (pk_test...)
const stripePromise = loadStripe("pk_test_51SYpc5RpavmiTPeuA2sf83Th55zavNwbMpXkgqyORQqlohDmrZSKc41eLKIZodGJt3ZboQvylQZMmpdni0iV0Dto00vm7rQ2Yy");

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Change this line to point to /success
                return_url: window.location.origin + "/success",
            },
        });

        if (error) setMessage(error.message);
        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold mb-6 text-slate-800">Enter Card Details</h3>
            <PaymentElement />
            <button
                disabled={isProcessing || !stripe}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
            >
                {isProcessing ? "Processing..." : "Pay Now"}
            </button>
            {message && <div className="text-red-500 mt-4 text-sm">{message}</div>}
        </form>
    );
};

const Checkout = () => {
    const [clientSecret, setClientSecret] = useState("");
    const cart = useSelector((state) => state.cart);
    const totalAmount = cart.cartItems.reduce((acc, item) => acc + item.price, 0);

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        if(totalAmount > 0) {
            axios.post("http://localhost:5000/api/create-payment-intent", { amount: totalAmount })
                .then((res) => setClientSecret(res.data.clientSecret));
        }
    }, [totalAmount]);

    const options = {
        clientSecret,
        theme: 'stripe',
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">Secure Checkout</h2>
                <div className="mb-6 text-center text-slate-600">Total to Pay: <span className="font-bold text-black">₹{totalAmount}</span></div>

                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )}
            </div>
        </div>
    );
};

export default Checkout;
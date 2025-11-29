import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice';
import { Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const dispatch = useDispatch();

    const total = cartItems.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="max-w-7xl mx-auto p-6 font-sans">
            <Link to="/" className="flex items-center text-slate-600 hover:text-blue-600 mb-8 transition w-fit">
                <ArrowLeft size={20} className="mr-2" /> Continue Shopping
            </Link>

            <h2 className="text-3xl font-bold mb-8 text-slate-800">Shopping Cart ({cartItems.length})</h2>

            {cartItems.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                    <p className="text-xl text-slate-500 mb-4">Your cart is empty</p>
                    <Link to="/" className="text-blue-600 font-bold hover:underline">Go Shop Now</Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Cart Items List */}
                    <div className="md:col-span-2 flex flex-col gap-4">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-4">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                                    <div>
                                        <h3 className="font-bold text-slate-800">{item.name}</h3>
                                        <span className="text-sm text-slate-500">{item.category}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="font-bold text-lg">₹{item.price}</span>
                                    <button
                                        onClick={() => dispatch(removeFromCart(item._id))}
                                        className="text-red-500 hover:bg-red-50 p-2 rounded-full transition"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Checkout Summary */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
                        <h3 className="text-xl font-bold mb-4 text-slate-800">Order Summary</h3>
                        <div className="flex justify-between mb-4 text-slate-600">
                            <span>Subtotal</span>
                            <span>₹{total}</span>
                        </div>
                        <div className="border-t pt-4 flex justify-between mb-6 font-bold text-lg">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>

                        {/* CORRECTLY PLACED BUTTON */}
                        <Link to="/checkout" className="block w-full">
                            <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition">
                                Proceed to Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
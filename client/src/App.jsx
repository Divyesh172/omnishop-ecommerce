import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { useSelector } from 'react-redux';

// Import Pages
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout'; // <--- MAKE SURE THIS IS HERE
import Success from './pages/Success';   // <--- AND THIS

function App() {
    const { cartItems } = useSelector((state) => state.cart);

    return (
        <Router>
            <div className="min-h-screen bg-gray-50 font-sans">

                {/* Navbar */}
                <nav className="bg-slate-900 text-white p-4 shadow-md sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <Link to="/" className="text-2xl font-bold tracking-tighter text-blue-400">OmniShop</Link>

                        <div className="flex gap-6 items-center">
                            <Link to="/" className="cursor-pointer hover:text-blue-400 transition">Shop</Link>

                            <Link to="/cart" className="relative cursor-pointer hover:text-blue-400 transition">
                                <ShoppingCart size={24} />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {cartItems.length}
                  </span>
                                )}
                            </Link>

                            <User size={24} className="cursor-pointer hover:text-blue-400 transition" />
                        </div>
                    </div>
                </nav>

                {/* Routes Configuration */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    {/* THESE TWO ROUTES ARE CRITICAL: */}
                    // Routing configuration
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/success" element={<Success />} />
                </Routes>

            </div>
        </Router>
    );
}

export default App;
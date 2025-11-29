import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('https://omnishop-ecommerce.onrender.com/api/products');
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const addToCartHandler = (product) => {
        dispatch(addToCart(product));
        alert("Added to Cart!");
    };

    return (
        <div>
            {/* Hero */}
            <div className="bg-blue-600 text-white py-24 text-center">
                <h2 className="text-5xl font-extrabold mb-4">Summer Tech Drop</h2>
                <p className="text-xl mb-8 opacity-90">Up to 40% off on premium electronics</p>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">Shop Now</button>
            </div>

            {/* Product Grid */}
            <main className="max-w-7xl mx-auto p-6 mt-10">
                <h3 className="text-3xl font-bold mb-8 text-slate-800">Latest Arrivals</h3>
                {loading ? (
                    <div className="flex justify-center p-20"><Loader className="animate-spin" size={48} /></div>
                ) : (
                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <div key={product._id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all border border-gray-100 overflow-hidden group">
                                <div className="h-48 overflow-hidden">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="p-5">
                                    <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">{product.category}</span>
                                    <h4 className="text-lg font-bold mt-2 text-slate-900 truncate">{product.name}</h4>
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-xl font-bold text-slate-800">₹{product.price}</span>
                                        <button onClick={() => addToCartHandler(product)} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;
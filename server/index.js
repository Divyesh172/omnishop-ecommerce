const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// 1. LOAD ENVIRONMENT VARIABLES FIRST
dotenv.config();

// 2. NOW LOAD STRIPE (It can see the key now)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('./models/Product');

const app = express();
app.use(express.json());
app.use(cors());

// Debugging: Check if key is loaded (Remove this line later)
console.log("Stripe Key Loaded:", process.env.STRIPE_SECRET_KEY ? "YES" : "NO");

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// --- ROUTES ---

app.get('/', (req, res) => {
    res.send('OmniShop API is Running...');
});

app.get('/api/products', async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

app.get('/api/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Payment Route
app.post('/api/create-payment-intent', async (req, res) => {
    try {
        const { amount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'inr',
            automatic_payment_methods: { enabled: true },
        });
        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
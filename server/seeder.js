const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config({ path: './.env' });

// Sample Data
const products = [
    {
        name: 'Airpods Wireless Bluetooth Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        description: 'Bluetooth technology lets you connect it with compatible devices wirelessly.',
        category: 'Electronics',
        price: 8900,
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'iPhone 13 Pro 256GB Memory',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        description: 'Introducing the iPhone 13 Pro. A transformative triple-camera system.',
        category: 'Electronics',
        price: 99900,
        countInStock: 7,
        rating: 4.0,
        numReviews: 8,
    },
    {
        name: 'Sony Playstation 5',
        image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
        description: 'The ultimate home entertainment center.',
        category: 'Electronics',
        price: 49900,
        countInStock: 5,
        rating: 5,
        numReviews: 12,
    }
];

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Product.deleteMany(); // Clear old data
        await Product.insertMany(products);
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
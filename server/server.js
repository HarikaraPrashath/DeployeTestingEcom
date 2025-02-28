require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoute');
const adminProduct = require('./routes/admin/productRoutes');
const paymentOrder = require('./routes/paymentandOrderRoutes');
const userDetails = require('./routes/userDetailsRoutes');

// Initialize Express app
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // Dynamic frontend URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admin/product', adminProduct);
app.use('/api/order', paymentOrder);
app.use('/api/details', userDetails);

// Connect to MongoDB
const mongoAddress = process.env.MONGO_ADDRESS;

if (!mongoAddress) {
    console.error('Error: MONGO_ADDRESS is not defined in the environment variables.');
    process.exit(1); // Exit the application
}

// Ensure Mongoose keeps connections alive in a serverless environment
async function connectDB() {
    try {
        await mongoose.connect(mongoAddress, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
}

// Start the server only if not in a serverless environment
if (process.env.NODE_ENV !== 'production') {
    app.listen(process.env.PORT || 5000, () => {
        console.log('Server is running on port', process.env.PORT || 5000);
    });
}

module.exports = app; // Export app for Vercel deployment

require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const connectDB = require('./config/db');
const noteRoutes = require('./routes/noteRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

const errorHandler = require('./middleware/errorMiddleware');
app.use(errorHandler);

// Middleware to parse JSON body
app.use(express.json());

// Health check route (no auth)
app.get('/health', (req, res) => {
    res.json({ status: 'Notes service running' });
});

// 🔐 TEMPORARY DEV ROUTE — JWT GENERATOR (FOR LEARNING ONLY)
app.get('/dev/token', (req, res) => {
    const token = jwt.sign(
        { userId: '64f000000000000000000001' }, // fake user id
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.json({ token });
});

// Notes routes (protected inside routes using auth middleware)
app.use('/api/notes', noteRoutes);

// Start server after DB connection
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Notes service running on port ${PORT}`);
    });
};

startServer();

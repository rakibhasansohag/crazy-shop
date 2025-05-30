const express = require('express');
const { default: mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRouter = require('./routes/auth/auth-routes');
const adminProductsRouter = require('./routes/admin/products-routes');
const adminOrdersRouter = require('./routes/admin/orders-routes');

const shopProductsRouter = require('./routes/shop/products-routes');
const shopCartRouter = require('./routes/shop/cart-routes.js');
const shopAddressRouter = require('./routes/shop/address-routes.js');
const shopOrderRouter = require('./routes/shop/order-routes.js');
const shopSearchRouter = require('./routes/shop/search-routes.js');
const shopReviewRouter = require('./routes/shop/review-routes.js');

const commonFeatureRouter = require('./routes/common/feature-routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
mongoose
	.connect(process.env.MONGODB_URL, {})
	.then(() => {
		console.log('Connected to MongoDB using', process.env.MONGODB_URL);
	})
	.catch((err) => {
		console.log('Error connecting to MongoDB:', err);
	});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	cors({
		origin: 'http://localhost:5173',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: [
			'Content-Type',
			'Authorization',
			'Cache-Control',
			'expires',
			'Pragma',
			'Content-Disposition',
		],
		credentials: true,
	}),
);

// File upload middleware
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Headers', 'Content-Disposition');
	next();
});

// Routes (admin)
app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductsRouter);
app.use('/api/admin/orders', adminOrdersRouter);

// Routes (shop)
app.use('/api/shop/products', shopProductsRouter);
app.use('/api/shop/cart', shopCartRouter);
app.use('/api/shop/address', shopAddressRouter);
app.use('/api/shop/order', shopOrderRouter);
app.use('/api/shop/search', shopSearchRouter);
app.use('/api/shop/review', shopReviewRouter);

app.use('/api/common/feature', commonFeatureRouter);


// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT} ✅`);
});

const express = require('express');
const { default: mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const authRouter = require('./routes/auth/auth-routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Point: Create A Database Connection
mongoose
	.connect(process.env.MONGODB_URL, {})
	.then(() => {
		console.log('Connected to MongoDB using', process.env.MONGODB_URL);
	})
	.catch((err) => {
		console.log('Error connecting to MongoDB:', err);
	});

// Point:  Middlewares
app.use(express.json());
app.use(cookieParser());
/// for cross server
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
		],
		credentials: true,
	}),
);
app.use('/api/auth', authRouter);

// Point: Listening
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT} ✅`);
});

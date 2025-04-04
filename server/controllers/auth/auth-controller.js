const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// Point: Register User
const registerUser = async (req, res) => {
	const { userName, email, password } = req.body;

	try {
		const checkUser = await User.findOne({ $or: [{ email }, { userName }] });

		if (checkUser)
			return res.json({
				success: false,
				message: 'User Already Exists! Try Another Email OR User Name',
			});

		const hashPassword = await bcrypt.hash(password, 12);
		const newUser = new User({
			userName,
			email,
			password: hashPassword,
		});

		await newUser.save();

		res.status(201).json({
			success: true,
			message: 'User created successfully',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
			error: error?.message || error.error,
		});
	}
};

// Point: Login User
const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const checkUser = await User.findOne({ email });
		if (!checkUser)
			return res.json({
				success: false,
				message: 'Invalid Credentials',
			});

		const checkPassword = await bcrypt.compare(password, checkUser.password);
		if (!checkPassword)
			return res.json({
				success: false,
				message: 'Invalid Credentials',
			});

		const token = jwt.sign(
			{
				id: checkUser._id,
				role: checkUser.role,
				email: checkUser.email,
				userName: checkUser.userName,
			},
			'CLIENT_SECRET_KEY',
			{ expiresIn: '1d', algorithm: 'HS256' },
		);

		// TODO : will change the httpOnly to false and secure to true in production
		res.cookie('token', token, { httpOnly: true, secure: false }).json({
			success: true,
			message: 'User logged in successfully',
			user: {
				email: checkUser.email,
				role: checkUser.role,
				id: checkUser._id,
				userName: checkUser.userName,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
			error: error?.message || error.error,
		});
	}
};

// Point: Logout User
const logoutUser = (req, res) => {
	res.clearCookie('token').json({
		success: true,
		message: 'Logged out successfully!',
	});
};

// Point: Auth middleware / protect routes
const authMiddleware = async (req, res, next) => {
	const token = req.cookies.token;

	if (!token)
		return res
			.status(401)
			.json({ success: false, message: 'Unauthorized User!' });
	try {
		const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
		req.user = decoded;
		next();
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			message: 'Unauthorized User!',
			error: error?.message || error.error,
		});
	}
};

// Point: exporting controller functions
module.exports = {
	registerUser,
	loginUser,
	logoutUser,
	authMiddleware,
};

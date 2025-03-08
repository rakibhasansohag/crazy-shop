const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// Point: Register User
const registerUser = async (req, res) => {
	const { userName, email, password } = req.body;

	try {
		const checkUser = await User.findOne({ email });

		if (checkUser)
			return res.json({ success: false, message: 'User Already Exists!' });

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
const login = async (req, res) => {
	const { email, password } = req.body;

	try {
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

// Point: Auth middleware / protect routes

// Point: exporting controller functions
module.exports = {
	registerUser,
	login,
};

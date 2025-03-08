const {
	registerUser,
	loginUser,
	logoutUser,
	authMiddleware,
} = require('../../controllers/auth/auth-controller');

const router = require('express').Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/check-auth', authMiddleware, (req, res) => {
	const user = req.user;
	res.status(200).json({
		success: true,
		user,
		message: 'Authenticated/Verified User!',
	});
});

module.exports = router;
